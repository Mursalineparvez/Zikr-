import { AamalCheckItem, AamalDayLog } from '../types';

export const DEFAULT_AAMAL_ITEMS: Omit<AamalCheckItem, 'completed'>[] = [
  // 1. আজকের নামাজ (The 5 Fardh Prayers)
  {
    id: 'fajr',
    label: 'Fajr Prayer (ফজর নামাজ)',
    category: 'prayer',
    arabicLabel: 'الفجر',
    points: 20,
    details: '২ রাকাত ফরজ নামাজ ওয়াক্তমতো আদায় করা',
  },
  {
    id: 'dhuhr',
    label: 'Dhuhr Prayer (যোহর নামাজ)',
    category: 'prayer',
    arabicLabel: 'الظهر',
    points: 20,
    details: '৪ রাকাত ফরজ নামাজ ওয়াক্তমতো আদায় করা',
  },
  {
    id: 'asr',
    label: 'Asr Prayer (আছর নামাজ)',
    category: 'prayer',
    arabicLabel: 'العصر',
    points: 20,
    details: '৪ রাকাত ফরজ নামাজ ওয়াক্তমতো আদায় করা',
  },
  {
    id: 'maghrib',
    label: 'Maghrib Prayer (মাগরিব নামাজ)',
    category: 'prayer',
    arabicLabel: 'المغرب',
    points: 20,
    details: '৩ রাকাত ফরজ নামাজ ওয়াক্তমতো আদায় করা',
  },
  {
    id: 'isha',
    label: 'Isha Prayer (ইশা নামাজ)',
    category: 'prayer',
    arabicLabel: 'العشاء',
    points: 20,
    details: '৪ রাকাত ফরজ নামাজ ওয়াক্তমতো আদায় করা',
  },
  {
    id: 'jamat_fardh',
    label: 'Prayed in Jamat (জামাতে ফরজ নামাজ আদায়)',
    category: 'prayer',
    arabicLabel: 'صلاة الجماعة',
    points: 25,
    details: 'মসজিদে জামাতের সাথে ফরজ নামাজ আদায় করা',
  },

  // 2. সুন্নত ও নফল নামাজ (Sunnah & Nafl Prayers)
  {
    id: 'witr',
    label: 'Witr Prayer (বিতর নামাজ - ওয়াজিব)',
    category: 'sunnah',
    arabicLabel: 'صلاة الوتر',
    points: 15,
    details: 'ইশার পর ৩ রাকাত বিতর ওয়াজিব নামাজ আদায়',
  },
  {
    id: 'fajr_sunnah',
    label: 'Fajr Sunnah (ফজরের সুন্নতে মুয়াক্কাদা)',
    category: 'sunnah',
    arabicLabel: 'سنة الفجر',
    points: 15,
    details: 'ফরজের আগে ২ রাকাত সুন্নাতে মুয়াক্কাদা (যা দুনিয়া ও তার মধ্যকার সবকিছুর চেয়ে উত্তম)',
  },
  {
    id: 'dhuhr_sunnah',
    label: 'Dhuhr Sunnah (যোহরের সুন্নতে মুয়াক্কাদা)',
    category: 'sunnah',
    arabicLabel: 'سنة الظهر',
    points: 10,
    details: 'ফরজের পূর্বে ৪ রাকাত ও পরে ২ রাকাত সুন্নত',
  },
  {
    id: 'maghrib_sunnah',
    label: 'Maghrib Sunnah (মাগরিবের সুন্নতে মুয়াক্কাদা)',
    category: 'sunnah',
    arabicLabel: 'سنة المغرب',
    points: 10,
    details: 'মাগরিবের ৩ রাকাত ফরজের পর ২ রাকাত সুন্নত',
  },
  {
    id: 'isha_sunnah',
    label: 'Isha Sunnah (ইশার সুন্নতে মুয়াক্কাদা)',
    category: 'sunnah',
    arabicLabel: 'سنة العشاء',
    points: 10,
    details: 'ইশার ৪ রাকাত ফরজের পর ২ রাকাত সুন্নত',
  },
  {
    id: 'tahajjud',
    label: 'Tahajjud Prayer (তাহাজ্জুদ নামাজ)',
    category: 'sunnah',
    arabicLabel: 'صلاة التهجد',
    points: 20,
    details: 'রাতের শেষ তৃতীয়াংশে নফল সালাত ও কিয়ামুল লাইল',
  },
  {
    id: 'duha',
    label: 'Duha / Chasht Prayer (চাশতের নামাজ)',
    category: 'sunnah',
    arabicLabel: 'صلاة الضحى',
    points: 10,
    details: 'সূর্যোদয়ের পর চাশতের নফল নামাজ (৩৬০ জোড়ার সদকা)',
  },
  {
    id: 'awwabin',
    label: 'Awwabin Prayer (আওয়াবিনের নামাজ)',
    category: 'sunnah',
    arabicLabel: 'صلاة الأوابين',
    points: 10,
    details: 'মাগরিবের পর ৬ রাকাত নফল নামাজ',
  },
  {
    id: 'ishraq',
    label: 'Ishraq Prayer (ইশরাকের নামাজ)',
    category: 'sunnah',
    arabicLabel: 'صلاة الإشراق',
    points: 10,
    details: 'ফজরের পর সূর্য সম্পূর্ণ উদিত হওয়ার পর ২ রাকাত সালাত',
  },

  // 3. কুরআন ও জিকির (Quran & Dhikr)
  {
    id: 'quran_recitation',
    label: 'Quran Tilawah (কুরআন তিলাওয়াত করেছি)',
    category: 'quran',
    arabicLabel: 'تلاوة القرآن',
    points: 15,
    details: 'অর্থ ও তাজবিদসহ নিয়মিত কুরআন পাঠ ও তিলাওয়াত',
  },
  {
    id: 'quran_hifz',
    label: 'Quran Hifz / Memorization (কুরআন হিফজ বা মুখস্থ করেছি)',
    category: 'quran',
    arabicLabel: 'حفظ القرآن',
    points: 15,
    details: 'নতুন সূরা মুখস্থ বা মুখস্থ সূরার পুনরাবৃত্তি / রিভিশন',
  },
  {
    id: 'daily_tasbeeh',
    label: 'Daily Tasbeeh (দৈনিক তাসবিহ / জিকির করেছি)',
    category: 'quran',
    arabicLabel: 'الأذكار اليومية',
    points: 15,
    details: 'সুবহানাল্লাহ, আলহামদুলিল্লাহ, আল্লাহু আকবার, লা ইলাহা ইল্লাল্লাহ',
  },
  {
    id: 'istighfar_100',
    label: 'Daily Istighfar (ইস্তেগফার করেছি)',
    category: 'quran',
    arabicLabel: 'الاستغفار',
    points: 10,
    details: 'যেমন: ১০০ বার, ৫০০ বার, ১০০০ বার "আস্তাগফিরুল্লাহ"',
  },
  {
    id: 'salawat_prophet',
    label: 'Salawat on Prophet ﷺ (দরুদ শরিফ পড়েছি)',
    category: 'quran',
    arabicLabel: 'الصلاة على النبي',
    points: 10,
    details: 'রাসূলুল্লাহ ﷺ এর প্রতি ভক্তিভরে দরুদ শরিফ পাঠ',
  },
  {
    id: 'asmaul_husna',
    label: 'Asmaul Husna (আসমাউল হুসনা পাঠ করেছি)',
    category: 'quran',
    arabicLabel: 'أسماء الله الحسنى',
    points: 10,
    details: 'আল্লাহ তাআলার ৯৯টি সুন্দরতম নাম স্মরণ ও পাঠ',
  },
  {
    id: 'sayyidul_istighfar',
    label: 'Sayyidul Istighfar (সাইয়্যিদুল ইস্তিগফার পাঠ করেছি)',
    category: 'quran',
    arabicLabel: 'سيد الاستغفار',
    points: 10,
    details: 'শ্রেষ্ঠ ক্ষমাপ্রার্থনার দোয়া পাঠ',
  },

  // 4. সকাল-সন্ধ্যা আমল (Morning & Evening Adhkar)
  {
    id: 'morning_adhkar',
    label: 'Morning Adhkar (সকাল বেলার আমল)',
    category: 'morning_evening',
    arabicLabel: 'أذكار الصباح',
    points: 15,
    details: 'সকালের মাসনুন দোয়া ও আত্মরক্ষার তাসবীহসমূহ',
  },
  {
    id: 'evening_adhkar',
    label: 'Evening Adhkar (সন্ধ্যা বেলার আমল)',
    category: 'morning_evening',
    arabicLabel: 'أذكار المساء',
    points: 15,
    details: 'সন্ধ্যার মাসনুন হেফাজতের দোয়া ও জিকিরসমূহ',
  },
  {
    id: 'three_quls',
    label: 'Three Quls (সূরা ইখলাস, ফালাক ও নাস ৩ বার)',
    category: 'morning_evening',
    arabicLabel: 'المعوذات',
    points: 10,
    details: 'সকাল ও সন্ধ্যায় ৩ বার করে ৩ কুল তিলাওয়াত',
  },
  {
    id: 'morning_evening_adhkar',
    label: 'Fortress Adhkar (সকাল-সন্ধ্যার হেফাজতের দোয়া)',
    category: 'morning_evening',
    arabicLabel: 'حصن المسلم',
    points: 10,
    details: 'বিসমিল্লাহিল্লাজি লা ইয়াদুররু ও অন্যান্য দোয়া',
  },

  // 5. ঘুমানোর আগের আমল (Bedtime Sunnah & Adhkar)
  {
    id: 'surah_mulk',
    label: 'Surah Al-Mulk (সূরা মুলক তিলাওয়াত)',
    category: 'bedtime',
    arabicLabel: 'سورة الملك',
    points: 15,
    details: 'কবরের আজাব থেকে মুক্তির জন্য প্রতি রাতে সূরা মুলক পাঠ',
  },
  {
    id: 'surah_ikhlas_falaq_nas',
    label: '3 Quls Blow (সূরা ইখলাস, ফালাক ও নাস ফুঁ দেওয়া)',
    category: 'bedtime',
    arabicLabel: 'النفث بالمعوذات',
    points: 10,
    details: 'দুই হাত একত্র করে ৩ কুল পড়ে পুরো শরীরে মুছে নেওয়া',
  },
  {
    id: 'ayatul_kursi',
    label: 'Ayatul Kursi (আয়াতুল কুরসি)',
    category: 'bedtime',
    arabicLabel: 'آية الكرسي',
    points: 10,
    details: 'রাতে শয়তান ও অনিষ্ট থেকে সুরক্ষার জন্য আয়াতুল কুরসি পাঠ',
  },
  {
    id: 'baqarah_last_2',
    label: 'Last 2 Ayahs of Al-Baqarah (সূরা বাকারার শেষ ২ আয়াত)',
    category: 'bedtime',
    arabicLabel: 'خواتيم سورة البقرة',
    points: 10,
    details: 'রাতে আমানার রাসূল থেকে শেষ পর্যন্ত পাঠ করা',
  },
  {
    id: 'sleeping_sunnah',
    label: 'Sleeping Sunnah (ঘুমানোর দোয়া ও অজু অবস্থায় ঘুমানো)',
    category: 'bedtime',
    arabicLabel: 'سنن النوم',
    points: 10,
    details: 'ডান কাতে ঘুমানো ও ঘুমানোর মাসনুন দোয়া পড়া',
  },

  // 6. চরিত্র ও নৈতিকতা (Character & Akhlaq)
  {
    id: 'no_lying',
    label: 'Avoided Lying (মিথ্যা বলিনি)',
    category: 'character',
    arabicLabel: 'الصدق وعدم الكذب',
    points: 10,
    details: 'সকল প্রকার অসততা ও মিথ্যা পরিহার করে সত্যবাদী থাকা',
  },
  {
    id: 'no_ghibat',
    label: 'No Backbiting (গীবত করিনি)',
    category: 'character',
    arabicLabel: 'اجتناب الغيبة',
    points: 10,
    details: 'পরনিন্দা করা ও শোনা থেকে নিজের জিহ্বা ও কানকে রক্ষা করা',
  },
  {
    id: 'control_anger',
    label: 'Controlled Anger (রাগ নিয়ন্ত্রণ করেছি)',
    category: 'character',
    arabicLabel: 'كظم الغيظ',
    points: 10,
    details: 'উত্তেজনার মুহূর্তে নিজেকে শান্ত রাখা ও ক্ষমা প্রদর্শন',
  },
  {
    id: 'guard_eyes',
    label: 'Guarded Gaze (হারাম থেকে চোখ বাঁচিয়েছি)',
    category: 'character',
    arabicLabel: 'غض البصر',
    points: 10,
    details: 'চোখের হেফাজত ও বেগানা বা হারাম দৃশ্য থেকে দৃষ্টি নত রাখা',
  },
  {
    id: 'proper_time_use',
    label: 'Valued Time (সময়ের সদ্ব্যবহার করেছি)',
    category: 'character',
    arabicLabel: 'حفظ الوقت',
    points: 10,
    details: 'অনর্থক কাজ পরিহার করে সময়কে গঠনমূলক কাজে লাগানো',
  },
  {
    id: 'fulfill_promises',
    label: 'Kept Promises & Trust (ওয়াদা রক্ষা ও আমানতদারি)',
    category: 'character',
    arabicLabel: 'أداء الأمانة والعهد',
    points: 10,
    details: 'দেওয়া কথা রাখা এবং মানুষের সাথে সততা বজায় রাখা',
  },

  // 7. ইলম ও দাওয়াহ (Knowledge & Dawah)
  {
    id: 'daily_ilm',
    label: 'Sought Islamic Knowledge (আজকে দ্বীনি ইলম অর্জন করেছি)',
    category: 'knowledge',
    arabicLabel: 'طلب العلم الشرعي',
    points: 15,
    details: 'হাদিস, তাফসির বা কোনো নির্ভরযোগ্য দ্বীনি বই অধ্যয়ন',
  },
  {
    id: 'daily_dawah',
    label: 'Gave Dawah & Good Advice (আজকে দাওয়াহ দিয়েছি)',
    category: 'knowledge',
    arabicLabel: 'الدعوة إلى الله',
    points: 15,
    details: 'কাউকে ভালো কাজের পরামর্শ দেওয়া বা দ্বীনের দাওয়াত পৌঁছে দেওয়া',
  },

  // 8. সামাজিক ও পারিবারিক (Social & Family Duties)
  {
    id: 'parents_duty',
    label: 'Honored Parents (বাবা-মায়ের সাথে কথা বলেছি ও খেদমত করেছি)',
    category: 'social',
    arabicLabel: 'بر الوالدين',
    points: 15,
    details: 'পিতামাতার সাথে বিনম্র আচরণ ও তাদের সেবায় অংশ নেওয়া',
  },
  {
    id: 'relatives_care',
    label: 'Connected with Relatives (আত্মীয়দের খোঁজ নিয়েছি - সিলাহ রেহমি)',
    category: 'social',
    arabicLabel: 'صلة الرحم',
    points: 10,
    details: 'রক্তের সম্পর্কের আত্মীয়স্বজনের খোঁজখবর নেওয়া ও সুসম্পর্ক রক্ষা',
  },
  {
    id: 'sadaqah',
    label: 'Gave Sadaqah (সদকাহ করেছি)',
    category: 'social',
    arabicLabel: 'الصدقة والإنفاق',
    points: 10,
    details: 'গরিব-অসহায়কে দান বা আল্লাহর সন্তুষ্টিতে অর্থ খরচ',
  },
  {
    id: 'help_others',
    label: 'Helped Someone (কাউকে সাহায্য করেছি / হাসিমুখে কথা বলেছি)',
    category: 'social',
    arabicLabel: 'إعانة المحتاج والتبسم',
    points: 10,
    details: 'অন্যের উপকারে এগিয়ে আসা এবং হাসিমুখে অভ্যর্থনা জানানো',
  },
  {
    id: 'gratitude_reflection',
    label: 'Gratitude & Shukr (শোকরগুজারি / আল্লাহর প্রতি শুকরিয়া)',
    category: 'social',
    arabicLabel: 'شكر الله تعالى',
    points: 10,
    details: 'আল্লাহর অফুরন্ত নিয়ামতের জন্য অন্তর থেকে আলহামদুলিল্লাহ বলা',
  },
];

