/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useMemo, useState, useRef, useCallback } from 'react';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  GitBranch,
  Layers,
  ListChecks,
  Maximize2,
  Minimize2,
  RotateCcw,
  ScrollText,
  Search,
  Sparkles,
  Star,
  Users,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import {
  OTHER_QURANIC_FIGURES,
  PROPHET_TREE_EDGES,
  PROPHET_TREE_NODES,
  ProphetTreeEdge,
  ProphetTreeNode,
  TREE_CANVAS_HEIGHT,
  TREE_CANVAS_WIDTH,
  TreeLineageGroup,
} from '../data/prophetsFamilyTreeData';

interface ProphetsFamilyTreeViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  readIds: string[];
  onOpenProphetDetail: (prophetId: string) => void;
  onBack: () => void;
  onSwitchToBiographies: () => void;
}

type TreeViewMode = 'tree' | 'branches' | 'list';
type TreeFilterKey =
  | 'all'
  | 'ulul_azm'
  | 'early'
  | 'ishmaelite'
  | 'israelite'
  | 'scripture'
  | 'other_prophets';

type FigureCategoryFilter = 'all' | 'righteous' | 'family' | 'historical' | 'angel' | 'opponent';

const toBnDigits = (val: number | string): string =>
  String(val).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

const formatNum = (val: number | string, isBn: boolean): string =>
  isBn ? toBnDigits(val) : String(val);

const padRank = (rank: number, isBn: boolean): string => {
  const padded = String(rank).padStart(2, '0');
  return isBn ? toBnDigits(padded) : padded;
};

function getLineageStyles(lineage: TreeLineageGroup, isDay: boolean, isProphet25: boolean) {
  if (!isProphet25) {
    return isDay
      ? {
          card: 'bg-[#f4f8f6] border-slate-300/90 text-slate-800 hover:border-[#006A4E]',
          badge: 'bg-slate-200 text-slate-700',
          arabic: 'text-slate-600',
          stroke: '#64748b',
        }
      : {
          card: 'bg-[#0b2026] border-teal-800/70 text-slate-200 hover:border-emerald-400',
          badge: 'bg-teal-900/70 text-teal-200',
          arabic: 'text-teal-300/80',
          stroke: '#5eead4',
        };
  }

  switch (lineage) {
    case 'early':
      return isDay
        ? {
            card: 'bg-[#eef8f4] border-emerald-500/70 text-slate-900 hover:border-[#006A4E]',
            badge: 'bg-[#006A4E] text-white',
            arabic: 'text-[#006A4E]',
            stroke: '#059669',
          }
        : {
            card: 'bg-[#0a2b25] border-emerald-500/60 text-white hover:border-emerald-300',
            badge: 'bg-emerald-600 text-white',
            arabic: 'text-emerald-300',
            stroke: '#34d399',
          };
    case 'abrahamic':
      return isDay
        ? {
            card: 'bg-[#fdf3ee] border-rose-500/70 text-slate-900 hover:border-rose-700',
            badge: 'bg-rose-700 text-white',
            arabic: 'text-rose-800',
            stroke: '#be123c',
          }
        : {
            card: 'bg-[#2a151b] border-rose-500/60 text-white hover:border-rose-300',
            badge: 'bg-rose-600 text-white',
            arabic: 'text-rose-300',
            stroke: '#fb7185',
          };
    case 'ishmaelite':
      return isDay
        ? {
            card: 'bg-[#e8f6ef] border-[#006A4E] text-slate-900 hover:border-emerald-800',
            badge: 'bg-[#005a42] text-white',
            arabic: 'text-[#005a42]',
            stroke: '#006A4E',
          }
        : {
            card: 'bg-[#092e26] border-emerald-400/70 text-white hover:border-emerald-300',
            badge: 'bg-emerald-500 text-slate-950',
            arabic: 'text-emerald-300',
            stroke: '#10b981',
          };
    case 'israelite':
      return isDay
        ? {
            card: 'bg-[#eef5fc] border-sky-600/70 text-slate-900 hover:border-sky-800',
            badge: 'bg-sky-700 text-white',
            arabic: 'text-sky-800',
            stroke: '#0369a1',
          }
        : {
            card: 'bg-[#0b2333] border-sky-500/60 text-white hover:border-sky-300',
            badge: 'bg-sky-600 text-white',
            arabic: 'text-sky-300',
            stroke: '#38bdf8',
          };
    case 'other_prophets':
    default:
      return isDay
        ? {
            card: 'bg-[#fef8eb] border-amber-500/80 text-slate-900 hover:border-amber-700',
            badge: 'bg-amber-700 text-white',
            arabic: 'text-amber-800',
            stroke: '#b45309',
          }
        : {
            card: 'bg-[#27200d] border-amber-500/60 text-white hover:border-amber-300',
            badge: 'bg-amber-500 text-slate-950',
            arabic: 'text-amber-300',
            stroke: '#fbbf24',
          };
  }
}

function getLineageLabel(lineage: TreeLineageGroup, isBn: boolean, isAr: boolean): string {
  const map: Record<TreeLineageGroup, { bn: string; en: string; ar: string }> = {
    early: { bn: 'আদি ও প্লাবন-পরবর্তী যুগ', en: 'Early Prophets', ar: 'الأنبياء الأوائل' },
    abrahamic: { bn: 'আবুল আম্বিয়া ইবরাহীম (আ.) ধারা', en: 'Abrahamic Root', ar: 'الفرع الإبراهيمي' },
    ishmaelite: { bn: 'ইসমাঈলী ও কুরাইশ ধারা', en: 'Ishmaelite / Quraysh', ar: 'الفرع الإسماعيلي' },
    israelite: { bn: 'বনী ইসরাঈল ধারা', en: 'Banu Israil Lineage', ar: 'بنو إسرائيل' },
    other_prophets: { bn: 'সমান্তরাল ও অন্যান্য নবী', en: 'Other / Parallel Prophets', ar: 'أنبياء آخرون' },
    ancestor_family: { bn: 'পূর্বপুরুষ ও পরিবার', en: 'Ancestors & Family', ar: 'الآباء والأهل' },
  };
  return isBn ? map[lineage].bn : isAr ? map[lineage].ar : map[lineage].en;
}

