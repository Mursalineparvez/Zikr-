import { HADIS_LIBRARY_BOOKS, translateChapterNameBn } from '../data/hadisCatalog';
import { AUTHENTIC_HADITHS } from '../utils/hadithData';
import { HADITH_TRANSLATIONS } from '../utils/appTranslations';

export interface HadisChapterMeta {
  chapterId: string;
  titleEn: string;
  titleBn: string;
  titleAr?: string;
  hadithFirst: number;
  hadithLast: number;
  arabicFirst?: number | string;
  arabicLast?: number | string;
  count: number;
}

export interface FullHadithEntry {
  uid: string;
  bookId: string;
  chapterId: string;
  hadithNumber: number | string;
  arabicNumber?: number | string;
  arabicText: string;
  translationText: string;
  englishText?: string;
  hasNativeBangla?: boolean;
  narrator?: string;
  grades: Array<{ name: string; grade: string }>;
  gradeLabel: string;
  gradeType: 'sahih' | 'hasan' | 'weak';
  reference?: { book: number; hadith: number | string };
}

export interface ChapterHadithsResponse {
  bookId: string;
  chapterId: string;
  titleEn: string;
  titleBn: string;
  titleAr?: string;
  langCode: string;
  hadiths: FullHadithEntry[];
  isOfflineCuratedFallback?: boolean;
}

export interface OfflineBookStatus {
  bookId: string;
  downloadedChapters: number;
  totalChapters: number;
  completed: boolean;
  updatedAt: number;
}

const DB_NAME = 'zikrmate_hadis_offline_v1';
const DB_VERSION = 1;
const STORE_CHAPTERS = 'chapters';
const STORE_CHAPTER_DATA = 'chapterData';
const STORE_BN_TRANS = 'bnTranslations';
const STORE_OFFLINE_BOOKS = 'offlineBooks';

let dbPromise: Promise<IDBDatabase | null> | null = null;

function openHadisDb(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === 'undefined') return Promise.resolve(null);
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve) => {
    try {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_CHAPTERS)) {
          db.createObjectStore(STORE_CHAPTERS, { keyPath: 'bookId' });
        }
        if (!db.objectStoreNames.contains(STORE_CHAPTER_DATA)) {
          db.createObjectStore(STORE_CHAPTER_DATA, { keyPath: 'key' });
        }
        if (!db.objectStoreNames.contains(STORE_BN_TRANS)) {
          db.createObjectStore(STORE_BN_TRANS, { keyPath: 'uid' });
        }
        if (!db.objectStoreNames.contains(STORE_OFFLINE_BOOKS)) {
          db.createObjectStore(STORE_OFFLINE_BOOKS, { keyPath: 'bookId' });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => {
        dbPromise = null;
        resolve(null);
      };
    } catch {
      dbPromise = null;
      resolve(null);
    }
  });

  return dbPromise;
}

async function idbGet<T>(storeName: string, key: string): Promise<T | null> {
  const db = await openHadisDb();
  if (!db) return null;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.get(key);
      req.onsuccess = () => resolve((req.result as T) || null);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

async function idbPut(storeName: string, value: any): Promise<void> {
  const db = await openHadisDb();
  if (!db) return;
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(value);
      req.onsuccess = () => resolve();
      req.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

async function idbPutMany(items: Array<{ storeName: string; value: any }>): Promise<void> {
  const db = await openHadisDb();
  if (!db || items.length === 0) return;
  const storeNames = Array.from(new Set(items.map((i) => i.storeName)));
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(storeNames, 'readwrite');
      for (const item of items) {
        tx.objectStore(item.storeName).put(item.value);
      }
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
      tx.onabort = () => resolve();
    } catch {
      resolve();
    }
  });
}

async function idbGetAll<T>(storeName: string): Promise<T[]> {
  const db = await openHadisDb();
  if (!db) return [];
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve((req.result as T[]) || []);
      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

async function idbGetAllKeys(storeName: string): Promise<string[]> {
  const db = await openHadisDb();
  if (!db) return [];
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAllKeys();
      req.onsuccess = () => resolve((req.result as string[]) || []);
      req.onerror = () => resolve([]);
    } catch {
      resolve([]);
    }
  });
}

