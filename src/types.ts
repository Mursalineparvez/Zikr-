export type ZikrLanguage =
  | 'bn'
  | 'en'
  | 'ur'
  | 'ar'
  | 'hi'
  | 'id'
  | 'tr'
  | 'ms'
  | 'fr'
  | 'es'
  | 'ru'
  | 'fa'
  | 'de'
  | 'sw';

export type ZikrRefreshMode = 'fard' | 'maghrib' | 'manual';

export interface ZikrTranslations {
  pronunciation?: string;
  meaning?: string;
}

export interface ZikrItem {
  id: string;
  name: string;
  arabic?: string;
  transliteration?: string;
  pronunciationBn?: string;
  meaning?: string;
  meaningBn?: string;
  translations?: Partial<Record<ZikrLanguage, ZikrTranslations>>;
  count: number;
  target?: number;
  fardTarget?: number;
  maghribTarget?: number;
  manualTarget?: number;
  createdAt: number;
  updatedAt: number;
  color?: string;
}

export interface HistorySession {
  id: string;
  timestamp: number;
  dateStr: string;
  totalCount: number;
  note?: string;
  breakdown: Array<{
    name: string;
    count: number;
    target?: number;
    arabic?: string;
  }>;
}

export type AppTheme = 'emerald' | 'midnight' | 'teal' | 'gold' | 'light';

export type ThemeMode = 'day' | 'night';

export type NavModule =
  | 'zikir_counter'
  | 'quran'
  | 'salat_time'
  | 'aamal_tracker'
  | 'other'
  | 'kitab'
  | 'hadith'
  | 'dua'
  | 'tablig'
  | 'allah_names'
  | 'hajj_checklist'
  | 'umrah_guide'
  | 'hajj_route_map'
  | 'hajj_essentials'
  | 'history_timeline';

export type DuaCategory =
  | 'salat'
  | 'quran'
  | 'hadith'
  | 'morning_evening'
  | 'sleep_wake'
  | 'protection'
  | 'forgiveness'
  | 'hardship'
  | 'quranic'
  | 'daily_living';

export interface DuaItem {
  id: string;
  title: string;
  category: DuaCategory;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  virtue?: string;
  suggestedCount?: number;
  timing?: string;
  translations?: Partial<Record<ZikrLanguage, {
    title?: string;
    translation?: string;
    virtue?: string;
    timing?: string;
  }>>;
}

export interface HadithBookMeta {
  id: string;
  arabicName: string;
  titles: Partial<Record<ZikrLanguage, string>> & { en: string; bn: string };
  chaptersCount: number;
  hadithCount: number;
  author: string;
}

export interface HadithItem {
  id: string;
  book: string;
  hadithNumber: string;
  chapter: string;
  narrator: string;
  arabicText: string;
  englishTranslation: string;
  topic: string;
  grade: 'Sahih' | 'Hasan';
  reflection?: string;
  translations?: Partial<Record<ZikrLanguage, {
    translation?: string;
    reflection?: string;
    chapter?: string;
    topic?: string;
    narrator?: string;
  }>>;
}

export interface AamalCheckItem {
  id: string;
  label: string;
  category:
    | 'prayer'
    | 'sunnah'
    | 'quran'
    | 'dhikr'
    | 'morning_evening'
    | 'bedtime'
    | 'character'
    | 'knowledge'
    | 'social'
    | 'charity';
  arabicLabel?: string;
  completed: boolean;
  points: number;
  details?: string;
  translations?: Partial<Record<ZikrLanguage, {
    label?: string;
    details?: string;
  }>>;
}

export interface AamalDayLog {
  dateKey: string; // YYYY-MM-DD
  items: AamalCheckItem[];
  quranPagesRead: number;
  dhikrCount: number;
  zikrBreakdown?: Array<{
    name: string;
    count: number;
    target?: number;
    arabic?: string;
    transliteration?: string;
  }>;
  reflectionNotes?: string;
  completedRatio: number; // 0 to 1
}

export interface AppSettings {
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  screenAwake: boolean;
  theme: AppTheme;
  themeMode: ThemeMode;
  voiceGender: 'male' | 'female';
}

export interface UserProfile {
  name: string;
  emailOrPhone: string;
  photoUrl: string;
  isSignedIn: boolean;
  isVerified?: boolean;
  verificationMethod?: 'email' | 'phone' | 'google';
  verificationDate?: string;
  authProvider?: 'google' | 'email' | 'phone' | 'guest';
  password?: string; // Account password for exclusive secure access
  location?: string;
  deviceModel?: string;
  osVersion?: string;
  appVersion?: string;
  lastSyncedAt?: number;
}

