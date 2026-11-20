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
  GitBranch,
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
import { ProphetFamilyTreeView } from './ProphetFamilyTreeView';
import { stepBackOr, useBackLayer } from '../utils/backNavigation';

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
  const [familyViewMode, setFamilyViewMode] = useState<'tree' | 'reader'>('tree');
  const [openedReaderFromTree, setOpenedReaderFromTree] = useState<boolean>(false);
  const [enteredMobileReaderFromIndex, setEnteredMobileReaderFromIndex] = useState<boolean>(false);
  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  );
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
    const onResize = () => setIsMobileViewport(window.innerWidth < 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Lock background scroll while collection reader portal is open
  useEffect(() => {
    if (!isReaderOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isReaderOpen]);

  // Step-by-step Back Layers:
  // Layer 1: Collection Portal itself -> returns to Seerat-un-Nabi
  useBackLayer(isReaderOpen, () => setActiveCollectionId(null), 'seerat-collection-portal');

  // Layer 2a: Collection 04 Full Biography Reader (when navigated from Family Tree) -> returns to Family Tree
  useBackLayer(
    isReaderOpen &&
      activeCollectionId === 'prophet-family-47' &&
      familyViewMode === 'reader' &&
      openedReaderFromTree,
    () => {
      setFamilyViewMode('tree');
      setOpenedReaderFromTree(false);
    },
    'family-full-reader'
  );

  // Layer 2b: Mobile Event Reader pane (when navigated from Collection Index) -> returns to Index
  useBackLayer(
    isReaderOpen &&
      isMobileViewport &&
      !(activeCollectionId === 'prophet-family-47' && familyViewMode === 'tree') &&
      mobilePane === 'reader' &&
      enteredMobileReaderFromIndex,
    () => {
      setMobilePane('index');
      setEnteredMobileReaderFromIndex(false);
    },
    'collection-mobile-reader'
  );

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
    openReaderDirectlyOnMobile = false,
    initialFamilyMode?: 'tree' | 'reader'
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
    setOpenedReaderFromTree(false);
    setEnteredMobileReaderFromIndex(false);
    if (collectionId === 'prophet-family-47') {
      setFamilyViewMode(initialFamilyMode ?? (initialPart === 'all' ? 'tree' : 'reader'));
    }
    setMobilePane(openReaderDirectlyOnMobile ? 'reader' : 'index');
    setActiveCollectionId(collectionId);
  };

  // Step back one exact level (Full Reader -> Tree, Mobile Reader -> Index, Portal -> Seerat)
  const handleStepBack = () => {
    if (soundEnabled) soundHaptics.playTap();
    stepBackOr(() => {
      if (activeCollectionId === 'prophet-family-47' && familyViewMode === 'reader' && openedReaderFromTree) {
        setFamilyViewMode('tree');
        setOpenedReaderFromTree(false);
        return;
      }
      if (isMobileViewport && mobilePane === 'reader' && enteredMobileReaderFromIndex) {
        setMobilePane('index');
        setEnteredMobileReaderFromIndex(false);
        return;
      }
      setActiveCollectionId(null);
    });
  };

  const closeCollection = () => {
    if (soundEnabled) soundHaptics.playTap();
    setOpenedReaderFromTree(false);
    setEnteredMobileReaderFromIndex(false);
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
    if (isMobileViewport && mobilePane === 'index') {
      setEnteredMobileReaderFromIndex(true);
    }
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
          LEVEL 1: LUXURY MAIN-UI-NATIVE SEERAH ARCHIVE SHOWCASE
          Museum-grade Islamic manuscript aesthetics in Emerald, Gold & Ivory
          ==================================================================== */}
      <section
        aria-labelledby="special-seerah-collections-heading"
        className={`relative overflow-hidden mt-5 rounded-[24px] border p-3.5 sm:p-5 space-y-3.5 transition-colors ${
          isDay
            ? 'bg-gradient-to-br from-[#F2FBF7] via-[#FFFFFF] to-[#FFFDF6] border-emerald-200/85 shadow-[0_12px_36px_-18px_rgba(6,78,59,0.16)]'
            : 'bg-gradient-to-br from-[#051814] via-[#07201b] to-[#0a251f] border-emerald-700/45 shadow-[0_18px_44px_-18px_rgba(0,0,0,0.65)]'
        }`}
      >
        {/* Top Luminous Gold-to-Emerald Illuminated Foil */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 h-[2.5px]"
          style={{
            background: isDay
              ? 'linear-gradient(90deg, rgba(16,185,129,0.15) 0%, #059669 30%, #d97706 68%, rgba(217,119,6,0.12) 100%)'
              : 'linear-gradient(90deg, rgba(16,185,129,0.2) 0%, #34d399 30%, #fbbf24 68%, rgba(251,191,36,0.15) 100%)',
          }}
        />

        {/* Delicate Architectural Mashrabiya & Mihrab Lattice Backdrop */}
        <svg
          aria-hidden="true"
          viewBox="0 0 280 140"
          className={`pointer-events-none absolute right-0 top-0 w-64 sm:w-72 h-auto ${
            isDay ? 'text-emerald-700/[0.055]' : 'text-amber-300/[0.06]'
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M 190 130 V 62 Q 190 22 230 10 Q 270 22 270 62 V 130" />
          <path d="M 202 130 V 66 Q 202 34 230 24 Q 258 34 258 66 V 130" strokeDasharray="3 3" />
          <rect x="206" y="54" width="48" height="48" />
          <rect x="206" y="54" width="48" height="48" transform="rotate(45 230 78)" />
          <circle cx="230" cy="78" r="14" />
          <circle cx="140" cy="48" r="22" strokeDasharray="2 4" />
          <rect x="124" y="32" width="32" height="32" transform="rotate(45 140 48)" />
        </svg>

        {/* Curatorial Archive Masthead */}
        <div className="relative z-10 space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1.5">
              <div
                className={`flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] sm:text-xs font-bold tracking-wide tabular-nums ${
                  isDay ? 'text-emerald-700' : 'text-emerald-300'
                }`}
              >
                <span>{isBn ? 'সীরাতুন নবী ﷺ' : 'Seerat-un-Nabi ﷺ'}</span>
                <span aria-hidden="true" className="opacity-35">
                  ·
                </span>
                <span>
                  {isBn
                    ? `বিশেষ ঐতিহাসিক আর্কাইভ (${toBnNumber(SEERAT_SPECIAL_COLLECTIONS.length)}টি সংকলন)`
                    : `Curated Seerah Archive (${SEERAT_SPECIAL_COLLECTIONS.length} Volumes)`}
                </span>
                <span aria-hidden="true" className="opacity-35">
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
                className={`text-xl sm:text-2xl font-black tracking-tight text-balance ${
                  isDay ? 'text-slate-900' : 'text-white'
                }`}
              >
                {isBn ? 'বিশেষ ঐতিহাসিক সংকলন (সূচিপত্র)' : 'Special Historical Collections (Index)'}
              </h2>

              <p
                className={`text-xs sm:text-[13px] max-w-2xl leading-relaxed ${
                  isDay ? 'text-slate-600' : 'text-emerald-200/80'
                }`}
              >
                {isBn
                  ? 'নবীজীবনের গুরুত্বপূর্ণ অধ্যায়সমূহের প্রামাণ্য হাদিস ও সীরাতভিত্তিক পৃথক সংকলন। যেকোনো শিরোনামে ক্লিক করে ভেতরের পূর্ণাঙ্গ সূচিপত্র, বিস্তারিত ঘটনা ও রেফারেন্স পড়ুন।'
                  : 'Authentic Hadith- and Seerah-based historical volumes. Select any title below to open its full table of contents, detailed narrations, and verified references.'}
              </p>
            </div>

            {/* Calligraphic Arabic Monograph Signature */}
            <div className="shrink-0 flex flex-col sm:items-end gap-1">
              <span
                dir="rtl"
                className={`font-arabic text-lg sm:text-xl leading-none ${
                  isDay ? 'text-amber-800/90' : 'text-amber-300/90'
                }`}
              >
                المختارات التاريخية من السيرة النبوية
              </span>
              <span
                aria-hidden="true"
                className="h-[1.5px] w-28 rounded-full"
                style={{
                  background: isDay
                    ? 'linear-gradient(90deg, transparent, #d97706, #059669)'
                    : 'linear-gradient(90deg, transparent, #fbbf24, #34d399)',
                }}
              />
            </div>
          </div>

          {/* Illuminated Ornamental Section Divider */}
          <div className="flex items-center gap-3" aria-hidden="true">
            <div
              className={`h-px flex-1 ${
                isDay
                  ? 'bg-gradient-to-r from-emerald-300/80 via-amber-300/60 to-transparent'
                  : 'bg-gradient-to-r from-emerald-600/70 via-amber-400/50 to-transparent'
              }`}
            />
            <svg
              viewBox="0 0 18 18"
              className={`w-3.5 h-3.5 shrink-0 ${
                isDay ? 'text-amber-600/70' : 'text-amber-300/70'
              }`}
              fill="currentColor"
            >
              <path d="M9 0.5 L11.5 6.5 L17.5 9 L11.5 11.5 L9 17.5 L6.5 11.5 L0.5 9 L6.5 6.5 Z" />
            </svg>
            <div
              className={`h-px flex-1 ${
                isDay
                  ? 'bg-gradient-to-l from-emerald-300/80 via-amber-300/60 to-transparent'
                  : 'bg-gradient-to-l from-emerald-600/70 via-amber-400/50 to-transparent'
              }`}
            />
          </div>
        </div>

        {/* Slim 2x2 Luxury Illuminated Editorial Folio Grid */}
        <div
          className={`relative z-10 grid gap-2.5 sm:gap-3 items-start ${
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

            // Refined, cohesive jewel accents strictly harmonized with the Main UI palette
            const accent =
              idx === 0
                ? {
                    sealStroke: isDay ? '#059669' : '#34d399',
                    sealFill: isDay ? '#ECFDF5' : '#063327',
                    sealText: isDay
                      ? 'text-emerald-800 group-hover:text-white'
                      : 'text-emerald-200 group-hover:text-emerald-950',
                    sealHoverFill: isDay
                      ? 'group-hover:fill-emerald-600'
                      : 'group-hover:fill-emerald-400',
                    kicker: isDay ? 'text-emerald-700' : 'text-emerald-300',
                    topSheen:
                      'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.55) 50%, transparent 100%)',
                    aura: 'rgba(16, 185, 129, 0.08)',
                    bar: 'bg-gradient-to-r from-emerald-500 to-teal-400',
                    filigree: isDay ? 'text-emerald-700/[0.055]' : 'text-emerald-300/[0.07]',
                  }
                : idx === 1
                ? {
                    sealStroke: isDay ? '#0d9488' : '#2dd4bf',
                    sealFill: isDay ? '#F0FDFA' : '#063136',
                    sealText: isDay
                      ? 'text-teal-800 group-hover:text-white'
                      : 'text-teal-200 group-hover:text-teal-950',
                    sealHoverFill: isDay
                      ? 'group-hover:fill-teal-600'
                      : 'group-hover:fill-teal-400',
                    kicker: isDay ? 'text-teal-700' : 'text-teal-300',
                    topSheen:
                      'linear-gradient(90deg, transparent 0%, rgba(20,184,166,0.55) 50%, transparent 100%)',
                    aura: 'rgba(20, 184, 166, 0.08)',
                    bar: 'bg-gradient-to-r from-teal-500 to-emerald-400',
                    filigree: isDay ? 'text-teal-700/[0.055]' : 'text-teal-300/[0.07]',
                  }
                : idx === 2
                ? {
                    sealStroke: isDay ? '#d97706' : '#fbbf24',
                    sealFill: isDay ? '#FFFBEB' : '#332208',
                    sealText: isDay
                      ? 'text-amber-800 group-hover:text-white'
                      : 'text-amber-200 group-hover:text-amber-950',
                    sealHoverFill: isDay
                      ? 'group-hover:fill-amber-600'
                      : 'group-hover:fill-amber-400',
                    kicker: isDay ? 'text-amber-700' : 'text-amber-300',
                    topSheen:
                      'linear-gradient(90deg, transparent 0%, rgba(217,119,6,0.55) 50%, transparent 100%)',
                    aura: 'rgba(217, 119, 6, 0.08)',
                    bar: 'bg-gradient-to-r from-amber-500 to-yellow-400',
                    filigree: isDay ? 'text-amber-700/[0.06]' : 'text-amber-300/[0.07]',
                  }
                : {
                    sealStroke: isDay ? '#047857' : '#f59e0b',
                    sealFill: isDay ? '#F3FBF7' : '#0b2c23',
                    sealText: isDay
                      ? 'text-emerald-900 group-hover:text-white'
                      : 'text-amber-200 group-hover:text-emerald-950',
                    sealHoverFill: isDay
                      ? 'group-hover:fill-emerald-700'
                      : 'group-hover:fill-amber-300',
                    kicker: isDay ? 'text-emerald-800' : 'text-amber-300',
                    topSheen:
                      'linear-gradient(90deg, transparent 0%, rgba(5,150,105,0.45) 35%, rgba(217,119,6,0.5) 65%, transparent 100%)',
                    aura: 'rgba(5, 150, 105, 0.08)',
                    bar: 'bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-400',
                    filigree: isDay ? 'text-emerald-800/[0.055]' : 'text-amber-300/[0.07]',
                  };

            return (
              <article
                key={col.id}
                className={`group relative overflow-hidden rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 ${
                  isDay
                    ? 'bg-white/95 border-slate-200/85 shadow-[0_2px_12px_-4px_rgba(6,78,59,0.08)] hover:border-emerald-400/75 hover:shadow-[0_14px_30px_-12px_rgba(6,78,59,0.18)]'
                    : 'bg-[#08221d]/95 border-emerald-800/60 shadow-[0_4px_16px_-6px_rgba(0,0,0,0.45)] hover:border-emerald-500/65 hover:shadow-[0_16px_32px_-12px_rgba(0,0,0,0.65)]'
                }`}
              >
                {/* Specular Top Hairline Shimmer */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none h-[2px] w-full opacity-75 group-hover:opacity-100 transition-opacity"
                  style={{ background: accent.topSheen }}
                />

                {/* Soft Hover Illumination Wash */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-12 -right-12 w-44 h-44 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: accent.aura }}
                />

                {/* Subtle Islamic Geometric Star Watermark */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 120 120"
                  className={`pointer-events-none absolute -right-5 top-1/2 -translate-y-1/2 w-28 h-28 transition-transform duration-500 ease-out group-hover:rotate-12 ${accent.filigree}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.15"
                >
                  <rect x="24" y="24" width="72" height="72" />
                  <rect x="24" y="24" width="72" height="72" transform="rotate(45 60 60)" />
                  <circle cx="60" cy="60" r="26" strokeDasharray="3 3" />
                  <circle cx="60" cy="60" r="12" />
                </svg>

                {/* Minimal, Ultra-Clean Luxury Folio Body */}
                <div
                  onClick={() => openCollection(col.id, 'all', 1, false)}
                  className="relative z-10 cursor-pointer px-4 py-3.5 sm:px-5 sm:py-4 space-y-3"
                >
                  {/* Top Row: Rub el Hizb Seal + Arabic & Main Title + Subtle Icon Actions */}
                  <div className="flex items-start gap-3.5">
                    {/* Custom Eight-Pointed Rub el Hizb Volume Seal */}
                    <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 56 56"
                        className="w-12 h-12 transition-transform duration-500 ease-out group-hover:rotate-45"
                      >
                        <rect
                          x="10"
                          y="10"
                          width="36"
                          height="36"
                          rx="4"
                          fill={accent.sealFill}
                          stroke={accent.sealStroke}
                          strokeWidth="1.4"
                          className={`transition-colors duration-200 ${accent.sealHoverFill}`}
                        />
                        <rect
                          x="10"
                          y="10"
                          width="36"
                          height="36"
                          rx="4"
                          transform="rotate(45 28 28)"
                          fill={accent.sealFill}
                          stroke={accent.sealStroke}
                          strokeWidth="1.4"
                          className={`transition-colors duration-200 ${accent.sealHoverFill}`}
                        />
                        <circle
                          cx="28"
                          cy="28"
                          r="13.5"
                          fill="none"
                          stroke={accent.sealStroke}
                          strokeOpacity="0.28"
                          strokeWidth="0.9"
                        />
                      </svg>
                      <span
                        className={`absolute inset-0 flex items-center justify-center text-[13.5px] font-black tracking-tight tabular-nums transition-colors duration-200 ${accent.sealText}`}
                      >
                        {volumeNum}
                      </span>
                    </div>

                    {/* Essential Titles Only: Arabic Calligraphic Subtitle + Bold Title */}
                    <div className="min-w-0 flex-1 space-y-1 pt-0.5">
                      <p
                        dir="rtl"
                        className={`font-arabic text-[13.5px] text-left leading-none truncate ${
                          isDay ? 'text-amber-700/90' : 'text-amber-300/90'
                        }`}
                      >
                        {col.arabicTitle}
                      </p>
                      <h3
                        className={`text-[15.5px] sm:text-[17px] font-black tracking-tight leading-snug text-balance transition-colors ${
                          isDay
                            ? 'text-slate-900 group-hover:text-emerald-700'
                            : 'text-white group-hover:text-emerald-300'
                        }`}
                      >
                        {isBn ? col.titleBn : col.titleEn}
                      </h3>
                    </div>

                    {/* Subtle Compact Share & Download Icons */}
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
                              ? 'bg-slate-50/90 hover:bg-emerald-50 border-slate-200/80 text-slate-400 hover:text-emerald-700 hover:border-emerald-300'
                              : 'bg-[#061b17] hover:bg-emerald-900/50 border-emerald-800/70 text-emerald-300/70 hover:text-emerald-200'
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
                              ? 'bg-slate-50/90 hover:bg-amber-50 border-slate-200/80 text-slate-400 hover:text-amber-700 hover:border-amber-300'
                              : 'bg-[#061b17] hover:bg-amber-500/15 border-emerald-800/70 text-amber-300/75 hover:text-amber-200'
                          }`}
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Clean Slim Bottom Strip: Essential Count + Index & Read Actions */}
                  <div
                    className={`pt-2.5 border-t flex items-center justify-between gap-2 ${
                      isDay ? 'border-slate-100' : 'border-emerald-800/45'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold tabular-nums min-w-0 truncate">
                      <span className={accent.kicker}>
                        {isBn ? `${toBnNumber(col.partsCount)} পর্ব` : `${col.partsCount} Parts`}
                      </span>
                      <span aria-hidden="true" className="opacity-35">
                        ·
                      </span>
                      <span className={isDay ? 'text-slate-600' : 'text-emerald-200/80'}>
                        {isBn
                          ? `${toBnNumber(col.eventsCount)} ঘটনা`
                          : `${col.eventsCount} Events`}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (soundEnabled) soundHaptics.playTap();
                          setExpandedCardIndexId((prev) => (prev === col.id ? null : col.id));
                        }}
                        aria-expanded={isIndexExpanded}
                        className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-[11.5px] font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                          isIndexExpanded
                            ? isDay
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-2xs'
                              : 'bg-emerald-900/55 border-emerald-500/60 text-emerald-200'
                            : isDay
                            ? 'bg-slate-50/90 hover:bg-emerald-50/75 border-slate-200/90 text-slate-700 hover:text-emerald-800 hover:border-emerald-300'
                            : 'bg-[#061b17] hover:bg-emerald-900/40 border-emerald-800/70 text-emerald-200/90'
                        }`}
                      >
                        <List className="w-3.5 h-3.5" />
                        <span>{isBn ? 'সূচি' : 'Index'}</span>
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
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-[11.5px] font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer shadow-sm shadow-emerald-600/20 active:scale-95"
                      >
                        {col.id === 'prophet-family-47' ? (
                          <>
                            <GitBranch className="w-3.5 h-3.5" />
                            <span>{isBn ? 'বংশতালিকা' : 'Family Tree'}</span>
                          </>
                        ) : (
                          <>
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>{isBn ? 'পড়ুন' : 'Read'}</span>
                          </>
                        )}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expandable On-Demand Table of Contents Drawer */}
                {isIndexExpanded && (
                  <div
                    className={`relative z-10 px-4 py-3.5 space-y-2.5 border-t animate-in fade-in duration-150 ${
                      isDay
                        ? 'bg-gradient-to-b from-emerald-50/45 to-slate-50/70 border-emerald-100'
                        : 'bg-[#051612] border-emerald-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] font-extrabold tracking-wide ${
                          isDay ? 'text-emerald-900/80' : 'text-emerald-300/90'
                        }`}
                      >
                        {isBn
                          ? `ভেতরের ${toBnNumber(col.partsCount)}টি পর্বের সূচিপত্র`
                          : `Table of Contents (${col.partsCount} Parts)`}
                      </span>
                      <button
                        type="button"
                        onClick={() => openCollection(col.id, 'all', 1, false, 'reader')}
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
                          className={`group/part text-left px-3 py-2 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                            isDay
                              ? 'bg-white hover:bg-emerald-50/70 border-slate-200/85 hover:border-emerald-300 text-slate-800 shadow-2xs'
                              : 'bg-[#08221d] hover:bg-emerald-900/45 border-emerald-800/55 hover:border-emerald-500/50 text-emerald-100'
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
                          <div className="flex items-center gap-1 shrink-0">
                            <span
                              className={`text-[10px] font-semibold tabular-nums ${
                                isDay ? 'text-slate-400' : 'text-emerald-400/70'
                              }`}
                            >
                              {isBn ? `${toBnNumber(part.eventCount)}টি` : part.eventCount}
                            </span>
                            <ChevronRight
                              className={`w-3 h-3 transition-transform group-hover/part:translate-x-0.5 ${
                                isDay ? 'text-emerald-500/60' : 'text-amber-300/60'
                              }`}
                            />
                          </div>
                        </button>
                      ))}
                    </div>

                    <p
                      className={`pt-2 border-t text-[10.5px] leading-relaxed ${
                        isDay
                          ? 'border-emerald-100 text-slate-500'
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

                {/* Whisper-Thin Illuminated Reading Progress Hairline */}
                <div
                  aria-hidden="true"
                  className={`h-[2.5px] w-full ${isDay ? 'bg-slate-100/90' : 'bg-emerald-950'}`}
                >
                  <div
                    className={`h-full transition-all duration-300 ${accent.bar}`}
                    style={{ width: `${Math.max(5, readPercent)}%`, opacity: 0.8 }}
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
              <div className="max-w-7xl mx-auto px-2.5 sm:px-6 h-14 flex items-center justify-between gap-2 sm:gap-3">
                {/* Step-by-Step Back + Active Collection Title */}
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <button
                    type="button"
                    onClick={handleStepBack}
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-bold text-amber-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span className={activeCollectionId === 'prophet-family-47' ? 'hidden sm:inline' : ''}>
                      {activeCollectionId === 'prophet-family-47' &&
                      familyViewMode === 'reader' &&
                      openedReaderFromTree
                        ? isBn
                          ? 'বংশতালিকায় ফিরুন'
                          : 'Back to Tree'
                        : isMobileViewport &&
                          mobilePane === 'reader' &&
                          enteredMobileReaderFromIndex &&
                          !(activeCollectionId === 'prophet-family-47' && familyViewMode === 'tree')
                        ? isBn
                          ? 'সূচিতে ফিরুন'
                          : 'Back to Index'
                        : isBn
                        ? 'সীরাতে ফিরুন'
                        : 'Back'}
                    </span>
                  </button>
                  <div className="min-w-0">
                    <h2
                      className={`text-xs sm:text-base font-black truncate text-white ${
                        activeCollectionId === 'prophet-family-47' ? 'hidden md:block' : ''
                      }`}
                    >
                      {isBn ? activeCollectionMeta.titleBn : activeCollectionMeta.titleEn}
                    </h2>
                  </div>
                </div>

                {/* View Mode Toggle (Family Tree) + Mobile Switcher + Share + Close */}
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  {activeCollectionId === 'prophet-family-47' && (
                    <div className="flex items-center p-0.5 rounded-lg bg-black/30 border border-white/15">
                      <button
                        type="button"
                        onClick={() => {
                          if (soundEnabled) soundHaptics.playTap();
                          setOpenedReaderFromTree(false);
                          setFamilyViewMode('tree');
                        }}
                        className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          familyViewMode === 'tree'
                            ? 'bg-amber-400 text-emerald-950 shadow-xs'
                            : 'text-emerald-100 hover:text-white'
                        }`}
                      >
                        <GitBranch className="w-3.5 h-3.5" />
                        <span>{isBn ? 'বংশতালিকা' : 'Family Tree'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (soundEnabled) soundHaptics.playTap();
                          if (familyViewMode === 'tree') {
                            setOpenedReaderFromTree(true);
                          }
                          setFamilyViewMode('reader');
                        }}
                        className={`inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 rounded-md text-[11px] sm:text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                          familyViewMode === 'reader'
                            ? 'bg-amber-400 text-emerald-950 shadow-xs'
                            : 'text-emerald-100 hover:text-white'
                        }`}
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{isBn ? 'জীবনী পাঠ' : 'Biography'}</span>
                      </button>
                    </div>
                  )}

                  {!(activeCollectionId === 'prophet-family-47' && familyViewMode === 'tree') && (
                    <div className="flex lg:hidden items-center p-0.5 rounded-lg bg-black/25 border border-white/10">
                      <button
                        type="button"
                        onClick={() => {
                          setEnteredMobileReaderFromIndex(false);
                          setMobilePane('index');
                        }}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
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
                        onClick={() => {
                          if (mobilePane === 'index') setEnteredMobileReaderFromIndex(true);
                          setMobilePane('reader');
                        }}
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                          mobilePane === 'reader'
                            ? 'bg-amber-400 text-emerald-950'
                            : 'text-emerald-100 hover:text-white'
                        }`}
                      >
                        <BookOpen className="w-3 h-3" />
                        <span>{isBn ? 'পাঠ' : 'Read'}</span>
                      </button>
                    </div>
                  )}

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

            {/* Keep Family Tree mounted when Collection 04 is open so stepping back from Full Reader preserves scroll & open Member Sheet */}
            {activeCollectionId === 'prophet-family-47' && (
              <div
                className={
                  familyViewMode === 'tree'
                    ? 'flex-1 min-h-0 flex flex-col overflow-hidden'
                    : 'hidden'
                }
              >
                <ProphetFamilyTreeView
                  themeMode={themeMode}
                  selectedLanguage={selectedLanguage}
                  soundEnabled={soundEnabled}
                  visitedEvents={visitedEvents}
                  onPlayTap={() => {
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  onMarkVisited={(memberNo) => {
                    setVisitedByCollection((prev) => ({
                      ...prev,
                      'prophet-family-47': {
                        ...(prev['prophet-family-47'] || {}),
                        [memberNo]: true,
                      },
                    }));
                  }}
                  onSelectMemberForReader={(memberNo) => {
                    if (soundEnabled) soundHaptics.playTap();
                    setSelectedPart('all');
                    setSearchQuery('');
                    setActiveEventNo(memberNo);
                    setVisitedByCollection((prev) => ({
                      ...prev,
                      'prophet-family-47': {
                        ...(prev['prophet-family-47'] || {}),
                        [memberNo]: true,
                      },
                    }));
                    setOpenedReaderFromTree(true);
                    setEnteredMobileReaderFromIndex(false);
                    setMobilePane('reader');
                    setFamilyViewMode('reader');
                    if (readerScrollRef.current) {
                      readerScrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                />
              </div>
            )}

            {/* Archival Two-Pane Reader (hidden while Collection 04 is showing Family Tree) */}
            {!(activeCollectionId === 'prophet-family-47' && familyViewMode === 'tree') && (
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
                } overflow-y-auto px-3 sm:px-8 lg:px-10 py-3 sm:py-5`}
              >
                <article className="max-w-3xl mx-auto space-y-3.5 sm:space-y-5">
                  {/* Editorial Folio Header */}
                  <header
                    className={`pb-3 sm:pb-4 border-b space-y-2 ${
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
                      className={`text-xl sm:text-3xl font-black tracking-tight leading-snug text-balance ${
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
                    className={`rounded-2xl border p-3 sm:p-4 space-y-1.5 ${
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
                    <ul className="space-y-1.5">
                      {(isBn ? currentEvent.pointsBn : currentEvent.pointsEn).map((pt, idx) => (
                        <li
                          key={idx}
                          className={`flex items-start gap-2 text-[13px] sm:text-[15px] font-medium leading-relaxed ${
                            isDay ? 'text-stone-800' : 'text-emerald-50'
                          }`}
                        >
                          <CheckCircle2
                            className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-1 shrink-0"
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
                      className={`py-3 sm:py-4 border-y text-center font-arabic text-lg sm:text-2xl leading-[1.9] ${
                        isDay
                          ? 'border-amber-300/70 text-emerald-950'
                          : 'border-amber-400/30 text-amber-200'
                      }`}
                    >
                      {currentEvent.arabicQuote}
                    </blockquote>
                  )}

                  {/* 3. Two-Layer Detailed Historical Narration */}
                  <section className="space-y-2 sm:space-y-3">
                    <h3
                      className={`text-xs font-extrabold tracking-wide ${
                        isDay ? 'text-stone-500' : 'text-emerald-300/80'
                      }`}
                    >
                      {isBn ? 'বিস্তারিত ঐতিহাসিক বিবরণ' : 'Detailed Historical Account'}
                    </h3>
                    <div
                      className={`space-y-2.5 text-[14px] sm:text-base leading-[1.75] sm:leading-[1.85] max-w-prose ${
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

                  {/* 4. Compact Archival Metadata Strip (2-col on mobile to prevent vertical bloat) */}
                  <section
                    className={`rounded-xl border overflow-hidden ${
                      isDay
                        ? 'bg-white border-stone-200/90'
                        : 'bg-[#07201a] border-emerald-800/70'
                    }`}
                  >
                    <dl className="grid grid-cols-2 divide-x divide-y divide-stone-100 dark:divide-emerald-900/60 text-[11px] sm:text-xs">
                      <div className="px-3 py-2 space-y-0.5">
                        <dt className={`font-bold text-[10px] sm:text-[11px] ${isDay ? 'text-stone-500' : 'text-emerald-300/75'}`}>
                          {isBn ? 'সময়কাল' : 'Timeframe'}
                        </dt>
                        <dd className={`font-semibold leading-snug ${isDay ? 'text-stone-900' : 'text-emerald-50'}`}>
                          {isBn ? currentEvent.timeContextBn : currentEvent.timeContextEn}
                        </dd>
                      </div>
                      <div className="px-3 py-2 space-y-0.5">
                        <dt className={`font-bold text-[10px] sm:text-[11px] ${isDay ? 'text-stone-500' : 'text-emerald-300/75'}`}>
                          {isBn ? 'ঐতিহাসিক স্থান' : 'Location'}
                        </dt>
                        <dd className={`font-semibold leading-snug ${isDay ? 'text-stone-900' : 'text-emerald-50'}`}>
                          {isBn ? currentEvent.locationBn : currentEvent.locationEn}
                        </dd>
                      </div>
                      {currentEvent.keyFiguresBn && (
                        <div className="col-span-2 px-3 py-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 border-t border-stone-100 dark:border-emerald-900/60">
                          <dt className={`font-bold text-[10px] sm:text-[11px] shrink-0 ${isDay ? 'text-stone-500' : 'text-emerald-300/75'}`}>
                            {isBn ? 'সংশ্লিষ্ট ব্যক্তিবর্গ:' : 'Key Figures:'}
                          </dt>
                          <dd className={`font-semibold leading-snug ${isDay ? 'text-stone-900' : 'text-emerald-50'}`}>
                            {isBn ? currentEvent.keyFiguresBn : currentEvent.keyFiguresEn}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </section>

                  {/* 5. Spiritual & Historical Reflection */}
                  <section
                    className={`rounded-xl border p-3 sm:p-4 space-y-1 ${
                      isDay
                        ? 'bg-emerald-50/60 border-emerald-200/80 text-emerald-950'
                        : 'bg-[#06221b] border-emerald-700/60 text-emerald-100'
                    }`}
                  >
                    <h3
                      className={`text-[11px] sm:text-xs font-extrabold tracking-wide ${
                        isDay ? 'text-emerald-800' : 'text-amber-300'
                      }`}
                    >
                      {isBn ? 'ঐতিহাসিক শিক্ষা ও আত্মিক অনুভূতি' : 'Historical Lesson & Reflection'}
                    </h3>
                    <p className="text-[12.5px] sm:text-[14px] leading-snug sm:leading-relaxed">
                      {isBn ? currentEvent.reflectionBn : currentEvent.reflectionEn}
                    </p>
                  </section>

                  {/* 6. Detailed Multi-Book Hadith & Seerah References Block */}
                  <section
                    className={`rounded-xl border overflow-hidden ${
                      isDay
                        ? 'bg-white border-stone-200/90'
                        : 'bg-[#07201a] border-emerald-800/70'
                    }`}
                  >
                    <div
                      className={`px-3 sm:px-4 py-2 border-b flex items-center justify-between gap-2 ${
                        isDay
                          ? 'bg-stone-50 border-stone-200/80'
                          : 'bg-[#041713] border-emerald-800/70'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 min-w-0">
                        <BookOpen
                          className={`w-3.5 h-3.5 shrink-0 ${isDay ? 'text-emerald-800' : 'text-amber-300'}`}
                        />
                        <h3
                          className={`text-[11px] sm:text-xs font-extrabold tracking-wide truncate ${
                            isDay ? 'text-stone-800' : 'text-emerald-100'
                          }`}
                        >
                          {isBn
                            ? 'প্রামাণ্য হাদিস ও সীরাত সূত্রাবলি (রেফারেন্স)'
                            : 'Verified Hadith & Classical Seerah References'}
                        </h3>
                      </div>
                      <span
                        className={`text-[10.5px] font-semibold tabular-nums shrink-0 ${
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
                        <div key={idx} className="px-3 sm:px-4 py-2 sm:py-2.5 space-y-0.5">
                          <div className="flex flex-wrap items-baseline justify-between gap-1.5">
                            <p
                              className={`text-xs sm:text-sm font-extrabold ${
                                isDay ? 'text-stone-900' : 'text-white'
                              }`}
                            >
                              {isBn ? ref.bookBn : ref.bookEn}
                            </p>
                            <span
                              className={`text-[11px] font-bold ${
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
                            className={`text-[11px] sm:text-xs leading-snug ${
                              isDay ? 'text-stone-600' : 'text-emerald-200/80'
                            }`}
                          >
                            {isBn ? ref.chapterBn : ref.chapterEn}
                            <span aria-hidden="true" className="mx-1 opacity-50">
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

                  {/* 7. Previous / Next Chronological Navigation Bar — ALWAYS Side-by-Side in One Row */}
                  <nav
                    aria-label={isBn ? 'ঘটনা নেভিগেশন' : 'Event navigation'}
                    className={`pt-3 border-t grid grid-cols-2 gap-2 sm:gap-3 ${
                      isDay ? 'border-stone-200' : 'border-emerald-800/70'
                    }`}
                  >
                    {prevEvent ? (
                      <button
                        type="button"
                        onClick={() => handleSelectEvent(prevEvent.no)}
                        className={`text-left px-2.5 py-2 sm:p-3.5 rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 sm:gap-3 min-w-0 ${
                          isDay
                            ? 'bg-white hover:bg-emerald-50/70 border-stone-200 hover:border-emerald-300'
                            : 'bg-[#07201a] hover:bg-emerald-900/50 border-emerald-800/70 hover:border-amber-400/40'
                        }`}
                      >
                        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-emerald-700 dark:text-amber-300" />
                        <div className="min-w-0 flex-1">
                          <span
                            className={`block text-[9.5px] sm:text-[11px] font-bold tabular-nums truncate ${
                              isDay ? 'text-stone-500' : 'text-emerald-300/75'
                            }`}
                          >
                            {isBn
                              ? `পূর্ববর্তী · ${toBnNumber(prevEvent.no, true)}`
                              : `Prev · ${String(prevEvent.no).padStart(2, '0')}`}
                          </span>
                          <span className="block text-[11px] sm:text-sm font-extrabold truncate">
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
                        className={`text-right px-2.5 py-2 sm:p-3.5 rounded-xl border transition-colors cursor-pointer flex items-center justify-end gap-1.5 sm:gap-3 min-w-0 ${
                          isDay
                            ? 'bg-white hover:bg-emerald-50/70 border-stone-200 hover:border-emerald-300'
                            : 'bg-[#07201a] hover:bg-emerald-900/50 border-emerald-800/70 hover:border-amber-400/40'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <span
                            className={`block text-[9.5px] sm:text-[11px] font-bold tabular-nums truncate ${
                              isDay ? 'text-stone-500' : 'text-emerald-300/75'
                            }`}
                          >
                            {isBn
                              ? `পরবর্তী · ${toBnNumber(nextEvent.no, true)}`
                              : `Next · ${String(nextEvent.no).padStart(2, '0')}`}
                          </span>
                          <span className="block text-[11px] sm:text-sm font-extrabold truncate">
                            {isBn ? nextEvent.titleBn : nextEvent.titleEn}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-emerald-700 dark:text-amber-300" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={closeCollection}
                        className="text-right px-2.5 py-2 sm:p-3.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white transition-colors cursor-pointer flex items-center justify-end gap-1.5 sm:gap-3 min-w-0"
                      >
                        <div className="min-w-0 flex-1">
                          <span className="block text-[9.5px] sm:text-[11px] font-bold text-amber-200 tabular-nums truncate">
                            {isBn
                              ? `সমাপ্ত (${toBnNumber(totalEventsCount)}/${toBnNumber(totalEventsCount)})`
                              : `End (${totalEventsCount}/${totalEventsCount})`}
                          </span>
                          <span className="block text-[11px] sm:text-sm font-extrabold truncate">
                            {isBn ? 'সূচিপত্রে ফিরে যান' : 'Back to Index'}
                          </span>
                        </div>
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-amber-300" />
                      </button>
                    )}
                  </nav>
                </article>
              </main>
            </div>
            )}
          </div>,
          document.body
        )}
    </>
  );
};