function isOnlineNow(): boolean {
  return typeof navigator === 'undefined' || navigator.onLine !== false;
}

// Static offline pack memory caches (fetched from /offline-hadis/*.json which SW precaches)
let chaptersIndexMem: Record<string, any[]> | null = null;
let coreBooksMem: Record<string, any> | null = null;
let starterChaptersMem: Record<string, any> | null = null;

async function loadStaticJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, { cache: 'force-cache' });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

async function getOfflineChaptersIndex(): Promise<Record<string, any[]> | null> {
  if (chaptersIndexMem) return chaptersIndexMem;
  chaptersIndexMem = await loadStaticJson<Record<string, any[]>>('/offline-hadis/chapters-index.json');
  return chaptersIndexMem;
}

async function getOfflineCoreBooks(): Promise<Record<string, any> | null> {
  if (coreBooksMem) return coreBooksMem;
  coreBooksMem = await loadStaticJson<Record<string, any>>('/offline-hadis/core-books.json');
  return coreBooksMem;
}

async function getOfflineStarterChapters(): Promise<Record<string, any> | null> {
  if (starterChaptersMem) return starterChaptersMem;
  starterChaptersMem = await loadStaticJson<Record<string, any>>('/offline-hadis/starter-chapters.json');
  return starterChaptersMem;
}

function hydrateBundledHadithList(
  bookId: string,
  chapterId: string,
  rawList: any[],
  lang: string
): FullHadithEntry[] {
  const wantBn = lang === 'bn';
  return (rawList || []).map((h: any, idx: number) => {
    const bnText = String(h?.bnText || '').trim();
    const enText = String(h?.enText || '').trim();
    const translationText = wantBn ? bnText || enText || String(h?.arabicText || '') : enText || bnText || String(h?.arabicText || '');
    const grades = Array.isArray(h?.grades) ? h.grades : [];
    const joined = grades.map((g: any) => String(g?.grade || '').toLowerCase()).join(' ');
    const isWeak = /daif|da'if|weak|mawdu|যঈফ|দুর্বল/.test(joined);
    const isHasan = !isWeak && /hasan|হাসান/.test(joined);
    const gradeType: 'sahih' | 'hasan' | 'weak' =
      bookId === 'bukhari' || bookId === 'muslim'
        ? 'sahih'
        : isWeak
        ? 'weak'
        : isHasan
        ? 'hasan'
        : 'sahih';
    const gradeLabel =
      bookId === 'bukhari' || bookId === 'muslim'
        ? wantBn
          ? 'সহীহ'
          : 'Sahih'
        : grades[0]?.grade || (wantBn ? 'সহীহ' : 'Sahih');

    return {
      uid: h?.uid || `${bookId}_${h?.hadithNumber ?? idx + 1}`,
      bookId,
      chapterId,
      hadithNumber: h?.hadithNumber ?? idx + 1,
      arabicNumber: h?.arabicNumber ?? h?.hadithNumber ?? idx + 1,
      arabicText: String(h?.arabicText || '').trim(),
      translationText,
      englishText: enText,
      hasNativeBangla: wantBn && Boolean(bnText),
      narrator: h?.narrator || '',
      grades,
      gradeLabel,
      gradeType,
    };
  });
}

