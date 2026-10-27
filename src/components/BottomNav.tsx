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
          className="fixed bottom-20 sm:bottom-20 right-4 sm:right-8 z-40 w-13 h-13 sm:w-14 sm:h-14 rounded-2xl active:scale-95 text-white shadow-2xl flex items-center justify-center transition-all cursor-pointer bg-[#006A4E] hover:bg-[#005439] border border-emerald-400/30"
          aria-label="Add New Zikr"
          title="Add New Custom Zikr"
        >
          <Plus className="w-7 h-7 stroke-[3]" />
        </button>
      )}

      {/* Unified Bottom Navigation Bar matching reference screenshot (#006A4E Deep Forest Emerald) */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 px-3 py-2 bg-[#006A4E] text-white shadow-2xl border-t border-emerald-700/50">
        <div className="max-w-md mx-auto flex items-center justify-around gap-1">
          {navItems.map((item) => {
            return (
              <button
                key={item.id}
                onClick={() => onModuleChange(item.id)}
                className={`relative flex items-center justify-center py-2 px-3 rounded-2xl transition-all duration-200 active:scale-95 cursor-pointer group ${
                  item.isActive
                    ? 'bg-[#008763] text-white font-extrabold shadow-sm'
                    : 'text-emerald-100/80 hover:text-white hover:bg-white/10 font-semibold'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <div className="transition-transform duration-200 text-base sm:text-lg">
                    {item.icon}
                  </div>
                  <span className="text-xs tracking-tight whitespace-nowrap">
                    {item.label}
                  </span>
                  {item.badge !== undefined && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold leading-none bg-emerald-400 text-slate-950">
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
