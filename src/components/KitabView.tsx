import React, { useState } from 'react';
import { ISLAMIC_KITABS, KitabItem, KitabChapter } from '../utils/kitabData';
import { BookMarked, Search, ArrowLeft, Check, Copy, ChevronRight, Sparkles } from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { KITAB_UI } from '../utils/appTranslations';

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
  const [searchQuery, setSearchQuery] = useState('');
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
    navigator.clipboard.writeText(text);
    setCopiedId(chapter.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Kitab Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#144d52] via-[#1a5e64] to-[#257277] border border-teal-400/30 p-5 sm:p-6 shadow-xl text-white">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-teal-100 text-xs font-semibold mb-2 backdrop-blur-md">
            <BookMarked className="w-3.5 h-3.5" />
            <span>المكتبة الإسلامية • Classical Islamic Books</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight drop-shadow-sm">
            {KITAB_UI.bannerTitle[selectedLanguage]}
          </h2>
          <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-xl">
            {KITAB_UI.bannerSub[selectedLanguage]}
          </p>
        </div>
      </div>

      {/* View: Reading Chapter within a Kitab */}
      {selectedKitab && selectedChapter ? (
        <div className="space-y-5">
          {/* Navigation bar */}
          <div
            className={`flex items-center justify-between flex-wrap gap-2 p-4 rounded-2xl border shadow-sm ${
              isDay
                ? 'bg-white border-[#dcebe8] text-[#103e42]'
                : 'bg-[#0e2f36] border-[#1a515c] text-white'
            }`}
          >
            <button
              onClick={() => setSelectedChapter(null)}
              className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#1c6469] hover:bg-[#154f53] text-white transition active:scale-95 cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{KITAB_UI.backToChapters[selectedLanguage]}</span>
            </button>

            <span className={`text-xs font-medium ${isDay ? 'text-[#507579]' : 'text-teal-200'}`}>
              {selectedKitab.title}
            </span>

            <button
              onClick={() => handleCopyChapter(selectedChapter)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-xl border transition active:scale-95 cursor-pointer ${
                isDay
                  ? 'bg-[#f0f7f6] hover:bg-[#e4f2f0] text-[#1c6469] border-[#d2ece9]'
                  : 'bg-[#0a262c] text-teal-200 border-[#184850]'
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

          {/* Chapter Content Card */}
          <div
            className={`p-6 rounded-3xl border shadow-sm space-y-6 ${
              isDay
                ? 'bg-white border-[#dcebe8] text-[#103e42]'
                : 'bg-[#0e2f36] border-[#1a515c] text-white'
            }`}
          >
            <div className={`border-b pb-4 ${isDay ? 'border-[#e8f3f1]' : 'border-[#17434b]'}`}>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-300 uppercase tracking-wider">
                {KITAB_UI.chapter[selectedLanguage]} {selectedChapter.chapterNumber}
              </span>
              <h3 className="text-lg sm:text-xl font-bold mt-1">
                {selectedChapter.title}
              </h3>
              {selectedChapter.arabicTitle && (
                <div className="font-arabic text-teal-700 dark:text-teal-300 text-xl font-bold mt-2">
                  {selectedChapter.arabicTitle}
                </div>
              )}
            </div>

            {/* Chapter Body */}
            <div
              className={`text-sm sm:text-base leading-relaxed font-sans whitespace-pre-line ${
                isDay ? 'text-[#1e3b3e]' : 'text-slate-200'
              }`}
            >
              {selectedChapter.content}
            </div>

            {/* Spiritual Key Takeaways */}
            {selectedChapter.keyTakeaways.length > 0 && (
              <div
                className={`p-4 rounded-2xl border space-y-2 ${
                  isDay
                    ? 'bg-[#f0f7f6] border-[#d2ece9]'
                    : 'bg-[#0a262c] border-[#184850]'
                }`}
              >
                <div className="flex items-center gap-2 text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider">
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
                      <span>{takeaway}</span>
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
            className={`flex items-center justify-between p-4 rounded-2xl border shadow-sm ${
              isDay
                ? 'bg-white border-[#dcebe8] text-[#103e42]'
                : 'bg-[#0e2f36] border-[#1a515c] text-white'
            }`}
          >
            <button
              onClick={() => setSelectedKitab(null)}
              className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xl bg-[#1c6469] hover:bg-[#154f53] text-white transition active:scale-95 cursor-pointer shadow-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{KITAB_UI.backToKitabs[selectedLanguage]}</span>
            </button>

            <div className="text-right">
              <h3 className="text-sm font-bold">{selectedKitab.title}</h3>
              <p className={`text-[11px] ${isDay ? 'text-[#507579]' : 'text-teal-200'}`}>
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
                        ? 'bg-[#e6f3f2] text-[#1c6469] border-[#cbe4e1]'
                        : 'bg-[#0a262c] text-[#2dd4bf] border-[#184850]'
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
          <div className="relative">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
              isDay ? 'text-[#7ca2a7]' : 'text-teal-400'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={KITAB_UI.searchPlaceholder[selectedLanguage]}
              className={`w-full rounded-2xl pl-11 pr-4 py-3 text-sm focus:outline-none transition shadow-sm border ${
                isDay
                  ? 'bg-white border-[#cde5e2] text-[#103e42] placeholder-[#7ca2a7] focus:border-[#1c6469]'
                  : 'bg-[#0e2f36] border-[#1a515c] text-white placeholder-teal-600 focus:border-teal-400'
              }`}
            />
          </div>

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
                          ? 'bg-[#e6f3f2] text-[#1c6469] border-[#cbe4e1]'
                          : 'bg-[#0a262c] text-[#2dd4bf] border-[#184850]'
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
                    isDay ? 'text-[#507579]' : 'text-teal-200/80'
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
