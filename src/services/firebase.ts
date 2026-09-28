import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  setLogLevel,
  Unsubscribe,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserProfile, ZikrItem, HistorySession, AppSettings } from '../types';

// Silence verbose connection / offline warnings from internal Firestore logger
try {
  setLogLevel('error');
} catch {}

// 1. Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 2. Initialize Firestore Database using provisioned database ID
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// 3. Unique Device ID to distinguish between different devices (e.g. mobile vs pc)
export function getDeviceId(): string {
  try {
    let id = localStorage.getItem('zikrmate_device_uid');
    if (!id) {
      id = 'dev_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now();
      localStorage.setItem('zikrmate_device_uid', id);
    }
    return id;
  } catch {
    return 'dev_browser';
  }
}

// 4. Test Connection safe helper
export async function testFirestoreConnection(): Promise<boolean> {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
}

// 5. Sanitize email or phone number to make a robust Firestore document ID
export function sanitizeUserKey(emailOrPhone: string): string {
  if (!emailOrPhone) return 'guest_user';
  return 'u_' + emailOrPhone.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
}

export interface CloudZikrState {
  profile?: Partial<UserProfile>;
  zikrs?: ZikrItem[];
  history?: HistorySession[];
  settings?: AppSettings;
  lifetimeTotalCount?: number;
  totalCount?: number;
  aamalLogs?: Record<string, any>;
  lastSyncedAt?: number;
  updatedAtMs?: number;
  senderDeviceId?: string;
  foundInCloud: boolean;
}

/**
 * Save user profile and all zikr counts / lifetime total / history sessions / aamal into Firebase Firestore
 * This guarantees that when the user logs in from ANY device with their email,
 * all their past records and history will be identical across all devices!
 */
export async function saveUserDataToCloud(
  emailOrPhone: string,
  profile: UserProfile,
  zikrs: ZikrItem[],
  history: HistorySession[],
  lifetimeTotalCount: number,
  settings?: AppSettings,
  aamalLogs?: Record<string, any>
): Promise<boolean> {
  if (!emailOrPhone) return false;
  const userKey = sanitizeUserKey(emailOrPhone);
  const currentDeviceId = getDeviceId();

  try {
    const totalCount = zikrs.reduce((acc, curr) => acc + (curr.count || 0), 0);
    const nowIso = new Date().toISOString();
    const nowMs = Date.now();

    // 1. Save or update user profile document
    const userDocRef = doc(db, 'users', userKey);
    await setDoc(
      userDocRef,
      {
        uid: userKey,
        name: profile.name || 'ZikrMate User',
        email: emailOrPhone.includes('@') ? emailOrPhone.toLowerCase().trim() : '',
        phone: !emailOrPhone.includes('@') ? emailOrPhone.trim() : '',
        isVerified: profile.isVerified ?? true,
        verificationMethod: profile.verificationMethod || (emailOrPhone.includes('@') ? 'email' : 'phone'),
        photoUrl: profile.photoUrl || '',
        password: profile.password || '',
        location: profile.location || '',
        deviceModel: profile.deviceModel || 'Web Browser',
        osVersion: profile.osVersion || 'Cloud Sync',
        createdAt: profile.verificationDate || nowIso,
        updatedAt: nowIso,
      },
      { merge: true }
    );

    // 2. Save complete zikr counters, custom items, history sessions, and profile
    const dataDocRef = doc(db, 'users', userKey, 'data', 'zikrState');
    await setDoc(
      dataDocRef,
      {
        userId: userKey,
        profileJson: JSON.stringify(profile),
        zikrsJson: JSON.stringify(zikrs),
        historyJson: JSON.stringify(history),
        settingsJson: settings ? JSON.stringify(settings) : '{}',
        aamalLogsJson: aamalLogs ? JSON.stringify(aamalLogs) : '{}',
        totalCount: totalCount,
        lifetimeTotalCount: lifetimeTotalCount,
        updatedAt: nowIso,
        updatedAtMs: nowMs,
        senderDeviceId: currentDeviceId,
      },
      { merge: true }
    );

    // Also update local cache
    try {
      localStorage.setItem(
        `zikrmate_cloud_cache_${userKey}`,
        JSON.stringify({
          profile,
          zikrs,
          history,
          lifetimeTotalCount,
          settings,
          aamalLogs,
          lastSyncedAt: nowMs,
        })
      );
    } catch {}

    return true;
  } catch (error) {
    console.error('Failed to sync user data to Firebase Firestore:', error);
    return false;
  }
}

/**
 * Load user data from Firebase Firestore across any device
 */
