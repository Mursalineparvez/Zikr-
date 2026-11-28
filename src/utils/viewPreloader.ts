/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Central view and chunk preloader to ensure instant sub-second page transitions
const prefetchCache = new Set<string>();

type PreloadableView =
  | 'quran'
  | 'salat_time'
  | 'aamal_tracker'
  | 'other'
  | 'hayatus_sahaba'
  | 'islamic_history_wars'
  | 'seerat_un_nabi'
  | 'nobi_24_hours'
  | 'daily_sunnah'
  | 'history_timeline'
  | 'arabian_map'
  | 'arober_gotro'
  | 'dua'
  | 'hadith'
  | 'kitab'
  | 'hajj_checklist'
  | 'tablig'
  | 'prophets_25'
  | 'allah_names'
  | 'saved'
  | 'settings'
  | 'zikr_modal'
  | 'profile_modal'
  | 'history_modal';

const viewLoaders: Record<PreloadableView, () => Promise<any>> = {
  quran: () => import('../components/QuranView'),
  salat_time: () => import('../components/SalatTimeView'),
  aamal_tracker: () => import('../components/AamalTrackerView'),
  other: () => import('../components/OtherIslamicHubView'),
  hayatus_sahaba: () => import('../components/HayatusSahabaView'),
  islamic_history_wars: () => import('../components/IslamicHistoryWarsView'),
  seerat_un_nabi: () => import('../components/SeeratUnNabiView'),
  nobi_24_hours: () => import('../components/Nobi24HoursView'),
  daily_sunnah: () => import('../components/DailySunnahView'),
  history_timeline: () => import('../components/HistoryTimelineView'),
  arabian_map: () => import('../components/ArabianIllustratedMapView'),
  arober_gotro: () => import('../components/AraberGotroByaktittoView'),
  dua: () => import('../components/DuaView'),
  hadith: () => import('../components/HadithView'),
  kitab: () => import('../components/KitabView'),
  hajj_checklist: () => import('../components/HajjUmrahView'),
  tablig: () => import('../components/DailyTabligView'),
  prophets_25: () => import('../components/Prophets25View'),
  allah_names: () => import('../components/AllahNamesView'),
  saved: () => import('../components/SavedView'),
  settings: () => import('../components/SettingsView'),
  zikr_modal: () => import('../components/ZikrModal'),
  profile_modal: () => import('../components/ProfileModal'),
  history_modal: () => import('../components/HistoryReportModal'),
};

/**
 * Preload a specific view chunk into the browser cache
 */
export function prefetchView(view: PreloadableView | string): void {
  if (prefetchCache.has(view)) return;
  const loader = viewLoaders[view as PreloadableView];
  if (loader) {
    prefetchCache.add(view);
    loader().catch(() => {
      prefetchCache.delete(view); // Retry on next request if transient failure
    });
  }
}

/**
 * Gently pre-warm views in background ONLY when the app is completely idle
 * and initial counter view has been fully rendered and displayed.
 */
export function warmupViewsIdle(): void {
  if (typeof navigator !== 'undefined') {
    if (!navigator.onLine) return;
    if ((navigator as any).connection?.saveData) return;
  }

  const scheduleIdle = (fn: () => void, delayMs: number) => {
    setTimeout(() => {
      if (typeof navigator !== 'undefined' && !navigator.onLine) return;
      if (typeof (window as any).requestIdleCallback === 'function') {
        (window as any).requestIdleCallback(fn, { timeout: 3000 });
      } else {
        setTimeout(fn, 50);
      }
    }, delayMs);
  };

  // Phase 1: Lightweight core navigation views after 3.5s
  scheduleIdle(() => {
    prefetchView('other');
    prefetchView('salat_time');
    prefetchView('aamal_tracker');
  }, 3500);

  // Phase 2: Core Islamic reading views (Quran, Hadith, Settings) after 7s
  scheduleIdle(() => {
    prefetchView('hadith');
    prefetchView('quran');
    prefetchView('settings');
  }, 7000);
}

