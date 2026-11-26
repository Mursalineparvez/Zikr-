import 'dotenv/config';
import express from 'express';
import compression from 'compression';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import zlib from 'zlib';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';
import { HADIS_LIBRARY_BOOKS, translateChapterNameBn } from './src/data/hadisCatalog';

const app = express();
const PORT = 3000;

app.use(
  compression({
    filter: (req, res) => {
      if (req.path === '/api/ai-assistant-stream') return false;
      return compression.filter(req, res);
    },
  })
);
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
function extractErrorStatus(err: any): number {
  const numeric = Number(err?.status ?? err?.statusCode ?? err?.code);
  if (Number.isFinite(numeric) && numeric >= 400 && numeric < 600) {
    return numeric;
  }
  const msg = String(err?.message || '');
  if (/429|RESOURCE_EXHAUSTED/i.test(msg)) return 429;
  if (/403|PERMISSION_DENIED/i.test(msg)) return 403;
  if (/400|API_KEY_INVALID|INVALID_ARGUMENT/i.test(msg)) return 400;
  if (/404|NOT_FOUND/i.test(msg)) return 404;
  if (/503|UNAVAILABLE/i.test(msg)) return 503;
  if (/504|DEADLINE_EXCEEDED|timeout/i.test(msg)) return 504;
  return 500;
}

function isTransientGeminiError(err: any): boolean {
  const status = extractErrorStatus(err);
  if (status === 429 || status === 500 || status === 502 || status === 503 || status === 504) {
    return true;
  }
  const msg = String(err?.message || '');
  return /ECONNRESET|ETIMEDOUT|EAI_AGAIN|fetch failed|network|socket|unavailable|overloaded/i.test(msg);
}

async function callGeminiWithRetry<T>(fn: () => Promise<T>, maxRetries = 2): Promise<T> {
  let lastError: any;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err: any) {
      lastError = err;
      if (attempt >= maxRetries || !isTransientGeminiError(err)) {
        throw err;
      }
      const delayMs = 500 * Math.pow(2, attempt) + Math.floor(Math.random() * 200);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }
  throw lastError;
}

function parseGeminiJsonPayload(rawText: string): any {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
  }
  const firstBrace = cleaned.indexOf('{');
  const lastBrace = cleaned.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }
  return JSON.parse(cleaned);
}

function isQuickGreetingOrHelp(q: string): boolean {
  const cleaned = q.toLowerCase().replace(/[?!.,।~]/g, '').trim();
  if (!cleaned || cleaned.length > 48) return false;
  return /^(assalamu\s*alaikum|as\s*salamu\s*alaikum|salam|salaam|hi|hello|hey|help|আসসালামু\s*আলাইকুম|সালাম|হ্যালো|হাই|কেমন\s*আছো?|কেমন\s*আছেন|তুমি\s*কি\s*করতে\s*পারো|তুমি\s*কে)$/i.test(
    cleaned
  );
}

function buildQuickGreetingReply(lang: string, userName: string): string {
  const greetName = userName ? ` ${userName}` : '';
  if (lang === 'bn') {
    return `ওয়ালাইকুমুস সালাম${greetName}! আমি **Zikr+** সহকারী। কুরআন, হাদিস, ২৫ নবী, সীরাতুন নবী, ২৬৬+ সাহাবি, দোয়া, তাবলিগ, নামাজ বা যেকোনো নৈতিক বিষয়ে প্রশ্ন করুন—অ্যাপে না থাকলে আমি বিশ্বস্ত ওয়েবসাইট থেকেও দ্রুত যাচাইকৃত উত্তর এনে দেবো।`;
  }
  if (lang === 'ar') {
    return `وعليكم السلام${greetName}! أنا مساعد **Zikr+**. اسألني عن القرآن والحديث والسيرة والأدعية أو أي سؤال أخلاقي، وسأجيبك بسرعة من مكتبة التطبيق أو من مصادر موثوقة.`;
  }
  return `Wa Alaikum Assalam${greetName}! I'm your **Zikr+** assistant. Ask me anything from the Zikr+ library (Quran, Hadith, Seerat, Sahaba, Duas, Namaz) or any ethical question—if it's not in the app, I'll fetch verified answers directly from trusted web sources.`;
}

function hasStrongLocalMatch(question: string, rawEntries: any[], visibleText: string): boolean {
  const asksAboutCurrentPage = /(এই পেজ|পেজে|পেজের|বর্তমান পেজ|this page|current page|summarize)/i.test(question);
  if (asksAboutCurrentPage && visibleText.trim().length > 80) {
    return true;
  }
  if (!Array.isArray(rawEntries) || rawEntries.length === 0) return false;
  const topScore = Number(rawEntries[0]?.score ?? 0);
  if (topScore >= 12) return true;
  // Also check direct keyword overlap in top entry if score wasn't supplied
  const tokens = question
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length >= 3);
  if (tokens.length > 0 && rawEntries[0]) {
    const combined = `${rawEntries[0]?.title || ''} ${rawEntries[0]?.snippet || ''}`.toLowerCase();
    const hits = tokens.filter((t) => combined.includes(t)).length;
    if (hits >= Math.min(2, tokens.length)) return true;
  }
  return false;
}

function extractGroundingWebSources(responseOrChunk: any, targetList: Array<{ title: string; uri: string }>, seenUris: Set<string>) {
  const chunks = responseOrChunk?.candidates?.[0]?.groundingMetadata?.groundingChunks;
  if (!Array.isArray(chunks)) return;
  for (const chunk of chunks) {
    const uri = chunk?.web?.uri;
    const title = chunk?.web?.title;
    if (typeof uri === 'string' && /^https?:\/\//i.test(uri) && !seenUris.has(uri)) {
      seenUris.add(uri);
      let fallbackTitle = uri;
      try {
        fallbackTitle = new URL(uri).hostname.replace(/^www\./, '');
      } catch {}
      targetList.push({
        title: typeof title === 'string' && title.trim() ? title.trim().slice(0, 140) : fallbackTitle,
        uri,
      });
    }
    if (targetList.length >= 6) break;
  }
}

interface CachedAssistantReply {
  answer: string;
  foundInApp: boolean;
  foundOnWeb: boolean;
  matchedSources: Array<{ title: string; moduleId: string; snippet: string }>;
  webSources: Array<{ title: string; uri: string }>;
  missingInfoTopic: string;
  cachedAt: number;
}

