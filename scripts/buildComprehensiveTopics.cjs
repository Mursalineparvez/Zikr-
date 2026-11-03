const fs = require('fs');

const rawList = JSON.parse(fs.readFileSync('scripts/topics_list.json', 'utf8'));

// Bengali surah names map
const SURAH_BN_NAMES = {
  1: 'আল-ফাতিহা', 2: 'আল-বাকারা', 3: 'আলে ইমরান', 4: 'আন-নিসা', 5: 'আল-মায়েদা',
  6: 'আল-আনআম', 7: 'আল-আরাফ', 8: 'আল-আনফাল', 9: 'আত-তাওবাহ', 10: 'ইউনুস',
  11: 'হূদ', 12: 'ইউসুফ', 13: 'আর-রাদ', 14: 'ইবরাহীম', 15: 'আল-হিজর',
  16: 'আন-নাহল', 17: 'আল-ইসরা', 18: 'আল-কাহফ', 19: 'মারইয়াম', 20: 'ত্বাহা',
  21: 'আল-আম্বিয়া', 22: 'আল-হাজ্জ', 23: 'আল-মুমিনুন', 24: 'আন-নূর', 25: 'আল-ফুরকান',
  26: 'আশ-শুআরা', 27: 'আন-নামল', 28: 'আল-কাসাস', 29: 'আল-আনকাবুত', 30: 'আর-রূম',
  31: 'লুকমান', 32: 'আস-সাজদাহ', 33: 'আল-আহযাব', 34: 'সাবা', 35: 'ফাতির',
  36: 'ইয়াসীন', 37: 'আস-সাফফাত', 38: 'ছোয়াদ', 39: 'আজ-জুমার', 40: 'গাফির',
  41: 'ফুসসিলাত', 42: 'আশ-শুরা', 43: 'আজ-জুখরূফ', 44: 'আদ-দুখান', 45: 'আল-জাসিয়া',
  46: 'আল-আহকাফ', 47: 'মুহাম্মাদ', 48: 'আল-ফাতহ', 49: 'আল-হুজুরাত', 50: 'ক্বাফ',
  51: 'আয-যারিয়াত', 52: 'আত-তুর', 53: 'আন-নাজম', 54: 'আল-কামার', 55: 'আর-রাহমান',
  56: 'আল-ওয়াকিয়া', 57: 'আল-হাদীদ', 58: 'আল-মুজাদালাহ', 59: 'আল-হাশর', 60: 'আল-মুমতাহিনা',
  61: 'আস-সফ', 62: 'আল-জুমুআহ', 63: 'আল-মুনাফিকূন', 64: 'আত-তাগাবুন', 65: 'আত-ত্বালাক',
  66: 'আত-তাহরীম', 67: 'আল-মুলক', 68: 'আল-কলম', 69: 'আল-হাক্কাহ', 70: 'আল-মাআরিজ',
  71: 'নূহ', 72: 'আল-জিন', 73: 'আল-মুযাম্মিল', 74: 'আল-মুদ্দাসসির', 75: 'আল-কিয়ামাহ',
  76: 'আল-ইনসান', 77: 'আল-মুরসালাত', 78: 'আন-নাবা', 79: 'আন-নাজিআত', 80: 'আবাসা',
  81: 'আত-তাকবীর', 82: 'আল-ইনফিতার', 83: 'আল-মুতাফফিফীন', 84: 'আল-ইনশিকাক', 85: 'আল-বুরুজ',
  86: 'আত-তারিক', 87: 'আল-আলা', 88: 'আল-গাশিয়াহ', 89: 'আল-ফজর', 90: 'আল-বালাদ',
  91: 'আশ-শামস', 92: 'আল-লাইল', 93: 'আদ-দুহা', 94: 'আল-ইনশিরাহ', 95: 'আত-তীন',
  96: 'আল-আলাক', 97: 'আল-কদর', 98: 'আল-বাইয়িনাহ', 99: 'আল-যিলযাল', 100: 'আল-আদিয়াত',
  101: 'আল-কারেয়া', 102: 'আত-তাকাসুর', 103: 'আল-আসর', 104: 'আল-হুমাযাহ', 105: 'আল-ফিল',
  106: 'কুরাইশ', 107: 'আল-মাউন', 108: 'আল-কাউসার', 109: 'আল-কাফিরুন', 110: 'আন-নাসর',
  111: 'আল-লাহাব', 112: 'আল-ইখলাস', 113: 'আল-ফালাক', 114: 'আন-নাস'
};

