/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Prophet25FilterKey =
  | 'all'
  | 'ulul_azm'
  | 'scripture'
  | 'arab'
  | 'bani_israil'
  | 'early'
  | 'read'
  | 'bookmarked';

export interface Prophet25Dua {
  arabic: string;
  transliterationBn: string;
  translationBn: string;
  translationEn: string;
  reference: string;
}

export interface Prophet25Event {
  titleBn: string;
  titleEn: string;
  detailBn: string;
  detailEn: string;
}

export interface Prophet25Item {
  id: string;
  rank: number;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  honorificBn: string;
  honorificEn: string;
  titleBn: string;
  titleEn: string;
  titleAr: string;
  isUlulAzm: boolean;
  isArabProphet?: boolean;
  isBaniIsrail?: boolean;
  isEarlyProphet?: boolean;
  scriptureBn?: string;
  scriptureEn?: string;
  quranMentions: number;
  quranMentionsNoteBn?: string;
  quranMentionsNoteEn?: string;
  keySurahsBn: string[];
  keySurahsEn: string[];
  nationRegionBn: string;
  nationRegionEn: string;
  lineageBn: string;
  lineageEn: string;
  lifespanNoteBn: string;
  lifespanNoteEn: string;
  summaryBn: string;
  summaryEn: string;
  biographyBn: string;
  biographyEn: string;
  miraclesBn: string[];
  miraclesEn: string[];
  timelineEvents: Prophet25Event[];
  trialsAndPatienceBn: string;
  trialsAndPatienceEn: string;
  dua?: Prophet25Dua;
  lessonsBn: string[];
  lessonsEn: string[];
  referencesBn: string[];
  referencesEn: string[];
}

export interface Prophet25FilterMeta {
  key: Prophet25FilterKey;
  labelBn: string;
  labelEn: string;
  labelAr: string;
}

export const PROPHETS_25_FILTERS: Prophet25FilterMeta[] = [
  { key: 'all', labelBn: 'সব ২৫ জন', labelEn: 'All 25', labelAr: 'الكل ٢٥' },
  { key: 'ulul_azm', labelBn: 'উলুল আযম (৫)', labelEn: 'Ulul Azm (5)', labelAr: 'أولو العزم (٥)' },
  { key: 'scripture', labelBn: 'কিতাব ও সহীফা', labelEn: 'Scripture Bearers', labelAr: 'أصحاب الكتب' },
  { key: 'arab', labelBn: 'আরব নবী', labelEn: 'Arab Prophets', labelAr: 'الأنبياء العرب' },
  { key: 'bani_israil', labelBn: 'বনী ইসরাঈল', labelEn: 'Bani Israil', labelAr: 'بني إسرائيل' },
  { key: 'early', labelBn: 'প্রাচীন যুগ', labelEn: 'Early Era', labelAr: 'العصر الأول' },
  { key: 'bookmarked', labelBn: 'বুকমার্ক', labelEn: 'Bookmarked', labelAr: 'المحفوظات' },
  { key: 'read', labelBn: 'পঠিত', labelEn: 'Completed', labelAr: 'المقروءة' },
];
