import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { NavModule, ThemeMode, ZikrLanguage } from '../types';
import type { OtherSubSection } from './OtherIslamicHubView';
import { NAV_TRANSLATIONS } from '../utils/appTranslations';
import { stepBackOr, useBackLayer } from '../utils/backNavigation';
import { soundHaptics } from '../utils/audioHaptics';
import {
  Home,
  Clock,
  ClipboardCheck,
  Plus,
  BookOpen,
  Sparkles,
  LayoutGrid,
  Search,
  X,
  ArrowLeft,
  Check,
  Compass,
  Users,
  Heart,
  ScrollText,
  BookMarked,
  Shield,
  Bookmark,
  User,
  Sun,
  MapPin,
  Swords,
  Landmark,
} from 'lucide-react';

interface BottomNavProps {
  activeModule: NavModule;
  activeSubSection?: OtherSubSection;
  onModuleChange: (mod: NavModule) => void;
  onNavigateAnyPage?: (pageId: string) => void;
  onOpenAddModal?: () => void;
  onOpenAssistant?: () => void;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  counterBadge?: number;
}

interface QuickPageItem {
  id: string;
  labelBn: string;
  labelEn: string;
  subBn: string;
  subEn: string;
  keywords: string;
  icon: React.ReactNode;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeModule,
  activeSubSection = 'hub',
  onModuleChange,
  onNavigateAnyPage,
  onOpenAddModal,
  onOpenAssistant,
  themeMode = 'day',
  selectedLanguage = 'bn',
  soundEnabled = true,
  counterBadge,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';

  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const [pageSearch, setPageSearch] = useState('');

  useBackLayer(isQuickMenuOpen, () => setIsQuickMenuOpen(false), 'bottom-quick-switcher');

  // All sub-modules grouped under the "সব পেজ" (All Pages / Hub) tab
  const otherModules: NavModule[] = [
    'other',
    'namaj',
    'dua',
    'hadith',
    'kitab',
    'hajj_checklist',
    'umrah_guide',
    'hajj_route_map',
    'hajj_essentials',
    'tablig',
    'prophets_25',
    'allah_names',
    'history_timeline',
    'hayatus_sahaba',
    'islamic_history_wars',
    'seerat_un_nabi',
    'araber_gotro',
    'nobi_24_hours',
  ];
  const isOtherActive = otherModules.includes(activeModule);

  // Resolve exact currently open page/sub-page ID
  const activeResolvedPageId = useMemo<string>(() => {
    if (activeModule === 'other') {
      if (activeSubSection === 'arober_gotro') return 'araber_gotro';
      return activeSubSection || 'other';
    }
    return activeModule;
  }, [activeModule, activeSubSection]);

  const navigateToPage = (pageId: string) => {
    if (soundEnabled) soundHaptics.playTap();
    if (onNavigateAnyPage) {
      onNavigateAnyPage(pageId);
    } else {
      onModuleChange(pageId as NavModule);
    }
  };

  const handleOpenPageFromSheet = (pageId: string) => {
    if (soundEnabled) soundHaptics.playTap();
    setIsQuickMenuOpen(false);
    setPageSearch('');
    // Wait briefly so useBackLayer pops the temporary sheet history entry cleanly before pushing target route
    window.setTimeout(() => {
      if (onNavigateAnyPage) {
        onNavigateAnyPage(pageId);
      } else {
        onModuleChange(pageId as NavModule);
      }
    }, 60);
  };

  const handleGoBackFromSheet = () => {
    if (soundEnabled) soundHaptics.playTap();
    setIsQuickMenuOpen(false);
    setPageSearch('');
    window.setTimeout(() => {
      stepBackOr(() => navigateToPage('other'));
    }, 75);
  };

  const handleOpenAssistantFromSheet = () => {
    if (soundEnabled) soundHaptics.playTap();
    setIsQuickMenuOpen(false);
    setPageSearch('');
    window.setTimeout(() => {
      onOpenAssistant?.();
    }, 60);
  };

