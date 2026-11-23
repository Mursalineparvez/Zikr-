import React, { useEffect, useState } from 'react';
import { User, WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/usePWAInstall';
import { NavModule, ThemeMode, ZikrLanguage, UserProfile } from '../types';

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
  selectedLanguage = 'bn',
  userProfile,
  onOpenProfile,
}) => {
  const isOnline = useOnlineStatus();
  const [photoLoadError, setPhotoLoadError] = useState(false);

  useEffect(() => {
    setPhotoLoadError(false);
  }, [userProfile?.photoUrl]);

  const hasProfilePhoto = Boolean(userProfile?.photoUrl && !photoLoadError);

  return (
    <header className="sticky top-0 z-40 transition-all duration-300">
      {/* Compact Header Bar: User Profile Avatar + Salam & Name + Live Date */}
      <div className="bg-white/95 backdrop-blur-md border-b border-[var(--app-border,#e2e8f0)] px-4 py-2 text-slate-700 shadow-xs transition-colors duration-300">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2 text-xs">
          {/* Left User Profile Picture + Salam Greeting & User Name */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              onClick={() => onOpenProfile?.('profile')}
              aria-label={
                selectedLanguage === 'bn'
                  ? 'অ্যাকাউন্টের বিস্তারিত দেখুন'
                  : selectedLanguage === 'ar'
                  ? 'عرض تفاصيل الحساب'
                  : 'View account details'
              }
              title={
                selectedLanguage === 'bn'
                  ? 'অ্যাকাউন্টের সব তথ্য দেখুন'
                  : selectedLanguage === 'ar'
                  ? 'عرض جميع تفاصيل الحساب'
                  : 'View full account details'
              }
              className="w-9 h-9 rounded-full border border-[var(--app-primary,#006A4E)]/30 bg-emerald-50 flex items-center justify-center shadow-sm transition transform hover:scale-105 active:scale-95 overflow-hidden shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--app-primary,#006A4E)]/40"
            >
              {hasProfilePhoto ? (
                <img
                  src={userProfile?.photoUrl}
                  alt={userProfile?.name || 'User Profile'}
                  className="w-full h-full object-cover rounded-full"
                  onError={() => setPhotoLoadError(true)}
                />
              ) : (
                <User className="w-5 h-5 text-[var(--app-primary,#006A4E)]" />
              )}
            </button>

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

          {/* Right Offline Badge (if offline) + Live Gregorian Date */}
          <div className="flex items-center gap-2 whitespace-nowrap shrink-0">
            {!isOnline && (
              <div
                className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/35 text-amber-700 text-[10px] font-bold"
                title={selectedLanguage === 'bn' ? 'অফলাইন মোড সক্রিয়' : 'Offline mode active'}
              >
                <WifiOff className="w-3 h-3 text-amber-600" />
                <span className="hidden sm:inline">
                  {selectedLanguage === 'bn' ? 'অফলাইন' : selectedLanguage === 'ar' ? 'غير متصل' : 'Offline'}
                </span>
              </div>
            )}
            <div className="text-slate-500 font-semibold text-xs">
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
      </div>
    </header>
  );
};
