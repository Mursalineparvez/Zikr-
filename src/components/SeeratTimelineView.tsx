/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  Calendar,
  MapPin,
  ChevronRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Bookmark,
  Compass,
  ArrowRight,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { SeeratAgeItem, SEERAT_PHASES, SeeratPhaseKey } from '../data/seeratData';
import { getLocationForAge } from '../data/seeratLocations';

interface SeeratTimelineViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  items: SeeratAgeItem[];
  bookmarkedAges: number[];
  completedAges: number[];
  onSelectAge: (age: number) => void;
  onOpenLocationMap: (locationId: string) => void;
}

export const SeeratTimelineView: React.FC<SeeratTimelineViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
  items,
  bookmarkedAges,
  completedAges,
  onSelectAge,
  onOpenLocationMap,
}) => {
  const isDay = themeMode === 'day';
  const lang = selectedLanguage || 'bn';
  const isBn = lang === 'bn';
  const isAr = lang === 'ar';

  return (
    <div className="relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-5 before:top-4 before:bottom-4 before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-teal-500 before:to-amber-500">
      {items.map((item, index) => {
        const isCompleted = completedAges.includes(item.age);
        const isBookmarked = bookmarkedAges.includes(item.age);
        const title = isAr && item.titleAr ? item.titleAr : isBn ? item.titleBn : item.titleEn;
        const locationStr = isBn ? item.locationBn : item.locationEn;
        const phaseMeta = SEERAT_PHASES.find((p) => p.key === item.phaseKey);
        const locGeo = getLocationForAge(item.age);
        const highlights = isBn ? item.highlightsBn : item.highlightsEn;

        // Check if this is the first item of a phase to render an era banner
        const isPhaseStart =
          index === 0 || items[index - 1].phaseKey !== item.phaseKey;

        return (
          <div key={item.age} className="space-y-4">
            {/* Era Milestone Banner */}
            {isPhaseStart && phaseMeta && (
              <div className="relative -ml-6 sm:-ml-10 pt-4 pb-2">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl border shadow-sm font-extrabold text-xs sm:text-sm ${
                    isDay
                      ? 'bg-emerald-100/90 border-emerald-300 text-emerald-950'
                      : 'bg-[#0a2f26] border-emerald-600/60 text-emerald-100 shadow-emerald-950/50'
                  }`}
                >
                  <span className="text-base">{phaseMeta.icon}</span>
                  <span>{isAr ? phaseMeta.titleAr : isBn ? phaseMeta.titleBn : phaseMeta.titleEn}</span>
                  <span className="text-[10px] opacity-75 font-mono px-2 py-0.5 rounded-full bg-emerald-500/20">
                    {phaseMeta.ageRange}
                  </span>
                </div>
              </div>
            )}

            {/* Timeline Item Card */}
            <div className="relative group">
              {/* Circular Node on the Timeline Spine */}
              <div
                className={`absolute -left-6 sm:-left-10 top-5 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center font-mono font-bold text-[10px] sm:text-xs z-10 transition-transform group-hover:scale-110 shadow-md ${
                  isCompleted
                    ? 'bg-emerald-500 border-white text-white'
                    : isDay
                    ? 'bg-white border-emerald-500 text-emerald-700'
                    : 'bg-[#061b17] border-emerald-400 text-emerald-300'
                }`}
              >
                {isCompleted ? '✓' : item.age}
              </div>

              {/* Content Box */}
              <div
                className={`rounded-2xl p-4 sm:p-5 border transition-all shadow-sm group-hover:shadow-md ${
                  isDay
                    ? 'bg-white hover:bg-slate-50/80 border-slate-200/90 hover:border-emerald-400'
                    : 'bg-[#061b17] hover:bg-[#092621] border-emerald-800/40 hover:border-emerald-600/60 text-white'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-emerald-800/40">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                      {isBn ? 'বয়স:' : 'Age:'} {item.age} {isBn ? 'বছর' : 'Years'}
                    </span>
                    <span className="text-slate-500 dark:text-emerald-300/80 font-semibold flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{item.yearCE} CE ({item.yearHijri})</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <button
                      onClick={() => onOpenLocationMap(locGeo.id)}
                      className="flex items-center gap-1 text-slate-500 dark:text-emerald-300 hover:text-emerald-600 dark:hover:text-emerald-200 transition cursor-pointer text-[11px] font-medium"
                      title="View Location on Map"
                    >
                      <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span className="underline decoration-dotted">{locationStr}</span>
                    </button>

                    {isBookmarked && (
                      <Bookmark className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                    )}
                  </div>
                </div>

                {/* Chapter Title & Arabic */}
                <div className="py-2 space-y-1">
                  <h3
                    onClick={() => {
                      if (soundEnabled) soundHaptics.playTap();
                      onSelectAge(item.age);
                    }}
                    className="text-base sm:text-lg font-black text-slate-900 dark:text-white cursor-pointer hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors leading-snug"
                  >
                    {title}
                  </h3>
                  {item.titleAr && (
                    <p className="font-arabic text-sm text-emerald-600 dark:text-emerald-400 font-bold" dir="rtl">
                      {item.titleAr}
                    </p>
                  )}
                </div>

                {/* Highlights List */}
                <ul className="text-xs text-slate-600 dark:text-emerald-100/80 space-y-1 pt-1 pb-3">
                  {highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5 leading-relaxed">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                {/* Card Action Bar */}
                <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-emerald-800/40 text-xs font-bold">
                  <button
                    onClick={() => onOpenLocationMap(locGeo.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                      isDay
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                        : 'bg-[#09221d] hover:bg-[#0c2e27] text-emerald-300 border-emerald-800/60'
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5 text-emerald-500" />
                    <span>{isBn ? 'মানচিত্রে স্থান' : 'Map View'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (soundEnabled) soundHaptics.playTap();
                      onSelectAge(item.age);
                    }}
                    className="flex items-center gap-1 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition active:scale-95 cursor-pointer"
                  >
                    <span>{isBn ? 'পূর্ণাঙ্গ অধ্যায় পড়ুন' : 'Read Chapter'}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SeeratTimelineView;