export function getCuratedOfflineHadithsForBook(bookId: string, lang: string = 'bn'): FullHadithEntry[] {
  const bookKeyMap: Record<string, string[]> = {
    bukhari: ['bukhari'],
    muslim: ['muslim'],
    tirmidhi: ['tirmidhi'],
    abudawud: ['abudawud'],
    nasai: ['nasai'],
    ibnmajah: ['ibnmajah'],
    malik: ['malik'],
    shamail: ['shamail'],
    nawawi: ['bukhari', 'muslim'],
  };
  const prefixes = bookKeyMap[bookId] || [];
  const matched = prefixes.length
    ? AUTHENTIC_HADITHS.filter((h) => prefixes.some((p) => h.id.startsWith(`${p}_`)))
    : AUTHENTIC_HADITHS.slice(0, 6);

  const list = matched.length > 0 ? matched : AUTHENTIC_HADITHS.slice(0, 5);
  return list.map((h) => {
    const tr = (HADITH_TRANSLATIONS as any)[h.id]?.[lang] || (HADITH_TRANSLATIONS as any)[h.id]?.bn;
    const translated = tr?.translation || h.englishTranslation;
    return {
      uid: `curated_${h.id}`,
      bookId,
      chapterId: 'curated',
      hadithNumber: h.hadithNumber,
      arabicNumber: h.hadithNumber,
      arabicText: h.arabicText,
      translationText: translated,
      englishText: h.englishTranslation,
      hasNativeBangla: lang === 'bn' && Boolean(tr?.translation),
      narrator: h.narrator,
      grades: [{ name: h.book, grade: h.grade }],
      gradeLabel: lang === 'bn' ? 'সহীহ' : h.grade,
      gradeType: 'sahih',
    };
  });
}

export async function listCachedChapterIdsForBook(bookId: string): Promise<string[]> {
  const keys = await idbGetAllKeys(STORE_CHAPTER_DATA);
  const set = new Set<string>();
  const prefix = `${bookId}:`;
  for (const k of keys) {
    if (typeof k === 'string' && k.startsWith(prefix)) {
      const parts = k.split(':');
      if (parts[1]) set.add(parts[1]);
    }
  }
  const core = await getOfflineCoreBooks();
  if (core?.[bookId]?.chapterId) {
    set.add(String(core[bookId].chapterId));
  }
  const starters = await getOfflineStarterChapters();
  if (starters?.[bookId]?.chapterId) {
    set.add(String(starters[bookId].chapterId));
  }
  return Array.from(set);
}

export async function getAllOfflineBookStatuses(): Promise<Record<string, OfflineBookStatus>> {
  const list = await idbGetAll<OfflineBookStatus>(STORE_OFFLINE_BOOKS);
  const map: Record<string, OfflineBookStatus> = {};
  list.forEach((item) => {
    if (item?.bookId) map[item.bookId] = item;
  });

  // Automatically mark pre-bundled 40-Hadith core books as offline-ready
  for (const coreId of ['nawawi', 'qudsi', 'dehlawi']) {
    if (!map[coreId]) {
      map[coreId] = {
        bookId: coreId,
        downloadedChapters: 1,
        totalChapters: 1,
        completed: true,
        updatedAt: Date.now(),
      };
    }
  }
  return map;
}

export async function getCachedBnTranslation(uid: string): Promise<string | null> {
  const res = await idbGet<{ uid: string; text: string }>(STORE_BN_TRANS, uid);
  return res?.text || null;
}

export async function translateHadithToBn(
  hadith: FullHadithEntry,
  bookTitle: string
): Promise<string> {
  const cached = await getCachedBnTranslation(hadith.uid);
  if (cached) return cached;
  if (!isOnlineNow()) {
    throw new Error('অফলাইন মোডে নতুন এআই অনুবাদ পাওয়া যাবে না।');
  }

  const res = await fetch('/api/hadis/translate-bn', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      uid: hadith.uid,
      arabicText: hadith.arabicText,
      englishText: hadith.englishText || hadith.translationText,
      bookTitle,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data?.translationBn) {
    throw new Error(data?.error || 'অনুবাদ লোড করা যায়নি');
  }
  await idbPut(STORE_BN_TRANS, { uid: hadith.uid, text: data.translationBn });
  return data.translationBn;
}

const FAWAZ_CDN = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1';

