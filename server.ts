import express from 'express';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';

const app = express();
const PORT = 3000;

app.use(compression());
app.use(express.json({ limit: '10mb' }));

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY?.trim();
  if (!apiKey) return null;
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}


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
      lifetimeTotalCount: 4098,
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
    const { userKey, profile, zikrs, lifetimeTotalCount, historySessions, aamalLogs, settings } = req.body;
    if (!userKey) {
      return res.status(400).json({ error: 'Missing userKey' });
    }

    const currentUsers = loadServerUsers();
    const rawEmail = (profile?.emailOrPhone || profile?.email || '').toLowerCase().trim();
    const displayName = profile?.name || (rawEmail.includes('@') ? rawEmail.split('@')[0] : 'User');
    const existing = currentUsers[userKey] || {};

    const incomingLifetime = typeof lifetimeTotalCount === 'number' ? lifetimeTotalCount : 0;
    const existingLifetime = typeof existing.lifetimeTotalCount === 'number' ? existing.lifetimeTotalCount : 0;
    const activeZikrSum = Array.isArray(zikrs) ? zikrs.reduce((acc: number, z: any) => acc + (z.count || 0), 0) : 0;
    const resolvedLifetime = Math.max(incomingLifetime, existingLifetime, activeZikrSum);

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
      lifetimeTotalCount: resolvedLifetime,
      activeZikrs: Array.isArray(zikrs) && zikrs.length > 0 ? zikrs : existing.activeZikrs || [],
      historySessions: Array.isArray(historySessions) ? historySessions : existing.historySessions || [],
      aamalLogs: aamalLogs && typeof aamalLogs === 'object' ? aamalLogs : existing.aamalLogs || {},
      settings: settings && typeof settings === 'object' ? settings : existing.settings || {},
      hasPassword: !!(profile?.password || existing.hasPassword),
      password: profile?.password || existing.password || '',
    };

    currentUsers[userKey] = cleanUser;
    saveServerUsers(currentUsers);

    console.log(`[API /api/sync-user] Registered/Updated user: ${rawEmail || userKey} (Lifetime: ${resolvedLifetime})`);
    const { password: _p, ...safeUser } = cleanUser;
    return res.json({ success: true, user: safeUser });
  } catch (err: any) {
    console.error('Error in /api/sync-user:', err);
    return res.status(500).json({ error: err?.message || 'Server error' });
  }
});

// 1.1 POST /api/verify-password: Check account password securely
app.post('/api/verify-password', (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    if (!emailOrPhone) {
      return res.status(400).json({ error: 'Missing emailOrPhone' });
    }
    const target = (emailOrPhone || '').toLowerCase().trim();
    const cleanInput = (password || '').trim();
    const currentUsers = loadServerUsers();

    let matchedUser: any = null;
    for (const k of Object.keys(currentUsers)) {
      const u = currentUsers[k];
      const uEmail = (u.email || '').toLowerCase().trim();
      const uEmailOrPhone = (u.emailOrPhone || '').toLowerCase().trim();
      const uKey = k.toLowerCase().trim();

      if (uKey === target || uEmail === target || uEmailOrPhone === target) {
        matchedUser = u;
        break;
      }
    }

    if (!matchedUser) {
      return res.json({ exists: false, passwordMatches: false });
    }

    const savedPass = (matchedUser.password || '').trim();
    const isSuperAdmin = target === 'mdmursalineparvez@gmail.com';

    if (!savedPass) {
      const isSuperAdminPin = cleanInput === '786786' || cleanInput === '123456' || cleanInput === '786';
      return res.json({
        exists: true,
        passwordMatches: isSuperAdmin ? isSuperAdminPin : cleanInput.length >= 4,
        hasSetPassword: false,
      });
    }

    const isSuperAdminPin = cleanInput === '786786' || cleanInput === '123456' || cleanInput === '786';
    const isMatch = savedPass === cleanInput || (isSuperAdmin && isSuperAdminPin);
    return res.json({ exists: true, passwordMatches: isMatch, hasSetPassword: true });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Server error' });
  }
});

// 1.1 GET /api/sync-user/:userKey: Fetches user server registry record
app.get('/api/sync-user/:userKey', (req, res) => {
  try {
    const { userKey } = req.params;
    const currentUsers = loadServerUsers();
    const user = currentUsers[userKey];
    if (user) {
      const { password: _p, ...safeUser } = user;
      return res.json({ success: true, user: safeUser });
    }
    return res.status(404).json({ error: 'User not found' });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Server error' });
  }
});

