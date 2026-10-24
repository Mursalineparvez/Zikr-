import { ALL_114_SURAHS, SurahMeta } from './quran114List';
import { QuranAyah, QuranSurahDetail, fetchSurah, getCachedSurah } from './quranService';
import { OFFLINE_FALLBACK_SURAHS } from './offlineQuranSurahs';

export type { QuranAyah, QuranSurahDetail, SurahMeta };

export interface QuranSurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
  audioUrl?: string;
  ayahs: QuranAyah[];
}

export { ALL_114_SURAHS, fetchSurah, getCachedSurah, OFFLINE_FALLBACK_SURAHS };

// Legacy array maintained for backward compatibility
export const QURAN_SURAHS: QuranSurah[] = ALL_114_SURAHS.slice(0, 10).map((meta) => ({
  number: meta.number,
  name: meta.name,
  englishName: meta.englishName,
  englishNameTranslation: meta.englishNameTranslation,
  numberOfAyahs: meta.numberOfAyahs,
  revelationType: meta.revelationType,
  audioUrl: meta.audioUrl,
  ayahs: OFFLINE_FALLBACK_SURAHS[meta.number] || [],
}));
