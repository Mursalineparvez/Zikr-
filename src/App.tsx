/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import confetti from 'canvas-confetti';
import { ZikrItem, HistorySession, AppSettings, DuaItem, NavModule, ThemeMode, ZikrLanguage, UserProfile } from './types';
import { DEFAULT_ZIKRS, SUPPORTED_LANGUAGES } from './utils/constants';
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


export default function App() {
  // 1. LocalStorage state persistence for Zikr Items (12 Common Zikr items merged with persisted counts)
  const [zikrs, setZikrs] = useState<ZikrItem[]>(() => {
    try {
      const saved = localStorage.getItem('noor_zikr_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const parsedMap = new Map<string, any>(parsed.map((item: any) => [item.id, item]));
          const nameMap = new Map<string, any>(
            parsed.map((item: any) => [
              (item.name || item.pronunciationBn || '').toLowerCase().replace(/[^a-z0-9]/g, ''),
              item,
            ])
          );

          // Populate all 12 Common Zikrs, restoring counts if user had already incremented them
          const mergedList: ZikrItem[] = DEFAULT_ZIKRS.map((defaultItem) => {
            const normalizedName = defaultItem.name.toLowerCase().replace(/[^a-z0-9]/g, '');
            const existing = parsedMap.get(defaultItem.id) || nameMap.get(normalizedName);
            if (existing) {
              return {
                ...defaultItem,
                count: typeof existing.count === 'number' ? existing.count : 0,
                updatedAt: existing.updatedAt || defaultItem.updatedAt,
                target: typeof existing.target === 'number' && existing.target > 0 ? existing.target : defaultItem.target,
              };
            }
            return defaultItem;
          });

          // Also preserve any custom items the user may have added
          const defaultIds = new Set(DEFAULT_ZIKRS.map((d) => d.id));
          const customItems = parsed.filter(
            (item: any) =>
              !defaultIds.has(item.id) &&
              !nameMap.has(item.name?.toLowerCase().replace(/[^a-z0-9]/g, ''))
          );

          return [...mergedList, ...customItems];
        }
      }
    } catch {
      // Fallback
    }
    return DEFAULT_ZIKRS;
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

  // Lifetime Cumulative Grand Total Count (Persists across midnight resets until manual Reset All)
  const [lifetimeTotalCount, setLifetimeTotalCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_lifetime_total_count');
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 0) return parsed;
      }
    } catch {}
    // Initial fallback to current zikrs sum
    return zikrs.reduce((acc, curr) => acc + (curr.count || 0), 0);
  });

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

  // Multi-Device Cloud Synchronization Refs
  const isCloudSyncReadyRef = useRef<boolean>(false);
  const isRemoteUpdateRef = useRef<boolean>(false);
  const lastRemoteUpdateTimestampRef = useRef<number>(0);
  const lastLocalUpdateMsRef = useRef<number>((() => {
    try {
      const saved = localStorage.getItem('zikrmate_last_local_update_ms');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed > 0) return parsed;
      }
    } catch {}
    return Date.now();
  })());

  // Helper: Apply cloud data snapshot to active state (Seamless cross-device, web & app sync!)
  const applyCloudDataToState = (cloudData: CloudZikrState, isFromOtherDevice: boolean = false) => {
    isRemoteUpdateRef.current = true;
    lastRemoteUpdateTimestampRef.current = Date.now();
    isCloudSyncReadyRef.current = true;

    // 1. Synchronize Profile (photoUrl, password, name, location) across all devices / web & app!
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
        try {
          localStorage.setItem('zikrmate_user_profile', JSON.stringify(merged));
          saveAccountToRegistry(merged);
        } catch {}
        return merged;
      });
    }

    // 2. Synchronize Zikr counts intelligently (Never rolls back on page refresh)
    const localZikrs = zikrsRef.current;
    const localLastUpdate = lastLocalUpdateMsRef.current || 0;
    const cloudLastUpdate = cloudData.updatedAtMs || 0;
    const localSum = localZikrs.reduce((acc, curr) => acc + (curr.count || 0), 0);
    const cloudSum = (cloudData.zikrs || []).reduce((acc, curr) => acc + (curr.count || 0), 0);

    if (cloudData.zikrs && Array.isArray(cloudData.zikrs) && cloudData.zikrs.length > 0) {
      // If from other device (e.g. user clicked on phone/web), OR cloud has newer timestamp, OR local was 0, OR cloud has higher count
      if (isFromOtherDevice || cloudLastUpdate >= localLastUpdate || cloudSum > localSum || localSum === 0) {
        setZikrs(cloudData.zikrs);
        lastLocalUpdateMsRef.current = cloudLastUpdate || Date.now();
        try {
          localStorage.setItem('noor_zikr_items', JSON.stringify(cloudData.zikrs));
          localStorage.setItem('zikrmate_last_local_update_ms', String(cloudLastUpdate || Date.now()));
        } catch {}
      } else if (localLastUpdate > cloudLastUpdate && localSum >= cloudSum) {
        // If local has newer counts made right before refresh on this device, keep local and immediately sync to cloud!
        saveUserDataToCloud(
          userProfile.emailOrPhone,
          userProfile,
          localZikrs,
          historySessions,
          lifetimeTotalCount,
          settings,
          getAllAamalLogs()
        );
      }
    } else if (localSum === 0 && cloudData.hasZikrData === false) {
      const freshZikrs: ZikrItem[] = DEFAULT_ZIKRS.map((item) => ({
        ...item,
        count: 0,
        updatedAt: Date.now(),
      }));
      setZikrs(freshZikrs);
      try {
        localStorage.setItem('noor_zikr_items', JSON.stringify(freshZikrs));
      } catch {}
    }

    // 3. Synchronize History Sessions
    if (cloudData.history && Array.isArray(cloudData.history)) {
      setHistorySessions(cloudData.history);
      try {
        localStorage.setItem('noor_zikr_history', JSON.stringify(cloudData.history));
      } catch {}
    }

    // 4. Synchronize Lifetime Total Count
    if (typeof cloudData.lifetimeTotalCount === 'number') {
      const effectiveLifetime = Math.max(cloudData.lifetimeTotalCount, lifetimeTotalCount);
      setLifetimeTotalCount(effectiveLifetime);
      try {
        localStorage.setItem('zikrmate_lifetime_total_count', String(effectiveLifetime));
      } catch {}
    }

    // 5. Synchronize App Settings
    if (cloudData.settings) {
      setSettings((prev) => ({ ...prev, ...cloudData.settings }));
    }

    // 6. Synchronize Aamal Logs
    if (cloudData.aamalLogs && typeof cloudData.aamalLogs === 'object') {
      try {
        clearAllAamalLogs();
        for (const [dateKey, logData] of Object.entries(cloudData.aamalLogs)) {
          localStorage.setItem(`zikrmate_aamal_${dateKey}`, JSON.stringify(logData));
        }
      } catch {}
    }

    const now = Date.now();
    setLastCloudSyncTimestamp(now);
  };

  // Helper: Initialize fresh ZERO state when a user first signs in or logs in
  const initializeFreshZeroUserState = async (targetProfile: UserProfile) => {
    isRemoteUpdateRef.current = true;
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
      localStorage.setItem('zikrmate_last_local_update_ms', String(Date.now()));
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
        // Cloud has no saved state yet: This is the user's first signin / login!
        initializeFreshZeroUserState(userProfile);
        return;
      }

      // Check if update came from a different device (e.g. mobile app vs web)
      const isFromOtherDevice = !!(cloudData.senderDeviceId && cloudData.senderDeviceId !== currentDeviceId);

      // On initial load of this device OR when remote device updates state OR on any cloud update:
      applyCloudDataToState(cloudData, isFromOtherDevice);

      if (isFromOtherDevice && !isInitial) {
        showToast('🔄 অন্য ডিভাইস/ওয়েব থেকে জিকির ও প্রোফাইল লাইভ আপডেট হয়েছে!');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [userProfile.isSignedIn, userProfile.emailOrPhone]);

  // 2. Debounced auto-save to cloud when user changes counters on THIS device (Fast 80ms sync)
  const cloudSyncDebounceRef = useRef<any>(null);
  useEffect(() => {
    if (!userProfile.isSignedIn || !userProfile.emailOrPhone) return;

    // Do NOT push local blank state before cloud data has been loaded
    if (!isCloudSyncReadyRef.current) return;

    // Do NOT echo remote updates back to cloud
    if (isRemoteUpdateRef.current) {
      isRemoteUpdateRef.current = false;
      return;
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
        const now = Date.now();
        setLastCloudSyncTimestamp(now);
      }
    }, 80);

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

  // Midnight Auto-Refresh: Checks if a new day has started (12:00 AM / 00:00)
  useEffect(() => {
    const checkMidnightRefresh = () => {
      const todayKey = getTodayDateKey();
      const lastActiveDate = localStorage.getItem('zikrmate_last_active_date_key');

      if (!lastActiveDate) {
        localStorage.setItem('zikrmate_last_active_date_key', todayKey);
        return;
      }

      if (lastActiveDate !== todayKey) {
        // A new day has begun! Auto-archive yesterday's session if counts were > 0
        const activeZikrs = zikrsRef.current;
        const currentSum = activeZikrs.reduce((acc, curr) => acc + (curr.count || 0), 0);
        if (currentSum > 0) {
          const autoSession: HistorySession = {
            id: `midnight_session_${Date.now()}`,
            timestamp: Date.now(),
            dateStr: `${lastActiveDate} (Midnight Auto-Save)`,
            totalCount: currentSum,
            breakdown: activeZikrs.map((z) => ({
              name: z.name,
              count: z.count,
              target: z.target,
              arabic: z.arabic,
            })),
          };

          setHistorySessions((prev) => [autoSession, ...prev]);
        }

        // Reset individual counters to 0 for a fresh day, while Grand Total and all Aamal Tracker history are permanently preserved
        setZikrs((prev) => prev.map((item) => ({ ...item, count: 0, updatedAt: Date.now() })));
        localStorage.setItem('zikrmate_last_active_date_key', todayKey);

        showToast('🌙 রাত ১২:০০ টা - নতুন দিনের জন্য জিকির কাউন্টার ফ্রেশ করা হয়েছে। সর্বমোট কাউন্ট ও আমল হিস্ট্রি অক্ষুণ্ণ রয়েছে।');
      }
    };

    // Run check on mount
    checkMidnightRefresh();

    // Check periodically every 15 seconds for midnight transition
    const interval = setInterval(checkMidnightRefresh, 15000);
    return () => clearInterval(interval);
  }, []);

  // Guarantee immediate persistence before window refresh / close
  useEffect(() => {
    const handleUnload = () => {
      try {
        localStorage.setItem('noor_zikr_items', JSON.stringify(zikrsRef.current));
      } catch {}
    };
    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);


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

  // Master Total Count
  const masterTotal = useMemo(() => {
    return zikrs.reduce((acc, curr) => acc + (curr.count || 0), 0);
  }, [zikrs]);

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
    isRemoteUpdateRef.current = false;
    const targetZikr = zikrs.find((item) => item.id === id);
    if (!targetZikr) return;

    const newCount = targetZikr.count + 1;
    const isGoalJustReached = targetZikr.target && newCount === targetZikr.target;
    const now = Date.now();
    lastLocalUpdateMsRef.current = now;
    try {
      localStorage.setItem('zikrmate_last_local_update_ms', String(now));
    } catch {}

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
    isRemoteUpdateRef.current = false;
    const targetZikr = zikrs.find((item) => item.id === id);
    if (!targetZikr || targetZikr.count <= 0) return;

    const now = Date.now();
    lastLocalUpdateMsRef.current = now;
    try {
      localStorage.setItem('zikrmate_last_local_update_ms', String(now));
    } catch {}

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
        setZikrs((prev) => prev.map((item) => ({ ...item, count: 0, updatedAt: Date.now() })));
        setLifetimeTotalCount(0);
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

    setHistorySessions((prev) => [newSession, ...prev]);
    if (settings.soundEnabled) soundHaptics.playMilestone();
    showToast(`Saved session: ${currentTotal} total counts archived!`);
  };

  // Save Add/Edit Zikr
  const handleSaveZikr = (
    data: Omit<ZikrItem, 'id' | 'createdAt' | 'count' | 'updatedAt'>,
    id?: string
  ) => {
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
      className={`min-h-screen flex flex-col font-sans transition-colors duration-300 pb-20 md:pb-8 selection:bg-teal-500 selection:text-white ${
        isDay ? 'bg-[#edf5f4] text-[#133e42]' : 'bg-[#070e14] text-[#f1f8f7]'
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
              ? 'bg-[#1c6469] text-white border-teal-300 shadow-[#135d66]/30'
              : 'bg-[#0e242d] text-[#2dd4bf] border-[#20525d] shadow-black/80'
          }`}
        >
          <BookmarkCheck className="w-4 h-4 text-[#2dd4bf]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6">
        {/* Top Islamic Greeting & Module Switcher Card (Black type with teal accents) */}
        <div
          className={`rounded-[26px] p-3.5 sm:p-4.5 border transition-colors shadow-xl ${
            isDay
              ? 'bg-white border-[#dcebe8] shadow-[#135d66]/5'
              : 'bg-[#0e1c26] border-[#1a3342] shadow-black/50'
          }`}
        >
          <div
            className={`flex items-center justify-between pb-2.5 mb-2.5 border-b flex-wrap gap-2 text-xs ${
              isDay ? 'border-[#e8f3f1]' : 'border-[#152936]'
            }`}
          >
            <div
              className={`flex items-center gap-2 font-bold ${
                isDay ? 'text-[#165a60]' : 'text-[#2dd4bf]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="font-arabic text-sm">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>
            </div>
            <div className={`text-[11px] font-medium ${isDay ? 'text-[#5f8488]' : 'text-[#7ba3a9]'}`}>
              {new Date().toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          </div>

          {/* Module Selector Category Bar (Matches upper given pill buttons) */}
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
                        ? 'bg-[#1c6469] text-white border-[#1c6469] shadow-md shadow-[#135d66]/20'
                        : 'bg-[#1c6469] text-white border-[#288a91] shadow-lg shadow-black/40'
                      : isDay
                      ? 'bg-[#e6f3f2] hover:bg-[#d8ece9] text-[#2d6a70] border-[#d2ece9]'
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
                          ? 'bg-white text-[#1c6469] border border-[#cbe4e1]'
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
            masterTotal={lifetimeTotalCount}
            dailyTotal={dailyTotal}
            zikrs={zikrs}
            completedGoals={completedGoals}
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
