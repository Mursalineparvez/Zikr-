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
  memoryLocalCache,
  doc,
  getDoc,
  getDocFromServer,
  getDocsFromServer,
  setDoc,
  updateDoc,
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
import { authFetch, setServerAccountPassword } from './authClient';

// Silence verbose internal warnings from internal Firestore logger
try {
  setLogLevel('silent');
} catch {}

// 1. Initialize Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// 2. Safely initialize Auth with default web persistence (IndexedDB + Local + Session) & popup resolver
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

export interface GoogleAuthResult {
  success: boolean;
  user?: { name: string; email: string; photoUrl: string; uid: string; idToken?: string };
  isRedirecting?: boolean;
  cancelled?: boolean;
  popupBlocked?: boolean;
  inIframe?: boolean;
  errorCode?: string;
  error?: string;
}

/**
 * Real Firebase Google Sign-In with account chooser ('select_account')
 * Shows all Gmail accounts logged into the user's phone or laptop browser.
 */
export async function signInWithGoogleAuth(loginHintEmail?: string): Promise<GoogleAuthResult> {
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
        error: 'Google Sign-In is initializing. Please try again in a moment.',
      };
    }

    const googleProvider = new GoogleAuthProvider();
    const customParams: Record<string, string> = {
      prompt: 'select_account',
    };
    if (loginHintEmail && loginHintEmail.includes('@')) {
      customParams.login_hint = loginHintEmail.toLowerCase().trim();
    }
    googleProvider.setCustomParameters(customParams);
    googleProvider.addScope('profile');
    googleProvider.addScope('email');

    // Primary: Popup sign-in (shows Google's native account picker with all phone/laptop Gmail accounts)
    const popupStartMs = Date.now();
    try {
      const result = await signInWithPopup(authInstance, googleProvider, browserPopupRedirectResolver);
      const user = result.user;
      const idToken = await user.getIdToken().catch(() => '');
      return {
        success: true,
        user: {
          name: user.displayName || user.email?.split('@')[0] || 'Google User',
          email: user.email || '',
          photoUrl: user.photoURL || '',
          uid: user.uid,
          idToken,
        },
      };
    } catch (popupError: any) {
      const elapsed = Date.now() - popupStartMs;
      const code = String(popupError?.code || '');
      const inIframe = typeof window !== 'undefined' && window.self !== window.top;
      console.warn('Google Sign-In popup notice:', code, popupError?.message, { inIframe, elapsed });

      const isFastIframeClose =
        inIframe &&
        elapsed < 1500 &&
        (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request');

      if (!isFastIframeClose && (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request')) {
        return {
          success: false,
          cancelled: true,
          inIframe,
          errorCode: code,
          error: 'Google sign-in popup was closed before selecting an account.',
        };
      }

      // Never trigger signInWithRedirect for auth/unauthorized-domain (prevents redirect loops on unauthorized hosts)
      // On standalone mobile/desktop/PWA tabs (not inside an iframe), fall back to full-page Google account chooser redirect
      if (
        !inIframe &&
        (code === 'auth/popup-blocked' ||
          code === 'auth/operation-not-supported-in-this-environment' ||
          code === 'auth/internal-error')
      ) {
        try {
          sessionStorage.setItem('zikrmate_google_redirect_in_progress', 'true');
        } catch {}
        await signInWithRedirect(authInstance, googleProvider, browserPopupRedirectResolver);
        return {
          success: false,
          isRedirecting: true,
          error: 'Redirecting to Google Account Chooser...',
        };
      }

      return {
        success: false,
        popupBlocked:
          isFastIframeClose ||
          code === 'auth/popup-blocked' ||
          code === 'auth/internal-error' ||
          code === 'auth/operation-not-supported-in-this-environment',
        inIframe,
        errorCode: code,
        error: popupError?.message || 'Google Sign-In popup could not be opened.',
      };
    }
  } catch (error: any) {
    const code = String(error?.code || '');
    const inIframe = typeof window !== 'undefined' && window.self !== window.top;
    console.warn('Google Sign-In error:', code, error);
    return {
      success: false,
      inIframe,
      errorCode: code,
      error: error?.message || 'Google sign-in could not be completed.',
    };
  }
}

/**
 * Check for Google Sign-In redirect result on app startup (for mobile devices)
 */
export async function checkGoogleRedirectResult(): Promise<{
  success: boolean;
  user?: { name: string; email: string; photoUrl: string; uid: string; idToken?: string };
  error?: string;
} | null> {
  try {
    let authInstance = auth || getAuth(app);
    if (!authInstance) return null;
    const result = await getRedirectResult(authInstance);
    if (result && result.user) {
      const user = result.user;
      const idToken = await user.getIdToken().catch(() => '');
      return {
        success: true,
        user: {
          name: user.displayName || user.email?.split('@')[0] || 'Google User',
          email: user.email || '',
          photoUrl: user.photoURL || '',
          uid: user.uid,
          idToken,
        },
      };
    }
  } catch (error: any) {
    console.warn('Check Google redirect result error:', error);
  }
  return null;
}

/**
 * Real-time listener for Firebase Auth session changes (supports cross-device & PWA restarts)
 */
