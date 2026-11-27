import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface DbUser {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  auth_provider: 'email' | 'google';
  email_verified: boolean;
  role: 'admin' | 'user';
  created_at: string;
}

export interface DbProfile {
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
  };
  updated_at: string;
}

export interface DbSession {
  id: string;
  user_id: string;
  session_token_hash: string;
  expires_at: number;
  device: string;
  created_at: string;
  last_seen_at: string;
}

export interface DbUserData {
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

export interface NormalizedDatabase {
  users: Record<string, DbUser>;
  profiles: Record<string, DbProfile>;
  sessions: Record<string, DbSession>;
  user_data: Record<string, DbUserData>;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'app_database.json');
const LEGACY_USERS_FILE = path.join(process.cwd(), 'users_registry_store.json');
const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
const SUPER_ADMIN_EMAIL = 'mdmursalineparvez@gmail.com';

export function sanitizeUserId(identifier: string): string {
  const clean = (identifier || '').toLowerCase().trim();
  if (!clean) return `usr_${crypto.randomBytes(8).toString('hex')}`;
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

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${derived}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  if (!storedHash || !password) return false;
  const parts = storedHash.split('$');
  if (parts.length !== 3 || parts[0] !== 'scrypt') return false;
  const [, salt, hexDigest] = parts;
  if (!salt || !hexDigest) return false;
  try {
    const derived = crypto.scryptSync(password, salt, 64);
    const expected = Buffer.from(hexDigest, 'hex');
    if (derived.length !== expected.length) return false;
    return crypto.timingSafeEqual(derived, expected);
  } catch {
    return false;
  }
}

export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export function hashSessionToken(rawToken: string): string {
  return crypto.createHash('sha256').update(rawToken).digest('hex');
}

let dbCache: NormalizedDatabase | null = null;

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function emptyDb(): NormalizedDatabase {
  return {
    users: {},
    profiles: {},
    sessions: {},
    user_data: {},
  };
}

function persistDb(db: NormalizedDatabase) {
  try {
    ensureDataDir();
    const tmpFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tmpFile, JSON.stringify(db, null, 2), 'utf8');
    fs.renameSync(tmpFile, DB_FILE);
  } catch (err) {
    console.error('[Database] Failed persisting app_database.json:', err);
  }
}

function migrateLegacyUsersIntoDb(db: NormalizedDatabase): boolean {
  let changed = false;
  try {
    if (!fs.existsSync(LEGACY_USERS_FILE)) return false;
    const raw = JSON.parse(fs.readFileSync(LEGACY_USERS_FILE, 'utf8'));
    if (!raw || typeof raw !== 'object') return false;

    for (const [legacyKey, entry] of Object.entries<any>(raw)) {
      if (!entry || typeof entry !== 'object') continue;
      const email = String(entry.email || entry.emailOrPhone || '').toLowerCase().trim();
      const userId = legacyKey || sanitizeUserId(email);
      if (!userId || userId.startsWith('guest_')) continue;

      if (!db.users[userId]) {
        const legacyPlainPass = typeof entry.password === 'string' ? entry.password.trim() : '';
        db.users[userId] = {
          id: userId,
          name: String(entry.name || (email ? email.split('@')[0] : 'Zikr+ User')),
          email,
          password_hash: legacyPlainPass ? hashPassword(legacyPlainPass) : '',
          auth_provider: String(entry.verificationMethod || '').toLowerCase().includes('google') ? 'google' : 'email',
          email_verified: true,
          role: email === SUPER_ADMIN_EMAIL ? 'admin' : 'user',
          created_at: entry.createdAtMs ? new Date(entry.createdAtMs).toISOString() : new Date().toISOString(),
        };
        changed = true;
      }

      if (!db.profiles[userId]) {
        db.profiles[userId] = {
          user_id: userId,
          photo: String(entry.photoUrl || ''),
          phone: String(entry.phone || ''),
          preferences: {
            location: String(entry.location || 'Dhaka, Bangladesh'),
          },
          updated_at: new Date(entry.lastSyncedAt || Date.now()).toISOString(),
        };
        changed = true;
      }

      if (!db.user_data[userId]) {
        db.user_data[userId] = {
          user_id: userId,
          saved_items: {
            zikrs: Array.isArray(entry.activeZikrs) ? entry.activeZikrs : [],
            historySessions: Array.isArray(entry.historySessions) ? entry.historySessions : [],
            libraryHighlights: [],
          },
          settings: entry.settings && typeof entry.settings === 'object' ? entry.settings : {},
          activity: {
            lifetimeTotalCount: typeof entry.lifetimeTotalCount === 'number' ? entry.lifetimeTotalCount : 0,
            aamalLogs: entry.aamalLogs && typeof entry.aamalLogs === 'object' ? entry.aamalLogs : {},
            lastSyncedAt: typeof entry.lastSyncedAt === 'number' ? entry.lastSyncedAt : Date.now(),
          },
          updated_at: new Date(entry.lastSyncedAt || Date.now()).toISOString(),
        };
        changed = true;
      }
    }
  } catch (err) {
    console.warn('[Database] Legacy migration notice:', err);
  }
  return changed;
}

