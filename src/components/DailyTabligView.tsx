import React, { useState } from 'react';
import { TABLIG_6_SIFATS, DAILY_TABLIG_GUIDELINES, TabligSifatItem } from '../data/tabligData';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  Sparkles,
  Award,
  BookOpen,
  Users,
  Compass,
  Heart,
  ChevronRight,
  ChevronDown,
  CheckCircle2,
  Volume2,
  Clock,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';

interface DailyTabligViewProps {
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
}

export const DailyTabligView: React.FC<DailyTabligViewProps> = ({
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
}) => {
  const isDay = themeMode === 'day';
  const [activeTab, setActiveTab] = useState<'sifat' | 'daily_amal' | 'gasht'>('sifat');
  const [expandedSifat, setExpandedSifat] = useState<string>('kalima');

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Banner */}
      <div
        className={`p-5 sm:p-6 rounded-3xl border shadow-xl ${
          isDay
            ? 'bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white border-emerald-600/40'
            : 'bg-gradient-to-r from-[#0c2f35] via-[#113f47] to-[#17525d] text-white border-[#1b5561]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-teal-100 text-xs font-semibold mb-2 backdrop-blur-md">
              <Users className="w-3.5 h-3.5 text-amber-300" />
              <span>الدَّعْوَةُ وَالتَّبْلِيغُ • Dawah, Sifat &amp; Daily Masjid Mehnat</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              দৈনিক তাবলিগ ও বয়ান (দাওয়াতের ৬ সিফাত ও মেহনত)
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1 max-w-xl">
              "তোমরাই সর্বোত্তম উম্মত, মানবজাতির কল্যাণের জন্য যাদের উদ্ভব ঘটানো হয়েছে; তোমরা সৎকাজের আদেশ করো এবং অসৎকাজ থেকে নিষেধ করো।" — সূরা আলে ইমরান (৩:১১০)
            </p>
          </div>
        </div>
      </div>

      {/* Subtabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-200 dark:bg-[#092226] border border-slate-300 dark:border-[#14424a]">
        <button
          onClick={() => {
            setActiveTab('sifat');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'sifat'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>তাবলিগের ৬ সিফাত</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('daily_amal');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'daily_amal'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>দৈনিক ৫ আমল</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('gasht');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'gasht'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>গাশত ও মাশওয়ারা আদব</span>
        </button>
      </div>

      {/* 1. তাবলিগের ৬ সিফাত */}
      {activeTab === 'sifat' && (
        <div className="space-y-3">
          {TABLIG_6_SIFATS.map((sifat) => {
            const isExpanded = expandedSifat === sifat.id;
            return (
              <div
                key={sifat.id}
                className={`rounded-3xl border shadow-md overflow-hidden transition-all ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
                }`}
              >
                <button
                  onClick={() => {
                    setExpandedSifat(isExpanded ? '' : sifat.id);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition cursor-pointer ${
                    isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center text-sm font-mono">
                      {sifat.numberBn}
                    </span>
                    <div>
                      <h3 className={`text-sm sm:text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                        {sifat.titleBn}
                      </h3>
                      <div className="font-arabic text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                        {sifat.arabicTitle}
                      </div>
                    </div>
                  </div>

                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 sm:p-5 pt-0 space-y-3.5 border-t border-slate-100 dark:border-teal-900/30 text-xs sm:text-sm">
                    {/* Aim */}
                    <div
                      className={`p-3.5 rounded-2xl border ${
                        isDay ? 'bg-emerald-50/70 border-emerald-200 text-slate-800' : 'bg-[#071f23] border-emerald-500/30 text-teal-100'
                      }`}
                    >
                      <strong className="text-emerald-600 dark:text-emerald-400 block mb-1">
                        🎯 উদ্দেশ্য ও তাৎপর্য:
                      </strong>
                      <p className="leading-relaxed">{sifat.aimBn}</p>
                    </div>

                    {/* Virtue */}
                    <div
                      className={`p-3.5 rounded-2xl border ${
                        isDay ? 'bg-amber-50/70 border-amber-200 text-slate-800' : 'bg-[#1f1a07] border-amber-500/30 text-amber-100'
                      }`}
                    >
                      <strong className="text-amber-600 dark:text-amber-400 block mb-1">
                        ⭐ ফজিলত ও হাদিসের সুসংবাদ:
                      </strong>
                      <p className="leading-relaxed">{sifat.virtueBn}</p>
                    </div>

                    {/* How to gain */}
                    <div
                      className={`p-3.5 rounded-2xl border ${
                        isDay ? 'bg-blue-50/70 border-blue-200 text-slate-800' : 'bg-[#091f28] border-blue-500/30 text-blue-100'
                      }`}
                    >
                      <strong className="text-blue-600 dark:text-blue-400 block mb-1">
                        🌱 এই সিফাত হাসিলের উপায়:
                      </strong>
                      <p className="leading-relaxed">{sifat.gainMethodBn}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 2. দৈনিক ৫ আমল & 3. গাশত ও মাশওয়ারা আদব */}
      {(activeTab === 'daily_amal' || activeTab === 'gasht') && (
        <div className="space-y-4">
          {DAILY_TABLIG_GUIDELINES.filter((g) =>
            activeTab === 'daily_amal' ? g.category === 'daily' : g.category !== 'daily'
          ).map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-3xl border shadow-md space-y-3 ${
                isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
              }`}
            >
              <h3 className={`text-base font-bold flex items-center gap-2 ${isDay ? 'text-slate-900' : 'text-white'}`}>
                <Sparkles className="w-4 h-4 text-emerald-500" />
                <span>{item.titleBn}</span>
              </h3>
              <p className={`text-xs ${isDay ? 'text-slate-600' : 'text-teal-200/90'}`}>
                {item.summaryBn}
              </p>

              <div className="space-y-2 pt-1">
                {item.keyPoints.map((point, pIdx) => (
                  <div
                    key={pIdx}
                    className={`p-3 rounded-2xl border flex items-start gap-2.5 text-xs sm:text-sm ${
                      isDay
                        ? 'bg-slate-50 border-slate-200 text-slate-800'
                        : 'bg-[#081e22] border-[#16444d] text-teal-100'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
