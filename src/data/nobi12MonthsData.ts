export interface PropheticMonthDua {
  titleBn: string;
  titleEn: string;
  arabic: string;
  pronunciationBn: string;
  pronunciationEn: string;
  meaningBn: string;
  meaningEn: string;
  reference: string;
  noteBn?: string;
  noteEn?: string;
}

export interface PropheticMonthTopic {
  titleBn: string;
  titleEn: string;
  slideTagBn: string;
  slideTagEn: string;
  pointsBn: string[];
  pointsEn: string[];
  reference: string;
}

export interface PropheticMonthItem {
  id: string;
  order: number;
  hijriYearBn: string;
  hijriYearEn: string;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  approxStartBn: string;
  approxStartEn: string;
  ayyamulBeedhBn?: string;
  ayyamulBeedhEn?: string;
  coreAmalBn: string;
  coreAmalEn: string;
  headlineBn: string;
  headlineEn: string;
  isSacredMonth: boolean; // Ashhurul Hurum: Zilqad, Zilhajj, Muharram, Rajab
  hasSpecialFasting: boolean;
  keyDatesBn?: string[];
  keyDatesEn?: string[];
  topics: PropheticMonthTopic[];
  authenticityCautionBn?: {
    title: string;
    points: string[];
    reference: string;
  };
  authenticityCautionEn?: {
    title: string;
    points: string[];
    reference: string;
  };
  specialDua?: PropheticMonthDua;
  accentColor: string;
}

export interface WeeklyPropheticDay {
  id: string;
  order: number;
  dayBn: string;
  dayEn: string;
  dayAr: string;
  shortTagBn: string;
  shortTagEn: string;
  summaryBn: string;
  summaryEn: string;
  sections: Array<{
    titleBn: string;
    titleEn: string;
    pointsBn: string[];
    pointsEn: string[];
    reference: string;
  }>;
  hasSpecificAmal: boolean;
  accentColor: string;
}

export interface MonthlyGeneralRule {
  id: string;
  titleBn: string;
  titleEn: string;
  timingBn: string;
  timingEn: string;
  pointsBn: string[];
  pointsEn: string[];
  reference: string;
  dua?: PropheticMonthDua;
}

export interface DailyPdfSnapshotItem {
  id: string;
  timeBn: string;
  timeEn: string;
  summaryBn: string;
  summaryEn: string;
  slideDetailsBn: string[];
  slideDetailsEn: string[];
  reference: string;
}

export interface RegularSunnahCommitment {
  id: string;
  titleBn: string;
  titleEn: string;
  cadenceBn: string;
  cadenceEn: string;
  reference: string;
}

export const CORE_PRINCIPLE_PDF = {
  titleBn: 'অল্প হলেও নিয়মিত, এটাই সুন্নাহ',
  titleEn: 'Consistent Even If Small — That Is the Sunnah',
  subtitleBn: 'মূলনীতি · আমলের আগে যে কথাটি জানা জরুরি',
  subtitleEn: 'Core Principle · Before Starting Any Deed',
  pointsBn: [
    'আয়েশা (রা.)-কে জিজ্ঞেস করা হলো, রাসূলুল্লাহ ﷺ কি আমলের জন্য বিশেষ দিন বেছে নিতেন? তিনি বললেন, না; তাঁর আমল ছিল নিয়মিত ও স্থায়ী।',
    'রাসূলুল্লাহ ﷺ বলেছেন, আল্লাহর কাছে সবচেয়ে প্রিয় আমল সেটাই, যা নিয়মিত করা হয়, যদিও তা অল্প হয়।',
    'তাই এই ক্যালেন্ডার থেকে একসাথে সব নয়, ২–৩টি আমল বেছে নিয়ে নিয়মিত শুরু করুন।',
  ],
  pointsEn: [
    'Aisha (RA) was asked whether the Messenger of Allah ﷺ singled out specific days for extra deeds. She replied: "No; his deeds were continuous and consistent."',
    'The Prophet ﷺ said: "The most beloved deeds to Allah are those done consistently, even if they are small."',
    'Therefore, do not overwhelm yourself with everything at once — pick 2 to 3 Sunnah practices from this calendar and practice them regularly.',
  ],
  reference: 'সহিহ বুখারি ১৯৮৭, ৬৪৬৪ · Sahih Bukhari 1987, 6464',
};

export const SACRED_MONTHS_INTRO_PDF = {
  titleBn: 'বছরে ১২ মাস, তার ৪টি সম্মানিত (আশহুরে হুরুম)',
  titleEn: '12 Months in a Year, 4 of Which Are Sacred',
  pointsBn: [
    'বিদায় হজের ভাষণে তিনি বলেন, বছর ১২ মাসে; তার মধ্যে ৪টি সম্মানিত।',
    'তিনটি পরপর: যিলকদ, যিলহজ ও মুহাররম; আর একটি রজব, যা জুমাদা ও শাবানের মাঝে।',
    'আল্লাহ বলেন, এই মাসগুলোতে নিজেদের ওপর জুলুম কোরো না।',
  ],
  pointsEn: [
    'In his Farewell Pilgrimage sermon, the Prophet ﷺ said: "The year consists of twelve months, of which four are sacred."',
    'Three are consecutive: Dhul-Qi’dah, Dhul-Hijjah, and Muharram; and one is Rajab, which sits between Jumada and Sha’ban.',
    'Allah commands: "So do not wrong yourselves during those months."',
  ],
  reference: 'সহিহ বুখারি ৪৬৬২; সূরা তাওবা ৯:৩৬',
  calendarNoteBn: '* তারিখ সৌদি উম্মুল কুরা হিসাবে; বাংলাদেশে চাঁদ দেখার ওপর একদিন পরে হতে পারে।',
  calendarNoteEn: '* Dates follow the Saudi Umm al-Qura calendar; regional moon sighting may shift dates by 1 day.',
};

export const REGULAR_SUNNAH_COMMITMENTS: RegularSunnahCommitment[] = [
  {
    id: 'commit_tahajjud_witr',
    titleBn: 'শেষ রাতে তাহাজ্জুদ ও বিতর (বা শোয়ার আগে বিতর)',
    titleEn: 'Late-Night Tahajjud & Witr (or Witr before sleep)',
    cadenceBn: 'প্রতিদিন',
    cadenceEn: 'Daily',
    reference: 'সহিহ বুখারি ৯৯৮, ১১৪৭',
  },
  {
    id: 'commit_12_sunnah',
    titleBn: 'দিনে-রাতে ১২ রাকাত সুন্নাত (যোহরের আগে ৪ ও ফজরের আগে ২ সহ)',
    titleEn: '12 Daily Sunnah Rawatib Rakats (incl. 2 before Fajr, 4 before Dhuhr)',
    cadenceBn: 'প্রতিদিন',
    cadenceEn: 'Daily',
    reference: 'সহিহ বুখারি ১১৮২; মুসলিম ৭২৮',
  },
  {
    id: 'commit_istighfar_sayyid',
    titleBn: 'সকাল-সন্ধ্যা সাইয়্যিদুল ইস্তিগফার ও দিনে ৭০–১০০ বার তাওবা',
    titleEn: 'Sayyidul Istighfar Morning & Evening + 70–100x Daily Repentance',
    cadenceBn: 'প্রতিদিন',
    cadenceEn: 'Daily',
    reference: 'সহিহ বুখারি ৬৩০৬, ৬৩০৭',
  },
  {
    id: 'commit_sleep_sunnah',
    titleBn: 'শোয়ার আগে অজু, ৩ কুল, আয়াতুল কুরসি ও ৩৩-৩৩-৩৪ তাসবিহ',
    titleEn: 'Wudu, 3 Quls, Ayatul Kursi & 33-33-34 Tasbih before Sleep',
    cadenceBn: 'প্রতি রাত',
    cadenceEn: 'Every Night',
    reference: 'সহিহ বুখারি ২৪৭, ৫০১৭, ৩৭০৫',
  },
  {
    id: 'commit_mon_thu_fast',
    titleBn: 'সোম ও বৃহস্পতিবারের নফল রোজা',
    titleEn: 'Monday & Thursday Voluntary Fasts',
    cadenceBn: 'সাপ্তাহিক',
    cadenceEn: 'Weekly',
    reference: 'তিরমিযি ৭৪৭; মুসলিম ১১৬২',
  },
  {
    id: 'commit_jumuah_sunnah',
    titleBn: 'জুমার গোসল, সুগন্ধি, আগেভাগে মসজিদে ও বেশি দরুদ',
    titleEn: 'Jumuah Ghusl, Fragrance, Early Arrival & Abundant Salawat',
    cadenceBn: 'প্রতি শুক্রবার',
    cadenceEn: 'Every Friday',
    reference: 'বুখারি ৮৮৩; আবু দাউদ ১০৪৭',
  },
  {
    id: 'commit_ayyamul_beedh',
    titleBn: 'প্রতি হিজরি মাসের ১৩, ১৪ ও ১৫ তারিখ (আইয়ামে বীয) রোজা',
    titleEn: '3 Monthly Fasts on Ayyamul Beedh (13th, 14th & 15th)',
    cadenceBn: 'প্রতি মাসে',
    cadenceEn: 'Monthly',
    reference: 'সহিহ বুখারি ১৯৮১; তিরমিযি ৭৬১',
  },
];

