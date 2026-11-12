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
  | 'history_timeline'
  | 'arabian_map'
  | 'arober_gotro'
  | 'dua'
  | 'hadith'
  | 'kitab'
  | 'hajj_checklist'
  | 'tablig'
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
  history_timeline: () => import('../components/HistoryTimelineView'),
  arabian_map: () => import('../components/ArabianIllustratedMapView'),
  arober_gotro: () => import('../components/AraberGotroByaktittoView'),
  dua: () => import('../components/DuaView'),
  hadith: () => import('../components/HadithView'),
  kitab: () => import('../components/KitabView'),
  hajj_checklist: () => import('../components/HajjUmrahView'),
  tablig: () => import('../components/DailyTabligView'),
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
  // If user has data saver on, do not prefetch in background
  if ((navigator as any).connection?.saveData) {
    return;
  }

  const scheduleIdle = (fn: () => void, delayMs: number) => {
    setTimeout(() => {
      if (typeof (window as any).requestIdleCallback === 'function') {
        (window as any).requestIdleCallback(fn, { timeout: 3000 });
      } else {
        setTimeout(fn, 50);
      }
    }, delayMs);
  };

  // Phase 1: High-priority core navigation pages (Quran, Salat, Aamal, Other Hub) after 4.5 seconds
  scheduleIdle(() => {
    prefetchView('quran');
    prefetchView('salat_time');
    prefetchView('aamal_tracker');
    prefetchView('other');
  }, 4500);

  // Phase 2: High-traffic Other Hub modules (Sahaba, Wars, Dua, Hadith) after 9 seconds
  scheduleIdle(() => {
    prefetchView('hayatus_sahaba');
    prefetchView('islamic_history_wars');
    prefetchView('dua');
    prefetchView('hadith');
  }, 9000);

  // Phase 3: Secondary modules and modals after 16 seconds
  scheduleIdle(() => {
    prefetchView('kitab');
    prefetchView('tablig');
    prefetchView('allah_names');
    prefetchView('hajj_checklist');
    prefetchView('history_timeline');
    prefetchView('settings');
    prefetchView('zikr_modal');
  }, 16000);
}

