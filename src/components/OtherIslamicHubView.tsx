import React, { useState, useEffect, useRef } from 'react';
import { ThemeMode, ZikrLanguage, ZikrItem, DuaItem, AppSettings, UserProfile, NavModule, HistorySession } from '../types';
import {
  Heart,
  BookMarked,
  Users,
  Sparkles,
  Layers,
  Compass,
  Bookmark,
  User,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { NAV_TRANSLATIONS, OTHER_HUB_UI } from '../utils/appTranslations';
import { prefetchView } from '../utils/viewPreloader';
import { getAllUnifiedBookmarks, getSavedHighlights, getSavedNotes } from '../utils/savedItems';
import type { CloudZikrState } from '../services/firebase';

// Code-split sub-views to keep initial app bundle small and startup instantaneous
const SavedView = React.lazy(() => import('./SavedView').then((m) => ({ default: m.SavedView })));
const DuaView = React.lazy(() => import('./DuaView').then((m) => ({ default: m.DuaView })));
const HadithView = React.lazy(() => import('./HadithView').then((m) => ({ default: m.HadithView })));
const KitabView = React.lazy(() => import('./KitabView').then((m) => ({ default: m.KitabView })));
const DailyTabligView = React.lazy(() => import('./DailyTabligView').then((m) => ({ default: m.DailyTabligView })));
const AllahNamesView = React.lazy(() => import('./AllahNamesView').then((m) => ({ default: m.AllahNamesView })));
const HajjUmrahView = React.lazy(() => import('./HajjUmrahView').then((m) => ({ default: m.HajjUmrahView })));
const HistoryTimelineView = React.lazy(() => import('./HistoryTimelineView').then((m) => ({ default: m.HistoryTimelineView })));
const ArabianIllustratedMapView = React.lazy(() => import('./ArabianIllustratedMapView').then((m) => ({ default: m.ArabianIllustratedMapView })));
const IslamicHistoryWarsView = React.lazy(() => import('./IslamicHistoryWarsView').then((m) => ({ default: m.IslamicHistoryWarsView })));
const HayatusSahabaView = React.lazy(() => import('./HayatusSahabaView').then((m) => ({ default: m.HayatusSahabaView })));
const SeeratUnNabiView = React.lazy(() => import('./SeeratUnNabiView').then((m) => ({ default: m.SeeratUnNabiView })));
const AraberGotroByaktittoView = React.lazy(() => import('./AraberGotroByaktittoView').then((m) => ({ default: m.AraberGotroByaktittoView })));
const Nobi24HoursView = React.lazy(() => import('./Nobi24HoursView').then((m) => ({ default: m.Nobi24HoursView })));
const ProfileModal = React.lazy(() => import('./ProfileModal').then((m) => ({ default: m.ProfileModal })));

const toBnDigits = (num: number | string) =>
  String(num).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

const SubViewFallback: React.FC<{ isDay: boolean; selectedLanguage?: ZikrLanguage }> = ({ isDay, selectedLanguage = 'bn' }) => (
  <div className="flex flex-col items-center justify-center min-h-[320px] py-16 space-y-3">
    <div className={`w-8 h-8 border-3 rounded-full animate-spin ${
      isDay ? 'border-teal-600/30 border-t-teal-600' : 'border-emerald-500/30 border-t-emerald-400'
    }`} />
    <span className={`text-xs font-bold animate-pulse ${
      isDay ? 'text-teal-800' : 'text-emerald-400'
    }`}>
      {selectedLanguage === 'bn' ? 'লোড হচ্ছে...' : selectedLanguage === 'ar' ? 'جارٍ التحميل...' : 'Loading...'}
    </span>
  </div>
);

export type OtherSubSection =
  | 'hub'
  | 'my_account'
  | 'saved'
  | 'nobi_24_hours'
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
  | 'allah_names';

interface OtherIslamicHubViewProps {
  onAddDuaToCounters: (dua: DuaItem) => void;
  activeCounters: ZikrItem[];
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  initialSubSection?: OtherSubSection;
  subSectionSyncKey?: number;
  initialAccountTab?: 'profile' | 'settings';
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
  userProfile?: UserProfile;
  onUpdateProfile?: (updated: UserProfile) => void;
  onNavigateModule?: (module: NavModule) => void;
  onToggleThemeMode?: () => void;
  onToggleSound?: () => void;
  onToggleVibration?: () => void;
  onResetAllCounters?: () => void;
  onOpenStandaloneModal?: () => void;
  onCloudDataLoaded?: (data: CloudZikrState, targetEmailOrPhone?: string) => void;
  onTriggerCloudSync?: () => Promise<boolean>;
  isSyncingCloud?: boolean;
  lastCloudSyncTimestamp?: number;
  onOpenAdminPanel?: () => void;
  historySessions?: HistorySession[];
  lifetimeTotalCount?: number;
  dailyTotal?: number;
  completedGoals?: number;
  onOpenWelcomeScreen?: () => void;
}

const FALLBACK_GUEST_PROFILE: UserProfile = {
  name: 'Guest Account',
  emailOrPhone: '',
  photoUrl: '',
  isSignedIn: false,
};

export const OtherIslamicHubView: React.FC<OtherIslamicHubViewProps> = ({
  onAddDuaToCounters,
  activeCounters,
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
  initialSubSection = 'hub',
  subSectionSyncKey = 0,
  initialAccountTab = 'profile',
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
  userProfile = FALLBACK_GUEST_PROFILE,
  onUpdateProfile,
  onNavigateModule,
  onToggleThemeMode,
  onToggleSound,
  onToggleVibration,
  onResetAllCounters,
  onOpenStandaloneModal,
  onCloudDataLoaded,
  onTriggerCloudSync,
  isSyncingCloud = false,
  lastCloudSyncTimestamp,
  onOpenAdminPanel,
  historySessions = [],
  lifetimeTotalCount = 0,
  dailyTotal = 0,
  completedGoals = 0,
  onOpenWelcomeScreen,
}) => {
  const isDay = themeMode === 'day';
  const [activeSub, setActiveSub] = useState<OtherSubSection>(initialSubSection);
  const [accountTab, setAccountTab] = useState<'profile' | 'settings'>(initialAccountTab);

  // Sync activeSub state with initialSubSection prop changes
  useEffect(() => {
    if (initialSubSection) {
      setActiveSub(initialSubSection);
    }
  }, [initialSubSection, subSectionSyncKey]);

  useEffect(() => {
    if (initialAccountTab) {
      setAccountTab(initialAccountTab);
    }
  }, [initialAccountTab, subSectionSyncKey]);

  // Auto-scroll to top whenever switching sub-module
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeSub]);

  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [buttonTopPercent, setButtonTopPercent] = useState(20);
  const autoHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Move the right-edge Zikr+ button dynamically up/down with scroll progress
  useEffect(() => {
    const updateScrollPosition = () => {
      const currentScroll = window.scrollY || document.documentElement.scrollTop || 0;
      const windowHeight = window.innerHeight || 800;
      const fullHeight = document.documentElement.scrollHeight || windowHeight;
      const maxScroll = Math.max(1, fullHeight - windowHeight);
      const ratio = Math.min(1, Math.max(0, currentScroll / maxScroll));
      setButtonTopPercent(20 + ratio * 42);
    };

    window.addEventListener('scroll', updateScrollPosition, { passive: true });
    window.addEventListener('resize', updateScrollPosition, { passive: true });
    const rafId = window.requestAnimationFrame(updateScrollPosition);

    return () => {
      window.removeEventListener('scroll', updateScrollPosition);
      window.removeEventListener('resize', updateScrollPosition);
      window.cancelAnimationFrame(rafId);
    };
  }, [activeSub]);

  useEffect(() => {
    return () => {
      if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
    };
  }, []);

  const handleOpenRightSidebar = () => {
    if (soundEnabled) soundHaptics.playTap();
    setIsRightSidebarOpen(true);
    if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
    autoHideTimerRef.current = setTimeout(() => {
      setIsRightSidebarOpen(false);
    }, 3000);
  };

  const [savedStats, setSavedStats] = useState({ bookmarks: 0, highlights: 0, notes: 0 });

  useEffect(() => {
    const updateCounts = () => {
      setSavedStats({
        bookmarks: getAllUnifiedBookmarks().length,
        highlights: getSavedHighlights().length,
        notes: getSavedNotes().length,
      });
    };
    updateCounts();
    window.addEventListener('zikrplus-saved-updated', updateCounts);
    window.addEventListener('storage', updateCounts);
    return () => {
      window.removeEventListener('zikrplus-saved-updated', updateCounts);
      window.removeEventListener('storage', updateCounts);
    };
  }, [activeSub]);

  const hubItems = [
    {
      id: 'my_account' as OtherSubSection,
      title: selectedLanguage === 'bn' ? 'আমার অ্যাকাউন্ট' : selectedLanguage === 'ar' ? 'حسابي' : 'My Account',
      arabic: 'حسابي والإعدادات',
      desc: selectedLanguage === 'bn'
        ? 'প্রোফাইল, ক্লাউড সিঙ্ক ও সকল অ্যাপ সেটিংস'
        : selectedLanguage === 'ar'
        ? 'الملف الشخصي والمزامنة وإعدادات التطبيق'
        : 'Profile, Cloud Sync & App Settings',
      icon: userProfile?.photoUrl ? (
        <img
          src={userProfile.photoUrl}
          alt={userProfile.name || (selectedLanguage === 'bn' ? 'আমার অ্যাকাউন্ট' : 'My Account')}
          className="w-full h-full object-cover rounded-2xl"
        />
      ) : (
        <User className="w-6 h-6 text-[#006A4E] dark:text-emerald-300" />
      ),
      color: 'from-emerald-600/20 to-teal-500/10 border-emerald-500/30',
      badge: selectedLanguage === 'bn' ? 'প্রোফাইল ও সেটিংস' : selectedLanguage === 'ar' ? 'الحساب والإعدادات' : 'Profile & Settings',
      action: () => {
        setAccountTab('profile');
        handleSelectSub('my_account');
      },
    },
    {
      id: 'saved' as OtherSubSection,
      title: selectedLanguage === 'bn' ? 'সংরক্ষিত লাইব্রেরি' : selectedLanguage === 'ar' ? 'المحفوظات' : 'Saved',
      arabic: 'المحفوظات',
      desc: selectedLanguage === 'bn'
        ? 'আপনার সংরক্ষিত বুকমার্ক, হাইলাইট এবং নোটসমূহ'
        : selectedLanguage === 'ar'
        ? 'الإشارات المرجعية والتمييزات والملاحظات المحفوظة'
        : 'Your bookmarks, highlights, and notes',
      icon: <Bookmark className="w-6 h-6 text-[#006A4E] dark:text-emerald-300" />,
      color: 'from-emerald-600/20 to-teal-500/10 border-emerald-500/30',
      badge: selectedLanguage === 'bn' ? 'বুকমার্ক ও নোটস' : selectedLanguage === 'ar' ? 'المحفوظات والملاحظات' : 'Bookmarks & Notes',
    },
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
      id: 'nobi_24_hours' as OtherSubSection,
      title: NAV_TRANSLATIONS.nobi_24_hours?.[selectedLanguage] || (selectedLanguage === 'bn' ? 'নবীজির ২৪ ঘণ্টা' : "Prophet's 24 Hours"),
      arabic: '٢٤ ساعة في حياة النبي ﷺ',
      desc:
        selectedLanguage === 'bn'
          ? 'নবীজির ২৪ ঘণ্টা রুটিনের আলোকে সুন্নাহ গাইডলাইন, ১৪টি ধারাবাহিক সময় পর্ব, ১২টি জীবনঘনিষ্ঠ অধ্যায় ও মাসনুন দোয়া'
          : selectedLanguage === 'ar'
          ? 'دليل السنة النبوية المستند إلى روتين الـ ٢٤ ساعة، ١٤ مرحلة زمنية، ١٢ فصلاً والأدعية المأثورة'
          : selectedLanguage === 'ur'
          ? 'نبی کریم ﷺ کے ۲۴ گھنٹے کے معمول پر مبنی سنت گائیڈ لائن، ۱۴ اوقات، ۱۲ ابواب اور مسنون دعائیں'
          : selectedLanguage === 'hi'
          ? 'नबीजी ﷺ के २४ घंटे की दिनचर्या पर आधारित सुन्नत गाइडलाइन, १४ भाग, १२ अध्याय और मसनून दुआएं'
          : selectedLanguage === 'id'
          ? 'Panduan Sunnah berdasarkan rutinitas 24 jam Nabi ﷺ, 14 segmen waktu, 12 bab dan doa-doa masnun'
          : selectedLanguage === 'tr'
          ? 'Peygamberimizin ﷺ 24 saatlik rutinine dayalı Sünnet rehberi, 14 zaman dilimi, 12 bölüm ve dualar'
          : "Sunnah Guideline based on Prophet's 24 hours routine with 14 timeline slots, 12 book chapters and daily duas.",
      icon: <span className="text-2xl">⏰</span>,
      color: 'from-emerald-600/30 via-teal-600/20 to-amber-500/10 border-emerald-500/50',
      badge:
        selectedLanguage === 'bn'
          ? '২৪ ঘণ্টা রুটিন'
          : selectedLanguage === 'ar'
          ? 'جدول ٢٤ ساعة'
          : selectedLanguage === 'ur'
          ? '۲۴ گھنٹے معمول'
          : selectedLanguage === 'hi'
          ? '२४ घंटे रूटीन'
          : selectedLanguage === 'id'
          ? 'Rutinitas 24 Jam'
          : selectedLanguage === 'tr'
          ? '24 Saat Rutini'
          : '24H Sunnah',
    },
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
      title: NAV_TRANSLATIONS.hayatus_sahaba[selectedLanguage] || (selectedLanguage === 'bn' ? 'হায়াতুস সাহাবা' : 'Hayatus Sahaba'),
      arabic: 'حياة الصحابة رضي الله عنهم',
      desc: selectedLanguage === 'bn' ? 'মর্যাদা ও জনপ্রিয়তার ক্রমানুসারে ২৬৬+ জন সাহাবির ইসলাম গ্রহণ, হৃদয়স্পর্শী ইতিহাস, আত্মত্যাগ ও সহিহ হাদিসের দলিল' : 'Ranked biographical accounts of 266+ prominent Sahaba, their sacrifices, emotional stories and authentic hadith citations.',
      icon: <span className="text-2xl">📜</span>,
      color: 'from-emerald-500/20 via-amber-500/15 to-teal-500/10 border-emerald-500/40',
      badge: selectedLanguage === 'bn' ? '২৬৬+ সাহাবি' : '266+ Sahaba',
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
      {/* Right Edge Scroll-Following Pop-up Menu Button ("Zikr+" with official logo) */}
      {activeSub !== 'hub' && !isRightSidebarOpen && (
        <div
          style={{ top: `${buttonTopPercent}%` }}
          className="fixed right-0 -translate-y-1/2 z-45 pointer-events-auto transition-[top] duration-200 ease-out"
        >
          <button
            onClick={handleOpenRightSidebar}
            aria-label="Open Zikr+ Menu"
            className={`group relative flex flex-col items-center justify-center py-3 px-1.5 rounded-l-2xl transition-colors duration-200 cursor-pointer active:scale-95 border-y border-l backdrop-blur-md ${
              isDay
                ? 'bg-[#e3ece8]/95 hover:bg-[#d6e4de] text-[#113d30] border-[#c6d9d1] shadow-[0_8px_20px_rgba(15,61,46,0.12)]'
                : 'bg-[#020f12]/95 hover:bg-[#051b20] text-emerald-200/95 border-[#0c353d] shadow-[0_8px_24px_rgba(0,0,0,0.7)]'
            }`}
          >
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-7 h-7 rounded-xl overflow-hidden flex items-center justify-center shadow-xs border ${
                isDay ? 'border-emerald-700/20 bg-white/60' : 'border-teal-500/30 bg-[#041d22]'
              }`}>
                <img
                  src="/pwa-192x192.png"
                  alt="Zikr+ Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/icon.svg';
                  }}
                />
              </div>
              <span
                className="text-[11px] font-black tracking-widest py-0.5"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                Zikr+
              </span>
            </div>
            <div className={`absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-5 rounded-full transition-opacity group-hover:opacity-100 opacity-75 ${
              isDay ? 'bg-emerald-600/60' : 'bg-teal-400/60'
            }`} />
          </button>
        </div>
      )}

      {/* Right-Side Auto-Hiding Zikr+ Sidebar Panel */}
      {isRightSidebarOpen && (
        <div
          onMouseEnter={() => {
            if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
          }}
          onMouseLeave={() => {
            if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
            autoHideTimerRef.current = setTimeout(() => {
              setIsRightSidebarOpen(false);
            }, 3000);
          }}
          className={`fixed right-4 top-4 bottom-4 z-50 w-72 flex flex-col rounded-3xl border shadow-2xl p-4 space-y-3 overflow-y-auto animate-in slide-in-from-right duration-300 ${
            isDay ? 'bg-white border-slate-200 text-slate-800' : 'bg-[#092226] border-teal-900/50 text-white'
          }`}
        >
          {/* Header with Zikr+ logo */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-teal-900/40">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl overflow-hidden shadow-md border border-emerald-500/30 bg-[#005740] shrink-0">
                <img
                  src="/pwa-192x192.png"
                  alt="Zikr+ Logo"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/icon.svg';
                  }}
                />
              </div>
              <div>
                <h3 className="font-black text-base text-emerald-600 dark:text-emerald-400">Zikr+</h3>
                <p className="text-[10px] opacity-70">Islamic Knowledge Hub</p>
              </div>
            </div>
            <button
              onClick={() => setIsRightSidebarOpen(false)}
              className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-[#123840] flex items-center justify-center font-bold cursor-pointer transition"
            >
              ✕
            </button>
          </div>

          {/* Navigation Items List */}
          <div className="space-y-1.5 flex-1">
            <button
              onClick={() => {
                handleSelectSub('hub');
                setIsRightSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeSub === 'hub' ? 'bg-emerald-600 text-white shadow-md' : isDay ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-[#123840] text-emerald-300'
              }`}
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span className="truncate">{OTHER_HUB_UI.allFeatures[selectedLanguage]}</span>
            </button>

            {hubItems.map((item) => {
              const isActive = activeSub === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if ((item as any).action) {
                      (item as any).action();
                    } else {
                      handleSelectSub(item.id);
                    }
                    setIsRightSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isActive ? 'bg-emerald-600 text-white shadow-md' : isDay ? 'hover:bg-slate-100 text-slate-700' : 'hover:bg-[#123840] text-emerald-300'
                  }`}
                >
                  <div className="w-5 h-5 flex items-center justify-center text-base shrink-0">{item.icon}</div>
                  <span className="truncate">{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
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
              <span>
                {selectedLanguage === 'bn'
                  ? 'ইসলামিক জ্ঞান ও আমলের পূর্ণাঙ্গ সমাহার'
                  : selectedLanguage === 'ar'
                  ? 'المكتبة والمعرفة الإسلامية'
                  : selectedLanguage === 'ur'
                  ? 'اسلامی کتب خانہ اور علم کا خزانہ'
                  : 'Comprehensive Islamic Suite'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {OTHER_HUB_UI.bannerTitle[selectedLanguage] || OTHER_HUB_UI.bannerTitle.en}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1 max-w-xl">
              {OTHER_HUB_UI.bannerSub[selectedLanguage] || OTHER_HUB_UI.bannerSub.en}
            </p>
          </div>

          {/* Feature Cards Grid matching user uploaded reference image */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-5">
            {hubItems.map((item) => {
              const actionText =
                item.id === 'nobi_24_hours'
                  ? selectedLanguage === 'bn'
                    ? 'রুটিন দেখুন >'
                    : selectedLanguage === 'ar'
                    ? 'عرض الجدول >'
                    : selectedLanguage === 'ur'
                    ? 'معمول دیکھیں >'
                    : selectedLanguage === 'hi'
                    ? 'दिनचर्या देखें >'
                    : selectedLanguage === 'id'
                    ? 'Lihat Jadwal >'
                    : selectedLanguage === 'tr'
                    ? 'Çizelgeyi Gör >'
                    : 'View Routine >'
                  : item.id === 'seerat_un_nabi' || item.id === 'hayatus_sahaba' || item.id === 'dua' || item.id === 'tablig'
                  ? selectedLanguage === 'bn' ? 'পড়ুন >' : 'Read >'
                  : item.id === 'saved' || item.id === 'my_account'
                  ? selectedLanguage === 'bn' ? 'খুলুন >' : 'Open >'
                  : item.id === 'namaj'
                  ? selectedLanguage === 'bn' ? 'সময় দেখুন >' : 'View >'
                  : selectedLanguage === 'bn' ? 'দেখুন >' : 'View >';

              const subText =
                item.id === 'my_account'
                  ? userProfile?.isSignedIn && userProfile?.name
                    ? userProfile.name
                    : selectedLanguage === 'bn'
                    ? 'প্রোফাইল ও সেটিংস'
                    : 'Profile & Settings'
                  : item.id === 'saved'
                  ? savedStats.bookmarks + savedStats.highlights + savedStats.notes > 0
                    ? selectedLanguage === 'bn'
                      ? `${toBnDigits(savedStats.bookmarks)} বুকমার্ক · ${toBnDigits(savedStats.highlights)} হাইলাইট · ${toBnDigits(savedStats.notes)} নোট`
                      : `${savedStats.bookmarks} Bookmarks · ${savedStats.highlights} Highlights · ${savedStats.notes} Notes`
                    : selectedLanguage === 'bn'
                    ? 'বুকমার্ক, হাইলাইট ও নোটস'
                    : 'Bookmarks, Highlights & Notes'
                  : item.id === 'nobi_24_hours'
                  ? selectedLanguage === 'bn'
                    ? 'সুন্নাহ গাইডলাইন'
                    : selectedLanguage === 'ar'
                    ? 'منهج السنة النبوية'
                    : selectedLanguage === 'ur'
                    ? 'سنت گائیڈ لائن'
                    : selectedLanguage === 'hi'
                    ? 'सुन्नत गाइडलाइन'
                    : selectedLanguage === 'id'
                    ? 'Panduan Sunnah'
                    : selectedLanguage === 'tr'
                    ? 'Sünnet Rehberi'
                    : 'Sunnah Guideline'
                  : item.id === 'seerat_un_nabi'
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
                  : selectedLanguage === 'bn' ? '৯৯টি নাম ও জিকির' : '99 Names';

              return (
                <div
                  key={item.id}
                  onPointerEnter={() => prefetchView(item.id === 'my_account' ? 'profile_modal' : item.id)}
                  onTouchStart={() => prefetchView(item.id === 'my_account' ? 'profile_modal' : item.id)}
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
                    className={`w-12 h-12 rounded-2xl overflow-hidden flex items-center justify-center text-2xl mb-1.5 transition-transform group-hover:scale-105 shadow-2xs ${
                      isDay ? 'bg-[#f0f7f4] text-[#005a3e]' : 'bg-[#123138] text-emerald-300'
                    }`}
                  >
                    {item.icon}
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-0.5 my-auto w-full">
                    <h3
                      className={`text-sm sm:text-base font-black transition-colors line-clamp-1 ${
                        isDay ? 'text-slate-900 group-hover:text-[#005a3e]' : 'text-white group-hover:text-emerald-400'
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className={`text-[11px] font-medium line-clamp-1 ${isDay ? 'text-slate-400' : 'text-slate-400'}`}>
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

      <React.Suspense fallback={<SubViewFallback isDay={isDay} selectedLanguage={selectedLanguage} />}>
        {/* Sub-view: Nobi Karim (SA) 24 Hours Sunnah Guideline */}
        {activeSub === 'nobi_24_hours' && (
          <Nobi24HoursView
            themeMode={themeMode}
            selectedLanguage={selectedLanguage}
            soundEnabled={soundEnabled}
            onBackToHub={() => setActiveSub('hub')}
          />
        )}

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

        {/* Sub-view: Saved (Bookmarks, Highlights & Notes) */}
        {activeSub === 'saved' && (
          <SavedView
            themeMode={themeMode}
            selectedLanguage={selectedLanguage}
            soundEnabled={soundEnabled}
            onNavigateToQuran={onNavigateToQuran}
            onBackToHub={() => setActiveSub('hub')}
          />
        )}

        {/* Sub-view: My Account (Embedded Profile & App Settings) */}
        {activeSub === 'my_account' && (
          <ProfileModal
            embedded={true}
            isOpen={true}
            onClose={() => setActiveSub('hub')}
            onBackToHub={() => setActiveSub('hub')}
            onOpenSaved={() => handleSelectSub('saved')}
            userProfile={userProfile}
            onUpdateProfile={onUpdateProfile || (() => {})}
            onNavigateModule={onNavigateModule || (() => {})}
            themeMode={themeMode}
            onToggleThemeMode={onToggleThemeMode}
            selectedLanguage={selectedLanguage}
            onSelectLanguage={onSelectLanguage}
            soundEnabled={soundEnabled}
            onToggleSound={onToggleSound}
            vibrationEnabled={settings?.vibrationEnabled ?? true}
            onToggleVibration={onToggleVibration}
            onExportPdf={onExportPdf}
            onOpenStandaloneModal={onOpenStandaloneModal}
            onResetAllCounters={onResetAllCounters || onGlobalReset}
            initialTab={accountTab}
            onCloudDataLoaded={onCloudDataLoaded}
            onTriggerCloudSync={onTriggerCloudSync}
            isSyncingCloud={isSyncingCloud}
            lastCloudSyncTimestamp={lastCloudSyncTimestamp}
            onOpenAdminPanel={onOpenAdminPanel}
            zikrs={activeCounters}
            historySessions={historySessions}
            lifetimeTotalCount={lifetimeTotalCount}
            dailyTotal={dailyTotal}
            completedGoals={completedGoals}
            voiceGender={settings?.voiceGender || 'male'}
            onUpdateVoiceGender={(gender) => onUpdateSettings?.({ voiceGender: gender })}
            onOpenWelcomeScreen={onOpenWelcomeScreen}
            appSettings={settings}
            onUpdateSettings={onUpdateSettings}
            onRestoreDefaults={onRestoreDefaults}
            onExportBackupJson={onExportBackupJson}
            onImportBackupJson={onImportBackupJson}
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
      </React.Suspense>
    </div>
  );
};
