/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ZikrLanguage } from '../types';

function createProxy<T extends Record<string | number, any>>(dict: T): T {
  const proxyDict: any = {};
  for (const [key, val] of Object.entries(dict)) {
    if (val && typeof val === 'object') {
      proxyDict[key] = new Proxy(val, {
        get(target: any, prop: string) {
          if (typeof prop === 'string' && prop in target && target[prop] !== undefined) {
            return target[prop];
          }
          return target['en'] ?? target['bn'] ?? target['ar'] ?? '';
        },
      });
    } else {
      proxyDict[key] = val;
    }
  }
  return new Proxy(proxyDict, {
    get(target: any, prop: string) {
      if (typeof prop === 'string' && prop in target) {
        return target[prop];
      }
      return new Proxy({}, {
        get() {
          return '';
        },
      });
    },
  }) as T;
}

export const ZIKIR_UI: Record<string, Record<string, string>> = createProxy({
  centralMasterCounter: {
    bn: 'কেন্দ্রীয় মাস্টার কাউন্টার • সর্বমোট তাসবীহ',
    en: 'Central Master Counter • Total Tasbeeh',
    ar: 'العداد المركزي الموحد • إجمالي التسبيح',
    ur: 'مرکزی کاؤنٹر • کل تسبیحات',
    hi: 'सेंट्रल मास्टर काउंटर • कुल तस्बीह',
    id: 'Penghitung Utama • Total Tasbih',
    tr: 'Merkezi Sayaç • Toplam Tesbih',
  },
  goal200k: {
    bn: '২ লক্ষ পূরণ',
    en: '200k Goal',
    ar: 'هدف ٢٠٠ ألف',
    ur: '۲ لاکھ ہدف',
    hi: '२ लाख लक्ष्य',
    id: 'Target 200rb',
    tr: '200 bin Hedef',
  },
  addZikr: {
    bn: '+ জিকির যোগ',
    en: '+ Add Zikr',
    ar: '+ إضافة ذكر',
    ur: '+ ذکر شامل کریں',
    hi: '+ ज़िक्र जोड़ें',
    id: '+ Tambah Dzikir',
    tr: '+ Zikir Ekle',
  },
  focus: {
    bn: 'ফোকাস',
    en: 'Focus',
    ar: 'تركيز',
    ur: 'فوکس',
    hi: 'फ़ोकस',
    id: 'Fokus',
    tr: 'Odak',
  },
  reset: {
    bn: 'রিসেট',
    en: 'Reset',
    ar: 'إعادة ضبط',
    ur: 'ری سیٹ',
    hi: 'रीसेट',
    id: 'Reset',
    tr: 'Sıfırla',
  },
  realtimeSubtitle: {
    bn: 'সকল সক্রিয় যিকিরের তাৎক্ষণিক সর্বমোট সমষ্টি',
    en: 'Real-time aggregate total of all active zikrs',
    ur: 'تمام فعال اذکار کا مجموعی میزان',
    hi: 'सभी सक्रिय ज़िक्रों का वास्तविक कुल योग',
    id: 'Jumlah total kumulatif dari seluruh dzikir aktif',
    tr: 'Tüm aktif zikirlerin anlık toplam sayısı',
  },
  masterTasbeehCount: {
    bn: 'সর্বমোট তাসবীহ গণনা',
    en: 'Master Tasbeeh Count',
    ur: 'کل تسبیح کاؤنٹ',
    hi: 'मास्टर तस्बीह गणना',
    id: 'Hitungan Tasbih Utama',
    tr: 'Toplam Tesbih Sayısı',
  },
  todayDhikr: {
    bn: 'আজকের জিকির:',
    en: 'Today\'s Dhikr:',
    ur: 'آج کا ذکر:',
    hi: 'आज का ज़िक्र:',
    id: 'Dzikir Hari Ini:',
    tr: 'Bugünkü Zikir:',
  },
  totalDhikr: {
    bn: 'সর্বমোট জিকির:',
    en: 'Total Dhikr:',
    ur: 'کل ذکر:',
    hi: 'कुल ज़िक्र:',
    id: 'Total Dzikir:',
    tr: 'Toplam Zikir:',
  },
  goalsMet: {
    bn: 'লক্ষ্য পূরণ',
    en: 'Goals Met',
    ur: 'اہداف مکمل',
    hi: 'लक्ष्य पूर्ण',
    id: 'Target Tercapai',
    tr: 'Hedef Tamam',
  },
  saveSession: {
    bn: 'হিস্ট্রিতে সংরক্ষণ করুন',
    en: 'Save Session to History',
    ur: 'ہسٹری میں محفوظ کریں',
    hi: 'इतिहास में सहेजें',
    id: 'Simpan ke Riwayat',
    tr: 'Geçmişe Kaydet',
  },
  resetAll: {
    bn: 'সব রিসেট',
    en: 'Reset All',
    ur: 'سب ری سیٹ کریں',
    hi: 'सभी रीसेट करें',
    id: 'Atur Ulang Semua',
    tr: 'Tümünü Sıfırla',
  },
  commonZikr: {
    bn: 'সাধারণ যিকির',
    en: 'Common Zikr',
    ur: 'عام اذکار',
    hi: 'सामान्य ज़िक्र',
    id: 'Dzikir Umum',
    tr: 'Yaygın Zikirler',
  },
  commonZikr12: {
    bn: '(১২টি প্রধান যিকির)',
    en: '(12 Essential Zikrs)',
    ur: '(۱۲ اہم اذکار)',
    hi: '(12 मुख्य ज़िक्र)',
    id: '(12 Dzikir Utama)',
    tr: '(12 Temel Zikir)',
  },
  resetDefaults: {
    bn: '১২টি যিকির রিসেট',
    en: 'Reset Defaults',
    ur: 'طے شدہ اذکار بحال کریں',
    hi: 'डिफ़ॉल्ट रीसेट करें',
    id: 'Kembalikan Dzikir Awal',
    tr: 'Varsayılanları Sıfırla',
  },
  exportPdf: {
    bn: 'PDF রিপোর্ট',
    en: 'PDF Report',
    ur: 'پی ڈی ایف رپورٹ',
    hi: 'पीडीएफ रिपोर्ट',
    id: 'Laporan PDF',
    tr: 'PDF Raporu',
  },
  all: {
    bn: 'সকল',
    en: 'All',
    ur: 'تمام',
    hi: 'सभी',
    id: 'Semua',
    tr: 'Tümü',
  },
  withTarget: {
    bn: 'লক্ষ্যসহ',
    en: 'With Target',
    ur: 'ہدف کے ساتھ',
    hi: 'लक्ष्य सहित',
    id: 'Dengan Target',
    tr: 'Hedefli',
  },
  completedFilter: {
    bn: 'সম্পন্ন',
    en: 'Completed',
    ur: 'مکمل',
    hi: 'पूर्ण',
    id: 'Selesai',
    tr: 'Tamamlanan',
  },
  meaningLabel: {
    bn: 'অর্থ: ',
    en: 'Meaning: ',
    ur: 'ترجمہ: ',
    hi: 'अर्थ: ',
    id: 'Arti: ',
    tr: 'Anlamı: ',
  },
});
