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
    <div className={`fixed inset-0 z-[100] flex items-center justify-center overflow-hidden select-none p-0 sm:p-4 ${isDay ? 'bg-slate-100/80 backdrop-blur-md' : 'bg-black/60 backdrop-blur-md'}`}>
      
      {/* Compact Device-Sized Container */}
      <div className={`relative w-full h-full sm:h-[auto] sm:max-w-[400px] sm:aspect-[9/19.5] sm:rounded-[40px] flex flex-col overflow-hidden shadow-2xl transition-all duration-500 border border-white/10 ${isDay ? 'bg-white text-slate-900' : 'bg-[#0A262C] text-white'}`}>
        
        {/* Sleek Minimal Header */}
        <div className="flex items-center justify-between px-6 pt-8 pb-4">
            <button 
                onClick={() => !isLocked && onClose()} 
                className={`w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-all ${isDay ? 'bg-slate-100 text-slate-400' : 'bg-white/5 text-white/30'} ${isLocked ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                disabled={isLocked}
            >
                <X className="w-5 h-5" />
            </button>

            <div className="text-center">
                <div className={`text-[10px] font-black uppercase tracking-[0.2em] mb-0.5 ${isDay ? 'text-slate-300' : 'text-emerald-500/50'}`}>
                    {currentIndex + 1} / {zikrs.length}
                </div>
            </div>

            <button 
                onClick={() => setIsLocked(!isLocked)} 
                className={`w-10 h-10 rounded-full flex items-center justify-center active:scale-90 transition-all ${isLocked ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/40' : 'bg-white/5 text-white/40'}`}
            >
                {isLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
            </button>
        </div>

        {/* Counter Core - Centered and Punchy */}
        <div 
            className="flex-1 flex flex-col items-center justify-center px-8 text-center"
            onClick={() => !isLocked && onIncrement(zikr.id)}
        >
            <div className={`font-arabic text-4xl sm:text-5xl font-bold leading-relaxed mb-4 animate-in fade-in duration-700 ${isDay ? 'text-emerald-950' : 'text-emerald-50'}`}>
                {zikr.arabic}
            </div>
            
            <div className="text-amber-500 text-sm font-bold tracking-wide uppercase mb-10 opacity-90">
                {zikr.pronunciationBn || zikr.name}
            </div>

            <div className="relative group">
                <div className={`text-[120px] font-black leading-none tracking-tighter transition-all duration-200 ${isDay ? 'text-slate-900' : 'text-white'} ${!isLocked ? 'group-active:scale-95 group-active:opacity-80' : ''}`}>
                    {zikr.count}
                </div>
                
                {hasTarget && (
                    <div className="mt-6 flex flex-col items-center gap-3">
                        <div className="w-40 h-1.5 rounded-full bg-white/5 overflow-hidden border border-white/5 shadow-inner">
                            <div 
                                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.4)]" 
                                style={{ width: `${Math.min(100, (zikr.count / target) * 100)}%` }}
                            />
                        </div>
                        <div className="text-xs font-black text-emerald-500/80 uppercase tracking-widest">
                            {zikr.count} / {target}
                        </div>
                    </div>
                )}
            </div>
        </div>

        {/* Bottom Bar - Stats and Actions */}
        <div className={`px-6 pt-6 pb-10 ${isDay ? 'bg-slate-50/80' : 'bg-black/20 backdrop-blur-sm'}`}>
            <div className="flex items-center justify-between mb-8 px-2">
                <div>
                    <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-0.5">Total Zikr</div>
                    <div className={`text-xl font-black ${isDay ? 'text-slate-800' : 'text-white'}`}>
                        {totalCount.toLocaleString()}
                    </div>
                </div>
                
                <div className="flex gap-1.5">
                    {zikrs.map((_, i) => {
                        if (zikrs.length > 8 && (i < currentIndex - 1 || i > currentIndex + 1) && i !== 0 && i !== zikrs.length - 1) return null;
                        return (
                            <div key={i} className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-emerald-500 w-4' : 'bg-white/10 w-1'}`} />
                        );
                    })}
                </div>
            </div>

            {!isLocked && (
                <div className="flex items-center justify-between gap-4">
                    <button 
                        onClick={handlePrev} 
                        disabled={currentIndex === 0}
                        className="flex-1 h-14 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 disabled:opacity-5 text-white/80 font-bold flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                        <ChevronLeft className="w-5 h-5" />
                        <span className="text-xs uppercase tracking-widest">Prev</span>
                    </button>
                    <button 
                        onClick={handleNext} 
                        disabled={currentIndex === zikrs.length - 1}
                        className="flex-1 h-14 rounded-2xl bg-[#006747] hover:bg-[#007a52] disabled:opacity-5 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#006747]/20 transition-all active:scale-95"
                    >
                        <span className="text-xs uppercase tracking-widest">Next</span>
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
