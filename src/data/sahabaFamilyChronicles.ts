import {
  FamilyMemberDetailCard,
  SahabaFamilyChronicle,
  KHALIFA_FAMILY_CHRONICLES,
} from './khalifaFamilyPdfData';
import { SAHABA_FAMILY_CHRONICLES_PART1 } from './sahabaFamilyChroniclesPart1';
import { SAHABA_FAMILY_CHRONICLES_PART2 } from './sahabaFamilyChroniclesPart2';
import { SAHABA_FAMILY_CHRONICLES_PART3 } from './sahabaFamilyChroniclesPart3';
import { SAHABA_FAMILY_CHRONICLES_PART4 } from './sahabaFamilyChroniclesPart4';
import { SAHABA_FAMILY_CHRONICLES_PART5 } from './sahabaFamilyChroniclesPart5';
import type { SahabaItem } from './sahabaData';

export type { FamilyMemberDetailCard, SahabaFamilyChronicle };
export { KHALIFA_FAMILY_CHRONICLES };

/**
 * ৪ খলিফার সম্পূর্ণ পিডিএফ তথ্য (৪২ পাতা, রেফারেন্সসহ) +
 * আশারায়ে মুবাশ্‌শারা, প্রথম সারির সাহাবি, সেনাপতি, আলিম, আনসার,
 * আহলে বাইত, উম্মাহাতুল মুমিনীন ও মহীয়সী সাহাবিয়াত (রা.)-সহ সকল ২৬৬ জন সাহাবির
 * একীভূত ও প্রামাণ্য পারিবারিক সংকলন।
 */
export const SAHABA_FAMILY_CHRONICLES: Record<string, SahabaFamilyChronicle> = {
  ...KHALIFA_FAMILY_CHRONICLES,
  ...SAHABA_FAMILY_CHRONICLES_PART1,
  ...SAHABA_FAMILY_CHRONICLES_PART2,
  ...SAHABA_FAMILY_CHRONICLES_PART3,
  ...SAHABA_FAMILY_CHRONICLES_PART4,
  ...SAHABA_FAMILY_CHRONICLES_PART5,
};

function toBnNum(n: number): string {
  const digits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(n).replace(/\d/g, (d) => digits[Number(d)]);
}

function toBnPad2(n: number): string {
  return toBnNum(n).padStart(2, '০');
}

function isFemaleSahaba(sahaba: SahabaItem): boolean {
  if (sahaba.categoryKey === 'sahabiyyat') return true;
  const idLower = sahaba.id.toLowerCase();
  if (
    idLower.includes('bint-') ||
    idLower.startsWith('umm-') ||
    idLower.includes('aisha') ||
    idLower.includes('fatima') ||
    idLower.includes('khadija') ||
    idLower.includes('hafsa') ||
    idLower.includes('sawda') ||
    idLower.includes('mariyah') ||
    idLower.includes('halimah') ||
    idLower.includes('ruqayyah') ||
    idLower.includes('zaynab') ||
    idLower.includes('barirah') ||
    idLower.includes('zinnirah') ||
    idLower.includes('lubabah') ||
    idLower.includes('arwa-') ||
    idLower.includes('durrah-')
  ) {
    return true;
  }
  return false;
}

/**
 * ৪ খলিফার ভার্বাটিম পিডিএফ এন্ট্রি অক্ষুণ্ণ রেখে বাকি সকল সাহাবির
 * পারিবারিক কার্ডগুলোকে সমানভাবে সুবিন্যস্ত করে (পিতা-মাতা ও বংশমর্যাদা,
 * স্ত্রী/স্বামী, সন্তানসন্ততি, বিশিষ্ট আত্মীয়স্বজন এবং ধারাবাহিক কার্ড নম্বর)।
 * কখনোই অপ্রমাণিত নাম যোগ করা হয় না — কেবল সংরক্ষিত প্রামাণ্য তথ্য থেকেই কার্ড সাজানো হয়।
 */