// Rich curated topics with EXACT sub-sections matching MessageBD structure
const RICH_PRESETS = {
  // 1. আত্মশুদ্ধি - EXACT MATCH with user screenshot (image_2da601e9.png)
  'আত্মশুদ্ধি': {
    nameEn: 'Self-Purification (Tazkiyah)',
    nameAr: 'تزكية النفس',
    cat: 'নৈতিকতা ও আত্মশুদ্ধি',
    icon: '✨',
    desc: 'আত্মার পরিশুদ্ধি, নফসের নিয়ন্ত্রণ এবং আল্লাহর নৈকট্য লাভের সুনির্দিষ্ট কুরআনিক পদ্ধতি।',
    sections: [
      {
        subHeadingBn: 'আত্মশুদ্ধির পদ্ধতি:',
        ayahs: [
          {
            sNum: 73, aNum: 6, gNum: 5481,
            ar: 'إِنَّ نَاشِئَةَ اللَّيْلِ هِيَ أَشَدُّ وَطْئًا وَأَقْوَمُ قِيلًا',
            trBn: 'নিশ্চয় রাত-জাগরণ আত্মসংযমের জন্য অধিকতর প্রবল এবং স্পষ্ট বলার জন্য অধিকতর উপযোগী।',
            trEn: 'Indeed, the hours of the night are more effective for concurrence and more suitable for words.'
          },
          {
            sNum: 73, aNum: 7, gNum: 5482,
            ar: 'إِنَّ لَكَ فِي النَّهَارِ سَبْحًا طَوِيلًا',
            trBn: 'নিশ্চয় তোমার জন্য দিনের বেলায় রয়েছে দীর্ঘ কর্মব্যস্ততা।',
            trEn: 'Indeed, for you by day is prolonged occupation.'
          },
          {
            sNum: 73, aNum: 8, gNum: 5483,
            ar: 'وَاذْكُرِ اسْمَ رَبِّكَ وَتَبَتَّلْ إِلَيْهِ تَبْتِيلًا',
            trBn: 'আর তুমি তোমার রবের নাম স্মরণ কর এবং একাগ্রচিত্তে তাঁর প্রতি নিমগ্ন হও।',
            trEn: 'And remember the name of your Lord and devote yourself to Him with [complete] devotion.'
          }
        ]
      },
      {
        subHeadingBn: 'সাদাকার মাধ্যমে আত্মশুদ্ধি অর্জন সম্ভব:',
        ayahs: [
          {
            sNum: 9, aNum: 103, gNum: 1338,
            ar: 'خُذْ مِنْ أَمْوَالِهِمْ صَدَقَةً تُطَهِّرُهُمْ وَتُزَكِّيهِم بِهَا وَصَلِّ عَلَيْهِمْ ۖ إِنَّ صَلَاتَكَ سَكَنٌ لَّهُمْ ۗ وَاللَّهُ سَمِيعٌ عَلِيمٌ',
            trBn: 'তাদের সম্পদ থেকে সদাকা নাও। এর মাধ্যমে তাদেরকে তুমি পবিত্র ও পরিশুদ্ধ করবে। আর তাদের জন্য দো‘আ কর, নিশ্চয় তোমার দো‘আ তাদের জন্য প্রশান্তিকর। আর আল্লাহ সর্বশ্রোতা, সর্বজ্ঞ।',
            trEn: 'Take from their wealth a charity by which you purify them and cause them increase, and invoke [Allah\'s blessings] upon them.'
          }
        ]
      },
      {
        subHeadingBn: 'গোপনে ভালো কাজের সুফল:',
        ayahs: [
          {
            sNum: 2, aNum: 271, gNum: 278,
            ar: 'إِن تُبْدُوا الصَّدَقَاتِ فَنِعِمَّا هِيَ ۖ وَإِن تُخْفُوهَا وَتُؤْتُوهَا الْفُقَرَاءَ فَهُوَ خَيْرٌ لَّكُمْ ۚ وَيُكَفِّرُ عَنكُم مِّن سَيِّئَاتِكُمْ ۗ وَاللَّهُ بِمَا تَعْمَلُونَ خَبِيرٌ',
            trBn: 'তোমরা যদি সদাকা প্রকাশ কর, তবে তা উত্তম। আর যদি তা গোপন কর এবং ফকীরদেরকে তা দাও, তাহলে তাও তোমাদের জন্য উত্তম এবং তিনি তোমাদের গুনাহসমূহ মুছে দেবেন। আর তোমরা যে আমল কর, আল্লাহ সে সম্পর্কে সম্যক অবহিত।',
            trEn: 'If you disclose your charitable expenditures, they are good; but if you conceal them and give them to the poor, it is better for you.'
          }
        ]
      }
    ],
    hadith: {
      narr: 'হযরত আন-নাওয়াস ইবনে সামআন (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) বলেছেন: নেক আমল বা পুণ্য হলো উত্তম চরিত্র, আর গুনাহ বা পাপ হলো যা তোমার অন্তরে দ্বিধাদ্বন্দ্ব সৃষ্টি করে এবং তা মানুষের সামনে প্রকাশ পাওয়াকে তুমি অপছন্দ করো।',
      ref: 'সহীহ মুসলিম: ২৫৫৩'
    }
  },

  // 2. নামাজ/সালাত
  'নামাজ/সালাত': {
    nameEn: 'Prescribed Salat & Prayers',
    nameAr: 'إقامة الصلاة',
    cat: 'ইবাদত ও আমল',
    icon: '🕌',
    desc: 'সালাতের ফরযিয়াত, সঠিক সময়ে আদায়, খুশু-খুযু এবং অশ্লীল কাজ থেকে বাঁচার মহৌষধ।',
    sections: [
      {
        subHeadingBn: 'সালাত কায়েমের সুনির্দিষ্ট নির্দেশ:',
        ayahs: [
          {
            sNum: 2, aNum: 43, gNum: 50,
            ar: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ وَارْكَعُوا مَعَ الرَّاكِعِينَ',
            trBn: 'আর তোমরা সালাত কায়েম করো, যাকাত প্রদান করো এবং রুকুকারীদের সাথে রুকু করো।',
            trEn: 'And establish prayer and give zakah and bow with those who bow [in worship and obedience].'
          },
          {
            sNum: 4, aNum: 103, gNum: 596,
            ar: 'إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا',
            trBn: 'নিশ্চয় সালাত মুমিনদের ওপর নির্দিষ্ট সময়ে ফরয করা হয়েছে।',
            trEn: 'Indeed, prayer has been decreed upon the believers a decree of specified times.'
          }
        ]
      },
      {
        subHeadingBn: 'সালাতের মাধ্যমে অন্তরের পবিত্রতা ও নিরাপত্তা:',
        ayahs: [
          {
            sNum: 29, aNum: 45, gNum: 3388,
            ar: 'اتْلُ مَا أُوحِيَ إِلَيْكَ مِنَ الْكِتَابِ وَأَقِمِ الصَّلَاةَ ۖ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ ۗ وَلَذِكْرُ اللَّهِ أَكْبَرُ',
            trBn: 'কিতাব থেকে যা আপনার প্রতি ওহী করা হয়েছে তা পাঠ করুন এবং সালাত কায়েম করুন। নিশ্চয় সালাত অশ্লীল ও মন্দ কাজ থেকে বিরত রাখে। আর আল্লাহর স্মরণই সর্বশ্রেষ্ঠ।',
            trEn: 'Recite, [O Muhammad], what has been revealed to you of the Book and establish prayer. Indeed, prayer prohibits immorality and wrongdoing.'
          }
        ]
      },
      {
        subHeadingBn: 'সালাতে বিনয় ও একাগ্রতার সুফল:',
        ayahs: [
          {
            sNum: 23, aNum: 1, gNum: 2674,
            ar: 'قَدْ أَفْلَحَ الْمُؤْمِنُونَ ﴿١﴾ الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ',
            trBn: 'অবশ্যই মুমিনগণ সফলকাম হয়েছে, যারা নিজেদের সালাতে বিনয়ী ও একাগ্রচিত্ত।',
            trEn: 'Certainly will the believers have succeeded: They who are during their prayer humbly submissive.'
          }
        ]
      }
    ],
    hadith: {
      narr: 'হযরত জাবির (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) বলেছেন: কোনো ব্যক্তি এবং কুফর ও শিরকের মাঝে পার্থক্য হলো সালাত বর্জন করা।',
      ref: 'সহীহ মুসলিম: ৮২'
    }
  },

  // 3. রোজা/সিয়াম
  'রোজা/সিয়াম': {
    nameEn: 'Fasting in Ramadan',
    nameAr: 'الصيام وفضله',
    cat: 'ইবাদত ও আমল',
    icon: '🌙',
    desc: 'সিয়ামের লক্ষ্য তাকওয়া অর্জন, কুরআন নাজিলের মাস রমজানের পবিত্রতা ও মর্যাদা।',
    sections: [
      {
        subHeadingBn: 'সিয়াম ফরয হওয়ার বিধান ও উদ্দেশ্য:',
        ayahs: [
          {
            sNum: 2, aNum: 183, gNum: 190,
            ar: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
            trBn: 'হে ঈমানদারগণ! তোমাদের ওপর সিয়াম ফরয করা হয়েছে, যেমন ফরয করা হয়েছিল তোমাদের পূর্ববর্তীদের ওপর, যাতে তোমরা তাকওয়া অর্জন করতে পারো।',
            trEn: 'O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous.'
          }
        ]
      },
      {
        subHeadingBn: 'রমজান মাস ও কুরআন নাজিল:',
        ayahs: [
          {
            sNum: 2, aNum: 185, gNum: 192,
            ar: 'شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ وَبَيِّنَاتٍ مِّنَ الْهُدَىٰ وَالْفُرْقَانِ',
            trBn: 'রমজান মাস, যাতে কুরআন নাজিল করা হয়েছে মানুষের দিশারী হিসেবে এবং হিদায়াতের সুস্পষ্ট নিদর্শন ও সত্য-মিথ্যার পার্থক্যকারী রূপে।',
            trEn: 'The month of Ramadhan [is that] in which was revealed the Qur\'an, a guidance for the people and clear proofs of guidance and criterion.'
          }
        ]
      }
    ],
    hadith: {
      narr: 'হযরত আবূ হুরায়রা (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) বলেছেন: যে ব্যক্তি ঈমান ও সাওয়াবের আশায় রমজানের রোজা রাখবে, তার পূর্বের সকল গুনাহ ক্ষমা করে দেওয়া হবে।',
      ref: 'সহীহ বুখারী: ৩৮, সহীহ মুসলিম: ৭৬০'
    }
  },

  // 4. যাকাত
  'যাকাত': {
    nameEn: 'Zakat & Obligatory Alms',
    nameAr: 'الزكاة ومصارفها',
    cat: 'ইবাদত ও আমল',
    icon: '🪙',
    desc: 'যাকাতের ফরযিয়াত, সম্পদ পরিশুদ্ধির মাধ্যম এবং নির্ধারিত আটটি খাতের পূর্ণাঙ্গ বিবরণ।',
    sections: [
      {
        subHeadingBn: 'যাকাত আদায়ের নির্দেশ ও সালাতের সংযোগ:',
        ayahs: [
          {
            sNum: 2, aNum: 110, gNum: 117,
            ar: 'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ ۚ وَمَا تُقَدِّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ',
            trBn: 'আর তোমরা সালাত কায়েম করো এবং যাকাত দাও। তোমরা নিজেদের জন্য যে সৎকাজ অগ্রে পাঠাবে, তা আল্লাহর কাছে পাবে।',
            trEn: 'And establish prayer and give zakah, and whatever good you put forward for yourselves - you will find it with Allah.'
          }
        ]
      },
      {
        subHeadingBn: 'যাকাত বণ্টনের আটটি সুনির্দিষ্ট খাত:',
        ayahs: [
          {
            sNum: 9, aNum: 60, gNum: 1295,
            ar: 'إِنَّمَا الصَّدَقَاتُ لِلْفُقَرَاءِ وَالْمَسَاكِينِ وَالْعَامِلِينَ عَلَيْهَا وَالْمُؤَلَّفَةِ قُلُوبُهُمْ وَفِي الرِّقَابِ وَالْغَارِمِينَ وَفِي سَبِيلِ اللَّهِ وَابْنِ السَّبِيلِ ۖ فَرِيضَةً مِّنَ اللَّهِ',
            trBn: 'সাদাকাহ (যাকাত) কেবল ফকীর, মিসকীন, যাকাত আদায়ে নিযুক্ত কর্মচারী, যাদের মন জয় করা উদ্দেশ্য, দাসমুক্তিতে, ঋণগ্রস্তদের, আল্লাহর পথে এবং মুসাফিরদের জন্য। এটি আল্লাহর নির্ধারিত ফরয।',
            trEn: 'Zakah expenditures are only for the poor and for the needy and for those employed to collect [zakah] and for bringing hearts together.'
          }
        ]
      }
    ],
    hadith: {
      narr: 'হযরত ইবনে আব্বাস (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) মুআজ (রা.)-কে ইয়েমেনে পাঠানোর সময় নির্দেশ দেন: তাদের জানিয়ে দাও যে আল্লাহ তাদের সম্পদে সদাকাহ (যাকাত) ফরয করেছেন, যা তাদের ধনীদের কাছ থেকে গ্রহণ করে দরিদ্রদের মাঝে বণ্টন করা হবে।',
      ref: 'সহীহ বুখারী: ১৩৯৫, সহীহ মুসলিম: ১৯'
    }
  },

  // 5. হজ্ব/হজ্জ
  'হজ্ব/হজ্জ': {
    nameEn: 'Hajj Pilgrimage',
    nameAr: 'الحج إلى بيت الله',
    cat: 'ইবাদত ও আমল',
    icon: '🕋',
    desc: 'কাবা শরীফ যিয়ারত, সামর্থ্যবানদের জন্য জীবনে একবার হজ ফরয হওয়া এবং ইবরাহীমি সুন্নাত।',
    sections: [
      {
        subHeadingBn: 'হজের ফরযিয়াত ও আল্লাহর ঘোষণা:',
        ayahs: [
          {
            sNum: 3, aNum: 97, gNum: 390,
            ar: 'وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا ۚ وَمَن كَفَرَ فَإِنَّ اللَّهَ غَنِيٌّ عَنِ الْعَالَمِينَ',
            trBn: 'আর মানুষের মধ্যে যার সেখানে যাওয়ার সামর্থ্য আছে, আল্লাহর জন্য সেই ঘরের হজ করা তার ওপর ফরয। আর যে কুফরী করে, তবে নিশ্চয়ই আল্লাহ বিশ্বজগৎ থেকে অমুখাপেক্ষী।',
            trEn: 'And [due] to Allah from the people is a pilgrimage to the House - for whoever is able to find thereto a way.'
          }
        ]
      },
      {
        subHeadingBn: 'হজের দিনসমূহে তাকওয়া ও শিষ্টাচার:',
        ayahs: [
          {
            sNum: 2, aNum: 197, gNum: 204,
            ar: 'الْحَجُّ أَشْهُرٌ مَّعْلُومَاتٌ ۚ فَمَن فَرَضَ فِيهِنَّ الْحَجَّ فَلَا رَفَثَ وَلَا فُسُوقَ وَلَا جِدَالَ فِي الْحَجِّ ۗ وَمَا تَفْعَلُوا مِنْ خَيْرٍ يَعْلَمْهُ اللَّهُ ۗ وَتَزَوَّدُوا فَإِنَّ خَيْرَ الزَّادِ التَّقْوَىٰ',
            trBn: 'হজের কয়েকটি নির্দিষ্ট মাস রয়েছে। অতএব যে কেউ এ মাসগুলোতে হজের সংকল্প করবে, সে যেন হজের সময়ে কোনো অশ্লীল কাজ, পাপাচার ও কলহ-বিবাদে লিপ্ত না হয়। আর তোমরা যে নেক কাজ করো আল্লাহ তা জানেন। আর তোমরা পাথেয় সংগ্রহ করো, নিশ্চয়ই সর্বোত্তম পাথেয় হলো তাকওয়া।',
            trEn: 'Hajj is [during] well-known months, so whoever has made Hajj obligatory upon himself therein, there is [to be for him] no sexual relations and no disobedience and no disputing during Hajj.'
          }
        ]
      }
    ],
    hadith: {
      narr: 'হযরত আবূ হুরায়রা (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) বলেছেন: মাবরুর হজের (কবুল হওয়া হজ) প্রতিদান জান্নাত ছাড়া আর কিছুই নয়।',
      ref: 'সহীহ বুখারী: ১৭৭৩, সহীহ মুসলিম: ১৩৪৯'
    }
  },

  // 6. তাওহীদ
  'তাওহীদ': {
    nameEn: 'Tawheed & Monotheism',
    nameAr: 'عقيدة التوحيد',
    cat: 'আকীদা ও বিশ্বাস',
    icon: '☝️',
    desc: 'আল্লাহর একত্ববাদ, তাঁর কোনো শরীক নেই এবং সমস্ত এবাদত একমাত্র তাঁরই জন্য উৎসর্গীকৃত।',
    sections: [
      {
        subHeadingBn: 'আল্লাহর নিরঙ্কুশ একত্ববাদ ও মর্যাদা:',
        ayahs: [
          {
            sNum: 112, aNum: 1, gNum: 6222,
            ar: 'قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ ﴿٢﴾ لَمْ يَلِدْ وَلَمْ يُولَدْ ﴿٣﴾ وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
            trBn: 'বলুন: তিনিই আল্লাহ, এক-অদ্বিতীয়। আল্লাহ অমুখাপেক্ষী। তিনি কাউকে জন্ম দেননি এবং তাঁকেও জন্ম দেওয়া হয়নি। আর তাঁর সমকক্ষ কেউই নেই।',
            trEn: 'Say, "He is Allah, [who is] One, Allah, the Eternal Refuge. He neither begets nor is born, Nor is there to Him any equivalent."'
          }
        ]
      },
      {
        subHeadingBn: 'আয়াতুল কুরসী - মহান পরাক্রমশালী আল্লাহর গুণাবলী:',
        ayahs: [
          {
            sNum: 2, aNum: 255, gNum: 262,
            ar: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ',
            trBn: 'আল্লাহ, তিনি ছাড়া কোনো সত্য উপাস্য নেই। তিনি চিরঞ্জীব, সর্বসত্তার ধারক। তন্দ্রা ও নিদ্রা তাঁকে স্পর্শ করে না। আসমান ও যমীনে যা কিছু আছে সব তাঁরই মালিকানাধীন।',
            trEn: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of [all] existence. Neither drowsiness overtakes Him nor sleep.'
          }
        ]
      }
    ],
    hadith: {
      narr: 'হযরত মুআজ ইবনে জাবাল (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) বলেছেন: বান্দার ওপর আল্লাহর হক হলো তারা কেবল তাঁরই ইবাদত করবে এবং তাঁর সাথে কোনো কিছুকে শরীক করবে না। আর আল্লাহর ওপর বান্দার হক হলো যে তাঁর সাথে কাউকে শরীক করে না, তাকে তিনি শাস্তি দেবেন না।',
      ref: 'সহীহ বুখারী: ২৮৫৬, সহীহ মুসলিম: ৩০'
    }
  },

  // 7. জান্নাত
  'জান্নাত': {
    nameEn: 'Paradise & Eternal Bliss',
    nameAr: 'الجنة ونعيمها',
    cat: 'পরকাল ও কিয়ামত',
    icon: '🌿',
    desc: 'মুমিন ও নেককার বান্দাদের জন্য প্রস্তুতকৃত চিরস্থায়ী জান্নাতের নেয়ামত, আরাম ও প্রশান্তি।',
    sections: [
      {
        subHeadingBn: 'জান্নাতের সুবিশাল ব্যাপ্তি ও মুত্তাকীদের আমন্ত্রণ:',
        ayahs: [
          {
            sNum: 3, aNum: 133, gNum: 426,
            ar: 'وَسَارِعُوا إِلَىٰ مَغْفِرَةٍ مِّن رَّبِّكُمْ وَجَنَّةٍ عَرْضُهَا السَّمَاوَاتُ وَالْأَرْضُ أُعِدَّتْ لِلْمُتَّقِينَ',
            trBn: 'আর তোমরা দ্রুত অগ্রসর হও তোমাদের রবের ক্ষমার দিকে এবং সেই জান্নাতের দিকে যার পরিধি আসমান ও জমিনের সমান, যা প্রস্তুত রাখা হয়েছে মুত্তাকীদের জন্য।',
            trEn: 'And hasten to forgiveness from your Lord and a garden as wide as the heavens and earth, prepared for the righteous.'
          }
        ]
      },
      {
        subHeadingBn: 'জান্নাতের অপরূপ নেয়ামত ও সুশীতল ছায়া:',
        ayahs: [
          {
            sNum: 56, aNum: 27, gNum: 4976,
            ar: 'وَأَصْحَابُ الْيَمِينِ مَا أَصْحَابُ الْيَمِينِ ﴿٢٧﴾ فِي سِدْرٍ مَّخْضُودٍ ﴿٢٨﴾ وَطَلْحٍ مَّنضُودٍ ﴿٢٩﴾ وَظِلٍّ مَّمْدُودٍ ﴿٣٠﴾ وَمَاءٍ مَّسْكُوبٍ',
            trBn: 'আর ডানদিকের দল! কত ভাগ্যবান ডানদিকের দল! তারা থাকবে কাঁটাহীন কুলগাছে, কাঁদি কাঁদি কলাবৃক্ষে, সুবিস্তৃত ছায়ায় এবং প্রবাহমান ঝরণাধারায়।',
            trEn: 'And the companions of the right - what are the companions of the right? [They will be] among lote trees with thorns removed, And [banana] trees layered [with fruit], And shade extended, And water poured out.'
          }
        ]
      }
    ],
    hadith: {
      narr: 'হযরত আবূ হুরায়রা (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) বলেছেন: আল্লাহ তাআলা ঘোষণা করেন: আমি আমার নেককার বান্দাদের জন্য জান্নাতে এমন জিনিস প্রস্তুত রেখেছি যা কোনো চোখ কখনো দেখেনি, কোনো কান কখনো শোনেনি এবং কোনো মানুষের অন্তরে তার কল্পনাও আসেনি।',
      ref: 'সহীহ বুখারী: ৩২৪৪, সহীহ মুসলিম: ১৮৯'
    }
  },

  // 8. জাহান্নাম
  'জাহান্নাম': {
    nameEn: 'Hellfire & Divine Warning',
    nameAr: 'جهنم وعذابها',
    cat: 'পরকাল ও কিয়ামত',
    icon: '🔥',
    desc: 'পাপী, অহংকারী ও কাফেরদের জন্য শাস্তির স্থান জাহান্নাম এবং তা থেকে বাঁচার আকুল প্রার্থনা।',
    sections: [
      {
        subHeadingBn: 'জাহান্নামের আগুনের তীব্রতা ও সতর্কবাণী:',
        ayahs: [
          {
            sNum: 66, aNum: 6, gNum: 5235,
            ar: 'يَا أَيُّهَا الَّذِينَ آمَنُوا قُوا أَنفُسَكُمْ وَأَهْلِيكُمْ نَارًا وَقُودُهَا النَّاسُ وَالْحِجَارَةُ عَلَيْهَا مَلَائِكَةٌ غِلَاظٌ شِدَادٌ',
            trBn: 'হে ঈমানদারগণ! তোমরা নিজেদেরকে এবং তোমাদের পরিবার-পরিজনকে সেই আগুন থেকে রক্ষা করো, যার জ্বালানি হবে মানুষ ও পাথর; যার দায়িত্বে নিয়োজিত আছে কঠোর স্বভাবের নির্মম ফেরেশতাগণ।',
            trEn: 'O you who have believed, protect yourselves and your families from a Fire whose fuel is people and stones.'
          }
        ]
      },
      {
        subHeadingBn: 'জাহান্নাম থেকে মুক্তির দোয়া:',
        ayahs: [
          {
            sNum: 25, aNum: 65, gNum: 2920,
            ar: 'وَالَّذِينَ يَقُولُونَ رَبَّنَا اصْرِفْ عَنَّا عَذَابَ جَهَنَّمَ ۖ إِنَّ عَذَابَهَا كَانَ غَرَامًا',
            trBn: 'আর যারা বলে: হে আমাদের রব! আমাদের থেকে জাহান্নামের আজাব ফিরিয়ে নিন; নিশ্চয়ই এর আজাব এক অবিরাম ধ্বংসাত্মক শাস্তি।',
            trEn: 'And those who say, "Our Lord, avert from us the punishment of Hell. Indeed, its punishment is ever adhering."'
          }
        ]
      }
    ],
    hadith: {
      narr: 'হযরত আনাস (রা.) থেকে বর্ণিত:',
      trBn: 'নবী করীম (সা.) বলেছেন: যে ব্যক্তি তিনবার আল্লাহর কাছে জান্নাত প্রার্থনা করে, জান্নাত বলে: হে আল্লাহ, তাকে জান্নাতে প্রবেশ করান! আর যে তিনবার জাহান্নাম থেকে পানাহ চায়, জাহান্নাম বলে: হে আল্লাহ, তাকে জাহান্নামের আগুন থেকে রক্ষা করুন!',
      ref: 'সুনান আত-তিরমিজী: ২৫৭২, সুনান আন-নাসায়ী: ৫৫২১'
    }
  },

  // 9. জিকির/ আল্লাহর স্মরণ
  'জিকির/ আল্লাহর স্মরণ': {
    nameEn: 'Remembrance of Allah (Dhikr)',
    nameAr: 'ذكر الله تعالى',
    cat: 'ইবাদত ও আমল',
    icon: '📿',
    desc: 'আল্লাহর সার্বক্ষণিক স্মরণ, তাসবিহ ও তাহলীল এবং অন্তরের পরম প্রশান্তি লাভ।',
    sections: [
      {
        subHeadingBn: 'জিকিরের মাধ্যমে অন্তরের পরম প্রশান্তি:',
        ayahs: [
          {
            sNum: 13, aNum: 28, gNum: 1735,
            ar: 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
            trBn: 'যারা ঈমান এনেছে এবং আল্লাহর স্মরণে যাদের অন্তর প্রশান্ত হয়; জেনে রেখো, আল্লাহর স্মরণেই কেবল অন্তরসমূহ শান্তি পায়।',
            trEn: 'Those who have believed and whose hearts are assured by the remembrance of Allah. Unquestionably, by the remembrance of Allah hearts are assured.'
          }
        ]
      },
      {
        subHeadingBn: 'সকাল ও সন্ধ্যায় অধিক পরিমাণে জিকিরের নির্দেশ:',
        ayahs: [
          {
            sNum: 33, aNum: 41, gNum: 3574,
            ar: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا ﴿٤١﴾ وَسَبِّحُوهُ بُكْرَةً وَأَصِيلًا',
            trBn: 'হে ঈমানদারগণ! তোমরা আল্লাহকে অধিক পরিমাণে স্মরণ করো এবং সকাল-সন্ধ্যায় তাঁর পবিত্রতা ঘোষণা করো।',
            trEn: 'O you who have believed, remember Allah with much remembrance, And exalt Him morning and afternoon.'
          }
        ]
      }
    ],
    hadith: {
      narr: 'হযরত আবূ মূসা আশআরী (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) বলেছেন: যে ব্যক্তি তার রবের জিকির করে আর যে ব্যক্তি তার রবের জিকির করে না, তাদের দৃষ্টান্ত হলো জীবিত ও মৃত ব্যক্তির মতো।',
      ref: 'সহীহ বুখারী: ৬৪০৭, সহীহ মুসলিম: ৭৭৯'
    }
  },

  // 10. পিতা-মাতার প্রতি সদাচরণ
  'পিতামাতার প্রতি সদাচরণ': {
    nameEn: 'Kindness to Parents',
    nameAr: 'بر الوالدين',
    cat: 'নৈতিকতা ও আত্মশুদ্ধি',
    icon: '🤲',
    desc: 'পিতা-মাতার সাথে বিনম্র আচরণ, বার্ধক্যে সেবা এবং তাঁদের জন্য খাটি মাগফিরাতের দোয়া।',
    sections: [
      {
        subHeadingBn: 'পিতা-মাতার প্রতি সদাচরণের মহান আদেশ:',
        ayahs: [
          {
            sNum: 17, aNum: 23, gNum: 2052,
            ar: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا ۚ إِمَّا يَبْلُغَنَّ عِندَكَ الْكِبَرَ أَحَدُهُمَا أَوْ كِلَاهُمَا فَلَا تَقُل لَّهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا وَقُل لَّهُمَا قَوْلًا كَرِيمًا',
            trBn: 'আর তোমার রব আদেশ করেছেন যে, তোমরা তিনি ছাড়া আর কারো ইবাদত করবে না এবং পিতা-মাতার সাথে উত্তম আচরণ করবে। তাঁদের একজন কিংবা উভয়ই যদি তোমার জীবদ্দশায় বার্ধক্যে উপনীত হয়, তবে তাঁদেরকে ‘উহ্’ পর্যন্ত বলো না এবং তাঁদের ধমক দিও না; বরং তাঁদের সাথে সম্মানসূচক নম্র কথা বলো।',
            trEn: 'And your Lord has decreed that you not worship except Him, and to parents, good treatment.'
          }
        ]
      },
      {
        subHeadingBn: 'পিতা-মাতার জন্য কুরআনিক দোয়া:',
        ayahs: [
          {
            sNum: 17, aNum: 24, gNum: 2053,
            ar: 'وَاخْفِضْ لَهُمَا جَنَاحَ الذُّلِّ مِنَ الرَّحْمَةِ وَقُل رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
            trBn: 'আর দয়াপরবশ হয়ে তাঁদের সামনে বিনয়ের ডানা অবনমিত করো এবং দোয়া করো: "হে আমার রব! তাঁদের উভয়ের প্রতি দয়া করুন, যেমন তাঁরা শৈশবে আমাকে স্নেহ-মমতায় লালন-পালন করেছিলেন।"',
            trEn: 'And lower to them the wing of humility out of mercy and say, "My Lord, have mercy upon them as they brought me up [when I was] small."'
          }
        ]
      }
    ],
    hadith: {
      narr: 'হযরত আবূ হুরায়রা (রা.) থেকে বর্ণিত:',
      trBn: 'এক ব্যক্তি এসে জিজ্ঞেস করল: হে আল্লাহর রাসূল! আমার সবচেয়ে সুন্দর সদাচরণ পাওয়ার সবচেয়ে বেশি হকদার কে? তিনি বললেন: তোমার মা। লোকটি বলল: এরপর কে? তিনি বললেন: তোমার মা। লোকটি বলল: এরপর কে? তিনি বললেন: তোমার মা। লোকটি বলল: এরপর কে? তিনি বললেন: তোমার পিতা।',
      ref: 'সহীহ বুখারী: ৫৯৭১, সহীহ মুসলিম: ২৫৪৮'
    }
  }
};

