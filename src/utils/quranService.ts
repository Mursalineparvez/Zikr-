import { ALL_114_SURAHS, SurahMeta } from './quran114List';
import { ZikrLanguage } from '../types';
import { QURAN_EDITIONS } from './appTranslations';
import { OFFLINE_FALLBACK_SURAHS } from './offlineQuranSurahs';
import { normalizeArabicPronunciationBn } from './transliterationHelper';

export interface QuranWord {
  id?: number;
  position: number;
  arabic: string;
  translation: string;
  transliteration?: string;
  audioUrl?: string;
  startMs?: number;
  endMs?: number;
}

export interface QuranAyahTranslation {
  translator: string;
  text: string;
  sourceId?: string;
}

export interface QuranAyah {
  number: number;
  globalNumber: number;
  arabic: string;
  transliteration: string;
  translation: string;
  translations?: QuranAyahTranslation[];
  words?: QuranWord[];
  juz: number;
  page: number;
  sajda: boolean;
  audioUrl: string;
  tafsir?: string;
}

export interface QuranSurahDetail extends SurahMeta {
  ayahs: QuranAyah[];
  language?: ZikrLanguage;
}

export interface Reciter {
  id: string;
  name: string;
  arabicName: string;
  subtext: string;
  category?: 'makkah' | 'egypt' | 'melodic' | 'slow';
  surahAudioBase?: string;
  is114SurahsVerified?: boolean;
}

export const QURAN_RECITERS: Reciter[] = [
  {
    id: 'ar.alafasy',
    name: 'Mishary Rashid Alafasy',
    arabicName: 'مشاري بن راشد العفاسي',
    subtext: 'সুমধুর ও স্পষ্ট তারতীল (কুয়েত) • ১১৪টি সূরা সম্পূর্ণ',
    category: 'melodic',
    is114SurahsVerified: true,
  },
  {
    id: 'ar.abdurrahmaansudais',
    name: 'Abdul Rahman Al-Sudais',
    arabicName: 'عبد الرحمن السديس',
    subtext: 'মসজিদুল হারাম মক্কার তারাবীহ স্টাইল • ১১৪টি সূরা সম্পূর্ণ',
    category: 'makkah',
    is114SurahsVerified: true,
  },
  {
    id: 'ar.minshawi',
    name: 'Mohamed Siddiq El-Minshawi',
    arabicName: 'محمد صديق المنشاوي',
    subtext: 'হৃদয়স্পর্শী মিশরীয় তারতীল ও তাজবীদ • ১১৪টি সূরা সম্পূর্ণ',
    category: 'egypt',
    is114SurahsVerified: true,
  },
  {
    id: 'ar.husary',
    name: 'Mahmoud Khalil Al-Husary',
    arabicName: 'محمود خليل الحصري',
    subtext: 'বিশুদ্ধতম শিক্ষণীয় শিক্ষকসুলভ তাজবীদ • ১১৪টি সূরা সম্পূর্ণ',
    category: 'slow',
    is114SurahsVerified: true,
  },
  {
    id: 'ar.saadalghamidi',
    name: 'Saad Al-Ghamdi',
    arabicName: 'سعد الغامدي',
    subtext: 'স্নিগ্ধ, মৃদু ও হৃদয়জুড়ানো ছন্দময় তিলাওয়াত • ১১৪টি সূরা সম্পূর্ণ',
    category: 'melodic',
    is114SurahsVerified: true,
  },
  {
    id: 'ar.shaatree',
    name: 'Abu Bakr Ash-Shatri',
    arabicName: 'أبو بكر الشاطري',
    subtext: 'ধীরস্থির, গম্ভীর ও ভক্তিপূর্ণ বিনম্র পাঠ • ১১৪টি সূরা সম্পূর্ণ',
    category: 'slow',
    is114SurahsVerified: true,
  },
];

export const EVERY_AYAH_RECITER_MAP: Record<string, string> = {
  'ar.alafasy': 'Alafasy_128kbps',
  'ar.abdurrahmaansudais': 'Abdurrahmaan_As-Sudais_192kbps',
  'ar.minshawi': 'Minshawy_Murattal_128kbps',
  'ar.husary': 'Husary_128kbps',
  'ar.saadalghamidi': 'Ghamadi_40kbps',
  'ar.shaatree': 'Abu_Bakr_Ash-Shaatree_128kbps',
};

export const QURAN_COM_RECITER_MAP: Record<string, number> = {
  'ar.alafasy': 7,
  'ar.abdurrahmaansudais': 3,
  'ar.minshawi': 9,
  'ar.husary': 6,
  'ar.saadalghamidi': 12,
  'ar.shaatree': 4,
};

