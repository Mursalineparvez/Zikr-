import { ZikrLanguage } from '../types';

// Authentic Arabic pronunciation of Huruf Muqatta'at (হুরুফে মুকাত্তায়াত - ২৯টি সূরার শুরু)
export const MUQATTAAT_PRONUNCIATION_MAP: Record<string, string> = {
  // Surah 2 (Al-Baqarah), Surah 3 (Ali 'Imran), Surah 29 (Al-'Ankabut), Surah 30 (Ar-Rum), Surah 31 (Luqman), Surah 32 (As-Sajdah)
  'الم': 'আলিফ-লাম-মীম',
  'الٓمٓ': 'আলিফ-লাম-মীম',
  'alif-lam-meem': 'আলিফ-লাম-মীম',
  'alif-laaam-meeem': 'আলিফ-লাম-মীম',
  'alif lam meem': 'আলিফ-লাম-মীম',
  'alif laam meem': 'আলিফ-লাম-মীম',
  'alif-laam-meem': 'আলিফ-লাম-মীম',
  'অ্যালিফ্- ল’আ-ম্- মীম্': 'আলিফ-লাম-মীম',
  'অ্যালিফ্-ল’আ-ম্-মীম্': 'আলিফ-লাম-মীম',
  'অ্যালিফ-লাম-মীম': 'আলিফ-লাম-মীম',
  'আলিফ লা-ম মী-ম': 'আলিফ-লাম-মীম',

  // Surah 7 (Al-A'raf)
  'المص': 'আলিফ-লাম-মীম-সোয়াদ',
  'الٓمٓصٓ': 'আলিফ-লাম-মীম-সোয়াদ',
  'alif-lam-meem-saad': 'আলিফ-লাম-মীম-সোয়াদ',
  'alif-lam-meem-sad': 'আলিফ-লাম-মীম-সোয়াদ',

  // Surah 10 (Yunus), Surah 11 (Hud), Surah 12 (Yusuf), Surah 14 (Ibrahim), Surah 15 (Al-Hijr)
  'الر': 'আলিফ-লাম-রা',
  'الٓر': 'আলিফ-লাম-রা',
  'alif-lam-ra': 'আলিফ-লাম-রা',
  'alif-laam-raa': 'আলিফ-লাম-রা',

  // Surah 13 (Ar-Ra'd)
  'المر': 'আলিফ-লাম-মীম-রা',
  'الٓمٓر': 'আলিফ-লাম-মীম-রা',
  'alif-lam-meem-ra': 'আলিফ-লাম-মীম-রা',

  // Surah 19 (Maryam)
  'كهيعص': 'কাফ-হা-ইয়া-আইন-সোয়াদ',
  'كٓهيعٓصٓ': 'কাফ-হা-ইয়া-আইন-সোয়াদ',
  'kaaf-ha-ya-ayn-saad': 'কাফ-হা-ইয়া-আইন-সোয়াদ',
  'kaf-ha-ya-ayn-sad': 'কাফ-হা-ইয়া-আইন-সোয়াদ',

  // Surah 20 (Ta-Ha)
  'طه': 'ত্বা-হা',
  'ta-ha': 'ত্বা-হা',
  'taha': 'ত্বা-হা',
  'taa-haa': 'ত্বা-হা',

  // Surah 26 (Ash-Shu'ara), Surah 28 (Al-Qasas)
  'طسم': 'ত্বা-সীন-মীম',
  'طسٓمٓ': 'ত্বা-সীন-মীম',
  'ta-seen-meem': 'ত্বা-সীন-মীম',
  'taa-seen-meem': 'ত্বা-সীন-মীম',

  // Surah 27 (An-Naml)
  'طس': 'ত্বা-সীন',
  'طسٓ': 'ত্বা-সীন',
  'ta-seen': 'ত্বা-সীন',
  'taa-seen': 'ত্বা-সীন',

  // Surah 36 (Ya-Sin)
  'يس': 'ইয়া-সীন',
  'يسٓ': 'ইয়া-সীন',
  'ya-seen': 'ইয়া-সীন',
  'yaseen': 'ইয়া-সীন',
  'yaa-seen': 'ইয়া-সীন',

  // Surah 38 (Sad)
  'ص': 'সোয়াদ',
  'صٓ': 'সোয়াদ',
  'saad': 'সোয়াদ',
  'sad': 'সোয়াদ',

  // Surah 40 (Ghafir), Surah 41 (Fussilat), Surah 43 (Az-Zukhruf), Surah 44 (Ad-Dukhan), Surah 45 (Al-Jathiyah), Surah 46 (Al-Ahqaf)
  'حم': 'হা-মীম',
  'حمٓ': 'হা-মীম',
  'ha-meem': 'হা-মীম',
  'haa-meem': 'হা-মীম',

  // Surah 42 (Ash-Shura)
  'عسق': 'আইন-সীন-ক্বাফ',
  'عٓسٓقٓ': 'আইন-সীন-ক্বাফ',
  'ayn-seen-qaf': 'আইন-সীন-ক্বাফ',
  'ain-seen-qaaf': 'আইন-সীন-ক্বাফ',

  // Surah 50 (Qaf)
  'ق': 'ক্বাফ',
  'قٓ': 'ক্বাফ',
  'qaf': 'ক্বাফ',
  'qaaf': 'ক্বাফ',

  // Surah 68 (Al-Qalam)
  'ن': 'নূন',
  'نٓ': 'নূন',
  'noon': 'নূন',
};

