/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useId, useRef } from 'react';

interface BackLayerEntry {
  id: string;
  onClose: () => void;
}

const APP_SESSION_KEY = '__zikrAppStep';

let isInitialized = false;
let stepCounter = 0;
let appHistoryDepth = 0;

const layerStack: BackLayerEntry[] = [];
const closedByPopIds = new Set<string>();
const pendingCleanupIds = new Set<string>();
let cleanupMicrotaskScheduled = false;

const getCurrentState = (): Record<string, any> => {
  if (typeof window === 'undefined') return {};
  const st = window.history.state;
  return st && typeof st === 'object' ? { ...st } : {};
};

const getStateLayerIds = (state: any): string[] => {
  if (state && Array.isArray(state.__layerIds)) {
    return state.__layerIds.filter((x: unknown): x is string => typeof x === 'string');
  }
  return [];
};

const flushPendingCleanups = () => {
  cleanupMicrotaskScheduled = false;
  if (pendingCleanupIds.size === 0) return;

  const toRemoveSet = new Set(pendingCleanupIds);
  pendingCleanupIds.clear();

  for (const id of toRemoveSet) {
    const idx = layerStack.findIndex((entry) => entry.id === id);
    if (idx !== -1) {
      layerStack.splice(idx, 1);
    }
  }

  // Only pop history entries for layers that are contiguously at the TOP of history.state.__layerIds
  // and were NOT already popped by a browser popstate event.
  const currentIds = getStateLayerIds(window.history.state);
  let programmaticPopCount = 0;

  for (let i = currentIds.length - 1; i >= 0; i--) {
    const id = currentIds[i];
    if (!toRemoveSet.has(id)) break;
    if (closedByPopIds.has(id)) {
      closedByPopIds.delete(id);
      break;
    }
    programmaticPopCount += 1;
  }

  for (const id of toRemoveSet) {
    closedByPopIds.delete(id);
  }

  if (programmaticPopCount > 0 && typeof window !== 'undefined') {
    try {
      window.history.go(-programmaticPopCount);
    } catch {}
  }
};

const ensureInitialized = () => {
  if (isInitialized || typeof window === 'undefined') return;
  isInitialized = true;

  const initState = getCurrentState();
  if (typeof initState[APP_SESSION_KEY] !== 'number') {
    try {
      window.history.replaceState(
        {
          appModule: 'zikir_counter',
          ...initState,
          [APP_SESSION_KEY]: 0,
        },
        ''
      );
    } catch {}
  } else {
    stepCounter = initState[APP_SESSION_KEY];
  }

  // Global LIFO popstate coordinator for all registered sub-pages, drawers, readers & modals
  window.addEventListener('popstate', (event: PopStateEvent) => {
    const state = event.state;
    if (state && typeof state[APP_SESSION_KEY] === 'number') {
      appHistoryDepth = Math.max(0, state[APP_SESSION_KEY]);
    } else {
      appHistoryDepth = Math.max(0, appHistoryDepth - 1);
    }

    const activeStateLayerIds = new Set(getStateLayerIds(state));

    // Close any layers that were popped off the browser history stack, top-down (LIFO)
    const poppedEntries: BackLayerEntry[] = [];
    for (let i = layerStack.length - 1; i >= 0; i--) {
      const entry = layerStack[i];
      if (!activeStateLayerIds.has(entry.id)) {
        layerStack.splice(i, 1);
        closedByPopIds.add(entry.id);
        poppedEntries.push(entry);
      }
    }

    for (const entry of poppedEntries) {
      try {
        entry.onClose();
      } catch {}
    }

    // Safety cleanup of closedByPopIds after React commits
    if (poppedEntries.length > 0) {
      setTimeout(() => {
        poppedEntries.forEach((e) => closedByPopIds.delete(e.id));
      }, 150);
    }
  });

  // Global Escape key pops ONLY the topmost open layer step-by-step
  window.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    if (layerStack.length === 0) return;
    const tag = (e.target as HTMLElement | null)?.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    e.preventDefault();
    try {
      window.history.back();
    } catch {
      const top = layerStack[layerStack.length - 1];
      top?.onClose();
    }
  });
};

/**
 * Push a top-level or sub-section app route into browser history while tracking step depth
 * and clearing stale child overlay layer IDs that belong to the previous route.
 */
export const pushAppHistoryState = (nextState: Record<string, any>): void => {
  if (typeof window === 'undefined') return;
  ensureInitialized();
  stepCounter += 1;
  appHistoryDepth = stepCounter;
  try {
    window.history.pushState(
      {
        ...nextState,
        [APP_SESSION_KEY]: stepCounter,
      },
      ''
    );
  } catch {}
};

/**
 * Step back exactly one level in the user's navigation history.
 * Uses browser history when the app has pushed steps so hardware back & in-app back
 * always stay 100% synchronized in exact reverse order.
 */
export const stepBackOr = (fallback: () => void): void => {
  if (typeof window === 'undefined') {
    fallback();
    return;
  }
  ensureInitialized();
  const state = getCurrentState();
  const currentStep = typeof state[APP_SESSION_KEY] === 'number' ? state[APP_SESSION_KEY] : 0;
  const currentLayers = getStateLayerIds(state);

  if (currentLayers.length > 0 || currentStep > 0 || appHistoryDepth > 0) {
    try {
      window.history.back();
      return;
    } catch {}
  }
  fallback();
};

/**
 * Check if any overlay/sub-view layer is currently registered on top of the active route.
 */
export const hasActiveBackLayers = (): boolean => layerStack.length > 0;

/**
 * Register a sub-view, reader, drawer, or modal as a step in the browser & hardware Back stack.
 * When `isOpen` becomes true, a history step preserving the parent route state is pushed.
 * Pressing Back (phone button, swipe-back, browser Back, Escape, or `stepBackOr`) closes ONLY
 * the topmost layer in exact LIFO reverse order without exiting the parent page.
 */
export const useBackLayer = (
  isOpen: boolean,
  onClose: () => void,
  label = 'layer'
): void => {
  const reactId = useId();
  const layerId = `${label}:${reactId}`;
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;
    ensureInitialized();

    // StrictMode / rapid re-open: cancel pending cleanup and keep existing history entry
    if (pendingCleanupIds.has(layerId)) {
      pendingCleanupIds.delete(layerId);
      const existing = layerStack.find((e) => e.id === layerId);
      if (existing) {
        existing.onClose = () => onCloseRef.current();
        return;
      }
    }

    closedByPopIds.delete(layerId);

    const existingIdx = layerStack.findIndex((e) => e.id === layerId);
    if (existingIdx === -1) {
      layerStack.push({
        id: layerId,
        onClose: () => onCloseRef.current(),
      });

      const prevState = getCurrentState();
      const prevLayerIds = getStateLayerIds(prevState);
      if (!prevLayerIds.includes(layerId)) {
        stepCounter += 1;
        appHistoryDepth = stepCounter;
        try {
          window.history.pushState(
            {
              ...prevState,
              __layerIds: [...prevLayerIds, layerId],
              [APP_SESSION_KEY]: stepCounter,
            },
            ''
          );
        } catch {}
      }
    } else {
      layerStack[existingIdx].onClose = () => onCloseRef.current();
    }

    return () => {
      pendingCleanupIds.add(layerId);
      if (!cleanupMicrotaskScheduled) {
        cleanupMicrotaskScheduled = true;
        queueMicrotask(flushPendingCleanups);
      }
    };
  }, [isOpen, layerId]);
};
