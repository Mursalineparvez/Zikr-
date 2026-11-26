import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Compass,
  Copy,
  Heart,
  Layers,
  Moon,
  RotateCcw,
  Search,
  Shuffle,
  Sparkles,
  Sun,
  Sunrise,
  Sunset,
  Users,
  X,
} from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  DAILY_RHYTHM_STAGES,
  DAILY_SUNNAH_CATEGORIES,
  DailyRhythmStage,
  DailySunnahCategory,
  DailySunnahItem,
  SUNNAH_DOMAINS,
  SunnahDomain,
  TOTAL_DAILY_SUNNAH_COUNT,
} from '../data/dailySunnahData';
import { soundHaptics } from '../utils/audioHaptics';
import { copyToClipboard } from '../utils/clipboard';
import { HighlightableText } from './HighlightableText';
import { stepBackOr, useBackLayer } from '../utils/backNavigation';

interface DailySunnahViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  onBackToHub?: () => void;
}

type SunnahViewTab = 'chapters' | 'rhythm' | 'saved';

const CHECKED_STORAGE_KEY = 'zikrmate_daily_sunnah_checked_v1';
const FAVORITES_STORAGE_KEY = 'zikrmate_daily_sunnah_favs_v1';

function getTodayDateStr(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function toBnDigits(val: number | string): string {
  const digits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(val).replace(/\d/g, (d) => digits[Number(d)] ?? d);
}

function getCurrentRhythmStage(): DailyRhythmStage {
  const h = new Date().getHours();
  if (h >= 4 && h < 9) return 'dawn';
  if (h >= 9 && h < 17) return 'daytime';
  if (h >= 17 && h < 20) return 'evening';
  return 'night';
}

function getDomainIcon(domain: DailySunnahCategory['domain']) {
  switch (domain) {
    case 'daily':
      return <Sun className="w-4 h-4" />;
    case 'purification':
      return <Sparkles className="w-4 h-4" />;
    case 'prayer':
      return <Compass className="w-4 h-4" />;
    case 'ramadan':
      return <Moon className="w-4 h-4" />;
    case 'social':
      return <Users className="w-4 h-4" />;
  }
}

function getStageIcon(stage: DailyRhythmStage) {
  switch (stage) {
    case 'dawn':
      return <Sunrise className="w-5 h-5" />;
    case 'prayer_mosque':
      return <Compass className="w-5 h-5" />;
    case 'daytime':
      return <Sun className="w-5 h-5" />;
    case 'evening':
      return <Sunset className="w-5 h-5" />;
    case 'night':
      return <Moon className="w-5 h-5" />;
    case 'social_life':
      return <Users className="w-5 h-5" />;
  }
}

export const DailySunnahView: React.FC<DailySunnahViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
  onBackToHub,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';
  const todayKey = getTodayDateStr();

  const [activeTab, setActiveTab] = useState<SunnahViewTab>('chapters');
  const [selectedDomain, setSelectedDomain] = useState<SunnahDomain>('all');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [activeStageFilter, setActiveStageFilter] = useState<DailyRhythmStage>(() => getCurrentRhythmStage());

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedItemId, setCopiedItemId] = useState<string | null>(null);

  // Today's practiced Sunnah IDs (auto-resets cleanly each calendar day)
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(CHECKED_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.date === todayKey && Array.isArray(parsed?.ids)) {
          return parsed.ids;
        }
      }
    } catch {}
    return [];
  });

  // Persistent favorite Sunnah IDs
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Spotlight index (defaults cleanly to a time-relevant category Sunnah)
  const spotlightPool = useMemo(() => {
    const stageNow = getCurrentRhythmStage();
    const stageCats = DAILY_SUNNAH_CATEGORIES.filter((c) => c.stage === stageNow);
    const sourceCats = stageCats.length > 0 ? stageCats : DAILY_SUNNAH_CATEGORIES;
    const flat: Array<{ cat: DailySunnahCategory; item: DailySunnahItem }> = [];
    for (const cat of sourceCats) {
      for (const item of cat.items) {
        flat.push({ cat, item });
      }
    }
    return flat;
  }, []);

  const [spotlightIdx, setSpotlightIdx] = useState<number>(() => {
    const daySeed = Math.floor(Date.now() / (1000 * 60 * 60));
    return daySeed % Math.max(1, spotlightPool.length);
  });

  const currentSpotlight = spotlightPool[spotlightIdx % Math.max(1, spotlightPool.length)];

  useBackLayer(selectedCategoryId !== null, () => setSelectedCategoryId(null), 'daily-sunnah-cat');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [selectedCategoryId, activeTab]);

  useEffect(() => {
    try {
      localStorage.setItem(
        CHECKED_STORAGE_KEY,
        JSON.stringify({ date: todayKey, ids: checkedIds })
      );
    } catch {}
  }, [checkedIds, todayKey]);

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {}
  }, [favoriteIds]);

  const checkedSet = useMemo(() => new Set(checkedIds), [checkedIds]);
  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const toggleChecked = (itemId: string) => {
    const willCheck = !checkedSet.has(itemId);
    if (soundEnabled) {
      if (willCheck) soundHaptics.playMilestone();
      else soundHaptics.playTap();
    }
    setCheckedIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const toggleFavorite = (itemId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const willFav = !favoriteSet.has(itemId);
    if (soundEnabled) {
      if (willFav) soundHaptics.playMilestone();
      else soundHaptics.playTap();
    }
    setFavoriteIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleCopySunnah = (cat: DailySunnahCategory, item: DailySunnahItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const title = isBn ? cat.titleBn : cat.titleEn;
    const refPart = item.refBn ? `\nসূত্র: ${item.refBn}` : '';
    const text = `【${title}】\n${item.textBn}${refPart}\n\n— দৈনন্দিন সুন্নাহ`;
    void copyToClipboard(text);
    if (soundEnabled) soundHaptics.playTap();
    setCopiedItemId(item.id);
    setTimeout(() => setCopiedItemId((cur) => (cur === item.id ? null : cur)), 2000);
  };

  const markCategoryAllChecked = (cat: DailySunnahCategory) => {
    const catIds = cat.items.map((i) => i.id);
    const allDone = catIds.every((id) => checkedSet.has(id));
    if (soundEnabled) {
      if (!allDone) soundHaptics.playMilestone();
      else soundHaptics.playTap();
    }
    if (allDone) {
      const rm = new Set(catIds);
      setCheckedIds((prev) => prev.filter((id) => !rm.has(id)));
    } else {
      setCheckedIds((prev) => Array.from(new Set([...prev, ...catIds])));
    }
  };

  const selectedCategoryIdx = useMemo(
    () => DAILY_SUNNAH_CATEGORIES.findIndex((c) => c.id === selectedCategoryId),
    [selectedCategoryId]
  );
  const selectedCategory =
    selectedCategoryIdx !== -1 ? DAILY_SUNNAH_CATEGORIES[selectedCategoryIdx] : null;
  const prevCategory =
    selectedCategoryIdx > 0 ? DAILY_SUNNAH_CATEGORIES[selectedCategoryIdx - 1] : null;
  const nextCategory =
    selectedCategoryIdx !== -1 && selectedCategoryIdx < DAILY_SUNNAH_CATEGORIES.length - 1
      ? DAILY_SUNNAH_CATEGORIES[selectedCategoryIdx + 1]
      : null;

  const filteredCategories = useMemo(() => {
    if (selectedDomain === 'all') return DAILY_SUNNAH_CATEGORIES;
    return DAILY_SUNNAH_CATEGORIES.filter((c) => c.domain === selectedDomain);
  }, [selectedDomain]);

  const namajSubCategories = useMemo(
    () => DAILY_SUNNAH_CATEGORIES.filter((c) => c.parentGroupBn === 'নামাজ'),
    []
  );

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    const hits: Array<{ cat: DailySunnahCategory; item: DailySunnahItem }> = [];
    for (const cat of DAILY_SUNNAH_CATEGORIES) {
      const catMatch =
        cat.titleBn.toLowerCase().includes(q) ||
        cat.titleEn.toLowerCase().includes(q) ||
        cat.arabicTitle.includes(searchQuery.trim());
      for (const item of cat.items) {
        if (
          catMatch ||
          item.textBn.toLowerCase().includes(q) ||
          item.refBn.toLowerCase().includes(q)
        ) {
          hits.push({ cat, item });
        }
      }
    }
    return hits.slice(0, 80);
  }, [searchQuery]);

  const favoriteEntries = useMemo(() => {
    const list: Array<{ cat: DailySunnahCategory; item: DailySunnahItem }> = [];
    for (const cat of DAILY_SUNNAH_CATEGORIES) {
      for (const item of cat.items) {
        if (favoriteSet.has(item.id)) list.push({ cat, item });
      }
    }
    return list;
  }, [favoriteSet]);

  const practicedEntries = useMemo(() => {
    const list: Array<{ cat: DailySunnahCategory; item: DailySunnahItem }> = [];
    for (const cat of DAILY_SUNNAH_CATEGORIES) {
      for (const item of cat.items) {
        if (checkedSet.has(item.id)) list.push({ cat, item });
      }
    }
    return list;
  }, [checkedSet]);

  const stageCategories = useMemo(
    () => DAILY_SUNNAH_CATEGORIES.filter((c) => c.stage === activeStageFilter),
    [activeStageFilter]
  );

  // Reusable Kitab-Styled Sunnah Entry Row
  const renderSunnahFolioRow = (
    cat: DailySunnahCategory,
    item: DailySunnahItem,
    displayNumber: number,
    showCatBreadcrumb = false
  ) => {
    const isChecked = checkedSet.has(item.id);
    const isFav = favoriteSet.has(item.id);
    const isCopied = copiedItemId === item.id;
    const itemSource = `${cat.titleBn} — ${item.textBn.slice(0, 45)}`;

    return (
      <div
        key={item.id}
        data-highlight-section="daily_sunnah"
        data-highlight-source={itemSource}
        className={`px-4 sm:px-7 py-4 sm:py-5 transition-colors duration-150 ${
          isChecked
            ? isDay
              ? 'bg-emerald-50/45'
              : 'bg-emerald-950/25'
            : ''
        }`}
      >
        <div className="flex items-start gap-3.5">
          {/* Interactive Practice Check Numeral */}
          <button
            type="button"
            onClick={() => toggleChecked(item.id)}
            aria-label={isChecked ? 'আমল সম্পন্ন বাতিল করুন' : 'আমল সম্পন্ন হিসেবে চিহ্নিত করুন'}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl border shrink-0 flex items-center justify-center font-mono text-xs font-extrabold tabular-nums transition cursor-pointer mt-0.5 ${
              isChecked
                ? 'bg-emerald-700 border-emerald-700 text-white shadow-xs'
                : isDay
                ? 'bg-[#faf5e6] border-[#dfd6be] text-emerald-800 hover:border-emerald-700'
                : 'bg-[#06181c] border-[#1a4b54] text-emerald-300 hover:border-emerald-400'
            }`}
          >
            {isChecked ? <Check className="w-4 h-4 stroke-[2.75]" /> : toBnDigits(displayNumber)}
          </button>

          <div className="flex-1 min-w-0 space-y-1.5">
            {showCatBreadcrumb && (
              <button
                type="button"
                onClick={() => {
                  if (soundEnabled) soundHaptics.playTap();
                  setSelectedCategoryId(cat.id);
                }}
                className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-300 hover:underline cursor-pointer"
              >
                {cat.parentGroupBn ? `${cat.parentGroupBn} › ` : ''}
                {isBn ? cat.titleBn : cat.titleEn}
              </button>
            )}

            <div
              className={`text-sm sm:text-[15.5px] font-semibold leading-relaxed select-text ${
                isChecked
                  ? isDay
                    ? 'text-emerald-950'
                    : 'text-emerald-100'
                  : isDay
                  ? 'text-slate-900'
                  : 'text-slate-100'
              }`}
            >
              <HighlightableText
                text={item.textBn}
                section="daily_sunnah"
                themeMode={themeMode}
                selectedLanguage={selectedLanguage}
                soundEnabled={soundEnabled}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs">
                {item.refBn ? (
                  <span className={`font-semibold ${isDay ? 'text-emerald-800/90' : 'text-emerald-300/90'}`}>
                    {isBn ? `হাদিস সূত্র: ${item.refBn}` : `Ref: ${item.refBn}`}
                  </span>
                ) : (
                  <span className={isDay ? 'text-slate-500' : 'text-slate-400'}>
                    {isBn ? 'মাসনুন সুন্নাহ ও আদব' : 'Prophetic Tradition'}
                  </span>
                )}
                {isChecked && (
                  <>
                    <span aria-hidden="true" className="opacity-40">·</span>
                    <span className="font-bold text-emerald-700 dark:text-emerald-300">
                      {isBn ? 'আজ আমল হয়েছে' : 'Practiced Today'}
                    </span>
                  </>
                )}
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={(e) => toggleFavorite(item.id, e)}
                  className={`min-h-[38px] min-w-[38px] p-1.5 rounded-xl transition cursor-pointer flex items-center justify-center ${
                    isFav
                      ? 'text-rose-500 bg-rose-500/10'
                      : isDay
                      ? 'text-slate-400 hover:text-rose-500 hover:bg-slate-100'
                      : 'text-slate-400 hover:text-rose-400 hover:bg-white/5'
                  }`}
                  aria-label="Favorite Sunnah"
                  title={isBn ? 'পছন্দের তালিকায় রাখুন' : 'Favorite'}
                >
                  <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                </button>
                <button
                  type="button"
                  onClick={(e) => handleCopySunnah(cat, item, e)}
                  className={`min-h-[38px] min-w-[38px] p-1.5 rounded-xl transition cursor-pointer flex items-center justify-center ${
                    isDay
                      ? 'text-slate-500 hover:text-emerald-800 hover:bg-slate-100'
                      : 'text-emerald-300 hover:bg-white/5'
                  }`}
                  aria-label="Copy Sunnah"
                  title={isBn ? 'কপি করুন' : 'Copy'}
                >
                  {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      data-highlight-section="daily_sunnah"
      className="max-w-5xl mx-auto space-y-5 pb-10 animate-in fade-in duration-200"
    >
      {/* =================================================================== */}
      {/* VIEW B: SELECTED CATEGORY — KITAB-STYLED SUNNAH PAGE                */}
      {/* =================================================================== */}
      {selectedCategory ? (
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Top Reader Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                stepBackOr(() => setSelectedCategoryId(null));
              }}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap shrink-0 ${
                isDay
                  ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-[#0a2329] hover:bg-[#0e3038] border-[#1a4c56] text-emerald-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{isBn ? 'সকল সুন্নাহ অধ্যায়' : 'All Sunnah Topics'}</span>
            </button>

            <button
              type="button"
              onClick={() => markCategoryAllChecked(selectedCategory)}
              className={`min-h-[40px] px-3.5 py-2 rounded-xl border text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCategory.items.every((i) => checkedSet.has(i.id))
                  ? 'bg-emerald-700 border-emerald-700 text-white'
                  : isDay
                  ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-800'
                  : 'bg-emerald-950/60 hover:bg-emerald-900/60 border-emerald-700/60 text-emerald-300'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {selectedCategory.items.every((i) => checkedSet.has(i.id))
                  ? isBn
                    ? 'অধ্যায় সম্পন্ন ✓'
                    : 'All Checked ✓'
                  : isBn
                  ? 'সবগুলো আমল চিহ্নিত করুন'
                  : 'Mark All Practiced'}
              </span>
            </button>
          </div>

          {/* Physical Kitab Page Sheet */}
          <section
            className={`rounded-3xl border shadow-sm overflow-hidden ${
              isDay
                ? 'bg-[#fffdf7] border-[#dfd6be]'
                : 'bg-[#071f24] border-[#194650]'
            }`}
          >
            {/* Running Book Top Rule */}
            <div
              className={`px-5 sm:px-8 py-3 border-b flex flex-wrap items-center justify-between gap-2 text-xs font-bold ${
                isDay
                  ? 'bg-[#faf4e4]/75 border-[#e6dec8] text-slate-700'
                  : 'bg-[#0b272d] border-[#184650] text-emerald-200'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-extrabold text-emerald-800 dark:text-emerald-300 truncate">
                  {isBn ? 'দৈনন্দিন সুন্নাহ' : 'Daily Sunnah'}
                </span>
                {selectedCategory.parentGroupBn && (
                  <>
                    <span aria-hidden="true" className="opacity-40">·</span>
                    <span>{isBn ? selectedCategory.parentGroupBn : selectedCategory.parentGroupEn}</span>
                  </>
                )}
              </div>

              <div className="tabular-nums font-extrabold text-emerald-800 dark:text-emerald-300 shrink-0">
                {isBn
                  ? `সম্পন্ন: ${toBnDigits(
                      selectedCategory.items.filter((i) => checkedSet.has(i.id)).length
                    )} / ${toBnDigits(selectedCategory.items.length)}`
                  : `${selectedCategory.items.filter((i) => checkedSet.has(i.id)).length} / ${selectedCategory.items.length} Done`}
              </div>
            </div>

            {/* Centered Chapter Masthead */}
            <div
              className={`px-5 sm:px-8 py-6 border-b text-center space-y-1.5 ${
                isDay ? 'border-[#ebe4d0]' : 'border-[#153f48]'
              }`}
            >
              <div dir="rtl" className="font-arabic text-2xl sm:text-3xl font-bold text-emerald-800 dark:text-emerald-300">
                {selectedCategory.arabicTitle}
              </div>
              <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isDay ? 'text-slate-900' : 'text-white'}`}>
                {isBn ? selectedCategory.titleBn : selectedCategory.titleEn}
              </h2>
              <div className={`text-xs font-semibold tabular-nums ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                <span>{isBn ? selectedCategory.timeContextBn : selectedCategory.timeContextEn}</span>
                <span aria-hidden="true"> · </span>
                <span>
                  {isBn
                    ? `মোট ${toBnDigits(selectedCategory.items.length)}টি সুন্নাহ`
                    : `${selectedCategory.items.length} Sunnahs`}
                </span>
              </div>
            </div>

            {/* Numbered Sunnah Entries Inside the Page */}
            <div className={`divide-y divide-dashed ${isDay ? 'divide-[#e6dec8]' : 'divide-[#153f48]'}`}>
              {selectedCategory.items.map((item, idx) =>
                renderSunnahFolioRow(selectedCategory, item, idx + 1, false)
              )}
            </div>

            {/* Page Footer Rule */}
            <div
              className={`px-6 py-3 border-t text-center text-[11px] font-semibold ${
                isDay
                  ? 'bg-[#faf4e4]/60 border-[#e6dec8] text-slate-600'
                  : 'bg-[#0b272d] border-[#184650] text-emerald-200/80'
              }`}
            >
              {isBn
                ? 'সংখ্যায় ক্লিক করলে আজকের আমল হিসেবে চিহ্নিত হবে'
                : 'Tap any item number to mark it practiced today'}
            </div>
          </section>

          {/* Previous / Next Category Page Turners */}
          {(prevCategory || nextCategory) && (
            <div className="grid grid-cols-2 gap-2.5 pt-1">
              <button
                type="button"
                disabled={!prevCategory}
                onClick={() => {
                  if (prevCategory) {
                    if (soundEnabled) soundHaptics.playTap();
                    setSelectedCategoryId(prevCategory.id);
                  }
                }}
                className={`min-h-[54px] p-3.5 rounded-2xl border text-left transition flex items-center gap-2 disabled:opacity-35 cursor-pointer ${
                  isDay
                    ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-[#0a2329] hover:bg-[#10323a] border-[#16444e] text-white'
                }`}
              >
                <ChevronLeft className="w-4 h-4 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold opacity-70">
                    {isBn ? 'পূর্ববর্তী অধ্যায়' : 'Previous Topic'}
                  </div>
                  <div className="text-xs font-extrabold truncate">
                    {prevCategory ? (isBn ? prevCategory.titleBn : prevCategory.titleEn) : '—'}
                  </div>
                </div>
              </button>

              <button
                type="button"
                disabled={!nextCategory}
                onClick={() => {
                  if (nextCategory) {
                    if (soundEnabled) soundHaptics.playTap();
                    setSelectedCategoryId(nextCategory.id);
                  }
                }}
                className={`min-h-[54px] p-3.5 rounded-2xl border text-right transition flex items-center justify-end gap-2 disabled:opacity-35 cursor-pointer ${
                  isDay
                    ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                    : 'bg-[#0a2329] hover:bg-[#10323a] border-[#16444e] text-white'
                }`}
              >
                <div className="min-w-0">
                  <div className="text-[10px] font-semibold opacity-70">
                    {isBn ? 'পরবর্তী অধ্যায়' : 'Next Topic'}
                  </div>
                  <div className="text-xs font-extrabold truncate">
                    {nextCategory ? (isBn ? nextCategory.titleBn : nextCategory.titleEn) : '—'}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ================================================================= */
        /* VIEW A: DAILY SUNNAH OVERVIEW, RHYTHM FLOW & ALL 38 CATEGORIES    */
        /* ================================================================= */
        <>
          {/* Clean Top Masthead */}
          <section
            className={`pb-3.5 border-b space-y-3 ${
              isDay ? 'border-[var(--app-border,#cbe6d8)]' : 'border-[var(--app-dark-border,#184850)]'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5 min-w-0">
                {onBackToHub && (
                  <button
                    type="button"
                    onClick={() => {
                      if (soundEnabled) soundHaptics.playTap();
                      onBackToHub();
                    }}
                    className={`min-h-[38px] px-3 py-1.5 rounded-xl border text-xs font-extrabold flex items-center gap-1 transition cursor-pointer shrink-0 whitespace-nowrap ${
                      isDay
                        ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800'
                        : 'bg-[#0e1c26] hover:bg-[#132634] border-[#1a3342] text-emerald-200'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{isBn ? 'আরও' : 'More'}</span>
                  </button>
                )}

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1
                      className={`text-lg sm:text-xl font-black tracking-tight leading-none ${
                        isDay ? 'text-[var(--app-primary,#006A4E)]' : 'text-white'
                      }`}
                    >
                      {isBn ? 'দৈনন্দিন সুন্নাহ' : 'Daily Sunnah'}
                    </h1>
                    <span
                      dir="rtl"
                      className={`text-xs sm:text-sm font-semibold font-arabic ${
                        isDay ? 'text-emerald-700/80' : 'text-emerald-300/80'
                      }`}
                    >
                      السنة النبوية اليومية
                    </span>
                  </div>
                  <p className={`text-[11px] mt-0.5 tabular-nums ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                    {isBn
                      ? `${toBnDigits(DAILY_SUNNAH_CATEGORIES.length)} অধ্যায় · ${toBnDigits(TOTAL_DAILY_SUNNAH_COUNT)}টি সহিহ হাদিসভিত্তিক সুন্নাহ`
                      : `${DAILY_SUNNAH_CATEGORIES.length} Categories · ${TOTAL_DAILY_SUNNAH_COUNT} Authentic Sunnahs`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setActiveTab('saved');
                  }}
                  className={`min-h-[38px] px-3 py-1.5 rounded-xl border text-xs font-bold tabular-nums flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap shrink-0 ${
                    isDay
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
                      : 'bg-emerald-950/60 border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/60'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>
                    {isBn
                      ? `আজকের আমল: ${toBnDigits(checkedIds.length)}/${toBnDigits(TOTAL_DAILY_SUNNAH_COUNT)}`
                      : `Today: ${checkedIds.length}/${TOTAL_DAILY_SUNNAH_COUNT}`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setIsSearchOpen((prev) => {
                      if (prev) setSearchQuery('');
                      return !prev;
                    });
                  }}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center transition cursor-pointer shrink-0 ${
                    isSearchOpen || searchQuery.trim().length > 0
                      ? 'bg-emerald-700 border-emerald-700 text-white'
                      : isDay
                      ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-emerald-800'
                      : 'bg-[#0e1c26] border-[#1a3342] text-emerald-300 hover:border-emerald-500'
                  }`}
                  title={isBn ? 'সুন্নাহ খুঁজুন' : 'Search Sunnahs'}
                  aria-label={isBn ? 'সুন্নাহ খুঁজুন' : 'Search Sunnahs'}
                >
                  {isSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Expandable Search Bar across All 342 Sunnahs */}
            {(isSearchOpen || searchQuery.trim().length > 0) && (
              <div className="relative pt-1 animate-in fade-in duration-150">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-[calc(50%+2px)] -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  autoFocus={isSearchOpen}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={
                    isBn
                      ? 'যেকোনো সুন্নাহ, অধ্যায় বা হাদিস সূত্র (যেমন: বুখারী, ওযু, ডান, বিসমিল্লাহ) লিখে খুঁজুন...'
                      : 'Search across all 342 Sunnahs or Hadith references...'
                  }
                  className={`w-full min-h-[42px] rounded-xl pl-10 pr-9 py-2 border text-xs sm:text-sm focus:outline-none ${
                    isDay
                      ? 'bg-white border-slate-200 text-slate-900 focus:border-emerald-700'
                      : 'bg-[#0e1c26] border-[#1a3342] text-white focus:border-emerald-400'
                  }`}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-3 top-[calc(50%+2px)] -translate-y-1/2 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}
          </section>

          {/* Search Results View (Overrides tabs while searching) */}
          {searchQuery.trim().length > 0 ? (
            <section
              className={`rounded-3xl border shadow-sm overflow-hidden ${
                isDay ? 'bg-[#fffdf7] border-[#dfd6be]' : 'bg-[#071f24] border-[#194650]'
              }`}
            >
              <div
                className={`px-5 sm:px-7 py-3.5 border-b flex items-center justify-between gap-2 ${
                  isDay ? 'bg-[#faf4e4]/75 border-[#e6dec8]' : 'bg-[#0b272d] border-[#184650]'
                }`}
              >
                <h2 className="text-sm font-black">
                  {isBn
                    ? `খুঁজে পাওয়া সুন্নাহ (${toBnDigits(searchResults.length)}টি)`
                    : `Matching Sunnahs (${searchResults.length})`}
                </h2>
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-xs font-bold text-emerald-700 dark:text-emerald-300 underline cursor-pointer"
                >
                  {isBn ? 'ফিরে যান' : 'Clear'}
                </button>
              </div>
              {searchResults.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400">
                  {isBn ? 'আপনার অনুসন্ধানের সাথে মিলে এমন কোনো সুন্নাহ পাওয়া যায়নি।' : 'No matching Sunnahs found.'}
                </div>
              ) : (
                <div className={`divide-y divide-dashed ${isDay ? 'divide-[#e6dec8]' : 'divide-[#153f48]'}`}>
                  {searchResults.map(({ cat, item }, idx) =>
                    renderSunnahFolioRow(cat, item, idx + 1, true)
                  )}
                </div>
              )}
            </section>
          ) : (
            <>
              {/* Creative Spotlight Card — Time-Aware Sunnah of the Moment */}
              {currentSpotlight && (
                <section
                  className={`rounded-3xl border shadow-sm p-4 sm:p-6 transition-colors ${
                    isDay
                      ? 'bg-[#fffdf7] border-[#dfd6be]'
                      : 'bg-[#071f24] border-[#194650]'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-dashed border-emerald-700/20">
                    <div className="flex items-center gap-2 text-xs font-extrabold text-emerald-800 dark:text-emerald-300">
                      <Clock className="w-4 h-4" />
                      <span>
                        {isBn
                          ? `এই মুহূর্তের সুন্নাহ · ${currentSpotlight.cat.titleBn}`
                          : `Sunnah for Now · ${currentSpotlight.cat.titleEn}`}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (soundEnabled) soundHaptics.playTap();
                        setSpotlightIdx((i) => (i + 1) % Math.max(1, spotlightPool.length));
                      }}
                      className={`min-h-[34px] px-3 py-1 rounded-xl border text-[11px] font-extrabold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap shrink-0 ${
                        isDay
                          ? 'bg-white hover:bg-emerald-50 border-[#e2d8be] text-emerald-800'
                          : 'bg-[#0b272d] hover:bg-[#113740] border-[#1b4e59] text-emerald-300'
                      }`}
                    >
                      <Shuffle className="w-3.5 h-3.5" />
                      <span>{isBn ? 'অন্য সুন্নাহ' : 'Next Sunnah'}</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    <p className={`text-base sm:text-lg font-extrabold leading-relaxed ${isDay ? 'text-slate-900' : 'text-white'}`}>
                      {currentSpotlight.item.textBn}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <span className={`text-xs font-bold ${isDay ? 'text-emerald-800' : 'text-emerald-300'}`}>
                        {currentSpotlight.item.refBn
                          ? isBn
                            ? `হাদিস সূত্র: ${currentSpotlight.item.refBn}`
                            : `Ref: ${currentSpotlight.item.refBn}`
                          : currentSpotlight.cat.arabicTitle}
                      </span>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => toggleChecked(currentSpotlight.item.id)}
                          className={`min-h-[38px] px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap shrink-0 ${
                            checkedSet.has(currentSpotlight.item.id)
                              ? 'bg-emerald-700 text-white shadow-xs'
                              : isDay
                              ? 'bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800'
                              : 'bg-emerald-950/70 hover:bg-emerald-900/70 border border-emerald-700/60 text-emerald-200'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>
                            {checkedSet.has(currentSpotlight.item.id)
                              ? isBn
                                ? 'আমল সম্পন্ন'
                                : 'Practiced'
                              : isBn
                              ? 'আমল করেছি'
                              : 'Mark Done'}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            if (soundEnabled) soundHaptics.playTap();
                            setSelectedCategoryId(currentSpotlight.cat.id);
                          }}
                          className={`min-h-[38px] px-3.5 py-1.5 rounded-xl border text-xs font-extrabold flex items-center gap-1 transition cursor-pointer whitespace-nowrap shrink-0 ${
                            isDay
                              ? 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                              : 'bg-[#0b272d] hover:bg-[#113740] border-[#1b4e59] text-slate-200'
                          }`}
                        >
                          <span>{isBn ? 'অধ্যায় পড়ুন' : 'Open Chapter'}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Primary Mode Switcher */}
              <div
                className={`p-1.5 rounded-2xl border flex items-center gap-1.5 overflow-x-auto scrollbar-none ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#082228] border-[#16444e]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setActiveTab('chapters');
                  }}
                  className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 whitespace-nowrap shrink-0 transition cursor-pointer ${
                    activeTab === 'chapters'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : isDay
                      ? 'text-slate-600 hover:bg-slate-100'
                      : 'text-emerald-200 hover:bg-white/5'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>
                    {isBn
                      ? `সকল অধ্যায় (${toBnDigits(DAILY_SUNNAH_CATEGORIES.length)})`
                      : `All Chapters (${DAILY_SUNNAH_CATEGORIES.length})`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setActiveTab('rhythm');
                  }}
                  className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 whitespace-nowrap shrink-0 transition cursor-pointer ${
                    activeTab === 'rhythm'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : isDay
                      ? 'text-slate-600 hover:bg-slate-100'
                      : 'text-emerald-200 hover:bg-white/5'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>{isBn ? 'দিন-রাতের সুন্নাহ প্রবাহ' : 'Daily Rhythm Flow'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setActiveTab('saved');
                  }}
                  className={`min-h-[42px] px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 whitespace-nowrap shrink-0 transition cursor-pointer ${
                    activeTab === 'saved'
                      ? 'bg-emerald-700 text-white shadow-xs'
                      : isDay
                      ? 'text-slate-600 hover:bg-slate-100'
                      : 'text-emerald-200 hover:bg-white/5'
                  }`}
                >
                  <Heart className="w-4 h-4 text-rose-400" />
                  <span>
                    {isBn
                      ? `আমল ও প্রিয় (${toBnDigits(checkedIds.length + favoriteIds.length)})`
                      : `Tracker & Saved (${checkedIds.length + favoriteIds.length})`}
                  </span>
                </button>
              </div>

              {/* ============================================================= */}
              {/* TAB 1: ALL 38 CHAPTER FOLIOS BY LIFE DOMAIN                   */}
              {/* ============================================================= */}
              {activeTab === 'chapters' && (
                <div className="space-y-4">
                  {/* Domain Filter Bar */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {SUNNAH_DOMAINS.map((dom) => {
                      const count =
                        dom.id === 'all'
                          ? DAILY_SUNNAH_CATEGORIES.length
                          : DAILY_SUNNAH_CATEGORIES.filter((c) => c.domain === dom.id).length;
                      return (
                        <button
                          key={dom.id}
                          type="button"
                          onClick={() => {
                            if (soundEnabled) soundHaptics.playTap();
                            setSelectedDomain(dom.id);
                          }}
                          className={`min-h-[40px] px-3.5 py-2 rounded-xl border text-xs font-bold whitespace-nowrap shrink-0 transition cursor-pointer ${
                            selectedDomain === dom.id
                              ? 'bg-emerald-700 text-white border-transparent shadow-xs'
                              : isDay
                              ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                              : 'bg-[#0a2329] border-[#16444e] text-slate-300 hover:bg-[#0e2e36]'
                          }`}
                        >
                          {isBn
                            ? `${dom.labelBn} (${toBnDigits(count)})`
                            : `${dom.labelEn} (${count})`}
                        </button>
                      );
                    })}
                  </div>

                  {/* Special Prayer Posture Sequence Banner ("নামাজের ৫টি সুন্নাহ ধাপ") */}
                  {(selectedDomain === 'all' || selectedDomain === 'prayer') && (
                    <section
                      className={`rounded-3xl border p-4 sm:p-5 space-y-3 ${
                        isDay
                          ? 'bg-[#fffdf7] border-[#dfd6be]'
                          : 'bg-[#071f24] border-[#194650]'
                      }`}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div>
                          <h2 className={`text-sm sm:text-base font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                            {isBn ? 'নামাজের ধারাবাহিক ৫টি সুন্নাহ ধাপ' : '5 Sequential Sunnah Postures in Prayer'}
                          </h2>
                          <p className={`text-xs ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                            {isBn
                              ? 'দাঁড়ানো থেকে কেরাত, রুকু, সিজদা ও বৈঠক পর্যন্ত ৫১টি সহিহ সুন্নাহ'
                              : '51 Sunnahs from Standing to Sitting'}
                          </p>
                        </div>
                        <span dir="rtl" className="font-arabic text-base font-bold text-emerald-700 dark:text-emerald-300">
                          سنن الصلاة
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                        {namajSubCategories.map((sub, idx) => {
                          const doneInCat = sub.items.filter((i) => checkedSet.has(i.id)).length;
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => {
                                if (soundEnabled) soundHaptics.playTap();
                                setSelectedCategoryId(sub.id);
                              }}
                              className={`text-left p-3 rounded-2xl border transition cursor-pointer group ${
                                isDay
                                  ? 'bg-white hover:bg-emerald-50/70 border-[#e4dbc3] hover:border-emerald-700'
                                  : 'bg-[#0b272d] hover:bg-[#10363f] border-[#194a54] hover:border-emerald-400'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-1 text-[11px] font-bold tabular-nums text-emerald-700 dark:text-emerald-300">
                                <span>{isBn ? `ধাপ ${toBnDigits(idx + 1)}` : `Step ${idx + 1}`}</span>
                                <span>{isBn ? `${toBnDigits(sub.items.length)}টি` : sub.items.length}</span>
                              </div>
                              <div className={`text-xs sm:text-sm font-extrabold mt-1 leading-snug ${isDay ? 'text-slate-900' : 'text-white'}`}>
                                {isBn ? sub.titleBn : sub.titleEn}
                              </div>
                              <div className={`text-[10px] tabular-nums mt-1 ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                                {isBn
                                  ? `${toBnDigits(doneInCat)}/${toBnDigits(sub.items.length)} আমল`
                                  : `${doneInCat}/${sub.items.length} done`}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </section>
                  )}

                  {/* Responsive Chapter Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {filteredCategories.map((cat, idx) => {
                      const doneCount = cat.items.filter((i) => checkedSet.has(i.id)).length;
                      const pct = Math.round((doneCount / Math.max(1, cat.items.length)) * 100);
                      const firstPreview = cat.items[0]?.textBn || '';

                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            if (soundEnabled) soundHaptics.playTap();
                            setSelectedCategoryId(cat.id);
                          }}
                          className={`w-full text-left p-4 sm:p-5 rounded-3xl border transition-all cursor-pointer group flex flex-col justify-between gap-3 ${
                            isDay
                              ? 'bg-[#fffdf7] hover:bg-emerald-50/40 border-[#e2d9c2] hover:border-emerald-700'
                              : 'bg-[#082126] hover:bg-[#0d2d34] border-[#184650] hover:border-emerald-400/60'
                          }`}
                        >
                          <div className="space-y-2 w-full">
                            <div className="flex items-start justify-between gap-2">
                              <div
                                className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                                  doneCount === cat.items.length && cat.items.length > 0
                                    ? 'bg-emerald-700 border-emerald-700 text-white'
                                    : isDay
                                    ? 'bg-[#faf4e4] border-[#e4dbc2] text-emerald-800'
                                    : 'bg-[#06181c] border-[#1a4b54] text-emerald-300'
                                }`}
                              >
                                {getDomainIcon(cat.domain)}
                              </div>

                              <span
                                dir="rtl"
                                className={`font-arabic text-sm sm:text-base font-bold text-right ${
                                  isDay ? 'text-emerald-800' : 'text-emerald-300'
                                }`}
                              >
                                {cat.arabicTitle}
                              </span>
                            </div>

                            <div>
                              <h3 className={`text-sm sm:text-base font-black leading-snug ${isDay ? 'text-slate-900' : 'text-white'}`}>
                                {isBn ? `${toBnDigits(idx + 1)}. ${cat.titleBn}` : `${idx + 1}. ${cat.titleEn}`}
                              </h3>
                              <div className={`text-[11px] font-semibold tabular-nums mt-0.5 flex flex-wrap items-center gap-x-1.5 ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                                {cat.parentGroupBn && (
                                  <>
                                    <span className="text-emerald-700 dark:text-emerald-300 font-bold">
                                      {isBn ? cat.parentGroupBn : cat.parentGroupEn}
                                    </span>
                                    <span aria-hidden="true">·</span>
                                  </>
                                )}
                                <span>{isBn ? cat.timeContextBn : cat.timeContextEn}</span>
                                <span aria-hidden="true">·</span>
                                <span>
                                  {isBn ? `${toBnDigits(cat.items.length)}টি সুন্নাহ` : `${cat.items.length} Sunnahs`}
                                </span>
                              </div>
                            </div>

                            {firstPreview && (
                              <p className={`text-xs line-clamp-2 leading-relaxed ${isDay ? 'text-slate-600' : 'text-slate-300/90'}`}>
                                {firstPreview}
                              </p>
                            )}
                          </div>

                          {/* Subtle Progress Footer */}
                          <div className="w-full space-y-1.5 pt-1">
                            <div className={`h-1.5 w-full rounded-full overflow-hidden ${isDay ? 'bg-[#ebe4d0]' : 'bg-[#0f343b]'}`}>
                              <div
                                className="h-full bg-emerald-700 dark:bg-emerald-400 transition-all duration-300"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-[11px] font-bold tabular-nums">
                              <span className={isDay ? 'text-emerald-800' : 'text-emerald-300'}>
                                {isBn
                                  ? `${toBnDigits(doneCount)}/${toBnDigits(cat.items.length)} আমল সম্পন্ন`
                                  : `${doneCount}/${cat.items.length} practiced`}
                              </span>
                              <span className="inline-flex items-center gap-0.5 text-slate-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300">
                                <span>{isBn ? 'খুলুন' : 'Read'}</span>
                                <ChevronRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* TAB 2: 6-STAGE DAILY RHYTHM FLOW ("দিন-রাতের সুন্নাহ প্রবাহ")     */}
              {/* ============================================================= */}
              {activeTab === 'rhythm' && (
                <div className="space-y-4">
                  {/* Interactive Stage Selector Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {DAILY_RHYTHM_STAGES.map((st, idx) => {
                      const cats = DAILY_SUNNAH_CATEGORIES.filter((c) => c.stage === st.id);
                      const totalInStage = cats.reduce((s, c) => s + c.items.length, 0);
                      const doneInStage = cats.reduce(
                        (s, c) => s + c.items.filter((i) => checkedSet.has(i.id)).length,
                        0
                      );
                      const isActive = activeStageFilter === st.id;

                      return (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => {
                            if (soundEnabled) soundHaptics.playTap();
                            setActiveStageFilter(st.id);
                          }}
                          className={`text-left p-4 rounded-3xl border transition cursor-pointer flex flex-col justify-between gap-2.5 ${
                            isActive
                              ? isDay
                                ? 'bg-emerald-700 border-emerald-700 text-white shadow-sm'
                                : 'bg-emerald-800 border-emerald-500 text-white shadow-sm'
                              : isDay
                              ? 'bg-[#fffdf7] hover:bg-emerald-50/50 border-[#e2d9c2] text-slate-900'
                              : 'bg-[#082126] hover:bg-[#0d2d34] border-[#184650] text-white'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div
                              className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                                isActive
                                  ? 'bg-white/15 text-white'
                                  : isDay
                                  ? 'bg-[#faf4e4] text-emerald-800'
                                  : 'bg-[#06181c] text-emerald-300'
                              }`}
                            >
                              {getStageIcon(st.id)}
                            </div>
                            <span
                              dir="rtl"
                              className={`font-arabic text-sm font-bold ${
                                isActive ? 'text-emerald-100' : 'text-emerald-700 dark:text-emerald-300'
                              }`}
                            >
                              {st.arabicTitle}
                            </span>
                          </div>

                          <div>
                            <div className={`text-[11px] font-bold tabular-nums ${isActive ? 'text-emerald-100' : 'text-emerald-700 dark:text-emerald-300'}`}>
                              {isBn ? `পর্ব ${toBnDigits(idx + 1)} · ${st.timeWindowBn}` : `Stage ${idx + 1} · ${st.timeWindowEn}`}
                            </div>
                            <h3 className="text-sm font-black leading-snug mt-0.5">
                              {isBn ? st.titleBn : st.titleEn}
                            </h3>
                            <p className={`text-[11px] mt-1 line-clamp-2 ${isActive ? 'text-white/85' : isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                              {isBn ? st.descBn : st.descEn}
                            </p>
                          </div>

                          <div className={`text-[11px] font-bold tabular-nums ${isActive ? 'text-emerald-100' : isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                            {isBn
                              ? `${toBnDigits(cats.length)} অধ্যায় · ${toBnDigits(doneInStage)}/${toBnDigits(totalInStage)} সম্পন্ন`
                              : `${cats.length} topics · ${doneInStage}/${totalInStage} done`}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Stage Categories Inside a Unified Kitab Sheet */}
                  <div className="space-y-4 pt-1">
                    {stageCategories.map((cat) => (
                      <section
                        key={cat.id}
                        className={`rounded-3xl border shadow-sm overflow-hidden ${
                          isDay ? 'bg-[#fffdf7] border-[#dfd6be]' : 'bg-[#071f24] border-[#194650]'
                        }`}
                      >
                        <div
                          className={`px-5 sm:px-7 py-3.5 border-b flex flex-wrap items-center justify-between gap-2 ${
                            isDay ? 'bg-[#faf4e4]/75 border-[#e6dec8]' : 'bg-[#0b272d] border-[#184650]'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <h3 className={`text-sm sm:text-base font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                              {cat.parentGroupBn ? `${cat.parentGroupBn} · ` : ''}
                              {isBn ? cat.titleBn : cat.titleEn}
                            </h3>
                            <span dir="rtl" className="font-arabic text-sm font-bold text-emerald-700 dark:text-emerald-300">
                              {cat.arabicTitle}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              if (soundEnabled) soundHaptics.playTap();
                              setSelectedCategoryId(cat.id);
                            }}
                            className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300 hover:underline flex items-center gap-0.5 cursor-pointer whitespace-nowrap shrink-0"
                          >
                            <span>{isBn ? 'পূর্ণ পৃষ্ঠায় পড়ুন' : 'Open Full Page'}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className={`divide-y divide-dashed ${isDay ? 'divide-[#e6dec8]' : 'divide-[#153f48]'}`}>
                          {cat.items.map((item, idx) => renderSunnahFolioRow(cat, item, idx + 1, false))}
                        </div>
                      </section>
                    ))}
                  </div>
                </div>
              )}

              {/* ============================================================= */}
              {/* TAB 3: TODAY'S PRACTICED TRACKER & FAVORITE SUNNAHS           */}
              {/* ============================================================= */}
              {activeTab === 'saved' && (
                <div className="space-y-5">
                  {/* Today's Progress Summary */}
                  <section
                    className={`rounded-3xl border p-5 sm:p-6 space-y-3 ${
                      isDay ? 'bg-[#fffdf7] border-[#dfd6be]' : 'bg-[#071f24] border-[#194650]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h2 className={`text-base sm:text-lg font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                          {isBn ? 'আজকের সুন্নাহ আমলের অগ্রগতি' : "Today's Sunnah Progress"}
                        </h2>
                        <p className={`text-xs tabular-nums ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                          {isBn
                            ? `মোট ${toBnDigits(TOTAL_DAILY_SUNNAH_COUNT)}টি সুন্নাহর মধ্যে আজ ${toBnDigits(checkedIds.length)}টি সম্পন্ন হয়েছে`
                            : `${checkedIds.length} of ${TOTAL_DAILY_SUNNAH_COUNT} Sunnahs practiced today`}
                        </p>
                      </div>

                      {checkedIds.length > 0 && (
                        <button
                          type="button"
                          onClick={() => {
                            if (soundEnabled) soundHaptics.playReset();
                            setCheckedIds([]);
                          }}
                          className={`min-h-[38px] px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
                            isDay
                              ? 'bg-white hover:bg-rose-50 border-slate-200 text-rose-600'
                              : 'bg-[#0b272d] hover:bg-rose-950/40 border-[#1b4e59] text-rose-300'
                          }`}
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>{isBn ? 'আজকের হিসাব রিসেট' : 'Reset Today'}</span>
                        </button>
                      )}
                    </div>

                    <div className={`h-2 w-full rounded-full overflow-hidden ${isDay ? 'bg-[#ebe4d0]' : 'bg-[#0f343b]'}`}>
                      <div
                        className="h-full bg-emerald-700 dark:bg-emerald-400 transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.round((checkedIds.length / Math.max(1, TOTAL_DAILY_SUNNAH_COUNT)) * 100)
                          )}%`,
                        }}
                      />
                    </div>
                  </section>

                  {/* Favorites List */}
                  <section
                    className={`rounded-3xl border shadow-sm overflow-hidden ${
                      isDay ? 'bg-[#fffdf7] border-[#dfd6be]' : 'bg-[#071f24] border-[#194650]'
                    }`}
                  >
                    <div
                      className={`px-5 sm:px-7 py-3.5 border-b flex items-center justify-between ${
                        isDay ? 'bg-[#faf4e4]/75 border-[#e6dec8]' : 'bg-[#0b272d] border-[#184650]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                        <h3 className="text-sm font-black">
                          {isBn
                            ? `পছন্দের সুন্নাহ (${toBnDigits(favoriteEntries.length)})`
                            : `Favorite Sunnahs (${favoriteEntries.length})`}
                        </h3>
                      </div>
                    </div>
                    {favoriteEntries.length === 0 ? (
                      <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400">
                        {isBn
                          ? 'যেকোনো সুন্নাহর পাশে ❤️ আইকনে চাপ দিলে এখানে স্থায়ীভাবে জমা থাকবে।'
                          : 'Tap the heart icon on any Sunnah to keep it here.'}
                      </div>
                    ) : (
                      <div className={`divide-y divide-dashed ${isDay ? 'divide-[#e6dec8]' : 'divide-[#153f48]'}`}>
                        {favoriteEntries.map(({ cat, item }, idx) =>
                          renderSunnahFolioRow(cat, item, idx + 1, true)
                        )}
                      </div>
                    )}
                  </section>

                  {/* Practiced Today List */}
                  {practicedEntries.length > 0 && (
                    <section
                      className={`rounded-3xl border shadow-sm overflow-hidden ${
                        isDay ? 'bg-[#fffdf7] border-[#dfd6be]' : 'bg-[#071f24] border-[#194650]'
                      }`}
                    >
                      <div
                        className={`px-5 sm:px-7 py-3.5 border-b flex items-center gap-2 ${
                          isDay ? 'bg-[#faf4e4]/75 border-[#e6dec8]' : 'bg-[#0b272d] border-[#184650]'
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
                        <h3 className="text-sm font-black">
                          {isBn
                            ? `আজ সম্পন্নকৃত সুন্নাহসমূহ (${toBnDigits(practicedEntries.length)})`
                            : `Practiced Today (${practicedEntries.length})`}
                        </h3>
                      </div>
                      <div className={`divide-y divide-dashed ${isDay ? 'divide-[#e6dec8]' : 'divide-[#153f48]'}`}>
                        {practicedEntries.map(({ cat, item }, idx) =>
                          renderSunnahFolioRow(cat, item, idx + 1, true)
                        )}
                      </div>
                    </section>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};
