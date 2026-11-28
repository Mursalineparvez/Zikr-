/**
 * Frontend Session & Auth Client Service
 *
 * Implements the normalized Session Authentication Architecture:
 * - Holds an optional fallback Bearer sessionToken strictly in JS memory
 *   (NEVER persisted to localStorage or sessionStorage).
 * - Sends `credentials: 'include'` on every request so the HttpOnly, Secure,
 *   SameSite=None; Partitioned session cookie (`zikr_sid`) is automatically attached.
 * - Sends `X-Requested-With: ZikrPlus` CSRF protection header on state-changing requests.
 */

export interface ServerPublicUser {
  id: string;
  name: string;
  email: string;
  auth_provider: 'email' | 'google';
  email_verified: boolean;
  role: 'user' | 'admin';
  has_password: boolean;
  created_at: string;
}

export interface ServerProfileRecord {
  user_id: string;
  photo: string;
  phone: string;
  preferences: {
    location?: string;
    gender?: string;
    dob?: string;
    language?: string;
    themeMode?: string;
    theme?: string;
    voiceGender?: string;
    [key: string]: any;
  };
  updated_at: string;
}

export interface ServerUserDataRecord {
  user_id: string;
  saved_items: {
    zikrs: any[];
    historySessions: any[];
    libraryHighlights: any[];
  };
  settings: Record<string, any>;
  activity: {
    lifetimeTotalCount: number;
    aamalLogs: Record<string, any>;
    lastSyncedAt: number;
  };
  updated_at: string;
}

export interface ServerSessionInfo {
  id: string;
  user_id: string;
  expires_at: string;
  device: string;
  created_at: string;
  last_seen_at: string;
  is_current?: boolean;
}

export interface ServerAuthResponse {
  authenticated: boolean;
  user?: ServerPublicUser;
  profile?: ServerProfileRecord;
  userData?: ServerUserDataRecord;
  session?: ServerSessionInfo;
  sessionToken?: string;
  error?: string;
  errorCode?: string;
}

// Strictly held in JS module RAM only (never written to Web Storage)
let inMemorySessionToken: string | null = null;

export function getInMemorySessionToken(): string | null {
  return inMemorySessionToken;
}

export function setInMemorySessionToken(token: string | null): void {
  inMemorySessionToken = token && token.trim() ? token.trim() : null;
}

export function clearInMemorySessionToken(): void {
  inMemorySessionToken = null;
}

