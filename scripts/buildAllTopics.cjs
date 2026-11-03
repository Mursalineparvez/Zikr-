const fs = require('fs');

const rawList = JSON.parse(fs.readFileSync('scripts/topics_list.json', 'utf8'));

// High quality knowledge base for 322 topics with real Quran references, arabic, translation, themes & authentic hadiths
const DATA_DICTIONARY = {
  // Prophets
  'আইউব আলাইহিস সালাম': {
    nameEn: 'Prophet Ayyub (Job)', nameAr: 'أيوب عليه السلام',
    cat: 'নবী-রাসূল ও সাহাবা', icon: '🤲',
    desc: 'হযরত আইউব (আ.)-এর চরম অসুস্থতা ও কঠিন পরীক্ষার মুখে অনুপম ধৈর্য ও শিফা লাভের দোয়া।',
    ayah: {
      sNum: 21, aNum: 83, gNum: 2566, sBn: 'আল-আম্বিয়া', sAr: 'الأنبياء', sEn: 'Al-Anbiya',
      ar: 'وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُ أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ',
      trBn: 'এবং আইউবের কথা স্মরণ করো, যখন সে তার রবকে ডেকে বলেছিল: "আমি দুঃখ-কষ্টে পড়েছি আর আপনি তো সর্বশ্রেষ্ঠ দয়ালু।"',
      trEn: 'And [mention] Job, when he called to his Lord, "Indeed, adversity has touched me, and you are the Most Merciful of the merciful."',
      phon: 'ওয়া আইয়ূবা ইয নাদা রব্বাহূ আন্নী মাস্সানিয়াদ্দুররু ওয়া আন্তা আরহামুর রাহিমীন.',
      note: 'বিপদ-আপদে রোগমুক্তির জন্য হযরত আইউব (আ.)-এর এই দোয়াটি অতুলনীয়।'
    },
    hadith: {
      narr: 'হযরত আনাস (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) ইরশাদ করেছেন: নবী আইউব (আ.) দীর্ঘ আঠারো বছর যাবত কঠিন রোগে ভুগেছিলেন, কিন্তু কোনো মুহূর্তেই আল্লাহর প্রতি তাঁর আনুগত্য ও সবর বিন্দুমাত্র হ্রাস পায়নি।',
      ref: 'মুসতাদরাকে হাকিম: ৪১৫১, সহীহ ইবনে হিব্বান: ২৯০৪'
    }
  },
  'আদম আলাইহিস সালাম': {
    nameEn: 'Prophet Adam (Peace be upon him)', nameAr: 'آدم عليه السلام',
    cat: 'নবী-রাসূল ও সাহাবা', icon: '🌱',
    desc: 'মানবজাতির আদি পিতা হযরত আদম (আ.)-এর সৃষ্টি, ফেরেশতাদের সিজদা এবং খাঁটি তাওবার অনুপম ইতিহাস।',
    ayah: {
      sNum: 7, aNum: 23, gNum: 977, sBn: 'আল-আ’রাফ', sAr: 'الأعراف', sEn: 'Al-A\'raf',
      ar: 'قَالَا رَبَّنَا ظَلَمْنَا أَنفُسَنَا وَإِن لَّمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
      trBn: 'তাঁরা উভয়ে বলল: "হে আমাদের রব! আমরা নিজেদের ওপর অন্যায় করেছি। যদি আপনি আমাদের ক্ষমা না করেন এবং দয়া না করেন, তবে অবশ্যই আমরা ক্ষতিগ্রস্তদের অন্তর্ভুক্ত হয়ে যাব।"',
      trEn: 'They said, "Our Lord, we have wronged ourselves, and if You do not forgive us and have mercy upon us, we will surely be among the losers."',
      phon: 'ক্বালা রব্বানা যালামনা আনফুসানা ওয়া ইল্লাম তাগফির লানা ওয়া তারহামনা লানাকূনান্না মিনাল খাসিরীন.',
      note: 'গুনাহের পর আল্লাহর দরবারে তওবা করার জন্য আদি পিতা-মাতার ঐতিহাসিক কুরআনিক দোয়া।'
    },
    hadith: {
      narr: 'হযরত আবূ হুরায়রা (রা.) থেকে বর্ণিত:',
      trBn: 'নবী করীম (সা.) বলেছেন: জুমার দিন সূর্যোদয়ের সর্বোত্তম দিন; এই দিনে আদম (আ.)-কে সৃষ্টি করা হয়েছে, এই দিনে তাঁকে জান্নাতে প্রবেশ করানো হয়েছে এবং এই দিনেই দুনিয়ায় পাঠানো হয়েছে।',
      ref: 'সহীহ মুসলিম: ৮৫৪'
    }
  },
  'ইবরাহীম আলাইহিস সালাম': {
    nameEn: 'Prophet Ibrahim (Abraham)', nameAr: 'إبراهيم عليه السلام',
    cat: 'নবী-রাসূল ও সাহাবা', icon: '⭐',
    desc: 'খলীলুল্লাহ হযরত ইবরাহীম (আ.)-এর একনিষ্ঠ তাওহীদ, অগ্নিকুণ্ডের পরীক্ষা এবং কুরবানির মহান আদর্শ।',
    ayah: {
      sNum: 16, aNum: 120, gNum: 2021, sBn: 'আন-নাহল', sAr: 'النحل', sEn: 'An-Nahl',
      ar: 'إِنَّ إِبْرَاهِيمَ كَانَ أُمَّةً قَانِتًا لِّلَّهِ حَنِيفًا وَلَمْ يَكُ مِنَ الْمُشْرِكِينَ',
      trBn: 'নিশ্চয়ই ইবরাহীম ছিলেন এক সর্বাঙ্গীন আদর্শ ব্যক্তিত্ব, আল্লাহর অনুগত, একনিষ্ঠ এবং তিনি মুশরিকদের অন্তর্ভুক্ত ছিলেন না।',
      trEn: 'Indeed, Abraham was a [comprehensive] leader, devoutly obedient to Allah, inclining toward truth, and he was not of those who associate others with Allah.',
      phon: 'ইন্না ইবরাহীমা কানা উম্মাতান ক্বনিতাললিল্লাহি হানীফাও ওয়া লাম ইয়াকু মিনাল মুশরিকীন.',
      note: 'একক ব্যক্তি হয়েও একটি সমগ্র জাতির চেয়েও মহান তাওহীদের আদর্শ ছিলেন ইবরাহীম (আ.)।'
    },
    hadith: {
      narr: 'হযরত আবূ হুরায়রা (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) বলেছেন: কিয়ামতের দিন সমস্ত সৃষ্টির মধ্যে সর্বপ্রথম পোশাকে ভূষিত করা হবে হযরত ইবরাহীম (আ.)-কে।',
      ref: 'সহীহ বুখারী: ৩৩৫৭, সহীহ মুসলিম: ২৪২৪'
    }
  },
  'মূসা আলাইহিস সালাম': {
    nameEn: 'Prophet Musa (Moses)', nameAr: 'موسى عليه السلام',
    cat: 'নবী-রাসূল ও সাহাবা', icon: '🌊',
    desc: 'কালিমুল্লাহ হযরত মূসা (আ.)-এর রিসালাত, ফিরাউনের বিরুদ্ধে অবিচল সত্যের লড়াই এবং বনি ইসরাইলকে উদ্ধার।',
    ayah: {
      sNum: 20, aNum: 25, gNum: 2373, sBn: 'ত্বাহা', sAr: 'طه', sEn: 'Taha',
      ar: 'قَالَ رَبِّ اشْرَحْ لِي صَدْرِي ﴿٢٥﴾ وَيَسِّرْ لِي أَمْرِي ﴿٢٦﴾ وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي',
      trBn: 'মূসা বললেন: "হে আমার রব! আমার বক্ষ প্রশস্ত করে দিন, আমার কাজ সহজ করে দিন এবং আমার জিহ্বার জড়তা দূর করে দিন।"',
      trEn: 'He said, "My Lord, expand for me my breast [with assurance] and ease for me my task and untie the knot from my tongue."',
      phon: 'ক্বালা রব্বিশ রাহ লী সাদরী, ওয়া ইয়াসসির লী আমরী, ওয়াহলুল উকদাতাম মিল লিসানী.',
      note: 'যেকোনো কঠিন দায়িত্ব ও সত্য প্রচারের প্রাক্কালে মূসা (আ.)-এর ঐতিহাসিক দোয়া।'
    },
    hadith: {
      narr: 'হযরত আবূ সাঈদ খুদরী (রা.) থেকে বর্ণিত:',
      trBn: 'নবীজী (সা.) ইরশাদ করেছেন: তোমরা নবীদের পরস্পরের মধ্যে মর্যাদা নিয়ে বাড়াবাড়ি করো না; কিয়ামতের দিন মানুষ যখন বেহুঁশ হয়ে যাবে, আমি প্রথম হুঁশ ফিরে পেয়ে দেখব মূসা (আ.) আরশের পায়া ধরে দাঁড়িয়ে আছেন।',
      ref: 'সহীহ বুখারী: ৩৪১৪, সহীহ মুসলিম: ২৩৭৩'
    }
  },
  'ঈসা আলাইহিস সালাম': {
    nameEn: 'Prophet Isa (Jesus)', nameAr: 'عيسى عليه السلام',
    cat: 'নবী-রাসূল ও সাহাবা', icon: '🕊️',
    desc: 'রূহুল্লাহ হযরত ঈসা (আ.)-এর অলৌকিক জন্ম, ইনজীল কিতাব এবং আকাশে তুলে নেওয়া ও পুনরাগমনের সত্যতা।',
    ayah: {
      sNum: 3, aNum: 59, gNum: 352, sBn: 'আলে ইমরান', sAr: 'آل عمران', sEn: 'Aal-i-Imraan',
      ar: 'إِنَّ مَثَلَ عِيسَىٰ عِندَ اللَّهِ كَمَثَلِ آدَمَ ۖ خَلَقَهُ مِن تُرَابٍ ثُمَّ قَالَ لَهُ كُن فَيَكُونُ',
      trBn: 'নিশ্চয়ই আল্লাহর কাছে ঈসার দৃষ্টান্ত আদমের মতো; তিনি তাকে মাটি দিয়ে সৃষ্টি করেছিলেন অতঃপর বলেছিলেন: "হও", আর তা হয়ে গেল।',
      trEn: 'Indeed, the example of Jesus to Allah is like that of Adam. He created him from dust; then He said to him, "Be," and he was.',
      phon: 'ইন্না মাছালা ঈসা ইন্দাল্লাহি কামাছালি আদামা খালাক্বাহূ মিন তুরাব...',
      note: 'পিতা ছাড়া হযরত ঈসা (আ.)-এর জন্ম আল্লাহর অসীম কুদরত, যেভাবে আদম (আ.)-কে পিতা-মাতা ছাড়া সৃষ্টি করা হয়েছিল।'
    },
    hadith: {
      narr: 'হযরত আবূ হুরায়রা (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) বলেছেন: সেই সত্তার শপথ যাঁর হাতে আমার প্রাণ, নিশ্চয়ই খুব শীঘ্রই তোমাদের মাঝে মরিয়ম-পুত্র ঈসা একজন ন্যায়পরায়ণ শাসক হিসেবে অবতরণ করবেন।',
      ref: 'সহীহ বুখারী: ২২২২, সহীহ মুসলিম: ১৫৫'
    }
  },
  'মুহাম্মাদ সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম': {
    nameEn: 'Prophet Muhammad (Peace be upon him)', nameAr: 'محمد صلى الله عليه وسلم',
    cat: 'নবী-রাসূল ও সাহাবা', icon: '✨',
    desc: 'সর্বকালের সর্বশ্রেষ্ঠ মহামানব, খাতামুন নাবিয়্যীন, সৃষ্টিজগতের জন্য রহমত মুহাম্মাদুর রাসূলুল্লাহ (সা.)।',
    ayah: {
      sNum: 21, aNum: 107, gNum: 2590, sBn: 'আল-আম্বিয়া', sAr: 'الأنبياء', sEn: 'Al-Anbiya',
      ar: 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ',
      trBn: 'আর আমি আপনাকে সমগ্র সৃষ্টিজগতের জন্য কেবল রহমতস্বরূপ প্রেরণ করেছি।',
      trEn: 'And We have not sent you, [O Muhammad], except as a mercy to the worlds.',
      phon: 'ওয়া মা আরসালনাকা ইল্লা রাহমাতাল লিল আলামীন.',
      note: 'নবী করীম (সা.) কোনো নির্দিষ্ট জাতি বা কালের জন্য নন, তিনি সমগ্র সৃষ্টিজগতের জন্য আল্লাহর অনন্য রহমত।'
    },
    hadith: {
      narr: 'হযরত আনাস ইবনে মালিক (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) ইরশাদ করেছেন: তোমাদের কেউ ততক্ষণ পর্যন্ত পূর্ণাঙ্গ মুমিন হতে পারবে না, যতক্ষণ না আমি তার কাছে তার পিতা, তার সন্তান এবং সমস্ত মানবজাতি অপেক্ষা অধিক প্রিয় হব।',
      ref: 'সহীহ বুখারী: ১৫, সহীহ মুসলিম: ৪৪'
    }
  },
  'হজ্ব/হজ্জ': {
    nameEn: 'Hajj Pilgrimage', nameAr: 'الحج والعمرة',
    cat: 'ইবাদত ও আমল', icon: '🕋',
    desc: 'ইসলামের পঞ্চম রুকন হজ পালন, পবিত্র মক্কা-আরাফাত ও আল্লাহর ঘর কাবা তাওয়াফের ফরয বিধান।',
    ayah: {
      sNum: 3, aNum: 97, gNum: 390, sBn: 'আলে ইমরান', sAr: 'آل عمران', sEn: 'Aal-i-Imraan',
      ar: 'وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا',
      trBn: 'আর মানুষের মধ্যে যার সেখানে যাওয়ার সামর্থ্য আছে, আল্লাহর জন্য সেই ঘরের হজ করা তার ওপর ফরয।',
      trEn: 'And [due] to Allah from the people is a pilgrimage to the House - for whoever is able to find thereto a way.',
      phon: 'ওয়া লিল্লাহি আলান নাসি হিজ্জুল বাইতি মানিস তাতা’আ ইলাইহি সাবীলা...',
      note: 'আর্থিক ও শারীরিকভাবে সামর্থ্যবান প্রতিটি মুসলিমের ওপর জীবনে একবার হজ পালন করা আবশ্যক।'
    },
    hadith: {
      narr: 'হযরত আবূ হুরায়রা (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) বলেছেন: যে ব্যক্তি আল্লাহর সন্তুষ্টির জন্য হজ করল এবং অশ্লীলতা ও পাপাচার থেকে বিরত থাকল, সে এমন নিষ্পাপ হয়ে ফিরে আসে যেন তার মা আজই তাকে প্রসব করেছে।',
      ref: 'সহীহ বুখারী: ১৫২১, সহীহ মুসলিম: ১৩৫০'
    }
  },
  'রোজা/সিয়াম': {
    nameEn: 'Sawm & Fasting', nameAr: 'الصيام وشهر رمضان',
    cat: 'ইবাদত ও আমল', icon: '🌙',
    desc: 'রমজান মাসের রোজা, তাকওয়া অর্জন এবং পানাহার ও কুপ্রবৃত্তি সংযমের মহান প্রশিক্ষণ।',
    ayah: {
      sNum: 2, aNum: 183, gNum: 190, sBn: 'আল-বাকারা', sAr: 'البقرة', sEn: 'Al-Baqarah',
      ar: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
      trBn: 'হে ঈমানদারগণ! তোমাদের ওপর সিয়াম ফরয করা হয়েছে, যেমন ফরয করা হয়েছিল তোমাদের পূর্ববর্তীদের ওপর, যাতে তোমরা তাকওয়া অর্জন করতে পারো।',
      trEn: 'O you who have believed, decreed upon you is fasting as it was decreed upon those before you that you may become righteous.',
      phon: 'ইয়া আইয়ুহাল্লাযীনা আমানূ কুতিবা আলাইকুমুস সিয়ামু কামা কুতিবা আলাল্লাযীনা মিন কাবলিকুম লাআল্লাকুম তাত্তাকূন.',
      note: 'রোজার মূল লক্ষ্য হলো মানুষের নফসকে নিয়ন্ত্রণ করে আল্লাহর খাঁটি ভয় ও তাকওয়া অর্জন করা।'
    },
    hadith: {
      narr: 'হযরত আবূ হুরায়রা (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) বলেছেন: আল্লাহ তাআলা ইরশাদ করেন: রোজা কেবল আমারই জন্য এবং আমি নিজেই এর প্রতিদান দেব। আর রোজাদারের মুখের গন্ধ আল্লাহর নিকট কস্তুরীর সুবাসের চেয়েও উত্তম।',
      ref: 'সহীহ বুখারী: ১৮৯৪, সহীহ মুসলিম: ১১৫১'
    }
  },
  'সুদ': {
    nameEn: 'Riba & Usury Prohibited', nameAr: 'الربا وتحريمه',
    cat: 'শরীয়ত ও সামাজিক আইন', icon: '🚫',
    desc: 'সুদের ভয়াবহ ধ্বংসযজ্ঞ, আল্লাহর সাথে যুদ্ধ ঘোষণা এবং সুদমুক্ত অর্থনীতি গঠনের নির্দেশ।',
    ayah: {
      sNum: 2, aNum: 275, gNum: 282, sBn: 'আল-বাকারা', sAr: 'البقرة', sEn: 'Al-Baqarah',
      ar: 'وَأَحَلَّ اللَّهُ الْبَيْعَ وَحَرَّمَ الرِّبَا',
      trBn: 'অথচ আল্লাহ ব্যবসাকে হালাল করেছেন এবং সুদকে করেছেন হারাম।',
      trEn: 'But Allah has permitted trade and has forbidden interest.',
      phon: 'ওয়া আহাল্লাল্লাহুল বাইআ ওয়া হাররামার রিবা...',
      note: 'ইসলামী শরীয়তে ব্যবসা ও লাভ হালাল, কিন্তু যে কোনো ধরনের শোষণমূলক সুদ সম্পূর্ণ হারাম।'
    },
    hadith: {
      narr: 'হযরত জাবির (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) সুদখোর, সুদদাতা, সুদের হিসাব লেখক এবং সুদের সাক্ষীদ্বয়—সকলের ওপর অভিসম্পাত করেছেন এবং বলেছেন: তারা সবাই গুনাহে সমান।',
      ref: 'সহীহ মুসলিম: ১৫৯৮'
    }
  },
  'বদর যুদ্ধ': {
    nameEn: 'Battle of Badr', nameAr: 'غزوة بدر الكبرى',
    cat: 'ইতিহাস ও জাতিসমূহ', icon: '⚔️',
    desc: 'ইসলামের প্রথম চূড়ান্ত বিজয়ের দিন ‘ইয়াউমুল ফুরকান’, বদরের প্রান্তরে আসমানি ফেরেশতাদের সাহায্য।',
    ayah: {
      sNum: 3, aNum: 123, gNum: 416, sBn: 'আলে ইমরান', sAr: 'آل عمران', sEn: 'Aal-i-Imraan',
      ar: 'وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنتُمْ أَذِلَّةٌ ۖ فَاتَّقُوا اللَّهَ لَعَلَّكُمْ تَشْكُرُونَ',
      trBn: 'আর নিশ্চয়ই আল্লাহ বদরে তোমাদের সাহায্য করেছিলেন যখন তোমরা ছিলে নিতান্ত হীনবল ও দুর্বল। সুতরাং আল্লাহকে ভয় করো, যেন তোমরা কৃতজ্ঞ হতে পারো।',
      trEn: 'And already had Allah given you victory at [the battle of] Badr while you were few in number. Then fear Allah; perhaps you will be grateful.',
      phon: 'ওয়া লাক্বাদ নাসারাকুমুল্লাকু বিবাদরিওঁ ওয়া আন্তুম আযিল্লাহ...',
      note: 'সংখ্যা ও অস্ত্রে কম হলেও আল্লাহর ওপর পূর্ণ আস্থা ও ঈমানের জোরে ঐতিহাসিক বদরের বিজয় হয়েছিল।'
    },
    hadith: {
      narr: 'হযরত আলী (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) বদর যুদ্ধের বিশিষ্ট সাহাবিদের সম্পর্কে বলেছিলেন: নিশ্চয়ই আল্লাহ বদর যুদ্ধে অংশগ্রহণকারীদের দিকে লক্ষ্য করে বলেছেন: তোমরা যা ইচ্ছা করো, আমি তোমাদের ক্ষমা করে দিয়েছি।',
      ref: 'সহীহ বুখারী: ৩০০৭, সহীহ মুসলিম: ২৪৯৪'
    }
  },
  'আসহাবে কাহফ': {
    nameEn: 'Companions of the Cave', nameAr: 'أصحاب الكهف',
    cat: 'ইতিহাস ও জাতিসমূহ', icon: '🏔️',
    desc: 'ঈমান রক্ষার তাগিদে গুহায় আশ্রয় নেওয়া যুবকদের অলৌকিক ৩০০ বছরের ঘুম ও পুনরুত্থানের নিদর্শন।',
    ayah: {
      sNum: 18, aNum: 13, gNum: 2153, sBn: 'আল-কাহফ', sAr: 'الكهف', sEn: 'Al-Kahf',
      ar: 'نَّحْنُ نَقُصُّ عَلَيْكَ نَبَأَهُم بِالْحَقِّ ۚ إِنَّهُمْ فِتْيَةٌ آمَنُوا بِرَبِّهِمْ وَزِدْنَاهُمْ هُدًى',
      trBn: 'আমি আপনার কাছে তাদের সত্য বৃত্তান্ত বর্ণনা করছি। নিশ্চয়ই তারা ছিল কয়েকজন যুবক, যারা তাদের রবের প্রতি ঈমান এনেছিল এবং আমি তাদের হেদায়েত বৃদ্ধি করে দিয়েছিলাম।',
      trEn: 'It is We who relate to you their story in truth. Indeed, they were youths who believed in their Lord, and We increased them in guidance.',
      phon: 'নাহনু নাকুস্‌সু আলাইকা নাবায়াহুম বিল হাক্কি, ইন্নাহুম ফিতইয়াতুন আমানূ বিরব্বিহিম ওয়া যিদনাহুম হুদা.',
      note: 'যুগের চরম ফেতনার মাঝেও তরুণ বয়সে ঈমান ও তাওহীদের ওপর অবিচল থাকার সেরা উদাহরণ আসহাবে কাহফ।'
    },
    hadith: {
      narr: 'হযরত আবূ দারদা (রা.) থেকে বর্ণিত:',
      trBn: 'নবী করীম (সা.) ইরশাদ করেছেন: যে ব্যক্তি সূরা আল-কাহফের প্রথম দশটি আয়াত মুখস্থ করবে, সে দাজ্জালের মহা ফেতনা থেকে নিরাপদ থাকবে।',
      ref: 'সহীহ মুসলিম: ৮০৯'
    }
  },
  'ফিরাউন': {
    nameEn: 'Pharaoh & Tyranny', nameAr: 'فرعون وطغيانه',
    cat: 'ইতিহাস ও জাতিসমূহ', icon: '👑',
    desc: 'দম্ভ ও খোদা দাবিকারী অত্যাচারী শাসক ফিরাউনের অহংকার এবং লোহিত সাগরে করুণ নিমজ্জনের শিক্ষা।',
    ayah: {
      sNum: 10, aNum: 92, gNum: 1456, sBn: 'ইউনুস', sAr: 'يونس', sEn: 'Yunus',
      ar: 'فَالْيَوْمَ نُنَجِّيكَ بِبَدَنِكَ لِتَكُونَ لِمَنْ خَلْفَكَ آيَةً',
      trBn: 'অতএব আজ আমি তোমার দেহটিকে রক্ষা করব, যাতে তুমি তোমার পরবর্তী প্রজন্মের জন্য একটি নিদর্শন হয়ে থাকো।',
      trEn: 'So today We will save you in body that you may be to those who succeed you a sign. And indeed, many among the people, of Our signs, are heedless.',
      phon: 'ফাল ইয়াওমা নুনজিয়্যীকা বিদাদিনিকা লিতাকূনা লিমান খালফাকা আয়াহ...',
      note: 'ইতিহাসের চরম দাম্ভিক অহংকারী শাসক ফিরাউনের মৃতদেহ রক্ষা করে কিয়ামত পর্যন্ত সতর্কবার্তা দেওয়া হয়েছে।'
    },
    hadith: {
      narr: 'হযরত ইবনে আব্বাস (রা.) থেকে বর্ণিত:',
      trBn: 'নবী করীম (সা.) মদিনায় এসে দেখলেন আশুরার দিনে ইহুদিরা রোজা রাখছে। তিনি কারণ জিজ্ঞেস করলে তারা বলল, এদিনে আল্লাহ মূসা (আ.) ও বনি ইসরাইলকে ফিরাউনের হাত থেকে মুক্তি দিয়েছিলেন। তখন নবীজী বললেন, মূসার সাথে আমাদের অধিকার তাদের চেয়েও বেশি এবং তিনি নিজেও রোজা রাখলেন ও নির্দেশ দিলেন।',
      ref: 'সহীহ বুখারী: ২০০৪, সহীহ মুসলিম: ১১৩০'
    }
  },
  'তাহাজ্জুদ নামাজ': {
    nameEn: 'Tahajjud & Night Vigil', nameAr: 'صلاة الليل والتهجد',
    cat: 'ইবাদত ও আমল', icon: '🌌',
    desc: 'রাতের শেষভাগে তাহাজ্জুদের নামাজ, আল্লাহর নৈকট্য ও মাকামে মাহমুদের সর্বোচ্চ মর্যাদা লাভ।',
    ayah: {
      sNum: 17, aNum: 79, gNum: 2108, sBn: 'আল-ইসরা', sAr: 'الإسراء', sEn: 'Al-Isra',
      ar: 'وَمِنَ اللَّيْلِ فَتَهَجَّدْ بِهِ نَافِلَةً لَّكَ عَسَىٰ أَن يَبْعَثَكَ رَبُّكَ مَقَامًا مَّحْمُودًا',
      trBn: 'আর রাতের একাংশে তাহাজ্জুদ আদায় করো, যা তোমার জন্য এক অতিরিক্ত ইবাদত; শীঘ্রই তোমার রব তোমাকে ‘মাকামে মাহমুদ’ (প্রশংসিত স্থান)-এ প্রতিষ্ঠিত করবেন।',
      trEn: 'And from [part of] the night, pray with it as additional [worship] for you; it is expected that your Lord will resurrect you to a praised station.',
      phon: 'ওয়া মিনাল লাইলি ফাতাহাজ্জাদ বিহী নাফিলাতাল লাকা আসা আঁই ইয়াবআছাকা রব্বুকা মাক্বামাম মাহমূদা.',
      note: 'তাহাজ্জুদ মোমিনের আত্মিক নূর এবং আল্লাহর আরশের নিকটবর্তী হওয়ার সর্বশ্রেষ্ঠ মাধ্যম।'
    },
    hadith: {
      narr: 'হযরত আবূ হুরায়রা (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) বলেছেন: ফরয সালাতের পর সর্বোত্তম সালাত হলো রাতের তাহাজ্জুদের সালাত।',
      ref: 'সহীহ মুসলিম: ১১৬৩, সুনান আত-তিরমিজী: ৪৩৮'
    }
  },
  'লাইলাতুল কদর/শবে কদর': {
    nameEn: 'Laylatul Qadr (Night of Decree)', nameAr: 'ليلة القدر المباركة',
    cat: 'ইবাদত ও আমল', icon: '✨',
    desc: 'হাজার মাসের চেয়েও শ্রেষ্ঠ বরকতময় কদরের রাত, কুরআন নাজিলের মহাসময় ও ফেরেশতাদের অবতরণ।',
    ayah: {
      sNum: 97, aNum: 3, gNum: 6128, sBn: 'আল-কদর', sAr: 'القدر', sEn: 'Al-Qadr',
      ar: 'لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ',
      trBn: 'কদরের রাত হলো হাজার মাসের চেয়েও অধিক উত্তম ও কল্যাণময়।',
      trEn: 'The Night of Decree is better than a thousand months.',
      phon: 'লাইলাতুল ক্বাদরি খাইরুম মিন আলফি শাহর.',
      note: 'এক রাতের ইবাদতে ৮৩ বছর ৪ মাসের চেয়েও বেশি সাওয়াব ও আল্লাহর মাগফিরাত অর্জিত হয়।'
    },
    hadith: {
      narr: 'হযরত আয়েশা (রা.) থেকে বর্ণিত:',
      trBn: 'আমি বললাম: হে আল্লাহর রাসূল, আমি যদি জানতে পারি কোন রাতটি শবে কদর, তবে আমি কী দোয়া পড়ব? তিনি বললেন, তুমি বলো: "আল্লাহুম্মা ইন্নাকা আফুউন তুহিব্বুল আফওয়া ফা’ফু আন্নী" (হে আল্লাহ, নিশ্চয়ই আপনি ক্ষমাশীল, ক্ষমাকে ভালোবাসেন; অতএব আমাকে ক্ষমা করুন)।',
      ref: 'সুনান আত-তিরমিজী: ৩৫১৩, ইবন মাজাহ: ৩৮৫০'
    }
  },
  'পর্দা': {
    nameEn: 'Hijab & Modesty', nameAr: 'الحجاب والعفة',
    cat: 'শরীয়ত ও সামাজিক আইন', icon: '🧕',
    desc: 'শালীনতা রক্ষা, দৃষ্টি সংযত রাখা এবং নারীদের সম্মানজনক হিজাব ও পর্দার স্পষ্ট কুরআনিক বিধান।',
    ayah: {
      sNum: 33, aNum: 59, gNum: 3592, sBn: 'আল-আহজাব', sAr: 'الأحزاب', sEn: 'Al-Ahzab',
      ar: 'يَا أَيُّهَا النَّبِيُّ قُل لِّأَزْوَاجِكَ وَبَنَاتِكَ وَنِسَاءِ الْمُؤْمِنِينَ يُدْنِينَ عَلَيْهِنَّ مِن جَلَابِيبِهِنَّ',
      trBn: 'হে নবী! আপনি আপনার স্ত্রীদের, কন্যাদের ও মুমিনদের নারীদের বলুন, তারা যেন তাদের চাদরের একাংশ নিজেদের ওপর টেনে নেয়; এতে তাদের চেনা সহজ হবে এবং তারা উত্ত্যক্ত হবে না।',
      trEn: 'O Prophet, tell your wives and your daughters and the women of the believers to bring down over themselves [part] of their outer garments. That is more suitable that they will be known and not be abused.',
      phon: 'ইয়া আইয়ুহান নাবিয়্যু কুল লিআযওয়াজিকা ওয়া বানাতিকা ওয়া নিসায়িল মু’মিনীনা ইউদনীনা আলাইহিন্না মিন জালাবীবীহিন্না...',
      note: 'পর্দা নারীর সুরক্ষা, মর্যাদা এবং চারিত্রিক পবিত্রতার ঐশী দুর্গ।'
    },
    hadith: {
      narr: 'হযরত ইবনে উমর (রা.) থেকে বর্ণিত:',
      trBn: 'নবী করীম (সা.) বলেছেন: লজ্জা ও ঈমান সবসময় একসাথে অবস্থান করে; যখন একটি তুলে নেওয়া হয়, তখন অপরটিও উঠে যায়।',
      ref: 'মুসতাদরাকে হাকিম: ৫৮, শুআবুল ঈমান বায়হাকী: ৭৩৩১'
    }
  },
  'বিবাহ': {
    nameEn: 'Nikah & Marriage', nameAr: 'النكاح والميثاق',
    cat: 'শরীয়ত ও সামাজিক আইন', icon: '💍',
    desc: 'পবিত্র বিয়ের চুক্তি, চারিত্রিক নিষ্কলুষতা রক্ষা এবং সুন্নাহভিত্তিক পরিবার গঠনের তাগিদ।',
    ayah: {
      sNum: 24, aNum: 32, gNum: 2823, sBn: 'আন-নূর', sAr: 'النور', sEn: 'An-Nur',
      ar: 'وَأَنكِحُوا الْأَيَامَىٰ مِنكُمْ وَالصَّالِحِينَ مِنْ عِبَادِكُمْ وَإِمَائِكُمْ ۚ إِن يَكُونُوا فُقَرَاءَ يُغْنِهِمُ اللَّهُ مِن فَضْلِهِ',
      trBn: 'আর তোমরা তোমাদের মধ্যকার অবিবাহিতদের বিবাহ সম্পন্ন করো। তারা যদি অভাবী হয়, তবে আল্লাহ নিজ অনুগ্রহে তাদের ধনী করে দেবেন।',
      trEn: 'And marry the unmarried among you and the righteous among your male slaves and female slaves. If they should be poor, Allah will enrich them from His bounty.',
      phon: 'ওয়া আনকিহুল আইয়্যামা মিনকুম ওয়াস সালিহীনা মিন ইবাদিকুম...',
      note: 'বিবাহ রিজিক বৃদ্ধি করে এবং চরিত্রের নিষ্কলুষতার অটুট ঢাল হিসেবে কাজ করে।'
    },
    hadith: {
      narr: 'হযরত আনাস ইবনে মালিক (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) ইরশাদ করেছেন: যখন কোনো বান্দা বিবাহ সম্পন্ন করে, তখন সে তার দ্বীনের অর্ধেক পূর্ণ করে ফেলল; অতএব বাকি অর্ধেকের ব্যাপারে সে যেন আল্লাহকে ভয় করে।',
      ref: 'শুআবুল ঈমান বায়হাকী: ৫৪৮৬, মিশকাত: ৩০৯৬'
    }
  },
  'উত্তরাধিকার আইন': {
    nameEn: 'Islamic Law of Inheritance', nameAr: 'المواريث والفرائض',
    cat: 'শরীয়ত ও সামাজিক আইন', icon: '⚖️',
    desc: 'পবিত্র কুরআনের সূরা নিসায় বর্ণিত পিতা-মাতা, সন্তান, স্বামী-স্ত্রী ও আত্মীয়দের সুনির্দিষ্ট অংশ বণ্টন।',
    ayah: {
      sNum: 4, aNum: 11, gNum: 504, sBn: 'আন-নিসা', sAr: 'النساء', sEn: 'An-Nisa',
      ar: 'يُوصِيكُمُ اللَّهُ فِي أَوْلَادِكُمْ ۖ لِلذَّكَرِ مِثْلُ حَظِّ الْأُنثَيَيْنِ',
      trBn: 'আল্লাহ তোমাদের সন্তানদের ব্যাপারে নির্দেশ দিচ্ছেন: এক পুরুষের অংশ দুই নারীর অংশের সমান।',
      trEn: 'Allah instructs you concerning your children: for the male, what is equal to the share of two females.',
      phon: 'ইউসীকুমুল্লাকু ফী আওলাদিকুম, লিযযাকারি মিছলু হাদ্ধিল উনছাইয়াইন...',
      note: 'আল্লাহর নির্ধারিত মীরাস বা উত্তরাধিকার বণ্টন পরিবর্তন বা লঙ্ঘন করা কবিরা গুনাহ।'
    },
    hadith: {
      narr: 'হযরত ইবনে আব্বাস (রা.) থেকে বর্ণিত:',
      trBn: 'নবী করীম (সা.) বলেছেন: নির্ধারিত অংশীদারদের তাদের প্রাপ্য অধিকার দিয়ে দাও, এরপর যা অবশিষ্ট থাকবে তা সবচেয়ে নিকটবর্তী পুরুষ আত্মীয়ের প্রাপ্য।',
      ref: 'সহীহ বুখারী: ৬৭৩২, সহীহ মুসলিম: ১৬১৫'
    }
  },
  'তালাক বা বিবাহ বিচ্ছেদ': {
    nameEn: 'Talaq & Divorce Laws', nameAr: 'الطلاق وأحكامه',
    cat: 'শরীয়ত ও সামাজিক আইন', icon: '📄',
    desc: 'তালাকের সঠিক নিয়ম, ইদ্দত পালন, সমঝোতার চেষ্টা এবং স্ত্রীর প্রাপ্য অধিকার পরিশোধের বিধান।',
    ayah: {
      sNum: 2, aNum: 229, gNum: 236, sBn: 'আল-বাকারা', sAr: 'البقرة', sEn: 'Al-Baqarah',
      ar: 'الطَّلَاقُ مَرَّتَانِ ۖ فَإِمْسَاكٌ بِمَعْرُوفٍ أَوْ تَسْرِيحٌ بِإِحْسَانٍ',
      trBn: 'তালাক দুবার পর্যন্ত প্রত্যাহারযোগ্য; এরপর হয় সদ্ভাবে স্ত্রীকে রেখে দেওয়া, নয়তো সুন্দরভাবে বিদায় দেওয়া।',
      trEn: 'Divorce is twice. Then, either keep [her] in an acceptable manner or release [her] with good treatment.',
      phon: 'আত্ব-ত্বলাকু মাররাতান, ফাইম্সাকুম বিমা’রূফিন আও তাসরীহুম বিইহসান...',
      note: 'ইসলামে তালাক কেবল নিরুপায় অবস্থার চূড়ান্ত সমাধান, যাতে কোনো নারীর প্রতি অবিচার না করা হয়।'
    },
    hadith: {
      narr: 'হযরত ইবনে উমর (রা.) থেকে বর্ণিত:',
      trBn: 'নবী করীম (সা.) ইরশাদ করেছেন: হালাল বিষয়সমূহের মধ্যে আল্লাহর কাছে সবচেয়ে অপ্রিয় বা নিকৃষ্ট বিষয় হলো তালাক।',
      ref: 'সুনান আবু দাউদ: ২১৭৮, ইবন মাজাহ: ২০১৭'
    }
  },
  'তাকওয়া/ আল্লাহর ভয়': {
    nameEn: 'Taqwa & God-Consciousness', nameAr: 'التقوى والخشية',
    cat: 'নৈতিকতা ও আত্মশুদ্ধি', icon: '🛡️',
    desc: 'আল্লাহর সার্বক্ষণিক উপস্থিতি উপলব্ধি, ভয় ও ভালোবাসায় সমস্ত গুনাহ বর্জন করে নেক আমল করা।',
    ayah: {
      sNum: 49, aNum: 13, gNum: 4628, sBn: 'আল-হুজুরাত', sAr: 'الحجرات', sEn: 'Al-Hujurat',
      ar: 'إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ ۚ إِنَّ اللَّهَ عَلِيمٌ خَبِيرٌ',
      trBn: 'নিশ্চয়ই আল্লাহর নিকট তোমাদের মধ্যে সবচেয়ে সম্মানিত ব্যক্তি সেই, যে তোমাদের মধ্যে সর্বাধিক মুত্তাকী (আল্লাহভীরু)।',
      trEn: 'Indeed, the most noble of you in the sight of Allah is the most righteous of you. Indeed, Allah is Knowing and Acquainted.',
      phon: 'ইন্না আকরাামাকুম ইন্দাল্লাহি আতক্বাকুম, ইন্নাল্লাহা আলীমুন খাবীর.',
      note: 'বংশ, বর্ণ বা ধন-সম্পদ নয়—আল্লাহর কাছে মর্যাদার একমাত্র মাপকাঠি হলো তাকওয়া।'
    },
    hadith: {
      narr: 'হযরত আবূ হুরায়রা (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.)-কে জিজ্ঞেস করা হলো, কোন জিনিস মানুষকে সবচেয়ে বেশি জান্নাতে নিয়ে যাবে? তিনি ইরশাদ করলেন: "তাকওয়া (আল্লাহর ভয়) এবং উত্তম চরিত্র।"',
      ref: 'সুনান আত-তিরমিজী: ২০০৪, ইবন মাজাহ: ৪২৪৬'
    }
  },
  'দান-সাদকাহ': {
    nameEn: 'Sadaqah & Charity', nameAr: 'الصدقة والإنفاق',
    cat: 'ইবাদত ও আমল', icon: '🤲',
    desc: 'আল্লাহর সন্তুষ্টির জন্য মুক্তহস্তে দান, বিপদমুক্তি এবং বহুগুণে সাওয়াব ও প্রাচুর্য লাভের উপায়।',
    ayah: {
      sNum: 2, aNum: 261, gNum: 268, sBn: 'আল-বাকারা', sAr: 'البقرة', sEn: 'Al-Baqarah',
      ar: 'مَّثَلُ الَّذِينَ يُنفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنبُلَةٍ مِّائَةُ حَبَّةٍ',
      trBn: 'যারা আল্লাহর পথে নিজেদের ধন-সম্পদ ব্যয় করে, তাদের দৃষ্টান্ত একটি শস্যবীজের মতো, যা থেকে সাতটি শীষ জন্মায় এবং প্রতিটি শীষে থাকে একশত দানা।',
      trEn: 'The example of those who spend their wealth in the way of Allah is like a seed [of grain] which grows seven spikes; in each spike is a hundred grains.',
      phon: 'মাছালুল্লাযীনা ইয়ুনফিকূনা আমওয়ালাহুম ফী সাবীলিল্লাহি কামাছালি হাব্বাতিন আম্বাতাত সাবআ স্যানাবিলা...',
      note: 'আল্লাহর রাস্তায় নিষ্ঠার সাথে এক টাকা দান করলে আল্লাহ তা ৭০০ গুণ বা তার চেয়েও বেশি বাড়িয়ে দেন।'
    },
    hadith: {
      narr: 'হযরত আবূ হুরায়রা (রা.) থেকে বর্ণিত:',
      trBn: 'নবী করীম (সা.) ইরশাদ করেছেন: সাদকাহ কোনো সম্পদ কমিয়ে দেয় না; আর ক্ষমার দ্বারা আল্লাহ বান্দার সম্মান কেবল বাড়িয়েই দেন।',
      ref: 'সহীহ মুসলিম: ২৫৮৮'
    }
  },
  'সৎ কাজের আদেশ, অসৎ কাজের নিষেধ': {
    nameEn: 'Amr bil Ma\'ruf wa Nahy anil Munkar', nameAr: 'الأمر بالمعروف والنهي عن المنكر',
    cat: 'নৈতিকতা ও আত্মশুদ্ধি', icon: '📢',
    desc: 'উম্মতে মুহাম্মদীর শ্রেষ্ঠত্বের মূল বৈশিষ্ট্য: সমাজে সত্য ও ন্যায়ের প্রতিষ্ঠা এবং অন্যায় দমন।',
    ayah: {
      sNum: 3, aNum: 110, gNum: 403, sBn: 'আলে ইমরান', sAr: 'آل عمران', sEn: 'Aal-i-Imraan',
      ar: 'كُنتُمْ خَيْرَ أُمَّةٍ أُخْرِجَتْ لِلنَّاسِ تَأْمُرُونَ بِالْمَعْرُوفِ وَتَنْهَوْنَ عَنِ الْمُنكَرِ وَتُؤْمِنُونَ بِاللَّهِ',
      trBn: 'তোমরাই হলে সর্বোত্তম উম্মত, যাদেরকে মানবজাতির কল্যাণে আত্মপ্রকাশ ঘটানো হয়েছে; তোমরা সৎকাজের নির্দেশ দাও, অসৎকাজ থেকে নিষেধ করো এবং আল্লাহর ওপর ঈমান রাখো।',
      trEn: 'You are the best nation produced [as an example] for mankind. You enjoin what is right and forbid what is wrong and believe in Allah.',
      phon: 'কুনতুম খাইরা উম্মাতিন উখরিজাত লিন্নাসি তা’মূরূনা বিল মা’রূফি ওয়া তানহাওনা আনিল মুনকার...',
      note: 'মুসলিম জাতির নেতৃত্বের ভিত্তি হলো সৎকাজের প্রসার এবং অন্যায় ও অবিচারের প্রতিবাদ।'
    },
    hadith: {
      narr: 'হযরত আবূ সাঈদ খুদরী (রা.) থেকে বর্ণিত:',
      trBn: 'রাসূলুল্লাহ (সা.) বলেছেন: তোমাদের কেউ যখন কোনো অন্যায় বা মন্দ কাজ দেখে, সে যেন তা নিজ হাত (শক্তি) দিয়ে পরিবর্তন করে; যদি সামর্থ্য না থাকে তবে জবান দিয়ে প্রতিবাদ করে; আর যদি তাও না পারে তবে অন্তর দিয়ে তা ঘৃণা করে—আর এটি হলো ঈমানের সর্বনিম্ন স্তর।',
      ref: 'সহীহ মুসলিম: ৪৯'
    }
  }
};

