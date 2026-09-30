/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ZikrItem, HistorySession, AppSettings, DuaItem, NavModule, ThemeMode, ZikrLanguage, UserProfile, ZikrRefreshMode } from './types';
import { DEFAULT_ZIKRS, SUPPORTED_LANGUAGES, getTargetForZikrMode } from './utils/constants';
import { soundHaptics } from './utils/audioHaptics';
import { generateZikrPdfReport } from './utils/exportPdf';
import { NAV_TRANSLATIONS } from './utils/appTranslations';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { ZikirCounterView } from './components/ZikirCounterView';
import { QuranView } from './components/QuranView';
import { KitabView } from './components/KitabView';
import { HadithView } from './components/HadithView';
import { SalatTimeView } from './components/SalatTimeView';
import { DuaView } from './components/DuaView';
import { AamalTrackerView } from './components/AamalTrackerView';
import { OtherIslamicHubView, OtherSubSection } from './components/OtherIslamicHubView';
import { ZikrModal } from './components/ZikrModal';
import { ConfirmModal } from './components/ConfirmModal';
import { StandaloneExportModal } from './components/StandaloneExportModal';
import { ProfileModal } from './components/ProfileModal';
import { HistoryReportModal } from './components/HistoryReportModal';
import { saveAccountToRegistry } from './utils/accountRegistry';
import {
  createInitialDayLog,
  recordZikrIncrementInAamal,
  syncTodayAamalWithLiveZikrs,
  getAllAamalLogs,
  clearAllAamalLogs,
  getTodayDateKey,
} from './utils/aamalTrackerData';
import {
  saveUserDataToCloud,
  loadUserDataFromCloud,
  subscribeToUserDataInCloud,
  getDeviceId,
  CloudZikrState,
} from './services/firebase';
import { BookmarkCheck, Sparkles } from 'lucide-react';
import { getDetectedDeviceInfo } from './utils/deviceInfo';
import { calculatePrayerTimes } from './utils/prayerTimes';


