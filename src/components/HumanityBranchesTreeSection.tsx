/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useRef, useState } from 'react';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  BookMarked,
  ChevronRight,
  Compass,
  GitBranch,
  Globe2,
  Layers,
  LayoutGrid,
  MapPin,
  Maximize2,
  Minimize2,
  RotateCcw,
  ScrollText,
  Table2,
  Users,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import {
  AR_RAHEEQ_GENEALOGY_TRACKS,
  AR_RAHEEQ_HISTORY_SECTIONS,
  ArRaheeqCategory,
  CLASSICAL_SOURCE_BOOKS,
  HUMANITY_CANVAS_HEIGHT,
  HUMANITY_CANVAS_WIDTH,
  HUMANITY_ERAS_LIST,
  HUMANITY_PERSON_TO_NATION_LIST,
  HUMANITY_TREE_EDGES,
  HUMANITY_TREE_NODES,
  HumanityEraGroup,
  HumanityTreeEdge,
  HumanityTreeNode,
  RootLineFilter,
} from '../data/humanityBranchesData';

interface HumanityBranchesTreeSectionProps {
  themeMode: ThemeMode;
  selectedLanguage: ZikrLanguage;
  soundEnabled: boolean;
  searchQuery: string;
}

type EraFilterKey = 'all' | HumanityEraGroup;
type DirectoryDisplayMode = 'cards' | 'table';

const toBnDigits = (val: number | string): string =>
  String(val).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

function getEraStyles(group: HumanityEraGroup, isDay: boolean) {
  switch (group) {
    case 'origin':
      return isDay
        ? {
            card: 'bg-gradient-to-b from-[#f3fbf7] to-[#e6f6ee] border-emerald-600/80 text-slate-900 hover:border-[#006A4E] shadow-[0_4px_14px_rgba(5,150,105,0.12)]',
            badge: 'text-[#006A4E]',
            arabic: 'text-[#006A4E]',
            stroke: '#059669',
          }
        : {
            card: 'bg-gradient-to-b from-[#0d332c] to-[#08241f] border-emerald-400/70 text-white hover:border-emerald-300 shadow-[0_6px_18px_rgba(0,0,0,0.45)]',
            badge: 'text-emerald-300',
            arabic: 'text-emerald-300',
            stroke: '#34d399',
          };
    case 'flood_reset':
      return isDay
        ? {
            card: 'bg-gradient-to-b from-[#f0f7fe] to-[#e0eefd] border-sky-600/80 text-slate-900 hover:border-sky-800 shadow-[0_4px_14px_rgba(2,132,199,0.12)]',
            badge: 'text-sky-800',
            arabic: 'text-sky-800',
            stroke: '#0284c7',
          }
        : {
            card: 'bg-gradient-to-b from-[#0c2d42] to-[#081f2e] border-sky-400/75 text-white hover:border-sky-300 shadow-[0_6px_18px_rgba(0,0,0,0.45)]',
            badge: 'text-sky-300',
            arabic: 'text-sky-300',
            stroke: '#38bdf8',
          };
    case 'three_sons':
      return isDay
        ? {
            card: 'bg-gradient-to-b from-[#fffaf0] to-[#fdf0d5] border-amber-500/85 text-slate-900 hover:border-amber-700 shadow-[0_4px_14px_rgba(180,83,9,0.12)]',
            badge: 'text-amber-800',
            arabic: 'text-amber-800',
            stroke: '#d97706',
          }
        : {
            card: 'bg-gradient-to-b from-[#31250e] to-[#211909] border-amber-400/70 text-white hover:border-amber-300 shadow-[0_6px_18px_rgba(0,0,0,0.45)]',
            badge: 'text-amber-300',
            arabic: 'text-amber-300',
            stroke: '#fbbf24',
          };
    case 'prophetic_ummahs':
      return isDay
        ? {
            card: 'bg-gradient-to-b from-[#fef7f4] to-[#fbece5] border-rose-500/80 text-slate-900 hover:border-rose-700 shadow-[0_4px_14px_rgba(190,18,60,0.10)]',
            badge: 'text-rose-800',
            arabic: 'text-rose-800',
            stroke: '#be123c',
          }
        : {
            card: 'bg-gradient-to-b from-[#331920] to-[#231015] border-rose-400/70 text-white hover:border-rose-300 shadow-[0_6px_18px_rgba(0,0,0,0.45)]',
            badge: 'text-rose-300',
            arabic: 'text-rose-300',
            stroke: '#fb7185',
          };
    case 'final_ummah':
      return isDay
        ? {
            card: 'bg-gradient-to-b from-[#ebfaf2] to-[#d6f3e3] border-[#006A4E] text-slate-900 hover:border-emerald-900 shadow-[0_6px_18px_rgba(0,106,78,0.18)] ring-2 ring-amber-400/45',
            badge: 'text-[#005a42]',
            arabic: 'text-[#005a42]',
            stroke: '#006A4E',
          }
        : {
            card: 'bg-gradient-to-b from-[#0b3b30] to-[#072820] border-emerald-400/85 text-white hover:border-emerald-300 shadow-[0_8px_22px_rgba(0,0,0,0.5)] ring-2 ring-amber-400/40',
            badge: 'text-emerald-300',
            arabic: 'text-emerald-300',
            stroke: '#10b981',
          };
    case 'modern_world':
    default:
      return isDay
        ? {
            card: 'bg-gradient-to-b from-[#f8fbfa] to-[#edf4f1] border-teal-600/75 text-slate-900 hover:border-[#006A4E] shadow-[0_4px_14px_rgba(15,118,110,0.10)]',
            badge: 'text-teal-800',
            arabic: 'text-teal-800',
            stroke: '#0d9488',
          }
        : {
            card: 'bg-gradient-to-b from-[#0b272d] to-[#071b20] border-teal-400/70 text-white hover:border-teal-300 shadow-[0_6px_18px_rgba(0,0,0,0.45)]',
            badge: 'text-teal-300',
            arabic: 'text-teal-300',
            stroke: '#2dd4bf',
          };
  }
}

function getRootLineAccent(line: Exclude<RootLineFilter, 'all'>, isDay: boolean) {
  switch (line) {
    case 'sam':
      return {
        labelBn: 'সাম ইবনে নূহ (আ.) · সামি ধারা',
        labelEn: 'Sam ibn Nuh · Semitic Line',
        textClass: isDay ? 'text-[#006A4E]' : 'text-emerald-300',
      };
    case 'ham':
      return {
        labelBn: 'হাম ইবনে নূহ (আ.) · আফ্রিকান/হামিটিক ধারা',
        labelEn: 'Ham ibn Nuh · African/Hamitic Line',
        textClass: isDay ? 'text-amber-700' : 'text-amber-300',
      };
    case 'yafith':
    default:
      return {
        labelBn: 'ইয়াফিস ইবনে নূহ (আ.) · ইউরেশীয়/এশীয় ধারা',
        labelEn: 'Yafith ibn Nuh · Eurasian/Asian Line',
        textClass: isDay ? 'text-sky-700' : 'text-sky-300',
      };
  }
}

function buildHumanityConnector(from: HumanityTreeNode, to: HumanityTreeNode): {
  d: string;
  labelX: number;
  labelY: number;
} {
  const halfH = 44;
  const startY = from.y + halfH;
  const endY = to.y - halfH;
  const dx = Math.abs(to.x - from.x);

  if (dx <= 6) {
    return {
      d: `M ${from.x} ${startY} L ${to.x} ${endY}`,
      labelX: from.x + 8,
      labelY: (startY + endY) / 2,
    };
  }

  const midY = startY + (endY - startY) * 0.5;
  return {
    d: `M ${from.x} ${startY} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${endY}`,
    labelX: (from.x + to.x) / 2,
    labelY: midY - 6,
  };
}