export function listenToAuthChanges(
  callback: (user: { name: string; email: string; photoUrl: string; uid: string; idToken?: string } | null) => void
): Unsubscribe {
  try {
    const authInstance = auth || getAuth(app);
    if (!authInstance) return () => {};
    return onAuthStateChanged(authInstance, async (user: FirebaseUser | null) => {
      if (user && user.email) {
        const idToken = await user.getIdToken().catch(() => '');
        callback({
          name: user.displayName || user.email.split('@')[0] || 'User',
          email: user.email,
          photoUrl: user.photoURL || '',
          uid: user.uid,
          idToken,
        });
      } else {
        callback(null);
      }
    });
  } catch {
    return () => {};
  }
}

// 2. Initialize Firestore Database with crash-safe memory local cache (prevents IndexedDB assertion da08 crashes)
export const db = (() => {
  const dbId = firebaseConfig.firestoreDatabaseId || undefined;
  try {
    return initializeFirestore(
      app,
      {
        experimentalAutoDetectLongPolling: true,
        localCache: memoryLocalCache(),
      },
      dbId
    );
  } catch (err) {
    console.warn('Firestore fallback notice, using existing instance:', err);
    return dbId ? getFirestore(app, dbId) : getFirestore(app);
  }
})();

// 3. Unique Device ID to distinguish between different devices (e.g. mobile vs pc)
import { getDeviceId } from '../utils/deviceInfo';
export { getDeviceId };


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

/**
 * Safely updates device telemetry for this user without touching zikr counts, history or streak!
 * Used on app mount and device connection so that other devices never have their counts overwritten.
 */
export async function updateDeviceTelemetry(
  emailOrPhone: string,
  deviceInfo: { model: string; osVersion: string; location: string }
): Promise<void> {
  if (!emailOrPhone) return;
  const userKey = sanitizeUserKey(emailOrPhone);
  const currentDeviceId = getDeviceId();
  try {
    const userDocRef = doc(db, 'users', userKey);
    await setDoc(
      userDocRef,
      {
        deviceModel: deviceInfo.model,
        osVersion: deviceInfo.osVersion,
        location: deviceInfo.location,
        lastActiveAt: new Date().toISOString(),
        lastActiveAtMs: Date.now(),
        senderDeviceId: currentDeviceId,
      },
      { merge: true }
    );
  } catch {
    // Non-blocking telemetry
  }
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
      name: profile.name || (emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Zikr+ User'),
      email: emailOrPhone.includes('@') ? emailOrPhone.toLowerCase().trim() : '',
      phone: !emailOrPhone.includes('@') ? emailOrPhone.trim() : '',
      isVerified: profile.isVerified ?? true,
      verificationMethod: profile.verificationMethod || (emailOrPhone.includes('@') ? (profile.authProvider === 'google' ? 'google' : 'email') : 'phone'),
      photoUrl: safePhotoUrl,
      location: effectiveLocation,
      deviceModel: effectiveDeviceModel,
      osVersion: effectiveOsVersion,
      profileJson: profileJsonStr,
      zikrsJson: zikrsJsonStr,
      historyJson: historyJsonStr,
      aamalLogsJson: aamalLogsJsonStr,
      settingsJson: settingsJsonStr,
      totalCount: totalCount,
      lifetimeTotalCount: lifetimeTotalCount,
      updatedAt: nowIso,
      updatedAtMs: nowMs,
      senderDeviceId: currentDeviceId,
    };
    if (profile.verificationDate) {
      userDocPayload.createdAt = profile.verificationDate;
    }

    // Wrap setDoc in race with timeout so write stream backoff never blocks UI
    try {
      const setDocPromise = setDoc(userDocRef, userDocPayload, { merge: true });
      // If Firestore network latency takes more than 6s, proceed without blocking the user
      const timeoutPromise = new Promise((resolve) => setTimeout(resolve, 6000));
      await Promise.race([setDocPromise, timeoutPromise]);
    } catch (writeErr: any) {
      if (writeErr?.code === 'resource-exhausted' || writeErr?.message?.includes('Quota limit exceeded')) {
        try {
          localStorage.setItem('zikrmate_firestore_quota_exhausted', 'true');
        } catch {}
      }
    }

    // 2. ONLY save heavy history sessions sub-doc if history has entries
    if (history && history.length > 0) {
      const minifiedHistory = minifyHistoryForCloud(history);
      const historyJsonStr = JSON.stringify(minifiedHistory);
      const historyDocRef = doc(db, 'users', userKey, 'data', 'historyDoc');
      setDoc(historyDocRef, { historyJson: historyJsonStr, updatedAtMs: nowMs }, { merge: true }).catch(() => {});
    }

    // 3. ONLY save heavy aamal logs sub-doc if aamalLogs has entries
    if (aamalLogs && Object.keys(aamalLogs).length > 0) {
      const minifiedAamal = minifyAamalLogsForCloud(aamalLogs);
      const aamalLogsJsonStr = JSON.stringify(minifiedAamal);
      const aamalDocRef = doc(db, 'users', userKey, 'data', 'aamalDoc');
      setDoc(aamalDocRef, { aamalLogsJson: aamalLogsJsonStr, updatedAtMs: nowMs }, { merge: true }).catch(() => {});
    }

    // Background sync to authenticated normalized server database (users, profiles, user_data)
    if (!userKey.startsWith('guest_')) {
      authFetch('/api/sync-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userKey,
          profile: safeProfile,
          zikrs,
          historySessions: minifiedHistory,
          aamalLogs: minifiedAamal,
          settings: settings || {},
          lifetimeTotalCount,
        }),
      }).catch(() => {});
    }

    // 4. Always update local cache & account record
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
  } catch (error: any) {
    console.warn('saveUserDataToCloud notice:', error?.message || error);
    return false;
  }
}