export function getTodayDateKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function createInitialDayLog(dateKey: string = getTodayDateKey()): AamalDayLog {
  const items: AamalCheckItem[] = DEFAULT_AAMAL_ITEMS.map((item) => ({
    ...item,
    completed: false,
  }));

  return {
    dateKey,
    items,
    quranPagesRead: 0,
    dhikrCount: 0,
    reflectionNotes: '',
    completedRatio: 0,
  };
}

export function getAamalLogForDate(dateKey: string): AamalDayLog {
  try {
    const raw = localStorage.getItem(`zikrmate_aamal_${dateKey}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.items)) {
        // Merge with DEFAULT_AAMAL_ITEMS to ensure all new categories and items exist
        const existingMap = new Map<string, boolean>(
          parsed.items.map((i: AamalCheckItem) => [i.id, !!i.completed])
        );
        const mergedItems: AamalCheckItem[] = DEFAULT_AAMAL_ITEMS.map((def) => ({
          ...def,
          completed: Boolean(existingMap.get(def.id)),
        }));

        const completedCount = mergedItems.filter((i) => i.completed).length;
        const completedRatio = mergedItems.length > 0 ? completedCount / mergedItems.length : 0;

        return {
          ...parsed,
          items: mergedItems,
          completedRatio,
        };
      }
    }
  } catch (e) {
    console.error('Failed to get aamal log for date', dateKey, e);
  }
  return createInitialDayLog(dateKey);
}

export function saveAamalLogForDate(dateKey: string, log: AamalDayLog): void {
  try {
    localStorage.setItem(`zikrmate_aamal_${dateKey}`, JSON.stringify(log));
  } catch (e) {
    console.error('Failed to save aamal log for date', dateKey, e);
  }
}

/**
 * Permanently records a zikr tap into today's Aamal Tracker history.
 * Even if the user resets their live counter to 0, this history remains intact!
 */
export function recordZikrIncrementInAamal(
  zikr: { name: string; target?: number; arabic?: string; transliteration?: string },
  incrementBy: number = 1,
  dateKey: string = getTodayDateKey()
): void {
  try {
    const dayLog = getAamalLogForDate(dateKey);
    dayLog.dhikrCount = (dayLog.dhikrCount || 0) + incrementBy;

    if (!dayLog.zikrBreakdown) {
      dayLog.zikrBreakdown = [];
    }

    const existingIndex = dayLog.zikrBreakdown.findIndex(
      (z) => z.name === zikr.name || (zikr.arabic && z.arabic === zikr.arabic)
    );

    if (existingIndex >= 0) {
      dayLog.zikrBreakdown[existingIndex].count =
        (dayLog.zikrBreakdown[existingIndex].count || 0) + incrementBy;
      if (zikr.target) dayLog.zikrBreakdown[existingIndex].target = zikr.target;
    } else {
      dayLog.zikrBreakdown.push({
        name: zikr.name,
        count: incrementBy,
        target: zikr.target,
        arabic: zikr.arabic,
        transliteration: zikr.transliteration,
      });
    }

    // Auto-complete daily tasbeeh when milestone reached
    const tasbeehItem = dayLog.items.find((i) => i.id === 'daily_tasbeeh');
    if (tasbeehItem && !tasbeehItem.completed && dayLog.dhikrCount >= 33) {
      tasbeehItem.completed = true;
    }

    const zikrNameLower = (zikr.name + ' ' + (zikr.transliteration || '')).toLowerCase();
    if (zikrNameLower.includes('istighfar') || zikrNameLower.includes('astaghfirullah')) {
      const istighfarItem = dayLog.items.find((i) => i.id === 'istighfar_100');
      const itemBreakdown = dayLog.zikrBreakdown.find((z) => z.name === zikr.name);
      if (istighfarItem && (itemBreakdown?.count || 0) >= 100) {
        istighfarItem.completed = true;
      }
    }

    if (
      zikrNameLower.includes('salawat') ||
      zikrNameLower.includes('durood') ||
      zikrNameLower.includes('sallallahu')
    ) {
      const salawatItem = dayLog.items.find((i) => i.id === 'salawat_prophet');
      const itemBreakdown = dayLog.zikrBreakdown.find((z) => z.name === zikr.name);
      if (salawatItem && (itemBreakdown?.count || 0) >= 100) {
        salawatItem.completed = true;
      }
    }

    const completedCount = dayLog.items.filter((i) => i.completed).length;
    dayLog.completedRatio = dayLog.items.length > 0 ? completedCount / dayLog.items.length : 0;

    saveAamalLogForDate(dateKey, dayLog);
  } catch (e) {
    console.error('Failed to record zikr increment in aamal history', e);
  }
}

export function getAllAamalLogs(): Record<string, AamalDayLog> {
  const logs: Record<string, AamalDayLog> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('zikrmate_aamal_')) {
        const dateKey = key.replace('zikrmate_aamal_', '');
        const raw = localStorage.getItem(key);
        if (raw) {
          try {
            logs[dateKey] = JSON.parse(raw);
          } catch {}
        }
      }
    }
  } catch (e) {
    console.error('Failed to iterate aamal logs', e);
  }
  return logs;
}

export function downloadFile(content: string, fileName: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportAamalHistoryToCsv(monthFilter?: string): void {
  const allLogs = getAllAamalLogs();
  const sortedDates = Object.keys(allLogs).sort().reverse();
  const filteredDates = monthFilter
    ? sortedDates.filter((d) => d.startsWith(monthFilter))
    : sortedDates;

  if (filteredDates.length === 0) {
    filteredDates.push(getTodayDateKey());
    allLogs[getTodayDateKey()] = getAamalLogForDate(getTodayDateKey());
  }

  const headers = [
    'Date (তারিখ)',
    'Total Completed Amals',
    'Completion Rate (%)',
    'Fajr (ফজর)',
    'Dhuhr (যোহর)',
    'Asr (আসর)',
    'Maghrib (মাগরিব)',
    'Isha (এশা)',
    'Jamat (জামাতে ফরজ)',
    'Witr (বিতর)',
    'Tahajjud (তাহাজ্জুদ)',
    'Duha (চাশত)',
    'Quran Recitation (কুরআন তিলাওয়াত)',
    'Quran Pages (কুরআন পৃষ্ঠা)',
    'Morning Adhkar (সকাল বেলার আমল)',
    'Evening Adhkar (সন্ধ্যা বেলার আমল)',
    'Surah Mulk (সূরা মুলক)',
    'Ayatul Kursi (আয়াতুল কুরসি)',
    'Salawat (দরুদ শরিফ)',
    'Istighfar (ইস্তেগফার)',
    'Truthful (মিথ্যা বলিনি)',
    'No Ghibat (গীবত করিনি)',
    'Total Zikr Count (সর্বমোট জিকির)',
    'Detailed Zikr Breakdown (কোন জিকির কত বার)',
    'Reflection Notes (মন্তব্য / অনুচিন্তা)',
  ];

  const rows = filteredDates.map((date) => {
    const log = allLogs[date] || createInitialDayLog(date);
    const itemMap = new Map(log.items.map((i) => [i.id, i.completed ? 'YES' : 'NO']));
    const completedCount = log.items.filter((i) => i.completed).length;
    const rate = Math.round((completedCount / (log.items.length || 1)) * 100);

    const safeNotes = `"${(log.reflectionNotes || '').replace(/"/g, '""')}"`;
    const zikrDetailsStr = log.zikrBreakdown && log.zikrBreakdown.length > 0
      ? `"${log.zikrBreakdown
          .filter((z) => z.count > 0)
          .map((z) => `${z.name} (${z.arabic || ''}): ${z.count} বার`)
          .join('; ')}"`
      : `"${log.dhikrCount > 0 ? `Total Zikrs: ${log.dhikrCount}` : 'None'}"`;

    return [
      date,
      `${completedCount}/${log.items.length}`,
      `${rate}%`,
      itemMap.get('fajr') || 'NO',
      itemMap.get('dhuhr') || 'NO',
      itemMap.get('asr') || 'NO',
      itemMap.get('maghrib') || 'NO',
      itemMap.get('isha') || 'NO',
      itemMap.get('jamat_fardh') || 'NO',
      itemMap.get('witr') || 'NO',
      itemMap.get('tahajjud') || 'NO',
      itemMap.get('duha') || 'NO',
      itemMap.get('quran_recitation') || 'NO',
      log.quranPagesRead || 0,
      itemMap.get('morning_adhkar') || 'NO',
      itemMap.get('evening_adhkar') || 'NO',
      itemMap.get('surah_mulk') || 'NO',
      itemMap.get('ayatul_kursi') || 'NO',
      itemMap.get('salawat_prophet') || 'NO',
      itemMap.get('istighfar_100') || 'NO',
      itemMap.get('no_lying') || 'NO',
      itemMap.get('no_ghibat') || 'NO',
      log.dhikrCount || 0,
      zikrDetailsStr,
      safeNotes,
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
  const fileName = `ZikrMate_Muhasabah_Amal_History_${monthFilter || 'Full'}.csv`;
  downloadFile(csvContent, fileName, 'text/csv;charset=utf-8;');
}

export function exportAamalHistoryToJson(): void {
  const allLogs = getAllAamalLogs();
  const jsonStr = JSON.stringify(allLogs, null, 2);
  downloadFile(jsonStr, `ZikrMate_Muhasabah_Backup_${getTodayDateKey()}.json`, 'application/json');
}

