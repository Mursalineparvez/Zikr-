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
  CHAPTER3_OVERVIEW,
  TOPIC_WISE_TOC_DATA,
  TopicTocItem,
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
  ChevronRight,
  ChevronLeft,
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
  Star,
  Crown,
  BookMarked,
  CheckCircle2,
  X,
  Flame,
  RotateCcw
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';

interface AraberGotroByaktittoViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  onBack?: () => void;
  soundEnabled: boolean;
}

type ViewMode = 'topic_toc' | 'directory' | 'reader' | 'who_is_who' | 'charts_gallery' | 'appendix40' | 'bookmarks';
type ChapterFilter = 'all' | 1 | 2 | 3;

interface ClanVisualMeta {
  icon: string;
  badgeBn: string;
  gradientDay: string;
  gradientNight: string;
  borderDay: string;
  borderNight: string;
  themeColor: string;
}

const CLAN_VISUAL_MAP: Record<string, ClanVisualMeta> = {
  'banu-hashim': {
    icon: '👑',
    badgeBn: 'কাবার সিকায়াহ ও রিফাদাহ · নবীজি ও আহলে বাইত',
    gradientDay: 'from-amber-500/15 via-emerald-500/10 to-teal-500/5',
    gradientNight: 'from-amber-500/20 via-emerald-950/40 to-[#04191d]',
    borderDay: 'border-amber-400/60',
    borderNight: 'border-amber-500/40',
    themeColor: 'text-amber-500'
  },
  'banu-umayya': {
    icon: '🚩',
    badgeBn: 'রণপতাকা আল-উকাব · হযরত উসমান ও সেনাপতিত্ব',
    gradientDay: 'from-emerald-500/15 via-teal-500/10 to-cyan-500/5',
    gradientNight: 'from-emerald-600/20 via-[#072428] to-[#041417]',
    borderDay: 'border-emerald-400/60',
    borderNight: 'border-emerald-500/40',
    themeColor: 'text-emerald-500'
  },
  'banu-makhzum': {
    icon: '🛡️',
    badgeBn: 'অশ্বারোহী বাহিনী ও সমর শিবির · খালিদ বিন ওয়ালিদ',
    gradientDay: 'from-indigo-500/15 via-sky-500/10 to-teal-500/5',
    gradientNight: 'from-indigo-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-indigo-400/60',
    borderNight: 'border-indigo-500/40',
    themeColor: 'text-indigo-400'
  },
  'banu-adi': {
    icon: '📜',
    badgeBn: 'কূটনীতি, দূত ও আন্তর্জাতিক সালিশি · হযরত উমর ফারুক',
    gradientDay: 'from-teal-500/15 via-emerald-500/10 to-slate-500/5',
    gradientNight: 'from-teal-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-teal-400/60',
    borderNight: 'border-teal-500/40',
    themeColor: 'text-teal-400'
  },
  'banu-taym': {
    icon: '⚖️',
    badgeBn: 'রক্তপণ (দিয়াত) ও ক্ষতিপূরণ · হযরত আবু বকর সিদ্দিক',
    gradientDay: 'from-sky-500/15 via-teal-500/10 to-amber-500/5',
    gradientNight: 'from-sky-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-sky-400/60',
    borderNight: 'border-sky-500/40',
    themeColor: 'text-sky-400'
  },
  'banu-asad-quraysh': {
    icon: '🏛️',
    badgeBn: 'দারুন নাদওয়াহ ও বাণিজ্য · উম্মুল মুমিনীন খাদিজা ও যুবাইর',
    gradientDay: 'from-purple-500/15 via-pink-500/10 to-amber-500/5',
    gradientNight: 'from-purple-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-purple-400/60',
    borderNight: 'border-purple-500/40',
    themeColor: 'text-purple-400'
  },
  'banu-zuhrah': {
    icon: '🌸',
    badgeBn: 'রাসূলুল্লাহ ﷺ-এর মাতামহ বংশ · আমিনা ও সা\'দ ইবনে আবি ওয়াক্কাস',
    gradientDay: 'from-rose-500/15 via-amber-500/10 to-teal-500/5',
    gradientNight: 'from-rose-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-rose-400/60',
    borderNight: 'border-rose-500/40',
    themeColor: 'text-rose-400'
  },
  'quraysh-other-branches': {
    icon: '🔑',
    badgeBn: 'কাবার চাবি, লিওয়া, আযলাম ও হাদিয়াহ · মুস\'আব ইবনে উমায়ের',
    gradientDay: 'from-amber-500/15 via-orange-500/10 to-teal-500/5',
    gradientNight: 'from-amber-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-amber-400/60',
    borderNight: 'border-amber-500/40',
    themeColor: 'text-amber-400'
  },
  'khazraj-tribe': {
    icon: '🌴',
    badgeBn: 'মদিনার আনসার (বৃহত্তম শাখা) · আবু আইয়ুব ও জাবির ইবনে আব্দুল্লাহ',
    gradientDay: 'from-emerald-500/15 via-green-500/10 to-teal-500/5',
    gradientNight: 'from-emerald-900/30 via-[#061e22] to-[#041417]',
    borderDay: 'border-emerald-400/60',
    borderNight: 'border-emerald-500/40',
    themeColor: 'text-emerald-400'
  },
  'aws-tribe': {
    icon: '🌿',
    badgeBn: 'মদিনার আনসার (বীরত্বগাঁথা) · সা\'দ ইবনে মু\'আজ ও আসহাবে বদর',
    gradientDay: 'from-teal-500/15 via-cyan-500/10 to-emerald-500/5',
    gradientNight: 'from-teal-900/30 via-[#061e22] to-[#041417]',
    borderDay: 'border-teal-400/60',
    borderNight: 'border-teal-500/40',
    themeColor: 'text-teal-400'
  },
  'madinah-jewish-tribes': {
    icon: '🏰',
    badgeBn: 'মদিনার কায়নুকা, নাদির ও কুরাইজা দুর্গ · ঐতিহাসিক চুক্তি ও সংঘাত',
    gradientDay: 'from-slate-500/15 via-zinc-500/10 to-stone-500/5',
    gradientNight: 'from-slate-900/30 via-[#061e22] to-[#041417]',
    borderDay: 'border-slate-400/60',
    borderNight: 'border-slate-500/40',
    themeColor: 'text-slate-400'
  },
  'banu-thaqif': {
    icon: '🏔️',
    badgeBn: 'তায়েফ নগরী ও রণপ্রস্তুতি · উরওয়া ইবনে মাসউদ ও মুগীরা',
    gradientDay: 'from-orange-500/15 via-amber-500/10 to-red-500/5',
    gradientNight: 'from-orange-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-orange-400/60',
    borderNight: 'border-orange-500/40',
    themeColor: 'text-orange-400'
  },
  'banu-hawazin-saad': {
    icon: '🌾',
    badgeBn: 'দুধমাতা হালিমা ও শুদ্ধতম আরবি · হুনাইনের ঐতিহাসিক ময়দান',
    gradientDay: 'from-lime-500/15 via-emerald-500/10 to-teal-500/5',
    gradientNight: 'from-lime-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-lime-400/60',
    borderNight: 'border-lime-500/40',
    themeColor: 'text-lime-400'
  },
  'banu-khuzaa-bakr': {
    icon: '🤝',
    badgeBn: 'হুদাইবিয়ার চুক্তিতে মিত্রতা · মক্কা বিজয়ের ঐতিহাসিক পটভূমি',
    gradientDay: 'from-cyan-500/15 via-blue-500/10 to-teal-500/5',
    gradientNight: 'from-cyan-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-cyan-400/60',
    borderNight: 'border-cyan-500/40',
    themeColor: 'text-cyan-400'
  },
  'banu-ghifar-daws': {
    icon: '🏜️',
    badgeBn: 'বাণিজ্যপথ ও দক্ষিণ আরব · আবু যার ও আবু হুরায়রা (রা.)',
    gradientDay: 'from-amber-500/15 via-yellow-500/10 to-teal-500/5',
    gradientNight: 'from-amber-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-amber-400/60',
    borderNight: 'border-amber-500/40',
    themeColor: 'text-amber-400'
  },
  'banu-tamim-kalb': {
    icon: '🦁',
    badgeBn: 'নজদের বীর যোদ্ধা ও কবি · যায়েদ ইবনে হারিসা ও খাব্বাব',
    gradientDay: 'from-red-500/15 via-amber-500/10 to-teal-500/5',
    gradientNight: 'from-red-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-red-400/60',
    borderNight: 'border-red-500/40',
    themeColor: 'text-red-400'
  },
  'banu-ghatfan-hanifa': {
    icon: '⚔️',
    badgeBn: 'খন্দকের বিশাল বাহিনী ও ইয়ামামার ঐতিহাসিক সংঘাত',
    gradientDay: 'from-stone-500/15 via-zinc-500/10 to-amber-500/5',
    gradientNight: 'from-stone-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-stone-400/60',
    borderNight: 'border-stone-500/40',
    themeColor: 'text-stone-400'
  }
};