/**
 * Deterministic merge of two CloudZikrState snapshots (e.g. Firestore + Server DB)
 * so App and Web always converge to the exact same counts, history, aamal, and profile.
 */
export function mergeCloudZikrStates(
  primary?: CloudZikrState | null,
  secondary?: CloudZikrState | null
): CloudZikrState {
  if (!primary?.foundInCloud && !secondary?.foundInCloud) {
    return primary || secondary || { foundInCloud: false, hasZikrData: false };
  }
  if (!primary?.foundInCloud && secondary?.foundInCloud) return secondary;
  if (primary?.foundInCloud && !secondary?.foundInCloud) return primary;

  const a = primary!;
  const b = secondary!;
  const aTs = a.updatedAtMs || a.lastSyncedAt || 0;
  const bTs = b.updatedAtMs || b.lastSyncedAt || 0;
  const newer = bTs > aTs ? b : a;
  const older = bTs > aTs ? a : b;

  // Merge zikrs by id taking highest count
  const zikrMap = new Map<string, ZikrItem>();
  for (const list of [older.zikrs || [], newer.zikrs || []]) {
    for (const z of list) {
      if (!z || !z.id) continue;
      const prev = zikrMap.get(z.id);
      if (!prev) {
        zikrMap.set(z.id, z);
      } else {
        zikrMap.set(z.id, {
          ...prev,
          ...z,
          count: Math.max(prev.count || 0, z.count || 0),
          updatedAt: Math.max(prev.updatedAt || 0, z.updatedAt || 0),
        });
      }
    }
  }
  const mergedZikrs = Array.from(zikrMap.values());

  // Merge history sessions by id
  const historyMap = new Map<string, HistorySession>();
  for (const s of [...(older.history || []), ...(newer.history || [])]) {
    if (s && s.id) historyMap.set(s.id, s);
  }
  const mergedHistory = Array.from(historyMap.values()).sort((x, y) => y.timestamp - x.timestamp);

  // Merge aamalLogs by date key taking higher dhikrCount & union of completed item ids
  const mergedAamalLogs: Record<string, any> = { ...(older.aamalLogs || {}) };
  for (const [dateKey, inc] of Object.entries(newer.aamalLogs || {})) {
    const prev = mergedAamalLogs[dateKey];
    if (!prev || typeof prev !== 'object') {
      mergedAamalLogs[dateKey] = inc;
    } else if (inc && typeof inc === 'object') {
      const prevItems = Array.isArray(prev.completedIds) ? prev.completedIds : [];
      const incItems = Array.isArray((inc as any).completedIds) ? (inc as any).completedIds : [];
      const mergedIds = Array.from(new Set([...prevItems, ...incItems]));
      mergedAamalLogs[dateKey] = {
        ...prev,
        ...inc,
        dhikrCount: Math.max(prev.dhikrCount || 0, (inc as any).dhikrCount || 0),
        ...(mergedIds.length > 0 ? { completedIds: mergedIds } : {}),
      };
    }
  }

  let aamalDhikrSum = 0;
  for (const dayLog of Object.values(mergedAamalLogs)) {
    if (dayLog && typeof (dayLog as any).dhikrCount === 'number') {
      aamalDhikrSum += (dayLog as any).dhikrCount;
    }
  }
  const historyDhikrSum = mergedHistory.reduce((acc, s) => acc + (s.totalCount || 0), 0);
  const activeDhikrSum = mergedZikrs.reduce((acc, z) => acc + (z.count || 0), 0);

  const mergedLifetime = Math.max(
    a.lifetimeTotalCount || 0,
    b.lifetimeTotalCount || 0,
    a.totalCount || 0,
    b.totalCount || 0,
    aamalDhikrSum,
    historyDhikrSum,
    activeDhikrSum
  );

  const mergedProfile: Partial<UserProfile> = {
    ...(older.profile || {}),
    ...(newer.profile || {}),
    name: newer.profile?.name || older.profile?.name,
    photoUrl: newer.profile?.photoUrl || older.profile?.photoUrl,
    location: newer.profile?.location || older.profile?.location,
    isSignedIn: true,
    isVerified: true,
  };

  const mergedSettings =
    older.settings || newer.settings
      ? ({ ...(older.settings || {}), ...(newer.settings || {}) } as AppSettings)
      : undefined;

  return {
    profile: mergedProfile,
    zikrs: mergedZikrs,
    history: mergedHistory,
    settings: mergedSettings,
    lifetimeTotalCount: mergedLifetime,
    totalCount: activeDhikrSum,
    aamalLogs: mergedAamalLogs,
    updatedAtMs: Math.max(aTs, bTs) || Date.now(),
    lastSyncedAt: Math.max(a.lastSyncedAt || 0, b.lastSyncedAt || 0) || Date.now(),
    senderDeviceId: newer.senderDeviceId || older.senderDeviceId,
    foundInCloud: true,
    hasZikrData: mergedZikrs.length > 0 || Boolean(a.hasZikrData) || Boolean(b.hasZikrData),
  };
}