export function getReciterAudioUrls(
  reciterId: string,
  surahNumber: number,
  verseNumber: number,
  globalNumber: number
): { primary: string; secondary: string } {
  const folder = EVERY_AYAH_RECITER_MAP[reciterId] || 'Alafasy_128kbps';
  const surahPadded = String(surahNumber).padStart(3, '0');
  const ayahPadded = String(verseNumber).padStart(3, '0');
  const fileKey = `${surahPadded}${ayahPadded}.mp3`;

  // Ultra-fast Global Edge CDN endpoints (average 46ms - 150ms response times)
  let primary = `https://everyayah.com/data/${folder}/${fileKey}`;
  if (reciterId === 'ar.alafasy') {
    primary = `https://audio.qurancdn.com/Alafasy/mp3/${fileKey}`;
  } else if (reciterId === 'ar.abdurrahmaansudais') {
    primary = `https://audio.qurancdn.com/Sudais/mp3/${fileKey}`;
  } else if (reciterId === 'ar.minshawi') {
    primary = `https://audio.qurancdn.com/Minshawi/Murattal/mp3/${fileKey}`;
  } else if (reciterId === 'ar.shaatree') {
    primary = `https://audio.qurancdn.com/Shatri/mp3/${fileKey}`;
  } else if (reciterId === 'ar.husary') {
    primary = `https://cdn.islamic.network/quran/audio/128/ar.husary/${globalNumber}.mp3`;
  }

  const secondary = `https://everyayah.com/data/${folder}/${fileKey}`;
  return { primary, secondary };
}

export interface TafsirOption {
  id: number;
  nameBn: string;
  nameEn: string;
  language: ZikrLanguage;
  author: string;
}

export const AVAILABLE_TAFSIRS: TafsirOption[] = [
  // Bengali Options
  { id: 164, nameBn: 'তাফসীর ইবনে কাছীর (তাওহীদ পাবলিকেশন্স)', nameEn: 'Tafsir Ibn Kathir (Bengali)', language: 'bn', author: 'হাফেয ইবনে কাছীর (রঃ)' },
  { id: 165, nameBn: 'তাফসীর আহসানুল বায়ান (বয়ান ফাউন্ডেশন)', nameEn: 'Tafsir Ahsanul Bayaan (Bengali)', language: 'bn', author: 'বয়ান ফাউন্ডেশন' },
  { id: 166, nameBn: 'তাফসীর আবু বকর যাকারিয়া (কিং ফাহাদ প্রেস)', nameEn: 'Tafsir Abu Bakr Zakaria (Bengali)', language: 'bn', author: 'ড. আবু বকর যাকারিয়া' },
  { id: 381, nameBn: 'তাফসীর ফাতহুল মাজীদ', nameEn: 'Tafsir Fathul Majid (Bengali)', language: 'bn', author: 'আব্দুর রহমান বিন হাসান' },

  // English Options
  { id: 169, nameBn: 'Tafsir Ibn Kathir (English)', nameEn: 'Tafsir Ibn Kathir (English)', language: 'en', author: 'Hafiz Ibn Kathir' },
  { id: 168, nameBn: 'Ma\'arif al-Qur\'an (English)', nameEn: 'Ma\'arif al-Qur\'an (English)', language: 'en', author: 'Mufti Muhammad Shafi' },
  { id: 817, nameBn: 'Tazkirul Quran (English)', nameEn: 'Tazkirul Quran (English)', language: 'en', author: 'Maulana Wahiduddin Khan' },

  // Arabic Options
  { id: 14, nameBn: 'تفسير ابن كثير (العربية)', nameEn: 'Tafsir Ibn Kathir (Arabic)', language: 'ar', author: 'الحافظ ابن كثير' },
  { id: 16, nameBn: 'التفسير الميسر (مجمع الملك فهد)', nameEn: 'Al-Tafsir Al-Muyassar (Arabic)', language: 'ar', author: 'مجمع الملك فهد' },
  { id: 15, nameBn: 'تفسير الطبري (الإمام الطبري)', nameEn: 'Tafsir al-Tabari (Arabic)', language: 'ar', author: 'الإمام الطبري' },
  { id: 90, nameBn: 'تفسير القرطبي (الإمام القرطبي)', nameEn: 'Al-Qurtubi (Arabic)', language: 'ar', author: 'الإمام القرطبي' },
  { id: 91, nameBn: 'تفسير السعدي (الشيخ السعدي)', nameEn: 'Tafsir As-Sa\'di (Arabic)', language: 'ar', author: 'الشيخ عبدالرحمن السعدي' },

  // Urdu Options
  { id: 160, nameBn: 'تفسیر ابن کثیر (اردو)', nameEn: 'Tafsir Ibn Kathir (Urdu)', language: 'ur', author: 'حافظ ابن کثیر' },
  { id: 159, nameBn: 'بیان القرآن (ڈاکٹر اسرار احمد)', nameEn: 'Bayan ul Quran (Urdu)', language: 'ur', author: 'ڈاکٹر اسرار احمد' },
  { id: 818, nameBn: 'تذکیر القرآن (مولانا وحید الدین خان)', nameEn: 'Tazkir ul Quran (Urdu)', language: 'ur', author: 'مولانا وحید الدین خان' },

  // Russian
  { id: 170, nameBn: 'Тафсир ас-Саади (Русский)', nameEn: 'Al-Sa\'di (Russian)', language: 'ru', author: 'Шейх ас-Саади' },
];