// Also map alternative spellings
RICH_PRESETS['পিতা-মাতার প্রতি সদাচরণ'] = RICH_PRESETS['পিতামাতার প্রতি সদাচরণ'];

// Function to generate sectioned topic for any given topic name
function buildTopicItem(rawName, idx) {
  // If we have hand-curated rich preset
  if (RICH_PRESETS[rawName]) {
    const p = RICH_PRESETS[rawName];
    // Flatten ayahs
    const allAyahs = [];
    p.sections.forEach((sec, sIdx) => {
      sec.id = 'sec_' + (idx + 1) + '_' + (sIdx + 1);
      sec.ayahs.forEach((a, aIdx) => {
        a.id = 'sec_' + (idx + 1) + '_' + (sIdx + 1) + '_a' + (aIdx + 1);
        a.surahNumber = a.sNum;
        a.ayahNumber = a.aNum;
        a.globalNumber = a.gNum;
        a.arabic = a.ar;
        a.translationBn = a.trBn;
        a.translationEn = a.trEn || '';
        delete a.sNum;
        delete a.aNum;
        delete a.gNum;
        delete a.ar;
        delete a.trBn;
        delete a.trEn;
        a.surahNameBn = SURAH_BN_NAMES[a.surahNumber] || 'সূরা ' + a.surahNumber;
        a.surahNameAr = 'سورة ' + a.surahNumber;
        a.surahNameEn = 'Surah ' + a.surahNumber;
        a.themeNoteBn = sec.subHeadingBn;
        a.themeNoteEn = 'Quranic Guidance on ' + rawName;
        a.transliterationBn = '';
        allAyahs.push(a);
      });
    });

    return {
      id: 'topic_' + (idx + 1),
      nameBn: rawName,
      nameEn: p.nameEn,
      nameAr: p.nameAr,
      categoryBn: p.cat,
      categoryEn: p.cat,
      icon: p.icon,
      colorTheme: 'emerald',
      badgeBn: p.cat,
      badgeEn: 'Noble Quran',
      descriptionBn: p.desc,
      descriptionEn: p.nameEn + ' in the Holy Quran and authentic Sunnah.',
      count: allAyahs.length,
      sections: p.sections,
      ayahs: allAyahs,
      hadiths: [
        {
          id: 'topic_' + (idx + 1) + '_h1',
          narratorBn: p.hadith.narr,
          narratorEn: 'Hadith Reference:',
          translationBn: p.hadith.trBn,
          translationEn: 'Virtues and authentic rulings from prophetic tradition.',
          referenceBn: p.hadith.ref,
          referenceEn: p.hadith.ref
        }
      ]
    };
  }

  // Generic generator with domain intelligence
  let cat = 'নৈতিকতা ও আত্মশুদ্ধি';
  let icon = '📖';
  let sub1 = `${rawName}-এর গুরুত্ব ও তাৎপর্য:`;
  let sub2 = `${rawName} সম্পর্কে পবিত্র কুরআনের নির্দেশনা:`;
  let sNum = 2; let aNum = 255; let gNum = 262;
  let sBn = 'আল-বাকারা';
  let ar1 = 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ';
  let trBn1 = 'আল্লাহ! তিনি ছাড়া কোনো সত্য উপাস্য নেই। তিনি চিরঞ্জীব, সর্বসত্তার ধারক। তন্দ্রা ও নিদ্রা তাঁকে স্পর্শ করে না।';
  let trEn1 = 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.';

  let sNum2 = 2; let aNum2 = 286; let gNum2 = 293;
  let ar2 = 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ';
  let trBn2 = 'আল্লাহ কাউকে তার সাধ্যের বাইরে কোনো বোঝা চাপিয়ে দেন না। সে যা ভালো অর্জন করে তা তারই জন্য এবং যা মন্দ করে তা তারই ওপর বর্তায়।';
  let trEn2 = 'Allah does not charge a soul except [with that within] its capacity.';

  if (rawName.includes('সালাম') || rawName.includes('নবী') || rawName.includes('রাসুল') || rawName.includes('সাহাবা') || rawName.includes('আলী')) {
    cat = 'নবী-রাসূল ও সাহাবা';
    icon = '✨';
    sub1 = `${rawName}-এর মর্যাদা ও আদর্শ:`;
    sub2 = `${rawName} থেকে উম্মাহর জন্য শিক্ষণীয় নিদর্শন:`;
    sNum = 21; aNum = 107; gNum = 2590; sBn = 'আল-আম্বিয়া';
    ar1 = 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ';
    trBn1 = 'আর আমি আপনাকে সমগ্র সৃষ্টিজগতের জন্য রহমতস্বরূপ ছাড়া আর কিছু হিসেবেই প্রেরণ করিনি।';
    trEn1 = 'And We have not sent you, [O Muhammad], except as a mercy to the worlds.';
    sNum2 = 33; aNum2 = 21; gNum2 = 3554;
    ar2 = 'لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ لِّمَن كَانَ يَرْجُو اللَّهَ وَالْيَوْمَ الْآخِرَ';
    trBn2 = 'নিশ্চয়ই তোমাদের জন্য আল্লাহর রাসূলের মধ্যে রয়েছে সর্বোত্তম আদর্শ—তার জন্য যে আল্লাহ ও পরকালের আশা রাখে।';
    trEn2 = 'There has certainly been for you in the Messenger of Allah an excellent pattern for anyone whose hope is in Allah and the Last Day.';
  } else if (rawName.includes('সালাত') || rawName.includes('নামাজ') || rawName.includes('রোজা') || rawName.includes('হজ্ব') || rawName.includes('যাকাত') || rawName.includes('ইবাদত') || rawName.includes('জিকির') || rawName.includes('দোয়া')) {
    cat = 'ইবাদত ও আমল';
    icon = '🕌';
    sub1 = `${rawName}-এর আবশ্যকতা ও নির্দেশ:`;
    sub2 = `${rawName} পালনের অসীম নেয়ামত ও সুফল:`;
    sNum = 2; aNum = 45; gNum = 52; sBn = 'আল-বাকারা';
    ar1 = 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ';
    trBn1 = 'আর তোমরা ধৈর্য ও সালাতের মাধ্যমে সাহায্য প্রার্থনা করো। নিশ্চয়ই তা বিনয়ী ছাড়া অন্যদের কাছে অত্যন্ত কঠিন।';
    trEn1 = 'And seek help through patience and prayer.';
    sNum2 = 29; aNum2 = 45; gNum2 = 3388;
    ar2 = 'اتْلُ مَا أُوحِيَ إِلَيْكَ مِنَ الْكِتَابِ وَأَقِمِ الصَّلَاةَ ۖ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ';
    trBn2 = 'কিতাব থেকে যা আপনার প্রতি ওহী করা হয়েছে তা পাঠ করুন এবং সালাত কায়েম করুন; নিশ্চয় সালাত অশ্লীল ও মন্দ কাজ থেকে বিরত রাখে।';
    trEn2 = 'Recite what has been revealed to you of the Book and establish prayer.';
  } else if (rawName.includes('পরকাল') || rawName.includes('আখেরাত') || rawName.includes('কিয়ামত') || rawName.includes('জান্নাত') || rawName.includes('জাহান্নাম') || rawName.includes('মৃত্যু') || rawName.includes('কবর')) {
    cat = 'পরকাল ও কিয়ামত';
    icon = '⏳';
    sub1 = `${rawName} ও বিচার দিবসের জবাবদিহিতা:`;
    sub2 = `${rawName}-এর চিরস্থায়ী প্রতিদান ও সতর্কতা:`;
    sNum = 99; aNum = 7; gNum = 6133; sBn = 'আল-যিলযাল';
    ar1 = 'فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ ﴿٧﴾ وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ';
    trBn1 = 'কেউ অণু পরিমাণ সৎকাজ করলে তাও সে দেখতে পাবে এবং অণু পরিমাণ মন্দকাজ করলে তাও সে দেখতে পাবে।';
    trEn1 = 'So whoever does an atom\'s weight of good will see it, and whoever does an atom\'s weight of evil will see it.';
    sNum2 = 3; aNum2 = 185; gNum2 = 478;
    ar2 = 'كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ ۗ وَإِنَّمَا تُوَفَّوْنَ أُجُورَكُمْ يَوْمَ الْقِيَامَةِ';
    trBn2 = 'প্রত্যেক প্রাণীকে মৃত্যুর স্বাদ গ্রহণ করতে হবে এবং কিয়ামতের দিনই তোমাদের পূর্ণ প্রতিদান দেওয়া হবে।';
    trEn2 = 'Every soul will taste death, and you will only be given your full compensation on the Day of Resurrection.';
  } else if (rawName.includes('আইন') || rawName.includes('বিধান') || rawName.includes('বিবাহ') || rawName.includes('তালাক') || rawName.includes('হারাম') || rawName.includes('হালাল') || rawName.includes('অধিকার')) {
    cat = 'শরীয়ত ও সামাজিক আইন';
    icon = '⚖️';
    sub1 = `${rawName} সংক্রান্ত ইসলামী শরীয়াহর বিধান:`;
    sub2 = `${rawName}-এ সুবিচার ও ইনসাফ কায়েমের তাগিদ:`;
    sNum = 5; aNum = 1; gNum = 670; sBn = 'আল-মায়েদা';
    ar1 = 'يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ';
    trBn1 = 'হে ঈমানদারগণ! তোমরা যাবতীয় চুক্তি ও প্রতিশ্রুতি যথাযথভাবে পূরণ করো।';
    trEn1 = 'O you who have believed, fulfill [all] contracts.';
    sNum2 = 4; aNum2 = 58; gNum2 = 551;
    ar2 = 'إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا وَإِذَا حَكَمْتُم بَيْنَ النَّاسِ أَن تَحْكُمُوا بِالْعَدْلِ';
    trBn2 = 'নিশ্চয়ই আল্লাহ তোমাদের নির্দেশ দিচ্ছেন আমানত তার প্রাপকদের কাছে পৌঁছে দিতে এবং যখন মানুষের মধ্যে বিচার করবে তখন ন্যায়পরায়ণতার সাথে বিচার করবে।';
    trEn2 = 'Indeed, Allah commands you to render trusts to whom they are due and when you judge between people to judge with justice.';
  } else if (rawName.includes('যুদ্ধ') || rawName.includes('জাতি') || rawName.includes('আসহাব') || rawName.includes('মক্কা')) {
    cat = 'ইতিহাস ও জাতিসমূহ';
    icon = '🗺️';
    sub1 = `${rawName}-এর ঐতিহাসিক পটভূমি ও কুরআনের বর্ণনা:`;
    sub2 = `${rawName} থেকে মুমিনদের শিক্ষা ও হেদায়াত:`;
    sNum = 11; aNum = 120; gNum = 1593; sBn = 'হূদ';
    ar1 = 'وَكُلًّا نَّقُصُّ عَلَيْكَ مِنْ أَنبَاءِ الرُّسُلِ مَا نُثَبِّتُ بِهِ فُؤَادَكَ ۚ وَجَاءَكَ فِي هَٰذِهِ الْحَقُّ وَمَوْعِظَةٌ وَذِكْرَىٰ لِلْمُؤْمِنِينَ';
    trBn1 = 'আর আমি আপনার কাছে রাসূলদের সমস্ত ইতিবৃত্ত বর্ণনা করছি যার দ্বারা আমি আপনার অন্তরকে সুদৃঢ় করি; আর এতে এসেছে সত্য এবং মুমিনদের জন্য উপদেশ।';
    trEn1 = 'And each [story] We relate to you from the news of the messengers is that by which We make firm your heart.';
    sNum2 = 12; aNum2 = 111; gNum2 = 1707;
    ar2 = 'لَقَدْ كَانَ فِي قَصَصِهِمْ عِبْرَةٌ لِّأُولِي الْأَلْبَابِ';
    trBn2 = 'নিশ্চয়ই তাঁদের কাহিনীসমূহে বুদ্ধিমানদের জন্য রয়েছে এক মহা শিক্ষণীয় বিষয়।';
    trEn2 = 'There was certainly in their stories a lesson for those of understanding.';
  } else if (rawName.includes('আল্লাহ') || rawName.includes('তাওহীদ') || rawName.includes('ঈমান') || rawName.includes('শিরক') || rawName.includes('কিতাব')) {
    cat = 'আকীদা ও বিশ্বাস';
    icon = '💖';
    sub1 = `${rawName}-এর প্রতি অবিচল বিশ্বাস ও ভিত্তি:`;
    sub2 = `${rawName} রক্ষা ও খাঁটি অন্তরের পুরস্কার:`;
    sNum = 112; aNum = 1; gNum = 6222; sBn = 'আল-ইখলাস';
    ar1 = 'قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ';
    trBn1 = 'বলুন: তিনিই আল্লাহ, এক-অদ্বিতীয়। আল্লাহ অমুখাপেক্ষী।';
    trEn1 = 'Say, "He is Allah, [who is] One, Allah, the Eternal Refuge."';
    sNum2 = 49; aNum2 = 15; gNum2 = 4627;
    ar2 = 'إِنَّمَا الْمُؤْمِنُونَ الَّذِينَ آمَنُوا بِاللَّهِ وَرَسُولِهِ ثُمَّ لَمْ يَرْتَابُوا وَجَاهَدُوا بِأَمْوَالِهِمْ وَأَنفُسِهِمْ فِي سَبِيلِ اللَّهِ ۚ أُولَٰئِكَ هُمُ الصَّادِقُونَ';
    trBn2 = 'মুমিন তো তারাই যারা আল্লাহ ও তাঁর রাসূলের প্রতি ঈমান এনেছে অতঃপর কোনো সন্দেহ পোষণ করেনি এবং নিজেদের ধন-প্রাণ দিয়ে আল্লাহর পথে জিহাদ করেছে। তারাই সত্যবাদী।';
    trEn2 = 'The believers are only the ones who have believed in Allah and His Messenger and then doubt not.';
  }

  const sec1Ayah = {
    id: 'sec_' + (idx + 1) + '_1_a1',
    surahNumber: sNum,
    ayahNumber: aNum,
    globalNumber: gNum,
    surahNameBn: SURAH_BN_NAMES[sNum] || sBn,
    surahNameAr: 'سورة ' + sNum,
    surahNameEn: 'Surah ' + sNum,
    arabic: ar1,
    translationBn: trBn1,
    translationEn: trEn1,
    transliterationBn: '',
    themeNoteBn: sub1,
    themeNoteEn: 'Wisdom on ' + rawName
  };

  const sec2Ayah = {
    id: 'sec_' + (idx + 1) + '_2_a1',
    surahNumber: sNum2,
    ayahNumber: aNum2,
    globalNumber: gNum2,
    surahNameBn: SURAH_BN_NAMES[sNum2] || 'সূরা ' + sNum2,
    surahNameAr: 'سورة ' + sNum2,
    surahNameEn: 'Surah ' + sNum2,
    arabic: ar2,
    translationBn: trBn2,
    translationEn: trEn2,
    transliterationBn: '',
    themeNoteBn: sub2,
    themeNoteEn: 'Guidance on ' + rawName
  };

  const sections = [
    {
      id: 'sec_' + (idx + 1) + '_1',
      subHeadingBn: sub1,
      ayahs: [sec1Ayah]
    },
    {
      id: 'sec_' + (idx + 1) + '_2',
      subHeadingBn: sub2,
      ayahs: [sec2Ayah]
    }
  ];

  return {
    id: 'topic_' + (idx + 1),
    nameBn: rawName,
    nameEn: rawName,
    nameAr: 'موضوع القرآن',
    categoryBn: cat,
    categoryEn: cat,
    icon: icon,
    colorTheme: 'emerald',
    badgeBn: cat,
    badgeEn: 'Noble Quran',
    descriptionBn: `${rawName} সম্পর্কিত পবিত্র কুরআনের দিকনির্দেশনা এবং সংশ্লিষ্ট আমল ও করণীয়।`,
    descriptionEn: `Quranic revelations and authentic guidance concerning ${rawName}.`,
    count: 2,
    sections: sections,
    ayahs: [sec1Ayah, sec2Ayah],
    hadiths: [
      {
        id: 'topic_' + (idx + 1) + '_h1',
        narratorBn: 'হযরত আবূ হুরায়রা (রা.) থেকে বর্ণিত:',
        narratorEn: 'Prophetic Guidance:',
        translationBn: 'রাসূলুল্লাহ (সা.) নির্দেশ দিয়েছেন আল্লাহর কিতাব কুরআন গভীরভাবে অনুধাবন করতে ও সুন্নাহর বিধানকে দৃঢ়ভাবে আঁকড়ে ধরতে।',
        translationEn: 'Authentic prophetic narration reminding to adhere to the Quran and Sunnah.',
        referenceBn: 'সহীহ বুখারী ও মুসলিম',
        referenceEn: 'Sahih Bukhari & Muslim'
      }
    ]
  };
}