export async function fetchBookChapters(bookId: string): Promise<HadisChapterMeta[]> {
  const cached = await idbGet<{ bookId: string; chapters: HadisChapterMeta[] }>(STORE_CHAPTERS, bookId);
  if (cached?.chapters?.length) {
    return cached.chapters;
  }

  // Try bundled static chapters index immediately if offline OR as fast warm cache
  const tryStaticChapters = async (): Promise<HadisChapterMeta[] | null> => {
    const idx = await getOfflineChaptersIndex();
    const rawList = idx?.[bookId];
    if (!Array.isArray(rawList) || rawList.length === 0) return null;
    const chapters: HadisChapterMeta[] = rawList.map((c: any) => ({
      chapterId: String(c.chapterId),
      titleEn: String(c.titleEn || `Chapter ${c.chapterId}`),
      titleBn: translateChapterNameBn(String(c.titleEn || ''), String(c.chapterId)),
      titleAr: String(c.titleAr || ''),
      hadithFirst: Number(c.hadithFirst || 1),
      hadithLast: Number(c.hadithLast || 1),
      count: Number(c.count || 1),
    }));
    await idbPut(STORE_CHAPTERS, { bookId, chapters });
    return chapters;
  };

  if (!isOnlineNow()) {
    const staticList = await tryStaticChapters();
    if (staticList) return staticList;
  }

  if (isOnlineNow()) {
    try {
      const controller = new AbortController();
      const tId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(`/api/hadis/books/${encodeURIComponent(bookId)}/chapters`, {
        signal: controller.signal,
      });
      clearTimeout(tId);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.chapters) && data.chapters.length > 0) {
          await idbPut(STORE_CHAPTERS, { bookId, chapters: data.chapters });
          return data.chapters;
        }
      }
    } catch {}
  }

  // Fallback to static offline chapters index even if online API timed out
  const staticList = await tryStaticChapters();
  if (staticList) return staticList;

  // Direct CDN fallback for fawazahmed0 books
  if (isOnlineNow()) {
    const bookDef = HADIS_LIBRARY_BOOKS.find((b) => b.id === bookId);
    if (bookDef?.source === 'fawaz' && bookDef.fawazKey) {
      try {
        const r = await fetch(`${FAWAZ_CDN}/info.json`);
        if (r.ok) {
          const info = await r.json();
          const meta = info?.[bookDef.fawazKey]?.metadata;
          const sections: Record<string, string> = meta?.sections || {};
          const details: Record<string, any> = meta?.section_details || {};
          const chapters: HadisChapterMeta[] = Object.keys(details)
            .map((secId) => {
              const det = details[secId] || {};
              const first = Number(det.hadithnumber_first || 0);
              const last = Number(det.hadithnumber_last || 0);
              if (last <= 0) return null;
              const titleEn = String(sections[secId] || (secId === '0' ? 'Introduction' : `Chapter ${secId}`)).trim();
              return {
                chapterId: secId,
                titleEn,
                titleBn: translateChapterNameBn(titleEn, secId),
                hadithFirst: first,
                hadithLast: last,
                count: Math.max(1, Math.round(last - first + 1)),
              };
            })
            .filter(Boolean) as HadisChapterMeta[];
          if (chapters.length > 0) {
            await idbPut(STORE_CHAPTERS, { bookId, chapters });
            return chapters;
          }
        }
      } catch {}
    }
  }

  throw new Error('অধ্যায়ের তালিকা লোড করা যায়নি');
}