/**
 * Load user data from BOTH Firebase Firestore and authenticated Server DB,
 * then merge them so App and Web show identical counts & profile on every sign-in.
 */
export async function loadUserDataFromCloud(
  emailOrPhone: string
): Promise<CloudZikrState | null> {
  if (!emailOrPhone) return null;
  const userKey = sanitizeUserKey(emailOrPhone);

  const fetchServerState = async (): Promise<CloudZikrState | null> => {
    if (userKey.startsWith('guest_')) return null;
    try {
      const res = await Promise.race([
        authFetch(`/api/sync-user/${encodeURIComponent(userKey)}`),
        new Promise<null>((resolve) => setTimeout(() => resolve(null), 2500)),
      ]);
      if (res && res.ok) {
        const json = await res.json();
        if (json?.success && json?.user) {
          const u = json.user;
          return {
            profile: {
              name: u.name,
              emailOrPhone: u.email || u.emailOrPhone || emailOrPhone,
              photoUrl: u.photoUrl || '',
              location: u.location || '',
              deviceModel: u.deviceModel || '',
              osVersion: u.osVersion || '',
              isSignedIn: true,
              isVerified: true,
            },
            zikrs: Array.isArray(u.activeZikrs) ? u.activeZikrs : [],
            history: Array.isArray(u.historySessions) ? u.historySessions : [],
            settings: u.settings,
            lifetimeTotalCount: typeof u.lifetimeTotalCount === 'number' ? u.lifetimeTotalCount : 0,
            aamalLogs: u.aamalLogs || {},
            lastSyncedAt: typeof u.lastSyncedAt === 'number' ? u.lastSyncedAt : undefined,
            updatedAtMs: typeof u.lastSyncedAt === 'number' ? u.lastSyncedAt : undefined,
            foundInCloud: true,
            hasZikrData: Array.isArray(u.activeZikrs) && u.activeZikrs.length > 0,
          };
        }
      }
    } catch {}
    return null;
  };

  try {
    const profileDocRef = doc(db, 'users', userKey);
    const historyDocRef = doc(db, 'users', userKey, 'data', 'historyDoc');
    const aamalDocRef = doc(db, 'users', userKey, 'data', 'aamalDoc');
    const dataDocRef = doc(db, 'users', userKey, 'data', 'zikrState');

    const fetchFirestoreDocs = Promise.all([
      getDoc(profileDocRef).catch(() => null),
      getDoc(historyDocRef).catch(() => null),
      getDoc(aamalDocRef).catch(() => null),
      getDoc(dataDocRef).catch(() => null),
    ]);
    const timeoutFallback = new Promise<null>((resolve) => setTimeout(() => resolve(null), 4000));

    const [snaps, serverState] = await Promise.all([
      Promise.race([fetchFirestoreDocs, timeoutFallback]),
      fetchServerState(),
    ]);

    const profileSnap = snaps ? snaps[0] : null;
    const historySnap = snaps ? snaps[1] : null;
    const aamalSnap = snaps ? snaps[2] : null;
    const dataSnap = snaps ? snaps[3] : null;

    let rawData: any = profileSnap && profileSnap.exists() ? profileSnap.data() : null;
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
      if (serverState && serverState.foundInCloud) {
        return serverState;
      }

      // Check offline backup cache if cloud & server have no record yet
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
    const loadedUpdatedAtMs: number | undefined = rawData.updatedAtMs;
    const loadedSenderDeviceId: string | undefined = rawData.senderDeviceId;
    let hasZikrData = false;

    if (rawData.name) loadedProfile.name = rawData.name;
    if (rawData.email || rawData.phone) loadedProfile.emailOrPhone = rawData.email || rawData.phone;
    if (rawData.photoUrl) loadedProfile.photoUrl = rawData.photoUrl;
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
    } else if (typeof rawData.totalCount === 'number') {
      loadedLifetimeTotal = rawData.totalCount;
    }

    let aamalDhikrSum = 0;
    if (loadedAamalLogs && typeof loadedAamalLogs === 'object') {
      for (const dayLog of Object.values(loadedAamalLogs)) {
        if (dayLog && typeof (dayLog as any).dhikrCount === 'number') {
          aamalDhikrSum += (dayLog as any).dhikrCount;
        }
      }
    }
    const historyDhikrSum = (loadedHistory || []).reduce((acc, s) => acc + (s.totalCount || 0), 0);
    const activeDhikrSum = (loadedZikrs || []).reduce((acc, z) => acc + (z.count || 0), 0);
    const verifiedLifetime = Math.max(
      loadedLifetimeTotal || 0,
      typeof rawData.totalCount === 'number' ? rawData.totalCount : 0,
      aamalDhikrSum,
      historyDhikrSum,
      activeDhikrSum
    );
    loadedLifetimeTotal = verifiedLifetime;

    const firestoreState: CloudZikrState = {
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

    return mergeCloudZikrStates(firestoreState, serverState);
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
    } else if (typeof data.totalCount === 'number') {
      loadedLifetimeTotal = data.totalCount;
    }

    // Ensure loadedLifetimeTotal is never lower than what's recorded in Aamal logs, History sessions, or active beads:
    let aamalDhikrSum = 0;
    if (loadedAamalLogs && typeof loadedAamalLogs === 'object') {
      for (const dayLog of Object.values(loadedAamalLogs)) {
        if (dayLog && typeof (dayLog as any).dhikrCount === 'number') {
          aamalDhikrSum += (dayLog as any).dhikrCount;
        }
      }
    }
    const historyDhikrSum = (loadedHistory || []).reduce((acc, s) => acc + (s.totalCount || 0), 0);
    const activeDhikrSum = (loadedZikrs || []).reduce((acc, z) => acc + (z.count || 0), 0);
    const verifiedLifetime = Math.max(
      loadedLifetimeTotal || 0,
      typeof data.totalCount === 'number' ? data.totalCount : 0,
      aamalDhikrSum,
      historyDhikrSum,
      activeDhikrSum
    );
    loadedLifetimeTotal = verifiedLifetime;

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

  try {
    const unsub = onSnapshot(
      profileDocRef,
      async (snap) => {
        try {
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

          // If root document doesn't have aamalLogsJson or historyJson yet, pull from subcollections
          if (!data.aamalLogsJson || !data.historyJson) {
            try {
              const [aamalSnap, historySnap] = await Promise.all([
                !data.aamalLogsJson ? getDoc(doc(db, 'users', userKey, 'data', 'aamalDoc')).catch(() => null) : null,
                !data.historyJson ? getDoc(doc(db, 'users', userKey, 'data', 'historyDoc')).catch(() => null) : null,
              ]);
              if (aamalSnap && aamalSnap.exists() && aamalSnap.data().aamalLogsJson) {
                data.aamalLogsJson = aamalSnap.data().aamalLogsJson;
              }
              if (historySnap && historySnap.exists() && historySnap.data().historyJson) {
                data.historyJson = historySnap.data().historyJson;
              }
            } catch {}
          }

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
        } catch (innerErr) {
          console.warn('Firestore live subscription update notice:', innerErr);
        }
      },
      (err) => {
        console.warn('Firestore live subscription notice:', err);
      }
    );

    return unsub;
  } catch (err) {
    console.warn('Error initiating Firestore live subscription:', err);
    return () => {};
  }
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
 * Save user's saved highlights to Firestore sub-document (/users/{userId}/data/libraryDoc)
 */
export async function saveLibraryHighlightsToCloud(
  emailOrPhone: string,
  highlightsJson: string
): Promise<boolean> {
  if (!emailOrPhone) return false;
  const userKey = sanitizeUserKey(emailOrPhone);
  try {
    const libraryDocRef = doc(db, 'users', userKey, 'data', 'libraryDoc');
    await Promise.race([
      setDoc(
        libraryDocRef,
        {
          userId: userKey,
          savedHighlightsJson: highlightsJson,
          updatedAt: new Date().toISOString(),
          updatedAtMs: Date.now(),
        },
        { merge: true }
      ),
      new Promise((resolve) => setTimeout(resolve, 5000)),
    ]);
    return true;
  } catch {
    return false;
  }
}

/**
 * Load user's saved highlights from Firestore sub-document (/users/{userId}/data/libraryDoc)
 */
export async function loadLibraryHighlightsFromCloud(
  emailOrPhone: string
): Promise<any[] | null> {
  if (!emailOrPhone) return null;
  const userKey = sanitizeUserKey(emailOrPhone);
  try {
    const libraryDocRef = doc(db, 'users', userKey, 'data', 'libraryDoc');
    const snap = await getDoc(libraryDocRef);
    if (!snap.exists()) return null;
    const raw = snap.data()?.savedHighlightsJson;
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
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

// 6. Server-side Password Update Service (never stores plaintext password in Firestore)
export async function updateCloudUserPassword(
  _emailOrPhone: string,
  newPassword: string,
  currentPassword?: string
): Promise<boolean> {
  if (!newPassword || newPassword.trim().length < 4) return false;
  const res = await setServerAccountPassword({
    currentPassword,
    newPassword: newPassword.trim(),
  });
  return res.ok;
}

/**
 * Verify user password strictly via server scrypt hash verification (/api/verify-password)
 */
export async function verifyUserCloudPassword(
  emailOrPhone: string,
  inputPassword: string
): Promise<{
  exists: boolean;
  passwordMatches: boolean;
  hasSetPassword?: boolean;
  cloudData?: CloudZikrState | null;
  userProfile?: Partial<UserProfile>;
}> {
  if (!emailOrPhone) return { exists: false, passwordMatches: false };
  const target = emailOrPhone.trim();
  const cleanInput = inputPassword.trim();

  try {
    const srvRes = await authFetch('/api/verify-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrPhone: target, password: cleanInput }),
    });
    if (srvRes.ok) {
      const srvData = await srvRes.json();
      return {
        exists: Boolean(srvData.exists),
        passwordMatches: Boolean(srvData.passwordMatches),
        hasSetPassword: Boolean(srvData.hasSetPassword),
      };
    }
  } catch {}

  return { exists: false, passwordMatches: false };
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
  const mergedMap = new Map<string, AdminUserRecord>();

  // 1. Fetch from authenticated server admin endpoint
  try {
    const res = await authFetch('/api/admin/users');
    if (res.ok) {
      const json = await res.json();
      if (Array.isArray(json.users)) {
        json.users.forEach((u: AdminUserRecord) => {
          if (u && u.userKey) mergedMap.set(u.userKey, u);
        });
      }
    }
  } catch {}

  // 2. Also fetch from Firestore if Admin Firebase Auth session is active
  try {
    const usersCol = collection(db, 'users');
    const getPromise = getDocs(usersCol);
    const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000));
    const snapshot: any = await Promise.race([getPromise, timeoutPromise]);

    if (snapshot) {
      snapshot.forEach((docSnap: any) => {
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
        let rawEmail = data.email || prof.emailOrPhone || '';
        if (!rawEmail.includes('@') && userKey.startsWith('u_') && userKey.includes('_gmail_com')) {
          rawEmail = userKey.replace(/^u_/, '').replace(/_gmail_com$/, '@gmail.com');
        }

        const emailOrPhone = isGuestDevice
          ? `Guest Mobile (${userKey.replace(/^guest_/, '').slice(0, 10)})`
          : (rawEmail || data.phone || (userKey.startsWith('u_') ? userKey.replace(/^u_/, '') : userKey));

        const displayName = isGuestDevice
          ? (data.name && !data.name.includes('ZikrMate User') && !data.name.includes('Zikr+ User') ? data.name : `Guest (${data.deviceModel || prof.deviceModel || 'Mobile Device'})`)
          : (data.name || prof.name || (rawEmail ? rawEmail.split('@')[0] : 'Zikr+ User'));

        let method = isGuestDevice
          ? 'Guest Device'
          : (data.verificationMethod || prof.verificationMethod || (rawEmail.includes('@') ? 'Google / Email' : 'Verified Account'));
        if (method === 'google' || rawEmail.endsWith('@gmail.com')) {
          method = 'Google Sign-In';
        }

        const cloudRecord: AdminUserRecord = {
          userKey,
          name: displayName,
          emailOrPhone,
          email: rawEmail || (emailOrPhone.includes('@') ? emailOrPhone : ''),
          phone: data.phone || (!emailOrPhone.includes('@') && !isGuestDevice ? emailOrPhone : ''),
          photoUrl: data.photoUrl || prof.photoUrl || '',
          location: data.location || prof.location || 'Asia/Dhaka (Network Timezone)',
          deviceModel: data.deviceModel || prof.deviceModel || 'Android / Mobile Device',
          osVersion: data.osVersion || prof.osVersion || 'Android',
          verificationMethod: method,
          lastSyncedAt: data.updatedAtMs || (data.updatedAt ? new Date(data.updatedAt).getTime() : Date.now()),
          createdAtMs: data.createdAt ? new Date(data.createdAt).getTime() : (data.updatedAtMs || Date.now()),
          lifetimeTotalCount: Math.max(
            typeof data.lifetimeTotalCount === 'number' ? data.lifetimeTotalCount : 0,
            typeof data.totalCount === 'number' ? data.totalCount : 0,
            activeZikrsParsed.reduce((acc, curr) => acc + (curr.count || 0), 0)
          ),
          activeZikrs: activeZikrsParsed,
          hasPassword: Boolean(mergedMap.get(userKey)?.hasPassword),
        };

        const existing = mergedMap.get(userKey);
        if (!existing || cloudRecord.lifetimeTotalCount > existing.lifetimeTotalCount) {
          mergedMap.set(userKey, { ...(existing || {}), ...cloudRecord });
        }
      });
    }
  } catch {}

  return Array.from(mergedMap.values()).sort((a, b) => b.lastSyncedAt - a.lastSyncedAt);
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
    const userDocRef = doc(db, 'users', userKey);
    const historyDocRef = doc(db, 'users', userKey, 'data', 'historyDoc');
    const aamalDocRef = doc(db, 'users', userKey, 'data', 'aamalDoc');

    const [userSnap, historySnap, aamalSnap] = await Promise.all([
      getDoc(userDocRef).catch(() => null),
      getDoc(historyDocRef).catch(() => null),
      getDoc(aamalDocRef).catch(() => null),
    ]);

    const historyMap = new Map<string, HistorySession>();

    if (userSnap && userSnap.exists()) {
      const uData = userSnap.data();
      if (uData.historyJson) {
        try {
          const parsed = JSON.parse(uData.historyJson);
          if (Array.isArray(parsed)) parsed.forEach((s: any) => historyMap.set(s.id, s));
        } catch {}
      }
      if (uData.aamalLogsJson) {
        try {
          const parsed = JSON.parse(uData.aamalLogsJson);
          if (parsed && typeof parsed === 'object') {
            aamalLogs = { ...aamalLogs, ...parsed };
          }
        } catch {}
      }
    }

    if (historySnap && historySnap.exists() && historySnap.data().historyJson) {
      try {
        const parsed = JSON.parse(historySnap.data().historyJson);
        if (Array.isArray(parsed)) parsed.forEach((s: any) => historyMap.set(s.id, s));
      } catch {}
    }

    if (aamalSnap && aamalSnap.exists() && aamalSnap.data().aamalLogsJson) {
      try {
        const parsed = JSON.parse(aamalSnap.data().aamalLogsJson);
        if (parsed && typeof parsed === 'object') {
          aamalLogs = { ...aamalLogs, ...parsed };
        }
      } catch {}
    }

    historySessions = Array.from(historyMap.values()).sort((a, b) => b.timestamp - a.timestamp);
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

        let rawEmail = data.email || prof.emailOrPhone || '';
        if (!rawEmail.includes('@') && userKey.startsWith('u_') && userKey.includes('_gmail_com')) {
          rawEmail = userKey.replace(/^u_/, '').replace(/_gmail_com$/, '@gmail.com');
        }

        const emailOrPhone = isGuestDevice
          ? `Guest Mobile (${userKey.replace(/^guest_/, '').slice(0, 10)})`
          : (rawEmail || data.phone || (userKey.startsWith('u_') ? userKey.replace(/^u_/, '') : userKey));

        const displayName = isGuestDevice
          ? (data.name && !data.name.includes('ZikrMate User') && !data.name.includes('Zikr+ User') ? data.name : `Guest (${data.deviceModel || prof.deviceModel || 'Mobile Device'})`)
          : (data.name || prof.name || (rawEmail ? rawEmail.split('@')[0] : 'Zikr+ User'));

        let method = isGuestDevice
          ? 'Guest Device'
          : (data.verificationMethod || prof.verificationMethod || (rawEmail.includes('@') ? 'Google / Email' : 'Verified Account'));
        if (method === 'google' || rawEmail.endsWith('@gmail.com')) {
          method = 'Google Sign-In';
        }

        results.push({
          userKey,
          name: displayName,
          emailOrPhone,
          email: rawEmail || (emailOrPhone.includes('@') ? emailOrPhone : ''),
          phone: data.phone || (!emailOrPhone.includes('@') && !isGuestDevice ? emailOrPhone : ''),
          photoUrl: data.photoUrl || prof.photoUrl || '',
          location: data.location || prof.location || 'Asia/Dhaka (Network Timezone)',
          deviceModel: data.deviceModel || prof.deviceModel || 'Android / Mobile Device',
          osVersion: data.osVersion || prof.osVersion || 'Android',
          verificationMethod: method,
          lastSyncedAt: data.updatedAtMs || (data.updatedAt ? new Date(data.updatedAt).getTime() : Date.now()),
          createdAtMs: data.createdAt ? new Date(data.createdAt).getTime() : (data.updatedAtMs || Date.now()),
          lifetimeTotalCount: Math.max(
          typeof data.lifetimeTotalCount === 'number' ? data.lifetimeTotalCount : 0,
          typeof data.totalCount === 'number' ? data.totalCount : 0,
          activeZikrsParsed.reduce((acc, curr) => acc + (curr.count || 0), 0)
        ),
          activeZikrs: activeZikrsParsed,
          hasPassword: false,
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
  let deletedAny = false;
  try {
    const res = await authFetch(`/api/admin/users/${encodeURIComponent(userKey)}`, {
      method: 'DELETE',
    });
    if (res.ok) deletedAny = true;
  } catch {}
  try {
    const userDocRef = doc(db, 'users', userKey);
    await deleteDoc(userDocRef);
    deletedAny = true;
  } catch {}
  return deletedAny;
}

export interface LeaderboardUserEntry {
  uid: string;
  name: string;
  photoUrl: string;
  lifetimeTotalCount: number;
  todayCount: number;
  lastActive: string;
}

export async function getZikrLeaderboard(): Promise<LeaderboardUserEntry[]> {
  try {
    const usersCollRef = collection(db, 'users');
    const snapshot = await getDocs(usersCollRef);
    const entries: LeaderboardUserEntry[] = [];
    const todayKey = new Date().toISOString().split('T')[0];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const name = data.name || (data.email ? data.email.split('@')[0] : 'Zikr+ User');
      const photoUrl = data.photoUrl || '';
      const lifetimeTotalCount = typeof data.lifetimeTotalCount === 'number'
        ? data.lifetimeTotalCount
        : (typeof data.totalCount === 'number' ? data.totalCount : 0);
      
      let todayCount = 0;
      if (data.aamalLogsJson) {
        try {
          const parsedAamal = JSON.parse(data.aamalLogsJson);
          if (parsedAamal && parsedAamal[todayKey]) {
            todayCount = parsedAamal[todayKey].dhikrCount || 0;
          }
        } catch {}
      }

      entries.push({
        uid: docSnap.id,
        name,
        photoUrl,
        lifetimeTotalCount,
        todayCount,
        lastActive: data.updatedAt || '',
      });
    });

    entries.sort((a, b) => b.lifetimeTotalCount - a.lifetimeTotalCount);
    return entries;
  } catch (err) {
    console.warn('Failed to fetch leaderboard from Firestore:', err);
    return [];
  }
}

