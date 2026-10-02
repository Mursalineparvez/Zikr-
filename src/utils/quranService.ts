import { ALL_114_SURAHS, SurahMeta } from './quran114List';
import { ZikrLanguage } from '../types';
import { QURAN_EDITIONS } from './appTranslations';

export interface QuranWord {
  id?: number;
  position: number;
  arabic: string;
  translation: string;
  transliteration?: string;
  audioUrl?: string;
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
  surahAudioBase?: string;
}

export const QURAN_RECITERS: Reciter[] = [
  {
    id: 'ar.alafasy',
    name: 'Mishary Rashid Alafasy',
    arabicName: 'مشاري بن راشد العفاسي',
    subtext: 'Clear & Melodic (Default)',
    surahAudioBase: 'https://server8.mp3quran.net/afs',
  },
  {
    id: 'ar.abdurrahmaansudais',
    name: 'Abdul Rahman Al-Sudais',
    arabicName: 'عبد الرحمن السديس',
    subtext: 'Imam of Masjid al-Haram, Makkah',
    surahAudioBase: 'https://server11.mp3quran.net/sds',
  },
  {
    id: 'ar.mahermuaiqly',
    name: 'Maher Al-Muaiqly',
    arabicName: 'ماهر المعيقلي',
    subtext: 'Emotional & Moving',
    surahAudioBase: 'https://server12.mp3quran.net/maher',
  },
  {
    id: 'ar.saadalghamidi',
    name: 'Saad Al-Ghamdi',
    arabicName: 'سعد الغامدي',
    subtext: 'Gentle & Rhythmic',
    surahAudioBase: 'https://server7.mp3quran.net/s_gmd',
  },
  {
    id: 'ar.shaatree',
    name: 'Abu Bakr Ash-Shatri',
    arabicName: 'أبو بكر الشاطري',
    subtext: 'Reverent & Slow Pace',
    surahAudioBase: 'https://server11.mp3quran.net/shatri',
  },
];

export const POPULAR_SURAHS_NUMBERS = [1, 2, 18, 19, 36, 55, 56, 67, 112, 113, 114];

// Local storage prefix
const CACHE_PREFIX = 'zikrmate_quran_cache_v2_';

/**
 * Remove prefixed Bismillah from verse 1 for surahs 2..114 (except 9 which has no Bismillah)
 */
function cleanVerse1Arabic(surahNumber: number, verseNumber: number, text: string): string {
  if (surahNumber !== 1 && surahNumber !== 9 && verseNumber === 1) {
    return text.replace(/^(?:﻿)?بِسْمِ\s*ٱللَّهِ\s*ٱلرَّحْمَٰنِ\s*ٱلرَّحِيمِ\s*/u, '').trim();
  }
  return text.trim();
}

/**
 * Get Surah from cache if available
 */
export function getCachedSurah(surahNumber: number, language: ZikrLanguage = 'bn'): QuranSurahDetail | null {
  const cacheKey = `${language}_${surahNumber}`;
  const rawKey = `${CACHE_PREFIX}${cacheKey}`;
  try {
    const raw = localStorage.getItem(rawKey);
    if (raw) {
      const parsed = JSON.parse(raw) as QuranSurahDetail;
      return parsed;
    }
  } catch (err) {
    console.warn('Failed to read surah cache', err);
  }
  return null;
}

/**
 * Save surah to cache
 */
export function saveCachedSurah(surah: QuranSurahDetail, language: ZikrLanguage = 'bn'): void {
  const cacheKey = `${language}_${surah.number}`;
  const rawKey = `${CACHE_PREFIX}${cacheKey}`;
  try {
    localStorage.setItem(rawKey, JSON.stringify(surah));
  } catch (err) {
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(CACHE_PREFIX) || key?.startsWith('zikrmate_quran_cache_')) {
          localStorage.removeItem(key);
        }
      }
      localStorage.setItem(rawKey, JSON.stringify(surah));
    } catch {}
  }
}

/**
 * Fallback word-by-word builder from arabic string
 */