export const HumanityBranchesTreeSection: React.FC<HumanityBranchesTreeSectionProps> = ({
  themeMode,
  selectedLanguage,
  soundEnabled,
  searchQuery,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';

  const [eraFilter, setEraFilter] = useState<EraFilterKey>('all');
  const [rootLineFilter, setRootLineFilter] = useState<RootLineFilter>('all');
  const [raheeqCategory, setRaheeqCategory] = useState<ArRaheeqCategory>('all');
  const [activeTrackStep, setActiveTrackStep] = useState<Record<string, number>>({
    'track-qahtan': 3,
    'track-adnan': 3,
  });
  const [directoryMode, setDirectoryMode] = useState<DirectoryDisplayMode>('cards');
  const [selectedNode, setSelectedNode] = useState<HumanityTreeNode | null>(null);
  const [zoom, setZoom] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 0.42;
      if (window.innerWidth < 1024) return 0.62;
      if (window.innerWidth < 1280) return 0.74;
    }
    return 0.85;
  });
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const nodeMap = useMemo(() => {
    const map = new Map<string, HumanityTreeNode>();
    HUMANITY_TREE_NODES.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  const nodeMatches = (node: HumanityTreeNode): boolean => {
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      const hay = [
        node.titleBn,
        node.titleEn,
        node.titleAr,
        node.subtitleBn,
        node.subtitleEn,
        node.howSplitBn,
        node.howSplitEn,
        node.keyBranchesBn,
        node.keyBranchesEn,
        node.modernLocationBn,
        node.modernLocationEn,
        node.detailBn,
        node.detailEn,
      ]
        .join(' ')
        .toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (eraFilter !== 'all' && node.eraGroup !== eraFilter) return false;
    return true;
  };

  const filteredPersonToNations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return HUMANITY_PERSON_TO_NATION_LIST.filter((entry) => {
      if (rootLineFilter !== 'all' && entry.rootLine !== rootLineFilter) return false;
      if (!q) return true;
      return [
        entry.ancestorPersonBn,
        entry.ancestorPersonEn,
        entry.parentLineBn,
        entry.parentLineEn,
        entry.howDividedBn,
        entry.howDividedEn,
        entry.nationsFormedBn,
        entry.nationsFormedEn,
        entry.whereTodayBn,
        entry.whereTodayEn,
        entry.sourceNoteBn,
        entry.sourceNoteEn,
      ]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [rootLineFilter, searchQuery]);

  const filteredEras = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return HUMANITY_ERAS_LIST.filter((item) => {
      if (eraFilter !== 'all' && item.eraGroup !== eraFilter) return false;
      if (!q) return true;
      return [
        item.titleBn,
        item.titleEn,
        item.rootOrProphetBn,
        item.rootOrProphetEn,
        item.howSplitBn,
        item.howSplitEn,
        item.whereTodayBn,
        item.whereTodayEn,
        item.summaryBn,
        item.summaryEn,
        ...item.branchesBn,
        ...item.branchesEn,
      ]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [eraFilter, searchQuery]);

  const filteredRaheeqSections = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return AR_RAHEEQ_HISTORY_SECTIONS.filter((sec) => {
      if (raheeqCategory !== 'all' && sec.category !== raheeqCategory) return false;
      if (!q) return true;
      return [
        sec.titleBn,
        sec.titleEn,
        sec.summaryBn,
        sec.summaryEn,
        sec.howSplitBn,
        sec.howSplitEn,
        sec.turningPointBn,
        sec.turningPointEn,
        ...sec.subBranches.flatMap((b) => [
          b.nameBn,
          b.nameEn,
          b.lineageBn,
          b.lineageEn,
          b.settlementBn,
          b.settlementEn,
          b.keyFactsBn,
          b.keyFactsEn,
        ]),
      ]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [raheeqCategory, searchQuery]);

  const handleZoomChange = (next: number) => {
    if (soundEnabled) soundHaptics.playTap();
    setZoom(Math.min(1.25, Math.max(0.3, Number(next.toFixed(2)))));
  };

  const handleFitScreen = () => {
    if (soundEnabled) soundHaptics.playTap();
    const width = scrollRef.current?.clientWidth || 960;
    const fitted = Math.min(1.0, Math.max(0.3, (width - 24) / HUMANITY_CANVAS_WIDTH));
    setZoom(Number(fitted.toFixed(2)));
  };

  const filterOptions: Array<{ key: EraFilterKey; bn: string; en: string }> = [
    { key: 'all', bn: 'সকল যুগ (আদম → আজ)', en: 'All Eras (Adam → Today)' },
    { key: 'origin', bn: 'আদম থেকে প্রাক-প্লাবন', en: 'Adam to Pre-Flood' },
    { key: 'flood_reset', bn: 'নূহ (আ.) ও ~৮০ মুমিন', en: 'Nuh & ~80 Believers' },
    { key: 'three_sons', bn: '৩ মূল শাখা ও ১৬ পুত্র-শাখা', en: '3 Roots & Sons' },
    { key: 'prophetic_ummahs', bn: 'নবীগণের উম্মত ও সভ্যতা', en: 'Prophetic Ummahs' },
    { key: 'final_ummah', bn: 'শেষ নবী (ﷺ)-এর উম্মত', en: 'Final Prophet’s Ummah' },
    { key: 'modern_world', bn: 'আজকের বিশ্ব (কোথায় কোন জাতি)', en: 'Today’s World Map' },
  ];

  const raheeqFilterTabs: Array<{ key: ArRaheeqCategory; bn: string; en: string }> = [
    { key: 'all', bn: 'সকল অধ্যায় (৫)', en: 'All Chapters (5)' },
    { key: 'baidah', bn: '১. আরবে বায়দা', en: '1. Al-Ba’idah' },
    { key: 'aribah_qahtan', bn: '২. কাহতান ও কাহলান', en: '2. Qahtan & Kahlan' },
    { key: 'mustaribah_adnan', bn: '৩. আদনান ও কুরাইশ', en: '3. Adnan & Quraysh' },
    { key: 'governance_kabah', bn: '৪. শাসন ও কাবার সেবা', en: '4. Rule & Ka‘bah' },
    { key: 'religion_world', bn: '৫. ধর্মীয় অবস্থা ও বিশ্ব', en: '5. Religion & World' },
  ];

  const totalCountBn = toBnDigits(HUMANITY_PERSON_TO_NATION_LIST.length);
  const rootTabs: Array<{ key: RootLineFilter; bn: string; en: string }> = [
    { key: 'all', bn: `সকল শাখা (${totalCountBn})`, en: `All Roots (${HUMANITY_PERSON_TO_NATION_LIST.length})` },
    { key: 'sam', bn: 'সাম ইবনে নূহ (আরব/ইসরাঈল/ইরাক)', en: 'Sam (Arab/Israelite)' },
    { key: 'ham', bn: 'হাম ইবনে নূহ (মিসর/আফ্রিকা)', en: 'Ham (Egypt/Africa)' },
    { key: 'yafith', bn: 'ইয়াফিস ইবনে নূহ (ইউরোপ/তুর্কি/এশিয়া)', en: 'Yafith (Eurasia/Asia)' },
  ];

  return (
    <div className="space-y-3 w-full">
      {/* Unboxed Scholarly Overview Line */}
      <div
        className={`flex flex-wrap items-center justify-between gap-2 px-1 text-xs font-semibold tabular-nums ${
          isDay ? 'text-slate-600' : 'text-slate-300'
        }`}
      >
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className={isDay ? 'text-[#006A4E] font-extrabold' : 'text-emerald-300 font-extrabold'}>
            {isBn ? '১ আদি পিতা-মাতা (আদম-হাওয়া আ.)' : '1 Original Pair (Adam & Hawwa)'}
          </span>
          <span aria-hidden="true" className="opacity-40">
            ·
          </span>
          <span>{isBn ? '~৮০ কিস্তির মুমিন (সুক সামানীন)' : '~80 Ark Survivors (Thamanin)'}</span>
          <span aria-hidden="true" className="opacity-40">
            ·
          </span>
          <span>{isBn ? '৩ মূল বিশ্বশাখা (সাম · হাম · ইয়াফিস)' : '3 Global Roots (Sam · Ham · Yafith)'}</span>
          <span aria-hidden="true" className="opacity-40">
            ·
          </span>
          <span>
            {isBn
              ? `${totalCountBn} ব্যক্তি-জাতি শাখা ও ১৯৫+ দেশ`
              : `${HUMANITY_PERSON_TO_NATION_LIST.length} Ancestral Lines & 195+ Nations`}
          </span>
        </div>
        <span className={`text-[11px] font-bold ${isDay ? 'text-amber-700' : 'text-amber-300'}`}>
          {isBn
            ? 'সূত্র: আর-রাহীকুল মাখতূম · তাফসীরে ইবনে কাসীর · তারীখে তাবারী · ইবনে খালদুন'
            : 'Sources: Ar-Raheeq al-Makhtum · Ibn Kathir · Al-Tabari · Ibn Khaldun'}
        </span>
      </div>

      {/* Era Filter + Zoom Toolbar */}
      <div
        className={`rounded-2xl border px-3 py-2.5 flex flex-wrap items-center justify-between gap-2.5 ${
          isDay ? 'bg-white border-emerald-200/85' : 'bg-[#082026] border-teal-900/60'
        }`}
      >
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar max-w-full">
          {filterOptions.map((opt) => {
            const active = eraFilter === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => {
                  if (soundEnabled) soundHaptics.playTap();
                  setEraFilter(opt.key);
                }}
                className={`min-h-[34px] px-2.5 rounded-lg border text-[11px] font-bold whitespace-nowrap shrink-0 transition cursor-pointer ${
                  active
                    ? 'bg-[#006A4E] text-white border-[#006A4E]'
                    : isDay
                    ? 'bg-[#f8fcfa] border-slate-200 text-slate-700 hover:border-emerald-400'
                    : 'bg-[#0a2329] border-teal-900/60 text-slate-300 hover:border-emerald-500/50'
                }`}
              >
                {isBn ? opt.bn : opt.en}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => handleZoomChange(zoom - 0.1)}
            aria-label={isBn ? 'ছোট করুন' : 'Zoom out'}
            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition cursor-pointer ${
              isDay
                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#006A4E]'
                : 'bg-[#0c262d] border-teal-800/70 text-emerald-200 hover:border-emerald-400'
            }`}
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span
            className={`px-1.5 text-xs font-extrabold tabular-nums min-w-[44px] text-center ${
              isDay ? 'text-slate-700' : 'text-emerald-200'
            }`}
          >
            {isBn ? toBnDigits(Math.round(zoom * 100)) : Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => handleZoomChange(zoom + 0.1)}
            aria-label={isBn ? 'বড় করুন' : 'Zoom in'}
            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition cursor-pointer ${
              isDay
                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#006A4E]'
                : 'bg-[#0c262d] border-teal-800/70 text-emerald-200 hover:border-emerald-400'
            }`}
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleFitScreen}
            className={`h-8 px-2.5 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition cursor-pointer ${
              isDay
                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#006A4E]'
                : 'bg-[#0c262d] border-teal-800/70 text-emerald-200 hover:border-emerald-400'
            }`}
          >
            {zoom < 0.75 ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
            <span>{isBn ? 'ফিট' : 'Fit'}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              handleZoomChange(0.85);
              setEraFilter('all');
              setRootLineFilter('all');
              setSelectedNode(null);
            }}
            aria-label={isBn ? 'রিসেট' : 'Reset'}
            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition cursor-pointer ${
              isDay
                ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#006A4E]'
                : 'bg-[#0c262d] border-teal-800/70 text-emerald-200 hover:border-emerald-400'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SECTION 1: INTERACTIVE EXPANDED HUMANITY LINEAGE TREE */}
      <div
        ref={scrollRef}
        style={{
          backgroundImage: isDay
            ? 'radial-gradient(rgba(0, 106, 78, 0.11) 1px, transparent 1px)'
            : 'radial-gradient(rgba(52, 211, 153, 0.10) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        className={`rounded-2xl border overflow-auto max-h-[80vh] min-h-[500px] sm:min-h-[580px] relative shadow-sm ${
          isDay ? 'bg-[#f6fbf8] border-emerald-200/90' : 'bg-[#041318] border-teal-900/70'
        }`}
      >
        <div
          style={{
            width: `${HUMANITY_CANVAS_WIDTH * zoom}px`,
            height: `${HUMANITY_CANVAS_HEIGHT * zoom}px`,
            position: 'relative',
          }}
        >
          <div
            style={{
              width: `${HUMANITY_CANVAS_WIDTH}px`,
              height: `${HUMANITY_CANVAS_HEIGHT}px`,
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
              position: 'relative',
            }}
          >
            {/* Top-Left Title Card */}
            <div
              className={`absolute left-[28px] top-[20px] w-[445px] rounded-2xl border px-4 py-3 pointer-events-none ${
                isDay
                  ? 'bg-white/90 border-emerald-200/80 text-slate-800'
                  : 'bg-[#072027]/90 border-teal-800/60 text-slate-100'
              }`}
            >
              <div
                dir="rtl"
                className={`font-arabic text-base font-bold ${
                  isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                }`}
              >
                وَجَعَلْنَا ذُرِّيَّتَهُ هُمُ الْبَاقِينَ
              </div>
              <div className={`text-sm font-black mt-0.5 ${isDay ? 'text-[#006A4E]' : 'text-white'}`}>
                {isBn
                  ? 'মানবজাতির মূল শাখা-ট্রি: কোন ব্যক্তি → কোন জাতি → আজ কোথায় বাস'
                  : 'Humanity Tree: Which Ancestor → Which Nation → Where They Live Today'}
              </div>
              <div
                className={`text-[10.5px] font-semibold mt-0.5 leading-snug ${
                  isDay ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {isBn
                  ? '২২টি বিস্তারিত ধাপ · যেকোনো কার্ডে ক্লিক করলে বিভাজন ও বর্তমান বাসস্থানের পূর্ণ বিবরণ খুলবে'
                  : '22 interactive stages · Tap any card to inspect exact split & modern settlement'}
              </div>
            </div>

            {/* Top-Right Historical Note */}
            <div
              className={`absolute right-[28px] top-[20px] w-[445px] rounded-2xl border px-4 py-3 pointer-events-none ${
                isDay
                  ? 'bg-white/90 border-amber-200/80 text-slate-800'
                  : 'bg-[#072027]/90 border-teal-800/60 text-slate-100'
              }`}
            >
              <div className={`text-xs font-black ${isDay ? 'text-amber-800' : 'text-amber-300'}`}>
                {isBn
                  ? 'নূহের কিস্তি (~৮০ জন · সুকে সামানীন) ও ১৬ উপশাখার বিভাজন'
                  : 'The Ark (~80 Believers · Thamanin) & 16 Sub-Branches of Mankind'}
              </div>
              <div
                className={`text-[10.5px] font-medium mt-1 leading-snug ${
                  isDay ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                {isBn
                  ? 'তারীখে তাবারী ও ইবনে কাসীর: জুদী পাহাড়ে কিস্তির ~৮০ মুমিন "সামানীন" গ্রাম গড়েন; তবে সূরা ৩৭:৭৭ মতে সাম, হাম ও ইয়াফিসের বংশধর থেকেই পৃথিবী পূর্ণ হয়।'
                  : 'Al-Tabari & Ibn Kathir note ~80 Ark survivors settled Qaryat al-Thamanin, while Quran 37:77 confirms humanity multiplied solely through Nuh’s 3 sons.'}
              </div>
            </div>

            {/* SVG Connectors Layer */}
            <svg
              viewBox={`0 0 ${HUMANITY_CANVAS_WIDTH} ${HUMANITY_CANVAS_HEIGHT}`}
              width={HUMANITY_CANVAS_WIDTH}
              height={HUMANITY_CANVAS_HEIGHT}
              className="absolute inset-0 pointer-events-none"
            >
              {HUMANITY_TREE_EDGES.map((edge: HumanityTreeEdge) => {
                const fromNode = nodeMap.get(edge.from);
                const toNode = nodeMap.get(edge.to);
                if (!fromNode || !toNode) return null;

                const { d, labelX, labelY } = buildHumanityConnector(fromNode, toNode);
                const style = getEraStyles(edge.eraGroup, isDay);
                const active = nodeMatches(fromNode) || nodeMatches(toNode);
                const isFiltering = eraFilter !== 'all' || searchQuery.trim().length > 0;
                const opacity = isFiltering ? (active ? 0.95 : 0.14) : 0.78;
                const dashArray =
                  edge.kind === 'descent' ? '6 4' : edge.kind === 'global' ? '2.5 4' : undefined;
                const labelText = isBn ? edge.labelBn : edge.labelEn;

                return (
                  <g key={edge.id} style={{ opacity, transition: 'opacity 180ms ease' }}>
                    <path
                      d={d}
                      fill="none"
                      stroke={style.stroke}
                      strokeWidth={edge.kind === 'direct' ? 2.3 : 1.8}
                      strokeDasharray={dashArray}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {labelText && (
                      <g transform={`translate(${labelX}, ${labelY})`}>
                        <rect
                          x={-48}
                          y={-9}
                          width={96}
                          height={16}
                          rx={6}
                          fill={isDay ? '#f6fbf8' : '#041318'}
                          fillOpacity={0.94}
                        />
                        <text
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize="9.5"
                          fontWeight="700"
                          fill={isDay ? '#334155' : '#cbd5e1'}
                        >
                          {labelText}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Interactive Nodes */}
            {HUMANITY_TREE_NODES.map((node) => {
              const matched = nodeMatches(node);
              const isFiltering = eraFilter !== 'all' || searchQuery.trim().length > 0;
              const opacity = isFiltering ? (matched ? 1 : 0.22) : 1;
              const isSelected = selectedNode?.id === node.id;
              const st = getEraStyles(node.eraGroup, isDay);

              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setSelectedNode(node);
                  }}
                  style={{
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    width: `${node.width}px`,
                    transform: 'translate(-50%, -50%)',
                    opacity,
                  }}
                  className={`absolute rounded-2xl border-[1.5px] px-3 py-2 text-left transition-all duration-150 cursor-pointer hover:shadow-md active:scale-[0.98] ${
                    st.card
                  } ${isSelected ? 'ring-4 ring-amber-400/75 z-20 scale-[1.03]' : 'z-10'}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[9.5px] font-black truncate ${st.badge}`}>
                      {isBn ? node.stepBadgeBn : node.stepBadgeEn}
                    </span>
                    <span
                      dir="rtl"
                      className={`font-arabic text-[10px] font-bold truncate max-w-[100px] ${st.arabic}`}
                    >
                      {node.titleAr}
                    </span>
                  </div>

                  <div className="mt-0.5 text-[11.5px] font-black leading-snug line-clamp-1">
                    {isBn ? node.titleBn : node.titleEn}
                  </div>

                  <div className="mt-0.5 text-[9.5px] font-semibold leading-tight line-clamp-1 opacity-85">
                    {isBn ? node.subtitleBn : node.subtitleEn}
                  </div>

                  <div
                    className={`mt-1 pt-1 border-t border-current/10 flex items-center gap-1 text-[9px] font-bold truncate ${st.badge}`}
                  >
                    <MapPin className="w-2.5 h-2.5 shrink-0" />
                    <span className="truncate">
                      {isBn ? node.modernLocationBn : node.modernLocationEn}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION 2: AR-RAHEEQ AL-MAKHTUM DETAILED LINEAGE & HISTORICAL CHAPTERS */}
      <section
        className={`rounded-2xl border overflow-hidden ${
          isDay ? 'bg-white border-amber-300/80' : 'bg-[#082026] border-amber-700/45'
        }`}
      >
        <div
          className={`px-3 sm:px-4 py-2.5 sm:py-3 border-b space-y-2.5 ${
            isDay
              ? 'bg-gradient-to-r from-[#fffaf0] to-[#f4faf7] border-amber-200/80'
              : 'bg-gradient-to-r from-[#1a180d] to-[#071a20] border-amber-900/45'
          }`}
        >
          <div className="flex items-start sm:items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2.5 min-w-0">
              <BookMarked className={`w-4 h-4 shrink-0 ${isDay ? 'text-amber-700' : 'text-amber-300'}`} />
              <div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <h2
                    className={`text-sm sm:text-base font-black ${
                      isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                    }`}
                  >
                    {isBn
                      ? 'আর-রাহীকুল মাখতূম থেকে বিস্তারিত ধারা ও ইতিহাস'
                      : 'Detailed Lineage & History from Ar-Raheeq al-Makhtum'}
                  </h2>
                  <span
                    dir="rtl"
                    className={`font-arabic text-sm font-bold ${
                      isDay ? 'text-amber-700' : 'text-amber-300'
                    }`}
                  >
                    الرَّحِيقُ الْمَخْتُومُ
                  </span>
                </div>
                <p className={`text-[11px] font-medium ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                  {isBn
                    ? 'আল্লামা সফিউর রহমান মুবারকপুরী (রহ.)-এর প্রামাণ্য সীরাতগ্রন্থ অনুযায়ী আরবের ৩ জাতি, কাহতানী ও আদনানী-কুরাইশ বংশধারা, শাসন ও ধর্মীয় পটভূমি'
                    : 'Three Arab divisions, Qahtani & Adnani-Quraysh genealogies, political governance & religious landscape from The Sealed Nectar'}
                </p>
              </div>
            </div>

            <span
              className={`text-xs font-black tabular-nums shrink-0 ${
                isDay ? 'text-amber-700' : 'text-amber-300'
              }`}
            >
              {isBn
                ? `${toBnDigits(filteredRaheeqSections.length)}টি প্রামাণ্য অধ্যায়`
                : `${filteredRaheeqSections.length} Chapters`}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {raheeqFilterTabs.map((tab) => {
              const active = raheeqCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setRaheeqCategory(tab.key);
                  }}
                  className={`min-h-[34px] px-3 rounded-lg border text-[11px] font-bold whitespace-nowrap shrink-0 transition cursor-pointer ${
                    active
                      ? isDay
                        ? 'bg-amber-700 text-white border-amber-700'
                        : 'bg-amber-600 text-white border-amber-500'
                      : isDay
                      ? 'bg-white border-slate-200 text-slate-700 hover:border-amber-500'
                      : 'bg-[#0c262d] border-teal-800/60 text-slate-300 hover:border-amber-400/60'
                  }`}
                >
                  {isBn ? tab.bn : tab.en}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dual Interactive Genealogy Strip: Qahtani vs Adnani (Ar-Raheeq) */}
        <div
          className={`p-2 sm:p-2.5 border-b space-y-2.5 ${
            isDay ? 'bg-[#fcfdfc] border-slate-200/80' : 'bg-[#06181d] border-teal-900/55'
          }`}
        >
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-2.5">
            {AR_RAHEEQ_GENEALOGY_TRACKS.map((track) => {
              const selectedIdx = activeTrackStep[track.id] ?? track.steps.length - 1;
              const currentStep = track.steps[selectedIdx] || track.steps[track.steps.length - 1];
              const isQahtan = track.trackType === 'qahtan';

              return (
                <div
                  key={track.id}
                  className={`rounded-xl border p-2.5 sm:p-3 space-y-2.5 ${
                    isDay
                      ? isQahtan
                        ? 'bg-amber-50/45 border-amber-200/80'
                        : 'bg-emerald-50/45 border-emerald-200/80'
                      : isQahtan
                      ? 'bg-[#1a180d]/70 border-amber-800/45'
                      : 'bg-[#082620]/75 border-emerald-800/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3
                        className={`text-xs sm:text-sm font-black ${
                          isDay
                            ? isQahtan
                              ? 'text-amber-900'
                              : 'text-[#006A4E]'
                            : isQahtan
                            ? 'text-amber-300'
                            : 'text-emerald-300'
                        }`}
                      >
                        {isBn ? track.titleBn : track.titleEn}
                      </h3>
                      <p className={`text-[11px] font-medium mt-0.5 ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                        {isBn ? track.subtitleBn : track.subtitleEn}
                      </p>
                    </div>
                    <span
                      dir="rtl"
                      className={`font-arabic text-xs font-bold shrink-0 ${
                        isDay
                          ? isQahtan
                            ? 'text-amber-800'
                            : 'text-[#006A4E]'
                          : isQahtan
                          ? 'text-amber-300'
                          : 'text-emerald-300'
                      }`}
                    >
                      {track.titleAr}
                    </span>
                  </div>

                  {/* 4-Step Connected Chain */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {track.steps.map((step, idx) => {
                      const isStepActive = selectedIdx === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            if (soundEnabled) soundHaptics.playTap();
                            setActiveTrackStep((prev) => ({ ...prev, [track.id]: idx }));
                          }}
                          className={`rounded-xl border p-2.5 text-left transition cursor-pointer flex flex-col justify-between ${
                            isStepActive
                              ? isDay
                                ? isQahtan
                                  ? 'bg-amber-700 border-amber-700 text-white shadow-sm'
                                  : 'bg-[#006A4E] border-[#006A4E] text-white shadow-sm'
                                : isQahtan
                                ? 'bg-amber-600 border-amber-400 text-white shadow-sm'
                                : 'bg-emerald-700 border-emerald-400 text-white shadow-sm'
                              : isDay
                              ? 'bg-white border-slate-200/90 text-slate-800 hover:border-emerald-400'
                              : 'bg-[#0a2329] border-teal-900/60 text-slate-200 hover:border-emerald-500/60'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 text-[10px] font-black tabular-nums opacity-85">
                            <span>{isBn ? `ধাপ ${toBnDigits(idx + 1)}` : `Step ${idx + 1}`}</span>
                            {idx < track.steps.length - 1 && <ChevronRight className="w-3 h-3 shrink-0" />}
                          </div>
                          <div className="mt-1 text-[11px] font-black leading-snug">
                            {isBn ? step.nameBn : step.nameEn}
                          </div>
                          <div
                            dir="rtl"
                            className={`font-arabic text-[10px] font-bold mt-1 truncate ${
                              isStepActive
                                ? 'text-white/90'
                                : isDay
                                ? 'text-[#006A4E]'
                                : 'text-emerald-300'
                            }`}
                          >
                            {step.nameAr}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Step Note */}
                  <div
                    className={`rounded-xl border px-3 py-2 text-xs leading-relaxed ${
                      isDay
                        ? 'bg-white border-slate-200/80 text-slate-700'
                        : 'bg-[#071a20] border-teal-900/50 text-slate-200'
                    }`}
                  >
                    <span className="font-black">
                      {isBn ? currentStep.nameBn : currentStep.nameEn}:{' '}
                    </span>
                    <span>{isBn ? currentStep.noteBn : currentStep.noteEn}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ar-Raheeq Chapter Cards */}
        <div className="p-2 sm:p-2.5 space-y-2.5">
          {filteredRaheeqSections.length === 0 ? (
            <div
              className={`p-4 text-center text-sm font-bold ${
                isDay ? 'text-slate-500' : 'text-slate-400'
              }`}
            >
              {isBn ? 'আর-রাহীকুল মাখতূমের এই অংশে কোনো মিল পাওয়া যায়নি।' : 'No matching Ar-Raheeq chapters found.'}
            </div>
          ) : (
            filteredRaheeqSections.map((sec) => (
              <article
                key={sec.id}
                className={`rounded-xl border p-2.5 sm:p-3 space-y-2.5 ${
                  isDay
                    ? 'bg-[#f9fcfa] border-slate-200/90'
                    : 'bg-[#0a2329] border-teal-900/60'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div
                      className={`text-[11px] font-black tabular-nums ${
                        isDay ? 'text-amber-700' : 'text-amber-300'
                      }`}
                    >
                      {isBn ? sec.chapterTagBn : sec.chapterTagEn}
                    </div>
                    <h3
                      className={`text-sm sm:text-base font-black leading-snug ${
                        isDay ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {isBn ? sec.titleBn : sec.titleEn}
                    </h3>
                  </div>
                  <div
                    dir="rtl"
                    className={`font-arabic text-sm font-bold ${
                      isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                    }`}
                  >
                    {sec.titleAr}
                  </div>
                </div>

                <p className={`text-xs sm:text-[13px] leading-relaxed ${isDay ? 'text-slate-700' : 'text-slate-200'}`}>
                  {isBn ? sec.summaryBn : sec.summaryEn}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                  <div
                    className={`rounded-lg border p-2.5 space-y-1 ${
                      isDay
                        ? 'bg-white border-emerald-200/75 text-slate-700'
                        : 'bg-[#071b20] border-teal-900/55 text-slate-200'
                    }`}
                  >
                    <div className={`font-black text-[11px] ${isDay ? 'text-[#006A4E]' : 'text-emerald-300'}`}>
                      {isBn ? 'ধারা ও বিভাজনের প্রক্রিয়া:' : 'How Lineage Divided:'}
                    </div>
                    <p className="leading-relaxed">{isBn ? sec.howSplitBn : sec.howSplitEn}</p>
                  </div>

                  <div
                    className={`rounded-lg border p-2.5 space-y-1 ${
                      isDay
                        ? 'bg-amber-50/55 border-amber-200/80 text-slate-800'
                        : 'bg-amber-950/20 border-amber-800/40 text-amber-100'
                    }`}
                  >
                    <div className={`font-black text-[11px] ${isDay ? 'text-amber-800' : 'text-amber-300'}`}>
                      {isBn ? 'প্রধান ঐতিহাসিক মোড়:' : 'Key Historical Turning Point:'}
                    </div>
                    <p className="leading-relaxed">{isBn ? sec.turningPointBn : sec.turningPointEn}</p>
                  </div>
                </div>

                {/* Sub-tribes / Historical Pillars Matrix */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-0.5">
                  {sec.subBranches.map((sub, idx) => (
                    <div
                      key={idx}
                      className={`rounded-lg border p-2.5 space-y-1.5 flex flex-col justify-between ${
                        isDay
                          ? 'bg-white border-slate-200/85'
                          : 'bg-[#06181d] border-teal-900/55'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4
                            className={`text-xs sm:text-[13px] font-black leading-snug ${
                              isDay ? 'text-slate-900' : 'text-white'
                            }`}
                          >
                            {isBn ? sub.nameBn : sub.nameEn}
                          </h4>
                          <span
                            dir="rtl"
                            className={`font-arabic text-[11px] font-bold shrink-0 ${
                              isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                            }`}
                          >
                            {sub.nameAr}
                          </span>
                        </div>

                        <div
                          className={`text-[11px] font-bold flex items-start gap-1.5 ${
                            isDay ? 'text-slate-600' : 'text-slate-300'
                          }`}
                        >
                          <GitBranch className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-75" />
                          <span>{isBn ? sub.lineageBn : sub.lineageEn}</span>
                        </div>

                        <div
                          className={`text-[11px] font-bold flex items-start gap-1.5 ${
                            isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                          }`}
                        >
                          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>{isBn ? sub.settlementBn : sub.settlementEn}</span>
                        </div>
                      </div>

                      <p
                        className={`text-[11.5px] leading-relaxed pt-1.5 border-t ${
                          isDay
                            ? 'border-slate-100 text-slate-700'
                            : 'border-teal-900/45 text-slate-300'
                        }`}
                      >
                        {isBn ? sub.keyFactsBn : sub.keyFactsEn}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  className={`pt-2 border-t text-[11px] font-bold flex items-center gap-1.5 ${
                    isDay
                      ? 'border-slate-200/80 text-amber-700'
                      : 'border-teal-900/50 text-amber-300'
                  }`}
                >
                  <ScrollText className="w-3.5 h-3.5 shrink-0" />
                  <span>{isBn ? sec.sourceChapterBn : sec.sourceChapterEn}</span>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* SECTION 3: PERSON-TO-NATION & WHERE THEY LIVE TODAY DIRECTORY */}
      <div
        className={`rounded-2xl border overflow-hidden ${
          isDay ? 'bg-white border-emerald-200/85' : 'bg-[#082026] border-teal-900/65'
        }`}
      >
        <div
          className={`px-3 sm:px-4 py-2.5 sm:py-3 border-b space-y-2.5 ${
            isDay
              ? 'bg-[#f4faf7] border-emerald-200/70'
              : 'bg-[#071a20] border-teal-900/50'
          }`}
        >
          <div className="flex items-start sm:items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 min-w-0">
              <Users className={`w-4 h-4 shrink-0 ${isDay ? 'text-[#006A4E]' : 'text-emerald-400'}`} />
              <div>
                <h2
                  className={`text-sm sm:text-base font-black ${
                    isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                  }`}
                >
                  {isBn
                    ? 'কোন ব্যক্তি থেকে কোন জাতি হয়েছে · কীভাবে ভাগ হলো · এখন কোথায় বসবাস করছে'
                    : 'Which Person Formed Which Nation · How They Divided · Where They Live Today'}
                </h2>
                <p className={`text-[11px] font-medium ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                  {isBn
                    ? `আর-রাহীকুল মাখতূম, তারীখে তাবারী, আল-বিদায়া, ইবনে খালদুন ও মুরূজুয যাহাব অবলম্বনে ${totalCountBn}টি জাতিশাখার বিস্তারিত তথ্য`
                    : `${HUMANITY_PERSON_TO_NATION_LIST.length} detailed branches from Ar-Raheeq al-Makhtum, Al-Tabari, Al-Bidayah, Ibn Khaldun & Al-Mas‘udi`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span
                className={`text-xs font-black tabular-nums ${
                  isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                }`}
              >
                {isBn
                  ? `${toBnDigits(filteredPersonToNations.length)}টি জাতি-ধারা`
                  : `${filteredPersonToNations.length} Branches`}
              </span>

              <div
                className={`inline-flex p-0.5 rounded-lg border ${
                  isDay
                    ? 'bg-white border-slate-200'
                    : 'bg-[#05151a] border-teal-900/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setDirectoryMode('cards');
                  }}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer transition ${
                    directoryMode === 'cards'
                      ? 'bg-[#006A4E] text-white'
                      : isDay
                      ? 'text-slate-600 hover:text-[#006A4E]'
                      : 'text-slate-300 hover:text-emerald-300'
                  }`}
                >
                  <LayoutGrid className="w-3 h-3" />
                  <span>{isBn ? 'কার্ড' : 'Cards'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setDirectoryMode('table');
                  }}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold flex items-center gap-1 cursor-pointer transition ${
                    directoryMode === 'table'
                      ? 'bg-[#006A4E] text-white'
                      : isDay
                      ? 'text-slate-600 hover:text-[#006A4E]'
                      : 'text-slate-300 hover:text-emerald-300'
                  }`}
                >
                  <Table2 className="w-3 h-3" />
                  <span>{isBn ? 'সারণি' : 'Table'}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {rootTabs.map((tab) => {
              const active = rootLineFilter === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setRootLineFilter(tab.key);
                  }}
                  className={`min-h-[34px] px-3 rounded-lg border text-[11px] font-bold whitespace-nowrap shrink-0 transition cursor-pointer ${
                    active
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : isDay
                      ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400'
                      : 'bg-[#0c262d] border-teal-800/60 text-slate-300 hover:border-emerald-500/50'
                  }`}
                >
                  {isBn ? tab.bn : tab.en}
                </button>
              );
            })}
          </div>
        </div>

        {filteredPersonToNations.length === 0 ? (
          <div
            className={`p-8 text-center text-sm font-bold ${
              isDay ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            {isBn ? 'এই ফিল্টারে কোনো শাখা পাওয়া যায়নি।' : 'No branch entries match your search.'}
          </div>
        ) : directoryMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr
                  className={`border-b text-[11px] font-black uppercase tracking-wider ${
                    isDay
                      ? 'bg-slate-50 border-slate-200 text-slate-600'
                      : 'bg-[#06181d] border-teal-900/60 text-emerald-300/80'
                  }`}
                >
                  <th className="py-2.5 px-3.5">{isBn ? 'মূল ব্যক্তি / ধারা' : 'Ancestor Person'}</th>
                  <th className="py-2.5 px-3.5">{isBn ? 'কীভাবে বিভক্ত হলো' : 'How Divided'}</th>
                  <th className="py-2.5 px-3.5">{isBn ? 'সৃষ্ট জাতিসমূহ' : 'Nations Formed'}</th>
                  <th className="py-2.5 px-3.5">{isBn ? 'এখন কোথায় বসবাস করছে' : 'Where Today'}</th>
                  <th className="py-2.5 px-3.5">{isBn ? 'কিতাব ও সূত্র' : 'Source'}</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y text-xs align-top ${
                  isDay ? 'divide-slate-100 text-slate-800' : 'divide-teal-900/40 text-slate-200'
                }`}
              >
                {filteredPersonToNations.map((entry) => {
                  const rootMeta = getRootLineAccent(entry.rootLine, isDay);
                  return (
                    <tr
                      key={entry.id}
                      className={isDay ? 'hover:bg-emerald-50/45' : 'hover:bg-teal-950/35'}
                    >
                      <td className="py-3 px-3.5 min-w-[190px]">
                        <div className={`text-[10px] font-black ${rootMeta.textClass}`}>
                          {isBn ? rootMeta.labelBn : rootMeta.labelEn}
                        </div>
                        <div className="font-black text-xs mt-0.5">
                          {isBn ? entry.ancestorPersonBn : entry.ancestorPersonEn}
                        </div>
                        <div
                          dir="rtl"
                          className={`font-arabic text-xs font-bold mt-0.5 ${
                            isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                          }`}
                        >
                          {entry.ancestorAr}
                        </div>
                      </td>
                      <td className="py-3 px-3.5 min-w-[220px] leading-relaxed">
                        {isBn ? entry.howDividedBn : entry.howDividedEn}
                      </td>
                      <td className="py-3 px-3.5 min-w-[190px] leading-relaxed font-semibold">
                        {isBn ? entry.nationsFormedBn : entry.nationsFormedEn}
                      </td>
                      <td
                        className={`py-3 px-3.5 min-w-[200px] leading-relaxed font-bold ${
                          isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                        }`}
                      >
                        {isBn ? entry.whereTodayBn : entry.whereTodayEn}
                      </td>
                      <td
                        className={`py-3 px-3.5 min-w-[140px] text-[11px] font-semibold ${
                          isDay ? 'text-amber-700' : 'text-amber-300'
                        }`}
                      >
                        {isBn ? entry.sourceNoteBn : entry.sourceNoteEn}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-2 sm:p-2.5 grid grid-cols-1 md:grid-cols-2 gap-2">
            {filteredPersonToNations.map((entry) => {
              const rootMeta = getRootLineAccent(entry.rootLine, isDay);
              return (
                <article
                  key={entry.id}
                  className={`rounded-xl border p-2.5 sm:p-3 space-y-2 flex flex-col justify-between ${
                    isDay
                      ? 'bg-[#f8fcfa] border-slate-200/85'
                      : 'bg-[#0a2329] border-teal-900/60'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[10.5px] font-black ${rootMeta.textClass}`}>
                        {isBn ? rootMeta.labelBn : rootMeta.labelEn}
                      </span>
                      <span
                        dir="rtl"
                        className={`font-arabic text-xs font-bold shrink-0 ${
                          isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                        }`}
                      >
                        {entry.ancestorAr}
                      </span>
                    </div>

                    <h3
                      className={`text-sm sm:text-base font-black leading-snug ${
                        isDay ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {isBn ? entry.ancestorPersonBn : entry.ancestorPersonEn}
                    </h3>

                    <div
                      className={`text-[11px] font-bold flex items-center gap-1.5 ${
                        isDay ? 'text-slate-600' : 'text-slate-300'
                      }`}
                    >
                      <GitBranch className="w-3.5 h-3.5 shrink-0 opacity-75" />
                      <span>{isBn ? entry.parentLineBn : entry.parentLineEn}</span>
                    </div>

                    <div
                      className={`rounded-xl border p-2.5 space-y-1 text-xs ${
                        isDay
                          ? 'bg-white border-slate-200/80 text-slate-700'
                          : 'bg-[#071b20] border-teal-900/50 text-slate-200'
                      }`}
                    >
                      <div className="font-black text-[11px] opacity-80">
                        {isBn ? 'কীভাবে ভাগ হয়েছে:' : 'How It Branched:'}
                      </div>
                      <p className="leading-relaxed">
                        {isBn ? entry.howDividedBn : entry.howDividedEn}
                      </p>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div
                        className={`font-black text-[11px] flex items-center gap-1 ${
                          isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                        }`}
                      >
                        <Compass className="w-3.5 h-3.5 shrink-0" />
                        <span>{isBn ? 'যেসব জাতি সৃষ্টি হয়েছে:' : 'Nations Formed:'}</span>
                      </div>
                      <p className={`leading-relaxed ${isDay ? 'text-slate-800' : 'text-slate-200'}`}>
                        {isBn ? entry.nationsFormedBn : entry.nationsFormedEn}
                      </p>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div
                        className={`font-black text-[11px] flex items-center gap-1 ${
                          isDay ? 'text-amber-700' : 'text-amber-300'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{isBn ? 'এখন কোথায় বসবাস করছে:' : 'Where They Live Today:'}</span>
                      </div>
                      <p className={`font-semibold leading-relaxed ${isDay ? 'text-slate-900' : 'text-white'}`}>
                        {isBn ? entry.whereTodayBn : entry.whereTodayEn}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`pt-2 border-t text-[10.5px] font-bold ${
                      isDay
                        ? 'border-slate-200/80 text-slate-500'
                        : 'border-teal-900/50 text-slate-400'
                    }`}
                  >
                    {isBn ? entry.sourceNoteBn : entry.sourceNoteEn}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION 3: DETAILED ERA-BY-ERA HUMAN LINEAGE LIST */}
      <div
        className={`rounded-2xl border overflow-hidden ${
          isDay ? 'bg-white border-emerald-200/85' : 'bg-[#082026] border-teal-900/65'
        }`}
      >
        <div
          className={`px-3 sm:px-4 py-2.5 sm:py-3 border-b flex items-center justify-between gap-2 ${
            isDay
              ? 'bg-[#f4faf7] border-emerald-200/70'
              : 'bg-[#071a20] border-teal-900/50'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Globe2 className={`w-4 h-4 shrink-0 ${isDay ? 'text-[#006A4E]' : 'text-emerald-400'}`} />
            <div>
              <h2
                className={`text-sm sm:text-base font-black ${
                  isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                }`}
              >
                {isBn
                  ? 'আদম (আ.) থেকে আজকের পৃথিবী: সকল যুগের ধারাবাহিক তালিকা'
                  : 'Complete Chronological Era List: Adam (AS) Through All Ages to Today'}
              </h2>
              <p className={`text-[11px] font-medium ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                {isBn
                  ? 'নূহ (আ.)-এর মহাপ্লাবন ও ~৮০ মুমিন · সাম-হাম-ইয়াফিস · শেষ নবীর উম্মত ও বর্তমান বিশ্বমানবতা'
                  : 'Flood & ~80 Ark believers · Three Root Branches · Final Prophet’s Ummah · All Continents Today'}
              </p>
            </div>
          </div>
          <span
            className={`text-xs font-black tabular-nums shrink-0 ${
              isDay ? 'text-[#006A4E]' : 'text-emerald-300'
            }`}
          >
            {isBn ? `${toBnDigits(filteredEras.length)}টি যুগ` : `${filteredEras.length} Eras`}
          </span>
        </div>

        {filteredEras.length === 0 ? (
          <div
            className={`p-8 text-center text-sm font-bold ${
              isDay ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            {isBn ? 'এই ফিল্টারে কোনো যুগ পাওয়া যায়নি।' : 'No eras match the current filter.'}
          </div>
        ) : (
          <div className="p-2 sm:p-2.5 grid grid-cols-1 md:grid-cols-2 gap-2">
            {filteredEras.map((era) => {
              const st = getEraStyles(era.eraGroup, isDay);
              const branches = isBn ? era.branchesBn : era.branchesEn;

              return (
                <article
                  key={era.id}
                  className={`rounded-xl border p-2.5 sm:p-3 space-y-2 flex flex-col justify-between ${
                    isDay
                      ? 'bg-[#f8fcfa] border-slate-200/85'
                      : 'bg-[#0a2329] border-teal-900/60'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`text-[11px] font-black tabular-nums ${st.badge}`}>
                        {isBn ? era.eraTagBn : era.eraTagEn}
                      </span>
                      <span dir="rtl" className={`font-arabic text-xs font-bold ${st.arabic}`}>
                        {era.titleAr}
                      </span>
                    </div>

                    <h3
                      className={`text-sm sm:text-base font-black leading-snug ${
                        isDay ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {isBn ? era.titleBn : era.titleEn}
                    </h3>

                    <div
                      className={`text-[11.5px] font-bold ${
                        isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                      {isBn ? era.rootOrProphetBn : era.rootOrProphetEn}
                    </div>

                    <p
                      className={`text-xs leading-relaxed ${
                        isDay ? 'text-slate-700' : 'text-slate-300'
                      }`}
                    >
                      {isBn ? era.summaryBn : era.summaryEn}
                    </p>

                    <div
                      className={`rounded-xl border p-2.5 space-y-1 text-xs ${
                        isDay
                          ? 'bg-white border-slate-200/80 text-slate-700'
                          : 'bg-[#071b20] border-teal-900/50 text-slate-200'
                      }`}
                    >
                      <div>
                        <span className="font-black">
                          {isBn ? 'কীভাবে বিভক্ত হলো: ' : 'How It Split: '}
                        </span>
                        <span>{isBn ? era.howSplitBn : era.howSplitEn}</span>
                      </div>
                      <div className={isDay ? 'text-[#006A4E] font-semibold' : 'text-emerald-300 font-semibold'}>
                        <MapPin className="w-3 h-3 inline mr-1 -mt-0.5" />
                        <span>{isBn ? era.whereTodayBn : era.whereTodayEn}</span>
                      </div>
                    </div>

                    <ul className="space-y-1.5 pt-1">
                      {branches.map((branch, idx) => (
                        <li
                          key={idx}
                          className={`text-xs leading-relaxed flex items-start gap-2 ${
                            isDay ? 'text-slate-700' : 'text-slate-200'
                          }`}
                        >
                          <ChevronRight
                            className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                              isDay ? 'text-[#006A4E]' : 'text-emerald-400'
                            }`}
                          />
                          <span>{branch}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    className={`pt-2.5 mt-1 border-t space-y-1 ${
                      isDay ? 'border-slate-200/80' : 'border-teal-900/50'
                    }`}
                  >
                    <p
                      className={`text-[11px] leading-relaxed ${
                        isDay ? 'text-slate-600' : 'text-slate-300'
                      }`}
                    >
                      {isBn ? era.scholarlyNoteBn : era.scholarlyNoteEn}
                    </p>
                    <div
                      className={`text-[10.5px] font-bold ${
                        isDay ? 'text-amber-700' : 'text-amber-300'
                      }`}
                    >
                      {isBn ? era.referenceBn : era.referenceEn}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* SECTION 4: CLASSICAL BOOKS & SCHOLARLY SOURCES BIBLIOGRAPHY */}
      <div
        className={`rounded-2xl border overflow-hidden ${
          isDay ? 'bg-white border-emerald-200/85' : 'bg-[#082026] border-teal-900/65'
        }`}
      >
        <div
          className={`px-3 sm:px-4 py-2.5 sm:py-3 border-b flex items-center justify-between gap-2 ${
            isDay
              ? 'bg-[#f4faf7] border-emerald-200/70'
              : 'bg-[#071a20] border-teal-900/50'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <BookMarked className={`w-4 h-4 shrink-0 ${isDay ? 'text-[#006A4E]' : 'text-emerald-400'}`} />
            <div>
              <h2
                className={`text-sm sm:text-base font-black ${
                  isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                }`}
              >
                {isBn
                  ? 'প্রামাণ্য কিতাব ও ঐতিহাসিক গ্রন্থপঞ্জি (Classical Books & Sources)'
                  : 'Classical Islamic History & Tafsir Sources Consulted'}
              </h2>
              <p className={`text-[11px] font-medium ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                {isBn
                  ? 'এই সম্পূর্ণ শাখা-ট্রি ও জাতি-তালিকা নিচের মূল কিতাবসমূহের তথ্যের ভিত্তিতে প্রস্তুত করা হয়েছে'
                  : 'Foundational Tafsir, Hadith & Universal History books behind this genealogy'}
              </p>
            </div>
          </div>
          <span
            className={`text-xs font-black tabular-nums shrink-0 ${
              isDay ? 'text-[#006A4E]' : 'text-emerald-300'
            }`}
          >
            {isBn
              ? `${toBnDigits(CLASSICAL_SOURCE_BOOKS.length)}টি প্রামাণ্য গ্রন্থ`
              : `${CLASSICAL_SOURCE_BOOKS.length} Classical Works`}
          </span>
        </div>

        <div className="p-2 sm:p-2.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {CLASSICAL_SOURCE_BOOKS.map((book) => (
            <div
              key={book.id}
              className={`rounded-xl border p-2.5 sm:p-3 space-y-1.5 flex flex-col justify-between ${
                isDay
                  ? 'bg-[#f8fcfa] border-slate-200/85'
                  : 'bg-[#0a2329] border-teal-900/60'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2 text-[10.5px] font-bold">
                  <span className={isDay ? 'text-amber-700' : 'text-amber-300'}>
                    {isBn ? book.eraBn : book.eraEn}
                  </span>
                </div>
                <h3
                  className={`text-xs sm:text-sm font-black leading-snug ${
                    isDay ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {isBn ? book.titleBn : book.titleEn}
                </h3>
                <div
                  dir="rtl"
                  className={`font-arabic text-xs font-bold ${
                    isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                  }`}
                >
                  {book.titleAr}
                </div>
                <div
                  className={`text-[11px] font-bold ${
                    isDay ? 'text-slate-600' : 'text-slate-300'
                  }`}
                >
                  {isBn ? book.authorBn : book.authorEn}
                </div>
              </div>
              <p
                className={`text-[11.5px] leading-relaxed pt-1 border-t ${
                  isDay
                    ? 'border-slate-200/75 text-slate-600'
                    : 'border-teal-900/50 text-slate-300'
                }`}
              >
                {isBn ? book.contributionBn : book.contributionEn}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Node Inspector Modal */}
      {selectedNode && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-2 sm:p-3 bg-black/55 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setSelectedNode(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full sm:max-w-2xl rounded-2xl border shadow-2xl overflow-hidden max-h-[90vh] flex flex-col ${
              isDay
                ? 'bg-white border-emerald-200 text-slate-900'
                : 'bg-[#082026] border-teal-800/80 text-white'
            }`}
          >
            <div
              className={`px-3.5 sm:px-4 py-2.5 sm:py-3 border-b flex items-start justify-between gap-2.5 ${
                isDay
                  ? 'bg-[#f4faf7] border-emerald-200/80'
                  : 'bg-[#071a20] border-teal-900/60'
              }`}
            >
              <div className="min-w-0 space-y-1">
                <div
                  className={`text-[11px] font-extrabold ${
                    isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                  }`}
                >
                  {isBn ? selectedNode.stepBadgeBn : selectedNode.stepBadgeEn}
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-base sm:text-lg font-black leading-tight">
                    {isBn ? selectedNode.titleBn : selectedNode.titleEn}
                  </h3>
                  <span
                    dir="rtl"
                    className={`font-arabic text-sm sm:text-base font-bold ${
                      isDay ? 'text-[#006A4E]' : 'text-amber-300'
                    }`}
                  >
                    {selectedNode.titleAr}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                aria-label="Close"
                className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 cursor-pointer ${
                  isDay
                    ? 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                    : 'bg-[#0c262d] border-teal-800/70 text-slate-300 hover:text-white'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 sm:p-4 space-y-2.5 overflow-y-auto">
              <div
                className={`rounded-xl border p-2.5 space-y-1 ${
                  isDay
                    ? 'bg-[#f8fcfa] border-emerald-200/75 text-slate-800'
                    : 'bg-[#06181d] border-teal-900/60 text-slate-200'
                }`}
              >
                <div
                  className={`text-[11px] font-black ${
                    isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                  }`}
                >
                  {isBn ? 'কীভাবে বিভক্ত হলো' : 'How This Branch Divided'}
                </div>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {isBn ? selectedNode.howSplitBn : selectedNode.howSplitEn}
                </p>
              </div>

              <div
                className={`rounded-xl border p-2.5 space-y-1 ${
                  isDay
                    ? 'bg-amber-50/55 border-amber-200/75 text-slate-800'
                    : 'bg-amber-950/20 border-amber-800/40 text-amber-100'
                }`}
              >
                <div
                  className={`text-[11px] font-black flex items-center gap-1 ${
                    isDay ? 'text-amber-800' : 'text-amber-300'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>{isBn ? 'এখন কোথায় বসবাস করছে' : 'Where They Live Today'}</span>
                </div>
                <p className="text-xs sm:text-sm font-bold leading-relaxed">
                  {isBn ? selectedNode.modernLocationBn : selectedNode.modernLocationEn}
                </p>
              </div>

              <div
                className={`rounded-xl border p-2.5 space-y-1 ${
                  isDay
                    ? 'bg-slate-50 border-slate-200/80 text-slate-800'
                    : 'bg-[#071d23] border-teal-900/50 text-slate-200'
                }`}
              >
                <div className="text-[11px] font-black opacity-75">
                  {isBn ? 'সৃষ্ট মূল শাখা ও জাতিগোষ্ঠী' : 'Key Lineages & Peoples'}
                </div>
                <p className="text-xs sm:text-sm font-semibold leading-relaxed">
                  {isBn ? selectedNode.keyBranchesBn : selectedNode.keyBranchesEn}
                </p>
              </div>

              <p
                className={`text-sm leading-relaxed ${
                  isDay ? 'text-slate-700' : 'text-slate-200'
                }`}
              >
                {isBn ? selectedNode.detailBn : selectedNode.detailEn}
              </p>

              <div
                className={`pt-2 border-t text-xs font-bold flex items-center gap-1.5 ${
                  isDay
                    ? 'border-slate-200/80 text-amber-700'
                    : 'border-teal-900/50 text-amber-300'
                }`}
              >
                <ScrollText className="w-3.5 h-3.5 shrink-0" />
                <span>{isBn ? selectedNode.referenceBn : selectedNode.referenceEn}</span>
              </div>
            </div>

            <div
              className={`px-3.5 sm:px-4 py-2.5 border-t flex items-center justify-end ${
                isDay
                  ? 'bg-slate-50 border-slate-200/80'
                  : 'bg-[#071a20] border-teal-900/60'
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                className="min-h-[40px] px-4 rounded-xl bg-[#006A4E] hover:bg-[#00553e] text-white text-xs sm:text-sm font-black transition cursor-pointer active:scale-95"
              >
                {isBn ? 'বন্ধ করুন' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