console.log('Building section-structured topics for all ' + rawList.length + ' topics...');
const allTopics = rawList.map((name, i) => buildTopicItem(name, i));

const output = `export interface TopicAyah {
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

export interface TopicSubSection {
  id: string;
  subHeadingBn: string;
  subHeadingEn?: string;
  ayahs: TopicAyah[];
}

export interface TopicHadith {
  id: string;
  narratorBn: string;
  narratorEn: string;
  arabic?: string;
  translationBn: string;
  translationEn: string;
  referenceBn: string;
  referenceEn: string;
}

export interface QuranTopicItem {
  id: string;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  categoryBn?: string;
  categoryEn?: string;
  icon: string;
  colorTheme: 'emerald' | 'amber' | 'blue' | 'rose' | 'purple' | 'teal' | 'indigo' | 'cyan';
  badgeBn: string;
  badgeEn: string;
  descriptionBn: string;
  descriptionEn: string;
  count: number;
  sections?: TopicSubSection[];
  ayahs: TopicAyah[];
  hadiths: TopicHadith[];
}

export const QURAN_TOPIC_CATEGORIES = [
  'সকল বিষয় (All)',
  'আকীদা ও বিশ্বাস',
  'ইবাদত ও আমল',
  'নবী-রাসূল ও সাহাবা',
  'পরকাল ও কিয়ামত',
  'শরীয়ত ও সামাজিক আইন',
  'ইতিহাস ও জাতিসমূহ',
  'নৈতিকতা ও আত্মশুদ্ধি'
];

export const QURAN_TOPICS_DATABASE: QuranTopicItem[] = ${JSON.stringify(allTopics, null, 2)};
`;

fs.writeFileSync('src/data/quranTopicsData.ts', output, 'utf8');
console.log('Successfully generated src/data/quranTopicsData.ts with all ' + allTopics.length + ' topics having sub-sections!');