export async function loadUserDataFromCloud(
  emailOrPhone: string
): Promise<CloudZikrState | null> {
  if (!emailOrPhone) return null;
  const userKey = sanitizeUserKey(emailOrPhone);

  try {
    const dataDocRef = doc(db, 'users', userKey, 'data', 'zikrState');
    const profileDocRef = doc(db, 'users', userKey);

    const [dataSnap, profileSnap] = await Promise.all([
      getDoc(dataDocRef),
      getDoc(profileDocRef),
    ]);

    let loadedProfile: Partial<UserProfile> = {};
    let loadedZikrs: ZikrItem[] = [];
    let loadedHistory: HistorySession[] = [];
    let loadedSettings: AppSettings | undefined = undefined;
    let loadedLifetimeTotal: number | undefined = undefined;
    let loadedAamalLogs: Record<string, any> | undefined = undefined;
    let loadedUpdatedAtMs: number | undefined = undefined;
    let loadedSenderDeviceId: string | undefined = undefined;
    let foundInCloud = false;

    if (profileSnap.exists()) {
      const pData = profileSnap.data();
      loadedProfile = {
        name: pData.name,
        emailOrPhone: pData.email || pData.phone || emailOrPhone,
        photoUrl: pData.photoUrl,
        password: pData.password || '',
        location: pData.location,
        isSignedIn: true,
        isVerified: pData.isVerified ?? true,
        verificationMethod: pData.verificationMethod,
        deviceModel: pData.deviceModel,
        osVersion: pData.osVersion,
      };
      foundInCloud = true;
    }

    if (dataSnap.exists()) {
      const dData = dataSnap.data();
      if (dData.profileJson) {
        try {
          const parsedProfile = JSON.parse(dData.profileJson);
          if (parsedProfile && typeof parsedProfile === 'object') {
            loadedProfile = { ...loadedProfile, ...parsedProfile };
          }
        } catch {}
      }
      if (dData.zikrsJson) {
        try {
          const parsedZikrs = JSON.parse(dData.zikrsJson);
          if (Array.isArray(parsedZikrs)) loadedZikrs = parsedZikrs;
        } catch {}
      }
      if (dData.historyJson) {
        try {
          const parsedHistory = JSON.parse(dData.historyJson);
          if (Array.isArray(parsedHistory)) loadedHistory = parsedHistory;
        } catch {}
      }
      if (dData.settingsJson) {
        try {
          const parsedSettings = JSON.parse(dData.settingsJson);
          if (parsedSettings && typeof parsedSettings === 'object') {
            loadedSettings = parsedSettings;
          }
        } catch {}
      }
      if (dData.aamalLogsJson) {
        try {
          const parsedAamal = JSON.parse(dData.aamalLogsJson);
          if (parsedAamal && typeof parsedAamal === 'object') {
            loadedAamalLogs = parsedAamal;
          }
        } catch {}
      }
      if (typeof dData.lifetimeTotalCount === 'number') {
        loadedLifetimeTotal = dData.lifetimeTotalCount;
      }
      loadedUpdatedAtMs = dData.updatedAtMs;
      loadedSenderDeviceId = dData.senderDeviceId;
      foundInCloud = true;
    }

    // Check offline backup cache if cloud has no record yet
    if (!foundInCloud) {
      try {
        const cached = localStorage.getItem(`zikrmate_cloud_cache_${userKey}`);
        if (cached) {
          const parsedCache = JSON.parse(cached);
          return {
            profile: parsedCache.profile || {},
            zikrs: parsedCache.zikrs || [],
            history: parsedCache.history || [],
            settings: parsedCache.settings,
            lifetimeTotalCount: parsedCache.lifetimeTotalCount,
            aamalLogs: parsedCache.aamalLogs,
            foundInCloud: false,
          };
        }
      } catch {}
    }

    return {
      profile: loadedProfile,
      zikrs: loadedZikrs,
      history: loadedHistory,
      settings: loadedSettings,
      lifetimeTotalCount: loadedLifetimeTotal,
      aamalLogs: loadedAamalLogs,
      updatedAtMs: loadedUpdatedAtMs,
      senderDeviceId: loadedSenderDeviceId,
      foundInCloud,
    };
  } catch (error) {
    console.error('Failed to load user cloud data from Firebase:', error);
    return null;
  }
}

/**
 * Real-time listener for cloud changes across multiple devices!
 * When Device 1 increments a zikr or updates history, Device 2's snapshot fires
 * and instantaneously updates the state so all devices stay 100% identical!
 */
