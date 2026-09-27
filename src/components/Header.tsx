import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  FileText,
  Smartphone,
  Code,
  BookOpen,
  Clock,
  Award,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  Check,
  Settings,
  User,
  X,
  Sparkles,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { NavModule, ThemeMode, ZikrLanguage, UserProfile } from '../types';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { NAV_TRANSLATIONS } from '../utils/appTranslations';

interface HeaderProps {
  activeModule: NavModule;
  onModuleChange: (mod: NavModule) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  themeMode: ThemeMode;
  onToggleThemeMode: () => void;
  selectedLanguage: ZikrLanguage;
  onSelectLanguage: (lang: ZikrLanguage) => void;
  onExportPdf: () => void;
  isExportingPdf: boolean;
  onOpenStandaloneModal: () => void;
  userProfile?: UserProfile;
  onOpenProfile?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeModule,
  onModuleChange,
  soundEnabled,
  onToggleSound,
  themeMode,
  onToggleThemeMode,
  selectedLanguage = 'bn',
  onSelectLanguage,
  onExportPdf,
  isExportingPdf,
  onOpenStandaloneModal,
  userProfile,
  onOpenProfile,
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showLangSubMenu, setShowLangSubMenu] = useState(false);
  const settingsMenuRef = useRef<HTMLDivElement>(null);

  // Close settings popover on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsMenuRef.current &&
        !settingsMenuRef.current.contains(event.target as Node)
      ) {
        setShowSettingsMenu(false);
        setShowLangSubMenu(false);
      }
    };
    if (showSettingsMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSettingsMenu]);

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  };

  const otherModules: NavModule[] = [
    'other',
    'dua',
    'hadith',
    'kitab',
    'tablig',
    'allah_names',
    'hajj_umrah',
  ];
  const isOtherActive = otherModules.includes(activeModule);

  const navItems: Array<{
    id: NavModule;
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
  }> = [
    {
      id: 'zikir_counter',
      label: NAV_TRANSLATIONS.zikir_counter[selectedLanguage],
      icon: <span>📿</span>,
      isActive: activeModule === 'zikir_counter',
    },
    {
      id: 'quran',
      label: NAV_TRANSLATIONS.quran[selectedLanguage],
      icon: <BookOpen className="w-3.5 h-3.5" />,
      isActive: activeModule === 'quran',
    },
    {
      id: 'salat_time',
      label: NAV_TRANSLATIONS.salat_time[selectedLanguage],
      icon: <Clock className="w-3.5 h-3.5" />,
      isActive: activeModule === 'salat_time',
    },
    {
      id: 'aamal_tracker',
      label: NAV_TRANSLATIONS.aamal_tracker[selectedLanguage],
      icon: <Award className="w-3.5 h-3.5" />,
      isActive: activeModule === 'aamal_tracker',
    },
    {
      id: 'other',
      label: selectedLanguage === 'bn' ? 'অন্যান্য' : 'Other',
      icon: <span>✨</span>,
      isActive: isOtherActive,
    },
  ];

  const isDay = themeMode === 'day';
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage);

  return (
    <header
      className={`sticky top-0 z-40 px-3 py-2.5 sm:px-6 transition-colors duration-300 shadow-lg ${
        isDay
          ? 'bg-gradient-to-r from-[#144d52] via-[#1a5e64] to-[#257277] text-white border-b border-[#2d7d83]/40 shadow-[#135d66]/15'
          : 'bg-gradient-to-r from-[#07191e] via-[#0b262d] to-[#10363e] text-white border-b border-[#163c46] shadow-black/60'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Identity */}
        <div
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
          onClick={() => onModuleChange('zikir_counter')}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-md border border-white/25">
            <span className="text-lg sm:text-xl">📿</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-extrabold tracking-tight text-white drop-shadow-sm">
                ZikrMate
              </h1>
              <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/20 text-teal-100 font-bold border border-white/30">
                PWA
              </span>
            </div>
            <p className="text-[10px] text-teal-100/90 font-medium hidden sm:block">
              Islamic Companion &amp; Counter
            </p>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 bg-white/10 p-1 rounded-2xl border border-white/20 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = item.isActive;
            return (
              <button
                key={item.id}
                onClick={() => onModuleChange(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition active:scale-95 cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#165a60] font-bold shadow-md shadow-teal-900/10'
                    : 'text-teal-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Clean Top-Right Controls: Sign In & Settings Dropdown */}
        <div className="flex items-center gap-2">
          {/* User Account / Profile / Sign In Button */}
          {onOpenProfile && (
            <button
              onClick={onOpenProfile}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border transition active:scale-95 cursor-pointer backdrop-blur-md shadow-sm ${
                userProfile?.isSignedIn
                  ? 'border-emerald-300/50 bg-emerald-500/25 hover:bg-emerald-500/35 text-white'
                  : 'border-white/25 bg-white/15 hover:bg-white/25 text-white'
              }`}
              title={userProfile?.isSignedIn ? `Profile: ${userProfile.name}` : 'Sign In / Profile'}
            >
              <div className="w-6 h-6 rounded-full overflow-hidden border border-emerald-300 shadow-xs flex items-center justify-center bg-emerald-700 shrink-0">
                {userProfile?.isSignedIn && userProfile?.photoUrl ? (
                  <img
                    src={userProfile.photoUrl}
                    alt={userProfile.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-3.5 h-3.5 text-white" />
                )}
              </div>
              <span className="text-xs font-bold truncate max-w-[110px]">
                {userProfile?.isSignedIn
                  ? userProfile?.name?.split(' ')[0] || 'Profile'
                  : 'Sign In'}
              </span>
            </button>
          )}

          {/* Settings Menu Button & Dropdown */}
          <div className="relative" ref={settingsMenuRef}>
            <button
              type="button"
              onClick={() => {
                setShowSettingsMenu((prev) => !prev);
                setShowLangSubMenu(false);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border text-xs font-bold transition active:scale-95 cursor-pointer backdrop-blur-md shadow-sm ${
                showSettingsMenu
                  ? 'bg-white text-[#164e52] border-white shadow-md'
                  : 'bg-white/15 hover:bg-white/25 text-white border-white/25'
              }`}
              title="Settings & Preferences"
              aria-label="Open Settings"
            >
              <Settings className={`w-4 h-4 transition-transform duration-300 ${showSettingsMenu ? 'rotate-90 text-[#164e52]' : 'text-teal-200'}`} />
              <span className="hidden sm:inline text-xs">Settings</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${
                  showSettingsMenu ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Comprehensive Settings Popover Panel */}
            {showSettingsMenu && (
              <div
                className={`absolute right-0 top-full mt-2 z-50 w-72 sm:w-80 rounded-3xl p-3.5 border shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150 space-y-3 ${
                  isDay
                    ? 'bg-white/95 text-slate-800 border-[#cce5e2] shadow-[#135d66]/25'
                    : 'bg-[#082026]/95 text-white border-[#1a515c] shadow-black/90'
                }`}
              >
                {/* Header title */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-teal-900/40">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-teal-500/15 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                      <Settings className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-tight">
                        {selectedLanguage === 'bn' ? 'সেটিংস ও পছন্দ' : 'Settings & Preferences'}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-teal-300/70">
                        {selectedLanguage === 'bn' ? 'থিম, ভাষা, অডিও ও রিপোর্ট' : 'Theme, Language & Tools'}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowSettingsMenu(false)}
                    className="p-1 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* 1. Theme Mode Switcher */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-teal-400 flex items-center justify-between">
                    <span>{selectedLanguage === 'bn' ? 'থিম মোড' : 'Theme Mode'}</span>
                    <span className="text-[10px] font-semibold text-amber-500">
                      {isDay ? 'Day Mode' : 'Night Mode'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-[#06181c] border border-slate-200 dark:border-teal-900/40">
                    <button
                      type="button"
                      onClick={() => {
                        if (!isDay) onToggleThemeMode();
                      }}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                        isDay
                          ? 'bg-white text-[#164e52] shadow-sm border border-slate-200'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Sun className={`w-3.5 h-3.5 ${isDay ? 'text-amber-500 fill-amber-500' : ''}`} />
                      <span>Day</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (isDay) onToggleThemeMode();
                      }}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                        !isDay
                          ? 'bg-teal-700 text-white shadow-sm border border-teal-500/40'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Moon className={`w-3.5 h-3.5 ${!isDay ? 'text-teal-200 fill-teal-200' : ''}`} />
                      <span>Night</span>
                    </button>
                  </div>
                </div>

                {/* 2. Language Selection Accordion / List */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-teal-400 flex items-center justify-between">
                    <span>{selectedLanguage === 'bn' ? 'ভাষা নির্বাচন' : 'Language'}</span>
                    <span className="text-[10px] text-emerald-500 font-bold">
                      {currentLangObj?.nativeName || 'বাংলা'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowLangSubMenu((prev) => !prev)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-2xl border text-xs font-semibold transition cursor-pointer ${
                      isDay
                        ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                        : 'bg-[#06181c] hover:bg-[#0b252c] border-teal-900/40 text-teal-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-emerald-500" />
                      <span>{currentLangObj?.nativeName} ({currentLangObj?.label})</span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showLangSubMenu ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Expandable Languages list */}
                  {showLangSubMenu && (
                    <div className="p-1 rounded-2xl border bg-slate-50 dark:bg-[#051518] border-slate-200 dark:border-teal-900/40 space-y-0.5 max-h-44 overflow-y-auto">
                      {SUPPORTED_LANGUAGES.map((lang) => {
                        const isSelected = selectedLanguage === lang.code;
                        return (
                          <button
                            key={lang.code}
                            type="button"
                            onClick={() => {
                              onSelectLanguage(lang.code);
                              setShowLangSubMenu(false);
                            }}
                            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer text-left ${
                              isSelected
                                ? isDay
                                  ? 'bg-emerald-500/20 text-[#164e52] font-bold'
                                  : 'bg-emerald-500/20 text-emerald-300 font-bold'
                                : isDay
                                ? 'hover:bg-slate-200 text-slate-700'
                                : 'hover:bg-[#0d3038] text-teal-200'
                            }`}
                          >
                            <span>{lang.nativeName} ({lang.label})</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* 3. Audio / Sound Toggle */}
                <div className="space-y-1.5">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-teal-400">
                    {selectedLanguage === 'bn' ? 'অডিও সাউন্ড' : 'Sound Effects'}
                  </div>
                  <div
                    onClick={onToggleSound}
                    className={`flex items-center justify-between p-2.5 rounded-2xl border transition cursor-pointer select-none ${
                      isDay
                        ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                        : 'bg-[#06181c] hover:bg-[#0b252c] border-teal-900/40 text-teal-100'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {soundEnabled ? (
                        <Volume2 className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-slate-400" />
                      )}
                      <div>
                        <div className="text-xs font-bold leading-tight">
                          {soundEnabled
                            ? selectedLanguage === 'bn'
                              ? 'সাউন্ড সক্রিয় আছে'
                              : 'Sound Effects Active'
                            : selectedLanguage === 'bn'
                            ? 'মিউট করা আছে'
                            : 'Audio Muted'}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {selectedLanguage === 'bn'
                            ? 'কাউন্টার ক্লিকের অডিও ইফেক্ট'
                            : 'Click & milestone tones'}
                        </div>
                      </div>
                    </div>

                    {/* Toggle Switch */}
                    <div
                      className={`w-10 h-5 rounded-full transition-colors relative flex items-center p-0.5 ${
                        soundEnabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white shadow-md transition-transform duration-200 ${
                          soundEnabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </div>
                  </div>
                </div>

                {/* 4. PDF Report & Standalone Tools */}
                <div className="pt-2 border-t border-slate-200 dark:border-teal-900/40 space-y-1.5">
                  <div className="grid grid-cols-2 gap-2">
                    {/* PDF Report */}
                    <button
                      type="button"
                      onClick={() => {
                        setShowSettingsMenu(false);
                        onExportPdf();
                      }}
                      disabled={isExportingPdf}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-2xl border text-xs font-bold transition active:scale-95 cursor-pointer disabled:opacity-50 ${
                        isDay
                          ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                          : 'bg-[#06181c] hover:bg-[#0b252c] border-teal-900/40 text-teal-200'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5 text-rose-500" />
                      <span>{isExportingPdf ? 'Exporting...' : 'PDF Report'}</span>
                    </button>

                    {/* APK & Offline Guide */}
                    <button
                      type="button"
                      onClick={() => {
                        setShowSettingsMenu(false);
                        onOpenStandaloneModal();
                      }}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-2xl border text-xs font-bold transition active:scale-95 cursor-pointer ${
                        isDay
                          ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800'
                          : 'bg-[#06181c] hover:bg-[#0b252c] border-teal-900/40 text-teal-200'
                      }`}
                    >
                      <Code className="w-3.5 h-3.5 text-blue-500" />
                      <span>APK Guide</span>
                    </button>
                  </div>

                  {/* Install PWA Button (if available) */}
                  {(isInstallable || isIOS) && !isInstalled && (
                    <button
                      type="button"
                      onClick={() => {
                        setShowSettingsMenu(false);
                        handleInstallClick();
                      }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition active:scale-95 cursor-pointer"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Install ZikrMate App</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* iOS Instructions Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 bg-[#082024]/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#12454a] border border-teal-500/50 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-white">
            <h3 className="text-base font-bold flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-teal-300" />
              <span>Install ZikrMate on iOS</span>
            </h3>
            <p className="text-xs text-teal-100 leading-relaxed">
              1. Tap the <strong className="text-white">Share</strong> button at the bottom of Safari.<br />
              2. Scroll down and tap <strong className="text-white">"Add to Home Screen"</strong>.<br />
              3. Tap <strong className="text-white">"Add"</strong> in the top-right corner.
            </p>
            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 rounded-xl bg-white text-[#165a60] text-xs font-bold transition active:scale-95 cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
