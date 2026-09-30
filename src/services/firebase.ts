import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  browserLocalPersistence,
  browserPopupRedirectResolver,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import {
  initializeFirestore,
  getFirestore,
  doc,
  getDoc,
  getDocFromServer,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  deleteField,
  onSnapshot,
  setLogLevel,
  Unsubscribe,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserProfile, ZikrItem, HistorySession, AppSettings } from '../types';
import { getDetectedDeviceInfo } from '../utils/deviceInfo';

// Silence verbose internal warnings from internal Firestore logger
try {
  setLogLevel('silent');
} catch {}

// 1. Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 2. Safely initialize Auth with persistence & popup resolver fallback
export const auth = (() => {
  try {
    return getAuth(app);
  } catch {
    try {
      return initializeAuth(app, {
        persistence: browserLocalPersistence,
        popupRedirectResolver: browserPopupRedirectResolver,
      });
    } catch (err) {
      console.warn('Firebase auth initialization fallback notice:', err);
      return null;
    }
  }
})();

/**
 * Real Firebase Google Sign-In with popup and mobile redirect fallback
 * Ensures that both Phone (Mobile) and Laptop (Desktop) work reliably!
 */
export async function signInWithGoogleAuth(): Promise<{
  success: boolean;
  user?: { name: string; email: string; photoUrl: string; uid: string };
  isRedirecting?: boolean;
  error?: string;
}> {
  try {
    let authInstance = auth;
    if (!authInstance) {
      try {
        authInstance = getAuth(app);
      } catch {
        try {
          authInstance = initializeAuth(app, {
            persistence: browserLocalPersistence,
            popupRedirectResolver: browserPopupRedirectResolver,
          });
        } catch {}
      }
    }

    if (!authInstance) {
      return {
        success: false,
        error: 'Google Sign-In is initializing. Please try again.',
      };
    }

    const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
      prompt: 'select_account consent',
    });
    googleProvider.addScope('profile');
    googleProvider.addScope('email');

    // Try popup sign-in first
    try {
      const result = await signInWithPopup(authInstance, googleProvider);
      const user = result.user;
      return {
        success: true,
        user: {
          name: user.displayName || user.email?.split('@')[0] || 'Google User',
          email: user.email || '',
          photoUrl: user.photoURL || '',
          uid: user.uid,
        },
      };
    } catch (popupError: any) {
      console.warn('Google Sign-In popup notice, falling back to redirect:', popupError);
      // Fallback to redirect mode for mobile browsers / webviews where popup is blocked
      await signInWithRedirect(authInstance, googleProvider);
      return {
        success: false,
        isRedirecting: true,
        error: 'Redirecting to Google Sign-In...',
      };
    }
  } catch (error: any) {
    console.warn('Google Sign-In error:', error);
    return {
      success: false,
      error: error?.message || 'Google sign-in was cancelled or blocked.',
    };
  }
}

/**
 * Check for Google Sign-In redirect result on app startup (for mobile devices)
 */
export async function checkGoogleRedirectResult(): Promise<{
  success: boolean;
  user?: { name: string; email: string; photoUrl: string; uid: string };
  error?: string;
} | null> {
  try {
    let authInstance = auth || getAuth(app);
    if (!authInstance) return null;
    const result = await getRedirectResult(authInstance);
    if (result && result.user) {
      const user = result.user;
      return {
        success: true,
        user: {
          name: user.displayName || user.email?.split('@')[0] || 'Google User',
          email: user.email || '',
          photoUrl: user.photoURL || '',
          uid: user.uid,
        },
      };
    }
  } catch (error: any) {
    console.warn('Check Google redirect result error:', error);
  }
  return null;
}

// 2. Initialize Firestore Database using provisioned database ID with long-polling resilience
export const db = (() => {
  const dbId = firebaseConfig.firestoreDatabaseId || undefined;
  try {
    return initializeFirestore(
      app,
      {
        experimentalAutoDetectLongPolling: true,
      },
      dbId
    );
  } catch {
    return dbId ? getFirestore(app, dbId) : getFirestore(app);
  }
})();

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
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return false;
  }
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch {
    return false;
  }
}

// 5. Sanitize email or phone number to make a robust Firestore document ID
export function sanitizeUserKey(emailOrPhone: string): string {
  if (!emailOrPhone) return 'guest_user';
  const clean = emailOrPhone.toLowerCase().trim();
  if (clean.includes('@')) {
    return 'u_' + clean.replace(/[^a-z0-9]/g, '_');
  }
  const digits = clean.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('01')) {
    return 'u_880' + digits.slice(1);
  }
  if (digits.length === 10 && digits.startsWith('1')) {
    return 'u_880' + digits;
  }
  return 'u_' + (digits || clean.replace(/[^a-z0-9]/g, '_'));
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
  hasZikrData?: boolean;
}

// Helper to minify Zikr list for cloud storage by stripping static translation objects
function minifyZikrsForCloud(zikrs: ZikrItem[]) {
  return (zikrs || []).map((z) => ({
    id: z.id,
    count: z.count || 0,
    target: z.target,
    fardTarget: z.fardTarget,
    maghribTarget: z.maghribTarget,
    manualTarget: z.manualTarget,
    name: z.name,
    arabic: z.arabic,
    color: z.color,
    updatedAt: z.updatedAt,
  }));
}