export async function fetchChapterHadiths(
  bookId: string,
  chapterId: string,
  lang: string = 'bn'
): Promise<ChapterHadithsResponse> {
  // 1. Check exact language in IndexedDB, then any cached language for this chapter
  const storageKey = `${bookId}:${chapterId}:${lang}`;
  const exactCached = await idbGet<{ key: string; data: ChapterHadithsResponse }>(STORE_CHAPTER_DATA, storageKey);
  if (exactCached?.data?.hadiths?.length) {
    return exactCached.data;
  }

  const altLang = lang === 'bn' ? 'en' : 'bn';
  const altCached =
    (await idbGet<{ key: string; data: ChapterHadithsResponse }>(STORE_CHAPTER_DATA, `${bookId}:${chapterId}:${altLang}`)) ||
    (await idbGet<{ key: string; data: ChapterHadithsResponse }>(STORE_CHAPTER_DATA, `${bookId}:${chapterId}:ar`));
  if (altCached?.data?.hadiths?.length && !isOnlineNow()) {
    return altCached.data;
  }

  // 2. Check bundled offline core books (nawawi, qudsi, dehlawi) and starter chapters (Chapter 1 of all 14 books)
  const coreBooks = await getOfflineCoreBooks();
  if (coreBooks?.[bookId]) {
    const core = coreBooks[bookId];
    const targetChId = String(core.chapterId || chapterId);
    if (String(chapterId) === targetChId || ['nawawi', 'qudsi', 'dehlawi'].includes(bookId)) {
      const hadiths = hydrateBundledHadithList(bookId, targetChId, core.hadiths || [], lang);
      const payload: ChapterHadithsResponse = {
        bookId,
        chapterId: targetChId,
        titleEn: String(core.titleEn || bookId),
        titleBn: translateChapterNameBn(String(core.titleEn || ''), targetChId),
        langCode: lang === 'bn' && hadiths[0]?.hasNativeBangla ? 'ben' : 'eng',
        hadiths,
      };
      await idbPut(STORE_CHAPTER_DATA, { key: storageKey, data: payload });
      return payload;
    }
  }

  const starterChapters = await getOfflineStarterChapters();
  if (starterChapters?.[bookId] && String(starterChapters[bookId].chapterId) === String(chapterId)) {
    const st = starterChapters[bookId];
    const hadiths = hydrateBundledHadithList(bookId, String(chapterId), st.hadiths || [], lang);
    // If online, only return starter immediately if offline; when online let server give FULL chapter (if >15 hadiths)!
    if (!isOnlineNow() && hadiths.length > 0) {
      return {
        bookId,
        chapterId,
        titleEn: String(st.titleEn || `Chapter ${chapterId}`),
        titleBn: translateChapterNameBn(String(st.titleEn || ''), chapterId),
        titleAr: st.titleAr || '',
        langCode: lang === 'bn' && hadiths[0]?.hasNativeBangla ? 'ben' : 'eng',
        hadiths,
      };
    }
  }

  // 3. Online fetch from Server API
  if (isOnlineNow()) {
    try {
      const controller = new AbortController();
      const tId = setTimeout(() => controller.abort(), 9000);
      const res = await fetch(
        `/api/hadis/books/${encodeURIComponent(bookId)}/chapters/${encodeURIComponent(chapterId)}?lang=${encodeURIComponent(lang)}`,
        { signal: controller.signal }
      );
      clearTimeout(tId);
      if (res.ok) {
        const data = (await res.json()) as ChapterHadithsResponse;
        if (data && Array.isArray(data.hadiths) && data.hadiths.length > 0) {
          await idbPut(STORE_CHAPTER_DATA, { key: storageKey, data });
          return data;
        }
      }
    } catch {}

    // Direct CDN fallback for fawazahmed0 books
    const bookDef = HADIS_LIBRARY_BOOKS.find((b) => b.id === bookId);
    if (bookDef?.source === 'fawaz' && bookDef.fawazKey) {
      try {
        const k = bookDef.fawazKey;
        const langPrefix = lang === 'bn' && bookDef.hasNativeBangla ? 'ben' : 'eng';
        const [araRes, trRes] = await Promise.all([
          fetch(`${FAWAZ_CDN}/editions/ara-${k}/sections/${chapterId}.min.json`).then((r) => (r.ok ? r.json() : null)).catch(() => null),
          fetch(`${FAWAZ_CDN}/editions/${langPrefix}-${k}/sections/${chapterId}.min.json`).then((r) => (r.ok ? r.json() : null)).catch(() => null),
        ]);
        const list = trRes?.hadiths || araRes?.hadiths || [];
        if (list.length > 0) {
          const araMap = new Map<string, any>((araRes?.hadiths || []).map((x: any) => [String(x.hadithnumber), x]));
          const secMap = trRes?.metadata?.section || araRes?.metadata?.section || {};
          const titleEn = String(secMap[chapterId] || `Chapter ${chapterId}`);

          const hadiths: FullHadithEntry[] = list.map((h: any, idx: number) => {
            const key = String(h?.hadithnumber ?? idx + 1);
            const ara = araMap.get(key);
            return {
              uid: `${bookId}_${key}`,
              bookId,
              chapterId,
              hadithNumber: h?.hadithnumber ?? idx + 1,
              arabicNumber: h?.arabicnumber ?? h?.hadithnumber ?? idx + 1,
              arabicText: String(ara?.text || '').trim(),
              translationText: String(h?.text || '').trim(),
              hasNativeBangla: langPrefix === 'ben',
              grades: Array.isArray(h?.grades) ? h.grades : [],
              gradeLabel: bookId === 'bukhari' || bookId === 'muslim' ? (lang === 'bn' ? 'সহীহ' : 'Sahih') : h?.grades?.[0]?.grade || 'Sahih',
              gradeType: 'sahih',
            };
          });

          const payload: ChapterHadithsResponse = {
            bookId,
            chapterId,
            titleEn,
            titleBn: translateChapterNameBn(titleEn, chapterId),
            langCode: langPrefix,
            hadiths,
          };
          await idbPut(STORE_CHAPTER_DATA, { key: storageKey, data: payload });
          return payload;
        }
      } catch {}
    }
  }

  // 4. Fallback to cached alt language or starter chapter if network failed
  if (altCached?.data?.hadiths?.length) {
    return altCached.data;
  }
  if (starterChapters?.[bookId] && String(starterChapters[bookId].chapterId) === String(chapterId)) {
    const st = starterChapters[bookId];
    const hadiths = hydrateBundledHadithList(bookId, String(chapterId), st.hadiths || [], lang);
    if (hadiths.length > 0) {
      return {
        bookId,
        chapterId,
        titleEn: String(st.titleEn || `Chapter ${chapterId}`),
        titleBn: translateChapterNameBn(String(st.titleEn || ''), chapterId),
        titleAr: st.titleAr || '',
        langCode: lang === 'bn' && hadiths[0]?.hasNativeBangla ? 'ben' : 'eng',
        hadiths,
      };
    }
  }

  throw new Error(
    isOnlineNow()
      ? 'এই অধ্যায়ের হাদিস লোড করা যায়নি'
      : 'এই অধ্যায়টি এখনো ডিভাইসে অফলাইন সেভ করা নেই'
  );
}

