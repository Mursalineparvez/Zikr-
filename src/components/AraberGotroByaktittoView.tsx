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

import { ARABER_GOTRO_TRANSLATIONS, TOPIC_TOC_ENGLISH_MAP } from '../utils/araberGotroTranslations';

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
  badgeEn?: string;
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
    badgeEn: 'Kaaba Siqayah & Rifadah · Prophet PBUH & Ahl al-Bayt',
    gradientDay: 'from-amber-500/15 via-emerald-500/10 to-teal-500/5',
    gradientNight: 'from-amber-500/20 via-emerald-950/40 to-[#04191d]',
    borderDay: 'border-amber-400/60',
    borderNight: 'border-amber-500/40',
    themeColor: 'text-amber-500'
  },
  'banu-umayya': {
    icon: '🚩',
    badgeBn: 'রণপতাকা আল-উকাব · হযরত উসমান ও সেনাপতিত্ব',
    badgeEn: 'Banner Al-Uqab · Uthman (RA) & Supreme Command',
    gradientDay: 'from-emerald-500/15 via-teal-500/10 to-cyan-500/5',
    gradientNight: 'from-emerald-600/20 via-[#072428] to-[#041417]',
    borderDay: 'border-emerald-400/60',
    borderNight: 'border-emerald-500/40',
    themeColor: 'text-emerald-500'
  },
  'banu-makhzum': {
    icon: '🛡️',
    badgeBn: 'অশ্বারোহী বাহিনী ও সমর শিবির · খালিদ বিন ওয়ালিদ',
    badgeEn: 'Cavalry & Encampment · Khalid ibn al-Walid (RA)',
    gradientDay: 'from-indigo-500/15 via-sky-500/10 to-teal-500/5',
    gradientNight: 'from-indigo-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-indigo-400/60',
    borderNight: 'border-indigo-500/40',
    themeColor: 'text-indigo-400'
  },
  'banu-adi': {
    icon: '📜',
    badgeBn: 'কূটনীতি, দূত ও আন্তর্জাতিক সালিশি · হযরত উমর ফারুক',
    badgeEn: 'Diplomacy & Envoys · Umar Farooq (RA)',
    gradientDay: 'from-teal-500/15 via-emerald-500/10 to-slate-500/5',
    gradientNight: 'from-teal-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-teal-400/60',
    borderNight: 'border-teal-500/40',
    themeColor: 'text-teal-400'
  },
  'banu-taym': {
    icon: '⚖️',
    badgeBn: 'রক্তপণ (দিয়াত) ও ক্ষতিপূরণ · হযরত আবু বকর সিদ্দিক',
    badgeEn: 'Blood Money & Arbitration · Abu Bakr As-Siddiq (RA)',
    gradientDay: 'from-sky-500/15 via-teal-500/10 to-amber-500/5',
    gradientNight: 'from-sky-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-sky-400/60',
    borderNight: 'border-sky-500/40',
    themeColor: 'text-sky-400'
  },
  'banu-asad-quraysh': {
    icon: '🏛️',
    badgeBn: 'দারুন নাদওয়াহ ও বাণিজ্য · উম্মুল মুমিনীন খাদিজা ও যুবাইর',
    badgeEn: 'Dar al-Nadwah Assembly · Khadijah (RA) & Zubayr (RA)',
    gradientDay: 'from-purple-500/15 via-pink-500/10 to-amber-500/5',
    gradientNight: 'from-purple-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-purple-400/60',
    borderNight: 'border-purple-500/40',
    themeColor: 'text-purple-400'
  },
  'banu-zuhrah': {
    icon: '🌸',
    badgeBn: 'রাসূলুল্লাহ ﷺ-এর মাতামহ বংশ · আমিনা ও সা\'দ ইবনে আবি ওয়াক্কাস',
    badgeEn: 'Maternal Lineage of Prophet PBUH · Aminah & Sa\'d ibn Abi Waqqas',
    gradientDay: 'from-rose-500/15 via-amber-500/10 to-teal-500/5',
    gradientNight: 'from-rose-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-rose-400/60',
    borderNight: 'border-rose-500/40',
    themeColor: 'text-rose-400'
  },
  'quraysh-other-branches': {
    icon: '🔑',
    badgeBn: 'কাবার চাবি, লিওয়া, আযলাম ও হাদিয়াহ · মুস\'আব ইবনে উমায়ের',
    badgeEn: 'Keys of Kaaba, Standard, Divination & Offerings · Mus\'ab ibn Umair',
    gradientDay: 'from-amber-500/15 via-orange-500/10 to-teal-500/5',
    gradientNight: 'from-amber-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-amber-400/60',
    borderNight: 'border-amber-500/40',
    themeColor: 'text-amber-400'
  },
  'khazraj-tribe': {
    icon: '🌴',
    badgeBn: 'মদিনার আনসার (বৃহত্তম শাখা) · আবু আইয়ুব ও জাবির ইবনে আব্দুল্লাহ',
    badgeEn: 'Madinan Ansar (Largest Clan) · Abu Ayyub & Jabir ibn Abdillah',
    gradientDay: 'from-emerald-500/15 via-green-500/10 to-teal-500/5',
    gradientNight: 'from-emerald-900/30 via-[#061e22] to-[#041417]',
    borderDay: 'border-emerald-400/60',
    borderNight: 'border-emerald-500/40',
    themeColor: 'text-emerald-400'
  },
  'aws-tribe': {
    icon: '🌿',
    badgeBn: 'মদিনার আনসার (বীরত্বগাঁথা) · সা\'দ ইবনে মু\'আজ ও আসহাবে বদর',
    badgeEn: 'Madinan Ansar (Fierce Warriors) · Sa\'d ibn Mu\'adh & Badr Sahaba',
    gradientDay: 'from-teal-500/15 via-cyan-500/10 to-emerald-500/5',
    gradientNight: 'from-teal-900/30 via-[#061e22] to-[#041417]',
    borderDay: 'border-teal-400/60',
    borderNight: 'border-teal-500/40',
    themeColor: 'text-teal-400'
  },
  'madinah-jewish-tribes': {
    icon: '🏰',
    badgeBn: 'মদিনার কায়নুকা, নাদির ও কুরাইজা দুর্গ · ঐতিহাসিক চুক্তি ও সংঘাত',
    badgeEn: 'Fortresses of Qaynuqa, Nadir & Qurayzah · Historical Treaties',
    gradientDay: 'from-slate-500/15 via-zinc-500/10 to-stone-500/5',
    gradientNight: 'from-slate-900/30 via-[#061e22] to-[#041417]',
    borderDay: 'border-slate-400/60',
    borderNight: 'border-slate-500/40',
    themeColor: 'text-slate-400'
  },
  'banu-thaqif': {
    icon: '🏔️',
    badgeBn: 'তায়েফ নগরী ও রণপ্রস্তুতি · উরওয়া ইবনে মাসউদ ও মুগীরা',
    badgeEn: 'City of Taif & Preparations · Urwah ibn Mas\'ud & Mughirah',
    gradientDay: 'from-orange-500/15 via-amber-500/10 to-red-500/5',
    gradientNight: 'from-orange-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-orange-400/60',
    borderNight: 'border-orange-500/40',
    themeColor: 'text-orange-400'
  },
  'banu-hawazin-saad': {
    icon: '🌾',
    badgeBn: 'দুধমাতা হালিমা ও শুদ্ধতম আরবি · হুনাইনের ঐতিহাসিক ময়দান',
    badgeEn: 'Foster Mother Halimah & Pure Dialect · Battle of Hunayn',
    gradientDay: 'from-lime-500/15 via-emerald-500/10 to-teal-500/5',
    gradientNight: 'from-lime-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-lime-400/60',
    borderNight: 'border-lime-500/40',
    themeColor: 'text-lime-400'
  },
  'banu-khuzaa-bakr': {
    icon: '🤝',
    badgeBn: 'হুদাইবিয়ার চুক্তিতে মিত্রতা · মক্কা বিজয়ের ঐতিহাসিক পটভূমি',
    badgeEn: 'Treaty of Hudaybiyyah Allies · Conquest of Makkah Background',
    gradientDay: 'from-cyan-500/15 via-blue-500/10 to-teal-500/5',
    gradientNight: 'from-cyan-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-cyan-400/60',
    borderNight: 'border-cyan-500/40',
    themeColor: 'text-cyan-400'
  },
  'banu-ghifar-daws': {
    icon: '🏜️',
    badgeBn: 'বাণিজ্যপথ ও দক্ষিণ আরব · আবু যার ও আবু হুরায়রা (রা.)',
    badgeEn: 'Trade Routes & South Arabia · Abu Dharr & Abu Hurairah (RA)',
    gradientDay: 'from-amber-500/15 via-yellow-500/10 to-teal-500/5',
    gradientNight: 'from-amber-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-amber-400/60',
    borderNight: 'border-amber-500/40',
    themeColor: 'text-amber-400'
  },
  'banu-tamim-kalb': {
    icon: '🦁',
    badgeBn: 'নজদের বীর যোদ্ধা ও কবি · যায়েদ ইবনে হারিসা ও খাব্বাব',
    badgeEn: 'Warriors of Najd · Zaid ibn Harithah & Khabbab (RA)',
    gradientDay: 'from-red-500/15 via-amber-500/10 to-teal-500/5',
    gradientNight: 'from-red-900/25 via-[#061e22] to-[#041417]',
    borderDay: 'border-red-400/60',
    borderNight: 'border-red-500/40',
    themeColor: 'text-red-400'
  },
  'banu-ghatfan-hanifa': {
    icon: '⚔️',
    badgeBn: 'খন্দকের বিশাল বাহিনী ও ইয়ামামার ঐতিহাসিক সংঘাত',
    badgeEn: 'Confederate Army at Trench & Battle of Yamamah',
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
  const isBn = selectedLanguage === 'bn';
  const t = ARABER_GOTRO_TRANSLATIONS[isBn ? 'bn' : 'en'];
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
                <span>{t.backToLibrary}</span>
              </button>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-[10px] font-arabic text-emerald-200/90 tracking-wide font-medium">
                {BOOK_METADATA.titleAr}
              </span>
              <span className="text-[9px] px-2 py-0.2 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 font-bold whitespace-nowrap">
                {t.subHeaderBadge}
              </span>
            </div>
          </div>

          {/* Banner Title & Description */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <div>
              <h1 className="text-base sm:text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                <span className="text-lg">🛡️</span>
                <span>{t.mainHeaderTitle}</span>
              </h1>
              <p className="text-[11px] sm:text-xs text-emerald-100/90 leading-relaxed max-w-3xl mt-0.5">
                {t.mainHeaderDesc}
              </p>
            </div>
          </div>

          {/* Compact 4-Metric Strip */}
          <div className="pt-2 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px]">
            <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-lg border border-white/10">
              <span className="text-xs">🗺️</span>
              <div>
                <span className="text-emerald-200/70 block text-[9px]">{t.metricDomainLabel}</span>
                <span className="font-bold text-white truncate block">{t.metricDomainValue}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-lg border border-white/10">
              <span className="text-xs">🕋</span>
              <div>
                <span className="text-emerald-200/70 block text-[9px]">{t.metricKabaLabel}</span>
                <span className="font-bold text-white truncate block">{t.metricKabaValue}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-lg border border-white/10">
              <span className="text-xs">📜</span>
              <div>
                <span className="text-emerald-200/70 block text-[9px]">{t.metricTribeLabel}</span>
                <span className="font-bold text-amber-300 truncate block">{t.metricTribeValue}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-white/5 p-1.5 rounded-lg border border-white/10">
              <span className="text-xs">📊</span>
              <div>
                <span className="text-emerald-200/70 block text-[9px]">{t.metricSourceLabel}</span>
                <span className="font-bold text-emerald-200 truncate block">{t.metricSourceValue}</span>
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
          <span>{t.tabTopicToc}</span>
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
          <span>{t.tabDirectory}</span>
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
          <span>{t.tabReader}</span>
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
          <span>{t.tabWhoIsWho}</span>
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
          <span>{t.tabChartsGallery}</span>
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
          <span>{t.tabAppendix40}</span>
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
          <span>{t.tabBookmarks(bookmarkedPersonalities.length)}</span>
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
            placeholder={t.searchPlaceholderGlobal}
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
              {t.fontSizeNormal}
            </button>
            <button
              onClick={() => setFontSizeLevel('large')}
              className={`px-2 py-0.5 rounded text-[11px] transition ${
                fontSizeLevel === 'large'
                  ? isDay ? 'bg-white shadow-xs text-teal-800 font-bold' : 'bg-emerald-600 text-white font-bold'
                  : 'opacity-70'
              }`}
            >
              {t.fontSizeLarge}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          VIEW MODE 0: HAYATUS SAHABA STYLE TABLE OF CONTENTS
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
                placeholder={t.searchPlaceholderToc}
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

          {/* 4. BOOK TABLE OF CONTENTS (TOC) — 5 CATEGORY BOXES WITH NUMBERED LISTS */}
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
                    {t.tocTitle}
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-teal-300">
                    {t.tocSubtitle}
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
                    {t.allTopicsBtn}
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
                  <span>{t.allChartsBtn}</span>
                </button>
              </div>
            </div>

            {/* Category Boxes Grid with Numbered Lists inside */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {TOPIC_WISE_TOC_DATA
                .filter(topic => selectedTocTopicId === 'all' || topic.id === selectedTocTopicId)
                .map((topic) => {
                  const topicDataEn = TOPIC_TOC_ENGLISH_MAP[topic.id];
                  const themeBadge = isBn ? topic.themeBadgeBn : (topicDataEn?.themeBadgeEn || topic.themeBadgeBn);

                  const filteredSubs = topic.subsections.filter(s => {
                    if (!tocSearchQuery.trim()) return true;
                    const q = tocSearchQuery.toLowerCase();
                    const subDataEn = topicDataEn?.subsectionsEn?.[s.id];
                    const sTitle = isBn ? s.titleBn : (subDataEn?.titleEn || s.titleBn);
                    const sSubtitle = isBn ? s.subtitleBn : (subDataEn?.subtitleEn || s.subtitleBn);
                    const sBadge = isBn ? s.badgeBn : (subDataEn?.badgeEn || s.badgeBn);

                    return sTitle.toLowerCase().includes(q) ||
                      sSubtitle.toLowerCase().includes(q) ||
                      sBadge.toLowerCase().includes(q) ||
                      s.figuresPreview?.some(f => f.toLowerCase().includes(q));
                  });

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
                              {t.topicNumLabel(topic.topicNumber)}
                            </span>
                            <h4 className="font-extrabold text-xs text-amber-700 dark:text-amber-300 truncate">
                              {themeBadge}
                            </h4>
                          </div>
                        </div>
                        <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                          {t.topicCountBadge(filteredSubs.length)}
                        </span>
                      </div>

                      {/* Numbered List of Chapters/Subsections */}
                      <div className="space-y-1 max-h-60 overflow-y-auto pr-0.5 scrollbar-thin">
                        {filteredSubs.map((sub, sIdx) => {
                          const isChart = sub.type === 'chart';
                          const subDataEn = topicDataEn?.subsectionsEn?.[sub.id];
                          const subTitle = isBn ? sub.titleBn : (subDataEn?.titleEn || sub.titleBn);
                          const subSubtitle = isBn ? sub.subtitleBn : (subDataEn?.subtitleEn || sub.subtitleBn);

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
                                  <div className="truncate text-[11px]">{subTitle}</div>
                                  <div className="text-[9px] opacity-70 truncate font-normal">
                                    {subSubtitle}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                <span className={`text-[8px] px-1 py-0.2 rounded font-black hidden sm:inline ${
                                  isChart ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/10 text-emerald-400'
                                }`}>
                                  {isChart ? t.badgeChart : t.badgeRead}
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
                            📊 {isBn ? topic.relatedChartTitleBn : 'Chart Diagram'}
                          </span>
                          <button
                            onClick={() => openChart(topic.relatedChartKey)}
                            className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>{t.topicChartBtn}</span>
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
                    {t.topicNumLabel(1)}
                  </span>
                  <span className="text-base">🏛️</span>
                </div>
                <h3 className="text-sm sm:text-base font-black tracking-tight mt-0.5">
                  {t.dirTopic1Title}
                </h3>
                <p className={`text-[11px] leading-relaxed line-clamp-2 ${chapterFilter === 1 ? 'text-white/80' : 'opacity-70'}`}>
                  {t.dirTopic1Desc}
                </p>
              </div>

              <div className="pt-1.5 border-t border-dashed border-white/20 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold">
                <span>{t.dirTopic1Footer}</span>
                <span className={chapterFilter === 1 ? 'text-amber-200' : 'text-emerald-500'}>
                  {chapterFilter === 1 ? t.filterSelected : t.filterDefault}
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
                    {t.topicNumLabel(2)}
                  </span>
                  <span className="text-base">🌴</span>
                </div>
                <h3 className="text-sm sm:text-base font-black tracking-tight mt-0.5">
                  {t.dirTopic2Title}
                </h3>
                <p className={`text-[11px] leading-relaxed line-clamp-2 ${chapterFilter === 2 ? 'text-white/80' : 'opacity-70'}`}>
                  {t.dirTopic2Desc}
                </p>
              </div>

              <div className="pt-1.5 border-t border-dashed border-white/20 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold">
                <span>{t.dirTopic2Footer}</span>
                <span className={chapterFilter === 2 ? 'text-amber-200' : 'text-teal-400'}>
                  {chapterFilter === 2 ? t.filterSelected : t.filterDefault}
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
                    {t.topicNumLabel(3)}
                  </span>
                  <span className="text-base">🧭</span>
                </div>
                <h3 className="text-sm sm:text-base font-black tracking-tight mt-0.5">
                  {t.dirTopic3Title}
                </h3>
                <p className={`text-[11px] leading-relaxed line-clamp-2 ${chapterFilter === 3 ? 'text-white/80' : 'opacity-70'}`}>
                  {t.dirTopic3Desc}
                </p>
              </div>

              <div className="pt-1.5 border-t border-dashed border-white/20 dark:border-slate-800 flex items-center justify-between text-[10px] font-bold">
                <span>{t.dirTopic3Footer}</span>
                <span className={chapterFilter === 3 ? 'text-amber-200' : 'text-orange-400'}>
                  {chapterFilter === 3 ? t.filterSelected : t.filterDefault}
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
              <span>{t.keyChartsStripLabel}</span>
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  setViewMode('charts_gallery');
                  setActiveChartTab('quraysh_roles');
                }}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 hover:bg-amber-500/25 whitespace-nowrap transition cursor-pointer"
              >
                {t.chartBtnQurayshRoles}
              </button>

              <button
                onClick={() => {
                  setViewMode('charts_gallery');
                  setActiveChartTab('hashim_tree');
                }}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 whitespace-nowrap transition cursor-pointer"
              >
                {t.chartBtnHashimTree}
              </button>

              <button
                onClick={() => {
                  setViewMode('charts_gallery');
                  setActiveChartTab('ansar_tree');
                }}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-teal-500/15 text-teal-400 border border-teal-500/30 hover:bg-teal-500/25 whitespace-nowrap transition cursor-pointer"
              >
                {t.chartBtnAnsarTree}
              </button>

              <button
                onClick={() => {
                  setViewMode('charts_gallery');
                  setActiveChartTab('statistics');
                }}
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 hover:bg-indigo-500/25 whitespace-nowrap transition cursor-pointer"
              >
                {t.chartBtnStats}
              </button>
            </div>
          </div>

          {/* Compact Clan Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredClans.map((sec) => {
              const meta = CLAN_VISUAL_MAP[sec.id] || {
                icon: '🛡️',
                badgeBn: sec.responsibilityOrRoleBn,
                badgeEn: sec.responsibilityOrRoleEn || sec.responsibilityOrRoleBn,
                gradientDay: 'from-slate-50 to-white',
                gradientNight: 'from-[#082226] to-[#041417]',
                borderDay: 'border-slate-200',
                borderNight: 'border-[#153e46]',
                themeColor: 'text-emerald-400'
              };

              const tribeName = isBn ? sec.tribeNameBn : (sec.tribeNameEn || sec.tribeNameBn);
              const locationText = isBn ? sec.locationOrContextBn : (sec.locationOrContextEn || sec.locationOrContextBn);
              const roleText = isBn ? sec.responsibilityOrRoleBn : (sec.responsibilityOrRoleEn || sec.responsibilityOrRoleBn);

              const prominentSahaba = sec.personalities
                .filter(p => p.category === 'sahabi')
                .slice(0, 3)
                .map(p => isBn ? p.nameBn : (p.nameEn || p.nameBn));

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
                              {tribeName}
                            </h4>
                            {sec.tribeNameAr && (
                              <span className="text-[10px] font-arabic text-amber-500/80 font-bold hidden sm:inline">
                                ({sec.tribeNameAr})
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] opacity-75 block mt-0.5">
                            {locationText}
                          </span>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 shrink-0">
                        {t.figureCountBadge(sec.personalities.length)}
                      </span>
                    </div>

                    {/* Role / Responsibility Badge */}
                    <div className="p-2 rounded-lg bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 text-[11px]">
                      <span className="font-bold text-amber-500 block mb-0.5">{t.roleLabel}</span>
                      <p className="leading-relaxed opacity-90 line-clamp-2">
                        {roleText}
                      </p>
                    </div>

                    {/* Prominent Personalities Preview */}
                    {prominentSahaba.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                          {t.notableFiguresLabel}
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
                              +{sec.personalities.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-dashed border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition">
                      <span>{t.readSeerahBtn}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[9px] opacity-70">
                      {sec.subClans ? t.subClansCount(sec.subClans.length) : t.mainBranchLabel}
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
                const sTribeName = isBn ? s.tribeNameBn : (s.tribeNameEn || s.tribeNameBn);

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
                    <span>{sTribeName}</span>
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
                    <h2 className="text-lg sm:text-xl font-black tracking-tight">
                      {isBn ? activeClan.tribeNameBn : (activeClan.tribeNameEn || activeClan.tribeNameBn)}
                    </h2>
                    {activeClan.tribeNameAr && (
                      <span className="text-xs font-arabic text-amber-500 font-bold">
                        ({activeClan.tribeNameAr})
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] sm:text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    <span>{isBn ? activeClan.locationOrContextBn : (activeClan.locationOrContextEn || activeClan.locationOrContextBn)}</span>
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
                  <span className="hidden sm:inline">{t.prevClanBtn}</span>
                </button>
                <button
                  disabled={!hasNextClan}
                  onClick={handleNextClan}
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold flex items-center gap-1 transition ${
                    hasNextClan ? 'cursor-pointer hover:bg-black/5 dark:hover:bg-white/10' : 'opacity-40 cursor-not-allowed'
                  }`}
                >
                  <span className="hidden sm:inline">{t.nextClanBtn}</span>
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
                <span>{t.dignityTitle}</span>
              </div>
              <p className="text-xs sm:text-sm font-bold leading-relaxed">
                {isBn ? activeClan.responsibilityOrRoleBn : (activeClan.responsibilityOrRoleEn || activeClan.responsibilityOrRoleBn)}
              </p>
            </div>

            {/* Introduction Story */}
            <div className={`p-5 rounded-2xl border leading-relaxed space-y-3 ${
              isDay ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-[#041417] border-[#153e46] text-emerald-100'
            }`}>
              <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{t.introTitle}</span>
                </span>
                <button
                  onClick={(e) => handleCopy(isBn ? activeClan.introductionBn : (activeClan.introductionEn || activeClan.introductionBn), `intro-${activeClan.id}`, e)}
                  className="opacity-70 hover:opacity-100 flex items-center gap-1 cursor-pointer"
                >
                  {copiedId === `intro-${activeClan.id}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedId === `intro-${activeClan.id}` ? t.copiedBtn : t.copyBtn}</span>
                </button>
              </div>
              <p className={fontSizeLevel === 'large' ? 'text-base sm:text-lg leading-relaxed' : 'text-sm sm:text-base leading-relaxed'}>
                {isBn ? activeClan.introductionBn : (activeClan.introductionEn || activeClan.introductionBn)}
              </p>
            </div>

            {/* If Banu Hashim: Embed Genealogy Chart */}
            {activeClan.id === 'banu-hashim' && (
              <div className={`p-5 sm:p-6 rounded-2xl border shadow-inner space-y-5 ${
                isDay ? 'bg-amber-50/60 border-amber-300' : 'bg-[#051e22] border-amber-500/40'
              }`}>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-500">
                    {t.genealogyTitle}
                  </span>
                  <h4 className="text-sm sm:text-base font-black tracking-tight mt-1">
                    {t.genealogySubtitle}
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
                    {BANU_HASHIM_GENEALOGY.son.sons.map((son, sIdx) => {
                      const sonName = son.name;
                      const sonDesc = son.desc;

                      return (
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
                          <div className="font-bold text-xs sm:text-sm">{sonName}</div>
                          <div className="text-[10px] opacity-75 leading-snug">{sonDesc}</div>

                          {son.children && son.children.length > 0 && (
                            <div className="pt-2 border-t border-dashed border-slate-300 dark:border-slate-700 space-y-1">
                              {son.children.map((child: any, cIdx: number) => {
                                const childName = isBn ? child.name : (child.nameEn || child.name);
                                return (
                                  <div
                                    key={cIdx}
                                    className={`p-1.5 rounded-lg text-[10px] font-bold ${
                                      child.isProphet
                                        ? 'bg-emerald-600 text-white shadow-sm'
                                        : 'bg-black/5 dark:bg-white/5 text-amber-500'
                                    }`}
                                  >
                                    {childName}
                                    {child.marriageTo && (
                                      <div className="text-[9px] opacity-80 font-normal mt-0.5 text-pink-300">
                                        Marriage: {child.marriageTo}
                                      </div>
                                    )}
                                    {child.sons && (
                                      <div className="text-[9px] opacity-90 font-bold mt-0.5 text-amber-300">
                                        ↓ {child.sons.join(isBn ? ' ও ' : ' & ')}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Clans if any */}
            {activeClan.subClans && activeClan.subClans.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                  <Building className="w-4 h-4" />
                  <span>{t.subClansHeader(activeClan.subClans.length)}</span>
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
                        {isBn ? sc.nameBn : (sc.nameEn || sc.nameBn)}
                      </h5>
                      <p className="text-xs leading-relaxed opacity-90">
                        {isBn ? sc.descriptionBn : (sc.descriptionEn || sc.descriptionBn)}
                      </p>
                      {sc.notableFigures && (
                        <div className="text-[11px] opacity-75 pt-1 border-t border-dashed border-slate-200 dark:border-slate-800">
                          <strong>{isBn ? 'ব্যক্তিত্ব:' : 'Figures:'}</strong> {sc.notableFigures.join(', ')}
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
                  <span>{t.notableFiguresHeader(activeClan.personalities.length)}</span>
                </h4>
                <span className="text-xs opacity-60">{t.clickToReadTip}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {activeClan.personalities.map((pers) => {
                  const isBookmarked = bookmarks[pers.id];
                  const isNegative = pers.category === 'negative';
                  const isProphet = pers.id === 'prophet-muhammad';
                  const persName = isBn ? pers.nameBn : (pers.nameEn || pers.nameBn);
                  const persRole = isBn ? pers.roleBn : (pers.roleEn || pers.roleBn);
                  const persBio = isBn ? pers.bioBn : (pers.bioEn || pers.bioBn);
                  const persRef = isBn ? pers.referenceBn : (pers.referenceEn || pers.referenceBn);

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
                              {persName}
                            </h5>
                            {pers.nameAr && (
                              <span className="text-xs font-arabic text-amber-500/80 block mt-0.5">
                                {pers.nameAr}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={(e) => toggleBookmark(pers.id, e)}
                            title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
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
                            {persRole}
                          </span>
                        </div>

                        {/* Bio */}
                        <p className={`text-xs leading-relaxed line-clamp-3 ${
                          isDay ? 'text-slate-600' : 'text-emerald-200/80'
                        } ${fontSizeLevel === 'large' ? 'text-sm' : 'text-xs'}`}>
                          {persBio}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] opacity-75">
                        <span className="truncate max-w-[200px]">📚 {persRef}</span>
                        <span className="font-bold text-amber-500 flex items-center gap-0.5 group-hover:translate-x-1 transition">
                          <span>{isBn ? 'বিস্তারিত' : 'Details'}</span>
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
                  <span>{t.referencesTitle}</span>
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
                <span>{t.prevClanBtn}</span>
              </button>

              <button
                onClick={() => setViewMode('directory')}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow cursor-pointer"
              >
                {t.returnToDirectoryBtn}
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
                <span>{t.nextClanBtn}</span>
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
                  <span>{t.mappingHeaderTitle}</span>
                </h3>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed mt-1">
                  {t.mappingHeaderDesc}
                </p>
              </div>

              {/* Special Cross-Category Quick Tabs */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'all', label: t.specCatAll, icon: '📜' },
                  { id: 'ashara_mubashshara', label: t.specCatAshara, icon: '🌟' },
                  { id: 'mothers_of_believers', label: t.specCatMothers, icon: '🌸' },
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
                <span className="text-xs font-bold opacity-60">{t.filterChapterLabel}</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { id: 'all', label: t.chapterAll },
                    { id: 1, label: t.chapter1 },
                    { id: 2, label: t.chapter2 },
                    { id: 3, label: t.chapter3 },
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
                      ? t.asharaSectionTitle
                      : t.mothersSectionTitle}
                  </span>
                </h4>
                <span className="text-xs font-bold opacity-70">
                  {t.figureCountBadge(SPECIAL_HISTORICAL_CROSS_INDEX.filter(item => item.categoryType === selectedSpecialCategory).length)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {SPECIAL_HISTORICAL_CROSS_INDEX
                  .filter(item => item.categoryType === selectedSpecialCategory)
                  .map((item) => {
                    const itemName = item.nameBn;
                    const ancestorIntersection = item.ancestorIntersectionBn;
                    const clanName = item.clanBn;
                    const significance = item.significanceBn;

                    return (
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
                                  {itemName}
                                </h5>
                                <button
                                  onClick={(e) => handlePlayVoice(item.nameAr, `voice-${item.id}`, e)}
                                  title={t.voiceTitleAr}
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
                              {ancestorIntersection}
                            </span>
                          </div>

                          {/* Clan badge */}
                          <div className="p-2 rounded-xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
                            <span className="font-bold text-slate-700 dark:text-slate-300">
                              🏛️ {t.clanTitleLabel} <strong className="text-amber-500">{clanName}</strong>
                            </span>
                            <span className="text-[11px] opacity-75">
                              {t.intersectionLabel} {ancestorIntersection}
                            </span>
                          </div>

                          <p className="text-xs leading-relaxed opacity-90 pt-1">
                            {significance}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                          <button
                            onClick={() => openClanInReader(item.clanId)}
                            className="font-bold text-emerald-600 dark:text-emerald-400 hover:text-amber-500 flex items-center gap-1 cursor-pointer"
                          >
                            <span>{t.readClanSeerahBtn}</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
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

                const tribeName = isBn ? clan.tribeNameBn : (clan.tribeNameEn || clan.tribeNameBn);
                const locationText = isBn ? clan.locationOrContextBn : (clan.locationOrContextEn || clan.locationOrContextBn);
                const roleText = isBn ? clan.responsibilityOrRoleBn : (clan.responsibilityOrRoleEn || clan.responsibilityOrRoleBn);

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
                            <h4 className="text-base sm:text-lg font-black tracking-tight">{tribeName}</h4>
                            {clan.tribeNameAr && (
                              <div className="flex items-center gap-1">
                                <span className="text-xs font-arabic text-amber-500 font-bold">({clan.tribeNameAr})</span>
                                <button
                                  onClick={(e) => handlePlayVoice(clan.tribeNameAr!, `clan-${clan.id}`, e)}
                                  title={t.voiceTitleAr}
                                  className={`p-1 rounded-md border text-xs transition ${
                                    playingVoiceId === `clan-${clan.id}` ? 'bg-amber-500 text-white animate-pulse' : 'opacity-60 hover:opacity-100'
                                  }`}
                                >
                                  <Volume2 className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                          </div>
                          <p className="text-xs opacity-75 mt-0.5">{locationText}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-center">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400">
                          {t.figureCountBadge(clan.personalities.length)}
                        </span>
                        <button
                          onClick={() => openClanInReader(clan.id)}
                          className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>{t.readSeerahBtn}</span>
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
                          <strong className="text-amber-500">{t.roleLabel}:</strong> {roleText}
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
                              <span>{t.sahabaCategoryLabel} ({sahaba.length})</span>
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
                                  <span className="font-bold">{isBn ? s.nameBn : (s.nameEn || s.nameBn)}</span>
                                  <span className="text-[10px] opacity-75 block text-amber-500">{isBn ? s.roleBn : (s.roleEn || s.roleBn)}</span>
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
                              <span>{t.historicalCategoryLabel} ({historical.length})</span>
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
                                  <span className="font-bold">{isBn ? h.nameBn : (h.nameEn || h.nameBn)}</span>
                                  <span className="text-[10px] opacity-75 block text-teal-500">{isBn ? h.roleBn : (h.roleEn || h.roleBn)}</span>
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
                              <span>{t.negativeCategoryLabel} ({negative.length})</span>
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
                                  <span className="font-bold text-rose-400">{isBn ? n.nameBn : (n.nameEn || n.nameBn)}</span>
                                  <span className="text-[10px] opacity-75 block text-slate-400">{isBn ? n.roleBn : (n.roleEn || n.roleBn)}</span>
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
              {t.galleryTabQurayshRoles}
            </button>

            <button
              onClick={() => setActiveChartTab('quraysh_convergence')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeChartTab === 'quraysh_convergence'
                  ? isDay ? 'bg-white text-teal-800 shadow' : 'bg-emerald-600 text-white shadow'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              {t.galleryTabQurayshConvergence}
            </button>

            <button
              onClick={() => setActiveChartTab('hashim_tree')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeChartTab === 'hashim_tree'
                  ? isDay ? 'bg-white text-teal-800 shadow' : 'bg-emerald-600 text-white shadow'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              {t.galleryTabHashimTree}
            </button>

            <button
              onClick={() => setActiveChartTab('ansar_tree')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeChartTab === 'ansar_tree'
                  ? isDay ? 'bg-white text-teal-800 shadow' : 'bg-emerald-600 text-white shadow'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              {t.galleryTabAnsarTree}
            </button>

            <button
              onClick={() => setActiveChartTab('arab_map')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeChartTab === 'arab_map'
                  ? isDay ? 'bg-white text-teal-800 shadow' : 'bg-emerald-600 text-white shadow'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              {t.galleryTabArabMap}
            </button>

            <button
              onClick={() => setActiveChartTab('statistics')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                activeChartTab === 'statistics'
                  ? isDay ? 'bg-white text-teal-800 shadow' : 'bg-emerald-600 text-white shadow'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              {t.galleryTabStats}
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
                        {t.galleryTabQurayshRoles}
                      </span>
                      <span className="text-xs opacity-60 font-semibold">• {t.rolesHeaderTitle}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black flex items-center gap-2.5">
                      <Building className="w-6 h-6 text-amber-500 shrink-0" />
                      <span>{t.rolesHeaderTitle}</span>
                    </h3>
                    <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
                      {t.rolesHeaderDesc}
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl border text-xs max-w-xs shrink-0 ${
                    isDay ? 'bg-amber-50/70 border-amber-200 text-amber-950' : 'bg-[#041417]/80 border-amber-500/30 text-amber-200'
                  }`}>
                    <div className="font-bold flex items-center gap-1.5 text-amber-500 mb-1">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>{isBn ? 'সীরাতের প্রামাণ্য নির্দেশিকা' : 'Authentic Seerah Guidance'}</span>
                    </div>
                    <p className="text-[11px] leading-relaxed opacity-90">
                      {t.rolesMakkahHadith}
                    </p>
                  </div>
                </div>

                {/* Domain Filter Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-5 border-t border-slate-200/60 dark:border-slate-800/80 scrollbar-none">
                  {[
                    { id: 'all', label: t.rolesFilterAll, icon: '🏛️' },
                    { id: 'kaba_service', label: t.rolesFilterService, icon: '💧' },
                    { id: 'military', label: t.rolesFilterMilitary, icon: '🛡️' },
                    { id: 'judiciary', label: t.rolesFilterJudiciary, icon: '⚖️' },
                    { id: 'parliament', label: t.rolesFilterParliament, icon: '📜' },
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
                  <span className="text-[11px] font-bold opacity-60 shrink-0">{t.keyChartsStripLabel}</span>
                  {MAKKAH_RESPONSIBILITIES.map((r, i) => {
                    const clanName = isBn ? r.clanBn : (r.clanEn || r.clanBn);
                    return (
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
                        <span>{clanName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Grid of Responsibility Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResponsibilities.map((resp, idx) => {
                  const roleNumber = MAKKAH_RESPONSIBILITIES.findIndex(r => r.clanBn === resp.clanBn) + 1;
                  const clanName = isBn ? resp.clanBn : (resp.clanEn || resp.clanBn);
                  const responsibilityText = isBn ? resp.responsibilityBn : (resp.responsibilityEn || resp.responsibilityBn);
                  const detailsText = isBn ? resp.detailsBn : (resp.detailsEn || resp.detailsBn);
                  const preHolder = isBn ? resp.preIslamicHolder : (resp.preIslamicHolderEn || resp.preIslamicHolder);
                  const isoHolder = isBn ? resp.islamicHolder : (resp.islamicHolderEn || resp.islamicHolder);

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
                                  {clanName}
                                </h4>
                                {resp.responsibilityAr && (
                                  <span className="text-[11px] font-arabic opacity-70 text-amber-500 hidden sm:inline" dir="rtl">
                                    {resp.responsibilityAr}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs font-semibold text-amber-500 flex items-center gap-1.5 mt-0.5">
                                <span>{responsibilityText}</span>
                              </div>
                            </div>
                          </div>

                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border shrink-0 ${
                            isDay ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-[#041417] text-emerald-300 border-[#153e46]'
                          }`}>
                            #{roleNumber}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm opacity-85 leading-relaxed pt-1">
                          {detailsText}
                        </p>

                        {/* Dual-Era Leadership Pill Box */}
                        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs rounded-xl p-3 border ${
                          isDay ? 'bg-slate-50 border-slate-200' : 'bg-[#041417]/70 border-[#153e46]'
                        }`}>
                          {preHolder && (
                            <div>
                              <span className="text-[10px] font-bold opacity-60 block uppercase">{t.preIslamicLeadership}</span>
                              <span className="font-semibold text-slate-800 dark:text-slate-200 text-[11px]">
                                {preHolder}
                              </span>
                            </div>
                          )}
                          {isoHolder && (
                            <div>
                              <span className="text-[10px] font-bold text-emerald-500 block uppercase">{t.islamicPosition}</span>
                              <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-[11px]">
                                {isoHolder}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold group-hover:text-amber-500 transition-colors">
                        <span>{isBn ? 'বিস্তারিত তথ্য পড়ুন' : 'Read Details'}</span>
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
                    {t.galleryTabQurayshConvergence}
                  </span>
                  <span className="text-xs opacity-60">• {t.convergenceHeaderTitle}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black">{t.convergenceHeaderTitle}</h3>
                <p className="text-xs sm:text-sm opacity-85 leading-relaxed">
                  {t.convergenceHeaderDesc}
                </p>
              </div>

              {/* Hadith Note */}
              <div className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                isDay ? 'bg-amber-50/70 border-amber-300 text-amber-950' : 'bg-amber-950/20 border-amber-500/30 text-amber-200'
              }`}>
                <p className="font-semibold">
                  {t.convergenceHadithNote}
                </p>
              </div>

              {/* Generation Nodes list */}
              <div className="space-y-6 pt-2">
                {QURAYSH_CONVERGENCE_TREE.map((node, nIdx) => {
                  const ancestorName = node.ancestorNameBn;
                  const significance = node.significanceBn;
                  const noteText = node.hadithOrHistoryNoteBn;

                  return (
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
                            {t.generationLevel(node.generationNumber)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
                                {ancestorName}
                              </h4>
                              <button
                                onClick={(e) => handlePlayVoice(node.ancestorNameAr, `anc-${nIdx}`, e)}
                                title={t.voiceTitleAr}
                                className={`p-1 rounded-md border text-xs transition ${
                                  playingVoiceId === `anc-${nIdx}` ? 'bg-amber-500 text-white animate-pulse' : 'opacity-60 hover:opacity-100'
                                }`}
                              >
                                <Volume2 className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="text-xs font-arabic text-amber-500 font-semibold" dir="rtl">
                              {node.ancestorNameAr}
                            </span>
                          </div>
                        </div>

                        <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 self-start sm:self-center">
                          {t.connectedBranchesCount(node.connectedBranches.length)}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm opacity-85 leading-relaxed pt-2">
                        {significance}
                      </p>

                      {/* Connected Clan Branches */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3">
                        {node.connectedBranches.map((branch, bIdx) => {
                          const branchClanName = branch.clanNameBn;
                          const branchRoleTitle = branch.roleTitleBn;

                          return (
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
                                  {branchClanName}
                                </h5>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 opacity-80">
                                  {branchRoleTitle}
                                </span>
                              </div>

                              <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase text-emerald-600 dark:text-emerald-400 block">
                                  {t.prominentSahaba}
                                </span>
                                <div className="flex flex-wrap gap-1">
                                  {branch.prominentSahaba.map((sahabi, sIdx) => {
                                    return (
                                      <span
                                        key={sIdx}
                                        className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5"
                                      >
                                        {sahabi}
                                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {noteText && (
                        <div className="pt-2 text-[11px] text-amber-500 opacity-90 font-medium italic">
                          📜 {noteText}
                        </div>
                      )}
                    </div>
                  );
                })}
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
                      {t.galleryTabHashimTree}
                    </span>
                    <span className="text-xs opacity-60">• {t.hashimHeaderTitle}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">{t.hashimHeaderTitle}</h3>
                  <p className="text-xs sm:text-sm opacity-80">
                    {t.hashimHeaderDesc}
                  </p>
                </div>

                {/* Branch Selector */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { id: 'all', label: t.hashimBranchAll },
                    { id: 'prophet', label: t.hashimBranchProphet },
                    { id: 'martyrs_caliphs', label: t.hashimBranchMartyrs },
                    { id: 'uncles', label: t.hashimBranchUncles },
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
                  {t.hashimHadithNote}
                </p>
              </div>

              {/* Interactive Royal Family Tree Layout */}
              <div className="space-y-4 pt-2">
                {/* Level 1: Root - Hashim */}
                <div className="flex flex-col items-center">
                  <div className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-base text-center shadow-lg border border-amber-300 ring-4 ring-amber-500/20">
                    <div className="text-[11px] font-bold uppercase tracking-widest text-slate-900/70">{isBn ? 'মূল পুরুষ' : 'Root Ancestor'}</div>
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
                    <div className="text-[11px] font-bold text-amber-500 uppercase tracking-wider">{isBn ? 'মক্কার সর্দার' : 'Guardian of Makkah'}</div>
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
                      const sonName = son.name;
                      const sonDesc = son.desc;

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
                              {isBn ? 'পুত্র' : 'Son'}
                            </span>
                            <div className="font-black text-sm sm:text-base">{sonName}</div>
                            <div className="text-[11px] opacity-80 leading-snug">{sonDesc}</div>
                          </div>

                          {son.children && son.children.length > 0 && (
                            <div className="pt-2 border-t border-dashed border-slate-300 dark:border-slate-700/80 space-y-2 mt-2">
                              {son.children.map((child: any, cIdx: number) => {
                                const childName = child.name;
                                const childBadge = child.badge;
                                const childTitle = child.title;

                                return (
                                  <div
                                    key={cIdx}
                                    className={`p-2.5 rounded-xl text-left border space-y-1.5 ${
                                      child.isProphet
                                        ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md border-emerald-400 ring-2 ring-amber-400/40'
                                        : isDay ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#082226] border-[#153e46] text-slate-200'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between gap-1">
                                      <span className="font-black text-xs">{childName}</span>
                                      {child.isProphet && (
                                        <span className="text-[10px] bg-amber-400 text-slate-950 font-black px-1.5 py-0.5 rounded">
                                          {isBn ? 'সর্বশেষ নবী' : 'Final Prophet'}
                                        </span>
                                      )}
                                      {childBadge && !child.isProphet && (
                                        <span className="text-[9px] bg-emerald-500/20 text-emerald-400 font-bold px-1.5 py-0.2 rounded border border-emerald-500/30">
                                          {childBadge}
                                        </span>
                                      )}
                                    </div>

                                    {childTitle && (
                                      <div className="text-[10px] opacity-80 text-amber-400 font-medium">
                                        {childTitle}
                                      </div>
                                    )}

                                    {/* Ahl al-Bayt Nested Children (e.g. Sayyida Fatima and Hasan-Husain) */}
                                    {child.children && child.children.length > 0 && (
                                      <div className="pt-1.5 mt-1 border-t border-white/20 space-y-1.5">
                                        {child.children.map((subChild: any, scIdx: number) => {
                                          const subName = subChild.name;
                                          const subBadge = subChild.badge;
                                          const marriageText = subChild.marriageTo;
                                          const sonsJoined = subChild.sons?.join(isBn ? ' ও ' : ' & ');

                                          return (
                                            <div
                                              key={scIdx}
                                              className="p-1.5 rounded-lg bg-black/20 border border-amber-300/30 text-[10px]"
                                            >
                                              <div className="flex items-center justify-between">
                                                <span className="font-black text-amber-300">{subName}</span>
                                                <span className="text-[9px] text-emerald-200 bg-emerald-800/40 px-1 py-0.2 rounded">
                                                  {subBadge}
                                                </span>
                                              </div>
                                              {subChild.marriageTo && (
                                                <div className="text-[9px] text-pink-200 mt-0.5">
                                                  {isBn ? 'বিবাহ:' : 'Marriage:'} {marriageText}
                                                </div>
                                              )}
                                              {subChild.sons && (
                                                <div className="text-[9px] text-amber-200 font-bold mt-0.5">
                                                  {isBn ? 'জান্নাতী সর্দার:' : 'Leaders in Paradise:'} {sonsJoined}
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
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
                      {t.galleryTabAnsarTree}
                    </span>
                    <span className="text-xs opacity-60">• {t.ansarHeaderDesc}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black">{t.ansarHeaderTitle}</h3>
                  <p className="text-xs sm:text-sm opacity-80">
                    {t.ansarHeaderDesc}
                  </p>
                </div>

                {/* Sub Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {[
                    { id: 'tree', label: t.ansarSubTabTree },
                    { id: 'comparison', label: t.ansarSubTabComparison },
                    { id: 'virtues', label: t.ansarSubTabVirtues },
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
                      <div className="text-[10px] font-bold uppercase tracking-wider text-teal-200">{isBn ? 'আদি পুরুষ' : 'Root Ancestor'}</div>
                      <div>{ANSAR_GENEALOGY.ancestor}</div>
                    </div>
                    <div className="w-0.5 h-6 bg-teal-500/50" />
                  </div>

                  {/* Two Main Clans */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ANSAR_GENEALOGY.branches.map((branch, bIdx) => {
                      const isKhazraj = branch.name.includes('খাযরাজ');
                      const branchName = branch.name;

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
                                {isKhazraj ? (isBn ? 'খাযরাজ' : 'Khazraj') : (isBn ? 'আওস' : 'Aws')}
                              </span>
                              <h4 className="text-lg sm:text-xl font-black mt-1 text-emerald-600 dark:text-emerald-400">
                                {branchName}
                              </h4>
                            </div>
                            <span className="text-xs opacity-75 font-bold px-2.5 py-1 rounded-xl bg-black/5 dark:bg-white/5">
                              {t.subClansCount(branch.subClans.length)}
                            </span>
                          </div>

                          <div className="space-y-2.5">
                            {branch.subClans.map((sub, sIdx) => {
                              const subName = sub.name;
                              const leaderName = sub.leader;
                              const subNote = sub.note;

                              return (
                                <div
                                  key={sIdx}
                                  className={`p-3.5 rounded-2xl border transition-all ${
                                    isDay ? 'bg-white border-slate-200 hover:border-teal-400' : 'bg-[#082226] border-[#153e46] hover:border-emerald-500'
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-2 mb-1">
                                    <div className="font-bold text-xs sm:text-sm">{subName}</div>
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-500 shrink-0">
                                      {isBn ? `সর্দার: ${leaderName}` : `Leader: ${leaderName}`}
                                    </span>
                                  </div>
                                  <div className="text-xs opacity-80 leading-relaxed">{subNote}</div>
                                </div>
                              );
                            })}
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
                          <th className="p-3.5 font-black">{isBn ? 'তুলনার বিষয়' : 'Topic'}</th>
                          <th className="p-3.5 font-black text-amber-500">{isBn ? 'বনু খাযরাজ' : 'Banu Khazraj'}</th>
                          <th className="p-3.5 font-black text-teal-400">{isBn ? 'বনু আওস' : 'Banu Aws'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        <tr>
                          <td className="p-3.5 font-bold opacity-70">{isBn ? 'আদি বংশধারা' : 'Ancestral Lineage'}</td>
                          <td className="p-3.5">{isBn ? 'খাযরাজ ইবনে হারিসাহ (আজদ কাহতান)' : 'Khazraj ibn Harithah (Azd Kahlan)'}</td>
                          <td className="p-3.5">{isBn ? 'আওস ইবনে হারিসাহ (আজদ কাহতান)' : 'Aws ibn Harithah (Azd Kahlan)'}</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-bold opacity-70">{isBn ? 'জনসংখ্যা ও প্রভাব' : 'Population & Strength'}</td>
                          <td className="p-3.5">{isBn ? 'মদিনার বৃহত্তর শাখা (~৩/৪ অংশ)' : 'Majority Clan in Madinah (~3/4)'}</td>
                          <td className="p-3.5">{isBn ? 'মদিনার সমকক্ষ শক্তিশালী শাখা' : 'Equally Powerful Counterpart Clan'}</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-bold opacity-70">{isBn ? 'প্রধান সর্দার' : 'Key Leaders'}</td>
                          <td className="p-3.5">{isBn ? 'সা\'দ ইবনে উবাদাহ, আস\'আদ ইবনে যারা রাহ' : 'Sa\'d ibn Ubadah, As\'ad ibn Zurarah'}</td>
                          <td className="p-3.5">{isBn ? 'সা\'দ ইবনে মু\'আজ, উসাইদ ইবনে হুদাইর' : 'Sa\'d ibn Mu\'adh, Usaid ibn Hudair'}</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-bold opacity-70">{isBn ? 'প্রধান অবদান' : 'Primary Contribution'}</td>
                          <td className="p-3.5">{isBn ? 'আকাবার বায়আত, বদর যুদ্ধ ও হাদিস বর্ণনাকারী' : 'Pledges of Aqabah, Badr & Hadith Transmission'}</td>
                          <td className="p-3.5">{isBn ? 'মদিনার দুর্গ রক্ষা, খন্দকের যুদ্ধ ও খিলাফতের সমর্থন' : 'Madinah Defense, Battle of Trench & Caliphate Support'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {ansarTab === 'virtues' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className={`p-5 rounded-2xl border space-y-2 ${
                    isDay ? 'bg-teal-50 border-teal-200' : 'bg-[#041417]'
                  }`}>
                    <h4 className="font-black text-sm text-amber-500 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4" />
                      <span>{isBn ? 'আনসারদের ঈমানি মর্যাদা' : 'Faith & Virtue of Ansar'}</span>
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                      {isBn
                        ? 'রাসূলুল্লাহ (সা.) বলেন: "আনসারদের ভালোবাসাই ঈমানের আলামত এবং তাদের প্রতি বিদ্বেষই মুনাফিকির আলামত।" — (সহিহ বুখারি)'
                        : 'The Prophet (PBUH) said: "Love for the Ansar is a sign of faith and hatred for the Ansar is a sign of hypocrisy." — (Sahih Bukhari)'}
                    </p>
                  </div>

                  <div className={`p-5 rounded-2xl border space-y-2 ${
                    isDay ? 'bg-amber-50/60 border-amber-200' : 'bg-[#041417]'
                  }`}>
                    <h4 className="font-black text-sm text-emerald-500 flex items-center gap-1.5">
                      <Heart className="w-4 h-4" />
                      <span>{isBn ? 'আনসারদের অনন্য ত্যাগ' : 'Unmatched Sacrifice of Ansar'}</span>
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                      {isBn
                        ? 'হিজরতের পর নিজের ঘরবাড়ি ও সম্পদ অর্ধেক ভাগ করে আনসারগণ মুহাজির ভাইদের গ্রহণ করেছিলেন।'
                        : 'After Hijrah, the Ansar welcomed their Muhajir brothers by sharing half of their homes and wealth.'}
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
                  {t.galleryTabArabMap}
                </span>
                <h3 className="text-xl sm:text-2xl font-black">{t.arabMapHeaderTitle}</h3>
                <p className="text-xs sm:text-sm opacity-80">
                  {t.arabMapHeaderDesc}
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
                <div className="absolute right-4 bottom-4 opacity-20 pointer-events-none text-right font-arabic text-xs text-amber-500" dir="rtl">
                  خريطة شبه الجزيرة العربية
                </div>

                {/* Map Title & Legend Overlay */}
                <div className="absolute top-3 right-3 z-10 p-2.5 rounded-2xl bg-black/40 backdrop-blur-md text-white border border-white/10 text-[11px] font-bold space-y-1">
                  <div className="flex items-center gap-1.5 text-amber-300">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{t.mapPinInstruction}</span>
                  </div>
                  <div className="text-[10px] opacity-80">{isBn ? 'মানচিত্রের পিন সিলেক্ট করুন' : 'Select a pin on the map'}</div>
                </div>

                {/* Hotspot Pins on SVG Overlay */}
                {ARABIAN_TRIBAL_GEO_REGIONS.map((reg) => {
                  const isSelected = reg.id === activeGeoRegionId;
                  const regShortName = isBn ? reg.nameBn.split(' ')[0] : reg.nameBn.split(' ')[0];

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
                          {regShortName}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Geo Region Detailed Showcase Card */}
              {(() => {
                const activeReg = ARABIAN_TRIBAL_GEO_REGIONS.find(r => r.id === activeGeoRegionId) || ARABIAN_TRIBAL_GEO_REGIONS[0];
                const regName = activeReg.nameBn;
                const regDetails = activeReg.detailsBn;
                const dominantTribesText = activeReg.dominantTribesBn.join(', ');
                const historicalEventsText = activeReg.historicalEventsBn.join(' • ');
                const prominentSahabaText = activeReg.prominentSahabaList.join(', ');

                return (
                  <div className={`p-6 rounded-3xl border space-y-4 shadow-md ${
                    isDay ? 'bg-gradient-to-r from-amber-50/70 via-white to-teal-50/50 border-amber-300' : 'bg-gradient-to-r from-[#04161a] via-[#082226] to-[#0b2d33] border-emerald-500/40 text-emerald-100'
                  }`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-500 border border-amber-500/30">
                            {isBn ? 'নির্বাচিত অঞ্চল' : 'Selected Region'}
                          </span>
                          <h4 className="text-lg sm:text-xl font-black">{regName}</h4>
                          <button
                            onClick={(e) => handlePlayVoice(activeReg.nameAr, `geo-voice-${activeReg.id}`, e)}
                            title={t.voiceTitleAr}
                            className={`p-1 rounded-lg border transition ${
                              playingVoiceId === `geo-voice-${activeReg.id}` ? 'bg-amber-500 text-white animate-pulse' : 'opacity-60 hover:opacity-100'
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <span className="text-xs font-arabic text-amber-500 font-bold block mt-0.5" dir="rtl">
                          {activeReg.nameAr} ({activeReg.nameEn})
                        </span>
                      </div>

                      {activeReg.targetClanId && (
                        <button
                          onClick={() => openClanInReader(activeReg.targetClanId!)}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition shadow cursor-pointer self-start sm:self-center flex items-center gap-1"
                        >
                          <span>{t.readRegionSeerahBtn}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                      {regDetails}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs">
                      {/* Dominant Tribes */}
                      <div className="p-3 rounded-2xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-1">
                        <span className="text-[10px] font-bold text-amber-500 uppercase block">🛡️ {t.dominantTribes}</span>
                        <div className="font-semibold">{dominantTribesText}</div>
                      </div>

                      {/* Historical Events */}
                      <div className="p-3 rounded-2xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-1">
                        <span className="text-[10px] font-bold text-emerald-500 uppercase block">📜 {t.historicalEvents}</span>
                        <div className="font-semibold">{historicalEventsText}</div>
                      </div>

                      {/* Prominent Sahaba */}
                      <div className="p-3 rounded-2xl bg-black/5 dark:bg-black/30 border border-black/5 dark:border-white/5 space-y-1">
                        <span className="text-[10px] font-bold text-teal-400 uppercase block">🌿 {t.prominentSahaba}</span>
                        <div className="font-semibold">{prominentSahabaText}</div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* 6 Strategic Geopolitical Regions Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CHAPTER3_OVERVIEW.map((item, idx) => {
                  const clanName = isBn ? item.clanBn : (item.clanEn || item.clanBn);
                  const locationText = isBn ? item.locationBn : (item.locationEn || item.locationBn);
                  const noteText = isBn ? item.noteBn : (item.noteEn || item.noteBn);

                  return (
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
                            {clanName}
                          </h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {item.sectionCode}
                          </span>
                        </div>

                        <p className="text-xs text-amber-500 flex items-center gap-1.5 font-bold">
                          <MapPin className="w-3.5 h-3.5 shrink-0" />
                          <span>{locationText}</span>
                        </p>

                        <p className="text-xs opacity-85 leading-relaxed">{noteText}</p>
                      </div>

                      <div className="pt-2 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-bold group-hover:text-amber-400 transition-colors">
                        <span>{t.readSeerahAndBattleBtn}</span>
                        <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  );
                })}
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
                    {t.statsBadge}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black">{t.statsTitle}</h3>
                  <p className="text-xs sm:text-sm opacity-80">
                    {t.statsDesc}
                  </p>
                </div>

                {/* Sort Bar */}
                <div className="flex items-center gap-2">
                  <span className="text-xs opacity-60 font-semibold">{t.statsSortLabel}:</span>
                  <div className="flex items-center gap-1 rounded-xl p-1 border bg-black/5 dark:bg-white/5">
                    {[
                      { id: 'highest', label: t.statsSortHighest },
                      { id: 'alphabetical', label: t.statsSortAlpha },
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
                  const statName = stat.nameBn;
                  const statChapter = stat.chapter;

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
                          <span className="truncate group-hover:text-emerald-500 transition-colors">{statName}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] opacity-75 hidden sm:inline text-amber-500">
                            {statChapter}
                          </span>
                          <span className="tabular-nums text-emerald-600 dark:text-emerald-400 font-black px-2 py-0.5 rounded-md bg-emerald-500/10">
                            {t.statsTotalCount(stat.count)}
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
                <span>{t.appendixTitle}</span>
              </h3>
              <p className="text-xs sm:text-sm opacity-80 leading-relaxed mt-1">
                {t.appendixSubtitle}
              </p>
            </div>

            {/* Quick Filter */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {[
                { id: 'all', label: t.appendixFilterAll },
                { id: 'কুরাইশ', label: t.appendixFilterQuraysh },
                { id: 'আনসার', label: t.appendixFilterAnsar },
                { id: 'ইয়েমেন', label: t.appendixFilterYemen },
                { id: 'বেদুইন', label: t.appendixFilterBedouin },
                { id: 'খ্রিস্টান', label: t.appendixFilterChristian },
              ].map((catObj) => (
                <button
                  key={catObj.id}
                  onClick={() => setAppendixFilter(catObj.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    appendixFilter === catObj.id
                      ? isDay ? 'bg-teal-700 text-white border-teal-600' : 'bg-emerald-600 text-white border-emerald-500'
                      : isDay ? 'bg-slate-100 text-slate-700 border-slate-200' : 'bg-[#041417] text-emerald-300 border-[#153e46]'
                  }`}
                >
                  {catObj.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAppendixTribes.map((tribe) => {
              const tribeName = isBn ? tribe.nameBn : (tribe.nameEn || tribe.nameBn);
              const categoryText = isBn ? tribe.categoryBn : (tribe.categoryEn || tribe.categoryBn);
              const regionText = isBn ? tribe.regionBn : (tribe.regionEn || tribe.regionBn);
              const significanceText = isBn ? tribe.historicalSignificanceBn : (tribe.historicalSignificanceEn || tribe.historicalSignificanceBn);
              const sahabaListText = isBn
                ? tribe.sahabaListBn.join(' • ')
                : (tribe.sahabaListEn?.join(' • ') || tribe.sahabaListBn.join(' • '));
              const negativeText = isBn
                ? tribe.negativeFiguresBn?.join(' • ')
                : (tribe.negativeFiguresEn?.join(' • ') || tribe.negativeFiguresBn?.join(' • '));
              const referenceText = isBn ? tribe.referenceBn : (tribe.referenceEn || tribe.referenceBn);

              return (
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
                          <h4 className="text-base font-black">{tribeName}</h4>
                          <div className="flex items-center gap-2 text-xs opacity-75">
                            <span>{categoryText}</span>
                            <span>·</span>
                            <span className="flex items-center gap-0.5">
                              <MapPin className="w-3 h-3 text-amber-500" />
                              <span>{regionText}</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed opacity-90">
                      {significanceText}
                    </p>

                    {/* Sahaba List */}
                    {tribe.sahabaListBn.length > 0 && (
                      <div className="space-y-1 pt-2 border-t border-dashed border-slate-200 dark:border-slate-800">
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block">
                          {t.appendixSahabaTitle} ({tribe.sahabaListBn.length})
                        </span>
                        <p className="text-xs leading-relaxed font-medium">
                          {sahabaListText}
                        </p>
                      </div>
                    )}

                    {/* Negative Figures */}
                    {tribe.negativeFiguresBn && tribe.negativeFiguresBn.length > 0 && (
                      <div className="space-y-1 text-rose-500 pt-1">
                        <span className="text-[11px] font-bold block">{t.appendixNegativeTitle}</span>
                        <p className="text-xs leading-relaxed">
                          {negativeText}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-teal-900/30 flex items-center justify-between text-[11px] opacity-75">
                    <span className="truncate max-w-[280px]">📚 {referenceText}</span>
                    <button
                      onClick={(e) => handleCopy(`${tribeName}\n${significanceText}\n${t.referencesTitle}: ${referenceText}`, `app-${tribe.id}`, e)}
                      className="hover:text-amber-500 transition cursor-pointer flex items-center gap-1"
                    >
                      {copiedId === `app-${tribe.id}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedId === `app-${tribe.id}` ? t.copiedBtn : t.copyBtn}</span>
                    </button>
                  </div>
                </div>
              );
            })}
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
              <span>{t.bookmarksTitle(bookmarkedPersonalities.length)}</span>
            </h3>
            <p className="text-xs opacity-80 mt-1">
              {t.bookmarksSubtitle}
            </p>
          </div>

          {bookmarkedPersonalities.length === 0 ? (
            <div className={`text-center py-16 rounded-2xl border ${
              isDay ? 'bg-white border-slate-200 text-slate-500' : 'bg-[#082226] border-[#153e46] text-emerald-400/70'
            }`}>
              <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-base font-bold">{t.bookmarksEmptyTitle}</p>
              <p className="text-xs mt-1">{t.bookmarksEmptySub}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bookmarkedPersonalities.map(({ personality: pers, clanName }) => {
                const persName = isBn ? pers.nameBn : (pers.nameEn || pers.nameBn);
                const clanDisplayName = isBn ? clanName : (CLAN_VISUAL_MAP[pers.id]?.badgeEn || clanName);
                const persBio = isBn ? pers.bioBn : (pers.bioEn || pers.bioBn);
                const persRef = isBn ? pers.referenceBn : (pers.referenceEn || pers.referenceBn);

                return (
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
                        <h4 className="font-bold text-sm">{persName}</h4>
                        <span className="text-xs text-amber-500">{clanDisplayName}</span>
                      </div>
                      <button
                        onClick={(e) => toggleBookmark(pers.id, e)}
                        className="p-1.5 rounded-lg bg-amber-500 text-white cursor-pointer"
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                    <p className="text-xs opacity-90 line-clamp-2">{persBio}</p>
                    <div className="text-[11px] opacity-75 pt-2 border-t border-dashed border-slate-200 dark:border-slate-800">
                      📚 {persRef}
                    </div>
                  </div>
                );
              })}
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
                  {isBn ? activePersonalityModal.roleBn : (activePersonalityModal.roleEn || activePersonalityModal.roleBn)}
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-2">
                  {isBn ? activePersonalityModal.nameBn : (activePersonalityModal.nameEn || activePersonalityModal.nameBn)}
                </h3>
                {activePersonalityModal.nameAr && (
                  <p className="text-sm font-arabic text-amber-500 font-bold" dir="rtl">
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
                {t.modalBioTitle}
              </h4>
              <p className="leading-relaxed text-sm sm:text-base">
                {isBn ? activePersonalityModal.bioBn : (activePersonalityModal.bioEn || activePersonalityModal.bioBn)}
              </p>
            </div>

            <div className={`p-3.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${
              isDay ? 'bg-teal-50 border-teal-200 text-teal-800' : 'bg-emerald-950/50 border-emerald-500/30 text-emerald-300'
            }`}>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>{t.modalRefTitle}:</strong> {isBn ? activePersonalityModal.referenceBn : (activePersonalityModal.referenceEn || activePersonalityModal.referenceBn)}</span>
              </div>
              <button
                onClick={(e) => {
                  const mName = isBn ? activePersonalityModal.nameBn : (activePersonalityModal.nameEn || activePersonalityModal.nameBn);
                  const mBio = isBn ? activePersonalityModal.bioBn : (activePersonalityModal.bioEn || activePersonalityModal.bioBn);
                  const mRef = isBn ? activePersonalityModal.referenceBn : (activePersonalityModal.referenceEn || activePersonalityModal.referenceBn);
                  handleCopy(`${mName}\n${mBio}\n${t.modalRefTitle}: ${mRef}`, 'modal-copy', e);
                }}
                className="hover:underline flex items-center gap-1 font-bold shrink-0 cursor-pointer"
              >
                {copiedId === 'modal-copy' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'modal-copy' ? t.copiedBtn : t.copyBtn}</span>
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
                {t.modalDoneReading}
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
                    <h4 className="text-xl font-black">
                      {isBn ? selectedResponsibility.clanBn : (selectedResponsibility.clanEn || selectedResponsibility.clanBn)}
                    </h4>
                    {selectedResponsibility.responsibilityAr && (
                      <span className="text-xs font-arabic text-amber-500 opacity-80" dir="rtl">
                        {selectedResponsibility.responsibilityAr}
                      </span>
                    )}
                  </div>
                  <span className="text-xs opacity-60">{t.modalOfficeSub}</span>
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
                <span>{t.roleLabel}: {isBn ? selectedResponsibility.responsibilityBn : (selectedResponsibility.responsibilityEn || selectedResponsibility.responsibilityBn)}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                {isBn ? selectedResponsibility.detailsBn : (selectedResponsibility.detailsEn || selectedResponsibility.detailsBn)}
              </p>
            </div>

            {/* Dual Era Insight */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs p-3.5 rounded-2xl border ${
              isDay ? 'bg-amber-50/50 border-amber-200/60' : 'bg-[#051a1e] border-[#18464f]'
            }`}>
              {selectedResponsibility.preIslamicHolder && (
                <div>
                  <span className="text-[10px] font-bold opacity-60 block uppercase">{t.preIslamicLeadership}</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                    {isBn ? selectedResponsibility.preIslamicHolder : (selectedResponsibility.preIslamicHolderEn || selectedResponsibility.preIslamicHolder)}
                  </span>
                </div>
              )}
              {selectedResponsibility.islamicHolder && (
                <div>
                  <span className="text-[10px] font-bold text-emerald-500 block uppercase">{t.islamicPosition}</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400 text-xs">
                    {isBn ? selectedResponsibility.islamicHolder : (selectedResponsibility.islamicHolderEn || selectedResponsibility.islamicHolder)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
              <button
                onClick={() => setSelectedResponsibility(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold opacity-75 hover:opacity-100 cursor-pointer"
              >
                {t.modalClose}
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
                {t.readClanSeerahBtn}
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
        title={t.floatingTocBtn}
      >
        <BookOpen className="w-4 h-4" />
        <span>📑 {t.floatingTocBtn}</span>
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
                  {t.drawerCategoryTag}
                </span>
                <h3 className="text-lg font-black flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-500" />
                  <span>{t.drawerTitle}</span>
                </h3>
                <p className="text-xs opacity-70">
                  {t.drawerSubtitle}
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
                placeholder={t.drawerSearchPlaceholder}
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
                  const topicDataEn = TOPIC_TOC_ENGLISH_MAP[topic.id];
                  const topicTitle = isBn ? topic.topicTitleBn : (topicDataEn?.themeBadgeEn || topic.topicTitleBn);

                  return (
                    topicTitle.toLowerCase().includes(q) ||
                    topic.subsections.some(s => {
                      const subDataEn = topicDataEn?.subsectionsEn?.[s.id];
                      const sTitle = isBn ? s.titleBn : (subDataEn?.titleEn || s.titleBn);
                      const sSub = isBn ? s.subtitleBn : (subDataEn?.subtitleEn || s.subtitleBn);
                      return sTitle.toLowerCase().includes(q) || sSub.toLowerCase().includes(q);
                    })
                  );
                })
                .map((topic, tIdx) => {
                  const topicDataEn = TOPIC_TOC_ENGLISH_MAP[topic.id];
                  const topicTitle = isBn ? topic.topicTitleBn : (topicDataEn?.themeBadgeEn || topic.topicTitleBn);

                  const filteredSubs = topic.subsections.filter(s => {
                    if (!tocSearchQuery.trim()) return true;
                    const q = tocSearchQuery.toLowerCase();
                    const subDataEn = topicDataEn?.subsectionsEn?.[s.id];
                    const sTitle = isBn ? s.titleBn : (subDataEn?.titleEn || s.titleBn);
                    const sSub = isBn ? s.subtitleBn : (subDataEn?.subtitleEn || s.subtitleBn);
                    return sTitle.toLowerCase().includes(q) || sSub.toLowerCase().includes(q);
                  });

                  return (
                    <div key={tIdx} className="space-y-2">
                      <div className="flex items-center justify-between pb-1 border-b border-dashed border-slate-200 dark:border-slate-800">
                        <div className="flex items-center gap-1.5 truncate">
                          <span>{topic.icon}</span>
                          <span className="text-xs font-black text-amber-500 truncate">{topicTitle}</span>
                        </div>
                        <span className="text-[10px] font-bold opacity-60 shrink-0">{t.drawerCountBadge(filteredSubs.length)}</span>
                      </div>

                      <div className="space-y-1">
                        {filteredSubs.map((sub, sIdx) => {
                          const isChart = sub.type === 'chart';
                          const subDataEn = topicDataEn?.subsectionsEn?.[sub.id];
                          const subTitle = isBn ? sub.titleBn : (subDataEn?.titleEn || sub.titleBn);

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
                                  {isChart ? t.badgeChart : t.badgeRead}
                                </span>
                                <span className="truncate">{subTitle}</span>
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
                  <span>{t.drawerAppendixOption}</span>
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
                {t.drawerCloseBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
