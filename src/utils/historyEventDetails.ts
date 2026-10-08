import { HistoryEvent } from '../data/islamicHistoryData';
import { ZikrLanguage } from '../types';

export interface EventReligiousContext {
  quranAyat: {
    arabic: string;
    translationBn: string;
    translationEn: string;
    surah: string;
  };
  hadith: {
    textBn: string;
    textEn: string;
    source: string;
    arabicSnippet?: string;
  };
  classicalBooks: Array<{
    titleBn: string;
    authorBn: string;
    era: string;
  }>;
  keyLessons: string[];
  spiritualTakeaway: string;
}

// Specific curated references for iconic Islamic events
const SPECIFIC_EVENT_DETAILS: Record<number, Partial<EventReligiousContext>> = {
  // 570 CE: Birth of Rasulullah {SAW}
  570: {
    quranAyat: {
      arabic: 'وَمَا أَرْسَلْنَاكَ إِلَّا رَحْمَةً لِّلْعَالَمِينَ',
      translationBn: 'আমি আপনাকে সমগ্র বিশ্বজগতের জন্য কেবল এক অফুরন্ত রহমতস্বরূপ প্রেরণ করেছি।',
      translationEn: 'And We have not sent you, [O Muhammad], except as a mercy to the worlds.',
      surah: 'সূরা আল-আম্বিয়া: ১০৭ • Surah Al-Anbiya: 107',
    },
    hadith: {
      textBn: 'রাসূলুল্লাহ {SAW} কে সোমবার রোজা রাখা সম্পর্কে জিজ্ঞাসা করা হলে তিনি বলেন: "এই দিনে আমি জন্মগ্রহণ করেছি এবং এই দিনেই আমার ওপর ওহি অবতীর্ণ হয়েছে।"',
      textEn: 'When asked about fasting on Mondays, the Prophet {SAW} said: "That was the day on which I was born, and the day on which revelation was sent down to me."',
      source: 'সহীহ মুসলিম • Sahih Muslim (হাদিস: ১১৬২)',
      arabicSnippet: 'ذَاكَ يَوْمٌ وُلِدْتُ فِيهِ وَأُنْزِلَ عَلَيَّ فِيهِ',
    },
    classicalBooks: [
      { titleBn: 'আর-রাহীকুল মাখতূম (মহিমান্বিত জীবনী)', authorBn: 'আল্লামা সফিউর রহমান মুবারকপূরী', era: 'আধুনিক প্রামাণ্য গ্রন্থ' },
      { titleBn: 'সীরাতে ইবনে হিশাম (১ম খণ্ড)', authorBn: 'ইমাম আবু মুহাম্মদ ইবনে হিশাম (রহ.)', era: '৩য় হিজরি শতক' },
      { titleBn: 'আল-বিদায়াহ ওয়ান-নিহায়াহ (২য় খণ্ড)', authorBn: 'হাফেজ ইবনে কাসীর (রহ.)', era: '৮ম হিজরি শতক' },
      { titleBn: 'তারিখুল উমাম ওয়াল মুলূক', authorBn: 'ইমাম মুহাম্মদ ইবনে জারীর আত-তাবারী', era: '৪র্থ হিজরি শতক' },
    ],
    keyLessons: [
      'হস্তীবাহিনীর ধ্বংসের বছর আল্লাহ তাআলা নিজের ঘর কাবাকে রক্ষা করে নবীজির শুভ আগমনকে সম্মানিত করেন।',
      'পিতৃহীন এতিম অবস্থায় জন্ম নিয়েও আল্লাহ তাআলা উনাকে সমগ্র জাহানের শ্রেষ্ঠ আদর্শ হিসেবে গড়ে তোলেন।',
      'নবীজির বিলাদত সারা বিশ্বের মজলুম ও পথহারা মানবতার জন্য মুক্তির চিরন্তন বার্তা বহন করে।',
    ],
    spiritualTakeaway: 'নবীজি {SAW} উনার আগমন অন্ধকার পৃথিবীর বুকে নূরের সূর্যোদয় — উনার সুন্নাহর মাঝেই উম্মাহর একমাত্র সফলতা।',
  },

  // 610 CE: First Revelation at Cave of Hira
  610: {
    quranAyat: {
      arabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ ۝ خَلَقَ الْإِنسَانَ مِنْ عَلَقٍ ۝ اقْرَأْ وَرَبُّكَ الْأَكْرَمُ',
      translationBn: 'পাঠ করুন আপনার প্রতিপালকের নামে যিনি সৃষ্টি করেছেন। যিনি মানুষকে সৃষ্টি করেছেন জমাট রক্ত থেকে। পাঠ করুন, আর আপনার প্রতিপালক পরম দয়ালু।',
      translationEn: 'Read in the name of your Lord who created. Created man from a clinging substance. Read, and your Lord is the most Generous.',
      surah: 'সূরা আল-আলাক: ১-৩ • Surah Al-Alaq: 1-3',
    },
    hadith: {
      textBn: 'আম্মাজান আয়েশা {RAHA} বলেন: নবীজি {SAW} হেরা গুহায় একাকী ধ্যানে মগ্ন থাকতেন। অতঃপর সত্য ওহি নিয়ে জিবরিল {AS} আগমন করলেন এবং বললেন, পড়ুন! নবীজি বললেন: আমি তো পড়তে জানি না...',
      textEn: 'Aisha {RAHA} narrated: The commencement of the Divine Inspiration to Allah\'s Messenger was in the form of good dreams. Then the Angel Gabriel came to him in the Cave of Hira...',
      source: 'সহীহ বুখারী • Sahih al-Bukhari (হাদিস: ৩)',
      arabicSnippet: 'حَتَّى جَاءَهُ الْحَقُّ وَهُوَ فِي غَارِ حِرَاءٍ',
    },
    classicalBooks: [
      { titleBn: 'সহীহ বুখারী (কিতাবু বাদইল ওহী)', authorBn: 'ইমাম মুহাম্মদ ইবনে ইসমাইল বুখারী', era: 'হাদিসের প্রামাণ্য গ্রন্থ' },
      { titleBn: 'যাদুল মা\'আদ ফী হাদয়ি খাইরিল ইবাদ', authorBn: 'ইবনুল কাইয়্যিম আল-জাওযিয়্যাহ', era: '৮ম হিজরি শতক' },
      { titleBn: 'সীরাতে ইবনে ইসহাক', authorBn: 'মুহাম্মদ ইবনে ইসহাক (রহ.)', era: '২য় হিজরি শতক' },
    ],
    keyLessons: [
      'ইসলামের প্রথম নির্দেশনাই হলো জ্ঞান ও অধ্যয়ন — আল্লাহর নামে জ্ঞানার্জনই সকল সফলতার চাবিকাঠি।',
      'আত্মিক পরিশুদ্ধি ও নির্জন ইবাদত অন্তরে হিদায়াত ও ওহির নূর ধারণ করার প্রস্তুতি তৈরি করে।',
      'কঠিন সময়ে আম্মাজান খাদিজা {RAHA} উনার আত্মবিশ্বাস ও মানসিক সমর্থন সাহসিকতার শ্রেষ্ঠ উদাহরণ।',
    ],
    spiritualTakeaway: 'জ্ঞান যখন স্রষ্টার নামে আহরিত হয়, তখনই তা মানবজাতিকে বর্বরতা থেকে নূরের আলোয় নিয়ে আসে।',
  },

  // 622 CE: The Great Hijrah to Madinah
  622: {
    quranAyat: {
      arabic: 'إِلَّا تَنصُرُوهُ فَقَدْ نَصَرَهُ اللَّهُ إِذْ أَخْرَجَهُ الَّذِينَ كَفَرُوا ثَانِيَ اثْنَيْنِ إِذْ هُمَا فِي الْغَارِ إِذْ يَقُولُ لِصَاحِبِهِ لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا',
      translationBn: 'তোমরা যদি তাকে সাহায্য না কর, তবে স্মরণ কর আল্লাহ তো তাকে সাহায্য করেছিলেন যখন কাফেররা তাকে বহিষ্কার করেছিল... যখন তিনি তার সঙ্গীকে বলছিলেন: চিন্তিত হয়ো না, আল্লাহ আমাদের সাথে আছেন।',
      translationEn: 'If you do not aid the Prophet - Allah has already aided him when those who disbelieved had driven him out as one of two, when they were in the cave and he said to his companion, "Do not grieve; indeed Allah is with us."',
      surah: 'সূরা আত-তাওবাহ: ৪০ • Surah At-Tawbah: 40',
    },
    hadith: {
      textBn: 'আবু বকর সিদ্দিক {RA} বলেন: আমি সাওর গুহায় নবীজিকে বললাম, মুশরিকরা যদি তাদের পায়ের দিকে তাকায় তবে আমাদের দেখে ফেলবে! নবীজি {SAW} শান্ত কণ্ঠে বললেন: "হে আবু বকর! সেই দুজনের ব্যাপারে তোমার কী ধারণা, যাদের তৃতীয়জন হলেন স্বয়ং আল্লাহ!"',
      textEn: 'Abu Bakr {RA} said: I said to the Prophet while in the cave, "If one of them looks down at his feet he will see us." He said: "O Abu Bakr! What do you think of two of whom Allah is the Third?"',
      source: 'সহীহ বুখারী • Sahih al-Bukhari (হাদিস: ৩৬৫৩)',
      arabicSnippet: 'مَا ظَنُّكَ يَا أَبَا بَكْرٍ بِاثْنَيْنِ اللَّهُ ثَالِثُهُمَا',
    },
    classicalBooks: [
      { titleBn: 'আর-রাহীকুল মাখতূম (হিজরত অধ্যায়)', authorBn: 'আল্লামা মুবারকপূরী', era: 'সীরাত সাহিত্য' },
      { titleBn: 'তারিখ আত-তাবারী (২য় খণ্ড)', authorBn: 'ইমাম আত-তাবারী', era: 'ইসলামিক ইতিহাস' },
      { titleBn: 'সীরাতে হালবিয়্যাহ', authorBn: 'আলী ইবনে বুরহানউদ্দীন আল-হালবী', era: 'ধ্রুপদী সীরাত' },
    ],
    keyLessons: [
      'দ্বীনের খাতিরে ত্যাগ স্বীকার করতে হয়; হিজরত শুধু স্থান পরিবর্তন নয়, পাপ ও অন্যায় থেকে আল্লাহর দিকে প্রত্যাবর্তন।',
      'পরিকল্পনা ও সতর্কতা গ্রহণের পর আল্লাহর ওপর পরিপূর্ণ তাওয়াক্কুলই মুমিনের চূড়ান্ত হাতিয়ার।',
      'মুহাজির ও আনসারদের ভ্রাতৃত্ব মানব ইতিহাসের সবচেয়ে নিখাদ সামাজিক ঐক্যের উজ্জ্বলতম দৃষ্টান্ত।',
    ],
    spiritualTakeaway: 'আল্লাহর ওপর তাওয়াক্কুলকারী কখনো একা নয় — গুহার সংকীর্ণ আঁধারেও আসমানী মদদ সুনিশ্চিত।',
  },

  // 624 CE: Battle of Badr
  624: {
    quranAyat: {
      arabic: 'وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنتُمْ أَذِلَّةٌ ۖ فَاتَّقُوا اللَّهَ لَعَلَّكُمْ تَشْكُرُونَ',
      translationBn: 'আর আল্লাহ তো তোমাদের বদরে সাহায্য করেছিলেন যখন তোমরা ছিলে সংখ্যায় ও শক্তিতে নিতান্ত দুর্বল। অতএব আল্লাহকে ভয় কর, যাতে তোমরা শোকরগোযারি হতে পার।',
      translationEn: 'And already had Allah given you victory at [the battle of] Badr while you were few in number. Then fear Allah; perhaps you will be grateful.',
      surah: 'সূরা আলে ইমরান: ১২৩ • Surah Ali Imran: 123',
    },
    hadith: {
      textBn: 'বদরের ময়দানে রাসূলুল্লাহ {SAW} কায়মনোবাক্যে হাত তুলে দোয়া করছিলেন: "হে আল্লাহ! আপনার কাছে দেওয়া ওয়াদা পূর্ণ করুন! যদি এই ছোট্ট দলটি আজ ধ্বংস হয়ে যায়, তবে জমিনে আপনার ইবাদত করার মতো কেউ থাকবে না!"',
      textEn: 'On the day of Badr, the Messenger of Allah looked at the polytheists who were a thousand, while his companions were three hundred and nineteen. He faced the Qiblah, stretched his hands and cried out to his Lord...',
      source: 'সহীহ মুসলিম • Sahih Muslim (হাদিস: ১৭৬৩)',
      arabicSnippet: 'اللَّهُمَّ أَنْجِزْ لِي مَا وَعَدْتَنِي',
    },
    classicalBooks: [
      { titleBn: 'সহীহ বুখারী (কিতাবুল মাগাযী - বদর পর্ব)', authorBn: 'ইমাম আল-বুখারী', era: 'হাদিস শাস্ত্র' },
      { titleBn: 'আল-বিদায়াহ ওয়ান-নিহায়াহ (৩য় খণ্ড)', authorBn: 'ইবনে কাসীর', era: 'ইতিহাস শাস্ত্র' },
      { titleBn: 'মাগাযী আল-ওয়াকিদী', authorBn: 'আল-ওয়াকিদী', era: 'যুদ্ধকালীন ইতিহাস' },
    ],
    keyLessons: [
      'সংখ্যা বা অস্ত্রের বাহ্যিক শক্তিতে নয়, বরং ঈমান, নিয়তের একনিষ্ঠতা ও আল্লাহর গায়েবি সাহায্যেই বিজয় অর্জিত হয়।',
      'প্রচণ্ড সংকট ও প্রতিকূলতার মধ্যেও আল্লাহর দরবারে বিনীতভাবে চোখের পানি ফেলে দোয়া করাই মুমিনের প্রধান শক্তি।',
      'সত্য ও মিথ্যার পার্থক্যে আল্লাহ তাআলা সর্বদা হকপন্থীদের সহায়তা করেন।',
    ],
    spiritualTakeaway: 'বদর শিক্ষা দেয়: ঈমানের দৃঢ়তা থাকলে ৩১৩ জনের নিষ্ঠাবান দল হাজারো প্রতিকূলতাকে পরাভূত করতে পারে।',
  },

  // 628 CE: Treaty of Hudaybiyyah
  628: {
    quranAyat: {
      arabic: 'إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا ۝ لِّيَغْفِرَ لَكَ اللَّهُ مَا تَقَدَّمَ مِن ذَنبِكَ وَمَا تَأَخَّرَ',
      translationBn: 'নিশ্চয়ই আমি আপনাকে দান করেছি এক সুস্পষ্ট বিজয়। যাতে আল্লাহ আপনার অতীত ও ভবিষ্যৎ ত্রুটি ক্ষমা করেন...',
      translationEn: 'Indeed, We have given you, [O Muhammad], a clear conquest, that Allah may forgive for you what preceded of your sin and what will follow...',
      surah: 'সূরা আল-ফাতহ: ১-২ • Surah Al-Fath: 1-2',
    },
    hadith: {
      textBn: 'হুদায়বিয়া থেকে ফেরার পথে সাহাবিরা যখন ভেবেছিলেন এটি একটি কঠিন চুক্তি, তখন সূরা ফাতহ অবতীর্ণ হলো। উমর {RA} বললেন: ইয়া রাসূলাল্লাহ! এটি কি বিজয়? নবীজি {SAW} বললেন: "হ্যাঁ, যার হাতে আমার প্রাণ তার শপথ, এটি নিশ্চিত বিজয়!"',
      textEn: 'When Surah al-Fath was revealed on the return from Hudaybiyyah, Umar asked: "Is this a victory, O Messenger of Allah?" He replied: "Yes, by Him in Whose Hand my soul is, it is indeed a victory!"',
      source: 'সহীহ বুখারী • Sahih al-Bukhari (হাদিস: ৪১৭৮)',
      arabicSnippet: 'أَوَفَتْحٌ هُوَ يَا رَسُولَ اللَّهِ قَالَ نَعَمْ',
    },
    classicalBooks: [
      { titleBn: 'সীরাতে ইবনে হিশাম (৩য় খণ্ড)', authorBn: 'ইবনে হিশাম', era: 'সীরাত' },
      { titleBn: 'ফাতহুল বারী শারহু সহীহিল বুখারী', authorBn: 'হাফেজ ইবনে হাজার আল-আসকালানী', era: 'হাদিস ব্যাখ্যা' },
      { titleBn: 'যাদুল মা\'আদ (৩য় খণ্ড)', authorBn: 'ইবনুল কাইয়্যিম', era: 'সীরাত দর্শন' },
    ],
    keyLessons: [
      'দূরদর্শিতা ও শান্তির পথ অনেক সময় যুদ্ধের চেয়েও সুদূরপ্রসারী এবং বৃহত্তর দ্বীনি বিজয় ছিনিয়ে আনে।',
      'নেতার প্রতি আনুগত্য ও আল্লাহর হুকুমের প্রতি অবিচল আস্থা সাময়িক পরাজয়কেও চিরস্থায়ী জয়ে পরিণত করে।',
      'চুক্তির পরবর্তী দুই বছরে আরবের অধিকাংশ গোত্র স্বেচ্ছায় ইসলামের শীতল ছায়াতলে আশ্রয় গ্রহণ করে।',
    ],
    spiritualTakeaway: 'ধৈর্য ও প্রজ্ঞার আপাত আপস আল্লাহর কাছে "ফাতহুম মুবীন" বা প্রকাশ্য বিজয়ের সোপান।',
  },

  // 630 CE: Conquest of Makkah (Fath Makkah)
  630: {
    quranAyat: {
      arabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ ۝ وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا ۝ فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ',
      translationBn: 'যখন আসবে আল্লাহর সাহায্য ও বিজয়, এবং আপনি মানুষকে দলে দলে আল্লাহর দ্বীনে প্রবেশ করতে দেখবেন, তখন আপনার রবের প্রশংসাসহ পবিত্রতা ঘোষণা করুন এবং ক্ষমা প্রার্থনা করুন।',
      translationEn: 'When the victory of Allah has come and the conquest, and you see the people entering into the religion of Allah in multitudes, then exalt [Him] with praise of your Lord and ask forgiveness of Him.',
      surah: 'সূরা আন-নাসর: ১-৩ • Surah An-Nasr: 1-3',
    },
    hadith: {
      textBn: 'মক্কা বিজয়ের দিন রাসূলুল্লাহ {SAW} অত্যন্ত বিনম্রভাবে মাথায় ভর দিয়ে উটের পিঠে কাবায় প্রবেশ করেন। তিনি কাবা চত্বরে দাঁড়িয়ে কুরাইশদের বললেন: "আজ তোমাদের বিরুদ্ধে কোনো প্রতিশোধ নেই। যাও, তোমরা সবাই মুক্ত!"',
      textEn: 'On the Conquest of Makkah, the Prophet {SAW} entered with profound humility, his head lowered. He asked Quraysh: "What do you think I will do with you?" They said: "A noble brother and son of a noble brother." He said: "Go, for you are free!"',
      source: 'সুনানে বায়হাকী • Sunan al-Bayhaqi (হাদিস: ১৮০৫৫)',
      arabicSnippet: 'لاَ تَثْرِيبَ عَلَيْكُمُ الْيَوْمَ اذْهَبُوا فَأَنْتُمُ الطُّلَقَاءُ',
    },
    classicalBooks: [
      { titleBn: 'আর-রাহীকুল মাখতূম (মক্কা বিজয়)', authorBn: 'আল্লামা মুবারকপূরী', era: 'সীরাত' },
      { titleBn: 'তারিখ আত-তাবারী (৩য় খণ্ড)', authorBn: 'ইমাম আত-তাবারী', era: 'ইতিহাস' },
      { titleBn: 'আল-ইসাবাহ ফী তাময়ীযিস সাহাবাহ', authorBn: 'হাফেজ ইবনে হাজার', era: 'সাহাবা জীবনী' },
    ],
    keyLessons: [
      'বিজয়ের চূড়ান্ত মুহূর্তে অহংকার নয়, বরং শুকরিয়া ও বিনম্রতাই একজন সত্যিকারের মুমিনের বৈশিষ্ট্য।',
      'ক্ষমা ও মহত্ত্বের মাধ্যমে শত্রুর অন্তর জয় করা তরবারির আঘাতের চেয়ে বহুগুণ শক্তিশালী।',
      'কাবা শরীফ থেকে ৩৬০টি মূর্তি অপসারণের মাধ্যমে শিরকের অন্ধকার চিরতরে দূরীভূত হয়।',
    ],
    spiritualTakeaway: 'মক্কা বিজয় মানবতার ইতিহাসে ক্ষমার সর্বোচ্চ পরাকাষ্ঠা — ক্ষমার শক্তিতেই মানুষ সত্যের কাছে সমর্পিত হয়।',
  },

  // 632 CE: The Farewell Hajj (Hajjat al-Wada)
  632: {
    quranAyat: {
      arabic: 'الْيَوْمَ أَكْمَلْتُ لَكُمْ دِينَكُمْ وَأَتْمَمْتُ عَلَيْكُمْ نِعْمَتِي وَرَضِيتُ لَكُمُ الْإِسْلَامَ دِينًا',
      translationBn: 'আজ আমি তোমাদের জন্য তোমাদের দ্বীনকে পূর্ণাঙ্গ করলাম, তোমাদের প্রতি আমার নিয়ামত সম্পূর্ণ করলাম এবং ইসলামকে তোমাদের দ্বীন হিসেবে মনোনীত করলাম।',
      translationEn: 'This day I have perfected for you your religion and completed My favor upon you and have approved for you Islam as your religion.',
      surah: 'সূরা আল-মায়িদাহ: ৩ • Surah Al-Ma\'idah: 3',
    },
    hadith: {
      textBn: 'আরাফাতের ময়দানে বিদায় হজের ঐতিহাসিক ভাষণে নবীজি {SAW} ঘোষণা করেন: "কোনো আরবের কোনো অনারবের ওপর এবং কোনো অনারবের কোনো আরবের ওপর কোনো শ্রেষ্ঠত্ব নেই, কোনো কৃষ্ণাঙ্গের ওপর শ্বেতাঙ্গের এবং কোনো শ্বেতাঙ্গের ওপর কৃষ্ণাঙ্গের শ্রেষ্ঠত্ব নেই — তাকওয়া ছাড়া!"',
      textEn: 'In his Farewell Sermon, the Prophet {SAW} declared: "All mankind is from Adam and Eve. An Arab has no superiority over a non-Arab nor a non-Arab has any superiority over an Arab... except by piety and good action."',
      source: 'মুসনাদে আহমদ • Musnad Ahmad (হাদিস: ২২৯৭৮)',
      arabicSnippet: 'لاَ فَضْلَ لِعَرَبِيٍّ عَلَى أَعْجَمِيٍّ إِلاَّ بِالتَّقْوَى',
    },
    classicalBooks: [
      { titleBn: 'সহীহ মুসলিম (কিতাবুল হজ - বিদায় হজ)', authorBn: 'ইমাম মুসলিম ইবনুল হাজ্জাজ', era: 'হাদিস শাস্ত্র' },
      { titleBn: 'যাদুল মা\'আদ (হজ অধ্যায়)', authorBn: 'ইবনুল কাইয়্যিম', era: 'সীরাত' },
      { titleBn: 'আল-বিদায়াহ ওয়ান-নিহায়াহ (৫ম খণ্ড)', authorBn: 'ইবনে কাসীর', era: 'ইতিহাস' },
    ],
    keyLessons: [
      'ইসলাম বর্ণবাদ ও বৈষম্যকে সম্পূর্ণ মূলোৎপাটন করে মানবজাতির সমতার চিরন্তন অধিকার প্রতিষ্ঠা করেছে।',
      'মানবধিকার, নারীর অধিকার, রক্ত ও সম্পদের পবিত্রতা রক্ষার অবিসংবাদিত ঘোষণা বিদায় হজের ভাষণ।',
      'কুরআন ও সুন্নাহকে আঁকড়ে রাখাই উম্মাহর পথভ্রষ্টতা থেকে বাঁচার একমাত্র রক্ষাকবচ।',
    ],
    spiritualTakeaway: 'আল্লাহর সন্তুষ্টি ও তাকওয়াই মানুষের মূল মর্যাদা — বিদায় হজের বাণী সমগ্র মানবজাতির মুক্তির সংবিধান।',
  },

  // 637 CE: Liberation of Jerusalem by Umar {RA}
  637: {
    quranAyat: {
      arabic: 'سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى الَّذِي بَارَكْنَا حَوْلَهُ',
      translationBn: 'পরম পবিত্র ও মহিমাময় সত্তা তিনি, যিনি নিজ বান্দাকে রাতের বেলায় ভ্রমণ করিয়েছিলেন মসজিদুল হারাম থেকে মসজিদুল আকসা পর্যন্ত, যার চারপাশকে আমি বরকতময় করেছি...',
      translationEn: 'Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa, whose surroundings We have blessed...',
      surah: 'সূরা আল-ইসরা: ১ • Surah Al-Isra: 1',
    },
    hadith: {
      textBn: 'রাসূলুল্লাহ {SAW} বলেন: "তিনটি মসজিদ ব্যতীত অন্য কোনো স্থানে বিশেষ সাওয়াবের উদ্দেশ্যে সফর করা যাবে না: মসজিদুল হারাম, আমার এই মসজিদ (মসজিদে নববী) এবং মসজিদুল আকসা।"',
      textEn: 'The Prophet {SAW} said: "Do not set out on a journey except for three Masjids: al-Masjid al-Haram, this Masjid of mine, and al-Masjid al-Aqsa."',
      source: 'সহীহ বুখারী • Sahih al-Bukhari (হাদিস: ১১৮৯)',
      arabicSnippet: 'لاَ تُشَدُّ الرِّحَالُ إِلاَّ إِلَى ثَلاَثَةِ مَسَاجِدَ',
    },
    classicalBooks: [
      { titleBn: 'তারিখ আত-তাবারী (৩য় খণ্ড - কুদস চুক্তি)', authorBn: 'ইমাম আত-তাবারী', era: 'ইতিহাস' },
      { titleBn: 'আল-কামিল ফিত-তারিখ', authorBn: 'ইবনুল আসীর', era: 'ইতিহাস শাস্ত্র' },
      { titleBn: 'তারিখুল খুলাফা', authorBn: 'ইমাম জালালুদ্দীন সুয়ূতী', era: 'জীবনী' },
    ],
    keyLessons: [
      'উমর {RA} উটের রশি নিজের ভৃত্যের হাতে দিয়ে হেঁটে জেরুজালেমে প্রবেশ করে ইনসাফের অনন্য নজির স্থাপন করেন।',
      'ঐতিহাসিক "উমরিয়া চুক্তি" অমুসলিমদের জান-মাল ও উপাসনালয়ের সুরক্ষায় ধর্মীয় সহনশীলতার স্বর্ণমান।',
      'বাইতুল মাকদিস মুসলিম উম্মাহর প্রথম কিবলা এবং ঈমানি অস্তিত্বের এক অবিচ্ছেদ্য অংশ।',
    ],
    spiritualTakeaway: 'ক্ষমতার অহংকার নয়, নিরহংকার ইনসাফ ও বিনয়ই বিজিত জাতির হৃদয় জয় করার আসল চাবিকাঠি।',
  },

  // 650 CE: Compilation of the Mushaf by Uthman {RA}
  650: {
    quranAyat: {
      arabic: 'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ',
      translationBn: 'নিশ্চয়ই আমিই এই মহা কুরআন অবতীর্ণ করেছি এবং অবশ্যই আমি নিজেই এর চিরন্তন সংরক্ষণকারী।',
      translationEn: 'Indeed, it is We who sent down the Qur\'an and indeed, We will be its guardian.',
      surah: 'সূরা আল-হিজর: ৯ • Surah Al-Hijr: 9',
    },
    hadith: {
      textBn: 'হুযাইফাহ {RA} কুরআন তিলাওয়াতের আঞ্চলিক মতপার্থক্য দেখে উসমান {RA} কে সতর্ক করলেন। উসমান {RA} জায়েদ ইবনে সাবিত {RA} এর নেতৃত্বে প্রামাণ্য মুসহাফ নকল করে সব মুসলিম প্রদেশে পাঠান এবং উম্মাহকে এক মুসহাফে ঐক্যবদ্ধ করেন।',
      textEn: 'Hudhaifa {RA} approached Uthman {RA} expressing concern about differing recitations. Uthman directed Zaid ibn Thabit and a team of Quraysh to transcribe standard copies and unite the ummah on one reading...',
      source: 'সহীহ বুখারী • Sahih al-Bukhari (হাদিস: ৪৯৮৭)',
      arabicSnippet: 'أَدْرِكْ هَذِهِ الأُمَّةَ قَبْلَ أَنْ يَخْتَلِفُوا فِي الْكِتَابِ',
    },
    classicalBooks: [
      { titleBn: 'ফাতহুল বারী (কিতাবু ফাযায়িলিল কুরআন)', authorBn: 'হাফেজ ইবনে হাজার আল-আসকালানী', era: 'হাদিস ব্যাখ্যা' },
      { titleBn: 'আল-ইতকান ফী উলূমিল কুরআন', authorBn: 'ইমাম জালালুদ্দীন সুয়ূতী', era: 'কুরআন বিজ্ঞান' },
      { titleBn: 'কিতাবুল মাসাহিফ', authorBn: 'ইবনে আবী দাউদ আস-সিজিস্তানী', era: 'পাণ্ডুলিপি ইতিহাস' },
    ],
    keyLessons: [
      'উম্মাহর ধর্মীয় ঐক্য রক্ষায় কুরআন শরীফের প্রামাণ্য সংরক্ষণ ছিল ইতিহাসের অন্যতম দূরদর্শী পদক্ষেপ।',
      'উসমান {RA} উনার এই খেদমতের কারণে উম্মাহ কিয়ামত পর্যন্ত এক অক্ষরে কুরআন পড়ার নেয়ামত লাভ করেছে।',
      'সত্য ও ঐক্যের স্বার্থে ব্যক্তি মতভেদ ত্যাগ করে মূল ভিত্তিমূলে ফিরে আসাই মুমিনের ধর্ম।',
    ],
    spiritualTakeaway: 'কুরআন অপরিবর্তনীয় ও চিরন্তন — আল্লাহর প্রত্যক্ষ সুরক্ষায় আজ ১৪০০ বছর পরও প্রতিটি হরফ সম্পূর্ণ অবিকৃত।',
  },

  // 1187 CE: Liberation of Jerusalem by Salahuddin Ayyubi
  1187: {
    quranAyat: {
      arabic: 'وَلَقَدْ كَتَبْنَا فِي الزَّبُورِ مِن بَعْدِ الذِّكْرِ أَنَّ الْأَرْضَ يَرِثُهَا عِبَادِيَ الصَّالِحُونَ',
      translationBn: 'আর নিশ্চয়ই আমি উপদেশের পর কিতাবে লিখে দিয়েছি যে, আমার সৎকর্মপরায়ণ বান্দারাই এই পৃথিবীর পবিত্র ভূমির উত্তরাধিকারী হবে।',
      translationEn: 'And We have already written in the book [of Psalms] after the [previous] mention that the land is inherited by My righteous servants.',
      surah: 'সূরা আল-আম্বিয়া: ১০৫ • Surah Al-Anbiya: 105',
    },
    hadith: {
      textBn: 'রাসূলুল্লাহ {SAW} বলেন: "যে ব্যক্তি বাইতুল মাকদিসে নামাজ আদায় করে, সে যেন সমস্ত পাপ থেকে সদ্য জন্ম নেওয়া শিশুর মতো নিষ্কলুষ হয়ে যায়।"',
      textEn: 'The Prophet {SAW} said regarding Sulaiman\'s prayer when building Bayt al-Maqdis: "He asked that no one comes to this mosque seeking to pray except that he emerges from his sins like the day his mother bore him."',
      source: 'সুনানে আন-নাসায়ী • Sunan an-Nasa\'i (হাদিস: ৬৯৩)',
      arabicSnippet: 'خَرَجَ مِنْ خَطِيئَتِهِ كَيَوْمِ وَلَدَتْهُ أُمُّهُ',
    },
    classicalBooks: [
      { titleBn: 'আল-নাওয়াদির আস-সুলতানিয়্যাহ', authorBn: 'ইমাম বাহাউদ্দীন ইবনে শাদ্দাদ', era: 'সালাহুদ্দীনের সমকালীন' },
      { titleBn: 'আল-বিদায়াহ ওয়ান-নিহায়াহ (১২শ খণ্ড)', authorBn: 'হাফেজ ইবনে কাসীর', era: 'ইতিহাস' },
      { titleBn: 'ওফায়াতুল আইয়ান', authorBn: 'ইবনে খাল্লিকান', era: 'জীবনী শাস্ত্র' },
    ],
    keyLessons: [
      'সালাহুদ্দীন আইয়ূবী দীর্ঘ ৮৮ বছরের দখলদারিত্বের অবসান ঘটিয়েও পরাজিত ক্রুসেডারদের প্রতি অসীম ক্ষমা প্রদর্শন করেন।',
      'পবিত্র স্থান মুক্ত করতে হলে অন্তরের তাকওয়া ও উম্মাহর অভ্যন্তরীণ ঐক্য আগে অর্জন করতে হয়।',
      'নৈতিক শ্রেষ্ঠত্ব ও মহানুভবতাই বিশ্বদরবারে ইসলামের শাশ্বত সম্মানকে সমুন্নত রাখে।',
    ],
    spiritualTakeaway: 'বিজয়ের চেয়েও বড় মহত্ত্ব হলো ক্ষমার মানসিকতা — সালাহুদ্দীন তরবারি দিয়ে নয়, চরিত্র দিয়ে জেরুজালেম জয় করেছিলেন।',
  },

  // 1453 CE: Conquest of Constantinople by Sultan Muhammad al-Fatih
  1453: {
    quranAyat: {
      arabic: 'وَعَدَ اللَّهُ الَّذِينَ آمَنُوا مِنكُمْ وَعَمِلُوا الصَّالِحَاتِ لَيَسْتَخْلِفَنَّهُمْ فِي الْأَرْضِ كَمَا اسْتَخْلَفَ الَّذِينَ مِن قَبْلِهِمْ',
      translationBn: 'তোমাদের মধ্যে যারা ঈমান আনে ও সৎকর্ম করে, আল্লাহ তাদের ওয়াদা দিচ্ছেন যে তিনি অবশ্যই পৃথিবীতে তাদের খিলাফত ও কর্তৃত্ব দান করবেন...',
      translationEn: 'Allah has promised those who have believed among you and done righteous deeds that He will surely grant them succession [to authority] upon the earth...',
      surah: 'সূরা আন-নূর: ৫৫ • Surah An-Nur: 55',
    },
    hadith: {
      textBn: 'রাসূলুল্লাহ {SAW} ভবিষ্যদ্বাণী করেছিলেন: "তোমরা অবশ্যই কুস্তুনতুনিয়া (কনস্টান্টিনোপল) জয় করবে। কতই না উত্তম সেই বিজয়ী সেনাপতি, আর কতই না উত্তম সেই বিজয়ী সেনাবাহিনী!"',
      textEn: 'The Prophet {SAW} said: "Verily you shall conquer Constantinople. What a wonderful leader will her leader be, and what a wonderful army will that army be!"',
      source: 'মুসনাদে আহমদ • Musnad Ahmad (হাদিস: ১৮৯৭৭)',
      arabicSnippet: 'لَتُفْتَحَنَّ الْقُسْطَنْطِينِيَّةُ فَلَنِعْمَ الأَمِيرُ أَمِيرُهَا',
    },
    classicalBooks: [
      { titleBn: 'তারিখুল উসমানী (উসমানীয় সাম্রাজ্যের ইতিহাস)', authorBn: 'ড. আলী মুহাম্মদ সাল্লাবী', era: 'ইতিহাস' },
      { titleBn: 'মুসনাদে আহমদ (হাদিসের সনদ)', authorBn: 'ইমাম আহমদ ইবনে হাম্বল', era: 'হাদিস শাস্ত্র' },
      { titleBn: 'শাখায়িকুন নুমানিয়্যাহ', authorBn: 'তাশকুবরিযাদাহ', era: 'উসমানীয় ইতিহাস' },
    ],
    keyLessons: [
      'রাসূলুল্লাহ {SAW} এর ৮০০ বছর আগের ভবিষ্যদ্বাণী পূরণে সুলতান মুহাম্মদ আল-ফাতিহর অবিরাম প্রস্তুতি ও নিষ্ঠা।',
      'প্রযুক্তি, বিজ্ঞান (কামান নির্মাণ) ও কৌশলগত উদ্ভাবন (স্থলভাগে জাহাজ টেনে নেওয়া) ছিল সাফল্যের স্তম্ভ।',
      'বিজয় লাভের পর নগরীর সকল ধর্মের নাগরিকদের পূর্ণ ধর্মীয় স্বাধীনতা ও নাগরিক নিরাপত্তা নিশ্চিত করা হয়।',
    ],
    spiritualTakeaway: 'নবীজির ভবিষ্যদ্বাণী অবিচল ঈমান ও বৈজ্ঞানিক কৌশলের সমন্বয়েই ইতিহাসে বাস্তবে রূপ নেয়।',
  },
};

