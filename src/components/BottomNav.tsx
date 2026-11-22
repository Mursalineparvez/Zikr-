import React from 'react';
import { createPortal } from 'react-dom';
import { NavModule, ThemeMode, ZikrLanguage } from '../types';
import type { OtherSubSection } from './OtherIslamicHubView';
import { NAV_TRANSLATIONS } from '../utils/appTranslations';
import { soundHaptics } from '../utils/audioHaptics';
import {
  Home,
  Clock,
  ClipboardCheck,
  Plus,
  BookOpen,
  Sparkles,
  LayoutGrid,
} from 'lucide-react';

interface BottomNavProps {
  activeModule: NavModule;
  activeSubSection?: OtherSubSection;
  onModuleChange: (mod: NavModule) => void;
  onNavigateAnyPage?: (pageId: string) => void;
  onOpenAddModal?: () => void;
  onOpenAssistant?: () => void;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  counterBadge?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeModule,
  onModuleChange,
  onOpenAddModal,
  onOpenAssistant,
  themeMode = 'day',
  selectedLanguage = 'bn',
  soundEnabled = true,
  counterBadge,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';

  // All sub-modules grouped under the "আরও" (More / Hub) tab
  const otherModules: NavModule[] = [
    'other',
    'namaj',
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
    'hayatus_sahaba',
    'islamic_history_wars',
    'seerat_un_nabi',
    'araber_gotro',
    'nobi_24_hours',
  ];
  const isOtherActive = otherModules.includes(activeModule);

  const navigateToModule = (mod: NavModule) => {
    if (soundEnabled) soundHaptics.playTap();
    onModuleChange(mod);
  };

  const primaryItems = [
    {
      id: 'zikir_counter' as NavModule,
      label: isBn ? 'জিকির' : NAV_TRANSLATIONS.zikir_counter[selectedLanguage] || 'Zikr',
      icon: (isActive: boolean) => (
        <Home
          className={`w-5 h-5 sm:w-[22px] sm:h-[22px] transition-all duration-200 ${
            isActive
              ? 'fill-[var(--app-primary,#006A4E)] text-[var(--app-primary,#006A4E)] stroke-[2.2]'
              : 'text-gray-500 dark:text-gray-400 stroke-[1.8]'
          }`}
        />
      ),
      badge: counterBadge && counterBadge > 0 ? counterBadge : undefined,
      isActive: activeModule === 'zikir_counter',
    },
    {
      id: 'quran' as NavModule,
      label: isBn ? 'কুরআন' : NAV_TRANSLATIONS.quran[selectedLanguage] || 'Quran',
      icon: (isActive: boolean) => (
        <BookOpen
          className={`w-5 h-5 sm:w-[22px] sm:h-[22px] transition-all duration-200 ${
            isActive
              ? 'text-[var(--app-primary,#006A4E)] stroke-[2.4]'
              : 'text-gray-500 dark:text-gray-400 stroke-[1.8]'
          }`}
        />
      ),
      isActive: activeModule === 'quran',
    },
    {
      id: 'salat_time' as NavModule,
      label: isBn ? 'সালাত' : NAV_TRANSLATIONS.salat_time[selectedLanguage] || 'Salat',
      icon: (isActive: boolean) => (
        <Clock
          className={`w-5 h-5 sm:w-[22px] sm:h-[22px] transition-all duration-200 ${
            isActive
              ? 'text-[var(--app-primary,#006A4E)] stroke-[2.4]'
              : 'text-gray-500 dark:text-gray-400 stroke-[1.8]'
          }`}
        />
      ),
      isActive: activeModule === 'salat_time',
    },
    {
      id: 'aamal_tracker' as NavModule,
      label: isBn ? 'আমল' : NAV_TRANSLATIONS.aamal_tracker[selectedLanguage] || 'Aamal',
      icon: (isActive: boolean) => (
        <ClipboardCheck
          className={`w-5 h-5 sm:w-[22px] sm:h-[22px] transition-all duration-200 ${
            isActive
              ? 'text-[var(--app-primary,#006A4E)] stroke-[2.4]'
              : 'text-gray-500 dark:text-gray-400 stroke-[1.8]'
          }`}
        />
      ),
      isActive: activeModule === 'aamal_tracker',
    },
  ];

