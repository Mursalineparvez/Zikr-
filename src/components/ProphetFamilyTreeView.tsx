/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Clock,
  Copy,
  GitBranch,
  Heart,
  MapPin,
  Search,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { FAMILY_EVENTS, FAMILY_PARTS, FamilyEvent } from '../data/prophetFamily47Data';
import { copyToClipboard } from '../utils/clipboard';

interface ProphetFamilyTreeViewProps {
  themeMode: ThemeMode;
  selectedLanguage: ZikrLanguage;
  soundEnabled?: boolean;
  visitedEvents: Record<number, boolean>;
  onSelectMemberForReader: (memberNo: number) => void;
  onMarkVisited?: (memberNo: number) => void;
  onPlayTap?: () => void;
}

type TreeBranchFilter = 'all' | 'ancestors' | 'wives' | 'descendants';
type AccentKey = 'emerald' | 'amber' | 'violet' | 'blue' | 'teal' | 'rose' | 'indigo';

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const toBn = (n: number, pad = false): string => {
  const raw = pad ? String(n).padStart(2, '0') : String(n);
  return raw.replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
};

// Clean display name by removing leading "০১. " or "01. " prefix
const cleanName = (raw: string): string => raw.replace(/^[\d০-৯]+\.\s*/, '').trim();

// Direct kinship map for interactive relative-to-relative navigation inside the drawer
const KINSHIP_LINKS: Record<number, Array<{ no: number; relBn: string; relEn: string }>> = {
  1: [
    { no: 2, relBn: 'স্ত্রী', relEn: 'Wife' },
    { no: 3, relBn: 'পিতা', relEn: 'Father' },
    { no: 4, relBn: 'মাতা', relEn: 'Mother' },
    { no: 33, relBn: 'সহোদর ভাই', relEn: 'Full Brother' },
  ],
  2: [
    { no: 1, relBn: 'স্বামী', relEn: 'Husband' },
    { no: 3, relBn: 'শ্বশুর', relEn: 'Father-in-Law' },
    { no: 4, relBn: 'শাশুড়ি', relEn: 'Mother-in-Law' },
  ],
  3: [
    { no: 4, relBn: 'স্ত্রী', relEn: 'Wife' },
    { no: 1, relBn: 'পুত্র (আব্দুল্লাহ)', relEn: 'Son (Abdullah)' },
    { no: 33, relBn: 'পুত্র (আবু তালিব)', relEn: 'Son (Abu Talib)' },
    { no: 34, relBn: 'পুত্র (হামযা)', relEn: 'Son (Hamza)' },
    { no: 35, relBn: 'পুত্র (আব্বাস)', relEn: 'Son (Abbas)' },
    { no: 42, relBn: 'কন্যা (সাফিয়া)', relEn: 'Daughter (Safiyyah)' },
  ],
  4: [
    { no: 3, relBn: 'স্বামী', relEn: 'Husband' },
    { no: 1, relBn: 'পুত্র (আব্দুল্লাহ)', relEn: 'Son (Abdullah)' },
    { no: 33, relBn: 'পুত্র (আবু তালিব)', relEn: 'Son (Abu Talib)' },
    { no: 38, relBn: 'পুত্র (যুবাইর)', relEn: 'Son (Zubayr)' },
  ],
  5: [
    { no: 16, relBn: 'পুত্র', relEn: 'Son' },
    { no: 17, relBn: 'কন্যা', relEn: 'Daughter' },
    { no: 18, relBn: 'কন্যা', relEn: 'Daughter' },
    { no: 19, relBn: 'কন্যা', relEn: 'Daughter' },
    { no: 20, relBn: 'কন্যা', relEn: 'Daughter' },
    { no: 21, relBn: 'পুত্র', relEn: 'Son' },
  ],
  16: [{ no: 5, relBn: 'মাতা', relEn: 'Mother' }],
  17: [
    { no: 5, relBn: 'মাতা', relEn: 'Mother' },
    { no: 32, relBn: 'স্বামী', relEn: 'Husband' },
    { no: 27, relBn: 'কন্যা', relEn: 'Daughter' },
    { no: 28, relBn: 'পুত্র', relEn: 'Son' },
  ],
  18: [
    { no: 5, relBn: 'মাতা', relEn: 'Mother' },
    { no: 31, relBn: 'স্বামী', relEn: 'Husband' },
    { no: 29, relBn: 'পুত্র', relEn: 'Son' },
    { no: 19, relBn: 'বোন', relEn: 'Sister' },
  ],
  19: [
    { no: 5, relBn: 'মাতা', relEn: 'Mother' },
    { no: 31, relBn: 'স্বামী', relEn: 'Husband' },
    { no: 18, relBn: 'বোন', relEn: 'Sister' },
  ],
  20: [
    { no: 5, relBn: 'মাতা', relEn: 'Mother' },
    { no: 30, relBn: 'স্বামী', relEn: 'Husband' },
    { no: 23, relBn: 'পুত্র', relEn: 'Son' },
    { no: 24, relBn: 'পুত্র', relEn: 'Son' },
    { no: 25, relBn: 'কন্যা', relEn: 'Daughter' },
    { no: 26, relBn: 'কন্যা', relEn: 'Daughter' },
  ],
  21: [{ no: 5, relBn: 'মাতা', relEn: 'Mother' }],
  23: [
    { no: 20, relBn: 'মাতা', relEn: 'Mother' },
    { no: 30, relBn: 'পিতা', relEn: 'Father' },
    { no: 24, relBn: 'ভাই', relEn: 'Brother' },
  ],
  24: [
    { no: 20, relBn: 'মাতা', relEn: 'Mother' },
    { no: 30, relBn: 'পিতা', relEn: 'Father' },
    { no: 23, relBn: 'ভাই', relEn: 'Brother' },
    { no: 25, relBn: 'বোন', relEn: 'Sister' },
  ],
  25: [
    { no: 20, relBn: 'মাতা', relEn: 'Mother' },
    { no: 30, relBn: 'পিতা', relEn: 'Father' },
    { no: 24, relBn: 'ভাই', relEn: 'Brother' },
  ],
  26: [
    { no: 20, relBn: 'মাতা', relEn: 'Mother' },
    { no: 30, relBn: 'পিতা', relEn: 'Father' },
  ],
  27: [
    { no: 17, relBn: 'মাতা', relEn: 'Mother' },
    { no: 32, relBn: 'পিতা', relEn: 'Father' },
    { no: 28, relBn: 'ভাই', relEn: 'Brother' },
  ],
  28: [
    { no: 17, relBn: 'মাতা', relEn: 'Mother' },
    { no: 32, relBn: 'পিতা', relEn: 'Father' },
    { no: 27, relBn: 'বোন', relEn: 'Sister' },
  ],
  29: [
    { no: 18, relBn: 'মাতা', relEn: 'Mother' },
    { no: 31, relBn: 'পিতা', relEn: 'Father' },
  ],
  30: [
    { no: 33, relBn: 'পিতা', relEn: 'Father' },
    { no: 20, relBn: 'স্ত্রী', relEn: 'Wife' },
    { no: 23, relBn: 'পুত্র', relEn: 'Son' },
    { no: 24, relBn: 'পুত্র', relEn: 'Son' },
  ],
  31: [
    { no: 18, relBn: '১ম স্ত্রী', relEn: '1st Wife' },
    { no: 19, relBn: '২য় স্ত্রী', relEn: '2nd Wife' },
    { no: 29, relBn: 'পুত্র', relEn: 'Son' },
    { no: 47, relBn: 'নানী (নবীজির ফুফু)', relEn: 'Grandmother' },
  ],
  32: [
    { no: 17, relBn: 'স্ত্রী', relEn: 'Wife' },
    { no: 27, relBn: 'কন্যা', relEn: 'Daughter' },
    { no: 28, relBn: 'পুত্র', relEn: 'Son' },
  ],
  33: [
    { no: 3, relBn: 'পিতা', relEn: 'Father' },
    { no: 4, relBn: 'মাতা', relEn: 'Mother' },
    { no: 1, relBn: 'সহোদর ভাই', relEn: 'Full Brother' },
    { no: 30, relBn: 'পুত্র (আলী রা.)', relEn: 'Son (Ali RA)' },
  ],
  34: [
    { no: 3, relBn: 'পিতা', relEn: 'Father' },
    { no: 42, relBn: 'সহোদর বোন', relEn: 'Full Sister' },
  ],
  35: [
    { no: 3, relBn: 'পিতা', relEn: 'Father' },
    { no: 41, relBn: 'সহোদর ভাই', relEn: 'Full Brother' },
  ],
  42: [
    { no: 3, relBn: 'পিতা', relEn: 'Father' },
    { no: 34, relBn: 'সহোদর ভাই', relEn: 'Full Brother' },
  ],
  45: [
    { no: 3, relBn: 'পিতা', relEn: 'Father' },
    { no: 11, relBn: 'কন্যা (যায়নাব রা.)', relEn: 'Daughter (Zaynab RA)' },
  ],
  46: [
    { no: 3, relBn: 'পিতা', relEn: 'Father' },
    { no: 10, relBn: 'পুত্রবধূ (উম্মে সালামা)', relEn: 'Daughter-in-Law' },
  ],
  47: [
    { no: 3, relBn: 'পিতা', relEn: 'Father' },
    { no: 1, relBn: 'যমজ ভাই', relEn: 'Twin Brother' },
    { no: 31, relBn: 'নাতি (উসমান রা.)', relEn: 'Grandson (Uthman RA)' },
  ],
};

