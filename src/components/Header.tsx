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
  onSwitchToCarePlus?: () => void;
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
  onSwitchToCarePlus,
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
      className={`sticky top-0 z-40 px-3 py-2.5 sm:px-6 transition-all duration-300 shadow-md ${
        isDay
          ? 'bg-[#006747] text-white shadow-[#006747]/20 border-b border-emerald-600/40'
          : 'bg-gradient-to-r from-[#061f24] via-[#0b2d35] to-[#0f3b45] text-white border-b border-teal-800/40 shadow-black/60'
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
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl shadow-md border border-white/20 object-cover"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white drop-shadow-xs flex items-center">
                <span>Zikr</span>
                <span className="text-amber-400 font-black text-lg sm:text-xl ml-0.5">+</span>
              </h1>
              <span className="text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-full font-bold bg-white/15 text-emerald-100 border border-white/20">
                PWA
              </span>
            </div>
            <p className="text-[10px] font-medium text-emerald-100/80 hidden sm:block">
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

          {/* CarePlus UI Switch Button */}
          {onSwitchToCarePlus && (
            <button
              type="button"
              onClick={onSwitchToCarePlus}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl bg-teal-400/20 hover:bg-teal-400/30 text-teal-200 font-bold text-xs border border-teal-300/40 backdrop-blur-md transition active:scale-95 cursor-pointer shadow-xs"
              title="CarePlus UI মোডে ফিরে যান"
            >
              <span>🩺</span>
              <span className="hidden sm:inline">CarePlus</span>
            </button>
          )}

          {/* 1. Quick Language Dropdown Selector (14 Languages) */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              onClick={() => setIsLangOpen((prev) => !prev)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition active:scale-95 cursor-pointer backdrop-blur-md shadow-xs"
              title="Change Language (ভাষা নির্বাচন করুন)"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-200" />
              <span className="text-sm leading-none">{currentLangObj.flag}</span>
              <span className="hidden sm:inline text-xs">{currentLangObj.label}</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div
                className={`absolute right-0 top-full mt-2 w-64 max-h-80 overflow-y-auto rounded-2xl border shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 scrollbar-thin ${
                  isDay
                    ? 'bg-white text-slate-800 border-[#cce8e2] shadow-xl'
                    : 'bg-[#092b30] text-white border-teal-700 shadow-black/80'
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
                            ? 'bg-[#006747] text-white shadow-sm'
                            : isDay
                            ? 'hover:bg-emerald-50 text-slate-700'
                            : 'hover:bg-white/10 text-emerald-100'
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
              className="p-2 rounded-2xl border border-white/20 bg-white/10 hover:bg-white/20 text-white transition active:scale-95 cursor-pointer backdrop-blur-md shadow-xs"
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
              className={`flex items-center gap-2 px-3 py-1.5 rounded-2xl border transition active:scale-95 cursor-pointer backdrop-blur-md shadow-xs ${
                userProfile?.isSignedIn
                  ? 'border-emerald-300/40 bg-white/20 text-white shadow-sm'
                  : 'border-white/20 bg-white/10 hover:bg-white/20 text-white'
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
              <div className="flex flex-col items-start leading-none text-left">
                <span className="text-xs font-bold truncate max-w-[110px] text-white">
                  {userProfile?.isSignedIn
                    ? userProfile?.name?.split(' ')[0] || 'Profile'
                    : userProfile?.name || 'Guest User'}
                </span>
                {!userProfile?.isSignedIn && (
                  <span className="text-[9px] font-medium text-emerald-200">
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-xs shadow-md transition active:scale-95 cursor-pointer border border-amber-300"
              title="Install Zikr+ App (অ্যাপ ইনস্টল করুন)"
            >
              <Smartphone className="w-3.5 h-3.5 text-slate-900" />
              <span className="text-xs">{selectedLanguage === 'bn' ? 'অ্যাপ ইনস্টল' : 'Install'}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowInstallModal(true)}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-2xl border border-white/20 bg-white/15 text-emerald-100 text-xs font-semibold transition cursor-pointer"
              title="Zikr+ App Installed (ইনস্টল করা আছে)"
            >
              <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />
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
