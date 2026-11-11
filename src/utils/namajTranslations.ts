/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ZikrLanguage } from '../types';

export interface LocalizedPrayerItem {
  id: string;
  name: string;
  totalRakats: number;
  breakdown: string;
  timeRange: string;
  virtue: string;
  rakatsBreakdownList?: { type: string; rakats: number }[];
  hadithText?: string;
  hadithRef?: string;
}

export interface LocalizedPrayerStep {
  stepNumber: number;
  title: string;
  action: string;
  recitation: string;
  tip: string;
}

export interface LocalizedEssentialDua {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  context: string;
  reference: string;
}

export interface LocalizedNaflPrayer {
  title: string;
  rakats: string;
  time: string;
  benefit: string;
  steps: string;
}

export interface LocalizedQazaItem {
  key: string;
  label: string;
}

export const NAMAJ_UI: Record<string, Record<string, string>> = {
  guideBadge: {
    bn: '🕌 নামাজ শিক্ষা ও পূর্ণাঙ্গ গাইড',
    en: '🕌 Salah Guide & Complete Manual',
    ar: '🕌 دليل الصلاة الشامل',
    ur: '🕌 نماز کی مکمل رہنمائی',
    hi: '🕌 नमाज़ गाइड और संपूर्ण नियम',
  },
  bannerTitle: {
    bn: 'নামাজের নিয়ম, দোয়া ও রাকাত সমূহ',
    en: 'Prayer Rules, Duas & Rak\'ats Breakdown',
    ar: 'أحكام الصلاة، الأدعية والركعات',
    ur: 'نماز کے احکام، دعائیں اور رکعات',
    hi: 'नमाज़ के नियम, दुआएँ और रकात विवरण',
  },
  bannerSubtitle: {
    bn: '৫ ওয়াক্ত ফরজ ও নফল নামাজের নিয়ম, কিরাত, সহীহ হাদিস, সকল বৈঠকের দোয়া এবং কাজা নামাজের হিসাব।',
    en: 'Comprehensive guide to the 5 daily obligatory & voluntary prayers: rules, recitation, Sahih Hadith, sitting duas, and Missed Prayer (Qaza) tracker.',
    ar: 'دليل شامل للصلوات الخمس المفروضة والنوافل: الأحكام، القراءة، الأحاديث الصحيحة، أدعية الجلسات وحساب القضاء.',
    ur: 'پانچ وقت فرض و نفل نماز کے احکام، قراءت، صحیح احادیث، تشہد کی دعائیں اور قضا نمازوں کا حساب۔',
    hi: '५ वक़्त की फ़र्ज़ व नफ़्ल नमाज़ के नियम, किरात, सहीह हदीस, सभी दुआएँ और क़ज़ा नमाज़ का हिसाब।',
  },
  viewSalatTimes: {
    bn: 'আজকের সালাত টাইম দেখুন >',
    en: 'View Today\'s Prayer Times >',
    ar: 'عرض أوقات الصلاة اليوم >',
    ur: 'آج کے اوقاتِ نماز دیکھیں >',
    hi: 'आज के नमाज़ के समय देखें >',
  },
  tabFiveFard: {
    bn: '৫ ওয়াক্ত নামাজ',
    en: '5 Daily Prayers',
    ar: 'الصلوات الخمس',
    ur: 'پانچ وقت نماز',
    hi: '५ वक़्त नमाज़',
  },
  tabRulesSteps: {
    bn: 'নামাজ পড়ার নিয়ম',
    en: 'Step-by-Step Rules',
    ar: 'طريقة الصلاة خطوة بخطوة',
    ur: 'نماز پڑھنے کا طریقہ',
    hi: 'नमाज़ का तरीक़ा',
  },
  tabPrayerDuas: {
    bn: 'নামাজের সকল দোয়া',
    en: 'Prayer Duas',
    ar: 'أدعية الصلاة',
    ur: 'نماز کی تمام دعائیں',
    hi: 'नमाज़ की सभी दुआएँ',
  },
  tabNaflPrayers: {
    bn: 'নফল ও সুন্নত',
    en: 'Nafl & Sunnah',
    ar: 'النوافل والسنن',
    ur: 'نفل و سنت نمازیں',
    hi: 'नफ़्ल व सुन्नत',
  },
  tabQazaTracker: {
    bn: 'কাজা ক্যালকুলেটর',
    en: 'Qaza Calculator',
    ar: 'حاسبة قضاء الصلاة',
    ur: 'قضا نماز کیلکولیٹر',
    hi: 'क़ज़ा कैलकुलेटर',
  },
  daily5Title: {
    bn: 'দৈনন্দিন ৫ ওয়াক্ত নামাজের রাকাত ও সময়সীমা',
    en: 'Daily 5 Prayers: Rak\'ats & Time Windows',
    ar: 'الصلوات الخمس اليومية: الركعات والمواقيت',
    ur: 'روزانہ کی ۵ نمازوں کی رکعات اور اوقات',
    hi: 'दैनिक ५ वक़्त नमाज़ की रकात व समय',
  },
  clickToExpand: {
    bn: 'বিস্তারিত জানতে ক্লিক করুন',
    en: 'Click to expand details',
    ar: 'انقر لمعرفة التفاصيل',
    ur: 'تفصیلات جاننے کے لیے کلک کریں',
    hi: 'विस्तार से जानने के लिए क्लिक करें',
  },
  virtuesHeading: {
    bn: 'ফজিলত ও গুরুত্ব:',
    en: 'Virtues & Importance:',
    ar: 'الفضائل والأهمية:',
    ur: 'فضائل و اہمیت:',
    hi: 'फ़ज़ीलत व महत्व:',
  },
  rakatOrderHeading: {
    bn: 'রাকাত সমূহের ধারাবাহিক বিন্যাস',
    en: 'Sequential Order of Rak\'ats',
    ar: 'ترتيب الركعات بالتفصيل',
    ur: 'رکعات کی باضابطہ ترتیب',
    hi: 'रकात का क्रमबद्ध विवरण',
  },
  hadithHeading: {
    bn: 'সহীহ হাদিসের বর্ণনা:',
    en: 'Sahih Hadith Reference:',
    ar: 'الحديث النبوي الصحيح:',
    ur: 'صحیح حدیث کا بیان:',
    hi: 'सहीह हदीस का संदर्भ:',
  },
  totalPrefix: {
    bn: 'মোট',
    en: 'Total',
    ar: 'إجمالي',
    ur: 'کل',
    hi: 'कुल',
  },
  rakatsUnit: {
    bn: 'রাকাত',
    en: 'Rak\'ats',
    ar: 'ركعات',
    ur: 'رکعات',
    hi: 'रकात',
  },
  singleRakatUnit: {
    bn: 'রাকাত',
    en: 'Rak\'at',
    ar: 'ركعة',
    ur: 'رکعت',
    hi: 'रकात',
  },
  timeWindowLabel: {
    bn: 'ওয়াক্ত:',
    en: 'Time Window:',
    ar: 'وقت الصلاة:',
    ur: 'وقت:',
    hi: 'वक़्त:',
  },
  stepIntroQuote: {
    bn: '💡 রাসুলুল্লাহ (সা.) বলেছেন: "তোমরা সেভাবে নামাজ আদায় করো, যেভাবে আমাকে নামাজ আদায় করতে দেখছো।" — সহীহ বুখারী ৬৩১। নিচে তাকবীরে তাহরিমা থেকে সালাম ফেরানো পর্যন্ত ধারাবাহিক ১০টি পদক্ষেপ দেওয়া হলো:',
    en: '💡 The Prophet (ﷺ) said: "Pray as you have seen me praying." — Sahih al-Bukhari 631. Below are the 10 sequential steps from Takbir Tahrimah to Tasleem:',
    ar: '💡 قال رسول الله ﷺ: "صَلُّوا كَمَا رَأَيْتُمُونِي أُصَلِّي" — صحيح البخاري ٦٣١. فيما يلي الخطوات العشر المتتالية للصلاة من تكبيرة الإحرام حتى السلام:',
    ur: '💡 رسول اللہ ﷺ نے فرمایا: "نماز اس طرح پڑھو جس طرح تم نے مجھے پڑھتے دیکھا ہے۔" — صحیح بخاری ۶۳۱۔ تکبیرِ تحریمہ سے سلام پھیرنے تک کے ۱۰ مراحل درج ذیل ہیں:',
    hi: '💡 रसूलुल्लाह (सल्लल्लाहु अलैहि वसल्लम) ने फ़रमाया: "नमाज़ वैसे पढ़ो जैसे तुमने मुझे पढ़ते देखा है।" — सहीह बुख़ारी 631। नीचे तकबीरे तहरीमा से सलाम तक के 10 चरण दिए गए हैं:',
  },
  physicalActionLabel: {
    bn: 'শারীরিক পদ্ধতি:',
    en: 'Physical Posture:',
    ar: 'الهيئة والوضع الجسدي:',
    ur: 'جسمانی طریقہ کار:',
    hi: 'शारीरिक तरीक़ा:',
  },
  recitationLabel: {
    bn: 'মুখের বাক্য ও দোয়া:',
    en: 'Words & Recitation:',
    ar: 'الأذكار والأدعية:',
    ur: 'زبانی کلمات اور دعائیں:',
    hi: 'ज़बानी कलिमात व दुआएँ:',
  },
  duasIntro: {
    bn: 'নামাজে পঠিত সকল গুরুত্বপূর্ণ দোয়া ও তাসবীহ (আরবি, বিশুদ্ধ উচ্চারণ, অর্থ ও রেফারেন্স সহ):',
    en: 'Essential Duas & Tasbeeh recited during prayer (Arabic, transliteration, translation & references):',
    ar: 'جميع الأدعية والتسبيحات المأثورة في الصلاة (بالعربية، النطق، الترجمة والمصادر):',
    ur: 'نماز میں پڑھی جانے والی تمام اہم دعائیں اور تسبیحات (عربی، تلفظ، ترجمہ اور حوالہ جات کے ساتھ):',
    hi: 'नमाज़ में पढ़ी जाने वाली सभी महत्वपूर्ण दुआएँ व तस्बीहात (अरबी, उच्चारण, अनुवाद व संदर्भ सहित):',
  },
  transliterationLabel: {
    bn: 'উচ্চারণ:',
    en: 'Transliteration:',
    ar: 'النطق الصوتي:',
    ur: 'تلفظ:',
    hi: 'उच्चारण:',
  },
  meaningLabel: {
    bn: 'অর্থ:',
    en: 'Translation:',
    ar: 'المعنى:',
    ur: 'ترجمہ:',
    hi: 'अर्थ:',
  },
  naflTimeLabel: {
    bn: 'সময়:',
    en: 'Time:',
    ar: 'الوقت:',
    ur: 'وقت:',
    hi: 'समय:',
  },
  naflVirtueLabel: {
    bn: 'ফজিলত:',
    en: 'Virtue & Reward:',
    ar: 'الفضيلة والثواب:',
    ur: 'فضیلت و ثواب:',
    hi: 'फ़ज़ीलत:',
  },
  naflMethodLabel: {
    bn: 'পদ্ধতি:',
    en: 'Method:',
    ar: 'الكيفية:',
    ur: 'طریقہ:',
    hi: 'तरीक़ा:',
  },
  qazaIntro: {
    bn: 'কাজা নামাজ ট্র্যাকার: কোনো ওজরে বা ভুলবশত নামাজ ছুটে গিয়ে থাকলে তা যত দ্রুত সম্ভব কাজা আদায় করা ওয়াজিব। আপনি কত ওয়াক্ত কাজা আদায় করলেন তা এখানে লিখে রাখতে পারেন।',
    en: 'Missed Prayers (Qaza) Tracker: If any prayer was missed due to sleep or unavoidable circumstances, it is obligatory to make it up as soon as possible. Track your completed and remaining missed prayers here.',
    ar: 'حاسبة قضاء الصلوات الفائتة: من فاتته صلاة بنوم أو نسيان وجب عليه قضاؤها فور تذكرها. سجل عدد الصلوات المقضية والمتبقية هنا.',
    ur: 'قضا نماز ٹریکر: نیند یا کسی عذر کی وجہ سے اگر کوئی نماز چھوٹ گئی ہو تو جلد از جلد اس کی قضا پڑھنا واجب ہے۔ آپ یہاں اپنی قضا نمازوں کا باقاعدہ حساب رکھ سکتے ہیں۔',
    hi: 'क़ज़ा नमाज़ ट्रैकर: भूल या नींद के कारण छूटी हुई नमाज़ों को जल्द से जल्द अदा करना वाजिब है। यहाँ अपनी बाक़ी क़ज़ा नमाज़ों का हिसाब रखें।',
  },
  totalRemainingQaza: {
    bn: 'মোট অবশিষ্ট কাজা ওয়াক্ত',
    en: 'Total Remaining Missed Prayers (Qaza)',
    ar: 'إجمالي الصلوات الفائتة المتبقية',
    ur: 'کل بقیہ قضا نمازیں',
    hi: 'कुल शेष क़ज़ा नमाज़ें',
  },
  qazaSubtitle: {
    bn: 'নিয়মিত এক এক ওয়াক্ত আদায় করে সংখ্যা কমান',
    en: 'Offer one by one regularly to decrease the count',
    ar: 'صلِّ صلاة بعد أخرى بانتظام لإنقاص العدد',
    ur: 'باقاعدگی سے ایک ایک وقت ادا کر کے تعداد کم کریں',
    hi: 'नियमित रूप से एक-एक वक़्त अदा करके संख्या घटाएँ',
  },
  remainingText: {
    bn: 'অবশিষ্ট:',
    en: 'Remaining:',
    ar: 'المتبقي:',
    ur: 'بقیہ:',
    hi: 'शेष:',
  },
  timesUnit: {
    bn: 'ওয়াক্ত',
    en: 'times',
    ar: 'صلوات',
    ur: 'وقت',
    hi: 'वक़्त',
  },
  markDoneTitle: {
    bn: '১ ওয়াক্ত আদায় সম্পন্ন',
    en: 'Mark 1 as completed (-1)',
    ar: 'تم أداء صلاة واحدة (-١)',
    ur: '۱ وقت ادا ہو گیا (-۱)',
    hi: '१ वक़्त अदा हो गया (-1)',
  },
  addMissedTitle: {
    bn: '১ ওয়াক্ত যুক্ত করুন',
    en: 'Add 1 missed prayer (+1)',
    ar: 'إضافة صلاة فائتة (+١)',
    ur: '۱ وقت قضا شامل کریں (+۱)',
    hi: '१ वक़्त जोड़ें (+1)',
  },
};

