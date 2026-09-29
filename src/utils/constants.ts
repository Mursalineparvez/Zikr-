import { ZikrItem, ZikrLanguage } from '../types';

export const SUPPORTED_LANGUAGES: Array<{ code: ZikrLanguage; label: string; nativeName: string; flag: string }> = [
  { code: 'bn', label: 'বাংলা', nativeName: 'বাংলা (Bengali)', flag: '🇧🇩' },
  { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ur', label: 'اردو', nativeName: 'اردو (Urdu)', flag: '🇵🇰' },
  { code: 'hi', label: 'हिन्दी', nativeName: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'id', label: 'Bahasa', nativeName: 'Bahasa Indonesia', flag: '🇮🇩' },
  { code: 'tr', label: 'Türkçe', nativeName: 'Türkçe (Turkish)', flag: '🇹🇷' },
];

export const DEFAULT_ZIKRS: ZikrItem[] = [
  {
    id: 'subhanallah',
    name: 'SubhanAllah',
    arabic: 'سُبْحَانَ اللَّهِ',
    pronunciationBn: 'সুবহানাল্লাহ',
    meaningBn: 'আল্লাহ পবিত্র ও সকল ত্রুটি থেকে মুক্ত।',
    meaning: 'আল্লাহ পবিত্র ও সকল ত্রুটি থেকে মুক্ত।',
    transliteration: 'SubhanAllah',
    count: 0,
    target: 33,
    createdAt: 1700000000001,
    updatedAt: 1700000000001,
    color: 'emerald',
    translations: {
      bn: {
        pronunciation: 'সুবহানাল্লাহ',
        meaning: 'আল্লাহ পবিত্র ও সকল ত্রুটি থেকে মুক্ত।',
      },
      en: {
        pronunciation: 'SubhanAllah',
        meaning: 'Glory be to Allah (Free is Allah from all imperfections).',
      },
      ur: {
        pronunciation: 'سبحان اللہ',
        meaning: 'اللہ پاک ہے اور ہر عیب و نقص سے بری ہے۔',
      },
      hi: {
        pronunciation: 'सुब्हानअल्लाह',
        meaning: 'अल्लाह पवित्र और सभी दोषों से मुक्त है।',
      },
      id: {
        pronunciation: 'Subhanallah',
        meaning: 'Maha Suci Allah dari segala kekurangan dan cela.',
      },
      tr: {
        pronunciation: 'Sübhanallah',
        meaning: 'Allah her türlü eksiklik ve kusurdan uzaktır, münezzehtir.',
      },
    },
  },
  {
    id: 'alhamdulillah',
    name: 'Alhamdulillah',
    arabic: 'الْحَمْدُ لِلَّهِ',
    pronunciationBn: 'আলহামদুলিল্লাহ',
    meaningBn: 'সমস্ত প্রশংসা আল্লাহর জন্য।',
    meaning: 'সমস্ত প্রশংসা আল্লাহর জন্য।',
    transliteration: 'Alhamdulillah',
    count: 0,
    target: 33,
    createdAt: 1700000000002,
    updatedAt: 1700000000002,
    color: 'teal',
    translations: {
      bn: {
        pronunciation: 'আলহামদুলিল্লাহ',
        meaning: 'সমস্ত প্রশংসা আল্লাহর জন্য।',
      },
      en: {
        pronunciation: 'Alhamdulillah',
        meaning: 'All praise and gratitude are due to Allah alone.',
      },
      ur: {
        pronunciation: 'الحمد للہ',
        meaning: 'تمام تعریفیں اور شکر گزاری صرف اللہ ہی کے لیے ہے۔',
      },
      hi: {
        pronunciation: 'अल्हम्दुलिल्लाह',
        meaning: 'सभी प्रशंसा और आभार केवल अल्लाह के लिए है।',
      },
      id: {
        pronunciation: 'Alhamdulillah',
        meaning: 'Segala puji dan syukur hanya milik Allah semata.',
      },
      tr: {
        pronunciation: 'Elhamdülillah',
        meaning: 'Hamd ve övgülerin tamamı yalnızca Allah\'a aittir.',
      },
    },
  },
  {
    id: 'allahuakbar',
    name: 'Allahu Akbar',
    arabic: 'اللَّهُ أَكْبَرُ',
    pronunciationBn: 'আল্লাহু আকবার',
    meaningBn: 'আল্লাহ সর্বশ্রেষ্ঠ।',
    meaning: 'আল্লাহ সর্বশ্রেষ্ঠ।',
    transliteration: 'Allahu Akbar',
    count: 0,
    target: 34,
    createdAt: 1700000000003,
    updatedAt: 1700000000003,
    color: 'amber',
    translations: {
      bn: {
        pronunciation: 'আল্লাহু আকবার',
        meaning: 'আল্লাহ সর্বশ্রেষ্ঠ।',
      },
      en: {
        pronunciation: 'Allahu Akbar',
        meaning: 'Allah is the Greatest (greater than everything).',
      },
      ur: {
        pronunciation: 'اللہ اکبر',
        meaning: 'اللہ سب سے بڑا ہے اور سب پر غالب ہے۔',
      },
      hi: {
        pronunciation: 'अल्लाहु अकबर',
        meaning: 'अल्लाह सबसे बड़ा है।',
      },
      id: {
        pronunciation: 'Allahu Akbar',
        meaning: 'Allah Maha Besar melampaui segalanya.',
      },
      tr: {
        pronunciation: 'Allahü Ekber',
        meaning: 'Allah her şeyden yüce ve en büyüktür.',
      },
    },
  },
  {
    id: 'lailahaillallah',
    name: 'La Ilaha Illallah',
    arabic: 'لَا إِلٰهَ إِلَّا اللَّهُ',
    pronunciationBn: 'লা ইলাহা ইল্লাল্লাহ',
    meaningBn: 'আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই।',
    meaning: 'আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই।',
    transliteration: 'La Ilaha Illallah',
    count: 0,
    target: 100,
    createdAt: 1700000000004,
    updatedAt: 1700000000004,
    color: 'cyan',
    translations: {
      bn: {
        pronunciation: 'লা ইলাহা ইল্লাল্লাহ',
        meaning: 'আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই।',
      },
      en: {
        pronunciation: 'La Ilaha Illallah',
        meaning: 'There is no deity worthy of worship except Allah.',
      },
      ur: {
        pronunciation: 'لا الہ الا اللہ',
        meaning: 'اللہ کے سوا کوئی معبود برحق نہیں۔',
      },
      hi: {
        pronunciation: 'ला इलाहा इल्लल्लाह',
        meaning: 'अल्लाह के सिवा कोई सच्चा पूज्य नहीं है।',
      },
      id: {
        pronunciation: 'La ilaha illallah',
        meaning: 'Tiada sesembahan yang berhak disembah selain Allah.',
      },
      tr: {
        pronunciation: 'La ilahe illallah',
        meaning: 'Hak olarak ibadete layık Allah\'tan başka hiçbir ilah yoktur.',
      },
    },
  },
  {
    id: 'astaghfirullah',
    name: 'Astaghfirullah',
    arabic: 'أَسْتَغْفِرُ اللَّهَ',
    pronunciationBn: 'আস্তাগফিরুল্লাহ',
    meaningBn: 'আমি আল্লাহর কাছে ক্ষমা প্রার্থনা করছি।',
    meaning: 'আমি আল্লাহর কাছে ক্ষমা প্রার্থনা করছি।',
    transliteration: 'Astaghfirullah',
    count: 0,
    target: 100,
    createdAt: 1700000000005,
    updatedAt: 1700000000005,
    color: 'emerald',
    translations: {
      bn: {
        pronunciation: 'আস্তাগফিরুল্লাহ',
        meaning: 'আমি আল্লাহর কাছে ক্ষমা প্রার্থনা করছি।',
      },
      en: {
        pronunciation: 'Astaghfirullah',
        meaning: 'I seek forgiveness from Allah the Almighty.',
      },
      ur: {
        pronunciation: 'استغفر اللہ',
        meaning: 'میں اللہ تعالیٰ سے اپنے گناہوں کی معافی مانگتا ہوں۔',
      },
      hi: {
        pronunciation: 'अस्ताग़फ़िरुल्लाह',
        meaning: 'मैं अल्लाह से अपने गुनाहों की क्षमा मांगता हूँ।',
      },
      id: {
        pronunciation: 'Astaghfirullah',
        meaning: 'Aku memohon ampunan kepada Allah yang Maha Pengampun.',
      },
      tr: {
        pronunciation: 'Estağfirullah',
        meaning: 'Yüce Allah\'tan günahlarım için bağışlanma diliyorum.',
      },
    },
  },
  {
    id: 'subhanallahi_wa_bihamdihi',
    name: 'Subhanallahi Wa Bihamdihi',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    pronunciationBn: 'সুবহানাল্লাহি ওয়া বিহামদিহি',
    meaningBn: 'আল্লাহ পবিত্র; তাঁরই প্রশংসা।',
    meaning: 'আল্লাহ পবিত্র; তাঁরই প্রশংসা।',
    transliteration: 'Subhanallahi Wa Bihamdihi',
    count: 0,
    target: 100,
    createdAt: 1700000000006,
    updatedAt: 1700000000006,
    color: 'teal',
    translations: {
      bn: {
        pronunciation: 'সুবহানাল্লাহি ওয়া বিহামদিহি',
        meaning: 'আল্লাহ পবিত্র; তাঁরই প্রশংসা।',
      },
      en: {
        pronunciation: 'Subhanallahi Wa Bihamdihi',
        meaning: 'Glory be to Allah and His is the praise.',
      },
      ur: {
        pronunciation: 'سبحان اللہ وبحمدہ',
        meaning: 'اللہ پاک ہے اور اسی کے لیے حمد و ثنا ہے۔',
      },
      hi: {
        pronunciation: 'सुब्हानल्लाहि व बिहम्दिही',
        meaning: 'अल्लाह पवित्र है और उसी की सारी प्रशंसा है।',
      },
      id: {
        pronunciation: 'Subhanallahi wa bihamdihi',
        meaning: 'Maha Suci Allah dan segala puji hanya bagi-Nya.',
      },
      tr: {
        pronunciation: 'Sübhanallahi ve bihamdihi',
        meaning: 'Allah noksanlıklardan uzaktır ve O\'na hamd ederim.',
      },
    },
  },
  {
    id: 'la_hawla_wala_quwwata',
    name: 'La Hawla Wala Quwwata Illa Billah',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    pronunciationBn: 'লা হাওলা ওয়ালা কুওয়াতা ইল্লা বিল্লাহ',
    meaningBn: 'আল্লাহর সাহায্য ছাড়া কোনো শক্তি ও সামর্থ্য নেই।',
    meaning: 'আল্লাহর সাহায্য ছাড়া কোনো শক্তি ও সামর্থ্য নেই।',
    transliteration: 'La Hawla Wala Quwwata Illa Billah',
    count: 0,
    target: 100,
    createdAt: 1700000000007,
    updatedAt: 1700000000007,
    color: 'amber',
    translations: {
      bn: {
        pronunciation: 'লা হাওলা ওয়ালা কুওয়াতা ইল্লা বিল্লাহ',
        meaning: 'আল্লাহর সাহায্য ছাড়া কোনো শক্তি ও সামর্থ্য নেই।',
      },
      en: {
        pronunciation: 'La Hawla Wala Quwwata Illa Billah',
        meaning: 'There is no power and no strength except with Allah.',
      },
      ur: {
        pronunciation: 'لا حول ولا قوة الا بالله',
        meaning: 'گناہوں سے بچنے کی طاقت اور نیکی کرنے کی قوت صرف اللہ کے فضل سے ہے۔',
      },
      hi: {
        pronunciation: 'ला हवला वला क़ुव्वता इल्ला बिल्लाह',
        meaning: 'अल्लाह की मदद के बिना न कोई शक्ति है और न कोई सामर्थ्य।',
      },
      id: {
        pronunciation: 'La hawla wa la quwwata illa billah',
        meaning: 'Tiada daya upaya dan kekuatan selain dengan pertolongan Allah.',
      },
      tr: {
        pronunciation: 'La havle vela kuvvete illa billah',
        meaning: 'Güç ve kuvvet ancak ve ancak Allah\'ın yardımıyladır.',
      },
    },
  },
  {
    id: 'allahumma_salli_ala_muhammad',
    name: 'Allahumma Salli Ala Muhammad',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ',
    pronunciationBn: 'আল্লাহুম্মা সাল্লি আলা মুহাম্মাদ',
    meaningBn: 'হে আল্লাহ, মুহাম্মাদ (সা.)-এর ওপর রহমত ও শান্তি বর্ষণ করুন।',
    meaning: 'হে আল্লাহ, মুহাম্মাদ (সা.)-এর ওপর রহমত ও শান্তি বর্ষণ করুন।',
    transliteration: 'Allahumma Salli Ala Muhammad',
    count: 0,
    target: 100,
    createdAt: 1700000000008,
    updatedAt: 1700000000008,
    color: 'emerald',
    translations: {
      bn: {
        pronunciation: 'আল্লাহুম্মা সাল্লি আলা মুহাম্মাদ',
        meaning: 'হে আল্লাহ, মুহাম্মাদ (সা.)-এর ওপর রহমত ও শান্তি বর্ষণ করুন।',
      },
      en: {
        pronunciation: 'Allahumma Salli Ala Muhammad',
        meaning: 'O Allah, bestow peace and blessings upon Muhammad (ﷺ).',
      },
      ur: {
        pronunciation: 'اللہم صل علی محمد',
        meaning: 'اے اللہ! حضرت محمد (صلی اللہ علیہ وسلم) پر رحمتیں اور درود نازل فرما۔',
      },
      hi: {
        pronunciation: 'अल्लाहुम्मा सल्लि अला मुहम्मद',
        meaning: 'हे अल्लाह, मुहम्मद (सल्लल्लाहु अलैहि व सल्लम) पर कृपा और शांति बरसा।',
      },
      id: {
        pronunciation: 'Allahumma sholli \'ala Muhammad',
        meaning: 'Ya Allah, limpahkanlah rahmat dan kesejahteraan atas Nabi Muhammad.',
      },
      tr: {
        pronunciation: 'Allahümme salli ala Muhammed',
        meaning: 'Ey Rabbim! Hazreti Muhammed\'e (s.a.v.) salat ve selam eyle.',
      },
    },
  },
  {
    id: 'subhanallahil_azeem',
    name: 'Subhanallahil Azeem',
    arabic: 'سُبْحَانَ اللَّهِ الْعَظِيمِ',
    pronunciationBn: 'সুবহানাল্লাহিল আযীম',
    meaningBn: 'মহান আল্লাহ পবিত্র ও সকল ত্রুটি থেকে মুক্ত।',
    meaning: 'মহান আল্লাহ পবিত্র ও সকল ত্রুটি থেকে মুক্ত।',
    transliteration: 'Subhanallahil Azeem',
    count: 0,
    target: 100,
    createdAt: 1700000000009,
    updatedAt: 1700000000009,
    color: 'teal',
    translations: {
      bn: {
        pronunciation: 'সুবহানাল্লাহিল আযীম',
        meaning: 'মহান আল্লাহ পবিত্র ও সকল ত্রুটি থেকে মুক্ত।',
      },
      en: {
        pronunciation: 'SubhanAllahil Azeem',
        meaning: 'Glory be to Allah, the Magnificent and Supreme.',
      },
      ur: {
        pronunciation: 'سبحان اللہ العظیم',
        meaning: 'عظمت والا اللہ ہر عیب سے پاک ہے۔',
      },
      hi: {
        pronunciation: 'सुब्हानल्लाहिल अज़ीम',
        meaning: 'महान अल्लाह पवित्र और सभी दोषों से मुक्त है।',
      },
      id: {
        pronunciation: 'Subhanallahil \'Azhim',
        meaning: 'Maha Suci Allah Yang Maha Agung lagi Maha Mulia.',
      },
      tr: {
        pronunciation: 'Sübhanallahil Azim',
        meaning: 'Pek yüce ve ulu olan Allah her türlü noksanlıktan münezzehtir.',
      },
    },
  },
  {
    id: 'hasbiyallahu_la_ilaha_illa_huwa',
    name: 'Hasbiyallahu La Ilaha Illa Huwa',
    arabic: 'حَسْبِيَ اللَّهُ لَا إِلٰهَ إِلَّا هُوَ',
    pronunciationBn: 'হাসবিয়াল্লাহু লা ইলাহা ইল্লা হুয়া',
    meaningBn: 'আল্লাহই আমার জন্য যথেষ্ট; তিনি ছাড়া কোনো সত্য উপাস্য নেই।',
    meaning: 'আল্লাহই আমার জন্য যথেষ্ট; তিনি ছাড়া কোনো সত্য উপাস্য নেই।',
    transliteration: 'Hasbiyallahu La Ilaha Illa Huwa',
    count: 0,
    target: 7,
    createdAt: 1700000000010,
    updatedAt: 1700000000010,
    color: 'amber',
    translations: {
      bn: {
        pronunciation: 'হাসবিয়াল্লাহু লা ইলাহা ইল্লা হুয়া',
        meaning: 'আল্লাহই আমার জন্য যথেষ্ট; তিনি ছাড়া কোনো সত্য উপাস্য নেই।',
      },
      en: {
        pronunciation: 'Hasbiyallahu La Ilaha Illa Huwa',
        meaning: 'Allah is sufficient for me; there is no deity worthy of worship except Him.',
      },
      ur: {
        pronunciation: 'حسبی اللہ لا الہ الا ہو',
        meaning: 'اللہ ہی میرے لیے کافی ہے، اس کے سوا کوئی معبود نہیں۔',
      },
      hi: {
        pronunciation: 'हसबियल्लाहु ला इलाहा इल्ला हुवा',
        meaning: 'अल्लाह ही मेरे लिए काफी है; उसके सिवा कोई सच्चा पूज्य नहीं।',
      },
      id: {
        pronunciation: 'Hasbiyallahu la ilaha illa Huwa',
        meaning: 'Cukuplah Allah bagiku, tidak ada Tuhan selain Dia.',
      },
      tr: {
        pronunciation: 'Hasbiyallahü la ilahe illa hu',
        meaning: 'Allah bana yeter, O\'ndan başka hiçbir ilah yoktur.',
      },
    },
  },
  {
    id: 'dua_yunus',
    name: "Du'a of Yunus (AS)",
    arabic: 'لَا إِلَٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ',
    pronunciationBn: 'লা ইলাহা ইল্লা আনতা সুবহানাকা ইন্নি কুনতু মিনাজ-জালিমীন',
    meaningBn: 'আপনি ছাড়া কোনো সত্য উপাস্য নেই। আপনি পবিত্র ও মহিমান্বিত। নিশ্চয়ই আমি জালিমদের অন্তর্ভুক্ত ছিলাম।',
    meaning: 'আপনি ছাড়া কোনো সত্য উপাস্য নেই। আপনি পবিত্র ও মহিমান্বিত। নিশ্চয়ই আমি জালিমদের অন্তর্ভুক্ত ছিলাম।',
    transliteration: 'Dua of Yunus (AS)',
    count: 0,
    target: 100,
    createdAt: 1700000000011,
    updatedAt: 1700000000011,
    color: 'cyan',
    translations: {
      bn: {
        pronunciation: 'লা ইলাহা ইল্লা আনতা সুবহানাকা ইন্নি কুনতু মিনাজ-জালিমীন',
        meaning: 'আপনি ছাড়া কোনো সত্য উপাস্য নেই। আপনি পবিত্র ও মহিমান্বিত। নিশ্চয়ই আমি জালিমদের অন্তর্ভুক্ত ছিলাম।',
      },
      en: {
        pronunciation: 'La ilaha illa Anta subhanaka inni kuntu minaz-zalimin',
        meaning: 'There is no deity worthy of worship except You; exalted are You, indeed I have been of the wrongdoers.',
      },
      ur: {
        pronunciation: 'لا الہ الا انت سبحانک انی کنت من الظالمین',
        meaning: 'تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی قصورواروں میں سے تھا۔',
      },
      hi: {
        pronunciation: 'ला इलाहा इल्ला अन्ता सुब्हानका इन्नी कुन्तु मिनज़-ज़ालिमीन',
        meaning: 'तेरे सिवा कोई सच्चा पूज्य नहीं, तू पवित्र है, निस्संदेह मैं ही अन्यायियों में से था।',
      },
      id: {
        pronunciation: 'La ilaha illa Anta subhanaka inni kuntu minaz-zhalimin',
        meaning: 'Tidak ada Tuhan selain Engkau, Maha Suci Engkau, sungguh aku termasuk orang-orang yang zalim.',
      },
      tr: {
        pronunciation: 'La ilahe illa ente sübhaneke inni küntü minez-zalimin',
        meaning: 'Senden başka ilah yoktur. Seni tenzih ederim, doğrusu ben haksızlık edenlerden oldum.',
      },
    },
  },
  {
    id: 'lailaha_illallahu_wahdahu',
    name: 'La Ilaha Illallahu Wahdahu',
    arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِیکَ لَهُ، لَهُ الْمُلْکُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ کُلِّ شَيْءٍ قَدِیرٌ',
    pronunciationBn: 'লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকালাহু, লাহুল মুলকু ওয়া লাহুল হামদু, ওয়া হুয়া আলা কুল্লি শাইইন কাদীর',
    meaningBn: 'আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই। তিনি একক, তাঁর কোনো শরিক নেই। রাজত্ব তাঁরই এবং সমস্ত প্রশংসাও তাঁরই। তিনি সবকিছুর ওপর ক্ষমতাবান।',
    meaning: 'আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই। তিনি একক, তাঁর কোনো শরিক নেই। রাজত্ব তাঁরই এবং সমস্ত প্রশংসাও তাঁরই। তিনি সবকিছুর ওপর ক্ষমতাবান।',
    transliteration: 'La Ilaha Illallahu Wahdahu La Sharika Lahu',
    count: 0,
    target: 100,
    createdAt: 1700000000012,
    updatedAt: 1700000000012,
    color: 'emerald',
    translations: {
      bn: {
        pronunciation: 'লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারীকালাহু, লাহুল মুলকু ওয়া লাহুল হামদু, ওয়া হুয়া আলা কুল্লি শাইইন কাদীর',
        meaning: 'আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই। তিনি একক, তাঁর কোনো শরিক নেই। রাজত্ব তাঁরই এবং সমস্ত প্রশংসাও তাঁরই। তিনি সবকিছুর ওপর ক্ষমতাবান।',
      },
      en: {
        pronunciation: 'La ilaha illallahu wahdahu la sharika lahu, lahul-mulku wa lahul-hamdu wa huwa \'ala kulli shay\'in qadir',
        meaning: 'There is no deity worthy of worship except Allah alone, without partner. To Him belongs all sovereignty and praise, and He has power over all things.',
      },
      ur: {
        pronunciation: 'لا الہ الا اللہ وحدہ لا شریک لہ، لہ الملک ولہ الحمد وہو علی کل شیء قدیر',
        meaning: 'اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کی تعریف ہے اور وہ ہر چیز پر قادر ہے۔',
      },
      hi: {
        pronunciation: 'ला इलाहा इल्लल्लाहु वह्दहू ला शरीका लहू, लहुल-मुल्कु व लहुल-हम्दु व हुवा अला कुल्लि शैइन क़दीर',
        meaning: 'अल्लाह के सिवा कोई सच्चा पूज्य नहीं, वह अकेला है, उसका कोई साझी नहीं, राजत्व उसी का है और प्रशंसा उसी के लिए है और वह सब चीज़ों पर सामर्थ्य रखता है।',
      },
      id: {
        pronunciation: 'La ilaha illallahu wahdahu la syarika lah, lahul mulku wa lahul hamdu wa huwa \'ala kulli syai\'in qadir',
        meaning: 'Tiada Tuhan selain Allah semata, tiada sekutu bagi-Nya. Milik-Nya segenap kerajaan dan pujian, dan Dia Maha Kuasa atas segala sesuatu.',
      },
      tr: {
        pronunciation: 'La ilahe illallahü vahdehu la şerike leh, lehü\'l-mülkü ve lehü\'l-hamdü ve hüve ala külli şey\'in kadir',
        meaning: 'Allah\'tan başka ilah yoktur; O tektir, ortağı yoktur. Mülk O\'nundur, hamd O\'na mahsustur ve O her şeye kadirdir.',
      },
    },
  },
];

export const COMMON_ZIKR_LIST = DEFAULT_ZIKRS;

export const PRESET_ZIKR_SUGGESTIONS = [
  {
    name: 'La ilaha illallah',
    arabic: 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ',
    transliteration: 'Lā ilāha illallāh',
    meaning: 'There is no deity worthy of worship except Allah',
    target: 100,
  },
  {
    name: 'Salawat on Prophet ﷺ',
    arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ',
    transliteration: 'Allāhumma ṣalli ʿalā Muḥammad',
    meaning: 'O Allah, bestow peace and blessings upon Muhammad',
    target: 100,
  },
  {
    name: 'SubhanAllahi wa biHamdihi',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    transliteration: 'Subḥānallāhi wa bi-ḥamdih',
    meaning: 'Glory be to Allah and His is the praise',
    target: 100,
  },
  {
    name: 'La Hawla wa la Quwwata illa Billah',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِٱللَّٰهِ',
    transliteration: 'Lā ḥawla wa lā quwwata illā billāh',
    meaning: 'There is no power nor strength except with Allah',
    target: 33,
  },
  {
    name: "HasbunAllahu wa Ni'mal Wakeel",
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    transliteration: 'Ḥasbunallāhu wa niʿmal-wakīl',
    meaning: 'Allah is sufficient for us, and He is the best disposer of affairs',
    target: 40,
  },
  {
    name: 'Ayat al-Kursi (Count)',
    arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
    transliteration: 'Allāhu lā ilāha illā huwal-ḥayyul-qayyūm',
    meaning: 'The Throne Verse recitation counter',
    target: 7,
  },
];