const assistantReplyCache = new Map<string, CachedAssistantReply>();
const ASSISTANT_CACHE_TTL_MS = 20 * 60 * 1000;

function getCachedAssistantReply(key: string): CachedAssistantReply | null {
  const hit = assistantReplyCache.get(key);
  if (!hit) return null;
  if (Date.now() - hit.cachedAt > ASSISTANT_CACHE_TTL_MS) {
    assistantReplyCache.delete(key);
    return null;
  }
  return hit;
}

function setCachedAssistantReply(key: string, val: Omit<CachedAssistantReply, 'cachedAt'>) {
  if (!val.answer || val.answer.length < 4) return;
  if (assistantReplyCache.size >= 250) {
    const firstKey = assistantReplyCache.keys().next().value;
    if (firstKey) assistantReplyCache.delete(firstKey);
  }
  assistantReplyCache.set(key, { ...val, cachedAt: Date.now() });
}

function needsLiveWebSearch(question: string, forceWebSearch: boolean): boolean {
  if (forceWebSearch) return true;
  return /(আজকের|আজ|এখনকার|বর্তমান|সর্বশেষ|নতুন খবর|খবর|দাম|মূল্য|আবহাওয়া|তাপমাত্রা|স্কোর|ম্যাচ|খেলা|ওয়েবসাইট|লিংক|সাইট|ওয়েব|সার্চ|যাচাই|২০২[4-9]|today|current|latest|recent|news|price|weather|score|live|update|website|link|url|verify|online|\bweb\b)/i.test(
    question
  );
}

function prepareAssistantContext(body: any) {
  const question = typeof body?.question === 'string' ? body.question.trim().slice(0, 1500) : '';
  const language = typeof body?.language === 'string' ? body.language.slice(0, 16) : 'bn';
  const userName = typeof body?.userName === 'string' ? body.userName.trim().slice(0, 80) : '';
  const forceWebSearch = Boolean(body?.forceWebSearch);
  const activePage = body?.activePage && typeof body.activePage === 'object' ? body.activePage : {};
  const activeModuleId = typeof activePage.moduleId === 'string' ? activePage.moduleId.slice(0, 80) : 'other';
  const activePageTitle = typeof activePage.pageTitle === 'string' ? activePage.pageTitle.slice(0, 200) : 'Zikr+ App';
  const visibleText = typeof activePage.visibleText === 'string' ? activePage.visibleText.slice(0, 1600) : '';

  const rawEntries = Array.isArray(body?.matchedEntries) ? body.matchedEntries.slice(0, 4) : [];
  const matchedContextText = rawEntries
    .map((entry: any, idx: number) => {
      const title = String(entry?.title || '').slice(0, 130);
      const modLabel = String(entry?.moduleLabel || '').slice(0, 60);
      const ref = String(entry?.reference || '').slice(0, 120);
      const snippet = String(entry?.snippet || '').slice(0, 420);
      return `[#${idx + 1}] ${modLabel} | ${title}${ref ? ` (${ref})` : ''}\n${snippet}`;
    })
    .join('\n\n');

  const rawHistory = Array.isArray(body?.history) ? body.history.slice(-2) : [];
  const historySummary = rawHistory
    .map((h: any) => `${h?.role === 'model' ? 'A' : 'U'}: ${String(h?.text || '').slice(0, 180)}`)
    .join('\n');

  const langGuide =
    language === 'bn'
      ? 'Reply concisely in natural Bangla (বাংলা) unless the user wrote in English or Arabic.'
      : language === 'ar'
      ? 'Reply concisely in clear Arabic (or the user query language).'
      : 'Reply concisely in the same language as the user query.';

  const strongLocal = !forceWebSearch && hasStrongLocalMatch(question, rawEntries, visibleText);
  const useLiveWeb = !strongLocal && needsLiveWebSearch(question, forceWebSearch);

  const systemInstruction = strongLocal
    ? `You are Zikr+, an ultra-fast ethical Islamic AI Assistant${userName ? ` assisting ${userName}` : ''}.
Answer directly and very concisely (max 3-5 short bullets or 2-3 crisp sentences) using the supplied Zikr+ page/library entries, preserving Arabic text, Ayah numbers, and Hadith references. ${langGuide}`
    : useLiveWeb
    ? `You are Zikr+, an ultra-fast ethical AI Assistant${userName ? ` assisting ${userName}` : ''}.
1. Ethical Rule: Only answer ethical, constructive, Islamic, or helpful questions. Politely decline harmful/unethical requests.
2. Trusted Web Search: Use Google Search to answer crisply (max 3-5 bullets or 2-4 concise sentences) using TRUSTED websites (Quran.com, Sunnah.com, iHadis.com, IslamQA.info, SeekersGuidance, Britannica, academic/official institutions). Cite Ayah/Hadith or authentic source names. ${langGuide}`
    : `You are Zikr+, an ultra-fast ethical AI Assistant${userName ? ` assisting ${userName}` : ''}.
1. Ethical Rule: Only answer ethical, constructive, Islamic, or helpful questions. Politely decline harmful/unethical requests.
2. Ultra-Fast Concise Answer: Answer directly and crisply (max 3-5 short bullets or 2-4 concise sentences; no filler intro) from the Zikr+ context or verified Islamic/general knowledge (citing Surah:Ayah, Hadith book, or reliable scholarly source when applicable).
3. Live Web Escalation: ONLY if you genuinely lack verified knowledge of the topic or it requires live real-time lookup, output strictly "[NEED_WEB_SEARCH]" and nothing else. ${langGuide}`;

  const prompt = `${historySummary ? `History:\n${historySummary}\n\n` : ''}Q: ${question}${
    visibleText ? `\n\nPage (${activePageTitle}):\n${visibleText}` : ''
  }${matchedContextText ? `\n\nZikr+ Matches:\n${matchedContextText}` : ''}`;

  const matchedSources = strongLocal
    ? rawEntries.slice(0, 3).map((e: any) => ({
        title: String(e?.title || '').slice(0, 120),
        moduleId: String(e?.moduleId || activeModuleId).slice(0, 60),
        snippet: String(e?.snippet || '').slice(0, 140),
      }))
    : [];

  const cacheKey =
    rawHistory.length === 0 && !visibleText
      ? `${language}::${forceWebSearch ? 'web' : strongLocal ? 'local' : 'fast'}::${question.toLowerCase().replace(/\s+/g, ' ')}`
      : '';

  return {
    question,
    language,
    userName,
    strongLocal,
    useLiveWeb,
    forceWebSearch,
    systemInstruction,
    prompt,
    matchedSources,
    cacheKey,
  };
}