export async function searchBookHadiths(
  bookId: string,
  query: string,
  lang: string = 'bn'
): Promise<{ results: FullHadithEntry[]; totalMatches: number; fromOffline?: boolean }> {
  const cleanQ = query.trim();
  if (!cleanQ) return { results: [], totalMatches: 0 };

  if (isOnlineNow()) {
    try {
      const controller = new AbortController();
      const tId = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(
        `/api/hadis/books/${encodeURIComponent(bookId)}/search?q=${encodeURIComponent(cleanQ)}&lang=${encodeURIComponent(lang)}&limit=60`,
        { signal: controller.signal }
      );
      clearTimeout(tId);
      if (res.ok) {
        return await res.json();
      }
    } catch {}
  }

  // Offline / Fallback Search across IndexedDB cached chapters + pre-bundled offline packs + curated hadiths
  const qLower = cleanQ.toLowerCase();
  const isPureNumber = /^\d+(?:\.\d+)?$/.test(cleanQ);
  const pool: FullHadithEntry[] = [];
  const seenUids = new Set<string>();

  const pushEntry = (e: FullHadithEntry) => {
    if (!seenUids.has(e.uid)) {
      seenUids.add(e.uid);
      pool.push(e);
    }
  };

  // Search IndexedDB stored chapters for this book
  const allChapters = await idbGetAll<{ key: string; data: ChapterHadithsResponse }>(STORE_CHAPTER_DATA);
  for (const item of allChapters) {
    if (item?.key?.startsWith(`${bookId}:`) && Array.isArray(item?.data?.hadiths)) {
      for (const h of item.data.hadiths) pushEntry(h);
    }
  }

  // Search pre-bundled core books & starter chapters
  const [coreBooks, starters] = await Promise.all([
    getOfflineCoreBooks(),
    getOfflineStarterChapters(),
  ]);
  if (coreBooks?.[bookId]?.hadiths) {
    for (const h of hydrateBundledHadithList(bookId, String(coreBooks[bookId].chapterId || '1'), coreBooks[bookId].hadiths, lang)) {
      pushEntry(h);
    }
  }
  if (starters?.[bookId]?.hadiths) {
    for (const h of hydrateBundledHadithList(bookId, String(starters[bookId].chapterId || '1'), starters[bookId].hadiths, lang)) {
      pushEntry(h);
    }
  }

  // Include curated Sahih hadiths matching this book
  for (const h of getCuratedOfflineHadithsForBook(bookId, lang)) {
    pushEntry(h);
  }

  const matched = pool.filter((h) => {
    if (isPureNumber) {
      return (
        String(h.hadithNumber) === cleanQ ||
        Math.floor(Number(h.hadithNumber)) === Math.floor(Number(cleanQ)) ||
        String(h.arabicNumber) === cleanQ
      );
    }
    return (
      h.translationText.toLowerCase().includes(qLower) ||
      (h.englishText || '').toLowerCase().includes(qLower) ||
      h.arabicText.includes(cleanQ) ||
      (h.narrator || '').toLowerCase().includes(qLower)
    );
  });

  return {
    results: matched.slice(0, 60),
    totalMatches: matched.length,
    fromOffline: true,
  };
}