export function getLocalizedPrayers(lang: ZikrLanguage): LocalizedPrayerItem[] {
  if (lang === 'bn') {
    return [
      {
        id: 'Fajr',
        name: 'ফজর নামাজ',
        totalRakats: 4,
        breakdown: '২ রাকাত সুন্নত (মুয়াক্কাদাহ) + ২ রাকাত ফরজ',
        timeRange: 'সুবহে সাদিক (ভোর) হতে সূর্যোদয়ের পূর্ব পর্যন্ত',
        virtue: 'ফজরের দুই রাকাত সুন্নত দুনিয়া ও তার মধ্যকার সবকিছুর চেয়ে উত্তম (সহীহ মুসলিম ৭২৫)। যে ব্যক্তি ফজরের নামাজ পড়ল সে আল্লাহর জিম্মাদারিতে চলে গেল।',
        rakatsBreakdownList: [
          { type: 'সুন্নাতে মুয়াক্কাদাহ', rakats: 2 },
          { type: 'ফরজ সালাত', rakats: 2 },
        ],
        hadithText: 'রাসুলুল্লাহ ﷺ বলেছেন: ফজরের দুই রাকাত (সুন্নত নামাজ) গোটা পৃথিবী এবং তার মধ্যকার সবকিছুর চেয়েও উত্তম ও মূল্যবান।',
        hadithRef: 'সহীহ মুসলিম ৭২৫ (সহীহ)',
      },
      {
        id: 'Dhuhr',
        name: 'যোহর নামাজ',
        totalRakats: 12,
        breakdown: '৪ রাকাত সুন্নত (মুয়াক্কাদাহ) + ৪ রাকাত ফরজ + ২ রাকাত সুন্নত + ২ রাকাত নফল',
        timeRange: 'দুপুরে সূর্য ঢলে পড়ার পর থেকে আসরের ওয়াক্ত পর্যন্ত',
        virtue: 'যোহরের পূর্বে ৪ রাকাত সুন্নতে আসমানের দরজাসমূহ খুলে দেওয়া হয় এবং আমল ওপরে ওঠে (তিরমিজি ৪৭৮)।',
        rakatsBreakdownList: [
          { type: 'সুন্নাতে মুয়াক্কাদাহ (ফরজের পূর্বে)', rakats: 4 },
          { type: 'ফরজ সালাত', rakats: 4 },
          { type: 'সুন্নাতে মুয়াক্কাদাহ (ফরজের পরে)', rakats: 2 },
          { type: 'নফল সালাত', rakats: 2 },
        ],
        hadithText: 'যোহরের পূর্বে চার রাকাত নামাজে আসমানের দরজাসমূহ খুলে দেওয়া হয়। আমি ভালোবাসি যে সে সময় আমার কোনো নেক আমল ওপরে উঠুক।',
        hadithRef: 'সুনানে তিরমিজি ৪৭৮ (হাসান)',
      },
      {
        id: 'Asr',
        name: 'আসর নামাজ',
        totalRakats: 8,
        breakdown: '৪ রাকাত সুন্নত (গায়রে মুয়াক্কাদাহ) + ৪ রাকাত ফরজ',
        timeRange: 'যোহরের সময় শেষ হওয়ার পর থেকে সূর্য হলুদ বর্ণ ধারণের পূর্ব পর্যন্ত',
        virtue: 'যে ব্যক্তি আসরের নামাজ ইচ্ছাকৃতভাবে ছেড়ে দেয়, তার আমল বিনষ্ট হয়ে যায় (সহীহ বুখারী ৫৫৩)। আল্লাহ আসরের পূর্বে ৪ রাকাত নামাজ আদায়কারীর ওপর রহম করেন।',
        rakatsBreakdownList: [
          { type: 'সুন্নাতে গায়রে মুয়াক্কাদাহ', rakats: 4 },
          { type: 'ফরজ সালাত', rakats: 4 },
        ],
        hadithText: 'যে ব্যক্তি দুই শীতল সময়ের সালাত (ফজর ও আসর) নিয়মিত আদায় করবে, সে জান্নাতে প্রবেশ করবে।',
        hadithRef: 'সহীহ বুখারী ৫৭৪ (সহীহ)',
      },
      {
        id: 'Maghrib',
        name: 'মাগরিব নামাজ',
        totalRakats: 7,
        breakdown: '৩ রাকাত ফরজ + ২ রাকাত সুন্নত (মুয়াক্কাদাহ) + ২ রাকাত নফল (আউওয়াবীন)',
        timeRange: 'সূর্যাস্তের পর থেকে পশ্চিমাকাশের লাল আভা মিলিয়ে যাওয়ার পূর্ব পর্যন্ত',
        virtue: 'মাগরিবের পর ৬ রাকাত আউওয়াবীন নামাজ আদায় করলে ১২ বছর ইবাদতের সমপরিমাণ সওয়াব পাওয়া যায় (তিরমিজি ৪৩৫)।',
        rakatsBreakdownList: [
          { type: 'ফরজ সালাত', rakats: 3 },
          { type: 'সুন্নাতে মুয়াক্কাদাহ', rakats: 2 },
          { type: 'নফল (আউওয়াবীন)', rakats: 2 },
        ],
        hadithText: 'আমার উম্মত কল্যাণের ওপর থাকবে যতদিন তারা মাগরিবের নামাজে অযথা বিলম্ব না করে সূর্যাস্তের পরপরই আদায় করবে।',
        hadithRef: 'আবু দাউদ ৪১৮ (সহীহ)',
      },
      {
        id: 'Isha',
        name: 'এশার নামাজ ও বিতর',
        totalRakats: 17,
        breakdown: '৪ রাকাত সুন্নত + ৪ রাকাত ফরজ + ২ রাকাত সুন্নত + ৩ রাকাত বিতর (ওয়াজিব) + ২ রাকাত নফল',
        timeRange: 'পশ্চিম আকাশের শুভ্রতা মিলিয়ে যাওয়া থেকে মধ্যরাত (বা ফজরের পূর্ব) পর্যন্ত',
        virtue: 'যে ব্যক্তি জামায়াতে এশার নামাজ আদায় করল, সে যেন অর্ধরাত পর্যন্ত নামাজ পড়ল; আর যে ফজরও জামায়াতে পড়ল, সে যেন সারা রাত নামাজ পড়ল (সহীহ মুসলিম ৬৫৬)।',
        rakatsBreakdownList: [
          { type: 'সুন্নাতে গায়রে মুয়াক্কাদাহ', rakats: 4 },
          { type: 'ফরজ সালাত', rakats: 4 },
          { type: 'সুন্নাতে মুয়াক্কাদাহ', rakats: 2 },
          { type: 'বিতর (ওয়াজিব)', rakats: 3 },
          { type: 'নফল সালাত', rakats: 2 },
        ],
        hadithText: 'মুনাফিকদের জন্য সবচেয়ে কঠিন নামাজ হলো এশা এবং ফজরের সালাত। তারা যদি জানত এ দুই সালাতে কী নেয়ামত রয়েছে, তবে হামাগুড়ি দিয়ে হলেও জামাতে উপস্থিত হতো।',
        hadithRef: 'সহীহ বুখারী ৬৫৭ (সহীহ)',
      },
      {
        id: 'Jummah',
        name: 'জুমার নামাজ (শুক্রবার)',
        totalRakats: 14,
        breakdown: '৪ রাকাত কাবলাল জুমা + ২ রাকাত ফরজ (খুতবাসহ) + ৪ রাকাত বা’দাল জুমা + ২ রাকাত সুন্নত',
        timeRange: 'শুক্রবারে যোহরের ওয়াক্তে খুতবার সাথে আদায় করতে হয়',
        virtue: 'শুক্রবার মুসলমানদের জন্য সাপ্তাহিক ঈদের দিন। সূরা কাহাফ পাঠ ও জুমার নামাজে পূর্বে গমনকারীদের প্রতিটি কদমে এক বছর নফল রোজা ও নামাজের সওয়াব অর্জিত হয়।',
        rakatsBreakdownList: [
          { type: 'কাবলাল জুমা (সুন্নত)', rakats: 4 },
          { type: 'ফরজ সালাত (ইমামের পেছনে)', rakats: 2 },
          { type: 'বা’দাল জুমা (সুন্নত)', rakats: 4 },
          { type: 'সুন্নাতুল ওয়াক্ত', rakats: 2 },
          { type: 'নফল সালাত', rakats: 2 },
        ],
        hadithText: 'যে ব্যক্তি জুমার দিন উত্তমরূপে গোসল করে মসজিদে আগে আগে যাবে এবং মনোযোগ দিয়ে খুতবা শুনবে, তার প্রতি কদমের বিনিময়ে এক বছর নফল রোজা ও নামাজের সওয়াব দেওয়া হবে।',
        hadithRef: 'সুনানে তিরমিজি ৪৯৬ (সহীহ)',
      },
    ];
  }

  // English & other language fallback
  return [
    {
      id: 'Fajr',
      name: 'Fajr Prayer',
      totalRakats: 4,
      breakdown: '2 Rak\'ats Sunnah (Mu\'akkadah) + 2 Rak\'ats Fard',
      timeRange: 'From true dawn (Subh Sadiq) until just before sunrise',
      virtue: 'The two Sunnah Rak\'ats of Fajr are better than the entire world and everything in it (Sahih Muslim 725). Whoever prays Fajr is under Allah\'s divine protection.',
      rakatsBreakdownList: [
        { type: 'Sunnah Mu\'akkadah', rakats: 2 },
        { type: 'Fard (Obligatory)', rakats: 2 },
      ],
      hadithText: 'The Prophet (ﷺ) said: "The two Rak\'ats before the dawn (Fajr) prayer are better than this world and all it contains."',
      hadithRef: 'Sahih Muslim 725 (Sahih)',
    },
    {
      id: 'Dhuhr',
      name: 'Dhuhr Prayer',
      totalRakats: 12,
      breakdown: '4 Sunnah (Mu\'akkadah) + 4 Fard + 2 Sunnah + 2 Nafl',
      timeRange: 'From the sun declining from its zenith until Asr begins',
      virtue: 'The gates of heaven are opened before Dhuhr for the 4 Sunnah rak\'ats, and righteous deeds ascend directly to Allah (Tirmidhi 478).',
      rakatsBreakdownList: [
        { type: 'Sunnah Mu\'akkadah (Before Fard)', rakats: 4 },
        { type: 'Fard (Obligatory)', rakats: 4 },
        { type: 'Sunnah Mu\'akkadah (After Fard)', rakats: 2 },
        { type: 'Nafl (Voluntary)', rakats: 2 },
      ],
      hadithText: 'The Prophet (ﷺ) said: "This is an hour in which the gates of heaven are opened, and I love that a good deed of mine ascends during it."',
      hadithRef: 'Jami` at-Tirmidhi 478 (Hasan)',
    },
    {
      id: 'Asr',
      name: 'Asr Prayer',
      totalRakats: 8,
      breakdown: '4 Sunnah (Ghair Mu\'akkadah) + 4 Fard',
      timeRange: 'From the end of Dhuhr until the sun turns pale yellow before sunset',
      virtue: 'Whoever intentionally neglects Asr prayer, his good deeds are rendered null and void (Sahih al-Bukhari 553). May Allah have mercy on who prays 4 rak\'ats before Asr.',
      rakatsBreakdownList: [
        { type: 'Sunnah Ghair Mu\'akkadah', rakats: 4 },
        { type: 'Fard (Obligatory)', rakats: 4 },
      ],
      hadithText: 'The Prophet (ﷺ) said: "Whoever prays the two cool prayers (Fajr and Asr) will enter Paradise."',
      hadithRef: 'Sahih al-Bukhari 574 (Sahih)',
    },
    {
      id: 'Maghrib',
      name: 'Maghrib Prayer',
      totalRakats: 7,
      breakdown: '3 Fard + 2 Sunnah (Mu\'akkadah) + 2 Nafl (Awwabin)',
      timeRange: 'Immediately after sunset until the twilight glow disappears from the western sky',
      virtue: 'Offering 6 voluntary rak\'ats of Awwabin after Maghrib yields rewards equivalent to 12 years of devoted worship (Tirmidhi 435).',
      rakatsBreakdownList: [
        { type: 'Fard (Obligatory)', rakats: 3 },
        { type: 'Sunnah Mu\'akkadah', rakats: 2 },
        { type: 'Nafl (Awwabin)', rakats: 2 },
      ],
      hadithText: 'The Prophet (ﷺ) said: "My Ummah will continue to be upon good as long as they do not delay Maghrib until the stars appear."',
      hadithRef: 'Sunan Abi Dawud 418 (Sahih)',
    },
    {
      id: 'Isha',
      name: 'Isha Prayer & Witr',
      totalRakats: 17,
      breakdown: '4 Sunnah + 4 Fard + 2 Sunnah + 3 Witr (Wajib) + 2 Nafl',
      timeRange: 'From complete disappearance of twilight until midnight (or before Fajr)',
      virtue: 'Whoever prays Isha in congregation earns the reward of standing in prayer for half the night; and whoever also prays Fajr in congregation gets the reward of praying the entire night (Sahih Muslim 656).',
      rakatsBreakdownList: [
        { type: 'Sunnah Ghair Mu\'akkadah', rakats: 4 },
        { type: 'Fard (Obligatory)', rakats: 4 },
        { type: 'Sunnah Mu\'akkadah', rakats: 2 },
        { type: 'Witr (Wajib)', rakats: 3 },
        { type: 'Nafl (Voluntary)', rakats: 2 },
      ],
      hadithText: 'The Prophet (ﷺ) said: "No prayer is heavier upon the hypocrites than Fajr and Isha, but if they knew what is in them, they would attend them even if crawling."',
      hadithRef: 'Sahih al-Bukhari 657 (Sahih)',
    },
    {
      id: 'Jummah',
      name: 'Jummah Prayer (Friday)',
      totalRakats: 14,
      breakdown: '4 Qablal Jummah + 2 Fard (with Khutbah) + 4 Ba\'dal Jummah + 2 Sunnah',
      timeRange: 'During Dhuhr time on Friday, preceded by the Friday Sermon (Khutbah)',
      virtue: 'Friday is the weekly blessed day of Eid for Muslims. Every step taken to the Friday prayer early with Ghusl earns the reward of one year of fasting and night vigils.',
      rakatsBreakdownList: [
        { type: 'Sunnah (Before Fard)', rakats: 4 },
        { type: 'Fard (Behind Imam with Khutbah)', rakats: 2 },
        { type: 'Sunnah (After Fard)', rakats: 4 },
        { type: 'Sunnatul Waqt', rakats: 2 },
        { type: 'Nafl (Voluntary)', rakats: 2 },
      ],
      hadithText: 'The Prophet (ﷺ) said: "Whoever takes a bath on Friday, goes early to the mosque and listens attentively to the Khutbah, for every step he will have the reward of a year of fasting and standing in prayer."',
      hadithRef: 'Jami` at-Tirmidhi 496 (Sahih)',
    },
  ];
}