export const DEFAULT_TAFSIR_BY_LANG: Record<ZikrLanguage, number> = {
  bn: 164, // Tafseer ibn Kathir Bengali
  en: 169, // Tafsir Ibn Kathir English
  ar: 14,  // Tafsir Ibn Kathir Arabic
  ur: 160, // Tafsir Ibn Kathir Urdu
  ru: 170, // Al-Sa'di Russian
  hi: 169,
  id: 169,
  tr: 169,
  ms: 169,
  fr: 169,
  es: 169,
  fa: 160,
  de: 169,
  sw: 169,
};

export const POPULAR_SURAHS_NUMBERS = [1, 2, 18, 19, 36, 55, 56, 67, 112, 113, 114];

export const TRANSLATOR_NAMES_MAP: Record<string, { bn: string; en: string }> = {
  '163': {
    bn: 'তাফসীরে তাওযীহুল কুরআন - মুফতী তাকী ওসমানী',
    en: 'Tawzeeh-ul-Quran - Mufti Taqi Usmani',
  },
  '213': {
    bn: 'তাফসীর ড. আবু বকর মুহাম্মাদ যাকারিয়া',
    en: 'Tafsir Dr. Abu Bakr Muhammad Zakaria',
  },
  '161': {
    bn: 'শায়খ মুজিবুর রহমান',
    en: 'Sheikh Mujibur Rahman',
  },
  '235': {
    bn: 'আহসানুল বায়ান',
    en: 'Ahsanul Bayaan',
  },
  '20': {
    bn: 'সহীহ ইন্টারন্যাশনাল',
    en: 'Saheeh International',
  },
  '131': {
    bn: 'ড. মোস্তফা খাত্তাব (দ্য ক্লিয়ার কুরআন)',
    en: 'Dr. Mustafa Khattab (The Clear Quran)',
  },
};

const CACHE_PREFIX = 'zikrmate_quran_cache_v14_dual_trans_';

function cleanVerse1Arabic(surahNumber: number, verseNumber: number, text: string): string {
  if (surahNumber !== 1 && surahNumber !== 9 && verseNumber === 1) {
    return text.replace(/^(?:﻿)?بِسْمِ\s*ٱللَّهِ\s*ٱلرَّحْمَٰنِ\s*ٱلرَّحِيمِ\s*/u, '').trim();
  }
  return text.trim();
}

const memorySurahCache = new Map<string, QuranSurahDetail>();

export function getCachedSurah(surahNumber: number, reciterId: string = 'ar.alafasy', language: ZikrLanguage = 'bn'): QuranSurahDetail | null {
  const memKey = `${language}_${surahNumber}`;

  // 1. Ultra-fast In-Memory RAM cache (0 milliseconds)
  const inMem = memorySurahCache.get(memKey);
  if (inMem && inMem.ayahs && inMem.ayahs.length > 0) {
    const updatedAyahs = inMem.ayahs.map((ayah) => ({
      ...ayah,
      audioUrl: getReciterAudioUrls(reciterId, surahNumber, ayah.number, ayah.globalNumber).primary,
    }));
    return {
      ...inMem,
      audioUrl: getReciterAudioUrls(reciterId, surahNumber, 1, 1).primary,
      ayahs: updatedAyahs,
      language,
    };
  }

  // 2. LocalStorage cache (independent of reciter so text is shared and instant)
  const candidateKeys = [
    `${CACHE_PREFIX}${language}_${surahNumber}`,
  ];
  for (const rawKey of candidateKeys) {
    try {
      const raw = localStorage.getItem(rawKey);
      if (raw) {
        const parsed = JSON.parse(raw) as QuranSurahDetail;
        if (parsed && parsed.ayahs && parsed.ayahs.length > 0) {
          memorySurahCache.set(memKey, parsed);
          const updatedAyahs = parsed.ayahs.map((ayah) => ({
            ...ayah,
            audioUrl: getReciterAudioUrls(reciterId, surahNumber, ayah.number, ayah.globalNumber).primary,
          }));
          return {
            ...parsed,
            audioUrl: getReciterAudioUrls(reciterId, surahNumber, 1, 1).primary,
            ayahs: updatedAyahs,
            language,
          };
        }
      }
    } catch {}
  }

  // 3. Pre-embedded instant offline fallback dataset if available
  if (OFFLINE_FALLBACK_SURAHS[surahNumber]) {
    const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
    if (meta) {
      const baseAyahs = OFFLINE_FALLBACK_SURAHS[surahNumber];
      const ayahs: QuranAyah[] = baseAyahs.map((ayah) => {
        const parts = (ayah.translation || '').split(' • ');
        const engText = parts[0] || ayah.translation;
        const bnText = parts[1] || parts[0] || '';
        const selectedTrans = language === 'bn' ? bnText : engText;
        const words = ayah.words && ayah.words.length > 0 ? ayah.words : generateFallbackWords(ayah.arabic, selectedTrans, language);

        const fallbackTranslations: QuranAyahTranslation[] = language === 'bn' ? [
          { translator: 'তাফসীরে তাওযীহুল কুরআন - মুফতী তাকী ওসমানী', text: bnText },
          { translator: 'তাফসীর ড. আবু বকর মুহাম্মাদ যাকারিয়া', text: bnText },
        ] : [
          { translator: 'Saheeh International', text: engText },
        ];

        return {
          ...ayah,
          translation: selectedTrans,
          translations: fallbackTranslations,
          words,
          audioUrl: getReciterAudioUrls(reciterId, surahNumber, ayah.number, ayah.globalNumber).primary,
        };
      });
      const instantDetail: QuranSurahDetail = {
        ...meta,
        audioUrl: getReciterAudioUrls(reciterId, surahNumber, 1, 1).primary,
        ayahs,
        language,
      };
      memorySurahCache.set(memKey, instantDetail);
      return instantDetail;
    }
  }

  return null;
}