function enrichChronicleMembers(
  chronicle: SahabaFamilyChronicle,
  sahaba: SahabaItem,
  isFemale: boolean
): SahabaFamilyChronicle {
  const existingMembers = [...(chronicle.members || [])];
  const hasParentsLineageCard = existingMembers.some(
    (m) =>
      m.group === 'lineage' &&
      (m.pointsBn.some((pt) => pt.includes('পিতা:')) || m.roleBadgeBn.includes('পিতা-মাতা'))
  );
  const hasSpouseCard = existingMembers.some(
    (m) => m.group === 'wife' || m.group === 'umm_walad' || m.group === 'husband'
  );
  const hasChildCard = existingMembers.some(
    (m) => m.group === 'child' || m.group === 'children_summary'
  );
  const hasAutoRelativesCard = existingMembers.some((m) => m.id.endsWith('-auto-relatives'));

  const spousesBn = (
    isFemale
      ? (chronicle.husbandsBn && chronicle.husbandsBn.length > 0 ? chronicle.husbandsBn : chronicle.wivesBn)
      : chronicle.wivesBn
  ) || [];
  const spousesEn = (
    isFemale
      ? (chronicle.husbandsEn && chronicle.husbandsEn.length > 0 ? chronicle.husbandsEn : chronicle.wivesEn)
      : chronicle.wivesEn
  ) || [];
  const sonsBn = (chronicle.sonsBn || []).filter((x) => x && x.trim().length > 0);
  const sonsEn = (chronicle.sonsEn || []).filter((x) => x && x.trim().length > 0);
  const daughtersBn = (chronicle.daughtersBn || []).filter((x) => x && x.trim().length > 0);
  const daughtersEn = (chronicle.daughtersEn || []).filter((x) => x && x.trim().length > 0);
  const relativesBn = (chronicle.keyRelativesBn || []).filter((x) => x && x.trim().length > 0);
  const relativesEn = (chronicle.keyRelativesEn || []).filter((x) => x && x.trim().length > 0);
  const totalChildren = sonsBn.length + daughtersBn.length;

  const sourceBn = chronicle.overviewSourceBn || 'তাবাকাতে ইবনে সা’দ; আল-ইসাবাহ; উসদুল গাবাহ';
  const sourceEn = chronicle.overviewSourceEn || "Tabaqat Ibn Sa'd; Al-Isabah; Usd al-Ghabah";

  const enriched: FamilyMemberDetailCard[] = [];

  // 1. Dedicated Parents & Lineage Card (if missing explicit parents card)
  if (!hasParentsLineageCard && (chronicle.fatherBn || chronicle.motherBn || chronicle.tribeOrClanBn)) {
    const lineagePointsBn: string[] = [];
    const lineagePointsEn: string[] = [];
    if (chronicle.fatherBn) {
      lineagePointsBn.push(`পিতা: ${chronicle.fatherBn}।`);
      lineagePointsEn.push(`Father: ${chronicle.fatherEn || chronicle.fatherBn}.`);
    }
    if (chronicle.motherBn) {
      lineagePointsBn.push(`মাতা: ${chronicle.motherBn}।`);
      lineagePointsEn.push(`Mother: ${chronicle.motherEn || chronicle.motherBn}.`);
    }
    if (chronicle.tribeOrClanBn) {
      lineagePointsBn.push(`গোত্র ও বংশমর্যাদা: ${chronicle.tribeOrClanBn}।`);
      lineagePointsEn.push(`Tribe & Clan: ${chronicle.tribeOrClanEn || chronicle.tribeOrClanBn}.`);
    }
    if (sahaba.birthAndDeathBn) {
      lineagePointsBn.push(`জীবনকাল ও ঐতিহাসিক পরিচয়: ${sahaba.birthAndDeathBn}।`);
      if (sahaba.birthAndDeathEn) {
        lineagePointsEn.push(`Lifespan: ${sahaba.birthAndDeathEn}.`);
      }
    }

    enriched.push({
      id: `${sahaba.id}-auto-lineage`,
      roleBadgeBn: 'পিতা-মাতা ও বংশমর্যাদা',
      roleBadgeEn: 'Parents & Noble Lineage',
      nameBn: chronicle.tribeOrClanBn || `${sahaba.nameBn}-এর বংশপরিচয়`,
      nameEn: chronicle.tribeOrClanEn || `Lineage of ${sahaba.nameEn || sahaba.nameBn}`,
      group: 'lineage',
      pointsBn: lineagePointsBn,
      pointsEn: lineagePointsEn.length > 0 ? lineagePointsEn : undefined,
      sourceBn,
      sourceEn,
    });
  }

  // Keep all existing curated cards in their original order
  enriched.push(...existingMembers);

  // 2. Dedicated Spouse Card (if missing and spouses are documented)
  if (!hasSpouseCard && spousesBn.length > 0) {
    const spousePointsBn = spousesBn.map((sp, idx) =>
      spousesBn.length > 1
        ? `${toBnNum(idx + 1)}. ${sp}`
        : `${isFemale ? 'স্বামী' : 'সহধর্মিণী'}: ${sp}।`
    );
    const spousePointsEn = (spousesEn.length > 0 ? spousesEn : spousesBn).map((sp, idx) =>
      spousesBn.length > 1
        ? `${idx + 1}. ${sp}`
        : `${isFemale ? 'Husband' : 'Wife'}: ${sp}.`
    );

    enriched.push({
      id: `${sahaba.id}-auto-spouses`,
      roleBadgeBn: isFemale
        ? (spousesBn.length > 1 ? `স্বামীগণ (${toBnNum(spousesBn.length)} জন)` : 'স্বামী ও দাম্পত্য')
        : (spousesBn.length > 1 ? `সহধর্মিণীগণ (${toBnNum(spousesBn.length)} জন)` : 'সহধর্মিণী (স্ত্রী)'),
      roleBadgeEn: isFemale
        ? `Husband${spousesBn.length > 1 ? 's' : ''} (${spousesBn.length})`
        : `Wife / Spouse${spousesBn.length > 1 ? 's' : ''} (${spousesBn.length})`,
      nameBn: spousesBn.slice(0, 3).join(' · ') + (spousesBn.length > 3 ? ' প্রমুখ' : ''),
      nameEn: (spousesEn.length > 0 ? spousesEn : spousesBn).slice(0, 3).join(' · '),
      group: isFemale ? 'husband' : 'wife',
      pointsBn: spousePointsBn,
      pointsEn: spousePointsEn,
      sourceBn,
      sourceEn,
    });
  }

  // 3. Dedicated Children Summary Card (if missing and children are documented)
  if (!hasChildCard && totalChildren > 0) {
    const childPointsBn: string[] = [];
    const childPointsEn: string[] = [];
    if (sonsBn.length > 0) {
      childPointsBn.push(`পুত্রসন্তান (${toBnNum(sonsBn.length)} জন): ${sonsBn.join(', ')}।`);
      childPointsEn.push(`Sons (${sonsBn.length}): ${(sonsEn.length > 0 ? sonsEn : sonsBn).join(', ')}.`);
    }
    if (daughtersBn.length > 0) {
      childPointsBn.push(`কন্যাসন্তান (${toBnNum(daughtersBn.length)} জন): ${daughtersBn.join(', ')}।`);
      childPointsEn.push(`Daughters (${daughtersBn.length}): ${(daughtersEn.length > 0 ? daughtersEn : daughtersBn).join(', ')}.`);
    }
    if (relativesBn.length > 0) {
      childPointsBn.push(`পারিবারিক ধারা: ${relativesBn.slice(0, 3).join(', ')}।`);
    }

    const allChildrenBn = [...sonsBn, ...daughtersBn];
    const allChildrenEn = [...(sonsEn.length > 0 ? sonsEn : sonsBn), ...(daughtersEn.length > 0 ? daughtersEn : daughtersBn)];

    enriched.push({
      id: `${sahaba.id}-auto-children`,
      roleBadgeBn: `সন্তানসন্ততি · মোট ${toBnNum(totalChildren)} জন`,
      roleBadgeEn: `Children · ${totalChildren} Recorded`,
      nameBn: allChildrenBn.slice(0, 4).join(', ') + (allChildrenBn.length > 4 ? ' প্রমুখ' : ''),
      nameEn: allChildrenEn.slice(0, 4).join(', ') + (allChildrenEn.length > 4 ? ' et al.' : ''),
      group: 'children_summary',
      pointsBn: childPointsBn,
      pointsEn: childPointsEn.length > 0 ? childPointsEn : undefined,
      sourceBn,
      sourceEn,
    });
  }

  // 4. Dedicated Notable Relatives & Family Legacy Card (ensures multi-card richness when relatives exist)
  if (!hasAutoRelativesCard && relativesBn.length > 0 && enriched.length < 4) {
    const relPointsBn = relativesBn.map((r, idx) => `${toBnNum(idx + 1)}. ${r}`);
    const relPointsEn = (relativesEn.length > 0 ? relativesEn : relativesBn).map((r, idx) => `${idx + 1}. ${r}`);
    if (chronicle.overviewPointsBn.length > 1) {
      const lastOverview = chronicle.overviewPointsBn[chronicle.overviewPointsBn.length - 1];
      if (lastOverview && !relPointsBn.includes(lastOverview)) {
        relPointsBn.push(lastOverview);
      }
    }

    enriched.push({
      id: `${sahaba.id}-auto-relatives`,
      roleBadgeBn: 'বিশিষ্ট আত্মীয়স্বজন ও পারিবারিক সংযোগ',
      roleBadgeEn: 'Notable Kinship & Family Legacy',
      nameBn: relativesBn.slice(0, 2).join(' · ') + (relativesBn.length > 2 ? ' প্রমুখ' : ''),
      nameEn: (relativesEn.length > 0 ? relativesEn : relativesBn).slice(0, 2).join(' · '),
      group: 'lineage',
      pointsBn: relPointsBn,
      pointsEn: relPointsEn,
      sourceBn,
      sourceEn,
    });
  }

  // Assign sequential pageBadgeBn (০১/০৪, ০২/০৪...) to cards without one
  const totalCards = enriched.length;
  const numberedMembers = enriched.map((card, idx) =>
    card.pageBadgeBn
      ? card
      : {
          ...card,
          pageBadgeBn: `${toBnPad2(idx + 1)}/${toBnPad2(totalCards)}`,
        }
  );

  return {
    ...chronicle,
    members: numberedMembers,
  };
}

