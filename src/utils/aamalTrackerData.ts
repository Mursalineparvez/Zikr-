import { AamalCheckItem, AamalDayLog } from '../types';

export const DEFAULT_AAMAL_ITEMS: Omit<AamalCheckItem, 'completed'>[] = [
  // 5 Prescribed Prayers
  {
    id: 'fajr',
    label: 'Fajr Prayer (صلاة الفجر)',
    category: 'prayer',
    arabicLabel: 'الفجر',
    points: 20,
    details: '2 Sunnah + 2 Fardh prayed on time before sunrise',
  },
  {
    id: 'dhuhr',
    label: 'Dhuhr Prayer (صلاة الظهر)',
    category: 'prayer',
    arabicLabel: 'الظهر',
    points: 20,
    details: '4 Fardh (+ Sunnah before & after)',
  },
  {
    id: 'asr',
    label: 'Asr Prayer (صلاة العصر)',
    category: 'prayer',
    arabicLabel: 'العصر',
    points: 20,
    details: '4 Fardh prayed on time in the afternoon',
  },
  {
    id: 'maghrib',
    label: 'Maghrib Prayer (صلاة المغرب)',
    category: 'prayer',
    arabicLabel: 'المغرب',
    points: 20,
    details: '3 Fardh (+ 2 Sunnah after)',
  },
  {
    id: 'isha',
    label: 'Isha & Witr (صلاة العشاء والوتر)',
    category: 'prayer',
    arabicLabel: 'العشاء',
    points: 20,
    details: '4 Fardh + 2 Sunnah + Witr before sleeping',
  },

  // Daily Sunnah & Nawafil
  {
    id: 'tahajjud',
    label: 'Tahajjud / Qiyam al-Layl (قيام الليل)',
    category: 'sunnah',
    arabicLabel: 'التهجد',
    points: 15,
    details: 'Voluntary night prayer in the last third of the night',
  },
  {
    id: 'duha',
    label: 'Duha Prayer (صلاة الضحى)',
    category: 'sunnah',
    arabicLabel: 'الضحى',
    points: 10,
    details: '2 or 4 rak\'ahs mid-morning charity for 360 joints',
  },

  // Quran & Sacred Remembrance
  {
    id: 'quran_recitation',
    label: 'Daily Quran Tilawah (تلاوة القرآن)',
    category: 'quran',
    arabicLabel: 'القرآن',
    points: 15,
    details: 'Recite at least 1 Rub/Hizb or Surah Al-Mulk',
  },
  {
    id: 'morning_evening_adhkar',
    label: 'Morning & Evening Adhkar (أذكار الصباح والمساء)',
    category: 'dhikr',
    arabicLabel: 'الأذكار',
    points: 15,
    details: 'Protective fortress adhkar from Hisnul Muslim',
  },
  {
    id: 'salawat_prophet',
    label: '100x Salawat upon Prophet ﷺ (الصلاة على النبي)',
    category: 'dhikr',
    arabicLabel: 'الصلاة على النبي',
    points: 10,
    details: 'Allāhumma ṣalli \'alā Sayyidinā Muḥammad',
  },
  {
    id: 'istighfar_100',
    label: '100x Daily Istighfar (الاستغفار اليومي)',
    category: 'dhikr',
    arabicLabel: 'الاستغفار',
    points: 10,
    details: 'Astaghfirullāha wa atūbu ilayh',
  },

  // Charity & Akhlaq
  {
    id: 'sadaqah_kindness',
    label: 'Daily Sadaqah or Act of Mercy (صدقة وإحسان)',
    category: 'charity',
    arabicLabel: 'الصدقة',
    points: 10,
    details: 'Monetary charity, feeding someone, or bringing joy to a family member',
  },
  {
    id: 'gratitude_reflection',
    label: 'Gratitude & Contemplation (شكر النعم)',
    category: 'character',
    arabicLabel: 'الشكر',
    points: 10,
    details: 'Consciously thanking Allah for 3 specific blessings today',
  },
];