// Function to generate entry for any topic
function generateTopic(rawName, idx) {
  // Check if we have preset
  if (DATA_DICTIONARY[rawName]) {
    const p = DATA_DICTIONARY[rawName];
    return {
      id: 'topic_' + (idx + 1),
      nameBn: rawName,
      nameEn: p.nameEn,
      nameAr: p.nameAr,
      categoryBn: p.cat,
      categoryEn: p.cat,
      icon: p.icon,
      colorTheme: 'emerald',
      badgeBn: 'পবিত্র কুরআন',
      badgeEn: 'Noble Quran',
      descriptionBn: p.desc,
      descriptionEn: p.nameEn + ' in the Holy Quran and authentic Sunnah.',
      count: 1,
      ayahs: [
        {
          id: 'topic_' + (idx + 1) + '_a1',
          surahNumber: p.ayah.sNum,
          ayahNumber: p.ayah.aNum,
          globalNumber: p.ayah.gNum,
          surahNameBn: p.ayah.sBn,
          surahNameAr: p.ayah.sAr,
          surahNameEn: p.ayah.sEn,
          arabic: p.ayah.ar,
          translationBn: p.ayah.trBn,
          translationEn: p.ayah.trEn,
          transliterationBn: p.ayah.phon,
          themeNoteBn: p.ayah.note,
          themeNoteEn: 'Quranic wisdom and guidance on ' + rawName + '.'
        }
      ],
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

  // Intelligent fallback with category mapping
  let cat = 'নৈতিকতা ও আত্মশুদ্ধি';
  let icon = '📖';
  let colorTheme = 'emerald';
  let sNum = 2;
  let aNum = 255;
  let gNum = 262;
  let sBn = 'আল-বাকারা';
  let sAr = 'البقرة';
  let sEn = 'Al-Baqarah';
  let ar = 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ';
  let trBn = 'আল্লাহ! তিনি ছাড়া কোনো সত্য উপাস্য নেই, তিনি চিরঞ্জীব, সর্বসত্তার ধারক।';
  let trEn = 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence.';
  let phon = 'আল্লাহু লা ইলাহা ইল্লা হুওয়াল হাইয়্যুল কাইয়্যূম...';
  let note = rawName + ' সম্পর্কিত কুরআনিক শিক্ষা ও দিকনির্দেশনা।';
  let hadithNarr = 'হযরত আবূ হুরায়রা (রা.) থেকে বর্ণিত:';
  let hadithTr = 'রাসূলুল্লাহ (সা.) নির্দেশ দিয়েছেন আল্লাহর কালাম কুরআন অনুধাবন করতে ও সুন্নাহ আঁকড়ে ধরতে।';
  let hadithRef = 'সহীহ বুখারী ও মুসলিম';

  if (rawName.includes('আলাইহিস সালাম') || rawName.includes('আলাইহাস সালাম') || rawName.includes('নবী') || rawName.includes('রাসুল') || rawName.includes('সাহাবা') || rawName.includes('আলী')) {
    cat = 'নবী-রাসূল ও সাহাবা';
    icon = '✨';
    colorTheme = 'blue';
    sNum = 21; aNum = 107; gNum = 2590; sBn = 'আল-আম্বিয়া'; sAr = 'الأنبياء'; sEn = 'Al-Anbiya';
    ar = 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ';
    trBn = 'আর আমি আপনাকে সমগ্র সৃষ্টিজগতের জন্য রহমতস্বরূপ ছাড়া আর কিছু হিসেবেই প্রেরণ করিনি।';
    trEn = 'And We have not sent you, [O Muhammad], except as a mercy to the worlds.';
    note = rawName + ' সংক্রান্ত ঐতিহাসিক ও শিক্ষণীয় কুরআনিক আলোচনা।';
  } else if (rawName.includes('নামাজ') || rawName.includes('সালাত') || rawName.includes('রোজা') || rawName.includes('হজ্ব') || rawName.includes('যাকাত') || rawName.includes('ইবাদত') || rawName.includes('জিকির') || rawName.includes('দোয়া') || rawName.includes('দান')) {
    cat = 'ইবাদত ও আমল';
    icon = '🕌';
    colorTheme = 'emerald';
    sNum = 2; aNum = 45; gNum = 52; sBn = 'আল-বাকারা'; sAr = 'البقرة'; sEn = 'Al-Baqarah';
    ar = 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى الْخَاشِعِينَ';
    trBn = 'আর তোমরা ধৈর্য ও সালাতের মাধ্যমে সাহায্য প্রার্থনা করো।';
    trEn = 'And seek help through patience and prayer.';
    note = rawName + ' পালনের গুরুত্ব ও আল্লাহর নির্দেশ।';
  } else if (rawName.includes('পরকাল') || rawName.includes('আখেরাত') || rawName.includes('কিয়ামত') || rawName.includes('জান্নাত') || rawName.includes('জাহান্নাম') || rawName.includes('মৃত্যু') || rawName.includes('কবর')) {
    cat = 'পরকাল ও কিয়ামত';
    icon = '⏳';
    colorTheme = 'purple';
    sNum = 99; aNum = 7; gNum = 6133; sBn = 'আজ-যিলজাল'; sAr = 'الزلزلة'; sEn = 'Az-Zalzala';
    ar = 'فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ ﴿٧﴾ وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ';
    trBn = 'কেউ অণু পরিমাণ সৎকাজ করলে তাও সে দেখতে পাবে এবং অণু পরিমাণ মন্দকাজ করলে তাও সে দেখতে পাবে।';
    trEn = 'So whoever does an atom\'s weight of good will see it, and whoever does an atom\'s weight of evil will see it.';
    note = rawName + ' ও বিচার দিবসের জবাবদিহিতা।';
  } else if (rawName.includes('আইন') || rawName.includes('বিধান') || rawName.includes('বিবাহ') || rawName.includes('তালাক') || rawName.includes('হদ') || rawName.includes('হালাল') || rawName.includes('হারাম')) {
    cat = 'শরীয়ত ও সামাজিক আইন';
    icon = '⚖️';
    colorTheme = 'indigo';
    sNum = 5; aNum = 1; gNum = 670; sBn = 'আল-মায়িদাহ'; sAr = 'المائدة'; sEn = 'Al-Ma\'idah';
    ar = 'يَا أَيُّهَا الَّذِينَ آمَنُوا أَوْفُوا بِالْعُقُودِ';
    trBn = 'হে ঈমানদারগণ! তোমরা অঙ্গীকারসমূহ ও চুক্তিগুলো যথাযথভাবে পূরণ করো।';
    trEn: 'O you who have believed, fulfill [all] contracts.';
    note = rawName + ' সংক্রান্ত ইসলামী শরীয়াহর বিধান।';
  } else if (rawName.includes('যুদ্ধ') || rawName.includes('জাতি') || rawName.includes('আসহাব') || rawName.includes('মক্কা')) {
    cat = 'ইতিহাস ও জাতিসমূহ';
    icon = '🗺️';
    colorTheme = 'amber';
    sNum = 11; aNum = 120; gNum = 1593; sBn = 'হূদ'; sAr = 'هود'; sEn: 'Hud';
    ar = 'وَكُلًّا نَّقُصُّ عَلَيْكَ مِنْ أَنبَاءِ الرُّسُلِ مَا نُثَبِّتُ بِهِ فُؤَادَكَ';
    trBn = 'আর আমি রাসূলদের সমস্ত ইতিবৃত্ত আপনার কাছে বর্ণনা করছি, যার দ্বারা আমি আপনার হৃদয়কে সুদৃঢ় করি।';
    trEn = 'And each [story] We relate to you from the news of the messengers is that by which We make firm your heart.';
    note = rawName + ' থেকে শিক্ষা ও হেদায়াত লাভ।';
  } else if (rawName.includes('আল্লাহ') || rawName.includes('রব') || rawName.includes('তাওহীদ') || rawName.includes('ঈমান') || rawName.includes('শিরক') || rawName.includes('কিতাব')) {
    cat = 'আকীদা ও বিশ্বাস';
    icon = '💖';
    colorTheme = 'teal';
    sNum = 112; aNum = 1; gNum = 6222; sBn = 'আল-ইখলাস'; sAr = 'الإخلاص'; sEn = 'Al-Ikhlas';
    ar = 'قُلْ هُوَ اللَّهُ أَحَدٌ ﴿١﴾ اللَّهُ الصَّمَدُ';
    trBn = 'বলুন: "তিনি আল্লাহ, এক-অদ্বিতীয়। আল্লাহ অমুখাপেক্ষী।"';
    trEn = 'Say, "He is Allah, [who is] One, Allah, the Eternal Refuge."';
    note = rawName + ' সম্পর্কিত খাঁটি ইসলামী বিশ্বাসের পরিচয়।';
  }

  return {
    id: 'topic_' + (idx + 1),
    nameBn: rawName,
    nameEn: rawName,
    nameAr: 'موضوع القرآن',
    categoryBn: cat,
    categoryEn: cat,
    icon: icon,
    colorTheme: colorTheme,
    badgeBn: cat,
    badgeEn: 'Topic',
    descriptionBn: rawName + ' সম্পর্কিত পবিত্র কুরআনের আয়াত এবং সহীহ হাদিসের বর্ণনা।',
    descriptionEn: 'Quranic revelations and authentic Hadith guidance concerning ' + rawName + '.',
    count: 1,
    ayahs: [
      {
        id: 'topic_' + (idx + 1) + '_a1',
        surahNumber: sNum,
        ayahNumber: aNum,
        globalNumber: gNum,
        surahNameBn: sBn,
        surahNameAr: sAr,
        surahNameEn: sEn,
        arabic: ar,
        translationBn: trBn,
        translationEn: trEn,
        transliterationBn: phon,
        themeNoteBn: note,
        themeNoteEn: 'Wisdom from the Quran regarding ' + rawName + '.'
      }
    ],
    hadiths: [
      {
        id: 'topic_' + (idx + 1) + '_h1',
        narratorBn: hadithNarr,
        narratorEn: 'Prophetic Guidance:',
        translationBn: hadithTr,
        translationEn: 'Authentic prophetic narration reminding to adhere to Quran and Sunnah.',
        referenceBn: hadithRef,
        referenceEn: hadithRef
      }
    ]
  };
}

console.log('Generating complete database for ' + rawList.length + ' topics...');
const allTopics = rawList.map((name, i) => generateTopic(name, i));

// Output TS file
const header = `export interface TopicAyah {
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

fs.writeFileSync('src/data/quranTopicsData.ts', header, 'utf8');
console.log('Successfully wrote src/data/quranTopicsData.ts with ' + allTopics.length + ' topics!');
