import React, { useState } from 'react';
import { TABLIG_COMPLETE_CHAPTERS, TabligChapterDetail } from '../data/tabligData';
import { TABLIGH_ENGLISH_CHAPTER_CONTENTS } from '../data/tabligEnglishData';
import { ThemeMode, ZikrLanguage } from '../types';
import {
  Users,
  ChevronRight,
  ChevronDown,
  Sparkles,
  BookmarkCheck,
  Search,
} from 'lucide-react';
import { soundHaptics } from '../utils/audioHaptics';
import { TABLIG_UI, TABLIG_CHAPTER_TRANSLATIONS } from '../utils/appTranslations';

interface DailyTabligViewProps {
  soundEnabled: boolean;
  themeMode?: ThemeMode;
  selectedLanguage?: ZikrLanguage;
}

interface ChapterMenuItem {
  id: string;
  label: string;
  count: number;
  match: (heading: string, index: number) => boolean;
}

function translateCommonBengaliPhrase(phrase: string): string {
  if (!phrase) return '';
  return phrase
    .replace(/ভূমিকা ও প্রারম্ভিক হামদ-সানা/g, 'Introduction & Praise of Allah')
    .replace(/আল্লাহ কে ও তাঁর আজমত/g, 'Who is Allah & His Supreme Majesty')
    .replace(/আল্লাহর মহব্বত ও তার প্রমাণ/g, 'Love of Allah & Its Evidence')
    .replace(/রাসুলুল্লাহ ﷺ-এর মহব্বত ও কুরবানি/g, 'Love & Sacrifices of Prophet Muhammad ﷺ')
    .replace(/রাসুলুল্লাহ ﷺ আমাদের একমাত্র আদর্শ/g, 'Prophet Muhammad ﷺ as Our Sole Role Model')
    .replace(/সুন্নত শুধু পোশাকে নয়, সমগ্র জীবনে/g, 'Sunnah in the Entire Life, Not Just Attire')
    .replace(/আল্লাহকে স্মরণ করা ও দিলের শান্তি/g, 'Remembrance of Allah & Peace of Heart')
    .replace(/কুরআনের সঙ্গে সম্পর্ক/g, 'Connection with the Holy Quran')
    .replace(/নামাজ—আল্লাহর সঙ্গে সরাসরি সম্পর্ক/g, 'Salah: Direct Connection with Allah')
    .replace(/তাওবা—আল্লাহর রহমতের দরজা সবসময় খোলা/g, 'Tawbah: The Gates of Mercy Are Ever-Open')
    .replace(/আমাদের জীবন ও মেহনত কার জন্য\?/g, 'For Whom is Our Life and Effort?')
    .replace(/আল্লাহর মহব্বত পেতে হলে রাসুল ﷺ-এর অনুসরণ/g, 'Obtaining Allah\'s Love Through Following the Prophet ﷺ')
    .replace(/আসুন, আজ কিছু পাক্কা নিয়ত করি/g, 'Let Us Make Sincere Intentions Today')
    .replace(/শেষ কথা ও জীবনের আসল লক্ষ্য/g, 'Concluding Counsel & True Purpose of Life')
    .replace(/মোনাজাত ও আকুল দোয়া/g, 'Heartfelt Supplication (Munajat)')
    .replace(/ভূমিকা ও আত্মজিজ্ঞাসা/g, 'Introduction & Self-Reflection')
    .replace(/দুনিয়ার ব্যস্ততা আর দিলের গাফলত/g, 'Worldly Distractions and Spiritual Neglect')
    .replace(/আল্লাহর জিকির—দিলের খাবার/g, 'Dhikr: Food for the Heart')
    .replace(/আল্লাহ আমাদের স্মরণ করবেন!/g, 'Allah Will Remember Us!')
    .replace(/দিলের সবচেয়ে বড় রোগ—গাফলত ও তার চিকিৎসা/g, 'Neglect: The Greatest Heart Disease & Its Remedy')
    .replace(/নামাজ—আল্লাহর সঙ্গে সাক্ষাতের ডাক/g, 'Salah: The Call to Meet Allah')
    .replace(/সিজদার মূল্য ও আল্লাহর আশ্রয়/g, 'Value of Sujood & Seeking Refuge in Allah')
    .replace(/কুরআন—দিলের নূর ও ঈমানের চার্জ/g, 'Quran: Light of the Heart & Spiritual Energy')
    .replace(/ছোট আমলকে ছোট মনে করব না/g, 'Never Belittle Any Good Deed')
    .replace(/ইস্তিগফারের মেহনত ও তাওবা/g, 'Power of Istighfar & Repentance')
    .replace(/রাসুলুল্লাহ ﷺ-এর সুন্নত জীবনে আনা/g, 'Bringing the Sunnah into Practical Life')
    .replace(/ঘরে দ্বীন নিয়ে আসি ও পরিবারের হক/g, 'Bringing Islam into the Home & Family Rights')
    .replace(/মানুষের হক ও আখলাক/g, 'Rights of Fellow Humans & Noble Character')
    .replace(/নিজের ইসলাহ ও প্রতিদিনের হিসাব/g, 'Self-Rectification & Daily Accountability')
    .replace(/আমরা কীভাবে শুরু করব\?/g, 'How Do We Begin?')
    .replace(/ভূমিকা ও আল্লাহর বড়ত্ব ও নেয়ামতের শুকরিয়া/g, 'Praising the Greatness of Allah & Gratitude')
    .replace(/আমরা কার বান্দা\? \(আমাদের আসল পরিচয়\)/g, 'Whose Servants Are We? (Our True Identity)')
    .replace(/আল্লাহর নেয়ামত গুনে শেষ করা যাবে না/g, 'Allah\'s Countless Blessings')
    .replace(/ইয়াকিন কী\? \(দিলের গভীর বিশ্বাস\)/g, 'What is Yaqeen? (Firm Inner Faith)')
    .replace(/আল্লাহ আমাদের সঙ্গে আছেন/g, 'Allah is with Us')
    .replace(/দুনিয়া কেন আমাদের এত টানে\?/g, 'Why Does the World Attract Us So Much?')
    .replace(/মৃত্যুর কথা মনে করা/g, 'Remembering Death')
    .replace(/কবরের জন্য কী প্রস্তুতি আছে\?/g, 'Preparation for the Grave')
    .replace(/নামাজ ঠিক করি \(কামিয়াবির আসল আহ্বান\)/g, 'Perfecting Salah: The Call to Success')
    .replace(/কুরআনকে জীবনের সঙ্গী করি/g, 'Making the Quran Our Lifelong Companion')
    .replace(/আল্লাহর জিকিরে দিলের শান্তি/g, 'Inner Peace in Allah\'s Remembrance')
    .replace(/রাসুলুল্লাহ ﷺ-এর মহব্বত ও অনুসরণ/g, 'Love & Obedience to the Messenger ﷺ')
    .replace(/ঘর থেকে সুন্নতের শুরু/g, 'Starting Sunnah at Home')
    .replace(/নিজের গুনাহকে ছোট মনে করব না/g, 'Do Not Deem Any Sin Small')
    .replace(/আল্লাহর রহমত থেকে নিরাশ হব না/g, 'Never Despair of Allah\'s Mercy')
    .replace(/আজকের কিছু পাক্কা নিয়ত \(১০টি অঙ্গীকার\)/g, '10 Noble Resolutions for Today')
    .replace(/আকুল মোনাজাত ও দুআ/g, 'Heartfelt Dua & Supplication')
    .replace(/গাস্তে কথা বলার নিয়ম/g, 'Rules of Speech in Gasht')
    .replace(/রাহবার ও মুতাকাল্লিমের কাজ/g, 'Roles of Rahbar & Mutakallim')
    .replace(/ফজীলত ও পূর্ণ তরতীব/g, 'Virtues & Complete Etiquettes')
    .replace(/গাস্তের সুন্দর পূর্ণ তরতীব/g, 'Complete Method & Etiquettes of Gasht')
    .replace(/গাস্তের সবচেয়ে বড় শিক্ষা/g, 'Greatest Lessons of Gasht')
    .replace(/গাস্তের সময় জিকির ও ফিকির/g, 'Dhikr & Contemplation During Gasht')
    .replace(/কেউ দাওয়াত গ্রহণ না করলে কী করব\?/g, 'What to Do if Someone Declines the Dawah?')
    .replace(/গাস্তের পর নিজের হিসাব/g, 'Self-Evaluation After Gasht')
    .replace(/একটি গুরুত্বপূর্ণ সতর্কতা—হাদিস বলার ক্ষেত্রে/g, 'Crucial Precaution: Precision in Quoting Hadiths')
    .replace(/আমিরের দায়িত্ব/g, 'Responsibilities of the Ameer')
    .replace(/মুতাকাল্লিমের আদব/g, 'Etiquettes of the Speaker (Mutakallim)')
    .replace(/রাহবারের আদব/g, 'Etiquettes of the Guide (Rahbar)')
    .replace(/মাতা-পিতার হক/g, 'Rights of Parents')
    .replace(/পিতামাতার প্রতি ১৪টি হক/g, '14 Essential Rights of Parents')
    .replace(/অন্তরের রোগ/g, 'Diseases of the Heart')
    .replace(/জিকিরের জন্য চারটি আদব/g, '4 Etiquettes of Dhikr')
    .replace(/নামাজের জন্য পাঁচটি গুরুত্বপূর্ণ বিষয়/g, '5 Crucial Elements of Salah')
    .replace(/কিয়ামতের দিন বান্দার চারটি প্রশ্ন/g, '4 Questions on the Day of Judgment')
    .replace(/উম্মতের ধ্বংসের দুটি কারণ/g, '2 Causes of Destruction for Nations')
    .replace(/সাহাবায়ে কেরামের সাহায্য/g, 'Help & Sacrifices of the Sahabah')
    .replace(/মানুষের চার দুশমন/g, 'The 4 Enemies of Man')
    .replace(/দাওয়াতের কাজে পাঁচটি উপকার/g, '5 Great Benefits of Dawah Effort')
    .replace(/দাওয়াতের কাজ থেকে দূরে থাকার ক্ষতি/g, 'Harm of Neglecting Dawah')
    .replace(/গুরুত্বপূর্ণ সমাপ্তি কথা/g, 'Important Concluding Counsel');
}

