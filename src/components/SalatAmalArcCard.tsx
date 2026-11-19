import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  AlertTriangle,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Infinity as InfinityIcon,
  List,
  Sparkles,
  Sun,
  Sunrise as SunriseIcon,
  Sunset as SunsetIcon,
  Volume2,
} from 'lucide-react';
import { FormattedPrayerTimes, formatTime12h } from '../utils/prayerTimes';
import { AamalDayLog, ThemeMode, ZikrLanguage } from '../types';
import {
  WAQT_SALAH_PLANS,
  getAamalLogForDate,
  getTodayDateKey,
  saveAamalLogForDate,
} from '../utils/aamalTrackerData';
import { formatLocalizedNumber, SALAT_TEXTS } from '../utils/salatTranslations';
import { soundHaptics } from '../utils/audioHaptics';

export type WaqtNodeKey = 'Fajr' | 'Dhuhr' | 'Asr' | 'Maghrib' | 'Isha';

interface SalatAmalArcCardProps {
  prayerData: FormattedPrayerTimes;
  themeMode: ThemeMode;
  selectedLanguage: ZikrLanguage;
  soundEnabled: boolean;
  liveTick: number;
  completedPrayers: Record<string, boolean>;
  onSyncPrayerCompleted: (prayerKey: WaqtNodeKey, completed: boolean) => void;
  onOpenPrayerDetails?: (prayerKey: WaqtNodeKey) => void;
  activePrayerName?: string;
  liveCountdownStr?: string;
  activeWaqtProgress?: number;
  activeTimeRange?: string;
  nextPrayerLabel?: string;
  remainingLabel?: string;
  isPlayingAdhan?: boolean;
  playAdhanLabel?: string;
  playingAdhanLabel?: string;
  onTogglePlayAdhan?: () => void;
}

type ActiveFilterMode = 'all' | 'anytime' | WaqtNodeKey;

interface Point2D {
  x: number;
  y: number;
}

// Smooth cubic Bezier control points calibrated to match the curved solar-prayer horizon arc
const ARC_P0: Point2D = { x: 48, y: 128 };   // Fajr (straddling dashed horizon on left)
const ARC_C1: Point2D = { x: 136, y: -4 };   // Upper-left climb control point
const ARC_C2: Point2D = { x: 316, y: 6 };    // Upper-right descent control point
const ARC_P3: Point2D = { x: 380, y: 146 };  // Isha (inside shaded below-horizon band on right)
const HORIZON_Y = 118;

const NODE_T_MAP: Record<WaqtNodeKey, number> = {
  Fajr: 0.0,
  Dhuhr: 0.45,
  Asr: 0.68,
  Maghrib: 0.85,
  Isha: 1.0,
};

const WAQT_ORDER: WaqtNodeKey[] = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpPoint(p1: Point2D, p2: Point2D, t: number): Point2D {
  return { x: lerp(p1.x, p2.x, t), y: lerp(p1.y, p2.y, t) };
}

function evalCubicBezier(t: number): Point2D {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;
  return {
    x: uuu * ARC_P0.x + 3 * uu * t * ARC_C1.x + 3 * u * tt * ARC_C2.x + ttt * ARC_P3.x,
    y: uuu * ARC_P0.y + 3 * uu * t * ARC_C1.y + 3 * u * tt * ARC_C2.y + ttt * ARC_P3.y,
  };
}

// De Casteljau split for exact golden progress sub-curve from t = 0 to t = currentT
function getSubCubicBezierPath(t: number): { path: string; endPoint: Point2D } {
  const clampedT = Math.max(0, Math.min(1, t));
  const p01 = lerpPoint(ARC_P0, ARC_C1, clampedT);
  const p12 = lerpPoint(ARC_C1, ARC_C2, clampedT);
  const p23 = lerpPoint(ARC_C2, ARC_P3, clampedT);
  const p012 = lerpPoint(p01, p12, clampedT);
  const p123 = lerpPoint(p12, p23, clampedT);
  const endPoint = lerpPoint(p012, p123, clampedT);

  const path = `M ${ARC_P0.x.toFixed(2)} ${ARC_P0.y.toFixed(2)} C ${p01.x.toFixed(2)} ${p01.y.toFixed(2)}, ${p012.x.toFixed(2)} ${p012.y.toFixed(2)}, ${endPoint.x.toFixed(2)} ${endPoint.y.toFixed(2)}`;
  return { path, endPoint };
}

const FULL_ARC_PATH = `M ${ARC_P0.x} ${ARC_P0.y} C ${ARC_C1.x} ${ARC_C1.y}, ${ARC_C2.x} ${ARC_C2.y}, ${ARC_P3.x} ${ARC_P3.y}`;

const FARDH_ID_BY_WAQT = (isFriday: boolean): Record<WaqtNodeKey, string> => ({
  Fajr: 'fajr',
  Dhuhr: isFriday ? 'jummah_fardh' : 'dhuhr',
  Asr: 'asr',
  Maghrib: 'maghrib',
  Isha: 'isha',
});

