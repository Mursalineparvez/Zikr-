import React from 'react';
import { NavModule, ThemeMode, ZikrLanguage } from '../types';
import { NAV_TRANSLATIONS } from '../utils/appTranslations';
import {
  BookOpen,
  Clock,
  Award,
  Plus,
  Sparkles,
  Layers,
} from 'lucide-react';

interface BottomNavProps {
  activeModule: NavModule;
  onModuleChange: (mod: NavModule) => void;
  onOpenAddModal: () => void;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  counterBadge?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeModule,
  onModuleChange,
  onOpenAddModal,
  themeMode = 'day',
  selectedLanguage = 'bn',
  counterBadge,
}) => {
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

  const navItems: Array<{
    id: NavModule;
    label: string;
    arabic: string;
    icon: React.ReactNode;
    badge?: number | string;
    isActive: boolean;
  }> = [
    {
      id: 'zikir_counter',
      label: NAV_TRANSLATIONS.zikir_counter[selectedLanguage],
      arabic: 'الذِّكْر',
      icon: <span className="text-base sm:text-lg">📿</span>,
      badge: counterBadge && counterBadge > 0 ? counterBadge : undefined,
      isActive: activeModule === 'zikir_counter',
    },
    {
      id: 'quran',
      label: NAV_TRANSLATIONS.quran[selectedLanguage],
      arabic: 'القرآن',
      icon: <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />,
      isActive: activeModule === 'quran',
    },
    {
      id: 'salat_time',
      label: NAV_TRANSLATIONS.salat_time[selectedLanguage],
      arabic: 'الصلاة',
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      isActive: activeModule === 'salat_time',
    },
    {
      id: 'aamal_tracker',
      label: NAV_TRANSLATIONS.aamal_tracker[selectedLanguage],
      arabic: 'الأعمال',
      icon: <Award className="w-4 h-4 sm:w-5 sm:h-5" />,
      isActive: activeModule === 'aamal_tracker',
    },
    {
      id: 'other',
      label: NAV_TRANSLATIONS.other[selectedLanguage] || 'Other',
      arabic: 'أخرى',
      icon: <Layers className="w-4 h-4 sm:w-5 sm:h-5" />,
      isActive: isOtherActive,
    },
  ];

  return (
    <>
      {/* Floating Add-Zikir Button (visible when on Zikir Counter) */}
      {activeModule === 'zikir_counter' && (
        <button
          onClick={onOpenAddModal}
          className={`fixed bottom-20 sm:bottom-20 right-4 sm:right-8 z-40 w-13 h-13 sm:w-14 sm:h-14 rounded-2xl active:scale-95 text-white shadow-2xl flex items-center justify-center transition-transform cursor-pointer border ${
            isDay
              ? 'bg-[#006747] hover:bg-[#005a3e] border-emerald-400/50 shadow-[#006747]/30'
              : 'bg-[#006747] hover:bg-[#154f53] text-white border-teal-400/50 shadow-[#082024]/80'
          }`}
          aria-label="Add New Zikr"
          title="Add New Custom Zikr"
        >
          <Plus className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
        </button>
      )}

      {/* Unified Bottom Navigation Bar across Mobile, Tablet & Desktop */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-30 px-2 py-1.5 sm:pb-2.5 backdrop-blur-xl transition-colors duration-300 border-t ${
          isDay
            ? 'bg-white/95 border-[#d6e8e5] shadow-2xl shadow-[#006747]/15'
            : 'bg-[#0a262c]/95 border-[#194c55] shadow-2xl shadow-[#082024]/80'
        }`}
      >
        <div className="max-w-2xl mx-auto flex items-center justify-around gap-1 sm:gap-2 py-0.5">
          {navItems.map((item) => {
            return (
              <button
                key={item.id}
                onClick={() => onModuleChange(item.id)}
                className={`relative flex flex-col items-center justify-center flex-1 py-1 sm:py-1.5 px-1 rounded-xl sm:rounded-2xl transition-all duration-200 active:scale-95 cursor-pointer ${
                  item.isActive
                    ? isDay
                      ? 'text-white font-extrabold bg-[#006747] shadow-md shadow-[#006747]/25'
                      : 'text-white font-extrabold bg-[#006747] border border-[#247b82] shadow-md'
                    : isDay
                    ? 'text-[#456c72] hover:text-[#006747] hover:bg-emerald-50/60 font-semibold'
                    : 'text-[#8ab8c0] hover:text-[#10b981] hover:bg-teal-950/40 font-semibold'
                }`}
              >
                <div className="flex items-center justify-center relative">
                  {item.icon}
                  {item.badge !== undefined && (
                    <span
                      className={`absolute -top-1 -right-3 text-[9px] px-1 py-0.2 rounded-full font-mono font-bold leading-none ${
                        item.isActive
                          ? 'bg-amber-300 text-slate-900 shadow-xs'
                          : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] sm:text-xs tracking-tight mt-0.5 whitespace-nowrap">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
