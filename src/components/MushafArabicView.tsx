import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  ALL_114_SURAHS,
  SurahMeta,
} from '../utils/quran114List';
import {
  QuranSurahDetail,
  QuranAyah,
  QuranWord,
  QURAN_RECITERS,
} from '../utils/quranService';
import { ZikrLanguage, ThemeMode } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sliders,
  Volume2,
  X,
  BookOpen,
  Bookmark,
  Share2,
  Copy,
  Check,
  Search,
  Maximize2,
  Minimize2,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Info,
} from 'lucide-react';
import {
  getLocalizedSurahName,
  getBareSurahName,
  getLocalizedSurahMeaning,
} from '../utils/surahNamesMultiLang';

// Exact standard 604-page Madani Mushaf page start mapping for all 114 surahs
export const MADANI_SURAH_PAGES: Record<number, number> = {
  1: 1, 2: 2, 3: 50, 4: 77, 5: 106, 6: 128, 7: 151, 8: 177, 9: 187, 10: 208,
  11: 221, 12: 235, 13: 249, 14: 255, 15: 262, 16: 267, 17: 282, 18: 293, 19: 305, 20: 312,
  21: 322, 22: 332, 23: 342, 24: 350, 25: 359, 26: 367, 27: 377, 28: 385, 29: 396, 30: 404,
  31: 411, 32: 415, 33: 418, 34: 428, 35: 434, 36: 440, 37: 446, 38: 453, 39: 458, 40: 467,
  41: 477, 42: 483, 43: 489, 44: 496, 45: 499, 46: 502, 47: 507, 48: 511, 49: 515, 50: 518,
  51: 520, 52: 523, 53: 526, 54: 528, 55: 531, 56: 534, 57: 537, 58: 542, 59: 545, 60: 549,
  61: 551, 62: 553, 63: 554, 64: 556, 65: 558, 66: 560, 67: 562, 68: 564, 69: 566, 70: 568,
  71: 570, 72: 572, 73: 574, 74: 575, 75: 577, 76: 578, 77: 580, 78: 582, 79: 583, 80: 585,
  81: 586, 82: 587, 83: 587, 84: 589, 85: 590, 86: 591, 87: 591, 88: 592, 89: 593, 90: 594,
  91: 595, 92: 595, 93: 596, 94: 596, 95: 597, 96: 597, 97: 598, 98: 598, 99: 599, 100: 599,
  101: 600, 102: 600, 103: 601, 104: 601, 105: 601, 106: 602, 107: 602, 108: 602, 109: 603, 110: 603,
  111: 603, 112: 604, 113: 604, 114: 604
};

const toArabicNumerals = (num: number): string => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/\d/g, (d) => arabicDigits[parseInt(d, 10)]);
};

export type MushafTheme = 'madina' | 'hafezi' | 'white' | 'night';
export type MushafFont = 'uthmani' | 'naskh' | 'indopak';
export type MushafFontSize = 'compact' | 'standard' | 'large' | 'huge';

interface BookmarkItem {
  surahNumber: number;
  ayahNumber: number;
  surahName: string;
  surahEnglishName: string;
  arabicSnippet: string;
  translationSnippet: string;
  timestamp: number;
}

interface MushafArabicViewProps {
  surahDetail: QuranSurahDetail;
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  onSelectSurah: (surahNumber: number) => void;
  onExitMushaf: () => void;
  // Audio Controls
  isPlaying: boolean;
  playingMode: 'surah' | 'ayah' | null;
  currentPlayingAyahNum: number | null;
  audioProgress: number;
  onPlaySurah: (surahNumber: number) => void;
  onPlayAyah: (ayah: QuranAyah) => void;
  onStopAudio: () => void;
  selectedReciterId: string;
  onChangeReciter?: (reciterId: string) => void;
  // Modals & Bookmarks
  onOpenTafsir: (ayah: QuranAyah) => void;
  bookmarks: BookmarkItem[];
  onToggleBookmark: (ayah: QuranAyah) => void;
}

