export interface TopicAyah {
  id: string;
  surahNumber: number;
  ayahNumber: number;
  globalNumber: number;
  surahNameBn: string;
  surahNameAr: string;
  surahNameEn: string;
  arabic: string;
  translationBn: string;
  translationEn: string;
  transliterationBn: string;
  themeNoteBn: string;
  themeNoteEn: string;
}

export interface QuranTopicItem {
  id: string;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  icon: string;
  colorTheme: 'emerald' | 'amber' | 'blue' | 'rose' | 'purple' | 'teal' | 'indigo' | 'cyan';
  badgeBn: string;
  badgeEn: string;
  descriptionBn: string;
  descriptionEn: string;
  count: number;
  ayahs: TopicAyah[];
}

export const QURAN_TOPICS_DATABASE: QuranTopicItem[] = [
  // 1. SALAT
  {
    id: 'salat',
    nameBn: 'সালাত ও নামাজ',
    nameEn: 'Salat & Daily Prayer',
    nameAr: 'الصلاة والقيام',
    icon: '🕌',
    colorTheme: 'emerald',
    badgeBn: 'ইসলামের রুকন',
    badgeEn: 'Pillar of Islam',
    descriptionBn: 'পবিত্র কুরআনে পাঁচ ওয়াক্ত নামাজ প্রতিষ্ঠা, সময়নিষ্ঠতা, একাগ্রতা ও জুমার নামাজের আদেশ।',
    descriptionEn: 'Quranic injunctions on establishing daily prayers, punctuality, devotion, and Friday congregation.',
    count: 5,
    ayahs: [
      {
        id: 'salat_1',
        surahNumber: 2,
        ayahNumber: 45,
        globalNumber: 52,
        surahNameBn: 'আল-বাকারা',
        surahNameAr: 'البقرة',
        surahNameEn: 'Al-Baqarah',
        arabic: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ',
        translationBn: 'আর তোমরা ধৈর্য ও সালাতের মাধ্যমে সাহায্য প্রার্থনা করো। আর নিশ্চয়ই তা অত্যন্ত কঠিন কাজ, কিন্তু সেসব বিনয়ী খোদাভীরুদের জন্য নয়।',
        translationEn: 'And seek help through patience and prayer, and indeed, it is difficult except for the humbly submissive.',
        transliterationBn: 'ওয়াসতাঈনূ বিস সাবরি ওয়াস সালাতি ওয়া ইন্নাহা লাকাবীরাতুন ইল্লা আলাল খাশিঈন।',
        themeNoteBn: 'বিপদ-আপদে ধৈর্য ও সালাতের মাধ্যমে সরাসরি আল্লাহর সাহায্য চাওয়ার বিধান।',
        themeNoteEn: 'Seeking Almighty support and spiritual stability through patience and prayer.'
      },
      {
        id: 'salat_2',
        surahNumber: 29,
        ayahNumber: 45,
        globalNumber: 3385,
        surahNameBn: 'আল-আনকাবুত',
        surahNameAr: 'العنكبوت',
        surahNameEn: 'Al-Ankabut',
        arabic: 'اتْلُ مَا أُوحِيَ إِلَيْكَ مِنَ الْكِتَابِ وَأَقِمِ الصَّلَاةَ ۖ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ',
        translationBn: 'তুমি পাঠ করো যা তোমার প্রতি ওহি করা হয়েছে কিতাব থেকে এবং সালাত কায়েম করো। নিশ্চয়ই সালাত অশ্লীল ও অন্যায় কাজ থেকে বিরত রাখে।',
        translationEn: 'Recite what has been revealed to you of the Book and establish prayer. Indeed, prayer prohibits immorality and wrongdoing.',
        transliterationBn: 'উতলু মা ঊহিয়া ইলাইকা মিনাল কিতাবি ওয়া আকিমিস সালাহ, ইন্নাস সালাতা তানহা আনিল ফাহশা-ই ওয়াল মুনকার...',
        themeNoteBn: 'সালাত মানুষকে সব ধরনের পাপাচার ও অশ্লীলতা থেকে সুরক্ষা দেয়।',
        themeNoteEn: 'The transformative power of prayer shielding believers from evil.'
      },
      {
        id: 'salat_3',
        surahNumber: 17,
        ayahNumber: 78,
        globalNumber: 2107,
        surahNameBn: 'আল-ইসরা',
        surahNameAr: 'الإسراء',
        surahNameEn: 'Al-Isra',
        arabic: 'أَقِمِ الصَّلَاةَ لِدُلُوكِ الشَّمْسِ إِلَىٰ غَسَقِ اللَّيْلِ وَقُرْآنَ الْفَجْرِ ۖ إِنَّ قُرْآنَ الْفَجْرِ كَانَ مَشْهُودًا',
        translationBn: 'সূর্য হেলে পড়ার পর থেকে রাতের অন্ধকার পর্যন্ত সালাত কায়েম করো এবং ফজরের কুরআন পাঠ কায়েম করো। নিশ্চয়ই ফজরের সময় ফেরেশতাগণ উপস্থিত থাকেন।',
        translationEn: 'Establish prayer at the decline of the sun until the darkness of the night and the recitation of dawn.',
        transliterationBn: 'আকিমিস সালাতা লিদুলূকিশ শামসি ইলা গাসাকিল লাইলি ওয়া কুরআনাল ফাজর...',
        themeNoteBn: 'দৈনিক পাঁচ ওয়াক্ত সালাতের সময়সূচি ও ফজরে ফেরেশতাদের উপস্থিতির মর্যাদা।',
        themeNoteEn: 'Prescribed timing for daily prayers and the blessed dawn recitation.'
      },
      {
        id: 'salat_4',
        surahNumber: 20,
        ayahNumber: 14,
        globalNumber: 2362,
        surahNameBn: 'ত্বাহা',
        surahNameAr: 'طه',
        surahNameEn: 'Taha',
        arabic: 'إِنَّنِي أَنَا اللَّهُ لَا إِلَٰهَ إِلَّا أَنَا فَاعْبُدْنِي وَأَقِمِ الصَّلَاةَ لِذِكْرِي',
        translationBn: 'নিশ্চয়ই আমিই আল্লাহ, আমি ছাড়া কোনো ইলাহ নেই। সুতরাং আমারই ইবাদত করো এবং আমার স্মরণে সালাত কায়েম করো।',
        translationEn: 'Indeed, I am Allah. There is no deity except Me, so worship Me and establish prayer for My remembrance.',
        transliterationBn: 'ইন্নানী আনাল্লাহু লা ইলাহা ইল্লা আনা ফাবুদনী ওয়া আকিমিস সালাতা লিযিকরী.',
        themeNoteBn: 'সালাতের মূল রূপ হলো আল্লাহর খাঁটি স্মরণ ও জিকির।',
        themeNoteEn: 'Primary essence of prayer is the absolute remembrance of Allah.'
      },
      {
        id: 'salat_5',
        surahNumber: 23,
        ayahNumber: 1,
        globalNumber: 2674,
        surahNameBn: 'আল-মু’মিনুন',
        surahNameAr: 'المؤمنون',
        surahNameEn: 'Al-Mu\'minun',
        arabic: 'قَدْ أَفْلَحَ الْمُؤْمِنُونَ ﴿١﴾ الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ',
        translationBn: 'অবশ্যই ঈমানদারগণ সফলকাম হয়েছে, যারা নিজেদের সালাতে বিনম্র ও একাগ্র।',
        translationEn: 'Certainly will the believers have succeeded - They who are during their prayer humbly submissive.',
        transliterationBn: 'কাদ আফলাহাল মু’মিনূন. আল্লাযীনা হুম ফী সালাতিহিম খাশিঊন.',
        themeNoteBn: 'সফল মোমিনের প্রথম বৈশিষ্ট্য হলো সালাতে خشوع বা বিনম্র একাগ্রতা।',
        themeNoteEn: 'Humble focus during prayer as the true mark of spiritual success.'
      }
    ]
  },

  // 2. ZIKR
  {
    id: 'zikr',
    nameBn: 'জিকির ও তাসবীহ',
    nameEn: 'Dhikr & Divine Remembrance',
    nameAr: 'الذكر واليقين',
    icon: '📿',
    colorTheme: 'amber',
    badgeBn: 'অন্তরের প্রশান্তি',
    badgeEn: 'Remembrance',
    descriptionBn: 'আল্লাহর স্মরণ, সুবহানাল্লাহ-আলহামদুলিল্লাহ পাঠ, অন্তরের প্রশান্তি ও সর্বাবস্থায় জিকিরে মশগুল থাকার আয়াত।',
    descriptionEn: 'Quranic commands on glorifying Allah, constant dhikr, and attaining tranquility of heart.',
    count: 4,
    ayahs: [
      {
        id: 'zikr_1',
        surahNumber: 2,
        ayahNumber: 152,
        globalNumber: 159,
        surahNameBn: 'আল-বাকারা',
        surahNameAr: 'البقرة',
        surahNameEn: 'Al-Baqarah',
        arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
        translationBn: 'সুতরাং তোমরা আমাকে স্মরণ করো, আমিও তোমাদের স্মরণ করব। আর আমার প্রতি কৃতজ্ঞতা প্রকাশ করো এবং অকৃতজ্ঞ হয়ো না।',
        translationEn: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
        transliterationBn: 'ফাযকুরূনী আযকুরকুম ওয়াশ কুরূ লী ওয়া লা তাকফুরূন।',
        themeNoteBn: 'আল্লাহর জিকিরের অভূতপূর্ব প্রতিদান—স্বয়ং রব্বুল আলামিন বান্দাকে স্মরণ করেন।',
        themeNoteEn: 'Divine reciprocity: When you remember your Creator, He remembers you.'
      },
      {
        id: 'zikr_2',
        surahNumber: 13,
        ayahNumber: 28,
        globalNumber: 1735,
        surahNameBn: 'আর-রা’দ',
        surahNameAr: 'الرعد',
        surahNameEn: 'Ar-Ra\'d',
        arabic: 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
        translationBn: 'যারা ঈমান আনে এবং যাদের অন্তর আল্লাহর জিকিরে প্রশান্ত হয়। জেনে রাখো! কেবল আল্লাহর জিকির দ্বারাই অন্তরসমূহ প্রশান্তি লাভ করে।',
        translationEn: 'Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.',
        transliterationBn: 'আল্লাযীনা আমানূ ওয়া তাতমাইন্নু কুলূবুহুম বিযিকরিল্লাহ, আলা বিযিকরিল্লাহি তাতমাইন্নুল কুলূব.',
        themeNoteBn: 'মানসিক দুশ্চিন্তা ও মানসিক অস্থিরতা দূরীকরণে জিকিরের অসামান্য প্রশান্তি।',
        themeNoteEn: 'Ultimate solace and peace of mind found strictly in Allah\'s dhikr.'
      },
      {
        id: 'zikr_3',
        surahNumber: 33,
        ayahNumber: 41,
        globalNumber: 3574,
        surahNameBn: 'আল-আহজাব',
        surahNameAr: 'الأحزاب',
        surahNameEn: 'Al-Ahzab',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا ﴿٤١﴾ وَسَبِّحُوهُ بُكْرَةً وَأَصِيلًا',
        translationBn: 'হে ঈমানদারগণ! তোমরা আল্লাহকে অধিক পরিমাণে স্মরণ করো এবং সকাল-সন্ধ্যায় তাঁর পবিত্রতা বর্ণনা করো।',
        translationEn: 'O you who have believed, remember Allah with much remembrance And glorify Him morning and afternoon.',
        transliterationBn: 'ইয়া আইয়ুহাল্লাযীনা আমানুজ কুরুল্লাহা যিকরান কাছীরা. ওয়া সাব্বিহূহু বুকরাতাও ওয়া আসীলা.',
        themeNoteBn: 'সকাল-সন্ধ্যা বেশি বেশি আল্লাহর জিকির ও তাসবীহ পাঠের স্থায়ী নির্দেশ।',
        themeNoteEn: 'Abundant daily dhikr during mornings and evenings.'
      },
      {
        id: 'zikr_4',
        surahNumber: 62,
        ayahNumber: 10,
        globalNumber: 5187,
        surahNameBn: 'আল-জুমুআহ',
        surahNameAr: 'الجمعة',
        surahNameEn: 'Al-Jumu\'ah',
        arabic: 'فَإِذَا قُضِيَتِ الصَّلَاةُ فَانتَشِرُوا فِي الْأَرْضِ وَابْتَغُوا مِن فَضْلِ اللَّهِ وَاذْكُرُوا اللَّهَ كَثِيرًا لَّعَلَّكُمْ تُفْلِحُونَ',
        translationBn: 'তারপর সালাত সমাপ্ত হলে তোমরা জমিনে ছড়িয়ে পড়ো এবং আল্লাহর অনুগ্রহ সন্ধান করো; আর আল্লাহকে বেশি বেশি স্মরণ করো যাতে তোমরা সফল হতে পারো।',
        translationEn: 'And when the prayer has been concluded, disperse within the land and seek from the bounty of Allah, and remember Allah often that you may succeed.',
        transliterationBn: 'ফা ইযা কুদিয়াতিস সালাতু ফানতাশিরূ ফিল আরদি ওয়াব তাগূ মিন ফাদলিল্লাহি ওয়াজকুরুল্লাহা কাছীরান...',
        themeNoteBn: 'কর্মক্ষেত্রে বা ব্যবসাতেও আল্লাহকে স্মরণ করার মাধ্যমে চিরন্তন সাফল্য।',
        themeNoteEn: 'Integrating divine remembrance into earthly work and daily transactions.'
      }
    ]
  },

  // 3. IBADAH
  {
    id: 'ibadah',
    nameBn: 'ইবাদত ও বন্দিগি',
    nameEn: 'Ibadah & Pure Worship',
    nameAr: 'العبادة والعبودية',
    icon: '🤲',
    colorTheme: 'indigo',
    badgeBn: 'জীবনের মূল লক্ষ্য',
    badgeEn: 'Pure Devotion',
    descriptionBn: 'মানুষ সৃষ্টির আসল উদ্দেশ্য, আল্লাহর একনিষ্ঠ বন্দিগি ও কেবল তাঁরই দরবারে আনুগত্য প্রকাশের আয়াত।',
    descriptionEn: 'Core purpose of human creation, unadulterated devotion, and surrendering solely to Allah.',
    count: 4,
    ayahs: [
      {
        id: 'ibadah_1',
        surahNumber: 51,
        ayahNumber: 56,
        globalNumber: 4731,
        surahNameBn: 'আজ-জারিয়াত',
        surahNameAr: 'الذاريات',
        surahNameEn: 'Adh-Dhariyat',
        arabic: 'وَمَا خَلَقْتُ الْجِنَّ وَالْإِنسَ إِلَّا لِيَعْبُدُونِ',
        translationBn: 'আর আমি জিন ও মানবজাতিকে কেবল আমার ইবাদত করার জন্যই সৃষ্টি করেছি।',
        translationEn: 'And I did not create the jinn and mankind except to worship Me.',
        transliterationBn: 'ওয়া মা খালাকতুল জিন্না ওয়াল ইনসা ইল্লা লিইয়াবুদূন.',
        themeNoteBn: 'মানব ও জিনজাতি সৃষ্টির মূল উদ্দেশ্য স্বয়ং রবের ইবাদত ও দাসত্ব।',
        themeNoteEn: 'The single overarching purpose of human and jinn existence.'
      },
      {
        id: 'ibadah_2',
        surahNumber: 1,
        ayahNumber: 5,
        globalNumber: 5,
        surahNameBn: 'আল-ফাতিহা',
        surahNameAr: 'الفاتحة',
        surahNameEn: 'Al-Faatiha',
        arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        translationBn: 'আমরা কেবল তোমারই ইবাদত করি এবং কেবল তোমারই কাছে সাহায্য প্রার্থনা করি।',
        translationEn: 'It is You we worship and You we ask for help.',
        transliterationBn: 'ই ইয়্যাকা নাবুদু ওয়া ই ইয়্যাকা নাসতাঈন.',
        themeNoteBn: 'প্রতিদিন সালাতে পঠিত একনিষ্ঠ ইবাদত ও একচ্ছত্র সাহায্য প্রার্থনার পবিত্র অঙ্গীকার।',
        themeNoteEn: 'Daily covenant recited in every Salah surrendering all aid to Allah.'
      },
      {
        id: 'ibadah_3',
        surahNumber: 6,
        ayahNumber: 162,
        globalNumber: 951,
        surahNameBn: 'আল-আনআম',
        surahNameAr: 'الأنعام',
        surahNameEn: 'Al-An\'am',
        arabic: 'قُلْ إِنَّ صَلَاتِي وَنُسُكِي وَمَحْيَايَ وَمَمَاتِي لِلَّهِ رَبِّ الْعَالَمِينَ',
        translationBn: 'বলো: "নিশ্চয়ই আমার সালাত, আমার কুরবানি, আমার জীবন ও আমার মরণ সবকিছুই সৃষ্টিজগতের রব আল্লাহর জন্য।"',
        translationEn: 'Say, "Indeed, my prayer, my rites of sacrifice, my living and my dying are for Allah, Lord of the worlds."',
        transliterationBn: 'কূল ইন্না সালাতী ওয়া নুসুকী ওয়া মাহয়্যাইয়া ওয়া মামাতী লিল্লাহি রাব্বিল আলামীন.',
        themeNoteBn: 'মোমিনের জীবনের প্রতিটি মুহূর্ত ও ত্যাগের সর্বোচ্চ নিবেদন।',
        themeNoteEn: 'Total dedication of life, death, worship, and sacrifice to Allah.'
      },
      {
        id: 'ibadah_4',
        surahNumber: 98,
        ayahNumber: 5,
        globalNumber: 6125,
        surahNameBn: 'আল-বাইয়িনাহ',
        surahNameAr: 'البينة',
        surahNameEn: 'Al-Bayyinah',
        arabic: 'وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ لَهُ الدِّينَ حُنَفَاءَ',
        translationBn: 'আর তাদেরকে কেবল এই আদেশই দেওয়া হয়েছিল যে, তারা যেন খাঁটি মনে একনিষ্ঠ হয়ে আল্লাহর ইবাদত করে।',
        translationEn: 'And they were not commanded except to worship Allah, [being] sincere to Him in religion...',
        transliterationBn: 'ওয়া মা উমিরূ ইল্লা লিইয়াবুদুল্লাহা মুখলিসীনা লাহুদ্দীন...',
        themeNoteBn: 'খাঁটি নিয়ত ও ইখলাসের সাথে আল্লাহর ইবাদত করার মূল শর্ত।',
        themeNoteEn: 'Sincerity (Ikhlas) as the prerequisite of accepted worship.'
      }
    ]
  },

  // 4. JANNAT
  {
    id: 'jannat',
    nameBn: 'জান্নাত ও নেয়ামত',
    nameEn: 'Jannat & Heavenly Bounties',
    nameAr: 'الجنة ونعيمها',
    icon: '🌴',
    colorTheme: 'emerald',
    badgeBn: 'পরকালের সাফল্য',
    badgeEn: 'Eternal Bliss',
    descriptionBn: 'জান্নাতের সুউচ্চ উদ্যান, নহর, সুশীতল ছায়া ও জান্নাতিদের অফুরন্ত সুখ-শান্তির বয়ান।',
    descriptionEn: 'Detailed Quranic descriptions of Paradise, rivers, peace, and rewards for the pious.',
    count: 5,
    ayahs: [
      {
        id: 'jannat_1',
        surahNumber: 2,
        ayahNumber: 25,
        globalNumber: 32,
        surahNameBn: 'আল-বাকারা',
        surahNameAr: 'البقرة',
        surahNameEn: 'Al-Baqarah',
        arabic: 'وَبَشِّرِ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ أَنَّ لَهُمْ جَنَّاتٍ تَجْرِي مِن تَحْتِهَا الْأَنْهَارُ',
        translationBn: 'আর যারা ঈমান এনেছে এবং সৎকাজ করেছে, তুমি তাদেরকে সুসংবাদ দাও যে, তাদের জন্য রয়েছে জান্নাতসমূহ, যার তলদেশ দিয়ে নদীসমূহ প্রবাহিত...',
        translationEn: 'And give good tidings to those who believe and do righteous deeds that they will have gardens beneath which rivers flow...',
        transliterationBn: 'ওয়া বাশ্‌শিরিল্লাযীনা আমানূ ওয়া আমিলুস সালিহাতি আন্না লাহুম জান্নাতিন তাজরী মিন তাহতিহাল আনহার...',
        themeNoteBn: 'সৎকর্মশীল মোমিনদের জন্য প্রবাহমান নদীসংবলিত জান্নাতের সুসংবাদ।',
        themeNoteEn: 'Glad tidings of perpetual rivers and bounties in Paradise.'
      },
      {
        id: 'jannat_2',
        surahNumber: 3,
        ayahNumber: 133,
        globalNumber: 426,
        surahNameBn: 'আলে ইমরান',
        surahNameAr: 'آل عمران',
        surahNameEn: "Ali 'Imran",
        arabic: 'وَسَارِعُوا إِلَىٰ مَغْفِرَةٍ مِّن رَّبِّكُمْ وَجَنَّةٍ عَرْضُهَا السَّمَاوَاتُ وَالْأَرْضُ أُعِدَّتْ لِلْمُتَّقِينَ',
        translationBn: 'আর তোমরা দ্রুত অগ্রসর হও তোমাদের রবের ক্ষমার দিকে এবং সেই জান্নাতের দিকে, যার প্রশস্ততা আসমান ও জমিনের সমান, যা প্রস্তুত রাখা হয়েছে মুত্তাকিদের জন্য।',
        translationEn: 'And hasten to forgiveness from your Lord and a garden as wide as the heavens and earth, prepared for the righteous.',
        transliterationBn: 'ওয়া সাবিঊ ইলা মাগফিরাতিম মির রাব্বিকুম ওয়া জান্নাতিন আরদুহাস সামা ওয়াতু ওয়াল আরদু উইদ্দাত লিল মুত্তাকীন।',
        themeNoteBn: 'আসমান-জমিনব্যাপী সুবিশাল জান্নাতের দিকে দ্রুত ধাবিত হওয়ার ডাক।',
        themeNoteEn: 'Urgent divine invitation to race towards vast Paradise.'
      },
      {
        id: 'jannat_3',
        surahNumber: 55,
        ayahNumber: 46,
        globalNumber: 4947,
        surahNameBn: 'আর-রহমান',
        surahNameAr: 'الرحمن',
        surahNameEn: 'Ar-Rahman',
        arabic: 'وَلِمَنْ خَافَ مَقَامَ رَبِّهِ جَنَّتَانِ',
        translationBn: 'আর যে ব্যক্তি তার রবের সামনে উপস্থিত হওয়াকে ভয় করে, তার জন্য রয়েছে দুটি বিশেষ জান্নাত।',
        translationEn: 'But for he who has feared the position of his Lord are two gardens.',
        transliterationBn: 'ওয়া লিমান খাফা মাকামা রাব্বিহী জান্নاتান।',
        themeNoteBn: 'আল্লাহর ভয় অন্তরে পোষণকারীদের জন্য দুটি সুউচ্চ জান্নাত।',
        themeNoteEn: 'Two grand twin gardens reserved for God-fearing souls.'
      },
      {
        id: 'jannat_4',
        surahNumber: 76,
        ayahNumber: 12,
        globalNumber: 5603,
        surahNameBn: 'আল-ইনসান',
        surahNameAr: 'الإنسان',
        surahNameEn: 'Al-Insan',
        arabic: 'وَجَزَاهُم بِمَا صَبَرُوا جَنَّةً وَحَرِيرًا',
        translationBn: 'আর তারা যে ধৈর্য ধারণ করেছিল, তার বিনিময়ে তিনি তাদেরকে প্রদান করবেন সুসজ্জিত জান্নাত ও রেশমি পোশাক।',
        translationEn: 'And will reward them for what they patiently endured with a garden and silk garments.',
        transliterationBn: 'ওয়া জাযাহুম বিমা সবারূ জান্নাতাও ওয়া হারীরা।',
        themeNoteBn: 'ধৈর্যের প্রতিদান হিসেবে জান্নাত ও রেশমি সুসজ্জিত বস্র।',
        themeNoteEn: 'Finest silk attire and royal comfort in Jannah for patience.'
      },
      {
        id: 'jannat_5',
        surahNumber: 88,
        ayahNumber: 10,
        globalNumber: 5977,
        surahNameBn: 'আল-গাশিয়াহ',
        surahNameAr: 'الغاشية',
        surahNameEn: 'Al-Ghashiyah',
        arabic: 'فِي جَنَّةٍ عَالِيَةٍ ﴿١٠﴾ لَّا تَسْمَعُ فِيهَا لَاغِيَةً',
        translationBn: 'তারা থাকবে সুউচ্চ জান্নাতে, যেখানে কোনো অনর্থক বা অসার কথা শোনা যাবে না।',
        translationEn: 'In an elevated garden, wherein they will hear no suitable talk.',
        transliterationBn: 'ফী জান্নাতিন আলিয়াহ. লা তাসমাউ ফীহা লাগিয়াহ.',
        themeNoteBn: 'অনাবিল প্রশান্তিময় ও অসার কোলাহলমুক্ত জান্নাতের চমৎকার পরিবেশ।',
        themeNoteEn: 'High serene atmosphere free from all vanity and ill talk.'
      }
    ]
  },

  // 5. JAHANNAM
  {
    id: 'jahannam',
    nameBn: 'জাহান্নাম ও শাস্তি',
    nameEn: 'Jahannam & Warning',
    nameAr: 'جهنم والعذاب',
    icon: '🔥',
    colorTheme: 'rose',
    badgeBn: 'ভয়াবহ সতর্কবার্তা',
    badgeEn: 'Hellfire Warning',
    descriptionBn: 'জাহান্নামের আগুন, শাস্তি, অহংকারী ও পাপীদের ভয়াবহ পরিণামের বিষয়ে কুরআনি সতর্কবাণী।',
    descriptionEn: 'Severe warnings regarding the heat of Jahannam, punishment, and the fate of wrongdoers.',
    count: 4,
    ayahs: [
      {
        id: 'jahannam_1',
        surahNumber: 2,
        ayahNumber: 24,
        globalNumber: 31,
        surahNameBn: 'আল-বাকারা',
        surahNameAr: 'البقرة',
        surahNameEn: 'Al-Baqarah',
        arabic: 'فَاتَّقُوا النَّارَ الَّتِي وَقُودُهَا النَّاسُ وَالْحِجَارَةُ ۖ أُعِدَّتْ لِلْكَافِرِينَ',
        translationBn: 'সুতরাং তোমরা সেই আগুনকে ভয় করো যার জ্বালানি হবে মানুষ ও পাথর, যা প্রস্তুত রাখা হয়েছে কাফিরদের জন্য।',
        translationEn: 'Fear the Fire, whose fuel is men and stones, prepared for the disbelievers.',
        transliterationBn: 'ফাত তাকুন্ নারাল্লাতী ওয়াকূদুহান নাসু ওয়াল হিজারাতু উইদ্দাত লিল কাফিরীন।',
        themeNoteBn: 'জাহান্নামের আগুনের জ্বালানি হিসেবে মানুষ ও পাথরের ভয়াবহ চিত্র।',
        themeNoteEn: 'Severe warning about the fuel of Jahannam comprising humans and rocks.'
      },
      {
        id: 'jahannam_2',
        surahNumber: 67,
        ayahNumber: 6,
        globalNumber: 5247,
        surahNameBn: 'আল-মুলক',
        surahNameAr: 'الملك',
        surahNameEn: 'Al-Mulk',
        arabic: 'وَلِلَّذِينَ كَفَرُوا بِرَبِّهِمْ عَذَابُ جَهَنَّمَ ۖ وَبِئْسَ الْمَصِيرُ',
        translationBn: 'আর যারা তাদের রবকে অস্বীকার করেছে, তাদের জন্য রয়েছে জাহান্নামের আজাব; আর তা কতই না নিকৃষ্ট ঠিকানা!',
        translationEn: 'And for those who disbelieved in their Lord is the punishment of Hell, and wretched is the destination.',
        transliterationBn: 'ওয়া লিল্লাযীনা কাফারূ বিরাব্বিহিম আযাবু জাহান্নামা ওয়া বি’সাল মাসীর।',
        themeNoteBn: 'রবকে অস্বীকারকারীদের জন্য জাহান্নামের অতি নিকৃষ্ট ঠিকানা।',
        themeNoteEn: 'A wretched destination for those who reject their Creator.'
      },
      {
        id: 'jahannam_3',
        surahNumber: 104,
        ayahNumber: 4,
        globalNumber: 6182,
        surahNameBn: 'আল-হুমাঝাহ',
        surahNameAr: 'الهمزة',
        surahNameEn: 'Al-Humazah',
        arabic: 'كَلَّا ۖ لَيُنبَذَنَّ فِي الْحُطَمَةِ ﴿٤﴾ وَمَا أَدْرَاكَ مَا الْحُطَمَةُ ﴿٥﴾ نَارُ اللَّهِ الْمُوقَدَةُ',
        translationBn: 'কখনোই নয়! সে তো নিক্ষিপ্ত হবে ‘হুতামাহ’ নামক জাহান্নামে। আর কিসে তোমাকে জানাবে হুতামাহ কী? তা হলো আল্লাহর প্রজ্বলিত আগুন!',
        translationEn: 'No! He will surely be thrown into the Crusher. And what can make you know what is the Crusher? It is the fire of Allah...',
        transliterationBn: 'কাল্লা লাইউনবাযান্না ফিল হুতামাহ. ওয়া মা আদরাকা মাল হুতামাহ. নারুল্লাহিল মূকাদাহ.',
        themeNoteBn: 'পরনিন্দুকদের জন্য আল্লাহর সংহারী প্রজ্বলিত আগুন।',
        themeNoteEn: 'The crushing fire of Allah fueled for slanderers.'
      },
      {
        id: 'jahannam_4',
        surahNumber: 25,
        ayahNumber: 65,
        globalNumber: 2920,
        surahNameBn: 'আল-ফুরকান',
        surahNameAr: 'الفرقان',
        surahNameEn: 'Al-Furqan',
        arabic: 'وَالَّذِينَ يَقُولُونَ رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ ۖ إِنَّ عَذَابَهَا كَانَ غَرَامًا',
        translationBn: 'আর যারা বলে: "হে আমাদের রব! আমাদের থেকে জাহান্নামের আজাব সরিয়ে দিন, নিশ্চয়ই এর আজাব হলো ধ্বংসাত্মক।"',
        translationEn: 'And those who say, "Our Lord, avert from us the punishment of Hell. Indeed, its punishment is indestructible debt."',
        transliterationBn: 'ওয়াল্লাযীনা ইয়াকূলূনা রাব্বানাসরিফ আন্না আযাবা জাহান্নাম, ইন্না আযাবাহা কানা গ্যারামা.',
        themeNoteBn: 'জাহান্নাম থেকে মুক্তির জন্য মোমিন বান্দাদের আকুল প্রার্থনা।',
        themeNoteEn: 'Supplication of the servants of Rahman for safety from Hellfire.'
      }
    ]
  },

  // 6. HALAL
  {
    id: 'halal',
    nameBn: 'হালাল খাবার ও উপার্জন',
    nameEn: 'Halal Food & Sustenance',
    nameAr: 'الحلال الطيب',
    icon: '🥑',
    colorTheme: 'teal',
    badgeBn: 'পবিত্র খাদ্যাভ্যাস',
    badgeEn: 'Pure Sustenance',
    descriptionBn: 'পবিত্র ও হালাল খাবার গ্রহণ, হালাল উপার্জন ও হালাল রিজিকের মাধ্যমে আত্মশুদ্ধির আদেশ।',
    descriptionEn: 'Divine commandments regarding wholesome, lawful food and ethical livelihood.',
    count: 4,
    ayahs: [
      {
        id: 'halal_1',
        surahNumber: 2,
        ayahNumber: 168,
        globalNumber: 175,
        surahNameBn: 'আল-বাকারা',
        surahNameAr: 'البقرة',
        surahNameEn: 'Al-Baqarah',
        arabic: 'يَا أَيُّهَا النَّاسُ كُلُوا مِمَّا فِي الْأَرْضِ حَلَالًا طَيِّبًا وَلَا تَتَّبِعُوا خُطُواتِ الشَّيْطَانِ',
        translationBn: 'হে মানবজাতি! জমিনে যা কিছু হালাল ও পবিত্র রয়েছে তা থেকে খাও এবং শয়তানের পদাঙ্ক অনুসরণ করো না।',
        translationEn: 'O mankind, eat from whatever is on earth that is lawful and good and do not follow the footsteps of Satan.',
        transliterationBn: 'ইয়া আইয়ুহান নাসু কুলূ মি্ম্মা ফিল আরদি হালালান তাইয়্যিবান...',
        themeNoteBn: 'পবিত্র ও হালাল খাবার গ্রহণের সরাসরি দৈব নির্দেশ।',
        themeNoteEn: 'Universal divine instruction to eat pure lawful provisions.'
      },
      {
        id: 'halal_2',
        surahNumber: 16,
        ayahNumber: 114,
        globalNumber: 2015,
        surahNameBn: 'আন-নাহল',
        surahNameAr: 'النحل',
        surahNameEn: 'An-Nahl',
        arabic: 'فَكُلُوا مِمَّا رَزَقَكُمُ اللَّهُ حَلَالًا طَيِّبًا وَاشْكُرُوا نِعْمَتَ اللَّهِ',
        translationBn: 'সুতরাং আল্লাহ তোমাদের যে হালাল ও পবিত্র রিজিক দিয়েছেন তা তোমরা খাও এবং আল্লাহর নেয়ামতের শুকরিয়া আদায় করো।',
        translationEn: 'Then eat of what Allah has provided for you which is lawful and good. And be grateful for the favor of Allah.',
        transliterationBn: 'ফাকুলূ মি্ম্মা রাযাকাকুমুল্লাহু হালালান তাইয়্যিবান ওয়াশ কুরূ নিমাতাল্লাহি...',
        themeNoteBn: 'হালাল রুজি ভক্ষণ ও রবের কাছে কৃতজ্ঞতা প্রকাশ।',
        themeNoteEn: 'Partaking of wholesome gifts with sincere gratitude.'
      },
      {
        id: 'halal_3',
        surahNumber: 7,
        ayahNumber: 157,
        globalNumber: 1111,
        surahNameBn: 'আল-আ’রাফ',
        surahNameAr: 'الأعراف',
        surahNameEn: 'Al-A\'raf',
        arabic: 'وَيُحِلُّ لَهُمُ الطَّيِّبَاتِ وَيُحَرِّمُ عَلَيْهِمُ الْخَبَائِثَ',
        translationBn: 'আর তিনি (নবী) তাদের জন্য পবিত্র বস্তুসমূহ হালাল করেন এবং অপবিত্র বস্তুসমূহ হারাম করেন।',
        translationEn: 'He makes lawful for them the good things and prohibits for them the evil things.',
        transliterationBn: 'ওয়া ইউহিল্লু লাহুমুত তাইয়্যিবাতি ওয়া ইউহাররিমু আলাইহিমুল খাবাইছ...',
        themeNoteBn: 'পবিত্র বস্তু হালাল এবং ক্ষতিকর অপবিত্র জিনিস হারাম করার মূলনীতি।',
        themeNoteEn: 'Prophetic principle legitimizing all pure things.'
      },
      {
        id: 'halal_4',
        surahNumber: 2,
        ayahNumber: 172,
        globalNumber: 179,
        surahNameBn: 'আল-বাকারা',
        surahNameAr: 'البقرة',
        surahNameEn: 'Al-Baqarah',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُلُوا مِن طَيِّبَاتِ مَا رَزَقْنَاكُمْ وَاشْكُرُوا لِلَّهِ',
        translationBn: 'হে ঈমানদারগণ! আমি তোমাদের যে পবিত্র রিজিক দিয়েছি তা থেকে খাও এবং আল্লাহর দরবারে শুকরিয়া আদায় করো।',
        translationEn: 'O you who have believed, eat from the good things which We have provided for you and be grateful to Allah.',
        transliterationBn: 'ইয়া আইয়ুহাল্লাযীনা আমানূ কুলূ মিন তাইয়্যিবাতি মা রাযাকনাকুম...',
        themeNoteBn: 'মোমিনদের আত্মশুদ্ধির মূল চাবিকাঠি হালাল খাবার।',
        themeNoteEn: 'Believers enjoined to consume pure foods with thankful hearts.'
      }
    ]
  },

  // 7. HARAM
  {
    id: 'haram',
    nameBn: 'হারাম ও কবিরা গুনাহ',
    nameEn: 'Haram & Major Sins',
    nameAr: 'المحرمات والكبائر',
    icon: '🚫',
    colorTheme: 'rose',
    badgeBn: 'বর্জনের বিধান',
    badgeEn: 'Forbidden Actions',
    descriptionBn: 'মদ, জুয়া, সুদ, গিবত, শিরক, জিনা ও অন্যান্য সর্বনাশা কবিরা গুনাহ বর্জনের কড়া নির্দেশ।',
    descriptionEn: 'Explicit Quranic bans on intoxicants, gambling, usury, slander, and major transgressions.',
    count: 4,
    ayahs: [
      {
        id: 'haram_1',
        surahNumber: 5,
        ayahNumber: 90,
        globalNumber: 759,
        surahNameBn: 'আল-মায়েদাহ',
        surahNameAr: 'المائدة',
        surahNameEn: 'Al-Ma\'idah',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِنَّمَا الْخَمْرُ وَالْمَيْسِرُ وَالْأَنصَابُ وَالْأَزْلَامُ رِجْسٌ مِّنْ عَمَلِ الشَّيْطَانِ فَاجْتَنِبُوهُ',
        translationBn: 'হে ঈমানদারগণ! মদ, জুয়া, প্রতিমা ও ভাগ্যনির্ধারক তীর—এসবই শয়তানের অপবিত্র কাজ। সুতরাং তোমরা এগুলো বর্জন করো।',
        translationEn: 'O you who have believed, indeed, intoxicants, gambling, idols, and divining arrows are defilement from Satan, so avoid them.',
        transliterationBn: 'ইয়া আইয়ুহাল্লাযীনা আমানূ ইন্নামাল খামরু ওয়াল মাইসিরু ওয়াল আনসাবু ওয়াল আযলামু রিজসুম মিন আমালিশ শায়তান...',
        themeNoteBn: 'মদ, জুয়া ও শিরকি কর্মকাণ্ডের চূড়ান্ত নিষিদ্ধকরণ।',
        themeNoteEn: 'Total prohibition of intoxicants, gambling, and idolatry.'
      },
      {
        id: 'haram_2',
        surahNumber: 5,
        ayahNumber: 3,
        globalNumber: 672,
        surahNameBn: 'আল-মায়েদাহ',
        surahNameAr: 'المائدة',
        surahNameEn: 'Al-Ma\'idah',
        arabic: 'حُرِّمَتْ عَلَيْكُمُ الْمَيْتَةُ وَالدَّمُ وَلَحْمُ الْخِنزِيرِ وَمَا أُهِلَّ لِغَيْرِ اللَّهِ بِهِ',
        translationBn: 'তোমাদের জন্য হারাম করা হয়েছে মৃত পশু, রক্ত, শূকরের গোশত এবং যা আল্লাহ ছাড়া অন্যের নামে জবাই করা হয়েছে।',
        translationEn: 'Prohibited to you are dead animals, blood, the flesh of swine, and that dedicated to other than Allah.',
        transliterationBn: 'হুররিমাত আলাইকুমুল মাইতাতু ওয়াদ দামু ওয়া লাহমুল খিনযೀರಿ...',
        themeNoteBn: 'সব ধরনের হারাম ও অপবিত্র খাবারের সুনির্দিষ্ট তালিকা।',
        themeNoteEn: 'Explicit bans on carrion, blood, pork, and non-Islamic sacrifices.'
      },
      {
        id: 'haram_3',
        surahNumber: 2,
        ayahNumber: 275,
        globalNumber: 282,
        surahNameBn: 'আল-বাকারা',
        surahNameAr: 'البقرة',
        surahNameEn: 'Al-Baqarah',
        arabic: 'الَّذِينَ يَأْكُلُونَ الرِّبَا لَا يَقُومُونَ إِلَّا كَمَا يَقُومُ الَّذِي يَتَخَبَّطُهُ الشَّيْطَانُ مِنَ الْمَسِّ ۚ وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا',
        translationBn: 'যারা সুদ খায় তারা সেদিন সেই ব্যক্তির মতো দাঁড়াবে যাকে শয়তান স্পর্শ দিয়ে উন্মাদ বানিয়ে দিয়েছে। অথচ আল্লাহ ব্যবসাকে হালাল করেছেন এবং সুদকে হারাম করেছেন।',
        translationEn: 'Those who consume usury cannot stand except as one stands who is being beaten by Satan into insanity. Allah has permitted trade and forbidden usury.',
        transliterationBn: 'আল্লাযীনা ইয়া’কুলূনার রিবা লা ইয়াকূমূনা ইল্লা কামা ইয়াকূমুল লাযী ইয়াতাকাব্বাতুহুশ শায়তানু মিনাল মাস্স...',
        themeNoteBn: 'ব্যবসা হালাল এবং সুদের ভয়াবহ অপরাধের চূড়ান্ত নিষেধাজ্ঞা।',
        themeNoteEn: 'Clear distinction between lawful trade and banned usury (Riba).'
      },
      {
        id: 'haram_4',
        surahNumber: 49,
        ayahNumber: 12,
        globalNumber: 4624,
        surahNameBn: 'আল-হুজুরাত',
        surahNameAr: 'الحجرات',
        surahNameEn: 'Al-Hujurat',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اجْتَنِبُوا كَثِيرًا مِّنَ الظَّنِّ إِنَّ بَعْضَ الظَّنِّ إِثْمٌ ۖ وَلَا تَجَسَّسُوا وَلَا يَغْتَب بَّعْضُكُم بَّعْضًا',
        translationBn: 'হে ঈমানদারগণ! তোমরা অধিকাংশ ধারণা থেকে বেঁচে থাকো, কারণ কোনো কোনো ধারণা পাপ। আর গোপন বিষয় সন্ধান করো না এবং একে অপরের গিবত (পরনিন্দা) করো না।',
        translationEn: 'O you who have believed, avoid much suspicion, for indeed, some suspicion is sin. And do not spy or backbite one another.',
        transliterationBn: 'ইয়া আইয়ুহাল্লাযীনা আমানুজ তানিভূম কাছীরাম মিনাজ জান্নি ইন্না বা’দাজ জান্নি ইছমুও ওয়া লা তাঝাস্সাসূ ওয়া লা ইয়াগতাব বা’দুকুম বা’দা...',
        themeNoteBn: 'কুধারণা, অন্যের গোপন তথ্য খোঁজা ও গিবত করার সামাজিক পাপ নিষিদ্ধ করা হয়েছে।',
        themeNoteEn: 'Prohibition of suspicion, spying, and backbiting.'
      }
    ]
  },

  // 8. SABR
  {
    id: 'sabr',
    nameBn: 'সবর ও ধৈর্য',
    nameEn: 'Sabr & Perseverance',
    nameAr: 'الصبر والتحمل',
    icon: '🌱',
    colorTheme: 'cyan',
    badgeBn: 'ঈমানের অর্ধেক',
    badgeEn: 'Endurance',
    descriptionBn: 'কঠিন বিপদে অবিচল থাকা, ইন্নালিল্লাহ পাঠ করা ও ধৈর্যশীলদের জন্য অগণিত পুরস্কারের সুসংবাদ।',
    descriptionEn: 'Verses on patient endurance during afflictions, saying Inna Lillahi, and unlimited rewards.',
    count: 4,
    ayahs: [
      {
        id: 'sabr_1',
        surahNumber: 2,
        ayahNumber: 153,
        globalNumber: 160,
        surahNameBn: 'আল-বাকারা',
        surahNameAr: 'البقرة',
        surahNameEn: 'Al-Baqarah',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
        translationBn: 'হে ঈমানদারগণ! তোমরা ধৈর্য ও সালাতের মাধ্যমে সাহায্য চাও; নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সাথে আছেন।',
        translationEn: 'O you who have believed, seek help through patience and prayer. Indeed, Allah is with the patient.',
        transliterationBn: 'ইয়া আইয়ুহাল্লাযীনা আমানুস তাঈনূ বিস সাবরি ওয়াস সালাহ, ইন্নাল্লাহা মাআস সাবিরীন।',
        themeNoteBn: 'ধৈর্যশীল বান্দার সাথে স্বয়ং আল্লাহর সাহায্য ও সান্নিধ্য।',
        themeNoteEn: 'Allah promises His presence with the patient.'
      },
      {
        id: 'sabr_2',
        surahNumber: 2,
        ayahNumber: 155,
        globalNumber: 162,
        surahNameBn: 'আল-বাকারা',
        surahNameAr: 'البقرة',
        surahNameEn: 'Al-Baqarah',
        arabic: 'وَلَنَبْلُوَنَّكُم بِشَيْءٍ مِّنَ الْخَوْفِ وَالْجُوعِ وَنَقْصٍ مِّنَ الْأَمْوَالِ وَالْأَنفُسِ وَالثَّمَرَاتِ ۗ وَبَشِّرِ الصَّابِرِينَ',
        translationBn: 'আর আমি অবশ্যই তোমাদেরকে পরীক্ষা করব কিছু ভয়, ক্ষুধা এবং ধন-সম্পদ, জীবন ও ফসলের ক্ষয়ক্ষতি দিয়ে। আর ধৈর্যশীলদের সুসংবাদ দাও।',
        translationEn: 'And We will surely test you with something of fear and hunger and loss of wealth, lives and fruits, but give good tidings to the patient.',
        transliterationBn: 'ওয়া লানাবলুওয়ান্নাকুম বিশাইইম মিনাল খাউফি ওয়াল জূই... ওয়া বাশ্‌শিরিস সাবিরীন.',
        themeNoteBn: 'জীবনের দুঃখ-কষ্ট হলো পরীক্ষা, যা সহ্যে জান্নাতের সুসংবাদ মিলে।',
        themeNoteEn: 'Life\'s trials are divine tests designed to elevate the patient.'
      },
      {
        id: 'sabr_3',
        surahNumber: 94,
        ayahNumber: 5,
        globalNumber: 6095,
        surahNameBn: 'আশ-শারহ',
        surahNameAr: 'الشرح',
        surahNameEn: 'Ash-Sharh',
        arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ﴿٥﴾ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
        translationBn: 'অতএব নিশ্চয়ই কষ্টের সাথেই রয়েছে স্বস্তি। নিশ্চয়ই কষ্টের সাথেই রয়েছে স্বস্তি।',
        translationEn: 'For indeed, with hardship will be ease. Indeed, with hardship will be ease.',
        transliterationBn: 'ফা ইন্না মাআল উসরি ইউসরা. ইন্না মাআল উসরি ইউসরা.',
        themeNoteBn: 'প্রতিটি কঠিন পরিস্থিতির পরই দ্বিগুণ স্বস্তি অবধারিত।',
        themeNoteEn: 'Assurance that relief follows every period of difficulty twice over.'
      },
      {
        id: 'sabr_4',
        surahNumber: 39,
        ayahNumber: 10,
        globalNumber: 4068,
        surahNameBn: 'আজ-ঝুমার',
        surahNameAr: 'الزمر',
        surahNameEn: 'Az-Zumar',
        arabic: 'إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ',
        translationBn: 'নিশ্চয়ই ধৈর্যশীলদেরকে তাদের অগণিত হিসাবহীন পুরস্কার পরিপূর্ণভাবে প্রদান করা হবে।',
        translationEn: 'Indeed, the patient will be given their reward without account.',
        transliterationBn: 'ইন্নামা ইউওয়াফফাস সাবিরূনা আজরাহুম বিগায়রি হিসাব.',
        themeNoteBn: 'ধৈর্যশীলদের জন্য বিনা হিসাবে পরকালে অগণিত প্রতিদান।',
        themeNoteEn: 'Unmeasured rewards without accounting for steadfast patience.'
      }
    ]
  },

  // 9. TAWAKKUL
  {
    id: 'tawakkul',
    nameBn: 'তাওয়াক্কুল ও রবের ওপর ভরসা',
    nameEn: 'Tawakkul & Trust in Allah',
    nameAr: 'التوكل على الله',
    icon: '🛡️',
    colorTheme: 'blue',
    badgeBn: 'আত্মার শক্তি',
    badgeEn: 'Reliance',
    descriptionBn: 'একমাত্র আল্লাহর ওপর পূর্ণ ভরসা করা, দুশ্চিন্তা মুক্ত হওয়া ও রবের ওপর তাওয়াক্কুলকারীদের প্রতি ভালোবাসা।',
    descriptionEn: 'Placing absolute reliance upon Allah, overcoming anxiety, and gaining divine guardianship.',
    count: 3,
    ayahs: [
      {
        id: 'tawakkul_1',
        surahNumber: 65,
        ayahNumber: 3,
        globalNumber: 5221,
        surahNameBn: 'আত-ত্বলাক',
        surahNameAr: 'الطلاق',
        surahNameEn: 'At-Talaq',
        arabic: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ',
        translationBn: 'আর যে ব্যক্তি আল্লাহর ওপর ভরসা করে, তার জন্য তিনিই যথেষ্ট। নিশ্চয়ই আল্লাহ তাঁর কাজ চূড়ান্ত পর্যায়ে পৌঁছান।',
        translationEn: 'And whoever relies upon Allah - then He is sufficient for him. Indeed, Allah will accomplish His purpose.',
        transliterationBn: 'ওয়া মাঁই ইয়াতাওয়াক্কাল আলাল্লাহি ফাহুওয়া হাসবুহ, ইন্নাল্লাহা বালিগু আমরিহ...',
        themeNoteBn: 'আল্লাহর ওপর ভরসাকারীর জন্য স্বয়ং রব্বুল আলামিনের অভিভাবকত্বই যথেষ্ট।',
        themeNoteEn: 'Complete sufficiency of Allah for those who trust Him.'
      },
      {
        id: 'tawakkul_2',
        surahNumber: 3,
        ayahNumber: 159,
        globalNumber: 452,
        surahNameBn: 'আলে ইমরান',
        surahNameAr: 'آل عمران',
        surahNameEn: "Ali 'Imran",
        arabic: 'فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ ۚ إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ',
        translationBn: 'তারপর যখন তুমি কোনো সংকল্প করবে, তখন আল্লাহর ওপর ভরসা করো। নিশ্চয়ই আল্লাহ ভরসাকারীদের ভালোবাসেন।',
        translationEn: 'And when you have decided, then rely upon Allah. Indeed, Allah loves those who rely upon Him.',
        transliterationBn: 'ফা ইযা আযামতা ফাতাওয়াক্কাল আলাল্লাহ, ইন্নাল্লাহা ইউহিব্বুল মুতাওয়াক্কিলীন.',
        themeNoteBn: 'সিদ্ধান্তের পর রবের ওপর তাওয়াক্কুল করলে তাঁর ভালোবাসা লাভ হয়।',
        themeNoteEn: 'Divine love awarded to those who combine effort with trust in Allah.'
      },
      {
        id: 'tawakkul_3',
        surahNumber: 9,
        ayahNumber: 51,
        globalNumber: 1286,
        surahNameBn: 'আত-তাওবাহ',
        surahNameAr: 'التوبة',
        surahNameEn: 'At-Tawbah',
        arabic: 'قُل لَّن يُصِيبَنَا إِلَّا مَا كَتَبَ اللَّهُ لَنَا هُوَ مَوْلَانَا ۚ وَعَلَى اللَّهِ فَلْيَتَوَكَّلِ الْمُؤْمِنُونَ',
        translationBn: 'বলো: "আমাদের ওপর কিছুই আপতিত হবে না তা ছাড়া যা আল্লাহ আমাদের কপালে লিখে রেখেছেন। তিনিই আমাদের অভিভাবক; আর আল্লাহর ওপরই যেন মোমিনগণ ভরসা করে।"',
        translationEn: 'Say, "Never will we be struck except by what Allah has decreed for us; He is our protector." And upon Allah let the believers rely.',
        transliterationBn: 'কূল লাঁই ইউসীবানা ইল্লা মা কাতাবাল্লাহু লানা, হুওয়া মাওলানা, ওয়া আলাল্লাহি ফাল ইয়াতাওয়াক্কালিল মু’মিনূন.',
        themeNoteBn: 'তাকদিরে বিশ্বাস ও রবের ফয়সালার ওপর অবিচল তাওয়াক্কুল।',
        themeNoteEn: 'Serene acceptance of Divine decree with unwavering trust.'
      }
    ]
  },

  // 10. TAWBAH
  {
    id: 'tawbah',
    nameBn: 'তওবা, ক্ষমা ও ইস্তিগফার',
    nameEn: 'Tawbah & Forgiveness',
    nameAr: 'التوبة والاستغفار',
    icon: '🤲',
    colorTheme: 'purple',
    badgeBn: 'পাপ মোচন',
    badgeEn: 'Forgiveness',
    descriptionBn: 'ভুল হয়ে গেলে সাথে সাথে তওবা করা, আল্লাহর অসীম রহমত ও তওবায়ে নাসুহার মাধ্যমে গুনাহ মাফের আয়াত।',
    descriptionEn: 'Sincere repentance, seeking Allah\'s infinite mercy, and unburdening the soul from sins.',
    count: 4,
    ayahs: [
      {
        id: 'tawbah_1',
        surahNumber: 39,
        ayahNumber: 53,
        globalNumber: 4111,
        surahNameBn: 'আজ-ঝুমার',
        surahNameAr: 'الزمر',
        surahNameEn: 'Az-Zumar',
        arabic: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا',
        translationBn: 'বলো: "হে আমার বান্দারা! যারা নিজেদের ওপর অন্যায় করেছ, তোমরা আল্লাহর রহমত থেকে নিরাশ হয়ো না। নিশ্চয়ই আল্লাহ সমস্ত গুনাহ ক্ষমা করে দেন। নিশ্চয়ই তিনি পরম ক্ষমাশীল, পরম দয়ালু।"',
        translationEn: 'Say, "O My servants who have transgressed against themselves, do not despair of the mercy of Allah. Indeed, Allah forgives all sins."',
        transliterationBn: 'কূল ইয়া ইবাদিয়াল্লাযীনা আসরাফূ আলা আনফুসিহিম লা তাকনাতূ মির রাহমাতিল্লাহ...',
        themeNoteBn: 'আল্লাহর রহমত থেকে কখনোই নিরাশ না হওয়ার মহা আশার আলো।',
        themeNoteEn: 'Divine assurance that no sin is too great for Allah\'s forgiveness.'
      },
      {
        id: 'tawbah_2',
        surahNumber: 66,
        ayahNumber: 8,
        globalNumber: 5237,
        surahNameBn: 'আত-তাহরীম',
        surahNameAr: 'التحريم',
        surahNameEn: 'At-Tahrim',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا تُوبُوا إِلَى اللَّهِ تَوْبَةً نَّصُوحًا',
        translationBn: 'হে ঈমানদারগণ! তোমরা আল্লাহর কাছে খাঁটি ও আন্তরিক তাওবা (তওবায়ে নাসুহা) করো।',
        translationEn: 'O you who have believed, repent to Allah with sincere repentance.',
        transliterationBn: 'ইয়া আইয়ুহাল্লাযীনা আমানূ তূবূ ইলাল্লাহি তাওবাতান নাসূহা...',
        themeNoteBn: 'অতীতের ভুল শুধরে খাঁটি তওবা করার পবিত্র আদেশ।',
        themeNoteEn: 'Call to offer unblemished sincere repentance.'
      },
      {
        id: 'tawbah_3',
        surahNumber: 3,
        ayahNumber: 135,
        globalNumber: 428,
        surahNameBn: 'আলে ইমরান',
        surahNameAr: 'آل عمران',
        surahNameEn: "Ali 'Imran",
        arabic: 'وَالَّذِينَ إِذَا فَعَلُوا فَاحِشَةً أَوْ ظَلَمُوا أَنفُسَهُمْ ذَكَرُوا اللَّهَ فَاسْتَغْفَرُوا لِذُنُوبِهِمْ',
        translationBn: 'আর যারা কোনো অশ্লীল কাজ করে ফেললে কিংবা নিজেদের ওপর জুলুম করলে সাথে সাথে আল্লাহকে স্মরণ করে এবং নিজেদের গুনাহের জন্য ক্ষমা প্রার্থনা করে।',
        translationEn: 'And those who, when they commit an immorality or wrong themselves, remember Allah and seek forgiveness for their sins.',
        transliterationBn: 'ওয়াল্লাযীনা ইযা ফাআলূ ফাহি শাতান আও জালামূ আনফুসাহুম যাকারুল্লাহা ফাস তাগফারূ...',
        themeNoteBn: 'ভুল হওয়া মাত্রই বিলম্ব না করে ইস্তিগফার করার অভ্যাস।',
        themeNoteEn: 'Prompt remembrance and seeking pardon immediately upon error.'
      },
      {
        id: 'tawbah_4',
        surahNumber: 11,
        ayahNumber: 3,
        globalNumber: 1476,
        surahNameBn: 'হূদ',
        surahNameAr: 'هود',
        surahNameEn: 'Hud',
        arabic: 'وَأَنِ اسْتَغْفِرُوا رَبَّكُمْ ثُمَّ تُوبُوا إِلَيْهِ يُمَتِّعْكُم مَّتَاعًا حَسَنًا إِلَىٰ أَجَلٍ مُّسَمًّى',
        translationBn: 'আর তোমরা তোমাদের রবের কাছে ক্ষমা প্রার্থনা করো এবং তাঁর দিকেই তওবা করে ফিরে এসো, তিনি তোমাদেরকে নির্দিষ্ট সময় পর্যন্ত উত্তম জীবনোপকরণ দান করবেন।',
        translationEn: 'And [saying], "Seek forgiveness of your Lord and repent to Him, He will let you enjoy a good provision for a specified term."',
        transliterationBn: 'ওয়া আনিস তাগফিরূ রাব্বাকুম ছুম্মা তূবূ ইলাইহি ইউমাত্তি’কুম মাতাআন হাসানা...',
        themeNoteBn: 'ইস্তিগফারের বরকতে দুনিয়াতে সুখময় ও উন্নত জীবনের লাভ।',
        themeNoteEn: 'Asking forgiveness yields wholesome life and prosperity in this world.'
      }
    ]
  },

  // 11. DUA
  {
    id: 'dua',
    nameBn: 'কুরআনের দোয়া ও মুনাজাত',
    nameEn: 'Quranic Duas & Supplications',
    nameAr: 'دعاء القرآن والرجاء',
    icon: '🤲',
    colorTheme: 'amber',
    badgeBn: 'কবুল হওয়া দোয়া',
    badgeEn: 'Quranic Duas',
    descriptionBn: 'আল্লাহর কাছে চাওয়ার ক্ষমতা, রব্বানা দোয়াসমূহ ও রবের অতি নিকটবর্তী থাকার পরম প্রতিশ্রুতি।',
    descriptionEn: 'Renowned Quranic prayers, Rabbana supplications, and divine closeness to the supplicant.',
    count: 4,
    ayahs: [
      {
        id: 'dua_1',
        surahNumber: 40,
        ayahNumber: 60,
        globalNumber: 4223,
        surahNameBn: 'গাফির / আল-মু’মিন',
        surahNameAr: 'غافر',
        surahNameEn: 'Ghafir',
        arabic: 'وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ',
        translationBn: 'আর তোমাদের রব বলেছেন: "তোমরা আমাকে ডাকো, আমি তোমাদের ডাকে সাড়া দেব।"',
        translationEn: 'And your Lord says, "Call upon Me; I will respond to you."',
        transliterationBn: 'ওয়া কালা রাব্বুকুমুদ ঊনী আসতাজিব লাকুম...',
        themeNoteBn: 'দোয়া করলেই রব সাড়া দেওয়ার সরাসরি ওয়াদা দিয়েছেন।',
        themeNoteEn: 'Divine promise that every sincere call is answered.'
      },
      {
        id: 'dua_2',
        surahNumber: 2,
        ayahNumber: 186,
        globalNumber: 193,
        surahNameBn: 'আল-বাকারা',
        surahNameAr: 'البقرة',
        surahNameEn: 'Al-Baqarah',
        arabic: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ',
        translationBn: 'আর যখন আমার বান্দারা আমার সম্পর্কে তোমাকে জিজ্ঞাসা করে, নিশ্চয়ই আমি অতি নিকটে। আহ্বানকারী যখন আমাকে আহ্বান করে, আমি তার আহ্বানে সাড়া দেই।',
        translationEn: 'And when My servants ask you concerning Me - indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.',
        transliterationBn: 'ওয়া ইযা সাআলাকা ইবাদী আন্নী ফায় ইন্নী ক্বারীইব, উজীবু দাওওয়াতাদ দাঈ ইযা দাওয়ান...',
        themeNoteBn: 'দুআকারীর ডাক শোনার জন্য আল্লাহ তায়ালা অতি নিকটে থাকেন।',
        themeNoteEn: 'Nearness of Almighty Allah to those who pray.'
      },
      {
        id: 'dua_3',
        surahNumber: 2,
        ayahNumber: 201,
        globalNumber: 208,
        surahNameBn: 'আল-বাকারা',
        surahNameAr: 'البقرة',
        surahNameEn: 'Al-Baqarah',
        arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
        translationBn: 'হে আমাদের রব! আমাদের দুনিয়াতেও কল্যাণ দান করুন এবং আখেরাতেও কল্যাণ দান করুন এবং আমাদের জাহান্নামের আজাব থেকে রক্ষা করুন।',
        translationEn: 'Our Lord, give us in this world [that which is] good and in the Hereafter [that which is] good and protect us from the punishment of the Fire.',
        transliterationBn: 'রাব্বানা আতিনা ফিদ্দুনইয়া হাসানাতাও ওয়া ফিল আখিরাতি হাসানাতাও ওয়া কিনা আযাবান নার.',
        themeNoteBn: 'দুনিয়া ও আখেরাতের সার্বিক কল্যাণের সর্বশ্রেষ্ঠ সুপ্রসিদ্ধ কুরআনি দোয়া।',
        themeNoteEn: 'The most comprehensive prayer for worldly and eternal success.'
      },
      {
        id: 'dua_4',
        surahNumber: 2,
        ayahNumber: 286,
        globalNumber: 293,
        surahNameBn: 'আল-বাকারা',
        surahNameAr: 'البقرة',
        surahNameEn: 'Al-Baqarah',
        arabic: 'رَبَّنَا لَا تُؤَاخِذْنَا إِن نَّسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِن قَبْلِنَا',
        translationBn: 'হে আমাদের রব! যদি আমরা ভুলে যাই কিংবা ভুল করে বসি, তবে আমাদের পাকড়াও করবেন না। হে আমাদের রব! আমাদের ওপর কঠিন বোঝা চাপাবেন না।',
        translationEn: 'Our Lord, do not impose blame upon us if we have forgotten or erred. Our Lord, and lay not upon us a burden like that which You laid on those before us.',
        transliterationBn: 'রাব্বানা লা তুআখিযনা ইন নাসীনা আও আখতানা, রাব্বানা ওয়া লা তাহমিল আলাইনা ইসরান...',
        themeNoteBn: 'ক্ষমা ও ভুলভ্রান্তি মার্জনার শেষ আল-বাকারার মোনাজাত।',
        themeNoteEn: 'Surah Al-Baqarah\'s final plea for mercy and ease.'
      }
    ]
  },

  // 12. PARENTS
  {
    id: 'parents',
    nameBn: 'পিতামাতা ও মা-বাবার সেবা',
    nameEn: 'Parents & Dutifulness',
    nameAr: 'الوالدان وبرهما',
    icon: '👨‍👩‍👧‍👦',
    colorTheme: 'emerald',
    badgeBn: 'জান্নাতের মাধ্যম',
    badgeEn: 'Honor to Parents',
    descriptionBn: 'মা-বাবার সাথে সর্বোচ্চ সদাচরণ, বার্ধক্যে "উফ" না বলা, মায়ের কষ্টের প্রতি কৃতজ্ঞতা ও মা-বাবার জন্য দোয়া।',
    descriptionEn: 'Absolute dutifulness to parents, honor in old age, recognizing mothers\' sacrifices, and praying for them.',
    count: 3,
    ayahs: [
      {
        id: 'parents_1',
        surahNumber: 17,
        ayahNumber: 23,
        globalNumber: 2052,
        surahNameBn: 'আল-ইসরা',
        surahNameAr: 'الإسراء',
        surahNameEn: 'Al-Isra',
        arabic: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا ۚ إِمَّا يَبْلُغَنَّ عِندَكَ الْكِبَرَ أَحَدُهُمَا أَوْ كِلَاهُمَا فَلَا تَقُل لَّهُمَا أُفٍّ',
        translationBn: 'আর তোমার রব আদেশ দিয়েছেন যে, তোমরা তাঁকে ছাড়া অন্য কারো ইবাদত করবে না এবং পিতামাতার সাথে সদাচরণ করবে। বার্ধক্যে পৌঁছালে তাদেরকে "উফ" পর্যন্ত বলো না...',
        translationEn: 'And your Lord has decreed that you not worship except Him, and to parents, good treatment. Whether one or both of them reach old age, say not "uff"...',
        transliterationBn: 'ওয়া কাদা রাব্বুকা আল্লা তাবুদূ ইল্লা ইয়্যাহু ওয়া বিল ওয়ালিদাইনি এহসানা...',
        themeNoteBn: 'তাওহীদের পরেই পিতামাতার অধিকার ও তাদের সাথে সর্বোচ্চ নম্র আচরণ।',
        themeNoteEn: 'Command to honor parents immediately following belief in One God.'
      },
      {
        id: 'parents_2',
        surahNumber: 31,
        ayahNumber: 14,
        globalNumber: 3487,
        surahNameBn: 'লুকমান',
        surahNameAr: 'لقمان',
        surahNameEn: 'Luqman',
        arabic: 'وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ حَمَلَتْهُ أُمُّهُ وَهْنًا عَلَىٰ وَهْنٍ وَفِصَالُهُ فِي عَامَيْنِ أَنِ اشْكُرْ لِي وَلِوَالِدَيْكَ',
        translationBn: 'আর আমি মানুষকে তার পিতামাতার ব্যাপারে নির্দেশ দিয়েছি। তার মা কষ্টের ওপর কষ্ট সহ্য করে তাকে গর্ভে ধারণ করেছেন। সুতরাং আমার ও তোমার পিতামাতার শুকরিয়া আদায় করো।',
        translationEn: 'And We have enjoined upon man for his parents. His mother carried him, in weakness upon weakness... Be grateful to Me and to your parents.',
        transliterationBn: 'ওয়া ওয়াসসাইনাল ইনসানা বিওয়ালিদাইহি হামালাতহু উম্মুহু ওয়াহনান আলা ওয়াহনিও...',
        themeNoteBn: 'গর্ভধারণের ত্যাগের দরুন মায়ের বিশেষ সম্মান ও কৃতজ্ঞতা।',
        themeNoteEn: 'Deep recognition of mother\'s hardship during childbearing.'
      },
      {
        id: 'parents_3',
        surahNumber: 17,
        ayahNumber: 24,
        globalNumber: 2053,
        surahNameBn: 'আল-ইসরা',
        surahNameAr: 'الإسراء',
        surahNameEn: 'Al-Isra',
        arabic: 'وَاخْفِضْ لَهُمَا جَنَاحَ الذُّلِّ مِنَ الرَّحْمَةِ وَقُل رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
        translationBn: 'আর অনুকম্পায় তাদের সামনে বিনয়ের ডানা অবনমিত করো এবং বলো: "হে আমার রব! তাদের প্রতি দয়া করুন যেভাবে শৈশবে তারা আমাকে লালন-পালন করেছেন।"',
        translationEn: 'And lower to them the wing of humility out of mercy and say, "My Lord, have mercy upon them as they brought me up when I was small."',
        transliterationBn: 'ওয়াখফিদ লাহুমা জানাহায যুল্লি মিনার রাহমাতি ওয়া কুর রাব্বির হামহুমা কামা রাব্বায়ানী সাগীরা.',
        themeNoteBn: 'পিতামাতার জন্য সর্বকালের সেরা হৃদয়স্পর্শী দোয়া: "রাব্বির হামহুমা..."।',
        themeNoteEn: 'The iconic prayer for deceased or living parents.'
      }
    ]
  },

  // 13. FAMILY
  {
    id: 'family',
    nameBn: 'পরিবার, বিবাহ ও সামাজিক জীবন',
    nameEn: 'Marriage, Family & Society',
    nameAr: 'الأسرة والمودة',
    icon: '💍',
    colorTheme: 'indigo',
    badgeBn: 'পারিবারিক বন্ধন',
    badgeEn: 'Family Harmony',
    descriptionBn: 'দাম্পত্য ভালোবাসার নিদর্শন, প্রশান্তিময় পরিবার গঠন, নেক সন্তান অর্জন ও স্বজনদের অধিকার রক্ষার আয়াত।',
    descriptionEn: 'Divine affection between spouses, family bonds, raising righteous offspring, and social warmth.',
    count: 3,
    ayahs: [
      {
        id: 'family_1',
        surahNumber: 30,
        ayahNumber: 21,
        globalNumber: 3430,
        surahNameBn: 'আর-রূম',
        surahNameAr: 'الروم',
        surahNameEn: 'Ar-Rum',
        arabic: 'وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً',
        translationBn: 'আর তাঁর নিদর্শনাবলীর মধ্যে রয়েছে যে, তিনি তোমাদের জন্য তোমাদের মধ্য থেকেই সহধর্মিণী সৃষ্টি করেছেন যাতে তোমরা তাদের কাছে প্রশান্তি পাও এবং তোমাদের মাঝে সৃষ্টি করেছেন ভালোবাসা ও দয়া।',
        translationEn: 'And of His signs is that He created for you from yourselves mates that you may find tranquility in them; and He placed between you affection and mercy.',
        transliterationBn: 'ওয়া মিন আয়াতীহী আন খালাকা লাকুম মিন আনফুসিকুম আযওয়াজাল লিতাসকুনূ ইলাইহা ওয়া জাআলা বাইনাকুম মাওয়াদ্দাতাও ওয়া রাহমাহ...',
        themeNoteBn: 'বিবাহ ও দাম্পত্য জীবনের মূল ভিত্তি: ভালোবাসা, দয়া ও প্রশান্তি।',
        themeNoteEn: 'Divine placement of affection, mercy, and peace in marriage.'
      },
      {
        id: 'family_2',
        surahNumber: 25,
        ayahNumber: 74,
        globalNumber: 2929,
        surahNameBn: 'আল-ফুরকান',
        surahNameAr: 'الفرقان',
        surahNameEn: 'Al-Furqan',
        arabic: 'وَالَّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ',
        translationBn: 'আর যারা বলে: "হে আমাদের রব! আমাদের জন্য এমন সহধর্মিণী ও সন্তানসন্ততি দান করুন যারা আমাদের চোখ জুড়িয়ে দেয় এবং আমাদের মুত্তাকিদের জন্য অনুসরণযোগ্য নেতা বানিয়ে দিন।"',
        translationEn: 'And those who say, "Our Lord, grant us from among our wives and offspring comfort to our eyes..."',
        transliterationBn: 'ওয়াল্লাযীনা ইয়াকূলূনা রাব্বানা হাব লানা মিন আযওয়াজিনা ওয়া যুররিয়্যাতিনা কুররাতা আ’ইয়ুন...',
        themeNoteBn: 'চোখ জুড়ানো ধার্মিক সন্তান ও প্রশান্তিময় পরিবারের দোয়া।',
        themeNoteEn: 'Prayer for comforting family bonds and righteous progeny.'
      },
      {
        id: 'family_3',
        surahNumber: 66,
        ayahNumber: 6,
        globalNumber: 5235,
        surahNameBn: 'আত-তাহরীম',
        surahNameAr: 'التحريم',
        surahNameEn: 'At-Tahrim',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا',
        translationBn: 'হে ঈমানদারগণ! তোমরা নিজেদেরকে এবং তোমাদের পরিবার-পরিজনকে রক্ষা করো জাহান্নামের আগুন থেকে।',
        translationEn: 'O you who have believed, protect yourselves and your families from a Fire...',
        transliterationBn: 'ইয়া আইয়ুহাল্লাযীনা আমানূ কূ আনফুসাকুম ওয়া আহলীকুম নারা...',
        themeNoteBn: 'পরিবারকে দ্বীনি শিক্ষায় গড়ে তোলার অভিভাবকত্ব।',
        themeNoteEn: 'Responsibility of guiding family towards righteousness.'
      }
    ]
  },

  // 14. ZAKAT
  {
    id: 'zakat',
    nameBn: 'জাকাত, ইনফাক ও দান',
    nameEn: 'Zakat & Charitable Giving',
    nameAr: 'الزكاة والإنفاق',
    icon: '💰',
    colorTheme: 'amber',
    badgeBn: 'সম্পদ পবিত্রকরণ',
    badgeEn: 'Charity',
    descriptionBn: 'আল্লাহর ওয়াস্তে দান (ইনফাক), জাকাত বণ্টন, অগণিত প্রতিদান ও সুদের বিরুদ্ধে অর্থনৈতিক বারাকাহ।',
    descriptionEn: 'Spending in Allah\'s cause, Zakat avenues, 700-fold multiplier for charity, and purifying wealth.',
    count: 3,
    ayahs: [
      {
        id: 'zakat_1',
        surahNumber: 2,
        ayahNumber: 261,
        globalNumber: 268,
        surahNameBn: 'আল-বাকারা',
        surahNameAr: 'البقرة',
        surahNameEn: 'Al-Baqarah',
        arabic: 'مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنْبُلَةٍ مِّائَةُ حَبَّةٍ',
        translationBn: 'যারা আল্লাহর পথে তাদের ধন-সম্পদ ব্যয় করে, তাদের উপমা হলো একটি শস্যবীজের মতো, যা থেকে সাতটি শীষ গজায় এবং প্রতিটি শীষে থাকে ১০০টি শস্যদানা।',
        translationEn: 'The example of those who spend their wealth in the way of Allah is like a seed which grows seven spikes; in each spike is 100 grains.',
        transliterationBn: 'মাছালুল্লাযীনা ইউনফিকূনা আমওয়ালাহুম ফী সাবীলিল্লাহি কামাছালি হাব্বাতিন আমবাতাত সাবআ সানাবিলা...',
        themeNoteBn: 'আল্লাহর রাস্তায় ১ টাকা দানে ৭০০ গুণ পর্যন্ত সওয়াব বৃদ্ধির অসামান্য রূপক।',
        themeNoteEn: 'Visual metaphor of 700-fold returns for sincere charity.'
      },
      {
        id: 'zakat_2',
        surahNumber: 2,
        ayahNumber: 274,
        globalNumber: 281,
        surahNameBn: 'আল-বাকারা',
        surahNameAr: 'البقرة',
        surahNameEn: 'Al-Baqarah',
        arabic: 'الَّذِينَ يُنفِقُونَ أَمْوَالَهُم بِاللَّيْلِ وَالنَّهَارِ سِرًّا وَعَلَانِيَةً فَلَهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ',
        translationBn: 'যারা রাতে ও দিনে, গোপনে ও প্রকাশ্যে তাদের ধন-সম্পদ ব্যয় করে, তাদের জন্য রবের কাছে রয়েছে বিশেষ পুরস্কার। আর তাদের কোনো ভয় বা চিন্তা নেই।',
        translationEn: 'Those who spend their wealth by night and by day, secretly and publicly - they will have their reward with their Lord.',
        transliterationBn: 'আল্লাযীনা ইউনফিকূনা আমওয়ালাহুম বিললাইলি ওয়ান নাহারি সিররাও ওয়া আলানিয়াতান...',
        themeNoteBn: 'দানশীল বান্দাদের জন্য পরকালে দুশ্চিন্তামুক্ত জীবনের নিশ্চয়তা।',
        themeNoteEn: 'Freedom from sorrow guaranteed for benevolent givers.'
      },
      {
        id: 'zakat_3',
        surahNumber: 9,
        ayahNumber: 60,
        globalNumber: 1295,
        surahNameBn: 'আত-তাওবাহ',
        surahNameAr: 'التوبة',
        surahNameEn: 'At-Tawbah',
        arabic: 'إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ',
        translationBn: 'জাকাত কেবল ফকির, মিসকিন, জাকাত আদায়কারী কর্মচারী, মন জয় করার জন্য, দাসমুক্তিতে, ঋণগ্রস্তদের, আল্লাহর পথে ও মুসাফিরদের জন্য সুনির্দিষ্ট।',
        translationEn: 'Zakat expenditures are only for the poor and for the needy and for those employed to collect zakat and for bringing hearts together...',
        transliterationBn: 'ইন্নামাস সাদাকাতু লিলফুকরা-ই ওয়াল মাসাকীনি ওয়াল আমিলীনা আলাইহা...',
        themeNoteBn: 'পবিত্র কুরআনে নির্ধারিত ৮টি জাকাত বণ্টনের খাত।',
        themeNoteEn: 'The 8 divine categories for mandatory Zakat expenditure.'
      }
    ]
  },

  // 15. JUSTICE
  {
    id: 'justice',
    nameBn: 'ইনসাফ ও ন্যায়বিচার',
    nameEn: 'Justice & Fairness',
    nameAr: 'العدل والقسط',
    icon: '⚖️',
    colorTheme: 'cyan',
    badgeBn: 'সামাজিক ইনসাফ',
    badgeEn: 'Absolute Justice',
    descriptionBn: 'নিজের বা আত্মীয়ের বিরুদ্ধে গেলেও সততা ও ন্যায়বিচার বজায় রাখা, শত্রুর সাথেও ইনসাফ করার আদেশ।',
    descriptionEn: 'Absolute fairness in testimony, upholding justice even against oneself or relatives.',
    count: 2,
    ayahs: [
      {
        id: 'justice_1',
        surahNumber: 4,
        ayahNumber: 135,
        globalNumber: 628,
        surahNameBn: 'আন-নিসা',
        surahNameAr: 'النساء',
        surahNameEn: 'An-Nisa',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ بِالْقِسْطِ شُهَدَاءَ لِلَّهِ وَلَوْ عَلَىٰ أَنفُسِكُمْ أَوِ الْوَالِدَيْنِ وَالْأَقْرَبِينَ',
        translationBn: 'হে ঈমানদারগণ! তোমরা ইনসাফ ও ন্যায়বিচারে সুদৃঢ় প্রতিষ্ঠিত থাকো, আল্লাহর জন্য সাক্ষ্যদাতা হিসেবে; যদিও তা তোমাদের নিজেদের কিংবা পিতামাতা ও আত্মীয়দের বিরুদ্ধে যায়।',
        translationEn: 'O you who have believed, be persistently standing firm in justice, witnesses for Allah, even if it be against yourselves or parents and relatives.',
        transliterationBn: 'ইয়া আইয়ুহাল্লাযীনা আমানূ কূনূ কাউওয়ামীনা বিলকিসতি শুহাদা-আ লিল্লাহি ওয়া লাউ আলা আনফুসিকুম...',
        themeNoteBn: 'নিজের বা আত্মীয়ের বিরুদ্ধে গেলেও সত্য ও ইনসাফ প্রতিষ্ঠার চূড়ান্ত আদেশ।',
        themeNoteEn: 'Unwavering obligation to uphold justice regardless of blood ties.'
      },
      {
        id: 'justice_2',
        surahNumber: 5,
        ayahNumber: 8,
        globalNumber: 677,
        surahNameBn: 'আল-মায়েদাহ',
        surahNameAr: 'المائدة',
        surahNameEn: 'Al-Ma\'idah',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ لِلَّهِ شُهَدَاءَ بِالْقِسْطِ ۖ وَلَا يَجْرِمَنَّكُمْ شَنَآنُ قَوْمٍ عَلَىٰ أَلَّا تَعْدِلُوا ۚ اعْدِلُوا هُوَ أَقْرَبُ لِلتَّقْوَىٰ',
        translationBn: 'হে ঈমানদারগণ! তোমরা ইনসাফে প্রতিষ্ঠিত থাকো। আর কোনো সম্প্রদায়ের শত্রুতা যেন তোমাদেরকে ন্যায়বিচার পরিহারে বাধ্য না করে। তোমরা ইনসাফ করো, এটাই তাকওয়ার নিকটতর।',
        translationEn: 'Be persistently standing firm for Allah, witnesses in justice, and do not let the hatred of a people prevent you from being just. Be just; that is nearer to righteousness.',
        transliterationBn: 'ইয়া আইয়ুহাল্লাযীনা আমানূ কূনূ কাউওয়ামীনা লিল্লাহি শুহাদা-আ বিলকিসতি...',
        themeNoteBn: 'শত্রুর সাথেও ন্যায়বিচার করাই প্রকৃত তাকওয়ার চিহ্ন।',
        themeNoteEn: 'Fairness towards enemies as the pinnacle of Taqwa.'
      }
    ]
  },

  // 16. IMAN
  {
    id: 'iman',
    nameBn: 'ঈমান, তাওহীদ ও আখেরাত',
    nameEn: 'Iman, Tawheed & Faith',
    nameAr: 'الإيمان والتوحيد',
    icon: '✨',
    colorTheme: 'purple',
    badgeBn: 'আকিদা ও বিশ্বাস',
    badgeEn: 'Pure Monotheism',
    descriptionBn: 'আল্লাহর একত্ববাদ (তাওহীদ), সূরা ইখলাস, আয়াতুল কুরসি ও পরকালের পুনরুত্থানের বিশ্বাস।',
    descriptionEn: 'Pure Islamic monotheism, Ayatul Kursi, Sura Ikhlas, and certainty of the Day of Judgment.',
    count: 3,
    ayahs: [
      {
        id: 'iman_1',
        surahNumber: 112,
        ayahNumber: 1,
        globalNumber: 6222,
        surahNameBn: 'আল-ইখলাস',
        surahNameAr: 'الإخلاص',
        surahNameEn: 'Al-Ikhlas',
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        translationBn: 'বলো: "তিনি আল্লাহ, এক-অদ্বিতীয়। আল্লাহ অমুখাপেক্ষী। তিনি কাউকে জন্ম দেননি এবং তাঁকেও জন্ম দেওয়া হয়নি। আর তাঁর সমতুল্য কেউই নেই।"' ,
        translationEn: 'Say, "He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent."',
        transliterationBn: 'কূল হুওয়াল্লাহু আহাদ. আল্লাহুস সামাদ. লাম ইয়ালিদ ওয়া লাম ইউলাদ. ওয়া লাম ইয়াকুল লাহূ কুফুওয়ান আহাদ.',
        themeNoteBn: 'তাওহীদের সবচেয়ে বিশুদ্ধ সার্বজনীন সারসংক্ষেপ।',
        themeNoteEn: 'The absolute declaration of Monotheism.'
      },
      {
        id: 'iman_2',
        surahNumber: 2,
        ayahNumber: 255,
        globalNumber: 262,
        surahNameBn: 'আল-বাকারা',
        surahNameAr: 'البقرة',
        surahNameEn: 'Al-Baqarah',
        arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ',
        translationBn: 'আল্লাহ! তিনি ছাড়া কোনো সত্য মাবুদ নেই। তিনি চিরঞ্জীব, সর্বসত্তার ধারক। তাঁকে তন্দ্রা বা নিদ্রা স্পর্শ করে না।',
        translationEn: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep.',
        transliterationBn: 'আল্লাহু লা ইলাহা ইল্লা হুওয়াল হাইয়্যুল কাইয়্যূম, লা তা’খুযুহূ সিনাতুঁও ওয়া লা নাউম...',
        themeNoteBn: 'কুরআনের সর্বশ্রেষ্ঠ আয়াত ‘আয়াতুল কুরসি’—আল্লাহর মহাসম্রাটত্ব।',
        themeNoteEn: 'Ayatul Kursi: The supreme verse of the Quran.'
      },
      {
        id: 'iman_3',
        surahNumber: 50,
        ayahNumber: 16,
        globalNumber: 4646,
        surahNameBn: 'কাফ',
        surahNameAr: 'ق',
        surahNameEn: 'Qaf',
        arabic: 'وَلَقَدْ خَلَقْنَا الْإِنسَانَ وَنَعْلَمُ مَا تُوَسْوِسُ بِهِ نَفْسُهُ ۖ وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ',
        translationBn: 'আর নিশ্চয়ই আমি মানুষকে সৃষ্টি করেছি এবং তার মন যা কুমন্ত্রণা দেয় তাও আমি জানি; আর আমি তার শাহরগ অপেক্ষা অধিক নিকটবর্তী।',
        translationEn: 'We created man and know what his soul whispers to him, and We are closer to him than his jugular vein.',
        transliterationBn: 'ওয়া লাকাদ খালাকনাল ইনসানা ওয়া নালামু মা তুওয়াসউইসু বিহী নাফসুহ...',
        themeNoteBn: 'আল্লাহ বান্দার শাহরগের চেয়েও অতি নিকটবর্তী।',
        themeNoteEn: 'Divine nearness closer than the jugular vein.'
      }
    ]
  },

  // 17. KNOWLEDGE
  {
    id: 'knowledge',
    nameBn: 'ইলম, জ্ঞান ও শিক্ষা',
    nameEn: 'Knowledge & Seeking Wisdom',
    nameAr: 'العلم والحكمة',
    icon: '📖',
    colorTheme: 'blue',
    badgeBn: 'নূরের আলো',
    badgeEn: 'Seeking Knowledge',
    descriptionBn: 'প্রথম ওহি "ইকরা", জ্ঞান অর্জনের অসীম মর্যাদা, রাব্বি যিদনি ইলমা ও জ্ঞানীদের উচ্চমর্যাদা।',
    descriptionEn: 'The first revelation "Iqra", seeking wisdom, Rabbee Zidnee \'Ilma, and honor of scholars.',
    count: 3,
    ayahs: [
      {
        id: 'knowledge_1',
        surahNumber: 96,
        ayahNumber: 1,
        globalNumber: 6106,
        surahNameBn: 'আল-আলাক',
        surahNameAr: 'العلق',
        surahNameEn: 'Al-\'Alaq',
        arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ﴿١﴾ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ ﴿٢﴾ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ ﴿٣﴾ الَّذِي عَلَّمَ بِالْقَلَمِ',
        translationBn: 'পাঠ করো তোমার রবের নামে যিনি সৃষ্টি করেছেন! তিনি মানুষকে সৃষ্টি করেছেন জমাট রক্তপিণ্ড থেকে। পাঠ করো! আর তোমার রব মহামহিম, যিনি কলমের সাহায্যে শিক্ষা দিয়েছেন।',
        translationEn: 'Recite in the name of your Lord who created - Created man from a clinging substance. Recite, and your Lord is Most Generous - Who taught by the pen.',
        transliterationBn: 'ইকরা বিসমি রাব্বিকাল লাযী খালাক. খালাকাল ইনসানা মিন আলাক. ইকরা ওয়া রাব্বুকাল আকরাম...',
        themeNoteBn: 'পবিত্র কুরআনের সর্বপ্রথম অবতীর্ণ ওহি—পড়াশোনা ও কলমের সাহায্যে জ্ঞানার্জনের শুভ সূচনা।',
        themeNoteEn: 'The very first revelation enshrining reading and pen.'
      },
      {
        id: 'knowledge_2',
        surahNumber: 20,
        ayahNumber: 114,
        globalNumber: 2462,
        surahNameBn: 'ত্বাহা',
        surahNameAr: 'طه',
        surahNameEn: 'Taha',
        arabic: 'وَقُل رَّبِّ زِدْنِي عِلْمًا',
        translationBn: 'আর বলো: "হে আমার রব! আমার জ্ঞান বৃদ্ধি করে দিন।"',
        translationEn: 'And say, "My Lord, increase me in knowledge."',
        transliterationBn: 'ওয়া কুর রাব্বি যি্দনী ইলমা.',
        themeNoteBn: 'জ্ঞান বৃদ্ধির জন্য পবিত্র কুরআনে শেখানো নবীজি (সা.)-এর অতি প্রিয় দোয়া।',
        themeNoteEn: 'Iconic Quranic prayer for expanding knowledge.'
      },
      {
        id: 'knowledge_3',
        surahNumber: 39,
        ayahNumber: 9,
        globalNumber: 4067,
        surahNameBn: 'আজ-ঝুমার',
        surahNameAr: 'الزمر',
        surahNameEn: 'Az-Zumar',
        arabic: 'قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ',
        translationBn: 'বলো: "যাঁরা জানে আর যারা জানে না তারা কি সমান হতে পারে?" কেবল বিবেকবানেরাই উপদেশ গ্রহণ করে।',
        translationEn: 'Say, "Are those who know equal to those who do not know?" Only people of understanding remember.',
        transliterationBn: 'কূল হাল ইয়াস্তাবিল্লাযীনা ইয়ালামূনা ওয়াল্লাযীনা লা ইয়ালামূন...',
        themeNoteBn: 'জ্ঞানী ও অজ্ঞদের মাঝে আকাশ-পাতাল ব্যবধানের বাস্তবতা।',
        themeNoteEn: 'Incomparable distinction between scholars and the unlettered.'
      }
    ]
  },

  // 18. RIZQ
  {
    id: 'rizq',
    nameBn: 'রিজিক, বারাকাহ ও জীবিকা',
    nameEn: 'Rizq & Provisions',
    nameAr: 'الرزق والبركة',
    icon: '🌾',
    colorTheme: 'teal',
    badgeBn: 'আল্লাহর জামানত',
    badgeEn: 'Provisions',
    descriptionBn: 'পৃথিবীর সকল সৃষ্টির রিজিকের দৈব দায়িত্ব, ধারণাাতীত উৎস থেকে রিজিক লাভ ও শুকরিয়ার বারাকাহ।',
    descriptionEn: 'Divine assurance of provisions for every living creature, unexpected sources of Rizq, and gratitude.',
    count: 3,
    ayahs: [
      {
        id: 'rizq_1',
        surahNumber: 11,
        ayahNumber: 6,
        globalNumber: 1479,
        surahNameBn: 'হূদ',
        surahNameAr: 'هود',
        surahNameEn: 'Hud',
        arabic: 'وَمَا مِن دَابَّةٍ فِي الْأَرْضِ إِلَّا عَلَى اللَّهِ رِزْقُهَا',
        translationBn: 'আর ভূপৃষ্ঠে বিচরণকারী এমন কোনো প্রাণী নেই যার রিজিকের দায়িত্ব আল্লাহর ওপর নেই।',
        translationEn: 'And there is no creature on earth but that upon Allah is its provision.',
        transliterationBn: 'ওয়া মা মিন দাব্বাতি ফিল আরদি ইল্লা আলাল্লাহি রিজকুহা...',
        themeNoteBn: 'জগতের সকল পশুপাখি ও মানুষের রিজিকের দায়িত্ব স্বয়ং রবের।',
        themeNoteEn: 'Universal divine guarantee of sustenance for all creatures.'
      },
      {
        id: 'rizq_2',
        surahNumber: 65,
        ayahNumber: 2,
        globalNumber: 5220,
        surahNameBn: 'াত-ত্বলাক',
        surahNameAr: 'الطلاق',
        surahNameEn: 'At-Talaq',
        arabic: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ﴿٢﴾ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ',
        translationBn: 'আর যে ব্যক্তি আল্লাহকে ভয় করে (তাকওয়া অবলম্বন করে), তিনি তার জন্য বের হওয়ার পথ বানিয়ে দেন এবং তাকে ধারণাতীত উৎস থেকে রিজিক দান করেন।',
        translationEn: 'And whoever fears Allah - He will make for him a way out, And will provide for him from where he does not expect.',
        transliterationBn: 'ওয়া মাঁই ইয়াত্তাকিল্লাহা ইয়াজআল লাহূ মাখরাজা. ওয়া ইয়ারযুকহু মিন হাইছু লা এ্যাহতাসিব.',
        themeNoteBn: 'তাকওয়া অবলম্বনের অছিলায় ধারণাতীত জায়গা থেকে রিজিকের সংস্থান।',
        themeNoteEn: 'Unexpected sustenance reserved for God-fearing souls.'
      },
      {
        id: 'rizq_3',
        surahNumber: 14,
        ayahNumber: 7,
        globalNumber: 1757,
        surahNameBn: 'ইব্রাহিম',
        surahNameAr: 'إبراهيم',
        surahNameEn: 'Ibrahim',
        arabic: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِي لَشَدِيدٌ',
        translationBn: 'যদি তোমরা শুকরিয়া আদায় করো, তবে আমি অবশ্যই তোমাদের নেয়ামত বাড়িয়ে দেব; আর যদি অকৃতজ্ঞ হও, তবে আমার আজাব বড়ই কঠিন।',
        translationEn: 'If you are grateful, I will surely increase you in favor; but if you deny, indeed, My punishment is severe.',
        transliterationBn: 'লাইন শাকারቱም লাআযীদান্নাকুম ওয়া লাইন কাফারቱም ইন্না আযাবী লাশাদীদ.',
        themeNoteBn: 'শুকরিয়া আদায়ের দরুন রিজিক ও নেয়ামত বহুগুণ বৃদ্ধি পায়।',
        themeNoteEn: 'Gratitude guarantees the expansion of divine bounties.'
      }
    ]
  }
];