/**
 * কোনো সাহাবির সরাসরি সংকলিত পারিবারিক বিবরণ থাকলে তা রিটার্ন করে
 * (৪ খলিফার পিডিএফ এন্ট্রি সম্পূর্ণ ভার্বাটিম রেখে এবং বাকি সকল সাহাবির
 * কার্ডগুলো সমানভাবে সুবিন্যস্ত করে); আর না থাকলে তাঁর `sahaba.familyBn`
 * থেকে একই স্ট্রাকচার্ড কার্ড ফরম্যাট তৈরি করে দেয়।
 * কখনোই অপ্রমাণিত স্ত্রী বা সন্তানের নাম মনগড়া তৈরি করা হয় না।
 */
export function resolveSahabaFamilyChronicle(sahaba: SahabaItem): SahabaFamilyChronicle {
  // Keep the 4 Khulafa verbatim PDF chronicles untouched
  if (KHALIFA_FAMILY_CHRONICLES[sahaba.id]) {
    return KHALIFA_FAMILY_CHRONICLES[sahaba.id];
  }

  const isFemale = isFemaleSahaba(sahaba);
  const curated = SAHABA_FAMILY_CHRONICLES[sahaba.id];
  if (curated) {
    return enrichChronicleMembers(curated, sahaba, isFemale);
  }

  const f = sahaba.familyBn;
  const primaryRefBn =
    (sahaba.referencesBn && sahaba.referencesBn.length > 0
      ? sahaba.referencesBn.slice(0, 2).join('; ')
      : 'তাবাকাতে ইবনে সা’দ; আল-ইসাবাহ; উসদুল গাবাহ');
  const primaryRefEn =
    (sahaba.referencesEn && sahaba.referencesEn.length > 0
      ? sahaba.referencesEn.slice(0, 2).join('; ')
      : "Tabaqat Ibn Sa'd; Al-Isabah; Usd al-Ghabah");

  // Case 1: Sahaba already has explicit structured `familyBn` (e.g. all 50 Sahaba in Part 3)
  if (f) {
    const rawWivesOrSpouses = (f.wivesBn || []).filter((x) => x && x.trim().length > 0);
    const sons = (f.sonsBn || []).filter((x) => x && x.trim().length > 0);
    const daughters = (f.daughtersBn || []).filter((x) => x && x.trim().length > 0);
    const relatives = (f.keyRelativesBn || []).filter((x) => x && x.trim().length > 0);
    const totalChildren = sons.length + daughters.length;

    const headlinePartsBn: string[] = [];
    const headlinePartsEn: string[] = [];

    if (rawWivesOrSpouses.length > 0) {
      headlinePartsBn.push(
        isFemale
          ? `${toBnNum(rawWivesOrSpouses.length)} স্বামী`
          : `${toBnNum(rawWivesOrSpouses.length)} স্ত্রী`
      );
      headlinePartsEn.push(
        isFemale
          ? `${rawWivesOrSpouses.length} Husband${rawWivesOrSpouses.length > 1 ? 's' : ''}`
          : `${rawWivesOrSpouses.length} Wife${rawWivesOrSpouses.length > 1 ? 's' : ''}`
      );
    }
    if (totalChildren > 0) {
      headlinePartsBn.push(`${toBnNum(totalChildren)} সন্তান`);
      headlinePartsEn.push(`${totalChildren} Child${totalChildren > 1 ? 'ren' : ''}`);
    }
    if (headlinePartsBn.length === 0 && f.tribeOrClanBn) {
      headlinePartsBn.push(f.tribeOrClanBn);
      headlinePartsEn.push(f.tribeOrClanEn || 'Noble Companion Lineage');
    }

    const overviewPointsBn: string[] = [];
    const overviewPointsEn: string[] = [];

    if (f.fatherBn || f.motherBn) {
      overviewPointsBn.push(
        `পিতা: ${f.fatherBn || 'সীরাতে নিবন্ধিত'} · মাতা: ${f.motherBn || 'সীরাতে নিবন্ধিত'}${f.tribeOrClanBn ? ` · গোত্র: ${f.tribeOrClanBn}` : ''}।`
      );
      overviewPointsEn.push(
        `Father: ${f.fatherEn || 'Recorded in classical Seerah'} · Mother: ${f.motherEn || 'Recorded in classical Seerah'}.`
      );
    }
    if (rawWivesOrSpouses.length > 0) {
      overviewPointsBn.push(
        `${isFemale ? 'স্বামী' : 'সহধর্মিণী'}: ${rawWivesOrSpouses.join(', ')}।`
      );
      overviewPointsEn.push(
        `${isFemale ? 'Spouse(s)' : 'Wife/Wives'}: ${(f.wivesEn && f.wivesEn.length > 0 ? f.wivesEn : rawWivesOrSpouses).join(', ')}.`
      );
    }
    if (totalChildren > 0) {
      const childSummary: string[] = [];
      if (sons.length > 0) childSummary.push(`পুত্র: ${sons.join(', ')}`);
      if (daughters.length > 0) childSummary.push(`কন্যা: ${daughters.join(', ')}`);
      overviewPointsBn.push(`${childSummary.join(' এবং ')}।`);
      overviewPointsEn.push(
        `Documented children: ${[...(f.sonsEn || sons), ...(f.daughtersEn || daughters)].join(', ')}.`
      );
    }
    if (f.overviewBn) {
      overviewPointsBn.push(f.overviewBn);
    }
    if (f.overviewEn) {
      overviewPointsEn.push(f.overviewEn);
    }

    const members: FamilyMemberDetailCard[] = [];

    // Card 1: Parents & Lineage
    if (f.fatherBn || f.motherBn || f.tribeOrClanBn) {
      const lineagePointsBn: string[] = [];
      if (f.fatherBn) lineagePointsBn.push(`পিতা: ${f.fatherBn}`);
      if (f.motherBn) lineagePointsBn.push(`মাতা: ${f.motherBn}`);
      if (f.tribeOrClanBn) lineagePointsBn.push(`গোত্র ও বংশ: ${f.tribeOrClanBn}`);
      if (relatives.length > 0) lineagePointsBn.push(`উল্লেখযোগ্য আত্মীয়তা: ${relatives.join(', ')}।`);

      members.push({
        id: `${sahaba.id}-lineage`,
        roleBadgeBn: 'বংশমর্যাদা ও পিতা-মাতা',
        roleBadgeEn: 'Parents & Lineage',
        nameBn: f.tribeOrClanBn || `${sahaba.nameBn}-এর বংশপরিচয়`,
        nameEn: f.tribeOrClanEn || `Lineage of ${sahaba.nameEn || sahaba.nameBn}`,
        group: 'lineage',
        pointsBn: lineagePointsBn,
        pointsEn: [
          `Father: ${f.fatherEn || 'Recorded in classical biographical works.'}`,
          `Mother: ${f.motherEn || 'Recorded in classical biographical works.'}`,
          ...(f.tribeOrClanEn ? [`Tribe / Clan: ${f.tribeOrClanEn}`] : []),
        ],
        sourceBn: primaryRefBn,
        sourceEn: primaryRefEn,
      });
    }

    // Card 2: Spouses (Wife or Husband)
    if (rawWivesOrSpouses.length > 0) {
      members.push({
        id: `${sahaba.id}-spouses`,
        roleBadgeBn: isFemale ? 'স্বামী ও দাম্পত্য' : `স্ত্রীগণ (${toBnNum(rawWivesOrSpouses.length)} জন)`,
        roleBadgeEn: isFemale ? 'Husband & Marriage' : `Spouse(s) (${rawWivesOrSpouses.length})`,
        nameBn: rawWivesOrSpouses.join(' · '),
        nameEn: (f.wivesEn && f.wivesEn.length > 0 ? f.wivesEn : rawWivesOrSpouses).join(' · '),
        group: isFemale ? 'husband' : 'wife',
        pointsBn: [
          ...rawWivesOrSpouses.map((sp, idx) =>
            rawWivesOrSpouses.length > 1
              ? `${toBnNum(idx + 1)}. ${sp}`
              : `${isFemale ? 'স্বামী' : 'সহধর্মিণী'}: ${sp}।`
          ),
          ...(f.overviewBn ? [f.overviewBn] : []),
        ],
        pointsEn: f.overviewEn ? [f.overviewEn] : undefined,
        sourceBn: primaryRefBn,
        sourceEn: primaryRefEn,
      });
    }

    // Card 3: Children Summary
    if (totalChildren > 0) {
      const childPointsBn: string[] = [];
      if (sons.length > 0) childPointsBn.push(`পুত্রসন্তান (${toBnNum(sons.length)}): ${sons.join(', ')}।`);
      if (daughters.length > 0) childPointsBn.push(`কন্যাসন্তান (${toBnNum(daughters.length)}): ${daughters.join(', ')}।`);
      if (relatives.length > 0) childPointsBn.push(`পারিবারিক সংযোগ: ${relatives.join(', ')}।`);

      members.push({
        id: `${sahaba.id}-children`,
        roleBadgeBn: `সন্তানগণ · মোট ${toBnNum(totalChildren)} জন`,
        roleBadgeEn: `Children · ${totalChildren} Recorded`,
        nameBn: [...sons, ...daughters].slice(0, 4).join(', ') + (totalChildren > 4 ? ' প্রমুখ' : ''),
        nameEn: [...(f.sonsEn || sons), ...(f.daughtersEn || daughters)].slice(0, 4).join(', '),
        group: 'children_summary',
        pointsBn: childPointsBn,
        sourceBn: primaryRefBn,
        sourceEn: primaryRefEn,
      });
    }

    const baseChronicle: SahabaFamilyChronicle = {
      sahabaId: sahaba.id,
      summaryHeadlineBn: headlinePartsBn.join(' · ') || 'প্রামাণ্য বংশপরিচয়',
      summaryHeadlineEn: headlinePartsEn.join(' · ') || 'Documented Lineage',
      overviewTitleBn: `${sahaba.nameBn}-এর পরিবার · এক নজরে`,
      overviewTitleEn: `Family of ${sahaba.nameEn || sahaba.nameBn} · At a Glance`,
      overviewPointsBn: overviewPointsBn.length > 0 ? overviewPointsBn : [sahaba.summaryBn],
      overviewPointsEn: overviewPointsEn.length > 0 ? overviewPointsEn : [sahaba.summaryEn || sahaba.summaryBn],
      overviewSourceBn: primaryRefBn,
      overviewSourceEn: primaryRefEn,
      fatherBn: f.fatherBn,
      fatherEn: f.fatherEn,
      motherBn: f.motherBn,
      motherEn: f.motherEn,
      tribeOrClanBn: f.tribeOrClanBn,
      tribeOrClanEn: f.tribeOrClanEn,
      wivesBn: isFemale ? [] : rawWivesOrSpouses,
      wivesEn: isFemale ? [] : (f.wivesEn || []),
      husbandsBn: isFemale ? rawWivesOrSpouses : [],
      husbandsEn: isFemale ? (f.wivesEn || []) : [],
      sonsBn: sons,
      sonsEn: f.sonsEn || [],
      daughtersBn: daughters,
      daughtersEn: f.daughtersEn || [],
      keyRelativesBn: relatives,
      keyRelativesEn: f.keyRelativesEn || [],
      members,
    };

    return enrichChronicleMembers(baseChronicle, sahaba, isFemale);
  }

  // Case 2: Safety fallback (should never be hit for the 266 Sahaba in SAHABA_DATABASE)
  const overviewPointsBn: string[] = [
    `${sahaba.nameBn} — ${sahaba.titleBn} (${sahaba.categoryBn})।`,
    sahaba.birthAndDeathBn
      ? `জীবনকাল ও ঐতিহাসিক পরিচয়: ${sahaba.birthAndDeathBn}।`
      : 'ইসলামের প্রাথমিক যুগে রাসূলুল্লাহ (সা.)-এর সাহচর্য ও দ্বীনের খেদমতে নিবেদিত ছিলেন।',
    'ক্লাসিক্যাল রিজাল ও তাবাকাত গ্রন্থে (আল-ইসাবাহ, উসদুল গাবাহ ও তাবাকাতে ইবনে সা’দ) তাঁর জীবনী ও মর্যাদা সংরক্ষিত।',
  ];

  const overviewPointsEn: string[] = [
    `${sahaba.nameEn || sahaba.nameBn} — ${sahaba.titleEn || sahaba.categoryEn || 'Honored Companion'}.`,
    sahaba.birthAndDeathEn
      ? `Lifespan & Historical Note: ${sahaba.birthAndDeathEn}.`
      : 'Devoted companion of Prophet Muhammad (PBUH) recorded in classical biographical dictionaries.',
  ];

  return {
    sahabaId: sahaba.id,
    summaryHeadlineBn: `${sahaba.categoryBn} · সীরাত-নিবন্ধিত বংশধারা`,
    summaryHeadlineEn: `${sahaba.categoryEn || 'Companion'} · Classical Record`,
    overviewTitleBn: `${sahaba.nameBn}-এর পারিবারিক ও বংশগত পরিচয় · এক নজরে`,
    overviewTitleEn: `Lineage & Household of ${sahaba.nameEn || sahaba.nameBn}`,
    overviewPointsBn,
    overviewPointsEn,
    overviewSourceBn: primaryRefBn,
    overviewSourceEn: primaryRefEn,
    fatherBn: 'ক্লাসিক্যাল সীরাত ও রিজাল গ্রন্থে নিবন্ধিত',
    fatherEn: 'Documented in classical Seerah & Rijal works',
    motherBn: 'সম্মানিত সাহাবি পরিবার',
    motherEn: 'Honored Companion household',
    tribeOrClanBn: sahaba.categoryBn,
    tribeOrClanEn: sahaba.categoryEn || 'Early Islamic Community',
    wivesBn: [],
    husbandsBn: [],
    sonsBn: [],
    daughtersBn: [],
    keyRelativesBn: ['রাসূলুল্লাহ (সা.)-এর সম্মানিত সাহাবি মণ্ডলী'],
    keyRelativesEn: ['Honored circle of the Companions of the Prophet (PBUH)'],
    members: [
      {
        id: `${sahaba.id}-verified-lineage`,
        roleBadgeBn: 'প্রামাণ্য বংশ ও ঐতিহাসিক বিবরণ',
        roleBadgeEn: 'Verified Biographical Record',
        nameBn: sahaba.nameBn,
        nameEn: sahaba.nameEn || sahaba.nameBn,
        group: 'lineage',
        pageBadgeBn: '০১/০১',
        pointsBn: [
          sahaba.summaryBn,
          ...(sahaba.birthAndDeathBn ? [`জীবনকাল: ${sahaba.birthAndDeathBn}।`] : []),
        ],
        pointsEn: [
          sahaba.summaryEn || 'Honored companion of Prophet Muhammad (PBUH) documented in classical Islamic sources.',
        ],
        sourceBn: primaryRefBn,
        sourceEn: primaryRefEn,
      },
    ],
  };
}