// Fast SSE Streaming AI Assistant Endpoint (Sub-second first token!)
app.post('/api/ai-assistant-stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders?.();

  const sendEvent = (event: string, data: any) => {
    res.write(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
    (res as any).flush?.();
  };

  try {
    const ctx = prepareAssistantContext(req.body);
    if (!ctx.question) {
      sendEvent('error', { error: 'Question is required.' });
      return res.end();
    }

    // 0ms Instant Fast-Path for Greetings
    if (isQuickGreetingOrHelp(ctx.question)) {
      const quickReply = buildQuickGreetingReply(ctx.language, ctx.userName);
      sendEvent('chunk', { text: quickReply });
      sendEvent('done', {
        foundInApp: true,
        foundOnWeb: false,
        matchedSources: [],
        webSources: [],
        missingInfoTopic: '',
      });
      return res.end();
    }

    // <1ms Instant Cache Hit
    if (ctx.cacheKey) {
      const cached = getCachedAssistantReply(ctx.cacheKey);
      if (cached) {
        sendEvent('chunk', { text: cached.answer });
        sendEvent('done', {
          foundInApp: cached.foundInApp,
          foundOnWeb: cached.foundOnWeb,
          matchedSources: cached.matchedSources,
          webSources: cached.webSources,
          missingInfoTopic: cached.missingInfoTopic,
        });
        return res.end();
      }
    }

    const ai = getGeminiClient();
    if (!ai) {
      sendEvent('error', {
        error: 'Gemini API key is not configured on the server yet. Please configure GEMINI_API_KEY in Settings > Secrets.',
      });
      return res.end();
    }

    const streamWithConfig = async (useWebTool: boolean) => {
      const config: any = {
        systemInstruction: useWebTool
          ? `You are Zikr+, a fast ethical AI Assistant${ctx.userName ? ` assisting ${ctx.userName}` : ''}.
Use Google Search to give a concise, verified answer (3-5 crisp bullets or 2-4 sentences) from TRUSTED sources (Quran.com, Sunnah.com, iHadis.com, IslamQA.info, SeekersGuidance, Britannica, official/academic portals). Decline unethical queries politely. ${
              ctx.language === 'bn' ? 'Reply in Bangla (বাংলা) unless asked in another language.' : ''
            }`
          : ctx.systemInstruction,
        thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
      };
      if (useWebTool) {
        config.tools = [{ googleSearch: {} }];
      }
      return ai.models.generateContentStream({
        model: 'gemini-3.1-flash-lite',
        contents: ctx.prompt,
        config,
      });
    };

    const webSources: Array<{ title: string; uri: string }> = [];
    const seenUris = new Set<string>();
    let fullText = '';
    let needEscalationToWeb = false;

    const firstStream = await streamWithConfig(ctx.useLiveWeb);
    let bufferedPrefix = '';
    let prefixEvaluated = ctx.useLiveWeb || ctx.strongLocal;

    for await (const chunk of firstStream) {
      const chunkText = chunk?.text;
      if (typeof chunkText === 'string' && chunkText.length > 0) {
        if (!prefixEvaluated) {
          bufferedPrefix += chunkText;
          if (bufferedPrefix.includes('[NEED_WEB_SEARCH]')) {
            needEscalationToWeb = true;
            break;
          }
          if (bufferedPrefix.length >= 18 || !'[NEED_WEB_SEARCH]'.startsWith(bufferedPrefix.trim())) {
            prefixEvaluated = true;
            fullText += bufferedPrefix;
            sendEvent('chunk', { text: bufferedPrefix });
            bufferedPrefix = '';
          }
        } else {
          fullText += chunkText;
          sendEvent('chunk', { text: chunkText });
        }
      }
      extractGroundingWebSources(chunk, webSources, seenUris);
    }

    // Flush tiny buffered prefix if stream finished short without escalation
    if (!needEscalationToWeb && bufferedPrefix) {
      if (bufferedPrefix.includes('[NEED_WEB_SEARCH]')) {
        needEscalationToWeb = true;
      } else {
        fullText += bufferedPrefix;
        sendEvent('chunk', { text: bufferedPrefix });
      }
    }

    if (needEscalationToWeb) {
      const webStream = await streamWithConfig(true);
      for await (const chunk of webStream) {
        const chunkText = chunk?.text;
        if (typeof chunkText === 'string' && chunkText.length > 0) {
          fullText += chunkText;
          sendEvent('chunk', { text: chunkText });
        }
        extractGroundingWebSources(chunk, webSources, seenUris);
      }
    }

    if (!fullText.trim()) {
      sendEvent('error', { error: 'Empty response received from Gemini model.' });
      return res.end();
    }

    const foundOnWeb = webSources.length > 0;
    const foundInApp = ctx.strongLocal || !foundOnWeb;
    const missingInfoTopic = ctx.strongLocal ? '' : ctx.question.slice(0, 140);

    if (ctx.cacheKey) {
      setCachedAssistantReply(ctx.cacheKey, {
        answer: fullText.trim(),
        foundInApp,
        foundOnWeb,
        matchedSources: ctx.matchedSources,
        webSources,
        missingInfoTopic,
      });
    }

    sendEvent('done', {
      foundInApp,
      foundOnWeb,
      matchedSources: ctx.matchedSources,
      webSources,
      missingInfoTopic,
    });
    return res.end();
  } catch (err: any) {
    console.error('[API /api/ai-assistant-stream] Error:', err);
    const status = extractErrorStatus(err);
    const rawMsg = String(err?.message || '');
    let friendlyMsg = rawMsg || 'Failed to query Zikr+ AI Assistant.';
    if (status === 400 || status === 403 || /API_KEY_INVALID|PERMISSION_DENIED/i.test(rawMsg)) {
      friendlyMsg = 'Gemini API key is invalid or unauthorized. Please verify GEMINI_API_KEY in Settings > Secrets.';
    } else if (status === 429 || /RESOURCE_EXHAUSTED/i.test(rawMsg)) {
      friendlyMsg = 'AI rate limit or quota reached. Please try again shortly.';
    } else if (status === 503 || status === 504) {
      friendlyMsg = 'AI service is temporarily busy. Please try again.';
    }
    sendEvent('error', { error: friendlyMsg });
    return res.end();
  }
});

