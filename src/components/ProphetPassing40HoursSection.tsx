/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Copy,
  Download,
  List,
  Search,
  Share2,
  X,
} from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { PASSING_40_EVENTS, PASSING_40_PARTS } from '../data/prophet40HoursData';
import {
  HadithReferenceItem,
  PASSING_40_EXTENDED,
  SEERAT_SPECIAL_COLLECTIONS,
  SeeratSpecialCollectionMeta,
  SpecialCollectionId,
} from '../data/prophet40HoursExtended';
import { LAST_10_DAYS_EVENTS, LAST_10_DAYS_PARTS } from '../data/prophetLast10DaysData';
import { CHILDREN_EVENTS, CHILDREN_PARTS } from '../data/prophetChildrenData';
import { FAMILY_EVENTS, FAMILY_PARTS } from '../data/prophetFamily47Data';
import { copyToClipboard } from '../utils/clipboard';
import { soundHaptics } from '../utils/audioHaptics';
import { ShareDownloadButtons } from './ContentShareModal';
import { ShareableContent } from '../utils/shareDownload';

interface ProphetPassing40HoursSectionProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  onOpenShareModal?: (content: ShareableContent, focus: 'share' | 'download') => void;
}

interface UnifiedPartMeta {
  partNo: number;
  dayTagBn: string;
  dayTagEn: string;
  titleBn: string;
  titleEn: string;
  arabicTitle: string;
  subtitleBn: string;
  subtitleEn: string;
  accentHex: string;
  eventCount: number;
}

interface UnifiedCollectionEvent {
  no: number;
  partNo: number;
  timeContextBn: string;
  timeContextEn: string;
  titleBn: string;
  titleEn: string;
  pointsBn: string[];
  pointsEn: string[];
  detailedNarrativeBn: string;
  detailedNarrativeEn: string;
  extendedContextBn: string;
  extendedContextEn: string;
  locationBn: string;
  locationEn: string;
  keyFiguresBn: string;
  keyFiguresEn: string;
  reflectionBn: string;
  reflectionEn: string;
  arabicQuote?: string;
  sourceBn: string;
  sourceEn: string;
  references: HadithReferenceItem[];
}

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

const toBnNumber = (num: number, padZero = false): string => {
  const raw = padZero ? String(num).padStart(2, '0') : String(num);
  return raw.replace(/\d/g, (d) => BN_DIGITS[Number(d)] ?? d);
};

const getCollectionData = (
  id: SpecialCollectionId
): { parts: UnifiedPartMeta[]; events: UnifiedCollectionEvent[] } => {
  if (id === 'prophet-last-10-days') {
    return {
      parts: LAST_10_DAYS_PARTS,
      events: LAST_10_DAYS_EVENTS,
    };
  }
  if (id === 'prophet-children-biography') {
    return {
      parts: CHILDREN_PARTS.map((p) => ({
        ...p,
        dayTagBn: p.childNameBn,
        dayTagEn: p.childNameEn,
      })),
      events: CHILDREN_EVENTS,
    };
  }
  if (id === 'prophet-family-47') {
    return {
      parts: FAMILY_PARTS.map((p) => ({
        ...p,
        dayTagBn: p.categoryBn,
        dayTagEn: p.categoryEn,
      })),
      events: FAMILY_EVENTS,
    };
  }
  return {
    parts: PASSING_40_PARTS,
    events: PASSING_40_EVENTS.map((ev) => {
      const ext = PASSING_40_EXTENDED[ev.no];
      return {
        ...ev,
        extendedContextBn: ext?.extendedContextBn || '',
        extendedContextEn: ext?.extendedContextEn || '',
        locationBn: ext?.locationBn || ev.timeContextBn,
        locationEn: ext?.locationEn || ev.timeContextEn,
        keyFiguresBn: ext?.keyFiguresBn || '',
        keyFiguresEn: ext?.keyFiguresEn || '',
        references: ext?.references || [
          {
            bookBn: ev.sourceBn,
            bookEn: ev.sourceEn,
            chapterBn: 'প্রামাণ্য সীরাত ও হাদিস সূত্র',
            chapterEn: 'Verified Hadith & Seerah Reference',
            citationBn: ev.sourceBn,
            citationEn: ev.sourceEn,
            gradeBn: 'প্রামাণ্য সূত্র',
            gradeEn: 'Verified Source',
          },
        ],
      };
    }),
  };
};

