import { ZikrLanguage } from '../types';
import { NobiTimeSlot, NobiChapter, NobiDuaItem, NobiDailyCheckItem } from '../data/nobi24HoursData';

export interface Nobi24UIStrings {
  title: string;
  subtitle: string;
  arabicTitle: string;
  backToHub: string;
  tabs: {
    wheel: string;
    timeline: string;
    articles: string;
    duas: string;
    tracker: string;
  };
  liveBanner: {
    nowInRoutine: string;
    currentHour: string;
    liveActionPrompt: string;
    viewDetails: string;
  };
  categories: {
    spiritual: string;
    social: string;
    physical: string;
    family: string;
  };
  filters: {
    all: string;
    dawnMorning: string;
    middayAfternoon: string;
    eveningNight: string;
  };
  timeline: {
    title: string;
    subtitle: string;
    actionsCount: string;
    hadithProof: string;
    masnunDua: string;
    step: string;
  };
  wheel: {
    title: string;
    subtitle: string;
    clickToInspect: string;
    selectedSlot: string;
    sunnahActions: string;
    hadithQuote: string;
    duaOfSlot: string;
  };
  articles: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    chapterNumber: string;
    readingTime: string;
    coreTakeaways: string;
    quranRef: string;
    hadithRef: string;
  };
  duas: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    timing: string;
    benefit: string;
    reference: string;
    copyDua: string;
    copied: string;
    listenDua: string;
    stopAudio: string;
  };
  tracker: {
    title: string;
    subtitle: string;
    progressLabel: string;
    completed: string;
    markAll: string;
    reset: string;
    excellentPraise: string;
    goodPraise: string;
    startPraise: string;
  };
  common: {
    copy: string;
    copied: string;
    share: string;
    listen: string;
    audioNotSupported: string;
    sourceBook: string;
  };
}

