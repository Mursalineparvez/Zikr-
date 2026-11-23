import React, { useState, useEffect, useMemo } from 'react';
import { AUTHENTIC_DUAS, HISNUL_CHAPTERS, DuaItem } from '../utils/duasData';
import { copyToClipboard } from '../utils/clipboard';
import { ZikrItem, ThemeMode, ZikrLanguage } from '../types';
import { DUA_TRANSLATIONS, DUA_CATEGORIES, DUA_UI } from '../utils/appTranslations';
import {
  Search,
  Plus,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  Volume2,
  CheckCircle2,
  Moon,
  Sun,
  Shield,
  Heart,
  Droplet,
  Home,
  Compass,
  Utensils,
  Users,
  CloudRain,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Plane,
  Building2,
  Stethoscope,
  ListOrdered,
  LayoutGrid,
  ChevronRight,
  BookMarked,
  Coins,
} from 'lucide-react';
import { soundHaptics, playArabicVoice, VoiceGender } from '../utils/audioHaptics';
import { ContentShareModal, ShareDownloadButtons } from './ContentShareModal';
import { ShareableContent } from '../utils/shareDownload';
import { HIGHLIGHT_COLOR_STYLES } from '../utils/savedItems';
import { HighlightMarkerButton } from './HighlightMarkerButton';
import { HighlightableText, useSavedHighlightsStore } from './HighlightableText';
import { stepBackOr, useBackLayer } from '../utils/backNavigation';