export const AraberGotroByaktittoView: React.FC<AraberGotroByaktittoViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  onBack,
  soundEnabled,
}) => {
  const isDay = themeMode === 'day';
  const [viewMode, setViewMode] = useState<ViewMode>('topic_toc');
  const [chapterFilter, setChapterFilter] = useState<ChapterFilter>('all');
  const [activeClanId, setActiveClanId] = useState<string>('banu-hashim');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeChartTab, setActiveChartTab] = useState<'quraysh_roles' | 'hashim_tree' | 'ansar_tree' | 'arab_map' | 'statistics'>('quraysh_roles');

  const [appendixFilter, setAppendixFilter] = useState<string>('all');
  const [activePersonalityModal, setActivePersonalityModal] = useState<TribePersonality | null>(null);
  const [selectedResponsibility, setSelectedResponsibility] = useState<ClanResponsibility | null>(null);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large'>('normal');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [selectedTocTopicId, setSelectedTocTopicId] = useState<string>('all');
  const [collapsedTopics, setCollapsedTopics] = useState<Record<string, boolean>>({});

  const toggleTopicCollapse = (topicId: string) => {
    if (soundEnabled) soundHaptics.playTap();
    setCollapsedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const expandAllTopics = () => {
    if (soundEnabled) soundHaptics.playTap();
    setCollapsedTopics({});
  };

  const collapseAllTopics = () => {
    if (soundEnabled) soundHaptics.playTap();
    const allCollapsed: Record<string, boolean> = {};
    TOPIC_WISE_TOC_DATA.forEach(t => {
      allCollapsed[t.id] = true;
    });
    setCollapsedTopics(allCollapsed);
  };

  const openChart = (chartKey?: 'quraysh_roles' | 'hashim_tree' | 'ansar_tree' | 'arab_map' | 'statistics') => {
    if (chartKey) {
      if (soundEnabled) soundHaptics.playTap();
      setActiveChartTab(chartKey);
      setViewMode('charts_gallery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openAppendixCategory = (filterText: string) => {
    if (soundEnabled) soundHaptics.playTap();
    setAppendixFilter(filterText);
    setViewMode('appendix40');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  // Currently active clan object for reader mode
  const activeClan = useMemo(() => {
    return ARABER_GOTRO_DATABASE.find(s => s.id === activeClanId) || ARABER_GOTRO_DATABASE[0];
  }, [activeClanId]);

  // Index navigation for Reader Mode
  const activeClanIndex = useMemo(() => {
    return ARABER_GOTRO_DATABASE.findIndex(s => s.id === activeClanId);
  }, [activeClanId]);

  const hasPrevClan = activeClanIndex > 0;
  const hasNextClan = activeClanIndex < ARABER_GOTRO_DATABASE.length - 1;

  const handlePrevClan = () => {
    if (hasPrevClan) {
      if (soundEnabled) soundHaptics.playTap();
      setActiveClanId(ARABER_GOTRO_DATABASE[activeClanIndex - 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextClan = () => {
    if (hasNextClan) {
      if (soundEnabled) soundHaptics.playTap();
      setActiveClanId(ARABER_GOTRO_DATABASE[activeClanIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Filtered Topic TOC list
  const filteredTopicToc = useMemo(() => {
    return TOPIC_WISE_TOC_DATA.filter((topic) => {
      if (selectedTocTopicId !== 'all' && topic.id !== selectedTocTopicId) {
        return false;
      }
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;

      const matchTopic = topic.topicTitleBn.toLowerCase().includes(q) ||
        (topic.topicTitleAr && topic.topicTitleAr.toLowerCase().includes(q)) ||
        topic.summaryBn.toLowerCase().includes(q) ||
        topic.themeBadgeBn.toLowerCase().includes(q);

      const matchSubs = topic.subsections.some((sub) =>
        sub.titleBn.toLowerCase().includes(q) ||
        sub.subtitleBn.toLowerCase().includes(q) ||
        sub.badgeBn.toLowerCase().includes(q) ||
        sub.figuresPreview?.some((fig) => fig.toLowerCase().includes(q))
      );

      return matchTopic || matchSubs;
    });
  }, [selectedTocTopicId, searchQuery]);

  // Filtered Clans for Directory Mode
  const filteredClans = useMemo(() => {
    return ARABER_GOTRO_DATABASE.filter((sec) => {
      const matchChapter = chapterFilter === 'all' || sec.chapterNo === chapterFilter;
      if (!matchChapter) return false;

      const q = searchQuery.toLowerCase().trim();
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
  }, [chapterFilter, searchQuery]);

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

  const openClanInReader = (clanId: string) => {
    if (soundEnabled) soundHaptics.playTap();
    setActiveClanId(clanId);
    setViewMode('reader');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen pb-24 transition-colors duration-200 ${
      isDay ? 'text-slate-800' : 'text-[#e6f4f2]'
    }`}>
      {/* 1. Header Banner (Clean, scholarly, free from author and external web links) */}
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

          {/* Clean Academic Badges (No page numbers, no author name, no website links) */}
          <div className="pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="space-y-0.5">
              <span className="text-emerald-200/70 block">মূল পরিমণ্ডল</span>
              <span className="font-bold text-white">মক্কা, মদিনা ও বৃহত্তর আরব</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-emerald-200/70 block">কাবার শাসন বণ্টন</span>
              <span className="font-bold text-white">১০টি প্রধান কুরাইশ দায়িত্ব</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-emerald-200/70 block">গোত্র কোষ</span>
              <span className="font-bold text-white">৪০টি ঐতিহাসিক গোত্র ও বংশধারা</span>
            </div>
            <div className="space-y-0.5">
              <span className="text-emerald-200/70 block">তথ্যসূত্র</span>
              <span className="font-bold text-amber-300">ইবনে হিশাম, আল-ইসাবাহ ও সীরাত</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary Navigation Mode Bar (Zero-Pill Restrained Design) */}
      <div className={`p-1.5 rounded-2xl border mb-6 flex items-center gap-1.5 overflow-x-auto scrollbar-none ${
        isDay ? 'bg-slate-100 border-slate-200' : 'bg-[#061e22] border-[#133c44]'
      }`}>
        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setViewMode('topic_toc');
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            viewMode === 'topic_toc'
              ? isDay ? 'bg-white text-teal-800 shadow-sm' : 'bg-emerald-600 text-white shadow-md'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4 text-amber-400" />
          <span>বিষয়ভিত্তিক সূচিপত্র</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setViewMode('directory');
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            viewMode === 'directory'
              ? isDay ? 'bg-white text-teal-800 shadow-sm' : 'bg-emerald-600 text-white shadow-md'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>গোত্র ডিরেক্টরি</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setViewMode('reader');
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            viewMode === 'reader'
              ? isDay ? 'bg-white text-teal-800 shadow-sm' : 'bg-emerald-600 text-white shadow-md'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <BookMarked className="w-4 h-4 text-amber-400" />
          <span>গোত্র পাঠ (সীরাত স্টাইল)</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setViewMode('who_is_who');
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            viewMode === 'who_is_who'
              ? isDay ? 'bg-white text-teal-800 shadow-sm' : 'bg-emerald-600 text-white shadow-md'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4 text-teal-400" />
          <span>কোন গোত্রে কে কে (ম্যাপিং চার্ট)</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setViewMode('charts_gallery');
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            viewMode === 'charts_gallery'
              ? isDay ? 'bg-white text-teal-800 shadow-sm' : 'bg-emerald-600 text-white shadow-md'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <GitFork className="w-4 h-4 text-emerald-400" />
          <span>চার্ট ও বংশধারা গ্যালারি</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setViewMode('appendix40');
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            viewMode === 'appendix40'
              ? isDay ? 'bg-white text-teal-800 shadow-sm' : 'bg-emerald-600 text-white shadow-md'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <Scroll className="w-4 h-4" />
          <span>৪০টি গোত্র কোষ</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setViewMode('bookmarks');
          }}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            viewMode === 'bookmarks'
              ? isDay ? 'bg-white text-teal-800 shadow-sm' : 'bg-emerald-600 text-white shadow-md'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>বুকমার্ক ({bookmarkedPersonalities.length})</span>
        </button>
      </div>

      {/* 3. Global Search & Font Size Controls */}
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

      {/* =====================================================================
          VIEW MODE 0: TOPIC-WISE INDEX (বিষয়ভিত্তিক সূচিপত্র)
          Comprehensive Thematic Table of Contents with zero page numbers
          ===================================================================== */}
      {viewMode === 'topic_toc' && (
        <div className="space-y-6">
          {/* Hero Thematic Index Banner */}
          <div className={`p-6 sm:p-7 rounded-3xl border shadow-lg relative overflow-hidden ${
            isDay
              ? 'bg-gradient-to-br from-teal-50 via-white to-emerald-50/50 border-teal-200'
              : 'bg-gradient-to-br from-[#082226] via-[#051a1d] to-[#041417] border-emerald-500/30'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    বিষয়ভিত্তিক সূচিপত্র
                  </span>
                  <span className="text-xs font-serif text-emerald-400 opacity-80 font-bold">
                    فهرس الموضوعات الشامل
                  </span>
                </div>
                <h2 className="text-xl sm:text-3xl font-black tracking-tight">
                  পবিত্র সীরাত ও আরবের গোত্রকোষ সূচি
                </h2>
                <p className="text-xs sm:text-sm opacity-80 max-w-2xl leading-relaxed">
                  কাবার প্রশাসনিক দায়িত্ব, নববি রক্তধারা, মদিনার আনসার ভ্রাতৃত্ব, বৃহত্তর আরবের আঞ্চলিক শক্তি ও ৪০টি গোত্রের বিস্তৃত ইতিহাস অনুযায়ী শ্রেণিভুক্ত সূচি। যেকোনো বিষয়ে চাপ দিয়ে সরাসরি পাঠ শুরু করুন।
                </p>
              </div>

              {/* Action Buttons: Expand All / Collapse All */}
              <div className="flex items-center gap-2 self-start md:self-center shrink-0">
                <button
                  onClick={expandAllTopics}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                    isDay
                      ? 'bg-white hover:bg-slate-100 text-teal-800 border-slate-200 shadow-sm'
                      : 'bg-[#061e22] hover:bg-[#0c3137] text-emerald-300 border-[#153e46]'
                  }`}
                >
                  <ChevronDown className="w-3.5 h-3.5 text-amber-400" />
                  <span>সব প্রসারিত করুন</span>
                </button>
                <button
                  onClick={collapseAllTopics}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 ${
                    isDay
                      ? 'bg-white hover:bg-slate-100 text-teal-800 border-slate-200 shadow-sm'
                      : 'bg-[#061e22] hover:bg-[#0c3137] text-emerald-300 border-[#153e46]'
                  }`}
                >
                  <ChevronUp className="w-3.5 h-3.5 text-amber-400" />
                  <span>সব সংক্ষেপ করুন</span>
                </button>
              </div>
            </div>

            {/* Quick Topic Filter Selector Tabs */}
            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-xs font-bold opacity-70 whitespace-nowrap">বিষয় ফিল্টার:</span>
              <button
                onClick={() => {
                  if (soundEnabled) soundHaptics.playTap();
                  setSelectedTocTopicId('all');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                  selectedTocTopicId === 'all'
                    ? isDay ? 'bg-teal-700 text-white border-teal-600 shadow' : 'bg-emerald-600 text-white border-emerald-500 shadow'
                    : isDay ? 'bg-white text-slate-700 border-slate-200' : 'bg-[#041417] text-emerald-300 border-[#153e46]'
                }`}
              >
                সকল বিষয় (৫টি)
              </button>
              {TOPIC_WISE_TOC_DATA.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setSelectedTocTopicId(t.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 border ${
                    selectedTocTopicId === t.id
                      ? isDay ? 'bg-teal-700 text-white border-teal-600 shadow' : 'bg-emerald-600 text-white border-emerald-500 shadow'
                      : isDay ? 'bg-white text-slate-700 border-slate-200' : 'bg-[#041417] text-emerald-300 border-[#153e46]'
                  }`}
                >
                  <span>{t.icon}</span>
                  <span>বিষয় {t.topicNumber}: {t.themeBadgeBn}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Master 5 Topic Accordion Cards */}
          <div className="space-y-5">
            {filteredTopicToc.map((topic) => {
              const isCollapsed = !!collapsedTopics[topic.id];

              return (
                <div
                  key={topic.id}
                  className={`rounded-3xl border transition-all duration-300 overflow-hidden shadow-sm ${
                    isDay
                      ? `bg-gradient-to-br ${topic.gradientDay} ${topic.borderDay}`
                      : `bg-gradient-to-br ${topic.gradientNight} ${topic.borderNight}`
                  }`}
                >
                  {/* Topic Header Clickable */}
                  <div
                    onClick={() => toggleTopicCollapse(topic.id)}
                    className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer select-none transition"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl bg-white/30 dark:bg-black/40 backdrop-blur-md border border-white/40 dark:border-white/10 shrink-0 shadow-sm">
                        {topic.icon}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-md ${
                            isDay ? 'bg-teal-700 text-white' : 'bg-emerald-500 text-slate-950 font-black'
                          }`}>
                            বিষয় {topic.topicNumber.toString().padStart(2, '০')}
                          </span>
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-white/40 dark:bg-white/10 text-slate-700 dark:text-emerald-300 border border-black/5 dark:border-white/10">
                            {topic.themeBadgeBn}
                          </span>
                          {topic.topicTitleAr && (
                            <span className="text-xs font-serif text-amber-500 font-bold hidden md:inline">
                              ({topic.topicTitleAr})
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg sm:text-2xl font-black tracking-tight mt-1">
                          {topic.topicTitleBn}
                        </h3>

                        <p className="text-xs sm:text-sm opacity-85 max-w-3xl leading-relaxed">
                          {topic.summaryBn}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-black/10 dark:border-white/10">
                      <span className="text-xs font-bold opacity-75">
                        {topic.subsections.length}টি বিষয় ও চার্ট
                      </span>
                      <div className="w-8 h-8 rounded-xl bg-black/10 dark:bg-white/10 flex items-center justify-center shrink-0">
                        {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Subsections Content */}
                  {!isCollapsed && (
                    <div className="p-5 sm:p-6 pt-0 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {topic.subsections.map((sub, sIdx) => {
                          const isChart = sub.type === 'chart';

                          return (
                            <div
                              key={sIdx}
                              onClick={() => {
                                if (soundEnabled) soundHaptics.playTap();
                                if (isChart) {
                                  openChart(sub.chartKey);
                                } else if (sub.id.startsWith('appendix-')) {
                                  openAppendixCategory(sub.titleBn.split(' ')[0]);
                                } else {
                                  openClanInReader(sub.id);
                                }
                              }}
                              className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 group hover:scale-[1.01] shadow-sm ${
                                isChart
                                  ? isDay
                                    ? 'bg-amber-50/90 border-amber-300 hover:border-amber-500 shadow-md ring-1 ring-amber-400/20'
                                    : 'bg-amber-950/20 border-amber-500/40 hover:border-amber-400 shadow-md ring-1 ring-amber-400/20'
                                  : isDay
                                    ? 'bg-white/95 hover:bg-white border-slate-200/90 hover:border-teal-400'
                                    : 'bg-[#041417]/90 hover:bg-[#071f23] border-[#153e46] hover:border-emerald-400'
                              }`}
                            >
                              <div className="space-y-2">
                                <div className="flex items-start justify-between gap-2">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border ${
                                        isChart
                                          ? 'bg-amber-500/20 text-amber-500 border-amber-500/30'
                                          : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                                      }`}>
                                        {sub.badgeBn}
                                      </span>
                                    </div>
                                    <h4 className="text-base font-black tracking-tight group-hover:text-amber-400 transition flex items-center gap-2">
                                      {isChart && <span>📊</span>}
                                      <span>{sub.titleBn}</span>
                                    </h4>
                                  </div>

                                  <div className="w-7 h-7 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition">
                                    <ChevronRight className="w-4 h-4 text-emerald-500" />
                                  </div>
                                </div>

                                <p className="text-xs opacity-80 leading-relaxed">
                                  {sub.subtitleBn}
                                </p>

                                {/* Prominent Personalities Preview */}
                                {sub.figuresPreview && sub.figuresPreview.length > 0 && (
                                  <div className="pt-2 border-t border-dashed border-black/10 dark:border-white/10 flex flex-wrap gap-1.5 items-center">
                                    <span className="text-[10px] font-bold opacity-60">ব্যক্তিত্ব:</span>
                                    {sub.figuresPreview.map((fig, fIdx) => (
                                      <span
                                        key={fIdx}
                                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
                                      >
                                        {fig}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                                <span>
                                  {isChart ? 'চার্টটি বড় করে দেখুন →' : 'সরাসরি সীরাত ও জীবনী পড়ুন →'}
                                </span>
                                <span className="opacity-60 font-normal">ক্লিক করুন</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Topic Footer Quick Action */}
                      {topic.relatedChartKey && (
                        <div className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 flex-wrap ${
                          isDay ? 'bg-white/60 border-slate-200' : 'bg-black/20 border-white/10'
                        }`}>
                          <div className="flex items-center gap-2 text-xs">
                            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                            <span>এই বিষয়ের মূল ভিজ্যুয়াল চার্ট:</span>
                            <strong className="text-amber-500">{topic.relatedChartTitleBn}</strong>
                          </div>

                          <button
                            onClick={() => openChart(topic.relatedChartKey)}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                          >
                            <span>চার্টটি দেখুন</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          VIEW MODE 1: ATTRACTIVE GOTRO DIRECTORY (REPLACING THE OLD TEXT TOC)
          ===================================================================== */}
      {viewMode === 'directory' && (
        <div className="space-y-6">
          {/* 3 Major Era/Chapter Showcase Cards (Like Seerah & Hayatus Sahaba) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setChapterFilter(chapterFilter === 1 ? 'all' : 1);
              }}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden ${
                chapterFilter === 1
                  ? isDay ? 'bg-teal-700 text-white border-teal-600 shadow-md ring-2 ring-teal-500/20' : 'bg-emerald-600 text-white border-emerald-500 shadow-lg ring-2 ring-emerald-400/30'
                  : isDay ? 'bg-white border-slate-200 hover:border-teal-400 shadow-sm' : 'bg-[#082226] border-[#153e46] hover:border-emerald-500'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold px-2.5 py-0.5 rounded-lg ${
                    chapterFilter === 1 ? 'bg-white/20 text-white' : 'bg-amber-500/15 text-amber-500 font-black'
                  }`}>
                    বিষয় ০১
                  </span>
                  <span className="text-xl">🏛️</span>
                </div>
                <h3 className="text-base sm:text-lg font-black tracking-tight mt-1">
                  মক্কার কুরাইশ গোত্রসমূহ
                </h3>
                <p className={`text-xs leading-relaxed line-clamp-2 ${chapterFilter === 1 ? 'text-white/80' : 'opacity-70'}`}>
                  পবিত্র কাবার খেদমত, ১০টি প্রধান কুরাইশ দায়িত্ব বণ্টন ও অভিজাত বংশসমূহ
                </p>
              </div>

              <div className="pt-2 border-t border-dashed border-white/20 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold">
                <span>৮টি মূল শাখা</span>
                <span className={chapterFilter === 1 ? 'text-amber-200' : 'text-emerald-500'}>
                  {chapterFilter === 1 ? 'নির্বাচিত ✓' : 'ফিল্টার করুন →'}
                </span>
              </div>
            </div>

            <div
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setChapterFilter(chapterFilter === 2 ? 'all' : 2);
              }}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden ${
                chapterFilter === 2
                  ? isDay ? 'bg-teal-700 text-white border-teal-600 shadow-md ring-2 ring-teal-500/20' : 'bg-emerald-600 text-white border-emerald-500 shadow-lg ring-2 ring-emerald-400/30'
                  : isDay ? 'bg-white border-slate-200 hover:border-teal-400 shadow-sm' : 'bg-[#082226] border-[#153e46] hover:border-emerald-500'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold px-2.5 py-0.5 rounded-lg ${
                    chapterFilter === 2 ? 'bg-white/20 text-white' : 'bg-teal-500/15 text-teal-400 font-black'
                  }`}>
                    বিষয় ০২
                  </span>
                  <span className="text-xl">🌴</span>
                </div>
                <h3 className="text-base sm:text-lg font-black tracking-tight mt-1">
                  মদিনার আনসার ও অন্যান্য
                </h3>
                <p className={`text-xs leading-relaxed line-clamp-2 ${chapterFilter === 2 ? 'text-white/80' : 'opacity-70'}`}>
                  ইয়েমেনের আজদ বংশ, খাযরাজ ও আওস ভ্রাতৃত্ব এবং মদিনার ইহুদি গোত্রসমূহ
                </p>
              </div>

              <div className="pt-2 border-t border-dashed border-white/20 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold">
                <span>আওস, খাযরাজ ও ইহুদি</span>
                <span className={chapterFilter === 2 ? 'text-amber-200' : 'text-teal-400'}>
                  {chapterFilter === 2 ? 'নির্বাচিত ✓' : 'ফিল্টার করুন →'}
                </span>
              </div>
            </div>

            <div
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setChapterFilter(chapterFilter === 3 ? 'all' : 3);
              }}
              className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 relative overflow-hidden ${
                chapterFilter === 3
                  ? isDay ? 'bg-teal-700 text-white border-teal-600 shadow-md ring-2 ring-teal-500/20' : 'bg-emerald-600 text-white border-emerald-500 shadow-lg ring-2 ring-emerald-400/30'
                  : isDay ? 'bg-white border-slate-200 hover:border-teal-400 shadow-sm' : 'bg-[#082226] border-[#153e46] hover:border-emerald-500'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold px-2.5 py-0.5 rounded-lg ${
                    chapterFilter === 3 ? 'bg-white/20 text-white' : 'bg-orange-500/15 text-orange-400 font-black'
                  }`}>
                    বিষয় ০৩
                  </span>
                  <span className="text-xl">🧭</span>
                </div>
                <h3 className="text-base sm:text-lg font-black tracking-tight mt-1">
                  আরবের অন্যান্য উল্লেখযোগ্য গোত্র
                </h3>
                <p className={`text-xs leading-relaxed line-clamp-2 ${chapterFilter === 3 ? 'text-white/80' : 'opacity-70'}`}>
                  তায়েফের সাকীফ, নজদের হাওয়াযিন, হুদাইবিয়ার খুযা'আ, গিফার ও তামিম
                </p>
              </div>

              <div className="pt-2 border-t border-dashed border-white/20 dark:border-slate-800 flex items-center justify-between text-[11px] font-bold">
                <span>১১টি অঞ্চলভিত্তিক গোত্র</span>
                <span className={chapterFilter === 3 ? 'text-amber-200' : 'text-orange-400'}>
                  {chapterFilter === 3 ? 'নির্বাচিত ✓' : 'ফিল্টার করুন →'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts to Visual Charts */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between gap-2 overflow-x-auto scrollbar-none ${
            isDay ? 'bg-teal-50/70 border-teal-200' : 'bg-[#051e22] border-emerald-500/20'
          }`}>
            <span className="text-xs font-bold text-amber-500 flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="w-4 h-4" />
              <span>গুরুত্বপূর্ণ ভিজ্যুয়াল চার্টসমূহ:</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setViewMode('charts_gallery');
                  setActiveChartTab('quraysh_roles');
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 whitespace-nowrap transition cursor-pointer"
              >
                🏛️ কুরাইশ দায়িত্ব বণ্টন চার্ট
              </button>

              <button
                onClick={() => {
                  setViewMode('charts_gallery');
                  setActiveChartTab('hashim_tree');
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 whitespace-nowrap transition cursor-pointer"
              >
                🌳 বনু হাশিম বংশলতিকা চিত্র
              </button>

              <button
                onClick={() => {
                  setViewMode('charts_gallery');
                  setActiveChartTab('ansar_tree');
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-teal-500/15 text-teal-400 border border-teal-500/30 hover:bg-teal-500/25 whitespace-nowrap transition cursor-pointer"
              >
                🌿 আনসার গোত্র শাখা চিত্র
              </button>

              <button
                onClick={() => {
                  setViewMode('charts_gallery');
                  setActiveChartTab('statistics');
                }}
                className="px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/25 whitespace-nowrap transition cursor-pointer"
              >
                📊 ব্যক্তিত্বের বার চার্ট
              </button>
            </div>
          </div>

          {/* Attractive Clan Cards Grid (Replacing boring text page numbers) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredClans.map((sec) => {
              const meta = CLAN_VISUAL_MAP[sec.id] || {
                icon: '🛡️',
                badgeBn: sec.responsibilityOrRoleBn,
                gradientDay: 'from-slate-50 to-white',
                gradientNight: 'from-[#082226] to-[#041417]',
                borderDay: 'border-slate-200',
                borderNight: 'border-[#153e46]',
                themeColor: 'text-emerald-400'
              };

              const prominentSahaba = sec.personalities
                .filter(p => p.category === 'sahabi')
                .slice(0, 3)
                .map(p => p.nameBn);

              return (
                <div
                  key={sec.id}
                  onClick={() => openClanInReader(sec.id)}
                  className={`p-5 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between gap-4 group hover:scale-[1.01] shadow-sm hover:shadow-md ${
                    isDay
                      ? `bg-gradient-to-br ${meta.gradientDay} ${meta.borderDay} hover:border-teal-500`
                      : `bg-gradient-to-br ${meta.gradientNight} ${meta.borderNight} hover:border-emerald-400`
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-white/20 dark:bg-black/30 backdrop-blur-sm border border-white/30 dark:border-white/10 shrink-0 shadow-sm">
                          {meta.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base sm:text-lg font-black tracking-tight group-hover:text-amber-400 transition">
                              {sec.tribeNameBn}
                            </h4>
                            {sec.tribeNameAr && (
                              <span className="text-xs font-serif text-amber-500/80 font-bold hidden sm:inline">
                                ({sec.tribeNameAr})
                              </span>
                            )}
                          </div>
                          <span className="text-xs opacity-75 block mt-0.5">
                            {sec.locationOrContextBn}
                          </span>
                        </div>
                      </div>

                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 shrink-0">
                        {sec.personalities.length} জন ব্যক্তিত্ব
                      </span>
                    </div>

                    {/* Role / Responsibility Badge */}
                    <div className="p-2.5 rounded-xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 text-xs">
                      <span className="font-bold text-amber-500 block mb-0.5">দায়িত্ব ও ঐতিহাসিক ভূমিকা:</span>
                      <p className="leading-relaxed opacity-90 line-clamp-2">
                        {sec.responsibilityOrRoleBn}
                      </p>
                    </div>

                    {/* Prominent Personalities Preview */}
                    {prominentSahaba.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                          উল্লেখযোগ্য ব্যক্তিত্ব:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {prominentSahaba.map((name, nIdx) => (
                            <span
                              key={nIdx}
                              className="text-[11px] font-medium px-2 py-0.5 rounded-lg bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5"
                            >
                              {name}
                            </span>
                          ))}
                          {sec.personalities.length > 3 && (
                            <span className="text-[10px] font-bold opacity-60 self-center">
                              +{sec.personalities.length - 3} জন
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-dashed border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition">
                      <span>সম্পূর্ণ সীরাত ও জীবনী পড়ুন</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                    <span className="text-[10px] opacity-70">
                      {sec.subClans ? `${sec.subClans.length}টি উপশাখা` : 'মূল বংশধারা'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          VIEW MODE 2: SEERAH & HAYATUS SAHABA STYLE FULL CLAN READER
          ===================================================================== */}
      {viewMode === 'reader' && (
        <div className="space-y-6">
          {/* Top Sticky Clan Selector / Navigator */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 shadow-md ${
            isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
          }`}>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
              {ARABER_GOTRO_DATABASE.map((s) => {
                const isActive = s.id === activeClanId;
                const meta = CLAN_VISUAL_MAP[s.id];
                return (
                  <button
                    key={s.id}
                    onClick={() => {
                      if (soundEnabled) soundHaptics.playTap();
                      setActiveClanId(s.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 border ${
                      isActive
                        ? isDay ? 'bg-teal-700 text-white border-teal-600 shadow' : 'bg-emerald-600 text-white border-emerald-500 shadow'
                        : isDay ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200' : 'bg-[#041417] hover:bg-[#0c2f36] text-emerald-300 border-[#153e46]'
                    }`}
                  >
                    <span>{meta?.icon || '🛡️'}</span>
                    <span>{s.tribeNameBn}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Clan Hero Showcase */}
          <div className={`p-6 sm:p-8 rounded-3xl border shadow-lg space-y-6 ${
            isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-3xl flex items-center justify-center text-3xl bg-amber-500/15 border border-amber-500/30 shadow-md shrink-0">
                  {CLAN_VISUAL_MAP[activeClan.id]?.icon || '🛡️'}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                      {activeClan.sectionCode}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{activeClan.tribeNameBn}</h2>
                    {activeClan.tribeNameAr && (
                      <span className="text-sm font-serif text-amber-500 font-bold">
                        ({activeClan.tribeNameAr})
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{activeClan.locationOrContextBn}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  disabled={!hasPrevClan}
                  onClick={handlePrevClan}
                  className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition ${
                    hasPrevClan ? 'cursor-pointer hover:bg-black/5 dark:hover:bg-white/10' : 'opacity-40 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">পূর্ববর্তী গোত্র</span>
                </button>
                <button
                  disabled={!hasNextClan}
                  onClick={handleNextClan}
                  className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition ${
                    hasNextClan ? 'cursor-pointer hover:bg-black/5 dark:hover:bg-white/10' : 'opacity-40 cursor-not-allowed'
                  }`}
                >
                  <span className="hidden sm:inline">পরবর্তী গোত্র</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Responsibility / Role Card */}
            <div className={`p-4 sm:p-5 rounded-2xl border space-y-1.5 ${
              isDay ? 'bg-amber-50/80 border-amber-300' : 'bg-[#051e22] border-amber-500/30'
            }`}>
              <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <Crown className="w-4 h-4" />
                <span>মক্কার ঐতিহাসিক দায়িত্ব ও মর্যাদা</span>
              </div>
              <p className="text-sm sm:text-base font-bold leading-relaxed">
                {activeClan.responsibilityOrRoleBn}
              </p>
            </div>

            {/* Introduction Story */}
            <div className={`p-5 rounded-2xl border leading-relaxed space-y-3 ${
              isDay ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#041417] border-[#153e46] text-emerald-100'
            }`}>
              <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>গোত্র পরিচিতি ও ঐতিহাসিক ইতিবৃত্ত</span>
                </span>
                <button
                  onClick={(e) => handleCopy(activeClan.introductionBn, `intro-${activeClan.id}`, e)}
                  className="opacity-70 hover:opacity-100 flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === `intro-${activeClan.id}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === `intro-${activeClan.id}` ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                </button>
              </div>
              <p className={fontSizeLevel === 'large' ? 'text-base sm:text-lg leading-relaxed' : 'text-sm sm:text-base leading-relaxed'}>
                {activeClan.introductionBn}
              </p>
            </div>

            {/* If Banu Hashim: Embed Genealogy Chart */}
            {activeClan.id === 'banu-hashim' && (
              <div className={`p-5 sm:p-6 rounded-2xl border shadow-inner space-y-5 ${
                isDay ? 'bg-amber-50/60 border-amber-300' : 'bg-[#051e22] border-amber-500/40'
              }`}>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-500">
                    ঐতিহাসিক চিত্র
                  </span>
                  <h4 className="text-sm sm:text-base font-black tracking-tight mt-1">
                    বনু হাশিমের সংক্ষিপ্ত বংশধারা (নবীজি, আহলে বাইত ও খুলাফা)
                  </h4>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex justify-center">
                    <div className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-sm text-center shadow-md">
                      {BANU_HASHIM_GENEALOGY.rootName}
                    </div>
                  </div>
                  <div className="w-0.5 h-3 bg-amber-500/50 mx-auto" />

                  <div className="flex justify-center">
                    <div className={`px-6 py-3 rounded-xl border text-center shadow ${
                      isDay ? 'bg-white border-amber-300 text-teal-900' : 'bg-[#041417] border-amber-500/50 text-emerald-100'
                    }`}>
                      <div className="font-black text-sm sm:text-base">{BANU_HASHIM_GENEALOGY.son.name}</div>
                      <div className="text-[11px] opacity-75">{BANU_HASHIM_GENEALOGY.son.title}</div>
                    </div>
                  </div>
                  <div className="w-0.5 h-3 bg-amber-500/50 mx-auto" />

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

            {/* Sub-Clans if any */}
            {activeClan.subClans && activeClan.subClans.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                  <Building className="w-4 h-4" />
                  <span>গোত্রের প্রধান উপশাখাসমূহ ({activeClan.subClans.length}টি)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeClan.subClans.map((sc, scIdx) => (
                    <div
                      key={scIdx}
                      className={`p-3.5 rounded-xl border space-y-1.5 ${
                        isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#041417] border-[#153e46]'
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

            {/* Personalities Section (Hayatus Sahaba Card Grid) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>গোত্রের উল্লেখযোগ্য ব্যক্তিত্ব ({activeClan.personalities.length} জন)</span>
                </h4>
                <span className="text-xs opacity-60">ক্লিক করে সম্পূর্ণ জীবনী পড়ুন</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {activeClan.personalities.map((pers) => {
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
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-3 relative group hover:scale-[1.01] ${
                        isProphet
                          ? isDay ? 'bg-amber-50/70 border-amber-300 shadow-sm' : 'bg-amber-950/25 border-amber-500/40'
                          : isNegative
                          ? isDay ? 'bg-rose-50/50 border-rose-200' : 'bg-rose-950/20 border-rose-500/30'
                          : isDay
                          ? 'bg-slate-50 hover:bg-white border-slate-200 hover:border-teal-500 shadow-sm'
                          : 'bg-[#041417] hover:bg-[#072428] border-[#153e46] hover:border-emerald-500'
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

                          <button
                            onClick={(e) => toggleBookmark(pers.id, e)}
                            title={isBookmarked ? 'বুকমার্ক সরানো' : 'বুকমার্ক যুক্ত করুন'}
                            className={`p-1.5 rounded-lg border transition ${
                              isBookmarked
                                ? 'bg-amber-500 text-white border-amber-400'
                                : isDay ? 'bg-slate-100 text-slate-400 hover:text-slate-700 border-slate-200' : 'bg-[#082226] text-emerald-400/60 hover:text-emerald-300 border-[#153e46]'
                            }`}
                          >
                            <Bookmark className="w-3.5 h-3.5 fill-current" />
                          </button>
                        </div>

                        {/* Role Badge */}
                        <div className="text-xs font-semibold flex items-center gap-1.5 flex-wrap">
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
                          <span>বিস্তারিত</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* References */}
            {activeClan.referencesBn && activeClan.referencesBn.length > 0 && (
              <div className={`p-4 rounded-xl border text-xs space-y-2 ${
                isDay ? 'bg-slate-100/70 border-slate-200 text-slate-600' : 'bg-[#041417] border-[#153e46] text-emerald-300/80'
              }`}>
                <div className="font-bold text-amber-500 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>প্রামাণ্য রেফারেন্স ও গ্রন্থসূত্র</span>
                </div>
                <ol className="list-decimal pl-5 space-y-1">
                  {activeClan.referencesBn.map((ref, rIdx) => (
                    <li key={rIdx}>{ref}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Bottom Prev / Next Navigation Footer (Seerah Style) */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2">
              <button
                disabled={!hasPrevClan}
                onClick={handlePrevClan}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  hasPrevClan
                    ? 'bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 cursor-pointer'
                    : 'opacity-40 cursor-not-allowed border border-transparent'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>পূর্ববর্তী গোত্র</span>
              </button>

              <button
                onClick={() => setViewMode('directory')}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow cursor-pointer"
              >
                গোত্র ডিরেক্টরিতে ফিরুন
              </button>

              <button
                disabled={!hasNextClan}
                onClick={handleNextClan}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition ${
                  hasNextClan
                    ? 'bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 cursor-pointer'
                    : 'opacity-40 cursor-not-allowed border border-transparent'
                }`}
              >
                <span>পরবর্তী গোত্র</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          VIEW MODE 3: WHO IS WHO (কোন গোত্রে কে কে - ম্যাপিং চার্ট)
          ===================================================================== */}
      {viewMode === 'who_is_who' && (
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
                  { id: 1, label: 'কুরাইশ (মক্কা)' },
                  { id: 2, label: 'আনসার (মদিনা)' },
                  { id: 3, label: 'বৃহত্তর আরব' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      if (soundEnabled) soundHaptics.playTap();
                      setChapterFilter(cat.id as any);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                      chapterFilter === cat.id
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
            {filteredClans.map((clan) => {
              const sahaba = clan.personalities.filter(p => p.category === 'sahabi');
              const historical = clan.personalities.filter(p => p.category === 'historical' || p.category === 'historical_hanif');
              const negative = clan.personalities.filter(p => p.category === 'negative');

              return (
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
                      <span className="text-2xl">{CLAN_VISUAL_MAP[clan.id]?.icon || '🛡️'}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-base sm:text-lg font-black tracking-tight">{clan.tribeNameBn}</h4>
                          {clan.tribeNameAr && (
                            <span className="text-xs font-serif text-amber-500 font-bold">({clan.tribeNameAr})</span>
                          )}
                        </div>
                        <p className="text-xs opacity-75 mt-0.5">{clan.locationOrContextBn}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400">
                        মোট ব্যক্তিত্ব: {clan.personalities.length} জন
                      </span>
                      <button
                        onClick={() => openClanInReader(clan.id)}
                        className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>সীরাত আকারে পড়ুন</span>
                        <ChevronRight className="w-3.5 h-3.5" />
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
                        <strong className="text-amber-500">দায়িত্ব ও ভূমিকা:</strong> {clan.responsibilityOrRoleBn}
                      </div>
                    </div>

                    {/* Classified Personalities Matrix */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {/* Sahaba Category */}
                      {sahaba.length > 0 && (
                        <div className={`p-4 rounded-xl border space-y-2 ${
                          isDay ? 'bg-emerald-50/40 border-emerald-200' : 'bg-emerald-950/20 border-emerald-500/30'
                        }`}>
                          <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            <span className="flex items-center gap-1.5">
                              <span>🌿</span>
                              <span>সাহাবায়ে কেরাম (রা.) ({sahaba.length} জন)</span>
                            </span>
                          </div>
                          <div className="space-y-1.5">
                            {sahaba.map((s) => (
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
                      {historical.length > 0 && (
                        <div className={`p-4 rounded-xl border space-y-2 ${
                          isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#041417] border-[#153e46]'
                        }`}>
                          <div className="flex items-center justify-between text-xs font-bold text-amber-500">
                            <span className="flex items-center gap-1.5">
                              <span>📜</span>
                              <span>ঐতিহাসিক ও বিশিষ্ট ব্যক্তিত্ব ({historical.length} জন)</span>
                            </span>
                          </div>
                          <div className="space-y-1.5">
                            {historical.map((h) => (
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
                      {negative.length > 0 && (
                        <div className={`p-4 rounded-xl border space-y-2 md:col-span-2 ${
                          isDay ? 'bg-rose-50/40 border-rose-200' : 'bg-rose-950/20 border-rose-500/30'
                        }`}>
                          <div className="flex items-center justify-between text-xs font-bold text-rose-500">
                            <span className="flex items-center gap-1.5">
                              <span>⚔️</span>
                              <span>প্রতিপক্ষ ও চরম বিরুদ্ধাচরণকারী চরিত্র ({negative.length} জন)</span>
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                            {negative.map((n) => (
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
              );
            })}
          </div>
        </div>
      )}

      {/* =====================================================================
          VIEW MODE 4: CHARTS & VISUAL GENEALOGY GALLERY
          ===================================================================== */}
      {viewMode === 'charts_gallery' && (
        <div className="space-y-6">
          {/* Sub-tabs for Charts Gallery */}
          <div className={`p-1.5 rounded-2xl border flex items-center gap-1.5 overflow-x-auto scrollbar-none ${
            isDay ? 'bg-slate-100 border-slate-200' : 'bg-[#061e22] border-[#133c44]'
          }`}>
            <button
              onClick={() => setActiveChartTab('quraysh_roles')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeChartTab === 'quraysh_roles'
                  ? isDay ? 'bg-white text-teal-800 shadow' : 'bg-emerald-600 text-white shadow'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              🏛️ কুরাইশ দায়িত্ব বণ্টন চার্ট
            </button>

            <button
              onClick={() => setActiveChartTab('hashim_tree')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeChartTab === 'hashim_tree'
                  ? isDay ? 'bg-white text-teal-800 shadow' : 'bg-emerald-600 text-white shadow'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              🌳 বনু হাশিম বংশলতিকা চিত্র
            </button>

            <button
              onClick={() => setActiveChartTab('ansar_tree')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeChartTab === 'ansar_tree'
                  ? isDay ? 'bg-white text-teal-800 shadow' : 'bg-emerald-600 text-white shadow'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              🌿 আনসার গোত্র উপশাখা চিত্র
            </button>

            <button
              onClick={() => setActiveChartTab('arab_map')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeChartTab === 'arab_map'
                  ? isDay ? 'bg-white text-teal-800 shadow' : 'bg-emerald-600 text-white shadow'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              🧭 বৃহত্তর আরব গোত্র চার্ট
            </button>

            <button
              onClick={() => setActiveChartTab('statistics')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeChartTab === 'statistics'
                  ? isDay ? 'bg-white text-teal-800 shadow' : 'bg-emerald-600 text-white shadow'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              📊 ব্যক্তিত্বের বার চার্ট
            </button>
          </div>

          {/* Chart 1: Quraish Roles */}
          {activeChartTab === 'quraysh_roles' && (
            <div className="space-y-4">
              <div className={`p-5 rounded-2xl border space-y-1.5 ${
                isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
              }`}>
                <h3 className="text-base font-black text-amber-500 flex items-center gap-2">
                  <Building className="w-5 h-5" />
                  <span>এক নজরে : কুরাইশ শাখাগুলোর দায়িত্ব ও প্রশাসনিক ভূমিকা</span>
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
                          <span className="text-xs opacity-60">কুরাইশ শাখা {idx + 1}</span>
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
                      <span>গোত্রের বিস্তারিত পাঠ দেখুন</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chart 2: Hashim Genealogy Tree */}
          {activeChartTab === 'hashim_tree' && (
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
            }`}>
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider">ঐতিহাসিক শাজারা শরীফ</span>
                <h3 className="text-xl sm:text-2xl font-black">বনু হাশিমের সংক্ষিপ্ত বংশধারা চিত্র</h3>
                <p className="text-xs sm:text-sm opacity-80">
                  হাশিম ইবনে আবদে মানাফ থেকে আবদুল মুত্তালিব, রাসূলুল্লাহ ﷺ, খুলাফায়ে রাশিদিন ও আহলে বাইত
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex justify-center">
                  <div className="px-6 py-2.5 rounded-2xl bg-amber-500 text-slate-950 font-black text-sm text-center shadow-md">
                    {BANU_HASHIM_GENEALOGY.rootName}
                  </div>
                </div>
                <div className="w-0.5 h-4 bg-amber-500/50 mx-auto" />

                <div className="flex justify-center">
                  <div className={`px-6 py-3 rounded-2xl border text-center shadow ${
                    isDay ? 'bg-teal-50 border-teal-300 text-teal-900' : 'bg-[#041417] border-emerald-500/50 text-emerald-100'
                  }`}>
                    <div className="font-black text-base">{BANU_HASHIM_GENEALOGY.son.name}</div>
                    <div className="text-[11px] opacity-75">{BANU_HASHIM_GENEALOGY.son.title}</div>
                  </div>
                </div>
                <div className="w-0.5 h-4 bg-emerald-500/50 mx-auto" />

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2">
                  {BANU_HASHIM_GENEALOGY.son.sons.map((son, sIdx) => (
                    <div
                      key={sIdx}
                      className={`p-3.5 rounded-2xl border text-center space-y-1.5 ${
                        son.name === 'আব্দুল্লাহ'
                          ? 'border-amber-500 bg-amber-500/10 shadow'
                          : son.name === 'আবু লাহাব'
                          ? 'border-rose-500/40 bg-rose-500/5'
                          : isDay ? 'border-slate-200 bg-slate-50' : 'border-[#153e46] bg-[#041417]'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm">{son.name}</div>
                      <div className="text-[10px] opacity-75">{son.desc}</div>

                      {son.children && son.children.length > 0 && (
                        <div className="pt-2 border-t border-dashed border-slate-300 dark:border-slate-700 space-y-1">
                          {son.children.map((child: any, cIdx: number) => (
                            <div
                              key={cIdx}
                              className={`p-1.5 rounded-xl text-[10px] font-bold ${
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
                                <div className="text-[9px] opacity-80 font-normal mt-0.5 text-amber-300">
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

          {/* Chart 3: Ansar Tree */}
          {activeChartTab === 'ansar_tree' && (
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
            }`}>
              <div className="space-y-1">
                <span className="text-xs font-bold text-teal-500 uppercase tracking-wider">মদিনার পবিত্র বংশধারা</span>
                <h3 className="text-xl sm:text-2xl font-black">মদিনার আনসার গোত্র ও তাদের উপশাখা চিত্র</h3>
                <p className="text-xs sm:text-sm opacity-80">
                  ইয়েমেনের প্রাচীন ‘আজদ’ বংশ থেকে আওস ও খাযরাজ গোত্রের শাখা বিন্যাস ও দলপতি
                </p>
              </div>

              <div className="flex justify-center">
                <div className="px-6 py-2.5 rounded-2xl bg-teal-600 text-white font-black text-sm text-center shadow-md">
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
                      <span className="text-xs opacity-75 font-bold">{branch.subClans.length}টি প্রধান উপশাখা</span>
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
          )}

          {/* Chart 4: Greater Arab Overview */}
          {activeChartTab === 'arab_map' && (
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-5 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
            }`}>
              <div className="space-y-1">
                <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">অঞ্চলভিত্তিক গোত্র বিন্যাস</span>
                <h3 className="text-xl sm:text-2xl font-black">বৃহত্তর আরবের প্রধান গোত্রসমূহের ওভারভিউ চার্ট</h3>
                <p className="text-xs sm:text-sm opacity-80">
                  নজদ, তায়েফ, হিজাজ ও আরব সীমান্তের ১১টি পরাক্রমশালী গোত্র ও তাদের বৈশিষ্ট্য
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {CHAPTER3_OVERVIEW.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border space-y-1.5 ${
                      isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#041417] border-[#153e46]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-black text-sm text-emerald-400">{item.clanBn}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
                        {item.sectionCode}
                      </span>
                    </div>
                    <p className="text-xs text-amber-500 flex items-center gap-1 font-semibold">
                      <MapPin className="w-3 h-3" />
                      <span>{item.locationBn}</span>
                    </p>
                    <p className="text-xs opacity-80 leading-relaxed">{item.noteBn}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chart 5: Statistics Bar Chart */}
          {activeChartTab === 'statistics' && (
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
            }`}>
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider">তুলনামূলক পরিসংখ্যান</span>
                <h3 className="text-xl sm:text-2xl font-black">তালিকায় উল্লিখিত ব্যক্তিত্বের তুলনামূলক বার চার্ট</h3>
                <p className="text-xs sm:text-sm opacity-80">
                  ১ থেকে ১৩ নম্বর মূল তালিকা অনুযায়ী আরবের শীর্ষ গোত্রগুলোতে বিশিষ্ট ব্যক্তিত্বের সংখ্যা
                </p>
              </div>

              <div className="space-y-4 pt-2">
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
        </div>
      )}

      {/* =====================================================================
          VIEW MODE 5: ALL 40 TRIBES DIRECTORY (সংযুক্তি ১–৪০)
          ===================================================================== */}
      {viewMode === 'appendix40' && (
        <div className="space-y-6">
          <div className={`p-5 rounded-2xl border leading-relaxed flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
            isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
          }`}>
            <div>
              <h3 className="text-base font-black text-amber-500 flex items-center gap-2">
                <Scroll className="w-5 h-5" />
                <span>সংযুক্তি : আরবের পূর্ণাঙ্গ ৪০টি গোত্রের এনসাইক্লোপিডিয়া</span>
              </h3>
              <p className="text-xs sm:text-sm opacity-80 leading-relaxed mt-1">
                আরবের শীর্ষ ৪০টি গোত্রের উৎপত্তি, ভৌগোলিক অবস্থান, ইসলাম গ্রহণকারী সাহাবি ও ঐতিহাসিক চরিত্র
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

      {/* =====================================================================
          VIEW MODE 6: BOOKMARKS
          ===================================================================== */}
      {viewMode === 'bookmarks' && (
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

      {/* Personality Detail Modal */}
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

      {/* Responsibility Detail Modal */}
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
                  <span className="text-xs opacity-60">কুরাইশ প্রশাসন</span>
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
                  const targetId =
                    selectedResponsibility.clanBn.includes('হাশিম') ? 'banu-hashim' :
                    selectedResponsibility.clanBn.includes('উমাইয়া') ? 'banu-umayya' :
                    selectedResponsibility.clanBn.includes('মাখযুম') ? 'banu-makhzum' :
                    selectedResponsibility.clanBn.includes('আদি') ? 'banu-adi' :
                    selectedResponsibility.clanBn.includes('তাইম') ? 'banu-taym' :
                    selectedResponsibility.clanBn.includes('আসাদ') ? 'banu-asad-quraysh' :
                    selectedResponsibility.clanBn.includes('যোহরা') ? 'banu-zuhrah' : 'quraysh-other-branches';
                  openClanInReader(targetId);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white cursor-pointer shadow"
              >
                গোত্রের সীরাত পাঠ দেখুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