export const WEEKLY_PROPHETIC_AMAL: WeeklyPropheticDay[] = [
  {
    id: 'sat',
    order: 1,
    dayBn: 'শনিবার',
    dayEn: 'Saturday',
    dayAr: 'السَّبْت',
    shortTagBn: 'মসজিদে কুবায় যাওয়া',
    shortTagEn: 'Visit Masjid Quba',
    summaryBn: 'রাসূলুল্লাহ ﷺ প্রতি শনিবার হেঁটে অথবা বাহনে চড়ে মসজিদে কুবায় যেতেন ও নামাজ পড়তেন।',
    summaryEn: 'The Prophet ﷺ used to visit Masjid Quba every Saturday, sometimes walking and sometimes riding.',
    hasSpecificAmal: true,
    accentColor: '#0d9488',
    sections: [
      {
        titleBn: 'শনিবার: মসজিদে কুবায় যাওয়া',
        titleEn: 'Saturday: Visiting Masjid Quba',
        pointsBn: [
          'ইবনে উমর (রা.) বলেন, রাসূলুল্লাহ ﷺ প্রতি শনিবার মসজিদে কুবায় যেতেন, কখনো হেঁটে, কখনো বাহনে চড়ে।',
          'ইবনে উমর (রা.) নিজেও এই আমল ধরে রেখেছিলেন।',
        ],
        pointsEn: [
          'Ibn Umar (RA) narrated that the Messenger of Allah ﷺ used to visit Masjid Quba every Saturday, sometimes walking and sometimes riding.',
          'Ibn Umar (RA) himself maintained this practice faithfully.',
        ],
        reference: 'সহিহ বুখারি ১১৯৩',
      },
    ],
  },
  {
    id: 'sun',
    order: 2,
    dayBn: 'রবিবার',
    dayEn: 'Sunday',
    dayAr: 'الأَحَد',
    shortTagBn: 'প্রতিদিনের রুটিন',
    shortTagEn: 'Daily Sunnah Routine',
    summaryBn: 'রবিবারের জন্য আলাদা নির্দিষ্ট কোনো আমল নেই; প্রতিদিনের তাহাজ্জুদ, সুন্নাত নামাজ, যিকির ও ইস্তিগফার চলবে।',
    summaryEn: 'No special day-specific deed is prescribed for Sunday in authentic Hadith; continue your regular daily Sunnah routine.',
    hasSpecificAmal: false,
    accentColor: '#64748b',
    sections: [
      {
        titleBn: 'রবি, মঙ্গল ও বুধবার: প্রতিদিনের রুটিন',
        titleEn: 'Sunday, Tuesday & Wednesday: Daily Routine',
        pointsBn: [
          'রবি, মঙ্গল ও বুধবারের জন্য সহিহ হাদিসে নির্দিষ্ট কোনো আমল পাওয়া যায় না।',
          'এই দিনগুলোতে চলবে প্রতিদিনের রুটিন: তাহাজ্জুদ, সুন্নাত নামাজ, যিকির আর ইস্তিগফার।',
          'কোনো দিন বা মাসকে অশুভ মনে করা ইসলামে নেই; তিনি বলেছেন, অশুভ লক্ষণ বলে কিছু নেই।',
        ],
        pointsEn: [
          'No specific deed dedicated solely to Sunday, Tuesday, or Wednesday is established in authentic Hadith.',
          'Continue your daily routine on these days: Tahajjud, Sunnah prayers, Dhikr, and Istighfar.',
          'Islam rejects considering any day or month unlucky; the Prophet ﷺ said there is no such thing as bad omen.',
        ],
        reference: 'সহিহ বুখারি ৫৭৫৭',
      },
    ],
  },
  {
    id: 'mon',
    order: 3,
    dayBn: 'সোমবার',
    dayEn: 'Monday',
    dayAr: 'الإِثْنَيْن',
    shortTagBn: 'নফল রোজা (জন্ম, ওহি ও আমল পেশ)',
    shortTagEn: 'Voluntary Fast (Birth, Revelation & Deeds Presented)',
    summaryBn: 'সোমবার জন্ম ও ওহি নাজিলের শুকরিয়ায় এবং আল্লাহর কাছে আমল পেশ হওয়ার দিন হিসেবে নফল রোজা রাখা সুন্নাহ।',
    summaryEn: 'Fasting Mondays out of gratitude for his birth and revelation, and because deeds are presented to Allah.',
    hasSpecificAmal: true,
    accentColor: '#059669',
    sections: [
      {
        titleBn: 'সোমবারের রোজা',
        titleEn: 'Monday Fasting',
        pointsBn: [
          'সোমবারের রোজা সম্পর্কে জিজ্ঞেস করা হলে তিনি বললেন, এই দিনে আমি জন্মেছি, আর এই দিনেই আমার ওপর ওহি নাজিল শুরু হয়েছে।',
          'আবু বকর (রা.)-এর বর্ণনামতে, রাসূলুল্লাহ ﷺ-এর ইন্তেকালও হয়েছিল সোমবারে।',
        ],
        pointsEn: [
          'When asked about fasting on Monday, he said: "That is the day I was born and the day revelation began upon me."',
          'According to Abu Bakr (RA), the Prophet’s ﷺ passing also took place on a Monday.',
        ],
        reference: 'সহিহ মুসলিম ১১৬২; সহিহ বুখারি ১৩৮৭',
      },
      {
        titleBn: 'আমল পেশ হওয়ার দুই দিন (সোম ও বৃহস্পতি)',
        titleEn: 'Two Days Deeds Are Presented (Mon & Thu)',
        pointsBn: [
          'তিনি বলেছেন, সোম ও বৃহস্পতিবার আল্লাহর কাছে আমল পেশ করা হয়; আমি চাই রোজা অবস্থায় আমার আমল পেশ হোক।',
          'এই দুই দিন জান্নাতের দরজা খোলা হয়, শিরক না করা সবাইকে ক্ষমা করা হয়, তবে পরস্পর বিদ্বেষ রাখা দুজন ছাড়া।',
        ],
        pointsEn: [
          'He said: "Deeds are presented before Allah on Mondays and Thursdays, and I love for my deeds to be presented while I am fasting."',
          'The gates of Paradise are opened on these two days and everyone who commits no shirk is forgiven, except two people holding mutual malice.',
        ],
        reference: 'জামে তিরমিযি ৭৪৭ (হাসান); সহিহ মুসলিম ২৫৬৫',
      },
    ],
  },
  {
    id: 'tue',
    order: 4,
    dayBn: 'মঙ্গলবার',
    dayEn: 'Tuesday',
    dayAr: 'الثُّلَاثَاء',
    shortTagBn: 'প্রতিদিনের রুটিন',
    shortTagEn: 'Daily Sunnah Routine',
    summaryBn: 'মঙ্গলবার আলাদা কোনো নির্দিষ্ট আমল নেই; প্রতিদিনের তাহাজ্জুদ, ১২ রাকাত সুন্নাত, যিকির ও ইস্তিগফার অব্যাহত থাকবে।',
    summaryEn: 'No specific ritual is isolated for Tuesday; preserve consistency in daily prayers, Dhikr, and family duties.',
    hasSpecificAmal: false,
    accentColor: '#64748b',
    sections: [
      {
        titleBn: 'প্রতিদিনের স্থায়ী আমল ধরে রাখা',
        titleEn: 'Sustaining the Daily Prophetic Routine',
        pointsBn: [
          'মঙ্গলবারের জন্য সহিহ হাদিসে আলাদা নির্দিষ্ট কোনো আমল পাওয়া যায় না।',
          'এই দিনেও নিয়মিত দৈনিক রুটিন — তাহাজ্জুদ, সুন্নাত নামাজ, যিকির ও ইস্তিগফার — ধরে রাখা সুন্নাহ।',
          'কোনো দিন বা মাসকে অশুভ মনে করা ইসলামে সম্পূর্ণ নিষিদ্ধ।',
        ],
        pointsEn: [
          'No unique Tuesday-only worship is recorded in authentic Hadith.',
          'Continue daily Tahajjud, Rawatib prayers, Istighfar, and family care consistently.',
          'Superstitions regarding unlucky days have zero basis in Islam.',
        ],
        reference: 'সহিহ বুখারি ৫৭৫৭',
      },
    ],
  },
  {
    id: 'wed',
    order: 5,
    dayBn: 'বুধবার',
    dayEn: 'Wednesday',
    dayAr: 'الأَرْبِعَاء',
    shortTagBn: 'প্রতিদিনের রুটিন',
    shortTagEn: 'Daily Sunnah Routine',
    summaryBn: 'বুধবারের জন্যও আলাদা নির্দিষ্ট কোনো আমল সহিহ হাদিসে নেই; নিয়মিত দৈনিক ইবাদত ও জিকির-ইস্তিগফার চলবে।',
    summaryEn: 'No separate Wednesday-only ritual is established; focus on steady daily Sunnah habits and remembrance.',
    hasSpecificAmal: false,
    accentColor: '#64748b',
    sections: [
      {
        titleBn: 'বুধবার: নিয়মিত আমলের ধারা',
        titleEn: 'Wednesday: Continuity of Daily Sunnah',
        pointsBn: [
          'রবি, মঙ্গল ও বুধবারের জন্য সহিহ হাদিসে নির্দিষ্ট কোনো আমল পাওয়া যায় না।',
          'প্রতিদিনের রুটিন: শেষ রাতে জাগরণ, মিসওয়াক, ১২ রাকাত সুন্নাত, চাশত, ৭০–১০০ বার ইস্তিগফার ও ঘুমের আগের আমলগুলো বজায় রাখুন।',
          'অশুভ লক্ষণ বা কুসংস্কার থেকে সম্পূর্ণ মুক্ত থাকুন।',
        ],
        pointsEn: [
          'No special Wednesday worship exists in authentic Hadith; continue your regular daily worship.',
          'Focus on the daily checklist: Tahajjud, 12 Sunnah rakats, Duha, Istighfar, and bedtime adhkar.',
          'Remain free from all superstitions or notions of unlucky days.',
        ],
        reference: 'সহিহ বুখারি ৫৭৫৭',
      },
    ],
  },
  {
    id: 'thu',
    order: 6,
    dayBn: 'বৃহস্পতিবার',
    dayEn: 'Thursday',
    dayAr: 'الْخَمِيس',
    shortTagBn: 'নফল রোজা ও সফরে বের হওয়া',
    shortTagEn: 'Voluntary Fast & Travel Sunnah',
    summaryBn: 'বৃহস্পতিবার আল্লাহর কাছে আমল পেশ হয় বলে নফল রোজা রাখা এবং সফরে বের হওয়ার ক্ষেত্রে এ দিনকে অগ্রাধিকার দেওয়া সুন্নাহ।',
    summaryEn: 'A day when deeds are presented to Allah (fasting) and the preferred day the Prophet ﷺ set out on journeys.',
    hasSpecificAmal: true,
    accentColor: '#d97706',
    sections: [
      {
        titleBn: 'আমল পেশ হওয়ার দিন: নফল রোজা',
        titleEn: 'Day Deeds Are Presented: Voluntary Fast',
        pointsBn: [
          'সোম ও বৃহস্পতিবার আল্লাহর কাছে আমল পেশ করা হয়; রাসূলুল্লাহ ﷺ চাইতেন রোজা অবস্থায় তাঁর আমল পেশ হোক।',
          'এই দিনে জান্নাতের দরজা খোলা হয় এবং বিদ্বেষমুক্ত মুমিনদের ক্ষমা করা হয়।',
        ],
        pointsEn: [
          'Deeds are raised to Allah on Mondays and Thursdays, and the Prophet ﷺ loved fasting on these days.',
          'Forgiveness is granted on these days except for those holding mutual grudges.',
        ],
        reference: 'জামে তিরমিযি ৭৪৭ (হাসান); সহিহ মুসলিম ২৫৬৫',
      },
      {
        titleBn: 'সফরে বের হতেন বৃহস্পতিবার',
        titleEn: 'Departing for Journeys on Thursday',
        pointsBn: [
          'কা’ব ইবনে মালিক (রা.) বলেন, রাসূলুল্লাহ ﷺ সফরে বের হলে বৃহস্পতিবার ছাড়া খুব কমই বের হতেন।',
          'তাবুক অভিযানেও তিনি বৃহস্পতিবার বের হয়েছিলেন।',
          'ইবনে হাজার (রহ.) বলেন, এর মানে সবসময় বৃহস্পতিবার নয়; অন্য দিনেও তিনি সফরে বের হয়েছেন।',
        ],
        pointsEn: [
          'Ka’b ibn Malik (RA) said: Rarely did the Messenger of Allah ﷺ set out on a journey except on a Thursday.',
          'He even departed for the Tabuk expedition on a Thursday.',
          'Ibn Hajar (RA) noted this reflects preference, not obligation — he also traveled on other days.',
        ],
        reference: 'সহিহ বুখারি ২৯৪৯, ২৯৫০; ফাতহুল বারি',
      },
    ],
  },
  {
    id: 'fri',
    order: 7,
    dayBn: 'শুক্রবার (জুমা)',
    dayEn: 'Friday (Jumuah)',
    dayAr: 'الْجُمُعَة',
    shortTagBn: 'গোসল, সুগন্ধি, জুমা, দরুদ ও দোয়া',
    shortTagEn: 'Ghusl, Perfume, Jumuah, Salawat & Dua',
    summaryBn: 'সপ্তাহের শ্রেষ্ঠ দিন। গোসল, সুগন্ধি, আগেভাগে মসজিদে যাওয়া, বিশেষ সূরা তিলাওয়াত, বেশি দরুদ ও দোয়া কবুলের মুহূর্ত।',
    summaryEn: 'The best day of the week: Ghusl, fragrance, early arrival, specific Surahs, abundant Salawat, and the hour of accepted Dua.',
    hasSpecificAmal: true,
    accentColor: '#006A4E',
    sections: [
      {
        titleBn: '১. জুমা: সপ্তাহের শ্রেষ্ঠ দিন ও দোয়া কবুলের মুহূর্ত',
        titleEn: '1. Jumuah: Best Day & Hour of Accepted Dua',
        pointsBn: [
          'তিনি বলেছেন, সূর্য ওঠে এমন দিনগুলোর মধ্যে শ্রেষ্ঠ দিন জুমার দিন; এ দিনেই আদম (আ.)-কে সৃষ্টি করা হয়েছে।',
          'জুমার দিনে এমন একটি মুহূর্ত আছে, তখন মুমিন বান্দা নামাজে দাঁড়িয়ে যা চায়, আল্লাহ তা দেন।',
        ],
        pointsEn: [
          'The best day on which the sun rises is Friday; on it Adam (AS) was created.',
          'There is an hour on Friday during which whatever a believing servant asks while standing in prayer, Allah grants it.',
        ],
        reference: 'সহিহ মুসলিম ৮৫৪; সহিহ বুখারি ৯৩৫',
      },
      {
        titleBn: '২. গোসল, সুগন্ধি আর আগেভাগে মসজিদে',
        titleEn: '2. Ghusl, Fragrance & Early Mosque Arrival',
        pointsBn: [
          'তিনি বলেছেন, তোমাদের কেউ জুমায় এলে যেন গোসল করে আসে।',
          'যে গোসল করে, তেল বা সুগন্ধি লাগিয়ে মসজিদে যায়, কাউকে ডিঙিয়ে না বসে, চুপচাপ খুতবা শোনে, তার দুই জুমার মাঝের গুনাহ মাফ হয়।',
          'প্রথম প্রহরে যে যায়, সে যেন একটি উট কুরবানি করল।',
        ],
        pointsEn: [
          'He instructed that whoever attends Jumuah should take a Ghusl (bath).',
          'Whoever bathes, applies oil or perfume, avoids stepping over people, and listens silently to the khutbah has sins forgiven between two Jumuahs.',
          'Whoever arrives in the first hour receives the reward of sacrificing a camel.',
        ],
        reference: 'সহিহ বুখারি ৮৭৭, ৮৮৩, ৮৮১',
      },
      {
        titleBn: '৩. জুমার দিনের তিলাওয়াত',
        titleEn: '3. Prophetic Surah Recitations on Friday',
        pointsBn: [
          'জুমার দিন ফজরের নামাজে তিনি পড়তেন সূরা সাজদা ও সূরা দাহর (ইনসান)।',
          'জুমার নামাজে কখনো পড়তেন সূরা আ’লা ও গাশিয়া, কখনো সূরা জুমা ও মুনাফিকুন।',
        ],
        pointsEn: [
          'In Friday Fajr prayer, he recited Surah As-Sajdah and Surah Al-Insan (Ad-Dahr).',
          'In the Jumuah prayer, he recited either Surah Al-A’la and Al-Ghashiyah, or Surah Al-Jumu’ah and Al-Munafiqun.',
        ],
        reference: 'সহিহ বুখারি ৮৯১; সহিহ মুসলিম ৮৭৭, ৮৭৮',
      },
      {
        titleBn: '৪. বেশি বেশি দরুদ, একা রোজা নয় ও কাইলুলা',
        titleEn: '4. Abundant Salawat, No Solo Friday Fast & Qailulah',
        pointsBn: [
          'তিনি বলেছেন, জুমার দিন আমার ওপর বেশি বেশি দরুদ পড়ো; তোমাদের দরুদ আমার কাছে পেশ করা হয়।',
          'শুধু জুমার দিন আলাদা করে রোজা রাখতে নিষেধ করেছেন; আগের বা পরের দিনসহ রাখা যায়।',
          'সাহল (রা.) বলেন, আমরা জুমার নামাজের পর দুপুরের বিশ্রাম (কাইলুলা) ও খাবার গ্রহণ করতাম।',
        ],
        pointsEn: [
          'Send abundant blessings (Salawat) upon me on Friday, for your blessings are presented to me.',
          'He forbade singling out Friday alone for fasting unless paired with the day before or after.',
          'Sahl (RA) reported: We used to take our midday nap (Qailulah) and meal only after the Jumuah prayer.',
        ],
        reference: 'সুনানে আবু দাউদ ১০৪৭ (সহিহ); সহিহ বুখারি ১৯৮৫, ৯৩৯',
      },
    ],
  },
];