export const ProphetPassing40HoursSection: React.FC<ProphetPassing40HoursSectionProps> = ({
  themeMode = 'day',
  selectedLanguage = 'bn',
  soundEnabled = true,
  onOpenShareModal,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';

  const [activeCollectionId, setActiveCollectionId] = useState<SpecialCollectionId | null>(null);
  const [selectedPart, setSelectedPart] = useState<'all' | number>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeEventNo, setActiveEventNo] = useState<number>(1);
  const [mobilePane, setMobilePane] = useState<'index' | 'reader'>('index');
  const [visitedByCollection, setVisitedByCollection] = useState<
    Record<SpecialCollectionId, Record<number, boolean>>
  >({
    'prophet-40-hours': { 1: true },
    'prophet-last-10-days': { 1: true },
    'prophet-children-biography': { 1: true },
    'prophet-family-47': { 1: true },
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const readerScrollRef = useRef<HTMLDivElement | null>(null);

  const isReaderOpen = activeCollectionId !== null;

  useEffect(() => {
    if (!isReaderOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveCollectionId(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isReaderOpen]);

  const activeCollectionMeta: SeeratSpecialCollectionMeta | null = useMemo(() => {
    if (!activeCollectionId) return null;
    return SEERAT_SPECIAL_COLLECTIONS.find((c) => c.id === activeCollectionId) || null;
  }, [activeCollectionId]);

  const activeCollectionData = useMemo(() => {
    if (!activeCollectionId) return { parts: [] as UnifiedPartMeta[], events: [] as UnifiedCollectionEvent[] };
    return getCollectionData(activeCollectionId);
  }, [activeCollectionId]);

  const visitedEvents = activeCollectionId ? visitedByCollection[activeCollectionId] || {} : {};

  const openCollection = (
    collectionId: SpecialCollectionId,
    initialPart: 'all' | number = 'all',
    initialEvent?: number,
    openReaderDirectlyOnMobile = false
  ) => {
    if (soundEnabled) soundHaptics.playTap();
    const { events } = getCollectionData(collectionId);
    setSelectedPart(initialPart);
    setSearchQuery('');
    const targetEvent =
      initialEvent ??
      (initialPart === 'all' ? 1 : events.find((e) => e.partNo === initialPart)?.no ?? 1);
    setActiveEventNo(targetEvent);
    setVisitedByCollection((prev) => ({
      ...prev,
      [collectionId]: { ...(prev[collectionId] || {}), [targetEvent]: true },
    }));
    setMobilePane(openReaderDirectlyOnMobile ? 'reader' : 'index');
    setActiveCollectionId(collectionId);
  };

  const closeCollection = () => {
    if (soundEnabled) soundHaptics.playTap();
    setActiveCollectionId(null);
  };

  const handleSelectEvent = (no: number) => {
    if (!activeCollectionId) return;
    if (soundEnabled) soundHaptics.playTap();
    setActiveEventNo(no);
    setVisitedByCollection((prev) => ({
      ...prev,
      [activeCollectionId]: { ...(prev[activeCollectionId] || {}), [no]: true },
    }));
    setMobilePane('reader');
    if (readerScrollRef.current) {
      readerScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredEvents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return activeCollectionData.events.filter((ev) => {
      if (selectedPart !== 'all' && ev.partNo !== selectedPart) return false;
      if (!q) return true;
      const haystack = [
        ev.titleBn,
        ev.titleEn,
        ev.timeContextBn,
        ev.timeContextEn,
        ev.pointsBn.join(' '),
        ev.pointsEn.join(' '),
        ev.detailedNarrativeBn,
        ev.detailedNarrativeEn,
        ev.extendedContextBn,
        ev.extendedContextEn,
        ev.locationBn,
        ev.keyFiguresBn,
        ev.sourceBn,
        ev.sourceEn,
        ev.references.map((r) => `${r.bookBn} ${r.citationBn} ${r.bookEn}`).join(' '),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [activeCollectionData.events, selectedPart, searchQuery]);

  const groupedByPart = useMemo(() => {
    const groups: { meta: UnifiedPartMeta; events: UnifiedCollectionEvent[] }[] = [];
    activeCollectionData.parts.forEach((meta) => {
      const evs = filteredEvents.filter((e) => e.partNo === meta.partNo);
      if (evs.length > 0) {
        groups.push({ meta, events: evs });
      }
    });
    return groups;
  }, [activeCollectionData.parts, filteredEvents]);

  const currentEvent = useMemo(
    () =>
      activeCollectionData.events.find((e) => e.no === activeEventNo) ||
      activeCollectionData.events[0] ||
      null,
    [activeCollectionData.events, activeEventNo]
  );

  const currentPartMeta = useMemo(() => {
    if (!currentEvent) return null;
    return (
      activeCollectionData.parts.find((p) => p.partNo === currentEvent.partNo) ||
      activeCollectionData.parts[0] ||
      null
    );
  }, [activeCollectionData.parts, currentEvent]);

  const totalEventsCount = activeCollectionData.events.length || 1;
  const prevEvent = currentEvent
    ? activeCollectionData.events.find((e) => e.no === currentEvent.no - 1) || null
    : null;
  const nextEvent = currentEvent
    ? activeCollectionData.events.find((e) => e.no === currentEvent.no + 1) || null
    : null;
  const progressPct = currentEvent ? Math.round((currentEvent.no / totalEventsCount) * 100) : 0;

  const handleCopyEvent = async (
    col: SeeratSpecialCollectionMeta,
    ev: UnifiedCollectionEvent,
    part: UnifiedPartMeta
  ) => {
    if (soundEnabled) soundHaptics.playTap();
    const totalLabel = isBn ? toBnNumber(col.eventsCount) : String(col.eventsCount);
    const numLabel = isBn ? toBnNumber(ev.no, true) : String(ev.no).padStart(2, '0');
    const pts = (isBn ? ev.pointsBn : ev.pointsEn).map((p) => `• ${p}`).join('\n');
    const refs = ev.references
      .map(
        (r) =>
          `- ${isBn ? r.bookBn : r.bookEn} (${isBn ? r.chapterBn : r.chapterEn}) — ${
            isBn ? r.citationBn : r.citationEn
          } [${isBn ? r.gradeBn : r.gradeEn}]`
      )
      .join('\n');

    const text = [
      `${isBn ? col.titleBn : col.titleEn} — ${
        isBn ? `ঘটনা ${numLabel} / ${totalLabel}` : `Event ${numLabel} / ${totalLabel}`
      }`,
      `${isBn ? part.titleBn : part.titleEn} · ${isBn ? ev.timeContextBn : ev.timeContextEn}`,
      '━━━━━━━━━━━━━━━━━━━━━━━━',
      isBn ? ev.titleBn : ev.titleEn,
      '',
      pts,
      ev.arabicQuote ? `\n${ev.arabicQuote}` : '',
      `\n${isBn ? 'বিস্তারিত বিবরণ:' : 'Detailed Account:'}\n${
        isBn ? ev.detailedNarrativeBn : ev.detailedNarrativeEn
      }`,
      ev.extendedContextBn ? `\n${isBn ? ev.extendedContextBn : ev.extendedContextEn}` : '',
      `\n${isBn ? 'স্থান:' : 'Location:'} ${isBn ? ev.locationBn : ev.locationEn}`,
      ev.keyFiguresBn
        ? `${isBn ? 'সংশ্লিষ্ট ব্যক্তিবর্গ:' : 'Key Figures:'} ${
            isBn ? ev.keyFiguresBn : ev.keyFiguresEn
          }`
        : '',
      `\n${isBn ? 'ঐতিহাসিক শিক্ষা:' : 'Reflection:'}\n${
        isBn ? ev.reflectionBn : ev.reflectionEn
      }`,
      `\n${isBn ? 'প্রামাণ্য সূত্রাবলি:' : 'Verified References:'}\n${refs}`,
    ]
      .filter(Boolean)
      .join('\n');

    const ok = await copyToClipboard(text);
    if (ok) {
      const key = `${col.id}-${ev.no}`;
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((cur) => (cur === key ? null : cur)), 2000);
    }
  };

  const buildSingleEventShare = (
    col: SeeratSpecialCollectionMeta,
    ev: UnifiedCollectionEvent,
    part: UnifiedPartMeta
  ): ShareableContent => {
    const numLabel = isBn ? toBnNumber(ev.no, true) : String(ev.no).padStart(2, '0');
    const fullBody = [
      isBn ? ev.detailedNarrativeBn : ev.detailedNarrativeEn,
      isBn ? ev.extendedContextBn : ev.extendedContextEn,
    ]
      .filter(Boolean)
      .join('\n\n');

    const fullRef = ev.references
      .map((r) => `${isBn ? r.bookBn : r.bookEn}: ${isBn ? r.citationBn : r.citationEn}`)
      .join(' | ');

    return {
      id: `${col.id}-event-${ev.no}`,
      badge: `${isBn ? col.titleBn : col.titleEn} · ${isBn ? `ঘটনা ${numLabel}` : `Event ${numLabel}`}`,
      title: isBn ? ev.titleBn : ev.titleEn,
      subtitle: `${isBn ? part.titleBn : part.titleEn} · ${isBn ? ev.timeContextBn : ev.timeContextEn}`,
      arabic: ev.arabicQuote,
      body: fullBody,
      highlights: [
        ...(isBn ? ev.pointsBn : ev.pointsEn),
        `${isBn ? 'ঐতিহাসিক শিক্ষা:' : 'Reflection:'} ${isBn ? ev.reflectionBn : ev.reflectionEn}`,
      ],
      meta: [
        { label: isBn ? 'পর্ব' : 'Part', value: isBn ? part.titleBn : part.titleEn },
        { label: isBn ? 'স্থান' : 'Location', value: isBn ? ev.locationBn : ev.locationEn },
      ],
      reference: fullRef,
      fileNamePrefix: `${col.id}-event-${ev.no}`,
    };
  };

  const buildFullChronicleShare = (col: SeeratSpecialCollectionMeta): ShareableContent => {
    const { parts, events } = getCollectionData(col.id);
    const fullText = parts
      .map((part) => {
        const partEvents = events.filter((e) => e.partNo === part.partNo);
        const header = `\n=== ${isBn ? `পর্ব ${toBnNumber(part.partNo)}` : `Part ${part.partNo}`}: ${
          isBn ? part.titleBn : part.titleEn
        } ===`;
        const body = partEvents
          .map((ev) => {
            const num = isBn ? toBnNumber(ev.no, true) : String(ev.no).padStart(2, '0');
            const pts = (isBn ? ev.pointsBn : ev.pointsEn).map((p) => `  • ${p}`).join('\n');
            const refText = ev.references
              .map(
                (r) =>
                  `${isBn ? r.bookBn : r.bookEn} (${isBn ? r.citationBn : r.citationEn} — ${
                    isBn ? r.gradeBn : r.gradeEn
                  })`
              )
              .join('; ');
            return `\n[${num}] ${isBn ? ev.titleBn : ev.titleEn}\n${pts}\n${
              isBn ? ev.detailedNarrativeBn : ev.detailedNarrativeEn
            }${
              ev.extendedContextBn
                ? `\n${isBn ? ev.extendedContextBn : ev.extendedContextEn}`
                : ''
            }\n${isBn ? 'সূত্র:' : 'References:'} ${refText}`;
          })
          .join('\n');
        return `${header}${body}`;
      })
      .join('\n');

    return {
      id: col.id,
      badge: isBn ? 'সীরাতুন নবী ﷺ · বিশেষ সংকলন' : 'Seerat-un-Nabi ﷺ · Special Collection',
      title: isBn ? col.titleBn : col.titleEn,
      subtitle: `${isBn ? col.eraLabelBn : col.eraLabelEn} · ${isBn ? col.durationBn : col.durationEn}`,
      arabic: col.arabicTitle,
      body: isBn ? col.summaryBn : col.summaryEn,
      highlights: parts.map(
        (p) =>
          `${isBn ? `পর্ব ${toBnNumber(p.partNo)}` : `Part ${p.partNo}`}: ${
            isBn ? p.titleBn : p.titleEn
          } (${isBn ? `${toBnNumber(p.eventCount)}টি ঘটনা` : `${p.eventCount} events`})`
      ),
      reference: isBn ? col.primarySourcesBn : col.primarySourcesEn,
      fullDocumentText: fullText,
      fileNamePrefix:
        col.id === 'prophet-last-10-days'
          ? 'Rasulullah-Last-10-Days'
          : col.id === 'prophet-children-biography'
          ? 'Rasulullah-Children-Biography'
          : 'Rasulullah-40-Hours-After-Passing',
    };
  };

  const [expandedCardIndexId, setExpandedCardIndexId] = useState<SpecialCollectionId | null>(null);

  return (
    <>
      {/* ====================================================================
          LEVEL 1: MAIN-UI-NATIVE SEERAH SPECIAL ARCHIVE DIRECTORY
          Harmonizes with Seerat-un-Nabi's Emerald, Teal & Ivory design system
          ==================================================================== */}
      <section
        aria-labelledby="special-seerah-collections-heading"
        className={`mt-8 rounded-2xl border p-4 sm:p-5 space-y-4 transition-colors ${
          isDay
            ? 'bg-gradient-to-br from-emerald-50/70 via-white to-amber-50/35 border-emerald-200/80 shadow-xs'
            : 'bg-gradient-to-br from-[#061b17] via-[#071f1a] to-[#0a231d] border-emerald-800/50 shadow-sm'
        }`}
      >
        {/* Curatorial Archive Header — Matches SeeratUnNabiView Hero Aesthetics */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3.5 border-b ${
            isDay ? 'border-emerald-200/70' : 'border-emerald-800/50'
          }`}
        >
          <div className="space-y-1">
            <div
              className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] sm:text-xs font-bold tabular-nums ${
                isDay ? 'text-emerald-700' : 'text-emerald-300'
              }`}
            >
              <span>{isBn ? 'সীরাতুন নবী ﷺ' : 'Seerat-un-Nabi ﷺ'}</span>
              <span aria-hidden="true" className="opacity-40">
                ·
              </span>
              <span>
                {isBn
                  ? `বিশেষ ঐতিহাসিক আর্কাইভ (${toBnNumber(SEERAT_SPECIAL_COLLECTIONS.length)}টি সংকলন)`
                  : `Special Historical Archive (${SEERAT_SPECIAL_COLLECTIONS.length} Volumes)`}
              </span>
              <span aria-hidden="true" className="opacity-40">
                ·
              </span>
              <span className={isDay ? 'text-amber-700' : 'text-amber-300'}>
                {isBn
                  ? `${toBnNumber(
                      SEERAT_SPECIAL_COLLECTIONS.reduce((sum, c) => sum + c.eventsCount, 0)
                    )}টি প্রামাণ্য ঘটনা`
                  : `${SEERAT_SPECIAL_COLLECTIONS.reduce(
                      (sum, c) => sum + c.eventsCount,
                      0
                    )} Verified Events`}
              </span>
            </div>

            <h2
              id="special-seerah-collections-heading"
              className={`text-lg sm:text-xl font-black tracking-tight text-balance ${
                isDay ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isBn ? 'বিশেষ ঐতিহাসিক সংকলন (সূচিপত্র)' : 'Special Historical Collections (Index)'}
            </h2>

            <p
              className={`text-xs max-w-2xl leading-relaxed ${
                isDay ? 'text-slate-600' : 'text-emerald-200/75'
              }`}
            >
              {isBn
                ? 'নবীজীবনের গুরুত্বপূর্ণ অধ্যায়সমূহের প্রামাণ্য হাদিস ও সীরাতভিত্তিক পৃথক সংকলন। যেকোনো শিরোনামে ক্লিক করে ভেতরের পূর্ণাঙ্গ সূচিপত্র, বিস্তারিত ঘটনা ও রেফারেন্স পড়ুন।'
                : 'Authentic Hadith- and Seerah-based historical volumes. Select any title below to open its full table of contents, detailed narrations, and verified references.'}
            </p>
          </div>

          <span
            dir="rtl"
            className={`font-arabic text-base sm:text-lg shrink-0 ${
              isDay ? 'text-amber-700/85' : 'text-amber-300/85'
            }`}
          >
            المختارات التاريخية من السيرة النبوية
          </span>
        </div>

        {/* Slim 2x2 Architectural Editorial Folio Grid (Main UI Native Light/Dark) */}
        <div
          className={`grid gap-3 items-start ${
            SEERAT_SPECIAL_COLLECTIONS.length > 1 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'
          }`}
        >
          {SEERAT_SPECIAL_COLLECTIONS.map((col, idx) => {
            const { parts } = getCollectionData(col.id);
            const isIndexExpanded = expandedCardIndexId === col.id;
            const visitedCount = Object.keys(visitedByCollection[col.id] || {}).length;
            const readPercent = Math.min(
              100,
              Math.round((visitedCount / Math.max(1, col.eventsCount)) * 100)
            );
            const volumeNum = isBn ? toBnNumber(idx + 1, true) : `0${idx + 1}`;

            // Subtle harmonizing accents rooted strictly in the main UI's emerald-teal-amber palette
            const accent =
              idx === 0
                ? {
                    medallion: isDay
                      ? 'bg-emerald-50 border-emerald-200/90 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600'
                      : 'bg-emerald-950/80 border-emerald-700/60 text-emerald-300 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500',
                    kicker: isDay ? 'text-emerald-700' : 'text-emerald-400',
                    bar: 'bg-emerald-500',
                    filigree: isDay ? 'text-emerald-700/[0.06]' : 'text-emerald-400/[0.07]',
                  }
                : idx === 1
                ? {
                    medallion: isDay
                      ? 'bg-teal-50 border-teal-200/90 text-teal-700 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-600'
                      : 'bg-teal-950/70 border-teal-700/60 text-teal-300 group-hover:bg-teal-600 group-hover:text-white group-hover:border-teal-500',
                    kicker: isDay ? 'text-teal-700' : 'text-teal-300',
                    bar: 'bg-teal-500',
                    filigree: isDay ? 'text-teal-700/[0.06]' : 'text-teal-400/[0.07]',
                  }
                : idx === 2
                ? {
                    medallion: isDay
                      ? 'bg-amber-50 border-amber-200/90 text-amber-700 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-600'
                      : 'bg-amber-950/60 border-amber-700/60 text-amber-300 group-hover:bg-amber-600 group-hover:text-white group-hover:border-amber-500',
                    kicker: isDay ? 'text-amber-700' : 'text-amber-300',
                    bar: 'bg-amber-500',
                    filigree: isDay ? 'text-amber-700/[0.07]' : 'text-amber-300/[0.07]',
                  }
                : {
                    medallion: isDay
                      ? 'bg-emerald-50/90 border-amber-200/90 text-emerald-800 group-hover:bg-emerald-700 group-hover:text-white group-hover:border-emerald-700'
                      : 'bg-emerald-950/80 border-amber-700/50 text-amber-200 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-500',
                    kicker: isDay ? 'text-emerald-800' : 'text-emerald-300',
                    bar: 'bg-gradient-to-r from-emerald-500 to-amber-500',
                    filigree: isDay ? 'text-emerald-800/[0.06]' : 'text-amber-300/[0.07]',
                  };

            return (
              <article
                key={col.id}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 ${
                  isDay
                    ? 'bg-white border-slate-200/90 hover:border-emerald-400/80 hover:shadow-md'
                    : 'bg-[#08221d] border-emerald-800/50 hover:border-emerald-500/60 hover:shadow-lg'
                }`}
              >
                {/* Delicate Geometric Eight-Pointed Filigree Ornament (Right Background) */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 120"
                  className={`pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 w-28 h-28 transition-transform duration-500 ease-out group-hover:rotate-12 ${accent.filigree}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <rect x="24" y="24" width="72" height="72" />
                  <rect x="24" y="24" width="72" height="72" transform="rotate(45 60 60)" />
                  <circle cx="60" cy="60" r="24" strokeDasharray="3 3" />
                </svg>

                {/* Slim Main Architectural Folio Body */}
                <div
                  onClick={() => openCollection(col.id, 'all', 1, false)}
                  className="relative z-10 cursor-pointer p-3.5 sm:p-4 flex items-start gap-3 sm:gap-3.5"
                >
                  {/* Left Editorial Spine: Geometric Volume Numeral Medallion */}
                  <div className="shrink-0 flex flex-col items-center pt-0.5">
                    <div
                      className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl border flex items-center justify-center transition-colors duration-200 shadow-2xs ${accent.medallion}`}
                    >
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-1 rounded-[7px] border border-current opacity-20"
                      />
                      <span className="text-sm sm:text-base font-black tracking-tight tabular-nums leading-none">
                        {volumeNum}
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`mt-2 w-px h-7 ${
                        isDay ? 'bg-slate-200' : 'bg-emerald-800/70'
                      }`}
                    />
                  </div>

                  {/* Right Editorial Content Column */}
                  <div className="min-w-0 flex-1 space-y-2">
                    {/* Top Row: Unboxed Metadata + Arabic Calligraphic Subtitle + Icon Actions */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 space-y-0.5">
                        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[11px] font-bold tabular-nums">
                          <span className={accent.kicker}>
                            {isBn ? col.volumeNoBn : col.volumeNoEn}
                          </span>
                          <span
                            aria-hidden="true"
                            className={isDay ? 'text-slate-300' : 'text-emerald-700'}
                          >
                            ·
                          </span>
                          <span className={isDay ? 'text-slate-500' : 'text-emerald-300/75'}>
                            {isBn
                              ? `${toBnNumber(col.partsCount)} পর্ব / ${toBnNumber(col.eventsCount)} ঘটনা`
                              : `${col.partsCount} Parts / ${col.eventsCount} Events`}
                          </span>
                        </div>

                        <p
                          dir="rtl"
                          className={`font-arabic text-[13px] text-left leading-snug ${
                            isDay ? 'text-amber-700/90' : 'text-amber-300/85'
                          }`}
                        >
                          {col.arabicTitle}
                        </p>
                      </div>

                      {onOpenShareModal && (
                        <div
                          className="flex items-center gap-1 shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => onOpenShareModal(buildFullChronicleShare(col), 'share')}
                            title={isBn ? 'শেয়ার করুন' : 'Share'}
                            aria-label={isBn ? 'শেয়ার করুন' : 'Share'}
                            className={`w-7 h-7 rounded-lg border flex items-center justify-center transition active:scale-95 cursor-pointer ${
                              isDay
                                ? 'bg-slate-50 hover:bg-emerald-50 border-slate-200 text-slate-500 hover:text-emerald-700 hover:border-emerald-300'
                                : 'bg-[#061b17] hover:bg-emerald-900/50 border-emerald-800/70 text-emerald-300/75 hover:text-emerald-200'
                            }`}
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              onOpenShareModal(buildFullChronicleShare(col), 'download')
                            }
                            title={isBn ? 'ডাউনলোড করুন' : 'Download'}
                            aria-label={isBn ? 'ডাউনলোড করুন' : 'Download'}
                            className={`w-7 h-7 rounded-lg border flex items-center justify-center transition active:scale-95 cursor-pointer ${
                              isDay
                                ? 'bg-slate-50 hover:bg-amber-50 border-slate-200 text-slate-500 hover:text-amber-700 hover:border-amber-300'
                                : 'bg-[#061b17] hover:bg-amber-500/15 border-emerald-800/70 text-amber-300/80 hover:text-amber-200'
                            }`}
                          >
                            <Download className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Headline + Concise 2-Line Editorial Deck */}
                    <div className="space-y-1">
                      <h3
                        className={`text-[15px] sm:text-base font-black tracking-tight leading-snug text-balance transition-colors ${
                          isDay
                            ? 'text-slate-900 group-hover:text-emerald-700'
                            : 'text-white group-hover:text-emerald-300'
                        }`}
                      >
                        {isBn ? col.titleBn : col.titleEn}
                      </h3>
                      <p
                        className={`text-xs leading-relaxed line-clamp-2 ${
                          isDay ? 'text-slate-600' : 'text-emerald-100/75'
                        }`}
                      >
                        {isBn ? col.summaryBn : col.summaryEn}
                      </p>
                    </div>

                    {/* Slim Footer Strip: Era Metadata + Index Toggle + Main-UI Emerald Read CTA */}
                    <div
                      className={`pt-2.5 mt-1 border-t flex items-center justify-between gap-2 flex-wrap ${
                        isDay ? 'border-slate-100' : 'border-emerald-800/45'
                      }`}
                    >
                      <span
                        className={`text-[11px] tabular-nums truncate max-w-[230px] sm:max-w-none ${
                          isDay ? 'text-slate-500' : 'text-emerald-300/75'
                        }`}
                      >
                        <strong className={isDay ? 'text-slate-700' : 'text-amber-200/95'}>
                          {isBn ? col.durationBn : col.durationEn}
                        </strong>
                        <span aria-hidden="true" className="mx-1.5 opacity-40">
                          ·
                        </span>
                        <span>{isBn ? col.eraLabelBn : col.eraLabelEn}</span>
                      </span>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (soundEnabled) soundHaptics.playTap();
                            setExpandedCardIndexId((prev) => (prev === col.id ? null : col.id));
                          }}
                          aria-expanded={isIndexExpanded}
                          className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                            isIndexExpanded
                              ? isDay
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                : 'bg-emerald-900/50 border-emerald-600/70 text-emerald-200'
                              : isDay
                              ? 'bg-slate-50 hover:bg-emerald-50/70 border-slate-200 text-slate-700 hover:text-emerald-800 hover:border-emerald-300'
                              : 'bg-[#061b17] hover:bg-emerald-900/40 border-emerald-800/70 text-emerald-200/90'
                          }`}
                        >
                          <List className="w-3 h-3" />
                          <span>
                            {isBn
                              ? `${toBnNumber(col.partsCount)} পর্ব`
                              : `${col.partsCount} Parts`}
                          </span>
                          <ChevronDown
                            className={`w-3 h-3 transition-transform duration-200 ${
                              isIndexExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openCollection(col.id, 'all', 1, false);
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11.5px] font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-2xs"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{isBn ? 'পড়ুন' : 'Read'}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expandable On-Demand Table of Contents Drawer (Native Light/Dark) */}
                {isIndexExpanded && (
                  <div
                    className={`relative z-10 px-3.5 sm:px-4 py-3 space-y-2.5 border-t animate-in fade-in duration-150 ${
                      isDay
                        ? 'bg-slate-50/80 border-slate-200/80'
                        : 'bg-[#051713] border-emerald-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] font-extrabold tracking-wide ${
                          isDay ? 'text-slate-600' : 'text-emerald-300/85'
                        }`}
                      >
                        {isBn
                          ? `ভেতরের ${toBnNumber(col.partsCount)}টি পর্বের সূচিপত্র`
                          : `Table of Contents (${col.partsCount} Parts)`}
                      </span>
                      <button
                        type="button"
                        onClick={() => openCollection(col.id, 'all', 1, false)}
                        className={`text-[11px] font-bold hover:underline cursor-pointer whitespace-nowrap shrink-0 ${
                          isDay ? 'text-emerald-700' : 'text-amber-300'
                        }`}
                      >
                        {isBn
                          ? `সব ${toBnNumber(col.eventsCount)}টি ঘটনা →`
                          : `All ${col.eventsCount} events →`}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {parts.map((part) => (
                        <button
                          key={part.partNo}
                          type="button"
                          onClick={() => openCollection(col.id, part.partNo, undefined, false)}
                          className={`text-left px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                            isDay
                              ? 'bg-white hover:bg-emerald-50/70 border-slate-200/90 hover:border-emerald-300 text-slate-800'
                              : 'bg-[#08221d] hover:bg-emerald-900/40 border-emerald-800/50 hover:border-emerald-500/50 text-emerald-100'
                          }`}
                        >
                          <div className="min-w-0 flex items-center gap-2">
                            <span
                              className="text-[11px] font-black tabular-nums shrink-0"
                              style={{ color: isDay ? part.accentHex : '#fbbf24' }}
                            >
                              {isBn ? toBnNumber(part.partNo, true) : `0${part.partNo}`}
                            </span>
                            <p className="text-[11.5px] font-bold truncate">
                              {isBn
                                ? part.titleBn.split('·').slice(1).join('·').trim() || part.titleBn
                                : part.titleEn.split('·').slice(1).join('·').trim() || part.titleEn}
                            </p>
                          </div>
                          <span
                            className={`text-[10px] font-semibold tabular-nums shrink-0 ${
                              isDay ? 'text-slate-400' : 'text-emerald-400/70'
                            }`}
                          >
                            {isBn ? `${toBnNumber(part.eventCount)}টি` : part.eventCount}
                          </span>
                        </button>
                      ))}
                    </div>

                    <p
                      className={`pt-2 border-t text-[10.5px] leading-relaxed ${
                        isDay
                          ? 'border-slate-200/70 text-slate-500'
                          : 'border-emerald-900/60 text-emerald-300/70'
                      }`}
                    >
                      <strong className={isDay ? 'text-slate-700' : 'text-emerald-200'}>
                        {isBn ? 'মূল সূত্র: ' : 'Sources: '}
                      </strong>
                      {isBn ? col.primarySourcesBn : col.primarySourcesEn}
                    </p>
                  </div>
                )}

                {/* Whisper-Thin Reading Progress Hairline along Bottom Edge */}
                <div
                  aria-hidden="true"
                  className={`h-[2px] w-full ${isDay ? 'bg-slate-100' : 'bg-emerald-950'}`}
                >
                  <div
                    className={`h-full transition-all duration-300 ${accent.bar}`}
                    style={{ width: `${Math.max(4, readPercent)}%`, opacity: 0.7 }}
                  />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ====================================================================
          LEVEL 2: COLLECTION-AGNOSTIC FULL-VIEWPORT ARCHIVAL MANUSCRIPT READER
          Supports Collection 01, 02 & 03 seamlessly
          ==================================================================== */}
      {isReaderOpen &&
        activeCollectionMeta &&
        currentEvent &&
        currentPartMeta &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={isBn ? activeCollectionMeta.titleBn : activeCollectionMeta.titleEn}
            className={`fixed inset-0 z-50 flex flex-col ${
              isDay ? 'bg-[#F8F6F1] text-stone-900' : 'bg-[#03130f] text-emerald-50'
            }`}
          >
            {/* Compact Sticky Reader Top Bar */}
            <header
              className={`shrink-0 border-b ${
                isDay
                  ? 'bg-[#053328] border-emerald-900 text-white'
                  : 'bg-[#041d17] border-emerald-800/80 text-white'
              }`}
            >
              <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 flex items-center justify-between gap-3">
                {/* Back + Active Collection Title */}
                <div className="flex items-center gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={closeCollection}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-bold text-amber-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{isBn ? 'সীরাতে ফিরুন' : 'Back'}</span>
                  </button>
                  <div className="min-w-0">
                    <h2 className="text-sm sm:text-base font-black truncate text-white">
                      {isBn ? activeCollectionMeta.titleBn : activeCollectionMeta.titleEn}
                    </h2>
                  </div>
                </div>

                {/* Mobile Switcher + Share + Close */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex lg:hidden items-center p-0.5 rounded-lg bg-black/25 border border-white/10">
                    <button
                      type="button"
                      onClick={() => setMobilePane('index')}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                        mobilePane === 'index'
                          ? 'bg-amber-400 text-emerald-950'
                          : 'text-emerald-100 hover:text-white'
                      }`}
                    >
                      <List className="w-3 h-3" />
                      <span>{isBn ? 'সূচি' : 'Index'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobilePane('reader')}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                        mobilePane === 'reader'
                          ? 'bg-amber-400 text-emerald-950'
                          : 'text-emerald-100 hover:text-white'
                      }`}
                    >
                      <BookOpen className="w-3 h-3" />
                      <span>{isBn ? 'পাঠ' : 'Read'}</span>
                    </button>
                  </div>

                  {onOpenShareModal && (
                    <div className="hidden sm:block">
                      <ShareDownloadButtons
                        selectedLanguage={selectedLanguage}
                        themeMode="night"
                        variant="hero"
                        onShare={() =>
                          onOpenShareModal(buildFullChronicleShare(activeCollectionMeta), 'share')
                        }
                        onDownload={() =>
                          onOpenShareModal(
                            buildFullChronicleShare(activeCollectionMeta),
                            'download'
                          )
                        }
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={closeCollection}
                    aria-label={isBn ? 'বন্ধ করুন' : 'Close reader'}
                    className="p-2 rounded-lg hover:bg-white/10 text-emerald-100 hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Hairline Chronological Reading Progress Bar */}
              <div className="h-[2px] w-full bg-white/10">
                <div
                  className="h-full bg-amber-400 transition-all duration-200"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </header>

            {/* Main Archival Two-Pane Body */}
            <div className="flex-1 min-h-0 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[360px_1fr]">
              {/* LEFT RAIL: CHRONOLOGICAL সূচিপত্র (TABLE OF CONTENTS) */}
              <aside
                className={`${
                  mobilePane === 'index' ? 'flex' : 'hidden lg:flex'
                } flex-col min-h-0 border-r ${
                  isDay
                    ? 'bg-white border-stone-200/90'
                    : 'bg-[#051a15] border-emerald-800/70'
                }`}
              >
                {/* Search & Part Filter Controls */}
                <div
                  className={`p-3.5 space-y-3 border-b shrink-0 ${
                    isDay ? 'border-stone-200/80' : 'border-emerald-800/60'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={`font-extrabold ${
                        isDay ? 'text-stone-800' : 'text-emerald-100'
                      }`}
                    >
                      {isBn
                        ? `পূর্ণাঙ্গ সূচিপত্র (${toBnNumber(activeCollectionMeta.partsCount)} পর্ব · ${toBnNumber(totalEventsCount)} ঘটনা)`
                        : `Complete Index (${activeCollectionMeta.partsCount} Parts · ${totalEventsCount} Events)`}
                    </span>
                    <span
                      className={`tabular-nums font-semibold ${
                        isDay ? 'text-stone-500' : 'text-emerald-300/75'
                      }`}
                    >
                      {isBn
                        ? `${toBnNumber(Object.keys(visitedEvents).length)}/${toBnNumber(totalEventsCount)} পঠিত`
                        : `${Object.keys(visitedEvents).length}/${totalEventsCount} read`}
                    </span>
                  </div>

                  {/* Search Input */}
                  <div className="relative">
                    <Search
                      className={`w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 ${
                        isDay ? 'text-stone-400' : 'text-emerald-400/70'
                      }`}
                    />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        isBn
                          ? 'ঘটনা, সাহাবি বা হাদিস গ্রন্থ খুঁজুন...'
                          : 'Search events, Companions, or books...'
                      }
                      className={`w-full pl-8 pr-7 py-2 rounded-lg text-xs border outline-none transition-colors ${
                        isDay
                          ? 'bg-stone-50 border-stone-200 text-stone-800 placeholder:text-stone-400 focus:bg-white focus:border-emerald-600'
                          : 'bg-[#03120e] border-emerald-800 text-emerald-50 placeholder:text-emerald-400/50 focus:border-amber-400/60'
                      }`}
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        aria-label={isBn ? 'মুছুন' : 'Clear'}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-emerald-200 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Part Filter Strip */}
                  <div className="flex flex-wrap gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (soundEnabled) soundHaptics.playTap();
                        setSelectedPart('all');
                      }}
                      className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer tabular-nums ${
                        selectedPart === 'all'
                          ? 'bg-emerald-800 text-amber-100'
                          : isDay
                          ? 'bg-stone-100 text-stone-700 hover:bg-stone-200/70'
                          : 'bg-[#03120e] text-emerald-200/80 hover:bg-emerald-900/50'
                      }`}
                    >
                      {isBn ? `সব (${toBnNumber(totalEventsCount)})` : `All (${totalEventsCount})`}
                    </button>
                    {activeCollectionData.parts.map((p) => {
                      const active = selectedPart === p.partNo;
                      return (
                        <button
                          key={p.partNo}
                          type="button"
                          onClick={() => {
                            if (soundEnabled) soundHaptics.playTap();
                            setSelectedPart(p.partNo);
                          }}
                          className={`px-2 py-1 rounded-md text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer tabular-nums ${
                            active
                              ? 'text-white'
                              : isDay
                              ? 'bg-stone-100 text-stone-700 hover:bg-stone-200/70'
                              : 'bg-[#03120e] text-emerald-200/80 hover:bg-emerald-900/50'
                          }`}
                          style={active ? { backgroundColor: p.accentHex } : undefined}
                        >
                          {isBn ? `পর্ব ${toBnNumber(p.partNo)}` : `Part ${p.partNo}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Scrollable Grouped Index List */}
                <div className="flex-1 overflow-y-auto divide-y divide-stone-100 dark:divide-emerald-900/60">
                  {groupedByPart.length === 0 ? (
                    <div className="p-8 text-center space-y-2">
                      <p className="text-xs font-bold text-stone-500 dark:text-emerald-300/75">
                        {isBn ? 'কোনো ঘটনা পাওয়া যায়নি।' : 'No matching events found.'}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedPart('all');
                        }}
                        className="text-xs font-bold text-emerald-700 dark:text-amber-300 underline cursor-pointer"
                      >
                        {isBn ? 'সব ঘটনা দেখুন' : 'Show all events'}
                      </button>
                    </div>
                  ) : (
                    groupedByPart.map(({ meta: part, events }) => (
                      <div key={part.partNo} className="py-2">
                        <div className="px-3.5 py-2 flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p
                              className="text-[11px] font-extrabold tabular-nums"
                              style={{ color: isDay ? part.accentHex : '#fbbf24' }}
                            >
                              {isBn
                                ? `পর্ব ${toBnNumber(part.partNo, true)} · ${part.dayTagBn}`
                                : `Part 0${part.partNo} · ${part.dayTagEn}`}
                            </p>
                            <p
                              className={`text-xs font-black truncate ${
                                isDay ? 'text-stone-800' : 'text-emerald-100'
                              }`}
                            >
                              {isBn
                                ? part.titleBn.split('·').slice(1).join('·').trim() || part.titleBn
                                : part.titleEn.split('·').slice(1).join('·').trim() || part.titleEn}
                            </p>
                          </div>
                          <span
                            dir="rtl"
                            className={`font-arabic text-xs shrink-0 ${
                              isDay ? 'text-stone-400' : 'text-emerald-400/60'
                            }`}
                          >
                            {part.arabicTitle.split('·').slice(-1)[0]?.trim() || part.arabicTitle}
                          </span>
                        </div>

                        <div className="px-2 space-y-0.5">
                          {events.map((ev) => {
                            const isSelected = ev.no === currentEvent.no;
                            const isVisited = !!visitedEvents[ev.no];
                            const numText = isBn
                              ? toBnNumber(ev.no, true)
                              : String(ev.no).padStart(2, '0');
                            return (
                              <button
                                key={ev.no}
                                type="button"
                                onClick={() => handleSelectEvent(ev.no)}
                                className={`w-full text-left px-2.5 py-2.5 rounded-xl transition-colors cursor-pointer flex items-start gap-2.5 ${
                                  isSelected
                                    ? isDay
                                      ? 'bg-emerald-50 text-emerald-950 ring-1 ring-emerald-300'
                                      : 'bg-emerald-900/65 text-white ring-1 ring-amber-400/40'
                                    : isDay
                                    ? 'hover:bg-stone-50 text-stone-800'
                                    : 'hover:bg-emerald-950/70 text-emerald-100/90'
                                }`}
                              >
                                <span
                                  className={`tabular-nums text-xs font-black pt-0.5 shrink-0 w-6 ${
                                    isSelected
                                      ? isDay
                                        ? 'text-emerald-800'
                                        : 'text-amber-300'
                                      : isDay
                                      ? 'text-stone-400'
                                      : 'text-emerald-500'
                                  }`}
                                >
                                  {numText}.
                                </span>
                                <div className="min-w-0 flex-1 space-y-0.5">
                                  <p className="text-xs sm:text-[13px] font-bold leading-snug">
                                    {isBn ? ev.titleBn : ev.titleEn}
                                  </p>
                                  <p
                                    className={`text-[11px] truncate ${
                                      isDay ? 'text-stone-500' : 'text-emerald-300/65'
                                    }`}
                                  >
                                    {isBn ? ev.sourceBn : ev.sourceEn}
                                  </p>
                                </div>
                                {isVisited && (
                                  <Check
                                    className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                                      isSelected
                                        ? isDay
                                          ? 'text-emerald-700'
                                          : 'text-amber-300'
                                        : isDay
                                        ? 'text-emerald-600/60'
                                        : 'text-emerald-400/60'
                                    }`}
                                  />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </aside>

              {/* RIGHT PANE: MUSEUM-GRADE ARCHIVAL EVENT READER FOLIO */}
              <main
                ref={readerScrollRef}
                className={`${
                  mobilePane === 'reader' ? 'block' : 'hidden lg:block'
                } overflow-y-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-9`}
              >
                <article className="max-w-3xl mx-auto space-y-7">
                  {/* Mobile Return-to-Index Link */}
                  <div className="lg:hidden">
                    <button
                      type="button"
                      onClick={() => setMobilePane('index')}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold cursor-pointer ${
                        isDay ? 'text-emerald-800' : 'text-amber-300'
                      }`}
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>
                        {isBn
                          ? `${toBnNumber(totalEventsCount)}টি ঘটনার সূচিপত্রে ফিরুন`
                          : `Back to ${totalEventsCount}-Event Index`}
                      </span>
                    </button>
                  </div>

                  {/* Editorial Folio Header */}
                  <header
                    className={`pb-6 border-b space-y-3 ${
                      isDay ? 'border-stone-200' : 'border-emerald-800/70'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div
                        className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-bold tabular-nums ${
                          isDay ? 'text-stone-500' : 'text-emerald-300/80'
                        }`}
                      >
                        <span style={{ color: isDay ? currentPartMeta.accentHex : '#fbbf24' }}>
                          {isBn
                            ? `ঘটনা ${toBnNumber(currentEvent.no, true)} / ${toBnNumber(totalEventsCount)}`
                            : `Event ${String(currentEvent.no).padStart(2, '0')} / ${totalEventsCount}`}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {isBn
                            ? `পর্ব ${toBnNumber(currentPartMeta.partNo)}: ${currentPartMeta.dayTagBn}`
                            : `Part ${currentPartMeta.partNo}: ${currentPartMeta.dayTagEn}`}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>
                          {isBn ? currentEvent.timeContextBn : currentEvent.timeContextEn}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyEvent(activeCollectionMeta, currentEvent, currentPartMeta)
                          }
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors whitespace-nowrap cursor-pointer ${
                            copiedKey === `${activeCollectionMeta.id}-${currentEvent.no}`
                              ? 'bg-emerald-700 text-white border-emerald-700'
                              : isDay
                              ? 'bg-white hover:bg-stone-100 text-stone-700 border-stone-200'
                              : 'bg-[#07201a] hover:bg-emerald-900 text-emerald-100 border-emerald-800'
                          }`}
                        >
                          {copiedKey === `${activeCollectionMeta.id}-${currentEvent.no}` ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{isBn ? 'কপি হয়েছে' : 'Copied'}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{isBn ? 'কপি' : 'Copy'}</span>
                            </>
                          )}
                        </button>

                        {onOpenShareModal && (
                          <button
                            type="button"
                            onClick={() =>
                              onOpenShareModal(
                                buildSingleEventShare(
                                  activeCollectionMeta,
                                  currentEvent,
                                  currentPartMeta
                                ),
                                'share'
                              )
                            }
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors whitespace-nowrap cursor-pointer ${
                              isDay
                                ? 'bg-amber-50 hover:bg-amber-100 text-amber-950 border-amber-200'
                                : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-200 border-amber-400/30'
                            }`}
                          >
                            <Share2 className="w-3.5 h-3.5" />
                            <span>{isBn ? 'শেয়ার' : 'Share'}</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <h1
                      className={`text-2xl sm:text-3xl font-black tracking-tight leading-snug text-balance ${
                        isDay ? 'text-stone-900' : 'text-white'
                      }`}
                    >
                      {isBn ? currentEvent.titleBn : currentEvent.titleEn}
                    </h1>

                    <p
                      className={`text-xs sm:text-sm ${
                        isDay ? 'text-stone-600' : 'text-emerald-200/80'
                      }`}
                    >
                      {isBn ? currentPartMeta.titleBn : currentPartMeta.titleEn} —{' '}
                      {isBn ? currentPartMeta.subtitleBn : currentPartMeta.subtitleEn}
                    </p>
                  </header>

                  {/* 1. Key Verified Summary Points */}
                  <section
                    className={`rounded-2xl border p-4 sm:p-5 space-y-2.5 ${
                      isDay
                        ? 'bg-white border-stone-200/90'
                        : 'bg-[#07201a] border-emerald-800/70'
                    }`}
                  >
                    <h3
                      className={`text-xs font-extrabold tracking-wide ${
                        isDay ? 'text-emerald-800' : 'text-amber-300'
                      }`}
                    >
                      {isBn ? 'মূল প্রামাণ্য সারসংক্ষেপ' : 'Core Verified Summary'}
                    </h3>
                    <ul className="space-y-2">
                      {(isBn ? currentEvent.pointsBn : currentEvent.pointsEn).map((pt, idx) => (
                        <li
                          key={idx}
                          className={`flex items-start gap-2.5 text-sm sm:text-[15px] font-medium leading-relaxed ${
                            isDay ? 'text-stone-800' : 'text-emerald-50'
                          }`}
                        >
                          <CheckCircle2
                            className="w-4 h-4 mt-1 shrink-0"
                            style={{ color: isDay ? currentPartMeta.accentHex : '#34d399' }}
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* 2. Arabic Pull-Quote */}
                  {currentEvent.arabicQuote && (
                    <blockquote
                      dir="rtl"
                      className={`py-5 border-y text-center font-arabic text-xl sm:text-2xl leading-[2.1] ${
                        isDay
                          ? 'border-amber-300/70 text-emerald-950'
                          : 'border-amber-400/30 text-amber-200'
                      }`}
                    >
                      {currentEvent.arabicQuote}
                    </blockquote>
                  )}

                  {/* 3. Two-Layer Detailed Historical Narration */}
                  <section className="space-y-4">
                    <h3
                      className={`text-xs font-extrabold tracking-wide ${
                        isDay ? 'text-stone-500' : 'text-emerald-300/80'
                      }`}
                    >
                      {isBn ? 'বিস্তারিত ঐতিহাসিক বিবরণ' : 'Detailed Historical Account'}
                    </h3>
                    <div
                      className={`space-y-4 text-[15px] sm:text-base leading-[1.9] max-w-prose ${
                        isDay ? 'text-stone-800' : 'text-emerald-50/90'
                      }`}
                    >
                      <p>
                        {isBn ? currentEvent.detailedNarrativeBn : currentEvent.detailedNarrativeEn}
                      </p>
                      {currentEvent.extendedContextBn && (
                        <p>
                          {isBn ? currentEvent.extendedContextBn : currentEvent.extendedContextEn}
                        </p>
                      )}
                    </div>
                  </section>

                  {/* 4. Archival Metadata Grid */}
                  <section
                    className={`rounded-2xl border divide-y ${
                      isDay
                        ? 'bg-white border-stone-200/90 divide-stone-100'
                        : 'bg-[#07201a] border-emerald-800/70 divide-emerald-900/70'
                    }`}
                  >
                    <dl className="divide-y divide-inherit text-xs sm:text-sm">
                      <div className="px-4 sm:px-5 py-3 grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1">
                        <dt
                          className={`font-bold ${
                            isDay ? 'text-stone-500' : 'text-emerald-300/75'
                          }`}
                        >
                          {isBn ? 'সময়কাল' : 'Timeframe'}
                        </dt>
                        <dd className={isDay ? 'text-stone-900 font-medium' : 'text-emerald-50'}>
                          {isBn ? currentEvent.timeContextBn : currentEvent.timeContextEn}
                        </dd>
                      </div>
                      <div className="px-4 sm:px-5 py-3 grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1">
                        <dt
                          className={`font-bold ${
                            isDay ? 'text-stone-500' : 'text-emerald-300/75'
                          }`}
                        >
                          {isBn ? 'ঐতিহাসিক স্থান' : 'Location'}
                        </dt>
                        <dd className={isDay ? 'text-stone-900 font-medium' : 'text-emerald-50'}>
                          {isBn ? currentEvent.locationBn : currentEvent.locationEn}
                        </dd>
                      </div>
                      {currentEvent.keyFiguresBn && (
                        <div className="px-4 sm:px-5 py-3 grid grid-cols-1 sm:grid-cols-[160px_1fr] gap-1">
                          <dt
                            className={`font-bold ${
                              isDay ? 'text-stone-500' : 'text-emerald-300/75'
                            }`}
                          >
                            {isBn ? 'সংশ্লিষ্ট ব্যক্তিবর্গ' : 'Key Figures'}
                          </dt>
                          <dd className={isDay ? 'text-stone-900 font-medium' : 'text-emerald-50'}>
                            {isBn ? currentEvent.keyFiguresBn : currentEvent.keyFiguresEn}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </section>

                  {/* 5. Spiritual & Historical Reflection */}
                  <section
                    className={`rounded-2xl border p-4 sm:p-5 space-y-1.5 ${
                      isDay
                        ? 'bg-emerald-50/60 border-emerald-200/80 text-emerald-950'
                        : 'bg-[#06221b] border-emerald-700/60 text-emerald-100'
                    }`}
                  >
                    <h3
                      className={`text-xs font-extrabold tracking-wide ${
                        isDay ? 'text-emerald-800' : 'text-amber-300'
                      }`}
                    >
                      {isBn ? 'ঐতিহাসিক শিক্ষা ও আত্মিক অনুভূতি' : 'Historical Lesson & Reflection'}
                    </h3>
                    <p className="text-sm sm:text-[15px] leading-relaxed">
                      {isBn ? currentEvent.reflectionBn : currentEvent.reflectionEn}
                    </p>
                  </section>

                  {/* 6. Detailed Multi-Book Hadith & Seerah References Block */}
                  <section
                    className={`rounded-2xl border overflow-hidden ${
                      isDay
                        ? 'bg-white border-stone-200/90'
                        : 'bg-[#07201a] border-emerald-800/70'
                    }`}
                  >
                    <div
                      className={`px-4 sm:px-5 py-3 border-b flex items-center justify-between gap-2 ${
                        isDay
                          ? 'bg-stone-50 border-stone-200/80'
                          : 'bg-[#041713] border-emerald-800/70'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <BookOpen
                          className={`w-4 h-4 ${isDay ? 'text-emerald-800' : 'text-amber-300'}`}
                        />
                        <h3
                          className={`text-xs font-extrabold tracking-wide ${
                            isDay ? 'text-stone-800' : 'text-emerald-100'
                          }`}
                        >
                          {isBn
                            ? 'প্রামাণ্য হাদিস ও সীরাত সূত্রাবলি (রেফারেন্স)'
                            : 'Verified Hadith & Classical Seerah References'}
                        </h3>
                      </div>
                      <span
                        className={`text-[11px] font-semibold tabular-nums ${
                          isDay ? 'text-stone-500' : 'text-emerald-300/70'
                        }`}
                      >
                        {isBn
                          ? `${toBnNumber(currentEvent.references.length)}টি সূত্র`
                          : `${currentEvent.references.length} source(s)`}
                      </span>
                    </div>

                    <div className="divide-y divide-stone-100 dark:divide-emerald-900/60">
                      {currentEvent.references.map((ref, idx) => (
                        <div key={idx} className="px-4 sm:px-5 py-3.5 space-y-1">
                          <div className="flex flex-wrap items-baseline justify-between gap-2">
                            <p
                              className={`text-sm font-extrabold ${
                                isDay ? 'text-stone-900' : 'text-white'
                              }`}
                            >
                              {isBn ? ref.bookBn : ref.bookEn}
                            </p>
                            <span
                              className={`text-xs font-bold ${
                                ref.isWeakNote
                                  ? isDay
                                    ? 'text-amber-700'
                                    : 'text-amber-300'
                                  : isDay
                                  ? 'text-emerald-800'
                                  : 'text-emerald-300'
                              }`}
                            >
                              {isBn ? ref.gradeBn : ref.gradeEn}
                            </span>
                          </div>
                          <p
                            className={`text-xs ${
                              isDay ? 'text-stone-600' : 'text-emerald-200/80'
                            }`}
                          >
                            {isBn ? ref.chapterBn : ref.chapterEn}
                            <span aria-hidden="true" className="mx-1.5 opacity-50">
                              ·
                            </span>
                            <strong className={isDay ? 'text-stone-800' : 'text-amber-200'}>
                              {isBn ? ref.citationBn : ref.citationEn}
                            </strong>
                          </p>
                        </div>
                      ))}
                    </div>
                  </section>

                  {/* 7. Previous / Next Chronological Navigation Bar */}
                  <nav
                    aria-label={isBn ? 'ঘটনা নেভিগেশন' : 'Event navigation'}
                    className={`pt-5 border-t grid grid-cols-1 sm:grid-cols-2 gap-3 ${
                      isDay ? 'border-stone-200' : 'border-emerald-800/70'
                    }`}
                  >
                    {prevEvent ? (
                      <button
                        type="button"
                        onClick={() => handleSelectEvent(prevEvent.no)}
                        className={`text-left p-3.5 rounded-xl border transition-colors cursor-pointer flex items-center gap-3 ${
                          isDay
                            ? 'bg-white hover:bg-emerald-50/70 border-stone-200 hover:border-emerald-300'
                            : 'bg-[#07201a] hover:bg-emerald-900/50 border-emerald-800/70 hover:border-amber-400/40'
                        }`}
                      >
                        <ArrowLeft className="w-4 h-4 shrink-0 text-emerald-700 dark:text-amber-300" />
                        <div className="min-w-0">
                          <span
                            className={`block text-[11px] font-bold tabular-nums ${
                              isDay ? 'text-stone-500' : 'text-emerald-300/75'
                            }`}
                          >
                            {isBn
                              ? `পূর্ববর্তী · ঘটনা ${toBnNumber(prevEvent.no, true)}`
                              : `Previous · Event ${String(prevEvent.no).padStart(2, '0')}`}
                          </span>
                          <span className="block text-xs sm:text-sm font-extrabold truncate">
                            {isBn ? prevEvent.titleBn : prevEvent.titleEn}
                          </span>
                        </div>
                      </button>
                    ) : (
                      <div />
                    )}

                    {nextEvent ? (
                      <button
                        type="button"
                        onClick={() => handleSelectEvent(nextEvent.no)}
                        className={`text-right p-3.5 rounded-xl border transition-colors cursor-pointer flex items-center justify-end gap-3 ${
                          isDay
                            ? 'bg-white hover:bg-emerald-50/70 border-stone-200 hover:border-emerald-300'
                            : 'bg-[#07201a] hover:bg-emerald-900/50 border-emerald-800/70 hover:border-amber-400/40'
                        }`}
                      >
                        <div className="min-w-0">
                          <span
                            className={`block text-[11px] font-bold tabular-nums ${
                              isDay ? 'text-stone-500' : 'text-emerald-300/75'
                            }`}
                          >
                            {isBn
                              ? `পরবর্তী · ঘটনা ${toBnNumber(nextEvent.no, true)}`
                              : `Next · Event ${String(nextEvent.no).padStart(2, '0')}`}
                          </span>
                          <span className="block text-xs sm:text-sm font-extrabold truncate">
                            {isBn ? nextEvent.titleBn : nextEvent.titleEn}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 shrink-0 text-emerald-700 dark:text-amber-300" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={closeCollection}
                        className="text-right p-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white transition-colors cursor-pointer flex items-center justify-end gap-3"
                      >
                        <div className="min-w-0">
                          <span className="block text-[11px] font-bold text-amber-200 tabular-nums">
                            {isBn
                              ? `সংকলন সমাপ্ত (${toBnNumber(totalEventsCount)}/${toBnNumber(totalEventsCount)})`
                              : `End of Collection (${totalEventsCount}/${totalEventsCount})`}
                          </span>
                          <span className="block text-xs sm:text-sm font-extrabold">
                            {isBn ? 'সীরাত সূচিপত্রে ফিরে যান' : 'Return to Seerah Index'}
                          </span>
                        </div>
                        <Check className="w-4 h-4 shrink-0 text-amber-300" />
                      </button>
                    )}
                  </nav>
                </article>
              </main>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
