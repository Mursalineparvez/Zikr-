import { ZikrItem, ZikrLanguage, ZikrRefreshMode } from '../types';

export function getTargetForZikrMode(item: ZikrItem, mode: ZikrRefreshMode): number {
  const matchedDefault = DEFAULT_ZIKRS.find(
    (d) => d.id === item.id || (item.name && d.name.toLowerCase() === item.name.toLowerCase())
  );

  const fard = item.fardTarget ?? matchedDefault?.fardTarget;
  const maghrib = item.maghribTarget ?? matchedDefault?.maghribTarget;
  const manual = item.manualTarget ?? matchedDefault?.manualTarget;

  if (mode === 'fard') {
    return typeof fard === 'number' ? fard : (matchedDefault?.target || item.target || 33);
  }
  if (mode === 'maghrib') {
    return typeof maghrib === 'number' ? maghrib : (matchedDefault?.target || item.target || 165);
  }
  if (mode === 'manual') {
    return typeof manual === 'number' ? manual : (matchedDefault?.target || item.target || 200);
  }
  return item.target || 33;
}

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
    "id": "subhanallah",
    "name": "SubhanAllah",
    "arabic": "سُبْحَانَ اللَّهِ",
    "pronunciationBn": "সুবহানাল্লাহ",
    "meaningBn": "আল্লাহ পবিত্র ও সকল ত্রুটি থেকে মুক্ত।",
    "meaning": "আল্লাহ পবিত্র ও সকল ত্রুটি থেকে মুক্ত।",
    "transliteration": "SubhanAllah",
    "count": 0,
    "target": 33,
    "fardTarget": 33,
    "maghribTarget": 165,
    "manualTarget": 200,
    "createdAt": 1700000000001,
    "updatedAt": 1700000000001,
    "color": "emerald",
    "translations": {
      "bn": {
        "pronunciation": "সুবহানাল্লাহ",
        "meaning": "আল্লাহ পবিত্র ও সকল ত্রুটি থেকে মুক্ত।"
      },
      "en": {
        "pronunciation": "SubhanAllah",
        "meaning": "Glory be to Allah (Free is Allah from all imperfections)."
      },
      "ur": {
        "pronunciation": "سبحان اللہ",
        "meaning": "اللہ پاک ہے اور ہر عیب و نقص سے بری ہے۔"
      },
      "hi": {
        "pronunciation": "सुब्हानअल्लाह",
        "meaning": "अल्लाह पवित्र और सभी दोषों से मुक्त है।"
      },
      "id": {
        "pronunciation": "Subhanallah",
        "meaning": "Maha Suci Allah dari segala kekurangan dan cela."
      },
      "tr": {
        "pronunciation": "Sübhanallah",
        "meaning": "Allah her türlü eksiklik ve kusurdan uzaktır, münezzehtir."
      }
    }
  },
  {
    "id": "alhamdulillah",
    "name": "Alhamdulillah",
    "arabic": "الْحَمْدُ لِلَّهِ",
    "pronunciationBn": "আলহামদুলিল্লাহ",
    "meaningBn": "সমস্ত প্রশংসা আল্লাহর জন্য।",
    "meaning": "সমস্ত প্রশংসা আল্লাহর জন্য।",
    "transliteration": "Alhamdulillah",
    "count": 0,
    "target": 33,
    "fardTarget": 33,
    "maghribTarget": 165,
    "manualTarget": 200,
    "createdAt": 1700000000002,
    "updatedAt": 1700000000002,
    "color": "teal",
    "translations": {
      "bn": {
        "pronunciation": "আলহামদুলিল্লাহ",
        "meaning": "সমস্ত প্রশংসা আল্লাহর জন্য।"
      },
      "en": {
        "pronunciation": "Alhamdulillah",
        "meaning": "All praise and gratitude are due to Allah alone."
      },
      "ur": {
        "pronunciation": "الحمد للہ",
        "meaning": "تمام تعریفیں اور شکر گزاری صرف اللہ ہی کے لیے ہے۔"
      },
      "hi": {
        "pronunciation": "अल्हम्दुलिल्लाह",
        "meaning": "सभी प्रशंसा और आभार केवल अल्लाह के लिए है।"
      },
      "id": {
        "pronunciation": "Alhamdulillah",
        "meaning": "Segala puji dan syukur hanya milik Allah semata."
      },
      "tr": {
        "pronunciation": "Elhamdülillah",
        "meaning": "Hamd ve övgülerin tamamı yalnızca Allah'a aittir."
      }
    }
  },
  {
    "id": "allahuakbar",
    "name": "Allahu Akbar",
    "arabic": "اللَّهُ أَكْبَرُ",
    "pronunciationBn": "আল্লাহু আকবার",
    "meaningBn": "আল্লাহ সর্বশ্রেষ্ঠ।",
    "meaning": "আল্লাহ সর্বশ্রেষ্ঠ।",
    "transliteration": "Allahu Akbar",
    "count": 0,
    "target": 33,
    "fardTarget": 33,
    "maghribTarget": 165,
    "manualTarget": 200,
    "createdAt": 1700000000003,
    "updatedAt": 1700000000003,
    "color": "amber",
    "translations": {
      "bn": {
        "pronunciation": "আল্লাহু আকবার",
        "meaning": "আল্লাহ সর্বশ্রেষ্ঠ।"
      },
      "en": {
        "pronunciation": "Allahu Akbar",
        "meaning": "Allah is the Greatest (greater than everything)."
      },
      "ur": {
        "pronunciation": "اللہ اکبر",
        "meaning": "اللہ سب سے بڑا ہے اور سب پر غالب ہے۔"
      },
      "hi": {
        "pronunciation": "अल्लाहु अकबर",
        "meaning": "अल्लाह सबसे बड़ा है।"
      },
      "id": {
        "pronunciation": "Allahu Akbar",
        "meaning": "Allah Maha Besar melampaui segalanya."
      },
      "tr": {
        "pronunciation": "Allahü Ekber",
        "meaning": "Allah her şeyden yüce ve en büyüktür."
      }
    }
  },
  {
    "id": "lailahaillallah",
    "name": "La Ilaha Illallah",
    "arabic": "لَا إِلٰهَ إِلَّا اللَّهُ",
    "pronunciationBn": "লা ইলাহা ইল্লাল্লাহ",
    "meaningBn": "আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই।",
    "meaning": "আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই।",
    "transliteration": "La Ilaha Illallah",
    "count": 0,
    "target": 1,
    "fardTarget": 1,
    "maghribTarget": 5,
    "manualTarget": 200,
    "createdAt": 1700000000004,
    "updatedAt": 1700000000004,
    "color": "cyan",
    "translations": {
      "bn": {
        "pronunciation": "লা ইলাহা ইল্লাল্লাহ",
        "meaning": "আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই।"
      },
      "en": {
        "pronunciation": "La Ilaha Illallah",
        "meaning": "There is no deity worthy of worship except Allah."
      },
      "ur": {
        "pronunciation": "لا الہ الا اللہ",
        "meaning": "اللہ کے سوا کوئی معبود برحق نہیں۔"
      },
      "hi": {
        "pronunciation": "ला इलाहा इल्लल्लाह",
        "meaning": "अल्लाह के सिवा कोई सच्चा पूज्य नहीं है।"
      },
      "id": {
        "pronunciation": "La ilaha illallah",
        "meaning": "Tiada sesembahan yang berhak disembah selain Allah."
      },
      "tr": {
        "pronunciation": "La ilahe illallah",
        "meaning": "Hak olarak ibadete layık Allah'tan başka hiçbir ilah yoktur."
      }
    }
  },
  {
    "id": "astaghfirullah",
    "name": "Astaghfirullah",
    "arabic": "أَسْتَغْفِرُ اللَّهَ",
    "pronunciationBn": "আস্তাগফিরুল্লাহ",
    "meaningBn": "আমি আল্লাহর কাছে ক্ষমা প্রার্থনা করছি।",
    "meaning": "আমি আল্লাহর কাছে ক্ষমা প্রার্থনা করছি।",
    "transliteration": "Astaghfirullah",
    "count": 0,
    "target": 3,
    "fardTarget": 3,
    "maghribTarget": 15,
    "manualTarget": 200,
    "createdAt": 1700000000005,
    "updatedAt": 1700000000005,
    "color": "emerald",
    "translations": {
      "bn": {
        "pronunciation": "আস্তাগফিরুল্লাহ",
        "meaning": "আমি আল্লাহর কাছে ক্ষমা প্রার্থনা করছি।"
      },
      "en": {
        "pronunciation": "Astaghfirullah",
        "meaning": "I seek forgiveness from Allah the Almighty."
      },
      "ur": {
        "pronunciation": "استغفر اللہ",
        "meaning": "میں اللہ تعالیٰ سے اپنے گناہوں کی معافی مانگتا ہوں۔"
      },
      "hi": {
        "pronunciation": "अस्ताग़फ़िरुल्लाह",
        "meaning": "मैं अल्लाह से अपने गुनाहों की क्षमा मांगता हूँ।"
      },
      "id": {
        "pronunciation": "Astaghfirullah",
        "meaning": "Aku memohon ampunan kepada Allah yang Maha Pengampun."
      },
      "tr": {
        "pronunciation": "Estağfirullah",
        "meaning": "Yüce Allah'tan günahlarım için bağışlanma diliyorum."
      }
    }
  },
  {
    "id": "subhanallahi_wa_bihamdihi",
    "name": "Subhanallahi Wa Bihamdihi",
    "arabic": "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
    "pronunciationBn": "সুবহানাল্লাহি ওয়া বিহামদিহি",
    "meaningBn": "আল্লাহ পবিত্র; তাঁরই প্রশংসা।",
    "meaning": "আল্লাহ পবিত্র; তাঁরই প্রশংসা।",
    "transliteration": "Subhanallahi Wa Bihamdihi",
    "count": 0,
    "target": 20,
    "fardTarget": 20,
    "maghribTarget": 100,
    "manualTarget": 50,
    "createdAt": 1700000000006,
    "updatedAt": 1700000000006,
    "color": "teal",
    "translations": {
      "bn": {
        "pronunciation": "সুবহানাল্লাহি ওয়া বিহামদিহি",
        "meaning": "আল্লাহ পবিত্র; তাঁরই প্রশংসা।"
      },
      "en": {
        "pronunciation": "Subhanallahi Wa Bihamdihi",
        "meaning": "Glory be to Allah and His is the praise."
      },
      "ur": {
        "pronunciation": "سبحان اللہ وبحمدہ",
        "meaning": "اللہ پاک ہے اور اسی کے لیے حمد و ثنا ہے۔"
      },
      "hi": {
        "pronunciation": "सुब्हानल्लाहि व बिहम्दिही",
        "meaning": "अल्लाह पवित्र है और उसी की सारी प्रशंसा है।"
      },
      "id": {
        "pronunciation": "Subhanallahi wa bihamdihi",
        "meaning": "Maha Suci Allah dan segala puji hanya bagi-Nya."
      },
      "tr": {
        "pronunciation": "Sübhanallahi ve bihamdihi",
        "meaning": "Allah noksanlıklardan uzaktır ve O'na hamd ederim."
      }
    }
  },
  {
    "id": "la_hawla_wala_quwwata",
    "name": "La Hawla Wala Quwwata Illa Billah",
    "arabic": "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ",
    "pronunciationBn": "লা হাওলা ওয়ালা কুওয়াতা ইল্লা বিল্লাহ",
    "meaningBn": "আল্লাহর সাহায্য ছাড়া কোনো শক্তি ও সামর্থ্য নেই।",
    "meaning": "আল্লাহর সাহায্য ছাড়া কোনো শক্তি ও সামর্থ্য নেই।",
    "transliteration": "La Hawla Wala Quwwata Illa Billah",
    "count": 0,
    "target": 10,
    "fardTarget": 10,
    "maghribTarget": 50,
    "manualTarget": 200,
    "createdAt": 1700000000007,
    "updatedAt": 1700000000007,
    "color": "amber",
    "translations": {
      "bn": {
        "pronunciation": "লা হাওলা ওয়ালা কুওয়াতা ইল্লা বিল্লাহ",
        "meaning": "আল্লাহর সাহায্য ছাড়া কোনো শক্তি ও সামর্থ্য নেই।"
      },
      "en": {
        "pronunciation": "La Hawla Wala Quwwata Illa Billah",
        "meaning": "There is no power and no strength except with Allah."
      },
      "ur": {
        "pronunciation": "لا حول ولا قوة الا بالله",
        "meaning": "گناہوں سے بچنے کی طاقت اور نیکی کرنے کی قوت صرف اللہ کے فضل سے ہے۔"
      },
      "hi": {
        "pronunciation": "ला हवला वला क़ुव्वता इल्ला बिल्लाह",
        "meaning": "अल्लाह की मदद के बिना न कोई शक्ति है और न कोई सामर्थ्य।"
      },
      "id": {
        "pronunciation": "La hawla wa la quwwata illa billah",
        "meaning": "Tiada daya upaya dan kekuatan selain dengan pertolongan Allah."
      },
      "tr": {
        "pronunciation": "La havle vela kuvvete illa billah",
        "meaning": "Güç ve kuvvet ancak ve ancak Allah'ın yardımıyladır."
      }
    }
  },
  {
    "id": "allahumma_salli_ala_muhammad",
    "name": "Allahumma Salli Ala Muhammad",
    "arabic": "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ",
    "pronunciationBn": "আল্লাহুম্মা সাল্লি আলা মুহাম্মাদ",
    "meaningBn": "হে আল্লাহ, মুহাম্মাদ (সা.)-এর ওপর রহমত ও শান্তি বর্ষণ করুন।",
    "meaning": "হে আল্লাহ, মুহাম্মাদ (সা.)-এর ওপর রহমত ও শান্তি বর্ষণ করুন।",
    "transliteration": "Allahumma Salli Ala Muhammad",
    "count": 0,
    "target": 10,
    "fardTarget": 10,
    "maghribTarget": 50,
    "manualTarget": 200,
    "createdAt": 1700000000008,
    "updatedAt": 1700000000008,
    "color": "emerald",
    "translations": {
      "bn": {
        "pronunciation": "আল্লাহুম্মা সাল্লি আলা মুহাম্মাদ",
        "meaning": "হে আল্লাহ, মুহাম্মাদ (সা.)-এর ওপর রহমত ও শান্তি বর্ষণ করুন।"
      },
      "en": {
        "pronunciation": "Allahumma Salli Ala Muhammad",
        "meaning": "O Allah, bestow peace and blessings upon Muhammad (ﷺ)."
      },
      "ur": {
        "pronunciation": "اللہم صل علی محمد",
        "meaning": "اے اللہ! حضرت محمد (صلی اللہ علیہ وسلم) پر رحمتیں اور درود نازل فرما۔"
      },
      "hi": {
        "pronunciation": "अल्लाहुम्मा सल्लि अला मुहम्मद",
        "meaning": "हे अल्लाह, मुहम्मद (सल्लल्लाहु अलैहि व सल्लम) पर कृपा और शांति बरसा।"
      },
      "id": {
        "pronunciation": "Allahumma sholli 'ala Muhammad",
        "meaning": "Ya Allah, limpahkanlah rahmat dan kesejahteraan atas Nabi Muhammad."
      },
      "tr": {
        "pronunciation": "Allahümme salli ala Muhammed",
        "meaning": "Ey Rabbim! Hazreti Muhammed'e (s.a.v.) salat ve selam eyle."
      }
    }
  },
  {
    "id": "subhanallahil_azeem",
    "name": "Subhanallahil Azim",
    "arabic": "سُبْحَانَ اللَّهِ الْعَظِيمِ",
    "pronunciationBn": "সুবহানাল্লাহিল আজিম",
    "meaningBn": "মহান আল্লাহ পবিত্র ও সকল ত্রুটি থেকে মুক্ত।",
    "meaning": "মহান আল্লাহ পবিত্র ও সকল ত্রুটি থেকে মুক্ত।",
    "transliteration": "Subhanallahil Azeem",
    "count": 0,
    "target": 10,
    "fardTarget": 10,
    "maghribTarget": 50,
    "manualTarget": 200,
    "createdAt": 1700000000009,
    "updatedAt": 1700000000009,
    "color": "teal",
    "translations": {
      "bn": {
        "pronunciation": "সুবহানাল্লাহিল আজিম",
        "meaning": "মহান আল্লাহ পবিত্র ও সকল ত্রুটি থেকে মুক্ত।"
      },
      "en": {
        "pronunciation": "SubhanAllahil Azeem",
        "meaning": "Glory be to Allah, the Magnificent and Supreme."
      },
      "ur": {
        "pronunciation": "سبحان اللہ العظیم",
        "meaning": "عظمت والا اللہ ہر عیب سے پاک ہے۔"
      },
      "hi": {
        "pronunciation": "सुब्हानल्लाहिल अज़ीम",
        "meaning": "महान अल्लाह पवित्र और सभी दोषों से मुक्त है।"
      },
      "id": {
        "pronunciation": "Subhanallahil 'Azhim",
        "meaning": "Maha Suci Allah Yang Maha Agung lagi Maha Mulia."
      },
      "tr": {
        "pronunciation": "Sübhanallahil Azim",
        "meaning": "Pek yüce ve ulu olan Allah her türlü noksanlıktan münezzehtir."
      }
    }
  },
  {
    "id": "hasbiyallahu_la_ilaha_illa_huwa",
    "name": "Hasbiyallahu La Ilaha Illa Hu",
    "arabic": "حَسْبِيَ اللَّهُ لَا إِلٰهَ إِلَّا هُوَ",
    "pronunciationBn": "হাসবিয়াল্লাহু লা ইলাহা ইল্লা হু",
    "meaningBn": "আল্লাহই আমার জন্য যথেষ্ট; তিনি ছাড়া কোনো সত্য উপাস্য নেই।",
    "meaning": "আল্লাহই আমার জন্য যথেষ্ট; তিনি ছাড়া কোনো সত্য উপাস্য নেই।",
    "transliteration": "Hasbiyallahu La Ilaha Illa Hu",
    "count": 0,
    "target": 10,
    "fardTarget": 10,
    "maghribTarget": 50,
    "manualTarget": 200,
    "createdAt": 1700000000010,
    "updatedAt": 1700000000010,
    "color": "amber",
    "translations": {
      "bn": {
        "pronunciation": "হাসবিয়াল্লাহু লা ইলাহা ইল্লা হু",
        "meaning": "আল্লাহই আমার জন্য যথেষ্ট; তিনি ছাড়া কোনো সত্য উপাস্য নেই।"
      },
      "en": {
        "pronunciation": "Hasbiyallahu La Ilaha Illa Hu",
        "meaning": "Allah is sufficient for me; there is no deity worthy of worship except Him."
      },
      "ur": {
        "pronunciation": "حسبی اللہ لا الہ الا ہو",
        "meaning": "اللہ ہی میرے لیے کافی ہے، اس کے سوا کوئی معبود نہیں۔"
      },
      "hi": {
        "pronunciation": "हसबियल्लाहु ला इलाहा इल्ला हु",
        "meaning": "अल्लाह ही मेरे लिए काफी है; उसके सिवा कोई सच्चा पूज्य नहीं।"
      },
      "id": {
        "pronunciation": "Hasbiyallahu la ilaha illa Hu",
        "meaning": "Cukuplah Allah bagiku, tidak ada Tuhan selain Dia."
      },
      "tr": {
        "pronunciation": "Hasbiyallahü la ilahe illa hu",
        "meaning": "Allah bana yeter, O'ndan başka hiçbir ilah yoktur."
      }
    }
  },
  {
    "id": "dua_yunus",
    "name": "La Ilaha Illa Anta Subhanaka",
    "arabic": "لَا إِلٰهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ",
    "pronunciationBn": "লা ইলাহা ইল্লা আনতা সুবহানাকা",
    "meaningBn": "আপনি ছাড়া কোনো সত্য উপাস্য নেই। আপনি পবিত্র ও মহিমান্বিত। নিশ্চয়ই আমি জালিমদের অন্তর্ভুক্ত ছিলাম।",
    "meaning": "আপনি ছাড়া কোনো সত্য উপাস্য নেই। আপনি পবিত্র ও মহিমান্বিত। নিশ্চয়ই আমি জালিমদের অন্তর্ভুক্ত ছিলাম।",
    "transliteration": "La Ilaha Illa Anta Subhanaka",
    "count": 0,
    "target": 10,
    "fardTarget": 10,
    "maghribTarget": 50,
    "manualTarget": 200,
    "createdAt": 1700000000011,
    "updatedAt": 1700000000011,
    "color": "cyan",
    "translations": {
      "bn": {
        "pronunciation": "লা ইলাহা ইল্লা আনতা সুবহানাকা",
        "meaning": "আপনি ছাড়া কোনো সত্য উপাস্য নেই। আপনি পবিত্র ও মহিমান্বিত।"
      },
      "en": {
        "pronunciation": "La ilaha illa Anta subhanaka",
        "meaning": "There is no deity worthy of worship except You; exalted are You."
      },
      "ur": {
        "pronunciation": "لا الہ الا انت سبحانک",
        "meaning": "تیرے سوا کوئی معبود نہیں، تو پاک ہے۔"
      },
      "hi": {
        "pronunciation": "ला इलाहा इल्ला अन्ता सुब्हानका",
        "meaning": "तेरे सिवा कोई सच्चा पूज्य नहीं, तू पवित्र है।"
      },
      "id": {
        "pronunciation": "La ilaha illa Anta subhanaka",
        "meaning": "Tidak ada Tuhan selain Engkau, Maha Suci Engkau."
      },
      "tr": {
        "pronunciation": "La ilahe illa ente sübhaneke",
        "meaning": "Senden başka ilah yoktur. Seni tenzih ederim."
      }
    }
  },
  {
    "id": "lailaha_illallahu_wahdahu",
    "name": "La Ilaha Illallahu Wahdahu La Sharika Lahu",
    "arabic": "لَا إِلٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ",
    "pronunciationBn": "লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারিকা লাহু",
    "meaningBn": "আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই। তিনি একক, তাঁর কোনো শরিক নেই। রাজত্ব তাঁরই এবং সমস্ত প্রশংসাও তাঁরই। তিনি সবকিছুর ওপর ক্ষমতাবান।",
    "meaning": "আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই। তিনি একক, তাঁর কোনো শরিক নেই। রাজত্ব তাঁরই এবং সমস্ত প্রশংসাও তাঁরই। তিনি সবকিছুর ওপর ক্ষমতাবান।",
    "transliteration": "La Ilaha Illallahu Wahdahu La Sharika Lahu",
    "count": 0,
    "target": 1,
    "fardTarget": 1,
    "maghribTarget": 5,
    "manualTarget": 200,
    "createdAt": 1700000000012,
    "updatedAt": 1700000000012,
    "color": "emerald",
    "translations": {
      "bn": {
        "pronunciation": "লা ইলাহা ইল্লাল্লাহু ওয়াহদাহু লা শারিকা লাহু",
        "meaning": "আল্লাহ ছাড়া কোনো সত্য উপাস্য নেই। তিনি একক, তাঁর কোনো শরিক নেই।"
      },
      "en": {
        "pronunciation": "La ilaha illallahu wahdahu la sharika lahu",
        "meaning": "There is no deity except Allah alone, without partner."
      },
      "ur": {
        "pronunciation": "لا الہ الا اللہ وحدہ لا شریک لہ",
        "meaning": "اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے، اس کا کوئی شریک نہیں۔"
      },
      "hi": {
        "pronunciation": "ला इलाहा इल्लल्लाहु वह्दहू ला शरीका लहू",
        "meaning": "अल्लाह के सिवा कोई सच्चा पूज्य नहीं, वह अकेला है।"
      },
      "id": {
        "pronunciation": "La ilaha illallahu wahdahu la syarika lah",
        "meaning": "Tiada Tuhan selain Allah semata, tiada sekutu bagi-Nya."
      },
      "tr": {
        "pronunciation": "La ilahe illallahü vahdehu la şerike leh",
        "meaning": "Allah'tan başka ilah yoktur; O tektir, ortağı yoktur."
      }
    }
  },
  {
    "id": "allahumma_antas_salam",
    "name": "Allahumma Antas Salamu Wa Minkas Salam",
    "arabic": "اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالإِكْرَامِ",
    "pronunciationBn": "আল্লাহুম্মা আনতাস সালামু ওয়া মিনকাস সালাম",
    "meaningBn": "হে আল্লাহ! আপনিই শান্তি এবং আপনার থেকেই শান্তি আসে; আপনি বরকতময়, হে মর্যাদা ও সম্মানের অধিকারী।",
    "meaning": "হে আল্লাহ! আপনিই শান্তি এবং আপনার থেকেই শান্তি আসে; আপনি বরকতময়, হে মর্যাদা ও সম্মানের অধিকারী।",
    "transliteration": "Allahumma Antas Salamu Wa Minkas Salam",
    "count": 0,
    "target": 1,
    "fardTarget": 1,
    "maghribTarget": 5,
    "manualTarget": 50,
    "createdAt": 1700000000013,
    "updatedAt": 1700000000013,
    "color": "teal",
    "translations": {
      "bn": {
        "pronunciation": "আল্লাহুম্মা আনতাস সালামু ওয়া মিনকাস সালাম",
        "meaning": "হে আল্লাহ! আপনিই শান্তি এবং আপনার থেকেই শান্তি আসে।"
      },
      "en": {
        "pronunciation": "Allahumma Antas Salamu Wa Minkas Salam",
        "meaning": "O Allah, You are peace and from You is peace; Blessed are You, O Possessor of Glory and Honor."
      },
      "ur": {
        "pronunciation": "اللہم انت السلام ومنک السلام",
        "meaning": "اے اللہ! تو سلامتی والا ہے اور تجھی سے سلامتی ہے۔"
      },
      "hi": {
        "pronunciation": "अल्लाहुम्मा अन्तस सलामु व मिनकस सलाम",
        "meaning": "हे अल्लाह! तू ही शांति है और तुझसे ही शांति है।"
      },
      "id": {
        "pronunciation": "Allahumma antas salam wa minkas salam",
        "meaning": "Ya Allah, Engkau adalah sumber kedamaian dan dari-Mu lah datangnya kedamaian."
      },
      "tr": {
        "pronunciation": "Allahümme ente's-selamü ve minke's-selam",
        "meaning": "Allahım! Sen esenliksin ve selamet sendendir."
      }
    }
  },
  {
    "id": "allahumma_ainni_ala_zikrika",
    "name": "Allahumma A'inni Ala Zikrika Wa Shukrika",
    "arabic": "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ",
    "pronunciationBn": "আল্লাহুম্মা আ'ইন্নি আলা জিকরিকা ওয়া শুকরিকা ওয়া হুসনি ইবাদাতিক",
    "meaningBn": "হে আল্লাহ! আমাকে আপনার জিকির, কৃতজ্ঞতা প্রকাশ এবং সুন্দরভাবে ইবাদত করার তওফিক দান করুন।",
    "meaning": "হে আল্লাহ! আমাকে আপনার জিকির, কৃতজ্ঞতা প্রকাশ এবং সুন্দরভাবে ইবাদত করার তওফিক দান করুন।",
    "transliteration": "Allahumma A'inni Ala Zikrika Wa Shukrika",
    "count": 0,
    "target": 1,
    "fardTarget": 1,
    "maghribTarget": 5,
    "manualTarget": 50,
    "createdAt": 1700000000014,
    "updatedAt": 1700000000014,
    "color": "amber",
    "translations": {
      "bn": {
        "pronunciation": "আল্লাহুম্মা আ'ইন্নি আলা জিকরিকা ওয়া শুকরিকা",
        "meaning": "হে আল্লাহ! আমাকে আপনার জিকির ও কৃতজ্ঞতার তওফিক দিন।"
      },
      "en": {
        "pronunciation": "Allahumma A'inni Ala Zikrika Wa Shukrika",
        "meaning": "O Allah, help me remember You, express gratitude to You, and worship You in the best manner."
      },
      "ur": {
        "pronunciation": "اللہم اعنی علی ذکرک وشکرک وحسن عبادتک",
        "meaning": "اے اللہ! اپنے ذکر، شکر اور بہترین عبادت کے لیے میری مدد فرما۔"
      },
      "hi": {
        "pronunciation": "अल्लाहुम्मा अइन्नी अला ज़िक्रिका व शुक्रिका",
        "meaning": "हे अल्लाह! अपने स्मरण, आभार और उत्तम इबादत के लिए मेरी सहायता कर।"
      },
      "id": {
        "pronunciation": "Allahumma a'inni 'ala dzikrika wa syukrika",
        "meaning": "Ya Allah, tolonglah aku untuk mengingat-Mu, bersyukur kepada-Mu, dan beribadah dengan baik."
      },
      "tr": {
        "pronunciation": "Allahümme e'inni ala zikrike ve şükrike",
        "meaning": "Allahım! Seni zikretmek, Sana şükretmek ve Sana güzelce ibadet etmek için bana yardım et."
      }
    }
  },
  {
    "id": "allahumma_la_mania_lima_atayta",
    "name": "Allahumma La Mani'a Lima A'tayta",
    "arabic": "اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ",
    "pronunciationBn": "আল্লাহুম্মা লা মানি'আ লিমা আ'তাইতা, ওয়া লা মু'তিয়া লিমা মানা'তা",
    "meaningBn": "হে আল্লাহ! আপনি যা দান করেন তা রোধ করার কেউ নেই, আর আপনি যা রোধ করেন তা দান করার কেউ নেই।",
    "meaning": "হে আল্লাহ! আপনি যা দান করেন তা রোধ করার কেউ নেই, আর আপনি যা রোধ করেন তা দান করার কেউ নেই।",
    "transliteration": "Allahumma La Mani'a Lima A'tayta",
    "count": 0,
    "target": 1,
    "fardTarget": 1,
    "maghribTarget": 5,
    "manualTarget": 50,
    "createdAt": 1700000000015,
    "updatedAt": 1700000000015,
    "color": "cyan",
    "translations": {
      "bn": {
        "pronunciation": "আল্লাহুম্মা লা মানি'আ লিমা আ'তাইতা",
        "meaning": "হে আল্লাহ! আপনি যা দেন তা রোধ করার কেউ নেই।"
      },
      "en": {
        "pronunciation": "Allahumma La Mani'a Lima A'tayta",
        "meaning": "O Allah, none can withhold what You give, and none can give what You withhold."
      },
      "ur": {
        "pronunciation": "اللہم لا مانع لما اعطیت ولا معطی لما منعت",
        "meaning": "اے اللہ! جسے تو دے اسے کوئی روکنے والا نہیں، اور جسے تو روک لے اسے کوئی دینے والا نہیں۔"
      },
      "hi": {
        "pronunciation": "अल्लाहुम्मा ला मानिआ लिमा अतयता",
        "meaning": "हे अल्लाह! जिसे तू दे उसे कोई रोक नहीं सकता और जिसे तू रोक ले उसे कोई दे नहीं सकता।"
      },
      "id": {
        "pronunciation": "Allahumma la mani'a lima a'thaita",
        "meaning": "Ya Allah, tidak ada yang dapat menghalangi apa yang Engkau beri, dan tiada yang dapat memberi apa yang Engkau cegah."
      },
      "tr": {
        "pronunciation": "Allahümme la mania lima a'tayte",
        "meaning": "Allahım! Senin verdiğine engel olacak, engellediğini de verecek kimse yoktur."
      }
    }
  },
  {
    "id": "ayatul_kursi",
    "name": "Ayatul Kursi",
    "arabic": "اللَّهُ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ...",
    "pronunciationBn": "আয়াতুল কুরসি",
    "meaningBn": "আল্লাহ! তিনি ছাড়া কোনো সত্য উপাস্য নেই, তিনি চিরঞ্জীব ও সবকিছুর ধারক। (সূরা বাকারা: ২৫৫)",
    "meaning": "আল্লাহ! তিনি ছাড়া কোনো সত্য উপাস্য নেই, তিনি চিরঞ্জীব ও সবকিছুর ধারক। (সূরা বাকারা: ২৫৫)",
    "transliteration": "Ayat al-Kursi",
    "count": 0,
    "target": 1,
    "fardTarget": 1,
    "maghribTarget": 5,
    "manualTarget": 50,
    "createdAt": 1700000000016,
    "updatedAt": 1700000000016,
    "color": "emerald",
    "translations": {
      "bn": {
        "pronunciation": "আয়াতুল কুরসি",
        "meaning": "আল্লাহ! তিনি ছাড়া কোনো সত্য উপাস্য নেই, তিনি চিরঞ্জীব ও সবকিছুর ধারক।"
      },
      "en": {
        "pronunciation": "Ayat al-Kursi",
        "meaning": "Allah! There is no deity except Him, the Ever-Living, the Sustainer of all existence."
      },
      "ur": {
        "pronunciation": "آیۃ الکرسی",
        "meaning": "اللہ! اس کے سوا کوئی معبود نہیں، وہ زندہ ہے سب کا تھامنے والا۔"
      },
      "hi": {
        "pronunciation": "आयतल कुर्सी",
        "meaning": "अल्लाह! उसके सिवा कोई सच्चा पूज्य नहीं, वह हमेशा जीवित रहने वाला और सबका संरक्षक है।"
      },
      "id": {
        "pronunciation": "Ayat Kursi",
        "meaning": "Allah, tidak ada Tuhan selain Dia Yang Maha Hidup, Yang terus-menerus mengurus makhluk-Nya."
      },
      "tr": {
        "pronunciation": "Ayetel Kürsi",
        "meaning": "Allah, O'ndan başka ilah yoktur; diridir, her şeyin varlığı O'na bağlıdır."
      }
    }
  },
  {
    "id": "allahumma_as_alukal_huda",
    "name": "Allahumma Inni As'alukal Huda",
    "arabic": "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْهُدَى وَالتُّقَى وَالْعَفَافَ وَالْغِنَى",
    "pronunciationBn": "আল্লাহুম্মা ইন্নি আসআলুকাল হুদা ওয়াত-তুকা ওয়াল-আফাফা ওয়াল-গিনা",
    "meaningBn": "হে আল্লাহ! আমি আপনার কাছে হেদায়েত, তাকওয়া, চারিত্রিক পবিত্রতা এবং অন্তরের সচ্ছলতা প্রার্থনা করছি।",
    "meaning": "হে আল্লাহ! আমি আপনার কাছে হেদায়েত, তাকওয়া, চারিত্রিক পবিত্রতা এবং অন্তরের সচ্ছলতা প্রার্থনা করছি।",
    "transliteration": "Allahumma Inni As'alukal Huda Wat-Tuqa",
    "count": 0,
    "target": 10,
    "fardTarget": 10,
    "maghribTarget": 50,
    "manualTarget": 50,
    "createdAt": 1700000000017,
    "updatedAt": 1700000000017,
    "color": "teal",
    "translations": {
      "bn": {
        "pronunciation": "আল্লাহুম্মা ইন্নি আসআলুকাল হুদা ওয়াত-তুকা",
        "meaning": "হে আল্লাহ! আমি আপনার কাছে হেদায়েত, তাকওয়া ও পবিত্রতা চাই।"
      },
      "en": {
        "pronunciation": "Allahumma Inni As'alukal Huda",
        "meaning": "O Allah, I ask You for guidance, piety, chastity, and self-sufficiency."
      },
      "ur": {
        "pronunciation": "اللہم انی اسالک الہدی والتقی والعفاف والغنی",
        "meaning": "اے اللہ! میں تجھ سے ہدایت، پرہیزگاری، پاکدامنی اور بے نیازی مانگتا ہوں۔"
      },
      "hi": {
        "pronunciation": "अल्लाहुम्मा इन्नी असअलुकल हुदा",
        "meaning": "हे अल्लाह! मैं तुझसे मार्गदर्शन, धर्मपरायणता, पवित्रता और संपन्नता मांगता हूँ।"
      },
      "id": {
        "pronunciation": "Allahumma inni as'alukal huda",
        "meaning": "Ya Allah, sesungguhnya aku memohon petunjuk, ketakwaan, kesucian diri, dan kecukupan."
      },
      "tr": {
        "pronunciation": "Allahümme inni es'elüke'l-hüda",
        "meaning": "Allahım! Senden hidayet, takva, iffet ve gönül zenginliği diliyorum."
      }
    }
  },
  {
    "id": "allahummakfini_bihalalika",
    "name": "Allahummakfini Bihalalika An Haramika",
    "arabic": "اللَّهُمَّ اكْفِنِي بِحَلَالِكَ عَنْ حَرَامِكَ وَأَغْنِنِي بِفَضْلِكَ عَمَّنْ سِوَاكَ",
    "pronunciationBn": "আল্লাহুম্মাকফিনি বিহালালিকা আন হারামিক",
    "meaningBn": "হে আল্লাহ! হারামের পরিবর্তে হালাল দিয়ে আমাকে সন্তুষ্ট রাখুন এবং আপনার অনুগ্রহে আপনি ছাড়া অন্য সবার থেকে অমুখাপেক্ষী করুন।",
    "meaning": "হে আল্লাহ! হারামের পরিবর্তে হালাল দিয়ে আমাকে সন্তুষ্ট রাখুন এবং আপনার অনুগ্রহে আপনি ছাড়া অন্য সবার থেকে অমুখাপেক্ষী করুন।",
    "transliteration": "Allahummakfini Bihalalika An Haramika",
    "count": 0,
    "target": 10,
    "fardTarget": 10,
    "maghribTarget": 50,
    "manualTarget": 50,
    "createdAt": 1700000000018,
    "updatedAt": 1700000000018,
    "color": "amber",
    "translations": {
      "bn": {
        "pronunciation": "আল্লাহুম্মাকফিনি বিহালালিকা আন হারামিক",
        "meaning": "হে আল্লাহ! হারামের পরিবর্তে হালাল দিয়ে আমাকে যথেষ্ট করুন।"
      },
      "en": {
        "pronunciation": "Allahummakfini Bihalalika An Haramika",
        "meaning": "O Allah, suffice me with Your lawful against Your unlawful, and enrich me with Your bounty above all others."
      },
      "ur": {
        "pronunciation": "اللہم اکفنی بحلالک عن حرامک",
        "meaning": "اے اللہ! مجھے اپنے حلال کے ذریعے حرام سے بے پرواہ کر دے اور اپنے فضل سے دوسروں سے بے نیاز کر دے۔"
      },
      "hi": {
        "pronunciation": "अल्लाहुम्मकफिनी बिहलालिका अन हरामिक",
        "meaning": "हे अल्लाह! मुझे अपने हलाल के साथ हराम से बचा और अपने अनुग्रह से दूसरों से बेनियाज़ कर दे।"
      },
      "id": {
        "pronunciation": "Allahummakfini bihalalika 'an haramik",
        "meaning": "Ya Allah, cukupkanlah aku dengan yang halal dari-Mu sehingga terhindar dari yang haram."
      },
      "tr": {
        "pronunciation": "Allahümmekfini bi-helalike an haramik",
        "meaning": "Allahım! Helalinden vererek beni haramdan koru, lütfunla beni başkasına muhtaç etme."
      }
    }
  },
  {
    "id": "astaghfirullahallazi_la_ilaha",
    "name": "Astaghfirullahallazi La Ilaha Illa Hu",
    "arabic": "أَسْتَغْفِرُ اللَّهَ الَّذِي لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ وَأَتُوبُ إِلَيْهِ",
    "pronunciationBn": "আস্তাগফিরুল্লাহাল্লাজি লা ইলাহা ইল্লা হু",
    "meaningBn": "আমি ক্ষমা চাই সেই আল্লাহর কাছে যিনি ছাড়া কোনো উপাস্য নেই, তিনি চিরঞ্জীব ও সবকিছুর ধারক এবং তাঁরই কাছে তওবা করছি।",
    "meaning": "আমি ক্ষমা চাই সেই আল্লাহর কাছে যিনি ছাড়া কোনো উপাস্য নেই, তিনি চিরঞ্জীব ও সবকিছুর ধারক এবং তাঁরই কাছে তওবা করছি।",
    "transliteration": "Astaghfirullahallazi La Ilaha Illa Huwal Hayyul Qayyum",
    "count": 0,
    "target": 10,
    "fardTarget": 10,
    "maghribTarget": 50,
    "manualTarget": 50,
    "createdAt": 1700000000019,
    "updatedAt": 1700000000019,
    "color": "cyan",
    "translations": {
      "bn": {
        "pronunciation": "আস্তাগফিরুল্লাহাল্লাজি লা ইলাহা ইল্লা হু",
        "meaning": "আমি আল্লাহর কাছে ক্ষমা চাই এবং তাঁর কাছে তওবা করি।"
      },
      "en": {
        "pronunciation": "Astaghfirullahallazi La Ilaha Illa Hu",
        "meaning": "I seek the forgiveness of Allah, there is no deity except Him, the Ever-Living, the Sustainer, and I repent to Him."
      },
      "ur": {
        "pronunciation": "استغفر اللہ الذی لا الہ الا ہو الحی القیوم",
        "meaning": "میں اس اللہ سے معافی مانگتا ہوں جس کے سوا کوئی معبود نہیں، وہ زندہ ہے سب کا تھامنے والا اور میں اس کی طرف رجوع کرتا ہوں۔"
      },
      "hi": {
        "pronunciation": "अस्ताग़फ़िरुल्लाहल्लज़ी ला इलाहा इल्ला हु",
        "meaning": "मैं उस अल्लाह से क्षमा मांगता हूँ जिसके सिवा कोई सच्चा पूज्य नहीं और उसी से तौबा करता हूँ।"
      },
      "id": {
        "pronunciation": "Astaghfirullahalladzi la ilaha illa Huwa",
        "meaning": "Aku memohon ampun kepada Allah yang tiada Tuhan selain Dia, Yang Maha Hidup lagi terus menerus mengurus makhluk-Nya."
      },
      "tr": {
        "pronunciation": "Estağfirullah ellezi la ilahe illa hüvel hayyül kayyum",
        "meaning": "Kendisinden başka ilah olmayan, Hayy ve Kayyum olan Allah'tan bağışlanma diler, O'na tevbe ederim."
      }
    }
  },
  {
    "id": "sayyidul_istighfar",
    "name": "Sayyidul Istighfar",
    "arabic": "اللَّهُمَّ أَنْتَ رَبِّي لَا إِلٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَىٰ عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ...",
    "pronunciationBn": "সাইয়্যিদুল ইস্তিগফার",
    "meaningBn": "হে আল্লাহ! আপনিই আমার রব। আপনি ছাড়া কোনো উপাস্য নেই। আপনি আমাকে সৃষ্টি করেছেন এবং আমি আপনারই বান্দা... (ক্ষমার শ্রেষ্ঠ দোয়া)",
    "meaning": "হে আল্লাহ! আপনিই আমার রব। আপনি ছাড়া কোনো উপাস্য নেই। আপনি আমাকে সৃষ্টি করেছেন এবং আমি আপনারই বান্দা... (ক্ষমার শ্রেষ্ঠ দোয়া)",
    "transliteration": "Sayyidul Istighfar",
    "count": 0,
    "target": 1,
    "fardTarget": 1,
    "maghribTarget": 5,
    "manualTarget": 50,
    "createdAt": 1700000000020,
    "updatedAt": 1700000000020,
    "color": "emerald",
    "translations": {
      "bn": {
        "pronunciation": "সাইয়্যিদুল ইস্তিগফার",
        "meaning": "হে আল্লাহ! আপনিই আমার রব, ক্ষমা প্রার্থনার সর্বশ্রেষ্ঠ দোয়া।"
      },
      "en": {
        "pronunciation": "Sayyidul Istighfar",
        "meaning": "O Allah, You are my Lord, none has the right to be worshipped but You. You created me and I am Your slave (The Chief of Forgiveness)."
      },
      "ur": {
        "pronunciation": "سید الاستغفار",
        "meaning": "اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں۔"
      },
      "hi": {
        "pronunciation": "सैय्यिदुल इस्तिग़फ़ार",
        "meaning": "हे अल्लाह! तू ही मेरा रब है, तेरे सिवा कोई सच्चा पूज्य नहीं, तूने मुझे पैदा किया।"
      },
      "id": {
        "pronunciation": "Sayyidul Istighfar",
        "meaning": "Ya Allah, Engkau adalah Tuhanku, tiada Tuhan selain Engkau, Engkau telah menciptakanku."
      },
      "tr": {
        "pronunciation": "Seyyidül İstiğfar",
        "meaning": "Allahım! Sen benim Rabbimsin, Senden başka ilah yoktur. Beni Sen yarattın ve ben Senin kulunum."
      }
    }
  },
  {
    "id": "raditu_billahi_rabban",
    "name": "Raditu Billahi Rabban Wa Bil-Islami Deena",
    "arabic": "رَضِيتُ بِاللَّهِ رَبًّا، وَبِالإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ ﷺ نَبِيًّا",
    "pronunciationBn": "রাদীতু বিল্লাহি রব্বান, ওয়া বিল-ইসলামি দ্বীনা",
    "meaningBn": "আমি সন্তুষ্টচিত্তে আল্লাহকে রব, ইসলামকে দ্বীন এবং মুহাম্মদ ﷺ-কে নবী হিসেবে গ্রহণ করেছি।",
    "meaning": "আমি সন্তুষ্টচিত্তে আল্লাহকে রব, ইসলামকে দ্বীন এবং মুহাম্মদ ﷺ-কে নবী হিসেবে গ্রহণ করেছি।",
    "transliteration": "Raditu Billahi Rabban Wa Bil-Islami Deena",
    "count": 0,
    "target": 1,
    "fardTarget": 1,
    "maghribTarget": 5,
    "manualTarget": 50,
    "createdAt": 1700000000021,
    "updatedAt": 1700000000021,
    "color": "teal",
    "translations": {
      "bn": {
        "pronunciation": "রাদীতু বিল্লাহি রব্বান, ওয়া বিল-ইসলামি দ্বীনা",
        "meaning": "আমি আল্লাহকে রব ও ইসলামকে দ্বীন হিসেবে গ্রহণ করে সন্তুষ্ট।"
      },
      "en": {
        "pronunciation": "Raditu Billahi Rabban Wa Bil-Islami Deena",
        "meaning": "I am pleased with Allah as my Lord, Islam as my religion, and Muhammad (ﷺ) as my Prophet."
      },
      "ur": {
        "pronunciation": "رضیت باللہ ربا وبالاسلام دینا",
        "meaning": "میں اللہ کے رب ہونے، اسلام کے دین ہونے اور محمد ﷺ کے نبی ہونے پر راضی ہوا۔"
      },
      "hi": {
        "pronunciation": "रदीतु बिल्लाहि रब्बन व बिल-इस्लामी दीना",
        "meaning": "मैं अल्लाह के रब, इस्लाम के धर्म और मुहम्मद (ﷺ) के नबी होने पर संतुष्ट हूँ।"
      },
      "id": {
        "pronunciation": "Radhitu billahi rabba wa bil islami dina",
        "meaning": "Aku ridha Allah sebagai Tuhanku, Islam sebagai agamaku, dan Muhammad sebagai Nabiku."
      },
      "tr": {
        "pronunciation": "Radıytü billahi rabben ve bi'l-İslami dinen",
        "meaning": "Rab olarak Allah'tan, din olarak İslam'dan ve peygamber olarak Muhammed'den (s.a.v.) razı oldum."
      }
    }
  },
  {
    "id": "auzu_bikalimatillahit_tammati",
    "name": "A'uzu Bikalimatillahit-Tammati",
    "arabic": "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ",
    "pronunciationBn": "আউযু বিকালিমাাতিল্লাহিত-তাম্মাতি",
    "meaningBn": "আমি আল্লাহর নিখুঁত ও পরিপূর্ণ কালিমার আশ্রয়ে তাঁর সকল সৃষ্টির অনিষ্ট থেকে আশ্রয় প্রার্থনা করছি।",
    "meaning": "আমি আল্লাহর নিখুঁত ও পরিপূর্ণ কালিমার আশ্রয়ে তাঁর সকল সৃষ্টির অনিষ্ট থেকে আশ্রয় প্রার্থনা করছি।",
    "transliteration": "A'uzu Bikalimatillahit-Tammati Min Sharri Ma Khalaq",
    "count": 0,
    "target": 10,
    "fardTarget": 10,
    "maghribTarget": 50,
    "manualTarget": 50,
    "createdAt": 1700000000022,
    "updatedAt": 1700000000022,
    "color": "amber",
    "translations": {
      "bn": {
        "pronunciation": "আউযু বিকালিমাাতিল্লাহিত-তাম্মাতি",
        "meaning": "আমি আল্লাহর পরিপূর্ণ বাণীর আশ্রয়ে সকল সৃষ্টির অনিষ্ট থেকে আশ্রয় চাই।"
      },
      "en": {
        "pronunciation": "A'uzu Bikalimatillahit-Tammati",
        "meaning": "I seek refuge in the perfect words of Allah from the evil of what He has created."
      },
      "ur": {
        "pronunciation": "اعوذ بکلمات اللہ التامات من شر ما خلق",
        "meaning": "میں اللہ کے مکمل کلمات کے ذریعے اس کی پیدا کردہ تمام مخلوقات کے شر سے پناہ مانگتا ہوں۔"
      },
      "hi": {
        "pronunciation": "अऊज़ु बिकलिमातिल्लाहित-ताम्माति",
        "meaning": "मैं अल्लाह के संपूर्ण शब्दों की शरण में उसकी बनाई हुई हर चीज़ की बुराई से पनाह मांगता हूँ।"
      },
      "id": {
        "pronunciation": "A'udzu bikalimatillahit tammati",
        "meaning": "Aku berlindung dengan kalimat-kalimat Allah yang sempurna dari kejahatan makhluk yang diciptakan-Nya."
      },
      "tr": {
        "pronunciation": "Euzü bikelimatillahit-tammati",
        "meaning": "Yarattığı şeylerin şerrinden Allah'ın tastamam kelimelerine sığınırım."
      }
    }
  },
  {
    "id": "subhanallahi_adada_khalqihi",
    "name": "Subhanallahi Wa Bihamdihi Adada Khalqihi",
    "arabic": "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، عَدَدَ خَلْقِهِ، وَرِضَا نَفْسِهِ، وَزِنَةَ عَرْشِهِ، وَمِدَادَ كَلِمَاتِهِ",
    "pronunciationBn": "সুবহানাল্লাহি ওয়া বিহামদিহি আদাদা খালকিহি",
    "meaningBn": "আল্লাহর পবিত্রতা ও প্রশংসা তাঁর সৃষ্টির সংখ্যা পরিমাণ, তাঁর সন্তুষ্টি পরিমাণ, তাঁর আরশের ওজন পরিমাণ ও তাঁর বাণীর লেখার কালি পরিমাণ।",
    "meaning": "আল্লাহর পবিত্রতা ও প্রশংসা তাঁর সৃষ্টির সংখ্যা পরিমাণ, তাঁর সন্তুষ্টি পরিমাণ, তাঁর আরশের ওজন পরিমাণ ও তাঁর বাণীর লেখার কালি পরিমাণ।",
    "transliteration": "Subhanallahi Wa Bihamdihi Adada Khalqihi",
    "count": 0,
    "target": 10,
    "fardTarget": 10,
    "maghribTarget": 50,
    "manualTarget": 50,
    "createdAt": 1700000000023,
    "updatedAt": 1700000000023,
    "color": "cyan",
    "translations": {
      "bn": {
        "pronunciation": "সুবহানাল্লাহি ওয়া বিহামদিহি আদাদা খালকিহি",
        "meaning": "আল্লাহর সৃষ্টির সংখ্যা পরিমাণ তাঁর পবিত্রতা ও প্রশংসা।"
      },
      "en": {
        "pronunciation": "Subhanallahi Wa Bihamdihi Adada Khalqihi",
        "meaning": "Glory and praise be to Allah as many times as the number of His creation, in accordance with His pleasure, the weight of His Throne, and the ink of His words."
      },
      "ur": {
        "pronunciation": "سبحان اللہ وبحمدہ عدد خلقہ",
        "meaning": "اللہ اپنی حمد کے ساتھ پاک ہے، اس کی مخلوق کی تعداد، اس کی خوشنودی، اس کے عرش کے وزن اور اس کے کلمات کی سیاہی کے برابر۔"
      },
      "hi": {
        "pronunciation": "सुब्हानल्लाहि व बिहम्दिही अददा ख़ल्क़िही",
        "meaning": "अल्लाह अपनी प्रशंसा के साथ पवित्र है, उसकी रचना की संख्या के बराबर।"
      },
      "id": {
        "pronunciation": "Subhanallahi wa bihamdihi 'adada khalqihi",
        "meaning": "Maha Suci Allah dan segala puji bagi-Nya sebanyak bilangan makhluk-Nya, seridha diri-Nya, seberat timbangan 'Arsy-Nya, dan sebanyak tinta kalimat-kalimat-Nya."
      },
      "tr": {
        "pronunciation": "Sübhanallahi ve bihamdihi adede halkıhi",
        "meaning": "Yarattıklarının sayısınca, Zatının rızasınca, Arşının ağırlığınca ve kelimelerinin mürekkebince Allah'ı hamd ile tesbih ederim."
      }
    }
  }
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
    arabic: 'اللَّهُ لَا إِلٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ',
    transliteration: 'Allāhu lā ilāha illā huwal-ḥayyul-qayyūm',
    meaning: 'The Throne Verse recitation counter',
    target: 7,
  },
];
