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
  chapterNumber?: number;
  hisnulNumber?: string;
  translations?: {
    [key: string]: DuaTranslation;
  };
}

export const AUTHENTIC_DUAS: DuaItem[] = [
  // --- Chapter 1: Waking Up from Sleep (1-4) ---
  {
    id: 'dua_1_1',
    title: '1. Awakening: Life after Sleep',
    category: 'sleep_wake',
    timing: 'Immediately upon waking up',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Al-ḥamdu lillāhil-ladhī aḥyānā ba‘da mā amātanā wa ilayhin-nushūr.',
    translation: 'Praise is to Allah Who gives us life after He has caused us to die and to Him is the resurrection.',
    reference: 'Sahih al-Bukhari 6314, Muslim 2711',
    virtue: 'Gratitude for awakening.',
    suggestedCount: 1,
    chapterNumber: 1,
    hisnulNumber: '1',
    translations: {
      en: { title: '1. Awakening: Life after Sleep', timing: 'Upon waking', translation: 'Praise is to Allah Who gives us life after He has caused us to die and to Him is the resurrection.' },
      bn: { title: '১. ঘুম থেকে জেগে ওঠার দোয়া', timing: 'ঘুম ভাঙার সাথে সাথে', translation: 'সমস্ত প্রশংসা আল্লাহর জন্য, যিনি (নিদ্রারূপ) মৃত্যুর পর আমাদের জীবিত করলেন, আর তাঁরই নিকট সকলের পুনরুত্থান।' }
    }
  },
  {
    id: 'dua_1_2',
    title: '2. Awakening: Oneness of Allah & Forgiveness',
    category: 'sleep_wake',
    timing: 'Upon waking up',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ...',
    transliteration: 'Lā ilāha illallāhu waḥdahu lā sharīka lah, lahul-mulku wa lahul-ḥamd, wa huwa ‘alā kulli shay-in qadīr...',
    translation: 'None has the right to be worshipped except Allah alone, without partner. To Him belongs sovereignty and praise...',
    reference: 'Sahih al-Bukhari, Ibn Majah 335',
    virtue: 'Forgiveness and answered prayers upon waking.',
    suggestedCount: 1,
    chapterNumber: 1,
    hisnulNumber: '2',
    translations: {
      en: { title: '2. Oneness of Allah upon Waking', timing: 'Upon waking', translation: 'None has the right to be worshipped except Allah alone...' },
      bn: { title: '২. ঘুম থেকে জেগে একত্ববাদের ঘোষণা', timing: 'ঘুম থেকে জেগে', translation: 'একমাত্র আল্লাহ ছাড়া কোনো হক ইলাহ নেই, তাঁর কোনো শরীক নেই; রাজত্ব তাঁরই, প্রশংসাও তাঁরই...' }
    }
  },
  {
    id: 'dua_1_3',
    title: '3. Awakening: Safety of Body and Soul',
    category: 'sleep_wake',
    timing: 'Upon waking up',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي، وَرَدَّ عَلَيَّ رُوحِي، وَأَذِنَ لِي بِذِكْرِهِ',
    transliteration: 'Al-ḥamdu lillāhil-ladhī ‘āfānī fī jasadī, wa radda ‘alayya rūḥī, wa adhina lī bidhikrih.',
    translation: 'Praise is to Allah Who has restored to me my health and soul and permitted me to remember Him.',
    reference: 'Tirmidhi 3401',
    virtue: 'Gratitude for physical health and dhikr.',
    suggestedCount: 1,
    chapterNumber: 1,
    hisnulNumber: '3',
    translations: {
      en: { title: '3. Safety of Body and Soul', timing: 'Upon waking', translation: 'Praise is to Allah Who has restored to me my health and soul...' },
      bn: { title: '৩. দেহ ও রুহ সুস্থ রাখার শুকরিয়া', timing: 'ঘুম থেকে জেগে', translation: 'সকল হামদ-প্রশংসা আল্লাহর জন্য, যিনি আমার দেহকে নিরাপদ করেছেন, আমার রূহকে ফেরত দিয়েছেন...' }
    }
  },
  {
    id: 'dua_1_4',
    title: '4. Awakening: Reflection on Creation (Ali Imran 190-200)',
    category: 'sleep_wake',
    timing: 'When waking up at night',
    arabic: 'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِأُولِي الْأَلْبَابِ',
    transliteration: 'Inna fī khalqis-samāwāti wal-arḍi wakhtilāfil-layli wan-nahār...',
    translation: 'Indeed, in the creation of the heavens and the earth are signs for those of understanding...',
    reference: 'Surah Ali Imran (3:190-200)',
    virtue: 'Sunnah when waking up at night.',
    suggestedCount: 1,
    chapterNumber: 1,
    hisnulNumber: '4',
    translations: {
      en: { title: '4. Reflection on Creation (Ali Imran 190-200)', timing: 'Night waking', translation: 'Indeed, in the creation of the heavens and the earth...' },
      bn: { title: '৪. রাতের জেগে আয়াত তিলাওয়াত', timing: 'রাতে ঘুম ভেঙে', translation: 'নিশ্চয় আসমানসমূহ ও জমিনের সৃষ্টিতে নিদর্শন রয়েছে বুদ্ধিমানদের জন্য...' }
    }
  },

  // --- Chapter 2: Putting on Clothes (5) ---
  {
    id: 'dua_2_1',
    title: '5. Supplication When Putting on a Garment',
    category: 'daily_living',
    timing: 'When wearing clothes',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا (الثَّوْبَ) وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    transliteration: 'Al-ḥamdu lillāhil-ladhī kasānī hādhal-thawba wa razaqanīhi min ghayri ḥawlin minnī wa lā quwwah.',
    translation: 'Praise is to Allah Who has clothed me with this and provided it without any power from me.',
    reference: 'Abu Dawud 4023, Tirmidhi 3458',
    virtue: 'Forgiveness of past sins.',
    suggestedCount: 1,
    chapterNumber: 2,
    hisnulNumber: '5',
    translations: {
      en: { title: '5. Putting on a Garment', timing: 'Dressing', translation: 'Praise is to Allah Who has clothed me with this...' },
      bn: { title: '৫. কাপড় পরিধানের দোয়া', timing: 'পোশাক পরার সময়', translation: 'সকল হামদ-প্রশংসা আল্লাহর জন্য, যিনি আমাকে এ কাপড় পরিধান করিয়েছেন...' }
    }
  },

  // --- Chapter 3: New Clothes (6) ---
  {
    id: 'dua_3_1',
    title: '6. Supplication When Putting on New Clothes',
    category: 'daily_living',
    timing: 'When wearing new clothes',
    arabic: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ...',
    transliteration: 'Allāhumma lakal-ḥamdu anta kasawtanīh, as-aluka min khayrihi wa khayri mā ṣuni‘a lah...',
    translation: 'O Allah, to You is all praise. You have clothed me with it. I ask You for its good...',
    reference: 'Abu Dawud 4020, Tirmidhi 1767',
    virtue: 'Seeking blessings of new attire.',
    suggestedCount: 1,
    chapterNumber: 3,
    hisnulNumber: '6',
    translations: {
      en: { title: '6. New Clothes Supplication', timing: 'New clothes', translation: 'O Allah, to You is all praise...' },
      bn: { title: '৬. নতুন কাপড় পরিধানের দোয়া', timing: 'নতুন পোশাক পরার সময়', translation: 'হে আল্লাহ! আপনারই জন্য সকল হামদ-প্রশংসা। আপনিই এটি আমাকে পরেছেন...' }
    }
  },

  // --- Chapter 4: Greeting New Clothes (7-8) ---
  {
    id: 'dua_4_1',
    title: '7. Dua for Someone Wearing New Clothes (1)',
    category: 'daily_living',
    timing: 'When seeing someone in new clothes',
    arabic: 'تُبْلِي وَيُخْلِفُ اللَّهُ تَعَالَى',
    transliteration: 'Tublī wa yukhlifullāhu ta‘ālā.',
    translation: 'May you wear it out and may Allah replace it.',
    reference: 'Abu Dawud 4020',
    virtue: 'Blessing others.',
    suggestedCount: 1,
    chapterNumber: 4,
    hisnulNumber: '7',
    translations: {
      en: { title: '7. Greeting New Clothes (1)', timing: 'New clothes', translation: 'May you wear it out and may Allah replace it.' },
      bn: { title: '৭. নতুন কাপড় পরলে দোয়ার প্রথম রূপ', timing: 'নতুন পোশাকে দেখলে', translation: 'তুমি পুরাতন করে ফেলবে, আর মহান আল্লাহ এর স্থলাভিষিক্ত করবেন।' }
    }
  },
  {
    id: 'dua_4_2',
    title: '8. Dua for Someone Wearing New Clothes (2)',
    category: 'daily_living',
    timing: 'Greeting new clothes',
    arabic: 'اِلْبَسْ جَدِيدًا، وَعِشْ حَمِيدًا، وَمُتْ شَهِيدًا',
    transliteration: 'Ilbas jadīdan, wa ‘ish ḥamīdan, wa mut shahīdā.',
    translation: 'Wear new clothes, live a praiseworthy life, and die a martyr.',
    reference: 'Ibn Majah 3558',
    virtue: 'Martyrdom and honorable life wish.',
    suggestedCount: 1,
    chapterNumber: 4,
    hisnulNumber: '8',
    translations: {
      en: { title: '8. Greeting New Clothes (2)', timing: 'New clothes', translation: 'Wear new clothes, live a praiseworthy life, and die a martyr.' },
      bn: { title: '৮. নতুন কাপড় পরলে দোয়ার দ্বিতীয় রূপ', timing: 'নতুন পোশাকে দেখলে', translation: 'নতুন কাপড় পরিধান কর, প্রশংসিতরূপে দিনাতিপাত কর এবং শহীদ হয়ে মারা যাও।' }
    }
  },

  // --- Chapter 5: Undressing (9) ---
  {
    id: 'dua_5_1',
    title: '9. What to Say When Undressing',
    category: 'daily_living',
    timing: 'When removing clothes',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillāh.',
    translation: 'In the name of Allah.',
    reference: 'Tirmidhi 606',
    virtue: 'Veil against Jinn.',
    suggestedCount: 1,
    chapterNumber: 5,
    hisnulNumber: '9',
    translations: {
      en: { title: '9. Undressing', timing: 'Removing clothes', translation: 'In the name of Allah.' },
      bn: { title: '৯. কাপড় খোলার দোয়া', timing: 'পোশাক খোলার সময়', translation: 'আল্লাহর নামে।' }
    }
  },

  // --- Chapter 6: Entering Restroom (10) ---
  {
    id: 'dua_6_1',
    title: '10. Entering Restroom',
    category: 'purification',
    timing: 'Before entering toilet',
    arabic: 'بِسْمِ اللَّهِ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    transliteration: 'Bismillāh. Allāhumma innī a‘ūdhu bika minal-khubuthi wal-khabā-ith.',
    translation: 'In the name of Allah. O Allah, I seek refuge in You from male and female devils.',
    reference: 'Bukhari 142, Muslim 375',
    virtue: 'Protection from jinn.',
    suggestedCount: 1,
    chapterNumber: 6,
    hisnulNumber: '10',
    translations: {
      en: { title: '10. Entering Restroom', timing: 'Toilet entry', translation: 'In the name of Allah. O Allah, I seek refuge in You from male and female devils.' },
      bn: { title: '১০. পায়খানায় প্রবেশের দোয়া', timing: 'টয়লেটে যাওয়ার পূর্বে', translation: 'আল্লাহর নামে। হে আল্লাহ! আমি আপনার নিকট অপবিত্র নর জিন ও নারী জিন থেকে আশ্রয় চাই।' }
    }
  },

  // --- Chapter 7: Leaving Restroom (11) ---
  {
    id: 'dua_7_1',
    title: '11. Leaving Restroom',
    category: 'purification',
    timing: 'When stepping out',
    arabic: 'غُفْرَانَكَ',
    transliteration: 'Ghufrānaka.',
    translation: 'I ask You for forgiveness.',
    reference: 'Abu Dawud, Tirmidhi',
    virtue: 'Asking forgiveness.',
    suggestedCount: 1,
    chapterNumber: 7,
    hisnulNumber: '11',
    translations: {
      en: { title: '11. Leaving Restroom', timing: 'Toilet exit', translation: 'I ask You for forgiveness.' },
      bn: { title: '১১. পায়খানা থেকে বের হওয়ার দোয়া', timing: 'টয়লেট থেকে বের হয়ে', translation: 'আমি আপনার কাছে ক্ষমা প্রার্থী।' }
    }
  },

  // --- Chapter 8: Before Wudu (12) ---
  {
    id: 'dua_8_1',
    title: '12. Before Wudu',
    category: 'purification',
    timing: 'Starting ablution',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillāh.',
    translation: 'In the name of Allah.',
    reference: 'Abu Dawud 101',
    virtue: 'Purification with Allah\'s name.',
    suggestedCount: 1,
    chapterNumber: 8,
    hisnulNumber: '12',
    translations: {
      en: { title: '12. Before Wudu', timing: 'Starting wudu', translation: 'In the name of Allah.' },
      bn: { title: '১২. অজুর পূর্বে দোয়া', timing: 'অজু শুরুর আগে', translation: 'আল্লাহর নামে।' }
    }
  },

  // --- Chapter 9: After Wudu (13-15) ---
  {
    id: 'dua_9_1',
    title: '13. After Wudu (1)',
    category: 'purification',
    timing: 'After ablution',
    arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration: 'Ashhadu an lā ilāha illallāhu waḥdahu lā sharīka lah...',
    translation: 'I bear witness that none has the right to be worshipped except Allah alone...',
    reference: 'Muslim 234',
    virtue: 'Eight gates of Paradise opened.',
    suggestedCount: 1,
    chapterNumber: 9,
    hisnulNumber: '13',
    translations: {
      en: { title: '13. After Wudu (1)', timing: 'After wudu', translation: 'I bear witness that none has the right to be worshipped except Allah alone...' },
      bn: { title: '১৩. অযু শেষের প্রথম দোয়া', timing: 'অজুর পর', translation: 'আমি সাক্ষ্য দিচ্ছি যে, একমাত্র আল্লাহ ছাড়া কোনো হক ইলাহ নেই...' }
    }
  },
  {
    id: 'dua_9_2',
    title: '14. After Wudu (2)',
    category: 'purification',
    timing: 'After ablution',
    arabic: 'اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
    transliteration: 'Allāhummaj‘alnī minat-tawwābīna waj‘alnī minal-mutaṭahhirīn.',
    translation: 'O Allah, make me of those who repent and cleanse themselves.',
    reference: 'Tirmidhi 55',
    virtue: 'Purification and repentance.',
    suggestedCount: 1,
    chapterNumber: 9,
    hisnulNumber: '14',
    translations: {
      en: { title: '14. After Wudu (2)', timing: 'After wudu', translation: 'O Allah, make me of those who repent and cleanse themselves.' },
      bn: { title: '১৪. অযু শেষের দ্বিতীয় দোয়া', timing: 'অজুর পর', translation: 'হে আল্লাহ! আপনি আমাকে তওবাকারীদের অন্তর্ভুক্ত করুন এবং পবিত্রতা অর্জনকারীদেরও অন্তর্ভুক্ত করুন।' }
    }
  },
  {
    id: 'dua_9_3',
    title: '15. After Wudu (3)',
    category: 'purification',
    timing: 'After ablution',
    arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ',
    transliteration: 'Subḥānakallāhumma wa biḥamdik...',
    translation: 'Glory is to You, O Allah, and with Your praise...',
    reference: 'Nasa-i',
    virtue: 'Forgiveness.',
    suggestedCount: 1,
    chapterNumber: 9,
    hisnulNumber: '15',
    translations: {
      en: { title: '15. After Wudu (3)', timing: 'After wudu', translation: 'Glory is to You, O Allah, and with Your praise...' },
      bn: { title: '১৫. অযু শেষের তৃতীয় দোয়া', timing: 'অজুর পর', translation: 'হে আল্লাহ! আপনার প্রশংসাসসহ পবিত্রতা ও মহিমা ঘোষণা করছি...' }
    }
  },

  // --- Chapter 10: Leaving Home (16-17) ---
  {
    id: 'dua_10_1',
    title: '16. Leaving Home (1)',
    category: 'travel',
    timing: 'Stepping out',
    arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Bismillāh, tawakkaltu ‘alallāh, wa lā ḥawla wa lā quwwata illā billāh.',
    translation: 'In the name of Allah, I trust in Allah; no might except with Allah.',
    reference: 'Abu Dawud 5095',
    virtue: 'Protection from Satan.',
    suggestedCount: 1,
    chapterNumber: 10,
    hisnulNumber: '16',
    translations: {
      en: { title: '16. Leaving Home (1)', timing: 'Stepping out', translation: 'In the name of Allah, I trust in Allah...' },
      bn: { title: '১৬. বাড়ি থেকে বের হওয়ার দোয়া', timing: 'ঘর থেকে বের হয়ে', translation: 'আল্লাহর নামে। আল্লাহর ওপর ভরসা করলাম...' }
    }
  },
  {
    id: 'dua_10_2',
    title: '17. Leaving Home (2)',
    category: 'travel',
    timing: 'Stepping out',
    arabic: 'اللَّهُمَّ إِنِّى أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ...',
    transliteration: 'Allāhumma innī a‘ūdhu bika an aḍilla aw uḍall...',
    translation: 'O Allah, I seek refuge in You lest I stray or be led astray...',
    reference: 'Abu Dawud 5094',
    virtue: 'Protection from error and oppression.',
    suggestedCount: 1,
    chapterNumber: 10,
    hisnulNumber: '17',
    translations: {
      en: { title: '17. Leaving Home (2)', timing: 'Stepping out', translation: 'O Allah, I seek refuge in You lest I stray...' },
      bn: { title: '১৭. বাড়ি থেকে বের হওয়ার দ্বিতীয় দোয়া', timing: 'ঘর থেকে বের হয়ে', translation: 'হে আল্লাহ! আমি আপনার নিকট আশ্রয় চাই যেন পথভ্রষ্ট না হই...' }
    }
  },

  // --- Chapter 11: Entering Home (18) ---
  {
    id: 'dua_11_1',
    title: '18. Entering Home',
    category: 'daily_living',
    timing: 'Entering house',
    arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا',
    transliteration: 'Bismillāhi walajnā, wa bismillāhi kharajnā, wa ‘alā rabbinā tawakkalnā.',
    translation: 'In the name of Allah we enter, and in the name of Allah we leave...',
    reference: 'Abu Dawud 5096',
    virtue: 'Satan banished from home.',
    suggestedCount: 1,
    chapterNumber: 11,
    hisnulNumber: '18',
    translations: {
      en: { title: '18. Entering Home', timing: 'Entering house', translation: 'In the name of Allah we enter...' },
      bn: { title: '১৮. ঘরে প্রবেশের দোয়া', timing: 'বাসায় প্রবেশ করে', translation: 'আল্লাহর নামেই প্রবেশ করলাম...' }
    }
  },

  // --- Chapter 12: Going to Mosque (19) ---
  {
    id: 'dua_12_1',
    title: '19. Going to Mosque',
    category: 'mosque',
    timing: 'Walking to masjid',
    arabic: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا...',
    transliteration: 'Allāhummaj‘al fī qalbī nūrā, wa fī lisānī nūrā...',
    translation: 'O Allah, place light in my heart, and light in my tongue...',
    reference: 'Bukhari 6316',
    virtue: 'Light in limbs.',
    suggestedCount: 1,
    chapterNumber: 12,
    hisnulNumber: '19',
    translations: {
      en: { title: '19. Going to Mosque', timing: 'Walking to masjid', translation: 'O Allah, place light in my heart...' },
      bn: { title: '১৯. মসজিদে যাওয়ার দোয়া', timing: 'মসজিদে যাওয়ার পথে', translation: 'হে আল্লাহ! আমার অন্তরে নূর দান করুন...' }
    }
  },

  // --- Chapter 13: Entering Mosque (20) ---
  {
    id: 'dua_13_1',
    title: '20. Entering Mosque',
    category: 'mosque',
    timing: 'Entering masjid',
    arabic: 'أَعُوذُ بِاللَّهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ',
    transliteration: 'A‘ūdhu billāhil-‘aẓīm, wa biwajhihil-karīm...',
    translation: 'I seek refuge in Allah the Almighty, by His Noble Face, from the accursed Satan.',
    reference: 'Abu Dawud 466',
    virtue: 'Mercy and protection.',
    suggestedCount: 1,
    chapterNumber: 13,
    hisnulNumber: '20',
    translations: {
      en: { title: '20. Entering Mosque', timing: 'Entering masjid', translation: 'I seek refuge in Allah the Almighty...' },
      bn: { title: '২০. মসজিদে প্রবেশের দোয়া', timing: 'মসজিদে ঢুকে', translation: 'আমি মহান আল্লাহর কাছে তাঁর সম্মানিত চেহারা ও প্রাচীন ক্ষমতার উসীলায় বিতাড়িত শয়তান থেকে আশ্রয় চাই।' }
    }
  },

  // --- Chapter 14: Leaving Mosque (21) ---
  {
    id: 'dua_14_1',
    title: '21. Leaving Mosque',
    category: 'mosque',
    timing: 'Leaving masjid',
    arabic: 'بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    transliteration: 'Bismillāhi was-salātu was-salāmu ‘alā rasūlillāh...',
    translation: 'In the name of Allah, prayers and peace be upon the Messenger of Allah. O Allah, I ask You from Your bounty.',
    reference: 'Ibn Majah 129',
    virtue: 'Bounty of Allah.',
    suggestedCount: 1,
    chapterNumber: 14,
    hisnulNumber: '21',
    translations: {
      en: { title: '21. Leaving Mosque', timing: 'Leaving masjid', translation: 'In the name of Allah... O Allah, I ask You from Your bounty.' },
      bn: { title: '২১. মসজিদ থেকে বের হওয়ার দোয়া', timing: 'মসজিদ থেকে বের হয়ে', translation: 'আল্লাহর নামে। আল্লাহর রাসুলের ওপর শান্তি বর্ষিত হোক। হে আল্লাহ! আপনার দয়া প্রার্থনা করছি।' }
    }
  },

  // --- Chapter 15: Adhan (22-26) ---
  {
    id: 'dua_15_1',
    title: '22. Adhan & Waseelah',
    category: 'mosque',
    timing: 'After Adhan',
    arabic: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ...',
    transliteration: 'Allāhumma rabba hādhihid-da‘watit-tāmmah...',
    translation: 'O Allah, Lord of this perfect call and established prayer, grant Muhammad the intercession...',
    reference: 'Bukhari 614',
    virtue: 'Intercession.',
    suggestedCount: 1,
    chapterNumber: 15,
    hisnulNumber: '22',
    translations: {
      en: { title: '22. Adhan & Waseelah', timing: 'After Adhan', translation: 'O Allah, Lord of this perfect call...' },
      bn: { title: '২২. আজানের পরের দোয়া (ওয়াসীলা)', timing: 'আজানের পর', translation: 'হে আল্লাহ! এই পরিপূর্ণ আহ্বান এবং প্রতিষ্ঠিত সালাতের রব্ব! মুহাম্মদকে উসীলা দান করুন।' }
    }
  },

  // --- Chapter 16: Sana (27-32) ---
  {
    id: 'dua_16_1',
    title: '23. Opening Sana',
    category: 'salat',
    timing: 'Start of prayer',
    arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ',
    transliteration: 'Subḥānakallāhumma wa biḥamdik, wa tabārakasmuk...',
    translation: 'Glory is to You, O Allah, and with Your praise...',
    reference: 'Muslim 399',
    virtue: 'Opening praise in prayer.',
    suggestedCount: 1,
    chapterNumber: 16,
    hisnulNumber: '27',
    translations: {
      en: { title: '23. Opening Sana', timing: 'Start of prayer', translation: 'Glory is to You, O Allah, and with Your praise...' },
      bn: { title: '২৩. সালাতের শুরুর সানা', timing: 'নামাজ শুরু করে', translation: 'হে আল্লাহ! আপনার প্রশংসাসসহ পবিত্রতা ও মহিমা ঘোষণা করছি...' }
    }
  },

  // --- Chapter 17: Ruku (33-37) ---
  {
    id: 'dua_17_1',
    title: '24. Ruku Zikr',
    category: 'salat',
    timing: 'Bowing',
    arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
    transliteration: 'Subḥāna rabbiyal-‘aẓīm.',
    translation: 'Glory is to my Lord, the Greatest.',
    reference: 'Muslim 771',
    virtue: 'Glorification in Ruku.',
    suggestedCount: 3,
    chapterNumber: 17,
    hisnulNumber: '33',
    translations: {
      en: { title: '24. Ruku Zikr', timing: 'Bowing', translation: 'Glory is to my Lord, the Greatest.' },
      bn: { title: '২৪. রুকুর তাসবীহ', timing: 'রুকুতে', translation: 'আমার মহান রব্বের পবিত্রতা ও মহিমা ঘোষণা করছি।' }
    }
  },

  // --- Chapter 18: Rising from Ruku (38-40) ---
  {
    id: 'dua_18_1',
    title: '25. Rising from Ruku',
    category: 'salat',
    timing: 'Standing up',
    arabic: 'رَبَّنَا وَلَكَ الْحَمْدُ، حَمْداً كَثِيرًا طَيِّباً مُبَارَكاً فِيهِ',
    transliteration: 'Rabbanā wa lakal-ḥamd, ḥamdan kathīran ṭayyiban mubārakan fīh.',
    translation: 'Our Lord, to You belongs all praise, an abundant, beautiful, and blessed praise.',
    reference: 'Bukhari 796',
    virtue: 'Angels record praise.',
    suggestedCount: 1,
    chapterNumber: 18,
    hisnulNumber: '38',
    translations: {
      en: { title: '25. Rising from Ruku', timing: 'Standing up', translation: 'Our Lord, to You belongs all praise...' },
      bn: { title: '২৫. রুকু থেকে ওঠার পরের জিকির', timing: 'রুকু থেকে সোজা হয়ে', translation: 'হে আমাদের রব্ব! আপনার জন্যই সমস্ত প্রশংসা; অমঢল ও পবিত্র বরকতপূর্ণ প্রশংসা।' }
    }
  },

  // --- Chapter 19: Sujood (41-47) ---
  {
    id: 'dua_19_1',
    title: '26. Sujood Zikr',
    category: 'salat',
    timing: 'Prostration',
    arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
    transliteration: 'Subḥāna rabbiyal-a‘lā.',
    translation: 'Glory is to my Lord, the Most High.',
    reference: 'Muslim 771',
    virtue: 'Glorification in Sujood.',
    suggestedCount: 3,
    chapterNumber: 19,
    hisnulNumber: '41',
    translations: {
      en: { title: '26. Sujood Zikr', timing: 'Prostration', translation: 'Glory is to my Lord, the Most High.' },
      bn: { title: '২৬. সিজদার তাসবীহ', timing: 'সিজদায়', translation: 'আমার রব্বের পবিত্রতা ও মহিমা বর্ণনা করছি, যিনি সবার উপরে।' }
    }
  },

  // --- Chapter 20: Between Sujoods (48-49) ---
  {
    id: 'dua_20_1',
    title: '27. Between Sujoods',
    category: 'salat',
    timing: 'Sitting',
    arabic: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي',
    transliteration: 'Rabbighfir lī, rabbighfir lī.',
    translation: 'My Lord, forgive me, my Lord, forgive me.',
    reference: 'Abu Dawud 874',
    virtue: 'Forgiveness.',
    suggestedCount: 2,
    chapterNumber: 20,
    hisnulNumber: '48',
    translations: {
      en: { title: '27. Between Sujoods', timing: 'Sitting', translation: 'My Lord, forgive me, my Lord, forgive me.' },
      bn: { title: '২৭. দুই সিজদার মাঝের দোয়া', timing: 'সিজদার দুই মাঝখানে বসে', translation: 'হে আমার রব! আমাকে ক্ষমা করুন।' }
    }
  },

  // --- Chapter 22: Tashahhud (52) ---
  {
    id: 'dua_22_1',
    title: '28. Tashahhud',
    category: 'salat',
    timing: 'Sitting',
    arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ...',
    transliteration: 'Attahiyyātu lillāhi was-salawātu wat-ṭayyibāt...',
    translation: 'All greetings, prayers and pure words are for Allah...',
    reference: 'Bukhari 831',
    virtue: 'Core salutation.',
    suggestedCount: 1,
    chapterNumber: 22,
    hisnulNumber: '52',
    translations: {
      en: { title: '28. Tashahhud', timing: 'Sitting', translation: 'All greetings, prayers and pure words are for Allah...' },
      bn: { title: '২৮. তাশাহহুদ', timing: 'বৈঠকে', translation: 'যাবতীয় অভিবাদন আল্লাহর জন্য...' }
    }
  },

  // --- Chapter 23: Durood (53-54) ---
  {
    id: 'dua_23_1',
    title: '29. Durood Ibrahim',
    category: 'salat',
    timing: 'After Tashahhud',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ...',
    transliteration: 'Allāhumma ṣalli ‘alā muḥammadin wa ‘alā āli muḥammad...',
    translation: 'O Allah, send prayers upon Muhammad and upon the family of Muhammad...',
    reference: 'Bukhari 3370',
    virtue: 'Blessings on Prophet.',
    suggestedCount: 1,
    chapterNumber: 23,
    hisnulNumber: '53',
    translations: {
      en: { title: '29. Durood Ibrahim', timing: 'After Tashahhud', translation: 'O Allah, send prayers upon Muhammad...' },
      bn: { title: '২৯. দরূদ শরীফ', timing: 'তাশাহহুদের পর', translation: 'হে আল্লাহ! মুহাম্মদ ও তাঁর পরিবারের ওপর রহমত বর্ষণ করুন...' }
    }
  },

  // --- Chapter 24: Before Salam (55-65) ---
  {
    id: 'dua_24_1',
    title: '30. Protection from 4 Trials',
    category: 'salat',
    timing: 'Before Salam',
    arabic: 'اللَّهُمَّ إِنِّى أَعُوذُ بِكَ مِنَ عَذَابِ الْقَبْرِ، وَمِنْ عَذَابِ جَهَنَّمَ...',
    transliteration: 'Allāhumma innī a‘ūdhu bika min ‘adhābil-qabr...',
    translation: 'O Allah, I seek refuge in You from grave punishment, Hellfire, life/death trials, and Dajjal.',
    reference: 'Bukhari 1377',
    virtue: 'Protection.',
    suggestedCount: 1,
    chapterNumber: 24,
    hisnulNumber: '55',
    translations: {
      en: { title: '30. Protection from 4 Trials', timing: 'Before Salam', translation: 'O Allah, I seek refuge in You from grave punishment...' },
      bn: { title: '৩০. চার ফিতনা থেকে মুক্তির দোয়া', timing: 'সালামের পূর্বে', translation: 'হে আল্লাহ! কবরের আজাব, জাহান্নামের আজাব, জীবন-মৃত্যুর ফিতনা এবং দাজ্জালের ফিতনা থেকে আশ্রয় চাই।' }
    }
  },

  // --- Chapter 27: Morning & Evening (75-98) ---
  {
    id: 'dua_27_1',
    title: '32. Ayat al-Kursi (Morning & Evening)',
    category: 'morning_evening',
    timing: 'Morning & Evening',
    arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
    transliteration: 'Allāhu lā ilāha illā huwal-Ḥayyul-Qayyūm...',
    translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer...',
    reference: 'Baqarah 2:255',
    virtue: 'Protection.',
    suggestedCount: 1,
    chapterNumber: 27,
    hisnulNumber: '75',
    translations: {
      en: { title: '32. Ayat al-Kursi', timing: 'Morning & Evening', translation: 'Allah - there is no deity except Him...' },
      bn: { title: '৩২. আয়াতুল কুরসি (সকাল-সন্ধ্যা)', timing: 'সকাল ও সন্ধ্যায়', translation: 'আল্লাহ! তিনি ছাড়া কোনো সত্য ইলাহ নেই...' }
    }
  },
  {
    id: 'dua_27_2',
    title: '33. Sayyidul Istighfar',
    category: 'morning_evening',
    timing: 'Morning & Evening',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ...',
    transliteration: 'Allāhumma anta Rabbī lā ilāha illā anta...',
    translation: 'O Allah, You are my Lord, none has the right to be worshipped except You...',
    reference: 'Bukhari 6306',
    virtue: 'Paradise guarantee.',
    suggestedCount: 1,
    chapterNumber: 27,
    hisnulNumber: '79',
    translations: {
      en: { title: '33. Sayyidul Istighfar', timing: 'Morning & Evening', translation: 'O Allah, You are my Lord...' },
      bn: { title: '৩৩. সাইয়্যিদুল ইস্তেগফার', timing: 'সকাল ও সন্ধ্যায়', translation: 'হে আল্লাহ! আপনি আমার রব...' }
    }
  },

  // --- Chapter 32: Witr Qunoot (116) ---
  {
    id: 'dua_32_1',
    title: '43. Witr Qunoot',
    category: 'salat',
    timing: 'Witr Prayer',
    arabic: 'اللَّهُمَّ اهْدِنِي فِيمَنْ هَدَيْتَ، وَعَافِنِي فِيمَنْ عَافَيْتَ...',
    transliteration: 'Allāhummahdinī fīman hadayt...',
    translation: 'O Allah, guide me among those You have guided...',
    reference: 'Abu Dawud 1425',
    virtue: 'Guidance and protection.',
    suggestedCount: 1,
    chapterNumber: 32,
    hisnulNumber: '116',
    translations: {
      en: { title: '43. Witr Qunoot', timing: 'Witr', translation: 'O Allah, guide me among those You have guided...' },
      bn: { title: '৪৩. বিতরের কুনূত', timing: 'বিতরে', translation: 'হে আল্লাহ! আপনি যাদেরকে হেদায়াত করেছেন তাদের মধ্যে আমাকেও হেদায়াত দিন...' }
    }
  },

  // --- Chapter 34: Anxiety & Sorrow (120-121) ---
  {
    id: 'dua_34_1',
    title: '35. Dua for Anxiety & Sorrow',
    category: 'hardship',
    timing: 'When distressed',
    arabic: 'اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ...',
    transliteration: 'Allāhumma innī ‘abduka, ibnu ‘abdika...',
    translation: 'O Allah, I am Your slave, son of Your male slave...',
    reference: 'Ahmad 3712',
    virtue: 'Relief of worry.',
    suggestedCount: 1,
    chapterNumber: 34,
    hisnulNumber: '120',
    translations: {
      en: { title: '35. Dua for Anxiety & Sorrow', timing: 'Distress', translation: 'O Allah, I am Your slave...' },
      bn: { title: '৩৫. দুঃখ ও দুশ্চিন্তার দোয়া', timing: 'পেরেশানিতে', translation: 'হে আল্লাহ! আমি আপনার বান্দা...' }
    }
  },

  // --- Chapter 68: Iftar (176) ---
  {
    id: 'dua_68_1',
    title: '38. Dua When Breaking Fast',
    category: 'ramadan',
    timing: 'At Iftar',
    arabic: 'ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ',
    transliteration: 'Dhahabas-ẓama-u, wabtallatil-‘urūqu...',
    translation: 'The thirst has gone, the veins are moistened...',
    reference: 'Abu Dawud 2357',
    virtue: 'Accepted prayer.',
    suggestedCount: 1,
    chapterNumber: 68,
    hisnulNumber: '176',
    translations: {
      en: { title: '38. Dua When Breaking Fast', timing: 'Iftar', translation: 'The thirst has gone, the veins are moistened...' },
      bn: { title: '৩৮. ইফতারের দোয়া', timing: 'ইফতারের সময়', translation: 'পিপাসা মিটেছে, শিরাগুলো সিক্ত হয়েছে...' }
    }
  },

  // --- Chapter 95: Travel (206-207) ---
  {
    id: 'dua_95_1',
    title: '40. Travel Supplication',
    category: 'travel',
    timing: 'Journey start',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ',
    transliteration: 'Subḥānal-ladhī sakhkhara lanā hādhā wa mā kunnā lahū muqrinīn',
    translation: 'Exalted is He who has subjected this to us...',
    reference: 'Muslim 1342',
    virtue: 'Safe journey.',
    suggestedCount: 1,
    chapterNumber: 95,
    hisnulNumber: '214',
    translations: {
      en: { title: '40. Travel Supplication', timing: 'Travel', translation: 'Exalted is He who has subjected this to us...' },
      bn: { title: '৪০. সফরের দোয়া', timing: 'সফরে রওনা হয়ে', translation: 'পবিত্র মহান সেই সত্তা, যিনি একে আমাদের জন্য বশীভূত করে দিয়েছেন...' }
    }
  },

  // --- Chapter 130: Tasbih Virtues (254-265) ---
  {
    id: 'dua_130_1',
    title: '41. Subhanallah wa Bihamdih',
    category: 'morning_evening',
    timing: '100x Daily',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    transliteration: 'Subḥānallāhi wa biḥamdih.',
    translation: 'Glory is to Allah and with His praise.',
    reference: 'Bukhari 6405',
    virtue: 'Sins forgiven.',
    suggestedCount: 100,
    chapterNumber: 130,
    hisnulNumber: '254',
    translations: {
      en: { title: '41. Subhanallah wa Bihamdih', timing: '100x Daily', translation: 'Glory is to Allah and with His praise.' },
      bn: { title: '৪১. সুবহানাল্লাহি ওয়া বিহামদিহি', timing: '১০০ বার', translation: 'সুবহানাল্লাহি ওয়া বিহামদিহি।' }
    }
  }
];