export const NOBI_24_UI_I18N: Record<ZikrLanguage, Nobi24UIStrings> = {
  bn: {
    title: 'নবী করিম (সা.)-এর ২৪ ঘণ্টা',
    subtitle: 'নবীজির ২৪ ঘণ্টা রুটিনের আলোকে সুন্নাহ গাইডলাইন ও বরকতময় জীবনপদ্ধতি',
    arabicTitle: '٢٤ ساعة في حياة رسول الله ﷺ',
    backToHub: 'অন্যান্য ফিচার',
    tabs: {
      wheel: '২৪ ঘণ্টার ঘড়ি',
      timeline: 'ধারাবাহিক রুটিন',
      articles: 'সুন্নাহ গাইডলাইন (বই)',
      duas: 'মাসনুন দোয়াসমূহ',
      tracker: 'দৈনিক সুন্নাহ চেকলিস্ট',
    },
    liveBanner: {
      nowInRoutine: 'এখন নবীজির ২৪ ঘণ্টা রুটিনে',
      currentHour: 'বর্তমান সময়',
      liveActionPrompt: 'এই সময়ের মূল সুন্নাহ আমলটি দেখুন',
      viewDetails: 'বিস্তারিত দেখুন',
    },
    categories: {
      spiritual: 'আধ্যাত্মিক ও নামাজ',
      social: 'সামাজিক ও সেবা',
      physical: 'বিশ্রাম ও আহার',
      family: 'পারিবারিক ও ঘরকন্না',
    },
    filters: {
      all: 'সকল পর্ব (১৪টি)',
      dawnMorning: 'ভোর ও সকাল',
      middayAfternoon: 'দুপুর ও অপরাহ্ন',
      eveningNight: 'সন্ধ্যা ও রাত',
    },
    timeline: {
      title: '২৪ ঘণ্টার ধারাবাহিক ১৪টি সময় পর্ব',
      subtitle: 'সুবহে সাদিক থেকে গভীর রাত পর্যন্ত নবীজি ﷺ-এর পবিত্র দিনলিপি',
      actionsCount: 'টি সুন্নাহ আমল',
      hadithProof: 'সহিহ হাদিসের দলিল ও প্রেক্ষাপট',
      masnunDua: 'এই সময়ের বিশেষ মাসনুন দোয়া',
      step: 'পর্ব',
    },
    wheel: {
      title: '২৪ ঘণ্টার ইন্টারঅ্যাক্টিভ সুন্নাহ ডায়াল',
      subtitle: 'ঘড়ির যেকোনো সময়ে ক্লিক করে ওই ঘণ্টার সুন্নাহ আমল জানুন',
      clickToInspect: 'ঘড়ির যেকোনো ভাগে স্পর্শ করুন',
      selectedSlot: 'নির্বাচিত পর্বের সুন্নাহ আমল',
      sunnahActions: 'নবীজি ﷺ-এর ধারাবাহিক কার্যাবলি',
      hadithQuote: 'সংশ্লিষ্ট সহিহ হাদিস',
      duaOfSlot: 'এ সময়ের বিশেষ দোয়া',
    },
    articles: {
      title: 'সুন্নাহ গাইডলাইন বইয়ের ১২টি বিশেষ অধ্যায়',
      subtitle: 'সময়ের বরকত, রাত জাগার ক্ষতি, ইহসান, ১০টি হক ও পারিবারিক সুন্নত',
      searchPlaceholder: 'অধ্যায় বা বিষয় খুঁজুন (যেমন: বরকত, ঘুম, হক, ইহসান)...',
      chapterNumber: 'অধ্যায়',
      readingTime: 'মিনিট পাঠ',
      coreTakeaways: 'মূল শিক্ষা ও ব্যবহারিক আমল',
      quranRef: 'কুরআনের নির্দেশনা',
      hadithRef: 'হাদিসের রেফারেন্স',
    },
    duas: {
      title: '২৪ ঘণ্টার ১২টি অতি প্রয়োজনীয় মাসনুন দোয়া',
      subtitle: 'ঘুম ভাঙা, ওযু, মসজিদ, খাবার, ঘর থেকে বের হওয়া ও ঘুমানোর দোয়া',
      searchPlaceholder: 'দোয়া বা সময় দিয়ে খুঁজুন (যেমন: ঘুম, মসজিদ, আহার)...',
      timing: 'পড়ার মোক্ষম সময়',
      benefit: 'আমলের ফজিলত ও উপকারিতা',
      reference: 'হাদিস সূত্র',
      copyDua: 'দোয়া কপি করুন',
      copied: 'কপি হয়েছে!',
      listenDua: 'তেলাওয়াত শুনুন',
      stopAudio: 'থামান',
    },
    tracker: {
      title: 'দৈনিক সুন্নাহ আমল ট্র্যাকার',
      subtitle: 'নবীজির ২৪ ঘণ্টার প্রধান সুন্নাতগুলো আজ আদায় করেছেন কি না মিলিয়ে নিন',
      progressLabel: 'আজকের সুন্নাহ সম্পন্ন হয়েছে',
      completed: 'সম্পন্ন',
      markAll: 'সব সম্পন্ন করুন',
      reset: 'রিসেট করুন',
      excellentPraise: 'মাশাআল্লাহ! আপনি নবীজির রুটিন অনুসরণ করে চলছেন। আল্লাহ আপনার দিনে বরকত দিন!',
      goodPraise: 'আলহামদুলিল্লাহ! ভালো অগ্রগতি। বাকি সুন্নাহগুলোও সম্পন্নের চেষ্টা করুন।',
      startPraise: 'বিসমিল্লাহ বলে শুরু করুন। ছোট ছোট সুন্নাহ পালনেই নেমে আসে আল্লাহর রহমত।',
    },
    common: {
      copy: 'কপি',
      copied: 'কপি হয়েছে',
      share: 'শেয়ার',
      listen: 'শুনুন',
      audioNotSupported: 'অডিও সমর্থিত নয়',
      sourceBook: 'উৎস: নবীজির ২৪ ঘণ্টা রুটিনের আলোকে সুন্নাহ গাইডলাইন — রিদওয়ান হাসান',
    },
  },

  en: {
    title: "The Prophet's 24-Hour Routine",
    subtitle: "Sunnah Guidelines & Daily Life Pattern Based on the Blessed 24 Hours of Prophet Muhammad ﷺ",
    arabicTitle: '٢٤ ساعة في حياة رسول الله ﷺ',
    backToHub: 'Other Features',
    tabs: {
      wheel: '24H Sunnah Wheel',
      timeline: 'Timeline Routine',
      articles: 'Book Guidelines',
      duas: 'Masnun Duas',
      tracker: 'Daily Sunnah Tracker',
    },
    liveBanner: {
      nowInRoutine: "Now in the Prophet's ﷺ Day",
      currentHour: 'Current Time',
      liveActionPrompt: "Discover the Prophet's action for this hour",
      viewDetails: 'View Details',
    },
    categories: {
      spiritual: 'Spiritual & Prayer',
      social: 'Social & Service',
      physical: 'Rest & Meals',
      family: 'Family & Home',
    },
    filters: {
      all: 'All 14 Slots',
      dawnMorning: 'Dawn & Morning',
      middayAfternoon: 'Midday & Afternoon',
      eveningNight: 'Evening & Night',
    },
    timeline: {
      title: '14 Chronological Daily Segments',
      subtitle: 'From dawn (Subh Sadiq) to late night in the footsteps of the Messenger ﷺ',
      actionsCount: 'Sunnah acts',
      hadithProof: 'Authentic Hadith Evidence',
      masnunDua: 'Special Masnun Dua for this segment',
      step: 'Part',
    },
    wheel: {
      title: 'Interactive 24-Hour Sunnah Dial',
      subtitle: 'Click or touch any hour slice to reveal the prophetic actions and duas',
      clickToInspect: 'Tap any slice on the clock',
      selectedSlot: 'Prophetic Sunnah for Selected Time',
      sunnahActions: 'Sequence of Prophetic Actions',
      hadithQuote: 'Authentic Hadith Citation',
      duaOfSlot: 'Supplication of This Slot',
    },
    articles: {
      title: '12 Chapters from the Sunnah Guideline Book',
      subtitle: 'Barakah of time, late-night hazards, Ihsan, 10 core rights & home life',
      searchPlaceholder: 'Search chapters (e.g. Barakah, sleep, rights, Ihsan)...',
      chapterNumber: 'Chapter',
      readingTime: 'min read',
      coreTakeaways: 'Core Lessons & Practical Actions',
      quranRef: 'Quranic Directive',
      hadithRef: 'Hadith Reference',
    },
    duas: {
      title: '12 Essential Daily Masnun Duas',
      subtitle: 'From waking up to sleep: authentic supplications with Arabic, meaning & virtues',
      searchPlaceholder: 'Search duas (e.g. sleep, mosque, waking, food)...',
      timing: 'Optimal Timing',
      benefit: 'Virtues & Spiritual Benefits',
      reference: 'Hadith Citation',
      copyDua: 'Copy Dua',
      copied: 'Copied!',
      listenDua: 'Listen Recitation',
      stopAudio: 'Stop',
    },
    tracker: {
      title: 'Daily Prophetic Sunnah Tracker',
      subtitle: 'Track your daily adherence to the primary 24-hour Sunnah routine',
      progressLabel: "Today's Sunnah Completed",
      completed: 'Completed',
      markAll: 'Mark All Complete',
      reset: 'Reset Tracker',
      excellentPraise: "Masha'Allah! You are closely following the Prophet's ﷺ path. May Allah bless your day!",
      goodPraise: 'Alhamdulillah! Great progress. Strive to complete the remaining Sunnahs.',
      startPraise: 'Begin with Bismillah. Reviving even one Sunnah brings divine blessing into your day.',
    },
    common: {
      copy: 'Copy',
      copied: 'Copied',
      share: 'Share',
      listen: 'Listen',
      audioNotSupported: 'Audio playback unsupported',
      sourceBook: "Source: Sunnah Guideline Based on the Prophet's 24 Hours — Ridwan Hasan",
    },
  },

  ar: {
    title: '٢٤ ساعة في حياة النبي ﷺ',
    subtitle: 'دليل السنة النبوية ومنهج الحياة اليومية للرسول الكريم ﷺ',
    arabicTitle: '٢٤ ساعة في حياة رسول الله ﷺ',
    backToHub: 'الميزات الأخرى',
    tabs: {
      wheel: 'عجلة ٢٤ ساعة',
      timeline: 'الجدول الزمني',
      articles: 'فصول الكتاب',
      duas: 'الأدعية المأثورة',
      tracker: 'متتبع السنن اليومي',
    },
    liveBanner: {
      nowInRoutine: 'الآن في جدول النبي ﷺ',
      currentHour: 'الوقت الحالي',
      liveActionPrompt: 'اكتشف سنة هذا الوقت المبارك',
      viewDetails: 'عرض التفاصيل',
    },
    categories: {
      spiritual: 'العبادة والصلاة',
      social: 'المجتمع والخدمة',
      physical: 'الراحة والطعام',
      family: 'الأسرة والبيت',
    },
    filters: {
      all: 'جميع الأوقات (١٤)',
      dawnMorning: 'الفجر والصباح',
      middayAfternoon: 'الظهر والعصر',
      eveningNight: 'المغرب والليل',
    },
    timeline: {
      title: '١٤ مرحلة زمنية متسلسلة في اليوم واللبلة',
      subtitle: 'من الصبح الصادق إلى هدأة الليل في رحاب هدي المصطفى ﷺ',
      actionsCount: 'سنة نبوية',
      hadithProof: 'الدليل من الحديث الصحيح',
      masnunDua: 'دعاء هذه الفترة المباركة',
      step: 'المرحلة',
    },
    wheel: {
      title: 'قرص السنن التفاعلي لـ ٢٤ ساعة',
      subtitle: 'انقر على أي ساعة لمعرفة أعمال وأذكار النبي ﷺ فيها',
      clickToInspect: 'المس أي جزء من القرص',
      selectedSlot: 'سنن هذا الوقت المحدد',
      sunnahActions: 'أعمال النبي ﷺ المتسلسلة',
      hadithQuote: 'الحديث الشريف',
      duaOfSlot: 'دعاء هذا الوقت',
    },
    articles: {
      title: '١٢ فصلاً من كتاب هدي السنة النبوية',
      subtitle: 'بركة الوقت، آفات السهر، الإحسان في العمل، الحقوق العشرة، وهدي البيت',
      searchPlaceholder: 'ابحث في الفصول (البركة، النوم، الحقوق، الإحسان)...',
      chapterNumber: 'الفصل',
      readingTime: 'دقائق للقراءة',
      coreTakeaways: 'الدروس المستفادة والعمل',
      quranRef: 'التوجيه القرآني',
      hadithRef: 'مصدر الحديث',
    },
    duas: {
      title: '١٢ دعاءً مأثوراً لليوم والليلة',
      subtitle: 'من الاستيقاظ إلى النوم: أدعية صحيحة مع الفضل والمعنى',
      searchPlaceholder: 'ابحث عن دعاء (الاستيقاظ، المسجد، الطعام)...',
      timing: 'الوقت المستحب',
      benefit: 'فضل الدعاء وثمرته',
      reference: 'تخريج الحديث',
      copyDua: 'نسخ الدعاء',
      copied: 'تم النسخ!',
      listenDua: 'استماع للتلاوة',
      stopAudio: 'إيقاف',
    },
    tracker: {
      title: 'متتبع السنن النبوية اليومي',
      subtitle: 'تابع التزامك بسنن النبي ﷺ طوال الـ ٢٤ ساعة',
      progressLabel: 'نسبة إنجاز سنن اليوم',
      completed: 'مكتمل',
      markAll: 'تحديد الكل كمكتمل',
      reset: 'إعادة ضبط',
      excellentPraise: 'ما شاء الله! أنت تسير على نهج الحبيب المصطفى ﷺ. بارك الله في يومك!',
      goodPraise: 'الحمد لله! تقدم رائع، واصل إحياء بقية السنن النبوية.',
      startPraise: 'ابدأ ببسم الله، فإحياء سنة واحدة ينزل البركة في حياتك.',
    },
    common: {
      copy: 'نسخ',
      copied: 'تم النسخ',
      share: 'مشاركة',
      listen: 'استماع',
      audioNotSupported: 'التشغيل الصوتي غير مدعوم',
      sourceBook: 'المصدر: إرشادات السنة في ضوء ٢٤ ساعة للنبي ﷺ — رضوان حسن',
    },
  },

  ur: {
    title: 'نبی کریم ﷺ کے ۲۴ گھنٹے',
    subtitle: 'نبی اکرم ﷺ کے ۲۴ گھنٹے کے مبارک معمول کی روشنی میں سنت گائیڈ لائن',
    arabicTitle: '٢٤ ساعة في حياة رسول الله ﷺ',
    backToHub: 'دیگر اسلامی فیچرز',
    tabs: {
      wheel: '۲۴ گھنٹے کا پہیہ',
      timeline: 'ترتیب وار معمول',
      articles: 'سنت گائیڈ لائن (کتاب)',
      duas: 'مسنون دعائیں',
      tracker: 'روزانہ سنت ٹریکر',
    },
    liveBanner: {
      nowInRoutine: 'اب نبی کریم ﷺ کے معمول میں',
      currentHour: 'موجودہ وقت',
      liveActionPrompt: 'اس وقت کی سنت اور عمل جانیے',
      viewDetails: 'تفصیل دیکھیں',
    },
    categories: {
      spiritual: 'روحانی و نماز',
      social: 'معاشرتی و خدمت',
      physical: 'آرام و طعام',
      family: 'گھریلو و خاندانی',
    },
    filters: {
      all: 'تمام اوقات (۱۴)',
      dawnMorning: 'صبح و فجر',
      middayAfternoon: 'دوپہر و عصر',
      eveningNight: 'شام و رات',
    },
    timeline: {
      title: '۲۴ گھنٹے کے ۱۴ تسلسل وار اوقات',
      subtitle: 'صبح صادق سے لے کر رات کے آخری پہر تک نبی کریم ﷺ کا مبارک معمول',
      actionsCount: 'سنت اعمال',
      hadithProof: 'صحیح احادیث کے دلائل',
      masnunDua: 'اس وقت کی مسنون دعا',
      step: 'حصہ',
    },
    wheel: {
      title: '۲۴ گھنٹے کا انٹرایکٹو سنن ڈائل',
      subtitle: 'گھڑی کے کسی بھی حصے پر کلک کر کے اس وقت کی سنتیں معلوم کریں',
      clickToInspect: 'گھڑی کے کسی حصے پر ٹچ کریں',
      selectedSlot: 'منتخب وقت کی سنتیں',
      sunnahActions: 'نبی کریم ﷺ کے مبارک معمولات',
      hadithQuote: 'متعلقہ صحیح حدیث',
      duaOfSlot: 'اس وقت کی دعا',
    },
    articles: {
      title: 'سنت گائیڈ لائن کتاب کے ۱۲ اہم ابواب',
      subtitle: 'وقت کی برکت، رات جاگنے کے نقصانات، احسان، ۱۰ حقوق اور گھریلو زندگی',
      searchPlaceholder: 'موضوع تلاش کریں (برکت، نیند، احسان، حقوق)...',
      chapterNumber: 'باب',
      readingTime: 'منٹ مطالعہ',
      coreTakeaways: 'بنیادی اسباق و عملی نکات',
      quranRef: 'قرآنی ہدایت',
      hadithRef: 'حدیث کا حوالہ',
    },
    duas: {
      title: 'روزمرہ کی ۱۲ ضروری مسنون دعائیں',
      subtitle: 'نیند سے بیداری، وضو، مسجد، کھانا اور سونے کی دعائیں',
      searchPlaceholder: 'دعا تلاش کریں (نیند، مسجد، کھانا)...',
      timing: 'پڑھنے کا وقت',
      benefit: 'فضیلت و روحانی فوائد',
      reference: 'حدیث کا حوالہ',
      copyDua: 'دعا کاپی کریں',
      copied: 'کاپی ہو گئی!',
      listenDua: 'تلاوت سنیں',
      stopAudio: 'روکیں',
    },
    tracker: {
      title: 'روزانہ سنت اعمال ٹریکر',
      subtitle: 'آج آپ نے نبی کریم ﷺ کی کون کون سی سنتیں ادا کیں، چیک کیجیے',
      progressLabel: 'آج کی مکمل شدہ سنتیں',
      completed: 'مکمل',
      markAll: 'سب مکمل کریں',
      reset: 'ری سیٹ کریں',
      excellentPraise: 'ماشاءاللہ! آپ نبی کریم ﷺ کے مبارک راستے پر گامزن ہیں۔ اللہ برکت دے!',
      goodPraise: 'الحمد للہ! بہت عمدہ پیش رفت، باقی سنتوں پر بھی عمل کی کوشش کریں۔',
      startPraise: 'بسم اللہ کہہ کر شروع کیجیے، ایک سنت پر عمل بھی رحمت کا سبب ہے۔',
    },
    common: {
      copy: 'کاپی',
      copied: 'کاپی ہو گیا',
      share: 'شیئر',
      listen: 'سنیں',
      audioNotSupported: 'آڈیو سپورٹ موجود نہیں',
      sourceBook: 'ماخذ: نبی کریم ﷺ کے ۲۴ گھنٹے کے معمول کے تناظر میں سنت گائیڈ لائن — رضوان حسن',
    },
  },

  hi: {
    title: 'नबी करीम (स.) के २४ घंटे',
    subtitle: 'पैगंबर मुहम्मद ﷺ के २४ घंटे की दिनचर्या पर आधारित सुन्नत गाइडलाइन',
    arabicTitle: '٢٤ ساعة في حياة رسول الله ﷺ',
    backToHub: 'अन्य फीचर्स',
    tabs: {
      wheel: '२४ घंटे का चक्र',
      timeline: 'दैनिक दिनचर्या',
      articles: 'सुन्नत गाइडलाइन',
      duas: 'मसनून दुआएं',
      tracker: 'सुन्नत ट्रैकर',
    },
    liveBanner: {
      nowInRoutine: 'अभी नबीजी ﷺ की दिनचर्या में',
      currentHour: 'वर्तमान समय',
      liveActionPrompt: 'इस समय का सुन्नत अमल देखें',
      viewDetails: 'विवरण देखें',
    },
    categories: {
      spiritual: 'आध्यात्मिक व नमाज़',
      social: 'सामाजिक व सेवा',
      physical: 'विश्राम व भोजन',
      family: 'परिवार व घर',
    },
    filters: {
      all: 'सभी १४ भाग',
      dawnMorning: 'भोर व सुबह',
      middayAfternoon: 'दोपहर व असर',
      eveningNight: 'शाम व रात',
    },
    timeline: {
      title: '२४ घंटे के १४ क्रमिक भाग',
      subtitle: 'सुबह सादिक से रात तक नबी ﷺ की पाकीज़ा दिनचर्या',
      actionsCount: 'सुन्नत अमल',
      hadithProof: 'हदीस के प्रमाण',
      masnunDua: 'इस समय की मसनून दुआ',
      step: 'भाग',
    },
    wheel: {
      title: '२४ घंटे का इंटरएक्टिव सुन्नत डायल',
      subtitle: 'घड़ी के किसी भी भाग पर क्लिक करके उस समय की सुन्नत जानें',
      clickToInspect: 'घड़ी पर स्पर्श करें',
      selectedSlot: 'चयनित समय की सुन्नतें',
      sunnahActions: 'नबीजी ﷺ के पाकीज़ा अमल',
      hadithQuote: 'संबंधित सहीह हदीस',
      duaOfSlot: 'इस समय की दुआ',
    },
    articles: {
      title: 'सुन्नत गाइडलाइन पुस्तक के १२ महत्वपूर्ण अध्याय',
      subtitle: 'समय की बरकत, देर रात जागने के नुकसान, एहसान, १० अधिकार व पारिवारिक जीवन',
      searchPlaceholder: 'अध्याय खोजें (बरकत, नींद, एहसान)...',
      chapterNumber: 'अध्याय',
      readingTime: 'मिनट पठन',
      coreTakeaways: 'मुख्य सबक व व्यावहारिक अमल',
      quranRef: 'क़ुरआन का निर्देश',
      hadithRef: 'हदीस का संदर्भ',
    },
    duas: {
      title: 'दैनिक १२ अत्यंत महत्वपूर्ण मसनून दुआएं',
      subtitle: 'जागने, वुज़ू, मस्जिद, भोजन और सोने की प्रामाणिक दुआएं',
      searchPlaceholder: 'दुआ खोजें (नींद, मस्जिद, भोजन)...',
      timing: 'पढ़ने का सही समय',
      benefit: 'फ़ज़ीलत व लाभ',
      reference: 'हदीस संदर्भ',
      copyDua: 'दुआ कॉपी करें',
      copied: 'कॉपी हो गई!',
      listenDua: 'क़िरआत सुनें',
      stopAudio: 'रोकें',
    },
    tracker: {
      title: 'दैनिक सुन्नत अमल ट्रैकर',
      subtitle: 'आज आपने नबीजी ﷺ की कौन-सी सुन्नतें पूरी कीं, जांचें',
      progressLabel: 'आज की सुन्नतें पूर्ण हुईं',
      completed: 'पूर्ण',
      markAll: 'सभी पूर्ण करें',
      reset: 'रीसेट करें',
      excellentPraise: 'माशाअल्लाह! आप नबीजी ﷺ की सुन्नत पर चल रहे हैं। अल्लाह आपके दिन में बरकत दे!',
      goodPraise: 'अलहम्दुलिल्लाह! अच्छी प्रगति है। बाकी सुन्नतों पर भी अमल करें।',
      startPraise: 'बिस्मिल्लाह कहकर शुरू करें। एक सुन्नत भी बरकत लाती है।',
    },
    common: {
      copy: 'कॉपी',
      copied: 'कॉपी हो गया',
      share: 'शेयर',
      listen: 'सुनें',
      audioNotSupported: 'ऑडियो समर्थित नहीं है',
      sourceBook: 'स्रोत: नबीजी के २४ घंटे की दिनचर्या — रिज़वान हसन',
    },
  },

  id: {
    title: '24 Jam Kehidupan Nabi ﷺ',
    subtitle: 'Panduan Sunnah & Pola Hidup Berkah Berdasarkan Rutinitas 24 Jam Rasulullah ﷺ',
    arabicTitle: '٢٤ ساعة في حياة رسول الله ﷺ',
    backToHub: 'Fitur Lainnya',
    tabs: {
      wheel: 'Roda 24 Jam',
      timeline: 'Jadwal Rutinitas',
      articles: 'Panduan Buku',
      duas: 'Doa-Doa Masnun',
      tracker: 'Pelacak Sunnah',
    },
    liveBanner: {
      nowInRoutine: 'Saat ini dalam Rutinitas Nabi ﷺ',
      currentHour: 'Waktu Sekarang',
      liveActionPrompt: 'Ketahui amalan sunnah untuk jam ini',
      viewDetails: 'Lihat Detail',
    },
    categories: {
      spiritual: 'Spiritual & Shalat',
      social: 'Sosial & Pelayanan',
      physical: 'Istirahat & Makan',
      family: 'Keluarga & Rumah Tangga',
    },
    filters: {
      all: 'Semua 14 Bagian',
      dawnMorning: 'Subuh & Pagi',
      middayAfternoon: 'Siang & Ashar',
      eveningNight: 'Maghrib & Malam',
    },
    timeline: {
      title: '14 Segmen Waktu Berurutan',
      subtitle: 'Dari fajar subuh hingga larut malam dalam jejak langkah Rasulullah ﷺ',
      actionsCount: 'Amalan Sunnah',
      hadithProof: 'Dalil Hadits Shahih',
      masnunDua: 'Doa Khusus Segmen Ini',
      step: 'Bagian',
    },
    wheel: {
      title: 'Dial Interaktif 24 Jam Sunnah',
      subtitle: 'Klik pada jam mana pun untuk melihat rutinitas dan doa Rasulullah ﷺ',
      clickToInspect: 'Sentuh bagian mana saja pada jam',
      selectedSlot: 'Sunnah untuk Waktu yang Dipilih',
      sunnahActions: 'Urutan Amalan Nabi ﷺ',
      hadithQuote: 'Kutipan Hadits Shahih',
      duaOfSlot: 'Doa pada Waktu Ini',
    },
    articles: {
      title: '12 Bab Pedoman Hidup Sunnah',
      subtitle: 'Keberkahan waktu, bahaya begadang, Ihsan dalam bekerja, 10 hak & kehidupan rumah tangga',
      searchPlaceholder: 'Cari bab (misal: berkah, tidur, hak, ihsan)...',
      chapterNumber: 'Bab',
      readingTime: 'menit baca',
      coreTakeaways: 'Pelajaran Utama & Amalan Praktis',
      quranRef: 'Petunjuk Al-Qur\'an',
      hadithRef: 'Referensi Hadits',
    },
    duas: {
      title: '12 Doa Harian Masnun Penting',
      subtitle: 'Dari bangun tidur hingga tidur kembali: doa shahih lengkap dengan keutamaan',
      searchPlaceholder: 'Cari doa (tidur, masjid, bangun, makan)...',
      timing: 'Waktu Utama',
      benefit: 'Keutamaan & Manfaat',
      reference: 'Sumber Hadits',
      copyDua: 'Salin Doa',
      copied: 'Tersalin!',
      listenDua: 'Dengarkan Bacaan',
      stopAudio: 'Berhenti',
    },
    tracker: {
      title: 'Pelacak Sunnah Harian',
      subtitle: 'Pantau pelaksanaan sunnah-sunnah utama Rasulullah ﷺ hari ini',
      progressLabel: 'Sunnah Hari Ini Terselesaikan',
      completed: 'Selesai',
      markAll: 'Tandai Semua Selesai',
      reset: 'Atur Ulang',
      excellentPraise: 'Masya Allah! Anda mengikuti jejak Nabi ﷺ. Semoga Allah memberkahi hari Anda!',
      goodPraise: 'Alhamdulillah! Kemajuan luar biasa. Teruskan menjalankan sunnah lainnya.',
      startPraise: 'Mulailah dengan Bismillah. Menghidupkan satu sunnah membawa berkah besar.',
    },
    common: {
      copy: 'Salin',
      copied: 'Tersalin',
      share: 'Bagikan',
      listen: 'Dengarkan',
      audioNotSupported: 'Pemutaran audio tidak didukung',
      sourceBook: 'Sumber: Panduan Sunnah 24 Jam Nabi ﷺ — Ridwan Hasan',
    },
  },

  tr: {
    title: 'Peygamberimizin 24 Saati ﷺ',
    subtitle: 'Hz. Muhammed ﷺ’in 24 Saatlik Mübarek Hayatına Dayalı Sünnet Rehberi',
    arabicTitle: '٢٤ ساعة في حياة رسول الله ﷺ',
    backToHub: 'Diğer Özellikler',
    tabs: {
      wheel: '24 Saat Çarkı',
      timeline: 'Zaman Çizelgesi',
      articles: 'Sünnet Rehberi',
      duas: 'Mesnun Dualar',
      tracker: 'Sünnet Takipçisi',
    },
    liveBanner: {
      nowInRoutine: 'Şu Anda Peygamberimizin ﷺ Rutininde',
      currentHour: 'Şimdiki Zaman',
      liveActionPrompt: 'Bu saatin sünnet amelini öğrenin',
      viewDetails: 'Detayları Gör',
    },
    categories: {
      spiritual: 'Maneviyat ve Namaz',
      social: 'Sosyal Hayat ve Hizmet',
      physical: 'Dinlenme ve Yemek',
      family: 'Aile ve Ev Hayatı',
    },
    filters: {
      all: 'Tüm 14 Zaman Dilimi',
      dawnMorning: 'Sabah ve İmsak',
      middayAfternoon: 'Öğle ve İkindi',
      eveningNight: 'Akşam ve Yatsı',
    },
    timeline: {
      title: '24 Saatin 14 Sıralı Zaman Dilimi',
      subtitle: 'Sabah namazından gecenin son saatlerine kadar Peygamberimizin ﷺ mübarek günü',
      actionsCount: 'Sünnet Ameli',
      hadithProof: 'Sahih Hadis Delilleri',
      masnunDua: 'Bu Vaktin Özel Duası',
      step: 'Bölüm',
    },
    wheel: {
      title: 'İnteraktif 24 Saat Sünnet Çarkı',
      subtitle: 'O saatteki sünnet amellerini ve duaları görmek için çarkın herhangi bir dilimine tıklayın',
      clickToInspect: 'Çarktan bir dilim seçin',
      selectedSlot: 'Seçili Vaktin Sünnetleri',
      sunnahActions: 'Peygamberimizin ﷺ Uygulamaları',
      hadithQuote: 'İlgili Sahih Hadis',
      duaOfSlot: 'Bu Vaktin Duası',
    },
    articles: {
      title: 'Sünnet Rehberi Kitabından 12 Önemli Bölüm',
      subtitle: 'Zamanın bereketi, geç yatmanın zararları, İhsan, 10 temel hak ve aile hayatı',
      searchPlaceholder: 'Bölüm ara (ör. Bereket, uyku, haklar, ihsan)...',
      chapterNumber: 'Bölüm',
      readingTime: 'dk okuma',
      coreTakeaways: 'Temel Dersler ve Pratik Ameller',
      quranRef: 'Kuran-ı Kerim Emri',
      hadithRef: 'Hadis Kaynağı',
    },
    duas: {
      title: 'Günlük 12 Önemli Mesnun Dua',
      subtitle: 'Uyanıştan uykuya: Arapça metin, anlam ve faziletleriyle sahih dualar',
      searchPlaceholder: 'Dua ara (uyku, cami, uyanış, yemek)...',
      timing: 'En Faziletli Vakit',
      benefit: 'Manevi Fazileti ve Faydası',
      reference: 'Hadis Kaynağı',
      copyDua: 'Duayı Kopyala',
      copied: 'Kopyalandı!',
      listenDua: 'Kıraati Dinle',
      stopAudio: 'Durdur',
    },
    tracker: {
      title: 'Günlük Sünnet Amel Takipçisi',
      subtitle: 'Bugün Peygamberimizin ﷺ hangi sünnetlerini yerine getirdiğinizi takip edin',
      progressLabel: 'Bugünkü Sünnetler Tamamlandı',
      completed: 'Tamamlandı',
      markAll: 'Tümünü İşaretle',
      reset: 'Sıfırla',
      excellentPraise: 'MaşaAllah! Peygamberimizin ﷺ yolundan gidiyorsunuz. Allah gününüzü bereketlendirsin!',
      goodPraise: 'Elhamdülillah! Harika bir ilerleme. Kalan sünnetleri de tamamlamaya gayret edin.',
      startPraise: 'Bismillah diyerek başlayın. Bir sünneti ihya etmek bile büyük bereket getirir.',
    },
    common: {
      copy: 'Kopyala',
      copied: 'Kopyalandı',
      share: 'Paylaş',
      listen: 'Dinle',
      audioNotSupported: 'Ses çalma desteklenmiyor',
      sourceBook: 'Kaynak: Peygamberimizin 24 Saati Işığında Sünnet Rehberi — Rıdvan Hasan',
    },
  },

  // Fallbacks for remaining supported languages
  ms: null as any,
  fr: null as any,
  es: null as any,
  ru: null as any,
  fa: null as any,
  de: null as any,
  sw: null as any,
};