export function saveCachedSurah(surah: QuranSurahDetail, reciterId: string = 'ar.alafasy', language: ZikrLanguage = 'bn'): void {
  const memKey = `${language}_${surah.number}`;
  memorySurahCache.set(memKey, surah);
  const rawKey = `${CACHE_PREFIX}${language}_${surah.number}`;
  try {
    localStorage.setItem(rawKey, JSON.stringify(surah));
  } catch (err) {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('zikrmate_quran_cache_')) {
          localStorage.removeItem(key);
        }
      }
      localStorage.setItem(rawKey, JSON.stringify(surah));
    } catch {}
  }
}

const COMMON_WORD_DICTIONARY: Record<string, { bn: string; en: string }> = {
  'بِسْمِ': { bn: 'আল্লাহর নামে', en: 'In the name' },
  'ٱللَّهِ': { bn: 'আল্লাহর', en: 'of Allah' },
  'ٱلرَّحْمَٰنِ': { bn: 'পরম করুণাময়', en: 'the Entirely Merciful' },
  'ٱلرَّحِيمِ': { bn: 'অসীম দয়ালু', en: 'the Especially Merciful' },
  'ٱلْحَمْدُ': { bn: 'সমস্ত প্রশংসা', en: 'All praise' },
  'لِلَّهِ': { bn: 'আল্লাহর জন্য', en: 'is to Allah' },
  'رَبِّ': { bn: 'প্রতিপালক', en: 'Lord' },
  'ٱلْعَٰلَمِينَ': { bn: 'বিশ্বজগতের', en: 'of the worlds' },
  'مَٰلِكِ': { bn: 'মালিক', en: 'Sovereign' },
  'يَوْمِ': { bn: 'দিন', en: 'Day' },
  'ٱلدِّينِ': { bn: 'বিচার', en: 'of Recompense' },
  'إِيَّاكَ': { bn: 'শুধু আপনার', en: 'You alone' },
  'نَعْبُدُ': { bn: 'আমরা ইবাদত করি', en: 'we worship' },
  'وَإِيَّاكَ': { bn: 'এবং আপনারই', en: 'and You alone' },
  'نَسْتَعِينُ': { bn: 'সাহায্য চাই', en: 'we ask for help' },
  'ٱهْدِنَا': { bn: 'আমাদের দেখান', en: 'Guide us' },
  'ٱلصِّرَٰطَ': { bn: 'পথ', en: 'to the path' },
  'ٱلْمُسْتَقِيمَ': { bn: 'সরল সঠিক', en: 'straight' },
  'قُلْ': { bn: 'বলুন', en: 'Say' },
  'هُوَ': { bn: 'তিনি', en: 'He is' },
  'أَحَدٌ': { bn: 'একক ও অদ্বিতীয়', en: 'One' },
  'ٱلصَّمَدُ': { bn: 'অমুখাপেক্ষী', en: 'the Eternal Refuge' },
  'لَمْ': { bn: 'না', en: 'did not' },
  'يَلِدْ': { bn: 'জন্ম দিয়েছেন', en: 'beget' },
  'وَلَمْ': { bn: 'এবং না', en: 'nor' },
  'يُولَدْ': { bn: 'জন্ম নিয়েছেন', en: 'is born' },
  'يَكُن': { bn: 'রয়েছে', en: 'is' },
  'لَّهُۥ': { bn: 'তাঁর', en: 'to Him' },
  'كُفُوًا': { bn: 'সমকক্ষ', en: 'equivalent' },
  'أَعُوذُ': { bn: 'আশ্রয় চাই', en: 'I seek refuge' },
  'مِن': { bn: 'থেকে', en: 'from' },
  'شَرِّ': { bn: 'অনিষ্ট', en: 'the evil' },
  'مَا': { bn: 'যা', en: 'of that which' },
  'خَلَقَ': { bn: 'সৃষ্টি করেছেন', en: 'He created' },
  'صِرَٰطَ': { bn: 'পথ', en: 'the path' },
  'ٱلَّذِينَ': { bn: 'যাদের', en: 'of those who' },
  'أَنْعَمْتَ': { bn: 'অনুগ্রহ করেছেন', en: 'You have bestowed favor' },
  'عَلَيْهِمْ': { bn: 'তাদের উপর', en: 'upon them' },
  'غَيْرِ': { bn: 'নয়', en: 'not' },
  'ٱلْمَغْضُوبِ': { bn: 'অভিশপ্ত', en: 'of those who evoked anger' },
  'وَلَا': { bn: 'এবং না', en: 'and not' },
  'ٱلضَّآلِّينَ': { bn: 'পথভ্রষ্ট', en: 'of those who are astray' },
};

