export interface SurahInsight {
  surahNumber: number;
  fojilotBn: string;
  fojilotEn: string;
  sabunNuzulBn: string;
  sabunNuzulEn: string;
  importantTopicsBn: string[];
  importantTopicsEn: string[];
}

export const SURAH_INSIGHTS_MAP: Record<number, SurahInsight> = {
  1: {
    surahNumber: 1,
    fojilotBn: 'সূরা আল-ফাতিহা কুরআনের সর্বশ্রেষ্ঠ সূরা (উম্মুল কুরআন)। রাসুলুল্লাহ ﷺ বলেছেন, এর মতো কোনো সূরা তাওরাত, ইনজিল বা কুরআনে অবতীর্ণ হয়নি। এটি রুকইয়া বা আরোগ্যের জন্য অত্যন্ত কার্যকরী।',
    fojilotEn: 'Al-Faatiha is the greatest Surah in the Quran (Umm al-Quran). The Prophet ﷺ stated nothing like it has been revealed in the Torah, Gospel, or Quran.',
    sabunNuzulBn: 'মক্কী জীবনে নামাজের শুরুতে ইবাদতের মূল মন্ত্র ও আল্লাহর প্রশংসার শিক্ষা দেওয়ার জন্য এটি অবতীর্ণ হয়। এটি কুরআনের প্রথম সম্পূর্ণ অবতীর্ণ সূরা।',
    sabunNuzulEn: 'Revealed in Makkah to teach humanity the essence of worship, praise of Allah, and guidance as the opening of the Quran.',
    importantTopicsBn: [
      'আল্লাহ তাআলার মহাসম্মান ও প্রশংসা (হামদ)',
      'একত্ববাদ ও ইবাদতের ঘোষণা (ইহদিস সিরাতাল মুস্তাকিম)',
      'সঠিক পথের দিশা ও দোয়া',
      'বান্দা ও রবের মধ্যকার গভীর কথোপকথন'
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
    fojilotBn: 'সূরা আল-বাকারা কুরআনের দীর্ঘতম সূরা। রাসুলুল্লাহ ﷺ বলেছেন, যে ঘরে সূরা বাকারা তিলাওয়াত করা হয়, সে ঘর থেকে শয়তান পালিয়ে যায়। এর শেষ দুই আয়াতের তিলাওয়াত সারা রাতের ইবাদতের জন্য যথেষ্ট। আয়াতুল কুরসি এর সর্বশ্রেষ্ঠ আয়াত।',
    fojilotEn: 'Al-Baqarah is the longest Surah. The Prophet ﷺ said Satan flees from a house where Surah Al-Baqarah is recited. Ayatul Kursi is its greatest verse.',
    sabunNuzulBn: 'মদিনায় হিজরতের পর দীর্ঘ সময় ধরে বিভিন্ন ঘটনা ও আইনি বিধান (সালাত, রোজা, জাকাত, রিবা নিষেধ) প্রসংগে পর্যায়ক্রমে অবতীর্ণ হয়েছে।',
    sabunNuzulEn: 'Revealed gradually in Madinah addressing legal ordinances, social laws, fasting, zakat, and prohibition of usury.',
    importantTopicsBn: [
      'মুমিন, কাফির ও মুনাফিকদের বৈশিষ্ট্য',
      'হজরত আদম (আ.)-এর সৃষ্টি ও ইতিহাস',
      'বনী ইসরাইল ও ঐতিহাসিক ঘটনাপ্রবাহ',
      'রোজা, হজ, হালাল-হারাম ও রিবার বিধান',
      'আয়াতুল কুরসি ও শেষ দুই আয়াতের ফজিলত'
    ],
    importantTopicsEn: [
      'Characteristics of believers, disbelievers, and hypocrites',
      'Creation and history of Prophet Adam (AS)',
      'History of the Children of Israel',
      'Ordinances of fasting, hajj, lawful/unlawful, and usury',
      'Ayatul Kursi and the virtues of the final verses'
    ]
  },
  36: {
    surahNumber: 36,
    fojilotBn: 'সূরা ইয়াসিন কুরআনের হৃদয় (Qalb al-Quran)। রাসুলুল্লাহ ﷺ বলেছেন, যে ব্যক্তি আল্লাহর সন্তুষ্টির জন্য রাতে সূরা ইয়াসিন তিলাওয়াত করবে, তার ঐ রাতের গুনাহ ক্ষমা করে দেওয়া হবে।',
    fojilotEn: 'Ya-Sin is the heart of the Quran. The Prophet ﷺ said whoever recites Surah Ya-Sin at night seeking Allah’s pleasure will be forgiven.',
    sabunNuzulBn: 'মক্কী যুগে অবতীর্ণ। কুরাইশ কাফিরদের অস্বীকার ও আখেরাত পুনরুত্থান নিয়ে সংশয়ের জবাবে অকাট্য যুক্তি তুলে ধরতে এটি নাজিল হয়।',
    sabunNuzulEn: 'Revealed in Makkah to counter Quraysh disbelief and establish definitive proofs of resurrection and monotheism.',
    importantTopicsBn: [
      'নবুওয়তের সত্যতা ও রাসুলুল্লাহ ﷺ-এর রিসালাত',
      'আখিরাত ও পুনরুত্থানের অকাট্য প্রমাণ',
      'আহলে ইয়ারিয়ার (গ্রামবাসীর) ঐতিহাসিক উপদেশমূলক ঘটনা',
      'জান্নাত ও জাহান্নামের বিবরণ'
    ],
    importantTopicsEn: [
      'Truth of Prophethood and Muhammad ﷺ message',
      'Definitive proofs of the Hereafter and Resurrection',
      'Instructive parable of the People of the Town',
      'Descriptions of Paradise and Hell'
    ]
  },
  55: {
    surahNumber: 55,
    fojilotBn: 'সূরা আর-রহমান কুরআনের ‘عروس القرآن’ (কুরআনের কনে)। এতে বারবার বলা হয়েছে: "অতএব তোমরা তোমাদের রবের কোন কোন নেয়ামতকে অস্বীকার করবে?"',
    fojilotEn: 'Ar-Rahman is known as the Bride of the Quran (Arus al-Quran), repeatedly asking: "Which of your Lord’s favors will you deny?"',
    sabunNuzulBn: 'মক্কী যুগে অবতীর্ণ। আল্লাহর অসীম করুণা ও সৃষ্টিজগতের বৈচিত্র্য ফুটিয়ে তুলতে এটি নাজিল হয়।',
    sabunNuzulEn: 'Revealed in Makkah highlighting the infinite mercy of Allah and the magnificent wonders of creation.',
    importantTopicsBn: [
      'সৃষ্টিজগতের নিখুঁত সুষম ও নেয়ামতরাজি',
      'মহাবিশ্বের সুনির্দিষ্ট কক্ষপথ ও হিসাব',
      'জান্নাতের চোখ জুড়ানো বাগ-বাগিচা ও হুর-গিলমান',
      'অস্বীকারকারীদের পরিণতি'
    ],
    importantTopicsEn: [
      'Exquisite balance and blessings in creation',
      'Precise orbits and celestial calculations',
      'Exquisite gardens and companions of Paradise',
      'Consequences for those who deny Allah'
    ]
  },
  56: {
    surahNumber: 56,
    fojilotBn: 'সূরা আল-ওয়াকিআহ অভাব ও দারিদ্র্য দূরকারী সূরা হিসেবে পরিচিত। রাসুলুল্লাহ ﷺ বলেছেন, যে ব্যক্তি প্রতি রাতে সূরা ওয়াকিআহ তিলাওয়াত করবে, সে কখনো দারিদ্র্যের মুখোমুখি হবে না।',
    fojilotEn: 'Al-Waqi\'ah is known as the protector against poverty. The Prophet ﷺ said whoever recites it every night will never face poverty.',
    sabunNuzulBn: 'মক্কী যুগে অবতীর্ণ। কিয়ামতের আকস্মিকতা এবং মানুষের তিন শ্রেণীতে বিভক্ত হওয়ার বিবরণ দিতে এটি নাজিল হয়.',
    sabunNuzulEn: 'Revealed in Makkah detailing the inevitable event of the Day of Judgment and the three categories of mankind.',
    importantTopicsBn: [
      'কিয়ামতের ভয়াবহতা ও আকস্মিক রূপ',
      'মানুষের তিন শ্রেণি: অগ্রগামী (সাবেকুন), ডানপন্থী ও বামপন্থী',
      'জান্নাতি ও জাহান্নামীদের প্রাপ্তি',
      'মানুষের সৃষ্টি ও উদ্ভিদের জীবনচক্রের নিদর্শন'
    ],
    importantTopicsEn: [
      'Terrifying reality and sudden onset of Judgment Day',
      'Three groups of humanity: Foremost, Companions of Right, and Left',
      'Recompense of the dwellers of Paradise and Hell',
      'Miracle of human creation and botanical growth'
    ]
  },
  67: {
    surahNumber: 67,
    fojilotBn: 'সূরা আল-মুলক কবরের আজাব থেকে রক্ষাকারী এবং সুপারিশকারী সূরা। রাসুলুল্লাহ ﷺ বলেছেন, এটি ৩০ আয়াতের একটি সূরা যা তিলাওয়াতকারীর পক্ষে সুপারিশ করতে থাকে যতক্ষণ না তাকে ক্ষমা করা হয়।',
    fojilotEn: 'Al-Mulk is a protector and intercessor against the punishment of the grave. It consists of 30 verses that intercede until forgiveness is granted.',
    sabunNuzulBn: 'মক্কী যুগে অবতীর্ণ। মহাবিশ্বের রাজত্ব ও আল্লাহর একচ্ছত্র ক্ষমতার বড়ত্ব প্রকাশ করতে এটি নাজিল হয়।',
    sabunNuzulEn: 'Revealed in Makkah to proclaim the absolute sovereignty of Allah over the universe and the purpose of life and death.',
    importantTopicsBn: [
      'জীবন ও মৃত্যুর সৃষ্টির উদ্দেশ্য (পরীক্ষাগার)',
      'মহাবিশ্বের সপ্তআসমানের নিখুঁত বিন্যাস ও তারকারাজি',
      'জাহান্নামের ক্রোধ ও কাফিরদের অনুতাপ',
      'রিজিক ও পানির উৎস নিয়ে আল্লাহর প্রশ্ন'
    ],
    importantTopicsEn: [
      'Purpose of creation of life and death (as a trial)',
      'Flawless cosmic architecture of the seven heavens',
      'Fury of Hell and remorse of the disbelievers',
      'Divine inquiry regarding sustenance and water sources'
    ]
  },
  112: {
    surahNumber: 112,
    fojilotBn: 'সূরা আল-ইখলাস কুরআনের এক তৃতীয়াংশ (১/৩ অংশ)-এর সমতুল্য। রাসুলুল্লাহ ﷺ এটি ভালোবাসার কথা শুনে বলেছেন, "আল্লাহও তাকে ভালোবাসেন।"',
    fojilotEn: 'Al-Ikhlas is equivalent to one-third of the Quran. The Prophet ﷺ said whoever loves it is loved by Allah.',
    sabunNuzulBn: 'মুশরিকরা যখন রাসুলুল্লাহ ﷺ-কে আল্লাহর বংশপরিচয় ও রূপ কেমন তা জিজ্ঞেস করেছিল, তখন এর জবাবে এই সূরা অবতীর্ণ হয়।',
    sabunNuzulEn: 'Revealed in response to disbelievers inquiring about the lineage, nature, and attributes of Allah.',
    importantTopicsBn: [
      'তাওহীদ ও আল্লাহর একত্ববাদ (আল্লাহ এক ও অদ্বিতীয়)',
      'আল্লাহ অমুখাপেক্ষী কিন্তু সবাই তাঁর মুখাপেক্ষী',
      'আল্লাহর কোনো সন্তান বা পিতা নেই',
      'তাঁর সমকক্ষ কেউ নেই'
    ],
    importantTopicsEn: [
      'Tawhid and Oneness of Allah (Allah is One and Unique)',
      'Allah is Self-Sufficient while all creation depends on Him',
      'Allah neither begets nor is born',
      'There is none comparable to Him'
    ]
  }
};

// Fallback generator for other surahs
export function getSurahInsight(surahNumber: number, nameBn: string, nameEn: string): SurahInsight {
  if (SURAH_INSIGHTS_MAP[surahNumber]) {
    return SURAH_INSIGHTS_MAP[surahNumber];
  }
  return {
    surahNumber,
    fojilotBn: `সূরা ${nameBn} (${nameEn}) তিলাওয়াতে রয়েছে অশেষ বরকত, সুনির্দিষ্ট আত্মিক প্রশান্তি এবং পরকালীন সাওয়াব। নিয়মিত তিলাওয়াত মুমিনের হৃদয়কে আলোকিত করে।`,
    fojilotEn: `Reciting Surah ${nameEn} brings immense blessings, spiritual tranquility, and reward in the Hereafter. Regular recitation enlightens the believer's heart.`,
    sabunNuzulBn: `এই সূরাটি মানবজাতিকে সঠিক পথ প্রদর্শন, ঈমানের বুনিয়াদ সুদৃঢ়করণ এবং আসমানি বিধান পালনের তাগিদ দিতে অবতীর্ণ হয়েছে।`,
    sabunNuzulEn: `This Surah was revealed to guide humanity, strengthen the foundations of faith, and urge adherence to divine guidance.`,
    importantTopicsBn: [
      'আল্লাহর একত্ববাদ ও কুদরতের নিদর্শন',
      'পূর্ববর্তী জাতিসমূহের ইতিহাস ও শিক্ষা',
      'সৎকর্মের পুরস্কার এবং অসৎকাজের পরিণাম',
      'আখিরাত ও বিচারদিনের প্রতি বিশ্বাস'
    ],
    importantTopicsEn: [
      'Oneness of Allah and signs of His power',
      'History and lessons from previous nations',
      'Reward for righteousness and consequences of evil',
      'Faith in the Hereafter and Day of Judgment'
    ]
  };
}