export function getTodayDateKey(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function createInitialDayLog(dateKey: string = getTodayDateKey()): AamalDayLog {
  const items: AamalCheckItem[] = DEFAULT_AAMAL_ITEMS.map((item) => ({
    ...item,
    completed: false,
  }));

  return {
    dateKey,
    items,
    quranPagesRead: 0,
    dhikrCount: 0,
    reflectionNotes: '',
    completedRatio: 0,
  };
}

export function getAamalLogForDate(dateKey: string): AamalDayLog {
  try {
    const raw = localStorage.getItem(`zikrmate_aamal_${dateKey}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.items)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to get aamal log for date', dateKey, e);
  }
  return createInitialDayLog(dateKey);
}

export function saveAamalLogForDate(dateKey: string, log: AamalDayLog): void {
  try {
    localStorage.setItem(`zikrmate_aamal_${dateKey}`, JSON.stringify(log));
  } catch (e) {
    console.error('Failed to save aamal log for date', dateKey, e);
  }
}

export function getAllAamalLogs(): Record<string, AamalDayLog> {
  const logs: Record<string, AamalDayLog> = {};
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('zikrmate_aamal_')) {
        const dateKey = key.replace('zikrmate_aamal_', '');
        const raw = localStorage.getItem(key);
        if (raw) {
          try {
            logs[dateKey] = JSON.parse(raw);
          } catch {}
        }
      }
    }
  } catch (e) {
    console.error('Failed to iterate aamal logs', e);
  }
  return logs;
}

export function downloadFile(content: string, fileName: string, contentType: string) {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportAamalHistoryToCsv(monthFilter?: string): void {
  const allLogs = getAllAamalLogs();
  const sortedDates = Object.keys(allLogs).sort().reverse();
  const filteredDates = monthFilter
    ? sortedDates.filter((d) => d.startsWith(monthFilter))
    : sortedDates;

  if (filteredDates.length === 0) {
    filteredDates.push(getTodayDateKey());
    allLogs[getTodayDateKey()] = getAamalLogForDate(getTodayDateKey());
  }

  const headers = [
    'Date (তারিখ)',
    'Total Completed Amals',
    'Completion Rate (%)',
    'Fajr (ফজর)',
    'Dhuhr (যোহর)',
    'Asr (আসর)',
    'Maghrib (মাগরিব)',
    'Isha (এশা)',
    'Tahajjud (তাহাজ্জুদ)',
    'Duha (চাশত)',
    'Quran Recitation (কুরআন তিলাওয়াত)',
    'Adhkar (সকাল-সন্ধ্যার জিকির)',
    '100x Salawat (দরুদ শরীফ)',
    '100x Istighfar (ইস্তিগফার)',
    'Sadaqah (সদকা ও দান)',
    'Gratitude / Shukr (শুকরিয়া)',
    'Total Zikr Count (সর্বমোট জিকির)',
    'Detailed Zikr Breakdown (কোন জিকির কত বার)',
    'Reflection Notes (মন্তব্য / অনুচিন্তা)',
  ];

  const rows = filteredDates.map((date) => {
    const log = allLogs[date] || createInitialDayLog(date);
    const itemMap = new Map(log.items.map((i) => [i.id, i.completed ? 'YES' : 'NO']));
    const completedCount = log.items.filter((i) => i.completed).length;
    const rate = Math.round((completedCount / (log.items.length || 1)) * 100);

    const safeNotes = `"${(log.reflectionNotes || '').replace(/"/g, '""')}"`;
    const zikrDetailsStr = log.zikrBreakdown && log.zikrBreakdown.length > 0
      ? `"${log.zikrBreakdown
          .filter((z) => z.count > 0)
          .map((z) => `${z.name} (${z.arabic || ''}): ${z.count} বার`)
          .join('; ')}"`
      : `"${log.dhikrCount > 0 ? `Total Zikrs: ${log.dhikrCount}` : 'None'}"`;

    return [
      date,
      `${completedCount}/${log.items.length}`,
      `${rate}%`,
      itemMap.get('fajr') || 'NO',
      itemMap.get('dhuhr') || 'NO',
      itemMap.get('asr') || 'NO',
      itemMap.get('maghrib') || 'NO',
      itemMap.get('isha') || 'NO',
      itemMap.get('tahajjud') || 'NO',
      itemMap.get('duha') || 'NO',
      itemMap.get('quran_recitation') || 'NO',
      itemMap.get('morning_evening_adhkar') || 'NO',
      itemMap.get('salawat_prophet') || 'NO',
      itemMap.get('istighfar_100') || 'NO',
      itemMap.get('sadaqah_kindness') || 'NO',
      itemMap.get('gratitude_reflection') || 'NO',
      log.dhikrCount || 0,
      zikrDetailsStr,
      safeNotes,
    ].join(',');
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
  const fileName = `ZikrMate_Amal_History_${monthFilter || 'Full'}.csv`;
  downloadFile(csvContent, fileName, 'text/csv;charset=utf-8;');
}

export function exportAamalHistoryToJson(): void {
  const allLogs = getAllAamalLogs();
  const jsonContent = JSON.stringify(allLogs, null, 2);
  const fileName = `ZikrMate_Amal_Backup_${getTodayDateKey()}.json`;
  downloadFile(jsonContent, fileName, 'application/json');
}

