// Comprehensive, authenticated, and theological details for all prayers
// Includes Quranic Ayat (Arabic + Meaning + Reference), Sahih Hadith, Virtues, Waqt rules, Rak'at breakdowns, and Duas

export interface PrayerAyatItem {
  arabic: string;
  transliteration?: string;
  translationBn: string;
  translationEn: string;
  surahNameBn: string;
  surahNameEn: string;
  surahNumber: number;
  ayatNumber: string;
}

export interface PrayerHadithItem {
  arabicText?: string;
  narratorBn: string;
  narratorEn: string;
  textBn: string;
  textEn: string;
  bookBn: string;
  bookEn: string;
  hadithNumber: string;
  gradeBn: string;
  gradeEn: string;
}

export interface PrayerRakatItem {
  type: string; // Fard, Sunnah Mu'akkadah, Sunnah Ghair Mu'akkadah, Witr, Nafl
  typeBn: string;
  rakats: number;
  rulingBn: string;
  descriptionBn: string;
}

export interface PrayerDetailedInfo {
  id: string; // Fajr, Dhuhr, Asr, Maghrib, Isha, Tahajjud, Ishraq, Chast, Awwabin, ProhibitedSunrise, ProhibitedNoon, ProhibitedSunset
  nameBn: string;
  nameEn: string;
  nameAr: string;
  sceneTheme: 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'tahajjud' | 'ishraq' | 'chast' | 'awwabin' | 'makruh';
  subTitleBn: string;
  subTitleEn: string;
  celestialSignBn: string;
  celestialSignEn: string;
  totalRakatsCount: number;
  summaryRakatsBn: string;
  
  // Quranic Ayat with references
  ayats: PrayerAyatItem[];

  // Sahih Hadiths with references & grading
  hadiths: PrayerHadithItem[];

  // Spiritual virtues & rewards (ফজিলত ও মর্যাদা)
  virtues: {
    titleBn: string;
    descriptionBn: string;
    pointsBn: string[];
  };

  // Precise astronomical & fiqh timing conditions (ওয়াক্তের শর্ত ও সময়সীমা)
  timingConditions: {
    startConditionBn: string;
    endConditionBn: string;
    mustahabTimeBn: string;
    makruhTimeBn: string;
    fiqhDetailsBn: string;
  };

  // Detailed breakdown of each rak'at
  rakatsBreakdown: PrayerRakatItem[];

  // Sunnah Duas & Zikr after this prayer (সালাম ফেরানোর পর পঠিত দোয়া)
  postPrayerDuas: {
    arabic: string;
    transliteration: string;
    meaningBn: string;
    reference: string;
  }[];
}

