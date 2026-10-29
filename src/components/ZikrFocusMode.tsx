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

  return (
    <div className={`fixed inset-0 z-[100] ${isDay ? 'bg-slate-50' : 'bg-[#06171c]'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button 
          onClick={() => !isLocked && onClose()} 
          className={`p-2 rounded-full ${isDay ? 'bg-slate-200' : 'bg-slate-800'}`}
          disabled={isLocked}
        >
          <X className={`w-6 h-6 ${isDay ? 'text-slate-700' : 'text-slate-300'}`} />
        </button>
        <div className={`text-sm font-bold ${isDay ? 'text-slate-700' : 'text-slate-300'}`}>
          {currentIndex + 1} / {zikrs.length}
        </div>
        <button 
          onClick={() => setIsLocked(!isLocked)} 
          className={`p-2 rounded-full ${isLocked ? 'bg-amber-500/20' : 'bg-slate-200/20'}`}
        >
          {isLocked ? <Lock className="w-6 h-6 text-amber-500" /> : <Unlock className="w-6 h-6 text-slate-400" />}
        </button>
      </div>

      {/* Carousel */}
      <div className="flex-1 flex items-center justify-center h-[70vh] overflow-hidden px-4">
        <div className="w-full max-w-sm transition-transform duration-300 ease-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            <div className="flex">
                {zikrs.map((zikr, idx) => (
                    <div key={zikr.id} className="w-full shrink-0 px-2">
                        <ZikrCard
                            zikr={zikr}
                            index={idx}
                            totalCards={zikrs.length}
                            onIncrement={onIncrement}
                            onDecrement={onDecrement}
                            onReset={onReset}
                            onDelete={() => {}}
                            onEdit={() => {}}
                            onMoveUp={() => {}}
                            onMoveDown={() => {}}
                            themeMode={themeMode}
                            selectedLanguage={selectedLanguage}
                        />
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Navigation Controls */}
      {!isLocked && (
          <div className="flex items-center justify-between px-8 py-4">
              <button onClick={handlePrev} disabled={currentIndex === 0} className="p-4 rounded-full bg-slate-800/50 disabled:opacity-30">
                  <ChevronLeft className="w-8 h-8 text-white" />
              </button>
              <button onClick={handleNext} disabled={currentIndex === zikrs.length - 1} className="p-4 rounded-full bg-slate-800/50 disabled:opacity-30">
                  <ChevronRight className="w-8 h-8 text-white" />
              </button>
          </div>
      )}
    </div>
  );
};