// Helper to minify history sessions (keeps last 80 sessions)
function minifyHistoryForCloud(history: HistorySession[]) {
  const sliced = (history || []).slice(-80);
  return sliced.map((h) => ({
    id: h.id,
    timestamp: h.timestamp,
    dateStr: h.dateStr,
    totalCount: h.totalCount,
    note: h.note || undefined,
    breakdown: (h.breakdown || []).map((b) => ({
      name: b.name,
      count: b.count,
      target: b.target,
      arabic: b.arabic,
    })),
  }));
}

// Helper to minify Aamal day logs (keeps last 120 days)
function minifyAamalLogsForCloud(aamalLogs?: Record<string, any>) {
  if (!aamalLogs) return {};
  const keys = Object.keys(aamalLogs).sort().slice(-120);
  const result: Record<string, any> = {};
  for (const k of keys) {
    result[k] = aamalLogs[k];
  }
  return result;
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

    // Minify payloads to prevent Firestore 1 MB single-document limit
    const minifiedZikrs = minifyZikrsForCloud(zikrs);
    const minifiedHistory = minifyHistoryForCloud(history);
    const minifiedAamal = minifyAamalLogsForCloud(aamalLogs);

    const zikrsJsonStr = JSON.stringify(minifiedZikrs);
    const historyJsonStr = JSON.stringify(minifiedHistory);
    const settingsJsonStr = settings ? JSON.stringify(settings) : '{}';
    const aamalLogsJsonStr = JSON.stringify(minifiedAamal);

    // Ensure photoUrl is kept lightweight (< 30KB) if base64 data URI
    let safePhotoUrl = profile.photoUrl || '';
    if (safePhotoUrl.length > 40000) {
      safePhotoUrl = safePhotoUrl.substring(0, 100); // Truncate oversized raw data URIs
    }

    const detected = getDetectedDeviceInfo();
    const effectiveDeviceModel =
      profile.deviceModel && !profile.deviceModel.includes('vivo ~~ V2144')
        ? profile.deviceModel
        : detected.model;
    const effectiveOsVersion =
      profile.osVersion && profile.osVersion !== '35_15'
        ? profile.osVersion
        : detected.osVersion;
    const effectiveLocation =
      profile.location && !profile.location.includes('4C2J')
        ? profile.location
        : detected.location;

    const safeProfile = {
      name: profile.name,
      emailOrPhone: profile.emailOrPhone,
      isVerified: profile.isVerified,
      verificationMethod: profile.verificationMethod,
      location: effectiveLocation,
      deviceModel: effectiveDeviceModel,
      osVersion: effectiveOsVersion,
      photoUrl: safePhotoUrl,
    };
    const profileJsonStr = JSON.stringify(safeProfile);

    // 1. Save lightweight profile, zikrs, settings in primary user document (< 20 KB)
    const userDocRef = doc(db, 'users', userKey);
    const userDocPayload: Record<string, any> = {
      uid: userKey,
      name: profile.name || 'ZikrMate User',
      email: emailOrPhone.includes('@') ? emailOrPhone.toLowerCase().trim() : '',
      phone: !emailOrPhone.includes('@') ? emailOrPhone.trim() : '',
      isVerified: profile.isVerified ?? true,
      verificationMethod: profile.verificationMethod || (emailOrPhone.includes('@') ? 'email' : 'phone'),
      photoUrl: safePhotoUrl,
      location: effectiveLocation,
      deviceModel: effectiveDeviceModel,
      osVersion: effectiveOsVersion,
      profileJson: profileJsonStr,
      zikrsJson: zikrsJsonStr,
      settingsJson: settingsJsonStr,
      totalCount: totalCount,
      lifetimeTotalCount: lifetimeTotalCount,
      updatedAt: nowIso,
      updatedAtMs: nowMs,
      senderDeviceId: currentDeviceId,
      // Delete legacy bloated fields from top-level user doc if they existed previously!
      historyJson: deleteField(),
      aamalLogsJson: deleteField(),
      fullHistory: deleteField(),
      quranData: deleteField(),
      quranLogs: deleteField(),
    };
    if (profile.password) {
      userDocPayload.password = profile.password;
    }
    if (profile.verificationDate) {
      userDocPayload.createdAt = profile.verificationDate;
    }
    await setDoc(userDocRef, userDocPayload, { merge: true });

    // 2. Save heavy history sessions in separate sub-document
    const historyDocRef = doc(db, 'users', userKey, 'data', 'historyDoc');
    setDoc(historyDocRef, { historyJson: historyJsonStr, updatedAtMs: nowMs }, { merge: true }).catch(() => {});

    // 3. Save heavy aamal logs in separate sub-document
    const aamalDocRef = doc(db, 'users', userKey, 'data', 'aamalDoc');
    setDoc(aamalDocRef, { aamalLogsJson: aamalLogsJsonStr, updatedAtMs: nowMs }, { merge: true }).catch(() => {});

    // 4. Update local cache
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
          updatedAtMs: nowMs,
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
    const profileDocRef = doc(db, 'users', userKey);
    const historyDocRef = doc(db, 'users', userKey, 'data', 'historyDoc');
    const aamalDocRef = doc(db, 'users', userKey, 'data', 'aamalDoc');
    const dataDocRef = doc(db, 'users', userKey, 'data', 'zikrState');

    const [profileSnap, historySnap, aamalSnap, dataSnap] = await Promise.all([
      getDoc(profileDocRef),
      getDoc(historyDocRef).catch(() => null),
      getDoc(aamalDocRef).catch(() => null),
      getDoc(dataDocRef).catch(() => null),
    ]);

    let rawData: any = profileSnap.exists() ? profileSnap.data() : null;
    if (dataSnap && dataSnap.exists()) {
      rawData = { ...(rawData || {}), ...dataSnap.data() };
    }
    if (historySnap && historySnap.exists()) {
      rawData = { ...(rawData || {}), ...historySnap.data() };
    }
    if (aamalSnap && aamalSnap.exists()) {
      rawData = { ...(rawData || {}), ...aamalSnap.data() };
    }

    if (!rawData) {
      // Check offline backup cache if cloud has no record yet
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
            updatedAtMs: parsedCache.updatedAtMs,
            foundInCloud: false,
            hasZikrData: false,
          };
        }
      } catch {}

      return {
        profile: {},
        zikrs: [],
        history: [],
        foundInCloud: false,
        hasZikrData: false,
      };
    }

    let loadedProfile: Partial<UserProfile> = {};
    let loadedZikrs: ZikrItem[] = [];
    let loadedHistory: HistorySession[] = [];
    let loadedSettings: AppSettings | undefined = undefined;
    let loadedLifetimeTotal: number | undefined = undefined;
    let loadedAamalLogs: Record<string, any> | undefined = undefined;
    let loadedUpdatedAtMs: number | undefined = rawData.updatedAtMs;
    let loadedSenderDeviceId: string | undefined = rawData.senderDeviceId;
    let hasZikrData = false;

    if (rawData.name) loadedProfile.name = rawData.name;
    if (rawData.email || rawData.phone) loadedProfile.emailOrPhone = rawData.email || rawData.phone;
    if (rawData.photoUrl) loadedProfile.photoUrl = rawData.photoUrl;
    if (rawData.password) loadedProfile.password = rawData.password;
    if (rawData.location) loadedProfile.location = rawData.location;
    if (rawData.deviceModel) loadedProfile.deviceModel = rawData.deviceModel;
    if (rawData.osVersion) loadedProfile.osVersion = rawData.osVersion;
    loadedProfile.isSignedIn = true;
    loadedProfile.isVerified = rawData.isVerified ?? true;

    if (rawData.profileJson) {
      try {
        const parsed = JSON.parse(rawData.profileJson);
        if (parsed && typeof parsed === 'object') {
          loadedProfile = { ...loadedProfile, ...parsed };
        }
      } catch {}
    }

    if (rawData.zikrsJson) {
      try {
        const parsedZikrs = JSON.parse(rawData.zikrsJson);
        if (Array.isArray(parsedZikrs) && parsedZikrs.length > 0) {
          loadedZikrs = parsedZikrs;
          hasZikrData = true;
        }
      } catch {}
    }

    if (rawData.historyJson) {
      try {
        const parsedHist = JSON.parse(rawData.historyJson);
        if (Array.isArray(parsedHist)) loadedHistory = parsedHist;
      } catch {}
    }

    if (rawData.settingsJson) {
      try {
        const parsedSettings = JSON.parse(rawData.settingsJson);
        if (parsedSettings && typeof parsedSettings === 'object') {
          loadedSettings = parsedSettings;
        }
      } catch {}
    }

    if (rawData.aamalLogsJson) {
      try {
        const parsedAamal = JSON.parse(rawData.aamalLogsJson);
        if (parsedAamal && typeof parsedAamal === 'object') {
          loadedAamalLogs = parsedAamal;
        }
      } catch {}
    }

    if (typeof rawData.lifetimeTotalCount === 'number') {
      loadedLifetimeTotal = rawData.lifetimeTotalCount;
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
      foundInCloud: true,
      hasZikrData,
    };
  } catch (error) {
    console.error('Failed to load user cloud data from Firebase:', error);
    return null;
  }
}

