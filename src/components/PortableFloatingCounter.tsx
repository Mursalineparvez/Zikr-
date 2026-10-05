import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronUp, Move, Maximize2, Minimize2 } from 'lucide-react';
import { ThemeMode, ZikrLanguage } from '../types';
import { ZIKIR_UI } from '../utils/appTranslations';

interface PortableFloatingCounterProps {
  masterTotal: number;
  dailyTotal?: number;
  completedGoals?: number;
  isVisible: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  onScrollToTop: () => void;
}

export const PortableFloatingCounter: React.FC<PortableFloatingCounterProps> = ({
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
    const maxX = window.innerWidth - width - 8;
    const maxY = window.innerHeight - height - 70; // Avoid overlapping bottom nav
    return {
      x: Math.min(Math.max(8, x), Math.max(8, maxX)),
      y: Math.min(Math.max(60, y), Math.max(60, maxY)),
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

  return (
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
          className="absolute -top-4 left-1/2 -translate-x-1/2 font-black text-base sm:text-lg text-emerald-400 dark:text-emerald-300 drop-shadow-[0_2px_8px_rgba(16,185,129,0.8)] pointer-events-none z-50 animate-out fade-out slide-out-to-top duration-700"
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
            : 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
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
            ? 'scale-115 ring-8 ring-emerald-400/50 shadow-[0_0_35px_rgba(16,185,129,0.6)]'
            : 'scale-100 ring-2 ring-emerald-500/30 hover:scale-105'
        } ${
          isDay
            ? 'bg-gradient-to-tr from-[#005a3e] via-[#247b82] to-[#3aa2aa] border-white shadow-teal-900/40'
            : 'bg-gradient-to-tr from-[#062024] via-[#103d45] to-[#10b981] border-[#10b981]/60 shadow-black/90'
        }`}
      >
        {/* Inner Circle Dial */}
        <div
          className={`w-full h-full rounded-full flex flex-col items-center justify-center p-2 relative shadow-inner overflow-hidden transition-transform duration-200 ${
            isPopping ? 'scale-[1.03]' : 'scale-100'
          } ${
            isDay
              ? 'bg-[#edf5f4] text-[#103e42] border border-white'
              : 'bg-gradient-to-b from-[#092226] via-[#0d2d33] to-[#092226] text-white border border-[#1a4a52]'
          }`}
        >
          {/* Outer Dashed Bead Ring */}
          <div
            className={`absolute inset-1.5 border border-dashed rounded-full pointer-events-none ${
              isDay ? 'border-teal-500/30' : 'border-teal-300/30'
            }`}
          />

          {/* Top Label */}
          <div className="flex items-center gap-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-0.5 z-10">
            <Sparkles className="w-2.5 h-2.5 text-amber-400 animate-pulse" />
            <span>{isExpanded ? ZIKIR_UI.masterTasbeehCount[selectedLanguage] : 'TOTAL'}</span>
          </div>

          {/* Giant Live Digits */}
          <div
            className={`font-black font-mono tracking-tight leading-none drop-shadow-md select-none transition-all duration-150 z-10 ${
              isExpanded
                ? 'text-2xl sm:text-3xl my-1'
                : 'text-xl sm:text-2xl'
            } ${
              isPopping ? 'scale-120 text-emerald-500' : isDay ? 'text-[#103e42]' : 'text-white'
            }`}
          >
            {masterTotal.toLocaleString()}
          </div>

          {/* Expanded extra details */}
          {isExpanded ? (
            <div className="flex flex-col items-center gap-0.5 text-[9px] font-semibold text-teal-600 dark:text-emerald-300 z-10">
              <span className="font-mono text-emerald-500 font-bold">
                আজকের: {dailyTotal.toLocaleString()}
              </span>
              <span className="text-amber-500 text-[8px]">
                {completedGoals} {ZIKIR_UI.goalsMet[selectedLanguage]}
              </span>
            </div>
          ) : (
            <div className="text-[8px] sm:text-[9px] font-semibold flex items-center gap-0.5 text-teal-600 dark:text-emerald-300/80 z-10">
              <ChevronUp className="w-2.5 h-2.5" />
              <span>Top</span>
            </div>
          )}

          {/* Expand/Collapse Toggle Icon Button */}
          <button
            type="button"
            onClick={toggleExpand}
            className={`absolute bottom-1 right-1 p-1 rounded-full text-slate-400 hover:text-emerald-400 z-20 cursor-pointer transition ${
              isDay ? 'hover:bg-teal-100' : 'hover:bg-teal-900/60'
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
    </div>
  );
};
