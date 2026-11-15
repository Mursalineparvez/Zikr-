import { DuaCategory } from '../types';
import { HISNUL_CHAPTERS, HisnulChapterMeta } from './hisnulData/chaptersMeta';
import { HISNUL_PART1 } from './hisnulData/part1_ch0_to_ch16';
import { HISNUL_PART2 } from './hisnulData/part2_ch17_to_ch26';
import { HISNUL_PART3 } from './hisnulData/part3_ch27_to_ch33';
import { HISNUL_PART4 } from './hisnulData/part4_ch34_to_ch60';
import { HISNUL_PART5 } from './hisnulData/part5_ch61_to_ch94';
import { HISNUL_PART6 } from './hisnulData/part6_ch95_to_ch132';

export interface DuaTranslation {
  title: string;
  timing: string;
  translation: string;
  virtue?: string;
}

export interface DuaItem {
  id: string;
  title: string;
  category: DuaCategory;
  timing: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  virtue?: string;
  suggestedCount?: number;
  chapterNumber?: number;
  hisnulNumber?: string;
  translations?: {
    [key: string]: DuaTranslation;
  };
}

export { HISNUL_CHAPTERS };
export type { HisnulChapterMeta };

export const AUTHENTIC_DUAS: DuaItem[] = [
  ...HISNUL_PART1,
  ...HISNUL_PART2,
  ...HISNUL_PART3,
  ...HISNUL_PART4,
  ...HISNUL_PART5,
  ...HISNUL_PART6,
];
