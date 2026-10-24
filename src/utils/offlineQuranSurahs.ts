import { QuranAyah } from './quranService';

// Pre-embedded complete fallback datasets for instant offline reading
export const OFFLINE_FALLBACK_SURAHS: Record<number, QuranAyah[]> = {
  // Surah 1: Al-Fatihah (Complete 7 Ayahs)
  1: [
    {
      number: 1,
      globalNumber: 1,
      arabic: 'بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
      transliteration: 'Bismillāhir-Raḥmānir-Raḥīm',
      translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. • পরম করুণাময় অসীম দয়ালু আল্লাহর নামে শুরু করছি।',
      juz: 1,
      page: 1,
      sajda: false,
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3',
    },
    {
      number: 2,
      globalNumber: 2,
      arabic: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ',
      transliteration: 'Al-ḥamdu lillāhi Rabbil-\'ālamīn',
      translation: '[All] praise is [due] to Allah, Lord of the worlds. • সমস্ত প্রশংসা জগৎসমূহের প্রতিপালক আল্লাহর জন্য।',
      juz: 1,
      page: 1,
      sajda: false,
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3',
    },
    {
      number: 3,
      globalNumber: 3,
      arabic: 'ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
      transliteration: 'Ar-Raḥmānir-Raḥīm',
      translation: 'The Entirely Merciful, the Especially Merciful. • যিনি পরম করুণাময় ও অসীম দয়ালু।',
      juz: 1,
      page: 1,
      sajda: false,
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3',
    },
    {
      number: 4,
      globalNumber: 4,
      arabic: 'مَٰلِكِ يَوْمِ ٱلدِّينِ',
      transliteration: 'Māliki yawmid-dīn',
      translation: 'Sovereign of the Day of Recompense. • যিনি কর্মফল ও বিচার দিবসের মালিক।',
      juz: 1,
      page: 1,
      sajda: false,
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/4.mp3',
    },
    {
      number: 5,
      globalNumber: 5,
      arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      transliteration: 'Iyyāka na\'budu wa iyyāka nasta\'īn',
      translation: 'It is You we worship and You we ask for help. • আমরা শুধু আপনারই ইবাদত করি এবং শুধুমাত্র আপনারই কাছে সাহায্য চাই।',
      juz: 1,
      page: 1,
      sajda: false,
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/5.mp3',
    },
    {
      number: 6,
      globalNumber: 6,
      arabic: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',
      transliteration: 'Ihdinaṣ-ṣirāṭal-mustaqīm',
      translation: 'Guide us to the straight path. • আমাদেরকে সরল সঠিক পথ প্রদর্শন করুন।',
      juz: 1,
      page: 1,
      sajda: false,
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6.mp3',
    },
    {
      number: 7,
      globalNumber: 7,
      arabic: 'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ',
      transliteration: 'Ṣirāṭal-ladhīna an\'amta \'alayhim ghayril-maghḍūbi \'alayhim wa laḍ-ḍāllīn',
      translation: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray. • তাদের পথ যাদের আপনি অনুগ্রহ করেছেন, তাদের পথ নয় যারা অভিশপ্ত হয়েছে ও পথভ্রষ্ট হয়েছে।',
      juz: 1,
      page: 1,
      sajda: false,
      audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3',
    },
  ],

  // Surah 108: Al-Kawthar (Complete 3 Ayahs)
  108: [
    { number: 1, globalNumber: 6194, arabic: 'إِنَّآ أَعْطَيْنَٰكَ ٱلْكَوْثَرَ', transliteration: 'Innā a\'ṭaynākal-kawthar', translation: 'Indeed, We have granted you, [O Muhammad], al-Kawthar. • নিশ্চয় আমি আপনাকে কাউসার (প্রচুর কল্যাণ ও হাউজে কাউসার) দান করেছি।', juz: 30, page: 602, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6194.mp3' },
    { number: 2, globalNumber: 6195, arabic: 'فَصَلِّ لِرَبِّكَ وَٱنْحَرْ', transliteration: 'Faṣalli li-Rabbika wanḥar', translation: 'So pray to your Lord and sacrifice. • অতএব আপনার পালনকর্তার উদ্দেশ্যে নামাজ পড়ুন এবং কোরবানি করুন।', juz: 30, page: 602, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6195.mp3' },
    { number: 3, globalNumber: 6196, arabic: 'إِنَّ شَانِئَكَ هُوَ ٱلْأَبْتَرُ', transliteration: 'Inna shāni\'aka huwal-abtar', translation: 'Indeed, your enemy is the one cut off. • নিশ্চয় আপনার প্রতি বিদ্বেষ পোষণকারীই তো নির্বংশ।', juz: 30, page: 602, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6196.mp3' },
  ],

  // Surah 109: Al-Kafirun (Complete 6 Ayahs)
  109: [
    { number: 1, globalNumber: 6197, arabic: 'قُلْ يَٰٓأَيُّهَا ٱلْكَٰفِرُونَ', transliteration: 'Qul yā ayyuhal-kāfirūn', translation: 'Say, "O disbelievers, • বলুন: হে কাফেররা!', juz: 30, page: 603, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6197.mp3' },
    { number: 2, globalNumber: 6198, arabic: 'لَآ أَعْبُدُ مَا تَعْبُدُونَ', transliteration: 'Lā a\'budu mā ta\'budūn', translation: 'I do not worship what you worship. • আমি তাঁর ইবাদত করি না যার ইবাদত তোমরা কর।', juz: 30, page: 603, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6198.mp3' },
    { number: 3, globalNumber: 6199, arabic: 'وَلَآ أَنتُمْ عَٰبِدُونَ مَآ أَعْبُدُ', transliteration: 'Wa lā antum \'ābidūna mā a\'bud', translation: 'Nor are you worshippers of what I worship. • এবং তোমরাও তাঁর ইবাদতকারী নও যাঁর ইবাদত আমি করি।', juz: 30, page: 603, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6199.mp3' },
    { number: 4, globalNumber: 6200, arabic: 'وَلَآ أَنَا۠ عَابِدٌ مَّا عَبَدتُّمْ', transliteration: 'Wa lā ana \'ābidum mā \'abattum', translation: 'Nor will I be a worshipper of what you worship. • এবং আমি তাঁর ইবাদতকারী নই যাঁর তোমরা ইবাদত করেছ।', juz: 30, page: 603, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6200.mp3' },
    { number: 5, globalNumber: 6201, arabic: 'وَلَآ أَنتُمْ عَٰبِدُونَ مَآ أَعْبُدُ', transliteration: 'Wa lā antum \'ābidūna mā a\'bud', translation: 'Nor will you be worshippers of what I worship. • এবং তোমরাও তাঁর ইবাদতকারী নও যাঁর ইবাদত আমি করি।', juz: 30, page: 603, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6201.mp3' },
    { number: 6, globalNumber: 6202, arabic: 'لَكُمْ دِينُكُمْ وَلِىَ دِينِ', transliteration: 'Lakum dīnukum wa liya dīn', translation: 'For you is your religion, and for me is my religion. • তোমাদের জন্য তোমাদের ধর্ম, আর আমার জন্য আমার ধর্ম।', juz: 30, page: 603, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6202.mp3' },
  ],

  // Surah 110: An-Nasr (Complete 3 Ayahs)
  110: [
    { number: 1, globalNumber: 6203, arabic: 'إِذَا جَآءَ نَصْرُ ٱللَّهِ وَٱلْفَتْحُ', transliteration: 'Idhā jā\'a naṣrullāhi wal-fatḥ', translation: 'When the victory of Allah has come and the conquest, • যখন আল্লাহর সাহায্য ও বিজয় আসবে,', juz: 30, page: 603, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6203.mp3' },
    { number: 2, globalNumber: 6204, arabic: 'وَرَأَيْتَ ٱلنَّاسَ يَدْخُلُونَ فِى دِينِ ٱللَّهِ أَفْوَاجًا', transliteration: 'Wa ra\'aitan-nāsa yadkhulūna fī dīnillāhi afwājā', translation: 'And you see the people entering into the religion of Allah in multitudes, • আর আপনি মানুষকে দলে দলে আল্লাহর দ্বীনে প্রবেশ করতে দেখবেন,', juz: 30, page: 603, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6204.mp3' },
    { number: 3, globalNumber: 6205, arabic: 'فَسَبِّحْ بِحَمْدِ رَبِّكَ وَٱسْتَغْفِرْهُ ۚ إِنَّهُۥ كَانَ تَوَّابًۢا', transliteration: 'Fasabbiḥ biḥamdi Rabbika wastaghfirh, innahū kāna tawwābā', translation: 'Then exalt [Him] with praise of your Lord and ask forgiveness of Him. • তখন আপনি আপনার পালনকর্তার প্রশংসাসহ পবিত্রতা বর্ণনা করুন এবং ক্ষমা চান।', juz: 30, page: 603, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6205.mp3' },
  ],

  // Surah 111: Al-Masad (Complete 5 Ayahs)
  111: [
    { number: 1, globalNumber: 6206, arabic: 'تَبَّتْ يَدَآ أَبِى لَهَبٍ وَتَبَّ', transliteration: 'Tabbat yadā abī Lahabiw-wa tabb', translation: 'May the hands of Abu Lahab be ruined, and ruined is he. • আবু লাহাবের হাত দুটি ধ্বংস হোক এবং সে নিজেও ধ্বংস হোক।', juz: 30, page: 603, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6206.mp3' },
    { number: 2, globalNumber: 6207, arabic: 'مَآ أَغْنَىٰ عَنْهُ مَالُهُۥ وَمَا كَسَبَ', transliteration: 'Mā aghnā \'anhu māluhū wa mā kasab', translation: 'His wealth will not avail him or that which he gained. • তার ধন-সম্পদ ও যা সে অর্জন করেছে তা কোনো কাজে আসেনি।', juz: 30, page: 603, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6207.mp3' },
    { number: 3, globalNumber: 6208, arabic: 'سَيَصْلَىٰ نَارًا ذَاتَ لَهَبٍ', transliteration: 'Sayaṣlā nāran dhāta lahab', translation: 'He will burn in a Fire of flaming blaze. • অচিরেই সে প্রবেশ করবে লেলিহান শিখাযুক্ত আগুনে,', juz: 30, page: 603, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6208.mp3' },
    { number: 4, globalNumber: 6209, arabic: 'وَٱمْرَأَتُهُۥ حَمَّالَةَ ٱلْحَطَبِ', transliteration: 'Wamra\'atuhū ḥammālatal-ḥaṭab', translation: 'And his wife - the carrier of firewood. • এবং তার স্ত্রীও—যে কাঁটাযুক্ত কাঠ বহনকারিণী,', juz: 30, page: 603, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6209.mp3' },
    { number: 5, globalNumber: 6210, arabic: 'فِى جِيدِهَا حَبْلٌ مِّن مَّسَدٍۭ', transliteration: 'Fī jīdihā ḥablum mim-masad', translation: 'Around her neck is a rope of twisted fiber. • তার গলায় শক্ত পাকানো খেজুরের আঁশের রশি থাকবে।', juz: 30, page: 603, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6210.mp3' },
  ],

  // Surah 112: Al-Ikhlas (Complete 4 Ayahs)
  112: [
    { number: 1, globalNumber: 6222, arabic: 'قُلْ هُوَ ٱللَّهُ أَحَدٌ', transliteration: 'Qul Huwallāhu Aḥad', translation: 'Say, "He is Allah, [who is] One, • বলুন: তিনিই আল্লাহ, একক ও অদ্বিতীয়,', juz: 30, page: 604, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6222.mp3' },
    { number: 2, globalNumber: 6223, arabic: 'ٱللَّهُ ٱلصَّمَدُ', transliteration: 'Allāhuṣ-Ṣamad', translation: 'Allah, the Eternal Refuge. • আল্লাহ কারও মুখাপেক্ষী নন, সকলেই তাঁর মুখাপেক্ষী।', juz: 30, page: 604, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6223.mp3' },
    { number: 3, globalNumber: 6224, arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', transliteration: 'Lam yalid wa lam yūlad', translation: 'He neither begets nor is born, • তিনি কাউকেও জন্ম দেননি এবং তাঁকেও কেউ জন্ম দেয়নি,', juz: 30, page: 604, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6224.mp3' },
    { number: 4, globalNumber: 6225, arabic: 'وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ', transliteration: 'Wa lam yakul-lahū kufuwan aḥad', translation: 'Nor is there to Him any equivalent. • এবং তাঁর সমকক্ষ ও তুলনীয় কেউই নেই।', juz: 30, page: 604, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6225.mp3' },
  ],

  // Surah 113: Al-Falaq (Complete 5 Ayahs)
  113: [
    { number: 1, globalNumber: 6226, arabic: 'قُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ', transliteration: 'Qul a\'ūdhu bi-Rabbil-falaq', translation: 'Say, "I seek refuge in the Lord of daybreak • বলুন: আমি আশ্রয় প্রার্থনা করছি প্রভাতের পালনকর্তার,', juz: 30, page: 604, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6226.mp3' },
    { number: 2, globalNumber: 6227, arabic: 'مِن شَرِّ مَا خَلَقَ', transliteration: 'Min sharri mā khalaq', translation: 'From the evil of that which He created • তিনি যা সৃষ্টি করেছেন তার অনিষ্ট থেকে,', juz: 30, page: 604, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6227.mp3' },
    { number: 3, globalNumber: 6228, arabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ', transliteration: 'Wa min sharri ghāsiqin idhā waqab', translation: 'And from the evil of darkness when it settles • এবং রাতের অন্ধকারের অনিষ্ট থেকে যখন তা সমাগত হয়,', juz: 30, page: 604, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6228.mp3' },
    { number: 4, globalNumber: 6229, arabic: 'وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ', transliteration: 'Wa min sharrin-naffāthāti fil-\'uqad', translation: 'And from the evil of the blowers in knots • এবং গিরায় ফুঁকদানকারী জাদুকরীদের অনিষ্ট থেকে,', juz: 30, page: 604, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6229.mp3' },
    { number: 5, globalNumber: 6230, arabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ', transliteration: 'Wa min sharri ḥāsidin idhā ḥasad', translation: 'And from the evil of an envier when he envies. • এবং হিংসুকের অনিষ্ট থেকে যখন সে হিংসা করে।', juz: 30, page: 604, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6230.mp3' },
  ],

  // Surah 114: An-Nas (Complete 6 Ayahs)
  114: [
    { number: 1, globalNumber: 6231, arabic: 'قُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ', transliteration: 'Qul a\'ūdhu bi-Rabbin-nās', translation: 'Say, "I seek refuge in the Lord of mankind, • বলুন: আমি আশ্রয় প্রার্থনা করছি মানবজাতির পালনকর্তার,', juz: 30, page: 604, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6231.mp3' },
    { number: 2, globalNumber: 6232, arabic: 'مَلِكِ ٱلنَّاسِ', transliteration: 'Malikin-nās', translation: 'The Sovereign of mankind, • মানবজাতির অধিপতির,', juz: 30, page: 604, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6232.mp3' },
    { number: 3, globalNumber: 6233, arabic: 'إِلَٰهِ ٱلنَّاسِ', transliteration: 'Ilāhin-nās', translation: 'The God of mankind, • মানবজাতির প্রকৃত উপাস্যের,', juz: 30, page: 604, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6233.mp3' },
    { number: 4, globalNumber: 6234, arabic: 'مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ', transliteration: 'Min sharril-waswāsil-khannās', translation: 'From the evil of the retreating whisperer - • আত্মগোপনকারী কুমন্ত্রণাদাতার অনিষ্ট থেকে,', juz: 30, page: 604, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6234.mp3' },
    { number: 5, globalNumber: 6235, arabic: 'ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ', transliteration: 'Alladhī yuwaswisu fī ṣudūrin-nās', translation: 'Who whispers [evil] into the breasts of mankind - • যে মানুষের অন্তরে কুমন্ত্রণা দেয়,', juz: 30, page: 604, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6235.mp3' },
    { number: 6, globalNumber: 6236, arabic: 'مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ', transliteration: 'Minal-jinnati wan-nās', translation: 'From among the jinn and mankind. • জিন ও মানবজাতির মধ্য থেকে।', juz: 30, page: 604, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6236.mp3' },
  ],

  // Surah 103: Al-Asr (Complete 3 Ayahs)
  103: [
    { number: 1, globalNumber: 6177, arabic: 'وَٱلْعَصْرِ', transliteration: 'Wal-\'aṣr', translation: 'By time, • সময়ের শপথ!', juz: 30, page: 601, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6177.mp3' },
    { number: 2, globalNumber: 6178, arabic: 'إِنَّ ٱلْإِنسَٰنَ لَفِى خُسْرٍ', transliteration: 'Innal-insāna lafī khusr', translation: 'Indeed, mankind is in loss, • নিশ্চয় সকল মানুষ চরম ক্ষতির মধ্যে নিমজ্জিত,', juz: 30, page: 601, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6178.mp3' },
    { number: 3, globalNumber: 6179, arabic: 'إِلَّا ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّٰلِحَٰتِ وَتَوَاصَوْا۟ بِٱلْحَقِّ وَتَوَاصَوْا۟ بِٱلصَّبْرِ', transliteration: 'Illal-ladhīna āmanū wa \'amiluṣ-ṣāliḥāti wa tawāṣaw bil-ḥaqqi wa tawāṣaw biṣ-ṣabr', translation: 'Except for those who have believed and done righteous deeds and advised each other to truth and advised each other to patience. • তারা ছাড়া যারা ঈমান এনেছে, সৎকাজ করেছে এবং পরস্পরকে সত্যের উপদেশ দিয়েছে ও ধৈর্যের উপদেশ দিয়েছে।', juz: 30, page: 601, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6179.mp3' },
  ],

  // Surah 105: Al-Fil (Complete 5 Ayahs)
  105: [
    { number: 1, globalNumber: 6183, arabic: 'أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِأَصْحَٰبِ ٱلْفِيلِ', transliteration: 'Alam tara kaifa fa\'ala rabbuka bi-aṣḥābil-fīl', translation: 'Have you not considered how your Lord dealt with the companions of the elephant? • আপনি কি দেখেননি আপনার পালনকর্তা হস্তীধারীদের সাথে কি ব্যবহার করেছিলেন?', juz: 30, page: 601, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6183.mp3' },
    { number: 2, globalNumber: 6184, arabic: 'أَلَمْ يَجْعَلْ كَيْدَهُمْ فِى تَضْلِيلٍ', transliteration: 'Alam yaj\'al kaydahum fī taḍlīl', translation: 'Did He not make their plan into misguidance? • তিনি কি তাদের কৌশল ব্যর্থ করে দেননি?', juz: 30, page: 601, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6184.mp3' },
    { number: 3, globalNumber: 6185, arabic: 'وَأَرْسَلَ عَلَيْهِمْ طَيْرًا أَبَابِيلَ', transliteration: 'Wa arsala \'alayhim ṭayran abābīl', translation: 'And He sent against them birds in flocks, • এবং তাদের ওপর প্রেরণ করেছিলেন ঝাঁকে ঝাঁকে আবাবিল পাখি,', juz: 30, page: 601, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6185.mp3' },
    { number: 4, globalNumber: 6186, arabic: 'تَرْمِيهِم بِحِجَارَةٍ مِّن سِجِّيلٍ', transliteration: 'Tarmīhim biḥijāratim min sijjīl', translation: 'Striking them with stones of hard clay, • যারা তাদের ওপর নিক্ষেপ করেছিল পোড়ামাটির পাথর,', juz: 30, page: 601, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6186.mp3' },
    { number: 5, globalNumber: 6187, arabic: 'فَجَعَلَهُمْ كَعَصْفٍ مَّأْكُولٍۭ', transliteration: 'Faja\'alahum ka\'aṣfim ma\'kūl', translation: 'And He made them like eaten straw. • অতঃপর তিনি তাদের চর্বিত তৃণের মতো ধ্বংসস্তূপে পরিণত করলেন।', juz: 30, page: 601, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6187.mp3' },
  ],

  // Surah 106: Quraish (Complete 4 Ayahs)
  106: [
    { number: 1, globalNumber: 6188, arabic: 'لِإِيلَٰفِ قُرَيْشٍ', transliteration: 'Li-\'īlāfi Quraysh', translation: 'For the accustomed security of the Quraysh - • কুরাইশদের নিরাপত্তার স্বার্থে,', juz: 30, page: 602, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6188.mp3' },
    { number: 2, globalNumber: 6189, arabic: 'إِۦلَٰفِهِمْ رِحْلَةَ ٱلشِّتَآءِ وَٱلصَّيْفِ', transliteration: 'Īlāfihim riḥlatash-shitā\'i waṣ-ṣayf', translation: 'Their accustomed security [in] the caravan of winter and summer - • শীত ও গ্রীষ্মকালীন সফরের নিরাপত্তার জন্য,', juz: 30, page: 602, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6189.mp3' },
    { number: 3, globalNumber: 6190, arabic: 'فَلْيَعْبُدُوا۟ رَبَّ هَٰذَا ٱلْبَيْتِ', transliteration: 'Falya\'budū Rabba hādhal-bayt', translation: 'Let them worship the Lord of this House, • অতএব তারা যেন এই গৃহের (কা\'বার) পালনকর্তার ইবাদত করে,', juz: 30, page: 602, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6190.mp3' },
    { number: 4, globalNumber: 6191, arabic: 'ٱلَّذِىٓ أَطْعَمَهُم مِّن جُوعٍ وَءَامَنَهُم مِّنْ خَوْفٍۭ', transliteration: 'Alladhī aṭ\'amahum min jū\'iw-wa āmanahum min khawf', translation: 'Who has fed them, [saving them] from hunger and made them safe, [saving them] from fear. • যিনি তাদেরকে ক্ষুধায় আহার দিয়েছেন এবং ভয়-ভীতি থেকে নিরাপদ করেছেন।', juz: 30, page: 602, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6191.mp3' },
  ],

  // Surah 107: Al-Ma'un (Complete 7 Ayahs)
  107: [
    { number: 1, globalNumber: 6192, arabic: 'أَرَءَيْتَ ٱلَّذِى يُكَذِّبُ بِٱلدِّينِ', transliteration: 'Ara\'aytal-ladhī yukadhdhibu bid-dīn', translation: 'Have you seen the one who denies the Recompense? • আপনি কি দেখেছেন তাকে, যে কর্মফল ও বিচার দিবসকে অস্বীকার করে?', juz: 30, page: 602, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6192.mp3' },
    { number: 2, globalNumber: 6193, arabic: 'فَذَٰلِكَ ٱلَّذِى يَدُعُّ ٱلْيَتِيمَ', transliteration: 'Fadhālikal-ladhī yadu\'\'ul-yatīm', translation: 'For that is the one who drives away the orphan • সে তো সেই ব্যক্তি, যে এতিমকে রূঢ়ভাবে তাড়িয়ে দেয়,', juz: 30, page: 602, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6193.mp3' },
    { number: 3, globalNumber: 6194, arabic: 'وَلَا يَحُضُّ عَلَىٰ طَعَامِ ٱلْمِسْكِينِ', transliteration: 'Wa lā yaḥuḍḍu \'alā ṭa\'āmil-miskīn', translation: 'And does not encourage the feeding of the poor. • এবং মিসকিনকে অন্নদানে উৎসাহিত করে না।', juz: 30, page: 602, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6194.mp3' },
    { number: 4, globalNumber: 6195, arabic: 'فَوَيْلٌ لِّلْمُصَلِّينَ', transliteration: 'Fa-waylul-lil-muṣallīn', translation: 'So woe to those who pray • অতএব দুর্ভোগ সেইসব নামাজীদের জন্য,', juz: 30, page: 602, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6195.mp3' },
    { number: 5, globalNumber: 6196, arabic: 'ٱلَّذِينَ هُمْ عَن صَلَاتِهِمْ سَاهُونَ', transliteration: 'Alladhīna hum \'an ṣalātihim sāhūn', translation: '[But] who are heedless of their prayer - • যারা তাদের নামাজ সম্পর্কে উদাসীন ও গাফেল,', juz: 30, page: 602, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6196.mp3' },
    { number: 6, globalNumber: 6197, arabic: 'ٱلَّذِينَ هُمْ يُرَآءُونَ', transliteration: 'Alladhīna hum yurā\'ūn', translation: 'Those who make a show [of their deeds] • যারা শুধু লোক দেখানোর জন্য কাজ করে,', juz: 30, page: 602, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6197.mp3' },
    { number: 7, globalNumber: 6198, arabic: 'وَيَمْنَعُونَ ٱلْمَاعُونَ', transliteration: 'Wa yamna\'ūnal-mā\'ūn', translation: 'And withhold [simple] assistance. • এবং গৃহস্থালির সাধারণ প্রয়োজনীয় সাহায্য পর্যন্ত দিতে অস্বীকার করে।', juz: 30, page: 602, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6198.mp3' },
  ],

  // Surah 97: Al-Qadr (Complete 5 Ayahs)
  97: [
    { number: 1, globalNumber: 6125, arabic: 'إِنَّآ أَنزَلْنَٰهُ فِى لَيْلَةِ ٱلْقَدْرِ', transliteration: 'Innā anzalnāhu fī laylatil-qadr', translation: 'Indeed, We sent the Qur\'an down during the Night of Decree. • নিশ্চয় আমি এটি নাজিল করেছি মহিমান্বিত কদরের রাতে।', juz: 30, page: 598, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6125.mp3' },
    { number: 2, globalNumber: 6126, arabic: 'وَمَآ أَدْرَىٰكَ مَا لَيْلَةُ ٱلْقَدْرِ', transliteration: 'Wa mā adrāka mā laylatul-qadr', translation: 'And what can make you know what is the Night of Decree? • আপনি কি জানেন সেই মহিমান্বিত কদরের রাত কি?', juz: 30, page: 598, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6126.mp3' },
    { number: 3, globalNumber: 6127, arabic: 'لَيْلَةُ ٱلْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ', transliteration: 'Laylatul-qadri khayrum min alfi shahr', translation: 'The Night of Decree is better than a thousand months. • কদরের রাত হাজার মাসের চেয়েও শ্রেষ্ঠ ও উত্তম।', juz: 30, page: 598, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6127.mp3' },
    { number: 4, globalNumber: 6128, arabic: 'تَنَزَّلُ ٱلْمَلَٰٓئِكَةُ وَٱلرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ', transliteration: 'Tanazzalul-malā\'ikatu war-rūḥu fīhā bi\'idhni Rabbihim min kulli amr', translation: 'The angels and the Spirit descend therein by permission of their Lord for every matter. • সে রাতে ফেরেশতাগণ ও জিবরাঈল (আঃ) পালনকর্তার নির্দেশে প্রত্যেক কল্যাণকর কাজের জন্য অবতরণ করেন।', juz: 30, page: 598, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6128.mp3' },
    { number: 5, globalNumber: 6129, arabic: 'سَلَٰمٌ هِىَ حَتَّىٰ مَطْلَعِ ٱلْفَجْرِ', transliteration: 'Salāmun hiya ḥattā maṭla\'il-fajr', translation: 'Peace it is until the emergence of dawn. • এটি শান্তিময় কল্যাণ, যা ফজর উদয় পর্যন্ত অব্যাহত থাকে।', juz: 30, page: 598, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6129.mp3' },
  ],

  // Surah 94: Ash-Sharh (Complete 8 Ayahs)
  94: [
    { number: 1, globalNumber: 6110, arabic: 'أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ', transliteration: 'Alam nashraḥ laka ṣadrak', translation: 'Did We not expand for you, [O Muhammad], your breast? • আমি কি আপনার বক্ষকে প্রশস্ত করে দেইনি?', juz: 30, page: 596, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6110.mp3' },
    { number: 2, globalNumber: 6111, arabic: 'وَوَضَعْنَا عَنكَ وِزْرَكَ', transliteration: 'Wa waḍa\'nā \'anka wizrak', translation: 'And We removed from you your burden • এবং আমি আপনার ওপর থেকে নামিয়ে দিয়েছি আপনার ভারী বোঝা,', juz: 30, page: 596, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6111.mp3' },
    { number: 3, globalNumber: 6112, arabic: 'ٱلَّذِىٓ أَنقَضَ ظَهْرَكَ', transliteration: 'Alladhī anqaḍa ẓahrak', translation: 'Which had weighed upon your back • যা ভেঙে দিচ্ছিল আপনার পৃষ্ঠদেশ,', juz: 30, page: 596, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6112.mp3' },
    { number: 4, globalNumber: 6113, arabic: 'وَرَفَعْنَا لَكَ ذِكْرَكَ', transliteration: 'Wa rafa\'nā laka dhikrak', translation: 'And raised high for you your repute. • এবং আমি আপনার মর্যাদাকে সুউচ্চ করেছি।', juz: 30, page: 596, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6113.mp3' },
    { number: 5, globalNumber: 6114, arabic: 'فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا', transliteration: 'Fa\'inna ma\'al-\'usri yusrā', translation: 'For indeed, with hardship [will be] ease. • নিশ্চয় কষ্টের সাথেই তো রয়েছে সুখ ও স্বস্তি।', juz: 30, page: 596, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6114.mp3' },
    { number: 6, globalNumber: 6115, arabic: 'إِنَّ مَعَ ٱلْعُسْرِ يُسْرًا', transliteration: 'Inna ma\'al-\'usri yusrā', translation: 'Indeed, with hardship [will be] ease. • নিশ্চয় কষ্টের সাথেই তো রয়েছে পরম স্বস্তি।', juz: 30, page: 596, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6115.mp3' },
    { number: 7, globalNumber: 6116, arabic: 'فَإِذَا فَرَغْتَ فَٱنصَبْ', transliteration: 'Fa\'idhā faraghta fanṣab', translation: 'So when you have finished, stand up for worship. • অতএব যখনই আপনি অবসর পান, ইবাদতের পরিশ্রমে রত হোন,', juz: 30, page: 596, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6116.mp3' },
    { number: 8, globalNumber: 6117, arabic: 'وَإِلَىٰ رَبِّكَ فَٱرْغَب', transliteration: 'Wa ilā Rabbika farghab', translation: 'And to your Lord direct [your] longing. • এবং একান্ত অনুরাগে আপনার পালনকর্তার প্রতি মনোনিবেশ করুন।', juz: 30, page: 596, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/6117.mp3' },
  ],

  // Surah 67: Al-Mulk (Core Ayahs 1-5)
  67: [
    { number: 1, globalNumber: 5242, arabic: 'تَبَٰرَكَ ٱلَّذِى بِيَدِهِ ٱلْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ', transliteration: 'Tabārakal-ladhī biyadihil-mulku wa huwa \'alā kulli shay\'in qadīr', translation: 'Blessed is He in whose hand is dominion, and He is over all things competent - • বরকতময় ও পরম মহিমান্বিত তিনি যাঁর হাতে সমগ্র রাজত্ব, এবং তিনি সর্ববিষয়ে সর্বশক্তিমান।', juz: 29, page: 562, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/5242.mp3' },
    { number: 2, globalNumber: 5243, arabic: 'ٱلَّذِى خَلَقَ ٱلْمَوْتَ وَٱلْحَيَوٰةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ ٱلْعَزِيزُ ٱلْغَفُورُ', transliteration: 'Alladhī khalaqal-mawta wal-ḥayāta liyabluwakum ayyukum aḥsanu \'amalā, wa huwal-\'Azīzul-Ghafūr', translation: '[He] who created death and life to test you [as to] which of you is best in deed - and He is the Exalted in Might, the Forgiving - • যিনি সৃষ্টি করেছেন মরণ ও জীবন, যাতে তোমাদেরকে পরীক্ষা করেন কে তোমাদের মধ্যে কর্মে শ্রেষ্ঠ? আর তিনি পরাক্রমশালী, ক্ষমাশীল।', juz: 29, page: 562, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/5243.mp3' },
    { number: 3, globalNumber: 5244, arabic: 'ٱلَّذِى خَلَقَ سَبْعَ سَمَٰوَٰتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِى خَلْقِ ٱلرَّحْمَٰنِ مِن تَفَٰوُتٍ ۖ فَٱرْجِعِ ٱلْبَصَرَ هَلْ تَرَىٰ مِن فُطُورٍ', transliteration: 'Alladhī khalaqa sab\'a samāwātin ṭibāqam, mā tarā fī khalqir-Raḥmāni min tafāwut, farji\'il-baṣara hal tarā min fuṭūr', translation: '[And] who created seven heavens in layers. You do not see in the creation of the Most Merciful any inconsistency. So return [your] vision; do you see any breaks? • যিনি সপ্ত আকাশ সৃষ্টি করেছেন স্তরে স্তরে। দয়াময় আল্লাহর সৃষ্টিতে আপনি কোনো খুঁত দেখতে পাবেন না। আবার দৃষ্টি ফিরিয়ে দেখুন, কোনো ফাটল দেখতে পান কি?', juz: 29, page: 562, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/5244.mp3' },
    { number: 4, globalNumber: 5245, arabic: 'ثُمَّ ٱرْجِعِ ٱلْبَصَرَ كَرَّتَيْنِ يَنقَلِبْ إِلَيْكَ ٱلْبَصَرُ خَاسِئًا وَهُوَ حَسِيرٌ', transliteration: 'Thummar-ji\'il-baṣara karratayni yanqalib ilaykal-baṣaru khāsi\'aw-wa huwa ḥasīr', translation: 'Then return [your] vision twice again. [Your] vision will return to you humbled while it is fatigued. • অতঃপর আপনি বারবার দৃষ্টি নিক্ষেপ করুন, সে দৃষ্টি ক্লান্ত-শ্রান্ত হয়ে আপনার দিকেই ফিরে আসবে কোনো ত্রুটি না পেয়ে।', juz: 29, page: 562, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/5245.mp3' },
    { number: 5, globalNumber: 5246, arabic: 'وَلَقَدْ زَيَّنَّا ٱلسَّمَآءَ ٱلدُّنْيَا بِمَصَٰبِيحَ وَجَعَلْنَٰهَا رُجُومًا لِّلشَّيَٰطِينِ ۖ وَأَعْتَدْنَا لَهُمْ عَذَابَ ٱلسَّعِيرِ', transliteration: 'Wa laqad zayyannās-samā\'ad-dunyā bimaṣābīḥa wa ja\'alnāhā rujūmal-lish-shayāṭīni wa a\'tadnā lahum \'adhābas-sa\'īr', translation: 'And We have certainly beautified the nearest heaven with lamps and have made [from] them what is thrown at the devils and have prepared for them the punishment of the Blaze. • এবং নিশ্চয় আমি নিকটবর্তী আকাশকে প্রদীপমালা দ্বারা সুশোভিত করেছি এবং সেগুলোকে শয়তানদের ওপর নিক্ষেপের উপকরণ করেছি এবং তাদের জন্য প্রস্তুত রেখেছি জ্বলন্ত অগ্নির শাস্তি।', juz: 29, page: 562, sajda: false, audioUrl: 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/5246.mp3' },
  ],
};
