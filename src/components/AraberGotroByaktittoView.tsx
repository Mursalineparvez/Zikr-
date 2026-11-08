import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  BOOK_METADATA,
  ARABER_GOTRO_CHAPTERS,
  ARABER_GOTRO_DATABASE,
  MAKKAH_RESPONSIBILITIES,
  TRIBE_STATISTICS,
  ALL_40_APPENDIX_TRIBES,
  BANU_HASHIM_GENEALOGY,
  ANSAR_GENEALOGY,
  CHAPTER3_OVERVIEW,
  TribePersonality,
  TribeSection,
  AppendixTribe,
  ClanResponsibility
} from '../data/araberGotroData';
import {
  BookOpen,
  Search,
  Shield,
  Users,
  Bookmark,
  ArrowLeft,
  Award,
  MapPin,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Info,
  List,
  BarChart3,
  GitFork,
  Building,
  Scroll,
  Check,
  Copy,
  Droplet,
  Flag,
  Scale,
  Compass,
  Coins,
  Key,
  Heart,
  Layers,
  ArrowUp,
  SlidersHorizontal
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';

interface AraberGotroByaktittoViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  onBack?: () => void;
  soundEnabled: boolean;
}

type ActiveTab = 'book_reader' | 'who_is_who' | 'responsibilities' | 'genealogy' | 'appendix40' | 'analytics' | 'bookmarks';