// ============================================================================
// MISSING INFO REQUESTS (AI CHATBOT -> FIRESTORE + SERVER ADMIN INBOX)
// ============================================================================
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid ?? null,
      email: auth?.currentUser?.email ?? null,
      emailVerified: auth?.currentUser?.emailVerified ?? null,
      isAnonymous: auth?.currentUser?.isAnonymous ?? null,
      tenantId: auth?.currentUser?.tenantId ?? null,
      providerInfo:
        auth?.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export interface InfoRequestRecord {
  id: string;
  question: string;
  pageModule: string;
  pageTitle: string;
  userNote: string;
  senderName: string;
  senderContact: string;
  senderKey: string;
  language: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAtMs: number;
  updatedAtMs: number;
}

export async function submitMissingInfoRequest(input: {
  question: string;
  pageModule: string;
  pageTitle: string;
  userNote?: string;
  senderName?: string;
  senderContact?: string;
  senderKey?: string;
  language?: string;
}): Promise<{ success: boolean; record: InfoRequestRecord; cloudSaved: boolean }> {
  const now = Date.now();
  const id = `req_${now}_${Math.random().toString(36).slice(2, 8)}`;

  const record: InfoRequestRecord = {
    id,
    question: input.question.trim().slice(0, 2000),
    pageModule: (input.pageModule || 'other').trim().slice(0, 100),
    pageTitle: (input.pageTitle || 'Zikr+ App').trim().slice(0, 300),
    userNote: (input.userNote || '').trim().slice(0, 2000),
    senderName: (input.senderName || 'Zikr+ User').trim().slice(0, 120),
    senderContact: (input.senderContact || '').trim().slice(0, 200),
    senderKey: (input.senderKey || 'guest').trim().slice(0, 128),
    language: (input.language || 'bn').trim().slice(0, 16),
    status: 'pending',
    createdAtMs: now,
    updatedAtMs: now,
  };

  let cloudSaved = false;
  let serverSaved = false;

  // 1. Save to server store (reliable across guest & custom sessions)
  try {
    const res = await fetch('/api/info-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
    if (res.ok) serverSaved = true;
  } catch (err) {
    console.warn('Server info-request save notice:', err);
  }

  // 2. Save to Firestore /info_requests/{id}
  if (typeof navigator === 'undefined' || navigator.onLine) {
    const targetPath = `info_requests/${id}`;
    try {
      await setDoc(doc(db, 'info_requests', id), record);
      cloudSaved = true;
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.CREATE, targetPath);
      } catch (loggedErr) {
        if (!serverSaved) {
          throw loggedErr;
        }
      }
    }
  }

  return {
    success: serverSaved || cloudSaved,
    record,
    cloudSaved,
  };
}

