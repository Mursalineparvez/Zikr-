import React, { useState, useEffect } from 'react';
import { ThemeMode, ZikrLanguage, ZikrItem, DuaItem, AppSettings } from '../types';
import {
  Heart,
  BookMarked,
  Users,
  Sparkles,
  Layers,
  ChevronRight,
  Settings,
  Compass,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { NAV_TRANSLATIONS, OTHER_HUB_UI, SETTINGS_UI } from '../utils/appTranslations';
import { prefetchView } from '../utils/viewPreloader';

// Code-split sub-views to keep initial app bundle small and startup instantaneous
const DuaView = React.lazy(() => import('./DuaView').then((m) => ({ default: m.DuaView })));
const HadithView = React.lazy(() => import('./HadithView').then((m) => ({ default: m.HadithView })));
const KitabView = React.lazy(() => import('./KitabView').then((m) => ({ default: m.KitabView })));
const DailyTabligView = React.lazy(() => import('./DailyTabligView').then((m) => ({ default: m.DailyTabligView })));
const AllahNamesView = React.lazy(() => import('./AllahNamesView').then((m) => ({ default: m.AllahNamesView })));
const HajjUmrahView = React.lazy(() => import('./HajjUmrahView').then((m) => ({ default: m.HajjUmrahView })));
const HistoryTimelineView = React.lazy(() => import('./HistoryTimelineView').then((m) => ({ default: m.HistoryTimelineView })));
const SettingsView = React.lazy(() => import('./SettingsView').then((m) => ({ default: m.SettingsView })));
const ArabianIllustratedMapView = React.lazy(() => import('./ArabianIllustratedMapView').then((m) => ({ default: m.ArabianIllustratedMapView })));
const IslamicHistoryWarsView = React.lazy(() => import('./IslamicHistoryWarsView').then((m) => ({ default: m.IslamicHistoryWarsView })));
const HayatusSahabaView = React.lazy(() => import('./HayatusSahabaView').then((m) => ({ default: m.HayatusSahabaView })));
const SeeratUnNabiView = React.lazy(() => import('./SeeratUnNabiView').then((m) => ({ default: m.SeeratUnNabiView })));
const AraberGotroByaktittoView = React.lazy(() => import('./AraberGotroByaktittoView').then((m) => ({ default: m.AraberGotroByaktittoView })));

const SubViewFallback: React.FC<{ isDay: boolean }> = ({ isDay }) => (
  <div className="flex flex-col items-center justify-center min-h-[320px] py-16 space-y-3">
    <div className={`w-8 h-8 border-3 rounded-full animate-spin ${
      isDay ? 'border-teal-600/30 border-t-teal-600' : 'border-emerald-500/30 border-t-emerald-400'
    }`} />
    <span className={`text-xs font-bold animate-pulse ${
      isDay ? 'text-teal-800' : 'text-emerald-400'
    }`}>
      লোড হচ্ছে...
    </span>
  </div>
);

export type OtherSubSection =
  | 'hub'
  | 'seerat_un_nabi'
  | 'hayatus_sahaba'
  | 'islamic_history_wars'
  | 'arabian_map'
  | 'arober_gotro'
  | 'dua'
  | 'hadith'
  | 'kitab'
  | 'history_timeline'
  | 'hajj_checklist'
  | 'umrah_guide'
  | 'hajj_route_map'
  | 'hajj_essentials'
  | 'tablig'
  | 'allah_names'
  | 'settings';

interface OtherIslamicHubViewProps {
  onAddDuaToCounters: (dua: DuaItem) => void;
  activeCounters: ZikrItem[];
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  initialSubSection?: OtherSubSection;
  onSelectLanguage?: (lang: ZikrLanguage) => void;
  settings?: AppSettings;
  onUpdateSettings?: (newSettings: Partial<AppSettings>) => void;
  onGlobalReset?: () => void;
  onRestoreDefaults?: () => void;
  onExportPdf?: () => void;
  onExportBackupJson?: () => void;
  onImportBackupJson?: (file: File) => void;
  onOpenSettingsModal?: () => void;
  onNavigateToQuran?: () => void;
  onNavigateToNamaj?: () => void;
}

export const OtherIslamicHubView: React.FC<OtherIslamicHubViewProps> = ({
  onAddDuaToCounters,
  activeCounters,
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
  initialSubSection = 'hub',
  onSelectLanguage,
  settings,
  onUpdateSettings,
  onGlobalReset,
  onRestoreDefaults,
  onExportPdf,
  onExportBackupJson,
  onImportBackupJson,
  onOpenSettingsModal,
  onNavigateToQuran,
  onNavigateToNamaj,
}) => {
  const isDay = themeMode === 'day';
  const [activeSub, setActiveSub] = useState<OtherSubSection>(initialSubSection);

  // Sync activeSub state with initialSubSection prop changes
  useEffect(() => {
    if (initialSubSection) {
      setActiveSub(initialSubSection);
    }
  }, [initialSubSection]);

  // Auto-scroll to top whenever switching sub-module
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeSub]);

  const hubItems = [
    ...(onNavigateToNamaj
      ? [
          {
            id: 'namaj' as any,
            title: selectedLanguage === 'bn' ? 'নামাজ শিক্ষা ও পূর্ণাঙ্গ গাইড' : 'Namaz Guide & Rules',
            arabic: 'تعليم الصلاة والأحكام',
            desc: selectedLanguage === 'bn'
              ? '৫ ওয়াক্ত ফরজ ও নফল নামাজের নিয়ম, ১০টি ধারাবাহিক ধাপ, সকল বৈঠকের দোয়া ও কাজা ক্যালকুলেটর'
              : 'Complete prayer rules, 5 daily fard/nafl rakats, step-by-step procedure and qaza counter.',
            icon: <span className="text-2xl">🕌</span>,
            color: 'from-emerald-700/30 via-teal-600/20 to-emerald-500/10 border-emerald-500/50',
            badge: selectedLanguage === 'bn' ? 'নামাজ শিক্ষা' : 'Prayer Guide',
            action: onNavigateToNamaj,
          },
        ]
      : []),
    {
      id: 'seerat_un_nabi' as OtherSubSection,
      title: NAV_TRANSLATIONS.seerat_un_nabi[selectedLanguage] || 'সিরাতুন নবী (সা.)',
      arabic: 'سيرة رسول الله ﷺ',
      desc: selectedLanguage === 'bn'
        ? 'রাসূলুল্লাহ ﷺ-এর জন্ম থেকে ওফাত পর্যন্ত ১ থেকে ৬৩ বছর বয়সের প্রতি বছরের পূর্ণাঙ্গ ধারাবাহিক ঘটনাপ্রবাহ, হৃদয়স্পর্শী ইতিহাস, সূচিপত্র ও মূল শিক্ষা'
        : 'Complete chronological year-by-year life journey of Prophet Muhammad ﷺ from Year 1 to 63 with Table of Contents and enduring lessons.',
      icon: <span className="text-2xl">🌱</span>,
      color: 'from-emerald-600/25 via-teal-500/15 to-amber-500/10 border-emerald-500/40',
      badge: selectedLanguage === 'bn' ? '১–৬৩ বছর সূচিপত্র' : 'Ages 1-63 TOC',
    },
    {
      id: 'hayatus_sahaba' as OtherSubSection,
      title: selectedLanguage === 'bn' ? 'হায়াতুস সাহাবা (Hayatus Sahaba)' : 'Hayatus Sahaba',
      arabic: 'حياة الصحابة رضي الله عنهم',
      desc: selectedLanguage === 'bn' ? 'মর্যাদা ও জনপ্রিয়তার ক্রমানুসারে ১০৭+ জন সাহাবির ইসলাম গ্রহণ, হৃদয়স্পর্শী ইতিহাস, আত্মত্যাগ ও সহিহ হাদিসের দলিল' : 'Ranked biographical accounts of 107+ prominent Sahaba, their sacrifices, emotional stories and authentic hadith citations.',
      icon: <span className="text-2xl">📜</span>,
      color: 'from-emerald-500/20 via-amber-500/15 to-teal-500/10 border-emerald-500/40',
      badge: selectedLanguage === 'bn' ? '১০৭+ সাহাবি' : '107+ Sahaba',
    },
    {
      id: 'arober_gotro' as OtherSubSection,
      title: selectedLanguage === 'bn' ? 'আরবের গোত্র ও ব্যক্তিত্ব' : 'Arab Tribes & Personalities',
      arabic: 'قبائل وشخصيات العرب',
      desc: selectedLanguage === 'bn'
        ? 'মক্কা, মদিনা ও সমগ্র আরবের ৪০টি ঐতিহাসিক গোত্রের বংশপরিচয়, পবিত্র কাবার দায়িত্ব বণ্টন, বংশধারা ও বিশিষ্ট ব্যক্তিবর্গের পূর্ণাঙ্গ সংকলন'
        : 'Complete study of Arabian tribes, Makkah & Madinah clans, official duties, genealogy trees, and all 40 clans with Sahaba & citations.',
      icon: <span className="text-2xl">🛡️</span>,
      color: 'from-amber-600/25 via-emerald-600/20 to-teal-500/10 border-amber-500/40',
      badge: selectedLanguage === 'bn' ? 'বিষয়ভিত্তিক সূচিপত্র' : 'Topic-Wise Index',
    },
    {
      id: 'islamic_history_wars' as OtherSubSection,
      title: selectedLanguage === 'bn' ? 'ইসলামের ইতিহাসের যুদ্ধ' : 'Islamic History Wars',
      arabic: 'حروب التاريخ الإسلامي',
      desc: selectedLanguage === 'bn' ? 'বইয়ের সূচিপত্র অনুযায়ী নববি যুগ, খিলাফতে রাশিদা, উমাইয়া, আব্বাসি ও আন্দালুসের ঐতিহাসিক যুদ্ধসমূহ' : 'Comprehensive battles from the Prophet\'s era to modern times categorized by era.',
      icon: <span className="text-2xl">⚔️</span>,
      color: 'from-amber-500/20 via-rose-500/15 to-emerald-500/10 border-amber-500/40',
      badge: selectedLanguage === 'bn' ? 'বইয়ের সূচিপত্র' : 'Battles',
    },
    {
      id: 'history_timeline' as OtherSubSection,
      title: NAV_TRANSLATIONS.history_timeline[selectedLanguage] || 'ইতিহাসের পাতা',
      arabic: 'خريطة التاريخ الإسلامي',
      desc: selectedLanguage === 'bn' ? '৫৭০ খ্রি. থেকে ২০২৬ খ্রি. পর্যন্ত সকল ঐতিহাসিক ঘটনা, অবস্থান ও ইন্টারঅ্যাক্টিভ মানচিত্র' : 'Interactive history map & events from 570 AD to 2026 AD.',
      icon: <Compass className="w-6 h-6 text-amber-400 animate-pulse" />,
      color: 'from-amber-500/15 to-emerald-500/10 border-amber-500/30',
      badge: selectedLanguage === 'bn' ? 'ইন্টারেক্টিভ ম্যাপ' : 'History Map',
    },
    {
      id: 'arabian_map' as OtherSubSection,
      title: selectedLanguage === 'bn' ? 'পবিত্র ভূমি ও মধ্যপ্রাচ্যের সচিত্র মানচিত্র' : 'Pictorial Map of Holy Lands',
      arabic: 'خريطة الأماكن المقدسة المصورة',
      desc: selectedLanguage === 'bn'
        ? 'ঐতিহ্যবাহী ভিন্টেজ কার্টোগ্রাফিক শৈলীতে সৌদি আরব, পবিত্র মক্কা-মদিনা, ৫টি মিকাত, লোহিত সাগরের পালতোলা জাহাজ ও হজ রুট'
        : 'Vintage cartographic illustrated map of Saudi Arabia, Makkah, Madinah, 5 Miqats, Red Sea dhows & Hajj routes.',
      icon: <span className="text-2xl">🗺️</span>,
      color: 'from-amber-600/25 via-amber-500/15 to-emerald-500/10 border-amber-500/40',
      badge: selectedLanguage === 'bn' ? 'সচিত্র মানচিত্র' : 'Pictorial Map',
    },
    {
      id: 'dua' as OtherSubSection,
      title: NAV_TRANSLATIONS.dua[selectedLanguage],
      arabic: 'الأدعية المأثورة',
      desc: OTHER_HUB_UI.duaDesc[selectedLanguage],
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      color: 'from-rose-500/15 to-pink-500/10 border-rose-500/30',
      badge: OTHER_HUB_UI.badgeDua[selectedLanguage],
    },
    {
      id: 'hajj_checklist' as OtherSubSection,
      title: NAV_TRANSLATIONS.hajj_checklist[selectedLanguage],
      arabic: 'دليل الحج والعمرة',
      desc: selectedLanguage === 'bn' ? '৩ডি লাইভ অ্যানিমেটেড তাওয়াফ/সাঈ সিমুলেশন, প্রস্তুতকারী চেকলিস্ট, ৫ দিনের হজ ম্যাপ ও মিকাত গাইড' : '3D live animated Tawaf/Sa\'i simulation, preparation checklist, 5 days route map & Miqat guide.',
      icon: <span className="text-2xl">🕋</span>,
      color: 'from-teal-500/15 to-amber-500/10 border-teal-500/30',
      badge: selectedLanguage === 'bn' ? 'কমপ্লিট গাইড' : 'Full Guide',
    },
    {
      id: 'tablig' as OtherSubSection,
      title: NAV_TRANSLATIONS.tablig[selectedLanguage],
      arabic: 'الدعوة والتبليغ',
      desc: OTHER_HUB_UI.tabligDesc[selectedLanguage],
      icon: <Users className="w-6 h-6 text-emerald-500" />,
      color: 'from-emerald-500/15 to-teal-500/10 border-emerald-500/30',
      badge: OTHER_HUB_UI.badgeTablig[selectedLanguage],
    },
    {
      id: 'allah_names' as OtherSubSection,
      title: NAV_TRANSLATIONS.allah_names[selectedLanguage],
      arabic: 'أسماء الله الحسنى',
      desc: OTHER_HUB_UI.allahNamesDesc[selectedLanguage],
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      color: 'from-amber-500/15 to-orange-500/10 border-amber-500/30',
      badge: OTHER_HUB_UI.badgeAllahNames[selectedLanguage],
    },
    {
      id: 'settings' as OtherSubSection,
      title: selectedLanguage === 'bn' ? 'সেটিংস ও ভয়েস' : (SETTINGS_UI.title[selectedLanguage] || 'Settings & Voice'),
      arabic: 'الإعدادات واللغة',
      desc: selectedLanguage === 'bn' ? 'তেলাওয়াত কণ্ঠ (পুরুষ/নারী), অ্যাপের ভাষা, থিম এবং ব্যাকআপ' : 'Voice recitation (Male/Female), app language, themes, and backups.',
      icon: <Settings className="w-6 h-6 text-emerald-400" />,
      color: 'from-emerald-500/15 to-teal-500/10 border-emerald-500/30',
      badge: selectedLanguage === 'bn' ? 'ভয়েস ও সেটিংস' : 'Voice & Settings',
    },
  ];

  const [, startSubTransition] = React.useTransition();

  const handleSelectSub = (sub: OtherSubSection, skipPushState = false) => {
    if (sub === activeSub) return;
    if (soundEnabled) soundHaptics.playTap();
    if (!skipPushState) {
      try {
        window.history.pushState({ appModule: 'other', appSub: sub }, '');
      } catch {}
    }
    startSubTransition(() => {
      setActiveSub(sub);
    });
  };

  useEffect(() => {
    const handleSubPopState = (event: PopStateEvent) => {
      const state = event.state;
      if (state && state.appModule === 'other') {
        const targetSub = state.appSub || 'hub';
        startSubTransition(() => {
          setActiveSub(targetSub);
        });
      } else if (state && state.appModule) {
        // Main App.tsx handles top-level module switching
      } else {
        startSubTransition(() => {
          setActiveSub('hub');
        });
      }
    };

    window.addEventListener('popstate', handleSubPopState);
    return () => {
      window.removeEventListener('popstate', handleSubPopState);
    };
  }, []);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Category Switcher Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => handleSelectSub('hub')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'hub'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{OTHER_HUB_UI.allFeatures[selectedLanguage]}</span>
        </button>

        <button
          onPointerEnter={() => prefetchView('seerat_un_nabi')}
          onTouchStart={() => prefetchView('seerat_un_nabi')}
          onClick={() => handleSelectSub('seerat_un_nabi')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'seerat_un_nabi'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <span>🌱</span>
          <span>{NAV_TRANSLATIONS.seerat_un_nabi[selectedLanguage] || 'সিরাতুন নবী (সা.)'}</span>
        </button>

        <button
          onPointerEnter={() => prefetchView('hayatus_sahaba')}
          onTouchStart={() => prefetchView('hayatus_sahaba')}
          onClick={() => handleSelectSub('hayatus_sahaba')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'hayatus_sahaba'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <span>📜</span>
          <span>{selectedLanguage === 'bn' ? 'হায়াতুস সাহাবা' : (selectedLanguage === 'ar' ? 'حياة الصحابة' : (selectedLanguage === 'ur' ? 'حیات الصحابہ' : 'Sahaba'))}</span>
        </button>

        <button
          onPointerEnter={() => prefetchView('arober_gotro')}
          onTouchStart={() => prefetchView('arober_gotro')}
          onClick={() => handleSelectSub('arober_gotro')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'arober_gotro'
              ? 'bg-amber-600 text-white border-amber-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <span>🛡️</span>
          <span>{selectedLanguage === 'bn' ? 'আরবের গোত্র ও ব্যক্তিত্ব' : 'Arab Tribes'}</span>
        </button>

        <button
          onPointerEnter={() => prefetchView('islamic_history_wars')}
          onTouchStart={() => prefetchView('islamic_history_wars')}
          onClick={() => handleSelectSub('islamic_history_wars')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'islamic_history_wars'
              ? 'bg-amber-600 text-white border-amber-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <span>⚔️</span>
          <span>{selectedLanguage === 'bn' ? 'ইতিহাসের যুদ্ধ' : (selectedLanguage === 'ar' ? 'معارك التاريخ' : (selectedLanguage === 'ur' ? 'تاریخ کی جنگیں' : 'Wars'))}</span>
        </button>

        <button
          onPointerEnter={() => prefetchView('history_timeline')}
          onTouchStart={() => prefetchView('history_timeline')}
          onClick={() => handleSelectSub('history_timeline')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'history_timeline'
              ? 'bg-amber-600 text-white border-amber-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>{NAV_TRANSLATIONS.history_timeline[selectedLanguage] || 'ইতিহাসের পাতা'}</span>
        </button>

        <button
          onPointerEnter={() => prefetchView('dua')}
          onTouchStart={() => prefetchView('dua')}
          onClick={() => handleSelectSub('dua')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'dua'
              ? 'bg-rose-600 text-white border-rose-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>{NAV_TRANSLATIONS.dua[selectedLanguage]}</span>
        </button>

        <button
          onPointerEnter={() => prefetchView('hajj_checklist')}
          onTouchStart={() => prefetchView('hajj_checklist')}
          onClick={() => handleSelectSub('hajj_checklist')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'hajj_checklist'
              ? 'bg-teal-600 text-white border-teal-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <span>🕋</span>
          <span>{NAV_TRANSLATIONS.hajj_checklist[selectedLanguage]}</span>
        </button>

        <button
          onPointerEnter={() => prefetchView('tablig')}
          onTouchStart={() => prefetchView('tablig')}
          onClick={() => handleSelectSub('tablig')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'tablig'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>{NAV_TRANSLATIONS.tablig[selectedLanguage]}</span>
        </button>

        <button
          onPointerEnter={() => prefetchView('allah_names')}
          onTouchStart={() => prefetchView('allah_names')}
          onClick={() => handleSelectSub('allah_names')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'allah_names'
              ? 'bg-amber-600 text-white border-amber-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{NAV_TRANSLATIONS.allah_names[selectedLanguage]}</span>
        </button>

        <button
          onPointerEnter={() => prefetchView('settings')}
          onTouchStart={() => prefetchView('settings')}
          onClick={() => handleSelectSub('settings')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'settings'
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <Settings className="w-3.5 h-3.5" />
          <span>{selectedLanguage === 'bn' ? 'সেটিংস ও ভয়েস' : (SETTINGS_UI.title[selectedLanguage] || 'Settings & Voice')}</span>
        </button>
      </div>

      {/* Main Content Area */}
      {activeSub === 'hub' && (
        <div className="space-y-5">
          {/* Header Banner */}
          <div
            className={`p-5 sm:p-6 rounded-3xl border shadow-xl ${
              isDay
                ? 'bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 text-white border-teal-600/40'
                : 'bg-gradient-to-r from-[#0c2f35] via-[#12414a] to-[#1a5560] text-white border-[#1a535e]'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-teal-100 text-xs font-semibold mb-2 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>المكتبة والمعرفة الإسلامية • Comprehensive Islamic Suite</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {OTHER_HUB_UI.bannerTitle[selectedLanguage]}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1 max-w-xl">
              {OTHER_HUB_UI.bannerSub[selectedLanguage]}
            </p>
          </div>

          {/* Feature Cards Grid matching user uploaded reference image */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-5">
            {hubItems.map((item) => {
              const actionText =
                item.id === 'seerat_un_nabi' || item.id === 'hayatus_sahaba' || item.id === 'dua' || item.id === 'tablig'
                  ? selectedLanguage === 'bn' ? 'পড়ুন >' : 'Read >'
                  : item.id === 'namaj'
                  ? selectedLanguage === 'bn' ? 'সময় দেখুন >' : 'View >'
                  : item.id === 'settings'
                  ? selectedLanguage === 'bn' ? 'সেট করুন >' : 'Set >'
                  : selectedLanguage === 'bn' ? 'দেখুন >' : 'View >';

              const subText =
                item.id === 'seerat_un_nabi'
                  ? selectedLanguage === 'bn' ? '১ থেকে ৬৩ বছর' : 'Ages 1 to 63'
                  : item.id === 'hayatus_sahaba'
                  ? selectedLanguage === 'bn' ? 'সাহাবি জীবনী' : 'Sahaba Stories'
                  : item.id === 'arober_gotro'
                  ? selectedLanguage === 'bn' ? 'আরবের গোত্র' : 'Arab Clans'
                  : item.id === 'islamic_history_wars'
                  ? selectedLanguage === 'bn' ? 'ঐতিহাসিক যুদ্ধ' : 'Battles'
                  : item.id === 'history_timeline'
                  ? selectedLanguage === 'bn' ? 'ইতিহাসের মানচিত্র' : 'History Map'
                  : item.id === 'arabian_map'
                  ? selectedLanguage === 'bn' ? 'সচিত্র মানচিত্র' : 'Pictorial Map'
                  : item.id === 'dua'
                  ? selectedLanguage === 'bn' ? 'সহিহ দোয়াসমূহ' : 'Authentic Duas'
                  : item.id === 'namaj'
                  ? selectedLanguage === 'bn' ? 'নামাজের সময়' : 'Prayer Rules'
                  : item.id === 'hajj_checklist'
                  ? selectedLanguage === 'bn' ? 'হজ ও ওমরাহ' : 'Hajj & Umrah'
                  : item.id === 'tablig'
                  ? selectedLanguage === 'bn' ? 'দাওয়াত ও আমল' : 'Dawah & Amal'
                  : item.id === 'allah_names'
                  ? selectedLanguage === 'bn' ? '৯৯টি নাম ও জিকির' : '99 Names'
                  : selectedLanguage === 'bn' ? 'অ্যাপ সেটিংস' : 'App Settings';

              return (
                <div
                  key={item.id}
                  onPointerEnter={() => prefetchView(item.id)}
                  onTouchStart={() => prefetchView(item.id)}
                  onClick={() => {
                    if ((item as any).action) {
                      (item as any).action();
                    } else {
                      handleSelectSub(item.id);
                    }
                  }}
                  className={`p-4 sm:p-5 rounded-[26px] border shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col items-center justify-between text-center min-h-[175px] cursor-pointer group ${
                    isDay
                      ? 'bg-white border-slate-200/90 hover:border-emerald-400'
                      : 'bg-[#0a2026] border-[#143b44] hover:border-emerald-500/50'
                  }`}
                >
                  {/* Centered Top Icon */}
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-1.5 transition-transform group-hover:scale-105 shadow-2xs ${
                      isDay ? 'bg-[#f0f7f4] text-[#005a3e]' : 'bg-[#123138] text-emerald-300'
                    }`}
                  >
                    {item.icon}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-0.5 my-auto">
                    <h3
                      className={`text-sm sm:text-base font-black transition-colors ${
                        isDay ? 'text-slate-900 group-hover:text-[#005a3e]' : 'text-white group-hover:text-emerald-400'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className={`text-[11px] font-medium ${isDay ? 'text-slate-400' : 'text-slate-400'}`}>
                      {subText}
                    </p>
                  </div>

                  {/* Bottom Action Pill Button */}
                  <div
                    className={`mt-2.5 px-4 py-1.5 rounded-full border text-xs font-bold flex items-center justify-center gap-1 shadow-2xs transition-all ${
                      isDay
                        ? 'border-slate-200 bg-white group-hover:bg-[#edf7f4] text-[#005a3e]'
                        : 'border-[#1c4750] bg-[#07171c] group-hover:bg-[#102d35] text-emerald-400'
                    }`}
                  >
                    <span>{actionText}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <React.Suspense fallback={<SubViewFallback isDay={isDay} />}>
        {/* Sub-view: Seerat-un-Nabi (PBUH) */}
        {activeSub === 'seerat_un_nabi' && (
          <SeeratUnNabiView
            themeMode={themeMode}
            selectedLanguage={selectedLanguage}
            soundEnabled={soundEnabled}
            onBackToHub={() => setActiveSub('hub')}
          />
        )}

        {/* Sub-view: Hayatus Sahaba */}
        {activeSub === 'hayatus_sahaba' && (
          <HayatusSahabaView
            themeMode={themeMode}
            selectedLanguage={selectedLanguage}
            soundEnabled={soundEnabled}
            onBackToHub={() => setActiveSub('hub')}
          />
        )}

        {/* Sub-view: Islamic History Wars */}
        {activeSub === 'islamic_history_wars' && (
          <IslamicHistoryWarsView
            themeMode={themeMode}
            selectedLanguage={selectedLanguage}
            onBackToHub={() => setActiveSub('hub')}
          />
        )}

        {/* Sub-view: Arabian Illustrated Pictorial Map */}
        {activeSub === 'arabian_map' && (
          <ArabianIllustratedMapView
            themeMode={themeMode}
            selectedLanguage={selectedLanguage}
            soundEnabled={soundEnabled}
          />
        )}

        {/* Sub-view: Araber Gotro O Byaktitto */}
        {activeSub === 'arober_gotro' && (
          <AraberGotroByaktittoView
            themeMode={themeMode}
            selectedLanguage={selectedLanguage}
            soundEnabled={soundEnabled}
            onBack={() => setActiveSub('hub')}
          />
        )}

        {/* Sub-view: History Timeline & Interactive Map */}
        {activeSub === 'history_timeline' && (
          <HistoryTimelineView
            soundEnabled={soundEnabled}
            themeMode={themeMode}
            selectedLanguage={selectedLanguage}
          />
        )}

        {/* Sub-view: Dua */}
        {activeSub === 'dua' && (
          <DuaView
            onAddDuaToCounters={onAddDuaToCounters}
            activeCounters={activeCounters}
            soundEnabled={soundEnabled}
            themeMode={themeMode}
            selectedLanguage={selectedLanguage}
            voiceGender={settings?.voiceGender || 'male'}
          />
        )}

        {/* Sub-view: Hadith */}
        {activeSub === 'hadith' && (
          <HadithView
            soundEnabled={soundEnabled}
            themeMode={themeMode}
            selectedLanguage={selectedLanguage}
          />
        )}

        {/* Sub-view: Kitab */}
        {activeSub === 'kitab' && (
          <KitabView
            themeMode={themeMode}
            selectedLanguage={selectedLanguage}
          />
        )}

        {/* Sub-view: Tablig */}
        {activeSub === 'tablig' && (
          <DailyTabligView
            soundEnabled={soundEnabled}
            themeMode={themeMode}
            selectedLanguage={selectedLanguage}
          />
        )}

        {/* Sub-view: Allah Names */}
        {activeSub === 'allah_names' && (
          <AllahNamesView
            soundEnabled={soundEnabled}
            themeMode={themeMode}
            selectedLanguage={selectedLanguage}
            voiceGender={settings?.voiceGender || 'male'}
          />
        )}

        {/* Sub-view: Hajj & Umrah Checklist */}
        {activeSub === 'hajj_checklist' && (
          <HajjUmrahView
            soundEnabled={soundEnabled}
            themeMode={themeMode}
            selectedLanguage={selectedLanguage}
            voiceGender={settings?.voiceGender || 'male'}
            initialTab="home_journey_hub"
          />
        )}

        {/* Sub-view: Settings & Language */}
        {activeSub === 'settings' && (
          <SettingsView
            settings={
              settings || {
                theme: 'emerald',
                themeMode: themeMode,
                soundEnabled: soundEnabled,
                vibrationEnabled: true,
                screenAwake: false,
                voiceGender: 'male',
              }
            }
            selectedLanguage={selectedLanguage}
            onSelectLanguage={onSelectLanguage}
            onUpdateSettings={onUpdateSettings || (() => {})}
            onGlobalReset={onGlobalReset || (() => {})}
            onRestoreDefaults={onRestoreDefaults || (() => {})}
            onExportPdf={onExportPdf || (() => {})}
            onExportBackupJson={onExportBackupJson || (() => {})}
            onImportBackupJson={onImportBackupJson || (() => {})}
          />
        )}
      </React.Suspense>
    </div>
  );
};