function generateFallbackWords(arabicText: string, englishText: string, language: ZikrLanguage = 'bn'): QuranWord[] {
  const arTokens = arabicText.trim().split(/\s+/).filter(Boolean);
  const enTokens = englishText.trim().split(/\s+/).filter(Boolean);
  return arTokens.map((ar, idx) => {
    const cleanAr = ar.replace(/[^\u0600-\u06FF]/g, '');
    const dict = COMMON_WORD_DICTIONARY[ar] || COMMON_WORD_DICTIONARY[cleanAr];
    let translation = '—';
    if (dict) {
      translation = language === 'bn' ? dict.bn : dict.en;
    } else {
      translation = enTokens[idx] || (language === 'bn' ? `শব্দ ${idx + 1}` : `Word ${idx + 1}`);
    }
    return {
      position: idx + 1,
      arabic: ar,
      translation,
      transliteration: '',
    };
  });
}

export async function fetchSurah(
  surahNumber: number,
  reciterId: string = 'ar.alafasy',
  language: ZikrLanguage = 'bn'
): Promise<QuranSurahDetail> {
  const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
  if (!meta) {
    throw new Error(`Surah ${surahNumber} not found in Quran index.`);
  }

  const cached = getCachedSurah(surahNumber, reciterId, language);
  if (cached && cached.ayahs && cached.ayahs.length === meta.numberOfAyahs) {
    const updatedAyahs = cached.ayahs.map((ayah) => ({
      ...ayah,
      audioUrl: getReciterAudioUrls(reciterId, surahNumber, ayah.number, ayah.globalNumber).primary,
    }));
    return {
      ...cached,
      audioUrl: `https://cdn.islamic.network/quran/audio-surah/128/${reciterId}/${surahNumber}.mp3`,
      ayahs: updatedAyahs,
      language,
    };
  }

  const languageTranslationIds: Record<ZikrLanguage, string> = {
    bn: '163,213', // Dual translations for Bengali: Taqi Usmani & Abu Bakr Zakaria
    en: '20,131',  // Dual translations for English: Saheeh International & Dr. Mustafa Khattab
    ur: '234,158',
    ar: '16',
    hi: '122',
    id: '33',
    tr: '77',
    ms: '39',
    fr: '31',
    es: '83',
    ru: '45',
    fa: '135',
    de: '27',
    sw: '232',
  };

  const activeTranslationId = languageTranslationIds[language] || '163,213';

  try {
    const qdcReciterId = QURAN_COM_RECITER_MAP[reciterId] || 7;
    const primaryEdgeUrl = `https://api.qurancdn.com/api/qdc/verses/by_chapter/${surahNumber}?words=true&word_fields=text_uthmani&word_translation_language=${language}&per_page=300&translations=${activeTranslationId}`;
    const fallbackOriginUrl = `https://api.quran.com/api/v4/verses/by_chapter/${surahNumber}?language=${language}&words=true&word_fields=text_uthmani&word_translation_language=${language}&per_page=300&translations=${activeTranslationId}`;
    const recitationsUrl = `https://api.quran.com/api/v4/chapter_recitations/${qdcReciterId}/${surahNumber}?segments=true`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1800);

    // Fire recitations in background without blocking the main verses display at all
    const recPromise = fetch(recitationsUrl)
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null);

    // Ultra-fast Global Edge CDN query (average 150ms-250ms worldwide)
    let qcRes: Response | null = await fetch(primaryEdgeUrl, { signal: controller.signal }).catch(() => null);
    clearTimeout(timeout);

    if (!qcRes || !qcRes.ok) {
      const fallbackController = new AbortController();
      const fallbackTimeout = setTimeout(() => fallbackController.abort(), 2000);
      qcRes = await fetch(fallbackOriginUrl, { signal: fallbackController.signal }).catch(() => null);
      clearTimeout(fallbackTimeout);
    }

    let timestampsMap = new Map<string, any>();

    // Background enhancement: when recitation timings arrive later, update cache seamlessly
    recPromise.then((laterJson) => {
      if (laterJson?.audio_file?.timestamps && Array.isArray(laterJson.audio_file.timestamps)) {
        const memKey = `${language}_${surahNumber}`;
        const existing = memorySurahCache.get(memKey);
        if (existing) {
          const tMap = new Map<string, any>();
          laterJson.audio_file.timestamps.forEach((t: any) => {
            if (t.verse_key) tMap.set(t.verse_key, t);
          });
          existing.ayahs.forEach((a) => {
            const vKey = `${surahNumber}:${a.number}`;
            const timing = tMap.get(vKey);
            if (timing && Array.isArray(timing.segments) && a.words) {
              const baseOffset = timing.segments[0]?.[1] || 0;
              a.words.forEach((w) => {
                const seg = timing.segments.find((s: any) => s[0] === w.position);
                if (seg) {
                  w.startMs = Math.max(0, seg[1] - baseOffset);
                  w.endMs = Math.max(0, seg[2] - baseOffset);
                }
              });
            }
          });
        }
      }
    }).catch(() => {});

    if (qcRes && qcRes.ok) {
      const qcJson = await qcRes.json();
      if (qcJson.verses && Array.isArray(qcJson.verses) && qcJson.verses.length > 0) {
        const ayahs: QuranAyah[] = qcJson.verses.map((v: any, index: number) => {
          const verseNum = v.verse_number || index + 1;
          const globalNum = v.id || verseNum;
          const verseKey = `${surahNumber}:${verseNum}`;
          const timing = timestampsMap.get(verseKey);
          let baseOffset = 0;
          if (timing && Array.isArray(timing.segments) && timing.segments.length > 0) {
            baseOffset = timing.segments[0][1];
          }
          
          const words: QuranWord[] = (v.words || [])
            .filter((w: any) => w.char_type_name !== 'end')
            .map((w: any) => {
              let startMs: number | undefined = undefined;
              let endMs: number | undefined = undefined;
              if (timing && Array.isArray(timing.segments)) {
                const seg = timing.segments.find((s: any) => s[0] === w.position);
                if (seg) {
                  startMs = Math.max(0, seg[1] - baseOffset);
                  endMs = Math.max(0, seg[2] - baseOffset);
                }
              }
              let wTranslation = w.translation?.text || '';
              return {
                id: w.id,
                position: w.position,
                arabic: w.text_uthmani || w.text || '',
                translation: wTranslation,
                transliteration: '',
                startMs,
                endMs,
              };
            });

          const translationsList: QuranAyahTranslation[] = [];
          if (v.translations && Array.isArray(v.translations)) {
            v.translations.forEach((t: any) => {
              const resId = String(t.resource_id || t.id || '');
              let cleanText = (t.text || '').replace(/<[^>]*>?/gm, '').trim();
              const nameObj = TRANSLATOR_NAMES_MAP[resId];
              const translatorLabel = nameObj
                ? (language === 'bn' ? nameObj.bn : nameObj.en)
                : (t.author_name || t.resource_name || (language === 'bn' ? 'তাফসীরে তাওযীহুল কুরআন - মুফতী তাকী ওসমানী' : 'Mufti Taqi Usmani'));

              translationsList.push({
                translator: translatorLabel,
                text: cleanText,
                sourceId: resId,
              });
            });
          }

          let primaryTrans = translationsList[0]?.text || '';
          const rawArabic = v.text_uthmani || words.map(w => w.arabic).join(' ');
          const cleanArabic = cleanVerse1Arabic(surahNumber, verseNum, rawArabic);

          let verseTransliteration = v.transliteration?.text || words.map(w => w.transliteration).filter(Boolean).join(' ');
          if (language === 'bn' && verseTransliteration) {
            verseTransliteration = normalizeArabicPronunciationBn(verseTransliteration);
          }

          return {
            number: verseNum,
            globalNumber: globalNum,
            arabic: cleanArabic,
            transliteration: verseTransliteration,
            translation: primaryTrans,
            translations: translationsList.length > 0 ? translationsList : undefined,
            words: words.length > 0 ? words : undefined,
            juz: v.juz_number || meta.startJuz,
            page: v.page_number || 1,
            sajda: Boolean(v.sajdah_number),
            audioUrl: getReciterAudioUrls(reciterId, surahNumber, verseNum, globalNum).primary,
          };
        });

        const detail: QuranSurahDetail = {
          ...meta,
          audioUrl: getReciterAudioUrls(reciterId, surahNumber, 1, 1).primary,
          ayahs,
          language,
        };

        saveCachedSurah(detail, reciterId, language);
        return detail;
      }
    }
  } catch (err) {
    console.warn('Quran.com API fetch fallback to AlQuran Cloud', err);
  }

  try {
    const editionCode = QURAN_EDITIONS[language] || 'bn.bengali';
    const apiUrl = `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,${editionCode},en.transliteration,en.sahih`;
    const alquranController = new AbortController();
    const alquranTimeout = setTimeout(() => alquranController.abort(), 2200);
    const response = await fetch(apiUrl, { signal: alquranController.signal }).catch(() => null);
    clearTimeout(alquranTimeout);
    if (!response || !response.ok) {
      throw new Error(`Failed to load Surah ${meta.englishName}`);
    }

    const result = await response.json();
    const arabicData = result.data[0];
    const translationData = result.data[1];
    const transliterationData = result.data[2] || { ayahs: [] };
    const englishData = result.data[3] || { ayahs: [] };

    const ayahs: QuranAyah[] = arabicData.ayahs.map((arAyah: any, index: number) => {
      const verseNum = arAyah.numberInSurah;
      const globalNum = arAyah.number;
      const translation = translationData.ayahs[index]?.text || '';
      const transliteration = transliterationData.ayahs[index]?.text || '';
      const englishTrans = englishData.ayahs[index]?.text || '';
      const rawArabic = arAyah.text || '';
      const cleanArabic = cleanVerse1Arabic(surahNumber, verseNum, rawArabic);

      const words = generateFallbackWords(cleanArabic, englishTrans, language);

      const translationsList: QuranAyahTranslation[] = [
        { translator: 'Zikr+', text: translation },
      ];

      return {
        number: verseNum,
        globalNumber: globalNum,
        arabic: cleanArabic,
        transliteration,
        translation,
        translations: translationsList,
        words,
        juz: arAyah.juz || meta.startJuz,
        page: arAyah.page || 1,
        sajda: Boolean(arAyah.sajda),
        audioUrl: getReciterAudioUrls(reciterId, surahNumber, verseNum, globalNum).primary,
      };
    });

    const detail: QuranSurahDetail = {
      ...meta,
      audioUrl: getReciterAudioUrls(reciterId, surahNumber, 1, 1).primary,
      ayahs,
      language,
    };

    saveCachedSurah(detail, reciterId, language);
    return detail;
  } catch (offlineErr) {
    console.warn(`[QuranService] Offline fallback engaged for Surah ${surahNumber}:`, offlineErr);

    // 1. If we have a complete embedded offline dataset for this Surah
    if (OFFLINE_FALLBACK_SURAHS[surahNumber]) {
      const baseAyahs = OFFLINE_FALLBACK_SURAHS[surahNumber];
      const localizedAyahs: QuranAyah[] = baseAyahs.map((ayah) => {
        const parts = (ayah.translation || '').split(' • ');
        const engText = parts[0] || ayah.translation;
        const bnText = parts[1] || parts[0] || '';
        const selectedTrans = language === 'bn' ? bnText : engText;
        const words = ayah.words && ayah.words.length > 0 ? ayah.words : generateFallbackWords(ayah.arabic, selectedTrans, language);

        return {
          ...ayah,
          translation: selectedTrans,
          translations: [
            { translator: 'Zikr+', text: selectedTrans },
          ],
          words,
          audioUrl: getReciterAudioUrls(reciterId, surahNumber, ayah.number, ayah.globalNumber).primary,
        };
      });

      const detail: QuranSurahDetail = {
        ...meta,
        audioUrl: getReciterAudioUrls(reciterId, surahNumber, 1, 1).primary,
        ayahs: localizedAyahs,
        language,
      };

      saveCachedSurah(detail, reciterId, language);
      return detail;
    }

    // 2. Otherwise generate a graceful offline reader representation
    const fallbackAyahs: QuranAyah[] = Array.from({ length: meta.numberOfAyahs }, (_, i) => {
      const verseNum = i + 1;
      return {
        number: verseNum,
        globalNumber: verseNum,
        arabic: verseNum === 1 && surahNumber !== 9 ? 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ' : `[سورة ${meta.name} - الآية ${verseNum}]`,
        transliteration: verseNum === 1 && surahNumber !== 9 ? 'Bismillāhir-Raḥmānir-Raḥīm' : `${meta.englishName} : Ayah ${verseNum}`,
        translation: language === 'bn'
          ? `সূরা ${meta.name} আয়াত নং ${verseNum}। (অফলাইন মোড — ইন্টারনেট সংযোগ পেলে পূর্ণ আয়াত ও তাফসীর স্বয়ংক্রিয়ভাবে লোড হবে)`
          : `Surah ${meta.englishName} Verse ${verseNum}. (Offline Mode — connect to internet for full Arabic text & translations)`,
        translations: [
          {
            translator: 'Offline Notice',
            text: language === 'bn'
              ? `অফলাইন ভিউ: সম্পূর্ণ ১৮টি প্রধান সূরা সম্পূর্ণ সংরক্ষিত রয়েছে।`
              : `Offline preview for Surah ${meta.englishName}.`,
          },
        ],
        juz: meta.startJuz,
        page: 1,
        sajda: false,
        audioUrl: getReciterAudioUrls(reciterId, surahNumber, verseNum, verseNum).primary,
      };
    });

    const offlineDetail: QuranSurahDetail = {
      ...meta,
      audioUrl: '',
      ayahs: fallbackAyahs,
      language,
    };

    return offlineDetail;
  }
}

