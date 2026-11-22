import React, { useState } from 'react';
import {
  Sparkles,
  WifiOff,
} from 'lucide-react';
import { usePWAInstall, useOnlineStatus } from '../hooks/usePWAInstall';
import { NavModule, ThemeMode, ZikrLanguage, UserProfile } from '../types';

const InstallAppModal = React.lazy(() =>
  import('./InstallAppModal').then((m) => ({ default: m.InstallAppModal }))
);

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
  onOpenAssistant?: () => void;
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
  onOpenAssistant,
}) => {
  const isOnline = useOnlineStatus();
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showInstallModal, setShowInstallModal] = useState(false);

  const handleInstallClick = async () => {
    if (isInstallable) {
      const ok = await install();
      if (ok) {
        try {
          const confettiModule = await import('canvas-confetti');
          const confetti = (confettiModule as any).default || confettiModule;
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
    'prophets_25',
    'allah_names',
    'history_timeline',
  ];
  const isOtherActive = otherModules.includes(activeModule);

  return (
    <header className="sticky top-0 z-40 transition-all duration-300">
      {/* Top Main Header Bar (Dynamic Light Color Theme Primary) */}
      <div className="bg-[var(--app-primary,#006A4E)] text-white px-4 py-2.5 shadow-md transition-colors duration-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          {/* Brand Logo & Name: Zikr+ PWA */}
          <div
            className="flex items-center gap-2 cursor-pointer select-none group shrink-0"
            onClick={() => onModuleChange('zikir_counter')}
          >
            {/* Zikr+ Official Logo Circle Badge */}
            <div className="w-9 h-9 rounded-full bg-[var(--app-primary-dark,#005740)] border border-white/35 flex items-center justify-center shadow-md transition transform group-hover:scale-105 overflow-hidden p-0.5 shrink-0">
              <img
                src="/pwa-192x192.png"
                alt="Zikr+ Logo"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/icon.svg';
                }}
              />
            </div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-0.5">
                Zikr<span className="text-[var(--app-primary-light,#6ee7b7)] font-black">+</span>
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/30 bg-white/10 text-white shadow-xs">
                PWA
              </span>
            </div>
          </div>

          {/* Right Status & Zikr+ AI Assistant Chat Button */}
          <div className="flex items-center gap-2 shrink-0">
            {!isOnline && (
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-300/40 text-amber-200 text-[10px] font-bold whitespace-nowrap shrink-0"
                title={selectedLanguage === 'bn' ? 'অফলাইন মোড সক্রিয়' : 'Offline mode active'}
              >
                <WifiOff className="w-3 h-3 text-amber-300" />
                <span className="hidden sm:inline">{selectedLanguage === 'bn' ? 'অফলাইন' : selectedLanguage === 'ar' ? 'غير متصل' : 'Offline'}</span>
              </div>
            )}
            
            {/* Zikr+ AI Assistant Chat Button */}
            {onOpenAssistant && (
              <button
                type="button"
                onClick={onOpenAssistant}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--app-primary-dark,#005740)] hover:bg-[var(--app-primary-light,#6ee7b7)]/20 border border-white/40 text-white shadow-md transition transform hover:scale-105 active:scale-95 group shrink-0 cursor-pointer"
                title={selectedLanguage === 'bn' ? 'Zikr+ AI সহকারী ও চ্যাটবট' : 'Zikr+ AI Assistant & Chatbot'}
              >
                <Sparkles className="w-4 h-4 text-[var(--app-primary-light,#6ee7b7)] animate-pulse" />
                <span className="text-xs font-extrabold tracking-wide">
                  Zikr<span className="text-[var(--app-primary-light,#6ee7b7)]">+</span>
                </span>
                <span className="hidden sm:inline text-[10px] font-bold px-1.5 py-0.2 rounded bg-white/20 text-white/90">
                  AI
                </span>
              </button>
            )}
          </div>
        </div>
      </div>


      {/* Sub-Header Salam & Date Banner */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[var(--app-border,#e2e8f0)] px-4 py-2 text-slate-700 shadow-xs transition-colors duration-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 text-xs">
          {/* Left Salam Greeting + Signed-in User Name Below */}
          <div className="flex items-center gap-2 min-w-0">
            <Sparkles className="w-4 h-4 text-[var(--app-primary-mid,#059669)] shrink-0" />
            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-base text-[var(--app-primary,#006A4E)] font-extrabold leading-tight select-none truncate">
                {selectedLanguage === 'bn'
                  ? 'আসসালামু আলাইকুম'
                  : selectedLanguage === 'ar' || selectedLanguage === 'ur'
                  ? 'السَّلَامُ عَلَيْكُمْ'
                  : selectedLanguage === 'hi'
                  ? 'अस्सलामु अलैकुम'
                  : 'Assalamu Alaikum'}
              </span>
              {userProfile?.isSignedIn && userProfile?.name?.trim() && (
                <span className="text-[11px] sm:text-xs font-bold text-slate-700 leading-tight truncate">
                  {userProfile.name.trim()}
                </span>
              )}
            </div>
          </div>

          {/* Right Live Gregorian Date */}
          <div className="text-slate-500 font-semibold text-xs whitespace-nowrap shrink-0">
            {new Date().toLocaleDateString(
              selectedLanguage === 'bn'
                ? 'bn-BD'
                : selectedLanguage === 'ar'
                ? 'ar-SA'
                : selectedLanguage === 'ur'
                ? 'ur-PK'
                : selectedLanguage === 'hi'
                ? 'hi-IN'
                : selectedLanguage === 'id'
                ? 'id-ID'
                : selectedLanguage === 'tr'
                ? 'tr-TR'
                : 'en-US',
              {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }
            )}
          </div>
        </div>
      </div>

      {/* Universal Install App Modal */}
      {showInstallModal && (
        <React.Suspense fallback={null}>
          <InstallAppModal
            isOpen={showInstallModal}
            onClose={() => setShowInstallModal(false)}
            isDay={isDay}
            selectedLanguage={selectedLanguage}
          />
        </React.Suspense>
      )}
    </header>
  );
};
