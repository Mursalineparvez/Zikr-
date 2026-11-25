import React, { useState, useEffect } from 'react';
import { ISLAMIC_KITABS, KitabItem, KitabChapter } from '../utils/kitabData';
import { copyToClipboard } from '../utils/clipboard';
import { BookMarked, Search, ArrowLeft, Check, Copy, ChevronRight, Sparkles, X } from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { KITAB_UI } from '../utils/appTranslations';
import { HighlightMarkerButton } from './HighlightMarkerButton';
import { HighlightableText } from './HighlightableText';
import { stepBackOr, useBackLayer } from '../utils/backNavigation';

interface KitabViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
}

export const KitabView: React.FC<KitabViewProps> = ({
  themeMode = 'day',
  selectedLanguage = 'bn',
}) => {
  const isDay = themeMode === 'day';
  const [selectedKitab, setSelectedKitab] = useState<KitabItem | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<KitabChapter | null>(null);

  // Register Kitab & Chapter levels for step-by-step reverse back navigation
  useBackLayer(
    selectedKitab !== null,
    () => {
      setSelectedChapter(null);
      setSelectedKitab(null);
    },
    'kitab-book'
  );
  useBackLayer(selectedChapter !== null, () => setSelectedChapter(null), 'kitab-chapter');

  // Auto-scroll to top when selecting a kitab, chapter, or navigating back
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [selectedKitab, selectedChapter]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter kitabs
  const filteredKitabs = ISLAMIC_KITABS.filter(
    (k) =>
      k.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyChapter = (chapter: KitabChapter) => {
    const text = `${chapter.title}\n\n${chapter.content}\n\nKey Takeaways:\n${chapter.keyTakeaways.map((t) => `- ${t}`).join('\n')}\n\n[From ${selectedKitab?.title}]`;
    void copyToClipboard(text);
    setCopiedId(chapter.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* UNIFIED HEADER (Matching QuranView style) */}
      {!selectedKitab && (
        <section
          className={`pb-3.5 border-b space-y-2.5 ${
            isDay ? 'border-[#dcebe8]' : 'border-[#163640]'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <BookMarked
                className={`w-5 h-5 shrink-0 ${
                  isDay ? 'text-[#006747]' : 'text-emerald-400'
                }`}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1
                    className={`text-lg sm:text-xl font-black tracking-tight leading-none ${
                      isDay ? 'text-[#006747]' : 'text-white'
                    }`}
                  >
                    {KITAB_UI.bannerTitle[selectedLanguage]}
                  </h1>
                  <span
                    className={`text-xs font-semibold font-arabic hidden xs:inline ${
                      isDay ? 'text-emerald-700/80' : 'text-emerald-300/80'
                    }`}
                  >
                    المكتبة الإسلامية
                  </span>
                </div>
                <p
                  className={`text-[11px] leading-tight mt-0.5 ${
                    isDay ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  {KITAB_UI.bannerSub[selectedLanguage]}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen((prev) => {
                    if (prev && searchQuery) setSearchQuery('');
                    return !prev;
                  });
                }}
                className={`w-9 h-9 rounded-lg border flex items-center justify-center transition cursor-pointer active:scale-95 ${
                  isSearchOpen || searchQuery
                    ? isDay
                      ? 'bg-[#006A4E] border-[#006A4E] text-white'
                      : 'bg-emerald-600 border-emerald-500 text-white'
                    : isDay
                    ? 'bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:text-[#006A4E]'
                    : 'bg-[#0e1c26] border-[#1a3342] text-emerald-300 hover:border-emerald-500'
                }`}
                title={selectedLanguage === 'bn' ? 'কিতাব খুঁজুন' : 'Search Kitab'}
                aria-label={selectedLanguage === 'bn' ? 'কিতাব খুঁজুন' : 'Search Kitab'}
              >
                {isSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* View: Reading Chapter within a Kitab */}
      {selectedKitab && selectedChapter ? (
        <div className="space-y-5">
          {/* Flat Navigation bar */}
          <div
            className={`flex items-center justify-between flex-wrap gap-2 pb-3 border-b ${
              isDay
                ? 'border-[#dcebe8] text-[#103e42]'
                : 'border-[#163640] text-white'
            }`}
          >
            <button
              onClick={() => stepBackOr(() => setSelectedChapter(null))}
              className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#006747] hover:bg-[#154f53] text-white transition active:scale-95 cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{KITAB_UI.backToChapters[selectedLanguage]}</span>
            </button>

            <span className={`text-xs font-medium ${isDay ? 'text-[#507579]' : 'text-emerald-300'}`}>
              {selectedKitab.title}
            </span>

            <div className="flex items-center gap-2">
              <HighlightMarkerButton
                itemKey={`kitab:${selectedKitab.id}:${selectedChapter.id}`}
                text={`${selectedChapter.title}\n\n${selectedChapter.content.slice(0, 320)}`}
                source={`${selectedKitab.title} • ${selectedChapter.title}`}
                section="kitab"
                selectedLanguage={selectedLanguage}
                themeMode={themeMode}
                variant="pill"
              />
              <button
                onClick={() => handleCopyChapter(selectedChapter)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border transition active:scale-95 cursor-pointer ${
                  isDay
                    ? 'bg-[#f0f7f6] hover:bg-[#e4f2f0] text-[#006747] border-[#d2ece9]'
                    : 'bg-[#0a262c] text-emerald-300 border-[#184850]'
                }`}
              >
                {copiedId === selectedChapter.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-teal-600" />
                    <span className="text-teal-600">{KITAB_UI.copied[selectedLanguage]}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-teal-600" />
                    <span>{KITAB_UI.copyText[selectedLanguage]}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Chapter Content Card */}
          <div
            data-highlight-section="kitab"
            data-highlight-source={`${selectedKitab.title} • ${selectedChapter.title}`}
            className={`p-6 rounded-3xl border shadow-sm space-y-6 ${
              isDay
                ? 'bg-white border-[#dcebe8] text-[#103e42]'
                : 'bg-[#0e2f36] border-[#1a515c] text-white'
            }`}
          >
            <div className={`border-b pb-4 ${isDay ? 'border-[#e8f3f1]' : 'border-[#17434b]'}`}>
              <span className="text-xs font-bold text-teal-600 dark:text-emerald-300 uppercase tracking-wider">
                {KITAB_UI.chapter[selectedLanguage]} {selectedChapter.chapterNumber}
              </span>
              <h3 className="text-lg sm:text-xl font-bold mt-1">
                {selectedChapter.title}
              </h3>
              {selectedChapter.arabicTitle && (
                <div className="font-arabic text-teal-700 dark:text-emerald-300 text-xl font-bold mt-2 select-text">
                  {selectedChapter.arabicTitle}
                </div>
              )}
            </div>

            {/* Chapter Body */}
            <div
              className={`text-sm sm:text-base leading-relaxed font-sans whitespace-pre-line select-text ${
                isDay ? 'text-[#1e3b3e]' : 'text-slate-200'
              }`}
            >
              <HighlightableText
                text={selectedChapter.content}
                section="kitab"
                themeMode={themeMode}
                selectedLanguage={selectedLanguage}
              />
            </div>

            {/* Spiritual Key Takeaways */}
            {selectedChapter.keyTakeaways.length > 0 && (
              <div
                className={`p-4 rounded-2xl border space-y-2 select-text ${
                  isDay
                    ? 'bg-[#f0f7f6] border-[#d2ece9]'
                    : 'bg-[#0a262c] border-[#184850]'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-emerald-300 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{KITAB_UI.spiritualTakeaways[selectedLanguage]}</span>
                </div>
                <ul
                  className={`space-y-1.5 text-xs sm:text-sm ${
                    isDay ? 'text-[#34595d]' : 'text-teal-100'
                  }`}
                >
                  {selectedChapter.keyTakeaways.map((takeaway, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>
                        <HighlightableText
                          text={takeaway}
                          section="kitab"
                          themeMode={themeMode}
                          selectedLanguage={selectedLanguage}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ) : selectedKitab ? (
        /* View: Chapters List for Selected Kitab */
        <div className="space-y-5">
          <div
            className={`flex items-center justify-between pb-3 border-b ${
              isDay
                ? 'border-[#dcebe8] text-[#103e42]'
                : 'border-[#163640] text-white'
            }`}
          >
            <button
              onClick={() => stepBackOr(() => setSelectedKitab(null))}
              className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#006747] hover:bg-[#154f53] text-white transition active:scale-95 cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{KITAB_UI.backToKitabs[selectedLanguage]}</span>
            </button>

            <div className="text-right">
              <h3 className="text-sm font-bold">{selectedKitab.title}</h3>
              <p className={`text-[11px] ${isDay ? 'text-[#507579]' : 'text-emerald-300'}`}>
                {selectedKitab.author}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {selectedKitab.chapters.map((chapter) => (
              <div
                key={chapter.id}
                onClick={() => setSelectedChapter(chapter)}
                className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 shadow-sm hover:shadow-md ${
                  isDay
                    ? 'bg-white hover:bg-[#f6fbfa] border-[#dcebe8] hover:border-[#a8dcd4] text-[#103e42]'
                    : 'bg-[#0e2f36] hover:bg-[#123e47] border-[#1a515c] text-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs group-hover:scale-105 transition border ${
                      isDay
                        ? 'bg-[#e6f3f2] text-[#006747] border-[#cbe4e1]'
                        : 'bg-[#0a262c] text-[#10b981] border-[#184850]'
                    }`}
                  >
                    {chapter.chapterNumber}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold group-hover:text-teal-600 transition">
                      {chapter.title}
                    </h4>
                    {chapter.arabicTitle && (
                      <span className="font-arabic text-teal-600 text-sm font-semibold">
                        {chapter.arabicTitle}
                      </span>
                    )}
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-teal-600 group-hover:translate-x-1 transition" />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* View: All Kitabs Grid */
        <div className="space-y-4">
          {(isSearchOpen || searchQuery.trim().length > 0) && (
            <div className="relative animate-in fade-in duration-150">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
                isDay ? 'text-[#94a3b8]' : 'text-teal-400'
              }`} />
              <input
                type="text"
                autoFocus={isSearchOpen}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={KITAB_UI.searchPlaceholder[selectedLanguage]}
                className={`w-full rounded-2xl pl-11 pr-10 py-2.5 text-sm focus:outline-none transition shadow-sm border ${
                  isDay
                    ? 'bg-white border-[#cde5e2] text-[#103e42] placeholder-[#94a3b8] focus:border-[#006747]'
                    : 'bg-[#0e2f36] border-[#1a515c] text-white placeholder-teal-600 focus:border-teal-400'
                }`}
              />
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                }}
                aria-label={selectedLanguage === 'bn' ? 'বন্ধ করুন' : 'Close search'}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {filteredKitabs.map((kitab) => (
              <div
                key={kitab.id}
                onClick={() => setSelectedKitab(kitab)}
                className={`group p-5 rounded-3xl border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md flex flex-col justify-between ${
                  isDay
                    ? 'bg-white hover:bg-[#f6fbfa] border-[#dcebe8] hover:border-[#a8dcd4] text-[#103e42]'
                    : 'bg-[#0e2f36] hover:bg-[#123e47] border-[#1a515c] text-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-2xl p-2 rounded-2xl border ${
                        isDay
                          ? 'bg-[#f0f7f6] border-[#d2ece9]'
                          : 'bg-[#0a262c] border-[#184850]'
                      }`}
                    >
                      {kitab.icon}
                    </span>
                    <span
                      className={`text-[11px] px-2.5 py-1 rounded-full font-semibold border ${
                        isDay
                          ? 'bg-[#e6f3f2] text-[#006747] border-[#cbe4e1]'
                          : 'bg-[#0a262c] text-[#10b981] border-[#184850]'
                      }`}
                    >
                      {kitab.category}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold group-hover:text-teal-600 transition">
                    {kitab.title}
                  </h3>
                  <p className="text-xs text-teal-600 font-medium mt-0.5">
                    {kitab.author}
                  </p>
                  <p className={`text-xs mt-2 line-clamp-2 leading-relaxed ${
                    isDay ? 'text-[#507579]' : 'text-emerald-200/80'
                  }`}>
                    {kitab.description}
                  </p>
                </div>

                <div
                  className={`pt-4 mt-4 border-t flex items-center justify-between text-xs font-semibold text-teal-600 ${
                    isDay ? 'border-[#e8f3f1]' : 'border-[#17434b]'
                  }`}
                >
                  <span>{kitab.chapters.length} {KITAB_UI.chaptersCount[selectedLanguage]}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition">
                    {KITAB_UI.openKitab[selectedLanguage]} <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
