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
  category?: 'makkah' | 'egypt' | 'melodic' | 'slow';
  surahAudioBase?: string;
}

export const QURAN_RECITERS: Reciter[] = [
  {
    id: 'ar.alafasy',
    name: 'Mishary Rashid Alafasy',
    arabicName: 'مشاري بن راشد العفاسي',
    subtext: 'Clear, Melodic & World Famous (Kuwait)',
    category: 'melodic',
    surahAudioBase: 'https://server8.mp3quran.net/afs',
  },
  {
    id: 'ar.yasserdussary',
    name: 'Yasser Al-Dosari (Yasir Al-Doshori)',
    arabicName: 'ياسر بن راشد الدوسري',
    subtext: 'Imam of Masjid al-Haram, Makkah',
    category: 'makkah',
    surahAudioBase: 'https://server11.mp3quran.net/yasser',
  },
  {
    id: 'ar.abdurrahmaansudais',
    name: 'Abdul Rahman Al-Sudais',
    arabicName: 'عبد الرحمن السديس',
    subtext: 'Head Imam of Masjid al-Haram, Makkah',
    category: 'makkah',
    surahAudioBase: 'https://server11.mp3quran.net/sds',
  },
  {
    id: 'ar.mahermuaiqly',
    name: 'Maher Al-Muaiqly',
    arabicName: 'ماهر المعيقلي',
    subtext: 'Emotional & Moving Imam of Masjid al-Haram',
    category: 'makkah',
    surahAudioBase: 'https://server12.mp3quran.net/maher',
  },
  {
    id: 'ar.saudshuraim',
    name: 'Saud Al-Shuraim',
    arabicName: 'سعود الشريم',
    subtext: 'Former Senior Imam of Masjid al-Haram',
    category: 'makkah',
    surahAudioBase: 'https://server7.mp3quran.net/shur',
  },
  {
    id: 'ar.hudhaify',
    name: 'Ali Abdul-Rahman Al-Huthaify',
    arabicName: 'علي بن عبد الرحمن الحذيفي',
    subtext: 'Senior Chief Imam of Masjid an-Nabawi, Madinah',
    category: 'makkah',
    surahAudioBase: 'https://server9.mp3quran.net/hthfi',
  },
  {
    id: 'ar.saadalghamidi',
    name: 'Saad Al-Ghamdi',
    arabicName: 'سعد الغامدي',
    subtext: 'Gentle, Rhythmic & Soothing',
    category: 'melodic',
    surahAudioBase: 'https://server7.mp3quran.net/s_gmd',
  },
  {
    id: 'ar.shaatree',
    name: 'Abu Bakr Ash-Shatri',
    arabicName: 'أبو بكر الشاطري',
    subtext: 'Reverent, Deep & Slow Pace',
    category: 'slow',
    surahAudioBase: 'https://server11.mp3quran.net/shatri',
  },
  {
    id: 'ar.minshawi',
    name: 'Mohamed Siddiq El-Minshawi (Murattal)',
    arabicName: 'محمد صديق المنشاوي',
    subtext: 'Heart-Touching Legendary Master (Egypt)',
    category: 'egypt',
    surahAudioBase: 'https://server10.mp3quran.net/minsh',
  },
  {
    id: 'ar.minshawimujawwad',
    name: 'Mohamed Siddiq El-Minshawi (Mujawwad)',
    arabicName: 'المنشاوي (مجود)',
    subtext: 'Slow Pace Heart-wrenching Tajweed',
    category: 'egypt',
    surahAudioBase: 'https://server10.mp3quran.net/minsh_mjwd',
  },
  {
    id: 'ar.abdulbasitmurattal',
    name: 'Abdul Basit Abdul Samad (Murattal)',
    arabicName: 'عبد الباسط عبد الصمد',
    subtext: 'Golden Voice of the Islamic World (Egypt)',
    category: 'egypt',
    surahAudioBase: 'https://server7.mp3quran.net/basit',
  },
  {
    id: 'ar.husary',
    name: 'Mahmoud Khalil Al-Husary (Murattal)',
    arabicName: 'محمود خليل الحصري',
    subtext: 'The Perfect Tajweed Reference Master',
    category: 'egypt',
    surahAudioBase: 'https://server13.mp3quran.net/husr',
  },
  {
    id: 'ar.husarymujawwad',
    name: 'Mahmoud Khalil Al-Husary (Mujawwad)',
    arabicName: 'الحصري (مجود)',
    subtext: 'Slow Melodic Tajweed Teaching Style',
    category: 'egypt',
    surahAudioBase: 'https://server13.mp3quran.net/husr_mjwd',
  },
  {
    id: 'ar.ahmedajamy',
    name: 'Ahmed Ibn Ali Al-Ajamy',
    arabicName: 'أحمد بن علي العجمي',
    subtext: 'Powerful, Energetic & Melodic Resonance',
    category: 'melodic',
    surahAudioBase: 'https://server10.mp3quran.net/ajm',
  },
  {
    id: 'ar.muhammadayyoob',
    name: 'Muhammad Ayyub',
    arabicName: 'محمد أيوب',
    subtext: 'Legendary Imam of Prophet’s Mosque, Madinah',
    category: 'makkah',
    surahAudioBase: 'https://server8.mp3quran.net/ayyoub',
  },
  {
    id: 'ar.hanifaghabro',
    name: 'Hani Ar-Rifai',
    arabicName: 'هاني الرفاعي',
    subtext: 'Emotional & Tears-inducing Recitation',
    category: 'melodic',
    surahAudioBase: 'https://server8.mp3quran.net/hrefe',
  },
  {
    id: 'ar.nasserqatami',
    name: 'Nasser Al-Qatami',
    arabicName: 'ناصر القطامي',
    subtext: 'Modern Melodic & Reverent Recitation',
    category: 'melodic',
    surahAudioBase: 'https://server6.mp3quran.net/qtm',
  },
  {
    id: 'ar.faresabbad',
    name: 'Fares Abbad',
    arabicName: 'فارس عباد',
    subtext: 'Smooth Rhythmic Flow (Yemen)',
    category: 'melodic',
    surahAudioBase: 'https://server8.mp3quran.net/abbad',
  },
  {
    id: 'ar.abdullahbasfar',
    name: 'Abdullah Basfar',
    arabicName: 'عبد الله بصفر',
    subtext: 'Calm, Clear & Perfect for Memorization',
    category: 'slow',
    surahAudioBase: 'https://server6.mp3quran.net/bsfr',
  },
  {
    id: 'ar.muhammadjibreel',
    name: 'Muhammad Jibreel',
    arabicName: 'محمد جبريل',
    subtext: 'Famous Egyptian Qari & Dua Master',
    category: 'egypt',
    surahAudioBase: 'https://server8.mp3quran.net/jbrl',
  },
  {
    id: 'ar.khalifaaltunaiji',
    name: 'Khalifa Al-Tunaiji',
    arabicName: 'خليفة التنيجي',
    subtext: 'Clear UAE Reciter & Tajweed Instructor',
    category: 'slow',
    surahAudioBase: 'https://server12.mp3quran.net/tnjy',
  },
  {
    id: 'ar.salahbudair',
    name: 'Salah Al-Budair',
    arabicName: 'صلاح البدير',
    subtext: 'Imam of Masjid an-Nabawi, Madinah',
    category: 'makkah',
    surahAudioBase: 'https://server6.mp3quran.net/s_bud',
  },
];

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

