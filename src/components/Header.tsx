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
  Layers,
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
            colors: ['#007e8a', '#14b8a6', '#06b6d4', '#10b981'],
          });
        } catch {}
        return;
      }
    }
    setShowInstallModal(true);
  };

  const isDay = themeMode === 'day';

  const otherModules: NavModule[] = [
    'other',
    'dua',
    'hadith',
    'kitab',
    'hajj_checklist',
    'umrah_guide',
    'hajj_route_map',
    'hajj_essentials',
    'tablig',
    'allah_names',
    'history_timeline',
  ];
  const isOtherActive = otherModules.includes(activeModule);

  return (
    <header className="sticky top-0 z-40 transition-all duration-300">
      {/* Top Main Header Bar (#006A4E Deep Forest Emerald Green) */}
      <div className="bg-[#006A4E] text-white px-4 py-2.5 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          {/* Brand Logo & Name: Zikr+ PWA */}
          <div
            className="flex items-center gap-2 cursor-pointer select-none group shrink-0"
            onClick={() => onModuleChange('zikir_counter')}
          >
            {/* Green Dome Icon in Circle Badge */}
            <div className="w-9 h-9 rounded-full bg-[#005740] border border-emerald-400/40 flex items-center justify-center shadow-inner text-white transition transform group-hover:scale-105">
              <svg className="w-5 h-5 fill-current text-emerald-200" viewBox="0 0 24 24">
                <path d="M12 2C8 6 4 9 4 14a8 8 0 0 0 16 0c0-5-4-8-8-12zm0 18a6 6 0 0 1-6-6c0-3.3 2.7-5.8 6-9.1 3.3 3.3 6 5.8 6 9.1a6 6 0 0 1-6 6z"/>
              </svg>
            </div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-0.5">
                Zikr<span className="text-emerald-300 font-black">+</span>
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/30 bg-white/10 text-white shadow-xs">
                PWA
              </span>
            </div>
          </div>

          {/* Right Action Icons: Flag Dropdown, Settings Gear, Profile Pill */}
          <div className="flex items-center gap-2">
            {!isOnline && (
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-300/40 text-amber-200 text-[10px] font-bold"
                title="অফলাইন মোড সক্রিয়"
              >
                <WifiOff className="w-3 h-3 text-amber-300" />
                <span className="hidden sm:inline">Offline</span>
              </div>
            )}

            {/* 1. Flag Language Dropdown Pill */}
            <div className="relative" ref={langDropdownRef}>
              <button
                type="button"
                onClick={() => setIsLangOpen((prev) => !prev)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-white/20 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold transition active:scale-95 cursor-pointer shadow-xs"
                title="Change Language"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-200" />
                <span className="text-sm leading-none">{currentLangObj.flag}</span>
                <ChevronDown className={`w-3 h-3 text-white/80 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 max-h-80 overflow-y-auto rounded-2xl border border-emerald-600/30 bg-[#005740] text-white shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 scrollbar-thin">
                  <div className="text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 text-emerald-300 border-b border-emerald-600/40 mb-1 flex items-center justify-between">
                    <span>App Language</span>
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
                              ? 'bg-emerald-400 text-slate-950 shadow-sm font-extrabold'
                              : 'hover:bg-white/10 text-emerald-100'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="text-base shrink-0">{langItem.flag}</span>
                            <span className="truncate">{langItem.nativeName}</span>
                          </div>
                          {isSelected && <Check className="w-3.5 h-3.5 text-slate-950 shrink-0 stroke-[3]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 2. Settings Gear Button */}
            {onOpenProfile && (
              <button
                type="button"
                onClick={() => onOpenProfile('settings')}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/20 bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition active:scale-95 cursor-pointer relative shadow-xs"
                title="Settings"
              >
                <Settings className="w-4 h-4 text-emerald-100" />
              </button>
            )}

            {/* 3. User Profile Pill Button (showing "Md." or initials/name like reference screenshot) */}
            {onOpenProfile && (
              <button
                type="button"
                onClick={() => onOpenProfile('profile')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/30 bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition active:scale-95 cursor-pointer shadow-xs"
                title={userProfile?.isSignedIn ? `Profile: ${userProfile.name}` : 'Sign In'}
              >
                <div className="w-5 h-5 rounded-full overflow-hidden bg-emerald-300/30 text-emerald-100 flex items-center justify-center border border-white/40 shrink-0 text-[10px]">
                  {userProfile?.isSignedIn && userProfile?.photoUrl ? (
                    <img
                      src={userProfile.photoUrl}
                      alt={userProfile.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span>{userProfile?.isSignedIn ? (userProfile.name?.slice(0, 2) || 'Md') : 'Md'}</span>
                  )}
                </div>
                <span className="truncate max-w-[70px] sm:max-w-[90px] text-xs font-bold text-white">
                  {userProfile?.isSignedIn
                    ? userProfile?.name?.split(' ')[0] || 'Md.'
                    : 'Md.'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Top Module Navigation Bar (cleanly integrated at top, eliminating sticky bottom bar) */}
      <div className="bg-[#005740] border-t border-emerald-600/30 px-3 py-1.5 text-white shadow-inner">
        <div className="max-w-4xl mx-auto flex items-center justify-start sm:justify-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none py-0.5">
          {[
            {
              id: 'zikir_counter' as NavModule,
              label: NAV_TRANSLATIONS.zikir_counter[selectedLanguage],
              icon: <span className="text-sm">📿</span>,
              isActive: activeModule === 'zikir_counter',
            },
            {
              id: 'quran' as NavModule,
              label: NAV_TRANSLATIONS.quran[selectedLanguage],
              icon: <BookOpen className="w-3.5 h-3.5" />,
              isActive: activeModule === 'quran',
            },
            {
              id: 'salat_time' as NavModule,
              label: NAV_TRANSLATIONS.salat_time[selectedLanguage],
              icon: <Clock className="w-3.5 h-3.5" />,
              isActive: activeModule === 'salat_time',
            },
            {
              id: 'aamal_tracker' as NavModule,
              label: NAV_TRANSLATIONS.aamal_tracker[selectedLanguage],
              icon: <Award className="w-3.5 h-3.5" />,
              isActive: activeModule === 'aamal_tracker',
            },
            {
              id: 'other' as NavModule,
              label: NAV_TRANSLATIONS.other[selectedLanguage] || 'Other',
              icon: <Layers className="w-3.5 h-3.5" />,
              isActive: isOtherActive,
            },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onModuleChange(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer whitespace-nowrap shrink-0 ${
                item.isActive
                  ? 'bg-white text-[#006A4E] shadow-sm font-extrabold'
                  : 'text-emerald-100/90 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sub-Header Bismillah Calligraphy & Date Banner */}
      <div className="bg-white border-b border-slate-200/80 px-4 py-2 text-slate-700 shadow-xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 text-xs">
          {/* Left Bismillah Calligraphy */}
          <div className="flex items-center gap-1.5 font-arabic text-base sm:text-lg text-[#006A4E] font-bold">
            <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
            <span dir="rtl" className="select-none">بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ</span>
          </div>

          {/* Right Live Gregorian Date */}
          <div className="text-slate-500 font-semibold text-xs whitespace-nowrap">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        </div>
      </div>

      {/* Universal Install App Modal */}
      <InstallAppModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        isDay={isDay}
      />
    </header>
  );
};
