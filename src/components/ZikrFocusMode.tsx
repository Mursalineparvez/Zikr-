import React, { useState } from 'react';
import { ZikrItem, ThemeMode, ZikrLanguage } from '../types';
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
  onClose,
  themeMode = 'night',
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
  const totalCount = zikrs.reduce((acc, z) => acc + z.count, 0);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden select-none ${isDay ? 'bg-slate-100/95 backdrop-blur-md' : 'bg-[#05181D]/98 backdrop-blur-xl'}`}>
      
      {/* Phone/Tab Sized Immersive Container */}
      <div className={`relative w-full h-full max-w-lg flex flex-col shadow-2xl ${isDay ? 'bg-white text-slate-900' : 'bg-[#0A262C] text-white'}`}>
        
        {/* Header - Unified & Compact */}
        <div className="flex items-center justify-between p-4 pt-6">
            <button 
                onClick={() => !isLocked && onClose()} 
                className={`p-3 rounded-2xl active:scale-90 transition-all ${isDay ? 'bg-slate-100 text-slate-400' : 'bg-white/5 text-white/30'} ${isLocked ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100'}`}
                disabled={isLocked}
            >
                <X className="w-6 h-6" />
            </button>

            <div className="text-center">
                <div className={`text-[10px] font-black uppercase tracking-[0.3em] ${isDay ? 'text-slate-300' : 'text-emerald-500/40'}`}>
                    Active Session
                </div>
                <div className="text-sm font-bold opacity-80">
                    {currentIndex + 1} of {zikrs.length}
                </div>
            </div>

            <button 
                onClick={() => setIsLocked(!isLocked)} 
                className={`p-3 rounded-2xl active:scale-90 transition-all ${isLocked ? 'bg-amber-500 text-white scale-110 shadow-lg shadow-amber-500/40' : 'bg-white/5 text-white/40'}`}
            >
                {isLocked ? <Lock className="w-6 h-6" /> : <Unlock className="w-6 h-6" />}
            </button>
        </div>

        {/* Main Content Area - Visual Impact */}
        <div 
            className="flex-1 flex flex-col items-center justify-center px-6 relative"
            onClick={() => !isLocked && onIncrement(zikr.id)}
        >
            {/* Arabic Text - Floating Style */}
            <div className="absolute top-12 left-0 right-0 text-center px-4 animate-in fade-in slide-in-from-top-4 duration-500">
                <div className={`font-arabic text-4xl sm:text-5xl font-bold leading-relaxed mb-2 ${isDay ? 'text-emerald-900' : 'text-emerald-50'}`}>
                    {zikr.arabic}
                </div>
                <div className="text-amber-500 text-sm font-black tracking-wide uppercase">
                    {zikr.pronunciationBn || zikr.name}
                </div>
            </div>

            {/* Huge Digital Counter */}
            <div className="relative flex flex-col items-center justify-center transform scale-110 sm:scale-125">
                <div className={`text-[120px] sm:text-[160px] font-black leading-none tracking-tighter drop-shadow-2xl ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {zikr.count}
                </div>
                {hasTarget && (
                    <div className="mt-4 flex flex-col items-center gap-2">
                        <div className="text-xs font-black text-emerald-500/60 uppercase tracking-widest">
                            Goal Progress
                        </div>
                        <div className="w-48 h-2 rounded-full bg-white/5 overflow-hidden border border-white/5 shadow-inner">
                            <div 
                                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-500 rounded-full" 
                                style={{ width: `${Math.min(100, (zikr.count / target) * 100)}%` }}
                            />
                        </div>
                        <div className="text-sm font-bold text-emerald-500">
                            {zikr.count} / {target}
                        </div>
                    </div>
                )}
            </div>

            {/* Swipe Instruction (Hidden when locked) */}
            {!isLocked && (
                <div className="absolute bottom-10 flex items-center gap-2 opacity-20 text-[10px] font-bold uppercase tracking-widest">
                    <ChevronLeft className="w-3 h-3" />
                    <span>Swipe or Tap Arrows</span>
                    <ChevronRight className="w-3 h-3" />
                </div>
            )}
        </div>

        {/* Dynamic Footer Section */}
        <div className={`p-6 pb-10 ${isDay ? 'bg-slate-50/50' : 'bg-black/20'}`}>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Total Zikr</div>
                    <div className={`text-2xl font-black ${isDay ? 'text-slate-800' : 'text-white'}`}>
                        {totalCount.toLocaleString()}
                    </div>
                </div>
                
                <div className="flex items-center gap-2">
                    {zikrs.length <= 10 && zikrs.map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-emerald-500 w-4' : 'bg-white/10'}`} />
                    ))}
                </div>
            </div>

            {/* Nav Buttons - Professional Desktop & Mobile Style */}
            {!isLocked && (
                <div className="flex items-center justify-between gap-4">
                    <button 
                        onClick={handlePrev} 
                        disabled={currentIndex === 0}
                        className={`flex-1 py-4 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 disabled:opacity-5 text-white font-bold flex items-center justify-center gap-2 transition-all active:scale-95`}
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span>Prev</span>
                    </button>
                    <button 
                        onClick={handleNext} 
                        disabled={currentIndex === zikrs.length - 1}
                        className={`flex-1 py-4 rounded-3xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-5 text-white font-bold flex items-center justify-center gap-2 shadow-xl shadow-emerald-900/40 transition-all active:scale-95`}
                    >
                        <span>Next</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
