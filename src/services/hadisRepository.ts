import { HADIS_LIBRARY_BOOKS, translateChapterNameBn } from '../data/hadisCatalog';

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

function openHadisDb(): Promise<IDBDatabase | null> {
  if (typeof indexedDB === 'undefined') return Promise.resolve(null);
  return new Promise((resolve) => {
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
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
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

export async function getAllOfflineBookStatuses(): Promise<Record<string, OfflineBookStatus>> {
  const db = await openHadisDb();
  if (!db) return {};
  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_OFFLINE_BOOKS, 'readonly');
      const store = tx.objectStore(STORE_OFFLINE_BOOKS);
      const req = store.getAll();
      req.onsuccess = () => {
        const list = (req.result || []) as OfflineBookStatus[];
        const map: Record<string, OfflineBookStatus> = {};
        list.forEach((item) => {
          if (item?.bookId) map[item.bookId] = item;
        });
        resolve(map);
      };
      req.onerror = () => resolve({});
    } catch {
      resolve({});
    }
  });
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

  try {
    const res = await fetch(`/api/hadis/books/${encodeURIComponent(bookId)}/chapters`);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.chapters) && data.chapters.length > 0) {
        await idbPut(STORE_CHAPTERS, { bookId, chapters: data.chapters });
        return data.chapters;
      }
    }
  } catch {}

  // Direct CDN fallback for fawazahmed0 books
  const bookDef = HADIS_LIBRARY_BOOKS.find((b) => b.id === bookId);
  if (bookDef?.source === 'fawaz' && bookDef.fawazKey) {
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
  }

  throw new Error('অধ্যায়ের তালিকা লোড করা যায়নি');
}

export async function fetchChapterHadiths(
  bookId: string,
  chapterId: string,
  lang: string = 'bn'
): Promise<ChapterHadithsResponse> {
  const storageKey = `${bookId}:${chapterId}:${lang}`;
  const cached = await idbGet<{ key: string; data: ChapterHadithsResponse }>(STORE_CHAPTER_DATA, storageKey);
  if (cached?.data?.hadiths?.length) {
    return cached.data;
  }

  try {
    const res = await fetch(
      `/api/hadis/books/${encodeURIComponent(bookId)}/chapters/${encodeURIComponent(chapterId)}?lang=${encodeURIComponent(lang)}`
    );
    if (res.ok) {
      const data = (await res.json()) as ChapterHadithsResponse;
      if (data && Array.isArray(data.hadiths)) {
        await idbPut(STORE_CHAPTER_DATA, { key: storageKey, data });
        return data;
      }
    }
  } catch {}

  // Direct CDN fallback for fawazahmed0 books
  const bookDef = HADIS_LIBRARY_BOOKS.find((b) => b.id === bookId);
  if (bookDef?.source === 'fawaz' && bookDef.fawazKey) {
    const k = bookDef.fawazKey;
    const langPrefix = lang === 'bn' && bookDef.hasNativeBangla ? 'ben' : 'eng';
    const [araRes, trRes] = await Promise.all([
      fetch(`${FAWAZ_CDN}/editions/ara-${k}/sections/${chapterId}.min.json`).then((r) => (r.ok ? r.json() : null)).catch(() => null),
      fetch(`${FAWAZ_CDN}/editions/${langPrefix}-${k}/sections/${chapterId}.min.json`).then((r) => (r.ok ? r.json() : null)).catch(() => null),
    ]);
    const list = trRes?.hadiths || araRes?.hadiths || [];
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

  throw new Error('এই অধ্যায়ের হাদিস লোড করা যায়নি');
}

export async function searchBookHadiths(
  bookId: string,
  query: string,
  lang: string = 'bn'
): Promise<{ results: FullHadithEntry[]; totalMatches: number }> {
  const cleanQ = query.trim();
  if (!cleanQ) return { results: [], totalMatches: 0 };

  const res = await fetch(
    `/api/hadis/books/${encodeURIComponent(bookId)}/search?q=${encodeURIComponent(cleanQ)}&lang=${encodeURIComponent(lang)}&limit=60`
  );
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err?.error || 'হাদিস খোঁজা সম্ভব হয়নি');
  }
  return await res.json();
}

export async function downloadEntireBookOffline(
  bookId: string,
  lang: string,
  onProgress: (done: number, total: number) => void,
  signal?: AbortSignal
): Promise<OfflineBookStatus> {
  const chapters = await fetchBookChapters(bookId);
  const total = chapters.length;
  let done = 0;
  onProgress(0, total);

  const batchSize = 3;
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