export async function fetchInfoRequestsForAdmin(adminEmail: string): Promise<InfoRequestRecord[]> {
  const map = new Map<string, InfoRequestRecord>();

  // 1. Fetch from authenticated server API
  try {
    const res = await authFetch('/api/admin/info-requests', {
      headers: { 'X-Admin-Email': adminEmail },
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.requests)) {
        data.requests.forEach((r: InfoRequestRecord) => {
          if (r && r.id) map.set(r.id, r);
        });
      }
    }
  } catch (err) {
    console.warn('Server admin info-requests fetch notice:', err);
  }

  // 2. Merge with Firestore if signed in with Firebase Admin email
  if (auth?.currentUser?.email?.toLowerCase() === 'mdmursalineparvez@gmail.com') {
    const colPath = 'info_requests';
    try {
      const snap = await getDocsFromServer(collection(db, colPath));
      snap.forEach((d) => {
        const item = d.data() as InfoRequestRecord;
        if (item && item.id) {
          const existing = map.get(item.id);
          if (!existing || (item.updatedAtMs || 0) >= (existing.updatedAtMs || 0)) {
            map.set(item.id, item);
          }
        }
      });
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.LIST, colPath);
      } catch {}
    }
  }

  return Array.from(map.values()).sort((a, b) => (b.createdAtMs || 0) - (a.createdAtMs || 0));
}