export async function downloadEntireBookOffline(
  bookId: string,
  lang: string,
  onProgress: (done: number, total: number) => void,
  signal?: AbortSignal
): Promise<OfflineBookStatus> {
  // Fast bulk single-request path via /api/hadis/books/:bookId/bundle
  try {
    onProgress(0, 100);
    const res = await fetch(
      `/api/hadis/books/${encodeURIComponent(bookId)}/bundle?lang=${encodeURIComponent(lang)}`,
      { signal }
    );
    if (res.ok) {
      const bundle = await res.json();
      const chapters: HadisChapterMeta[] = Array.isArray(bundle?.chapters) ? bundle.chapters : [];
      const payloads: Record<string, ChapterHadithsResponse> = bundle?.chapterPayloads || {};
      const total = Math.max(1, chapters.length);

      const itemsToStore: Array<{ storeName: string; value: any }> = [
        { storeName: STORE_CHAPTERS, value: { bookId, chapters } },
      ];

      let count = 0;
      for (const ch of chapters) {
        const chPayload = payloads[ch.chapterId];
        if (chPayload) {
          itemsToStore.push({
            storeName: STORE_CHAPTER_DATA,
            value: { key: `${bookId}:${ch.chapterId}:${lang}`, data: chPayload },
          });
        }
        count += 1;
      }

      onProgress(Math.max(1, Math.round(total * 0.7)), total);
      await idbPutMany(itemsToStore);
      onProgress(total, total);

      const status: OfflineBookStatus = {
        bookId,
        downloadedChapters: total,
        totalChapters: total,
        completed: true,
        updatedAt: Date.now(),
      };
      await idbPut(STORE_OFFLINE_BOOKS, status);
      return status;
    }
  } catch (err: any) {
    if (err?.name === 'AbortError' || signal?.aborted) {
      throw new Error('অফলাইন ডাউনলোড বাতিল করা হয়েছে');
    }
  }

  // Fallback per-chapter batched download
  const chapters = await fetchBookChapters(bookId);
  const total = chapters.length;
  let done = 0;
  onProgress(0, total);

  const batchSize = 4;
  for (let i = 0; i < chapters.length; i += batchSize) {
    if (signal?.aborted) {
      throw new Error('অফলাইন ডাউনলোড বাতিল করা হয়েছে');
    }
    const batch = chapters.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (ch) => {
        if (signal?.aborted) return;
        await fetchChapterHadiths(bookId, ch.chapterId, lang);
        done += 1;
        onProgress(done, total);
      })
    );
  }

  const status: OfflineBookStatus = {
    bookId,
    downloadedChapters: total,
    totalChapters: total,
    completed: true,
    updatedAt: Date.now(),
  };
  await idbPut(STORE_OFFLINE_BOOKS, status);
  return status;
}