  const allPages: QuickPageItem[] = useMemo(
    () => [
      {
        id: 'zikir_counter',
        labelBn: 'জিকির কাউন্টার',
        labelEn: 'Zikr Counter',
        subBn: 'তাসবীহ ও দৈনিক গণনা',
        subEn: 'Tasbih & daily counts',
        keywords: 'zikir tasbih counter home তাসবিহ জিকির হোম',
        icon: <Home className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />,
      },
      {
        id: 'quran',
        labelBn: 'আল-কুরআন',
        labelEn: 'Al-Quran',
        subBn: '১১৪ সূরা, তাফসীর ও অডিও',
        subEn: '114 Surahs & Tafsir',
        keywords: 'quran surah tafsir mushaf কুরআন সূরা তাফসীর',
        icon: <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-300" />,
      },
      {
        id: 'salat_time',
        labelBn: 'সালাত টাইম',
        labelEn: 'Salat Time',
        subBn: 'নামাজ, সেহরি ও ইফতার সময়',
        subEn: 'Prayer & fasting times',
        keywords: 'salat prayer time sehri iftar সালাত নামাজ সময়',
        icon: <Clock className="w-4 h-4 text-cyan-600 dark:text-cyan-300" />,
      },
      {
        id: 'aamal_tracker',
        labelBn: 'আমল ট্র্যাকার',
        labelEn: 'Aamal Tracker',
        subBn: 'দৈনিক আমল ও রিপোর্ট',
        subEn: 'Daily deeds & reports',
        keywords: 'aamal tracker checklist report আমল রিপোর্ট',
        icon: <ClipboardCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />,
      },
      {
        id: 'namaj',
        labelBn: 'নামাজ শিক্ষা',
        labelEn: 'Namaz Guide',
        subBn: 'নিয়ম, সূরা ও কাজা হিসাব',
        subEn: 'Rules, duas & qaza',
        keywords: 'namaj salah prayer wudu qaza নামাজ ওজু কাজা',
        icon: <Landmark className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />,
      },
      {
        id: 'dua',
        labelBn: 'দোয়া ও জিকির',
        labelEn: 'Duas & Azkar',
        subBn: 'মাসনুন দোয়া ও ফজিলত',
        subEn: 'Masnoon duas & virtues',
        keywords: 'dua azkar dhikr দোয়া মোনাজাত জিকির',
        icon: <Heart className="w-4 h-4 text-rose-500 dark:text-rose-300" />,
      },
      {
        id: 'nobi_24_hours',
        labelBn: 'নবীজির ২৪ ঘণ্টা',
        labelEn: "Prophet's 24 Hours",
        subBn: '১৪ সময় পর্ব ও সুন্নাহ রুটিন',
        subEn: 'Daily Sunnah routine',
        keywords: 'nobi 24 hours sunnah routine নবীজি ২৪ ঘণ্টা সুন্নাহ',
        icon: <Sun className="w-4 h-4 text-amber-600 dark:text-amber-300" />,
      },
      {
        id: 'seerat_un_nabi',
        labelBn: 'সীরাতুন নবী ﷺ',
        labelEn: 'Seerat-un-Nabi ﷺ',
        subBn: '১–৬৩ বছর ও বিশেষ সংকলন',
        subEn: 'Full Seerah & collections',
        keywords: 'seerat nabi biography family 40 hours সীরাত নবীজি বংশতালিকা ইন্তেকাল',
        icon: <ScrollText className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />,
      },
      {
        id: 'hayatus_sahaba',
        labelBn: 'হায়াতুস সাহাবা',
        labelEn: 'Hayatus Sahaba',
        subBn: 'সাহাবিদের জীবনী ও ত্যাগ',
        subEn: 'Lives of Companions',
        keywords: 'sahaba hayatus companions আবু বকর উমর উসমান আলী সাহাবি',
        icon: <Users className="w-4 h-4 text-amber-600 dark:text-amber-300" />,
      },
      {
        id: 'prophets_25',
        labelBn: '২৫ নবী ও রাসূল',
        labelEn: '25 Prophets',
        subBn: 'কুরআনী জীবনী ও মুজিযা',
        subEn: 'Quranic Prophets',
        keywords: 'prophets 25 nobi rasul আদম নূহ ইবরাহীম মুসা ঈসা নবী',
        icon: <BookMarked className="w-4 h-4 text-teal-600 dark:text-teal-300" />,
      },
      {
        id: 'allah_names',
        labelBn: 'আল্লাহর ৯৯ নাম',
        labelEn: '99 Names of Allah',
        subBn: 'আসমাউল হুসনা ও অর্থ',
        subEn: 'Asmaul Husna',
        keywords: 'allah 99 names asmaul husna আল্লাহর নাম আসমাউল হুসনা',
        icon: <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-300" />,
      },
      {
        id: 'tablig',
        labelBn: 'দাওয়াত ও তাবলীগ',
        labelEn: 'Dawah & Tabligh',
        subBn: '৬ সিফাত ও মেহনত গাইড',
        subEn: '6 Numbers & Dawah',
        keywords: 'tablig dawah 6 sifat তাবলীগ দাওয়াত সিফাত',
        icon: <Users className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />,
      },
      {
        id: 'hadith',
        labelBn: 'হাদিস শরিফ',
        labelEn: 'Hadith Sharif',
        subBn: 'সিহাহ সিত্তাহ ও বাছাই হাদিস',
        subEn: 'Authentic Hadith collections',
        keywords: 'hadith bukhari muslim তিরমিজি বুখারী মুসলিম হাদিস',
        icon: <BookOpen className="w-4 h-4 text-indigo-600 dark:text-indigo-300" />,
      },
      {
        id: 'kitab',
        labelBn: 'ইসলামিক কিতাব',
        labelEn: 'Islamic Kitab',
        subBn: 'সংক্ষিপ্ত গ্রন্থ ও পাঠাগার',
        subEn: 'Islamic library books',
        keywords: 'kitab book library কিতাব বই',
        icon: <BookMarked className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />,
      },
      {
        id: 'islamic_history_wars',
        labelBn: 'ইসলামের যুদ্ধসমূহ',
        labelEn: 'Islamic Wars',
        subBn: 'বদর, উহুদ, খন্দক ও ইতিহাস',
        subEn: 'Battles & expeditions',
        keywords: 'wars battles badr uhud khandaq বদর উহুদ খন্দক যুদ্ধ',
        icon: <Swords className="w-4 h-4 text-rose-600 dark:text-rose-300" />,
      },
      {
        id: 'history_timeline',
        labelBn: 'ইতিহাসের মানচিত্র',
        labelEn: 'History Timeline',
        subBn: '৫৭০–২০২৬ ঐতিহাসিক ম্যাপ',
        subEn: 'Timeline & map',
        keywords: 'history timeline map ইতিহাস মানচিত্র',
        icon: <Compass className="w-4 h-4 text-amber-600 dark:text-amber-300" />,
      },
      {
        id: 'araber_gotro',
        labelBn: 'আরবের গোত্র',
        labelEn: 'Arab Tribes',
        subBn: '৪০ গোত্র ও বিশিষ্ট ব্যক্তিত্ব',
        subEn: 'Tribes & genealogy',
        keywords: 'arab tribes quraish gotro আরবের গোত্র কুরাইশ বংশ',
        icon: <Shield className="w-4 h-4 text-amber-700 dark:text-amber-300" />,
      },
      {
        id: 'arabian_map',
        labelBn: 'আরবের সচিত্র মানচিত্র',
        labelEn: 'Arabia Pictorial Map',
        subBn: 'মক্কা-মদিনা ও ঐতিহাসিক স্থান',
        subEn: 'Illustrated Arabian map',
        keywords: 'arabia pictorial map makkah madinah আরব মানচিত্র',
        icon: <MapPin className="w-4 h-4 text-teal-600 dark:text-teal-300" />,
      },
      {
        id: 'hajj_checklist',
        labelBn: 'হজ ও ওমরাহ',
        labelEn: 'Hajj & Umrah',
        subBn: 'তাওয়াফ, সাঈ ও চেকলিস্ট',
        subEn: 'Tawaf, Sai & checklist',
        keywords: 'hajj umrah tawaf sai miqat হজ ওমরাহ তাওয়াফ',
        icon: <Compass className="w-4 h-4 text-teal-600 dark:text-teal-300" />,
      },
      {
        id: 'saved',
        labelBn: 'সংরক্ষিত লাইব্রেরি',
        labelEn: 'Saved Library',
        subBn: 'বুকমার্ক, হাইলাইট ও নোট',
        subEn: 'Bookmarks & notes',
        keywords: 'saved bookmark highlight note সংরক্ষিত বুকমার্ক নোট',
        icon: <Bookmark className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />,
      },
      {
        id: 'my_account',
        labelBn: 'আমার অ্যাকাউন্ট',
        labelEn: 'My Account',
        subBn: 'প্রোফাইল, থিম ও ক্লাউড সিঙ্ক',
        subEn: 'Profile, theme & sync',
        keywords: 'account profile settings cloud theme অ্যাকাউন্ট প্রোফাইল সেটিংস',
        icon: <User className="w-4 h-4 text-emerald-600 dark:text-emerald-300" />,
      },
    ],
    []
  );