export async function updateInfoRequestStatusForAdmin(
  id: string,
  status: 'pending' | 'reviewed' | 'resolved',
  adminEmail: string
): Promise<boolean> {
  let ok = false;
  try {
    const res = await authFetch(`/api/admin/info-requests/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Email': adminEmail,
      },
      body: JSON.stringify({ status }),
    });
    if (res.ok) ok = true;
  } catch {}

  if (auth?.currentUser?.email?.toLowerCase() === 'mdmursalineparvez@gmail.com') {
    const targetPath = `info_requests/${id}`;
    try {
      await updateDoc(doc(db, 'info_requests', id), {
        status,
        updatedAtMs: Date.now(),
      });
      ok = true;
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.UPDATE, targetPath);
      } catch {}
    }
  }

  return ok;
}

export async function deleteInfoRequestForAdmin(
  id: string,
  adminEmail: string
): Promise<boolean> {
  let ok = false;
  try {
    const res = await authFetch(`/api/admin/info-requests/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: { 'X-Admin-Email': adminEmail },
    });
    if (res.ok) ok = true;
  } catch {}

  if (auth?.currentUser?.email?.toLowerCase() === 'mdmursalineparvez@gmail.com') {
    const targetPath = `info_requests/${id}`;
    try {
      await deleteDoc(doc(db, 'info_requests', id));
      ok = true;
    } catch (error) {
      try {
        handleFirestoreError(error, OperationType.DELETE, targetPath);
      } catch {}
    }
  }

  return ok;
}

