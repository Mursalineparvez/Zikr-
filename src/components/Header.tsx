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
            {/* Zikr+ Official Logo Circle Badge */}
            <div className="w-9 h-9 rounded-full bg-[#005740] border border-emerald-400/50 flex items-center justify-center shadow-md transition transform group-hover:scale-105 overflow-hidden p-0.5 shrink-0">
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
                Zikr<span className="text-emerald-300 font-black">+</span>
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/30 bg-white/10 text-white shadow-xs">
                PWA
              </span>
            </div>
          </div>

          {/* Right Status (Settings & Account live inside My Account in Other) */}
          <div className="flex items-center gap-2">
            {!isOnline && (
              <div
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-300/40 text-amber-200 text-[10px] font-bold"
                title={selectedLanguage === 'bn' ? 'অফলাইন মোড সক্রিয়' : 'Offline mode active'}
              >
                <WifiOff className="w-3 h-3 text-amber-300" />
                <span className="hidden sm:inline">Offline</span>
              </div>
            )}
          </div>
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
      {showInstallModal && (
        <React.Suspense fallback={null}>
          <InstallAppModal
            isOpen={showInstallModal}
            onClose={() => setShowInstallModal(false)}
            isDay={isDay}
          />
        </React.Suspense>
      )}
    </header>
  );
};
