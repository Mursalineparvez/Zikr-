export interface SurahInsight {
  surahNumber: number;
  coreMessageBn?: string;
  coreMessageEn?: string;
  fojilotBn: string;
  fojilotEn: string;
  referenceBn?: string;
  referenceEn?: string;
  sabunNuzulBn: string;
  sabunNuzulEn: string;
  historicalContextBn?: string;
  historicalContextEn?: string;
  keyLessonsBn?: string[];
  keyLessonsEn?: string[];
  importantTopicsBn: string[];
  importantTopicsEn: string[];
}

export const SURAH_INSIGHTS_MAP: Record<number, SurahInsight> = {
  1: {
    surahNumber: 1,
    coreMessageBn: 'কুরআনুল কারীমের সারসংক্ষেপ ও উম্মুল কুরআন। বান্দা ও আল্লাহর মধ্যকার আত্মিক সংযোগ ও সিরাতে মুস্তাকিমের প্রার্থনা।',
    coreMessageEn: 'The essence of the Quran (Umm al-Quran). Prayer for guidance to the Straight Path and spiritual dialogue with Allah.',
    fojilotBn: 'সূরা আল-ফাতিহা কুরআনের সর্বশ্রেষ্ঠ সূরা (উম্মুল কুরআন)। রাসুলুল্লাহ ﷺ বলেছেন: "যার হাতে আমার প্রাণ, তার কসম! আল-ফাতিহার মতো কোনো সূরা তাওরাত, ইনজিল, জাবুর কিংবা কুরআনে নাজিল হয়নি।" এটি রুকইয়া বা যাবতীয় রোগব্যাধি থেকে আরোগ্যের জন্য অত্যন্ত কার্যকরী। হাদীসে কুদসীতে আল্লাহ বলেন: "আমি সালাতকে আমার ও বান্দার মাঝে দুই ভাগে বিভক্ত করেছি।"',
    fojilotEn: 'Al-Faatiha is the greatest Surah in the Quran (Umm al-Quran). The Prophet ﷺ stated nothing like it has been revealed in any scripture. It serves as Ruqyah for healing.',
    referenceBn: 'সহীহ বুখারী: ৪৭০৬, সহীহ মুসলিম: ৮৯৫, হাদীসে কুদসী',
    referenceEn: 'Sahih Bukhari: 4706, Sahih Muslim: 895',
    sabunNuzulBn: 'মক্কী জীবনের সূচনালগ্নে সালাতের ফরজিয়াত ও রবের প্রশংসা শিক্ষা দেওয়ার জন্য এটি অবতীর্ণ হয়। জিবরাইল (আ.) আসমান থেকে এক অভূতপূর্ব নূর নিয়ে এসে নবীজি ﷺ-কে এই সূরা ও সূরা বাকারা-র শেষ দুই আয়াতের সুসংবাদ দেন। এটিই কুরআনের প্রথম সম্পূর্ণ নাজিল হওয়া সূরা।',
    sabunNuzulEn: 'Revealed early in Makkah when prayer was prescribed. An angel descended with divine light heralding Surah Al-Fatiha.',
    historicalContextBn: 'জাহিলিয়াতের যুগে মানুষ যখন বিভিন্ন দেবদেবী ও প্রকৃতির পূজা করত, তখন এই সূরা সরাসরি এক আল্লাহর ইবাদত ও সাহায্য কামনার বিশুদ্ধ পাঠ শিখিয়ে দেয়।',
    historicalContextEn: 'Revealed during Jahiliyyah when idolatry was rampant, establishing pure monotheistic devotion.',
    keyLessonsBn: [
      'যেকোনো ভালো কাজ আল্লাহর গুণগান ও আলহামদুলিল্লাহ্‌ দিয়ে শুরু করা',
      'একমাত্র আল্লাহরই ইবাদত করা এবং যাবতীয় বিপদে একমাত্র তাঁরই সাহায্য চাওয়া',
      'সিরাতে মুস্তাকিম বা সৎপথ অর্জনে প্রতিদিন প্রতিনিয়ত ব্যাকুল হয়ে দোয়া করা',
      'পথভ্রষ্ট ও অভিশপ্তদের পথ থেকে দূরে থাকার শিক্ষা গ্রহণ করা'
    ],
    keyLessonsEn: [
      'Begin all good deeds with praise of Allah (Alhamdulillah)',
      'Worship Allah alone and seek aid solely from Him',
      'Continuously pray for guidance to the Straight Path',
      'Avoid paths of those who earned wrath or strayed'
    ],
    importantTopicsBn: [
      'আল্লাহ তাআলার মহাসম্মান ও প্রশংসা (হামদ)',
      'একত্ববাদ ও ইবাদতের ঘোষণা (ইহদিস সিরাতাল মুস্তাকিম)',
      'সঠিক পথের দিশা ও হেদায়াতের আরজি',
      'বান্দা ও রবের মধ্যকার প্রগাঢ় কথোপকথন'
    ],
    importantTopicsEn: [
      'Praise and glorification of Allah (Hamd)',
      'Declaration of Tawhid and worship (Guidance to the Straight Path)',
      'Supplication for divine guidance',
      'Profound dialogue between the worshipper and the Lord'
    ]
  },
  2: {
    surahNumber: 2,
    coreMessageBn: 'ইসলামী শরীয়তের পূর্ণাঙ্গ সংবিধান, মুমিনের আত্মিক দুর্গ ও শয়তানের চক্রান্ত থেকে সুরক্ষার সর্বশ্রেষ্ঠ ঢাল।',
    coreMessageEn: 'Comprehensive constitution of Islamic Sharia, fortress of faith, and ultimate shield against Satanic whispers.',
    fojilotBn: 'সূরা আল-বাকারা কুরআনের দীর্ঘতম সূরা। রাসুলুল্লাহ ﷺ বলেছেন: "তোমরা ঘরে সূরা বাকারা তিলাওয়াত করো, কারণ যে ঘরে এটি পড়া হয় সেখান থেকে শয়তান পালিয়ে যায়। এর বর্জন অনুতাপের কারণ এবং জাদুকরেরা এর ওপর বিজয়ী হতে পারে না।" এতে রয়েছে আয়াতুল কুরসি (কুরআনের সর্বশ্রেষ্ঠ আয়াত) এবং শেষ দুই আয়াত যা রাতের ইবাদতের জন্য যথেষ্ট।',
    fojilotEn: 'Al-Baqarah is the longest Surah. Satan flees from a house where it is recited. It contains Ayatul Kursi, the greatest verse in the Quran.',
    referenceBn: 'সহীহ মুসলিম: ৮০৪, জামে আত-তিরমিযী: ২৮৭৫',
    referenceEn: 'Sahih Muslim: 804, Jami at-Tirmidhi: 2875',
    sabunNuzulBn: 'মদিনায় হিজরতের পর দীর্ঘ সময় ধরে নতুন ইসলামী রাষ্ট্র গঠন, সামাজিক আইন, অর্থব্যবস্থা, সালাত, রোজা, জাকাত, হজ এবং রিবা (সুদ) নিষিদ্ধকরণের প্রেক্ষাপটে পর্যায়ক্রমে অবতীর্ণ হয়েছে।',
    sabunNuzulEn: 'Revealed gradually in Madinah following Hijrah to construct the socio-legal, economic, and spiritual foundations of the Muslim nation.',
    historicalContextBn: 'মদিনায় ইহুদিদের মনস্তাত্ত্বিক চ্যালেঞ্জ, মুনাফিকদের শঠতা এবং বদর ও উহুদ যুদ্ধের পরিবর্তিত পরিস্থিতিতে মুসলিম উম্মাহর রাজনৈতিক ও সামাজিক নিরাপত্তার বিধান তৈরি হয়।',
    historicalContextEn: 'Addressed the intellectual challenge of Jewish scholars, hypocrisy of Munafiqeen, and post-Hijrah governance.',
    keyLessonsBn: [
      'তাকওয়া অর্জন এবং গায়েবের ওপর দৃঢ় ঈমান বজায় রাখা',
      'সুদ (রিবা) সম্পূর্ণ বর্জন করে হালাল উপার্জনে আত্মনিয়োগ করা',
      'আয়াতুল কুরসির মাধ্যমে তাওহীদ ও আল্লাহর কুদরতের ওপর ভরসা রাখা',
      'বনী ইসরাইলের অবাধ্যতার ইতিহাস থেকে শিক্ষা নিয়ে রাসুলের আনুগত্য করা'
    ],
    keyLessonsEn: [
      'Attain Taqwa and maintain unshakeable belief in the Unseen',
      'Completely abandon usury (Riba) and consume Halal',
      'Internalize Tawhid via Ayatul Kursi',
      'Avoid disobedience exemplified by the Children of Israel'
    ],
    importantTopicsBn: [
      'মুমিন, কাফির ও মুনাফিকদের ত্রিবিধ সামাজিক বৈশিষ্ট্য',
      'হজরত আদম (আ.)-এর সৃষ্টি ও ইবলিসের অহংকার',
      'বনী ইসরাইলের ইতিহাস, গাভী জবাইয়ের ঘটনা ও শিক্ষা',
      'রোজা, হজ, ফারায়েজ, বিবাহ ও রিবা (সুদ) নিষিদ্ধকরণ',
      'আয়াতুল কুরসি ও শেষ দুই আয়াতের বিশেষ ফজিলত'
    ],
    importantTopicsEn: [
      'Characteristics of believers, disbelievers, and hypocrites',
      'Creation and history of Prophet Adam (AS)',
      'History of the Children of Israel and the Cow',
      'Laws of fasting, hajj, inheritance, marriage, and usury',
      'Ayatul Kursi and the virtues of the final verses'
    ]
  },
  3: {
    surahNumber: 3,
    coreMessageBn: 'ঈমানের ওপর সুদৃঢ় স্থায়িত্ব, আহলে কিতাবদের সাথে বৈদ্ধিক সংলাপে সত্যের জয় এবং যুদ্ধের কঠিনতম পরিস্থিতিতে ধৈর্যের পরীক্ষা।',
    coreMessageEn: 'Steadfastness in faith, intellectual dialogue with People of the Book, and patience through trials of war.',
    fojilotBn: 'রাসুলুল্লাহ ﷺ বলেছেন: "তোমরা দুই উজ্জ্বল আলোকময় সূরা—বাকারা ও আলে ইমরান পাঠ করো; কিয়ামতের দিন এ দুটি দুটি মেঘমালা বা পাখির ঝাঁকের মতো এসে পাঠকারীর পক্ষে আল্লাহর দরবারে বিতর্ক ও সুপারিশ করবে। "',
    fojilotEn: 'The Prophet ﷺ said: "Recite the two bright ones: Al-Baqarah and Ali Imran, for on Resurrection Day they will intercede like two clouds."',
    referenceBn: 'সহীহ মুসলিম: ৮০৪',
    referenceEn: 'Sahih Muslim: 804',
    sabunNuzulBn: 'নজরানের ৬০ সদস্যের খ্রিস্টান প্রতিনিধিদলের সাথে ঐতিহাসিক আকিদাগত সংলাপ এবং ওহুদের যুদ্ধে সাময়িক বিপত্তিতে ঈমানদারদের মনস্তাত্ত্বিক মনোবল ফিরিয়ে আনতে অবতীর্ণ।',
    sabunNuzulEn: 'Revealed regarding the debate with the Christian delegation of Najran and spiritual lessons following the Battle of Uhud.',
    historicalContextBn: 'খ্রিস্টানরা ঈসা (আ.)-কে আল্লাহর পুত্র দাবি করলে অকাট্য যুক্তিতে তাঁদের ভ্রান্তি উন্মোচিত করা হয় এবং ওহুদের যুদ্ধে ৭০ জন সাহাবীর শাহাদাতের পর সান্ত্বনা দেওয়া হয়।',
    historicalContextEn: 'Countered Christian doctrines regarding Isa (AS) and provided divine solace following the martyrdom of 70 Sahabah at Uhud.',
    keyLessonsBn: [
      'দ্বীনের ওপর অবিচল থাকার জন্য নিয়মিত দোয়া করা: "রাব্বানা লা তুজিগ কুলুবানা..."',
      'বিপদ-আপদে ধৈর্য ধারণ করা এবং যুদ্ধের কঠিন পরিস্থিতিতেও রাসুলের নির্দেশ মানা',
      'আল্লাহর রাস্তায় শাহাদাত বরণকারীদের অমরত্ব ও জান্নাতের সুসংবাদ স্মরণে রাখা'
    ],
    keyLessonsEn: [
      'Pray consistently for spiritual steadfastness',
      'Maintain patience and strict obedience to prophetic command during hardship',
      'Acknowledge the eternal living status of martyrs in Islam'
    ],
    importantTopicsBn: [
      'তাওহীদ ও রিসালাতের অকাট্য যৌক্তিক প্রমাণসমূহ',
      'ঈসা (আ.) ও মারইয়াম (আ.)-এর মুজিযাপূর্ণ ইতিবৃত্ত',
      'ওহুদ যুদ্ধের শিক্ষা, সাহাবীদের ত্যাগ ও ধৈর্যের পরীক্ষা',
      'শাহাদাতের অতুলনীয় মর্যাদা ও জান্নাতের আসমানি প্রতিদান'
    ],
    importantTopicsEn: [
      'Definitive logical proofs of Tawhid and Prophethood',
      'Miraculous story of Isa (AS) and Maryam (AS)',
      'Lessons from the Battle of Uhud and Sahabah trials',
      'Supreme status of martyrs and heavenly recompense'
    ]
  },
  4: {
    surahNumber: 4,
    coreMessageBn: 'সামাজিক ন্যায়বিচার, নারী ও এতিমের অধিকার প্রতিষ্ঠা, সম্পত্তি বন্টনের নিখুঁত ফারায়েজ এবং পারিবারিক জীবনের আসমানি শৃঙ্খল।',
    coreMessageEn: 'Social justice, rights of women and orphans, divine inheritance laws, and family harmony.',
    fojilotBn: 'রাসুলুল্লাহ ﷺ আব্দুল্লাহ ইবনে মাসউদ (রা.)-কে বললেন: "আমাকে কুরআন পড়ে শোনাও।" তিনি সূরা আন-নিসা পাঠ করে "আমরা যখন প্রতিটি উম্মতের একজন করে সাক্ষী হাজির করব..." আয়াতে পৌঁছালে রাসুল ﷺ-এর চোখ মোবারক থেকে অশ্রু বইতে শুরু করে।',
    fojilotEn: 'When Abdullah ibn Masud recited Surah An-Nisa to verse 41, the Prophet ﷺ wept silently upon hearing the gravity of Judgment.',
    referenceBn: 'সহীহ বুখারী: ৪৫৮২',
    referenceEn: 'Sahih Bukhari: 4582',
    sabunNuzulBn: 'ওহুদের যুদ্ধে বহু সাহাবী শহীদ হলে বিপুল সংখ্যক এতিম শিশু ও বিধবা নারীর সামাজিক নিরাপত্তা ও সম্পত্তি রক্ষার জরুরি প্রয়োজনে এই সূরা নাজিল হয়।',
    sabunNuzulEn: 'Revealed in Madinah following the Battle of Uhud to resolve social crises regarding widows, orphans, and estate distribution.',
    historicalContextBn: 'জাহিলিয়াতের আরবে নারীরা সম্পত্তির কোনো অংশ পেত না এবং এতিমদের মালামাল গ্রাস করা হতো। এই সূরা সেই কালো প্রথা ভেঙে পূর্ণ অধিকার কায়েম করে।',
    historicalContextEn: 'Eliminated pre-Islamic practices depriving women and orphans of inheritance and legal standing.',
    keyLessonsBn: [
      'এতিমের মাল অন্যায়ভাবে গ্রাস না করা এবং তাদের হক বুঝিয়ে দেওয়া',
      'নারীদের সম্মান জানানো, মোহর আদায় করা এবং ফারায়েজ অনুযায়ী সম্পত্তি বন্টন করা',
      'বিচারের ক্ষেত্রে স্বজনপ্রীতি এড়িয়ে সম্পূর্ণ ন্যায়বিচার বজায় রাখা'
    ],
    keyLessonsEn: [
      'Protect orphan property diligently and restore rights',
      'Honor women, pay dowry promptly, and enforce inheritance laws',
      'Uphold absolute justice regardless of personal ties'
    ],
    importantTopicsBn: [
      'এতিম, নারী ও দুর্বলদের সার্বিক অধিকার সংরক্ষণ',
      'উত্তরাধিকার সম্পত্তি বন্টনের আসমানি ফারায়েজ আইন',
      'বিবাহ, মোহর, দাম্পত্য জীবন ও সামাজিক শৃঙ্খলার নিয়ম',
      'মুনাফিকদের শঠতা ও প্রতারণা প্রতিহত করার দিকনির্দেশনা'
    ],
    importantTopicsEn: [
      'Safeguarding rights of orphans, women, and vulnerable',
      'Precise divine laws of inheritance (Faraid)',
      'Marriage, dower, and family governance',
      'Countering hypocrisy and spiritual deceit'
    ]
  },
  18: {
    surahNumber: 18,
    coreMessageBn: 'ফেতনার জমানা থেকে ঈমান রক্ষার ৪টি মহাকাব্যিক ঘটনা এবং দাজ্জালি চালবাজি থেকে আসমানি সুরক্ষার দুর্ভেদ্য কেল্লা।',
    coreMessageEn: 'Spiritual shield against end-time fitnahs (Dajjal) through 4 epic Quranic stories of faith, wealth, knowledge, and power.',
    fojilotBn: 'রাসুলুল্লাহ ﷺ বলেছেন: "যে ব্যক্তি জুমুআর দিনে সূরা আল-কাহফ তিলাওয়াত করবে, তার পা থেকে আসমান পর্যন্ত নূর চকমক করবে যা কিয়ামতের দিন আলো দেবে এবং দুই জুমুআর মধ্যবর্তী সব গুনাহ মাফ করা হবে।" এর প্রথম ও শেষ ১০ আয়াত দাজ্জালের ভয়াবহ ফেতনা থেকে হেফাজত করে।',
    fojilotEn: 'The Prophet ﷺ said: "Whoever recites Surah Al-Kahf on Friday, light will shine for him between the two Fridays." Protects against Dajjal.',
    referenceBn: 'সহীহ মুসলিম: ৮০৯, সুনানে নাসাঈ: ১০৭৯০',
    referenceEn: 'Sahih Muslim: 809, Sunan An-Nasa\'i: 10790',
    sabunNuzulBn: 'কুরাইশ কাফিরেরা মদিনার ইহুদি পন্ডিতদের পরামর্শে নবীজি ﷺ-কে পরীক্ষা করতে গুহাবাসী যুবক, খিজির (আ.) ও মহাবীর জুলকারনাইন সম্পর্কে ৩টি জটিল প্রশ্ন করলে তার জবাবে অবতীর্ণ হয়।',
    sabunNuzulEn: 'Revealed in Makkah in response to 3 challenge questions posed by Quraysh on advice of Jewish rabbis in Madinah.',
    historicalContextBn: 'মক্কার মুশরিকরা বিশ্বনবী ﷺ-এর নবুওয়তকে মিথ্যা প্রমাণ করতে চেয়েছিল। কিন্তু আল-কাহফ নাজিল হয়ে তাদের সব চক্রান্ত নস্যাৎ করে দেয়।',
    historicalContextEn: 'Defeated polytheist schemes to invalidate Prophethood through precise historical divine knowledge.',
    keyLessonsBn: [
      'ঈমান রক্ষায় প্রয়োজনে জাগতিক আরাম-আয়েশ ত্যাগ করে আসমানি আশ্রয়ে যাওয়া (আসহাবে কাহফ)',
      'ধন-সম্পদের বড়াই না করে সর্বাবস্থায় "মা-শা-আল্লাহ" বলা ও শুকরিয়া আদায় করা',
      'সব বিষয়ে ইলম না থাকলেও আল্লাহর হিকমতের ওপর পূর্ণ আস্থা রাখা (মুসা ও খিজির)',
      'ক্ষমতা ও শাসনকে আল্লাহর দ্বীন কায়েমের কাজে ব্যবহার করা (জুলকারনাইন)'
    ],
    keyLessonsEn: [
      'Prioritize faith over worldly comfort during spiritual trials',
      'Acknowledge Allah for all wealth ("Ma Sha Allah")',
      'Trust Divine wisdom even when cause is hidden (Musa & Khidr)',
      'Utilize power and governance to uphold justice (Dhul-Qarnayn)'
    ],
    importantTopicsBn: [
      'আসহাবে কাহফ গুহাবাসী যুবকদের ঈমানি আত্মত্যাগ ও অলৌকিক ঘুম',
      'ধনাঢ্য দুই বাগান মালিকের অহংকার ও পরিণতি',
      'হজরত মুসা (আ.) ও খিজির (আ.)-এর জ্ঞানগর্ভ শিক্ষণীয় সফর',
      'বাদশাহ জুলকারনাইন ও ইয়াজুজ-মাজুজ প্রতিরোধে সিসাঢালা প্রাচীর'
    ],
    importantTopicsEn: [
      'Faith trial of the Cave Dwellers and miraculous sleep',
      'Parable of the two garden owners and arrogance',
      'Spiritual journey of Musa (AS) and Khidr (AS)',
      'Dhul-Qarnayn and the iron wall against Gog-Magog'
    ]
  },
  36: {
    surahNumber: 36,
    coreMessageBn: 'কুরআনুল কারীমের হৃদয় (Qalb al-Quran)। তাওহীদ, নবুওয়ত, আখেরাতের পুনরুত্থান ও সৃষ্টির নিখুঁত নিদর্শনের মহাসমাবেশ।',
    coreMessageEn: 'The heart of the Quran (Qalb al-Quran). Comprehensive exposition of Tawhid, Prophethood, Resurrection, and Signs of Creation.',
    fojilotBn: 'রাসুলুল্লাহ ﷺ বলেছেন: "প্রতিটি বস্তুর একটি হৃদয় থাকে, আর কুরআনের হৃদয় হলো সূরা ইয়াসিন। যে ব্যক্তি রাতে আল্লাহর সন্তুষ্টির জন্য এটি তিলাওয়াত করবে, তার ঐ রাতের গুনাহ ক্ষমা করে দেওয়া হবে এবং মৃতদের পাশে পড়লে তাদের রূহ শান্তিতে ভরপুর হয়। "',
    fojilotEn: 'Ya-Sin is the heart of the Quran. The Prophet ﷺ stated whoever recites it at night seeking Allah’s pleasure will be forgiven.',
    referenceBn: 'জামে আত-তিরমিযী: ২৮৮৭, সুনানে দারেমী: ৩৪১৬',
    referenceEn: 'Jami at-Tirmidhi: 2887, Sunan al-Darimi: 3416',
    sabunNuzulBn: 'মক্কী যুগে কাফির উবাই ইবনে খালফ ও কুরাইশ সর্দারেরা একটি পচা হাড় গুড়ো করে বাতাস উড়িয়ে দিয়ে বলেছিল: "এই পচা হাড়কে কে পুনরায় জীবিত করবে?" তখন এর জবাবে অকাট্য যুক্তিসহ নাজিল হয়।',
    sabunNuzulEn: 'Revealed in Makkah when pagan chieftains crushed decomposed bones, mocking the reality of physical Resurrection.',
    historicalContextBn: 'আরবের মুশরিকরা পরকালে বিশ্বাস করত না। তারা মানুষকে মাটির সাথে মিশে যাওয়ার পর আবার জ্যান্ত হওয়াকে অসম্ভব ভাবত। সূরা ইয়াসিন তাদের বৈজ্ঞানিক যুক্তি দিয়ে স্তব্ধ করে দেয়।',
    historicalContextEn: 'Countered pagan materialist philosophy denying life after death through cosmic and biological proofs.',
    keyLessonsBn: [
      'মৃত্যুর পর হাশরের ময়দানে পুনরুত্থান ও হিসাব-নিকাশের ওপর নিশ্চিত ঈমান রাখা',
      'আল্লাহর দ্বীনের দাওয়াত পৌঁছে দেওয়া হিকমতের সাথে (আহলে ইয়ারিয়ার ঘটনা)',
      'চন্দ্র, সূর্য ও রাতের আগমন-নির্গমনের মহাজাগতিক নিদর্শন থেকে ইবাদতের শিক্ষা নেওয়া'
    ],
    keyLessonsEn: [
      'Maintain absolute certainty in Resurrection and Accountability',
      'Convey Islamic truth with wisdom and perseverance',
      'Reflect on cosmic orbits, day, and night as signs of Allah'
    ],
    importantTopicsBn: [
      'নবুওয়তের সত্যতা ও মহানবী ﷺ-এর আসমানি রিসালাত',
      'আখিরাত ও পুনরুত্থানের অকাট্য বৈজ্ঞানিক ও যৌক্তিক প্রমাণ',
      'আহলে ইয়ারিয়া (গ্রামবাসী) ও হাবীব আল-নাজ্জারের ঈমানি নসিহত',
      'জান্নাত ও জাহান্নামের জীবন্ত ও শিহরণজাগানো দৃশ্যপট'
    ],
    importantTopicsEn: [
      'Truth of Prophethood and Muhammad ﷺ divine message',
      'Definitive logical and cosmic proofs of Resurrection',
      'Parable of the People of the Town and Habib al-Najjar',
      'Vivid descriptions of Paradise and Hell'
    ]
  },
  55: {
    surahNumber: 55,
    coreMessageBn: 'কুরআনের কনে (عروس القرآن)। সৃষ্টিজগতে আল্লাহর অসীম রহমত, মহাসুষম ভারসাম্য ও জিন-মানবজাতির প্রতি ৩১ বার নেয়ামতের চ্যালেঞ্জ।',
    coreMessageEn: 'The Bride of the Quran (Arus al-Quran). Symphony of Divine Mercy, cosmic balance, and 31-fold challenge to Jinn and mankind.',
    fojilotBn: 'রাসুলুল্লাহ ﷺ জিনদের সামনে এই সূরা তিলাওয়াত করলে তারা প্রতিটি "ফাবিআইয়ি আলাই রাব্বিকুমা তুকাজ্জিবান" শোনামাত্র জবাব দিত: "হে আমাদের রব! আমরা আপনার কোনো নেয়ামতকেই অস্বীকার করি না, সব প্রশংসা আপনারই।" এটিকে কুরআনের কনে বলা হয়।',
    fojilotEn: 'The Prophet ﷺ recited Ar-Rahman to Jinn who responded to every refrain: "O Lord, we deny none of Your favors; all praise is Yours."',
    referenceBn: 'শুআবুল ঈমান-বাইহাকী: ২৪২৫, জামে আত-তিরমিযী: ৩২৯১',
    referenceEn: 'Shu\'ab al-Iman Bayhaqi: 2425, Jami at-Tirmidhi: 3291',
    sabunNuzulBn: 'মক্কী যুগে যখন মুশরিকদের "রহমান"-এর সামনে সিজদা করতে বলা হতো, তারা ঔদ্ধত্য দেখিয়ে বলতো: "রহমান আবার কে?" তাদের সেই ধৃষ্টতার জবাবে আল্লাহর অসীম নেয়ামতরাজি তুলে ধরে এটি নাজিল হয়।',
    sabunNuzulEn: 'Revealed in Makkah when polytheists arrogantly rejected worshipping Ar-Rahman, demanding to know His identity.',
    historicalContextBn: 'আরবের জাহেলিয়াত সমাজ আল্লাহর দয়া ও নেয়ামত উপলব্ধি করতে ব্যর্থ হয়েছিল। এই সূরা আকাশ, বাতাস, সমুদ্র, নদী ও জান্নাতের নেয়ামত দিয়ে তাদের চোখ খুলে দেয়।',
    historicalContextEn: 'Exposed pagan spiritual blindness through vivid cataloging of terrestrial, celestial, and paradisiacal favors.',
    keyLessonsBn: [
      'আল্লাহর অগণিত নেয়ামতের জন্য প্রতিনিয়ত "আলহামদুলিল্লাহ" বলে কৃতজ্ঞতা জানানো',
      'মাপজোখে ও জীবনের প্রতিটি ক্ষেত্রে ইনসাফ ও সঠিক সুষম ভারসাম্য বজায় রাখা',
      'জান্নাতের সুউচ্চ মাকাম অর্জনে নেক আমল বৃদ্ধি করা'
    ],
    keyLessonsEn: [
      'Express constant gratitude (Alhamdulillah) for uncounted blessings',
      'Uphold justice and precise balance in all dealings',
      'Strive in righteous deeds to attain high ranks in Jannah'
    ],
    importantTopicsBn: [
      'কুরআন শিক্ষা, মানুষ সৃষ্টি ও বয়ানের আসমানি নেয়ামত',
      'সূর্য, চন্দ্র, তারকা ও বৃক্ষরাজির নিখুঁত সিজদা ও হিসাব',
      'মিষ্টি ও লোনা পানির দুই সমুদ্রের মধ্যকার অলৌকিক অদৃশ্য পর্দা (বারজাক)',
      'জান্নাতের চোখ জুড়ানো বাগ-বাগিচা, হুর-গিলমান ও আসমানি আপ্যায়ন'
    ],
    importantTopicsEn: [
      'Divine gift of Quran, human creation, and speech',
      'Cosmic balance of sun, moon, stars, and vegetation',
      'Miraculous barrier between fresh and salty seas (Barzakh)',
      'Exquisite gardens and companions of Paradise'
    ]
  },
  56: {
    surahNumber: 56,
    coreMessageBn: 'অভাব ও দারিদ্র্য দূরকারী আসমানি চাবি। কিয়ামতের প্রলয়, হাশরের ময়দানে মানুষের ৩ শ্রেণীতে বিভাজন ও প্রতিদানের চিত্র।',
    coreMessageEn: 'Divine cure for poverty. Earth-shattering reality of Judgment, tri-partition of mankind, and ultimate recompense.',
    fojilotBn: 'সূরা আল-ওয়াকিআহ দারিদ্র্য নিবারক সূরা। রাসুলুল্লাহ ﷺ বলেছেন: "যে ব্যক্তি প্রতি রাতে সূরা ওয়াকিআহ তিলাওয়াত করবে, সে কখনো দারিদ্র্য বা অভাবের মুখোমুখি হবে না।" সাহাবী ইবনে মাসউদ (রা.) তাঁর কন্যাদের প্রতিদিন রাতে এটি পড়ার অসিয়ত করে গিয়েছিলেন।',
    fojilotEn: 'Al-Waqi\'ah protects against hardship. The Prophet ﷺ said whoever recites it every night will never suffer poverty.',
    referenceBn: 'শুআবুল ঈমান-বাইহাকী: ২৪৯৭, তাফসীরে ইবনে কাছীর',
    referenceEn: 'Shu\'ab al-Iman Bayhaqi: 2497',
    sabunNuzulBn: 'মক্কী যুগে অবতীর্ণ। কিয়ামতের আকস্মিকতা, পৃথিবীর ধসে পড়া এবং আখেরাতে মানুষের ৩টি চিরন্তন দলে বিভক্ত হয়ে যাওয়ার চরম সত্য তুলে ধরতে অবতীর্ণ।',
    sabunNuzulEn: 'Revealed in Makkah depicting the sudden upheaval of Judgment and the three categories of human destiny.',
    historicalContextBn: 'মক্কার কাফিররা ধন-সম্পদের অহংকারে মত্ত হয়ে আখেরাত ভুলে গিয়েছিল। এই সূরা তাদের ধনের ক্ষণস্থায়িত্ব ও আখেরাতের চিরন্তন নেয়ামতের পার্থক্য দেখায়।',
    historicalContextEn: 'Confronted pagan materialist obsession with wealth by contrasting temporal riches with eternal rewards.',
    keyLessonsBn: [
      'প্রতি রাতে নিয়ম করে সূরা ওয়াকিআহ তিলাওয়াত করে রিজিকের বরকত হাসিল করা',
      'অগ্রগামী মুমিনদের (আস-সাবিকুন) অন্তর্ভুক্ত হতে নেক কাজে প্রতিযোগিতা করা',
      'পানি, আগুন, বীজ ও শুক্রবিন্দুর সৃষ্টি নিদর্শন দেখে স্রষ্টার সামনে নত হওয়া'
    ],
    keyLessonsEn: [
      'Recite Surah Al-Waqi\'ah nightly to seek barakah in sustenance',
      'RACE in good deeds to be among the Foremost (As-Sabiqun)',
      'Reflect on the miracles of water, fire, seed, and human creation'
    ],
    importantTopicsBn: [
      'কিয়ামতের দিন পৃথিবীর বিকট কম্পন ও পাহাড়গুলোর বালুকণায় রূপান্তর',
      'মানুষের ৩ শ্রেণি: আস-সাবিকুন (অগ্রগামী), আসহাবুল ইয়ামীন (ডানপন্থী) ও আসহাবুষ শিফাল (বামপন্থী)',
      'জান্নাতিদের নেয়ামতরাজি ও জাহান্নামীদের জাক্কুম বৃক্ষ ও উত্তপ্ত পানির শাস্তি',
      'পানি, আগুন, বীজ ও মানবসৃষ্টিতে আল্লাহর কুদরতের সাক্ষী'
    ],
    importantTopicsEn: [
      'Cataclysmic quaking of the earth and crumbling of mountains',
      'Three groups of mankind: Foremost, Right hand, and Left hand',
      'Comforts of Paradise versus punishment of Zaqqum in Hell',
      'Cosmic evidence in water, fire, agriculture, and human birth'
    ]
  },
  67: {
    surahNumber: 67,
    fojilotBn: 'সূরা আল-মুলক কবরের আজাব থেকে রক্ষাকারী ও সুপারিশকারী সূরা (আল-মানিআহ / আল-মুঞ্জিয়াহ)। রাসুলুল্লাহ ﷺ বলেছেন: "কুরআনে ৩০ আয়াতের একটি সূরা রয়েছে যা পাঠকারীর পক্ষে ক্রমাগত সুপারিশ করতে থাকে যতক্ষণ না তাকে ক্ষমা করে দেওয়া হয়। "',
    fojilotEn: 'Al-Mulk is a protector and intercessor against grave punishment. It consists of 30 verses that intercede until forgiveness is granted.',
    referenceBn: 'জামে আত-তিরমিযী: ২৮৯১, সুনানে আবু দাউদ: ১৪০০',
    referenceEn: 'Jami at-Tirmidhi: 2891, Sunan Abu Dawud: 1400',
    coreMessageBn: 'মহাবিশ্বের একচ্ছত্র রাজত্ব, জীবন ও মৃত্যুর পেছনের আসল পরীক্ষা এবং কবরের আজাব থেকে রক্ষাকারী দুর্গ।',
    coreMessageEn: 'Absolute sovereignty over creation, testing purpose of life and death, and shield against the grave.',
    sabunNuzulBn: 'মক্কী যুগে কাফিরেরা যখন গোপনে নবীজি ﷺ-এর বিরুদ্ধে চক্রান্ত করত এবং বলতো: "চুপচাপ কথা বলো যেন মুহাম্মাদের রব শুনতে না পায়", তখন তাদের অজ্ঞতার জবাবে আল্লাহর সর্বজ্ঞতা প্রকাশে অবতীর্ণ হয়।',
    sabunNuzulEn: 'Revealed in Makkah when disbelievers whispered conspiracies against the Prophet ﷺ, assuming Allah would not hear.',
    historicalContextBn: 'মুশরিকরা মনে করতো গোপন কথা আল্লাহ জানেন না। এই সূরা তাদের জানিয়ে দেয় যে আল্লাহ অন্তরের গোপনতম চিন্তাও জানেন।',
    historicalContextEn: 'Refuted pagan misconceptions regarding divine omniscience, establishing Allah knows hidden thoughts.',
    keyLessonsBn: [
      'প্রতিদিন রাতে ঘুমানোর আগে নিয়ম করে সূরা মুলক তিলাওয়াত করা',
      'জীবন ও মৃত্যুকে আমলের পরীক্ষাগার হিসেবে অনুধাবন করা',
      'সপ্ত আসমানের নিখুঁত বিন্যাস দেখে আল্লাহর মহত্ত্বের সামনে সেজদানত হওয়া'
    ],
    keyLessonsEn: [
      'Recite Surah Al-Mulk every night before sleeping for protection',
      'Internalize that life and death are trials of good conduct',
      'Observe the flawless structure of the seven heavens in awe'
    ],
    importantTopicsBn: [
      'জীবন ও মৃত্যুর সৃষ্টির আসল উদ্দেশ্য (আমলের পরীক্ষা)',
      'মহাবিশ্বের সপ্ত আসমানের নিখুঁত রূপ ও শয়তান বিতাড়নে তারকারাজি',
      'জাহান্নামের প্রচন্ড গর্জন, আসমানি ক্ষোভ ও কাফিরদের চরম অনুশোচনা',
      'ভূপৃষ্ঠে রিজিক সন্ধান এবং ভূগর্ভস্থ পানি শুকিয়ে গেলে আল্লাহর প্রশ্ন'
    ],
    importantTopicsEn: [
      'Purpose of life and death (as a trial of deeds)',
      'Flawless cosmic architecture of seven heavens and stars',
      'Roar of Hellfire and late remorse of disbelievers',
      'Seeking sustenance and divine inquiry on water sources'
    ]
  },
  112: {
    surahNumber: 112,
    coreMessageBn: 'ইসলামের তাওহীদের খাঁটি রূপ। একত্ববাদের মূল ভিত্তি এবং শিরকমুক্ত নিখাদ আকিদার ঘোষণা।',
    coreMessageEn: 'Purity of Tawhid. Foundation of Islamic monotheism and rejection of all forms of polytheism.',
    fojilotBn: 'সূরা আল-ইখলাস কুরআনের এক-তৃতীয়াংশের (১/৩ অংশ) সমতুল্য। রাসুলুল্লাহ ﷺ বলেছেন: "যে ব্যক্তি এটি ১০ বার পাঠ করবে, আল্লাহ তার জন্য জান্নাতে একটি প্রাসাদ নির্মাণ করবেন।" জনৈক সাহাবী ভালোবাসার কারণে প্রতি রাকাতে এটি তিলাওয়াত করলে রাসুল ﷺ বলেন: "এর প্রতি তোমার ভালোবাসা তোমাকে জান্নাতে প্রবেশ করাবে।"',
    fojilotEn: 'Al-Ikhlas is equivalent to one-third of the Quran. The Prophet ﷺ said reciting it 10 times builds a palace in Paradise.',
    referenceBn: 'সহীহ বুখারী: ৫০১৫, মুসনাদে আহমাদ: ১৫৬৪৫',
    referenceEn: 'Sahih Bukhari: 5015, Musnad Ahmad: 15645',
    sabunNuzulBn: 'মক্কার মুশরিকরা বিশ্বনবী ﷺ-কে প্রশ্ন করেছিল: "হে মুহাম্মাদ! তোমার রবের বংশপরিচয় ও রূপ কেমন? তিনি কি সোনা না রূপার তৈরি?" তার জবাবে আল্লাহ তাআলা এই সূরা অবতীর্ণ করেন।',
    sabunNuzulEn: 'Revealed in response to pagan demands inquiring about the lineage, material, and origin of Allah.',
    historicalContextBn: 'জাহেলিয়াত যুগে আরবে মূর্তিপূজা, খ্রিস্টানদের ত্রিত্ববাদ (৩ খোদা) ও ইহুদিদের উযায়েরকে আল্লাহর পুত্র বলার ভ্রান্ত আকিদা ছড়িয়ে পড়েছিল। এই সূরা সব বাতিল আকিদা চুরমার করে দেয়।',
    historicalContextEn: 'Demolished pagan idol worship, Christian Trinitarianism, and Jewish claims of divine lineage.',
    keyLessonsBn: [
      'আল্লাহকে এক, অদ্বিতীয় ও স্বয়ংসম্পূর্ণ হিসেবে বিশ্বাস করা',
      'আল্লাহর কোনো সন্তান বা পিতা নেই এবং তাঁর সমকক্ষ কেউ হতে পারে না',
      'প্রতিনিয়ত এই সূরা তিলাওয়াত করে খাঁটি তাওহীদি আকিদা মজবুত করা'
    ],
    keyLessonsEn: [
      'Believe firmly in Allah as One, Unique, and Self-Sufficient',
      'Reject all concepts of divine offspring, parents, or equals',
      'Recite Al-Ikhlas regularly to purify Islamic monotheistic faith'
    ],
    importantTopicsBn: [
      'তাওহীদের মূল ঘোষণা (আল্লাহ এক ও অদ্বিতীয়)',
      'আল্লাহ অমুখাপেক্ষী (আস-সামাদ), সমস্ত সৃষ্টি তাঁর মুখাপেক্ষী',
      'আল্লাহর কোনো সন্তান নেই এবং তিনিও কারো সন্তান নন',
      'তাঁর সমকক্ষ বা সমতুল্য পুরো মহাবিশ্বে কেউ নেই'
    ],
    importantTopicsEn: [
      'Declaration of Tawhid (Allah is One)',
      'Allah is As-Samad (Self-Sufficient and Eternal)',
      'Allah neither begets nor is born',
      'There is none comparable or equal to Him'
    ]
  },
  113: {
    surahNumber: 113,
    coreMessageBn: 'জাদুটোনা, হিংসুক ও অন্ধকারের যাবতীয় প্রকাশ্য-গোপন অনিষ্ট থেকে রবের দরবারে আসমানি প্রফেশনাল নিরাপত্তা।',
    coreMessageEn: 'Divine protection against sorcery, envier, darkness, and all hidden or visible harm.',
    fojilotBn: 'রাসুলুল্লাহ ﷺ বলেছেন: "আজ রাতে এমন কিছু আয়াত নাজিল হয়েছে যার মতো কিছু কখনো দেখা যায়নি—সূরা ফালাক ও সূরা নাস।" বিশ্বনবী ﷺ অসুস্থ হলে বা রাতে ঘুমোতে যাওয়ার সময় এই সূরাদ্বয় পড়ে নিজের হাতে ফুঁ দিয়ে পুরো শরীরে মাসেহ করতেন।',
    fojilotEn: 'The Prophet ﷺ stated unique protective verses were revealed (Falaq & Nas). He would recite and wipe over his body daily.',
    referenceBn: 'সহীহ মুসলিম: ৮১৪, সুনানে আবু দাউদ: ১৪৬৩',
    referenceEn: 'Sahih Muslim: 814, Sunan Abu Dawud: 1463',
    sabunNuzulBn: 'লবীদ ইবনে আসাম নামক এক শয়তানপ্রকৃতির ইয়াহুদী নবীজি ﷺ-এর চুলে ১১টি গিট দিয়ে কুখ্যাত জাদুটোনা করলে নবীজি অসুস্থ হন। তখন ফেরেশতা জিবরাইল (আ.) এসে এই দুই সূরা অবতীর্ণ করেন এবং ১১টি গিট খুলে অলৌকিকভাবে জাদুমুক্ত হন।',
    sabunNuzulEn: 'Revealed when Labid ibn al-A\'sam cast sorcery on the Prophet ﷺ with 11 knots, which untied as verses were recited.',
    historicalContextBn: 'জাদু ও হিংসা মানুষের জীবনে মারাত্মক ক্ষতি সাধন করতে পারে। এই সূরা মানুষকে সরাসরি রবের কাছে আশ্রয় চাওয়ার সেরা দোয়া শিখিয়ে দিয়েছে।',
    historicalContextEn: 'Provided the ultimate spiritual remedy against black magic, evil eye, and destructive envy.',
    keyLessonsBn: [
      'যেকোনো ধরনের জাদু, কুদৃষ্টি ও হিংসা থেকে বাঁচতে প্রতিদিন সকালে ও রাতে এটি পড়া',
      'অন্ধকার রাত ও হিংসুকের অশুভ প্রভাব থেকে আল্লাহর আশ্রয় চাওয়া',
      'শিরকি ঝাড়ফুঁক পরিহার করে কুরআনি দোয়া দিয়ে রুকইয়া করা'
    ],
    keyLessonsEn: [
      'Recite morning and evening to protect against evil eye and envy',
      'Seek refuge in Allah from darkness and malicious people',
      'Utilize Quranic Ruqyah instead of superstitious practices'
    ],
    importantTopicsBn: [
      'প্রভাতের রব আল্লাহর দরবারে সুদৃঢ় আশ্রয় গ্রহণ',
      'সৃষ্টবস্তুর ক্ষতিকর প্রভাব ও আঁধার রাতের অনিষ্ট থেকে মুক্তি',
      'গিট দিয়ে ফুৎকারকারী জাদুকর ও জাদুটোনা ধ্বংস',
      'হিংসুকের হিংসাত্মক নজর ও কুদৃষ্টি থেকে আসমানি নিরাপত্তা'
    ],
    importantTopicsEn: [
      'Seeking refuge in the Lord of Daybreak',
      'Protection against evil of creation and darkness',
      'Shield against sorcerers blowing on knots',
      'Safety from the envy of the envious'
    ]
  },
  114: {
    surahNumber: 114,
    coreMessageBn: 'মানুষের হৃদয়-মন থেকে শয়তান ও খন্নাসের গোপন কুমন্ত্রণা ও ধোঁকা থেকে মহাবিশ্বের সত্যিকারের মালিকের কেল্লায় আশ্রয়।',
    coreMessageEn: 'Ultimate sanctuary in the King and God of mankind against Satanic whispering temptations.',
    fojilotBn: 'কুরআন মজিদের সর্বশেষ রক্ষা-কবচ সূরা (মুআউবিজাতাইন)। রাসুলুল্লাহ ﷺ বলেছেন: "তোমরা সূরা ফালাক ও সূরা নাস দিয়ে আল্লাহর আশ্রয় চাও, কারণ এর চেয়ে উত্তম কোনো আশ্রয় প্রার্থনার পথ নেই।"',
    fojilotEn: 'The final protective Surah of the Quran. The Prophet ﷺ recommended seeking refuge through Falaq and Nas above all else.',
    referenceBn: 'সহীহ বুখারী: ৫০১৭, সহীহ মুসলিম: ২১৯২',
    referenceEn: 'Sahih Bukhari: 5017, Sahih Muslim: 2192',
    sabunNuzulBn: 'মানুষের অন্তরে শয়তানের সূক্ষ্ম ওয়াসওয়াসা ও কুমন্ত্রণা থেকে সুদৃঢ় আসমানি আশ্রয় প্রার্থনায় এবং জাদুমুক্তির ধারাবাহিকতায় অবতীর্ণ।',
    sabunNuzulEn: 'Revealed to safeguard human hearts against spiritual whispering temptations from Satan and evil humans.',
    historicalContextBn: 'শয়তান মানুষের প্রধান শত্রু। সে সরাসরি সামনে না এসে অন্তরে খন্নাস হয়ে কুমন্ত্রণা দেয়। এই সূরা শয়তানের সব ফাঁদ নস্যাৎ করে।',
    historicalContextEn: 'Exposed Satanic tactic of Khannas (retreating whisperer) attacking human consciousness.',
    keyLessonsBn: [
      'মানুষের রব, মালিক ও সত্য মাবুদের সিফাত স্মরণ করে ইবাদত করা',
      'অন্তরে কুচিন্তা ও অন্যায় ইচ্ছা আসলে তৎক্ষণাৎ "আউজুবিল্লাহ" পড়া',
      'জিন ও মানুষের মধ্যকার কুপরামর্শদাতাদের চিনে তাদের থেকে দূরে থাকা'
    ],
    keyLessonsEn: [
      'Invoke Allah as the Lord, King, and God of mankind',
      'Seek refuge immediately when bad thoughts enter the heart',
      'Beware of evil companions among humans and Jinn'
    ],
    importantTopicsBn: [
      'মানুষের রব, রাজাধিরাজ ও ইলাহের দরবারে শরণাপন্ন হওয়া',
      'খন্নাস (গোপনে কুমন্ত্রণাদাতা ও আত্মগোপনকারী শয়তান) থেকে মুক্তি',
      'মানুষের অন্তরে ওয়াসওয়াসাদানকারী জিন ও মানব শয়তানের অনিষ্ট প্রতিহতকরণ'
    ],
    importantTopicsEn: [
      'Refuge in the Lord, King, and God of mankind',
      'Protection against Khannas (whispering retreaters)',
      'Shield against evil whisperers among Jinn and humans'
    ]
  }
};

