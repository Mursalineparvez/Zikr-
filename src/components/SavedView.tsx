import React, { useState, useEffect } from 'react';
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
  barClass: string;
  bgDay: string;
  bgNight: string;
  dotClass: string;
}> = [
  {
    id: 'amber',
    label: 'Gold',
    barClass: 'bg-amber-500',
    bgDay: 'bg-amber-50/90 border-amber-200',
    bgNight: 'bg-amber-950/30 border-amber-800/50',
    dotClass: 'bg-amber-400',
  },
  {
    id: 'emerald',
    label: 'Emerald',
    barClass: 'bg-emerald-600',
    bgDay: 'bg-emerald-50/90 border-emerald-200',
    bgNight: 'bg-emerald-950/30 border-emerald-800/50',
    dotClass: 'bg-emerald-500',
  },
  {
    id: 'rose',
    label: 'Crimson',
    barClass: 'bg-rose-600',
    bgDay: 'bg-rose-50/90 border-rose-200',
    bgNight: 'bg-rose-950/30 border-rose-800/50',
    dotClass: 'bg-rose-500',
  },
  {
    id: 'teal',
    label: 'Teal',
    barClass: 'bg-teal-600',
    bgDay: 'bg-teal-50/90 border-teal-200',
    bgNight: 'bg-teal-950/30 border-teal-800/50',
    dotClass: 'bg-teal-500',
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

  // Add/Edit inline composer state
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

  const tabs: Array<{ id: SavedTab; label: string; count: number }> = [
    { id: 'bookmarks', label: isBn ? 'বুকমার্ক' : 'Bookmarks', count: bookmarks.length },
    { id: 'highlights', label: isBn ? 'হাইলাইট' : 'Highlights', count: highlights.length },
    { id: 'notes', label: isBn ? 'নোটস' : 'Notes', count: notes.length },
  ];

  return (
    <div
      className={`rounded-3xl border p-5 sm:p-6 min-h-[540px] flex flex-col transition-colors ${
        isDay
          ? 'bg-[#fcfaf5] border-stone-200/90 text-slate-900 shadow-sm'
          : 'bg-[#071c21] border-[#143b44] text-white shadow-xl'
      }`}
    >
      {/* Top Header matching user screenshot */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            {onBackToHub && (
              <button
                type="button"
                onClick={onBackToHub}
                className={`p-1.5 rounded-xl border transition active:scale-95 cursor-pointer ${
                  isDay
                    ? 'bg-white border-stone-200 text-slate-700 hover:bg-stone-100'
                    : 'bg-[#0c2930] border-[#194a55] text-emerald-300 hover:bg-[#123840]'
                }`}
                title={isBn ? 'ফিরে যান' : 'Back'}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2
              className={`text-2xl sm:text-3xl font-black tracking-tight ${
                isDay ? 'text-[#006A4E]' : 'text-emerald-400'
              }`}
            >
              {isBn ? 'সংরক্ষিত (Saved)' : 'Saved'}
            </h2>
          </div>
          <p className={`text-xs sm:text-sm mt-1 font-medium ${isDay ? 'text-stone-500' : 'text-slate-400'}`}>
            {isBn ? 'আপনার বুকমার্ক, হাইলাইট এবং নোটসমূহ' : 'Your bookmarks, highlights, and notes'}
          </p>
        </div>

        {/* Quick Add Button for current tab */}
        <button
          type="button"
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            if (activeTab === 'bookmarks') setShowAddBookmark((p) => !p);
            else if (activeTab === 'highlights') setShowAddHighlight((p) => !p);
            else handleOpenEditNote();
          }}
          className={`px-3 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer shrink-0 shadow-xs ${
            isDay
              ? 'bg-[#006A4E] hover:bg-[#005740] text-white'
              : 'bg-emerald-600 hover:bg-emerald-500 text-white'
          }`}
        >
          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>
            {activeTab === 'bookmarks'
              ? isBn ? 'নতুন' : 'Add'
              : activeTab === 'highlights'
              ? isBn ? 'হাইলাইট' : 'Highlight'
              : isBn ? 'নোট' : 'Note'}
          </span>
        </button>
      </div>

      {/* Segmented Pill Tabs: Bookmarks | Highlights | Notes */}
      <div className="flex items-center gap-2 sm:gap-3 mt-5 mb-6 overflow-x-auto pb-1">
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
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer active:scale-95 flex items-center gap-2 shrink-0 ${
                isActive
                  ? isDay
                    ? 'bg-[#006A4E] text-white shadow-md'
                    : 'bg-emerald-600 text-white shadow-md shadow-emerald-950/60'
                  : isDay
                  ? 'bg-transparent text-stone-700 hover:bg-stone-200/60'
                  : 'bg-transparent text-slate-300 hover:bg-white/10'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-extrabold ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : isDay
                      ? 'bg-stone-200 text-stone-700'
                      : 'bg-white/10 text-emerald-300'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: BOOKMARKS */}
      {activeTab === 'bookmarks' && (
        <div className="flex-1 flex flex-col">
          {showAddBookmark && (
            <form
              onSubmit={handleCreateBookmark}
              className={`mb-4 p-4 rounded-2xl border space-y-3 animate-in fade-in ${
                isDay ? 'bg-white border-stone-200' : 'bg-[#0b262d] border-[#194a55]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {isBn ? 'কাস্টম বুকমার্ক যোগ করুন' : 'Save Custom Bookmark'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddBookmark(false)}
                  className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <input
                type="text"
                required
                value={bmTitle}
                onChange={(e) => setBmTitle(e.target.value)}
                placeholder={isBn ? 'শিরোনাম (যেমন: সূরা কাহাফ - জুমার দিন)' : 'Title (e.g. Surah Al-Kahf - Friday)'}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-semibold focus:outline-none ${
                  isDay ? 'bg-stone-50 border-stone-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                }`}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={bmSubtitle}
                  onChange={(e) => setBmSubtitle(e.target.value)}
                  placeholder={isBn ? 'বিবরণ বা রেফারেন্স (ঐচ্ছিক)' : 'Reference or note (optional)'}
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-medium focus:outline-none ${
                    isDay ? 'bg-stone-50 border-stone-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                  }`}
                />
                <input
                  type="text"
                  value={bmSource}
                  onChange={(e) => setBmSource(e.target.value)}
                  placeholder={isBn ? 'উৎস (যেমন: আল-কোরআন)' : 'Source (e.g. Al-Quran)'}
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-medium focus:outline-none ${
                    isDay ? 'bg-stone-50 border-stone-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                  }`}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#006A4E] hover:bg-[#005740] text-white text-xs font-bold cursor-pointer"
                >
                  {isBn ? 'বুকমার্ক সেভ করুন' : 'Save Bookmark'}
                </button>
              </div>
            </form>
          )}

          {bookmarks.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  isDay ? 'bg-emerald-100/80 text-[#006A4E]' : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50'
                }`}
              >
                <Bookmark className="w-7 h-7 stroke-[2]" />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold">
                {isBn ? 'এখনো কোনো বুকমার্ক নেই' : 'No Bookmarks Yet'}
              </h3>
              <p className={`text-xs sm:text-sm mt-1 max-w-xs ${isDay ? 'text-stone-500' : 'text-slate-400'}`}>
                {isBn
                  ? 'কোরআন, সাহাবি জীবনী বা হাদিস পড়ার সময় বুকমার্ক আইকনে ট্যাপ করে এখানে সংরক্ষণ করুন'
                  : 'Tap the bookmark icon while reading Quran or chapters to save them here'}
              </p>
              {onNavigateToQuran && (
                <button
                  type="button"
                  onClick={onNavigateToQuran}
                  className={`mt-5 px-4 py-2 rounded-full text-xs font-bold border flex items-center gap-1.5 transition active:scale-95 cursor-pointer ${
                    isDay
                      ? 'bg-white border-stone-200 text-[#006A4E] hover:bg-emerald-50'
                      : 'bg-[#0c2930] border-[#194a55] text-emerald-300 hover:bg-[#123840]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{isBn ? 'আল-কোরআন পড়ুন' : 'Open Al-Quran'}</span>
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarks.map((bm) => (
                <div
                  key={bm.id}
                  className={`p-4 rounded-2xl border transition flex flex-col gap-2 ${
                    isDay ? 'bg-white border-stone-200/90 shadow-2xs' : 'bg-[#0b262d] border-[#17444e]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span
                        className={`inline-block text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full mb-1 ${
                          isDay ? 'bg-emerald-100 text-[#006A4E]' : 'bg-emerald-500/20 text-emerald-300'
                        }`}
                      >
                        {bm.sourceLabel}
                      </span>
                      <h4 className="font-extrabold text-sm leading-snug">{bm.title}</h4>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopy(bm.id, `${bm.title}\n${bm.arabic || ''}\n${bm.subtitle}`)}
                        className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-emerald-500 cursor-pointer"
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
                        className="p-1.5 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {bm.arabic && (
                    <p dir="rtl" className="font-arabic text-lg leading-loose text-emerald-700 dark:text-emerald-300">
                      {bm.arabic}
                    </p>
                  )}
                  {bm.subtitle && (
                    <p className={`text-xs leading-relaxed ${isDay ? 'text-stone-600' : 'text-slate-300'}`}>
                      {bm.subtitle}
                    </p>
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
          {showAddHighlight && (
            <form
              onSubmit={handleCreateHighlight}
              className={`mb-4 p-4 rounded-2xl border space-y-3 animate-in fade-in ${
                isDay ? 'bg-white border-stone-200' : 'bg-[#0b262d] border-[#194a55]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {isBn ? 'নতুন হাইলাইট সংরক্ষণ করুন' : 'Add Highlight'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowAddHighlight(false)}
                  className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <textarea
                required
                rows={3}
                value={hlText}
                onChange={(e) => setHlText(e.target.value)}
                placeholder={isBn ? 'হাইলাইট করার জন্য তাফসীর বা গুরুত্বপূর্ণ অংশ লিখুন বা পেস্ট করুন...' : 'Write or paste commentary text to highlight...'}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-medium focus:outline-none resize-none ${
                  isDay ? 'bg-stone-50 border-stone-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                }`}
              />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <input
                  type="text"
                  value={hlSource}
                  onChange={(e) => setHlSource(e.target.value)}
                  placeholder={isBn ? 'সূত্র (যেমন: সূরা বাকারা, তাফসীর)' : 'Source (e.g. Surah Al-Baqarah Tafsir)'}
                  className={`flex-1 min-w-[160px] px-3 py-2 rounded-xl border text-xs font-medium focus:outline-none ${
                    isDay ? 'bg-stone-50 border-stone-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                  }`}
                />
                <div className="flex items-center gap-1.5">
                  {HIGHLIGHT_COLORS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setHlColor(c.id)}
                      className={`w-6 h-6 rounded-full ${c.dotClass} transition cursor-pointer ${
                        hlColor === c.id ? 'ring-2 ring-offset-2 ring-emerald-500 scale-110' : 'opacity-70 hover:opacity-100'
                      }`}
                      title={c.label}
                    />
                  ))}
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#006A4E] hover:bg-[#005740] text-white text-xs font-bold cursor-pointer"
                >
                  {isBn ? 'হাইলাইট সেভ করুন' : 'Save Highlight'}
                </button>
              </div>
            </form>
          )}

          {highlights.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  isDay ? 'bg-emerald-100/80 text-[#006A4E]' : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50'
                }`}
              >
                <Pencil className="w-7 h-7 stroke-[2]" />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold">
                {isBn ? 'এখনো কোনো হাইলাইট নেই' : 'No Highlights Yet'}
              </h3>
              <p className={`text-xs sm:text-sm mt-1 max-w-xs ${isDay ? 'text-stone-500' : 'text-slate-400'}`}>
                {isBn
                  ? 'তাফসীর বা ব্যাখ্যার কোনো লেখা সিলেক্ট করে হাইলাইট করুন অথবা উপরের বাটন থেকে যোগ করুন'
                  : 'Select text in commentary to highlight it'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {highlights.map((hl) => {
                const colorObj = HIGHLIGHT_COLORS.find((c) => c.id === hl.color) || HIGHLIGHT_COLORS[0];
                return (
                  <div
                    key={hl.id}
                    className={`p-4 rounded-2xl border relative overflow-hidden pl-5 ${
                      isDay ? colorObj.bgDay : colorObj.bgNight
                    }`}
                  >
                    <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${colorObj.barClass}`} />
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-bold opacity-80">
                        {hl.source} • {formatDate(hl.createdAt)}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleCopy(hl.id, hl.text)}
                          className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-emerald-500 cursor-pointer"
                          title="Copy"
                        >
                          {copiedId === hl.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            removeSavedHighlight(hl.id);
                            refreshAll();
                            if (soundEnabled) soundHaptics.playTap();
                          }}
                          className="p-1 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed font-medium whitespace-pre-wrap">
                      “{hl.text}”
                    </p>
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
              className={`mb-4 p-4 rounded-2xl border space-y-3 animate-in fade-in ${
                isDay ? 'bg-white border-stone-200' : 'bg-[#0b262d] border-[#194a55]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  {editingNoteId
                    ? isBn ? 'নোট সম্পাদনা' : 'Edit Note'
                    : isBn ? 'নতুন নোট লিখুন' : 'Create Study Note'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowNoteForm(false)}
                  className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <input
                type="text"
                value={noteTitle}
                onChange={(e) => setNoteTitle(e.target.value)}
                placeholder={isBn ? 'নোটের শিরোনাম...' : 'Note title...'}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none ${
                  isDay ? 'bg-stone-50 border-stone-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                }`}
              />
              <textarea
                required
                rows={4}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder={isBn ? 'আপনার চিন্তাভাবনা, শিক্ষা বা আমলের নোট লিখুন...' : 'Write your reflection, tafsir insight, or reminder...'}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-medium focus:outline-none resize-none ${
                  isDay ? 'bg-stone-50 border-stone-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                }`}
              />
              <input
                type="text"
                value={noteSource}
                onChange={(e) => setNoteSource(e.target.value)}
                placeholder={isBn ? 'ট্যাগ বা সূত্র (ঐচ্ছিক)' : 'Tag or reference (optional)'}
                className={`w-full px-3 py-2 rounded-xl border text-xs font-medium focus:outline-none ${
                  isDay ? 'bg-stone-50 border-stone-200 text-slate-900' : 'bg-[#06161a] border-[#194a55] text-white'
                }`}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#006A4E] hover:bg-[#005740] text-white text-xs font-bold cursor-pointer"
                >
                  {isBn ? 'নোট সেভ করুন' : 'Save Note'}
                </button>
              </div>
            </form>
          )}

          {notes.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12 px-4">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  isDay ? 'bg-emerald-100/80 text-[#006A4E]' : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50'
                }`}
              >
                <FileText className="w-7 h-7 stroke-[2]" />
              </div>
              <h3 className="text-base sm:text-lg font-extrabold">
                {isBn ? 'এখনো কোনো নোট নেই' : 'No Notes Yet'}
              </h3>
              <p className={`text-xs sm:text-sm mt-1 max-w-xs ${isDay ? 'text-stone-500' : 'text-slate-400'}`}>
                {isBn
                  ? 'কোরআন, তাফসীর বা দ্বীনি শিক্ষার গুরুত্বপূর্ণ নোটস এখানে লিখে সংরক্ষণ করুন'
                  : 'Write personal reflections and study notes to keep them organized here'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((n) => (
                <div
                  key={n.id}
                  className={`p-4 rounded-2xl border transition space-y-1.5 ${
                    isDay ? 'bg-white border-stone-200/90 shadow-2xs' : 'bg-[#0b262d] border-[#17444e]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-sm leading-snug">{n.title}</h4>
                      <div className={`text-[10px] font-semibold mt-0.5 ${isDay ? 'text-stone-500' : 'text-slate-400'}`}>
                        {n.source ? `${n.source} • ` : ''}
                        {formatDate(n.updatedAt || n.createdAt)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleOpenEditNote(n)}
                        className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-emerald-500 cursor-pointer"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleCopy(n.id, `${n.title}\n\n${n.content}`)}
                        className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-emerald-500 cursor-pointer"
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
                        className="p-1.5 rounded-lg hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className={`text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${isDay ? 'text-stone-700' : 'text-slate-200'}`}>
                    {n.content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
