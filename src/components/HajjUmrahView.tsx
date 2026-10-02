import React, { useState, useEffect } from 'react';
import {
  UMRAH_STEPS,
  HAJJ_DAYS_GUIDE,
  IHRAM_PROHIBITIONS,
  IHRAM_PROHIBITIONS_EN,
  MIQAT_LOCATIONS,
  MADINAH_ZIYARAH_PLACES,
  PILGRIM_PACKING_LIST,
  HajjStepItem,
} from '../data/hajjUmrahData';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  Compass,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Award,
  Sparkles,
  RotateCcw,
  Plane,
  Luggage,
  MapPin,
  CheckSquare,
  Square,
  Footprints,
  Clock,
  HeartHandshake,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { HAJJ_UMRAH_UI } from '../utils/appTranslations';

interface HajjUmrahViewProps {
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
}

type HajjTab = 'umrah' | 'hajj' | 'tracker' | 'miqat' | 'madinah' | 'packing' | 'prohibitions';

export const HajjUmrahView: React.FC<HajjUmrahViewProps> = ({
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';
  const [activeTab, setActiveTab] = useState<HajjTab>('umrah');
  const [expandedStep, setExpandedStep] = useState<string>('umrah_1_ihram');

  // Live Tawaf & Sa'i Counter State
  const [tawafRound, setTawafRound] = useState<number>(() => {
    try {
      const s = localStorage.getItem('zikrmate_live_tawaf_round');
      return s ? parseInt(s, 10) : 0;
    } catch {
      return 0;
    }
  });

  const [saiTrip, setSaiTrip] = useState<number>(() => {
    try {
      const s = localStorage.getItem('zikrmate_live_sai_trip');
      return s ? parseInt(s, 10) : 0;
    } catch {
      return 0;
    }
  });

  // Packing Checklist State (Persistent)
  const [packedItems, setPackedItems] = useState<Record<string, boolean>>(() => {
    try {
      const s = localStorage.getItem('zikrmate_hajj_packing_checked');
      return s ? JSON.parse(s) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('zikrmate_live_tawaf_round', String(tawafRound));
    } catch {}
  }, [tawafRound]);

  useEffect(() => {
    try {
      localStorage.setItem('zikrmate_live_sai_trip', String(saiTrip));
    } catch {}
  }, [saiTrip]);

  const togglePackedItem = (id: string) => {
    setPackedItems((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('zikrmate_hajj_packing_checked', JSON.stringify(next));
      } catch {}
      return next;
    });
    if (soundEnabled) soundHaptics.playTap();
  };

  const handleIncrementTawaf = () => {
    if (tawafRound < 7) {
      const next = tawafRound + 1;
      setTawafRound(next);
      if (soundEnabled) {
        if (next === 7) soundHaptics.playMilestone();
        else soundHaptics.playTap();
      }
    }
  };

  const handleIncrementSai = () => {
    if (saiTrip < 7) {
      const next = saiTrip + 1;
      setSaiTrip(next);
      if (soundEnabled) {
        if (next === 7) soundHaptics.playMilestone();
        else soundHaptics.playTap();
      }
    }
  };

  const handleSpeakArabic = (text: string) => {
    if (soundEnabled) soundHaptics.playTap();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  const prohibitionsList = isBn ? IHRAM_PROHIBITIONS : IHRAM_PROHIBITIONS_EN;

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      {/* Top Banner */}
      <div
        className={`p-5 sm:p-6 rounded-3xl border shadow-xl ${
          isDay
            ? 'bg-gradient-to-r from-teal-700 via-emerald-700 to-teal-800 text-white border-teal-600/40'
            : 'bg-gradient-to-r from-[#0c2f35] via-[#12414a] to-[#1a5560] text-white border-[#1a535e]'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-teal-100 text-xs font-semibold mb-2 backdrop-blur-md">
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>الحَجُّ وَالعُمْرَةُ • Complete Interactive Hajj &amp; Umrah Companion</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {HAJJ_UMRAH_UI.bannerTitle[selectedLanguage]}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1 max-w-2xl">
              {HAJJ_UMRAH_UI.bannerSub[selectedLanguage]}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Subtabs */}
      <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-200 dark:bg-[#092226] border border-slate-300 dark:border-[#14424a] overflow-x-auto no-scrollbar">
        <button
          onClick={() => {
            setActiveTab('umrah');
            setExpandedStep('umrah_1_ihram');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'umrah'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span>🕋</span>
          <span>{HAJJ_UMRAH_UI.tabUmrah[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('hajj');
            setExpandedStep('hajj_day_1');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'hajj'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>{HAJJ_UMRAH_UI.tabHajj[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('tracker');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'tracker'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Footprints className="w-3.5 h-3.5 text-amber-300" />
          <span>{HAJJ_UMRAH_UI.tabTracker[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('miqat');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'miqat'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Plane className="w-3.5 h-3.5" />
          <span>{HAJJ_UMRAH_UI.tabMiqat[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('madinah');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'madinah'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>{HAJJ_UMRAH_UI.tabMadinah[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('packing');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'packing'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Luggage className="w-3.5 h-3.5" />
          <span>{HAJJ_UMRAH_UI.tabPacking[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('prohibitions');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`py-2 px-3.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
            activeTab === 'prohibitions'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>{HAJJ_UMRAH_UI.tabProhibitions[selectedLanguage]}</span>
        </button>
      </div>

      {/* 1. UMRAH or HAJJ ACCORDION LIST */}
      {(activeTab === 'umrah' || activeTab === 'hajj') && (
        <div className="space-y-3">
          {(activeTab === 'umrah' ? UMRAH_STEPS : HAJJ_DAYS_GUIDE).map((step: HajjStepItem) => {
            const isExpanded = expandedStep === step.id;
            const stageLabel = isBn ? step.dayOrStageBn : (step.dayOrStageEn || step.dayOrStageBn);
            const titleLabel = isBn ? step.titleBn : (step.titleEn || step.titleBn);
            const summaryLabel = isBn ? step.summaryBn : (step.summaryEn || step.summaryBn);
            const actions = (isBn ? step.actionItems : (step.actionItemsEn || step.actionItems)) || [];
            const mistakes = (isBn ? step.mistakesToAvoidBn : (step.mistakesToAvoidEn || step.mistakesToAvoidBn)) || [];

            return (
              <div
                key={step.id}
                className={`rounded-3xl border shadow-md overflow-hidden transition-all ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
                }`}
              >
                <button
                  onClick={() => {
                    setExpandedStep(isExpanded ? '' : step.id);
                    if (soundEnabled) soundHaptics.playTap();
                  }}
                  className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition cursor-pointer ${
                    isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs font-mono shrink-0 shadow-sm">
                      {stageLabel}
                    </span>
                    <div className="min-w-0">
                      <h3 className={`text-sm sm:text-base font-bold truncate ${isDay ? 'text-slate-900' : 'text-white'}`}>
                        {titleLabel}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-teal-300/80 truncate mt-0.5">
                        {summaryLabel}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {step.arabicTitle && (
                      <span className="hidden md:inline font-arabic text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                        {step.arabicTitle}
                      </span>
                    )}
                    {isExpanded ? (
                      <ChevronDown className="w-5 h-5 text-slate-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-slate-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 sm:p-6 pt-0 space-y-4 border-t border-slate-100 dark:border-teal-900/30 text-xs sm:text-sm animate-in fade-in duration-150">
                    {/* Arabic Header */}
                    {step.arabicTitle && (
                      <div className="pt-3 text-center">
                        <span className="inline-block px-4 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 font-arabic text-sm text-emerald-600 dark:text-emerald-300 font-bold">
                          {step.arabicTitle}
                        </span>
                      </div>
                    )}

                    {/* Sequential Actions */}
                    <div className="space-y-2">
                      <h4 className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{HAJJ_UMRAH_UI.actionItemsTitle[selectedLanguage]}</span>
                      </h4>
                      <div className="space-y-2">
                        {actions.map((act, aIdx) => (
                          <div
                            key={aIdx}
                            className={`p-3 rounded-2xl border flex items-start gap-2.5 ${
                              isDay
                                ? 'bg-slate-50 border-slate-200 text-slate-800'
                                : 'bg-[#071d22] border-teal-900/40 text-teal-100'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                              {aIdx + 1}
                            </span>
                            <span className="leading-relaxed">{act}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Common Mistakes to Avoid */}
                    {mistakes.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" />
                          <span>{HAJJ_UMRAH_UI.mistakesTitle[selectedLanguage]}</span>
                        </h4>
                        <div className="space-y-1.5">
                          {mistakes.map((m, mIdx) => (
                            <div
                              key={mIdx}
                              className={`p-2.5 rounded-2xl border text-xs flex items-start gap-2 ${
                                isDay
                                  ? 'bg-amber-50/60 border-amber-200 text-amber-900'
                                  : 'bg-amber-950/20 border-amber-900/40 text-amber-200'
                              }`}
                            >
                              <span className="text-amber-500 font-bold">•</span>
                              <span className="leading-relaxed">{m}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Essential Duas */}
                    {step.essentialDuas && step.essentialDuas.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <h4 className="font-bold text-xs uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-amber-400" />
                          <span>{isBn ? 'এই ধাপের প্রয়োজনীয় দোয়াসমূহ' : 'Essential Supplications for this Stage'}</span>
                        </h4>

                        {step.essentialDuas.map((dua, dIdx) => (
                          <div
                            key={dIdx}
                            className={`p-4 rounded-2xl border space-y-2.5 ${
                              isDay
                                ? 'bg-emerald-50/60 border-emerald-200'
                                : 'bg-[#092b30] border-teal-800/40'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-bold text-xs text-emerald-700 dark:text-emerald-300">
                                {isBn ? dua.titleBn : dua.titleEn}
                              </span>
                              <button
                                onClick={() => handleSpeakArabic(dua.arabic)}
                                className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition active:scale-95 cursor-pointer ${
                                  isDay
                                    ? 'bg-white text-emerald-800 shadow-sm hover:bg-emerald-100'
                                    : 'bg-[#071a1d] text-teal-200 hover:bg-teal-900/50'
                                }`}
                              >
                                <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                                <span>{HAJJ_UMRAH_UI.listenArabic[selectedLanguage]}</span>
                              </button>
                            </div>

                            <p
                              dir="rtl"
                              className="font-arabic text-lg sm:text-xl text-right text-emerald-900 dark:text-emerald-100 leading-loose py-1"
                            >
                              {dua.arabic}
                            </p>

                            <p className="text-xs text-slate-500 dark:text-teal-300/80 italic font-mono">
                              {dua.transliteration}
                            </p>

                            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 pt-1 border-t border-emerald-200/50 dark:border-teal-900/40">
                              <strong className="text-emerald-600 dark:text-emerald-400">
                                {isBn ? 'অর্থ: ' : 'Meaning: '}
                              </strong>
                              {isBn ? dua.meaningBn : dua.meaningEn}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 2. LIVE TAWAF & SA'I TRACKER */}
      {activeTab === 'tracker' && (
        <div className="space-y-5">
          {/* Tawaf Counter Box */}
          <div
            className={`p-5 sm:p-6 rounded-3xl border shadow-lg space-y-4 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🕋</span>
                <div>
                  <h3 className={`text-sm sm:text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {HAJJ_UMRAH_UI.tawafCounterTitle[selectedLanguage]}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-teal-300">
                    {isBn
                      ? 'হাজরে আসওয়াদ থেকে শুরু করে ৭ চক্কর কাউন্ট করুন'
                      : 'Track your 7 counter-clockwise circuits starting from the Black Stone line'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setTawafRound(0);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`p-2 rounded-xl border text-xs flex items-center gap-1 transition cursor-pointer active:scale-95 ${
                  isDay ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-[#081f24] hover:bg-teal-900/50 text-teal-300 border-teal-800/40'
                }`}
                title={HAJJ_UMRAH_UI.reset[selectedLanguage]}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{HAJJ_UMRAH_UI.reset[selectedLanguage]}</span>
              </button>
            </div>

            {/* Circuit Progress Meter */}
            <div className="flex items-center justify-center gap-2 py-3">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <div
                  key={num}
                  className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-mono font-bold text-xs sm:text-sm transition-all ${
                    num <= tawafRound
                      ? 'bg-emerald-600 text-white shadow-md scale-105'
                      : isDay
                      ? 'bg-slate-100 text-slate-400 border border-slate-200'
                      : 'bg-[#071d22] text-teal-500 border border-teal-900/50'
                  }`}
                >
                  {num}
                </div>
              ))}
            </div>

            {/* Current Round Guidance */}
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm ${
                tawafRound >= 7
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-bold'
                  : isDay
                  ? 'bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-[#071d22] border-teal-900/40 text-teal-100'
              }`}
            >
              {tawafRound >= 7 ? (
                <div className="space-y-1 text-center">
                  <div className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                    🎉 {isBn ? 'আলহামদুলিল্লাহ! ৭ চক্কর তাওয়াফ সম্পন্ন হয়েছে!' : 'Alhamdulillah! All 7 circuits completed!'}
                  </div>
                  <p className="text-xs font-normal">
                    {isBn
                      ? 'এখন ডান কাঁধ ঢেকে মাকামে ইবরাহিমের পেছনে ২ রাকাত নামাজ আদায় করুন এবং প্রাণভরে জমজম পানি পান করুন।'
                      : 'Now cover your right shoulder, pray 2 Rak\'ahs behind Maqam Ibrahim, and drink Zamzam water before proceeding to Sa\'i.'}
                  </p>
                </div>
              ) : (
                <div>
                  <strong>
                    {HAJJ_UMRAH_UI.circuit[selectedLanguage]} {tawafRound + 1} / 7:{' '}
                  </strong>
                  {tawafRound < 3
                    ? isBn
                      ? 'পুরুষরা দ্রুত পদক্ষেপে (রমল) চলুন। রুকনে ইয়ামানি ও হাজরে আসওয়াদের মাঝে "রাব্বানা আতিনা..." দোয়া পড়ুন।'
                      : 'Men perform Raml (brisk walk). Recite "Rabbana atina fid-dunya hasanah..." between the Yemeni Corner and Black Stone.'
                    : isBn
                    ? 'স্বাভাবিক পদক্ষেপে চলুন। অধিক পরিমাণে জিকির, কুরআন তিলাওয়াত ও আন্তরিক দোয়া করুন।'
                    : 'Walk normally. Engage in abundant remembrance of Allah, Quran recitation, and heartfelt supplication.'}
                </div>
              )}
            </div>

            {/* Action Increment Button */}
            {tawafRound < 7 && (
              <button
                type="button"
                onClick={handleIncrementTawaf}
                className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {HAJJ_UMRAH_UI.completeRound[selectedLanguage]} ({tawafRound + 1} / 7)
                </span>
              </button>
            )}
          </div>

          {/* Sa'i Counter Box */}
          <div
            className={`p-5 sm:p-6 rounded-3xl border shadow-lg space-y-4 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⛰️</span>
                <div>
                  <h3 className={`text-sm sm:text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {HAJJ_UMRAH_UI.saiCounterTitle[selectedLanguage]}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-teal-300">
                    {isBn
                      ? 'সাফা থেকে শুরু করে মারওয়ায় সমাপ্ত (মোট ৭টি ট্রিপ)'
                      : '7 trips starting at Mount Safa and ending at Mount Marwah'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setSaiTrip(0);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`p-2 rounded-xl border text-xs flex items-center gap-1 transition cursor-pointer active:scale-95 ${
                  isDay ? 'bg-slate-100 hover:bg-slate-200 text-slate-600' : 'bg-[#081f24] hover:bg-teal-900/50 text-teal-300 border-teal-800/40'
                }`}
                title={HAJJ_UMRAH_UI.reset[selectedLanguage]}
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{HAJJ_UMRAH_UI.reset[selectedLanguage]}</span>
              </button>
            </div>

            {/* Sa'i Lap Indicator */}
            <div className="flex items-center justify-center gap-2 py-3">
              {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                const isEven = num % 2 === 0;
                const pathLabel = isEven ? 'M➔S' : 'S➔M';
                return (
                  <div
                    key={num}
                    className={`px-2 py-1.5 sm:px-3 sm:py-2 rounded-2xl flex flex-col items-center justify-center font-mono font-bold text-[10px] sm:text-xs transition-all ${
                      num <= saiTrip
                        ? 'bg-teal-600 text-white shadow-md scale-105'
                        : isDay
                        ? 'bg-slate-100 text-slate-400 border border-slate-200'
                        : 'bg-[#071d22] text-teal-500 border border-teal-900/50'
                    }`}
                  >
                    <span>{num}</span>
                    <span className="text-[9px] opacity-80">{pathLabel}</span>
                  </div>
                );
              })}
            </div>

            {/* Current Trip Guidance */}
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm ${
                saiTrip >= 7
                  ? 'bg-teal-500/20 border-teal-500/40 text-teal-700 dark:text-teal-300 font-bold'
                  : isDay
                  ? 'bg-slate-50 border-slate-200 text-slate-800'
                  : 'bg-[#071d22] border-teal-900/40 text-teal-100'
              }`}
            >
              {saiTrip >= 7 ? (
                <div className="space-y-1 text-center">
                  <div className="text-sm font-black text-teal-600 dark:text-teal-400">
                    🎉 {isBn ? 'আলহামদুলিল্লাহ! সাফা-মারওয়া সাঈ সম্পন্ন হয়েছে!' : 'Alhamdulillah! Sa\'i completed at Mount Marwah!'}
                  </div>
                  <p className="text-xs font-normal">
                    {isBn
                      ? 'এখন মাথা মুণ্ডন (হলক) বা চুল ছোট (কসর) করে ওমরাহ পূর্ণ করুন ও ইহরাম সমাপ্ত করুন।'
                      : 'Now perform Halq (shaving head) or Taqseer (trimming hair) to complete your Umrah.'}
                  </p>
                </div>
              ) : (
                <div>
                  <strong>
                    {HAJJ_UMRAH_UI.trip[selectedLanguage]} {saiTrip + 1} / 7 (
                    {saiTrip % 2 === 0
                      ? isBn
                        ? 'সাফা ➔ মারওয়া'
                        : 'Safa ➔ Marwah'
                      : isBn
                      ? 'মারওয়া ➔ সাফা'
                      : 'Marwah ➔ Safa'}
                    ):{' '}
                  </strong>
                  {isBn
                    ? 'সবুজ বাতির চিহ্নিত এলাকায় পুরুষরা দ্রুত পায়ে দৌড়ান/হাঁটুন। পাহাড়ে পৌঁছে কাবার দিকে মুখ করে হাত তুলে ৩ বার তকবীর ও দোয়া পড়ুন।'
                    : 'Men jog between the two green light markers. Upon reaching the hill, face the Kaaba, raise both hands, and recite Takbeer & Tahleel 3 times.'}
                </div>
              )}
            </div>

            {/* Action Increment Button */}
            {saiTrip < 7 && (
              <button
                type="button"
                onClick={handleIncrementSai}
                className="w-full py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <Footprints className="w-4 h-4" />
                <span>
                  {HAJJ_UMRAH_UI.completeRound[selectedLanguage]} ({saiTrip + 1} / 7)
                </span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* 3. MIQAT LOCATIONS & AIR TRAVEL RULES */}
      {activeTab === 'miqat' && (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm ${
              isDay ? 'bg-amber-50/70 border-amber-200 text-amber-900' : 'bg-amber-950/20 border-amber-900/40 text-amber-200'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <Plane className="w-4 h-4 text-amber-500" />
              <span>{isBn ? 'বিমানে ভ্রমণের ক্ষেত্রে মিকাতের জরুরি নিয়ম:' : 'Crucial Miqat Rules for Air Travelers:'}</span>
            </div>
            <p className="leading-relaxed">
              {isBn
                ? 'ঢাকা বা নিজ দেশ থেকে সরাসরি জেদ্দা ফ্লাইটে বিমানে ওঠার পূর্বেই বিমানবন্দরে ইহরামের কাপড় পরে নেওয়া উত্তম। বিমান জেদ্দা পৌঁছানোর প্রায় ৩০ মিনিট আগে পাইলট মিকাত অতিক্রমের ঘোষণা দেন। সেই সময় বিমানে বসে ওমরাহর নিয়ত ও তালবিয়াহ পাঠ করতে হবে।'
                : 'When flying directly to Jeddah, put on your unstitched Ihram garments at your departure airport before boarding. When the pilot announces 20-30 minutes before crossing the Miqat line, make your oral Niyyah and begin reciting the Talbiyah in your seat.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {MIQAT_LOCATIONS.map((miqat) => (
              <div
                key={miqat.id}
                className={`p-5 rounded-3xl border shadow-md space-y-2.5 ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h4 className={`text-sm sm:text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                    {miqat.name}
                  </h4>
                  <span className="font-arabic text-sm text-emerald-600 dark:text-emerald-400 font-bold">
                    {miqat.arabic}
                  </span>
                </div>

                <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                  📍 {miqat.distanceFromMakkah}
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isBn ? miqat.designatedForBn : miqat.designatedFor}
                </p>

                <div
                  className={`p-2.5 rounded-xl border text-[11px] leading-relaxed ${
                    isDay ? 'bg-slate-50 border-slate-200 text-slate-700' : 'bg-[#07191d] border-teal-900/40 text-teal-200'
                  }`}
                >
                  <strong className="text-emerald-600 dark:text-teal-300">
                    {isBn ? 'নির্দেশনা: ' : 'Guide: '}
                  </strong>
                  {isBn ? miqat.airTravelNoteBn : miqat.airTravelNote}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. MADINAH & SACRED ZIYARAH GUIDE */}
      {activeTab === 'madinah' && (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm ${
              isDay ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900' : 'bg-[#072429] border-emerald-900/40 text-emerald-200'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5 mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isBn ? 'মদিনা মুনাওয়ারায় অবস্থানের আদব ও শিষ্টাচার:' : 'Virtues & Etiquettes of Madinah al-Munawwarah:'}</span>
            </div>
            <p className="leading-relaxed">
              {isBn
                ? 'মদিনা শরিফ হলো প্রিয় নবী হযরত মুহাম্মদ ﷺ-এর শহর। এখানে অবস্থানকালে অত্যন্ত বিনম্রতা, ভক্তি ও নিম্নস্বরে চলাফেরা করা বাঞ্ছনীয়। মসজিদে নববীতে এক রাকাত নামাজ সাধারণ মসজিদের চেয়ে ১,০০০ গুণ বেশি সওয়াব বহন করে।'
                : 'Madinah is the illuminated sanctuary of Prophet Muhammad ﷺ. Prayers in Masjid an-Nabawi carry 1,000 times greater reward. Walk with deep humbleness, avoid shouting, and send continuous Salawat.'}
            </p>
          </div>

          <div className="space-y-3.5">
            {MADINAH_ZIYARAH_PLACES.map((place) => (
              <div
                key={place.id}
                className={`p-5 rounded-3xl border shadow-md space-y-3 ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <h4 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                      {place.name}
                    </h4>
                    <span className="text-xs text-slate-400 font-mono">📍 {place.location}</span>
                  </div>
                  <span className="font-arabic text-base sm:text-lg text-emerald-600 dark:text-emerald-400 font-bold">
                    {place.arabic}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  {isBn ? place.virtueBn : place.virtue}
                </p>

                {/* Etiquettes */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold uppercase text-slate-400">
                    {isBn ? 'যিয়ারতের আদব ও নিয়ম:' : 'Etiquettes & Guidelines:'}
                  </div>
                  {(isBn ? place.etiquettesBn : place.etiquettes).map((eti, eIdx) => (
                    <div key={eIdx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-500 font-bold">•</span>
                      <span>{eti}</span>
                    </div>
                  ))}
                </div>

                {/* Salam / Recommended Dua */}
                {place.recommendedDua && (
                  <div
                    className={`p-4 rounded-2xl border space-y-2 mt-2 ${
                      isDay ? 'bg-emerald-50/60 border-emerald-200' : 'bg-[#092b30] border-teal-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        {isBn ? 'পবিত্র সালাম পেশের বাক্য' : 'Prescribed Greeting / Salam'}
                      </span>
                      <button
                        onClick={() => handleSpeakArabic(place.recommendedDua!.arabic)}
                        className={`px-2 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition active:scale-95 cursor-pointer ${
                          isDay ? 'bg-white text-emerald-800 shadow-sm' : 'bg-[#071a1d] text-teal-200'
                        }`}
                      >
                        <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{HAJJ_UMRAH_UI.listenArabic[selectedLanguage]}</span>
                      </button>
                    </div>

                    <p
                      dir="rtl"
                      className="font-arabic text-base sm:text-lg text-right text-emerald-900 dark:text-emerald-100 leading-relaxed"
                    >
                      {place.recommendedDua.arabic}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-teal-300/80 italic font-mono">
                      {place.recommendedDua.transliteration}
                    </p>
                    <p className="text-xs font-medium text-slate-700 dark:text-slate-200">
                      {isBn ? place.recommendedDua.meaningBn : place.recommendedDua.meaningEn}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. INTERACTIVE PACKING CHECKLIST */}
      {activeTab === 'packing' && (
        <div className="space-y-4">
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center justify-between gap-3 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
            }`}
          >
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">
                {isBn ? 'হাজী ও ওমরাহযাত্রীর প্যাকিং চেকলিস্ট' : 'Smart Pilgrim Packing Checklist'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-teal-300">
                {isBn
                  ? 'আপনার ব্যাগে মালামাল তোলার সাথে সাথে টিক দিয়ে রাখুন'
                  : 'Check items as you pack them into your luggage (saved automatically)'}
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-bold text-xs font-mono">
              {Object.values(packedItems).filter(Boolean).length} / 19
            </span>
          </div>

          <div className="space-y-4">
            {PILGRIM_PACKING_LIST.map((cat, cIdx) => (
              <div
                key={cIdx}
                className={`p-5 rounded-3xl border shadow-sm space-y-3 ${
                  isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
                }`}
              >
                <h4 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                  <Luggage className="w-4 h-4 text-emerald-500" />
                  <span>{isBn ? cat.categoryNameBn : cat.categoryNameEn}</span>
                </h4>

                <div className="space-y-2">
                  {cat.items.map((item) => {
                    const isChecked = !!packedItems[item.id];
                    return (
                      <div
                        key={item.id}
                        onClick={() => togglePackedItem(item.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                          isChecked
                            ? isDay
                              ? 'bg-emerald-50/80 border-emerald-300 text-slate-900 line-through opacity-80'
                              : 'bg-emerald-950/20 border-emerald-500/40 text-teal-200 opacity-80'
                            : isDay
                            ? 'bg-slate-50/80 hover:bg-slate-100 border-slate-200 text-slate-800'
                            : 'bg-[#071d22] hover:bg-teal-950/50 border-teal-900/40 text-teal-100'
                        }`}
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        )}
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-semibold">
                            {isBn ? item.nameBn : item.nameEn}
                          </div>
                          {(isBn ? item.noteBn : item.noteEn) && (
                            <div className="text-[11px] text-slate-500 dark:text-teal-300/80 mt-0.5">
                              {isBn ? item.noteBn : item.noteEn}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. IHRAM PROHIBITIONS & PENALTY RULES */}
      {activeTab === 'prohibitions' && (
        <div className="space-y-4">
          <div
            className={`p-5 rounded-3xl border shadow-md space-y-3 ${
              isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
            }`}
          >
            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
              <AlertTriangle className="w-5 h-5" />
              <span>
                {isBn
                  ? 'ইহরাম অবস্থায় যা যা সম্পূর্ণ নিষিদ্ধ (বর্জনীয় কাজসমূহ):'
                  : 'Actions Strictly Prohibited in the State of Ihram (Haram / Mahzurat):'}
              </span>
            </div>

            <div className="space-y-2 pt-1">
              {prohibitionsList.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 ${
                    isDay
                      ? 'bg-rose-50/50 border-rose-200/70 text-slate-800'
                      : 'bg-rose-950/20 border-rose-900/30 text-rose-100'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-rose-500/15 text-rose-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Dam / Fidya Penalty Chart */}
          <div
            className={`p-5 rounded-3xl border shadow-md space-y-3 ${
              isDay ? 'bg-amber-50/70 border-amber-200' : 'bg-[#0a2624] border-amber-800/40'
            }`}
          >
            <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-bold text-sm">
              <HeartHandshake className="w-5 h-5" />
              <span>
                {isBn ? 'দম বা কাফফারা (ভুলত্রুটির ক্ষতিপূরণ সংক্রান্ত বিধান):' : 'Dam & Fidya Penalty Compensation Chart:'}
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-amber-100 leading-relaxed">
              {isBn
                ? '১. বড় নিষিদ্ধ কাজ (যেমন: পুরো একদিন সেলাইযুক্ত কাপড় পরা, পুরো শরীরে সুগন্ধি লাগানো বা মাথা সম্পূর্ণ কামানো) অনিচ্ছাকৃত বা ইচ্ছাকৃতভাবে সংঘটিত হলে ১টি ছাগল/ভেড়া জবাই করে হারামের মিসকিনদের বণ্টন করা (দম) ওয়াজিব হয়।'
                : '1. Major violations (e.g. wearing stitched clothes for a full day, applying perfume over a whole limb, or cutting hair before time) necessitate offering Dam (slaughtering one goat/sheep within the Haram boundaries and distributing it to the poor).'}
            </p>
            <p className="text-xs text-slate-700 dark:text-amber-100 leading-relaxed">
              {isBn
                ? '২. ছোটখাটো ভুলের জন্য সদকায়ে ফিতরের সমপরিমাণ খাদ্য বা মূল্য সদকাহ করতে হয়।'
                : '2. Minor unintentional violations require giving Fidya/Sadaqah equivalent to Sadaqat al-Fitr to the poor of the Haram.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
