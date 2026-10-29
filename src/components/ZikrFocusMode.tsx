import React, { useState, useRef } from 'react';
import { ZikrItem, ThemeMode, ZikrLanguage } from '../types';
import { ZikrCard } from './ZikrCard';
import { Lock, Unlock, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ZikrFocusModeProps {
  zikrs: ZikrItem[];
  initialIndex: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onReset: (zikr: ZikrItem) => void;
  onClose: () => void;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
}

export const ZikrFocusMode: React.FC<ZikrFocusModeProps> = ({
  zikrs,
  initialIndex,
  onIncrement,
  onDecrement,
  onReset,
  onClose,
  themeMode = 'night',
  selectedLanguage = 'bn',
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLocked, setIsLocked] = useState(false);
  const isDay = themeMode === 'day';

  const handleNext = () => {
    if (currentIndex < zikrs.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const zikr = zikrs[currentIndex];
  const hasTarget = zikr.target !== undefined && zikr.target > 0;
  const target = zikr.target || 0;

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col ${isDay ? 'bg-slate-50' : 'bg-[#0A262C]'}`}>
      {/* Sleek Header */}
      <div className="flex items-center justify-between p-4">
        <button 
          onClick={() => !isLocked && onClose()} 
          className={`p-2.5 rounded-xl ${isDay ? 'bg-slate-100 text-slate-700' : 'bg-[#0E353C] text-slate-300'}`}
          disabled={isLocked}
        >
          <X className="w-5 h-5" />
        </button>
        <div className={`text-xs font-bold tracking-widest uppercase ${isDay ? 'text-slate-500' : 'text-emerald-400'}`}>
          Focus Mode
        </div>
        <button 
          onClick={() => setIsLocked(!isLocked)} 
          className={`p-2.5 rounded-xl transition-all ${isLocked ? 'bg-amber-500/20 text-amber-500' : 'bg-[#0E353C] text-slate-400'}`}
        >
          {isLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
        </button>
      </div>

      {/* Main Zikr Display */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-6" onClick={() => !isLocked && onIncrement(zikr.id)}>
          <div className="text-center space-y-2">
              <div className={`font-arabic text-3xl sm:text-4xl font-bold leading-tight ${isDay ? 'text-[#064e3b]' : 'text-emerald-100'}`}>
                  {zikr.arabic}
              </div>
              <div className="text-lg font-semibold text-amber-500">
                  {zikr.pronunciationBn || zikr.name}
              </div>
          </div>
          
          <div className="relative flex items-center justify-center">
             <div className="text-7xl sm:text-8xl font-black text-white drop-shadow-lg leading-none">
                 {zikr.count}
             </div>
             {hasTarget && (
                 <div className="absolute -bottom-4 text-xl font-bold text-emerald-500">
                     / {target}
                 </div>
             )}
          </div>
      </div>

      {/* Bottom Control Area */}
      <div className="p-4 pb-8">
          <div className={`text-center text-xs font-bold mb-6 uppercase tracking-tighter ${isDay ? 'text-slate-500' : 'text-emerald-600'}`}>
              Total Zikr: {zikrs.reduce((acc, z) => acc + z.count, 0)}
          </div>
          
          {!isLocked && (
              <div className="flex items-center justify-between gap-4">
                  <button onClick={handlePrev} disabled={currentIndex === 0} className="p-4 rounded-2xl bg-[#0E353C] disabled:opacity-30 text-white shadow-lg">
                      <ChevronLeft className="w-7 h-7" />
                  </button>
                  <div className={`text-base font-bold ${isDay ? 'text-slate-700' : 'text-slate-300'}`}>
                    {currentIndex + 1} / {zikrs.length}
                  </div>
                  <button onClick={handleNext} disabled={currentIndex === zikrs.length - 1} className="p-4 rounded-2xl bg-[#0E353C] disabled:opacity-30 text-white shadow-lg">
                      <ChevronRight className="w-7 h-7" />
                  </button>
              </div>
          )}
      </div>
    </div>
  );
};
