import React, { useState, useMemo, useEffect } from 'react';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  Users,
  Search,
  BookOpen,
  Heart,
  ScrollText,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ArrowLeft,
  Bookmark,
  Copy,
  CheckCircle2,
  Award,
  Crown,
  Quote,
  Flame,
  Star,
  X,
  Layers,
  Shield,
  MapPin,
  Calendar,
  Compass,
  Check,
  UserCheck,
  Home,
  Baby,
  RotateCcw,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { useHorizontalSwipe } from '../hooks/useHorizontalSwipe';
import { SwipeFloatingFeedback, QuickReaderSwitcherStrip } from './SwipeNavigationOverlay';
import {
  SAHABA_CATEGORIES,
  SAHABA_DATABASE,
  SahabaCategoryKey,
  SahabaItem,
  SahabaFamily,
} from '../data/sahabaData';
import {
  FAMILY_MEMBER_BIOGRAPHIES,
  FamilyMemberBio,
} from '../data/familyBiographiesData';
import {
  SAHABA_EN_DATABASE,
  getEnglishSahabaName,
  getEnglishSahabaTitle,
  getEnglishSahabaSummary,
} from '../data/sahabaEnglishData';
import {
  PROPHETIC_SAHABA_TITLES,
  isPropheticTitleHolder,
  getPropheticTitleProfile,
  PropheticSahabaTitle,
} from '../data/propheticSahabaTitlesData';

interface HayatusSahabaViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  onBackToHub?: () => void;
}

function toBnDigits(input: string | number): string {
  const bn = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(input).replace(/\d/g, (d) => bn[Number(d)]);
}

function toEnDigits(input: string | number): string {
  return String(input).replace(/[০-৯]/g, (d) => String('০১২৩৪৫৬৭৮৯'.indexOf(d)));
}