export const MONTHLY_GENERAL_RULES: MonthlyGeneralRule[] = [
  {
    id: 'monthly_three_fasts',
    titleBn: 'প্রতি মাসে তিনটি রোজা ও আইয়ামে বীয',
    titleEn: 'Three Monthly Fasts & Ayyamul Beedh',
    timingBn: 'প্রতি হিজরি মাসের ১৩, ১৪ ও ১৫ তারিখ (অথবা যেকোনো ৩ দিন)',
    timingEn: '13th, 14th & 15th of Every Hijri Month (or any 3 days)',
    pointsBn: [
      'আবু হুরায়রা (রা.)-কে তিনি উপদেশ দিয়েছিলেন প্রতি মাসে তিনটি রোজা রাখতে।',
      'আয়েশা (রা.) বলেন, তিনি মাসে তিনটি রোজা রাখতেন, তবে নির্দিষ্ট তারিখ নিয়ে কড়াকড়ি করতেন না।',
      'আবু যর (রা.)-কে বলেছেন, মাসে তিনটি রাখলে ১৩, ১৪ ও ১৫ তারিখ রাখো; এগুলোকে বলা হয় আইয়ামে বীয।',
    ],
    pointsEn: [
      'He advised Abu Hurairah (RA) to fast three days every month.',
      'Aisha (RA) narrated that he fasted three days each month without strictly restricting which dates.',
      'To Abu Dharr (RA) he advised: "If you fast three days in a month, fast on the 13th, 14th, and 15th (Ayyamul Beedh)."',
    ],
    reference: 'সহিহ বুখারি ১৯৮১; সহিহ মুসলিম ১১৬০; জামে তিরমিযি ৭৬১ (হাসান)',
  },
  {
    id: 'monthly_new_crescent_dua',
    titleBn: 'নতুন চাঁদ দেখে দোয়া',
    titleEn: 'Supplication Upon Sighting the New Crescent Moon',
    timingBn: 'প্রতি হিজরি মাসের শুরুতে নতুন চাঁদ দেখার সময়',
    timingEn: 'At the start of every Hijri month upon sighting the crescent',
    pointsBn: [
      'নতুন চাঁদ দেখলে রাসূলুল্লাহ ﷺ বরকত, ঈমান, নিরাপত্তা ও ইসলামের দোয়া পড়তেন।',
      'এই হাদিসের সনদ নিয়ে মতভেদ আছে: ইমাম তিরমিযি হাসান বলেছেন, শায়খ আলবানি সহিহ বলেছেন, কেউ কেউ দুর্বল বলেছেন।',
    ],
    pointsEn: [
      'Upon sighting the new moon, he recited a supplication asking Allah for blessings, faith, safety, and Islam.',
      'Note on authenticity: Imam Tirmidhi graded it Hasan, Shaykh Albani graded it Sahih, while some scholars considered its chain weak.',
    ],
    reference: 'জামে তিরমিযি ৩৪৫১ (সনদ নিয়ে মতভেদ আছে)',
    dua: {
      titleBn: 'নতুন চাঁদ দেখে পড়ার দোয়া',
      titleEn: 'Dua for Sighting the New Moon',
      arabic: 'اللَّهُمَّ أَهِلَّهُ عَلَيْنَا بِالْيُمْنِ وَالْإِيمَانِ وَالسَّلَامَةِ وَالْإِسْلَامِ رَبِّي وَرَبُّكَ اللَّهُ',
      pronunciationBn: 'আল্লাহুম্মা আহলিলহু আলাইনা বিল ইউমনি ওয়াল ঈমান, ওয়াস সালামাতি ওয়াল ইসলাম, রাব্বী ওয়া রাব্বুকাল্লাহ।',
      pronunciationEn: 'Allahumma ahlilhu alayna bil-yumni wal-iman, was-salamati wal-Islam, Rabbi wa Rabbukallah.',
      meaningBn: 'হে আল্লাহ, এই চাঁদকে আমাদের জন্য বরকত, ঈমান, নিরাপত্তা ও ইসলাম নিয়ে উদিত করো। আমার ও তোমার রব আল্লাহ।',
      meaningEn: 'O Allah, let this crescent appear over us with blessing, faith, safety, and Islam. My Lord and your Lord is Allah.',
      reference: 'জামে তিরমিযি ৩৪৫১',
    },
  },
  {
    id: 'monthly_moon_counting',
    titleBn: 'চাঁদ দেখে মাস গোনা (২৯ বা ৩০ দিন)',
    titleEn: 'Counting Islamic Months by Crescent Sighting',
    timingBn: 'প্রতি মাসের ২৯ তারিখের সন্ধ্যায়',
    timingEn: 'Evening of the 29th of each Hijri month',
    pointsBn: [
      'তিনি বলেছেন, মাস কখনো ২৯ দিনের, কখনো ৩০ দিনের হয়।',
      'চাঁদ দেখে রোজা শুরু করো, চাঁদ দেখে রোজা শেষ করো; আকাশ মেঘলা থাকলে শাবান ৩০ দিন পূর্ণ করো।',
    ],
    pointsEn: [
      'He explained that a lunar month is sometimes 29 days and sometimes 30 days.',
      'Begin fasting when you sight the crescent and end fasting when you sight it; if skies are cloudy, complete Sha’ban as 30 days.',
    ],
    reference: 'সহিহ বুখারি ১৯১৩, ১৯০৯',
  },
];