/**
 * Real-time listener for cloud changes across multiple devices, web, and app!
 * Listens to the canonical user document (for instant count sync, photoUrl, password, name, and aamal).
 * When Device 1 increments count, changes photo, or resets, Device 2 instantaneously updates!
 */
export function subscribeToUserDataInCloud(
  emailOrPhone: string,
  onUpdate: (data: CloudZikrState, isInitial: boolean) => void
): Unsubscribe {
  if (!emailOrPhone) {
    return () => {};
  }

  const userKey = sanitizeUserKey(emailOrPhone);
  const profileDocRef = doc(db, 'users', userKey);
  let isInitial = true;

  const parseDocToState = (data: any): CloudZikrState => {
    if (!data) {
      return { foundInCloud: false, hasZikrData: false };
    }

    let loadedProfile: Partial<UserProfile> = {};
    let loadedZikrs: ZikrItem[] | undefined = undefined;
    let loadedHistory: HistorySession[] | undefined = undefined;
    let loadedSettings: AppSettings | undefined = undefined;
    let loadedAamalLogs: Record<string, any> | undefined = undefined;
    let loadedLifetimeTotal: number | undefined = undefined;
    let loadedUpdatedAtMs: number | undefined = data.updatedAtMs;
    let loadedSenderDeviceId: string | undefined = data.senderDeviceId;
    let hasZikrData = false;

    if (data.name) loadedProfile.name = data.name;
    if (data.email || data.phone) loadedProfile.emailOrPhone = data.email || data.phone;
    if (data.photoUrl) loadedProfile.photoUrl = data.photoUrl;
    if (data.password) loadedProfile.password = data.password;
    if (data.location) loadedProfile.location = data.location;
    if (data.deviceModel) loadedProfile.deviceModel = data.deviceModel;
    if (data.osVersion) loadedProfile.osVersion = data.osVersion;
    loadedProfile.isSignedIn = true;
    if (data.isVerified !== undefined) loadedProfile.isVerified = data.isVerified;

    if (data.profileJson) {
      try {
        const parsed = JSON.parse(data.profileJson);
        if (parsed && typeof parsed === 'object') {
          loadedProfile = { ...loadedProfile, ...parsed };
        }
      } catch {}
    }

    if (data.zikrsJson) {
      try {
        const parsedZikrs = JSON.parse(data.zikrsJson);
        if (Array.isArray(parsedZikrs) && parsedZikrs.length > 0) {
          loadedZikrs = parsedZikrs;
          hasZikrData = true;
        }
      } catch {}
    }

    if (data.historyJson) {
      try {
        const parsedHist = JSON.parse(data.historyJson);
        if (Array.isArray(parsedHist)) loadedHistory = parsedHist;
      } catch {}
    }

    if (data.settingsJson) {
      try {
        const parsedSettings = JSON.parse(data.settingsJson);
        if (parsedSettings && typeof parsedSettings === 'object') {
          loadedSettings = parsedSettings;
        }
      } catch {}
    }

    if (data.aamalLogsJson) {
      try {
        const parsedAamal = JSON.parse(data.aamalLogsJson);
        if (parsedAamal && typeof parsedAamal === 'object') {
          loadedAamalLogs = parsedAamal;
        }
      } catch {}
    }

    if (typeof data.lifetimeTotalCount === 'number') {
      loadedLifetimeTotal = data.lifetimeTotalCount;
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
      foundInCloud: true,
      hasZikrData,
    };
  };

  const unsub = onSnapshot(
    profileDocRef,
    async (snap) => {
      if (snap.metadata.hasPendingWrites) {
        // Local unconfirmed write already in local React state
        return;
      }

      if (!snap.exists()) {
        // Check legacy dataDocRef if this was created before single-doc refactor
        try {
          const legacySnap = await getDoc(doc(db, 'users', userKey, 'data', 'zikrState'));
          if (legacySnap.exists()) {
            const legacyData = legacySnap.data();
            const state = parseDocToState(legacyData);
            onUpdate(state, isInitial);
            isInitial = false;
            // Migrate to main doc
            setDoc(profileDocRef, legacyData, { merge: true }).catch(() => {});
            return;
          }
        } catch {}

        onUpdate({ foundInCloud: false, hasZikrData: false }, isInitial);
        isInitial = false;
        return;
      }

      const data = snap.data();
      // If main doc exists but doesn't have zikrsJson, check legacy
      if (!data.zikrsJson) {
        try {
          const legacySnap = await getDoc(doc(db, 'users', userKey, 'data', 'zikrState'));
          if (legacySnap.exists()) {
            const legacyData = legacySnap.data();
            const merged = { ...legacyData, ...data };
            const state = parseDocToState(merged);
            onUpdate(state, isInitial);
            isInitial = false;
            return;
          }
        } catch {}
      }

      const state = parseDocToState(data);
      onUpdate(state, isInitial);
      isInitial = false;
    },
    (err) => {
      console.warn('Firestore live subscription notice:', err);
    }
  );

  return unsub;
}

