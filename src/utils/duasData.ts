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
import { GTAF_QURANIC_DUAS } from './hisnulData/gtafQuranicDuas';
import { GTAF_MASNOON_EXTRA_DUAS } from './hisnulData/gtafMasnoonExtraDuas';
import { GTAF_CROSS_REF_ENRICHMENT } from './hisnulData/gtafCrossRefEnrichment';

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
  secondaryCategories?: DuaCategory[];
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
  ...GTAF_QURANIC_DUAS,
  ...GTAF_MASNOON_EXTRA_DUAS,
];

function mergeBenefitsList(base: string[] = [], extra: string[] = []): string[] {
  const seen = new Set(base.map((b) => b.trim()));
  const merged = [...base];
  for (const item of extra) {
    const clean = item.trim();
    if (clean && !seen.has(clean)) {
      seen.add(clean);
      merged.push(clean);
    }
  }
  return merged;
}

export const AUTHENTIC_DUAS: DuaItem[] = RAW_DUAS.map((dua) => {
  const enriched = ALL_DUA_BENEFITS_AND_REFS[dua.id];
  const gtaf = GTAF_CROSS_REF_ENRICHMENT[dua.id];

  if (!enriched && !gtaf) return dua;

  const existingBn = dua.translations?.bn;
  const existingEn = dua.translations?.en;

  const baseVirtueBn = existingBn?.virtue || '';
  const mergedVirtueBn = gtaf?.extraVirtueBn
    ? enriched?.virtueBn && !enriched.virtueBn.includes(gtaf.extraVirtueBn.slice(0, 24))
      ? `${enriched.virtueBn}\n${gtaf.extraVirtueBn}`
      : gtaf.extraVirtueBn
    : enriched?.virtueBn || baseVirtueBn;

  const baseVirtueEn = existingEn?.virtue || dua.virtue || '';
  const mergedVirtueEn = gtaf?.extraVirtueEn
    ? enriched?.virtueEn && !enriched.virtueEn.includes(gtaf.extraVirtueEn.slice(0, 24))
      ? `${enriched.virtueEn}\n${gtaf.extraVirtueEn}`
      : gtaf.extraVirtueEn
    : enriched?.virtueEn || baseVirtueEn;

  const benefitsBn = mergeBenefitsList(
    enriched?.benefitsBn || existingBn?.benefits,
    gtaf?.extraBenefitsBn
  );
  const benefitsEn = mergeBenefitsList(
    enriched?.benefitsEn || existingEn?.benefits || dua.benefits,
    gtaf?.extraBenefitsEn
  );

  const referenceBn = gtaf?.enrichedRefBn || enriched?.referenceBn || dua.referenceBn || existingBn?.reference;
  const referenceEn = gtaf?.enrichedRefEn || enriched?.referenceEn || existingEn?.reference || dua.reference;
  const gradeEn = enriched?.gradeEn || dua.grade || existingEn?.grade;
  const gradeBn = enriched?.gradeBn || dua.gradeBn || existingBn?.grade;

  const secondarySet = new Set<DuaCategory>([
    ...(dua.secondaryCategories || []),
    ...(gtaf?.secondaryCategories || []),
  ]);
  secondarySet.delete(dua.category);
  const secondaryCategories = secondarySet.size > 0 ? Array.from(secondarySet) : undefined;

  return {
    ...dua,
    ...(secondaryCategories ? { secondaryCategories } : {}),
    virtue: mergedVirtueEn || undefined,
    benefits: benefitsEn,
    reference: referenceEn,
    referenceBn,
    grade: gradeEn,
    gradeBn,
    translations: {
      ...dua.translations,
      bn: {
        title: existingBn?.title || dua.title,
        timing: existingBn?.timing || dua.timing,
        translation: existingBn?.translation || dua.translation,
        virtue: mergedVirtueBn,
        benefits: benefitsBn,
        reference: referenceBn,
        grade: gradeBn,
      },
      en: {
        title: existingEn?.title || dua.title,
        timing: existingEn?.timing || dua.timing,
        translation: existingEn?.translation || dua.translation,
        virtue: mergedVirtueEn,
        benefits: benefitsEn,
        reference: referenceEn,
        grade: gradeEn,
      },
    },
  };
});
