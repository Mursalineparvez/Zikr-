import React, { useState, useMemo, useEffect } from 'react';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  Shield,
  Sword,
  BookOpen,
  Calendar,
  Users,
  Award,
  Sparkles,
  Search,
  ChevronRight,
  ChevronLeft,
  X,
  Compass,
  ArrowLeft,
  Flame,
  CheckCircle2,
  Bookmark,
  Copy,
  Heart,
  ScrollText,
  Quote,
  Globe,
  MapPin,
  ExternalLink,
  Crown,
  Layers,
  RotateCcw,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { BattleLiveMap } from './BattleLiveMap';
import { useHorizontalSwipe } from '../hooks/useHorizontalSwipe';
import { SwipeFloatingFeedback, QuickReaderSwitcherStrip } from './SwipeNavigationOverlay';
import {
  WarItem,
  BattleMartyr,
  KeyBattleEvent,
  HadithRef,
  QuranRef,
  EraSectionMeta,
  ERA_SECTIONS,
  ISLAMIC_WARS_DATA,
  WARS_EN_MAP,
} from '../data/islamicWarsData';

// Re-export for BattleLiveMap and other consumers
export type { WarItem, BattleMartyr, KeyBattleEvent, HadithRef, QuranRef, EraSectionMeta };
export { ERA_SECTIONS, ISLAMIC_WARS_DATA, WARS_EN_MAP };

interface IslamicHistoryWarsViewProps {
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  soundEnabled?: boolean;
  onBackToHub?: () => void;
}

const WARS_STORAGE_KEYS = {
  COMPLETED: 'zikr_wars_completed_ids',
  BOOKMARKED: 'zikr_wars_bookmarks',
  LAST_READ: 'zikr_wars_last_read_id',
};

const toBnDigits = (num: number | string) =>
  String(num).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);