// Normalizes distorted or non-standard Bengali transliterations into authentic Arabic pronunciation
export function normalizeArabicPronunciationBn(text: string): string {
  if (!text) return '';
  // Fast path: skip regex if suspect patterns don't exist
  if (!text.includes('অ্যা') && !text.includes('ল’') && !text.includes('মীম্') && !text.includes('আলিফ') && !text.includes('মিম')) {
    return text;
  }
  let s = text.trim();

  // 1. Check exact or partial Muqatta'at distortions
  if (
    /অ্যালিফ/i.test(s) ||
    /ল[’\']আ[-–\s]*ম্/i.test(s) ||
    /আলিফ\s*[-–,\s]+\s*লা[-–\s]*ম\s*[-–,\s]+\s*মী[-–\s]*ম/i.test(s) ||
    /আলিফ\s*[-–,\s]+\s*লাম\s*[-–,\s]+\s*মীম/i.test(s) ||
    /আলিফ\s*[-–,\s]+\s*লাম\s*[-–,\s]+\s*মিম/i.test(s)
  ) {
    // If it is the opening of Al-Baqarah or similar Surahs
    if (s.includes('সোয়াদ') || s.includes('সাদ')) {
      return 'আলিফ-লাম-মীম-সোয়াদ';
    }
    if (s.includes('রা') || s.includes('র')) {
      return 'আলিফ-লাম-মীম-রা';
    }
    return 'আলিফ-লাম-মীম';
  }

  // 2. Clean general awkward spellings
  s = s
    .replace(/অ্যালিফ্?/g, 'আলিফ')
    .replace(/ল[’\']আ[-–\s]*ম্?/g, 'লাম')
    .replace(/মীম্/g, 'মীম')
    .replace(/মিম্/g, 'মীম')
    .replace(/আলিফ\s+লা-ম\s+মী-ম/g, 'আলিফ-লাম-মীম')
    .replace(/আলিফ,\s*লাম,\s*মীম/g, 'আলিফ-লাম-মীম')
    .replace(/আলিফ\s*-\s*লাম\s*-\s*মীম/g, 'আলিফ-লাম-মীম')
    .replace(/([ক-হ])’আ/g, '$1া')
    .replace(/[-–]{2,}/g, '-')
    .trim();

  return s;
}

// Curated high-accuracy Bengali Quranic pronunciations for popular surahs & verses
const BENGALI_AYAH_PRONUNCIATION_MAP: Record<string, string> = {
  // Bismillah
  'bismillāhir-raḥmānir-raḥīm': 'বিসমিল্লাহির রাহমানির রাহীম',
  'bis\'mi l-lahi l-rahmāni l-rahīmi': 'বিসমিল্লাহির রাহমানির রাহীম',
  'bismillahi r-rahmani r-rahim': 'বিসমিল্লাহির রাহমানির রাহীম',
  'bismillahir-rahmanir-rahim': 'বিসমিল্লাহির রাহমানির রাহীম',
  'bismillāhir raḥmānir raḥīm': 'বিসমিল্লাহির রাহমানির রাহীম',

  // Surah Al-Fatiha (1:1 - 1:7)
  'al-ḥamdu lillāhi rabbil-\'ālamīn': 'আলহামদুলিল্লাহি রাব্বিল আলামীন',
  'al-hamdu lil-lahi rabbi l-\'alamina': 'আলহামদুলিল্লাহি রাব্বিল আলামীন',
  'alhamdu lillahi rabbil alamin': 'আলহামদুলিল্লাহি রাব্বিল আলামীন',
  'ar-raḥmānir-raḥīm': 'আর-রাহমানির রাহীম',
  'ar-rahmani r-rahimi': 'আর-রাহমানির রাহীম',
  'ar-rahmanir-rahim': 'আর-রাহমানির রাহীম',
  'māliki yawmid-dīn': 'মালিকি ইয়াওমিদ্দীন',
  'maliki yawmi d-dini': 'মালিকি ইয়াওমিদ্দীন',
  'maliki yawmiddin': 'মালিকি ইয়াওমিদ্দীন',
  'iyyāka na\'budu wa iyyāka nasta\'īn': 'ইয়্যাকা না\'বুদু ওয়া ইয়্যাকা নাস্তায়ীন',
  'iyyakana\'budu wa-iyyaka nasta\'inu': 'ইয়্যাকা না\'বুদু ওয়া ইয়্যাকা নাস্তায়ীন',
  'iyyaka na\'budu wa iyyaka nasta\'in': 'ইয়্যাকা না\'বুদু ওয়া ইয়্যাকা নাস্তায়ীন',
  'ihdinaṣ-ṣirāṭal-mustaqīm': 'ইহদিনাস সিরাতাল মুস্তাকীম',
  'ihdina s-sirata l-mustaqima': 'ইহদিনাস সিরাতাল মুস্তাকীম',
  'ihdinas-siratal-mustaqim': 'ইহদিনাস সিরাতাল মুস্তাকীম',
  'ṣirāṭal-ladhīna an\'amta \'alayhim ghayril-maghḍūbi \'alayhim wa laḍ-ḍāllīn': 'সিরাতাল্লাযীনা আন\'আমতা \'আলাইহিম গাইরিল মাগদূবি \'আলাইহিম ওয়ালাদ্দাল্লীন',
  'sirata l-ladhina an\'amta \'alayhim ghayri l-maghdubi \'alayhim wa-la d-dallina': 'সিরাতাল্লাযীনা আন\'আমতা \'আলাইহিম গাইরিল মাগদূবি \'আলাইহিম ওয়ালাদ্দাল্লীন',
  'siratalladhina an\'amta \'alayhim ghayril-maghdubi \'alayhim walad-dallin': 'সিরাতাল্লাযীনা আন\'আমতা \'আলাইহিম গাইরিল মাগদূবি \'আলাইহিম ওয়ালাদ্দাল্লীন',

  // Surah Al-Baqarah (2:1 - 2:5)
  'alif-lam-meem': 'আলিফ-লাম-মীম',
  'alif-laaam-meeem': 'আলিফ-লাম-মীম',
  'dhālikal-kitābu lā rayba fīhi hudal-lil-muttaqīn': 'যালিকাল কিতাবু লা রাইবা ফীহি, হুদাল লিল-মুত্তাকীন',
  'dhalikal-kitabu la rayba fihi hudal-lil-muttaqin': 'যালিকাল কিতাবু লা রাইবা ফীহি, হুদাল লিল-মুত্তাকীন',
  'dhalikal-kitabu la rayba feeh': 'যালিকাল কিতাবু লা রাইবা ফীহ',
  'alladhīna yu\'minūna bil-ghaybi wa yuqīmūnaṣ-ṣalāta wa mimmā razaqnāhum yunfiqūn': 'আল্লাযীনা ইউ\'মিনূনা বিল-গাইবি ওয়া ইয়ুক্বীমূনাস সালাতা ওয়া মিম্মা রাযাক্বনাহুম ইউনফিক্বূন',
  'alladhina yu\'minuna bil-ghaybi wa yuqimunas-salata wa mimma razaqnahum yunfiqun': 'আল্লাযীনা ইউ\'মিনূনা বিল-গাইবি ওয়া ইয়ুক্বীমূনাস সালাতা ওয়া মিম্মা রাযাক্বনাহুম ইউনফিক্বূন',
  'walladhīna yu\'minūna bimā unzila ilayka wa mā unzila min qablika wa bil-ākhirati hum yūqinūn': 'ওয়াল্লাযীনা ইউ\'মিনূনা বিমা উনযিলা ইলাইকা ওয়া মা উনযিলা মিন ক্বাবলিকা ওয়া বিল-আখিরাতি হুম ইউক্বিনূন',
  'walladhina yu\'minuna bima unzila ilayka wa ma unzila min qablika wa bil-akhirati hum yuqinun': 'ওয়াল্লাযীনা ইউ\'মিনূনা বিমা উনযিলা ইলাইকা ওয়া মা উনযিলা মিন ক্বাবলিকা ওয়া বিল-আখিরাতি হুম ইউক্বিনূন',
  'ulā\'ika \'alā hudam-mir-rabbihim wa ulā\'ika humul-mufliḥūn': 'উলা-ইকা \'আলা হুদাম মির-রাব্বিহিম ওয়া উলা-ইকা হুমুল মুফলিহূন',
  'ula\'ika \'ala hudam-mir-rabbihim wa ula\'ika humul-muflihun': 'উলা-ইকা \'আলা হুদাম মির-রাব্বিহিম ওয়া উলা-ইকা হুমুল মুফলিহূন',

  // Ayat al-Kursi (2:255)
  'allāhu lā ilāha illā huwal-ḥayyul-qayyūm': 'আল্লাহু লা ইলাহা ইল্লা হুওয়াল হাইয়্যুল ক্বাইয়্যূম',
  'allahu la ilaha illa huwal-hayyul-qayyum': 'আল্লাহু লা ইলাহা ইল্লা হুওয়াল হাইয়্যুল ক্বাইয়্যূম',

  // Surah Al-Ikhlas (112:1 - 112:4)
  'qul huwallāhu aḥad': 'কুল হুওয়াল্লাহু আহাদ',
  'qul huwallahu ahad': 'কুল হুওয়াল্লাহু আহাদ',
  'allāhuṣ-ṣamad': 'আল্লাহুস সামাদ',
  'allahus-samad': 'আল্লাহুস সামাদ',
  'lam yalid wa lam yūlad': 'লাম ইয়ালিদ ওয়া লাম ইউলাদ',
  'lam yalid wa lam yulad': 'লাম ইয়ালিদ ওয়া লাম ইউলাদ',
  'wa lam yakul-lahū kufuwan aḥad': 'ওয়া লাম ইয়া কুল্লাহু কুফুওয়ান আহাদ',
  'wa lam yakul-lahu kufuwan ahad': 'ওয়া লাম ইয়া কুল্লাহু কুফুওয়ান আহাদ',

  // Surah Al-Falaq (113:1 - 113:5)
  'qul a\'ūdhu bi-rabbil-falaq': 'কুল আ\'উযু বিরাব্বিল ফালাক্ব',
  'qul a\'udhu bi-rabbil-falaq': 'কুল আ\'উযু বিরাব্বিল ফালাক্ব',
  'min sharri mā khalaq': 'মিন শাররি মা খালাক্ব',
  'min sharri ma khalaq': 'মিন শাররি মা খালাক্ব',
  'wa min sharri ghāsiqin idhā waqab': 'ওয়া মিন শাররি গাসিক্বিন ইযা ওয়াক্বাব',
  'wa min sharri ghasiqin idha waqab': 'ওয়া মিন শাররি গাসিক্বিন ইযা ওয়াক্বাব',
  'wa min sharrin-naffāthāti fil-\'uqad': 'ওয়া মিন শাররিন নাফফাসাতি ফিল \'উক্বাদ',
  'wa min sharrin-naffathati fil-\'uqad': 'ওয়া মিন শাররিন নাফফাসাতি ফিল \'উক্বাদ',
  'wa min sharri ḥāsidin idhā ḥasad': 'ওয়া মিন শাররি হাসিদিন ইযা হাসাদ',
  'wa min sharri hasidin idha hasad': 'ওয়া মিন শাররি হাসিদিন ইযা হাসাদ',

  // Surah An-Nas (114:1 - 114:6)
  'qul a\'ūdhu bi-rabbin-nās': 'কুল আ\'উযু বিরাব্বিন নাস',
  'qul a\'udhu bi-rabbin-nas': 'কুল আ\'উযু বিরাব্বিন নাস',
  'malikin-nās': 'মালিকিন নাস',
  'malikin-nas': 'মালিকিন নাস',
  'ilāhin-nās': 'ইলাহিন নাস',
  'ilahin-nas': 'ইলাহিন নাস',
  'min sharril-waswāsil-khannās': 'মিন শাররিল ওয়াসওয়াসিল খান্নাস',
  'min sharril-waswasil-khannas': 'মিন শাররিল ওয়াসওয়াসিল খান্নাস',
  'alladhī yuwaswisu fī ṣudūrin-nās': 'আল্লাযী ইউওয়াসউিসু ফী সুদূরিন নাস',
  'alladhi yuwaswisu fi sudurin-nas': 'আল্লাযী ইউওয়াসউিসু ফী সুদূরিন নাস',
  'minal-jinnati wan-nās': 'মিনাল জিন্নাতি ওয়ান নাস',
  'minal-jinnati wan-nas': 'মিনাল জিন্নাতি ওয়ান নাস',

  // Surah Al-Kawthar (108:1 - 108:3)
  'innā a\'ṭaynākal-kawthar': 'ইন্না আ\'ত্বাইনাকাল কাওসার',
  'inna a\'taynakal-kawthar': 'ইন্না আ\'ত্বাইনাকাল কাওসার',
  'faṣalli li-rabbika wanḥar': 'ফাসাল্লি লি-রাব্বিকা ওয়ানহার',
  'fasalli li-rabbika wanhar': 'ফাসাল্লি লি-রাব্বিকা ওয়ানহার',
  'inna shāni\'aka huwal-abtar': 'ইন্না শানি\'আকা হুওয়াল আবতার',
  'inna shani\'aka huwal-abtar': 'ইন্না শানি\'আকা হুওয়াল আবতার',

  // Surah Al-Asr (103:1 - 103:3)
  'wal-\'aṣr': 'ওয়াল-\'আসর',
  'wal-\'asr': 'ওয়াল-\'আসর',
  'innal-insāna lafī khusr': 'ইন্নাল ইনসানা লাফী খুসর',
  'innal-insana lafi khusr': 'ইন্নাল ইনসানা লাফী খুসর',

  // Surah Al-Qadr (97:1 - 97:5)
  'innā anzalnāhu fī laylatil-qadr': 'ইন্না আনযালনাহু ফী লাইলাতিল ক্বদর',
  'inna anzalnahu fi laylatil-qadr': 'ইন্না আনযালনাহু ফী লাইলাতিল ক্বদর',
  'wa mā adrāka mā laylatul-qadr': 'ওয়া মা আদরাকা মা লাইলাতুল ক্বদর',
  'wa ma adraka ma laylatul-qadr': 'ওয়া মা আদরাকা মা লাইলাতুল ক্বদর',
  'laylatul-qadri khayrum min alfi shahr': 'লাইলাতুল ক্বদরি খাইরুম মিন আলফি শাহর',
  'tanazzalul-malā\'ikatu war-rūḥu fīhā bi\'idhni rabbihim min kulli amr': 'তানাযযালুল মালা-ইকাতু ওয়ার-রূহু ফীহা বিইযনি রাব্বিহিম মিন কুল্লি আমর',
  'tanazzalul-mala\'ikatu war-ruhu fiha bi\'idhni rabbihim min kulli amr': 'তানাযযালুল মালা-ইকাতু ওয়ার-রূহু ফীহা বিইযনি রাব্বিহিম মিন কুল্লি আমর',
  'salāmun hiya ḥattā maṭla\'il-fajr': 'সালামুন হিয়া হাত্তা মাতলা\'ইল ফাজর',
  'salamun hiya hatta matla\'il-fajr': 'সালামুন হিয়া হাত্তা মাতলা\'ইল ফাজর',
};

// Syllable-aware Latin-to-Bengali phonetics engine for Quranic Arabic recitation
function parseQuranicLatinWord(word: string): string {
  if (!word) return '';
  const cleanWord = word.trim().replace(/[.,;!?"()]/g, '');
  const lower = cleanWord.toLowerCase();

  // 1. Direct Muqatta'at check
  if (MUQATTAAT_PRONUNCIATION_MAP[lower]) {
    return MUQATTAAT_PRONUNCIATION_MAP[lower];
  }

  // 2. High frequency Quranic vocabulary table
  const VOCAB_MAP: Record<string, string> = {
    'allah': 'আল্লাহ',
    'allahu': 'আল্লাহু',
    'allaha': 'আল্লাহা',
    'allahi': 'আল্লাহি',
    'lillah': 'লিল্লাহ',
    'lillahi': 'লিল্লাহি',
    'bismillah': 'বিসমিল্লাহ',
    'bismillahi': 'বিসমিল্লাহি',
    'bismi': 'বিসমি',
    'ar-rahman': 'আর-রাহমান',
    'ar-rahmani': 'আর-রাহমানি',
    'ar-rahim': 'আর-রাহীম',
    'ar-rahimi': 'আর-রাহীম',
    'rabbil': 'রাব্বিল',
    'rabbi': 'রাব্বি',
    'rabbika': 'রাব্বিকা',
    'rabbihim': 'রাব্বিহিম',
    'al-alamin': 'আল-আলামীন',
    'alamin': 'আলামীন',
    'dhalika': 'যালিকা',
    'dhalikal': 'যালিকাল',
    'al-kitabu': 'আল-কিতাবু',
    'kitabu': 'কিতাবু',
    'la': 'লা',
    'rayba': 'রাইবা',
    'fihi': 'ফীহি',
    'feeh': 'ফীহ',
    'feehi': 'ফীহি',
    'hudan': 'হুদাল',
    'hudal': 'হুদাল',
    'lil-muttaqin': 'লিল-মুত্তাকীন',
    'lil-muttaqeen': 'লিল-মুত্তাকীন',
    'alladhina': 'আল্লাযীনা',
    'alladhīna': 'আল্লাযীনা',
    'yu\'minuna': 'ইউ\'মিনূনা',
    'yu\'minoona': 'ইউ\'মিনূনা',
    'bil-ghaybi': 'বিল-গাইবি',
    'wa': 'ওয়া',
    'yuqimuna': 'ইয়ুক্বীমূনা',
    'yuqimoona': 'ইয়ুক্বীমূনা',
    'as-salata': 'আস-সালাতা',
    'as-salaata': 'আস-সালাতা',
    'salata': 'সালাতা',
    'wa-mimma': 'ওয়া মিম্মা',
    'mimma': 'মিম্মা',
    'razaqnahum': 'রাযাক্বনাহুম',
    'yunfiqun': 'ইউনফিক্বূন',
    'yunfiqoon': 'ইউনফিক্বূন',
    'qul': 'কুল',
    'huwa': 'হুওয়া',
    'ahad': 'আহাদ',
    'samad': 'সামাদ',
    'lam': 'লাম',
    'yalid': 'ইয়ালিদ',
    'yulad': 'ইউলাদ',
    'falaq': 'ফালাক্ব',
    'nas': 'নাস',
    'an-nas': 'আন-নাস',
    'sharr': 'শাররি',
    'sharri': 'শাররি',
    'min': 'মিন',
    'ma': 'মা',
    'khalaq': 'খালাক্ব',
    'kawthar': 'কাওসার',
    'al-kawthar': 'আল-কাওসার',
    'kaafirun': 'কাফিরূন',
    'al-kafirun': 'আল-কাফিরূন',
  };

  if (VOCAB_MAP[lower]) {
    return VOCAB_MAP[lower];
  }

  // Common prefix handling
  let prefix = '';
  let rest = lower;
  if (rest.startsWith('al-') || rest.startsWith('al—')) { prefix = 'আল-'; rest = rest.slice(3); }
  else if (rest.startsWith('ar-')) { prefix = 'আর-'; rest = rest.slice(3); }
  else if (rest.startsWith('an-')) { prefix = 'আন-'; rest = rest.slice(3); }
  else if (rest.startsWith('as-')) { prefix = 'আস-'; rest = rest.slice(3); }
  else if (rest.startsWith('at-')) { prefix = 'আত-'; rest = rest.slice(3); }
  else if (rest.startsWith('az-')) { prefix = 'আজ-'; rest = rest.slice(3); }
  else if (rest.startsWith('ad-')) { prefix = 'আদ-'; rest = rest.slice(3); }
  else if (rest.startsWith('ash-')) { prefix = 'আশ-'; rest = rest.slice(4); }
  else if (rest.startsWith('bil-')) { prefix = 'বিল-'; rest = rest.slice(4); }
  else if (rest.startsWith('lil-')) { prefix = 'লিল-'; rest = rest.slice(4); }
  else if (rest.startsWith('wal-')) { prefix = 'ওয়াল-'; rest = rest.slice(4); }
  else if (rest.startsWith('fil-')) { prefix = 'ফিল-'; rest = rest.slice(4); }
  else if (rest.startsWith('wa-')) { prefix = 'ওয়া-'; rest = rest.slice(3); }
  else if (rest.startsWith('fa-')) { prefix = 'ফা-'; rest = rest.slice(3); }

  if (VOCAB_MAP[rest]) {
    return prefix + VOCAB_MAP[rest];
  }

  // Multi-character consonant map
  const CONSONANTS: Record<string, string> = {
    'sh': 'শ',
    'th': 'ছ',
    'dh': 'য',
    'kh': 'খ',
    'gh': 'গ',
    'zh': 'ঝ',
    'b': 'ব',
    't': 'ত',
    'j': 'জ',
    'h': 'হ',
    'd': 'দ',
    'r': 'র',
    'z': 'য',
    's': 'স',
    'f': 'ফ',
    'q': 'ক্ব',
    'k': 'ক',
    'l': 'ল',
    'm': 'ম',
    'n': 'ন',
    'w': 'ওয়',
    'y': 'ইয়',
  };

  const VOWELS_MATRA: Record<string, string> = {
    'aa': 'া',
    'ā': 'া',
    'ee': 'ী',
    'ī': 'ী',
    'oo': 'ূ',
    'ū': 'ূ',
    'ai': 'াই',
    'ay': 'াই',
    'aw': 'াউ',
    'a': 'া',
    'i': 'ি',
    'u': 'ু',
    'e': 'ে',
    'o': 'ো',
  };

  const VOWELS_INIT: Record<string, string> = {
    'aa': 'আ',
    'ā': 'আ',
    'ee': 'ঈ',
    'ī': 'ঈ',
    'oo': 'ঊ',
    'ū': 'ঊ',
    'ai': 'আই',
    'ay': 'আই',
    'aw': 'আউ',
    'a': 'আ',
    'i': 'ই',
    'u': 'উ',
    'e': 'এ',
    'o': 'ও',
  };

  let res = '';
  let idx = 0;
  let isStart = true;

  while (idx < rest.length) {
    if (rest[idx] === '\'' || rest[idx] === '’' || rest[idx] === '‘') {
      res += '\'';
      idx++;
      isStart = false;
      continue;
    }
    if (rest[idx] === '-' || rest[idx] === '—') {
      res += '-';
      idx++;
      isStart = true;
      continue;
    }

    // Check 2-letter or 1-letter consonant
    let c = '';
    let cLen = 0;
    if (idx + 1 < rest.length && CONSONANTS[rest.slice(idx, idx + 2)]) {
      c = CONSONANTS[rest.slice(idx, idx + 2)];
      cLen = 2;
    } else if (CONSONANTS[rest[idx]]) {
      c = CONSONANTS[rest[idx]];
      cLen = 1;
    }

    if (c) {
      idx += cLen;
      // Look ahead for following vowel sign
      let v = '';
      let vLen = 0;
      if (idx + 1 < rest.length && VOWELS_MATRA[rest.slice(idx, idx + 2)]) {
        v = VOWELS_MATRA[rest.slice(idx, idx + 2)];
        vLen = 2;
      } else if (VOWELS_MATRA[rest[idx]]) {
        v = VOWELS_MATRA[rest[idx]];
        vLen = 1;
      }

      if (v) {
        res += c + v;
        idx += vLen;
      } else {
        res += c;
      }
      isStart = false;
    } else {
      // Standalone vowel at syllable/word start
      let v = '';
      let vLen = 0;
      if (idx + 1 < rest.length && (isStart ? VOWELS_INIT[rest.slice(idx, idx + 2)] : VOWELS_MATRA[rest.slice(idx, idx + 2)])) {
        v = isStart ? VOWELS_INIT[rest.slice(idx, idx + 2)] : VOWELS_MATRA[rest.slice(idx, idx + 2)];
        vLen = 2;
      } else if (isStart ? VOWELS_INIT[rest[idx]] : VOWELS_MATRA[rest[idx]]) {
        v = isStart ? VOWELS_INIT[rest[idx]] : VOWELS_MATRA[rest[idx]];
        vLen = 1;
      }

      if (v) {
        res += v;
        idx += vLen;
      } else {
        idx++;
      }
      isStart = false;
    }
  }

  return prefix + res;
}

// Converts Latin transliteration to authentic Bengali Quranic pronunciation
export function latinToBengaliPronunciation(latinText: string): string {
  if (!latinText) return '';

  const normalized = latinText.trim().toLowerCase();

  // 1. Direct Muqatta'at check
  if (MUQATTAAT_PRONUNCIATION_MAP[normalized]) {
    return MUQATTAAT_PRONUNCIATION_MAP[normalized];
  }

  // 2. Exact match from curated ayah lookup table
  if (BENGALI_AYAH_PRONUNCIATION_MAP[normalized]) {
    return BENGALI_AYAH_PRONUNCIATION_MAP[normalized];
  }

  // 3. Normalization for any distorted strings like 'অ্যালিফ্- ল’আ-ম্- মীম্'
  const normalizedDirect = normalizeArabicPronunciationBn(latinText);
  if (normalizedDirect !== latinText && normalizedDirect !== '') {
    return normalizedDirect;
  }

  // 4. Tokenize and parse syllable-by-syllable
  const words = latinText.trim().split(/\s+/);
  return words.map(parseQuranicLatinWord).join(' ');
}

// Main helper function to return transliteration formatted according to selected user language
export function getFormattedTransliteration(
  rawTransliteration: string,
  arabicText: string,
  language: ZikrLanguage = 'bn'
): string {
  if (!rawTransliteration && !arabicText) return '';

  // Arabic language view shows original text
  if (language === 'ar') {
    return arabicText;
  }

  // Bengali view: match exact Arabic pronunciation conventions
  if (language === 'bn') {
    // 1. Check Muqatta'at on Arabic script or transliteration
    const arClean = (arabicText || '').replace(/[\s\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, '').trim();
    if (arClean && MUQATTAAT_PRONUNCIATION_MAP[arClean]) {
      return MUQATTAAT_PRONUNCIATION_MAP[arClean];
    }
    const arWithMadd = (arabicText || '').trim();
    if (arWithMadd && MUQATTAAT_PRONUNCIATION_MAP[arWithMadd]) {
      return MUQATTAAT_PRONUNCIATION_MAP[arWithMadd];
    }

    // 2. Check for distorted Bengali text (e.g., 'অ্যালিফ্- ল’আ-ম্- মীম্')
    if (rawTransliteration) {
      const cleanedBn = normalizeArabicPronunciationBn(rawTransliteration);
      if (cleanedBn !== rawTransliteration) {
        return cleanedBn;
      }
    }

    // 3. Convert via authentic Latin-to-Bengali phonetics
    return latinToBengaliPronunciation(rawTransliteration || arabicText);
  }

  // English, Urdu, or other languages return standard Latin transliteration
  return rawTransliteration;
}
