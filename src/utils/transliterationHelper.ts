import { ZikrLanguage } from '../types';

// Curated high-accuracy Bengali Quranic pronunciations for popular surahs & verses
const BENGALI_AYAH_PRONUNCIATION_MAP: Record<string, string> = {
  // Bismillah
  'bismillāhir-raḥmānir-raḥīm': 'বিসমিল্লাহির রাহমানির রাহীম',
  'bis\'mi l-lahi l-rahmāni l-rahīmi': 'বিসমিল্লাহির রাহমানির রাহীম',
  'bismillahi r-rahmani r-rahim': 'বিসমিল্লাহির রাহমানির রাহীম',

  // Surah Al-Fatiha
  'al-ḥamdu lillāhi rabbil-\'ālamīn': 'আলহামদুলিল্লাহি রাব্বিল আলামীন',
  'al-hamdu lil-lahi rabbi l-\'alamina': 'আলহামদুলিল্লাহি রাব্বিল আলামীন',
  'ar-raḥmānir-raḥīm': 'আর-রাহমানির রাহীম',
  'ar-rahmani r-rahimi': 'আর-রাহমানির রাহীম',
  'māliki yawmid-dīn': 'মালিকি ইয়াওমিদ্দীন',
  'maliki yawmi d-dini': 'মালিকি ইয়াওমিদ্দীন',
  'iyyāka na\'budu wa iyyāka nasta\'īn': 'ইয়্যাকা না\'বুদু ওয়া ইয়্যাকা নাস্তায়ীন',
  'iyyakana\'budu wa-iyyaka nasta\'inu': 'ইয়্যাকা না\'বুদু ওয়া ইয়্যাকা নাস্তায়ীন',
  'ihdinaṣ-ṣirāṭal-mustaqīm': 'ইহদিনাস সিরাতাল মুস্তাকীম',
  'ihdina s-sirata l-mustaqima': 'ইহদিনাস সিরাতাল মুস্তাকীম',
  'ṣirāṭal-ladhīna an\'amta \'alayhim ghayril-maghḍūbi \'alayhim wa laḍ-ḍāllīn': 'সিরাতাল্লাযীনা আন\'আমতা \'আলাইহিম গাইরিল মাগদূবি \'আলাইহিম ওয়ালাদ্দাল্লীন',
  'sirata l-ladhina an\'amta \'alayhim ghayri l-maghdubi \'alayhim wa-la d-dallina': 'সিরাতাল্লাযীনা আন\'আমতা \'আলাইহিম গাইরিল মাগদূবি \'আলাইহিম ওয়ালাদ্দাল্লীন',

  // Surah Al-Ikhlas
  'qul huwallāhu aḥad': 'বলুন: কুল হুওয়াল্লাহু আহাদ',
  'allāhuṣ-ṣamad': 'আল্লাহুস সামাদ',
  'lam yalid wa lam yūlad': 'লাম ইয়ালিদ ওয়া লাম ইউলাদ',
  'wa lam yakul-lahū kufuwan aḥad': 'ওয়া লাম ইয়া কুল্লাহু কুফুওয়ান আহাদ',

  // Surah Al-Falaq
  'qul a\'ūdhu bi-rabbil-falaq': 'কুল আ\'উযু বিরাব্বিল ফালাক',
  'min sharri mā khalaq': 'মিন শাররি মা খালাক',
  'wa min sharri ghāsiqin idhā waqab': 'ওয়া মিন শাররি গাসিকিন ইযা ওয়াকাব',
  'wa min sharrin-naffāthāti fil-\'uqad': 'ওয়া মিন শাররিন নাফফাসাতি ফিল \'উকাদ',
  'wa min sharri ḥāsidin idhā ḥasad': 'ওয়া মিন শাররি হাসিদিল ইযা হাসাদ',

  // Surah An-Nas
  'qul a\'ūdhu bi-rabbin-nās': 'কুল আ\'উযু বিরাব্বিন নাস',
  'malikin-nās': 'মালিকিন নাস',
  'ilāhin-nās': 'ইলাহিন নাস',
  'min sharril-waswāsil-khannās': 'মিন শাররিল ওয়াসওয়াসিল খান্নাস',
  'alladhī yuwaswisu fī ṣudūrin-nās': 'আল্লাযী ইউওয়াসউিসু ফী সুদূরিন নাস',
  'minal-jinnati wan-nās': 'মিনাল জিন্নাতি ওয়ান নাস',
};

