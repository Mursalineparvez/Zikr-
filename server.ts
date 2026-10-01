import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

const USERS_STORE_FILE = path.join(process.cwd(), 'users_registry_store.json');

function loadServerUsers(): Record<string, any> {
  try {
    if (fs.existsSync(USERS_STORE_FILE)) {
      const content = fs.readFileSync(USERS_STORE_FILE, 'utf8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.warn('Failed reading users_registry_store.json:', err);
  }
  return {};
}

function saveServerUsers(data: Record<string, any>) {
  try {
    fs.writeFileSync(USERS_STORE_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed writing users_registry_store.json:', err);
  }
}

// Pre-seed known users from Firestore if store does not exist
if (!fs.existsSync(USERS_STORE_FILE)) {
  const initialSeed: Record<string, any> = {
    u_mdmursalineparvez_gmail_com: {
      userKey: 'u_mdmursalineparvez_gmail_com',
      name: 'Md. Mursaline Parvez',
      email: 'mdmursalineparvez@gmail.com',
      emailOrPhone: 'mdmursalineparvez@gmail.com',
      phone: '',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      location: 'Dhaka, Bangladesh',
      deviceModel: 'Android Phone / Desktop',
      osVersion: 'Android / Windows',
      verificationMethod: 'Google Sign-In',
      lastSyncedAt: Date.now(),
      createdAtMs: Date.now() - 172800000,
      lifetimeTotalCount: 895,
      activeZikrs: [],
      hasPassword: true,
    },
    u_karim_gmail_com: {
      userKey: 'u_karim_gmail_com',
      name: 'Rahim',
      email: 'karim@gmail.com',
      emailOrPhone: 'karim@gmail.com',
      phone: '',
      photoUrl: '',
      location: 'Bangladesh',
      deviceModel: 'Android Phone',
      osVersion: 'Android',
      verificationMethod: 'Google Sign-In',
      lastSyncedAt: Date.now() - 7200000,
      createdAtMs: Date.now() - 86400000,
      lifetimeTotalCount: 150,
      activeZikrs: [],
      hasPassword: true,
    },
    u_mdmursalineparvezpersonal_gmail_com: {
      userKey: 'u_mdmursalineparvezpersonal_gmail_com',
      name: 'mdmursalineparvezpersonal',
      email: 'mdmursalineparvezpersonal@gmail.com',
      emailOrPhone: 'mdmursalineparvezpersonal@gmail.com',
      phone: '',
      photoUrl: '',
      location: 'Bangladesh',
      deviceModel: 'Android Phone',
      osVersion: 'Android',
      verificationMethod: 'Google Sign-In',
      lastSyncedAt: Date.now() - 14400000,
      createdAtMs: Date.now() - 172800000,
      lifetimeTotalCount: 33,
      activeZikrs: [],
      hasPassword: true,
    },
    u_mursalineparvez_gmail_com: {
      userKey: 'u_mursalineparvez_gmail_com',
      name: 'Parvez',
      email: 'mursalineparvez@gmail.com',
      emailOrPhone: 'mursalineparvez@gmail.com',
      phone: '',
      photoUrl: '',
      location: 'Bangladesh',
      deviceModel: 'Android Phone',
      osVersion: 'Android',
      verificationMethod: 'Google Sign-In',
      lastSyncedAt: Date.now() - 28800000,
      createdAtMs: Date.now() - 172800000,
      lifetimeTotalCount: 99,
      activeZikrs: [],
      hasPassword: true,
    },
  };
  saveServerUsers(initialSeed);
}

// 1. POST /api/sync-user: Registers or updates any user instantly across all devices
app.post('/api/sync-user', (req, res) => {
  try {
    const { userKey, profile, zikrs, lifetimeTotalCount } = req.body;
    if (!userKey) {
      return res.status(400).json({ error: 'Missing userKey' });
    }

    const currentUsers = loadServerUsers();
    const rawEmail = (profile?.emailOrPhone || profile?.email || '').toLowerCase().trim();
    const displayName = profile?.name || (rawEmail.includes('@') ? rawEmail.split('@')[0] : 'User');
    const existing = currentUsers[userKey] || {};

    const cleanUser = {
      ...existing,
      userKey,
      name: displayName,
      email: rawEmail.includes('@') ? rawEmail : existing.email || '',
      phone: !rawEmail.includes('@') ? rawEmail : existing.phone || '',
      emailOrPhone: rawEmail || existing.emailOrPhone || '',
      photoUrl: profile?.photoUrl || existing.photoUrl || '',
      location: profile?.location || existing.location || 'Dhaka, Bangladesh',
      deviceModel: profile?.deviceModel || existing.deviceModel || 'Mobile Device',
      osVersion: profile?.osVersion || existing.osVersion || 'Android',
      verificationMethod:
        profile?.authProvider === 'google' || rawEmail.endsWith('@gmail.com')
          ? 'Google Sign-In'
          : profile?.verificationMethod || existing.verificationMethod || 'Verified Account',
      lastSyncedAt: Date.now(),
      createdAtMs: existing.createdAtMs || Date.now(),
      lifetimeTotalCount:
        typeof lifetimeTotalCount === 'number' ? lifetimeTotalCount : existing.lifetimeTotalCount || 0,
      activeZikrs: Array.isArray(zikrs) ? zikrs : existing.activeZikrs || [],
      hasPassword: !!(profile?.password || existing.hasPassword),
    };

    currentUsers[userKey] = cleanUser;
    saveServerUsers(currentUsers);

    console.log(`[API /api/sync-user] Registered/Updated user: ${rawEmail || userKey} (${cleanUser.deviceModel})`);
    return res.json({ success: true, user: cleanUser });
  } catch (err: any) {
    console.error('Error in /api/sync-user:', err);
    return res.status(500).json({ error: err?.message || 'Server error' });
  }
});

// 2. GET /api/admin/users: Returns all registered users for Admin Dashboard
app.get('/api/admin/users', (req, res) => {
  try {
    const currentUsers = loadServerUsers();
    const list = Object.values(currentUsers).sort(
      (a: any, b: any) => (b.lastSyncedAt || 0) - (a.lastSyncedAt || 0)
    );
    return res.json({ users: list });
  } catch (err: any) {
    console.error('Error in /api/admin/users:', err);
    return res.status(500).json({ error: err?.message || 'Server error' });
  }
});

// 3. DELETE /api/admin/users/:userKey: Remove a user from registry
app.delete('/api/admin/users/:userKey', (req, res) => {
  try {
    const { userKey } = req.params;
    const currentUsers = loadServerUsers();
    if (currentUsers[userKey]) {
      delete currentUsers[userKey];
      saveServerUsers(currentUsers);
      return res.json({ success: true });
    }
    return res.status(404).json({ error: 'User not found' });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Server error' });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ZikrMate server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