function buildConnectorPath(from: ProphetTreeNode, to: ProphetTreeNode): {
  d: string;
  labelX: number;
  labelY: number;
} {
  const dy = Math.abs(to.y - from.y);
  const dx = Math.abs(to.x - from.x);

  // Horizontal kinship connector (same row, e.g., Adam <-> Hawwa, Ibrahim <-> Hajar/Sarah/Lut)
  if (dy <= 18) {
    const startX = from.x < to.x ? from.x + (from.size === 'lg' ? 78 : 58) : from.x - (from.size === 'lg' ? 78 : 58);
    const endX = from.x < to.x ? to.x - (to.size === 'lg' ? 78 : 58) : to.x + (to.size === 'lg' ? 78 : 58);
    return {
      d: `M ${startX} ${from.y} L ${endX} ${to.y}`,
      labelX: (startX + endX) / 2,
      labelY: from.y - 10,
    };
  }

  const fromHalfH = from.size === 'lg' ? 36 : 25;
  const toHalfH = to.size === 'lg' ? 36 : 25;
  const startY = to.y > from.y ? from.y + fromHalfH : from.y - fromHalfH;
  const endY = to.y > from.y ? to.y - toHalfH : to.y + toHalfH;

  // Vertical straight line if aligned closely
  if (dx <= 6) {
    return {
      d: `M ${from.x} ${startY} L ${to.x} ${endY}`,
      labelX: from.x + 8,
      labelY: (startY + endY) / 2,
    };
  }

  // Orthogonal elbow with subtle rounded midpoint
  const midY = startY + (endY - startY) * 0.52;
  return {
    d: `M ${from.x} ${startY} L ${from.x} ${midY} L ${to.x} ${midY} L ${to.x} ${endY}`,
    labelX: (from.x + to.x) / 2,
    labelY: midY - 6,
  };
}