// Dedicated central entry for Prophet Muhammad ﷺ (no: 0) when tapping the illuminated crest
const PROPHET_LINEAGE_OVERVIEW: FamilyEvent = {
  no: 0,
  partNo: 0,
  timeContextBn: 'রবিউল আউয়াল, হস্তিবর্ষ (৫৭০ খ্রি.) — ১২ রবিউল আউয়াল, ১১ হিজরি (৬৩২ খ্রি.)',
  timeContextEn: 'Rabi al-Awwal, Year of the Elephant (570 CE) — 11 AH (632 CE)',
  titleBn: 'হযরত মুহাম্মদ মুস্তফা ﷺ — পবিত্র বংশপরিচয় (নসবনামা)',
  titleEn: 'Prophet Muhammad ﷺ — Blessed Lineage & Family Overview',
  pointsBn: [
    'পবিত্র নসবনামা: মুহাম্মদ ইবনে আব্দুল্লাহ ইবনে আব্দুল মুত্তালিব ইবনে হাশিম ইবনে আবদে মানাফ ইবনে কুসাই ইবনে কিলাব... ইবনে ফিহর (কুরাইশ) ইবনে কিনানা... ইবনে আদনান (ইসমাঈল আ.-এর বংশধর)।',
    'পিতা আব্দুল্লাহ তাঁর জন্মের পূর্বেই এবং মাতা আমিনা (রা.) তাঁর ৬ বছর বয়সে ইন্তেকাল করেন; ৮ বছর বয়স পর্যন্ত দাদা আব্দুল মুত্তালিব ও পরবর্তীতে চাচা আবু তালিব তাঁকে লালন-পালন করেন।',
    'এই বংশতালিকায় তাঁর ২ জন বাবা-মা, ২ জন দাদা-দাদি, ১১ জন উম্মাহাতুল মুমিনীন, ৭ জন সন্তান, ৭ জন নাতি-নাতনি, ৩ জন জামাতা, ৯ জন চাচা ও ৬ জন ফুফু—মোট ৪৭ জন নিকটজনের প্রামাণ্য বিবরণ সংকলিত হয়েছে।',
  ],
  pointsEn: [
    'Blessed Lineage: Muhammad ibn Abdullah ibn Abdul Muttalib ibn Hashim ibn Abd Manaf ibn Qusayy ibn Kilab... ibn Fihr (Quraysh) ibn Kinanah... ibn Adnan (descendant of Prophet Ismail AS).',
    'His father Abdullah passed before his birth and his mother Aminah (RA) when he was 6; he was raised by grandfather Abdul Muttalib until age 8, then by uncle Abu Talib.',
    'This genealogy maps all 47 documented close relatives: 2 parents, 2 grandparents, 11 Mothers of the Believers, 7 children, 7 grandchildren, 3 sons-in-law, 9 paternal uncles, and 6 paternal aunts.',
  ],
  detailedNarrativeBn:
    'আল্লাহ তাআলা শেষ নবী হযরত মুহাম্মদ ﷺ-কে মানবজাতির সর্বশ্রেষ্ঠ ও পবিত্রতম বংশধারায় প্রেরণ করেছেন। সহীহ মুসলিমে রাসূলুল্লাহ ﷺ নিজেই ইরশাদ করেছেন: “নিশ্চয়ই আল্লাহ তাআলা ইসমাঈল (আ.)-এর সন্তানদের মধ্য থেকে কিনানাকে মনোনীত করেছেন, কিনানা থেকে কুরাইশকে মনোনীত করেছেন, কুরাইশ থেকে বনু হাশিমকে মনোনীত করেছেন এবং বনু হাশিম থেকে আমাকে মনোনীত করেছেন।” তাঁর পিতা-মাতা, স্ত্রীগণ, সন্তানগণ, জামাতাগণ ও দৌহিত্র-দৌহিত্রীর জীবনগাথা ইসলামের ইতিহাসে ঈমান, ত্যাগ, সহমর্মিতা ও পারিবারিক আদর্শের উজ্জ্বলতম আলোকবর্তিকা।',
  detailedNarrativeEn:
    'Allah chose the purest and most honorable lineage for the Final Messenger ﷺ. In Sahih Muslim, the Prophet ﷺ stated: "Indeed Allah chose Kinanah from the children of Ismail, chose Quraysh from Kinanah, chose Banu Hashim from Quraysh, and chose me from Banu Hashim." The biographies of his parents, wives, children, sons-in-law, and grandchildren illuminate Islamic history with timeless ideals of faith, mercy, and sacrifice.',
  extendedContextBn:
    'রাসূলুল্লাহ ﷺ-এর তিন পুত্র শৈশবেই ইন্তেকাল করেন এবং তাঁর কনিষ্ঠ কন্যা হযরত ফাতিমা (রা.) ও জামাতা আলী (রা.)-এর সন্তান ইমাম হাসান ও হুসাইন (রা.)-এর মাধ্যমেই কিয়ামত পর্যন্ত তাঁর পবিত্র আহলে বাইত বংশধারা অব্যাহত রয়েছে।',
  extendedContextEn:
    'His three sons passed away in infancy, and his blessed prophetic lineage continues through his youngest daughter Fatimah (RA) and Ali (RA) via Imam Hasan and Imam Husain (RA).',
  locationBn: 'মক্কা মুকাররমা ও মদিনা মুনাওয়ারা (রওজায়ে আতহার)',
  locationEn: 'Makkah al-Mukarramah & Madinah al-Munawwarah',
  keyFiguresBn: 'আব্দুল মুত্তালিব, আব্দুল্লাহ, আমিনা (রা.), খাদিজা (রা.), ফাতিমা (রা.), আলী (রা.)',
  keyFiguresEn: 'Abdul Muttalib, Abdullah, Aminah (RA), Khadijah (RA), Fatimah (RA), Ali (RA)',
  reflectionBn:
    'নবীজির পবিত্র পরিবার ও বংশপরিচয় জানা মানেই তাঁর সীরাত, ভালোবাসা ও আহলে বাইতের মর্যাদাকে হৃদয়ে ধারণ করা।',
  reflectionEn:
    'Knowing the Prophetic household deepens our love for the Messenger ﷺ and reverence for his noble family.',
  arabicQuote: 'إِنَّ اللَّهَ اصْطَفَى كِنَانَةَ مِنْ وَلَدِ إِسْمَاعِيلَ وَاصْطَفَى قُرَيْشًا مِنْ كِنَانَةَ وَاصْطَفَى مِنْ قُرَيْشٍ بَنِي هَاشِمٍ وَاصْطَفَانِي مِنْ بَنِي هَاشِمٍ',
  sourceBn: 'সহীহ মুসলিম ও সহীহ বুখারী',
  sourceEn: 'Sahih Muslim & Sahih al-Bukhari',
  references: [
    {
      bookBn: 'সহীহ মুসলিম',
      bookEn: 'Sahih Muslim',
      chapterBn: 'কিতাবুল ফাযায়িল · নবী ﷺ-এর বংশের মর্যাদা',
      chapterEn: 'Book of Virtues · Nobility of the Prophet’s Lineage',
      citationBn: 'সহীহ মুসলিম, হাদিস নং ২২৭৬',
      citationEn: 'Sahih Muslim, Hadith 2276',
      gradeBn: 'সহীহ',
      gradeEn: 'Sahih',
    },
    {
      bookBn: 'সহীহ বুখারী',
      bookEn: 'Sahih al-Bukhari',
      chapterBn: 'মানাকিব · নবী ﷺ-এর নসবনামা',
      chapterEn: 'Virtues · Lineage of the Prophet ﷺ',
      citationBn: 'সহীহ বুখারী, হাদিস নং ৩৫৫৭ ও ৩৮৫১',
      citationEn: 'Sahih al-Bukhari, Hadith 3557 & 3851',
      gradeBn: 'সহীহ',
      gradeEn: 'Sahih',
    },
  ],
};