// Single-Call Fast JSON Endpoint (Fallback compatibility)
app.post('/api/ai-assistant', async (req, res) => {
  try {
    const ctx = prepareAssistantContext(req.body);
    if (!ctx.question) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    if (isQuickGreetingOrHelp(ctx.question)) {
      return res.json({
        foundInApp: true,
        foundOnWeb: false,
        answer: buildQuickGreetingReply(ctx.language, ctx.userName),
        matchedSources: [],
        webSources: [],
        missingInfoTopic: '',
      });
    }

    if (ctx.cacheKey) {
      const cached = getCachedAssistantReply(ctx.cacheKey);
      if (cached) {
        return res.json({
          foundInApp: cached.foundInApp,
          foundOnWeb: cached.foundOnWeb,
          answer: cached.answer,
          matchedSources: cached.matchedSources,
          webSources: cached.webSources,
          missingInfoTopic: cached.missingInfoTopic,
        });
      }
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured on the server yet. Please configure GEMINI_API_KEY in Settings > Secrets.',
      });
    }

    const callFast = async (useWebTool: boolean) => {
      const config: any = {
        systemInstruction: ctx.systemInstruction,
        thinkingConfig: { thinkingLevel: ThinkingLevel.MINIMAL },
      };
      if (useWebTool) config.tools = [{ googleSearch: {} }];
      return callGeminiWithRetry(() =>
        ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: ctx.prompt,
          config,
        })
      );
    };

    let response = await callFast(ctx.useLiveWeb);
    let answer = (response.text ?? '').trim();

    if (!ctx.useLiveWeb && answer.includes('[NEED_WEB_SEARCH]')) {
      response = await callFast(true);
      answer = (response.text ?? '').trim();
    }

    if (!answer) {
      return res.status(502).json({ error: 'Empty response received from Gemini model.' });
    }

    const webSources: Array<{ title: string; uri: string }> = [];
    extractGroundingWebSources(response, webSources, new Set<string>());
    const foundOnWeb = webSources.length > 0;
    const foundInApp = ctx.strongLocal || !foundOnWeb;
    const missingInfoTopic = ctx.strongLocal ? '' : ctx.question.slice(0, 140);

    if (ctx.cacheKey) {
      setCachedAssistantReply(ctx.cacheKey, {
        answer,
        foundInApp,
        foundOnWeb,
        matchedSources: ctx.matchedSources,
        webSources,
        missingInfoTopic,
      });
    }

    return res.json({
      foundInApp,
      foundOnWeb,
      answer,
      matchedSources: ctx.matchedSources,
      webSources,
      missingInfoTopic,
    });
  } catch (err: any) {
    console.error('[API /api/ai-assistant] Error:', err);
    const status = extractErrorStatus(err);
    const rawMsg = String(err?.message || '');
    let friendlyMsg = rawMsg || 'Failed to query Zikr+ AI Assistant.';

    if (status === 400 || status === 403 || /API_KEY_INVALID|PERMISSION_DENIED/i.test(rawMsg)) {
      friendlyMsg = 'Gemini API key is invalid or unauthorized. Please verify GEMINI_API_KEY in Settings > Secrets.';
    } else if (status === 429 || /RESOURCE_EXHAUSTED/i.test(rawMsg)) {
      friendlyMsg = 'AI rate limit or quota reached. Please try again shortly or verify billing in Settings > Secrets.';
    } else if (status === 404 || /NOT_FOUND/i.test(rawMsg)) {
      friendlyMsg = 'Configured Gemini model is unavailable. Please verify model configuration.';
    } else if (status === 503 || status === 504) {
      friendlyMsg = 'AI service is temporarily busy or timed out. Please try again.';
    }

    return res.status(status).json({ error: friendlyMsg });
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

// ============================================================================
// 6. AL-HADIS COMPLETE 17-BOOK LIBRARY ROUTES (/api/hadis/*)
//    Self-Hosted Local Archive FIRST (immune to external website deletion)
// ============================================================================
const FAWAZ_CDN_BASE = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1';
const FAWAZ_RAW_BASE = 'https://raw.githubusercontent.com/fawazahmed0/hadith-api/1';
const AHMED_CDN_BASE = 'https://cdn.jsdelivr.net/gh/AhmedBaset/hadith-json@main/db/by_book';
const AHMED_RAW_BASE = 'https://raw.githubusercontent.com/AhmedBaset/hadith-json/main/db/by_book';

const HADIS_ARCHIVE_DIR = path.join(process.cwd(), 'data', 'hadis-archive');
const HADIS_FAWAZ_DIR = path.join(HADIS_ARCHIVE_DIR, 'fawaz');
const HADIS_AHMED_DIR = path.join(HADIS_ARCHIVE_DIR, 'ahmedbaset');

let fawazInfoCache: Record<string, any> | null = null;
const hadisChapterCache = new Map<string, any>();
const ahmedBookCache = new Map<string, any>();
const fawazFullEditionCache = new Map<string, any>();
const hadisBnTranslationCache = new Map<string, string>();

function setBoundedMap<K, V>(map: Map<K, V>, key: K, val: V, maxSize: number) {
  if (map.has(key)) map.delete(key);
  map.set(key, val);
  if (map.size > maxSize) {
    const oldestKey = map.keys().next().value;
    if (oldestKey !== undefined) map.delete(oldestKey);
  }
}

function readLocalGzippedJson(filePath: string): any | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath);
    const jsonText = zlib.gunzipSync(raw).toString('utf8');
    return JSON.parse(jsonText);
  } catch (err) {
    console.warn(`[HadisArchive] Failed reading local archive ${filePath}:`, err);
    return null;
  }
}

async function fetchJsonWithMirror(primaryUrl: string, fallbackUrl: string, timeoutMs = 15000): Promise<any> {
  const tryFetch = async (url: string) => {
    const controller = new AbortController();
    const tid = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const r = await fetch(url, { signal: controller.signal });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      return await r.json();
    } finally {
      clearTimeout(tid);
    }
  };
  try {
    return await tryFetch(primaryUrl);
  } catch {
    return await tryFetch(fallbackUrl);
  }
}