export const DAILY_PDF_SUMMARY_SNAPSHOT: DailyPdfSnapshotItem[] = [
  {
    id: 'pdf_late_night',
    timeBn: 'শেষ রাত',
    timeEn: 'Last Third of Night',
    summaryBn: 'জাগরণ, মিসওয়াক, তাহাজ্জুদ, বিতর',
    summaryEn: 'Waking up, Miswak, Tahajjud (11 rakats), Witr',
    slideDetailsBn: [
      'রাতের প্রথম ভাগে ঘুমাতেন আর শেষ ভাগে মোরগের ডাক শুনে উঠে নামাজ পড়তেন; ফজরের আজান হলে প্রয়োজন হলে গোসল নইলে অজু করে মসজিদে যেতেন (বুখারি ১১৪৬, ১১৩২)।',
      'জেগে মিসওয়াক করতেন এবং পড়তেন: "আলহামদু লিল্লাহিল্লাযী আহইয়ানা..." (বুখারি ২৪৫, ৬৩১২)।',
      'তাহাজ্জুদ: রমাদান বা অন্য মাসে সাধারণত ১১ রাকাতের বেশি পড়তেন না, তবে দীর্ঘ ও সুন্দর হতো; দাঁড়িয়ে থাকতে থাকতে পা ফুলে যেত — "আমি কি কৃতজ্ঞ বান্দা হব না?" (বুখারি ১১৪৭, ১১৩০)।',
      'বিতরকে রাতের শেষ নামাজ বানাতে বলেছেন; শেষ রাতে জাগতে না পারলে আবু হুরায়রা (রা.)-কে ঘুমানোর আগেই বিতর পড়তে বলেছেন (বুখারি ৯৯৮, ১৯৮১)।',
    ],
    slideDetailsEn: [
      'Slept early in the night, rose at the rooster’s call in the last third; upon Fajr adhan, performed ghusl if needed or wudu (Bukhari 1146, 1132).',
      'Cleaned teeth with Miswak upon waking and recited the waking dua (Bukhari 245, 6312).',
      'Tahajjud: Usually 11 rakats long and serene until his feet swelled — "Should I not be a grateful servant?" (Bukhari 1147, 1130).',
      'Make Witr the last prayer of the night; advised Abu Hurairah (RA) to pray Witr before sleeping if unable to wake late (Bukhari 998, 1981).',
    ],
    reference: 'স্লাইড ০৪–০৭ · সহিহ বুখারি ১১৪৬, ২৪৫, ১১৪৭, ৯৯৮',
  },
  {
    id: 'pdf_before_fajr',
    timeBn: 'ফজরের আগে',
    timeEn: 'Before Fajr',
    summaryBn: 'দুই রাকাত সুন্নাত, ডান কাতে বিশ্রাম',
    summaryEn: '2 Rakats Fajr Sunnah & brief rest on right side',
    slideDetailsBn: [
      'নফল নামাজের মধ্যে ফজরের আগের দুই রাকাতের ব্যাপারে তিনি সবচেয়ে বেশি যত্নবান ছিলেন।',
      'বলেছেন, এই দুই রাকাত দুনিয়া ও তার সবকিছুর চেয়ে উত্তম; সুন্নাত পড়ে কিছুক্ষণ ডান কাতে শুয়ে বিশ্রাম নিতেন।',
    ],
    slideDetailsEn: [
      'He was most diligent regarding the 2 Sunnah rakats before Fajr above all voluntary prayers.',
      'He said these two rakats are better than the world and everything in it, then briefly lay on his right side.',
    ],
    reference: 'স্লাইড ০৮ · সহিহ বুখারি ১১৬৯, ১১৬০; মুসলিম ৭২৫',
  },
  {
    id: 'pdf_after_fajr',
    timeBn: 'ফজরের পর',
    timeEn: 'After Fajr',
    summaryBn: 'সূর্য ওঠা পর্যন্ত নামাজের জায়গায় বসা',
    summaryEn: 'Remaining in prayer spot until sunrise',
    slideDetailsBn: [
      'জাবির ইবনে সামুরা (রা.) বলেন, ফজরের নামাজের পর রাসূলুল্লাহ ﷺ সূর্য ওঠা পর্যন্ত নামাজের জায়গা থেকে উঠতেন না।',
      'এ সময় সাহাবিরা জাহেলি যুগের কথা বলে হাসতেন, আর তিনি মুচকি হাসতেন।',
    ],
    slideDetailsEn: [
      'Jabir ibn Samurah (RA) reported the Prophet ﷺ did not leave his prayer place after Fajr until sunrise.',
      'Companions reminisced and laughed while he smiled gently.',
    ],
    reference: 'স্লাইড ০৯ · সহিহ মুসলিম ৬৭০',
  },
  {
    id: 'pdf_morning',
    timeBn: 'সকাল',
    timeEn: 'Morning',
    summaryBn: 'সাইয়্যিদুল ইস্তিগফার, চাশতের নামাজ (২–৪+ রাকাত)',
    summaryEn: 'Sayyidul Istighfar & Duha (Chast) prayer',
    slideDetailsBn: [
      'সকাল-সন্ধ্যা সাইয়্যিদুল ইস্তিগফার ("আল্লাহুম্মা আনতা রাব্বী...") দৃঢ় বিশ্বাসে পড়ে মারা গেলে জান্নাতি (বুখারি ৬৩০৬)।',
      'সূর্য ওঠার পর চাশত (দুহা) ৪ রাকাত বা আল্লাহ যত চাইতেন তার চেয়ে বেশিও পড়তেন; আবু হুরায়রা (রা.)-কে ২ রাকাত পড়ার উপদেশ দিয়েছিলেন (মুসলিম ৭১৯; বুখারি ১৯৮১)।',
    ],
    slideDetailsEn: [
      'Reciting Sayyidul Istighfar morning and evening with firm conviction promises Paradise (Bukhari 6306).',
      'Prayed 4+ rakats of Duha after sunrise and advised Abu Hurairah (RA) at least 2 rakats daily (Muslim 719, Bukhari 1981).',
    ],
    reference: 'স্লাইড ১০–১১ · সহিহ বুখারি ৬৩০৬, ১৯৮১; মুসলিম ৭১৯',
  },
  {
    id: 'pdf_daytime',
    timeBn: 'দিনের বেলা',
    timeEn: 'Daytime',
    summaryBn: 'পরিবারের কাজ, ৭০–১০০ বার ইস্তিগফার',
    summaryEn: 'Helping family & 70–100x daily Istighfar',
    slideDetailsBn: [
      'আয়েশা (রা.) জানান, তিনি ঘরে পরিবারের কাজে সাহায্য করতেন; আর নামাজের সময় হলে সব রেখে নামাজে চলে যেতেন (বুখারি ৬৭৬)।',
      'বলেছেন: আমি দিনে ৭০ বারের বেশি (অন্য বর্ণনায় ১০০ বার) আল্লাহর কাছে ক্ষমা চাই ও তাওবা করি (বুখারি ৬৩০৭; মুসলিম ২৭০২)।',
    ],
    slideDetailsEn: [
      'Served his family at home until prayer time arrived, when he immediately went for Salah (Bukhari 676).',
      'Sought forgiveness and repented more than 70 to 100 times every day (Bukhari 6307; Muslim 2702).',
    ],
    reference: 'স্লাইড ১২ · সহিহ বুখারি ৬৭৬, ৬৩০৭; মুসলিম ২৭০২',
  },
  {
    id: 'pdf_zuhr',
    timeBn: 'যোহর ও প্রতি ফরজ',
    timeEn: 'Dhuhr & After Every Fard',
    summaryBn: 'আগে ৪ রাকাত সুন্নাত; ফরজের পর তাসবিহ (৩৩-৩৩-৩৩+১)',
    summaryEn: '4 Sunnah before Dhuhr; post-Fard Tasbih to 100',
    slideDetailsBn: [
      'যোহরের আগের ৪ রাকাত আর ফজরের আগের ২ রাকাত কখনো ছাড়তেন না; দিনে-রাতে ১২ রাকাত সুন্নাত পড়লে জান্নাতে ঘর বানানো হয় (বুখারি ১১৮২; মুসলিম ৭২৮)।',
      'প্রতি ফরজের পর সালাম ফিরিয়ে ৩ বার আস্তাগফিরুল্লাহ, "আল্লাহুম্মা আনতাস সালাম...", এবং ৩৩ বার সুবহানাল্লাহ, ৩৩ আলহামদুলিল্লাহ, ৩৩ আল্লাহু আকবার ও "লা ইলাহা ইল্লাল্লাহু..." দিয়ে ১০০ পূর্ণ করতেন (মুসলিম ৫৯১, ৫৯৭)।',
    ],
    slideDetailsEn: [
      'Never left the 4 Sunnah before Dhuhr or 2 before Fajr; 12 daily Sunnah Rawatib earn a house in Jannah (Bukhari 1182; Muslim 728).',
      'After every Fard prayer: 3x Astaghfirullah, Allahumma Antas-Salam, and 33-33-33+1 Dhikr to complete 100 (Muslim 591, 597).',
    ],
    reference: 'স্লাইড ১৩–১৪ · সহিহ বুখারি ১১৮২; মুসলিম ৭২৮, ৫৯১, ৫৯৭',
  },
  {
    id: 'pdf_after_asr',
    timeBn: 'আসরের পর',
    timeEn: 'After Asr',
    summaryBn: 'স্ত্রী ও পরিবারকে সময় দেওয়া',
    summaryEn: 'Quality time with wives & family',
    slideDetailsBn: [
      'আয়েশা (রা.) বলেন, আসরের নামাজ শেষে রাসূলুল্লাহ ﷺ স্ত্রীদের কাছে যেতেন এবং তাঁদের সাথে সময় কাটাতেন।',
      'সতর্ক করেছেন: যে আসরের নামাজ ছেড়ে দেয়, তার আমল নষ্ট হয়ে যায়।',
    ],
    slideDetailsEn: [
      'After Asr prayer, the Prophet ﷺ visited his wives and spent quality time with them.',
      'Warned that whoever abandons the Asr prayer loses their good deeds.',
    ],
    reference: 'স্লাইড ১৫ · সহিহ বুখারি ৫২১৬, ৫৫৩',
  },
  {
    id: 'pdf_after_isha',
    timeBn: 'এশার পর',
    timeEn: 'After Isha',
    summaryBn: 'অযথা গল্প নয়, তাড়াতাড়ি ঘুম',
    summaryEn: 'No idle talk; early sleep',
    slideDetailsBn: [
      'আবু বারযা (রা.) বলেন, রাসূলুল্লাহ ﷺ এশার আগে ঘুমানো এবং এশার পর গল্পগুজব অপছন্দ করতেন।',
      'রাতের শুরুতে তাড়াতাড়ি ঘুমিয়ে তিনি শেষ রাতে সহজেই উঠতেন।',
    ],
    slideDetailsEn: [
      'Disliked sleeping before Isha and idle conversation after Isha.',
      'Sleeping early enabled rising effortlessly in the blessed final third of the night.',
    ],
    reference: 'স্লাইড ১৬ · সহিহ বুখারি ৫৬৮',
  },
  {
    id: 'pdf_before_sleep',
    timeBn: 'ঘুমের আগে',
    timeEn: 'Before Sleep',
    summaryBn: 'অজু, ডান কাত, তিন কুল, আয়াতুল কুরসি, ৩৩-৩৩-৩৪ তাসবিহ',
    summaryEn: 'Wudu, right side, 3 Quls, Ayatul Kursi & 33-33-34 Tasbih',
    slideDetailsBn: [
      'নামাজের মতো অজু করে ডান কাতে শুয়ে "আল্লাহুম্মা আসলামতু নাফসী ইলাইক..." ও "বিসমিকা আল্লাহুম্মা আমূতু ওয়া আহইয়া" পড়তেন (বুখারি ২৪৭, ৬৩১২)।',
      'দুই হাত একত্র করে সূরা ইখলাস, ফালাক ও নাস পড়ে ফুঁ দিয়ে তিনবার সারা শরীরে হাত বুলাতেন; আয়াতুল কুরসি পড়লে সকাল পর্যন্ত আল্লাহর রক্ষক থাকেন (বুখারি ৫০১৭, ২৩১১)।',
      'ফাতিমা (রা.) ও আলী (রা.)-কে শিখিয়েছেন: ঘুমের আগে ৩৩ বার সুবহানাল্লাহ, ৩৩ বার আলহামদুলিল্লাহ ও ৩৪ বার আল্লাহু আকবার (বুখারি ৩৭০৫)।',
    ],
    slideDetailsEn: [
      'Perform Wudu, lie on the right side, and recite the Sunnah sleeping supplications (Bukhari 247, 6312).',
      'Recite Surah Ikhlas, Falaq, and Nas into cupped hands and wipe over the body three times; Ayatul Kursi ensures angelic protection till dawn (Bukhari 5017, 2311).',
      'Taught Fatimah (RA) & Ali (RA): 33x SubhanAllah, 33x Alhamdulillah, 34x Allahu Akbar at bedtime (Bukhari 3705).',
    ],
    reference: 'স্লাইড ১৭–১৮ · সহিহ বুখারি ২৪৭, ৫০১৭, ২৩১১, ৩৭০৫',
  },
];

