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
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeModule,
  onModuleChange,
  onOpenAddModal,
  themeMode = 'day',
  selectedLanguage = 'bn',
}) => {
  const isDay = themeMode === 'day';

  const otherModules: NavModule[] = ['other', 'dua', 'hadith', 'kitab', 'tablig', 'allah_names', 'hajj_umrah'];
  const isOtherActive = otherModules.includes(activeModule);

  const navItems: Array<{
    id: NavModule;
    label: string;
    arabic: string;
    icon: React.ReactNode;
    isActive: boolean;
  }> = [
    {
      id: 'zikir_counter',
      label: NAV_TRANSLATIONS.zikir_counter[selectedLanguage],
      arabic: 'الذِّكْر',
      icon: <span className="text-base">📿</span>,
      isActive: activeModule === 'zikir_counter',
    },
    {
      id: 'quran',
      label: NAV_TRANSLATIONS.quran[selectedLanguage],
      arabic: 'القرآن',
      icon: <BookOpen className="w-4 h-4" />,
      isActive: activeModule === 'quran',
    },
    {
      id: 'salat_time',
      label: NAV_TRANSLATIONS.salat_time[selectedLanguage],
      arabic: 'الصلاة',
      icon: <Clock className="w-4 h-4" />,
      isActive: activeModule === 'salat_time',
    },
    {
      id: 'aamal_tracker',
      label: NAV_TRANSLATIONS.aamal_tracker[selectedLanguage],
      arabic: 'الأعمال',
      icon: <Award className="w-4 h-4" />,
      isActive: activeModule === 'aamal_tracker',
    },
    {
      id: 'other',
      label: selectedLanguage === 'bn' ? 'অন্যান্য' : 'Other',
      arabic: 'أخرى',
      icon: <Layers className="w-4 h-4" />,
      isActive: isOtherActive,
    },
  ];

  return (
    <>
      {/* Floating Add-Zikir Button (visible when on Zikir Counter) */}
      {activeModule === 'zikir_counter' && (
        <button
          onClick={onOpenAddModal}
          className={`fixed bottom-20 sm:bottom-6 right-5 sm:right-8 z-40 w-14 h-14 rounded-2xl active:scale-95 text-white shadow-2xl flex items-center justify-center transition-transform cursor-pointer border ${
            isDay
              ? 'bg-[#006747] hover:bg-[#005a3e] border-emerald-400/50 shadow-[#006747]/30'
              : 'bg-[#1c6469] hover:bg-[#154f53] text-white border-teal-400/50 shadow-[#082024]/80'
          }`}
          aria-label="Add New Zikr"
          title="Add New Custom Zikr"
        >
          <Plus className="w-7 h-7 stroke-[2.5]" />
        </button>
      )}

      {/* Sticky Bottom Navigation Bar on Mobile / Tablet */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-30 px-2 py-1.5 md:hidden backdrop-blur-xl transition-colors duration-300 border-t ${
          isDay
            ? 'bg-white/95 border-[#d6e8e5] shadow-2xl shadow-[#006747]/15'
            : 'bg-[#0a262c]/95 border-[#194c55] shadow-2xl shadow-[#082024]/80'
        }`}
      >
        <div className="flex items-center justify-around gap-1 py-1">
          {navItems.map((item) => {
            return (
              <button
                key={item.id}
                onClick={() => onModuleChange(item.id)}
                className={`flex flex-col items-center justify-center flex-1 py-1 px-1 rounded-xl transition-all active:scale-95 cursor-pointer ${
                  item.isActive
                    ? isDay
                      ? 'text-white font-bold bg-[#006747] shadow-md shadow-[#006747]/20'
                      : 'text-white font-bold bg-[#1c6469] border border-[#247b82] shadow-md'
                    : isDay
                    ? 'text-[#456c72] hover:text-[#006747]'
                    : 'text-[#60878e] hover:text-[#2dd4bf]'
                }`}
              >
                <div className="flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-[10px] tracking-tight mt-0.5 whitespace-nowrap">
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
