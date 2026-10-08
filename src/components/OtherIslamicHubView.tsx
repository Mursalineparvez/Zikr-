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
import { DuaView } from './DuaView';
import { HadithView } from './HadithView';
import { KitabView } from './KitabView';
import { DailyTabligView } from './DailyTabligView';
import { AllahNamesView } from './AllahNamesView';
import { HajjUmrahView } from './HajjUmrahView';
import { HistoryTimelineView } from './HistoryTimelineView';
import { SettingsView } from './SettingsView';
import { soundHaptics } from '../utils/audioHaptics';
import { NAV_TRANSLATIONS, OTHER_HUB_UI, SETTINGS_UI } from '../utils/appTranslations';

export type OtherSubSection =
  | 'hub'
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
}) => {
  const isDay = themeMode === 'day';
  const [activeSub, setActiveSub] = useState<OtherSubSection>(initialSubSection);

  // Sync activeSub state with initialSubSection prop changes
  useEffect(() => {
    if (initialSubSection) {
      setActiveSub(initialSubSection);
    }
  }, [initialSubSection]);

  // Auto-scroll to top whenever switching sub-module (Dua, Hadith, Kitab, etc.)
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeSub]);

  const hubItems = [
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
      id: 'hadith' as OtherSubSection,
      title: NAV_TRANSLATIONS.hadith[selectedLanguage],
      arabic: 'الحديث النبوي',
      desc: OTHER_HUB_UI.hadithDesc[selectedLanguage],
      icon: <span className="text-2xl">📜</span>,
      color: 'from-amber-500/15 to-yellow-500/10 border-amber-500/30',
      badge: OTHER_HUB_UI.badgeHadith[selectedLanguage],
    },
    {
      id: 'kitab' as OtherSubSection,
      title: NAV_TRANSLATIONS.kitab[selectedLanguage],
      arabic: 'المكتبة الإسلامية',
      desc: OTHER_HUB_UI.kitabDesc[selectedLanguage],
      icon: <BookMarked className="w-6 h-6 text-blue-500" />,
      color: 'from-blue-500/15 to-cyan-500/10 border-blue-500/30',
      badge: OTHER_HUB_UI.badgeKitab[selectedLanguage],
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

  const handleSelectSub = (sub: OtherSubSection) => {
    setActiveSub(sub);
    if (soundEnabled) soundHaptics.playTap();
  };

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
          onClick={() => handleSelectSub('hadith')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'hadith'
              ? 'bg-amber-600 text-white border-amber-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <span>📜</span>
          <span>{NAV_TRANSLATIONS.hadith[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => handleSelectSub('kitab')}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer shrink-0 border ${
            activeSub === 'kitab'
              ? 'bg-blue-600 text-white border-blue-500 shadow-md'
              : isDay
              ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
              : 'bg-[#092226] hover:bg-[#123840] border-[#153e46] text-emerald-300'
          }`}
        >
          <BookMarked className="w-3.5 h-3.5" />
          <span>{NAV_TRANSLATIONS.kitab[selectedLanguage]}</span>
        </button>

        <button
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

          {/* 7 Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {hubItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectSub(item.id)}
                className={`p-5 rounded-3xl border shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between gap-4 ${
                  isDay
                    ? 'bg-white border-slate-200 hover:border-emerald-400 hover:shadow-xl'
                    : 'bg-[#0a242a] border-[#16444e] hover:border-teal-500/50 hover:shadow-teal-950/50'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br border ${item.color}`}>
                    {item.icon}
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 text-[10px] font-bold">
                    {item.badge}
                  </span>
                </div>

                <div>
                  <div className="font-arabic text-xs text-amber-600 dark:text-amber-400 font-bold mb-1">
                    {item.arabic}
                  </div>
                  <h3 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {item.title}
                  </h3>
                  <p className={`text-xs mt-1 leading-relaxed ${isDay ? 'text-slate-500' : 'text-emerald-200/80'}`}>
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-teal-900/30 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span>{OTHER_HUB_UI.openCard[selectedLanguage]}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
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

      {/* Sub-view: Umrah Guide & 3D Studio */}
      {activeSub === 'umrah_guide' && (
        <HajjUmrahView
          soundEnabled={soundEnabled}
          themeMode={themeMode}
          selectedLanguage={selectedLanguage}
          voiceGender={settings?.voiceGender || 'male'}
          initialTab="umrah_hub"
        />
      )}

      {/* Sub-view: 5 Days Hajj Route Map */}
      {activeSub === 'hajj_route_map' && (
        <HajjUmrahView
          soundEnabled={soundEnabled}
          themeMode={themeMode}
          selectedLanguage={selectedLanguage}
          voiceGender={settings?.voiceGender || 'male'}
          initialTab="hajj_hub"
        />
      )}

      {/* Sub-view: Miqat, Madinah & Essentials */}
      {activeSub === 'hajj_essentials' && (
        <HajjUmrahView
          soundEnabled={soundEnabled}
          themeMode={themeMode}
          selectedLanguage={selectedLanguage}
          voiceGender={settings?.voiceGender || 'male'}
          initialTab="essentials_hub"
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
    </div>
  );
};
