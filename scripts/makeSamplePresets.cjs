const fs = require('fs');

const rawList = JSON.parse(fs.readFileSync('scripts/topics_list.json', 'utf8'));

// Curated dictionary for core & prominent topics
const TOPIC_PRESETS = {
  'অগ্নিপূজক': {
    nameEn: 'Fire Worshippers (Majus)',
    nameAr: 'المجوس',
    icon: '🔥',
    categoryBn: 'আকীদা ও বিশ্বাস',
    badgeBn: 'আকীদা',
    descBn: 'কুরআনে মাজুস বা অগ্নিপূজকদের উল্লেখ এবং কেবল একমাত্র আল্লাহর ইবাদতের আহবান।',
    ayahs: [
      {
        surahNumber: 22, ayahNumber: 17, globalNumber: 2612,
        surahNameBn: 'আল-হাজ্জ', surahNameAr: 'الحج', surahNameEn: 'Al-Hajj',
        arabic: 'إِنَّ الَّذِينَ آمَنُوا وَالَّذِينَ هَادُوا وَالصَّابِئِينَ وَالنَّصَارَىٰ وَالْمَجُوسَ وَالَّذِينَ أَشْرَكُوا إِنَّ اللَّهَ يَفْصِلُ بَيْنَهُمْ يَوْمَ الْقِيَامَةِ',
        translationBn: 'নিশ্চয়ই যারা ঈমান এনেছে এবং যারা ইহুদি হয়েছে, সাবেয়ী, খ্রিস্টান, অগ্নিপূজক ও যারা শিরক করেছে—কিয়ামতের দিন আল্লাহ তাদের মধ্যে ফয়সালা করে দেবেন।',
        translationEn: 'Indeed, those who have believed and those who were Jews and the Sabeans and the Christians and the Magians and those who associated with Allah - Allah will judge between them on the Day of Resurrection.',
        transliterationBn: 'ইন্নাল্লাযীনা আমানূ ওয়াল্লাযীনা হাদূ ওয়াস সাবিয়ীনা ওয়ান নাসারা ওয়াল মাজূসা ওয়াল্লাযীনা আশরাকূ...',
        themeNoteBn: 'কিয়ামতের দিন আল্লাহ তাআলা সকল জাতি ও মতাবলম্বীদের চূড়ান্ত বিচার করবেন।'
      }
    ],
    hadiths: [
      {
        narratorBn: 'হযরত ইবনে আব্বাস (রা.) থেকে বর্ণিত:',
        narratorEn: 'Narrated Ibn Abbas (RA):',
        translationBn: 'রাসূলুল্লাহ (সা.) নির্দেশ দিয়েছেন অগ্নিপূজকদের জিজিয়া গ্রহণ করার ব্যাপারে, তবে তাদের জবাই করা প্রাণী ভক্ষণ না করতে।',
        translationEn: 'The Prophet (peace be upon him) instructed regarding taking Jizyah from the Magians...',
        referenceBn: 'সুনান আত-তিরমিজী: ১৫৮৮, সহীহ বুখারী: ৩১৫৭',
        referenceEn: 'Sunan At-Tirmidhi: 1588, Sahih Al-Bukhari: 3157'
      }
    ]
  },
  'অগ্নিশিখা': {
    nameEn: 'Blazing Flames',
    nameAr: 'الشواظ واللهب',
    icon: '⚡',
    categoryBn: 'পরকাল ও কিয়ামত',
    badgeBn: 'জাহান্নাম',
    descBn: 'জাহান্নামের লেলিহান অগ্নিশিখা ও অপরাধীদের জন্য প্রস্তুতকৃত ভয়াবহ আগুন।',
    ayahs: [
      {
        surahNumber: 55, ayahNumber: 35, globalNumber: 4936,
        surahNameBn: 'আর-রহমান', surahNameAr: 'الرحمن', surahNameEn: 'Ar-Rahman',
        arabic: 'يُرْسَلُ عَلَيْكُمَا شُوَاظٌ مِّن نَّارٍ وَنُحَاسٌ فَلَا تَنتَصِرَانِ',
        translationBn: 'তোমাদের উভয়ের ওপর নিক্ষেপ করা হবে ধোঁয়াবিহীন অগ্নিশিখা ও গলিত তামা, তখন তোমরা আত্মরক্ষা করতে পারবে না।',
        translationEn: 'There will be sent upon you a flame of fire and smoke, and you will not defend yourselves.',
        transliterationBn: 'য়ুরসালু আলাইকুমা শুওয়াযুম মিন নারিন ওয়া নুহাসুন ফালা তানতাসিরান.',
        themeNoteBn: 'জাহান্নামের অগ্নিকুণ্ড ও আগুনের শিখার ভয়াবহতা।'
      }
    ],
    hadiths: [
      {
        narratorBn: 'হযরত আবূ হুরায়রা (রা.) থেকে বর্ণিত:',
        narratorEn: 'Narrated Abu Hurairah (RA):',
        translationBn: 'রাসূলুল্লাহ (সা.) বলেছেন: তোমাদের দুনিয়ার এই আগুন জাহান্নামের আগুনের সত্তর ভাগের এক ভাগ মাত্র!',
        translationEn: 'The fire which sons of Adam kindle is only one-seventieth part of the Fire of Hell.',
        referenceBn: 'সহীহ বুখারী: ৩২৬০, সহীহ মুসলিম: ২৮৪৩',
        referenceEn: 'Sahih Al-Bukhari: 3260, Sahih Muslim: 2843'
      }
    ]
  },
  'অজ্ঞতা': {
    nameEn: 'Ignorance (Jahiliyyah)',
    nameAr: 'الجهل والجاهلية',
    icon: '🌑',
    categoryBn: 'নৈতিকতা ও আত্মশুদ্ধি',
    badgeBn: 'সতর্কতা',
    descBn: 'অজ্ঞতা ও মূর্খতা থেকে আশ্রয় প্রার্থনা এবং জ্ঞান ও আলোর পথে চলার কুরআন নির্দেশ।',
    ayahs: [
      {
        surahNumber: 2, ayahNumber: 67, globalNumber: 74,
        surahNameBn: 'আল-বাকারা', surahNameAr: 'البقرة', surahNameEn: 'Al-Baqarah',
        arabic: 'قَالَ أَعُوذُ بِاللَّهِ أَنْ أَكُونَ مِنَ الْجَاهِلِينَ',
        translationBn: 'মূসা বললেন: "আমি অজ্ঞ-মূর্খদের অন্তর্ভুক্ত হওয়া থেকে আল্লাহর আশ্রয় প্রার্থনা করছি।"',
        translationEn: 'He said, "I seek refuge in Allah from being among the ignorant."',
        transliterationBn: 'ক্বালা আঊযু বিল্লাহি আন আকূনা মিনাল জাহিলীন.',
        themeNoteBn: 'মূর্খ ও অজ্ঞদের আচরণ থেকে সর্বদা মহান আল্লাহর পানাহ চাওয়া।'
      }
    ],
    hadiths: [
      {
        narratorBn: 'হযরত আনাস ইবনে মালিক (রা.) থেকে বর্ণিত:',
        narratorEn: 'Narrated Anas (RA):',
        translationBn: 'রাসূলুল্লাহ (সা.) বলেছেন: কিয়ামতের অন্যতম আলামত হলো ইলম উঠে যাবে এবং অজ্ঞতা বিস্তার লাভ করবে।',
        translationEn: 'From among the portents of the Hour are (the following): Religious knowledge will be taken away and general ignorance will appear.',
        referenceBn: 'সহীহ বুখারী: ৮০, সহীহ মুসলিম: ২৬৭১',
        referenceEn: 'Sahih Al-Bukhari: 80, Sahih Muslim: 2671'
      }
    ]
  },
  'অনর্থক ধারণা বা অনুমান': {
    nameEn: 'Baseless Suspicion & Assumptions',
    nameAr: 'سوء الظن والتخمين',
    icon: '💭',
    categoryBn: 'নৈতিকতা ও আত্মশুদ্ধি',
    badgeBn: 'চরিত্র',
    descBn: 'অহেতুক কুধারণা ও অনুমান নির্ভর কথা বলা থেকে বেঁচে থাকার কুরআনিক নির্দেশ।',
    ayahs: [
      {
        surahNumber: 49, ayahNumber: 12, globalNumber: 4627,
        surahNameBn: 'আল-হুজুরাত', surahNameAr: 'الحجرات', surahNameEn: 'Al-Hujurat',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اجْتَنِبُوا كَثِيرًا مِّنَ الظَّنِّ إِنَّ بَعْضَ الظَّنِّ إِثْمٌ',
        translationBn: 'হে ঈমানদারগণ! তোমরা অধিকাংশ অনুমান থেকে দূরে থাকো; নিশ্চয়ই কোনো কোনো অনুমান গুনাহ।',
        translationEn: 'O you who have believed, avoid much [negative] assumption. Indeed, some assumption is sin.',
        transliterationBn: 'ইয়া আইয়ুহাল্লাযীনা আমানুজ তানিবূ কাছীরাম মিনায যান্নি ইন্না বা’দায যান্নি ইছম...',
        themeNoteBn: 'অন্য মুসলমান ভাইয়ের ব্যাপারে ভিত্তিহীন কুধারণা পোষণ করা কবিরা গুনাহ।'
      }
    ],
    hadiths: [
      {
        narratorBn: 'হযরত আবূ হুরায়রা (রা.) থেকে বর্ণিত:',
        narratorEn: 'Narrated Abu Hurairah (RA):',
        translationBn: 'নবী করীম (সা.) ইরশাদ করেছেন: তোমরা কুধারণা পোষণ করা থেকে বেঁচে থাকো, কেননা কুধারণা হলো সবচেয়ে বড় মিথ্যা কথা।',
        translationEn: 'Beware of suspicion, for suspicion is the worst of false tales.',
        referenceBn: 'সহীহ বুখারী: ৬০৬৪, সহীহ মুসলিম: ২৫৬৩',
        referenceEn: 'Sahih Al-Bukhari: 6064, Sahih Muslim: 2563'
      }
    ]
  },
  'অনুমতি প্রার্থনা': {
    nameEn: 'Seeking Permission (Isti\'dhan)',
    nameAr: 'الاستئذان',
    icon: '🚪',
    categoryBn: 'শরীয়ত ও সামাজিক আইন',
    badgeBn: 'শিষ্টাচার',
    descBn: 'কারও ঘরে বা ব্যক্তিগত পরিসরে প্রবেশের পূর্বে সালাম ও অনুমতি প্রার্থনার শিষ্টাচার।',
    ayahs: [
      {
        surahNumber: 24, ayahNumber: 27, globalNumber: 2818,
        surahNameBn: 'আন-নূর', surahNameAr: 'النور', surahNameEn: 'An-Nur',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَدْخُلُوا بُيُوتًا غَيْرَ بُيُوتِكُمْ حَتَّىٰ تَسْتَأْنِسُوا وَتُسَلِّمُوا عَلَىٰ أَهْلِهَا',
        translationBn: 'হে মুমিনগণ! তোমরা নিজেদের গৃহ ব্যতীত অন্যের গৃহে প্রবেশ করো না, যতক্ষণ না তোমরা অনুমতি নাও এবং গৃহবাসীদের সালাম দাও।',
        translationEn: 'O you who have believed, do not enter houses other than your own houses until you ascertain welcome and greet their inhabitants.',
        transliterationBn: 'ইয়া আইয়ুহাল্লাযীনা আমানূ লা তাদখুলূ বুয়ূতান গায়রা বুয়ূতিকুম হাত্তা তাসতা’নিসূ ওয়া তুসাল্লিমূ আলা আহলিহা...',
        themeNoteBn: 'অন্যের বাড়িতে প্রবেশের পূর্বে অনুমতি নেওয়া এবং সালাম প্রদান করা ফরয।'
      }
    ],
    hadiths: [
      {
        narratorBn: 'হযরত সাহল ইবনে সা’দ (রা.) থেকে বর্ণিত:',
        narratorEn: 'Narrated Sahl bin Sa\'d (RA):',
        translationBn: 'রাসূলুল্লাহ (সা.) বলেছেন: চোখের দৃষ্টির হিফাজতের উদ্দেশ্যেই মূলত অনুমতি প্রার্থনার বিধান রাখা হয়েছে।',
        translationEn: 'Seeking permission has been made obligatory only for the sake of sight.',
        referenceBn: 'সহীহ বুখারী: ৬২৪১, সহীহ মুসলিম: ২১৫৬',
        referenceEn: 'Sahih Al-Bukhari: 6241, Sahih Muslim: 2156'
      }
    ]
  },
  'অন্তর': {
    nameEn: 'The Heart (Qalb)',
    nameAr: 'القلب والوجدان',
    icon: '💖',
    categoryBn: 'নৈতিকতা ও আত্মশুদ্ধি',
    badgeBn: 'আত্মশুদ্ধি',
    descBn: 'অন্তর পরিশুদ্ধ রাখা, কালবে সালীম (সুস্থ অন্তর) এবং অন্তরের ব্যাধি থেকে মুক্তির নির্দেশ।',
    ayahs: [
      {
        surahNumber: 26, ayahNumber: 88, globalNumber: 3020,
        surahNameBn: 'আশ-শুআরা', surahNameAr: 'الشعراء', surahNameEn: 'Ash-Shu\'ara',
        arabic: 'يَوْمَ لَا يَنفَعُ مَالٌ وَلَا بَنُونَ ﴿٨٨﴾ إِلَّا مَنْ أَتَى اللَّهَ بِقَلْبٍ سَلِيمٍ',
        translationBn: 'যেদিন ধন-সম্পদ ও সন্তান-সন্ততি কোনো উপকারে আসবে না; তবে যে ব্যক্তি আল্লাহর কাছে সুস্থ ও বিশুদ্ধ অন্তর নিয়ে আসবে (সে ছাড়া)।',
        translationEn: 'The Day when there will not benefit [anyone] wealth or children, But only one who comes to Allah with a sound heart.',
        transliterationBn: 'ইয়াওমা লা ইয়ানফাউ মালুঁও ওয়া লা বানূন. ইল্লা মান আতাল্লাহা বিক্বালবিন সালীম.',
        themeNoteBn: 'আখেরাতে মুক্তির একমাত্র চাবিকাঠি হলো শির্ক ও পঙ্কিলতামুক্ত বিশুদ্ধ সুস্থ অন্তর।'
      }
    ],
    hadiths: [
      {
        narratorBn: 'হযরত নোমান ইবনে বাশির (রা.) থেকে বর্ণিত:',
        narratorEn: 'Narrated An-Nu\'man bin Bashir (RA):',
        translationBn: 'রাসূলুল্লাহ (সা.) বলেছেন: জেনে রাখো, দেহের মধ্যে একটি মাংসপিণ্ড আছে, তা যখন বিশুদ্ধ হয় তখন পুরো দেহটাই বিশুদ্ধ হয়ে যায়; আর তা কলুষিত হলে পুরো দেহটাই কলুষিত হয়। আর জেনে রাখো, সেটি হলো অন্তর!',
        translationEn: 'Beware, in the body there is a piece of flesh; if it is sound, the whole body is sound, and if it is corrupt, the whole body is corrupt. Truly it is the heart.',
        referenceBn: 'সহীহ বুখারী: ৫২, সহীহ মুসলিম: ১৫৯৯',
        referenceEn: 'Sahih Al-Bukhari: 52, Sahih Muslim: 1599'
      }
    ]
  },
  'অন্ধ অনুকরণ': {
    nameEn: 'Blind Following & Dogmatism',
    nameAr: 'التقليد الأعمى',
    icon: '🙈',
    categoryBn: 'আকীদা ও বিশ্বাস',
    badgeBn: 'সতর্কতা',
    descBn: 'সত্যের বিপরীতে বাপ-দাদার প্রথা ও অন্ধ রীতিনীতি অনুসরণের বিরুদ্ধে কুরআনের তীব্র ভর্ৎসনা।',
    ayahs: [
      {
        surahNumber: 2, ayahNumber: 170, globalNumber: 177,
        surahNameBn: 'আল-বাকারা', surahNameAr: 'البقرة', surahNameEn: 'Al-Baqarah',
        arabic: 'وَإِذَا قِيلَ لَهُمُ اتَّبِعُوا مَا أَنزَلَ اللَّهُ قَالُوا بَلْ نَتَّبِعُ مَا أَلْفَيْنَا عَلَيْهِ آبَاءَنَا',
        translationBn: 'আর যখন তাদের বলা হয়, "আল্লাহ যা নাজিল করেছেন তা অনুসরণ করো", তারা বলে, "বরং আমরা আমাদের পূর্বপুরুষদের যাতে পেয়েছি তারই অনুসরণ করব।"',
        translationEn: 'And when it is said to them, "Follow what Allah has revealed," they say, "Rather, we will follow that which we found our fathers upon."',
        transliterationBn: 'ওয়া ইযা কীলা লাহুমুত তাবিঊ মা আনযালাল্লাহু ক্বলূ বাল নাত্তাবিউ মা আলফাইনা আলাইহি আবাআনা...',
        themeNoteBn: 'সত্য ও ওহির বিধান ত্যাগ করে পৈতৃক কুসংস্কারের অন্ধ অনুকরণ করা পথভ্রষ্টতা।'
      }
    ],
    hadiths: [
      {
        narratorBn: 'হযরত আবূ সাঈদ খুদরী (রা.) থেকে বর্ণিত:',
        narratorEn: 'Narrated Abu Sa\'id Al-Khudri (RA):',
        translationBn: 'রাসূলুল্লাহ (সা.) বলেছেন: তোমরা অবশ্যই তোমাদের পূর্ববর্তী জাতিগুলোর হুবহু অনুসরণ করবে, এমনকি তারা যদি কোনো গুঁইসাপের গর্তে ঢোকে, তোমরাও সেখানে ঢুকবে!',
        translationEn: 'You will follow the ways of those nations who were before you, span by span and cubit by cubit...',
        referenceBn: 'সহীহ বুখারী: ৭৩২০, সহীহ মুসলিম: ২৬৬৯',
        referenceEn: 'Sahih Al-Bukhari: 7320, Sahih Muslim: 2669'
      }
    ]
  },
  'অপবাদ': {
    nameEn: 'Slander & False Accusation',
    nameAr: 'البهتان والقذف',
    icon: '🗣️',
    categoryBn: 'শরীয়ত ও সামাজিক আইন',
    badgeBn: 'কবিরা গুনাহ',
    descBn: 'নিরপরাধ মানুষের ওপর মিথ্যা অপবাদ দেওয়ার ভয়াবহ শাস্তি ও হদ সংক্রান্ত কুরআনিক আইন।',
    ayahs: [
      {
        surahNumber: 24, ayahNumber: 4, globalNumber: 2795,
        surahNameBn: 'আন-নূর', surahNameAr: 'النور', surahNameEn: 'An-Nur',
        arabic: 'وَالَّذِينَ يَرْمُونَ الْمُحْصَنَاتِ ثُمَّ لَمْ يَأْتُوا بِأَرْبَعَةِ شُهَدَاءَ فَاجْلِدُوهُمْ ثَمَانِينَ جَلْدَةً',
        translationBn: 'আর যারা সতী-সাধ্বী নারীর ওপর অপবাদ দেয় অতঃপর চারজন সাক্ষী উপস্থিত করে না, তোমরা তাদের আশিটি বেত্রাঘাত করো এবং কখনো তাদের সাক্ষ্য গ্রহণ করো না।',
        translationEn: 'And those who accuse chaste women and then do not produce four witnesses - lash them with eighty lashes and do not accept their testimony ever after.',
        transliterationBn: 'ওয়াল্লাযীনা ইয়ারমূনাল মুহসানাতি ছুম্মা লাম ইয়া’তূ বিআরবাআতি শুহাদাআ ফাজলিদূহুম ছামানীনা জালদাহ...',
        themeNoteBn: 'মিথ্যা অপবাদ আরোপকারীদের জন্য ৮০টি বেত্রাঘাত ও সাক্ষ্যদানের অযোগ্যতার হদ।'
      }
    ],
    hadiths: [
      {
        narratorBn: 'হযরত আবূ হুরায়রা (রা.) থেকে বর্ণিত:',
        narratorEn: 'Narrated Abu Hurairah (RA):',
        translationBn: 'নবী করীম (সা.) ধ্বংসাত্মক সাতটি মহাপাপ থেকে বেঁচে থাকার নির্দেশ দিলেন, যার অন্যতম হলো নিষ্পাপ সতী মুমিন নারীর প্রতি ব্যভিচারের অপবাদ দেওয়া।',
        translationEn: 'Avoid the seven great destructive sins: ... and slandering chaste, innocent believing women.',
        referenceBn: 'সহীহ বুখারী: ২৭৬৬, সহীহ মুসলিম: ৮৯',
        referenceEn: 'Sahih Al-Bukhari: 2766, Sahih Muslim: 89'
      }
    ]
  },
  'অপরাধ': {
    nameEn: 'Crime & Transgression',
    nameAr: 'الجريمة والإثم',
    icon: '⚠️',
    categoryBn: 'শরীয়ত ও সামাজিক আইন',
    badgeBn: 'শাস্তি',
    descBn: 'পাপ ও অপরাধমূলক কাজ থেকে বিরত থাকা এবং অপরাধীদের পরিণতির কুরআনিক ঘোষণা।',
    ayahs: [
      {
        surahNumber: 10, ayahNumber: 17, globalNumber: 1381,
        surahNameBn: 'ইউনুস', surahNameAr: 'يونس', surahNameEn: 'Yunus',
        arabic: 'إِنَّهُ لَا يُفْلِحُ الْمُجْرِمُونَ',
        translationBn: 'নিশ্চয়ই অপরাধীরা কখনো সফলকাম হতে পারে না।',
        translationEn: 'Indeed, the criminals will not succeed.',
        transliterationBn: 'ইন্নাহূ লা ইউফলিহুল মুজরিমূন.',
        themeNoteBn: 'আল্লাহর বিধান লঙ্ঘনকারী কোনো অপরাধী দুনিয়া ও আখেরাতে সফল হয় না।'
      }
    ],
    hadiths: [
      {
        narratorBn: 'হযরত আবূ বকর (রা.) থেকে বর্ণিত:',
        narratorEn: 'Narrated Abu Bakr (RA):',
        translationBn: 'রাসূলুল্লাহ (সা.) বলেছেন: অত্যাচার ও আত্মীয়তার বন্ধন ছিন্ন করার চেয়ে এমন কোনো গুনাহ নেই যার শাস্তি আল্লাহ দুনিয়াতেই তাড়াতাড়ি দিয়ে থাকেন এবং আখেরাতেও অবশিষ্ট রাখেন।',
        translationEn: 'There is no sin more deserving that Allah hasten punishment in this world along with what He keeps in the Hereafter than oppression and severing ties...',
        referenceBn: 'সুনান আত-তিরমিজী: ২৫১১, আবু দাউদ: ৪৯০২',
        referenceEn: 'Sunan At-Tirmidhi: 2511, Abu Dawud: 4902'
      }
    ]
  },
  'অযু/ওযু': {
    nameEn: 'Ablution (Wudu)',
    nameAr: 'الوضوء والطهارة',
    icon: '💧',
    categoryBn: 'ইবাদত ও আমল',
    badgeBn: 'পবিত্রতা',
    descBn: 'সালাতের পূর্বশর্ত হিসেবে ওযু করার ৪টি ফরয ও পবিত্রতা অর্জনের ঐশী নির্দেশ।',
    ayahs: [
      {
        surahNumber: 5, ayahNumber: 6, globalNumber: 675,
        surahNameBn: 'আল-মায়িদাহ', surahNameAr: 'المائدة', surahNameEn: 'Al-Ma\'idah',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا إِذَا قُمْتُمْ إِلَى الصَّلَاةِ فَاغْسِلُوا وُجُوهَكُمْ وَأَيْدِيَكُمْ إِلَى الْمَرَافِقِ وَامْسَحُوا بِرُءُوسِكُمْ وَأَرْجُلَكُمْ إِلَى الْكَعْبَيْنِ',
        translationBn: 'হে ঈমানদারগণ! যখন তোমরা সালাতের জন্য দাঁড়াবে, তখন তোমাদের মুখমণ্ডল ও হাতগুলো কনুই পর্যন্ত ধৌত করো এবং তোমাদের মাথা মাসেহ করো এবং পাগুলো টাখনু পর্যন্ত ধৌত করো।',
        translationEn: 'O you who have believed, when you rise to [pray] prayer, wash your faces and your forearms to the elbows and wipe over your heads and wash your feet to the ankles.',
        transliterationBn: 'ইয়া আইয়ুহাল্লাযীনা আমানূ ইযা কুমতুম ইলাস সালাতি ফাগসিলূ উজূহাকুম ওয়া আইদিয়াকুম ইলাল মারাক্বি ওয়া মসাহূ বিরুঊসিকুম ওয়া আরজুলাকুম ইলাল কাবাইন...',
        themeNoteBn: 'ওযুর মূল চার ফরয অঙ্গের স্পষ্ট কুরআনিক নির্দেশ।'
      }
    ],
    hadiths: [
      {
        narratorBn: 'হযরত আবূ হুরায়রা (রা.) থেকে বর্ণিত:',
        narratorEn: 'Narrated Abu Hurairah (RA):',
        translationBn: 'নবী করীম (সা.) বলেছেন: পবিত্রতা অর্জন ব্যতীত কারও সালাত কবুল করা হয় না যতক্ষণ না সে ওযু করে।',
        translationEn: 'Allah does not accept prayer of anyone of you if he gets in a state of impurity until he performs ablution.',
        referenceBn: 'সহীহ বুখারী: ১৩৫, সহীহ মুসলিম: ২২৫',
        referenceEn: 'Sahih Al-Bukhari: 135, Sahih Muslim: 225'
      }
    ]
  },
  'অর্থনৈতিক বিধান': {
    nameEn: 'Islamic Economic Principles',
    nameAr: 'النظام الاقتصادي',
    icon: '📈',
    categoryBn: 'শরীয়ত ও সামাজিক আইন',
    badgeBn: 'অর্থনীতি',
    descBn: 'সুদমুক্ত অর্থব্যবস্থা, পারস্পরিক সন্তুষ্টিতে ব্যবসা এবং সমাজে সম্পদের সুবিচারপূর্ণ বণ্টন।',
    ayahs: [
      {
        surahNumber: 4, ayahNumber: 29, globalNumber: 522,
        surahNameBn: 'আন-নিসা', surahNameAr: 'النساء', surahNameEn: 'An-Nisa',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَأْكُلُوا أَمْوَالَكُم بَيْنَكُم بِالْبَاطِلِ إِلَّا أَن تَكُونَ تِجَارَةً عَن تَرَاضٍ مِّنكُمْ',
        translationBn: 'হে ঈমানদারগণ! তোমরা একে অপরের সম্পদ অন্যায়ভাবে ভক্ষণ কোরো না; তবে পারস্পরিক সন্তোষজনক ব্যবসার মাধ্যমে যা অর্জিত হয় তা বৈধ।',
        translationEn: 'O you who have believed, do not consume one another\'s wealth unjustly but only [in lawful] business by mutual consent.',
        transliterationBn: 'ইয়া আইয়ুহাল্লাযীনা আমানূ লা তা’কুলূ আমওয়ালাকুম বাইনাকুম বিল বাতিল...',
        themeNoteBn: 'ইসলামী অর্থনীতির ভিত্তি হলো শোষণমুক্ত সততা ও পারস্পরিক সম্মতি।'
      }
    ],
    hadiths: [
      {
        narratorBn: 'হযরত আবূ সাঈদ খুদরী (রা.) থেকে বর্ণিত:',
        narratorEn: 'Narrated Abu Sa\'id (RA):',
        translationBn: 'রাসূলুল্লাহ (সা.) ইরশাদ করেছেন: সত্যবাদী বিশ্বস্ত মুসলিম ব্যবসায়ী কিয়ামতের দিন নবী, সিদ্দীক ও শহীদগণের সাথে থাকবে।',
        translationEn: 'The honest and trustworthy merchant will be with the prophets, the truthful, and the martyrs.',
        referenceBn: 'সুনান আত-তিরমিজী: ১২০৯',
        referenceEn: 'Sunan At-Tirmidhi: 1209'
      }
    ]
  },
  'অলি বা অভিভাবক': {
    nameEn: 'Guardian & Protector (Wali)',
    nameAr: 'الولي والولاية',
    icon: '🤝',
    categoryBn: 'শরীয়ত ও সামাজিক আইন',
    badgeBn: 'অভিভাবকত্ব',
    descBn: 'মুমিনদের অভিভাবক আল্লাহ, রাসূল এবং পরস্পরের প্রতি ভ্রাতৃত্ব ও অভিভাবকত্বের দায়দায়িত্ব।',
    ayahs: [
      {
        surahNumber: 5, ayahNumber: 55, globalNumber: 724,
        surahNameBn: 'আল-মায়িদাহ', surahNameAr: 'المائدة', surahNameEn: 'Al-Ma\'idah',
        arabic: 'إِنَّمَا وَلِيُّكُمُ اللَّهُ وَرَسُولُهُ وَالَّذِينَ آمَنُوا الَّذِينَ يُقِيمُونَ الصَّلَاةَ وَيُؤْتُونَ الزَّكَاةَ وَهُمْ رَاكِعُونَ',
        translationBn: 'তোমাদের প্রকৃত অভিভাবক তো কেবল আল্লাহ, তাঁর রাসূল এবং মুমিনগণ যারা সালাত কায়েম করে ও রুকু অবস্থায় যাকাত দেয়।',
        translationEn: 'Your ally is none but Allah and [therefore] His Messenger and those who have believed - those who establish prayer and give zakah, and they bow.',
        transliterationBn: 'ইন্নামা ওলিইয়ুকুমুল্লাকু ওয়া রাসূলুহূ ওয়াল্লাযীনা আমানূ...',
        themeNoteBn: 'আল্লাহ, তাঁর রাসূল ও খাঁটি মুমিনরাই হলো বিশ্বাসীদের একমাত্র চিরস্থায়ী অলি বা বন্ধু।'
      }
    ],
    hadiths: [
      {
        narratorBn: 'হযরত আয়েশা (রা.) থেকে বর্ণিত:',
        narratorEn: 'Narrated Aisha (RA):',
        translationBn: 'রাসূলুল্লাহ (সা.) বলেছেন: অভিভাবকের অনুমতি ব্যতীত কোনো নারীর বিবাহ শুদ্ধ হবে না।',
        translationEn: 'There is no marriage without a guardian (Wali).',
        referenceBn: 'সুনান আত-তিরমিজী: ১১০১, আবু দাউদ: ২০৮৫',
        referenceEn: 'Sunan At-Tirmidhi: 1101, Abu Dawud: 2085'
      }
    ]
  },
  'অশ্লীলতা': {
    nameEn: 'Fahishah & Immorality',
    nameAr: 'الفاحشة والمنكر',
    icon: '🚫',
    categoryBn: 'নৈতিকতা ও আত্মশুদ্ধি',
    badgeBn: 'নিষেধাজ্ঞা',
    descBn: 'সব ধরনের প্রকাশ্য ও গোপন অশ্লীলতা থেকে বেঁচে থাকার কঠোর কুরআনিক আদেশ।',
    ayahs: [
      {
        surahNumber: 6, ayahNumber: 151, globalNumber: 940,
        surahNameBn: 'আল-আনআম', surahNameAr: 'الأنعام', surahNameEn: 'Al-An\'am',
        arabic: 'وَلَا تَقْرَبُوا الْفَوَاحِشَ مَا ظَهَرَ مِنْهَا وَمَا بَطَنَ',
        translationBn: 'আর তোমরা অশ্লীল কাজের কাছেও যেয়ো না—তা প্রকাশ্য হোক কিংবা অপ্রকাশ্য।',
        translationEn: 'And do not approach immoralities - what is apparent of them and what is concealed.',
        transliterationBn: 'ওয়া লা তাকরাবুল ফাওয়াাহিশা মা জাহারা মিনহা ওয়া মা বাত্বান...',
        themeNoteBn: 'প্রকাশ্য বা গোপন কোনো ধরনের অশ্লীলতার নিকটবর্তী হওয়াও নিষিদ্ধ।'
      }
    ],
    hadiths: [
      {
        narratorBn: 'হযরত আবদুল্লাহ ইবনে মাসউদ (রা.) থেকে বর্ণিত:',
        narratorEn: 'Narrated Abdullah bin Mas\'ud (RA):',
        translationBn: 'রাসূলুল্লাহ (সা.) বলেছেন: আল্লাহর চেয়ে আত্মমর্যাদাবোধসম্পন্ন আর কেউ নেই, একারণেই তিনি প্রকাশ্য ও অপ্রকাশ্য সকল অশ্লীলতাকে হারাম করেছেন।',
        translationEn: 'None has more sense of self-respect (Ghayrah) than Allah, and for that He has forbidden all shameful and immoral sins...',
        referenceBn: 'সহীহ বুখারী: ৪৬৩৪, সহীহ মুসলিম: ২৭৬০',
        referenceEn: 'Sahih Al-Bukhari: 4634, Sahih Muslim: 2760'
      }
    ]
  },
  'অসিয়ত': {
    nameEn: 'Wasiyyah (Bequest & Will)',
    nameAr: 'الوصية الشرعية',
    icon: '📜',
    categoryBn: 'শরীয়ত ও সামাজিক আইন',
    badgeBn: 'উইল',
    descBn: 'মৃত্যুর পূর্বে ন্যায়সঙ্গত অসিয়ত করা ও অসিয়ত পরিবর্তন করার নিষেধাজ্ঞা।',
    ayahs: [
      {
        surahNumber: 2, ayahNumber: 180, globalNumber: 187,
        surahNameBn: 'আল-বাকারা', surahNameAr: 'البقرة', surahNameEn: 'Al-Baqarah',
        arabic: 'كُتِبَ عَلَيْكُمْ إِذَا حَضَرَ أَحَدَكُمُ الْمَوْتُ إِن تَرَكَ خَيْرًا الْوَصِيَّةُ لِلْوَالِدَيْنِ وَالْأَقْرَبِينَ بِالْمَعْرُوفِ',
        translationBn: 'তোমাদের কারও যখন মৃত্যুর সময় উপস্থিত হয় এবং সে কোনো সম্পদ রেখে যায়, তবে তার জন্য ন্যায়সঙ্গতভাবে অসিয়ত করার নির্দেশ দেওয়া হয়েছে।',
        translationEn: 'Prescribed for you when death approaches one of you if he leaves wealth [is that he should make] a bequest for the parents and near relatives according to what is acceptable.',
        transliterationBn: 'কুটিবা আলাইকুম ইযা হাদারা আহাদাকুমুল মাউতু ইন তারাকা খাইরানিল ওয়াসিইয়্যাতু...',
        themeNoteBn: 'সম্পদের শরীয়াহসম্মত সুষ্ঠু বণ্টনে অসিয়তের বিধান।'
      }
    ],
    hadiths: [
      {
        narratorBn: 'হযরত আবদুল্লাহ ইবনে উমর (রা.) থেকে বর্ণিত:',
        narratorEn: 'Narrated Abdullah ibn Umar (RA):',
        translationBn: 'রাসূলুল্লাহ (সা.) বলেছেন: কোনো মুসলিমের এমন কোনো বিষয় থাকলে যাতে অসিয়ত করা দরকার, তার জন্য দুই রাত কাটানো উচিত নয় যতক্ষণ না তার লিখিত অসিয়ত তার কাছে থাকে।',
        translationEn: 'It is not permissible for any Muslim who has something to will to stay for two nights without having his will written and kept with him.',
        referenceBn: 'সহীহ বুখারী: ২৭৩৮, সহীহ মুসলিম: ১৬২৭',
        referenceEn: 'Sahih Al-Bukhari: 2738, Sahih Muslim: 1627'
      }
    ]
  },
  'অহংকার': {
    nameEn: 'Arrogance (Kibr)',
    nameAr: 'الكبر والغرور',
    icon: '🦁',
    categoryBn: 'নৈতিকতা ও আত্মশুদ্ধি',
    badgeBn: 'ধ্বংসাত্মক',
    descBn: 'জমিনে দম্ভভরে চলাফেরা বর্জন এবং অহংকারীদের প্রতি আল্লাহর শাস্তির সতর্কবার্তা।',
    ayahs: [
      {
        surahNumber: 31, ayahNumber: 18, globalNumber: 3487,
        surahNameBn: 'লুকমান', surahNameAr: 'لقمان', surahNameEn: 'Luqman',
        arabic: 'وَلَا تُصَعِّرْ خَدَّكَ لِلنَّاسِ وَلَا تَمْشِ فِي الْأَرْضِ مَرَحًا ۖ إِنَّ اللَّهَ لَا يُحِبُّ كُلَّ مُخْتَالٍ فَخُورٍ',
        translationBn: 'আর তুমি মানুষের দিক থেকে মুখ ফিরিয়ে অহংকার কোরো না এবং জমিনে দম্ভভরে পদচারণা কোরো না; নিশ্চয়ই আল্লাহ কোনো দাম্ভিক অহংকারীকে ভালোবাসেন না।',
        translationEn: 'And do not turn your cheek [in contempt] toward people and do not walk through the earth exultantly. Indeed, Allah does not like everyone self-deluded and boastful.',
        transliterationBn: 'ওয়া লা তুসাই’ইর খাদ্দাকা লিন্নাসি ওয়া লা তামশি ফিল আরদি মারাহা, ইন্নাল্লাহা লা ইয়ুহিব্বু কুল্লা মুখতালিন ফাখূর.',
        themeNoteBn: 'বিনয় মুমিনের ভূষণ এবং অহংকার ধ্বংসের মূল।'
      }
    ],
    hadiths: [
      {
        narratorBn: 'হযরত আবদুল্লাহ ইবনে মাসউদ (রা.) থেকে বর্ণিত:',
        narratorEn: 'Narrated Abdullah bin Mas\'ud (RA):',
        translationBn: 'নবীজী (সা.) ইরশাদ করেছেন: যার অন্তরে অণু পরিমাণও অহংকার থাকবে সে জান্নাতে প্রবেশ করবে না। অহংকার হলো সত্যকে অস্বীকার করা এবং মানুষকে তুচ্ছ জ্ঞান করা।',
        translationEn: 'He who has in his heart the weight of a mustard seed of pride will not enter Paradise. Pride is rejecting the truth and despising people.',
        referenceBn: 'সহীহ মুসলিম: ৯১',
        referenceEn: 'Sahih Muslim: 91'
      }
    ]
  }
};

fs.writeFileSync('scripts/presets_sample.json', JSON.stringify(TOPIC_PRESETS, null, 2));
console.log('Saved preset sample.');
