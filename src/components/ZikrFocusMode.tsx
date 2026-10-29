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
      <div className="flex items-center justify-between p-6">
        <button 
          onClick={() => !isLocked && onClose()} 
          className={`p-3 rounded-2xl ${isDay ? 'bg-slate-100 text-slate-700' : 'bg-[#0E353C] text-slate-300'}`}
          disabled={isLocked}
        >
          <X className="w-6 h-6" />
        </button>
        <div className={`text-sm font-bold tracking-widest uppercase ${isDay ? 'text-slate-500' : 'text-emerald-400'}`}>
          Focus Mode
        </div>
        <button 
          onClick={() => setIsLocked(!isLocked)} 
          className={`p-3 rounded-2xl transition-all ${isLocked ? 'bg-amber-500/20 text-amber-500' : 'bg-[#0E353C] text-slate-400'}`}
        >
          {isLocked ? <Lock className="w-6 h-6" /> : <Unlock className="w-6 h-6" />}
        </button>
      </div>

      {/* Main Zikr Display */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-12" onClick={() => !isLocked && onIncrement(zikr.id)}>
          <div className="text-center space-y-4">
              <div className={`font-arabic text-4xl sm:text-5xl font-bold leading-tight ${isDay ? 'text-[#064e3b]' : 'text-emerald-100'}`}>
                  {zikr.arabic}
              </div>
              <div className="text-xl font-semibold text-amber-500">
                  {zikr.pronunciationBn || zikr.name}
              </div>
          </div>
          
          <div className="relative flex items-center justify-center">
             <div className="text-[120px] font-black text-white drop-shadow-lg leading-none">
                 {zikr.count}
             </div>
             {hasTarget && (
                 <div className="absolute -bottom-6 text-2xl font-bold text-emerald-500">
                     / {target}
                 </div>
             )}
          </div>
      </div>

      {/* Bottom Control Area */}
      <div className="p-8 pb-12">
          <div className={`text-center text-sm font-bold mb-8 uppercase tracking-tighter ${isDay ? 'text-slate-500' : 'text-emerald-600'}`}>
              Total Zikr: {zikrs.reduce((acc, z) => acc + z.count, 0)}
          </div>
          
          {!isLocked && (
              <div className="flex items-center justify-between gap-6">
                  <button onClick={handlePrev} disabled={currentIndex === 0} className="p-6 rounded-3xl bg-[#0E353C] disabled:opacity-30 text-white shadow-xl">
                      <ChevronLeft className="w-10 h-10" />
                  </button>
                  <div className={`text-lg font-bold ${isDay ? 'text-slate-700' : 'text-slate-300'}`}>
                    {currentIndex + 1} / {zikrs.length}
                  </div>
                  <button onClick={handleNext} disabled={currentIndex === zikrs.length - 1} className="p-6 rounded-3xl bg-[#0E353C] disabled:opacity-30 text-white shadow-xl">
                      <ChevronRight className="w-10 h-10" />
                  </button>
              </div>
          )}
      </div>
    </div>
  );
};
