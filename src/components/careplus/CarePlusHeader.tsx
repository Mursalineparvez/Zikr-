import React from 'react';
import { Bell, Heart, Plus, Sparkles } from 'lucide-react';

interface CarePlusHeaderProps {
  unreadNotifsCount: number;
  onOpenNotifications: () => void;
  onToggleTasbeehMode?: () => void;
  isTasbeehMode?: boolean;
}

export const CarePlusHeader: React.FC<CarePlusHeaderProps> = ({
  unreadNotifsCount,
  onOpenNotifications,
  onToggleTasbeehMode,
  isTasbeehMode = false,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100/80 px-4 py-3 transition-colors">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {/* Left: Brand Identity matching the screenshot */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#007e8a] flex items-center justify-center shadow-sm shadow-teal-700/20 text-white relative">
            <Heart className="w-5 h-5 fill-white stroke-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Plus className="w-3.5 h-3.5 text-[#007e8a] stroke-[3.5]" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-1.5 leading-none">
              Care<span className="text-[#007e8a]">Plus</span>
            </h1>
            <p className="text-[11px] font-medium text-slate-400 tracking-wide mt-1">
              Your Health. Our Care
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Dual Mode Switcher (Allows seamless switching to user's previous Islamic Tasbeeh features) */}
          {onToggleTasbeehMode && (
            <button
              onClick={onToggleTasbeehMode}
              title={isTasbeehMode ? "Switch to CarePlus" : "Switch to Islamic Hub & Tasbeeh"}
              className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-full bg-teal-50 text-[#007e8a] border border-teal-200/50 hover:bg-teal-100 transition active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isTasbeehMode ? 'CarePlus' : 'তাসবীহ'}</span>
            </button>
          )}

          {/* Notification Bell matching screenshot */}
          <button
            onClick={onOpenNotifications}
            aria-label="View notifications"
            className="relative w-10 h-10 rounded-full border border-slate-200/70 hover:border-teal-300 flex items-center justify-center text-slate-700 hover:text-[#007e8a] hover:bg-teal-50/50 transition active:scale-95"
          >
            <Bell className="w-5 h-5" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
