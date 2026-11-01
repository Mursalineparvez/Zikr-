export interface BattleMartyr {
  nameBn: string;
  nameEn: string;
  roleBn: string;
  roleEn: string;
  detailsBn: string;
  detailsEn: string;
}

export interface KeyBattleEvent {
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  descriptionEn: string;
  icon?: string;
}

export interface QuranRef {
  surahNameBn: string;
  surahNameEn: string;
  verseNo: string;
  arabic: string;
  translationBn: string;
  translationEn: string;
}

export interface HadithRef {
  sourceBn: string;
  sourceEn: string;
  arabic?: string;
  textBn: string;
  textEn: string;
}

export interface WarItem {
  id: string;
  orderNumber: number;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  eraKey: 'prophetic' | 'rashidun' | 'umayyad' | 'abbasid' | 'andalusian' | 'modern';
  eraBn: string;
  eraEn: string;
  dateBn: string;
  dateEn: string;
  locationBn: string;
  locationEn: string;
  location?: string;
  causeBn: string;
  causeEn: string;
  commanderMuslimsBn: string;
  commanderMuslimsEn?: string;
  commanderEnemyBn: string;
  commanderEnemyEn?: string;
  keyPersonalitiesBn: string[];
  keyPersonalitiesEn: string[];
  muslimForcesBn: string;
  muslimForcesEn: string;
  enemyForcesBn: string;
  enemyForcesEn: string;
  muslimMartyrsBn: string;
  muslimMartyrsEn?: string;
  enemyCasualtiesBn: string;
  enemyCasualtiesEn: string;
  detailedHistoryBn: string;
  detailedHistoryEn: string;
  emotionalStoryBn: string;
  emotionalStoryEn: string;
  shuhada: BattleMartyr[];
  keyEvents: KeyBattleEvent[];
  quranRefs?: QuranRef[];
  hadithRefs?: HadithRef[];
  historicalLessonsBn: string[];
  historicalLessonsEn: string[];
  references: string[];
}

export interface EraSectionMeta {
  key: WarItem['eraKey'];
  titleBn: string;
  titleEn: string;
  titleAr: string;
  timeframeBn: string;
  timeframeEn: string;
  descriptionBn: string;
  descriptionEn: string;
  accentColor: string;
  gradientDay: string;
  gradientNight: string;
  icon: string;
}

export const ERA_SECTIONS: EraSectionMeta[] = [
  {
    key: 'prophetic',
    titleBn: '১. নববি যুগ',
    titleEn: '1. Prophetic Era',
    titleAr: 'عصر النبوة الشريفة',
    timeframeBn: '২ হিজরি - ৯ হিজরি (৬২৪ - ৬৩০ খ্রিষ্টাব্দ)',
    timeframeEn: '2 AH - 9 AH (624 - 630 CE)',
    descriptionBn: 'রাসূলুল্লাহ (সা.)-এর সরাসরি পরিচালনা ও উপস্থিতিতে তাওহীদের সুরক্ষা এবং ইসলামি রাষ্ট্রের ভিত্তিপ্রস্তর স্থাপনের সোনালী অধ্যায়।',
    descriptionEn: 'The foundational golden era under the direct leadership of Prophet Muhammad (PBUH) securing truth and establishing the Islamic state.',
    accentColor: '#10b981',
    gradientDay: 'from-emerald-700 via-emerald-800 to-teal-900',
    gradientNight: 'from-[#07251e] via-[#0c362d] to-[#041914]',
    icon: '🕌',
  },
  {
    key: 'rashidun',
    titleBn: '২. খিলাফতে রাশিদা',
    titleEn: '2. Rashidun Caliphate',
    titleAr: 'عصر الخلافة الراشدة',
    timeframeBn: '১১ হিজরি - ৪১ হিজরি (৬৩২ - ৬৬১ খ্রিষ্টাব্দ)',
    timeframeEn: '11 AH - 41 AH (632 - 661 CE)',
    descriptionBn: 'চার খলিফার স্বর্ণযুগে পারস্য ও বাইজেন্টাইন রোমান পরাশক্তিকে পরাস্ত করে মধ্যপ্রাচ্য, শাম ও মিশরে ইনসাফ ও সাম্যের বিস্তার।',
    descriptionEn: 'The golden caliphate defeating the Persian Sassanid and Byzantine superpowers, spreading justice across the Levant, Egypt, and Iraq.',
    accentColor: '#3b82f6',
    gradientDay: 'from-blue-700 via-indigo-800 to-slate-900',
    gradientNight: 'from-[#091b31] via-[#0d2a4c] to-[#051121]',
    icon: '🛡️',
  },
  {
    key: 'umayyad',
    titleBn: '৩. উমাইয়া খিলাফত',
    titleEn: '3. Umayyad Caliphate',
    titleAr: 'الدولة الأموية',
    timeframeBn: '৪১ হিজরি - ১৩২ হিজরি (৬৬১ - ৭৫০ খ্রিষ্টাব্দ)',
    timeframeEn: '41 AH - 132 AH (661 - 750 CE)',
    descriptionBn: 'সিন্ধু থেকে স্পেন (আন্দালুস) ও ফ্রান্সের সীমান্ত পর্যন্ত বিশ্বব্যাপী ইসলামি সাম্রাজ্য ও সভ্যতার দ্রুততম দিগন্ত প্রসার।',
    descriptionEn: 'Historic rapid expansion reaching Sindh, Spain (Andalusia), and the borders of France.',
    accentColor: '#f59e0b',
    gradientDay: 'from-amber-600 via-amber-700 to-orange-900',
    gradientNight: 'from-[#2e1d05] via-[#432b07] to-[#1a1003]',
    icon: '🐎',
  },
  {
    key: 'abbasid',
    titleBn: '৪. আব্বাসি খিলাফত',
    titleEn: '4. Abbasid Caliphate',
    titleAr: 'الخلافة العباسية',
    timeframeBn: '১৩২ হিজরি - ৬৫৬ হিজরি (৭৫০ - ১২৫৮ খ্রিষ্টাব্দ)',
    timeframeEn: '132 AH - 656 AH (750 - 1258 CE)',
    descriptionBn: 'বাগদাদ কেন্দ্রিক জ্ঞান-বিজ্ঞানের স্বর্ণযুগ এবং সিল্ক রোড ও মধ্য এশিয়ায় ইসলামি শক্তির সুদৃঢ় অবস্থান।',
    descriptionEn: 'The Golden Age of Islamic learning and scientific prowess defending the frontiers from Baghdad to Central Asia.',
    accentColor: '#8b5cf6',
    gradientDay: 'from-purple-700 via-violet-800 to-slate-900',
    gradientNight: 'from-[#1c0e2e] via-[#2c1547] to-[#0a0412]',
    icon: '📜',
  },
  {
    key: 'andalusian',
    titleBn: '৫. আন্দালুসের যুগ',
    titleEn: '5. Andalusian Era',
    titleAr: 'العصر الأندلسي',
    timeframeBn: '৯২ হিজরি - ৮৯৭ হিজরি (৭১১ - ১৪৯২ খ্রিষ্টাব্দ)',
    timeframeEn: '92 AH - 897 AH (711 - 1492 CE)',
    descriptionBn: 'ইউরোপের বুকে কর্ডোভা ও গ্রানাডার ইসলামি সভ্যতা এবং শতবর্ষব্যাপী আত্মরক্ষা ও প্রতিরোধ সংগ্রাম।',
    descriptionEn: 'The radiant European civilization of Cordoba and Granada, standing steadfast across centuries.',
    accentColor: '#ec4899',
    gradientDay: 'from-rose-700 via-pink-800 to-slate-900',
    gradientNight: 'from-[#2e0b1d] via-[#47122e] to-[#12040c]',
    icon: '🏰',
  },
  {
    key: 'modern',
    titleBn: '৬. আধুনিক যুগ ও প্রতিরোধ',
    titleEn: '6. Modern Resistance',
    titleAr: 'التاريخ الحديث والتحرير',
    timeframeBn: 'উসমানীয় খেলাফতের পতন থেকে ফিলিস্তিন ও আল-আকসা মুক্তি সংগ্রাম',
    timeframeEn: 'From the fall of the Ottomans to the Ongoing Struggle for Al-Aqsa',
    descriptionBn: 'ঔপনিবেশিক শক্তির বিরুদ্ধে মুসলিম উম্মাহর আত্মরক্ষা, আল-আকসা ও হারানো অধিকার পুনরুদ্ধারের আপসহীন লড়াই।',
    descriptionEn: 'The unbroken, heroic resilience of the Muslim Ummah defending sacred sanctities and self-determination.',
    accentColor: '#06b6d4',
    gradientDay: 'from-cyan-700 via-teal-800 to-slate-900',
    gradientNight: 'from-[#042028] via-[#083542] to-[#020d11]',
    icon: '🕊️',
  },
];

