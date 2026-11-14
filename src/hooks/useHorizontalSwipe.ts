import React, { useRef, useState, useCallback } from 'react';

interface UseHorizontalSwipeOptions {
  enabled?: boolean;
  canSwipeLeft?: boolean;
  canSwipeRight?: boolean;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  triggerThreshold?: number;
}

export interface UseHorizontalSwipeReturn {
  touchHandlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: (e: React.TouchEvent) => void;
    onTouchCancel: () => void;
  };
  swipeOffset: number;
  swipeDirection: 'left' | 'right' | null;
  isReadyToTrigger: boolean;
}

function isInteractiveOrScrollableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;

  if (
    target.closest(
      'input, textarea, select, [contenteditable="true"], .leaflet-container, [data-no-swipe="true"], .overflow-x-auto'
    )
  ) {
    return true;
  }

  let el: HTMLElement | null = target;
  while (el) {
    const style = window.getComputedStyle(el);
    if (
      (style.overflowX === 'auto' || style.overflowX === 'scroll') &&
      el.scrollWidth > el.clientWidth + 6
    ) {
      return true;
    }
    el = el.parentElement;
  }

  return false;
}

export function useHorizontalSwipe({
  enabled = true,
  canSwipeLeft = true,
  canSwipeRight = true,
  onSwipeLeft,
  onSwipeRight,
  triggerThreshold = 68,
}: UseHorizontalSwipeOptions): UseHorizontalSwipeReturn {
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startTimeRef = useRef(0);
  const axisLockRef = useRef<'none' | 'horizontal' | 'vertical'>('none');
  const ignoreGestureRef = useRef(false);

  const [swipeOffset, setSwipeOffset] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isReadyToTrigger, setIsReadyToTrigger] = useState(false);

  const resetSwipe = useCallback(() => {
    axisLockRef.current = 'none';
    ignoreGestureRef.current = false;
    setSwipeOffset(0);
    setSwipeDirection(null);
    setIsReadyToTrigger(false);
  }, []);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (!enabled || e.touches.length !== 1) {
        ignoreGestureRef.current = true;
        return;
      }

      if (isInteractiveOrScrollableTarget(e.target)) {
        ignoreGestureRef.current = true;
        return;
      }

      const touch = e.touches[0];
      startXRef.current = touch.clientX;
      startYRef.current = touch.clientY;
      startTimeRef.current = Date.now();
      axisLockRef.current = 'none';
      ignoreGestureRef.current = false;
    },
    [enabled]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!enabled || ignoreGestureRef.current || e.touches.length !== 1) return;

      const touch = e.touches[0];
      const dx = touch.clientX - startXRef.current;
      const dy = touch.clientY - startYRef.current;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);

      if (axisLockRef.current === 'vertical') return;

      if (axisLockRef.current === 'none') {
        // Lock to vertical scrolling as soon as vertical intent is clear
        if (absDy > 12 && absDy >= absDx * 0.85) {
          axisLockRef.current = 'vertical';
          return;
        }
        // Require strong horizontal intent before activating horizontal swipe
        if (absDx > 20 && absDx > absDy * 1.4) {
          axisLockRef.current = 'horizontal';
        } else {
          return;
        }
      }

      const dir: 'left' | 'right' = dx < 0 ? 'left' : 'right';
      const canMove = dir === 'left' ? canSwipeLeft : canSwipeRight;

      // Apply smooth resistance if hitting boundary
      const clamped = canMove
        ? Math.max(-96, Math.min(96, dx * 0.65))
        : Math.max(-24, Math.min(24, dx * 0.2));

      setSwipeDirection(dir);
      setSwipeOffset(clamped);
      setIsReadyToTrigger(canMove && absDx >= triggerThreshold);
    },
    [enabled, canSwipeLeft, canSwipeRight, triggerThreshold]
  );

  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!enabled || ignoreGestureRef.current || axisLockRef.current !== 'horizontal') {
        resetSwipe();
        return;
      }

      const touch = e.changedTouches[0];
      if (!touch) {
        resetSwipe();
        return;
      }

      const dx = touch.clientX - startXRef.current;
      const dy = touch.clientY - startYRef.current;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      const elapsed = Date.now() - startTimeRef.current;

      const isQuickFlick = elapsed < 450 && absDx >= 52 && absDx > absDy * 1.3;
      const isFullDrag = absDx >= triggerThreshold && absDx > absDy * 1.3;

      if (isQuickFlick || isFullDrag) {
        if (dx < 0 && canSwipeLeft && onSwipeLeft) {
          onSwipeLeft();
        } else if (dx > 0 && canSwipeRight && onSwipeRight) {
          onSwipeRight();
        }
      }

      resetSwipe();
    },
    [enabled, canSwipeLeft, canSwipeRight, onSwipeLeft, onSwipeRight, triggerThreshold, resetSwipe]
  );

  return {
    touchHandlers: {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
      onTouchCancel: resetSwipe,
    },
    swipeOffset,
    swipeDirection,
    isReadyToTrigger,
  };
}
