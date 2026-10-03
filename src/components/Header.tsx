import React, { useState, useRef, useEffect } from 'react';
import {
  Smartphone,
  BookOpen,
  Clock,
  Award,
  User,
  X,
  Sparkles,
  Globe,
  Settings,
  ChevronDown,
  Check,
} from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { NavModule, ThemeMode, ZikrLanguage, UserProfile } from '../types';
import { NAV_TRANSLATIONS } from '../utils/appTranslations';
import { SUPPORTED_LANGUAGES } from '../utils/constants';

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
  onOpenProfile?: (tab?: 'profile' | 'settings') => void;
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
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    if (isLangOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangOpen]);

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLanguage) || SUPPORTED_LANGUAGES[0];

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
      label: NAV_TRANSLATIONS.other[selectedLanguage] || 'Other',
      icon: <span>✨</span>,
      isActive: isOtherActive,
    },
  ];

  const isDay = themeMode === 'day';

  return (
    <header
      className={`sticky top-0 z-40 px-3 py-2.5 sm:px-6 transition-colors duration-300 shadow-lg ${
        isDay
          ? 'bg-gradient-to-r from-[#005a3e] via-[#006747] to-[#007a52] text-white border-b border-emerald-600/40 shadow-[#006747]/20'
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
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white drop-shadow-sm flex items-center">
                <span>Zikr</span>
                <span className="text-amber-300 font-black text-lg sm:text-xl ml-0.5">+</span>
              </h1>
              <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-white/20 text-emerald-100 font-bold border border-white/30">
                PWA
              </span>
            </div>
            <p className="text-[10px] text-emerald-100/90 font-medium hidden sm:block">
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
                    ? 'bg-white text-[#006747] font-bold shadow-md'
                    : 'text-emerald-100/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Clean Top-Right Controls: Quick Language, Settings & Sign In */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* 1. Quick Language Dropdown Selector (14 Languages) */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setIsLangOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border border-white/25 bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition active:scale-95 cursor-pointer backdrop-blur-md shadow-sm"
              title="Change Language (ভাষা নির্বাচন করুন)"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-300" />
              <span className="text-sm leading-none">{currentLangObj.flag}</span>
              <span className="hidden sm:inline text-xs">{currentLangObj.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div
                className={`absolute right-0 top-full mt-2 w-64 max-h-80 overflow-y-auto rounded-2xl border shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 scrollbar-thin ${
                  isDay
                    ? 'bg-white text-slate-800 border-emerald-200 shadow-emerald-950/20'
                    : 'bg-[#0a252b] text-white border-[#1c5561] shadow-black/80'
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 text-emerald-600 dark:text-emerald-400 border-b border-emerald-500/20 mb-1 flex items-center justify-between">
                  <span>Select App Language (১৪ ভাষা)</span>
                  <Globe className="w-3 h-3" />
                </div>
                <div className="space-y-1">
                  {SUPPORTED_LANGUAGES.map((langItem) => {
                    const isSelected = selectedLanguage === langItem.code;
                    return (
                      <button
                        key={langItem.code}
                        type="button"
                        onClick={() => {
                          onSelectLanguage(langItem.code);
                          setIsLangOpen(false);
                        }}
                        className={`w-full px-2.5 py-1.5 rounded-xl text-left text-xs font-bold transition flex items-center justify-between gap-2 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : isDay
                            ? 'hover:bg-emerald-50 text-slate-700'
                            : 'hover:bg-[#123940] text-teal-100'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-base shrink-0">{langItem.flag}</span>
                          <span className="truncate">{langItem.nativeName}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-white shrink-0 stroke-[3]" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* 2. Direct Settings Shortcut Button */}
          {onOpenProfile && (
            <button
              type="button"
              onClick={() => onOpenProfile('settings')}
              className="p-2 rounded-2xl border border-white/25 bg-white/15 hover:bg-white/25 text-white transition active:scale-95 cursor-pointer backdrop-blur-md shadow-sm"
              title="App Settings (সেটিংস ও ভাষা)"
            >
              <Settings className="w-4 h-4 text-emerald-200" />
            </button>
          )}

          {/* 3. User Account / Profile / Sign In Button */}
          {onOpenProfile && (
            <button
              type="button"
              onClick={() => onOpenProfile('profile')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border transition active:scale-95 cursor-pointer backdrop-blur-md shadow-sm ${
                userProfile?.isSignedIn
                  ? 'border-emerald-300/50 bg-emerald-500/25 hover:bg-emerald-500/35 text-white'
                  : 'border-white/25 bg-white/15 hover:bg-white/25 text-white'
              }`}
              title={userProfile?.isSignedIn ? `Profile: ${userProfile.name}` : 'Sign In (লগইন)'}
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

          {/* PWA Install Quick Button (if available) */}
          {(isInstallable || isIOS) && !isInstalled && (
            <button
              type="button"
              onClick={handleInstallClick}
              className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-xs shadow-sm transition active:scale-95 cursor-pointer"
              title="Install Zikr+ App"
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
              <Smartphone className="w-5 h-5 text-emerald-300" />
              <span>Install Zikr+ on iOS</span>
            </h3>
            <p className="text-xs text-teal-100 leading-relaxed">
              1. Tap the <strong className="text-white">Share</strong> button at the bottom of Safari.<br />
              2. Scroll down and tap <strong className="text-white">"Add to Home Screen"</strong>.<br />
              3. Tap <strong className="text-white">"Add"</strong> in the top-right corner.
            </p>
            <button
              onClick={() => setShowIOSModal(false)}
              className="w-full py-2.5 rounded-xl bg-white text-[#006747] text-xs font-bold transition active:scale-95 cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