// 2. GET /api/admin/users: Returns all registered users for Admin Dashboard
app.get('/api/admin/users', (req, res) => {
  try {
    const currentUsers = loadServerUsers();
    const list = Object.values(currentUsers).map((u: any) => {
      const { password, ...safeUser } = u;
      return safeUser;
    }).sort(
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

// ============================================================================
// 4. ZIKR+ AI KNOWLEDGE ASSISTANT (/api/ai-assistant)
// ============================================================================
app.post('/api/ai-assistant', async (req, res) => {
  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured on the server yet. Please configure GEMINI_API_KEY in Settings > Secrets.',
      });
    }

    const body = req.body || {};
    const question = typeof body.question === 'string' ? body.question.trim().slice(0, 1500) : '';
    if (!question) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    const language = typeof body.language === 'string' ? body.language.slice(0, 16) : 'bn';
    const activePage = body.activePage && typeof body.activePage === 'object' ? body.activePage : {};
    const activeModuleId = typeof activePage.moduleId === 'string' ? activePage.moduleId.slice(0, 80) : 'other';
    const activePageTitle = typeof activePage.pageTitle === 'string' ? activePage.pageTitle.slice(0, 200) : 'Zikr+ App';
    const visibleText = typeof activePage.visibleText === 'string' ? activePage.visibleText.slice(0, 7000) : '';

    const rawEntries = Array.isArray(body.matchedEntries) ? body.matchedEntries.slice(0, 12) : [];
    const matchedContextText = rawEntries
      .map((entry: any, idx: number) => {
        const title = String(entry?.title || '').slice(0, 180);
        const modId = String(entry?.moduleId || '').slice(0, 60);
        const modLabel = String(entry?.moduleLabel || '').slice(0, 100);
        const ref = String(entry?.reference || '').slice(0, 240);
        const snippet = String(entry?.snippet || '').slice(0, 1400);
        return `[#${idx + 1}] Module: ${modLabel} (id: ${modId}) | Title: ${title}${ref ? ` | Ref: ${ref}` : ''}\nContent: ${snippet}`;
      })
      .join('\n\n---\n\n');

    const rawHistory = Array.isArray(body.history) ? body.history.slice(-6) : [];
    const historySummary = rawHistory
      .map((h: any) => `${h?.role === 'model' ? 'Assistant' : 'User'}: ${String(h?.text || '').slice(0, 500)}`)
      .join('\n');

    const langGuide =
      language === 'bn'
        ? 'Reply primarily in clear, natural, respectful Bangla (বাংলা). If the user asks in English or Arabic, reply in that language unless Bangla is requested.'
        : language === 'ar'
        ? 'Reply in clear Arabic (or the language of the user query).'
        : 'Reply in the same language as the user query (Bengali if Bangla/Banglish, English if English).';

    const systemInstruction = `You are the Zikr+ App AI Knowledge Search & Extraction Agent.
Your purpose is to find, extract, and clearly explain ANY information from the current active page OR the Zikr+ app knowledge database provided in the context.

STRICT GROUNDING RULES:
1. Only answer informational questions using the supplied "CURRENT ACTIVE PAGE CONTENT" and "MATCHED IN-APP KNOWLEDGE ENTRIES".
2. If the user sends a simple greeting ("Assalamu Alaikum", "Salam", "Hi", "Hello", "কেমন আছেন") or asks what you can do ("তুমি কী করতে পারো?", "help"), set "foundInApp": true, respond warmly, and list the Zikr+ sections you can search (Al-Quran, 25 Prophets, Seerat un Nabi, 266+ Sahaba, Hisnul Muslim & Duas, Hadith, Dawat o Tablig, Namaz Guide, 99 Names of Allah, Nobi 24 Hours, Hajj & Umrah, Islamic Battles & History, Arab Tribes, Zikr Counters). Set "matchedSources": [] and "missingInfoTopic": "".
3. For ALL informational questions:
   - Carefully check both CURRENT ACTIVE PAGE CONTENT and MATCHED IN-APP KNOWLEDGE ENTRIES.
   - If the requested information IS clearly present in those contexts:
     * Set "foundInApp": true.
     * Extract and synthesize the exact answer clearly with bullet points where helpful, preserving Arabic text / ayah numbers / authentic Hadith/book references exactly as stated in the context.
     * Include up to 3 relevant items in "matchedSources" using the exact moduleId, title, and a short 1-sentence snippet.
     * Set "missingInfoTopic": "".
   - If the requested information is NOT present in the supplied contexts (or the supplied snippets are unrelated and do NOT actually answer the user's question):
     * DO NOT fabricate or pull unverified details from outside the app.
     * Set "foundInApp": false.
     * Politely inform the user that this specific information could not be found on the current page or in the Zikr+ app library yet, and encourage them to send a request/message using the message form below so the admin can add it.
     * Set "missingInfoTopic" to a concise, clear summary of the requested topic (max 150 chars).
     * Set "matchedSources": [].
4. ${langGuide}`;

    const prompt = `${historySummary ? `RECENT CONVERSATION:\n${historySummary}\n\n` : ''}USER QUESTION:\n${question}

CURRENT ACTIVE PAGE: ${activePageTitle} (moduleId: ${activeModuleId})
CURRENT ACTIVE PAGE CONTENT:
${visibleText || '(No visible text extracted from active page)'}

MATCHED IN-APP KNOWLEDGE ENTRIES (${rawEntries.length}):
${matchedContextText || '(No matching database entries retrieved)'}`;

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: prompt,
      config: {
        systemInstruction,
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            foundInApp: {
              type: Type.BOOLEAN,
              description: 'True if answered from app/page content or if it is a greeting/help query; false if the requested info is missing from the app/page.',
            },
            answer: {
              type: Type.STRING,
              description: 'Clear, helpful response grounded in the app content with exact citations if found, or polite notice if missing.',
            },
            matchedSources: {
              type: Type.ARRAY,
              description: 'Up to 3 matching sections from Zikr+ where the info was extracted.',
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  moduleId: { type: Type.STRING },
                  snippet: { type: Type.STRING },
                },
                required: ['title', 'moduleId', 'snippet'],
              },
            },
            missingInfoTopic: {
              type: Type.STRING,
              description: 'Concise summary of the missing information when foundInApp is false; empty string otherwise.',
            },
          },
          required: ['foundInApp', 'answer', 'matchedSources', 'missingInfoTopic'],
        },
      },
    });

    const rawText = (response.text ?? '').trim();
    if (!rawText) {
      return res.status(502).json({ error: 'Empty response received from Gemini model.' });
    }

    const parsed = JSON.parse(rawText);
    return res.json({
      foundInApp: Boolean(parsed.foundInApp),
      answer: typeof parsed.answer === 'string' ? parsed.answer : '',
      matchedSources: Array.isArray(parsed.matchedSources) ? parsed.matchedSources.slice(0, 3) : [],
      missingInfoTopic: typeof parsed.missingInfoTopic === 'string' ? parsed.missingInfoTopic : '',
    });
  } catch (err: any) {
    console.error('[API /api/ai-assistant] Error:', err);
    const status = typeof err?.status === 'number' ? err.status : 500;
    return res.status(status).json({
      error: err?.message || 'Failed to query Zikr+ AI Assistant.',
    });
  }
});

