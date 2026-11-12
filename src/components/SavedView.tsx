import React, { useState, useEffect, useMemo } from 'react';
import {
  Bookmark,
  Pencil,
  FileText,
  Plus,
  Trash2,
  Copy,
  Check,
  Edit3,
  BookOpen,
  X,
  ArrowLeft,
  Search,
  ChevronRight,
} from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import {
  SavedHighlight,
  SavedNote,
  UnifiedBookmarkItem,
  HighlightColor,
  getAllUnifiedBookmarks,
  removeUnifiedBookmark,
  addCustomBookmark,
  getSavedHighlights,
  addSavedHighlight,
  removeSavedHighlight,
  getSavedNotes,
  saveOrUpdateNote,
  removeSavedNote,
} from '../utils/savedItems';

type SavedTab = 'bookmarks' | 'highlights' | 'notes';

interface SavedViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  onNavigateToQuran?: () => void;
  onBackToHub?: () => void;
  initialTab?: SavedTab;
}

const HIGHLIGHT_COLORS: Array<{
  id: HighlightColor;
  label: string;
  labelBn: string;
  cardDay: string;
  cardNight: string;
  dotClass: string;
  textAccent: string;
}> = [
  {
    id: 'amber',
    label: 'Gold',
    labelBn: 'সোনালি',
    cardDay: 'bg-amber-50/70 border-amber-200/80',
    cardNight: 'bg-amber-950/20 border-amber-800/40',
    dotClass: 'bg-amber-400',
    textAccent: 'text-amber-700 dark:text-amber-300',
  },
  {
    id: 'emerald',
    label: 'Emerald',
    labelBn: 'সবুজ',
    cardDay: 'bg-emerald-50/70 border-emerald-200/80',
    cardNight: 'bg-emerald-950/20 border-emerald-800/40',
    dotClass: 'bg-emerald-500',
    textAccent: 'text-emerald-700 dark:text-emerald-300',
  },
  {
    id: 'rose',
    label: 'Crimson',
    labelBn: 'মেরুন',
    cardDay: 'bg-rose-50/70 border-rose-200/80',
    cardNight: 'bg-rose-950/20 border-rose-800/40',
    dotClass: 'bg-rose-500',
    textAccent: 'text-rose-700 dark:text-rose-300',
  },
  {
    id: 'teal',
    label: 'Teal',
    labelBn: 'টিল',
    cardDay: 'bg-teal-50/70 border-teal-200/80',
    cardNight: 'bg-teal-950/20 border-teal-800/40',
    dotClass: 'bg-teal-500',
    textAccent: 'text-teal-700 dark:text-teal-300',
  },
];