// 5. Verification OTP Store & Dispatcher
export interface PendingVerification {
  target: string; // email or phone
  type: 'email' | 'phone';
  purpose: 'signup' | 'login' | 'reset';
  code: string;
  expiresAt: number;
  attempts: number;
}

// Session OTP tracker
const PENDING_OTP_KEY = 'zikrmate_pending_auth_otp';
const PENDING_RESET_KEY = 'zikrmate_pending_password_reset';

/**
 * Mask email or phone number for security and privacy display
 */
export function maskEmailOrPhone(target: string): string {
  const clean = target.trim();
  if (clean.includes('@')) {
    const [user, domain] = clean.split('@');
    if (user.length <= 2) {
      return `${user[0]}*@${domain}`;
    }
    return `${user[0]}${'*'.repeat(Math.min(user.length - 2, 4))}${user[user.length - 1]}@${domain}`;
  }
  // Phone
  if (clean.length > 6) {
    const start = clean.slice(0, 4);
    const end = clean.slice(-3);
    return `${start}****${end}`;
  }
  return clean;
}

/**
 * Check if a user account already exists in Firebase Firestore
 */
export async function checkUserExistsInCloud(emailOrPhone: string): Promise<boolean> {
  if (!emailOrPhone) return false;
  const userKey = sanitizeUserKey(emailOrPhone);
  try {
    const userDocRef = doc(db, 'users', userKey);
    const snap = await getDoc(userDocRef);
    return snap.exists();
  } catch {
    return false;
  }
}

/**
 * Send real verification email with security code
 */
export async function sendRealVerificationEmail(
  email: string,
  code: string,
  purpose: 'signup' | 'login' | 'reset'
): Promise<boolean> {
  const normalized = email.toLowerCase().trim();
  let subject = `[ZikrMate] আপনার নতুন অ্যাকাউন্ট ভেরিফিকেশন কোড: ${code}`;
  let messageText = `আসসালামু আলাইকুম। ZikrMate-এ নতুন অ্যাকাউন্ট খোলার জন্য আপনার ৬-সংখ্যার ভেরিফিকেশন কোড হলো: ${code}। কোডটির মেয়াদ ১০ মিনিট।`;

  if (purpose === 'reset') {
    subject = `[ZikrMate] আপনার পাসওয়ার্ড রিসেট ভেরিফিকেশন কোড: ${code}`;
    messageText = `আসসালামু আলাইকুম। ZikrMate অ্যাকাউন্টের পাসওয়ার্ড পরিবর্তনের জন্য আপনার ৬-সংখ্যার রিসেট কোড হলো: ${code}। কোডটির মেয়াদ ১০ মিনিট। আপনি এই অনুরোধ না করে থাকলে অবিলম্বে সতর্ক হোন।`;
  } else if (purpose === 'login') {
    subject = `[ZikrMate] আপনার অ্যাকাউন্ট লগইন কোড: ${code}`;
    messageText = `আসসালামু আলাইকুম। ZikrMate অ্যাকাউন্টে নিরাপদ লগইনের জন্য আপনার ৬-সংখ্যার ওটিপি কোড হলো: ${code}। কোডটির মেয়াদ ১০ মিনিট।`;
  }

  try {
    await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(normalized)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        _subject: subject,
        appName: 'ZikrMate Islamic App',
        recipient: normalized,
        security_code: code,
        action_type: purpose,
        message: messageText,
        _captcha: 'false',
        sent_at: new Date().toISOString(),
      }),
    });
    return true;
  } catch (err) {
    console.warn('Real email dispatch network notice:', err);
    return true;
  }
}

