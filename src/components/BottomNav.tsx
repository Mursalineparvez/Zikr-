import React from 'react';
import { NavModule, ThemeMode, ZikrLanguage } from '../types';
import { NAV_TRANSLATIONS } from '../utils/appTranslations';
import {
  Home,
  Clock,
  ClipboardCheck,
  MoreHorizontal,
  Plus,
  BookOpen,
  Sparkles,
} from 'lucide-react';

interface BottomNavProps {
  activeModule: NavModule;
  onModuleChange: (mod: NavModule) => void;
  onOpenAddModal?: () => void;
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

  // Modules that map to the "আরও" (Other / Hub) tab
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
    'allah_names',
    'history_timeline',
    'hayatus_sahaba',
    'islamic_history_wars',
    'seerat_un_nabi',
  ];
  const isOtherActive = otherModules.includes(activeModule);

  // 5 Bottom Navigation items matching user reference screenshot
  // 1. Zikr (Home icon, green when active)
  // 2. Al-Quran (BookOpen icon)
  // 3. Salat Time (Prayer times schedule)
  // 4. Aamal Tracker (Report/checklist icon)
  // 5. Other (Three dots icon with label "আরও")
  const navItems = [
    {
      id: 'zikir_counter' as NavModule,
      label: selectedLanguage === 'bn' ? 'জিকির' : NAV_TRANSLATIONS.zikir_counter[selectedLanguage] || 'Zikr',
      icon: (isActive: boolean) => (
        <Home
          className={`w-[22px] h-[22px] sm:w-6 sm:h-6 transition-all duration-200 ${
            isActive ? 'fill-[#006A4E] text-[#006A4E] stroke-[2.2]' : 'text-gray-500 dark:text-gray-400 stroke-[1.8]'
          }`}
        />
      ),
      badge: counterBadge && counterBadge > 0 ? counterBadge : undefined,
      isActive: activeModule === 'zikir_counter',
    },
    {
      id: 'quran' as NavModule,
      label: selectedLanguage === 'bn' ? 'আল-কোরআন' : (NAV_TRANSLATIONS.quran[selectedLanguage] || 'Quran'),
      icon: (isActive: boolean) => (
        <BookOpen
          className={`w-[22px] h-[22px] sm:w-6 sm:h-6 transition-all duration-200 ${
            isActive ? 'text-[#006A4E] stroke-[2.3]' : 'text-gray-500 dark:text-gray-400 stroke-[1.8]'
          }`}
        />
      ),
      isActive: activeModule === 'quran',
    },
    {
      id: 'salat_time' as NavModule,
      label: selectedLanguage === 'bn' ? 'সালাত টাইম' : (NAV_TRANSLATIONS.salat_time[selectedLanguage] || 'Salat Time'),
      icon: (isActive: boolean) => (
        <Clock
          className={`w-[22px] h-[22px] sm:w-6 sm:h-6 transition-all duration-200 ${
            isActive ? 'text-[#006A4E] stroke-[2.5]' : 'text-gray-500 dark:text-gray-400 stroke-[1.8]'
          }`}
        />
      ),
      isActive: activeModule === 'salat_time',
    },
    {
      id: 'aamal_tracker' as NavModule,
      label: selectedLanguage === 'bn' ? 'আমল ট্র্যাকার' : (NAV_TRANSLATIONS.aamal_tracker[selectedLanguage] || 'Aamal'),
      icon: (isActive: boolean) => (
        // Clean document / report checklist icon matching screenshot
        <ClipboardCheck
          className={`w-[22px] h-[22px] sm:w-6 sm:h-6 transition-all duration-200 ${
            isActive ? 'text-[#006A4E] stroke-[2.5]' : 'text-gray-500 dark:text-gray-400 stroke-[1.8]'
          }`}
        />
      ),
      isActive: activeModule === 'aamal_tracker',
    },
    {
      id: 'other' as NavModule,
      label: selectedLanguage === 'bn' ? 'আরও' : (NAV_TRANSLATIONS.other[selectedLanguage] || 'More'),
      icon: (isActive: boolean) => (
        // Three horizontal dots icon matching the screenshot exactly
        <MoreHorizontal
          className={`w-[22px] h-[22px] sm:w-6 sm:h-6 transition-all duration-200 ${
            isActive ? 'text-[#006A4E] stroke-[2.8]' : 'text-gray-500 dark:text-gray-400 stroke-[2]'
          }`}
        />
      ),
      isActive: isOtherActive,
    },
  ];

  return (
    <>
      {/* Floating Add Zikr Button (Only on Zikr Counter tab) */}
      {activeModule === 'zikir_counter' && onOpenAddModal && (
        <button
          onClick={onOpenAddModal}
          className="fixed bottom-20 right-4 sm:right-8 z-40 w-13 h-13 sm:w-14 sm:h-14 rounded-2xl active:scale-95 text-white shadow-2xl flex items-center justify-center transition-all cursor-pointer bg-[#006A4E] hover:bg-[#005439] border border-emerald-400/30"
          aria-label="Add New Zikr"
          title="Add New Custom Zikr"
        >
          <Plus className="w-7 h-7 stroke-[3]" />
        </button>
      )}

      {/* Bottom Menu Bar matching reference screenshot */}
      <nav
        aria-label="Main Navigation"
        className={`fixed bottom-0 left-0 right-0 z-40 transition-colors duration-200 border-t ${
          isDay
            ? 'bg-white border-gray-200/90 shadow-[0_-3px_16px_rgba(0,0,0,0.06)]'
            : 'bg-[#0b1e22] border-[#14373e] shadow-[0_-4px_20px_rgba(0,0,0,0.4)]'
        }`}
      >
        <div className="max-w-md mx-auto grid grid-cols-5 items-center px-1 pt-1.5 pb-2 pb-safe select-none">
          {navItems.map((item) => {
            const isActive = item.isActive;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onModuleChange(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-0.5 rounded-xl transition-all duration-150 active:scale-95 cursor-pointer relative group ${
                  isActive
                    ? 'text-[#006A4E] dark:text-emerald-400 font-bold'
                    : isDay
                    ? 'text-gray-500 hover:text-gray-800 font-medium'
                    : 'text-gray-400 hover:text-gray-100 font-medium'
                }`}
              >
                {/* Icon with optional badge */}
                <div className="relative flex items-center justify-center">
                  {item.icon(isActive)}

                  {item.badge !== undefined && (
                    <span className="absolute -top-1.5 -right-3 text-[9px] min-w-[16px] h-4 px-1 rounded-full font-mono font-bold flex items-center justify-center bg-[#006A4E] text-white shadow-xs">
                      {item.badge > 999 ? '999+' : item.badge}
                    </span>
                  )}
                </div>

                {/* Text Label matching reference font size & alignment */}
                <span
                  className={`text-[11px] sm:text-xs mt-1 leading-tight tracking-tight text-center truncate w-full px-0.5 ${
                    isActive
                      ? 'text-[#006A4E] dark:text-emerald-400 font-bold'
                      : isDay
                      ? 'text-gray-600 dark:text-gray-300'
                      : 'text-gray-400'
                  }`}
                >
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
