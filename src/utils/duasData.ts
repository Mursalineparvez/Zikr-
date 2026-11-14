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
  // --- Virtues of Dhikr (Intro) ---
  {
    id: 'dua_intro_1',
    title: '1. Excellence of Zikr: Remembering Allah',
    category: 'morning_evening',
    timing: 'Anytime throughout the day',
    arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ',
    transliteration: 'Fadhkurūnī adhkurkum washkurū lī wa lā takfurūn.',
    translation: 'So remember Me; I will remember you. And be grateful to Me and do not deny Me.',
    reference: 'Surah Al-Baqarah (2:152)',
    virtue: 'Allah promises to remember those who remember Him.',
    suggestedCount: 100,
    chapterNumber: 0,
    hisnulNumber: 'Intro 1',
    translations: {
      en: { title: '1. Excellence of Zikr: Remembering Allah', timing: 'Anytime', translation: 'So remember Me; I will remember you.', virtue: 'Allah remembers those who remember Him.' },
      bn: { title: 'যিকিরের ফযীলত: আল্লাহকে স্মরণ করা', timing: 'সর্বদা', translation: 'অতএব তোমরা আমাকে স্মরণ কর, আমিও তোমাদের স্মরণ করব। আর আমার কৃতজ্ঞতা প্রকাশ কর এবং অকৃতজ্ঞ হয়ো না।', virtue: 'আল্লাহ তাআলা জিকিরকারীদের স্মরণ করেন।' }
    }
  },
  {
    id: 'dua_intro_2',
    title: '2. Abundant Remembrance of Allah',
    category: 'morning_evening',
    timing: 'Constant daily state',
    arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا',
    transliteration: 'Yā ayyuhal-ladhīna āmanudhkurullāha dhikran kathīrā.',
    translation: 'O you who have believed, remember Allah with much remembrance.',
    reference: 'Surah Al-Ahzab (33:41)',
    virtue: 'Commandment for believers to engage in frequent dhikr.',
    suggestedCount: 100,
    chapterNumber: 0,
    hisnulNumber: 'Intro 2',
    translations: {
      en: { title: '2. Abundant Remembrance of Allah', timing: 'Constant', translation: 'O you who have believed, remember Allah with much remembrance.', virtue: 'Brings forgiveness and great reward.' },
      bn: { title: 'অধিক পরিমাণে আল্লাহর জিকির', timing: 'সর্বদা', translation: 'হে মুমিনগণ! তোমরা আল্লাহকে অধিক পরিমাণে স্মরণ কর।', virtue: 'অধিক জিকিরকারীদের জন্য রয়েছে ক্ষমা ও বিরাট পুরস্কার।' }
    }
  },

  // --- Chapter 1: Waking Up ---
  {
    id: 'dua_1_1',
    title: '1. Awakening: Praise to Allah for Life after Sleep',
    category: 'sleep_wake',
    timing: 'Immediately upon waking up',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: 'Al-ḥamdu lillāhil-ladhī aḥyānā ba‘da mā amātanā wa ilayhin-nushūr.',
    translation: 'Praise is to Allah Who gives us life after He has caused us to die and to Him is the resurrection.',
    reference: 'Sahih al-Bukhari 6314, Muslim 2711',
    virtue: 'Gratitude for awakening and returning consciousness.',
    suggestedCount: 1,
    chapterNumber: 1,
    hisnulNumber: '1',
    translations: {
      en: { title: '1. Awakening: Praise for Life after Sleep', timing: 'Upon waking', translation: 'Praise is to Allah Who gives us life after He has caused us to die and to Him is the resurrection.' },
      bn: { title: '১. ঘুম থেকে জাগার পর প্রথম দোয়া', timing: 'ঘুম ভাঙার সাথে সাথে', translation: 'সমস্ত প্রশংসা আল্লাহর জন্য, যিনি (নিদ্রারূপ) মৃত্যুর পর আমাদের জীবিত করলেন, আর তাঁরই নিকট সকলের পুনরুত্থান।' }
    }
  },
  {
    id: 'dua_1_2',
    title: '2. Awakening: Oneness of Allah & Seeking Forgiveness',
    category: 'sleep_wake',
    timing: 'Upon waking up',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ. سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ، رَبِّ اغْفِرْ لِي',
    transliteration: 'Lā ilāha illallāhu waḥdahu lā sharīka lah, lahul-mulku wa lahul-ḥamd, wa huwa ‘alā kulli shay-in qadīr. Subḥānallāh, wal-ḥamdu lillāh, wa lā ilāha illallāh, wallāhu akbar, wa lā ḥawla wa lā quwwata illā billāhil-‘aliyyil-‘aẓīm, rabbighfir lī.',
    translation: 'None has the right to be worshipped except Allah, alone, without partner. To Him belongs sovereignty and praise, and He is over all things competent...',
    reference: 'Sahih al-Bukhari, Ibn Majah 335',
    virtue: 'Whoever says this is forgiven; if they make dua it is answered, and if they perform ablution and pray, their prayer is accepted.',
    suggestedCount: 1,
    chapterNumber: 1,
    hisnulNumber: '2',
    translations: {
      en: { title: '2. Oneness of Allah upon Waking', timing: 'Upon waking', translation: 'None has the right to be worshipped except Allah alone, without partner...' },
      bn: { title: '২. ঘুম থেকে জেগে এই দোয়া পাঠ করলে ক্ষমা ও দোয়া কবুল', timing: 'ঘুম থেকে জেগে', translation: 'একমাত্র আল্লাহ ছাড়া কোনো হক ইলাহ নেই, তাঁর কোনো শরীক নেই; রাজত্ব তাঁরই, প্রশংসাও তাঁরই...' }
    }
  },
  {
    id: 'dua_1_3',
    title: '3. Awakening: Safety of Body and Permission for Zikr',
    category: 'sleep_wake',
    timing: 'Upon waking up',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي، وَرَدَّ عَلَيَّ رُوحِي، وَأَذِنَ لِي بِذِكْرِهِ',
    transliteration: 'Al-ḥamdu lillāhil-ladhī ‘āfānī fī jasadī, wa radda ‘alayya rūḥī, wa adhina lī bidhikrih.',
    translation: 'Praise is to Allah Who has restored to me my health and my soul and has permitted me to remember Him.',
    reference: 'Tirmidhi 3401',
    virtue: 'Expressing gratitude for health, soul, and ability to remember Allah.',
    suggestedCount: 1,
    chapterNumber: 1,
    hisnulNumber: '3',
    translations: {
      en: { title: '3. Restoration of Health and Soul', timing: 'Upon waking', translation: 'Praise is to Allah Who has restored to me my health and my soul...' },
      bn: { title: '৩. দেহ ও রুহ ফিরিয়ে দেওয়ার শুকরিয়া', timing: 'ঘুম থেকে জেগে', translation: 'সকল হামদ-প্রশংসা আল্লাহর জন্য, যিনি আমার দেহকে নিরাপদ করেছেন, আমার রূহকে আমার নিকট ফেরত দিয়েছেন এবং আমাকে তাঁর জিকির করার অনুমতি (সুযোগ) দিয়েছেন।' }
    }
  },
  {
    id: 'dua_1_4',
    title: '4. Awakening: Reflection on Creation (Ali Imran 190-200)',
    category: 'sleep_wake',
    timing: 'When waking up at night and reciting final verses of Surah Ali Imran',
    arabic: 'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِأُولِي الْأَلْبَابِ ...',
    transliteration: 'Inna fī khalqis-samāwāti wal-arḍi wakhtilāfil-layli wan-nahāri la-āyātin li-ulil-albāb...',
    translation: 'Indeed, in the creation of the heavens and the earth and the alternation of the night and the day are signs for those of understanding...',
    reference: 'Surah Ali Imran (3:190-200), Bukhari 4569',
    virtue: 'Recitation of these verses upon waking at night.',
    suggestedCount: 1,
    chapterNumber: 1,
    hisnulNumber: '4',
    translations: {
      en: { title: '4. Reflection on Creation (Ali Imran 190-200)', timing: 'Night waking', translation: 'Indeed, in the creation of the heavens and the earth...' },
      bn: { title: '৪. রাতের শেষভাগে আয়াত তিলাওয়াত (আলে ইমরান ১৯০-২০০)', timing: 'রাতের জেগে', translation: 'নিশ্চয় আসমানসমূহ ও জমিনের সৃষ্টিতে, রাত ও দিনের পরিবর্তনে নিদর্শনাবলী রয়েছে বোধশক্তি সম্পন্ন লোকদের জন্য...' }
    }
  },

  // --- Chapter 2: Putting on Clothes ---
  {
    id: 'dua_2_1_ch',
    title: '5. Supplication When Putting on a Garment',
    category: 'daily_living',
    timing: 'When wearing new or any clothes',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا (الثَّوْبَ) وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    transliteration: 'Al-ḥamdu lillāhil-ladhī kasānī hādhal-thawba wa razaqanīhi min ghayri ḥawlin minnī wa lā quwwah.',
    translation: 'Praise is to Allah Who has clothed me with this (garment) and provided it for me without any power or might on my part.',
    reference: 'Abu Dawud 4023, Tirmidhi 3458, Ibn Majah 3285',
    virtue: 'Forgiveness of past sins when wearing clothes with this dua.',
    suggestedCount: 1,
    chapterNumber: 2,
    hisnulNumber: '5',
    translations: {
      en: { title: '5. Putting on a Garment', timing: 'When dressing', translation: 'Praise is to Allah Who has clothed me with this garment...' },
      bn: { title: '৫. কাপড় পরিধানের দোয়া', timing: 'পোশাক পরার সময়', translation: 'সকল হামদ-প্রশংসা আল্লাহর জন্য, যিনি আমাকে এ (কাপড়)টি পরিধান করিয়েছেন এবং আমার শক্তি-সামর্থ্য ছাড়াই আমাকে এটা দান করেছেন।' }
    }
  },

  // --- Chapter 3: Putting on New Clothes ---
  {
    id: 'dua_3_1_ch',
    title: '6. Supplication When Putting on New Clothes',
    category: 'daily_living',
    timing: 'When wearing a brand new garment',
    arabic: 'اللَّهُمَّ لَكَ الْحَمْدُ أَنْتَ كَسَوْتَنِيهِ، أَسْأَلُكَ مِنْ خَيْرِهِ وَخَيْرِ مَا صُنِعَ لَهُ، وَأَعُوذُ بِكَ مِنْ شَرِّهِ وَشَرِّ مَا صُنِعَ لَهُ',
    transliteration: 'Allāhumma lakal-ḥamdu anta kasawtanīh, as-aluka min khayrihi wa khayri mā ṣuni‘a lah, wa a‘ūdhu bika min sharrihi wa sharri mā ṣuni‘a lah.',
    translation: 'O Allah, to You is all praise. You have clothed me with it. I ask You for its good and the good of what it was made for, and I seek Your refuge from its evil and the evil of what it was made for.',
    reference: 'Abu Dawud 4020, Tirmidhi 1767',
    virtue: 'Seeking goodness and protection from evil of new clothes.',
    suggestedCount: 1,
    chapterNumber: 3,
    hisnulNumber: '6',
    translations: {
      en: { title: '6. Putting on New Clothes', timing: 'New clothes', translation: 'O Allah, to You is all praise. You have clothed me with it...' },
      bn: { title: '৬. নতুন কাপড় পরিধানের দোয়া', timing: 'নতুন পোশাক পরার সময়', translation: 'হে আল্লাহ! আপনারই জন্য সকল হামদ-প্রশংসা। আপনিই এটি আমাকে পরেছেন। আমি আপনার কাছে এর কল্যাণ ও এটি যে উদ্দেশ্যে তৈরি হয়েছে তার কল্যাণ প্রার্থনা করি...' }
    }
  },

  // --- Chapter 4: Dua for Someone Wearing New Clothes ---
  {
    id: 'dua_4_1',
    title: '7. Dua for Someone Who Wears New Clothes (1)',
    category: 'daily_living',
    timing: 'When seeing someone in new clothes',
    arabic: 'تُبْلِي وَيُخْلِفُ اللَّهُ تَعَالَى',
    transliteration: 'Tublī wa yukhlifullāhu ta‘ālā.',
    translation: 'May you wear it out and may Allah the Most High replace it with another.',
    reference: 'Abu Dawud 4020',
    virtue: 'Good wishes for fellow Muslims upon wearing new attire.',
    suggestedCount: 1,
    chapterNumber: 4,
    hisnulNumber: '7',
    translations: {
      en: { title: '7. Dua for Someone Wearing New Clothes', timing: 'Greeting new clothes', translation: 'May you wear it out and may Allah replace it.' },
      bn: { title: '৭.১ অপরকে নতুন কাপড় পরিধান করতে দেখলে দোয়া',timing: 'নতুন পোশাকে দেখলে', translation: 'তুমি পুরাতন করে ফেলবে, আর মহান আল্লাহ এর স্থলাভিষিক্ত করবেন।' }
    }
  },
  {
    id: 'dua_4_2',
    title: '8. Dua for Someone Who Wears New Clothes (2)',
    category: 'daily_living',
    timing: 'Greeting new clothes',
    arabic: 'اِلْبَسْ جَدِيدًا، وَعِشْ حَمِيدًا، وَمُتْ شَهِيدًا',
    transliteration: 'Ilbas jadīdan, wa ‘ish ḥamīdan, wa mut shahīdā.',
    translation: 'Wear new clothes, live a praiseworthy life, and die a martyr.',
    reference: 'Ibn Majah 3558',
    virtue: 'Prophetic blessing for a person wearing a new garment.',
    suggestedCount: 1,
    chapterNumber: 4,
    hisnulNumber: '8',
    translations: {
      en: { title: '8. Blessing for New Clothes (2)', timing: 'Greeting new clothes', translation: 'Wear new clothes, live a praiseworthy life, and die a martyr.' },
      bn: { title: '৮.২ নতুন কাপড় পরিধানের জন্য বরকতের দোয়া', timing: 'নতুন পোশাকে দেখলে', translation: 'নতুন কাপড় পরিধান কর, প্রশংসিতরূপে দিনাতিপাত কর এবং শহীদ হয়ে মারা যাও।' }
    }
  },

  // --- Chapter 5: Undressing ---
  {
    id: 'dua_5_1',
    title: '9. What to Say When Undressing',
    category: 'daily_living',
    timing: 'When removing clothes',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillāh.',
    translation: 'In the name of Allah.',
    reference: 'Tirmidhi 606',
    virtue: 'Forms a barrier between Jinn eyes and the private parts of a person.',
    suggestedCount: 1,
    chapterNumber: 5,
    hisnulNumber: '9',
    translations: {
      en: { title: '9. What to Say When Undressing', timing: 'Removing clothes', translation: 'In the name of Allah.' },
      bn: { title: '৯. কাপড় খুলে রাখার সময় কী বলবে', timing: 'পোশাক খোলার সময়', translation: 'আল্লাহর নামে (খুলে রাখলাম)।' }
    }
  },

  // --- Chapter 6: Entering Restroom ---
  {
    id: 'dua_6_1',
    title: '10. Supplication When Entering the Restroom',
    category: 'purification',
    timing: 'Before entering the toilet',
    arabic: 'بِسْمِ اللَّهِ. اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    transliteration: 'Bismillāh. Allāhumma innī a‘ūdhu bika minal-khubuthi wal-khabā-ith.',
    translation: 'In the name of Allah. O Allah, I seek refuge in You from male and female devils (or evil and evil spirits).',
    reference: 'Sahih al-Bukhari 142, Muslim 375',
    virtue: 'Protection from jinn and satans in unclean areas.',
    suggestedCount: 1,
    chapterNumber: 6,
    hisnulNumber: '10',
    translations: {
      en: { title: '10. Entering the Restroom', timing: 'Entering toilet', translation: 'In the name of Allah. O Allah, I seek refuge in You from male and female devils.' },
      bn: { title: '১০. পায়খানায় প্রবেশের দোয়া', timing: 'টয়লেটে যাওয়ার পূর্বে', translation: '[আল্লাহর নামে।] হে আল্লাহ! আমি আপনার নিকট অপবিত্র নর জিন ও নারী জিন থেকে আশ্রয় চাই।' }
    }
  },

  // --- Chapter 7: Leaving Restroom ---
  {
    id: 'dua_7_1',
    title: '11. Supplication When Leaving the Restroom',
    category: 'purification',
    timing: 'When stepping out of the toilet',
    arabic: 'غُفْرَانَكَ',
    transliteration: 'Ghufrānaka.',
    translation: 'I ask You (Allah) for forgiveness.',
    reference: 'Abu Dawud, Tirmidhi, Ibn Majah 300',
    virtue: 'Seeking Allahs forgiveness upon completing the relief.',
    suggestedCount: 1,
    chapterNumber: 7,
    hisnulNumber: '11',
    translations: {
      en: { title: '11. Leaving the Restroom', timing: 'Leaving toilet', translation: 'I ask You for forgiveness.' },
      bn: { title: '১১. পায়খানা থেকে বের হওয়ার দোয়া', timing: 'টয়লেট থেকে বের হয়ে', translation: 'আমি আপনার কাছে ক্ষমা প্রার্থী।' }
    }
  },

  // --- Chapter 8: Before Wudu ---
  {
    id: 'dua_8_1',
    title: '12. Supplication Before Starting Wudu',
    category: 'purification',
    timing: 'Before performing ablution',
    arabic: 'بِسْمِ اللَّهِ',
    transliteration: 'Bismillāh.',
    translation: 'In the name of Allah.',
    reference: 'Abu Dawud 101, Ibn Majah 397',
    virtue: 'Starting purification with the name of Allah.',
    suggestedCount: 1,
    chapterNumber: 8,
    hisnulNumber: '12',
    translations: {
      en: { title: '12. Before Wudu', timing: 'Starting ablution', translation: 'In the name of Allah.' },
      bn: { title: '১২. অজুর পূর্বে জিকির', timing: 'অজু শুরুর আগে', translation: 'আল্লাহর নামে।' }
    }
  },

  // --- Chapter 9: After Wudu ---
  {
    id: 'dua_9_1',
    title: '13. Supplication After Completing Wudu (1)',
    category: 'purification',
    timing: 'Upon finishing ablution',
    arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliteration: 'Ashhadu an lā ilāha illallāhu waḥdahu lā sharīka lah, wa ashhadu anna muḥammadan ‘abduhu wa rasūluh.',
    translation: 'I bear witness that none has the right to be worshipped except Allah alone, without partner, and I bear witness that Muhammad is His slave and Messenger.',
    reference: 'Muslim 234',
    virtue: 'The eight gates of Paradise are opened for him to enter through whichever he pleases.',
    suggestedCount: 1,
    chapterNumber: 9,
    hisnulNumber: '13',
    translations: {
      en: { title: '13. After Wudu (1)', timing: 'After ablution', translation: 'I bear witness that none has the right to be worshipped except Allah alone...' },
      bn: { title: '১৩.১ অযু শেষ করার পর প্রথম দোয়া', timing: 'অজুর শেষে', translation: 'আমি সাক্ষ্য দিচ্ছি যে, একমাত্র আল্লাহ ছাড়া কোনো হক ইলাহ নেই, তাঁর কোনো শরীক নেই। আমি আরও সাক্ষ্য দিচ্ছি যে, মুহাম্মদ তাঁর বান্দা ও রাসূল।' }
    }
  },
  {
    id: 'dua_9_2',
    title: '14. Supplication After Completing Wudu (2)',
    category: 'purification',
    timing: 'After ablution',
    arabic: 'اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
    transliteration: 'Allāhummaj‘alnī minat-tawwābīna waj‘alnī minal-mutaṭahhirīn.',
    translation: 'O Allah, make me of those who return to You often in repentance and make me of those who cleanse themselves.',
    reference: 'Tirmidhi 55',
    virtue: 'Inclusion among those who repent and purify themselves.',
    suggestedCount: 1,
    chapterNumber: 9,
    hisnulNumber: '14',
    translations: {
      en: { title: '14. After Wudu (2)', timing: 'After ablution', translation: 'O Allah, make me of those who repent and cleanse themselves.' },
      bn: { title: '১৩.২ অযু শেষের দ্বিতীয় দোয়া', timing: 'অজুর শেষে', translation: 'হে আল্লাহ! আপনি আমাকে তওবাকারীদের অন্তর্ভুক্ত করুন এবং পবিত্রতা অর্জনকারীদেরও অন্তর্ভুক্ত করুন।' }
    }
  },
  {
    id: 'dua_9_3',
    title: '15. Supplication After Completing Wudu (3)',
    category: 'purification',
    timing: 'After ablution',
    arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ',
    transliteration: 'Subḥānakallāhumma wa biḥamdik, ashhadu an lā ilāha illā anta, astaghfiruka wa atūbu ilayk.',
    translation: 'Glory is to You, O Allah, and with Your praise. I bear witness that none has the right to be worshipped except You. I seek Your forgiveness and repent to You.',
    reference: 'An-Nasa\'i, Amal al-Yawm wal-Layla, Sahih Al-Albani',
    virtue: 'Sealed with praise and forgiveness.',
    suggestedCount: 1,
    chapterNumber: 9,
    hisnulNumber: '15',
    translations: {
      en: { title: '15. After Wudu (3)', timing: 'After ablution', translation: 'Glory is to You, O Allah, and with Your praise...' },
      bn: { title: '১৩.৩ অযু শেষের তৃতীয় দোয়া', timing: 'অজুর শেষে', translation: 'হে আল্লাহ! আপনার প্রশংসাসসহ পবিত্রতা ও মহিমা ঘোষণা করছি। আমি সাক্ষ্য দিই যে, আপনি ছাড়া কোনো হক ইলাহ নেই, আমি আপনার কাছে ক্ষমা প্রার্থনা করছি এবং আপনার নিকটে তওবা করছি।' }
    }
  },

  // --- Chapter 10: Leaving Home ---
  {
    id: 'dua_10_1',
    title: '16. Supplication When Leaving Home (1)',
    category: 'travel',
    timing: 'When stepping out of the house',
    arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: 'Bismillāh, tawakkaltu ‘alallāh, wa lā ḥawla wa lā quwwata illā billāh.',
    translation: 'In the name of Allah, I have placed my trust in Allah; there is no might nor power except with Allah.',
    reference: 'Abu Dawud 5095, Tirmidhi 3426',
    virtue: 'It is said to him: "You are guided, defended and protected," and Satan turns away from him.',
    suggestedCount: 1,
    chapterNumber: 10,
    hisnulNumber: '16',
    translations: {
      en: { title: '16. Leaving Home (1)', timing: 'Stepping out', translation: 'In the name of Allah, I have placed my trust in Allah...' },
      bn: { title: '১০.১ বাড়ি থেকে বের হওয়ার দোয়া', timing: 'ঘর থেকে বের হওয়ার সময়', translation: 'আল্লাহর নামে (বের হচ্ছি)। আল্লাহর ওপর ভরসা করলাম। আর আল্লাহর সাহায্য ছাড়া কোনো উপায় এবং শক্তি কারো নেই।' }
    }
  },
  {
    id: 'dua_10_2',
    title: '17. Supplication When Leaving Home (2)',
    category: 'travel',
    timing: 'When leaving home',
    arabic: 'اللَّهُمَّ إِنِّى أَعُوذُ بِكَ أَنْ أَضِلَّ أَوْ أُضَلَّ، أَوْ أَزِلَّ أَوْ أُزَلَّ، أَوْ أَظْلِمَ أَوْ أُظْلَمَ، أَوْ أَجْهَلَ أَوْ يُجْهَلَ عَلَيَّ',
    transliteration: 'Allāhumma innī a‘ūdhu bika an aḍilla aw uḍall, aw azilla aw uzall, aw aẓlima aw uẓlam, aw ajhala aw yujhala ‘alayy.',
    translation: 'O Allah, I seek refuge in You lest I stray or be led astray, lest I slip or be tripped, lest I oppress or be oppressed, lest I behave foolishly or be treated foolishly.',
    reference: 'Sunan Abu Dawud 5094, Tirmidhi 3427',
    virtue: 'Divine protection against wrongdoing and straying.',
    suggestedCount: 1,
    chapterNumber: 10,
    hisnulNumber: '17',
    translations: {
      en: { title: '17. Leaving Home (2)', timing: 'Stepping out', translation: 'O Allah, I seek refuge in You lest I stray or be led astray...' },
      bn: { title: '১০.২ বাড়ি থেকে বের হওয়ার দ্বিতীয় দোয়া', timing: 'ঘর থেকে বের হওয়ার সময়', translation: 'হে আল্লাহ! আমি আপনার নিকট আশ্রয় চাই যেন নিজেকে বা অন্যকে পথভ্রষ্ট না করি, অথবা অন্যের দ্বারা পথভ্রষ্ট না হই...' }
    }
  },

  // --- Chapter 11: Entering Home ---
  {
    id: 'dua_11_1',
    title: '18. Supplication When Entering Home',
    category: 'daily_living',
    timing: 'When entering the house',
    arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا',
    transliteration: 'Bismillāhi walajnā, wa bismillāhi kharajnā, wa ‘alā rabbinā tawakkalnā.',
    translation: 'In the name of Allah we enter, and in the name of Allah we leave, and upon our Lord we place our trust. (Then greet family).',
    reference: 'Abu Dawud 5096, Muslim 2018',
    virtue: 'Satan tells his companions: "You have no place to stay and no dinner here."',
    suggestedCount: 1,
    chapterNumber: 11,
    hisnulNumber: '18',
    translations: {
      en: { title: '18. Entering Home', timing: 'Entering house', translation: 'In the name of Allah we enter, and in the name of Allah we leave...' },
      bn: { title: '১১. ঘরে প্রবেশের সময় দোয়া', timing: 'বাসায় প্রবেশের সময়', translation: 'আল্লাহর নামেই আমরা প্রবেশ করলাম, আল্লাহর নামেই আমরা বের হলাম এবং আমাদের রব আল্লাহর ওপরই আমরা ভরসা করলাম।' }
    }
  },

  // --- Chapter 12: Going to Mosque ---
  {
    id: 'dua_12_1',
    title: '19. Supplication While Going to the Mosque',
    category: 'mosque',
    timing: 'When walking towards the masjid',
    arabic: 'اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَفِي سَمْعِي نُورًا، وَفِي بَصَرِي نُورًا...',
    transliteration: 'Allāhummaj‘al fī qalbī nūrā, wa fī lisānī nūrā, wa fī sam‘ī nūrā, wa fī baṣarī nūrā...',
    translation: 'O Allah, place light in my heart, and light in my tongue, and light in my hearing, and light in my sight...',
    reference: 'Sahih al-Bukhari 6316, Muslim 763',
    virtue: 'Granting light throughout one\'s physical body and soul.',
    suggestedCount: 1,
    chapterNumber: 12,
    hisnulNumber: '19',
    translations: {
      en: { title: '19. Going to the Mosque', timing: 'Walking to masjid', translation: 'O Allah, place light in my heart, and light in my tongue...' },
      bn: { title: '১২. মসজিদে যাওয়ার সময়ে পড়ার দোয়া', timing: 'মসজিদে যাওয়ার সময়', translation: 'হে আল্লাহ! আপনি আমার অন্তরে নূর (আলো) দান করুন, আমার জবানে নূর দান করুন, আমার শ্রবণশক্তিতে নূর দান করুন...' }
    }
  },

  // --- Chapter 13: Entering Mosque ---
  {
    id: 'dua_13_1',
    title: '20. Supplication When Entering the Mosque',
    category: 'mosque',
    timing: 'Entering masjid with right foot',
    arabic: 'أَعُوذُ بِاللَّهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ. بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliteration: 'A‘ūdhu billāhil-‘aẓīm, wa biwajhihil-karīm, wa sulṭānihil-qadīm, minash-shayṭānir-rajīm. Bismillāhi was-salātu was-salāmu ‘alā rasūlillāh, allāhummaftaḥ lī abwāba raḥmatik.',
    translation: 'I seek refuge in Allah the Almighty, by His Noble Face, and by His eternal power, from the accursed Satan. In the name of Allah, and prayers and peace be upon the Messenger of Allah. O Allah, open for me the doors of Your mercy.',
    reference: 'Abu Dawud 466, Muslim 713',
    virtue: 'Protection from Satan and opening of mercy.',
    suggestedCount: 1,
    chapterNumber: 13,
    hisnulNumber: '20',
    translations: {
      en: { title: '20. Entering the Mosque', timing: 'Entering masjid', translation: 'I seek refuge in Allah the Almighty, by His Noble Face... O Allah, open for me the doors of Your mercy.' },
      bn: { title: '১৩. মসজিদে প্রবেশের দোয়া', timing: 'ডান পা দিয়ে মসজিদে ঢুকে', translation: 'আমি মহান আল্লাহর কাছে তাঁর সম্মানিত চেহারা ও প্রাচীন ক্ষমতার উসীলায় বিতাড়িত শয়তান থেকে আশ্রয় প্রার্থনা করছি। হে আল্লাহ! আপনি আমার জন্য আপনার রহমতের দরজাসমূহ খুলে দিন।' }
    }
  },

  // --- Chapter 14: Leaving Mosque ---
  {
    id: 'dua_14_1',
    title: '21. Supplication When Leaving the Mosque',
    category: 'mosque',
    timing: 'Leaving masjid with left foot',
    arabic: 'بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ، اللَّهُمَّ اعْصِمْنِي مِنَ الشَّيْطَانِ الرَّجِيمِ',
    transliteration: 'Bismillāhi was-salātu was-salāmu ‘alā rasūlillāh, allāhumma innī as-aluka min faḍlik, allāhumma‘-ṣimnī minash-shayṭānir-rajīm.',
    translation: 'In the name of Allah, and prayers and peace be upon the Messenger of Allah. O Allah, I ask You from Your bounty. O Allah, protect me from the accursed Satan.',
    reference: 'Ibn Majah 129, Muslim',
    virtue: 'Seeking bounty and protection upon leaving.',
    suggestedCount: 1,
    chapterNumber: 14,
    hisnulNumber: '21',
    translations: {
      en: { title: '21. Leaving the Mosque', timing: 'Leaving masjid', translation: 'In the name of Allah, prayers and peace be upon the Messenger of Allah. O Allah, I ask You from Your bounty...' },
      bn: { title: '১৪. মসজিদ থেকে বের হওয়ার দোয়া', timing: 'বাম পা দিয়ে বের হয়ে', translation: 'আল্লাহর নামে (বের হচ্ছি)। আল্লাহর রাসুলের ওপর শান্তি বর্ষিত হোক। হে আল্লাহ! আপনি আমার গুনাসমূহ মাফ করে দিন এবং আমার জন্য আপনার দয়ার দরজাগুলা খুলে দিন...' }
    }
  },

  // --- Chapter 15: Adhan ---
  {
    id: 'dua_15_1',
    title: '22. Supplications During the Adhan',
    category: 'mosque',
    timing: 'Repeating after Muadhin, sending Durood, and reading Waseelah',
    arabic: 'اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَبَعْثَهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ',
    transliteration: 'Allāhumma rabba hādhihid-da‘watit-tāmmah, was-salātil-qā-imah, āti muḥammadal-wasīlata wal-faḍīlah, wab‘athhu maqāmam maḥmūdal-ladhī wa‘adtah.',
    translation: 'O Allah, Lord of this perfect call and established prayer, grant Muhammad the intercession and superiority, and raise him to a praiseworthy station that You have promised him.',
    reference: 'Sahih al-Bukhari 614, Muslim 384',
    virtue: 'Intercession of the Prophet (PBUH) on the Day of Judgment is guaranteed for whoever recites this.',
    suggestedCount: 1,
    chapterNumber: 15,
    hisnulNumber: '22-26',
    translations: {
      en: { title: '22. Supplications During the Adhan', timing: 'Hearing Adhan', translation: 'O Allah, Lord of this perfect call and established prayer, grant Muhammad the intercession...' },
      bn: { title: '১৫. আজানের জবাব ও দোয়া (ওয়াসীলা)', timing: 'আজানের পর', translation: 'হে আল্লাহ! এই পরিপূর্ণ আহ্বান এবং প্রতিষ্ঠিত সালাতের রব্ব! মুহাম্মদ সাল্লাল্লাহু আলাইহি ওয়াসাল্লামকে উসীলা তথা জান্নাতের একটি স্তর এবং ফযীলত দান করুন...' }
    }
  },

  // --- Chapter 16: Opening Supplication of Salat (Sana) ---
  {
    id: 'dua_16_1',
    title: '23. Opening Supplication of Salat (Sana 1)',
    category: 'salat',
    timing: 'Beginning of prayer after Takbir',
    arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، وَتَبَارَكَ اسْمُكَ، وَتَعَالَى جَدُّكَ، وَلَا إِلَهَ غَيْرُكَ',
    transliteration: 'Subḥānakallāhumma wa biḥamdik, wa tabārakasmuk, wa ta‘ālā jadduk, wa lā ilāha ghayruk.',
    translation: 'Glory is to You, O Allah, and with Your praise. Blessed is Your name, exalted is Your majesty, and there is no deity other than You.',
    reference: 'Muslim 399, Abu Dawud 775',
    virtue: 'Glorification of Allah at the start of prayer.',
    suggestedCount: 1,
    chapterNumber: 16,
    hisnulNumber: '27-32',
    translations: {
      en: { title: '23. Opening Supplication of Salat (Sana)', timing: 'Start of prayer', translation: 'Glory is to You, O Allah, and with Your praise. Blessed is Your name...' },
      bn: { title: '১৬.১ সালাতের শুরুতে সানা', timing: 'নামাজ শুরুর তাকবীরের পর', translation: 'হে আল্লাহ! আপনার প্রশংসাসসহ পবিত্রতা ও মহিমা ঘোষণা করছি, আপনার নাম বড়ই বরকতময়, আপনার প্রতিপত্তি অতি উচ্চ। আর আপনি ব্যতীত অন্য কোনো হক ইলাহ নেই।' }
    }
  },

  // --- Chapter 17: Ruku ---
  {
    id: 'dua_17_1',
    title: '24. Supplication in Ruku (Bowing)',
    category: 'salat',
    timing: 'When bowing in prayer',
    arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
    transliteration: 'Subḥāna rabbiyal-‘aẓīm.',
    translation: 'Glory is to my Lord, the Greatest.',
    reference: 'Muslim 771, Abu Dawud 870',
    virtue: 'Recited 3 times or more during bowing.',
    suggestedCount: 3,
    chapterNumber: 17,
    hisnulNumber: '33',
    translations: {
      en: { title: '24. Supplication in Ruku', timing: 'Bowing', translation: 'Glory is to my Lord, the Greatest.' },
      bn: { title: '১৭. রুকু‘র দোয়া', timing: 'রুকুতে থাকাবস্থায় অন্তত ৩ বার', translation: 'আমার মহান রব্বের পবিত্রতা ও মহিমা ঘোষণা করছি।' }
    }
  },

  // --- Chapter 18: Rising from Ruku ---
  {
    id: 'dua_18_1',
    title: '25. Supplication When Rising from Ruku',
    category: 'salat',
    timing: 'Standing up from Ruku',
    arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ. رَبَّنَا وَلَكَ الْحَمْدُ، حَمْداً كَثِيرًا طَيِّباً مُبَارَكاً فِيهِ',
    transliteration: 'Sami‘allāhu liman ḥamidah. Rabbanā wa lakal-ḥamd, ḥamdan kathīran ṭayyiban mubārakan fīh.',
    translation: 'Allah hears whoever praises Him. Our Lord, to You belongs all praise, an abundant, beautiful, and blessed praise.',
    reference: 'Bukhari 796',
    virtue: 'Angels compete to record this praise.',
    suggestedCount: 1,
    chapterNumber: 18,
    hisnulNumber: '38-40',
    translations: {
      en: { title: '25. Rising from Ruku', timing: 'Standing up', translation: 'Allah hears whoever praises Him. Our Lord, to You belongs all praise...' },
      bn: { title: '১৮. রুকু থেকে ওঠার দোয়া', timing: 'রুকু থেকে সোজা হয়ে দাঁড়ানোর সময়', translation: 'আল্লাহ তাঁর প্রশংসা শুনুন। হে আমাদের রব্ব! আর আপনার জন্যই সমস্ত প্রশংসা; অমঢল, পবিত্র ও বরকত-রয়েছে-এমন প্রশংসা।' }
    }
  },

  // --- Chapter 19: Sujood ---
  {
    id: 'dua_19_1',
    title: '26. Supplication in Sujood (Prostration)',
    category: 'salat',
    timing: 'When prostrating in prayer',
    arabic: 'سُبْحَانَ رَبِّيَ الْأَعْلَى',
    transliteration: 'Subḥāna rabbiyal-a‘lā.',
    translation: 'Glory is to my Lord, the Most High.',
    reference: 'Muslim 771, Abu Dawud 870',
    virtue: 'Recited 3 times or more during prostration.',
    suggestedCount: 3,
    chapterNumber: 19,
    hisnulNumber: '41',
    translations: {
      en: { title: '26. Supplication in Sujood', timing: 'Prostration', translation: 'Glory is to my Lord, the Most High.' },
      bn: { title: '১৯. সিজদার দোয়া', timing: 'সিজদায় থাকাবস্থায় অন্তত ৩ বার', translation: 'আমার রব্বের পবিত্রতা ও মহিমা বর্ণনা করছি, যিনি সবার উপরে।' }
    }
  },

  // --- Chapter 20: Between Two Sujoods ---
  {
    id: 'dua_20_1',
    title: '27. Supplication Between Two Prostrations',
    category: 'salat',
    timing: 'Sitting between prostrations',
    arabic: 'رَبِّ اغْفِرْ لِي، رَبِّ اغْفِرْ لِي',
    transliteration: 'Rabbighfir lī, rabbighfir lī.',
    translation: 'My Lord, forgive me, my Lord, forgive me.',
    reference: 'Abu Dawud 874, Ibn Majah 897',
    virtue: 'Seeking forgiveness during the sitting posture.',
    suggestedCount: 2,
    chapterNumber: 20,
    hisnulNumber: '48',
    translations: {
      en: { title: '27. Between Two Prostrations', timing: 'Sitting between sujud', translation: 'My Lord, forgive me, my Lord, forgive me.' },
      bn: { title: '২০. দুই সিজদার মাঝের বৈঠক', timing: 'দুই সিজদার মাঝে বসে', translation: 'হে আমার রব! আপনি আমাকে ক্ষমা করুন। হে আমার রব! আপনি আমাকে ক্ষমা করুন।' }
    }
  },

  // --- Chapter 22: Tashahhud ---
  {
    id: 'dua_22_1',
    title: '28. Tashahhud (Attahiyyat)',
    category: 'salat',
    timing: 'Sitting posture in prayer',
    arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ...',
    transliteration: 'Attahiyyātu lillāhi was-salawātu wat-ṭayyibāt, assalāmu ‘alayka ayyuhan-nabiyyu wa raḥmatullāhi wa barakātuh...',
    translation: 'All greetings, prayers and pure words are for Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings...',
    reference: 'Bukhari 831, Muslim 402',
    virtue: 'Core declaration of faith during prayer sitting.',
    suggestedCount: 1,
    chapterNumber: 22,
    hisnulNumber: '52',
    translations: {
      en: { title: '28. Tashahhud', timing: 'Sitting in prayer', translation: 'All greetings, prayers and pure words are for Allah...' },
      bn: { title: '২২. তাশাহহুদ (আত্তাহিয়্যাতু)', timing: 'নামাজের বৈঠকে', translation: 'যাবতীয় অভিবাদন আল্লাহর জন্য, অনুরূপভাবে সকল সালাত ও পবিত্র কাজও। হে নবী! আপনার ওপর বর্ষিত হোক সালাম...' }
    }
  },

  // --- Chapter 23: Durood Ibrahim ---
  {
    id: 'dua_23_1',
    title: '29. Durood Ibrahim (Blessings upon the Prophet)',
    category: 'salat',
    timing: 'After Tashahhud in prayer',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ...',
    transliteration: 'Allāhumma ṣalli ‘alā muḥammadin wa ‘alā āli muḥammad, kamā ṣallayta ‘alā ibrāhīma wa ‘alā āli ibrāhīm...',
    translation: 'O Allah, send prayers upon Muhammad and upon the family of Muhammad, as You sent prayers upon Ibrahim and upon the family of Ibrahim...',
    reference: 'Bukhari 3370, Muslim 406',
    virtue: 'Enormous rewards and blessings upon the Prophet and family.',
    suggestedCount: 1,
    chapterNumber: 23,
    hisnulNumber: '53',
    translations: {
      en: { title: '29. Durood Ibrahim', timing: 'After Tashahhud', translation: 'O Allah, send prayers upon Muhammad and upon the family of Muhammad...' },
      bn: { title: '২৩. দরূদে ইব্রাহিম', timing: 'তাশাহহুদের পর', translation: 'হে আল্লাহ! আপনি মুহাম্মদকে সম্মানের সাথে স্মরণ করুন এবং আপনার পরিবার-পরিজনকে, যেমন আপনি সম্মানের সাথে স্মরণ করেছেন ইব্রাহিমকে...' }
    }
  },

  // --- Chapter 24: Dua Before Salam ---
  {
    id: 'dua_24_1',
    title: '30. Protection from Four Trials Before Salam',
    category: 'salat',
    timing: 'Final sitting before concluding prayer with salam',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ، وَمِنْ عَذَابِ جَهَنَّمَ، وَمِنْ فِتْنَةِ الْمَحْيَا وَالْمَمَاتِ، وَمِنْ شَرِّ فِتْنَةِ الْمَسِيحِ الدَّجَّالِ',
    transliteration: 'Allāhumma innī a‘ūdhu bika min ‘adhābil-qabr, wa min ‘adhābi jahannam, wa min fitnatil-maḥyā wal-mamāt, wa min sharri fitnatil-masīḥid-dajjāl.',
    translation: 'O Allah, I seek refuge in You from the punishment of the grave, from the punishment of Hellfire, from the trials of life and death, and from the evil of the trial of the Antichrist.',
    reference: 'Bukhari 1377, Muslim 588',
    virtue: 'Protection from grave punishment, Hell, trials, and Dajjal.',
    suggestedCount: 1,
    chapterNumber: 24,
    hisnulNumber: '55',
    translations: {
      en: { title: '30. Protection from Four Trials Before Salam', timing: 'Before final salam', translation: 'O Allah, I seek refuge in You from the punishment of the grave, Hellfire, trials of life and death, and Dajjal.' },
      bn: { title: '২৪. সালামের আগের শেষ দোয়া (চার ফিতনা থেকে মুক্তি)', timing: 'সালামের পূর্বে', translation: 'হে আল্লাহ! আমি আপনার কাছে আশ্রয় চাচ্ছি কবরের আজাব থেকে, জাহান্নামের আজাব থেকে, জীবন-মৃত্যুর ফিতনা থেকে এবং মসীহ দাজ্জালের ফিতনার অনিষ্টতা থেকে।' }
    }
  },

  // --- Chapter 25: Post-Salam Zikr ---
  {
    id: 'dua_25_1',
    title: '31. Supplications After Completing Prayer',
    category: 'salat',
    timing: 'Immediately after saying Salam',
    arabic: 'أَسْتَغْفِرُ اللَّهَ (ثلاثاً) اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالِكْرَامِ',
    transliteration: 'Astaghfirullāh (3x). Allāhumma antas-salāmu wa minkas-salām, tabārakta yā dhal-jalāli wal-ikrām.',
    translation: 'I ask Allah for forgiveness (3 times). O Allah, You are Peace and from You is peace. Blessed are You, O Owner of majesty and honor.',
    reference: 'Muslim 591',
    virtue: 'Prophetic tradition upon concluding prayer.',
    suggestedCount: 3,
    chapterNumber: 25,
    hisnulNumber: '66',
    translations: {
      en: { title: '31. Post-Salam Zikr', timing: 'After prayer', translation: 'I ask Allah for forgiveness. O Allah, You are Peace and from You is peace...' },
      bn: { title: '২৫.১ সালাম ফিরানোর পর ইস্তেগফার ও জিকির', timing: 'সালাম ফিরিয়ে', translation: 'আস্তাগফিরুল্লাহ (৩ বার)। হে আল্লাহ! আপনি শান্তিময়। আপনার নিকট থেকেই শান্তি বর্ষিত হয়। আপনি বরকতময়, হে মহিমাময় ও সম্মানের অধিকারী!' }
    }
  },

  // --- Chapter 27: Morning and Evening Adhkar ---
  {
    id: 'dua_27_1',
    title: '32. Morning and Evening: Ayat al-Kursi',
    category: 'morning_evening',
    timing: 'Every morning and evening',
    arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ...',
    transliteration: 'Allāhu lā ilāha illā huwal-Ḥayyul-Qayyūm...',
    translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer of all existence...',
    reference: 'Al-Baqarah 2:255, Hakim 1/562',
    virtue: 'Protection from Jinn and devils until evening/morning.',
    suggestedCount: 1,
    chapterNumber: 27,
    hisnulNumber: '75',
    translations: {
      en: { title: '32. Morning & Evening: Ayat al-Kursi', timing: 'Morning & Evening', translation: 'Allah - there is no deity except Him, the Ever-Living, the Sustainer...' },
      bn: { title: '২৭.১ সকাল-সন্ধ্যার জিকির: আয়াতুল কুরসি', timing: 'সকাল ও সন্ধ্যায়', translation: 'আল্লাহ, তিনি ছাড়া কোনো সত্য ইলাহ নেই। তিনি চিরজীবী, সর্বসত্তার ধারক...' }
    }
  },
  {
    id: 'dua_27_2',
    title: '33. Morning and Evening: Sayyidul Istighfar',
    category: 'morning_evening',
    timing: 'Morning and Evening',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ...',
    transliteration: 'Allāhumma anta Rabbī lā ilāha illā anta, khalaqtanī wa anā ‘abduka...',
    translation: 'O Allah, You are my Lord, none has the right to be worshipped except You...',
    reference: 'Bukhari 6306',
    virtue: 'Guaranteed Paradise if one dies on that day/night with conviction.',
    suggestedCount: 1,
    chapterNumber: 27,
    hisnulNumber: '79',
    translations: {
      en: { title: '33. Morning & Evening: Sayyidul Istighfar', timing: 'Morning & Evening', translation: 'O Allah, You are my Lord, none has the right to be worshipped except You...' },
      bn: { title: '২৭.২ সাইয়্যিদুল ইস্তেগফার (সকাল-সন্ধ্যা)', timing: 'সকাল ও সন্ধ্যায়', translation: 'হে আল্লাহ! আপনি আমার রব, আপনি ছাড়া আর কোনো সত্য উপাস্য নেই...' }
    }
  },

  // --- Chapter 28: Sleep Adhkar ---
  {
    id: 'dua_28_1',
    title: '34. Bedtime: Cupping hands and reciting 3 Quls',
    category: 'sleep_wake',
    timing: 'Every night before sleeping',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ...',
    transliteration: 'Qul huwallāhu aḥad... qul a‘ūdhu bi rabbil-falaq... qul a‘ūdhu bi rabbin-nās.',
    translation: 'Reciting Surah Al-Ikhlas, Al-Falaq, and An-Nas, blowing into hands and wiping over the body.',
    reference: 'Bukhari 5017, Muslim 2192',
    virtue: 'Protection throughout the night by angels.',
    suggestedCount: 3,
    chapterNumber: 28,
    hisnulNumber: '99',
    translations: {
      en: { title: '34. Bedtime 3 Quls & Wiping Body', timing: 'Before sleep', translation: 'Reciting Surah Al-Ikhlas, Al-Falaq, An-Nas into cupped hands and wiping the body.' },
      bn: { title: '২৮.১ ঘুমানোর আগে ৩ কুল পড়ে শরীরে হাত বুলানো', timing: 'ঘুমানোর সময়', translation: 'দুই হাতের তালু একত্রে মিলিয়ে সুরা ইখলাস, ফালাক ও নাস পড়ে উভয় হাতে ফুঁ দিয়ে মাথা, মুখ ও শরীরের সামনের অংশে হাত বুলানো (৩ বার)।' }
    }
  },

  // --- Chapter 34: Anxiety & Sorrow ---
  {
    id: 'dua_34_1',
    title: '35. Dua for Anxiety, Sorrow and Distress',
    category: 'hardship',
    timing: 'When experiencing worry, grief or sadness',
    arabic: 'اللَّهُمَّ إِنِّي عَبْدُكَ، ابْنُ عَبْدِكَ، ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ...',
    transliteration: 'Allāhumma innī ‘abduka, ibnu ‘abdika, ibnu amatika, nāṣiyatī biyadika, māḍin fiyya ḥukmuka, ‘adlun fiyya qaḍā-uk...',
    translation: 'O Allah, I am Your slave, son of Your male slave, son of Your female slave. My forelock is in Your hand, Your command over me is executed and Your decree over me is just...',
    reference: 'Ahmad 3712, Sahih Al-Albani',
    virtue: 'Allah removes anxiety and replaces sorrow with joy.',
    suggestedCount: 1,
    chapterNumber: 34,
    hisnulNumber: '120',
    translations: {
      en: { title: '35. Dua for Anxiety and Sorrow', timing: 'When distressed', translation: 'O Allah, I am Your slave, son of Your male slave... Make the Quran the spring of my heart.' },
      bn: { title: '৩৫.১ দুঃখ ও দুশ্চিন্তার সময় পড়ার দোয়া', timing: 'দুশ্চিন্তা ও পেরেশানিতে', translation: 'হে আল্লাহ! আমি আপনার বান্দা, আপনারই এক বান্দার পুত্র এবং আপনার এক বাাঁদীর পুত্র। আমার কপাল আপনার হাতে, আমার ওপর আপনার নির্দেশ কার্যকর...' }
    }
  },
  {
    id: 'dua_34_2',
    title: '36. Dua for Removal of Hardship and Heavy Debt',
    category: 'hardship',
    timing: 'When overwhelmed with debt or immense hardship',
    arabic: 'اللَّهُمَّ إِنِّى أَعُوذُ بِكَ مِنَ الْهَمِّ وَالحَزَنِ، وَالعَجْزِ وَالكَسَلِ، وَالبُخْلِ وَالJُبْنِ، وَضَلَعِ Dَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    transliteration: 'Allāhumma innī a‘ūdhu bika minal-hammi wal-ḥazani, wal-‘ajzi wal-kasali, wal-bukhli wal-jubni, wa ḍala‘id-dayni wa ghalabatir-rijāl.',
    translation: 'O Allah, I seek refuge in You from grief and sadness, from weakness and laziness, from miserliness and cowardice, from being overcome by debt and overpowered by men.',
    reference: 'Bukhari 2893',
    virtue: 'Relief from crushing debts and emotional burden.',
    suggestedCount: 1,
    chapterNumber: 34,
    hisnulNumber: '121',
    translations: {
      en: { title: '36. Dua for Hardship and Debt', timing: 'Overwhelmed with debt', translation: 'O Allah, I seek refuge in You from grief, sadness, laziness, debt, and oppression.' },
      bn: { title: '৩৫.২ ঋণ ও দুশ্চিন্তা মুক্তির দোয়া', timing: 'ঋণে জর্জরিত হলে', translation: 'হে আল্লাহ! নিশ্চয় আমি আপনার আশ্রয় নিচ্ছি দুশ্চিন্তা ও দুঃখ থেকে, অপারগত ও অলসতা থেকে, কৃপণতা ও ভীরুতা থেকে, ঋণের ভার ও মানুষের দমন-পীড়ন থেকে।' }
    }
  },

  // --- Chapter 41: Debt Release ---
  {
    id: 'dua_41_1',
    title: '37. Supplication for Debt Release (Sufficient Halal)',
    category: 'hardship',
    timing: 'When seeking freedom from debt through lawful means',
    arabic: 'اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ، وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ',
    transliteration: 'Allāhummakfinī biḥalālika ‘an ḥarāmika, wa aghninī bifaḍlika ‘amman siwāk.',
    translation: 'O Allah, suffice me with what You have allowed instead of what You have forbidden, and make me independent of all others besides You by Your bounty.',
    reference: 'Tirmidhi 3563',
    virtue: 'Allah pays off debts even if they were like a mountain of gold.',
    suggestedCount: 1,
    chapterNumber: 41,
    hisnulNumber: '136',
    translations: {
      en: { title: '37. Supplication for Debt Release', timing: 'When paying off debt', translation: 'O Allah, suffice me with what You have allowed instead of what You have forbidden...' },
      bn: { title: '৩৭. ঋণ থেকে মুক্তির বিশেষ দোয়া', timing: 'ঋণ পরিশোধের নিয়তে', translation: 'হে আল্লাহ! আপনি আমাকে আপনার হালাল দ্বারা পরিতুষ্ট করে আপনার হারাম থেকে ফিরিয়ে রাখুন এবং আপনার অনুগ্রহ দ্বারা আপনি ছাড়া অন্য সকলের থেকে আমাকে অমুখাপেক্ষী করে দিন।' }
    }
  },

  // --- Chapter 68: Breaking Fast ---
  {
    id: 'dua_68_1',
    title: '38. Dua When Breaking Fast (Iftar)',
    category: 'ramadan',
    timing: 'At the time of breaking fast',
    arabic: 'ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ',
    transliteration: 'Dhahabas-ẓama-u, wabtallatil-‘urūqu, wa thabatal-ajru in shā-allāh.',
    translation: 'The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills.',
    reference: 'Abu Dawud 2357, Daru Qutni',
    virtue: 'Accepted supplication at the time of Iftar.',
    suggestedCount: 1,
    chapterNumber: 68,
    hisnulNumber: '176',
    translations: {
      en: { title: '38. Dua When Breaking Fast', timing: 'At Iftar', translation: 'The thirst has gone, the veins are moistened, and the reward is confirmed, if Allah wills.' },
      bn: { title: '৩৮. ইফতারের সময় পড়ার দোয়া', timing: 'ইফতার করার মুহূর্তে', translation: 'পিপাসা মিটেছে, শিরাগুলো সিক্ত হয়েছে এবং আল্লাহ চান তো সওয়াব সাব্যস্ত হয়েছে।' }
    }
  },

  // --- Chapter 77: Sneezing ---
  {
    id: 'dua_77_1',
    title: '39. Supplication Upon Sneezing and Replying',
    category: 'social_etiquette',
    timing: 'When someone sneezes',
    arabic: 'الْحَمْدُ لِلَّهِ ─── يَرْحَمُكَ اللَّهُ ─── يَهْدِيكُمُ اللَّهُ وَيُصْلِحُ بَالَكُمْ',
    transliteration: 'Al-ḥamdu lillāh ─── Yarḥamukallāh ─── Yahdīkumullāh wa yuṣliḥ bālakum.',
    translation: 'Praise be to Allah ─── May Allah have mercy upon you ─── May Allah guide you and set your affairs straight.',
    reference: 'Bukhari 5870, Tirmidhi 2741',
    virtue: 'Islamic etiquette of sneezing and well-wishing.',
    suggestedCount: 1,
    chapterNumber: 77,
    hisnulNumber: '188',
    translations: {
      en: { title: '39. Sneezing Etiquette', timing: 'When sneezing', translation: 'Praise be to Allah ─── May Allah have mercy on you ─── May Allah guide you.' },
      bn: { title: '৩৯. হাঁচি ও তার জবাবের দোয়া', timing: 'হাঁচি দিলে ও শুনলে', translation: 'হাঁচিদাতা বলবে আলহামদুলিল্লাহ, শ্রোতা বলবে ইয়ারহামুকাল্লাহ, এবং হাঁচিদাতা জবাবে বলবে ইয়াহদীকুমুল্লাহু ওয়া ইউসলিহু বালাকুম।' }
    }
  },

  // --- Chapter 95: Riding a Vehicle ---
  {
    id: 'dua_95_1',
    title: '40. Supplication for Traveling (Riding Vehicle)',
    category: 'travel',
    timing: 'When mounting a vehicle, car, plane or animal',
    arabic: 'بِسْمِ اللَّهِ، الْحَمْدُ لِلَّهِ، ﴿سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ﴾',
    transliteration: 'Bismillāh, al-ḥamdu lillāh, subḥānal-ladhī sakhkhara lanā hādhā wa mā kunnā lahū muqrinīn, wa innā ilā rabbinā lamunqalibūn.',
    translation: 'In the name of Allah, praise is to Allah. Exalted is He who has subjected this to us, and we could not have otherwise subdued it. And indeed, to our Lord we will return.',
    reference: 'Muslim 1342, Abu Dawud 2602',
    virtue: 'Divine protection during travel and journeys.',
    suggestedCount: 1,
    chapterNumber: 95,
    hisnulNumber: '214',
    translations: {
      en: { title: '40. Riding a Vehicle / Travel', timing: 'Boarding transport', translation: 'In the name of Allah, praise be to Allah. Glory is to Him who subjected this to us...' },
      bn: { title: '৪০. বাহনে আরোহণের দোয়া (সফরের দোয়া)', timing: 'গাড়ি বা বাহনে ওঠার সময়', translation: 'আল্লাহর নামে; আর সমস্ত প্রশংসা আল্লাহর। পবিত্র মহান সেই সত্তা, যিনি একে আমাদের জন্য বশীভূত করে দিয়েছেন...' }
    }
  },

  // --- Chapter 130: Tasbih, Tahmid, Tahlil ---
  {
    id: 'dua_130_1',
    title: '41. Supreme Excellence of Subhanallah wa Bihamdih',
    category: 'morning_evening',
    timing: '100 times daily (morning or evening)',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    transliteration: 'Subḥānallāhi wa biḥamdih.',
    translation: 'Glory is to Allah and with His praise.',
    reference: 'Bukhari 6405, Muslim 2691',
    virtue: 'Sins are wiped out even if they are like the foam of the sea.',
    suggestedCount: 100,
    chapterNumber: 130,
    hisnulNumber: '254',
    translations: {
      en: { title: '41. Excellence of Subhanallah wa Bihamdih', timing: '100x Daily', translation: 'Glory is to Allah and with His praise. (100 times wipes away all sins).' },
      bn: { title: '৪১. সুবহানাল্লাহি ওয়া বিহামদিহ এর ফযীলত', timing: 'দিনে ১০০ বার পাঠ', translation: 'সুবহানাল্লাহি ওয়া বিহামদিহি (দিনে ১০০ বার পড়লে সাগরের ফেনার সমান পাপ থাকলেও ক্ষমা করা হয়)।' }
    }
  },
  {
    id: 'dua_130_2',
    title: '42. Two Light & Heavy Phrases on the Scale',
    category: 'morning_evening',
    timing: 'Frequent daily recitation',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    transliteration: 'Subḥānallāhi wa biḥamdih, subḥānallāhil-‘aẓīm.',
    translation: 'Glory is to Allah and with His praise, Glory is to Allah the Greatest.',
    reference: 'Bukhari 6404, Muslim 2694',
    virtue: 'Light on the tongue, heavy on the scales, and beloved to the Most Merciful.',
    suggestedCount: 100,
    chapterNumber: 130,
    hisnulNumber: '256',
    translations: {
      en: { title: '42. Two Beloved Phrases on the Scale', timing: 'Frequent zikr', translation: 'Glory is to Allah and with His praise, Glory is to Allah the Greatest.' },
      bn: { title: '৪২. মীযানের পাল্লায় ভারী দুটি বাক্য', timing: 'সর্বদা পাঠযোগ্য', translation: 'সুবহানাল্লাহি ওয়া বিহামদিহি, সুবহানাল্লাহিল আজিম (ভাষায় হালকা, মীযানের পাল্লায় ভারী এবং আল্লাহর নিকট অত্যন্ত প্রিয়)।' }
    }
  }
];
