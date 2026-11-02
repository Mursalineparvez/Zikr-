/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  BookOpen,
  Calendar,
  Sparkles,
  Search,
  ChevronRight,
  ChevronLeft,
  X,
  Compass,
  ArrowLeft,
  Copy,
  Heart,
  ScrollText,
  MapPin,
  Check,
  Award,
  Layers,
  Clock,
  ShieldCheck,
  Quote,
  Feather,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import {
  SeeratAgeItem,
  SeeratPhaseKey,
  SEERAT_PHASES,
  SEERAT_DATABASE,
  SEERAT_UI,
} from '../data/seeratData';

interface SeeratUnNabiViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  onBackToHub?: () => void;
}

export const SeeratUnNabiView: React.FC<SeeratUnNabiViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
  onBackToHub,
}) => {
  const isDay = themeMode === 'day';
  const lang = selectedLanguage || 'bn';

  // Helper for safe UI localization
  const t = (key: string): string => {
    const dict = SEERAT_UI[key];
    if (!dict) return '';
    return dict[lang] || dict['en'] || dict['bn'] || '';
  };

  const [selectedAge, setSelectedAge] = useState<number | null>(null);
  const [activePhaseFilter, setActivePhaseFilter] = useState<SeeratPhaseKey | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTocIndex, setShowTocIndex] = useState(true);
  const [copiedChapter, setCopiedChapter] = useState(false);

  const [, startTransition] = React.useTransition();

  const handleSelectAge = (age: number | null) => {
    if (soundEnabled) soundHaptics.playTap();
    startTransition(() => {
      setSelectedAge(age);
    });
  };

  // Scroll to top on changing chapter
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [selectedAge]);

  const activeItem = useMemo(() => {
    if (selectedAge === null) return null;
    return SEERAT_DATABASE.find((item) => item.age === selectedAge) || null;
  }, [selectedAge]);

  // Group ages by the 6 key historical phases for the Book TOC
  const agesByPhase = useMemo(() => {
    const map: Record<SeeratPhaseKey, SeeratAgeItem[]> = {
      infancy_childhood: [],
      youth_preprophetic: [],
      makki_prophetic: [],
      madani_early: [],
      madani_battles: [],
      madani_victory_farewell: [],
    };

    SEERAT_DATABASE.forEach((item) => {
      if (map[item.phaseKey]) {
        map[item.phaseKey].push(item);
      }
    });

    return map;
  }, []);

  // Filtered age items based on search and phase
  const filteredAges = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return SEERAT_DATABASE.filter((item) => {
      const matchesPhase = activePhaseFilter === 'all' || item.phaseKey === activePhaseFilter;
      if (!matchesPhase) return false;

      if (!query) return true;

      const ageStr = String(item.age);
      const yearStr = String(item.yearCE);
      const titleBn = item.titleBn.toLowerCase();
      const titleEn = item.titleEn.toLowerCase();
      const titleAr = (item.titleAr || '').toLowerCase();
      const locBn = item.locationBn.toLowerCase();
      const locEn = item.locationEn.toLowerCase();
      const highlights = [...item.highlightsBn, ...item.highlightsEn].join(' ').toLowerCase();

      return (
        ageStr.includes(query) ||
        yearStr.includes(query) ||
        titleBn.includes(query) ||
        titleEn.includes(query) ||
        titleAr.includes(query) ||
        locBn.includes(query) ||
        locEn.includes(query) ||
        highlights.includes(query)
      );
    });
  }, [activePhaseFilter, searchQuery]);

  // Copy full chapter text to clipboard
  const handleCopyChapter = () => {
    if (!activeItem) return;
    const isBn = lang === 'bn';
    const isAr = lang === 'ar';
    const title = isAr && activeItem.titleAr ? activeItem.titleAr : isBn ? activeItem.titleBn : activeItem.titleEn;
    const loc = isBn ? activeItem.locationBn : activeItem.locationEn;
    const narrative = isBn ? activeItem.historicalNarrativeBn : activeItem.historicalNarrativeEn;
    const emotional = isBn ? activeItem.emotionalStoryBn : activeItem.emotionalStoryEn;

    let text = `📜 ${title}\n📅 ${isBn ? 'বয়স:' : 'Age:'} ${activeItem.age} ${isBn ? 'বছর' : 'Years'} (${activeItem.yearCE} CE | ${activeItem.yearHijri})\n📍 ${isBn ? 'স্থান:' : 'Location:'} ${loc}\n\n`;
    text += `${isBn ? 'পূর্ণাঙ্গ ইতিহাস:' : 'Historical Chronicle:'}\n${narrative}\n\n`;
    text += `${isBn ? 'হৃদয়স্পর্শী ঘটনা:' : 'Heart-Touching Moments:'}\n${emotional}\n\n`;

    if (activeItem.hadithRef) {
      text += `${isBn ? 'হাদিস শরিফ:' : 'Hadith:'} (${activeItem.hadithRef.source}) - ${isBn ? activeItem.hadithRef.textBn : activeItem.hadithRef.textEn}\n\n`;
    }

    text += `- Zikr+ App (zikrplus.app)`;

    navigator.clipboard.writeText(text);
    setCopiedChapter(true);
    if (soundEnabled) soundHaptics.playTargetChime();
    setTimeout(() => setCopiedChapter(false), 2000);
  };

  // =========================================================================
  // CHAPTER READER VIEW (DETAILED BIOGRAPHY FOR A SPECIFIC AGE)
  // =========================================================================
  if (activeItem) {
    const isBn = lang === 'bn';
    const isAr = lang === 'ar';
    const title = isAr && activeItem.titleAr ? activeItem.titleAr : isBn ? activeItem.titleBn : activeItem.titleEn;
    const phaseName = isAr
      ? SEERAT_PHASES.find((p) => p.key === activeItem.phaseKey)?.titleAr || activeItem.phaseNameEn
      : isBn
      ? activeItem.phaseNameBn
      : activeItem.phaseNameEn;
    const location = isBn ? activeItem.locationBn : activeItem.locationEn;
    const highlights = isBn ? activeItem.highlightsBn : activeItem.highlightsEn;
    const narrative = isBn ? activeItem.historicalNarrativeBn : activeItem.historicalNarrativeEn;
    const emotional = isBn ? activeItem.emotionalStoryBn : activeItem.emotionalStoryEn;
    const lessons = isBn ? activeItem.lessonsBn : activeItem.lessonsEn;

    const hasPrev = activeItem.age > 1;
    const hasNext = activeItem.age < 63;

    return (
      <div className="w-full space-y-4 pb-28 animate-in fade-in duration-300">
        {/* Sticky Top Header Navigation */}
        <div
          className={`sticky top-0 z-40 text-white shadow-xl rounded-2xl px-3 sm:px-4 py-3 flex items-center justify-between gap-2 border transition-colors ${
            isDay
              ? 'bg-gradient-to-r from-emerald-700 via-teal-800 to-emerald-900 border-emerald-600/40 shadow-emerald-900/20'
              : 'bg-gradient-to-r from-[#071d18] via-[#0b2b24] to-[#0f3b31] border-emerald-500/30 shadow-black/60'
          }`}
        >
          <button
            onClick={() => handleSelectAge(null)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 transition text-xs font-bold shrink-0 cursor-pointer border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('backToToc')}</span>
          </button>

          <div className="text-center min-w-0 flex-1 px-1">
            <span className="text-[10px] sm:text-xs text-emerald-200 block truncate font-medium">
              {phaseName} ({activeItem.yearCE} CE)
            </span>
            <h2 className="text-sm sm:text-base font-extrabold text-white truncate">
              {t('ageLabel')} {activeItem.age} {isBn ? 'বছর' : 'Years'} — {title}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleCopyChapter}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white/15 hover:bg-white/25 active:scale-95 transition text-xs font-bold flex items-center gap-1 cursor-pointer border border-white/20"
              title={t('copySummary')}
            >
              {copiedChapter ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span className="hidden sm:inline text-emerald-200 font-bold">{t('copiedNotice')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">{t('copySummary')}</span>
                </>
              )}
            </button>

            <button
              onClick={() => handleSelectAge(null)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Primary Chapter Content Card */}
        <article
          className={`rounded-3xl p-5 sm:p-8 border shadow-lg space-y-6 ${
            isDay ? 'bg-white border-slate-200/90 text-slate-900' : 'bg-[#061b17] border-emerald-800/40 text-emerald-50'
          }`}
        >
          {/* Header Metadata Section */}
          <div className="space-y-3 pb-5 border-b border-slate-200 dark:border-emerald-800/40">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wide border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                {phaseName} · {t('ageLabel')} {activeItem.age} {isBn ? 'বছর' : 'Years'}
              </span>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-emerald-300/80">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{activeItem.yearCE} CE ({activeItem.yearHijri})</span>
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{location}</span>
                </span>
              </div>
            </div>

            {/* Title & Arabic Honorific */}
            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
                {title}
              </h1>
              {activeItem.titleAr && (
                <p className="font-arabic text-lg sm:text-xl text-emerald-700 dark:text-emerald-300/90 font-bold" dir="rtl">
                  {activeItem.titleAr}
                </p>
              )}
            </div>
          </div>

          {/* 1. Key Highlights / Milestones */}
          <div
            className={`rounded-2xl p-4 sm:p-5 border transition-all ${
              isDay
                ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-950'
                : 'bg-[#092620]/90 border-emerald-700/50 text-emerald-100'
            }`}
          >
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 text-emerald-700 dark:text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t('keyHighlights')}</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:text-emerald-400 mt-2 shrink-0" />
                  <span className="leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Detailed Historical Narrative */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-slate-900 dark:text-white pb-1 border-b border-slate-200 dark:border-emerald-800/40">
              <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t('narrativeTitle')}</span>
            </div>
            <div className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-emerald-100/90 whitespace-pre-line font-serif space-y-3">
              {narrative}
            </div>
          </div>

          {/* 3. Heart-Touching Moments & Moral Exemplar */}
          {emotional && (
            <div
              className={`rounded-2xl p-4 sm:p-6 border relative overflow-hidden ${
                isDay
                  ? 'bg-amber-50/80 border-amber-200/80 text-amber-950'
                  : 'bg-[#1a1c12]/90 border-amber-700/50 text-amber-100'
              }`}
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 text-amber-700 dark:text-amber-300">
                <Heart className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>{t('emotionalStoryTitle')}</span>
              </div>
              <p className="text-xs sm:text-sm sm:leading-relaxed leading-normal italic whitespace-pre-line">
                "{emotional}"
              </p>
            </div>
          )}

          {/* 4. Divine Quranic Reference */}
          {activeItem.quranRef && (
            <div
              className={`rounded-2xl p-4 sm:p-5 border space-y-2 ${
                isDay
                  ? 'bg-teal-50/70 border-teal-200/80 text-teal-950'
                  : 'bg-[#082224]/90 border-teal-700/50 text-teal-100'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-teal-700 dark:text-teal-300">
                <span className="flex items-center gap-1.5 uppercase tracking-wider">
                  <ScrollText className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>{t('quranReferenceTitle')}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-500/15 border border-teal-500/30">
                  {isBn ? 'সূরা' : 'Surah'} {activeItem.quranRef.surah} : {activeItem.quranRef.ayah}
                </span>
              </div>
              {activeItem.quranRef.arabic && (
                <p className="font-arabic text-base sm:text-lg text-teal-800 dark:text-teal-200 text-right leading-loose pt-1" dir="rtl">
                  {activeItem.quranRef.arabic}
                </p>
              )}
              <p className="text-xs sm:text-sm leading-relaxed italic text-slate-700 dark:text-teal-100/90">
                "{isBn ? activeItem.quranRef.meaningBn : activeItem.quranRef.meaningEn}"
              </p>
            </div>
          )}

          {/* 5. Authentic Hadith Reference */}
          {activeItem.hadithRef && (
            <div
              className={`rounded-2xl p-4 sm:p-5 border space-y-2 ${
                isDay
                  ? 'bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-[#0c1815] border-emerald-900/60 text-emerald-100'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <span className="flex items-center gap-1.5 uppercase tracking-wider">
                  <Quote className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('hadithReferenceTitle')}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                  {activeItem.hadithRef.source}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-emerald-400/80 font-medium">
                {isBn ? 'বর্ণনাকারী:' : 'Narrator:'} {activeItem.hadithRef.narrator}
              </p>
              <p className="text-xs sm:text-sm leading-relaxed italic">
                "{isBn ? activeItem.hadithRef.textBn : activeItem.hadithRef.textEn}"
              </p>
            </div>
          )}

          {/* 6. Enduring Lessons for the Ummah */}
          {lessons.length > 0 && (
            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-emerald-300">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t('lessonsTitle')}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                {lessons.map((les, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-start gap-2 ${
                      isDay
                        ? 'bg-slate-50/80 border-slate-200/90 text-slate-800'
                        : 'bg-[#09221d] border-emerald-800/40 text-emerald-100'
                    }`}
                  >
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 shrink-0">✓</span>
                    <span>{les}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Prev / Next Navigation Footer */}
          <div className="pt-6 border-t border-slate-200 dark:border-emerald-800/40 flex items-center justify-between gap-2">
            <button
              disabled={!hasPrev}
              onClick={() => handleSelectAge(activeItem.age - 1)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition active:scale-95 cursor-pointer ${
                hasPrev
                  ? 'bg-slate-100 dark:bg-emerald-900/40 hover:bg-slate-200 dark:hover:bg-emerald-800/50 text-slate-800 dark:text-white border border-slate-300 dark:border-emerald-700/50'
                  : 'opacity-40 cursor-not-allowed text-slate-400'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t('prevAge')} ({activeItem.age - 1})</span>
            </button>

            <button
              onClick={() => handleSelectAge(null)}
              className="px-4 py-2.5 rounded-2xl text-xs font-bold transition active:scale-95 cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
            >
              {t('backToToc')}
            </button>

            <button
              disabled={!hasNext}
              onClick={() => handleSelectAge(activeItem.age + 1)}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition active:scale-95 cursor-pointer ${
                hasNext
                  ? 'bg-slate-100 dark:bg-emerald-900/40 hover:bg-slate-200 dark:hover:bg-emerald-800/50 text-slate-800 dark:text-white border border-slate-300 dark:border-emerald-700/50'
                  : 'opacity-40 cursor-not-allowed text-slate-400'
              }`}
            >
              <span>{t('nextAge')} ({activeItem.age + 1})</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </article>
      </div>
    );
  }

  // =========================================================================
  // MAIN SEERAT-UN-NABI HUB VIEW (BOOK TOC + AGE CARDS + SEARCH)
  // =========================================================================
  const isBn = lang === 'bn';
  const isAr = lang === 'ar';

  return (
    <div className="w-full space-y-5 animate-in fade-in duration-300">
      {/* Top Hero Banner */}
      <div
        className={`rounded-3xl p-5 sm:p-7 border relative overflow-hidden transition-all shadow-md ${
          isDay
            ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-amber-50/50 border-emerald-200/90 text-slate-900'
            : 'bg-gradient-to-br from-[#061b17] via-[#092b23] to-[#122e26] border-emerald-800/50 text-white'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-extrabold border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('headerBadge')}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>৬৩টি পূর্ণাঙ্গ অধ্যায়</span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              {t('mainTitle')}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-emerald-200/80 max-w-2xl leading-relaxed">
              {t('subTitle')}
            </p>
          </div>

          {/* Quick Counter Badges */}
          <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={() => setShowTocIndex((prev) => !prev)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition active:scale-95 cursor-pointer border shadow-sm ${
                showTocIndex
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : isDay
                  ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                  : 'bg-[#09221d] text-emerald-200 border-emerald-700/60 hover:bg-[#0f342c]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{t('tocTitle')}</span>
            </button>

            {onBackToHub && (
              <button
                onClick={onBackToHub}
                className={`p-2.5 rounded-2xl text-xs font-bold border transition cursor-pointer active:scale-95 ${
                  isDay
                    ? 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                    : 'bg-[#09221d] text-emerald-300 border-emerald-800/60 hover:bg-[#0f342c]'
                }`}
                title="Back to Hub"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 6 Historical Era Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-5">
          {SEERAT_PHASES.map((phase) => {
            const isPhaseActive = activePhaseFilter === phase.key;
            const phaseTitle = isAr ? phase.titleAr : isBn ? phase.titleBn : phase.titleEn;

            return (
              <button
                key={phase.key}
                onClick={() => {
                  if (soundEnabled) soundHaptics.playTap();
                  setActivePhaseFilter(isPhaseActive ? 'all' : phase.key);
                }}
                className={`p-2.5 sm:p-3 rounded-2xl border text-left transition-all active:scale-95 cursor-pointer flex flex-col justify-between ${
                  isPhaseActive
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-400/50'
                    : isDay
                    ? 'bg-white/80 hover:bg-white border-slate-200/90 text-slate-800'
                    : 'bg-[#061e1a]/80 hover:bg-[#092621] border-emerald-800/40 text-emerald-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span className="text-base">{phase.icon}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                      isPhaseActive
                        ? 'bg-white/20 text-white'
                        : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    }`}
                  >
                    {phase.count}টি
                  </span>
                </div>
                <span className="text-xs font-extrabold line-clamp-2 leading-tight">
                  {phaseTitle}
                </span>
                <span className="text-[10px] opacity-75 mt-1 font-semibold">{phase.ageRange}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Book-Style Table of Contents (TOC) - Collapsible / Expandable Grid */}
      {showTocIndex && (
        <div
          className={`rounded-3xl p-5 sm:p-6 border transition-all space-y-4 shadow-sm ${
            isDay ? 'bg-amber-50/40 border-amber-200/80 text-slate-900' : 'bg-[#061b17] border-emerald-800/40 text-white'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-amber-200/60 dark:border-emerald-800/40">
            <div className="flex items-center gap-2">
              <span className="text-xl">📖</span>
              <div>
                <h2 className="text-base sm:text-lg font-black text-amber-900 dark:text-amber-300">
                  {t('tocTitle')}
                </h2>
                <p className="text-xs text-slate-500 dark:text-emerald-300/70 font-medium">
                  {t('tocHint')}
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowTocIndex(false)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
              title="Close TOC"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 6 Era Columns of Book Table of Contents */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {SEERAT_PHASES.map((phase) => {
              const phaseAges = agesByPhase[phase.key] || [];
              const phaseTitle = isAr ? phase.titleAr : isBn ? phase.titleBn : phase.titleEn;

              return (
                <div
                  key={phase.key}
                  className={`rounded-2xl p-3.5 border flex flex-col justify-start transition-all ${
                    isDay
                      ? 'bg-white border-amber-200/90 shadow-xs'
                      : 'bg-[#08221d] border-emerald-700/50 shadow-xs'
                  }`}
                >
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-emerald-800/40 mb-2">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-base">{phase.icon}</span>
                      <h3 className="text-xs sm:text-sm font-extrabold text-amber-900 dark:text-amber-300 truncate">
                        {phaseTitle}
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 shrink-0">
                      {phaseAges.length}টি বছর
                    </span>
                  </div>

                  {/* List of Ages in this Era */}
                  <div className="space-y-1 max-h-60 overflow-y-auto scrollbar-thin pr-1">
                    {phaseAges.map((item) => {
                      const itemTitle = isAr && item.titleAr ? item.titleAr : isBn ? item.titleBn : item.titleEn;

                      return (
                        <button
                          key={item.age}
                          onClick={() => handleSelectAge(item.age)}
                          className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs transition flex items-center justify-between gap-1.5 active:scale-95 cursor-pointer ${
                            isDay
                              ? 'hover:bg-amber-50 text-slate-800'
                              : 'hover:bg-[#0c2e27] text-emerald-100'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-mono font-extrabold text-amber-600 dark:text-amber-400 text-xs shrink-0">
                              {item.age}.
                            </span>
                            <span className="truncate font-semibold">{itemTitle}</span>
                          </div>
                          <span className="text-[10px] opacity-60 text-slate-400 shrink-0">
                            {item.yearCE}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Search & Era Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className={`w-full pl-9 pr-8 py-2.5 rounded-2xl text-xs sm:text-sm font-medium border transition-colors outline-none ${
              isDay
                ? 'bg-white border-slate-300 text-slate-900 focus:border-emerald-500 shadow-xs'
                : 'bg-[#061b17] border-emerald-800/60 text-emerald-100 placeholder:text-emerald-500/60 focus:border-emerald-500 shadow-xs'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none py-1">
          <button
            onClick={() => {
              if (soundEnabled) soundHaptics.playTap();
              setActivePhaseFilter('all');
            }}
            className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer border ${
              activePhaseFilter === 'all'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                : isDay
                ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                : 'bg-[#09221d] text-emerald-300 border-emerald-800/60 hover:bg-[#0f342c]'
            }`}
          >
            {t('allAges')}
          </button>

          {SEERAT_PHASES.map((phase) => (
            <button
              key={phase.key}
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setActivePhaseFilter(phase.key);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer border ${
                activePhaseFilter === phase.key
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : isDay
                  ? 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  : 'bg-[#09221d] text-emerald-300 border-emerald-800/60 hover:bg-[#0f342c]'
              }`}
            >
              <span>{phase.icon}</span>{' '}
              <span>{phase.ageRange}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid of All Filtered Age Chapters (Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredAges.map((item) => {
          const itemTitle = isAr && item.titleAr ? item.titleAr : isBn ? item.titleBn : item.titleEn;
          const phaseMeta = SEERAT_PHASES.find((p) => p.key === item.phaseKey);
          const location = isBn ? item.locationBn : item.locationEn;

          return (
            <div
              key={item.age}
              onClick={() => handleSelectAge(item.age)}
              className={`rounded-2xl p-4 border transition-all cursor-pointer active:scale-98 flex flex-col justify-between group ${
                isDay
                  ? 'bg-white hover:bg-slate-50/90 border-slate-200/90 shadow-sm hover:border-emerald-500/50'
                  : 'bg-[#061b17] hover:bg-[#092621] border-emerald-800/40 hover:border-emerald-500/50 text-white shadow-sm'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 shadow-xs">
                      {item.age}
                    </span>
                    <span className="font-bold text-[11px] text-emerald-700 dark:text-emerald-300">
                      {t('ageLabel')} {item.age} {isBn ? 'বছর' : 'Years'}
                    </span>
                  </div>

                  <span className="text-[10px] font-semibold text-slate-500 dark:text-emerald-400/80">
                    {item.yearCE} CE ({item.yearHijri})
                  </span>
                </div>

                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
                  {itemTitle}
                </h3>

                <p className="text-xs text-slate-500 dark:text-emerald-300/70 flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="truncate">{location}</span>
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-emerald-800/40 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span className="text-[11px] opacity-75 font-medium truncate max-w-[180px]">
                  {phaseMeta ? (isAr ? phaseMeta.titleAr : isBn ? phaseMeta.titleBn : phaseMeta.titleEn) : ''}
                </span>
                <span className="flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                  <span>{isBn ? 'অধ্যায় পড়ুন' : 'Read Chapter'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filteredAges.length === 0 && (
        <div className="text-center py-12 space-y-2">
          <span className="text-3xl">🔍</span>
          <p className="text-sm font-bold text-slate-500 dark:text-emerald-300">
            {isBn ? 'কোনো অধ্যায় পাওয়া যায়নি।' : 'No chapters matched your search query.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SeeratUnNabiView;
