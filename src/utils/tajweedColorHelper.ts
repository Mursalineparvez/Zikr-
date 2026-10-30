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

export interface PhoneticSyllable {
  text: string;
  badges: TajweedBadge[];
}

export interface ColoredPronunciationWord {
  text: string;
  style: TajweedColorStyle;
  wordIndex: number;
  badges: TajweedBadge[];
  syllables?: PhoneticSyllable[];
  arabic?: string;
}

/**
 * Splits a Bengali transliteration word into natural phonetic syllables
 */
export function splitBengaliWordIntoSyllables(word: string): string[] {
  if (!word) return [];

  // If word contains hyphens, preserve and split around them
  if (word.includes('-') || word.includes('–')) {
    const parts = word.split(/([-–])/);
    const result: string[] = [];
    for (const part of parts) {
      if (part === '-' || part === '–') {
        if (result.length > 0) {
          result[result.length - 1] += part;
        } else {
          result.push(part);
        }
      } else if (part) {
        result.push(...splitBengaliWordIntoSyllables(part));
      }
    }
    return result;
  }

  // Bengali syllable regex:
  // Matches independent vowels, consonants with diacritics and codas
  const regex = /(?:[অ-ঔ]|(?:[ক-হ]্)*[ক-হ])(?:[\u09BE-\u09CC\u09D7])?(?:্[ক-হ]|ং|ঃ|ঁ)?/g;
  const matches = word.match(regex);
  if (!matches || matches.length === 0) {
    return [word];
  }

  // Ensure trailing punctuation or characters are not lost
  const joined = matches.join('');
  if (joined.length < word.length) {
    const remainder = word.slice(joined.length);
    matches[matches.length - 1] += remainder;
  }

  return matches;
}

/**
 * Detects specific Tajweed signs for a specific Bengali syllable:
 * - 1, 3, or 4 Alif Stretch ('১', '৩', '৪')
 * - Heavy sound ('ম')
 * - Ghunnah ('গু')
 * - Qalqalah ('ক্ব')
 */