/**
 * Fetch Tafsir for a specific Ayah (Includes Tafsir Ibn Kathir priority)
 */
export async function fetchAyahTafsir(
  surahNumber: number,
  ayahNumber: number,
  language: ZikrLanguage = 'bn',
  preferredTafsirId?: number
): Promise<{ author: string; text: string; id?: number }> {
  const defaultId = DEFAULT_TAFSIR_BY_LANG[language] || 164;
  const targetId = preferredTafsirId || defaultId;

  const targetIds = [targetId, 164, 165, 166, 169, 14, 160, 16];

  for (const tafsirId of targetIds) {
    try {
      const url = `https://api.quran.com/api/v4/tafsirs/${tafsirId}/by_ayah/${surahNumber}:${ayahNumber}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.tafsir?.text) {
          // Preserve linebreaks and paragraphs from HTML
          let clean = data.tafsir.text
            .replace(/<\/(p|div|h1|h2|h3|h4|h5|h6|blockquote|li)>/gi, '\n\n')
            .replace(/<br\s*[\/]?>/gi, '\n')
            .replace(/<[^>]*>?/gm, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/\n{3,}/g, '\n\n')
            .trim();

          if (clean.length > 5) {
            let authorName = data.tafsir.resource_name || 'তাফসীর ইবনে কাছীর';
            const matchedTafsir = AVAILABLE_TAFSIRS.find(t => t.id === tafsirId);
            if (matchedTafsir) {
              authorName = language === 'bn' ? matchedTafsir.nameBn : matchedTafsir.nameEn;
            } else if (tafsirId === 164) {
              authorName = language === 'bn' ? 'তাফসীর ইবনে কাছীর (তাওহীদ পাবলিকেশন্স)' : 'Tafsir Ibn Kathir (Bengali)';
            } else if (tafsirId === 165) {
              authorName = language === 'bn' ? 'তাফসীর আহসানুল বায়ান (বয়ান ফাউন্ডেশন)' : 'Tafsir Ahsanul Bayaan';
            } else if (tafsirId === 166) {
              authorName = language === 'bn' ? 'তাফসীর আবু বকর যাকারিয়া (কিং ফাহাদ প্রেস)' : 'Tafsir Abu Bakr Zakaria';
            } else if (tafsirId === 169) {
              authorName = 'Tafsir Ibn Kathir (English)';
            } else if (tafsirId === 14) {
              authorName = 'تفسير ابن كثير (العربية)';
            } else if (tafsirId === 160) {
              authorName = 'تفسیر ابن کثیر (اردو)';
            }
            return {
              author: authorName,
              text: clean,
              id: tafsirId,
            };
          }
        }
      }
    } catch {}
  }

  const defaultTitles: Record<ZikrLanguage, string> = {
    bn: `সূরা ${ALL_114_SURAHS[surahNumber - 1]?.name || ''} আয়াত নং ${ayahNumber} এর তাফসীর ইবনে কাছীর।`,
    en: `Tafsir Ibn Kathir for Surah ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''}, Verse ${ayahNumber}.`,
    ur: `تفسیر ابن کثیر - سورۃ ${ALL_114_SURAHS[surahNumber - 1]?.name || ''} آیت ${ayahNumber}।`,
    ar: `تفسير ابن كثير - سورة ${ALL_114_SURAHS[surahNumber - 1]?.name || ''} الآية ${ayahNumber}.`,
    hi: `तफ़सीर इब्न कसीर - सूरह ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''} आयत ${ayahNumber}।`,
    id: `Tafsir Ibn Kathir Surah ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''} Ayat ${ayahNumber}.`,
    tr: `Tefsir İbn Kesir - Sure ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''} Ayet ${ayahNumber}.`,
    ms: `Tafsir Ibn Kathir Surah ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''} Ayat ${ayahNumber}.`,
    fr: `Tafsir Ibn Kathir - Sourate ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''}, Verset ${ayahNumber}.`,
    es: `Tafsir Ibn Kathir - Sura ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''}, Versículo ${ayahNumber}.`,
    ru: `Тафсир Ибн Касир - сура ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''}, аят ${ayahNumber}.`,
    fa: `تفسیر ابن کثیر سوره ${ALL_114_SURAHS[surahNumber - 1]?.name || ''} آیه ${ayahNumber}.`,
    de: `Tafsir Ibn Kathir - Sure ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''}, Vers ${ayahNumber}.`,
    sw: `Tafakuri ya Ibn Kathir Sura ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''}, Aya ${ayahNumber}.`,
  };

  return {
    author: 'Tafsir Ibn Kathir',
    text: defaultTitles[language] || defaultTitles.bn,
    id: 164,
  };
}

export async function preloadSurah(
  surahNumber: number,
  reciterId: string = 'ar.alafasy',
  language: ZikrLanguage = 'bn'
): Promise<void> {
  if (getCachedSurah(surahNumber, language)) return;
  try {
    await fetchSurah(surahNumber, reciterId, language);
  } catch {}
}