export const ProphetFamilyTreeView: React.FC<ProphetFamilyTreeViewProps> = ({
  themeMode,
  selectedLanguage,
  visitedEvents,
  onSelectMemberForReader,
  onMarkVisited,
  onPlayTap,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';

  const [branchFilter, setBranchFilter] = useState<TreeBranchFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMemberNo, setSelectedMemberNo] = useState<number | null>(null);
  const [showAllUncles, setShowAllUncles] = useState<boolean>(true);
  const [showAllAunts, setShowAllAunts] = useState<boolean>(true);
  const [showAllWives, setShowAllWives] = useState<boolean>(true);
  const [copiedMemberNo, setCopiedMemberNo] = useState<number | null>(null);

  const drawerScrollRef = useRef<HTMLDivElement | null>(null);
  const gen1Ref = useRef<HTMLDivElement | null>(null);
  const gen2Ref = useRef<HTMLDivElement | null>(null);
  const gen3Ref = useRef<HTMLDivElement | null>(null);
  const gen4Ref = useRef<HTMLDivElement | null>(null);

  const memberMap = useMemo(() => {
    const map = new Map<number, FamilyEvent>();
    FAMILY_EVENTS.forEach((ev) => map.set(ev.no, ev));
    return map;
  }, []);

  const partMap = useMemo(() => {
    const map = new Map<number, (typeof FAMILY_PARTS)[number]>();
    FAMILY_PARTS.forEach((p) => map.set(p.partNo, p));
    return map;
  }, []);

  const selectedMember: FamilyEvent | null = useMemo(() => {
    if (selectedMemberNo === null) return null;
    if (selectedMemberNo === 0) return PROPHET_LINEAGE_OVERVIEW;
    return memberMap.get(selectedMemberNo) ?? null;
  }, [selectedMemberNo, memberMap]);

  useEffect(() => {
    if (drawerScrollRef.current) {
      drawerScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedMemberNo]);

  const queryLower = searchQuery.trim().toLowerCase();
  const matchingNos = useMemo(() => {
    if (!queryLower) return null;
    const set = new Set<number>();
    FAMILY_EVENTS.forEach((ev) => {
      const hay = `${ev.titleBn} ${ev.titleEn} ${ev.timeContextBn} ${ev.timeContextEn} ${ev.locationBn} ${ev.locationEn} ${ev.detailedNarrativeBn}`.toLowerCase();
      if (hay.includes(queryLower)) set.add(ev.no);
    });
    return set;
  }, [queryLower]);

  const openMemberSheet = (no: number) => {
    if (onPlayTap) onPlayTap();
    setSelectedMemberNo(no);
    if (no > 0 && onMarkVisited) {
      onMarkVisited(no);
    }
  };

  const handleCopyBiography = async (ev: FamilyEvent) => {
    if (onPlayTap) onPlayTap();
    const refsText = ev.references
      .map(
        (r, i) =>
          `${i + 1}. ${isBn ? r.bookBn : r.bookEn} — ${isBn ? r.chapterBn : r.chapterEn} (${isBn ? r.citationBn : r.citationEn}) [${isBn ? r.gradeBn : r.gradeEn}]`
      )
      .join('\n');
    const text = [
      isBn ? ev.titleBn : ev.titleEn,
      `${isBn ? 'সময়কাল' : 'Timeframe'}: ${isBn ? ev.timeContextBn : ev.timeContextEn}`,
      `${isBn ? 'স্থান' : 'Location'}: ${isBn ? ev.locationBn : ev.locationEn}`,
      '',
      ...(isBn ? ev.pointsBn : ev.pointsEn).map((p) => `• ${p}`),
      '',
      isBn ? ev.detailedNarrativeBn : ev.detailedNarrativeEn,
      isBn ? ev.extendedContextBn : ev.extendedContextEn,
      '',
      `${isBn ? 'প্রামাণ্য রেফারেন্স' : 'Verified References'}:`,
      refsText,
    ]
      .filter(Boolean)
      .join('\n');
    await copyToClipboard(text);
    setCopiedMemberNo(ev.no);
    setTimeout(() => setCopiedMemberNo(null), 2000);
  };

  const scrollToRef = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (onPlayTap) onPlayTap();
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Reusable Family Member Node Card inside the Genealogy Tree
  const renderMemberNode = (
    no: number,
    options?: {
      roleBn?: string;
      roleEn?: string;
      accent?: AccentKey;
      compact?: boolean;
      highlightDirect?: boolean;
      centered?: boolean;
    }
  ) => {
    const member = memberMap.get(no);
    if (!member) return null;

    const isSelected = selectedMemberNo === no;
    const isVisited = Boolean(visitedEvents[no]);
    const isMatched = matchingNos ? matchingNos.has(no) : true;
    const accent: AccentKey = options?.accent ?? 'emerald';
    const compact = options?.compact ?? false;

    const displayName = cleanName(isBn ? member.titleBn : member.titleEn);
    const roleLabel = isBn
      ? options?.roleBn || partMap.get(member.partNo)?.categoryBn
      : options?.roleEn || partMap.get(member.partNo)?.categoryEn;

    const accentTokens: Record<
      AccentKey,
      { border: string; badge: string; dot: string; activeRing: string; bar: string }
    > = {
      emerald: {
        border: isDay
          ? 'border-emerald-200/95 hover:border-emerald-500'
          : 'border-emerald-700/65 hover:border-emerald-400',
        badge: isDay ? 'text-emerald-700' : 'text-emerald-300',
        dot: 'bg-emerald-500',
        activeRing: 'ring-2 ring-emerald-500 border-emerald-500',
        bar: 'bg-emerald-500',
      },
      amber: {
        border: isDay
          ? 'border-amber-200/95 hover:border-amber-500'
          : 'border-amber-700/65 hover:border-amber-400',
        badge: isDay ? 'text-amber-700' : 'text-amber-300',
        dot: 'bg-amber-500',
        activeRing: 'ring-2 ring-amber-500 border-amber-500',
        bar: 'bg-amber-500',
      },
      violet: {
        border: isDay
          ? 'border-violet-200/95 hover:border-violet-500'
          : 'border-violet-700/60 hover:border-violet-400',
        badge: isDay ? 'text-violet-700' : 'text-violet-300',
        dot: 'bg-violet-500',
        activeRing: 'ring-2 ring-violet-500 border-violet-500',
        bar: 'bg-violet-500',
      },
      blue: {
        border: isDay
          ? 'border-sky-200/95 hover:border-sky-500'
          : 'border-sky-700/65 hover:border-sky-400',
        badge: isDay ? 'text-sky-700' : 'text-sky-300',
        dot: 'bg-sky-500',
        activeRing: 'ring-2 ring-sky-500 border-sky-500',
        bar: 'bg-sky-500',
      },
      teal: {
        border: isDay
          ? 'border-teal-200/95 hover:border-teal-500'
          : 'border-teal-700/65 hover:border-teal-400',
        badge: isDay ? 'text-teal-700' : 'text-teal-300',
        dot: 'bg-teal-500',
        activeRing: 'ring-2 ring-teal-500 border-teal-500',
        bar: 'bg-teal-500',
      },
      rose: {
        border: isDay
          ? 'border-rose-200/95 hover:border-rose-400'
          : 'border-rose-800/65 hover:border-rose-400',
        badge: isDay ? 'text-rose-700' : 'text-rose-300',
        dot: 'bg-rose-500',
        activeRing: 'ring-2 ring-rose-500 border-rose-500',
        bar: 'bg-rose-500',
      },
      indigo: {
        border: isDay
          ? 'border-indigo-200/95 hover:border-indigo-400'
          : 'border-indigo-800/65 hover:border-indigo-400',
        badge: isDay ? 'text-indigo-700' : 'text-indigo-300',
        dot: 'bg-indigo-500',
        activeRing: 'ring-2 ring-indigo-500 border-indigo-500',
        bar: 'bg-indigo-500',
      },
    };

    const tkn = accentTokens[accent];

    return (
      <button
        key={no}
        type="button"
        onClick={() => openMemberSheet(no)}
        className={`group/node w-full text-left rounded-xl border transition-all duration-150 cursor-pointer relative overflow-hidden active:scale-[0.98] ${
          compact ? 'px-2.5 py-2 min-h-[52px]' : 'px-3 py-2.5 min-h-[60px]'
        } ${
          isDay
            ? options?.highlightDirect
              ? 'bg-gradient-to-br from-emerald-50/90 via-white to-amber-50/45 shadow-xs'
              : 'bg-white shadow-2xs hover:shadow-sm'
            : options?.highlightDirect
            ? 'bg-gradient-to-br from-[#0b2f27] to-[#08221d] shadow-sm'
            : 'bg-[#07201b] hover:bg-[#0a2b24]'
        } ${isSelected ? tkn.activeRing : tkn.border} ${
          !isMatched ? 'opacity-25 scale-[0.98]' : 'opacity-100'
        }`}
      >
        {/* Subtle top accent hairline on direct-lineage cards */}
        {options?.highlightDirect && (
          <span
            aria-hidden="true"
            className={`absolute top-0 inset-x-0 h-[2px] ${tkn.bar} opacity-75`}
          />
        )}

        <div className="flex items-center justify-between gap-1 mb-0.5">
          <span className={`text-[9.5px] sm:text-[10px] font-extrabold tracking-wide truncate ${tkn.badge}`}>
            {roleLabel}
          </span>
          <span className="inline-flex items-center gap-1 shrink-0">
            {isVisited && (
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full bg-emerald-500"
              />
            )}
            <span
              className={`text-[9.5px] sm:text-[10px] font-bold tabular-nums ${
                isVisited
                  ? isDay
                    ? 'text-emerald-600'
                    : 'text-emerald-400'
                  : isDay
                  ? 'text-slate-400'
                  : 'text-emerald-500/70'
              }`}
            >
              {isBn ? toBn(no, true) : String(no).padStart(2, '0')}
            </span>
          </span>
        </div>

        <div
          className={`font-extrabold leading-snug ${
            compact ? 'text-[11px] sm:text-[11.5px]' : 'text-[11.5px] sm:text-[13px]'
          } ${isDay ? 'text-slate-900' : 'text-white'}`}
        >
          {displayName}
        </div>

        {!compact && (
          <div
            className={`mt-1 flex items-center justify-between text-[9.5px] font-semibold ${
              isDay
                ? 'text-slate-400 group-hover/node:text-emerald-700'
                : 'text-emerald-400/60 group-hover/node:text-amber-300'
            }`}
          >
            <span className="truncate">
              {isBn ? 'বিস্তারিত ও রেফারেন্স' : 'Biography & Ref'}
            </span>
            <ChevronRight className="w-3 h-3 shrink-0 transition-transform group-hover/node:translate-x-0.5" />
          </div>
        )}
      </button>
    );
  };

  // Vertical golden-emerald lineage spine connector
  const renderVerticalTrunk = (labelBn?: string, labelEn?: string, heightClass = 'h-5 sm:h-6') => (
    <div className="flex flex-col items-center select-none" aria-hidden="true">
      <div
        className={`w-[2px] ${heightClass} ${
          isDay
            ? 'bg-gradient-to-b from-emerald-400 via-amber-400 to-emerald-400'
            : 'bg-gradient-to-b from-emerald-500/80 via-amber-400/80 to-emerald-500/80'
        }`}
      />
      {(labelBn || labelEn) && (
        <>
          <span
            className={`my-0.5 text-[9.5px] sm:text-[10px] font-extrabold tracking-wide px-2.5 py-0.5 rounded-full border text-center ${
              isDay
                ? 'bg-emerald-50 border-emerald-200/90 text-emerald-800 shadow-2xs'
                : 'bg-[#06221c] border-emerald-700/75 text-amber-300'
            }`}
          >
            {isBn ? labelBn : labelEn}
          </span>
          <div
            className={`w-[2px] h-3.5 sm:h-4 ${
              isDay ? 'bg-emerald-400' : 'bg-emerald-500/80'
            }`}
          />
        </>
      )}
    </div>
  );

  // Side-by-side Marriage Bond Connector (works cleanly even on narrow 360px phones!)
  const renderMarriageBond = (tone: 'amber' | 'emerald' = 'amber') => (
    <div className="flex items-center justify-center shrink-0" aria-hidden="true">
      <div
        className={`w-2 sm:w-4 h-[2px] ${
          tone === 'amber'
            ? isDay
              ? 'bg-amber-300'
              : 'bg-amber-600/70'
            : isDay
            ? 'bg-emerald-300'
            : 'bg-emerald-600/70'
        }`}
      />
      <div
        className={`flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full border shrink-0 ${
          tone === 'amber'
            ? isDay
              ? 'bg-amber-50 border-amber-300 text-amber-600'
              : 'bg-amber-950/70 border-amber-500/60 text-amber-300'
            : isDay
            ? 'bg-emerald-50 border-emerald-300 text-emerald-600'
            : 'bg-emerald-950/70 border-emerald-500/60 text-emerald-300'
        }`}
      >
        <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
      </div>
      <div
        className={`w-2 sm:w-4 h-[2px] ${
          tone === 'amber'
            ? isDay
              ? 'bg-amber-300'
              : 'bg-amber-600/70'
            : isDay
            ? 'bg-emerald-300'
            : 'bg-emerald-600/70'
        }`}
      />
    </div>
  );

  // Two-way visual tree fork bracket (┌───┴───┐) for grandchildren under a couple
  const renderTwoWayFork = (labelBn: string, labelEn: string) => (
    <div className="flex flex-col items-center select-none" aria-hidden="true">
      <div className={`w-[2px] h-3 ${isDay ? 'bg-teal-400' : 'bg-teal-500/80'}`} />
      <span
        className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-full border ${
          isDay
            ? 'bg-teal-50 border-teal-200 text-teal-800'
            : 'bg-[#05231e] border-teal-700/70 text-teal-300'
        }`}
      >
        {isBn ? labelBn : labelEn}
      </span>
      <div className={`w-[2px] h-2.5 ${isDay ? 'bg-teal-400' : 'bg-teal-500/80'}`} />
      <div className="w-[54%] h-2.5 border-t-2 border-x-2 rounded-t-md border-teal-400/75 dark:border-teal-500/70" />
    </div>
  );

  const showAncestors = branchFilter === 'all' || branchFilter === 'ancestors';
  const showWives = branchFilter === 'all' || branchFilter === 'wives';
  const showDescendants = branchFilter === 'all' || branchFilter === 'descendants';

  const uncleNos = [33, 34, 35, 36, 37, 38, 39, 40, 41];
  const auntNos = [42, 43, 44, 45, 46, 47];
  const wifeNos = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15]; // #5 Khadijah RA featured at top

  const prevMemberNo =
    selectedMemberNo !== null && selectedMemberNo > 1 ? selectedMemberNo - 1 : null;
  const nextMemberNo =
    selectedMemberNo !== null && selectedMemberNo > 0 && selectedMemberNo < FAMILY_EVENTS.length
      ? selectedMemberNo + 1
      : null;

  const kinshipItems =
    selectedMemberNo !== null && selectedMemberNo > 0 ? KINSHIP_LINKS[selectedMemberNo] || [] : [];

  return (
    <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden relative">
      {/* ====================================================================
          MAIN SCROLLABLE FAMILY TREE CANVAS
          ==================================================================== */}
      <div
        className={`flex-1 min-h-0 overflow-y-auto px-2.5 sm:px-6 py-3 sm:py-6 pb-20 lg:pb-8 ${
          isDay
            ? 'bg-gradient-to-b from-[#F4FBF8] via-[#FAFBF9] to-[#F6F9F7]'
            : 'bg-gradient-to-b from-[#031410] via-[#041914] to-[#03130f]'
        }`}
      >
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Compact Tree Control Bar: Branch Filter + Search + Mobile Quick Generation Jump */}
          <div
            className={`rounded-2xl border p-2.5 sm:p-3.5 space-y-2.5 ${
              isDay
                ? 'bg-white/95 border-emerald-200/80 shadow-xs'
                : 'bg-[#061c17]/95 border-emerald-800/60'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
              {/* Segmented Branch Switcher */}
              <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-0.5 md:pb-0">
                {(
                  [
                    { id: 'all', bn: 'সম্পূর্ণ (৪৭)', en: 'Full Tree (47)' },
                    { id: 'ancestors', bn: 'পূর্বপুরুষ ও চাচা-ফুফু', en: 'Ancestors' },
                    { id: 'wives', bn: 'স্ত্রীগণ (১১)', en: '11 Wives' },
                    { id: 'descendants', bn: 'সন্তান ও নাতি-নাতনি', en: 'Descendants' },
                  ] as const
                ).map((tab) => {
                  const active = branchFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        if (onPlayTap) onPlayTap();
                        setBranchFilter(tab.id);
                      }}
                      className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-[11.5px] font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                        active
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : isDay
                          ? 'bg-slate-100/90 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800'
                          : 'bg-[#041410] text-emerald-200/80 hover:bg-emerald-900/50'
                      }`}
                    >
                      {isBn ? tab.bn : tab.en}
                    </button>
                  );
                })}
              </div>

              {/* Instant Tree Spotlight Search */}
              <div className="relative w-full md:w-60 shrink-0">
                <Search
                  className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
                    isDay ? 'text-slate-400' : 'text-emerald-400/70'
                  }`}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isBn ? 'নাম দিয়ে বংশতালিকায় খুঁজুন...' : 'Search member in tree...'}
                  className={`w-full pl-8 pr-7 py-1.5 rounded-xl text-xs border outline-none transition-colors ${
                    isDay
                      ? 'bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500'
                      : 'bg-[#03120e] border-emerald-800 text-emerald-50 placeholder:text-emerald-400/50 focus:border-amber-400/60'
                  }`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label={isBn ? 'মুছুন' : 'Clear'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Quick Generation Jump Strip (especially helpful on Mobile!) */}
            {branchFilter === 'all' && (
              <div
                className={`pt-2 border-t flex items-center gap-1.5 overflow-x-auto scrollbar-none ${
                  isDay ? 'border-slate-100' : 'border-emerald-800/50'
                }`}
              >
                <span
                  className={`text-[10px] font-bold shrink-0 ${
                    isDay ? 'text-slate-400' : 'text-emerald-400/65'
                  }`}
                >
                  {isBn ? 'দ্রুত যান:' : 'Jump:'}
                </span>
                {[
                  { labelBn: '১. দাদা-দাদি', labelEn: '1. Grandparents', ref: gen1Ref },
                  { labelBn: '২. বাবা-মা ও চাচা-ফুফু', labelEn: '2. Parents & Kin', ref: gen2Ref },
                  { labelBn: '৩. রাসূল ﷺ ও স্ত্রীগণ', labelEn: '3. Prophet ﷺ & Wives', ref: gen3Ref },
                  { labelBn: '৪-৫. সন্তান ও নাতি-নাতনি', labelEn: '4-5. Descendants', ref: gen4Ref },
                ].map((j) => (
                  <button
                    key={j.labelEn}
                    type="button"
                    onClick={() => scrollToRef(j.ref)}
                    className={`px-2 py-1 rounded-lg text-[10.5px] font-bold whitespace-nowrap shrink-0 border transition-colors cursor-pointer ${
                      isDay
                        ? 'bg-emerald-50/70 hover:bg-emerald-100 border-emerald-200/70 text-emerald-800'
                        : 'bg-[#041612] hover:bg-emerald-900/50 border-emerald-800/70 text-emerald-200'
                    }`}
                  >
                    {isBn ? j.labelBn : j.labelEn}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Instruction Cue + Arabic Calligraphic Title */}
          <div className="flex flex-wrap items-center justify-between gap-1.5 px-1 text-[10.5px] sm:text-[11px]">
            <span
              className={`font-semibold flex items-center gap-1.5 ${
                isDay ? 'text-emerald-800' : 'text-emerald-300/85'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>
                {isBn
                  ? 'যেকোনো নামের ওপর ট্যাপ করলেই বিস্তারিত ঘটনা ও প্রামাণ্য রেফারেন্স খুলবে'
                  : 'Tap any node to read the full historical narrative & authentic Hadith references'}
              </span>
            </span>
            <span
              dir="rtl"
              className={`font-arabic text-sm ${
                isDay ? 'text-amber-700/90' : 'text-amber-300/85'
              }`}
            >
              شجرة النسب النبوي الشريف ﷺ
            </span>
          </div>

          {/* ==============================================================
              GENEALOGY TREE DIAGRAM — 5 AUTHENTIC GENERATIONS (MOBILE-FIRST)
              ============================================================== */}
          <div className="flex flex-col items-center">
            {/* GENERATION 1: GRANDPARENTS (দাদা-দাদি) */}
            {showAncestors && (
              <>
                <div ref={gen1Ref} className="w-full flex flex-col items-center scroll-mt-4">
                  <div className="text-[10px] sm:text-[10.5px] font-extrabold tracking-wider uppercase mb-2 text-amber-700 dark:text-amber-300">
                    {isBn ? '১ম স্তর · দাদা ও দাদি' : 'Generation I · Grandparents'}
                  </div>

                  {/* True Side-by-Side Couple Bracket EVEN ON MOBILE */}
                  <div className="grid grid-cols-[1fr_auto_1fr] items-center w-full max-w-xl">
                    {renderMemberNode(3, {
                      roleBn: 'দাদা (কুরাইশ সরদার)',
                      roleEn: 'Grandfather',
                      accent: 'amber',
                      highlightDirect: true,
                    })}
                    {renderMarriageBond('amber')}
                    {renderMemberNode(4, {
                      roleBn: 'দাদি (বনু মাখযুম)',
                      roleEn: 'Grandmother',
                      accent: 'amber',
                      highlightDirect: true,
                    })}
                  </div>
                </div>

                {renderVerticalTrunk('আব্দুল মুত্তালিবের সন্তানগণ', 'Children of Abdul Muttalib')}

                {/* GENERATION 2: PARENTS (FIRST ON MOBILE / CENTER ON DESKTOP) + UNCLES & AUNTS */}
                <div ref={gen2Ref} className="w-full relative scroll-mt-4">
                  {/* Horizontal 3-Column Branch Bar on Desktop */}
                  <div
                    aria-hidden="true"
                    className={`hidden lg:block absolute top-0 left-[16%] right-[16%] h-[2px] ${
                      isDay
                        ? 'bg-gradient-to-r from-rose-300 via-emerald-400 to-indigo-300'
                        : 'bg-gradient-to-r from-rose-700/70 via-emerald-500/80 to-indigo-700/70'
                    }`}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(320px,1.15fr)_1fr] gap-3 sm:gap-4 items-start pt-0 lg:pt-4">
                    {/* CENTER LINEAGE: PARENTS (ORDER-1 ON MOBILE so Bloodline Spine stays unbroken!) */}
                    <div className="order-1 lg:order-2 flex flex-col items-center">
                      <div
                        className={`w-full rounded-2xl border p-2.5 sm:p-3.5 space-y-2 ${
                          isDay
                            ? 'bg-gradient-to-b from-emerald-50/85 to-white border-emerald-300/85 shadow-sm'
                            : 'bg-gradient-to-b from-[#082c24] to-[#061e19] border-emerald-600/60 shadow-md'
                        }`}
                      >
                        <div className="text-center text-[10px] sm:text-[10.5px] font-extrabold tracking-wider uppercase text-emerald-700 dark:text-emerald-300">
                          {isBn ? '২য় স্তর · মহিমান্বিত পিতা ও মাতা' : 'Generation II · Noble Parents'}
                        </div>

                        {/* Side-by-Side Parents Couple Bracket EVEN ON MOBILE */}
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                          {renderMemberNode(1, {
                            roleBn: 'পিতা',
                            roleEn: 'Father',
                            accent: 'emerald',
                            highlightDirect: true,
                          })}
                          {renderMarriageBond('emerald')}
                          {renderMemberNode(2, {
                            roleBn: 'মাতা',
                            roleEn: 'Mother',
                            accent: 'emerald',
                            highlightDirect: true,
                          })}
                        </div>
                      </div>

                      {/* Mobile-Only Fork Indicator showing Uncles & Aunts branch off Abdul Muttalib */}
                      <div
                        aria-hidden="true"
                        className="flex lg:hidden flex-col items-center w-full mt-1"
                      >
                        <div className="w-[2px] h-3 bg-emerald-400/75" />
                        <span
                          className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full border ${
                            isDay
                              ? 'bg-white border-slate-200 text-slate-500'
                              : 'bg-[#051b16] border-emerald-800/70 text-emerald-300/75'
                          }`}
                        >
                          {isBn ? 'পিতার সহোদর ও বৈমাত্রেয় ভাই-বোন (চাচা ও ফুফুগণ)' : 'Father’s Siblings (Uncles & Aunts)'}
                        </span>
                      </div>
                    </div>

                    {/* LEFT WING: 9 UNCLES (ORDER-2 ON MOBILE, LEFT ON DESKTOP) */}
                    <div
                      className={`order-2 lg:order-1 rounded-2xl border p-2.5 sm:p-3 space-y-2 ${
                        isDay
                          ? 'bg-white/85 border-rose-200/80'
                          : 'bg-[#061c17]/85 border-rose-900/50'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (onPlayTap) onPlayTap();
                          setShowAllUncles((p) => !p);
                        }}
                        className="w-full flex items-center justify-between text-left cursor-pointer"
                      >
                        <div>
                          <div className="text-[11px] font-black text-rose-700 dark:text-rose-300">
                            {isBn ? 'চাচাগণ (৯ জন)' : 'Paternal Uncles (9)'}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-emerald-300/60">
                            {isBn ? 'আব্দুল মুত্তালিবের পুত্রগণ' : 'Sons of Abdul Muttalib'}
                          </div>
                        </div>
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                            isDay ? 'bg-rose-50 text-rose-600' : 'bg-rose-950/60 text-rose-300'
                          }`}
                        >
                          {showAllUncles ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </span>
                      </button>

                      {showAllUncles && (
                        <div className="pl-2.5 border-l-2 border-rose-200/90 dark:border-rose-800/60 grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-1.5">
                          {uncleNos.map((no) =>
                            renderMemberNode(no, {
                              roleBn: 'চাচা',
                              roleEn: 'Uncle',
                              accent: 'rose',
                              compact: true,
                            })
                          )}
                        </div>
                      )}
                    </div>

                    {/* RIGHT WING: 6 AUNTS (ORDER-3 ON MOBILE, RIGHT ON DESKTOP) */}
                    <div
                      className={`order-3 lg:order-3 rounded-2xl border p-2.5 sm:p-3 space-y-2 ${
                        isDay
                          ? 'bg-white/85 border-indigo-200/80'
                          : 'bg-[#061c17]/85 border-indigo-900/50'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          if (onPlayTap) onPlayTap();
                          setShowAllAunts((p) => !p);
                        }}
                        className="w-full flex items-center justify-between text-left cursor-pointer"
                      >
                        <div>
                          <div className="text-[11px] font-black text-indigo-700 dark:text-indigo-300">
                            {isBn ? 'ফুফুগণ (৬ জন)' : 'Paternal Aunts (6)'}
                          </div>
                          <div className="text-[10px] text-slate-500 dark:text-emerald-300/60">
                            {isBn ? 'আব্দুল মুত্তালিবের কন্যাগণ' : 'Daughters of Abdul Muttalib'}
                          </div>
                        </div>
                        <span
                          className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                            isDay ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-950/60 text-indigo-300'
                          }`}
                        >
                          {showAllAunts ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </span>
                      </button>

                      {showAllAunts && (
                        <div className="pl-2.5 border-l-2 border-indigo-200/90 dark:border-indigo-800/60 grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-1.5">
                          {auntNos.map((no) =>
                            renderMemberNode(no, {
                              roleBn: 'ফুফু',
                              roleEn: 'Aunt',
                              accent: 'indigo',
                              compact: true,
                            })
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {renderVerticalTrunk('আব্দুল্লাহ ও আমিনা (রা.)-এর একমাত্র সন্তান', 'Only Child of Abdullah & Aminah')}
              </>
            )}

            {/* ==============================================================
                GENERATION 3: INTERACTIVE PROPHET MUHAMMAD ﷺ CREST + 11 WIVES
                ============================================================== */}
            <div ref={gen3Ref} className="w-full flex flex-col items-center scroll-mt-4">
              {/* Clickable Illuminated Central Crest: Prophet Muhammad ﷺ */}
              <button
                type="button"
                onClick={() => openMemberSheet(0)}
                className={`group/crest relative overflow-hidden rounded-2xl border-2 px-5 py-4 text-center max-w-md w-full shadow-md transition-all cursor-pointer active:scale-[0.99] ${
                  selectedMemberNo === 0
                    ? 'ring-2 ring-amber-400 border-amber-300'
                    : 'border-amber-400/80 hover:border-amber-300'
                } ${
                  isDay
                    ? 'bg-gradient-to-br from-[#053529] via-[#062d23] to-[#041f18] text-white'
                    : 'bg-gradient-to-br from-[#073a2d] via-[#052920] to-[#031c16] text-white'
                }`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 120"
                  className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 w-24 h-24 text-amber-300/10 transition-transform duration-500 group-hover/crest:rotate-12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <rect x="24" y="24" width="72" height="72" />
                  <rect x="24" y="24" width="72" height="72" transform="rotate(45 60 60)" />
                  <circle cx="60" cy="60" r="22" />
                </svg>

                <div className="relative z-10 space-y-1">
                  <p dir="rtl" className="font-arabic text-lg sm:text-xl text-amber-300 leading-none">
                    سيّدنا محمّد رسول الله ﷺ
                  </p>
                  <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
                    {isBn ? 'হযরত মুহাম্মদ মুস্তফা ﷺ' : 'Prophet Muhammad ﷺ'}
                  </h3>
                  <p className="text-[11px] font-semibold text-emerald-200/85">
                    {isBn
                      ? 'খাতামুন নাবিয়্যীন · রহমাতুল্লিল আলামীন (৫৭০–৬৩২ খ্রি.)'
                      : 'Seal of the Prophets · Mercy to the Worlds (570–632 CE)'}
                  </p>
                  <span className="inline-flex items-center gap-1 pt-0.5 text-[10px] font-bold text-amber-300/95">
                    <span>{isBn ? 'পবিত্র নসবনামা ও রেফারেন্স দেখুন' : 'View Blessed Lineage & References'}</span>
                    <ChevronRight className="w-3 h-3 transition-transform group-hover/crest:translate-x-0.5" />
                  </span>
                </div>
              </button>

              {/* SPOUSAL WING: 11 UMMAHATUL MUMINEEN (উম্মাহাতুল মুমিনীন) */}
              {showWives && (
                <div className="w-full flex flex-col items-center">
                  {/* Direct spousal drop stem from Prophet ﷺ */}
                  <div className="flex flex-col items-center" aria-hidden="true">
                    <div className="w-[2px] h-4 bg-violet-400/80" />
                    <span
                      className={`text-[9.5px] font-extrabold px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1 ${
                        isDay
                          ? 'bg-violet-50 border-violet-200 text-violet-800'
                          : 'bg-[#131426] border-violet-700/70 text-violet-300'
                      }`}
                    >
                      <Heart className="w-2.5 h-2.5 fill-current" />
                      <span>{isBn ? 'বিবাহসূত্র · ১১ জন স্ত্রী' : 'Spousal Bond · 11 Wives'}</span>
                    </span>
                    <div className="w-[2px] h-3 bg-violet-400/80" />
                  </div>

                  <div
                    className={`w-full rounded-2xl border p-2.5 sm:p-4 space-y-2.5 ${
                      isDay
                        ? 'bg-white/95 border-violet-200/85 shadow-2xs'
                        : 'bg-[#061c17]/95 border-violet-800/50'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (onPlayTap) onPlayTap();
                        setShowAllWives((p) => !p);
                      }}
                      className="w-full flex items-center justify-between gap-2 text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                            isDay
                              ? 'bg-violet-50 text-violet-700 border border-violet-200'
                              : 'bg-violet-950/70 text-violet-300 border border-violet-800'
                          }`}
                        >
                          <Users className="w-3.5 h-3.5" />
                        </span>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-[13px] font-black text-violet-800 dark:text-violet-300">
                            {isBn
                              ? 'উম্মাহাতুল মুমিনীন (১১ জন)'
                              : 'Ummahatul Mumineen (11 Wives)'}
                          </div>
                          <div className="text-[10px] sm:text-[10.5px] text-slate-500 dark:text-emerald-300/65">
                            {isBn
                              ? 'খাদিজা (রা.) ৬ সন্তানের মাতা · মারিয়া কিবতিয়া (রা.) ইবরাহীমের মাতা'
                              : 'Khadijah (RA): mother of 6 · Mariyah (RA): mother of Ibrahim'}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                          isDay ? 'bg-violet-50 text-violet-600' : 'bg-violet-950/70 text-violet-300'
                        }`}
                      >
                        {showAllWives ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </span>
                    </button>

                    {showAllWives && (
                      <div className="space-y-2">
                        {/* Featured First Wife: Khadijah RA (Mother of 6 children) */}
                        {renderMemberNode(5, {
                          roleBn: '১ম স্ত্রী · প্রথম মুসলিম · ৬ সন্তানের মাতা',
                          roleEn: '1st Wife · First Believer · Mother of 6',
                          accent: 'violet',
                          highlightDirect: true,
                        })}

                        {/* Other 10 Ummahatul Mumineen */}
                        <div className="pl-2.5 border-l-2 border-violet-200/90 dark:border-violet-800/60 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5">
                          {wifeNos.map((no) =>
                            renderMemberNode(no, {
                              roleBn: 'উম্মুল মুমিনীন',
                              roleEn: 'Mother of Believers',
                              accent: 'violet',
                              compact: true,
                            })
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ==============================================================
                GENERATION 4 & 5: 7 CHILDREN -> 3 SONS-IN-LAW -> 7 GRANDCHILDREN
                ============================================================== */}
            {showDescendants && (
              <>
                {renderVerticalTrunk(
                  '৪র্থ ও ৫ম স্তর · সন্তানগণ, জামাতা ও নাতি-নাতনি',
                  'Gen IV & V · Children, Sons-in-Law & Grandchildren'
                )}

                <div ref={gen4Ref} className="w-full space-y-3.5 scroll-mt-4">
                  {/* 3 SONS (পুত্র সন্তানগণ) */}
                  <div
                    className={`rounded-2xl border p-3 sm:p-3.5 space-y-2.5 ${
                      isDay
                        ? 'bg-white/95 border-sky-200/85 shadow-2xs'
                        : 'bg-[#061c17]/95 border-sky-800/50'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <span className="text-[11px] font-black text-sky-800 dark:text-sky-300">
                        {isBn ? '৩ জন পুত্র সন্তান (শৈশবেই ইন্তেকাল)' : '3 Sons (Passed in Infancy)'}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-emerald-300/65">
                        {isBn ? 'কাসিম · আব্দুল্লাহ · ইবরাহীম' : 'Qasim · Abdullah · Ibrahim'}
                      </span>
                    </div>

                    {/* Indented tree rail on mobile, 3-column fork on sm+ */}
                    <div className="pl-2.5 sm:pl-0 border-l-2 sm:border-l-0 border-sky-200 dark:border-sky-800/70 grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {renderMemberNode(16, {
                        roleBn: 'জ্যেষ্ঠ পুত্র · মা: খাদিজা (রা.)',
                        roleEn: 'Eldest Son · Mother: Khadijah',
                        accent: 'blue',
                      })}
                      {renderMemberNode(21, {
                        roleBn: 'পুত্র (তাইয়্যিব/তাহির) · মা: খাদিজা',
                        roleEn: 'Son (Tayyib/Tahir) · Mother: Khadijah',
                        accent: 'blue',
                      })}
                      {renderMemberNode(22, {
                        roleBn: 'কনিষ্ঠ পুত্র · মা: মারিয়া কিবতিয়া',
                        roleEn: 'Youngest Son · Mother: Mariyah',
                        accent: 'blue',
                      })}
                    </div>
                  </div>

                  {/* 4 DAUGHTERS -> MARRIED TO 3 SONS-IN-LAW -> 7 GRANDCHILDREN */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 items-stretch">
                    {/* BRANCH C FIRST ON MOBILE? Keep chronological order (Zaynab -> Ruqayyah/Umm Kulthum -> Fatimah) with true side-by-side Couple + Fork Brackets! */}

                    {/* BRANCH A: ZAYNAB (17) ♥ ABUL AS (32) -> UMAMAH (27) & ALI (28) */}
                    <div
                      className={`rounded-2xl border p-3 sm:p-3.5 flex flex-col justify-between gap-1.5 ${
                        isDay
                          ? 'bg-white border-emerald-200/85 shadow-xs'
                          : 'bg-[#061d18] border-emerald-800/60'
                      }`}
                    >
                      <div>
                        <div className="text-[10px] sm:text-[10.5px] font-extrabold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide mb-2 text-center">
                          {isBn ? 'কন্যা শাখা ১ · যায়নাব (রা.)' : 'Daughter Branch 1 · Zaynab (RA)'}
                        </div>

                        {/* Side-by-Side Couple Bracket EVEN ON MOBILE */}
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                          {renderMemberNode(17, {
                            roleBn: 'জ্যেষ্ঠ কন্যা',
                            roleEn: 'Eldest Daughter',
                            accent: 'blue',
                            highlightDirect: true,
                            compact: true,
                          })}
                          {renderMarriageBond('amber')}
                          {renderMemberNode(32, {
                            roleBn: 'জামাতা',
                            roleEn: 'Son-in-Law',
                            accent: 'amber',
                            compact: true,
                          })}
                        </div>
                      </div>

                      {/* Visual Tree Fork into 2 Grandchildren */}
                      <div>
                        {renderTwoWayFork('নাতি-নাতনি (২ জন)', 'Grandchildren (2)')}
                        <div className="grid grid-cols-2 gap-1.5">
                          {renderMemberNode(27, {
                            roleBn: 'নাতনি',
                            roleEn: 'Granddaughter',
                            accent: 'teal',
                            compact: true,
                          })}
                          {renderMemberNode(28, {
                            roleBn: 'নাতি',
                            roleEn: 'Grandson',
                            accent: 'teal',
                            compact: true,
                          })}
                        </div>
                      </div>
                    </div>

                    {/* BRANCH B: RUQAYYAH (18) & UMM KULTHUM (19) ♥ UTHMAN (31) -> ABDULLAH (29) */}
                    <div
                      className={`rounded-2xl border p-3 sm:p-3.5 flex flex-col justify-between gap-1.5 ${
                        isDay
                          ? 'bg-white border-emerald-200/85 shadow-xs'
                          : 'bg-[#061d18] border-emerald-800/60'
                      }`}
                    >
                      <div>
                        <div className="text-[10px] sm:text-[10.5px] font-extrabold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide mb-2 text-center">
                          {isBn
                            ? 'কন্যা শাখা ২ · রুকাইয়া ও উম্মে কুলসুম (রা.)'
                            : 'Branch 2 · Ruqayyah & Umm Kulthum'}
                        </div>

                        {/* 2 Sisters side-by-side -> converging via Dhun-Nurayn bond to Uthman (RA) */}
                        <div className="grid grid-cols-2 gap-1.5">
                          {renderMemberNode(18, {
                            roleBn: '২য় কন্যা',
                            roleEn: '2nd Daughter',
                            accent: 'blue',
                            highlightDirect: true,
                            compact: true,
                          })}
                          {renderMemberNode(19, {
                            roleBn: '৩য় কন্যা',
                            roleEn: '3rd Daughter',
                            accent: 'blue',
                            highlightDirect: true,
                            compact: true,
                          })}
                        </div>

                        {/* Converging Y-bracket into Uthman (RA) */}
                        <div className="flex flex-col items-center select-none" aria-hidden="true">
                          <div className="w-[52%] h-2.5 border-b-2 border-x-2 rounded-b-md border-amber-400/75" />
                          <span
                            className={`-mt-2 px-2 py-0.5 rounded-full border text-[9px] font-extrabold ${
                              isDay
                                ? 'bg-amber-50 border-amber-300 text-amber-800'
                                : 'bg-amber-950/80 border-amber-600/60 text-amber-300'
                            }`}
                          >
                            ♥ {isBn ? 'যুন-নূরাইন (পরপর বিবাহ)' : 'Dhun-Nurayn'}
                          </span>
                          <div className="w-[2px] h-2 bg-amber-400/75" />
                        </div>

                        {renderMemberNode(31, {
                          roleBn: 'জামাতা · ৩য় খলিফা',
                          roleEn: 'Son-in-Law · 3rd Caliph',
                          accent: 'amber',
                          compact: true,
                        })}
                      </div>

                      {/* Single drop stem to Abdullah ibn Uthman */}
                      <div>
                        <div className="flex flex-col items-center select-none" aria-hidden="true">
                          <div className="w-[2px] h-3 bg-teal-400/80" />
                          <span
                            className={`text-[9.5px] font-extrabold px-2 py-0.5 rounded-full border mb-1.5 ${
                              isDay
                                ? 'bg-teal-50 border-teal-200 text-teal-800'
                                : 'bg-[#05231e] border-teal-700/70 text-teal-300'
                            }`}
                          >
                            {isBn ? 'নাতি (রুকাইয়া রা.-এর পুত্র)' : 'Grandson (Son of Ruqayyah)'}
                          </span>
                        </div>
                        {renderMemberNode(29, {
                          roleBn: 'নাতি',
                          roleEn: 'Grandson',
                          accent: 'teal',
                          compact: true,
                        })}
                      </div>
                    </div>

                    {/* BRANCH C: FATIMAH (20) ♥ ALI (30) -> HASAN (23), HUSAIN (24), ZAYNAB (25), UMM KULTHUM (26) */}
                    <div
                      className={`rounded-2xl border p-3 sm:p-3.5 flex flex-col justify-between gap-1.5 ${
                        isDay
                          ? 'bg-gradient-to-b from-emerald-50/55 via-white to-teal-50/40 border-emerald-300/90 shadow-xs'
                          : 'bg-gradient-to-b from-[#082922] to-[#061d18] border-emerald-600/60'
                      }`}
                    >
                      <div>
                        <div className="text-[10px] sm:text-[10.5px] font-extrabold text-emerald-700 dark:text-amber-300 uppercase tracking-wide mb-2 flex items-center justify-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span>
                            {isBn
                              ? 'আহলে বাইত ধারা · ফাতিমা (রা.)'
                              : 'Ahl al-Bayt Lineage · Fatimah (RA)'}
                          </span>
                        </div>

                        {/* Side-by-Side Couple Bracket EVEN ON MOBILE */}
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                          {renderMemberNode(20, {
                            roleBn: 'কনিষ্ঠ কন্যা',
                            roleEn: 'Youngest Daughter',
                            accent: 'emerald',
                            highlightDirect: true,
                            compact: true,
                          })}
                          {renderMarriageBond('emerald')}
                          {renderMemberNode(30, {
                            roleBn: 'জামাতা · ৪র্থ খলিফা',
                            roleEn: 'Son-in-Law · 4th Caliph',
                            accent: 'amber',
                            compact: true,
                          })}
                        </div>
                      </div>

                      {/* Visual Tree Fork into 4 Grandchildren */}
                      <div>
                        {renderTwoWayFork('নাতি-নাতনি (৪ জন · বংশধারা)', 'Grandchildren (4 · Lineage)')}
                        <div className="grid grid-cols-2 gap-1.5">
                          {renderMemberNode(23, {
                            roleBn: 'নাতি · সর্দার',
                            roleEn: 'Grandson',
                            accent: 'teal',
                            compact: true,
                          })}
                          {renderMemberNode(24, {
                            roleBn: 'নাতি · শহীদ',
                            roleEn: 'Grandson',
                            accent: 'teal',
                            compact: true,
                          })}
                          {renderMemberNode(25, {
                            roleBn: 'নাতনি',
                            roleEn: 'Granddaughter',
                            accent: 'teal',
                            compact: true,
                          })}
                          {renderMemberNode(26, {
                            roleBn: 'নাতনি',
                            roleEn: 'Granddaughter',
                            accent: 'teal',
                            compact: true,
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ====================================================================
          FULL ARCHIVAL BIOGRAPHY & REFERENCES DRAWER
          - Desktop: Docked Right Side Panel (440-480px)
          - Mobile: Smooth Full-Height Slide-Up Archival Sheet with Backdrop
          Shows complete detailed narrative, context, metadata, reflection &
          structured Hadith/Seerah references for EVERY single member!
          ==================================================================== */}
      {selectedMember && (
        <>
          {/* Mobile Backdrop */}
          <div
            onClick={() => setSelectedMemberNo(null)}
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-black/55 backdrop-blur-[2px] lg:hidden animate-in fade-in duration-150"
          />

          <aside
            role="dialog"
            aria-label={isBn ? selectedMember.titleBn : selectedMember.titleEn}
            className={`fixed inset-x-0 bottom-0 top-10 sm:top-14 z-50 lg:static lg:inset-auto lg:z-auto lg:w-[440px] xl:w-[480px] shrink-0 flex flex-col rounded-t-3xl lg:rounded-none border-t lg:border-t-0 lg:border-l overflow-hidden animate-in slide-in-from-bottom-4 lg:slide-in-from-right-4 duration-200 ${
              isDay
                ? 'bg-[#FDFBF7] border-emerald-200/90 shadow-2xl lg:shadow-none'
                : 'bg-[#051a15] border-emerald-800/75 shadow-2xl lg:shadow-none'
            }`}
          >
            {/* Mobile Sheet Handle Pill */}
            <div className="flex justify-center pt-2.5 pb-1 lg:hidden shrink-0">
              <div
                className={`w-10 h-1 rounded-full ${
                  isDay ? 'bg-slate-300' : 'bg-emerald-700/80'
                }`}
              />
            </div>

            {/* Sticky Sheet Header */}
            <div
              className={`px-4 sm:px-5 pt-2 pb-3.5 border-b shrink-0 space-y-2 ${
                isDay
                  ? 'bg-white/95 border-stone-200/85'
                  : 'bg-[#06201a] border-emerald-800/70'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-extrabold text-emerald-700 dark:text-amber-300 tabular-nums">
                    <span>
                      {selectedMember.no === 0
                        ? isBn
                          ? 'পবিত্র নসবনামা · কেন্দ্রীয় পরিচয়'
                          : 'Prophetic Lineage · Center'
                        : isBn
                        ? `পর্ব ${toBn(selectedMember.partNo)} · ${partMap.get(selectedMember.partNo)?.categoryBn}`
                        : `Part ${selectedMember.partNo} · ${partMap.get(selectedMember.partNo)?.categoryEn}`}
                    </span>
                    {selectedMember.no > 0 && (
                      <>
                        <span aria-hidden="true" className="opacity-40">
                          ·
                        </span>
                        <span>
                          {isBn
                            ? `${toBn(selectedMember.no, true)} / ৪৭`
                            : `${String(selectedMember.no).padStart(2, '0')} / 47`}
                        </span>
                      </>
                    )}
                  </div>
                  <h3
                    className={`text-base sm:text-lg font-black leading-snug ${
                      isDay ? 'text-stone-900' : 'text-white'
                    }`}
                  >
                    {cleanName(isBn ? selectedMember.titleBn : selectedMember.titleEn)}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleCopyBiography(selectedMember)}
                    title={isBn ? 'বিস্তারিত কপি করুন' : 'Copy biography'}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-bold transition cursor-pointer whitespace-nowrap ${
                      copiedMemberNo === selectedMember.no
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : isDay
                        ? 'bg-slate-50 hover:bg-emerald-50 border-slate-200 text-slate-700'
                        : 'bg-[#041612] hover:bg-emerald-900/50 border-emerald-800 text-emerald-200'
                    }`}
                  >
                    {copiedMemberNo === selectedMember.no ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{isBn ? 'কপি' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{isBn ? 'কপি' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMemberNo(null)}
                    aria-label={isBn ? 'বন্ধ করুন' : 'Close panel'}
                    className={`p-1.5 rounded-lg border transition cursor-pointer ${
                      isDay
                        ? 'border-slate-200 text-slate-500 hover:bg-slate-100'
                        : 'border-emerald-800 text-emerald-300 hover:bg-emerald-900/50'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Compact Time & Location Strip */}
              <div
                className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold ${
                  isDay ? 'text-stone-500' : 'text-emerald-300/80'
                }`}
              >
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3 shrink-0 text-amber-600 dark:text-amber-400" />
                  <span>{isBn ? selectedMember.timeContextBn : selectedMember.timeContextEn}</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3 h-3 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  <span>{isBn ? selectedMember.locationBn : selectedMember.locationEn}</span>
                </span>
              </div>
            </div>

            {/* Scrollable Full Archival Content Body */}
            <div
              ref={drawerScrollRef}
              className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-5 py-4 space-y-4"
            >
              {/* Interactive Direct Kinship Jump Links */}
              {kinshipItems.length > 0 && (
                <div className="space-y-1.5">
                  <div
                    className={`text-[10.5px] font-extrabold uppercase tracking-wider ${
                      isDay ? 'text-stone-500' : 'text-emerald-300/75'
                    }`}
                  >
                    {isBn ? 'বংশতালিকায় সরাসরি সম্পর্ক' : 'Direct Family Connections'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {kinshipItems.map((kin) => {
                      const target = memberMap.get(kin.no);
                      if (!target) return null;
                      return (
                        <button
                          key={`${kin.no}-${kin.relEn}`}
                          type="button"
                          onClick={() => openMemberSheet(kin.no)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[11px] font-bold transition cursor-pointer ${
                            isDay
                              ? 'bg-white hover:bg-emerald-50 border-emerald-200/90 text-emerald-900'
                              : 'bg-[#07221c] hover:bg-emerald-900/50 border-emerald-700/70 text-emerald-100'
                          }`}
                        >
                          <span className="text-amber-600 dark:text-amber-300">
                            {isBn ? kin.relBn : kin.relEn}:
                          </span>
                          <span className="truncate max-w-[155px]">
                            {cleanName(isBn ? target.titleBn : target.titleEn)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Arabic Pull-Quote */}
              {selectedMember.arabicQuote && (
                <blockquote
                  dir="rtl"
                  className={`font-arabic text-base sm:text-lg leading-[2] text-center px-3.5 py-3 rounded-2xl border ${
                    isDay
                      ? 'bg-amber-50/75 border-amber-200/80 text-emerald-950'
                      : 'bg-[#08241e] border-amber-500/30 text-amber-200'
                  }`}
                >
                  {selectedMember.arabicQuote}
                </blockquote>
              )}

              {/* 1. Core Verified Summary Points */}
              <section
                className={`rounded-2xl border p-3.5 space-y-2 ${
                  isDay
                    ? 'bg-white border-stone-200/90'
                    : 'bg-[#07201a] border-emerald-800/70'
                }`}
              >
                <h4
                  className={`text-[11px] font-extrabold tracking-wide ${
                    isDay ? 'text-emerald-800' : 'text-amber-300'
                  }`}
                >
                  {isBn ? 'মূল প্রামাণ্য সারসংক্ষেপ' : 'Core Verified Summary'}
                </h4>
                <ul className="space-y-1.5">
                  {(isBn ? selectedMember.pointsBn : selectedMember.pointsEn).map((pt, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2 text-xs sm:text-[13.5px] font-medium leading-relaxed ${
                        isDay ? 'text-stone-800' : 'text-emerald-50'
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mt-1 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 2. Detailed Historical Narrative + Extended Context */}
              <section className="space-y-2.5">
                <h4
                  className={`text-[11px] font-extrabold tracking-wide uppercase ${
                    isDay ? 'text-stone-500' : 'text-emerald-300/80'
                  }`}
                >
                  {isBn ? 'বিস্তারিত ঐতিহাসিক ঘটনা ও বিবরণ' : 'Detailed Historical Narrative'}
                </h4>
                <div
                  className={`space-y-3 text-[13.5px] sm:text-[14.5px] leading-[1.85] ${
                    isDay ? 'text-stone-800' : 'text-emerald-50/90'
                  }`}
                >
                  <p>
                    {isBn ? selectedMember.detailedNarrativeBn : selectedMember.detailedNarrativeEn}
                  </p>
                  {selectedMember.extendedContextBn && (
                    <p
                      className={`pl-3 border-l-2 ${
                        isDay
                          ? 'border-emerald-300 text-stone-700'
                          : 'border-amber-400/50 text-emerald-100/85'
                      }`}
                    >
                      {isBn ? selectedMember.extendedContextBn : selectedMember.extendedContextEn}
                    </p>
                  )}
                </div>
              </section>

              {/* 3. Key Figures & Archival Metadata */}
              {selectedMember.keyFiguresBn && (
                <section
                  className={`rounded-2xl border divide-y text-xs ${
                    isDay
                      ? 'bg-white border-stone-200/90 divide-stone-100'
                      : 'bg-[#07201a] border-emerald-800/70 divide-emerald-900/60'
                  }`}
                >
                  <div className="px-3.5 py-2.5 flex flex-col gap-0.5">
                    <span
                      className={`text-[10.5px] font-bold ${
                        isDay ? 'text-stone-500' : 'text-emerald-300/70'
                      }`}
                    >
                      {isBn ? 'সংশ্লিষ্ট ব্যক্তিবর্গ' : 'Key Related Figures'}
                    </span>
                    <span className={isDay ? 'text-stone-900 font-semibold' : 'text-emerald-50 font-semibold'}>
                      {isBn ? selectedMember.keyFiguresBn : selectedMember.keyFiguresEn}
                    </span>
                  </div>
                </section>
              )}

              {/* 4. Historical Lesson & Spiritual Reflection */}
              <section
                className={`rounded-2xl border p-3.5 space-y-1 ${
                  isDay
                    ? 'bg-emerald-50/70 border-emerald-200/85 text-emerald-950'
                    : 'bg-[#06221b] border-emerald-700/65 text-emerald-100'
                }`}
              >
                <h4
                  className={`text-[11px] font-extrabold tracking-wide ${
                    isDay ? 'text-emerald-800' : 'text-amber-300'
                  }`}
                >
                  {isBn ? 'ঐতিহাসিক শিক্ষা ও আত্মিক অনুভূতি' : 'Historical Lesson & Reflection'}
                </h4>
                <p className="text-xs sm:text-[13.5px] leading-relaxed">
                  {isBn ? selectedMember.reflectionBn : selectedMember.reflectionEn}
                </p>
              </section>

              {/* 5. Complete Verified Hadith & Classical Seerah References */}
              <section
                className={`rounded-2xl border overflow-hidden ${
                  isDay
                    ? 'bg-white border-stone-200/90'
                    : 'bg-[#07201a] border-emerald-800/75'
                }`}
              >
                <div
                  className={`px-3.5 py-2.5 border-b flex items-center justify-between gap-2 ${
                    isDay
                      ? 'bg-stone-50 border-stone-200/80'
                      : 'bg-[#041713] border-emerald-800/70'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <BookOpen
                      className={`w-3.5 h-3.5 ${isDay ? 'text-emerald-800' : 'text-amber-300'}`}
                    />
                    <h4
                      className={`text-[11px] font-extrabold tracking-wide ${
                        isDay ? 'text-stone-800' : 'text-emerald-100'
                      }`}
                    >
                      {isBn
                        ? 'প্রামাণ্য হাদিস ও সীরাত সূত্রাবলি (রেফারেন্স)'
                        : 'Verified Hadith & Seerah References'}
                    </h4>
                  </div>
                  <span
                    className={`text-[10.5px] font-bold tabular-nums shrink-0 ${
                      isDay ? 'text-stone-500' : 'text-emerald-300/75'
                    }`}
                  >
                    {isBn
                      ? `${toBn(selectedMember.references.length)}টি সূত্র`
                      : `${selectedMember.references.length} Ref`}
                  </span>
                </div>

                <div className="divide-y divide-stone-100 dark:divide-emerald-900/60">
                  {selectedMember.references.map((ref, idx) => (
                    <div key={idx} className="px-3.5 py-3 space-y-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-1.5">
                        <p
                          className={`text-xs sm:text-[13px] font-extrabold ${
                            isDay ? 'text-stone-900' : 'text-white'
                          }`}
                        >
                          {isBn ? ref.bookBn : ref.bookEn}
                        </p>
                        <span
                          className={`text-[10.5px] font-bold px-2 py-0.5 rounded-md ${
                            isDay
                              ? 'bg-emerald-50 text-emerald-800'
                              : 'bg-emerald-900/60 text-emerald-300'
                          }`}
                        >
                          {isBn ? ref.gradeBn : ref.gradeEn}
                        </span>
                      </div>
                      <p
                        className={`text-[11.5px] leading-relaxed ${
                          isDay ? 'text-stone-600' : 'text-emerald-200/80'
                        }`}
                      >
                        {isBn ? ref.chapterBn : ref.chapterEn}
                        <span aria-hidden="true" className="mx-1.5 opacity-45">
                          ·
                        </span>
                        <strong className={isDay ? 'text-stone-900' : 'text-amber-200'}>
                          {isBn ? ref.citationBn : ref.citationEn}
                        </strong>
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sticky Bottom Navigation Bar: Prev / Next Member + Open Full Archival Reader */}
            <div
              className={`px-3.5 sm:px-5 py-3 border-t shrink-0 flex items-center justify-between gap-2 ${
                isDay
                  ? 'bg-white border-stone-200/90'
                  : 'bg-[#041713] border-emerald-800/70'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={prevMemberNo === null}
                  onClick={() => prevMemberNo !== null && openMemberSheet(prevMemberNo)}
                  className={`inline-flex items-center gap-1 px-2.5 py-2 rounded-xl border text-[11px] font-bold transition whitespace-nowrap ${
                    prevMemberNo === null
                      ? 'opacity-35 cursor-not-allowed border-slate-200 dark:border-emerald-900 text-slate-400'
                      : isDay
                      ? 'bg-slate-50 hover:bg-emerald-50 border-slate-200 text-slate-700 cursor-pointer'
                      : 'bg-[#07201a] hover:bg-emerald-900/50 border-emerald-800 text-emerald-100 cursor-pointer'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{isBn ? 'পূর্ববর্তী' : 'Prev'}</span>
                </button>

                <button
                  type="button"
                  disabled={nextMemberNo === null}
                  onClick={() => nextMemberNo !== null && openMemberSheet(nextMemberNo)}
                  className={`inline-flex items-center gap-1 px-2.5 py-2 rounded-xl border text-[11px] font-bold transition whitespace-nowrap ${
                    nextMemberNo === null
                      ? 'opacity-35 cursor-not-allowed border-slate-200 dark:border-emerald-900 text-slate-400'
                      : isDay
                      ? 'bg-slate-50 hover:bg-emerald-50 border-slate-200 text-slate-700 cursor-pointer'
                      : 'bg-[#07201a] hover:bg-emerald-900/50 border-emerald-800 text-emerald-100 cursor-pointer'
                  }`}
                >
                  <span>{isBn ? 'পরবর্তী' : 'Next'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {selectedMember.no > 0 && (
                <button
                  type="button"
                  onClick={() => onSelectMemberForReader(selectedMember.no)}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-[11px] font-bold shadow-xs transition whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isBn ? 'পূর্ণ পৃষ্ঠায় পড়ুন' : 'Full Page'}</span>
                </button>
              )}
            </div>
          </aside>
        </>
      )}
    </div>
  );
};