export function getLocalizedPrayerSteps(lang: ZikrLanguage): LocalizedPrayerStep[] {
  if (lang === 'bn') {
    return [
      {
        stepNumber: 1,
        title: 'কিবলামুখী হয়ে নিয়ত ও তাকবীরে তাহরীমা',
        action: 'পবিত্র পোশাকে অজু অবস্থায় কিবলার দিকে সোজা হয়ে দাঁড়াবেন (কিয়াম)। দু’পায়ের মাঝে স্বাভাবিক ফাঁকা রাখবেন।',
        recitation: 'মনে মনে যে ওয়াক্তের নামাজ পড়ছেন তার নিয়ত করবেন। এরপর উভয় হাত কান বরাবর (মহিলারা কাঁধ বরাবর) উঠিয়ে বলবেন: "আল্লাহু আকবার"।',
        tip: 'তাকবীরে তাহরীমার মাধ্যমে দুনিয়ার সকল কথা ও কাজ হারাম হয়ে নামাজের ভেতরে প্রবেশ ঘটে।',
      },
      {
        stepNumber: 2,
        title: 'হাত বাঁধা ও ছানা পাঠ',
        action: 'নাভির ওপর (বা বুকের ওপর) ডান হাতের তালু বাম হাতের পিঠের ওপর রেখে কব্জি জড়িয়ে ধরবেন। দৃষ্টি সিজদার জায়গায় রাখবেন।',
        recitation: 'প্রথমে ছানা পাঠ করবেন: "সুবহানাকা আল্লাহুম্মা ওয়া বিহামদিকা..."। এরপর আউজুবিল্লাহ ও বিসমিল্লাহ পড়বেন।',
        tip: 'নামাজে ডানে-বামে বা আকাশের দিকে তাকানো নিষেধ; দৃষ্টি সার্বক্ষণিক সিজদার স্থানে নিবদ্ধ রাখুন।',
      },
      {
        stepNumber: 3,
        title: 'সূরা ফাতিহা ও কিরাত পাঠ',
        action: 'স্থিরভাবে দাঁড়িয়ে স্পষ্ট ও সুন্দর উচ্চারণে কিরাত তিলাওয়াত করবেন।',
        recitation: 'সূরা ফাতিহা পাঠ করবেন এবং শেষে আস্তে বা স্পষ্ট স্বরে "আমীন" বলবেন। এরপর কোরআনের যেকোনো একটি সূরা বা অন্তত ৩টি ছোট আয়াত তিলাওয়াত করবেন।',
        tip: 'লা সালাতা লিমান লাম ইয়াকরা’ বিফাতিহাতিল কিতাব — সূরা ফাতিহা ছাড়া নামাজ হয় না (সহীহ বুখারী)।',
      },
      {
        stepNumber: 4,
        title: 'রুকু ও রুকুর তাসবীহ',
        action: '"আল্লাহু আকবার" বলে রুকুতে যাবেন। পিঠ সমান্তরাল সোজা রাখবেন যাতে পিঠের ওপর পানির পাত্র রাখলে স্থির থাকে। দুই হাত দিয়ে দুই হাঁটু শক্তভাবে আঁকড়ে ধরবেন।',
        recitation: 'রুকু অবস্থায় শান্ত হয়ে অন্তত ৩ বার বলবেন: "সুবহানা রাব্বিয়াল আজীম" (আমার মহান রবের পবিত্রতা ঘোষণা করছি)।',
        tip: 'রুকুতে তাড়াহুড়া করবেন না। প্রতিটি অঙ্গ স্থির না হওয়া পর্যন্ত তাসবীহ পাঠ সম্পূর্ণ করুন।',
      },
      {
        stepNumber: 5,
        title: 'কওমা (রুকু থেকে সোজা হয়ে দাঁড়ানো)',
        action: '"সামিআল্লাহু লিমান হামিদাহ" বলতে বলতে রুকু থেকে একেবারে সোজা হয়ে শান্তভাবে দাঁড়াবেন।',
        recitation: 'সোজা হয়ে দাঁড়িয়ে বলবেন: "রাব্বানা লাকাল হামদ, হামদান কাসীরান তাইয়িবান মুবারাকান ফীহ"।',
        tip: 'রুকু থেকে সোজা হয়ে স্থির হয়ে দাঁড়ানো ওয়াজিব। অনেকে সোজা হওয়ার আগেই সিজদায় চলে যান, এতে নামাজ বিনষ্ট হতে পারে।',
      },
      {
        stepNumber: 6,
        title: 'প্রথম সিজদা ও তাসবীহ',
        action: '"আল্লাহু আকবার" বলে সিজদায় যাবেন। প্রথমে দুই হাঁটু, তারপর দুই হাত, এরপর নাক ও কপাল মাটিতে রাখবেন। হাত থাকবে কাঁধ বরাবর।',
        recitation: 'সিজদায় শান্ত হয়ে অন্তত ৩ বার বলবেন: "সুবহানা রাব্বিয়াল আ‘লা" (আমার সর্বোচ্চ রবের পবিত্রতা ঘোষণা করছি)।',
        tip: 'সিজদার সময় পায়ের উভয় পাতার আঙুলসমূহ কিবলামুখী রাখা সুন্নাত। বান্দা সিজদাতেই আল্লাহর সবচেয়ে বেশি নৈকট্য পায়।',
      },
      {
        stepNumber: 7,
        title: 'দুই সিজদার মাঝখানের বৈঠক (জলসা)',
        action: '"আল্লাহু আকবার" বলে সিজদা থেকে উঠে বাম পা বিছিয়ে তার ওপর বসবেন এবং ডান পা খাড়া রাখবেন (ইফতিরাশ)। দুই হাত উরুর ওপর রাখবেন।',
        recitation: 'সোজা হয়ে বসে শান্তভাবে দোয়া পড়বেন: "আল্লাহুম্মাগফির লী, ওয়ারহামনী, ওয়াহদিনী, ওয়া ‘আফিনী, ওয়ারযুক্বনী"।',
        tip: 'দুই সিজদার মাঝখানে অন্তত এক তাসবীহ পরিমাণ সোজা হয়ে স্থির বসে থাকা ওয়াজিব।',
      },
      {
        stepNumber: 8,
        title: 'দ্বিতীয় সিজদা ও পরবর্তী রাকাত',
        action: '"আল্লাহু আকবার" বলে দ্বিতীয় সিজদা করবেন এবং প্রথম সিজদার মতোই ৩ বার "সুবহানা রাব্বিয়াল আ‘লা" পড়বেন। এরপর দাঁড়িয়ে ২য় রাকাত শুরু করবেন।',
        recitation: 'দ্বিতীয় রাকাতে ছানা পড়তে হয় না; সরাসরি বিসমিল্লাহ বলে সূরা ফাতিহা ও অন্য সূরা মিলিয়ে রুকু-সিজদা সম্পন্ন করবেন।',
        tip: '২ রাকাত বিশিষ্ট নামাজে (যেমন ফজরের ফরজ) ২য় রাকাতের সিজদার পর শেষ বৈঠকে বসবেন।',
      },
      {
        stepNumber: 9,
        title: 'বৈঠক, তাশাহহুদ ও দরূদ পাঠ',
        action: '২ রাকাত পর (প্রথম বৈঠক) বা শেষ রাকাতে (শেষ বৈঠক) শান্ত হয়ে বসবেন।',
        recitation: 'প্রথমে "আত্তাহিয়্যাতু..." পড়বেন। "আশহাদু আল-লা ইলাহা" বলার সময় শাহাদাত আঙুল উঠিয়ে তাওহিদের সাক্ষ্য দেবেন এবং "ইল্লাল্লাহ" বলে নামাবেন। শেষ বৈঠকে দরূদে ইবরাহিম ও দোআয়ে মাসূরা পাঠ করবেন।',
        tip: 'শেষ বৈঠকে তাশাহহুদ পড়া ওয়াজিব এবং দরূদ ও দোআয়ে মাসূরা পড়া সুন্নতে মুয়াক্কাদাহ।',
      },
      {
        stepNumber: 10,
        title: 'সালাম ফিরিয়ে নামাজ সমাপ্তকরণ',
        action: 'প্রথমে মুখমণ্ডল ডানে ঘুরিয়ে দৃষ্টি কাঁধের ওপর রাখবেন এবং এরপর বামে ঘুরিয়ে দৃষ্টি কাঁধের ওপর রাখবেন।',
        recitation: 'ডানে ও বামে ফেরার সময় বলবেন: "আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ" (আপনাদের ওপর শান্তি ও আল্লাহর রহমত বর্ষিত হোক)।',
        tip: 'সালাম ফেরানোর পর ৩ বার "আস্তাগফিরুল্লাহ" এবং আয়াতুল কুরসি পাঠ করা অত্যন্ত ফজিলতপূর্ণ আমল।',
      },
    ];
  }

  // English & other language fallback
  return [
    {
      stepNumber: 1,
      title: 'Facing the Qiblah, Intention (Niyyah) & Takbeer Tahrimah',
      action: 'Stand upright facing the Qiblah (Qiyam) in a state of Wudu and purity. Keep feet shoulder-width apart.',
      recitation: 'Form the intention in your heart for the specific prayer. Raise both hands to the ears (women to shoulders) and proclaim: "Allahu Akbar".',
      tip: 'Takbeer Tahrimah marks entry into sacred prayer, making talking and worldly actions strictly prohibited.',
    },
    {
      stepNumber: 2,
      title: 'Folding Hands & Reciting the Opening Supplication (Thana)',
      action: 'Place the right palm over the back of the left wrist above the navel or on the chest. Fix your gaze upon the place of prostration.',
      recitation: 'Recite the Thana: "Subhanaka Allahumma wa bihamdika...", followed by Ta\'awwudh (A\'oodhu billah) and Tasmiyah (Bismillah).',
      tip: 'Do not look up to the sky or glance around; maintain humble focus at the spot where your forehead will touch the ground.',
    },
    {
      stepNumber: 3,
      title: 'Recitation of Surah Al-Fatihah & Quranic Surah (Qirat)',
      action: 'Stand serenely with tranquility and clear, measured articulation.',
      recitation: 'Recite Surah Al-Fatihah and say "Ameen" silently or audibly. Then recite another Surah or at least three short verses of the Quran.',
      tip: '"There is no valid prayer for the one who does not recite the Opening of the Book (Surah Al-Fatihah)." — Sahih al-Bukhari.',
    },
    {
      stepNumber: 4,
      title: 'Bowing (Ruku) & Tasbeeh of Ruku',
      action: 'Say "Allahu Akbar" and bow down, keeping your back completely flat and level. Clasp both knees firmly with fingers spread.',
      recitation: 'Remain calm and motionless in Ruku, reciting at least 3 times: "Subhana Rabbiyal Azeem" (Glory be to my Lord, the Almighty).',
      tip: 'Never rush through Ruku. Ensure each bone and joint settles into place before reciting the Tasbeeh.',
    },
    {
      stepNumber: 5,
      title: 'Standing Straight from Bowing (Qawmah)',
      action: 'Rise from bowing until you are standing completely erect, saying: "Sami\' Allahu liman hamidah".',
      recitation: 'Standing upright in complete composure, recite: "Rabbana lakal hamd, hamdan kaseeran tayyiban mubarakan feeh".',
      tip: 'Pausing and standing completely upright in Qawmah is obligatory (Wajib). Rushing directly to prostration invalidates the prayer.',
    },
    {
      stepNumber: 6,
      title: 'First Prostration (Sajdah) & Its Tasbeeh',
      action: 'Say "Allahu Akbar" and prostrate. Place your knees first, then hands, then nose and forehead firmly on the ground.',
      recitation: 'In peaceful prostration, recite at least 3 times: "Subhana Rabbiyal A\'la" (Glory be to my Lord, the Most High).',
      tip: 'Point your toes towards the Qiblah. A servant is closest to his Creator while in prostration, so supplicate sincerely.',
    },
    {
      stepNumber: 7,
      title: 'Sitting Between Two Prostrations (Jalsa)',
      action: 'Say "Allahu Akbar" and rise to sit upright. Lay your left foot flat to sit upon it and keep your right foot upright (Iftirash).',
      recitation: 'Sit calmly and recite: "Allahummagh-fir lee, warhamnee, wahdinee, wa \'aafinee, warzuqnee".',
      tip: 'Sitting still for at least the duration of one Tasbeeh between the two prostrations is a mandatory pillar of prayer.',
    },
    {
      stepNumber: 8,
      title: 'Second Prostration & Rising for Next Rak\'at',
      action: 'Say "Allahu Akbar" and make the second Sajdah, reciting "Subhana Rabbiyal A\'la" 3 times as in the first Sajdah.',
      recitation: 'Rise for the 2nd Rak\'at. Thana is not repeated; begin directly with Bismillah, Surah Al-Fatihah, and another Surah.',
      tip: 'In a 2-Rak\'at prayer (such as Fajr), sit down for the final Tashahhud sitting after the second Sajdah of the second Rak\'at.',
    },
    {
      stepNumber: 9,
      title: 'Sitting (Qa\'dah), Tashahhud, Durood & Supplication',
      action: 'Sit upright in tranquility after 2 Rak\'ats (first sitting) or in the final Rak\'at (final sitting).',
      recitation: 'Recite "At-Tahiyyat...". When saying "Ashhadu al-la ilaha", raise the index finger in testimony of Tawheed. In the final sitting, recite Durood Ibrahim and Dua Masura.',
      tip: 'Reciting Tashahhud is obligatory (Wajib), and reciting Durood Ibrahim and Dua Masura is an emphasized Sunnah (Mu\'akkadah).',
    },
    {
      stepNumber: 10,
      title: 'Ending the Prayer with Tasleem (Salam)',
      action: 'Turn your face to the right looking over the right shoulder, then turn to the left looking over the left shoulder.',
      recitation: 'Say on each turn: "Assalamu alaykum wa rahmatullah" (Peace and the mercy of Allah be upon you).',
      tip: 'Following Tasleem, saying "Astaghfirullah" 3 times and reciting Ayat al-Kursi is of immense spiritual virtue.',
    },
  ];
}