export const PROPHETIC_12_MONTHS: PropheticMonthItem[] = [
  {
    id: 'jumadal_ukhra',
    order: 1,
    hijriYearBn: '১৪৪৮ হিজরি',
    hijriYearEn: '1448 AH',
    nameBn: 'জুমাদাল উখরা',
    nameEn: 'Jumada al-Akhirah',
    nameAr: 'جُمَادَى الْآخِرَة',
    approxStartBn: '১১ নভেম্বর ২০২৬ থেকে',
    approxStartEn: 'From 11 Nov 2026',
    ayyamulBeedhBn: '২৩, ২৪ ও ২৫ নভেম্বর ২০২৬ (১৩–১৫ জুমাদাল উখরা)',
    ayyamulBeedhEn: '23, 24 & 25 Nov 2026 (13–15 Jumada al-Akhirah)',
    coreAmalBn: 'নিয়মিত আমল ও বিগত কাযা রোজা শুরু',
    coreAmalEn: 'Consistent daily/weekly routine & Qada fasts',
    headlineBn: 'চলমান মাস: নিয়মিত রুটিন ও কাযা রোজা আদায়ের শুরু',
    headlineEn: 'Steady Routine & Beginning Missed Fast Make-ups',
    isSacredMonth: false,
    hasSpecialFasting: false,
    accentColor: '#0d9488',
    topics: [
      {
        titleBn: 'জুমাদাল উখরা: চলমান মাসের আমল ও কাযা রোজা',
        titleEn: 'Jumada al-Akhirah: Regular Routine & Qada Fasts',
        slideTagBn: 'স্লাইড ৩৬ · মাস ০১/১২',
        slideTagEn: 'Month 01/12',
        pointsBn: [
          'এই মাসের জন্য সহিহ হাদিসে বিশেষ কোনো আমল নেই; চলবে দৈনিক ও সাপ্তাহিক রুটিন।',
          'আইয়ামে বীযের নফল রোজা: ২৩, ২৪ ও ২৫ নভেম্বর (১৩–১৫ জুমাদাল উখরা)।',
          'আয়েশা (রা.) রমাদানের কাযা রোজা পরের শাবানে আদায় করতেন; আপনার কাযা রোজা থাকলে এখন থেকেই আদায় শুরু করতে পারেন।',
        ],
        pointsEn: [
          'No month-specific ritual is specified in authentic Hadith for this month; maintain the daily and weekly Sunnah routine.',
          'Ayyamul Beedh fasts: 23, 24 & 25 November (13–15 Jumada al-Akhirah).',
          'Aisha (RA) completed missed Ramadan fasts before the next Ramadan (often by Sha’ban); if you have missed fasts, begin early from this month.',
        ],
        reference: 'সহিহ বুখারি ১৯৫০',
      },
    ],
  },
  {
    id: 'rajab',
    order: 2,
    hijriYearBn: '১৪৪৮ হিজরি',
    hijriYearEn: '1448 AH',
    nameBn: 'রজব',
    nameEn: 'Rajab',
    nameAr: 'رَجَب',
    approxStartBn: '১০ ডিসেম্বর ২০২৬ থেকে',
    approxStartEn: 'From 10 Dec 2026',
    ayyamulBeedhBn: '২২, ২৩ ও ২৪ ডিসেম্বর ২০২৬',
    ayyamulBeedhEn: '22, 23 & 24 Dec 2026',
    coreAmalBn: 'চারটি সম্মানিত মাসের একটি; গুনাহ বর্জন',
    coreAmalEn: 'One of the 4 Sacred Months; guarding against sins',
    headlineBn: 'সম্মানিত মাস রজব ও সহিহ বনাম দুর্বল বর্ণনার সতর্কতা',
    headlineEn: 'Sacred Month of Rajab & Discerning Authentic Deeds',
    isSacredMonth: true,
    hasSpecialFasting: false,
    accentColor: '#059669',
    topics: [
      {
        titleBn: 'রজব: চারটি সম্মানিত মাসের একটি',
        titleEn: 'Rajab: One of the Four Sacred Months',
        slideTagBn: 'স্লাইড ৩৭ · মাস ০২/১২',
        slideTagEn: 'Month 02/12',
        pointsBn: [
          'রজব সম্মানিত চার মাসের (আশহুরে হুরুম) একটি; এ মাসে গুনাহ থেকে বিশেষভাবে বেঁচে থাকার নির্দেশ রয়েছে।',
          'আইয়ামে বীয: ২২, ২৩ ও ২৪ ডিসেম্বর; সোম ও বৃহস্পতিবারের নফল রোজাও নিয়মিত চলবে।',
        ],
        pointsEn: [
          'Rajab is one of the four sacred months; believers are commanded to especially avoid wrongdoing and sins.',
          'Ayyamul Beedh: 22, 23 & 24 December, along with regular Monday & Thursday voluntary fasts.',
        ],
        reference: 'সহিহ বুখারি ৪৬৬২; সূরা তাওবা ৯:৩৬',
      },
    ],
    authenticityCautionBn: {
      title: 'রজব নিয়ে যা সহিহ নয় (সতর্কতা)',
      points: [
        'রজবের বিশেষ রোজা, বিশেষ নামাজ (যেমন সালাতুর রাগায়েব) বা বিশেষ দোয়ার ফজিলতের হাদিসগুলো দুর্বল বা বানোয়াট।',
        '২৭ রজবকে মেরাজের রাত বলা হয়, কিন্তু এই তারিখ নিয়ে মতভেদ আছে; এ রাতের নির্দিষ্ট আমলের সহিহ ভিত্তি নেই।',
        'সাধারণ নফল রোজা ও ইবাদত অন্য মাসের মতো রজবেও করা যায়।',
      ],
      reference: 'ইবনে হাজার আসকালানি (রহ.), তাবয়ীনুল আজাব বিমা ওয়ারাদা ফী ফাদলি রজব',
    },
    authenticityCautionEn: {
      title: 'What Is Not Authentic About Rajab',
      points: [
        'Reports claiming special Rajab-exclusive prayers (like Salatur-Raghaib), fasts, or prayers carry weak or fabricated chains.',
        'The exact date of Isra & Mi’raj (often assumed 27 Rajab) is historically disputed, and no specific night-worship is authenticated for it.',
        'General voluntary fasting and worship are encouraged just as in any other month.',
      ],
      reference: 'Ibn Hajar al-Asqalani, Tabyin al-Ajab bima Warada fi Fadli Rajab',
    },
  },
  {
    id: 'shaban',
    order: 3,
    hijriYearBn: '১৪৪৮ হিজরি',
    hijriYearEn: '1448 AH',
    nameBn: 'শাবান',
    nameEn: "Sha'ban",
    nameAr: 'شَعْبَان',
    approxStartBn: '৯ জানুয়ারি ২০২৭ থেকে',
    approxStartEn: 'From 9 Jan 2027',
    coreAmalBn: 'রমাদানের বাইরে সবচেয়ে বেশি নফল রোজা ও আমল তোলা',
    coreAmalEn: 'Most abundant voluntary fasting & deeds raised',
    headlineBn: 'সবচেয়ে বেশি নফল রোজা, কাযা আদায় ও রমাদানের প্রস্তুতি',
    headlineEn: 'Most Voluntary Fasts, Qada Completion & Ramadan Readiness',
    isSacredMonth: false,
    hasSpecialFasting: true,
    keyDatesBn: ['নবীজি ﷺ শাবানে সর্বাধিক নফল রোজা রাখতেন', 'রমাদানের আগে কাযা রোজা শেষ করার শেষ সময়'],
    keyDatesEn: ['Most voluntary fasting outside Ramadan', 'Final window for Qada fasts before Ramadan'],
    accentColor: '#0284c7',
    topics: [
      {
        titleBn: 'শাবান: সবচেয়ে বেশি নফল রোজার মাস',
        titleEn: "Sha'ban: The Month of Most Abundant Voluntary Fasts",
        slideTagBn: 'স্লাইড ৩৯ · মাস ০৩/১২',
        slideTagEn: 'Month 03/12',
        pointsBn: [
          'আয়েশা (রা.) বলেন, রমাদান ছাড়া পুরো মাস রোজা রাখতে দেখিনি, আর শাবানের চেয়ে বেশি নফল রোজা আর কোনো মাসে রাখতে দেখিনি।',
          'উসামা (রা.)-কে বলেছেন, রজব ও রমাদানের মাঝের এই মাস নিয়ে মানুষ উদাসীন থাকে; এ মাসে আমল আল্লাহর কাছে তোলা হয়, আমি চাই রোজা অবস্থায় আমার আমল উঠুক।',
        ],
        pointsEn: [
          'Aisha (RA) said he never fasted an entire month except Ramadan, and never fasted more in any month than in Sha’ban.',
          'He told Usamah (RA): People overlook this month between Rajab and Ramadan; deeds are raised to Allah in it, and I wish for mine to be raised while I am fasting.',
        ],
        reference: 'সহিহ বুখারি ১৯৬৯; সুনানে নাসায়ি ২৩৫৭ (হাসান)',
      },
      {
        titleBn: 'কাযা রোজা, শেষ দিন ও মধ্য শাবানের অবস্থান',
        titleEn: 'Qada Fasts, Last Two Days & Mid-Sha’ban',
        slideTagBn: 'স্লাইড ৪০ · মাস ০৩/১২',
        slideTagEn: 'Month 03/12',
        pointsBn: [
          'আয়েশা (রা.) রমাদানের কাযা রোজা শাবানে আদায় করতেন।',
          'রমাদানের এক-দুই দিন আগে রোজা রাখতে নিষেধ করেছেন; তবে যার আগে থেকে নিয়মিত অভ্যাস আছে, সে রাখতে পারে।',
        ],
        pointsEn: [
          'Aisha (RA) made up her missed Ramadan fasts during Sha’ban.',
          'Fasting one or two days immediately prior to Ramadan is discouraged unless it coincides with one’s regular fasting habit.',
        ],
        reference: 'সহিহ বুখারি ১৯৫০, ১৯১৪',
      },
    ],
    authenticityCautionBn: {
      title: 'মধ্য শাবান নিয়ে বিশুদ্ধ অবস্থান',
      points: [
        'মধ্য শাবানের রাতের ফজিলতের হাদিস নিয়ে মতভেদ আছে; এ রাতের জন্য নির্দিষ্ট নামাজের সহিহ ভিত্তি নেই।',
      ],
      reference: 'সুনানে ইবনে মাজাহ ১৩৯০ (মতভেদ আছে)',
    },
    authenticityCautionEn: {
      title: 'Note on Mid-Sha’ban',
      points: [
        'Reports on the virtues of mid-Sha’ban night have scholarly disagreement; no specific fixed prayer is established for that night.',
      ],
      reference: 'Sunan Ibn Majah 1390 (scholarly debate)',
    },
  },
  {
    id: 'ramadan',
    order: 4,
    hijriYearBn: '১৪৪৮ হিজরি',
    hijriYearEn: '1448 AH',
    nameBn: 'রমাদান',
    nameEn: 'Ramadan',
    nameAr: 'رَمَضَان',
    approxStartBn: '৮ ফেব্রুয়ারি ২০২৭ থেকে',
    approxStartEn: 'From 8 Feb 2027',
    coreAmalBn: 'ফরজ রোজা, কুরআন, দানশীলতা, কিয়ামুল লাইল, ইতিকাফ ও ফিতরা',
    coreAmalEn: 'Fasting, Quran, Charity, Qiyam, I’tikaf & Fitrah',
    headlineBn: 'রহমত, কুরআন, দানশীলতা, শেষ দশকের ইতিকাফ ও লাইলাতুল কদর',
    headlineEn: 'Month of Quran, Generosity, Night Prayer, I’tikaf & Laylatul Qadr',
    isSacredMonth: false,
    hasSpecialFasting: true,
    keyDatesBn: ['২১, ২৩, ২৫, ২৭, ২৯ রমাদান: বিজোড় রাতে কদর অনুসন্ধান', 'ঈদের নামাজের আগেই সদকাতুল ফিতর'],
    keyDatesEn: ['Last 10 odd nights: Seek Laylatul Qadr', 'Sadaqatul Fitr before Eid prayer'],
    accentColor: '#006A4E',
    topics: [
      {
        titleBn: '১. দানশীলতা আর কুরআনের মাস',
        titleEn: '1. Generosity & Nightly Quran Revision',
        slideTagBn: 'স্লাইড ৪২ · রমাদান ১/৬',
        slideTagEn: 'Ramadan 1/6',
        pointsBn: [
          'ইবনে আব্বাস (রা.) বলেন, রাসূলুল্লাহ ﷺ ছিলেন সবচেয়ে দানশীল, আর রমাদানে সবচেয়ে বেশি দান করতেন।',
          'রমাদানের প্রতি রাতে জিবরাঈল (আ.) এসে তাঁর সাথে কুরআন পর্যালোচনা করতেন; তখন তিনি প্রবাহিত বাতাসের চেয়েও বেশি দানশীল হতেন।',
        ],
        pointsEn: [
          'Ibn Abbas (RA) narrated the Prophet ﷺ was the most generous of people, and most generous during Ramadan.',
          'Every night of Ramadan Jibreel (AS) met him to review the Quran, making him more generous than the blowing wind.',
        ],
        reference: 'সহিহ বুখারি ৬',
      },
      {
        titleBn: '২. সাহরি ও ইফতারের সুন্নাত',
        titleEn: '2. Sunnah of Suhoor & Breaking Fast',
        slideTagBn: 'স্লাইড ৪৩ · রমাদান ২/৬',
        slideTagEn: 'Ramadan 2/6',
        pointsBn: [
          'তিনি বলেছেন, সাহরি খাও, কারণ সাহরিতে বরকত আছে।',
          'মানুষ ততদিন কল্যাণে থাকবে, যতদিন দ্রুত ইফতার করবে।',
          'ইফতার করতেন তাজা খেজুর দিয়ে; না পেলে শুকনো খেজুর, তাও না পেলে কয়েক ঢোক পানি।',
        ],
        pointsEn: [
          'Eat Suhoor, for indeed there is Barakah (blessing) in Suhoor.',
          'People will remain upon goodness as long as they hasten to break the fast.',
          'He broke his fast with fresh dates; if none, dried dates; if none, a few sips of water.',
        ],
        reference: 'সহিহ বুখারি ১৯২৩, ১৯৫৭; আবু দাউদ ২৩৫৬ (হাসান)',
      },
      {
        titleBn: '৩. রমাদানের রাতের নামাজ (তারাবিহ/কিয়াম)',
        titleEn: '3. Night Prayers in Ramadan',
        slideTagBn: 'স্লাইড ৪৪ · রমাদান ৩/৬',
        slideTagEn: 'Ramadan 3/6',
        pointsBn: [
          'তিনি বলেছেন, যে ঈমান ও সওয়াবের আশায় রমাদানের রাতে নামাজ পড়ে, তার আগের গুনাহ মাফ করা হয়।',
          'কয়েক রাত তিনি মসজিদে জামাতে রাতের নামাজ পড়েছেন; পরে ফরজ হয়ে যাওয়ার আশঙ্কায় আর বের হননি।',
        ],
        pointsEn: [
          'Whoever stands in prayer in Ramadan out of faith and hope for reward will have previous sins forgiven.',
          'He led congregation prayers for a few nights, then paused out of compassion lest it become obligatory.',
        ],
        reference: 'সহিহ বুখারি ৩৭, ২০১২',
      },
      {
        titleBn: '৪. শেষ দশকে সর্বোচ্চ চেষ্টা ও ইতিকাফ',
        titleEn: '4. Maximum Striving & I’tikaf in Last 10 Nights',
        slideTagBn: 'স্লাইড ৪৫ · রমাদান ৪/৬',
        slideTagEn: 'Ramadan 4/6',
        pointsBn: [
          'শেষ দশক এলে তিনি কোমর বেঁধে নিতেন, সারা রাত জাগতেন আর পরিবারকেও জাগাতেন।',
          'ইন্তেকাল পর্যন্ত প্রতি রমাদানের শেষ দশকে ইতিকাফ করেছেন।',
        ],
        pointsEn: [
          'When the last ten nights entered, he tightened his waist belt, stayed up all night, and woke his family.',
          'He observed I’tikaf during the last ten days of every Ramadan until his passing.',
        ],
        reference: 'সহিহ বুখারি ২০২৪, ২০২৬',
      },
      {
        titleBn: '৫. লাইলাতুল কদর খোঁজা',
        titleEn: '5. Seeking Laylatul Qadr',
        slideTagBn: 'স্লাইড ৪৬ · রমাদান ৫/৬',
        slideTagEn: 'Ramadan 5/6',
        pointsBn: [
          'তিনি বলেছেন, কদরের রাত খোঁজো শেষ দশকের বিজোড় রাতে।',
          'যে ঈমান ও সওয়াবের আশায় কদরের রাতে নামাজ পড়ে, তার আগের গুনাহ মাফ হয়।',
          'আয়েশা (রা.)-কে শিখিয়েছেন: আল্লাহুম্মা ইন্নাকা আফুউউন তুহিব্বুল আফওয়া ফা’ফু আন্নী।',
        ],
        pointsEn: [
          'Seek Laylatul Qadr in the odd nights of the last ten days.',
          'Whoever prays on Laylatul Qadr out of sincere faith and hope for reward is forgiven past sins.',
          'Taught Aisha (RA) the special supplication of forgiveness for that night.',
        ],
        reference: 'সহিহ বুখারি ২০১৭, ১৯০১; তিরমিযি ৩৫১৩ (সহিহ)',
      },
      {
        titleBn: '৬. রমাদানে উমরা, ঈদের আগে ফিতরা',
        titleEn: '6. Ramadan Umrah & Sadaqatul Fitr',
        slideTagBn: 'স্লাইড ৪৭ · রমাদান ৬/৬',
        slideTagEn: 'Ramadan 6/6',
        pointsBn: [
          'তিনি বলেছেন, রমাদানে উমরা করা (সওয়াবে) হজের সমান।',
          'ইবনে উমর (রা.) বলেন, তিনি ছোট-বড়, নারী-পুরুষ সবার পক্ষ থেকে সদকাতুল ফিতর দিতে বলেছেন: এক সা’ খেজুর বা যব।',
          'আর তা ঈদের নামাজে যাওয়ার আগেই আদায় করতে বলেছেন।',
        ],
        pointsEn: [
          'Performing Umrah in Ramadan equals the reward of Hajj (with me).',
          'Enjoined Sadaqatul Fitr (one Sa’ of dates or barley) on every Muslim, young and old, male and female.',
          'Ordered it to be paid before going out to the Eid prayer.',
        ],
        reference: 'সহিহ বুখারি ১৭৮২, ১৫০৩',
      },
    ],
    specialDua: {
      titleBn: 'লাইলাতুল কদরের বিশেষ দোয়া',
      titleEn: 'Supplication for Laylatul Qadr',
      arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
      pronunciationBn: 'আল্লাহুম্মা ইন্নাকা আফুউউন তুহিব্বুল আফওয়া ফা’ফু আন্নী।',
      pronunciationEn: 'Allahumma innaka Afuwwun tuhibbul-afwa fa’fu anni.',
      meaningBn: 'হে আল্লাহ, নিশ্চয় আপনি ক্ষমাশীল, ক্ষমা করতে ভালোবাসেন; অতএব আমাকে ক্ষমা করে দিন।',
      meaningEn: 'O Allah, You are Pardoning and You love to pardon, so pardon me.',
      reference: 'জামে তিরমিযি ৩৫১৩ (সহিহ)',
    },
  },
  {
    id: 'shawwal',
    order: 5,
    hijriYearBn: '১৪৪৮ হিজরি',
    hijriYearEn: '1448 AH',
    nameBn: 'শাওয়াল',
    nameEn: 'Shawwal',
    nameAr: 'شَوَّال',
    approxStartBn: '৯ মার্চ ২০২৭ থেকে',
    approxStartEn: 'From 9 Mar 2027',
    ayyamulBeedhBn: '২১, ২২ ও ২৩ মার্চ ২০২৭',
    ayyamulBeedhEn: '21, 22 & 23 Mar 2027',
    coreAmalBn: 'ঈদুল ফিতরের সুন্নাত ও শাওয়ালের ছয় রোজা',
    coreAmalEn: 'Eid al-Fitr Sunnahs & 6 Fasts of Shawwal',
    headlineBn: 'ঈদুল ফিতরের সুন্নাত, শাওয়ালের ৬ রোজা ও শুভ বিবাহের মাস',
    headlineEn: 'Eid al-Fitr Sunnahs, 6 Fasts of Shawwal & Breaking Superstition',
    isSacredMonth: false,
    hasSpecialFasting: true,
    accentColor: '#16a34a',
    topics: [
      {
        titleBn: 'ঈদুল ফিতরের সুন্নাত',
        titleEn: 'Sunnahs of Eid al-Fitr',
        slideTagBn: 'স্লাইড ৪৮ · শাওয়াল ১/২',
        slideTagEn: 'Shawwal 1/2',
        pointsBn: [
          'ঈদুল ফিতরের দিন কয়েকটি খেজুর না খেয়ে ঈদগাহে যেতেন না; খেজুর খেতেন বিজোড় সংখ্যায়।',
          'ঈদের দিন এক পথে যেতেন, অন্য পথে ফিরতেন।',
        ],
        pointsEn: [
          'On Eid al-Fitr, he would not depart for the prayer ground until eating an odd number of dates.',
          'He would go to the Eid prayer by one route and return by a different route.',
        ],
        reference: 'সহিহ বুখারি ৯৫৩, ৯৮৬',
      },
      {
        titleBn: 'শাওয়ালের ছয় রোজা ও সুন্নাহ বিয়ে',
        titleEn: 'Six Fasts of Shawwal & Blessed Marriage',
        slideTagBn: 'স্লাইড ৪৯ · শাওয়াল ২/২',
        slideTagEn: 'Shawwal 2/2',
        pointsBn: [
          'তিনি বলেছেন, যে রমাদানের রোজা রেখে শাওয়ালে ছয়টি রোজা রাখে, সে যেন সারা বছর রোজা রাখল।',
          'জাহেলি যুগে শাওয়ালে বিয়েকে অশুভ ভাবা হতো; আয়েশা (রা.) বলেন, রাসূলুল্লাহ ﷺ তাঁকে শাওয়াল মাসেই বিয়ে করেছেন।',
          'আইয়ামে বীয: ২১, ২২ ও ২৩ মার্চ ২০২৭।',
        ],
        pointsEn: [
          'Whoever fasts Ramadan and follows it with six days of Shawwal is as if he fasted the entire year.',
          'Pre-Islamic superstition viewed marriage in Shawwal as unlucky; Aisha (RA) noted the Prophet ﷺ married her in Shawwal.',
          'Ayyamul Beedh: 21, 22 & 23 March 2027.',
        ],
        reference: 'সহিহ মুসলিম ১১৬৪, ১৪২৩',
      },
    ],
  },
  {
    id: 'dhul_qidah',
    order: 6,
    hijriYearBn: '১৪৪৮ হিজরি',
    hijriYearEn: '1448 AH',
    nameBn: 'যিলকদ',
    nameEn: "Dhul-Qi'dah",
    nameAr: 'ذُو الْقَعْدَة',
    approxStartBn: '৮ এপ্রিল ২০২৭ থেকে',
    approxStartEn: 'From 8 Apr 2027',
    ayyamulBeedhBn: '২০, ২১ ও ২২ এপ্রিল ২০২৭',
    ayyamulBeedhEn: '20, 21 & 22 Apr 2027',
    coreAmalBn: 'সম্মানিত মাস ও রাসূলুল্লাহ ﷺ-এর উমরার মাস',
    coreAmalEn: 'Sacred Month & Month of Prophetic Umrahs',
    headlineBn: 'আশহুরে হুরুমের সূচনা ও নবীজির সকল স্বাধীন উমরার মাস',
    headlineEn: 'First of the Three Consecutive Sacred Months & Umrah',
    isSacredMonth: true,
    hasSpecialFasting: false,
    accentColor: '#047857',
    topics: [
      {
        titleBn: 'যিলকদ: সম্মানিত মাস, উমরার মাস',
        titleEn: "Dhul-Qi'dah: Sacred Month & Month of Umrah",
        slideTagBn: 'স্লাইড ৫০ · মাস ০৬/১২',
        slideTagEn: 'Month 06/12',
        pointsBn: [
          'যিলকদ সম্মানিত চার মাসের একটি।',
          'আনাস (রা.) বলেন, রাসূলুল্লাহ ﷺ চারটি উমরা করেছেন; হজের সাথের উমরাটি ছাড়া বাকি সবগুলো যিলকদ মাসে।',
          'আইয়ামে বীয: ২০, ২১ ও ২২ এপ্রিল ২০২৭।',
        ],
        pointsEn: [
          'Dhul-Qi’dah is one of the four sacred months in Islam.',
          'Anas (RA) reported the Prophet ﷺ performed four Umrahs, all of them in Dhul-Qi’dah except the one combined with his Hajj.',
          'Ayyamul Beedh: 20, 21 & 22 April 2027.',
        ],
        reference: 'সহিহ বুখারি ৪৬৬২, ১৭৭৮',
      },
    ],
  },
  {
    id: 'dhul_hijjah',
    order: 7,
    hijriYearBn: '১৪৪৮ হিজরি',
    hijriYearEn: '1448 AH',
    nameBn: 'যিলহজ',
    nameEn: 'Dhul-Hijjah',
    nameAr: 'ذُو الْحِجَّة',
    approxStartBn: '৭ মে ২০২৭ থেকে',
    approxStartEn: 'From 7 May 2027',
    coreAmalBn: 'প্রথম ১০ দিন, আরাফার রোজা, ঈদুল আযহা, কুরবানি ও হজ',
    coreAmalEn: 'First 10 Days, Arafah Fast, Eid al-Adha, Qurbani & Hajj',
    headlineBn: 'বছরের শ্রেষ্ঠ ১০ দিন, আরাফার রোজা (২ বছরের কাফফারা) ও কুরবানি',
    headlineEn: 'Best 10 Days, Arafah Fast (2 Years Expiation) & Qurbani',
    isSacredMonth: true,
    hasSpecialFasting: true,
    keyDatesBn: ['প্রথম দশক: ৭ – ১৬ মে ২০২৭', 'আরাফার দিন (৯ যিলহজ): ১৫ মে ২০২৭', 'ঈদুল আযহা: ১৬ মে ২০২৭ (বাংলাদেশে ১ দিন পর হতে পারে)'],
    keyDatesEn: ['First 10 days: 7 – 16 May 2027', 'Day of Arafah: 15 May 2027', 'Eid al-Adha: 16 May 2027'],
    accentColor: '#b45309',
    topics: [
      {
        titleBn: '১. যিলহজের প্রথম দশ দিন',
        titleEn: '1. First Ten Days of Dhul-Hijjah',
        slideTagBn: 'স্লাইড ৫১ · যিলহজ ১/৩',
        slideTagEn: 'Dhul-Hijjah 1/3',
        pointsBn: [
          'তিনি বলেছেন, এই দশ দিনের নেক আমলের চেয়ে আল্লাহর কাছে প্রিয় আমল আর কোনো দিনে নেই।',
          'কুরবানির নিয়ত থাকলে যিলহজের চাঁদ ওঠার পর থেকে কুরবানি পর্যন্ত চুল ও নখ কাটা থেকে বিরত থাকতে বলেছেন।',
          'প্রথম দশক: ৭ থেকে ১৬ মে ২০২৭।',
        ],
        pointsEn: [
          'There are no days in which righteous deeds are more beloved to Allah than these ten days.',
          'Whoever intends to offer Qurbani should refrain from cutting hair and nails from the sighting of Dhul-Hijjah moon until sacrifice.',
          'First ten days: 7 to 16 May 2027.',
        ],
        reference: 'সহিহ বুখারি ৯৬৯; আবু দাউদ ২৪৩৮ (সহিহ); মুসলিম ১৯৭৭',
      },
      {
        titleBn: '২. আরাফার দিনের রোজা',
        titleEn: '2. Fasting on the Day of Arafah',
        slideTagBn: 'স্লাইড ৫২ · যিলহজ ২/৩',
        slideTagEn: 'Dhul-Hijjah 2/3',
        pointsBn: [
          'তিনি বলেছেন, আরাফার দিনের রোজা আগের এক বছর ও পরের এক বছরের গুনাহের কাফফারা হবে বলে আমি আশা করি।',
          'আরাফার দিন: ১৫ মে ২০২৭; ঈদুল আযহা: ১৬ মে ২০২৭ (বাংলাদেশে চাঁদ দেখার ওপর তারিখ একদিন পরে হতে পারে)।',
        ],
        pointsEn: [
          'Fasting on the Day of Arafah expiates the sins of the previous year and the coming year.',
          'Day of Arafah: 15 May 2027; Eid al-Adha: 16 May 2027 (subject to local moon sighting).',
        ],
        reference: 'সহিহ মুসলিম ১১৬২',
      },
      {
        titleBn: '৩. ঈদুল আযহা, কুরবানি ও হজ',
        titleEn: '3. Eid al-Adha, Qurbani & Farewell Hajj',
        slideTagBn: 'স্লাইড ৫৩ · যিলহজ ৩/৩',
        slideTagEn: 'Dhul-Hijjah 3/3',
        pointsBn: [
          'ঈদুল আযহার দিন নামাজের আগে কিছু খেতেন না।',
          'তিনি শিংওয়ালা সাদা-কালো দুটি দুম্বা কুরবানি করেছেন; নিজ হাতে বিসমিল্লাহ ও আল্লাহু আকবার বলে জবাই করেছেন।',
          'হিজরতের পর তিনি একবারই হজ করেছেন, সেটি বিদায় হজ।',
        ],
        pointsEn: [
          'On Eid al-Adha, he would not eat until after returning from the Eid prayer.',
          'He sacrificed two horned black-and-white rams with his own hands, saying Bismillah and Allahu Akbar.',
          'He performed Hajj only once after Hijrah — the Farewell Pilgrimage.',
        ],
        reference: 'জামে তিরমিযি ৫৪২ (সহিহ); সহিহ বুখারি ৫৫৬৫, ৪৪০৪',
      },
    ],
  },
  {
    id: 'muharram',
    order: 8,
    hijriYearBn: '১৪৪৯ হিজরি',
    hijriYearEn: '1449 AH',
    nameBn: 'মুহাররম',
    nameEn: 'Muharram',
    nameAr: 'مُحَرَّم',
    approxStartBn: '৬ জুন ২০২৭ থেকে',
    approxStartEn: 'From 6 Jun 2027',
    coreAmalBn: 'নফল রোজা ও আশুরার রোজা (৯ ও ১০ মুহাররম)',
    coreAmalEn: 'Month of Allah & Ashura Fasting (9th & 10th)',
    headlineBn: 'আল্লাহর মাস, হিজরি নববর্ষ ১৪৪৯ ও আশুরার রোজা',
    headlineEn: 'The Month of Allah, Hijri New Year 1449 & Ashura Fasting',
    isSacredMonth: true,
    hasSpecialFasting: true,
    keyDatesBn: ['আশুরার রোজা (৯ ও ১০ মুহাররম): ১৪ ও ১৫ জুন ২০২৭'],
    keyDatesEn: ['Ashura Fasts (9th & 10th Muharram): 14 & 15 Jun 2027'],
    accentColor: '#0f766e',
    topics: [
      {
        titleBn: '১. মুহাররম: আল্লাহর মাস ও শ্রেষ্ঠ নফল রোজা',
        titleEn: '1. Muharram: The Month of Allah',
        slideTagBn: 'স্লাইড ৫৪ · মুহাররম ১/২',
        slideTagEn: 'Muharram 1/2',
        pointsBn: [
          'তিনি বলেছেন, রমাদানের পর শ্রেষ্ঠ রোজা আল্লাহর মাস মুহাররমের রোজা।',
          'আর ফরজের পর শ্রেষ্ঠ নামাজ রাতের নামাজ (তাহাজ্জুদ)।',
          'মুহাররমও সম্মানিত চার মাসের একটি; এ মাসে শুরু হবে হিজরি নতুন বছর ১৪৪৯।',
        ],
        pointsEn: [
          'The best fast after Ramadan is Allah’s month of Muharram.',
          'And the best prayer after the obligatory prayers is the night prayer.',
          'Muharram is one of the four sacred months and marks the start of Hijri New Year 1449.',
        ],
        reference: 'সহিহ মুসলিম ১১৬৩; সহিহ বুখারি ৪৬৬২',
      },
      {
        titleBn: '২. আশুরার রোজা: ৯ ও ১০ মুহাররম',
        titleEn: '2. Fasting of Ashura (9th & 10th Muharram)',
        slideTagBn: 'স্লাইড ৫৫ · মুহাররম ২/২',
        slideTagEn: 'Muharram 2/2',
        pointsBn: [
          'মদিনায় এসে দেখলেন ইহুদিরা মূসা (আ.)-এর মুক্তির দিন হিসেবে আশুরার রোজা রাখে। তিনি বললেন, মূসার ব্যাপারে আমরা বেশি হকদার; তিনি রাখলেন, অন্যদেরও রাখতে বললেন।',
          'আশুরার রোজা আগের এক বছরের গুনাহের কাফফারা হবে বলে আশা করেছেন; আর বলেছিলেন, আগামী বছর বেঁচে থাকলে ৯ তারিখেও রাখব।',
          '৯ ও ১০ মুহাররম: ১৪ ও ১৫ জুন ২০২৭।',
        ],
        pointsEn: [
          'Arriving in Madinah, he saw Jews fasting Ashura in gratitude for Musa’s (AS) deliverance, saying: "We are closer to Musa than them," so he fasted and instructed others.',
          'Fasting Ashura expiates sins of the preceding year; he also resolved to fast the 9th alongside the 10th.',
          'Estimated dates (9th & 10th): 14 & 15 June 2027.',
        ],
        reference: 'সহিহ বুখারি ২০০৪; সহিহ মুসলিম ১১৬২, ১১৩৪',
      },
    ],
  },
  {
    id: 'safar',
    order: 9,
    hijriYearBn: '১৪৪৯ হিজরি',
    hijriYearEn: '1449 AH',
    nameBn: 'সফর',
    nameEn: 'Safar',
    nameAr: 'صَفَر',
    approxStartBn: '৫ জুলাই ২০২৭ থেকে',
    approxStartEn: 'From 5 Jul 2027',
    ayyamulBeedhBn: '১৭, ১৮ ও ১৯ জুলাই ২০২৭',
    ayyamulBeedhEn: '17, 18 & 19 Jul 2027',
    coreAmalBn: 'কুসংস্কার ও অশুভ ধারণা থেকে মুক্ত থাকা',
    coreAmalEn: 'Rejection of superstitions & daily Sunnah continuity',
    headlineBn: 'সফর অশুভ মাস নয় — কুসংস্কার বর্জনের সুন্নাহ শিক্ষা',
    headlineEn: 'Safar Is Not an Unlucky Month — Free From Superstition',
    isSacredMonth: false,
    hasSpecialFasting: false,
    accentColor: '#0284c7',
    topics: [
      {
        titleBn: 'সফর: অশুভ মাস নয়',
        titleEn: 'Safar: No Bad Omens or Unlucky Month',
        slideTagBn: 'স্লাইড ৫৬ · মাস ০৯/১২',
        slideTagEn: 'Month 09/12',
        pointsBn: [
          'তিনি বলেছেন, অশুভ লক্ষণ বলে কিছু নেই, আর সফর মাসের অশুভতাও কিছু নয়।',
          'আইয়ামে বীয: ১৭, ১৮ ও ১৯ জুলাই ২০২৭।',
        ],
        pointsEn: [
          'He explicitly rejected superstitions, stating there are no ill omens and nothing unlucky in Safar.',
          'Ayyamul Beedh: 17, 18 & 19 July 2027.',
        ],
        reference: 'সহিহ বুখারি ৫৭৫৭',
      },
    ],
    authenticityCautionBn: {
      title: 'সফর মাস নিয়ে যা সহিহ নয়',
      points: [
        'এই মাসের জন্য সহিহ হাদিসে নির্দিষ্ট কোনো বিশেষ আমল নেই; সফরের শেষ বুধবার (আখেরি চাহার শোম্বা) কেন্দ্রিক বিশেষ আমলেরও সহিহ ভিত্তি পাওয়া যায় না।',
      ],
      reference: 'সহিহ বুখারি ৫৭৫৭',
    },
    authenticityCautionEn: {
      title: 'Clarification on Safar Practices',
      points: [
        'No specific month-bound worship exists for Safar in authentic Hadith; rituals tied to the final Wednesday (Akhiri Chahar Shamba) have no authentic basis.',
      ],
      reference: 'Sahih Bukhari 5757',
    },
  },
  {
    id: 'rabiul_awwal',
    order: 10,
    hijriYearBn: '১৪৪৯ হিজরি',
    hijriYearEn: '1449 AH',
    nameBn: 'রবিউল আউয়াল',
    nameEn: "Rabi' al-Awwal",
    nameAr: 'رَبِيعُ الْأَوَّل',
    approxStartBn: '৩ আগস্ট ২০২৭ থেকে',
    approxStartEn: 'From 3 Aug 2027',
    coreAmalBn: 'প্রতি সোমবারের রোজা ও রাসূলুল্লাহ ﷺ-এর অনুসরণ',
    coreAmalEn: 'Monday Fasts & Complete Following of Sunnah',
    headlineBn: 'জন্ম ও বিদায়ের মাস এবং ভালোবাসার প্রকৃত সুন্নাহ প্রকাশ',
    headlineEn: 'Month of Birth & Passing · Expressing Love Through Sunnah',
    isSacredMonth: false,
    hasSpecialFasting: false,
    accentColor: '#059669',
    topics: [
      {
        titleBn: 'রবিউল আউয়াল: জন্ম ও বিদায়ের মাস',
        titleEn: "Rabi' al-Awwal: Birth, Passing & Practical Love",
        slideTagBn: 'স্লাইড ৫৭ · মাস ১০/১২',
        slideTagEn: 'Month 10/12',
        pointsBn: [
          'প্রসিদ্ধ বর্ণনামতে, এই মাসেই রাসূলুল্লাহ ﷺ-এর জন্ম ও ইন্তেকাল; জন্মের তারিখ নিয়ে মতভেদ আছে।',
          'জন্মের দিনের শুকরিয়ায় তাঁর নিজের সুন্নাত: প্রতি সোমবার রোজা রাখা।',
          'এই মাসের নির্দিষ্ট কোনো আলাদা আমল সহিহ হাদিসে নেই; আল্লাহ বলেন, আল্লাহকে ভালোবাসলে রাসূলের অনুসরণ করো।',
        ],
        pointsEn: [
          'By well-known accounts, both his birth and passing occurred in this month (exact birth date is debated among historians).',
          'His own Sunnah expression of gratitude for his birth: fasting every Monday.',
          'No separate month-only ritual is prescribed in authentic Hadith; Allah says: "If you love Allah, follow the Messenger."',
        ],
        reference: 'সহিহ মুসলিম ১১৬২; সূরা আলে ইমরান ৩:৩১',
      },
    ],
  },
  {
    id: 'rabius_sani',
    order: 11,
    hijriYearBn: '১৪৪৯ হিজরি',
    hijriYearEn: '1449 AH',
    nameBn: 'রবিউস সানি',
    nameEn: "Rabi' al-Thani",
    nameAr: 'رَبِيعُ الثَّانِي',
    approxStartBn: '২ সেপ্টেম্বর ২০২৭ থেকে',
    approxStartEn: 'From 2 Sep 2027',
    ayyamulBeedhBn: '১৪, ১৫ ও ১৬ সেপ্টেম্বর ২০২৭',
    ayyamulBeedhEn: '14, 15 & 16 Sep 2027',
    coreAmalBn: 'নিয়মিত দৈনিক ও সাপ্তাহিক আমল অব্যাহত রাখা',
    coreAmalEn: 'Steadfastness in regular daily & weekly Sunnah',
    headlineBn: 'নিয়মিত আমলের মাস — অল্প হলেও ধারাবাহিকতা বজায় রাখা',
    headlineEn: 'Month of Steady Consistency — Small Deeds Done Regularly',
    isSacredMonth: false,
    hasSpecialFasting: false,
    accentColor: '#0d9488',
    topics: [
      {
        titleBn: 'রবিউস সানি: নিয়মিত আমলের মাস',
        titleEn: "Rabi' al-Thani: Consistency in Worship",
        slideTagBn: 'স্লাইড ৫৮ · মাস ১১/১২',
        slideTagEn: 'Month 11/12',
        pointsBn: [
          'এই মাসের জন্য সহিহ হাদিসে বিশেষ কোনো আমল নেই।',
          'আইয়ামে বীয: ১৪, ১৫ ও ১৬ সেপ্টেম্বর; সাথে সোম ও বৃহস্পতিবারের রোজা।',
          'মনে রাখুন: আল্লাহর কাছে প্রিয় আমল নিয়মিত আমল, অল্প হলেও।',
        ],
        pointsEn: [
          'No special month-exclusive ritual is recorded in authentic Hadith.',
          'Ayyamul Beedh: 14, 15 & 16 September, plus regular Monday & Thursday fasts.',
          'Remember: The dearest deeds to Allah are those done consistently, even if small.',
        ],
        reference: 'সহিহ বুখারি ৬৪৬৪',
      },
    ],
  },
  {
    id: 'jumadal_ula',
    order: 12,
    hijriYearBn: '১৪৪৯ হিজরি',
    hijriYearEn: '1449 AH',
    nameBn: 'জুমাদাল উলা',
    nameEn: 'Jumada al-Ula',
    nameAr: 'جُمَادَى الْأُولَى',
    approxStartBn: '১ অক্টোবর ২০২৭ থেকে',
    approxStartEn: 'From 1 Oct 2027',
    ayyamulBeedhBn: '১৩, ১৪ ও ১৫ অক্টোবর ২০২৭',
    ayyamulBeedhEn: '13, 14 & 15 Oct 2027',
    coreAmalBn: 'নিয়মিত আমল ও পরবর্তী বছর / রমাদানের প্রস্তুতির সেতু',
    coreAmalEn: 'Completing the annual cycle & preparing ahead',
    headlineBn: 'বছর পূর্ণ: দৈনিক-সাপ্তাহিক রুটিন ও নতুন চক্রের সূচনা',
    headlineEn: 'Year Completed: Carrying Daily & Weekly Sunnah Forward',
    isSacredMonth: false,
    hasSpecialFasting: false,
    accentColor: '#10b981',
    topics: [
      {
        titleBn: 'জুমাদাল উলা: বছর পূর্ণ',
        titleEn: 'Jumada al-Ula: Completing the 12-Month Cycle',
        slideTagBn: 'স্লাইড ৫৯ · মাস ১২/১২',
        slideTagEn: 'Month 12/12',
        pointsBn: [
          'এই মাসেরও বিশেষ আমল সহিহ হাদিসে নেই; চলবে দৈনিক ও সাপ্তাহিক রুটিন।',
          'আইয়ামে বীয: ১৩, ১৪ ও ১৫ অক্টোবর ২০২৭।',
          'এরপর আবার জুমাদাল উখরা, আর সেখান থেকে পরের রমাদানের প্রস্তুতি শুরু।',
        ],
        pointsEn: [
          'No separate month-only ritual is established in authentic Hadith; sustain the daily and weekly Sunnah routine.',
          'Ayyamul Beedh: 13, 14 & 15 October 2027.',
          'Next begins Jumada al-Akhirah once again — continuing the cycle of preparation toward Ramadan.',
        ],
        reference: 'সহিহ বুখারি ৬৪৬৪',
      },
    ],
  },
];