function localizeRefToEn(text: string): string {
  const map: [RegExp, string][] = [
    [/সহীহ বুখারী|সহিহ বুখারি/g, 'Sahih al-Bukhari'],
    [/সহীহ মুসলিম|সহিহ মুসলিম/g, 'Sahih Muslim'],
    [/জামে তিরমিযী|সুনান আত-তিরমিযী|জামে আত-তিরমিজি/g, 'Jami at-Tirmidhi'],
    [/সুনান আবু দাউদ|সুনানে আবু দাউদ/g, 'Sunan Abu Dawud'],
    [/সুনান নাসায়ী|সুনান আন-নাসায়ী|সুনানুন নাসাঈ/g, "Sunan an-Nasa'i"],
    [/সুনান ইবনে মাজাহ|সুনানে ইবনে মাজাহ|সুনান ইবনু মাজাহ/g, 'Sunan Ibn Majah'],
    [/মুসনাদে আহমদ|মুসনাদে আহমাদ/g, 'Musnad Ahmad'],
    [/মুয়াত্তা ইমাম মালিক|মুয়াত্তা মালিক/g, 'Muwatta Malik'],
    [/আল-মুস্তাদরাক লিল-হাকিম|আল-মুস্তাদরাক|মুসতাদরাক হাকিম/g, 'Al-Mustadrak al-Hakim'],
    [/সীরাতে ইবনে হিশাম/g, 'Sirah Ibn Hisham'],
    [/তাবাকাতে ইবনে সা’দ|তাবাকাতে ইবনে সা'দ/g, "Tabaqat Ibn Sa'd"],
    [/উসদুল গাবাহ/g, 'Usd al-Ghabah'],
    [/সিয়ারু আলামিন নুবালা|সিয়ারু আ'লামিন নুবালা/g, "Siyar A'lam al-Nubala"],
    [/আল-ইসাবাহ/g, 'Al-Isabah'],
    [/আল-ইস্তিআব|আল-ইস্তিয়াব/g, "Al-Isti'ab"],
    [/তারিখে তাবারী|তারীখে দিমাশক/g, 'Tarikh at-Tabari'],
    [/আল-বিদায়া ওয়ান নিহায়া/g, 'Al-Bidayah wan-Nihayah'],
    [/হায়াতুস সাহাবা|হায়াতুস সাহাবা/g, 'Hayatus Sahaba'],
    [/হিলইয়াতুল আওলিয়া/g, 'Hilyat al-Awliya'],
    [/তাফসীরে ইবনে কাসীর/g, 'Tafsir Ibn Kathir'],
    [/ফুতুহুল বুলদান/g, 'Futuh al-Buldan'],
  ];
  let out = text;
  for (const [re, rep] of map) {
    out = out.replace(re, rep);
  }
  return toEnDigits(out);
}

function getSahabaName(item: SahabaItem, lang: ZikrLanguage): string {
  if (lang === 'ar') return item.nameAr || item.nameEn || item.nameBn;
  if (lang === 'bn') return item.nameBn;
  if (item.nameEn) return item.nameEn;
  return getEnglishSahabaName(item.id, item.nameBn);
}

function getSahabaTitle(item: SahabaItem, lang: ZikrLanguage): string {
  if (lang === 'bn') return item.titleBn;
  if (item.titleEn) return item.titleEn;
  return getEnglishSahabaTitle(item.id, item.titleBn);
}

function getSahabaSummary(item: SahabaItem, lang: ZikrLanguage): string {
  if (lang === 'bn') return item.summaryBn;
  if (item.summaryEn) return item.summaryEn;
  return getEnglishSahabaSummary(item.id, item.summaryBn);
}

function getSahabaCategory(item: SahabaItem, lang: ZikrLanguage): string {
  if (lang === 'bn') return item.categoryBn;
  if (lang === 'ar') {
    const catMeta = SAHABA_CATEGORIES.find((c) => c.key === item.categoryKey);
    return catMeta ? catMeta.titleAr : item.categoryBn;
  }
  const enProfile = SAHABA_EN_DATABASE[item.id];
  if (enProfile?.category) return enProfile.category;
  if (item.categoryEn) return item.categoryEn;
  const catMeta = SAHABA_CATEGORIES.find((c) => c.key === item.categoryKey);
  return catMeta ? catMeta.titleEn : 'Honored Companion';
}

const SAHABA_STORAGE_KEYS = {
  COMPLETED: 'zikr_sahaba_completed_ids',
  BOOKMARKED: 'zikr_sahaba_bookmarks',
  LAST_READ: 'zikr_sahaba_last_read_id',
};

export const HayatusSahabaView: React.FC<HayatusSahabaViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
  onBackToHub,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';
  const isAr = selectedLanguage === 'ar';
  const formatNum = (val: string | number) => (isBn ? toBnDigits(val) : toEnDigits(val));

  const [selectedSahabaId, setSelectedSahabaId] = useState<string | null>(null);
  const [, startTransition] = React.useTransition();

  const [completedSahaba, setCompletedSahaba] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(SAHABA_STORAGE_KEYS.COMPLETED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarkedSahaba, setBookmarkedSahaba] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(SAHABA_STORAGE_KEYS.BOOKMARKED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lastReadSahabaId, setLastReadSahabaId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(SAHABA_STORAGE_KEYS.LAST_READ);
    } catch {
      return null;
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  const handleSelectSahaba = (id: string | null, skipPushState = false) => {
    if (soundEnabled) soundHaptics.playTap();
    if (id) {
      try {
        localStorage.setItem(SAHABA_STORAGE_KEYS.LAST_READ, id);
        setLastReadSahabaId(id);
      } catch {}
      if (!skipPushState) {
        try {
          window.history.pushState({ appModule: 'other', appSub: 'hayatus_sahaba', sahabaId: id }, '');
        } catch {}
      }
    }
    startTransition(() => {
      setSelectedSahabaId(id);
    });
  };

  useEffect(() => {
    const handleSahabaPopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state && state.sahabaId) {
        handleSelectSahaba(state.sahabaId, true);
      } else {
        setSelectedSahabaId(null);
      }
    };

    window.addEventListener('popstate', handleSahabaPopState);
    return () => {
      window.removeEventListener('popstate', handleSahabaPopState);
    };
  }, []);

  const toggleCompleteSahaba = (id: string) => {
    setCompletedSahaba((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(SAHABA_STORAGE_KEYS.COMPLETED, JSON.stringify(next));
      } catch {}
      showToast(next.includes(id) ? (isBn ? 'পঠন সম্পন্ন হিসেবে চিহ্নিত করা হয়েছে' : 'Marked as Completed') : (isBn ? 'পঠন তালিকা থেকে সরানো হয়েছে' : 'Marked as Unread'));
      if (soundEnabled) soundHaptics.playTap();
      return next;
    });
  };

  const toggleBookmarkSahaba = (id: string) => {
    setBookmarkedSahaba((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(SAHABA_STORAGE_KEYS.BOOKMARKED, JSON.stringify(next));
      } catch {}
      showToast(next.includes(id) ? (isBn ? 'বুকমার্কে যুক্ত করা হয়েছে' : 'Bookmarked') : (isBn ? 'বুকমার্ক সরানো হয়েছে' : 'Bookmark Removed'));
      if (soundEnabled) soundHaptics.playTap();
      return next;
    });
  };

  const handleCopyHadith = (hp: { arabic?: string; textBn: string; textEn?: string; source: string }) => {
    const parts: string[] = [];
    if (isAr && hp.arabic) parts.push(hp.arabic);
    parts.push(`"${isBn ? hp.textBn : (hp.textEn || '')}"`);
    parts.push(`— ${isBn ? hp.source : localizeRefToEn(hp.source)}`);
    navigator.clipboard.writeText(parts.join('\n\n'));
    showToast(isBn ? 'হাদীস শরীফ কপি করা হয়েছে' : 'Hadith Copied');
    if (soundEnabled) soundHaptics.playTap();
  };

  const handleCopyQuran = (qr: { surah: string; verse: string; arabic?: string; translationBn: string; translationEn?: string }) => {
    const parts: string[] = [];
    if (isAr && qr.arabic) parts.push(qr.arabic);
    parts.push(`"${isBn ? qr.translationBn : (qr.translationEn || '')}"`);
    parts.push(`— ${isBn ? qr.surah : localizeRefToEn(qr.surah)} (${isBn ? 'আয়াত:' : 'Verse:'} ${formatNum(qr.verse)}) ${isBn ? '[পবিত্র কুরআন]' : '[Holy Quran]'}`);
    navigator.clipboard.writeText(parts.join('\n\n'));
    showToast(isBn ? 'কুরআনের আয়াত কপি করা হয়েছে' : 'Quranic Verse Copied');
    if (soundEnabled) soundHaptics.playTap();
  };

  const [selectedFamilyBioModal, setSelectedFamilyBioModal] = useState<FamilyMemberBio | null>(null);
  const [showBibliographyModal, setShowBibliographyModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<SahabaCategoryKey | 'all' | 'prophetic_titles'>('all');
  const [copiedQuote, setCopiedQuote] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [selectedSahabaId]);

  const activeSahaba = useMemo(() => {
    if (!selectedSahabaId) return null;
    return SAHABA_DATABASE.find((s) => s.id === selectedSahabaId) || null;
  }, [selectedSahabaId]);

  const propheticProfile = useMemo(() => {
    if (!activeSahaba) return undefined;
    return getPropheticTitleProfile(activeSahaba.id);
  }, [activeSahaba]);

  const currentIndex = useMemo(() => {
    if (!selectedSahabaId) return -1;
    return SAHABA_DATABASE.findIndex((s) => s.id === selectedSahabaId);
  }, [selectedSahabaId]);

  const prevSahaba = useMemo(() => {
    if (currentIndex > 0) return SAHABA_DATABASE[currentIndex - 1];
    return null;
  }, [currentIndex]);

  const nextSahaba = useMemo(() => {
    if (currentIndex >= 0 && currentIndex < SAHABA_DATABASE.length - 1) return SAHABA_DATABASE[currentIndex + 1];
    return null;
  }, [currentIndex]);

  const lastReadSahaba = useMemo(() => {
    if (!lastReadSahabaId) return null;
    return SAHABA_DATABASE.find((s) => s.id === lastReadSahabaId) || null;
  }, [lastReadSahabaId]);

  const totalSahaba = SAHABA_DATABASE.length;
  const completedCount = completedSahaba.length;
  const progressPercentage = Math.round((completedCount / totalSahaba) * 100);

  // Group database by category for Book-Style Table of Contents (TOC)
  const sahabaByCategory = useMemo(() => {
    const map: Record<SahabaCategoryKey, SahabaItem[]> = {
      rashidun: [],
      ashara: [],
      pioneers_martyrs: [],
      commanders: [],
      scholars: [],
      ansar: [],
      beloved_companions: [],
      sahabiyyat: [],
    };
    SAHABA_DATABASE.forEach((s) => {
      if (map[s.categoryKey]) {
        map[s.categoryKey].push(s);
      }
    });
    return map;
  }, []);

  const filteredSahaba = useMemo(() => {
    let list = SAHABA_DATABASE;

    if (activeCategoryFilter === 'prophetic_titles') {
      list = list.filter((s) => isPropheticTitleHolder(s.id));
      list = [...list].sort((a, b) => {
        const noA = getPropheticTitleProfile(a.id)?.no || 999;
        const noB = getPropheticTitleProfile(b.id)?.no || 999;
        return noA - noB;
      });
    } else if (activeCategoryFilter !== 'all') {
      list = list.filter((s) => s.categoryKey === activeCategoryFilter);
    }

    const q = searchQuery.trim().toLowerCase();
    if (!q) return list;

    return list.filter((s) => {
      const name = getSahabaName(s, selectedLanguage).toLowerCase();
      const title = getSahabaTitle(s, selectedLanguage).toLowerCase();
      const summary = getSahabaSummary(s, selectedLanguage).toLowerCase();
      const category = getSahabaCategory(s, selectedLanguage).toLowerCase();
      const pProfile = getPropheticTitleProfile(s.id);
      const pTitle = pProfile ? pProfile.titleBn.toLowerCase() : '';
      const pReason = pProfile ? pProfile.reasonBn.toLowerCase() : '';

      return (
        name.includes(q) ||
        s.nameAr.includes(q) ||
        title.includes(q) ||
        summary.includes(q) ||
        category.includes(q) ||
        pTitle.includes(q) ||
        pReason.includes(q)
      );
    });
  }, [activeCategoryFilter, searchQuery, selectedLanguage]);


  const handleCopySahabaSummary = () => {
    if (!activeSahaba) return;
    const name = getSahabaName(activeSahaba, selectedLanguage);
    const title = getSahabaTitle(activeSahaba, selectedLanguage);
    const summary = getSahabaSummary(activeSahaba, selectedLanguage);
    const cat = getSahabaCategory(activeSahaba, selectedLanguage);
    const enProfile = SAHABA_EN_DATABASE[activeSahaba.id];

    const birthDeath = isBn
      ? activeSahaba.birthAndDeathBn
      : (enProfile?.birthAndDeath || activeSahaba.birthAndDeathEn || '');

    const textToCopy = `📖 ${name}\n🏆 ${isBn ? 'উপাধি:' : 'Title:'} ${title}\n⭐ ${isBn ? 'মর্যাদা:' : 'Rank:'} #${formatNum(activeSahaba.rank)} | ${cat}${birthDeath ? `\n📅 ${birthDeath}` : ''}\n\n${summary}`;

    navigator.clipboard.writeText(textToCopy);
    setCopiedQuote(true);
    if (soundEnabled) soundHaptics.playTargetChime();
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  // Resolve Family details strictly in the chosen language
  const getSahabaFamilyData = (sahaba: SahabaItem): SahabaFamily => {
    const enProfile = SAHABA_EN_DATABASE[sahaba.id];
    const baseFamily = sahaba.familyBn;
    const enFamily = enProfile?.family || sahaba.familyEn;

    if (baseFamily || enFamily) {
      return {
        fatherBn: baseFamily?.fatherBn,
        fatherEn: enFamily?.fatherEn || '',
        motherBn: baseFamily?.motherBn,
        motherEn: enFamily?.motherEn || '',
        tribeOrClanBn: baseFamily?.tribeOrClanBn,
        tribeOrClanEn: enFamily?.tribeOrClanEn || '',
        wivesBn: baseFamily?.wivesBn || [],
        wivesEn: enFamily?.wivesEn || [],
        sonsBn: baseFamily?.sonsBn || [],
        sonsEn: enFamily?.sonsEn || [],
        daughtersBn: baseFamily?.daughtersBn || [],
        daughtersEn: enFamily?.daughtersEn || [],
        keyRelativesBn: baseFamily?.keyRelativesBn || [],
        keyRelativesEn: enFamily?.keyRelativesEn || [],
        overviewBn: baseFamily?.overviewBn,
        overviewEn: enFamily?.overviewEn || '',
      };
    }

    // Default fallback if not defined
    return {
      fatherBn: 'ইসলামি সীরাত ও ইতিহাসে নিবন্ধিত সম্মানিত পিতা',
      fatherEn: 'Father registered in classical Islamic Seerah',
      motherBn: 'ইসলামি সীরাত সংকলনে নিবন্ধিত মহীয়সী মাতা',
      motherEn: 'Mother registered in classical Islamic Seerah',
      tribeOrClanBn: 'সম্মানিত আরব্য বংশ ও কুরাইশ শাখা',
      tribeOrClanEn: 'Noble Arabian Tribe & Lineage',
      wivesBn: [],
      wivesEn: [],
      sonsBn: [],
      sonsEn: [],
      daughtersBn: [],
      daughtersEn: [],
      keyRelativesBn: ['রাসূলুল্লাহ (সা.)-এর সুমহান সাহাবি'],
      keyRelativesEn: ['Honored companion of Prophet Muhammad (PBUH)'],
      overviewBn: `${sahaba.nameBn} হযরত মুহাম্মদ (সা.)-এর অনুগত ও অত্যন্ত মর্যাদাবান সাহাবি ছিলেন। তাঁর পরিবার ইসলামের সুমহান সেবায় নিবেদিত ছিল।`,
      overviewEn: `${getSahabaName(sahaba, selectedLanguage)} was an illustrious companion of Prophet Muhammad (PBUH) whose family was dedicated to the service of Islam.`,
    };
  };

  const sahabaSwipe = useHorizontalSwipe({
    enabled: Boolean(activeSahaba) && !selectedFamilyBioModal,
    canSwipeLeft: Boolean(nextSahaba),
    canSwipeRight: Boolean(prevSahaba),
    onSwipeLeft: () => {
      if (nextSahaba) handleSelectSahaba(nextSahaba.id);
    },
    onSwipeRight: () => {
      if (prevSahaba) handleSelectSahaba(prevSahaba.id);
    },
  });

  // =========================================================================
  // DETAILED SAHABA READER VIEW
  // =========================================================================
  if (activeSahaba) {
    const enProfile = SAHABA_EN_DATABASE[activeSahaba.id];

    const activeName = getSahabaName(activeSahaba, selectedLanguage);
    const activeTitle = getSahabaTitle(activeSahaba, selectedLanguage);
    const activeSummary = getSahabaSummary(activeSahaba, selectedLanguage);
    const activeCat = getSahabaCategory(activeSahaba, selectedLanguage);
    const familyData = getSahabaFamilyData(activeSahaba);

    const activeBirthDeath = isBn
      ? activeSahaba.birthAndDeathBn
      : (enProfile?.birthAndDeath || activeSahaba.birthAndDeathEn || '');

    const activeIslamAcceptance = isBn
      ? activeSahaba.islamAcceptanceBn
      : (enProfile?.islamAcceptance || activeSahaba.islamAcceptanceEn || '');

    const activeVirtues = isBn
      ? activeSahaba.keyVirtuesBn
      : (enProfile?.keyVirtues || activeSahaba.keyVirtuesEn || []);

    const activeBiography = isBn
      ? activeSahaba.detailedBiographyBn
      : (enProfile?.detailedBiography || activeSahaba.detailedBiographyEn || '');

    const activeEmotionalStories = isBn
      ? activeSahaba.emotionalStoriesBn
      : (enProfile?.emotionalStories || activeSahaba.emotionalStoriesEn || []);

    const activeDeath = isBn
      ? activeSahaba.deathOrMartyrdomBn
      : (enProfile?.deathOrMartyrdom || activeSahaba.deathOrMartyrdomEn || '');

    const activeLessons = isBn
      ? activeSahaba.lessonsBn
      : (enProfile?.lessons || activeSahaba.lessonsEn || []);

    const activeReferences = isBn
      ? activeSahaba.referencesBn
      : (enProfile?.references || activeSahaba.referencesEn || []);

    const activeQuranRefs = isBn
      ? (activeSahaba.quranRefBn || [])
      : (activeSahaba.quranRefBn || []).filter((qr) => Boolean(qr.translationEn));

    const activeHadithPraises = isBn
      ? (activeSahaba.hadithPraiseBn || [])
      : (activeSahaba.hadithPraiseBn || []).filter((hp) => Boolean(hp.textEn));

    // Family localized values with strictly non-mixed fallbacks
    const father = isBn ? familyData.fatherBn : (familyData.fatherEn || 'Recorded in classical Seerah chronicles');
    const mother = isBn ? familyData.motherBn : (familyData.motherEn || 'Recorded in classical Seerah chronicles');
    const tribe = isBn ? familyData.tribeOrClanBn : (familyData.tribeOrClanEn || 'Noble Arab lineage');
    const wives = isBn ? familyData.wivesBn : (familyData.wivesEn || []);
    const sons = isBn ? familyData.sonsBn : (familyData.sonsEn || []);
    const daughters = isBn ? familyData.daughtersBn : (familyData.daughtersEn || []);
    const relatives = isBn ? familyData.keyRelativesBn : (familyData.keyRelativesEn || []);
    const familyOverview = isBn ? familyData.overviewBn : (familyData.overviewEn || 'A venerable household honored through lifelong dedication to Prophet Muhammad (PBUH) and early Islam.');

    const isCompleted = completedSahaba.includes(activeSahaba.id);
    const isBookmarked = bookmarkedSahaba.includes(activeSahaba.id);

    return (
      <div
        {...sahabaSwipe.touchHandlers}
        style={
          sahabaSwipe.swipeOffset !== 0
            ? { transform: `translateX(${sahabaSwipe.swipeOffset * 0.35}px)`, transition: 'none' }
            : { transition: 'transform 180ms ease-out' }
        }
        className="w-full space-y-4 pb-28 animate-in fade-in duration-300 relative"
      >
        <SwipeFloatingFeedback
          swipeDirection={sahabaSwipe.swipeDirection}
          isReadyToTrigger={sahabaSwipe.isReadyToTrigger}
          canSwipeLeft={Boolean(nextSahaba)}
          canSwipeRight={Boolean(prevSahaba)}
          prevLabel={prevSahaba ? getSahabaName(prevSahaba, selectedLanguage) : undefined}
          nextLabel={nextSahaba ? getSahabaName(nextSahaba, selectedLanguage) : undefined}
          selectedLanguage={selectedLanguage}
        />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] px-4 py-2.5 rounded-2xl bg-[#006747] text-white text-xs font-bold border border-emerald-400/50 shadow-2xl flex items-center gap-2 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-200 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Sticky Top Header */}
        <div
          className={`sticky top-0 z-40 text-white shadow-xl rounded-2xl px-3 sm:px-4 py-3 flex items-center justify-between gap-3 border transition-colors ${
            isDay
              ? 'bg-gradient-to-r from-[#005a3e] via-[#006747] to-[#007a52] border-emerald-600/40 shadow-[#006747]/20'
              : 'bg-gradient-to-r from-[#07191e] via-[#0b262d] to-[#10363e] border-[#163c46] shadow-black/60'
          }`}
        >
          <button
            onClick={() => handleSelectSahaba(null)}
            className="p-2 -ml-1 rounded-xl bg-white/10 hover:bg-white/25 active:scale-95 transition cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft className="w-5 h-5 text-white stroke-[2.5]" />
            <span className="text-xs font-bold hidden sm:inline">{isBn ? 'সূচিপত্র' : 'Back'}</span>
          </button>

          <div className="flex-1 text-center truncate px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 truncate block">
              {isBn ? `ক্রম #${formatNum(activeSahaba.rank)}` : `Rank #${formatNum(activeSahaba.rank)}`} • {activeCat}
            </span>
            <h2 className="text-sm sm:text-base font-black truncate text-white">
              {activeName}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Mark as Completed Toggle */}
            <button
              onClick={() => toggleCompleteSahaba(activeSahaba.id)}
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 border transition cursor-pointer active:scale-95 ${
                isCompleted
                  ? 'bg-emerald-500 text-white border-emerald-400 shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
              title={isCompleted ? (isBn ? 'পঠিত সম্পন্ন' : 'Completed') : (isBn ? 'পঠিত হিসেবে চিহ্নিত করুন' : 'Mark as Read')}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="hidden md:inline text-[11px]">{isCompleted ? (isBn ? 'পঠিত' : 'Read') : (isBn ? 'পঠিত চিহ্নিত' : 'Mark Read')}</span>
            </button>

            {/* Bookmark Toggle */}
            <button
              onClick={() => toggleBookmarkSahaba(activeSahaba.id)}
              className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1 border transition cursor-pointer active:scale-95 ${
                isBookmarked
                  ? 'bg-amber-500 text-white border-amber-400 shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
              title={isBookmarked ? (isBn ? 'বুকমার্ক সরানো' : 'Remove Bookmark') : (isBn ? 'বুকমার্ক করুন' : 'Bookmark')}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
            </button>

            <button
              onClick={handleCopySahabaSummary}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/25 active:scale-95 transition cursor-pointer text-xs font-bold flex items-center gap-1"
              title={isBn ? 'জীবনচরিত কপি করুন' : 'Copy Summary'}
            >
              {copiedQuote ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4 text-white" />}
              <span className="hidden sm:inline text-[11px]">{copiedQuote ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কপি' : 'Copy')}</span>
            </button>

            <button
              onClick={() => {
                setSelectedSahabaId(null);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/30 active:scale-95 transition cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Direct Sahaba Quick-Switcher & Swipe Hint Strip */}
        <QuickReaderSwitcherStrip
          themeMode={themeMode}
          selectedLanguage={selectedLanguage}
          hasPrev={Boolean(prevSahaba)}
          hasNext={Boolean(nextSahaba)}
          prevLabel={prevSahaba ? getSahabaName(prevSahaba, selectedLanguage) : null}
          nextLabel={nextSahaba ? getSahabaName(nextSahaba, selectedLanguage) : null}
          onPrev={() => prevSahaba && handleSelectSahaba(prevSahaba.id)}
          onNext={() => nextSahaba && handleSelectSahaba(nextSahaba.id)}
        />

        {/* Main Content Card */}
        <div
          className={`w-full rounded-2xl border p-4 sm:p-6 md:p-8 space-y-6 shadow-xl transition-all ${
            isDay
              ? 'bg-gradient-to-b from-white via-emerald-50/25 to-white border-slate-200 text-slate-900 shadow-sm'
              : 'bg-gradient-to-b from-[#0a1f26] via-[#07171c] to-[#051115] border-[#14353e] text-white shadow-black/80'
          }`}
        >
          {/* Header & Meta Badges */}
          <div className={`border-b pb-5 space-y-3 ${isDay ? 'border-emerald-200' : 'border-emerald-500/20'}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 border ${
                  isDay ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}
              >
                <Crown className="w-3.5 h-3.5 text-amber-500" />
                <span>{isBn ? 'মর্যাদা ক্রম:' : 'Rank:'} #{formatNum(activeSahaba.rank)} • {activeCat}</span>
              </span>

              {activeBirthDeath && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-1.5 ${
                    isDay ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{activeBirthDeath}</span>
                </span>
              )}
            </div>

            <div className="space-y-1">
              <h1 className={`text-xl sm:text-2xl md:text-3xl font-black leading-tight ${isDay ? 'text-emerald-900' : 'text-emerald-400'}`}>
                {activeName}
              </h1>
            </div>

            <div className={`p-3.5 rounded-xl border ${isDay ? 'bg-amber-50 border-amber-200 text-amber-950' : 'bg-[#142322] border-amber-500/30 text-amber-300'}`}>
              <span className="text-xs sm:text-sm font-bold flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span><strong>{isBn ? 'উপাধি ও বিশেষ খ্যাতি:' : 'Title & Distinction:'}</strong> {activeTitle}</span>
              </span>
            </div>

            {/* Prophetic Special Title Highlight Box (From Forty Sahaba Titles Book) */}
            {propheticProfile && (
              <div className={`p-4 sm:p-5 rounded-2xl border space-y-3.5 shadow-md ${
                isDay
                  ? 'bg-gradient-to-r from-amber-50 via-yellow-50/70 to-amber-100/60 border-amber-300 text-amber-950'
                  : 'bg-gradient-to-r from-[#1c1809] via-[#241e0c] to-[#1a1408] border-amber-500/50 text-amber-100'
              }`}>
                <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2.5 border-amber-400/30">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-amber-500 text-black flex items-center justify-center font-black text-xs shadow-xs">
                      #{formatNum(propheticProfile.no)}
                    </span>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                        👑 {isBn ? 'রাসূলুল্লাহ (সা.)-এর দেয়া উপাধি (চল্লিশ সাহাবির উপাধি গ্রন্থ)' : 'Prophetic Title (Forty Sahaba Titles)'}
                      </span>
                      <h4 className="text-sm sm:text-base font-black text-amber-900 dark:text-amber-300">
                        {isBn ? propheticProfile.titleBn : isAr ? propheticProfile.titleAr : propheticProfile.titleEn}
                      </h4>
                    </div>
                  </div>
                </div>

                {isBn ? (
                  <div className="space-y-2 text-xs sm:text-sm leading-relaxed opacity-95">
                    <p>
                      <strong className="text-amber-700 dark:text-amber-300">উপাধি লাভের প্রেক্ষাপট ও কারণ:</strong> {propheticProfile.reasonBn}
                    </p>
                    <div className={`p-3 rounded-xl border space-y-1.5 ${
                      isDay ? 'bg-white/90 border-amber-200 shadow-xs' : 'bg-black/40 border-amber-500/30'
                    }`}>
                      <p className="text-xs italic opacity-95">
                        "{propheticProfile.hadithBn}"
                      </p>
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-amber-300/30 text-[11px]">
                        <span className="font-bold text-amber-700 dark:text-amber-400">
                          📖 প্রামাণ্য হাদিস সূত্র: {propheticProfile.sourcesBn.join(' • ')}
                        </span>
                        <button
                          onClick={() => {
                            const quote = `👑 রাসূলুল্লাহ (সা.)-এর দেয়া উপাধি:\n"${propheticProfile.titleBn}"\n\n📖 হাদিস: "${propheticProfile.hadithBn}"\nসূত্র: ${propheticProfile.sourcesBn.join(', ')}`;
                            navigator.clipboard.writeText(quote);
                            showToast('উপাধি ও হাদিস কপি করা হয়েছে');
                            if (soundEnabled) soundHaptics.playTap();
                          }}
                          className="px-2 py-0.5 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-800 dark:text-amber-200 font-bold text-[10px] flex items-center gap-1 transition cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>কপি</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : isAr && propheticProfile.hadithAr ? (
                  <div className={`p-3 rounded-xl border space-y-1.5 ${
                    isDay ? 'bg-white/90 border-amber-200 shadow-xs' : 'bg-black/40 border-amber-500/30'
                  }`}>
                    <p className="font-arabic text-right text-sm font-bold text-amber-600 dark:text-amber-300 leading-relaxed">
                      "{propheticProfile.hadithAr}"
                    </p>
                  </div>
                ) : (
                  <div className="text-xs leading-relaxed opacity-90 flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-amber-700 dark:text-amber-400">
                      📖 Sources: {propheticProfile.sourcesBn.map(localizeRefToEn).join(' • ')}
                    </span>
                    <button
                      onClick={() => {
                        const quote = `👑 Prophetic Title:\n"${propheticProfile.titleEn}"\n\nSources: ${propheticProfile.sourcesBn.map(localizeRefToEn).join(', ')}`;
                        navigator.clipboard.writeText(quote);
                        showToast('Title Copied');
                        if (soundEnabled) soundHaptics.playTap();
                      }}
                      className="px-2 py-0.5 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-800 dark:text-amber-200 font-bold text-[10px] flex items-center gap-1 transition cursor-pointer"
                    >
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            <p className={`text-sm sm:text-base leading-relaxed font-medium pt-1 ${isDay ? 'text-slate-800' : 'text-slate-200'}`}>
              {activeSummary}
            </p>
          </div>


          {/* ========================================================================= */}
          {/* SECTION 1: JOURNEY OF EMBRACING ISLAM (DETAILED)                          */}
          {/* ========================================================================= */}
          {activeIslamAcceptance && (
            <div className={`p-5 rounded-2xl border space-y-3 shadow-xs ${isDay ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' : 'bg-[#081a20] border-emerald-500/30 text-emerald-100'}`}>
              <h3 className="font-black text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>{isBn ? 'ইসলাম গ্রহণের ঐতিহাসিক প্রেক্ষাপট ও যাত্রা' : 'The Sacred Journey of Embracing Islam'}</span>
              </h3>
              <div className="space-y-3 text-xs sm:text-sm leading-relaxed opacity-95">
                {activeIslamAcceptance.split('\n\n').map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className={
                      pIdx === 0
                        ? 'first-letter:float-left first-letter:text-3xl first-letter:font-black first-letter:text-emerald-500 first-letter:mr-2.5 first-letter:leading-none'
                        : ''
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 2: DEDICATED FAMILY & LINEAGE SECTION (PARENTS, SPOUSES, CHILDREN) */}
          {/* ========================================================================= */}
          <div className={`p-5 rounded-2xl border space-y-4 shadow-md ${
            isDay ? 'bg-gradient-to-b from-blue-50/70 via-white to-blue-50/30 border-blue-200 text-slate-900' : 'bg-[#081a24] border-blue-500/30 text-blue-100'
          }`}>
            <div className="flex items-center justify-between border-b pb-2.5 border-blue-200/60 dark:border-blue-900/40">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                <h3 className="font-black text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                  {isBn ? 'পরিবার, বংশমর্যাদা, সহধর্মিণী ও সন্তানসন্ততি' : 'Family, Lineage, Spouses & Children'}
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-600 dark:text-blue-300">
                {isBn ? 'পবিত্র বংশলতিকা' : 'Sacred Lineage'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
              {/* Father & Mother */}
              <div className={`p-3.5 rounded-xl border space-y-2 ${isDay ? 'bg-white border-blue-100' : 'bg-[#06141c] border-blue-900/40'}`}>
                <div className="flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400">
                  <UserCheck className="w-4 h-4" />
                  <span>{isBn ? 'পিতা ও মাতা:' : 'Parents:'}</span>
                </div>
                <div className="space-y-1 pl-2 border-l-2 border-blue-400/40 opacity-90 leading-relaxed">
                  <p><strong>{isBn ? 'পিতা:' : 'Father:'}</strong> {father || (isBn ? 'ঐতিহাসিক সীরাতে নিবন্ধিত' : 'Recorded in Seerah')}</p>
                  <p><strong>{isBn ? 'মাতা:' : 'Mother:'}</strong> {mother || (isBn ? 'ঐতিহাসিক সীরাতে নিবন্ধিত' : 'Recorded in Seerah')}</p>
                  {tribe && <p><strong>{isBn ? 'গোত্র ও বংশ:' : 'Tribe & Clan:'}</strong> {tribe}</p>}
                </div>
              </div>

              {/* Wives & Spouses */}
              <div className={`p-3.5 rounded-xl border space-y-2 ${isDay ? 'bg-white border-blue-100' : 'bg-[#06141c] border-blue-900/40'}`}>
                <div className="flex items-center gap-1.5 font-bold text-rose-600 dark:text-rose-400">
                  <Heart className="w-4 h-4" />
                  <span>{isBn ? 'সহধর্মিণীগণ (স্ত্রী):' : 'Spouses & Wives:'}</span>
                </div>
                {wives && wives.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {wives.map((wife, wIdx) => {
                      const hasBio = isBn && (FAMILY_MEMBER_BIOGRAPHIES[wife] || Object.values(FAMILY_MEMBER_BIOGRAPHIES).find(b => b.nameBn.includes(wife)));
                      return (
                        <span
                          key={wIdx}
                          onClick={() => {
                            if (hasBio) {
                              setSelectedFamilyBioModal(hasBio);
                              if (soundEnabled) soundHaptics.playTap();
                            }
                          }}
                          className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition ${
                            hasBio
                              ? 'bg-rose-500/15 border-rose-300 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 cursor-pointer hover:bg-rose-500/25'
                              : 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 opacity-90'
                          }`}
                        >
                          {wife} {hasBio && '🔍'}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-[11px] opacity-80 italic">
                    {isBn ? 'ঐতিহাসিক গ্রন্থসমূহে সম্মানিত সহধর্মিণীর পুণ্য বিবরণ সংরক্ষিত।' : 'Recorded in classical Islamic chronicles.'}
                  </p>
                )}
              </div>

              {/* Sons */}
              <div className={`p-3.5 rounded-xl border space-y-2 ${isDay ? 'bg-white border-blue-100' : 'bg-[#06141c] border-blue-900/40'}`}>
                <div className="flex items-center gap-1.5 font-bold text-teal-600 dark:text-teal-400">
                  <Baby className="w-4 h-4" />
                  <span>{isBn ? 'পুত্রসন্তানগণ:' : 'Sons:'}</span>
                </div>
                {sons && sons.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {sons.map((son, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2.5 py-1 rounded-lg bg-teal-500/15 border border-teal-300 dark:border-teal-500/40 text-teal-700 dark:text-teal-300 text-[11px] font-semibold"
                      >
                        {son}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] opacity-80 italic">
                    {isBn ? 'সীরাত সংকলনে পুণ্যবান সন্তান ও বংশধরের ইতিহাস সংরক্ষিত।' : 'Noble progeny documented in classical registers.'}
                  </p>
                )}
              </div>

              {/* Daughters */}
              <div className={`p-3.5 rounded-xl border space-y-2 ${isDay ? 'bg-white border-blue-100' : 'bg-[#06141c] border-blue-900/40'}`}>
                <div className="flex items-center gap-1.5 font-bold text-purple-600 dark:text-purple-400">
                  <Crown className="w-4 h-4" />
                  <span>{isBn ? 'কন্যাসন্তানগণ:' : 'Daughters:'}</span>
                </div>
                {daughters && daughters.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {daughters.map((daughter, dIdx) => (
                      <span
                        key={dIdx}
                        className="px-2.5 py-1 rounded-lg bg-purple-500/15 border border-purple-300 dark:border-purple-500/40 text-purple-700 dark:text-purple-300 text-[11px] font-semibold"
                      >
                        {daughter}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-[11px] opacity-80 italic">
                    {isBn ? 'সীরাত গ্রন্থে কন্যা ও পুণ্যবতী বংশধরদের বিবরণ বিদ্যমান।' : 'Documented in classical biographies.'}
                  </p>
                )}
              </div>
            </div>

            {/* Notable Relatives */}
            {relatives && relatives.length > 0 && (
              <div className={`p-3 rounded-xl border text-xs space-y-1.5 ${isDay ? 'bg-white border-blue-100' : 'bg-[#06141c] border-blue-900/40'}`}>
                <strong className="text-blue-700 dark:text-blue-300 block">
                  {isBn ? 'বিশিষ্ট আত্মীয়স্বজন ও সংযোগ:' : 'Notable Relatives & Kinship:'}
                </strong>
                <div className="flex flex-wrap gap-1.5">
                  {relatives.map((rel, rIdx) => (
                    <span key={rIdx} className="px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-700 dark:text-blue-200 text-[11px]">
                      • {rel}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Family Legacy Overview */}
            {familyOverview && (
              <p className="text-xs leading-relaxed opacity-90 italic pt-1 border-t border-blue-200/50 dark:border-blue-900/30">
                "{familyOverview}"
              </p>
            )}
          </div>

          {/* ========================================================================= */}
          {/* SECTION 3: KEY VIRTUES, MILESTONES & CONTRIBUTIONS                        */}
          {/* ========================================================================= */}
          {activeVirtues && activeVirtues.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-black text-xs sm:text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{isBn ? 'প্রধান প্রধান গুণ, সুউচ্চ মর্যাদা ও অবদান' : 'Key Virtues, Distinctions & Milestones'}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {activeVirtues.map((virtue, vIdx) => (
                  <div
                    key={vIdx}
                    className={`p-3.5 rounded-2xl border flex items-start gap-2.5 text-xs font-medium transition ${
                      isDay
                        ? 'bg-white border-slate-200 text-slate-800 shadow-xs'
                        : 'bg-[#0d2128] border-teal-900/40 text-teal-100 shadow-xs'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed opacity-95">{virtue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 4: COMPREHENSIVE DETAILED BIOGRAPHY NARRATIVE                     */}
          {/* ========================================================================= */}
          {activeBiography && (
            <div className={`p-5 rounded-2xl border space-y-3 ${isDay ? 'bg-slate-50 border-slate-200 text-slate-900' : 'bg-[#081a20] border-teal-900/40 text-slate-100'}`}>
              <h3 className="font-black text-xs sm:text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                <span>{isBn ? 'পূর্ণাঙ্গ বিস্তারিত জীবনচরিত ও ইতিহাস' : 'Comprehensive Life Biography & Historical Chronicles'}</span>
              </h3>
              <div className="space-y-3 text-xs sm:text-sm leading-relaxed opacity-95">
                {activeBiography.split('\n\n').map((paragraph, bIdx) => (
                  <p
                    key={bIdx}
                    className={
                      bIdx === 0
                        ? 'first-letter:float-left first-letter:text-3xl first-letter:font-black first-letter:text-amber-500 first-letter:mr-2.5 first-letter:leading-none'
                        : ''
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 5: EMOTIONAL HISTORICAL INCIDENTS & SACRIFICES                    */}
          {/* ========================================================================= */}
          {activeEmotionalStories && activeEmotionalStories.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-black text-xs sm:text-sm text-rose-600 dark:text-rose-400 flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                <span>{isBn ? 'হৃদয়স্পর্শী ঐতিহাসিক ঘটনা ও আত্মত্যাগ' : 'Heart-touching Historical Stories & Sacrifices'}</span>
              </h3>
              <div className="space-y-3">
                {activeEmotionalStories.map((story, sIdx) => (
                  <div
                    key={sIdx}
                    className={`p-4 sm:p-5 rounded-2xl border space-y-2 shadow-xs ${
                      isDay ? 'bg-rose-50/60 border-rose-200 text-rose-950' : 'bg-[#1a1215] border-rose-500/30 text-rose-100'
                    }`}
                  >
                    <h4 className="font-bold text-xs sm:text-sm text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                      <span>📌</span>
                      <span>{story.title}</span>
                    </h4>
                    <p className="text-xs sm:text-sm leading-relaxed opacity-95">{story.story}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 6: QURANIC VERSES REVEALED IN THEIR HONOR                         */}
          {/* ========================================================================= */}
          {activeQuranRefs.length > 0 && (
            <div className={`p-5 rounded-2xl border space-y-3 ${isDay ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-[#081f19] border-emerald-500/30 text-emerald-100'}`}>
              <h4 className="font-black text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                <span>{isBn ? 'পবিত্র কুরআনের আয়াত ও সুসংবাদ' : 'Quranic Verses Revealed in Their Honor'}</span>
              </h4>
              <div className="space-y-3">
                {activeQuranRefs.map((qr, qIdx) => (
                  <div key={qIdx} className={`p-4 rounded-xl border space-y-2 ${isDay ? 'bg-white border-emerald-200' : 'bg-[#061813] border-emerald-500/30'}`}>
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <span>{isBn ? qr.surah : localizeRefToEn(qr.surah)} • {isBn ? 'আয়াত:' : 'Verse:'} {formatNum(qr.verse)}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleCopyQuran(qr)}
                          className="px-2 py-0.5 rounded-md bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-700 dark:text-emerald-300 font-bold text-[10px] flex items-center gap-1 transition cursor-pointer"
                          title={isBn ? 'আয়াত ও অনুবাদ কপি করুন' : 'Copy Verse & Translation'}
                        >
                          <Copy className="w-3 h-3" />
                          <span>{isBn ? 'কপি' : 'Copy'}</span>
                        </button>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-300">
                          {isBn ? 'আল-কুরআন' : isAr ? 'القرآن الكريم' : 'Holy Quran'}
                        </span>
                      </div>
                    </div>
                    {isAr && qr.arabic && (
                      <p className="font-arabic text-right text-base sm:text-lg leading-loose font-bold text-emerald-800 dark:text-emerald-300">
                        {qr.arabic}
                      </p>
                    )}
                    {!isAr && (
                      <p className="text-xs leading-relaxed opacity-95">
                        "{isBn ? qr.translationBn : qr.translationEn}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 7: AUTHENTIC HADITH PRAISES & TESTIMONIES                         */}
          {/* ========================================================================= */}
          {activeHadithPraises.length > 0 && (
            <div className={`p-5 rounded-2xl border space-y-3 ${isDay ? 'bg-teal-50/60 border-teal-200 text-teal-950' : 'bg-[#071d22] border-teal-500/30 text-teal-100'}`}>
              <h4 className="font-black text-xs sm:text-sm text-teal-700 dark:text-teal-300 flex items-center gap-2">
                <Quote className="w-4 h-4 text-teal-500" />
                <span>{isBn ? 'সহিহ হাদিসে রাসুল (সা.)-এর সুসংবাদ ও প্রশংসা' : 'Prophetic Praises & Authentic Hadiths'}</span>
              </h4>
              <div className="space-y-3">
                {activeHadithPraises.map((hp, hIdx) => (
                  <div key={hIdx} className={`p-4 rounded-xl border space-y-2 ${isDay ? 'bg-white border-teal-200' : 'bg-[#05171b] border-teal-500/30'}`}>
                    {isAr && hp.arabic && (
                      <p className="font-arabic text-right text-base sm:text-lg leading-loose font-bold text-teal-800 dark:text-teal-300">
                        {hp.arabic}
                      </p>
                    )}
                    {!isAr && (
                      <p className="text-xs leading-relaxed opacity-95 font-medium">
                        "{isBn ? hp.textBn : hp.textEn}"
                      </p>
                    )}
                    <div className="flex items-center justify-between text-[11px] font-bold text-teal-600 dark:text-teal-400 pt-1 border-t border-teal-100 dark:border-teal-900/30">
                      <span>— {isBn ? hp.source : localizeRefToEn(hp.source)}</span>
                      <button
                        onClick={() => handleCopyHadith(hp)}
                        className="px-2 py-0.5 rounded-md bg-teal-500/15 hover:bg-teal-500/30 text-teal-700 dark:text-teal-300 font-bold text-[10px] flex items-center gap-1 transition cursor-pointer"
                        title={isBn ? 'হাদীসটি কপি করুন' : 'Copy Hadith'}
                      >
                        <Copy className="w-3 h-3" />
                        <span>{isBn ? 'কপি' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 8: PASSING, MARTYRDOM & RESTING PLACE                             */}
          {/* ========================================================================= */}
          {activeDeath && (
            <div className={`p-4 sm:p-5 rounded-2xl border space-y-2 ${isDay ? 'bg-slate-100/70 border-slate-200 text-slate-900' : 'bg-[#12161b] border-slate-700/50 text-slate-100'}`}>
              <h3 className="font-black text-xs sm:text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <span>🕊️</span>
                <span>{isBn ? 'ওফাত, শাহাদাত ও শেষ সমাধি' : 'Passing, Martyrdom & Resting Place'}</span>
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed opacity-95">{activeDeath}</p>
            </div>
          )}

          {/* ========================================================================= */}
          {/* SECTION 9: SPIRITUAL LESSONS FOR LIFE                                     */}
          {/* ========================================================================= */}
          {activeLessons && activeLessons.length > 0 && (
            <div className={`p-5 rounded-2xl border space-y-2.5 ${isDay ? 'bg-amber-50/50 border-amber-200 text-amber-950' : 'bg-[#17120a] border-amber-500/30 text-amber-100'}`}>
              <h4 className="font-black text-xs sm:text-sm text-amber-700 dark:text-amber-300 flex items-center gap-2">
                <span>💡</span>
                <span>{isBn ? 'ঐতিহাসিক শিক্ষা ও জীবনের অনুকরণীয় পাথেয়' : 'Spiritual Lessons & Life Principles'}</span>
              </h4>
              <ul className="text-xs space-y-1.5 opacity-90 pl-1">
                {activeLessons.map((les, lIdx) => (
                  <li key={lIdx} className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{les}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Footer Authentic References */}
          {activeReferences && activeReferences.length > 0 && (
            <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800 text-[11px] opacity-75 text-center">
              <span>{isBn ? 'নির্ভরযোগ্য তথ্যসূত্র:' : 'Authentic Sources:'} {activeReferences.join(' • ')}</span>
            </div>
          )}
        </div>

        {/* Quick Companion Switcher Strip */}
        <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 shadow-lg ${
          isDay ? 'bg-white border-emerald-200' : 'bg-[#081a20] border-teal-900/50'
        }`}>
          <button
            disabled={!prevSahaba}
            onClick={() => prevSahaba && handleSelectSahaba(prevSahaba.id)}
            className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
              prevSahaba
                ? (isDay ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100' : 'bg-[#0b272f] border-teal-700 text-emerald-300 hover:bg-[#0e333e]')
                : 'opacity-40 cursor-not-allowed border-transparent'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <div className="text-left hidden sm:block">
              <div className="text-[10px] text-slate-400 font-normal">{isBn ? 'পূর্ববর্তী সাহাবি' : 'Previous'}</div>
              <div className="truncate max-w-[120px]">{prevSahaba ? getSahabaName(prevSahaba, selectedLanguage) : ''}</div>
            </div>
          </button>

          <span className="text-xs font-black text-amber-500 text-center">
            #{formatNum(activeSahaba.rank)} / {formatNum(SAHABA_DATABASE.length)}
          </span>

          <button
            disabled={!nextSahaba}
            onClick={() => nextSahaba && handleSelectSahaba(nextSahaba.id)}
            className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
              nextSahaba
                ? (isDay ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100' : 'bg-[#0b272f] border-teal-700 text-emerald-300 hover:bg-[#0e333e]')
                : 'opacity-40 cursor-not-allowed border-transparent'
            }`}
          >
            <div className="text-right hidden sm:block">
              <div className="text-[10px] text-slate-400 font-normal">{isBn ? 'পরবর্তী সাহাবি' : 'Next'}</div>
              <div className="truncate max-w-[120px]">{nextSahaba ? getSahabaName(nextSahaba, selectedLanguage) : ''}</div>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Modal for Family Member Bio */}
        {selectedFamilyBioModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
            <div className={`w-full max-w-lg rounded-3xl border p-5 sm:p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto ${
              isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0c2228] border-teal-900/60 text-white'
            }`}>
              <button
                onClick={() => setSelectedFamilyBioModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-1 border-b pb-3 border-teal-500/20 pr-8">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-500">
                  {selectedFamilyBioModal.relationTitleBn}
                </span>
                <h3 className="text-base sm:text-lg font-black text-emerald-600 dark:text-emerald-400">
                  {selectedFamilyBioModal.nameBn}
                </h3>
                {selectedFamilyBioModal.nameAr && (
                  <p className="font-arabic text-sm text-amber-500">{selectedFamilyBioModal.nameAr}</p>
                )}
                {selectedFamilyBioModal.birthAndDeathBn && (
                  <p className="text-xs opacity-75">{selectedFamilyBioModal.birthAndDeathBn}</p>
                )}
              </div>

              <div className="space-y-2 text-xs sm:text-sm leading-relaxed opacity-95">
                <p>{selectedFamilyBioModal.biographyBn}</p>
              </div>

              {selectedFamilyBioModal.keyContributionsBn && selectedFamilyBioModal.keyContributionsBn.length > 0 && (
                <div className="space-y-1.5 pt-2 border-t border-teal-500/20 text-xs">
                  <strong className="text-amber-500 block">
                    {isBn ? 'অবদান ও পুণ্যস্মৃতি:' : 'Key Contributions & Virtues:'}
                  </strong>
                  <ul className="space-y-1 opacity-90 pl-2">
                    {selectedFamilyBioModal.keyContributionsBn.map((c, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedFamilyBioModal.hadithOrSirahRefBn && (
                <p className="text-[11px] opacity-70 border-t pt-2 border-teal-500/20">
                  {isBn ? 'রেফারেন্স:' : 'References:'} {selectedFamilyBioModal.hadithOrSirahRefBn}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // MAIN SAHABA LIST & BOOK TABLE OF CONTENTS (TOC) VIEW
  // =========================================================================
  return (
    <div className="space-y-5 pb-24 animate-in fade-in duration-200">
      {/* Top Action Pills Bar Matching Seerat Screenshot */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          {lastReadSahaba && (
            <button
              onClick={() => handleSelectSahaba(lastReadSahaba.id)}
              className="px-3.5 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isBn ? `সর্বশেষ পঠিত (${getSahabaName(lastReadSahaba, selectedLanguage)})` : `Resume (${getSahabaName(lastReadSahaba, selectedLanguage)})`}</span>
            </button>
          )}

          <button
            onClick={() => {
              if (soundEnabled) soundHaptics.playTap();
              setShowBibliographyModal(true);
            }}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer active:scale-95 ${
              isDay
                ? 'bg-amber-100 text-amber-950 border-amber-300 hover:bg-amber-200'
                : 'bg-emerald-950/80 text-amber-300 border-emerald-700/60 hover:bg-emerald-900'
            }`}
            title={isBn ? 'হায়াতুস সাহাবা প্রামাণ্য গ্রন্থমালা' : 'Hayatus Sahaba Master Bibliography'}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>{isBn ? 'সাহাবা গ্রন্থমালা' : 'Bibliography'}</span>
          </button>

          {onBackToHub && (
            <button
              onClick={onBackToHub}
              className={`p-2.5 rounded-2xl text-xs font-bold border transition cursor-pointer active:scale-95 ${
                isDay
                  ? 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
                  : 'bg-[#09221d] text-emerald-300 border-emerald-800/60 hover:bg-[#0f342c]'
              }`}
              title={isBn ? 'ফিরে যান' : 'Back to Hub'}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Reading Progress Bar */}
        <div className="w-full sm:w-56 space-y-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-emerald-300">
            <span>{isBn ? 'পঠন অগ্রগতি' : 'Reading Progress'}</span>
            <span className="font-mono">{formatNum(completedCount)}/{formatNum(totalSahaba)} ({formatNum(progressPercentage)}%)</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-emerald-950/80 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Top Banner */}
      <div
        className={`p-5 sm:p-6 rounded-3xl border shadow-xl relative overflow-hidden ${
          isDay
            ? 'bg-gradient-to-r from-[#005a3e] via-[#006747] to-[#007a52] text-white border-emerald-600/40'
            : 'bg-gradient-to-r from-[#07191e] via-[#0b262d] to-[#10363e] text-white border-[#163c46]'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-emerald-100 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isBn ? 'হায়াতুস সাহাবা' : isAr ? 'حياة الصحابة رضي الله عنهم' : 'Hayatus Sahaba'}</span>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
            {isBn ? `${formatNum(totalSahaba)} জন সাহাবি` : `${totalSahaba} Companions`}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight">
          {isBn ? `হায়াতুস সাহাবা (${formatNum(totalSahaba)}+ বিশিষ্ট সাহাবির জীবনী)` : `Hayatus Sahaba (${totalSahaba}+ Prominent Biographies)`}
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-xl">
          {isBn
            ? 'মর্যাদা ও জনপ্রিয়তার ক্রমানুসারে নবীপ্রেমিক সাহাবিগণের পূর্ণাঙ্গ জীবন, পরিবার, সন্তানসন্ততি, ইসলাম গ্রহণ, বীরত্ব ও সহিহ হাদিসের প্রামাণিক দলিল।'
            : 'Ranked biographical accounts of the beloved companions of Prophet Muhammad (PBUH)—their families, Islam acceptance, virtues, and authentic Hadith evidence.'}
        </p>
      </div>

      {/* Search Bar */}
      <div className={`p-4 rounded-3xl border shadow-md ${isDay ? 'bg-white border-slate-200' : 'bg-[#0b2228] border-[#16424b]'}`}>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? 'সাহাবিগণের নাম, উপাধি (যেমন: যুশ শাহাদাতাইন, ফারায়েয, সাইফুল্লাহ) দিয়ে খুঁজুন...' : 'Search Sahaba by name, title...'}
            className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-semibold transition focus:outline-none ${
              isDay ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500' : 'bg-[#07171c] border-teal-900/60 text-white focus:border-emerald-500'
            }`}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 40 PROPHETIC TITLES SPECIAL COLLECTION VIEW                                */}
      {/* ========================================================================= */}
      {activeCategoryFilter === 'prophetic_titles' && (
        <div className={`p-5 rounded-3xl border shadow-xl space-y-5 ${
          isDay ? 'bg-white border-amber-300 text-slate-900' : 'bg-[#0c1f24] border-amber-500/40 text-white'
        }`}>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-500/30">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-amber-500 text-black flex items-center justify-center font-black">
                👑
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-black text-amber-700 dark:text-amber-300">
                  {isBn ? 'চল্লিশ সাহাবির উপাধি (বইয়ের ৪০ জন সাহাবি ক্রম অনুসারে)' : 'Forty Sahaba Titles (Complete In Order #1 to #40)'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-amber-200/80">
                  {isBn ? 'যেকোনো কার্ডে চাপ দিয়ে সাহাবির পূর্ণাঙ্গ জীবনচরিত পড়ুন' : 'Tap any companion card to read full chapter'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveCategoryFilter('all')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 transition cursor-pointer"
            >
              {isBn ? 'সূচিপত্রে ফিরুন ✕' : 'Back to TOC ✕'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PROPHETIC_SAHABA_TITLES.map((pt) => {
              const sahabaItem = SAHABA_DATABASE.find(s => s.id === pt.sahabaId) || SAHABA_DATABASE.find(s => s.id === 'zayd-and-usama');
              return (
                <div
                  key={pt.no}
                  onClick={() => sahabaItem && handleSelectSahaba(sahabaItem.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2.5 hover:shadow-lg active:scale-98 ${
                    isDay
                      ? 'bg-gradient-to-b from-amber-50/50 via-white to-white border-amber-200 hover:border-amber-400 text-slate-900'
                      : 'bg-gradient-to-b from-[#172224] via-[#0b1c20] to-[#07171a] border-amber-500/30 hover:border-amber-400 text-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-6 h-6 rounded-lg bg-amber-500 text-black flex items-center justify-center font-black text-xs shrink-0">
                        {formatNum(pt.no)}
                      </span>
                      <h4 className="font-black text-sm text-emerald-800 dark:text-emerald-300 truncate">
                        {isBn ? pt.nameBn : isAr ? pt.nameAr : pt.nameEn}
                      </h4>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-400/30 text-amber-800 dark:text-amber-300 text-xs font-black">
                    <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{isBn ? pt.titleBn : isAr ? pt.titleAr : pt.titleEn}</span>
                  </div>

                  {isBn && (
                    <p className="text-xs opacity-90 line-clamp-2 leading-relaxed">
                      {pt.reasonBn}
                    </p>
                  )}

                  <div className="pt-2 border-t border-slate-200/50 dark:border-teal-900/50 flex items-center justify-between text-[11px]">
                    <span className="opacity-75 truncate max-w-[200px]">
                      📖 {isBn ? pt.sourcesBn[0] : localizeRefToEn(pt.sourcesBn[0])}
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                      <span>{isBn ? 'বিস্তারিত পড়ুন' : 'Read'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* FILTERED OR SEARCH RESULTS CARD GRID (WHEN SEARCHING OR FILTERING)         */}
      {/* ========================================================================= */}
      {(searchQuery.trim() !== '' || (activeCategoryFilter !== 'all' && activeCategoryFilter !== 'prophetic_titles')) && (
        <div className={`p-5 rounded-3xl border shadow-xl space-y-4 ${
          isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0b1f24] border-teal-900/50 text-white'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-teal-900/40">
            <div>
              <h3 className="text-sm sm:text-base font-black text-emerald-700 dark:text-emerald-400">
                {searchQuery
                  ? (isBn ? `অনুসন্ধানের ফলাফল (${formatNum(filteredSahaba.length)} জন)` : `Search Results (${filteredSahaba.length})`)
                  : (isBn ? `ক্যাটাগরির ফলাফল (${formatNum(filteredSahaba.length)} জন)` : `Category Results (${filteredSahaba.length})`)}
              </h3>
              {searchQuery && (
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isBn ? `"${searchQuery}" এর জন্য ফলাফল দেখানো হচ্ছে` : `Showing results for "${searchQuery}"`}
                </p>
              )}
            </div>

            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategoryFilter('all');
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 transition cursor-pointer"
            >
              {isBn ? 'ফিল্টার মুছুন' : 'Clear Filter'}
            </button>
          </div>

          {filteredSahaba.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <span className="text-3xl">🔍</span>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
                {isBn ? 'কোনো সাহাবি পাওয়া যায়নি' : 'No companions found'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              {filteredSahaba.map((sahaba) => {
                const name = getSahabaName(sahaba, selectedLanguage);
                const title = getSahabaTitle(sahaba, selectedLanguage);
                const hasProphetic = isPropheticTitleHolder(sahaba.id);
                const proProfile = getPropheticTitleProfile(sahaba.id);

                return (
                  <div
                    key={sahaba.id}
                    onClick={() => handleSelectSahaba(sahaba.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2.5 shadow-xs hover:shadow-md hover:scale-[1.01] active:scale-98 ${
                      isDay
                        ? 'bg-white hover:bg-emerald-50/50 border-slate-200 hover:border-emerald-300 text-slate-900'
                        : 'bg-[#07191d] hover:bg-[#0f2e36] border-teal-900/60 hover:border-emerald-500/50 text-white'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono font-bold text-amber-500">
                          #{formatNum(sahaba.rank)}
                        </span>
                      </div>

                      <h4 className="font-black text-sm text-emerald-800 dark:text-emerald-300">
                        {name}
                      </h4>

                      {hasProphetic && proProfile && (
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[10px] font-black border border-amber-400/30">
                          <span>👑</span>
                          <span className="truncate">{isBn ? proProfile.titleBn : isAr ? proProfile.titleAr : proProfile.titleEn}</span>
                        </div>
                      )}

                      <p className="text-xs opacity-80 line-clamp-2 leading-relaxed">
                        {title}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200/50 dark:border-teal-900/40 flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                      <span>{getSahabaCategory(sahaba, selectedLanguage)}</span>
                      <span className="flex items-center gap-0.5">
                        <span>{isBn ? 'পড়ুন' : 'View'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* BOOK TABLE OF CONTENTS (TOC) — 8 CATEGORY BOXES WITH NUMBERED LISTS       */}
      {/* ========================================================================= */}
      {activeCategoryFilter === 'all' && searchQuery.trim() === '' && (
      <div className={`p-5 rounded-3xl border shadow-xl space-y-6 ${isDay ? 'bg-white border-amber-200 text-slate-900' : 'bg-[#0b1f24] border-amber-500/30 text-white'}`}>
        <div className="flex items-center justify-between pb-3 border-b border-amber-500/20">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">📖</span>
            <div>
              <h3 className="text-sm sm:text-base font-black text-amber-600 dark:text-amber-400">
                {isBn ? 'সূচিপত্র' : isAr ? 'فهرس المحتويات' : 'Table of Contents'}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-teal-300">
                {isBn ? 'যেকোনো সাহাবি স্পর্শ করে সম্পূর্ণ অধ্যায় পড়ুন' : 'Tap any companion to read full chapter'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveCategoryFilter('all')}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-md hover:bg-emerald-500 transition cursor-pointer"
          >
            {isBn ? 'সকল সাহাবি দেখুন' : 'View All'}

          </button>
        </div>

        {/* 8 Category Boxes Grid with Numbered Lists inside */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SAHABA_CATEGORIES.map((catMeta) => {
            const list = sahabaByCategory[catMeta.key] || [];
            if (list.length === 0) return null;

            return (
              <div
                key={catMeta.key}
                className={`p-4 rounded-2xl border shadow-md space-y-3 flex flex-col justify-start ${
                  isDay
                    ? 'bg-gradient-to-b from-amber-50/40 via-white to-white border-amber-200/80 text-slate-900'
                    : 'bg-gradient-to-b from-[#0f282e] via-[#091a1e] to-[#071518] border-teal-800/50 text-white'
                }`}
              >
                {/* Category Header Box */}
                <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-xl shrink-0">{catMeta.icon}</span>
                    <h4 className="font-extrabold text-xs sm:text-sm text-amber-700 dark:text-amber-300 truncate">
                      {isBn ? catMeta.titleBn : isAr ? catMeta.titleAr : catMeta.titleEn}
                    </h4>
                  </div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0">
                    {formatNum(list.length)}{isBn ? ' জন' : ''}
                  </span>
                </div>

                {/* Numbered Sahaba List inside Category Box */}
                <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
                  {list.map((sahaba, sIdx) => {
                    const name = getSahabaName(sahaba, selectedLanguage);
                    return (
                      <div
                        key={sahaba.id}
                        onClick={() => handleSelectSahaba(sahaba.id)}
                        className={`p-2 rounded-xl border text-xs font-semibold transition cursor-pointer flex items-center justify-between gap-2 ${
                          isDay
                            ? 'bg-white hover:bg-emerald-50 border-slate-200 text-slate-800 hover:border-emerald-300'
                            : 'bg-[#07181c] hover:bg-[#0f323a] border-teal-900/50 text-slate-200 hover:border-emerald-500/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-mono text-[11px] text-amber-500 font-bold shrink-0">
                            {formatNum(sIdx + 1)}.
                          </span>
                          <span className="truncate">{name}</span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
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

      {/* Classical Hayatus Sahaba Bibliography & Book Intro Modal */}
      {showBibliographyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className={`w-full max-w-2xl rounded-3xl border p-5 sm:p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto ${
            isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#0a1e24] border-teal-900/60 text-white'
          }`}>
            <button
              onClick={() => setShowBibliographyModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1.5 border-b pb-4 border-amber-500/20 pr-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-500/15 text-amber-400 text-[11px] font-black uppercase">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{isBn ? 'প্রামাণ্য গ্রন্থ ও উৎসপঞ্জি' : isAr ? 'حياة الصحابة • المراجع' : 'Hayatus Sahaba • Master Bibliography'}</span>
              </span>
              <h3 className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400">
                {isBn ? 'হায়াতুস সাহাবা গ্রন্থ ও উৎসের সবিস্তার বিবরণ' : 'Hayatus Sahaba Master Bibliography & Sources'}
              </h3>
              <p className="text-xs opacity-80">
                {isBn
                  ? 'রাসূলুল্লাহ (সা.)-এর সুমহান সাহাবিগণের জীবন, ত্যাগ ও চরিত্রভিত্তিক বিশ্ববিখ্যাত প্রামাণ্য বিশ্বকোষ'
                  : 'An authentic biographical encyclopedia on the noble companions of Prophet Muhammad (PBUH)'}
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm leading-relaxed opacity-95">
              <div className={`p-4 rounded-2xl border space-y-2 ${isDay ? 'bg-amber-50/60 border-amber-200' : 'bg-[#142322] border-amber-500/30'}`}>
                <h4 className="font-extrabold text-amber-600 dark:text-amber-300 flex items-center gap-2">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <span>{isBn ? '১. মূল গ্রন্থ ও সংকলক' : '1. Master Book & Author'}</span>
                </h4>
                <p>
                  {isBn
                    ? 'প্রখ্যাত হাদিস বিশারদ হযরত মাওলানা মুহাম্মদ ইউসুফ কান্ধলভী (র.) ৩ খণ্ডে আরবি ভাষায় সংকলন করেন ‘হায়াতুস সাহাবা’। এই গ্রন্থে বিশুদ্ধ ও গ্রহণযোগ্য সহিহ হাদিস, সীরাত গ্রন্থাবলি ও মুহাদ্দিসগণের সনদের আলোকে সাহাবিদের দাওয়াত, ইবাদত, আখলাক, হিজরত, বীরত্ব ও শাহাদাতের বিরল ঘটনাপ্রবাহ সুবিন্যস্তভাবে সংগৃহীত হয়েছে।'
                    : 'Compiled in 3 volumes by the renowned scholar Shaykh Muhammad Yusuf Kandhlawi (RA), "Hayatus Sahaba" documents the companions\' faith, dawah, worship, sacrifices, and character with authentic chains.'}
                </p>
              </div>

              <div className={`p-4 rounded-2xl border space-y-2 ${isDay ? 'bg-emerald-50/60 border-emerald-200' : 'bg-[#081a1f] border-emerald-500/30'}`}>
                <h4 className="font-extrabold text-emerald-600 dark:text-emerald-300 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>{isBn ? '২. ক্লাসিক্যাল তথ্যসূত্র ও নির্ভরতা' : '2. Classical Reference Works'}</span>
                </h4>
                {isBn ? (
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span><strong>সিয়ারু আ‘লামিন নুবালা:</strong> ইমাম আজ-জাহাবি (র.) কর্তৃক সংকলিত সাহাবি ও তাবেয়িদের প্রামাণ্য জীবনীগ্রন্থ।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span><strong>আল-ইসাবাহ ফি তাময়ীযিস সাহাবাহ:</strong> হাফেজ ইবনে হাজার আল-আসকালানি (র.)-এর রচিত অনন্য সাহাবি অভিধান।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span><strong>আল-ইস্তিয়াব ফি মা‘রিফাতিল আসহাব:</strong> ইমাম ইবনে আবদিল বার (র.)-এর প্রাচীনতম প্রামাণ্য সংকলন।</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span><strong>হাদিস শরিফ:</strong> সহিহ বুখারি, সহিহ মুসলিম, জামে আত-তিরমিজি, সুনানে আবু দাউদ ও মুসনাদে আহমাদ।</span>
                    </li>
                  </ul>
                ) : (
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span><strong>Siyar A'lam al-Nubala:</strong> Classical biographical encyclopedia authored by Imam adh-Dhahabi (RA).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span><strong>Al-Isabah fi Tamyiz as-Sahabah:</strong> Authoritative lexicon of the Companions by Hafiz Ibn Hajar al-Asqalani (RA).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span><strong>Al-Isti'ab fi Ma'rifat al-Ashab:</strong> Foundational Companion compilation by Imam Ibn Abd al-Barr (RA).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span><strong>Hadith Collections:</strong> Sahih al-Bukhari, Sahih Muslim, Jami at-Tirmidhi, Sunan Abu Dawud, and Musnad Ahmad.</span>
                    </li>
                  </ul>
                )}
              </div>

              <div className={`p-4 rounded-2xl border space-y-2 ${isDay ? 'bg-blue-50/60 border-blue-200' : 'bg-[#081926] border-blue-500/30'}`}>
                <h4 className="font-extrabold text-blue-600 dark:text-blue-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-500" />
                  <span>{isBn ? '৩. মূল বৈশিষ্ট্য' : '3. Key Features'}</span>
                </h4>
                <p>
                  {isBn
                    ? `হায়াতুস সাহাবা বিভাগে মোট ${formatNum(totalSahaba)} জন মর্যাদাবান সাহাবির ক্রমভিত্তিক জীবনচরিত, পরিবার (পিতা, মাতা, সহধর্মিণী ও সন্তানগণ), ইসলাম গ্রহণের আবেগঘন কাহিনী, বীরত্বপূর্ণ অবদান, পবিত্র কুরআনের আয়াত ও সহিহ হাদিসের সুসংবাদ সন্নিবেশিত করা হয়েছে।`
                    : `Features comprehensive biographies of ${totalSahaba} companions categorized into Rashidun, Ashara Mubashshara, Pioneers, Commanders, Scholars, Ansar, Beloved Companions, and Sahabiyyat with family trees and authentic Hadith praises.`}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-amber-500/20 text-center">
              <button
                onClick={() => setShowBibliographyModal(false)}
                className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-black font-black text-xs shadow-lg transition cursor-pointer"
              >
                {isBn ? 'বুঝেছি, পঠন শুরু করুন' : 'Got it, Start Reading'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
