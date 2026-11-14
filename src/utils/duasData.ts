import { DuaCategory } from '../types';

export interface DuaTranslation {
  title: string;
  timing: string;
  translation: string;
  virtue?: string;
}

export interface DuaItem {
  id: string;
  title: string;
  category: DuaCategory;
  timing: string;
  arabic: string;
  transliteration: string;
  translation: string;
  reference: string;
  virtue?: string;
  suggestedCount?: number;
  translations?: {
    [key: string]: DuaTranslation;
  };
}

export const AUTHENTIC_DUAS: DuaItem[] = [
  {
    id: 'dua_1_1',
    title: '1. Excellence of Zikr: Remembering Allah',
    category: 'morning_evening',
    timing: 'Anytime throughout the day',
    arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
    transliteration: 'Fadhkurūnī adhkurkum washkurū lī wa lā takfurūn.',
    translation: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
    reference: 'Surah Al-Baqarah (2:152)',
    virtue: 'Allah promises to remember those who remember Him.',
    suggestedCount: 100,
    translations: {
      en: {
        title: '1. Excellence of Zikr: Remembering Allah',
        timing: 'Anytime throughout the day',
        translation: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
        virtue: 'Allah promises to remember those who remember Him.'
      },
      bn: {
        title: '১.১ আল্লাহর জিকিরের ফযিলত',
        timing: 'সারাদিন যেকোনো সময়',
        translation: 'অতএব তোমরা আমাকে স্মরণ কর, আমিও তোমাদের স্মরণ করব। আর আমার কৃতজ্ঞতা প্রকাশ কর এবং আমার অকৃতজ্ঞ হয়ো না।',
        virtue: 'যে ব্যক্তি আল্লাহকে স্মরণ করে, আল্লাহও তাকে উচ্চ মহলে স্মরণ করেন।'
      }
    }
  },
  {
    id: 'dua_1_2',
    title: '1.2 Abundant Remembrance of Allah',
    category: 'morning_evening',
    timing: 'Constant daily state',
    arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا',
    transliteration: 'Yā ayyuhal-ladhīna āmanudhkurullāha dhikran kathīrā.',
    translation: 'O you who have believed, remember Allah with much remembrance.',
    reference: 'Surah Al-Ahzab (33:41)',
    virtue: 'Commandment for believers to engage in frequent dhikr.',
    suggestedCount: 100,
    translations: {
      en: {
        title: '1.2 Abundant Remembrance of Allah',
        timing: 'Constant daily state',
        translation: 'O you who have believed, remember Allah with much remembrance.',
        virtue: 'Commandment for believers to engage in frequent dhikr.'
      },
      bn: {
        title: '১.২ অধিক পরিমাণে আল্লাহর জিকির',
        timing: 'সর্বদা জিকির করা',
        translation: 'হে মুমিনগণ! তোমরা আল্লাহকে বেশি বেশি স্মরণ কর।',
        virtue: 'অধিক জিকিরকারী পুরুষ ও নারীদের জন্য আল্লাহ ক্ষমা ও মহাপুরস্কার প্রস্তুত রেখেছেন।'
      }
    }
  },
  {
    id: 'dua_2_1',
    title: '2.1 Morning & Evening: Sayyidul Istighfar',
    category: 'morning_evening',
    timing: 'Morning and Evening (Master of Forgiveness)',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ',
    transliteration: 'Allāhumma anta Rabbī lā ilāha illā anta, khalaqtanī wa anā ‘abduka, wa anā ‘alā ‘ahdika wa wa’dika mastata‘tu...',
    translation: 'O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your slave...',
    reference: 'Sahih al-Bukhari 6323',
    virtue: 'Whoever recites this with firm conviction in the daytime and dies before evening enters Paradise, and vice versa.',
    suggestedCount: 1,
    translations: {
      en: {
        title: '2.1 Morning & Evening: Sayyidul Istighfar',
        timing: 'Morning and Evening',
        translation: 'O Allah, You are my Lord, none has the right to be worshipped except You. You created me and I am Your slave...',
        virtue: 'Whoever recites this with firm belief and dies that day/night enters Paradise.'
      },
      bn: {
        title: '২.১ সাইয়্যিদুল ইস্তেগফার (সকাল ও সন্ধ্যা)',
        timing: 'সকাল ও সন্ধ্যায় পড়ার শ্রেষ্ঠ ইস্তেগফার',
        translation: 'হে আল্লাহ! আপনি আমার রব, আপনি ছাড়া আর কোনো সত্য উপাস্য নেই। আপনি আমাকে সৃষ্টি করেছেন এবং আমি আপনার বান্দা...',
        virtue: 'দিনের বেলায় দৃঢ় বিশ্বাসের সাথে পাঠ করলে এবং সন্ধ্যা হওয়ার আগে মারা গেলে জান্নাতি হবে।'
      }
    }
  },
  {
    id: 'dua_2_2',
    title: '2.2 Morning & Evening Protection (Ayat al-Kursi)',
    category: 'morning_evening',
    timing: 'After Fajr and Maghrib',
    arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
    transliteration: 'Allāhu lā ilāha illā huwal-Ḥayyul-Qayyūm...',
    translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence.',
    reference: 'Surah Al-Baqarah (2:255), Sahih Al-Bukhari',
    virtue: 'Protection from devils until the morning/evening.',
    suggestedCount: 1,
    translations: {
      en: {
        title: '2.2 Morning & Evening Protection (Ayat al-Kursi)',
        timing: 'After Fajr and Maghrib',
        translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence.',
        virtue: 'Continuous angelic protection until morning or evening.'
      },
      bn: {
        title: '২.২ আয়াতুল কুরসি (সকাল-সন্ধ্যা হেফাজত)',
        timing: 'ফজর ও মাগরিবের পর',
        translation: 'আল্লাহ! তিনি ব্যতিরেকে আর কোনো উপাস্য নেই, যিনি চিরজীবী ও সর্বসত্তা সংরক্ষণকারী...',
        virtue: 'পাঠকারী সারারাত বা সারাদিন শয়তানের প্ররোচনা থেকে সুরক্ষিত থাকে।'
      }
    }
  },
  {
    id: 'dua_2_3',
    title: '2.3 Three Quls (Ikhlas, Falaq, Nas)',
    category: 'morning_evening',
    timing: 'Morning, Evening and Before Sleep',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ... قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ... قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
    transliteration: 'Qul huwallāhu aḥad... Qul a‘ūdhu bi Rabbil-falaq... Qul a‘ūdhu bi Rabbin-nās.',
    translation: 'Say, "He is Allah, [who is] One..." Say, "I seek refuge in the Lord of daybreak..." Say, "I seek refuge in the Lord of mankind..."',
    reference: 'Sunan Abi Dawud 5082, Tirmidhi 3575',
    virtue: 'Reciting these 3 times morning and evening will suffice you against everything.',
    suggestedCount: 3,
    translations: {
      en: {
        title: '2.3 Three Quls (Ikhlas, Falaq, Nas)',
        timing: 'Morning, Evening and Before Sleep',
        translation: 'Say, He is Allah, One... Say, I seek refuge in the Lord of daybreak... Say, I seek refuge in the Lord of mankind...',
        virtue: 'Sufficient against all harms and evils when recited 3 times.'
      },
      bn: {
        title: '২.৩ কুল শরীফ (সুরা ইখলাস, ফালাক ও নাস)',
        timing: 'সকাল, সন্ধ্যা ও ঘুমানোর আগে ৩ বার',
        translation: 'বলুন, তিনি আল্লাহ, এক ও অদ্বিতীয়... বলুন, আমি আশ্রয় গ্রহণ করছি প্রভাতের প্রভুর নিকট... বলুন, আমি আশ্রয় চাই মানুষের রবের নিকট...',
        virtue: 'সকাল-সন্ধ্যা ৩ বার করে পাঠ করলে তা সকল বিপদাপদ থেকে রক্ষার জন্য যথেষ্ট হয়।'
      }
    }
  },
  {
    id: 'dua_3_1',
    title: '3.1 Upon Waking Up from Sleep',
    category: 'sleep_wake',
    timing: 'Immediately upon waking',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّSُورُ',
    transliteration: 'Al-ḥamdu lillāhil-ladhī aḥyānā ba‘da mā amātanā wa ilayhin-nushūr.',
    translation: 'Praise is to Allah Who gives us life after He has caused us to die and to Him is the resurrection.',
    reference: 'Sahih al-Bukhari 6312',
    virtue: 'Expressing gratitude for returning life and consciousness.',
    suggestedCount: 1,
    translations: {
      en: {
        title: '3.1 Upon Waking Up from Sleep',
        timing: 'Immediately upon waking',
        translation: 'Praise is to Allah Who gives us life after He has caused us to die and to Him is the resurrection.',
        virtue: 'Expressing gratitude for awakening.'
      },
      bn: {
        title: '৩.১ ঘুম থেকে জাগার পর দোয়া',
        timing: 'ঘুম ভাঙার সাথে সাথে',
        translation: 'সমস্ত প্রশংসা আল্লাহর জন্য, যিনি আমাদের মৃত্যুর পর জীবন দান করেছেন এবং তাঁর দিকেই পুনরুত্থান।',
        virtue: 'ঘুম থেকে জেগে কৃতজ্ঞতা প্রকাশের চমৎকার সুন্নাহ।'
      }
    }
  },
  {
    id: 'dua_3_2',
    title: '3.2 Before Sleeping at Night',
    category: 'sleep_wake',
    timing: 'When lying down to sleep',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    transliteration: 'Bismikal-lāhumma amūtu wa aḥyā.',
    translation: 'In Your name, O Allah, I die and I live.',
    reference: 'Sahih al-Bukhari 6324',
    virtue: 'Entrusting one\'s soul to Allah before sleep.',
    suggestedCount: 1,
    translations: {
      en: {
        title: '3.2 Before Sleeping at Night',
        timing: 'When lying down to sleep',
        translation: 'In Your name, O Allah, I die and I live.',
        virtue: 'Entrusting one\'s soul to Allah.'
      },
      bn: {
        title: '৩.২ ঘুমানোর পূর্বে পড়ার দোয়া',
        timing: 'বিছানায় শোয়ার সময়',
        translation: 'হে আল্লাহ! আপনার নামেই আমি মৃত্যুবরণ করি এবং জীবিত হই।',
        virtue: 'ঘুমের আগে নিজের জীবন ও মৃত্যু আল্লাহর সোপর্দ করা।'
      }
    }
  },
  {
    id: 'dua_4_1',
    title: '4.1 Entering the Restroom (Toilet)',
    category: 'daily_living',
    timing: 'Before entering the restroom',
    arabic: 'بِسْمِ اللَّهِ، اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    transliteration: 'Bismillāh, Allāhumma innī a‘ūdhu bika minal-khubuthi wal-khabā’ith.',
    translation: 'In the name of Allah. O Allah, I seek refuge in You from the male and female evil spirits.',
    reference: 'Sahih al-Bukhari 142, Sahih Muslim 375',
    virtue: 'Protection from unseen jinn and devils in unclean places.',
    suggestedCount: 1,
    translations: {
      en: {
        title: '4.1 Entering the Restroom (Toilet)',
        timing: 'Before entering the restroom',
        translation: 'In the name of Allah. O Allah, I seek refuge in You from male and female evil spirits.',
        virtue: 'Protection from jinn in unclean places.'
      },
      bn: {
        title: '৪.১ বাথরুমে প্রবেশের দোয়া',
        timing: 'বাথরুমে যাওয়ার পূর্বে',
        translation: 'আল্লাহর নামে শুরু করছি। হে আল্লাহ! আমি আপনার নিকট নর ও নারী শয়তানদের অনিষ্ট থেকে আশ্রয় চাই।',
        virtue: 'অপরিচ্ছন্ন স্থানে জিনের উপদ্রব ও ক্ষতি থেকে হেফাজত।'
      }
    }
  },
  {
    id: 'dua_4_2',
    title: '4.2 Leaving the Restroom',
    category: 'daily_living',
    timing: 'Upon exiting the restroom',
    arabic: 'غُفْرَانَكَ',
    transliteration: 'Ghufrānaka.',
    translation: 'I ask You (Allah) for Your forgiveness.',
    reference: 'Sunan Ibn Majah 300, Tirmidhi 7',
    virtue: 'Expressing gratitude for relief and seeking forgiveness.',
    suggestedCount: 1,
    translations: {
      en: {
        title: '4.2 Leaving the Restroom',
        timing: 'Upon exiting the restroom',
        translation: 'I ask You (Allah) for Your forgiveness.',
        virtue: 'Expressing gratitude and seeking forgiveness.'
      },
      bn: {
        title: '৪.২ বাথরুম থেকে বের হওয়ার দোয়া',
        timing: 'বের হওয়ার পর ডান পা বের করে',
        translation: 'হে আল্লাহ! আমি আপনার ক্ষমা প্রার্থনা করছি।',
        virtue: 'বাথরুম থেকে বের হয়ে শুকরিয়া ও ক্ষমা প্রার্থনা।'
      }
    }
  },
  {
    id: 'dua_5_1',
    title: '5.1 Leaving the Home',
    category: 'protection',
    timing: 'When stepping out of the house',
    arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Bismillāh, tawakkaltu ‘alallāh, wa lā ḥawla wa lā quwwata illā billāh.',
    translation: 'In the name of Allah, I have placed my trust in Allah; there is no might nor power except with Allah.',
    reference: 'Sunan Abi Dawud 5095, Tirmidhi 3426',
    virtue: 'Angels proclaim: "You are guided, defended and protected," and Satan distances himself from you.',
    suggestedCount: 1,
    translations: {
      en: {
        title: '5.1 Leaving the Home',
        timing: 'When stepping out of the house',
        translation: 'In the name of Allah, I have placed my trust in Allah; there is no might nor power except with Allah.',
        virtue: 'Angels guide, defend and protect you; Satan flees.'
      },
      bn: {
        title: '৫.১ বাসা থেকে বের হওয়ার দোয়া',
        timing: 'ঘর থেকে বের হওয়ার সময়',
        translation: 'আল্লাহর নামে বের হচ্ছি, আল্লাহর ওপর ভরসা করলাম। আল্লাহর সাহায্য ছাড়া পাপ থেকে ফেরার এবং নেক কাজ করার কোনো শক্তি নেই।',
        virtue: 'ফেরেশতাগণ পথ প্রদর্শন করেন ও রক্ষা করেন, শয়তান দূরে সরে যায়।'
      }
    }
  },
  {
    id: 'dua_5_2',
    title: '5.2 Entering the Home',
    category: 'daily_living',
    timing: 'Upon entering the house',
    arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا',
    transliteration: 'Bismillāhi walajnā, wa bismillāhi kharajnā, wa ‘alā Rabbinā tawakkalnā.',
    translation: 'In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we rely.',
    reference: 'Sunan Abi Dawud 5096',
    virtue: 'Invites blessings into the home and drives away Satan.',
    suggestedCount: 1,
    translations: {
      en: {
        title: '5.2 Entering the Home',
        timing: 'Upon entering the house',
        translation: 'In the name of Allah we enter, in the name of Allah we leave, and upon our Lord we rely.',
        virtue: 'Drives away Satan and brings barakah to the home.'
      },
      bn: {
        title: '৫.২ ঘরে প্রবেশের দোয়া',
        timing: 'বাসায় ঢোকার সময়',
        translation: 'আল্লাহর নামে আমরা প্রবেশ করলাম, আল্লাহর নামেই বের হলাম এবং আমাদের রবের ওপরই ভরসা করলাম।',
        virtue: 'সালাম দিয়ে ঘরে ঢুকলে শয়তান ঘরে প্রবেশ করতে পারে না।'
      }
    }
  },
  {
    id: 'dua_6_1',
    title: '6.1 Going to the Mosque',
    category: 'salat',
    timing: 'While walking towards the masjid',
    arabic: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَفِي سَمْعِي نُورًا',
    transliteration: 'Allāhummaj‘al fī qalbī nūrā, wa fī lisānī nūrā, wa fī sam‘ī nūrā...',
    translation: 'O Allah, place light in my heart, light in my tongue, light in my hearing, light in my sight...',
    reference: 'Sahih Muslim 763',
    virtue: 'Fills the believer with divine light from every direction.',
    suggestedCount: 1,
    translations: {
      en: {
        title: '6.1 Going to the Mosque',
        timing: 'While walking towards the masjid',
        translation: 'O Allah, place light in my heart, light in my tongue, light in my hearing, light in my sight...',
        virtue: 'Fills the believer with divine light.'
      },
      bn: {
        title: '৬.১ মসজিদে যাওয়ার দোয়া',
        timing: 'মসজিদে হেঁটে যাওয়ার সময়',
        translation: 'হে আল্লাহ! আমার অন্তরে নূর দিন, আমার জবান বা জিহ্বায় নূর দিন, আমার কানে নূর দিন, আমার চোখে নূর দিন...',
        virtue: 'আল্লাহ তাআলা বান্দাকে চারপাশ থেকে নূরে আলোকিত করেন।'
      }
    }
  },
  {
    id: 'dua_6_2',
    title: '6.2 Entering and Leaving the Mosque',
    category: 'salat',
    timing: 'At the doors of the masjid',
    arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ (Entering) / اللَّهُمَّ إِنِّى أَسْأَلُكَ مِنْ فَضْلِكَ (Leaving)',
    transliteration: 'Allāhummaftaḥ lī abwāba raḥmatik / Allāhumma innī as’aluka min faḍlik.',
    translation: 'O Allah, open for me the doors of Your mercy (entering). O Allah, I ask You from Your favor (leaving).',
    reference: 'Sahih Muslim 713',
    virtue: 'Invoking mercy upon entering and divine bounty upon leaving.',
    suggestedCount: 1,
    translations: {
      en: {
        title: '6.2 Entering and Leaving the Mosque',
        timing: 'At the doors of the masjid',
        translation: 'O Allah, open for me the doors of Your mercy (entering). O Allah, I ask You from Your favor (leaving).',
        virtue: 'Invokes mercy and divine bounty.'
      },
      bn: {
        title: '৬.২ মসজিদে প্রবেশ ও বের হওয়ার দোয়া',
        timing: 'মসজিদে ঢোকার ও বের হওয়ার সময়',
        translation: 'প্রবেশকালে: হে আল্লাহ! আমার জন্য আপনার রহমতের দরজাগুলো খুলে দিন। বেরকালে: হে আল্লাহ! আমি আপনার দয়া প্রার্থনা করছি।',
        virtue: 'মসজিদের আদব রক্ষা ও আল্লাহর রহমত লাভ।'
      }
    }
  },
  {
    id: 'dua_7_1',
    title: '7.1 Travelling / Riding a Vehicle',
    category: 'travel',
    timing: 'When mounting a vehicle, car, or plane',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنا لَمُنْقَلِبُونَ',
    transliteration: 'Subḥānal-ladhī sakhkhara lanā hādhā wa mā kunnā lahū muqrinīn, wa innā ilā Rabbinā lamunqalibūn.',
    translation: 'Glory is to Him Who has provided this for us though we could never have had it by our efforts. And surely, to our Lord we are returning.',
    reference: 'Surah Az-Zukhruf (43:13-14), Sunan Abi Dawud 2602',
    virtue: 'Divine protection and barakah throughout the journey.',
    suggestedCount: 1,
    translations: {
      en: {
        title: '7.1 Travelling / Riding a Vehicle',
        timing: 'When mounting a vehicle, car, or plane',
        translation: 'Glory is to Him Who has provided this for us though we could never have had it by our efforts. And surely, to our Lord we are returning.',
        virtue: 'Ensures safe and blessed travel.'
      },
      bn: {
        title: '৭.১ বাহনে ওঠার বা সফরের দোয়া',
        timing: 'গাড়ি, প্লেন বা বাহনে ওঠার সময়',
        translation: 'পবিত্র সেই সত্তা, যিনি এটাকে আমাদের অধীন করে দিয়েছেন, অথচ আমরা একে বশে আনতে সক্ষম ছিলাম না। আর নিশ্চয়ই আমরা আমাদের রবের কাছেই ফিরে যাব।',
        virtue: 'সফরে নিরাপদে থাকার এবং আল্লাহর সাহায্য লাভের সুন্নাহ।'
      }
    }
  },
  {
    id: 'dua_8_1',
    title: '8.1 Distress and Hardship',
    category: 'hardship',
    timing: 'In times of severe difficulty or grief',
    arabic: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّى كُنْتُ مِنَ الظَّالِمِينَ',
    transliteration: 'Lā ilāha illā anta subḥānaka innī kuntu minaẓ-ẓālimīn.',
    translation: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
    reference: 'Surah Al-Anbiya (21:87), Tirmidhi 3505',
    virtue: 'The dua of Prophet Yunus (AS); any Muslim who makes this supplication for any distress will be answered by Allah.',
    suggestedCount: 3,
    translations: {
      en: {
        title: '8.1 Distress and Hardship',
        timing: 'In times of severe difficulty or grief',
        translation: 'There is no deity except You; exalted are You. Indeed, I have been of the wrongdoers.',
        virtue: 'The prayer of Prophet Yunus (AS); guaranteed relief from distress.'
      },
      bn: {
        title: '৮.১ বিপদ ও কঠিন সংকটের দোয়া',
        timing: 'যেকোনো কঠিন বিপদ বা দুশ্চিন্তার সময়',
        translation: 'আপনি ব্যতীত কোনো সত্য উপাস্য নেই, আপনি পবিত্র মহান। নিশ্চয়ই আমি জালিমদের অন্তর্ভুক্ত।',
        virtue: 'হযরত ইউনুস (আ.)-এর এই দোয়া পড়লে আল্লাহ সংকট থেকে মুক্তি দেন।'
      }
    }
  },
  {
    id: 'dua_9_1',
    title: '9.1 Seeking Forgiveness (Istighfar)',
    category: 'forgiveness',
    timing: 'Daily repentance',
    arabic: 'أَسْتَغْفِرُ اللَّهَ الْعَظِيمَ الَّذِي لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ',
    transliteration: 'Astaghfirullāhal-‘aẓīmal-ladhī lā ilāha illā huwal-Ḥayyul-Qayyūmu wa atūbu ilayh.',
    translation: 'I seek the forgiveness of Allah the Almighty, whom there is no deity except Him, the Ever-Living, the Sustainer, and I repent to Him.',
    reference: 'Sunan Abi Dawud 1517, Tirmidhi 3577',
    virtue: 'Forgiveness of sins even if they were like the foam of the sea.',
    suggestedCount: 100,
    translations: {
      en: {
        title: '9.1 Seeking Forgiveness (Istighfar)',
        timing: 'Daily repentance',
        translation: 'I seek the forgiveness of Allah the Almighty, whom there is no deity except Him, the Ever-Living, the Sustainer, and I repent to Him.',
        virtue: 'Forgiveness of sins even if equal to sea foam.'
      },
      bn: {
        title: '৯.১ ইস্তেগফার ও ক্ষমা প্রার্থনা',
        timing: 'প্রতিদিন বেশি বেশি পাঠ করা',
        translation: 'আমি মহান আল্লাহর ক্ষমা প্রার্থনা করছি, যিনি ছাড়া আর কোনো উপাস্য নেই, যিনি চিরঞ্জীব ও বিশ্বচরাচরের ধারক এবং আমি তাঁর নিকট তওবা করছি।',
        virtue: 'সমুদ্রের ফেনার সমান গোনাহ থাকলেও তা ক্ষমা করে দেওয়া হয়।'
      }
    }
  },
  {
    id: 'dua_10_1',
    title: '10.1 Debt Relief & Financial Ease',
    category: 'hardship',
    timing: 'When burdened with heavy debt or financial distress',
    arabic: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
    transliteration: 'Allāhummakfinī bi-ḥalālika ‘an ḥarāmika, wa aghninī bi-faḍlika ‘amman siwāk.',
    translation: 'O Allah, suffice me with Your lawful against Your prohibited, and make me independent of all others through Your bounty.',
    reference: 'Tirmidhi 3563',
    virtue: 'Even if your debt were like a mountain of gold, Allah will pay it off for you.',
    suggestedCount: 1,
    translations: {
      en: {
        title: '10.1 Debt Relief & Financial Ease',
        timing: 'When burdened with heavy debt',
        translation: 'O Allah, suffice me with Your lawful against Your prohibited, and make me independent of all others through Your bounty.',
        virtue: 'Clears heavy debts even if like a mountain.'
      },
      bn: {
        title: '১০.১ ঋণ মুক্তি ও সচ্ছলতার দোয়া',
        timing: 'ঋণের বোঝা বা আর্থিক সংকটে',
        translation: 'হে আল্লাহ! আপনার হালাল রিজিক দিয়েই আমার জন্য হারাম থেকে যথেষ্ট হোন এবং আপনার দয়ায় আমাকে অন্য সবার মুখাপেক্ষীহীন করে দিন।',
        virtue: 'পাহাড়সম ঋণ থাকলেও আল্লাহ তা পরিশোধের ব্যবস্থা করে দেন।'
      }
    }
  },
  {
    id: 'dua_11_1',
    title: '11.1 When Breaking Fast (Iftar)',
    category: 'ramadan',
    timing: 'At the time of Iftar',
    arabic: 'ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ',
    transliteration: 'Dhahabadh-ẓama’u, wabtallatil-‘urūqu, wa thabatal-ajru in shā’allāh.',
    translation: 'The thirst has gone, the veins are moist, and the reward is confirmed, if Allah wills.',
    reference: 'Sunan Abi Dawud 2357',
    virtue: 'The dua made by a fasting person at the time of breaking fast is not rejected.',
    suggestedCount: 1,
    translations: {
      en: {
        title: '11.1 When Breaking Fast (Iftar)',
        timing: 'At the time of Iftar',
        translation: 'The thirst has gone, the veins are moist, and the reward is confirmed, if Allah wills.',
        virtue: 'Supplication at Iftar is accepted.'
      },
      bn: {
        title: '১১.১ ইফতারের সময়কার দোয়া',
        timing: 'রোযা ভাঙার মুহূর্তে',
        translation: 'পিপাসা দূর হলো, শিরা-উপশিরা সিক্ত হলো এবং ইনশাআল্লাহ সাওয়াব নির্ধারিত হয়ে গেল।',
        virtue: 'ইফতারের সময় রোজাদারের দোয়া অত্যন্ত কবুল হয়।'
      }
    }
  },
  {
    id: 'dua_12_1',
    title: '12.1 Talbiyah for Hajj & Umrah',
    category: 'hajj',
    timing: 'During Hajj and Umrah journey',
    arabic: 'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ',
    transliteration: 'Labbaykal-lāhumma labbayk, labbayka lā sharīka laka labbayk, innal-ḥamda wan-ni’mata laka wal-mulk, lā sharīka lak.',
    translation: 'At Your service, O Allah, at Your service. At Your service, You have no partner, at Your service. Truly all praise, grace, and sovereignty belong to You. You have no partner.',
    reference: 'Sahih al-Bukhari 1549',
    virtue: 'The sacred proclamation of Hajj and Umrah pilgrims.',
    suggestedCount: 3,
    translations: {
      en: {
        title: '12.1 Talbiyah for Hajj & Umrah',
        timing: 'During Hajj and Umrah journey',
        translation: 'At Your service, O Allah, at Your service. At Your service, You have no partner, at Your service...',
        virtue: 'The blessed proclamation of pilgrims.'
      },
      bn: {
        title: '১২.১ হজ্জ ও ওমরার তালবিয়া',
        timing: 'তালবিয়া পাঠের সময়',
        translation: 'হে আল্লাহ! আমি হাজির, আপনার কোনো শরিক নেই, আমি হাজির। নিশ্চয়ই সমস্ত প্রশংসা, নিয়ামত ও রাজত্ব একমাত্র আপনারই। আপনার কোনো শরিক নেই।',
        virtue: 'হজ্জ ও ওমরার অন্যতম প্রধান জিকির ও ঘোষণা।'
      }
    }
  }
];