  const filteredPages = useMemo(() => {
    const q = pageSearch.trim().toLowerCase();
    if (!q) return allPages;
    return allPages.filter(
      (p) =>
        p.labelBn.toLowerCase().includes(q) ||
        p.labelEn.toLowerCase().includes(q) ||
        p.subBn.toLowerCase().includes(q) ||
        p.subEn.toLowerCase().includes(q) ||
        p.keywords.toLowerCase().includes(q)
    );
  }, [allPages, pageSearch]);

  const currentPageLabel = useMemo(() => {
    if (activeResolvedPageId === 'hub' || activeResolvedPageId === 'other') {
      return isBn ? 'সব ফিচার হোম' : 'All Features Hub';
    }
    const found = allPages.find((p) => p.id === activeResolvedPageId);
    if (found) return isBn ? found.labelBn : found.labelEn;
    return isBn ? 'Zikr+ পেজ' : 'Zikr+ Page';
  }, [activeResolvedPageId, allPages, isBn]);

  const primaryItems = [
    {
      id: 'zikir_counter' as NavModule,
      label: isBn ? 'জিকির' : NAV_TRANSLATIONS.zikir_counter[selectedLanguage] || 'Zikr',
      icon: (isActive: boolean) => (
        <Home
          className={`w-5 h-5 sm:w-[22px] sm:h-[22px] transition-all duration-200 ${
            isActive
              ? 'fill-[var(--app-primary,#006A4E)] text-[var(--app-primary,#006A4E)] stroke-[2.2]'
              : 'text-gray-500 dark:text-gray-400 stroke-[1.8]'
          }`}
        />
      ),
      badge: counterBadge && counterBadge > 0 ? counterBadge : undefined,
      isActive: activeModule === 'zikir_counter',
    },
    {
      id: 'quran' as NavModule,
      label: isBn ? 'কুরআন' : NAV_TRANSLATIONS.quran[selectedLanguage] || 'Quran',
      icon: (isActive: boolean) => (
        <BookOpen
          className={`w-5 h-5 sm:w-[22px] sm:h-[22px] transition-all duration-200 ${
            isActive
              ? 'text-[var(--app-primary,#006A4E)] stroke-[2.4]'
              : 'text-gray-500 dark:text-gray-400 stroke-[1.8]'
          }`}
        />
      ),
      isActive: activeModule === 'quran',
    },
    {
      id: 'salat_time' as NavModule,
      label: isBn ? 'সালাত' : NAV_TRANSLATIONS.salat_time[selectedLanguage] || 'Salat',
      icon: (isActive: boolean) => (
        <Clock
          className={`w-5 h-5 sm:w-[22px] sm:h-[22px] transition-all duration-200 ${
            isActive
              ? 'text-[var(--app-primary,#006A4E)] stroke-[2.4]'
              : 'text-gray-500 dark:text-gray-400 stroke-[1.8]'
          }`}
        />
      ),
      isActive: activeModule === 'salat_time',
    },
    {
      id: 'aamal_tracker' as NavModule,
      label: isBn ? 'আমল' : NAV_TRANSLATIONS.aamal_tracker[selectedLanguage] || 'Aamal',
      icon: (isActive: boolean) => (
        <ClipboardCheck
          className={`w-5 h-5 sm:w-[22px] sm:h-[22px] transition-all duration-200 ${
            isActive
              ? 'text-[var(--app-primary,#006A4E)] stroke-[2.4]'
              : 'text-gray-500 dark:text-gray-400 stroke-[1.8]'
          }`}
        />
      ),
      isActive: activeModule === 'aamal_tracker',
    },
  ];