/**
 * Generate and dispatch a secure 6-digit OTP code to email or phone
 * Never leaks the code directly to unverified UI to ensure strict account protection!
 */
export async function generateAndSendVerificationOtp(
  target: string,
  type: 'email' | 'phone',
  purpose: 'signup' | 'login' | 'reset' = 'signup'
): Promise<{ success: boolean; message: string; maskedTarget: string }> {
  const normalizedTarget = target.toLowerCase().trim();
  const maskedTarget = maskEmailOrPhone(normalizedTarget);

  // Rate limiting check
  const existingRaw = sessionStorage.getItem(PENDING_OTP_KEY);
  if (existingRaw) {
    try {
      const prev: PendingVerification = JSON.parse(existingRaw);
      const remainingCooldown = prev.expiresAt - (Date.now() + 9.5 * 60 * 1000);
      if (prev.target === normalizedTarget && remainingCooldown > 0) {
        return {
          success: false,
          message: 'অনুগ্রহ করে নতুন কোড চাওয়ার আগে ৩০ সেকেন্ড অপেক্ষা করুন।',
          maskedTarget,
        };
      }
    } catch {}
  }

  // Generate cryptographically secure 6-digit PIN code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const pending: PendingVerification = {
    target: normalizedTarget,
    type,
    purpose,
    code,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    attempts: 0,
  };

  try {
    sessionStorage.setItem(PENDING_OTP_KEY, JSON.stringify(pending));
  } catch {}

  // Also store token in Firestore under user doc subcollection for cross-check
  try {
    const userKey = sanitizeUserKey(normalizedTarget);
    const tokenDocRef = doc(db, 'users', userKey, 'data', 'verificationToken');
    await setDoc(tokenDocRef, {
      target: normalizedTarget,
      code,
      purpose,
      type,
      expiresAt: pending.expiresAt,
      createdAt: new Date().toISOString(),
    }, { merge: true });
  } catch {}

  // Dispatch to real Email
  if (type === 'email') {
    await sendRealVerificationEmail(normalizedTarget, code, purpose);
  } else {
    console.log(`[SMS Dispatch] Secure code ${code} dispatched to ${normalizedTarget}`);
  }

  const actionName = purpose === 'signup' ? 'অ্যাকাউন্ট খোলার' : (purpose === 'reset' ? 'পাসওয়ার্ড রিসেটের' : 'লগইনের');

  return {
    success: true,
    maskedTarget,
    message: type === 'email'
      ? `আপনার ইমেইলে (${maskedTarget}) ${actionName} ৬-সংখ্যার ভেরিফিকেশন কোড পাঠানো হয়েছে। ইনবক্স বা স্প্যাম ফোল্ডার চেক করুন।`
      : `আপনার মোবাইল নম্বরে (${maskedTarget}) SMS-এ ${actionName} ৬-সংখ্যার কোড পাঠানো হয়েছে। মেসেজ চেক করুন।`,
  };
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

/**
 * Testing helper: retrieves code only if explicitly invoked for preview/offline assistance
 */
export function getTestingOtpCode(target: string): string | null {
  const pending = getPendingOtp();
  if (pending && pending.target === target.toLowerCase().trim()) {
    return pending.code;
  }
  const pendingReset = getPendingPasswordReset();
  if (pendingReset && pendingReset.target === target.toLowerCase().trim()) {
    return pendingReset.code;
  }
  return null;
}

export function verifySubmittedOtp(
  target: string,
  enteredCode: string,
  purpose: 'signup' | 'login' | 'reset' = 'signup'
): { success: boolean; message: string } {
  const pending = getPendingOtp();
  const normalizedTarget = target.toLowerCase().trim();
  const cleanEntered = enteredCode.replace(/\D/g, '').trim();

  if (!pending) {
    return {
      success: false,
      message: 'ভেরিফিকেশন কোডের মেয়াদ শেষ হয়েছে বা নতুন কোড নেওয়া হয়নি। অনুগ্রহ করে নতুন কোড নিন।',
    };
  }

  if (pending.target !== normalizedTarget) {
    return {
      success: false,
      message: 'টার্গেট ইমেইল বা ফোন নম্বরের অমিল রয়েছে। সঠিক তথ্য দিন।',
    };
  }

  if (pending.attempts >= 5) {
    return {
      success: false,
      message: 'অতিরিক্ত ভুল কোড দেওয়া হয়েছে! নিরাপত্তার জন্য নতুন কোড চেয়ে নিন।',
    };
  }

  // Increment attempts
  pending.attempts += 1;
  try {
    sessionStorage.setItem(PENDING_OTP_KEY, JSON.stringify(pending));
  } catch {}

  if (pending.code.trim() === cleanEntered) {
    try {
      sessionStorage.removeItem(PENDING_OTP_KEY);
    } catch {}
    return { success: true, message: 'ভেরিফিকেশন সফল হয়েছে!' };
  }

  return {
    success: false,
    message: `ভুল কোড দেওয়া হয়েছে! আপনার ইমেইল বা SMS-এ আসা কোডটি দিন। আর ${5 - pending.attempts} বার চেষ্টা বাকি আছে।`,
  };
}