export const ISLAMIC_WARS_DATA: WarItem[] = [
  // ==========================================
  // ১. নববি যুগ (৯টি যুদ্ধ ও অভিযান)
  // ==========================================
  {
    id: 'badr',
    orderNumber: 1,
    nameBn: 'বদর যুদ্ধ',
    nameEn: 'Battle of Badr',
    nameAr: 'غَزْوَةُ بَدْرٍ الكُبْرَى',
    eraKey: 'prophetic',
    eraBn: '১. নববি যুগ (২ হিজরি)',
    eraEn: '1. Prophetic Era (2 AH)',
    dateBn: '১৭ রমজান, ২ হিজরি (মার্চ ৬২৪ খ্রি.)',
    dateEn: '17 Ramadan, 2 AH (March 624 CE)',
    locationBn: 'বদর প্রান্তর, মদিনা মুনাওয়ারা থেকে দক্ষিণ-পশ্চিমে প্রায় ১৫০ কিমি',
    locationEn: 'Valley of Badr, 150 km Southwest of Madinah al-Munawwarah',
    causeBn: 'মক্কার কাফিরদের দীর্ঘ ১৩ বছরের অবর্ণনীয় নির্যাতন, হিজরতের পর মুসলিমদের ঘরবাড়ি ও সম্পদ বাজেয়াপ্ত করা এবং মদিনার নতুন ইসলামি রাষ্ট্র ধ্বংস করার সশস্ত্র আগ্রাসন প্রতিহত করা।',
    causeEn: 'Defense of Islam against 13 years of brutal persecution in Makkah, confiscation of Muslim homes and assets, and neutralizing aggressive military threats against the nascent state in Madinah.',
    commanderMuslimsBn: 'রাসূলুল্লাহ মুহাম্মদ (সা.)',
    commanderMuslimsEn: 'Prophet Muhammad (PBUH)',
    commanderEnemyBn: 'আবু জাহল (আমর ইবনে হিশাম)',
    commanderEnemyEn: 'Abu Jahl (Amr ibn Hisham)',
    keyPersonalitiesBn: ['হযরত হামজা (রা.)', 'হযরত আলী (রা.)', 'হযরত আবু বকর (রা.)', 'হযরত উবায়দাহ ইবনুল হারিস (রা.)'],
    keyPersonalitiesEn: ['Hamzah ibn Abdul-Muttalib (RA)', 'Ali ibn Abi Talib (RA)', 'Abu Bakr As-Siddiq (RA)', 'Ubaydah ibn al-Harith (RA)'],
    muslimForcesBn: '৩১৩ থেকে ৩১৪ জন (তরবারি মাত্র ৭০টি, উট ৭০টি, ঘোড়া ২টি)',
    muslimForcesEn: '313 to 314 Companions (Only 70 swords, 70 camels, 2 horses)',
    enemyForcesBn: 'প্রায় ১,০০০ সশস্ত্র সুসজ্জিত কুরাইশ সেনা (৭০০ উট, ১০০ ঘোড়া, ভারী লৌহ বর্ম)',
    enemyForcesEn: 'Approx. 1,000 elite Quraysh warriors (700 camels, 100 warhorses, heavy chainmail armor)',
    muslimMartyrsBn: '১৪ জন বীর সাহাবি (৬ জন মুহাজির ও ৮ জন আনসার)',
    muslimMartyrsEn: '14 Honored Sahaba (6 Muhajirun & 8 Ansar)',
    enemyCasualtiesBn: 'শীর্ষ ৭০ জন কাফির নেতা নিহত (আবু জাহল, উতবাহ, শায়বাহ, উমাইয়া ইবনে খালাফসহ) এবং ৭০ জন যুদ্ধবন্দি',
    enemyCasualtiesEn: '70 Quraysh chieftains slain (including Abu Jahl, Utbah, Shaybah, Umayyah ibn Khalaf) and 70 captured',
    detailedHistoryBn: 'বদর যুদ্ধ ছিল বিশ্ব ইতিহাসের অন্যতম গুরুত্বপূর্ণ মোড় পরিবর্তনকারী দিন, যাকে কুরআনে "ইয়াওমুল ফুরকান" (সত্য ও মিথ্যার পার্থক্যের দিন) বলা হয়েছে। মুসলিমরা কুরাইশদের লুণ্ঠিত সম্পদ বহনকারী বাণিজ্য কাফেলা আটক করতে বের হলেও, আবু সুফিয়ানের পথ পরিবর্তনের খবর পেয়ে আবু জাহল ১ হাজার সুসজ্জিত সেনাদল নিয়ে দাম্ভিক অহংকারে মুসলিমদের চিরতরে শেষ করে দিতে বদরে উপস্থিত হয়। জলের কূপগুলোর কৌশলগত নিয়ন্ত্রণ সাহাবি হুবাব ইবনুল মুনযির (রা.)-এর পরামর্শে রাসুল (সা.) নিজ নিয়ন্ত্রণে নেন। ১৭ রমজানের সকালে বিশ্বখ্যাত দ্বৈরথ যুদ্ধ (মুবারাজা) দিয়ে লড়াই শুরু হয়।',
    detailedHistoryEn: 'The Battle of Badr was the paramount turning point in human history, proclaimed by the Holy Quran as "Yawm al-Furqan" (The Day of Criterion). Although Muslims initially set out to intercept the caravan containing confiscated Makkan properties, Abu Jahl marched with an arrogant army of 1,000 warriors seeking to eradicate Islam forever. By accepting the tactical advice of Hubab ibn al-Mundhir (RA), the Prophet (PBUH) secured the vital freshwater wells of Badr, setting the stage for an epochal clash.',
    emotionalStoryBn: 'যুদ্ধের আগের রাতে যখন চারদিক নিস্তব্ধ, রাসুলুল্লাহ (সা.) বদরের আরিশ (তাঁবু)-তে সারারাত একাকী অশ্রুসিক্ত নয়নে সিজদায় লুটিয়ে পড়ে দুহাত তুলে কাঁদতে থাকেন। তাঁর গায়ের চাদর মোবারক খসে পড়ছিল। তিনি রবের দরবারে ফরিয়াদ জানান: "হে আল্লাহ! আজকের এই ছোট্ট দল যদি ধ্বংস হয়ে যায়, তবে পৃথিবীতে তোমার ইবাদত করার আর কেউ অবশিষ্ট থাকবে না!" হযরত আবু বকর (রা.) পরম মমতায় চাদর তুলে দিয়ে বললেন: "হে আল্লাহর রাসুল, যথেষ্ট হয়েছে; নিশ্চয়ই আপনার রব তাঁর প্রতিশ্রুতি পূর্ণ করবেন!" এর পরপরই আসমান থেকে জিব্রাইল ও মিকাইলের নেতৃত্বে ১,০০০ ফেরেশতার দল অবতরণ করে মুমিনদের বিজয় এনে দেন।',
    emotionalStoryEn: 'On the eve of battle, beneath the silent desert sky, the Messenger of Allah (PBUH) wept through the night prostrating in his small booth (Arish). His cloak slipped from his shoulders as he raised his hands in fervent supplication: "O Allah! If this small band of believers is destroyed today, You will never be worshipped on earth again!" Abu Bakr (RA) lovingly replaced his cloak and consoled him: "O Messenger of Allah, enough; your Lord will surely fulfill His promise!" Immediately thereafter, Allah sent 1,000 angels led by Jibril and Mika\'il to strike terror into the disbelievers\' hearts.',
    shuhada: [
      {
        nameBn: 'হযরত উবায়দাহ ইবনুল হারিস (রা.)',
        nameEn: 'Hazrat Ubaydah ibn al-Harith (RA)',
        roleBn: 'প্রথম মুবারাজা বীর ও রাসুল (সা.)-এর চাচাতো ভাই (মুহাজির)',
        roleEn: 'Hero of the opening duel, cousin of the Prophet (Muhajir)',
        detailsBn: 'বদরের প্রথম দ্বৈরথে উতবাহ ইবনে রাবিয়ার বিরুদ্ধে লড়ে মারাত্মকভাবে আহত হন। তাঁর পা কেটে যায়। যুদ্ধ শেষে কাফেলা আস-সাফরায় পৌঁছালে রাসুল (সা.)-এর কোলে মস্তক রেখে শাহাদাত বরণ করেন।',
        detailsEn: 'Fought Utbah ibn Rabi\'ah in the opening duel, suffering a fatal leg injury. He passed away at As-Safra resting his head upon the lap of the Prophet (PBUH).'
      },
      {
        nameBn: 'হযরত উমাইর ইবনুল হুমাম (রা.)',
        nameEn: 'Hazrat Umair ibn al-Humam (RA)',
        roleBn: 'আনসার বীর সাহাবি (বনু সালামাহ)',
        roleEn: 'Valiant Ansar companion (Banu Salamah)',
        detailsBn: 'রাসুল (সা.) যখন ঘোষণা করলেন: "এমন জান্নাতের দিকে এগিয়ে যাও যার প্রশস্ততা আসমান ও জমিনের সমান!" তিনি খেজুর খাচ্ছিলেন। সাথে সাথে খেজুর ফেলে বলে উঠলেন: "এই খেজুরগুলো খাওয়া পর্যন্ত বেঁচে থাকা তো অনেক দীর্ঘ জীবন!" এরপর একাকী শত্রু ব্যূহে ঝাঁপিয়ে পড়ে শহীদ হন।',
        detailsEn: 'Hearing the Prophet (PBUH) proclaim: "Rise towards Paradise, as vast as the heavens and earth!" he tossed away his dates declaring: "If I live to finish these dates, it is too long a life!" He charged straight into enemy lines and fell as a martyr.'
      },
      {
        nameBn: 'হযরত হারিসাহ ইবনে সুরাকাহ (রা.)',
        nameEn: 'Hazrat Harithah ibn Suraqah (RA)',
        roleBn: 'নওজোয়ান আনসার সাহাবি',
        roleEn: 'Young Ansar archer companion',
        detailsBn: 'হৌসের পানি পান করার সময় হঠাৎ একটি অজ্ঞাত তীর এসে তাঁর কণ্ঠনালীতে বিঁধে। তাঁর মা রাসুল (সা.)-এর কাছে এসে কাঁদলে নবীজী বললেন: "হে উম্মে হারিসাহ, জান্নাত কেবল একটি নয়, সেখানে বহু স্তর রয়েছে; আর তোমার ছেলে তো জান্নাতুল ফিরদাউসে স্থান পেয়েছে!"',
        detailsEn: 'Struck in the neck by a stray arrow while drinking water. His grieving mother inquired of his fate; the Prophet (PBUH) smiled: "O Umm Harithah, there are many gardens in Paradise, and your son has achieved the highest Jannat al-Firdaus!"'
      },
      {
        nameBn: 'হযরত মিহজা’ মাওলা উমর ইবনুল খাত্তাব (রা.)',
        nameEn: 'Hazrat Mihja\' (Mawla of Umar ibn al-Khattab RA)',
        roleBn: 'বদরের প্রথম শহীদ সাহাবি',
        roleEn: 'The very first martyr of Badr',
        detailsBn: 'বদরের রণাঙ্গনে শত্রু পক্ষের নিক্ষিপ্ত প্রথম তীরে শহীদ হন। তিনি ছিলেন ইসলামের অন্যতম সেরা নিঃস্বার্থ মুজাহিদ।',
        detailsEn: 'The first companion to fall on the battlefield of Badr, struck down by an enemy arrow while holding his post.'
      },
      {
        nameBn: 'হযরত সাফওয়ান ইবনে ওয়াহাব (রা.)',
        nameEn: 'Hazrat Safwan ibn Wahb (RA)',
        roleBn: 'মুহাজির সাহাবি (বনু ফিহর)',
        roleEn: 'Devoted Muhajir companion (Banu Fihr)',
        detailsBn: 'তলোয়ার হাতে কুরাইশদের প্রবল আক্রমণ প্রতিহত করতে গিয়ে বীরত্বের সাথে শাহাদাতের অমিয় সুধা পান করেন।',
        detailsEn: 'Fell heroically while repelling a massive counterattack from Quraysh cavalry.'
      },
      {
        nameBn: 'হযরত যুশ-শিমালাইন উমাইর ইবনে আবদে আমর (রা.)',
        nameEn: 'Hazrat Dhu al-Shamalayn Umair (RA)',
        roleBn: 'বিখ্যাত দুই হাত বিশিষ্ট যোদ্ধা সাহাবি',
        roleEn: 'Renowned two-handed swordsman',
        detailsBn: 'বদরের ময়দানে প্রচণ্ড সাহসিকতার সাথে শত্রুর ব্যূহ চূর্ণ করে শহীদ হন।',
        detailsEn: 'Cut deep through Quraysh ranks with immense bravery until attaining martyrdom.'
      },
      {
        nameBn: 'হযরত উমাইর ইবনে আবি ওয়াক্কাস (রা.)',
        nameEn: 'Hazrat Umair ibn Abi Waqqas (RA)',
        roleBn: 'সাদ ইবনে আবি ওয়াক্কাস (রা.)-এর ১৬ বছর বয়সী ছোট ভাই',
        roleEn: '16-year-old younger brother of Sa\'d ibn Abi Waqqas (RA)',
        detailsBn: 'বয়স কম হওয়ায় রাসুল (সা.) তাঁকে ফেরত পাঠাতে চাইলে তিনি কান্নায় ভেঙে পড়েন। তাঁর কান্না দেখে রাসুল (সা.) তাঁকে অনুমতি দেন। তিনি বীরত্বের সাথে লড়াই করে শহীদ হন।',
        detailsEn: 'Cried bitterly when the Prophet (PBUH) deemed him too young to participate. Moved by his tears, the Prophet permitted him, and he fell as one of Badr\'s youngest heroes.'
      }
    ],
    keyEvents: [
      {
        titleBn: '১. ঐতিহাসিক দ্বৈরথ যুদ্ধ (মুবারাজা)',
        titleEn: '1. The Heroic Opening Duels',
        descriptionBn: 'কুরাইশদের সেরা তিন বীর উতবাহ, শায়বাহ ও ওয়ালিদের বিপরীতে রাসুল (সা.) নিজ পরিবার থেকে হামজা, আলী ও উবায়দাহ (রা.)-কে পাঠান। হামজা ও আলী নিমেষেই নিজেদের শত্রুকে বধ করেন এবং আহত উবায়দাহকে উদ্ধার করেন।',
        descriptionEn: 'Utbah, Shaybah, and Walid challenged Muslims to duels. The Prophet sent Hamzah, Ali, and Ubaydah (RA). Hamzah and Ali dispatched their opponents instantly and aided Ubaydah.',
        icon: '⚔️'
      },
      {
        titleBn: '২. আসমানি ফেরেশতাদের প্রত্যক্ষ অবতরণ',
        titleEn: '2. Descent of the Angelic Host',
        descriptionBn: 'আল্লাহ তাআলা হাজারো ফেরেশতা পাঠিয়ে দেন যাদের পাগড়ির অংশ ঝুলছিল। তারা শত্রুদের ঘাড়ে ও আঙুলের ডগায় আঘাত হেনে কাফিরদের অন্তরে ত্রাস সৃষ্টি করেন।',
        descriptionEn: 'Allah sent a host of 1,000 angels wearing colored turbans who struck fear and inflicted fatal blows across the polytheist lines.',
        icon: '✨'
      },
      {
        titleBn: '৩. আবু জাহলের পতন ও কুরাইশ অহংকারের সমাপ্তি',
        titleEn: '3. Fall of the Tyrant Abu Jahl',
        descriptionBn: 'মুয়াজ ও মুয়াউয়িজ নামক দুই কিশোর আনসার সাহাবি আবু জাহলকে খুঁজে বের করে তরবারি দিয়ে ধরাশায়ী করেন। পরবর্তীতে আবদুল্লাহ ইবনে মাসউদ (রা.) তার শিরচ্ছেদ করেন।',
        descriptionEn: 'Two young Ansar boys, Mu\'adh and Mu\'awwadh, hunted down Abu Jahl and struck him down, and Abdullah ibn Mas\'ud severed his head.',
        icon: '👑'
      }
    ],
    quranRefs: [
      {
        surahNameBn: 'সূরা আল-আনফাল',
        surahNameEn: 'Surah Al-Anfal',
        verseNo: '৯-১০',
        arabic: 'إِذْ تَسْتَغِيثُونَ رَبَّكُمْ فَاسْتَجَابَ لَكُمْ أَنِّي مُمِدُّكُم بِأَلْفٍ مِّنَ الْمَلَائِكَةِ مُرْدِفِينَ',
        translationBn: 'স্মরণ কর, যখন তোমরা তোমাদের রবের নিকট সাহায্য প্রার্থনা করছিলে, তখন তিনি তোমাদের প্রার্থনা কবুল করলেন যে, আমি তোমাদেরকে পরপর আগমনকারী এক হাজার ফেরেশতা দিয়ে সাহায্য করব।',
        translationEn: 'Remember when you pleaded for help from your Lord, and He answered you: "I will reinforce you with a thousand angels, following one upon another."'
      },
      {
        surahNameBn: 'সূরা আলে ইমরান',
        surahNameEn: 'Surah Ali \'Imran',
        verseNo: '১২৩',
        arabic: 'وَلَقَدْ نَصَرَكُمُ اللَّهُ بِبَدْرٍ وَأَنتُمْ أَذِلَّةٌ ۖ فَاتَّقُوا اللَّهَ لَعَلَّكُمْ تَشْكُرُونَ',
        translationBn: 'আর নিশ্চিতভাবেই আল্লাহ তোমাদেরকে বদরে বিজয়ী করেছিলেন, অথচ তোমরা সংখ্যা ও সরঞ্জামে দুর্বল ছিলে। অতএব আল্লাহকে ভয় কর, যাতে তোমরা শোকরগুজার হতে পার।',
        translationEn: 'And Allah had already given you victory at Badr when you were few and weak in equipment. So fear Allah; perhaps you will be grateful.'
      }
    ],
    hadithRefs: [
      {
        sourceBn: 'সহিহ বুখারি, হাদিস নং ৩৯৯৫',
        sourceEn: 'Sahih al-Bukhari, Hadith 3995',
        arabic: 'هَذَا جِبْرِيلُ آخِذٌ بِرَأْسِ فَرَسِهِ، عَلَيْهِ أَدَاةُ الحَرْبِ',
        textBn: 'রাসুলুল্লাহ (সা.) বদরের দিনে ঘোষণা করলেন: এই যে জিব্রাইল (আ.) নিজের ঘোড়ার মাথায় হাত দিয়ে যুদ্ধের পূর্ণ সাজসজ্জায় প্রস্তুত হয়ে এসেছেন!',
        textEn: 'On the day of Badr, the Prophet (PBUH) proclaimed: "Here is Jibril holding the rein of his horse and equipped with war armor!"'
      }
    ],
    historicalLessonsBn: [
      'আল্লাহর ওপর নিখাদ তাওয়াক্কুল ও আন্তরিক প্রস্তুতি থাকলে অল্প সংখ্যা ও শূন্য রসদ নিয়েও পরাশক্তিকে চূর্ণ করা যায়।',
      'নেতার দূরদর্শিতা ও পরামর্শভিত্তিক সিদ্ধান্ত গ্রহণ (শূরা) সফলতার চাবিকাঠি।',
      'অহংকার ও আত্মগৌরব পতনের মূল কারণ, যার প্রমাণ আবু জাহলের শোচনীয় পরিণতি।'
    ],
    historicalLessonsEn: [
      'Unshakable reliance on Allah combined with sincere preparation conquers overwhelming superpowers.',
      'Consultative leadership (Shura) and tactical intelligence safeguard communities.',
      'Arrogance guarantees self-destruction, epitomized by the fall of Abu Jahl.'
    ],
    references: ['সহিহ আল-বুখারি', 'সহিহ মুসলিম', 'সীরাতে ইবনে হিশাম', 'আল-বিদায়া ওয়ান নিহায়া (ইবনে কাসির)', 'তারিখে তাবারী']
  },

  // ==========================================
  // ২. উহুদ যুদ্ধ
  // ==========================================
  {
    id: 'uhud',
    orderNumber: 2,
    nameBn: 'উহুদ যুদ্ধ',
    nameEn: 'Battle of Uhud',
    nameAr: 'غَزْوَةُ أُحُدٍ',
    eraKey: 'prophetic',
    eraBn: '১. নববি যুগ (৩ হিজরি)',
    eraEn: '1. Prophetic Era (3 AH)',
    dateBn: '৭ শাওয়াল, ৩ হিজরি (মার্চ ৬২৫ খ্রি.)',
    dateEn: '7 Shawwal, 3 AH (March 625 CE)',
    locationBn: 'উহুদ পাহাড়ের পাদদেশ, মদিনা মুনাওয়ারা থেকে প্রায় ৫ কিমি উত্তরে',
    locationEn: 'Slopes of Mount Uhud, 5 km North of Madinah al-Munawwarah',
    causeBn: 'বদরের শোচনীয় পরাজয়ের বদলা নিতে এবং নিজেদের বাণিজ্য পথ পুনরুদ্ধারের উদ্দেশ্যে কুরাইশদের ৩ হাজার দুর্ধর্ষ সৈন্য নিয়ে মদিনা আক্রমণের আগ্রাসী চক্রান্ত।',
    causeEn: 'Quraysh retaliation seeking vengeance for Badr, re-opening their northern trade routes, and destroying Madinah with a 3,000-strong coalition.',
    commanderMuslimsBn: 'রাসূলুল্লাহ মুহাম্মদ (সা.)',
    commanderMuslimsEn: 'Prophet Muhammad (PBUH)',
    commanderEnemyBn: 'আবু সুফিয়ান ইবনে হারব (ঘোড়সওয়ার সেনাপতি: খালিদ বিন ওয়ালিদ ও ইকরামা)',
    commanderEnemyEn: 'Abu Sufyan ibn Harb (Cavalry commanders: Khalid ibn al-Walid & Ikrimah)',
    keyPersonalitiesBn: ['হযরত হামজা (রা.)', 'হযরত মুসআব ইবনে উমাইর (রা.)', 'হযরত তালহা ইবনে উবায়দুল্লাহ (রা.)', 'হযরত আবু দুজানা (রা.)', 'হযরত হানজালা (রা.)'],
    keyPersonalitiesEn: ['Hamzah ibn Abdul-Muttalib (RA)', 'Mus\'ab ibn Umair (RA)', 'Talhah ibn Ubaydillah (RA)', 'Abu Dujana (RA)', 'Hanzalah ibn Abi Amir (RA)'],
    muslimForcesBn: '৭০০ জন সাহাবি (মুনাফিক সর্দার আবদুল্লাহ ইবনে উবাই মাঝপথ থেকে ৩০০ অনুসারী নিয়ে বিশ্বাসঘাতকতা করে ফিরে যায়)',
    muslimForcesEn: '700 steadfast Sahaba (Hypocrite leader Abdullah ibn Ubayy betrayed and retreated with 300 men)',
    enemyForcesBn: '৩,০০০ ভারী সশস্ত্র কুরাইশ যোদ্ধা (৩,০০০ উট, ২০০ ঘোড়া, ৭০০ ভারী লৌহ বর্ম)',
    enemyForcesEn: '3,000 heavily armored Quraysh troops (3,000 camels, 200 warhorses, 700 chainmail suits)',
    muslimMartyrsBn: '৭০ জন মহিমান্বিত সাহাবি (সাইয়্যিদুশ শুহাদা হযরত হামজাসহ ৬৫ জন আনসার ও ৫ জন মুহাজির)',
    muslimMartyrsEn: '70 Noble Martyrs (including Master of Martyrs Hamzah, 65 Ansar & 5 Muhajirun)',
    enemyCasualtiesBn: '২২ থেকে ২৩ জন কুরাইশ যোদ্ধা নিহত ও পতাকা বহনকারী পুরো বনু আবদিদ দার গোত্র নির্মূল',
    enemyCasualtiesEn: '22 to 23 Quraysh slain, including all consecutive standard-bearers of Banu Abd al-Dar',
    detailedHistoryBn: 'উহুদ যুদ্ধ ছিল মুসলিম উম্মাহর অন্যতম শ্রেষ্ঠ আত্মশুদ্ধি ও ইমানের মহাপরীক্ষার ক্ষেত্র। রাসুল (সা.) উহুদ পাহাড়কে পেছনে রেখে সুবিন্যস্ত প্রতিরক্ষা ব্যূহ গড়ে তোলেন এবং আবদুল্লাহ ইবনে জুবায়ের (রা.)-এর নেতৃত্বে ৫০ জন দক্ষ তীরন্দাজকে জাবালুর রুমাহ (তীরন্দাজদের টিলা)-তে মোতায়েন করেন। রাসুল (সা.) কঠোর নির্দেশ দিয়েছিলেন: "আমরা বিজয়ী হই বা পরাজিত হই, পাখিরা আমাদের লাশ ঠুকরে খেলেও তোমরা কোনো অবস্থায় এই টিলা ছাড়বে না!" যুদ্ধের প্রথমার্ধে মুসলিমরা কুরাইশ বাহিনীকে কচুকাটা করে পলায়নে বাধ্য করে। কিন্তু বিজয় নিশ্চিত ভেবে ৪০ জন তীরন্দাজ গনিমত সংগ্রহের লোভে টিলা ছেড়ে নেমে এলে খালিদ বিন ওয়ালিদ পেছন দিক থেকে আকস্মিক অশ্বারোহী আক্রমণ চালান, যা যুদ্ধের মোড় ঘুরিয়ে দেয়।',
    detailedHistoryEn: 'The Battle of Uhud was a crucible of supreme sacrifice and spiritual purification. Placing his back against Mount Uhud, the Prophet (PBUH) deployed 50 archers atop Mount Rumat under Abdullah ibn Jubayr (RA) with strict orders: "Even if you see birds plucking our flesh, never leave your post!" Initially, Muslim forces routed the Quraysh. However, believing the battle had concluded, 40 archers abandoned the ridge for booty. Spotting the gap, Khalid ibn al-Walid charged around the mountain, encircling Muslims in a ferocious rear ambush.',
    emotionalStoryBn: 'রণক্ষেত্রের সবচেয়ে হৃদয়বিদারক দৃশ্য ছিল রাসুলুল্লাহ (সা.)-এর চাচা, "আল্লাহর সিংহ" হযরত হামজা (রা.)-এর শাহাদাত। আবিসিনিয়ার দাস ওয়াহশি পেছন থেকে বর্শা ছুড়ে তাঁকে শহীদ করে এবং আবু সুফিয়ানের স্ত্রী হিন্দা তাঁর পেট চিরে কলিজা চিবিয়ে বিকৃত করে। রাসুল (সা.) তাঁর প্রিয় চাচার রক্তাক্ত ছিন্নভিন্ন দেহ দেখে অঝোরে কাঁদতে থাকেন। এদিকে স্বয়ং রাসুল (সা.)-এর ওপর চারদিক থেকে শিলাবৃষ্টি ও তলোয়ারের আঘাত আসতে থাকে। হযরত তালহা (রা.) রাসুল (সা.)-এর ঢাল হয়ে নিজের হাত ও বুক পেতে দেন, যার ফলে তাঁর হাত পক্ষাঘাতগ্রস্ত হয়ে যায়। রাসুল (সা.)-এর চেহারা রক্তাক্ত হয় ও শিরস্ত্রাণের লোহার আংটা কপালে বসে যায়। হযরত আবু উবাইদাহ (রা.) দাঁত দিয়ে সেই আংটা টানতে গিয়ে নিজের সামনের দুটি দাঁত হারিয়ে ফেলেন। তবুও রাসুল (সা.) প্রার্থনা করলেন: "হে আল্লাহ! আমার কওমকে ক্ষমা কর, কারণ তারা অজ্ঞ!"',
    emotionalStoryEn: 'The most heartbreaking episode was the martyrdom of Hamzah (RA), the "Lion of Allah". Wahshi hurled his javelin from hiding, and Hind mutilated his blessed body. The Prophet (PBUH) wept profoundly upon witnessing his uncle\'s body. As disbelievers swarmed the Prophet (PBUH), Talhah (RA) shielded him with his bare body, absorbing dozens of arrows until his hand was permanently paralyzed. An iron helmet ring pierced the Prophet\'s cheek, causing Abu Ubaidah (RA) to lose two front teeth pulling it out with his teeth. Bleeding, the Prophet prayed: "O Allah! Forgive my people, for they know not!"',
    shuhada: [
      {
        nameBn: 'সাইয়্যিদুশ শুহাদা হযরত হামজা ইবনে আব্দুল মুত্তালিব (রা.)',
        nameEn: 'Sayyid al-Shuhada Hamzah ibn Abdul-Muttalib (RA)',
        roleBn: 'রাসুল (সা.)-এর প্রিয় চাচা, আল্লাহর সিংহ (আসাদুল্লাহ)',
        roleEn: 'Beloved uncle of the Prophet (PBUH), Lion of Allah',
        detailsBn: 'একাই শত্রু বাহিনীকে ছিন্নভিন্ন করে বীর বিক্রমে লড়ছিলেন। জুবায়ের ইবনে মুতঈমের দাস ওয়াহশি দূর থেকে বিষাক্ত বর্শা নিক্ষেপ করে তাঁকে শহীদ করে। রাসুল (সা.) তাঁকে "সাইয়্যিদুশ শুহাদা" (শহীদদের সর্দার) ঘোষণা করেন।',
        detailsEn: 'Fought with titanic valor slaying key enemy warriors before being ambushed from behind by Wahshi\'s javelin. Proclaimed by the Prophet (PBUH) as the Chief of all Martyrs in Jannah.'
      },
      {
        nameBn: 'হযরত মুসআব ইবনে উমাইর (রা.)',
        nameEn: 'Hazrat Mus\'ab ibn Umair (RA)',
        roleBn: 'ইসলামের প্রথম রাষ্ট্রদূত ও উহুদের প্রধান পতাকা বাহক',
        roleEn: 'First ambassador of Islam & standard bearer at Uhud',
        detailsBn: 'মক্কার ধনকুবের তরুণ যিনি ইসলামের জন্য সব ছেড়েছিলেন। উহুদে তাঁর ডান হাত কেটে ফেলা হলে বাম হাতে পতাকা ধরেন; বাম হাতও কেটে ফেলা হলে দুই বাহু দিয়ে বুকে জড়িয়ে পতাকা ঊর্ধ্বে তুলে রাখেন। শাহাদাতের পর কাফনের এতটুকু কাপড় ছিল না যে মাথা ঢাকলে পা বের হয়ে যেত।',
        detailsEn: 'Once Makkah\'s wealthiest youth, he sacrificed all for Islam. In battle, when his right hand was severed, he gripped the banner with his left; when severed, he pressed it to his chest until struck down. At burial, his cloth was so short that covering his head exposed his feet.'
      },
      {
        nameBn: 'হযরত হানজালা ইবনে আবি আমির (রা.)',
        nameEn: 'Hazrat Hanzalah ibn Abi Amir (RA)',
        roleBn: 'গাসিলুল মালাইকা (ফেরেশতাদের দ্বারা গোসলপ্রাপ্ত শহীদ)',
        roleEn: 'Ghasil al-Mala\'ikah (The one washed by angels)',
        detailsBn: 'বিয়ের প্রথম বাসর রাতে যুদ্ধের আহ্বান শুনে ফরজ গোসল না করেই ময়দানে ছুটে আসেন। আবু সুফিয়ানকে প্রায় হত্যা করার মুহূর্তে শাদ্দাদ ইবনে আসওয়াদ তাঁকে শহীদ করে। রাসুল (সা.) বললেন: "আমি দেখছি আসমান ও জমিনের মাঝে ফেরেশতারা রৌপ্যপাত্রে মেঘের পানি দিয়ে হানজালাকে গোসল করাচ্ছে!"',
        detailsEn: 'Left his bride on their wedding night the moment he heard the call to arms, rushing without taking a bath. When martyred, the Prophet (PBUH) saw angels bathing him between heaven and earth with rainwater in silver basins.'
      },
      {
        nameBn: 'হযরত সাদ ইবনে রাবি’ (রা.)',
        nameEn: 'Hazrat Sa\'d ibn al-Rabi\' (RA)',
        roleBn: 'আনসারদের মহান নেতা ও দানবীর',
        roleEn: 'Prominent Ansar chieftain & leader',
        detailsBn: 'যুদ্ধের পর রাসুল (সা.) জায়েদ ইবনে সাবিতকে তাঁর খোঁজে পাঠালেন। মৃত্যুর কোলে ঢলে পড়ে বারোটি বর্শার জখমে কাতরাতে কাতরাতে বললেন: "রাসুল (সা.)-কে আমার সালাম দিও, আর আমার জাতিকে বলো—তোমাদের একটি চোখের পাতা স্পন্দিত থাকা পর্যন্ত যদি রাসুলের কোনো অনিষ্ট হয়, তবে আল্লাহর দরবারে তোমাদের কোনো অজুহাত গ্রহণযোগ্য হবে না!"',
        detailsEn: 'Found dying with twelve fatal wounds. His final words to Zayd ibn Thabit were: "Convey my Salam to Rasulullah, and tell my people: You have no excuse before Allah if anything harms the Prophet while an eye among you still blinks!"'
      },
      {
        nameBn: 'হযরত আমর ইবনুল জামুহ (রা.)',
        nameEn: 'Hazrat Amr ibn al-Jamuh (RA)',
        roleBn: 'পঙ্গু প্রবীণ আনসার সাহাবি',
        roleEn: 'Elderly lame Ansar companion',
        detailsBn: 'তিনি চরম খোঁড়া ছিলেন বলে চার ছেলে তাঁকে যুদ্ধে যেতে বারণ করেছিল। তিনি রাসুল (সা.)-এর দরবারে কেঁদে বললেন: "ইয়া রাসূলাল্লাহ! আমি আমার এই খোঁড়া পা নিয়ে জান্নাতে হেঁটে বেড়াতে চাই!" নবীজী অনুমতি দিলেন এবং তিনি বীর বিক্রমে লড়ে শহীদ হলেন।',
        detailsEn: 'Severely lame, his sons urged him to stay back. He wept to the Prophet: "O Messenger of Allah, I long to tread with this crippled leg into Jannah!" Permitted, he fought fiercely and achieved martyrdom.'
      },
      {
        nameBn: 'হযরত আনাস ইবনুন নযর (রা.)',
        nameEn: 'Hazrat Anas ibn al-Nadr (RA)',
        roleBn: 'হযরত আনাস ইবনে মালিক (রা.)-এর চাচা',
        roleEn: 'Uncle of Anas ibn Malik (RA)',
        detailsBn: 'যখন গুজব ছড়ালো যে রাসুল (সা.) শহীদ হয়েছেন, তখন তিনি সাহাবিদের বললেন: "রাসুল যদি শহীদ হয়ে থাকেন, তবে তাঁর পর বেঁচে থেকে কী লাভ? চলো, তিনি যেজন্য জীবন দিয়েছেন আমরাও সেখানে জীবন বিসর্জন দিই!" তিনি বলতেন: "আমি উহুদের পেছন থেকে জান্নাতের সুবাস পাচ্ছি!" তাঁর শরীরে আশিটিরও বেশি তলোয়ার ও তীরের আঘাত ছিল।',
        detailsEn: 'When false rumors spread that the Prophet had fallen, he exclaimed: "What will you do with life after him? Die for what he died for! By Allah, I smell the fragrance of Jannah coming from Uhud!" Found with over 80 wounds, recognizable only by his fingertips.'
      },
      {
        nameBn: 'হযরত আবদুল্লাহ ইবনে জাহশ (রা.)',
        nameEn: 'Hazrat Abdullah ibn Jahsh (RA)',
        roleBn: 'আল-মুজাদ্দা’ ফিল্লাহ (আল্লাহর রাস্তায় কান-নাক কর্তিত শহীদ)',
        roleEn: 'The companion martyred and mutilated for Allah',
        detailsBn: 'যুদ্ধের আগের রাতে সাদ ইবনে আবি ওয়াক্কাসের সাথে বসে দুআ করেছিলেন: "হে আল্লাহ! কাল এমন এক শক্তিশালী কাফিরের মুখোমুখি করো, যে আমাকে হত্যা করে আমার নাক-কান কেটে ফেলবে; যাতে কিয়ামতের দিন তুমি জিজ্ঞেস করলে বলতে পারি: তোমার ও তোমার রাসুলের জন্যই এই কুরবানি!" ঠিক তাই ঘটেছিল।',
        detailsEn: 'Supplicated the night before to face a savage foe who would slay him and cut off his nose and ears, so that on Judgment Day he could proclaim: "It was all for You and Your Messenger!" His prayer was fulfilled precisely.'
      }
    ],
    keyEvents: [
      {
        titleBn: '১. তীরন্দাজদের পাহাড়ি অবস্থান ও নির্দেশ লঙ্ঘন',
        titleEn: '1. The Breach of the Archers\' Ridge',
        descriptionBn: 'জাবালুর রুমাহর ৫০ জন তীরন্দাজের মধ্যে ৪০ জন বিজয় নিশ্চিত ভেবে রাসুল (সা.)-এর আদেশ অমান্য করে পাহাড় ছেড়ে নিচে নেমে আসে, যা যুদ্ধের মূল কাল হয়ে দাঁড়ায়।',
        descriptionEn: '40 out of 50 archers left their tactical post to collect war spoils, exposing the Muslim rear to disaster.',
        icon: '🏹'
      },
      {
        titleBn: '২. খালিদ বিন ওয়ালিদের সাঁড়াশি অশ্বারোহী আক্রমণ',
        titleEn: '2. Khalid ibn al-Walid\'s Cavalry Encirclement',
        descriptionBn: 'পাহাড় অরক্ষিত দেখে খালিদ বিন ওয়ালিদ তাঁর অশ্বারোহী দল নিয়ে পাহাড়ের পেছন দিক দিয়ে অতর্কিতে মুসলিমদের ওপর ঝাঁপিয়ে পড়েন।',
        descriptionEn: 'Khalid swiftly charged around the unguarded ridge, encircling and dividing the surprised Muslim ranks.',
        icon: '🐎'
      },
      {
        titleBn: '৩. রাসুল (সা.)-কে রক্ষায় সাহাবিদের মানবপ্রাচীর',
        titleEn: '3. Human Shield Defending the Prophet (PBUH)',
        descriptionBn: 'তালহা, আবু দুজানা ও সাদ ইবনে আবি ওয়াক্কাস নিজেদের শরীরকে ঢাল বানিয়ে রাসুল (সা.)-এর ওপর বর্ষিত শত শত তীর ও তলোয়ারের আঘাত প্রতিরোধ করেন।',
        descriptionEn: 'Talhah, Abu Dujana, and Sa\'d threw their own bodies as human shields absorbing lethal strikes aimed at the Prophet.',
        icon: '🛡️'
      }
    ],
    quranRefs: [
      {
        surahNameBn: 'সূরা আলে ইমরান',
        surahNameEn: 'Surah Ali \'Imran',
        verseNo: '১৪০-১৪২',
        arabic: 'إِن يَمْسَسْكُمْ قَرْحٌ فَقَدْ مَسَّ الْقَوْمَ قَرْحٌ مِّثْلُهُ ۚ وَتِلْكَ الْأَيَّامُ نُدَاوِلُهَا بَيْنَ النَّاسِ وَلِيَعْلَمَ اللَّهُ الَّذِينَ آمَنُوا وَيَتَّخِذَ مِنكُمْ شُهَدَاءَ',
        translationBn: 'যদি তোমরা আহত হয়ে থাক, তবে তারাও তো অনুরূপে আহত হয়েছে। আর এই দিনগুলোকে আমি মানুষের মধ্যে পালাক্রমে আবর্তন করি, যাতে আল্লাহ মুমিনদেরকে প্রকাশ করেন এবং তোমাদের মধ্য থেকে শহীদদেরকে গ্রহণ করেন।',
        translationEn: 'If a wound has touched you, be sure a similar wound touched the enemy. And so are the days that We alternate among men, that Allah may test those who believe, and choose martyrs from among you.'
      },
      {
        surahNameBn: 'সূরা আলে ইমরান',
        surahNameEn: 'Surah Ali \'Imran',
        verseNo: '১৬৯',
        arabic: 'وَلَا تَحْسَبَنَّ الَّذِينَ قُتِلُوا فِي سَبِيلِ اللَّهِ أَمْوَاتًا ۚ بَلْ أَحْيَاءٌ عِندَ رَبِّهِمْ يُرْزَقُونَ',
        translationBn: 'আর যারা আল্লাহর রাস্তায় নিহত হয়েছে তাদেরকে কখনো মৃত মনে করো না; বরং তারা তাদের রবের নিকট চিরঞ্জীব, রিজিকপ্রাপ্ত।',
        translationEn: 'Never think of those killed in the cause of Allah as dead. Rather, they are alive with their Lord, receiving provision.'
      }
    ],
    hadithRefs: [
      {
        sourceBn: 'সহিহ বুখারি, হাদিস নং ৪০৬৬',
        sourceEn: 'Sahih al-Bukhari, Hadith 4066',
        arabic: 'أُحُدٌ جَبَلٌ يُحِبُّنَا وَنُحِبُّهُ',
        textBn: 'রাসুলুল্লাহ (সা.) উহুদ পাহাড়ের দিকে তাকিয়ে ভালোবাসার সাথে বললেন: "এই উহুদ এমন এক পাহাড়, যা আমাদেরকে ভালোবাসে এবং আমরাও একে ভালোবাসি!"',
        textEn: 'Looking towards Mount Uhud, the Prophet (PBUH) affectionately remarked: "This is Uhud, a mountain that loves us and which we love!"'
      }
    ],
    historicalLessonsBn: [
      'সেনাপতি ও নেতার সামান্যতম নির্দেশ অমান্য করলেও নিশ্চিত বিজয় মারাত্মক বিপর্যয়ে রূপ নিতে পারে।',
      'দ্বীনের পথ কেবল আরামের নয়; এতে চরম ত্যাগ, শাহাদাত ও আত্মশুদ্ধির পরীক্ষা আসে।',
      'উহুদের শহীদগণ প্রমাণ করেছেন পার্থিব প্রাচুর্যের চেয়ে আল্লাহর সন্তুষ্টি ও রাসুলের প্রতি ভালোবাসাই প্রকৃত ঈমান।'
    ],
    historicalLessonsEn: [
      'Disobedience to tactical command, even momentary, can reverse decisive victory into tribulation.',
      'The path of faith demands resilience through testing, trials, and self-purification.',
      'The martyrs of Uhud demonstrated that unwavering devotion to the Prophet outweighs all worldly treasures.'
    ],
    references: ['সহিহ আল-বুখারি', 'সহিহ মুসলিম', 'সীরাতুন নবী (শিবলী নোমানী)', 'আল-বিদায়া ওয়ান নিহায়া', 'তাফসীরে ইবনে কাসির']
  },

  // ==========================================
  // ৩. খন্দক যুদ্ধ (আহযাবের যুদ্ধ)
  // ==========================================
  {
    id: 'khandaq',
    orderNumber: 3,
    nameBn: 'খন্দক যুদ্ধ (আহযাবের যুদ্ধ)',
    nameEn: 'Battle of the Trench (Al-Ahzab)',
    nameAr: 'غَزْوَةُ الخَنْدَقِ (الأَحْزَاب)',
    eraKey: 'prophetic',
    eraBn: '১. নববি যুগ (৫ হিজরি)',
    eraEn: '1. Prophetic Era (5 AH)',
    dateBn: 'শাওয়াল - জিলকদ, ৫ হিজরি (মার্চ ৬২৭ খ্রি.)',
    dateEn: 'Shawwal - Dhu al-Qi\'dah, 5 AH (March 627 CE)',
    locationBn: 'মদিনা মুনাওয়ারার উত্তর সীমানা প্রান্তর',
    locationEn: 'Northern Perimeter of Madinah al-Munawwarah',
    causeBn: 'ইহুদি গোত্র বনু নাজির ও মক্কার কুরাইশদের প্ররোচনায় সমগ্র আরবের পৌত্তলিক ও ইহুদিদের সমন্বয়ে গঠিত সম্মিলিত ১০ থেকে ১২ হাজার সৈন্যের যৌথ জোট বাহিনী (আহযাব) কর্তৃক মদিনাকে সমূলে ধ্বংস করার মহাসংগ্রাম।',
    causeEn: 'A colossal confederacy of 10,000+ warriors instigated by Banu Nadir and Quraysh seeking to completely annihilate the Muslim sanctuary of Madinah.',
    commanderMuslimsBn: 'রাসূলুল্লাহ মুহাম্মদ (সা.)',
    commanderMuslimsEn: 'Prophet Muhammad (PBUH)',
    commanderEnemyBn: 'আবু সুফিয়ান ও ইহুদি নেতা হুয়াই ইবনে আখতাব',
    commanderEnemyEn: 'Abu Sufyan & Jewish chieftain Huyayy ibn Akhtab',
    keyPersonalitiesBn: ['হযরত সালমান ফার্সি (রা.)', 'হযরত আলী (রা.)', 'হযরত সাদ ইবনে মুআজ (রা.)', 'হযরত নুআইম ইবনে মাসউদ (রা.)'],
    keyPersonalitiesEn: ['Salman al-Farsi (RA)', 'Ali ibn Abi Talib (RA)', 'Sa\'d ibn Mu\'adh (RA)', 'Nu\'aym ibn Mas\'ud (RA)'],
    muslimForcesBn: '৩,০০০ জন ক্ষুধার্ত ও শীতার্ত সাহাবি',
    muslimForcesEn: '3,000 exhausted and freezing Sahaba',
    enemyForcesBn: '১০,০০০ থেকে ১২,০০০ সম্মিলিত জোট সেনা (ঘোড়া, উট ও আধুনিক সমরাস্ত্র সমৃদ্ধ)',
    enemyForcesEn: '10,000 to 12,000 allied confederates (Ahzab) with overwhelming cavalry',
    muslimMartyrsBn: '৬ জন মহিমান্বিত সাহাবি (আউস গোত্রপতি হযরত সাদ ইবনে মুআজ রা. সহ)',
    muslimMartyrsEn: '6 Honored Sahaba (including Sa\'d ibn Mu\'adh RA, chief of Aus)',
    enemyCasualtiesBn: '৮ জন নিহত ও সম্পূর্ণ জোট ছত্রভঙ্গ হয়ে পলায়ন',
    enemyCasualtiesEn: '8 slain; complete panic and disintegration of the enemy alliance',
    detailedHistoryBn: 'খন্দকের যুদ্ধ ছিল মদিনার মুসলমানদের ওপর অস্তিত্ব টিকিয়ে রাখার সবচেয়ে কঠিন ও শ্বাসরুদ্ধকর অবরোধ। মদিনার পূর্ব ও পশ্চিমে দুর্ভেদ্য আগ্নেয় লাভা পাথরের পর্বত থাকায় একমাত্র উত্তর দিক দিয়েই অশ্বারোহী আক্রমণ সম্ভব ছিল। পারস্যের সাহাবি হযরত সালমান ফার্সি (রা.) মদিনার ইতিহাসে সর্বপ্রথম সুবিশাল প্রতিরক্ষামূলক পরিখা (খন্দক) খননের প্রস্তাব দেন। রাসুল (সা.) স্বয়ং কোদাল হাতে পরিখা খননে অংশ নেন। কনকনে শীত ও খাদ্যাভাবে সাহাবিদের পেটে পাথর বাঁধা ছিল। প্রায় এক মাস দীর্ঘ অবরোধ চলার পর আল্লাহ তাআলা প্রচণ্ড ঝড়ো হাওয়া ও গায়েবি ফেরেশতাদের ত্রাস সৃষ্টি করে জোট বাহিনীকে পলায়নে বাধ্য করেন।',
    detailedHistoryEn: 'The Battle of Khandaq was an existential siege. Madinah was naturally fortified by rugged lava fields east and west, leaving only the open northern plain vulnerable. Salman al-Farsi (RA) proposed digging a massive defensive trench—a revolutionary tactic unknown to Arab warfare. The Prophet (PBUH) personally labored with pickaxe despite binding stones to his abdomen due to famine. After nearly a month of freezing siege, Allah unleashed a fierce hurricane and invisible angelic forces that dismantled the confederate camp.',
    emotionalStoryBn: 'পরিখা খননের সময় একটি দুর্ভেদ্য বিশাল সাদা পাথর কোনোভাবেই ভাঙা যাচ্ছিল না। সাহাবিরা ক্লান্ত হয়ে রাসুল (সা.)-কে ডাকলেন। রাসুল (সা.) বিসমিল্লাহ বলে কোদাল দিয়ে আঘাত করলেন। প্রথম আঘাতে বিদ্যুৎ চমকে উঠল, রাসুল (সা.) বললেন: "আল্লাহু আকবার! আমাকে পারস্য ও রোমের রাজপ্রাসাদের চাবি দেওয়া হয়েছে!" এরপর তিনি দ্বিতীয় ও তৃতীয় আঘাটে ইয়েমেন ও সিরিয়া বিজয়ের সুসংবাদ দিলেন। ক্ষুধার্ত, শীতে কাঁপতে থাকা সাহাবিদের তখন এমন ভবিষ্যদ্বাণী অলৌকিক মনে হলেও মাত্র কয়েক দশকে তা অক্ষরে অক্ষরে সত্য প্রমাণিত হয়েছিল। অবরোধের শেষ রাতে হুজাইফা ইবনুল ইয়ামান (রা.) গোপনে শত্রু শিবিরে ঢুকে দেখেন তীব্র শীতে তাদের তাঁবু উড়ে যাচ্ছে এবং হাঁড়িপাতিল উল্টে গিয়ে আবু সুফিয়ান নিজেই পালানোর নির্দেশ দিচ্ছে।',
    emotionalStoryEn: 'During digging, companions struck an unyielding white boulder. The Prophet (PBUH) took the pickaxe and struck it; sparks flew and he proclaimed: "Allahu Akbar! I have been granted the keys of the Persian palaces!" Upon second and third strikes, he foretold the conquests of Byzantine Syria and Yemen. In the depths of cold, hunger, and peril, this vision seemed impossible, yet materialized within decades. On the final night, Hudhayfah (RA) infiltrated the enemy camp to find tents shredded by divine gales and pots overturned, forcing Abu Sufyan into shameful retreat.',
    shuhada: [
      {
        nameBn: 'হযরত সাদ ইবনে মুআজ (রা.)',
        nameEn: 'Hazrat Sa\'d ibn Mu\'adh (RA)',
        roleBn: 'আউস গোত্রের সর্বাধিনায়ক ও মদিনার প্রধান আনসার নেতা',
        roleEn: 'Supreme Chieftain of Aus and premier Ansar leader',
        detailsBn: 'পরিখা পাহারা দেওয়ার সময় ইবনুল আরিকাহর বিষাক্ত তীর তাঁর বাহুর মূল ধমনীতে (আকহাল) বিঁধে। তিনি দুআ করেছিলেন: "হে আল্লাহ! বনু কুরাইজার বিশ্বাসঘাতকতার বিচার নিজের চোখে না দেখা পর্যন্ত আমার প্রাণ নিও না!" বনু কুরাইজার বিচার সম্পন্নের পর তাঁর ক্ষত ফেটে রক্তক্ষরণে শাহাদাত বরণ করেন। তাঁর মৃত্যুতে আল্লাহর আরশ কেঁপে উঠেছিল এবং ৭০ হাজার ফেরেশতা তাঁর জানাজায় অংশ নেন।',
        detailsEn: 'Struck in the medial arm vein by an enemy arrow while guarding the trench. He prayed to survive until witnessing justice against the treacherous Banu Qurayza. After delivering his verdict, his wound ruptured and he passed away. The Throne of the Most Merciful shook at his death, and 70,000 angels descended for his funeral.'
      },
      {
        nameBn: 'হযরত আনাস ইবনে আওস (রা.)',
        nameEn: 'Hazrat Anas ibn Aws (RA)',
        roleBn: 'আনসার মুজাহিদ সাহাবি',
        roleEn: 'Ansar defender of the trench',
        detailsBn: 'শত্রুপক্ষের নিক্ষিপ্ত তীরে পরিখা পাহারা দেওয়া অবস্থায় শহীদ হন।',
        detailsEn: 'Fell at his defensive post along the trench line, struck by an archer.'
      },
      {
        nameBn: 'হযরত সালামাহ ইবনে সাবিত (রা.)',
        nameEn: 'Hazrat Salamah ibn Thabit (RA)',
        roleBn: 'আনসার বীর সাহাবি',
        roleEn: 'Devout Ansar warrior',
        detailsBn: 'পরিখার ওপর অতর্কিত আক্রমণ প্রতিহত করতে গিয়ে শাহাদাতের অমিয় সুধা পান করেন।',
        detailsEn: 'Martyred while repelling a night assault across the trench perimeter.'
      }
    ],
    keyEvents: [
      {
        titleBn: '১. সালমান ফার্সি (রা.)-এর পরিখা খনন কৌশল',
        titleEn: '1. Salman al-Farsi\'s Trench Strategy',
        descriptionBn: 'আরবদের অপরিচিত পারস্য সামরিক কৌশল প্রয়োগ করে ৩ হাজার সাহাবি ২০ দিনে মদিনার উত্তর প্রান্তে সাড়ে ৫ কিমি দীর্ঘ পরিখা খনন করেন।',
        descriptionEn: '3,000 companions excavated a 5.5 km wide defensive moat in 20 freezing days, shocking the Arab cavalry.',
        icon: '⛏️'
      },
      {
        titleBn: '২. আলী (রা.) বনাম আমর ইবনে আবদে ওদ-এর ঐতিহাসিক দ্বৈরথ',
        titleEn: '2. Ali (RA) slays Amr ibn Abd Wudd',
        descriptionBn: 'আরবের ১ হাজার যোদ্ধার সমান শক্তিশালী দৈত্যাকার যোদ্ধা আমর পরিখা পার হয়ে চ্যালেঞ্জ দিলে হযরত আলী (রা.) এগিয়ে গিয়ে তাকে ধূলায় মিশিয়ে দেন।',
        descriptionEn: 'The giant pagan champion Amr vaulted the trench challenging any Muslim. Ali (RA) engaged him in single combat and decapitated him.',
        icon: '⚔️'
      },
      {
        titleBn: '৩. কুদরতি প্রচণ্ড ঝড় ও জোটের পতন',
        titleEn: '3. The Divine Hurricane & Camp Evacuation',
        descriptionBn: 'এক মাসের অবরোধ শেষে আল্লাহ তাআলা এমন শৈত্যঝড় পাঠান যে শত্রুর তাঁবু, আগুন ও হাঁড়িপাতিল উল্টে যায় এবং জোট ভয়ে পালিয়ে যায়।',
        descriptionEn: 'A freezing tempest shattered the enemy encampment, blowing away their tents and fires, forcing immediate panic-stricken evacuation.',
        icon: '🌪️'
      }
    ],
    quranRefs: [
      {
        surahNameBn: 'সূরা আল-আহযাব',
        surahNameEn: 'Surah Al-Ahzab',
        verseNo: '৯-১১',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا نِعْمَةَ اللَّهِ عَلَيْكُمْ إِذْ جَاءَتْكُمْ جُنُودٌ فَأَرْسَلْنَا عَلَيْهِمْ رِيحًا وَجُنُودًا لَّمْ تَرَوْهَا',
        translationBn: 'হে মুমিনগণ! তোমাদের ওপর আল্লাহর নিয়ামতের কথা স্মরণ কর, যখন তোমাদের বিরুদ্ধে শত্রুবাহিনী সমবেত হয়েছিল; তখন আমি তাদের ওপর পাঠিয়েছিলাম প্রচণ্ড বাতাস এবং এমন এক সেনাদল (ফেরেশতা) যাদের তোমরা দেখতে পাওনি।',
        translationEn: 'O you who have believed, remember the favor of Allah upon you when armies came to attack you and We sent upon them a wind and armies you did not see.'
      }
    ],
    hadithRefs: [
      {
        sourceBn: 'সহিহ বুখারি, হাদিস নং ৪১১০',
        sourceEn: 'Sahih al-Bukhari, Hadith 4110',
        arabic: 'الآنَ نَغْزُوهُمْ وَلاَ يَغْزُونَنَا، نَحْنُ نَسِيرُ إِلَيْهِمْ',
        textBn: 'খন্দক যুদ্ধের পর রাসুলুল্লাহ (সা.) ভবিষ্যদ্বাণী করলেন: "এখন থেকে আমরা তাদের বিরুদ্ধে অভিযান চালাব, তারা আর কখনো আমাদের ওপর আক্রমণ করতে পারবে না!"',
        textEn: 'After Khandaq, the Prophet (PBUH) declared: "Now we will launch military expeditions against them, and they will never attack us again; we will march upon them!"'
      }
    ],
    historicalLessonsBn: [
      'প্রযুক্তি ও উদ্ভাবনী কৌশল (পরিখা খনন) ইসলামে অত্যন্ত প্রশংসিত ও সুন্নাত।',
      'চরম ক্ষুধা ও অস্তিত্বের সংকটেও মুমিনের ঈমান আল্লাহর কুদরতের ওপর অবিচল থাকে।',
      'শত্রু জোটের ভেতর মনস্তাত্ত্বিক যুদ্ধ পরিচালনা করা বিজয়ের একটি প্রধান সামরিক অঙ্গ।'
    ],
    historicalLessonsEn: [
      'Innovation and tactical engineering (like trench fortification) represent sunnah-aligned military wisdom.',
      'Even amid famine and mortal siege, authentic faith draws direct divine intervention.',
      'Psychological disruption of enemy alliances is an indispensable weapon of defense.'
    ],
    references: ['সহিহ আল-বুখারি', 'সহিহ মুসলিম', 'সীরাতে ইবনে হিশাম', 'আল-বিদায়া ওয়ান নিহায়া', 'তারিখে তাবারী']
  },

  // ==========================================
  // ৪. হুদাইবিয়ার যুগান্তকারী সন্ধি
  // ==========================================
  {
    id: 'hudaibiyah',
    orderNumber: 4,
    nameBn: 'হুদাইবিয়ার যুগান্তকারী সন্ধি',
    nameEn: 'Treaty of Hudaybiyyah',
    nameAr: 'صُلْحُ الحُدَيْبِيَةِ (فَتْحٌ مُبِين)',
    eraKey: 'prophetic',
    eraBn: '১. নববি যুগ (৬ হিজরি)',
    eraEn: '1. Prophetic Era (6 AH)',
    dateBn: 'জিলকদ, ৬ হিজরি (মার্চ ৬২৮ খ্রি.)',
    dateEn: 'Dhu al-Qi\'dah, 6 AH (March 628 CE)',
    locationBn: 'হুদাইবিয়া প্রান্তর (মক্কা মুকাররমার সীমানা সংলগ্ন বর্তমান আশ-শুমায়সি)',
    locationEn: 'Plain of Hudaybiyyah (Al-Shumaysi, near Makkah boundary)',
    causeBn: 'উমরাহ পালনের উদ্দেশ্যে মদিনা থেকে নিরস্ত্র ১,৪০০ সাহাবি নিয়ে আগমনের পর কুরাইশদের পথরোধ এবং রক্তপাতহীন ঐতিহাসিক শান্তিচুক্তি সম্পাদন।',
    causeEn: 'Peaceful pilgrim caravan of 1,400 unarmed Muslims halted by Quraysh, culminating in a historic non-aggression pact.',
    commanderMuslimsBn: 'রাসূলুল্লাহ মুহাম্মদ (সা.)',
    commanderMuslimsEn: 'Prophet Muhammad (PBUH)',
    commanderEnemyBn: 'সুহাইল ইবনে আমর (কুরাইশদের প্রধান প্রতিনিধি)',
    commanderEnemyEn: 'Suhayl ibn Amr (Quraysh Plenipotentiary)',
    keyPersonalitiesBn: ['হযরত উসমান (রা.)', 'হযরত আবু বকর (রা.)', 'হযরত আলী (রা.)', 'হযরত উমর (রা.)'],
    keyPersonalitiesEn: ['Uthman ibn Affan (RA)', 'Abu Bakr As-Siddiq (RA)', 'Ali ibn Abi Talib (RA)', 'Umar ibn al-Khattab (RA)'],
    muslimForcesBn: '১,৪০০ জন মুমূর্ষু বায়য়াতে রিদওয়ানকারী সাহাবি (কেবলমাত্র আত্মরক্ষার কোষবদ্ধ তরবারি ব্যতীত সম্পূর্ণ নিরস্ত্র)',
    muslimForcesEn: '1,400 companions bound by the Pledge of Ridwan (Unarmed except for sheathed travel blades)',
    enemyForcesBn: 'কুরাইশ মৈত্রী পরিষদ ও তাদের সশস্ত্র অশ্বারোহী পাহারা',
    enemyForcesEn: 'Quraysh military council and vanguard cavalry',
    muslimMartyrsBn: 'রক্তপাতহীন চুক্তি (কোনো শাহাদাত ঘটেনি; তবে এটি ছিল ইসলামের শ্রেষ্ঠতম আধ্যাত্মিক বিজয়)',
    muslimMartyrsEn: 'Bloodless peace pact (No martyrs; recognized by Allah as a Manifest Victory)',
    enemyCasualtiesBn: 'কোনো সংঘর্ষ হয়নি; শান্তির মাধ্যমে ইসলাম আরবের ঘরে ঘরে প্রবেশ করে',
    enemyCasualtiesEn: 'None; peaceful diplomatic breakthrough opening Arabia to Islam',
    detailedHistoryBn: 'হুদাইবিয়ার সন্ধি ছিল ইসলামের রাজনৈতিক ও কূটনৈতিক ইতিহাসের সবচেয়ে দূরদর্শী ও যুগান্তকারী মোড়। কুরাইশরা যখন মক্কায় প্রবেশে বাধা দেয় এবং দূত হিসেবে প্রেরিত হযরত উসমান (রা.)-কে হত্যার গুজব রটে, তখন রাসুল (সা.) বাবলা গাছের নিচে সাহাবিদের কাছ থেকে "মৃত্যুর শপথ" (বায়য়াতে রিদওয়ান) গ্রহণ করেন। এতে ভীত হয়ে কুরাইশরা সুহাইল ইবনে আমরকে শান্তিচুক্তির জন্য পাঠায়। চুক্তির শর্তগুলো ظاهراً (বাহ্যত) মুসলিমদের প্রতিকূলে মনে হয়েছিল, এমনকি হযরত উমর (রা.) প্রথমে অত্যন্ত ব্যথিত হয়েছিলেন। কিন্তু রাসুল (সা.) জানতেন শান্তির সুযোগে মানুষ ইসলামের সৌন্দর্য দেখার সুযোগ পাবে। বাস্তবে চুক্তির পর মাত্র দুই বছরে যে পরিমাণ মানুষ ইসলাম গ্রহণ করে, তা আগের বিশ বছরেও করেনি। খালিদ বিন ওয়ালিদ ও আমর ইবনুল আস এই শান্তির যুগেই ইসলাম গ্রহণ করেন।',
    detailedHistoryEn: 'The Treaty of Hudaybiyyah was a masterstroke of divine diplomacy. When rumors spread that Uthman (RA), sent as an emissary, had been murdered, the Prophet summoned 1,400 companions under an acacia tree to take the Pledge of the Tree (Bay\'at al-Ridwan) to fight to the death. Terrified by their resolve, Quraysh dispatched Suhayl ibn Amr to negotiate a 10-year truce. While its terms appeared unfavorable on the surface—troubling companions like Umar (RA)—peace allowed Islam to be discussed freely. Within two years, more people embraced Islam than in all preceding decades combined, including titans like Khalid ibn al-Walid and Amr ibn al-Aas.',
    emotionalStoryBn: 'চুক্তি লেখার সময় সুহাইল ইবনে আমর আপত্তি জানিয়ে বলল: "বিসমিল্লাহির রাহমানির রাহিম" লেখা যাবে না, লিখতে হবে "বিইসমিকা আল্লাহুম্মা"; আর "মুহাম্মদুর রাসুলুল্লাহ"-র জায়গায় লিখতে হবে "মুহাম্মদ ইবনে আবদুল্লাহ"। আলী (রা.) রাসুলুল্লাহর নাম মুছতে অস্বীকৃতি জানালে, স্বয়ং রাসুল (সা.) নিজ পবিত্র হাত দিয়ে সেই শব্দ মুছে দেন। এরপর মক্কার মুসলিম বন্দি আবু জান্দাল শিকল জড়িয়ে পায়ে হেঁটে এসে সাহায্য প্রার্থনা করলে, চুক্তির শর্ত রক্ষার্থে রাসুল (সা.) তাঁকে সান্ত্বনা দিয়ে বললেন: "ধৈর্য ধরো আবু জান্দাল! নিশ্চয়ই আল্লাহ তোমার ও তোমার মতো মজলুমদের মুক্তির ব্যবস্থা করবেন।" অঙ্গীকার রক্ষার এই চরম পরাকাষ্ঠা দেখে কাফিরদের হৃদয় পর্যন্ত কেঁপে উঠেছিল।',
    emotionalStoryEn: 'During drafting, Suhayl protested against writing "In the name of Allah, the Most Merciful" and objected to "Muhammad, the Messenger of Allah", insisting on "Muhammad, son of Abdullah". When Ali (RA) wept and refused to erase "Messenger of Allah", the Prophet took the parchment and erased the title with his own hand. Moments later, Abu Jandal (Suhayl\'s own abused Muslim son) arrived in dragging chains begging for asylum. Bound by his word, the Prophet consoled him: "Be patient, Abu Jandal! Allah will provide a way out for you." This heroic adherence to treaties stunned Arab witness.',
    shuhada: [],
    keyEvents: [
      {
        titleBn: '১. বাবলা বৃক্ষের নিচে ঐতিহাসিক বায়য়াতে রিদওয়ান',
        titleEn: '1. The Pledge of the Tree (Bay\'at al-Ridwan)',
        descriptionBn: 'উসমান (রা.)-এর শাহাদাতের গুজবে ১,৪০০ সাহাবি রাসুল (সা.)-এর হাতে হাত রেখে শেষ রক্তবিন্দু পর্যন্ত লড়াইয়ের শপথ নেন, যার প্রশংসা স্বয়ং আল্লাহ কুরআনে করেছেন।',
        descriptionEn: 'Believing Uthman martyred, 1,400 Sahaba pledged life and limb to the Prophet under the acacia tree, immortalized in Surah al-Fath.',
        icon: '🌳'
      },
      {
        titleBn: '২. সুহাইল ইবনে আমরের সাথে চুক্তি স্বাক্ষর',
        titleEn: '2. The 10-Year Peace Pact',
        descriptionBn: '১০ বছরের যুদ্ধবিরতি এবং আরবের যেকোনো গোত্র যেকারো সাথে মিত্রতা করার স্বাধীনতা লাভ করে।',
        descriptionEn: 'A 10-year non-aggression truce established, granting total freedom for tribes to ally with Muslims or Quraysh.',
        icon: '📜'
      },
      {
        titleBn: '৩. কুরআন কর্তৃক "ফাতহুম মুবীন" (প্রকাশ্য বিজয়) ঘোষণা',
        titleEn: '3. Divine Proclamation of "Manifest Victory"',
        descriptionBn: 'মদিনায় ফেরার পথে সূরা আল-ফাতহ নাজিল হয়, যেখানে আল্লাহ তাআলা এই সন্ধিকে প্রকাশ্য মহাবিজয় আখ্যা দেন।',
        descriptionEn: 'Surah al-Fath was revealed on the return journey, declaring this treaty a "Manifest Victory" that would unlock all Arabia.',
        icon: '🌟'
      }
    ],
    quranRefs: [
      {
        surahNameBn: 'সূরা আল-ফাতহ',
        surahNameEn: 'Surah Al-Fath',
        verseNo: '১',
        arabic: 'إِنَّا فَتَحْنَا لَكَ فَتْحًا مُّبِينًا',
        translationBn: 'নিশ্চয়ই আমি আপনার জন্য এক প্রকাশ্য ও সুস্পষ্ট বিজয় উন্মুক্ত করে দিয়েছি।',
        translationEn: 'Indeed, We have granted you a clear, manifest victory.'
      },
      {
        surahNameBn: 'সূরা আল-ফাতহ',
        surahNameEn: 'Surah Al-Fath',
        verseNo: '১৮',
        arabic: 'لَّقَدْ رَضِيَ اللَّهُ عَنِ الْمُؤْمِنِينَ إِذْ يُبَايِعُونَكَ تَحْتَ الشَّجَرَةِ',
        translationBn: 'অবশ্যই আল্লাহ মুমিনদের প্রতি সন্তুষ্ট হয়েছেন, যখন তারা গাছের নিচে আপনার কাছে বাইয়াত গ্রহণ করছিল।',
        translationEn: 'Certainly was Allah pleased with the believers when they pledged allegiance to you under the tree.'
      }
    ],
    hadithRefs: [
      {
        sourceBn: 'সহিহ বুখারি, হাদিস নং ২৭৩১',
        sourceEn: 'Sahih al-Bukhari, Hadith 2731',
        arabic: 'أَنْتُمْ خَيْرُ أَهْلِ الأَرْضِ',
        textBn: 'রাসুলুল্লাহ (সা.) হুদাইবিয়ায় উপস্থিত ১,৪০০ সাহাবিকে উদ্দেশ্য করে বললেন: "আজকের দিনে তোমরা এই পৃথিবীর সর্বশ্রেষ্ঠ মানব!"',
        textEn: 'The Prophet (PBUH) addressed the 1,400 companions at Hudaybiyyah: "Today, you are the best people on the face of the earth!"'
      }
    ],
    historicalLessonsBn: [
      'দূরদর্শী শান্তিচুক্তি তাৎক্ষণিক যুদ্ধের চেয়ে বহুগুণ বেশি কার্যকর বিজয় এনে দিতে পারে।',
      'চুক্তির শর্ত পূরণ ও অঙ্গীকার রক্ষা মুমিনের ঈমানের চূড়ান্ত মাপকাঠি।',
      'আল্লাহর রাসুল (সা.)-এর সিদ্ধান্তের ওপর পূর্ণ আস্থা রাখলে ظاهরি ক্ষতিও চূড়ান্ত বিজয়ে রূপ নেয়।'
    ],
    historicalLessonsEn: [
      'Visionary diplomacy and peace can conquer hearts far more profoundly than open warfare.',
      'Honoring pledged treaties, even when painful, establishes moral authority.',
      'Trusting the wisdom of the Prophet converts apparent setbacks into supreme triumphs.'
    ],
    references: ['সহিহ আল-বুখারি', 'সহিহ মুসলিম', 'সীরাতে ইবনে হিশাম', 'আল-বিদায়া ওয়ান নিহায়া']
  },

  // ==========================================
  // ৫. খাইবার যুদ্ধ
  // ==========================================
  {
    id: 'khaibar',
    orderNumber: 5,
    nameBn: 'খাইবার যুদ্ধ',
    nameEn: 'Conquest of Khaybar',
    nameAr: 'غَزْوَةُ خَيْبَرَ',
    eraKey: 'prophetic',
    eraBn: '১. নববি যুগ (৭ হিজরি)',
    eraEn: '1. Prophetic Era (7 AH)',
    dateBn: 'মুহররম, ৭ হিজরি (মে ৬২৮ খ্রি.)',
    dateEn: 'Muharram, 7 AH (May 628 CE)',
    locationBn: 'খাইবার মরূদ্যান, মদিনা মুনাওয়ারা থেকে উত্তর-পশ্চিমে ১৫০ কিমি',
    locationEn: 'Oasis of Khaybar, 150 km Northwest of Madinah al-Munawwarah',
    causeBn: 'খাইবারে সমবেত হওয়া ইহুদি গোত্রসমূহের মদিনা রাষ্ট্র বিরোধী ক্রমাগত চক্রান্ত, আরব পৌত্তলিকদের অর্থায়ন এবং মুসলিমদের ওপর বারবার যৌথ হামলার ষড়যন্ত্রের চূড়ান্ত অবসান ঘটানো।',
    causeEn: 'Neutralizing the heavily fortified Jewish citadel of Khaybar after repeated conspiracies, financing anti-Islamic coalitions, and threatening Madinah.',
    commanderMuslimsBn: 'রাসূলুল্লাহ মুহাম্মদ (সা.) (পতাকাবাহী বীর: হযরত আলী রা.)',
    commanderMuslimsEn: 'Prophet Muhammad (PBUH) (Standard Bearer: Ali ibn Abi Talib RA)',
    commanderEnemyBn: 'মারহাব ও ইয়াসির (খাইবারের প্রধান বীর ও দুর্গপতি)',
    commanderEnemyEn: 'Marhab & Yasir (Legendary Khaybar chieftains and duelists)',
    keyPersonalitiesBn: ['হযরত আলী ইবনে আবু তালিব (রা.)', 'হযরত মাহমুদ ইবনে মাসলামাহ (রা.)', 'হযরত সাফিইয়া বিনতে হুয়াই (রা.)'],
    keyPersonalitiesEn: ['Ali ibn Abi Talib (RA)', 'Mahmud ibn Maslamah (RA)', 'Safiyyah bint Huyayy (RA)'],
    muslimForcesBn: '১,৪০০ থেকে ১,৫০০ পদাতিক ও ২০০ অশ্বারোহী (হুদাইবিয়ায় অংশগ্রহণকারী মুজাহিদগণ)',
    muslimForcesEn: '1,400 to 1,500 infantry and 200 cavalry (The companions of Hudaybiyyah)',
    enemyForcesBn: '১০,০০০ থেকে ২০,০০০ সুরক্ষিত ইহুদি যোদ্ধা (আটটি দুর্ভেদ্য পাথুরে কেল্লা সমৃদ্ধ)',
    enemyForcesEn: '10,000 to 20,000 entrenched warriors inside eight formidable stone fortresses',
    muslimMartyrsBn: '১৬ থেকে ১৮ জন বীর সাহাবি (হযরত মাহমুদ ইবনে মাসলামাহ রা. সহ)',
    muslimMartyrsEn: '16 to 18 Sahaba (including Mahmud ibn Maslamah RA)',
    enemyCasualtiesBn: '৯৩ জন কুখ্যাত যোদ্ধা নিহত এবং আটটি দুর্ভেদ্য দুর্গের সম্পূর্ণ পতন',
    enemyCasualtiesEn: '93 enemy warriors slain, complete surrender of all eight fortresses',
    detailedHistoryBn: 'খাইবার ছিল উত্তর আরবের সবচেয়ে সুরক্ষিত দুর্গবেষ্টিত ধনকুবের মরূদ্যান। নাটাহ, শিক ও কাতায়েবাহ অঞ্চলে বিভক্ত আটটি বিশাল পাথুরে কেল্লা জয়ে একের পর এক দিন কেটে যাচ্ছিল। দুর্ধর্ষ কামুস দুর্গ জয় করা অসম্ভব মনে হচ্ছিল। তখন রাসুল (সা.) এক ঐতিহাসিক ঘোষণা দিলেন: "আগামীকাল আমি এমন এক ব্যক্তির হাতে ইসলামের বিজয়ী পতাকা তুলে দেব, যাকে আল্লাহ ও তাঁর রাসুল ভালোবাসেন এবং তিনিও আল্লাহ ও তাঁর রাসুলকে ভালোবাসেন; আল্লাহ তাঁর হাতেই বিজয় দান করবেন!" সাহাবিরা সারারাত ব্যাকুল হয়ে অপেক্ষা করছিলেন সেই সৌভাগ্যবান কে হবেন। সকালে রাসুল (সা.) ডাকলেন চক্ষু ব্যথায় আক্রান্ত হযরত আলী (রা.)-কে। তিনি নিজের মুখের লালা মোবারক আলীর চোখে লাগিয়ে দিতেই চোখের সব ব্যথা মুহূর্তে দূর হয়ে যায়। আলী (রা.) দুর্গের দিকে ধাবিত হয়ে দৈত্যাকার মারহাবকে দ্বিখণ্ডিত করেন এবং দুর্গের ভারী লৌহ কপাট তুলে ধরে ঢাল হিসেবে ব্যবহার করে কামুস দুর্গ জয় করেন।',
    detailedHistoryEn: 'Khaybar was an imposing bastion comprising eight formidable stone fortresses across three zones. Siege operations stalled at the impregnable fortress of Qamus. The Prophet (PBUH) announced: "Tomorrow I will hand the banner to a man who loves Allah and His Messenger, and whom Allah and His Messenger love; Allah will grant victory through his hands!" The companions spent the night hoping to be chosen. The next morning, the Prophet summoned Ali (RA), who was suffering from acute eye infection. Applying his blessed saliva, Ali was cured instantly. Ali advanced, split the giant Marhab with a single blow, ripped a massive iron fortress door to use as a shield, and breached Qamus.',
    emotionalStoryBn: 'খাইবারের অন্যতম হৃদয়স্পর্শী ঘটনা ছিল আসওয়াদ আর-রাঈ (কৃষ্ণকায় মেষপালক)-এর ইসলাম গ্রহণ। খাইবারের ইহুদিদের এক হাবশি রাখাল রাসুল (সা.)-এর নূরানী চেহারা দেখে বলল: "আমি যদি ইসলাম গ্রহণ করি তবে আমার কী হবে?" রাসুল (সা.) বললেন: "তুমি আমাদের দ্বীনি ভাই হবে এবং জান্নাতের অংশীদার হবে।" রাখাল ইসলাম গ্রহণ করল। রাসুল (সা.) তাকে নির্দেশ দিলেন: "প্রথমে তোমার মালিকদের এই মেষগুলো তাদের দুর্গের দরজায় পৌঁছে দিয়ে আসো, কারণ ইসলামে আমানতের খেয়ানত হারাম!" রাখাল মেষগুলো ফিরিয়ে দিয়ে যুদ্ধে যোগ দিল এবং কিছুক্ষণ পরেই সে শহীদ হলো। রাসুল (সা.) তাঁর মরদেহের কাছে এসে বললেন: "আল্লাহ এই বান্দাকে জান্নাতে সম্মানিত করেছেন; সে এক ওয়াক্ত নামাজ পড়ার সময়ও পায়নি অথচ জান্নাতি হয়ে গেছে!"',
    emotionalStoryEn: 'One of Khaybar\'s touching moments was the shepherd Aswad al-Ra\'i. A black slave herding sheep for Jewish masters approached the Prophet: "What if I accept Islam?" The Prophet replied: "You are our brother in faith and an inheritor of Paradise." He accepted Islam. The Prophet instructed: "First return these sheep to your masters\' fortress gate, for Islam forbids betrayal of trusts!" Returning the sheep, he joined the battle and was martyred within hours. The Prophet knelt beside him and proclaimed: "Allah has honored him; he did not have time to pray a single prostration, yet he is in Paradise!"',
    shuhada: [
      {
        nameBn: 'হযরত মাহমুদ ইবনে মাসলামাহ (রা.)',
        nameEn: 'Hazrat Mahmud ibn Maslamah (RA)',
        roleBn: 'আনসার বীর যোদ্ধা (মুহাম্মদ বিন মাসলামার ভাই)',
        roleEn: 'Valiant Ansar hero (brother of Muhammad ibn Maslamah)',
        detailsBn: 'দুর্গ প্রাচীরের নিচে লড়াই করার সময় মারহাব দুর্গ উপর থেকে জাঁতার পাথর নিক্ষেপ করে। সেই পাথরের আঘাতে তিনি গুরুতর জখম হয়ে তিন দিন পর শাহাদাত বরণ করেন।',
        detailsEn: 'Struck by a heavy millstone hurled by Marhab from atop the ramparts, succumbing to his injuries three days later.'
      },
      {
        nameBn: 'হযরত আসওয়াদ আর-রাঈ (রা.)',
        nameEn: 'Hazrat Aswad al-Ra\'i (RA)',
        roleBn: 'নবদীক্ষিত হাবশি রাখাল সাহাবি',
        roleEn: 'Newly converted Abyssinian shepherd',
        detailsBn: 'ইসলাম গ্রহণের কয়েক ঘণ্টার মধ্যে শহীদ হন। এক ওয়াক্ত নামাজ আদায়ের সুযোগ না পেয়েও রাসুল (সা.)-এর জবানিতে জান্নাতের সুসংবাদপ্রাপ্ত হন।',
        detailsEn: 'Martyred hours after accepting Islam without having prostrated a single prayer, celebrated by the Prophet as an inhabitant of Firdaus.'
      },
      {
        nameBn: 'হযরত আমির ইবনুল আকওয়া (রা.)',
        nameEn: 'Hazrat Amir ibn al-Akwa\' (RA)',
        roleBn: 'খ্যাত কবি ও দ্রুতগামী পদাতিক যোদ্ধা সাহাবি',
        roleEn: 'Celebrated poet and fleet-footed warrior',
        detailsBn: 'খাইবারে বীরত্বের সাথে লড়তে গিয়ে নিজের তলোয়ারের খাপ উল্টে পায়ের নালীতে আঘাত লেগে অতিরিক্ত রক্তক্ষরণে শহীদ হন। রাসুল (সা.) তাঁর জন্য দুটি জান্নাতের ঘোষণা দেন।',
        detailsEn: 'Fell in furious combat against Marhab\'s vanguard; the Prophet praised him with double the reward of typical martyrs.'
      }
    ],
    keyEvents: [
      {
        titleBn: '১. আলী (রা.)-এর হাতে বিজয়ী পতাকা অর্পণ',
        titleEn: '1. Handing the Standard to Ali (RA)',
        descriptionBn: 'রাসুল (সা.) আলী (রা.)-এর চোখের রোগ নিরাময় করে পতাকা দেন এবং বলেন: তোমার দ্বারা যদি একজন মানুষও হেদায়েত পায়, তবে তা লাল উটের চেয়েও উত্তম।',
        descriptionEn: 'The Prophet healed Ali\'s eye affliction and handed him the standard, advising that guiding one soul is superior to red camels.',
        icon: '🚩'
      },
      {
        titleBn: '২. দৈত্যাকার মারহাবের সাথে ঐতিহাসিক দ্বৈরথ',
        titleEn: '2. The Epic Duel against Marhab',
        descriptionBn: 'মারহাব গর্ব করে বলল: খাইবার জানে আমি মারহাব, অস্ত্রশস্ত্রে সুসজ্জিত বীর! আলী (রা.) জবাব দিলেন: আমি সে, যার মা নাম রেখেছিল হায়দার (সিংহ)! এক আঘাতে মারহাব দ্বিখণ্ডিত হয়।',
        descriptionEn: 'Marhab boasted of his invincibility. Ali countered: "I am he whose mother named him Haidar (The Lion)!" splitting him in one blow.',
        icon: '⚔️'
      },
      {
        titleBn: '৩. জাফর আত-তাইয়ার ও আশয়ারি কাফেলার আগমন',
        titleEn: '3. Return of Ja\'far from Abyssinia',
        descriptionBn: 'খাইবার বিজয়ের দিনে আবিসিনিয়ার মুহাজির জাফর (রা.) ও আবু মুসা আশয়ারি এসে পৌঁছান। রাসুল (সা.) বলেন: আমি জানি না কোনটিতে বেশি আনন্দিত হব—খাইবার বিজয়ে নাকি জাফরের আগমনে!',
        descriptionEn: 'Ja\'far returned from Abyssinia on the day of victory. The Prophet kissed his forehead: "I know not which brings me greater joy—Khaybar\'s conquest or the arrival of Ja\'far!"',
        icon: '🤝'
      }
    ],
    quranRefs: [
      {
        surahNameBn: 'সূরা আল-ফাতহ',
        surahNameEn: 'Surah Al-Fath',
        verseNo: '২০',
        arabic: 'وَعَدَكُمُ اللَّهُ مَغَانِمَ كَثِيرَةً تَأْخُذُونَهَا فَعَجَّلَ لَكُمْ هَٰذِهِ',
        translationBn: 'আল্লাহ তোমাদেরকে বিপুল পরিমাণ গনিমতের প্রতিশ্রুতি দিয়েছিলেন যা তোমরা লাভ করবে; তিনি তোমাদের জন্য এটি দ্রুত ত্বরান্বিত করেছেন।',
        translationEn: 'Allah has promised you much booty that you will take [in the future] and has hastened for you this [victory of Khaybar].'
      }
    ],
    hadithRefs: [
      {
        sourceBn: 'সহিহ বুখারি, হাদিস নং ৩৭২৪',
        sourceEn: 'Sahih al-Bukhari, Hadith 3724',
        arabic: 'لأُعْطِيَنَّ الرَّايَةَ غَدًا رَجُلاً يُحِبُّ اللَّهَ وَرَسُولَهُ، وَيُحِبُّهُ اللَّهُ وَرَسُولُهُ، يَفْتَحُ اللَّهُ عَلَى يَدَيْهِ',
        textBn: 'রাসুলুল্লাহ (সা.) ঘোষণা করলেন: "আগামীকাল আমি এমন এক ব্যক্তির হাতে পতাকা তুলে দেব, যে আল্লাহ ও তাঁর রাসুলকে ভালোবাসে এবং আল্লাহ ও তাঁর রাসুলও তাকে ভালোবাসেন; তাঁর হাতেই আল্লাহ বিজয় দান করবেন!"',
        textEn: 'The Prophet (PBUH) proclaimed: "Tomorrow I will give the banner to a man who loves Allah and His Messenger, and whom Allah and His Messenger love; Allah will grant victory through his hands!"'
      }
    ],
    historicalLessonsBn: [
      'রাষ্ট্রের অভ্যন্তরীণ ষড়যন্ত্রকারী ও চরমপন্থী দুর্গকে নির্মূল করা দীর্ঘমেয়াদী শান্তির পূর্বশর্ত।',
      'ইসলামে আমানতের মর্যাদা এমন যে যুদ্ধাবস্থাতেও শত্রুর গচ্ছিত সম্পদ ফেরত দেওয়া ফরজ।',
      'দ্বীনের খেদমতে নিষ্ঠাবান হলে মুহূর্তের মধ্যেই মানুষের মর্যাদা আসমানে উন্নীত হয়।'
    ],
    historicalLessonsEn: [
      'Neutralizing subversive fortified enemy strongholds is indispensable for lasting regional tranquility.',
      'Islamic ethics mandate honoring trusts (Amanah) even toward active combatants.',
      'Sincere devotion elevates a person\'s heavenly rank in a single hour of courage.'
    ],
    references: ['সহিহ আল-বুখারি', 'সহিহ মুসলিম', 'সীরাতে ইবনে হিশাম', 'আল-বিদায়া ওয়ান নিহায়া', 'তারিখে তাবারী']
  },

  // ==========================================
  // ৬. মক্কা বিজয়
  // ==========================================
  {
    id: 'makkah_conquest',
    orderNumber: 6,
    nameBn: 'মক্কা বিজয়',
    nameEn: 'Conquest of Makkah',
    nameAr: 'فَتْحُ مَكَّةَ المُكَرَّمَةِ (الفَتْحُ الأَعْظَم)',
    eraKey: 'prophetic',
    eraBn: '১. নববি যুগ (৮ হিজরি)',
    eraEn: '1. Prophetic Era (8 AH)',
    dateBn: '২০ রমজান, ৮ হিজরি (জানুয়ারি ৬৩০ খ্রি.)',
    dateEn: '20 Ramadan, 8 AH (January 630 CE)',
    locationBn: 'মক্কা মুকাররমা ও পবিত্র হারাম শরিফ প্রান্তর',
    locationEn: 'Makkah al-Mukarramah & Holy Sanctuary (Haram)',
    causeBn: 'কুরাইশদের মিত্র বনু বকর গোত্র কর্তৃক হুদাইবিয়ার চুক্তি লঙ্ঘন করে মুসলিমদের মিত্র বনু খুজাআহ গোত্রের ওপর বর্বরোচিত হামলা ও কুরাইশদের অস্ত্র সরবরাহ।',
    causeEn: 'Quraysh breaking the Treaty of Hudaybiyyah by aiding Banu Bakr in an unprovoked massacre against the Prophet\'s allies, Banu Khuza\'ah.',
    commanderMuslimsBn: 'রাসূলুল্লাহ মুহাম্মদ (সা.) (ব্যাটালিয়ন সেনাপতি: খালিদ বিন ওয়ালিদ, যুবায়ের, আবু উবাইদাহ ও সাদ বিন উবাদা)',
    commanderMuslimsEn: 'Prophet Muhammad (PBUH) (Detachments led by Khalid, Zubayr, Abu Ubaidah & Sa\'d)',
    commanderEnemyBn: 'আবু সুফিয়ান ইবনে হারব (বিনা শর্তে আত্মসমর্পণ)',
    commanderEnemyEn: 'Abu Sufyan ibn Harb (Unconditional surrender)',
    keyPersonalitiesBn: ['হযরত আব্বাস (রা.)', 'হযরত খালিদ বিন ওয়ালিদ (রা.)', 'হযরত যুবায়ের ইবনুল আওয়াম (রা.)', 'হযরত বিলাল (রা.)'],
    keyPersonalitiesEn: ['Al-Abbas ibn Abdul-Muttalib (RA)', 'Khalid ibn al-Walid (RA)', 'Az-Zubayr ibn al-Awwam (RA)', 'Bilal ibn Rabah (RA)'],
    muslimForcesBn: '১০,০০০ সুসজ্জিত অকুতোভয় মুজাহিদ (রমজানের রোজাদার কাফেলা)',
    muslimForcesEn: '10,000 disciplined Mujahideen marching while observing the Ramadan fast',
    enemyForcesBn: 'কুরাইশ ও তাদের মিত্র গোত্রসমূহ (হতভম্ব হয়ে আত্মসমর্পণ)',
    enemyForcesEn: 'Dismayed Quraysh defenders (Surrendered with negligible skirmishes)',
    muslimMartyrsBn: '২ জন বীর সাহাবি (ভুল পথে অগ্রসর হওয়া খালিদের দলের হযরত কুরজ ও খুবাইশ রা.)',
    muslimMartyrsEn: '2 Sahaba (Kurz ibn Jabir and Khunays ibn Khalid RA taking wrong path)',
    enemyCasualtiesBn: 'রক্তপাতহীন মহাবিজয় (ইকরামা ও সাফওয়ানের ছোট দলের ১২ জন নিহত)',
    enemyCasualtiesEn: 'Near-bloodless conquest; 12 diehards fallen during brief skirmish',
    detailedHistoryBn: 'মক্কা বিজয় ছিল ইতিহাসের শ্রেষ্ঠতম রক্তপাতহীন ও পরম উদার বিজয়ের অনুপম মহাকাব্য। যে মক্কার কাফিররা দীর্ঘ তেরো বছর রাসুল (সা.) ও তাঁর সাহাবিদের ওপর অমানুষিক নির্যাতন চালিয়েছিল, বয়কট করে অনাহারে রাখতে চেয়েছিল, সাহাবিদের হত্যা করেছিল এবং অবশেষে দেশত্যাগে বাধ্য করেছিল—আজ সেই রাসুল (সা.) ১০ হাজার বিজয়ী মুজাহিদ নিয়ে মক্কায় প্রবেশ করছেন। কোনো প্রতিশোধ নয়, কোনো অহংকার নয়; রাসুল (সা.)-এর পবিত্র মস্তক আল্লাহর দরবারে বিনয়ে উটের পিঠের সাথে প্রায় ঠেকে যাচ্ছিল। তিনি চারটি প্রবেশদ্বার দিয়ে বাহিনীকে মক্কায় প্রবেশের নির্দেশ দেন এবং রক্তের প্রতিটি ফোঁটা সংরক্ষণের কড়া নির্দেশ দেন। কাবা শরিফে প্রবেশ করে তিনি ৩৬০টি প্রতিমা ভেঙে টুকরো টুকরো করে দেন এবং ঘোষণা করেন: "সত্য এসেছে, মিথ্যা বিলুপ্ত হয়েছে; নিশ্চয়ই মিথ্যা বিলুপ্ত হওয়ারই যোগ্য!"',
    detailedHistoryEn: 'The Conquest of Makkah stands as the most benevolent, bloodless triumph in military annals. After 13 years of ruthless persecution, brutal boycott, torture, and forced exile, the Prophet (PBUH) returned leading 10,000 victorious believers. Entering the sacred valley, there was no vengeful wrath; rather, the Prophet rode with his head bowed so low in humility before Allah that his beard brushed the saddle of his camel. Splitting his forces into four columns, he prohibited bloodshed. Entering the Ka\'bah, he toppled all 360 idols declaring: "Truth has arrived, and falsehood has vanished; indeed falsehood is bound to vanish!"',
    emotionalStoryBn: 'কাবা চত্বরে মক্কার কুরাইশ নেতারা কাঁপতে কাঁপতে সমবেত হয়েছিল। তাদের মধ্যে আবু জাহলের ছেলে ইকরামা, সুহাইল ইবনে আমর এবং সেই হিন্দা ছিল যে হামজার কলিজা চিবিয়েছিল। রাসুল (সা.) তাদের দিকে তাকিয়ে বললেন: "হে কুরাইশগণ! আজ আমার কাছ থেকে তোমরা কী আচরণ প্রত্যাশা কর?" তারা ভয়ে কাতর কণ্ঠে বলল: "আপনি উদার ভাই, এক মহান উদার ভাইয়ের সন্তান!" তখন রহমাতুল্লিল আলামিন ঘোষণা করলেন হযরত ইউসুফ (আ.)-এর সেই অমর ক্ষমা: "আজ তোমাদের বিরুদ্ধে কোনো অভিযোগ নেই, কোনো প্রতিশোধ নেই! যাও, তোমরা সবাই মুক্ত স্বাধীন!" এরপর রাসুল (সা.) হযরত বিলাল (রা.)-কে কাবার ছাদে উঠে আজান দেওয়ার নির্দেশ দিলেন। যে কাফ্রি কৃতদাসকে মক্কার পাথরে পাথর চাপা দিয়ে নির্যাতন করা হয়েছিল, আজ সেই বিলালের কণ্ঠে তাওহীদের আজান শুনে কেঁদে কেঁদে সমগ্র মক্কাবাসী দলবদ্ধভাবে ইসলামে প্রবেশ করল।',
    emotionalStoryEn: 'Trembling polytheist leaders gathered in the courtyard of the Ka\'bah expecting slaughter, including those who had tortured companions and mutilated Hamzah. The Prophet (PBUH) looked at them: "O Quraysh! What do you think I am about to do with you?" They pleaded: "You are a noble brother, son of a noble brother!" The Prophet proclaimed the immortal forgiveness of Yusuf (AS): "No blame will there be upon you today! Go, for you are all completely free!" He then instructed Bilal (RA)—the once-abused slave—to climb atop the sacred roof of the Ka\'bah and call the Adhan. Hearing Bilal\'s voice echo, Makkah entered Islam in waves.',
    shuhada: [
      {
        nameBn: 'হযরত কুরজ ইবনে জাবির আল-ফিহরি (রা.)',
        nameEn: 'Hazrat Kurz ibn Jabir al-Fihri (RA)',
        roleBn: 'মুহাজির সাহাবি',
        roleEn: 'Early veteran Muhajir companion',
        detailsBn: 'মক্কা প্রবেশের সময় খালিদ বিন ওয়ালিদের দল থেকে বিচ্ছিন্ন হয়ে ভুল পথে পাহাড়ের চূড়ায় চলে যান। সেখানে শত্রু তীরন্দাজদের অতর্কিত তীরের আঘাতে শহীদ হন।',
        detailsEn: 'Separated from Khalid\'s column on a rugged mountain pass and ambushed by diehard Quraysh archers.'
      },
      {
        nameBn: 'হযরত খুনাইস ইবনে খালিদ আল-খুজাই (রা.)',
        nameEn: 'Hazrat Khunays ibn Khalid al-Khuza\'i (RA)',
        roleBn: 'বনু খুজাআহ গোত্রের সাহাবি',
        roleEn: 'Faithful companion from Banu Khuza\'ah',
        detailsBn: 'হযরত কুরজ (রা.)-এর সাথে ভুল পথ অতিক্রমকালে কুরাইশদের অতর্কিত হামলায় শাহাদাত বরণ করেন।',
        detailsEn: 'Martyred alongside Kurz ibn Jabir while defending their separated detachment.'
      }
    ],
    keyEvents: [
      {
        titleBn: '১. সাধারণ ক্ষমা ও "তোমরা সবাই মুক্ত"',
        titleEn: '1. Universal Amnesty: "You are Free"',
        descriptionBn: 'অত্যাচারী শত্রুদের সম্পূর্ণ ক্ষমা করে দিয়ে বিশ্ব মানবতার ইতিহাসে ক্ষমার সর্বোচ্চ পরাকাষ্ঠা স্থাপন করেন।',
        descriptionEn: 'The Prophet pardoned his worst persecutors unconditionally, disarming hatred and winning all hearts.',
        icon: '🕊️'
      },
      {
        titleBn: '২. কাবার ৩৬০টি প্রতিমা চূর্ণ ও তাওহীদের পুনঃপ্রতিষ্ঠা',
        titleEn: '2. Cleansing 360 Idols from the Ka\'bah',
        descriptionBn: 'রাসুল (সা.) নিজ ধনুকের খোঁচায় একে একে সব মূর্তি ভেঙে কাবার ভেতরে ও বাইরে তাওহীদের বিশুদ্ধ ইবাদত কায়েম করেন।',
        descriptionEn: 'The Prophet struck down all 360 pagan idols with his bow, purifying the House of Ibrahim for Monotheism.',
        icon: '🕋'
      },
      {
        titleBn: '৩. কাবার ছাদে বিলাল (রা.)-এর ঐতিহাসিক আজান',
        titleEn: '3. Bilal\'s Historic Adhan Atop the Ka\'bah',
        descriptionBn: 'একদা দাসত্বের নিগড়ে বন্দি হাবশি বিলাল (রা.) কাবার ছাদে দাঁড়িয়ে উচ্চৈঃস্বরে আজান দিয়ে সাম্য ও মুক্তির বার্তা ছড়িয়ে দেন।',
        descriptionEn: 'Bilal (RA) mounted the roof of the Ka\'bah to proclaim the call to prayer, symbolizing the triumph of equality and faith.',
        icon: '📢'
      }
    ],
    quranRefs: [
      {
        surahNameBn: 'সূরা আন-নাসর',
        surahNameEn: 'Surah An-Nasr',
        verseNo: '১-৩',
        arabic: 'إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ ۝ وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا',
        translationBn: 'যখন আল্লাহর সাহায্য ও বিজয় আসবে, এবং আপনি মানুষকে দলে দলে আল্লাহর দ্বীনে প্রবেশ করতে দেখবেন, তখন আপনি আপনার রবের প্রশংসাসহ পবিত্রতা ঘোষণা করুন।',
        translationEn: 'When the victory of Allah has come and the conquest, and you see the people entering into the religion of Allah in multitudes, then exalt with praise of your Lord.'
      },
      {
        surahNameBn: 'সূরা বনি ইসরাঈল',
        surahNameEn: 'Surah Al-Isra',
        verseNo: '৮১',
        arabic: 'وَقُلْ جَاءَ الْحَقُّ وَزَهَقَ الْبَاطِلُ ۚ إِنَّ الْبَاطِلَ كَانَ زَهُوقًا',
        translationBn: 'আর ঘোষণা করুন: সত্য এসেছে এবং মিথ্যা বিলুপ্ত হয়েছে; নিশ্চয়ই মিথ্যা বিলুপ্ত হওয়ারই যোগ্য।',
        translationEn: 'And say, "Truth has come, and falsehood has departed. Indeed, falsehood is bound to depart."'
      }
    ],
    hadithRefs: [
      {
        sourceBn: 'সহিহ বুখারি, হাদিস নং ৪২৮০',
        sourceEn: 'Sahih al-Bukhari, Hadith 4280',
        arabic: 'مَنْ دَخَلَ دَارَ أَبِي سُفْيَانَ فَهُوَ آمِنٌ، وَمَنْ أَلْقَى السِّلاَحَ فَهُوَ آمِنٌ',
        textBn: 'রাসুলুল্লাহ (সা.) মক্কায় প্রবেশের আগে ঘোষণা করলেন: "যে ব্যক্তি আবু সুফিয়ানের ঘরে ঢুকবে সে নিরাপদ, যে অস্ত্র ফেলে দেবে সে নিরাপদ, যে নিজের ঘরের দরজা বন্ধ রাখবে সেও নিরাপদ!"',
        textEn: 'The Prophet (PBUH) declared before entry: "Whoever enters the house of Abu Sufyan is safe, whoever casts down arms is safe, and whoever locks their door is safe!"'
      }
    ],
    historicalLessonsBn: [
      'ক্ষমতার চূড়ায় উঠে প্রতিশোধ না নিয়ে চরম ক্ষমা প্রদর্শনই প্রকৃত নবী ও বিজয়ী চরিত্রের পরিচয়।',
      'অত্যাচারীদের ক্ষমা করে দিলে তারা চরম শত্রু থেকে ইসলামের আজীবনের সেবকে রূপান্তরিত হয়।',
      'প্রতিমা ও বর্ণবাদের অবসান ঘটিয়ে এক আল্লাহ ও মানুষের সাম্যের জয়গান স্থাপন করাই ইসলামের উদ্দেশ্য।'
    ],
    historicalLessonsEn: [
      'Magnanimous clemency at the pinnacle of conquest is the hallmark of true prophetic character.',
      'Forgiving enemies transforms bitter persecutors into lifelong champions of faith.',
      'Eradicating idolatry and racism to establish universal brotherhood is the enduring purpose of Islam.'
    ],
    references: ['সহিহ আল-বুখারি', 'সহিহ মুসলিম', 'সীরাতে ইবনে হিশাম', 'আল-বিদায়া ওয়ান নিহায়া', 'তারিখে তাবারী']
  },

  // ==========================================
  // ৭. হুনাইনের যুদ্ধ
  // ==========================================
  {
    id: 'hunayn',
    orderNumber: 7,
    nameBn: 'হুনাইনের যুদ্ধ',
    nameEn: 'Battle of Hunayn',
    nameAr: 'غَزْوَةُ حُنَيْنٍ',
    eraKey: 'prophetic',
    eraBn: '১. নববি যুগ (৮ হিজরি)',
    eraEn: '1. Prophetic Era (8 AH)',
    dateBn: 'শাওয়াল, ৮ হিজরি (ফেব্রুয়ারি ৬৩০ খ্রি.)',
    dateEn: 'Shawwal, 8 AH (February 630 CE)',
    locationBn: 'হুনাইন উপত্যকা, মক্কা মুকাররমা ও তায়েফের মধ্যবর্তী গিরিখাত',
    locationEn: 'Valley of Hunayn, between Makkah and Ta\'if',
    causeBn: 'মক্কা বিজয়ের পর হাওয়াজিন ও সাকিফ নামক অহংকারী পাহাড়ি গোত্রগুলো কর্তৃক ইসলামি রাষ্ট্র ধ্বংসের উদ্দেশ্যে সমগ্র পরিবার ও ধনসম্পদ নিয়ে মদিনা আক্রমণ পরিকল্পনা।',
    causeEn: 'Hostile mountain confederations of Hawazin and Thaqif marching with their families and livestock to overwhelm the Muslims.',
    commanderMuslimsBn: 'রাসূলুল্লাহ মুহাম্মদ (সা.)',
    commanderMuslimsEn: 'Prophet Muhammad (PBUH)',
    commanderEnemyBn: 'মালিক ইবনে আওফ আন-নাসরি (৩০ বছর বয়সী দুর্ধর্ষ সেনাপতি)',
    commanderEnemyEn: 'Malik ibn Awf an-Nasri (30-year-old zealous warlord)',
    keyPersonalitiesBn: ['হযরত আব্বাস (রা.)', 'হযরত আলী (রা.)', 'হযরত আবু সুফিয়ান ইবনুল হারিস (রা.)'],
    keyPersonalitiesEn: ['Al-Abbas ibn Abdul-Muttalib (RA)', 'Ali ibn Abi Talib (RA)', 'Abu Sufyan ibn al-Harith (RA)'],
    muslimForcesBn: '১২,০০০ যোদ্ধা (মদিনার ১০,০০০ আনসার-মুহাজির এবং মক্কার ২,০০০ নবমুসলিম)',
    muslimForcesEn: '12,000 warriors (10,000 veterans of Madinah and 2,000 newly converted Makkans)',
    enemyForcesBn: '২০,০০০ থেকে ৩০,০০০ তীরন্দাজ ও দুর্ধর্ষ পাহাড়ি যোদ্ধা',
    enemyForcesEn: '20,000 to 30,000 entrenched Hawazin archers and cavalry',
    muslimMartyrsBn: '৪ জন বীর সাহাবি (হযরত আইমান ইবনে উবাইদ রা. সহ)',
    muslimMartyrsEn: '4 Sahaba (including Ayman ibn Ubayd RA)',
    enemyCasualtiesBn: '৭০ জনের বেশি শীর্ষ যোদ্ধা নিহত ও বিপুল পরিমাণ গনিমত (৬,০০০ বন্দি ও ২৪,০০০ উট লাভ)',
    enemyCasualtiesEn: '70+ slain; complete rout yielding massive spoils (6,000 captives, 24,000 camels)',
    detailedHistoryBn: 'হুনাইনের যুদ্ধ মুসলিমদের জন্য সৈন্যসংখ্যার অহংকার থেকে বিশুদ্ধ আত্মশুদ্ধির শিক্ষা ছিল। বারো হাজার মুজাহিদের বিশাল বহর দেখে কেউ কেউ মন্তব্য করেছিল: "আজকের দিনে আমাদের কেউই পরাজিত করতে পারবে না!" কিন্তু হুনাইনের সংকীর্ণ গিরিখাতে হাওয়াজিনের গুপ্ত তীরন্দাজরা এমন অতর্কিত তীব্র তীরবৃষ্টি শুরু করে যে মুসলিম বাহিনীর অগ্রবর্তী দল ছত্রভঙ্গ হয়ে পলায়ন শুরু করে। চরম বিশৃঙ্খলার মুহূর্তে রাসুলুল্লাহ (সা.) একাই তাঁর সাদা খচ্চর "দুলদুল"-এর পিঠে চড়ে শত্রুর তীরবৃষ্টির মুখে বীর বিক্রমে অগ্রসর হন। চাচা আব্বাস (রা.)-কে বললেন: "হে আব্বাস! বাবলা বৃক্ষের নিচে বায়য়াতকারী সাহাবিদের ডাক দাও!" আব্বাসের বজ্রকণ্ঠের আহ্বানে নিমেষেই একশত সাহাবি রাসুল (সা.)-এর চারপাশে প্রাচীর গড়ে তোলেন এবং পাল্টা আক্রমণ চালিয়ে শত্রু বাহিনীকে ছত্রভঙ্গ করে দেন।',
    detailedHistoryEn: 'Hunayn served as a profound divine reminder against self-reliance on numbers. Seeing their 12,000-man army, some exclaimed: "We cannot be defeated today!" However, inside the claustrophobic ravines of Hunayn, Hawazin archers ambushed from concealed cliffs, unleashing a blizzard of arrows that threw the vanguard into panicked retreat. Amid catastrophe, the Prophet (PBUH) spurred his white mule "Duldul" straight toward the arrows, shouting: "I am the Prophet, in truth! I am the son of Abdul-Muttalib!" He instructed Abbas (RA) to call the companions of the Tree. Hearing his booming voice, warriors wheeled around, shattered the ambush, and secured total victory.',
    emotionalStoryBn: 'যুদ্ধের চরম মুহূর্তে যখন সবাই পালাচ্ছিল, রাসুল (সা.) এক চুলও নড়েননি। তিনি দুহাত উঁচু করে এক মুষ্টি বালু নিয়ে শত্রুর মুখে ছুড়ে দিয়ে বললেন: "শাহাতিল উজূহ!" (চেহারাগুলো বিকৃত হোক!)। সেই বালুকণা অলৌকিকভাবে শত্রু সৈন্যের চোখে বিঁধতে থাকে। বিজয়ের পর বিপুল গনিমত বণ্টনের সময় রাসুল (সা.) মক্কার নতুন মুসলিমদের অন্তরে ইসলাম মজবুত করতে বেশি অংশ দেন। এতে মদিনার আনসারদের তরুণেরা কিছুটা ব্যথিত হলে রাসুল (সা.) আনসারদের ডেকে বললেন: "হে আনসারগণ! মানুষ যদি উট ও বকরি নিয়ে ঘরে ফিরে, আর তোমরা যদি স্বয়ং আল্লাহর রাসুলকে সাথে নিয়ে ঘরে ফিরো—তবে কি তোমরা এতে সন্তুষ্ট নও?" এ কথা শুনে আনসার সাহাবিরা কান্নায় ভেঙে পড়লেন এবং তাঁদের দাড়ি ভিজে গেল।',
    emotionalStoryEn: 'Amid retreat, the Prophet held his ground without a tremor of fear, casting a handful of dust: "May their faces be confounded!" Miraculously, dust blinded enemy archers. Following victory, the Prophet distributed spoils to soften the hearts of new Makkan converts. Hearing whispers of sadness from young Ansar, the Prophet gathered them: "O Ansar! Are you not pleased that people return home with sheep and camels, while you return home carrying the Messenger of Allah in your midst?" Weeping copiously until their beards were soaked, the Ansar cried: "We are well pleased with Allah and His Messenger!"',
    shuhada: [
      {
        nameBn: 'হযরত আইমান ইবনে উবাইদ (রা.)',
        nameEn: 'Hazrat Ayman ibn Ubayd (RA)',
        roleBn: 'উম্মে আইমান (রা.)-এর প্রিয় পুত্র',
        roleEn: 'Beloved son of Umm Ayman (RA)',
        detailsBn: 'হুনাইনের সংকীর্ণ গিরিপথে রাসুল (সা.)-এর সামনে ঢাল হয়ে শত্রুর তীরের মুখে দাঁড়িয়ে লড়াই করতে করতে শহীদ হন।',
        detailsEn: 'Fought steadfastly shielding the Prophet (PBUH) at the apex of the ambush until felled by arrows.'
      },
      {
        nameBn: 'হযরত সুরাকাহ ইবনুল হারিস (রা.)',
        nameEn: 'Hazrat Suraqah ibn al-Harith (RA)',
        roleBn: 'আনসার বীর মুজাহিদ',
        roleEn: 'Heroic Ansar defender',
        detailsBn: 'পাল্টা আক্রমণের সময় শত্রু সেনাপতির দলকে রুখে দিতে গিয়ে শাহাদাত বরণ করেন।',
        detailsEn: 'Martyred while repelling Hawazin cavalry during the decisive counter-charge.'
      }
    ],
    keyEvents: [
      {
        titleBn: '১. সংকীর্ণ গিরিখাতে অতর্কিত তীরবৃষ্টি ও বিশৃঙ্খলা',
        titleEn: '1. The Ravine Ambush',
        descriptionBn: 'পাহাড়ের চূড়া থেকে হাওয়াজিনদের অতর্কিত তীরবৃষ্টিতে মুসলিম বাহিনীর একাংশে সাময়িক পদস্খলন ঘটে।',
        descriptionEn: 'Concealed enemy archers caught the Muslim vanguard in an intense crossfire inside the ravines.',
        icon: '🏹'
      },
      {
        titleBn: '২. রাসুল (সা.)-এর নির্ভীক বীরত্ব ও ঘোষণা',
        titleEn: '2. The Prophet\'s Fearless Stand',
        descriptionBn: 'শত্রুর দিকে অগ্রসর হয়ে রাসুল (সা.) ঘোষণা করেন: "আনা আন-নাবিয়্যু লা কাযিব, আনা ইবনু আবদিল মুত্তালিব!"',
        descriptionEn: 'Riding into the arrows, the Prophet proclaimed: "I am the Prophet, in truth! I am the son of Abdul-Muttalib!"',
        icon: '🛡️'
      },
      {
        titleBn: '৩. আনসারদের প্রতি রাসুল (সা.)-এর হৃদয়স্পর্শী ভাষণ',
        titleEn: '3. Moving Address to the Ansar',
        descriptionBn: 'গনিমত বণ্টনের পর রাসুল (সা.) আনসারদের ভালোবাসায় সিক্ত করে বলেন: মানুষ উট নিয়ে ফিরবে আর তোমরা রাসুলকে নিয়ে ফিরবে!',
        descriptionEn: 'The Prophet consoled the Ansar that while others take worldly riches, they return home with the Prophet of Allah.',
        icon: '❤️'
      }
    ],
    quranRefs: [
      {
        surahNameBn: 'সূরা আত-তাওবাহ',
        surahNameEn: 'Surah At-Tawbah',
        verseNo: '২৫-২৬',
        arabic: 'لَقَدْ نَصَرَكُمُ اللَّهُ فِي مَوَاطِنَ كَثِيرَةٍ ۙ وَيَوْمَ حُنَيْنٍ ۙ إِذْ أَعْجَبَتْكُمْ كَثْرَتُكُمْ فَلَمْ تُغْنِ عَنكُمْ شَيْئًا وَضَاقَتْ عَلَيْكُمُ الْأَرْضُ بِمَا رَحُبَتْ ثُمَّ وَلَّيْتُم مُّدْبِرِينَ',
        translationBn: 'আল্লাহ তোমাদেরকে অনেক ক্ষেত্রে সাহায্য করেছেন এবং হুনাইনের দিনেও, যখন তোমাদের সংখ্যার প্রাচুর্য তোমাদেরকে গর্বিত করেছিল; কিন্তু তা তোমাদের কোনো উপকারে আসেনি এবং পৃথিবী প্রশস্ত হওয়া সত্ত্বেও তোমাদের ওপর সংকীর্ণ হয়ে গিয়েছিল। অতঃপর আল্লাহ তাঁর রাসুল ও মুমিনদের ওপর প্রশান্তি নাজিল করেন।',
        translationEn: 'Allah has already given you victory in many regions and on the day of Hunayn, when your great numbers pleased you, but they availed you not at all, and the earth was confined for you in spite of its vastness. Then Allah sent down His tranquility upon His Messenger and upon the believers.'
      }
    ],
    hadithRefs: [
      {
        sourceBn: 'সহিহ বুখারি, হাদিস নং ৪৩১৮',
        sourceEn: 'Sahih al-Bukhari, Hadith 4318',
        arabic: 'أَنَا النَّبِيُّ لاَ كَذِبْ، أَنَا ابْنُ عَبْدِ الْمُطَّلِبْ',
        textBn: 'হুনাইনের কঠিন মুহূর্তে রাসুলুল্লাহ (সা.) একাই শত্রুর মুখে দাঁড়িয়ে উচ্চকণ্ঠে ঘোষণা করেছিলেন: "আমি সত্য নবী, মিথ্যা নই; আমি আব্দুল মুত্তালিবের সন্তান!"',
        textEn: 'At the height of peril in Hunayn, the Prophet (PBUH) stood shouting: "I am the Prophet, in truth! I am the son of Abdul-Muttalib!"'
      }
    ],
    historicalLessonsBn: [
      'সৈন্যসংখ্যার আধিক্য বা সরঞ্জামের বড়াই কখনো বিজয় আনে না, যদি না আল্লাহর সাহায্য সঙ্গে থাকে।',
      'চরম বিশৃঙ্খলার মুহূর্তেও নেতার অটল সাহসিকতা ও ঈমানি দৃঢ়তা পুরো জাতিকে পুনরুজ্জীবিত করতে পারে।',
      'দুনিয়ার ধন-সম্পদের চেয়ে রাসুলুল্লাহ (সা.)-এর সান্নিধ্য ও সন্তুষ্টিই মুমিনের চিরস্থায়ী প্রাপ্তি।'
    ],
    historicalLessonsEn: [
      'Numerical superiority is meaningless without divine aid and humble submission.',
      'A leader\'s unwavering courage under direct fire can resurrect a faltering army in moments.',
      'The company of the Messenger of Allah is infinitely superior to all worldly treasures.'
    ],
    references: ['সহিহ আল-বুখারি', 'সহিহ মুসলিম', 'সীরাতে ইবনে হিশাম', 'আল-বিদায়া ওয়ান নিহায়া']
  },

  // ==========================================
  // ৮. মুতার যুদ্ধ
  // ==========================================
  {
    id: 'mutah',
    orderNumber: 8,
    nameBn: 'মুতার যুদ্ধ',
    nameEn: 'Battle of Mu\'tah',
    nameAr: 'مَعْرَكَةُ مُؤْتَةَ الخَالِدَةِ',
    eraKey: 'prophetic',
    eraBn: '১. নববি যুগ (৮ হিজরি)',
    eraEn: '1. Prophetic Era (8 AH)',
    dateBn: 'জুমাদাল উলা, ৮ হিজরি (সেপ্টেম্বর ৬২৯ খ্রি.)',
    dateEn: 'Jumada al-Ula, 8 AH (September 629 CE)',
    locationBn: 'মুতা প্রান্তর (বর্তমান দক্ষিণ জর্ডানের আল-কারাক গভর্নরেট)',
    locationEn: 'Plains of Mu\'tah (Al-Karak Governorate, Southern Jordan)',
    causeBn: 'রাসুলুল্লাহ (সা.)-এর প্রেরিত শান্তিদূত হযরত আল-হারিস ইবনে উমাইর আল-আজদি (রা.)-কে ঘাসসানীয় রোমান গভর্নর শুরাহবিল ইবনে আমর কর্তৃক আন্তর্জাতিক কূটনৈতিক আইন লঙ্ঘন করে নির্মমভাবে হত্যা করা।',
    causeEn: 'The cowardly assassination of the Prophet\'s diplomatic emissary, Al-Harith ibn Umayr al-Azdi (RA), by the Ghassanid Byzantine governor.',
    commanderMuslimsBn: 'যায়েদ বিন হারেসা, জাফর বিন আবি তালিব, আবদুল্লাহ ইবনে রাওয়াহা ও খালিদ বিন ওয়ালিদ (রা.)',
    commanderMuslimsEn: 'Zayd ibn Harithah, Ja\'far ibn Abi Talib, Abdullah ibn Rawahah & Khalid ibn al-Walid (RA)',
    commanderEnemyBn: 'থিওডোর (রোমান সম্রাট হিরাক্লিয়াসের ভাই) ও শুরাহবিল ইবনে আমর',
    commanderEnemyEn: 'Theodore (Brother of Emperor Heraclius) & Shurahbil ibn Amr',
    keyPersonalitiesBn: ['হযরত জাফর আত-তাইয়ার (রা.)', 'হযরত যায়েদ বিন হারেসা (রা.)', 'হযরত আবদুল্লাহ ইবনে রাওয়াহা (রা.)', 'হযরত খালিদ বিন ওয়ালিদ (রা.)'],
    keyPersonalitiesEn: ['Ja\'far al-Tayyar (RA)', 'Zayd ibn Harithah (RA)', 'Abdullah ibn Rawahah (RA)', 'Khalid ibn al-Walid (RA)'],
    muslimForcesBn: '৩,০০০ জন অকুতোভয় মুজাহিদ',
    muslimForcesEn: '3,000 valiant Mujahideen',
    enemyForcesBn: '১,০০,০০০ থেকে ২,০০,০০০ রোমান ও খ্রিস্টান আরব যৌথ সাম্রাজ্যবাদী সেনাদল',
    enemyForcesEn: '100,000 to 200,000 Byzantine imperial legions and allied Ghassanid forces',
    muslimMartyrsBn: '১২ জন বীর সেনানী (তিন প্রধান সেনাপতিসহ)',
    muslimMartyrsEn: '12 Heroic Martyrs (including all three designated commanders)',
    enemyCasualtiesBn: 'বিপুল সংখ্যক রোমান সৈন্য নিহত ও খালিদ বিন ওয়ালিদের অলৌকিক রণকৌশলে রোমানদের পিছু হটা',
    enemyCasualtiesEn: 'Substantial Byzantine casualties; legions stunned and repelled by Khalid\'s deception tactics',
    detailedHistoryBn: 'মুতার যুদ্ধ ছিল রোমান বাইজেন্টাইন পরাশক্তির সাথে মুসলিম উম্মাহর প্রথম মুখোমুখি অসম সংঘাত। রাসুল (সা.) ৩ হাজার মুজাহিদ পাঠিয়ে নির্দেশ দিয়েছিলেন: "প্রথমে সেনাপতি হবে যায়েদ বিন হারেসা; যদি সে শহীদ হয় তবে জাফর বিন আবি তালিব; আর জাফরও শহীদ হলে আবদুল্লাহ ইবনে রাওয়াহা পতাকা নেবে।" মুতায় পৌঁছে মুসলিমরা দেখেন পাহাড়ের মতো দুই লক্ষ রোমান সৈন্য প্রস্তুত হয়ে আছে। টানা সাত দিন তিন হাজার মুসলিম এই বিশাল বাহিনীর মুখে অটল পাহাড়ের মতো লড়ে। প্রথম তিন সেনাপতি একের পর এক শাহাদাত বরণ করার পর সাহাবিরা সর্বসম্মতিক্রমে সদ্য ইসলাম গ্রহণকারী খালিদ বিন ওয়ালিদ (রা.)-কে পতাকা তুলে দেন। খালিদ এমন অভাবনীয় মনস্তাত্ত্বিক যুদ্ধকৌশল গ্রহণ করেন যে রাতের আঁধারে অগ্রবর্তী বাহিনীকে পেছনে এবং পেছনের বাহিনীকে সামনে নিয়ে আসেন। নতুন পতাকা ও ঘোড়ার খুরের ধূলিঝড়ে রোমানরা ভাবল মদিনা থেকে হাজার হাজার সৈন্যের নতুন সাহায্য এসেছে। এই আতঙ্কে রোমানরা পিছু হটে এবং খালিদ পুরো মুসলিম বাহিনীকে নিরাপদে ফিরিয়ে আনেন।',
    detailedHistoryEn: 'Mu\'tah was the first clash between the Islamic state and the Roman Byzantine superpower. The Prophet appointed three successive commanders: Zayd ibn Harithah, then Ja\'far ibn Abi Talib, then Abdullah ibn Rawahah. Arriving at Mu\'tah, 3,000 Muslims discovered an imperial juggernaut of up to 200,000 troops. Undeterred, Muslims engaged in ferocious combat. When all three designated leaders fell, the army chose Khalid ibn al-Walid. Khalid implemented a brilliant tactical deception: reordering front and rear lines and raising massive dust clouds, leading Byzantines to believe fresh reinforcements had arrived, allowing him to withdraw his army intact.',
    emotionalStoryBn: 'মুতার যুদ্ধ চলাকালীন রাসুলুল্লাহ (সা.) মদিনার মিম্বরে বসে কান্নারত চোখে সাহাবিদের লাইভ বর্ণনা দিচ্ছিলেন: "যায়েদ পতাকা নিল এবং শহীদ হলো; এরপর জাফর পতাকা তুলে নিল এবং সেও শহীদ হলো; এরপর আবদুল্লাহ ইবনে রাওয়াহা পতাকা ধরল এবং সেও শাহাদাত বরণ করল।" জাফর (রা.)-এর দুই হাত যখন তলোয়ারের আঘাতে কেটে ফেলা হয়েছিল, তিনি দুই বাহু দিয়ে পতাকা বুকে চেপে রেখেছিলেন যতক্ষণ না তীর ও বর্শার আঘাতে তাঁর দেহ মাটিতে লুটিয়ে পড়ে। তাঁর শরীরে ৯০টিরও বেশি আঘাতের দাগ ছিল। রাসুল (সা.) বললেন: "আল্লাহ জাফরের দুই হাতের বিনিময়ে জান্নাতে দুটি পান্নার ডানা দান করেছেন, যা দিয়ে সে ফেরেশতাদের সাথে উড়ে বেড়ায়!" এজন্য তাঁকে "জাফর আত-তাইয়ার" (উড়ন্ত জাফর) বলা হয়। রাসুল (সা.) খালিদ সম্পর্কে বললেন: "অবশেষে আল্লাহর উন্মুক্ত তরবারি (সাইফুল্লাহ) পতাকা নিল এবং আল্লাহ তাদের ওপর বিজয় এনে দিলেন।" এই যুদ্ধে খালিদের হাতে ৯টি তলোয়ার ভেঙে টুকরো টুকরো হয়েছিল।',
    emotionalStoryEn: 'In Madinah, hundreds of miles away, the Prophet sat weeping upon the pulpit, miraculously narrating the battle in real time: "Zayd took the standard and fell; then Ja\'far took it and fell; then Ibn Rawahah took it and fell." Ja\'far held the standard in his right hand until it was severed; he gripped it with his left until severed; then clasped it against his chest with his stumps until martyred with 90+ wounds. The Prophet proclaimed: "Allah has replaced Ja\'far\'s hands with two wings of emerald in Paradise with which he flies among angels!"—earning him the title Ja\'far al-Tayyar. The Prophet proclaimed Khalid: "The Sword of Allah (Saifullah)", whose 9 swords shattered during the clash.',
    shuhada: [
      {
        nameBn: 'হযরত জাফর ইবনে আবি তালিব (জাফর আত-তাইয়ার রা.)',
        nameEn: 'Hazrat Ja\'far ibn Abi Talib (Ja\'far al-Tayyar RA)',
        roleBn: 'রাসুল (সা.)-এর চাচাতো ভাই, দ্বিতীয় সেনাপতি ও ডানাওয়ালা শহীদ',
        roleEn: 'Cousin of the Prophet, second commander & winged martyr',
        detailsBn: 'ঘোড়া থেকে নেমে নিজের ঘোড়া বধ করে শত্রু ব্যূহে ঢোকেন। ডান হাত ও বাম হাত কাটা যাওয়ার পর বুক দিয়ে পতাকা ঊর্ধ্বে তুলে রাখেন যতক্ষণ না ৯০টি বর্শা ও তীরের আঘাতে শাহাদাত বরণ করেন।',
        detailsEn: 'Dismounted into enemy masses. When both arms were hacked off, he held the standard against his chest with his stumps until martyred with over 90 wounds.'
      },
      {
        nameBn: 'হযরত যায়েদ বিন হারেসা (রা.)',
        nameEn: 'Hazrat Zayd ibn Harithah (RA)',
        roleBn: 'রাসুল (সা.)-এর স্নেহধন্য প্রথম সেনাপতি',
        roleEn: 'Beloved companion of the Prophet & first appointed commander',
        detailsBn: 'ইসলামের পতাকা নিয়ে রোমান বর্শাধারীদের মুখে নির্ভীকভাবে লড়াই করে প্রথম সেনাপতি হিসেবে বীর বিক্রমে শাহাদাতের অমিয় সুধা পান করেন।',
        detailsEn: 'Led the charge carrying the banner directly into the dense forest of Byzantine pikes until attaining martyrdom.'
      },
      {
        nameBn: 'হযরত আবদুল্লাহ ইবনে রাওয়াহা (রা.)',
        nameEn: 'Hazrat Abdullah ibn Rawahah (RA)',
        roleBn: 'ইসলামের শ্রেষ্ঠ কবি ও তৃতীয় সেনাপতি',
        roleEn: 'Great poet of Islam & third appointed commander',
        detailsBn: 'জাফরের শাহাদাতের পর পতাকা হাতে নিয়ে বীরত্বগাথা কবিতা আবৃত্তি করতে করতে রোমান ব্যূহ ভেদ করে শহীদ হন।',
        detailsEn: 'Seized the banner reciting poetry of martyrdom, cutting deeply into the enemy lines until falling honorably.'
      },
      {
        nameBn: 'হযরত মাসউদ ইবনুল আসওয়াদ (রা.)',
        nameEn: 'Hazrat Mas\'ud ibn al-Aswad (RA)',
        roleBn: 'আনসার বীর যোদ্ধা',
        roleEn: 'Valiant Ansar defender',
        detailsBn: 'সেনাপতিদের পাশে প্রাচীর হয়ে দাঁড়িয়ে রোমান অশ্বারোহীদের আঘাত প্রতিহত করতে গিয়ে শহীদ হন।',
        detailsEn: 'Fell shielding the flag-bearers against wave after wave of Byzantine cavalry.'
      }
    ],
    keyEvents: [
      {
        titleBn: '১. তিন সেনাপতির ধারাবাহিক শাহাদাত ও রাসুল (সা.)-এর ওহি দর্শন',
        titleEn: '1. Real-time Prophetic Vision of the 3 Commanders',
        descriptionBn: 'মদিনায় বসে রাসুল (সা.) অশ্রুসিক্ত চোখে সাহাবিদের কাছে যায়িদ, জাফর ও আবদুল্লাহর শাহাদাতের বিবরণ তুলে ধরেন।',
        descriptionEn: 'The Prophet narrated the martyrdom of Zayd, Ja\'far, and Ibn Rawahah to the companions in Madinah simultaneously.',
        icon: '👁️'
      },
      {
        titleBn: '২. খালিদ বিন ওয়ালিদের হাতে ৯টি তরবারি ভাঙা',
        titleEn: '2. Nine Swords Broken in Khalid\'s Hands',
        descriptionBn: 'খালিদ বিন ওয়ালিদ এমন প্রচণ্ড লড়াই করেন যে তাঁর হাতে একে একে নয়টি তরবারি ভেঙে যায় এবং তিনি একটি প্রশস্ত ইয়েমেনি ফলক দিয়ে যুদ্ধ করেন।',
        descriptionEn: 'Khalid fought with such intensity that nine swords broke in his grip, leaving only a broad Yemeni blade.',
        icon: '⚔️'
      },
      {
        titleBn: '৩. খালিদ বিন ওয়ালিদের অমর রণকৌশল ও পশ্চাদপসরণ',
        titleEn: '3. Tactical Regrouping and Safe Extraction',
        descriptionBn: 'সৈন্যদের অবস্থান রদবদল ও ধুলাবালি উড়িয়ে রোমানদের অন্তরে নতুন সেনাদলের আতঙ্ক তৈরি করে পুরো মুসলিম বাহিনীকে নিরাপদে ফিরিয়ে আনেন।',
        descriptionEn: 'Khalid rearranged lines and created dust storms, bluffing Byzantines into fearing reinforcements and extracting the army safely.',
        icon: '🛡️'
      }
    ],
    quranRefs: [
      {
        surahNameBn: 'সূরা আত-তাওবাহ',
        surahNameEn: 'Surah At-Tawbah',
        verseNo: '১১১',
        arabic: 'إِنَّ اللَّهَ اشْتَرَىٰ مِنَ الْمُؤْمِنِينَ أَنفُسَهُمْ وَأَمْوَالَهُم بِأَنَّ لَهُمُ الْجَنَّةَ',
        translationBn: 'নিশ্চয়ই আল্লাহ মুমিনদের থেকে তাদের জান ও মাল ক্রয় করে নিয়েছেন এর বিনিময়ে যে, তাদের জন্য রয়েছে জান্নাত।',
        translationEn: 'Indeed, Allah has purchased from the believers their lives and their properties in exchange for Paradise.'
      }
    ],
    hadithRefs: [
      {
        sourceBn: 'সহিহ বুখারি, হাদিস নং ৪২৬১',
        sourceEn: 'Sahih al-Bukhari, Hadith 4261',
        arabic: 'لَقَدِ انْكَسَرَتْ فِي يَدِي يَوْمَ مُؤْتَةَ تِسْعَةُ أَسْيَافٍ، فَمَا بَقِيَ فِي يَدِي إِلاَّ صَفِيحَةٌ يَمَانِيَةٌ',
        textBn: 'হযরত খালিদ বিন ওয়ালিদ (রা.) বর্ণনা করেন: "মুতার যুদ্ধের দিনে আমার হাতে নয়টি তলোয়ার ভেঙেছিল; অবশেষে আমার হাতে কেবল একটি প্রশস্ত ইয়েমেনি ফলক অবশিষ্ট ছিল!"',
        textEn: 'Khalid ibn al-Walid narrated: "On the day of Mu\'tah, nine swords were broken in my hand, and nothing remained in my grip except a broad Yemeni plate-sword!"'
      }
    ],
    historicalLessonsBn: [
      'সংখ্যা বা অস্ত্রের তুলনায় ঈমানের তেজ ও সামরিক প্রত্যুৎপন্নমতিত্বই যেকোনো পরাশক্তিকে হতভম্ব করে দিতে পারে।',
      'দ্বীনের মর্যাদার জন্য প্রাণ বিসর্জন দেওয়া পরাজয় নয়, বরং জান্নাতের সর্বোচ্চ সম্মান।',
      'পরিস্থিতি প্রতিকূল হলে অযথা আত্মাহুতি না দিয়ে বাহিনীকে নিরাপদে বের করে আনা দূরদর্শী সেনাপতির গুণ।'
    ],
    historicalLessonsEn: [
      'Spiritual courage and tactical intellect can stun imperial armies seventy times larger.',
      'Dying for principle and divine truth is not defeat, but the pinnacle of heavenly honor.',
      'Tactical extraction to preserve the community\'s strength is an indispensable skill of great generals.'
    ],
    references: ['সহিহ আল-বুখারি', 'আল-বিদায়া ওয়ান নিহায়া', 'তারিখে তাবারী', 'ফতূহুশ শাম']
  },

  // ==========================================
  // ৯. তাবুকের যুদ্ধ (অভিযান)
  // ==========================================
  {
    id: 'tabuk',
    orderNumber: 9,
    nameBn: 'তাবুকের যুদ্ধ (অভিযান)',
    nameEn: 'Expedition of Tabuk (Jaysh al-Usrah)',
    nameAr: 'غَزْوَةُ تَبُوكَ (جَيْشُ العُسْرَة)',
    eraKey: 'prophetic',
    eraBn: '১. নববি যুগ (৯ হিজরি)',
    eraEn: '1. Prophetic Era (9 AH)',
    dateBn: 'রজব, ৯ হিজরি (অক্টোবর ৬৩০ খ্রি.)',
    dateEn: 'Rajab, 9 AH (October 630 CE)',
    locationBn: 'তাবুক মরূদ্যান, উত্তর আরব ও শাম সীমান্ত',
    locationEn: 'Tabuk Oasis, Northern Arabian frontier bordering the Levant',
    causeBn: 'বাইজেন্টাইন রোমান সম্রাট হিরাক্লিয়াস কর্তৃক আরব উপদ্বীপে ইসলামি রাষ্ট্র ধ্বংস করতে বিশাল যৌথ খ্রিস্টান বাহিনী মোতায়েনের গোয়েন্দা তথ্যের মুখে প্রতিরোধ গড়ে তোলা।',
    causeEn: 'Preempting a massive Byzantine imperial invasion threatening the northern borders of the Islamic state.',
    commanderMuslimsBn: 'রাসূলুল্লাহ মুহাম্মদ (সা.)',
    commanderMuslimsEn: 'Prophet Muhammad (PBUH)',
    commanderEnemyBn: 'রোমান সম্রাট হিরাক্লিয়াস ও সীমান্ত মিত্র বাহিনী (ভয়ে সীমান্ত ত্যাগ)',
    commanderEnemyEn: 'Byzantine Emperor Heraclius (Retreated without engagement)',
    keyPersonalitiesBn: ['হযরত আবু বকর (রা.)', 'হযরত উসমান (রা.)', 'হযরত উমর (রা.)', 'হযরত আলী (রা.) (মদিনার প্রতিনিধি)'],
    keyPersonalitiesEn: ['Abu Bakr As-Siddiq (RA)', 'Uthman ibn Affan (RA)', 'Umar ibn al-Khattab (RA)', 'Ali ibn Abi Talib (RA) (Deputy in Madinah)'],
    muslimForcesBn: '৩০,০০০ বীর মুজাহিদ ও ১০,০০০ ঘোড়া (জায়শুল উসরাহ বা চরম অভাবগ্রস্ত বাহিনী)',
    muslimForcesEn: '30,000 Mujahideen & 10,000 horses (The "Army of Hardship" - Jaysh al-Usrah)',
    enemyForcesBn: '৪০,০০০ থেকে ১,০০,০০০ রোমান ও আরব খ্রিস্টান সেনাবাহিনী',
    enemyForcesEn: '40,000 to 100,000 Roman legionnaires and Ghassanid auxiliaries',
    muslimMartyrsBn: 'রক্তপাতহীন কৌশলগত বিজয় (কোনো সরাসরি সংঘাত হয়নি; হযরত যুল-বিজাদাইন রা. জ্বরে আক্রান্ত হয়ে মারা যান)',
    muslimMartyrsEn: 'Bloodless strategic masterstroke (No battle casualties; Dhu al-Bijadayn passed away from fever)',
    enemyCasualtiesBn: 'রোমান বাহিনী মুসলিমদের আগমনের খবর পেয়ে ভয়ে সীমান্ত কেল্লা ত্যাগ করে পশ্চাদপসরণ করে',
    enemyCasualtiesEn: 'Byzantine legions panicked and withdrew into northern strongholds',
    detailedHistoryBn: 'তাবুক অভিযান ছিল রাসুলুল্লাহ (সা.)-এর জীবদ্দশার সর্বশেষ সামরিক অভিযান। এটি পরিচালিত হয়েছিল মদিনার তীব্র দাবদাহ, খরা এবং চরম খাদ্যসংকটের সময়। মদিনা থেকে প্রায় ৭০০ কিমি উত্তরে রোমান সীমান্তের দিকে ৩০ হাজার সেনাদল নিয়ে যাত্রা ছিল এক অলৌকিক ঈমানি পরীক্ষা। এই বাহিনী প্রস্তুত করতে হযরত আবু বকর (রা.) তাঁর ঘরের যাবতীয় সহায়-সম্পদ রাসুলের দরবারে এনে ঢেলে দেন। হযরত উসমান (রা.) ৩০০ সজ্জিত উট ও ১,০০০ স্বর্ণমুদ্রা দান করেন। রাসুল (সা.) উসমানের দান দেখে বলেছিলেন: "আজকের পর উসমান যাই করুক না কেন, তার কোনো ক্ষতি হবে না!" ৩০ হাজার মুজাহিদ যখন তাবুকে পৌঁছালেন, রোমানরা মরুভূমির পথে মুসলিমদের এই অভাবনীয় সাহস দেখে ভয়ে সীমান্ত ছেড়ে সিরিয়ার ভেতরে পালিয়ে যায়। সেখানে রাসুল (সা.) ২০ দিন অবস্থান করে উত্তর আরবের সমস্ত গোত্রের সাথে নিরাপত্তা ও জিজিয়া চুক্তি স্বাক্ষর করেন।',
    detailedHistoryEn: 'The Expedition of Tabuk was the final military campaign led by Prophet Muhammad (PBUH). It unfolded during scorching summer heat, drought, and severe famine. Marching 700 km north across desolate deserts was an immense test of faith. Mobilizing the "Army of Hardship" witnessed unmatched generosity: Abu Bakr (RA) donated his entire household wealth, and Uthman (RA) equipped one-third of the army with 300 camels and 1,000 gold dinars. Arriving at Tabuk, the Byzantines were so awed by Muslim audacity that they abandoned border posts. For 20 days, the Prophet received frontier tribal leaders, cementing Islamic dominion over northern Arabia.',
    emotionalStoryBn: 'তাবুক অভিযানে এক গরীব সাহাবি হযরত আবদুল্লাহ যুল-বিজাদাইন (রা.) অংশ নিয়েছিলেন। ইসলাম গ্রহণের অপরাধে তাঁর চাচা তাঁর সব কাপড়চোপড় কেড়ে নিয়েছিল। তিনি একটি মোটা কম্বল দুই টুকরো করে এক অংশ লুঙ্গি ও এক অংশ চাদর বানিয়ে রাসুলের দরবারে হাজির হয়েছিলেন। তাবুকে রাতে তিনি তীব্র জ্বরে ইন্তেকাল করেন। হযরত আবদুল্লাহ ইবনে মাসউদ (রা.) বলেন: "রাতের অন্ধকারে আমি একটি মশালের আলো দেখতে পেলাম। গিয়ে দেখি স্বয়ং রাসুলুল্লাহ (সা.), আবু বকর ও উমর মিলে যুল-বিজাদাইনের কবর খনন করছেন। রাসুল (সা.) কবরে নেমে তাঁর দেহ নিজ হাতে কবরে শুইয়ে দিয়ে দুহাত তুলে কাঁদলেন: ‘হে আল্লাহ! আমি আজকের সন্ধ্যা পর্যন্ত যুল-বিজাদাইনের ওপর সন্তুষ্ট ছিলাম, তুমিও তার ওপর সন্তুষ্ট হয়ে যাও!’" এ দৃশ্য দেখে ইবনে মাসউদ (রা.) বলেছিলেন: "হায়! যদি এই কবরের বাসিন্দা আমি হতাম!"',
    emotionalStoryEn: 'A destitute companion, Abdullah Dhu al-Bijadayn (RA), joined the march. When he accepted Islam, his uncle stripped him of everything, leaving him with only a coarse blanket that he tore in two to cover himself. At Tabuk, he passed away from fever. Ibn Mas\'ud (RA) recounted: "In the pitch darkness, I saw a torch. I saw the Prophet, Abu Bakr, and Umar digging his grave. The Prophet lowered himself into the trench, laid him down with his own hands, and prayed: ‘O Allah! I was pleased with him till this evening, so be pleased with him!’ Seeing this, I wished I were the one in that grave!"',
    shuhada: [
      {
        nameBn: 'হযরত আবদুল্লাহ যুল-বিজাদাইন (রা.)',
        nameEn: 'Hazrat Abdullah Dhu al-Bijadayn (RA)',
        roleBn: 'নিঃস্ব কিন্তু আল্লাহপ্রেমিক সাহাবি',
        roleEn: 'Impoverished yet profoundly beloved companion',
        detailsBn: 'তাবুক সীমান্তে তীব্র জ্বরে ইন্তেকাল করেন। রাসুল (সা.) নিজ হাতে তাঁকে কবরে নামিয়ে পরম স্নেহে দাফন করেন এবং তাঁর জন্য জান্নাতের দোয়া করেন।',
        detailsEn: 'Passed away from fever at Tabuk. The Prophet (PBUH) descended into his grave to lay him to rest with his own hands.'
      }
    ],
    keyEvents: [
      {
        titleBn: '১. উসমান (রা.) ও আবু বকর (রা.)-এর ঐতিহাসিক দান',
        titleEn: '1. Unprecedented Financial Sacrifices',
        descriptionBn: 'আবু বকর (রা.) ঘরের সব মাল এবং উসমান (রা.) এক-তৃতীয়াংশ বাহিনীর সম্পূর্ণ ব্যয়ভার বহন করে সংকট দূর করেন।',
        descriptionEn: 'Abu Bakr gave 100% of his home wealth, and Uthman funded 300 camels and supplies for one-third of the army.',
        icon: '💰'
      },
      {
        titleBn: '২. রোমান পরাশক্তির রক্তপাতহীন পশ্চাদপসরণ',
        titleEn: '2. Bloodless Retreat of the Romans',
        descriptionBn: 'মুসলিমদের বীরত্বপূর্ণ দীর্ঘ পদযাত্রা দেখে রোমান সেনাবাহিনী যুদ্ধ ক্ষেত্র ছেড়ে সিরিয়ার অভ্যন্তরে পালিয়ে যায়।',
        descriptionEn: 'Stunned by Muslim endurance across 700 km of desert, Byzantine forces withdrew into Syria without a fight.',
        icon: '🏰'
      },
      {
        titleBn: '৩. সীমান্ত অঞ্চলের শান্তি ও নিরাপত্তা চুক্তি',
        titleEn: '3. Northern Frontier Treaties',
        descriptionBn: 'আইলাহ, জারবা ও আজরুহের খ্রিস্টান শাসকদের সাথে জিজিয়া ও শান্তিচুক্তি স্বাক্ষরের মাধ্যমে ইসলামি রাষ্ট্রের সীমান্ত সুরক্ষিত হয়।',
        descriptionEn: 'Peace and security pacts were concluded with border principalities, securing the northern threshold of Arabia.',
        icon: '📜'
      }
    ],
    quranRefs: [
      {
        surahNameBn: 'সূরা আত-তাওবাহ',
        surahNameEn: 'Surah At-Tawbah',
        verseNo: '১১৭',
        arabic: 'لَّقَد تَّابَ اللَّهُ عَلَى النَّبِيِّ وَالْمُهَاجِرِينَ وَالْأَنصَارِ الَّذِينَ اتَّبَعُوهُ فِي سَاعَةِ الْعُسْرَةِ',
        translationBn: 'নিশ্চয়ই আল্লাহ অনুগ্রহশীল হয়েছেন নবী এবং সেই মুহাজির ও আনসারদের প্রতি, যারা চরম অভাব ও সংকটের মুহূর্তে (তাবুক অভিযানে) তাঁর আনুগত্য করেছিল।',
        translationEn: 'Allah has already forgiven the Prophet and the Muhajirun and the Ansar who followed him in the hour of difficulty.'
      }
    ],
    hadithRefs: [
      {
        sourceBn: 'সহিহ বুখারি, হাদিস নং ৪৪১৫',
        sourceEn: 'Sahih al-Bukhari, Hadith 4415',
        arabic: 'أَمَا تَرْضَى أَنْ تَكُونَ مِنِّي بِمَنْزِلَةِ هَارُونَ مِنْ مُوسَى إِلاَّ أَنَّهُ لَيْسَ نَبِيٌّ بَعْدِي',
        textBn: 'তাবুক যাওয়ার সময় রাসুলুল্লাহ (সা.) হযরত আলী (রা.)-কে মদিনায় পরিবার ও নারীদের দায়িত্বে রেখে বললেন: "তুমি কি এতে সন্তুষ্ট নও যে, মুসার কাছে হারুনের যেমন মর্যাদা ছিল, আমার কাছে তোমার মর্যাদা ঠিক তেমনি; কেবল আমার পর কোনো নবী নেই!"',
        textEn: 'Deputizing Ali (RA) in Madinah during Tabuk, the Prophet comforted him: "Are you not pleased that you are to me as Harun was to Musa, except that there is no prophet after me?"'
      }
    ],
    historicalLessonsBn: [
      'রাষ্ট্রের নিরাপত্তা রক্ষায় সম্ভাব্য বিদেশি আগ্রাসনের বিরুদ্ধে আগাম প্রতিরক্ষামূলক উপস্থিতি নিশ্চিত করা অপরিহার্য।',
      'উম্মাহর ক্রান্তিলগ্নে ধনীদের সর্বাত্মক অর্থনৈতিক সহযোগিতা ও দান সামরিক বিজয়ের ভিত্তি গড়ে দেয়।',
      'কষ্ট ও ক্ষুধার মধ্য দিয়েও দ্বীনের পথে অবিচল থাকার ফল হলো চিরন্তন আল্লাহর সন্তুষ্টি।'
    ],
    historicalLessonsEn: [
      'Proactive deterrence against looming foreign invasion is vital for sovereign survival.',
      'Sincere financial sacrifice from the wealthy during crises is the bedrock of community triumph.',
      'Enduring hardship in the path of truth earns eternal divine favor and peace.'
    ],
    references: ['সহিহ আল-বুখারি', 'সহিহ মুসলিম', 'সীরাতে ইবনে হিশাম', 'আল-বিদায়া ওয়ান নিহায়া']
  },

  // ==========================================
  // ১০. ধাতুস্ সালাসিল (শিকলের যুদ্ধ)
  // ==========================================
  {
    id: 'dhat_salasil',
    orderNumber: 10,
    nameBn: 'ধাতুস্ সালাসিল',
    nameEn: 'Battle of Chains (Dhat al-Salasil)',
    nameAr: 'مَعْرَكَةُ ذَاتِ السَّلاسِلِ',
    eraKey: 'rashidun',
    eraBn: '২. খিলাফতে রাশিদা (১২ হিজরি)',
    eraEn: '2. Rashidun Caliphate (12 AH)',
    dateBn: 'মুহররম, ১২ হিজরি (এপ্রিল ৬৩৩ খ্রি.)',
    dateEn: 'Muharram, 12 AH (April 633 CE)',
    locationBn: 'কাজিমা (কুয়েত উপসাগর ও বসরা সীমান্ত)',
    locationEn: 'Kazima (Bordering Kuwait Bay and Basra)',
    causeBn: 'প্রথম খলিফা হযরত আবু বকর সিদ্দিক (রা.)-এর নির্দেশে পারস্য সাম্রাজ্যের সীমান্ত দমন এবং মেসোপটেমিয়ার নির্যাতিত মানুষকে মুক্ত করার ঐতিহাসিক অভিযান।',
    causeEn: 'First major encounter against the Sassanid Persian Empire to pacify hostile border garrisons under Caliph Abu Bakr (RA).',
    commanderMuslimsBn: 'খালিদ বিন ওয়ালিদ (রা.)',
    commanderMuslimsEn: 'Khalid ibn al-Walid (RA)',
    commanderEnemyBn: 'হরমুজ (পারস্যের কুখ্যাত অহংকারী সীমান্ত গভর্নর)',
    commanderEnemyEn: 'Hormuz (Arrogant Sassanid Persian March-Lord)',
    keyPersonalitiesBn: ['খালিদ বিন ওয়ালিদ (রা.)', 'আল-কা’কা ইবনে আমর আত-তামীমি (রা.)'],
    keyPersonalitiesEn: ['Khalid ibn al-Walid (RA)', 'Al-Qa\'qa ibn Amr at-Tamimi (RA)'],
    muslimForcesBn: '১৮,০০০ মুজাহিদ',
    muslimForcesEn: '18,000 Mujahideen',
    enemyForcesBn: '২০,০০০ থেকে ৩০,০০০ ভারী শৃঙ্খলিত পারস্য পদাতিক ও অশ্বারোহী সৈন্য',
    enemyForcesEn: '20,000 to 30,000 chained heavy Persian infantry and cavalry',
    muslimMartyrsBn: 'কয়েকজন বীর মুজাহিদ',
    muslimMartyrsEn: 'A few brave frontline martyrs',
    enemyCasualtiesBn: 'হরমুজ নিহত এবং সহস্রাধিক পারস্য সৈন্য বিধ্বস্ত ও পলায়ন',
    enemyCasualtiesEn: 'Hormuz slain in single combat; thousands chained soldiers killed or routed',
    detailedHistoryBn: 'ধাতুস্ সালাসিল ছিল পারস্য সাম্রাজ্যের পতন যাত্রার প্রথম বড় মাইলফলক। পারস্য সেনাপতি হরমুজ তার সৈন্যদের পলায়ন রোধ করতে লোহার শিকল দিয়ে পরস্পরকে বেঁধে রেখেছিল, যাতে কেউ ময়দান ছাড়তে না পারে। খালিদ (রা.) মরুভূমির পথে এক জায়গা থেকে অন্য জায়গায় দ্রুত সৈন্য সরিয়ে হরমুজের ভারী সেনাদলকে ক্লান্ত করে তোলেন। এরপর কাজিমার প্রান্তরে হরমুজ খালিদকে প্রতারণার ফাঁদে ফেলে দ্বৈরথ যুদ্ধের আহ্বান জানায়।',
    detailedHistoryEn: 'The Battle of Chains marked the opening blow against the Sassanid Persian Empire. Sassanid commander Hormuz chained his infantry in rows of ten to prevent desertion. Khalid outmaneuvered Hormuz across the desert, exhausting the armored Persians before confronting them at Kazima. Hormuz attempted treachery during the duel, but Al-Qa\'qa intervened and slew him, routing the chained army.',
    emotionalStoryBn: 'দ্বৈরথ যুদ্ধের সময় হরমুজ খালিদ (রা.)-কে তলোয়ারের লড়াইয়ে ব্যস্ত রেখে তার লুকানো ঘাতকদের সংকেত দেয়। ঘাতকেরা পেছন থেকে খালিদকে হত্যা করতে ছুটে আসে। কিন্তু খালিদের সাথি আল-কা’কা ইবনে আমর বিজলির মতো ঘোড়া ছুটিয়ে এসে হরমুজ ও তার ঘাতকদের হত্যা করেন। হরমুজের মাথার এক লক্ষ দিরহাম মূল্যের রাজমুকুট খলিফা আবু বকর খালিদকে গনিমত হিসেবে প্রদান করেন। আবু বকর বলেছিলেন: "যে সেনাদলে কা’কার মতো একজন বীর আছে, সে দল কখনো পরাজিত হতে পারে না!"',
    emotionalStoryEn: 'During the opening duel, Hormuz signaled hidden assassins to ambush Khalid. Spotting the plot, Al-Qa\'qa spurred his steed like lightning, cutting down the assassins while Khalid dispatched Hormuz. Caliph Abu Bakr awarded Hormuz\'s 100,000-dirham jewel-encrusted cap to Khalid, remarking: "An army containing a man like Al-Qa\'qa can never be defeated!"',
    shuhada: [
      {
        nameBn: 'মুজাহিদিনে ইরাক ও কাজিমা',
        nameEn: 'Vanguard Martyrs of Kazima',
        roleBn: 'অগ্রবর্তী মুজাহিদ দল',
        roleEn: 'Frontline vanguard cavalry',
        detailsBn: 'পারস্যের লৌহবর্মধারী সৈন্যদের ব্যূহ ভাঙার সময় সম্মুখ সমরে শাহাদাত বরণ করেন।',
        detailsEn: 'Fell heroically while piercing the chained lines of Sassanid heavy infantry.'
      }
    ],
    keyEvents: [
      {
        titleBn: '১. হরমুজের দ্বৈরথ প্রতারণা ও কা’কার বীরত্ব',
        titleEn: '1. Hormuz\'s Treachery & Al-Qa\'qa\'s Rescue',
        descriptionBn: 'হরমুজের গুপ্ত ঘাতকদের চক্রান্ত নস্যাৎ করে দিয়ে খালিদ ও কা’কা ময়দানে তাকে হত্যা করেন।',
        descriptionEn: 'Al-Qa\'qa intercepted Hormuz\'s ambush, securing Khalid\'s victory in single combat.',
        icon: '⚔️'
      },
      {
        titleBn: '২. শিকল দিয়ে বাঁধা পারস্য বাহিনীর বিপর্যয়',
        titleEn: '2. The Chained Lines Disaster',
        descriptionBn: 'নিজেদের শিকলে বাঁধার কারণে পলায়ন করতে না পেরে পারস্য সৈন্যরা নদীতে ডুবে ও তলোয়ারের আঘাতে পর্যুদস্ত হয়।',
        descriptionEn: 'Chained to prevent retreat, the routed Persian soldiers were trapped and annihilated.',
        icon: '⛓️'
      }
    ],
    historicalLessonsBn: [
      'দাসত্ব ও শিকলের শৃঙ্খল কখনো স্বাধীন মুমিনদের ঈমানি শক্তির সমকক্ষ হতে পারে না।',
      'রণক্ষেত্রে উপস্থিত বুদ্ধিমত্তা ও বিশ্বস্ত সহযোগীদের উপস্থিতি বিজয়ের প্রধান রক্ষাকবচ।'
    ],
    historicalLessonsEn: [
      'Chains of enforced servitude can never withstand the free spirit of deep faith.',
      'Instantaneous tactical perception and loyal comrades secure decisive triumph.'
    ],
    references: ['তারিখে তাবারী', 'আল-কামিল ফিত-তারিখ', 'ফতূহুল বুলদান']
  },

  // ==========================================
  // ১১. ওয়ালাজার যুদ্ধ
  // ==========================================
  {
    id: 'walaja',
    orderNumber: 11,
    nameBn: 'ওয়ালাজার যুদ্ধ',
    nameEn: 'Battle of Walaja',
    nameAr: 'مَعْرَكَةُ الوَلَجَةِ (الكَمِينُ المُزْدَوَج)',
    eraKey: 'rashidun',
    eraBn: '২. খিলাফতে রাশিদা (১২ হিজরি)',
    eraEn: '2. Rashidun Caliphate (12 AH)',
    dateBn: 'সফর, ১২ হিজরি (মে ৬৩৩ খ্রি.)',
    dateEn: 'Safar, 12 AH (May 633 CE)',
    locationBn: 'ওয়ালাজা প্রান্তর, দজলা ও ফোরাত অববাহিকা (ইরাক)',
    locationEn: 'Plains of Walaja, Mesopotamia (Iraq)',
    causeBn: 'পারস্য সম্রাট আর্দাশির কর্তৃক মুসলিমদের অগ্রযাত্রা ঠেকাতে পারস্য ও খ্রিস্টান আরবদের নিয়ে গঠিত দুটি বিশাল বাহিনীর একত্রীকরণ প্রতিহত করা।',
    causeEn: 'Neutralizing two massive Persian imperial armies sent by Emperor Ardashir to halt the Islamic liberation of Iraq.',
    commanderMuslimsBn: 'খালিদ বিন ওয়ালিদ (রা.)',
    commanderMuslimsEn: 'Khalid ibn al-Walid (RA)',
    commanderEnemyBn: 'আন্দারজাগার ও হাজারমর্দ (পারস্য শীর্ষ সেনাপতিদ্বয়)',
    commanderEnemyEn: 'Andarzaghar & Hazar Mard (Sassanid Supreme Generals)',
    keyPersonalitiesBn: ['খালিদ বিন ওয়ালিদ (রা.)', 'বুসর ইবনে আবি রুমহ (রা.)', 'সাঈদ ইবনে মাররাহ (রা.)'],
    keyPersonalitiesEn: ['Khalid ibn al-Walid (RA)', 'Busr ibn Abi Ruhm (RA)', 'Sa\'id ibn Marrah (RA)'],
    muslimForcesBn: '১৫,০০০ অশ্বারোহী ও পদাতিক মুজাহিদ',
    muslimForcesEn: '15,000 disciplined Mujahideen',
    enemyForcesBn: '৫০,০০০ সুসজ্জিত পারস্য ও আরব খ্রিস্টান সম্মিলিত সেনা',
    enemyForcesEn: '50,000 heavy imperial Persian legions and Christian Arab auxiliaries',
    muslimMartyrsBn: 'কয়েক শত বীর মুজাহিদ',
    muslimMartyrsEn: 'A few hundred fallen heroes',
    enemyCasualtiesBn: '২০,০০০-এর বেশি পারস্য সৈন্য নিহত এবং সেনাপতি আন্দারজাগার পলায়ন করে তৃষ্ণায় মরুভূমিতে মৃত্যু',
    enemyCasualtiesEn: '20,000+ Persians killed; General Andarzaghar fled into the desert dying of thirst',
    detailedHistoryBn: 'ওয়ালাজার যুদ্ধ সামরিক ইতিহাসে এক অমর মাস্টারপিস। প্রাচীন বিশ্বের হ্যানিবলের পর খালিদ বিন ওয়ালিদই বিশ্বের দ্বিতীয় সেনাপতি যিনি নিখুঁত দ্বিমুখী সাঁড়াশি কৌশল (Double Envelopment বা Pincer Movement) সফলভাবে প্রয়োগ করেছিলেন। খালিদ যুদ্ধের আগের রাতে দুই হাজার করে চার হাজার অশ্বারোহীকে দুটি পাহাড়ি টিলার আড়ালে গোপনে লুকিয়ে রাখেন। যুদ্ধের দিন যখন পারস্য বাহিনী মুসলিম বাহিনীকে পিছু হটতে দেখে আনন্দিত হচ্ছিল, তখন খালিদের এক সংকেতে লুকিয়ে থাকা দুই অশ্বারোহী দল দুই দিক থেকে এসে পারস্যের পেছনের পথ সম্পূর্ণ বন্ধ করে দেয়। চারদিক থেকে অবরুদ্ধ হয়ে পারস্য বাহিনী নিঃশেষ হয়ে যায়।',
    detailedHistoryEn: 'The Battle of Walaja is celebrated in global military academies as the quintessential tactical double envelopment, matched only by Hannibal at Cannae. On the eve of battle, Khalid concealed two cavalry detachments of 2,000 riders behind ridges on either flank. When the Persian legions pushed the Muslim center, Khalid signaled. The concealed cavalry struck both flanks simultaneously and closed the rear, trapping 50,000 Persians in an inescapable pocket of destruction.',
    emotionalStoryBn: 'যুদ্ধের শুরুতে পারস্যের এক দানবাকৃতির অভিজ্ঞ বীর যোদ্ধা হাজারমর্দ ময়দানে নেমে খালিদকে দ্বৈরথের আহ্বান জানায়। সে খালিদের দিকে এমন প্রচণ্ড আঘাত হানে যে আকাশ বাতাস প্রকম্পিত হয়ে ওঠে। খালিদ অত্যন্ত ক্ষিপ্রতার সাথে সেই আঘাত এড়িয়ে এক পাল্টা তলোয়ারের কোপে হাজারমর্দকে নিকেশ করেন। এরপর ক্লান্ত খালিদ যুদ্ধের তীব্র উত্তেজনার মধ্যেই ময়দানে বসে খাবার খান এবং ঘোষণা করেন: "রোম বা পারস্যের কোনো রাজশক্তি মুমিনের অন্তরে আল্লাহর চেয়ে বড় হতে পারে না!"',
    emotionalStoryEn: 'Before battle, a Sassanid giant named Hazar Mard stepped forth challenging any Muslim. Khalid accepted, dodging his furious axe blows and dispatching him with a surgical sword thrust. Resting upon the slain champion, Khalid ate bread while declaring: "No empire of Rome or Persia can stand before hearts filled with the majesty of Allah!"',
    shuhada: [
      {
        nameBn: 'ওয়ালাজার শহীদ সাহাবিগণ',
        nameEn: 'Martyrs of the Walaja Encirclement',
        roleBn: 'মধ্যবর্তী কেন্দ্র রক্ষা দল',
        roleEn: 'Central holding line infantry',
        detailsBn: 'শত্রুকে ফাঁদে ফেলার জন্য পারস্যের প্রচণ্ড চাপ বুক পেতে সামলে নিয়ে শাহাদাত বরণ করেন।',
        detailsEn: 'Absorbed the crushing weight of 50,000 Persians to buy time for the pincer cavalry.'
      }
    ],
    keyEvents: [
      {
        titleBn: '১. বিশ্বের অন্যতম সেরা সাঁড়াশি ফাঁদ (Double Envelopment)',
        titleEn: '1. The Classic Pincer Envelopment',
        descriptionBn: 'দুই দিক থেকে লুকিয়ে থাকা অশ্বারোহী দল শত্রুকে চারদিক থেকে ঘিরে ফেলে সম্পূর্ণ পর্যুদস্ত করে।',
        descriptionEn: 'Concealed reserve cavalry closed the net, annihilating the Sassanid army in a classic ring.',
        icon: '🧲'
      }
    ],
    historicalLessonsBn: [
      'ভৌগোলিক সুযোগ ও নিখুঁত সময়ের সমন্বয় সংখ্যাধিক্যকে সম্পূর্ণরূপে অকার্যকর করে দেয়।',
      'সেনাপতির অসাধারণ প্রত্যুৎপন্নমতিত্ব সামরিক বিজয়ের মূল স্তম্ভ।'
    ],
    historicalLessonsEn: [
      'Topography and precise timing neutralize vast numerical superiority.',
      'A general\'s tactical foresight turns perilous odds into devastating victories.'
    ],
    references: ['তারিখে তাবারী', 'আল-বিদায়া ওয়ান নিহায়া', 'ফতূহুল বুলদান']
  },

  // ==========================================
  // ১২. আইন আত-তামর যুদ্ধ
  // ==========================================
  {
    id: 'ayn_tamr',
    orderNumber: 12,
    nameBn: 'আইন আত-তামর যুদ্ধ',
    nameEn: 'Battle of Ayn al-Tamr',
    nameAr: 'مَعْرَكَةُ عَيْنِ التَّمْرِ',
    eraKey: 'rashidun',
    eraBn: '২. খিলাফতে রাশিদা (১২ হিজরি)',
    eraEn: '2. Rashidun Caliphate (12 AH)',
    dateBn: 'রবিউল আউয়াল, ১২ হিজরি (জুলাই ৬৩৩ খ্রি.)',
    dateEn: 'Rabi al-Awwal, 12 AH (July 633 CE)',
    locationBn: 'আইন আত-তামর মরূদ্যান (কারবালার পশ্চিমে, ইরাক)',
    locationEn: 'Ayn al-Tamr Oasis (West of Karbala, Iraq)',
    causeBn: 'পারস্য সাম্রাজ্যের সহযোগী খ্রিস্টান আরব গোত্রসমূহের আক্রমণাত্মক অবস্থান ধ্বংস এবং মরু সীমান্ত সুরক্ষিত করা।',
    causeEn: 'Neutralizing hostile Arab Christian tribes allied with Sassanid Persia safeguarding Iraq\'s desert flank.',
    commanderMuslimsBn: 'খালিদ বিন ওয়ালিদ (রা.)',
    commanderMuslimsEn: 'Khalid ibn al-Walid (RA)',
    commanderEnemyBn: 'আক্কা ইবনে আবি আক্কা (খ্রিস্টান আরব প্রধান) ও মেহরান (পারস্য সেনাপতি)',
    commanderEnemyEn: 'Aqqa ibn Abi Aqqa & Mihran (Persian Governor)',
    keyPersonalitiesBn: ['খালিদ বিন ওয়ালিদ (রা.)'],
    keyPersonalitiesEn: ['Khalid ibn al-Walid (RA)'],
    muslimForcesBn: '৯,০০০ মুজাহিদ',
    muslimForcesEn: '9,000 Mujahideen',
    enemyForcesBn: '১৫,০০০ সুরক্ষিত যোদ্ধা',
    enemyForcesEn: '15,000 fortified troops',
    muslimMartyrsBn: 'নগণ্য সংখ্যক',
    enemyCasualtiesBn: 'আক্কা বন্দি ও দুর্গ অধিকার',
    enemyCasualtiesEn: 'Aqqa captured, fortress surrendered',
    detailedHistoryBn: 'আইন আত-তামরে শত্রু সেনাপতি আক্কা অহংকার করে পারস্য বাহিনীকে বলেছিল: "তোমরা বিশ্রাম নাও, আরবদের সাথে লড়াই করার জন্য আমরাই যথেষ্ট!" কিন্তু খালিদ (রা.) যুদ্ধের লাইন তৈরি হওয়ার আগেই স্বয়ং ঘোড়া ছুটিয়ে শত্রু সেনাপতি আক্কাকে জাপটে ধরে নিজের কাঁধে তুলে নিয়ে আসেন। নেতা হারিয়ে পুরো শত্রু বাহিনী দুর্গে পালিয়ে যায়।',
    detailedHistoryEn: 'Boasting to Persian allies that he alone could handle the Muslim force, Aqqa deployed his troops. Before battle lines met, Khalid rode out solo, tackled Aqqa off his horse, and carried him captive back to Muslim lines, shattering enemy morale instantly.',
    emotionalStoryBn: 'এই দুর্গের একটি গির্জা থেকে ৪০ জন তরুণ ছাত্রকে মুক্ত করা হয় যারা ধর্মগ্রন্থ অধ্যয়ন করছিল। তারা সকলেই স্বেচ্ছায় ইসলাম গ্রহণ করেন। তাদের মধ্য থেকেই পরবর্তীতে জন্ম নেন তাবেয়ি শিরোমণি ইমাম মুহাম্মদ ইবনে সিরিন এবং সিরাত সংকলক ইবনে ইসহাকের পিতারা!',
    emotionalStoryEn: 'From the monastery inside the fortress, 40 young theological students were captured. Liberated, they all embraced Islam. Among them were the fathers of the great scholar Muhammad ibn Sirin and the premier biographer Ibn Ishaq!',
    shuhada: [],
    keyEvents: [
      {
        titleBn: '১. সেনাপতি আক্কাকে জীবন্ত ছিনিয়ে আনা',
        titleEn: '1. Snatching the Enemy General',
        descriptionBn: 'খালিদ (রা.) চোখের পলকে শত্রু সেনাপতিকে জীবন্ত বন্দি করে নিয়ে আসেন।',
        descriptionEn: 'Khalid captured Aqqa single-handedly before the armies could even clash.',
        icon: '🏇'
      }
    ],
    historicalLessonsBn: ['যুদ্ধক্ষেত্রে শত্রুর মনোবল ভেঙে দেওয়া পুরো বাহিনী ধ্বংস করার চেয়েও কার্যকর।'],
    historicalLessonsEn: ['Decapitating enemy leadership early averts unnecessary casualties.'],
    references: ['তারিখে তাবারী', 'ফতূহুল বুলদান']
  },

  // ==========================================
  // ১৩. দাওমাতুল জান্দাল যুদ্ধ
  // ==========================================
  {
    id: 'dumat_jandal',
    orderNumber: 13,
    nameBn: 'দাওমাতুল জান্দাল যুদ্ধ',
    nameEn: 'Battle of Dumat al-Jandal',
    nameAr: 'مَعْرَكَةُ دَوْمَةِ الجَنْدَلِ',
    eraKey: 'rashidun',
    eraBn: '২. খিলাফতে রাশিদা (১২ হিজরি)',
    eraEn: '2. Rashidun Caliphate (12 AH)',
    dateBn: 'জুমাদাল উলা, ১২ হিজরি (আগস্ট ৬৩৩ খ্রি.)',
    dateEn: 'Jumada al-Ula, 12 AH (August 633 CE)',
    locationBn: 'দাওমাতুল জান্দাল (উত্তর আরব ও সিরিয়া সীমান্ত)',
    locationEn: 'Dumat al-Jandal (Border between Arabia & Syria)',
    causeBn: 'বিদ্রোহী খ্রিস্টান বেদুইনদের দমন ও ইরাক-শাম সংযোগ পথ উন্মুক্ত করা।',
    causeEn: 'Pacifying rebel Bedouin garrisons to link the Iraqi and Syrian campaign fronts.',
    commanderMuslimsBn: 'খালিদ বিন ওয়ালিদ ও ইয়াদ ইবনে গানম (রা.)',
    commanderMuslimsEn: 'Khalid ibn al-Walid & Iyad ibn Ghanm (RA)',
    commanderEnemyBn: 'উকাইদির ও জুদী ইবনে রাবিয়া',
    commanderEnemyEn: 'Ukaydir & Judi ibn Rabi\'ah',
    keyPersonalitiesBn: ['খালিদ বিন ওয়ালিদ (রা.)', 'আল-কা’কা (রা.)'],
    keyPersonalitiesEn: ['Khalid ibn al-Walid (RA)', 'Al-Qa\'qa (RA)'],
    muslimForcesBn: '১০,০০০ মুজাহিদ',
    muslimForcesEn: '10,000 Mujahideen',
    enemyForcesBn: '১২,০০০ দুর্গবাসী দুর্ধর্ষ যোদ্ধা',
    enemyForcesEn: '12,000 fortress defenders',
    muslimMartyrsBn: 'কয়েকজন মুজাহিদ',
    enemyCasualtiesBn: 'জুদী নিহত ও দুর্গ বিজয়',
    enemyCasualtiesEn: 'Judi slain; fortress opened',
    detailedHistoryBn: 'ইয়াদ ইবনে গানম (রা.) দীর্ঘদিন দুর্গ অবরোধ করে আটকে ছিলেন। খালিদ বিন ওয়ালিদ মরুভূমির দুর্গম পথ অতিক্রম করে এসে দুই দিক থেকে যুগপৎ আক্রমণ চালিয়ে দুর্গ উন্মুক্ত করেন।',
    detailedHistoryEn: 'Iyad ibn Ghanm was stalled outside the fortress. Khalid crossed hundreds of miles of trackless desert, executing a synchronized assault that crushed the garrison.',
    emotionalStoryBn: 'খালিদের আগমনের খবর পেয়ে শত্রু সেনাপতি উকাইদির পলায়নের চেষ্টা করে কারণ সে জানত: "যেখানে খালিদ উপস্থিত হন, সেখানে পরাজয় ছাড়া আর কিছুই থাকে না!"',
    emotionalStoryEn: 'Hearing of Khalid\'s arrival, commander Ukaydir attempted to flee, warning: "Wherever Khalid appears, defeat is inevitable!"',
    shuhada: [],
    keyEvents: [
      {
        titleBn: '১. দুই মুসলিম বাহিনীর সফল মেলবন্ধন',
        titleEn: '1. Two-front Synchronization',
        descriptionBn: 'ইরাক ও শামের মধ্যবর্তী কৌশলগত যোগাযোগ চিরতরে নিরাপদ হয়।',
        descriptionEn: 'Permanently united the Syrian and Iraqi theaters of operation.',
        icon: '🤝'
      }
    ],
    historicalLessonsBn: ['সহযোদ্ধাদের বিপদে দ্রুত উদ্ধার করা ইসলামি ভ্রাতৃত্বের অনন্য নিদর্শন।'],
    historicalLessonsEn: ['Rapid reinforcement of stalled fronts turns stalemate into victory.'],
    references: ['তারিখে তাবারী', 'আল-বিদায়া ওয়ান নিহায়া']
  },

  // ==========================================
  // ১৪. আজনাদাইন যুদ্ধ
  // ==========================================
  {
    id: 'ajnadayn',
    orderNumber: 14,
    nameBn: 'আজনাদাইন যুদ্ধ',
    nameEn: 'Battle of Ajnadayn',
    nameAr: 'مَعْرَكَةُ أَجْنَادَيْنِ',
    eraKey: 'rashidun',
    eraBn: '২. খিলাফতে রাশিদা (১৩ হিজরি)',
    eraEn: '2. Rashidun Caliphate (13 AH)',
    dateBn: 'জুমাদাল উলা, ১৩ হিজরি (জুলাই ৬৩৪ খ্রি.)',
    dateEn: 'Jumada al-Ula, 13 AH (July 634 CE)',
    locationBn: 'আজনাদাইন প্রান্তর (জেরুজালেম ও রামাল্লার নিকটে, ফিলিস্তিন)',
    locationEn: 'Plains of Ajnadayn (Near Jerusalem and Ramla, Palestine)',
    causeBn: 'পবিত্র ফিলিস্তিন ও বাইতুল মুকাদ্দাস মুক্তির পথে রোমান সাম্রাজ্যের বিশাল সেনাদলকে প্রতিহত করা।',
    causeEn: 'The first grand pitched battle against the Byzantine Empire to liberate Palestine and Jerusalem.',
    commanderMuslimsBn: 'আমর ইবনুল আস ও খালিদ বিন ওয়ালিদ (রা.)',
    commanderMuslimsEn: 'Amr ibn al-Aas & Khalid ibn al-Walid (RA)',
    commanderEnemyBn: 'থিওডোর (রোমান সম্রাটের ভাই ও সর্বাধিনায়ক)',
    commanderEnemyEn: 'Theodore (Brother of Emperor Heraclius)',
    keyPersonalitiesBn: ['আমর ইবনুল আস (রা.)', 'খালিদ বিন ওয়ালিদ (রা.)', 'যিরার ইবনুল আজওয়ার (রা.)'],
    keyPersonalitiesEn: ['Amr ibn al-Aas (RA)', 'Khalid ibn al-Walid (RA)', 'Dirar ibn al-Azwar (RA)'],
    muslimForcesBn: '২৪,০০০ মুজাহিদ',
    muslimForcesEn: '24,000 Mujahideen',
    enemyForcesBn: '৭০,০০০ থেকে ১,০০,০০০ সুসজ্জিত রোমান সৈন্য',
    enemyForcesEn: '70,000 to 100,000 heavily armored Byzantine legions',
    muslimMartyrsBn: '৪৫০ জন বীর মুজাহিদ',
    muslimMartyrsEn: '450 Brave Martyrs',
    enemyCasualtiesBn: 'রোমান সেনাপতি নিহত এবং রোমান সেনাদল ছিন্নভিন্ন',
    enemyCasualtiesEn: 'Theodore slain; entire Byzantine line collapsed',
    detailedHistoryBn: 'আজনাদাইন ছিল শাম ও ফিলিস্তিনের মাটিতে রোমানদের সাথে মুসলিমদের প্রথম মহা ফয়সালা। খালিদ বিন ওয়ালিদ ইরাক থেকে অলৌকিক গতিতে মরুভূমি পাড়ি দিয়ে আমর ইবনুল আসের বাহিনীর সাথে মিলিত হন। রোমানরা তাদের বিশালাকার সৈন্যবাহিনী দিয়ে মুসলিমদের পিষে ফেলতে চেয়েছিল। কিন্তু মুজাহিদদের অদম্য ঈমানি প্রতিরোধের মুখে রোমান প্রাচীর চূর্ণ হয়ে যায়।',
    detailedHistoryEn: 'Ajnadayn was the first colossal clash liberating Palestine. Khalid completed his legendary desert dash from Iraq to unite with Amr ibn al-Aas. Outnumbering Muslims three-to-one, the Byzantines attempted to steamroll them, but the unwavering faith of the Mujahideen shattered the Roman lines.',
    emotionalStoryBn: 'আজনাদাইনে হযরত যিরার ইবনুল আজওয়ার (রা.) নিজের বর্ম ও জামা খুলে উন্মুক্ত বুকে খালি তলোয়ার হাতে রোমান সেনাদলে প্রবেশ করেন। তাঁর উন্মাদিনী সাহসিকতা দেখে রোমান সৈন্যরা চিৎকার করে বলতে থাকে: "ঐ যে নগ্ন তরবারিধারী প্রেতাত্মা আসছে!" তিনি একাই রোমানদের বহু শীর্ষ বীরকে ধরাশায়ী করেন।',
    emotionalStoryEn: 'Dirar ibn al-Azwar stripped his armor and charged shirtless into the Byzantine ranks. Terrified by his unearthly valor, Roman legions screamed: "Here comes the naked champion!" He single-handedly slew multiple top Byzantine commanders.',
    shuhada: [
      {
        nameBn: 'হযরত হিশাম ইবনুল আস (রা.)',
        nameEn: 'Hazrat Hisham ibn al-Aas (RA)',
        roleBn: 'আমর ইবনুল আসের ছোট ভাই ও বিশিষ্ট সাহাবি',
        roleEn: 'Brother of Amr ibn al-Aas & noble companion',
        detailsBn: 'সম্মুখ সমরে লড়াই করে রোমান ব্যূহ ভাঙার সময় শাহাদাত বরণ করেন।',
        detailsEn: 'Fell heroically while breaking through the center of the Byzantine phalanx.'
      }
    ],
    keyEvents: [
      {
        titleBn: '১. ফিলিস্তিনের প্রবেশদ্বার উন্মুক্ত',
        titleEn: '1. Opening Palestine and Jerusalem',
        descriptionBn: 'এই ঐতিহাসিক বিজয়ের মাধ্যমেই জেরুজালেম ও সমগ্র ফিলিস্তিন বিজয়ের ভিত্তি স্থাপিত হয়।',
        descriptionEn: 'Paved the definitive road toward the liberation of Jerusalem and Palestine.',
        icon: '🌟'
      }
    ],
    historicalLessonsBn: ['ঈমানের তেজের সামনে আধুনিক বর্ম ও সংখ্যাধিক্য সম্পূর্ণ তুচ্ছ।'],
    historicalLessonsEn: ['Uncompromising conviction pierces the heaviest armor and numbers.'],
    references: ['ফতূহুশ শাম', 'তারিখে তাবারী', 'আল-বিদায়া ওয়ান নিহায়া']
  },

  // ==========================================
  // ১৫. সেতুর যুদ্ধ (মারাকাতুল জিসর)
  // ==========================================
  {
    id: 'bridge_battle',
    orderNumber: 15,
    nameBn: 'সেতুর যুদ্ধ (মারাকাতুল জিসর)',
    nameEn: 'Battle of the Bridge',
    nameAr: 'مَعْرَكَةُ الجِسْرِ',
    eraKey: 'rashidun',
    eraBn: '২. খিলাফতে রাশিদা (১৩ হিজরি)',
    eraEn: '2. Rashidun Caliphate (13 AH)',
    dateBn: 'শাবান, ১৩ হিজরি (অক্টোবর ৬৩৪ খ্রি.)',
    dateEn: 'Sha\'ban, 13 AH (October 634 CE)',
    locationBn: 'ইউফ্রেটিস নদী তীর, কুফা সংলগ্ন (ইরাক)',
    locationEn: 'Banks of the Euphrates River, near Kufa (Iraq)',
    causeBn: 'পারস্যের হস্তীচালিত সেনাদলকে মোকাবিলা করতে নদী পার হয়ে অতিরিক্ত দুঃসাহসিক আক্রমণ।',
    causeEn: 'A high-risk river crossing against Sassanid war elephants.',
    commanderMuslimsBn: 'আবু উবাইদ আস-সাকাফি (রা.)',
    commanderMuslimsEn: 'Abu Ubayd ath-Thaqafi (RA)',
    commanderEnemyBn: 'বাহমান জাদুইয়াহ (পারস্য সেনাপতি)',
    commanderEnemyEn: 'Bahman Jadhuyih (Persian General)',
    keyPersonalitiesBn: ['আবু উবাইদ আস-সাকাফি (রা.)', 'মুসান্না ইবনে হারিসাহ (রা.)'],
    keyPersonalitiesEn: ['Abu Ubayd ath-Thaqafi (RA)', 'Al-Muthanna ibn Harithah (RA)',],
    muslimForcesBn: '৯,০০০ মুজাহিদ',
    muslimForcesEn: '9,000 Mujahideen',
    enemyForcesBn: '৩০,০০০ পারস্য সেনা ও রণহস্তী বাহিনী',
    enemyForcesEn: '30,000 Persians with armored war elephants',
    muslimMartyrsBn: '৪,০০০ বীর মুজাহিদ (সেনাপতি আবু উবাইদসহ)',
    muslimMartyrsEn: '4,000 Martyrs (including Commander Abu Ubayd)',
    enemyCasualtiesBn: '৬,০০০ পারস্য সৈন্য নিহত',
    enemyCasualtiesEn: '6,000 Persians killed',
    detailedHistoryBn: 'সেতুর যুদ্ধ ছিল ইরাক ফ্রন্টে মুসলিমদের এক কঠিন আত্মশুদ্ধির পরীক্ষা। খলিফা উমরের নির্দেশ অমান্য করে অতিরিক্ত আবেগে আবু উবাইদ কাঠের সেতু পার হয়ে সংকীর্ণ এলাকায় হাতির মুখোমুখি হন। হাতির শুঁড়ে আঘাত করতে গিয়ে তিনি হাতির পায়ে পিষ্ট হয়ে শহীদ হন। সেতু ভেঙে যাওয়ায় বিপর্যয় দেখা দেয়, কিন্তু মুসান্না ইবনে হারিসাহ (রা.) জীবন বাজি রেখে সেতু পুনর্নির্মাণ করে বাকি বাহিনীকে রক্ষা করেন।',
    detailedHistoryEn: 'A sobering trial on the Iraqi front. Crossing the narrow bridge against strategic counsel, Abu Ubayd\'s cavalry panicked before towering war elephants. When Abu Ubayd was crushed while attacking the white elephant, panic ensued as the bridge collapsed. Al-Muthanna restored the bridge under fire, saving the remainder of the army.',
    emotionalStoryBn: 'সেনাপতি আবু উবাইদের শাহাদাতের পর তাঁর ভাই ও পরিবারের সাতজন সদস্য একে একে পতাকা তুলে নেন এবং সবাই শাহাদাত বরণ করেন।',
    emotionalStoryEn: 'Following Abu Ubayd\'s death, seven members of his family took up the banner consecutively, each fighting until falling as martyrs.',
    shuhada: [
      {
        nameBn: 'হযরত আবু উবাইদ আস-সাকাফি (রা.)',
        nameEn: 'Hazrat Abu Ubayd ath-Thaqafi (RA)',
        roleBn: 'প্রধান সেনাপতি (মুখতার সাকাফির পিতা)',
        roleEn: 'Supreme Commander',
        detailsBn: 'পারস্যের সাদা হাতির শুঁড়ে তলোয়ারের আঘাত করার পর ক্ষিপ্ত হাতির পায়ের নিচে পদদলিত হয়ে শাহাদাত বরণ করেন।',
        detailsEn: 'Severed the trunk of the chief white elephant before being trampled underfoot.'
      }
    ],
    keyEvents: [
      {
        titleBn: '১. আবেগের চেয়ে সামরিক শৃঙ্খলা অপরিহার্য',
        titleEn: '1. Discipline Over Passion',
        descriptionBn: 'ভৌগোলিক সীমাবদ্ধতা না মেনে সংকীর্ণ নদী পারাপার যে মারাত্মক হতে পারে তার ঐতিহাসিক শিক্ষা।',
        descriptionEn: 'The timeless lesson of avoiding bottle-necked choke points without clear egress.',
        icon: '🐘'
      }
    ],
    historicalLessonsBn: ['যুদ্ধক্ষেত্রে অতি-উৎসাহ নয়, ঠান্ডা মাথার রণকৌশলই জীবনের নিরাপত্তা নিশ্চিত করে।'],
    historicalLessonsEn: ['Strategic patience and situational restraint must govern martial passion.'],
    references: ['তারিখে তাবারী', 'আল-কামিল ফিত-তারিখ']
  },

  // ==========================================
  // ১৬. বুওয়াইবের যুদ্ধ
  // ==========================================
  {
    id: 'buwayb',
    orderNumber: 16,
    nameBn: 'বুওয়াইবের যুদ্ধ',
    nameEn: 'Battle of Buwayb',
    nameAr: 'مَعْرَكَةُ البُوَيْبِ',
    eraKey: 'rashidun',
    eraBn: '২. খিলাফতে রাশিদা (১৩ হিজরি)',
    eraEn: '2. Rashidun Caliphate (13 AH)',
    dateBn: 'রমজান, ১৩ হিজরি (নভেম্বর ৬৩৪ খ্রি.)',
    dateEn: 'Ramadan, 13 AH (November 634 CE)',
    locationBn: 'বুওয়াইব নদী অববাহিকা (ইরাক)',
    locationEn: 'Buwayb River Basin (Iraq)',
    causeBn: 'সেতুর যুদ্ধের বিপর্যয় কাটিয়ে পারস্য সাম্রাজ্যের অহংকার চূর্ণ করা।',
    causeEn: 'Avenging the Bridge setback and neutralizing the Sassanid core.',
    commanderMuslimsBn: 'মুসান্না ইবনে হারিসাহ আশ-শায়বানি (রা.)',
    commanderMuslimsEn: 'Al-Muthanna ibn Harithah ash-Shaybani (RA)',
    commanderEnemyBn: 'মিহরান হামদানি (পারস্য শীর্ষ সেনাপতি)',
    commanderEnemyEn: 'Mihran Hamdani (Persian Supreme Commander)',
    keyPersonalitiesBn: ['মুসান্না ইবনে হারিসাহ (রা.)', 'মাসউদ ইবনে হারিসাহ (রা.)'],
    keyPersonalitiesEn: ['Al-Muthanna ibn Harithah (RA)', 'Mas\'ud ibn Harithah (RA)'],
    muslimForcesBn: '১২,০০০ মুজাহিদ',
    muslimForcesEn: '12,000 Mujahideen',
    enemyForcesBn: '৪০,০০০ পারস্য সেনা ও হস্তী দল',
    enemyForcesEn: '40,000 Persians with war elephants',
    muslimMartyrsBn: 'কয়েক শত মুজাহিদ (মুসান্নার ভাই মাসউদ রা. সহ)',
    muslimMartyrsEn: 'A few hundred martyrs (including Mas\'ud, brother of Muthanna)',
    enemyCasualtiesBn: 'মিহরান নিহত ও পারস্য বাহিনী সম্পূর্ণ নিশ্চিহ্ন',
    enemyCasualtiesEn: 'Mihran slain; Persian force virtually wiped out',
    detailedHistoryBn: 'সেতুর যুদ্ধের শিক্ষা নিয়ে মুসান্না (রা.) এবার শত্রুকে নদী পার করিয়ে ফাঁদে ফেলেন। রমজানের রোজা অবস্থায় মুজাহিদগণ এমন প্রচণ্ড পাল্টা আঘাত হানেন যে সেনাপতি মিহরান নিহত হয় এবং পারস্য বাহিনী নদীর দিকে পালাতে গিয়ে সম্পূর্ণ বিধ্বস্ত হয়।',
    detailedHistoryEn: 'Applying the hard lesson of the Bridge, Al-Muthanna baited the Persians to cross the river. The fasting Muslims unleashed an overwhelming counter-charge, slaying Mihran and shattering the army against the riverbank.',
    emotionalStoryBn: 'মুসান্নার ভাই মাসউদ শাহাদাত বরণ করার সময় চিৎকার করে বললেন: "আমার মৃত্যু যেন তোমাদের দুর্বল না করে; তোমরা পতাকা ঊর্ধ্বে তুলে রাখো!" মুসান্না ভাইয়ের লাশ দেখে কাঁদেননি, বরং আরও ক্ষিপ্র হয়ে শত্রুর ওপর ঝাঁপিয়ে পড়েন।',
    emotionalStoryEn: 'As Muthanna\'s brother Mas\'ud fell dying, he cried: "Let not my death weaken you; raise the standard!" Muthanna channeled his grief into ferocious resolve, personally securing victory.',
    shuhada: [
      {
        nameBn: 'হযরত মাসউদ ইবনে হারিসাহ (রা.)',
        nameEn: 'Hazrat Mas\'ud ibn Harithah (RA)',
        roleBn: 'মুসান্নার ভাই ও বীর অশ্বারোহী',
        roleEn: 'Brother of Muthanna & cavalry leader',
        detailsBn: 'শত্রু সেনাপতি মিহরানের ব্যূহে আঘাত হানতে গিয়ে শাহাদাত বরণ করেন।',
        detailsEn: 'Martyred while leading the frontline cavalry strike.'
      }
    ],
    keyEvents: [
      {
        titleBn: '১. কাদিসিয়া বিজয়ের মোক্ষম ভিত্তিপ্রস্তর',
        titleEn: '1. Foundation for Qadisiyyah',
        descriptionBn: 'এই যুদ্ধের মাধ্যমে মেসোপটেমিয়ায় মুসলিমদের সামরিক কর্তৃত্ব প্রতিষ্ঠিত হয়।',
        descriptionEn: 'Permanently broke Persian offensive capabilities in lower Iraq.',
        icon: '🏆'
      }
    ],
    historicalLessonsBn: ['বিপর্যয় থেকে যে জাতি দ্রুত ঘুরে দাঁড়াতে পারে, জয় তাদেরই পদচুম্বন করে।'],
    historicalLessonsEn: ['True champions absorb failure and forge it into ultimate victory.'],
    references: ['তারিখে তাবারী', 'আল-বিদায়া ওয়ান নিহায়া']
  },

  // ==========================================
  // ১৭. কাদিসিয়ার যুদ্ধ
  // ==========================================
  {
    id: 'qadisiyyah',
    orderNumber: 17,
    nameBn: 'কাদিসিয়ার যুদ্ধ',
    nameEn: 'Battle of al-Qadisiyyah',
    nameAr: 'مَعْرَكَةُ القَادِسِيَّةِ الخَالِدَةِ',
    eraKey: 'rashidun',
    eraBn: '২. খিলাফতে রাশিদা (১৪ হিজরি)',
    eraEn: '2. Rashidun Caliphate (14 AH)',
    dateBn: 'শাওয়াল, ১৪ হিজরি (নভেম্বর ৬৩৬ খ্রি.)',
    dateEn: 'Shawwal, 14 AH (November 636 CE)',
    locationBn: 'আল-কাদিসিয়া প্রান্তর, কুফার নিকটে (ইরাক)',
    locationEn: 'Plains of al-Qadisiyyah, near Kufa (Iraq)',
    causeBn: 'পারস্য সাসানীয় সাম্রাজ্যের সর্বাধিনায়ক রুস্তম কর্তৃক সমগ্র পারস্যের শক্তি একত্রিত করে মুসলিমদের আরব মরুভূমিতে তাড়িয়ে দেওয়ার চূড়ান্ত সংকল্প।',
    causeEn: 'The definitive clash against Rostam Farrokhzad\'s 100,000-man imperial army seeking to expel Muslims back into the desert.',
    commanderMuslimsBn: 'সা’দ ইবনে আবি ওয়াক্কাস (রা.) (অসুস্থতার কারণে তাঁবু থেকে নির্দেশ প্রদান)',
    commanderMuslimsEn: 'Sa\'d ibn Abi Waqqas (RA) (Commanded from battle tower due to severe sciatica)',
    commanderEnemyBn: 'রুস্তম ফারুখজাদ (পারস্যের অজেয় সর্বাধিনায়ক)',
    commanderEnemyEn: 'Rostam Farrokhzad (Supreme Sassanid Commander-in-Chief)',
    keyPersonalitiesBn: ['সা’দ ইবনে আবি ওয়াক্কাস (রা.)', 'রাবঈ ইবনে আমির (রা.)', 'আল-কা’কা ইবনে আমর (রা.)', 'আবু মিহজান আস-সাকাফি (রা.)'],
    keyPersonalitiesEn: ['Sa\'d ibn Abi Waqqas (RA)', 'Rib\'i ibn Amir (RA)', 'Al-Qa\'qa ibn Amr (RA)', 'Abu Mihjan ath-Thaqafi (RA)'],
    muslimForcesBn: '৩০,০০০ থেকে ৩২,০০০ মুজাহিদ',
    muslimForcesEn: '30,000 to 32,000 Mujahideen',
    enemyForcesBn: '১,০০,০০০ সুসজ্জিত পারস্য সৈন্য (৩৩টি দানবাকৃতির রণহস্তী সমৃদ্ধ)',
    enemyForcesEn: '100,000 elite Sassanid soldiers with 33 armored war elephants',
    muslimMartyrsBn: '২,৫০০ জন মহিমান্বিত সাহাবি ও মুজাহিদ',
    muslimMartyrsEn: '2,500 Honored Martyrs',
    enemyCasualtiesBn: 'সেনাপতি রুস্তমসহ ৪০,০০০ পারস্য সেনা নিহত ও পারস্যের রাজকীয় পতাকা "দেরাফশ কাভিয়ানি" দখল',
    enemyCasualtiesEn: 'Rostam killed; 40,000 Persians slain; the sacred imperial standard captured',
    detailedHistoryBn: 'কাদিসিয়া ছিল বিশ্ব ইতিহাসের অন্যতম সেরা রক্তক্ষয়ী ও নির্ণায়ক সংঘাত। টানা চার দিনব্যাপী এই যুদ্ধ চলেছিল যার প্রতিটি দিনের আলাদা নাম ছিল: আরমাথ, আগওয়াস, আমাস এবং লাইলাতুল হারির (ঘোরতর ক্রন্দনের রাত)। পারস্যের ৩৩টি দানবীয় হাতি প্রথম দুই দিন মুসলিম বাহিনীর ওপর ত্রাস সৃষ্টি করে। তৃতীয় দিনে আল-কা’কা ও আসিম (রা.) উটের গায়ে অদ্ভুত খোলস পরিয়ে পারস্যের ঘোড়াগুলোকে ভীত করে তোলেন এবং তীর মেরে প্রধান হাতির চোখ অন্ধ করে শুঁড় কেটে ফেলেন। শেষ রাতের অন্ধকারে মুজাহিদগণ রুস্তমের রাজকীয় শিবিরের দিকে অগ্রসর হন। হিলাল ইবনে উলকাহ রুস্তমকে বধ করে তার সিংহাসনে উঠে চিৎকার করে ওঠেন: "কাবার রবের কসম! আমি রুস্তমকে হত্যা করেছি!" এর মাধ্যমেই হাজার বছরের পারস্য সাম্রাজ্য ভেঙে পড়ে।',
    detailedHistoryEn: 'Qadisiyyah raged across four relentless days: Armath, Aghwath, Imas, and the terrible Night of Clangor (Laylat al-Harir). Initially, 33 Sassanid elephants terrified Muslim horses. On day three, Al-Qa\'qa disguised camels with flapping robes, terrifying the Persian horses in return, while sharpshooters blinded the lead elephant and cut its trunk. During the storm on the final morning, Hilal ibn Ullafah tracked Rostam to the riverbank and slew him, mounting the golden throne shouting: "By the Lord of the Ka\'bah, I have killed Rostam!" The millennium-old Persian Empire collapsed.',
    emotionalStoryBn: 'যুদ্ধের আগে রুস্তমের জাঁকজমকপূর্ণ দরবারে সাধারণ জীর্ণ পোশাকে যান দূত হযরত রাবঈ ইবনে আমির (রা.)। রুস্তম অহংকার করে বলল: "তোমরা কেন এসেছ?" রাবঈ (রা.) নির্ভীক কণ্ঠে ঘোষণা করলেন সেই অমর বাণী: "আল্লাহ আমাদেরকে পাঠিয়েছেন যাতে আমরা মানুষকে মানুষের গোলামি থেকে মুক্ত করে একমাত্র আল্লাহর গোলামির দিকে, দুনিয়ার সংকীর্ণতা থেকে আখেরাতের প্রশস্ততার দিকে এবং ধর্মের অবিচার থেকে ইসলামের ইনসাফের দিকে নিয়ে আসি!" দরবারের শত শত পারস্য প্রহরী এই ইমানি তেজের সামনে স্তম্ভিত হয়ে গিয়েছিল।',
    emotionalStoryEn: 'Before battle, Rib\'i ibn Amir arrived at Rostam\'s diamond-studded court wearing worn clothes upon a modest horse. When Rostam demanded his mission, Rib\'i delivered one of the greatest proclamations in history: "Allah has sent us to liberate mankind from the servitude of creation to the worship of the One Creator, from the narrowness of this world to the vastness of the Hereafter, and from the tyranny of religions to the justice of Islam!" The entire court stood stunned in awe.',
    shuhada: [
      {
        nameBn: 'কাদিসিয়ার ২,৫০০ শহীদ মুজাহিদ',
        nameEn: 'The 2,500 Martyrs of Qadisiyyah',
        roleBn: 'হস্তীবাহিনী প্রতিরোধকারী ও সম্মুখ বীর সেনানী',
        roleEn: 'Frontline heroes who neutralized the elephant corps',
        detailsBn: 'টানা চার দিনের রক্তক্ষয়ী যুদ্ধে হস্তীবাহিনীর আক্রমণ বুক পেতে প্রতিহত করে শাহাদাত বরণ করেন।',
        detailsEn: 'Fought non-stop for four grueling days, absorbing elephant charges until achieving victory.'
      }
    ],
    keyEvents: [
      {
        titleBn: '১. রাবঈ ইবনে আমিরের কালজয়ী স্বাধীনতার ভাষণ',
        titleEn: '1. Rib\'i ibn Amir\'s Historic Declaration',
        descriptionBn: 'মানুষকে মানুষের গোলামি থেকে মুক্ত করার শাশ্বত ঘোষণা পারস্য দরবারে প্রতিধ্বনিত হয়।',
        descriptionEn: 'The immortal declaration of human liberation from earthly tyrants.',
        icon: '👑'
      },
      {
        titleBn: '২. হাতির চোখ অন্ধ ও শুঁড় কর্তন অভিযান',
        titleEn: '2. Neutralizing the War Elephants',
        descriptionBn: 'আল-কা’কা ও আসিম (রা.) তীর মেরে সাদা ও ধূসর হাতির চোখ অন্ধ করে পুরো হস্তীবাহিনীকে অকার্যকর করেন।',
        descriptionEn: 'Elite archers blinded the lead elephants, driving them stampeding back over Persian ranks.',
        icon: '🐘'
      },
      {
        titleBn: '৩. সেনাপতি রুস্তমের পতন ও সাম্রাজ্যের অবসান',
        titleEn: '3. Fall of Rostam',
        descriptionBn: 'হিলাল ইবনে উলকাহ কর্তৃক রুস্তম নিহত হয় এবং তিসফুনের রাজপ্রাসাদের চাবি মুসলিমদের হাতে আসে।',
        descriptionEn: 'Rostam was slain and the thousand-year Sassanid monarchy collapsed.',
        icon: '⚔️'
      }
    ],
    historicalLessonsBn: [
      'ইসলামের মূল উদ্দেশ্য কোনো জমি দখল নয়, বরং মানবতাকে জুলুমের দাসত্ব থেকে মুক্ত করা।',
      'প্রচণ্ড সংকট ও প্রতিকূলতার মধ্যেও অবিচল থাকলে আল্লাহর সাহায্য অবধারিত।'
    ],
    historicalLessonsEn: [
      'Islam\'s mission is the spiritual and sociopolitical liberation of humanity from tyranny.',
      'Steadfast endurance in the darkest hours commands heavenly victory.'
    ],
    references: ['তারিখে তাবারী', 'আল-বিদায়া ওয়ান নিহায়া', 'ফতূহুল বুলদান', 'আল-কামিল ফিত-তারিখ']
  },

  // ==========================================
  // ১৮. দামেশক বিজয়
  // ==========================================
  {
    id: 'damascus_conquest',
    orderNumber: 18,
    nameBn: 'দামেশক বিজয়',
    nameEn: 'Conquest of Damascus',
    nameAr: 'فَتْحُ دِمَشْقَ الفَيْحَاءِ',
    eraKey: 'rashidun',
    eraBn: '২. খিলাফতে রাশিদা (১৪ হিজরি)',
    eraEn: '2. Rashidun Caliphate (14 AH)',
    dateBn: 'রজব, ১৪ হিজরি (সেপ্টেম্বর ৬৩৫ খ্রি.)',
    dateEn: 'Rajab, 14 AH (September 635 CE)',
    locationBn: 'প্রাচীন দামেস্ক নগরী ও বাব শারকি প্রবেশদ্বার (সিরিয়া)',
    locationEn: 'Ancient City of Damascus & Bab Sharqi (Syria)',
    causeBn: 'বাইজেন্টাইন সাম্রাজ্যের হাত থেকে প্রাচ্যের প্রাচীনতম মুক্ত নগরী দামেস্কে ইসলামি শান্তি প্রতিষ্ঠা।',
    causeEn: 'Liberating the ancient Levant metropolis from Byzantine military control.',
    commanderMuslimsBn: 'খালিদ বিন ওয়ালিদ ও আবু উবাইদাহ ইবনুল জাররাহ (রা.)',
    commanderMuslimsEn: 'Khalid ibn al-Walid & Abu Ubaidah ibn al-Jarrah (RA)',
    commanderEnemyBn: 'টমাস (রোমান সেনাপতি ও সম্রাটের জামাতা)',
    commanderEnemyEn: 'Thomas (Byzantine Commander & son-in-law of Heraclius)',
    keyPersonalitiesBn: ['খালিদ বিন ওয়ালিদ (রা.)', 'আবু উবাইদাহ (রা.)', 'আমর ইবনুল আস (রা.)'],
    keyPersonalitiesEn: ['Khalid ibn al-Walid (RA)', 'Abu Ubaidah (RA)', 'Amr ibn al-Aas (RA)'],
    muslimForcesBn: '২০,০০০ মুজাহিদ',
    muslimForcesEn: '20,000 Mujahideen',
    enemyForcesBn: '৩০,০০০ সুরক্ষিত রোমান সেনাদল',
    enemyForcesEn: '30,000 fortified Roman troops',
    muslimMartyrsBn: 'কয়েকজন মুজাহিদ',
    enemyCasualtiesBn: 'শান্তিপূর্ণ আত্মসমর্পণ ও শহরের অন্তর্ভুক্তি',
    enemyCasualtiesEn: 'Peaceful capitulation and treaty',
    detailedHistoryBn: 'দামেস্ক অবরোধের সময় খালিদ (রা.) এক গভীর রাতে রশি ও মই দিয়ে প্রাচীর বেয়ে উঠে বাব শারকি (পূর্ব দরজা) খুলে দেন। অন্যদিকে আবু উবাইদাহ (রা.) বাব আল-জাবিয়াহ দিয়ে শান্তিপূর্ণ শর্তে প্রবেশ করেন। দুই সেনাপতি শহরের মাঝখানে মিলিত হয়ে শান্তিচুক্তি বহাল রাখেন।',
    detailedHistoryEn: 'During the siege, Khalid scaled the walls at night via rope ladders and breached the East Gate (Bab Sharqi). Concurrently, Abu Ubaidah entered the West Gate under a negotiated treaty. Meeting in the center, they honored the treaty, sparing the city.',
    emotionalStoryBn: 'খালিদ (রা.) যুদ্ধাবস্থায় প্রবেশ করলেও আবু উবাইদাহর শান্তিচুক্তির সম্মানার্থে তলোয়ার কোষবদ্ধ করেন এবং শহরের সকল গির্জা ও নাগরিক সম্পদ রক্ষার অঙ্গীকার করেন।',
    emotionalStoryEn: 'Though Khalid entered through combat, he deferred to Abu Ubaidah\'s peace treaty, proving Islamic reverence for sanctity of life and covenants.',
    shuhada: [],
    keyEvents: [
      {
        titleBn: '১. ইনসাফ ও চুক্তির অতুলনীয় মর্যাদা',
        titleEn: '1. Honoring Treaties Over Conquest',
        descriptionBn: 'মুসলিম সেনাপতিদ্বয় বিরোধ ভুলে নগরবাসীর সাথে করা শান্তিচুক্তি অক্ষুণ্ন রাখেন।',
        descriptionEn: 'The commanders unified their approach to grant peace and protect all churches.',
        icon: '🕊️'
      }
    ],
    historicalLessonsBn: ['চুক্তির মর্যাদা রক্ষা বিজয়ের চেয়েও বড় নৈতিক বিজয়।'],
    historicalLessonsEn: ['Fulfilling covenants of peace transcends the glory of conquest.'],
    references: ['ফতূহুশ শাম', 'তারিখে তাবারী']
  },

  // ==========================================
  // ১৯. ইয়ারমুকের যুদ্ধ
  // ==========================================
  {
    id: 'yarmouk',
    orderNumber: 19,
    nameBn: 'ইয়ারমুকের যুদ্ধ',
    nameEn: 'Battle of Yarmouk',
    nameAr: 'مَعْرَكَةُ اليَرْمُوكِ الخَالِدَةِ',
    eraKey: 'rashidun',
    eraBn: '২. খিলাফতে রাশিদা (১৫ হিজরি)',
    eraEn: '2. Rashidun Caliphate (15 AH)',
    dateBn: 'রজব, ১৫ হিজরি (আগস্ট ৬৩৬ খ্রি.)',
    dateEn: 'Rajab, 15 AH (August 636 CE)',
    locationBn: 'ইয়ারমুক নদী তীর ও গিরিখাত (জর্ডান ও সিরিয়া সীমান্ত)',
    locationEn: 'Ravines of the Yarmouk River (Jordan-Syria border)',
    causeBn: 'বাইজেন্টাইন রোমান সম্রাট হিরাক্লিয়াস কর্তৃক দেড় থেকে দুই লক্ষ সৈন্যের বিশাল সাম্রাজ্যবাদী বাহিনী নিয়ে মধ্যপ্রাচ্য থেকে ইসলামকে চিরতরে মুছে ফেলার সর্বাত্মক আগ্রাসন।',
    causeEn: 'Emperor Heraclius deploying a catastrophic imperial army of 150,000+ to extinguish the Islamic presence in the Levant.',
    commanderMuslimsBn: 'খালিদ বিন ওয়ালিদ ও আবু উবাইদাহ ইবনুল জাররাহ (রা.)',
    commanderMuslimsEn: 'Khalid ibn al-Walid & Abu Ubaidah ibn al-Jarrah (RA)',
    commanderEnemyBn: 'বাহান ও সেহোরিয়াস (রোমান শীর্ষ রাজকীয় সেনাপতিদ্বয়)',
    commanderEnemyEn: 'Vahan & Gregory (Armenian & Byzantine Field Marshals)',
    keyPersonalitiesBn: ['খালিদ বিন ওয়ালিদ (রা.)', 'ইকরামা ইবনে আবু জাহল (রা.)', 'যিরার ইবনে আজওয়ার (রা.)', 'উম্মু হাকিম (রা.)', 'আবু সুফিয়ান (রা.)'],
    keyPersonalitiesEn: ['Khalid ibn al-Walid (RA)', 'Ikrimah ibn Abi Jahl (RA)', 'Dirar ibn al-Azwar (RA)', 'Umm Hakim (RA)', 'Abu Sufyan (RA)'],
    muslimForcesBn: '৪০,০০০ অকুতোভয় মুজাহিদ (১,০০০ সাহাবি ও ১০০ জন বদরি সাহাবিসহ)',
    muslimForcesEn: '40,000 Mujahideen (including 1,000 companions and 100 veterans of Badr)',
    enemyForcesBn: '১,৫০,০০০ থেকে ২,০০,০০০ সুসজ্জিত রোমান, আর্মেনীয়, স্লাভিক ও ঘাসসানীয় যৌথ সৈন্য',
    enemyForcesEn: '150,000 to 200,000 elite Byzantine, Armenian, Slavic, and Frankish legions',
    muslimMartyrsBn: '৩,০০০ বীর সাহাবি ও মুজাহিদ (হযরত ইকরামা রা. সহ)',
    muslimMartyrsEn: '3,000 Martyrs (including Ikrimah ibn Abi Jahl and his cavalry)',
    enemyCasualtiesBn: '৭০,০০০-এর বেশি রোমান সৈন্য নিহত ও খাড়া গিরিখাতে পড়ে বিধ্বস্ত; রোমান সাম্রাজ্যের সমাপ্তি',
    enemyCasualtiesEn: '70,000+ Byzantines slain or pushed into deep ravines; permanent loss of the Levant',
    detailedHistoryBn: 'ইয়ারমুকের যুদ্ধ বিশ্ব ইতিহাসের অন্যতম সেরা কৌশলগত নির্ণায়ক যুদ্ধ। টানা ছয় দিনব্যাপী চলা এই যুদ্ধে খালিদ (রা.) তাঁর ৪০ হাজার বাহিনীকে চমৎকারভাবে পুনর্গঠন করেন। যুদ্ধের মাঝপথে খলিফা আবু বকরের ইন্তেকাল ও খলিফা উমর কর্তৃক আবু উবাইদাহকে প্রধান করার চিঠি এলেও খালিদ সৈন্যদলের মনোবল রক্ষার স্বার্থে যুদ্ধ শেষ না হওয়া পর্যন্ত তা প্রকাশ করেননি। পঞ্চম ও ষষ্ঠ দিনে খালিদ তাঁর ক্ষিপ্র অশ্বারোহী ফাঁদ দিয়ে রোমান অশ্বারোহীদের পদাতিক বাহিনী থেকে বিচ্ছিন্ন করে দেন এবং তাদের খাড়া গিরিখাতে ফেলে দেন। সম্রাট হিরাক্লিয়াস অ্যান্টিওক থেকে পালিয়ে যাওয়ার সময় কেঁদে বিদায় জানিয়েছিলেন: "বিদায় সিরিয়া! এক অনন্ত বিদায়!"',
    detailedHistoryEn: 'Yarmouk is widely regarded as one of the greatest tactical masterstrokes in history. Spanning six grueling days, Khalid restructured his 40,000 men into flexible squadrons. When a letter arrived from Caliph Umar appointing Abu Ubaidah as commander, Khalid kept it confidential to preserve morale. On day six, Khalid launched a devastating cavalry counter-thrust, severing the Roman cavalry from their infantry and trapping legions against the sheer chasm of Wadi ar-Raqqad. Fleeing Antioch, Emperor Heraclius wept: "Farewell, Syria, a farewell after which we shall never meet again!"',
    emotionalStoryBn: 'ইয়ারমুকের সবচেয়ে অমর ও অশ্রুসিক্ত দৃশ্য ছিল হযরত ইকরামা ইবনে আবু জাহল (রা.)-এর আত্মোৎসর্গ। রোমানদের প্রচণ্ড আক্রমণের মুখে যখন মুসলিম লাইন ভেঙে পড়ার উপক্রম হয়, ইকরামা চিৎকার করে ওঠেন: "আমি জাহেলিয়াতের যুগে রাসুলের বিরুদ্ধে বহু লড়েছি; আজ কি আমি পিছু হটব? কে আছ আমার সাথে মৃত্যুর শপথ নেবে?" চারশত বীর অশ্বারোহী তাঁর ডাকে মৃত্যুর শপথ নিয়ে রোমান ব্যূহে ঝাঁপিয়ে পড়েন। যুদ্ধ শেষে দেখা যায় ইকরামা, সুহাইল ও হারিস ইবনে হিশাম রক্তাক্ত অবস্থায় মৃত্যুর কোলে ঢলে পড়েছেন। একজন পানি নিয়ে এলে ইকরামা ইশারা করলেন পাশের ভাইকে দিতে, তিনি দিলেন তৃতীয় জনকে। কিন্তু পানি পৌঁছার আগেই একে একে তিনজনই তৃষ্ণার্ত অবস্থায় শাহাদাতের কোলে ঢলে পড়লেন!',
    emotionalStoryEn: 'The most sublime narrative was the "Pledge of Death" by Ikrimah ibn Abi Jahl (RA). Facing a shattering Roman breakthrough, Ikrimah cried: "I fought the Messenger of Allah in Jahiliyyah; shall I flee today? Who will pledge death with me?" 400 riders charged into the legions, saving the army. In the aftermath, Ikrimah, Harith ibn Hisham, and Ayyash lay dying. When water was brought to Ikrimah, he pointed to Harith; Harith pointed to Ayyash. Before water reached him, Ayyash passed away, followed by the other two—all martyred while prioritizing their brother\'s thirst.',
    shuhada: [
      {
        nameBn: 'হযরত ইকরামা ইবনে আবু জাহল (রা.)',
        nameEn: 'Hazrat Ikrimah ibn Abi Jahl (RA)',
        roleBn: 'উহুদের কুখ্যাত দুশমন থেকে ইসলামের অমর আত্মোৎসর্গকারী বীর',
        roleEn: 'Former foe turned legendary martyr of Islam',
        detailsBn: '৪০০ বীর সঙ্গীকে নিয়ে "মৃত্যুর বাইয়াত" গ্রহণ করে রোমান ব্যূহে ঝাঁপিয়ে পড়েন। তাঁর সারা শরীরে ৭০টিরও বেশি তলোয়ার ও তীরের আঘাত ছিল।',
        detailsEn: 'Led 400 riders in the Pledge of Death, stopping the Byzantine breakthrough with over 70 wounds.'
      },
      {
        nameBn: 'হযরত আইয়্যাশ ইবনে আবি রাবিয়া (রা.)',
        nameEn: 'Hazrat Ayyash ibn Abi Rabi\'ah (RA)',
        roleBn: 'মুহাজির সাহাবি',
        roleEn: 'Devout early Muhajir companion',
        detailsBn: 'মৃত্যুমুখে পানি অন্য ভাইকে উৎসর্গ করে তৃষ্ণার্ত অবস্থায় শাহাদাত বরণ করেন।',
        detailsEn: 'Passed away thirsty after repeatedly deferring water to his dying brethren.'
      },
      {
        nameBn: 'হযরত হারিস ইবনে হিশাম (রা.)',
        nameEn: 'Hazrat Harith ibn Hisham (RA)',
        roleBn: 'কুরাইশ অভিজাত থেকে নিবেদিতপ্রাণ মুজাহিদ',
        roleEn: 'Quraysh nobleman and dedicated warrior',
        detailsBn: 'ইকরামার সাথে সম্মুখ সমরে বর্শাবিদ্ধ হয়ে শাহাদাতের অমিয় সুধা পান করেন।',
        detailsEn: 'Martyred alongside Ikrimah in the vanguard counter-attack.'
      }
    ],
    keyEvents: [
      {
        titleBn: '১. ইকরামা (রা.)-এর ৪০০ বীরের "মৃত্যুর শপথ"',
        titleEn: '1. The 400-Man Pledge of Death',
        descriptionBn: 'ইকরামার নেতৃত্বাধীন ৪০০ মুজাহিদ রোমানদের চূড়ান্ত আক্রমণ রুখে দিয়ে ইসলামের বিজয় ছিনিয়ে আনেন।',
        descriptionEn: 'Ikrimah\'s 400 riders turned the tide of battle through suicidal valor.',
        icon: '⚔️'
      },
      {
        titleBn: '২. মুসলিম নারীদের বীরত্বগাথা',
        titleEn: '2. Heroism of Muslim Women',
        descriptionBn: 'উম্মু হাকিম, আসমা বিনতে আবি বকর ও খাওলা তাঁবুর খুঁটি নিয়ে পলায়নপর সৈন্যদের উৎসাহ দেন ও শত্রুকে রুখে দেন।',
        descriptionEn: 'Women armed with tent poles stood behind the lines, rallying men and beating back Romans.',
        icon: '🛡️'
      },
      {
        titleBn: '৩. রোমান সাম্রাজ্যের চিরতরে শাম ত্যাগ',
        titleEn: '3. Roman Empire Leaves Syria Forever',
        descriptionBn: 'সম্রাট হিরাক্লিয়াস চোখের জলে শাম ত্যাগ করেন এবং আল-কুদস (জেরুজালেম) বিজয়ের পথ উন্মুক্ত হয়।',
        descriptionEn: 'Heraclius wept leaving Syria, opening the golden doors for Jerusalem\'s liberation.',
        icon: '👑'
      }
    ],
    historicalLessonsBn: [
      'উম্মাহর ক্রান্তিলগ্নে সেনাপতির পদমর্যাদার অহংকার ভুলে একতাবদ্ধ থাকা বিজয়ের চাবিকাঠি।',
      'মৃত্যুর মুখেও অন্য ভাইয়ের প্রতি সহমর্মিতা ও আত্মত্যাগ প্রদর্শনই সাহাবিদের শ্রেষ্ঠত্বের কারণ।',
      'দেশ ও দ্বীন রক্ষায় পুরুষের পাশাপাশি নারীদের সাহসী ভূমিকা ইতিহাসের গৌরবোজ্জ্বল অধ্যায়।'
    ],
    historicalLessonsEn: [
      'Subordinating personal ego and command titles for the collective good guarantees divine support.',
      'Preferring a brother\'s life over one\'s own even while dying embodies the peak of faith.',
      'Women\'s active courage in defense of sacred values is an immortal pillar of Islamic history.'
    ],
    references: ['তারিখে তাবারী', 'আল-বিদায়া ওয়ান নিহায়া', 'ফতূহুশ শাম', 'আল-কামিল ফিত-তারিখ']
  },

  // ==========================================
  // ২০. নাহাওয়ান্দ যুদ্ধ (বিজয়ের বিজয়)
  // ==========================================
  {
    id: 'nahavand',
    orderNumber: 20,
    nameBn: 'নাহাওয়ান্দ যুদ্ধ (বিজয়ের বিজয়)',
    nameEn: 'Battle of Nahavand (Fath al-Futuh)',
    nameAr: 'مَعْرَكَةُ نَهَاوَنْدَ (فَتْحُ الفُتُوحِ)',
    eraKey: 'rashidun',
    eraBn: '২. খিলাফতে রাশিদা (২১ হিজরি)',
    eraEn: '2. Rashidun Caliphate (21 AH)',
    dateBn: '২১ হিজরি (৬৪২ খ্রি.)',
    dateEn: '21 AH (642 CE)',
    locationBn: 'নাহাওয়ান্দ উপত্যকা (ইরানের হামাদান প্রদেশ)',
    locationEn: 'Nahavand Valley (Hamadan Province, Iran)',
    causeBn: 'পারস্য সম্রাট ইয়াজদগার্দ তৃতীয় কর্তৃক দেড় লক্ষ সৈন্য একত্র করে মুসলিমদের বিরুদ্ধে পারস্য সাম্রাজ্য পুনরুদ্ধারের শেষ সর্বাত্মক প্রচেষ্টা।',
    causeEn: 'Sassanid Emperor Yazdegerd III mobilizing 150,000 imperial troops for a final stand to reclaim Persia.',
    commanderMuslimsBn: 'নোমান ইবনে মুকাররিন (রা.)',
    commanderMuslimsEn: 'Nu\'man ibn Muqarrin (RA)',
    commanderEnemyBn: 'ফিরুযান (পারস্যের প্রধান সেনাপতি)',
    commanderEnemyEn: 'Piruzan (Sassanid Commander-in-Chief)',
    keyPersonalitiesBn: ['নোমান ইবনে মুকাররিন (রা.)', 'হুদায়ফা ইবনুল ইয়ামান (রা.)', 'আল-কা’কা ইবনে আমর (রা.)'],
    keyPersonalitiesEn: ['Nu\'man ibn Muqarrin (RA)', 'Hudhayfah ibn al-Yaman (RA)', 'Al-Qa\'qa ibn Amr (RA)'],
    muslimForcesBn: '৩০,০০০ বীর মুজাহিদ',
    muslimForcesEn: '30,000 Mujahideen',
    enemyForcesBn: '১,৫০,০০০ সুসজ্জিত পারস্য সেনা (লোহার পেরেক ও শিকল পরিবেষ্টিত)',
    enemyForcesEn: '150,000 entrenched Persians inside fortified mountain redoubts',
    muslimMartyrsBn: 'সেনাপতি নোমান (রা.) সহ সহস্রাধিক মুজাহিদ',
    muslimMartyrsEn: 'Commander Nu\'man and hundreds of martyrs',
    enemyCasualtiesBn: 'সেনাপতি ফিরুযানসহ ৮০,০০০ পারস্য সৈন্য নিহত; পারস্যের চূড়ান্ত পতন',
    enemyCasualtiesEn: 'Piruzan killed; 80,000 Persians slain; final extinction of the Sassanid dynasty',
    detailedHistoryBn: 'নাহাওয়ান্দ যুদ্ধকে ইসলামের ইতিহাসে "ফাতহুল ফুতুহ" (বিজয়ের মহাবিজয়) বলা হয়। দুর্গম পাহাড়ি দুর্গে অবরুদ্ধ দেড় লক্ষ পারস্য সৈন্য সমতলে নামছিল না। আল-কা’কা ছদ্ম-পলায়নের ফাঁদ পেতে তাদের সমতলে নামিয়ে আনেন। জুমার নামাজের পর সেনাপতি নোমান (রা.) তাকবির দিয়ে আক্রমণ শুরু করেন। রক্তের স্রোতে ঘোড়ার পা পিছলে নোমান (রা.) শাহাদাত বরণ করলেও তাঁর ভাই পতাকা মাটিতে পড়তে দেননি। হুদায়ফা (রা.) দ্রুত দায়িত্ব গ্রহণ করে বিজয় নিশ্চিত করেন।',
    detailedHistoryEn: 'Known in Islamic annals as Fath al-Futuh (The Victory of Victories). Entrenched behind iron caltrops in mountain fortifications, Persians refused battle. Al-Qa\'qa feigned retreat, drawing 150,000 troops into the open plain. Commander Nu\'man charged after Friday prayers. When his horse slipped on blood and Nu\'man was mortally wounded, his brother concealed his death and raised the banner, and Hudhayfah completed the conquest.',
    emotionalStoryBn: 'সেনাপতি নোমান (রা.) যুদ্ধের আগে সাদা কাফনের কাপড় পরে দুআ করেছিলেন: "হে আল্লাহ! ইসলামের এই বিজয়ে আমাকে প্রথম শহীদ হিসেবে কবুল করুন!" খলিফা উমর (রা.) মদিনায় বসে যখন বিজয়ের চিঠি পড়ছিলেন, তখন সেনাপতি নোমানের শাহাদাতের খবর শুনে কান্নায় ভেঙে পড়েছিলেন।',
    emotionalStoryEn: 'Before battle, Commander Nu\'man donned a white shroud praying: "O Allah! Honor Your religion, and make Nu\'man the first martyr today!" When the courier reached Madinah, Caliph Umar wept uncontrollably upon learning of Nu\'man\'s martyrdom.',
    shuhada: [
      {
        nameBn: 'হযরত নোমান ইবনে মুকাররিন (রা.)',
        nameEn: 'Hazrat Nu\'man ibn Muqarrin (RA)',
        roleBn: 'প্রধান সেনাপতি ও মহান সাহাবি',
        roleEn: 'Supreme Commander & revered companion',
        detailsBn: 'কাফনের কাপড় পরে রণাঙ্গনে ঝাঁপিয়ে পড়ে তীরবিদ্ধ হয়ে শাহাদাতের অমিয় সুধা পান করেন।',
        detailsEn: 'Fell leading the Friday afternoon charge, achieving his prayer for martyrdom.'
      },
      {
        nameBn: 'হযরত তুলীহা আল-আসাদি (রা.)',
        nameEn: 'Hazrat Tulayha al-Asadi (RA)',
        roleBn: 'তাওবাকারী বীর যোদ্ধা সাহাবি',
        roleEn: 'Repentant warrior of unmatched prowess',
        detailsBn: 'নাহাওয়ান্দে একাই শত শত্রুর ব্যূহ ভেদ করে বীর বিক্রমে শহীদ হন।',
        detailsEn: 'Martyred cutting deep into Piruzan\'s elite guards.'
      }
    ],
    keyEvents: [
      {
        titleBn: '১. পারস্য সাম্রাজ্যের মানচিত্র থেকে চিরতরে বিলুপ্তি',
        titleEn: '1. Extinction of the Sassanid Empire',
        descriptionBn: 'এই যুদ্ধের পর পারস্য সাম্রাজ্য চিরতরে ভেঙে যায় এবং সমগ্র ইরানে ইসলামের আলো ছড়িয়ে পড়ে।',
        descriptionEn: 'Marked the definitive end of Sassanid Persia, opening the Iranian plateau to Islam.',
        icon: '👑'
      }
    ],
    historicalLessonsBn: ['নেতার শাহাদাতও মুমিনদের মনোবল ভাঙতে পারে না যদি লক্ষ্য থাকে একমাত্র আল্লাহর সন্তুষ্টি।'],
    historicalLessonsEn: ['The death of a leader does not derail an army grounded in transcendent faith.'],
    references: ['তারিখে তাবারী', 'আল-বিদায়া ওয়ান নিহায়া', 'ফতূহুল বুলদান']
  },

  // ==========================================
  // ২১. দেবল এবং সিন্ধু বিজয়
  // ==========================================
  {
    id: 'debal_sindh',
    orderNumber: 21,
    nameBn: 'দেবল এবং সিন্ধু বিজয়',
    nameEn: 'Conquest of Debal & Sindh',
    nameAr: 'فَتْحُ الدَّيْبُلِ وَبِلادِ السِّنْدِ',
    eraKey: 'umayyad',
    eraBn: '৩. উমাইয়া খিলাফত (৯৩ হিজরি)',
    eraEn: '3. Umayyad Caliphate (93 AH)',
    dateBn: '৯৩ হিজরি (৭১২ খ্রি.)',
    dateEn: '93 AH (712 CE)',
    locationBn: 'দেবল ও সিন্ধু নদ অববাহিকা (বর্তমান করাচি ও সিন্ধু প্রদেশ, পাকিস্তান)',
    locationEn: 'Debal & Indus River Valley (Sindh, Pakistan)',
    causeBn: 'সিন্ধুর রাজা দাহিরের জলদস্যু কর্তৃক মুসলিম নারী ও ব্যবসায়ীদের জাহাজ লুণ্ঠন এবং এক মুসলিম নারীর "ওয়া হাজ্জাজ!" আর্তনাদের জবাব।',
    causeEn: 'King Dahir\'s pirates kidnapping Muslim women and children, prompting the expedition under Muhammad bin Qasim.',
    commanderMuslimsBn: 'মুহাম্মদ বিন কাসিম আস-সাকাফি (১৭ বছর বয়সী তরুণ সেনাপতি)',
    commanderMuslimsEn: 'Muhammad bin Qasim ath-Thaqafi (17-year-old general)',
    commanderEnemyBn: 'রাজা দাহির (সিন্ধুর শাসক)',
    commanderEnemyEn: 'Raja Dahir (Ruler of Sindh)',
    keyPersonalitiesBn: ['মুহাম্মদ বিন কাসিম'],
    keyPersonalitiesEn: ['Muhammad bin Qasim'],
    muslimForcesBn: '৬,০০০ সিরীয় অশ্বারোহী ও উষ্ট্রারোহী সেনা',
    muslimForcesEn: '6,000 Syrian cavalry and camel riders',
    enemyForcesBn: '৫০,০০০ রাজপুত ও সিন্ধু সেনা এবং যুদ্ধহস্তী',
    enemyForcesEn: '50,000 troops with war elephants',
    muslimMartyrsBn: 'কয়েক শত মুজাহিদ',
    enemyCasualtiesBn: 'রাজা দাহির নিহত ও সমগ্র সিন্ধু প্রদেশ বিজয়',
    enemyCasualtiesEn: 'Raja Dahir killed; entire province incorporated',
    detailedHistoryBn: '১৭ বছর বয়সী তরুণ মুহাম্মদ বিন কাসিম মানজানিক দিয়ে দেবলের দুর্ভেদ্য মন্দির প্রাচীর গুঁড়িয়ে দেন। বিজয়ের পর তিনি স্থানীয় বৌদ্ধ ও হিন্দু প্রজাদের ওপর ধর্মীয় স্বাধীনতা ও ন্যায়বিচার কায়েম করেন, যার ফলে সিন্ধুর জনগণ তাঁর ভক্ত হয়ে পড়ে এবং এটি "বাবুল ইসলাম" (ইসলামের প্রবেশদ্বার) নামে খ্যাত হয়।',
    detailedHistoryEn: '17-year-old Muhammad bin Qasim utilized advanced siege engines (Manjaniq) to breach Debal. His remarkable justice and tolerance toward local Buddhists and Hindus won hearts, establishing Sindh as "Bab al-Islam" (The Gateway of Islam to the subcontinent).',
    emotionalStoryBn: 'লুণ্ঠিত জাহাজের এক বন্দি মুসলিম নারী চিৎকার করে কেঁদে বলেছিল: "হে হাজ্জাজ, আমাদের বাঁচাও!" এই খবর শুনে খলিফা ও হাজ্জাজ সমগ্র রাষ্ট্রীয় শক্তি নিয়ে ১৭ বছরের তরুণকে পাঠান যিনি ন্যায়বিচার প্রতিষ্ঠা করেন।',
    emotionalStoryEn: 'When a captured Muslim girl cried "Wa Hajjajah!" from pirate dungeons, the empire launched an expedition to safeguard human dignity.',
    shuhada: [],
    keyEvents: [
      {
        titleBn: '১. ভারতীয় উপমহাদেশে ইসলামের প্রবেশদ্বার',
        titleEn: '1. Gateway of Islam to India',
        descriptionBn: 'ভারতবর্ষে প্রথম সুসংগঠিত ইসলামি শাসন ও ইনসাফের সূচনা।',
        descriptionEn: 'Initiated centuries of Islamic heritage in the Indian subcontinent.',
        icon: '🕌'
      }
    ],
    historicalLessonsBn: ['নির্যাতিত নারীর সম্মান রক্ষায় রাষ্ট্রের সর্বোচ্চ শক্তি প্রয়োগ করা ইসলামের সৌন্দর্য।'],
    historicalLessonsEn: ['Protecting vulnerable citizens commands the utmost state resources.'],
    references: ['চাচনামা', 'তারিখে ফিরিশতা', 'ফতূহুল বুলদান']
  },

  // ==========================================
  // ২২. ওয়াদি বারবাতের যুদ্ধ (গুয়াদালেতে)
  // ==========================================
  {
    id: 'guadalete',
    orderNumber: 22,
    nameBn: 'ওয়াদি বারবাতের যুদ্ধ (গুয়াদালেতের যুদ্ধ)',
    nameEn: 'Battle of Guadalete',
    nameAr: 'مَعْرَكَةُ وَادِي لَكَّةَ (بَارْبَاط)',
    eraKey: 'umayyad',
    eraBn: '৩. উমাইয়া খিলাফত (৯২ হিজরি)',
    eraEn: '3. Umayyad Caliphate (92 AH)',
    dateBn: '২৮ রমজান, ৯২ হিজরি (জুলাই ৭১১ খ্রি.)',
    dateEn: '28 Ramadan, 92 AH (July 711 CE)',
    locationBn: 'গুয়াদালেতে নদী তীর (কাদিজ প্রদেশ, স্পেন)',
    locationEn: 'Guadalete River (Cadiz, Andalusia, Spain)',
    causeBn: 'ইউরোপের আইবেরিয়ান উপদ্বীপে (স্পেন) ভিসিগোথ রাজা রডারিকের অত্যাচারী শাসনের অবসান ও ইসলামি সভ্যতা বিস্তার।',
    causeEn: 'Liberating Spain from the oppressive Visigothic monarchy under King Roderic.',
    commanderMuslimsBn: 'তারিক বিন জিয়াদ',
    commanderEnemyBn: 'রাজা রডারিক (ভিসিগোথিক সম্রাট)',
    keyPersonalitiesBn: ['তারিক বিন জিয়াদ', 'মুসা বিন নুসাইর'],
    keyPersonalitiesEn: ['Tariq ibn Ziyad', 'Musa ibn Nusayr'],
    muslimForcesBn: '১২,০০০ বার্বার ও আরব মুজাহিদ',
    muslimForcesEn: '12,000 Berber and Arab Mujahideen',
    enemyForcesBn: '১,০০,০০০ সুসজ্জিত ইউরোপীয় রাজকীয় সৈন্য',
    enemyForcesEn: '100,000 armored Visigothic royal legions',
    muslimMartyrsBn: '৩,০০০ বীর মুজাহিদ',
    muslimMartyrsEn: '3,000 Martyrs',
    enemyCasualtiesBn: 'রাজা রডারিক নিহত ও ভিসিগোথ রাজতন্ত্র চিরতরে বিলুপ্ত',
    enemyCasualtiesEn: 'King Roderic killed; complete dissolution of the Visigoth realm',
    detailedHistoryBn: 'তারিক বিন জিয়াদ জিব্রাল্টার প্রণালী পার হয়ে ঐতিহাসিক ভাষণ দেন: "হে বীরগণ! পলায়নের কোনো পথ নেই; পেছনে সমুদ্র আর সামনে শত্রু!" টানা আট দিনের যুদ্ধের পর রডারিক নিহত হয় এবং প্রায় ৮০০ বছরের গৌরবময় আন্দালুসিয়ান মুসলিম সভ্যতার সূচনা ঘটে।',
    detailedHistoryEn: 'Tariq crossed the straits (Gibraltar - Jabal Tariq) and rallied his men: "Whither can you fly? The sea is behind you and the enemy before you!" In eight days of combat, Roderic was routed, initiating eight centuries of Islamic Andalusia.',
    emotionalStoryBn: 'স্পেনের স্থানীয় ইহুদি ও কৃষকরা রডারিকের নির্যাতনে অতিষ্ঠ হয়ে মুসলিম বাহিনীকে মুক্তির দূত হিসেবে স্বাগত জানায়।',
    emotionalStoryEn: 'Oppressed Jewish populations and serfs welcomed Muslim forces as divine liberators from Visigothic tyranny.',
    shuhada: [],
    keyEvents: [
      {
        titleBn: '১. আন্দালুসিয়ার ৮০০ বছরের সোনালী সভ্যতার সূচনা',
        titleEn: '1. Dawn of 800-Year Andalusian Golden Age',
        descriptionBn: 'ইউরোপে বিজ্ঞান, জ্ঞান ও স্থাপত্যের নবজাগরণের ভিত্তি স্থাপিত হয়।',
        descriptionEn: 'Planted the seeds of European scientific and cultural renaissance in Cordoba.',
        icon: '🏰'
      }
    ],
    historicalLessonsBn: ['অটল আত্মবিশ্বাস ও সংকল্প থাকলে যেকোনো বিশাল সাম্রাজ্য চূর্ণ হতে বাধ্য।'],
    historicalLessonsEn: ['Indomitable resolve collapses the most decadent imperial dynasties.'],
    references: ['নাফহুত তীব', 'তারিখে ইবনে খালদুন']
  },

  // ==========================================
  // ২৩. ট্যুরসের যুদ্ধ (বালাত আশ-শুহাদা)
  // ==========================================
  {
    id: 'tours_poitiers',
    orderNumber: 23,
    nameBn: 'ট্যুরসের যুদ্ধ (বালাত আশ-শুহাদা)',
    nameEn: 'Battle of Tours (Balat al-Shuhada)',
    nameAr: 'مَعْرَكَةُ بَلاطِ الشُّهَدَاءِ',
    eraKey: 'umayyad',
    eraBn: '৩. উমাইয়া খিলাফত (১১৪ হিজরি)',
    eraEn: '3. Umayyad Caliphate (114 AH)',
    dateBn: 'রমজান, ১১৪ হিজরি (অক্টোবর ৭৩২ খ্রি.)',
    dateEn: 'Ramadan, 114 AH (October 732 CE)',
    locationBn: 'পয়টিয়ার্স ও ট্যুরসের মধ্যবর্তী প্রান্তর (প্যারিসের ১৫০ কিমি দূরে, ফ্রান্স)',
    locationEn: 'Between Poitiers & Tours (150 km from Paris, France)',
    causeBn: 'ইউরোপের কেন্দ্রস্থলে ইসলামি সাম্রাজ্যের উত্তরতম বিস্তার ও ফ্রান্স বিজয় প্রচেষ্টা।',
    causeEn: 'Northernmost campaign expanding Islamic governance into France towards Paris.',
    commanderMuslimsBn: 'আবদুর রহমান আল-গাফেকি',
    commanderEnemyBn: 'চার্লস মারটেল (ফ্রাঙ্কিশ রাজা)',
    keyPersonalitiesBn: ['আবদুর রহমান আল-গাফেকি'],
    keyPersonalitiesEn: ['Abd al-Rahman al-Ghafiqi'],
    muslimForcesBn: '১৫,০০০ থেকে ২০,০০০ অশ্বারোহী মুজাহিদ',
    muslimForcesEn: '15,000 to 20,000 cavalry',
    enemyForcesBn: '৩০,০০০ থেকে ৫০,০০০ ফ্রাঙ্কিশ ভারী পদাতিক বাহিনী',
    enemyForcesEn: '30,000 to 50,000 Frankish heavy infantry phalanx',
    muslimMartyrsBn: 'আমির আল-গাফেকি সহ সহস্রাধিক মুজাহিদ (বালাত আশ-শুহাদা বা শহীদদের রাজপথ)',
    muslimMartyrsEn: 'Commander Al-Ghafiqi and thousands of martyrs (Court of Martyrs)',
    enemyCasualtiesBn: 'ফ্রাঙ্কিশ বাহিনীর ব্যাপক ক্ষয়ক্ষতি',
    enemyCasualtiesEn: 'Substantial Frankish casualties',
    detailedHistoryBn: 'প্যারিস থেকে মাত্র দেড়শ কিলোমিটার দূরে পশ্চিম ইউরোপের হৃদয়স্থলে মুসলিম বাহিনী বীরত্বের সাথে লড়ে। গনিমতের পাহারা নিয়ে দ্বিধাদ্বন্দ্বের সুযোগে সেনাপতি গাফেকির শাহাদাত ঘটে। পশ্চিমা ঐতিহাসিক এডওয়ার্ড গিবনের মতে, এই যুদ্ধে মুসলিমরা বিজয়ী হলে অক্সফোর্ড ও প্যারিসের বিশ্ববিদ্যালয়ে আজ কুরআন শিক্ষা দেওয়া হতো।',
    detailedHistoryEn: 'Fought 150 km from Paris. Al-Ghafiqi fought with immense bravery, but when enemy raiders threatened the baggage train, rear lines wavered and Al-Ghafiqi was martyred. Edward Gibbon noted that had Muslims prevailed, the Quran would be taught at Oxford.',
    emotionalStoryBn: 'গাফেকি তাঁর তীরবিদ্ধ বুকে হাত রেখে শেষ নিঃশ্বাস পর্যন্ত মুজাহিদদের শৃঙ্খলা বজায় রাখার নির্দেশ দিয়েছিলেন।',
    emotionalStoryEn: 'Al-Ghafiqi died urging his men to preserve unity, earning this battleground the title "Court of Martyrs".',
    shuhada: [
      {
        nameBn: 'আমির আবদুর রহমান আল-গাফেকি',
        nameEn: 'Amir Abd al-Rahman al-Ghafiqi',
        roleBn: 'প্রধান সেনাপতি ও আন্দালুসের গভর্নর',
        roleEn: 'Supreme Commander & Governor of Andalusia',
        detailsBn: 'সম্মুখ সমরে তীরবিদ্ধ হয়ে শাহাদাত বরণ করেন।',
        detailsEn: 'Martyred while leading the frontline cavalry charge.'
      }
    ],
    keyEvents: [
      {
        titleBn: '১. পশ্চিম ইউরোপের উত্তরতম সীমান্ত',
        titleEn: '1. Northern Apex of the Caliphate',
        descriptionBn: 'বিশ্ব ইতিহাসের অন্যতম সবচেয়ে আলোচিত যুদ্ধ যা ইউরোপের রূপরেখা নির্ধারণ করেছিল।',
        descriptionEn: 'The high-water mark of Islamic expansion in Western Europe.',
        icon: '⚔️'
      }
    ],
    historicalLessonsBn: ['যুদ্ধক্ষেত্রে গনিমতের লোভ ও শৃঙ্খলার শৈথিল্য বিজয় ছিনিয়ে নিতে পারে।'],
    historicalLessonsEn: ['Material distraction during combat undermines divine triumph.'],
    references: ['তারিখে তাবারী', 'হিস্ট্রি অফ দ্য সারাসিন্স (এডওয়ার্ড গিবন)']
  },

  // ==========================================
  // ২৪. তালাস নদীর যুদ্ধ
  // ==========================================
  {
    id: 'talas',
    orderNumber: 24,
    nameBn: 'তালাস নদীর যুদ্ধ',
    nameEn: 'Battle of Talas River',
    nameAr: 'مَعْرَكَةُ نَهْرِ طَلاسَ',
    eraKey: 'abbasid',
    eraBn: '৪. আব্বাসি খিলাফত (১৩৩ হিজরি)',
    eraEn: '4. Abbasid Caliphate (133 AH)',
    dateBn: 'জিলহজ, ১৩৩ হিজরি (জুলাই ৭৫১ খ্রি.)',
    dateEn: 'Dhu al-Hijjah, 133 AH (July 751 CE)',
    locationBn: 'তালাস নদী উপত্যকা (বর্তমান কাজাখস্তান ও কিরগিজস্তান সীমান্ত)',
    locationEn: 'Talas River Valley (Kazakhstan-Kyrgyzstan border)',
    causeBn: 'মধ্য এশিয়ায় চীনা তাং রাজবংশের আগ্রাসন প্রতিহত ও সিল্ক রোডের নিয়ন্ত্রণ।',
    causeEn: 'Halting Tang Chinese expansion into Central Asia and securing the Silk Road.',
    commanderMuslimsBn: 'জিয়াদ ইবনে সালিহ আল-খুজাই',
    commanderEnemyBn: 'গাও শিয়ানঝি (চীনা রাজকীয় সেনাপতি)',
    keyPersonalitiesBn: ['জিয়াদ ইবনে সালিহ', 'আবু মুসলিম খোরাসানি'],
    keyPersonalitiesEn: ['Ziyad ibn Salih', 'Abu Muslim al-Khurasani'],
    muslimForcesBn: '৩০,০০০ মুসলিম ও কারলুক তুর্কি মিত্র সেনা',
    muslimForcesEn: '30,000 Muslim & Karluk Turk allies',
    enemyForcesBn: '১,০০,০০০ সুসজ্জিত চীনা তাং সেনা',
    enemyForcesEn: '100,000 Tang Chinese imperial troops',
    muslimMartyrsBn: 'সহস্রাধিক মুজাহিদ',
    enemyCasualtiesBn: '৫০,০০০ চীনা সেনা নিহত ও ২০,০০০ বন্দি',
    enemyCasualtiesEn: '50,000 Chinese slain, 20,000 captured',
    detailedHistoryBn: 'তালাস নদীর তীরে মুসলিম বাহিনীর কাছে চীনা পরাশক্তি শোচনীয়ভাবে পরাজিত হয়। এই যুদ্ধের ফলেই সমগ্র মধ্য এশিয়ায় চিরতরে ইসলামের আলো প্রতিষ্ঠিত হয়। সবচেয়ে বড় বিষয়, চীনা বন্দিদের কাছ থেকে কাগজ তৈরির প্রযুক্তি শিখে মুসলিম বিশ্ব বাগদাদে বিশ্বের প্রথম কাগজের কারখানা গড়ে তোলে, যা বিশ্বজুড়ে জ্ঞানবিপ্লব ঘটায়।',
    detailedHistoryEn: 'Muslim victory at Talas halted Chinese expansion and secured Central Asia for Islam. Crucially, Chinese artisans captured at Talas introduced papermaking technology to Samarkand and Baghdad, unleashing an unprecedented global scientific revolution.',
    emotionalStoryBn: 'বন্দি চীনা কাগজ কারিগরদের মুক্ত করে সম্মান দেওয়া হয়েছিল এবং তাদের জ্ঞানের মাধ্যমে সমগ্র বিশ্বে কুরআন ও হাদিসের গ্রন্থ সংকলনের বিপ্লব শুরু হয়।',
    emotionalStoryEn: 'Chinese paper artisans were granted liberty in exchange for teaching their craft, facilitating the mass dissemination of Islamic scholarship.',
    shuhada: [],
    keyEvents: [
      {
        titleBn: '১. বিশ্বজুড়ে কাগজ শিল্পের বিপ্লব',
        titleEn: '1. The Global Papermaking Revolution',
        descriptionBn: 'তালাসের মাধ্যমেই ইউরোপ ও বিশ্বে কাগজ তৈরির প্রযুক্তি ছড়িয়ে পড়ে।',
        descriptionEn: 'Introduced paper manufacturing to the Islamic world and Europe.',
        icon: '📜'
      }
    ],
    historicalLessonsBn: ['সামরিক বিজয়ের চেয়েও তার বুদ্ধিবৃত্তিক ও জ্ঞানভিত্তিক প্রভাব মানবসভ্যতাকে বেশি এগিয়ে দেয়।'],
    historicalLessonsEn: ['Intellectual and technological legacies far outshine raw martial conquests.'],
    references: ['তারিখে তাবারী', 'আল-কামিল ফিত-তারিখ']
  },

  // ==========================================
  // ২৫. আম্মুরিয়ার যুদ্ধ
  // ==========================================
  {
    id: 'amorium',
    orderNumber: 25,
    nameBn: 'আম্মুরিয়ার যুদ্ধ',
    nameEn: 'Conquest of Amorium',
    nameAr: 'فَتْحُ عَمُّورِيَّةَ المَجِيدُ',
    eraKey: 'abbasid',
    eraBn: '৪. আব্বাসি খিলাফত (২২৩ হিজরি)',
    eraEn: '4. Abbasid Caliphate (223 AH)',
    dateBn: 'রমজান, ২২৩ হিজরি (আগস্ট ৮৩৮ খ্রি.)',
    dateEn: 'Ramadan, 223 AH (August 838 CE)',
    locationBn: 'আম্মুরিয়া (বর্তমান তুরস্কের আফিয়নকারাহিসার)',
    locationEn: 'Amorium (Afyonkarahisar, Turkey)',
    causeBn: 'রোমানদের হাতে বন্দি এক মুসলিম নারীর "ওয়া মুতাসিমা!" (হে খলিফা মুতাসিম, রক্ষা করুন) ডাকের জবাব।',
    causeEn: 'Answering the desperate plea of an oppressed Muslim captive woman: "Wa Mu\'tasimah!"',
    commanderMuslimsBn: 'খলিফা আল-মুতাসিম বিল্লাহ',
    commanderEnemyBn: 'থিওফিলাস (রোমান বাইজেন্টাইন সম্রাট)',
    keyPersonalitiesBn: ['খলিফা মুতাসিম বিল্লাহ', 'আফশিন'],
    keyPersonalitiesEn: ['Caliph Al-Mu\'tasim', 'Afshin'],
    muslimForcesBn: '৮০,০০০ সুসজ্জিত আব্বাসি সেনাদল',
    muslimForcesEn: '80,000 imperial Abbasid troops',
    enemyForcesBn: '৭০,০০০ বাইজেন্টাইন সৈন্য',
    enemyForcesEn: '70,000 Byzantine defenders',
    muslimMartyrsBn: 'কয়েক শত মুজাহিদ',
    enemyCasualtiesBn: '৩০,০০০ রোমান সৈন্য নিহত ও দুর্গ বিজয়',
    enemyCasualtiesEn: '30,000 Byzantines slain, fortress fallen',
    detailedHistoryBn: 'রোমানদের হাতে বন্দি এক মুসলিম নারী নির্যাতনের শিকার হয়ে চিৎকার করে বলেছিল: "কোথায় খলিফা মুতাসিম!" এই খবর শুনে খলিফা সিংহাসন ছেড়ে চিৎকার করে ওঠেন: "আমি আসছি তোমার ডাকে!" তিনি আশি হাজার বাহিনী নিয়ে রোমান সম্রাটের জন্মভূমি দুর্ভেদ্য আম্মুরিয়া ধ্বংস করে নারীকে মুক্ত করেন।',
    detailedHistoryEn: 'When a Muslim captive woman was slapped and cried "Wa Mu\'tasimah!", Caliph Al-Mu\'tasim rose from his throne shouting: "Here I come!" He marched with 80,000 troops, captured the Byzantine emperor\'s birthplace Amorium, and freed her.',
    emotionalStoryBn: 'খলিফা নিজে বন্দিশালায় গিয়ে সেই নারীকে মুক্ত করে বললেন: "বোন আমার! মুতাসিম কি তোমার ডাকে সাড়া দিতে পেরেছে?"',
    emotionalStoryEn: 'The Caliph personally unshackled the woman: "O sister, did your Mu\'tasim answer your call?"',
    shuhada: [],
    keyEvents: [
      {
        titleBn: '১. নারীর সম্ভ্রম রক্ষায় খেলাফতের পরাকাষ্ঠা',
        titleEn: '1. Defense of Citizens\' Dignity',
        descriptionBn: 'একজন সাধারণ নাগরিকের সম্মানে গোটা সাম্রাজ্য ঝাঁপিয়ে পড়েছিল।',
        descriptionEn: 'The entire weight of an empire mobilized to defend one wronged citizen.',
        icon: '👑'
      }
    ],
    historicalLessonsBn: ['দুর্বলের আর্তনাদে কর্ণপাত করাই ইসলামি রাষ্ট্রনায়কের প্রধান দায়িত্ব।'],
    historicalLessonsEn: ['Responding to the cries of the oppressed is the sacred duty of leadership.'],
    references: ['তারিখে তাবারী', 'আল-বিদায়া ওয়ান নিহায়া', 'দেওয়ানে আবু তাম্মাম']
  },

  // ==========================================
  // ২৬. সোমনাথ অভিযান
  // ==========================================
  {
    id: 'somnath',
    orderNumber: 26,
    nameBn: 'সোমনাথ অভিযান',
    nameEn: 'Expedition of Somnath',
    nameAr: 'حَمْلَةُ سُومَنَات الهِنْدِيَّةِ',
    eraKey: 'abbasid',
    eraBn: '৪. আব্বাসি খিলাফত (৪১৬ হিজরি)',
    eraEn: '4. Abbasid Caliphate (416 AH)',
    dateBn: 'শাওয়াল, ৪১৬ হিজরি (জানুয়ারি ১০২৬ খ্রি.)',
    dateEn: 'Shawwal, 416 AH (January 1026 CE)',
    locationBn: 'সোমনাথ মন্দির প্রান্তর (গুজরাট, ভারত)',
    locationEn: 'Somnath (Gujarat, India)',
    causeBn: 'ভারতবর্ষে ইসলামি শাসন সুদৃঢ়করণ ও বহুঈশ্বরবাদী অহংকার দমন।',
    causeEn: 'Challenging polytheist defiance and consolidating Islamic rule in India.',
    commanderMuslimsBn: 'সুলতান মাহমুদ গজনভি',
    commanderEnemyBn: 'রাজা ভীমদেব ও রাজপুত কনফেডারেসি',
    keyPersonalitiesBn: ['সুলতান মাহমুদ গজনভি'],
    keyPersonalitiesEn: ['Sultan Mahmud of Ghazni'],
    muslimForcesBn: '৩০,০০০ গজনভি অশ্বারোহী',
    muslimForcesEn: '30,000 Ghaznavid cavalry',
    enemyForcesBn: '৫০,০০০ রাজপুত ও স্থানীয় সেনা',
    enemyForcesEn: '50,000 Rajput defenders',
    muslimMartyrsBn: 'সহস্রাধিক মুজাহিদ',
    enemyCasualtiesBn: 'রাজপুত বাহিনী পরাজিত ও মন্দির অধিকার',
    enemyCasualtiesEn: 'Rajput coalition defeated',
    detailedHistoryBn: 'সুলতান মাহমুদ গজনভি থর মরুভূমির প্রতিকূল পথ অতিক্রম করে সোমনাথে পৌঁছান। পুরোহিতরা বিপুল স্বর্ণের বিনিময়ে প্রতিমা না ভাঙার প্রস্তাব দিলে সুলতান ঐতিহাসিক উক্তি করেন: "রোজ হাশরে আমি যেন প্রতিমা বিক্রেতা মাহমুদ হিসেবে নয়, প্রতিমা চূর্ণকারী মাহমুদ হিসেবে আল্লাহর সামনে হাজির হতে পারি!"',
    detailedHistoryEn: 'Crossing the Thar desert, Mahmud reached Somnath. When priests offered mountain of gold to spare the idol, Mahmud declared: "On the Day of Judgment, I prefer to be called Mahmud the Idol-Breaker, not Mahmud the Idol-Seller!"',
    emotionalStoryBn: 'সুলতানের এই তাওহীদি আত্মমর্যাদা গোটা ভারতবর্ষে ইসলামি শক্তির সুদৃঢ় ভিত্তি স্থাপন করেছিল।',
    emotionalStoryEn: 'His uncompromising devotion to Monotheism left an indelible mark upon the history of South Asia.',
    shuhada: [],
    keyEvents: [
      {
        titleBn: '১. "প্রতিমা চূর্ণকারী মাহমুদ"',
        titleEn: '1. Mahmud the Idol-Breaker',
        descriptionBn: 'স্বর্ণের প্রলোভন প্রত্যাখ্যান করে তাওহীদের সম্মান রক্ষা।',
        descriptionEn: 'Rejected immense gold to champion the pure Oneness of Allah.',
        icon: '💎'
      }
    ],
    historicalLessonsBn: ['তাওহীদের মর্যাদা দুনিয়ার যাবতীয় ধন-সম্পদের চেয়ে কোটি গুণ মূল্যবান।'],
    historicalLessonsEn: ['The honor of Monotheism transcends all worldly wealth.'],
    references: ['তারিখে ফিরিশতা', 'আল-কামিল ফিত-তারিখ']
  },

  // ==========================================
  // ২৭. মানজিকার্টের যুদ্ধ
  // ==========================================
  {
    id: 'manzikert',
    orderNumber: 27,
    nameBn: 'মানজিকার্টের যুদ্ধ',
    nameEn: 'Battle of Manzikert',
    nameAr: 'مَعْرَكَةُ مَلاذْكِرْدَ التَّارِيخِيَّةِ',
    eraKey: 'abbasid',
    eraBn: '৪. আব্বাসি খিলাফত (৪৬৩ হিজরি)',
    eraEn: '4. Abbasid Caliphate (463 AH)',
    dateBn: '২৬ আগস্ট, ১০৭১ খ্রি. (৪৬৩ হিজরি)',
    dateEn: '26 August 1071 CE (463 AH)',
    locationBn: 'মানজিকার্ট সমভূমি (মুশ প্রদেশ, তুরস্ক)',
    locationEn: 'Plains of Manzikert (Mus, Eastern Turkey)',
    causeBn: 'বাইজেন্টাইন রোমান সাম্রাজ্যের সেলজুক তুর্কি মুসলিমদের ধ্বংস করার আগ্রাসী পরিকল্পনা।',
    causeEn: 'Byzantine imperial campaign to crush the Seljuk Turks and eliminate Islam from Anatolia.',
    commanderMuslimsBn: 'সুলতান আল্প আরসালান (সেলজুক সাম্রাজ্য)',
    commanderEnemyBn: 'রোমানাস চতুর্থ ডায়োজিনেস (রোমান বাইজেন্টাইন সম্রাট)',
    keyPersonalitiesBn: ['সুলতান আল্প আরসালান', 'নিজামুল মুলক'],
    keyPersonalitiesEn: ['Sultan Alp Arslan', 'Nizam al-Mulk'],
    muslimForcesBn: '২০,০০০ থেকে ৩০,০০০ সেলজুক তুর্কি অশ্বারোহী',
    muslimForcesEn: '20,000 to 30,000 Seljuk horse archers',
    enemyForcesBn: '৭০,০০০ থেকে ১,০০,০০০ সুসজ্জিত রোমান সেনাবাহিনী',
    enemyForcesEn: '70,000 to 100,000 Byzantine imperial forces',
    muslimMartyrsBn: 'কয়েক শত মুজাহিদ',
    enemyCasualtiesBn: 'রোমান সম্রাট বন্দি ও বাইজেন্টাইন সেনাদল বিধ্বস্ত',
    enemyCasualtiesEn: 'Emperor Romanos IV captured; Anatolia opened to Islam',
    detailedHistoryBn: 'সুলতান আল্প আরসালান জুমার নামাজের পর সাদা কাফনের কাপড় পরে ঘোড়ার লেজ বেঁধে ময়দানে নামেন এবং বলেন: "যদি আমি শহীদ হই, তবে এই কাফনই আমার কবর হবে।" তাঁর অবিশ্বাস্য তুর্কি অশ্বারোহী ফাঁদে রোমান সম্রাট রোমানাস বন্দি হন। সুলতান তাঁকে সম্মান প্রদর্শন করে মুক্তি দেন এবং এর ফলেই আধুনিক তুরস্কের ভিত্তি স্থাপিত হয়।',
    detailedHistoryEn: 'Sultan Alp Arslan donned a white shroud on Friday, tying his horse\'s tail and declaring: "If I die, this shroud is my grave!" Using nomadic feigned-retreat tactics, he routed the imperial army and captured Emperor Romanos IV. Alp Arslan treated the Emperor with dignity, opening Anatolia forever to Islam.',
    emotionalStoryBn: 'সম্রাট রোমানাস সুলতানের কাছে জানতে চাইল: "যদি আমি আপনাকে বন্দি করতাম, আপনি কী করতেন?" সুলতান বললেন: "আমি হয়তো আপনাকে হত্যা করতাম; কিন্তু ইসলাম আমাকে শিখিয়েছে শত্রুকে ক্ষমা করতে।" সুলতান তাঁকে মুক্তি দেন।',
    emotionalStoryEn: 'When the captive Emperor admitted he would have executed Alp Arslan, the Sultan smiled: "My religion teaches me forgiveness." He freed the Emperor with an escort.',
    shuhada: [],
    keyEvents: [
      {
        titleBn: '১. আনাতোলিয়া ও তুরস্কের দ্বার উন্মুক্ত',
        titleEn: '1. Opening Anatolia to Islam',
        descriptionBn: 'এই যুদ্ধের মাধ্যমে মধ্য এশিয়া থেকে আনাতোলিয়ায় তুর্কি মুসলিমদের স্থায়ী বসতি স্থাপিত হয়।',
        descriptionEn: 'Paved the way for the Seljuk Sultanate of Rum and the Ottoman Empire.',
        icon: '🏹'
      }
    ],
    historicalLessonsBn: ['নেতার কাফন পরিধানের মতো চরম আত্মোৎসর্গ কোটি সৈন্যের ভয় দূর করে দেয়।'],
    historicalLessonsEn: ['A commander willing to die in the front lines inspires unshakeable victory.'],
    references: ['আল-বিদায়া ওয়ান নিহায়া', 'তারিখে ইবনে খালদুন']
  },

  // ==========================================
  // ২৮. যাল্লাকার যুদ্ধ (সাক্রাজাস)
  // ==========================================
  {
    id: 'zallaqa',
    orderNumber: 28,
    nameBn: 'যাল্লাকার যুদ্ধ (সাক্রাজাসের যুদ্ধ)',
    nameEn: 'Battle of Sagrajas (al-Zallaqa)',
    nameAr: 'مَعْرَكَةُ الزَّلّاقَةِ الحَاسِمَةِ',
    eraKey: 'andalusian',
    eraBn: '৫. আন্দালুসের যুগ (৪৭৯ হিজরি)',
    eraEn: '5. Andalusian Era (479 AH)',
    dateBn: '১২ রজব, ৪৭৯ হিজরি (২৩ অক্টোবর ১০৮৬ খ্রি.)',
    dateEn: '12 Rajab, 479 AH (23 October 1086 CE)',
    locationBn: 'যাল্লাকা প্রান্তর (বাদাখোস, স্পেন)',
    locationEn: 'Plains of Sagrajas / al-Zallaqa (Badajoz, Spain)',
    causeBn: 'কাস্তিলের ক্রুসেডার রাজা ষষ্ঠ আলফোনসো কর্তৃক আন্দালুসের মুসলিম আমিরাতগুলো ধ্বংসের হুমকি থেকে রক্ষা।',
    causeEn: 'Defending Muslim Spain against Alfonso VI of Castile who threatened to wipe out Islam from the peninsula.',
    commanderMuslimsBn: 'ইউসুফ বিন তাশফিন (মুরাবিতুন আমির) ও আল-মুতামিদ বিন আব্বাদ',
    commanderEnemyBn: 'ষষ্ঠ আলফোনসো (কাস্তিল ও লিওনের খ্রিস্টান সম্রাট)',
    keyPersonalitiesBn: ['ইউসুফ বিন তাশফিন', 'আল-মুতামিদ বিন আব্বাদ'],
    keyPersonalitiesEn: ['Yusuf ibn Tashfin', 'Al-Mu\'tamid ibn Abbad'],
    muslimForcesBn: '২৫,০০০ মুরাবিতুন ও আন্দালুসিয়ান মুজাহিদ',
    muslimForcesEn: '25,000 Murabitun and Andalusian Mujahideen',
    enemyForcesBn: '৬০,০০০ থেকে ৮০,০০০ ইউরোপীয় ভারী নাইট সেনাদল',
    enemyForcesEn: '60,000 to 80,000 elite Christian knights and infantry',
    muslimMartyrsBn: 'সহস্রাধিক বীর মুজাহিদ',
    enemyCasualtiesBn: 'আলফোনসো আহত হয়ে মাত্র ৫০০ ঘোড়সওয়ার নিয়ে পলায়ন; সমগ্র নাইট সেনা চূর্ণ',
    enemyCasualtiesEn: 'Alfonso fled wounded with barely 500 riders; army annihilated',
    detailedHistoryBn: '৭৯ বছর বয়সী সিংহপুরুষ ইউসুফ বিন তাশফিন উত্তর আফ্রিকা থেকে জিব্রাল্টার পার হয়ে আসেন। যুদ্ধের ময়দানে রক্তের বন্যায় পা পিছলে যাচ্ছিল বলে এর নাম হয় "যাল্লাকা" (পিচ্ছিল স্থান)। এই অবিশ্বাস্য বিজয়ের মাধ্যমে আন্দালুসের পতন আরও প্রায় ৪০০ বছর পিছিয়ে যায়।',
    detailedHistoryEn: '79-year-old Yusuf ibn Tashfin crossed from Morocco to rescue Andalusia. Fought in a field named al-Zallaqa ("Slippery Ground") due to excessive blood, his reserve cavalry shattered Alfonso VI, extending Muslim rule in Spain by four centuries.',
    emotionalStoryBn: 'আলফোনসো অহংকার করে বলেছিল: "আমি জিন-পরীদের সাথেও লড়তে প্রস্তুত!" ইউসুফ বিন তাশফিন তার চিঠির জবাবে লিখেছিলেন: "যা ঘটবে তা তুমি নিজের চোখে দেখবে, চিঠিতে পড়তে হবে না!"',
    emotionalStoryEn: 'Alfonso boasted he could defeat jinn and men combined. Yusuf replied: "What will happen you will see with your eyes, not read in ink!"',
    shuhada: [],
    keyEvents: [
      {
        titleBn: '১. আন্দালুসিয়ার পতন ৪০০ বছর পিছিয়ে যাওয়া',
        titleEn: '1. Rescuing Andalusia for 400 Years',
        descriptionBn: 'আন্দালুসের ভাঙন রোধ করে ইসলামি স্পেনের পুনর্জন্ম ঘটে।',
        descriptionEn: 'Preserved Muslim Spain from imminent Christian Reconquista.',
        icon: '🏰'
      }
    ],
    historicalLessonsBn: ['মুসলিমদের অভ্যন্তরীণ বিরোধের সময় আন্তরিক মুমিনের সাহায্য রক্ষা বয়ে আনে।'],
    historicalLessonsEn: ['Islamic solidarity across continents rescues civilizations.'],
    references: ['নাফহুত তীব', 'আল-হুলুল আল-মাওশিয়্যাহ']
  },

  // ==========================================
  // ২৯. আর্কের যুদ্ধ (আল-আরাক)
  // ==========================================
  {
    id: 'alarcos',
    orderNumber: 29,
    nameBn: 'আর্কের যুদ্ধ (আল-আরাক)',
    nameEn: 'Battle of Alarcos',
    nameAr: 'مَعْرَكَةُ الأَرَكِ العَظِيمَةِ',
    eraKey: 'andalusian',
    eraBn: '৫. আন্দালুসের যুগ (৫৯১ হিজরি)',
    eraEn: '5. Andalusian Era (591 AH)',
    dateBn: '৯ শাবান, ৫৯১ হিজরি (১৮ জুলাই ১১৯৫ খ্রি.)',
    dateEn: '9 Sha\'ban, 591 AH (18 July 1195 CE)',
    locationBn: 'আর্কের দুর্গ প্রান্তর (সিউদাদ রিয়াল, স্পেন)',
    locationEn: 'Alarcos Fortress (Ciudad Real, Spain)',
    causeBn: 'কাস্তিলের রাজা অষ্টম আলফোনসোর চুক্তিভঙ্গ ও কর্ডোভা আক্রমণ প্রতিহত।',
    causeEn: 'Repelling Alfonso VIII of Castile after he violated treaties threatening Cordoba.',
    commanderMuslimsBn: 'আবু ইয়াকুব ইউসুফ আল-মনসুর (আলমোহাদ খলিফা)',
    commanderEnemyBn: 'অষ্টম আলফোনসো (কাস্তিলীয় রাজা)',
    keyPersonalitiesBn: ['খলিফা আল-মনসুর বিল্লাহ'],
    keyPersonalitiesEn: ['Caliph Abu Ya\'qub al-Mansur'],
    muslimForcesBn: '৪০,০০০ আলমোহাদ ও আন্দালুসিয়ান মুজাহিদ',
    muslimForcesEn: '40,000 Almohad and Andalusian troops',
    enemyForcesBn: '৭০,০০০ ইউরোপীয় যৌথ ক্রুসেডার সেনাদল',
    enemyForcesEn: '70,000 Christian coalition troops',
    muslimMartyrsBn: 'কয়েক শত মুজাহিদ',
    enemyCasualtiesBn: '৩০,০০০ ক্রুসেডার নিহত ও দুর্গ অধিকার',
    enemyCasualtiesEn: '30,000 crusaders slain; fortress captured',
    detailedHistoryBn: 'রাজা আলফোনসো দাম্ভিক চিঠি লিখে খলিফাকে যুদ্ধের চ্যালেঞ্জ জানায়। খলিফা আল-মনসুর চিঠির উল্টো পিঠে কুরআনের আয়াত লিখে দেন: "আমি তাদের ওপর এমন এক বাহিনী পাঠাব যার মুখোমুখি হওয়ার ক্ষমতা তাদের নেই!" আর্কে মুসলিমরা এমন প্রচণ্ড আঘাত হানে যে স্পেনের অন্যতম শ্রেষ্ঠ মুসলিম বিজয় অর্জিত হয়।',
    detailedHistoryEn: 'Alfonso VIII arrogantly challenged the Caliph. Al-Mansur inscribed Quran 27:37 on the back of the letter: "We will come to them with armies they cannot resist!" His crushing victory at Alarcos remains legendary.',
    emotionalStoryBn: 'বিজয়ের পর খলিফা সেভিলে বিখ্যাত "খিরালদা" মিনার ও গ্র্যান্ড মসজিদ নির্মাণের শুকরিয়া আদায় করেন।',
    emotionalStoryEn: 'In gratitude for victory, the Caliph built the famous Giralda tower in Seville.',
    shuhada: [],
    keyEvents: [
      {
        titleBn: '১. আলমোহাদদের শ্রেষ্ঠ বিজয়',
        titleEn: '1. Peak of Almohad Glory',
        descriptionBn: 'স্পেনে ক্রুসেডার রাজাদের অহংকার চূর্ণ করে শান্তি প্রতিষ্ঠা।',
        descriptionEn: 'Crushed Castilian aggression and secured southern Spain.',
        icon: '🏰'
      }
    ],
    historicalLessonsBn: ['অহংকারী শক্তির আস্ফালনের জবাব কথায় নয়, সুসংগঠিত বিজয়ে দিতে হয়।'],
    historicalLessonsEn: ['Arrogant imperial threats must be met with resolute defensive might.'],
    references: ['আল-মু’জিব', 'নাফহুত তীব']
  },

  // ==========================================
  // ৩০. লাস নাভাস ডি টোলোসার যুদ্ধ (মারাকাতুল ওকাব)
  // ==========================================
  {
    id: 'las_navas',
    orderNumber: 30,
    nameBn: 'লাস নাভাস ডি টোলোসার যুদ্ধ (মারাকাতুল ওকাব)',
    nameEn: 'Battle of Las Navas de Tolosa',
    nameAr: 'مَعْرَكَةُ العِقَابِ (لاس نافاس)',
    eraKey: 'andalusian',
    eraBn: '৫. আন্দালুসের যুগ (৬০৯ হিজরি)',
    eraEn: '5. Andalusian Era (609 AH)',
    dateBn: '১৬ জুলাই, ১২১২ খ্রি. (৬০৯ হিজরি)',
    dateEn: '16 July 1212 CE (609 AH)',
    locationBn: 'লাস নাভাস ডি টোলোসা গিরিপথ (সিয়েরা মোরেনা পর্বত, স্পেন)',
    locationEn: 'Las Navas de Tolosa Pass (Sierra Morena, Spain)',
    causeBn: 'পোপ ইনোসেন্ট তৃতীয় কর্তৃক ক্রুসেড ঘোষণায় সমগ্র ইউরোপের রাজাদের যৌথ আক্রমণ।',
    causeEn: 'Pope Innocent III\'s crusade uniting European Christian kingdoms against Muslim Spain.',
    commanderMuslimsBn: 'খলিফা মুহাম্মদ আন-নাসির (আলমোহাদ শাসক)',
    commanderEnemyBn: 'অষ্টম আলফোনসো (কাস্তিল, নাভারা, আরাগন যৌথ জোট)',
    keyPersonalitiesBn: ['মুহাম্মদ আন-নাসির'],
    keyPersonalitiesEn: ['Muhammad al-Nasir'],
    muslimForcesBn: '৫০,০০০ থেকে ৬০,০০০ মুজাহিদ',
    muslimForcesEn: '50,000 to 60,000 Mujahideen',
    enemyForcesBn: '১,০০,০০০-এর বেশি যৌথ ইউরোপীয় ক্রুসেডার বাহিনী',
    enemyForcesEn: '100,000+ crusader coalition armies',
    muslimMartyrsBn: 'বিপুল সংখ্যক মুজাহিদ ও খলিফার শৃঙ্খলিত রক্ষীদলের শাহাদাত',
    muslimMartyrsEn: 'Thousands of martyrs including the chained guard around the Caliph',
    enemyCasualtiesBn: 'ইউরোপীয় যৌথ বাহিনীর ব্যাপক ক্ষয়ক্ষতি',
    enemyCasualtiesEn: 'Substantial crusader losses',
    detailedHistoryBn: 'আন্দালুসের ভাগ্যের মোড় ঘুরিয়ে দেওয়া এক বেদনাদায়ক যুদ্ধ। খলিফার চারপাশে শৃঙ্খলিত নিবেদিতপ্রাণ দেহরক্ষীরা শেষ নিঃশ্বাস পর্যন্ত লড়াই করেন। এই যুদ্ধে পরাজয়ের পরেই আন্দালুসের অধিকাংশ অঞ্চল কর্ডোভা ও সেভিল ক্রুসেডারদের হাতে চলে যায় এবং মুসলিমরা একমাত্র গ্রানাডায় সীমাবদ্ধ হয়ে পড়ে।',
    detailedHistoryEn: 'A tragic watershed in Andalusian history. The Caliph\'s elite guards chained themselves around his red tent, fighting to the last man. This catastrophic defeat accelerated the Reconquista, eventually reducing Muslim Spain to Granada.',
    emotionalStoryBn: 'খলিফার তাঁবুর চারপাশে শৃঙ্খলিত মুজাহিদেরা কোরআন বুকে জড়িয়ে এক ইঞ্চি জায়গা না ছেড়ে শহীদ হয়েছিলেন।',
    emotionalStoryEn: 'The chained bodyguards died with hands locked on their swords protecting the Caliph\'s standard.',
    shuhada: [],
    keyEvents: [
      {
        titleBn: '১. আন্দালুসিয়ার অন্তিম পর্বের সূচনা',
        titleEn: '1. The Turning Point of Andalusia',
        descriptionBn: 'স্পেনে মুসলিম সাম্রাজ্যের ধীরে ধীরে গ্রানাডায় সীমাবদ্ধ হয়ে পড়ার সূচনা।',
        descriptionEn: 'Beginning of the end for Muslim rule in Spain outside Granada.',
        icon: '💔'
      }
    ],
    historicalLessonsBn: ['অনৈক্য ও অহমিকা হাজার বছরের সভ্যতাকে এক মুহূর্তে বিলীন করে দিতে পারে।'],
    historicalLessonsEn: ['Disunity and overconfidence can dissolve centuries of civilization.'],
    references: ['নাফহুত তীব', 'আল-কামিল ফিত-তারিখ']
  },

  // ==========================================
  // ৩১. ফিলিস্তিন ও আল-আকসা মুক্তি সংগ্রাম
  // ==========================================
  {
    id: 'gaza_palestine_resistance',
    orderNumber: 31,
    nameBn: 'ফিলিস্তিন ও আল-আকসা মুক্তি সংগ্রাম',
    nameEn: 'Battle for Palestine & Al-Aqsa Liberation',
    nameAr: 'مَعْرَكَةُ تَحْرِيرِ فِلَسْطِينَ وَالأَقْصَى المُبَارَكِ',
    eraKey: 'modern',
    eraBn: '৬. আধুনিক যুগ ও প্রতিরোধ (১৯৪৮ - বর্তমান)',
    eraEn: '6. Modern Era & Resistance (1948 - Present)',
    dateBn: '১৯৪৮ সাল থেকে অদ্যাবধি চলমান',
    dateEn: '1948 - Present (Ongoing)',
    locationBn: 'পবিত্র আল-কুদস (জেরুজালেম), গাজা উপত্যকা ও সমগ্র ফিলিস্তিন ভূখণ্ড',
    locationEn: 'Al-Quds (Jerusalem), Gaza Strip & Historical Palestine',
    causeBn: 'প্রথম কিবলা বায়তুল মুকাদ্দাস ও আল-আকসার সুরক্ষা, অবৈধ জায়নবাদী দখলদারিত্ব নির্মূল এবং জন্মভূমি পুনরুদ্ধারের আপসহীন সংগ্রাম।',
    causeEn: 'Defending the First Qibla (Al-Aqsa Sanctuary), countering illegal occupation, and liberating Palestine.',
    commanderMuslimsBn: 'মুজাহিদিনে ফিলিস্তিন ও বীর প্রতিরোধ সেনানীগণ',
    commanderMuslimsEn: 'Palestinian Resistance & Steadfast Defenders',
    commanderEnemyBn: 'আন্তর্জাতিক সাম্রাজ্যবাদী সাহায্যপুষ্ট অবৈধ দখলদার জায়নবাদী বাহিনী',
    commanderEnemyEn: 'Western-backed Imperialist Zionist Occupation Forces',
    keyPersonalitiesBn: ['শহীদ শায়খ ইযযুদ্দীন আল-কাসসাম', 'শহীদ আহমাদ ইয়াসিন', 'শহীদ আব্দুল আজিজ রানতিসি', 'বীর প্রতিরোধ মুজাহিদগণ'],
    keyPersonalitiesEn: ['Shaykh Izz ad-Din al-Qassam', 'Shaykh Ahmad Yasin', 'Dr. Abd al-Aziz al-Rantisi', 'Heroic Defenders of Gaza'],
    muslimForcesBn: 'ঈমানদার অকুতোভয় ফিলিস্তিনি মুজাহিদ ও আপসহীন বিপ্লবী জনতা',
    muslimForcesEn: 'Steadfast Palestinian freedom fighters & resilient populace',
    enemyForcesBn: 'সর্বাধুনিক প্রযুক্তিসমৃদ্ধ পারমাণবিক শক্তিধর সাম্রাজ্যবাদী সামরিক জোট',
    enemyForcesEn: 'Nuclear-armed high-tech occupation army with superpower support',
    muslimMartyrsBn: 'লাখো লাখো অমর ফিলিস্তিনি শহীদ, বীর নারী, শিশু ও অকুতোভয় মুজাহিদগণ',
    muslimMartyrsEn: 'Hundreds of thousands of beloved Palestinian martyrs, children, and fighters',
    enemyCasualtiesBn: 'শত্রুর অহংকার চূর্ণ ও তথাকথিত অপরাজেয় মিথের অবসান',
    enemyCasualtiesEn: 'Shattered myth of occupation invincibility',
    detailedHistoryBn: 'বিশ্বের সবচেয়ে দীর্ঘস্থায়ী এবং ত্যাগদীপ্ত প্রতিরোধ সংগ্রাম। অবরুদ্ধ ছোট্ট গাজা উপত্যকায় আধুনিক ইতিহাসের সবচেয়ে বর্বর বোমাবর্ষণের মুখেও ফিলিস্তিনিরা "হাসবুনাল্লাহু ওয়া নি’মাল ওয়াকিল" ধ্বনি দিয়ে মাটি কামড়ে পড়ে রয়েছে। আল-আকসার সুরক্ষায় তাঁদের এই কুরবানি সমগ্র মুসলিম উম্মাহর জন্য জীবন্ত ঈমানের এক মহাকাব্যিক আলোকবর্তিকা।',
    detailedHistoryEn: 'The longest-running epic of steadfastness (Sumud) in modern history. Trapped inside the besieged Gaza strip under unprecedented bombardment, Palestinians cling to their land proclaiming: "Hasbunallah wa ni\'mal wakeel!" Their sacrifice in defense of Al-Aqsa illuminates the conscience of the world.',
    emotionalStoryBn: 'ধ্বংসস্তূপের নিচে সন্তান হারিয়েও মায়েরা কেঁদে বলেন: "আমাদের জান, আমাদের সন্তান সবকিছু আল-আকসার জন্য কোরবান!" শহীদ শিশুদের কপালে চুম্বন দিয়ে পিতার হাসিমুখ পুরো পৃথিবীর মানুষকে কাঁদিয়ে ঈমানের সত্যতা চিনিয়েছে।',
    emotionalStoryEn: 'Mothers pulling martyred children from rubble proclaim: "All we have is a ransom for Al-Aqsa!" Their unshakeable dignity has humbled the conscience of mankind.',
    shuhada: [
      {
        nameBn: 'শহীদ শায়খ ইযযুদ্দীন আল-কাসসাম',
        nameEn: 'Shaykh Izz ad-Din al-Qassam',
        roleBn: 'ফিলিস্তিন মুক্তিসংগ্রামের আধ্যাত্মিক অগ্রদূত',
        roleEn: 'Spiritual pioneer of modern Palestinian resistance',
        detailsBn: '১৯৩৫ সালে ব্রিটিশ দখলদারদের বিরুদ্ধে বীরত্বের সাথে লড়াই করে ইয়াবাদ প্রান্তরে শাহাদাত বরণ করেন।',
        detailsEn: 'Fell in battle against British colonial forces at Ya\'bad in 1935.'
      },
      {
        nameBn: 'শায়খ আহমাদ ইয়াসিন',
        nameEn: 'Shaykh Ahmad Yasin',
        roleBn: 'পক্ষাঘাতগ্রস্ত আধ্যাত্মিক নেতা ও প্রতিরোধ প্রতিষ্ঠাতা',
        roleEn: 'Quadriplegic spiritual leader and founder',
        detailsBn: '২০০৪ সালে ফজরের নামাজ পড়ে মসজিদ থেকে বের হওয়ার সময় হেলিকপ্টার থেকে ক্ষেপণাস্ত্র হামলায় শাহাদাত বরণ করেন।',
        detailsEn: 'Martyred by an airstrike in his wheelchair after Fajr prayer in 2004.'
      }
    ],
    keyEvents: [
      {
        titleBn: '১. আল-আকসার পবিত্রতার সুরক্ষা',
        titleEn: '1. Defense of Al-Aqsa Sanctuary',
        descriptionBn: 'প্রথম কিবলা ও মিরাজের পুণ্যভূমি সুরক্ষায় উম্মাহর আপসহীন প্রতিরোধ।',
        descriptionEn: 'Unbroken defense of the Third Holiest Sanctuary and Miraj destination.',
        icon: '🕌'
      }
    ],
    historicalLessonsBn: [
      'ঈমান, দেশপ্রেম ও আত্মত্যাগের দৃঢ়তা থাকলে কোনো পরাশক্তি জাতি বা পবিত্র ভূমিকে চিরতরে পদানত করতে পারে না।',
      'আল-আকসা কেবল একটি ভূখণ্ড নয়, এটি সমগ্র মুসলিম উম্মাহর ঈমান ও অস্তিত্বের শাশ্বত প্রতীক।'
    ],
    historicalLessonsEn: [
      'Unbroken faith and sacrifice conquer the most devastating military machines.',
      'Al-Aqsa is not merely land, but the heart and spiritual honor of the global Ummah.'
    ],
    references: ['ফিলিস্তিনের রক্তঝরা ইতিহাস', 'আল-আকসার ইতিকথা', 'পবিত্র কুরআন ও হাদিস']
  }
];

export const WARS_EN_MAP: Record<string, { name: string; era: string; cause: string; story: string }> = {};
ISLAMIC_WARS_DATA.forEach((w) => {
  WARS_EN_MAP[w.id] = {
    name: w.nameEn,
    era: w.eraEn,
    cause: w.causeEn,
    story: w.emotionalStoryEn,
  };
});
