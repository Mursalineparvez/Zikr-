import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  FileText,
  Smartphone,
  Code,
  BookOpen,
  BookMarked,
  Clock,
  Heart,
  Award,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  Check,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { NavModule, ThemeMode, ZikrLanguage, UserProfile } from '../types';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { NAV_TRANSLATIONS } from '../utils/appTranslations';
import { User } from 'lucide-react';

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
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSModal(true);
    }
  };

  const navItems: Array<{
    id: NavModule;
    label: string;
    icon: React.ReactNode;
  }> = [
    { id: 'zikir_counter', label: NAV_TRANSLATIONS.zikir_counter[selectedLanguage], icon: <span>📿</span> },
    { id: 'quran', label: NAV_TRANSLATIONS.quran[selectedLanguage], icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'kitab', label: NAV_TRANSLATIONS.kitab[selectedLanguage], icon: <BookMarked className="w-3.5 h-3.5" /> },
    { id: 'hadith', label: NAV_TRANSLATIONS.hadith[selectedLanguage], icon: <span>📜</span> },
    { id: 'salat_time', label: NAV_TRANSLATIONS.salat_time[selectedLanguage], icon: <Clock className="w-3.5 h-3.5" /> },
    { id: 'dua', label: NAV_TRANSLATIONS.dua[selectedLanguage], icon: <Heart className="w-3.5 h-3.5" /> },
    { id: 'aamal_tracker', label: NAV_TRANSLATIONS.aamal_tracker[selectedLanguage], icon: <Award className="w-3.5 h-3.5" /> },
  ];

  const isDay = themeMode === 'day';

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
            const isActive = activeModule === item.id;
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

        {/* Quick Utility Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Day / Night Mode Toggle */}
          <button
            onClick={onToggleThemeMode}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border text-xs font-bold transition active:scale-95 cursor-pointer backdrop-blur-md shadow-sm ${
              isDay
                ? 'bg-white/20 hover:bg-white/30 text-amber-300 border-white/30'
                : 'bg-teal-950/80 hover:bg-teal-900 text-teal-200 border-teal-700/60'
            }`}
            title={isDay ? 'Switch to Night Mode (Dark)' : 'Switch to Day Mode (Light)'}
            aria-label="Toggle Day and Night mode"
          >
            {isDay ? (
              <>
                <Sun className="w-4 h-4 fill-amber-300 text-amber-300" />
                <span className="hidden sm:inline text-white text-[11px]">Day</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 fill-teal-200 text-teal-200" />
                <span className="hidden sm:inline text-teal-200 text-[11px]">Night</span>
              </>
            )}
          </button>

          {/* Language Selector Dropdown (Directly beside Day Button) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowLangDropdown((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border text-xs font-bold transition active:scale-95 cursor-pointer backdrop-blur-md shadow-sm ${
                isDay
                  ? 'bg-white/20 hover:bg-white/30 text-white border-white/30'
                  : 'bg-teal-950/80 hover:bg-teal-900 text-teal-200 border-teal-700/60'
              }`}
              title="উচ্চারণ ও অর্থের ভাষা নির্বাচন করুন (Select Language)"
              aria-label="Select Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-[11px]">
                {SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage)?.label || 'বাংলা'}
              </span>
              <ChevronDown
                className={`w-3 h-3 text-teal-200 transition-transform duration-200 ${
                  showLangDropdown ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {showLangDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowLangDropdown(false)}
                />
                <div
                  className={`absolute right-0 top-full mt-1.5 z-50 w-44 rounded-2xl p-1.5 border shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 ${
                    isDay
                      ? 'bg-white/95 text-slate-800 border-[#cce5e2] shadow-[#135d66]/20'
                      : 'bg-[#092226]/95 text-white border-[#1a515c] shadow-black/80'
                  }`}
                >
                  <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-500 dark:text-teal-400">
                    ভাষা নির্বাচন (Language)
                  </div>
                  <div className="space-y-0.5">
                    {SUPPORTED_LANGUAGES.map((lang) => {
                      const isSelected = selectedLanguage === lang.code;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          onClick={() => {
                            onSelectLanguage(lang.code);
                            setShowLangDropdown(false);
                          }}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer text-left ${
                            isSelected
                              ? isDay
                                ? 'bg-amber-400/20 text-[#164e52] font-bold'
                                : 'bg-amber-400/20 text-amber-300 font-bold'
                              : isDay
                              ? 'hover:bg-[#f0f7f6] text-slate-700'
                              : 'hover:bg-[#10343c] text-teal-100'
                          }`}
                        >
                          <span>{lang.nativeName}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            className="p-2 rounded-2xl border border-white/20 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition active:scale-95 cursor-pointer backdrop-blur-md"
            title={soundEnabled ? 'Mute Sounds' : 'Enable Audio Feedback'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 opacity-75" />}
          </button>

          {/* User Account / Profile Button (From screenshot) */}
          {onOpenProfile && (
            <button
              onClick={onOpenProfile}
              className={`flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-2xl border transition active:scale-95 cursor-pointer backdrop-blur-md shadow-sm ${
                userProfile?.isSignedIn
                  ? 'border-emerald-300/40 bg-emerald-500/25 hover:bg-emerald-500/35 text-white'
                  : 'border-white/25 bg-white/20 hover:bg-white/30 text-white'
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
              <span className="hidden sm:inline text-xs font-bold truncate max-w-[100px]">
                {userProfile?.isSignedIn
                  ? userProfile?.name?.split(' ')[0] || 'User'
                  : 'Sign In'}
              </span>
            </button>
          )}

          {/* Export PDF Button */}
          <button
            onClick={onExportPdf}
            disabled={isExportingPdf}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-semibold transition active:scale-95 cursor-pointer backdrop-blur-md disabled:opacity-50"
            title="Export PDF Report"
          >
            <FileText className="w-4 h-4 text-teal-200" />
            <span className="hidden lg:inline">{isExportingPdf ? 'Exporting...' : 'PDF'}</span>
          </button>

          {/* APK & HTML Export Info */}
          <button
            onClick={onOpenStandaloneModal}
            className="p-2 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs font-semibold transition active:scale-95 cursor-pointer backdrop-blur-md hidden sm:flex"
            title="APK Build Guide"
          >
            <Code className="w-4 h-4 text-teal-200" />
          </button>

          {/* PWA Install Button */}
          {(isInstallable || isIOS) && !isInstalled && (
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white text-[#165a60] font-bold text-xs shadow-md transition active:scale-95 cursor-pointer"
              title="Install App"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>
          )}
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