export function detectSyllableBadges(
  syllable: string,
  fullBnWord: string,
  arWord?: string,
  isAyahEnd: boolean = false,
  isLastSyllableOfWord: boolean = false
): TajweedBadge[] {
  const badges: TajweedBadge[] = [];
  if (!syllable) return badges;

  const s = syllable;
  const ar = arWord || '';

  // 1. Check Alif Stretch (৪, ৩, ১ আলিফ টান)
  // 4-Alif Stretch (Madd Muttasil / Lazim: ~ / ٓ / آ / أُولَٰئِكَ / السَّمَاءِ)
  const isMadd4 =
    /[\u0653~ٓآ]/.test(ar) ||
    ar.includes('أُولَٰئِكَ') ||
    ar.includes('السَّمَاءِ') ||
    ar.includes('جَاءَ') ||
    s.includes('~') ||
    s.includes('ٓ') ||
    s.includes('আ-') ||
    s.includes('ঈ-') ||
    s.includes('ঊ-');

  // 3-Alif Stretch: Madd Aarid at Ayah ending pause on the last prolonged syllable
  const isMadd3 =
    !isMadd4 &&
    isAyahEnd &&
    isLastSyllableOfWord &&
    (/[ীূ]/.test(s) || /[া]/.test(s) || /[يُو]\u0652?[ء-ي]?$/.test(ar));

  // 1-Alif Stretch: Regular Madd Asli (Aa-kar, Ee-kar, Oo-kar, or Alif/Waw/Yaa)
  const isMadd1 =
    !isMadd4 &&
    !isMadd3 &&
    (/[াীূ]/.test(s) || /^[আঈঊ]/.test(s) || /[\u0670\u06E5\u06E6ٰ]/.test(ar));

  if (isMadd4) {
    const legend = TAJWEED_SIGN_LEGEND_ITEMS.find((i) => i.symbol === '৪');
    if (legend) {
      badges.push({
        symbol: '৪',
        labelBn: legend.labelBn,
        labelEn: legend.labelEn,
        type: 'stretch',
        colorClass: legend.colorClass,
        bgClass: legend.bgClass,
        borderClass: legend.borderClass,
      });
    }
  } else if (isMadd3) {
    const legend = TAJWEED_SIGN_LEGEND_ITEMS.find((i) => i.symbol === '৩');
    if (legend) {
      badges.push({
        symbol: '৩',
        labelBn: legend.labelBn,
        labelEn: legend.labelEn,
        type: 'stretch',
        colorClass: legend.colorClass,
        bgClass: legend.bgClass,
        borderClass: legend.borderClass,
      });
    }
  } else if (isMadd1) {
    const legend = TAJWEED_SIGN_LEGEND_ITEMS.find((i) => i.symbol === '১');
    if (legend) {
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
  }

  // 2. Check Heavy Letter Sound (তাফখীম / মোটা পাঠ 'ম')
  // Letters: ق (ক্ব), ط (ত্ব), ص (সো/ছ), ض (দ্ব), ظ (যো/জো), خ (খ), غ (গ)
  // Plus heavy ر (রা, রো, রু) and heavy 'ল্লা' / 'ল্লাহ' in Allah's name
  const isHeavy =
    s.includes('ক্ব') ||
    s.includes('ত্ব') ||
    s.includes('সো') ||
    s.includes('ছ') ||
    s.includes('দ্ব') ||
    s.includes('যো') ||
    s.includes('জো') ||
    s.includes('খ') ||
    s.includes('গ') ||
    /^(?:র[াোু]|রা|রো|রু)/.test(s) ||
    (s.includes('ল্লা') && (ar.includes('الله') || ar.includes('اللَّهِ')));

  if (isHeavy) {
    const legend = TAJWEED_SIGN_LEGEND_ITEMS.find((i) => i.symbol === 'ম');
    if (legend) {
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
  }

  // 3. Check Ghunna ('গু')
  // Wajib Ghunnah: ম্ম (Meem Mushaddad), ন্ন (Noon Mushaddad)
  // Ikhfa: ং (Anusvara representing nasalization), or ন্ before ikhfa consonants
  const isGhunna =
    s.includes('ং') ||
    s.includes('ম্ম') ||
    s.includes('ন্ন') ||
    (/[নণ]্/.test(s) && /[তথদধজঝসশছক]/.test(fullBnWord.slice(fullBnWord.indexOf(s) + s.length)));

  if (isGhunna) {
    const legend = TAJWEED_SIGN_LEGEND_ITEMS.find((i) => i.symbol === 'গু');
    if (legend) {
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
  }

  // 4. Check Qalqalah ('ক্ব')
  // Letters of Qutub Jadd (ق ط ب ج د) with Sukun/Jazm: ক্ব্, ত্ব্, ব্, জ্, দ্
  // Or at ayah ending pause on these letters
  const isQalqalah =
    /ক্ব্|ত্ব্|ব্|জ্|দ্/.test(s) ||
    (isAyahEnd && isLastSyllableOfWord && /[ক্বত্বব্জ্দ]$/.test(s.replace(/[\s\(\)০-৯]/g, '')));

  if (isQalqalah) {
    const legend = TAJWEED_SIGN_LEGEND_ITEMS.find((i) => i.symbol === 'ক্ব');
    if (legend) {
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
  }

  return badges;
}

/**
 * Parses a Bengali transliteration word into syllables, attaching specific
 * Tajweed indicators directly to the exact syllable where the rule applies.
 */
export function parseBengaliWordIntoPhoneticSyllables(
  bnWord: string,
  arWord?: string,
  isAyahEnd: boolean = false
): PhoneticSyllable[] {
  if (!bnWord) return [];

  // Pass punctuation or pure numbers like (৫৭) through directly
  if (/^[\s\(\)০-৯.,;:!?–-]+$/.test(bnWord.trim())) {
    return [{ text: bnWord, badges: [] }];
  }

  const rawSyllables = splitBengaliWordIntoSyllables(bnWord);
  if (rawSyllables.length === 0) {
    return [{ text: bnWord, badges: [] }];
  }

  return rawSyllables.map((syl, sIdx) => {
    const isLastSyllableOfWord = sIdx === rawSyllables.length - 1;
    const badges = detectSyllableBadges(syl, bnWord, arWord, isAyahEnd, isLastSyllableOfWord);
    return {
      text: syl,
      badges,
    };
  });
}

/**
 * Detects specific Tajweed signs for backwards compatibility
 */
export function detectWordBadges(arabic: string, tokenBn: string): TajweedBadge[] {
  const syllables = parseBengaliWordIntoPhoneticSyllables(tokenBn, arabic);
  const badgesMap = new Map<string, TajweedBadge>();
  for (const syl of syllables) {
    for (const b of syl.badges) {
      badgesMap.set(b.symbol, b);
    }
  }
  return Array.from(badgesMap.values());
}

/**
 * Splits transliteration / pronunciation string into tokens and pairs each token
 * with the corresponding Arabic word's Tajweed / Color style and syllable-level signs
 */
export function getColoredPronunciationTokens(
  pronunciationText: string,
  arabicWords?: Array<{ arabic: string; position?: number }>,
  isDay: boolean = false
): ColoredPronunciationWord[] {
  if (!pronunciationText) return [];

  const tokens = pronunciationText.trim().split(/\s+/);
  if (tokens.length === 0) return [];

  const wordCount = arabicWords?.length || tokens.length;

  return tokens.map((token, idx) => {
    const mappedWordIdx = Math.min(idx, wordCount - 1);
    const arabicWordObj = arabicWords ? arabicWords[mappedWordIdx] : undefined;
    const arabicText = arabicWordObj?.arabic || '';
    const isAyahEnd = idx === tokens.length - 1;

    const style = detectTajweedRule(arabicText, mappedWordIdx);
    const syllables = parseBengaliWordIntoPhoneticSyllables(token, arabicText, isAyahEnd);
    const badges = detectWordBadges(arabicText, token);

    return {
      text: token,
      style,
      wordIndex: mappedWordIdx,
      badges,
      syllables,
      arabic: arabicText,
    };
  });
}


