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
  | 'history_timeline'
  | 'arabian_map'
  | 'dua'
  | 'hadith'
  | 'kitab'
  | 'hajj_checklist'
  | 'tablig'
  | 'allah_names'
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
  history_timeline: () => import('../components/HistoryTimelineView'),
  arabian_map: () => import('../components/ArabianIllustratedMapView'),
  dua: () => import('../components/DuaView'),
  hadith: () => import('../components/HadithView'),
  kitab: () => import('../components/KitabView'),
  hajj_checklist: () => import('../components/HajjUmrahView'),
  tablig: () => import('../components/DailyTabligView'),
  allah_names: () => import('../components/AllahNamesView'),
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
 * Gently pre-warm all views during idle time after app startup
 */
export function warmupViewsIdle(): void {
  const scheduleIdle = (fn: () => void, timeout = 1000) => {
    if (typeof (window as any).requestIdleCallback === 'function') {
      (window as any).requestIdleCallback(fn, { timeout });
    } else {
      setTimeout(fn, Math.min(timeout, 350));
    }
  };

  // Phase 1: High-priority core navigation pages (Quran, Salat, Aamal, Other Hub)
  scheduleIdle(() => {
    prefetchView('quran');
    prefetchView('salat_time');
    prefetchView('aamal_tracker');
    prefetchView('other');
  }, 400);

  // Phase 2: High-traffic Other Hub modules (Sahaba, Wars, Dua, Hadith)
  scheduleIdle(() => {
    prefetchView('hayatus_sahaba');
    prefetchView('islamic_history_wars');
    prefetchView('dua');
    prefetchView('hadith');
  }, 1200);

  // Phase 3: Secondary modules and modals (Kitab, Tablig, Hajj, Names, Maps)
  scheduleIdle(() => {
    prefetchView('kitab');
    prefetchView('tablig');
    prefetchView('allah_names');
    prefetchView('hajj_checklist');
    prefetchView('history_timeline');
    prefetchView('arabian_map');
    prefetchView('settings');
    prefetchView('zikr_modal');
    prefetchView('profile_modal');
  }, 2200);
}