  const navContent = (
    <>
      {/* Floating Add Zikr Button (Only on Zikr Counter tab) */}
      {activeModule === 'zikir_counter' && onOpenAddModal && (
        <button
          type="button"
          onClick={onOpenAddModal}
          className="fixed bottom-[74px] right-4 sm:right-8 z-[64] w-13 h-13 sm:w-14 sm:h-14 rounded-2xl active:scale-95 text-white shadow-2xl flex items-center justify-center transition-all cursor-pointer bg-[var(--app-primary,#006A4E)] hover:bg-[var(--app-primary-dark,#005439)] border border-white/25"
          aria-label="Add New Zikr"
          title="Add New Custom Zikr"
        >
          <Plus className="w-7 h-7 stroke-[3]" />
        </button>
      )}

      {/* Universal Bottom Dock across ALL pages, sub-pages & reading views */}
      <nav
        aria-label={isBn ? 'মূল ও দ্রুত পেজ নেভিগেশন' : 'Main & Quick Page Navigation'}
        className={`fixed bottom-0 left-0 right-0 z-[65] transition-colors duration-200 border-t ${
          isDay
            ? 'bg-white/95 backdrop-blur-md border-[var(--app-border,#e2e8f0)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]'
            : 'bg-[#0b1e22]/95 backdrop-blur-md border-[#14373e] shadow-[0_-6px_24px_rgba(0,0,0,0.45)]'
        }`}
      >
        <div className="max-w-2xl mx-auto grid grid-cols-6 items-center px-1 pt-1 pb-1.5 pb-safe select-none">
          {primaryItems.map((item) => {
            const isActive = item.isActive;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateToPage(item.id)}
                className={`min-h-[46px] flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer relative ${
                  isActive
                    ? 'text-[var(--app-primary,#006A4E)] dark:text-emerald-400 font-bold'
                    : isDay
                    ? 'text-gray-500 hover:text-gray-800 font-medium'
                    : 'text-gray-400 hover:text-gray-100 font-medium'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  {item.icon(isActive)}
                  {item.badge !== undefined && (
                    <span className="absolute -top-1.5 -right-3 text-[9px] min-w-[16px] h-4 px-1 rounded-full font-mono font-bold flex items-center justify-center bg-[var(--app-primary,#006A4E)] text-white shadow-xs">
                      {item.badge > 999 ? '999+' : item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10.5px] sm:text-xs mt-1 leading-none tracking-tight text-center whitespace-nowrap truncate max-w-full px-0.5 ${
                    isActive
                      ? 'text-[var(--app-primary,#006A4E)] dark:text-emerald-400 font-bold'
                      : isDay
                      ? 'text-gray-600'
                      : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* 5. AI Knowledge Assistant Button (Always accessible at bottom on every page) */}
          <button
            type="button"
            onClick={() => {
              if (soundEnabled) soundHaptics.playTap();
              onOpenAssistant?.();
            }}
            className={`min-h-[46px] flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer relative ${
              isDay
                ? 'text-emerald-700 hover:bg-emerald-50/90 font-bold'
                : 'text-amber-300 hover:bg-emerald-950/60 font-bold'
            }`}
            title={isBn ? 'Zikr+ AI তথ্য সহায়ক খুলুন' : 'Open Zikr+ AI Assistant'}
          >
            <div
              className={`w-6 h-5 rounded-lg flex items-center justify-center ${
                isDay
                  ? 'bg-emerald-100/90 text-emerald-700'
                  : 'bg-amber-400/15 text-amber-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <span className="text-[10.5px] sm:text-xs mt-1 leading-none tracking-tight text-center whitespace-nowrap truncate max-w-full px-0.5 font-bold">
              {isBn ? 'AI তথ্য' : 'AI Info'}
            </span>
          </button>

          {/* 6. Universal Quick Page Switcher Trigger ("সব পেজ") */}
          <button
            type="button"
            onClick={() => {
              if (soundEnabled) soundHaptics.playTap();
              setIsQuickMenuOpen((prev) => !prev);
            }}
            aria-expanded={isQuickMenuOpen}
            className={`min-h-[46px] flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer relative ${
              isOtherActive || isQuickMenuOpen
                ? 'text-[var(--app-primary,#006A4E)] dark:text-emerald-400 font-bold'
                : isDay
                ? 'text-gray-500 hover:text-gray-800 font-medium'
                : 'text-gray-400 hover:text-gray-100 font-medium'
            }`}
            title={isBn ? 'যেকোনো পেজে দ্রুত যান' : 'Switch to any page'}
          >
            <div className="relative flex items-center justify-center">
              <LayoutGrid
                className={`w-5 h-5 sm:w-[22px] sm:h-[22px] transition-all duration-200 ${
                  isOtherActive || isQuickMenuOpen
                    ? 'text-[var(--app-primary,#006A4E)] dark:text-emerald-400 stroke-[2.4]'
                    : 'text-gray-500 dark:text-gray-400 stroke-[1.9]'
                }`}
              />
            </div>
            <span
              className={`text-[10.5px] sm:text-xs mt-1 leading-none tracking-tight text-center whitespace-nowrap truncate max-w-full px-0.5 ${
                isOtherActive || isQuickMenuOpen
                  ? 'text-[var(--app-primary,#006A4E)] dark:text-emerald-400 font-bold'
                  : isDay
                  ? 'text-gray-600'
                  : 'text-gray-400'
              }`}
            >
              {isBn ? 'সব পেজ' : 'All Pages'}
            </span>
          </button>
        </div>
      </nav>

      {/* Universal Bottom Quick Page Switcher Sheet */}
      {isQuickMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={isBn ? 'দ্রুত পেজ পরিবর্তন মেনু' : 'Quick Page Switcher'}
          onClick={() => setIsQuickMenuOpen(false)}
          className="fixed inset-0 z-[70] bg-black/65 backdrop-blur-xs flex items-end sm:items-center justify-center sm:p-4 animate-in fade-in duration-150"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full max-w-2xl rounded-t-3xl sm:rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[84dvh] animate-in slide-in-from-bottom-4 duration-200 ${
              isDay
                ? 'bg-white border-emerald-200/90 text-slate-900'
                : 'bg-[#071a1f] border-emerald-800/80 text-emerald-50'
            }`}
          >
            {/* Mobile Drag Handle */}
            <div className="flex justify-center pt-2.5 pb-1 sm:hidden shrink-0">
              <div
                className={`w-10 h-1 rounded-full ${
                  isDay ? 'bg-slate-300' : 'bg-emerald-800'
                }`}
              />
            </div>

            {/* Sheet Header */}
            <div
              className={`px-4 py-3 border-b flex items-center justify-between gap-2 shrink-0 ${
                isDay ? 'border-slate-100 bg-emerald-50/45' : 'border-emerald-900/70 bg-[#051418]'
              }`}
            >
              <div className="min-w-0">
                <h2 className="text-sm sm:text-base font-black truncate">
                  {isBn ? 'সব পেজ ও দ্রুত নেভিগেশন' : 'All Pages & Quick Switcher'}
                </h2>
                <p
                  className={`text-[11px] font-semibold truncate ${
                    isDay ? 'text-emerald-800/80' : 'text-emerald-300/80'
                  }`}
                >
                  {isBn ? `বর্তমান পেজ: ${currentPageLabel}` : `Current: ${currentPageLabel}`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickMenuOpen(false)}
                aria-label={isBn ? 'বন্ধ করুন' : 'Close'}
                className={`w-10 h-10 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center transition cursor-pointer shrink-0 ${
                  isDay
                    ? 'hover:bg-slate-200/70 text-slate-600'
                    : 'hover:bg-emerald-900/60 text-emerald-200'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Action Strip + Search */}
            <div
              className={`px-3.5 pt-3 pb-2.5 space-y-2.5 border-b shrink-0 ${
                isDay ? 'border-slate-100' : 'border-emerald-900/60'
              }`}
            >
              {/* Single-row Back / Hub / AI Helper Actions */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={handleGoBackFromSheet}
                  className={`min-h-[44px] px-2.5 py-2 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-1.5 whitespace-nowrap transition active:scale-95 cursor-pointer ${
                    isDay
                      ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                      : 'bg-[#0a2329] hover:bg-[#0f3139] border-emerald-800/70 text-emerald-100'
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{isBn ? 'আগের পেজ' : 'Go Back'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleOpenPageFromSheet('other')}
                  className={`min-h-[44px] px-2.5 py-2 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-1.5 whitespace-nowrap transition active:scale-95 cursor-pointer ${
                    activeResolvedPageId === 'hub' || activeResolvedPageId === 'other'
                      ? 'bg-[var(--app-primary,#006A4E)] text-white border-transparent shadow-sm'
                      : isDay
                      ? 'bg-emerald-50/70 hover:bg-emerald-100 border-emerald-200 text-emerald-900'
                      : 'bg-emerald-950/60 hover:bg-emerald-900/60 border-emerald-800 text-emerald-200'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{isBn ? 'সব ফিচার হোম' : 'Features Hub'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleOpenAssistantFromSheet}
                  className={`min-h-[44px] px-2.5 py-2 rounded-xl border text-xs font-extrabold flex items-center justify-center gap-1.5 whitespace-nowrap transition active:scale-95 cursor-pointer ${
                    isDay
                      ? 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-900'
                      : 'bg-amber-500/15 hover:bg-amber-500/25 border-amber-500/35 text-amber-200'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{isBn ? 'AI সহায়ক' : 'AI Helper'}</span>
                </button>
              </div>

              {/* Search Box */}
              <div className="relative">
                <Search
                  className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${
                    isDay ? 'text-slate-400' : 'text-emerald-400/70'
                  }`}
                />
                <input
                  type="text"
                  value={pageSearch}
                  onChange={(e) => setPageSearch(e.target.value)}
                  placeholder={isBn ? 'যেকোনো পেজের নাম লিখে খুঁজুন...' : 'Search any page name...'}
                  className={`w-full pl-9 pr-9 py-2.5 rounded-xl border text-xs sm:text-sm outline-none transition ${
                    isDay
                      ? 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500'
                      : 'bg-[#041216] border-emerald-800/80 text-white placeholder:text-emerald-400/50 focus:border-emerald-500'
                  }`}
                />
                {pageSearch && (
                  <button
                    type="button"
                    onClick={() => setPageSearch('')}
                    aria-label={isBn ? 'মুছুন' : 'Clear'}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable All-Pages Grid */}
            <div className="flex-1 overflow-y-auto p-3.5 pb-6">
              {filteredPages.length === 0 ? (
                <div className="py-10 text-center space-y-2">
                  <p className={`text-xs font-bold ${isDay ? 'text-slate-500' : 'text-emerald-300/70'}`}>
                    {isBn ? 'কোনো পেজ পাওয়া যায়নি' : 'No matching page found'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setPageSearch('')}
                    className="text-xs font-bold text-emerald-600 dark:text-emerald-300 underline cursor-pointer"
                  >
                    {isBn ? 'সব পেজ দেখুন' : 'Show all pages'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {filteredPages.map((page) => {
                    const isCurrent = activeResolvedPageId === page.id;
                    return (
                      <button
                        key={page.id}
                        type="button"
                        onClick={() => handleOpenPageFromSheet(page.id)}
                        className={`min-h-[56px] p-2.5 rounded-2xl border text-left transition-all active:scale-[0.98] cursor-pointer flex items-center gap-2.5 ${
                          isCurrent
                            ? isDay
                              ? 'bg-emerald-50 border-emerald-500 ring-1 ring-emerald-500/40 shadow-xs'
                              : 'bg-emerald-900/55 border-emerald-400 ring-1 ring-emerald-400/40'
                            : isDay
                            ? 'bg-white hover:bg-emerald-50/50 border-slate-200/90 hover:border-emerald-300'
                            : 'bg-[#0b2329] hover:bg-[#103038] border-emerald-900/70 hover:border-emerald-600/60'
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isCurrent
                              ? isDay
                                ? 'bg-emerald-100'
                                : 'bg-emerald-800/80'
                              : isDay
                              ? 'bg-slate-100/90'
                              : 'bg-[#06161a]'
                          }`}
                        >
                          {page.icon}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span
                              className={`text-xs font-extrabold truncate ${
                                isCurrent
                                  ? isDay
                                    ? 'text-emerald-900'
                                    : 'text-emerald-200'
                                  : isDay
                                  ? 'text-slate-900'
                                  : 'text-white'
                              }`}
                            >
                              {isBn ? page.labelBn : page.labelEn}
                            </span>
                            {isCurrent && (
                              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-300 shrink-0" />
                            )}
                          </div>
                          <p
                            className={`text-[10.5px] truncate mt-0.5 ${
                              isDay ? 'text-slate-500' : 'text-emerald-300/65'
                            }`}
                          >
                            {isBn ? page.subBn : page.subEn}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );

  if (typeof document !== 'undefined') {
    return createPortal(navContent, document.body);
  }
  return navContent;
};