export const SavedView: React.FC<SavedViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
  onNavigateToQuran,
  onBackToHub,
  initialTab = 'bookmarks',
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';

  const [activeTab, setActiveTab] = useState<SavedTab>(initialTab);
  const [bookmarks, setBookmarks] = useState<UnifiedBookmarkItem[]>([]);
  const [highlights, setHighlights] = useState<SavedHighlight[]>([]);
  const [notes, setNotes] = useState<SavedNote[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [highlightColorFilter, setHighlightColorFilter] = useState<HighlightColor | 'all'>('all');

  // Composer state
  const [showAddBookmark, setShowAddBookmark] = useState(false);
  const [bmTitle, setBmTitle] = useState('');
  const [bmSubtitle, setBmSubtitle] = useState('');
  const [bmSource, setBmSource] = useState('Al-Quran');

  const [showAddHighlight, setShowAddHighlight] = useState(false);
  const [hlText, setHlText] = useState('');
  const [hlSource, setHlSource] = useState('');
  const [hlColor, setHlColor] = useState<HighlightColor>('amber');

  const [showNoteForm, setShowNoteForm] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | undefined>(undefined);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [noteSource, setNoteSource] = useState('');

  const refreshAll = () => {
    setBookmarks(getAllUnifiedBookmarks());
    setHighlights(getSavedHighlights());
    setNotes(getSavedNotes());
  };

  useEffect(() => {
    refreshAll();
    const handleSync = () => refreshAll();
    window.addEventListener('zikrplus-saved-updated', handleSync);
    window.addEventListener('storage', handleSync);
    return () => {
      window.removeEventListener('zikrplus-saved-updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  const filteredBookmarks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return bookmarks;
    return bookmarks.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.subtitle.toLowerCase().includes(q) ||
        b.sourceLabel.toLowerCase().includes(q) ||
        (b.arabic && b.arabic.includes(q))
    );
  }, [bookmarks, searchQuery]);

  const filteredHighlights = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return highlights.filter((h) => {
      const colorOk = highlightColorFilter === 'all' || h.color === highlightColorFilter;
      if (!colorOk) return false;
      if (!q) return true;
      return h.text.toLowerCase().includes(q) || h.source.toLowerCase().includes(q);
    });
  }, [highlights, searchQuery, highlightColorFilter]);

  const filteredNotes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        (n.source && n.source.toLowerCase().includes(q))
    );
  }, [notes, searchQuery]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    if (soundEnabled) soundHaptics.playTap();
    setTimeout(() => setCopiedId(null), 1800);
  };

  const handleCreateBookmark = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bmTitle.trim()) return;
    addCustomBookmark(bmTitle, bmSubtitle, bmSource);
    setBmTitle('');
    setBmSubtitle('');
    setShowAddBookmark(false);
    refreshAll();
    if (soundEnabled) soundHaptics.playMilestone();
  };

  const handleCreateHighlight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hlText.trim()) return;
    addSavedHighlight(hlText, hlSource || (isBn ? 'তাফসীর ও ব্যাখ্যা' : 'Commentary'), hlColor);
    setHlText('');
    setHlSource('');
    setShowAddHighlight(false);
    refreshAll();
    if (soundEnabled) soundHaptics.playMilestone();
  };

  const handleOpenEditNote = (note?: SavedNote) => {
    if (note) {
      setEditingNoteId(note.id);
      setNoteTitle(note.title);
      setNoteContent(note.content);
      setNoteSource(note.source || '');
    } else {
      setEditingNoteId(undefined);
      setNoteTitle('');
      setNoteContent('');
      setNoteSource('');
    }
    setShowNoteForm(true);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim() && !noteTitle.trim()) return;
    saveOrUpdateNote(noteTitle, noteContent, noteSource, editingNoteId);
    setShowNoteForm(false);
    setEditingNoteId(undefined);
    setNoteTitle('');
    setNoteContent('');
    setNoteSource('');
    refreshAll();
    if (soundEnabled) soundHaptics.playMilestone();
  };

  const formatDate = (ts: number) => {
    if (!ts) return '';
    try {
      return new Date(ts).toLocaleDateString(isBn ? 'bn-BD' : 'en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  const tabs: Array<{ id: SavedTab; label: string; count: number; icon: React.ReactNode }> = [
    {
      id: 'bookmarks',
      label: isBn ? 'বুকমার্ক' : 'Bookmarks',
      count: bookmarks.length,
      icon: <Bookmark className="w-4 h-4" />,
    },
    {
      id: 'highlights',
      label: isBn ? 'হাইলাইট' : 'Highlights',
      count: highlights.length,
      icon: <Pencil className="w-4 h-4" />,
    },
    {
      id: 'notes',
      label: isBn ? 'নোটস' : 'Notes',
      count: notes.length,
      icon: <FileText className="w-4 h-4" />,
    },
  ];

  const totalSaved = bookmarks.length + highlights.length + notes.length;

  return (
    <div
      className={`rounded-3xl border overflow-hidden flex flex-col min-h-[580px] transition-colors ${
        isDay
          ? 'bg-white border-slate-200/90 text-slate-900 shadow-sm'
          : 'bg-[#071c21] border-[#143b44] text-white shadow-xl'
      }`}
    >
      {/* Editorial Sanctuary Header */}
      <div
        className={`px-5 pt-5 pb-5 sm:px-7 sm:pt-6 border-b ${
          isDay
            ? 'bg-gradient-to-br from-[#f3faf7] via-white to-[#f8fbfa] border-slate-200/70'
            : 'bg-gradient-to-br from-[#0a262c] via-[#071c21] to-[#082228] border-[#133841]'
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            {onBackToHub && (
              <button
                type="button"
                onClick={onBackToHub}
                className={`min-w-[44px] min-h-[44px] rounded-2xl border flex items-center justify-center transition active:scale-95 cursor-pointer shrink-0 ${
                  isDay
                    ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    : 'bg-[#0c2930] border-[#194a55] text-emerald-300 hover:bg-[#123840]'
                }`}
                aria-label={isBn ? 'ফিরে যান' : 'Back'}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="min-w-0">
              <div className="font-arabic text-sm text-emerald-700 dark:text-emerald-400/90 leading-none mb-1">
                المحفوظات والملاحظات
              </div>
              <h2
                className={`text-2xl sm:text-3xl font-black tracking-tight text-balance ${
                  isDay ? 'text-[#006A4E]' : 'text-white'
                }`}
              >
                {isBn ? 'সংরক্ষিত লাইব্রেরি' : 'Saved'}
              </h2>
              <p className={`text-xs sm:text-sm mt-1 ${isDay ? 'text-slate-600' : 'text-slate-300/80'}`}>
                {isBn
                  ? 'আপনার সংরক্ষিত বুকমার্ক, হাইলাইট এবং ব্যক্তিগত নোটসমূহ'
                  : 'Your bookmarks, highlights, and notes'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (soundEnabled) soundHaptics.playTap();
              if (activeTab === 'bookmarks') setShowAddBookmark((p) => !p);
              else if (activeTab === 'highlights') setShowAddHighlight((p) => !p);
              else handleOpenEditNote();
            }}
            className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer shrink-0 whitespace-nowrap shadow-sm ${
              isDay
                ? 'bg-[#006A4E] hover:bg-[#005740] text-white'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>
              {activeTab === 'bookmarks'
                ? isBn ? 'বুকমার্ক' : 'Add Bookmark'
                : activeTab === 'highlights'
                ? isBn ? 'হাইলাইট' : 'Add Highlight'
                : isBn ? 'নতুন নোট' : 'New Note'}
            </span>
          </button>
        </div>

        {/* Clean 3-Column Tabular Summary Strip */}
        <div
          className={`mt-5 grid grid-cols-3 rounded-2xl border divide-x ${
            isDay
              ? 'bg-white border-slate-200/80 divide-slate-200/80'
              : 'bg-[#092127] border-[#153e47] divide-[#153e47]'
          }`}
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`py-3 px-2 sm:px-4 text-left transition cursor-pointer flex flex-col justify-center ${
                  isActive
                    ? isDay
                      ? 'bg-emerald-50/70'
                      : 'bg-emerald-950/40'
                    : 'hover:bg-black/[0.02] dark:hover:bg-white/[0.03]'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`text-[11px] sm:text-xs font-semibold truncate ${
                      isActive
                        ? isDay
                          ? 'text-[#006A4E]'
                          : 'text-emerald-400'
                        : isDay
                        ? 'text-slate-500'
                        : 'text-slate-400'
                    }`}
                  >
                    {tab.label}
                  </span>
                  <span
                    className={`${
                      isActive
                        ? isDay
                          ? 'text-[#006A4E]'
                          : 'text-emerald-400'
                        : isDay
                        ? 'text-slate-400'
                        : 'text-slate-500'
                    }`}
                  >
                    {tab.icon}
                  </span>
                </div>
                <div className="text-lg sm:text-xl font-black font-mono tabular-nums mt-0.5">
                  {tab.count}
                </div>
              </button>
            );
          })}
        </div>

        {/* Segmented Control & Search Row */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div
            className={`inline-flex items-center gap-1 p-1 rounded-full border self-start ${
              isDay ? 'bg-slate-100/90 border-slate-200/80' : 'bg-[#051519] border-[#143a43]'
            }`}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`min-h-[40px] px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-95 whitespace-nowrap shrink-0 ${
                    isActive
                      ? isDay
                        ? 'bg-[#006A4E] text-white shadow-sm'
                        : 'bg-emerald-600 text-white shadow-sm'
                      : isDay
                      ? 'text-slate-600 hover:text-slate-900'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {totalSaved > 0 && (
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isBn ? 'সংরক্ষিত আইটেম খুঁজুন...' : 'Search saved items...'}
                className={`w-full min-h-[42px] pl-9 pr-8 py-2 rounded-full border text-xs font-medium focus:outline-none transition ${
                  isDay
                    ? 'bg-white border-slate-200 text-slate-900 focus:border-[#006A4E]'
                    : 'bg-[#092127] border-[#153e47] text-white focus:border-emerald-500'
                }`}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Tab Body */}
      <div className="flex-1 p-5 sm:p-7 flex flex-col">
        {/* TAB 1: BOOKMARKS */}
        {activeTab === 'bookmarks' && (
          <div className="flex-1 flex flex-col">
            {showAddBookmark && (
              <form
                onSubmit={handleCreateBookmark}
                className={`mb-5 p-4 sm:p-5 rounded-2xl border space-y-3 animate-in fade-in ${
                  isDay ? 'bg-slate-50/70 border-slate-200' : 'bg-[#0a2329] border-[#17444e]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#006A4E] dark:text-emerald-400">
                    {isBn ? 'নতুন বুকমার্ক যোগ করুন' : 'Save Custom Bookmark'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAddBookmark(false)}
                    className="min-w-[36px] min-h-[36px] rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={bmTitle}
                  onChange={(e) => setBmTitle(e.target.value)}
                  placeholder={isBn ? 'শিরোনাম (যেমন: সূরা আল-মুলক • আয়াত ১-৫)' : 'Title (e.g. Surah Al-Mulk • Ayah 1-5)'}
                  className={`w-full min-h-[44px] px-3.5 py-2 rounded-xl border text-xs font-semibold focus:outline-none ${
                    isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                  }`}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    value={bmSubtitle}
                    onChange={(e) => setBmSubtitle(e.target.value)}
                    placeholder={isBn ? 'বিবরণ বা রেফারেন্স (ঐচ্ছিক)' : 'Reference or short description (optional)'}
                    className={`w-full min-h-[44px] px-3.5 py-2 rounded-xl border text-xs font-medium focus:outline-none ${
                      isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                    }`}
                  />
                  <input
                    type="text"
                    value={bmSource}
                    onChange={(e) => setBmSource(e.target.value)}
                    placeholder={isBn ? 'উৎস (যেমন: আল-কোরআন)' : 'Source (e.g. Al-Quran)'}
                    className={`w-full min-h-[44px] px-3.5 py-2 rounded-xl border text-xs font-medium focus:outline-none ${
                      isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                    }`}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="min-h-[44px] px-5 py-2 rounded-full bg-[#006A4E] hover:bg-[#005740] text-white text-xs font-bold cursor-pointer transition active:scale-95"
                  >
                    {isBn ? 'সংরক্ষণ করুন' : 'Save Bookmark'}
                  </button>
                </div>
              </form>
            )}

            {filteredBookmarks.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-14 px-4">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center mb-5 ${
                    isDay
                      ? 'bg-emerald-50/90 ring-8 ring-emerald-50/40 text-[#006A4E]'
                      : 'bg-emerald-950/60 ring-8 ring-emerald-950/25 text-emerald-400'
                  }`}
                >
                  <Bookmark className="w-9 h-9 stroke-[1.8]" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  {searchQuery
                    ? isBn ? 'কোনো বুকমার্ক পাওয়া যায়নি' : 'No Matching Bookmarks'
                    : isBn ? 'এখনো কোনো বুকমার্ক নেই' : 'No Bookmarks Yet'}
                </h3>
                <p className={`text-xs sm:text-sm mt-1.5 max-w-sm leading-relaxed ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                  {searchQuery
                    ? isBn ? 'অন্য কোনো শব্দ দিয়ে খুঁজে দেখুন।' : 'Try searching with a different keyword.'
                    : isBn
                    ? 'কোরআন, সাহাবি জীবনী বা হাদিস পড়ার সময় বুকমার্ক আইকনে ট্যাপ করে এখানে সংরক্ষণ করুন'
                    : 'Tap the bookmark icon while reading Quran or chapters to save them here'}
                </p>
                {!searchQuery && onNavigateToQuran && (
                  <button
                    type="button"
                    onClick={onNavigateToQuran}
                    className={`mt-6 min-h-[44px] px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold border flex items-center gap-2 transition active:scale-95 cursor-pointer ${
                      isDay
                        ? 'bg-white border-slate-200 text-[#006A4E] hover:bg-emerald-50 shadow-2xs'
                        : 'bg-[#0c2930] border-[#194a55] text-emerald-300 hover:bg-[#123840]'
                    }`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{isBn ? 'আল-কোরআন থেকে পড়া শুরু করুন' : 'Browse Al-Quran'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBookmarks.map((bm) => (
                  <div
                    key={bm.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition flex flex-col justify-between gap-3 ${
                      isDay
                        ? 'bg-white border-slate-200/90 hover:border-emerald-300 shadow-2xs'
                        : 'bg-[#0b262d] border-[#17444e] hover:border-emerald-700/60'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className={`text-[11px] font-semibold flex items-center gap-1.5 ${isDay ? 'text-[#006A4E]' : 'text-emerald-400'}`}>
                            <span>{bm.sourceLabel}</span>
                            {bm.timestamp > 0 && (
                              <>
                                <span aria-hidden="true">·</span>
                                <span className={isDay ? 'text-slate-400' : 'text-slate-400'}>
                                  {formatDate(bm.timestamp)}
                                </span>
                              </>
                            )}
                          </div>
                          <h4 className="font-bold text-sm sm:text-base leading-snug mt-0.5">{bm.title}</h4>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleCopy(bm.id, `${bm.title}\n${bm.arabic || ''}\n${bm.subtitle}`)}
                            className="min-w-[36px] min-h-[36px] rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-emerald-500 cursor-pointer"
                            title="Copy"
                          >
                            {copiedId === bm.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              removeUnifiedBookmark(bm);
                              refreshAll();
                              if (soundEnabled) soundHaptics.playTap();
                            }}
                            className="min-w-[36px] min-h-[36px] rounded-xl flex items-center justify-center hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      {bm.arabic && (
                        <p dir="rtl" className="font-arabic text-lg leading-loose text-[#006A4E] dark:text-emerald-300">
                          {bm.arabic}
                        </p>
                      )}
                      {bm.subtitle && (
                        <p className={`text-xs sm:text-sm leading-relaxed ${isDay ? 'text-slate-600' : 'text-slate-300'}`}>
                          {bm.subtitle}
                        </p>
                      )}
                    </div>
                    {bm.kind === 'quran' && onNavigateToQuran && (
                      <button
                        type="button"
                        onClick={onNavigateToQuran}
                        className={`self-start text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                          isDay ? 'text-[#006A4E] hover:underline' : 'text-emerald-400 hover:underline'
                        }`}
                      >
                        <span>{isBn ? 'কোরআনে দেখুন' : 'Open in Quran'}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: HIGHLIGHTS */}
        {activeTab === 'highlights' && (
          <div className="flex-1 flex flex-col">
            {highlights.length > 0 && (
              <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={() => setHighlightColorFilter('all')}
                  className={`min-h-[36px] px-3.5 py-1 rounded-full text-xs font-semibold border transition cursor-pointer whitespace-nowrap ${
                    highlightColorFilter === 'all'
                      ? isDay
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-900 border-white'
                      : isDay
                      ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      : 'bg-[#092127] border-[#153e47] text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {isBn ? 'সব রঙ' : 'All'}
                </button>
                {HIGHLIGHT_COLORS.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setHighlightColorFilter(c.id)}
                    className={`min-h-[36px] px-3.5 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 transition cursor-pointer whitespace-nowrap ${
                      highlightColorFilter === c.id
                        ? isDay
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-900 border-white'
                        : isDay
                        ? 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        : 'bg-[#092127] border-[#153e47] text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${c.dotClass}`} />
                    <span>{isBn ? c.labelBn : c.label}</span>
                  </button>
                ))}
              </div>
            )}

            {showAddHighlight && (
              <form
                onSubmit={handleCreateHighlight}
                className={`mb-5 p-4 sm:p-5 rounded-2xl border space-y-3 animate-in fade-in ${
                  isDay ? 'bg-slate-50/70 border-slate-200' : 'bg-[#0a2329] border-[#17444e]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#006A4E] dark:text-emerald-400">
                    {isBn ? 'নতুন হাইলাইট সংরক্ষণ করুন' : 'Save Commentary Highlight'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAddHighlight(false)}
                    className="min-w-[36px] min-h-[36px] rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  required
                  rows={3}
                  value={hlText}
                  onChange={(e) => setHlText(e.target.value)}
                  placeholder={isBn ? 'তাফসীর বা গুরুত্বপূর্ণ অংশ লিখুন বা পেস্ট করুন...' : 'Write or paste commentary text to highlight...'}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none resize-none ${
                    isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                  }`}
                />
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <input
                    type="text"
                    value={hlSource}
                    onChange={(e) => setHlSource(e.target.value)}
                    placeholder={isBn ? 'সূত্র (যেমন: সূরা বাকারা তাফসীর)' : 'Source (e.g. Surah Al-Baqarah Tafsir)'}
                    className={`flex-1 min-w-[180px] min-h-[44px] px-3.5 py-2 rounded-xl border text-xs font-medium focus:outline-none ${
                      isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                    }`}
                  />
                  <div className="flex items-center gap-2">
                    {HIGHLIGHT_COLORS.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setHlColor(c.id)}
                        className={`w-7 h-7 rounded-full ${c.dotClass} transition cursor-pointer ${
                          hlColor === c.id ? 'ring-2 ring-offset-2 ring-[#006A4E] scale-110' : 'opacity-70 hover:opacity-100'
                        }`}
                        title={isBn ? c.labelBn : c.label}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="min-h-[44px] px-5 py-2 rounded-full bg-[#006A4E] hover:bg-[#005740] text-white text-xs font-bold cursor-pointer transition active:scale-95"
                  >
                    {isBn ? 'হাইলাইট সেভ করুন' : 'Save Highlight'}
                  </button>
                </div>
              </form>
            )}

            {filteredHighlights.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-14 px-4">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center mb-5 ${
                    isDay
                      ? 'bg-emerald-50/90 ring-8 ring-emerald-50/40 text-[#006A4E]'
                      : 'bg-emerald-950/60 ring-8 ring-emerald-950/25 text-emerald-400'
                  }`}
                >
                  <Pencil className="w-9 h-9 stroke-[1.8]" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  {searchQuery || highlightColorFilter !== 'all'
                    ? isBn ? 'কোনো হাইলাইট পাওয়া যায়নি' : 'No Matching Highlights'
                    : isBn ? 'এখনো কোনো হাইলাইট নেই' : 'No Highlights Yet'}
                </h3>
                <p className={`text-xs sm:text-sm mt-1.5 max-w-sm leading-relaxed ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                  {searchQuery || highlightColorFilter !== 'all'
                    ? isBn ? 'অন্য ফিল্টার বা শব্দ দিয়ে চেষ্টা করুন।' : 'Try clearing your filter or search query.'
                    : isBn
                    ? 'তাফসীর বা ব্যাখ্যার কোনো লেখা সিলেক্ট করে হাইলাইট করুন'
                    : 'Select text in commentary to highlight it'}
                </p>
                {!searchQuery && highlightColorFilter === 'all' && (
                  <button
                    type="button"
                    onClick={() => setShowAddHighlight(true)}
                    className={`mt-6 min-h-[44px] px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold border flex items-center gap-2 transition active:scale-95 cursor-pointer ${
                      isDay
                        ? 'bg-white border-slate-200 text-[#006A4E] hover:bg-emerald-50 shadow-2xs'
                        : 'bg-[#0c2930] border-[#194a55] text-emerald-300 hover:bg-[#123840]'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isBn ? 'প্রথম হাইলাইট যোগ করুন' : 'Add Your First Highlight'}</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredHighlights.map((hl) => {
                  const colorObj = HIGHLIGHT_COLORS.find((c) => c.id === hl.color) || HIGHLIGHT_COLORS[0];
                  return (
                    <div
                      key={hl.id}
                      className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between gap-3 ${
                        isDay ? colorObj.cardDay : colorObj.cardNight
                      }`}
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0 text-[11px] font-semibold">
                            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${colorObj.dotClass}`} />
                            <span className={`truncate ${colorObj.textAccent}`}>{hl.source}</span>
                            <span aria-hidden="true" className="opacity-50">·</span>
                            <span className="opacity-65 whitespace-nowrap">{formatDate(hl.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleCopy(hl.id, hl.text)}
                              className="min-w-[34px] min-h-[34px] rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-emerald-500 cursor-pointer"
                              title="Copy"
                            >
                              {copiedId === hl.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                removeSavedHighlight(hl.id);
                                refreshAll();
                                if (soundEnabled) soundHaptics.playTap();
                              }}
                              className="min-w-[34px] min-h-[34px] rounded-xl flex items-center justify-center hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 cursor-pointer"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm leading-relaxed font-medium whitespace-pre-wrap">
                          “{hl.text}”
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: NOTES */}
        {activeTab === 'notes' && (
          <div className="flex-1 flex flex-col">
            {showNoteForm && (
              <form
                onSubmit={handleSaveNote}
                className={`mb-5 p-4 sm:p-5 rounded-2xl border space-y-3 animate-in fade-in ${
                  isDay ? 'bg-slate-50/70 border-slate-200' : 'bg-[#0a2329] border-[#17444e]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#006A4E] dark:text-emerald-400">
                    {editingNoteId
                      ? isBn ? 'নোট সম্পাদনা করুন' : 'Edit Study Note'
                      : isBn ? 'নতুন নোট লিখুন' : 'Create Study Note'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowNoteForm(false)}
                    className="min-w-[36px] min-h-[36px] rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={(e) => setNoteTitle(e.target.value)}
                  placeholder={isBn ? 'নোটের শিরোনাম...' : 'Note title...'}
                  className={`w-full min-h-[44px] px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-bold focus:outline-none ${
                    isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                  }`}
                />
                <textarea
                  required
                  rows={4}
                  value={noteContent}
                  onChange={(e) => setNoteContent(e.target.value)}
                  placeholder={isBn ? 'আপনার চিন্তাভাবনা, তাফসীরের শিক্ষা বা আমলের নোট লিখুন...' : 'Write your reflection, tafsir insight, or reminder...'}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium focus:outline-none resize-none ${
                    isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                  }`}
                />
                <input
                  type="text"
                  value={noteSource}
                  onChange={(e) => setNoteSource(e.target.value)}
                  placeholder={isBn ? 'সূত্র বা বিষয় (ঐচ্ছিক)' : 'Topic or reference (optional)'}
                  className={`w-full min-h-[44px] px-3.5 py-2 rounded-xl border text-xs font-medium focus:outline-none ${
                    isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                  }`}
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="min-h-[44px] px-5 py-2 rounded-full bg-[#006A4E] hover:bg-[#005740] text-white text-xs font-bold cursor-pointer transition active:scale-95"
                  >
                    {isBn ? 'নোট সংরক্ষণ করুন' : 'Save Note'}
                  </button>
                </div>
              </form>
            )}

            {filteredNotes.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-14 px-4">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center mb-5 ${
                    isDay
                      ? 'bg-emerald-50/90 ring-8 ring-emerald-50/40 text-[#006A4E]'
                      : 'bg-emerald-950/60 ring-8 ring-emerald-950/25 text-emerald-400'
                  }`}
                >
                  <FileText className="w-9 h-9 stroke-[1.8]" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold tracking-tight">
                  {searchQuery
                    ? isBn ? 'কোনো নোট পাওয়া যায়নি' : 'No Matching Notes'
                    : isBn ? 'এখনো কোনো নোট নেই' : 'No Notes Yet'}
                </h3>
                <p className={`text-xs sm:text-sm mt-1.5 max-w-sm leading-relaxed ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                  {searchQuery
                    ? isBn ? 'অন্য কোনো শব্দ দিয়ে খুঁজে দেখুন।' : 'Try searching with a different keyword.'
                    : isBn
                    ? 'কোরআন, তাফসীর বা দ্বীনি শিক্ষার গুরুত্বপূর্ণ নোটস এখানে লিখে সংরক্ষণ করুন'
                    : 'Write personal reflections and study notes to keep them organized here'}
                </p>
                {!searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleOpenEditNote()}
                    className={`mt-6 min-h-[44px] px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold border flex items-center gap-2 transition active:scale-95 cursor-pointer ${
                      isDay
                        ? 'bg-white border-slate-200 text-[#006A4E] hover:bg-emerald-50 shadow-2xs'
                        : 'bg-[#0c2930] border-[#194a55] text-emerald-300 hover:bg-[#123840]'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isBn ? 'নতুন নোট লিখুন' : 'Write Your First Note'}</span>
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredNotes.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition flex flex-col justify-between gap-2.5 ${
                      isDay
                        ? 'bg-white border-slate-200/90 hover:border-emerald-300 shadow-2xs'
                        : 'bg-[#0b262d] border-[#17444e] hover:border-emerald-700/60'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="font-bold text-sm sm:text-base leading-snug">{n.title}</h4>
                          <div className={`text-[11px] font-medium mt-0.5 flex items-center gap-1.5 ${isDay ? 'text-slate-500' : 'text-slate-400'}`}>
                            {n.source && (
                              <>
                                <span className={isDay ? 'text-[#006A4E] font-semibold' : 'text-emerald-400 font-semibold'}>
                                  {n.source}
                                </span>
                                <span aria-hidden="true">·</span>
                              </>
                            )}
                            <span>{formatDate(n.updatedAt || n.createdAt)}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-0.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleOpenEditNote(n)}
                            className="min-w-[34px] min-h-[34px] rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-emerald-500 cursor-pointer"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCopy(n.id, `${n.title}\n\n${n.content}`)}
                            className="min-w-[34px] min-h-[34px] rounded-xl flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-emerald-500 cursor-pointer"
                            title="Copy"
                          >
                            {copiedId === n.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              removeSavedNote(n.id);
                              refreshAll();
                              if (soundEnabled) soundHaptics.playTap();
                            }}
                            className="min-w-[34px] min-h-[34px] rounded-xl flex items-center justify-center hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className={`text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${isDay ? 'text-slate-700' : 'text-slate-200'}`}>
                        {n.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