export const ALL_PRAYER_DETAILS: Record<string, PrayerDetailedInfo> = {
  Fajr: {
    id: 'Fajr',
    nameBn: 'ফজর',
    nameEn: 'Fajr',
    nameAr: 'الفَجْر',
    sceneTheme: 'fajr',
    subTitleBn: 'প্রভাতের আলোকচ্ছটা ও দিনের প্রথম ফরজ সালাত',
    subTitleEn: 'The Sacred Dawn Prayer • Angels Bear Witness',
    celestialSignBn: 'সুবহে সাদিক (সত্যিকারের প্রভাত) হতে সূর্যোদয় পর্যন্ত',
    celestialSignEn: 'True Dawn (Subh Sadiq) until the upper limb of the sun appears',
    totalRakatsCount: 4,
    summaryRakatsBn: '২ রাকাত সুন্নাত মুয়াক্কাদাহ + ২ রাকাত ফরজ',
    ayats: [
      {
        arabic: 'أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا',
        translationBn: 'সূর্য হেলে পড়ার পর থেকে রাতের ঘন অন্ধকার পর্যন্ত সালাত কায়েম করুন এবং ফজরের কুরআন তিলাওয়াত (সালাত কায়েম করুন)। নিশ্চয়ই ফজরের কুরআন পাঠে ফেরেশতাগণ উপস্থিত থাকেন।',
        translationEn: 'Establish prayer from the decline of the sun until the darkness of the night and the Quran recitation of dawn. Indeed, the recitation of dawn is ever witnessed.',
        surahNameBn: 'সূরা বনি ইসরাঈল',
        surahNameEn: 'Surah Al-Isra',
        surahNumber: 17,
        ayatNumber: '৭৮',
      },
      {
        arabic: 'وَالْفَجْرِ ۝ وَلَيَالٍ عَشْرٍ',
        translationBn: 'শপথ উষার, এবং দশ রাতের।',
        translationEn: 'By the dawn, and by the ten nights.',
        surahNameBn: 'সূরা আল-ফজর',
        surahNameEn: 'Surah Al-Fajr',
        surahNumber: 89,
        ayatNumber: '১-২',
      },
    ],
    hadiths: [
      {
        arabicText: 'رَكْعَتَا الْفَجْرِ خَيْرٌ مِنَ الدُّنْيَا وَمَا فِيهَا',
        narratorBn: 'উম্মুল মুমিনীন আয়েশা (রা.)',
        narratorEn: 'Aisha (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ ইরশাদ করেছেন: "ফজরের দুই রাকাত (সুন্নত) নামাজ গোটা পৃথিবী এবং তার মধ্যকার সবকিছুর চেয়েও উত্তম ও মূল্যবান।"',
        textEn: 'The two rak’ahs before Fajr are better than the entire world and all that is within it.',
        bookBn: 'সহীহ মুসলিম',
        bookEn: 'Sahih Muslim',
        hadithNumber: '৭২৫',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        narratorBn: 'আবু হুরায়রা (রা.)',
        narratorEn: 'Abu Hurairah (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ বলেছেন: "যদি মানুষ জানত এশা ও ফজরের নামাজের মধ্যে কী পরিমাণ নেকি ও পুরস্কার রয়েছে, তবে তারা হামাগুড়ি দিয়ে হলেও এ দুই নামাজে জামাতে উপস্থিত হতো।"',
        textEn: 'If people knew what reward there is in the Isha and Fajr prayers, they would come to them even if they had to crawl.',
        bookBn: 'সহীহ বুখারী ও সহীহ মুসলিম',
        bookEn: 'Sahih al-Bukhari & Muslim',
        hadithNumber: 'বুখারী: ৬১৫, মুসলিম: ৪৩৭',
        gradeBn: 'মুত্তাফাকুন আলাইহ (সর্বসম্মত সহীহ)',
        gradeEn: 'Muttafaqun Alayh',
      },
      {
        narratorBn: 'জুনদুব ইবনে আবদুল্লাহ (রা.)',
        narratorEn: 'Jundub ibn Abdullah (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ বলেছেন: "যে ব্যক্তি ফজরের সালাত আদায় করল, সে সারাদিনের জন্য মহান আল্লাহর প্রত্যক্ষ জিম্মাদারী ও নিরাপত্তায় প্রবেশ করল।"',
        textEn: 'Whoever prays the morning prayer is in the protection of Allah.',
        bookBn: 'সহীহ মুসলিম',
        bookEn: 'Sahih Muslim',
        hadithNumber: '৬৫৭',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
    virtues: {
      titleBn: 'ফজর সালাতের অনন্য ফযিলত ও আত্মিক গুরুত্ব',
      descriptionBn: 'ফজর হলো দিনের সর্বশ্রেষ্ঠ সূচনাবিন্দু যা একজন মুমিনের অন্তরে তাকওয়া, নুর এবং আল্লাহর নিরাপত্তা নিশ্চিত করে।',
      pointsBn: [
        'রাত ও দিনের সম্মানিত ফেরেশতাদের বিশেষ মহাসমাবেশ ও আল্লাহর দরবারে বান্দার সাক্ষ্যদান।',
        'মুনাফেকীর সুস্পষ্ট লক্ষণ থেকে পবিত্রতা ও ঈমানের পরম নিশ্চয়তা লাভ।',
        'সারাদিনের সকল অনিষ্ট, বিপদ-আপদ ও শয়তানের কুমন্ত্রণা থেকে আল্লাহর সরাসরি অভিভাবকত্ব।',
        'কিয়ামতের ভয়াবহ অন্ধকারে পূর্ণাঙ্গ নূর ও আলোকবর্তিকা লাভের শুভসংবাদ।',
        'নিয়মিত জামাতে ফজর আদায়কারী জাহান্নামে প্রবেশ করবে না (সহীহ মুসলিম: ৬৩৪)।',
      ],
    },
    timingConditions: {
      startConditionBn: 'সুবহে সাদিক (সত্যিকারের প্রভাত) উদয় হলে—যখন পূর্ব দিগন্তে আনুভূমিক সাদা শুভ্র রেখা দেখা দেয় (সূর্য দিগন্তের ১৮ ডিগ্রি নিচে অবস্থান করে)।',
      endConditionBn: 'পূর্ব দিগন্তে সূর্যের উপরিভাগের লাল গোলক দৃশ্যমান হওয়ার পূর্ব মুহূর্ত পর্যন্ত।',
      mustahabTimeBn: 'হানাফী মাযহাব মতে কিছুটা আলো ফর্সা হওয়ার পর (ইসফার) ফজর আদায় করা মুস্তাহাব। তবে সূর্যোদয়ের পূর্বেই যেন ধীরস্থিরে সুন্নাত অনুযায়ী চল্লিশ-পঞ্চাশ আয়াত তিলাওয়াত সহকারে শেষ করা যায়।',
      makruhTimeBn: 'সূর্য উদিত হওয়ার সময় (Sunrise) থেকে শুরু করে প্রায় ১৫-২০ মিনিট পর্যন্ত সকল প্রকার নামাজ সম্পূর্ণ নিষিদ্ধ ও মাকরূহে তাহরীমী।',
      fiqhDetailsBn: 'ফজরের দুই রাকাত সুন্নাত অন্যান্য যেকোনো সুন্নাতের চেয়ে অধিক তাগিদপূর্ণ। কোনো কারণে ফরজ জামাত শুরু হয়ে গেলেও যদি জানা থাকে অন্তত দ্বিতীয় রাকাত পাওয়া যাবে, তবে দ্রুত সুন্নাত পড়ে জামাতে শামিল হওয়া উত্তম।',
    },
    rakatsBreakdown: [
      {
        type: 'Sunnah Muakkadah',
        typeBn: 'সুন্নাতে মুয়াক্কাদাহ',
        rakats: 2,
        rulingBn: 'ফরজের পূর্বে আদায়যোগ্য অতীব গুরুত্ববহ সুন্নাত',
        descriptionBn: 'রাসূলুল্লাহ ﷺ কখনো এ দুই রাকাত ত্যাগ করেননি। সূরা কাফিরূন ও সূরা ইখলাস দিয়ে পড়া মুস্তাহাব।',
      },
      {
        type: 'Fard',
        typeBn: 'ফরজ সালাত',
        rakats: 2,
        rulingBn: 'আবশ্যিক ফরজ (জাহরী বা উচ্চস্বরে তিলাওয়াত)',
        descriptionBn: 'জামাতে বা একাকী ইমামের ন্যায় দীর্ঘ কেরাত দিয়ে ধীরস্থিরে আদায় করা রাসূলুল্লাহ ﷺ-এর সুন্নাহ।',
      },
    ],
    postPrayerDuas: [
      {
        arabic: 'أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ. اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
        transliteration: 'Astaghfirullah, Astaghfirullah, Astaghfirullah. Allahumma antas-salamu wa minkas-salam, tabarakta ya dhal-jalali wal-ikram.',
        meaningBn: 'আমি আল্লাহর নিকট ক্ষমা প্রার্থনা করছি (৩ বার)। হে আল্লাহ! আপনিই শান্তি, আপনার নিকট থেকেই শান্তি আসে। আপনি বরকতময়, হে মহিমাময় ও মহানুভব!',
        reference: 'সহীহ মুসলিম: ৫৯১',
      },
      {
        arabic: 'اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ',
        transliteration: 'Allahumma ajirni minan-nar (৭ বার)',
        meaningBn: 'হে আল্লাহ! আমাকে জাহান্নামের আগুন থেকে রক্ষা করুন। (ফজর ও মাগরিবের পর ৭ বার পঠিত)',
        reference: 'সুনান আবু দাউদ: ৫০৭৯',
      },
      {
        arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
        transliteration: 'Allahumma inni as\'aluka \'ilman nafi\'an, wa rizqan tayyiban, wa \'amalan mutaqabbalan.',
        meaningBn: 'হে আল্লাহ! আমি আপনার নিকট উপকারী জ্ঞান, পবিত্র হালাল রিযিক এবং কবুলযোগ্য নেক আমল প্রার্থনা করছি।',
        reference: 'সুনান ইবনে মাজাহ: ৯২৫',
      },
    ],
  },

  Dhuhr: {
    id: 'Dhuhr',
    nameBn: 'যোহর',
    nameEn: 'Dhuhr',
    nameAr: 'الظُّهْر',
    sceneTheme: 'dhuhr',
    subTitleBn: 'দ্বিপ্রহরের সূর্য ঢলে পড়ার পর মধ্যাহ্নের প্রশান্তি',
    subTitleEn: 'The Midday Zenith Prayer • Gates of Heaven Open',
    celestialSignBn: 'সূর্য মাথার ঠিক ওপর থেকে পশ্চিমে সামান্য হেলে পড়ার পর শুরু',
    celestialSignEn: 'Begins after the sun passes its celestial zenith (Meridian transit)',
    totalRakatsCount: 12,
    summaryRakatsBn: '৪ সুন্নাত + ৪ ফরজ + ২ সুন্নাত + ২ নফল',
    ayats: [
      {
        arabic: 'أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ',
        translationBn: 'সূর্য ঢলে পড়ার পর থেকে রাতের অন্ধকার নেমে আসা পর্যন্ত সালাত কায়েম করুন।',
        translationEn: 'Establish prayer from the decline of the sun until the darkness of the night.',
        surahNameBn: 'সূরা বনি ইসরাঈল',
        surahNameEn: 'Surah Al-Isra',
        surahNumber: 17,
        ayatNumber: '৭৮',
      },
      {
        arabic: 'حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ',
        translationBn: 'সকল সালাতের প্রতি যত্নবান হও, বিশেষ করে মধ্যবর্তী সালাত এবং আল্লাহর সম্মুখে একান্ত বিনম্রভাবে দাঁড়াও।',
        translationEn: 'Maintain with care the [obligatory] prayers and [in particular] the middle prayer and stand before Allah, devoutly obedient.',
        surahNameBn: 'সূরা আল-বাকারা',
        surahNameEn: 'Surah Al-Baqarah',
        surahNumber: 2,
        ayatNumber: '২৩৮',
      },
    ],
    hadiths: [
      {
        arabicText: 'إِنَّهَا سَاعَةٌ تُفْتَحُ فِيهَا أَبْوَابُ السَّمَاءِ فَأُحِبُّ أَنْ يَصْعَدَ لِي فِيهَا عَمَلٌ صَالِحٌ',
        narratorBn: 'আবদুল্লাহ ইবনে সায়েব (রা.)',
        narratorEn: 'Abdullah ibn Sa\'ib (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ সূর্য ঢলে পড়ার পর যোহরের পূর্বে চার রাকাত নামাজ পড়তেন এবং বলতেন: "এটি এমন এক বরকতময় মুহূর্ত যখন আসমানের রহমতের দরজাসমূহ উন্মুক্ত করে দেওয়া হয়, তাই আমি ভালোবাসি যে এ সময় আমার কোনো নেক আমল আল্লাহর দরবারে আসমানে উঠুক।"',
        textEn: 'This is an hour when the gates of the heavens are opened, and I love for a righteous deed of mine to ascend during it.',
        bookBn: 'জামে আত-তিরমিযী',
        bookEn: 'Jami` at-Tirmidhi',
        hadithNumber: '৪৭৮',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        narratorBn: 'উম্মে হাবীবা (রা.)',
        narratorEn: 'Umm Habibah (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ বলেছেন: "যে ব্যক্তি যোহরের ফরজের পূর্বে চার রাকাত এবং পরে চার রাকাত (সুন্নাত ও নফল) নিষ্ঠার সাথে নিয়মিত আদায় করবে, মহান আল্লাহ তার ওপর জাহান্নামের আগুনকে চিরতরে হারাম করে দেবেন।"',
        textEn: 'Whoever maintains four rak’ahs before Dhuhr and four after it, Allah will make the Fire forbidden for him.',
        bookBn: 'জামে আত-তিরমিযী ও সুনান আবু দাউদ',
        bookEn: 'Jami` at-Tirmidhi & Sunan Abi Dawud',
        hadithNumber: 'তিরমিযী: ৪২৮, আবু দাউদ: ১২৬৯',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        narratorBn: 'আবু যার আল-গিফারী (রা.)',
        narratorEn: 'Abu Dharr (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ বলেছেন: "গ্রীষ্মকালে তীব্র গরম পড়লে যোহরের সালাত কিছুটা বিলম্বে ঠাণ্ডা করে আদায় করো, কারণ তীব্র উত্তাপ জাহান্নামের প্রলয়ঙ্করী শ্বাসের অংশ।"',
        textEn: 'Pray Dhuhr when it becomes cooler during intense heat, for severe heat is from the raging of the Hellfire.',
        bookBn: 'সহীহ বুখারী',
        bookEn: 'Sahih al-Bukhari',
        hadithNumber: '৫৩৬',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
    virtues: {
      titleBn: 'যোহর সালাতের আত্মিক মর্যাদা ও বরকত',
      descriptionBn: 'দুনিয়ার পার্থিব ব্যস্ততা ও কর্মচাঞ্চল্যের মাঝে যোহর মুমিনকে পরম প্রভুর স্মরণে ফিরিয়ে আনে।',
      pointsBn: [
        'আসমানের রহমতের দরজা উন্মুক্ত হওয়ার মাহেন্দ্রক্ষণ।',
        'যোহরের পূর্বের চার রাকাত সুন্নাত তাহাজ্জুদের সমতুল্য মর্যাদাপূর্ণ (মুসান্নাফে ইবনে আবি শাইবা)।',
        'ফরজের আগের চার ও পরের চার রাকাত জাহান্নামের আগুন থেকে চূড়ান্ত সুরক্ষা দান করে।',
        'সারাদিনের মানসিক চাপ, কর্মব্যস্ততার ক্লান্তি দূর করে আত্মিক সজীবতা দান করে।',
      ],
    },
    timingConditions: {
      startConditionBn: 'যাওয়ালে শামস অর্থাৎ সূর্য ঠিক মধ্যাকাশ (Zenith) অতিক্রম করে পশ্চিম দিগন্তের দিকে ঢলতে শুরু করলে।',
      endConditionBn: 'কোনো বস্তুর আসল ছায়া বাদে তার ছায়া তার দ্বিগুণ (হানাফী মাযহাব মতে) অথবা সমপরিমাণ (জমহুর ও শাফেঈ মাযহাব মতে) লম্বা হওয়া পর্যন্ত।',
      mustahabTimeBn: 'শীতকালে প্রথম ওয়াক্তে এবং গ্রীষ্মকালে প্রচণ্ড গরমের দিনে কিছুটা সময় অপেক্ষা করে রোদ স্তিমিত হলে (ইবরাদ) নামাজ পড়া মুস্তাহাব।',
      makruhTimeBn: 'ঠিক দুপুর বেলা যখন সূর্য মধ্যাকাশে অবস্থান করে (যাওয়ালের পূর্বমুহূর্তে ১০-১৫ মিনিট) নামাজ পড়া সম্পূর্ণ নিষিদ্ধ।',
      fiqhDetailsBn: 'যোহরের ফরজের পূর্বের ৪ রাকাত সুন্নাতে মুয়াক্কাদাহ এক সালামে আদায় করা সুন্নত। শুক্রবার যোহরের স্থলে জামাতে জুমুআর নামাজ ফরজ।',
    },
    rakatsBreakdown: [
      {
        type: 'Sunnah Muakkadah',
        typeBn: 'সুন্নাতে মুয়াক্কাদাহ',
        rakats: 4,
        rulingBn: 'ফরজের পূর্বে ১ সালামে চার রাকাত',
        descriptionBn: 'রাসূলুল্লাহ ﷺ এ চার রাকাত নিয়মিত পড়তেন, আসমানের দুয়ার উন্মুক্তের সময়।',
      },
      {
        type: 'Fard',
        typeBn: 'ফরজ সালাত',
        rakats: 4,
        rulingBn: 'আবশ্যকীয় ফরজ (সিররী বা অনুচ্চস্বরে তিলাওয়াত)',
        descriptionBn: 'প্রথম দুই রাকাতে সূরা ফাতিহার সাথে অন্য সূরা ও শেষ দুই রাকাতে কেবল সূরা ফাতিহা।',
      },
      {
        type: 'Sunnah Muakkadah',
        typeBn: 'সুন্নাতে মুয়াক্কাদাহ',
        rakats: 2,
        rulingBn: 'ফরজের পর আদায়যোগ্য সুন্নাত',
        descriptionBn: 'রাসূলুল্লাহ ﷺ কখনো এটি পরিত্যাগ করতেন না।',
      },
      {
        type: 'Nafl',
        typeBn: 'নফল সালাত',
        rakats: 2,
        rulingBn: 'ঐচ্ছিক অতিরিক্ত নফল',
        descriptionBn: 'জাহান্নাম থেকে মুক্তির প্রতিশ্রুত ফজিলত অর্জনের উদ্দেশ্যে পঠিত।',
      },
    ],
    postPrayerDuas: [
      {
        arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ',
        transliteration: 'La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadir. Allahumma la mani\'a lima a\'tayta, wa la mu\'tiya lima mana\'ta, wa la yanfa\'u dhal-jaddi minkal-jadd.',
        meaningBn: 'আল্লাহ ছাড়া কোনো সত্য ইলাহ নেই, তিনি এক, তাঁর কোনো শরিক নেই। রাজত্ব একমাত্র তাঁরই, সকল প্রশংসা তাঁরই এবং তিনি সবকিছুর ওপর ক্ষমতাবান। হে আল্লাহ! আপনি যা দান করেন তা রোধ করার কেউ নেই, আর আপনি যা রোধ করেন তা দেওয়ার কেউ নেই; আর কোনো ধনবানের ধন-সম্পদ আপনার পাকড়াও থেকে তাকে রক্ষা করতে পারে না।',
        reference: 'সহীহ বুখারী: ৮৪৪',
      },
      {
        arabic: 'سُبْحَانَ اللَّهِ (৩৩ বার), الْحَمْدُ لِلَّهِ (৩৩ বার), اللَّهُ أَكْبَرُ (৩৪ বার)',
        transliteration: 'SubhanAllah (33x), Alhamdulillah (33x), Allahu Akbar (34x)',
        meaningBn: 'আল্লাহর পবিত্রতা ঘোষণা করছি (৩৩ বার), সকল প্রশংসা আল্লাহর (৩৩ বার), আল্লাহ সর্বশ্রেষ্ঠ (৩৪ বার/৩৩ বার পূর্ণ করে কালেমা)। সমুদ্রের ফেনা পরিমাণ গুনাহ হলেও ক্ষমা করা হয়।',
        reference: 'সহীহ মুসলিম: ৫৯৭',
      },
    ],
  },

  Asr: {
    id: 'Asr',
    nameBn: 'আসর',
    nameEn: 'Asr',
    nameAr: 'العَصْر',
    sceneTheme: 'asr',
    subTitleBn: 'বিকেলের আলো ও সর্বশ্রেষ্ঠ মধ্যবর্তী সালাতুল উসতা',
    subTitleEn: 'The Golden Hour Prayer • The Middle Prayer',
    celestialSignBn: 'বস্তুর ছায়া আসল ছায়া বাদে এক/দুই গুণ হওয়া হতে সূর্যাস্ত পর্যন্ত',
    celestialSignEn: 'Shadow reaches twice object length (Hanafi) until sunset',
    totalRakatsCount: 8,
    summaryRakatsBn: '৪ সুন্নাত গায়রে মুয়াক্কাদাহ + ৪ রাকাত ফরজ',
    ayats: [
      {
        arabic: 'حَافِظُوا عَلَى الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّهِ قَانِتِينَ',
        translationBn: 'তোমরা সকল নামাজের প্রতি যত্নবান হও, বিশেষ করে মধ্যবর্তী নামাজের (সালাতুল উসতা / আসর) এবং আল্লাহর সামনে বিনীতভাবে দাঁড়াও।',
        translationEn: 'Maintain with care the [obligatory] prayers and [in particular] the middle prayer and stand before Allah, devoutly obedient.',
        surahNameBn: 'সূরা আল-বাকারা',
        surahNameEn: 'Surah Al-Baqarah',
        surahNumber: 2,
        ayatNumber: '২৩৮',
      },
      {
        arabic: 'وَسَبِّحْ بِحَمْدِ رَبِّكَ قَبْلَ طُلُوعِ الشَّمْسِ وَقَبْلَ الْغُرُوبِ',
        translationBn: 'এবং আপনার পালনকর্তার প্রশংসা সহকারে পবিত্রতা ঘোষণা করুন সূর্যোদয়ের পূর্বে এবং সূর্যাস্তের পূর্বে (ফজর ও আসর)।',
        translationEn: 'And exalt [Allah] with praise of your Lord before the rising of the sun and before its setting.',
        surahNameBn: 'সূরা ক্বাফ',
        surahNameEn: 'Surah Qaf',
        surahNumber: 50,
        ayatNumber: '৩৯',
      },
    ],
    hadiths: [
      {
        arabicText: 'مَنْ تَرَكَ صَلَاةَ الْعَصْرِ حَبِطَ عَمَلُهُ',
        narratorBn: 'বুরাইদা (রা.)',
        narratorEn: 'Buraidah (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ বলেছেন: "যে ব্যক্তি আসরের সালাত বিনষ্ট বা বর্জন করল, তার জীবনের যাবতীয় সৎ আমল বরবাদ হয়ে গেল।"',
        textEn: 'Whoever misses the Asr prayer, his deeds are wiped out and invalidated.',
        bookBn: 'সহীহ বুখারী',
        bookEn: 'Sahih al-Bukhari',
        hadithNumber: '৫৫৩',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        narratorBn: 'ইবনে উমর (রা.)',
        narratorEn: 'Ibn Umar (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ বলেছেন: "যার আসরের সালাত ছুটে গেল, তার যেন পরিবার-পরিজন ও সহায়-সম্পদ সবকিছু লুণ্ঠিত ও ধ্বংস হয়ে গেল।"',
        textEn: 'The person who misses the Asr prayer is as if he had lost his family and property.',
        bookBn: 'সহীহ বুখারী ও সহীহ মুসলিম',
        bookEn: 'Sahih al-Bukhari & Muslim',
        hadithNumber: 'বুখারী: ৫৫২, মুসলিম: ৬২৬',
        gradeBn: 'মুত্তাফাকুন আলাইহ',
        gradeEn: 'Muttafaqun Alayh',
      },
      {
        narratorBn: 'জারির ইবনে আবদুল্লাহ (রা.)',
        narratorEn: 'Jarir ibn Abdullah (RA)',
        textBn: 'আমরা রাসূলুল্লাহ ﷺ-এর সাথে পূর্ণিমার চাঁদের দিকে তাকিয়ে ছিলাম, তিনি বললেন: "তোমরা অচিরেই তোমাদের রবকে চাক্ষুষ দেখতে পাবে যেমন এই চাঁদকে দেখতে পাচ্ছো। অতএব তোমরা যদি সূর্যোদয়ের পূর্বের (ফজর) এবং সূর্যাস্তের পূর্বের (আসর) সালাতের হেফাজত করতে পারো, তবে অবশ্যই তা করো।"',
        textEn: 'You will see your Lord as clearly as you see this full moon. So strive not to be prevented from prayers before sunrise and before sunset.',
        bookBn: 'সহীহ বুখারী',
        bookEn: 'Sahih al-Bukhari',
        hadithNumber: '৫৫৪',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        narratorBn: 'ইবনে উমর (রা.)',
        narratorEn: 'Ibn Umar (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ বলেছেন: "আল্লাহ তাআলা সেই বান্দার ওপর বিশেষ রহমত বর্ষণ করুন, যে আসরের ফরজের পূর্বে চার রাকাত (সুন্নাত) সালাত আদায় করে।"',
        textEn: 'May Allah show mercy to a person who prays four rak’ahs before Asr.',
        bookBn: 'জামে আত-তিরমিযী ও সুনান আবু দাউদ',
        bookEn: 'Jami` at-Tirmidhi & Sunan Abi Dawud',
        hadithNumber: 'তিরমিযী: ৪৩০, আবু দাউদ: ১২৭১',
        gradeBn: 'হাসান',
        gradeEn: 'Hasan',
      },
    ],
    virtues: {
      titleBn: 'আসরের সালাতের বিশেষ গাম্ভীর্য ও সতর্কতা',
      descriptionBn: 'কুরআন ও হাদিসে আসরের নামাজকে সর্বাধিক গুরুত্ব প্রদান করা হয়েছে। এটি অবহেলাকারীদের জন্য মারাত্মক সতর্কতা উচ্চারণ করা হয়েছে।',
      pointsBn: [
        'দিন ও রাতের ফেরেশতাগণের রদবদলকালে আল্লাহর দরবারে বান্দার আমলনামা পেশ।',
        'আখিরাতে মহান রাব্বুল আলামীনের পবিত্র নুর সরাসরি অবলোকনের অপূর্ব প্রাপ্তি।',
        'আমলসমূহ বরবাদ হওয়া থেকে রক্ষা এবং জান্নাত নিশ্চিতকরণ।',
        'আসরের পূর্বে ৪ রাকাত নফল বা সুন্নাত পড়লে বিশ্বনবীর বিশেষ দোয়ার অংশীদার হওয়া যায়।',
      ],
    },
    timingConditions: {
      startConditionBn: 'যোহরের ওয়াক্ত শেষ হওয়ার সাথে সাথে—হানাফী মাযহাব মতে ছায়া আসলি বাদে কোনো বস্তুর ছায়া দ্বিগুণ হলে, অন্য মাযহাবে একগুণ হলে।',
      endConditionBn: 'সূর্য সম্পূর্ণ অস্তমিত হওয়ার পূর্ব মুহূর্ত পর্যন্ত। তবে সূর্য হলুদ বা ফ্যাকাশে হয়ে যাওয়ার পূর্বেই পড়া ওয়াজিব।',
      mustahabTimeBn: 'সূর্যের তেজ ও রঙ অপরিবর্তিত থাকা অবস্থায় প্রথম ওয়াক্তে আসর আদায় করা মুস্তাহাব।',
      makruhTimeBn: 'সূর্য যখন হলুদ বর্ণ ধারণ করে এবং চোখ দিয়ে সরাসরি তাকানো যায় (সূর্যাস্তের পূর্বের প্রায় ১৫-২০ মিনিট), তখন নামাজ পড়া মাকরূহে তাহরীমী। তবে ঐ দিনের আসর না পড়ে থাকলে তা তখনো পড়ে নিতে হবে।',
      fiqhDetailsBn: 'আসরের ফরজ সালাত আদায়ের পর মাগরিব পর্যন্ত কোনো প্রকার নফল সালাত পড়া সম্পূর্ণ নিষিদ্ধ।',
    },
    rakatsBreakdown: [
      {
        type: 'Sunnah Ghair Muakkadah',
        typeBn: 'সুন্নাতে গায়রে মুয়াক্কাদাহ',
        rakats: 4,
        rulingBn: 'ফরজের পূর্বে নফল/সুন্নাত (ঐচ্ছিক)',
        descriptionBn: 'রাসূলুল্লাহ ﷺ এর জন্য আল্লাহর রহমতের দোয়া করেছেন। পড়লে অপরিসীম সওয়াব।',
      },
      {
        type: 'Fard',
        typeBn: 'ফরজ সালাত',
        rakats: 4,
        rulingBn: 'আবশ্যকীয় ফরজ (সিররী বা অনুচ্চস্বরে তিলাওয়াত)',
        descriptionBn: 'সালাতুল উসতা। চরম গুরুত্বের সাথে একাগ্রচিত্তে আদায় করা ফরজ।',
      },
    ],
    postPrayerDuas: [
      {
        arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
        transliteration: 'Sayyidul Istighfar: Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana \'abduka...',
        meaningBn: 'সাইয়্যিদুল ইস্তিগফার (ক্ষমা প্রার্থনার শ্রেষ্ঠ দোয়া): হে আল্লাহ! আপনি আমার প্রতিপালক, আপনি ছাড়া কোনো সত্য উপাস্য নেই। আপনি আমাকে সৃষ্টি করেছেন এবং আমি আপনার বান্দা...',
        reference: 'সহীহ বুখারী: ৬৩০৬',
      },
      {
        arabic: 'آيَةُ الْكُرْسِيِّ (اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ...)',
        transliteration: 'Ayatul Kursi (Allahu la ilaha illa huwal hayyul qayyum...)',
        meaningBn: 'যে ব্যক্তি প্রত্যেক ফরজ সালাতের পর আয়াতুল কুরসী পাঠ করবে, তার জান্নাতে প্রবেশের পথে মৃত্যু ছাড়া আর কোনো বাধা থাকবে না।',
        reference: 'সুনান আন-নাসাঈ: ৯৯২৮ (সহীহ)',
      },
    ],
  },

  Maghrib: {
    id: 'Maghrib',
    nameBn: 'মাগরিব',
    nameEn: 'Maghrib',
    nameAr: 'المَغْرِب',
    sceneTheme: 'maghrib',
    subTitleBn: 'সূর্যাস্তের রক্তিম দিগন্ত ও সান্ধ্যকালীন ফরজ সালাত',
    subTitleEn: 'The Sunset Twilight Prayer • Breaking the Fast',
    celestialSignBn: 'সূর্যের থালা সম্পূর্ণ দিগন্তের নিচে অদৃশ্য হওয়া হতে শাফাক পর্যন্ত',
    celestialSignEn: 'Immediately when the sun disc sinks completely below horizon',
    totalRakatsCount: 7,
    summaryRakatsBn: '৩ ফরজ + ২ সুন্নাত মুয়াক্কাদাহ + ২ নফল (আউওয়াবীন)',
    ayats: [
      {
        arabic: 'وَأَقِمِ الصَّلَاةَ طَرَفَيِ النَّهَارِ وَزُلَفًا مِّنَ اللَّيْلِ ۚ إِنَّ الْحَسَنَاتِ يُذْهِبْنَ السَّيِّئَاتِ',
        translationBn: 'আর দিনের দুই প্রান্তে এবং রাতের প্রথমাংশে সালাত কায়েম করুন। নিশ্চয় সৎকর্মসমূহ পাপরাশি দূর করে দেয়।',
        translationEn: 'And establish prayer at the two ends of the day and at the approach of the night. Indeed, good deeds do away with misdeeds.',
        surahNameBn: 'সূরা হূদ',
        surahNameEn: 'Surah Hud',
        surahNumber: 11,
        ayatNumber: '১১৪',
      },
      {
        arabic: 'فَسُبْحَانَ اللَّهِ حِينَ تُمْسُونَ وَحِينَ تُصْبِحُونَ',
        translationBn: 'অতএব তোমরা আল্লাহর পবিত্রতা ঘোষণা করো যখন তোমরা সন্ধ্যায় উপনীত হও এবং যখন তোমরা প্রভাতে জাগ্রত হও।',
        translationEn: 'So exalted is Allah when you reach the evening and when you reach the morning.',
        surahNameBn: 'সূরা আর-রূম',
        surahNameEn: 'Surah Ar-Rum',
        surahNumber: 30,
        ayatNumber: '১৭',
      },
    ],
    hadiths: [
      {
        arabicText: 'لَا تَزَالُ أُمَّتِي بِخَيْرٍ مَا لَمْ يُؤَخِّرُوا الْمَغْرِبَ حَتَّى تَشْتَبِكَ النُّجُومُ',
        narratorBn: 'মারসাদ ইবনে আবদুল্লাহ (রা.)',
        narratorEn: 'Marsad ibn Abdullah (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ বলেছেন: "আমার উম্মত ততদিন কল্যাণের ওপর প্রতিষ্ঠিত থাকবে, যতদিন না তারা আকাশে তারকারাজি ফুটে ওঠা পর্যন্ত মাগরিবের নামাজে অযথা বিলম্ব করবে।"',
        textEn: 'My Ummah will remain upon good as long as they do not delay Maghrib until the stars intertwine.',
        bookBn: 'সুনান আবু দাউদ ও মুসনাদে আহমাদ',
        bookEn: 'Sunan Abi Dawud & Musnad Ahmad',
        hadithNumber: 'আবু দাউদ: ৪১৮',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        narratorBn: 'আবু হুরায়রা (রা.)',
        narratorEn: 'Abu Hurairah (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ বলেছেন: "যে ব্যক্তি মাগরিবের পর কারও সাথে পার্থিব অনর্থক কথা না বলে ছয় রাকাত নফল সালাত (আউওয়াবীন) আদায় করবে, তার জন্য বারো বছরের নিরবচ্ছিন্ন ইবাদতের সওয়াব লিপিবদ্ধ করা হবে।"',
        textEn: 'Whoever prays six rak’ahs after Maghrib without speaking ill words, it will be equated for him with twelve years of worship.',
        bookBn: 'জামে আত-তিরমিযী',
        bookEn: 'Jami` at-Tirmidhi',
        hadithNumber: '৪৩৫',
        gradeBn: 'হাদিস হাসান লিগাইরিহী',
        gradeEn: 'Hasan',
      },
      {
        narratorBn: 'আবদুল্লাহ ইবনে মুগাফফাল (রা.)',
        narratorEn: 'Abdullah ibn Mughaffal (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ তিনবার বললেন: "তোমরা মাগরিবের (ফরজের) পূর্বে দুই রাকাত পড়ো—যে চায় তার জন্য।"',
        textEn: 'Pray before Maghrib, pray before Maghrib, then he said on the third time: for whoever wills.',
        bookBn: 'সহীহ বুখারী',
        bookEn: 'Sahih al-Bukhari',
        hadithNumber: '১১৮৩',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
    virtues: {
      titleBn: 'মাগরিব সালাতের মাধুর্য ও সান্ধ্যকালীন শুকরিয়া',
      descriptionBn: 'দিনের সফল পরিসমাপ্তি ঘটিয়ে মহান প্রভুর শোকরগোযারি ও রাতের বরকতময় আগমনের সেতুবন্ধন হলো মাগরিব।',
      pointsBn: [
        'রোজাদারের রোজা ভাঙার পবিত্র মুহূর্ত ও আল্লাহর দরবারে দোয়া কবুলিয়্যাত।',
        'দিনের পাপ মোচনকারী অন্যতম প্রধান কাফফারা সালাত।',
        'মাগরিবের পর আউওয়াবীন নামাজ পড়ার দ্বারা দীর্ঘ বছরের ইবাদতের মহামূল্যবান সওয়াব।',
        'মাগরিবের পর সান্ধ্যকালীন মাসনূন জিকির পাঠে রাতভর শয়তানি ক্ষতি থেকে নিরাপত্তা।',
      ],
    },
    timingConditions: {
      startConditionBn: 'পশ্চিম দিগন্তে সূর্যের গোলক পুরোপুরি অদৃশ্য হওয়ার সাথে সাথে মাগরিবের ওয়াক্ত আরম্ভ হয়। ২ মিনিটের সতর্কতা রাখা উত্তম।',
      endConditionBn: 'পশ্চিম আকাশের লাল আভা (শাফাকুল আহমার) সম্পূর্ণরূপে বিলীন হয়ে আকাশ কালো হয়ে যাওয়ার পূর্ব মুহূর্ত পর্যন্ত।',
      mustahabTimeBn: 'সূর্যাস্তের সাথে সাথে ওয়াক্তের শুরুতেই কালক্ষেপণ না করে দ্রুত মাগরিবের জামাত আদায় করা মুস্তাহাব ও সুন্নাহ।',
      makruhTimeBn: 'আকাশে ঘন তারকারাজি ফুটে ওঠা পর্যন্ত মাগরিব বিলম্বিত করা মাকরূহে তাহরীমী।',
      fiqhDetailsBn: 'মাগরিবের তিন রাকাত ফরজ। প্রথম দুই রাকাতে সূরা ফাতিহার সাথে সূরা মিলিয়ে উচ্চস্বরে (জাহরী) কেরাত পড়া হয় এবং তৃতীয় রাকাতে কেবল সূরা ফাতিহা চুপে চুপে পড়া হয়।',
    },
    rakatsBreakdown: [
      {
        type: 'Fard',
        typeBn: 'ফরজ সালাত',
        rakats: 3,
        rulingBn: 'আবশ্যকীয় ফরজ (প্রথম ২ রাকাত জাহরী/উচ্চস্বরে)',
        descriptionBn: 'সূর্যাস্তের পর প্রথম আমল। জামাতে বা একাকী দ্রুত আদায়যোগ্য।',
      },
      {
        type: 'Sunnah Muakkadah',
        typeBn: 'সুন্নাতে মুয়াক্কাদাহ',
        rakats: 2,
        rulingBn: 'ফরজের পর অত্যন্ত তাগিদপূর্ণ সুন্নাত',
        descriptionBn: 'রাসূলুল্লাহ ﷺ ঘরে ফিরে এ দুই রাকাত সুন্নাত নিষ্ঠার সাথে পড়তেন।',
      },
      {
        type: 'Nafl (Awwabin)',
        typeBn: 'নফল (আউওয়াবীন)',
        rakats: 2,
        rulingBn: 'ঐচ্ছিক বরকতময় নফল (২ থেকে ৬ রাকাত)',
        descriptionBn: 'মাগরিবের পর আল্লাহর অভিমুখী বান্দাদের অত্যন্ত মর্যাদাপূর্ণ সালাত।',
      },
    ],
    postPrayerDuas: [
      {
        arabic: 'اللَّهُمَّ هَذَا إِقْبَالُ لَيْلِكَ، وَإِدْبَارُ نَهَارِكَ، وَأَصْوَاتُ دُعَاتِكَ، فَاغْفِرْ لِي',
        transliteration: 'Allahumma hadha iqbalu laylika, wa idbaru naharika, wa aswatu du\'atika, faghfir li.',
        meaningBn: 'হে আল্লাহ! এ আপনার রাতের আগমন, আপনার দিনের বিদায় এবং আপনার আহবানকারীদের আযানের ধ্বনি; অতএব আপনি আমাকে ক্ষমা করে দিন।',
        reference: 'সুনান আবু দাউদ: ৫৩০',
      },
      {
        arabic: 'اللَّهُمَّ أَجِرْنِي مِنَ النَّارِ (৭ বার)',
        transliteration: 'Allahumma ajirni minan-nar (7 times)',
        meaningBn: 'হে আল্লাহ! আমাকে জাহান্নামের আগুন থেকে রক্ষা করুন। যে ব্যক্তি মাগরিবের পর এটি ৭ বার বলবে এবং ঐ রাতে মারা যায়, সে জাহান্নাম থেকে মুক্তি পাবে।',
        reference: 'সুনান আবু দাউদ: ৫০৭৯ (সহীহ)',
      },
    ],
  },

  Isha: {
    id: 'Isha',
    nameBn: 'ইশা',
    nameEn: 'Isha',
    nameAr: 'العِشَاء',
    sceneTheme: 'isha',
    subTitleBn: 'তারকারাজির নিশুতি রাত ও দিনের সমাপ্তি পর্ব',
    subTitleEn: 'The Nightfall Prayer • Half the Night in Worship',
    celestialSignBn: 'পশ্চিম দিগন্তের লালিমা অদৃশ্য হওয়া হতে সুবহে সাদিকের পূর্ব পর্যন্ত',
    celestialSignEn: 'White twilight fades completely until dawn begins',
    totalRakatsCount: 17,
    summaryRakatsBn: '৪ সুন্নাত + ৪ ফরজ + ২ সুন্নাত + ২ নফল + ৩ বিতর + ২ নফল',
    ayats: [
      {
        arabic: 'وَمِنَ اللَّيْلِ فَاسْجُدْ لَهُ وَسَبِّحْهُ لَيْلًا طَوِيلًا',
        translationBn: 'এবং রাতের কিয়দংশে তাঁর উদ্দেশ্যে সিজদা করুন এবং রাতের দীর্ঘ প্রহর জুড়ে তাঁর পবিত্রতা বর্ণনা করুন।',
        translationEn: 'And during the night prostrate to Him and exalt Him a long [part of the] night.',
        surahNameBn: 'সূরা আল-ইনসান',
        surahNameEn: 'Surah Al-Insan',
        surahNumber: 76,
        ayatNumber: '২৬',
      },
      {
        arabic: 'وَاذْكُرِ اسْمَ رَبِّكَ بُكْرَةً وَأَصِيلًا',
        translationBn: 'আর আপনার রবের নাম স্মরণ করুন সকাল ও সন্ধ্যায়।',
        translationEn: 'And mention the name of your Lord [in prayer] morning and evening.',
        surahNameBn: 'সূরা আল-ইনসান',
        surahNameEn: 'Surah Al-Insan',
        surahNumber: 76,
        ayatNumber: '২৫',
      },
    ],
    hadiths: [
      {
        arabicText: 'مَنْ صَلَّى الْعِشَاءَ فِي جَمَاعَةٍ فَكَأَنَّمَا قَامَ نِصْفَ اللَّيْلِ',
        narratorBn: 'উসমান ইবনে আফফান (রা.)',
        narratorEn: 'Uthman ibn Affan (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ বলেছেন: "যে ব্যক্তি ইশার সালাত জামাতের সাথে আদায় করল, সে যেন অর্ধরাত জেগে নফল সালাত আদায় করল; আর যে ফজরের সালাতও জামাতে পড়ল, সে যেন সমগ্র রাত জেগে নামাজ পড়ল।"',
        textEn: 'Whoever prays Isha in congregation, it is as if he spent half the night in prayer.',
        bookBn: 'সহীহ মুসলিম',
        bookEn: 'Sahih Muslim',
        hadithNumber: '৬৫৬',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        narratorBn: 'আবু হুরায়রা (রা.)',
        narratorEn: 'Abu Hurairah (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ বলেছেন: "মুনাফিকদের জন্য ফজর ও ইশার নামাজের চেয়ে অধিক ভারী ও কষ্টসাধ্য আর কোনো নামাজ নেই। তারা যদি এর মধ্যকার অসীম সওয়াব ও প্রতিদান সম্পর্কে জানত, তবে হামাগুড়ি দিয়ে হলেও এতে উপস্থিত হতো।"',
        textEn: 'No prayer is more burdensome to the hypocrites than the Fajr and Isha prayers. But if they knew what they contained, they would come even if crawling.',
        bookBn: 'সহীহ বুখারী',
        bookEn: 'Sahih al-Bukhari',
        hadithNumber: '৬৫৭',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        narratorBn: 'আবু বারযাহ আল-আসলামী (রা.)',
        narratorEn: 'Abu Barzah (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ ইশার সালাতের পূর্বে ঘুমানো এবং ইশার সালাতের পরে অনর্থক গল্পগুজব ও কথাবার্তা বলা অপছন্দ করতেন।',
        textEn: 'The Messenger of Allah ﷺ disliked sleeping before the Isha prayer and talking after it.',
        bookBn: 'সহীহ বুখারী ও সহীহ মুসলিম',
        bookEn: 'Sahih al-Bukhari & Muslim',
        hadithNumber: 'বুখারী: ৫৬৮, মুসলিম: ৬৪৭',
        gradeBn: 'মুত্তাফাকুন আলাইহ',
        gradeEn: 'Muttafaqun Alayh',
      },
      {
        narratorBn: 'আলী ইবনে আবি তালিব (রা.)',
        narratorEn: 'Ali (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ বলেছেন: "হে কুরআনের অনুসারীগণ! তোমরা বিতরের নামাজ আদায় করো, কেননা আল্লাহ বেজোড় এবং তিনি বেজোড়কে ভালোবাসেন।"',
        textEn: 'Perform Witr, O people of the Quran, for Allah is One and loves what is odd.',
        bookBn: 'জামে আত-তিরমিযী ও সুনান আবু দাউদ',
        bookEn: 'Jami` at-Tirmidhi & Sunan Abi Dawud',
        hadithNumber: 'তিরমিযী: ৪৫৩, আবু দাউদ: ১৪১৬',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
    virtues: {
      titleBn: 'ইশার সালাতের অতুলনীয় ফযিলত ও রাতের নিরাপত্তা',
      descriptionBn: 'দিনের সমাপ্তি পর্বের এ ফরজ ইবাদত মানুষকে সারারাত আল্লাহর হেফাজতে রাখে এবং মুনাফিকির তকমা মুছে দেয়।',
      pointsBn: [
        'জামাতে ইশা পড়া অর্ধরাত ইবাদতের সমতুল্য সওয়াব বয়ে আনে।',
        'মুনাফেকদের তালিকা থেকে নিজের ঈমানের অকাট্য মুক্তি ও পবিত্রতা।',
        'বিতর ওয়াজিব সালাতের মাধ্যমে রাতের চূড়ান্ত পুণ্যতা অর্জন।',
        'ইশার পর দ্রুত ঘুমানোর সুন্নাহ পালন স্বাস্থ্য ও তাহাজ্জুদের জন্য অপরিসীম সহায়ক।',
      ],
    },
    timingConditions: {
      startConditionBn: 'পশ্চিম দিগন্তের লাল ও সাদা আভা সম্পূর্ণ বিলীন হয়ে আকাশ গাঢ় কালো হলে ইশার ওয়াক্ত শুরু হয়।',
      endConditionBn: 'সুবহে সাদিক অর্থাৎ ফজরের ওয়াক্ত শুরুর পূর্ব মুহূর্ত পর্যন্ত।',
      mustahabTimeBn: 'রাতের প্রথম তৃতীয়াংশ পর্যন্ত বিলম্ব করে ইশার জামাত পড়া মুস্তাহাব। তবে মধ্যরাতের পরে বিলম্ব করা অনুচিত।',
      makruhTimeBn: 'অর্ধরাত্রির (Midnight) পর কোনো ওজর ছাড়া ইশার সালাত বিলম্বিত করা মাকরূহে তানযীহী।',
      fiqhDetailsBn: 'ইশার ফরজের পর ২ রাকাত সুন্নাতে মুয়াক্কাদাহ এবং তারপর ৩ রাকাত বিতর ওয়াজিব সালাত আদায় করতে হয়। বিতরে তৃতীয় রাকাতে সূরা ফাতিহা ও অন্য সূরা শেষে তাকবীর বলে দুআয়ে কুনূত পড়া ওয়াজিব।',
    },
    rakatsBreakdown: [
      {
        type: 'Sunnah Ghair Muakkadah',
        typeBn: 'সুন্নাতে গায়রে মুয়াক্কাদাহ',
        rakats: 4,
        rulingBn: 'ফরজের পূর্বে নফল/সুন্নাত (ঐচ্ছিক)',
        descriptionBn: 'ইশার পূর্বে চার রাকাত সুন্নাত পড়া উত্তম ও বরকতময়।',
      },
      {
        type: 'Fard',
        typeBn: 'ফরজ সালাত',
        rakats: 4,
        rulingBn: 'আবশ্যকীয় ফরজ (প্রথম ২ রাকাত জাহরী/উচ্চস্বরে)',
        descriptionBn: 'দিনের সর্বশেষ চার রাকাত ফরজ সালাত। জামাতে আদায় অতীব তাগিদপূর্ণ।',
      },
      {
        type: 'Sunnah Muakkadah',
        typeBn: 'সুন্নাতে মুয়াক্কাদাহ',
        rakats: 2,
        rulingBn: 'ফরজের পর অতীব গুরুত্বপূর্ণ সুন্নাত',
        descriptionBn: 'রাসূলুল্লাহ ﷺ কখনো এটি ছাড়তেন না।',
      },
      {
        type: 'Nafl',
        typeBn: 'নফল সালাত',
        rakats: 2,
        rulingBn: 'ঐচ্ছিক অতিরিক্ত নফল',
        descriptionBn: 'বিতরের পূর্বে বা পরে দুই রাকাত নফল সালাত।',
      },
      {
        type: 'Witr Wajib',
        typeBn: 'বিতর ওয়াজিব',
        rakats: 3,
        rulingBn: 'আবশ্যিক ওয়াজিব সালাত (দোয়ায়ে কুনূতসহ)',
        descriptionBn: '৩ রাকাত এক সালামে পড়া হানাফী নিয়ম। দোআয়ে কুনুত পড়া আবশ্যক।',
      },
      {
        type: 'Nafl',
        typeBn: 'নফল সালাত',
        rakats: 2,
        rulingBn: 'বিতরের পর নফল (ঐচ্ছিক)',
        descriptionBn: 'রাসূলুল্লাহ ﷺ বিতরের পরেও দুই রাকাত বসে পড়তেন।',
      },
    ],
    postPrayerDuas: [
      {
        arabic: 'سُبْحَانَ الْمَلِكِ الْقُدُّوسِ (৩ বার)',
        transliteration: 'Subhanal-Malikil-Quddus (৩য় বার টেনে উচ্চস্বরে: রব্বিল মালা-ইকাতি ওয়ার-রূহ)',
        meaningBn: 'পবিত্র সত্তা, বাদশাহ, অতি পবিত্র আল্লাহর মহিমা ঘোষণা করছি। (বিতর নামাজের পর রাসূলুল্লাহ ﷺ তিনবার এটি বলতেন)',
        reference: 'সুনান আন-নাসাঈ: ১৭৩২ (সহীহ)',
      },
      {
        arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِرِضَاكَ مِنْ سَخَطِكَ، وَبِمُعَافَاتِكَ مِنْ عُقُوبَتِكَ، وَأَعُوذُ بِكَ مِنْكَ، لَا أُحْصِي ثَنَاءً عَلَيْكَ أَنْتَ كَمَا أَثْنَيْتَ عَلَى نَفْسِكَ',
        transliteration: 'Allahumma inni a\'udhu biridaka min sakhatika, wa bimu\'afatika min \'uqubatika, wa a\'udhu bika minka...',
        meaningBn: 'হে আল্লাহ! আমি আপনার সন্তুষ্টির মাধ্যমে আপনার অসন্তুষ্টি হতে আশ্রয় চাই, আপনার ক্ষমার মাধ্যমে আপনার শাস্তি হতে আশ্রয় চাই, এবং আপনার নিকট হতেই আপনার আশ্রয় চাই...',
        reference: 'জামে আত-তিরমিযী: ৩৫৬৬ (সহীহ)',
      },
    ],
  },

  Tahajjud: {
    id: 'Tahajjud',
    nameBn: 'তাহাজ্জুদ (কিয়ামুল লাইল)',
    nameEn: 'Tahajjud',
    nameAr: 'التَّهَجُّد',
    sceneTheme: 'tahajjud',
    subTitleBn: 'রাতের শেষ প্রহরের শ্রেষ্ঠতম নফল ও আল্লাহর নৈকট্য',
    subTitleEn: 'The Night Vigil • Station of Praise',
    celestialSignBn: 'ইশার পর ঘুমিয়ে মধ্যরাত বা শেষ তৃতীয়াংশে জাগ্রত হওয়া',
    celestialSignEn: 'Last third of the night before the break of dawn',
    totalRakatsCount: 8,
    summaryRakatsBn: 'সাধারণত ২ থেকে ৮ বা ১২ রাকাত নফল',
    ayats: [
      {
        arabic: 'وَمِنَ اللَّيْلِ فَتَهَجَّدْ بِهِ نَافِلَةً لَّكَ عَسَىٰ أَن يَبْعَثَكَ رَبُّكَ مَقَامًا مَّحْمُودًا',
        translationBn: 'আর রাতের কিছু অংশে তাহাজ্জুদ পড়ুন, যা আপনার জন্য এক অতিরিক্ত ইবাদত; শীঘ্রই আপনার রব আপনাকে মাকামে মাহমুদে (সর্বোচ্চ প্রশংসিত স্থানে) প্রতিষ্ঠিত করবেন।',
        translationEn: 'And from [part of] the night, pray with it as additional [worship] for you; it is expected that your Lord will resurrect you to a praised station.',
        surahNameBn: 'সূরা বনি ইসরাঈল',
        surahNameEn: 'Surah Al-Isra',
        surahNumber: 17,
        ayatNumber: '৭৯',
      },
      {
        arabic: 'تَتَجَافَىٰ جُنُوبُهُمْ عَنِ الْمَضَاجِعِ يَدْعُونَ رَبَّهُمْ خَوْفًا وَطَمَعًا وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ',
        translationBn: 'তাদের পার্শ্বসমূহ বিছানা থেকে পৃথক থাকে; তারা তাদের রবকে ভয় ও আশার সাথে ডাকে এবং আমি তাদের যে রিযিক দিয়েছি তা থেকে ব্যয় করে।',
        translationEn: 'Their sides forsake their beds, to call upon their Lord in fear and hope, and they spend out of what We have bestowed upon them.',
        surahNameBn: 'সূরা আস-সাজদাহ',
        surahNameEn: 'Surah As-Sajdah',
        surahNumber: 32,
        ayatNumber: '১৬',
      },
    ],
    hadiths: [
      {
        arabicText: 'أَفْضَلُ الصَّلَاةِ بَعْدَ الْفَرِيضَةِ صَلَاةُ اللَّيْلِ',
        narratorBn: 'আবু হুরায়রা (রা.)',
        narratorEn: 'Abu Hurairah (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ বলেছেন: "ফরজ নামাজের পর সর্বশ্রেষ্ঠ নামাজ হলো রাতের তাহাজ্জুদের নামাজ।"',
        textEn: 'The best prayer after the obligatory prayer is the night prayer.',
        bookBn: 'সহীহ মুসলিম',
        bookEn: 'Sahih Muslim',
        hadithNumber: '১১৬৩',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
      {
        narratorBn: 'আবু হুরায়রা (রা.)',
        narratorEn: 'Abu Hurairah (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ বলেছেন: "আমাদের বরকতময় মহান রব প্রতি রাতের শেষ তৃতীয়াংশে প্রথম আসমানে অবতরণ করেন এবং আহ্বান জানিয়ে বলেন: কে আছো যে আমাকে ডাকবে, আমি তার ডাকে সাড়া দেব? কে আছো যে আমার কাছে কিছু চাইবে, আমি তাকে তা দান করব? কে আছো যে আমার নিকট ক্ষমা চাইবে, আমি তাকে ক্ষমা করে দেব?"',
        textEn: 'Our Lord descends to the lowest heaven during the last third of the night, asking: Who is calling upon Me so that I may answer him?',
        bookBn: 'সহীহ বুখারী ও সহীহ মুসলিম',
        bookEn: 'Sahih al-Bukhari & Muslim',
        hadithNumber: 'বুখারী: ১১৪৫, মুসলিম: ৭৫৮',
        gradeBn: 'মুত্তাফাকুন আলাইহ',
        gradeEn: 'Muttafaqun Alayh',
      },
    ],
    virtues: {
      titleBn: 'তাহাজ্জুদের অলৌকিক ফযিলত ও মর্যাদা',
      descriptionBn: 'সকল ওলী-বুজুর্গ ও সালেহীনের প্রধান অবলম্বন এবং মহান আল্লাহর সরাসরি সান্নিধ্য লাভের সর্বোচ্চ মাধ্যম।',
      pointsBn: [
        'দোয়া শতভাগ কবুল হওয়ার সর্বাধিক নিশ্চিত মুহূর্ত।',
        'মুমিনের চেহারায় অলৌকিক নূর ও অন্তরে প্রগাঢ় আধ্যাত্মিক শক্তি সঞ্চার।',
        'গুনাহের দাগ মোচন এবং পাপের প্রবৃত্তি দমন করার মহৌষধ।',
        'কিয়ামতের দিন বিনাহিসাবে জান্নাতে প্রবেশের মহাসৌভাগ্য।',
      ],
    },
    timingConditions: {
      startConditionBn: 'ইশার সালাতের পর সামান্য সময়ের জন্য হলেও ঘুমিয়ে পড়ার পর জাগ্রত হওয়া থেকে শুরু হয়।',
      endConditionBn: 'সুবহে সাদিক অর্থাৎ ফজরের আযানের পূর্ব মুহূর্ত পর্যন্ত।',
      mustahabTimeBn: 'রাতের শেষ তৃতীয়াংশে (Last third of the night)—যখন আল্লাহ তাআলা প্রথম আসমানে তাশরীফ আনেন।',
      makruhTimeBn: 'ফজরের ওয়াক্ত শুরু হয়ে যাওয়ার পর আর তাহাজ্জুদ পড়া যায় না।',
      fiqhDetailsBn: 'দুই রাকাত করে করে মোট ৮ রাকাত বা সামর্থ্য অনুযায়ী ২ থেকে ১২ রাকাত পর্যন্ত পড়া যায়। কেরাত দীর্ঘ করা সুন্নাত।',
    },
    rakatsBreakdown: [
      {
        type: 'Nafl',
        typeBn: 'নফল সালাত',
        rakats: 8,
        rulingBn: 'দুই রাকাত করে সালাম ফিরিয়ে পঠিত',
        descriptionBn: 'রাসূলুল্লাহ ﷺ সাধারণত ৮ রাকাত তাহাজ্জুদ পড়তেন এবং এরপর বিতর পড়তেন।',
      },
    ],
    postPrayerDuas: [
      {
        arabic: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ نُورُ السَّمَاوَاتِ وَالْأَرْضِ وَمَنْ فِيهِنَّ، وَلَكَ الْحَمْدُ أَنْتَ قَيِّمُ السَّمَاوَاتِ وَالْأَرْضِ...',
        transliteration: 'Allahumma lakal-hamdu Anta noorus-samawati wal-ardi wa man feehinna...',
        meaningBn: 'হে আল্লাহ! সমস্ত প্রশংসা আপনারই, আপনি আসমান-যমীন ও তন্মধ্যস্থিত সবকিছুর নূর; সমস্ত প্রশংসা আপনারই, আপনি আকাশমণ্ডলী ও পৃথিবীর নিয়ন্ত্রক...',
        reference: 'সহীহ বুখারী: ১১২০',
      },
    ],
  },

  Ishraq: {
    id: 'Ishraq',
    nameBn: 'ইশরাক',
    nameEn: 'Ishraq',
    nameAr: 'الإِشْرَاق',
    sceneTheme: 'ishraq',
    subTitleBn: 'সূর্যোদয়ের পরের বরকতময় সালাত • পূর্ণ হজ ও উমরার সওয়াব',
    subTitleEn: 'Post-Sunrise Prayer • Complete Hajj & Umrah Reward',
    celestialSignBn: 'সূর্য উদিত হয়ে এক বর্শা পরিমাণ (১৫-২০ মিনিট পর) উপরে উঠলে',
    celestialSignEn: '15-20 minutes after sunrise when the sun ascends a spear height',
    totalRakatsCount: 2,
    summaryRakatsBn: '২ থেকে ৪ রাকাত নফল সালাত',
    ayats: [
      {
        arabic: 'إِنَّا سَخَّرْنَا الْجِبَالَ مَعَهُ يُسَبِّحْنَ بِالْعَشِيِّ وَالْإِشْرَاقِ',
        translationBn: 'আমি পর্বতমালাকে তার অনুগত করেছিলাম, তারা সকাল-সন্ধ্যায় (সন্ধ্যা ও ইশরাকের সময়) তার সাথে আল্লাহর পবিত্রতা ঘোষণা করত।',
        translationEn: 'Indeed, We subjected the mountains to praise with him, in the evening and after sunrise.',
        surahNameBn: 'সূরা সাদ',
        surahNameEn: 'Surah Sad',
        surahNumber: 38,
        ayatNumber: '১৮',
      },
    ],
    hadiths: [
      {
        arabicText: 'مَنْ صَلَّى الْغَدَاةَ فِي جَمَاعَةٍ ثُمَّ قَعَدَ يَذْكُرُ اللَّهَ حَتَّى تَطْلُعَ الشَّمْسُ ثُمَّ صَلَّى رَكْعَتَيْنِ كَانَتْ لَهُ كَأَجْرِ حَجَّةٍ وَعُمْرَةٍ تَامَّةٍ تَامَّةٍ تَامَّةٍ',
        narratorBn: 'আনাস ইবনে মালিক (রা.)',
        narratorEn: 'Anas ibn Malik (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ ইরশাদ করেছেন: "যে ব্যক্তি ফজরের নামাজ জামাতে আদায় করে, তারপর সূর্যোদয় পর্যন্ত বসে আল্লাহর জিকিরে মশগুল থাকে এবং এরপর (সূর্য ওঠার ১৫-২০ মিনিট পর) দুই রাকাত নামাজ পড়ে, সে একটি পূর্ণাঙ্গ, পূর্ণাঙ্গ, পূর্ণাঙ্গ হজ ও উমরার সওয়াব লাভ করে।"',
        textEn: 'Whoever prays Fajr in congregation then sits remembering Allah until the sun rises, then prays two rak’ahs, has the reward of a complete, complete, complete Hajj and Umrah.',
        bookBn: 'জামে আত-তিরমিযী',
        bookEn: 'Jami` at-Tirmidhi',
        hadithNumber: '৫৮৬',
        gradeBn: 'হাসান',
        gradeEn: 'Hasan',
      },
    ],
    virtues: {
      titleBn: 'ইশরাক সালাতের সুসংবাদ',
      descriptionBn: 'ফজরের পর জিকিরে সময় কাটিয়ে ইশরাক আদায় করলে ঘরে বসেই পূর্ণ হজ্জ ও উমরার সওয়াব মেলে।',
      pointsBn: [
        'একটি পরিপূর্ণ কবুল হজ ও উমরাহর সওয়াব অর্জন।',
        'দিনের শুরুতে আত্মিক নূর ও বরকতের মহাসুযোগ।',
        'ফজরের জামাতের পর জিকিরে অবস্থান করার বিশেষ মর্যাদা।',
      ],
    },
    timingConditions: {
      startConditionBn: 'সূর্য উদিত হওয়ার প্রায় ১৫-২০ মিনিট পর যখন সূর্যের লালচে ভাব কেটে শুভ্র সোনালী আলো ছড়িয়ে পড়ে।',
      endConditionBn: 'চাশতের ওয়াক্ত শুরু হওয়ার পূর্ব পর্যন্ত (সাধারণত সকাল ৮:৩০-৯:০০ টা পর্যন্ত)।',
      mustahabTimeBn: 'সূর্যোদয়ের নিষিদ্ধ ১৫-২০ মিনিট অতিবাহিত হওয়ার সাথে সাথেই পড়া উত্তম।',
      makruhTimeBn: 'সূর্য উদিত হওয়ার ঠিক মুহূর্তে নামাজ পড়া সম্পূর্ণ হারাম/মাকরূহে তাহরীমী।',
      fiqhDetailsBn: 'সাধারণত দুই রাকাত বা চার রাকাত নফল হিসেবে পড়া হয়।',
    },
    rakatsBreakdown: [
      {
        type: 'Nafl',
        typeBn: 'নফল সালাত',
        rakats: 2,
        rulingBn: '২ রাকাত বা ৪ রাকাত নফল',
        descriptionBn: 'সূর্যোদয়ের নিষিদ্ধ ওয়াক্ত পার হওয়ার পর পঠিত।',
      },
    ],
    postPrayerDuas: [
      {
        arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ',
        transliteration: 'Asbahna wa asbahal-mulku lillah, wal-hamdu lillah, la ilaha illallahu wahdahu la sharika lahu...',
        meaningBn: 'আমরা প্রভাতে উপনীত হয়েছি এবং সমস্ত রাজত্ব আল্লাহর জন্য প্রভাতে উপনীত হয়েছে...',
        reference: 'সহীহ মুসলিম: ২৭২৩',
      },
    ],
  },

  Chast: {
    id: 'Chast',
    nameBn: 'চাশত (সালাতুদ দুহা)',
    nameEn: 'Chast / Duha',
    nameAr: 'صَلَاةُ الضُّحَى',
    sceneTheme: 'chast',
    subTitleBn: 'পূর্বাহ্ণের উজ্জ্বল রোদ ও ৩৬০টি অস্থিসন্ধির সদকা',
    subTitleEn: 'The Forenoon Prayer • Charity for 360 Joints',
    celestialSignBn: 'বেলা বৃদ্ধি পেয়ে যখন সূর্যের উত্তাপ ছড়ায় (সকাল ৯টা হতে দুপুর)',
    celestialSignEn: 'Mid-morning when the sun is high and warms the ground',
    totalRakatsCount: 4,
    summaryRakatsBn: '২, ৪, ৮ বা ১২ রাকাত নফল সালাত',
    ayats: [
      {
        arabic: 'وَالضُّحَىٰ ۝ وَاللَّيْلِ إِذَا سَجَىٰ',
        translationBn: 'শপথ পূর্বাহ্ণের (রোদ্দুর উজ্জ্বল সকালের), এবং শপথ রজনীর যখন তা নিঝুম হয়ে যায়।',
        translationEn: 'By the morning brightness, and by the night when it covers with darkness.',
        surahNameBn: 'সূরা আদ-দুহা',
        surahNameEn: 'Surah Ad-Duha',
        surahNumber: 93,
        ayatNumber: '১-২',
      },
    ],
    hadiths: [
      {
        arabicText: 'يُصْبِحُ عَلَى كُلِّ سُلَامَى مِنْ أَحَدِكُمْ صَدَقَةٌ... وَيُجْزِئُ مِنْ ذَلِكَ رَكْعَتَانِ يَرْكَعُهُمَا مِنَ الضُّحَى',
        narratorBn: 'আবু যার (রা.)',
        narratorEn: 'Abu Dharr (RA)',
        textBn: 'রাসূলুল্লাহ ﷺ বলেছেন: "তোমাদের প্রত্যেকের দেহের প্রতিটি অস্থিসন্ধির (৩৬০টি জোড়ের) পক্ষ থেকে প্রতিদিন সকালে একটি করে সদকা আদায় করা আবশ্যক... আর পূর্বাহ্ণে দুই রাকাত সালাতুদ দুহা (চাশত) আদায় করলে সেই সকল সদকার সমপরিমাণ দায়িত্ব পূরণ হয়ে যায়।"',
        textEn: 'In the morning charity is due from every joint of yours... and two rak’ahs prayed at Duha suffices for all of that.',
        bookBn: 'সহীহ মুসলিম',
        bookEn: 'Sahih Muslim',
        hadithNumber: '৭২০',
        gradeBn: 'সহীহ',
        gradeEn: 'Sahih',
      },
    ],
    virtues: {
      titleBn: 'সালাতুদ দুহার অনন্য প্রাপ্তি',
      descriptionBn: 'সুস্থ শরীরের কৃতজ্ঞতা প্রকাশ এবং আল্লাহ তাআলার বিশেষ বরকত লাভের শ্রেষ্ঠ মাধ্যম।',
      pointsBn: [
        'মানবদেহের ৩৬০টি গ্রন্থির সদকা পুরোপুরি আদায় হয়ে যায়।',
        'আল্লাহ তাআলা ঐ বান্দার সারাদিনের যাবতীয় প্রয়োজন ও দায়িত্ব গ্রহণ করেন (আবু দাউদ: ১২৮৯)।',
        'আউওয়াবীন তথা আল্লাহর অভিমুখী খাঁটি বান্দাদের অন্তর্ভুক্ত হওয়া।',
      ],
    },
    timingConditions: {
      startConditionBn: 'সকাল ৯টা থেকে যখন রোদ ভালোমতো ছড়িয়ে পড়ে।',
      endConditionBn: 'ঠিক দ্বিপ্রহরের নিষিদ্ধ সময়ের (যাওয়ালের ১০ মিনিট পূর্ব) পূর্ব পর্যন্ত।',
      mustahabTimeBn: 'উট বা পশুর ছানারা যখন বালুর গরমে পা তোলে অর্থাৎ চড়া রোদের সময় (সকাল ১০:৩০-১১:০০)।',
      makruhTimeBn: 'ঠিক দুপুরবেলা সূর্য মাথার ওপর খাড়া থাকলে।',
      fiqhDetailsBn: 'সর্বনিম্ন ২ রাকাত, সাধারণত ৪ বা ৮ রাকাত পর্যন্ত পড়া রাসূলুল্লাহ ﷺ এর সুন্নাত।',
    },
    rakatsBreakdown: [
      {
        type: 'Nafl',
        typeBn: 'নফল সালাত',
        rakats: 4,
        rulingBn: '২ বা ৪ রাকাত করে সালাম ফিরিয়ে পঠিত',
        descriptionBn: 'রাসূলুল্লাহ ﷺ মক্কা বিজয়ের দিন ৮ রাকাত সালাতুদ দুহা পড়েছিলেন।',
      },
    ],
    postPrayerDuas: [
      {
        arabic: 'اللَّهُمَّ اغْفِرْ لِي، وَتُبْ عَلَيَّ، إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيمُ (১০০ বার)',
        transliteration: 'Allahummaghfir li wa tub \'alayya, innaka antat-Tawwabur-Rahim.',
        meaningBn: 'হে আল্লাহ! আমাকে ক্ষমা করুন এবং আমার তাওবা কবুল করুন, নিশ্চয় আপনি মহা তওবা কবুলকারী, পরম দয়ালু।',
        reference: 'আল-আদাবুল মুফরাদ: ৬১৯ (সহীহ)',
      },
    ],
  },
};