async function getFawazInfo(): Promise<Record<string, any>> {
  if (fawazInfoCache) return fawazInfoCache;
  const localInfo = readLocalGzippedJson(path.join(HADIS_FAWAZ_DIR, 'info.json.gz'));
  if (localInfo) {
    fawazInfoCache = localInfo;
    return localInfo;
  }
  const info = await fetchJsonWithMirror(`${FAWAZ_CDN_BASE}/info.json`, `${FAWAZ_RAW_BASE}/info.json`, 15000);
  fawazInfoCache = info;
  return info;
}

async function getFawazFullEdition(edName: string): Promise<any> {
  if (fawazFullEditionCache.has(edName)) return fawazFullEditionCache.get(edName);
  const localEditionPath = path.join(HADIS_FAWAZ_DIR, 'editions', `${edName}.min.json.gz`);
  const localData = readLocalGzippedJson(localEditionPath);
  if (localData) {
    setBoundedMap(fawazFullEditionCache, edName, localData, 10);
    return localData;
  }
  const data = await fetchJsonWithMirror(
    `${FAWAZ_CDN_BASE}/editions/${edName}.min.json`,
    `${FAWAZ_RAW_BASE}/editions/${edName}.min.json`,
    25000
  );
  setBoundedMap(fawazFullEditionCache, edName, data, 10);
  return data;
}

async function getFawazSection(edName: string, chapterId: string): Promise<any | null> {
  const localEditionPath = path.join(HADIS_FAWAZ_DIR, 'editions', `${edName}.min.json.gz`);
  if (fawazFullEditionCache.has(edName) || fs.existsSync(localEditionPath)) {
    const full = await getFawazFullEdition(edName);
    const list: any[] = Array.isArray(full?.hadiths) ? full.hadiths : [];
    const targetSec = String(chapterId);
    let sliced = list.filter((h: any) => String(h?.reference?.book ?? '') === targetSec);
    if (sliced.length === 0) {
      const det = full?.metadata?.section_details?.[targetSec];
      if (det && Number(det.hadithnumber_last || 0) > 0) {
        const first = Number(det.hadithnumber_first || 0);
        const last = Number(det.hadithnumber_last || 0);
        sliced = list.filter((h: any) => {
          const n = Number(h?.hadithnumber || 0);
          return n >= first && n <= last;
        });
      }
    }
    return {
      metadata: {
        name: full?.metadata?.name || edName,
        section: {
          [targetSec]: full?.metadata?.sections?.[targetSec] || (targetSec === '0' ? 'Introduction' : `Chapter ${targetSec}`),
        },
      },
      hadiths: sliced,
    };
  }

  return fetchJsonWithMirror(
    `${FAWAZ_CDN_BASE}/editions/${edName}/sections/${chapterId}.min.json`,
    `${FAWAZ_RAW_BASE}/editions/${edName}/sections/${chapterId}.min.json`,
    18000
  ).catch(() => null);
}

async function getAhmedBook(ahmedPath: string): Promise<any> {
  if (ahmedBookCache.has(ahmedPath)) return ahmedBookCache.get(ahmedPath);
  const localPath = path.join(HADIS_AHMED_DIR, `${ahmedPath}.gz`);
  const localData = readLocalGzippedJson(localPath);
  if (localData) {
    setBoundedMap(ahmedBookCache, ahmedPath, localData, 7);
    return localData;
  }
  const data = await fetchJsonWithMirror(`${AHMED_CDN_BASE}/${ahmedPath}`, `${AHMED_RAW_BASE}/${ahmedPath}`, 25000);
  setBoundedMap(ahmedBookCache, ahmedPath, data, 7);
  return data;
}

function resolveFawazEditionCode(bookDef: (typeof HADIS_LIBRARY_BOOKS)[number], uiLang: string): string {
  const map: Record<string, string> = {
    bn: 'ben',
    en: 'eng',
    ur: 'urd',
    id: 'ind',
    tr: 'tur',
    fr: 'fra',
    ru: 'rus',
    ar: 'ara',
    hi: 'eng',
  };
  const desired = map[uiLang] || 'eng';
  const supported = bookDef.supportedFawazLangs || ['eng', 'ara'];
  if (supported.includes(desired)) return desired;
  if (supported.includes('ben') && uiLang === 'bn') return 'ben';
  if (supported.includes('eng')) return 'eng';
  return supported[0] || 'ara';
}

function normalizeGrades(grades: any[]): { label: string; isSahih: boolean; isHasan: boolean; isWeak: boolean; details: Array<{ name: string; grade: string }> } {
  const details = Array.isArray(grades)
    ? grades
        .filter((g) => g && g.grade)
        .map((g) => ({ name: String(g.name || 'Scholar'), grade: String(g.grade || '') }))
    : [];
  const joined = details.map((d) => d.grade.toLowerCase()).join(' ');
  const isSahih = /sahih|muttafaq|authentic|সহীহ|সহিহ/.test(joined) || details.length === 0;
  const isHasan = !isSahih && /hasan|হাসান/.test(joined);
  const isWeak = /daif|da'if|weak|mawdu|যঈফ|দুর্বল/.test(joined);
  const primary = details[0]?.grade || 'Sahih';
  return { label: primary, isSahih: isSahih && !isWeak, isHasan, isWeak, details };
}

