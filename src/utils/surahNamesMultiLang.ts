import { ZikrLanguage } from '../types';

export interface SurahMultiLangInfo {
  number: number;
  nameBn: string;
  nameEn: string;
  nameAr: string;
  meaningBn: string;
  meaningEn: string;
  meaningAr: string;
}

export const SURAH_NAMES_ALL_114: Record<number, SurahMultiLangInfo> = {
  1: { number: 1, nameBn: 'আল-ফাতিহা', nameEn: 'Al-Faatiha', nameAr: 'الفاتحة', meaningBn: 'সূচনা ও ভূমিকা', meaningEn: 'The Opening', meaningAr: 'فاتحة الكتاب' },
  2: { number: 2, nameBn: 'আল-বাক্বারাহ', nameEn: 'Al-Baqarah', nameAr: 'البقرة', meaningBn: 'গাভী', meaningEn: 'The Cow', meaningAr: 'البقرة' },
  3: { number: 3, nameBn: 'আলে-ইমরান', nameEn: 'Aal-e-Imran', nameAr: 'آل عمران', meaningBn: 'ইমরানের পরিবার', meaningEn: 'The Family of Imran', meaningAr: 'آل عمران' },
  4: { number: 4, nameBn: 'আন-নিসা', nameEn: 'An-Nisaa', nameAr: 'النساء', meaningBn: 'নারীগণ', meaningEn: 'The Women', meaningAr: 'النساء' },
  5: { number: 5, nameBn: 'আল-মায়েদাহ', nameEn: 'Al-Maaida', nameAr: 'المائدة', meaningBn: 'খাদ্য পরিবেশিত টেবিল', meaningEn: 'The Table Spread', meaningAr: 'المائدة' },
  6: { number: 6, nameBn: 'আল-আন\'আম', nameEn: 'Al-An\'aam', nameAr: 'الأنعام', meaningBn: 'গৃহপালিত পশু', meaningEn: 'The Cattle', meaningAr: 'الأنعام' },
  7: { number: 7, nameBn: 'আল-আ\'রাফ', nameEn: 'Al-A\'raaf', nameAr: 'الأعراف', meaningBn: 'উচ্চস্থানসমূহ', meaningEn: 'The Heights', meaningAr: 'الأعراف' },
  8: { number: 8, nameBn: 'আল-আনফাল', nameEn: 'Al-Anfaal', nameAr: 'الأنفال', meaningBn: 'যুদ্ধলব্ধ সম্পদ', meaningEn: 'The Spoils of War', meaningAr: 'الأنفال' },
  9: { number: 9, nameBn: 'আত-তাওবাহ', nameEn: 'At-Tawbah', nameAr: 'التوبة', meaningBn: 'অনুশোচনা ও তওবা', meaningEn: 'The Repentance', meaningAr: 'التوبة' },
  10: { number: 10, nameBn: 'ইউনুস', nameEn: 'Yunus', nameAr: 'يونس', meaningBn: 'নবী ইউনুস (আ.)', meaningEn: 'Jonah', meaningAr: 'النبي يونس' },
  11: { number: 11, nameBn: 'হূদ', nameEn: 'Hud', nameAr: 'هود', meaningBn: 'নবী হূদ (আ.)', meaningEn: 'Hud', meaningAr: 'النبي هود' },
  12: { number: 12, nameBn: 'ইউসুফ', nameEn: 'Yusuf', nameAr: 'يوسف', meaningBn: 'নবী ইউসুফ (আ.)', meaningEn: 'Joseph', meaningAr: 'النبي يوسف' },
  13: { number: 13, nameBn: 'আর-রা\'দ', nameEn: 'Ar-Ra\'d', nameAr: 'الرعد', meaningBn: 'বজ্রপাত ও মেঘের গর্জন', meaningEn: 'The Thunder', meaningAr: 'الرعد' },
  14: { number: 14, nameBn: 'ইব্রাহীম', nameEn: 'Ibrahim', nameAr: 'إبراهيم', meaningBn: 'নবী ইব্রাহীম (আ.)', meaningEn: 'Abraham', meaningAr: 'النبي إبراهيم' },
  15: { number: 15, nameBn: 'আল-হিজর', nameEn: 'Al-Hijr', nameAr: 'الحجر', meaningBn: 'পাথুরে পাহাড় ও উপত্যকা', meaningEn: 'The Rocky Tract', meaningAr: 'الحجر' },
  16: { number: 16, nameBn: 'আন-নাহল', nameEn: 'An-Nahl', nameAr: 'النحل', meaningBn: 'মৌমাছি', meaningEn: 'The Bee', meaningAr: 'النحل' },
  17: { number: 17, nameBn: 'আল-ইসরা', nameEn: 'Al-Israa', nameAr: 'الإسراء', meaningBn: 'নৈশ ভ্রমণ (বনি ইসরাঈল)', meaningEn: 'The Night Journey', meaningAr: 'الإسراء' },
  18: { number: 18, nameBn: 'আল-কাহফ', nameEn: 'Al-Kahf', nameAr: 'الكهف', meaningBn: 'গুহা', meaningEn: 'The Cave', meaningAr: 'الكهف' },
  19: { number: 19, nameBn: 'মারইয়াম', nameEn: 'Maryam', nameAr: 'مريم', meaningBn: 'মারইয়াম (আ.)', meaningEn: 'Mary', meaningAr: 'مريم' },
  20: { number: 20, nameBn: 'ত্বা-হা', nameEn: 'Taa-Haa', nameAr: 'طه', meaningBn: 'ত্বা-হা', meaningEn: 'Taa-Haa', meaningAr: 'طه' },
  21: { number: 21, nameBn: 'আল-আম্বিয়া', nameEn: 'Al-Anbiyaa', nameAr: 'الأنبياء', meaningBn: 'নবীগণ', meaningEn: 'The Prophets', meaningAr: 'الأنبياء' },
  22: { number: 22, nameBn: 'আল-হাজ্জ', nameEn: 'Al-Hajj', nameAr: 'الحج', meaningBn: 'হজ্জ বা তীর্থযাত্রা', meaningEn: 'The Pilgrimage', meaningAr: 'الحج' },
  23: { number: 23, nameBn: 'আল-মুমিনুন', nameEn: 'Al-Muminoon', nameAr: 'المؤمنون', meaningBn: 'মুমিন বিশ্বাসীগণ', meaningEn: 'The Believers', meaningAr: 'المؤمنون' },
  24: { number: 24, nameBn: 'আন-নূর', nameEn: 'An-Noor', nameAr: 'النور', meaningBn: 'জ্যোতি ও আলো', meaningEn: 'The Light', meaningAr: 'النور' },
  25: { number: 25, nameBn: 'আল-ফুরকান', nameEn: 'Al-Furqaan', nameAr: 'الفرقان', meaningBn: 'সত্য-মিথ্যার মাপকাঠি', meaningEn: 'The Criterion', meaningAr: 'الفرقان' },
  26: { number: 26, nameBn: 'আশ-শু\'আরা', nameEn: 'Ash-Shu\'araa', nameAr: 'الشعراء', meaningBn: 'কবি সম্প্রদায়', meaningEn: 'The Poets', meaningAr: 'الشعراء' },
  27: { number: 27, nameBn: 'আন-নামল', nameEn: 'An-Naml', nameAr: 'النمل', meaningBn: 'পিঁপড়া', meaningEn: 'The Ant', meaningAr: 'النمل' },
  28: { number: 28, nameBn: 'আল-ক্বাসাস', nameEn: 'Al-Qasas', nameAr: 'القصص', meaningBn: 'ঘটনাবলী ও কাহিনী', meaningEn: 'The Stories', meaningAr: 'القصص' },
  29: { number: 29, nameBn: 'আল-আনকাবুত', nameEn: 'Al-Ankaboot', nameAr: 'العنكبوت', meaningBn: 'মাকড়সা', meaningEn: 'The Spider', meaningAr: 'العنكبوت' },
  30: { number: 30, nameBn: 'আর-রূম', nameEn: 'Ar-Room', nameAr: 'الروم', meaningBn: 'রোমান জাতি', meaningEn: 'The Romans', meaningAr: 'الروم' },
  31: { number: 31, nameBn: 'লুকমান', nameEn: 'Luqman', nameAr: 'لقمان', meaningBn: 'জ্ঞানী লুকমান', meaningEn: 'Luqman', meaningAr: 'لقمان الحكيم' },
  32: { number: 32, nameBn: 'আস-সাজদাহ', nameEn: 'As-Sajda', nameAr: 'السجدة', meaningBn: 'সিজদাহ ও প্রণতি', meaningEn: 'The Prostration', meaningAr: 'السجدة' },
  33: { number: 33, nameBn: 'আল-আহযাব', nameEn: 'Al-Ahzaab', nameAr: 'الأحزاب', meaningBn: 'সম্মিলিত বাহিনী', meaningEn: 'The Combined Forces', meaningAr: 'الأحزاب' },
  34: { number: 34, nameBn: 'সাবা', nameEn: 'Saba', nameAr: 'سبأ', meaningBn: 'সাবা সম্প্রদায়', meaningEn: 'Sheba', meaningAr: 'مملكة سبأ' },
  35: { number: 35, nameBn: 'ফাতির', nameEn: 'Faatir', nameAr: 'فاطر', meaningBn: 'আদি সৃষ্টিকর্তা', meaningEn: 'The Originator', meaningAr: 'فاطر السماوات' },
  36: { number: 36, nameBn: 'ইয়াসীন', nameEn: 'Yaseen', nameAr: 'يس', meaningBn: 'কুরআনের হৃৎপিণ্ড', meaningEn: 'Yaseen', meaningAr: 'قلب القرآن' },
  37: { number: 37, nameBn: 'আস-সাফফাত', nameEn: 'As-Saaffaat', nameAr: 'الصافات', meaningBn: 'সারিবদ্ধ ফেরেশতাদল', meaningEn: 'Those Who Set The Ranks', meaningAr: 'الصافات' },
  38: { number: 38, nameBn: 'সোয়াদ', nameEn: 'Saad', nameAr: 'ص', meaningBn: 'সোয়াদ বর্ণ', meaningEn: 'The Letter Saad', meaningAr: 'حرف صاد' },
  39: { number: 39, nameBn: 'আয-যুমার', nameEn: 'Az-Zumar', nameAr: 'الزمر', meaningBn: 'দলবদ্ধ জনতা', meaningEn: 'The Crowds', meaningAr: 'الزمر' },
  40: { number: 40, nameBn: 'গাফির', nameEn: 'Ghafir', nameAr: 'غافر', meaningBn: 'ক্ষমাকারী (মুমিন)', meaningEn: 'The Forgiver', meaningAr: 'غافر الذنب' },
  41: { number: 41, nameBn: 'ফুসসিলাত', nameEn: 'Fussilat', nameAr: 'فصلت', meaningBn: 'সুস্পষ্ট বিবরণ', meaningEn: 'Explained in Detail', meaningAr: 'فصلت آياته' },
  42: { number: 42, nameBn: 'আশ-শূরা', nameEn: 'Ash-Shoora', nameAr: 'الشورى', meaningBn: 'পারস্পরিক পরামর্শ', meaningEn: 'Consultation', meaningAr: 'الشورى' },
  43: { number: 43, nameBn: 'আয-যুখরুফ', nameEn: 'Az-Zukhruf', nameAr: 'الزخرف', meaningBn: 'স্বর্ণালঙ্কার ও জাঁকজমক', meaningEn: 'Gold Adornment', meaningAr: 'الزخرف' },
  44: { number: 44, nameBn: 'আদ-দুখান', nameEn: 'Ad-Dukhaan', nameAr: 'الدخان', meaningBn: 'ধোঁয়া ও কুয়াশা', meaningEn: 'The Smoke', meaningAr: 'الدخان' },
  45: { number: 45, nameBn: 'আল-জাসিয়াহ', nameEn: 'Al-Jaathiya', nameAr: 'الجاثية', meaningBn: 'নতজানু সম্প্রদায়', meaningEn: 'The Kneeling', meaningAr: 'الجاثية' },
  46: { number: 46, nameBn: 'আল-আহক্বাফ', nameEn: 'Al-Ahqaf', nameAr: 'الأحقاف', meaningBn: 'বালুর টিলা ও পাহাড়', meaningEn: 'The Sand Dunes', meaningAr: 'الأحقاف' },
  47: { number: 47, nameBn: 'মুহাম্মদ', nameEn: 'Muhammad', nameAr: 'محمد', meaningBn: 'প্রিয় নবী মুহাম্মদ ﷺ', meaningEn: 'Prophet Muhammad ﷺ', meaningAr: 'النبي محمد ﷺ' },
  48: { number: 48, nameBn: 'আল-ফাতহ', nameEn: 'Al-Fath', nameAr: 'الفتح', meaningBn: 'চূড়ান্ত বিজয়', meaningEn: 'The Victory', meaningAr: 'الفتح المبين' },
  49: { number: 49, nameBn: 'আল-হুজুরাত', nameEn: 'Al-Hujuraat', nameAr: 'الحجرات', meaningBn: 'বাসগৃহ ও প্রকোষ্ঠসমূহ', meaningEn: 'The Private Dwellings', meaningAr: 'الحجرات' },
  50: { number: 50, nameBn: 'ক্বাফ', nameEn: 'Qaaf', nameAr: 'ق', meaningBn: 'ক্বাফ বর্ণ', meaningEn: 'The Letter Qaaf', meaningAr: 'حرف قاف' },
  51: { number: 51, nameBn: 'আয-যারিয়াত', nameEn: 'Adh-Dhaariyaat', nameAr: 'الذاريات', meaningBn: 'বিক্ষিপ্তকারী বাতাস', meaningEn: 'The Winnowing Winds', meaningAr: 'الذاريات ذروا' },
  52: { number: 52, nameBn: 'আত-তূর', nameEn: 'At-Toor', nameAr: 'الطور', meaningBn: 'তূর পর্বত', meaningEn: 'The Mount', meaningAr: 'طور سيناء' },
  53: { number: 53, nameBn: 'আন-নাজম', nameEn: 'An-Najm', nameAr: 'النجم', meaningBn: 'নক্ষত্র ও তারা', meaningEn: 'The Star', meaningAr: 'النجم إذا هوى' },
  54: { number: 54, nameBn: 'আল-ক্বামার', nameEn: 'Al-Qamar', nameAr: 'القمر', meaningBn: 'চাঁদ ও চন্দ্রবিদীর্ণ', meaningEn: 'The Moon', meaningAr: 'انشقاق القمر' },
  55: { number: 55, nameBn: 'আর-রাহমান', nameEn: 'Ar-Rahmaan', nameAr: 'الرحمن', meaningBn: 'পরম করুণাময় দয়ালু', meaningEn: 'The Most Merciful', meaningAr: 'عروس القرآن' },
  56: { number: 56, nameBn: 'আল-ওয়াক্বিয়াহ', nameEn: 'Al-Waaqia', nameAr: 'الواقعة', meaningBn: 'নিশ্চিত মহাপ্রলয় / কিয়ামত', meaningEn: 'The Inevitable Event', meaningAr: 'الواقعة' },
  57: { number: 57, nameBn: 'আল-হাদীদ', nameEn: 'Al-Hadeed', nameAr: 'الحديد', meaningBn: 'লোহা বা লৌহখণ্ড', meaningEn: 'The Iron', meaningAr: 'الحديد' },
  58: { number: 58, nameBn: 'আল-মুজাদালাহ', nameEn: 'Al-Mujaadila', nameAr: 'المجادلة', meaningBn: 'বিতর্ককারিণী নারী', meaningEn: 'The Pleading Woman', meaningAr: 'قد سمع الله' },
  59: { number: 59, nameBn: 'আল-হাশর', nameEn: 'Al-Hashr', nameAr: 'الحشر', meaningBn: 'সমাবেশ ও নির্বাসন', meaningEn: 'The Gathering', meaningAr: 'الحشر' },
  60: { number: 60, nameBn: 'আল-মুমতাহিনাহ', nameEn: 'Al-Mumtahana', nameAr: 'الممتحنة', meaningBn: 'পরীক্ষিত নারী', meaningEn: 'The Examined Woman', meaningAr: 'الممتحنة' },
  61: { number: 61, nameBn: 'আস-সাফ', nameEn: 'As-Saff', nameAr: 'الصف', meaningBn: 'সারিবদ্ধ সৈন্যদল', meaningEn: 'The Ranks', meaningAr: 'الصف' },
  62: { number: 62, nameBn: 'আল-জুমু\'আহ', nameEn: 'Al-Jumu\'a', nameAr: 'الجمعة', meaningBn: 'জুমু\'আহ / সমাবেশ', meaningEn: 'Friday Congregation', meaningAr: 'صلاة الجمعة' },
  63: { number: 63, nameBn: 'আল-মুনাফিকুন', nameEn: 'Al-Munaafiqoon', nameAr: 'المنافقون', meaningBn: 'কপট ভণ্ড বিশ্বাসীগণ', meaningEn: 'The Hypocrites', meaningAr: 'المنافقون' },
  64: { number: 64, nameBn: 'আত-তাগাবুন', nameEn: 'At-Taghaabun', nameAr: 'التغابن', meaningBn: 'লাভ-ক্ষতির প্রকাশ', meaningEn: 'Mutual Loss and Gain', meaningAr: 'يوم التغابن' },
  65: { number: 65, nameBn: 'আত-ত্বালাক্ব', nameEn: 'At-Talaaq', nameAr: 'الطلاق', meaningBn: 'বিবাহ বিচ্ছেদ', meaningEn: 'The Divorce', meaningAr: 'الطلاق' },
  66: { number: 66, nameBn: 'আত-তাহরীম', nameEn: 'At-Tahreem', nameAr: 'التحريم', meaningBn: 'নিষিদ্ধকরণ', meaningEn: 'The Prohibition', meaningAr: 'التحريم' },
  67: { number: 67, nameBn: 'আল-মুলক', nameEn: 'Al-Mulk', nameAr: 'الملك', meaningBn: 'সার্বভৌম রাজত্ব ও কর্তৃত্ব', meaningEn: 'The Dominion', meaningAr: 'تبارك الذي بيده الملك' },
  68: { number: 68, nameBn: 'আল-ক্বলম', nameEn: 'Al-Qalam', nameAr: 'القلم', meaningBn: 'কলম ও লেখনী', meaningEn: 'The Pen', meaningAr: 'ن والقلم' },
  69: { number: 69, nameBn: 'আল-হাক্বক্বাহ', nameEn: 'Al-Haaqqa', nameAr: 'الحاقة', meaningBn: 'অকাট্য সত্য কিয়ামত', meaningEn: 'The Inevitable Reality', meaningAr: 'الحاقة' },
  70: { number: 70, nameBn: 'আল-মা\'আরিজ', nameEn: 'Al-Ma\'aarij', nameAr: 'المعارج', meaningBn: 'উর্ধ্বগমনের সোপান', meaningEn: 'The Ascending Ways', meaningAr: 'المعارج' },
  71: { number: 71, nameBn: 'নূহ', nameEn: 'Nooh', nameAr: 'نوح', meaningBn: 'নবী নূহ (আ.)', meaningEn: 'Noah', meaningAr: 'النبي نوح' },
  72: { number: 72, nameBn: 'আল-জ্বিন', nameEn: 'Al-Jinn', nameAr: 'الجن', meaningBn: 'জ্বিন সম্প্রদায়', meaningEn: 'The Jinn', meaningAr: 'الجن' },
  73: { number: 73, nameBn: 'আল-মুযযাম্মিল', nameEn: 'Al-Muzzammil', nameAr: 'المزمل', meaningBn: 'বস্ত্রাবৃত নবী ﷺ', meaningEn: 'The Enshrouded One', meaningAr: 'المزمل' },
  74: { number: 74, nameBn: 'আল-মুদ্দাচ্ছির', nameEn: 'Al-Muddaththir', nameAr: 'المدثر', meaningBn: 'চাদরাবৃত নবী ﷺ', meaningEn: 'The Cloaked One', meaningAr: 'المدثر' },
  75: { number: 75, nameBn: 'আল-ক্বিয়ামাহ', nameEn: 'Al-Qiyaama', nameAr: 'القيامة', meaningBn: 'পুনরুত্থান ও বিচার দিবস', meaningEn: 'The Resurrection', meaningAr: 'يوم القيامة' },
  76: { number: 76, nameBn: 'আল-ইনসান', nameEn: 'Al-Insaan', nameAr: 'الإنسان', meaningBn: 'মানবজাতি (দাহর)', meaningEn: 'Man / Time', meaningAr: 'هل أتى على الإنسان' },
  77: { number: 77, nameBn: 'আল-মুরসালাত', nameEn: 'Al-Mursalaat', nameAr: 'المرسلات', meaningBn: 'প্রেরিত বাতাস ও ফেরেশতা', meaningEn: 'The Emissaries', meaningAr: 'المرسلات عرفا' },
  78: { number: 78, nameBn: 'আন-নাবা', nameEn: 'An-Naba', nameAr: 'النبأ', meaningBn: 'মহা সংবাদ ও বার্তা', meaningEn: 'The Great Tidings', meaningAr: 'عم يتساءلون' },
  79: { number: 79, nameBn: 'আন-নাযি\'আত', nameEn: 'An-Naazi\'aat', nameAr: 'النازعات', meaningBn: 'প্রাণ হরণকারী ফেরেশতা', meaningEn: 'Those Who Tear Out', meaningAr: 'النازعات غرقا' },
  80: { number: 80, nameBn: 'আবাসা', nameEn: 'Abasa', nameAr: 'عبس', meaningBn: 'তিনি ভ্রূকুটি করলেন', meaningEn: 'He Frowned', meaningAr: 'عبس وتولى' },
  81: { number: 81, nameBn: 'আত-তাকবীর', nameEn: 'At-Takweer', nameAr: 'التكوير', meaningBn: 'আলোকহীন ও গুটিয়ে ফেলা', meaningEn: 'The Enfolding', meaningAr: 'إذا الشمس كورت' },
  82: { number: 82, nameBn: 'আল-ইনফিতার', nameEn: 'Al-Infitaar', nameAr: 'الانفطار', meaningBn: 'আকাশ বিদীর্ণ হওয়া', meaningEn: 'The Cleaving', meaningAr: 'إذا السماء انفطرت' },
  83: { number: 83, nameBn: 'আল-মুতাফফিফীন', nameEn: 'Al-Mutaffifeen', nameAr: 'المطففين', meaningBn: 'মাপে কম দানকারী', meaningEn: 'Those Who Defraud', meaningAr: 'ويل للمطففين' },
  84: { number: 84, nameBn: 'আল-ইনশিক্বাক্ব', nameEn: 'Al-Inshiqaaq', nameAr: 'الانشقاق', meaningBn: 'আকাশ ফেটে যাওয়া', meaningEn: 'The Splitting Asunder', meaningAr: 'إذا السماء انشقت' },
  85: { number: 85, nameBn: 'আল-বুরূজ', nameEn: 'Al-Burooj', nameAr: 'البروج', meaningBn: 'নক্ষত্রমণ্ডলী ও দুর্গ', meaningEn: 'The Constellations', meaningAr: 'والسماء ذات البروج' },
  86: { number: 86, nameBn: 'আত-ত্বারিক্ব', nameEn: 'At-Taariq', nameAr: 'الطارق', meaningBn: 'নৈশ আগমনকারী উজ্জ্বল তারা', meaningEn: 'The Morning Star', meaningAr: 'النجم الثاقب' },
  87: { number: 87, nameBn: 'আল-আ\'লা', nameEn: 'Al-A\'laa', nameAr: 'الأعلى', meaningBn: 'সর্বোচ্চ ও মহিমান্বিত', meaningEn: 'The Most High', meaningAr: 'سبح اسم ربك الأعلى' },
  88: { number: 88, nameBn: 'আল-গাশিয়াহ', nameEn: 'Al-Ghaashiya', nameAr: 'الغاشية', meaningBn: 'আচ্ছন্নকারী কিয়ামত', meaningEn: 'The Overwhelming', meaningAr: 'هل أتاك حديث الغاشية' },
  89: { number: 89, nameBn: 'আল-ফজর', nameEn: 'Al-Fajr', nameAr: 'الفجر', meaningBn: 'ঊষা ও ভোরবেলা', meaningEn: 'The Dawn', meaningAr: 'والفجر وليال عشر' },
  90: { number: 90, nameBn: 'আল-বালাদ', nameEn: 'Al-Balad', nameAr: 'البلد', meaningBn: 'পবিত্র নগরী মক্কা', meaningEn: 'The Sacred City', meaningAr: 'لا أقسم بهذا البلد' },
  91: { number: 91, nameBn: 'আশ-শামস', nameEn: 'Ash-Shams', nameAr: 'الشمس', meaningBn: 'সূর্য ও প্রখর কিরণ', meaningEn: 'The Sun', meaningAr: 'والشمس وضحاها' },
  92: { number: 92, nameBn: 'আল-লাইল', nameEn: 'Al-Lail', nameAr: 'الليل', meaningBn: 'রাত ও অন্ধকার', meaningEn: 'The Night', meaningAr: 'والليل إذا يغشى' },
  93: { number: 93, nameBn: 'আদ-দুহা', nameEn: 'Ad-Duhaa', nameAr: 'الضحى', meaningBn: 'পূর্বাহ্ন ও সকালের আলো', meaningEn: 'The Bright Morning Hours', meaningAr: 'والضحى والليل' },
  94: { number: 94, nameBn: 'আশ-শারহ', nameEn: 'Ash-Sharh', nameAr: 'الشرح', meaningBn: 'বক্ষ প্রশস্তকরণ (ইনশিরাহ)', meaningEn: 'The Expansion of Breast', meaningAr: 'ألم نشرح لك صدرك' },
  95: { number: 95, nameBn: 'আত-তীন', nameEn: 'At-Teen', nameAr: 'التين', meaningBn: 'আঞ্জির বা ডুমুর', meaningEn: 'The Fig', meaningAr: 'والتين والزيتون' },
  96: { number: 96, nameBn: 'আল-আলাক্ব', nameEn: 'Al-Alaq', nameAr: 'العلق', meaningBn: 'জমাট রক্তবিন্দু (ইকরা)', meaningEn: 'The Clinging Clot', meaningAr: 'اقرأ باسم ربك' },
  97: { number: 97, nameBn: 'আল-ক্বদর', nameEn: 'Al-Qadr', nameAr: 'القدر', meaningBn: 'মহিমান্বিত ক্বদরের রাত', meaningEn: 'The Night of Decree', meaningAr: 'ليلة القدر' },
  98: { number: 98, nameBn: 'আল-বায়্যিনাহ', nameEn: 'Al-Bayyina', nameAr: 'البينة', meaningBn: 'সুস্পষ্ট প্রকাশ্য প্রমাণ', meaningEn: 'The Clear Evidence', meaningAr: 'لم يكن الذين كفروا' },
  99: { number: 99, nameBn: 'আয-যালযালাহ', nameEn: 'Az-Zalzala', nameAr: 'الزلزلة', meaningBn: 'ভীষণ মহাকম্পন', meaningEn: 'The Earthquake', meaningAr: 'إذا زلزلت الأرض' },
  100: { number: 100, nameBn: 'আল-আদিয়াত', nameEn: 'Al-Aadiyaat', nameAr: 'العاديات', meaningBn: 'ঊর্ধ্বশ্বাসে ধাবমান অশ্ব', meaningEn: 'The Charging Steeds', meaningAr: 'والعاديات ضبحا' },
  101: { number: 101, nameBn: 'আল-ক্বারিয়াহ', nameEn: 'Al-Qaari\'a', nameAr: 'القارعة', meaningBn: 'করাঘাতকারী মহাপ্রলয়', meaningEn: 'The Striking Calamity', meaningAr: 'القارعة ما القارعة' },
  102: { number: 102, nameBn: 'আত-তাকাসুর', nameEn: 'At-Takaathur', nameAr: 'التكاثر', meaningBn: 'প্রাচুর্যের মোহ ও প্রতিযোগিতা', meaningEn: 'Competition in Increase', meaningAr: 'ألهاكم التكاثر' },
  103: { number: 103, nameBn: 'আল-আসর', nameEn: 'Al-Asr', nameAr: 'العصر', meaningBn: 'মহাকালের শপথ', meaningEn: 'The Declining Day / Time', meaningAr: 'والعصر إن الإنسان' },
  104: { number: 104, nameBn: 'আল-হুমাযাহ', nameEn: 'Al-Humaza', nameAr: 'الهمزة', meaningBn: 'পরনিন্দাকারী ও দোষগ্রাহী', meaningEn: 'The Scorner', meaningAr: 'ويل لكل همزة لمزة' },
  105: { number: 105, nameBn: 'আল-ফীল', nameEn: 'Al-Feel', nameAr: 'الفيل', meaningBn: 'হাতি বাহিনী', meaningEn: 'The Elephant', meaningAr: 'أصحاب الفيل' },
  106: { number: 106, nameBn: 'কুরাইশ', nameEn: 'Quraish', nameAr: 'قريش', meaningBn: 'কুরাইশ গোত্র', meaningEn: 'The Tribe of Quraysh', meaningAr: 'لإيلاف قريش' },
  107: { number: 107, nameBn: 'আল-মাউন', nameEn: 'Al-Maa\'oon', nameAr: 'الماعون', meaningBn: 'ছোটখাটো সাহায্য', meaningEn: 'Small Kindnesses', meaningAr: 'أرأيت الذي يكذب' },
  108: { number: 108, nameBn: 'আল-কাউসার', nameEn: 'Al-Kawthar', nameAr: 'الكوثر', meaningBn: 'জান্নাতের অফুরন্ত নিয়ামত', meaningEn: 'Abundance / Heavenly River', meaningAr: 'إنا أعطيناك الكوثر' },
  109: { number: 109, nameBn: 'আল-কাফিরুন', nameEn: 'Al-Kaafiroon', nameAr: 'الكافرون', meaningBn: 'অবিশ্বাসী কাফিরগণ', meaningEn: 'The Disbelievers', meaningAr: 'قل يا أيها الكافرون' },
  110: { number: 110, nameBn: 'আন-নাসর', nameEn: 'An-Nasr', nameAr: 'النصر', meaningBn: 'আল্লাহর বিজয় ও সাহায্য', meaningEn: 'Divine Support and Victory', meaningAr: 'إذا جاء نصر الله' },
  111: { number: 111, nameBn: 'আল-মাসাদ', nameEn: 'Al-Masad', nameAr: 'المسد', meaningBn: 'খেজুর গাছের পাকানো দড়ি (লাহাব)', meaningEn: 'The Palm Fiber (Flame)', meaningAr: 'تبت يدا أبي لهب' },
  112: { number: 112, nameBn: 'আল-ইখলাস', nameEn: 'Al-Ikhlaas', nameAr: 'الإخلاص', meaningBn: 'একত্ববাদ ও নির্ভেজাল তাওহীদ', meaningEn: 'Sincerity / Absolute Oneness', meaningAr: 'قل هو الله أحد' },
  113: { number: 113, nameBn: 'আল-ফালাক্ব', nameEn: 'Al-Falaq', nameAr: 'الفلق', meaningBn: 'প্রভাতের বিচ্ছুরণ ও আলো', meaningEn: 'The Daybreak', meaningAr: 'قل أعوذ برب الفلق' },
  114: { number: 114, nameBn: 'আন-নাস', nameEn: 'An-Naas', nameAr: 'الناس', meaningBn: 'সমগ্র মানবজাতি', meaningEn: 'Mankind', meaningAr: 'قل أعوذ برب الناس' }
};

