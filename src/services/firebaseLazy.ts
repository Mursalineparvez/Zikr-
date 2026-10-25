// ========================================================
// Lazy-Loaded Firebase Bridge
// Defers loading the 635KB Firebase Auth + Firestore bundle
// until user explicitly logs in or syncs cloud data.
// ========================================================

import type { UserProfile, ZikrItem, HistorySession, AppSettings } from '../types';

let firebasePromise: Promise<typeof import('./firebase')> | null = null;

function loadFirebase() {
  if (!firebasePromise) {
    firebasePromise = import('./firebase');
  }
  return firebasePromise;
}

export async function saveUserDataToCloud(
  userKey: string,
  profile: UserProfile,
  zikrs: ZikrItem[],
  history: HistorySession[],
  lifetimeTotal: number,
  settings: AppSettings,
  aamalLogs?: Record<string, any>
): Promise<boolean> {
  try {
    const fb = await loadFirebase();
    return await fb.saveUserDataToCloud(userKey, profile, zikrs, history, lifetimeTotal, settings, aamalLogs);
  } catch (err) {
    console.warn('[FirebaseLazy] saveUserDataToCloud deferred error:', err);
    return false;
  }
}

export async function loadUserDataFromCloud(emailOrPhone: string) {
  try {
    const fb = await loadFirebase();
    return await fb.loadUserDataFromCloud(emailOrPhone);
  } catch (err) {
    console.warn('[FirebaseLazy] loadUserDataFromCloud error:', err);
    return null;
  }
}

export async function subscribeToUserDataInCloud(
  targetKey: string,
  onData: (data: any, isInitial: boolean) => void
): Promise<() => void> {
  try {
    const fb = await loadFirebase();
    return fb.subscribeToUserDataInCloud(targetKey, onData);
  } catch (err) {
    console.warn('[FirebaseLazy] subscribeToUserDataInCloud error:', err);
    return () => {};
  }
}

export async function updateDeviceTelemetry(userKey: string, detected: any): Promise<void> {
  try {
    const fb = await loadFirebase();
    await fb.updateDeviceTelemetry(userKey, detected);
  } catch {}
}

export async function checkGoogleRedirectResult(): Promise<{
  success: boolean;
  user?: { name: string; email: string; photoUrl: string; uid: string };
  error?: string;
} | null> {
  try {
    const fb = await loadFirebase();
    return await fb.checkGoogleRedirectResult();
  } catch {
    return null;
  }
}

export async function listenToAuthChanges(
  onUserChanged: (user: { email: string; name?: string; photoUrl?: string } | null) => void
): Promise<() => void> {
  try {
    const fb = await loadFirebase();
    return fb.listenToAuthChanges(onUserChanged);
  } catch {
    return () => {};
  }
}

export async function signOutFirebaseUser(): Promise<void> {
  try {
    const fb = await loadFirebase();
    if (fb.auth) {
      const { signOut } = await import('firebase/auth');
      await signOut(fb.auth);
    }
  } catch (err) {
    console.warn('[FirebaseLazy] signOut notice:', err);
  }
}