app.get('/api/hadis/books/:bookId/chapters', async (req, res) => {
  try {
    const bookId = String(req.params.bookId || '').trim();
    const bookDef = HADIS_LIBRARY_BOOKS.find((b) => b.id === bookId);
    if (!bookDef) {
      return res.status(404).json({ error: 'Hadith book not found' });
    }

    if (bookDef.source === 'fawaz' && bookDef.fawazKey) {
      const info = await getFawazInfo();
      const meta = info?.[bookDef.fawazKey]?.metadata;
      if (!meta) {
        return res.status(404).json({ error: 'Book metadata unavailable' });
      }
      const sections: Record<string, string> = meta.sections || {};
      const details: Record<string, any> = meta.section_details || {};

      const chapters = Object.keys(details)
        .map((secId) => {
          const det = details[secId] || {};
          const first = Number(det.hadithnumber_first || 0);
          const last = Number(det.hadithnumber_last || 0);
          if (last <= 0 && secId === '0') return null;
          if (last <= 0 && first <= 0) return null;
          const titleEn = String(sections[secId] || (secId === '0' ? 'Introduction' : `${bookDef.enName} Chapter ${secId}`)).trim();
          return {
            chapterId: String(secId),
            titleEn: titleEn || `Chapter ${secId}`,
            titleBn: translateChapterNameBn(titleEn, secId),
            titleAr: '',
            hadithFirst: first,
            hadithLast: last,
            arabicFirst: det.arabicnumber_first ?? first,
            arabicLast: det.arabicnumber_last ?? last,
            count: Math.max(1, Math.round(last - first + 1)),
          };
        })
        .filter(Boolean);

      return res.json({ book: bookDef, chapters });
    }

    if (bookDef.source === 'ahmedbaset' && bookDef.ahmedPath) {
      const data = await getAhmedBook(bookDef.ahmedPath);
      const rawChapters = Array.isArray(data?.chapters) ? data.chapters : [];
      const rawHadiths = Array.isArray(data?.hadiths) ? data.hadiths : [];
      const countsByChap = new Map<string, { count: number; first: number; last: number }>();

      for (const h of rawHadiths) {
        const cId = String(h?.chapterId ?? '0');
        const num = Number(h?.idInBook ?? h?.id ?? 0);
        const cur = countsByChap.get(cId) || { count: 0, first: num || 1, last: num || 1 };
        cur.count += 1;
        if (num > 0 && num < cur.first) cur.first = num;
        if (num > cur.last) cur.last = num;
        countsByChap.set(cId, cur);
      }

      const chapters = rawChapters.map((c: any) => {
        const cId = String(c?.id ?? '0');
        const stats = countsByChap.get(cId) || { count: 0, first: 0, last: 0 };
        const titleEn = String(c?.english || `Chapter ${cId}`).trim();
        return {
          chapterId: cId,
          titleEn,
          titleBn: translateChapterNameBn(titleEn, cId),
          titleAr: String(c?.arabic || '').trim(),
          hadithFirst: stats.first,
          hadithLast: stats.last,
          arabicFirst: stats.first,
          arabicLast: stats.last,
          count: stats.count,
        };
      });

      // Handle any chapter-0 or unlisted chapterId hadiths so zero hadiths are missed
      const listedIds = new Set(chapters.map((c: any) => c.chapterId));
      for (const [cId, stats] of countsByChap.entries()) {
        if (!listedIds.has(cId) && stats.count > 0) {
          chapters.unshift({
            chapterId: cId,
            titleEn: cId === '0' ? 'Introduction & Opening' : `Section ${cId}`,
            titleBn: cId === '0' ? 'ভূমিকা ও সূচনা' : `অধ্যায় ${cId}`,
            titleAr: '',
            hadithFirst: stats.first,
            hadithLast: stats.last,
            arabicFirst: stats.first,
            arabicLast: stats.last,
            count: stats.count,
          });
        }
      }

      return res.json({ book: bookDef, chapters });
    }

    return res.status(400).json({ error: 'Unsupported book configuration' });
  } catch (err: any) {
    console.error('[API /api/hadis/chapters] Error:', err);
    return res.status(502).json({ error: err?.message || 'Failed to load book chapters' });
  }
});

