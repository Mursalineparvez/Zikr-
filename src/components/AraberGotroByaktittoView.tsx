import React, { useState, useMemo, useEffect } from 'react';
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
  ExternalLink,
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
  Volume2,
  Droplet,
  Flag,
  Scale,
  Compass,
  Coins,
  Key,
  Heart
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';

interface AraberGotroByaktittoViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  onBack?: () => void;
  soundEnabled: boolean;
}

type ActiveTab = 'chapters' | 'responsibilities' | 'genealogy' | 'analytics' | 'appendix40' | 'bookmarks';

export const AraberGotroByaktittoView: React.FC<AraberGotroByaktittoViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  onBack,
  soundEnabled,
}) => {
  const isDay = themeMode === 'day';
  const [activeTab, setActiveTab] = useState<ActiveTab>('chapters');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>('banu-hashim');
  const [selectedResponsibility, setSelectedResponsibility] = useState<ClanResponsibility | null>(null);
  const [appendixFilter, setAppendixFilter] = useState<string>('all');
  const [activePersonalityModal, setActivePersonalityModal] = useState<TribePersonality | null>(null);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large'>('normal');
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  // Filtered sections for Chapter browser
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
    <div className={`min-h-screen pb-20 transition-colors duration-200 ${
      isDay ? 'text-slate-800' : 'text-[#e6f4f2]'
    }`}>
      {/* 1. Header & Book Meta Card */}
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 backdrop-blur-md transition cursor-pointer text-white border border-white/20"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>ইসলামিক লাইব্রেরিতে ফিরুন</span>
              </button>
            )}

            <div className="flex items-center gap-2">
              <span className="text-xs font-serif opacity-80">{BOOK_METADATA.titleAr}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold">
                ই-বুক সংকলন
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

          {/* Metadata Grid */}
          <div className="pt-2 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-emerald-200/70 block">মূল লেখক</span>
              <span className="font-bold text-white">{BOOK_METADATA.authorBn}</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-emerald-200/70 block">প্রকাশক ও সংস্করণ</span>
              <span className="font-bold text-white">{BOOK_METADATA.publisherBn} ({BOOK_METADATA.publicationDateBn})</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-emerald-200/70 block">আওতাভুক্ত বিষয়</span>
              <span className="font-bold text-white">৩টি মূল অধ্যায় · ৪০টি গোত্র</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-emerald-200/70 block">ওয়েবসাইট</span>
              <a
                href={BOOK_METADATA.website}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-amber-300 hover:underline flex items-center gap-1"
              >
                <span>seerahpori.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
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
            setActiveTab('chapters');
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            activeTab === 'chapters'
              ? isDay ? 'bg-white text-teal-800 shadow-sm' : 'bg-emerald-600 text-white shadow-md'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>অধ্যায়ভিত্তিক পাঠ</span>
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
          <span>কুরাইশ দায়িত্ব বণ্টন</span>
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
          <span>বংশধারা চিত্র</span>
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
          <span>পরিসংখ্যান ও চার্ট</span>
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
          <span>৪০টি গোত্র ইনডেক্স</span>
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

      {/* 4. Tab: Chapters Browser (অধ্যায় ১, ২, ৩) */}
      {activeTab === 'chapters' && (
        <div className="space-y-6">
          {/* Chapter Selector Cards */}
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

          {/* Subsections List within Chapter */}
          <div className="space-y-4">
            {filteredSections.length === 0 ? (
              <div className={`text-center py-16 rounded-2xl border ${
                isDay ? 'bg-white border-slate-200 text-slate-500' : 'bg-[#082226] border-[#153e46] text-emerald-400/70'
              }`}>
                <p className="text-base font-bold">কোনো গোত্র বা ব্যক্তিত্ব খুঁজে পাওয়া যায়নি</p>
                <p className="text-xs mt-1">অনুসন্ধান ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন</p>
              </div>
            ) : (
              filteredSections.map((sec) => {
                const isExpanded = expandedSectionId === sec.id;
                return (
                  <div
                    key={sec.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isDay
                        ? 'bg-white border-slate-200 shadow-sm'
                        : 'bg-[#082226] border-[#153e46]'
                    }`}
                  >
                    {/* Header Toggle */}
                    <div
                      onClick={() => {
                        if (soundEnabled) soundHaptics.playTap();
                        setExpandedSectionId(isExpanded ? null : sec.id);
                      }}
                      className={`p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                        isDay ? 'hover:bg-slate-50' : 'hover:bg-[#0c2f36]'
                      }`}
                    >
                      <div className="flex items-start sm:items-center gap-3.5">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 font-black text-sm border ${
                          isDay
                            ? 'bg-teal-50 text-teal-800 border-teal-200'
                            : 'bg-[#041417] text-emerald-300 border-emerald-500/30'
                        }`}>
                          {sec.sectionCode}
                        </div>
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base sm:text-lg font-black tracking-tight">{sec.tribeNameBn}</h3>
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
                        <span className="text-xs opacity-75">
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

                    {/* Expanded Content Section */}
                    {isExpanded && (
                      <div className={`p-5 sm:p-6 border-t space-y-6 ${
                        isDay ? 'border-slate-100 bg-slate-50/50' : 'border-[#153e46] bg-[#05181b]/50'
                      }`}>
                        {/* 1. Introduction Card */}
                        <div className={`p-4 sm:p-5 rounded-2xl border leading-relaxed space-y-2 ${
                          isDay ? 'bg-white border-slate-200 text-slate-700' : 'bg-[#082226] border-[#153e46] text-emerald-100'
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
                          <p className={fontSizeLevel === 'large' ? 'text-base' : 'text-sm'}>
                            {sec.introductionBn}
                          </p>
                        </div>

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

                        {/* 3. Personalities Grid */}
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
                                          isProphet ? 'text-amber-500 text-base' : 'text-sm group-hover:text-amber-400 transition'
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
                                      <span className={isNegative ? 'text-rose-500' : 'text-amber-500'}>
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
                                      <span>বিস্তারিত</span>
                                      <ExternalLink className="w-3 h-3" />
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

      {/* 5. Tab: Makkah Responsibilities (কুরাইশ শাখাগুলোর দায়িত্ব ও ভূমিকা) */}
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
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Tab: Interactive Genealogy Trees (বংশধারা চিত্র - পৃষ্ঠা ৫ ও ৩১) */}
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
                        ? 'border-amber-500 bg-amber-500/10'
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
                            {child.children && (
                              <div className="text-[9px] opacity-80 font-normal mt-0.5">
                                ↓ {child.children.map((k: any) => k.name).join(', ')}
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

      {/* 7. Tab: Analytics & Chart (পরিসংখ্যান ও চার্ট - পৃষ্ঠা ৬৪) */}
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

      {/* 8. Tab: All 40 Tribes Directory (সংযুক্তি ১ থেকে ৪০টি গোত্র - পৃষ্ঠা ৬৪–৮৩) */}
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

      {/* 9. Tab: Bookmarks */}
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
                      className="p-1.5 rounded-lg bg-amber-500 text-white"
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

      {/* 10. Personality Detail Modal */}
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
                className="hover:underline flex items-center gap-1 font-bold shrink-0"
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

      {/* 11. Responsibility Detail Modal */}
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
                  setActiveTab('chapters');
                  setSelectedChapter(1);
                  setExpandedSectionId(
                    selectedResponsibility.clanBn.includes('হাশিম') ? 'banu-hashim' :
                    selectedResponsibility.clanBn.includes('উমাইয়া') ? 'banu-umayya' :
                    selectedResponsibility.clanBn.includes('মাখযুম') ? 'banu-makhzum' :
                    selectedResponsibility.clanBn.includes('আদি') ? 'banu-adi' :
                    selectedResponsibility.clanBn.includes('তাইম') ? 'banu-taym' :
                    selectedResponsibility.clanBn.includes('আসাদ') ? 'banu-asad-quraysh' :
                    selectedResponsibility.clanBn.includes('যোহরা') ? 'banu-zuhrah' : 'quraysh-other-branches'
                  );
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white"
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
