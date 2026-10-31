import React, { useState, useMemo, useEffect } from 'react';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  Users,
  Search,
  BookOpen,
  Heart,
  ScrollText,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ArrowLeft,
  Bookmark,
  Copy,
  CheckCircle2,
  Award,
  Crown,
  Quote,
  Flame,
  Star,
  X,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import {
  SAHABA_CATEGORIES,
  SAHABA_DATABASE,
  SahabaCategoryKey,
  SahabaItem,
} from '../data/sahabaData';

interface HayatusSahabaViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  onBackToHub?: () => void;
}

export const HayatusSahabaView: React.FC<HayatusSahabaViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
  onBackToHub,
}) => {
  const isDay = themeMode === 'day';
  const [selectedSahabaId, setSelectedSahabaId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<SahabaCategoryKey | 'all'>('all');
  const [showTocIndex, setShowTocIndex] = useState(true); // Default open like book TOC in screenshot
  const [copiedQuote, setCopiedQuote] = useState(false);

  // Auto-scroll to top when a Sahabi detail is selected
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [selectedSahabaId]);

  // Selected Sahabi Object
  const activeSahaba = useMemo(() => {
    if (!selectedSahabaId) return null;
    return SAHABA_DATABASE.find((s) => s.id === selectedSahabaId) || null;
  }, [selectedSahabaId]);

  // Filtered list for search & categories
  const filteredSahaba = useMemo(() => {
    return SAHABA_DATABASE.filter((s) => {
      const matchesCategory =
        activeCategoryFilter === 'all' || s.categoryKey === activeCategoryFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        s.nameBn.toLowerCase().includes(q) ||
        s.nameAr.includes(q) ||
        s.titleBn.toLowerCase().includes(q) ||
        s.summaryBn.toLowerCase().includes(q) ||
        s.categoryBn.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategoryFilter, searchQuery]);

  // Navigation: Next / Prev
  const currentIndex = useMemo(() => {
    if (!selectedSahabaId) return -1;
    return SAHABA_DATABASE.findIndex((s) => s.id === selectedSahabaId);
  }, [selectedSahabaId]);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < SAHABA_DATABASE.length - 1;

  const handleNavigateSahaba = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && hasPrev) {
      setSelectedSahabaId(SAHABA_DATABASE[currentIndex - 1].id);
      if (soundEnabled) soundHaptics.playTap();
    } else if (direction === 'next' && hasNext) {
      setSelectedSahabaId(SAHABA_DATABASE[currentIndex + 1].id);
      if (soundEnabled) soundHaptics.playTap();
    }
  };

  const handleCopySahabaSummary = () => {
    if (!activeSahaba) return;
    const textToCopy = `📖 ${activeSahaba.nameBn} (${activeSahaba.nameAr})\n🏆 উপাধি: ${activeSahaba.titleBn}\n⭐ মর্যাদা ক্রম: #${activeSahaba.rank} | ${activeSahaba.categoryBn}\n\n${activeSahaba.summaryBn}\n\nইসলাম গ্রহণ: ${activeSahaba.islamAcceptanceBn}\n\nউৎস: হায়াতুস সাহাবা সংকলন (অ্যাপ)`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedQuote(true);
    if (soundEnabled) soundHaptics.playTargetChime();
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  // Group database by category for Book-Style Table of Contents
  const sahabaByCategory = useMemo(() => {
    const map: Record<SahabaCategoryKey, SahabaItem[]> = {
      rashidun: [],
      ashara: [],
      pioneers_martyrs: [],
      commanders: [],
      scholars: [],
      ansar: [],
      beloved_companions: [],
      sahabiyyat: [],
    };
    SAHABA_DATABASE.forEach((s) => {
      if (map[s.categoryKey]) {
        map[s.categoryKey].push(s);
      }
    });
    return map;
  }, []);

  // =========================================================================
  // 1. FULL PAGE DEDICATED READER (Zero Empty Space / Seamless Edge-to-Edge)
  // =========================================================================
  if (activeSahaba) {
    return (
      <div className="w-full space-y-4 pb-28 animate-in fade-in duration-300">
        {/* Sticky Top Header with Back, Title & Copy */}
        <div
          className={`sticky top-0 z-40 text-white shadow-xl rounded-2xl px-3 sm:px-4 py-3 flex items-center justify-between gap-3 border transition-colors ${
            isDay
              ? 'bg-gradient-to-r from-[#005a3e] via-[#006747] to-[#007a52] border-emerald-600/40 shadow-[#006747]/20'
              : 'bg-gradient-to-r from-[#07191e] via-[#0b262d] to-[#10363e] border-[#163c46] shadow-black/60'
          }`}
        >
          <button
            onClick={() => {
              setSelectedSahabaId(null);
              if (soundEnabled) soundHaptics.playTap();
            }}
            className="p-2 -ml-1 rounded-xl bg-white/10 hover:bg-white/25 active:scale-95 transition cursor-pointer flex items-center gap-1.5"
            title="সূচিপত্র ও তালিকায় ফিরে যান"
          >
            <ArrowLeft className="w-5 h-5 text-white stroke-[2.5]" />
            <span className="text-xs font-bold hidden sm:inline">সূচি ও তালিকা</span>
          </button>

          <div className="flex-1 text-center truncate px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 truncate block">
              মর্যাদা ক্রম #{activeSahaba.rank} • {activeSahaba.categoryBn}
            </span>
            <h2 className="text-sm sm:text-base font-black truncate text-white">
              {activeSahaba.nameBn}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleCopySahabaSummary}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/25 active:scale-95 transition cursor-pointer text-xs font-bold flex items-center gap-1"
              title="কপি করুন"
            >
              {copiedQuote ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              ) : (
                <Copy className="w-4 h-4 text-white" />
              )}
              <span className="hidden sm:inline text-[11px]">
                {copiedQuote ? 'কপি হয়েছে' : 'কপি'}
              </span>
            </button>

            <button
              onClick={() => {
                setSelectedSahabaId(null);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/30 active:scale-95 transition cursor-pointer"
              title="বন্ধ করুন"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Full Details Container - Edge to Edge without margins */}
        <div
          className={`w-full rounded-2xl border p-4 sm:p-6 md:p-8 space-y-6 shadow-xl transition-all ${
            isDay
              ? 'bg-gradient-to-b from-white via-emerald-50/20 to-white border-slate-200 text-slate-800'
              : 'bg-gradient-to-b from-[#0a1f26] via-[#07171c] to-[#051115] border-[#14353e] text-white shadow-black/80'
          }`}
        >
          {/* Header Banner & Identity */}
          <div className="border-b border-emerald-500/20 pb-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30 text-xs font-extrabold flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span>মর্যাদা র‍্যাংক: #{activeSahaba.rank}</span>
              </span>

              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                {activeSahaba.birthAndDeathBn}
              </span>
            </div>

            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-emerald-800 dark:text-emerald-400 leading-tight">
                {activeSahaba.nameBn}
              </h1>
              <p className="font-arabic text-lg sm:text-2xl text-emerald-600 dark:text-emerald-300 text-right leading-loose font-medium">
                {activeSahaba.nameAr}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <span className="text-xs font-bold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span>উপাধি ও বিশেষ খ্যাতি: {activeSahaba.titleBn}</span>
              </span>
            </div>

            <p className="text-sm sm:text-base leading-relaxed opacity-95 font-medium pt-1">
              {activeSahaba.summaryBn}
            </p>
          </div>

          {/* ১. ইসলাম গ্রহণ ও প্রাথমিক ত্যাগ */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 ${
              isDay ? 'bg-emerald-50/70 border-emerald-200' : 'bg-[#0d2830] border-[#184552]'
            }`}
          >
            <strong className="text-emerald-700 dark:text-emerald-300 flex items-center gap-2 text-sm sm:text-base font-black">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>ইসলাম গ্রহণ ও প্রারম্ভিক আত্মত্যাগ:</span>
            </strong>
            <p className="text-xs sm:text-sm leading-relaxed opacity-95 font-medium whitespace-pre-line">
              {activeSahaba.islamAcceptanceBn}
            </p>
          </div>

          {/* ২. বিশেষ ফযিলত ও গুণাবলি */}
          <div className="space-y-3">
            <strong className="text-amber-600 dark:text-amber-400 flex items-center gap-2 text-sm sm:text-base font-black">
              <Star className="w-4 h-4 text-amber-500" />
              <span>বিশেষ ফযিলত, অবদান ও অনন্য গুণাবলি:</span>
            </strong>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeSahaba.keyVirtuesBn.map((virtue, vIdx) => (
                <div
                  key={vIdx}
                  className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                    isDay
                      ? 'bg-white border-slate-200 shadow-xs'
                      : 'bg-[#081b22] border-[#163a45]'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium leading-relaxed">
                    {virtue}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ৩. হৃদয়স্পর্শী ও আবেগময় ঐতিহাসিক ঘটনা */}
          {activeSahaba.emotionalStoriesBn && activeSahaba.emotionalStoriesBn.length > 0 && (
            <div className="space-y-4">
              <strong className="text-rose-600 dark:text-rose-400 flex items-center gap-2 text-sm sm:text-base font-black">
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500/20" />
                <span>হৃদয়স্পর্শী ও গভীর আবেগময় ঐতিহাসিক ঘটনা:</span>
              </strong>

              <div className="space-y-3">
                {activeSahaba.emotionalStoriesBn.map((storyItem, sIdx) => (
                  <div
                    key={sIdx}
                    className={`p-4 sm:p-5 rounded-2xl border space-y-2 relative overflow-hidden ${
                      isDay
                        ? 'bg-rose-50/50 border-rose-200'
                        : 'bg-gradient-to-br from-[#1b151b] via-[#16141c] to-[#0f171d] border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      <h4 className="text-xs sm:text-sm font-bold text-rose-700 dark:text-rose-300">
                        {storyItem.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed opacity-95 font-medium whitespace-pre-line pl-4 border-l-2 border-rose-500/30">
                      {storyItem.story}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ৪. সহিহ হাদিসে মর্যাদা ও রাসুল (সা.)-এর পবিত্র প্রশংসা */}
          {activeSahaba.hadithPraiseBn && activeSahaba.hadithPraiseBn.length > 0 && (
            <div
              className={`p-4 sm:p-6 rounded-2xl border space-y-3.5 ${
                isDay
                  ? 'bg-gradient-to-br from-emerald-50/90 to-teal-50/50 border-emerald-300'
                  : 'bg-gradient-to-br from-[#0c262a] via-[#091c22] to-[#061418] border-emerald-500/40'
              }`}
            >
              <strong className="text-emerald-700 dark:text-emerald-300 flex items-center gap-2 text-sm sm:text-base font-black">
                <Quote className="w-4 h-4 text-emerald-500" />
                <span>সহিহ হাদিসে তাঁর সুমহান মর্যাদা ও রাসুল (সা.)-এর পবিত্র বাণী:</span>
              </strong>

              <div className="space-y-3">
                {activeSahaba.hadithPraiseBn.map((h, hIdx) => (
                  <div
                    key={hIdx}
                    className="p-3.5 rounded-xl bg-white/85 dark:bg-[#06181b] border border-emerald-500/25 space-y-2"
                  >
                    {h.arabic && (
                      <p className="font-arabic text-sm sm:text-base text-right leading-loose text-emerald-800 dark:text-emerald-200 font-semibold">
                        {h.arabic}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm leading-relaxed opacity-95 font-medium italic">
                      "{h.textBn}"
                    </p>
                    <div className="pt-1">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono text-[11px] font-bold inline-block">
                        {h.source}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ৫. সংশ্লিষ্ট কুরআনের আয়াত (যদি থাকে) */}
          {activeSahaba.quranRefBn && activeSahaba.quranRefBn.length > 0 && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              <strong className="text-amber-700 dark:text-amber-300 flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>পবিত্র কুরআনের সংশ্লিষ্ট আয়াত:</span>
              </strong>

              <div className="space-y-2.5">
                {activeSahaba.quranRefBn.map((q, qIdx) => (
                  <div
                    key={qIdx}
                    className="p-3 rounded-xl bg-white/80 dark:bg-[#0d1f1c] border border-amber-500/20 space-y-1.5"
                  >
                    <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono text-[11px] font-bold">
                      {q.surah} • আয়াত: {q.verse}
                    </span>
                    {q.arabic && (
                      <p className="font-arabic text-sm sm:text-base text-right leading-loose text-amber-900 dark:text-amber-200 font-semibold pt-1">
                        {q.arabic}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm opacity-95 font-medium italic">
                      "{q.translationBn}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ৬. ওফাত বা শাহাদাতের করুণ বিবরণ */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border space-y-2 ${
              isDay ? 'bg-slate-100 border-slate-200' : 'bg-[#091b22] border-[#163943]'
            }`}
          >
            <strong className="text-slate-800 dark:text-slate-200 flex items-center gap-2 text-sm sm:text-base font-black">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>ওফাত / শাহাদাতের শেষ মুহূর্ত ও দাফন:</span>
            </strong>
            <p className="text-xs sm:text-sm leading-relaxed opacity-95 font-medium whitespace-pre-line">
              {activeSahaba.deathOrMartyrdomBn}
            </p>
          </div>

          {/* ৭. জীবন থেকে আমাদের শিক্ষা */}
          <div className="p-4 sm:p-5 rounded-2xl bg-teal-500/10 border border-teal-500/30 space-y-2.5">
            <strong className="text-teal-700 dark:text-teal-300 font-black flex items-center gap-2 text-sm sm:text-base">
              <Sparkles className="w-4 h-4 text-teal-500" />
              <span>জীবন থেকে শিক্ষণীয় বিষয় (Lessons for Life):</span>
            </strong>
            <div className="space-y-2">
              {activeSahaba.lessonsBn.map((lesson, lIdx) => (
                <div key={lIdx} className="flex items-start gap-2.5 opacity-95">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium">{lesson}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ৮. প্রামাণিক কিতাবের রেফারেন্স */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border space-y-2.5 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#081a20] border-[#163a44]'
            }`}
          >
            <strong className="text-amber-600 dark:text-amber-400 block text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <Bookmark className="w-4 h-4 text-amber-500" />
              <span>প্রামাণিক ঐতিহাসিক কিতাবের রেফারেন্স (Authentic Sources):</span>
            </strong>
            <div className="flex flex-wrap gap-2">
              {activeSahaba.referencesBn.map((ref, rIdx) => (
                <span
                  key={rIdx}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#051318] border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-teal-300 font-bold"
                >
                  📖 {ref}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Navigation Buttons: Prev / List / Next */}
          <div className="pt-4 flex items-center justify-between gap-3">
            <button
              disabled={!hasPrev}
              onClick={() => handleNavigateSahaba('prev')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-bold transition active:scale-95 ${
                hasPrev
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500 cursor-pointer shadow-md'
                  : 'opacity-40 border-slate-300 dark:border-slate-800 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>পূর্ববর্তী সাহাবি</span>
            </button>

            <button
              onClick={() => {
                setSelectedSahabaId(null);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="py-3 px-5 rounded-xl bg-slate-200 dark:bg-[#152a36] hover:bg-slate-300 dark:hover:bg-[#1c3847] text-xs font-bold transition cursor-pointer"
            >
              সূচিপত্র ও তালিকা
            </button>

            <button
              disabled={!hasNext}
              onClick={() => handleNavigateSahaba('next')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs font-bold transition active:scale-95 ${
                hasNext
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-500 cursor-pointer shadow-md'
                  : 'opacity-40 border-slate-300 dark:border-slate-800 cursor-not-allowed'
              }`}
            >
              <span>পরবর্তী সাহাবি</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. MAIN HAYATUS SAHABA VIEW (Table of Contents & Ranked Cards)
  // =========================================================================
  return (
    <div className="w-full space-y-5 pb-28 animate-in fade-in duration-300">
      {/* Top Header Bar */}
      <div
        className={`sticky top-0 z-40 text-white shadow-xl rounded-2xl px-3 sm:px-4 py-3 flex items-center justify-between gap-3 border transition-colors ${
          isDay
            ? 'bg-gradient-to-r from-[#005a3e] via-[#006747] to-[#007a52] border-emerald-600/40 shadow-[#006747]/20'
            : 'bg-gradient-to-r from-[#07191e] via-[#0b262d] to-[#10363e] border-[#163c46] shadow-black/60'
        }`}
      >
        <button
          onClick={() => {
            if (onBackToHub) onBackToHub();
            if (soundEnabled) soundHaptics.playTap();
          }}
          className="p-2 -ml-1 rounded-xl bg-white/10 hover:bg-white/25 active:scale-95 transition cursor-pointer flex items-center justify-center"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5 text-white stroke-[2.5]" />
        </button>

        <div className="flex-1 text-center truncate">
          <h2 className="text-sm sm:text-base font-black text-white tracking-wide drop-shadow-sm flex items-center justify-center gap-1.5 truncate">
            <span>📜</span>
            <span>হায়াতুস সাহাবা (Hayatus Sahaba)</span>
          </h2>
          <span className="text-[10px] text-emerald-300 font-semibold truncate block">
            সর্বোচ্চ জনপ্রিয় ও মর্যাদাবান {SAHABA_DATABASE.length} জন সাহাবির প্রামাণিক ত্যাগ ও ইতিহাস
          </span>
        </div>

        <button
          onClick={() => {
            setShowTocIndex(!showTocIndex);
            if (soundEnabled) soundHaptics.playTap();
          }}
          className="p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
          title="বইয়ের সূচিপত্র"
        >
          <ScrollText className="w-4 h-4 text-amber-300" />
          <span className="hidden sm:inline text-[11px]">
            {showTocIndex ? 'সূচিপত্র লুকান' : 'সূচিপত্র'}
          </span>
        </button>
      </div>

      {/* Main Intro Hero Banner */}
      <div
        className={`p-4 sm:p-6 rounded-2xl border shadow-xl relative overflow-hidden ${
          isDay
            ? 'bg-gradient-to-br from-amber-50 via-white to-emerald-50/90 border-amber-200/90 text-slate-900'
            : 'bg-gradient-to-br from-[#0c222b] via-[#081820] to-[#040e14] border-amber-500/25 text-white shadow-black/70'
        }`}
      >
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-black border border-amber-500/30 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            <span>প্রামাণিক নির্ভরযোগ্য সংকলন</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold border border-emerald-500/30">
            মোট {SAHABA_DATABASE.length} জন মর্যাদাবান সাহাবি ও সহিহ হাদিসের দলিল
          </span>
        </div>

        <h3 className="text-lg sm:text-xl font-black text-amber-700 dark:text-amber-400 mb-1.5 leading-snug">
          মর্যাদা ও জনপ্রিয়তার ক্রমানুসারে পূর্ণাঙ্গ সাহাবিদের জীবনী
        </h3>
        <p className="text-xs sm:text-sm opacity-90 leading-relaxed font-medium">
          যেকোনো সাহাবির কার্ড বা সূচিপত্রের লিংকে চাপ দিলে কোনো পপআপ বা মার্জিনের ফাঁকা জায়গা ছাড়া সরাসরি সম্পূর্ণ পৃষ্ঠাজুড়ে বিস্তারিত ইসলাম গ্রহণ, হৃদয়স্পর্শী ঘটনা, সাহসিকতা, সুন্নাহ ও সহিহ হাদিসের রেফারেন্সসমূহ পড়তে পারবেন।
        </p>

        {/* Quick Category Jump Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
          {SAHABA_CATEGORIES.map((cat) => {
            const count = sahabaByCategory[cat.key]?.length || 0;
            return (
              <button
                key={cat.key}
                onClick={() => {
                  setActiveCategoryFilter(cat.key);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`p-2.5 rounded-xl border text-left transition-all active:scale-95 cursor-pointer ${
                  activeCategoryFilter === cat.key
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                    : isDay
                    ? 'bg-white/90 hover:bg-emerald-50 border-amber-200 shadow-xs text-slate-800'
                    : 'bg-[#0e2733]/80 hover:bg-[#123342] border-[#1d485a] text-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-base">{cat.icon}</span>
                  <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                    {count}জন
                  </span>
                </div>
                <h5 className="text-[11px] font-black leading-tight line-clamp-1">
                  {cat.titleBn}
                </h5>
              </button>
            );
          })}
        </div>
      </div>

      {/* Book-Style Table of Contents (সূচিপত্র) - Exactly matching screenshot UI */}
      {showTocIndex && (
        <div
          className={`rounded-2xl border p-4 sm:p-5 transition-all duration-300 shadow-xl ${
            isDay
              ? 'bg-amber-50/80 border-amber-300 text-slate-800'
              : 'bg-[#0a1820] border-amber-500/35 text-slate-100 shadow-black/80'
          }`}
        >
          {/* Header of Table of Contents */}
          <div className="flex items-center justify-between border-b pb-2.5 mb-3 border-amber-300/50 dark:border-amber-500/25">
            <div className="flex items-center gap-2">
              <ScrollText className="w-5 h-5 text-amber-500" />
              <div>
                <h4 className="text-sm sm:text-base font-black text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                  <span>বইয়ের মূল সূচিপত্র (Table of Contents)</span>
                </h4>
                <p className="text-[10px] opacity-75 font-semibold">
                  যেকোনো সাহাবি স্পর্শ করে সম্পূর্ণ অধ্যায় পড়ুন
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowTocIndex(false)}
              className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 text-xs transition cursor-pointer"
              title="সূচিপত্র বন্ধ করুন"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Multi-Column Grid of Categories (Matching image_f28edfee.png layout) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-medium">
            {SAHABA_CATEGORIES.map((cat) => {
              const items = sahabaByCategory[cat.key] || [];
              if (items.length === 0) return null;
              return (
                <div
                  key={cat.key}
                  className={`p-3 rounded-xl border transition-colors ${
                    isDay ? 'bg-white/95 border-amber-200/90 shadow-xs' : 'bg-[#0f232e] border-[#1e4253]'
                  }`}
                >
                  <div
                    onClick={() => {
                      setActiveCategoryFilter(cat.key);
                      if (soundEnabled) soundHaptics.playTap();
                    }}
                    className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-amber-200/50 dark:border-slate-800 cursor-pointer group"
                  >
                    <span className="font-black text-amber-600 dark:text-amber-400 text-xs sm:text-sm group-hover:underline flex items-center gap-1.5">
                      <span>{cat.icon}</span>
                      <span>{cat.titleBn}</span>
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-600 dark:text-amber-400 font-bold">
                      {items.length}জন
                    </span>
                  </div>

                  <ul className="space-y-1 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin">
                    {items.map((s, idx) => (
                      <li
                        key={s.id}
                        onClick={() => {
                          setSelectedSahabaId(s.id);
                          if (soundEnabled) soundHaptics.playTap();
                        }}
                        className="flex items-center justify-between py-1 px-1 rounded-md hover:bg-emerald-500/10 cursor-pointer transition-colors group"
                      >
                        <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 group-hover:text-emerald-500 font-semibold truncate text-xs">
                          <span className="text-[10px] text-amber-500 font-mono font-bold">
                            {idx + 1}.
                          </span>
                          <span className="truncate">{s.nameBn}</span>
                        </span>
                        <span className="text-slate-400 text-[10px] shrink-0 ml-1">📖</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="সাহাবির নাম, উপাধি, হাদিস বা ঘটনা খুঁজুন..."
          className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-sm font-medium transition focus:outline-hidden ${
            isDay
              ? 'bg-white border-slate-300 focus:border-emerald-600 text-slate-900 shadow-xs'
              : 'bg-[#0a1f26] border-[#183d47] focus:border-emerald-400 text-white placeholder-slate-400'
          }`}
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white px-2 py-1 rounded-lg cursor-pointer"
          >
            ✕ মুছে ফেলুন
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => {
            setActiveCategoryFilter('all');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition border cursor-pointer ${
            activeCategoryFilter === 'all'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
              : isDay
              ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
              : 'bg-[#0a1e24] border-[#183e48] text-slate-300 hover:bg-[#112d36]'
          }`}
        >
          সকল সাহাবি ({SAHABA_DATABASE.length} জন)
        </button>
        {SAHABA_CATEGORIES.map((cat) => {
          const count = sahabaByCategory[cat.key]?.length || 0;
          const isSelected = activeCategoryFilter === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => {
                setActiveCategoryFilter(cat.key);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition border flex items-center gap-1 cursor-pointer ${
                isSelected
                  ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                  : isDay
                  ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                  : 'bg-[#0a1e24] border-[#183e48] text-slate-300 hover:bg-[#112d36]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>
                {cat.titleBn.split('.')[1]?.trim() || cat.titleBn} ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Sahaba Cards List */}
      <div className="space-y-3">
        {filteredSahaba.length === 0 ? (
          <div className="p-8 text-center rounded-2xl border border-dashed border-slate-400/30">
            <span className="text-3xl mb-2 block">🔍</span>
            <p className="text-sm font-bold opacity-75">কোনো সাহাবির তথ্য পাওয়া যায়নি।</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategoryFilter('all');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer"
            >
              ফিল্টার রিসেট করুন
            </button>
          </div>
        ) : (
          filteredSahaba.map((sahaba) => {
            return (
              <div
                key={sahaba.id}
                onClick={() => {
                  setSelectedSahabaId(sahaba.id);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer active:scale-99 hover:shadow-lg relative overflow-hidden group ${
                  isDay
                    ? 'bg-white hover:bg-emerald-50/40 border-slate-200 text-slate-900 shadow-xs'
                    : 'bg-[#091f26] hover:bg-[#0d2a33] border-[#153e48] text-white shadow-black/50'
                }`}
              >
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center font-mono text-xs font-black">
                      #{sahaba.rank}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold border border-emerald-500/25">
                      {sahaba.categoryBn}
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                    {sahaba.birthAndDeathBn.split('|')[1]?.trim() || sahaba.birthAndDeathBn}
                  </span>
                </div>

                {/* Name & Title */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-emerald-800 dark:text-emerald-400 group-hover:text-emerald-600 transition">
                      {sahaba.nameBn}
                    </h3>
                    <p className="text-xs font-bold text-amber-700 dark:text-amber-300">
                      {sahaba.titleBn}
                    </p>
                  </div>
                  <p className="font-arabic text-sm text-right text-emerald-600/80 dark:text-emerald-300/80 shrink-0 font-medium hidden sm:block">
                    {sahaba.nameAr}
                  </p>
                </div>

                {/* Summary */}
                <p className="text-xs sm:text-sm opacity-90 leading-relaxed font-medium mt-2 line-clamp-2">
                  {sahaba.summaryBn}
                </p>

                {/* Bottom Highlights & Read CTA */}
                <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 overflow-hidden text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span className="truncate">
                      📖 {sahaba.referencesBn[0] || 'হায়াতুস সাহাবা'}
                    </span>
                    {sahaba.emotionalStoriesBn[0] && (
                      <>
                        <span>•</span>
                        <span className="text-rose-500 font-semibold truncate flex items-center gap-1">
                          <Heart className="w-3 h-3 inline" />
                          {sahaba.emotionalStoriesBn[0]?.title}
                        </span>
                      </>
                    )}
                  </div>

                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 shrink-0 group-hover:translate-x-1 transition">
                    <span>পূর্ণ জীবনী পড়ুন</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