export const IslamicHistoryWarsView: React.FC<IslamicHistoryWarsViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
  onBackToHub,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';
  const formatNum = (num: number | string) => (isBn ? toBnDigits(num) : String(num));

  const [selectedWarId, setSelectedWarId] = useState<string | null>(null);
  const [, startTransition] = React.useTransition();

  const [completedWars, setCompletedWars] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WARS_STORAGE_KEYS.COMPLETED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarkedWars, setBookmarkedWars] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WARS_STORAGE_KEYS.BOOKMARKED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [lastReadWarId, setLastReadWarId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(WARS_STORAGE_KEYS.LAST_READ);
    } catch {
      return null;
    }
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showWarBibliographyModal, setShowWarBibliographyModal] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2500);
  };

  const handleSelectWar = (id: string | null) => {
    if (soundEnabled) soundHaptics.playTap();
    if (id) {
      try {
        localStorage.setItem(WARS_STORAGE_KEYS.LAST_READ, id);
        setLastReadWarId(id);
      } catch {}
    }
    startTransition(() => {
      setSelectedWarId(id);
    });
  };

  const toggleCompleteWar = (id: string) => {
    setCompletedWars((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(WARS_STORAGE_KEYS.COMPLETED, JSON.stringify(next));
      } catch {}
      showToast(next.includes(id) ? (isBn ? 'যুদ্ধ পঠন সম্পন্ন চিহ্নিত হয়েছে' : 'Marked as Completed') : (isBn ? 'পঠন তালিকা থেকে সরানো হয়েছে' : 'Marked as Unread'));
      if (soundEnabled) soundHaptics.playTap();
      return next;
    });
  };

  const toggleBookmarkWar = (id: string) => {
    setBookmarkedWars((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      try {
        localStorage.setItem(WARS_STORAGE_KEYS.BOOKMARKED, JSON.stringify(next));
      } catch {}
      showToast(next.includes(id) ? (isBn ? 'বুকমার্কে যুক্ত করা হয়েছে' : 'Bookmarked') : (isBn ? 'বুকমার্ক সরানো হয়েছে' : 'Bookmark Removed'));
      if (soundEnabled) soundHaptics.playTap();
      return next;
    });
  };

  const handleCopyHadithRef = (hr: HadithRef) => {
    const parts: string[] = [];
    if (hr.arabic) parts.push(hr.arabic);
    parts.push(`"${isBn ? hr.textBn : (hr.textEn || hr.textBn)}"`);
    parts.push(`— ${isBn ? hr.sourceBn : hr.sourceEn}`);
    navigator.clipboard.writeText(parts.join('\n\n'));
    showToast(isBn ? 'হাদীস শরীফ কপি করা হয়েছে' : 'Hadith Copied');
    if (soundEnabled) soundHaptics.playTap();
  };

  const handleCopyQuranRef = (qr: QuranRef) => {
    const parts: string[] = [];
    if (qr.arabic) parts.push(qr.arabic);
    parts.push(`"${isBn ? qr.translationBn : (qr.translationEn || qr.translationBn)}"`);
    parts.push(`— ${isBn ? qr.surahNameBn : qr.surahNameEn} (আয়াত: ${qr.verseNo}) [পবিত্র কুরআন]`);
    navigator.clipboard.writeText(parts.join('\n\n'));
    showToast(isBn ? 'কুরআনের আয়াত কপি করা হয়েছে' : 'Quranic Verse Copied');
    if (soundEnabled) soundHaptics.playTap();
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [active3DMapWarId, setActive3DMapWarId] = useState<string | null>(null);
  const [copiedQuote, setCopiedQuote] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [selectedWarId, active3DMapWarId]);

  const activeWar = useMemo(() => {
    if (!selectedWarId) return null;
    return ISLAMIC_WARS_DATA.find((w) => w.id === selectedWarId) || null;
  }, [selectedWarId]);

  const mapWar = useMemo(() => {
    if (!active3DMapWarId) return null;
    return ISLAMIC_WARS_DATA.find((w) => w.id === active3DMapWarId) || null;
  }, [active3DMapWarId]);

  const lastReadWar = useMemo(() => {
    if (!lastReadWarId) return null;
    return ISLAMIC_WARS_DATA.find((w) => w.id === lastReadWarId) || null;
  }, [lastReadWarId]);

  const currentIndex = useMemo(() => {
    if (!selectedWarId) return -1;
    return ISLAMIC_WARS_DATA.findIndex((w) => w.id === selectedWarId);
  }, [selectedWarId]);

  const prevWar = useMemo(() => {
    if (currentIndex > 0) return ISLAMIC_WARS_DATA[currentIndex - 1];
    return null;
  }, [currentIndex]);

  const nextWar = useMemo(() => {
    if (currentIndex >= 0 && currentIndex < ISLAMIC_WARS_DATA.length - 1) return ISLAMIC_WARS_DATA[currentIndex + 1];
    return null;
  }, [currentIndex]);

  const totalWars = ISLAMIC_WARS_DATA.length;
  const completedCount = completedWars.length;
  const progressPercentage = Math.round((completedCount / totalWars) * 100);

  // Group wars by era for Book-Style Table of Contents (TOC)
  const warsByEra = useMemo(() => {
    const map: Record<WarItem['eraKey'], WarItem[]> = {
      prophetic: [],
      rashidun: [],
      umayyad: [],
      abbasid: [],
      andalusian: [],
      modern: [],
    };
    ISLAMIC_WARS_DATA.forEach((w) => {
      if (map[w.eraKey]) {
        map[w.eraKey].push(w);
      }
    });
    return map;
  }, []);

  const filteredWars = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ISLAMIC_WARS_DATA;
    return ISLAMIC_WARS_DATA.filter((w) => {
      const name = (isBn ? w.nameBn : (w.nameEn || w.nameBn)).toLowerCase();
      const era = (isBn ? w.eraBn : (w.eraEn || w.eraBn)).toLowerCase();
      const location = (isBn ? w.locationBn : (w.locationEn || w.locationBn)).toLowerCase();
      const cause = (isBn ? w.causeBn : (w.causeEn || w.causeBn)).toLowerCase();
      const commander = (isBn ? w.commanderMuslimsBn : (w.commanderMuslimsEn || w.commanderMuslimsBn)).toLowerCase();

      return (
        name.includes(q) ||
        w.nameAr.includes(q) ||
        era.includes(q) ||
        location.includes(q) ||
        cause.includes(q) ||
        commander.includes(q)
      );
    });
  }, [searchQuery, isBn]);

  const handleCopyWarSummary = () => {
    if (!activeWar) return;
    const name = isBn ? activeWar.nameBn : activeWar.nameEn;
    const era = isBn ? activeWar.eraBn : activeWar.eraEn;
    const date = isBn ? activeWar.dateBn : activeWar.dateEn;
    const location = isBn ? activeWar.locationBn : activeWar.locationEn;
    const commanderMuslim = isBn ? activeWar.commanderMuslimsBn : (activeWar.commanderMuslimsEn || activeWar.commanderMuslimsBn);
    const martyrs = isBn ? activeWar.muslimMartyrsBn : (activeWar.muslimMartyrsEn || activeWar.muslimMartyrsBn);
    const cause = isBn ? activeWar.causeBn : activeWar.causeEn;
    const story = isBn ? activeWar.emotionalStoryBn : activeWar.emotionalStoryEn;

    let textToCopy = `⚔️ ${name} (${activeWar.nameAr})\n📅 ${era} | ${date}\n📍 ${location}\n👤 ${isBn ? 'সেনাপতি:' : 'Commander:'} ${commanderMuslim}\n🩸 ${isBn ? 'শাহাদাত:' : 'Martyrs:'} ${martyrs}\n\n${isBn ? 'পটভূমি:' : 'Cause:'} ${cause}\n\n${story}\n\n- Zikr+ App (zikrplus.app)`;
    
    if (activeWar.shuhada && activeWar.shuhada.length > 0) {
      const shuhadaList = activeWar.shuhada.map((s) => `• ${isBn ? s.nameBn : s.nameEn} (${isBn ? s.roleBn : s.roleEn})`).join('\n');
      textToCopy += `\n\n${isBn ? 'অমর শহীদ সাহাবিগণ:' : 'Honored Martyrs:'}\n${shuhadaList}`;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopiedQuote(true);
    if (soundEnabled) soundHaptics.playTargetChime();
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  const warSwipe = useHorizontalSwipe({
    enabled: Boolean(activeWar) && !active3DMapWarId,
    canSwipeLeft: Boolean(nextWar),
    canSwipeRight: Boolean(prevWar),
    onSwipeLeft: () => {
      if (nextWar) handleSelectWar(nextWar.id);
    },
    onSwipeRight: () => {
      if (prevWar) handleSelectWar(prevWar.id);
    },
  });

  // =========================================================================
  // BATTLE DETAILED READER VIEW (BILINGUAL & ENRICHED)
  // =========================================================================
  if (activeWar) {
    const warName = isBn ? activeWar.nameBn : activeWar.nameEn;
    const warEra = isBn ? activeWar.eraBn : activeWar.eraEn;
    const warDate = isBn ? activeWar.dateBn : activeWar.dateEn;
    const warLocation = isBn ? activeWar.locationBn : activeWar.locationEn;
    const warCause = isBn ? activeWar.causeBn : activeWar.causeEn;
    const warCommanderMuslim = isBn ? activeWar.commanderMuslimsBn : (activeWar.commanderMuslimsEn || activeWar.commanderMuslimsBn);
    const warCommanderEnemy = isBn ? activeWar.commanderEnemyBn : (activeWar.commanderEnemyEn || activeWar.commanderEnemyBn);
    const warMuslimForces = isBn ? activeWar.muslimForcesBn : activeWar.muslimForcesEn;
    const warEnemyForces = isBn ? activeWar.enemyForcesBn : activeWar.enemyForcesEn;
    const warMuslimMartyrs = isBn ? activeWar.muslimMartyrsBn : (activeWar.muslimMartyrsEn || activeWar.muslimMartyrsBn);
    const warEnemyCasualties = isBn ? activeWar.enemyCasualtiesBn : activeWar.enemyCasualtiesEn;
    const warKeyPersonalities = isBn ? activeWar.keyPersonalitiesBn : activeWar.keyPersonalitiesEn;
    const warDetailedHistory = isBn ? activeWar.detailedHistoryBn : activeWar.detailedHistoryEn;
    const warEmotionalStory = isBn ? activeWar.emotionalStoryBn : activeWar.emotionalStoryEn;
    const warLessons = isBn ? activeWar.historicalLessonsBn : activeWar.historicalLessonsEn;

    return (
      <div
        {...warSwipe.touchHandlers}
        style={
          warSwipe.swipeOffset !== 0
            ? { transform: `translateX(${warSwipe.swipeOffset * 0.35}px)`, transition: 'none' }
            : { transition: 'transform 180ms ease-out' }
        }
        className="w-full space-y-4 pb-28 animate-in fade-in duration-300 relative"
      >
        <SwipeFloatingFeedback
          swipeDirection={warSwipe.swipeDirection}
          isReadyToTrigger={warSwipe.isReadyToTrigger}
          canSwipeLeft={Boolean(nextWar)}
          canSwipeRight={Boolean(prevWar)}
          prevLabel={prevWar ? (isBn ? prevWar.nameBn : prevWar.nameEn) : undefined}
          nextLabel={nextWar ? (isBn ? nextWar.nameBn : nextWar.nameEn) : undefined}
          selectedLanguage={selectedLanguage}
        />
        {/* Sticky Top Header */}
        <div
          className={`sticky top-0 z-40 text-white shadow-xl rounded-2xl px-3 sm:px-4 py-3 flex items-center justify-between gap-3 border transition-colors ${
            isDay
              ? 'bg-gradient-to-r from-amber-700 via-amber-800 to-orange-900 border-amber-600/40 shadow-amber-900/20'
              : 'bg-gradient-to-r from-[#1c1207] via-[#2c1b0a] to-[#3a250d] border-amber-500/30 shadow-black/60'
          }`}
        >
          <button
            onClick={() => handleSelectWar(null)}
            className="p-2 -ml-1 rounded-xl bg-white/10 hover:bg-white/25 active:scale-95 transition cursor-pointer flex items-center gap-1.5"
          >
            <ArrowLeft className="w-5 h-5 text-white stroke-[2.5]" />
            <span className="text-xs font-bold hidden sm:inline">{isBn ? 'সূচিপত্র ও তালিকা' : 'Back to Index'}</span>
          </button>

          <div className="flex-1 text-center truncate px-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 truncate block">
              {warEra} • #{activeWar.orderNumber}
            </span>
            <h2 className="text-sm sm:text-base font-black truncate text-white">
              {warName}
            </h2>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Mark as Completed Toggle */}
            <button
              onClick={() => toggleCompleteWar(activeWar.id)}
              className={`p-2 rounded-xl transition cursor-pointer text-xs font-bold flex items-center gap-1 active:scale-95 ${
                completedWars.includes(activeWar.id)
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : 'bg-white/10 hover:bg-white/20 text-white/90'
              }`}
              title={completedWars.includes(activeWar.id) ? (isBn ? 'পঠিত চিহ্নিত (ক্লিক করে বাতিল করুন)' : 'Marked as Read') : (isBn ? 'পঠিত চিহ্নিত করুন' : 'Mark as Read')}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span className="hidden md:inline text-[11px]">
                {completedWars.includes(activeWar.id) ? (isBn ? 'পঠিত' : 'Read') : (isBn ? 'পড়িনি' : 'Unread')}
              </span>
            </button>

            {/* Bookmark Toggle */}
            <button
              onClick={() => toggleBookmarkWar(activeWar.id)}
              className={`p-2 rounded-xl transition cursor-pointer active:scale-95 ${
                bookmarkedWars.includes(activeWar.id)
                  ? 'bg-amber-400 text-slate-900 shadow-xs'
                  : 'bg-white/10 hover:bg-white/20 text-white/90'
              }`}
              title={bookmarkedWars.includes(activeWar.id) ? (isBn ? 'বুকমার্ক সরানো' : 'Remove Bookmark') : (isBn ? 'বুকমার্ক করুন' : 'Bookmark')}
            >
              <Bookmark className={`w-4 h-4 ${bookmarkedWars.includes(activeWar.id) ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => {
                setActive3DMapWarId(activeWar.id);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="p-2 rounded-xl bg-amber-500/30 hover:bg-amber-500/50 active:scale-95 transition cursor-pointer text-xs font-bold flex items-center gap-1 border border-amber-400/40"
              title={isBn ? 'মানচিত্রে অবস্থান দেখুন' : 'View on Map'}
            >
              <Compass className="w-4 h-4 text-amber-300" />
              <span className="hidden sm:inline text-[11px]">{isBn ? 'মানচিত্র' : 'Map'}</span>
            </button>
            <button
              onClick={handleCopyWarSummary}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/25 active:scale-95 transition cursor-pointer text-xs font-bold flex items-center gap-1"
            >
              {copiedQuote ? <CheckCircle2 className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4 text-white" />}
              <span className="hidden sm:inline text-[11px]">{copiedQuote ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কপি' : 'Copy')}</span>
            </button>
            <button
              onClick={() => {
                setSelectedWarId(null);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="p-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-500/30 active:scale-95 transition cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Direct Battle Quick-Switcher & Swipe Hint Strip */}
        <QuickReaderSwitcherStrip
          themeMode={themeMode}
          selectedLanguage={selectedLanguage}
          hasPrev={Boolean(prevWar)}
          hasNext={Boolean(nextWar)}
          prevLabel={prevWar ? (isBn ? prevWar.nameBn : prevWar.nameEn) : null}
          nextLabel={nextWar ? (isBn ? nextWar.nameBn : nextWar.nameEn) : null}
          onPrev={() => prevWar && handleSelectWar(prevWar.id)}
          onNext={() => nextWar && handleSelectWar(nextWar.id)}
        />

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-slate-900/95 text-white border border-amber-500/40 text-xs font-bold shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-top duration-200">
            {toastMessage}
          </div>
        )}

        {/* Modal for 3D Battle Map */}
        {active3DMapWarId && mapWar && (
          <div className="mb-4">
            <BattleLiveMap
              war={mapWar}
              allWars={ISLAMIC_WARS_DATA}
              isDay={isDay}
              selectedLanguage={selectedLanguage}
              soundEnabled={soundEnabled}
              onSelectWar={(id) => setActive3DMapWarId(id)}
              onClose={() => setActive3DMapWarId(null)}
            />
          </div>
        )}

        {/* Main Content Box */}
        <div
          className={`w-full rounded-2xl border p-4 sm:p-6 md:p-8 space-y-6 shadow-xl transition-all ${
            isDay
              ? 'bg-gradient-to-b from-white via-amber-50/20 to-white border-slate-200 text-slate-900 shadow-sm'
              : 'bg-gradient-to-b from-[#161008] via-[#0d0905] to-[#070503] border-amber-500/20 text-white shadow-black/80'
          }`}
        >
          {/* Header & Meta */}
          <div className={`border-b pb-5 space-y-3 ${isDay ? 'border-amber-200' : 'border-amber-500/20'}`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-black flex items-center gap-1.5 border ${isDay ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-amber-500/20 text-amber-300 border-amber-500/40'}`}>
                <Shield className="w-3.5 h-3.5 text-amber-500" />
                <span>{warEra} • #{activeWar.orderNumber}</span>
              </span>

              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${isDay ? 'bg-emerald-100 text-emerald-900 border-emerald-300' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'}`}>
                📅 {warDate}
              </span>
            </div>

            <div className="space-y-1">
              <h1 className={`text-xl sm:text-2xl md:text-3xl font-black leading-tight ${isDay ? 'text-amber-950' : 'text-amber-400'}`}>
                {warName}
              </h1>
              <p className={`font-arabic text-lg sm:text-2xl text-right leading-loose font-bold ${isDay ? 'text-amber-800' : 'text-amber-300'}`}>
                {activeWar.nameAr}
              </p>
            </div>

            <div className={`p-3 rounded-xl border flex items-center gap-2 ${isDay ? 'bg-amber-50 border-amber-200 text-amber-950' : 'bg-[#1c140a] border-amber-500/30 text-amber-200'}`}>
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="text-xs font-bold">{isBn ? 'যুদ্ধের স্থান ও ভৌগোলিক প্রান্তর:' : 'Battle Location & Terrain:'} {warLocation}</span>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1.5 ${isDay ? 'bg-amber-50/70 border-amber-200 text-amber-950' : 'bg-[#1a1309] border-amber-500/30 text-amber-100'}`}>
              <strong className="text-xs font-bold text-amber-600 dark:text-amber-400 block">
                {isBn ? 'যুদ্ধের কারণ ও পটভূমি:' : 'Cause & Strategic Background:'}
              </strong>
              <p className="text-xs sm:text-sm leading-relaxed opacity-95">{warCause}</p>
            </div>
          </div>

          {/* Forces & Commanders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-2xl border space-y-2.5 ${isDay ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' : 'bg-[#061d18] border-emerald-500/30 text-emerald-100'}`}>
              <h4 className="font-extrabold text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{isBn ? 'মুসলিম সৈন্য ও সেনাপতি' : 'Muslim Forces & Commanders'}</span>
              </h4>
              <div className="text-xs space-y-1.5 opacity-90">
                <p><strong>{isBn ? 'সেনাপতি:' : 'Commander:'}</strong> {warCommanderMuslim}</p>
                <p><strong>{isBn ? 'সৈন্য সংখ্যা:' : 'Troop Strength:'}</strong> {warMuslimForces}</p>
                <p><strong>{isBn ? 'শাহাদাত:' : 'Martyrs:'}</strong> <span className="font-bold text-emerald-600 dark:text-emerald-300">{warMuslimMartyrs}</span></p>
                {warKeyPersonalities && warKeyPersonalities.length > 0 && (
                  <p><strong>{isBn ? 'প্রধান ব্যক্তিত্বগণ:' : 'Key Figures:'}</strong> {warKeyPersonalities.join(', ')}</p>
                )}
              </div>
            </div>

            <div className={`p-4 rounded-2xl border space-y-2.5 ${isDay ? 'bg-rose-50/70 border-rose-200 text-rose-950' : 'bg-[#1f0d0d] border-rose-500/30 text-rose-100'}`}>
              <h4 className="font-extrabold text-xs text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                <Sword className="w-4 h-4" />
                <span>{isBn ? 'বিরোধী শত্রু বাহিনী' : 'Enemy Forces & Commanders'}</span>
              </h4>
              <div className="text-xs space-y-1.5 opacity-90">
                <p><strong>{isBn ? 'সেনাপতি:' : 'Commander:'}</strong> {warCommanderEnemy}</p>
                <p><strong>{isBn ? 'সৈন্য সংখ্যা:' : 'Troop Strength:'}</strong> {warEnemyForces}</p>
                <p><strong>{isBn ? 'হতাহত ও ক্ষতি:' : 'Casualties:'}</strong> {warEnemyCasualties}</p>
              </div>
            </div>
          </div>

          {/* Detailed History Narrative */}
          {warDetailedHistory && (
            <div className={`p-5 rounded-2xl border space-y-3 ${isDay ? 'bg-amber-50/40 border-amber-200 text-amber-950' : 'bg-[#1a1309] border-amber-500/30 text-amber-100'}`}>
              <h3 className="font-extrabold text-xs sm:text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>{isBn ? 'পূর্ণাঙ্গ বিস্তারিত ইতিহাস ও ঘটনাক্রম' : 'Comprehensive Historical Narrative'}</span>
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed opacity-95 whitespace-pre-line">{warDetailedHistory}</p>
            </div>
          )}

          {/* Crucial Key Events & Turning Points */}
          {activeWar.keyEvents && activeWar.keyEvents.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-extrabold text-xs sm:text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{isBn ? 'গুরুত্বপূর্ণ ঐতিহাসিক ঘটনাবলি ও মোড় পরিবর্তনকারী মুহূর্ত' : 'Crucial Milestones & Turning Points'}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activeWar.keyEvents.map((ev, eIdx) => (
                  <div
                    key={eIdx}
                    className={`p-4 rounded-2xl border space-y-1.5 ${
                      isDay ? 'bg-white border-amber-200 shadow-xs' : 'bg-[#181108] border-amber-500/25 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-black text-xs text-amber-600 dark:text-amber-400">
                      <span>{ev.icon || '📌'}</span>
                      <span>{isBn ? ev.titleBn : ev.titleEn}</span>
                    </div>
                    <p className="text-xs leading-relaxed opacity-90">{isBn ? ev.descriptionBn : ev.descriptionEn}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DEDICATED SHUHADA SPOTLIGHT SECTION */}
          <div className={`p-5 rounded-2xl border space-y-3 shadow-md ${
            isDay ? 'bg-rose-50/50 border-rose-200 text-rose-950' : 'bg-[#1c0d12] border-rose-500/30 text-rose-100'
          }`}>
            <div className="flex items-center justify-between border-b pb-2.5 border-rose-200/60 dark:border-rose-900/40">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center font-black text-xs">
                  🩸
                </span>
                <div>
                  <h3 className="font-extrabold text-xs sm:text-sm text-rose-700 dark:text-rose-300">
                    {isBn ? 'অমর শহীদ সাহাবি ও বীর সেনানীদের পুণ্যস্মৃতি' : 'Honored Martyrs & Sacred Sacrifices (Shuhada)'}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-rose-200/70">
                    {isBn ? 'এই যুদ্ধে দ্বীনের সুরক্ষায় জীবন বিসর্জন দেওয়া মহিমান্বিত সাহাবিগণের গৌরবগাথা' : 'Profiles of the blessed companions who achieved supreme martyrdom in this battle'}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-600 dark:text-rose-300 border border-rose-500/30">
                {activeWar.shuhada && activeWar.shuhada.length > 0
                  ? `${activeWar.shuhada.length} ${isBn ? 'জন বিশিষ্ট' : 'heroes'}`
                  : (isBn ? 'রক্তপাতহীন' : 'Bloodless')}
              </span>
            </div>

            {activeWar.shuhada && activeWar.shuhada.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {activeWar.shuhada.map((sh, sIdx) => (
                  <div
                    key={sIdx}
                    className={`p-3.5 rounded-xl border space-y-1.5 transition ${
                      isDay
                        ? 'bg-white/90 border-rose-200 shadow-xs hover:border-rose-300'
                        : 'bg-[#251016]/90 border-rose-500/30 shadow-xs hover:border-rose-400/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-1.5">
                      <strong className="text-xs font-black text-rose-700 dark:text-rose-300">
                        {isBn ? sh.nameBn : sh.nameEn}
                      </strong>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-600 dark:text-rose-300 font-bold truncate">
                        {isBn ? sh.roleBn : sh.roleEn}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed opacity-90">{isBn ? sh.detailsBn : sh.detailsEn}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs leading-relaxed opacity-90 py-1">
                {isBn
                  ? 'এই পবিত্র অভিযানটি রক্তপাতহীন কৌশলগত ও রাজনৈতিক বিজয়ে সমাপ্ত হয়। মুমিনদের মধ্য থেকে কোনো যুদ্ধকালীন শাহাদাত ঘটেনি।'
                  : 'This campaign concluded in a bloodless strategic triumph without Muslim combat casualties.'}
              </p>
            )}
          </div>

          {/* Emotional Story & Miracles */}
          <div className={`p-5 rounded-2xl border space-y-3 ${isDay ? 'bg-amber-50/50 border-amber-200 text-amber-950' : 'bg-[#181108] border-amber-500/30 text-amber-100'}`}>
            <h3 className="font-extrabold text-xs sm:text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>{isBn ? 'যুদ্ধের হৃদয়স্পর্শী ইতিহাস ও আত্মত্যাগ' : 'Historical Narrative & Sacred Moments'}</span>
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed opacity-95">{warEmotionalStory}</p>
          </div>

          {/* Quranic Evidences */}
          {activeWar.quranRefs && activeWar.quranRefs.length > 0 && (
            <div className={`p-5 rounded-2xl border space-y-3 ${isDay ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-[#081f19] border-emerald-500/30 text-emerald-100'}`}>
              <h4 className="font-bold text-xs sm:text-sm text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-500" />
                <span>{isBn ? 'পবিত্র কুরআনের সরাসরি দলিল ও আয়াত' : 'Direct Quranic Verses & Evidence'}</span>
              </h4>
              <div className="space-y-3">
                {activeWar.quranRefs.map((qr, qIdx) => (
                  <div key={qIdx} className={`p-3.5 rounded-xl border space-y-2 ${isDay ? 'bg-white/90 border-emerald-200' : 'bg-[#061813] border-emerald-500/30'}`}>
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                      <span>{isBn ? qr.surahNameBn : qr.surahNameEn} : {qr.verseNo}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyQuranRef(qr)}
                          className="px-2 py-0.5 rounded bg-emerald-500/15 hover:bg-emerald-500/30 text-[10px] text-emerald-700 dark:text-emerald-300 font-bold transition flex items-center gap-1 cursor-pointer active:scale-95"
                          title={isBn ? 'আয়াত কপি করুন' : 'Copy Verse'}
                        >
                          <Copy className="w-3 h-3" />
                          <span>{isBn ? 'কপি' : 'Copy'}</span>
                        </button>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-300">القرآن الكريم</span>
                      </div>
                    </div>
                    <p className="font-arabic text-right text-base sm:text-lg leading-loose font-bold text-emerald-800 dark:text-emerald-300">
                      {qr.arabic}
                    </p>
                    <p className="text-xs leading-relaxed opacity-95">
                      {isBn ? qr.translationBn : qr.translationEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Authentic Hadith Evidences */}
          {activeWar.hadithRefs && activeWar.hadithRefs.length > 0 && (
            <div className={`p-5 rounded-2xl border space-y-3 ${isDay ? 'bg-teal-50/60 border-teal-200 text-teal-950' : 'bg-[#071d22] border-teal-500/30 text-teal-100'}`}>
              <h4 className="font-bold text-xs sm:text-sm text-teal-700 dark:text-teal-300 flex items-center gap-1.5">
                <ScrollText className="w-4 h-4 text-teal-500" />
                <span>{isBn ? 'সহিহ হাদিসের প্রামাণিক দলিল' : 'Authentic Hadith Citations'}</span>
              </h4>
              <div className="space-y-2.5">
                {activeWar.hadithRefs.map((hr, hIdx) => (
                  <div key={hIdx} className={`p-3.5 rounded-xl border space-y-1.5 ${isDay ? 'bg-white/90 border-teal-200' : 'bg-[#05161a] border-teal-500/30'}`}>
                    <div className="flex items-center justify-between text-xs font-black text-teal-600 dark:text-teal-400">
                      <span>{isBn ? hr.sourceBn : hr.sourceEn}</span>
                      <button
                        onClick={() => handleCopyHadithRef(hr)}
                        className="px-2 py-0.5 rounded bg-teal-500/15 hover:bg-teal-500/30 text-[10px] text-teal-700 dark:text-teal-300 font-bold transition flex items-center gap-1 cursor-pointer active:scale-95"
                        title={isBn ? 'হাদিস কপি করুন' : 'Copy Hadith'}
                      >
                        <Copy className="w-3 h-3" />
                        <span>{isBn ? 'কপি' : 'Copy'}</span>
                      </button>
                    </div>
                    {hr.arabic && (
                      <p className="font-arabic text-right text-sm leading-loose font-bold text-teal-800 dark:text-teal-300">
                        {hr.arabic}
                      </p>
                    )}
                    <p className="text-xs leading-relaxed opacity-95">
                      {isBn ? hr.textBn : hr.textEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Historical Lessons */}
          {warLessons && warLessons.length > 0 && (
            <div className={`p-4 rounded-2xl border space-y-2 ${isDay ? 'bg-amber-50/70 border-amber-200 text-amber-950' : 'bg-[#181208] border-amber-500/30 text-amber-100'}`}>
              <h4 className="font-bold text-xs text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <span>💡</span>
                <span>{isBn ? 'ঐতিহাসিক শিক্ষা ও কৌশলগত গুরুত্ব' : 'Historical & Strategic Lessons'}</span>
              </h4>
              <ul className="text-xs space-y-1.5 opacity-90">
                {warLessons.map((lesson, lIdx) => (
                  <li key={lIdx} className="flex items-start gap-1.5">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* References */}
          {activeWar.references && (
            <div className="pt-2 text-[11px] text-slate-400">
              <strong>{isBn ? 'ঐতিহাসিক তথ্যসূত্র:' : 'Historical References:'}</strong> {activeWar.references.join(' • ')}
            </div>
          )}

          {/* Bottom Navigation for previous/next war & mark as read */}
          <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <button
              disabled={!prevWar}
              onClick={() => prevWar && handleSelectWar(prevWar.id)}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                prevWar
                  ? (isDay ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100' : 'bg-[#1e1308] border-amber-700 text-amber-200 hover:bg-[#2c1b0a]')
                  : 'opacity-40 cursor-not-allowed border-transparent'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <div className="text-left hidden sm:block">
                <div className="text-[10px] text-slate-400 font-normal">{isBn ? 'পূর্ববর্তী যুদ্ধ' : 'Previous'}</div>
                <div className="truncate max-w-[120px]">{prevWar ? (isBn ? prevWar.nameBn : prevWar.nameEn) : ''}</div>
              </div>
            </button>

            <button
              onClick={() => handleSelectWar(null)}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition active:scale-95 cursor-pointer"
            >
              {isBn ? 'সূচিপত্র' : 'Table of Contents'}
            </button>

            <button
              disabled={!nextWar}
              onClick={() => nextWar && handleSelectWar(nextWar.id)}
              className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-2 transition cursor-pointer ${
                nextWar
                  ? (isDay ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100' : 'bg-[#1e1308] border-amber-700 text-amber-200 hover:bg-[#2c1b0a]')
                  : 'opacity-40 cursor-not-allowed border-transparent'
              }`}
            >
              <div className="text-right hidden sm:block">
                <div className="text-[10px] text-slate-400 font-normal">{isBn ? 'পরবর্তী যুদ্ধ' : 'Next'}</div>
                <div className="truncate max-w-[120px]">{nextWar ? (isBn ? nextWar.nameBn : nextWar.nameEn) : ''}</div>
              </div>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN WARS LIST VIEW WITH BOOK-STYLE TOC INDEX
  // =========================================================================
  return (
    <div className="space-y-5 pb-24 animate-in fade-in duration-200">
      {/* Top Action Pills Bar Matching Seerat & Hayatus Sahaba Screenshot */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        <div className="flex flex-wrap items-center gap-2">
          {lastReadWar && (
            <button
              onClick={() => handleSelectWar(lastReadWar.id)}
              className="px-3.5 py-2 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isBn ? `সর্বশেষ পঠিত (${lastReadWar.nameBn})` : `Resume (${lastReadWar.nameEn})`}</span>
            </button>
          )}

          <button
            onClick={() => setShowWarBibliographyModal(true)}
            className="px-3.5 py-2 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-950 dark:text-amber-200 border border-amber-300 dark:border-amber-700/60 font-bold text-xs flex items-center gap-1.5 shadow-xs hover:bg-amber-200 dark:hover:bg-amber-900/60 active:scale-95 transition cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{isBn ? 'যুদ্ধ ইতিহাস গ্রন্থমালা' : 'War Chronicles'}</span>
          </button>
        </div>

        {onBackToHub && (
          <button
            onClick={onBackToHub}
            className="p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition shadow-xs cursor-pointer"
            title={isBn ? 'ফিরে যান' : 'Back'}
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Reading Progress Indicator Matching Seerat & Hayatus Sahaba */}
      <div className="space-y-1.5 px-1">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
          <span>{isBn ? 'পঠন অগ্রগতি' : 'Reading Progress'}</span>
          <span className="font-mono text-[11px]">{formatNum(completedCount)}/{formatNum(totalWars)} ({formatNum(progressPercentage)}%)</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Top Banner */}
      <div
        className={`p-5 sm:p-6 rounded-3xl border shadow-xl ${
          isDay
            ? 'bg-gradient-to-r from-amber-700 via-amber-800 to-orange-900 text-white border-amber-600/40'
            : 'bg-gradient-to-r from-[#1c1207] via-[#2c1b0a] to-[#3a250d] text-white border-amber-500/30'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-amber-100 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isBn ? 'ইসলামের ইতিহাসের যুদ্ধ' : 'Islamic History Wars'}</span>
          </div>

          <span className="px-3 py-1 rounded-full bg-amber-500/25 text-amber-100 text-xs font-bold border border-amber-300/30">
            {isBn ? `${formatNum(totalWars)}টি ঐতিহাসিক যুদ্ধ` : `${totalWars} Historical Battles`}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black tracking-tight">
          {isBn ? `ইসলামের ইতিহাসের যুদ্ধসমূহ (${formatNum(totalWars)}টি ঐতিহাসিক যুদ্ধ)` : `Battles in Islamic History (${totalWars} Epic Battles)`}
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/90 mt-1 max-w-xl">
          {isBn
            ? 'নববি যুগ থেকে খিলাফতে রাশিদা, উমাইয়া, আব্বাসি, আন্দালুস ও আধুনিক প্রতিরোধের ঐতিহাসিক যুদ্ধসমূহের পূর্ণাঙ্গ কালানুক্রমিক সূচি ও বিবরণ।'
            : 'Chronological master guide to the foundational and heroic battles shaping Islamic history.'}
        </p>
      </div>

      {/* Search Bar (Matching Hayatus Sahaba) */}
      <div className={`p-4 rounded-3xl border shadow-md ${isDay ? 'bg-white border-slate-200' : 'bg-[#181108] border-amber-500/30'}`}>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? 'যুদ্ধের নাম, যুগ, সেনাপতি, স্থান দিয়ে খুঁজুন...' : 'Search battles by name, era, commander, location...'}
            className={`w-full pl-10 pr-9 py-2.5 rounded-2xl border text-xs sm:text-sm font-semibold transition focus:outline-none ${
              isDay ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-500' : 'bg-[#0d0905] border-amber-900/60 text-white focus:border-amber-500'
            }`}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Search Results View (Only shown when actively searching) */}
      {searchQuery.trim() !== '' && (
        <div className={`p-5 rounded-3xl border shadow-xl space-y-4 ${
          isDay ? 'bg-white border-slate-200 text-slate-900' : 'bg-[#181108] border-amber-500/30 text-white'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-amber-900/40">
            <div>
              <h3 className="text-sm sm:text-base font-black text-amber-700 dark:text-amber-400">
                {isBn ? `অনুসন্ধানের ফলাফল (${formatNum(filteredWars.length)}টি)` : `Search Results (${filteredWars.length})`}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isBn ? `"${searchQuery}" এর জন্য ফলাফল দেখানো হচ্ছে` : `Showing results for "${searchQuery}"`}
              </p>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 text-slate-800 dark:text-slate-200 transition cursor-pointer"
            >
              {isBn ? 'অনুসন্ধান মুছুন' : 'Clear Search'}
            </button>
          </div>

          {filteredWars.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <span className="text-3xl">🔍</span>
              <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
                {isBn ? 'কোনো যুদ্ধ পাওয়া যায়নি' : 'No battles found'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredWars.map((war) => {
                const warName = isBn ? war.nameBn : war.nameEn;
                const warEra = isBn ? war.eraBn : war.eraEn;
                const warDate = isBn ? war.dateBn : war.dateEn;
                const warLocation = isBn ? war.locationBn : war.locationEn;
                return (
                  <div
                    key={war.id}
                    onClick={() => handleSelectWar(war.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2.5 shadow-xs hover:shadow-md ${
                      isDay
                        ? 'bg-white hover:bg-amber-50/50 border-slate-200 hover:border-amber-300 text-slate-900'
                        : 'bg-[#140f07] hover:bg-[#1f160a] border-amber-900/50 hover:border-amber-500/50 text-white'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono font-bold text-amber-500">#{formatNum(war.orderNumber)}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 truncate">{warEra}</span>
                      </div>
                      <h4 className="font-black text-sm text-amber-800 dark:text-amber-300">{warName}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">📍 {warLocation} ({warDate})</p>
                    </div>
                    <div className="pt-2 border-t border-slate-200/50 dark:border-amber-900/40 flex items-center justify-between text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                      <span>{isBn ? 'বিস্তারিত পড়ুন' : 'Read'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Book-Style Table of Contents (TOC) Container — Matching Hayatus Sahaba */}
      {searchQuery.trim() === '' && (
        <div
          className={`rounded-3xl border-2 p-4 sm:p-6 shadow-md space-y-4 animate-in fade-in duration-200 ${
            isDay
              ? 'border-amber-300 bg-[#fffdfa] text-slate-900'
              : 'border-amber-500/40 bg-[#161007] text-white'
          }`}
        >
          {/* TOC Header */}
          <div className="flex items-center justify-between pb-2 border-b border-amber-200/50 dark:border-amber-900/40">
            <div className="flex items-start gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-sm shrink-0">
                📖
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-black text-amber-700 dark:text-amber-400 leading-tight">
                  {isBn ? 'সূচিপত্র' : 'Table of Contents'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {isBn ? 'যেকোনো যুদ্ধে স্পর্শ করে সম্পূর্ণ অধ্যায় পড়ুন' : 'Tap any battle to read the full chapter & strategic account'}
                </p>
              </div>
            </div>
          </div>

          {/* 6 Era Boxes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ERA_SECTIONS.map((era) => {
              const list = warsByEra[era.key] || [];
              if (list.length === 0) return null;

              return (
                <div
                  key={era.key}
                  className={`rounded-2xl border p-3.5 shadow-xs space-y-2.5 transition-all duration-200 ${
                    isDay
                      ? 'border-amber-200/90 bg-white hover:border-amber-400 hover:shadow-md'
                      : 'border-amber-900/60 bg-[#1f160a] hover:border-amber-600/80 hover:shadow-black/60'
                  }`}
                >
                  {/* Era Header */}
                  <div className="flex items-center justify-between pb-2 border-b border-amber-100 dark:border-amber-900/40">
                    <h4 className="text-xs sm:text-sm font-extrabold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 truncate">
                      <span className="text-base shrink-0">{era.icon}</span>
                      <span className="truncate">{isBn ? era.titleBn : era.titleEn}</span>
                    </h4>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300/50 shrink-0">
                      {formatNum(list.length)}{isBn ? ' টি' : ''}
                    </span>
                  </div>

                  {/* List of Battles */}
                  <div className="space-y-1 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
                    {list.map((war, idx) => {
                      const warName = isBn ? war.nameBn : war.nameEn;
                      return (
                        <div
                          key={war.id}
                          onClick={() => handleSelectWar(war.id)}
                          className={`flex items-center justify-between py-1.5 px-2 rounded-lg transition-colors cursor-pointer group ${
                            isDay
                              ? 'hover:bg-amber-50/90 text-slate-800'
                              : 'hover:bg-amber-950/50 text-slate-200'
                          }`}
                        >
                          <div className="flex items-start gap-1.5 truncate pr-2">
                            <span className="text-amber-600 dark:text-amber-400 font-bold text-xs shrink-0">
                              {formatNum(idx + 1)}.
                            </span>
                            <span className="text-xs font-bold group-hover:text-amber-700 dark:group-hover:text-amber-300 transition truncate">
                              {warName}
                            </span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bibliography Modal for Islamic History Wars */}
      {showWarBibliographyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className={`w-full max-w-xl rounded-3xl border p-5 sm:p-7 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto ${
              isDay ? 'bg-white border-amber-200 text-slate-900' : 'bg-[#181108] border-amber-500/30 text-white'
            }`}
          >
            <button
              onClick={() => {
                setShowWarBibliographyModal(false);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-1 border-b pb-3 border-amber-500/20 pr-8">
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300">
                {isBn ? 'প্রামাণ্য গ্রন্থ ও উৎসপঞ্জি' : 'Classical War Chronicles'}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-amber-700 dark:text-amber-400">
                {isBn ? 'ইসলামের ইতিহাসের যুদ্ধসমূহ: প্রামাণ্য গ্রন্থমালা' : 'Chronicles of Islamic Battles: Bibliography'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isBn
                  ? 'এই সংকলনে উল্লেখিত প্রতিটি যুদ্ধের তারিখ, পটভূমি, সেনাদল ও শহীদ সাহাবিগণের বিবরণ নিম্নোক্ত প্রামাণ্য শাস্ত্রীয় গ্রন্থাবলি থেকে সংকলিত:'
                  : 'Historical dates, causal backgrounds, troop numbers, and martyr accounts referenced from primary chronicles:'}
              </p>
            </div>

            <div className="space-y-3 text-xs sm:text-sm leading-relaxed">
              <div className={`p-4 rounded-2xl border space-y-2 ${isDay ? 'bg-amber-50/60 border-amber-200' : 'bg-[#1f160a] border-amber-500/30'}`}>
                <h4 className="font-extrabold text-amber-600 dark:text-amber-300 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  <span>{isBn ? '১. ইতিহাস ও সীরাতের মূল ক্লাসিক্যাল গ্রন্থাবলি' : '1. Classical Military & History Compilations'}</span>
                </h4>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>
                      {isBn ? (
                        <><strong>تاريخ الرسل والملوك (তারীখে তাবারী):</strong> ইমাম আবু জাফর আত-তাবারী (২২৪–৩১০ হি:) — প্রাচীনতম ও প্রামাণ্য ইতিহাস বিশ্বকোষ।</>
                      ) : (
                        <><strong>Tarikh al-Rusul wa al-Muluk (Tarikh al-Tabari):</strong> Imam Abu Ja'far al-Tabari (224–310 AH) — Earliest authoritative Islamic universal history.</>
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>
                      {isBn ? (
                        <><strong>البداية والنهاية (আল-বিদায়া ওয়ান নিহায়া):</strong> হাফেজ ইবনে কাসীর (৭০১–৭৭৪ হি:) — বদর, উহুদ, খন্দক ও খিলাফতের বিজয়াভিযানের ধারাবাহিক ইতিহাস।</>
                      ) : (
                        <><strong>Al-Bidaya wa al-Nihaya:</strong> Hafiz Ibn Kathir (701–774 AH) — Chronological history of Badr, Uhud, Khandaq, and the Caliphate campaigns.</>
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>
                      {isBn ? (
                        <><strong>كتاب المغازي (কিতাবুল মাগাযী):</strong> ইমাম মুহাম্মদ ইবনে উমর আল-ওয়াকিদী (১৩০–২০৭ হি:) — রাসূলুল্লাহ (সা.)-এর পবিত্র সামরিক অভিযানের পুঙ্খানুপুঙ্খ দলিল।</>
                      ) : (
                        <><strong>Kitab al-Maghazi:</strong> Imam Muhammad ibn Umar al-Waqidi (130–207 AH) — Detailed documentation of the Prophet's (peace be upon him) military expeditions.</>
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>
                      {isBn ? (
                        <><strong>سيرة ابن هشام (সীরাতে ইবনে হিশাম):</strong> আবু মুহাম্মদ আবদুল মালিক ইবনে হিশাম (মৃত্যু ২১৩ হি:) — আদি সীরাতের নির্ভরযোগ্য রূপ।</>
                      ) : (
                        <><strong>Sirat Ibn Hisham:</strong> Abu Muhammad Abd al-Malik ibn Hisham (d. 213 AH) — Foundational authoritative biography of the Prophet (peace be upon him).</>
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>
                      {isBn ? (
                        <><strong>الكامل في التاريخ (আল-কামিল ফিত তারীখ):</strong> আল্লামা ইবনুল আসীর (৫৫৫–৬৩০ হি:) — ইসলামের সার্বিক ইতিহাস ও আন্দালুস/ক্রুসেড প্রতিরোধ।</>
                      ) : (
                        <><strong>Al-Kamil fi al-Tarikh:</strong> Allama Ibn al-Athir (555–630 AH) — Comprehensive Islamic history including Andalusia and the Crusades resistance.</>
                      )}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-500 font-bold">•</span>
                    <span>
                      {isBn ? (
                        <><strong>زاد المعاد (যাদুল মা‘আদ):</strong> ইমাম ইবনুল কাইয়্যিম (৬৯১–৭৫১ হি:) — নববি যুদ্ধনীতি, ফিকহ ও সামরিক চুক্তিবিধান।</>
                      ) : (
                        <><strong>Zad al-Ma'ad:</strong> Imam Ibn al-Qayyim (691–751 AH) — Prophetic military ethics, jurisprudence, and treaty principles.</>
                      )}
                    </span>
                  </li>
                </ul>
              </div>

              <div className={`p-4 rounded-2xl border space-y-2 ${isDay ? 'bg-emerald-50/60 border-emerald-200' : 'bg-[#081f19] border-emerald-500/30'}`}>
                <h4 className="font-extrabold text-emerald-600 dark:text-emerald-300 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>{isBn ? '২. সহিহ হাদিস ও তাফসির শাস্ত্র' : '2. Hadith & Tafsir Foundations'}</span>
                </h4>
                <p className="text-xs">
                  {isBn
                    ? 'সহিহ বুখারি (কিতাবুল মাগাযী ও কিতাবুল জিহাদ), সহিহ মুসলিম, জামে আত-তিরমিজি ও তাফসিরে ইবনে কাসীর থেকে যুদ্ধের প্রত্যক্ষ বর্ণনা ও কুরআনের আয়াতের শানে নুযুল গ্রহণ করা হয়েছে।'
                    : 'Authentic narrations derived from Sahih al-Bukhari (Kitab al-Maghazi & Kitab al-Jihad), Sahih Muslim, Jami at-Tirmidhi, and Tafsir Ibn Kathir.'}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-amber-500/20 text-center">
              <button
                onClick={() => {
                  setShowWarBibliographyModal(false);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-black text-xs shadow-lg transition cursor-pointer"
              >
                {isBn ? 'বুঝেছি, পঠন শুরু করুন' : 'Got it, Start Reading'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