export default function App() {
  // Refresh Mode state ('fard' | 'maghrib' | 'manual')
  const [refreshMode, setRefreshMode] = useState<ZikrRefreshMode>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_refresh_mode');
      if (saved === 'fard' || saved === 'maghrib' || saved === 'manual') {
        return saved as ZikrRefreshMode;
      }
    } catch {}
    return 'fard';
  });

  // 1. LocalStorage state persistence for Zikr Items
  const [zikrs, setZikrs] = useState<ZikrItem[]>(() => {
    try {
      const saved = localStorage.getItem('noor_zikr_items');
      let parsed: any[] | null = null;
      if (saved) {
        try {
          const json = JSON.parse(saved);
          if (Array.isArray(json) && json.length > 0) {
            parsed = json;
          }
        } catch {}
      }

      const activeRefreshMode = (() => {
        try {
          const savedMode = localStorage.getItem('zikrmate_refresh_mode');
          if (savedMode === 'fard' || savedMode === 'maghrib' || savedMode === 'manual') {
            return savedMode as ZikrRefreshMode;
          }
        } catch {}
        return 'fard';
      })();

      if (parsed && Array.isArray(parsed) && parsed.length > 0) {
        const parsedMap = new Map<string, any>(parsed.map((item: any) => [item.id, item]));
        const nameMap = new Map<string, any>(
          parsed.map((item: any) => [
            (item.name || item.pronunciationBn || '').toLowerCase().replace(/[^a-z0-9]/g, ''),
            item,
          ])
        );

        // Populate all Common Zikrs, restoring counts and syncing target to current refresh mode
        const mergedList: ZikrItem[] = DEFAULT_ZIKRS.map((defaultItem) => {
          const normalizedName = defaultItem.name.toLowerCase().replace(/[^a-z0-9]/g, '');
          const existing = parsedMap.get(defaultItem.id) || nameMap.get(normalizedName);
          const targetForMode = getTargetForZikrMode(defaultItem, activeRefreshMode);
          if (existing) {
            return {
              ...defaultItem,
              count: typeof existing.count === 'number' ? Math.max(0, existing.count) : 0,
              updatedAt: existing.updatedAt || defaultItem.updatedAt,
              target: targetForMode,
            };
          }
          return {
            ...defaultItem,
            target: targetForMode,
          };
        });

        // Also preserve any custom items the user may have added
        const defaultIds = new Set(DEFAULT_ZIKRS.map((d) => d.id));
        const customItems = parsed.filter(
          (item: any) =>
            item.id &&
            !defaultIds.has(item.id) &&
            !nameMap.has((item.name || '').toLowerCase().replace(/[^a-z0-9]/g, ''))
        );

        const finalList = [...mergedList, ...customItems];
        try {
          localStorage.setItem('noor_zikr_items', JSON.stringify(finalList));
        } catch {}
        return finalList;
      }
    } catch {
      // Fallback
    }

    const initialMode = (() => {
      try {
        const savedMode = localStorage.getItem('zikrmate_refresh_mode');
        if (savedMode === 'fard' || savedMode === 'maghrib' || savedMode === 'manual') {
          return savedMode as ZikrRefreshMode;
        }
      } catch {}
      return 'fard';
    })();

    return DEFAULT_ZIKRS.map((item) => ({
      ...item,
      target: getTargetForZikrMode(item, initialMode),
    }));
  });

  // History session archives
  const [historySessions, setHistorySessions] = useState<HistorySession[]>(() => {
    try {
      const saved = localStorage.getItem('noor_zikr_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {}
    return [];
  });

  // App settings state (Defaulting to 'night' - the requested sleek black type with upper given teal colors)
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('noor_zikr_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed;
      }
    } catch {}
    return {
      soundEnabled: true,
      vibrationEnabled: true,
      screenAwake: false,
      theme: 'emerald',
      themeMode: 'night', // Black type requested by user
    };
  });

  // Selected language state for Arabic pronunciation & meaning (defaults to Bengali 'bn')
  const [selectedLanguage, setSelectedLanguage] = useState<ZikrLanguage>(() => {
    try {
      const saved = localStorage.getItem('noor_zikr_selected_lang');
      if (saved && ['bn', 'en', 'ur', 'hi', 'id', 'tr'].includes(saved)) {
        return saved as ZikrLanguage;
      }
    } catch {}
    return 'bn';
  });

  // Save selected language to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('noor_zikr_selected_lang', selectedLanguage);
    } catch {}
  }, [selectedLanguage]);

  // Active module navigation
  const [activeModule, setActiveModule] = useState<NavModule>('zikir_counter');

  // Lifetime Cumulative Grand Total Count (Persists across sessions until manual Reset All)
  const [lifetimeTotalCount, setLifetimeTotalCount] = useState<number>(() => {
    let savedTotal = 0;
    try {
      const saved = localStorage.getItem('zikrmate_lifetime_total_count');
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0) {
          savedTotal = parsed;
        }
      }
    } catch {}

    let historyTotal = 0;
    try {
      const histRaw = localStorage.getItem('noor_zikr_history');
      if (histRaw) {
        const parsedHist = JSON.parse(histRaw);
        if (Array.isArray(parsedHist)) {
          historyTotal = parsedHist.reduce((acc: number, s: any) => acc + (s.totalCount || 0), 0);
        }
      }
    } catch {}

    const activeSum = zikrs.reduce((acc, curr) => acc + (curr.count || 0), 0);
    return Math.max(savedTotal, historyTotal + activeSum, activeSum);
  });

  const lifetimeTotalCountRef = useRef(lifetimeTotalCount);
  useEffect(() => {
    lifetimeTotalCountRef.current = lifetimeTotalCount;
  }, [lifetimeTotalCount]);

  useEffect(() => {
    try {
      localStorage.setItem('zikrmate_lifetime_total_count', String(lifetimeTotalCount));
    } catch {}
  }, [lifetimeTotalCount]);

  // User Profile Account state (Guest by default until signed in)
  const zikrsRef = useRef(zikrs);
  useEffect(() => {
    zikrsRef.current = zikrs;
  }, [zikrs]);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const [profileModalTab, setProfileModalTab] = useState<'profile' | 'settings'>('profile');

  const handleOpenProfileModal = (tab: 'profile' | 'settings' = 'profile') => {
    setProfileModalTab(tab);
    setIsProfileModalOpen(true);
  };

  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const detected = getDetectedDeviceInfo();
    try {
      const saved = localStorage.getItem('zikrmate_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.isSignedIn === 'boolean') {
          if (!parsed.deviceModel || parsed.deviceModel.includes('vivo ~~ V2144')) {
            parsed.deviceModel = detected.model;
          }
          if (!parsed.osVersion || parsed.osVersion === '35_15') {
            parsed.osVersion = detected.osVersion;
          }
          if (!parsed.location || parsed.location.includes('4C2J')) {
            parsed.location = detected.location;
          }
          if (!parsed.appVersion) {
            parsed.appVersion = detected.appVersion;
          }
          return parsed;
        }
      }
    } catch {}
    return {
      name: '',
      emailOrPhone: '',
      photoUrl: '',
      isSignedIn: false,
      location: detected.location,
      deviceModel: detected.model,
      osVersion: detected.osVersion,
      appVersion: detected.appVersion,
    };
  });

  const [isSyncingCloud, setIsSyncingCloud] = useState(false);
  const [lastCloudSyncTimestamp, setLastCloudSyncTimestamp] = useState<number | undefined>(() => {
    return userProfile.lastSyncedAt;
  });

  // Helper to compute a unique signature of the app state for preventing sync feedback loops
  const getStateSignature = (
    currentZikrs: ZikrItem[],
    currentHistory: HistorySession[],
    currentLifetime: number,
    currentProfile: UserProfile,
    currentSettings: AppSettings
  ) => {
    try {
      const zikrSummary = (currentZikrs || []).map((z) => `${z.id}:${z.count}:${z.target || 0}`).join('|');
      const histSummary = (currentHistory || []).length;
      const profSummary = `${currentProfile.name || ''}:${currentProfile.photoUrl || ''}:${currentProfile.password || ''}`;
      const setSummary = `${currentSettings.themeMode}:${currentSettings.soundEnabled}:${currentSettings.vibrationEnabled}`;
      return `${zikrSummary}_${histSummary}_${currentLifetime}_${profSummary}_${setSummary}`;
    } catch {
      return '';
    }
  };

  // Multi-Device Cloud Synchronization Refs
  const isCloudSyncReadyRef = useRef<boolean>(false);
  const lastSyncedSignatureRef = useRef<string>('');
  const lastLocalActionTimestampRef = useRef<number>(0);

  // Helper: Apply cloud data snapshot to active state (Seamless cross-device, web & app sync!)
  const applyCloudDataToState = (cloudData: CloudZikrState, isFromOtherDevice: boolean = false, isInitialSnapshot: boolean = false) => {
    isCloudSyncReadyRef.current = true;

    // Calculate current local total count
    const localZikrSum = zikrsRef.current.reduce((acc, curr) => acc + (curr.count || 0), 0);
    const localGrandTotal = Math.max(lifetimeTotalCount, localZikrSum);
    const cloudGrandTotal = typeof cloudData.lifetimeTotalCount === 'number' ? cloudData.lifetimeTotalCount : 0;

    // 1. Synchronize Profile (photoUrl, password, name, location) across all devices / web & app!
    let mergedProfile = userProfile;
    if (cloudData.profile) {
      const incomingPhoto = cloudData.profile.photoUrl;
      const incomingPass = cloudData.profile.password;
      const incomingName = cloudData.profile.name;
      const incomingLoc = cloudData.profile.location;

      setUserProfile((prev) => {
        const merged: UserProfile = {
          ...prev,
          name: incomingName || prev.name,
          photoUrl: incomingPhoto !== undefined ? incomingPhoto : prev.photoUrl,
          password: incomingPass !== undefined && incomingPass ? incomingPass : prev.password,
          location: incomingLoc || prev.location,
          isSignedIn: true,
          emailOrPhone: prev.emailOrPhone || cloudData.profile?.emailOrPhone || '',
        };
        mergedProfile = merged;
        try {
          localStorage.setItem('zikrmate_user_profile', JSON.stringify(merged));
          saveAccountToRegistry(merged);
        } catch {}
        return merged;
      });
    }

    // 2. Multi-device live sync vs Local refresh protection
    // If update came from ANOTHER device, ALWAYS apply cloud data to match identically!
    // If update is from THIS device and is initial snapshot:
    // If local was higher or equal and local has counts, keep local and sync to cloud!
    const cloudZikrSum = Array.isArray(cloudData.zikrs)
      ? cloudData.zikrs.reduce((acc, curr) => acc + (curr.count || 0), 0)
      : 0;
    const shouldKeepLocalOnRefresh =
      !isFromOtherDevice &&
      isInitialSnapshot &&
      (localGrandTotal > cloudGrandTotal ||
        localZikrSum > cloudZikrSum ||
        (localZikrSum > 0 && cloudZikrSum === 0) ||
        (localGrandTotal === cloudGrandTotal && localZikrSum > 0 && cloudZikrSum === 0));

    if (shouldKeepLocalOnRefresh) {
      // Local has newer/valid uncommitted counts on this device, push local to cloud
      const targetEmail = (userProfile.emailOrPhone || '').toLowerCase().trim();
      if (targetEmail) {
        saveUserDataToCloud(
          targetEmail,
          userProfile,
          zikrsRef.current,
          historySessions,
          localGrandTotal,
          settings,
          getAllAamalLogs()
        ).catch(() => {});
      }
      lastSyncedSignatureRef.current = getStateSignature(
        zikrsRef.current,
        historySessions,
        localGrandTotal,
        mergedProfile,
        settings
      );
      setLastCloudSyncTimestamp(Date.now());
      return;
    }

    // Otherwise (from other device OR cloud is newer/equal): apply cloud data!
    let appliedZikrs = zikrsRef.current;
    if (cloudData.zikrs && Array.isArray(cloudData.zikrs) && cloudData.zikrs.length > 0) {
      const incomingSum = cloudData.zikrs.reduce((acc, curr) => acc + (curr.count || 0), 0);
      // Safety: Never wipe non-zero local counts with all-zero cloud counts on local refresh
      if (incomingSum > 0 || isFromOtherDevice || localZikrSum === 0) {
        appliedZikrs = cloudData.zikrs;
        setZikrs(cloudData.zikrs);
        try {
          localStorage.setItem('noor_zikr_items', JSON.stringify(cloudData.zikrs));
          if (incomingSum > 0) {
            localStorage.setItem('zikrmate_active_zikrs_backup', JSON.stringify(cloudData.zikrs));
          }
        } catch {}
      }
    }

    // Synchronize History Sessions
    let appliedHistory = historySessions;
    if (cloudData.history && Array.isArray(cloudData.history)) {
      appliedHistory = cloudData.history;
      setHistorySessions(cloudData.history);
      try {
        localStorage.setItem('noor_zikr_history', JSON.stringify(cloudData.history));
      } catch {}
    }

    // Synchronize Lifetime Total Count
    let appliedLifetime = lifetimeTotalCount;
    if (typeof cloudData.lifetimeTotalCount === 'number') {
      appliedLifetime = cloudData.lifetimeTotalCount;
      setLifetimeTotalCount(cloudData.lifetimeTotalCount);
      try {
        localStorage.setItem('zikrmate_lifetime_total_count', String(cloudData.lifetimeTotalCount));
      } catch {}
    }

    // Synchronize App Settings
    let appliedSettings = settings;
    if (cloudData.settings) {
      appliedSettings = { ...settings, ...cloudData.settings };
      setSettings(appliedSettings);
    }

    // Synchronize Aamal Logs
    if (cloudData.aamalLogs && typeof cloudData.aamalLogs === 'object') {
      try {
        clearAllAamalLogs();
        for (const [dateKey, logData] of Object.entries(cloudData.aamalLogs)) {
          localStorage.setItem(`zikrmate_aamal_${dateKey}`, JSON.stringify(logData));
        }
      } catch {}
    }

    // Record applied state signature to ensure this incoming cloud state is not treated as a new local edit
    lastSyncedSignatureRef.current = getStateSignature(
      appliedZikrs,
      appliedHistory,
      appliedLifetime,
      mergedProfile,
      appliedSettings
    );

    const now = Date.now();
    setLastCloudSyncTimestamp(now);
  };

  // Helper: Initialize fresh ZERO state when a user first signs in or logs in
  const initializeFreshZeroUserState = async (targetProfile: UserProfile) => {
    isCloudSyncReadyRef.current = true;

    // 1. Reset all zikrs to count 0
    const freshZikrs: ZikrItem[] = DEFAULT_ZIKRS.map((item) => ({
      ...item,
      count: 0,
      updatedAt: Date.now(),
    }));
    setZikrs(freshZikrs);

    // 2. Reset lifetime total count to 0
    setLifetimeTotalCount(0);

    // 3. Reset history sessions to empty
    setHistorySessions([]);

    // 4. Reset aamal logs for today to 0
    clearAllAamalLogs();
    const todayKey = getTodayDateKey();
    const freshAamal = { [todayKey]: createInitialDayLog(todayKey) };

    // 5. Update localStorage
    try {
      localStorage.setItem('noor_zikr_items', JSON.stringify(freshZikrs));
      localStorage.setItem('noor_zikr_history', JSON.stringify([]));
      localStorage.setItem('zikrmate_lifetime_total_count', '0');
    } catch {}

    // 6. Save zero baseline state to cloud for this user
    const targetEmail = (targetProfile.emailOrPhone || '').toLowerCase().trim();
    if (targetEmail) {
      await saveUserDataToCloud(
        targetEmail,
        targetProfile,
        freshZikrs,
        [],
        0,
        settings,
        freshAamal
      );
      lastSyncedSignatureRef.current = getStateSignature(freshZikrs, [], 0, targetProfile, settings);
    }

    const now = Date.now();
    setLastCloudSyncTimestamp(now);
    showToast('✨ স্বাগতম! আপনার অ্যাকাউন্ট নতুনভাবে ০ থেকে শুরু হয়েছে। এখন থেকে আপনার সকল জিকির গণনা ও হিস্ট্রি সংরক্ষিত হবে।');
  };

  // 1. Real-time Multi-Device Cloud Subscription (Listens for updates from ANY device, web & app)
  useEffect(() => {
    if (!userProfile.isSignedIn || !userProfile.emailOrPhone) {
      isCloudSyncReadyRef.current = false;
      return;
    }

    const emailOrPhone = userProfile.emailOrPhone.trim().toLowerCase();
    const currentDeviceId = getDeviceId();

    const unsubscribe = subscribeToUserDataInCloud(emailOrPhone, (cloudData, isInitial) => {
      if (!cloudData.foundInCloud) {
        // If local device already has counted data, save local data to cloud instead of resetting to 0!
        const localZikrSum = zikrsRef.current.reduce((acc, curr) => acc + (curr.count || 0), 0);
        const hasExistingLocalData = localZikrSum > 0 || lifetimeTotalCountRef.current > 0;
        if (hasExistingLocalData) {
          saveUserDataToCloud(
            emailOrPhone,
            userProfile,
            zikrsRef.current,
            historySessions,
            Math.max(lifetimeTotalCountRef.current, localZikrSum),
            settings,
            getAllAamalLogs()
          ).catch(() => {});
          isCloudSyncReadyRef.current = true;
          return;
        }

        // Only initialize fresh zero if local is truly empty
        initializeFreshZeroUserState(userProfile);
        return;
      }

      // Check if update came from a different device (e.g. mobile app vs web)
      const isFromOtherDevice = !!(cloudData.senderDeviceId && cloudData.senderDeviceId !== currentDeviceId);

      // Apply latest cloud data to local state
      applyCloudDataToState(cloudData, isFromOtherDevice, isInitial);

      if (isFromOtherDevice && !isInitial) {
        showToast('🔄 অন্য ডিভাইস থেকে জিকির লাইভ সিঙ্ক হয়েছে!');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userProfile.isSignedIn, userProfile.emailOrPhone]);

  // 2. Snappy auto-save to cloud when user changes counters on THIS device (Ultra-fast 30ms sync)
  const cloudSyncDebounceRef = useRef<any>(null);
  useEffect(() => {
    if (!userProfile.isSignedIn || !userProfile.emailOrPhone) return;

    // Do NOT push local blank state before cloud data has been loaded
    if (!isCloudSyncReadyRef.current) return;

    // Check if current state is already identical to what was loaded/synced
    const currentSignature = getStateSignature(zikrs, historySessions, lifetimeTotalCount, userProfile, settings);
    if (currentSignature && currentSignature === lastSyncedSignatureRef.current) {
      return; // No local modifications, do not re-save
    }

    if (cloudSyncDebounceRef.current) clearTimeout(cloudSyncDebounceRef.current);
    cloudSyncDebounceRef.current = setTimeout(async () => {
      const allAamal = getAllAamalLogs();
      const ok = await saveUserDataToCloud(
        userProfile.emailOrPhone,
        userProfile,
        zikrs,
        historySessions,
        lifetimeTotalCount,
        settings,
        allAamal
      );
      if (ok) {
        lastSyncedSignatureRef.current = getStateSignature(zikrs, historySessions, lifetimeTotalCount, userProfile, settings);
        const now = Date.now();
        setLastCloudSyncTimestamp(now);
      }
    }, 30);

    return () => {
      if (cloudSyncDebounceRef.current) clearTimeout(cloudSyncDebounceRef.current);
    };
  }, [zikrs, historySessions, lifetimeTotalCount, userProfile, settings]);

  // Handler when user signs in with email/phone and cloud data is restored
  const handleCloudDataLoaded = (cloudData: CloudZikrState, targetEmailOrPhone?: string) => {
    const targetEmail = (targetEmailOrPhone || userProfile.emailOrPhone || '').toLowerCase().trim();
    if (!cloudData.foundInCloud) {
      // First signin / new user! Initialize everything to 0
      initializeFreshZeroUserState({
        ...userProfile,
        emailOrPhone: targetEmail,
        isSignedIn: true,
      });
      return;
    }

    applyCloudDataToState(cloudData);
  };

  // Manual Trigger Cloud Sync
  const handleTriggerCloudSync = async (): Promise<boolean> => {
    if (!userProfile.isSignedIn || !userProfile.emailOrPhone) {
      showToast('লগইন করুন ক্লাউডে ডাটা সেভ করার জন্য');
      return false;
    }

    setIsSyncingCloud(true);
    const allAamal = getAllAamalLogs();
    const ok = await saveUserDataToCloud(
      userProfile.emailOrPhone,
      userProfile,
      zikrs,
      historySessions,
      lifetimeTotalCount,
      settings,
      allAamal
    );
    setIsSyncingCloud(false);

    if (ok) {
      const now = Date.now();
      setLastCloudSyncTimestamp(now);
      setUserProfile((prev) => ({ ...prev, lastSyncedAt: now }));
      showToast('☁️ ক্লাউডে সব জিকির হিস্ট্রি ও প্রোফাইল সফলভাবে সিঙ্ক হয়েছে!');
      return true;
    } else {
      showToast('⚠️ ক্লাউড সিঙ্কে সমস্যা হয়েছে, অফলাইনে ডাটা সুরক্ষিত আছে');
      return false;
    }
  };

  const handleUpdateProfile = async (updated: UserProfile) => {
    const wasSignedIn = userProfile.isSignedIn;
    const oldEmail = (userProfile.emailOrPhone || '').toLowerCase().trim();
    const newEmail = (updated.emailOrPhone || '').toLowerCase().trim();
    const isLoginOrSwitch = updated.isSignedIn && (!wasSignedIn || oldEmail !== newEmail);

    setUserProfile(updated);
    try {
      localStorage.setItem('zikrmate_user_profile', JSON.stringify(updated));

      // 1. Handle LOGOUT: Clean and zero state so next user/guest doesn't see old counts
      if (wasSignedIn && !updated.isSignedIn) {
        const resetZikrs: ZikrItem[] = DEFAULT_ZIKRS.map((item) => ({
          ...item,
          count: 0,
          updatedAt: Date.now(),
        }));
        setZikrs(resetZikrs);
        setHistorySessions([]);
        setLifetimeTotalCount(0);
        clearAllAamalLogs();
        try {
          localStorage.setItem('noor_zikr_items', JSON.stringify(resetZikrs));
          localStorage.setItem('noor_zikr_history', JSON.stringify([]));
          localStorage.setItem('zikrmate_lifetime_total_count', '0');
        } catch {}
        showToast('লগআউট সম্পন্ন হয়েছে। সকল কাউন্টার ফ্রেশ করা হয়েছে।');
        return;
      }

      // 2. Handle LOGIN or SWITCHING ACCOUNT (from guest or another user)
      if (isLoginOrSwitch && newEmail) {
        saveAccountToRegistry(updated);

        // Fetch cloud data for this specific new account
        const cloudData = await loadUserDataFromCloud(newEmail);

        if (!cloudData || !cloudData.foundInCloud) {
          // BRAND NEW ID / NEW GMAIL!
          // MUST initialize everything to zero! Previous user's data on device must NOT be shown!
          await initializeFreshZeroUserState(updated);
          return;
        } else {
          // Existing user with saved cloud history: restore THAT user's data!
          applyCloudDataToState(cloudData);
          return;
        }
      }

      // 3. Same user profile edits (e.g. updating name, avatar photo, password, settings)
      if (updated.isSignedIn && newEmail) {
        saveAccountToRegistry(updated);
        await saveUserDataToCloud(
          newEmail,
          updated,
          zikrs,
          historySessions,
          lifetimeTotalCount,
          settings,
          getAllAamalLogs()
        );
        showToast('✓ প্রোফাইল তথ্য ক্লাউডে সফলভাবে সংরক্ষিত হয়েছে!');
      }
    } catch (e) {
      console.error('Error in handleUpdateProfile:', e);
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('zikrmate_user_profile', JSON.stringify(userProfile));
      if (userProfile.isSignedIn && (userProfile.emailOrPhone || userProfile.name)) {
        saveAccountToRegistry(userProfile);
      }
    } catch {}
  }, [userProfile]);

  // Modals state
  const [isZikrModalOpen, setIsZikrModalOpen] = useState(false);
  const [zikrToEdit, setZikrToEdit] = useState<ZikrItem | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isHistoryReportModalOpen, setIsHistoryReportModalOpen] = useState(false);
  const [isStandaloneModalOpen, setIsStandaloneModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Wake lock sentinel ref
  const wakeLockRef = useRef<any>(null);

  // Save zikrs to localStorage on every change and sync with today's Aamal day log
  useEffect(() => {
    try {
      localStorage.setItem('noor_zikr_items', JSON.stringify(zikrs));
      const activeSum = zikrs.reduce((acc, curr) => acc + (curr.count || 0), 0);
      if (activeSum > 0) {
        localStorage.setItem('zikrmate_active_zikrs_backup', JSON.stringify(zikrs));
      }
      syncTodayAamalWithLiveZikrs(zikrs);
    } catch (e) {
      console.error('Failed to save zikrs to localStorage', e);
    }
  }, [zikrs]);

  // Save history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('noor_zikr_history', JSON.stringify(historySessions));
    } catch (e) {
      console.error('Failed to save history to localStorage', e);
    }
  }, [historySessions]);

  // Save settings and sync body classes
  useEffect(() => {
    try {
      localStorage.setItem('noor_zikr_settings', JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings to localStorage', e);
    }
    const isDay = settings.themeMode === 'day';
    document.body.classList.toggle('theme-day', isDay);
    document.body.classList.toggle('theme-night', !isDay);
  }, [settings]);

  // Master Daily Total Count (Resets at midnight 12:00 AM)
  const dailyTotal = useMemo(() => {
    return zikrs.reduce((acc, curr) => acc + (curr.count || 0), 0);
  }, [zikrs]);

  // Daily Transition Check: Updates active date key and syncs Aamal day logs without resetting live counters
  useEffect(() => {
    const checkDateTransition = () => {
      const todayKey = getTodayDateKey();
      const lastActiveDate = localStorage.getItem('zikrmate_last_active_date_key');

      if (!lastActiveDate) {
        localStorage.setItem('zikrmate_last_active_date_key', todayKey);
        return;
      }

      if (lastActiveDate !== todayKey) {
        // A new day has begun: update date key without resetting counters
        localStorage.setItem('zikrmate_last_active_date_key', todayKey);
        // Ensure today's Aamal log is initialized and synchronized with active counts
        syncTodayAamalWithLiveZikrs(zikrsRef.current, todayKey);
      }
    };

    // Run check on mount
    checkDateTransition();

    // Check periodically for day transitions
    const interval = setInterval(checkDateTransition, 30000);
    return () => clearInterval(interval);
  }, []);

  // Auto-Refresh Effect based on refreshMode (fard, maghrib, manual)
  useEffect(() => {
    const checkAutoRefresh = () => {
      try {
        const pTimes = calculatePrayerTimes();
        const currentPrayer = pTimes.currentPrayerName;
        const now = new Date();

        if (refreshMode === 'fard') {
          const lastFard = localStorage.getItem('zikrmate_last_fard_segment');
          const fardNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
          if (fardNames.includes(currentPrayer)) {
            if (!lastFard) {
              localStorage.setItem('zikrmate_last_fard_segment', currentPrayer);
            } else if (lastFard !== currentPrayer) {
              localStorage.setItem('zikrmate_last_fard_segment', currentPrayer);
              const hasCounts = zikrsRef.current.some((z) => z.count > 0);
              if (hasCounts) {
                lastSyncedSignatureRef.current = '';
                setZikrs((prev) => prev.map((z) => ({ ...z, count: 0, updatedAt: Date.now() })));
                showToast(
                  selectedLanguage === 'bn'
                    ? '🕌 ফরজ নামাজের পর সকল যিকির কাউন্টার ০ করা হয়েছে!'
                    : '🕌 Counters reset to 0 after Fard prayer transition!'
                );
              }
            }
          }
        } else if (refreshMode === 'maghrib') {
          const todayKey = getTodayDateKey();
          const maghribResetKey = `${todayKey}_maghrib`;
          const lastMaghribReset = localStorage.getItem('zikrmate_last_maghrib_reset_key');

          const maghribTime = pTimes.maghribDate;
          if (now >= maghribTime) {
            if (!lastMaghribReset) {
              localStorage.setItem('zikrmate_last_maghrib_reset_key', maghribResetKey);
            } else if (lastMaghribReset !== maghribResetKey) {
              localStorage.setItem('zikrmate_last_maghrib_reset_key', maghribResetKey);
              const hasCounts = zikrsRef.current.some((z) => z.count > 0);
              if (hasCounts) {
                lastSyncedSignatureRef.current = '';
                setZikrs((prev) => prev.map((z) => ({ ...z, count: 0, updatedAt: Date.now() })));
                showToast(
                  selectedLanguage === 'bn'
                    ? '🌅 মাগরিবের ওয়াক্ত শুরু হওয়ায় সকল যিকির কাউন্টার ০ করা হয়েছে!'
                    : '🌅 Counters reset to 0 at Maghrib prayer time!'
                );
              }
            }
          }
        }
      } catch (e) {
        console.error('Error checking auto-refresh:', e);
      }
    };

    checkAutoRefresh();
    const interval = setInterval(checkAutoRefresh, 15000);
    return () => clearInterval(interval);
  }, [refreshMode, selectedLanguage]);

  // Handle Refresh Mode switch by user
  const handleRefreshModeChange = (newMode: ZikrRefreshMode) => {
    setRefreshMode(newMode);
    try {
      localStorage.setItem('zikrmate_refresh_mode', newMode);
    } catch {}

    setZikrs((prev) =>
      prev.map((item) => {
        const matchedDefault = DEFAULT_ZIKRS.find(
          (d) => d.id === item.id || (item.name && d.name.toLowerCase() === item.name.toLowerCase())
        );

        const fardTarget = item.fardTarget ?? matchedDefault?.fardTarget;
        const maghribTarget = item.maghribTarget ?? matchedDefault?.maghribTarget;
        const manualTarget = item.manualTarget ?? matchedDefault?.manualTarget;

        const updatedItem = {
          ...item,
          fardTarget,
          maghribTarget,
          manualTarget,
        };

        const newTarget = getTargetForZikrMode(updatedItem, newMode);

        return {
          ...updatedItem,
          target: newTarget,
          updatedAt: Date.now(),
        };
      })
    );

    const modeLabels: Record<ZikrRefreshMode, { bn: string; en: string }> = {
      fard: {
        bn: 'রিফ্রেশ মোড: প্রত্যেক ফরজ নামাজের পর কাউন্টার ০ হবে (টার্গেট: ১-৩৩)',
        en: 'Refresh Mode: Reset after Every Fard Salah',
      },
      maghrib: {
        bn: 'রিফ্রেশ মোড: প্রতিদিন মাগরিবের পর কাউন্টার ০ হবে (টার্গেট: ৫-১৬৫)',
        en: 'Refresh Mode: Reset Daily After Maghrib',
      },
      manual: {
        bn: 'রিফ্রেশ মোড: ম্যানুয়ালি রিফ্রেশ (টার্গেট: ৫০-২০০)',
        en: 'Refresh Mode: Manual Reset Only',
      },
    };
    showToast(modeLabels[newMode][selectedLanguage === 'bn' ? 'bn' : 'en']);
  };

  // Manual counter refresh button handler
  const handleManualCounterRefresh = () => {
    setConfirmDialog({
      isOpen: true,
      title: selectedLanguage === 'bn' ? 'সব কাউন্টার ০ করুন' : 'Reset All Counters',
      message: selectedLanguage === 'bn'
        ? 'আপনি কি নিশ্চিত যে সমস্ত যিকির কাউন্টার ০ করতে চান? (আপনার মাস্টার টোটাল এবং হিস্ট্রি সুরক্ষিত থাকবে)'
        : 'Are you sure you want to reset all individual Zikr counters to 0? (Master total and history will remain safe)',
      confirmLabel: selectedLanguage === 'bn' ? 'হ্যাঁ, ০ করুন' : 'Yes, Reset to 0',
      isDanger: false,
      onConfirm: () => {
        lastSyncedSignatureRef.current = '';
        setZikrs((prev) => prev.map((item) => ({ ...item, count: 0, updatedAt: Date.now() })));
        if (settings.vibrationEnabled) soundHaptics.vibrate(50);
        if (settings.soundEnabled) soundHaptics.playReset();
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        showToast(selectedLanguage === 'bn' ? 'সকল যিকির কাউন্টার ০ করা হয়েছে' : 'All Zikr counters reset to 0');
      },
    });
  };


  // Screen Awake Lock management
  useEffect(() => {
    const requestWakeLock = async () => {
      if ('wakeLock' in navigator && settings.screenAwake) {
        try {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen');
        } catch {
          // Ignored
        }
      } else if (wakeLockRef.current) {
        try {
          await wakeLockRef.current.release();
          wakeLockRef.current = null;
        } catch {}
      }
    };
    requestWakeLock();
  }, [settings.screenAwake]);

  // Master Grand Total Count (Grand cumulative total of all zikrs including history logs sum)
  const masterGrandTotal = useMemo(() => {
    const allLogs = getAllAamalLogs();
    const historySum = Object.values(allLogs).reduce((acc, log) => acc + (log.dhikrCount || 0), 0);
    const activeSum = zikrs.reduce((acc, curr) => acc + (curr.count || 0), 0);
    return Math.max(lifetimeTotalCount, historySum, activeSum);
  }, [zikrs, lifetimeTotalCount, historySessions]);

  // Completed Goals Count
  const completedGoals = useMemo(() => {
    return zikrs.filter((z) => z.target && z.target > 0 && z.count >= z.target).length;
  }, [zikrs]);

  // Toast feedback helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Toggle Day and Night Mode
  const handleToggleThemeMode = () => {
    const newMode: ThemeMode = settings.themeMode === 'day' ? 'night' : 'day';
    setSettings((prev) => ({ ...prev, themeMode: newMode }));
    if (settings.soundEnabled) soundHaptics.playTap();
    showToast(newMode === 'night' ? 'Switched to Black Type Theme 🌙' : 'Switched to Light Mint Theme ☀️');
  };

  // Sound toggle
  const handleToggleSound = () => {
    const nextVal = !settings.soundEnabled;
    setSettings((prev) => ({ ...prev, soundEnabled: nextVal }));
    showToast(nextVal ? 'Sound effects enabled' : 'Muted audio');
  };

  // Vibration toggle
  const handleToggleVibration = () => {
    const nextVal = !settings.vibrationEnabled;
    setSettings((prev) => ({ ...prev, vibrationEnabled: nextVal }));
    if (nextVal && navigator.vibrate) navigator.vibrate(50);
    showToast(nextVal ? 'Vibration enabled' : 'Vibration disabled');
  };

  // Increment Zikr
  const handleIncrement = (id: string) => {
    lastSyncedSignatureRef.current = '';
    const targetZikr = zikrs.find((item) => item.id === id);
    if (!targetZikr) return;

    const newCount = targetZikr.count + 1;
    const isGoalJustReached = targetZikr.target && newCount === targetZikr.target;
    const now = Date.now();

    setZikrs((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: newCount, updatedAt: now } : item
      )
    );

    // Increment Lifetime Grand Total
    setLifetimeTotalCount((prev) => prev + 1);

    // Permanently record in today's Aamal Tracker History (persists even if zikr counter is reset)
    recordZikrIncrementInAamal(targetZikr, 1);

    if (settings.vibrationEnabled) {
      if (isGoalJustReached) {
        soundHaptics.triggerVibration('target');
      } else {
        soundHaptics.triggerVibration('tap');
      }
    }

    if (settings.soundEnabled) {
      if (isGoalJustReached) {
        soundHaptics.playMilestone();
      } else {
        soundHaptics.playTap();
      }
    }

    if (isGoalJustReached) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#1c6469', '#2dd4bf', '#f59e0b', '#10b981'],
      });
      showToast(`Mabrook! Goal completed for ${targetZikr.name}!`);
    }
  };

  // Decrement Zikr
  const handleDecrement = (id: string) => {
    lastSyncedSignatureRef.current = '';
    const targetZikr = zikrs.find((item) => item.id === id);
    if (!targetZikr || targetZikr.count <= 0) return;

    const now = Date.now();

    setZikrs((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, count: Math.max(0, item.count - 1), updatedAt: now }
          : item
      )
    );

    setLifetimeTotalCount((prev) => Math.max(0, prev - 1));

    if (settings.vibrationEnabled) soundHaptics.vibrate(30);
    if (settings.soundEnabled) soundHaptics.playTap();
  };

  // Move Zikr up/down
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setZikrs((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      return copy;
    });
  };

  const handleMoveDown = (index: number) => {
    if (index >= zikrs.length - 1) return;
    setZikrs((prev) => {
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      return copy;
    });
  };

  // Confirmation modal dialog state
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmLabel: string;
    isDanger: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    confirmLabel: 'Confirm',
    isDanger: false,
    onConfirm: () => {},
  });

  // Reset single Zikr
  const handleConfirmResetIndividual = (zikr: ZikrItem) => {
    setConfirmDialog({
      isOpen: true,
      title: `Reset ${zikr.name}?`,
      message: `Are you sure you want to reset the count of "${zikr.name}" from ${zikr.count} back to 0?`,
      confirmLabel: 'Reset to 0',
      isDanger: false,
      onConfirm: () => {
        lastSyncedSignatureRef.current = '';
        setZikrs((prev) =>
          prev.map((item) =>
            item.id === zikr.id ? { ...item, count: 0, updatedAt: Date.now() } : item
          )
        );
        if (settings.vibrationEnabled) soundHaptics.vibrate(60);
        if (settings.soundEnabled) soundHaptics.playReset();
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        showToast(`Reset ${zikr.name} to 0`);
      },
    });
  };

  // Delete Zikr
  const handleConfirmDelete = (zikr: ZikrItem) => {
    setConfirmDialog({
      isOpen: true,
      title: `Delete ${zikr.name}?`,
      message: `This will permanently remove "${zikr.name}" (Count: ${zikr.count}) from your counters.`,
      confirmLabel: 'Delete Forever',
      isDanger: true,
      onConfirm: () => {
        lastSyncedSignatureRef.current = '';
        setZikrs((prev) => prev.filter((item) => item.id !== zikr.id));
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        showToast(`Deleted ${zikr.name}`);
      },
    });
  };

  // Global Reset
  const handleGlobalReset = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Global Counter Reset (রিসেট অল)',
      message: `আপনি কি নিশ্চিত যে সকল কাউন্টার ও সর্বমোট গণনা (${lifetimeTotalCount.toLocaleString()}) রিসেট করতে চান?`,
      confirmLabel: 'Yes, Reset All to 0',
      isDanger: true,
      onConfirm: () => {
        lastSyncedSignatureRef.current = '';
        setZikrs((prev) => prev.map((item) => ({ ...item, count: 0, updatedAt: Date.now() })));
        setLifetimeTotalCount(0);
        try {
          localStorage.removeItem('zikrmate_active_zikrs_backup');
        } catch {}
        if (settings.vibrationEnabled) soundHaptics.vibrate([70, 50, 70]);
        if (settings.soundEnabled) soundHaptics.playReset();
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        showToast('All counters & Grand Total reset to 0');
      },
    });
  };

  // Save current counts to History archive
  const handleSaveSession = () => {
    if (dailyTotal === 0 && lifetimeTotalCount === 0) {
      showToast('Cannot save empty session (Total is 0)');
      return;
    }

    const currentTotal = dailyTotal > 0 ? dailyTotal : lifetimeTotalCount;

    const newSession: HistorySession = {
      id: `session_${Date.now()}`,
      timestamp: Date.now(),
      dateStr: new Date().toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      totalCount: currentTotal,
      breakdown: zikrs.map((z) => ({
        name: z.name,
        count: z.count,
        target: z.target,
        arabic: z.arabic,
      })),
    };

    lastSyncedSignatureRef.current = '';
    setHistorySessions((prev) => [newSession, ...prev]);
    if (settings.soundEnabled) soundHaptics.playMilestone();
    showToast(`Saved session: ${currentTotal} total counts archived!`);
  };

  // Save Add/Edit Zikr
  const handleSaveZikr = (
    data: Omit<ZikrItem, 'id' | 'createdAt' | 'count' | 'updatedAt'>,
    id?: string
  ) => {
    lastSyncedSignatureRef.current = '';
    const now = Date.now();
    if (id) {
      setZikrs((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...data, updatedAt: now } : item
        )
      );
      showToast(`Updated "${data.name}"`);
    } else {
      const newZikr: ZikrItem = {
        ...data,
        id: `custom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        count: 0,
        createdAt: now,
        updatedAt: now,
      };
      setZikrs((prev) => [...prev, newZikr]);
      showToast(`Added "${data.name}" to counters`);
    }
    setIsZikrModalOpen(false);
    setZikrToEdit(null);
  };

  // Restore Default Zikrs
  const handleRestoreDefaults = () => {
    setConfirmDialog({
      isOpen: true,
      title: 'Restore Default Counters',
      message: 'This will reset your counters list back to the authentic traditional Sunnah invocations.',
      confirmLabel: 'Restore Defaults',
      isDanger: false,
      onConfirm: () => {
        setZikrs(DEFAULT_ZIKRS);
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
        showToast('Restored default zikrs');
      },
    });
  };

  // Add Dua to Counters
  const handleAddDuaToCounters = (dua: DuaItem) => {
    const existing = zikrs.find(
      (z) => z.name.toLowerCase() === dua.title.toLowerCase() || z.arabic === dua.arabic
    );
    if (existing) {
      showToast(`"${dua.title}" is already in your counters!`);
      setActiveModule('zikir_counter');
      return;
    }

    const now = Date.now();
    const newZikr: ZikrItem = {
      id: `dua_${dua.id}_${now}`,
      name: dua.title,
      arabic: dua.arabic,
      transliteration: dua.transliteration,
      meaning: dua.translation,
      count: 0,
      target: dua.suggestedCount || 33,
      createdAt: now,
      updatedAt: now,
    };

    setZikrs((prev) => [...prev, newZikr]);
    if (settings.soundEnabled) soundHaptics.playMilestone();
    showToast(`Added "${dua.title}" to counters!`);
    setActiveModule('zikir_counter');
  };

  // PDF Export - Opens the Comprehensive Multi-Period Report Generator (1 Day / 1 Month / 4 Months / 1 Year / 10 Years)
  const handleExportPdf = () => {
    setIsHistoryReportModalOpen(true);
    if (settings.soundEnabled) soundHaptics.playTap();
  };

  // Primary 5 module items metadata (Zikir Counter, Quran, Salat Time, Aamal Tracker, Other)
  const otherModules: NavModule[] = ['other', 'dua', 'hadith', 'kitab', 'tablig', 'allah_names', 'hajj_umrah'];
  const isOtherActive = otherModules.includes(activeModule);

  const moduleTabs: Array<{
    id: NavModule;
    label: string;
    arabic: string;
    icon: string;
    badge?: string | number;
    isActive: boolean;
  }> = [
    {
      id: 'zikir_counter',
      label: NAV_TRANSLATIONS.zikir_counter[selectedLanguage],
      arabic: 'الذِّكْر',
      icon: '📿',
      badge: dailyTotal > 0 ? dailyTotal : lifetimeTotalCount,
      isActive: activeModule === 'zikir_counter',
    },
    {
      id: 'quran',
      label: NAV_TRANSLATIONS.quran[selectedLanguage],
      arabic: 'القرآن',
      icon: '📖',
      isActive: activeModule === 'quran',
    },
    {
      id: 'salat_time',
      label: NAV_TRANSLATIONS.salat_time[selectedLanguage],
      arabic: 'الصلاة',
      icon: '🕌',
      isActive: activeModule === 'salat_time',
    },
    {
      id: 'aamal_tracker',
      label: NAV_TRANSLATIONS.aamal_tracker[selectedLanguage],
      arabic: 'الأعمال',
      icon: '📋',
      isActive: activeModule === 'aamal_tracker',
    },
    {
      id: 'other',
      label: selectedLanguage === 'bn' ? 'অন্যান্য (Other)' : 'Other',
      arabic: 'أخرى',
      icon: '✨',
      badge: '6 Tools',
      isActive: isOtherActive,
    },
  ];

  const isDay = settings.themeMode === 'day';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 pb-20 md:pb-8 selection:bg-emerald-600 selection:text-white ${
        isDay ? 'bg-[#f4faf8] text-[#0a3328]' : 'bg-[#070e14] text-[#f1f8f7]'
      }`}
    >
      {/* Top Header */}
      <Header
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        soundEnabled={settings.soundEnabled}
        onToggleSound={handleToggleSound}
        themeMode={settings.themeMode}
        onToggleThemeMode={handleToggleThemeMode}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={(lang) => {
          setSelectedLanguage(lang);
          const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
          showToast(`ভাষা পরিবর্তন: ${langObj?.label || lang}`);
        }}
        onExportPdf={handleExportPdf}
        isExportingPdf={isExportingPdf}
        onOpenStandaloneModal={() => setIsStandaloneModalOpen(true)}
        userProfile={userProfile}
        onOpenProfile={(tab = 'profile') => handleOpenProfileModal(tab)}
      />

      {/* Toast Notification Popup */}
      {toastMessage && (
        <div
          className={`fixed top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2 border ${
            isDay
              ? 'bg-[#006747] text-white border-emerald-300 shadow-[#006747]/30'
              : 'bg-[#0e242d] text-[#2dd4bf] border-[#20525d] shadow-black/80'
          }`}
        >
          <BookmarkCheck className="w-4 h-4 text-[#2dd4bf]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6">
        {/* Top Islamic Greeting & Module Switcher Card */}
        <div
          className={`rounded-[26px] p-3.5 sm:p-4.5 border transition-colors shadow-xl ${
            isDay
              ? 'bg-white border-[#dcebe8] shadow-[#006747]/5'
              : 'bg-[#0e1c26] border-[#1a3342] shadow-black/50'
          }`}
        >
          <div
            className={`flex items-center justify-between pb-2.5 mb-2.5 border-b flex-wrap gap-2 text-xs ${
              isDay ? 'border-[#e2edf0]' : 'border-[#152936]'
            }`}
          >
            <div
              className={`flex items-center gap-2 font-bold ${
                isDay ? 'text-[#006747]' : 'text-[#2dd4bf]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-arabic text-sm">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            </div>
            <div className={`text-[11px] font-medium ${isDay ? 'text-[#4a6b72]' : 'text-[#7ba3a9]'}`}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          </div>

          {/* Module Selector Category Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {moduleTabs.map((tab) => {
              const isActive = tab.isActive;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveModule(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all active:scale-95 cursor-pointer shrink-0 border ${
                    isActive
                      ? isDay
                        ? 'bg-[#006747] text-white border-[#006747] shadow-md shadow-[#006747]/20'
                        : 'bg-[#1c6469] text-white border-[#288a91] shadow-lg shadow-black/40'
                      : isDay
                      ? 'bg-[#e2edf0] hover:bg-[#d5e7eb] text-[#2c535a] border-[#cce0e5]'
                      : 'bg-[#0a1620] hover:bg-[#102330] text-[#7ba3a9] hover:text-white border-[#162c3a]'
                  }`}
                >
                  <span className="text-sm">{tab.icon}</span>
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : isDay
                          ? 'bg-white text-[#006747] border border-[#cbe4e1]'
                          : 'bg-[#050e14] text-[#2dd4bf] border border-[#142834]'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 1. ZIKIR COUNTER VIEW (HOME PAGE) */}
        {activeModule === 'zikir_counter' && (
          <ZikirCounterView
            masterTotal={masterGrandTotal}
            dailyTotal={dailyTotal}
            zikrs={zikrs}
            completedGoals={completedGoals}
            refreshMode={refreshMode}
            onRefreshModeChange={handleRefreshModeChange}
            onManualCounterRefresh={handleManualCounterRefresh}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
            onReset={handleConfirmResetIndividual}
            onDelete={handleConfirmDelete}
            onEdit={(item) => {
              setZikrToEdit(item);
              setIsZikrModalOpen(true);
            }}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onGlobalReset={handleGlobalReset}
            onSaveSession={handleSaveSession}
            onOpenAddModal={() => {
              setZikrToEdit(null);
              setIsZikrModalOpen(true);
            }}
            onRestoreDefaults={handleRestoreDefaults}
            onExportPdf={handleExportPdf}
            isExportingPdf={isExportingPdf}
            themeMode={settings.themeMode}
            selectedLanguage={selectedLanguage}
          />
        )}

        {/* 2. QURAN VIEW */}
        {activeModule === 'quran' && (
          <QuranView
            soundEnabled={settings.soundEnabled}
            themeMode={settings.themeMode}
            selectedLanguage={selectedLanguage}
            onSelectLanguage={setSelectedLanguage}
          />
        )}

        {/* 3. SALAT TIME VIEW */}
        {activeModule === 'salat_time' && (
          <SalatTimeView
            soundEnabled={settings.soundEnabled}
            themeMode={settings.themeMode}
            selectedLanguage={selectedLanguage}
          />
        )}

        {/* 4. AAMAL TRACKER VIEW */}
        {activeModule === 'aamal_tracker' && (
          <AamalTrackerView
            soundEnabled={settings.soundEnabled}
            themeMode={settings.themeMode}
            selectedLanguage={selectedLanguage}
            userProfile={userProfile}
            liveZikrs={zikrs}
          />
        )}

        {/* 5. OTHER ISLAMIC HUB VIEW (DUA, HADITH, KITAB, DAILY TABLIG, ALLAH 99 NAMES, HAJJ & UMRAH) */}
        {isOtherActive && (
          <OtherIslamicHubView
            onAddDuaToCounters={handleAddDuaToCounters}
            activeCounters={zikrs}
            soundEnabled={settings.soundEnabled}
            themeMode={settings.themeMode}
            selectedLanguage={selectedLanguage}
            initialSubSection={
              activeModule === 'dua'
                ? 'dua'
                : activeModule === 'hadith'
                ? 'hadith'
                : activeModule === 'kitab'
                ? 'kitab'
                : activeModule === 'tablig'
                ? 'tablig'
                : activeModule === 'allah_names'
                ? 'allah_names'
                : activeModule === 'hajj_umrah'
                ? 'hajj_umrah'
                : 'hub'
            }
          />
        )}
      </main>

      {/* Serene Islamic Footer */}
      <footer
        className={`mt-auto border-t py-6 px-4 text-center transition-colors ${
          isDay
            ? 'bg-[#e2edea] border-[#cbe0dc] text-[#34595d]'
            : 'bg-[#060c11] border-[#142633] text-[#71969c]'
        }`}
      >
        <div className="max-w-4xl mx-auto space-y-2">
          <div
            className={`font-arabic text-lg sm:text-xl font-bold ${
              isDay ? 'text-[#165a60]' : 'text-[#2dd4bf]'
            }`}
          >
            أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ
          </div>
          <p className={`text-xs italic ${isDay ? 'text-[#507579]' : 'text-[#8daab0]'}`}>
            "Verily, in the remembrance of Allah do hearts find rest." — Surah Ar-Ra'd (13:28)
          </p>
          <div className="text-[11px] pt-1 flex items-center justify-center gap-2 flex-wrap opacity-80">
            <span>ZikrMate PWA</span>
            <span>•</span>
            <span>100% Offline &amp; Privacy-First</span>
            <span>•</span>
            <button
              onClick={() => setIsStandaloneModalOpen(true)}
              className={`hover:underline font-bold cursor-pointer ${
                isDay ? 'text-[#1c6469]' : 'text-[#2dd4bf]'
              }`}
            >
              Export Standalone APK Guide
            </button>
          </div>
        </div>
      </footer>

      {/* Bottom Sticky Navigation for Mobile & Thumb Floating Add Button */}
      <BottomNav
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        onOpenAddModal={() => {
          setZikrToEdit(null);
          setIsZikrModalOpen(true);
        }}
        themeMode={settings.themeMode}
        selectedLanguage={selectedLanguage}
      />

      {/* Add / Edit Zikr Modal */}
      <ZikrModal
        isOpen={isZikrModalOpen}
        zikrToEdit={zikrToEdit}
        onSave={handleSaveZikr}
        onClose={() => {
          setIsZikrModalOpen(false);
          setZikrToEdit(null);
        }}
      />

      {/* Confirmation Prompt Modal */}
      <ConfirmModal
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmLabel={confirmDialog.confirmLabel}
        isDanger={confirmDialog.isDanger}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* Standalone HTML & APK Guide Modal */}
      <StandaloneExportModal
        isOpen={isStandaloneModalOpen}
        onClose={() => setIsStandaloneModalOpen(false)}
      />

      {/* Multi-Period History & PDF Report Generator Modal (1 Day, 1 Month, 4 Months, 1 Year, 10 Years) */}
      <HistoryReportModal
        isOpen={isHistoryReportModalOpen}
        onClose={() => setIsHistoryReportModalOpen(false)}
        soundEnabled={settings.soundEnabled}
        themeMode={settings.themeMode}
        selectedLanguage={selectedLanguage}
        userProfile={userProfile}
        liveZikrs={zikrs}
        masterTotal={masterGrandTotal}
      />

      {/* User Profile Account Modal (With Embedded Settings & Firebase Cloud Sync) */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userProfile={userProfile}
        onUpdateProfile={handleUpdateProfile}
        onNavigateModule={setActiveModule}
        themeMode={settings.themeMode}
        onToggleThemeMode={handleToggleThemeMode}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={(lang) => {
          setSelectedLanguage(lang);
          const langObj = SUPPORTED_LANGUAGES.find((l) => l.code === lang);
          showToast(`ভাষা পরিবর্তন: ${langObj?.label || lang}`);
        }}
        soundEnabled={settings.soundEnabled}
        onToggleSound={handleToggleSound}
        vibrationEnabled={settings.vibrationEnabled}
        onToggleVibration={handleToggleVibration}
        onExportPdf={handleExportPdf}
        onOpenStandaloneModal={() => setIsStandaloneModalOpen(true)}
        onResetAllCounters={handleGlobalReset}
        initialTab={profileModalTab}
        onCloudDataLoaded={handleCloudDataLoaded}
        onTriggerCloudSync={handleTriggerCloudSync}
        isSyncingCloud={isSyncingCloud}
        lastCloudSyncTimestamp={lastCloudSyncTimestamp}
      />
    </div>
  );
}
