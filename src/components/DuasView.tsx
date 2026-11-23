import React, { useState, useEffect } from 'react';
import { DuaCategory, DuaItem, ZikrItem } from '../types';
import { AUTHENTIC_DUAS } from '../utils/duasData';
import { copyToClipboard } from '../utils/clipboard';
import { calculatePrayerTimes, FormattedPrayerTimes } from '../utils/prayerTimes';
import { BookOpen, Compass, Search, Plus, Copy, Check, Sparkles, Clock, MapPin, Volume2, X } from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';

interface DuasViewProps {
  onAddDuaToCounters: (dua: DuaItem) => void;
  activeCounters: ZikrItem[];
  soundEnabled: boolean;
}

export const DuasView: React.FC<DuasViewProps> = ({
  onAddDuaToCounters,
  activeCounters,
  soundEnabled,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DuaCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Quick counter state for inline counting within Dua cards
  const [inlineCounts, setInlineCounts] = useState<{ [key: string]: number }>({});

  // Prayer times state
  const [prayerData, setPrayerData] = useState<FormattedPrayerTimes>(() =>
    calculatePrayerTimes()
  );
  const [isLocating, setIsLocating] = useState(false);

  // Update prayer countdown every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setPrayerData((prev) => calculatePrayerTimes(undefined, undefined, prev.cityName));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Request user geolocation for local prayer times
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser.');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const updated = calculatePrayerTimes(latitude, longitude, 'Your Local Time');
        setPrayerData(updated);
        setIsLocating(false);
      },
      () => {
        // Geolocation denied, fallback cleanly to Makkah
        setIsLocating(false);
      }
    );
  };

  const handleCopyText = async (dua: DuaItem) => {
    const text = `${dua.title}\n\n${dua.arabic}\n\n${dua.transliteration}\n\n"${dua.translation}"\n\nReference: ${dua.reference}`;
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedId(dua.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const handleInlineCount = (id: string, target?: number) => {
    setInlineCounts((prev) => {
      const current = prev[id] || 0;
      const next = current + 1;
      if (soundEnabled) {
        soundHaptics.playBeadClick();
        if (target && next === target) {
          soundHaptics.playTargetChime();
        }
      }
      soundHaptics.triggerVibration('tap');
      return { ...prev, [id]: next };
    });
  };

  const handleInlineReset = (id: string) => {
    setInlineCounts((prev) => ({ ...prev, [id]: 0 }));
  };

  // Filter Duas
  const filteredDuas = AUTHENTIC_DUAS.filter((dua) => {
    const matchesCategory = selectedCategory === 'all' || dua.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      dua.title.toLowerCase().includes(query) ||
      dua.translation.toLowerCase().includes(query) ||
      dua.transliteration.toLowerCase().includes(query) ||
      dua.arabic.includes(query) ||
      dua.reference.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  const categories = [
    { id: 'all', label: 'All Treasures', icon: '✨' },
    { id: 'salat', label: 'Salat & Prayer', icon: '🕌' },
    { id: 'quran', label: 'Quranic Duas', icon: '📖' },
    { id: 'hadith', label: 'Hadith & Virtues', icon: '📜' },
    { id: 'morning_evening', label: 'Morning & Evening', icon: '🌅' },
  ];

  return (
    <div className="space-y-6">
      
      {/* 1. PRAYER TIMES & SALAT COUNTDOWN CARD */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/60 to-slate-950 border border-emerald-600/30 p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-900/50 pb-4 mb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
              <Compass className="w-4 h-4 text-amber-300" />
              <span>Salat Prayer Times</span>
              <span className="text-[10px] text-slate-400 font-normal">({prayerData.cityName})</span>
            </div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>Next: {prayerData.nextPrayerName}</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-amber-300 border border-emerald-600/40 font-semibold">
                in {prayerData.timeRemainingFormatted}
              </span>
            </h2>
          </div>

          <button
            onClick={handleDetectLocation}
            disabled={isLocating}
            className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-medium transition active:scale-95 disabled:opacity-50"
          >
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{isLocating ? 'Detecting GPS...' : 'Use My Location'}</span>
          </button>
        </div>

        {/* 6 Salat Times Columns */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
          {[
            { name: 'Fajr', time: prayerData.fajr },
            { name: 'Sunrise', time: prayerData.sunrise },
            { name: 'Dhuhr', time: prayerData.dhuhr },
            { name: 'Asr', time: prayerData.asr },
            { name: 'Maghrib', time: prayerData.maghrib },
            { name: 'Isha', time: prayerData.isha },
          ].map((item, idx) => {
            const isNext = prayerData.nextPrayerName.toLowerCase() === item.name.toLowerCase();
            return (
              <div
                key={idx}
                className={`p-2.5 rounded-2xl border transition ${
                  isNext
                    ? 'bg-gradient-to-b from-emerald-950 to-slate-900 border-amber-400/60 shadow-lg shadow-emerald-950/80'
                    : 'bg-slate-950/60 border-slate-800/80'
                }`}
              >
                <div className={`text-xs font-bold ${isNext ? 'text-amber-300' : 'text-slate-400'}`}>
                  {item.name}
                </div>
                <div className="text-sm sm:text-base font-extrabold text-white mt-0.5">
                  {item.time}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2. CATEGORY PILLS & COMPACT SEARCH ICON */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none flex-1 min-w-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition active:scale-95 ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/60'
                    : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              if (soundEnabled) soundHaptics.playTap();
              setIsSearchOpen((prev) => {
                if (prev && searchQuery) setSearchQuery('');
                return !prev;
              });
            }}
            className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition cursor-pointer active:scale-95 ${
              isSearchOpen || searchQuery
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : 'bg-slate-900/80 border-slate-800 text-emerald-300 hover:border-emerald-500'
            }`}
            title="Search"
            aria-label="Search"
          >
            {isSearchOpen ? <X className="w-4 h-4" /> : <Search className="w-4 h-4" />}
          </button>
        </div>

        {/* Expandable Search */}
        {(isSearchOpen || searchQuery.trim().length > 0) && (
          <div className="relative animate-in fade-in duration-150">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              autoFocus={isSearchOpen}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Quran, Hadith, Rabbana, or Salat duas..."
              className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-slate-900/90 border border-slate-800 focus:border-emerald-500 text-sm text-white placeholder-slate-500 focus:outline-none transition shadow-inner"
            />
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              aria-label="Close search"
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 3. DUAS LIST */}
      <div className="space-y-4">
        {filteredDuas.map((dua) => {
          const isAlreadyInCounters = activeCounters.some(
            (c) => c.name.toLowerCase() === dua.title.toLowerCase() || c.arabic === dua.arabic
          );
          const inlineCount = inlineCounts[dua.id] || 0;
          const target = dua.suggestedCount || 33;
          const isInlineComplete = inlineCount >= target;

          return (
            <div
              key={dua.id}
              className="rounded-3xl bg-slate-900/90 border border-emerald-900/40 p-5 sm:p-6 shadow-xl transition hover:border-emerald-700/60 space-y-4"
            >
              {/* Header: Title, Category Badge & Timing */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>{dua.title}</span>
                  </h3>
                  {dua.timing && (
                    <div className="text-xs text-amber-300/90 font-medium flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{dua.timing}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/50">
                    {dua.category === 'salat' ? 'Salat' : dua.category === 'quran' ? 'Quran' : dua.category === 'hadith' ? 'Hadith' : 'Adhkar'}
                  </span>
                  {dua.suggestedCount && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-950/70 text-amber-300 border border-amber-800/40">
                      Sunnah: {dua.suggestedCount}x
                    </span>
                  )}
                </div>
              </div>

              {/* Arabic Calligraphy Script */}
              <div className="py-2 px-3 bg-slate-950/60 rounded-2xl border border-slate-800/80">
                <div
                  className="font-arabic text-2xl sm:text-3xl text-emerald-300 font-bold leading-relaxed text-right select-text"
                  dir="rtl"
                >
                  {dua.arabic}
                </div>
              </div>

              {/* Transliteration & English Translation */}
              <div className="space-y-1.5 text-xs">
                <div className="text-slate-300 font-medium italic leading-relaxed select-text">
                  {dua.transliteration}
                </div>
                <div className="text-slate-400 leading-relaxed select-text bg-slate-950/40 p-3 rounded-xl border border-slate-800/60">
                  "{dua.translation}"
                </div>
              </div>

              {/* Reference & Sacred Virtue */}
              <div className="space-y-1 text-xs">
                {dua.virtue && (
                  <div className="text-amber-200/90 bg-amber-950/30 p-2.5 rounded-xl border border-amber-800/40 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{dua.virtue}</span>
                  </div>
                )}
                <div className="text-[11px] text-slate-500 font-medium">
                  Source: <strong className="text-slate-400">{dua.reference}</strong>
                </div>
              </div>

              {/* Actions: Add to Live Counters, Copy, Quick Count */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                {/* Inline Instant Bead Counter */}
                <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400">Recited:</span>
                  <span className={`text-sm font-black ${isInlineComplete ? 'text-amber-300' : 'text-emerald-400'}`}>
                    {inlineCount}
                  </span>
                  {dua.suggestedCount && (
                    <span className="text-[10px] text-slate-500">/ {dua.suggestedCount}</span>
                  )}
                  <button
                    onClick={() => handleInlineCount(dua.id, dua.suggestedCount)}
                    className="ml-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition active:scale-95"
                  >
                    +1 Tap
                  </button>
                  {inlineCount > 0 && (
                    <button
                      onClick={() => handleInlineReset(dua.id)}
                      className="text-[10px] text-slate-400 hover:text-white"
                      title="Reset inline count"
                    >
                      ↺
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Copy Text Button */}
                  <button
                    onClick={() => handleCopyText(dua)}
                    title="Copy full Arabic and Translation"
                    className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition active:scale-95"
                  >
                    {copiedId === dua.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  {/* Add as Active Counter in App Button */}
                  <button
                    onClick={() => onAddDuaToCounters(dua)}
                    disabled={isAlreadyInCounters}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition active:scale-95 ${
                      isAlreadyInCounters
                        ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-default'
                        : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-950/60'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isAlreadyInCounters ? 'In Counters' : 'Add to My Counters'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