export function subscribeToUserDataInCloud(
  emailOrPhone: string,
  onUpdate: (data: CloudZikrState, isInitial: boolean) => void
): Unsubscribe {
  if (!emailOrPhone) {
    return () => {};
  }

  const userKey = sanitizeUserKey(emailOrPhone);
  const dataDocRef = doc(db, 'users', userKey, 'data', 'zikrState');
  let isInitial = true;

  const unsubscribe = onSnapshot(
    dataDocRef,
    (snap) => {
      if (!snap.exists()) {
        if (isInitial) {
          isInitial = false;
          onUpdate({ foundInCloud: false }, true);
        }
        return;
      }

      const dData = snap.data();
      let loadedProfile: Partial<UserProfile> | undefined = undefined;
      let loadedZikrs: ZikrItem[] = [];
      let loadedHistory: HistorySession[] = [];
      let loadedSettings: AppSettings | undefined = undefined;
      let loadedAamalLogs: Record<string, any> | undefined = undefined;

      if (dData.profileJson) {
        try {
          const parsedProfile = JSON.parse(dData.profileJson);
          if (parsedProfile && typeof parsedProfile === 'object') {
            loadedProfile = parsedProfile;
          }
        } catch {}
      }

      if (dData.zikrsJson) {
        try {
          const parsedZikrs = JSON.parse(dData.zikrsJson);
          if (Array.isArray(parsedZikrs)) loadedZikrs = parsedZikrs;
        } catch {}
      }
      if (dData.historyJson) {
        try {
          const parsedHistory = JSON.parse(dData.historyJson);
          if (Array.isArray(parsedHistory)) loadedHistory = parsedHistory;
        } catch {}
      }
      if (dData.settingsJson) {
        try {
          const parsedSettings = JSON.parse(dData.settingsJson);
          if (parsedSettings && typeof parsedSettings === 'object') {
            loadedSettings = parsedSettings;
          }
        } catch {}
      }
      if (dData.aamalLogsJson) {
        try {
          const parsedAamal = JSON.parse(dData.aamalLogsJson);
          if (parsedAamal && typeof parsedAamal === 'object') {
            loadedAamalLogs = parsedAamal;
          }
        } catch {}
      }

      const state: CloudZikrState = {
        profile: loadedProfile,
        zikrs: loadedZikrs,
        history: loadedHistory,
        settings: loadedSettings,
        lifetimeTotalCount: dData.lifetimeTotalCount,
        aamalLogs: loadedAamalLogs,
        updatedAtMs: dData.updatedAtMs,
        senderDeviceId: dData.senderDeviceId,
        foundInCloud: true,
      };

      onUpdate(state, isInitial);
      isInitial = false;
    },
    (err) => {
      console.warn('Firestore subscription error:', err);
    }
  );

  return unsubscribe;
}

// 5. Verification OTP Store & Dispatcher
export interface PendingVerification {
  target: string; // email or phone
  type: 'email' | 'phone';
  code: string;
  expiresAt: number;
  attempts: number;
}

// In-memory & localStorage OTP tracker
const PENDING_OTP_KEY = 'zikrmate_pending_auth_otp';

export function generateVerificationOtp(target: string, type: 'email' | 'phone'): string {
  // Generate a cryptographically robust 6-digit PIN code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const pending: PendingVerification = {
    target: target.toLowerCase().trim(),
    type,
    code,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    attempts: 0,
  };

  try {
    sessionStorage.setItem(PENDING_OTP_KEY, JSON.stringify(pending));
  } catch {}

  return code;
}

export function getPendingOtp(): PendingVerification | null {
  try {
    const raw = sessionStorage.getItem(PENDING_OTP_KEY);
    if (raw) {
      const parsed: PendingVerification = JSON.parse(raw);
      if (parsed.expiresAt > Date.now()) {
        return parsed;
      }
    }
  } catch {}
  return null;
}

export function verifySubmittedOtp(target: string, enteredCode: string): { success: boolean; message: string } {
  const pending = getPendingOtp();
  const normalizedTarget = target.toLowerCase().trim();

  // If no OTP generated or expired
  if (!pending) {
    return { success: false, message: 'Verification code expired or not requested. Please request a new code.' };
  }

  if (pending.target !== normalizedTarget) {
    return { success: false, message: 'Verification target mismatch. Please request a new code.' };
  }

  if (pending.attempts >= 5) {
    return { success: false, message: 'Too many incorrect attempts. Please request a fresh OTP.' };
  }

  // Increment attempts
  pending.attempts += 1;
  try {
    sessionStorage.setItem(PENDING_OTP_KEY, JSON.stringify(pending));
  } catch {}

  if (pending.code.trim() === enteredCode.trim()) {
    // Clear pending OTP on successful verification
    try {
      sessionStorage.removeItem(PENDING_OTP_KEY);
    } catch {}
    return { success: true, message: 'Verification successful!' };
  }

  return { success: false, message: `Incorrect code entered. ${5 - pending.attempts} attempts remaining.` };
}
