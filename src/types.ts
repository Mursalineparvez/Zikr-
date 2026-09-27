export type ZikrLanguage = 'bn' | 'en' | 'ur' | 'hi' | 'id' | 'tr';

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
  | 'kitab'
  | 'hadith'
  | 'salat_time'
  | 'dua'
  | 'aamal_tracker';

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

export interface HadithItem {
  id: string;
  book: 'Sahih al-Bukhari' | 'Sahih Muslim' | 'Sunan Abi Dawud' | 'Jami` at-Tirmidhi' | 'An-Nawawi 40 Hadith';
  hadithNumber: string;
  chapter: string;
  narrator: string;
  arabicText: string;
  englishTranslation: string;
  topic: 'Faith & Tawheed' | 'Salah & Purification' | 'Character & Akhlaq' | 'Dhikr & Dua' | 'Charity & Kindness' | 'Patience & Trials' | 'Repentance & Mercy';
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
}

export interface UserProfile {
  name: string;
  emailOrPhone: string;
  photoUrl: string;
  isSignedIn: boolean;
  isVerified?: boolean;
  authProvider?: 'google' | 'email' | 'phone' | 'guest';
  location?: string;
  deviceModel?: string;
  osVersion?: string;
  appVersion?: string;
}

