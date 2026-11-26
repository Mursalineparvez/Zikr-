import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Sparkles, ChevronUp, Move, Maximize2, Minimize2 } from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { ZIKIR_UI } from '../utils/zikirTranslations';

interface PortableFloatingCounterProps {
  masterTotal: number;
  dailyTotal?: number;
  completedGoals?: number;
  isVisible: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  onScrollToTop: () => void;
}

export const PortableFloatingCounter: React.FC<PortableFloatingCounterProps> = React.memo(({
  masterTotal,
  dailyTotal = 0,
  completedGoals = 0,
  isVisible,
  themeMode = 'night',
  selectedLanguage = 'bn',
  onScrollToTop,
}) => {
  const isDay = themeMode === 'day';

  // Position state (persisted in localStorage)
  const [position, setPosition] = useState<{ x: number; y: number }>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_portable_pos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
          return parsed;
        }
      }
    } catch {}
    // Default position: bottom right above bottom navigation bar
    const defaultX = typeof window !== 'undefined' ? Math.max(16, window.innerWidth - 110) : 260;
    const defaultY = typeof window !== 'undefined' ? Math.max(100, window.innerHeight - 190) : 500;
    return { x: defaultX, y: defaultY };
  });

  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    try {
      return localStorage.getItem('zikrmate_portable_expanded') === 'true';
    } catch {
      return false;
    }
  });

  const [isDragging, setIsDragging] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [particles, setParticles] = useState<{ id: number; text: string }[]>([]);
  const prevCountRef = useRef(masterTotal);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    elemX: number;
    elemY: number;
    hasMoved: boolean;
  }>({
    startX: 0,
    startY: 0,
    elemX: 0,
    elemY: 0,
    hasMoved: false,
  });

  // Clamping helper within screen viewport
  const clampPosition = (x: number, y: number, expanded: boolean) => {
    if (typeof window === 'undefined') return { x, y };
    const width = expanded ? 160 : 96;
    const height = expanded ? 160 : 96;
    const maxX = Math.max(8, window.innerWidth - width - 12);
    const maxY = Math.max(60, window.innerHeight - height - 75); // Avoid overlapping bottom nav
    const safeX = typeof x === 'number' && Number.isFinite(x) ? x : maxX;
    const safeY = typeof y === 'number' && Number.isFinite(y) ? y : maxY;
    return {
      x: Math.min(Math.max(8, safeX), maxX),
      y: Math.min(Math.max(60, safeY), maxY),
    };
  };

  // Adjust on screen resize and initial mount
  useEffect(() => {
    setPosition((prev) => clampPosition(prev.x, prev.y, isExpanded));
    const handleResize = () => {
      setPosition((prev) => clampPosition(prev.x, prev.y, isExpanded));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isExpanded]);

  // Pop-up trigger when masterTotal increments
  useEffect(() => {
    if (masterTotal > prevCountRef.current) {
      setIsPopping(true);
      const newId = Date.now();
      setParticles((prev) => [...prev.slice(-3), { id: newId, text: '+1' }]);

      const timer = setTimeout(() => setIsPopping(false), 380);
      const partTimer = setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newId));
      }, 750);

      prevCountRef.current = masterTotal;
      return () => {
        clearTimeout(timer);
        clearTimeout(partTimer);
      };
    }
    prevCountRef.current = masterTotal;
  }, [masterTotal]);

  // Touch Drag Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    dragRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      elemX: position.x,
      elemY: position.y,
      hasMoved: false,
    };
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragRef.current.startX;
    const dy = touch.clientY - dragRef.current.startY;

    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      dragRef.current.hasMoved = true;
    }

    const nextPos = clampPosition(
      dragRef.current.elemX + dx,
      dragRef.current.elemY + dy,
      isExpanded
    );
    setPosition(nextPos);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    try {
      localStorage.setItem('zikrmate_portable_pos', JSON.stringify(position));
    } catch {}
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      elemX: position.x,
      elemY: position.y,
      hasMoved: false,
    };
    setIsDragging(true);

    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - dragRef.current.startX;
      const dy = moveEvent.clientY - dragRef.current.startY;

      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        dragRef.current.hasMoved = true;
      }

      const nextPos = clampPosition(
        dragRef.current.elemX + dx,
        dragRef.current.elemY + dy,
        isExpanded
      );
      setPosition(nextPos);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      try {
        localStorage.setItem('zikrmate_portable_pos', JSON.stringify(position));
      } catch {}
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleClick = (e: React.MouseEvent) => {
    // If it was a drag, don't trigger click action
    if (dragRef.current.hasMoved) {
      e.stopPropagation();
      return;
    }
    onScrollToTop();
  };

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isExpanded;
    setIsExpanded(next);
    try {
      localStorage.setItem('zikrmate_portable_expanded', String(next));
    } catch {}
    setPosition((prev) => clampPosition(prev.x, prev.y, next));
  };

  if (!isVisible) return null;
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      className={`fixed z-[60] touch-none select-none transition-shadow duration-200 cursor-grab active:cursor-grabbing animate-in fade-in zoom-in-95 ${
        isDragging ? 'scale-105 opacity-95 shadow-2xl' : 'opacity-100'
      }`}
    >
      {/* Floating "+1" bubbles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute -top-4 left-1/2 -translate-x-1/2 font-black text-base sm:text-lg text-[var(--app-primary-mid,#10b981)] dark:text-[var(--app-primary-light,#6ee7b7)] drop-shadow-sm pointer-events-none z-50 animate-out fade-out slide-out-to-top duration-700"
        >
          {p.text}
        </span>
      ))}

      {/* Drag handle tooltip indicator */}
      <div
        className={`absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md pointer-events-none transition-opacity ${
          isDragging ? 'opacity-100' : 'opacity-70 hover:opacity-100'
        } ${
          isDay
            ? 'bg-slate-800 text-white border border-slate-700'
            : 'bg-[var(--app-dark-surface,#062024)] text-[var(--app-primary-light,#6ee7b7)] border border-[var(--app-dark-border,#184850)]'
        }`}
      >
        <Move className="w-2.5 h-2.5" />
        <span>Drag</span>
      </div>

      {/* MAIN PORTABLE CIRCULAR DIAL */}
      <div
        onClick={handleClick}
        className={`relative rounded-full transition-all duration-300 ease-out shadow-2xl flex items-center justify-center border ${
          isExpanded
            ? 'w-36 h-36 sm:w-40 sm:h-40 p-2.5'
            : 'w-24 h-24 sm:w-28 sm:h-28 p-1.5'
        } ${
          isPopping
            ? 'scale-115 ring-8 ring-[var(--app-primary-mid,#10b981)]/45 shadow-2xl'
            : 'scale-100 ring-2 ring-[var(--app-primary-mid,#10b981)]/30 hover:scale-105'
        } ${
          isDay
            ? 'bg-gradient-to-tr from-[var(--app-primary-dark,#00523c)] via-[var(--app-primary,#006A4E)] to-[var(--app-primary-mid,#059669)] border-white shadow-lg'
            : 'bg-gradient-to-tr from-[var(--app-dark-canvas,#03171b)] via-[var(--app-dark-surface-soft,#0c3138)] to-[var(--app-primary-mid,#10b981)] border-[var(--app-primary-mid,#10b981)]/60 shadow-black/90'
        }`}
      >
        {/* Inner Circle Dial */}
        <div
          className={`w-full h-full rounded-full flex flex-col items-center justify-center p-2 relative shadow-inner overflow-hidden transition-transform duration-200 ${
            isPopping ? 'scale-[1.03]' : 'scale-100'
          } ${
            isDay
              ? 'bg-[var(--app-surface-soft,#e9f6ef)] text-[var(--app-ink,#0d2e24)] border border-white'
              : 'bg-gradient-to-b from-[var(--app-dark-surface,#062024)] via-[var(--app-dark-surface-soft,#0c3138)] to-[var(--app-dark-surface,#062024)] text-white border border-[var(--app-dark-border,#184850)]'
          }`}
        >
          {/* Outer Dashed Bead Ring */}
          <div
            className={`absolute inset-1.5 border border-dashed rounded-full pointer-events-none ${
              isDay ? 'border-[var(--app-primary,#006A4E)]/30' : 'border-[var(--app-primary-light,#6ee7b7)]/30'
            }`}
          />

          {/* Top Label */}
          <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[var(--app-primary,#006A4E)] dark:text-[var(--app-primary-light,#6ee7b7)] mb-0.5 z-10">
            <Sparkles className="w-2.5 h-2.5 text-amber-400" />
            <span>{isExpanded ? ZIKIR_UI.masterTasbeehCount[selectedLanguage] : 'TOTAL'}</span>
          </div>

          {/* Giant Live Digits */}
          <div
            className={`font-black font-mono tracking-tight leading-none drop-shadow-md select-none transition-all duration-150 z-10 ${
              isExpanded
                ? 'text-2xl sm:text-3xl my-1'
                : 'text-xl sm:text-2xl'
            } ${
              isPopping ? 'scale-120 text-[var(--app-primary,#006A4E)] dark:text-[var(--app-primary-light,#6ee7b7)]' : isDay ? 'text-[var(--app-ink,#0d2e24)]' : 'text-white'
            }`}
          >
            {masterTotal.toLocaleString()}
          </div>

          {/* Expanded extra details */}
          {isExpanded ? (
            <div className="flex flex-col items-center gap-0.5 text-[9px] font-semibold text-[var(--app-primary,#006A4E)] dark:text-[var(--app-primary-light,#6ee7b7)] z-10">
              <span className="font-mono font-bold">
                {selectedLanguage === 'bn' ? 'আজকের:' : selectedLanguage === 'ar' ? 'اليوم:' : 'Today:'} {dailyTotal.toLocaleString()}
              </span>
              <span className="text-amber-500 text-[8px]">
                {completedGoals} {ZIKIR_UI.goalsMet[selectedLanguage]}
              </span>
            </div>
          ) : (
            <div className="text-[8px] sm:text-[9px] font-semibold flex items-center gap-0.5 text-[var(--app-primary,#006A4E)] dark:text-[var(--app-primary-light,#6ee7b7)]/85 z-10">
              <ChevronUp className="w-2.5 h-2.5" />
              <span>{selectedLanguage === 'bn' ? 'উপরে' : selectedLanguage === 'ar' ? 'أعلى' : 'Top'}</span>
            </div>
          )}

          {/* Expand/Collapse Toggle Icon Button */}
          <button
            type="button"
            onClick={toggleExpand}
            className={`absolute bottom-1 right-1 p-1 rounded-full text-slate-400 hover:text-[var(--app-primary,#006A4E)] dark:hover:text-[var(--app-primary-light,#6ee7b7)] z-20 cursor-pointer transition ${
              isDay ? 'hover:bg-[var(--app-surface-tray,#dff2e8)]' : 'hover:bg-[var(--app-dark-border,#184850)]'
            }`}
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <Minimize2 className="w-3 h-3" />
            ) : (
              <Maximize2 className="w-3 h-3" />
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
});