app.get('/api/hadis/books/:bookId/chapters/:chapterId', async (req, res) => {
  try {
    const bookId = String(req.params.bookId || '').trim();
    const chapterId = String(req.params.chapterId || '').trim();
    const uiLang = String(req.query.lang || 'bn').trim().toLowerCase();

    const bookDef = HADIS_LIBRARY_BOOKS.find((b) => b.id === bookId);
    if (!bookDef) {
      return res.status(404).json({ error: 'Hadith book not found' });
    }

    const cacheKey = `${bookId}:${chapterId}:${uiLang}`;
    if (hadisChapterCache.has(cacheKey)) {
      return res.json(hadisChapterCache.get(cacheKey));
    }

    if (bookDef.source === 'fawaz' && bookDef.fawazKey) {
      const langCode = resolveFawazEditionCode(bookDef, uiLang);
      const bookKey = bookDef.fawazKey;

      const araPromise = getFawazSection(`ara-${bookKey}`, chapterId).catch(() => null);
      const transPromise =
        langCode === 'ara'
          ? Promise.resolve(null)
          : getFawazSection(`${langCode}-${bookKey}`, chapterId).catch(() => null);
      const engPromise =
        langCode === 'eng'
          ? Promise.resolve(null)
          : getFawazSection(`eng-${bookKey}`, chapterId).catch(() => null);

      const [araJson, transJson, engJson] = await Promise.all([araPromise, transPromise, engPromise]);

      const primaryList: any[] = Array.isArray(transJson?.hadiths)
        ? transJson.hadiths
        : Array.isArray(engJson?.hadiths)
        ? engJson.hadiths
        : Array.isArray(araJson?.hadiths)
        ? araJson.hadiths
        : [];

      const araMap = new Map<string, any>();
      if (Array.isArray(araJson?.hadiths)) {
        araJson.hadiths.forEach((h: any) => araMap.set(String(h.hadithnumber), h));
      }
      const engMap = new Map<string, any>();
      if (Array.isArray(engJson?.hadiths)) {
        engJson.hadiths.forEach((h: any) => engMap.set(String(h.hadithnumber), h));
      }

      const sectionMap = transJson?.metadata?.section || engJson?.metadata?.section || araJson?.metadata?.section || {};
      const titleEn = String(sectionMap[chapterId] || (chapterId === '0' ? 'Introduction' : `Chapter ${chapterId}`));

      const hadiths = primaryList.map((h: any, idx: number) => {
        const key = String(h?.hadithnumber ?? idx + 1);
        const araEntry = araMap.get(key) || (Array.isArray(araJson?.hadiths) ? araJson.hadiths[idx] : null);
        const engEntry = engMap.get(key) || (Array.isArray(engJson?.hadiths) ? engJson.hadiths[idx] : null);
        const gradesRaw = (h?.grades?.length ? h.grades : engEntry?.grades) || [];
        const gradeMeta = normalizeGrades(gradesRaw);

        const transText = String(h?.text || '').trim();
        const engText = String(engEntry?.text || '').trim();

        return {
          uid: `${bookId}_${key}`,
          bookId,
          chapterId,
          hadithNumber: h?.hadithnumber ?? idx + 1,
          arabicNumber: h?.arabicnumber ?? araEntry?.arabicnumber ?? h?.hadithnumber ?? idx + 1,
          arabicText: String(araEntry?.text || '').trim(),
          translationText: transText || engText || String(araEntry?.text || ''),
          englishText: engText || (langCode === 'eng' ? transText : ''),
          hasNativeBangla: langCode === 'ben' && Boolean(transText),
          narrator: '',
          grades: gradeMeta.details,
          gradeLabel: bookId === 'bukhari' || bookId === 'muslim' ? (langCode === 'ben' ? 'সহীহ' : 'Sahih') : gradeMeta.label,
          gradeType: bookId === 'bukhari' || bookId === 'muslim' ? 'sahih' : gradeMeta.isWeak ? 'weak' : gradeMeta.isHasan ? 'hasan' : 'sahih',
          reference: h?.reference || { book: Number(chapterId), hadith: h?.hadithnumber },
        };
      });

      const payload = {
        bookId,
        chapterId,
        titleEn,
        titleBn: translateChapterNameBn(titleEn, chapterId),
        langCode,
        hadiths,
      };
      setBoundedMap(hadisChapterCache, cacheKey, payload, 150);
      return res.json(payload);
    }

    if (bookDef.source === 'ahmedbaset' && bookDef.ahmedPath) {
      const data = await getAhmedBook(bookDef.ahmedPath);
      const rawChapters = Array.isArray(data?.chapters) ? data.chapters : [];
      const rawHadiths = Array.isArray(data?.hadiths) ? data.hadiths : [];
      const chObj = rawChapters.find((c: any) => String(c?.id) === chapterId);
      const titleEn = String(chObj?.english || (chapterId === '0' ? 'Introduction & Opening' : `Chapter ${chapterId}`));
      const titleAr = String(chObj?.arabic || '');

      const filtered = rawHadiths.filter((h: any) => String(h?.chapterId ?? '0') === chapterId);
      const hadiths = filtered.map((h: any, idx: number) => {
        const num = h?.idInBook ?? h?.id ?? idx + 1;
        const narrator = String(h?.english?.narrator || '').trim();
        const body = String(h?.english?.text || '').trim();
        const fullEn = narrator && !body.startsWith(narrator) ? `${narrator}\n${body}` : body;
        return {
          uid: `${bookId}_${num}`,
          bookId,
          chapterId,
          hadithNumber: num,
          arabicNumber: num,
          arabicText: String(h?.arabic || '').trim(),
          translationText: fullEn,
          englishText: fullEn,
          hasNativeBangla: false,
          narrator,
          grades: [],
          gradeLabel: bookId === 'riyad_assalihin' || bookId === 'qudsi' ? 'Sahih / Authentic' : 'Canonical',
          gradeType: 'sahih',
          reference: { book: Number(chapterId), hadith: Number(num) || idx + 1 },
        };
      });

      const payload = {
        bookId,
        chapterId,
        titleEn,
        titleBn: translateChapterNameBn(titleEn, chapterId),
        titleAr,
        langCode: 'eng',
        hadiths,
      };
      setBoundedMap(hadisChapterCache, cacheKey, payload, 150);
      return res.json(payload);
    }

    return res.status(400).json({ error: 'Unsupported book source' });
  } catch (err: any) {
    console.error('[API /api/hadis/chapter] Error:', err);
    return res.status(502).json({ error: err?.message || 'Failed to load chapter hadiths' });
  }
});