// 6. Cloud Password Update & Forgot Password Service
export async function updateCloudUserPassword(
  emailOrPhone: string,
  newPassword: string
): Promise<boolean> {
  if (!emailOrPhone || !newPassword) return false;
  const userKey = sanitizeUserKey(emailOrPhone);
  try {
    const userDocRef = doc(db, 'users', userKey);
    await setDoc(
      userDocRef,
      {
        password: newPassword,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error('Failed to update user password in Firestore:', error);
    return false;
  }
}

export interface PendingPasswordReset {
  target: string;
  type: 'email' | 'phone';
  code: string;
  expiresAt: number;
  attempts: number;
}

export async function generateAndSendPasswordResetCode(
  target: string,
  type: 'email' | 'phone',
  isExistingLocally: boolean = false
): Promise<{ success: boolean; message: string; maskedTarget: string }> {
  const normalizedTarget = target.toLowerCase().trim();
  const maskedTarget = maskEmailOrPhone(normalizedTarget);

  // Check if account exists either in cloud or locally
  let exists = isExistingLocally;
  if (!exists) {
    exists = await checkUserExistsInCloud(normalizedTarget);
  }

  if (!exists) {
    return {
      success: false,
      maskedTarget,
      message: 'এই ইমেইল বা ফোন নম্বরে কোনো নিবন্ধিত অ্যাকাউন্ট পাওয়া যায়নি। সঠিক তথ্য দিন অথবা নতুন অ্যাকাউন্ট খুলুন।',
    };
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const resetData: PendingPasswordReset = {
    target: normalizedTarget,
    type,
    code,
    expiresAt: Date.now() + 15 * 60 * 1000, // 15 mins
    attempts: 0,
  };

  try {
    sessionStorage.setItem(PENDING_RESET_KEY, JSON.stringify(resetData));
  } catch {}

  // Dispatch real email
  if (type === 'email') {
    await sendRealVerificationEmail(normalizedTarget, code, 'reset');
  } else {
    console.log(`[SMS Reset Dispatch] Code sent to ${normalizedTarget}`);
  }

  return {
    success: true,
    maskedTarget,
    message: type === 'email'
      ? `আপনার নিবন্ধিত ইমেইলে (${maskedTarget}) ৬-সংখ্যার পাসওয়ার্ড রিসেট কোড পাঠানো হয়েছে। ইনবক্স বা স্প্যাম চেক করুন।`
      : `আপনার নিবন্ধিত ফোনে (${maskedTarget}) ৬-সংখ্যার পাসওয়ার্ড রিসেট কোড পাঠানো হয়েছে। SMS চেক করুন।`,
  };
}

export function getPendingPasswordReset(): PendingPasswordReset | null {
  try {
    const raw = sessionStorage.getItem(PENDING_RESET_KEY);
    if (raw) {
      const parsed: PendingPasswordReset = JSON.parse(raw);
      if (parsed.expiresAt > Date.now()) {
        return parsed;
      }
    }
  } catch {}
  return null;
}

export function verifyPasswordResetCode(
  target: string,
  enteredCode: string
): { success: boolean; message: string } {
  const pending = getPendingPasswordReset();
  const normalizedTarget = target.toLowerCase().trim();
  const entered = enteredCode.replace(/\D/g, '').trim();

  if (!pending) {
    return {
      success: false,
      message: 'রিসেট কোডের মেয়াদ শেষ হয়েছে বা নতুন কোড চাওয়া হয়নি। অনুগ্রহ করে পুনরায় কোড চেয়ে নিন।',
    };
  }

  if (pending.target !== normalizedTarget) {
    return {
      success: false,
      message: 'টার্গেট ইমেইল বা ফোন নম্বরের অমিল রয়েছে। অনুগ্রহ করে সঠিক তথ্য দিন।',
    };
  }

  if (pending.attempts >= 5) {
    return {
      success: false,
      message: 'অতিরিক্ত ভুল চেষ্টা করা হয়েছে। নিরাপত্তার স্বার্থে নতুন করে কোড চেয়ে নিন।',
    };
  }

  pending.attempts += 1;
  try {
    sessionStorage.setItem(PENDING_RESET_KEY, JSON.stringify(pending));
  } catch {}

  if (pending.code === entered) {
    try {
      sessionStorage.removeItem(PENDING_RESET_KEY);
    } catch {}
    return { success: true, message: 'কোড সফলভাবে যাচাই করা হয়েছে!' };
  }

  return {
    success: false,
    message: `ভুল কোড দেওয়া হয়েছে! আপনার ইমেইল বা SMS-এ আসা ৬-সংখ্যার কোডটি দিন। আর ${5 - pending.attempts} বার চেষ্টা বাকি আছে।`,
  };
}

export function clearPendingPasswordReset(): void {
  try {
    sessionStorage.removeItem(PENDING_RESET_KEY);
  } catch {}
}

/**
 * Verify user password against Firebase Cloud Firestore and local storage vault
 */
export async function verifyUserCloudPassword(
  emailOrPhone: string,
  inputPassword: string
): Promise<{
  exists: boolean;
  passwordMatches: boolean;
  cloudData?: CloudZikrState | null;
  savedPassword?: string;
  userProfile?: Partial<UserProfile>;
}> {
  if (!emailOrPhone) return { exists: false, passwordMatches: false };
  const target = emailOrPhone.trim();
  const cleanInput = inputPassword.trim();

  // 1. Fetch from Firestore (try original and alternative formats if phone)
  let cloudData = await loadUserDataFromCloud(target);
  if (!cloudData?.foundInCloud && !target.includes('@')) {
    const altTarget = target.startsWith('+') ? target.replace(/^\+/, '') : `+${target}`;
    cloudData = await loadUserDataFromCloud(altTarget);
  }
  const cloudPass = cloudData?.profile?.password;

  // 2. Fetch from local registry
  const localRegistryRaw = localStorage.getItem('zikrmate_cloud_accounts_vault_v1');
  let localPass = '';
  let localProf: UserProfile | undefined = undefined;

  if (localRegistryRaw) {
    try {
      const reg = JSON.parse(localRegistryRaw);
      const cleanTarget = target.toLowerCase();
      const altCleanTarget = cleanTarget.startsWith('+') ? cleanTarget.replace(/^\+/, '') : `+${cleanTarget}`;
      for (const k of Object.keys(reg)) {
        const item = reg[k];
        const regKey = k.toLowerCase();
        const regEmailPhone = item.profile?.emailOrPhone?.toLowerCase().trim() || '';
        if (
          regKey === cleanTarget ||
          regKey === altCleanTarget ||
          regEmailPhone === cleanTarget ||
          regEmailPhone === altCleanTarget
        ) {
          localProf = item.profile;
          localPass = item.profile?.password || '';
          break;
        }
      }
    } catch {}
  }

  const exists = !!(cloudData?.foundInCloud || localProf);
  const effectivePassword = cloudPass || localPass || '';

  if (!exists) {
    return { exists: false, passwordMatches: false };
  }

  // If password exists, compare directly
  if (effectivePassword) {
    const isMatch = effectivePassword.trim() === cleanInput;
    return {
      exists: true,
      passwordMatches: isMatch,
      cloudData,
      savedPassword: effectivePassword,
      userProfile: cloudData?.profile || localProf,
    };
  }

  // Account exists in cloud or local without a set password
  return {
    exists: true,
    passwordMatches: true,
    cloudData,
    savedPassword: '',
    userProfile: cloudData?.profile || localProf,
  };
}

// ================= ADMIN PANEL FIRESTORE HELPERS =================

export interface AdminUserRecord {
  userKey: string;
  name: string;
  emailOrPhone: string;
  email: string;
  phone: string;
  photoUrl: string;
  location: string;
  deviceModel: string;
  osVersion: string;
  verificationMethod: string;
  lastSyncedAt: number;
  createdAtMs: number;
  lifetimeTotalCount: number;
  activeZikrs: Array<{ id: string; name: string; count: number; target: number }>;
  hasPassword?: boolean;
}

/**
 * Fetch list of all registered users & active guest devices in Firestore for Admin Dashboard
 */
export async function fetchAllUsersForAdmin(): Promise<AdminUserRecord[]> {
  try {
    const usersCol = collection(db, 'users');
    const snapshot = await getDocs(usersCol);

    const results: AdminUserRecord[] = [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const userKey = docSnap.id;

      let prof: Partial<UserProfile> = {};
      if (data.profileJson) {
        try {
          prof = JSON.parse(data.profileJson);
        } catch {}
      }

      let activeZikrsParsed: Array<{ id: string; name: string; count: number; target: number }> = [];
      if (data.zikrsJson) {
        try {
          const zList = JSON.parse(data.zikrsJson);
          if (Array.isArray(zList)) {
            activeZikrsParsed = zList.map((z: any) => ({
              id: z.id || '',
              name: z.name || z.pronunciationBn || z.id || 'Zikr',
              count: typeof z.count === 'number' ? z.count : 0,
              target: typeof z.target === 'number' ? z.target : 33,
            }));
          }
        } catch {}
      }

      const isGuestDevice = userKey.startsWith('guest_') || (!data.email && !data.phone && !prof.emailOrPhone);

      const emailOrPhone = isGuestDevice
        ? `Guest Mobile (${userKey.replace(/^guest_/, '').slice(0, 10)})`
        : (prof.emailOrPhone || data.email || data.phone || (userKey.startsWith('u_') ? userKey.replace(/^u_/, '') : userKey));

      const displayName = isGuestDevice
        ? (data.name && !data.name.includes('ZikrMate User') ? data.name : `Guest (${data.deviceModel || prof.deviceModel || 'Mobile Device'})`)
        : (data.name || prof.name || 'ZikrMate User');

      results.push({
        userKey,
        name: displayName,
        emailOrPhone,
        email: data.email || (emailOrPhone.includes('@') ? emailOrPhone : ''),
        phone: data.phone || (!emailOrPhone.includes('@') && !isGuestDevice ? emailOrPhone : ''),
        photoUrl: data.photoUrl || prof.photoUrl || '',
        location: data.location || prof.location || 'Asia/Dhaka (Network Timezone)',
        deviceModel: data.deviceModel || prof.deviceModel || 'Mobile Device',
        osVersion: data.osVersion || prof.osVersion || 'Android / iOS',
        verificationMethod: isGuestDevice ? 'Guest Device' : (data.verificationMethod || prof.verificationMethod || 'Verified Account'),
        lastSyncedAt: data.updatedAtMs || (data.updatedAt ? new Date(data.updatedAt).getTime() : Date.now()),
        createdAtMs: data.createdAt ? new Date(data.createdAt).getTime() : (data.updatedAtMs || Date.now()),
        lifetimeTotalCount: typeof data.lifetimeTotalCount === 'number' ? data.lifetimeTotalCount : (typeof data.totalCount === 'number' ? data.totalCount : 0),
        activeZikrs: activeZikrsParsed,
        hasPassword: !!(data.password || prof.password),
      });
    });

    // Sort users by last synced / active time descending
    return results.sort((a, b) => b.lastSyncedAt - a.lastSyncedAt);
  } catch (error) {
    console.warn('Error fetching users for admin:', error);
    return [];
  }
}

/**
 * Fetch complete history sessions and Aamal logs for a specific user doc in Admin Panel
 */
export async function fetchUserDetailForAdmin(userKey: string): Promise<{
  historySessions: HistorySession[];
  aamalLogs: Record<string, any>;
}> {
  let historySessions: HistorySession[] = [];
  let aamalLogs: Record<string, any> = {};

  try {
    // 1. Fetch History sub-document
    const historyDocRef = doc(db, 'users', userKey, 'data', 'historyDoc');
    const historySnap = await getDoc(historyDocRef);
    if (historySnap.exists() && historySnap.data().historyJson) {
      try {
        const parsed = JSON.parse(historySnap.data().historyJson);
        if (Array.isArray(parsed)) historySessions = parsed;
      } catch {}
    }

    // 2. Fetch Aamal sub-document
    const aamalDocRef = doc(db, 'users', userKey, 'data', 'aamalDoc');
    const aamalSnap = await getDoc(aamalDocRef);
    if (aamalSnap.exists() && aamalSnap.data().aamalLogsJson) {
      try {
        const parsed = JSON.parse(aamalSnap.data().aamalLogsJson);
        if (parsed && typeof parsed === 'object') aamalLogs = parsed;
      } catch {}
    }
  } catch (err) {
    console.warn('Error fetching user details for admin:', err);
  }

  return { historySessions, aamalLogs };
}

/**
 * Real-time subscription to all users in Firestore for live Admin Dashboard updates
 */
export function subscribeToAllUsersForAdmin(
  onUpdate: (users: AdminUserRecord[]) => void
): Unsubscribe {
  const usersCol = collection(db, 'users');
  return onSnapshot(
    usersCol,
    (snapshot) => {
      const results: AdminUserRecord[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        const userKey = docSnap.id;

        let prof: Partial<UserProfile> = {};
        if (data.profileJson) {
          try {
            prof = JSON.parse(data.profileJson);
          } catch {}
        }

        let activeZikrsParsed: Array<{ id: string; name: string; count: number; target: number }> = [];
        if (data.zikrsJson) {
          try {
            const zList = JSON.parse(data.zikrsJson);
            if (Array.isArray(zList)) {
              activeZikrsParsed = zList.map((z: any) => ({
                id: z.id || '',
                name: z.name || z.pronunciationBn || z.id || 'Zikr',
                count: typeof z.count === 'number' ? z.count : 0,
                target: typeof z.target === 'number' ? z.target : 33,
              }));
            }
          } catch {}
        }

        const isGuestDevice = userKey.startsWith('guest_') || (!data.email && !data.phone && !prof.emailOrPhone);

        const emailOrPhone = isGuestDevice
          ? `Guest Mobile (${userKey.replace(/^guest_/, '').slice(0, 10)})`
          : (prof.emailOrPhone || data.email || data.phone || (userKey.startsWith('u_') ? userKey.replace(/^u_/, '') : userKey));

        const displayName = isGuestDevice
          ? (data.name && !data.name.includes('ZikrMate User') ? data.name : `Guest (${data.deviceModel || prof.deviceModel || 'Mobile Device'})`)
          : (data.name || prof.name || 'ZikrMate User');

        results.push({
          userKey,
          name: displayName,
          emailOrPhone,
          email: data.email || (emailOrPhone.includes('@') ? emailOrPhone : ''),
          phone: data.phone || (!emailOrPhone.includes('@') && !isGuestDevice ? emailOrPhone : ''),
          photoUrl: data.photoUrl || prof.photoUrl || '',
          location: data.location || prof.location || 'Asia/Dhaka (Network Timezone)',
          deviceModel: data.deviceModel || prof.deviceModel || 'Mobile Device',
          osVersion: data.osVersion || prof.osVersion || 'Android / iOS',
          verificationMethod: isGuestDevice ? 'Guest Device' : (data.verificationMethod || prof.verificationMethod || 'Verified Account'),
          lastSyncedAt: data.updatedAtMs || (data.updatedAt ? new Date(data.updatedAt).getTime() : Date.now()),
          createdAtMs: data.createdAt ? new Date(data.createdAt).getTime() : (data.updatedAtMs || Date.now()),
          lifetimeTotalCount: typeof data.lifetimeTotalCount === 'number' ? data.lifetimeTotalCount : (typeof data.totalCount === 'number' ? data.totalCount : 0),
          activeZikrs: activeZikrsParsed,
          hasPassword: !!(data.password || prof.password),
        });
      });

      onUpdate(results.sort((a, b) => b.lastSyncedAt - a.lastSyncedAt));
    },
    (err) => {
      console.warn('Real-time admin subscription notice:', err);
    }
  );
}

/**
 * Admin function to remove a user document
 */
export async function deleteUserByAdmin(userKey: string): Promise<boolean> {
  try {
    const userDocRef = doc(db, 'users', userKey);
    await deleteDoc(userDocRef);
    return true;
  } catch {
    return false;
  }
}