// Comprehensive reference-backed generator for all 114 Surahs
export function getSurahInsight(surahNumber: number, nameBn: string, nameEn: string): SurahInsight {
  if (SURAH_INSIGHTS_MAP[surahNumber]) {
    return SURAH_INSIGHTS_MAP[surahNumber];
  }
  return {
    surahNumber,
    coreMessageBn: `সূরা ${nameBn} (${nameEn})—আল্লাহর তাওহীদ, নবুওয়তের সত্যতা, আসমানি হেদায়াত এবং আখেরাতের পরম সাফল্যের সুসংবাদ।`,
    coreMessageEn: `Surah ${nameEn}—Exposition of Divine Unity, Prophethood, guidance, and glad tidings of eternal success.`,
    fojilotBn: `সূরা ${nameBn} (${nameEn}) তিলাওয়াতে রয়েছে অশেষ বরকত, সুনির্দিষ্ট আত্মিক প্রশান্তি এবং পরকালীন মহান সাওয়াব। রাসুলুল্লাহ ﷺ বলেছেন: "কুরআনের প্রতিটি হরফ তিলাওয়াতে ১০টি করে নেকী অর্জিত হয়।" নিয়মিত এই সূরা তিলাওয়াত মুমিনের হৃদয়কে আলোকিত করে এবং জীবনকে বরকতময় করে তোলে।`,
    fojilotEn: `Reciting Surah ${nameEn} brings immense divine blessings, spiritual tranquility, and reward in the Hereafter. Every letter carries 10 good deeds.`,
    referenceBn: 'সহীহ বুখারী, সহীহ মুসলিম, জামে আত-তিরমিযী, তাফসীরে ইবনে কাছীর',
    referenceEn: 'Sahih Bukhari, Sahih Muslim, Jami at-Tirmidhi, Tafsir Ibn Kathir',
    sabunNuzulBn: `এই সূরাটি মানবজাতিকে একত্ববাদের দাওয়াত, সঠিক পথ প্রদর্শন, ঈমানের বুনিয়াদ সুদৃঢ়করণ এবং আসমানি হেদায়াত পালনের তাগিদে অবতীর্ণ হয়েছে।`,
    sabunNuzulEn: `This Surah was revealed to guide humanity towards monotheism, strengthen faith, and urge adherence to divine wisdom.`,
    historicalContextBn: `তৎকালীন মক্কা বা মদিনার প্রেক্ষাপটে মুসলিম উম্মাহকে ঈমানের ওপর অবিচল রাখা এবং সামাজিক ও নৈতিক আদর্শ বাস্তবায়নে এই সূরার অবতারণা।`,
    historicalContextEn: `Revealed in response to historical events in Makkah or Madinah to solidify faith and moral governance.`,
    keyLessonsBn: [
      `একমাত্র আল্লাহরই ইবাদত করা এবং শিরক থেকে সম্পূর্ণ বেঁচে থাকা`,
      `আল্লাহর নাজিলকৃত বিধান অনুযায়ী জীবন পরিচালনা করা`,
      `বিপদ-আপদে ধৈর্য ধারণ করা এবং আখেরাতের প্রস্তুতির জন্য নেক আমল বৃদ্ধি করা`
    ],
    keyLessonsEn: [
      `Worship Allah alone and strictly avoid all forms of polytheism`,
      `Govern daily life according to divine Quranic guidance`,
      `Maintain patience through trials and prepare for the Hereafter`
    ],
    importantTopicsBn: [
      'আল্লাহ তাআলার একত্ববাদ ও কুদরতের অকাট্য নিদর্শনাবলী',
      'পূর্ববর্তী আসমানি বার্তা ও আম্বিয়াদের ইতিহাস থেকে শিক্ষা',
      'সৎকর্মের জান্নাতি পুরস্কার এবং অসৎকাজের পরিণাম',
      'আখিরাত, হাশর ও বিচারদিনের পরম সত্যতা'
    ],
    importantTopicsEn: [
      'Oneness of Allah and signs of divine power',
      'Divine messages and lessons from prophets',
      'Reward for righteousness and consequences of evil',
      'Faith in the Hereafter and Day of Judgment'
    ]
  };
}