export function getLocalizedEssentialDuas(lang: ZikrLanguage): LocalizedEssentialDua[] {
  if (lang === 'bn') {
    return [
      {
        id: 'sana',
        title: 'ছানা (নামাজের শুরুতেই পড়ার দোয়া)',
        arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ',
        transliteration: 'সুবহানাকা আল্লাহুম্মা ওয়া বিহামদিকা, ওয়া তাবারাকাসমুকা, ওয়া তা‘আলা জাদ্দুকা, ওয়া লা ইলাহা গাইরুকা।',
        meaning: 'হে আল্লাহ! আমি আপনার পবিত্রতা ঘোষণা করছি ও আপনার প্রশংসা করছি। আপনার নাম বরকতময়, আপনার মাহাত্ম্য সর্বোচ্চ এবং আপনি ব্যতীত কোনো সত্য মাবুদ নেই।',
        context: 'তাকবীরে তাহরীমার পর হাত বেঁধে সূরা ফাতিহার পূর্বে পড়া সুন্নতে মুয়াক্কাদাহ।',
        reference: 'সুনানে তিরমিজি ২৪৩, আবু দাউদ ৭৭৫',
      },
      {
        id: 'ruku_tasbeeh',
        title: 'রুকুর তাসবীহ',
        arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
        transliteration: 'সুবহানা রাব্বিয়াল আজীম।',
        meaning: 'আমার মহান প্রতিপালকের পবিত্রতা ও মহিমা ঘোষণা করছি।',
        context: 'রুকু অবস্থায় ন্যূনতম ৩ বার, ৫ বার বা ৭ বার পড়া সুন্নত।',
        reference: 'সহীহ মুসলিম ৭৭২',
      },
      {
        id: 'sami_allah',
        title: 'রুকু থেকে সোজা হওয়ার দোয়া (কওমা)',
        arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ • رَبَّنَا لَكَ الْحَمْدُ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ',
        transliteration: 'সামি‘আল্লাহু লিমান হামিদাহ • রাব্বানা লাকাল হামদ, হামদান কাসীরান তাইয়িবান মুবারাকান ফীহ।',
        meaning: 'আল্লাহ শোনেন যে তাঁর প্রশংসা করে • হে আমাদের রব! সকল প্রশংসা একমাত্র আপনারই—অঢেল, পবিত্র ও বরকতপূর্ণ প্রশংসা।',
        context: 'ইমাম ও একাকী নামাজী রুকু থেকে ওঠার সময় প্রথম অংশ এবং সোজা হয়ে দাঁড়িয়ে দ্বিতীয় অংশ বলবে।',
        reference: 'সহীহ বুখারী ৭৯৯',
      },
      {
        id: 'sajdah_tasbeeh',
        title: 'সিজদার তাসবীহ',
        arabic: 'سُبْحَانَ رَبِّيَ الأَعْلَى',
        transliteration: 'সুবহানা রাব্বিয়াল আ‘লা।',
        meaning: 'আমার সর্বশ্রেষ্ঠ সর্বোচ্চ প্রতিপালকের পবিত্রতা ও প্রশংসা করছি।',
        context: 'প্রতিটি সিজদায় ন্যূনতম ৩ বার, ৫ বার বা ৭ বার পড়া সুন্নত। বান্দা সিজদায় আল্লাহর সবচেয়ে নিকটবর্তী হয়।',
        reference: 'সহীহ মুসলিম ৭৭২',
      },
      {
        id: 'between_sajdah',
        title: 'দুই সিজদার মাঝখানের দোয়া',
        arabic: 'اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَعَافِنِي وَارْزُقْنِي',
        transliteration: 'আল্লাহুম্মাগফির লী, ওয়ারহামনী, ওয়াহদিনী, ওয়া ‘আফিনী, ওয়ারযুক্বনী।',
        meaning: 'হে আল্লাহ! আমাকে ক্ষমা করুন, আমার উপর দয়া করুন, আমাকে সঠিক পথে পরিচালিত করুন, আমাকে সুস্থতা ও নিরাপত্তা দিন এবং আমাকে জীবিকা দান করুন।',
        context: 'প্রথম সিজদা শেষ করে সোজা হয়ে শান্তভাবে বসে দ্বিতীয় সিজদায় যাওয়ার পূর্বে পড়া সুন্নত।',
        reference: 'আবু দাউদ ৮৫০, তিরমিজি ২৮৪',
      },
      {
        id: 'tashahhud',
        title: 'তাশাহহুদ (আত্তাহিয়্যাতু)',
        arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
        transliteration: 'আত্তাহিয়্যাতু লিল্লাহি ওয়াস-সালাওয়াতু ওয়াত-ত্বাইয়্যিবাতু, আসসালামু আলাইকা আইয়্যুহান-নাবিয়্যু ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহু, আসসালামু আলাইনা ওয়া আলা ইবাদিল্লাহিস-সালিহীন। আশহাদু আল-লা ইলাহা ইল্লাল্লাহু ওয়া আশহাদু আন্না মুহাম্মাদান আবদুহু ওয়া রাসুলুহু।',
        meaning: 'সকল মৌখিক, শারীরিক ও আর্থিক ইবাদত একমাত্র আল্লাহর জন্য। হে নবী! আপনার উপর আল্লাহর শান্তি, রহমত ও বরকত বর্ষিত হোক। আমাদের উপর এবং আল্লাহর সৎ বান্দাদের উপর শান্তি বর্ষিত হোক। আমি সাক্ষ্য দিচ্ছি যে আল্লাহ ছাড়া কোনো সত্য মাবুদ নেই এবং আমি আরও সাক্ষ্য দিচ্ছি মুহাম্মদ (সা.) আল্লাহর বান্দা ও রাসুল।',
        context: 'নামাজের প্রত্যেক বৈঠকেই (প্রথম ও শেষ বৈঠক) পড়া ওয়াজিব।',
        reference: 'সহীহ বুখারী ১২০২, মুসলিম ৪০২',
      },
      {
        id: 'durood_ibrahim',
        title: 'দরূদে ইবরাহিম',
        arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ • اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
        transliteration: 'আল্লাহুম্মা সাল্লি ‘আলা মুহাম্মাদিঁও ওয়া ‘আলা আলি মুহাম্মাদ, কামা সাল্লাইতা ‘আলা ইবরাহীমা ওয়া ‘আলা আলি ইবরাহীম, ইন্নাকা হামীদুম মাজীদ। আল্লাহুম্মা বারিক ‘আলা মুহাম্মাদিঁও ওয়া ‘আলা আলি মুহাম্মাদ, কামা বারাকতা ‘আলা ইবরাহীমা ওয়া ‘আলা আলি ইবরাহীম, ইন্নাকা হামীদুম মাজীদ।',
        meaning: 'হে আল্লাহ! মুহাম্মদ (সা.) ও তাঁর বংশধরের ওপর শান্তি বর্ষণ করুন, যেমন আপনি ইবরাহিম (আ.) ও তাঁর বংশধরের ওপর শান্তি বর্ষণ করেছিলেন। নিশ্চয় আপনি প্রশংসিত ও মহিমান্বিত। হে আল্লাহ! মুহাম্মদ (সা.) ও তাঁর বংশধরের ওপর বরকত নাজিল করুন, যেমন আপনি ইবরাহিম (আ.) ও তাঁর বংশধরের ওপর বরকত নাজিল করেছিলেন। নিশ্চয় আপনি প্রশংসিত ও মহিমান্বিত।',
        context: 'শেষ বৈঠকে তাশাহহুদের পর দরূদে ইবরাহিম পাঠ করা সুন্নতে মুয়াক্কাদাহ।',
        reference: 'সহীহ বুখারী ৩৩৭০, মুসলিম ৪০৫',
      },
      {
        id: 'dua_masura',
        title: 'দোআয়ে মাসূরা',
        arabic: 'اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ',
        transliteration: 'আল্লাহুম্মা ইন্নী জালামতু নাফসী জুলমান কাসীরাঁও, ওয়ালা ইয়াগফিরুজ জুনূবা ইল্লা আনতা, ফাগফির লী মাগফিরাতাম মিন ‘ইনদিকা ওয়ারহামনী, ইন্নাকা আনতাল গাফুরুর রাহীম।',
        meaning: 'হে আল্লাহ! আমি নিজের ওপর অনেক বড় জুলুম করেছি। আর আপনি ছাড়া গুনাহ মাফকারী কেউ নেই। অতএব আপনার পক্ষ থেকে আমাকে বিশেষ ক্ষমা দান করুন এবং আমার প্রতি দয়া করুন। নিশ্চয় আপনি পরম ক্ষমাশীল ও অসীম দয়ালু।',
        context: 'শেষ বৈঠকে দরূদ পাঠের পর সালাম ফেরানোর পূর্বে পড়া সুন্নাত।',
        reference: 'সহীহ বুখারী ৮৩৪, মুসলিম ২৭০৫',
      },
      {
        id: 'dua_qunoot',
        title: 'দোআয়ে কুনূত (বিতরের নামাজের দোয়া)',
        arabic: 'اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنُؤْمِنُ بِكَ وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ وَنَشْكُرُكَ وَلا نَكْفُرُكَ وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ • اللَّهُمَّ إِيَّاكَ نَعْبُدُ وَلَكَ نُصَلِّي وَنَسْجُدُ وَإِلَيْكَ نَسْعَى وَنَحْفِدُ وَنَرْجُو رَحْمَتَكَ وَنَخْشَى عَذَابَكَ إِنَّ عَذَابَكَ بِالْكُفَّارِ مُلْحِقٌ',
        transliteration: 'আল্লাহুম্মা ইন্না নাসতাঈনুকা ওয়া নাসতাগফিরুকা ওয়া নু’মিনু বিকা ওয়া নাতাওয়াক্কালু আলাইকা ওয়া নুছনি আলাইকাল খাইর, ওয়া নাশ কুরুকা ওয়ালা নাকফুরুকা ওয়া নাখলাউ ওয়া নাতরুকু মাইঁইয়াফজুরুক। আল্লাহুম্মা ইয়্যাকা না’বুদু ওয়া লাকা নুসল্লি ওয়া নাসজুদু ওয়া ইলাইকা নাস’আ ওয়া নাহফিদু ওয়া নারজু রাহমাতাকা ওয়া নাখশা আজাবাক, ইন্না আজাবাকা বিলকুফ্ফারি মুলহিক।',
        meaning: 'হে আল্লাহ! আমরা আপনারই সাহায্য চাই, আপনারই কাছে ক্ষমা প্রার্থনা করি, আপনার প্রতি বিশ্বাস স্থাপন করি, আপনার ওপর ভরসা রাখি এবং আপনার উত্তম প্রশংসা করি। আমরা আপনার কৃতজ্ঞতা স্বীকার করি, অকৃতজ্ঞ হই না। এবং যারা আপনার অবাধ্য হয় তাদেরকে পরিত্যাগ করি। হে আল্লাহ! আমরা কেবল আপনারই ইবাদত করি, আপনারই উদ্দেশ্যে সালাত আদায় করি এবং সিজদা করি। আমরা আপনার সন্তুষ্টি অর্জনে সচেষ্ট হই। আমরা আপনার রহমতের আশা করি এবং আপনার শাস্তিকে ভয় করি; নিশ্চয় আপনার শাস্তি কাফেরদের ওপর আপতিত হবে।',
        context: 'এশার নামাজের পর তিন রাকাত বিতর নামাজের ৩য় রাকাতে সূরা ফাতিহা ও অন্য সূরা মিলিয়ে আল্লাহু আকবার বলে হাত কান পর্যন্ত উঠিয়ে পুনরায় হাত বেঁধে পড়া ওয়াজিব।',
        reference: 'ইবনু আবি শাইবাহ ৬৯৬৫, বায়হাকী',
      },
    ];
  }

  // English & other language fallback
  return [
    {
      id: 'sana',
      title: 'Thana (Opening Supplication of Salah)',
      arabic: 'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَى جَدُّكَ وَلَا إِلَهَ غَيْرُكَ',
      transliteration: 'Subhanaka Allahumma wa bihamdika, wa tabarakasmuka, wa ta\'ala jadduka, wa la ilaha ghayruka.',
      meaning: 'Glory be to You, O Allah, and all praise is for You. Blessed is Your Name, exalted is Your Majesty, and there is no deity worthy of worship besides You.',
      context: 'Recited immediately after Takbeer Tahrimah before Surah Al-Fatihah (Sunnah Mu\'akkadah).',
      reference: 'Jami` at-Tirmidhi 243, Sunan Abi Dawud 775',
    },
    {
      id: 'ruku_tasbeeh',
      title: 'Tasbeeh of Bowing (Ruku)',
      arabic: 'سُبْحَانَ رَبِّيَ الْعَظِيمِ',
      transliteration: 'Subhana Rabbiyal \'Azeem.',
      meaning: 'Glory be to my Lord, the Almighty.',
      context: 'Recited at least 3, 5, or 7 times while in Ruku (bowing).',
      reference: 'Sahih Muslim 772',
    },
    {
      id: 'sami_allah',
      title: 'Dua Rising from Ruku (Qawmah)',
      arabic: 'سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ • رَبَّنَا لَكَ الْحَمْدُ حَمْدًا كَثِيرًا طَيِّبًا مُبَارَكًا فِيهِ',
      transliteration: 'Sami\' Allahu liman hamidah • Rabbana lakal hamd, hamdan kaseeran tayyiban mubarakan feeh.',
      meaning: 'Allah listens to whoever praises Him • Our Lord, to You belongs all praise—abundant, pure, and blessed praise.',
      context: 'Recited while rising from Ruku and standing upright in Qawmah.',
      reference: 'Sahih al-Bukhari 799',
    },
    {
      id: 'sajdah_tasbeeh',
      title: 'Tasbeeh of Prostration (Sajdah)',
      arabic: 'سُبْحَانَ رَبِّيَ الأَعْلَى',
      transliteration: 'Subhana Rabbiyal A\'la.',
      meaning: 'Glory be to my Lord, the Most High.',
      context: 'Recited at least 3, 5, or 7 times in every prostration.',
      reference: 'Sahih Muslim 772',
    },
    {
      id: 'between_sajdah',
      title: 'Dua Between the Two Prostrations (Jalsa)',
      arabic: 'اللَّهُمَّ اغْفِرْ لِي وَارْحَمْنِي وَاهْدِنِي وَعَافِنِي وَارْزُقْنِي',
      transliteration: 'Allahummagh-fir lee, warhamnee, wahdinee, wa \'aafinee, warzuqnee.',
      meaning: 'O Allah! Forgive me, have mercy on me, guide me, grant me health and well-being, and provide for me.',
      context: 'Recited while sitting upright in composure between the two prostrations.',
      reference: 'Sunan Abi Dawud 850, Jami` at-Tirmidhi 284',
    },
    {
      id: 'tashahhud',
      title: 'At-Tashahhud (At-Tahiyyat)',
      arabic: 'التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلاَمُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلاَمُ عَلَيْنَا وَعَلَى عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لاَ إِلَهَ إِلاَّ اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
      transliteration: 'At-tahiyyatu lillahi was-salawatu wat-tayyibatu, as-salamu \'alayka ayyuhan-Nabiyyu wa rahmatullahi wa barakatuh, as-salamu \'alayna wa \'ala \'ibadillahis-saliheen. Ashhadu al-la ilaha illallahu wa ashhadu anna Muhammadan \'abduhu wa Rasooluh.',
      meaning: 'All compliments, prayers, and pure things belong to Allah. Peace be upon you, O Prophet, and the mercy of Allah and His blessings. Peace be upon us and upon the righteous servants of Allah. I bear witness that there is no deity worthy of worship except Allah, and I bear witness that Muhammad is His servant and Messenger.',
      context: 'Obligatory (Wajib) to recite in every sitting of the prayer.',
      reference: 'Sahih al-Bukhari 1202, Sahih Muslim 402',
    },
    {
      id: 'durood_ibrahim',
      title: 'Durood Ibrahim (Blessings upon the Prophet)',
      arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ • اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
      transliteration: 'Allahumma salli \'ala Muhammadin wa \'ala ali Muhammad, kama sallayta \'ala Ibraheema wa \'ala ali Ibraheem, innaka Hameedum Majeed. Allahumma barik \'ala Muhammadin wa \'ala ali Muhammad, kama barakta \'ala Ibraheema wa \'ala ali Ibraheem, innaka Hameedum Majeed.',
      meaning: 'O Allah, bestow Your blessings upon Muhammad and the family of Muhammad, as You bestowed blessings upon Ibrahim and the family of Ibrahim; indeed, You are Praiseworthy and Full of Glory. O Allah, bless Muhammad and the family of Muhammad, as You blessed Ibrahim and the family of Ibrahim; indeed, You are Praiseworthy and Full of Glory.',
      context: 'Recited in the final sitting of prayer after Tashahhud (Sunnah Mu\'akkadah).',
      reference: 'Sahih al-Bukhari 3370, Sahih Muslim 405',
    },
    {
      id: 'dua_masura',
      title: 'Dua Masura (Supplication before Tasleem)',
      arabic: 'اللَّهُمَّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا، وَلاَ يَغْفِرُ الذُّنُوبَ إِلاَّ أَنْتَ، فَاغْفِرْ لِي مَغْفِرَةً مِنْ عِنْدِكَ وَارْحَمْنِي إِنَّكَ أَنْتَ الْغَفُورُ الرَّحِيمُ',
      transliteration: 'Allahumma innee zalamtu nafsee zulman kaseeran, wa la yaghfiruz-zunooba illa Anta, fagh-fir lee maghfiratan min \'indika war-hamnee, innaka Antal-Ghafoorur-Raheem.',
      meaning: 'O Allah! I have wronged myself greatly, and none forgives sins except You. So grant me forgiveness from Yourself and have mercy upon me. Truly, You are the Most Forgiving, the Most Merciful.',
      context: 'Recited after Durood in the final sitting before offering Salam.',
      reference: 'Sahih al-Bukhari 834, Sahih Muslim 2705',
    },
    {
      id: 'dua_qunoot',
      title: 'Dua Qunoot (Recited in Witr Prayer)',
      arabic: 'اللَّهُمَّ إِنَّا نَسْتَعِينُكَ وَنَسْتَغْفِرُكَ وَنُؤْمِنُ بِكَ وَنَتَوَكَّلُ عَلَيْكَ وَنُثْنِي عَلَيْكَ الْخَيْرَ وَنَشْكُرُكَ وَلا نَكْفُرُكَ وَنَخْلَعُ وَنَتْرُكُ مَنْ يَفْجُرُكَ • اللَّهُمَّ إِيَّاكَ نَعْبُدُ وَلَكَ نُصَلِّي وَنَسْجُدُ وَإِلَيْكَ نَسْعَى وَنَحْفِدُ وَنَرْجُو رَحْمَتَكَ وَنَخْشَى عَذَابَكَ إِنَّ عَذَابَكَ بِالْكُفَّارِ مُلْحِقٌ',
      transliteration: 'Allahumma inna nasta\'eenuka wa nastaghfiruka wa nu\'minu bika wa natawakkalu \'alayka wa nuthnee \'alaykal-khayr, wa nashkuruka wa la nakfuruka wa nakhla\'u wa natruku may-yafjuruk. Allahumma iyyaka na\'budu wa laka nusallee wa nasjudu wa ilayka nas\'a wa nahfidu wa narjoo rahmataka wa nakhsha \'adhabaka, inna \'adhabaka bil-kuffari mulhiq.',
      meaning: 'O Allah! We seek Your help, we seek Your forgiveness, we believe in You, we trust in You, and we praise You in the best manner. We thank You and are not ungrateful, and we forsake and turn away from whoever disobeys You. O Allah! You alone do we worship, to You we pray and prostrate, towards You do we strive and serve. We hope for Your mercy and fear Your punishment; surely Your punishment will overtake the disbelievers.',
      context: 'Obligatory to recite in the 3rd Rak\'at of Witr prayer after Surah Al-Fatihah, Surah recitation, and Takbeer.',
      reference: 'Ibn Abi Shaybah 6965, Al-Bayhaqi',
    },
  ];
}

