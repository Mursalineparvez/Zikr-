import React, { useState } from 'react';
import { TABLIG_COMPLETE_CHAPTERS, TabligChapterDetail } from '../data/tabligData';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  BookOpen,
  Users,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  Award,
  BookmarkCheck,
  Search,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { TABLIG_UI } from '../utils/appTranslations';

interface DailyTabligViewProps {
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
}

interface ChapterMenuItem {
  id: string;
  label: string;
  count: number;
  match: (heading: string, index: number) => boolean;
}

export const DailyTabligView: React.FC<DailyTabligViewProps> = ({
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
}) => {
  const isDay = themeMode === 'day';
  const [expandedChapter, setExpandedChapter] = useState<string>('sifats_intro');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [chapterPartFilter, setChapterPartFilter] = useState<Record<string, string>>({});

  const filteredChapters = TABLIG_COMPLETE_CHAPTERS.filter((chap) => {
    const query = searchQuery.toLowerCase();
    if (!query) return true;
    const matchTitle = chap.title.toLowerCase().includes(query) || chap.subtitle.toLowerCase().includes(query);
    const matchSec = chap.sections.some(
      (s) => s.heading.toLowerCase().includes(query) || s.content.toLowerCase().includes(query)
    );
    return matchTitle || matchSec;
  });

  // Extract smart menu items for ANY chapter
  const getChapterMenuItems = (chap: TabligChapterDetail): ChapterMenuItem[] => {
    if (!chap.sections || chap.sections.length <= 1) return [];

    if (chap.id === 'tabligh_120_core') {
      return [];
    }

    const prefixMap = new Map<string, number>();
    chap.sections.forEach((s) => {
      const matchGroup = s.heading.match(/^(বাদ মাগরিব বয়ান [১-৩]|পর্ব [১-৩])/);
      if (matchGroup) {
        const p = matchGroup[1];
        prefixMap.set(p, (prefixMap.get(p) || 0) + 1);
      }
    });

    if (prefixMap.size > 1) {
      return Array.from(prefixMap.entries()).map(([prefix, count]) => ({
        id: prefix,
        label: prefix,
        count,
        match: (heading: string) => heading.startsWith(prefix),
      }));
    }

    return chap.sections.map((sec, idx) => {
      let shortLabel = sec.heading;
      shortLabel = shortLabel
        .replace(/^ঈমান ও একীনের কথা\s*[-—:]\s*/i, 'কথা - ')
        .replace(/^দাওয়াত\s*[-—:]\s*\(([০-৯0-9]+)\)/i, 'দাওয়াত $1')
        .replace(/^ছয় সিফ[াতো]+র আলোচনা\s*\((.*?)\)/i, '$1')
        .trim();

      if (shortLabel.length > 22) {
        shortLabel = shortLabel.slice(0, 20) + '…';
      }

      return {
        id: `sec_${idx}`,
        label: shortLabel,
        count: 1,
        match: (_heading: string, i: number) => i === idx,
      };
    });
  };

  const formatCleanContent = (raw: string): string => {
    if (!raw) return '';
    return raw
      .replace(/^\s*[-—_]{3,}\s*$/gm, '')
      .replace(/^[ \t]*#+[ \t]*/gm, '')
      .replace(/#/g, '')
      .replace(/[ \t]+$/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Banner */}
      <div
        className={`p-5 sm:p-6 rounded-3xl border shadow-xl ${
          isDay
            ? 'bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white border-emerald-600/40'
            : 'bg-gradient-to-r from-[#0c2f35] via-[#113f47] to-[#17525d] text-white border-[#1b5561]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-teal-100 text-xs font-semibold mb-2 backdrop-blur-md">
              <Users className="w-3.5 h-3.5 text-amber-300" />
              <span>الدَّعْوَةُ وَالتَّبْلِيغُ • Complete Authentic Tabligh Syllabus &amp; Bayan</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {TABLIG_UI.bannerTitle[selectedLanguage]}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1 max-w-3xl">
              {TABLIG_UI.bannerSub[selectedLanguage]}
            </p>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={TABLIG_UI.searchPlaceholder[selectedLanguage]}
          className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            isDay
              ? 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              : 'bg-[#0a242a] border-[#16444e] text-white placeholder-teal-400/60'
          }`}
        />
      </div>

      {/* Chapters Accordion List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <h3 className={`text-xs font-bold uppercase tracking-wider ${isDay ? 'text-slate-500' : 'text-teal-300'}`}>
            {TABLIG_UI.allChapters[selectedLanguage]} ({filteredChapters.length})
          </h3>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            {TABLIG_UI.tapToRead[selectedLanguage]}
          </span>
        </div>

        {filteredChapters.map((chap) => {
          const isExpanded = expandedChapter === chap.id;
          return (
            <div
              key={chap.id}
              className={`rounded-3xl border shadow-md overflow-hidden transition-all ${
                isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
              }`}
            >
              <button
                onClick={() => {
                  setExpandedChapter(isExpanded ? '' : chap.id);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition cursor-pointer ${
                  isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="w-9 h-9 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center text-sm font-mono shrink-0 shadow-sm">
                    {selectedLanguage === 'bn' ? chap.numberBn : chap.id.replace('chap_', '').replace('sifats_intro', '1')}
                  </span>
                  <div className="min-w-0">
                    <h3 className={`text-sm sm:text-base font-bold truncate ${isDay ? 'text-slate-900' : 'text-white'}`}>
                      {chap.title}
                    </h3>
                    {chap.subtitle && (
                      <p className="text-xs text-slate-500 dark:text-teal-300/80 truncate mt-0.5">
                        {chap.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {chap.arabic && (
                    <span className="hidden md:inline font-arabic text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                      {chap.arabic}
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="p-4 sm:p-6 pt-0 space-y-4 border-t border-slate-100 dark:border-teal-900/30 text-xs sm:text-sm animate-in fade-in duration-150">
                  {chap.arabic && (
                    <div className="pt-3 text-center">
                      <span className="inline-block px-4 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 font-arabic text-sm text-emerald-600 dark:text-emerald-300 font-bold">
                        {chap.arabic}
                      </span>
                    </div>
                  )}

                  {/* Smart topic / part navigation menu */}
                  {(() => {
                    const menuItems = getChapterMenuItems(chap);
                    if (menuItems.length > 1) {
                      const currentFilter = chapterPartFilter[chap.id] || 'all';
                      return (
                        <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2 border-b border-slate-200/60 dark:border-teal-900/40 pb-3">
                          <span className="text-[11px] font-semibold text-slate-500 dark:text-teal-300 mr-1 flex items-center gap-1 shrink-0">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            {selectedLanguage === 'bn' ? 'বিষয় / পর্ব নির্বাচন:' : 'Select Topic / Part:'}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setChapterPartFilter((prev) => ({ ...prev, [chap.id]: 'all' }));
                              if (soundEnabled) soundHaptics.playTap();
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0 ${
                              currentFilter === 'all'
                                ? 'bg-emerald-600 text-white shadow-md'
                                : isDay
                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                : 'bg-[#071d22] hover:bg-teal-900/50 text-teal-200 border border-teal-800/40'
                            }`}
                          >
                            {selectedLanguage === 'bn' ? 'সবগুলো' : 'All'} ({chap.sections.length})
                          </button>
                          {menuItems.map((item) => {
                            const isSelected = currentFilter === item.id;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  setChapterPartFilter((prev) => ({ ...prev, [chap.id]: item.id }));
                                  if (soundEnabled) soundHaptics.playTap();
                                }}
                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1 shrink-0 ${
                                  isSelected
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : isDay
                                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                    : 'bg-[#071d22] hover:bg-teal-900/50 text-teal-200 border border-teal-800/40'
                                }`}
                              >
                                <span>{item.label}</span>
                                {item.count > 1 && (
                                  <span className="text-[10px] opacity-75">({item.count})</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      );
                    }
                    return null;
                  })()}

                  {chap.sections
                    .filter((sec, idx) => {
                      const currentFilter = chapterPartFilter[chap.id];
                      if (!currentFilter || currentFilter === 'all') return true;
                      const menuItems = getChapterMenuItems(chap);
                      const activeItem = menuItems.find((m) => m.id === currentFilter);
                      if (!activeItem) return true;
                      return activeItem.match(sec.heading, idx);
                    })
                    .map((sec, idx) => {
                      const isMunajat = sec.heading.includes('মোনাজাত') || sec.heading.includes('দোয়া');
                      return (
                        <div
                          key={idx}
                          className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                            isMunajat
                              ? isDay
                                ? 'bg-amber-50/70 border-amber-200 text-slate-800'
                                : 'bg-[#0a2322] border-amber-500/30 text-amber-100 shadow-inner'
                              : isDay
                              ? 'bg-slate-50/80 border-slate-200 text-slate-800'
                              : 'bg-[#071d22] border-teal-900/40 text-teal-100'
                          }`}
                        >
                          {sec.heading && (
                            <h4
                              className={`font-bold text-xs sm:text-sm mb-2.5 flex items-center gap-1.5 ${
                                isMunajat
                                  ? 'text-amber-600 dark:text-amber-400'
                                  : 'text-emerald-600 dark:text-emerald-400'
                              }`}
                            >
                              <BookmarkCheck className="w-4 h-4 shrink-0" />
                              <span>{sec.heading}</span>
                            </h4>
                          )}
                          <p className="leading-relaxed whitespace-pre-line text-xs sm:text-sm">
                            {formatCleanContent(sec.content)}
                          </p>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