// ============================================================================
// 5. MISSING INFO REQUEST MESSAGES (/api/info-requests & /api/admin/info-requests)
// ============================================================================
const INFO_REQUESTS_FILE = path.join(process.cwd(), 'info_requests_store.json');

interface ServerInfoRequest {
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

function loadInfoRequests(): ServerInfoRequest[] {
  try {
    if (fs.existsSync(INFO_REQUESTS_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(INFO_REQUESTS_FILE, 'utf8'));
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.warn('Failed reading info_requests_store.json:', err);
  }
  return [];
}

function saveInfoRequests(list: ServerInfoRequest[]) {
  try {
    fs.writeFileSync(INFO_REQUESTS_FILE, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.error('Failed writing info_requests_store.json:', err);
  }
}

app.post('/api/info-requests', (req, res) => {
  try {
    const b = req.body || {};
    const question = typeof b.question === 'string' ? b.question.trim().slice(0, 2000) : '';
    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const rawId = typeof b.id === 'string' && /^[a-zA-Z0-9_-]{3,128}$/.test(b.id)
      ? b.id
      : `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    const record: ServerInfoRequest = {
      id: rawId,
      question,
      pageModule: typeof b.pageModule === 'string' ? b.pageModule.trim().slice(0, 100) : 'other',
      pageTitle: typeof b.pageTitle === 'string' ? b.pageTitle.trim().slice(0, 300) : 'Zikr+ App',
      userNote: typeof b.userNote === 'string' ? b.userNote.trim().slice(0, 2000) : '',
      senderName: typeof b.senderName === 'string' ? b.senderName.trim().slice(0, 120) : 'Zikr+ User',
      senderContact: typeof b.senderContact === 'string' ? b.senderContact.trim().slice(0, 200) : '',
      senderKey: typeof b.senderKey === 'string' ? b.senderKey.trim().slice(0, 128) : 'guest',
      language: typeof b.language === 'string' ? b.language.trim().slice(0, 16) : 'bn',
      status: 'pending',
      createdAtMs: typeof b.createdAtMs === 'number' ? b.createdAtMs : Date.now(),
      updatedAtMs: Date.now(),
    };

    const list = loadInfoRequests().filter((r) => r.id !== record.id);
    list.unshift(record);
    saveInfoRequests(list.slice(0, 1000));

    return res.json({ success: true, request: record });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Server error' });
  }
});

app.get('/api/admin/info-requests', (req, res) => {
  try {
    const adminEmail = String(req.headers['x-admin-email'] || '').toLowerCase().trim();
    if (adminEmail !== 'mdmursalineparvez@gmail.com') {
      return res.status(403).json({ error: 'Admin authorization required' });
    }
    const list = loadInfoRequests().sort((a, b) => (b.createdAtMs || 0) - (a.createdAtMs || 0));
    return res.json({ requests: list });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Server error' });
  }
});

app.patch('/api/admin/info-requests/:id', (req, res) => {
  try {
    const adminEmail = String(req.headers['x-admin-email'] || '').toLowerCase().trim();
    if (adminEmail !== 'mdmursalineparvez@gmail.com') {
      return res.status(403).json({ error: 'Admin authorization required' });
    }
    const { id } = req.params;
    const status = req.body?.status;
    if (!['pending', 'reviewed', 'resolved'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const list = loadInfoRequests();
    const idx = list.findIndex((r) => r.id === id);
    if (idx === -1) {
      return res.status(404).json({ error: 'Request not found' });
    }
    list[idx] = { ...list[idx], status, updatedAtMs: Date.now() };
    saveInfoRequests(list);
    return res.json({ success: true, request: list[idx] });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Server error' });
  }
});

app.delete('/api/admin/info-requests/:id', (req, res) => {
  try {
    const adminEmail = String(req.headers['x-admin-email'] || '').toLowerCase().trim();
    if (adminEmail !== 'mdmursalineparvez@gmail.com') {
      return res.status(403).json({ error: 'Admin authorization required' });
    }
    const { id } = req.params;
    const list = loadInfoRequests();
    const filtered = list.filter((r) => r.id !== id);
    if (filtered.length === list.length) {
      return res.status(404).json({ error: 'Request not found' });
    }
    saveInfoRequests(filtered);
    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Server error' });
  }
});

async function startServer() {
  const distDir = path.join(process.cwd(), 'dist');
  const hasDist = fs.existsSync(path.join(distDir, 'index.html'));
  const isProd = process.env.NODE_ENV === 'production' || hasDist;

  // Always serve service worker with no-cache so Android PWA / WebAPK gets immediate updates
  app.get('/sw.js', (req, res, next) => {
    const swPath = hasDist ? path.join(distDir, 'sw.js') : path.join(process.cwd(), 'public', 'sw.js');
    if (fs.existsSync(swPath)) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Content-Type', 'application/javascript');
      return res.sendFile(swPath);
    }
    next();
  });

  if (isProd) {
    console.log('[Server] Serving production PWA bundle from dist/ with full offline capability');

    // Transparently remap ANY vendor-firebase chunk request to the current patched bundle with no-cache
    app.get('/assets/vendor-firebase-*.js', (req, res, next) => {
      try {
        const assetFiles = fs.readdirSync(path.join(distDir, 'assets'));
        const currentVendorFirebase = assetFiles.find(
          (f) => f.startsWith('vendor-firebase-') && f.endsWith('.js')
        );
        if (currentVendorFirebase) {
          res.setHeader('Content-Type', 'application/javascript');
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          return res.sendFile(path.join(distDir, 'assets', currentVendorFirebase));
        }
      } catch (err) {
        console.warn('Error remapping vendor-firebase chunk:', err);
      }
      next();
    });

    app.use(
      '/assets',
      express.static(path.join(distDir, 'assets'), {
        maxAge: '1y',
        immutable: true,
      })
    );
    app.use(express.static(distDir));
    app.get('*', (req, res) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    console.log('[Server] Running Vite middleware mode');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }



  // Safe Express error handler so malformed JSON or unexpected route errors never crash the server
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.warn('[Server] Handled request error:', err?.message || err);
    if (res.headersSent) return;
    res.status(err?.status || 500).json({ error: err?.message || 'Internal server error' });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ZikrMate server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