export async function authFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const headers = new Headers(init.headers || {});
  if (!headers.has('X-Requested-With')) {
    headers.set('X-Requested-With', 'ZikrPlus');
  }
  if (inMemorySessionToken && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${inMemorySessionToken}`);
  }
  return fetch(input, {
    ...init,
    credentials: 'include',
    headers,
  });
}

export async function restoreServerSession(): Promise<ServerAuthResponse> {
  try {
    const res = await authFetch('/api/auth/session', { method: 'GET' });
    if (!res.ok) {
      return { authenticated: false };
    }
    const data = (await res.json()) as ServerAuthResponse;
    if (!data?.authenticated) {
      return { authenticated: false };
    }
    return data;
  } catch {
    return { authenticated: false };
  }
}

const STATIC_BACKEND_UNAVAILABLE_MSG =
  'এই ডোমেইনে ইমেইল লগইন সার্ভার (/api) চালু নেই। পূর্ণ অ্যাপ লিংক থেকে লগইন করুন অথবা Firebase Console-এ ডোমেইন যোগ করে গুগল দিয়ে চালিয়ে যান।';

async function parseAuthResponse(res: Response, fallbackError: string): Promise<ServerAuthResponse> {
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('application/json')) {
    const parsed = (await res.json().catch(() => null)) as ServerAuthResponse | null;
    if (parsed && typeof parsed === 'object') {
      return parsed;
    }
  }
  if (res.status === 404) {
    return {
      authenticated: false,
      errorCode: 'BACKEND_API_UNAVAILABLE',
      error: STATIC_BACKEND_UNAVAILABLE_MSG,
    };
  }
  return { authenticated: false, error: fallbackError };
}

export async function signupWithEmailSession(payload: {
  name?: string;
  email: string;
  password: string;
  phone?: string;
  photo?: string;
  preferences?: Record<string, any>;
  device?: string;
}): Promise<{ ok: boolean; status: number; data: ServerAuthResponse }> {
  try {
    const res = await authFetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await parseAuthResponse(res, 'অ্যাকাউন্ট তৈরি করা যায়নি।');
    if (res.ok && data.sessionToken) {
      setInMemorySessionToken(data.sessionToken);
    }
    return { ok: res.ok, status: res.status, data };
  } catch (err: any) {
    return {
      ok: false,
      status: 0,
      data: { authenticated: false, error: err?.message || 'Network error during signup' },
    };
  }
}

export async function loginWithEmailSession(payload: {
  email: string;
  password: string;
  device?: string;
}): Promise<{ ok: boolean; status: number; data: ServerAuthResponse }> {
  try {
    const res = await authFetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await parseAuthResponse(res, 'ইমেইল বা পাসওয়ার্ড সঠিক নয়।');
    if (res.ok && data.sessionToken) {
      setInMemorySessionToken(data.sessionToken);
    }
    return { ok: res.ok, status: res.status, data };
  } catch (err: any) {
    return {
      ok: false,
      status: 0,
      data: { authenticated: false, error: err?.message || 'Network error during login' },
    };
  }
}

export async function loginWithGoogleTokenSession(payload: {
  idToken: string;
  device?: string;
  location?: string;
}): Promise<{ ok: boolean; status: number; data: ServerAuthResponse }> {
  try {
    const res = await authFetch('/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await parseAuthResponse(res, 'Google sign-in session could not be created.');
    if (res.ok && data.sessionToken) {
      setInMemorySessionToken(data.sessionToken);
    }
    return { ok: res.ok, status: res.status, data };
  } catch (err: any) {
    return {
      ok: false,
      status: 0,
      data: { authenticated: false, error: err?.message || 'Network error during Google sign-in' },
    };
  }
}

export async function sendServerEmailOtp(payload: {
  email: string;
  purpose?: 'login' | 'signup' | 'reset';
}): Promise<{ ok: boolean; maskedTarget?: string; message?: string; error?: string; errorCode?: string }> {
  try {
    const res = await authFetch('/api/auth/otp/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.status === 404) {
      return {
        ok: false,
        errorCode: 'BACKEND_API_UNAVAILABLE',
        error: STATIC_BACKEND_UNAVAILABLE_MSG,
      };
    }
    const data = await res.json().catch(() => ({}));
    return {
      ok: res.ok,
      maskedTarget: data?.maskedTarget,
      message: data?.message,
      error: data?.error,
      errorCode: data?.errorCode,
    };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Network error while sending OTP' };
  }
}

export async function verifyServerEmailOtp(payload: {
  email: string;
  code: string;
  name?: string;
  device?: string;
  location?: string;
}): Promise<{ ok: boolean; status: number; data: ServerAuthResponse }> {
  try {
    const res = await authFetch('/api/auth/otp/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await parseAuthResponse(res, 'OTP verification failed.');
    if (res.ok && data.sessionToken) {
      setInMemorySessionToken(data.sessionToken);
    }
    return { ok: res.ok, status: res.status, data };
  } catch (err: any) {
    return {
      ok: false,
      status: 0,
      data: { authenticated: false, error: err?.message || 'Network error during OTP verification' },
    };
  }
}

export async function logoutServerSession(): Promise<boolean> {
  try {
    await authFetch('/api/auth/logout', { method: 'POST' });
  } catch {
    // Ignore network failures during logout
  } finally {
    clearInMemorySessionToken();
  }
  return true;
}

export async function fetchActiveDeviceSessions(): Promise<ServerSessionInfo[]> {
  try {
    const res = await authFetch('/api/auth/sessions', { method: 'GET' });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.sessions) ? data.sessions : [];
  } catch {
    return [];
  }
}

export async function revokeDeviceSession(sessionId: string): Promise<boolean> {
  try {
    const res = await authFetch(`/api/auth/sessions/${encodeURIComponent(sessionId)}`, {
      method: 'DELETE',
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function setServerAccountPassword(payload: {
  currentPassword?: string;
  newPassword: string;
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await authFetch('/api/auth/set-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, error: data?.error };
  } catch (err: any) {
    return { ok: false, error: err?.message || 'Failed updating password' };
  }
}

export async function saveServerProfile(payload: {
  name?: string;
  photo?: string;
  phone?: string;
  preferences?: Record<string, any>;
}): Promise<{ ok: boolean; user?: ServerPublicUser; profile?: ServerProfileRecord }> {
  try {
    const res = await authFetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { ok: false };
    const data = await res.json();
    return { ok: true, user: data.user, profile: data.profile };
  } catch {
    return { ok: false };
  }
}

export async function loadServerUserData(): Promise<ServerUserDataRecord | null> {
  try {
    const res = await authFetch('/api/user-data', { method: 'GET' });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.userData || null;
  } catch {
    return null;
  }
}

export async function saveServerUserData(payload: {
  saved_items?: {
    zikrs?: any[];
    historySessions?: any[];
    libraryHighlights?: any[];
  };
  settings?: Record<string, any>;
  activity?: {
    lifetimeTotalCount?: number;
    aamalLogs?: Record<string, any>;
  };
}): Promise<{ ok: boolean; userData?: ServerUserDataRecord }> {
  try {
    const res = await authFetch('/api/user-data', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return { ok: false };
    const data = await res.json();
    return { ok: true, userData: data.userData };
  } catch {
    return { ok: false };
  }
}