export const SalatAmalArcCard: React.FC<SalatAmalArcCardProps> = ({
  prayerData,
  themeMode,
  selectedLanguage,
  soundEnabled,
  liveTick,
  completedPrayers,
  onSyncPrayerCompleted,
  onOpenPrayerDetails,
  activePrayerName,
  liveCountdownStr,
  activeWaqtProgress = 0,
  activeTimeRange,
  nextPrayerLabel,
  remainingLabel,
  isPlayingAdhan = false,
  playAdhanLabel,
  playingAdhanLabel,
  onTogglePlayAdhan,
}) => {
  const isDay = themeMode === 'day';
  const lang = selectedLanguage || 'bn';
  const isBn = lang === 'bn';
  const isAr = lang === 'ar';
  const isFriday = new Date().getDay() === 5;
  const todayKey = getTodayDateKey();

  const [dayLog, setDayLog] = useState<AamalDayLog>(() => getAamalLogForDate(todayKey));
  const [activeFilter, setActiveFilter] = useState<ActiveFilterMode>('all');
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  // Keep Aamal log synced when completedPrayers changes externally (e.g. from Tracker tab)
  useEffect(() => {
    const fardMap = FARDH_ID_BY_WAQT(isFriday);
    setDayLog((prev) => {
      let changed = false;
      const updatedItems = prev.items.map((item) => {
        for (const waqt of WAQT_ORDER) {
          if (item.id === fardMap[waqt]) {
            const externalVal = Boolean(completedPrayers[waqt]);
            if (item.completed !== externalVal) {
              changed = true;
              return { ...item, completed: externalVal };
            }
          }
        }
        return item;
      });
      if (!changed) return prev;
      const completedCount = updatedItems.filter((i) => i.completed).length;
      const nextLog: AamalDayLog = {
        ...prev,
        items: updatedItems,
        completedRatio: updatedItems.length > 0 ? completedCount / updatedItems.length : 0,
      };
      saveAamalLogForDate(todayKey, nextLog);
      return nextLog;
    });
  }, [completedPrayers, isFriday, todayKey]);

  // Build item-ID lookup for each of the 5 waqts and for "Any time"
  const { waqtItemIds, anytimeItemIds, itemById } = useMemo(() => {
    const map = new Map(dayLog.items.map((it) => [it.id, it]));
    const dhuhrPlanId = isFriday ? 'jummah' : 'dhuhr';
    const planLookup: Record<WaqtNodeKey, string> = {
      Fajr: 'fajr',
      Dhuhr: dhuhrPlanId,
      Asr: 'asr',
      Maghrib: 'maghrib',
      Isha: 'isha',
    };

    const wIds: Record<WaqtNodeKey, string[]> = {
      Fajr: [],
      Dhuhr: [],
      Asr: [],
      Maghrib: [],
      Isha: [],
    };
    const allWaqtSet = new Set<string>();

    for (const waqt of WAQT_ORDER) {
      const plan = WAQT_SALAH_PLANS.find((p) => p.waqtId === planLookup[waqt]);
      if (plan) {
        const ids = plan.items.map((i) => i.id).filter((id) => map.has(id));
        wIds[waqt] = ids;
        ids.forEach((id) => allWaqtSet.add(id));
      }
    }

    // Exclude alternate Friday/regular Dhuhr items from anytime list
    const excludedAltPlanId = isFriday ? 'dhuhr' : 'jummah';
    const altPlan = WAQT_SALAH_PLANS.find((p) => p.waqtId === excludedAltPlanId);
    const altSet = new Set<string>(altPlan ? altPlan.items.map((i) => i.id) : []);

    const anyIds = dayLog.items
      .filter((item) => !allWaqtSet.has(item.id) && !altSet.has(item.id))
      .map((item) => item.id);

    return { waqtItemIds: wIds, anytimeItemIds: anyIds, itemById: map };
  }, [dayLog.items, isFriday]);

  // Compute completion counts per waqt, anytime, and overall
  const stats = useMemo(() => {
    const perWaqt: Record<WaqtNodeKey, { done: number; total: number }> = {
      Fajr: { done: 0, total: 0 },
      Dhuhr: { done: 0, total: 0 },
      Asr: { done: 0, total: 0 },
      Maghrib: { done: 0, total: 0 },
      Isha: { done: 0, total: 0 },
    };

    let waqtDoneTotal = 0;
    let waqtTotalAll = 0;

    for (const waqt of WAQT_ORDER) {
      const ids = waqtItemIds[waqt];
      const done = ids.filter((id) => itemById.get(id)?.completed).length;
      perWaqt[waqt] = { done, total: ids.length };
      waqtDoneTotal += done;
      waqtTotalAll += ids.length;
    }

    const anytimeDone = anytimeItemIds.filter((id) => itemById.get(id)?.completed).length;
    const anytimeTotal = anytimeItemIds.length;

    return {
      perWaqt,
      anytimeDone,
      anytimeTotal,
      totalDone: waqtDoneTotal + anytimeDone,
      totalAll: waqtTotalAll + anytimeTotal,
    };
  }, [waqtItemIds, anytimeItemIds, itemById]);

  // Live current time formatted + exact piecewise sun position along the arc
  const { nowFormatted, currentT, activeWaqtKey } = useMemo(() => {
    const now = new Date();
    const nowMs = now.getTime();
    const formatted = formatTime12h(now);

    const fajrMs = prayerData.fajrDate.getTime();
    const dhuhrMs = prayerData.dhuhrDate.getTime();
    const asrMs = prayerData.asrDate.getTime();
    const maghribMs = prayerData.maghribDate.getTime();
    const ishaMs = prayerData.ishaDate.getTime();

    let t = 0;
    let active: WaqtNodeKey = 'Fajr';

    if (nowMs <= fajrMs) {
      t = 0;
      active = 'Isha';
    } else if (nowMs < dhuhrMs) {
      const ratio = (nowMs - fajrMs) / Math.max(1, dhuhrMs - fajrMs);
      t = lerp(NODE_T_MAP.Fajr, NODE_T_MAP.Dhuhr, ratio);
      active = 'Fajr';
    } else if (nowMs < asrMs) {
      const ratio = (nowMs - dhuhrMs) / Math.max(1, asrMs - dhuhrMs);
      t = lerp(NODE_T_MAP.Dhuhr, NODE_T_MAP.Asr, ratio);
      active = 'Dhuhr';
    } else if (nowMs < maghribMs) {
      const ratio = (nowMs - asrMs) / Math.max(1, maghribMs - asrMs);
      t = lerp(NODE_T_MAP.Asr, NODE_T_MAP.Maghrib, ratio);
      active = 'Asr';
    } else if (nowMs < ishaMs) {
      const ratio = (nowMs - maghribMs) / Math.max(1, ishaMs - maghribMs);
      t = lerp(NODE_T_MAP.Maghrib, NODE_T_MAP.Isha, ratio);
      active = 'Maghrib';
    } else {
      t = 1;
      active = 'Isha';
    }

    return { nowFormatted: formatted, currentT: t, activeWaqtKey: active };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prayerData, liveTick]);

  const { path: goldenProgressPath, endPoint: sunPoint } = useMemo(
    () => getSubCubicBezierPath(currentT),
    [currentT]
  );

  // Live permissible vs prohibited (Makruh) solar window check (Sunrise, Zawal, Sunset)
  const waqtValidity = useMemo(() => {
    const nowMs = Date.now();
    const { sunriseDate, solarNoonDate, sunsetDate } = prayerData.solar;

    if (sunriseDate) {
      const ms = sunriseDate.getTime();
      if (nowMs >= ms - 2 * 60000 && nowMs <= ms + 16 * 60000) {
        return {
          isProhibited: true,
          label: isBn ? 'মাকরূহ ওয়াক্ত: সূর্যোদয়' : isAr ? 'وقت كراهة: الشروق' : 'Makruh: Sunrise',
        };
      }
    }
    if (solarNoonDate) {
      const ms = solarNoonDate.getTime();
      if (nowMs >= ms - 10 * 60000 && nowMs <= ms + 2 * 60000) {
        return {
          isProhibited: true,
          label: isBn ? 'মাকরূহ ওয়াক্ত: যাওয়াল' : isAr ? 'وقت كراهة: الزوال' : 'Makruh: Zawal',
        };
      }
    }
    if (sunsetDate) {
      const ms = sunsetDate.getTime();
      if (nowMs >= ms - 16 * 60000 && nowMs <= ms + 2 * 60000) {
        return {
          isProhibited: true,
          label: isBn ? 'মাকরূহ ওয়াক্ত: সূর্যাস্ত' : isAr ? 'وقت كراهة: الغروب' : 'Makruh: Sunset',
        };
      }
    }
    return {
      isProhibited: false,
      label: isBn ? 'সালাতের বৈধ ওয়াক্ত' : isAr ? 'وقت صلاة جائز' : 'Valid prayer time',
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prayerData.solar, liveTick, isBn, isAr]);

  // Precompute the 5 prayer node coordinates and start times
  const nodes = useMemo(() => {
    const startTimes: Record<WaqtNodeKey, string> = {
      Fajr: prayerData.fajr,
      Dhuhr: prayerData.dhuhr,
      Asr: prayerData.asr,
      Maghrib: prayerData.maghrib,
      Isha: prayerData.isha,
    };

    return WAQT_ORDER.map((key) => {
      const pt = evalCubicBezier(NODE_T_MAP[key]);
      const localizedName =
        (SALAT_TEXTS.prayerNames as Record<string, Record<string, string>>)[key]?.[lang] || key;
      const { done, total } = stats.perWaqt[key];
      return {
        key,
        name: localizedName,
        time: startTimes[key],
        x: pt.x,
        y: pt.y,
        done,
        total,
        isAllDone: total > 0 && done === total,
        isCurrent: activeWaqtKey === key,
      };
    });
  }, [prayerData, lang, stats.perWaqt, activeWaqtKey]);

  const toggleItemCompleted = useCallback(
    (itemId: string) => {
      const fardMap = FARDH_ID_BY_WAQT(isFriday);
      setDayLog((prev) => {
        let nextVal = false;
        const updatedItems = prev.items.map((item) => {
          if (item.id === itemId) {
            nextVal = !item.completed;
            return { ...item, completed: nextVal };
          }
          return item;
        });

        const completedCount = updatedItems.filter((i) => i.completed).length;
        const nextLog: AamalDayLog = {
          ...prev,
          items: updatedItems,
          completedRatio: updatedItems.length > 0 ? completedCount / updatedItems.length : 0,
        };
        saveAamalLogForDate(todayKey, nextLog);

        // Sync if this item is one of the 5 Fardh prayers
        for (const waqt of WAQT_ORDER) {
          if (fardMap[waqt] === itemId) {
            onSyncPrayerCompleted(waqt, nextVal);
            break;
          }
        }

        if (soundEnabled) {
          if (nextVal) soundHaptics.playMilestone();
          else soundHaptics.playTap();
        }

        return nextLog;
      });
    },
    [isFriday, onSyncPrayerCompleted, soundEnabled, todayKey]
  );

  const handleSelectFilter = (mode: ActiveFilterMode) => {
    if (soundEnabled) soundHaptics.playTap();
    if (activeFilter === mode && drawerOpen) {
      setDrawerOpen(false);
    } else {
      setActiveFilter(mode);
      setDrawerOpen(true);
    }
  };

  // Filtered checklist items for the expandable amal panel
  const visibleChecklistItems = useMemo(() => {
    if (activeFilter === 'anytime') {
      return anytimeItemIds
        .map((id) => itemById.get(id))
        .filter((x): x is NonNullable<typeof x> => Boolean(x));
    }
    if (activeFilter === 'all') {
      const orderedIds = [
        ...WAQT_ORDER.flatMap((w) => waqtItemIds[w]),
        ...anytimeItemIds,
      ];
      return orderedIds
        .map((id) => itemById.get(id))
        .filter((x): x is NonNullable<typeof x> => Boolean(x));
    }
    return waqtItemIds[activeFilter]
      .map((id) => itemById.get(id))
      .filter((x): x is NonNullable<typeof x> => Boolean(x));
  }, [activeFilter, waqtItemIds, anytimeItemIds, itemById]);

  const activeFilterTitle = useMemo(() => {
    if (activeFilter === 'all') {
      return isBn ? 'সকল দৈনিক আমল' : isAr ? 'جميع الأعمال اليومية' : 'All Daily Amals';
    }
    if (activeFilter === 'anytime') {
      return isBn ? 'যেকোনো সময়ের আমল' : isAr ? 'أعمال في أي وقت' : 'Any Time Amals';
    }
    const localizedWaqt =
      (SALAT_TEXTS.prayerNames as Record<string, Record<string, string>>)[activeFilter]?.[lang] ||
      activeFilter;
    return isBn
      ? `${localizedWaqt} ওয়াক্তের আমল`
      : isAr
      ? `أعمال وقت ${localizedWaqt}`
      : `${localizedWaqt} Amals`;
  }, [activeFilter, isAr, isBn, lang]);

  // Localized labels matching the reference design
  const amalDoneText = isBn
    ? `${formatLocalizedNumber(stats.totalDone, lang)}/${formatLocalizedNumber(stats.totalAll, lang)} আমল সম্পন্ন`
    : isAr
    ? `${formatLocalizedNumber(stats.totalDone, lang)}/${formatLocalizedNumber(stats.totalAll, lang)} عمل مكتمل`
    : `${stats.totalDone}/${stats.totalAll} amal done`;

  const nowText = isBn
    ? `এখন - ${formatLocalizedNumber(nowFormatted, lang)}`
    : isAr
    ? `الآن - ${formatLocalizedNumber(nowFormatted, lang)}`
    : `Now - ${nowFormatted}`;

  const allAmalLabel = isBn ? 'সব আমল' : isAr ? 'كل الأعمال' : 'All amal';
  const anyTimeLabel = isBn
    ? `যেকোনো সময় - ${formatLocalizedNumber(stats.anytimeDone, lang)}/${formatLocalizedNumber(stats.anytimeTotal, lang)}`
    : isAr
    ? `أي وقت - ${formatLocalizedNumber(stats.anytimeDone, lang)}/${formatLocalizedNumber(stats.anytimeTotal, lang)}`
    : `Any time - ${stats.anytimeDone}/${stats.anytimeTotal}`;

  // Theme colors crafted to harmonize with the selected light color palette in Day mode and deep emerald in Night mode
  const cardBg = isDay
    ? 'bg-white border-[var(--app-border,#E7E5DA)] text-[#1F2421]'
    : 'bg-[#09211c] border-emerald-800/60 text-emerald-50';
  const trayFill = isDay ? 'var(--app-surface-soft, #EFEEE7)' : '#051612';
  const horizonStroke = isDay ? 'var(--app-border, #D4D2C7)' : '#1e4b40';
  const dottedArcStroke = isDay ? 'var(--app-border, #CFCDBE)' : '#255c4e';
  const nodeFill = isDay ? '#FFFFFF' : '#0c2c25';
  const nodeRingDefault = isDay ? 'var(--app-border, #E3E2D8)' : '#1d4a3f';
  const nodeTextColor = isDay ? '#1F2421' : '#F1F5F9';
  const nodeLabelColor = isDay ? '#2B302C' : '#CBD5E1';
  const labelPillFill = isDay ? '#FFFFFF' : '#09211c';
  const labelPillTrayFill = isDay ? 'var(--app-surface-soft, #F6F5EE)' : '#0a251f';

  return (
    <section
      aria-label={isBn ? 'সালাত ও আমল সূর্য-কক্ষপথ' : 'Salat Time and Amal Arc'}
      className={`rounded-[26px] border shadow-xs transition-colors overflow-hidden ${cardBg}`}
    >
      {/* Top Header Row: "0/16 amal done" | "Now - 10:42 AM" */}
      <div className="flex items-center justify-between px-4 sm:px-5 pt-3.5 pb-1 gap-2">
        <div
          className={`text-[12px] sm:text-[13px] font-bold tracking-tight tabular-nums ${
            isDay ? 'text-[#4B534E]' : 'text-emerald-200/80'
          }`}
        >
          {amalDoneText}
        </div>
        <div
          className={`text-[12px] sm:text-[13px] font-semibold tabular-nums ${
            isDay ? 'text-[#545C57]' : 'text-emerald-200/75'
          }`}
        >
          {nowText}
        </div>
      </div>

      {/* Slim Integrated Active Waqt Strip (Prayer Name, Live Countdown, Adhan Toggle, Progress & Next Waqt) */}
      {activePrayerName && liveCountdownStr && (
        <div
          className={`px-4 sm:px-5 pt-1.5 pb-2.5 border-b ${
            isDay ? 'border-[var(--app-border,#E9E7DC)]' : 'border-emerald-800/45'
          }`}
        >
          {/* Active Waqt + Countdown + Play Adhan button */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-2 min-w-0 flex-wrap">
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[var(--app-primary-mid,#10b981)] animate-pulse shrink-0" />
                <span
                  className={`text-lg sm:text-xl font-black tracking-tight leading-none ${
                    isDay ? 'text-[var(--app-primary,#054A37)]' : 'text-amber-200'
                  }`}
                >
                  {activePrayerName}
                </span>
              </div>

              <span
                className={`text-lg sm:text-xl font-mono font-black tracking-tight tabular-nums leading-none ${
                  isDay ? 'text-[#18201C]' : 'text-white'
                }`}
              >
                {formatLocalizedNumber(liveCountdownStr, lang)}
              </span>

              {remainingLabel && (
                <span
                  className={`text-[11px] font-semibold leading-none ${
                    isDay ? 'text-[#626A65]' : 'text-emerald-300/75'
                  }`}
                >
                  {remainingLabel}
                </span>
              )}
            </div>

            {onTogglePlayAdhan && (
              <button
                type="button"
                onClick={onTogglePlayAdhan}
                className={`shrink-0 min-h-[34px] px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold border flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer ${
                  isPlayingAdhan
                    ? 'bg-[#E5A900] text-white border-[#D49A00] shadow-sm shadow-amber-500/25 animate-pulse'
                    : isDay
                    ? 'bg-[var(--app-surface-soft,#e9f6ef)] hover:opacity-90 text-[var(--app-primary,#054A37)] border-[var(--app-border,#cbe6d8)]'
                    : 'bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-100 border-emerald-400/25'
                }`}
              >
                <Volume2 className={`w-3.5 h-3.5 shrink-0 ${isPlayingAdhan ? 'animate-bounce' : ''}`} />
                <span className="whitespace-nowrap">
                  {isPlayingAdhan ? playingAdhanLabel || 'Playing Adhan' : playAdhanLabel || 'Play Adhan'}
                </span>
              </button>
            )}
          </div>

          {/* Slim Waqt Elapsed Progress Hairline */}
          <div
            className={`relative w-full h-1.5 rounded-full mt-2 overflow-hidden ${
              isDay ? 'bg-[var(--app-surface-soft,#E6E4D8)]' : 'bg-emerald-950/90'
            }`}
          >
            <div
              className="h-full bg-gradient-to-r from-[var(--app-primary,#006A4E)] via-[var(--app-primary-mid,#059669)] to-[#E5A900] rounded-full transition-all duration-1000"
              style={{ width: `${Math.max(0, Math.min(100, activeWaqtProgress))}%` }}
            />
          </div>

          {/* Quiet Inline Metadata Row: Time Range, Valid/Makruh Status & Next Waqt */}
          {(activeTimeRange || nextPrayerLabel) && (
            <div className="flex items-center justify-between gap-2 mt-2 text-[11px] sm:text-xs font-semibold tabular-nums flex-wrap">
              <div className="flex items-center gap-2 min-w-0">
                {activeTimeRange && (
                  <span
                    className={`flex items-center gap-1 font-mono ${
                      isDay ? 'text-[#555D58]' : 'text-emerald-200/80'
                    }`}
                  >
                    <Clock className="w-3 h-3 shrink-0 opacity-75" />
                    <span>{formatLocalizedNumber(activeTimeRange, lang)}</span>
                  </span>
                )}
                <span
                  className={`inline-flex items-center gap-1 text-[10.5px] font-bold ${
                    waqtValidity.isProhibited
                      ? isDay
                        ? 'text-rose-600'
                        : 'text-rose-400'
                      : isDay
                      ? 'text-[var(--app-primary,#057A55)]'
                      : 'text-emerald-400'
                  }`}
                >
                  {waqtValidity.isProhibited ? (
                    <AlertTriangle className="w-3 h-3 shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                  )}
                  <span className="truncate">{waqtValidity.label}</span>
                </span>
              </div>

              {nextPrayerLabel && (
                <span
                  className={`font-bold truncate ${
                    isDay ? 'text-[#A67400]' : 'text-amber-300'
                  }`}
                >
                  {nextPrayerLabel}
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Curved Prayer & Solar Arc Visualization */}
      <div className="relative px-2 sm:px-3 pt-1.5 pb-1.5">
        <svg
          viewBox="0 0 420 206"
          className="w-full h-auto block select-none overflow-visible"
          role="img"
          aria-label={
            isBn
              ? 'ফজর থেকে এশা পর্যন্ত নামাজের সময় ও আমলের বক্ররেখা'
              : 'Prayer schedule and daily amal arc from Fajr to Isha'
          }
        >
          <defs>
            <filter id="salatSunGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Shaded Below-Horizon Band (Night / Pre-Sunrise & Post-Sunset zone) */}
          <rect
            x="10"
            y={HORIZON_Y + 2}
            width="400"
            height="76"
            rx="16"
            fill={trayFill}
          />

          {/* Horizontal Dashed Horizon Divider */}
          <line
            x1="10"
            y1={HORIZON_Y}
            x2="410"
            y2={HORIZON_Y}
            stroke={horizonStroke}
            strokeWidth="1.4"
            strokeDasharray="4 4"
          />

          {/* Full Dotted Prayer Arc from Fajr -> Dhuhr -> Asr -> Maghrib -> Isha */}
          <path
            d={FULL_ARC_PATH}
            fill="none"
            stroke={dottedArcStroke}
            strokeWidth="2.4"
            strokeDasharray="4 6"
            strokeLinecap="round"
          />

          {/* Live Golden Progress Arc from Fajr up to the exact current time */}
          {currentT > 0.005 && (
            <path
              d={goldenProgressPath}
              fill="none"
              stroke="#E5A900"
              strokeWidth="3.6"
              strokeLinecap="round"
            />
          )}

          {/* Glowing Golden Live Sun Dot at exact interpolated real-time position */}
          <g transform={`translate(${sunPoint.x.toFixed(2)}, ${sunPoint.y.toFixed(2)})`}>
            <circle
              r="14"
              fill="#F5B800"
              fillOpacity={isDay ? 0.24 : 0.28}
            />
            <circle
              r="7.5"
              fill="#E5A900"
              filter="url(#salatSunGlow)"
            />
          </g>

          {/* 5 Interactive Circular Prayer Nodes along the Arc */}
          {nodes.map((node) => {
            const isSelected = drawerOpen && activeFilter === node.key;
            const ringColor = isSelected
              ? '#E5A900'
              : node.isAllDone
              ? '#10B981'
              : node.isCurrent
              ? '#E5A900'
              : nodeRingDefault;

            const isBelowHorizon = node.key === 'Fajr' || node.key === 'Isha';
            const labelY = node.y + 33;
            const fractionText = `${formatLocalizedNumber(node.done, lang)}/${formatLocalizedNumber(node.total, lang)}`;

            return (
              <g
                key={node.key}
                transform={`translate(${node.x.toFixed(1)}, ${node.y.toFixed(1)})`}
                onClick={() => handleSelectFilter(node.key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelectFilter(node.key);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`${node.name} ${node.done}/${node.total} (${node.time})`}
                className="cursor-pointer outline-none group"
              >
                {/* Invisible generous touch target (48x54) */}
                <circle r="27" fill="transparent" />

                {/* Selection halo */}
                {isSelected && (
                  <circle
                    r="26"
                    fill="#E5A900"
                    fillOpacity="0.16"
                  />
                )}

                {/* Crisp circular node with thick soft ring matching reference */}
                <circle
                  r="21.5"
                  fill={nodeFill}
                  stroke={ringColor}
                  strokeWidth={isSelected ? '3.8' : '4'}
                  className="transition-all duration-200"
                />

                {/* Completed checkmark subtle indicator if all amals in this waqt done */}
                {node.isAllDone && (
                  <circle
                    cx="15"
                    cy="-15"
                    r="6"
                    fill="#10B981"
                    stroke={nodeFill}
                    strokeWidth="1.5"
                  />
                )}

                {/* Fraction inside circle (e.g. 0/4) */}
                <text
                  x="0"
                  y="4.5"
                  textAnchor="middle"
                  fill={node.isAllDone ? '#059669' : nodeTextColor}
                  fontSize="12.5"
                  fontWeight="700"
                  style={{ fontVariantNumeric: 'tabular-nums' }}
                >
                  {fractionText}
                </text>

                {/* Label pill backing for legibility over horizon line & tray */}
                <rect
                  x={node.key === 'Maghrib' ? -27 : -22}
                  y={labelY - node.y - 10}
                  width={node.key === 'Maghrib' ? 54 : 44}
                  height="15"
                  rx="7.5"
                  fill={isBelowHorizon ? labelPillTrayFill : labelPillFill}
                  fillOpacity="0.92"
                />

                {/* Prayer Name directly beneath circle */}
                <text
                  x="0"
                  y={labelY - node.y + 1}
                  textAnchor="middle"
                  fill={isSelected ? '#B47E00' : nodeLabelColor}
                  fontSize="11"
                  fontWeight={isSelected || node.isCurrent ? '700' : '600'}
                >
                  {node.name}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Slim Integrated Solar Milestones Row (Sunrise · Zawal · Sunset · Daylight) */}
      <div className="px-4 sm:px-5 pb-2.5">
        <div
          className={`grid grid-cols-4 divide-x rounded-2xl border py-2 px-1 text-center tabular-nums ${
            isDay
              ? 'bg-[var(--app-surface-soft,#F6F5EE)]/75 border-[var(--app-border,#E5E3D8)] divide-[var(--app-border,#E5E3D8)]'
              : 'bg-[#061814]/80 border-emerald-900/60 divide-emerald-900/60'
          }`}
        >
          <div className="px-1 flex flex-col items-center justify-center">
            <span className="flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400">
              <SunriseIcon className="w-3 h-3 shrink-0" />
              <span className="truncate">{isBn ? 'সূর্যোদয়' : isAr ? 'الشروق' : 'Sunrise'}</span>
            </span>
            <span className={`text-[11px] font-mono font-extrabold mt-0.5 ${isDay ? 'text-slate-800' : 'text-white'}`}>
              {formatLocalizedNumber(prayerData.solar.sunriseTime, lang)}
            </span>
          </div>

          <div className="px-1 flex flex-col items-center justify-center">
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
              <Sun className="w-3 h-3 shrink-0" />
              <span className="truncate">{isBn ? 'মধ্যাহ্ন' : isAr ? 'الزوال' : 'Zawal'}</span>
            </span>
            <span className={`text-[11px] font-mono font-extrabold mt-0.5 ${isDay ? 'text-slate-800' : 'text-white'}`}>
              {formatLocalizedNumber(prayerData.solar.solarNoonTime, lang)}
            </span>
          </div>

          <div className="px-1 flex flex-col items-center justify-center">
            <span className="flex items-center gap-1 text-[10px] font-bold text-rose-600 dark:text-rose-400">
              <SunsetIcon className="w-3 h-3 shrink-0" />
              <span className="truncate">{isBn ? 'সূর্যাস্ত' : isAr ? 'الغروب' : 'Sunset'}</span>
            </span>
            <span className={`text-[11px] font-mono font-extrabold mt-0.5 ${isDay ? 'text-slate-800' : 'text-white'}`}>
              {formatLocalizedNumber(prayerData.solar.sunsetTime, lang)}
            </span>
          </div>

          <div className="px-1 flex flex-col items-center justify-center">
            <span className="flex items-center gap-1 text-[10px] font-bold text-sky-700 dark:text-sky-400">
              <Clock className="w-3 h-3 shrink-0" />
              <span className="truncate">{isBn ? 'দিনের আলো' : isAr ? 'النهار' : 'Daylight'}</span>
            </span>
            <span className={`text-[11px] font-mono font-extrabold mt-0.5 ${isDay ? 'text-slate-800' : 'text-white'}`}>
              {formatLocalizedNumber(prayerData.solar.daylightTotalFormatted, lang)}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Action Row: [All amal] [∞ Any time - X/Y] */}
      <div className="flex items-center justify-between gap-2 px-4 sm:px-5 pb-4 pt-1 flex-wrap">
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            onClick={() => handleSelectFilter('all')}
            className={`min-h-[42px] px-4 py-2 rounded-full text-[13px] sm:text-sm font-bold flex items-center gap-2 transition-all active:scale-95 cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#E5A900] text-white shadow-sm shadow-amber-500/25'
                : isDay
                ? 'bg-[#F3F2EB] text-[#2A302C] border border-[#E2E0D5] hover:border-[#E5A900]/60'
                : 'bg-[#0e2d26] text-emerald-100 border border-emerald-800/70 hover:border-amber-400/50'
            }`}
          >
            <List className="w-4 h-4 shrink-0" />
            <span>{allAmalLabel}</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectFilter('anytime')}
            className={`min-h-[42px] px-4 py-2 rounded-full text-[13px] sm:text-sm font-bold flex items-center gap-2 tabular-nums transition-all active:scale-95 cursor-pointer ${
              activeFilter === 'anytime'
                ? 'bg-[#E5A900] text-white shadow-sm shadow-amber-500/25'
                : isDay
                ? 'bg-[#F5F4EE] text-[#262B28] border border-[#E3E1D7] hover:border-[#E5A900]/60'
                : 'bg-[#0e2d26] text-emerald-100 border border-emerald-800/70 hover:border-amber-400/50'
            }`}
          >
            <InfinityIcon className="w-4 h-4 shrink-0" />
            <span>{anyTimeLabel}</span>
          </button>
        </div>

        {/* Subtle expand/collapse cue */}
        <button
          type="button"
          onClick={() => {
            if (soundEnabled) soundHaptics.playTap();
            setDrawerOpen((prev) => !prev);
          }}
          aria-expanded={drawerOpen}
          aria-label={drawerOpen ? 'Collapse amals' : 'Expand amals'}
          className={`min-h-[38px] min-w-[38px] rounded-full flex items-center justify-center border transition cursor-pointer ${
            isDay
              ? 'bg-white/80 border-[#E3E1D7] text-[#4A504C] hover:border-[#E5A900]'
              : 'bg-[#0d2a23] border-emerald-800/60 text-emerald-200 hover:border-amber-400/60'
          }`}
        >
          {drawerOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Interactive Expandable Amal Checklist Panel (opens when tapping a node or button) */}
      {drawerOpen && (
        <div
          className={`border-t px-4 sm:px-5 py-3.5 space-y-3 animate-in fade-in duration-200 ${
            isDay ? 'border-[#E7E5DA] bg-[#F4F3EC]/70' : 'border-emerald-800/50 bg-[#061814]/80'
          }`}
        >
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles className="w-4 h-4 text-[#D99B00] shrink-0" />
              <h3 className="text-xs sm:text-sm font-extrabold truncate">
                {activeFilterTitle}
              </h3>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full tabular-nums ${
                  isDay
                    ? 'bg-[#E9E7DC] text-[#39403C]'
                    : 'bg-emerald-900/60 text-emerald-200'
                }`}
              >
                {formatLocalizedNumber(
                  visibleChecklistItems.filter((i) => i.completed).length,
                  lang
                )}
                /{formatLocalizedNumber(visibleChecklistItems.length, lang)}
              </span>
            </div>

            {/* If a specific waqt is selected, show its live time & details button */}
            {activeFilter !== 'all' && activeFilter !== 'anytime' && (
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-mono font-bold flex items-center gap-1 ${
                    isDay ? 'text-[#555B57]' : 'text-emerald-300/80'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  {formatLocalizedNumber(
                    nodes.find((n) => n.key === activeFilter)?.time || '',
                    lang
                  )}
                </span>
                {onOpenPrayerDetails && (
                  <button
                    type="button"
                    onClick={() => {
                      if (soundEnabled) soundHaptics.playTap();
                      onOpenPrayerDetails(activeFilter);
                    }}
                    className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition cursor-pointer ${
                      isDay
                        ? 'bg-[#E5A900]/15 text-[#9A6E00] hover:bg-[#E5A900]/25'
                        : 'bg-amber-400/15 text-amber-300 hover:bg-amber-400/25'
                    }`}
                  >
                    {isBn ? 'বিস্তারিত' : isAr ? 'التفاصيل' : 'Details'}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Checklist items */}
          <div className="max-h-64 overflow-y-auto pr-1 space-y-1.5">
            {visibleChecklistItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleItemCompleted(item.id)}
                className={`w-full min-h-[44px] px-3 py-2 rounded-2xl border text-left flex items-center gap-3 transition-all active:scale-[0.99] cursor-pointer ${
                  item.completed
                    ? isDay
                      ? 'bg-emerald-50/90 border-emerald-300/80 text-emerald-950'
                      : 'bg-emerald-950/60 border-emerald-500/40 text-emerald-100'
                    : isDay
                    ? 'bg-white border-[#E6E4DA] text-[#242926] hover:border-[#E5A900]/70'
                    : 'bg-[#0a241e] border-emerald-900/60 text-emerald-50 hover:border-amber-400/50'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border-2 transition-colors ${
                    item.completed
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : isDay
                      ? 'border-[#CFCDBE] bg-[#FAF9F3]'
                      : 'border-emerald-700 bg-[#071b16]'
                  }`}
                >
                  {item.completed && <Check className="w-3 h-3 stroke-[3]" />}
                </span>

                <div className="min-w-0 flex-1">
                  <div
                    className={`text-xs sm:text-[13px] font-bold leading-snug ${
                      item.completed ? 'line-through opacity-75' : ''
                    }`}
                  >
                    {item.label}
                  </div>
                  {item.details && (
                    <div
                      className={`text-[11px] truncate mt-0.5 ${
                        isDay ? 'text-[#666C68]' : 'text-emerald-300/65'
                      }`}
                    >
                      {item.details}
                    </div>
                  )}
                </div>

                {item.arabicLabel && (
                  <span
                    dir="rtl"
                    className={`font-quran text-xs shrink-0 hidden xs:inline ${
                      isDay ? 'text-[#8B7E52]' : 'text-amber-300/75'
                    }`}
                  >
                    {item.arabicLabel}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