// Category-based fallback templates to guarantee that ALL 136 events get deep, authentic references!
const CATEGORY_TEMPLATES: Record<string, EventReligiousContext> = {
  seerah: {
    quranAyat: {
      arabic: 'لَّقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ لِّمَن كَانَ يَرْجُو اللَّهَ وَالْيَوْمَ الْآخِرَ',
      translationBn: 'নিশ্চয়ই আল্লাহর রাসূলের মধ্যে রয়েছে তোমাদের জন্য সর্বোত্তম আদর্শ — তার জন্য, যে আল্লাহ ও পরকালের আশা রাখে।',
      translationEn: 'There has certainly been for you in the Messenger of Allah an excellent pattern for anyone whose hope is in Allah and the Last Day.',
      surah: 'সূরা আল-আহযাব: ২১ • Surah Al-Ahzab: 21',
    },
    hadith: {
      textBn: 'রাসূলুল্লাহ {SAW} বলেন: "আমি উত্তম চরিত্রের পূর্ণতা সাধন করার জন্যই প্রেরিত হয়েছি।"',
      textEn: 'The Prophet {SAW} said: "I have only been sent to perfect good character."',
      source: 'মুওয়াত্তা ইমাম মালিক • Muwatta Malik (হাদিস: ১৬১৪)',
      arabicSnippet: 'إِنَّمَا بُعِثْتُ لِأُتَمِّمَ حُسْنَ الأَخْلاَقِ',
    },
    classicalBooks: [
      { titleBn: 'আর-রাহীকুল মাখতূম (সীরাত গ্রন্থ)', authorBn: 'আল্লামা সফিউর রহমান মুবারকপূরী', era: 'সীরাত শাস্ত্র' },
      { titleBn: 'সীরাতে ইবনে হিশাম', authorBn: 'ইবনে হিশাম (রহ.)', era: '৩য় হিজরি' },
      { titleBn: 'যাদুল মা\'আদ ফী হাদয়ি খাইরিল ইবাদ', authorBn: 'আল্লামা ইবনুল কাইয়্যিম', era: '৮ম হিজরি' },
    ],
    keyLessons: [
      'নবী করিম {SAW} উনার জীবনের প্রতিটি ঘটনা মানবজাতির জন্য এক জীবন্ত আলোকবর্তিকা।',
      'প্রতিকূলতায় অবিচল সবর এবং আল্লাহপ্রেমই মুমিনের চূড়ান্ত রক্ষা ঢাল।',
      'নবীজির জীবনাদর্শ অনুসরণের মাঝেই পার্থিব শান্তি ও আখিরাতের মুক্তি নিহিত।',
    ],
    spiritualTakeaway: 'নবীজির সুন্নাহই হলো অন্ধকার সমুদ্রে আলোকস্তম্ভ — উনার ভালোবাসাই ঈমানের পূর্ণতা।',
  },

  battle: {
    quranAyat: {
      arabic: 'كَم مِّن فِئَةٍ قَلِيلَةٍ غَلَبَتْ فِئَةً كَثِيرَةً بِإِذْنِ اللَّهِ ۗ وَاللَّهُ مَعَ الصَّابِرِينَ',
      translationBn: 'কত ক্ষুদ্র দল আল্লাহর হুকুমে পরাক্রমশালী বিশাল দলের ওপর বিজয়ী হয়েছে! আর নিশ্চয়ই আল্লাহ ধৈর্যশীলদের সাথে আছেন।',
      translationEn: 'How many a small company has overcome a large company by permission of Allah. And Allah is with the patient.',
      surah: 'সূরা আল-বাকারাহ: ২৪৯ • Surah Al-Baqarah: 249',
    },
    hadith: {
      textBn: 'রাসূলুল্লাহ {SAW} বলেন: "জেনে রেখো, জান্নাত তরবারির ছায়াতলে (সত্যের পথে আত্মত্যাগের মাঝে)।"',
      textEn: 'The Messenger of Allah {SAW} said: "Know that Paradise is under the shade of swords."',
      source: 'সহীহ বুখারী • Sahih al-Bukhari (হাদিস: ২৮১৮)',
      arabicSnippet: 'اعْلَمُوا أَنَّ الْجَنَّةَ تَحْتَ ظِلاَلِ السُّيُوفِ',
    },
    classicalBooks: [
      { titleBn: 'কিতাবুল মাগাযী (নবীজির অভিযানসমূহ)', authorBn: 'ইমাম আল-ওয়াকিদী', era: '২য় হিজরি' },
      { titleBn: 'আল-বিদায়াহ ওয়ান-নিহায়াহ', authorBn: 'হাফেজ ইবনে কাসীর', era: 'ইতিহাস' },
      { titleBn: 'তারিখ আত-তাবারী', authorBn: 'ইমাম আত-তাবারী', era: 'ইতিহাস শাস্ত্র' },
    ],
    keyLessons: [
      'ইসলামে যুদ্ধ কখনো রাজ্যলোভের জন্য নয়, বরং জুলুম ও নিপীড়ন প্রতিহত করে সত্য প্রতিষ্ঠার উদ্দেশ্যে।',
      'অস্ত্রের চেয়ে মনের ঈমানি তেজ এবং আল্লাহর ওপর নির্ভরশীলতাই বিজয়ের প্রধান মাপকাঠি।',
      'যুদ্ধে নারী, শিশু, বৃদ্ধ ও প্রাকৃতিক পরিবেশ ধ্বংস না করার কঠোর মানবিক নিয়মনীতি পালন।',
    ],
    spiritualTakeaway: 'আল্লাহর পথে আত্মত্যাগ কখনো বৃথা যায় না — শহীদদের রক্ত সত্যের চারাগাছকে চিরসবুজ রাখে।',
  },

  spread: {
    quranAyat: {
      arabic: 'ادْعُ إِلَىٰ سَبِيلِ رَبِّكَ بِالْحِكْمَةِ وَالْمَوْعِظَةِ الْحَسَنَةِ ۖ وَجَادِلْهُم بِالَّتِي هِيَ أَحْسَنُ',
      translationBn: 'আপনি মানুষকে আপনার প্রতিপালকের পথের দিকে হিকমত (প্রজ্ঞা) ও সুন্দর উপদেশের মাধ্যমে আহ্বান করুন...',
      translationEn: 'Invite to the way of your Lord with wisdom and good instruction, and argue with them in a way that is best.',
      surah: 'সূরা আন-নাহল: ১২৫ • Surah An-Nahl: 125',
    },
    hadith: {
      textBn: 'রাসূলুল্লাহ {SAW} বলেন: "তোমাদের মাধ্যমে যদি একটি মানুষেরও অন্তরে আল্লাহ হিদায়াত দেন, তবে তা তোমাদের জন্য বহু মূল্যবান লাল উট পাওয়ার চেয়েও উত্তম!"',
      textEn: 'The Prophet {SAW} said to Ali {RA}: "By Allah, if Allah were to guide one man through you it would be better for you than red camels."',
      source: 'সহীহ বুখারী • Sahih al-Bukhari (হাদিস: ৩৭০১)',
      arabicSnippet: 'فَوَاللَّهِ لَأَنْ يَهْدِيَ اللَّهُ بِكَ رَجُلاً وَاحِداً خَيْرٌ لَكَ',
    },
    classicalBooks: [
      { titleBn: 'ফুতুহুল বুলদান (দেশ জয়ের ইতিবৃত্ত)', authorBn: 'আল-বালাযুরী (রহ.)', era: '৩য় হিজরি' },
      { titleBn: 'তারিখুল উমাম ওয়াল মুলূক', authorBn: 'ইমাম তাবারী', era: '৪র্থ হিজরি' },
      { titleBn: 'মুকাদ্দিমা', authorBn: 'আল্লামা ইবনে খালদুন', era: '৮ম হিজরি' },
    ],
    keyLessons: [
      'বাণিজ্য, উত্তম আখলাক ও অনুপম চরিত্রের মাধ্যমে বিশ্বের এক প্রান্ত থেকে অন্য প্রান্তে ইসলামের জ্যোতি ছড়িয়ে পড়ে।',
      'স্থানীয় সংস্কৃতির ভালো দিকগুলোকে গ্রহণ করে কুসংস্কার দূর করাই ছিল সফল প্রচারের কৌশল।',
      'দ্বীনের দাওয়াত প্রতিটি সচেতন মুসলমানের আজীবন দায়িত্ব।',
    ],
    spiritualTakeaway: 'চরিত্রের সৌন্দর্যই সবচেয়ে শক্তিশালী দাওয়াতি মাধ্যম — সুগন্ধির মতো তা সবার হৃদয় জয় করে।',
  },

  knowledge: {
    quranAyat: {
      arabic: 'قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ ۗ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ',
      translationBn: 'বলুন: যারা জানে এবং যারা জানে না — তারা কি কখনো সমান হতে পারে? নিশ্চয়ই কেবল বুদ্ধিমান লোকেরাই শিক্ষা গ্রহণ করে।',
      translationEn: 'Say, "Are those who know equal to those who do not know?" Only they will remember [who are] people of understanding.',
      surah: 'সূরা আয-যুমার: ৯ • Surah Az-Zumar: 9',
    },
    hadith: {
      textBn: 'রাসূলুল্লাহ {SAW} বলেন: "জ্ঞান অন্বেষণ করা প্রত্যেক মুসলমানের ওপর ফরজ।"',
      textEn: 'The Messenger of Allah {SAW} said: "Seeking knowledge is an obligation upon every Muslim."',
      source: 'সুনানে ইবনে মাজাহ • Sunan Ibn Majah (হাদিস: ২২৪)',
      arabicSnippet: 'طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ',
    },
    classicalBooks: [
      { titleBn: 'জামে বয়ানিল ইলমি ওয়া ফাদলিহী', authorBn: 'ইমাম ইবনে আবদিল বার্র', era: '৫ম হিজরি' },
      { titleBn: 'ইহয়াউ উলূমিদ্দীন', authorBn: 'হুজ্জাতুল ইসলাম ইমাম আল-গাযালী', era: '৫ম হিজরি' },
      { titleBn: 'সিয়ারু আ\'লামিন নুবালা', authorBn: 'ইমাম শামসুদ্দীন আয-যাহাবী', era: '৮ম হিজরি' },
    ],
    keyLessons: [
      'বিজ্ঞান, গণিত, চিকিৎসা ও জ্যোতির্বিজ্ঞানে মুসলিম মনীষীদের অবদান আধুনিক বিজ্ঞানের ভিত্তি স্থাপন করেছে।',
      'কুরআন ও হাদিসের বিশুদ্ধ জ্ঞানচর্চার পাশাপাশি পার্থিব জ্ঞানের সমন্বয়ই ইসলামের স্বর্ণযুগ তৈরি করেছিল।',
      'জ্ঞান অর্জনের চূড়ান্ত উদ্দেশ্য হলো স্রষ্টার পরিচয় লাভ ও মানবতার নিঃস্বার্থ কল্যাণ সাধন।',
    ],
    spiritualTakeaway: 'জ্ঞান অর্জন হলো জান্নাতের উন্মুক্ত সোপান — যে জ্ঞানের চর্চা করে, ফেরেশতারা তার পদতলে ডানা মেলে দেয়।',
  },

  build: {
    quranAyat: {
      arabic: 'إِنَّمَا يَعْمُرُ مَسَاجِدَ اللَّهِ مَنْ آمَنَ بِاللَّهِ وَالْيَوْمِ الْآخِرِ وَأَقَامَ الصَّلَاةَ وَآتَى الزَّكَاةَ',
      translationBn: 'নিঃসন্দেহে কেবল তারাই আল্লাহর মসজিদের আবাদ ও যত্ন করে, যারা আল্লাহ ও পরকালের প্রতি ঈমান আনে, সালাত কায়েম করে এবং যাকাত দেয়...',
      translationEn: 'The mosques of Allah are only to be maintained by those who believe in Allah and the Last Day and establish prayer and give zakah...',
      surah: 'সূরা আত-তাওবাহ: ১৮ • Surah At-Tawbah: 18',
    },
    hadith: {
      textBn: 'রাসূলুল্লাহ {SAW} বলেন: "যে ব্যক্তি আল্লাহর সন্তুষ্টির উদ্দেশ্যে একটি মসজিদ নির্মাণ করে, আল্লাহ তাআলা তার জন্য জান্নাতে অনুরূপ একটি প্রাসাদ নির্মাণ করেন।"',
      textEn: 'The Messenger of Allah {SAW} said: "Whoever builds a mosque for the sake of Allah, Allah will build for him a house in Paradise."',
      source: 'সহীহ বুখারী • Sahih al-Bukhari (হাদিস: ৪৫০)',
      arabicSnippet: 'مَنْ بَنَى مَسْجِدًا لِلَّهِ بَنَى اللَّهُ لَهُ فِي الْجَنَّةِ مِثْلَهُ',
    },
    classicalBooks: [
      { titleBn: 'তারিখুল ইমারাহ আল-ইসলামিয়্যাহ (স্থাপত্য ইতিহাস)', authorBn: 'ড. আফিফ আল-বাহনাসী', era: 'স্থাপত্য কলা' },
      { titleBn: 'আল-খিতাতুল মাকরিযিয়্যাহ', authorBn: 'তাকিউদ্দীন আল-মাকরিযী', era: '৯ম হিজরি' },
      { titleBn: 'মু\'জামুল বুলদান (ভৌগোলিক অভিধান)', authorBn: 'ইয়াকুত আল-হামাবী', era: '৭ম হিজরি' },
    ],
    keyLessons: [
      'মসজিদ ও স্থাপনা কেবল ইট-পাথরের সৌধ নয়, বরং তা সমাজের রুহানি কেন্দ্র ও ঐক্যবদ্ধ মেলবন্ধন।',
      'ইসলামি স্থাপত্যের প্রতিটি জ্যামিতিক নকশা তাওহিদ ও একত্ববাদের গভীর প্রতিফলন বহন করে।',
      'মানবকল্যাণমুখী স্থাপনা (কাফেলা সরাইখানা, হাসপাতাল, মাদ্রাসা) তৈরি করা সদকায়ে জারিয়া।',
    ],
    spiritualTakeaway: 'আল্লাহর ঘরের আবাদকারী পৃথিবীর শ্রেষ্ঠ সম্মানিত মানুষ — ইবাদতের প্রতিটি গৃহই জান্নাতের এক টুকরো বাগান।',
  },

  bengal: {
    quranAyat: {
      arabic: 'وَمَنْ أَحْسَنُ قَوْلًا مِّمَّن دَعَا إِلَى اللَّهِ وَعَمِلَ صَالِحًا وَقَالَ إِنَّنِي مِنَ الْمُسْلِمِينَ',
      translationBn: 'আর তার চেয়ে কার কথা উত্তম হতে পারে, যে মানুষকে আল্লাহর দিকে আহ্বান জানায়, সৎকর্ম করে এবং ঘোষণা দেয়: নিশ্চয়ই আমি মুসলমানদের অন্তর্ভুক্ত!',
      translationEn: 'And who is better in speech than one who invites to Allah and does righteousness and says, "Indeed, I am of the Muslims"?',
      surah: 'সূরা ফুসসিলাত: ৩৩ • Surah Fussilat: 33',
    },
    hadith: {
      textBn: 'রাসূলুল্লাহ {SAW} বলেন: "আমার পক্ষ থেকে একটি বাণী হলেও মানুষের কাছে পৌঁছে দাও..."',
      textEn: 'The Prophet {SAW} said: "Convey from me, even if it is a single verse."',
      source: 'সহীহ বুখারী • Sahih al-Bukhari (হাদিস: ৩৪৬১)',
      arabicSnippet: 'بَلِّغُوا عَنِّي وَلَوْ آيَةً',
    },
    classicalBooks: [
      { titleBn: 'তবকাত-ই-নাসিরী (বাংলার মুসলিম বিজয়)', authorBn: 'কাজী মিনহাজ-ই-সিরাজ জুযজানী', era: '৭ম হিজরি' },
      { titleBn: 'রিয়াযুস সালাতীন (বাংলার ইতিহাস)', authorBn: 'গোলাম হোসেন সেলিম জাইদপূরী', era: '১৮শ শতক' },
      { titleBn: 'সুফি সেন্টস অব বেঙ্গল ও সুহরাওয়ার্দীয়া সিলসিলা', authorBn: 'ড. মুহাম্মদ এনামুল হক', era: 'আধুনিক গবেষণা' },
    ],
    keyLessons: [
      'সুফি-দরবেশদের মানবপ্রেম, সেবা ও অনুপম চরিত্রের ফলেই বাংলার কোটি মানুষের হৃদয় ইসলামে প্লাবিত হয়েছিল।',
      'জাতিভেদ প্রথা ও বৈষম্যের যাঁতাকল থেকে মুক্ত হয়ে মানুষ ইসলামের সাম্য ও শান্তির ছায়াতলে আশ্রয় নেয়।',
      'বাংলা সাহিত্যের বিকাশ ও সাধারণ মানুষের অধিকার প্রতিষ্ঠায় মুসলিম সুলতানদের অবদান অসামান্য।',
    ],
    spiritualTakeaway: 'নম্রতা, মানবসেবা ও আধ্যাত্মিক নিষ্ঠাই মানুষের অন্তরে ঈমানের বীজ বুনে দেয় — বাংলার মাটি এর চিরন্তন সাক্ষী।',
  },

  awliya: {
    quranAyat: {
      arabic: 'أَلَا إِنَّ أَوْلِيَاءَ اللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ ۝ الَّذِينَ آمَنُوا وَكَانُوا يَتَّقُونَ',
      translationBn: 'জেনে রেখো! নিশ্চয়ই আল্লাহর ওলীদের কোনো ভয় নেই এবং তারা চিন্তিতও হবে না। যারা ঈমান এনেছে এবং তাকওয়া অবলম্বন করেছে।',
      translationEn: 'Unquestionably, for the allies of Allah there will be no fear concerning them, nor will they grieve. Those who believed and were fearing Allah.',
      surah: 'সূরা ইউনুস: ৬২-৬৩ • Surah Yunus: 62-63',
    },
    hadith: {
      textBn: 'রাসূলুল্লাহ {SAW} হাদিসে কুদসিতে বলেন, আল্লাহ তাআলা ঘোষণা করেন: "যে ব্যক্তি আমার কোনো ওলী (বন্ধুর) সাথে শত্রুতা পোষণ করে, আমি তার বিরুদ্ধে যুদ্ধের ঘোষণা দেই..."',
      textEn: 'The Messenger of Allah {SAW} said that Allah said: "Whoever shows enmity to a pious worshipper of Mine, I declare war against him..."',
      source: 'সহীহ বুখারী • Sahih al-Bukhari (হাদিস: ৬৫০২)',
      arabicSnippet: 'مَنْ عَادَى لِي وَلِيًّا فَقَدْ آذَنْتُهُ بِالْحَرْبِ',
    },
    classicalBooks: [
      { titleBn: 'হিলয়াতুল আউলিয়া ওয়া তাবাকাতুল আসফিয়া', authorBn: 'হাফেজ আবু নুয়াইম আল-ইসফাহানী', era: '৫ম হিজরি' },
      { titleBn: 'তাযকিরাতুল আউলিয়া', authorBn: 'ফরিদউদ্দীন আত্তার (রহ.)', era: '৭ম হিজরি' },
      { titleBn: 'সিফাতুস সাফওয়াহ', authorBn: 'আল্লামা ইবনুল জাওযী', era: '৬ষ্ঠ হিজরি' },
    ],
    keyLessons: [
      'দুনিয়ার মোহের ঊর্ধ্বে উঠে আল্লাহর রেজামন্দি ও আখিরাতের ফিকিরে নিয়োজিত হওয়াই ওলীদের পথ।',
      'মানুষের অন্তরকে পরিশুদ্ধ করা এবং আত্মিক রূহানিয়াত জাগ্রত করাই সুফি বুজুর্গদের মূল অবদান।',
      'তাকওয়া ও বিনয়ের শক্তি পার্থিব যে কোনো রাজা-বাদশাহর চেয়েও শক্তিশালী ও চিরন্তন।',
    ],
    spiritualTakeaway: 'আল্লাহর নৈকট্য লাভ করতে হলে নফসের সাথে জিহাদ ও সার্বক্ষণিক জিকিরের সাগরে নিমগ্ন হতে হয়।',
  },

  sultan: {
    quranAyat: {
      arabic: 'إِنَّ اللَّهَ يَأْمُرُكُمْ أَن تُؤَدُّوا الْأَمَانَاتِ إِلَىٰ أَهْلِهَا وَإِذَا حَكَمْتُم بَيْنَ النَّاسِ أَن تَحْكُمُوا بِالْعَدْلِ',
      translationBn: 'নিশ্চয়ই আল্লাহ তোমাদের নির্দেশ দিচ্ছেন আমানতসমূহ তার হকদারদের কাছে পৌঁছে দিতে; এবং যখন মানুষের মধ্যে বিচার করো, তখন ইনসাফের সাথে বিচার করো...',
      translationEn: 'Indeed, Allah commands you to render trusts to whom they are due and when you judge between people to judge with justice...',
      surah: 'সূরা আন-নিসা: ৫৮ • Surah An-Nisa: 58',
    },
    hadith: {
      textBn: 'রাসূলুল্লাহ {SAW} বলেন: "বিচার দিবসে আল্লাহর কাছে সবচেয়ে প্রিয় এবং তাঁর সবচেয়ে নিকটে বসবে ন্যায়পরায়ণ শাসক।"',
      textEn: 'The Messenger of Allah {SAW} said: "The dearest of people to Allah on the Day of Judgment and the nearest to Him in standing will be a just ruler."',
      source: 'জামে তিরমিযী • Jami` at-Tirmidhi (হাদিস: ১৩২৯)',
      arabicSnippet: 'أَحَبُّ النَّاسِ إِلَى اللَّهِ يَوْمَ الْقِيَامَةِ إِمَامٌ عَادِلٌ',
    },
    classicalBooks: [
      { titleBn: 'আল-আহকামুস সুলতানিয়্যাহ (ইসলামী রাষ্ট্রশাসন)', authorBn: 'ইমাম আল-মাওয়ার্দী', era: '৫ম হিজরি' },
      { titleBn: 'সিয়াসাতনামা (রাষ্ট্রনীতি গ্রন্থ)', authorBn: 'উজির নিজামুল মুলক আত-তূসী', era: '৫ম হিজরি' },
      { titleBn: 'তারিখুল ইসলাম আল-কবীর', authorBn: 'ইমাম শামসুদ্দীন আয-যাহাবী', era: '৮ম হিজরি' },
    ],
    keyLessons: [
      'শাসনক্ষমতা ভোগের কোনো মাধ্যম নয়, বরং জনগণের জানমাল ও ঈমানের নিরাপত্তার এক বিশাল পবিত্র আমানত।',
      'ন্যায়পরায়ণতাই সাম্রাজ্য ও সভ্যতার দীর্ঘস্থায়িত্বের মূল চালিকাশক্তি।',
      'আলেম-ওলামা ও ন্যায়নিষ্ঠ উপদেষ্টাদের পরামর্শ নিয়ে দেশ পরিচালনা করাই সফল সুলতানদের ঐতিহ্য।',
    ],
    spiritualTakeaway: 'ক্ষমতা ক্ষণস্থায়ী, কিন্তু ইনসাফের রেকর্ড আসমানে চিরস্মরণীয় — একজন ন্যায়পরায়ণ শাসক হাজারো মানুষের শান্তির ছায়া।',
  },
};