  const navContent = (
    <>
      {/* Floating Add Zikr Button (Only on Zikr Counter tab) */}
      {activeModule === 'zikir_counter' && onOpenAddModal && (
        <button
          type="button"
          onClick={onOpenAddModal}
          className="fixed bottom-[74px] right-4 sm:right-8 z-[64] w-13 h-13 sm:w-14 sm:h-14 rounded-2xl active:scale-95 text-white shadow-2xl flex items-center justify-center transition-all cursor-pointer bg-[var(--app-primary,#006A4E)] hover:bg-[var(--app-primary-dark,#005439)] border border-white/25"
          aria-label="Add New Zikr"
          title="Add New Custom Zikr"
        >
          <Plus className="w-7 h-7 stroke-[3]" />
        </button>
      )}

      {/* Universal Bottom Dock across ALL pages, sub-pages & reading views */}
      <nav
        aria-label={isBn ? 'মূল নেভিগেশন' : 'Main Navigation'}
        className={`fixed bottom-0 left-0 right-0 z-[65] transition-colors duration-200 border-t ${
          isDay
            ? 'bg-white/95 backdrop-blur-md border-[var(--app-border,#e2e8f0)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]'
            : 'bg-[#0b1e22]/95 backdrop-blur-md border-[#14373e] shadow-[0_-6px_24px_rgba(0,0,0,0.45)]'
        }`}
      >
        <div className="max-w-2xl mx-auto grid grid-cols-6 items-center px-1 pt-1 pb-1.5 pb-safe select-none">
          {primaryItems.map((item) => {
            const isActive = item.isActive;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => navigateToModule(item.id)}
                className={`min-h-[46px] flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer relative ${
                  isActive
                    ? 'text-[var(--app-primary,#006A4E)] dark:text-emerald-400 font-bold'
                    : isDay
                    ? 'text-gray-500 hover:text-gray-800 font-medium'
                    : 'text-gray-400 hover:text-gray-100 font-medium'
                }`}
              >
                <div className="relative flex items-center justify-center">
                  {item.icon(isActive)}
                  {item.badge !== undefined && (
                    <span className="absolute -top-1.5 -right-3 text-[9px] min-w-[16px] h-4 px-1 rounded-full font-mono font-bold flex items-center justify-center bg-[var(--app-primary,#006A4E)] text-white shadow-xs">
                      {item.badge > 999 ? '999+' : item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10.5px] sm:text-xs mt-1 leading-none tracking-tight text-center whitespace-nowrap truncate max-w-full px-0.5 ${
                    isActive
                      ? 'text-[var(--app-primary,#006A4E)] dark:text-emerald-400 font-bold'
                      : isDay
                      ? 'text-gray-600'
                      : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}

          {/* 5. AI Knowledge Assistant Button (Always accessible at bottom on every page) */}
          <button
            type="button"
            onClick={() => {
              if (soundEnabled) soundHaptics.playTap();
              onOpenAssistant?.();
            }}
            className={`min-h-[46px] flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer relative ${
              isDay
                ? 'text-emerald-700 hover:bg-emerald-50/90 font-bold'
                : 'text-amber-300 hover:bg-emerald-950/60 font-bold'
            }`}
            title={isBn ? 'Zikr+ AI তথ্য সহায়ক খুলুন' : 'Open Zikr+ AI Assistant'}
          >
            <div
              className={`w-6 h-5 rounded-lg flex items-center justify-center ${
                isDay
                  ? 'bg-emerald-100/90 text-emerald-700'
                  : 'bg-amber-400/15 text-amber-300'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
            <span className="text-[10.5px] sm:text-xs mt-1 leading-none tracking-tight text-center whitespace-nowrap truncate max-w-full px-0.5 font-bold">
              {isBn ? 'AI তথ্য' : 'AI Info'}
            </span>
          </button>

          {/* 6. More / Other Islamic Hub ("আরও") */}
          <button
            type="button"
            onClick={() => navigateToModule('other')}
            className={`min-h-[46px] flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer relative ${
              isOtherActive
                ? 'text-[var(--app-primary,#006A4E)] dark:text-emerald-400 font-bold'
                : isDay
                ? 'text-gray-500 hover:text-gray-800 font-medium'
                : 'text-gray-400 hover:text-gray-100 font-medium'
            }`}
            title={isBn ? 'আরও ফিচার দেখুন' : NAV_TRANSLATIONS.other[selectedLanguage] || 'More'}
          >
            <div className="relative flex items-center justify-center">
              <LayoutGrid
                className={`w-5 h-5 sm:w-[22px] sm:h-[22px] transition-all duration-200 ${
                  isOtherActive
                    ? 'text-[var(--app-primary,#006A4E)] dark:text-emerald-400 stroke-[2.4]'
                    : 'text-gray-500 dark:text-gray-400 stroke-[1.9]'
                }`}
              />
            </div>
            <span
              className={`text-[10.5px] sm:text-xs mt-1 leading-none tracking-tight text-center whitespace-nowrap truncate max-w-full px-0.5 ${
                isOtherActive
                  ? 'text-[var(--app-primary,#006A4E)] dark:text-emerald-400 font-bold'
                  : isDay
                  ? 'text-gray-600'
                  : 'text-gray-400'
              }`}
            >
              {isBn ? 'আরও' : NAV_TRANSLATIONS.other[selectedLanguage] || 'More'}
            </span>
          </button>
        </div>
      </nav>
    </>
  );

  if (typeof document !== 'undefined') {
    return createPortal(navContent, document.body);
  }
  return navContent;
};