// Converts Latin transliteration phonetics to Bengali pronunciation (বাংলা উচ্চারণ)
export function latinToBengaliPronunciation(latinText: string): string {
  if (!latinText) return '';

  const normalized = latinText.trim().toLowerCase();
  
  // Exact match from lookup table
  if (BENGALI_AYAH_PRONUNCIATION_MAP[normalized]) {
    return BENGALI_AYAH_PRONUNCIATION_MAP[normalized];
  }

  // General cleanups
  let text = latinText
    .replace(/[āâà]/gi, 'আ')
    .replace(/[īîì]/gi, 'ঈ')
    .replace(/[ūûù]/gi, 'ঊ')
    .replace(/[ṣṣ]/gi, 'স')
    .replace(/[ḍḍ]/gi, 'দ')
    .replace(/[ṭṭ]/gi, 'ত')
    .replace(/[ẓẓ]/gi, 'জ')
    .replace(/[ḥḥ]/gi, 'হ')
    .replace(/[\'\`’‘]/g, '\'');

  // Convert words phonetically
  return text
    .split(/\s+/)
    .map((word) => {
      let w = word.toLowerCase();

      // Check common word dictionary
      if (w.includes('bism') || w.includes('bis\'mi')) return 'বিসমি';
      if (w.includes('llah') || w.includes('l-lahi')) return 'আল্লাহি';
      if (w.includes('rahman')) return 'রাহমানি';
      if (w.includes('rahim')) return 'রাহীম';
      if (w.includes('hamdu')) return 'হামদু';
      if (w.includes('rabbi')) return 'রাব্বি';
      if (w.includes('alamin') || w.includes('\'alamin')) return 'আলামীন';
      if (w.includes('malik')) return 'মালিকি';
      if (w.includes('yawm')) return 'ইয়াওমি';
      if (w.includes('din')) return 'দীন';
      if (w.includes('iyyaka')) return 'ইয়্যাকা';
      if (w.includes('nabudu') || w.includes('na\'budu')) return 'না\'বুদু';
      if (w.includes('nastain') || w.includes('nasta\'in')) return 'নাস্তায়ীন';
      if (w.includes('ihdina')) return 'ইহদিনা';
      if (w.includes('sirat')) return 'সিরাত';
      if (w.includes('mustaqim')) return 'মুস্তাকীম';
      if (w.includes('ladhina') || w.includes('lladhina')) return 'আল্লাযীনা';
      if (w.includes('anamta') || w.includes('an\'amta')) return 'আন\'আমতা';
      if (w.includes('alayhim') || w.includes('\'alayhim')) return '\'আলাইহিম';
      if (w.includes('ghayr') || w.includes('ghayri')) return 'গাইরিল';
      if (w.includes('maghdub')) return 'মাগদূবি';
      if (w.includes('dallin')) return 'দ্বাল্লীন';

      // General character rules
      w = w
        .replace(/al-/g, 'আল-')
        .replace(/ar-/g, 'আর-')
        .replace(/an-/g, 'আন-')
        .replace(/as-/g, 'আস-')
        .replace(/at-/g, 'আত-')
        .replace(/az-/g, 'আজ-')
        .replace(/ad-/g, 'আদ-')
        .replace(/sh/g, 'শ')
        .replace(/th/g, 'ছ')
        .replace(/dh/g, 'য')
        .replace(/kh/g, 'খ')
        .replace(/gh/g, 'গ')
        .replace(/aa/g, 'আ')
        .replace(/ee/g, 'ঈ')
        .replace(/oo/g, 'ঊ')
        .replace(/a/g, 'আ')
        .replace(/i/g, 'ই')
        .replace(/u/g, 'উ')
        .replace(/b/g, 'ব')
        .replace(/t/g, 'ত')
        .replace(/j/g, 'জ')
        .replace(/h/g, 'হ')
        .replace(/d/g, 'দ')
        .replace(/r/g, 'র')
        .replace(/z/g, 'জ')
        .replace(/s/g, 'স')
        .replace(/f/g, 'ফ')
        .replace(/q/g, 'ক')
        .replace(/k/g, 'ক')
        .replace(/l/g, 'ল')
        .replace(/m/g, 'ম')
        .replace(/n/g, 'ন')
        .replace(/w/g, 'ওয়া')
        .replace(/y/g, 'ইয়া');

      return w;
    })
    .join(' ');
}

// Main helper function to return transliteration formatted according to selected user language
export function getFormattedTransliteration(
  rawTransliteration: string,
  arabicText: string,
  language: ZikrLanguage = 'bn'
): string {
  if (!rawTransliteration && !arabicText) return '';

  if (language === 'bn') {
    return latinToBengaliPronunciation(rawTransliteration || arabicText);
  }

  if (language === 'ar') {
    return arabicText;
  }

  // English, Urdu, or other languages return standard Latin transliteration
  return rawTransliteration;
}