interface DuaViewProps {
  onAddDuaToCounters: (dua: DuaItem) => void;
  activeCounters: ZikrItem[];
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  voiceGender?: VoiceGender;
}

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
function formatNum(value: string | number, lang: ZikrLanguage): string {
  const str = String(value);
  if (lang !== 'bn') return str;
  return str.replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

const DuaCardHighlightWrapper: React.FC<{
  duaHlKey: string;
  duaSourceLabel: string;
  isDay: boolean;
  isCompleted: boolean;
  children: React.ReactNode;
}> = ({ duaHlKey, duaSourceLabel, isDay, isCompleted, children }) => {
  const { byItemKey } = useSavedHighlightsStore();
  const hl = byItemKey[duaHlKey];
  const hlStyle = hl ? HIGHLIGHT_COLOR_STYLES[hl.color] : null;
  return (
    <div
      data-highlight-section="dua"
      data-highlight-source={duaSourceLabel}
      className={`p-5 sm:p-7 rounded-3xl border transition-all duration-200 shadow-md ${
        hlStyle
          ? isDay
            ? hlStyle.cardDayClass
            : hlStyle.cardNightClass
          : isDay
          ? isCompleted
            ? 'bg-white border-amber-400/80 shadow-amber-500/10'
            : 'bg-white border-teal-100 shadow-teal-900/5'
          : isCompleted
          ? 'bg-[#0f2e35] border-amber-500/70 shadow-amber-950/30'
          : 'bg-[#0f2e35] border-[#184d57] shadow-black/40'
      }`}
    >
      {children}
    </div>
  );
};

export const DuaView: React.FC<DuaViewProps> = ({
  onAddDuaToCounters,
  activeCounters,
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
  voiceGender = 'male',
}) => {
  const isDay = themeMode === 'day';
  const [browseMode, setBrowseMode] = useState<'topics' | 'chapters'>('topics');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inlineCounts, setInlineCounts] = useState<{ [key: string]: number }>({});
  const [visibleLimit, setVisibleLimit] = useState<number>(40);
  const [shareState, setShareState] = useState<{
    content: ShareableContent;
    focus: 'share' | 'download';
  } | null>(null);

  // Register Dua sub-views & modals for step-by-step reverse back navigation
  useBackLayer(
    activeTopicId !== null,
    () => {
      setActiveTopicId(null);
      setSelectedCategory('all');
    },
    'dua-topic'
  );
  useBackLayer(selectedChapter !== null, () => setSelectedChapter(null), 'dua-chapter');
  useBackLayer(Boolean(shareState), () => setShareState(null), 'dua-share');

  // Reset pagination & scroll smoothly when filters change
  useEffect(() => {
    setVisibleLimit(40);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [selectedCategory, activeTopicId, selectedChapter, browseMode]);

  // Complete GTAF-style topic categories covering ALL 132 Hisnul Muslim chapters
  const gtafCategories = useMemo(
    () => [
      {
        id: 'all',
        icon: BookOpen,
        arSub: 'جميع الأدعية',
        dayIcon: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
        nightIcon: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
        dayHover: 'hover:border-emerald-300 hover:bg-emerald-50/40',
        nightHover: 'hover:border-emerald-500/50 hover:bg-[#123840]',
      },
      {
        id: 'quranic',
        icon: BookMarked,
        arSub: 'الأدعية القرآنية',
        dayIcon: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
        nightIcon: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
        dayHover: 'hover:border-emerald-300 hover:bg-emerald-50/40',
        nightHover: 'hover:border-emerald-500/50 hover:bg-[#123840]',
      },
      {
        id: 'rizq',
        icon: Coins,
        arSub: 'الرزق والبركة',
        dayIcon: 'bg-amber-50 text-amber-700 border-amber-200/80',
        nightIcon: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
        dayHover: 'hover:border-amber-300 hover:bg-amber-50/40',
        nightHover: 'hover:border-amber-500/50 hover:bg-[#123840]',
      },
      {
        id: 'morning_evening',
        icon: Sun,
        arSub: 'أذكار الصباح والمساء',
        dayIcon: 'bg-amber-50 text-amber-700 border-amber-200/80',
        nightIcon: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
        dayHover: 'hover:border-amber-300 hover:bg-amber-50/40',
        nightHover: 'hover:border-amber-500/50 hover:bg-[#123840]',
      },
      {
        id: 'salat',
        icon: Compass,
        arSub: 'أدعية الصلاة',
        dayIcon: 'bg-teal-50 text-teal-700 border-teal-200/80',
        nightIcon: 'bg-teal-500/15 text-teal-300 border-teal-500/25',
        dayHover: 'hover:border-teal-300 hover:bg-teal-50/40',
        nightHover: 'hover:border-teal-500/50 hover:bg-[#123840]',
      },
      {
        id: 'sleep_wake',
        icon: Moon,
        arSub: 'النوم والاستيقاظ',
        dayIcon: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
        nightIcon: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
        dayHover: 'hover:border-indigo-300 hover:bg-indigo-50/40',
        nightHover: 'hover:border-indigo-500/50 hover:bg-[#123840]',
      },
      {
        id: 'purification',
        icon: Droplet,
        arSub: 'الطهارة والوضوء',
        dayIcon: 'bg-sky-50 text-sky-700 border-sky-200/80',
        nightIcon: 'bg-sky-500/15 text-sky-300 border-sky-500/25',
        dayHover: 'hover:border-sky-300 hover:bg-sky-50/40',
        nightHover: 'hover:border-sky-500/50 hover:bg-[#123840]',
      },
      {
        id: 'mosque',
        icon: Building2,
        arSub: 'المسجد والأذان',
        dayIcon: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
        nightIcon: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
        dayHover: 'hover:border-emerald-300 hover:bg-emerald-50/40',
        nightHover: 'hover:border-emerald-500/50 hover:bg-[#123840]',
      },
      {
        id: 'protection',
        icon: Shield,
        arSub: 'الحفظ والرقية',
        dayIcon: 'bg-teal-50 text-teal-700 border-teal-200/80',
        nightIcon: 'bg-teal-500/15 text-teal-300 border-teal-500/25',
        dayHover: 'hover:border-teal-300 hover:bg-teal-50/40',
        nightHover: 'hover:border-teal-500/50 hover:bg-[#123840]',
      },
      {
        id: 'hardship',
        icon: AlertCircle,
        arSub: 'تفريج الكرب',
        dayIcon: 'bg-orange-50 text-orange-700 border-orange-200/80',
        nightIcon: 'bg-orange-500/15 text-orange-300 border-orange-500/25',
        dayHover: 'hover:border-orange-300 hover:bg-orange-50/40',
        nightHover: 'hover:border-orange-500/50 hover:bg-[#123840]',
      },
      {
        id: 'forgiveness',
        icon: Sparkles,
        arSub: 'الاستغفار والتوبة',
        dayIcon: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
        nightIcon: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
        dayHover: 'hover:border-emerald-300 hover:bg-emerald-50/40',
        nightHover: 'hover:border-emerald-500/50 hover:bg-[#123840]',
      },
      {
        id: 'food_drink',
        icon: Utensils,
        arSub: 'الطعام والشراب',
        dayIcon: 'bg-lime-50 text-lime-700 border-lime-200/80',
        nightIcon: 'bg-lime-500/15 text-lime-300 border-lime-500/25',
        dayHover: 'hover:border-lime-300 hover:bg-lime-50/40',
        nightHover: 'hover:border-lime-500/50 hover:bg-[#123840]',
      },
      {
        id: 'ramadan',
        icon: Moon,
        arSub: 'رمضان والصيام',
        dayIcon: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
        nightIcon: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/25',
        dayHover: 'hover:border-indigo-300 hover:bg-indigo-50/40',
        nightHover: 'hover:border-indigo-500/50 hover:bg-[#123840]',
      },
      {
        id: 'sickness_funeral',
        icon: Stethoscope,
        arSub: 'المرض والجنازة',
        dayIcon: 'bg-rose-50 text-rose-700 border-rose-200/80',
        nightIcon: 'bg-rose-500/15 text-rose-300 border-rose-500/25',
        dayHover: 'hover:border-rose-300 hover:bg-rose-50/40',
        nightHover: 'hover:border-rose-500/50 hover:bg-[#123840]',
      },
      {
        id: 'weather_nature',
        icon: CloudRain,
        arSub: 'الطقس والطبيعة',
        dayIcon: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
        nightIcon: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/25',
        dayHover: 'hover:border-cyan-300 hover:bg-cyan-50/40',
        nightHover: 'hover:border-cyan-500/50 hover:bg-[#123840]',
      },
      {
        id: 'family',
        icon: Heart,
        arSub: 'الأسرة والزواج',
        dayIcon: 'bg-rose-50 text-rose-700 border-rose-200/80',
        nightIcon: 'bg-rose-500/15 text-rose-300 border-rose-500/25',
        dayHover: 'hover:border-rose-300 hover:bg-rose-50/40',
        nightHover: 'hover:border-rose-500/50 hover:bg-[#123840]',
      },
      {
        id: 'social_etiquette',
        icon: Users,
        arSub: 'الآداب الاجتماعية',
        dayIcon: 'bg-teal-50 text-teal-700 border-teal-200/80',
        nightIcon: 'bg-teal-500/15 text-teal-300 border-teal-500/25',
        dayHover: 'hover:border-teal-300 hover:bg-teal-50/40',
        nightHover: 'hover:border-teal-500/50 hover:bg-[#123840]',
      },
      {
        id: 'travel',
        icon: Plane,
        arSub: 'السفر والركوب',
        dayIcon: 'bg-sky-50 text-sky-700 border-sky-200/80',
        nightIcon: 'bg-sky-500/15 text-sky-300 border-sky-500/25',
        dayHover: 'hover:border-sky-300 hover:bg-sky-50/40',
        nightHover: 'hover:border-sky-500/50 hover:bg-[#123840]',
      },
      {
        id: 'hajj',
        icon: Compass,
        arSub: 'الحج والعمرة',
        dayIcon: 'bg-amber-50 text-amber-700 border-amber-200/80',
        nightIcon: 'bg-amber-500/15 text-amber-300 border-amber-500/25',
        dayHover: 'hover:border-amber-300 hover:bg-amber-50/40',
        nightHover: 'hover:border-amber-500/50 hover:bg-[#123840]',
      },
      {
        id: 'daily_living',
        icon: Home,
        arSub: 'الحياة اليومية',
        dayIcon: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
        nightIcon: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/25',
        dayHover: 'hover:border-emerald-300 hover:bg-emerald-50/40',
        nightHover: 'hover:border-emerald-500/50 hover:bg-[#123840]',
      },
    ],
    []
  );

  // Category counts memoized (including secondaryCategories)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: AUTHENTIC_DUAS.length };
    for (const dua of AUTHENTIC_DUAS) {
      counts[dua.category] = (counts[dua.category] || 0) + 1;
      if (dua.secondaryCategories) {
        for (const sec of dua.secondaryCategories) {
          if (sec !== dua.category) {
            counts[sec] = (counts[sec] || 0) + 1;
          }
        }
      }
    }
    return counts;
  }, []);

  // Chapter item counts memoized
  const chapterCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    for (const dua of AUTHENTIC_DUAS) {
      if (dua.chapterNumber !== undefined) {
        counts[dua.chapterNumber] = (counts[dua.chapterNumber] || 0) + 1;
      }
    }
    return counts;
  }, []);

  // Lookup chapter meta
  const chapterMetaMap = useMemo(() => {
    const map: Record<number, (typeof HISNUL_CHAPTERS)[number]> = {};
    for (const ch of HISNUL_CHAPTERS) {
      map[ch.chapterNumber] = ch;
    }
    return map;
  }, []);

  const maxChapterNumber = useMemo(
    () => Math.max(...HISNUL_CHAPTERS.map((c) => c.chapterNumber)),
    []
  );

  // Filter chapters for the 132-chapter index view
  const filteredChapters = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return HISNUL_CHAPTERS;
    return HISNUL_CHAPTERS.filter(
      (ch) =>
        ch.titleBn.toLowerCase().includes(q) ||
        ch.titleEn.toLowerCase().includes(q) ||
        String(ch.chapterNumber) === q ||
        formatNum(ch.chapterNumber, 'bn') === q ||
        ch.duaRange.includes(q)
    );
  }, [searchQuery]);

  // Filter duas for active list
  const filteredDuas = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return AUTHENTIC_DUAS.filter((dua) => {
      if (browseMode === 'chapters' && selectedChapter !== null) {
        if (dua.chapterNumber !== selectedChapter) return false;
      } else if (browseMode === 'topics' && selectedCategory !== 'all') {
        if (
          dua.category !== selectedCategory &&
          !dua.secondaryCategories?.includes(selectedCategory as any)
        ) {
          return false;
        }
      }

      if (!q) return true;

      const t = DUA_TRANSLATIONS[dua.id]?.[selectedLanguage] || dua.translations?.[selectedLanguage];
      const bnT = dua.translations?.bn;
      const enT = dua.translations?.en;
      const chMeta = dua.chapterNumber !== undefined ? chapterMetaMap[dua.chapterNumber] : undefined;

      const curTitle = (t?.title || '').toLowerCase();
      const curTrans = (t?.translation || '').toLowerCase();
      const curVirtue = (t?.virtue || dua.translations?.[selectedLanguage]?.virtue || '').toLowerCase();
      const curBenefits = (dua.translations?.[selectedLanguage]?.benefits || dua.benefits || []).join(' ').toLowerCase();
      const bnTitle = (bnT?.title || '').toLowerCase();
      const bnTrans = (bnT?.translation || '').toLowerCase();
      const bnVirtue = (bnT?.virtue || '').toLowerCase();
      const bnBenefits = (bnT?.benefits || []).join(' ').toLowerCase();
      const enTitle = (enT?.title || dua.title).toLowerCase();
      const enTrans = (enT?.translation || dua.translation).toLowerCase();
      const hisnulNum = (dua.hisnulNumber || '').toLowerCase();
      const hisnulNumBn = formatNum(dua.hisnulNumber || '', 'bn').toLowerCase();

      return (
        curTitle.includes(q) ||
        curTrans.includes(q) ||
        curVirtue.includes(q) ||
        curBenefits.includes(q) ||
        bnTitle.includes(q) ||
        bnTrans.includes(q) ||
        bnVirtue.includes(q) ||
        bnBenefits.includes(q) ||
        enTitle.includes(q) ||
        enTrans.includes(q) ||
        dua.transliteration.toLowerCase().includes(q) ||
        dua.reference.toLowerCase().includes(q) ||
        (dua.referenceBn || '').toLowerCase().includes(q) ||
        (dua.gradeBn || '').toLowerCase().includes(q) ||
        dua.arabic.includes(searchQuery.trim()) ||
        hisnulNum === q ||
        hisnulNumBn === q ||
        `#${hisnulNum}` === q ||
        (chMeta && (chMeta.titleBn.toLowerCase().includes(q) || chMeta.titleEn.toLowerCase().includes(q)))
      );
    });
  }, [browseMode, selectedChapter, selectedCategory, searchQuery, selectedLanguage, chapterMetaMap]);

  const displayedDuas = useMemo(() => {
    if (searchQuery.trim() || selectedChapter !== null || selectedCategory !== 'all') {
      return filteredDuas;
    }
    return filteredDuas.slice(0, visibleLimit);
  }, [filteredDuas, searchQuery, selectedChapter, selectedCategory, visibleLimit]);

  const handleInlineIncrement = (duaId: string, targetCount: number = 1) => {
    if (soundEnabled) soundHaptics.playTap();
    soundHaptics.vibrate(35);

    setInlineCounts((prev) => {
      const current = prev[duaId] || 0;
      const next = current + 1;
      if (next === targetCount && soundEnabled) {
        soundHaptics.playMilestone();
      }
      return { ...prev, [duaId]: next };
    });
  };

  const getDuaLocalizedMeta = (dua: DuaItem) => {
    const isBn = selectedLanguage === 'bn';
    const tr = DUA_TRANSLATIONS[dua.id]?.[selectedLanguage] || dua.translations?.[selectedLanguage];
    const langTrans = dua.translations?.[selectedLanguage];
    const currentTitle = tr?.title || langTrans?.title || dua.translations?.en?.title || dua.title;
    const currentTiming = tr?.timing || langTrans?.timing || dua.translations?.en?.timing || dua.timing;
    const currentTranslation =
      tr?.translation || langTrans?.translation || dua.translations?.en?.translation || dua.translation;
    const currentVirtue =
      tr?.virtue || langTrans?.virtue || dua.translations?.en?.virtue || dua.virtue;
    const currentBenefits =
      (isBn ? dua.translations?.bn?.benefits : dua.translations?.en?.benefits) || dua.benefits || [];
    const currentReference =
      (isBn ? dua.referenceBn || dua.translations?.bn?.reference : dua.translations?.en?.reference) ||
      dua.reference;
    const currentGrade =
      (isBn ? dua.gradeBn || dua.translations?.bn?.grade : dua.grade || dua.translations?.en?.grade) || '';

    return {
      currentTitle,
      currentTiming,
      currentTranslation,
      currentVirtue,
      currentBenefits,
      currentReference,
      currentGrade,
    };
  };

  const handleCopyDua = (dua: DuaItem) => {
    const isBn = selectedLanguage === 'bn';
    const {
      currentTitle,
      currentTranslation,
      currentVirtue,
      currentBenefits,
      currentReference,
      currentGrade,
    } = getDuaLocalizedMeta(dua);
    const benefitsBlock = currentBenefits.length
      ? `\n${currentBenefits.map((b) => `• ${b}`).join('\n')}`
      : '';
    const virtueSection = currentVirtue
      ? `\n\n${isBn ? 'লাভ, ফায়দা ও ফযীলত' : 'Virtues & Benefits'}:\n${currentVirtue}${benefitsBlock}`
      : '';
    const refSection = `\n\n${isBn ? 'প্রামাণিক সূত্র' : 'Reference'}: ${currentReference}${
      currentGrade ? ` (${isBn ? 'মান' : 'Grade'}: ${currentGrade})` : ''
    }`;
    const text = `${currentTitle}\n\n${dua.arabic}\n\n${dua.transliteration}\n\n"${currentTranslation}"${virtueSection}${refSection}`;
    void copyToClipboard(text);
    setCopiedId(dua.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const currentCatTitle =
    browseMode === 'chapters' && selectedChapter !== null
      ? selectedLanguage === 'bn'
        ? chapterMetaMap[selectedChapter]?.titleBn
        : chapterMetaMap[selectedChapter]?.titleEn
      : DUA_CATEGORIES[selectedCategory]?.[selectedLanguage] ||
        (selectedLanguage === 'bn' ? 'সকল দোয়া' : 'All Supplications');

  const isChapterSelected = browseMode === 'chapters' && selectedChapter !== null;
  const isTopicSelected = browseMode === 'topics' && activeTopicId !== null;
  const activeTopicIndex = isTopicSelected
    ? gtafCategories.findIndex((c) => c.id === activeTopicId)
    : -1;
  const shouldShowDuaList = isTopicSelected || isChapterSelected || searchQuery.trim().length > 0;

  const openPageShare = (focus: 'share' | 'download') => {
    const isBn = selectedLanguage === 'bn';
    const itemsToExport = filteredDuas;
    const fullDoc = itemsToExport
      .map((dua, i) => {
        const {
          currentTitle,
          currentTranslation,
          currentVirtue,
          currentBenefits,
          currentReference,
          currentGrade,
        } = getDuaLocalizedMeta(dua);
        const benefitsStr = currentBenefits.length
          ? `${currentBenefits.map((b) => `  • ${b}`).join('\n')}\n`
          : '';
        return (
          `${dua.hisnulNumber ? `#${dua.hisnulNumber}` : i + 1}. ${currentTitle}\n` +
          `${dua.arabic}\n` +
          `${dua.transliteration}\n` +
          `${currentTranslation}\n` +
          (currentVirtue ? `${isBn ? 'লাভ ও ফযীলত' : 'Virtue & Benefits'}: ${currentVirtue}\n${benefitsStr}` : '') +
          `${isBn ? 'সূত্র' : 'Reference'}: ${currentReference}${currentGrade ? ` [${currentGrade}]` : ''}`
        );
      })
      .join('\n\n------------------------------\n\n');

    setShareState({
      focus,
      content: {
        badge: isBn ? 'হিসনুল মুসলিম • দোয়া ও যিকির' : 'Hisnul Muslim • Duas & Adhkar',
        title: currentCatTitle || DUA_UI.bannerTitle[selectedLanguage],
        subtitle: DUA_UI.bannerSub[selectedLanguage],
        body: isBn
          ? `এই সংগ্রহে মোট ${formatNum(itemsToExport.length, 'bn')}টি মাসনুন দোয়া (লাভ, ফায়দা ও প্রামাণিক রেফারেন্সসহ) রয়েছে। নিচে নির্বাচিত কিছু দোয়া দেওয়া হলো:\n\n${itemsToExport
              .slice(0, 3)
              .map((d) => `• ${d.translations?.bn?.title || d.title}`)
              .join('\n')}`
          : `This collection includes ${itemsToExport.length} authentic supplications with benefits and verified references.\n\n${itemsToExport
              .slice(0, 3)
              .map((d) => `• ${d.translations?.en?.title || d.title}`)
              .join('\n')}`,
        fullDocumentText: fullDoc,
        fileNamePrefix: 'Hisnul-Muslim-Duas',
      },
    });
  };

  const openDuaShare = (dua: DuaItem, focus: 'share' | 'download') => {
    const isBn = selectedLanguage === 'bn';
    const {
      currentTitle,
      currentTiming,
      currentTranslation,
      currentVirtue,
      currentBenefits,
      currentReference,
      currentGrade,
    } = getDuaLocalizedMeta(dua);
    const chMeta = dua.chapterNumber !== undefined ? chapterMetaMap[dua.chapterNumber] : undefined;
    const chTitle = chMeta ? (isBn ? chMeta.titleBn : chMeta.titleEn) : undefined;
    const benefitsText = currentBenefits.length
      ? `\n${currentBenefits.map((b) => `• ${b}`).join('\n')}`
      : '';

    setShareState({
      focus,
      content: {
        badge: dua.hisnulNumber
          ? `${isBn ? 'হিসনুল মুসলিম #' : 'Hisnul Muslim #'}${formatNum(dua.hisnulNumber, selectedLanguage)}`
          : isBn
            ? 'মাসনুন দোয়া'
            : 'Authentic Dua',
        title: currentTitle,
        subtitle: chTitle || currentTiming,
        arabic: dua.arabic,
        transliteration: dua.transliteration,
        body: `"${currentTranslation}"${
          currentVirtue
            ? `\n\n${isBn ? 'লাভ, ফায়দা ও ফযীলত:' : 'Virtues & Benefits:'}\n${currentVirtue}${benefitsText}`
            : ''
        }`,
        reference: `${currentReference}${currentGrade ? ` • ${isBn ? 'মান' : 'Grade'}: ${currentGrade}` : ''}`,
        fileNamePrefix: `Dua-${dua.hisnulNumber || dua.id}`,
      },
    });
  };

  return (
    <div data-highlight-section="dua" className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* Simple Flat Header */}
      <div
        className={`pb-4 border-b space-y-3 ${
          isDay ? 'border-[#dcebe8]' : 'border-[#163640]'
        }`}
      >
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <BookOpen className={`w-5 h-5 shrink-0 ${isDay ? 'text-[#006747]' : 'text-emerald-400'}`} />
            <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isDay ? 'text-[#006747]' : 'text-white'}`}>
              {DUA_UI.bannerTitle[selectedLanguage]}
            </h2>
            <span className={`text-xs font-semibold font-arabic ${isDay ? 'text-emerald-700/80' : 'text-emerald-300/80'}`}>
              حِصْنُ الْمُسْلِمِ
            </span>
          </div>
          <p className={`text-xs sm:text-sm max-w-2xl leading-relaxed ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
            {DUA_UI.bannerSub[selectedLanguage]}
          </p>
          <p className={`text-[11px] font-semibold ${isDay ? 'text-emerald-700' : 'text-emerald-400'}`}>
            {selectedLanguage === 'bn'
              ? `হিসনুল মুসলিম • ${formatNum(maxChapterNumber, 'bn')} অধ্যায় • ${formatNum(AUTHENTIC_DUAS.length, 'bn')}টি দোয়া ও যিকির`
              : `Hisnul Muslim • ${maxChapterNumber} Chapters • ${AUTHENTIC_DUAS.length} Duas & Adhkar`}
          </p>
        </div>

        {/* Step-by-Step Mode Switcher: Topics vs 132 Chapters */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setBrowseMode('topics');
                setSelectedChapter(null);
                setActiveTopicId(null);
                setSelectedCategory('all');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                browseMode === 'topics'
                  ? 'bg-[#006747] text-white border-[#006747]'
                  : isDay
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-[#006747]'
                  : 'bg-[#0e1c26] border-[#1a3342] text-emerald-200 hover:bg-[#132634]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>{DUA_UI.topicsTab[selectedLanguage]}</span>
            </button>

            <button
              onClick={() => {
                setBrowseMode('chapters');
                setActiveTopicId(null);
                setSelectedCategory('all');
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                browseMode === 'chapters'
                  ? 'bg-[#006747] text-white border-[#006747]'
                  : isDay
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-[#006747]'
                  : 'bg-[#0e1c26] border-[#1a3342] text-emerald-200 hover:bg-[#132634]'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>{DUA_UI.chaptersTab[selectedLanguage]}</span>
            </button>
          </div>

          <ShareDownloadButtons
            variant="card"
            selectedLanguage={selectedLanguage}
            themeMode={themeMode}
            onShare={() => openPageShare('share')}
            onDownload={() => openPageShare('download')}
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${isDay ? 'text-teal-700' : 'text-teal-400'}`} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={DUA_UI.searchPlaceholder?.[selectedLanguage] || 'Search duas...'}
          className={`w-full rounded-2xl pl-11 pr-16 py-3.5 text-sm font-medium focus:outline-none transition shadow-sm border ${
            isDay
              ? 'bg-white border-teal-200 text-[#0f3630] placeholder-teal-600/70 focus:border-[#006747]'
              : 'bg-[#0f2e35] border-[#184c56] text-white placeholder-slate-400 focus:border-emerald-500'
          }`}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-emerald-500 hover:text-emerald-400 cursor-pointer"
          >
            {selectedLanguage === 'bn' ? 'মুছুন' : 'Clear'}
          </button>
        )}
      </div>

      {/* MODE 1: TOPIC CATEGORIES GRID (shown only when no specific topic is opened & not searching) */}
      {browseMode === 'topics' && activeTopicId === null && searchQuery.trim().length === 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-2 px-1">
            <div>
              <h3 className={`text-base sm:text-lg font-bold tracking-tight flex items-center gap-2 ${isDay ? 'text-[#0f3630]' : 'text-emerald-50'}`}>
                <LayoutGrid className={`w-4 h-4 ${isDay ? 'text-emerald-700' : 'text-emerald-400'}`} />
                <span>{DUA_UI.topicsTab[selectedLanguage]}</span>
              </h3>
              <p className={`text-xs mt-0.5 ${isDay ? 'text-teal-700/80' : 'text-teal-200/70'}`}>
                {selectedLanguage === 'bn'
                  ? 'যেকোনো বিষয়ভিত্তিক কার্ডে ক্লিক করলে সংশ্লিষ্ট মাসনুন দোয়া ও যিকির দেখাবে'
                  : selectedLanguage === 'ar'
                  ? 'انقر على أي موضوع لعرض الأدعية والأذكار الخاصة به'
                  : 'Select any topic card below to read its authentic duas and adhkar'}
              </p>
            </div>
            <div className={`text-xs font-mono tabular-nums font-semibold ${isDay ? 'text-teal-800/80' : 'text-teal-300/80'}`}>
              {formatNum(gtafCategories.length, selectedLanguage)}{' '}
              {selectedLanguage === 'bn' ? 'টি বিষয়' : selectedLanguage === 'ar' ? 'موضوعاً' : 'Topics'}
              <span aria-hidden="true" className="mx-1.5 opacity-50">·</span>
              {formatNum(AUTHENTIC_DUAS.length, selectedLanguage)}{' '}
              {selectedLanguage === 'bn' ? 'টি দোয়া' : selectedLanguage === 'ar' ? 'دعاء' : 'Duas'}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {gtafCategories.map((cat) => {
              const IconComp = cat.icon;
              const categoryName = DUA_CATEGORIES[cat.id]?.[selectedLanguage] || cat.id;
              const count = categoryCounts[cat.id] || 0;
              const duaWord =
                selectedLanguage === 'bn'
                  ? 'টি দোয়া'
                  : selectedLanguage === 'ar'
                  ? 'أدعية'
                  : count === 1
                  ? 'Dua'
                  : 'Duas';

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setActiveTopicId(cat.id);
                    setSelectedCategory(cat.id);
                  }}
                  className={`relative overflow-hidden rounded-2xl p-4 sm:p-5 border text-left transition-all duration-200 cursor-pointer group flex items-center justify-between gap-3.5 active:scale-[0.985] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                    isDay
                      ? `bg-white border-teal-100/90 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-[#0f3630] ${cat.dayHover}`
                      : `bg-[#0e2d34] border-[#184d57] shadow-sm hover:shadow-lg hover:-translate-y-0.5 text-slate-100 ${cat.nightHover}`
                  }`}
                >
                  {/* Subtle Islamic 8-point star geometric ornament on hover */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 64 64"
                    className={`pointer-events-none absolute -right-3 -bottom-3 w-20 h-20 transition-opacity duration-300 ${
                      isDay ? 'text-emerald-700 opacity-[0.035] group-hover:opacity-[0.08]' : 'text-emerald-300 opacity-[0.04] group-hover:opacity-[0.1]'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="14" y="14" width="36" height="36" rx="2" />
                    <rect x="14" y="14" width="36" height="36" rx="2" transform="rotate(45 32 32)" />
                    <circle cx="32" cy="32" r="7" />
                  </svg>

                  <div className="relative z-10 flex items-center gap-3.5 min-w-0 flex-1">
                    <div
                      className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${
                        isDay ? cat.dayIcon : cat.nightIcon
                      }`}
                    >
                      <IconComp className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-sm sm:text-[15px] leading-snug tracking-tight truncate">
                        {categoryName}
                      </h4>
                      <div
                        className={`mt-1 flex items-center gap-1.5 text-xs font-medium truncate ${
                          isDay ? 'text-teal-700/80' : 'text-teal-200/75'
                        }`}
                      >
                        <span className="font-mono tabular-nums font-semibold">
                          {formatNum(count, selectedLanguage)} {duaWord}
                        </span>
                        {selectedLanguage !== 'ar' && (
                          <>
                            <span aria-hidden="true" className="opacity-45">·</span>
                            <span className="font-arabic text-[12px] opacity-80 truncate">{cat.arSub}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <ChevronRight
                    className={`relative z-10 w-4 h-4 shrink-0 transition-all duration-200 ${
                      isDay
                        ? 'text-teal-600/50 group-hover:text-emerald-700 group-hover:translate-x-0.5'
                        : 'text-teal-300/45 group-hover:text-emerald-300 group-hover:translate-x-0.5'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SELECTED TOPIC STEP-BY-STEP HEADER & PREV/NEXT TOPIC CONTROLS */}
      {isTopicSelected && activeTopicId !== null && searchQuery.trim().length === 0 && (
        <div
          className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
            isDay ? 'bg-emerald-50/80 border-emerald-200 text-[#0f3630]' : 'bg-[#10363f] border-[#1b5563] text-white'
          }`}
        >
          <button
            type="button"
            onClick={() => {
              if (soundEnabled) soundHaptics.playTap();
              stepBackOr(() => {
                setActiveTopicId(null);
                setSelectedCategory('all');
              });
            }}
            className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-[#006747] text-white hover:bg-[#00553a] cursor-pointer transition active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>
              {selectedLanguage === 'bn'
                ? 'সব বিষয় (ক্যাটাগরি)'
                : selectedLanguage === 'ar'
                ? 'جميع المواضيع'
                : 'All Topics'}
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={activeTopicIndex <= 0}
              onClick={() => {
                if (activeTopicIndex > 0) {
                  const prevCat = gtafCategories[activeTopicIndex - 1];
                  if (soundEnabled) soundHaptics.playTap();
                  setActiveTopicId(prevCat.id);
                  setSelectedCategory(prevCat.id);
                }
              }}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                isDay ? 'bg-white border border-teal-200 text-teal-800 hover:bg-teal-50' : 'bg-[#0b272e] border border-[#194b57] text-teal-200 hover:bg-[#123942]'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>
                {selectedLanguage === 'bn' ? 'আগের বিষয়' : selectedLanguage === 'ar' ? 'السابق' : 'Prev Topic'}
              </span>
            </button>
            <button
              type="button"
              disabled={activeTopicIndex < 0 || activeTopicIndex >= gtafCategories.length - 1}
              onClick={() => {
                if (activeTopicIndex >= 0 && activeTopicIndex < gtafCategories.length - 1) {
                  const nextCat = gtafCategories[activeTopicIndex + 1];
                  if (soundEnabled) soundHaptics.playTap();
                  setActiveTopicId(nextCat.id);
                  setSelectedCategory(nextCat.id);
                }
              }}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                isDay ? 'bg-white border border-teal-200 text-teal-800 hover:bg-teal-50' : 'bg-[#0b272e] border border-[#194b57] text-teal-200 hover:bg-[#123942]'
              }`}
            >
              <span>
                {selectedLanguage === 'bn' ? 'পরের বিষয়' : selectedLanguage === 'ar' ? 'التالي' : 'Next Topic'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* MODE 2: 132 CHAPTERS DIRECTORY (when in chapters mode & no single chapter selected) */}
      {browseMode === 'chapters' && selectedChapter === null && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className={`text-sm sm:text-base font-bold flex items-center gap-2 ${isDay ? 'text-[#0f3630]' : 'text-emerald-100'}`}>
              <ListOrdered className="w-4 h-4 text-emerald-500" />
              <span>
                {DUA_UI.chaptersTab[selectedLanguage]} ({formatNum(filteredChapters.length, selectedLanguage)})
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {filteredChapters.map((ch) => {
              const title = selectedLanguage === 'bn' ? ch.titleBn : ch.titleEn;
              const duaCount = chapterCounts[ch.chapterNumber] || 0;
              return (
                <button
                  key={ch.chapterNumber}
                  onClick={() => setSelectedChapter(ch.chapterNumber)}
                  className={`p-3.5 rounded-2xl border transition-all text-left flex items-center justify-between gap-3 cursor-pointer hover:shadow-md active:scale-[0.99] ${
                    isDay
                      ? 'bg-white hover:bg-teal-50/80 border-teal-100 text-[#0f3630]'
                      : 'bg-[#0e2c33] hover:bg-[#143c46] border-[#184d57] text-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0 ${
                        isDay ? 'bg-emerald-100 text-emerald-800' : 'bg-[#154852] text-emerald-300'
                      }`}
                    >
                      {ch.chapterNumber === 0 ? (selectedLanguage === 'bn' ? 'ভূ' : '0') : formatNum(ch.chapterNumber, selectedLanguage)}
                    </span>
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm truncate">{title}</h4>
                      <span className={`text-[11px] font-medium block mt-0.5 ${isDay ? 'text-teal-700' : 'text-teal-300/80'}`}>
                        #{formatNum(ch.duaRange, selectedLanguage)} • {formatNum(duaCount, selectedLanguage)}{' '}
                        {selectedLanguage === 'bn' ? 'টি দোয়া' : duaCount === 1 ? 'Dua' : 'Duas'}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 shrink-0 ${isDay ? 'text-teal-600' : 'text-teal-400'}`} />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SELECTED CHAPTER STEP-BY-STEP HEADER & PREV/NEXT CONTROLS */}
      {isChapterSelected && selectedChapter !== null && (
        <div
          className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
            isDay ? 'bg-emerald-50 border-emerald-200 text-[#0f3630]' : 'bg-[#10363f] border-[#1b5563] text-white'
          }`}
        >
          <button
            onClick={() => stepBackOr(() => setSelectedChapter(null))}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{DUA_UI.allChapters[selectedLanguage]}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              disabled={selectedChapter <= 0}
              onClick={() => setSelectedChapter((c) => (c !== null && c > 0 ? c - 1 : 0))}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                isDay ? 'bg-white border border-teal-200 text-teal-800' : 'bg-[#0b272e] border border-[#194b57] text-teal-200'
              }`}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{DUA_UI.prevChapter[selectedLanguage]}</span>
            </button>
            <button
              disabled={selectedChapter >= maxChapterNumber}
              onClick={() =>
                setSelectedChapter((c) => (c !== null && c < maxChapterNumber ? c + 1 : maxChapterNumber))
              }
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                isDay ? 'bg-white border border-teal-200 text-teal-800' : 'bg-[#0b272e] border border-[#194b57] text-teal-200'
              }`}
            >
              <span>{DUA_UI.nextChapter[selectedLanguage]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* DUAS LIST (Shown only after clicking a Topic card, clicking a Chapter, or searching) */}
      {shouldShowDuaList && (
        <div className="space-y-4 pt-1">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2.5">
              <BookOpen className={`w-4 h-4 shrink-0 ${isDay ? 'text-emerald-700' : 'text-emerald-400'}`} />
              <h3 className={`text-base sm:text-lg font-bold tracking-tight ${isDay ? 'text-[#0f3630]' : 'text-white'}`}>
                {searchQuery.trim().length > 0 && !isTopicSelected && !isChapterSelected
                  ? selectedLanguage === 'bn'
                    ? 'অনুসন্ধানের ফলাফল'
                    : selectedLanguage === 'ar'
                    ? 'نتائج البحث'
                    : 'Search Results'
                  : currentCatTitle}
                <span className={`text-xs font-mono tabular-nums font-semibold ml-2 ${isDay ? 'text-emerald-700' : 'text-emerald-400'}`}>
                  ({formatNum(filteredDuas.length, selectedLanguage)})
                </span>
              </h3>
            </div>
          </div>

          {filteredDuas.length === 0 ? (
            <div
              className={`p-12 text-center rounded-3xl border ${
                isDay ? 'bg-white border-teal-100 text-teal-800' : 'bg-[#0f2e35] border-[#184c56] text-slate-300'
              }`}
            >
              <BookOpen className="w-12 h-12 mx-auto text-emerald-500 mb-3 opacity-60" />
              <p className="text-sm font-bold">{selectedLanguage === 'bn' ? 'কোনো দোয়া পাওয়া যায়নি' : 'No supplications found'}</p>
              <p className="text-xs mt-1 text-slate-400">
                {selectedLanguage === 'bn'
                  ? 'অন্য কীওয়ার্ড, অধ্যায় বা নম্বর (#১-#২৬৭, Q-১ বা M-১) দিয়ে আবার চেষ্টা করুন'
                  : 'Try searching with another keyword, chapter, or Dua number (#1-#267, Q-1, M-1)'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayedDuas.map((dua, index) => {
                const isAdded = activeCounters.some(
                  (c) => c.id === dua.id || c.name.toLowerCase() === dua.title.toLowerCase()
                );
                const currentCount = inlineCounts[dua.id] || 0;
                const target = dua.suggestedCount || 1;
                const isCompleted = currentCount >= target;

                const {
                  currentTitle,
                  currentTiming,
                  currentTranslation,
                  currentVirtue,
                  currentBenefits,
                  currentReference,
                  currentGrade,
                } = getDuaLocalizedMeta(dua);

                const chMeta = dua.chapterNumber !== undefined ? chapterMetaMap[dua.chapterNumber] : undefined;
                const chapterLabelText = chMeta
                  ? selectedLanguage === 'bn'
                    ? chMeta.titleBn
                    : chMeta.titleEn
                  : '';
                const duaHlKey = `dua:${dua.id}`;
                const duaSourceLabel = `${currentTitle}${currentReference ? ` • ${currentReference}` : ''}`;

                return (
                  <DuaCardHighlightWrapper
                    key={dua.id}
                    duaHlKey={duaHlKey}
                    duaSourceLabel={duaSourceLabel}
                    isDay={isDay}
                    isCompleted={isCompleted}
                  >
                    {/* Top Metadata & Action Bar */}
                    <div
                      className={`flex flex-wrap items-start justify-between gap-3 pb-3 mb-3 border-b ${
                        isDay ? 'border-teal-50' : 'border-[#174852]'
                      }`}
                    >
                      <div className="flex items-start gap-3 flex-1 min-w-[220px]">
                        <span
                          className={`min-w-8 h-8 px-2 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0 ${
                            isDay ? 'bg-emerald-100 text-emerald-800' : 'bg-[#154852] text-emerald-300'
                          }`}
                        >
                          {dua.hisnulNumber
                            ? `#${formatNum(dua.hisnulNumber, selectedLanguage)}`
                            : formatNum(index + 1, selectedLanguage)}
                        </span>
                        <div>
                          {chapterLabelText && (
                            <span
                              className={`inline-block text-[11px] font-bold px-2 py-0.5 rounded-md mb-1 ${
                                isDay ? 'bg-teal-50 text-teal-800 border border-teal-200/70' : 'bg-[#133d47] text-teal-200 border border-[#1e5c6b]'
                              }`}
                            >
                              {DUA_UI.chapterLabel[selectedLanguage]}{' '}
                              {dua.chapterNumber === 0
                                ? selectedLanguage === 'bn'
                                  ? 'ভূমিকা'
                                  : 'Intro'
                                : formatNum(dua.chapterNumber || 0, selectedLanguage)}
                              : {chapterLabelText.replace(/^\d+\.\s*|^[০-৯]+\.\s*/, '')}
                            </span>
                          )}
                          <h4 className={`text-sm sm:text-base font-bold ${isDay ? 'text-[#0f3630]' : 'text-white'}`}>
                            {currentTitle}
                          </h4>
                          {currentTiming && (
                            <span
                              className={`text-xs font-semibold mt-0.5 block ${
                                isDay ? 'text-emerald-600' : 'text-emerald-400'
                              }`}
                            >
                              {currentTiming}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {/* Audio Voice Button */}
                        <button
                          onClick={() => {
                            if (soundEnabled) soundHaptics.playTap();
                            playArabicVoice(dua.arabic, voiceGender);
                          }}
                          className={`p-2 rounded-xl transition active:scale-90 cursor-pointer flex items-center justify-center border shadow-sm ${
                            isDay
                              ? 'bg-[#006747] hover:bg-[#00553a] text-white border-[#006747]'
                              : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-400'
                          }`}
                          title={selectedLanguage === 'bn' ? 'অডিও শুনুন' : 'Play Audio Recitation'}
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>

                        {/* Copy Button */}
                        <button
                          onClick={() => handleCopyDua(dua)}
                          className={`p-2 rounded-xl transition active:scale-90 cursor-pointer border shadow-sm ${
                            isDay
                              ? 'bg-teal-50 hover:bg-teal-100 text-teal-800 border-teal-200'
                              : 'bg-[#113a44] hover:bg-[#184d57] text-teal-200 border-[#1c5563]'
                          }`}
                          title={selectedLanguage === 'bn' ? 'কপি করুন' : 'Copy Dua'}
                        >
                          {copiedId === dua.id ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>

                        {/* Highlight / Marker Button */}
                        <HighlightMarkerButton
                          itemKey={duaHlKey}
                          text={`${dua.arabic}\n\n${currentTranslation}`}
                          source={duaSourceLabel}
                          section="dua"
                          selectedLanguage={selectedLanguage}
                          themeMode={themeMode}
                          soundEnabled={soundEnabled}
                          variant="icon"
                        />

                        {/* Share & Download Buttons */}
                        <ShareDownloadButtons
                          variant="compact"
                          selectedLanguage={selectedLanguage}
                          themeMode={themeMode}
                          onShare={() => openDuaShare(dua, 'share')}
                          onDownload={() => openDuaShare(dua, 'download')}
                        />

                        {/* Add to Counter */}
                        <button
                          onClick={() => onAddDuaToCounters(dua)}
                          disabled={isAdded}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition active:scale-95 cursor-pointer shadow-sm ${
                            isAdded
                              ? isDay
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-[#113a44] text-emerald-400 border border-[#1c5563]'
                              : 'bg-[#006747] hover:bg-[#00553a] text-white shadow-md'
                          }`}
                        >
                          {isAdded ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>{DUA_UI.inCounter[selectedLanguage]}</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>{DUA_UI.addToCounter[selectedLanguage]}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Arabic Text */}
                    <div
                      dir="rtl"
                      className={`text-right font-arabic font-bold text-xl sm:text-2xl leading-[2.2] my-4 select-text ${
                        isDay ? 'text-[#063327]' : 'text-emerald-100'
                      }`}
                    >
                      <HighlightableText
                        text={dua.arabic}
                        section="dua"
                        themeMode={themeMode}
                        selectedLanguage={selectedLanguage}
                        soundEnabled={soundEnabled}
                      />
                    </div>

                    {/* Transliteration */}
                    <div
                      className={`text-xs sm:text-sm font-semibold mb-2 select-text ${
                        isDay ? 'text-emerald-700' : 'text-emerald-300'
                      }`}
                    >
                      <HighlightableText
                        text={dua.transliteration}
                        section="dua"
                        themeMode={themeMode}
                        selectedLanguage={selectedLanguage}
                        soundEnabled={soundEnabled}
                      />
                    </div>

                    {/* Translation */}
                    <p
                      className={`text-xs sm:text-sm leading-relaxed font-sans mb-4 font-medium select-text ${
                        isDay ? 'text-slate-800' : 'text-teal-100'
                      }`}
                    >
                      "<HighlightableText
                        text={currentTranslation}
                        section="dua"
                        themeMode={themeMode}
                        selectedLanguage={selectedLanguage}
                        soundEnabled={soundEnabled}
                      />"
                    </p>

                    {/* Virtues & Key Benefits Panel */}
                    {(currentVirtue || currentBenefits.length > 0) && (
                      <div
                        className={`mb-4 p-4 rounded-2xl border select-text ${
                          isDay
                            ? 'bg-emerald-50/60 border-emerald-200/80 text-[#0f3630]'
                            : 'bg-[#103640]/90 border-[#1b5663] text-teal-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles
                            className={`w-4 h-4 shrink-0 ${
                              isDay ? 'text-amber-600' : 'text-amber-400'
                            }`}
                          />
                          <h5
                            className={`text-xs sm:text-[13px] font-extrabold tracking-tight ${
                              isDay ? 'text-emerald-900' : 'text-emerald-300'
                            }`}
                          >
                            {selectedLanguage === 'bn'
                              ? 'লাভ, ফায়দা ও ফযীলত'
                              : selectedLanguage === 'ar'
                              ? 'الفضل والفوائد'
                              : 'Virtues & Benefits'}
                          </h5>
                        </div>

                        {currentVirtue && (
                          <p
                            className={`text-xs sm:text-[13px] leading-relaxed font-medium ${
                              isDay ? 'text-slate-800' : 'text-teal-50/95'
                            }`}
                          >
                            <HighlightableText
                              text={currentVirtue}
                              section="dua"
                              themeMode={themeMode}
                              selectedLanguage={selectedLanguage}
                              soundEnabled={soundEnabled}
                            />
                          </p>
                        )}

                        {currentBenefits.length > 0 && (
                          <ul
                            className={`mt-2.5 pt-2.5 border-t space-y-1.5 ${
                              isDay ? 'border-emerald-200/70' : 'border-[#1b5360]'
                            }`}
                          >
                            {currentBenefits.map((benefit, bIdx) => (
                              <li
                                key={bIdx}
                                className={`flex items-start gap-2 text-xs leading-relaxed ${
                                  isDay ? 'text-teal-900' : 'text-teal-200/95'
                                }`}
                              >
                                <Check
                                  className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                    isDay ? 'text-emerald-700' : 'text-emerald-400'
                                  }`}
                                />
                                <span>
                                  <HighlightableText
                                    text={benefit}
                                    section="dua"
                                    themeMode={themeMode}
                                    selectedLanguage={selectedLanguage}
                                    soundEnabled={soundEnabled}
                                  />
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}

                    {/* Authentic Reference & Inline Bead Counter */}
                    <div
                      className={`pt-3.5 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                        isDay ? 'border-teal-100 text-teal-800' : 'border-[#174852] text-teal-300'
                      }`}
                    >
                      <div className="flex items-start gap-2 min-w-0 flex-1 select-text">
                        <BookOpen
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isDay ? 'text-emerald-700' : 'text-emerald-400'
                          }`}
                        />
                        <div className="min-w-0 leading-relaxed">
                          <span className={`font-bold ${isDay ? 'text-[#0f3630]' : 'text-emerald-200'}`}>
                            {selectedLanguage === 'bn'
                              ? 'সূত্র: '
                              : selectedLanguage === 'ar'
                              ? 'المصدر: '
                              : 'Reference: '}
                          </span>
                          <span className={`font-semibold ${isDay ? 'text-emerald-800' : 'text-emerald-300'}`}>
                            <HighlightableText
                              text={currentReference}
                              section="dua"
                              themeMode={themeMode}
                              selectedLanguage={selectedLanguage}
                              soundEnabled={soundEnabled}
                            />
                          </span>
                          {currentGrade && (
                            <span
                              className={`block sm:inline sm:ml-2 mt-0.5 sm:mt-0 text-[11px] font-semibold ${
                                isDay ? 'text-amber-700' : 'text-amber-300/90'
                              }`}
                            >
                              <span aria-hidden="true" className="hidden sm:inline mr-2 opacity-50">
                                ·
                              </span>
                              {selectedLanguage === 'bn'
                                ? `মান: ${currentGrade}`
                                : selectedLanguage === 'ar'
                                ? `الدرجة: ${currentGrade}`
                                : `Grade: ${currentGrade}`}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <span className="text-[11px] font-mono tabular-nums">
                          {DUA_UI.recited[selectedLanguage]}:{' '}
                          <strong className={isDay ? 'text-[#0f3630]' : 'text-white'}>
                            {formatNum(currentCount, selectedLanguage)}
                          </strong>{' '}
                          / {formatNum(target, selectedLanguage)}x
                        </span>
                        <button
                          onClick={() => handleInlineIncrement(dua.id, target)}
                          className="px-3 py-1.5 rounded-xl bg-[#006747] hover:bg-[#00553a] text-white font-bold text-xs active:scale-95 transition cursor-pointer flex items-center gap-1 shadow-sm"
                        >
                          <span>{DUA_UI.oneBead[selectedLanguage]}</span>
                        </button>
                      </div>
                    </div>
                  </DuaCardHighlightWrapper>
                );
              })}

              {/* Progressive Load Controls when viewing full unfiltered list */}
              {displayedDuas.length < filteredDuas.length && (
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <button
                    onClick={() => setVisibleLimit((prev) => prev + 50)}
                    className="px-5 py-3 rounded-2xl bg-[#006747] hover:bg-[#00553a] text-white text-xs sm:text-sm font-bold shadow-md cursor-pointer transition active:scale-95"
                  >
                    {DUA_UI.showMore[selectedLanguage]} (+{formatNum(Math.min(50, filteredDuas.length - displayedDuas.length), selectedLanguage)})
                  </button>
                  <button
                    onClick={() => setVisibleLimit(filteredDuas.length)}
                    className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold border cursor-pointer transition active:scale-95 ${
                      isDay
                        ? 'bg-white border-teal-200 text-teal-900 hover:bg-teal-50'
                        : 'bg-[#0f2e35] border-[#184c56] text-teal-200 hover:bg-[#143c46]'
                    }`}
                  >
                    {DUA_UI.showAll[selectedLanguage]} ({formatNum(filteredDuas.length, selectedLanguage)})
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      <ContentShareModal
        isOpen={!!shareState}
        onClose={() => setShareState(null)}
        content={shareState?.content || null}
        selectedLanguage={selectedLanguage}
        soundEnabled={soundEnabled}
        initialFocus={shareState?.focus}
      />
    </div>
  );
};