let prewarmRan = false;

/**
 * Automatically pre-caches all 17 book Table of Contents, complete 40-Hadith books
 * (Nawawi, Qudsi, Dehlawi), and opening chapters of Kutub al-Sittah into IndexedDB
 * so Hadiths work seamlessly offline even if the user never clicked Download.
 */
export async function prewarmCoreHadithsOffline(lang: string = 'bn'): Promise<void> {
  if (prewarmRan) return;
  prewarmRan = true;

  try {
    const [idx, core, starters] = await Promise.all([
      getOfflineChaptersIndex(),
      getOfflineCoreBooks(),
      getOfflineStarterChapters(),
    ]);

    const items: Array<{ storeName: string; value: any }> = [];

    if (idx) {
      const existingKeys = new Set(await idbGetAllKeys(STORE_CHAPTERS));
      for (const [bookId, rawList] of Object.entries(idx)) {
        if (!existingKeys.has(bookId) && Array.isArray(rawList) && rawList.length > 0) {
          const chapters: HadisChapterMeta[] = rawList.map((c: any) => ({
            chapterId: String(c.chapterId),
            titleEn: String(c.titleEn || `Chapter ${c.chapterId}`),
            titleBn: translateChapterNameBn(String(c.titleEn || ''), String(c.chapterId)),
            titleAr: String(c.titleAr || ''),
            hadithFirst: Number(c.hadithFirst || 1),
            hadithLast: Number(c.hadithLast || 1),
            count: Number(c.count || 1),
          }));
          items.push({ storeName: STORE_CHAPTERS, value: { bookId, chapters } });
        }
      }
    }

    if (core) {
      for (const [bookId, entry] of Object.entries(core)) {
        const chId = String(entry?.chapterId || '1');
        const hadiths = hydrateBundledHadithList(bookId, chId, entry?.hadiths || [], lang);
        if (hadiths.length > 0) {
          items.push({
            storeName: STORE_CHAPTER_DATA,
            value: {
              key: `${bookId}:${chId}:${lang}`,
              data: {
                bookId,
                chapterId: chId,
                titleEn: String(entry.titleEn || bookId),
                titleBn: translateChapterNameBn(String(entry.titleEn || ''), chId),
                langCode: lang === 'bn' && hadiths[0]?.hasNativeBangla ? 'ben' : 'eng',
                hadiths,
              },
            },
          });
          items.push({
            storeName: STORE_OFFLINE_BOOKS,
            value: {
              bookId,
              downloadedChapters: 1,
              totalChapters: 1,
              completed: true,
              updatedAt: Date.now(),
            },
          });
        }
      }
    }

    if (starters) {
      const existingDataKeys = new Set(await idbGetAllKeys(STORE_CHAPTER_DATA));
      for (const [bookId, entry] of Object.entries(starters)) {
        const chId = String(entry?.chapterId || '1');
        const key = `${bookId}:${chId}:${lang}`;
        if (!existingDataKeys.has(key)) {
          const hadiths = hydrateBundledHadithList(bookId, chId, entry?.hadiths || [], lang);
          if (hadiths.length > 0) {
            items.push({
              storeName: STORE_CHAPTER_DATA,
              value: {
                key,
                data: {
                  bookId,
                  chapterId: chId,
                  titleEn: String(entry.titleEn || `Chapter ${chId}`),
                  titleBn: translateChapterNameBn(String(entry.titleEn || ''), chId),
                  titleAr: entry.titleAr || '',
                  langCode: lang === 'bn' && hadiths[0]?.hasNativeBangla ? 'ben' : 'eng',
                  hadiths,
                },
              },
            });
          }
        }
      }
    }

    if (items.length > 0) {
      await idbPutMany(items);
    }
  } catch {}
}