export const AraberGotroByaktittoView: React.FC<AraberGotroByaktittoViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  onBack,
  soundEnabled,
}) => {
  const isDay = themeMode === 'day';
  const [activeTab, setActiveTab] = useState<ActiveTab>('book_reader');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Expanded sections tracking (allow expanding all or specific sections)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'banu-hashim': true,
    'banu-umayya': true
  });
  const [allExpanded, setAllExpanded] = useState<boolean>(true);

  const [selectedResponsibility, setSelectedResponsibility] = useState<ClanResponsibility | null>(null);
  const [appendixFilter, setAppendixFilter] = useState<string>('all');
  const [activePersonalityModal, setActivePersonalityModal] = useState<TribePersonality | null>(null);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large'>('normal');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter for "Who is Who" (কোন গোত্রে কে কে) tab
  const [whoIsWhoCategory, setWhoIsWhoCategory] = useState<'all' | 'quraysh' | 'ansar' | 'other_arab' | 'jewish'>('all');

  // Collapsible toggle for in-chapter overview charts in Book Reader
  const [showChapter1ResponsibilitiesChart, setShowChapter1ResponsibilitiesChart] = useState<boolean>(true);
  const [showChapter2AnsarChart, setShowChapter2AnsarChart] = useState<boolean>(true);
  const [showChapter3OverviewChart, setShowChapter3OverviewChart] = useState<boolean>(true);

  // Bookmarks persistence
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_araber_gotro_bookmarks');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('zikrmate_araber_gotro_bookmarks', JSON.stringify(bookmarks));
    } catch {}
  }, [bookmarks]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (soundEnabled) soundHaptics.playTap();
    setBookmarks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopy = (text: string, id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (soundEnabled) soundHaptics.playTap();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleSection = (id: string) => {
    if (soundEnabled) soundHaptics.playTap();
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleToggleAll = () => {
    if (soundEnabled) soundHaptics.playTap();
    const nextState = !allExpanded;
    setAllExpanded(nextState);
    const updated: Record<string, boolean> = {};
    ARABER_GOTRO_DATABASE.forEach(s => {
      updated[s.id] = nextState;
    });
    setExpandedSections(updated);
  };

  // Jump to specific anchor in Book Reader
  const scrollToAnchor = (elementId: string) => {
    if (soundEnabled) soundHaptics.playTap();
    setActiveTab('book_reader');
    setTimeout(() => {
      const el = document.getElementById(elementId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Filtered sections for Chapter browser in Book Reader
  const filteredSections = useMemo(() => {
    return ARABER_GOTRO_DATABASE.filter((sec) => {
      const matchChapter = sec.chapterNo === selectedChapter;
      const q = searchQuery.toLowerCase().trim();
      if (!matchChapter) return false;
      if (!q) return true;

      const matchTribe = sec.tribeNameBn.toLowerCase().includes(q) ||
        (sec.tribeNameAr && sec.tribeNameAr.toLowerCase().includes(q)) ||
        sec.introductionBn.toLowerCase().includes(q) ||
        sec.responsibilityOrRoleBn.toLowerCase().includes(q);

      const matchPersonalities = sec.personalities.some(
        (p) => p.nameBn.toLowerCase().includes(q) ||
          (p.nameAr && p.nameAr.toLowerCase().includes(q)) ||
          p.bioBn.toLowerCase().includes(q) ||
          p.roleBn.toLowerCase().includes(q)
      );

      const matchSubClans = sec.subClans?.some(
        (sc) => sc.nameBn.toLowerCase().includes(q) || sc.descriptionBn.toLowerCase().includes(q)
      );

      return matchTribe || matchPersonalities || matchSubClans;
    });
  }, [selectedChapter, searchQuery]);

  // Master "Who is Who" Mapping Data (কোন গোত্রে কে কে)
  const whoIsWhoData = useMemo(() => {
    return ARABER_GOTRO_DATABASE.map((sec) => {
      const sahaba = sec.personalities.filter(p => p.category === 'sahabi');
      const historical = sec.personalities.filter(p => p.category === 'historical' || p.category === 'historical_hanif');
      const negative = sec.personalities.filter(p => p.category === 'negative');

      let categoryGroup: 'quraysh' | 'ansar' | 'other_arab' | 'jewish' = 'other_arab';
      if (sec.chapterNo === 1) categoryGroup = 'quraysh';
      else if (sec.chapterNo === 2) {
        categoryGroup = sec.sectionCode === '২.৩' ? 'jewish' : 'ansar';
      }

      return {
        id: sec.id,
        sectionCode: sec.sectionCode,
        chapterNo: sec.chapterNo,
        tribeNameBn: sec.tribeNameBn,
        tribeNameAr: sec.tribeNameAr,
        categoryGroup,
        locationBn: sec.locationOrContextBn,
        responsibilityBn: sec.responsibilityOrRoleBn,
        subClans: sec.subClans || [],
        sahaba,
        historical,
        negative,
        totalCount: sec.personalities.length,
        referencesBn: sec.referencesBn,
        introductionBn: sec.introductionBn
      };
    });
  }, []);

  // Filtered Who is Who clans
  const filteredWhoIsWho = useMemo(() => {
    return whoIsWhoData.filter((item) => {
      const matchCat = whoIsWhoCategory === 'all' || item.categoryGroup === whoIsWhoCategory;
      if (!matchCat) return false;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;

      const matchName = item.tribeNameBn.toLowerCase().includes(q) ||
        (item.tribeNameAr && item.tribeNameAr.toLowerCase().includes(q)) ||
        item.locationBn.toLowerCase().includes(q) ||
        item.responsibilityBn.toLowerCase().includes(q);

      const matchSahaba = item.sahaba.some(s => s.nameBn.toLowerCase().includes(q) || s.roleBn.toLowerCase().includes(q));
      const matchHistorical = item.historical.some(h => h.nameBn.toLowerCase().includes(q) || h.roleBn.toLowerCase().includes(q));
      const matchNegative = item.negative.some(n => n.nameBn.toLowerCase().includes(q) || n.roleBn.toLowerCase().includes(q));
      const matchSubClans = item.subClans.some(sc => sc.nameBn.toLowerCase().includes(q));

      return matchName || matchSahaba || matchHistorical || matchNegative || matchSubClans;
    });
  }, [whoIsWhoData, whoIsWhoCategory, searchQuery]);

  // Filtered 40 appendix tribes
  const filteredAppendixTribes = useMemo(() => {
    return ALL_40_APPENDIX_TRIBES.filter((tribe) => {
      const q = searchQuery.toLowerCase().trim();
      const matchFilter = appendixFilter === 'all' || tribe.categoryBn.includes(appendixFilter);
      if (!matchFilter) return false;
      if (!q) return true;

      return (
        tribe.nameBn.toLowerCase().includes(q) ||
        tribe.regionBn.toLowerCase().includes(q) ||
        tribe.historicalSignificanceBn.toLowerCase().includes(q) ||
        tribe.sahabaListBn.some((s) => s.toLowerCase().includes(q)) ||
        tribe.negativeFiguresBn?.some((n) => n.toLowerCase().includes(q)) ||
        tribe.referenceBn.toLowerCase().includes(q)
      );
    });
  }, [appendixFilter, searchQuery]);

  // Bookmarked personalities list
  const bookmarkedPersonalities = useMemo(() => {
    const list: { personality: TribePersonality; clanName: string }[] = [];
    ARABER_GOTRO_DATABASE.forEach((sec) => {
      sec.personalities.forEach((p) => {
        if (bookmarks[p.id]) {
          list.push({ personality: p, clanName: sec.tribeNameBn });
        }
      });
    });
    return list;
  }, [bookmarks]);

  // Responsibility icon helper
  const renderResponsibilityIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Droplet': return <Droplet className="w-5 h-5 text-sky-400" />;
      case 'Flag': return <Flag className="w-5 h-5 text-amber-400" />;
      case 'Shield': return <Shield className="w-5 h-5 text-emerald-400" />;
      case 'Users': return <Users className="w-5 h-5 text-teal-400" />;
      case 'Scale': return <Scale className="w-5 h-5 text-indigo-400" />;
      case 'Landmark': return <Building className="w-5 h-5 text-purple-400" />;
      case 'Heart': return <Heart className="w-5 h-5 text-rose-400" />;
      case 'Key': return <Key className="w-5 h-5 text-amber-400" />;
      case 'Compass': return <Compass className="w-5 h-5 text-orange-400" />;
      case 'Coins': return <Coins className="w-5 h-5 text-yellow-400" />;
      default: return <Award className="w-5 h-5 text-amber-400" />;
    }
  };

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-200 ${
      isDay ? 'text-slate-800' : 'text-[#e6f4f2]'
    }`}>
      {/* 1. Header & Book Meta Card (NO author name, NO website links, NO promotional links) */}
      <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 mb-6 shadow-xl border ${
        isDay
          ? 'bg-gradient-to-br from-teal-800 via-emerald-800 to-teal-900 text-white border-teal-700'
          : 'bg-gradient-to-br from-[#072428] via-[#0b333a] to-[#041518] text-white border-emerald-500/30'
      }`}>
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <Shield className="w-72 h-72 text-emerald-300" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            {onBack && (
              <button
                onClick={() => {
                  if (soundEnabled) soundHaptics.playTap();
                  onBack();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 backdrop-blur-md transition cursor-pointer text-white border border-white/20 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>ইসলামিক লাইব্রেরিতে ফিরুন</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              <span className="text-xs font-serif opacity-80">{BOOK_METADATA.titleAr}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">
                সীরাত ও ইতিহাস কোষগ্রন্থ
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
              <span>🛡️</span>
              <span>{BOOK_METADATA.titleBn}</span>
            </h1>
            <p className="text-sm sm:text-base text-emerald-100/90 max-w-3xl leading-relaxed">
              {BOOK_METADATA.summaryBn}
            </p>
          </div>

          {/* Clean Academic Metadata Grid (Free from author & website links) */}
          <div className="pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-emerald-200/70 block">অধ্যায় বিন্যাস</span>
              <span className="font-bold text-white">৩টি মূল অধ্যায় (মক্কা, মদিনা ও আরব)</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-emerald-200/70 block">কাবার দায়িত্ব বণ্টন</span>
              <span className="font-bold text-white">১০টি প্রধান কুরাইশ শাখা (পৃষ্ঠা ৪)</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-emerald-200/70 block">গোত্র ইনডেক্স</span>
              <span className="font-bold text-white">৪০টি গোত্র ও উপশাখা (পৃষ্ঠা ৬৪–৮৩)</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-emerald-200/70 block">প্রামাণ্য তথ্যসূত্র</span>
              <span className="font-bold text-amber-300">ইবনে হিশাম, আল-ইসাবাহ ও সীরাত</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary Navigation Tabs (Zero-Pill Restrained Design) */}
      <div className={`p-1.5 rounded-2xl border mb-6 flex items-center gap-1 overflow-x-auto scrollbar-none ${
        isDay ? 'bg-slate-100 border-slate-200' : 'bg-[#061e22] border-[#133c44]'
      }`}>
        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setActiveTab('book_reader');
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'book_reader'
              ? isDay ? 'bg-white text-teal-800 shadow-sm' : 'bg-emerald-600 text-white shadow-md'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>পিডিএফ বইয়ের ধারাবাহিক পাঠ</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setActiveTab('who_is_who');
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'who_is_who'
              ? isDay ? 'bg-white text-teal-800 shadow-sm' : 'bg-emerald-600 text-white shadow-md'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4 text-amber-400" />
          <span>কোন গোত্রে কে কে (ম্যাপিং চার্ট)</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setActiveTab('responsibilities');
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'responsibilities'
              ? isDay ? 'bg-white text-teal-800 shadow-sm' : 'bg-emerald-600 text-white shadow-md'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <Building className="w-4 h-4" />
          <span>কুরাইশ দায়িত্ব বণ্টন চার্ট (পৃ. ৪)</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setActiveTab('genealogy');
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'genealogy'
              ? isDay ? 'bg-white text-teal-800 shadow-sm' : 'bg-emerald-600 text-white shadow-md'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <GitFork className="w-4 h-4" />
          <span>বংশধারা চিত্র (পৃ. ৫ ও ৩১)</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setActiveTab('appendix40');
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'appendix40'
              ? isDay ? 'bg-white text-teal-800 shadow-sm' : 'bg-emerald-600 text-white shadow-md'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <Scroll className="w-4 h-4" />
          <span>৪০টি গোত্র ইনডেক্স (পৃ. ৬৫–৮৩)</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setActiveTab('analytics');
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'analytics'
              ? isDay ? 'bg-white text-teal-800 shadow-sm' : 'bg-emerald-600 text-white shadow-md'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>পরিসংখ্যান ও বার চার্ট (পৃ. ৬৪)</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setActiveTab('bookmarks');
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'bookmarks'
              ? isDay ? 'bg-white text-teal-800 shadow-sm' : 'bg-emerald-600 text-white shadow-md'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>বুকমার্ক ({bookmarkedPersonalities.length})</span>
        </button>
      </div>

      {/* 3. Global Quick Search & Reading Controls Bar */}
      <div className={`p-4 rounded-2xl border mb-6 flex flex-col sm:flex-row items-center gap-3 justify-between ${
        isDay ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#082226] border-[#153e46]'
      }`}>
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="গোত্র, সাহাবি, উপাধি বা হাদিস সূত্র অনুসন্ধান..."
            className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs sm:text-sm border outline-none transition ${
              isDay
                ? 'bg-slate-50 border-slate-200 focus:border-teal-600 text-slate-800'
                : 'bg-[#041417] border-[#153e46] focus:border-emerald-500 text-emerald-100 placeholder-emerald-400/50'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-rose-500 font-bold"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs font-semibold">
          <div className="flex items-center gap-1 border rounded-xl p-1 bg-black/5 dark:bg-black/20 border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setFontSizeLevel('normal')}
              className={`px-2.5 py-1 rounded-lg transition ${
                fontSizeLevel === 'normal'
                  ? isDay ? 'bg-white shadow text-teal-800 font-bold' : 'bg-emerald-600 text-white font-bold'
                  : 'opacity-70'
              }`}
            >
              স্বাভাবিক ফন্ট
            </button>
            <button
              onClick={() => setFontSizeLevel('large')}
              className={`px-2.5 py-1 rounded-lg transition ${
                fontSizeLevel === 'large'
                  ? isDay ? 'bg-white shadow text-teal-800 font-bold' : 'bg-emerald-600 text-white font-bold'
                  : 'opacity-70'
              }`}
            >
              বড় ফন্ট (A+)
            </button>
          </div>
        </div>
      </div>

      {/* 4. Tab: Continuous Book Reader (পিডিএফের হুবহু অধ্যায়ভিত্তিক বই পাঠ) */}
      {activeTab === 'book_reader' && (
        <div className="space-y-6">
          {/* PDF Pages 2-3: সূচিপত্র (Table of Contents Card) with Clickable Jumps */}
          <div className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
            isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
          }`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#153e46]">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">📋</span>
                <div>
                  <h3 className="font-black text-base sm:text-lg">সূচিপত্র (পিডিএফ পৃষ্ঠা ২–৩)</h3>
                  <p className="text-xs opacity-70">যেকোনো অধ্যায় বা পরিচ্ছেদে ক্লিক করে সরাসরি সেখানে যান</p>
                </div>
              </div>
              <button
                onClick={handleToggleAll}
                className="text-xs font-bold px-3 py-1.5 rounded-xl border transition hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer flex items-center gap-1.5"
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>{allExpanded ? 'সব সংক্ষেপ করুন' : 'সব পরিচ্ছেদ উন্মুক্ত করুন'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              {/* Col 1: Chapter 1 */}
              <div className="space-y-2">
                <div className="font-black text-teal-600 dark:text-teal-400 flex items-center justify-between pb-1 border-b border-dashed border-slate-200 dark:border-slate-800">
                  <span onClick={() => { setSelectedChapter(1); scrollToAnchor('chapter-1'); }} className="cursor-pointer hover:underline">
                    অধ্যায় ১ : মক্কার গোত্রসমূহ
                  </span>
                  <span className="opacity-60">পৃষ্ঠা ৪</span>
                </div>
                <div className="pl-2 space-y-1">
                  <div
                    onClick={() => { setSelectedChapter(1); setShowChapter1ResponsibilitiesChart(true); scrollToAnchor('ch1-chart'); }}
                    className="cursor-pointer hover:text-amber-400 flex justify-between text-amber-500 font-bold"
                  >
                    <span>• কুরাইশ দায়িত্ব বণ্টন চার্ট</span>
                    <span>পৃষ্ঠা ৪</span>
                  </div>
                  {ARABER_GOTRO_DATABASE.filter(s => s.chapterNo === 1).map(s => (
                    <div
                      key={s.id}
                      onClick={() => {
                        setSelectedChapter(1);
                        setExpandedSections(prev => ({ ...prev, [s.id]: true }));
                        scrollToAnchor(s.id);
                      }}
                      className="cursor-pointer hover:text-emerald-400 flex justify-between opacity-85 py-0.5"
                    >
                      <span className="truncate">{s.sectionCode} {s.tribeNameBn}</span>
                      <span className="opacity-60 ml-2">পৃ. {s.sectionCode === '১.১' ? '৫' : s.sectionCode === '১.২' ? '৯' : s.sectionCode === '১.৩' ? '১২' : s.sectionCode === '১.৪' ? '১৫' : s.sectionCode === '১.৫' ? '১৮' : s.sectionCode === '১.৬' ? '২১' : s.sectionCode === '১.৭' ? '২৪' : '২৭'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Col 2: Chapter 2 */}
              <div className="space-y-2">
                <div className="font-black text-teal-600 dark:text-teal-400 flex items-center justify-between pb-1 border-b border-dashed border-slate-200 dark:border-slate-800">
                  <span onClick={() => { setSelectedChapter(2); scrollToAnchor('chapter-2'); }} className="cursor-pointer hover:underline">
                    অধ্যায় ২ : মদিনার গোত্রসমূহ
                  </span>
                  <span className="opacity-60">পৃষ্ঠা ৩১</span>
                </div>
                <div className="pl-2 space-y-1">
                  <div
                    onClick={() => { setSelectedChapter(2); setShowChapter2AnsarChart(true); scrollToAnchor('ch2-chart'); }}
                    className="cursor-pointer hover:text-amber-400 flex justify-between text-amber-500 font-bold"
                  >
                    <span>• আনসার গোত্র উপশাখা চার্ট</span>
                    <span>পৃষ্ঠা ৩১</span>
                  </div>
                  {ARABER_GOTRO_DATABASE.filter(s => s.chapterNo === 2).map(s => (
                    <div
                      key={s.id}
                      onClick={() => {
                        setSelectedChapter(2);
                        setExpandedSections(prev => ({ ...prev, [s.id]: true }));
                        scrollToAnchor(s.id);
                      }}
                      className="cursor-pointer hover:text-emerald-400 flex justify-between opacity-85 py-0.5"
                    >
                      <span className="truncate">{s.sectionCode} {s.tribeNameBn}</span>
                      <span className="opacity-60 ml-2">পৃ. {s.sectionCode === '২.১' ? '৩২' : s.sectionCode === '২.২' ? '৩৬' : '৪০'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Col 3: Chapter 3 & Appendix */}
              <div className="space-y-2">
                <div className="font-black text-teal-600 dark:text-teal-400 flex items-center justify-between pb-1 border-b border-dashed border-slate-200 dark:border-slate-800">
                  <span onClick={() => { setSelectedChapter(3); scrollToAnchor('chapter-3'); }} className="cursor-pointer hover:underline">
                    অধ্যায় ৩ ও সংযুক্তি
                  </span>
                  <span className="opacity-60">পৃষ্ঠা ৪৪</span>
                </div>
                <div className="pl-2 space-y-1">
                  <div
                    onClick={() => { setSelectedChapter(3); setShowChapter3OverviewChart(true); scrollToAnchor('ch3-chart'); }}
                    className="cursor-pointer hover:text-amber-400 flex justify-between text-amber-500 font-bold"
                  >
                    <span>• এই অধ্যায়ের গোত্রসমূহ চার্ট</span>
                    <span>পৃষ্ঠা ৪৪</span>
                  </div>
                  <div
                    onClick={() => setActiveTab('analytics')}
                    className="cursor-pointer hover:text-amber-400 flex justify-between text-teal-500 font-bold"
                  >
                    <span>• মোট ব্যক্তিত্বের বার চার্ট</span>
                    <span>পৃষ্ঠা ৬৪</span>
                  </div>
                  <div
                    onClick={() => setActiveTab('appendix40')}
                    className="cursor-pointer hover:text-amber-400 flex justify-between text-emerald-500 font-bold"
                  >
                    <span>• সংযুক্তি : ৪০টি গোত্র তালিকা</span>
                    <span>পৃ. ৬৫–৮৩</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chapter Selector Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {ARABER_GOTRO_CHAPTERS.slice(0, 3).map((ch) => {
              const isActive = selectedChapter === ch.no;
              return (
                <button
                  key={ch.no}
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setSelectedChapter(ch.no);
                  }}
                  className={`text-left p-4 rounded-2xl transition-all cursor-pointer border flex flex-col justify-between gap-2 ${
                    isActive
                      ? isDay
                        ? 'bg-teal-700 text-white border-teal-600 shadow-md ring-2 ring-teal-500/20'
                        : 'bg-emerald-600 text-white border-emerald-500 shadow-lg ring-2 ring-emerald-400/30'
                      : isDay
                      ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm'
                      : 'bg-[#082226] hover:bg-[#0e333a] text-emerald-200 border-[#153e46]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-bold px-2 py-0.5 rounded-lg ${
                      isActive ? 'bg-white/20 text-white' : isDay ? 'bg-slate-100 text-teal-800' : 'bg-emerald-950/80 text-emerald-300'
                    }`}>
                      অধ্যায় ০{ch.no} · পৃষ্ঠা {ch.pageRange}
                    </span>
                    <BookOpen className="w-4 h-4 opacity-75" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black leading-snug">
                      {ch.titleBn.replace(/^অধ্যায় [০-৯]+ : /, '')}
                    </h3>
                    <p className={`text-xs mt-1 line-clamp-2 ${isActive ? 'text-white/80' : 'opacity-70'}`}>
                      {ch.subtitleBn}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* EMBEDDED CHART FOR CHAPTER 1: এক নজরে কুরাইশ শাখাগুলোর দায়িত্ব ও ভূমিকা (Page 4 of PDF) */}
          {selectedChapter === 1 && (
            <div id="ch1-chart" className={`rounded-2xl border overflow-hidden transition-all shadow-md ${
              isDay ? 'bg-white border-teal-200' : 'bg-[#072428] border-emerald-500/30'
            }`}>
              <div
                onClick={() => setShowChapter1ResponsibilitiesChart(!showChapter1ResponsibilitiesChart)}
                className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-400">
                        পিডিএফ পৃষ্ঠা ৪-এর চার্ট
                      </span>
                      <span className="text-xs opacity-60">১০টি প্রধান শাখা</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-black tracking-tight mt-0.5">
                      এক নজরে : কুরাইশ শাখাগুলোর দায়িত্ব ও ভূমিকা
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="hidden sm:inline">{showChapter1ResponsibilitiesChart ? 'লুকান' : 'চার্ট দেখুন'}</span>
                  {showChapter1ResponsibilitiesChart ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {showChapter1ResponsibilitiesChart && (
                <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 dark:border-[#153e46] space-y-3">
                  <p className="text-xs opacity-80 leading-relaxed">
                    মক্কার শাসন ও কাবা শরিফের তীর্থযাত্রীদের ব্যবস্থাপনার জন্য কুরাইশদের শীর্ষ ১০টি শাখার মধ্যে দায়িত্ব বণ্টন:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {MAKKAH_RESPONSIBILITIES.map((resp, rIdx) => (
                      <div
                        key={rIdx}
                        onClick={() => {
                          if (soundEnabled) soundHaptics.playTap();
                          const targetId = resp.clanBn.includes('হাশিম') ? 'banu-hashim' :
                            resp.clanBn.includes('উমাইয়া') ? 'banu-umayya' :
                            resp.clanBn.includes('মাখযুম') ? 'banu-makhzum' :
                            resp.clanBn.includes('আদি') ? 'banu-adi' :
                            resp.clanBn.includes('তাইম') ? 'banu-taym' :
                            resp.clanBn.includes('আসাদ') ? 'banu-asad-quraysh' :
                            resp.clanBn.includes('যোহরা') ? 'banu-zuhrah' : 'quraysh-other-branches';
                          setExpandedSections(prev => ({ ...prev, [targetId]: true }));
                          scrollToAnchor(targetId);
                        }}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition hover:border-amber-400 ${
                          isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#041417] border-[#153e46]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="p-2 rounded-lg bg-black/5 dark:bg-white/5 shrink-0">
                            {renderResponsibilityIcon(resp.iconName)}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-black text-xs sm:text-sm truncate">{resp.clanBn}</span>
                              <span className="text-[10px] opacity-60">({resp.sectionCode})</span>
                            </div>
                            <p className="text-[11px] text-amber-500 font-medium truncate">{resp.responsibilityBn}</p>
                          </div>
                        </div>

                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 whitespace-nowrap shrink-0">
                          অধ্যায়ে যান →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* EMBEDDED CHART FOR CHAPTER 2: এক নজরে মদিনার আনসার গোত্র ও তাদের উপশাখা (Page 31 of PDF) */}
          {selectedChapter === 2 && (
            <div id="ch2-chart" className={`rounded-2xl border overflow-hidden transition-all shadow-md ${
              isDay ? 'bg-white border-teal-200' : 'bg-[#072428] border-emerald-500/30'
            }`}>
              <div
                onClick={() => setShowChapter2AnsarChart(!showChapter2AnsarChart)}
                className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
                    <GitFork className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-teal-500/20 text-teal-400">
                        পিডিএফ পৃষ্ঠা ৩১-এর চার্ট
                      </span>
                      <span className="text-xs opacity-60">আজদ বংশোদ্ভূত</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-black tracking-tight mt-0.5">
                      এক নজরে : মদিনার আনসার গোত্র ও তাদের উপশাখা
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-teal-600 dark:text-teal-400">
                  <span className="hidden sm:inline">{showChapter2AnsarChart ? 'লুকান' : 'চার্ট দেখুন'}</span>
                  {showChapter2AnsarChart ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {showChapter2AnsarChart && (
                <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 dark:border-[#153e46] space-y-4">
                  {/* Root ancestor banner */}
                  <div className="flex justify-center">
                    <div className="px-5 py-2 rounded-xl bg-teal-600 text-white font-black text-xs sm:text-sm text-center shadow-md">
                      {ANSAR_GENEALOGY.ancestor}
                    </div>
                  </div>
                  <div className="w-0.5 h-3 bg-teal-500/50 mx-auto" />

                  {/* Two Main Branches: Aws & Khazraj */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {ANSAR_GENEALOGY.branches.map((branch, bIdx) => {
                      const isAws = branch.name.includes('আওস');
                      return (
                        <div
                          key={bIdx}
                          className={`p-4 rounded-xl border space-y-2.5 ${
                            isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#041417] border-[#153e46]'
                          }`}
                        >
                          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                            <h4 className="font-black text-sm sm:text-base text-emerald-500 flex items-center gap-1.5">
                              <span>🌿</span>
                              <span>{branch.name}</span>
                            </h4>
                            <button
                              onClick={() => {
                                if (soundEnabled) soundHaptics.playTap();
                                const targetId = isAws ? 'aws-tribe' : 'khazraj-tribe';
                                setExpandedSections(prev => ({ ...prev, [targetId]: true }));
                                scrollToAnchor(targetId);
                              }}
                              className="text-[11px] font-bold text-amber-400 hover:underline cursor-pointer"
                            >
                              পরিচ্ছেদ {isAws ? '২.২' : '২.১'} দেখুন →
                            </button>
                          </div>

                          <div className="space-y-1.5">
                            {branch.subClans.map((sub, sIdx) => (
                              <div
                                key={sIdx}
                                className={`p-2.5 rounded-lg border text-xs flex items-center justify-between gap-2 ${
                                  isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
                                }`}
                              >
                                <div>
                                  <span className="font-bold block">{sub.name}</span>
                                  <span className="text-[10px] opacity-75">{sub.note}</span>
                                </div>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 shrink-0">
                                  {sub.leader}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* EMBEDDED CHART FOR CHAPTER 3: এক নজরে এই অধ্যায়ের গোত্রসমূহ (Page 44 of PDF) */}
          {selectedChapter === 3 && (
            <div id="ch3-chart" className={`rounded-2xl border overflow-hidden transition-all shadow-md ${
              isDay ? 'bg-white border-teal-200' : 'bg-[#072428] border-emerald-500/30'
            }`}>
              <div
                onClick={() => setShowChapter3OverviewChart(!showChapter3OverviewChart)}
                className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-400">
                        পিডিএফ পৃষ্ঠা ৪৪-এর চার্ট
                      </span>
                      <span className="text-xs opacity-60">১১টি উল্লেখযোগ্য গোত্র</span>
                    </div>
                    <h3 className="text-sm sm:text-base font-black tracking-tight mt-0.5">
                      এক নজরে : এই অধ্যায়ের গোত্রসমূহ
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-orange-600 dark:text-orange-400">
                  <span className="hidden sm:inline">{showChapter3OverviewChart ? 'লুকান' : 'চার্ট দেখুন'}</span>
                  {showChapter3OverviewChart ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {showChapter3OverviewChart && (
                <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 dark:border-[#153e46] space-y-3">
                  <p className="text-xs opacity-80 leading-relaxed">
                    মক্কা ও মদিনার বাইরে সমগ্র আরব উপদ্বীপে বিস্তৃত পরাক্রমশালী ও কৌশলগত গোত্রসমূহ:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                    {CHAPTER3_OVERVIEW.map((item, cIdx) => (
                      <div
                        key={cIdx}
                        onClick={() => {
                          if (soundEnabled) soundHaptics.playTap();
                          const targetSec = ARABER_GOTRO_DATABASE.find(s => s.sectionCode === item.sectionCode);
                          if (targetSec) {
                            setExpandedSections(prev => ({ ...prev, [targetSec.id]: true }));
                            scrollToAnchor(targetSec.id);
                          }
                        }}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition hover:border-amber-400 ${
                          isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#041417] border-[#153e46]'
                        }`}
                      >
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-black text-xs sm:text-sm">{item.clanBn}</span>
                            <span className="text-[10px] opacity-60">({item.sectionCode})</span>
                          </div>
                          <p className="text-[11px] text-emerald-500 font-medium truncate flex items-center gap-1">
                            <MapPin className="w-3 h-3 shrink-0" />
                            <span>{item.locationBn}</span>
                          </p>
                          <p className="text-[10px] opacity-75 truncate">{item.noteBn}</p>
                        </div>

                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 whitespace-nowrap shrink-0">
                          পরিচ্ছেদ {item.sectionCode} →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Subsections List within Chapter (Readable book format) */}
          <div className="space-y-6">
            {filteredSections.length === 0 ? (
              <div className={`text-center py-16 rounded-2xl border ${
                isDay ? 'bg-white border-slate-200 text-slate-500' : 'bg-[#082226] border-[#153e46] text-emerald-400/70'
              }`}>
                <p className="text-base font-bold">কোনো গোত্র বা ব্যক্তিত্ব খুঁজে পাওয়া যায়নি</p>
                <p className="text-xs mt-1">অনুসন্ধান ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন</p>
              </div>
            ) : (
              filteredSections.map((sec) => {
                const isExpanded = expandedSections[sec.id] !== false; // open by default unless toggled
                const isBanuHashim = sec.id === 'banu-hashim';

                return (
                  <div
                    key={sec.id}
                    id={sec.id}
                    className={`rounded-3xl border transition-all overflow-hidden scroll-mt-24 shadow-sm ${
                      isDay
                        ? 'bg-white border-slate-200'
                        : 'bg-[#082226] border-[#153e46]'
                    }`}
                  >
                    {/* Header Bar */}
                    <div
                      onClick={() => toggleSection(sec.id)}
                      className={`p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                        isDay ? 'hover:bg-slate-50' : 'hover:bg-[#0c2f36]'
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-black text-sm border shadow-sm ${
                          isDay
                            ? 'bg-teal-50 text-teal-800 border-teal-200'
                            : 'bg-[#041417] text-emerald-300 border-emerald-500/30'
                        }`}>
                          {sec.sectionCode}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base sm:text-xl font-black tracking-tight">{sec.tribeNameBn}</h3>
                            {sec.tribeNameAr && (
                              <span className="text-xs font-serif text-amber-500 font-bold">
                                ({sec.tribeNameAr})
                              </span>
                            )}
                            <span className="text-xs opacity-60">·</span>
                            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                              {sec.locationOrContextBn}
                            </span>
                          </div>
                          <p className={`text-xs ${isDay ? 'text-slate-600' : 'text-emerald-200/80'}`}>
                            <span className="font-semibold text-amber-500">দায়িত্ব ও ভূমিকা:</span> {sec.responsibilityOrRoleBn}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                        <span className="text-xs opacity-75 font-bold">
                          ব্যক্তিত্ব: {sec.personalities.length} জন
                        </span>
                        <div className={`p-1.5 rounded-lg border transition ${
                          isExpanded
                            ? isDay ? 'bg-teal-600 text-white border-teal-600' : 'bg-emerald-600 text-white border-emerald-500'
                            : isDay ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-[#041417] text-emerald-300 border-[#153e46]'
                        }`}>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    {isExpanded && (
                      <div className={`p-5 sm:p-6 border-t space-y-6 ${
                        isDay ? 'border-slate-100 bg-slate-50/40' : 'border-[#153e46] bg-[#05181b]/40'
                      }`}>
                        {/* 1. Introduction Card */}
                        <div className={`p-5 rounded-2xl border leading-relaxed space-y-2.5 ${
                          isDay ? 'bg-white border-slate-200 text-slate-700 shadow-sm' : 'bg-[#082226] border-[#153e46] text-emerald-100'
                        }`}>
                          <div className="flex items-center justify-between text-xs font-bold text-amber-500">
                            <span className="flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5" />
                              <span>গোত্র পরিচিতি ও ঐতিহাসিক প্রেক্ষাপট</span>
                            </span>
                            <button
                              onClick={(e) => handleCopy(sec.introductionBn, `intro-${sec.id}`, e)}
                              className="opacity-70 hover:opacity-100 flex items-center gap-1 cursor-pointer"
                            >
                              {copiedId === `intro-${sec.id}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedId === `intro-${sec.id}` ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                            </button>
                          </div>
                          <p className={fontSizeLevel === 'large' ? 'text-base sm:text-lg leading-relaxed' : 'text-sm sm:text-base leading-relaxed'}>
                            {sec.introductionBn}
                          </p>
                        </div>

                        {/* EMBEDDED CHART IN BANU HASHIM: চিত্র : বনু হাশিমের সংক্ষিপ্ত বংশধারা (Page 5 of PDF) */}
                        {isBanuHashim && (
                          <div className={`p-5 sm:p-6 rounded-2xl border shadow-inner space-y-5 ${
                            isDay ? 'bg-amber-50/60 border-amber-300' : 'bg-[#051e22] border-amber-500/40'
                          }`}>
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-500">
                                  পিডিএফ পৃষ্ঠা ৫-এর চার্ট
                                </span>
                                <h4 className="text-sm sm:text-base font-black tracking-tight mt-1">
                                  চিত্র : বনু হাশিমের সংক্ষিপ্ত বংশধারা (১.১ ও ২.১ পরিচ্ছেদে উল্লেখিত সম্পর্ক অনুযায়ী)
                                </h4>
                              </div>
                            </div>

                            {/* Visual Tree */}
                            <div className="space-y-3 pt-2">
                              {/* Level 0: Hashim */}
                              <div className="flex justify-center">
                                <div className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-sm text-center shadow-md">
                                  {BANU_HASHIM_GENEALOGY.rootName}
                                </div>
                              </div>
                              <div className="w-0.5 h-3 bg-amber-500/50 mx-auto" />

                              {/* Level 1: Abdul Muttalib */}
                              <div className="flex justify-center">
                                <div className={`px-6 py-3 rounded-xl border text-center shadow ${
                                  isDay ? 'bg-white border-amber-300 text-teal-900' : 'bg-[#041417] border-amber-500/50 text-emerald-100'
                                }`}>
                                  <div className="font-black text-sm sm:text-base">{BANU_HASHIM_GENEALOGY.son.name}</div>
                                  <div className="text-[11px] opacity-75">{BANU_HASHIM_GENEALOGY.son.title}</div>
                                </div>
                              </div>
                              <div className="w-0.5 h-3 bg-amber-500/50 mx-auto" />

                              {/* Level 2: Sons of Abdul Muttalib */}
                              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
                                {BANU_HASHIM_GENEALOGY.son.sons.map((son, sIdx) => (
                                  <div
                                    key={sIdx}
                                    className={`p-3 rounded-xl border text-center space-y-1 ${
                                      son.name === 'আব্দুল্লাহ'
                                        ? 'border-amber-500 bg-amber-500/10 shadow-sm'
                                        : son.name === 'আবু লাহাব'
                                        ? 'border-rose-500/40 bg-rose-500/5'
                                        : isDay ? 'border-slate-200 bg-white' : 'border-[#153e46] bg-[#041417]'
                                    }`}
                                  >
                                    <div className="font-bold text-xs sm:text-sm">{son.name}</div>
                                    <div className="text-[10px] opacity-75 leading-tight">{son.desc}</div>

                                    {/* Children */}
                                    {son.children && son.children.length > 0 && (
                                      <div className="pt-2 border-t border-dashed border-slate-300 dark:border-slate-700 space-y-1">
                                        {son.children.map((child: any, cIdx: number) => (
                                          <div
                                            key={cIdx}
                                            className={`p-1.5 rounded-lg text-[10px] font-bold ${
                                              child.isProphet
                                                ? 'bg-emerald-600 text-white shadow-sm'
                                                : 'bg-black/5 dark:bg-white/5 text-amber-500'
                                            }`}
                                          >
                                            {child.name}
                                            {child.marriageTo && (
                                              <div className="text-[9px] opacity-80 font-normal mt-0.5 text-pink-300">
                                                বিবাহ: {child.marriageTo}
                                              </div>
                                            )}
                                            {child.sons && (
                                              <div className="text-[9px] opacity-90 font-bold mt-0.5 text-amber-300">
                                                ↓ {child.sons.join(' ও ')}
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 2. Sub-Clans if available */}
                        {sec.subClans && sec.subClans.length > 0 && (
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                              <Building className="w-4 h-4" />
                              <span>প্রধান উপশাখাসমূহ ({sec.subClans.length} টি)</span>
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {sec.subClans.map((sc, scIdx) => (
                                <div
                                  key={scIdx}
                                  className={`p-3.5 rounded-xl border space-y-1.5 ${
                                    isDay ? 'bg-white border-slate-200' : 'bg-[#09252a] border-[#153e46]'
                                  }`}
                                >
                                  <h5 className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                    {sc.nameBn}
                                  </h5>
                                  <p className="text-xs leading-relaxed opacity-90">{sc.descriptionBn}</p>
                                  {sc.notableFigures && (
                                    <div className="text-[11px] opacity-75 pt-1 border-t border-dashed border-slate-200 dark:border-slate-800">
                                      <strong>ব্যক্তিত্ব:</strong> {sc.notableFigures.join(', ')}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 3. Personalities Grid (Who is in this gotro) */}
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                              <Users className="w-4 h-4" />
                              <span>উল্লেখযোগ্য ব্যক্তিত্ব (পূর্ণাঙ্গ তালিকা - {sec.personalities.length} জন)</span>
                            </h4>
                            <span className="text-xs opacity-60">ক্লিক করে বিস্তারিত দেখুন</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {sec.personalities.map((pers) => {
                              const isBookmarked = bookmarks[pers.id];
                              const isNegative = pers.category === 'negative';
                              const isProphet = pers.id === 'prophet-muhammad';

                              return (
                                <div
                                  key={pers.id}
                                  onClick={() => {
                                    if (soundEnabled) soundHaptics.playTap();
                                    setActivePersonalityModal(pers);
                                  }}
                                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-3 relative group ${
                                    isProphet
                                      ? isDay ? 'bg-amber-50/60 border-amber-300 shadow-sm' : 'bg-amber-950/20 border-amber-500/40'
                                      : isNegative
                                      ? isDay ? 'bg-rose-50/40 border-rose-200' : 'bg-rose-950/20 border-rose-500/30'
                                      : isDay
                                      ? 'bg-white border-slate-200 hover:border-teal-500 shadow-sm hover:shadow'
                                      : 'bg-[#082226] border-[#153e46] hover:border-emerald-500'
                                  }`}
                                >
                                  <div className="space-y-2">
                                    <div className="flex items-start justify-between gap-2">
                                      <div>
                                        <h5 className={`font-black tracking-tight ${
                                          isProphet ? 'text-amber-500 text-base sm:text-lg' : 'text-sm sm:text-base group-hover:text-amber-400 transition'
                                        }`}>
                                          {pers.nameBn}
                                        </h5>
                                        {pers.nameAr && (
                                          <span className="text-xs font-serif text-amber-500/80 block mt-0.5">
                                            {pers.nameAr}
                                          </span>
                                        )}
                                      </div>

                                      <div className="flex items-center gap-1 shrink-0">
                                        <button
                                          onClick={(e) => toggleBookmark(pers.id, e)}
                                          title={isBookmarked ? 'বুকমার্ক সরানো' : 'বুকমার্ক যুক্ত করুন'}
                                          className={`p-1.5 rounded-lg border transition ${
                                            isBookmarked
                                              ? 'bg-amber-500 text-white border-amber-400'
                                              : isDay ? 'bg-slate-100 text-slate-400 hover:text-slate-700 border-slate-200' : 'bg-[#041417] text-emerald-400/60 hover:text-emerald-300 border-[#153e46]'
                                          }`}
                                        >
                                          <Bookmark className="w-3.5 h-3.5 fill-current" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* Role Tag */}
                                    <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 flex-wrap">
                                      <span className={isNegative ? 'text-rose-500 font-bold' : 'text-amber-500 font-bold'}>
                                        {pers.roleBn}
                                      </span>
                                    </div>

                                    {/* Bio */}
                                    <p className={`text-xs leading-relaxed line-clamp-3 ${
                                      isDay ? 'text-slate-600' : 'text-emerald-200/80'
                                    } ${fontSizeLevel === 'large' ? 'text-sm' : 'text-xs'}`}>
                                      {pers.bioBn}
                                    </p>
                                  </div>

                                  <div className="pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] opacity-75">
                                    <span className="truncate max-w-[200px]">📚 {pers.referenceBn}</span>
                                    <span className="font-bold text-amber-500 flex items-center gap-0.5 group-hover:translate-x-1 transition">
                                      <span>বিস্তারিত জীবনী</span>
                                      <Info className="w-3 h-3" />
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* 4. Footnotes & References */}
                        {sec.referencesBn && sec.referencesBn.length > 0 && (
                          <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                            isDay ? 'bg-slate-100/70 border-slate-200 text-slate-600' : 'bg-[#041417] border-[#153e46] text-emerald-300/80'
                          }`}>
                            <div className="font-bold text-amber-500 flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5" />
                              <span>প্রামাণ্য রেফারেন্স ও গ্রন্থসূত্র</span>
                            </div>
                            <ol className="list-decimal pl-5 space-y-1">
                              {sec.referencesBn.map((ref, rIdx) => (
                                <li key={rIdx}>{ref}</li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* 5. Tab: Dedicated Master "কোন গোত্রে কে কে (ম্যাপিং চার্ট)" */}
      {activeTab === 'who_is_who' && (
        <div className="space-y-6">
          <div className={`p-5 sm:p-6 rounded-2xl border leading-relaxed space-y-3 ${
            isDay ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#082226] border-[#153e46]'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-black text-amber-500 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>কোন গোত্রে কে কে : গোত্র ও ব্যক্তিত্বের পূর্ণাঙ্গ ম্যাপিং চার্ট</span>
                </h3>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed mt-1">
                  আরবের প্রতিটি প্রধান গোত্র অনুযায়ী কে কোন গোত্রের সন্তান, ইসলাম গ্রহণকারী সাহাবায়ে কেরাম (রা.), ঐতিহাসিক গোত্রপতি ও প্রতিপক্ষদের সুবিন্যস্ত চিত্র।
                </p>
              </div>

              {/* Category Filter Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'all', label: 'সকল গোত্র' },
                  { id: 'quraysh', label: 'কুরাইশ (মক্কা)' },
                  { id: 'ansar', label: 'আনসার (মদিনা)' },
                  { id: 'other_arab', label: 'বৃহত্তর আরব' },
                  { id: 'jewish', label: 'মদিনার ইহুদি' }
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      if (soundEnabled) soundHaptics.playTap();
                      setWhoIsWhoCategory(cat.id as any);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                      whoIsWhoCategory === cat.id
                        ? isDay ? 'bg-teal-700 text-white border-teal-600' : 'bg-emerald-600 text-white border-emerald-500'
                        : isDay ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-[#041417] text-emerald-300 border-[#153e46]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Visual Clan Cards Listing "Who is in which clan" */}
          <div className="space-y-4">
            {filteredWhoIsWho.map((clan) => (
              <div
                key={clan.id}
                className={`rounded-2xl border overflow-hidden transition-all shadow-sm ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
                }`}
              >
                {/* Clan Header */}
                <div className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b ${
                  isDay ? 'bg-slate-50 border-slate-100' : 'bg-[#041417]/70 border-[#153e46]'
                }`}>
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-xl bg-amber-500/15 text-amber-400 font-black text-xs border border-amber-500/25">
                      পরিচ্ছেদ {clan.sectionCode}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base sm:text-lg font-black tracking-tight">{clan.tribeNameBn}</h4>
                        {clan.tribeNameAr && (
                          <span className="text-xs font-serif text-amber-500 font-bold">({clan.tribeNameAr})</span>
                        )}
                      </div>
                      <p className="text-xs opacity-75 mt-0.5">{clan.locationBn}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400">
                      মোট ব্যক্তিত্ব: {clan.totalCount} জন
                    </span>
                    <button
                      onClick={() => {
                        if (soundEnabled) soundHaptics.playTap();
                        setSelectedChapter(clan.chapterNo);
                        setExpandedSections(prev => ({ ...prev, [clan.id]: true }));
                        scrollToAnchor(clan.id);
                      }}
                      className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>অধ্যায়ে পড়ুন</span>
                      <BookOpen className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Responsibility or Role */}
                  <div className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
                    isDay ? 'bg-teal-50/50 border-teal-200 text-teal-900' : 'bg-[#04191d] border-emerald-500/20 text-emerald-200'
                  }`}>
                    <Building className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <strong className="text-amber-500">দায়িত্ব ও ভূমিকা:</strong> {clan.responsibilityBn}
                    </div>
                  </div>

                  {/* Sub-clans if any */}
                  {clan.subClans.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-teal-500 block">
                        শাখা ও উপশাখা ({clan.subClans.length} টি):
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {clan.subClans.map((sc, scIdx) => (
                          <div
                            key={scIdx}
                            className={`px-3 py-1.5 rounded-xl text-xs border ${
                              isDay ? 'bg-slate-100 border-slate-200' : 'bg-[#041417] border-[#153e46]'
                            }`}
                          >
                            <span className="font-bold text-emerald-500">{sc.nameBn}</span>
                            {sc.notableFigures && (
                              <span className="text-[10px] opacity-75 ml-1">
                                ({sc.notableFigures.slice(0, 2).join(', ')})
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Classified Personalities Matrix */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    {/* Sahaba Category */}
                    {clan.sahaba.length > 0 && (
                      <div className={`p-4 rounded-xl border space-y-2 ${
                        isDay ? 'bg-emerald-50/40 border-emerald-200' : 'bg-emerald-950/20 border-emerald-500/30'
                      }`}>
                        <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                          <span className="flex items-center gap-1.5">
                            <span>🌿</span>
                            <span>সাহাবায়ে কেরাম (রা.) ({clan.sahaba.length} জন)</span>
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          {clan.sahaba.map((s) => (
                            <div
                              key={s.id}
                              onClick={() => {
                                if (soundEnabled) soundHaptics.playTap();
                                setActivePersonalityModal(s);
                              }}
                              className={`p-2 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition hover:border-emerald-400 ${
                                isDay ? 'bg-white border-slate-200' : 'bg-[#041417] border-[#153e46]'
                              }`}
                            >
                              <div>
                                <span className="font-bold">{s.nameBn}</span>
                                <span className="text-[10px] opacity-75 block text-amber-500">{s.roleBn}</span>
                              </div>
                              <Info className="w-3.5 h-3.5 opacity-60 hover:opacity-100 text-amber-400 shrink-0" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Historical & Hanif Category */}
                    {clan.historical.length > 0 && (
                      <div className={`p-4 rounded-xl border space-y-2 ${
                        isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#041417] border-[#153e46]'
                      }`}>
                        <div className="flex items-center justify-between text-xs font-bold text-amber-500">
                          <span className="flex items-center gap-1.5">
                            <span>📜</span>
                            <span>ঐতিহাসিক ও বিশিষ্ট ব্যক্তিত্ব ({clan.historical.length} জন)</span>
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          {clan.historical.map((h) => (
                            <div
                              key={h.id}
                              onClick={() => {
                                if (soundEnabled) soundHaptics.playTap();
                                setActivePersonalityModal(h);
                              }}
                              className={`p-2 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition hover:border-amber-400 ${
                                isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
                              }`}
                            >
                              <div>
                                <span className="font-bold">{h.nameBn}</span>
                                <span className="text-[10px] opacity-75 block text-teal-500">{h.roleBn}</span>
                              </div>
                              <Info className="w-3.5 h-3.5 opacity-60 hover:opacity-100 text-amber-400 shrink-0" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Negative / Opponent Category */}
                    {clan.negative.length > 0 && (
                      <div className={`p-4 rounded-xl border space-y-2 md:col-span-2 ${
                        isDay ? 'bg-rose-50/40 border-rose-200' : 'bg-rose-950/20 border-rose-500/30'
                      }`}>
                        <div className="flex items-center justify-between text-xs font-bold text-rose-500">
                          <span className="flex items-center gap-1.5">
                            <span>⚔️</span>
                            <span>প্রতিপক্ষ ও চরম বিরুদ্ধাচরণকারী চরিত্র ({clan.negative.length} জন)</span>
                          </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {clan.negative.map((n) => (
                            <div
                              key={n.id}
                              onClick={() => {
                                if (soundEnabled) soundHaptics.playTap();
                                setActivePersonalityModal(n);
                              }}
                              className={`p-2 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition hover:border-rose-400 ${
                                isDay ? 'bg-white border-rose-100' : 'bg-[#041417] border-[#153e46]'
                              }`}
                            >
                              <div>
                                <span className="font-bold text-rose-400">{n.nameBn}</span>
                                <span className="text-[10px] opacity-75 block text-slate-400">{n.roleBn}</span>
                              </div>
                              <Info className="w-3.5 h-3.5 opacity-60 hover:opacity-100 text-rose-400 shrink-0" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Tab: Makkah Responsibilities (কুরাইশ শাখাগুলোর দায়িত্ব ও ভূমিকা - পৃষ্ঠা ৪) */}
      {activeTab === 'responsibilities' && (
        <div className="space-y-6">
          <div className={`p-5 rounded-2xl border leading-relaxed space-y-1.5 ${
            isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
          }`}>
            <h3 className="text-base font-black text-amber-500 flex items-center gap-2">
              <Building className="w-5 h-5" />
              <span>এক নজরে : কুরাইশ শাখাগুলোর দায়িত্ব ও ভূমিকা (পৃষ্ঠা ৪)</span>
            </h3>
            <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
              প্রাক-ইসলামী যুগে পবিত্র কাবা শরিফ ও মক্কার প্রশাসন সুশৃঙ্খলভাবে পরিচালনার জন্য কুরাইশদের শীর্ষ ১০টি শাখার মধ্যে বিভিন্ন সেবামূলক ও সামরিক দায়িত্ব বণ্টন করা হয়েছিল।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {MAKKAH_RESPONSIBILITIES.map((resp, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (soundEnabled) soundHaptics.playTap();
                  setSelectedResponsibility(resp);
                }}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  isDay
                    ? 'bg-white border-slate-200 hover:border-teal-500 shadow-sm hover:shadow'
                    : 'bg-[#082226] border-[#153e46] hover:border-emerald-500'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${
                      isDay ? 'bg-teal-50 border-teal-200' : 'bg-[#041417] border-emerald-500/30'
                    }`}>
                      {renderResponsibilityIcon(resp.iconName)}
                    </div>
                    <div>
                      <h4 className="text-base font-black">{resp.clanBn}</h4>
                      <span className="text-xs opacity-60">পরিচ্ছেদ {resp.sectionCode}</span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
                    isDay ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-[#041417] text-emerald-300 border-[#153e46]'
                  }`}>
                    দায়িত্ব নং {idx + 1}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-bold text-amber-500">
                    {resp.responsibilityBn}
                  </div>
                  <p className="text-xs opacity-85 leading-relaxed">
                    {resp.detailsBn}
                  </p>
                </div>

                <div className="pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>গোত্রের বিস্তারিত অধ্যায়ে যান</span>
                  <BookOpen className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. Tab: Interactive Genealogy Trees (বংশধারা চিত্র - পৃষ্ঠা ৫ ও ৩১) */}
      {activeTab === 'genealogy' && (
        <div className="space-y-6">
          {/* Tree 1: Banu Hashim Lineage */}
          <div className={`p-6 rounded-3xl border shadow-sm space-y-6 ${
            isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
          }`}>
            <div className="space-y-1">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">চিত্র ১ (পৃষ্ঠা ৫)</span>
              <h3 className="text-xl font-black">বনু হাশিমের সংক্ষিপ্ত বংশধারা</h3>
              <p className="text-xs opacity-80">
                হাশিম ইবনে আবদে মানাফ থেকে আবদুল মুত্তালিব, রাসূলুল্লাহ ﷺ, খুলাফায়ে রাশিদিন ও আহলে বাইত
              </p>
            </div>

            {/* Visual Node Tree */}
            <div className="space-y-4">
              {/* Level 0: Hashim */}
              <div className="flex justify-center">
                <div className="px-5 py-2.5 rounded-2xl bg-amber-500 text-slate-950 font-black text-sm text-center shadow-md">
                  {BANU_HASHIM_GENEALOGY.rootName}
                </div>
              </div>
              <div className="w-0.5 h-4 bg-amber-500/50 mx-auto" />

              {/* Level 1: Abdul Muttalib */}
              <div className="flex justify-center">
                <div className={`px-6 py-3 rounded-2xl border text-center shadow ${
                  isDay ? 'bg-teal-50 border-teal-300 text-teal-900' : 'bg-[#041417] border-emerald-500/50 text-emerald-100'
                }`}>
                  <div className="font-black text-base">{BANU_HASHIM_GENEALOGY.son.name}</div>
                  <div className="text-[11px] opacity-75">{BANU_HASHIM_GENEALOGY.son.title}</div>
                </div>
              </div>
              <div className="w-0.5 h-4 bg-emerald-500/50 mx-auto" />

              {/* Level 2: Sons of Abdul Muttalib */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2">
                {BANU_HASHIM_GENEALOGY.son.sons.map((son, sIdx) => (
                  <div
                    key={sIdx}
                    className={`p-3 rounded-xl border text-center space-y-1.5 ${
                      son.name === 'আব্দুল্লাহ'
                        ? 'border-amber-500 bg-amber-500/10 shadow'
                        : son.name === 'আবু লাহাব'
                        ? 'border-rose-500/40 bg-rose-500/5'
                        : isDay ? 'border-slate-200 bg-slate-50' : 'border-[#153e46] bg-[#041417]'
                    }`}
                  >
                    <div className="font-bold text-xs">{son.name}</div>
                    <div className="text-[10px] opacity-75">{son.desc}</div>

                    {/* Descendants if any */}
                    {son.children && son.children.length > 0 && (
                      <div className="pt-2 border-t border-dashed border-slate-300 dark:border-slate-700 space-y-1">
                        {son.children.map((child: any, cIdx: number) => (
                          <div
                            key={cIdx}
                            className={`p-1.5 rounded-lg text-[10px] font-bold ${
                              child.isProphet
                                ? 'bg-emerald-600 text-white shadow-sm'
                                : 'bg-black/5 dark:bg-white/5 text-amber-500'
                            }`}
                          >
                            {child.name}
                            {child.marriageTo && (
                              <div className="text-[9px] opacity-80 font-normal mt-0.5 text-pink-300">
                                বিবাহ: {child.marriageTo}
                              </div>
                            )}
                            {child.sons && (
                              <div className="text-[9px] opacity-80 font-normal mt-0.5">
                                ↓ {child.sons.join(' ও ')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tree 2: Ansar Lineage (Azd -> Aws & Khazraj) */}
          <div className={`p-6 rounded-3xl border shadow-sm space-y-6 ${
            isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
          }`}>
            <div className="space-y-1">
              <span className="text-xs font-bold text-teal-500 uppercase tracking-wider">চিত্র ২ (পৃষ্ঠা ৩১)</span>
              <h3 className="text-xl font-black">মদিনার আনসার গোত্র ও তাদের উপশাখা</h3>
              <p className="text-xs opacity-80">
                ইয়েমেনের প্রাচীন ‘আজদ’ বংশ থেকে আওস ও খাযরাজ গোত্রের শাখা বিন্যাস
              </p>
            </div>

            <div className="flex justify-center">
              <div className="px-5 py-2.5 rounded-2xl bg-teal-600 text-white font-black text-sm text-center shadow-md">
                {ANSAR_GENEALOGY.ancestor}
              </div>
            </div>
            <div className="w-0.5 h-4 bg-teal-500/50 mx-auto" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ANSAR_GENEALOGY.branches.map((branch, bIdx) => (
                <div
                  key={bIdx}
                  className={`p-5 rounded-2xl border space-y-3 ${
                    isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#041417] border-[#153e46]'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                    <h4 className="text-base font-black text-emerald-600 dark:text-emerald-400">
                      {branch.name}
                    </h4>
                    <span className="text-xs opacity-75">{branch.subClans.length}টি প্রধান উপশাখা</span>
                  </div>

                  <div className="space-y-2">
                    {branch.subClans.map((sub, sIdx) => (
                      <div
                        key={sIdx}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-2 ${
                          isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
                        }`}
                      >
                        <div>
                          <div className="text-xs font-bold">{sub.name}</div>
                          <div className="text-[11px] opacity-75">{sub.note}</div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-500">
                          {sub.leader}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. Tab: Analytics & Chart (পরিসংখ্যান ও চার্ট - পৃষ্ঠা ৬৪) */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className={`p-5 rounded-2xl border leading-relaxed space-y-1.5 ${
            isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
          }`}>
            <h3 className="text-base font-black text-amber-500 flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              <span>তালিকায় উল্লিখিত মোট ব্যক্তিত্বের সংখ্যা ও গ্রাফ (পৃষ্ঠা ৬৪)</span>
            </h3>
            <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
              বইয়ের ১ থেকে ১৩ নম্বর তালিকা অনুযায়ী প্রতিটি প্রধান গোত্রে উল্লেখিত মোট ব্যক্তিত্বের সংখ্যাভিত্তিক তুলনামূলক বিন্যাস।
            </p>
          </div>

          <div className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
            isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
          }`}>
            {TRIBE_STATISTICS.map((stat, idx) => {
              const maxCount = 25;
              const percentage = Math.round((stat.count / maxCount) * 100);

              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                    <span className="truncate pr-2">{stat.nameBn}</span>
                    <span className="tabular-nums text-emerald-600 dark:text-emerald-400 font-black">
                      {stat.count} জন
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-black/5 dark:bg-black/30 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 9. Tab: All 40 Tribes Directory (সংযুক্তি ১ থেকে ৪০টি গোত্র - পৃষ্ঠা ৬৫–৮৩) */}
      {activeTab === 'appendix40' && (
        <div className="space-y-6">
          <div className={`p-5 rounded-2xl border leading-relaxed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
          }`}>
            <div>
              <h3 className="text-base font-black text-amber-500 flex items-center gap-2">
                <Scroll className="w-5 h-5" />
                <span>সংযুক্তি : গোত্রভিত্তিক ঐতিহাসিক ব্যক্তিত্বের বিস্তৃত তালিকা (১–৪০)</span>
              </h3>
              <p className="text-xs sm:text-sm opacity-80 leading-relaxed mt-1">
                বইয়ের পৃষ্ঠা ৬৫ থেকে ৮৩ পর্যন্ত আলোচিত আরবের পূর্ণাঙ্গ ৪০টি ঐতিহাসিক গোত্রের এনসাইক্লোপিডিয়া।
              </p>
            </div>

            {/* Quick Filter */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {['all', 'কুরাইশ', 'আনসার', 'ইয়েমেন', 'বেদুইন', 'খ্রিস্টান'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setAppendixFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    appendixFilter === cat
                      ? isDay ? 'bg-teal-700 text-white border-teal-600' : 'bg-emerald-600 text-white border-emerald-500'
                      : isDay ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-[#041417] text-emerald-300 border-[#153e46]'
                  }`}
                >
                  {cat === 'all' ? 'সকল গোত্র' : cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAppendixTribes.map((tribe) => (
              <div
                key={tribe.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                  isDay ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#082226] border-[#153e46]'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-black border ${
                        isDay ? 'bg-teal-50 border-teal-200 text-teal-800' : 'bg-[#041417] border-emerald-500/30 text-emerald-300'
                      }`}>
                        {tribe.index}
                      </div>
                      <div>
                        <h4 className="text-base font-black">{tribe.nameBn}</h4>
                        <div className="flex items-center gap-2 text-xs opacity-75">
                          <span>{tribe.categoryBn}</span>
                          <span>·</span>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-amber-500" />
                            <span>{tribe.regionBn}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed opacity-90">
                    {tribe.historicalSignificanceBn}
                  </p>

                  {/* Sahaba List */}
                  {tribe.sahabaListBn.length > 0 && (
                    <div className="space-y-1 pt-2 border-t border-dashed border-slate-200 dark:border-slate-800">
                      <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block">
                        সাহাবি ও বিশিষ্ট ব্যক্তিবর্গ ({tribe.sahabaListBn.length} জন):
                      </span>
                      <p className="text-xs leading-relaxed font-medium">
                        {tribe.sahabaListBn.join(' • ')}
                      </p>
                    </div>
                  )}

                  {/* Negative Figures */}
                  {tribe.negativeFiguresBn && tribe.negativeFiguresBn.length > 0 && (
                    <div className="space-y-1 text-rose-500 pt-1">
                      <span className="text-[11px] font-bold block">নেতিবাচক চরিত্র:</span>
                      <p className="text-xs leading-relaxed">
                        {tribe.negativeFiguresBn.join(' • ')}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-teal-900/30 flex items-center justify-between text-[11px] opacity-75">
                  <span className="truncate max-w-[280px]">📚 {tribe.referenceBn}</span>
                  <button
                    onClick={(e) => handleCopy(`${tribe.nameBn}\n${tribe.historicalSignificanceBn}\nসূত্র: ${tribe.referenceBn}`, `app-${tribe.id}`, e)}
                    className="hover:text-amber-500 transition cursor-pointer flex items-center gap-1"
                  >
                    {copiedId === `app-${tribe.id}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>কপি</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 10. Tab: Bookmarks */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-4">
          <div className={`p-5 rounded-2xl border leading-relaxed ${
            isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
          }`}>
            <h3 className="text-base font-black text-amber-500 flex items-center gap-2">
              <Bookmark className="w-5 h-5 fill-current" />
              <span>আপনার বুকমার্ককৃত ব্যক্তিত্বগণ ({bookmarkedPersonalities.length} জন)</span>
            </h3>
            <p className="text-xs opacity-80 mt-1">
              যেকোনো সাহাবি বা ঐতিহাসিক চরিত্রের কার্ডে বুকমার্ক আইকনে ক্লিক করে এখানে সহজে সংরক্ষণ করুন।
            </p>
          </div>

          {bookmarkedPersonalities.length === 0 ? (
            <div className={`text-center py-16 rounded-2xl border ${
              isDay ? 'bg-white border-slate-200 text-slate-500' : 'bg-[#082226] border-[#153e46] text-emerald-400/70'
            }`}>
              <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-base font-bold">এখনো কোনো ব্যক্তিত্ব বুকমার্ক করা হয়নি</p>
              <p className="text-xs mt-1">অধ্যায়ভিত্তিক পাঠ থেকে আপনার পছন্দের সাহাবিদের বুকমার্ক করুন</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bookmarkedPersonalities.map(({ personality: pers, clanName }) => (
                <div
                  key={pers.id}
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setActivePersonalityModal(pers);
                  }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2.5 ${
                    isDay ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#082226] border-[#153e46]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm">{pers.nameBn}</h4>
                      <span className="text-xs text-amber-500">{clanName}</span>
                    </div>
                    <button
                      onClick={(e) => toggleBookmark(pers.id, e)}
                      className="p-1.5 rounded-lg bg-amber-500 text-white cursor-pointer"
                    >
                      <Bookmark className="w-3.5 h-3.5 fill-current" />
                    </button>
                  </div>
                  <p className="text-xs opacity-90 line-clamp-2">{pers.bioBn}</p>
                  <div className="text-[11px] opacity-75 pt-2 border-t border-dashed border-slate-200 dark:border-slate-800">
                    📚 {pers.referenceBn}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 11. Personality Detail Modal */}
      {activePersonalityModal && (
        <div
          onClick={() => setActivePersonalityModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-lg rounded-3xl p-6 sm:p-7 border shadow-2xl relative space-y-4 ${
              isDay ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#082226] border-[#153e46] text-emerald-100'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  activePersonalityModal.category === 'negative'
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {activePersonalityModal.roleBn}
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-2">
                  {activePersonalityModal.nameBn}
                </h3>
                {activePersonalityModal.nameAr && (
                  <p className="text-sm font-serif text-amber-500 font-bold">
                    {activePersonalityModal.nameAr}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => toggleBookmark(activePersonalityModal.id, e)}
                  className={`p-2 rounded-xl border transition ${
                    bookmarks[activePersonalityModal.id]
                      ? 'bg-amber-500 text-white border-amber-400'
                      : isDay ? 'bg-slate-100 text-slate-600 border-slate-200' : 'bg-[#041417] text-emerald-300 border-[#153e46]'
                  }`}
                >
                  <Bookmark className="w-4 h-4 fill-current" />
                </button>
                <button
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setActivePersonalityModal(null);
                  }}
                  className={`p-2 rounded-xl border text-xs font-bold transition cursor-pointer ${
                    isDay ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200' : 'bg-[#041417] hover:bg-[#0d333a] text-emerald-300 border-[#153e46]'
                  }`}
                >
                  ✕
                </button>
              </div>
            </div>

            <div className={`p-4 rounded-2xl border text-sm leading-relaxed ${
              isDay ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#041417] border-[#153e46] text-emerald-100'
            }`}>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 mb-2">
                ঐতিহাসিক অবদান ও জীবনী
              </h4>
              <p className="leading-relaxed text-sm sm:text-base">
                {activePersonalityModal.bioBn}
              </p>
            </div>

            <div className={`p-3.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
              isDay ? 'bg-teal-50 border-teal-200 text-teal-800' : 'bg-emerald-950/50 border-emerald-500/30 text-emerald-300'
            }`}>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>রেফারেন্স সূত্র:</strong> {activePersonalityModal.referenceBn}</span>
              </div>
              <button
                onClick={(e) => handleCopy(`${activePersonalityModal.nameBn}\n${activePersonalityModal.bioBn}\nসূত্র: ${activePersonalityModal.referenceBn}`, 'modal-copy', e)}
                className="hover:underline flex items-center gap-1 font-bold shrink-0 cursor-pointer"
              >
                {copiedId === 'modal-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'modal-copy' ? 'কপি হয়েছে' : 'কপি করুন'}</span>
              </button>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  if (soundEnabled) soundHaptics.playTap();
                  setActivePersonalityModal(null);
                }}
                className="px-6 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition cursor-pointer shadow-md"
              >
                পড়া সম্পন্ন হয়েছে
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 12. Responsibility Detail Modal */}
      {selectedResponsibility && (
        <div
          onClick={() => setSelectedResponsibility(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl relative space-y-4 ${
              isDay ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#082226] border-[#153e46] text-emerald-100'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                  isDay ? 'bg-teal-50 border-teal-200' : 'bg-[#041417] border-emerald-500/30'
                }`}>
                  {renderResponsibilityIcon(selectedResponsibility.iconName)}
                </div>
                <div>
                  <h4 className="text-lg font-black">{selectedResponsibility.clanBn}</h4>
                  <span className="text-xs opacity-60">পরিচ্ছেদ {selectedResponsibility.sectionCode}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedResponsibility(null)}
                className="p-2 rounded-xl border text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className={`p-4 rounded-xl border space-y-2 ${
              isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#041417] border-[#153e46]'
            }`}>
              <div className="text-xs font-bold text-amber-500">
                {selectedResponsibility.responsibilityBn}
              </div>
              <p className="text-xs leading-relaxed opacity-90">
                {selectedResponsibility.detailsBn}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  setSelectedResponsibility(null);
                  setActiveTab('book_reader');
                  setSelectedChapter(1);
                  const targetId =
                    selectedResponsibility.clanBn.includes('হাশিম') ? 'banu-hashim' :
                    selectedResponsibility.clanBn.includes('উমাইয়া') ? 'banu-umayya' :
                    selectedResponsibility.clanBn.includes('মাখযুম') ? 'banu-makhzum' :
                    selectedResponsibility.clanBn.includes('আদি') ? 'banu-adi' :
                    selectedResponsibility.clanBn.includes('তাইম') ? 'banu-taym' :
                    selectedResponsibility.clanBn.includes('আসাদ') ? 'banu-asad-quraysh' :
                    selectedResponsibility.clanBn.includes('যোহরা') ? 'banu-zuhrah' : 'quraysh-other-branches';
                  setExpandedSections(prev => ({ ...prev, [targetId]: true }));
                  scrollToAnchor(targetId);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white cursor-pointer shadow"
              >
                অধ্যায়ে দেখুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