export function getLocalizedNaflPrayers(lang: ZikrLanguage): LocalizedNaflPrayer[] {
  if (lang === 'bn') {
    return [
      {
        title: 'তাহাজ্জুদ নামাজ (সালাতুল লাইল)',
        rakats: '২ থেকে ১২ রাকাত (প্রতি দুই রাকাতে সালাম)',
        time: 'রাতের শেষ তৃতীয়াংশে (ফজরের পূর্ব পর্যন্ত)',
        benefit: 'ফরজ নামাজের পর সর্বোত্তম নামাজ। আল্লাহ এ সময়ে বান্দার দোয়া কবুল করেন।',
        steps: 'সাধারণ নামাজের মতোই দুই দুই রাকাত করে আদায় করতে হয়। দীর্ঘ কিরাত ও সিজদা উত্তম।',
      },
      {
        title: 'ইশরাক নামাজ',
        rakats: '২ থেকে ৪ রাকাত',
        time: 'সূর্যোদয়ের আনুমানিক ১৫-২০ মিনিট পর থেকে',
        benefit: 'ফজর পড়ে বসে জিকির করে ইশরাক পড়লে একটি কবুল হজ ও ওমরার সওয়াব মেলে (তিরমিজি ৫৮৬)।',
        steps: 'দুই রাকাত করে সাধারণ নফল নামাজের মতো নিয়ত করে আদায় করবেন।',
      },
      {
        title: 'চাশতের নামাজ (সালাতুদ দুহা)',
        rakats: '২, ৪, ৮ বা ১২ রাকাত',
        time: 'বেলা বাড়ার পর থেকে দ্বিপ্রহরের পূর্ব পর্যন্ত',
        benefit: 'শরীরের ৩৬০টি জোড়ার সদকাহ হিসেবে গণ্য হয়। জীবিকায় প্রাচুর্য ও বরকত লাভ হয়।',
        steps: 'দুই দুই রাকাত করে আদায় করা সুন্নাত।',
      },
      {
        title: 'সালাতুত তাসবীহ (গুনাহ মাফের নামাজ)',
        rakats: '৪ রাকাত (মোট ৩০০ বার তাসবীহ)',
        time: 'নিষিদ্ধ সময় ব্যতীত দিন বা রাতের যেকোনো সময়ে',
        benefit: 'জীবনের পূর্বাপর, ছোট-বড়, গোপন-প্রকাশ্য সকল গুনাহ মাফ হওয়ার হাদিসে বর্ণনা রয়েছে (আবু দাউদ ১২৯৭)।',
        steps: 'প্রতি রাকাতে ৭৫ বার "সুবহানাল্লাহি ওয়াল হামদুলিল্লাহি ওয়া লা ইলাহা ইল্লাল্লাহু ওয়াল্লাহু আকবার" পাঠ করতে হয়: কিরাতের পর ১৫ বার, রুকুতে ১০ বার, রুকু থেকে দাঁড়িয়ে ১০ বার, ১ম সিজদায় ১০ বার, দুই সিজদার বৈঠকে ১০ বার, ২য় সিজদায় ১০ বার, ২য় সিজদা থেকে উঠে বসার পর ১০ বার।',
      },
      {
        title: 'সালাতুল হাজত (প্রয়োজন পূরণের নামাজ)',
        rakats: '২ রাকাত',
        time: 'যেকোনো বৈধ সময়ে',
        benefit: 'আল্লাহর কাছে অথবা কোনো মানুষের কাছে কোনো প্রয়োজনীয়তা দেখা দিলে এ নামাজ পড়ে দোয়া করা হয়।',
        steps: 'উত্তমরূপে অজু করে ২ রাকাত নামাজ পড়ে আল্লাহর প্রশংসা ও দরূদ শরিফ পাঠ করে নিজের হাজত পেশ করবেন।',
      },
      {
        title: 'সালাতুল ইস্তিখারা (সিদ্ধান্ত গ্রহণের নামাজ)',
        rakats: '২ রাকাত',
        time: 'যেকোনো গুরুত্বপূর্ণ সিদ্ধান্ত গ্রহণের পূর্বে',
        benefit: 'কোন কাজটি কল্যাণকর হবে সে ব্যাপারে মহান আল্লাহর কাছে দিকনির্দেশনা ও বরকত প্রার্থনা।',
        steps: '২ রাকাত নফল নামাজ পড়ে হাদিসে বর্ণিত সুনির্দিষ্ট ইস্তিখারার দোয়া পাঠ করবেন।',
      },
    ];
  }

  // English & other language fallback
  return [
    {
      title: 'Tahajjud Prayer (Salat al-Layl)',
      rakats: '2 to 12 Rak\'ats (Salam every 2 rak\'ats)',
      time: 'Last third of the night until before Fajr',
      benefit: 'The most virtuous prayer after the obligatory prayers. Allah descends to the lowest heaven and answers the supplications of His servants.',
      steps: 'Offered in units of 2 rak\'ats like normal voluntary prayer. Long Quranic recitation and prolonged prostrations are highly recommended.',
    },
    {
      title: 'Ishraq Prayer',
      rakats: '2 to 4 Rak\'ats',
      time: 'Approximately 15-20 minutes after sunrise',
      benefit: 'Remaining seated after Fajr in Dhikr and offering Ishraq yields the spiritual reward of a complete Hajj and Umrah (Tirmidhi 586).',
      steps: 'Offer 2 rak\'ats with sincere intention like ordinary voluntary prayer.',
    },
    {
      title: 'Duha Prayer (Chast / Mid-Morning)',
      rakats: '2, 4, 8, or 12 Rak\'ats',
      time: 'From mid-morning until just before zenith (Zawal)',
      benefit: 'Serves as charity for all 360 joints of the human body, attracting divine blessings and abundance in provision.',
      steps: 'Prayed in pairs of 2 rak\'ats as established in the authentic Sunnah.',
    },
    {
      title: 'Salat al-Tasbeeh (Prayer of Forgiveness)',
      rakats: '4 Rak\'ats (300 total tasbeehs)',
      time: 'Any time of day or night (except prohibited hours)',
      benefit: 'Authentic narrations promise complete forgiveness for all past, present, major, minor, secret, and open sins (Abu Dawud 1297).',
      steps: 'Recite 75 times per rak\'at: "Subhanallahi wal-hamdulillahi wa la ilaha illallahu wallahu Akbar" (15 times after Qirat, 10 in Ruku, 10 standing in Qawmah, 10 in 1st Sajdah, 10 in sitting Jalsa, 10 in 2nd Sajdah, and 10 in sitting before rising).',
    },
    {
      title: 'Salat al-Hajat (Prayer of Need)',
      rakats: '2 Rak\'ats',
      time: 'Any permissible time',
      benefit: 'Supplicating for relief and fulfillment when faced with any urgent personal or communal need from Allah.',
      steps: 'Perform thorough ablution, pray 2 rak\'ats with deep humility, praise Allah, send blessings upon the Prophet (ﷺ), and present your need.',
    },
    {
      title: 'Salat al-Istikhara (Prayer for Guidance)',
      rakats: '2 Rak\'ats',
      time: 'Before making any significant decision',
      benefit: 'Seeking divine guidance, goodness, and blessing from Allah regarding life decisions.',
      steps: 'Pray 2 voluntary rak\'ats, followed by reciting the specific prophetic Dua of Istikhara with conviction.',
    },
  ];
}