export const ProphetsFamilyTreeView: React.FC<ProphetsFamilyTreeViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
  readIds,
  onOpenProphetDetail,
  onBack,
  onSwitchToBiographies,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';
  const isAr = selectedLanguage === 'ar';

  const [viewMode, setViewMode] = useState<TreeViewMode>('tree');
  const [activeFilter, setActiveFilter] = useState<TreeFilterKey>('all');
  const [figureFilter, setFigureFilter] = useState<FigureCategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [zoom, setZoom] = useState<number>(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) return 0.56;
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return 0.72;
    return 0.85;
  });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const nodeMap = useMemo(() => {
    const map = new Map<string, ProphetTreeNode>();
    PROPHET_TREE_NODES.forEach((n) => map.set(n.id, n));
    return map;
  }, []);

  const nodeMatchesFilterAndQuery = useCallback(
    (node: ProphetTreeNode): boolean => {
      const q = searchQuery.trim().toLowerCase();
      if (q) {
        const hay = [
          node.nameBn,
          node.nameEn,
          node.nameAr,
          node.roleBn,
          node.roleEn,
          node.eraOrRegionBn,
          node.eraOrRegionEn,
          node.scriptureBn || '',
          node.scriptureEn || '',
          node.rank ? String(node.rank) : '',
          node.rank ? toBnDigits(node.rank) : '',
        ]
          .join(' ')
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }

      switch (activeFilter) {
        case 'ulul_azm':
          return Boolean(node.isUlulAzm);
        case 'early':
          return node.lineage === 'early';
        case 'ishmaelite':
          return node.lineage === 'ishmaelite' || node.id === 'ibrahim';
        case 'israelite':
          return node.lineage === 'israelite' || node.id === 'ibrahim';
        case 'scripture':
          return Boolean(node.scriptureBn);
        case 'other_prophets':
          return node.lineage === 'other_prophets';
        case 'all':
        default:
          return true;
      }
    },
    [activeFilter, searchQuery]
  );

  const selectedNode = selectedNodeId ? nodeMap.get(selectedNodeId) || null : null;

  const connectedContext = useMemo(() => {
    if (!selectedNode) return { parents: [] as ProphetTreeNode[], children: [] as ProphetTreeNode[], kin: [] as ProphetTreeNode[], edgeIds: new Set<string>() };
    const parents: ProphetTreeNode[] = [];
    const children: ProphetTreeNode[] = [];
    const kin: ProphetTreeNode[] = [];
    const edgeIds = new Set<string>();

    PROPHET_TREE_EDGES.forEach((edge) => {
      if (edge.to === selectedNode.id) {
        const other = nodeMap.get(edge.from);
        if (other) {
          edgeIds.add(edge.id);
          if (edge.kind === 'kinship') kin.push(other);
          else parents.push(other);
        }
      } else if (edge.from === selectedNode.id) {
        const other = nodeMap.get(edge.to);
        if (other) {
          edgeIds.add(edge.id);
          if (edge.kind === 'kinship') kin.push(other);
          else children.push(other);
        }
      }
    });

    return { parents, children, kin, edgeIds };
  }, [selectedNode, nodeMap]);

  const handleSelectNode = (nodeId: string) => {
    if (soundEnabled) soundHaptics.playTap();
    setSelectedNodeId(nodeId);
  };

  const handleZoomChange = (nextZoom: number) => {
    if (soundEnabled) soundHaptics.playTap();
    setZoom(Math.min(1.25, Math.max(0.42, Number(nextZoom.toFixed(2)))));
  };

  const handleFitScreen = () => {
    if (soundEnabled) soundHaptics.playTap();
    const containerWidth = scrollRef.current?.clientWidth || 900;
    const fitted = Math.min(1.0, Math.max(0.42, (containerWidth - 24) / TREE_CANVAS_WIDTH));
    setZoom(Number(fitted.toFixed(2)));
  };

  const filterChips: Array<{ key: TreeFilterKey; labelBn: string; labelEn: string; labelAr: string }> = [
    { key: 'all', labelBn: 'সম্পূর্ণ ধারা (২৫+)', labelEn: 'Full Lineage', labelAr: 'الكل' },
    { key: 'ulul_azm', labelBn: 'উলুল আযম (৫)', labelEn: 'Ulul Azm (5)', labelAr: 'أولو العزم' },
    { key: 'early', labelBn: 'আদি যুগ (আদম–ছালেহ)', labelEn: 'Early Era', labelAr: 'الأنبياء الأوائل' },
    { key: 'ishmaelite', labelBn: 'ইসমাঈলী ও কুরাইশ', labelEn: 'Ishmaelite & Arab', labelAr: 'الفرع الإسماعيلي' },
    { key: 'israelite', labelBn: 'বনী ইসরাঈল ধারা', labelEn: 'Banu Israil', labelAr: 'بنو إسرائيل' },
    { key: 'scripture', labelBn: 'কিতাব ও সহীফা', labelEn: 'Scripture Bearers', labelAr: 'أصحاب الكتب' },
    { key: 'other_prophets', labelBn: 'সমান্তরাল ধারা', labelEn: 'Other Branches', labelAr: 'فروع أخرى' },
  ];

  const branchGroups = useMemo(() => {
    const groups: Array<{
      id: string;
      titleBn: string;
      titleEn: string;
      subtitleBn: string;
      subtitleEn: string;
      nodeIds: string[];
    }> = [
      {
        id: 'bg-early',
        titleBn: '১. মানবজাতির সূচনা ও প্রাচীন নবীগণ',
        titleEn: '1. Dawn of Humanity & Ancient Prophets',
        subtitleBn: 'আদম (আ.) → শীস (আ.) → ইদরীস (আ.) → নূহ (আ.) → হূদ ও ছালেহ (আ.)',
        subtitleEn: 'Adam → Shayth → Idris → Nuh → Hud & Salih (AS)',
        nodeIds: ['adam', 'hawwa', 'qabil', 'habil', 'shayth', 'idris', 'nuh', 'sam', 'ham', 'yafith', 'yam', 'hud', 'salih'],
      },
      {
        id: 'bg-abrahamic',
        titleBn: '২. আবুল আম্বিয়া ইবরাহীম (আ.) ও সমসাময়িক',
        titleEn: '2. Father of Prophets Ibrahim (AS) & Family',
        subtitleBn: 'আযরের বংশ থেকে খলীলুল্লাহ ইবরাহীম (আ.), স্ত্রীদ্বয় ও ভ্রাতুষ্পুত্র লূত (আ.)',
        subtitleEn: 'Ibrahim (AS), wives Hajar & Sarah, and nephew Prophet Lut (AS)',
        nodeIds: ['ibrahim', 'hajar', 'sarah', 'lut', 'shuayb'],
      },
      {
        id: 'bg-ishmaelite',
        titleBn: '৩. ইসমাঈলী ও কুরাইশ ধারা → শেষনবী মুহাম্মাদ (ﷺ)',
        titleEn: '3. Ishmaelite & Quraysh Lineage → Prophet Muhammad (SAW)',
        subtitleBn: 'ইসমাঈল (আ.) → আদনান → কুরাইশ → হাশিম → আব্দুল্লাহ → মুহাম্মাদ (ﷺ) ও আহলে বাইত',
        subtitleEn: 'Ismail → Adnan → Quraysh → Hashim → Muhammad (SAW) & Companions',
        nodeIds: ['ismail', 'adnan', 'quraysh_fihr', 'qusay_hashim', 'abd_muttalib_parents', 'muhammad', 'abubakr_umar', 'uthman', 'ali_fatimah', 'hasan_husayn'],
      },
      {
        id: 'bg-israelite',
        titleBn: '৪. বনী ইসরাঈল নবুয়তী ধারা (ইসহাক্ব ও ইয়াকূব আ.)',
        titleEn: '4. Banu Israil Prophetic Lineage (Ishaq & Yaqub AS)',
        subtitleBn: 'ইসহাক্ব → ইয়াকূব → ইউসুফ, দাঊদ, সুলায়মান, মূসা, হারূন, ইলিয়াস, আল-ইয়াসা, যাকারিয়া, ইয়াহইয়া ও ঈসা (আ.)',
        subtitleEn: 'Ishaq → Yaqub → Yusuf, Dawud, Sulayman, Musa, Harun, Ilyas, Al-Yasa, Zakariyya, Yahya & Isa (AS)',
        nodeIds: ['ishaq', 'yaqub', 'yusuf', 'yahuda', 'lawi', 'musa', 'harun', 'dawud', 'sulayman', 'ilyas', 'al_yasa', 'zakariyya', 'yahya', 'maryam', 'isa'],
      },
      {
        id: 'bg-other',
        titleBn: '৫. সমান্তরাল ও বিশেষ অঞ্চলের নবীগণ',
        titleEn: '5. Parallel & Regional Prophets',
        subtitleBn: 'আইয়ূব (আ.), যুল-কিফল (আ.) ও ইউনুস (আ.)',
        subtitleEn: 'Ayyub (AS), Dhul-Kifl (AS), and Yunus (AS)',
        nodeIds: ['ayyub', 'dhul_kifl', 'yunus'],
      },
    ];

    return groups
      .map((g) => {
        const nodes = g.nodeIds
          .map((id) => nodeMap.get(id))
          .filter((n): n is ProphetTreeNode => Boolean(n))
          .filter((n) => (activeFilter === 'all' && !searchQuery.trim() ? true : nodeMatchesFilterAndQuery(n)));
        return { ...g, nodes };
      })
      .filter((g) => g.nodes.length > 0);
  }, [activeFilter, searchQuery, nodeMap, nodeMatchesFilterAndQuery]);

  const ranked25Nodes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROPHET_TREE_NODES.filter((n) => n.isProphet25 && n.rank)
      .sort((a, b) => (a.rank || 0) - (b.rank || 0))
      .filter((n) => {
        if (!q) return true;
        return [n.nameBn, n.nameEn, n.nameAr, n.eraOrRegionBn, n.eraOrRegionEn, n.scriptureBn || '']
          .join(' ')
          .toLowerCase()
          .includes(q);
      });
  }, [searchQuery]);

  const filteredOtherFigures = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return OTHER_QURANIC_FIGURES.filter((f) => {
      if (figureFilter !== 'all' && f.category !== figureFilter) return false;
      if (!q) return true;
      return [f.nameBn, f.nameEn, f.nameAr, f.identificationBn, f.identificationEn, f.refBn]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [figureFilter, searchQuery]);

  return (
    <div
      data-highlight-section="prophets_25"
      data-highlight-source={isBn ? 'নবী ও রাসূলগণের বংশলতিকা' : 'Prophets Family Tree'}
      className="space-y-4 pb-10 animate-in fade-in duration-200"
    >
      {/* QuranView-Matched Flat Header */}
      <div
        className={`pb-3.5 border-b space-y-2.5 transition-colors ${
          isDay ? 'border-[#dcebe8] text-slate-900' : 'border-[#163640] text-white'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                onBack();
              }}
              aria-label={isBn ? 'ফিরে যান' : 'Back'}
              className={`w-9 h-9 rounded-lg border flex items-center justify-center shrink-0 transition cursor-pointer active:scale-95 ${
                isDay
                  ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-[#006747]'
                  : 'bg-[#0e1c26] border-[#1a3342] text-emerald-300 hover:border-emerald-500'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <GitBranch
              className={`w-5 h-5 shrink-0 hidden xs:block ${
                isDay ? 'text-[#006747]' : 'text-emerald-400'
              }`}
            />

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1
                  className={`text-lg sm:text-xl font-black tracking-tight leading-none ${
                    isDay ? 'text-[#006747]' : 'text-white'
                  }`}
                >
                  {isBn
                    ? 'নবী ও রাসূলগণের বংশলতিকা'
                    : isAr
                    ? 'شجرة الأنبياء والرسل'
                    : 'Prophets Family Tree'}
                </h1>
                <span
                  className={`text-xs font-semibold font-arabic hidden sm:inline ${
                    isDay ? 'text-emerald-700/80' : 'text-emerald-300/80'
                  }`}
                >
                  شَجَرَةُ الْأَنْبِيَاءِ وَالرُّسُلِ
                </span>
              </div>
              <p
                className={`text-[11px] leading-tight mt-0.5 truncate ${
                  isDay ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                {isBn
                  ? '২৫ নবী ও রাসূল • আদম (আ.) থেকে মুহাম্মাদ (ﷺ) • ক্লিক করলেই পূর্ণাঙ্গ জীবনী'
                  : '25 Prophets & Messengers • Adam (AS) to Muhammad (SAW) • Tap any node'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                onSwitchToBiographies();
              }}
              className={`px-2.5 py-1.5 min-h-[36px] rounded-lg border text-[11px] font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer ${
                isDay
                  ? 'bg-white border-slate-200 text-[#006747] hover:bg-emerald-50'
                  : 'bg-[#0e1c26] border-[#1a3342] text-emerald-300 hover:bg-[#132634]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isBn ? '২৫ নবীর জীবনী' : '25 Biographies'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setIsSearchOpen((prev) => {
                  if (prev && searchQuery) setSearchQuery('');
                  return !prev;
                });
              }}
              className={`w-9 h-9 rounded-lg border flex items-center justify-center transition active:scale-95 cursor-pointer ${
                isSearchOpen || searchQuery
                  ? isDay
                    ? 'bg-[#006A4E] border-[#006A4E] text-white'
                    : 'bg-emerald-600 border-emerald-500 text-white'
                  : isDay
                  ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-[#006A4E]'
                  : 'bg-[#0e1c26] border-[#1a3342] text-emerald-300 hover:border-emerald-500'
              }`}
              title={isBn ? 'নবী বা ধারা খুঁজুন' : 'Search tree'}
              aria-label={isBn ? 'খুঁজুন' : 'Search'}
            >
              {isSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Search Input */}
      {(isSearchOpen || searchQuery.trim().length > 0) && (
        <div className="relative animate-in fade-in duration-150">
          <Search
            className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none ${
              isDay ? 'text-slate-400' : 'text-emerald-400/70'
            }`}
          />
          <input
            type="text"
            autoFocus={isSearchOpen}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              isBn
                ? 'ট্রি-তে যেকোনো নবী, বংশ বা কিতাবের নাম খুঁজুন (যেমন: ইবরাহীম, মূসা, কুরাইশ)...'
                : 'Highlight any prophet, lineage, or scripture in the tree...'
            }
            className={`w-full min-h-[44px] pl-10 pr-10 rounded-2xl border text-xs sm:text-sm font-medium outline-none transition ${
              isDay
                ? 'bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#006A4E]'
                : 'bg-[#082026] border-teal-900/70 text-white placeholder:text-slate-400 focus:border-emerald-400'
            }`}
          />
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setIsSearchOpen(false);
            }}
            aria-label="Clear search"
            className={`absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center cursor-pointer ${
              isDay ? 'text-slate-500 hover:bg-slate-100' : 'text-slate-400 hover:bg-teal-900/50'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* View Mode Tabs + Lineage Filter Strip */}
      <div className="space-y-2.5">
        <div
          className={`inline-flex p-1 rounded-2xl border w-full sm:w-auto ${
            isDay ? 'bg-[#f3f8f6] border-emerald-200/80' : 'bg-[#071a20] border-teal-900/60'
          }`}
        >
          {(
            [
              { id: 'tree', icon: GitBranch, bn: 'ট্রি চার্ট', en: 'Visual Tree' },
              { id: 'branches', icon: Layers, bn: 'বংশধারা', en: 'Lineages' },
              { id: 'list', icon: ListChecks, bn: '২৫ নবী ও অন্যান্য', en: 'Table & Figures' },
            ] as const
          ).map((tab) => {
            const IconComp = tab.icon;
            const active = viewMode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  if (soundEnabled) soundHaptics.playTap();
                  setViewMode(tab.id);
                }}
                className={`flex-1 sm:flex-initial min-h-[40px] px-3.5 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  active
                    ? 'bg-[#006A4E] text-white shadow-xs'
                    : isDay
                    ? 'text-slate-600 hover:text-[#006A4E]'
                    : 'text-slate-300 hover:text-emerald-300'
                }`}
              >
                <IconComp className="w-3.5 h-3.5 shrink-0" />
                <span className="whitespace-nowrap">{isBn ? tab.bn : tab.en}</span>
              </button>
            );
          })}
        </div>

        {viewMode !== 'list' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {filterChips.map((chip) => {
              const active = activeFilter === chip.key;
              return (
                <button
                  key={chip.key}
                  type="button"
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setActiveFilter(chip.key);
                  }}
                  className={`min-h-[38px] px-3 rounded-xl border text-xs font-bold whitespace-nowrap shrink-0 transition cursor-pointer ${
                    active
                      ? 'bg-[#006A4E] text-white border-[#006A4E]'
                      : isDay
                      ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400'
                      : 'bg-[#082026] border-teal-900/60 text-slate-300 hover:border-emerald-500/50'
                  }`}
                >
                  {isBn ? chip.labelBn : isAr ? chip.labelAr : chip.labelEn}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* =================================================================== */}
      {/* MODE 1: INTERACTIVE VISUAL TREE CHART                               */}
      {/* =================================================================== */}
      {viewMode === 'tree' && (
        <div className="space-y-3">
          {/* Toolbar: Zoom + Legend */}
          <div
            className={`rounded-2xl border px-3.5 py-2.5 flex flex-wrap items-center justify-between gap-2.5 ${
              isDay
                ? 'bg-white border-emerald-200/80'
                : 'bg-[#082026] border-teal-900/60'
            }`}
          >
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-bold">
              <span className="flex items-center gap-1.5">
                <span className="w-5 h-0.5 bg-emerald-500 inline-block rounded-full" />
                <span className={isDay ? 'text-slate-600' : 'text-slate-300'}>
                  {isBn ? 'সরাসরি প্রজন্ম' : 'Direct'}
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-5 border-t-2 border-dashed border-sky-500 inline-block" />
                <span className={isDay ? 'text-slate-600' : 'text-slate-300'}>
                  {isBn ? 'বহু প্রজন্ম' : 'Generations'}
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-5 border-t-2 border-dotted border-amber-500 inline-block" />
                <span className={isDay ? 'text-slate-600' : 'text-slate-300'}>
                  {isBn ? 'বৈবাহিক / আত্মীয়তা' : 'Kinship'}
                </span>
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className={isDay ? 'text-slate-600' : 'text-slate-300'}>
                  {isBn ? 'উলুল আযম (৫)' : 'Ulul Azm'}
                </span>
              </span>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={() => handleZoomChange(zoom - 0.12)}
                aria-label={isBn ? 'ছোট করুন' : 'Zoom out'}
                className={`w-9 h-9 rounded-lg border flex items-center justify-center transition cursor-pointer ${
                  isDay
                    ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#006A4E]'
                    : 'bg-[#0c262d] border-teal-800/70 text-emerald-200 hover:border-emerald-400'
                }`}
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span
                className={`px-2 text-xs font-extrabold tabular-nums min-w-[48px] text-center ${
                  isDay ? 'text-slate-700' : 'text-emerald-200'
                }`}
              >
                {formatNum(Math.round(zoom * 100), isBn)}%
              </span>
              <button
                type="button"
                onClick={() => handleZoomChange(zoom + 0.12)}
                aria-label={isBn ? 'বড় করুন' : 'Zoom in'}
                className={`w-9 h-9 rounded-lg border flex items-center justify-center transition cursor-pointer ${
                  isDay
                    ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#006A4E]'
                    : 'bg-[#0c262d] border-teal-800/70 text-emerald-200 hover:border-emerald-400'
                }`}
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleFitScreen}
                title={isBn ? 'স্ক্রিনে ফিট করুন' : 'Fit to screen'}
                className={`h-9 px-2.5 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition cursor-pointer ${
                  isDay
                    ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#006A4E]'
                    : 'bg-[#0c262d] border-teal-800/70 text-emerald-200 hover:border-emerald-400'
                }`}
              >
                {zoom < 0.7 ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
                <span className="hidden xs:inline">{isBn ? 'ফিট' : 'Fit'}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  handleZoomChange(1.0);
                  setActiveFilter('all');
                  setSearchQuery('');
                  setSelectedNodeId(null);
                }}
                title={isBn ? 'রিসেট' : 'Reset'}
                className={`w-9 h-9 rounded-lg border flex items-center justify-center transition cursor-pointer ${
                  isDay
                    ? 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#006A4E]'
                    : 'bg-[#0c262d] border-teal-800/70 text-emerald-200 hover:border-emerald-400'
                }`}
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Scrollable / Pannable Tree Viewport */}
          <div
            ref={scrollRef}
            className={`rounded-3xl border overflow-auto max-h-[76vh] relative shadow-sm ${
              isDay
                ? 'bg-[#f4faf6] border-emerald-200/90'
                : 'bg-[#05151a] border-teal-900/70'
            }`}
          >
            {/* Scaled Dimension Wrapper */}
            <div
              style={{
                width: `${TREE_CANVAS_WIDTH * zoom}px`,
                height: `${TREE_CANVAS_HEIGHT * zoom}px`,
                position: 'relative',
              }}
            >
              {/* Unscaled Coordinate Canvas */}
              <div
                style={{
                  width: `${TREE_CANVAS_WIDTH}px`,
                  height: `${TREE_CANVAS_HEIGHT}px`,
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top left',
                  position: 'relative',
                }}
              >
                {/* Subtle Era / Branch Backdrop Regions */}
                <div
                  className={`absolute left-[115px] top-[890px] w-[180px] h-[595px] rounded-2xl border border-dashed pointer-events-none ${
                    isDay
                      ? 'bg-emerald-100/30 border-emerald-400/50'
                      : 'bg-emerald-950/20 border-emerald-600/30'
                  }`}
                >
                  <div
                    className={`text-center text-[11px] font-black tracking-wider pt-2 ${
                      isDay ? 'text-[#006A4E]' : 'text-emerald-300/80'
                    }`}
                  >
                    {isBn ? 'কুরাইশ ও নবুয়তী ধারা' : 'QURAYSH LINEAGE'}
                  </div>
                </div>

                <div
                  className={`absolute left-[325px] top-[880px] w-[725px] h-[740px] rounded-2xl border border-dashed pointer-events-none ${
                    isDay
                      ? 'bg-sky-100/25 border-sky-400/45'
                      : 'bg-sky-950/15 border-sky-600/25'
                  }`}
                >
                  <div
                    className={`text-center text-[11px] font-black tracking-wider pt-2 ${
                      isDay ? 'text-sky-800' : 'text-sky-300/80'
                    }`}
                  >
                    {isBn ? 'বনী ইসরাঈল ধারা (১২ গোত্র)' : 'BANU ISRAIL (12 TRIBES)'}
                  </div>
                </div>

                {/* SVG Connectors Layer */}
                <svg
                  viewBox={`0 0 ${TREE_CANVAS_WIDTH} ${TREE_CANVAS_HEIGHT}`}
                  width={TREE_CANVAS_WIDTH}
                  height={TREE_CANVAS_HEIGHT}
                  className="absolute inset-0 pointer-events-none"
                >
                  {PROPHET_TREE_EDGES.map((edge: ProphetTreeEdge) => {
                    const fromNode = nodeMap.get(edge.from);
                    const toNode = nodeMap.get(edge.to);
                    if (!fromNode || !toNode) return null;

                    const { d, labelX, labelY } = buildConnectorPath(fromNode, toNode);
                    const style = getLineageStyles(edge.lineage, isDay, true);

                    const fromMatches = nodeMatchesFilterAndQuery(fromNode);
                    const toMatches = nodeMatchesFilterAndQuery(toNode);
                    const isFiltering = activeFilter !== 'all' || searchQuery.trim().length > 0;
                    const isHighlightedBySelection = selectedNodeId
                      ? connectedContext.edgeIds.has(edge.id)
                      : false;

                    let opacity = 0.72;
                    let strokeWidth = 2;
                    if (selectedNodeId) {
                      opacity = isHighlightedBySelection ? 1 : 0.16;
                      strokeWidth = isHighlightedBySelection ? 3.2 : 1.5;
                    } else if (isFiltering) {
                      opacity = fromMatches || toMatches ? 0.9 : 0.16;
                    }

                    const dashArray =
                      edge.kind === 'descent'
                        ? '6 4'
                        : edge.kind === 'kinship'
                        ? '2.5 3.5'
                        : undefined;

                    const labelText = isBn ? edge.labelBn : edge.labelEn;

                    return (
                      <g key={edge.id} style={{ opacity, transition: 'opacity 180ms ease' }}>
                        <path
                          d={d}
                          fill="none"
                          stroke={style.stroke}
                          strokeWidth={strokeWidth}
                          strokeDasharray={dashArray}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {labelText && (
                          <g transform={`translate(${labelX}, ${labelY})`}>
                            <rect
                              x={-38}
                              y={-9}
                              width={76}
                              height={16}
                              rx={6}
                              fill={isDay ? '#f4faf6' : '#05151a'}
                              fillOpacity={0.92}
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

                {/* Interactive Prophet & Family Nodes Layer */}
                {PROPHET_TREE_NODES.map((node) => {
                  const matches = nodeMatchesFilterAndQuery(node);
                  const isFiltering = activeFilter !== 'all' || searchQuery.trim().length > 0;
                  const isSelected = selectedNodeId === node.id;
                  const isNeighbor =
                    selectedNodeId !== null &&
                    (connectedContext.parents.some((p) => p.id === node.id) ||
                      connectedContext.children.some((c) => c.id === node.id) ||
                      connectedContext.kin.some((k) => k.id === node.id));
                  const isRead = node.prophetId ? readIds.includes(node.prophetId) : false;

                  let nodeOpacity = 1;
                  if (selectedNodeId) {
                    nodeOpacity = isSelected || isNeighbor ? 1 : 0.34;
                  } else if (isFiltering) {
                    nodeOpacity = matches ? 1 : 0.24;
                  }

                  const st = getLineageStyles(node.lineage, isDay, node.isProphet25);
                  const widthPx = node.size === 'lg' ? 168 : 132;

                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => handleSelectNode(node.id)}
                      style={{
                        left: `${node.x}px`,
                        top: `${node.y}px`,
                        width: `${widthPx}px`,
                        transform: 'translate(-50%, -50%)',
                        opacity: nodeOpacity,
                      }}
                      className={`absolute rounded-2xl border-2 text-left transition-all duration-150 cursor-pointer shadow-xs hover:shadow-md active:scale-[0.98] ${
                        node.size === 'lg' ? 'px-2.5 py-2' : 'px-2 py-1.5'
                      } ${st.card} ${
                        isSelected
                          ? 'ring-4 ring-amber-400/70 z-20 scale-[1.03]'
                          : isNeighbor
                          ? 'ring-2 ring-emerald-400/60 z-10'
                          : 'z-10'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1 min-w-0">
                          {node.rank && (
                            <span
                              className={`px-1.5 py-0.5 rounded-md text-[10px] font-black tabular-nums leading-none shrink-0 ${st.badge}`}
                            >
                              {padRank(node.rank, isBn)}
                            </span>
                          )}
                          {node.isUlulAzm && (
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                          )}
                          {isRead && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          )}
                        </div>
                        <span
                          dir="rtl"
                          className={`font-arabic text-xs font-bold truncate ${st.arabic}`}
                        >
                          {node.nameAr}
                        </span>
                      </div>

                      <div
                        className={`mt-1 font-black leading-tight truncate ${
                          node.size === 'lg' ? 'text-[12.5px]' : 'text-[11px]'
                        }`}
                      >
                        {isBn ? node.nameBn : node.nameEn}
                      </div>

                      <div
                        className={`mt-0.5 text-[9.5px] font-semibold leading-tight line-clamp-1 opacity-80`}
                      >
                        {node.scriptureBn
                          ? isBn
                            ? `📜 ${node.scriptureBn}`
                            : `📜 ${node.scriptureEn}`
                          : isBn
                          ? node.roleBn
                          : node.roleEn}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <p
            className={`text-[11px] font-medium text-center ${
              isDay ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            {isBn
              ? 'যেকোনো নবী বা ব্যক্তির ওপর ক্লিক করে বংশসম্পর্ক দেখুন ও পূর্ণাঙ্গ জীবনী খুলুন · চার্টটি স্ক্রল বা জুম করা যাবে'
              : 'Tap any Prophet or ancestor to inspect lineage connections and open full biography · Scroll or zoom canvas freely'}
          </p>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODE 2: HIERARCHICAL LINEAGE BRANCHES (MOBILE-FRIENDLY)              */}
      {/* =================================================================== */}
      {viewMode === 'branches' && (
        <div className="space-y-4">
          {branchGroups.length === 0 ? (
            <div
              className={`p-8 rounded-2xl border text-center text-sm font-bold ${
                isDay
                  ? 'bg-white border-slate-200 text-slate-600'
                  : 'bg-[#082026] border-teal-900/60 text-slate-300'
              }`}
            >
              {isBn ? 'এই ফিল্টারে কোনো বংশধারা পাওয়া যায়নি।' : 'No lineage nodes match this filter.'}
            </div>
          ) : (
            branchGroups.map((group) => (
              <div
                key={group.id}
                className={`rounded-2xl border overflow-hidden ${
                  isDay
                    ? 'bg-white border-emerald-200/80'
                    : 'bg-[#082026] border-teal-900/60'
                }`}
              >
                <div
                  className={`px-4 py-3.5 border-b ${
                    isDay
                      ? 'bg-[#f4faf7] border-emerald-200/70'
                      : 'bg-[#071a20] border-teal-900/50'
                  }`}
                >
                  <h2
                    className={`text-sm sm:text-base font-black ${
                      isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                    }`}
                  >
                    {isBn ? group.titleBn : group.titleEn}
                  </h2>
                  <p
                    className={`text-[11px] font-medium mt-0.5 ${
                      isDay ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    {isBn ? group.subtitleBn : group.subtitleEn}
                  </p>
                </div>

                <div className="p-3.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {group.nodes.map((node) => {
                    const st = getLineageStyles(node.lineage, isDay, node.isProphet25);
                    const isRead = node.prophetId ? readIds.includes(node.prophetId) : false;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => handleSelectNode(node.id)}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between gap-2 ${st.card}`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-1.5 min-w-0">
                            {node.rank ? (
                              <span
                                className={`px-1.5 py-0.5 rounded-md text-[10px] font-black tabular-nums ${st.badge}`}
                              >
                                {padRank(node.rank, isBn)}
                              </span>
                            ) : (
                              <span
                                className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${st.badge}`}
                              >
                                {isBn ? 'বংশ' : 'Link'}
                              </span>
                            )}
                            {node.isUlulAzm && (
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                            )}
                            {isRead && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            )}
                          </div>
                          <span
                            dir="rtl"
                            className={`font-arabic text-sm font-bold ${st.arabic}`}
                          >
                            {node.nameAr}
                          </span>
                        </div>

                        <div>
                          <div className="text-sm font-black leading-snug">
                            {isBn ? node.nameBn : node.nameEn}
                          </div>
                          <div className="text-[11px] font-semibold opacity-80 mt-0.5 line-clamp-2">
                            {isBn ? node.roleBn : node.roleEn}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10.5px] font-bold opacity-75 pt-1 border-t border-current/10">
                          <span className="truncate">
                            {isBn ? node.eraOrRegionBn : node.eraOrRegionEn}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 shrink-0" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* =================================================================== */}
      {/* MODE 3: 25 PROPHETS QUICK TABLE & OTHER QURANIC FIGURES             */}
      {/* =================================================================== */}
      {viewMode === 'list' && (
        <div className="space-y-5">
          {/* 25 Prophets Chronological Reference Table */}
          <div
            className={`rounded-2xl border overflow-hidden ${
              isDay
                ? 'bg-white border-emerald-200/80'
                : 'bg-[#082026] border-teal-900/60'
            }`}
          >
            <div
              className={`px-4 sm:px-5 py-3.5 border-b flex items-center justify-between gap-2 ${
                isDay
                  ? 'bg-[#f4faf7] border-emerald-200/70'
                  : 'bg-[#071a20] border-teal-900/50'
              }`}
            >
              <div>
                <h2
                  className={`text-sm sm:text-base font-black ${
                    isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                  }`}
                >
                  {isBn
                    ? 'কুরআনে বর্ণিত ২৫ জন নবী ও রাসূলের ক্রমবিন্যস্ত তালিকা'
                    : 'List of All 25 Prophets Named in the Quran'}
                </h2>
                <p
                  className={`text-[11px] font-medium ${
                    isDay ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  {isBn
                    ? 'যেকোনো সারিতে ক্লিক করলে সেই নবীর পূর্ণাঙ্গ জীবনী ও দোয়া খুলবে'
                    : 'Tap any row to open full biography, timeline, and supplications'}
                </p>
              </div>
            </div>

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
                    <th className="py-2.5 px-3">#</th>
                    <th className="py-2.5 px-3">{isBn ? 'নবী / রাসূল' : 'Prophet'}</th>
                    <th className="py-2.5 px-3 hidden sm:table-cell">
                      {isBn ? 'প্রেরিত জাতি / অঞ্চল' : 'Sent To'}
                    </th>
                    <th className="py-2.5 px-3 text-right">
                      {isBn ? 'কুরআনে উল্লেখ' : 'Mentions'}
                    </th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y text-xs sm:text-sm ${
                    isDay ? 'divide-slate-100' : 'divide-teal-900/40'
                  }`}
                >
                  {ranked25Nodes.map((n) => {
                    const isRead = n.prophetId ? readIds.includes(n.prophetId) : false;
                    return (
                      <tr
                        key={n.id}
                        onClick={() => n.prophetId && onOpenProphetDetail(n.prophetId)}
                        className={`transition cursor-pointer ${
                          isDay ? 'hover:bg-emerald-50/70' : 'hover:bg-teal-950/50'
                        }`}
                      >
                        <td className="py-2.5 px-3 font-black tabular-nums">
                          <span
                            className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs ${
                              isRead
                                ? 'bg-[#006A4E] text-white'
                                : isDay
                                ? 'bg-[#edf7f4] text-[#006A4E]'
                                : 'bg-[#103038] text-emerald-300'
                            }`}
                          >
                            {padRank(n.rank || 0, isBn)}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`font-black ${
                                isDay ? 'text-slate-900' : 'text-white'
                              }`}
                            >
                              {isBn ? n.nameBn : n.nameEn}
                            </span>
                            <span
                              dir="rtl"
                              className={`font-arabic text-xs font-bold ${
                                isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                              }`}
                            >
                              {n.nameAr}
                            </span>
                            {n.isUlulAzm && (
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                            )}
                          </div>
                          <div
                            className={`text-[11px] sm:hidden ${
                              isDay ? 'text-slate-500' : 'text-slate-400'
                            }`}
                          >
                            {isBn ? n.eraOrRegionBn : n.eraOrRegionEn}
                          </div>
                        </td>
                        <td
                          className={`py-2.5 px-3 hidden sm:table-cell text-xs font-medium ${
                            isDay ? 'text-slate-600' : 'text-slate-300'
                          }`}
                        >
                          {isBn ? n.eraOrRegionBn : n.eraOrRegionEn}
                          {n.scriptureBn && (
                            <span
                              className={`ml-1.5 font-bold ${
                                isDay ? 'text-amber-700' : 'text-amber-300'
                              }`}
                            >
                              · {isBn ? n.scriptureBn : n.scriptureEn}
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 text-right font-extrabold tabular-nums">
                          <span
                            className={`inline-flex items-center gap-1 ${
                              isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                            }`}
                          >
                            <span>
                              {n.quranMentions ? formatNum(n.quranMentions, isBn) : '—'}
                              {isBn ? ' বার' : 'x'}
                            </span>
                            <ChevronRight className="w-4 h-4 opacity-60" />
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Other Names Mentioned in the Quran */}
          <div
            className={`rounded-2xl border overflow-hidden ${
              isDay
                ? 'bg-white border-emerald-200/80'
                : 'bg-[#082026] border-teal-900/60'
            }`}
          >
            <div
              className={`px-4 sm:px-5 py-3.5 border-b space-y-2.5 ${
                isDay
                  ? 'bg-[#f4faf7] border-emerald-200/70'
                  : 'bg-[#071a20] border-teal-900/50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Users
                  className={`w-4 h-4 shrink-0 ${
                    isDay ? 'text-[#006A4E]' : 'text-emerald-400'
                  }`}
                />
                <h2
                  className={`text-sm sm:text-base font-black ${
                    isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                  }`}
                >
                  {isBn
                    ? 'কুরআনে উল্লেখিত অন্যান্য প্রসিদ্ধ ব্যক্তিত্ব ও নাম'
                    : 'Other Notable Names Mentioned in the Quran'}
                </h2>
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                {(
                  [
                    { key: 'all', bn: 'সকল', en: 'All' },
                    { key: 'righteous', bn: 'নেককার ব্যক্তিত্ব', en: 'Righteous' },
                    { key: 'family', bn: 'পরিবার ও সাহাবি', en: 'Family & Sahaba' },
                    { key: 'historical', bn: 'বাদশাহ / ঐতিহাসিক', en: 'Historical Rulers' },
                    { key: 'angel', bn: 'ফেরেশতা', en: 'Angels' },
                    { key: 'opponent', bn: 'বিরোধী চরিত্র', en: 'Opponents' },
                  ] as const
                ).map((cat) => (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => {
                      if (soundEnabled) soundHaptics.playTap();
                      setFigureFilter(cat.key);
                    }}
                    className={`min-h-[34px] px-3 rounded-lg border text-[11px] font-bold whitespace-nowrap shrink-0 transition cursor-pointer ${
                      figureFilter === cat.key
                        ? 'bg-[#006A4E] text-white border-[#006A4E]'
                        : isDay
                        ? 'bg-white border-slate-200 text-slate-600 hover:border-emerald-400'
                        : 'bg-[#0c262d] border-teal-800/60 text-slate-300 hover:border-emerald-500/50'
                    }`}
                  >
                    {isBn ? cat.bn : cat.en}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredOtherFigures.map((fig) => (
                <div
                  key={fig.id}
                  className={`p-3.5 rounded-xl border space-y-1.5 ${
                    isDay
                      ? 'bg-[#f8fcfa] border-slate-200/80'
                      : 'bg-[#0a2329] border-teal-900/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3
                      className={`text-sm font-black ${
                        isDay ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {isBn ? fig.nameBn : fig.nameEn}
                    </h3>
                    <span
                      dir="rtl"
                      className={`font-arabic text-sm font-bold shrink-0 ${
                        isDay ? 'text-[#006A4E]' : 'text-emerald-300'
                      }`}
                    >
                      {fig.nameAr}
                    </span>
                  </div>
                  <p
                    className={`text-xs leading-relaxed ${
                      isDay ? 'text-slate-600' : 'text-slate-300'
                    }`}
                  >
                    {isBn ? fig.identificationBn : fig.identificationEn}
                  </p>
                  <div
                    className={`text-[11px] font-bold ${
                      isDay ? 'text-amber-700' : 'text-amber-300'
                    }`}
                  >
                    {isBn ? fig.refBn : fig.refEn}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* NODE INSPECTOR MODAL / SHEET                                        */}
      {/* =================================================================== */}
      {selectedNode && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/55 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setSelectedNodeId(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl border shadow-2xl overflow-hidden max-h-[88vh] flex flex-col ${
              isDay
                ? 'bg-white border-emerald-200 text-slate-900'
                : 'bg-[#082026] border-teal-800/80 text-white'
            }`}
          >
            {/* Header */}
            <div
              className={`px-5 py-4 border-b flex items-start justify-between gap-3 ${
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
                  {selectedNode.rank
                    ? isBn
                      ? `ক্রমিক ${padRank(selectedNode.rank, true)} / ২৫`
                      : `Prophet #${selectedNode.rank} of 25`
                    : isBn
                    ? 'বংশলতিকা ও ঐতিহাসিক সংযোগ'
                    : 'Genealogical Link'}
                  {'  ·  '}
                  {getLineageLabel(selectedNode.lineage, isBn, isAr)}
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h3 className="text-lg sm:text-xl font-black leading-tight">
                    {isBn ? selectedNode.nameBn : selectedNode.nameEn}
                  </h3>
                  <span
                    dir="rtl"
                    className={`font-arabic text-lg font-bold ${
                      isDay ? 'text-[#006A4E]' : 'text-amber-300'
                    }`}
                  >
                    {selectedNode.nameAr}
                  </span>
                </div>
                <p
                  className={`text-xs font-semibold ${
                    isDay ? 'text-slate-600' : 'text-slate-300'
                  }`}
                >
                  {isBn ? selectedNode.roleBn : selectedNode.roleEn}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedNodeId(null)}
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

            {/* Body */}
            <div className="p-5 space-y-4 overflow-y-auto">
              <div
                className={`text-xs font-bold flex flex-wrap gap-x-4 gap-y-1 ${
                  isDay ? 'text-slate-600' : 'text-slate-300'
                }`}
              >
                <span>
                  📍 {isBn ? selectedNode.eraOrRegionBn : selectedNode.eraOrRegionEn}
                </span>
                {selectedNode.quranMentions && (
                  <span>
                    📖{' '}
                    {isBn
                      ? `কুরআনে ${toBnDigits(selectedNode.quranMentions)} বার`
                      : `${selectedNode.quranMentions}x in Quran`}
                  </span>
                )}
                {selectedNode.scriptureBn && (
                  <span className={isDay ? 'text-amber-700' : 'text-amber-300'}>
                    📜 {isBn ? selectedNode.scriptureBn : selectedNode.scriptureEn}
                  </span>
                )}
              </div>

              <p
                className={`text-sm leading-relaxed ${
                  isDay ? 'text-slate-700' : 'text-slate-200'
                }`}
              >
                {isBn ? selectedNode.noteBn : selectedNode.noteEn}
              </p>

              {/* Connected Lineage Links */}
              {(connectedContext.parents.length > 0 ||
                connectedContext.children.length > 0 ||
                connectedContext.kin.length > 0) && (
                <div
                  className={`rounded-2xl border p-3.5 space-y-3 ${
                    isDay
                      ? 'bg-[#f8fcfa] border-slate-200/80'
                      : 'bg-[#06181d] border-teal-900/50'
                  }`}
                >
                  {connectedContext.parents.length > 0 && (
                    <div className="space-y-1.5">
                      <div
                        className={`text-[11px] font-black ${
                          isDay ? 'text-slate-500' : 'text-emerald-300/75'
                        }`}
                      >
                        {isBn ? 'পূর্বসূরি / পিতা-বংশ:' : 'Predecessor / Ancestor:'}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {connectedContext.parents.map((rel) => (
                          <button
                            key={rel.id}
                            type="button"
                            onClick={() => handleSelectNode(rel.id)}
                            className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${
                              isDay
                                ? 'bg-white border-slate-200 text-[#006A4E] hover:border-[#006A4E]'
                                : 'bg-[#0d2830] border-teal-800/70 text-emerald-300 hover:border-emerald-400'
                            }`}
                          >
                            ↑ {isBn ? rel.nameBn : rel.nameEn}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {connectedContext.children.length > 0 && (
                    <div className="space-y-1.5">
                      <div
                        className={`text-[11px] font-black ${
                          isDay ? 'text-slate-500' : 'text-emerald-300/75'
                        }`}
                      >
                        {isBn ? 'বংশধর / পরবর্তী ধারা:' : 'Descendants / Next Lineage:'}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {connectedContext.children.map((rel) => (
                          <button
                            key={rel.id}
                            type="button"
                            onClick={() => handleSelectNode(rel.id)}
                            className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${
                              isDay
                                ? 'bg-white border-slate-200 text-[#006A4E] hover:border-[#006A4E]'
                                : 'bg-[#0d2830] border-teal-800/70 text-emerald-300 hover:border-emerald-400'
                            }`}
                          >
                            ↓ {isBn ? rel.nameBn : rel.nameEn}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {connectedContext.kin.length > 0 && (
                    <div className="space-y-1.5">
                      <div
                        className={`text-[11px] font-black ${
                          isDay ? 'text-slate-500' : 'text-emerald-300/75'
                        }`}
                      >
                        {isBn ? 'পারিবারিক / সমসাময়িক সম্পর্ক:' : 'Family / Kinship Link:'}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {connectedContext.kin.map((rel) => (
                          <button
                            key={rel.id}
                            type="button"
                            onClick={() => handleSelectNode(rel.id)}
                            className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold transition cursor-pointer ${
                              isDay
                                ? 'bg-white border-slate-200 text-amber-700 hover:border-amber-500'
                                : 'bg-[#0d2830] border-teal-800/70 text-amber-300 hover:border-amber-400'
                            }`}
                          >
                            ↔ {isBn ? rel.nameBn : rel.nameEn}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer CTA */}
            <div
              className={`px-5 py-3.5 border-t flex items-center justify-end gap-2 ${
                isDay
                  ? 'bg-slate-50 border-slate-200/80'
                  : 'bg-[#071a20] border-teal-900/60'
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedNodeId(null)}
                className={`min-h-[42px] px-4 rounded-xl border text-xs font-bold cursor-pointer ${
                  isDay
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    : 'bg-[#0c262d] border-teal-800/70 text-slate-300 hover:bg-teal-950'
                }`}
              >
                {isBn ? 'বন্ধ করুন' : 'Close'}
              </button>

              {selectedNode.prophetId && (
                <button
                  type="button"
                  onClick={() => {
                    const targetId = selectedNode.prophetId!;
                    setSelectedNodeId(null);
                    onOpenProphetDetail(targetId);
                  }}
                  className="min-h-[42px] px-4 rounded-xl bg-[#006A4E] hover:bg-[#00553e] text-white text-xs sm:text-sm font-black flex items-center gap-1.5 transition cursor-pointer active:scale-95"
                >
                  <ScrollText className="w-4 h-4" />
                  <span>{isBn ? 'পূর্ণাঙ্গ জীবনী ও দোয়া পড়ুন' : 'Read Full Biography'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
