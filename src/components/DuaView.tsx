import React, { useState, useEffect, useMemo } from 'react';
import { AUTHENTIC_DUAS, HISNUL_CHAPTERS, DuaItem } from '../utils/duasData';
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
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { soundHaptics, playArabicVoice, VoiceGender } from '../utils/audioHaptics';

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
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [showAllTopics, setShowAllTopics] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inlineCounts, setInlineCounts] = useState<{ [key: string]: number }>({});
  const [visibleLimit, setVisibleLimit] = useState<number>(40);

  // Reset pagination & scroll smoothly when filters change
  useEffect(() => {
    setVisibleLimit(40);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [selectedCategory, selectedChapter, browseMode]);

  // Complete GTAF-style topic categories covering ALL 132 Hisnul Muslim chapters
  const gtafCategories = useMemo(
    () => [
      { id: 'all', icon: BookOpen },
      { id: 'morning_evening', icon: Sun },
      { id: 'salat', icon: Compass },
      { id: 'sleep_wake', icon: Moon },
      { id: 'purification', icon: Droplet },
      { id: 'mosque', icon: Building2 },
      { id: 'protection', icon: Shield },
      { id: 'hardship', icon: AlertCircle },
      { id: 'forgiveness', icon: Sparkles },
      { id: 'food_drink', icon: Utensils },
      { id: 'ramadan', icon: Moon },
      { id: 'sickness_funeral', icon: Stethoscope },
      { id: 'weather_nature', icon: CloudRain },
      { id: 'family', icon: Heart },
      { id: 'social_etiquette', icon: Users },
      { id: 'travel', icon: Plane },
      { id: 'hajj', icon: Compass },
      { id: 'daily_living', icon: Home },
    ],
    []
  );

  // Category counts memoized
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: AUTHENTIC_DUAS.length };
    for (const dua of AUTHENTIC_DUAS) {
      counts[dua.category] = (counts[dua.category] || 0) + 1;
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
        if (dua.category !== selectedCategory) return false;
      }

      if (!q) return true;

      const t = DUA_TRANSLATIONS[dua.id]?.[selectedLanguage] || dua.translations?.[selectedLanguage];
      const bnT = dua.translations?.bn;
      const enT = dua.translations?.en;
      const chMeta = dua.chapterNumber !== undefined ? chapterMetaMap[dua.chapterNumber] : undefined;

      const curTitle = (t?.title || '').toLowerCase();
      const curTrans = (t?.translation || '').toLowerCase();
      const curVirtue = (t?.virtue || '').toLowerCase();
      const bnTitle = (bnT?.title || '').toLowerCase();
      const bnTrans = (bnT?.translation || '').toLowerCase();
      const enTitle = (enT?.title || dua.title).toLowerCase();
      const enTrans = (enT?.translation || dua.translation).toLowerCase();
      const hisnulNum = (dua.hisnulNumber || '').toLowerCase();
      const hisnulNumBn = formatNum(dua.hisnulNumber || '', 'bn').toLowerCase();

      return (
        curTitle.includes(q) ||
        curTrans.includes(q) ||
        curVirtue.includes(q) ||
        bnTitle.includes(q) ||
        bnTrans.includes(q) ||
        enTitle.includes(q) ||
        enTrans.includes(q) ||
        dua.transliteration.toLowerCase().includes(q) ||
        dua.reference.toLowerCase().includes(q) ||
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

  const handleCopyDua = (dua: DuaItem) => {
    const t = DUA_TRANSLATIONS[dua.id]?.[selectedLanguage] || dua.translations?.[selectedLanguage];
    const curTitle = t?.title || dua.translations?.en?.title || dua.title;
    const curTrans = t?.translation || dua.translations?.en?.translation || dua.translation;
    const text = `${curTitle}\n\n${dua.arabic}\n\n${dua.transliteration}\n\n"${curTrans}"\n\nReference: ${dua.reference}`;
    navigator.clipboard.writeText(text);
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

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* GTAF-Inspired Hisnul Muslim Portal Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#005a3e] via-[#0d4d4d] to-[#13656c] border border-teal-400/30 p-6 sm:p-8 shadow-2xl text-white">
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
          <BookOpen className="w-64 h-64 text-white" />
        </div>
        <div className="relative z-10 flex flex-col gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-teal-100 text-xs font-semibold mb-3 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>
                حِصْنُ الْمُسْلِمِ •{' '}
                {selectedLanguage === 'bn'
                  ? `হিসনুল মুসলিম (সম্পূর্ণ ১৩২ অধ্যায় • ${formatNum(AUTHENTIC_DUAS.length, 'bn')}টি দোয়া ও যিকির)`
                  : `Hisnul Muslim (All 132 Chapters • ${AUTHENTIC_DUAS.length} Duas & Adhkar)`}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
              {DUA_UI.bannerTitle[selectedLanguage]}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 mt-2 max-w-2xl leading-relaxed">
              {DUA_UI.bannerSub[selectedLanguage]}
            </p>
          </div>

          {/* Step-by-Step Mode Switcher: Topics vs 132 Chapters */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => {
                setBrowseMode('topics');
                setSelectedChapter(null);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                browseMode === 'topics'
                  ? 'bg-white text-[#005a3e] shadow-lg'
                  : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>{DUA_UI.topicsTab[selectedLanguage]}</span>
            </button>

            <button
              onClick={() => {
                setBrowseMode('chapters');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                browseMode === 'chapters'
                  ? 'bg-white text-[#005a3e] shadow-lg'
                  : 'bg-white/15 hover:bg-white/25 text-white border border-white/20'
              }`}
            >
              <ListOrdered className="w-4 h-4" />
              <span>{DUA_UI.chaptersTab[selectedLanguage]}</span>
            </button>
          </div>
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

      {/* MODE 1: TOPIC CATEGORIES GRID (dua.gtaf.org style) */}
      {browseMode === 'topics' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className={`text-sm sm:text-base font-bold flex items-center gap-2 ${isDay ? 'text-[#0f3630]' : 'text-emerald-100'}`}>
              <LayoutGrid className="w-4 h-4 text-emerald-500" />
              <span>{DUA_UI.topicsTab[selectedLanguage]}</span>
            </h3>
            <div className="flex items-center gap-2">
              {selectedCategory !== 'all' && (
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="text-xs font-bold text-emerald-500 hover:text-emerald-400 flex items-center gap-1 cursor-pointer bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>{DUA_CATEGORIES.all[selectedLanguage]}</span>
                </button>
              )}
              <button
                onClick={() => setShowAllTopics((prev) => !prev)}
                className={`text-xs font-bold px-3 py-1 rounded-full border cursor-pointer flex items-center gap-1 ${
                  isDay
                    ? 'bg-white border-teal-200 text-teal-800 hover:bg-teal-50'
                    : 'bg-[#10333b] border-[#1b5461] text-teal-200 hover:bg-[#15424d]'
                }`}
              >
                <span>
                  {showAllTopics
                    ? selectedLanguage === 'bn'
                      ? 'সংক্ষিপ্ত করুন'
                      : 'Collapse'
                    : selectedLanguage === 'bn'
                    ? 'সব বিষয় দেখুন'
                    : 'Expand Topics'}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showAllTopics ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {showAllTopics && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {gtafCategories.map((cat) => {
                const IconComp = cat.icon;
                const isSelected = selectedCategory === cat.id;
                const categoryName = DUA_CATEGORIES[cat.id]?.[selectedLanguage] || cat.id;
                const count = categoryCounts[cat.id] || 0;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`p-3.5 rounded-2xl border transition-all duration-200 text-left flex flex-col justify-between gap-2.5 cursor-pointer active:scale-95 group ${
                      isSelected
                        ? 'ring-2 ring-emerald-500 shadow-lg ' +
                          (isDay ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-emerald-700 text-white border-emerald-500')
                        : isDay
                        ? 'bg-white hover:bg-teal-50/80 border-teal-100 shadow-sm text-[#0f3630]'
                        : 'bg-[#0e2c33] hover:bg-[#143c46] border-[#184d57] text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <div
                        className={`p-2 rounded-xl ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : isDay
                            ? 'bg-teal-50 text-emerald-600 group-hover:bg-emerald-100'
                            : 'bg-[#153f4a] text-emerald-400 group-hover:bg-[#1c5462]'
                        }`}
                      >
                        <IconComp className="w-4 h-4" />
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : isDay
                            ? 'bg-teal-100/70 text-emerald-800'
                            : 'bg-[#154652] text-teal-300'
                        }`}
                      >
                        {formatNum(count, selectedLanguage)}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs tracking-tight line-clamp-2 leading-snug">{categoryName}</h4>
                  </button>
                );
              })}
            </div>
          )}
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
            onClick={() => setSelectedChapter(null)}
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
              disabled={selectedChapter >= 132}
              onClick={() => setSelectedChapter((c) => (c !== null && c < 132 ? c + 1 : 132))}
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

      {/* DUAS LIST (Shown in Topic mode, or when a specific Chapter is selected, or when searching) */}
      {(browseMode === 'topics' || isChapterSelected || searchQuery.trim().length > 0) && (
        <div className="space-y-4 pt-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className={`text-base font-bold ${isDay ? 'text-[#0f3630]' : 'text-white'}`}>
                {currentCatTitle}
                <span className="text-xs font-semibold ml-2 text-emerald-500">
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
                  ? 'অন্য কীওয়ার্ড, অধ্যায় বা নম্বর (#১-#২৬৭) দিয়ে আবার চেষ্টা করুন'
                  : 'Try searching with another keyword, chapter, or Hisnul number (#1-#267)'}
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

                const t = DUA_TRANSLATIONS[dua.id]?.[selectedLanguage] || dua.translations?.[selectedLanguage];
                const currentTitle = t?.title || dua.translations?.en?.title || dua.title;
                const currentTiming = t?.timing || dua.translations?.en?.timing || dua.timing;
                const currentTranslation = t?.translation || dua.translations?.en?.translation || dua.translation;
                const currentVirtue = t?.virtue || dua.translations?.en?.virtue || dua.virtue;

                const chMeta = dua.chapterNumber !== undefined ? chapterMetaMap[dua.chapterNumber] : undefined;
                const chapterLabelText = chMeta
                  ? selectedLanguage === 'bn'
                    ? chMeta.titleBn
                    : chMeta.titleEn
                  : '';

                return (
                  <div
                    key={dua.id}
                    className={`p-5 sm:p-7 rounded-3xl border transition-all duration-200 shadow-md ${
                      isDay
                        ? isCompleted
                          ? 'bg-white border-amber-400/80 shadow-amber-500/10'
                          : 'bg-white border-teal-100 shadow-teal-900/5'
                        : isCompleted
                        ? 'bg-[#0f2e35] border-amber-500/70 shadow-amber-950/30'
                        : 'bg-[#0f2e35] border-[#184d57] shadow-black/40'
                    }`}
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
                      className={`text-right font-arabic font-bold text-xl sm:text-2xl leading-[2.2] my-4 select-none ${
                        isDay ? 'text-[#063327]' : 'text-emerald-100'
                      }`}
                    >
                      {dua.arabic}
                    </div>

                    {/* Transliteration */}
                    <div
                      className={`text-xs sm:text-sm font-semibold mb-2 ${
                        isDay ? 'text-emerald-700' : 'text-emerald-300'
                      }`}
                    >
                      {dua.transliteration}
                    </div>

                    {/* Translation */}
                    <p
                      className={`text-xs sm:text-sm leading-relaxed font-sans mb-4 font-medium ${
                        isDay ? 'text-slate-800' : 'text-teal-100'
                      }`}
                    >
                      "{currentTranslation}"
                    </p>

                    {/* Reference & Inline Bead Counter */}
                    <div
                      className={`pt-3 border-t flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                        isDay ? 'border-teal-50 text-teal-800' : 'border-[#174852] text-teal-300'
                      }`}
                    >
                      <span className={`font-semibold ${isDay ? 'text-emerald-700' : 'text-emerald-400'}`}>
                        📌 {dua.reference}
                      </span>

                      <div className="flex items-center gap-2">
                        <span className="text-[11px]">
                          {DUA_UI.recited[selectedLanguage]}:{' '}
                          <strong className={isDay ? 'text-[#0f3630]' : 'text-white'}>
                            {formatNum(currentCount, selectedLanguage)}
                          </strong>{' '}
                          / {formatNum(target, selectedLanguage)}x
                        </span>
                        <button
                          onClick={() => handleInlineIncrement(dua.id, target)}
                          className="px-3 py-1 rounded-xl bg-[#006747] hover:bg-[#00553a] text-white font-bold text-xs active:scale-95 transition cursor-pointer flex items-center gap-1 shadow-sm"
                        >
                          <span>{DUA_UI.oneBead[selectedLanguage]}</span>
                        </button>
                      </div>
                    </div>

                    {currentVirtue && (
                      <div
                        className={`mt-3 p-3 rounded-2xl border text-xs flex items-start gap-2.5 ${
                          isDay
                            ? 'bg-teal-50/70 border-teal-200 text-teal-900'
                            : 'bg-[#113943] border-[#185360] text-teal-200'
                        }`}
                      >
                        <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{currentVirtue}</span>
                      </div>
                    )}
                  </div>
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
    </div>
  );
};