export const MushafArabicView: React.FC<MushafArabicViewProps> = ({
  surahDetail,
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
  onSelectSurah,
  onExitMushaf,
  isPlaying,
  playingMode,
  currentPlayingAyahNum,
  audioProgress,
  onPlaySurah,
  onPlayAyah,
  onStopAudio,
  selectedReciterId,
  onChangeReciter,
  onOpenTafsir,
  bookmarks,
  onToggleBookmark,
}) => {
  // Persistence for user preferences
  const [mushafTheme, setMushafTheme] = useState<MushafTheme>(() => {
    try {
      const saved = localStorage.getItem('mushaf_arabic_theme');
      if (saved && ['madina', 'hafezi', 'white', 'night'].includes(saved)) {
        return saved as MushafTheme;
      }
    } catch {}
    return themeMode === 'day' ? 'madina' : 'night';
  });

  const [fontSize, setFontSize] = useState<MushafFontSize>(() => {
    try {
      const saved = localStorage.getItem('mushaf_arabic_fontsize');
      if (saved && ['compact', 'standard', 'large', 'huge'].includes(saved)) {
        return saved as MushafFontSize;
      }
    } catch {}
    return 'standard';
  });

  const [mushafFont, setMushafFont] = useState<MushafFont>(() => {
    try {
      const saved = localStorage.getItem('mushaf_arabic_font');
      if (saved && ['uthmani', 'naskh', 'indopak'].includes(saved)) {
        return saved as MushafFont;
      }
    } catch {}
    return 'uthmani';
  });

  const [showRuledLines, setShowRuledLines] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('mushaf_ruled_lines');
      return saved !== 'false'; // default true (lined notebook style matching screenshot)
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mushaf_arabic_theme', mushafTheme);
      localStorage.setItem('mushaf_arabic_fontsize', fontSize);
      localStorage.setItem('mushaf_arabic_font', mushafFont);
      localStorage.setItem('mushaf_ruled_lines', String(showRuledLines));
    } catch {}
  }, [mushafTheme, fontSize, mushafFont, showRuledLines]);

  // Modals & Floating Popovers
  const [showSettingsDrawer, setShowSettingsDrawer] = useState(false);
  const [showSurahPicker, setShowSurahPicker] = useState(false);
  const [surahPickerSearch, setSurahPickerSearch] = useState('');
  
  // Inline Floating Popover above clicked Ayah or Word (replaces full-screen modal)
  interface PopoverAnchor {
    ayah: QuranAyah;
    word?: QuranWord;
    wordIndex?: number;
    rect: {
      top: number;
      bottom: number;
      left: number;
      right: number;
      width: number;
      height: number;
    };
  }
  const [activePopover, setActivePopover] = useState<PopoverAnchor | null>(null);
  const [copiedAyah, setCopiedAyah] = useState<number | null>(null);

  // Active Ayah element ref for smooth scroll during audio
  const activeAyahRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (isPlaying && currentPlayingAyahNum && activeAyahRef.current) {
      activeAyahRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isPlaying, currentPlayingAyahNum]);

  // Auto-dismiss floating popover on scroll, resize, or Escape key
  useEffect(() => {
    if (!activePopover) return;
    const handleDismiss = () => setActivePopover(null);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActivePopover(null);
    };
    window.addEventListener('scroll', handleDismiss, { passive: true });
    window.addEventListener('resize', handleDismiss);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleDismiss);
      window.removeEventListener('resize', handleDismiss);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activePopover]);

  const handleWordClick = (
    e: React.MouseEvent,
    ayah: QuranAyah,
    word: QuranWord,
    wordIndex: number
  ) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setActivePopover({
      ayah,
      word,
      wordIndex,
      rect: {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height,
      },
    });
    if (soundEnabled) soundHaptics.playTap();
  };

  const handleAyahClick = (e: React.MouseEvent, ayah: QuranAyah) => {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setActivePopover({
      ayah,
      rect: {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height,
      },
    });
    if (soundEnabled) soundHaptics.playTap();
  };

  // Surah page and juz calculation
  const startPage = MADANI_SURAH_PAGES[surahDetail.number] || 1;
  const juzNumber = surahDetail.startJuz || Math.ceil((surahDetail.number * 0.26));

  const isAyahBookmarked = (ayahNum: number) => {
    return bookmarks.some(
      (b) => b.surahNumber === surahDetail.number && b.ayahNumber === ayahNum
    );
  };

  const handleCopyAyah = (ayah: QuranAyah) => {
    const text = `${ayah.arabic} ﴿${toArabicNumerals(ayah.number)}﴾\n\n— সূরা ${surahDetail.englishName} (${surahDetail.name}), আয়াত: ${ayah.number}`;
    navigator.clipboard.writeText(text);
    setCopiedAyah(ayah.number);
    if (soundEnabled) soundHaptics.playTap();
    setTimeout(() => setCopiedAyah(null), 2000);
  };

  // Font family class
  const getFontFamilyClass = () => {
    switch (mushafFont) {
      case 'uthmani':
        return 'font-quran';
      case 'naskh':
        return 'font-naskh';
      case 'indopak':
        return 'font-indopak';
      default:
        return 'font-quran';
    }
  };

  // Font size configuration (classes & line-height for ruled notebook)
  const getFontSizeConfig = () => {
    switch (fontSize) {
      case 'compact':
        return {
          textClass: 'text-xl sm:text-2xl md:text-[28px]',
          lineHeight: 'leading-[2.4]',
          ruleHeight: '2.4em',
        };
      case 'standard':
        return {
          textClass: 'text-2xl sm:text-3xl md:text-[34px]',
          lineHeight: 'leading-[2.7]',
          ruleHeight: '2.7em',
        };
      case 'large':
        return {
          textClass: 'text-3xl sm:text-4xl md:text-[40px]',
          lineHeight: 'leading-[2.9]',
          ruleHeight: '2.9em',
        };
      case 'huge':
        return {
          textClass: 'text-4xl sm:text-5xl md:text-[46px]',
          lineHeight: 'leading-[3.2]',
          ruleHeight: '3.2em',
        };
    }
  };

  const fontConfig = getFontSizeConfig();

  // Color & Theme Palette Definitions (matching the app's signature Emerald & Gold identity)
  const themeStyles = useMemo(() => {
    switch (mushafTheme) {
      case 'madina':
        // Royal Madani Emerald & Gold (Signature App UI)
        return {
          pageBg: 'bg-[#fcfbf7]',
          pageText: 'text-[#06241b]',
          ruleLine: 'rgba(210, 175, 125, 0.28)',
          headerBg: 'bg-gradient-to-r from-[#004d35] via-[#006747] to-[#047857]',
          ribbonContainer: 'bg-black/25 text-white border-white/20 shadow-inner backdrop-blur-md hover:bg-black/35',
          pageNumberBadge: 'bg-amber-400 text-slate-950 font-black',
          bismillahCard: 'bg-gradient-to-r from-amber-50/90 via-white to-amber-50/90 text-[#006747] border-2 border-amber-500/50 shadow-md ring-1 ring-amber-400/20',
          ayahBadgeBorder: 'border-amber-600/80',
          ayahBadgeBg: 'bg-gradient-to-br from-[#fffdfa] via-amber-50 to-amber-100/90',
          ayahBadgeText: 'text-amber-950 font-black',
          ayahHighlightBg: 'bg-amber-400/25 text-[#004d35] ring-2 ring-amber-500/60 shadow-sm',
          pageContainerBorder: 'border-amber-600/30 ring-1 ring-amber-500/20 shadow-2xl',
        };
      case 'hafezi':
        // Traditional Bangladesh & Indo-Pak Hafezi Mushaf
        return {
          pageBg: 'bg-[#faf6eb]',
          pageText: 'text-[#141414]',
          ruleLine: 'rgba(190, 150, 100, 0.26)',
          headerBg: 'bg-gradient-to-r from-[#173824] via-[#1e4830] to-[#173824]',
          ribbonContainer: 'bg-black/25 text-amber-100 border-amber-500/30 shadow-inner backdrop-blur-md',
          pageNumberBadge: 'bg-amber-400 text-slate-950 font-black',
          bismillahCard: 'bg-[#fbf7eb] text-[#1e4830] border-2 border-amber-700/40 shadow-md ring-1 ring-amber-500/20',
          ayahBadgeBorder: 'border-amber-700',
          ayahBadgeBg: 'bg-gradient-to-br from-[#fbf7ed] to-[#f2e2be]',
          ayahBadgeText: 'text-amber-950 font-black',
          ayahHighlightBg: 'bg-amber-400/30 text-[#173824] ring-2 ring-amber-600/60 shadow-sm',
          pageContainerBorder: 'border-amber-700/35 ring-1 ring-amber-600/20 shadow-2xl',
        };
      case 'white':
        // Modern Minimalist White & Emerald
        return {
          pageBg: 'bg-white',
          pageText: 'text-slate-900',
          ruleLine: 'rgba(16, 185, 129, 0.18)',
          headerBg: 'bg-gradient-to-r from-[#005a3e] via-[#00704d] to-[#005a3e]',
          ribbonContainer: 'bg-white/15 text-white border-white/25 shadow-inner backdrop-blur-md',
          pageNumberBadge: 'bg-emerald-600 text-white font-black',
          bismillahCard: 'bg-gradient-to-r from-emerald-50/70 via-white to-emerald-50/70 text-[#005a3e] border-2 border-emerald-600/30 shadow-sm',
          ayahBadgeBorder: 'border-emerald-700',
          ayahBadgeBg: 'bg-emerald-50',
          ayahBadgeText: 'text-emerald-950 font-black',
          ayahHighlightBg: 'bg-emerald-100 text-emerald-950 ring-2 ring-emerald-500',
          pageContainerBorder: 'border-emerald-300/60 shadow-xl',
        };
      case 'night':
      default:
        // Celestial Midnight Velvet Emerald (Matching App Dark Mode)
        return {
          pageBg: 'bg-[#031510]',
          pageText: 'text-[#d8f5ec]',
          ruleLine: 'rgba(52, 211, 153, 0.13)',
          headerBg: 'bg-gradient-to-r from-[#031c15] via-[#072c21] to-[#031c15]',
          ribbonContainer: 'bg-black/40 text-emerald-100 border-emerald-500/40 shadow-inner backdrop-blur-md',
          pageNumberBadge: 'bg-amber-400 text-slate-950 font-black',
          bismillahCard: 'bg-gradient-to-r from-[#06221a] via-[#093327] to-[#06221a] text-amber-300 border-2 border-amber-400/40 shadow-lg ring-1 ring-emerald-500/30',
          ayahBadgeBorder: 'border-amber-400/80',
          ayahBadgeBg: 'bg-gradient-to-br from-[#0c3127] to-[#041a14]',
          ayahBadgeText: 'text-amber-300 font-black',
          ayahHighlightBg: 'bg-emerald-500/25 text-emerald-100 ring-2 ring-emerald-400/60 shadow-md',
          pageContainerBorder: 'border-emerald-600/40 ring-1 ring-emerald-400/20 shadow-2xl',
        };
    }
  }, [mushafTheme]);

  // Ruled notebook lines gradient style
  const ruledLinesStyle = showRuledLines
    ? {
        backgroundImage: `linear-gradient(to bottom, transparent 92%, ${themeStyles.ruleLine} 94%)`,
        backgroundSize: `100% ${fontConfig.ruleHeight}`,
      }
    : {};

  // Surahs filtered for quick picker
  const filteredSurahs = useMemo(() => {
    if (!surahPickerSearch.trim()) return ALL_114_SURAHS;
    const q = surahPickerSearch.toLowerCase().trim();
    return ALL_114_SURAHS.filter(
      (s) =>
        s.number.toString().includes(q) ||
        s.englishName.toLowerCase().includes(q) ||
        s.name.includes(q) ||
        s.englishNameTranslation.toLowerCase().includes(q) ||
        getLocalizedSurahName(s.number, 'bn').toLowerCase().includes(q) ||
        getLocalizedSurahMeaning(s.number, 'bn').toLowerCase().includes(q)
    );
  }, [surahPickerSearch]);

  const activeReciter = QURAN_RECITERS.find((r) => r.id === selectedReciterId) || QURAN_RECITERS[0];

  return (
    <div className="space-y-4 animate-in fade-in duration-300 select-text pb-20">
      {/* ========================================================================= */}
      {/* 1. TOP HEADER RIBBON (Identical to user's uploaded reference screenshot)  */}
      {/* ========================================================================= */}
      <header className={`${themeStyles.headerBg} text-white p-2.5 sm:p-3 rounded-2xl shadow-xl border border-emerald-700/40 relative z-30 transition-colors`}>
        {/* Upper Status / Remembrance Hint */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-emerald-300/80 px-2 pb-1 border-b border-white/10 mb-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              {selectedLanguage === 'bn' ? 'পবিত্র কুরআন শুধু আরবি তিলাওয়াত মোড' : 'Pure Arabic Quran Tilawat Mode'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setShowSettingsDrawer(!showSettingsDrawer);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="hover:text-amber-300 transition flex items-center gap-1 text-[11px] font-bold cursor-pointer"
            >
              <Sliders className="w-3 h-3 text-amber-400" />
              <span>{selectedLanguage === 'bn' ? 'সেটিংস' : 'Settings'}</span>
            </button>
          </div>
        </div>

        {/* Main Nav Row: Back Chevron | Sage Pill (JUZ | Page | Surah) | Right Action */}
        <div className="flex items-center justify-between gap-1.5 sm:gap-3">
          {/* Back button to leave Mushaf Mode or go to Quran Directory */}
          <button
            onClick={() => {
              if (soundEnabled) soundHaptics.playTap();
              onExitMushaf();
            }}
            className="p-2 sm:p-2.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition cursor-pointer text-white shrink-0"
            title={selectedLanguage === 'bn' ? 'সাধারণ অনুবাদসহ মোডে ফিরুন' : 'Return to Standard Mode'}
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Central Interactive Pill Container matching App UI */}
          <div
            onClick={() => {
              setShowSurahPicker(true);
              if (soundEnabled) soundHaptics.playTap();
            }}
            className={`flex-1 max-w-xl ${themeStyles.ribbonContainer} font-bold text-xs sm:text-sm py-2 px-3 sm:px-5 rounded-xl border flex items-center justify-between shadow-inner cursor-pointer hover:opacity-95 transition select-none`}
            title={selectedLanguage === 'bn' ? 'অন্য সূরা বা জুয নির্বাচন করতে ক্লিক করুন' : 'Click to jump to another Surah or Juz'}
          >
            {/* Left: JUZ badge */}
            <span className="font-extrabold tracking-wide uppercase flex items-center gap-1.5 text-amber-300">
              <span className="text-amber-400 text-xs">✦</span>
              <span>JUZ {juzNumber}</span>
            </span>

            {/* Center: Page Number badge */}
            <span className={`font-mono font-black px-2.5 py-0.5 rounded-lg ${themeStyles.pageNumberBadge} text-xs sm:text-sm shadow-xs`}>
              {startPage}
            </span>

            {/* Right: Surah Number and Localized Name badge */}
            <span className="font-extrabold tracking-wide flex items-center gap-1 truncate max-w-[150px] sm:max-w-none text-white">
              <span>{surahDetail.number}. {getBareSurahName(surahDetail.number, selectedLanguage)}</span>
            </span>
          </div>

          {/* Right Mode Toggle / Audio Play Button */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Audio Recitation Toggle */}
            <button
              onClick={() => {
                if (isPlaying) {
                  onStopAudio();
                } else {
                  onPlaySurah(surahDetail.number);
                }
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`p-2 sm:px-3.5 sm:py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md active:scale-95 cursor-pointer ${
                isPlaying
                  ? 'bg-amber-400 text-slate-950 hover:bg-amber-300 ring-2 ring-amber-400/50 font-black'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-400/40 shadow-emerald-950/20'
              }`}
              title={isPlaying ? 'তিলাওয়াত থামান' : 'সম্পূর্ণ সূরা তিলাওয়াত শুনুন'}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span className="hidden md:inline">{selectedLanguage === 'bn' ? 'থামান' : 'Pause'}</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span className="hidden md:inline">{selectedLanguage === 'bn' ? 'তিলাওয়াত' : 'Recite'}</span>
                </>
              )}
            </button>

            {/* Exit Mushaf to Normal Mode */}
            <button
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                onExitMushaf();
              }}
              className="px-2.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-emerald-100 text-[11px] font-bold border border-white/20 transition cursor-pointer active:scale-95"
              title="অনুবাদসহ সাধারণ ভিউতে ফিরুন"
            >
              <span>{selectedLanguage === 'bn' ? 'অনুবাদসহ' : 'Normal'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. SETTINGS DRAWER (Appearance, Fonts, Line Dividers, Reciter)            */}
      {/* ========================================================================= */}
      {showSettingsDrawer && (
        <div className="bg-white dark:bg-[#071f1a] border border-slate-200 dark:border-emerald-800/60 p-4 rounded-2xl shadow-xl space-y-4 animate-in slide-in-from-top-2 duration-200 text-slate-800 dark:text-slate-100">
          <div className="flex items-center justify-between border-b pb-2 border-slate-200 dark:border-emerald-800/40">
            <h3 className="text-sm font-bold flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
              <Sliders className="w-4 h-4" />
              <span>{selectedLanguage === 'bn' ? 'মুসহাফ প্রদর্শন সেটিংস' : 'Mushaf Display Settings'}</span>
            </h3>
            <button
              onClick={() => setShowSettingsDrawer(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            {/* 1. Theme Colorways */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-600 dark:text-slate-300">
                {selectedLanguage === 'bn' ? 'পৃষ্ঠার থিম' : 'Page Theme'}
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'madina', name: 'মদিনা পেপার', bg: 'bg-[#faf7ee] text-[#062d23] border-[#7db392]' },
                  { id: 'hafezi', name: 'নূরানী ক্রিম', bg: 'bg-[#fcf8ec] text-amber-950 border-amber-300' },
                  { id: 'white', name: 'আধুনিক সাদা', bg: 'bg-white text-slate-900 border-slate-300' },
                  { id: 'night', name: 'রাত্রিকালীন ডার্ক', bg: 'bg-[#041512] text-emerald-200 border-emerald-700' },
                ].map((th) => (
                  <button
                    key={th.id}
                    onClick={() => {
                      setMushafTheme(th.id as MushafTheme);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`py-1.5 px-2 rounded-xl text-[11px] font-bold border transition ${th.bg} ${
                      mushafTheme === th.id ? 'ring-2 ring-emerald-500 font-extrabold shadow-sm' : 'opacity-80'
                    }`}
                  >
                    {th.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Arabic Font Family */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-600 dark:text-slate-300">
                {selectedLanguage === 'bn' ? 'আরবি ফন্ট' : 'Arabic Script'}
              </label>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'uthmani', label: 'উসমানী' },
                  { id: 'naskh', label: 'নাসখ' },
                  { id: 'indopak', label: 'ইন্দোপাক' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => {
                      setMushafFont(f.id as MushafFont);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`py-1.5 px-1 rounded-xl text-[11px] font-bold border text-center transition ${
                      mushafFont === f.id
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-100 dark:bg-[#0f2e26] border-slate-200 dark:border-emerald-800'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Font Size */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-600 dark:text-slate-300">
                {selectedLanguage === 'bn' ? 'ফন্ট সাইজ' : 'Font Size'}
              </label>
              <div className="grid grid-cols-4 gap-1">
                {[
                  { id: 'compact', label: 'ছোট' },
                  { id: 'standard', label: 'মাঝারি' },
                  { id: 'large', label: 'বড়' },
                  { id: 'huge', label: 'বিশাল' },
                ].map((sz) => (
                  <button
                    key={sz.id}
                    onClick={() => {
                      setFontSize(sz.id as MushafFontSize);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`py-1.5 px-1 rounded-xl text-[11px] font-bold border text-center transition ${
                      fontSize === sz.id
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-100 dark:bg-[#0f2e26] border-slate-200 dark:border-emerald-800'
                    }`}
                  >
                    {sz.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Ruled Notebook Lines Toggle */}
            <div className="space-y-1.5">
              <label className="font-bold text-slate-600 dark:text-slate-300">
                {selectedLanguage === 'bn' ? 'খাতাসদৃশ দাগ' : 'Notebook Lines'}
              </label>
              <button
                onClick={() => {
                  setShowRuledLines(!showRuledLines);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-between transition ${
                  showRuledLines
                    ? 'bg-emerald-600/15 border-emerald-600 text-emerald-800 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-[#0f2e26] border-slate-300 dark:border-emerald-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                <span>
                  {showRuledLines
                    ? selectedLanguage === 'bn' ? '✓ দাগ চালু' : '✓ Lined'
                    : selectedLanguage === 'bn' ? '✕ দাগ বন্ধ' : '✕ Plain'}
                </span>
                <span className="text-xs">✏️</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. AUTHENTIC MUSHAF PAGE (Ruled Lines + Continuous Arabic Tilawat Flow)    */}
      {/* ========================================================================= */}
      <main
        className={`${themeStyles.pageBg} ${themeStyles.pageText} ${themeStyles.pageContainerBorder} border-2 shadow-2xl rounded-[28px] p-4 sm:p-7 md:p-9 space-y-4 relative overflow-hidden transition-colors`}
      >
        {/* Calligraphic Bismillah Header Card matching app signature styling */}
        {surahDetail.number !== 1 && surahDetail.number !== 9 && (
          <div className="pt-2 pb-4 text-center">
            <div
              className={`inline-block py-3 px-8 sm:px-14 rounded-2xl ${themeStyles.bismillahCard} max-w-lg mx-auto transition-transform hover:scale-[1.01]`}
            >
              <div className="flex items-center justify-center gap-3">
                <span className="text-amber-500/80 text-xs sm:text-sm select-none">✦</span>
                <div className="font-quran text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider select-none drop-shadow-xs">
                  بِسْمِ ٱللَّهِ ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ
                </div>
                <span className="text-amber-500/80 text-xs sm:text-sm select-none">✦</span>
              </div>
            </div>
          </div>
        )}

        {/* Continuous Flowing Arabic Text with Ruled Dividers */}
        <div
          dir="rtl"
          className={`${getFontFamilyClass()} ${fontConfig.textClass} ${fontConfig.lineHeight} font-bold text-right text-justify select-text pt-2 space-y-0`}
          style={ruledLinesStyle}
        >
          {surahDetail.ayahs.map((ayah) => {
            const isThisAyahPlaying =
              isPlaying &&
              ((playingMode === 'ayah' && currentPlayingAyahNum === ayah.number) ||
                (playingMode === 'surah' && currentPlayingAyahNum === ayah.number));
            const isBookmarked = isAyahBookmarked(ayah.number);

            return (
              <span
                key={ayah.number}
                ref={isThisAyahPlaying ? activeAyahRef : null}
                onClick={(e) => handleAyahClick(e, ayah)}
                className={`inline rounded-xl px-1 py-0.5 transition cursor-pointer select-text hover:bg-emerald-500/15 active:opacity-90 ${
                  isThisAyahPlaying
                    ? themeStyles.ayahHighlightBg
                    : isBookmarked
                    ? 'bg-amber-300/20 underline decoration-amber-400 decoration-wavy'
                    : ''
                }`}
                title={`আয়াত ${ayah.number} - তিলাওয়াত, অর্থ, তাফসীর ও অপশনের জন্য ট্যাপ করুন`}
              >
                {/* Arabic Words or Full Text */}
                <span className="inline tracking-normal font-semibold">
                  {ayah.words && ayah.words.length > 0
                    ? ayah.words.map((w, wIdx) => {
                        const isWordActive =
                          isThisAyahPlaying &&
                          audioProgress > 0 &&
                          Math.floor((audioProgress / 100) * ayah.words!.length) === wIdx;

                        return (
                          <span
                            key={wIdx}
                            onClick={(e) => handleWordClick(e, ayah, w, wIdx)}
                            className={`inline-block mx-0.5 px-0.5 rounded-md transition hover:bg-emerald-500/25 active:scale-95 cursor-pointer ${
                              isWordActive
                                ? 'text-amber-500 dark:text-amber-300 font-black scale-105 drop-shadow-sm'
                                : ''
                            }`}
                            title={`${w.arabic} ${w.translation ? `(${w.translation})` : ''}`}
                          >
                            {w.arabic}
                          </span>
                        );
                      })
                    : ayah.arabic}
                </span>

                {/* Ornate Circular End-of-Ayah Badge (Exact to uploaded screenshot ۝١ ۝٢ ۝٣ ...) */}
                <span
                  onClick={(e) => handleAyahClick(e, ayah)}
                  className="inline-flex items-center justify-center mx-1.5 align-middle select-none cursor-pointer"
                >
                  <span
                    className={`w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 rounded-full border-2 ${themeStyles.ayahBadgeBorder} ${themeStyles.ayahBadgeBg} ${themeStyles.ayahBadgeText} text-xs sm:text-sm md:text-base font-bold font-arabic flex items-center justify-center shadow-xs transition transform hover:scale-110 active:scale-95`}
                  >
                    {toArabicNumerals(ayah.number)}
                  </span>
                </span>
              </span>
            );
          })}
        </div>

        {/* Mushaf Page Footer Strip */}
        <div className="pt-6 mt-6 border-t border-slate-300/70 dark:border-emerald-800/40 flex flex-wrap items-center justify-between gap-3 text-xs font-bold opacity-90">
          <div className="flex items-center gap-2 text-slate-700 dark:text-emerald-200">
            <span className="font-extrabold">{getLocalizedSurahName(surahDetail.number, selectedLanguage)} ({surahDetail.name})</span>
            <span>•</span>
            <span>{selectedLanguage === 'bn' ? `${surahDetail.numberOfAyahs}টি আয়াত` : `${surahDetail.numberOfAyahs} Ayahs`}</span>
            <span>•</span>
            <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
              {selectedLanguage === 'bn' ? `পারা ${juzNumber}` : `Juz ${juzNumber}`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-emerald-600/15 text-emerald-800 dark:text-emerald-300 border border-emerald-600/30 text-[11px] font-black">
              📖 {selectedLanguage === 'bn' ? 'শুধু আরবি পবিত্র কুরআন' : 'Pure Arabic Noble Quran'}
            </span>
          </div>
        </div>

        {/* Navigation to Previous & Next Surah */}
        <div className="pt-3 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              if (surahDetail.number > 1) {
                onSelectSurah(surahDetail.number - 1);
                if (soundEnabled) soundHaptics.playTap();
              }
            }}
            disabled={surahDetail.number <= 1}
            className={`flex-1 py-3 px-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition active:scale-98 shadow-sm ${
              surahDetail.number <= 1
                ? 'opacity-40 cursor-not-allowed border-transparent bg-black/5 dark:bg-white/5 text-slate-400'
                : 'bg-white/90 dark:bg-[#071f18] hover:bg-emerald-50 dark:hover:bg-[#0c2e24] border-emerald-600/30 text-emerald-950 dark:text-emerald-100 cursor-pointer shadow-sm'
            }`}
          >
            <ChevronLeft className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>
              {surahDetail.number > 1
                ? (selectedLanguage === 'bn' ? `পূর্ববর্তী: ${getBareSurahName(surahDetail.number - 1, selectedLanguage)}` : `Previous: ${getBareSurahName(surahDetail.number - 1, selectedLanguage)}`)
                : (selectedLanguage === 'bn' ? 'প্রথম সূরা' : 'First Surah')}
            </span>
          </button>

          <button
            onClick={() => {
              if (surahDetail.number < 114) {
                onSelectSurah(surahDetail.number + 1);
                if (soundEnabled) soundHaptics.playTap();
              }
            }}
            disabled={surahDetail.number >= 114}
            className={`flex-1 py-3 px-4 rounded-2xl border text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition active:scale-98 shadow-md ${
              surahDetail.number >= 114
                ? 'opacity-40 cursor-not-allowed border-transparent bg-black/5 dark:bg-white/5 text-slate-400'
                : 'bg-gradient-to-r from-emerald-600 to-[#006747] hover:from-emerald-500 hover:to-emerald-600 border-emerald-500/50 text-white cursor-pointer shadow-emerald-950/20'
            }`}
          >
            <span>
              {surahDetail.number < 114
                ? (selectedLanguage === 'bn' ? `পরবর্তী: ${getBareSurahName(surahDetail.number + 1, selectedLanguage)}` : `Next: ${getBareSurahName(surahDetail.number + 1, selectedLanguage)}`)
                : (selectedLanguage === 'bn' ? 'শেষ সূরা' : 'Last Surah')}
            </span>
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. INLINE FLOATING AYAH / WORD POPOVER (Positioned directly above, NO modal)*/}
      {/* ========================================================================= */}
      {activePopover && (() => {
        const isDayTheme = mushafTheme !== 'night';
        const winWidth = typeof window !== 'undefined' ? window.innerWidth : 400;
        const popoverWidth = Math.min(380, winWidth - 24);
        const targetCenterX = activePopover.rect.left + activePopover.rect.width / 2;
        const clampedLeft = Math.max(12, Math.min(winWidth - popoverWidth - 12, targetCenterX - popoverWidth / 2));
        const caretLeft = Math.max(16, Math.min(popoverWidth - 24, targetCenterX - clampedLeft));
        const placeAbove = activePopover.rect.top > 190;

        return (
          <>
            {/* Transparent backdrop to catch clicks outside without dimming the screen */}
            <div
              className="fixed inset-0 z-40 bg-transparent cursor-default"
              onClick={() => setActivePopover(null)}
            />

            {/* Floating Tooltip Box */}
            <div
              style={{
                position: 'fixed',
                left: `${clampedLeft}px`,
                width: `${popoverWidth}px`,
                ...(placeAbove
                  ? { top: `${activePopover.rect.top - 10}px`, transform: 'translateY(-100%)' }
                  : { top: `${activePopover.rect.bottom + 10}px` }),
              }}
              className={`z-50 rounded-2xl border-2 p-3 sm:p-3.5 shadow-2xl backdrop-blur-md transition-all animate-in fade-in zoom-in-95 duration-150 ${
                isDayTheme
                  ? 'bg-white/98 border-emerald-600/40 text-slate-900 shadow-emerald-950/20'
                  : 'bg-[#061c16]/98 border-emerald-500/50 text-emerald-50 shadow-black/80'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Little Caret Arrow Pointing directly at the clicked Ayah or Word */}
              <div
                style={{ left: `${caretLeft}px` }}
                className={`absolute w-3 h-3 rotate-45 transform -translate-x-1/2 border-2 ${
                  placeAbove
                    ? 'bottom-[-7px] border-t-0 border-l-0 ' + (isDayTheme ? 'bg-white border-emerald-600/40' : 'bg-[#061c16] border-emerald-500/50')
                    : 'top-[-7px] border-b-0 border-r-0 ' + (isDayTheme ? 'bg-white border-emerald-600/40' : 'bg-[#061c16] border-emerald-500/50')
                }`}
              />

              {/* Popover Top Bar */}
              <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-black/10 dark:border-white/10 mb-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-mono font-bold text-[10px] flex items-center justify-center shrink-0">
                    {activePopover.ayah.number}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 truncate">
                    {getBareSurahName(surahDetail.number, selectedLanguage)} : আয়াত {activePopover.ayah.number}
                  </span>
                  {activePopover.word && (
                    <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-800 dark:text-amber-300 border border-amber-400/40 shrink-0 font-arabic">
                      {activePopover.word.arabic}
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setActivePopover(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white transition cursor-pointer"
                  title="বন্ধ করুন"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Word Breakdown if clicked a specific word */}
              {activePopover.word && (
                <div className="mb-2 p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 font-bold min-w-0 truncate">
                    <span className="font-quran text-base text-emerald-900 dark:text-emerald-200 shrink-0">{activePopover.word.arabic}</span>
                    <span className="text-slate-400 text-[10px] shrink-0">➜</span>
                    <span className="text-amber-700 dark:text-amber-300 font-extrabold truncate">
                      {activePopover.word.translation || activePopover.word.transliteration}
                    </span>
                  </div>
                  {activePopover.word.transliteration && (
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 italic shrink-0 hidden xs:inline">
                      ({activePopover.word.transliteration})
                    </span>
                  )}
                </div>
              )}

              {/* Ayah Translation / Meaning */}
              <div className="mb-2.5">
                <p className="text-xs sm:text-[13px] leading-relaxed text-slate-700 dark:text-slate-200 font-medium max-h-32 overflow-y-auto pr-1">
                  {activePopover.ayah.translation || 'অর্থ লোড হচ্ছে...'}
                </p>
              </div>

              {/* Compact Mini Action Buttons */}
              <div className="grid grid-cols-4 gap-1.5 text-[11px] font-bold">
                <button
                  onClick={() => {
                    onPlayAyah(activePopover.ayah);
                    if (soundEnabled) soundHaptics.playTap();
                    setActivePopover(null);
                  }}
                  className="py-1.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center gap-1 shadow-xs active:scale-95 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>শুনুন</span>
                </button>

                <button
                  onClick={() => {
                    onOpenTafsir(activePopover.ayah);
                    if (soundEnabled) soundHaptics.playTap();
                    setActivePopover(null);
                  }}
                  className="py-1.5 px-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center justify-center gap-1 shadow-xs active:scale-95 cursor-pointer"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>তাফসীর</span>
                </button>

                <button
                  onClick={() => {
                    onToggleBookmark(activePopover.ayah);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`py-1.5 px-2 rounded-xl border flex items-center justify-center gap-1 active:scale-95 cursor-pointer transition ${
                    isAyahBookmarked(activePopover.ayah.number)
                      ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200'
                      : 'bg-black/5 dark:bg-white/10 text-slate-700 dark:text-emerald-200 border-black/10 dark:border-white/15'
                  }`}
                >
                  <Bookmark className={`w-3 h-3 ${isAyahBookmarked(activePopover.ayah.number) ? 'fill-current' : ''}`} />
                  <span className="truncate">{isAyahBookmarked(activePopover.ayah.number) ? 'সংরক্ষিত' : 'বুকমার্ক'}</span>
                </button>

                <button
                  onClick={() => handleCopyAyah(activePopover.ayah)}
                  className="py-1.5 px-2 rounded-xl bg-black/5 dark:bg-white/10 text-slate-700 dark:text-emerald-200 border border-black/10 dark:border-white/15 flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
                >
                  {copiedAyah === activePopover.ayah.number ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-500" />
                      <span>কপি</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>কপি</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </>
        );
      })()}

      {/* ========================================================================= */}
      {/* 5. SURAH / JUZ QUICK SWITCHER MODAL                                       */}
      {/* ========================================================================= */}
      {showSurahPicker && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-white dark:bg-[#071f1a] text-slate-900 dark:text-emerald-50 rounded-3xl border border-slate-200 dark:border-emerald-800 shadow-2xl p-5 space-y-4 max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-emerald-800/40 shrink-0">
              <h3 className="text-base font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <span>📖</span>
                <span>{selectedLanguage === 'bn' ? 'সূরা ও জুয নির্বাচন করুন (১১৪টি সূরা)' : 'Select Surah or Juz (114 Surahs)'}</span>
              </h3>
              <button
                onClick={() => setShowSurahPicker(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative shrink-0">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={surahPickerSearch}
                onChange={(e) => setSurahPickerSearch(e.target.value)}
                placeholder={selectedLanguage === 'bn' ? 'সূরার নাম বা নম্বর দিয়ে খুঁজুন (যেমন: 55 বা রহমান)...' : 'Search by name or number (e.g. 55 or Rahman)...'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-emerald-800 bg-slate-50 dark:bg-black/30 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Surah List Grid */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
              {filteredSurahs.map((surah) => {
                const isSelected = surah.number === surahDetail.number;
                const surahPage = MADANI_SURAH_PAGES[surah.number] || 1;

                return (
                  <button
                    key={surah.number}
                    onClick={() => {
                      onSelectSurah(surah.number);
                      setShowSurahPicker(false);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className={`w-full p-2.5 rounded-2xl border text-left flex items-center justify-between gap-3 transition cursor-pointer active:scale-98 ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md font-bold'
                        : 'bg-slate-50 dark:bg-emerald-950/30 hover:bg-emerald-500/15 border-slate-200 dark:border-emerald-800/40 text-slate-800 dark:text-emerald-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-emerald-500/15 text-emerald-800 dark:text-emerald-300'
                        }`}
                      >
                        {surah.number}
                      </span>
                      <div>
                        <div className="font-extrabold text-sm">{getLocalizedSurahName(surah.number, selectedLanguage)}</div>
                        <div className={`text-[11px] ${isSelected ? 'text-emerald-100' : 'text-slate-500 dark:text-emerald-400'}`}>
                          {getLocalizedSurahMeaning(surah.number, selectedLanguage)} • {selectedLanguage === 'bn' ? `${surah.numberOfAyahs} আয়াত • পারা ${surah.startJuz}` : `${surah.numberOfAyahs} Ayahs • Juz ${surah.startJuz}`}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-arabic font-bold text-base">{surah.name}</div>
                      <div className={`text-[10px] font-mono ${isSelected ? 'text-emerald-200' : 'text-slate-400 dark:text-emerald-500'}`}>
                        পৃষ্ঠা {surahPage}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