/**
 * Intelligent master resolver that provides rich Quranic Ayat, Sahih Hadith,
 * Classical Reference Books, and Spiritual Lessons for EVERY SINGLE ONE of the 136 events!
 */
export function getEventReligiousDetails(
  event: HistoryEvent,
  lang: ZikrLanguage = 'bn'
): EventReligiousContext {
  // 1. Look for specific event year override
  if (SPECIFIC_EVENT_DETAILS[event.y]) {
    const specific = SPECIFIC_EVENT_DETAILS[event.y];
    const base = CATEGORY_TEMPLATES[event.cat] || CATEGORY_TEMPLATES.seerah;
    return {
      quranAyat: specific.quranAyat || base.quranAyat,
      hadith: specific.hadith || base.hadith,
      classicalBooks: specific.classicalBooks || base.classicalBooks,
      keyLessons: specific.keyLessons || (event.l ? [event.l.bn] : base.keyLessons),
      spiritualTakeaway: specific.spiritualTakeaway || base.spiritualTakeaway,
    };
  }

  // 2. Fallback to category template with event-specific lesson integration
  const base = CATEGORY_TEMPLATES[event.cat] || CATEGORY_TEMPLATES.seerah;
  const lessons = event.l?.bn ? [event.l.bn, ...base.keyLessons.slice(0, 2)] : base.keyLessons;

  return {
    ...base,
    keyLessons: lessons,
  };
}