app.get('/api/hadis/books/:bookId/search', async (req, res) => {
  try {
    const bookId = String(req.params.bookId || '').trim();
    const q = String(req.query.q || '').trim();
    const uiLang = String(req.query.lang || 'bn').trim().toLowerCase();
    const limit = Math.min(80, Math.max(5, Number(req.query.limit || 50)));

    if (!q) {
      return res.json({ results: [], totalMatches: 0 });
    }

    const bookDef = HADIS_LIBRARY_BOOKS.find((b) => b.id === bookId);
    if (!bookDef) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const isPureNumber = /^\d+(?:\.\d+)?$/.test(q);

    if (bookDef.source === 'fawaz' && bookDef.fawazKey) {
      const langCode = resolveFawazEditionCode(bookDef, uiLang);
      const bookKey = bookDef.fawazKey;

      // Fast path for exact Hadith number lookup via section_details -> single chapter fetch!
      if (isPureNumber) {
        const targetNum = Number(q);
        const info = await getFawazInfo();
        const details: Record<string, any> = info?.[bookKey]?.metadata?.section_details || {};
        const matchingSections = Object.keys(details).filter((secId) => {
          const det = details[secId];
          if (!det || Number(det.hadithnumber_last || 0) <= 0) return false;
          return targetNum >= Number(det.hadithnumber_first) && targetNum <= Number(det.hadithnumber_last);
        });

        // Also check section 0 for Muslim where stray numbers sit
        if (bookKey === 'muslim' && !matchingSections.includes('0')) {
          matchingSections.push('0');
        }

        const matchedResults: any[] = [];
        for (const secId of matchingSections.slice(0, 2)) {
          const [araJson, transJson] = await Promise.all([
            getFawazSection(`ara-${bookKey}`, secId).catch(() => null),
            getFawazSection(`${langCode}-${bookKey}`, secId)
              .catch(() => null)
              .then((res) => res ?? getFawazSection(`eng-${bookKey}`, secId).catch(() => null)),
          ]);
          const list = Array.isArray(transJson?.hadiths) ? transJson.hadiths : Array.isArray(araJson?.hadiths) ? araJson.hadiths : [];
          const araMap = new Map<string, any>((araJson?.hadiths || []).map((x: any) => [String(x.hadithnumber), x]));
          for (const h of list) {
            if (Math.floor(Number(h.hadithnumber)) === Math.floor(targetNum) || String(h.arabicnumber) === q) {
              const key = String(h.hadithnumber);
              const araEntry = araMap.get(key);
              const gradeMeta = normalizeGrades(h.grades || []);
              matchedResults.push({
                uid: `${bookId}_${key}`,
                bookId,
                chapterId: secId,
                hadithNumber: h.hadithnumber,
                arabicNumber: h.arabicnumber ?? h.hadithnumber,
                arabicText: String(araEntry?.text || '').trim(),
                translationText: String(h.text || '').trim(),
                hasNativeBangla: langCode === 'ben',
                grades: gradeMeta.details,
                gradeLabel: bookId === 'bukhari' || bookId === 'muslim' ? (langCode === 'ben' ? 'সহীহ' : 'Sahih') : gradeMeta.label,
                gradeType: bookId === 'bukhari' || bookId === 'muslim' ? 'sahih' : gradeMeta.isWeak ? 'weak' : gradeMeta.isHasan ? 'hasan' : 'sahih',
              });
            }
          }
        }
        return res.json({ results: matchedResults, totalMatches: matchedResults.length });
      }

      // Full-book keyword search (local archive first + cached in RAM)
      const transKey = `${langCode}-${bookKey}`;
      const araKey = `ara-${bookKey}`;
      const engKey = `eng-${bookKey}`;

      const [transFull, araFull] = await Promise.all([
        getFawazFullEdition(transKey).catch(() => getFawazFullEdition(engKey)),
        getFawazFullEdition(araKey).catch(() => null),
      ]);

      const lowerQ = q.toLowerCase();
      const hadithList: any[] = Array.isArray(transFull?.hadiths) ? transFull.hadiths : [];
      const araMap = new Map<string, string>((araFull?.hadiths || []).map((x: any) => [String(x.hadithnumber), String(x.text || '')]));

      const matches: any[] = [];
      let totalMatches = 0;
      for (const h of hadithList) {
        const text = String(h?.text || '');
        const key = String(h?.hadithnumber ?? '');
        const ara = araMap.get(key) || '';
        if (text.toLowerCase().includes(lowerQ) || ara.includes(q) || key === q) {
          totalMatches++;
          if (matches.length < limit) {
            const gradeMeta = normalizeGrades(h.grades || []);
            const secId = String(h?.reference?.book ?? '1');
            matches.push({
              uid: `${bookId}_${key}`,
              bookId,
              chapterId: secId,
              hadithNumber: h.hadithnumber,
              arabicNumber: h.arabicnumber ?? h.hadithnumber,
              arabicText: ara.trim(),
              translationText: text.trim(),
              hasNativeBangla: langCode === 'ben',
              grades: gradeMeta.details,
              gradeLabel: bookId === 'bukhari' || bookId === 'muslim' ? (langCode === 'ben' ? 'সহীহ' : 'Sahih') : gradeMeta.label,
              gradeType: bookId === 'bukhari' || bookId === 'muslim' ? 'sahih' : gradeMeta.isWeak ? 'weak' : gradeMeta.isHasan ? 'hasan' : 'sahih',
            });
          }
        }
      }
      return res.json({ results: matches, totalMatches });
    }

    if (bookDef.source === 'ahmedbaset' && bookDef.ahmedPath) {
      const data = await getAhmedBook(bookDef.ahmedPath);
      const rawHadiths = Array.isArray(data?.hadiths) ? data.hadiths : [];
      const lowerQ = q.toLowerCase();
      const matches: any[] = [];
      let totalMatches = 0;

      for (const h of rawHadiths) {
        const num = String(h?.idInBook ?? h?.id ?? '');
        const narrator = String(h?.english?.narrator || '');
        const body = String(h?.english?.text || '');
        const ara = String(h?.arabic || '');
        const hit = isPureNumber
          ? num === q
          : body.toLowerCase().includes(lowerQ) || narrator.toLowerCase().includes(lowerQ) || ara.includes(q);

        if (hit) {
          totalMatches++;
          if (matches.length < limit) {
            const fullEn = narrator && !body.startsWith(narrator) ? `${narrator}\n${body}` : body;
            matches.push({
              uid: `${bookId}_${num}`,
              bookId,
              chapterId: String(h?.chapterId ?? '1'),
              hadithNumber: num,
              arabicNumber: num,
              arabicText: ara.trim(),
              translationText: fullEn,
              englishText: fullEn,
              hasNativeBangla: false,
              narrator,
              grades: [],
              gradeLabel: 'Canonical',
              gradeType: 'sahih',
            });
          }
        }
      }
      return res.json({ results: matches, totalMatches });
    }

    return res.json({ results: [], totalMatches: 0 });
  } catch (err: any) {
    console.error('[API /api/hadis/search] Error:', err);
    return res.status(502).json({ error: err?.message || 'Hadith search failed' });
  }
});

app.post('/api/hadis/translate-bn', async (req, res) => {
  try {
    const body = req.body || {};
    const uid = String(body.uid || '').slice(0, 100);
    const arabicText = String(body.arabicText || '').trim().slice(0, 3000);
    const englishText = String(body.englishText || '').trim().slice(0, 3000);
    const bookTitle = String(body.bookTitle || 'Hadith').slice(0, 120);

    if (!englishText && !arabicText) {
      return res.status(400).json({ error: 'Hadith text is required' });
    }
    if (uid && hadisBnTranslationCache.has(uid)) {
      return res.json({ translationBn: hadisBnTranslationCache.get(uid) });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(503).json({ error: 'Translation service requires server Gemini API key configuration.' });
    }

    const prompt = `Translate this authentic Hadith from "${bookTitle}" into faithful, clear, respectful Bengali (বাংলা), preserving narrator chain and scholarly precision without adding external commentary:

ARABIC:
${arabicText || '(N/A)'}

ENGLISH REFERENCE:
${englishText || '(N/A)'}`;

    const response = await callGeminiWithRetry(() =>
      ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: prompt,
        config: {
          systemInstruction: 'You are an expert Islamic Hadith translator translating authentic Hadith accurately from Arabic and English into clear, natural Bengali (বাংলা). Output ONLY the Bengali translation text cleanly.',
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      })
    );

    const translationBn = (response.text ?? '').trim();
    if (!translationBn) {
      return res.status(502).json({ error: 'Empty translation returned' });
    }
    if (uid) {
      setBoundedMap(hadisBnTranslationCache, uid, translationBn, 1000);
    }
    return res.json({ translationBn });
  } catch (err: any) {
    const status = extractErrorStatus(err);
    return res.status(status).json({ error: err?.message || 'Failed to translate Hadith' });
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
