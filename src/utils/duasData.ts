import { DuaCategory } from '../types';
import { HISNUL_CHAPTERS, HisnulChapterMeta } from './hisnulData/chaptersMeta';
import { HISNUL_PART1 } from './hisnulData/part1_ch0_to_ch16';
import { HISNUL_PART2 } from './hisnulData/part2_ch17_to_ch26';
import { HISNUL_PART3 } from './hisnulData/part3_ch27_to_ch33';
import { HISNUL_PART4 } from './hisnulData/part4_ch34_to_ch60';
import { HISNUL_PART5 } from './hisnulData/part5_ch61_to_ch94';
import { HISNUL_PART6 } from './hisnulData/part6_ch95_to_ch132';
import { DUA_BENEFITS_PART1, DuaBenefitAndRef } from './hisnulData/duaBenefitsPart1';
import { DUA_BENEFITS_PART2 } from './hisnulData/duaBenefitsPart2';

export interface DuaTranslation {
  title: string;
  timing: string;
  translation: string;
  virtue?: string;
  benefits?: string[];
  reference?: string;
  grade?: string;
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
  referenceBn?: string;
  grade?: string;
  gradeBn?: string;
  virtue?: string;
  benefits?: string[];
  suggestedCount?: number;
  chapterNumber?: number;
  hisnulNumber?: string;
  translations?: {
    [key: string]: DuaTranslation;
  };
}

export { HISNUL_CHAPTERS };
export type { HisnulChapterMeta };

const ALL_DUA_BENEFITS_AND_REFS: Record<string, DuaBenefitAndRef> = {
  ...DUA_BENEFITS_PART1,
  ...DUA_BENEFITS_PART2,
};

const RAW_DUAS: DuaItem[] = [
  ...HISNUL_PART1,
  ...HISNUL_PART2,
  ...HISNUL_PART3,
  ...HISNUL_PART4,
  ...HISNUL_PART5,
  ...HISNUL_PART6,
];

export const AUTHENTIC_DUAS: DuaItem[] = RAW_DUAS.map((dua) => {
  const enriched = ALL_DUA_BENEFITS_AND_REFS[dua.id];
  if (!enriched) return dua;

  const existingBn = dua.translations?.bn;
  const existingEn = dua.translations?.en;

  return {
    ...dua,
    virtue: enriched.virtueEn || dua.virtue,
    benefits: enriched.benefitsEn,
    reference: enriched.referenceEn || dua.reference,
    referenceBn: enriched.referenceBn,
    grade: enriched.gradeEn,
    gradeBn: enriched.gradeBn,
    translations: {
      ...dua.translations,
      bn: {
        title: existingBn?.title || dua.title,
        timing: existingBn?.timing || dua.timing,
        translation: existingBn?.translation || dua.translation,
        virtue: enriched.virtueBn,
        benefits: enriched.benefitsBn,
        reference: enriched.referenceBn,
        grade: enriched.gradeBn,
      },
      en: {
        title: existingEn?.title || dua.title,
        timing: existingEn?.timing || dua.timing,
        translation: existingEn?.translation || dua.translation,
        virtue: enriched.virtueEn,
        benefits: enriched.benefitsEn,
        reference: enriched.referenceEn || dua.reference,
        grade: enriched.gradeEn,
      },
    },
  };
});