// Initialize fallbacks gracefully for French, German, Russian, Persian, Malay, Spanish, Swahili
(['ms', 'fr', 'es', 'ru', 'fa', 'de', 'sw'] as ZikrLanguage[]).forEach((l) => {
  if (!NOBI_24_UI_I18N[l]) {
    NOBI_24_UI_I18N[l] = NOBI_24_UI_I18N.en;
  }
});

/**
 * Slot localized titles and summaries across languages
 */
export const LOCALIZED_SLOT_TITLES: Record<string, Partial<Record<ZikrLanguage, { title: string; timeSpan: string; summary: string }>>> = {
  subh_sadiq_fajr: {
    bn: {
      title: 'সুবহে সাদিক ও ফজরের নামাজ',
      timeSpan: 'সুবহে সাদিক থেকে সূর্যোদয় (ভোর ৪:৩০ – ৬:০০)',
      summary: 'শেষ রাতে জাগ্রত হয়ে মিসওয়াক ও ওযু, আজানের উত্তর, ঘরে ২ রাকাত সুন্নত, মসজিদে জামাতে ফজর এবং সূর্যোদয় পর্যন্ত জিকির ও কুরআন তিলাওয়াত।',
    },
    en: {
      title: 'Dawn (Subh Sadiq) & Fajr Prayer',
      timeSpan: 'Subh Sadiq to Sunrise (04:30 – 06:00)',
      summary: 'Waking up before dawn, miswak, wudu, answering adhan, 2 sunnah rakats at home, Fajr in congregation, and zikr until sunrise.',
    },
    ar: {
      title: 'الصبح الصادق وصلاة الفجر',
      timeSpan: 'من الصبح الصادق حتى الشروق (٤:٣٠ – ٦:٠٠)',
      summary: 'الاستيقاظ في الثلث الأخير، السواك، الوضوء، إجابة الأذان، ركعتا الفجر في البيت، صلاة الفجر جماعة والذكر حتى الشروق.',
    },
    ur: {
      title: 'صبح صادق اور نماز فجر',
      timeSpan: 'صبح صادق سے طلوع آفتاب تک (۴:۳۰ تا ۶:۰۰)',
      summary: 'رات کے آخری حصے میں بیداری، مسواک و وضو، اذان کا جواب، گھر پر ۲ رکعت سنت، مسجد میں باجماعت فجر اور طلوع آفتاب تک ذکر و تلاوت۔',
    },
    hi: {
      title: 'सुबह सादिक़ व फ़ज्र की नमाज़',
      timeSpan: 'सुबह सादिक़ से सूर्योदय तक (४:३० – ६:००)',
      summary: 'अंतिम प्रहर में उठना, मिस्वाक व वुज़ू, अज़ान का जवाब, घर में २ रकात सुन्नत, मस्जिद में फ़ज्र जमाअत और सूर्योदय तक ज़िक्र व क़ुरआन।',
    },
    id: {
      title: 'Subuh & Shalat Fajar',
      timeSpan: 'Subuh hingga Terbit Matahari (04.30 – 06.00)',
      summary: 'Bangun di sepertiga malam terakhir, siwak, wudhu, menjawab azan, 2 rakaat sunnah di rumah, shalat Subuh berjamaah, dan dzikir hingga terbit matahari.',
    },
    tr: {
      title: 'İmsak ve Sabah Namazı',
      timeSpan: 'İmsaktan Güneş Doğuşuna Kadar (04:30 – 06:00)',
      summary: 'Gecenin son üçte birinde uyanma, misvak, abdest, ezana icabet, evde 2 rekat sünnet, camide cemaatle sabah namazı ve güneş doğana kadar zikir.',
    },
  },
  after_sunrise: {
    bn: {
      title: 'সূর্যোদয় পরবর্তী সময় ও ইশরাক',
      timeSpan: 'সূর্যোদয়ের পর থেকে সকাল ৮:০০ টা',
      summary: 'সূর্যোদয়ের ২৩-২৪ মিনিট পর ইশরাকের নামাজ, মসজিদ থেকে দোয়া পড়ে প্রস্থান, সাহাবিদের বরকতের দোয়া এবং পরিবারে খোঁজখবর নেওয়া।',
    },
    en: {
      title: 'Post-Sunrise & Ishraq Prayer',
      timeSpan: 'Post-Sunrise to 08:00 AM',
      summary: 'Praying 2 rakats Ishraq 20-25 mins after sunrise, leaving mosque with dua, blessing companions, greeting wives and asking for breakfast.',
    },
    ar: {
      title: 'ما بعد الشروق وصلاة الإشراق',
      timeSpan: 'من الشروق حتى ٨:٠٠ صباحاً',
      summary: 'صلاة ركعتين للإشراق بعد الشروق بـ ٢٠ دقيقة، الخروج من المسجد بالدعاء، تفقد الأهل والسلام على الزوجات.',
    },
    ur: {
      title: 'طلوع آفتاب کے بعد اور نماز اشراق',
      timeSpan: 'طلوع آفتاب سے صبح ۸:۰۰ بجے تک',
      summary: 'طلوع آفتاب کے ۲۰ منٹ بعد ۲ رکعت اشراق، دعا کے ساتھ مسجد سے خروج، صحابہ کے لیے برکت کی دعا اور ازواج مطہرات کی خیریت دریافت کرنا۔',
    },
    hi: {
      title: 'सूर्योदय के बाद व इशराक़ की नमाज़',
      timeSpan: 'सूर्योदय से सुबह ८:०० बजे तक',
      summary: 'सूर्योदय के २०-२५ मिनट बाद २ रकात इशराक़, दुआ के साथ मस्जिद से निकलना, सहाबा के लिए बरकत की दुआ और अज़वाज से मिलना।',
    },
    id: {
      title: 'Setelah Terbit Matahari & Shalat Isyraq',
      timeSpan: 'Terbit Matahari hingga 08.00 Pagi',
      summary: 'Shalat Isyraq 2 rakaat 20 menit setelah syuruk, keluar masjid dengan doa, mendoakan para sahabat, dan menyapa keluarga.',
    },
    tr: {
      title: 'Güneş Doğumu Sonrası ve İşrak Namazı',
      timeSpan: 'Güneş Doğuşundan Sabah 08:00\'e Kadar',
      summary: 'Güneşin doğuşundan 20-25 dakika sonra 2 rekat işrak namazı kılmak, camiden dua ile çıkmak, sahabelere dua etmek ve ev halkını ziyaret etmek.',
    },
  },
  early_morning_dawah: {
    bn: {
      title: 'দ্বীনি তা’লিম, শূরা ও মজলিস',
      timeSpan: 'সকাল ৮:০০ থেকে ১০:০০ টা',
      summary: 'মসজিদে ফিরে তাহিয়্যাতুল মসজিদ, সাহাবিদের ধর্মীয় দীক্ষা, দিনে ১০০ বার ইস্তিগফার, নবজাতকদের তাহনিক ও নাম রাখা, পরামর্শ সভা।',
    },
    en: {
      title: 'Morning Dawah, Shura & Guidance',
      timeSpan: '08:00 AM – 10:00 AM',
      summary: 'Tahiyyatul Masjid, teaching companions, seeking forgiveness 100 times, tahneek for newborns, meeting delegations, and shura.',
    },
    ar: {
      title: 'التعليم الديني، الشورى والمجلس',
      timeSpan: '٨:٠٠ صباحاً – ١٠:٠٠ صباحاً',
      summary: 'تحية المسجد، تعليم الصحابة، الاستغفار ١٠٠ مرة، تحنيك الأطفال، استقبال الوفود، والشورى مع كبار الصحابة.',
    },
    ur: {
      title: 'دینی تعلیم، شوریٰ اور مجلس',
      timeSpan: 'صبح ۸:۰۰ تا ۱۰:۰۰ بجے',
      summary: 'تحیۃ المسجد، صحابہ کرام کی تعلیم و تربیت، روزانہ ۱۰۰ بار استغفار، نو مولود بچوں کی تحنیک اور وفود سے ملاقات۔',
    },
    hi: {
      title: 'दीनी तालीम, शूरा व मजलिस',
      timeSpan: 'सुबह ८:०० से १०:०० बजे',
      summary: 'तहिय्यतुल मस्जिद, सहाबा को दीनी तालीम, दिन में १०० बार इस्तिग़फ़ार, नवजातों की तहनीक और सलाह-मशविरा।',
    },
    id: {
      title: 'Taklim Agama, Syura & Majelis',
      timeSpan: '08.00 Pagi – 10.00 Pagi',
      summary: 'Tahiyyatul Masjid, membimbing para sahabat, istighfar 100 kali sehari, mentahnik bayi, dan bermusyawarah.',
    },
    tr: {
      title: 'Dini Talim, Şura ve Meclis',
      timeSpan: '08:00 – 10:00 Sabah',
      summary: 'Tahiyyetü\'l-Mescid namazı, sahabelere ilim öğretmek, günde 100 defa istiğfar, yeni doğanlara dua ve istişare toplantıları.',
    },
  },
  pre_noon_community: {
    bn: {
      title: 'সামাজিক খোঁজখবর ও সালাতুদ দোহা (চাশত)',
      timeSpan: 'সকাল ১০:০০ থেকে ১১:৩০ টা',
      summary: 'আত্মীয়-স্বজনের বাসায় যাওয়া, রোগী সেবা, বাজারে সততা নিশ্চিত করা, সপ্তাহে একদিন মসজিদে কুবায় যাওয়া এবং সালাতুদ দোহা আদায়।',
    },
    en: {
      title: 'Community Care & Salatud Duha',
      timeSpan: '10:00 AM – 11:30 AM',
      summary: 'Visiting relatives, visiting the sick, checking marketplaces, walking to Quba Mosque weekly, and performing 4 rakats Salatud Duha.',
    },
    ar: {
      title: 'التفقد الاجتماعي وصلاة الضحى',
      timeSpan: '١٠:٠٠ صباحاً – ١١:٣٠ صباحاً',
      summary: 'صلة الرحم، عيادة المرضى، تفقد الأسواق، زيارة مسجد قباء أسبوعياً، والمحافظة على صلاة الضحى.',
    },
    ur: {
      title: 'معاشرتی احوال پرسی اور نماز چاشت',
      timeSpan: 'صبح ۱۰:۰۰ تا ۱۱:۳۰ بجے',
      summary: 'رشتہ داروں کی خیر خیریت، عیادتِ مریض، بازار کا معائنہ، مسجد قبا کی زیارت اور نماز چاشت کا اہتمام۔',
    },
    hi: {
      title: 'सामाजिक मेलजोल व चाश्त की नमाज़',
      timeSpan: 'सुबह १०:०० से ११:३० बजे',
      summary: 'रिश्तेदारों से मिलना, मरीज़ों की तीमारदारी, बाज़ार का दौरा, मस्जिद-ए-क़ुबा की ज़ियारत और सलातुद दुहा (चाश्त)।',
    },
    id: {
      title: 'Kepedulian Sosial & Shalat Dhuha',
      timeSpan: '10.00 Pagi – 11.30 Siang',
      summary: 'Menyambung silaturahmi, menjenguk orang sakit, memeriksa pasar, mengunjungi Masjid Quba sepekan sekali, dan shalat Dhuha.',
    },
    tr: {
      title: 'Toplumsal Ziyaretler ve Kuşluk (Duha) Namazı',
      timeSpan: '10:00 – 11:30 Sabah',
      summary: 'Akraba ziyareti, hasta ziyareti, çarşı denetimi, haftada bir Kuba Mescidi ziyareti ve Duha (Kuşluk) namazı kılmak.',
    },
  },
  lunch_qailula: {
    bn: {
      title: 'দুপুরের খাবার ও কায়েলুলা (সুন্নাহ বিশ্রাম)',
      timeSpan: 'দুপুর ১১:৩০ থেকে ১:০০ টা',
      summary: 'খাবারের শুরুতে বিসমিল্লাহ, লবণ দিয়ে শুরু, হেলান না দিয়ে বসে খাওয়া, বরকতের খাবার শেষে দোয়া এবং যুহরের পূর্বে স্বল্প নিদ্রা (কায়েলুলা)।',
    },
    en: {
      title: 'Midday Meal & Qailula (Sunnah Nap)',
      timeSpan: '11:30 AM – 01:00 PM',
      summary: 'Eating without reclining, thanking Allah, licking fingers, reciting dua after food, and taking a short pre-Dhuhr nap (Qailula).',
    },
    ar: {
      title: 'الغداء والقيلولة النبوية',
      timeSpan: '١١:٣٠ صباحاً – ١:٠٠ ظهراً',
      summary: 'تناول الطعام دون اتكاء، التسمية والحمد، ولعق الأصابع، وأخذ قيلولة قصيرة قبل الظهر تعين على قيام الليل.',
    },
    ur: {
      title: 'دوپہر کا کھانا اور قیلولہ (سنت آرام)',
      timeSpan: 'دوپہر ۱۱:۳۰ تا ۱:۰۰ بجے',
      summary: 'بغیر ٹیک لگائے کھانا، بسم اللہ اور کھانے کے بعد کی دعا، انگلیوں کو چاٹنا اور ظہر سے قبل مختصر قیلولہ کرنا۔',
    },
    hi: {
      title: 'दोपहर का भोजन व क़ैलूला (सुन्नत विश्राम)',
      timeSpan: 'दोपहर ११:३۰ से १:۰۰ बजे',
      summary: 'टेक लगाए बिना भोजन, बिस्मिल्लाह व बाद की दुआ, उंगलियों को चाटना और ज़ुहर से पहले थोड़ी देर का आराम (क़ैलूला)।',
    },
    id: {
      title: 'Makan Siang & Qailulah (Tidur Singkat Sunnah)',
      timeSpan: '11.30 Siang – 01.00 Siang',
      summary: 'Makan tanpa bersandar, membaca bismillah, menjilat jari, bersyukur, dan tidur sejenak sebelum Zhuhur (Qailulah).',
    },
    tr: {
      title: 'Öğle Yemeği ve Kaylule (Sünnet Uykusu)',
      timeSpan: '11:30 – 13:00 Öğle',
      summary: 'Dayanmadan yemek yemek, besmele ve şükür duası, parmakları yalamak ve öğle namazı öncesinde kısa bir kaylule uykusu uyumak.',
    },
  },
  dhuhr_prayer: {
    bn: {
      title: 'যুহরের নামাজ ও চার রাকাত সুন্নত',
      timeSpan: 'দুপুর ১:০০ থেকে ২:৩০ টা',
      summary: 'আজানের উত্তর, মিসওয়াক ও ওযু, যুহরের পূর্বে ঘরে ৪ রাকাত সুন্নত, মসজিদে জামাত, নামাজের পরে সাহাবিদের মাসআলা শেখানো।',
    },
    en: {
      title: 'Dhuhr Prayer & 4 Sunnah Rakats',
      timeSpan: '01:00 PM – 02:30 PM',
      summary: 'Answering Adhan, 4 Sunnah rakats before Dhuhr at home, leading congregational prayer, and resolving queries afterward.',
    },
    ar: {
      title: 'صلاة الظهر وسننها الراتبة',
      timeSpan: '١:٠٠ ظهراً – ٢:٣٠ ظهراً',
      summary: 'إجابة الأذان، أربع ركعات سنة قبلية في البيت، إمامة صلاة الظهر في المسجد، والإجابة عن فتاوى واستفسارات الصحابة.',
    },
    ur: {
      title: 'نماز ظہر اور چار رکعت سنت مؤکدہ',
      timeSpan: 'دوپہر ۱:۰۰ تا ۲:۳۰ بجے',
      summary: 'اذان کا جواب، ظہر سے قبل ۴ رکعت سنت، مسجد میں امامت اور نماز کے بعد صحابہ کے سوالات کے جوابات۔',
    },
    hi: {
      title: 'ज़ुहर की नमाज़ व ४ रकात सुन्नत',
      timeSpan: 'दोपहर १:०० से २:३۰ बजे',
      summary: 'अज़ान का जवाब, घर में ४ रकात सुन्नत, मस्जिद में ज़ुहर की जमाअत और नमाज़ के बाद सहाबा के सवालों के जवाब।',
    },
    id: {
      title: 'Shalat Zhuhur & 4 Rakaat Sunnah',
      timeSpan: '01.00 Siang – 02.30 Siang',
      summary: 'Menjawab azan, 4 rakaat sunnah sebelum Zhuhur di rumah, memimpin shalat berjamaah, dan mengajar para sahabat.',
    },
    tr: {
      title: 'Öğle Namazı ve 4 Rekat Sünnet',
      timeSpan: '13:00 – 14:30 Öğle',
      summary: 'Ezana icabet, evde öğleden önce 4 rekat sünnet kılmak, camide cemaate imamlık etmek ve soruları cevaplamak.',
    },
  },
  post_dhuhr_affairs: {
    bn: {
      title: 'জনকল্যাণমূলক ও রাষ্ট্রীয় কাজ',
      timeSpan: 'দুপুর ২:৩০ থেকে ৩:৪৫ টা',
      summary: 'সাহাবিদের প্রয়োজন মেটানো, বিচার ও ফায়সালা, বায়তুলমালের দায়িত্ব বণ্টন, দুর্বল ও দরিদ্রদের সাহায্য করা।',
    },
    en: {
      title: 'Public Welfare & State Affairs',
      timeSpan: '02:30 PM – 03:45 PM',
      summary: 'Resolving disputes, administering Bayt al-Mal, assisting the destitute, and tending to community welfare.',
    },
    ar: {
      title: 'الشؤون العامة وخدمة المجتمع',
      timeSpan: '٢:٣٠ ظهراً – ٣:٤٥ عصراً',
      summary: 'قضاء حوائج الناس، الفصل في الخصومات، توزيع أموال بيت المال، وتفقد الفقراء والمحتاجين.',
    },
    ur: {
      title: 'عوامی فلاح و ریاستی امور',
      timeSpan: 'دوپہر ۲:۳۰ تا ۳:۴۵ بجے',
      summary: 'لوگوں کی ضروریات پوری کرنا، مقدمات کے فیصلے، بیت المال کی تقسیم اور غریبوں کی امداد۔',
    },
    hi: {
      title: 'जनहित व सामाजिक कार्य',
      timeSpan: 'दोपहर २:३۰ से ३:४५ बजे',
      summary: 'लोगों की ज़रूरतों को पूरा करना, इंसाफ़ करना, बैतुल-माल की व्यवस्था और गरीबों की मदद।',
    },
    id: {
      title: 'Pelayanan Publik & Urusan Sosial',
      timeSpan: '02.30 Siang – 03.45 Sore',
      summary: 'Memenuhi kebutuhan masyarakat, memutuskan perkara dengan adil, mendistribusikan kas umat, dan membantu yang lemah.',
    },
    tr: {
      title: 'Toplumsal Hizmetler ve Kamu İşleri',
      timeSpan: '14:30 – 15:45 Öğleden Sonra',
      summary: 'İhtiyaç sahiplerinin dertlerini çözmek, adaletle hükmetmek, beytülmali yönetmek ve zayıflara yardım eli uzatmak.',
    },
  },
  asr_prayer: {
    bn: {
      title: 'আসরের নামাজ ও সান্ধ্য জিকির',
      timeSpan: 'বিকাল ৩:৪৫ থেকে ৫:০০ টা',
      summary: 'আসরের পূর্বে ৪ রাকাত সুন্নত, আসরের ফরজ নামাজ, সুর্যাস্তের আগ পর্যন্ত সান্ধ্য দোয়া-দরূদ এবং আল্লাহর জিকির।',
    },
    en: {
      title: 'Asr Prayer & Evening Remembrances',
      timeSpan: '03:45 PM – 05:00 PM',
      summary: 'Praying 4 Sunnah rakats before Asr, leading Asr, and engaging in authentic evening supplications until sunset.',
    },
    ar: {
      title: 'صلاة العصر وأذكار المساء',
      timeSpan: '٣:٤٥ عصراً – ٥:٠٠ مساءً',
      summary: 'أربع ركعات سنة قبل العصر، صلاة العصر جماعة، والاشتغال بأذكار المساء حتى غروب الشمس.',
    },
    ur: {
      title: 'نماز عصر اور شام کے اذکار',
      timeSpan: 'شام ۳:۴۵ تا ۵:۰۰ بجے',
      summary: 'عصر سے قبل ۴ رکعت سنت، نماز عصر باجماعت اور غروب آفتاب تک مسنون شام کے اذکار میں مشغول رہنا۔',
    },
    hi: {
      title: 'असर की नमाज़ व शाम के अज़कार',
      timeSpan: 'शाम ३:४५ से ५:०० बजे',
      summary: 'असर से पहले ४ रकात सुन्नत, असर की फ़र्ज़ नमाज़ और सूर्यास्त तक शाम की मसनून दुआएं व ज़िक्र।',
    },
    id: {
      title: 'Shalat Ashar & Dzikir Petang',
      timeSpan: '03.45 Sore – 05.00 Petang',
      summary: '4 rakaat sunnah sebelum Ashar, shalat Ashar berjamaah, dan membaca dzikir-dzikir petang hingga matahari terbenam.',
    },
    tr: {
      title: 'İkindi Namazı ve Akşam Zikirleri',
      timeSpan: '15:45 – 17:00 İkindi',
      summary: 'İkindiden önce 4 rekat sünnet, cemaatle ikindi namazı ve gün batımına kadar akşam zikirleriyle meşgul olmak.',
    },
  },
  sunset_maghrib: {
    bn: {
      title: 'সূর্যাস্ত ও মাগরিবের নামাজ',
      timeSpan: 'সন্ধ্যা ৫:০০ থেকে ৬:৩০ টা',
      summary: 'ছোট শিশুদের ঘরে রাখা, পাত্র ঢেকে রাখা, বিসমিল্লাহ বলে দরজা বন্ধ করা, মাগরিবের নামাজ ও ঘরে ২ রাকাত সুন্নত।',
    },
    en: {
      title: 'Sunset & Maghrib Prayer',
      timeSpan: '05:00 PM – 06:30 PM',
      summary: 'Keeping children indoors at dusk, covering food vessels, closing doors with Bismillah, praying Maghrib, and 2 Sunnah rakats at home.',
    },
    ar: {
      title: 'غروب الشمس وصلاة المغرب',
      timeSpan: '٥:٠٠ مساءً – ٦:٣٠ مساءً',
      summary: 'كف الصبيان عند الغروب، تغطية الإناء، إغلاق الأبواب بذكر الله، صلاة المغرب، وركعتا السنة في البيت.',
    },
    ur: {
      title: 'غروب آفتاب اور نماز مغرب',
      timeSpan: 'شام ۵:۰۰ تا ۶:۳۰ بجے',
      summary: 'غروب کے وقت بچوں کو گھروں میں رکھنا، برتنوں کو ڈھانپنا، بسم اللہ کہہ کر دروازے بند کرنا، نماز مغرب اور ۲ رکعت سنت۔',
    },
    hi: {
      title: 'सूर्यास्त व मग़रिब की नमाज़',
      timeSpan: 'शाम ५:०० से ६:३۰ बजे',
      summary: 'शाम होते ही बच्चों को अंदर रखना, बर्तनों को ढंकना, बिस्मिल्लाह बोलकर दरवाज़ा बंद करना, मग़रिब की नमाज़ और घर में २ रकात सुन्नत।',
    },
    id: {
      title: 'Terbenam Matahari & Shalat Maghrib',
      timeSpan: '05.00 Petang – 06.30 Malam',
      summary: 'Menahan anak-anak di rumah saat senja, menutup bejana, menutup pintu dengan basmalah, shalat Maghrib, dan 2 rakaat sunnah di rumah.',
    },
    tr: {
      title: 'Gün Batımı ve Akşam Namazı',
      timeSpan: '17:00 – 18:30 Akşam',
      summary: 'Akşam üzeri çocukları içeri almak, kapları örtmek, kapıları besmeleyle kapatmak, akşam namazı ve evde 2 rekat sünnet kılmak.',
    },
  },
  isha_prayer: {
    bn: {
      title: 'এশার নামাজ ও রাত জাগা পরিহার',
      timeSpan: 'রাত ৭:৩০ থেকে ৯:০০ টা',
      summary: 'এশার নামাজ জামাতে আদায়, এশার পূর্বে ঘুমানো অপছন্দ করা এবং এশার পর অহেতুক আড্ডা পরিহার করে দ্রুত ঘুমাতে যাওয়া।',
    },
    en: {
      title: 'Isha Prayer & Early Night Discipline',
      timeSpan: '07:30 PM – 09:00 PM',
      summary: 'Leading Isha prayer in congregation, disapproving sleep before Isha, avoiding idle talk afterward, and preparing for early rest.',
    },
    ar: {
      title: 'صلاة العشاء وهدي البكور في النوم',
      timeSpan: '٧:٣٠ مساءً – ٩:٠٠ مساءً',
      summary: 'صلاة العشاء في جماعة، كراهة النوم قبلها والحديث بعدها إلا لخير، والحرص على النوم المبكر للاستيقاظ للتهجد.',
    },
    ur: {
      title: 'نماز عشاء اور رات جلدی سونے کا اہتمام',
      timeSpan: 'رات ۷:۳۰ تا ۹:۰۰ بجے',
      summary: 'نماز عشاء باجماعت، عشاء سے قبل سونے کی ممانعت، بعد میں فضول باتوں سے گریز اور جلدی سونے کا مبارک طریقہ۔',
    },
    hi: {
      title: 'इशा की नमाज़ व जल्दी सोने की पाबंदी',
      timeSpan: 'रात ७:३۰ से ९:०० बजे',
      summary: 'इशा की नमाज़ जमाअत के साथ, इशा से पहले सोने और बाद में फ़िज़ूल गपशप से परहेज़, और जल्दी सोने की सुन्नत।',
    },
    id: {
      title: 'Shalat Isya & Disiplin Tidur Awal',
      timeSpan: '07.30 Malam – 09.00 Malam',
      summary: 'Shalat Isya berjamaah, tidak menyukai tidur sebelum Isya dan begadang sesudahnya tanpa faedah, serta tidur lebih awal.',
    },
    tr: {
      title: 'Yatsı Namazı ve Erken Yatmanın Önemi',
      timeSpan: '19:30 – 21:00 Gece',
      summary: 'Cemaatle yatsı namazı kılmak, yatsıdan önce uyumaktan ve sonrasında boş lakırdıdan sakınmak, teheccüd için erken yatmak.',
    },
  },
  family_gathering: {
    bn: {
      title: 'পরিবারের সাথে সান্ধ্য সময় ও গল্প',
      timeSpan: 'রাত ৯:০০ থেকে ৯:৪৫ টা',
      summary: 'স্ত্রী ও পরিবারের সাথে হাসিমুখে কথা বলা, দিনের অভিজ্ঞতা ভাগ করে নেওয়া, সন্তানদের গল্প শোনানো এবং পরামর্শ।',
    },
    en: {
      title: 'Family Evening Time & Bonding',
      timeSpan: '09:00 PM – 09:45 PM',
      summary: 'Warm conversations with wives, sharing comforting stories, listening patiently, and fostering loving household warmth.',
    },
    ar: {
      title: 'وقت الأسرة والسمر المبارك',
      timeSpan: '٩:٠٠ مساءً – ٩:٤٥ مساءً',
      summary: 'الحديث الودي مع الأهل والزوجات، حسن العشرة، الاستماع إليهن بلطف وإدخال السرور على قلوب أهل البيت.',
    },
    ur: {
      title: 'اہل خانہ کے ساتھ شام کا وقت',
      timeSpan: 'رات ۹:۰۰ تا ۹:۴۵ بجے',
      summary: 'ازواج مطہرات کے ساتھ خوشگوار گفتگو، شفقت بھرا برتاؤ اور گھر میں محبت و انسیت کا ماحول قائم کرنا۔',
    },
    hi: {
      title: 'परिवार के साथ शाम का समय',
      timeSpan: 'रात ९:०० से ९:४५ बजे',
      summary: 'परिवार से प्यार से बात करना, उनका हालचाल जानना, बच्चों को नेक बातें सिखाना और घर में सुकून का माहौल बनाना।',
    },
    id: {
      title: 'Waktu Bersama Keluarga & Keakraban',
      timeSpan: '09.00 Malam – 09.45 Malam',
      summary: 'Bercengkerama dengan istri-istri beliau, mendengarkan mereka dengan penuh kasih sayang, dan menghidupkan kehangatan rumah tangga.',
    },
    tr: {
      title: 'Aile ile Vakit Geçirme ve Sohbet',
      timeSpan: '21:00 – 21:45 Gece',
      summary: 'Aile halkıyla tatlı dille sohbet etmek, onların gününü dinlemek, şefkatle yaklaşmak ve evde huzur ortamı kurmak.',
    },
  },
  bedtime_sunnahs: {
    bn: {
      title: 'ঘুমানোর সুন্নাহ আদব ও প্রস্তুতি',
      timeSpan: 'রাত ৯:৪৫ থেকে ১০:৩০ টা',
      summary: 'ওযু করা, সুরমা লাগানো, বিছানা ৩ বার ঝাড়া, আয়াতুল কুরসি ও ৩ কুল পড়ে শরীরে ফুঁ দেওয়া, ডান কাত হয়ে শোয়া ও দোয়া পড়া।',
    },
    en: {
      title: 'Bedtime Sunnahs & Adab',
      timeSpan: '09:45 PM – 10:30 PM',
      summary: 'Making wudu, dusting bed 3 times, reciting Ayatul Kursi and the 3 Quls, blowing on hands, sleeping on the right side, and night duas.',
    },
    ar: {
      title: 'سنن وآداب النوم النبوية',
      timeSpan: '٩:٤٥ مساءً – ١٠:٣٠ مساءً',
      summary: 'الوضوء قبل النوم، نفض الفراش ثلاثاً، قراءة آية الكرسي والمعوذات والنفث في الكفين، والنوم على الشق الأيمن بالدعاء.',
    },
    ur: {
      title: 'سونے کی مسنون آداب و سنتیں',
      timeSpan: 'رات ۹:۴۵ تا ۱۰:۳۰ بجے',
      summary: 'با وضو سونا، بستر کو ۳ بار جھاڑنا، آیت الکرسی اور ۳ قل پڑھ کر دم کرنا، دائیں کروٹ پر سونا اور مسنون دعا پڑھنا۔',
    },
    hi: {
      title: 'सोने की सुन्नतें व आदाब',
      timeSpan: 'रात ९:४५ से १०:३۰ बजे',
      summary: 'वुज़ू करके सोना, बिस्तर ३ बार झाड़ना, आयतुल कुर्सी व ३ क़ुल पढ़कर दम करना, दाईं करवट लेटना और सोने की दुआ पढ़ना।',
    },
    id: {
      title: 'Adab & Sunnah Sebelum Tidur',
      timeSpan: '09.45 Malam – 10.30 Malam',
      summary: 'Berwudhu sebelum tidur, mengibaskan tempat tidur 3 kali, membaca Ayat Kursi & 3 Qul, meniupkan ke telapak tangan, dan berbaring miring ke kanan.',
    },
    tr: {
      title: 'Uyku Öncesi Sünnetler ve Edepler',
      timeSpan: '21:45 – 22:30 Gece',
      summary: 'Abdestli yatmak, yatağı 3 kez çırpmak, Ayete\'l-Kürsi ve İhlas-Felak-Nas okuyup vücuda mesh etmek, sağ yana yatıp dua etmek.',
    },
  },
  deep_night_sleep: {
    bn: {
      title: 'রাতের প্রথম প্রহর ও আরাম',
      timeSpan: 'রাত ১০:৩০ থেকে ৩:০০ টা',
      summary: 'গভীর ঘুমে ক্লান্তি দূর করা, আলো নিভিয়ে রাখা, যাতে শেষ রাতে পূর্ণ উদ্যমে তাহাজ্জুদ ও আল্লাহর সামনে দাঁড়ানো যায়।',
    },
    en: {
      title: 'Early Night Rest & Renewal',
      timeSpan: '10:30 PM – 03:00 AM',
      summary: 'Extinguishing lamps, resting soundly in the early night to gain vital energy for the pre-dawn Tahajjud prayer.',
    },
    ar: {
      title: 'نوم أول الليل والاستراحة',
      timeSpan: '١٠:٣٠ مساءً – ٣:٠٠ ليلاً',
      summary: 'إطفاء السراج، النوم في أول الليل لترتاح النفس والجسد، استعداداً لقيام الثلث الأخير والوقوف بين يدي الله.',
    },
    ur: {
      title: 'رات کے پہلے حصے کا آرام',
      timeSpan: 'رات ۱۰:۳۰ تا ۳:۰۰ بجے',
      summary: 'چراغ بجھا کر سونا، رات کے پہلے حصے میں پرسکون نیند تاکہ رات کے آخری پہر تہجد کے لیے تازہ دم اٹھا جا سکے۔',
    },
    hi: {
      title: 'रात के पहले हिस्से की नींद',
      timeSpan: 'रात १०:३۰ से ३:०० बजे',
      summary: 'बत्ती बुझाकर सोना, रात के पहले पहर में सुकून की नींद ताकि अंतिम प्रहर में तहज्जुद के लिए आसानी से उठा जा सके।',
    },
    id: {
      title: 'Istirahat Awal Malam',
      timeSpan: '10.30 Malam – 03.00 Dini Hari',
      summary: 'Memadamkan lampu, tidur nyenyak di awal malam untuk memulihkan energi sebelum bangun tahajud di sepertiga malam terakhir.',
    },
    tr: {
      title: 'Gecenin İlk Yarısında Dinlenme',
      timeSpan: '22:30 – 03:00 Gece',
      summary: 'Işıkları söndürüp uyumak, gecenin son üçte birinde teheccüde zinde kalkabilmek için erken saatlerde derin uykuyla dinlenmek.',
    },
  },
  tahajjud_munajat: {
    bn: {
      title: 'শেষ রাতের তাহাজ্জুদ ও মোনাজাত',
      timeSpan: 'রাত ৩:০০ থেকে ৪:৩০ টা',
      summary: 'আকাশের দিকে তাকিয়ে সূরা আল-ইমরানের শেষ ১০ আয়াত তিলাওয়াত, ৮ থেকে ১১ রাকাত তাহাজ্জুদ ও বিতর, দীর্ঘ সিজদা ও মোনাজাত।',
    },
    en: {
      title: 'Pre-Dawn Tahajjud & Munajat',
      timeSpan: '03:00 AM – 04:30 AM',
      summary: 'Looking to the night sky, reciting last 10 verses of Surah Ali Imran, praying 8-11 rakats of Tahajjud, long prostrations and tears.',
    },
    ar: {
      title: 'التهجد والمناجاة في السحر',
      timeSpan: '٣:٠٠ ليلاً – ٤:٣٠ فجراً',
      summary: 'النظر إلى السماء وتلاوة خواتيم آل عمران، صلاة التهجد ٨ إلى ١١ ركعة بركوع وسجود طويل، ومناجاة الله بالدموع.',
    },
    ur: {
      title: 'آخری پہر کی تہجد اور مناجات',
      timeSpan: 'رات ۳:۰۰ تا ۴:۳۰ بجے',
      summary: 'آسمان کی طرف دیکھ کر سورۂ آل عمران کی آخری ۱۰ آیات کی تلاوت، طویل رکوع و سجود کے ساتھ ۸ تا ۱۱ رکعت تہجد اور دعا۔',
    },
    hi: {
      title: 'अंतिम प्रहर का तहज्जुद व मुनाजात',
      timeSpan: 'रात ३:०० से ४:३० बजे',
      summary: 'आसमान की ओर देखकर सूरह आले-इमरान की अंतिम १० आयतें पढ़ना, ८ से ११ रकात तहज्जुद, लंबे सजदे और अल्लाह से रुजू होना।',
    },
    id: {
      title: 'Tahajud & Munajat di Waktu Sahur',
      timeSpan: '03.00 Dini Hari – 04.30 Subuh',
      summary: 'Memandang langit sambil membaca 10 ayat terakhir Surah Ali Imran, shalat Tahajud 8 hingga 11 rakaat, sujud panjang, dan memohon ampunan.',
    },
    tr: {
      title: 'Seher Vakti Teheccüd ve Münacat',
      timeSpan: '03:00 – 04:30 Seher',
      summary: 'Gökyüzüne bakarak Al-i İmran Suresi\'nin son 10 ayetini okumak, 8 ila 11 rekat uzun secdeli teheccüd namazı ve gözyaşlarıyla dua.',
    },
  },
};