export function getLocalizedQazaItems(lang: ZikrLanguage): LocalizedQazaItem[] {
  if (lang === 'bn') {
    return [
      { key: 'fajr', label: 'ফজর কাজা (২ রাকাত ফরজ)' },
      { key: 'dhuhr', label: 'যোহর কাজা (৪ রাকাত ফরজ)' },
      { key: 'asr', label: 'আসর কাজা (৪ রাকাত ফরজ)' },
      { key: 'maghrib', label: 'মাগরিব কাজা (৩ রাকাত ফরজ)' },
      { key: 'isha', label: 'এশা কাজা (৪ রাকাত ফরজ)' },
      { key: 'witr', label: 'বিতর কাজা (৩ রাকাত ওয়াজিব)' },
    ];
  }

  return [
    { key: 'fajr', label: 'Fajr Qaza (2 Rak\'ats Fard)' },
    { key: 'dhuhr', label: 'Dhuhr Qaza (4 Rak\'ats Fard)' },
    { key: 'asr', label: 'Asr Qaza (4 Rak\'ats Fard)' },
    { key: 'maghrib', label: 'Maghrib Qaza (3 Rak\'ats Fard)' },
    { key: 'isha', label: 'Isha Qaza (4 Rak\'ats Fard)' },
    { key: 'witr', label: 'Witr Qaza (3 Rak\'ats Wajib)' },
  ];
}
