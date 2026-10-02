import React, { useState } from 'react';
import {
  UMRAH_STEPS,
  HAJJ_DAYS_GUIDE,
  IHRAM_PROHIBITIONS,
  IHRAM_PROHIBITIONS_EN,
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
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { HAJJ_UMRAH_UI } from '../utils/appTranslations';

interface HajjUmrahViewProps {
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
}

export const HajjUmrahView: React.FC<HajjUmrahViewProps> = ({
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';
  const [activeTab, setActiveTab] = useState<'umrah' | 'hajj' | 'prohibitions'>('umrah');
  const [expandedStep, setExpandedStep] = useState<string>('umrah_1_ihram');

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
      {/* Banner */}
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
              <span>الحَجُّ وَالعُمْرَةُ • Complete Interactive Hajj &amp; Umrah Guide</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {HAJJ_UMRAH_UI.bannerTitle[selectedLanguage]}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1 max-w-xl">
              {HAJJ_UMRAH_UI.bannerSub[selectedLanguage]}
            </p>
          </div>
        </div>
      </div>

      {/* Subtabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-200 dark:bg-[#092226] border border-slate-300 dark:border-[#14424a]">
        <button
          onClick={() => {
            setActiveTab('umrah');
            setExpandedStep('umrah_1_ihram');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'umrah'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <span className="text-base">🕋</span>
          <span>{HAJJ_UMRAH_UI.tabUmrah[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('hajj');
            setExpandedStep('hajj_day_1');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'hajj'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>{HAJJ_UMRAH_UI.tabHajj[selectedLanguage]}</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('prohibitions');
            if (soundEnabled) soundHaptics.playTap();
          }}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
            activeTab === 'prohibitions'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-600 dark:text-teal-200 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>{HAJJ_UMRAH_UI.tabProhibitions[selectedLanguage]}</span>
        </button>
      </div>

      {/* 1. Umrah Steps or 2. Hajj 5 Days */}
      {(activeTab === 'umrah' || activeTab === 'hajj') && (
        <div className="space-y-3">
          {(activeTab === 'umrah' ? UMRAH_STEPS : HAJJ_DAYS_GUIDE).map((step: HajjStepItem) => {
            const isExpanded = expandedStep === step.id;
            const stageLabel = isBn ? step.dayOrStageBn : (step.dayOrStageEn || step.dayOrStageBn);
            const titleLabel = isBn ? step.titleBn : (step.titleEn || step.titleBn);
            const summaryLabel = isBn ? step.summaryBn : (step.summaryEn || step.summaryBn);
            const actions = (isBn ? step.actionItems : (step.actionItemsEn || step.actionItems)) || [];

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
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                      {stageLabel}
                    </span>
                    <div>
                      <h3 className={`text-sm sm:text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                        {titleLabel}
                      </h3>
                      {step.arabicTitle && (
                        <div className="font-arabic text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                          {step.arabicTitle}
                        </div>
                      )}
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
                    <p className={`leading-relaxed ${isDay ? 'text-slate-600' : 'text-teal-200/90'}`}>
                      {summaryLabel}
                    </p>

                    <div className="space-y-2">
                      <strong className="text-emerald-600 dark:text-emerald-400 block text-xs uppercase tracking-wider font-bold">
                        {isBn ? 'করণীয় আমলসমূহ:' : 'Action Items & Duties:'}
                      </strong>
                      {actions.map((act, aIdx) => (
                        <div
                          key={aIdx}
                          className={`p-3 rounded-2xl border flex items-start gap-2.5 ${
                            isDay
                              ? 'bg-slate-50 border-slate-200 text-slate-800'
                              : 'bg-[#081e22] border-[#16444d] text-teal-100'
                          }`}
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="leading-relaxed">{act}</span>
                        </div>
                      ))}
                    </div>

                    {step.essentialDuas && step.essentialDuas.length > 0 && (
                      <div className="space-y-2.5 pt-2">
                        {step.essentialDuas.map((dua, dIdx) => {
                          const duaTitle = isBn ? dua.titleBn : (dua.titleEn || dua.titleBn);
                          const duaMeaning = isBn ? dua.meaningBn : (dua.meaningEn || dua.meaningBn);
                          return (
                            <div
                              key={dIdx}
                              className={`p-4 rounded-2xl border space-y-2 ${
                                isDay
                                  ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                                  : 'bg-[#071f23] border-emerald-500/40 text-teal-100'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs text-emerald-700 dark:text-emerald-300">
                                  🤲 {duaTitle}
                                </span>
                                <button
                                  onClick={() => handleSpeakArabic(dua.arabic)}
                                  className="p-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-600 dark:text-emerald-300 flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                                >
                                  <Volume2 className="w-3.5 h-3.5" />
                                  <span>{HAJJ_UMRAH_UI.listenArabic[selectedLanguage]}</span>
                                </button>
                              </div>
                              <div className="font-arabic text-lg sm:text-xl font-bold text-emerald-700 dark:text-emerald-400 text-right leading-loose">
                                {dua.arabic}
                              </div>
                              {dua.transliteration && (
                                <div className="text-[11px] text-slate-500 dark:text-teal-300/80 italic">
                                  {dua.transliteration}
                                </div>
                              )}
                              <div className="text-xs font-medium text-slate-700 dark:text-teal-100">
                                <strong>{isBn ? 'অর্থ:' : 'Meaning:'}</strong> {duaMeaning}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 3. Prohibitions of Ihram */}
      {activeTab === 'prohibitions' && (
        <div
          className={`p-5 sm:p-6 rounded-3xl border shadow-xl space-y-4 ${
            isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
          }`}
        >
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-teal-900/40">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <div>
              <h3 className={`text-base font-bold ${isDay ? 'text-slate-900' : 'text-white'}`}>
                {isBn
                  ? 'ইহরাম অবস্থায় নিষিদ্ধ কাজসমূহ (মহাগুরুত্বপূর্ণ সতর্কতা)'
                  : 'Prohibitions During Ihram (Crucial Precautions)'}
              </h3>
              <p className={`text-[11px] ${isDay ? 'text-slate-500' : 'text-teal-300/80'}`}>
                {isBn
                  ? 'ইহরাম বাঁধার পর থেকে হালাল হওয়া পর্যন্ত নিচের কাজগুলো সম্পূর্ণ বর্জন করতে হবে:'
                  : 'From putting on Ihram until Tahallul, completely abstain from the following actions:'}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {prohibitionsList.map((p, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border flex items-start gap-3 text-xs sm:text-sm ${
                  isDay
                    ? 'bg-rose-50/70 border-rose-200 text-rose-950'
                    : 'bg-[#261014] border-rose-500/30 text-rose-100'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                  ✕
                </span>
                <span className="leading-relaxed">{p}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