/**
 * Get localized slot data based on current active language
 */
export function getLocalizedSlot(slot: NobiTimeSlot, lang: ZikrLanguage) {
  const custom = LOCALIZED_SLOT_TITLES[slot.id]?.[lang] || LOCALIZED_SLOT_TITLES[slot.id]?.en || LOCALIZED_SLOT_TITLES[slot.id]?.bn;
  const isBn = lang === 'bn';

  const title = custom?.title || (isBn ? slot.titleBn : slot.titleEn);
  const timeSpan = custom?.timeSpan || (isBn ? slot.timeSpanBn : slot.timeSpanEn);
  const summary = custom?.summary || (isBn ? slot.summaryBn : slot.summaryEn);
  const categoryLabel = NOBI_24_UI_I18N[lang]?.categories[slot.category] || (isBn ? slot.categoryLabelBn : slot.categoryLabelEn);
  const actions = isBn ? slot.actionsBn : slot.actionsEn;
  const hadith = isBn ? slot.hadithBn : (slot.hadithBn ? (isBn ? slot.hadithBn : `Hadith: ${slot.hadithBn}`) : undefined);
  const duaTranslation = isBn ? slot.dua?.translationBn : slot.dua?.translationEn;

  return {
    ...slot,
    title,
    timeSpan,
    summary,
    categoryLabel,
    actions,
    hadith,
    duaTranslation,
  };
}