function generateFallbackWords(arabicText: string, englishText: string): QuranWord[] {
  const arTokens = arabicText.trim().split(/\s+/).filter(Boolean);
  const enTokens = englishText.trim().split(/\s+/).filter(Boolean);
  return arTokens.map((ar, idx) => {
    return {
      position: idx + 1,
      arabic: ar,
      translation: enTokens[idx] || '—',
    };
  });
}

/**
 * Fetch full Surah with all Ayahs (Word-by-word + Multiple Translations + Transliteration)
 */
export async function fetchSurah(
  surahNumber: number,
  reciterId: string = 'ar.alafasy',
  language: ZikrLanguage = 'bn'
): Promise<QuranSurahDetail> {
  const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
  if (!meta) {
    throw new Error(`Surah ${surahNumber} not found in Quran index.`);
  }

  // Check cache first
  const cached = getCachedSurah(surahNumber, language);
  if (cached && cached.ayahs && cached.ayahs.length === meta.numberOfAyahs) {
    const updatedAyahs = cached.ayahs.map((ayah) => ({
      ...ayah,
      audioUrl: `https://cdn.islamic.network/quran/audio/128/${reciterId}/${ayah.globalNumber}.mp3`,
    }));
    return {
      ...cached,
      audioUrl: `https://cdn.islamic.network/quran/audio-surah/128/${reciterId}/${surahNumber}.mp3`,
      ayahs: updatedAyahs,
      language,
    };
  }

  // Multi-language translation IDs mapping for Quran.com v4 API
  const languageTranslationIds: Record<ZikrLanguage, string> = {
    bn: '163,161,20', // Taqi Usmani, Muhiuddin Khan, Sahih Intl
    en: '20,85,131',  // Sahih International, Clear Quran, Noble Quran
    ur: '234,97,20',  // Jalandhry, Tahir-ul-Qadri, Sahih Intl
    ar: '16,20',      // Muyassar, Sahih Intl
    hi: '122,20',     // Azizul Haque al-Umari, Sahih Intl
    id: '33,20',      // Kemenag, Sahih Intl
    tr: '77,52,20',   // Diyanet, Elmalili, Sahih Intl
    ms: '39,20',      // Basmeih, Sahih Intl
    fr: '31,20',      // Hamidullah, Sahih Intl
    es: '83,20',      // Cortes, Sahih Intl
    ru: '45,20',      // Kuliev, Sahih Intl
    fa: '135,20',     // Ansarian, Sahih Intl
    de: '27,20',      // Bubenheim, Sahih Intl
    sw: '232,20',     // Barwani, Sahih Intl
  };

  const activeTranslationIds = languageTranslationIds[language] || '163,161,20';

  // Try fetching from Quran.com v4 API (which provides word-by-word data + selected language translations)
  try {
    const quranDotComUrl = `https://api.quran.com/api/v4/verses/by_chapter/${surahNumber}?language=${language}&words=true&word_fields=text_uthmani,text_indopak&translations=${activeTranslationIds}&per_page=300`;
    const qcRes = await fetch(quranDotComUrl);
    if (qcRes.ok) {
      const qcJson = await qcRes.json();
      if (qcJson.verses && Array.isArray(qcJson.verses) && qcJson.verses.length > 0) {
        const ayahs: QuranAyah[] = qcJson.verses.map((v: any, index: number) => {
          const verseNum = v.verse_number || index + 1;
          const globalNum = v.id || verseNum;
          
          // Words mapping in selected language
          const words: QuranWord[] = (v.words || [])
            .filter((w: any) => w.char_type_name !== 'end')
            .map((w: any) => ({
              id: w.id,
              position: w.position,
              arabic: w.text_uthmani || w.text || '',
              translation: w.translation?.text || '',
              transliteration: w.transliteration?.text || '',
            }));

          // Translations mapping
          const translationsList: QuranAyahTranslation[] = [];
          if (v.translations && Array.isArray(v.translations)) {
            v.translations.forEach((t: any) => {
              const resId = t.resource_id;
              let translatorName = t.resource_name || 'Translation';
              if (resId === 163) translatorName = language === 'bn' ? 'মুফতী তাকী উসমানী' : 'Mufti Taqi Usmani';
              else if (resId === 161) translatorName = language === 'bn' ? 'মাওলানা মুহিউদ্দীন খান' : 'Maulana Muhiuddin Khan';
              else if (resId === 20) translatorName = 'Sahih International (English)';
              else if (resId === 85) translatorName = 'Dr. Mustafa Khattab (The Clear Quran)';
              else if (resId === 234) translatorName = 'فتح محمد جالندھری (Jalandhry)';
              else if (resId === 122) translatorName = 'मौलाना अज़ीज़ुल हक़ (Hindi)';
              else if (resId === 33) translatorName = 'Kementerian Agama RI (Indonesian)';
              else if (resId === 77) translatorName = 'Diyanet İşleri (Turkish)';

              // Strip html tags if present
              const cleanText = (t.text || '').replace(/<[^>]*>?/gm, '').trim();
              translationsList.push({
                translator: translatorName,
                text: cleanText,
                sourceId: String(resId),
              });
            });
          }

          // Primary translation
          const primaryTrans = translationsList[0]?.text || '';

          // Raw arabic
          const rawArabic = v.text_uthmani || words.map(w => w.arabic).join(' ');
          const cleanArabic = cleanVerse1Arabic(surahNumber, verseNum, rawArabic);

          return {
            number: verseNum,
            globalNumber: globalNum,
            arabic: cleanArabic,
            transliteration: v.transliteration?.text || words.map(w => w.transliteration).filter(Boolean).join(' '),
            translation: primaryTrans,
            translations: translationsList.length > 0 ? translationsList : undefined,
            words: words.length > 0 ? words : undefined,
            juz: v.juz_number || meta.startJuz,
            page: v.page_number || 1,
            sajda: Boolean(v.sajdah_number),
            audioUrl: `https://cdn.islamic.network/quran/audio/128/${reciterId}/${globalNum}.mp3`,
          };
        });

        const detail: QuranSurahDetail = {
          ...meta,
          audioUrl: `https://cdn.islamic.network/quran/audio-surah/128/${reciterId}/${surahNumber}.mp3`,
          ayahs,
          language,
        };

        saveCachedSurah(detail, language);
        return detail;
      }
    }
  } catch (err) {
    console.warn('Quran.com API fetch fallback to AlQuran Cloud', err);
  }

  // Fallback to Al-Quran Cloud API
  const editionCode = QURAN_EDITIONS[language] || 'bn.bengali';
  const apiUrl = `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,${editionCode},en.transliteration,en.sahih`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`Failed to load Surah ${meta.englishName} (HTTP ${response.status})`);
  }

  const result = await response.json();
  if (result.code !== 200 || !Array.isArray(result.data) || result.data.length < 2) {
    throw new Error('Received unexpected Quran API response format');
  }

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

    const words = generateFallbackWords(cleanArabic, englishTrans);

    const translationsList: QuranAyahTranslation[] = [
      { translator: 'মুফতী তাকী উসমানী / ইসলামিক ফাউন্ডেশন', text: translation },
    ];
    if (englishTrans) {
      translationsList.push({ translator: 'Sahih International (English)', text: englishTrans });
    }

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
      audioUrl: `https://cdn.islamic.network/quran/audio/128/${reciterId}/${globalNum}.mp3`,
    };
  });

  const detail: QuranSurahDetail = {
    ...meta,
    audioUrl: `https://cdn.islamic.network/quran/audio-surah/128/${reciterId}/${surahNumber}.mp3`,
    ayahs,
    language,
  };

  saveCachedSurah(detail, language);
  return detail;
}

