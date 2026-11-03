import * as fs from 'fs';

// Helper script to build rich 322 topics database
console.log('Starting 322 quran topics database builder...');

interface TopicEntry {
  id: string;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  categoryBn: string;
  categoryEn: string;
  icon: string;
  colorTheme: 'emerald' | 'amber' | 'blue' | 'rose' | 'purple' | 'teal' | 'indigo' | 'cyan';
  badgeBn: string;
  badgeEn: string;
  descriptionBn: string;
  descriptionEn: string;
  count: number;
  ayahs: Array<{
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
  }>;
  hadiths: Array<{
    id: string;
    narratorBn: string;
    narratorEn: string;
    arabic?: string;
    translationBn: string;
    translationEn: string;
    referenceBn: string;
    referenceEn: string;
  }>;
}

// Generate topic slug from Bengali name
function makeSlug(name: string, index: number): string {
  const map: Record<string, string> = {
    'নামাজ/সালাত': 'salat',
    'সালাত ও নামাজ': 'salat_prayer',
    'জিকির/ আল্লাহর স্মরণ': 'zikr_remembrance',
    'ইবাদত': 'ibadah',
    'জান্নাত': 'jannat',
    'জাহান্নাম': 'jahannam',
    'হালাল-হারাম': 'halal_haram',
    'সবর বা ধৈর্য্য': 'sabr',
    'তাওয়াক্কুল বা আল্লাহর ওপর ভরসা': 'tawakkul',
    'তাওবা': 'tawbah',
    'দোয়া/দুআ': 'dua',
    'পিতামাতার প্রতি সদাচরণ': 'parents',
    'দাম্পত্য জীবন': 'family_marriage',
    'যাকাত': 'zakat',
    'আদল/ইনসাফ': 'justice',
    'ঈমান': 'iman',
    'ইলম বা জ্ঞান': 'knowledge',
    'রিযক': 'rizq',
    'গীবত, পরনিন্দা': 'ghibat',
    'অহংকার': 'kibr',
    'আখেরাত/পরকাল': 'akhirat',
    'হজ্ব/হজ্জ': 'hajj',
    'রোজা/সিয়াম': 'sawm',
    'তাহাজ্জুদ নামাজ': 'tahajjud',
    'মুহাম্মাদ সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম': 'prophet_muhammad',
    'ইবরাহীম আলাইহিস সালাম': 'prophet_ibrahim',
    'মূসা আলাইহিস সালাম': 'prophet_musa',
    'ঈসা আলাইহিস সালাম': 'prophet_isa',
    'নূহ আলাইহিস সালাম': 'prophet_nuh',
    'আদম আলাইহিস সালাম': 'prophet_adam',
    'ইউসুফ আলাইহিস সালাম': 'prophet_yusuf',
    'ইউনুস আলাইহিস সালাম': 'prophet_yunus',
    'দাউদ আলাইহিস সালাম': 'prophet_dawud',
    'সুলাইমান আলাইহিস সালাম': 'prophet_sulaiman',
    'আইউব আলাইহিস সালাম': 'prophet_ayyub',
    'ইয়াকুব আলাইহিস সালাম': 'prophet_yaqub',
    'ইসমাঈল আলাইহিস সালাম': 'prophet_ismail',
    'ইসহাক আলাইহিস সালাম': 'prophet_ishaq',
    'যাকারিয়া আলাইহিস সালাম': 'prophet_zakariya',
    'ইয়াহইয়া আলাইহিস সালাম': 'prophet_yahya',
    'শুআইব আলাইহিস সালাম': 'prophet_shuaib',
    'সালেহ আলাইহিস সালাম': 'prophet_saleh',
    'হূদ আলাইহিস সালাম': 'prophet_hud',
    'লূত আলাইহিস সালাম': 'prophet_lut',
    'ইদরীস আলাইহিস সালাম': 'prophet_idris',
    'আল ইয়াসা আলাইহিস সালাম': 'prophet_alyasa',
    'ইলইয়াস আলাইহিস সালাম': 'prophet_ilyas',
    'যুল কিফল আলাইহিস সালাম': 'prophet_dhulkifl',
    'মারইয়াম আলাইহাস সালাম': 'maryam',
    'সাহাবায়ে কিরাম': 'sahaba',
    'আনসার সাহাবায়ে কেরাম': 'ansar',
    'আলী (রাঃ)': 'ali_ra',
    'উম্মাহাতুল মুমিনীন': 'ummuhatul_muminin',
    'আল-কুরআন': 'quran',
    'তাওহীদ': 'tawhid',
    'আল্লাহ': 'allah',
    'রব': 'rabb',
    'তাকওয়া/ আল্লাহর ভয়': 'taqwa',
    'শয়তান/ইবলিস': 'shaytan',
    'ফেরেস্তা': 'angels',
    'জিবরাইল আলাইহিস সালাম': 'jibril',
    'জ্বীন': 'jinn',
    'ভাগ্য': 'qadar',
    'তাকদীর': 'destiny',
    'কিয়ামত': 'qiyamah',
    'হাশর': 'hashr',
    'মীযান': 'mizan',
    'কবর': 'qabr',
    'মরন/মৃত্যু': 'death',
    'বরযাখ(মৃত্যু-কিয়ামত মধ্যবর্তী জীবন)': 'barzakh',
    'আমলনামা': 'amalnama',
    'জান্নাতুল ফিরদাউস': 'firdaus',
    'সৎ কাজের আদেশ, অসৎ কাজের নিষেধ': 'amr_bil_maruf',
    'আমানতদারিতা': 'amanah',
    'ক্ষমা': 'forgiveness',
    'কৃতজ্ঞতা/শুকরিয়া': 'shukr',
    'পর্দা': 'hijab',
    'বিবাহ': 'marriage',
    'তালাক বা বিবাহ বিচ্ছেদ': 'talaq',
    'উত্তরাধিকার আইন': 'inheritance',
    'সুদ': 'riba',
    'চুক্তি ও অঙ্গীকার': 'covenants',
    'দান-সাদকাহ': 'sadaqah',
    'হিজরত': 'hijrah',
    'বদর যুদ্ধ': 'badr_battle',
    'উহুদের যুদ্ধ': 'uhud_battle',
    'আহযাব যুদ্ধ': 'ahzab_battle',
    'হুদায়বিয়ার সন্ধি': 'hudaibiyah',
    'আসহাবে কাহফ': 'ashab_kahf',
    'আসহাবুল ফিল': 'ashab_fil',
    'বনি ইসরাইল': 'bani_israil',
    'ফিরাউন': 'pharaoh',
    'কা\'বা': 'kaba',
    'মসজিদ': 'masjid',
    'মসজিদুল হারাম': 'masjid_al_haram',
    'লাইলাতুল কদর/শবে কদর': 'shab_e_qadr',
    'অযু/ওযু': 'wudu',
    'তাহারাত/পবিত্রতা অর্জন': 'taharah',
    'তায়াম্মুম': 'tayammum',
    'সিজদা': 'sajdah',
    'তাসবিহ পাঠ': 'tasbih',
    'কবিরা গুনাহ': 'kabirah_sins',
    'শিরক': 'shirk',
    'কুফর': 'kufr',
    'মুনাফিক': 'munafiq',
    'যিনা/ব্যভিচার': 'zina',
    'চুরি': 'theft',
    'মদ ও জুয়া': 'alcohol_gambling',
    'মানুষ হত্যা': 'killing_murder',
    'মিথ্যাচার': 'falsehood',
    'হিংসা বা বিদ্বেষ': 'hasad',
    'লোভ-লালসা': 'greed',
    'কৃপণতা': 'miserliness',
    'অপব্যয় ও অপচয়': 'extravagance',
    'ইনসাফ বা সুবিচার': 'fairness'
  };

  if (map[name]) return map[name];
  return 'topic_' + (index + 1);
}

console.log('Loaded builder successfully.');