const toArabicNumerals = (num: number): string => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return String(num).replace(/\d/g, (d) => arabicDigits[parseInt(d, 10)]);
};

/**
 * Returns the beautiful, localized name of the Surah based on the active language.
 */
export function getLocalizedSurahName(surahNumber: number, lang: ZikrLanguage = 'bn'): string {
  const info = SURAH_NAMES_ALL_114[surahNumber];
  if (!info) return `Surah ${surahNumber}`;

  if (lang === 'bn') {
    return `সূরা ${info.nameBn}`;
  }
  if (lang === 'ar') {
    return `سورة ${info.nameAr}`;
  }
  return `Surah ${info.nameEn}`;
}

/**
 * Returns just the Surah title without prefix (e.g. "আল-ফাতিহা" instead of "সূরা আল-ফাতিহা")
 */
export function getBareSurahName(surahNumber: number, lang: ZikrLanguage = 'bn'): string {
  const info = SURAH_NAMES_ALL_114[surahNumber];
  if (!info) return `Surah ${surahNumber}`;

  if (lang === 'bn') {
    return info.nameBn;
  }
  if (lang === 'ar') {
    return info.nameAr;
  }
  return info.nameEn;
}

/**
 * Returns the localized meaning of the Surah
 */
export function getLocalizedSurahMeaning(surahNumber: number, lang: ZikrLanguage = 'bn'): string {
  const info = SURAH_NAMES_ALL_114[surahNumber];
  if (!info) return '';

  if (lang === 'bn') {
    return info.meaningBn;
  }
  if (lang === 'ar') {
    return info.meaningAr;
  }
  return info.meaningEn;
}