const CACHE_PREFIX = 'zikrmate_quran_cache_v4_';

function cleanVerse1Arabic(surahNumber: number, verseNumber: number, text: string): string {
  if (surahNumber !== 1 && surahNumber !== 9 && verseNumber === 1) {
    return text.replace(/^(?:﻿)?بِسْمِ\s*ٱللَّهِ\s*ٱلرَّحْمَٰنِ\s*ٱلرَّحِيمِ\s*/u, '').trim();
  }
  return text.trim();
}

export function getCachedSurah(surahNumber: number, language: ZikrLanguage = 'bn'): QuranSurahDetail | null {
  const cacheKey = `${language}_${surahNumber}`;
  const rawKey = `${CACHE_PREFIX}${cacheKey}`;
  try {
    const raw = localStorage.getItem(rawKey);
    if (raw) {
      return JSON.parse(raw) as QuranSurahDetail;
    }
  } catch (err) {
    console.warn('Failed to read surah cache', err);
  }
  return null;
}

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

export async function fetchSurah(
  surahNumber: number,
  reciterId: string = 'ar.alafasy',
  language: ZikrLanguage = 'bn'
): Promise<QuranSurahDetail> {
  const meta = ALL_114_SURAHS.find((s) => s.number === surahNumber);
  if (!meta) {
    throw new Error(`Surah ${surahNumber} not found in Quran index.`);
  }

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

  const languageTranslationIds: Record<ZikrLanguage, string> = {
    bn: '163,161,20',
    en: '20,85,131',
    ur: '234,97,20',
    ar: '16,20',
    hi: '122,20',
    id: '33,20',
    tr: '77,52,20',
    ms: '39,20',
    fr: '31,20',
    es: '83,20',
    ru: '45,20',
    fa: '135,20',
    de: '27,20',
    sw: '232,20',
  };

  const activeTranslationIds = languageTranslationIds[language] || '163,161,20';

  try {
    const quranDotComUrl = `https://api.quran.com/api/v4/verses/by_chapter/${surahNumber}?language=${language}&words=true&word_fields=text_uthmani,text_indopak&translations=${activeTranslationIds}&per_page=300`;
    const qcRes = await fetch(quranDotComUrl);
    if (qcRes.ok) {
      const qcJson = await qcRes.json();
      if (qcJson.verses && Array.isArray(qcJson.verses) && qcJson.verses.length > 0) {
        const ayahs: QuranAyah[] = qcJson.verses.map((v: any, index: number) => {
          const verseNum = v.verse_number || index + 1;
          const globalNum = v.id || verseNum;
          
          const words: QuranWord[] = (v.words || [])
            .filter((w: any) => w.char_type_name !== 'end')
            .map((w: any) => ({
              id: w.id,
              position: w.position,
              arabic: w.text_uthmani || w.text || '',
              translation: w.translation?.text || '',
              transliteration: w.transliteration?.text || '',
            }));

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

              const cleanText = (t.text || '').replace(/<[^>]*>?/gm, '').trim();
              translationsList.push({
                translator: translatorName,
                text: cleanText,
                sourceId: String(resId),
              });
            });
          }

          const primaryTrans = translationsList[0]?.text || '';
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

  const editionCode = QURAN_EDITIONS[language] || 'bn.bengali';
  const apiUrl = `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,${editionCode},en.transliteration,en.sahih`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`Failed to load Surah ${meta.englishName} (HTTP ${response.status})`);
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

    const words = generateFallbackWords(cleanArabic, englishTrans);

    const translationsList: QuranAyahTranslation[] = [
      { translator: 'Primary Translation', text: translation },
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
