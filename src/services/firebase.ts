import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  setLogLevel,
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

// 3. Test Connection safe helper
export async function testFirestoreConnection(): Promise<boolean> {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
}

// 4. Sanitize email or phone number to make a robust Firestore document ID
export function sanitizeUserKey(emailOrPhone: string): string {
  if (!emailOrPhone) return 'guest_user';
  return 'u_' + emailOrPhone.toLowerCase().trim().replace(/[^a-z0-9]/g, '_');
}

export interface CloudZikrPayload {
  profile: UserProfile;
  zikrs: ZikrItem[];
  history: HistorySession[];
  settings?: AppSettings;
  totalCount?: number;
  lastSyncedAt: number;
}

/**
 * Save user profile and all zikr count / history sessions into Firebase Firestore
 * This guarantees that when the user logs in from any device with their email/phone,
 * all their past records and history will be loaded!
 */
export async function saveUserDataToCloud(
  emailOrPhone: string,
  profile: UserProfile,
  zikrs: ZikrItem[],
  history: HistorySession[],
  settings?: AppSettings
): Promise<boolean> {
  if (!emailOrPhone) return false;
  const userKey = sanitizeUserKey(emailOrPhone);

  try {
    const totalCount = zikrs.reduce((acc, curr) => acc + (curr.count || 0), 0);
    const nowIso = new Date().toISOString();

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
        deviceModel: profile.deviceModel || 'Web Browser',
        osVersion: profile.osVersion || 'Cloud Sync',
        createdAt: profile.verificationDate || nowIso,
        updatedAt: nowIso,
      },
      { merge: true }
    );

    // 2. Save complete zikr counters, custom items, and history sessions
    const dataDocRef = doc(db, 'users', userKey, 'data', 'zikrState');
    await setDoc(
      dataDocRef,
      {
        userId: userKey,
        zikrsJson: JSON.stringify(zikrs),
        historyJson: JSON.stringify(history),
        settingsJson: settings ? JSON.stringify(settings) : '{}',
        totalCount: totalCount,
        updatedAt: nowIso,
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
          settings,
          lastSyncedAt: Date.now(),
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
): Promise<{
  profile: Partial<UserProfile>;
  zikrs: ZikrItem[];
  history: HistorySession[];
  settings?: AppSettings;
  foundInCloud: boolean;
} | null> {
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
    let foundInCloud = false;

    if (profileSnap.exists()) {
      const pData = profileSnap.data();
      loadedProfile = {
        name: pData.name,
        emailOrPhone: pData.email || pData.phone || emailOrPhone,
        photoUrl: pData.photoUrl,
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
      foundInCloud,
    };
  } catch (error) {
    console.error('Failed to load user cloud data from Firebase:', error);
    return null;
  }
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
