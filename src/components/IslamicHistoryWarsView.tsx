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
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { BattleLiveMap } from './BattleLiveMap';
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

export const IslamicHistoryWarsView: React.FC<IslamicHistoryWarsViewProps> = ({
  themeMode = 'night',
  selectedLanguage = 'bn',
  soundEnabled = true,
  onBackToHub,
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';

  const [selectedWarId, setSelectedWarId] = useState<string | null>(null);
  const [activeEraFilter, setActiveEraFilter] = useState<WarItem['eraKey'] | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [active3DMapWarId, setActive3DMapWarId] = useState<string | null>(null);
  const [showTocIndex, setShowTocIndex] = useState(true);
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
    return ISLAMIC_WARS_DATA.filter((w) => {
      const matchesEra = activeEraFilter === 'all' || w.eraKey === activeEraFilter;
      const q = searchQuery.trim().toLowerCase();
      const name = (isBn ? w.nameBn : (w.nameEn || w.nameBn)).toLowerCase();
      const era = (isBn ? w.eraBn : (w.eraEn || w.eraBn)).toLowerCase();
      const location = (isBn ? w.locationBn : (w.locationEn || w.locationBn)).toLowerCase();
      const cause = (isBn ? w.causeBn : (w.causeEn || w.causeBn)).toLowerCase();
      const commander = (isBn ? w.commanderMuslimsBn : (w.commanderMuslimsEn || w.commanderMuslimsBn)).toLowerCase();

      const matchesSearch =
        !q ||
        name.includes(q) ||
        w.nameAr.includes(q) ||
        era.includes(q) ||
        location.includes(q) ||
        cause.includes(q) ||
        commander.includes(q);

      return matchesEra && matchesSearch;
    });
  }, [activeEraFilter, searchQuery, isBn]);

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
      <div className="w-full space-y-4 pb-28 animate-in fade-in duration-300">
        {/* Sticky Top Header */}
        <div
          className={`sticky top-0 z-40 text-white shadow-xl rounded-2xl px-3 sm:px-4 py-3 flex items-center justify-between gap-3 border transition-colors ${
            isDay
              ? 'bg-gradient-to-r from-amber-700 via-amber-800 to-orange-900 border-amber-600/40 shadow-amber-900/20'
              : 'bg-gradient-to-r from-[#1c1207] via-[#2c1b0a] to-[#3a250d] border-amber-500/30 shadow-black/60'
          }`}
        >
          <button
            onClick={() => {
              setSelectedWarId(null);
              if (soundEnabled) soundHaptics.playTap();
            }}
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

        {/* Modal for 3D Battle Map */}
        {active3DMapWarId && mapWar && (
          <div className="mb-4">
            <BattleLiveMap
              war={mapWar}
              allWars={ISLAMIC_WARS_DATA}
              isDay={isDay}
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
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-600 dark:text-emerald-300">القرآن الكريم</span>
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
                    <div className="text-xs font-black text-teal-600 dark:text-teal-400">
                      {isBn ? hr.sourceBn : hr.sourceEn}
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
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN WARS LIST VIEW WITH BOOK-STYLE TOC INDEX
  // =========================================================================
  return (
    <div className="space-y-5 pb-24 animate-in fade-in duration-200">
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
            <span>حروب التاريخ الإسلامي • Islamic History Wars</span>
          </div>

          <button
            onClick={() => {
              setShowTocIndex(!showTocIndex);
              if (soundEnabled) soundHaptics.playTap();
            }}
            className="px-3.5 py-1.5 rounded-xl bg-amber-500/30 hover:bg-amber-500/40 text-amber-200 border border-amber-400/40 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition shadow-sm active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-300" />
            <span>{showTocIndex ? (isBn ? 'সূচিপত্র লুকান' : 'Hide TOC') : (isBn ? 'বইয়ের মূল সূচিপত্র' : 'Table of Contents')}</span>
          </button>
        </div>

        <h2 className="text-xl sm:text-2xl font-black tracking-tight">
          {isBn ? 'ইসলামের ইতিহাসের যুদ্ধসমূহ (৩১টি ঐতিহাসিক যুদ্ধ)' : 'Battles in Islamic History (31 Epic Battles)'}
        </h2>
        <p className="text-xs sm:text-sm text-amber-100/90 mt-1 max-w-xl">
          {isBn
            ? 'নববি যুগ থেকে খিলাফতে রাশিদা, উমাইয়া, আব্বাসি, আন্দালুস ও আধুনিক প্রতিরোধের ঐতিহাসিক যুদ্ধসমূহের পূর্ণাঙ্গ কালানুক্রমিক সূচি ও বিবরণ।'
            : 'Chronological master guide to the foundational and heroic battles shaping Islamic history.'}
        </p>
      </div>

      {/* Book-Style Table of Contents (TOC) Container Matching Hayatus Sahaba Screenshot */}
      {showTocIndex && (
        <div
          className={`rounded-3xl border-2 p-4 sm:p-6 shadow-md space-y-4 animate-in fade-in duration-200 ${
            isDay
              ? 'border-amber-300 bg-[#fffdfa] text-slate-900'
              : 'border-amber-500/40 bg-[#161007] text-white'
          }`}
        >
          {/* TOC Header */}
          <div className="flex items-center justify-between pb-1 border-b border-amber-200/50 dark:border-amber-900/40">
            <div className="flex items-start gap-2.5">
              <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
                📖
              </span>
              <div>
                <h3 className="text-base sm:text-lg font-black text-amber-700 dark:text-amber-400 leading-tight">
                  {isBn ? 'বইয়ের মূল সূচিপত্র (Table of Contents)' : 'Master Table of Contents (Chronological)'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {isBn ? 'যেকোনো যুদ্ধে স্পর্শ করে সম্পূর্ণ অধ্যায় পড়ুন' : 'Tap any battle to read the full chapter & strategic account'}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setShowTocIndex(false);
                if (soundEnabled) soundHaptics.playTap();
              }}
              className="p-1.5 rounded-xl hover:bg-amber-500/20 text-slate-400 hover:text-slate-600 dark:hover:text-amber-300 transition cursor-pointer"
              title={isBn ? 'সূচিপত্র বন্ধ করুন' : 'Close TOC'}
            >
              <X className="w-4 h-4" />
            </button>
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
                      {list.length} {isBn ? 'টি' : ''}
                    </span>
                  </div>

                  {/* List of Battles */}
                  <div className="space-y-1">
                    {list.map((war, idx) => {
                      const warName = isBn ? war.nameBn : war.nameEn;
                      return (
                        <div
                          key={war.id}
                          onClick={() => {
                            setSelectedWarId(war.id);
                            if (soundEnabled) soundHaptics.playTap();
                          }}
                          className={`flex items-center justify-between py-1.5 px-2 rounded-lg transition-colors cursor-pointer group ${
                            isDay
                              ? 'hover:bg-amber-50/90 text-slate-800'
                              : 'hover:bg-amber-950/50 text-slate-200'
                          }`}
                        >
                          <div className="flex items-start gap-1.5 truncate pr-2">
                            <span className="text-amber-600 dark:text-amber-400 font-bold text-xs shrink-0">
                              {idx + 1}.
                            </span>
                            <span className="text-xs font-bold group-hover:text-amber-700 dark:group-hover:text-amber-300 transition truncate">
                              {warName}
                            </span>
                          </div>
                          <BookOpen className="w-3.5 h-3.5 text-sky-400 dark:text-sky-300 shrink-0 opacity-70 group-hover:opacity-100 group-hover:scale-115 transition" />
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

      {/* Category Summary Badges & Quick Era Filter */}
      <div
        className={`p-4 sm:p-5 rounded-3xl border shadow-md space-y-3 ${
          isDay ? 'bg-amber-50/60 border-amber-200/80 text-amber-950' : 'bg-[#18130a] border-amber-500/30 text-amber-100'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-black text-xs">
              ⚔️
            </span>
            <h3 className="text-xs sm:text-sm font-extrabold">
              {isBn ? 'মর্যাদা ও কালানুসারে ইতিহাসের মহাকাব্যিক যুদ্ধসমূহ' : 'Historical Islamic Battles by Chronology'}
            </h3>
          </div>
          <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
            {isBn ? 'মোট ৩১টি ঐতিহাসিক যুদ্ধ ও অভিযান' : 'Total 31 Epic Battles'}
          </span>
        </div>
        <p className="text-xs leading-relaxed opacity-90">
          {isBn
            ? 'যেকোনো যুদ্ধের সূচিপত্রের নাম বা নিচের কার্ডে চাপ দিলে কোনো পপআপ ছাড়াই সরাসরি সম্পূর্ণ পৃষ্ঠা জুড়ে সৈন্য সংখ্যা, কারণ, সেনাপতি, শহীদ সাহাবিদের জীবনী, হৃদয়স্পর্শী ইতিহাস, রণকৌশল ও লাইভ মানচিত্র দেখতে পাবেন।'
            : 'Click any battle to explore troop numbers, causes, commanders, honored martyrs, epic narratives, strategic lessons, and interactive satellite maps.'}
        </p>

        {/* 6 Era Summary Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1">
          {ERA_SECTIONS.map((era) => {
            const count = warsByEra[era.key]?.length || 0;
            const isSelected = activeEraFilter === era.key;
            return (
              <div
                key={era.key}
                onClick={() => {
                  setActiveEraFilter(isSelected ? 'all' : era.key);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-1 shadow-xs ${
                  isSelected
                    ? 'bg-amber-600 text-white border-amber-500 shadow-md ring-2 ring-amber-500/30 font-black'
                    : isDay ? 'bg-white border-amber-200 hover:border-amber-400' : 'bg-[#1a1208] border-amber-900/60 hover:border-amber-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-base">{era.icon}</span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-mono">
                    {count} {isBn ? 'টি' : ''}
                  </span>
                </div>
                <div className="text-xs font-bold truncate mt-1">
                  {isBn ? era.titleBn.replace(/^[০-৯]+\.\s*/, '') : era.titleEn.replace(/^[0-9]+\.\s*/, '')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search & Era Selector */}
      <div className={`p-4 rounded-3xl border shadow-md space-y-3 ${isDay ? 'bg-white border-slate-200' : 'bg-[#181108] border-amber-500/30'}`}>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? 'যুদ্ধের নাম, যুগ, সেনাপতি, স্থান দিয়ে খুঁজুন...' : 'Search battles by name, era, commander, location...'}
            className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs sm:text-sm font-semibold transition focus:outline-none ${
              isDay ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-500' : 'bg-[#0d0905] border-amber-900/60 text-white focus:border-amber-500'
            }`}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveEraFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border ${
              activeEraFilter === 'all'
                ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                : isDay ? 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200' : 'bg-[#140e06] text-amber-300 border-amber-900/50 hover:bg-[#1f1609]'
            }`}
          >
            {isBn ? 'সকল যুদ্ধ (৩১টি)' : 'All Battles (31)'}
          </button>
          {ERA_SECTIONS.map((era) => (
            <button
              key={era.key}
              onClick={() => setActiveEraFilter(era.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer border flex items-center gap-1.5 ${
                activeEraFilter === era.key
                  ? 'bg-amber-600 text-white border-amber-500 shadow-sm'
                  : isDay ? 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200' : 'bg-[#140e06] text-amber-300 border-amber-900/50 hover:bg-[#1f1609]'
              }`}
            >
              <span>{era.icon}</span>
              <span>{isBn ? era.titleBn : era.titleEn}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Wars Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className={`text-sm sm:text-base font-extrabold flex items-center gap-2 ${isDay ? 'text-slate-900' : 'text-white'}`}>
            <span>⚔️</span>
            <span>{isBn ? 'ঐতিহাসিক যুদ্ধের বিস্তারিত তালিকা' : 'List of Historical Battles'}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-mono font-bold">
              {filteredWars.length}
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredWars.map((war) => {
            const warName = isBn ? war.nameBn : war.nameEn;
            const warEra = isBn ? war.eraBn : war.eraEn;
            const warCause = isBn ? war.causeBn : war.causeEn;
            const warDate = isBn ? war.dateBn : war.dateEn;
            const warLocation = isBn ? war.locationBn : war.locationEn;

            return (
              <div
                key={war.id}
                onClick={() => {
                  setSelectedWarId(war.id);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`p-4 rounded-3xl border shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer flex flex-col justify-between gap-3 ${
                  isDay
                    ? 'bg-white border-slate-200 hover:border-amber-400 hover:shadow-xl'
                    : 'bg-[#140f07] border-amber-500/20 hover:border-amber-500/50 hover:shadow-black/70'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 font-black text-xs flex items-center justify-center shrink-0">
                    #{war.orderNumber}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 truncate">
                    {warEra}
                  </span>
                </div>

                <div>
                  <div className="font-arabic text-sm text-amber-600 dark:text-amber-400 font-bold mb-0.5 text-right">
                    {war.nameAr}
                  </div>
                  <h4 className={`text-sm sm:text-base font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {warName}
                  </h4>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                    📍 {warLocation} ({warDate})
                  </p>
                  <p className={`text-xs mt-2 line-clamp-2 leading-relaxed ${isDay ? 'text-slate-600' : 'text-amber-100/80'}`}>
                    {warCause}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-amber-900/30 text-xs font-bold text-amber-600 dark:text-amber-400">
                  <span>{isBn ? 'সম্পূর্ণ অধ্যায় ও বিবরণ' : 'Read Full Chapter'}</span>
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