/**
 * Returns localized Revelation type ("মাক্কী" / "মাদানী", "Meccan" / "Medinan", "مكية" / "مدنية")
 */
export function getLocalizedRevelationType(type: 'Meccan' | 'Medinan', lang: ZikrLanguage = 'bn'): string {
  if (lang === 'bn') {
    return type === 'Meccan' ? 'মাক্কী' : 'মাদানী';
  }
  if (lang === 'ar') {
    return type === 'Meccan' ? 'مكية' : 'مدنية';
  }
  return type;
}

/**
 * Returns localized Ayahs and Juz text
 */
export function getLocalizedAyahsAndJuz(
  ayahsCount: number,
  juzNumber: number,
  revelationType: 'Meccan' | 'Medinan',
  lang: ZikrLanguage = 'bn'
): string {
  if (lang === 'bn') {
    const rev = revelationType === 'Meccan' ? 'মাক্কী' : 'মাদানী';
    return `${ayahsCount}টি আয়াত • পারা ${juzNumber} (${rev})`;
  }
  if (lang === 'ar') {
    const rev = revelationType === 'Meccan' ? 'مكية' : 'مدنية';
    return `${toArabicNumerals(ayahsCount)} آيات • جزء ${toArabicNumerals(juzNumber)} (${rev})`;
  }
  return `${ayahsCount} Ayahs • Juz ${juzNumber} (${revelationType})`;
}
