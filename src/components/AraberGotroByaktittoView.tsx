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
  QURAYSH_CONVERGENCE_TREE,
  ARABIAN_TRIBAL_GEO_REGIONS,
  SPECIAL_HISTORICAL_CROSS_INDEX,
  TopicTocItem,
  TribePersonality,
  TribeSection,
  AppendixTribe,
  ClanResponsibility,
  QurayshConvergenceNode,
  ArabianRegionGeo,
  SpecialCategoryCrossItem
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
  RotateCcw,
  Volume2,
  Share2
} from 'lucide-react';
import { soundHaptics, playArabicVoice } from '../utils/audioHaptics';

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
  const [activeChartTab, setActiveChartTab] = useState<'quraysh_roles' | 'quraysh_convergence' | 'hashim_tree' | 'ansar_tree' | 'arab_map' | 'statistics'>('quraysh_roles');
  const [selectedSpecialCategory, setSelectedSpecialCategory] = useState<'all' | 'ashara_mubashshara' | 'mothers_of_believers' | 'caliphs'>('all');
  const [activeGeoRegionId, setActiveGeoRegionId] = useState<string>('geo-makkah');
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const [appendixFilter, setAppendixFilter] = useState<string>('all');
  const [activePersonalityModal, setActivePersonalityModal] = useState<TribePersonality | null>(null);
  const [selectedResponsibility, setSelectedResponsibility] = useState<ClanResponsibility | null>(null);
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large'>('normal');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [selectedTocTopicId, setSelectedTocTopicId] = useState<string>('all');
  const [collapsedTopics, setCollapsedTopics] = useState<Record<string, boolean>>({});
  const [isTocDrawerOpen, setIsTocDrawerOpen] = useState<boolean>(false);
  const [tocSearchQuery, setTocSearchQuery] = useState<string>('');
  const [qurayshRoleFilter, setQurayshRoleFilter] = useState<'all' | 'kaba_service' | 'military' | 'judiciary' | 'parliament'>('all');
  const [hashimTreeBranch, setHashimTreeBranch] = useState<'all' | 'prophet' | 'martyrs_caliphs' | 'uncles'>('all');
  const [ansarTab, setAnsarTab] = useState<'tree' | 'comparison' | 'virtues'>('tree');
  const [statsSort, setStatsSort] = useState<'highest' | 'alphabetical'>('highest');

  const handlePlayVoice = (text: string, voiceKey: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (soundEnabled) soundHaptics.playTap();
    setPlayingVoiceId(voiceKey);
    playArabicVoice(text, 'male', () => {
      setPlayingVoiceId(null);
    });
  };

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

  const openChart = (chartKey?: 'quraysh_roles' | 'quraysh_convergence' | 'hashim_tree' | 'ansar_tree' | 'arab_map' | 'statistics') => {
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
      const q = (tocSearchQuery || searchQuery).toLowerCase().trim();
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
  }, [selectedTocTopicId, searchQuery, tocSearchQuery]);

  // Filtered Responsibilities for Chart 1
  const filteredResponsibilities = useMemo(() => {
    if (qurayshRoleFilter === 'all') return MAKKAH_RESPONSIBILITIES;
    return MAKKAH_RESPONSIBILITIES.filter((r) => r.category === qurayshRoleFilter);
  }, [qurayshRoleFilter]);

  // Sorted statistics for Chart 5
  const sortedStatistics = useMemo(() => {
    const list = [...TRIBE_STATISTICS];
    if (statsSort === 'highest') {
      return list.sort((a, b) => b.count - a.count);
    }
    if (statsSort === 'alphabetical') {
      return list.sort((a, b) => a.nameBn.localeCompare(b.nameBn));
    }
    return list;
  }, [statsSort]);

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
      {/* 1. Header Banner (Single Unified, Compact, Ultra-Attractive, High-Density) */}
      <div className={`relative overflow-hidden rounded-xl p-3 sm:p-4 mb-3 shadow-sm border ${
        isDay
          ? 'bg-gradient-to-r from-teal-900 via-emerald-850 to-teal-950 text-white border-teal-700/60'
          : 'bg-gradient-to-r from-[#061e22] via-[#092a30] to-[#041518] text-white border-emerald-500/30'
      }`}>
        <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
          <Shield className="w-36 h-36 text-emerald-300" />
        </div>

        <div className="relative z-10 space-y-2">
          {/* Top Bar inside Banner */}
          <div className="flex items-center justify-between gap-2 flex-wrap text-[11px]">
            {onBack && (
              <button
                onClick={() => {
                  if (soundEnabled) soundHaptics.playTap();
                  onBack();
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-white/10 hover:bg-white/20 backdrop-blur-md transition cursor-pointer text-white border border-white/20 shadow-2xs"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>লাইব্রেরিতে ফিরুন</span>
              </button>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-[10px] font-serif text-emerald-200/90 tracking-wide font-medium">
                {BOOK_METADATA.titleAr}
              </span>
              <span className="text-[9px] px-2 py-0.2 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold whitespace-nowrap">
                প্রামাণ্য ঐতিহাসিক সীরাত কোষ
              </span>
            </div>
          </div>

          {/* Banner Title & Description */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <div>
              <h1 className="text-base sm:text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                <span className="text-lg">🛡️</span>
                <span>{BOOK_METADATA.titleBn} (প্রামাণ্য ঐতিহাসিক সীরাত কোষ)</span>
              </h1>
              <p className="text-[11px] sm:text-xs text-emerald-100/90 leading-relaxed max-w-3xl mt-0.5">
                প্রাক-ইসলামী ও সীরাত যুগে মক্কার কাবার প্রশাসনিক দায়িত্ব, মদিনার আনসার ভ্রাতৃত্ব এবং সমগ্র আরব উপদ্বীপের শীর্ষ গোত্র ও ব্যক্তিত্বের প্রামাণ্য ইতিহাস।
              </p>
            </div>
          </div>

          {/* Compact 4-Metric Strip */}
          <div className="pt-2 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px]">
            <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-lg border border-white/10">
              <span className="text-xs">🗺️</span>
              <div>
                <span className="text-emerald-200/70 block text-[9px]">মূল পরিমণ্ডল</span>
                <span className="font-bold text-white truncate block">মক্কা, মদিনা ও আরব</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-lg border border-white/10">
              <span className="text-xs">🕋</span>
              <div>
                <span className="text-emerald-200/70 block text-[9px]">কাবার শাসন</span>
                <span className="font-bold text-white truncate block">১০টি কুরাইশ দপ্তর</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-lg border border-white/10">
              <span className="text-xs">📜</span>
              <div>
                <span className="text-emerald-200/70 block text-[9px]">গোত্র কোষ</span>
                <span className="font-bold text-amber-300 truncate block">৪০টি ঐতিহাসিক গোত্র</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-lg border border-white/10">
              <span className="text-xs">📊</span>
              <div>
                <span className="text-emerald-200/70 block text-[9px]">তথ্যসূত্র</span>
                <span className="font-bold text-emerald-200 truncate block">ইবনে হিশাম ও সীরাত</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Primary Navigation Mode Bar (Compact, High Density) */}
      <div className={`p-1 rounded-xl border mb-4 flex items-center gap-1 overflow-x-auto scrollbar-none ${
        isDay ? 'bg-slate-100 border-slate-200' : 'bg-[#061e22] border-[#133c44]'
      }`}>
        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setViewMode('topic_toc');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            viewMode === 'topic_toc'
              ? isDay ? 'bg-white text-teal-800 shadow-xs' : 'bg-emerald-600 text-white shadow-xs'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>বিষয়ভিত্তিক সূচিপত্র</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setViewMode('directory');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            viewMode === 'directory'
              ? isDay ? 'bg-white text-teal-800 shadow-xs' : 'bg-emerald-600 text-white shadow-xs'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>গোত্র ডিরেক্টরি</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setViewMode('reader');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            viewMode === 'reader'
              ? isDay ? 'bg-white text-teal-800 shadow-xs' : 'bg-emerald-600 text-white shadow-xs'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <BookMarked className="w-3.5 h-3.5 text-amber-400" />
          <span>গোত্র পাঠ (সীরাত)</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setViewMode('who_is_who');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            viewMode === 'who_is_who'
              ? isDay ? 'bg-white text-teal-800 shadow-xs' : 'bg-emerald-600 text-white shadow-xs'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-teal-400" />
          <span>কোন গোত্রে কে কে (ম্যাপিং)</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setViewMode('charts_gallery');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            viewMode === 'charts_gallery'
              ? isDay ? 'bg-white text-teal-800 shadow-xs' : 'bg-emerald-600 text-white shadow-xs'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <GitFork className="w-3.5 h-3.5 text-emerald-400" />
          <span>চার্ট ও বংশধারা</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setViewMode('appendix40');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            viewMode === 'appendix40'
              ? isDay ? 'bg-white text-teal-800 shadow-xs' : 'bg-emerald-600 text-white shadow-xs'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <Scroll className="w-3.5 h-3.5" />
          <span>৪০টি গোত্র কোষ</span>
        </button>

        <button
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setViewMode('bookmarks');
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
            viewMode === 'bookmarks'
              ? isDay ? 'bg-white text-teal-800 shadow-xs' : 'bg-emerald-600 text-white shadow-xs'
              : isDay ? 'text-slate-600 hover:text-slate-900' : 'text-emerald-300/80 hover:text-white'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>বুকমার্ক ({bookmarkedPersonalities.length})</span>
        </button>
      </div>

      {/* 3. Global Search & Font Size Controls */}
      <div className={`p-2.5 sm:p-3 rounded-xl border mb-4 flex flex-col sm:flex-row items-center gap-2.5 justify-between ${
        isDay ? 'bg-white border-slate-200 shadow-xs' : 'bg-[#082226] border-[#153e46]'
      }`}>
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="গোত্র, সাহাবি, উপাধি বা হাদিস সূত্র অনুসন্ধান..."
            className={`w-full pl-9 pr-7 py-1.5 rounded-lg text-xs border outline-none transition ${
              isDay
                ? 'bg-slate-50 border-slate-200 focus:border-teal-600 text-slate-800'
                : 'bg-[#041417] border-[#153e46] focus:border-emerald-500 text-emerald-100 placeholder-emerald-400/50'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-rose-500 font-bold"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end text-xs font-semibold">
          <div className="flex items-center gap-1 border rounded-lg p-0.5 bg-black/5 dark:bg-black/20 border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setFontSizeLevel('normal')}
              className={`px-2 py-0.5 rounded text-[11px] transition ${
                fontSizeLevel === 'normal'
                  ? isDay ? 'bg-white shadow-xs text-teal-800 font-bold' : 'bg-emerald-600 text-white font-bold'
                  : 'opacity-70'
              }`}
            >
              স্বাভাবিক
            </button>
            <button
              onClick={() => setFontSizeLevel('large')}
              className={`px-2 py-0.5 rounded text-[11px] transition ${
                fontSizeLevel === 'large'
                  ? isDay ? 'bg-white shadow-xs text-teal-800 font-bold' : 'bg-emerald-600 text-white font-bold'
                  : 'opacity-70'
              }`}
            >
              বড় (A+)
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          VIEW MODE 0: TOPIC-WISE INDEX (বিষয়ভিত্তিক সূচিপত্র)
          Comprehensive Thematic Table of Contents with zero page numbers
          ===================================================================== */}
      {/* =====================================================================
          VIEW MODE 0: HAYATUS SAHABA STYLE TABLE OF CONTENTS (বইয়ের মূল সূচিপত্র)
          Book Table of Contents with category summary cards and numbered lists
          ===================================================================== */}
      {viewMode === 'topic_toc' && (
        <div className="space-y-3">
          {/* 3. Search Bar with Instant Reset */}
          <div className={`p-2.5 sm:p-3 rounded-xl border shadow-xs ${isDay ? 'bg-white border-slate-200' : 'bg-[#0b2228] border-[#16424b]'}`}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                value={tocSearchQuery}
                onChange={(e) => setTocSearchQuery(e.target.value)}
                placeholder="সূচিপত্রে খুঁজুন (যেমন: হাশিম, উমর, খালিদ, কাবার চাবি, সিকায়া, খাযরাজ, বদর, তায়েফ...)"
                className={`w-full pl-9 pr-7 py-1.5 rounded-lg border text-xs font-semibold transition focus:outline-none ${
                  isDay
                    ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500'
                    : 'bg-[#07171c] border-teal-900/60 text-white focus:border-emerald-500'
                }`}
              />
              {tocSearchQuery && (
                <button
                  onClick={() => setTocSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* 4. BOOK TABLE OF CONTENTS (TOC) — 5 CATEGORY BOXES WITH NUMBERED LISTS (COMPACT) */}
          <div className={`p-3.5 sm:p-4 rounded-2xl border shadow-md space-y-4 ${
            isDay ? 'bg-white border-amber-200 text-slate-900' : 'bg-[#0b1f24] border-amber-500/30 text-white'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-amber-500/20">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xs">
                  📖
                </span>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-amber-600 dark:text-amber-400">
                    সূচিপত্র (Table of Contents)
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-teal-300">
                    যেকোনো গোত্র বা চার্টে স্পর্শ করে সরাসরি সম্পূর্ণ অধ্যায় পড়ুন
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {selectedTocTopicId !== 'all' && (
                  <button
                    onClick={() => {
                      if (soundEnabled) soundHaptics.playTap();
                      setSelectedTocTopicId('all');
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 transition cursor-pointer"
                  >
                    সকল বিষয় ✕
                  </button>
                )}
                <button
                  onClick={() => {
                    if (soundEnabled) soundHaptics.playTap();
                    setActiveChartTab('quraysh_roles');
                    setViewMode('charts_gallery');
                  }}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-600 text-white shadow-xs hover:bg-emerald-500 transition cursor-pointer flex items-center gap-1"
                >
                  <span>📊 সকল চার্ট</span>
                </button>
              </div>
            </div>

            {/* Category Boxes Grid with Numbered Lists inside */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {TOPIC_WISE_TOC_DATA
                .filter(topic => selectedTocTopicId === 'all' || topic.id === selectedTocTopicId)
                .map((topic) => {
                  const filteredSubs = topic.subsections.filter(s =>
                    !tocSearchQuery.trim() ||
                    s.titleBn.toLowerCase().includes(tocSearchQuery.toLowerCase()) ||
                    s.subtitleBn.toLowerCase().includes(tocSearchQuery.toLowerCase()) ||
                    s.badgeBn.toLowerCase().includes(tocSearchQuery.toLowerCase()) ||
                    s.figuresPreview?.some(f => f.toLowerCase().includes(tocSearchQuery.toLowerCase()))
                  );

                  if (filteredSubs.length === 0 && tocSearchQuery.trim()) return null;

                  return (
                    <div
                      key={topic.id}
                      className={`p-3 sm:p-3.5 rounded-xl border shadow-xs space-y-2 flex flex-col justify-between ${
                        isDay
                          ? 'bg-gradient-to-b from-amber-50/40 via-white to-white border-amber-200/80 text-slate-900'
                          : 'bg-gradient-to-b from-[#0f282e] via-[#091a1e] to-[#071518] border-teal-800/50 text-white'
                      }`}
                    >
                      {/* Category Header Box */}
                      <div className="flex items-center justify-between pb-1.5 border-b border-amber-500/20">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-base shrink-0">{topic.icon}</span>
                          <div>
                            <span className="text-[9px] font-bold uppercase text-amber-500 block">
                              বিষয় {topic.topicNumber}
                            </span>
                            <h4 className="font-extrabold text-xs text-amber-700 dark:text-amber-300 truncate">
                              {topic.themeBadgeBn}
                            </h4>
                          </div>
                        </div>
                        <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                          {filteredSubs.length}টি বিষয়
                        </span>
                      </div>

                      {/* Numbered List of Chapters/Subsections */}
                      <div className="space-y-1 max-h-60 overflow-y-auto pr-0.5 scrollbar-thin">
                        {filteredSubs.map((sub, sIdx) => {
                          const isChart = sub.type === 'chart';
                          return (
                            <div
                              key={sIdx}
                              onClick={() => {
                                if (soundEnabled) soundHaptics.playTap();
                                if (isChart && sub.chartKey) {
                                  openChart(sub.chartKey);
                                } else if (sub.id.startsWith('appendix-')) {
                                  openAppendixCategory(sub.titleBn.split(' ')[0]);
                                } else {
                                  openClanInReader(sub.id);
                                }
                              }}
                              className={`p-2 rounded-lg border text-xs font-semibold transition cursor-pointer flex items-center justify-between gap-1.5 ${
                                isChart
                                  ? isDay
                                    ? 'bg-amber-100/70 hover:bg-amber-100 border-amber-300 text-amber-950 font-bold'
                                    : 'bg-amber-950/30 hover:bg-amber-950/50 border-amber-500/40 text-amber-300 font-bold'
                                  : isDay
                                  ? 'bg-white hover:bg-emerald-50 border-slate-200 text-slate-800 hover:border-emerald-300'
                                  : 'bg-[#07181c] hover:bg-[#0f323a] border-teal-900/50 text-slate-200 hover:border-emerald-500/50'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span className="font-mono text-[10px] text-amber-500 font-bold shrink-0">
                                  {isChart ? '📊' : `${sIdx + 1}.`}
                                </span>
                                <div className="truncate">
                                  <div className="truncate text-[11px]">{sub.titleBn}</div>
                                  <div className="text-[9px] opacity-70 truncate font-normal">
                                    {sub.subtitleBn}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                <span className={`text-[8px] px-1 py-0.2 rounded font-black hidden sm:inline ${
                                  isChart ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/10 text-emerald-400'
                                }`}>
                                  {isChart ? 'চার্ট' : 'পাঠ'}
                                </span>
                                <ChevronRight className="w-3 h-3 text-emerald-500" />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Topic Footer Quick Link */}
                      {topic.relatedChartKey && (
                        <div className="pt-1.5 border-t border-slate-200/40 dark:border-slate-800/60 flex items-center justify-between text-[10px]">
                          <span className="opacity-75 truncate max-w-[150px] text-amber-500 font-medium">
                            📊 {topic.relatedChartTitleBn}
                          </span>
                          <button
                            onClick={() => openChart(topic.relatedChartKey)}
                            className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>চার্ট</span>
                            <ChevronRight className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          VIEW MODE 1: ATTRACTIVE GOTRO DIRECTORY (COMPACT)
          ===================================================================== */}
      {viewMode === 'directory' && (
        <div className="space-y-4">
          {/* 3 Major Era/Chapter Showcase Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <div
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setChapterFilter(chapterFilter === 1 ? 'all' : 1);
              }}
              className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2 relative overflow-hidden ${
                chapterFilter === 1
                  ? isDay ? 'bg-teal-700 text-white border-teal-600 shadow-sm' : 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : isDay ? 'bg-white border-slate-200 hover:border-teal-400' : 'bg-[#082226] border-[#153e46] hover:border-emerald-500'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                    chapterFilter === 1 ? 'bg-white/20 text-white' : 'bg-amber-500/15 text-amber-500 font-black'
                  }`}>
                    বিষয় ০১
                  </span>
                  <span className="text-base">🏛️</span>
                </div>
                <h3 className="text-sm sm:text-base font-black tracking-tight mt-0.5">
                  মক্কার কুরাইশ গোত্রসমূহ
                </h3>
                <p className={`text-[11px] leading-relaxed line-clamp-2 ${chapterFilter === 1 ? 'text-white/80' : 'opacity-70'}`}>
                  পবিত্র কাবার খেদমত, ১০টি প্রধান কুরাইশ দায়িত্ব বণ্টন ও অভিজাত বংশসমূহ
                </p>
              </div>

              <div className="pt-1.5 border-t border-dashed border-white/20 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold">
                <span>৮টি মূল শাখা</span>
                <span className={chapterFilter === 1 ? 'text-amber-200' : 'text-emerald-500'}>
                  {chapterFilter === 1 ? 'নির্বাচিত ✓' : 'ফিল্টার →'}
                </span>
              </div>
            </div>

            <div
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setChapterFilter(chapterFilter === 2 ? 'all' : 2);
              }}
              className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2 relative overflow-hidden ${
                chapterFilter === 2
                  ? isDay ? 'bg-teal-700 text-white border-teal-600 shadow-sm' : 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : isDay ? 'bg-white border-slate-200 hover:border-teal-400' : 'bg-[#082226] border-[#153e46] hover:border-emerald-500'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                    chapterFilter === 2 ? 'bg-white/20 text-white' : 'bg-teal-500/15 text-teal-400 font-black'
                  }`}>
                    বিষয় ০২
                  </span>
                  <span className="text-base">🌴</span>
                </div>
                <h3 className="text-sm sm:text-base font-black tracking-tight mt-0.5">
                  মদিনার আনসার ও অন্যান্য
                </h3>
                <p className={`text-[11px] leading-relaxed line-clamp-2 ${chapterFilter === 2 ? 'text-white/80' : 'opacity-70'}`}>
                  ইয়েমেনের আজদ বংশ, খাযরাজ ও আওস ভ্রাতৃত্ব এবং মদিনার ইহুদি গোত্রসমূহ
                </p>
              </div>

              <div className="pt-1.5 border-t border-dashed border-white/20 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold">
                <span>আওস, খাযরাজ ও ইহুদি</span>
                <span className={chapterFilter === 2 ? 'text-amber-200' : 'text-teal-400'}>
                  {chapterFilter === 2 ? 'নির্বাচিত ✓' : 'ফিল্টার →'}
                </span>
              </div>
            </div>

            <div
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setChapterFilter(chapterFilter === 3 ? 'all' : 3);
              }}
              className={`p-3 sm:p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-2 relative overflow-hidden ${
                chapterFilter === 3
                  ? isDay ? 'bg-teal-700 text-white border-teal-600 shadow-sm' : 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : isDay ? 'bg-white border-slate-200 hover:border-teal-400' : 'bg-[#082226] border-[#153e46] hover:border-emerald-500'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                    chapterFilter === 3 ? 'bg-white/20 text-white' : 'bg-orange-500/15 text-orange-400 font-black'
                  }`}>
                    বিষয় ০৩
                  </span>
                  <span className="text-base">🧭</span>
                </div>
                <h3 className="text-sm sm:text-base font-black tracking-tight mt-0.5">
                  আরবের অন্যান্য গোত্র
                </h3>
                <p className={`text-[11px] leading-relaxed line-clamp-2 ${chapterFilter === 3 ? 'text-white/80' : 'opacity-70'}`}>
                  তায়েফের সাকীফ, নজদের হাওয়াযিন, হুদাইবিয়ার খুযা'আ, গিফার ও তামিম
                </p>
              </div>

              <div className="pt-1.5 border-t border-dashed border-white/20 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold">
                <span>১১টি গোত্র</span>
                <span className={chapterFilter === 3 ? 'text-amber-200' : 'text-orange-400'}>
                  {chapterFilter === 3 ? 'নির্বাচিত ✓' : 'ফিল্টার →'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Shortcuts to Visual Charts */}
          <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-2 overflow-x-auto scrollbar-none ${
            isDay ? 'bg-teal-50/70 border-teal-200' : 'bg-[#051e22] border-emerald-500/20'
          }`}>
            <span className="text-[11px] font-bold text-amber-500 flex items-center gap-1 whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5" />
              <span>গুরুত্বপূর্ণ চার্টসমূহ:</span>
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setViewMode('charts_gallery');
                  setActiveChartTab('quraysh_roles');
                }}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 whitespace-nowrap transition cursor-pointer"
              >
                🏛️ কুরাইশ দায়িত্ব চার্ট
              </button>

              <button
                onClick={() => {
                  setViewMode('charts_gallery');
                  setActiveChartTab('hashim_tree');
                }}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 whitespace-nowrap transition cursor-pointer"
              >
                🌳 বনু হাশিম বংশলতিকা
              </button>

              <button
                onClick={() => {
                  setViewMode('charts_gallery');
                  setActiveChartTab('ansar_tree');
                }}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-teal-500/15 text-teal-400 border border-teal-500/30 hover:bg-teal-500/25 whitespace-nowrap transition cursor-pointer"
              >
                🌿 আনসার গোত্র শাখা
              </button>

              <button
                onClick={() => {
                  setViewMode('charts_gallery');
                  setActiveChartTab('statistics');
                }}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/25 whitespace-nowrap transition cursor-pointer"
              >
                📊 ব্যক্তিত্ব বার চার্ট
              </button>
            </div>
          </div>

          {/* Compact Clan Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
                  className={`p-3.5 sm:p-4 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between gap-3 group hover:scale-[1.01] shadow-2xs hover:shadow-xs ${
                    isDay
                      ? `bg-gradient-to-br ${meta.gradientDay} ${meta.borderDay} hover:border-teal-500`
                      : `bg-gradient-to-br ${meta.gradientNight} ${meta.borderNight} hover:border-emerald-400`
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg bg-white/20 dark:bg-black/30 backdrop-blur-sm border border-white/30 dark:border-white/10 shrink-0 shadow-2xs">
                          {meta.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h4 className="text-sm font-black tracking-tight group-hover:text-amber-400 transition">
                              {sec.tribeNameBn}
                            </h4>
                            {sec.tribeNameAr && (
                              <span className="text-[10px] font-serif text-amber-500/80 font-bold hidden sm:inline">
                                ({sec.tribeNameAr})
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] opacity-75 block mt-0.5">
                            {sec.locationOrContextBn}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 shrink-0">
                        {sec.personalities.length} জন
                      </span>
                    </div>

                    {/* Role / Responsibility Badge */}
                    <div className="p-2 rounded-lg bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 text-[11px]">
                      <span className="font-bold text-amber-500 block mb-0.5">দায়িত্ব ও ভূমিকা:</span>
                      <p className="leading-relaxed opacity-90 line-clamp-2">
                        {sec.responsibilityOrRoleBn}
                      </p>
                    </div>

                    {/* Prominent Personalities Preview */}
                    {prominentSahaba.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                          উল্লেখযোগ্য ব্যক্তিত্ব:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {prominentSahaba.map((name, nIdx) => (
                            <span
                              key={nIdx}
                              className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/5"
                            >
                              {name}
                            </span>
                          ))}
                          {sec.personalities.length > 3 && (
                            <span className="text-[9px] font-bold opacity-60 self-center">
                              +{sec.personalities.length - 3} জন
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-dashed border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition">
                      <span>সীরাত বিবরণী পড়ুন</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[9px] opacity-70">
                      {sec.subClans ? `${sec.subClans.length} উপশাখা` : 'মূল বংশ'}
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
          <div className={`p-4 sm:p-5 rounded-2xl border shadow-md space-y-4 ${
            isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl bg-amber-500/15 border border-amber-500/30 shadow-xs shrink-0">
                  {CLAN_VISUAL_MAP[activeClan.id]?.icon || '🛡️'}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-400">
                      {activeClan.sectionCode}
                    </span>
                    <h2 className="text-lg sm:text-xl font-black tracking-tight">{activeClan.tribeNameBn}</h2>
                    {activeClan.tribeNameAr && (
                      <span className="text-xs font-serif text-amber-500 font-bold">
                        ({activeClan.tribeNameAr})
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    <span>{activeClan.locationOrContextBn}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 self-end sm:self-center">
                <button
                  disabled={!hasPrevClan}
                  onClick={handlePrevClan}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition ${
                    hasPrevClan ? 'cursor-pointer hover:bg-black/5 dark:hover:bg-white/10' : 'opacity-40 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">পূর্ববর্তী গোত্র</span>
                </button>
                <button
                  disabled={!hasNextClan}
                  onClick={handleNextClan}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition ${
                    hasNextClan ? 'cursor-pointer hover:bg-black/5 dark:hover:bg-white/10' : 'opacity-40 cursor-not-allowed'
                  }`}
                >
                  <span className="hidden sm:inline">পরবর্তী গোত্র</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Responsibility / Role Card */}
            <div className={`p-3 rounded-xl border space-y-1 ${
              isDay ? 'bg-amber-50/80 border-amber-300' : 'bg-[#051e22] border-amber-500/30'
            }`}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5" />
                <span>মক্কার ঐতিহাসিক দায়িত্ব ও মর্যাদা</span>
              </div>
              <p className="text-xs sm:text-sm font-bold leading-relaxed">
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
          <div className={`p-5 sm:p-6 rounded-2xl border leading-relaxed space-y-4 ${
            isDay ? 'bg-white border-slate-200 shadow-sm' : 'bg-[#082226] border-[#153e46]'
          }`}>
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h3 className="text-base sm:text-lg font-black text-amber-500 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span>কোন গোত্রে কে কে : গোত্র ও ব্যক্তিত্বের পূর্ণাঙ্গ ম্যাপিং চার্ট</span>
                </h3>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed mt-1">
                  আরবের প্রতিটি প্রধান গোত্র অনুযায়ী কে কোন গোত্রের সন্তান, ইসলাম গ্রহণকারী সাহাবায়ে কেরাম (রা.), উম্মাহাতুল মুমিনীন ও ঐতিহাসিক ব্যক্তিত্বের সুবিন্যস্ত চিত্র।
                </p>
              </div>

              {/* Special Cross-Category Quick Tabs */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'all', label: 'সকল গোত্রীয় তালিকা', icon: '📜' },
                  { id: 'ashara_mubashshara', label: 'আশারায়ে মুবাশশারা (১০ জান্নাতী)', icon: '🌟' },
                  { id: 'mothers_of_believers', label: 'উম্মাহাতুল মুমিনীন (সহধর্মিনী)', icon: '🌸' },
                ].map((specCat) => (
                  <button
                    key={specCat.id}
                    onClick={() => {
                      if (soundEnabled) soundHaptics.playTap();
                      setSelectedSpecialCategory(specCat.id as any);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border flex items-center gap-1.5 ${
                      selectedSpecialCategory === specCat.id
                        ? isDay
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm font-black'
                          : 'bg-amber-500 text-slate-950 border-amber-400 shadow-md font-black'
                        : isDay
                        ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                        : 'bg-[#041417] hover:bg-[#072428] text-emerald-300 border-[#153e46]'
                    }`}
                  >
                    <span>{specCat.icon}</span>
                    <span>{specCat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Standard Chapter Filter when 'all' is selected */}
            {selectedSpecialCategory === 'all' && (
              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-bold opacity-60">অধ্যায় অনুযায়ী ফিল্টার:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: 'সকল অধ্যায়' },
                    { id: 1, label: '১ম অধ্যায়: কুরাইশ (মক্কা)' },
                    { id: 2, label: '২য় অধ্যায়: আনসার (মদিনা)' },
                    { id: 3, label: '৩য় অধ্যায়: বৃহত্তর আরব' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        if (soundEnabled) soundHaptics.playTap();
                        setChapterFilter(cat.id as any);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer border ${
                        chapterFilter === cat.id
                          ? isDay ? 'bg-teal-700 text-white border-teal-600' : 'bg-emerald-600 text-white border-emerald-500'
                          : isDay ? 'bg-slate-50 text-slate-700 border-slate-200' : 'bg-[#041417] text-emerald-300 border-[#153e46]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* DEDICATED SHOWCASE: When 'ashara_mubashshara' or 'mothers_of_believers' is selected */}
          {selectedSpecialCategory !== 'all' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-amber-500 flex items-center gap-2">
                  <span>{selectedSpecialCategory === 'ashara_mubashshara' ? '🌟' : '🌸'}</span>
                  <span>
                    {selectedSpecialCategory === 'ashara_mubashshara'
                      ? '১০ জান্নাতী সাহাবি (আশারায়ে মুবাশশারা)-এর গোত্র ও বংশমিলন নির্দেশিকা'
                      : 'উম্মাহাতুল মুমিনীন (নবীজি ﷺ-এর সহধর্মিনীগণ)-এর গোত্র ও বংশতালিকা'}
                  </span>
                </h4>
                <span className="text-xs font-bold opacity-70">
                  {SPECIAL_HISTORICAL_CROSS_INDEX.filter(item => item.categoryType === selectedSpecialCategory).length} জন মহীয়ান ব্যক্তিত্ব
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {SPECIAL_HISTORICAL_CROSS_INDEX
                  .filter(item => item.categoryType === selectedSpecialCategory)
                  .map((item) => (
                    <div
                      key={item.id}
                      className={`p-5 rounded-2xl border transition-all flex flex-col justify-between gap-3 ${
                        isDay ? 'bg-white border-amber-300/80 shadow-xs' : 'bg-[#082226] border-amber-500/30 shadow-md'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-black text-base text-emerald-600 dark:text-emerald-400">
                                {item.nameBn}
                              </h5>
                              <button
                                onClick={(e) => handlePlayVoice(item.nameAr, `voice-${item.id}`, e)}
                                title="আরবি উচ্চারণ শুনুন"
                                className={`p-1 rounded-lg border transition ${
                                  playingVoiceId === `voice-${item.id}`
                                    ? 'bg-amber-500 text-white animate-pulse'
                                    : 'bg-black/5 dark:bg-white/5 opacity-70 hover:opacity-100'
                                }`}
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-xs font-arabic text-amber-500 font-semibold block mt-0.5" dir="rtl">
                              {item.nameAr}
                            </span>
                          </div>

                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-500/15 text-amber-500 border border-amber-500/30 shrink-0">
                            {item.ancestorIntersectionBn}
                          </span>
                        </div>

                        {/* Clan badge */}
                        <div className="p-2 rounded-xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
                          <span className="font-bold text-slate-700 dark:text-slate-300">
                            🏛️ গোত্র: <strong className="text-amber-500">{item.clanBn}</strong>
                          </span>
                          <span className="text-[11px] opacity-75">
                            মিলন: {item.ancestorIntersectionBn}
                          </span>
                        </div>

                        <p className="text-xs leading-relaxed opacity-90 pt-1">
                          {item.significanceBn}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                        <button
                          onClick={() => openClanInReader(item.clanId)}
                          className="font-bold text-emerald-600 dark:text-emerald-400 hover:text-amber-500 flex items-center gap-1 cursor-pointer"
                        >
                          <span>এই গোত্রের সীরাত বিবরণী পড়ুন</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* STANDARD CLAN LIST: When 'all' is selected */}
          {selectedSpecialCategory === 'all' && (
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
                              <div className="flex items-center gap-1">
                                <span className="text-xs font-serif text-amber-500 font-bold">({clan.tribeNameAr})</span>
                                <button
                                  onClick={(e) => handlePlayVoice(clan.tribeNameAr!, `clan-${clan.id}`, e)}
                                  title="আরবি নাম শুনুন"
                                  className={`p-1 rounded-md border text-xs transition ${
                                    playingVoiceId === `clan-${clan.id}` ? 'bg-amber-500 text-white animate-pulse' : 'opacity-60 hover:opacity-100'
                                  }`}
                                >
                                  <Volume2 className="w-3 h-3" />
                                </button>
                              </div>
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
        )}
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
              onClick={() => setActiveChartTab('quraysh_convergence')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeChartTab === 'quraysh_convergence'
                  ? isDay ? 'bg-white text-teal-800 shadow' : 'bg-emerald-600 text-white shadow'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              🌳 কুরাইশ মিলনরেখা (Convergence)
            </button>

            <button
              onClick={() => setActiveChartTab('hashim_tree')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeChartTab === 'hashim_tree'
                  ? isDay ? 'bg-white text-teal-800 shadow' : 'bg-emerald-600 text-white shadow'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              👑 বনু হাশিম বংশলতিকা চিত্র
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
            <div className="space-y-6">
              {/* Header & Historical Context */}
              <div className={`p-6 sm:p-7 rounded-3xl border relative overflow-hidden ${
                isDay ? 'bg-gradient-to-br from-teal-50/70 via-white to-amber-50/40 border-teal-200/80 shadow-sm' : 'bg-gradient-to-br from-[#061d21] via-[#082226] to-[#041417] border-[#153e46]'
              }`}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 max-w-2xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-500 border border-amber-500/30">
                        মক্কার ১০টি প্রশাসনিক দায়িত্ব
                      </span>
                      <span className="text-xs opacity-60 font-semibold">• কুসাঈ ইবনে কিলাব কর্তৃক প্রতিষ্ঠিত ব্যবস্থা</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black flex items-center gap-2.5">
                      <Building className="w-6 h-6 text-amber-500 shrink-0" />
                      <span>কুরাইশ শাখাগুলোর দায়িত্ব বণ্টন ও ঐতিহাসিক রূপরেখা</span>
                    </h3>
                    <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
                      হজ পালনকারীদের সেবা, কাবার পবিত্রতা রক্ষা, নগর প্রতিরক্ষা ও আন্তর্জাতিক কূটনীতি পরিচালনার জন্য কুরাইশদের শীর্ষ ১০টি শাখার মাঝে বিশেষ দপ্তর অর্পিত ছিল।
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl border text-xs max-w-xs shrink-0 ${
                    isDay ? 'bg-amber-50/70 border-amber-200 text-amber-950' : 'bg-[#041417]/80 border-amber-500/30 text-amber-200'
                  }`}>
                    <div className="font-bold flex items-center gap-1.5 text-amber-500 mb-1">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>মক্কা বিজয়ের ঐতিহাসিক বিধান</span>
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-90">
                      রাসুলুল্লাহ ﷺ ইরশাদ করেন: &ldquo;অতীতের জাহেলি প্রথা সমাপ্ত, কেবল কাবা শরিফের খিদমত (সিদানাহ) ও হাজিদের পানি পান (সিকায়াহ) ব্যতীত।&rdquo;
                    </p>
                  </div>
                </div>

                {/* Domain Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-5 border-t border-slate-200/60 dark:border-slate-800/80 scrollbar-none">
                  {[
                    { id: 'all', label: 'সকল দায়িত্ব (১০)', icon: '🏛️' },
                    { id: 'kaba_service', label: 'কাবার পবিত্র সেবা (৩)', icon: '💧' },
                    { id: 'military', label: 'যুদ্ধ ও সেনাপতিত্ব (২)', icon: '🛡️' },
                    { id: 'judiciary', label: 'বিচার ও সালিশি (২)', icon: '⚖️' },
                    { id: 'parliament', label: 'সংসদ ও অর্থব্যবস্থা (৩)', icon: '📜' },
                  ].map((filterTab) => (
                    <button
                      key={filterTab.id}
                      onClick={() => {
                        if (soundEnabled) soundHaptics.playTap();
                        setQurayshRoleFilter(filterTab.id as any);
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border flex items-center gap-1.5 ${
                        qurayshRoleFilter === filterTab.id
                          ? isDay ? 'bg-teal-700 text-white border-teal-700 shadow-sm' : 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                          : isDay ? 'bg-white/80 text-slate-700 border-slate-200 hover:bg-white' : 'bg-[#041417]/60 text-slate-300 border-[#153e46] hover:bg-[#072428]'
                      }`}
                    >
                      <span>{filterTab.icon}</span>
                      <span>{filterTab.label}</span>
                    </button>
                  ))}
                </div>

                {/* 10 Offices Quick Jump Strip */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-3 border-t border-slate-200/50 dark:border-slate-800/60 scrollbar-none">
                  <span className="text-[11px] font-bold opacity-60 shrink-0">১০ দপ্তর:</span>
                  {MAKKAH_RESPONSIBILITIES.map((r, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        if (soundEnabled) soundHaptics.playTap();
                        setSelectedResponsibility(r);
                      }}
                      className={`px-2.5 py-1 rounded-xl text-[11px] font-bold border transition cursor-pointer shrink-0 flex items-center gap-1.5 ${
                        isDay
                          ? 'bg-white hover:bg-teal-50 border-slate-200 text-slate-700 hover:border-teal-400'
                          : 'bg-[#041417]/80 hover:bg-[#082226] border-[#153e46] text-slate-300 hover:border-emerald-500'
                      }`}
                    >
                      <span className="font-mono text-[10px] text-amber-500 font-black">#{i + 1}</span>
                      <span>{r.clanBn}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Responsibility Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResponsibilities.map((resp, idx) => {
                  const roleNumber = MAKKAH_RESPONSIBILITIES.findIndex(r => r.clanBn === resp.clanBn) + 1;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        if (soundEnabled) soundHaptics.playTap();
                        setSelectedResponsibility(resp);
                      }}
                      className={`p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all cursor-pointer flex flex-col justify-between gap-4 group ${
                        isDay
                          ? 'bg-white border-slate-200 hover:border-teal-500 shadow-sm hover:shadow-md'
                          : 'bg-[#082226] border-[#153e46] hover:border-emerald-500/80 hover:bg-[#09292e]'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-inner transition-transform group-hover:scale-105 ${
                              isDay ? 'bg-teal-50 border-teal-200 text-teal-800' : 'bg-[#041417] border-emerald-500/30 text-emerald-400'
                            }`}>
                              {renderResponsibilityIcon(resp.iconName)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-base sm:text-lg font-black group-hover:text-emerald-500 transition-colors">
                                  {resp.clanBn}
                                </h4>
                                {resp.responsibilityAr && (
                                  <span className="text-[11px] font-arabic opacity-70 text-amber-500 hidden sm:inline" dir="rtl">
                                    {resp.responsibilityAr}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs font-semibold text-amber-500 flex items-center gap-1.5 mt-0.5">
                                <span>{resp.responsibilityBn}</span>
                              </div>
                            </div>
                          </div>

                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border shrink-0 ${
                            isDay ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-[#041417] text-emerald-300 border-[#153e46]'
                          }`}>
                            দপ্তর #{roleNumber}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm opacity-85 leading-relaxed pt-1">
                          {resp.detailsBn}
                        </p>

                        {/* Dual-Era Leadership Pill Box */}
                        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs rounded-xl p-3 border ${
                          isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#041417]/70 border-[#153e46]'
                        }`}>
                          {resp.preIslamicHolder && (
                            <div>
                              <span className="text-[10px] font-bold opacity-60 block uppercase">🏛️ জাহেলিয়াত যুগে নেতৃত্ব</span>
                              <span className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">
                                {resp.preIslamicHolder}
                              </span>
                            </div>
                          )}
                          {resp.islamicHolder && (
                            <div>
                              <span className="text-[10px] font-bold text-emerald-500 block uppercase">☪️ ইসলামের যুগে অবস্থান</span>
                              <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-[11px]">
                                {resp.islamicHolder}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold group-hover:text-amber-500 transition-colors">
                        <span>বিস্তারিত ঐতিহাসিক তথ্য ও সংশ্লিষ্ট ব্যক্তিত্ব দেখুন</span>
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Chart 1.5: Quraysh Lineage Convergence Tree (মিলনরেখা) */}
          {activeChartTab === 'quraysh_convergence' && (
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
            }`}>
              <div className="space-y-2 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg bg-amber-500/15 text-amber-500 border border-amber-500/30">
                    বংশমিলন নকশা (Genealogy Convergence)
                  </span>
                  <span className="text-xs opacity-60">• বিশ্বনবী ﷺ ও সহচরগণের কুরাইশি পূর্বপুরুষ</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black">সাহাবায়ে কেরাম ও বিশ্বনবী ﷺ-এর কুরাইশি বংশমিলন রেখা</h3>
                <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
                  রাসূলুল্লাহ ﷺ-এর থেকে কততম বংশস্তরে (Generation) ইসলামের কোন মহান সাহাবি, খলিফা ও উম্মাহাতুল মুমিনীন তাঁর আদি কুরাইশি রক্তধারায় মিলিত হয়েছেন তার নিখুঁত ও বিশুদ্ধ চিত্রপ্রদর্শন।
                </p>
              </div>

              {/* Hadith Note */}
              <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                isDay ? 'bg-amber-50/70 border-amber-300 text-amber-950' : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
              }`}>
                <p className="font-semibold">
                  💡 <strong className="text-amber-500">বংশবিজ্ঞান দ্রষ্টব্য:</strong> কুরাইশ গোত্রের সকল শাখা ফিহর ইবনে মালিকের সন্তান। ১ থেকে ১০ম প্রজন্মের মধ্যে চার খলিফা, আশারায়ে মুবাশশারা এবং উম্মাহাতুল মুমিনীন সকলেই বিশ্বনবী ﷺ-এর পরিবারের সাথে একই পবিত্র শিকড়ে সংযুক্ত।
                </p>
              </div>

              {/* Generation Nodes list */}
              <div className="space-y-6 pt-2">
                {QURAYSH_CONVERGENCE_TREE.map((node, nIdx) => (
                  <div
                    key={nIdx}
                    className={`p-5 sm:p-6 rounded-3xl border relative transition-all shadow-sm ${
                      isDay
                        ? 'bg-gradient-to-br from-slate-50 via-white to-amber-50/30 border-slate-200 hover:border-amber-400'
                        : 'bg-gradient-to-br from-[#041417] via-[#082226] to-[#04191d] border-[#153e46] hover:border-emerald-500/70'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-dashed border-slate-200 dark:border-slate-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-500 font-black flex items-center justify-center text-xs shrink-0 shadow-inner">
                          {node.generationNumber}ম স্তর
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
                              {node.ancestorNameBn}
                            </h4>
                            <button
                              onClick={(e) => handlePlayVoice(node.ancestorNameAr, `anc-${nIdx}`, e)}
                              title="উচ্চারণ শুনুন"
                              className={`p-1 rounded-md border text-xs transition ${
                                playingVoiceId === `anc-${nIdx}` ? 'bg-amber-500 text-white animate-pulse' : 'opacity-60 hover:opacity-100'
                              }`}
                            >
                              <Volume2 className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="text-xs font-serif text-amber-500 font-semibold" dir="rtl">
                            {node.ancestorNameAr}
                          </span>
                        </div>
                      </div>

                      <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-center">
                        {node.connectedBranches.length}টি প্রধান বংশধারা মিলিত
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm opacity-85 leading-relaxed pt-2">
                      {node.significanceBn}
                    </p>

                    {/* Connected Clan Branches */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                      {node.connectedBranches.map((branch, bIdx) => (
                        <div
                          key={bIdx}
                          onClick={() => openClanInReader(branch.clanId)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer group space-y-2 ${
                            isDay
                              ? 'bg-white hover:bg-emerald-50/50 border-slate-200 hover:border-teal-400 shadow-xs'
                              : 'bg-[#061e22] hover:bg-[#07252b] border-[#153e46] hover:border-emerald-500'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <h5 className="font-extrabold text-xs sm:text-sm text-amber-500 group-hover:text-amber-400 transition">
                              {branch.clanNameBn}
                            </h5>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 opacity-80">
                              {branch.roleTitleBn}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 block">
                              এই পূর্বপুরুষের সন্তান ও সাহাবিগণ:
                            </span>
                            <div className="flex flex-wrap gap-1">
                              {branch.prominentSahaba.map((sahabi, sIdx) => (
                                <span
                                  key={sIdx}
                                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
                                >
                                  {sahabi}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {node.hadithOrHistoryNoteBn && (
                      <div className="pt-2 text-[11px] text-amber-500 opacity-90 font-medium italic">
                        📜 {node.hadithOrHistoryNoteBn}
                      </div>
                    )}
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      শাজারা শরীফ
                    </span>
                    <span className="text-xs opacity-60">• বিশুদ্ধ কুরাইশি বংশধারা</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">বনু হাশিমের পবিত্র ঐতিহাসিক বংশলতিকা চিত্র</h3>
                  <p className="text-xs sm:text-sm opacity-80">
                    হাশিম ইবনে আবদে মানাফ থেকে আবদুল মুত্তালিব, বিশ্বনবী হযরত মুহাম্মদ ﷺ এবং আহলে বাইতের গৌরবময় শাখা
                  </p>
                </div>

                {/* Branch Selector */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { id: 'all', label: 'সকল শাখা' },
                    { id: 'prophet', label: 'নবীজি ﷺ ও আহলে বাইত' },
                    { id: 'martyrs_caliphs', label: 'বীর শহীদ ও খুলাফা' },
                    { id: 'uncles', label: 'অন্যান্য পিতৃব্য' },
                  ].map((branch) => (
                    <button
                      key={branch.id}
                      onClick={() => {
                        if (soundEnabled) soundHaptics.playTap();
                        setHashimTreeBranch(branch.id as any);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                        hashimTreeBranch === branch.id
                          ? isDay ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm' : 'bg-amber-500 text-slate-950 border-amber-400 font-black shadow-md'
                          : isDay ? 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200' : 'bg-[#041417] text-slate-300 border-[#153e46] hover:bg-[#072428]'
                      }`}
                    >
                      {branch.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hadith Crest */}
              <div className={`p-4 rounded-2xl border text-center text-xs sm:text-sm leading-relaxed ${
                isDay ? 'bg-teal-50/70 border-teal-200 text-teal-900' : 'bg-[#041417]/90 border-emerald-500/30 text-emerald-200'
              }`}>
                <p className="font-semibold">
                  রাসুলুল্লাহ ﷺ বলেন: <span className="text-amber-500 font-bold">&ldquo;আল্লাহ তায়ালা ইবরাহিম (আ.)-এর বংশ থেকে ইসমাইল (আ.)-কে, তাঁর বংশ থেকে কিনানাহকে, কিনানাহ থেকে কুরাইশকে, কুরাইশ থেকে বনু হাশিমকে এবং বনু হাশিম থেকে আমাকে মনোনীত করেছেন।&rdquo;</span> — (সহিহ মুসলিম)
                </p>
              </div>

              {/* Interactive Royal Family Tree Layout */}
              <div className="space-y-4 pt-2">
                {/* Level 1: Root - Hashim */}
                <div className="flex flex-col items-center">
                  <div className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-base text-center shadow-lg border border-amber-300 ring-4 ring-amber-500/20">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-slate-900/70">বংশের মূল প্রতিষ্ঠাতা</div>
                    <div>{BANU_HASHIM_GENEALOGY.rootName}</div>
                    {BANU_HASHIM_GENEALOGY.rootNameAr && (
                      <div className="text-xs font-arabic mt-0.5 font-normal" dir="rtl">{BANU_HASHIM_GENEALOGY.rootNameAr}</div>
                    )}
                  </div>
                  <div className="w-0.5 h-6 bg-gradient-to-b from-amber-500 to-emerald-500" />
                </div>

                {/* Level 2: Abdul Muttalib */}
                <div className="flex flex-col items-center">
                  <div className={`px-8 py-4 rounded-3xl border text-center shadow-md max-w-md w-full ${
                    isDay ? 'bg-teal-50 border-teal-300 text-teal-950' : 'bg-[#041417] border-emerald-500/60 text-emerald-100 ring-2 ring-emerald-500/20'
                  }`}>
                    <div className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">মক্কার অভিভাবক ও সর্দার</div>
                    <div className="font-black text-lg sm:text-xl">{BANU_HASHIM_GENEALOGY.son.name}</div>
                    <div className="text-xs opacity-80 mt-0.5">{BANU_HASHIM_GENEALOGY.son.title}</div>
                  </div>
                  <div className="w-0.5 h-6 bg-emerald-500/60" />
                </div>

                {/* Level 3: Sons & Branches */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
                  {BANU_HASHIM_GENEALOGY.son.sons
                    .filter(son => {
                      if (hashimTreeBranch === 'all') return true;
                      if (hashimTreeBranch === 'prophet') return son.name === 'আব্দুল্লাহ';
                      if (hashimTreeBranch === 'martyrs_caliphs') return son.name === 'আবু তালিব' || son.name === 'হামযা (রা.)';
                      if (hashimTreeBranch === 'uncles') return son.name === 'আব্বাস (রা.)' || son.name === 'আবু লাহাব';
                      return true;
                    })
                    .map((son, sIdx) => {
                      const isProphetBranch = son.name === 'আব্দুল্লাহ';
                      const isMartyrBranch = son.name === 'হামযা (রা.)';
                      const isEnemyBranch = son.name === 'আবু লাহাব';

                      return (
                        <div
                          key={sIdx}
                          className={`p-4 rounded-2xl border text-center flex flex-col justify-between transition-all ${
                            isProphetBranch
                              ? isDay
                                ? 'border-amber-400 bg-gradient-to-b from-amber-50/80 to-white shadow-md ring-2 ring-amber-400/40'
                                : 'border-amber-500/70 bg-gradient-to-b from-[#0d2a23] to-[#041417] shadow-xl ring-2 ring-amber-500/30'
                              : isMartyrBranch
                              ? isDay
                                ? 'border-teal-300 bg-teal-50/50 shadow-sm'
                                : 'border-emerald-500/40 bg-[#072428] shadow'
                              : isEnemyBranch
                              ? 'border-rose-500/40 bg-rose-500/5 opacity-80'
                              : isDay ? 'border-slate-200 bg-slate-50' : 'border-[#153e46] bg-[#041417]'
                          }`}
                        >
                          <div className="space-y-1.5 pb-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md inline-block uppercase bg-black/5 dark:bg-white/5 text-amber-500">
                              আবদুল মুত্তালিবের পুত্র
                            </span>
                            <div className="font-black text-sm sm:text-base">{son.name}</div>
                            <div className="text-[11px] opacity-80 leading-snug">{son.desc}</div>
                          </div>

                          {son.children && son.children.length > 0 && (
                            <div className="pt-2 border-t border-dashed border-slate-300 dark:border-slate-700/80 space-y-2 mt-2">
                              {son.children.map((child: any, cIdx: number) => (
                                <div
                                  key={cIdx}
                                  className={`p-2.5 rounded-xl text-left border space-y-1.5 ${
                                    child.isProphet
                                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md border-emerald-400 ring-2 ring-amber-400/40'
                                      : isDay ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#082226] border-[#153e46] text-slate-200'
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="font-black text-xs">{child.name}</span>
                                    {child.isProphet && (
                                      <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded">
                                        সর্বশেষ নবী
                                      </span>
                                    )}
                                    {child.badge && !child.isProphet && (
                                      <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                                        {child.badge}
                                      </span>
                                    )}
                                  </div>

                                  {child.title && (
                                    <div className="text-[10px] opacity-80 text-amber-400 font-medium">
                                      {child.title}
                                    </div>
                                  )}

                                  {/* Ahl al-Bayt Nested Children (e.g. Sayyida Fatima and Hasan-Husain) */}
                                  {child.children && child.children.length > 0 && (
                                    <div className="pt-1.5 mt-1 border-t border-white/20 space-y-1.5">
                                      {child.children.map((subChild: any, scIdx: number) => (
                                        <div
                                          key={scIdx}
                                          className="p-1.5 rounded-lg bg-black/20 border border-amber-300/30 text-[10px]"
                                        >
                                          <div className="flex items-center justify-between">
                                            <span className="font-black text-amber-300">{subChild.name}</span>
                                            <span className="text-[9px] text-emerald-200 bg-emerald-800/40 px-1 py-0.2 rounded">
                                              {subChild.badge}
                                            </span>
                                          </div>
                                          {subChild.marriageTo && (
                                            <div className="text-[9px] text-pink-200 mt-0.5">
                                              বিবাহ: {subChild.marriageTo}
                                            </div>
                                          )}
                                          {subChild.sons && (
                                            <div className="text-[9px] text-amber-200 font-bold mt-0.5">
                                              জান্নাতী সর্দার: {subChild.sons.join(' ও ')}
                                            </div>
                                          )}
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          )}

          {/* Chart 3: Ansar Tree */}
          {activeChartTab === 'ansar_tree' && (
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-5">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-teal-500 uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
                      মদিনাতুল মুনাওয়ারার আনসার
                    </span>
                    <span className="text-xs opacity-60">• ইয়াসরিবের আদি বংশধারা</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">আওস ও খাযরাজ গোত্রের উপশাখা চিত্র</h3>
                  <p className="text-xs sm:text-sm opacity-80">
                    ইয়েমেনের প্রাচীন কাহতানি &lsquo;আজদ&rsquo; বংশ থেকে হিজরত করে মদিনায় বসতি স্থাপনকারী দুই ভ্রাতৃপ্রতিম গোত্র
                  </p>
                </div>

                {/* Sub Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { id: 'tree', label: 'বংশলতিকা ও উপশাখা চিত্র' },
                    { id: 'comparison', label: 'খাযরাজ বনাম আওস তুলনা' },
                    { id: 'virtues', label: 'আনসারদের মর্যাদা ও হাদিস' },
                  ].map((subTab) => (
                    <button
                      key={subTab.id}
                      onClick={() => {
                        if (soundEnabled) soundHaptics.playTap();
                        setAnsarTab(subTab.id as any);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
                        ansarTab === subTab.id
                          ? isDay ? 'bg-teal-700 text-white border-teal-700 shadow-sm' : 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                          : isDay ? 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200' : 'bg-[#041417] text-slate-300 border-[#153e46] hover:bg-[#072428]'
                      }`}
                    >
                      {subTab.label}
                    </button>
                  ))}
                </div>
              </div>

              {ansarTab === 'tree' && (
                <div className="space-y-6">
                  {/* Root Origin */}
                  <div className="flex flex-col items-center">
                    <div className="px-8 py-3 rounded-2xl bg-teal-700 text-white font-black text-sm sm:text-base text-center shadow-lg border border-teal-500 ring-4 ring-teal-500/20">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-teal-200">আদি কাহতানি পূর্বপুরুষ</div>
                      <div>{ANSAR_GENEALOGY.ancestor}</div>
                    </div>
                    <div className="w-0.5 h-6 bg-teal-500/50" />
                  </div>

                  {/* Two Main Clans */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ANSAR_GENEALOGY.branches.map((branch, bIdx) => {
                      const isKhazraj = branch.name.includes('খাযরাজ');
                      return (
                        <div
                          key={bIdx}
                          className={`p-6 rounded-3xl border space-y-4 ${
                            isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#041417] border-[#153e46]'
                          }`}
                        >
                          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                            <div>
                              <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                                isKhazraj ? 'bg-amber-500/15 text-amber-500' : 'bg-teal-500/15 text-teal-500'
                              }`}>
                                {isKhazraj ? 'বৃহত্তম আনসার গোত্র (মদিনার সিংহভাগ)' : 'প্রভাবশালী যুদ্ধবাজ আনসার গোত্র'}
                              </span>
                              <h4 className="text-lg sm:text-xl font-black mt-1 text-emerald-600 dark:text-emerald-400">
                                {branch.name}
                              </h4>
                            </div>
                            <span className="text-xs opacity-75 font-bold px-2.5 py-1 rounded-xl bg-black/5 dark:bg-white/5">
                              {branch.subClans.length}টি প্রধান উপশাখা
                            </span>
                          </div>

                          <div className="space-y-2.5">
                            {branch.subClans.map((sub, sIdx) => (
                              <div
                                key={sIdx}
                                className={`p-3.5 rounded-2xl border transition-all ${
                                  isDay ? 'bg-white border-slate-200 hover:border-teal-400' : 'bg-[#082226] border-[#153e46] hover:border-emerald-500'
                                }`}
                              >
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <div className="font-bold text-xs sm:text-sm">{sub.name}</div>
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-500 shrink-0">
                                    দলপতি: {sub.leader}
                                  </span>
                                </div>
                                <div className="text-xs opacity-80 leading-relaxed">{sub.note}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {ansarTab === 'comparison' && (
                <div className="space-y-4">
                  <div className={`overflow-x-auto rounded-2xl border ${
                    isDay ? 'bg-white border-slate-200' : 'bg-[#041417] border-[#153e46]'
                  }`}>
                    <table className="w-full text-left text-xs sm:text-sm border-collapse">
                      <thead>
                        <tr className={`border-b ${isDay ? 'bg-slate-100 text-slate-800' : 'bg-[#082226] text-emerald-300'}`}>
                          <th className="p-3.5 font-black">তুলনার বিষয়</th>
                          <th className="p-3.5 font-black text-amber-500">বনু খাযরাজ গোত্র</th>
                          <th className="p-3.5 font-black text-teal-400">বনু আওস গোত্র</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        <tr>
                          <td className="p-3.5 font-bold opacity-70">জনসংখ্যা ও আকার</td>
                          <td className="p-3.5">মদিনার আনসারদের প্রায় তিন-চতুর্থাংশ (সংখ্যাধিক্য)</td>
                          <td className="p-3.5">সংখ্যায় কিছুটা কম তবে অত্যন্ত শক্তিশালী ও বীরযোদ্ধা</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-bold opacity-70">আকাবার প্রথম ও দ্বিতীয় বায়াত</td>
                          <td className="p-3.5">প্রথম বায়াতের ১২ জনের মধ্যে বেশিরভাগ এবং দ্বিতীয় বায়াতেও আধিক্য</td>
                          <td className="p-3.5">সা&lsquo;দ ইবনে মু&lsquo;আজ (রা.)-এর নেতৃত্বে ব্যাপক ইসলাম গ্রহণ</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-bold opacity-70">প্রধান দলপতি</td>
                          <td className="p-3.5">সা&lsquo;দ ইবনে উবাদাহ (রা.) ও আস&lsquo;আদ ইবনে যুরারাহ (রা.)</td>
                          <td className="p-3.5">সা&lsquo;দ ইবনে মু&lsquo;আজ (রা.) ও উসাইদ ইবনে হুদাইর (রা.)</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-bold opacity-70">কুরআন সংকলনে ভূমিকা</td>
                          <td className="p-3.5">যায়েদ ইবনে সাবিত (রা.), উবাই ইবনে কা&lsquo;ব (রা.)</td>
                          <td className="p-3.5">বদর ও উহুদে শীর্ষ যোদ্ধা ও অকুতোভয় সেনাদল</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {ansarTab === 'virtues' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-5 rounded-2xl border space-y-2 ${
                    isDay ? 'bg-teal-50 border-teal-200' : 'bg-[#041417] border-[#153e46]'
                  }`}>
                    <h4 className="font-black text-sm text-amber-500 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>ঈমানের মাপকাঠি আনসারদের ভালোবাসা</span>
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                      রাসুলুল্লাহ ﷺ বলেন: &ldquo;আনসারদের ভালোবাসা খাঁটি ঈমানের লক্ষণ, আর তাদের প্রতি বিদ্বেষ মুনাফিকির আলামত। যে তাদের ভালোবাসে, আল্লাহ তাকে ভালোবাসেন।&rdquo; (সহিহ বুখারি)
                    </p>
                  </div>

                  <div className={`p-5 rounded-2xl border space-y-2 ${
                    isDay ? 'bg-amber-50/60 border-amber-200' : 'bg-[#041417] border-[#153e46]'
                  }`}>
                    <h4 className="font-black text-sm text-emerald-500 flex items-center gap-1.5">
                      <Heart className="w-4 h-4" />
                      <span>আনসারদের উপত্যকা ও হিজরতের মর্যাদা</span>
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                      রাসুলুল্লাহ ﷺ বলেন: &ldquo;যদি সমগ্র মানুষ এক উপত্যকায় গমন করে আর আনসাররা অন্য উপত্যকায় গমন করে, তবে আমি আনসারদের উপত্যকাতেই অবস্থান করব।&rdquo; (সহিহ বুখারি)
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Chart 4: Greater Arab Overview */}
          {activeChartTab === 'arab_map' && (
            <div className={`p-6 sm:p-8 rounded-3xl border shadow-sm space-y-6 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#082226] border-[#153e46]'
            }`}>
              <div className="space-y-1 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
                <span className="text-xs font-bold text-orange-500 uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20">
                  অঞ্চলভিত্তিক গোত্র বিন্যাস
                </span>
                <h3 className="text-xl sm:text-2xl font-black">বৃহত্তর আরবের ১০টি প্রধান ভৌগোলিক অঞ্চল ও গোত্র চিত্র</h3>
                <p className="text-xs sm:text-sm opacity-80">
                  মক্কা, মদিনা, তায়েফ, নজদ, ইয়ামামাহ, ইয়েমেন ও সিরিয়া সীমান্তের ভূ-রাজনৈতিক রূপরেখা
                </p>
              </div>

              {/* Interactive SVG Geographical Map Preview Container */}
              <div className={`relative w-full h-80 sm:h-96 rounded-3xl overflow-hidden border shadow-inner ${
                isDay ? 'bg-gradient-to-br from-amber-100/50 via-teal-50 to-slate-100 border-amber-300' : 'bg-gradient-to-br from-[#041518] via-[#062024] to-[#0a3138] border-[#153e46]'
              }`}>
                {/* Background Compass & Topographic Accent */}
                <div className="absolute left-4 top-4 opacity-20 pointer-events-none">
                  <Compass className="w-24 h-24 text-amber-500" />
                </div>
                <div className="absolute right-4 bottom-4 opacity-20 pointer-events-none text-right font-serif text-xs text-amber-500">
                  خريطة شبه الجزيرة العربية
                </div>

                {/* Map Title & Legend Overlay */}
                <div className="absolute top-3 right-3 z-10 p-2.5 rounded-2xl bg-black/40 backdrop-blur-md text-white border border-white/10 text-[11px] font-bold space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>মানচিত্রের পিন স্পর্শ করুন</span>
                  </div>
                  <div className="text-[10px] opacity-80">১০টি কৌশলগত আরব এলাকা</div>
                </div>

                {/* Hotspot Pins on SVG Overlay */}
                {ARABIAN_TRIBAL_GEO_REGIONS.map((reg) => {
                  const isSelected = reg.id === activeGeoRegionId;
                  return (
                    <button
                      key={reg.id}
                      onClick={() => {
                        if (soundEnabled) soundHaptics.playTap();
                        setActiveGeoRegionId(reg.id);
                      }}
                      style={{ left: `${reg.xPercent}%`, top: `${reg.yPercent}%` }}
                      className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-all duration-300 cursor-pointer ${
                        isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                      }`}
                    >
                      <div className={`relative flex items-center justify-center p-2 rounded-full shadow-lg border backdrop-blur-md ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 border-amber-300 ring-4 ring-amber-500/30'
                          : 'bg-emerald-600 text-white border-emerald-400'
                      }`}>
                        <MapPin className="w-4 h-4 fill-current" />
                        <span className={`absolute left-1/2 -bottom-6 -translate-x-1/2 whitespace-nowrap text-[10px] font-black px-2 py-0.5 rounded-md border shadow ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 border-amber-300'
                            : 'bg-black/70 text-white border-white/20'
                        }`}>
                          {reg.nameBn.split(' ')[0]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Geo Region Detailed Showcase Card */}
              {(() => {
                const activeReg = ARABIAN_TRIBAL_GEO_REGIONS.find(r => r.id === activeGeoRegionId) || ARABIAN_TRIBAL_GEO_REGIONS[0];
                return (
                  <div className={`p-6 rounded-3xl border space-y-4 shadow-md ${
                    isDay ? 'bg-gradient-to-r from-amber-50/70 via-white to-teal-50/50 border-amber-300' : 'bg-gradient-to-r from-[#04161a] via-[#082226] to-[#0b2d33] border-emerald-500/40 text-emerald-100'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-500 border border-amber-500/30">
                            নির্বাচিত অঞ্চল
                          </span>
                          <h4 className="text-lg sm:text-xl font-black">{activeReg.nameBn}</h4>
                          <button
                            onClick={(e) => handlePlayVoice(activeReg.nameAr, `geo-voice-${activeReg.id}`, e)}
                            title="আরবি উচ্চারণ শুনুন"
                            className={`p-1 rounded-lg border transition ${
                              playingVoiceId === `geo-voice-${activeReg.id}` ? 'bg-amber-500 text-white animate-pulse' : 'opacity-60 hover:opacity-100'
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-xs font-serif text-amber-500 font-bold block mt-0.5" dir="rtl">
                          {activeReg.nameAr} ({activeReg.nameEn})
                        </span>
                      </div>

                      {activeReg.targetClanId && (
                        <button
                          onClick={() => openClanInReader(activeReg.targetClanId!)}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow cursor-pointer self-start sm:self-center flex items-center gap-1"
                        >
                          <span>এই অঞ্চলের সীরাত পাঠ দেখুন</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                      {activeReg.detailsBn}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                      {/* Dominant Tribes */}
                      <div className="p-3 rounded-2xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-1">
                        <span className="text-[10px] font-bold text-amber-500 uppercase block">🛡️ প্রভাবশালী গোত্রসমূহ</span>
                        <div className="font-semibold">{activeReg.dominantTribesBn.join(', ')}</div>
                      </div>

                      {/* Historical Events */}
                      <div className="p-3 rounded-2xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-1">
                        <span className="text-[10px] font-bold text-emerald-500 uppercase block">📜 ঐতিহাসিক ঘটনাবলী</span>
                        <div className="font-semibold">{activeReg.historicalEventsBn.join(' • ')}</div>
                      </div>

                      {/* Prominent Sahaba */}
                      <div className="p-3 rounded-2xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-1">
                        <span className="text-[10px] font-bold text-teal-400 uppercase block">🌿 শীর্ষ সাহাবি ও ব্যক্তিত্ব</span>
                        <div className="font-semibold">{activeReg.prominentSahabaList.join(', ')}</div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* 6 Strategic Geopolitical Regions Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CHAPTER3_OVERVIEW.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      if (soundEnabled) soundHaptics.playTap();
                      const targetId =
                        item.clanBn.includes('সাকীফ') ? 'banu-thaqif' :
                        item.clanBn.includes('হাওয়াযিন') || item.clanBn.includes('সা’দ') ? 'banu-hawazin-saad' :
                        item.clanBn.includes('খুযাআ') || item.clanBn.includes('বকর') ? 'banu-khuzaa-bakr' :
                        item.clanBn.includes('গিফার') || item.clanBn.includes('দাওস') ? 'banu-ghifar-daws' :
                        item.clanBn.includes('তামিম') || item.clanBn.includes('কালব') ? 'banu-tamim-kalb' : 'banu-ghatafan-hanifa';
                      openClanInReader(targetId);
                    }}
                    className={`p-5 rounded-2xl border space-y-3 transition-all cursor-pointer group flex flex-col justify-between ${
                      isDay
                        ? 'bg-slate-50 border-slate-200 hover:border-teal-500 hover:bg-white shadow-xs hover:shadow-md'
                        : 'bg-[#041417] border-[#153e46] hover:border-emerald-500 hover:bg-[#072428]'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-black text-base text-emerald-600 dark:text-emerald-400 group-hover:text-amber-500 transition-colors">
                          {item.clanBn}
                        </h4>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {item.sectionCode}
                        </span>
                      </div>

                      <p className="text-xs text-amber-500 flex items-center gap-1.5 font-bold">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{item.locationBn}</span>
                      </p>

                      <p className="text-xs opacity-85 leading-relaxed">{item.noteBn}</p>
                    </div>

                    <div className="pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold group-hover:text-amber-400 transition-colors">
                      <span>সীরাত ও যুদ্ধ বিবরণী পড়ুন</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800/80 pb-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    তুলনামূলক পরিসংখ্যান
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black">তালিকায় উল্লিখিত ব্যক্তিত্বের তুলনামূলক বার চার্ট</h3>
                  <p className="text-xs sm:text-sm opacity-80">
                    ১ থেকে ১৩ নম্বর মূল অধ্যায় অনুযায়ী আরবের শীর্ষ গোত্রগুলোতে বিশিষ্ট সাহাবি ও ব্যক্তিত্বের সংখ্যা
                  </p>
                </div>

                {/* Sort Bar */}
                <div className="flex items-center gap-2">
                  <span className="text-xs opacity-60 font-semibold">ক্রমানুসার:</span>
                  <div className="flex items-center gap-1 rounded-xl p-1 border bg-black/5 dark:bg-white/5">
                    {[
                      { id: 'highest', label: 'সর্বোচ্চ ব্যক্তিত্ব' },
                      { id: 'alphabetical', label: 'নামানুসারে' },
                    ].map((sortOption) => (
                      <button
                        key={sortOption.id}
                        onClick={() => {
                          if (soundEnabled) soundHaptics.playTap();
                          setStatsSort(sortOption.id as any);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          statsSort === sortOption.id
                            ? isDay ? 'bg-teal-700 text-white shadow-sm' : 'bg-emerald-600 text-white shadow'
                            : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        {sortOption.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress Bars */}
              <div className="space-y-3.5 pt-1">
                {sortedStatistics.map((stat, idx) => {
                  const maxCount = 25;
                  const percentage = Math.min(100, Math.round((stat.count / maxCount) * 100));

                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        if (soundEnabled) soundHaptics.playTap();
                        const matchingTribe = ARABER_GOTRO_DATABASE.find(
                          (t) => t.tribeNameBn.includes(stat.nameBn) || stat.nameBn.includes(t.tribeNameBn)
                        );
                        if (matchingTribe) {
                          openClanInReader(matchingTribe.id);
                        } else {
                          setSearchQuery(stat.nameBn);
                          setViewMode('reader');
                        }
                      }}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer group space-y-2 ${
                        isDay ? 'bg-slate-50 border-slate-200 hover:border-teal-500 hover:bg-white' : 'bg-[#041417] border-[#153e46] hover:border-emerald-500 hover:bg-[#082226]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                        <div className="flex items-center gap-2 truncate">
                          <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black bg-emerald-500/10 text-emerald-400">
                            {idx + 1}
                          </span>
                          <span className="truncate group-hover:text-emerald-500 transition-colors">{stat.nameBn}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] opacity-75 hidden sm:inline text-amber-500">
                            {stat.chapter}
                          </span>
                          <span className="tabular-nums text-emerald-600 dark:text-emerald-400 font-black px-2 py-0.5 rounded-md bg-emerald-500/10">
                            মোট {stat.count} জন
                          </span>
                        </div>
                      </div>

                      <div className="w-full h-3 rounded-full bg-black/10 dark:bg-black/40 overflow-hidden p-0.5">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-teal-500 via-emerald-500 to-amber-500 transition-all duration-700"
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
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-lg rounded-3xl p-6 sm:p-7 border shadow-2xl relative space-y-4 ${
              isDay ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#082226] border-[#153e46] text-emerald-100'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-inner ${
                  isDay ? 'bg-teal-50 border-teal-200 text-teal-800' : 'bg-[#041417] border-emerald-500/30 text-emerald-400'
                }`}>
                  {renderResponsibilityIcon(selectedResponsibility.iconName)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xl font-black">{selectedResponsibility.clanBn}</h4>
                    {selectedResponsibility.responsibilityAr && (
                      <span className="text-xs font-arabic text-amber-500 opacity-80" dir="rtl">
                        {selectedResponsibility.responsibilityAr}
                      </span>
                    )}
                  </div>
                  <span className="text-xs opacity-60">কুরাইশের ঐতিহাসিক প্রশাসনিক দপ্তর</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedResponsibility(null)}
                className="p-2 rounded-xl border text-xs font-bold cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                ✕
              </button>
            </div>

            <div className={`p-4 rounded-2xl border space-y-2.5 ${
              isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#041417] border-[#153e46]'
            }`}>
              <div className="text-sm font-black text-amber-500 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>দায়িত্ব: {selectedResponsibility.responsibilityBn}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                {selectedResponsibility.detailsBn}
              </p>
            </div>

            {/* Dual Era Insight */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs p-3.5 rounded-2xl border ${
              isDay ? 'bg-amber-50/50 border-amber-200/60' : 'bg-[#051a1e] border-[#18464f]'
            }`}>
              {selectedResponsibility.preIslamicHolder && (
                <div>
                  <span className="text-[10px] font-bold opacity-60 block uppercase">🏛️ জাহেলিয়াত যুগে নেতৃত্ব</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                    {selectedResponsibility.preIslamicHolder}
                  </span>
                </div>
              )}
              {selectedResponsibility.islamicHolder && (
                <div>
                  <span className="text-[10px] font-bold text-emerald-500 block uppercase">☪️ ইসলামের যুগে অবস্থান</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-xs">
                    {selectedResponsibility.islamicHolder}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
              <button
                onClick={() => setSelectedResponsibility(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold opacity-75 hover:opacity-100 cursor-pointer"
              >
                বন্ধ করুন
              </button>
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
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-md transition"
              >
                গোত্রের পূর্ণ সীরাত পাঠ দেখুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Quick-TOC Button */}
      <button
        onClick={() => {
          if (soundEnabled) soundHaptics.playTap();
          setIsTocDrawerOpen(true);
        }}
        className="fixed bottom-20 right-4 sm:right-6 z-40 px-4 py-2.5 rounded-full shadow-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 border-2 border-amber-300 ring-4 ring-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
        title="সম্পূর্ণ বিষয়ভিত্তিক সূচিপত্র খুলুন"
      >
        <BookOpen className="w-4 h-4" />
        <span>📑 দ্রুত সূচিপত্র</span>
      </button>

      {/* Sliding Quick-TOC Drawer Modal */}
      {isTocDrawerOpen && (
        <div
          onClick={() => setIsTocDrawerOpen(false)}
          className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-md h-full overflow-y-auto p-5 sm:p-6 border-l shadow-2xl space-y-5 animate-in slide-in-from-right duration-300 ${
              isDay ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#05191c] border-[#153e46] text-emerald-100'
            }`}
          >
            {/* Drawer Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="space-y-0.5">
                <span className="text-[10px] font-black uppercase text-amber-500 tracking-wider">
                  বিষয়ভিত্তিক পরিচ্ছেদ তালিকা
                </span>
                <h3 className="text-lg font-black flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-500" />
                  <span>সম্পূর্ণ বিষয়ভিত্তিক সূচিপত্র</span>
                </h3>
                <p className="text-xs opacity-70">
                  ৩টি অধ্যায় • ১৩টি সীরাত পরিচ্ছেদ • ৫টি ঐতিহাসিক চার্ট
                </p>
              </div>

              <button
                onClick={() => setIsTocDrawerOpen(false)}
                className="p-2 rounded-xl border text-xs font-bold cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
              >
                ✕
              </button>
            </div>

            {/* Instant Search Inside Drawer */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                type="text"
                value={tocSearchQuery}
                onChange={(e) => setTocSearchQuery(e.target.value)}
                placeholder="যেকোনো গোত্র বা চার্টের নাম খুঁজুন..."
                className={`w-full pl-9 pr-8 py-2 rounded-xl text-xs border outline-none transition ${
                  isDay
                    ? 'bg-slate-50 border-slate-200 focus:border-teal-500 text-slate-800'
                    : 'bg-[#082226] border-[#153e46] focus:border-emerald-500 text-emerald-100'
                }`}
              />
              {tocSearchQuery && (
                <button
                  onClick={() => setTocSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs opacity-60 hover:opacity-100"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Visual Chapters & Sections from Topic Wise TOC */}
            <div className="space-y-5">
              {TOPIC_WISE_TOC_DATA
                .filter(topic => {
                  if (!tocSearchQuery.trim()) return true;
                  const q = tocSearchQuery.toLowerCase();
                  return (
                    topic.topicTitleBn.toLowerCase().includes(q) ||
                    topic.subsections.some(s => s.titleBn.toLowerCase().includes(q) || s.subtitleBn.toLowerCase().includes(q))
                  );
                })
                .map((topic, tIdx) => {
                  const filteredSubs = topic.subsections.filter(s =>
                    !tocSearchQuery.trim() ||
                    s.titleBn.toLowerCase().includes(tocSearchQuery.toLowerCase()) ||
                    s.subtitleBn.toLowerCase().includes(tocSearchQuery.toLowerCase())
                  );

                  return (
                    <div key={tIdx} className="space-y-2">
                      <div className="flex items-center justify-between pb-1 border-b border-dashed border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-1.5 truncate">
                          <span>{topic.icon}</span>
                          <span className="text-xs font-black text-amber-500 truncate">{topic.topicTitleBn}</span>
                        </div>
                        <span className="text-[10px] font-bold opacity-60 shrink-0">{filteredSubs.length}টি বিষয়</span>
                      </div>

                      <div className="space-y-1">
                        {filteredSubs.map((sub, sIdx) => {
                          const isChart = sub.type === 'chart';
                          return (
                            <button
                              key={sIdx}
                              onClick={() => {
                                if (soundEnabled) soundHaptics.playTap();
                                setIsTocDrawerOpen(false);
                                if (isChart && sub.chartKey) {
                                  setActiveChartTab(sub.chartKey);
                                  setViewMode('charts_gallery');
                                } else {
                                  openClanInReader(sub.id);
                                }
                              }}
                              className={`w-full text-left p-2.5 rounded-xl border text-xs transition cursor-pointer flex items-center justify-between gap-2 ${
                                isChart
                                  ? isDay ? 'bg-amber-50/70 border-amber-200 hover:bg-amber-100/80 font-bold text-amber-900' : 'bg-[#082226] border-amber-500/30 hover:border-amber-400 font-bold text-amber-300'
                                  : isDay ? 'bg-slate-50 border-slate-200 hover:border-teal-500 text-slate-800' : 'bg-[#041417] border-[#153e46] hover:border-emerald-500 text-slate-200'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-black shrink-0 ${
                                  isChart ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/10 text-emerald-400'
                                }`}>
                                  {isChart ? 'চার্ট' : 'পাঠ'}
                                </span>
                                <span className="truncate">{sub.titleBn}</span>
                              </div>
                              <ChevronRight className="w-3.5 h-3.5 opacity-60 shrink-0" />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

              {/* Appendix 40 Tribes Option */}
              <button
                onClick={() => {
                  if (soundEnabled) soundHaptics.playTap();
                  setIsTocDrawerOpen(false);
                  setViewMode('appendix40');
                }}
                className={`w-full text-left p-3 rounded-2xl border text-xs font-bold transition cursor-pointer flex items-center justify-between gap-2 ${
                  isDay
                    ? 'bg-amber-50/80 border-amber-200 text-amber-950 hover:bg-amber-100'
                    : 'bg-[#082226] border-amber-500/30 text-amber-300 hover:border-amber-400'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>📜</span>
                  <span>সংযুক্তি : আরবের পূর্ণাঙ্গ ৪০টি গোত্রের এনসাইক্লোপিডিয়া</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-75" />
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                onClick={() => setIsTocDrawerOpen(false)}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow transition"
              >
                সূচিপত্র বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
