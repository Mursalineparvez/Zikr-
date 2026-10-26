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
  WifiOff,
} from 'lucide-react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';
import { NavModule, ThemeMode, ZikrLanguage, UserProfile } from '../types';
import { NAV_TRANSLATIONS } from '../utils/appTranslations';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { InstallAppModal } from './InstallAppModal';
import confetti from 'canvas-confetti';

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
  const isOnline = useOnlineStatus();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showInstallModal, setShowInstallModal] = useState(false);
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
      const ok = await install();
      if (ok) {
        try {
          confetti({
            particleCount: 65,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#006747', '#10b981', '#f59e0b', '#34d399'],
          });
        } catch {}
        return;
      }
    }
    // If not installable via direct prompt, or user dismissed, or on iOS/manual:
    setShowInstallModal(true);
  };

  const isDay = themeMode === 'day';

  return (
    <header
      className={`sticky top-0 z-40 px-3 py-2.5 sm:px-6 transition-all duration-300 shadow-sm ${
        isDay
          ? 'bg-white/95 backdrop-blur-md text-slate-900 border-b border-blue-100 shadow-[0_4px_20px_-4px_rgba(0,102,255,0.06)]'
          : 'bg-gradient-to-r from-[#071120] via-[#0b1b36] to-[#0f244a] text-white border-b border-blue-900/50 shadow-black/60'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        {/* Brand Identity */}
        <div
          className="flex items-center gap-2.5 cursor-pointer shrink-0"
          onClick={() => onModuleChange('zikir_counter')}
        >
          <img
            src="/icon.svg"
            alt="Zikr+"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl shadow-md border border-blue-200/40 object-cover"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className={`text-base sm:text-lg font-black tracking-tight drop-shadow-xs flex items-center ${
                isDay ? 'text-slate-900' : 'text-white'
              }`}>
                <span>Zikr</span>
                <span className={`font-black text-lg sm:text-xl ml-0.5 ${
                  isDay ? 'text-[#0066FF]' : 'text-sky-400'
                }`}>+</span>
              </h1>
              <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full font-bold border ${
                isDay
                  ? 'bg-blue-50 text-[#0066FF] border-blue-200/80'
                  : 'bg-blue-950/80 text-sky-300 border-blue-800/60'
              }`}>
                PWA
              </span>
            </div>
            <p className={`text-[10px] font-medium hidden sm:block ${
              isDay ? 'text-slate-500' : 'text-blue-200/80'
            }`}>
              Islamic Companion &amp; Counter
            </p>
          </div>
        </div>

        {/* Clean Top-Right Controls: Quick Language, Settings & Sign In */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {!isOnline && (
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-500 text-xs font-bold backdrop-blur-md shadow-xs animate-pulse"
              title="অফলাইন মোড সক্রিয় — ইন্টারনেট ছাড়া সব ফিচার চলছে"
            >
              <WifiOff className="w-3 h-3 text-amber-500" />
              <span className="text-[10px] sm:text-xs">Offline</span>
            </div>
          )}

          {/* 1. Quick Language Dropdown Selector (14 Languages) */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setIsLangOpen((prev) => !prev)}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border text-xs font-bold transition active:scale-95 cursor-pointer backdrop-blur-md shadow-xs ${
                isDay
                  ? 'border-blue-100 bg-blue-50/70 hover:bg-blue-100/70 text-slate-800'
                  : 'border-white/20 bg-white/10 hover:bg-white/20 text-white'
              }`}
              title="Change Language (ভাষা নির্বাচন করুন)"
            >
              <Globe className={`w-3.5 h-3.5 ${isDay ? 'text-[#0066FF]' : 'text-sky-300'}`} />
              <span className="text-sm leading-none">{currentLangObj.flag}</span>
              <span className="hidden sm:inline text-xs">{currentLangObj.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div
                className={`absolute right-0 top-full mt-2 w-64 max-h-80 overflow-y-auto rounded-2xl border shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 scrollbar-thin ${
                  isDay
                    ? 'bg-white text-slate-800 border-blue-100 shadow-[0_10px_35px_-5px_rgba(0,102,255,0.12)]'
                    : 'bg-[#0f1d38] text-white border-blue-900 shadow-black/80'
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 text-blue-600 dark:text-sky-400 border-b border-blue-500/20 mb-1 flex items-center justify-between">
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
                            ? 'bg-[#0066FF] text-white shadow-sm'
                            : isDay
                            ? 'hover:bg-blue-50 text-slate-700'
                            : 'hover:bg-blue-950/60 text-blue-100'
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
              className={`p-2 rounded-2xl border transition active:scale-95 cursor-pointer backdrop-blur-md shadow-xs ${
                isDay
                  ? 'border-blue-100 bg-blue-50/70 hover:bg-blue-100/70 text-slate-800'
                  : 'border-white/20 bg-white/10 hover:bg-white/20 text-white'
              }`}
              title="App Settings (সেটিংস ও ভাষা)"
            >
              <Settings className={`w-4 h-4 ${isDay ? 'text-[#0066FF]' : 'text-sky-300'}`} />
            </button>
          )}

          {/* 3. User Account / Profile / Sign In Button */}
          {onOpenProfile && (
            <button
              type="button"
              onClick={() => onOpenProfile('profile')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border transition active:scale-95 cursor-pointer backdrop-blur-md shadow-xs ${
                userProfile?.isSignedIn
                  ? isDay
                    ? 'border-blue-200 bg-blue-50 text-blue-900 shadow-sm'
                    : 'border-blue-400/50 bg-blue-950/40 text-white'
                  : isDay
                  ? 'border-blue-100 bg-blue-50/70 hover:bg-blue-100/70 text-slate-800'
                  : 'border-white/20 bg-white/10 hover:bg-white/20 text-white'
              }`}
              title={userProfile?.isSignedIn ? `Profile: ${userProfile.name}` : 'Sign In (লগইন)'}
            >
              <div className="w-6 h-6 rounded-full overflow-hidden border border-blue-400 shadow-xs flex items-center justify-center bg-[#0066FF] shrink-0">
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
              <div className="flex flex-col items-start leading-none text-left">
                <span className="text-xs font-bold truncate max-w-[110px]">
                  {userProfile?.isSignedIn
                    ? userProfile?.name?.split(' ')[0] || 'Profile'
                    : userProfile?.name || 'Guest User'}
                </span>
                {!userProfile?.isSignedIn && (
                  <span className={`text-[9px] font-medium ${isDay ? 'text-blue-600' : 'text-blue-200/90'}`}>
                    সাইন-ইন
                  </span>
                )}
              </div>
            </button>
          )}

          {/* PWA Install Button (Always accessible on Mobile and Desktop) */}
          {!isInstalled ? (
            <button
              type="button"
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-[#0066FF] hover:bg-[#0052CC] text-white font-bold text-xs shadow-md shadow-blue-500/25 transition active:scale-95 cursor-pointer border border-blue-400/40"
              title="Install Zikr+ App (অ্যাপ ইনস্টল করুন)"
            >
              <Smartphone className="w-3.5 h-3.5 text-white" />
              <span className="text-xs">{selectedLanguage === 'bn' ? 'অ্যাপ ইনস্টল' : 'Install'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowInstallModal(true)}
              className={`hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border text-xs font-semibold transition cursor-pointer ${
                isDay
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-white/10 text-sky-200 border-blue-400/30'
              }`}
              title="Zikr+ App Installed (ইনস্টল করা আছে)"
            >
              <Check className="w-3.5 h-3.5 text-blue-500 stroke-[3]" />
              <span className="text-[11px] font-bold">ইনস্টল্ড</span>
            </button>
          )}
        </div>
      </div>

      {/* Universal Install App Modal with 1-click install and device instructions */}
      <InstallAppModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        isDay={isDay}
      />
    </header>
  );
};