/**
 * Fetch Tafsir for a specific Ayah (e.g. Tafsir Ibn Kathir / Abu Bakr Zakaria)
 */
export async function fetchAyahTafsir(
  surahNumber: number,
  ayahNumber: number,
  language: ZikrLanguage = 'bn'
): Promise<{ author: string; text: string }> {
  const tafsirMap: Record<ZikrLanguage, { id: number; defaultAuthor: string }> = {
    bn: { id: 168, defaultAuthor: 'তাফসীর আহসানুল বায়ান / আবু বকর যাকারিয়া' },
    en: { id: 169, defaultAuthor: 'Tafsir Ibn Kathir (English)' },
    ur: { id: 97, defaultAuthor: 'تفسیر ابن کثیر (اردو)' },
    ar: { id: 16, defaultAuthor: 'التفسير الميسر' },
    hi: { id: 122, defaultAuthor: 'तफ़सीर अहसनुल बयान (हिन्दी)' },
    id: { id: 33, defaultAuthor: 'Tafsir Ringkas Kemenag' },
    tr: { id: 77, defaultAuthor: 'Diyanet Meali ve Tefsiri' },
    ms: { id: 39, defaultAuthor: 'Tafsir Pimpinan Ar-Rahman' },
    fr: { id: 169, defaultAuthor: 'Tafsir Ibn Kathir (Français)' },
    es: { id: 169, defaultAuthor: 'Tafsir Ibn Kathir (Español)' },
    ru: { id: 170, defaultAuthor: 'Тафсир ас-Саади' },
    fa: { id: 169, defaultAuthor: 'تفسیر نور' },
    de: { id: 169, defaultAuthor: 'Tafsir Ibn Kathir (Deutsch)' },
    sw: { id: 169, defaultAuthor: 'Tafsir Al-Muntakhab (Kiswahili)' },
  };

  const currentTafsirConfig = tafsirMap[language] || tafsirMap.bn;

  try {
    const url = `https://api.quran.com/api/v4/tafsirs/${currentTafsirConfig.id}/by_ayah/${surahNumber}:${ayahNumber}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.tafsir?.text) {
        const clean = data.tafsir.text.replace(/<[^>]*>?/gm, '').trim();
        return {
          author: data.tafsir.resource_name || currentTafsirConfig.defaultAuthor,
          text: clean,
        };
      }
    }
  } catch {}

  const defaultTitles: Record<ZikrLanguage, string> = {
    bn: `সূরা ${ALL_114_SURAHS[surahNumber - 1]?.name || ''} আয়াত নং ${ayahNumber} এর তাফসীর ও শানে নুযুল।`,
    en: `Tafsir & Commentary for Surah ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''}, Verse ${ayahNumber}.`,
    ur: `سورۃ ${ALL_114_SURAHS[surahNumber - 1]?.name || ''} آیت نمبر ${ayahNumber} کی تفسیر۔`,
    ar: `تفسير سورة ${ALL_114_SURAHS[surahNumber - 1]?.name || ''} الآية ${ayahNumber}.`,
    hi: `सूरह ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''} आयत नं ${ayahNumber} की तफ़सीर।`,
    id: `Tafsir dan Penjelasan Surah ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''} Ayat ${ayahNumber}.`,
    tr: `Sure ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''} Ayet ${ayahNumber} Tefsiri.`,
    ms: `Tafsir dan Huraian Surah ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''} Ayat ${ayahNumber}.`,
    fr: `Commentaire et Tafsir de la Sourate ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''}, Verset ${ayahNumber}.`,
    es: `Comentario y Tafsir de la Sura ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''}, Versículo ${ayahNumber}.`,
    ru: `Тафсир и толкование суры ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''}, аят ${ayahNumber}.`,
    fa: `تفسیر سوره ${ALL_114_SURAHS[surahNumber - 1]?.name || ''} آیه ${ayahNumber}.`,
    de: `Tafsir & Erläuterung für Sure ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''}, Vers ${ayahNumber}.`,
    sw: `Tafakuri ya Sura ${ALL_114_SURAHS[surahNumber - 1]?.englishName || ''}, Aya ${ayahNumber}.`,
  };

  return {
    author: currentTafsirConfig.defaultAuthor,
    text: defaultTitles[language] || defaultTitles.bn,
  };
}

/**
 * Preload a surah in background
 */
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

