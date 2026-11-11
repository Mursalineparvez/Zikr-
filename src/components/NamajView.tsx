/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ThemeMode, ZikrLanguage } from '../types';
import { soundHaptics } from '../utils/audioHaptics';
import { ALL_PRAYER_DETAILS, PrayerDetailedInfo } from '../data/prayerDetailsData';
import {
  NAMAJ_UI,
  getLocalizedPrayers,
  getLocalizedPrayerSteps,
  getLocalizedEssentialDuas,
  getLocalizedNaflPrayers,
  getLocalizedQazaItems,
} from '../utils/namajTranslations';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Clock,
  Info,
  Sparkles,
  Plus,
  Minus,
  AlertCircle,
} from 'lucide-react';

interface NamajViewProps {
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
  onNavigateToSalatTime?: () => void;
}

type NamajTab = 'five_fard' | 'rules_steps' | 'nafl_prayers' | 'prayer_duas' | 'qaza_tracker';

export const NamajView: React.FC<NamajViewProps> = ({
  soundEnabled,
  themeMode = 'day',
  selectedLanguage = 'bn',
  onNavigateToSalatTime,
}) => {
  const isDay = themeMode === 'day';
  const lang = selectedLanguage || 'bn';
  const [activeTab, setActiveTab] = useState<NamajTab>('five_fard');
  const [expandedPrayerId, setExpandedPrayerId] = useState<string | null>('Fajr');
  const [expandedStep, setExpandedStep] = useState<number | null>(1);

  // Qaza Namaz Tracking State stored in localStorage
  const [qazaCounts, setQazaCounts] = useState<{
    fajr: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
    witr: number;
  }>(() => {
    try {
      const saved = localStorage.getItem('zikrmate_qaza_namaz_counts');
      if (saved) return JSON.parse(saved);
    } catch {}
    return { fajr: 0, dhuhr: 0, asr: 0, maghrib: 0, isha: 0, witr: 0 };
  });

  const updateQaza = (prayer: keyof typeof qazaCounts, delta: number) => {
    if (soundEnabled) soundHaptics.playTap();
    setQazaCounts((prev) => {
      const nextVal = Math.max(0, (prev[prayer] || 0) + delta);
      const updated = { ...prev, [prayer]: nextVal };
      try {
        localStorage.setItem('zikrmate_qaza_namaz_counts', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const totalQaza = useMemo(() => {
    return Object.values(qazaCounts).reduce((a, b) => a + b, 0);
  }, [qazaCounts]);

  const prayersList = useMemo(() => getLocalizedPrayers(lang), [lang]);
  const stepsList = useMemo(() => getLocalizedPrayerSteps(lang), [lang]);
  const duasList = useMemo(() => getLocalizedEssentialDuas(lang), [lang]);
  const naflList = useMemo(() => getLocalizedNaflPrayers(lang), [lang]);
  const qazaItems = useMemo(() => getLocalizedQazaItems(lang), [lang]);

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Banner / Hero */}
      <div
        className={`rounded-3xl p-5 sm:p-6 border shadow-sm transition-all relative overflow-hidden ${
          isDay
            ? 'bg-gradient-to-br from-emerald-800 via-[#006A4E] to-teal-900 text-white border-emerald-700/60'
            : 'bg-gradient-to-br from-[#042823] via-[#004e39] to-[#041a1c] text-white border-emerald-900/60'
        }`}
      >
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white/15 text-emerald-100 backdrop-blur-xs">
              <span>{NAMAJ_UI.guideBadge[lang] || NAMAJ_UI.guideBadge.en}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
              <span>{NAMAJ_UI.bannerTitle[lang] || NAMAJ_UI.bannerTitle.en}</span>
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-xl">
              {NAMAJ_UI.bannerSubtitle[lang] || NAMAJ_UI.bannerSubtitle.en}
            </p>
          </div>

          {onNavigateToSalatTime && (
            <button
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                onNavigateToSalatTime();
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white text-[#006A4E] font-bold text-xs sm:text-sm shadow-lg hover:bg-emerald-50 active:scale-95 transition cursor-pointer self-start sm:self-auto shrink-0"
            >
              <Clock className="w-4 h-4 text-[#006A4E]" />
              <span>{NAMAJ_UI.viewSalatTimes[lang] || NAMAJ_UI.viewSalatTimes.en}</span>
            </button>
          )}
        </div>
      </div>

      {/* Nav Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1 px-0.5">
        {[
          { id: 'five_fard', label: NAMAJ_UI.tabFiveFard[lang] || '5 Daily Prayers', icon: '🕌' },
          { id: 'rules_steps', label: NAMAJ_UI.tabRulesSteps[lang] || 'Step-by-Step Rules', icon: '📖' },
          { id: 'prayer_duas', label: NAMAJ_UI.tabPrayerDuas[lang] || 'Prayer Duas', icon: '🤲' },
          { id: 'nafl_prayers', label: NAMAJ_UI.tabNaflPrayers[lang] || 'Nafl & Sunnah', icon: '✨' },
          { id: 'qaza_tracker', label: NAMAJ_UI.tabQazaTracker[lang] || 'Qaza Calculator', icon: '📊' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (soundEnabled) soundHaptics.playTap();
                setActiveTab(tab.id as NamajTab);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all active:scale-95 cursor-pointer border ${
                isActive
                  ? 'bg-[#006A4E] text-white border-emerald-600 shadow-md'
                  : isDay
                  ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                  : 'bg-[#0a2327] hover:bg-[#12383e] text-emerald-200 border-[#153f47]'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.id === 'qaza_tracker' && totalQaza > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full font-mono bg-amber-400 text-slate-950 font-black">
                  {totalQaza}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: 5 Daily Prayers Breakdown */}
      {activeTab === 'five_fard' && (
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h2 className={`text-sm sm:text-base font-bold ${isDay ? 'text-slate-800' : 'text-slate-100'}`}>
              {NAMAJ_UI.daily5Title[lang] || NAMAJ_UI.daily5Title.en}
            </h2>
            <span className="text-xs text-slate-500 font-medium">
              {NAMAJ_UI.clickToExpand[lang] || NAMAJ_UI.clickToExpand.en}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {prayersList.map((prayer) => {
              const isExpanded = expandedPrayerId === prayer.id;
              const detailInfo: PrayerDetailedInfo | undefined = ALL_PRAYER_DETAILS[prayer.id];

              return (
                <div
                  key={prayer.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isDay
                      ? 'bg-white border-slate-200 shadow-xs hover:border-emerald-300'
                      : 'bg-[#0b2428] border-[#18454c] shadow-xs hover:border-emerald-700'
                  }`}
                >
                  <button
                    onClick={() => {
                      if (soundEnabled) soundHaptics.playTap();
                      setExpandedPrayerId(isExpanded ? null : prayer.id);
                    }}
                    className="w-full p-4 sm:p-5 flex items-start justify-between gap-3 text-left cursor-pointer transition hover:bg-emerald-50/20"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base sm:text-lg">
                          {prayer.id === 'Fajr' ? '🌅' : prayer.id === 'Dhuhr' ? '☀️' : prayer.id === 'Asr' ? '🌤️' : prayer.id === 'Maghrib' ? '🌇' : '🌙'}
                        </span>
                        <h3 className={`text-base sm:text-lg font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                          {prayer.name}
                        </h3>
                        <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#006A4E]/10 text-[#006A4E] dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-500/30">
                          {NAMAJ_UI.totalPrefix[lang] || 'Total'} {prayer.totalRakats} {NAMAJ_UI.rakatsUnit[lang] || 'Rak\'ats'}
                        </span>
                      </div>
                      <p className={`text-xs sm:text-sm font-semibold ${isDay ? 'text-slate-700' : 'text-emerald-100'}`}>
                        {prayer.breakdown}
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                        {NAMAJ_UI.timeWindowLabel[lang] || 'Time Window:'} {prayer.timeRange}
                      </p>
                    </div>

                    <div className="p-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0 mt-1">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div
                      className={`p-4 sm:p-5 pt-0 border-t space-y-4 animate-in fade-in duration-200 ${
                        isDay ? 'border-slate-100 bg-emerald-50/20' : 'border-[#153f47] bg-[#071d20]/50'
                      }`}
                    >
                      {/* Virtue box */}
                      <div className="rounded-xl p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs sm:text-sm leading-relaxed text-emerald-950 dark:text-emerald-200">
                        <div className="font-bold flex items-center gap-1.5 mb-1 text-[#006A4E] dark:text-emerald-400">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{NAMAJ_UI.virtuesHeading[lang] || 'Virtues & Importance:'}</span>
                        </div>
                        {prayer.virtue}
                      </div>

                      {/* Detailed rakats breakdown table */}
                      {prayer.rakatsBreakdownList && prayer.rakatsBreakdownList.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                            {NAMAJ_UI.rakatOrderHeading[lang] || 'Sequential Order of Rak\'ats'}
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            {prayer.rakatsBreakdownList.map((r, idx) => (
                              <div
                                key={idx}
                                className={`p-2.5 rounded-xl border flex items-center justify-between ${
                                  r.type.toLowerCase().includes('fard') || r.type.includes('ফরজ')
                                    ? 'bg-[#006A4E]/10 border-emerald-300 dark:border-emerald-800 font-bold text-[#006A4E] dark:text-emerald-300'
                                    : 'bg-white dark:bg-[#0a2327] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                                }`}
                              >
                                <span>{r.type}</span>
                                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                                  {r.rakats} {r.rakats === 1 ? (NAMAJ_UI.singleRakatUnit[lang] || 'Rak\'at') : (NAMAJ_UI.rakatsUnit[lang] || 'Rak\'ats')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Sahih Hadith & Quranic Ayat */}
                      {prayer.hadithText && (
                        <div className="p-3 rounded-xl bg-white dark:bg-[#082226] border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                          <div className="font-bold text-[#006A4E] dark:text-emerald-400 flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>{NAMAJ_UI.hadithHeading[lang] || 'Sahih Hadith Reference:'}</span>
                          </div>
                          <p className="text-slate-700 dark:text-slate-200 italic leading-relaxed">
                            "{prayer.hadithText}"
                          </p>
                          {prayer.hadithRef && (
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                              — {prayer.hadithRef}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: Step-by-Step Prayer Rules */}
      {activeTab === 'rules_steps' && (
        <div className="space-y-3.5">
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
            {NAMAJ_UI.stepIntroQuote[lang] || NAMAJ_UI.stepIntroQuote.en}
          </div>

          <div className="space-y-3">
            {stepsList.map((step) => {
              const isExpanded = expandedStep === step.stepNumber;
              return (
                <div
                  key={step.stepNumber}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isDay ? 'bg-white border-slate-200' : 'bg-[#0a2327] border-[#153f47]'
                  }`}
                >
                  <button
                    onClick={() => {
                      if (soundEnabled) soundHaptics.playTap();
                      setExpandedStep(isExpanded ? null : step.stepNumber);
                    }}
                    className="w-full p-4 flex items-center justify-between gap-3 text-left cursor-pointer hover:bg-emerald-50/20"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-[#006A4E] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {step.stepNumber}
                      </span>
                      <h3 className={`text-sm sm:text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                        {step.title}
                      </h3>
                    </div>
                    <div className="text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div
                      className={`p-4 pt-0 border-t space-y-3 text-xs sm:text-sm leading-relaxed ${
                        isDay ? 'border-slate-100 bg-slate-50/50' : 'border-[#153f47] bg-[#071d20]/50'
                      }`}
                    >
                      <div className="space-y-1">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {NAMAJ_UI.physicalActionLabel[lang] || 'Physical Posture:'}
                        </span>
                        <p className="text-slate-600 dark:text-slate-300">{step.action}</p>
                      </div>

                      <div className="p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 space-y-1">
                        <span className="font-bold text-[#006A4E] dark:text-emerald-400">
                          {NAMAJ_UI.recitationLabel[lang] || 'Words & Recitation:'}
                        </span>
                        <p className="text-slate-700 dark:text-slate-200 font-medium">{step.recitation}</p>
                      </div>

                      <div className="flex items-start gap-1.5 text-[11px] text-amber-700 dark:text-amber-400">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{step.tip}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Essential Prayer Duas */}
      {activeTab === 'prayer_duas' && (
        <div className="space-y-4">
          <div className="p-3 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/60 text-xs sm:text-sm text-teal-950 dark:text-teal-200">
            {NAMAJ_UI.duasIntro[lang] || NAMAJ_UI.duasIntro.en}
          </div>

          <div className="grid grid-cols-1 gap-3.5">
            {duasList.map((dua) => (
              <div
                key={dua.id}
                className={`rounded-2xl p-4 sm:p-5 border transition-all space-y-3 ${
                  isDay
                    ? 'bg-white border-slate-200 shadow-xs'
                    : 'bg-[#0a2327] border-[#153f47] shadow-xs'
                }`}
              >
                <div className="flex items-center justify-between gap-2 border-b pb-2 dark:border-slate-800">
                  <h3 className={`text-sm sm:text-base font-bold ${isDay ? 'text-[#006A4E]' : 'text-emerald-300'}`}>
                    {dua.title}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {dua.reference}
                  </span>
                </div>

                {/* Arabic */}
                <p className="text-right font-serif text-lg sm:text-xl leading-loose tracking-wide text-slate-900 dark:text-emerald-50 py-1" dir="rtl">
                  {dua.arabic}
                </p>

                {/* Transliteration */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {NAMAJ_UI.transliterationLabel[lang] || 'Transliteration:'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-semibold leading-relaxed">
                    {dua.transliteration}
                  </p>
                </div>

                {/* Meaning */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {NAMAJ_UI.meaningLabel[lang] || 'Translation:'}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {dua.meaning}
                  </p>
                </div>

                {/* Context Tip */}
                {dua.context && (
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/50 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#006A4E] dark:text-emerald-400 shrink-0" />
                    <span>{dua.context}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Nafl & Sunnah Prayers */}
      {activeTab === 'nafl_prayers' && (
        <div className="space-y-3.5">
          {naflList.map((nafl, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-4 sm:p-5 border space-y-2.5 ${
                isDay ? 'bg-white border-slate-200' : 'bg-[#0a2327] border-[#153f47]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className={`text-base font-black ${isDay ? 'text-slate-900' : 'text-white'}`}>
                  {nafl.title}
                </h3>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-[#006A4E]/10 text-[#006A4E] dark:bg-emerald-500/20 dark:text-emerald-300">
                  {nafl.rakats}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {NAMAJ_UI.naflTimeLabel[lang] || 'Time:'}
                </span>{' '}
                {nafl.time}
              </p>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                <span className="font-bold text-[#006A4E] dark:text-emerald-400">
                  {NAMAJ_UI.naflVirtueLabel[lang] || 'Virtue:'}
                </span>{' '}
                {nafl.benefit}
              </p>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border border-slate-100 dark:border-slate-800">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {NAMAJ_UI.naflMethodLabel[lang] || 'Method:'}
                </span>{' '}
                {nafl.steps}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: Qaza Namaz Calculator */}
      {activeTab === 'qaza_tracker' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
            {NAMAJ_UI.qazaIntro[lang] || NAMAJ_UI.qazaIntro.en}
          </div>

          <div className="rounded-2xl p-4 sm:p-5 border bg-white dark:bg-[#0a2327] border-slate-200 dark:border-[#153f47] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b dark:border-slate-800">
              <div>
                <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                  {NAMAJ_UI.totalRemainingQaza[lang] || 'Total Remaining Missed Prayers (Qaza)'}
                </h3>
                <p className="text-xs text-slate-500">
                  {NAMAJ_UI.qazaSubtitle[lang] || 'Offer one by one regularly to decrease the count'}
                </p>
              </div>
              <span className="text-xl sm:text-2xl font-black font-mono text-[#006A4E] dark:text-emerald-400 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                {totalQaza}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {qazaItems.map((item) => {
                const count = qazaCounts[item.key as keyof typeof qazaCounts] || 0;
                return (
                  <div
                    key={item.key}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/40"
                  >
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-500 font-mono">
                        {NAMAJ_UI.remainingText[lang] || 'Remaining:'} {count} {NAMAJ_UI.timesUnit[lang] || 'times'}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQaza(item.key as keyof typeof qazaCounts, -1)}
                        className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center active:scale-95 transition cursor-pointer hover:bg-emerald-700"
                        title={NAMAJ_UI.markDoneTitle[lang] || 'Mark 1 as completed (-1)'}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-mono font-bold text-sm text-slate-900 dark:text-white">
                        {count}
                      </span>
                      <button
                        onClick={() => updateQaza(item.key as keyof typeof qazaCounts, 1)}
                        className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold flex items-center justify-center active:scale-95 transition cursor-pointer hover:bg-slate-300"
                        title={NAMAJ_UI.addMissedTitle[lang] || 'Add 1 missed prayer (+1)'}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