export function getDatabase(): NormalizedDatabase {
  if (dbCache) return dbCache;

  let loaded = emptyDb();
  let migrated = false;
  try {
    if (fs.existsSync(DB_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
      loaded = {
        users: parsed?.users && typeof parsed.users === 'object' ? parsed.users : {},
        profiles: parsed?.profiles && typeof parsed.profiles === 'object' ? parsed.profiles : {},
        sessions: parsed?.sessions && typeof parsed.sessions === 'object' ? parsed.sessions : {},
        user_data: parsed?.user_data && typeof parsed.user_data === 'object' ? parsed.user_data : {},
      };
    }
  } catch (err) {
    console.warn('[Database] Initializing fresh database:', err);
  }

  migrated = migrateLegacyUsersIntoDb(loaded);

  // Prune expired sessions on load
  const now = Date.now();
  for (const [sid, sess] of Object.entries(loaded.sessions)) {
    if (!sess || sess.expires_at <= now) {
      delete loaded.sessions[sid];
      migrated = true;
    }
  }

  dbCache = loaded;
  if (migrated || !fs.existsSync(DB_FILE)) {
    persistDb(dbCache);
  }
  return dbCache;
}

export function saveDatabase() {
  if (dbCache) {
    persistDb(dbCache);
  }
}

export function findUserByEmail(email: string): DbUser | null {
  const clean = (email || '').toLowerCase().trim();
  if (!clean) return null;
  const db = getDatabase();
  const byId = db.users[sanitizeUserId(clean)];
  if (byId && byId.email.toLowerCase().trim() === clean) return byId;
  for (const user of Object.values(db.users)) {
    if (user.email.toLowerCase().trim() === clean) return user;
  }
  return null;
}

export function ensureUserBundle(userId: string) {
  const db = getDatabase();
  const nowIso = new Date().toISOString();
  const user = db.users[userId];
  if (!user) return null;

  if (!db.profiles[userId]) {
    db.profiles[userId] = {
      user_id: userId,
      photo: '',
      phone: '',
      preferences: { location: 'Dhaka, Bangladesh' },
      updated_at: nowIso,
    };
  }
  if (!db.user_data[userId]) {
    db.user_data[userId] = {
      user_id: userId,
      saved_items: {
        zikrs: [],
        historySessions: [],
        libraryHighlights: [],
      },
      settings: {},
      activity: {
        lifetimeTotalCount: 0,
        aamalLogs: {},
        lastSyncedAt: Date.now(),
      },
      updated_at: nowIso,
    };
  }
  return {
    user,
    profile: db.profiles[userId],
    userData: db.user_data[userId],
  };
}

export function createUserAccount(input: {
  name: string;
  email: string;
  password?: string;
  auth_provider: 'email' | 'google';
  email_verified?: boolean;
  photo?: string;
  phone?: string;
  preferences?: DbProfile['preferences'];
}) {
  const db = getDatabase();
  const emailClean = input.email.toLowerCase().trim();
  const userId = sanitizeUserId(emailClean);
  const nowIso = new Date().toISOString();

  const user: DbUser = {
    id: userId,
    name: input.name.trim() || emailClean.split('@')[0] || 'Zikr+ User',
    email: emailClean,
    password_hash: input.password ? hashPassword(input.password) : '',
    auth_provider: input.auth_provider,
    email_verified: input.email_verified ?? input.auth_provider === 'google',
    role: emailClean === SUPER_ADMIN_EMAIL ? 'admin' : 'user',
    created_at: nowIso,
  };

  const profile: DbProfile = {
    user_id: userId,
    photo: input.photo || '',
    phone: input.phone || '',
    preferences: {
      location: 'Dhaka, Bangladesh',
      ...(input.preferences || {}),
    },
    updated_at: nowIso,
  };

  const userData: DbUserData = {
    user_id: userId,
    saved_items: {
      zikrs: [],
      historySessions: [],
      libraryHighlights: [],
    },
    settings: {},
    activity: {
      lifetimeTotalCount: 0,
      aamalLogs: {},
      lastSyncedAt: Date.now(),
    },
    updated_at: nowIso,
  };

  db.users[userId] = user;
  db.profiles[userId] = profile;
  db.user_data[userId] = userData;
  saveDatabase();
  return { user, profile, userData };
}

export function createSessionForUser(userId: string, device: string = 'Web Browser'): {
  rawToken: string;
  session: DbSession;
} {
  const db = getDatabase();
  const rawToken = generateSessionToken();
  const tokenHash = hashSessionToken(rawToken);
  const now = Date.now();
  const nowIso = new Date(now).toISOString();
  const sessionId = `sess_${crypto.randomBytes(12).toString('hex')}`;

  const session: DbSession = {
    id: sessionId,
    user_id: userId,
    session_token_hash: tokenHash,
    expires_at: now + SESSION_TTL_MS,
    device: (device || 'Web Browser').slice(0, 200),
    created_at: nowIso,
    last_seen_at: nowIso,
  };

  // Prune expired sessions for this user and cap active sessions per user at 10
  const userSessions = Object.values(db.sessions)
    .filter((s) => s.user_id === userId)
    .sort((a, b) => new Date(b.last_seen_at).getTime() - new Date(a.last_seen_at).getTime());

  for (const s of userSessions) {
    if (s.expires_at <= now) {
      delete db.sessions[s.id];
    }
  }
  const activeUserSessions = userSessions.filter((s) => s.expires_at > now);
  if (activeUserSessions.length >= 10) {
    for (const old of activeUserSessions.slice(9)) {
      delete db.sessions[old.id];
    }
  }

  db.sessions[sessionId] = session;
  saveDatabase();
  return { rawToken, session };
}

export function verifySessionByRawToken(rawToken: string): {
  user: DbUser;
  profile: DbProfile;
  userData: DbUserData;
  session: DbSession;
} | null {
  if (!rawToken || rawToken.length < 16) return null;
  const db = getDatabase();
  const tokenHash = hashSessionToken(rawToken);
  const now = Date.now();

  let matchedSession: DbSession | null = null;
  for (const sess of Object.values(db.sessions)) {
    if (sess.session_token_hash === tokenHash) {
      matchedSession = sess;
      break;
    }
  }

  if (!matchedSession) return null;
  if (matchedSession.expires_at <= now) {
    delete db.sessions[matchedSession.id];
    saveDatabase();
    return null;
  }

  const bundle = ensureUserBundle(matchedSession.user_id);
  if (!bundle) {
    delete db.sessions[matchedSession.id];
    saveDatabase();
    return null;
  }

  matchedSession.last_seen_at = new Date(now).toISOString();
  saveDatabase();
  return { ...bundle, session: matchedSession };
}

export function revokeSessionByRawToken(rawToken: string): boolean {
  if (!rawToken) return false;
  const db = getDatabase();
  const tokenHash = hashSessionToken(rawToken);
  let removed = false;
  for (const [sid, sess] of Object.entries(db.sessions)) {
    if (sess.session_token_hash === tokenHash) {
      delete db.sessions[sid];
      removed = true;
    }
  }
  if (removed) saveDatabase();
  return removed;
}

export function revokeSessionById(sessionId: string, userId: string): boolean {
  const db = getDatabase();
  const sess = db.sessions[sessionId];
  if (!sess || sess.user_id !== userId) return false;
  delete db.sessions[sessionId];
  saveDatabase();
  return true;
}

export function listSessionsForUser(userId: string, currentSessionId?: string) {
  const db = getDatabase();
  const now = Date.now();
  return Object.values(db.sessions)
    .filter((s) => s.user_id === userId && s.expires_at > now)
    .sort((a, b) => new Date(b.last_seen_at).getTime() - new Date(a.last_seen_at).getTime())
    .map((s) => ({
      id: s.id,
      user_id: s.user_id,
      device: s.device,
      expires_at: s.expires_at,
      created_at: s.created_at,
      last_seen_at: s.last_seen_at,
      is_current: s.id === currentSessionId,
      isCurrent: s.id === currentSessionId,
    }));
}

export function toPublicUser(user: DbUser) {
  const { password_hash: _ph, ...safe } = user;
  return {
    ...safe,
    has_password: Boolean(_ph),
    hasPassword: Boolean(_ph),
  };
}
