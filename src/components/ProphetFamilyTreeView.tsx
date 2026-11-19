/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
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

interface ProphetFamilyTreeViewProps {
  themeMode: ThemeMode;
  selectedLanguage: ZikrLanguage;
  soundEnabled?: boolean;
  visitedEvents: Record<number, boolean>;
  onSelectMemberForReader: (memberNo: number) => void;
  onPlayTap?: () => void;
}

type TreeBranchFilter = 'all' | 'ancestors' | 'wives' | 'descendants';

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
const toBn = (n: number): string => String(n).replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);

// Clean display name by removing leading "০১. " or "01. " prefix
const cleanName = (raw: string): string => raw.replace(/^[\d০-৯]+\.\s*/, '').trim();

export const ProphetFamilyTreeView: React.FC<ProphetFamilyTreeViewProps> = ({
  themeMode,
  selectedLanguage,
  visitedEvents,
  onSelectMemberForReader,
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

  const selectedMember = selectedMemberNo ? memberMap.get(selectedMemberNo) ?? null : null;

  const queryLower = searchQuery.trim().toLowerCase();
  const matchingNos = useMemo(() => {
    if (!queryLower) return null;
    const set = new Set<number>();
    FAMILY_EVENTS.forEach((ev) => {
      const hay = `${ev.titleBn} ${ev.titleEn} ${ev.timeContextBn} ${ev.timeContextEn} ${ev.locationBn} ${ev.locationEn}`.toLowerCase();
      if (hay.includes(queryLower)) set.add(ev.no);
    });
    return set;
  }, [queryLower]);

  const handleNodeClick = (no: number) => {
    if (onPlayTap) onPlayTap();
    setSelectedMemberNo((prev) => (prev === no ? null : no));
  };

  // Reusable Family Member Node Card inside the Genealogy Tree
  const renderMemberNode = (
    no: number,
    options?: {
      roleBn?: string;
      roleEn?: string;
      accent?: 'emerald' | 'amber' | 'violet' | 'blue' | 'teal' | 'rose' | 'indigo';
      compact?: boolean;
      highlightDirect?: boolean;
    }
  ) => {
    const member = memberMap.get(no);
    if (!member) return null;

    const isSelected = selectedMemberNo === no;
    const isVisited = Boolean(visitedEvents[no]);
    const isMatched = matchingNos ? matchingNos.has(no) : true;
    const accent = options?.accent ?? 'emerald';
    const compact = options?.compact ?? false;

    const displayName = cleanName(isBn ? member.titleBn : member.titleEn);
    const roleLabel = isBn
      ? options?.roleBn || partMap.get(member.partNo)?.categoryBn
      : options?.roleEn || partMap.get(member.partNo)?.categoryEn;

    const accentTokens: Record<
      'emerald' | 'amber' | 'violet' | 'blue' | 'teal' | 'rose' | 'indigo',
      { border: string; badge: string; dot: string; activeRing: string }
    > = {
      emerald: {
        border: isDay
          ? 'border-emerald-200/90 hover:border-emerald-500'
          : 'border-emerald-700/60 hover:border-emerald-400',
        badge: isDay ? 'text-emerald-700' : 'text-emerald-300',
        dot: 'bg-emerald-500',
        activeRing: 'ring-2 ring-emerald-500 border-emerald-500',
      },
      amber: {
        border: isDay
          ? 'border-amber-200/90 hover:border-amber-500'
          : 'border-amber-700/60 hover:border-amber-400',
        badge: isDay ? 'text-amber-700' : 'text-amber-300',
        dot: 'bg-amber-500',
        activeRing: 'ring-2 ring-amber-500 border-amber-500',
      },
      violet: {
        border: isDay
          ? 'border-violet-200/90 hover:border-violet-500'
          : 'border-violet-700/55 hover:border-violet-400',
        badge: isDay ? 'text-violet-700' : 'text-violet-300',
        dot: 'bg-violet-500',
        activeRing: 'ring-2 ring-violet-500 border-violet-500',
      },
      blue: {
        border: isDay
          ? 'border-sky-200/90 hover:border-sky-500'
          : 'border-sky-700/60 hover:border-sky-400',
        badge: isDay ? 'text-sky-700' : 'text-sky-300',
        dot: 'bg-sky-500',
        activeRing: 'ring-2 ring-sky-500 border-sky-500',
      },
      teal: {
        border: isDay
          ? 'border-teal-200/90 hover:border-teal-500'
          : 'border-teal-700/60 hover:border-teal-400',
        badge: isDay ? 'text-teal-700' : 'text-teal-300',
        dot: 'bg-teal-500',
        activeRing: 'ring-2 ring-teal-500 border-teal-500',
      },
      rose: {
        border: isDay
          ? 'border-rose-200/90 hover:border-rose-400'
          : 'border-rose-800/60 hover:border-rose-400',
        badge: isDay ? 'text-rose-700' : 'text-rose-300',
        dot: 'bg-rose-500',
        activeRing: 'ring-2 ring-rose-500 border-rose-500',
      },
      indigo: {
        border: isDay
          ? 'border-indigo-200/90 hover:border-indigo-400'
          : 'border-indigo-800/60 hover:border-indigo-400',
        badge: isDay ? 'text-indigo-700' : 'text-indigo-300',
        dot: 'bg-indigo-500',
        activeRing: 'ring-2 ring-indigo-500 border-indigo-500',
      },
    };

    const tkn = accentTokens[accent];

    return (
      <button
        key={no}
        type="button"
        onClick={() => handleNodeClick(no)}
        className={`group/node text-left rounded-xl border transition-all duration-150 cursor-pointer relative ${
          compact ? 'px-2.5 py-2' : 'px-3.5 py-2.5'
        } ${
          isDay
            ? options?.highlightDirect
              ? 'bg-gradient-to-br from-emerald-50/90 via-white to-amber-50/40 shadow-xs'
              : 'bg-white shadow-2xs hover:shadow-sm'
            : options?.highlightDirect
            ? 'bg-gradient-to-br from-[#0a2b24] to-[#08221d] shadow-sm'
            : 'bg-[#07201b] hover:bg-[#0a2a23]'
        } ${isSelected ? tkn.activeRing : tkn.border} ${
          !isMatched ? 'opacity-25 scale-[0.98]' : 'opacity-100'
        }`}
      >
        <div className="flex items-center justify-between gap-1.5 mb-0.5">
          <span className={`text-[10px] font-extrabold tracking-wide truncate ${tkn.badge}`}>
            {roleLabel}
          </span>
          <span
            className={`text-[10px] font-bold tabular-nums shrink-0 ${
              isVisited
                ? isDay
                  ? 'text-emerald-600'
                  : 'text-emerald-400'
                : isDay
                ? 'text-slate-400'
                : 'text-emerald-500/70'
            }`}
          >
            {isBn ? toBn(no).padStart(2, '০') : String(no).padStart(2, '0')}
          </span>
        </div>
        <div
          className={`font-extrabold leading-snug ${
            compact ? 'text-[11.5px]' : 'text-xs sm:text-[13px]'
          } ${isDay ? 'text-slate-900' : 'text-white'}`}
        >
          {displayName}
        </div>
      </button>
    );
  };

  // Vertical golden-emerald lineage connector line
  const renderVerticalTrunk = (labelBn?: string, labelEn?: string, heightClass = 'h-7') => (
    <div className="flex flex-col items-center select-none" aria-hidden="true">
      <div
        className={`w-[2px] ${heightClass} ${
          isDay
            ? 'bg-gradient-to-b from-emerald-400 via-amber-400 to-emerald-400'
            : 'bg-gradient-to-b from-emerald-500/80 via-amber-400/80 to-emerald-500/80'
        }`}
      />
      {(labelBn || labelEn) && (
        <span
          className={`my-0.5 text-[10px] font-extrabold tracking-wide px-2 py-0.5 rounded-full border ${
            isDay
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : 'bg-[#06221c] border-emerald-700/70 text-amber-300'
          }`}
        >
          {isBn ? labelBn : labelEn}
        </span>
      )}
      {(labelBn || labelEn) && (
        <div
          className={`w-[2px] h-4 ${
            isDay ? 'bg-emerald-400' : 'bg-emerald-500/80'
          }`}
        />
      )}
    </div>
  );

  const showAncestors = branchFilter === 'all' || branchFilter === 'ancestors';
  const showWives = branchFilter === 'all' || branchFilter === 'wives';
  const showDescendants = branchFilter === 'all' || branchFilter === 'descendants';

  const uncleNos = [33, 34, 35, 36, 37, 38, 39, 40, 41];
  const auntNos = [42, 43, 44, 45, 46, 47];
  const wifeNos = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  return (
    <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
      {/* Main Scrollable Family Tree Canvas */}
      <div
        className={`flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 py-4 sm:py-6 ${
          isDay
            ? 'bg-gradient-to-b from-[#F4FBF8] via-[#FAFBF9] to-[#F6F9F7]'
            : 'bg-gradient-to-b from-[#031410] via-[#041914] to-[#03130f]'
        }`}
      >
        <div className="max-w-5xl mx-auto space-y-5">
          {/* Tree Control Bar: Branch Filter + Instant Name Search */}
          <div
            className={`rounded-2xl border p-3 sm:p-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3 ${
              isDay
                ? 'bg-white/95 border-emerald-200/80 shadow-xs'
                : 'bg-[#061c17]/95 border-emerald-800/60'
            }`}
          >
            {/* Segmented Branch Switcher */}
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
              {(
                [
                  { id: 'all', bn: 'সম্পূর্ণ বংশতালিকা (৪৭)', en: 'Full Tree (47)' },
                  { id: 'ancestors', bn: 'পূর্বপুরুষ ও চাচা-ফুফু', en: 'Ancestors & Kin' },
                  { id: 'wives', bn: 'উম্মাহাতুল মুমিনীন (১১)', en: '11 Wives' },
                  { id: 'descendants', bn: 'সন্তান, জামাতা ও নাতি-নাতনি', en: 'Descendants' },
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
                    className={`px-3 py-1.5 rounded-xl text-[11.5px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
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
                placeholder={isBn ? 'বংশতালিকায় নাম খুঁজুন...' : 'Find member in tree...'}
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

          {/* Subtle Hint Banner */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-[11px]">
            <span
              className={`font-semibold flex items-center gap-1.5 ${
                isDay ? 'text-emerald-800' : 'text-emerald-300/85'
              }`}
            >
              <GitBranch className="w-3.5 h-3.5 text-amber-500" />
              <span>
                {isBn
                  ? 'যেকোনো নামের ওপর ক্লিক করে তাঁর সংক্ষিপ্ত পরিচয় ও পূর্ণাঙ্গ জীবনী পড়ুন'
                  : 'Click any member node to view their biography and authentic Hadith references'}
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
              GENEALOGY TREE DIAGRAM — 5 AUTHENTIC GENERATIONS
              ============================================================== */}
          <div className="flex flex-col items-center">
            {/* GENERATION 1: GRANDPARENTS (দাদা-দাদি) */}
            {showAncestors && (
              <>
                <div className="w-full flex flex-col items-center">
                  <div className="text-[10.5px] font-extrabold tracking-wider uppercase mb-2 text-amber-700 dark:text-amber-300">
                    {isBn ? '১ম স্তর · দাদা ও দাদি' : 'Generation I · Grandparents'}
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-xl">
                    <div className="w-full sm:w-64">
                      {renderMemberNode(3, {
                        roleBn: 'দাদা (কুরাইশ সরদার)',
                        roleEn: 'Grandfather',
                        accent: 'amber',
                        highlightDirect: true,
                      })}
                    </div>

                    {/* Marriage Connector Knot */}
                    <div
                      className={`flex items-center justify-center w-7 h-7 rounded-full border shrink-0 ${
                        isDay
                          ? 'bg-amber-50 border-amber-300 text-amber-600'
                          : 'bg-amber-950/60 border-amber-600/60 text-amber-300'
                      }`}
                      aria-hidden="true"
                    >
                      <Heart className="w-3 h-3 fill-current" />
                    </div>

                    <div className="w-full sm:w-64">
                      {renderMemberNode(4, {
                        roleBn: 'দাদি (বনু মাখযুম)',
                        roleEn: 'Grandmother',
                        accent: 'amber',
                        highlightDirect: true,
                      })}
                    </div>
                  </div>
                </div>

                {renderVerticalTrunk('আব্দুল মুত্তালিবের সন্তানগণ', 'Children of Abdul Muttalib')}

                {/* GENERATION 2: UNCLES (LEFT) — PARENTS (CENTER) — AUNTS (RIGHT) */}
                <div className="w-full relative">
                  {/* Horizontal Branch Connector Line on Desktop */}
                  <div
                    aria-hidden="true"
                    className={`hidden lg:block absolute top-0 left-[16%] right-[16%] h-[2px] ${
                      isDay
                        ? 'bg-gradient-to-r from-rose-300 via-emerald-400 to-indigo-300'
                        : 'bg-gradient-to-r from-rose-700/70 via-emerald-500/80 to-indigo-700/70'
                    }`}
                  />

                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(320px,1.15fr)_1fr] gap-4 items-start pt-0 lg:pt-4">
                    {/* LEFT WING: 9 UNCLES (চাচাগণ) */}
                    <div
                      className={`rounded-2xl border p-3 space-y-2.5 ${
                        isDay
                          ? 'bg-white/80 border-rose-200/80'
                          : 'bg-[#061c17]/80 border-rose-900/50'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setShowAllUncles((p) => !p)}
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
                        {showAllUncles ? (
                          <ChevronUp className="w-4 h-4 text-rose-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-rose-500" />
                        )}
                      </button>

                      {showAllUncles && (
                        <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-1.5">
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

                    {/* CENTER LINEAGE: PARENTS (বাবা-মা) */}
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-full rounded-2xl border p-3.5 space-y-2.5 ${
                          isDay
                            ? 'bg-gradient-to-b from-emerald-50/85 to-white border-emerald-300/85 shadow-sm'
                            : 'bg-gradient-to-b from-[#082c24] to-[#061e19] border-emerald-600/60 shadow-md'
                        }`}
                      >
                        <div className="text-center text-[10.5px] font-extrabold tracking-wider uppercase text-emerald-700 dark:text-emerald-300">
                          {isBn ? '২য় স্তর · মহিমান্বিত পিতা ও মাতা' : 'Generation II · Noble Parents'}
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-2">
                          <div className="w-full flex-1">
                            {renderMemberNode(1, {
                              roleBn: 'পিতা',
                              roleEn: 'Father',
                              accent: 'emerald',
                              highlightDirect: true,
                            })}
                          </div>
                          <div
                            className={`flex items-center justify-center w-6 h-6 rounded-full border shrink-0 ${
                              isDay
                                ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                                : 'bg-emerald-900/70 border-emerald-600 text-emerald-300'
                            }`}
                            aria-hidden="true"
                          >
                            <Heart className="w-3 h-3 fill-current" />
                          </div>
                          <div className="w-full flex-1">
                            {renderMemberNode(2, {
                              roleBn: 'মাতা',
                              roleEn: 'Mother',
                              accent: 'emerald',
                              highlightDirect: true,
                            })}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT WING: 6 AUNTS (ফুফুগণ) */}
                    <div
                      className={`rounded-2xl border p-3 space-y-2.5 ${
                        isDay
                          ? 'bg-white/80 border-indigo-200/80'
                          : 'bg-[#061c17]/80 border-indigo-900/50'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => setShowAllAunts((p) => !p)}
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
                        {showAllAunts ? (
                          <ChevronUp className="w-4 h-4 text-indigo-500" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-indigo-500" />
                        )}
                      </button>

                      {showAllAunts && (
                        <div className="grid grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-1.5">
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

                {renderVerticalTrunk()}
              </>
            )}

            {/* ==============================================================
                GENERATION 3: CENTRAL LUMINOUS PROPHET CREST + 11 WIVES
                ============================================================== */}
            <div className="w-full flex flex-col items-center">
              {/* Illuminated Central Crest: Prophet Muhammad ﷺ */}
              <div
                className={`relative overflow-hidden rounded-2xl border-2 px-6 py-4 text-center max-w-md w-full shadow-md ${
                  isDay
                    ? 'bg-gradient-to-br from-[#053529] via-[#062d23] to-[#041f18] border-amber-400/80 text-white'
                    : 'bg-gradient-to-br from-[#073a2d] via-[#052920] to-[#031c16] border-amber-400/75 text-white'
                }`}
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 120"
                  className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 w-24 h-24 text-amber-300/10"
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
                </div>
              </div>

              {/* SPOUSAL WING: 11 UMMAHATUL MUMINEEN (উম্মাহাতুল মুমিনীন) */}
              {showWives && (
                <div className="w-full mt-4">
                  <div
                    className={`rounded-2xl border p-3.5 sm:p-4 space-y-3 ${
                      isDay
                        ? 'bg-white/90 border-violet-200/85 shadow-2xs'
                        : 'bg-[#061c17]/90 border-violet-800/50'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setShowAllWives((p) => !p)}
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
                              ? 'উম্মাহাতুল মুমিনীন · পবিত্র স্ত্রীগণ (১১ জন)'
                              : 'Ummahatul Mumineen · Mothers of the Believers (11 Wives)'}
                          </div>
                          <div className="text-[10.5px] text-slate-500 dark:text-emerald-300/65 truncate">
                            {isBn
                              ? 'খাদিজা (রা.) ছিলেন ৬ সন্তানের মাতা · ইবরাহীম (রা.)-এর মাতা ছিলেন মারিয়া কিবতিয়া (রা.)'
                              : 'Khadijah (RA) was mother of 6 children · Mariyah al-Qibtiyyah (RA) was mother of Ibrahim'}
                          </div>
                        </div>
                      </div>
                      {showAllWives ? (
                        <ChevronUp className="w-4 h-4 text-violet-500 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-violet-500 shrink-0" />
                      )}
                    </button>

                    {showAllWives && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                        {wifeNos.map((no) =>
                          renderMemberNode(no, {
                            roleBn: no === 5 ? 'প্রথম স্ত্রী · ৬ সন্তানের মাতা' : 'উম্মুল মুমিনীন',
                            roleEn: no === 5 ? 'First Wife · Mother of 6' : 'Mother of Believers',
                            accent: 'violet',
                            compact: true,
                            highlightDirect: no === 5,
                          })
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ==============================================================
                GENERATION 4 & 5: 7 CHILDREN, 3 SONS-IN-LAW & 7 GRANDCHILDREN
                ============================================================== */}
            {showDescendants && (
              <>
                {renderVerticalTrunk('পবিত্র সন্তানগণ, জামাতা ও নাতি-নাতনি', 'Children, Sons-in-Law & Grandchildren')}

                <div className="w-full space-y-4">
                  {/* 3 SONS WHO PASSED AWAY IN CHILDHOOD (পুত্র সন্তানগণ) */}
                  <div
                    className={`rounded-2xl border p-3.5 space-y-2.5 ${
                      isDay
                        ? 'bg-white/90 border-sky-200/85 shadow-2xs'
                        : 'bg-[#061c17]/90 border-sky-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-black text-sky-800 dark:text-sky-300">
                        {isBn ? '৩ জন পুত্র সন্তান (শৈশবেই ইন্তেকাল)' : '3 Sons (Passed in Infancy)'}
                      </span>
                      <span className="text-[10.5px] font-semibold text-slate-500 dark:text-emerald-300/65">
                        {isBn ? 'কাসিম · আব্দুল্লাহ · ইবরাহীম' : 'Qasim · Abdullah · Ibrahim'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {renderMemberNode(16, {
                        roleBn: 'জ্যেষ্ঠ পুত্র · মা: খাদিজা (রা.)',
                        roleEn: 'Eldest Son · Mother: Khadijah',
                        accent: 'blue',
                      })}
                      {renderMemberNode(21, {
                        roleBn: 'পুত্র (তাইয়্যিব/তাহির) · মা: খাদিজা (রা.)',
                        roleEn: 'Son (Tayyib/Tahir) · Mother: Khadijah',
                        accent: 'blue',
                      })}
                      {renderMemberNode(22, {
                        roleBn: 'কনিষ্ঠ পুত্র · মা: মারিয়া কিবতিয়া (রা.)',
                        roleEn: 'Youngest Son · Mother: Mariyah',
                        accent: 'blue',
                      })}
                    </div>
                  </div>

                  {/* 4 DAUGHTERS -> MARRIED TO 3 SONS-IN-LAW -> 7 GRANDCHILDREN */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 items-stretch">
                    {/* BRANCH A: ZAYNAB (17) + ABUL AS (32) -> UMAMAH (27), ALI (28) */}
                    <div
                      className={`rounded-2xl border p-3.5 flex flex-col justify-between gap-2.5 ${
                        isDay
                          ? 'bg-white border-emerald-200/85 shadow-xs'
                          : 'bg-[#061d18] border-emerald-800/60'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="text-[10.5px] font-extrabold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">
                          {isBn ? 'কন্যা শাখা ১ · যায়নাব (রা.)' : 'Daughter Branch 1 · Zaynab (RA)'}
                        </div>
                        {renderMemberNode(17, {
                          roleBn: 'জ্যেষ্ঠ কন্যা',
                          roleEn: 'Eldest Daughter',
                          accent: 'blue',
                          highlightDirect: true,
                        })}
                        <div className="flex items-center gap-2 pl-2">
                          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-300">
                            ═ {isBn ? 'বিবাহ' : 'Married'}
                          </span>
                          <div className="h-px flex-1 bg-amber-300/60 dark:bg-amber-700/50" />
                        </div>
                        {renderMemberNode(32, {
                          roleBn: 'জামাতা',
                          roleEn: 'Son-in-Law',
                          accent: 'amber',
                        })}
                      </div>

                      {/* Vertical drop to Grandchildren */}
                      <div className="pt-1 space-y-2">
                        <div className="flex flex-col items-center">
                          <div className="w-[2px] h-4 bg-teal-400/70" />
                          <span className="text-[10px] font-extrabold text-teal-700 dark:text-teal-300">
                            {isBn ? 'নাতি-নাতনি (২ জন)' : 'Grandchildren (2)'}
                          </span>
                        </div>
                        <div className="grid grid-cols-1 gap-1.5">
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

                    {/* BRANCH B: RUQAYYAH (18) & UMM KULTHUM (19) + UTHMAN (31) -> ABDULLAH (29) */}
                    <div
                      className={`rounded-2xl border p-3.5 flex flex-col justify-between gap-2.5 ${
                        isDay
                          ? 'bg-white border-emerald-200/85 shadow-xs'
                          : 'bg-[#061d18] border-emerald-800/60'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="text-[10.5px] font-extrabold text-emerald-700 dark:text-emerald-300 uppercase tracking-wide">
                          {isBn
                            ? 'কন্যা শাখা ২ · রুকাইয়া ও উম্মে কুলসুম (রা.)'
                            : 'Daughter Branch 2 · Ruqayyah & Umm Kulthum'}
                        </div>
                        <div className="grid grid-cols-1 gap-1.5">
                          {renderMemberNode(18, {
                            roleBn: '২য় কন্যা',
                            roleEn: '2nd Daughter',
                            accent: 'blue',
                            highlightDirect: true,
                          })}
                          {renderMemberNode(19, {
                            roleBn: '৩য় কন্যা',
                            roleEn: '3rd Daughter',
                            accent: 'blue',
                            highlightDirect: true,
                          })}
                        </div>
                        <div className="flex items-center gap-2 pl-2">
                          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-300">
                            ═ {isBn ? 'যুন-নূরাইন (পরপর বিবাহ)' : 'Dhun-Nurayn (Married Both)'}
                          </span>
                          <div className="h-px flex-1 bg-amber-300/60 dark:bg-amber-700/50" />
                        </div>
                        {renderMemberNode(31, {
                          roleBn: 'জামাতা · ৩য় খলিফা',
                          roleEn: 'Son-in-Law · 3rd Caliph',
                          accent: 'amber',
                        })}
                      </div>

                      <div className="pt-1 space-y-2">
                        <div className="flex flex-col items-center">
                          <div className="w-[2px] h-4 bg-teal-400/70" />
                          <span className="text-[10px] font-extrabold text-teal-700 dark:text-teal-300">
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

                    {/* BRANCH C: FATIMAH (20) + ALI (30) -> HASAN (23), HUSAIN (24), ZAYNAB (25), UMM KULTHUM (26) */}
                    <div
                      className={`rounded-2xl border p-3.5 flex flex-col justify-between gap-2.5 ${
                        isDay
                          ? 'bg-gradient-to-b from-emerald-50/55 via-white to-teal-50/40 border-emerald-300/90 shadow-xs'
                          : 'bg-gradient-to-b from-[#082922] to-[#061d18] border-emerald-600/60'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="text-[10.5px] font-extrabold text-emerald-700 dark:text-amber-300 uppercase tracking-wide flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-500" />
                          <span>
                            {isBn
                              ? 'আহলে বাইত ধারা · ফাতিমা (রা.)'
                              : 'Ahl al-Bayt Lineage · Fatimah (RA)'}
                          </span>
                        </div>
                        {renderMemberNode(20, {
                          roleBn: 'কনিষ্ঠ কন্যা · জান্নাতি নারীদের নেত্রী',
                          roleEn: 'Youngest Daughter · Sayyidat Nisa',
                          accent: 'emerald',
                          highlightDirect: true,
                        })}
                        <div className="flex items-center gap-2 pl-2">
                          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-300">
                            ═ {isBn ? 'বিবাহ' : 'Married'}
                          </span>
                          <div className="h-px flex-1 bg-amber-300/60 dark:bg-amber-700/50" />
                        </div>
                        {renderMemberNode(30, {
                          roleBn: 'জামাতা · ৪র্থ খলিফা ও চাচাতো ভাই',
                          roleEn: 'Son-in-Law · 4th Caliph & Cousin',
                          accent: 'amber',
                        })}
                      </div>

                      <div className="pt-1 space-y-2">
                        <div className="flex flex-col items-center">
                          <div className="w-[2px] h-4 bg-teal-400/70" />
                          <span className="text-[10px] font-extrabold text-teal-700 dark:text-teal-300">
                            {isBn ? 'নাতি-নাতনি (৪ জন · বংশধারা)' : 'Grandchildren (4 · Lineage)'}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-1.5">
                          {renderMemberNode(23, {
                            roleBn: 'নাতি',
                            roleEn: 'Grandson',
                            accent: 'teal',
                            compact: true,
                          })}
                          {renderMemberNode(24, {
                            roleBn: 'নাতি',
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
          INTERACTIVE QUICK BIOGRAPHY SIDE PANEL (Desktop Right / Mobile Bottom)
          ==================================================================== */}
      {selectedMember && (
        <aside
          aria-label={isBn ? selectedMember.titleBn : selectedMember.titleEn}
          className={`shrink-0 w-full lg:w-[360px] max-h-[52vh] lg:max-h-none overflow-y-auto border-t lg:border-t-0 lg:border-l p-4 sm:p-5 space-y-4 animate-in fade-in duration-150 ${
            isDay
              ? 'bg-white border-emerald-200/85 shadow-xl lg:shadow-none'
              : 'bg-[#051a15] border-emerald-800/70 shadow-2xl lg:shadow-none'
          }`}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-amber-300 tabular-nums">
                <span>
                  {isBn
                    ? partMap.get(selectedMember.partNo)?.categoryBn
                    : partMap.get(selectedMember.partNo)?.categoryEn}
                </span>
                <span aria-hidden="true" className="opacity-40">
                  ·
                </span>
                <span>
                  {isBn ? `#${toBn(selectedMember.no)}` : `#${selectedMember.no}`}
                </span>
              </div>
              <h3
                className={`text-base sm:text-lg font-black leading-snug ${
                  isDay ? 'text-slate-900' : 'text-white'
                }`}
              >
                {cleanName(isBn ? selectedMember.titleBn : selectedMember.titleEn)}
              </h3>
              <p
                className={`text-[11px] font-semibold flex items-center gap-1 ${
                  isDay ? 'text-slate-500' : 'text-emerald-300/75'
                }`}
              >
                <MapPin className="w-3 h-3 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <span>{isBn ? selectedMember.locationBn : selectedMember.locationEn}</span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedMemberNo(null)}
              aria-label={isBn ? 'বন্ধ করুন' : 'Close panel'}
              className={`p-1.5 rounded-lg border transition cursor-pointer shrink-0 ${
                isDay
                  ? 'border-slate-200 text-slate-500 hover:bg-slate-100'
                  : 'border-emerald-800 text-emerald-300 hover:bg-emerald-900/50'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Arabic Quote if present */}
          {selectedMember.arabicQuote && (
            <div
              dir="rtl"
              className={`font-arabic text-base text-center px-3 py-2 rounded-xl border ${
                isDay
                  ? 'bg-amber-50/70 border-amber-200/80 text-amber-900'
                  : 'bg-[#08241e] border-amber-500/30 text-amber-200'
              }`}
            >
              {selectedMember.arabicQuote}
            </div>
          )}

          {/* Key Bullet Highlights */}
          <div className="space-y-1.5">
            <h4
              className={`text-[11px] font-extrabold uppercase tracking-wider ${
                isDay ? 'text-emerald-800' : 'text-emerald-300'
              }`}
            >
              {isBn ? 'সংক্ষিপ্ত পরিচয়' : 'Key Highlights'}
            </h4>
            <ul className="space-y-1.5">
              {(isBn ? selectedMember.pointsBn : selectedMember.pointsEn).map((pt, i) => (
                <li
                  key={i}
                  className={`text-xs leading-relaxed flex items-start gap-2 ${
                    isDay ? 'text-slate-700' : 'text-emerald-100/85'
                  }`}
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Primary Source */}
          <div
            className={`text-[11px] pt-2.5 border-t ${
              isDay
                ? 'border-slate-100 text-slate-500'
                : 'border-emerald-800/60 text-emerald-300/75'
            }`}
          >
            <strong className={isDay ? 'text-slate-700' : 'text-emerald-200'}>
              {isBn ? 'সূত্র: ' : 'Source: '}
            </strong>
            {isBn ? selectedMember.sourceBn : selectedMember.sourceEn}
          </div>

          {/* Open Full Biography in Reader CTA */}
          <button
            type="button"
            onClick={() => onSelectMemberForReader(selectedMember.no)}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/20 transition active:scale-[0.99] cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>{isBn ? 'পূর্ণাঙ্গ জীবনী ও রেফারেন্স পড়ুন' : 'Read Full Biography & References'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </aside>
      )}
    </div>
  );
};
