export type TajweedRuleType =
  | 'ghunna'
  | 'ikhfa'
  | 'qalqalah'
  | 'idgham'
  | 'iqlab'
  | 'izhar'
  | 'madd'
  | 'default';

export interface TajweedColorStyle {
  rule: TajweedRuleType;
  labelBn: string;
  labelEn: string;
  icon: string;
  // Day theme
  dayText: string;
  dayBg: string;
  dayBorder: string;
  // Night theme
  nightText: string;
  nightBg: string;
  nightBorder: string;
  // Hex indicator
  hexColor: string;
}

export interface TajweedBadge {
  symbol: string; // '১' | '৩' | '৪' | 'গু' | 'ম' | 'ক্ব'
  labelBn: string;
  labelEn: string;
  type: 'stretch' | 'ghunna' | 'heavy' | 'qalqalah';
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

export interface TajweedSignLegendItem {
  symbol: string;
  labelBn: string;
  labelEn: string;
  descriptionBn: string;
  colorClass: string;
  bgClass: string;
  borderClass: string;
}

export const TAJWEED_SIGN_LEGEND_ITEMS: TajweedSignLegendItem[] = [
  {
    symbol: '১',
    labelBn: '১ আলিফ টান',
    labelEn: '1 Alif Stretch',
    descriptionBn: 'স্বাভাবিক স্বর ১ আলিফ (১ সেকেন্ড) দীর্ঘ করে পড়তে হবে',
    colorClass: 'text-amber-700 dark:text-amber-300',
    bgClass: 'bg-amber-100 dark:bg-amber-950/80',
    borderClass: 'border-amber-300 dark:border-amber-800',
  },
  {
    symbol: '৩',
    labelBn: '৩ আলিফ টান',
    labelEn: '3 Alif Stretch',
    descriptionBn: 'মাদ্দে মুনফাসিল বা লীন ৩ আলিফ দীর্ঘ করে পড়তে হবে',
    colorClass: 'text-purple-700 dark:text-purple-300',
    bgClass: 'bg-purple-100 dark:bg-purple-950/80',
    borderClass: 'border-purple-300 dark:border-purple-800',
  },
  {
    symbol: '৪',
    labelBn: '৪ আলিফ টান',
    labelEn: '4 Alif Stretch',
    descriptionBn: 'মাদ্দে মুত্তাসিল বা লাযিম ৪ আলিফ দীর্ঘ করে পড়তে হবে',
    colorClass: 'text-fuchsia-700 dark:text-fuchsia-300',
    bgClass: 'bg-fuchsia-100 dark:bg-fuchsia-950/80',
    borderClass: 'border-fuchsia-300 dark:border-fuchsia-800',
  },
  {
    symbol: 'গু',
    labelBn: 'গুন্নাহ',
    labelEn: 'Ghunna',
    descriptionBn: 'নাগাস্বরে নাকের ছিদ্র হতে গুন্নাহ করে পাঠ',
    colorClass: 'text-rose-700 dark:text-rose-300',
    bgClass: 'bg-rose-100 dark:bg-rose-950/80',
    borderClass: 'border-rose-300 dark:border-rose-800',
  },
  {
    symbol: 'ম',
    labelBn: 'মোটা পাঠ (তাফখীম)',
    labelEn: 'Heavy Sound',
    descriptionBn: 'শব্দটি মুখ ভর্তি করে ভারী ও মোটা আওয়াজে পড়া',
    colorClass: 'text-emerald-700 dark:text-emerald-300',
    bgClass: 'bg-emerald-100 dark:bg-emerald-950/80',
    borderClass: 'border-emerald-300 dark:border-emerald-800',
  },
  {
    symbol: 'ক্ব',
    labelBn: 'ক্বাল ক্বলা (প্রতিধ্বনি)',
    labelEn: 'Qalqalah',
    descriptionBn: 'প্রতিধ্বনি বা ধাক্কা দিয়ে উচ্চারণ করা (ক, ত, ব, জ, দ)',
    colorClass: 'text-red-700 dark:text-red-300',
    bgClass: 'bg-red-100 dark:bg-red-950/80',
    borderClass: 'border-red-300 dark:border-red-800',
  },
];

export const TAJWEED_LEGEND_ITEMS: TajweedColorStyle[] = [
  {
    rule: 'ghunna',
    labelBn: 'গুন্নাহ',
    labelEn: 'Ghunna',
    icon: '🔴',
    dayText: 'text-rose-700',
    dayBg: 'bg-rose-50',
    dayBorder: 'border-rose-300',
    nightText: 'text-rose-400',
    nightBg: 'bg-rose-950/50',
    nightBorder: 'border-rose-800/60',
    hexColor: '#f43f5e',
  },
  {
    rule: 'ikhfa',
    labelBn: 'ইখফা',
    labelEn: 'Ikhfa',
    icon: '🟦',
    dayText: 'text-cyan-700',
    dayBg: 'bg-cyan-50',
    dayBorder: 'border-cyan-300',
    nightText: 'text-cyan-300',
    nightBg: 'bg-cyan-950/50',
    nightBorder: 'border-cyan-800/60',
    hexColor: '#06b6d4',
  },
  {
    rule: 'qalqalah',
    labelBn: 'ক্বাল ক্বলা',
    labelEn: 'Qalqalah',
    icon: '🔴',
    dayText: 'text-red-700',
    dayBg: 'bg-red-50',
    dayBorder: 'border-red-300',
    nightText: 'text-red-400',
    nightBg: 'bg-red-950/50',
    nightBorder: 'border-red-800/60',
    hexColor: '#ef4444',
  },
  {
    rule: 'idgham',
    labelBn: 'ইদগাম',
    labelEn: 'Idgham',
    icon: '🟩',
    dayText: 'text-emerald-700',
    dayBg: 'bg-emerald-50',
    dayBorder: 'border-emerald-300',
    nightText: 'text-emerald-400',
    nightBg: 'bg-emerald-950/50',
    nightBorder: 'border-emerald-800/60',
    hexColor: '#10b981',
  },
  {
    rule: 'iqlab',
    labelBn: 'ইকলাব',
    labelEn: 'Iqlab',
    icon: '🟣',
    dayText: 'text-purple-700',
    dayBg: 'bg-purple-50',
    dayBorder: 'border-purple-300',
    nightText: 'text-purple-300',
    nightBg: 'bg-purple-950/50',
    nightBorder: 'border-purple-800/60',
    hexColor: '#a855f7',
  },
  {
    rule: 'izhar',
    labelBn: 'ইযহার',
    labelEn: 'Izhar',
    icon: '🟧',
    dayText: 'text-amber-700',
    dayBg: 'bg-amber-50',
    dayBorder: 'border-amber-300',
    nightText: 'text-amber-400',
    nightBg: 'bg-amber-950/50',
    nightBorder: 'border-amber-800/60',
    hexColor: '#f59e0b',
  },
  {
    rule: 'madd',
    labelBn: 'মাদ্দ',
    labelEn: 'Madd',
    icon: '🟪',
    dayText: 'text-fuchsia-700',
    dayBg: 'bg-fuchsia-50',
    dayBorder: 'border-fuchsia-300',
    nightText: 'text-fuchsia-300',
    nightBg: 'bg-fuchsia-950/50',
    nightBorder: 'border-fuchsia-800/60',
    hexColor: '#d946ef',
  },
];

// Fallback high-contrast cyclic palette for words without specific Tajweed rules
const WORD_COLOR_CYCLE: Omit<TajweedColorStyle, 'rule' | 'labelBn' | 'labelEn' | 'icon'>[] = [
  {
    dayText: 'text-emerald-700',
    dayBg: 'bg-emerald-50/90',
    dayBorder: 'border-emerald-300',
    nightText: 'text-emerald-300',
    nightBg: 'bg-emerald-950/60',
    nightBorder: 'border-emerald-800/60',
    hexColor: '#10b981',
  },
  {
    dayText: 'text-cyan-700',
    dayBg: 'bg-cyan-50/90',
    dayBorder: 'border-cyan-300',
    nightText: 'text-cyan-300',
    nightBg: 'bg-cyan-950/60',
    nightBorder: 'border-cyan-800/60',
    hexColor: '#06b6d4',
  },
  {
    dayText: 'text-amber-700',
    dayBg: 'bg-amber-50/90',
    dayBorder: 'border-amber-300',
    nightText: 'text-amber-300',
    nightBg: 'bg-amber-950/60',
    nightBorder: 'border-amber-800/60',
    hexColor: '#f59e0b',
  },
  {
    dayText: 'text-purple-700',
    dayBg: 'bg-purple-50/90',
    dayBorder: 'border-purple-300',
    nightText: 'text-purple-300',
    nightBg: 'bg-purple-950/60',
    nightBorder: 'border-purple-800/60',
    hexColor: '#a855f7',
  },
  {
    dayText: 'text-rose-700',
    dayBg: 'bg-rose-50/90',
    dayBorder: 'border-rose-300',
    nightText: 'text-rose-300',
    nightBg: 'bg-rose-950/60',
    nightBorder: 'border-rose-800/60',
    hexColor: '#f43f5e',
  },
  {
    dayText: 'text-teal-700',
    dayBg: 'bg-teal-50/90',
    dayBorder: 'border-teal-300',
    nightText: 'text-teal-300',
    nightBg: 'bg-teal-950/60',
    nightBorder: 'border-teal-800/60',
    hexColor: '#14b8a6',
  },
];

/**
 * Detects Tajweed rule from Arabic script or returns cyclic color palette
 */
export function detectTajweedRule(arabic: string, wordIndex: number = 0): TajweedColorStyle {
  if (!arabic) {
    const cycle = WORD_COLOR_CYCLE[wordIndex % WORD_COLOR_CYCLE.length];
    return {
      rule: 'default',
      labelBn: 'সাধারণ',
      labelEn: 'General',
      icon: '✨',
      ...cycle,
    };
  }

  // 1. Madd (Protonation ~ / ٓ / ٰ / آ)
  if (/[\u0653\u0670\u06E5\u06E6~ٰٓآ]/.test(arabic) || arabic.includes('آ') || arabic.includes('أُولَٰئِكَ')) {
    const item = TAJWEED_LEGEND_ITEMS.find((i) => i.rule === 'madd')!;
    return item;
  }

  // 2. Ghunna (Shaddah on Nun or Meem: نّ / مّ)
  if (/[نم]\u0651/.test(arabic) || arabic.includes('إِنَّ') || arabic.includes('أنَّ') || arabic.includes('ثُمَّ')) {
    const item = TAJWEED_LEGEND_ITEMS.find((i) => i.rule === 'ghunna')!;
    return item;
  }

  // 3. Iqlab (Small Meem or Nun before Ba: ۢ / ن before ب)
  if (/\u06E2/.test(arabic) || /[ن]\u0652?\s*[ب]/.test(arabic) || arabic.includes('مِن بَعْدِ') || arabic.includes('أَنبِئْهُم')) {
    const item = TAJWEED_LEGEND_ITEMS.find((i) => i.rule === 'iqlab')!;
    return item;
  }

  // 4. Qalqalah (ق, ط, ب, ج, د with Sukun or at word end)
  if (/[قطبجد]\u0652/.test(arabic) || /[قطبجد]$/.test(arabic.replace(/[\u064B-\u0652]/g, ''))) {
    const item = TAJWEED_LEGEND_ITEMS.find((i) => i.rule === 'qalqalah')!;
    return item;
  }

  // 5. Ikhfa (Nun Sukun/Tanween before Ikhfa letters: ت, ث, ج, د, ذ, ز, س, ش, ص, ض, ط, ظ, ف, ق, ك)
  if (/[ن]\u0652?\s*[تثجدذزسشصضطظفقك]/.test(arabic) || /[\u064B\u064C\u064D]\s*[تثجدذزسشصضطظفقك]/.test(arabic)) {
    const item = TAJWEED_LEGEND_ITEMS.find((i) => i.rule === 'ikhfa')!;
    return item;
  }

  // 6. Idgham (Nun Sukun/Tanween before Yarmaloon: ي, ر, م, ل, و, ن)
  if (/[ن]\u0652?\s*[يرملون]/.test(arabic) || /[\u064B\u064C\u064D]\s*[يرملون]/.test(arabic)) {
    const item = TAJWEED_LEGEND_ITEMS.find((i) => i.rule === 'idgham')!;
    return item;
  }

  // 7. Izhar (Nun Sukun/Tanween before Throat letters: ء, هـ, ع, ح, غ, خ)
  if (/[ن]\u0652?\s*[ءهعحغخ]/.test(arabic) || /[\u064B\u064C\u064D]\s*[ءهعحغخ]/.test(arabic)) {
    const item = TAJWEED_LEGEND_ITEMS.find((i) => i.rule === 'izhar')!;
    return item;
  }

  // Fallback: Cyclic vibrant color palette based on word position
  const cycle = WORD_COLOR_CYCLE[wordIndex % WORD_COLOR_CYCLE.length];
  return {
    rule: 'default',
    labelBn: 'শব্দ',
    labelEn: 'Word',
    icon: '✨',
    ...cycle,
  };
}

export interface ColoredPronunciationWord {
  text: string;
  style: TajweedColorStyle;
  wordIndex: number;
  badges: TajweedBadge[];
}

/**
 * Detects specific Tajweed signs (Alif stretch 1/3/4, Heavy sound 'ম', Ghunna 'গু', Qalqalah 'ক্ব')
 */
export function detectWordBadges(arabic: string, tokenBn: string): TajweedBadge[] {
  const badges: TajweedBadge[] = [];

  if (!arabic && !tokenBn) return badges;

  const ar = arabic || '';
  const bn = tokenBn || '';

  // 1. Check Alif Stretch (৪, ৩, ১ আলিফ টান)
  // 4-Alif Stretch (Madd Muttasil / Lazim: ~ / ٓ / آ / أُولَٰئِكَ / السَّمَاءِ)
  if (/[\u0653~ٓآ]/.test(ar) || ar.includes('أُولَٰئِكَ') || ar.includes('السَّمَاءِ') || ar.includes('جَاءَ') || bn.includes('আ-') || bn.includes('ঈ-') || bn.includes('ঊ-')) {
    const legend = TAJWEED_SIGN_LEGEND_ITEMS.find((i) => i.symbol === '৪')!;
    badges.push({
      symbol: '৪',
      labelBn: legend.labelBn,
      labelEn: legend.labelEn,
      type: 'stretch',
      colorClass: legend.colorClass,
      bgClass: legend.bgClass,
      borderClass: legend.borderClass,
    });
  } else if (/[\u0670ٰ]/.test(ar) && (ar.length > 5 || ar.includes('لَا') || ar.includes('مَا'))) {
    // 3-Alif Stretch (Madd Munfasil)
    const legend = TAJWEED_SIGN_LEGEND_ITEMS.find((i) => i.symbol === '৩')!;
    badges.push({
      symbol: '৩',
      labelBn: legend.labelBn,
      labelEn: legend.labelEn,
      type: 'stretch',
      colorClass: legend.colorClass,
      bgClass: legend.bgClass,
      borderClass: legend.borderClass,
    });
  } else if (/[\u0670\u06E5\u06E6ٰ]/.test(ar) || ar.includes('ا') || ar.includes('و') || ar.includes('ي') || /[াীূ]/.test(bn)) {
    // 1-Alif Stretch (Madd Asli)
    const legend = TAJWEED_SIGN_LEGEND_ITEMS.find((i) => i.symbol === '১')!;
    badges.push({
      symbol: '১',
      labelBn: legend.labelBn,
      labelEn: legend.labelEn,
      type: 'stretch',
      colorClass: legend.colorClass,
      bgClass: legend.bgClass,
      borderClass: legend.borderClass,
    });
  }

  // 2. Check Heavy Letter Sound (তাফখীম / মোটা পাঠ 'ম')
  // Heavy letters: ص, ض, ط, ظ, ق, غ, خ or Heavy Allah 'اللَّهِ' or heavy 'ر'
  if (/[صضطظقغخ]/.test(ar) || ar.includes('الله') || ar.includes('اللَّهِ') || /[খগসদ্বত্বক]/.test(bn)) {
    const legend = TAJWEED_SIGN_LEGEND_ITEMS.find((i) => i.symbol === 'ম')!;
    badges.push({
      symbol: 'ম',
      labelBn: legend.labelBn,
      labelEn: legend.labelEn,
      type: 'heavy',
      colorClass: legend.colorClass,
      bgClass: legend.bgClass,
      borderClass: legend.borderClass,
    });
  }

  // 3. Check Ghunna ('গু')
  if (/[نم]\u0651/.test(ar) || ar.includes('إِنَّ') || ar.includes('أنَّ') || /[ংন্ন্ম্ম]/.test(bn)) {
    const legend = TAJWEED_SIGN_LEGEND_ITEMS.find((i) => i.symbol === 'গু')!;
    badges.push({
      symbol: 'গু',
      labelBn: legend.labelBn,
      labelEn: legend.labelEn,
      type: 'ghunna',
      colorClass: legend.colorClass,
      bgClass: legend.bgClass,
      borderClass: legend.borderClass,
    });
  }

  // 4. Check Qalqalah ('ক্ব')
  if (/[قطبجد]\u0652/.test(ar) || /[قطبجد]$/.test(ar.replace(/[\u064B-\u0652]/g, '')) || /[ক্বত্বব্জ্দ]/.test(bn)) {
    const legend = TAJWEED_SIGN_LEGEND_ITEMS.find((i) => i.symbol === 'ক্ব')!;
    badges.push({
      symbol: 'ক্ব',
      labelBn: legend.labelBn,
      labelEn: legend.labelEn,
      type: 'qalqalah',
      colorClass: legend.colorClass,
      bgClass: legend.bgClass,
      borderClass: legend.borderClass,
    });
  }

  return badges;
}

/**
 * Splits transliteration / pronunciation string into tokens and pairs each token
 * with the corresponding Arabic word's Tajweed / Color style and notation badges
 */
export function getColoredPronunciationTokens(
  pronunciationText: string,
  arabicWords?: Array<{ arabic: string; position?: number }>,
  isDay: boolean = false
): ColoredPronunciationWord[] {
  if (!pronunciationText) return [];

  // Clean and tokenize pronunciation
  const tokens = pronunciationText.trim().split(/\s+/);
  if (tokens.length === 0) return [];

  const wordCount = arabicWords?.length || tokens.length;

  return tokens.map((token, idx) => {
    // Determine corresponding Arabic word index
    const mappedWordIdx = Math.min(idx, wordCount - 1);
    const arabicWordObj = arabicWords ? arabicWords[mappedWordIdx] : undefined;
    const arabicText = arabicWordObj?.arabic || '';

    const style = detectTajweedRule(arabicText, mappedWordIdx);
    const badges = detectWordBadges(arabicText, token);

    return {
      text: token,
      style,
      wordIndex: mappedWordIdx,
      badges,
    };
  });
}