/**
 * Get localized chapter data based on current active language
 */
export function getLocalizedChapter(chapter: NobiChapter, lang: ZikrLanguage) {
  const isBn = lang === 'bn';
  return {
    ...chapter,
    title: isBn ? chapter.titleBn : chapter.titleEn,
    subtitle: isBn ? chapter.subtitleBn : chapter.subtitleEn,
    content: isBn ? chapter.contentBn : chapter.contentEn,
    quranTranslation: isBn ? chapter.quranAyat?.translationBn : chapter.quranAyat?.translationEn,
    hadithList: chapter.hadiths?.map((h) => ({
      text: isBn ? h.textBn : h.textEn,
      reference: h.reference,
    })),
  };
}

/**
 * Get localized Dua item based on current active language
 */
export function getLocalizedDua(dua: NobiDuaItem, lang: ZikrLanguage) {
  const isBn = lang === 'bn';
  return {
    ...dua,
    title: isBn ? dua.titleBn : dua.titleEn,
    timing: isBn ? dua.timingBn : dua.timingEn,
    pronunciation: isBn ? dua.pronunciationBn : dua.pronunciationEn,
    meaning: isBn ? dua.meaningBn : dua.meaningEn,
    benefit: isBn ? dua.benefitBn : dua.benefitEn,
  };
}

/**
 * Get localized checklist item based on current active language
 */
export function getLocalizedCheckItem(item: NobiDailyCheckItem, lang: ZikrLanguage) {
  const isBn = lang === 'bn';
  return {
    ...item,
    title: isBn ? item.titleBn : item.titleEn,
    timeSpan: isBn ? item.timeSpanBn : item.timeSpanEn,
    sunnahPoint: isBn ? item.sunnahPointBn : item.sunnahPointEn,
  };
}