export const DailyTabligView: React.FC<DailyTabligViewProps> = ({
  soundEnabled,
  themeMode = 'night',
  selectedLanguage = 'bn',
}) => {
  const isDay = themeMode === 'day';
  const isBn = selectedLanguage === 'bn';
  const [expandedChapter, setExpandedChapter] = useState<string>('sifats_intro');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [chapterPartFilter, setChapterPartFilter] = useState<Record<string, string>>({});

  const getChapterTitle = (chap: TabligChapterDetail): string => {
    const t = TABLIG_CHAPTER_TRANSLATIONS[chap.id];
    if (t?.title) {
      return t.title[selectedLanguage] || t.title['en'] || chap.title;
    }
    return chap.title;
  };

  const getChapterSubtitle = (chap: TabligChapterDetail): string => {
    const t = TABLIG_CHAPTER_TRANSLATIONS[chap.id];
    if (t?.subtitle) {
      return t.subtitle[selectedLanguage] || t.subtitle['en'] || chap.subtitle;
    }
    return chap.subtitle;
  };

  const getLocalizedSectionHeading = (chapId: string, secHeading: string, index: number): string => {
    if (isBn) return secHeading;

    const chapData = TABLIGH_ENGLISH_CHAPTER_CONTENTS[chapId];
    if (chapData?.headings && chapData.headings[index]) {
      return chapData.headings[index];
    }

    let h = secHeading;
    h = h
      .replace(/^ছয় সিফতের আলোচনা\s*\(ভূমিকা\)/i, 'Discussion on 6 Qualities (Introduction)')
      .replace(/^১\.\s*কালেমা/i, '1. Kalimah: Tayyibah (Faith & Declaration)')
      .replace(/^২\.\s*নামাজ/i, '2. Salah: Prayers with Devotion & Humility')
      .replace(/^৩\.\s*ইলম ও জিকির/i, '3. Ilm & Dhikr: Sacred Knowledge & Remembrance')
      .replace(/^৪\.\s*ইকরামুল মুসলিমী?ন/i, '4. Ikramul Muslimeen: Honoring Fellow Muslims')
      .replace(/^৫\.\s*তাসহীহে নিয়ত/i, '5. Ikhlas & Sincerity of Intention')
      .replace(/^৬\.\s*দাওয়াত ও তাবলিগ/i, '6. Dawah & Tabligh: Calling to Allah')
      .replace(/^পর্ব ([১-৩0-9]+)\s*:\s*([০-৯0-9]+)\.\s*(.*)/i, (m, part, num, rest) => {
        const pNum = part === '১' ? '1' : part === '২' ? '2' : part === '৩' ? '3' : part;
        return `Part ${pNum} : ${num}. ${translateCommonBengaliPhrase(rest)}`;
      })
      .replace(/বাদ মাগরিব বয়ান ([১-৩0-9]+)\s*:\s*(.*)/i, (m, pNum, rest) => {
        const num = pNum === '১' ? '1' : pNum === '২' ? '2' : pNum === '৩' ? '3' : pNum;
        return `Post-Maghrib Bayan ${num} : ${translateCommonBengaliPhrase(rest)}`;
      })
      .replace(/^ঈমান ও একীনের কথা\s*[-—:]\s*([০-৯0-9]+)/i, 'Iman & Yaqeen Discourse $1')
      .replace(/^দাওয়াত\s*[-—:]\s*\(([০-৯0-9]+)\)/i, 'Dawah Principles (Discourse $1)')
      .replace(/^([০-৯0-9]+)\.\s*(.*)/i, (m, num, rest) => {
        return `${num}. ${translateCommonBengaliPhrase(rest)}`;
      });

    return h;
  };

  const getLocalizedSectionContent = (chapId: string, rawContent: string, index: number): string => {
    if (!isBn) {
      const chapData = TABLIGH_ENGLISH_CHAPTER_CONTENTS[chapId];
      if (chapData?.contents && chapData.contents[index]) {
        return chapData.contents[index];
      }
    }
    if (!rawContent) return '';
    return rawContent
      .replace(/^\s*[-—_]{3,}\s*$/gm, '')
      .replace(/^[ \t]*#+[ \t]*/gm, '')
      .replace(/#/g, '')
      .replace(/[ \t]+$/gm, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  const filteredChapters = TABLIG_COMPLETE_CHAPTERS.filter((chap) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    const currentTitle = getChapterTitle(chap).toLowerCase();
    const currentSub = getChapterSubtitle(chap).toLowerCase();
    const origTitle = chap.title.toLowerCase();
    const origSub = chap.subtitle.toLowerCase();

    const matchTitle =
      currentTitle.includes(query) ||
      currentSub.includes(query) ||
      origTitle.includes(query) ||
      origSub.includes(query);

    const matchSec = chap.sections.some(
      (s) => s.heading.toLowerCase().includes(query) || s.content.toLowerCase().includes(query)
    );
    return matchTitle || matchSec;
  });

  // Extract smart menu items for ANY chapter
  const getChapterMenuItems = (chap: TabligChapterDetail): ChapterMenuItem[] => {
    if (!chap.sections || chap.sections.length <= 1) return [];

    if (chap.id === 'tabligh_120_core') {
      return [];
    }

    const prefixMap = new Map<string, number>();
    chap.sections.forEach((s) => {
      const matchGroup = s.heading.match(/^(বাদ মাগরিব বয়ান [১-৩]|পর্ব [১-৩])/);
      if (matchGroup) {
        const p = matchGroup[1];
        prefixMap.set(p, (prefixMap.get(p) || 0) + 1);
      }
    });

    if (prefixMap.size > 1) {
      return Array.from(prefixMap.entries()).map(([prefix, count]) => {
        let label = prefix;
        if (!isBn) {
          label = label
            .replace('বাদ মাগরিব বয়ান ১', 'Maghrib Bayan 1')
            .replace('বাদ মাগরিব বয়ান ২', 'Maghrib Bayan 2')
            .replace('বাদ মাগরিব বয়ান ৩', 'Maghrib Bayan 3')
            .replace('পর্ব ১', 'Part 1')
            .replace('পর্ব ২', 'Part 2')
            .replace('পর্ব ৩', 'Part 3');
        }
        return {
          id: prefix,
          label,
          count,
          match: (heading: string) => heading.startsWith(prefix),
        };
      });
    }

    return chap.sections.map((sec, idx) => {
      let shortLabel = sec.heading;

      if (!isBn) {
        const chapData = TABLIGH_ENGLISH_CHAPTER_CONTENTS[chap.id];
        if (chapData?.pills && chapData.pills[idx]) {
          shortLabel = chapData.pills[idx];
        } else {
          shortLabel = shortLabel
            .replace(/^ছয় সিফ[াতো]+র আলোচনা\s*\((.*?)\)/i, '$1')
            .replace(/^দাওয়াত\s*[-—:]\s*\(([০-৯0-9]+)\)/i, 'Dawah $1')
            .replace(/^ঈমান ও একীনের কথা\s*[-—:]\s*([০-৯0-9]+)/i, 'Topic $1')
            .replace(/পর্ব ([১-৩0-9]+)\s*:\s*([০-৯0-9]+)\.\s*(.*)/i, 'Part $1 : $2')
            .replace(/বাদ মাগরিব বয়ান ([১-৩0-9]+)\s*:\s*(.*)/i, 'Bayan $1')
            .replace(/^([০-৯0-9]+)\.\s*(.*)/i, '$1. $2');
        }
      } else {
        shortLabel = shortLabel
          .replace(/^ঈমান ও একীনের কথা\s*[-—:]\s*/i, 'কথা - ')
          .replace(/^দাওয়াত\s*[-—:]\s*\(([০-৯0-9]+)\)/i, 'দাওয়াত $1')
          .replace(/^ছয় সিফ[াতো]+র আলোচনা\s*\((.*?)\)/i, '$1')
          .trim();
      }

      if (shortLabel.length > 24) {
        shortLabel = shortLabel.slice(0, 22) + '…';
      }

      return {
        id: `sec_${idx}`,
        label: shortLabel,
        count: 1,
        match: (_heading: string, i: number) => i === idx,
      };
    });
  };

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
              <span>الدَّعْوَةُ وَالتَّبْلِيغُ • Complete Authentic Tabligh Syllabus &amp; Bayan</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight">
              {TABLIG_UI.bannerTitle[selectedLanguage]}
            </h2>
            <p className="text-xs sm:text-sm text-teal-100/90 mt-1 max-w-3xl">
              {TABLIG_UI.bannerSub[selectedLanguage]}
            </p>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={TABLIG_UI.searchPlaceholder[selectedLanguage]}
          className={`w-full pl-11 pr-4 py-3 rounded-2xl border text-xs sm:text-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
            isDay
              ? 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              : 'bg-[#0a242a] border-[#16444e] text-white placeholder-teal-400/60'
          }`}
        />
      </div>

      {/* Chapters Accordion List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-2">
          <h3 className={`text-xs font-bold uppercase tracking-wider ${isDay ? 'text-slate-500' : 'text-teal-300'}`}>
            {TABLIG_UI.allChapters[selectedLanguage]} ({filteredChapters.length})
          </h3>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
            {TABLIG_UI.tapToRead[selectedLanguage]}
          </span>
        </div>

        {filteredChapters.map((chap, idx) => {
          const isExpanded = expandedChapter === chap.id;
          const chapterNumber = isBn ? chap.numberBn : String(idx + 1).padStart(2, '0');
          const chapterTitle = getChapterTitle(chap);
          const chapterSubtitle = getChapterSubtitle(chap);

          return (
            <div
              key={chap.id}
              className={`rounded-3xl border shadow-md overflow-hidden transition-all ${
                isDay ? 'bg-white border-slate-200' : 'bg-[#0a242a] border-[#16444e]'
              }`}
            >
              <button
                onClick={() => {
                  setExpandedChapter(isExpanded ? '' : chap.id);
                  if (soundEnabled) soundHaptics.playTap();
                }}
                className={`w-full p-4 sm:p-5 flex items-center justify-between text-left transition cursor-pointer ${
                  isDay ? 'hover:bg-slate-50' : 'hover:bg-teal-950/40'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="w-9 h-9 rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center text-sm font-mono shrink-0 shadow-sm">
                    {chapterNumber}
                  </span>
                  <div className="min-w-0">
                    <h3 className={`text-sm sm:text-base font-bold truncate ${isDay ? 'text-slate-900' : 'text-white'}`}>
                      {chapterTitle}
                    </h3>
                    {chapterSubtitle && (
                      <p className="text-xs text-slate-500 dark:text-teal-300/80 truncate mt-0.5">
                        {chapterSubtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {chap.arabic && (
                    <span className="hidden md:inline font-arabic text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                      {chap.arabic}
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
                  {chap.arabic && (
                    <div className="pt-3 text-center">
                      <span className="inline-block px-4 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 font-arabic text-sm text-emerald-600 dark:text-emerald-300 font-bold">
                        {chap.arabic}
                      </span>
                    </div>
                  )}

                  {/* Smart topic / part navigation menu */}
                  {(() => {
                    const menuItems = getChapterMenuItems(chap);
                    if (menuItems.length > 1) {
                      const currentFilter = chapterPartFilter[chap.id] || 'all';
                      return (
                        <div className="pt-2 flex flex-wrap items-center gap-1.5 sm:gap-2 border-b border-slate-200/60 dark:border-teal-900/40 pb-3">
                          <span className="text-[11px] font-semibold text-slate-500 dark:text-teal-300 mr-1 flex items-center gap-1 shrink-0">
                            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                            {isBn ? 'বিষয় / পর্ব নির্বাচন:' : 'Select Topic / Part:'}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setChapterPartFilter((prev) => ({ ...prev, [chap.id]: 'all' }));
                              if (soundEnabled) soundHaptics.playTap();
                            }}
                            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer shrink-0 ${
                              currentFilter === 'all'
                                ? 'bg-emerald-600 text-white shadow-md'
                                : isDay
                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                : 'bg-[#071d22] hover:bg-teal-900/50 text-teal-200 border border-teal-800/40'
                            }`}
                          >
                            {isBn ? 'সবগুলো' : 'All'} ({chap.sections.length})
                          </button>
                          {menuItems.map((item) => {
                            const isSelected = currentFilter === item.id;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  setChapterPartFilter((prev) => ({ ...prev, [chap.id]: item.id }));
                                  if (soundEnabled) soundHaptics.playTap();
                                }}
                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1 shrink-0 ${
                                  isSelected
                                    ? 'bg-emerald-600 text-white shadow-md'
                                    : isDay
                                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                                    : 'bg-[#071d22] hover:bg-teal-900/50 text-teal-200 border border-teal-800/40'
                                }`}
                              >
                                <span>{item.label}</span>
                                {item.count > 1 && (
                                  <span className="text-[10px] opacity-75">({item.count})</span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      );
                    }
                    return null;
                  })()}

                  {chap.sections
                    .filter((sec, sIdx) => {
                      const currentFilter = chapterPartFilter[chap.id];
                      if (!currentFilter || currentFilter === 'all') return true;
                      const menuItems = getChapterMenuItems(chap);
                      const activeItem = menuItems.find((m) => m.id === currentFilter);
                      if (!activeItem) return true;
                      return activeItem.match(sec.heading, sIdx);
                    })
                    .map((sec, sIdx) => {
                      const localizedHeading = getLocalizedSectionHeading(chap.id, sec.heading, sIdx);
                      const localizedContent = getLocalizedSectionContent(chap.id, sec.content, sIdx);
                      const isMunajat =
                        sec.heading.includes('মোনাজাত') ||
                        sec.heading.includes('দোয়া') ||
                        localizedHeading.toLowerCase().includes('supplication') ||
                        localizedHeading.toLowerCase().includes('dua') ||
                        localizedHeading.toLowerCase().includes('munajat');

                      return (
                        <div
                          key={sIdx}
                          className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                            isMunajat
                              ? isDay
                                ? 'bg-amber-50/70 border-amber-200 text-slate-800'
                                : 'bg-[#0a2322] border-amber-500/30 text-amber-100 shadow-inner'
                              : isDay
                              ? 'bg-slate-50/80 border-slate-200 text-slate-800'
                              : 'bg-[#071d22] border-teal-900/40 text-teal-100'
                          }`}
                        >
                          {localizedHeading && (
                            <h4
                              className={`font-bold text-xs sm:text-sm mb-2.5 flex items-center gap-1.5 ${
                                isMunajat
                                  ? 'text-amber-600 dark:text-amber-400'
                                  : 'text-emerald-600 dark:text-emerald-400'
                              }`}
                            >
                              <BookmarkCheck className="w-4 h-4 shrink-0" />
                              <span>{localizedHeading}</span>
                            </h4>
                          )}
                          <p className="leading-relaxed whitespace-pre-line text-xs sm:text-sm">
                            {localizedContent}
                          </p>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
