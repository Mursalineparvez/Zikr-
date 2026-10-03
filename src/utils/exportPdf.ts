import { ZikrItem, UserProfile } from '../types';
import { AamalDayLog } from '../types';

export type HistoryPeriodRange = '1day' | '1month' | '4months' | '1year' | '10years';

export interface AggregatedReportData {
  rangeType: HistoryPeriodRange;
  rangeLabel: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  activeDaysCount: number;
  totalDhikrSum: number;
  totalQuranPagesSum: number;
  avgCompletionRate: number;
  prayerStats: {
    fajr: number;
    dhuhr: number;
    asr: number;
    maghrib: number;
    isha: number;
    tahajjud: number;
    duha: number;
    fardhTotal: number;
  };
  otherDeedsStats: {
    quranDays: number;
    adhkarDays: number;
    salawatDays: number;
    istighfarDays: number;
    sadaqahDays: number;
    gratitudeDays: number;
  };
  zikrBreakdownMap: Record<
    string,
    {
      name: string;
      arabic?: string;
      totalCount: number;
      target?: number;
      percentageOfTotal: number;
    }
  >;
  dailyLogs: Array<{
    dateKey: string;
    dhikrCount: number;
    quranPagesRead: number;
    completedRatio: number;
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
    tahajjud: boolean;
    duha: boolean;
    reflectionNotes?: string;
  }>;
}

export function compileAggregatedReport(
  allLogs: Record<string, AamalDayLog>,
  rangeType: HistoryPeriodRange,
  selectedDayKey?: string,
  liveZikrs?: ZikrItem[]
): AggregatedReportData {
  const today = new Date();
  let startDateObj = new Date(today);
  let rangeLabel = '1 Month (বিগত ১ মাস)';

  if (rangeType === '1day') {
    rangeLabel = selectedDayKey ? `Selected Day (${selectedDayKey})` : 'Today (আজকের দিন)';
    if (selectedDayKey) {
      const [y, m, d] = selectedDayKey.split('-').map(Number);
      startDateObj = new Date(y, m - 1, d);
    }
  } else if (rangeType === '1month') {
    rangeLabel = '1 Month (বিগত ৩০ দিন / ১ মাস)';
    startDateObj.setDate(startDateObj.getDate() - 30);
  } else if (rangeType === '4months') {
    rangeLabel = '4 Months (বিগত ১২০ দিন / ৪ মাস)';
    startDateObj.setDate(startDateObj.getDate() - 120);
  } else if (rangeType === '1year') {
    rangeLabel = '1 Year (বিগত ৩৬৫ দিন / ১ বছর)';
    startDateObj.setDate(startDateObj.getDate() - 365);
  } else if (rangeType === '10years') {
    rangeLabel = '10 Years / All-time Lifetime (১০ বছর / সর্বমোট হিস্ট্রি)';
    startDateObj.setFullYear(startDateObj.getFullYear() - 10);
  }

  const startKey = startDateObj.toISOString().split('T')[0];
  const endKey = rangeType === '1day' ? (selectedDayKey || today.toISOString().split('T')[0]) : today.toISOString().split('T')[0];

  // Filter keys in date range
  const allDateKeys = Object.keys(allLogs).sort();
  let relevantKeys = allDateKeys.filter((k) => k >= startKey && k <= endKey);

  if (rangeType === '1day') {
    relevantKeys = [selectedDayKey || endKey];
  } else if (relevantKeys.length === 0) {
    relevantKeys = [endKey];
  }

  let totalDhikrSum = 0;
  let totalQuranPagesSum = 0;
  let totalCompletionSum = 0;
  let activeDaysCount = 0;

  const prayerStats = {
    fajr: 0,
    dhuhr: 0,
    asr: 0,
    maghrib: 0,
    isha: 0,
    tahajjud: 0,
    duha: 0,
    fardhTotal: 0,
  };

  const otherDeedsStats = {
    quranDays: 0,
    adhkarDays: 0,
    salawatDays: 0,
    istighfarDays: 0,
    sadaqahDays: 0,
    gratitudeDays: 0,
  };

  const zikrMap: Record<
    string,
    { name: string; arabic?: string; totalCount: number; target?: number; percentageOfTotal: number }
  > = {};

  // Initialize with live common zikrs if available
  if (liveZikrs) {
    liveZikrs.forEach((z) => {
      zikrMap[z.name] = {
        name: z.name,
        arabic: z.arabic,
        target: z.target,
        totalCount: 0,
        percentageOfTotal: 0,
      };
    });
  }

  const dailyLogs: AggregatedReportData['dailyLogs'] = [];

  relevantKeys.forEach((k) => {
    const log = allLogs[k] || {
      dateKey: k,
      items: [],
      quranPagesRead: 0,
      dhikrCount: 0,
      completedRatio: 0,
    };

    const dCount = log.dhikrCount || 0;
    const qPages = log.quranPagesRead || 0;
    const cRatio = log.completedRatio || 0;

    totalDhikrSum += dCount;
    totalQuranPagesSum += qPages;
    totalCompletionSum += cRatio;

    if (dCount > 0 || qPages > 0 || cRatio > 0) {
      activeDaysCount++;
    }

    const itemMap = new Map((log.items || []).map((i) => [i.id, i.completed]));

    const isFajr = !!itemMap.get('fajr');
    const isDhuhr = !!itemMap.get('dhuhr');
    const isAsr = !!itemMap.get('asr');
    const isMaghrib = !!itemMap.get('maghrib');
    const isIsha = !!itemMap.get('isha');
    const isTahajjud = !!itemMap.get('tahajjud');
    const isDuha = !!itemMap.get('duha');

    if (isFajr) prayerStats.fajr++;
    if (isDhuhr) prayerStats.dhuhr++;
    if (isAsr) prayerStats.asr++;
    if (isMaghrib) prayerStats.maghrib++;
    if (isIsha) prayerStats.isha++;
    if (isTahajjud) prayerStats.tahajjud++;
    if (isDuha) prayerStats.duha++;

    if (itemMap.get('quran_recitation')) otherDeedsStats.quranDays++;
    if (itemMap.get('morning_evening_adhkar')) otherDeedsStats.adhkarDays++;
    if (itemMap.get('salawat_prophet')) otherDeedsStats.salawatDays++;
    if (itemMap.get('istighfar_100')) otherDeedsStats.istighfarDays++;
    if (itemMap.get('sadaqah_kindness')) otherDeedsStats.sadaqahDays++;
    if (itemMap.get('gratitude_reflection')) otherDeedsStats.gratitudeDays++;

    // Aggregate zikrs breakdown
    if (log.zikrBreakdown && Array.isArray(log.zikrBreakdown)) {
      log.zikrBreakdown.forEach((zb) => {
        if (!zikrMap[zb.name]) {
          zikrMap[zb.name] = {
            name: zb.name,
            arabic: zb.arabic,
            target: zb.target,
            totalCount: 0,
            percentageOfTotal: 0,
          };
        }
        zikrMap[zb.name].totalCount += zb.count || 0;
        if (zb.arabic && !zikrMap[zb.name].arabic) zikrMap[zb.name].arabic = zb.arabic;
      });
    }

    dailyLogs.push({
      dateKey: k,
      dhikrCount: dCount,
      quranPagesRead: qPages,
      completedRatio: cRatio,
      fajr: isFajr,
      dhuhr: isDhuhr,
      asr: isAsr,
      maghrib: isMaghrib,
      isha: isIsha,
      tahajjud: isTahajjud,
      duha: isDuha,
      reflectionNotes: log.reflectionNotes,
    });
  });

  prayerStats.fardhTotal =
    prayerStats.fajr + prayerStats.dhuhr + prayerStats.asr + prayerStats.maghrib + prayerStats.isha;

  // Calculate percentages
  Object.keys(zikrMap).forEach((name) => {
    zikrMap[name].percentageOfTotal =
      totalDhikrSum > 0 ? Math.round((zikrMap[name].totalCount / totalDhikrSum) * 100) : 0;
  });

  const totalDays = Math.max(1, relevantKeys.length);
  const avgCompletionRate = Math.round((totalCompletionSum / totalDays) * 100);

  return {
    rangeType,
    rangeLabel,
    startDate: startKey,
    endDate: endKey,
    totalDays,
    activeDaysCount,
    totalDhikrSum,
    totalQuranPagesSum,
    avgCompletionRate,
    prayerStats,
    otherDeedsStats,
    zikrBreakdownMap: zikrMap,
    dailyLogs: dailyLogs.reverse(), // most recent first
  };
}

/**
 * Generate and download a beautifully styled PDF document report for any chosen time period
 */
export async function generateComprehensiveHistoryPdfReport(
  reportData: AggregatedReportData,
  userProfile?: UserProfile
): Promise<boolean> {
  const container = document.createElement('div');
  container.id = 'temp-comprehensive-pdf-container';
  container.style.position = 'fixed';
  container.style.left = '-9999px';
  container.style.top = '0';
  container.style.width = '800px';
  container.style.backgroundColor = '#ffffff';
  container.style.color = '#0f172a';
  container.style.fontFamily = "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif";
  container.style.padding = '32px 36px';
  container.style.boxSizing = 'border-box';

  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const zikrList = Object.values(reportData.zikrBreakdownMap).filter(
    (z) => z.totalCount > 0 || reportData.totalDays <= 1
  );

  const zikrRowsHtml = zikrList
    .map(
      (z, idx) => `
      <tr style="border-bottom: 1px solid #e2e8f0; background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
        <td style="padding: 10px 12px; font-size: 12px; color: #64748b; font-weight: 600; text-align: center;">${idx + 1}</td>
        <td style="padding: 10px 12px;">
          <div style="font-weight: 700; font-size: 13px; color: #064e3b;">${z.name}</div>
        </td>
        <td style="padding: 10px 12px; text-align: right; direction: rtl; font-family: 'Amiri', serif; font-size: 17px; color: #047857; font-weight: 700;">
          ${z.arabic || '-'}
        </td>
        <td style="padding: 10px 12px; text-align: right; font-size: 15px; font-weight: 800; color: #0f172a;">
          ${z.totalCount.toLocaleString()} বার
        </td>
        <td style="padding: 10px 12px; text-align: right; font-size: 12px; font-weight: 700; color: #0d9488;">
          ${z.percentageOfTotal}%
        </td>
      </tr>
    `
    )
    .join('');

  // Daily ledger sample (up to 30 rows in print to prevent overwhelming page sizes)
  const maxTableRows = Math.min(35, reportData.dailyLogs.length);
  const sampleLogs = reportData.dailyLogs.slice(0, maxTableRows);

  const dailyRowsHtml = sampleLogs
    .map(
      (d, idx) => `
      <tr style="border-bottom: 1px solid #e2e8f0; font-size: 11px; background-color: ${idx % 2 === 0 ? '#ffffff' : '#f8fafc'};">
        <td style="padding: 8px 10px; font-weight: 700; color: #1e293b;">${d.dateKey}</td>
        <td style="padding: 8px 6px; text-align: center; color: ${d.fajr ? '#059669' : '#cbd5e1'}; font-weight: bold;">${d.fajr ? '✓' : '—'}</td>
        <td style="padding: 8px 6px; text-align: center; color: ${d.dhuhr ? '#059669' : '#cbd5e1'}; font-weight: bold;">${d.dhuhr ? '✓' : '—'}</td>
        <td style="padding: 8px 6px; text-align: center; color: ${d.asr ? '#059669' : '#cbd5e1'}; font-weight: bold;">${d.asr ? '✓' : '—'}</td>
        <td style="padding: 8px 6px; text-align: center; color: ${d.maghrib ? '#059669' : '#cbd5e1'}; font-weight: bold;">${d.maghrib ? '✓' : '—'}</td>
        <td style="padding: 8px 6px; text-align: center; color: ${d.isha ? '#059669' : '#cbd5e1'}; font-weight: bold;">${d.isha ? '✓' : '—'}</td>
        <td style="padding: 8px 8px; text-align: center; color: #0284c7; font-weight: 700;">${d.quranPagesRead || 0}</td>
        <td style="padding: 8px 10px; text-align: right; font-weight: 800; color: #047857;">${(d.dhikrCount || 0).toLocaleString()}</td>
        <td style="padding: 8px 10px; text-align: right; font-weight: 700; color: #0d9488;">${Math.round((d.completedRatio || 0) * 100)}%</td>
      </tr>
    `
    )
    .join('');

  container.innerHTML = `
    <div style="border: 2px solid #059669; border-radius: 16px; padding: 24px; background: #ffffff;">
      <!-- Bismillah & Header -->
      <div style="text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 16px; margin-bottom: 20px;">
        <div style="font-family: 'Amiri', serif; font-size: 24px; color: #064e3b; margin-bottom: 4px; font-weight: 700;">
          بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
        </div>
        <h1 style="margin: 0; font-size: 20px; font-weight: 900; color: #064e3b; text-transform: uppercase; letter-spacing: 0.5px;">
          Zikr+ — Islamic Deeds &amp; Tasbeeh History Report
        </h1>
        <div style="display: flex; justify-content: center; gap: 16px; margin-top: 6px; font-size: 11px; color: #64748b;">
          <span><strong>Report Period:</strong> ${reportData.rangeLabel}</span>
          <span>•</span>
          <span><strong>Generated:</strong> ${dateFormatted}</span>
          ${userProfile?.name ? `<span>•</span><span><strong>User:</strong> ${userProfile.name} (Verified)</span>` : ''}
        </div>
      </div>

      <!-- Grand Summary Highlight Cards -->
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 20px;">
        <div style="background: linear-gradient(135deg, #064e3b 0%, #047857 100%); padding: 14px; border-radius: 12px; color: #ffffff; text-align: center;">
          <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 1px; opacity: 0.85;">Total Dhikrs (সর্বমোট জিকির)</div>
          <div style="font-size: 24px; font-weight: 900; color: #fef08a; margin-top: 2px;">${reportData.totalDhikrSum.toLocaleString()}</div>
          <div style="font-size: 10px; color: #a7f3d0;">Grand Sum</div>
        </div>

        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; padding: 14px; border-radius: 12px; text-align: center;">
          <div style="font-size: 10px; text-transform: uppercase; color: #166534; font-weight: 700;">Fardh Salah (৫ ওয়াক্ত নামাজ)</div>
          <div style="font-size: 24px; font-weight: 900; color: #15803d; margin-top: 2px;">${reportData.prayerStats.fardhTotal}</div>
          <div style="font-size: 10px; color: #166534;">Completed Prayers</div>
        </div>

        <div style="background: #f0f9ff; border: 1px solid #bae6fd; padding: 14px; border-radius: 12px; text-align: center;">
          <div style="font-size: 10px; text-transform: uppercase; color: #0369a1; font-weight: 700;">Quran Pages (কুরআন পৃষ্ঠা)</div>
          <div style="font-size: 24px; font-weight: 900; color: #0284c7; margin-top: 2px;">${reportData.totalQuranPagesSum}</div>
          <div style="font-size: 10px; color: #0369a1;">Total Pages Read</div>
        </div>

        <div style="background: #fefce8; border: 1px solid #fef08a; padding: 14px; border-radius: 12px; text-align: center;">
          <div style="font-size: 10px; text-transform: uppercase; color: #854d0e; font-weight: 700;">Avg Completion (গড় আমল)</div>
          <div style="font-size: 24px; font-weight: 900; color: #ca8a04; margin-top: 2px;">${reportData.avgCompletionRate}%</div>
          <div style="font-size: 10px; color: #854d0e;">${reportData.activeDaysCount} Days Active</div>
        </div>
      </div>

      <!-- Individual Zikr Sum Table -->
      <div style="margin-bottom: 20px;">
        <h3 style="font-size: 13px; font-weight: 800; color: #064e3b; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.5px;">
          1. Zikr Breakdown & Grand Sum (কোন জিকির কতবার ও মোট যোগফল)
        </h3>
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="background-color: #042f2e; color: #ffffff;">
              <th style="padding: 8px 10px; font-size: 11px; text-align: center;">#</th>
              <th style="padding: 8px 10px; font-size: 11px;">Zikr Name (জিকিরের নাম)</th>
              <th style="padding: 8px 10px; font-size: 11px; text-align: right;">Arabic</th>
              <th style="padding: 8px 10px; font-size: 11px; text-align: right;">Total Count (মোট সংখ্যা)</th>
              <th style="padding: 8px 10px; font-size: 11px; text-align: right;">Share %</th>
            </tr>
          </thead>
          <tbody>
            ${zikrRowsHtml || '<tr><td colspan="5" style="padding: 10px; text-align: center; color: #64748b;">No zikr counted yet</td></tr>'}
          </tbody>
          <tfoot>
            <tr style="background-color: #f1f5f9; font-weight: 900; border-top: 2px solid #cbd5e1;">
              <td colspan="3" style="padding: 10px 12px; text-align: right; font-size: 12px; color: #0f172a;">
                Grand Total Sum (সর্বমোট জিকির যোগফল):
              </td>
              <td style="padding: 10px 12px; text-align: right; font-size: 15px; color: #064e3b;">
                ${reportData.totalDhikrSum.toLocaleString()} বার
              </td>
              <td style="padding: 10px 12px; text-align: right; font-size: 12px; color: #064e3b;">
                100%
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- Daily Activity & Prayer Ledger -->
      <div style="margin-bottom: 20px;">
        <h3 style="font-size: 13px; font-weight: 800; color: #064e3b; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.5px;">
          2. Daily Deeds & Salah Records (দৈনিক ৫ ওয়াক্ত নামাজ ও আমল রেকর্ড)
        </h3>
        <table style="width: 100%; border-collapse: collapse; text-align: left;">
          <thead>
            <tr style="background-color: #134e4a; color: #ffffff; font-size: 10px;">
              <th style="padding: 6px 8px;">Date (তারিখ)</th>
              <th style="padding: 6px 4px; text-align: center;">Fajr</th>
              <th style="padding: 6px 4px; text-align: center;">Dhuhr</th>
              <th style="padding: 6px 4px; text-align: center;">Asr</th>
              <th style="padding: 6px 4px; text-align: center;">Maghrib</th>
              <th style="padding: 6px 4px; text-align: center;">Isha</th>
              <th style="padding: 6px 6px; text-align: center;">Quran</th>
              <th style="padding: 6px 8px; text-align: right;">Zikr Count</th>
              <th style="padding: 6px 8px; text-align: right;">Rate %</th>
            </tr>
          </thead>
          <tbody>
            ${dailyRowsHtml}
          </tbody>
        </table>
        ${reportData.dailyLogs.length > maxTableRows ? `<div style="font-size: 10px; color: #64748b; margin-top: 4px; text-align: right;">* Showing latest ${maxTableRows} days of ${reportData.dailyLogs.length} total days.</div>` : ''}
      </div>

      <!-- Footer & Quranic Verse -->
      <div style="border-top: 1px solid #e2e8f0; padding-top: 14px; text-align: center;">
        <div style="font-family: 'Amiri', serif; font-size: 15px; color: #047857; margin-bottom: 2px;">
          أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ
        </div>
        <div style="font-size: 11px; color: #64748b; font-style: italic;">
          "Verily, in the remembrance of Allah do hearts find rest." — Surah Ar-Ra'd (13:28)
        </div>
        <div style="font-size: 9px; color: #94a3b8; margin-top: 6px;">
          Zikr+ Digital Islamic Companion • 100% Offline &amp; Private Archive
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  const html2pdf = (window as unknown as { html2pdf?: () => any }).html2pdf;

  if (html2pdf) {
    const opt = {
      margin: [6, 6, 6, 6],
      filename: `Zikr+-History-${reportData.rangeType}-${now.toISOString().slice(0, 10)}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
        scrollY: 0,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
      },
    };

    try {
      await html2pdf().set(opt).from(container).save();
      return true;
    } catch (err) {
      console.warn('html2pdf error, triggering direct print fallback:', err);
    } finally {
      if (document.body.contains(container)) {
        document.body.removeChild(container);
      }
    }
  }

  // Robust Direct Print-to-PDF Fallback
  const printWin = window.open('', '_blank');
  if (printWin) {
    printWin.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Zikr+ Report - ${reportData.rangeLabel}</title>
          <style>
            body { margin: 0; padding: 20px; font-family: system-ui, sans-serif; }
            @media print {
              body { padding: 0; }
              @page { size: A4; margin: 10mm; }
            }
          </style>
        </head>
        <body>
          ${container.innerHTML}
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWin.document.close();
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
    return true;
  }

  if (document.body.contains(container)) {
    document.body.removeChild(container);
  }
  return false;
}

export async function generateZikrPdfReport(zikrs: ZikrItem[], masterTotal: number): Promise<boolean> {
  const dummyLogs: Record<string, AamalDayLog> = {
    [new Date().toISOString().split('T')[0]]: {
      dateKey: new Date().toISOString().split('T')[0],
      items: [],
      quranPagesRead: 0,
      dhikrCount: masterTotal,
      zikrBreakdown: zikrs.map((z) => ({
        name: z.name,
        arabic: z.arabic,
        count: z.count,
        target: z.target,
      })),
      completedRatio: 1,
    },
  };

  const reportData = compileAggregatedReport(dummyLogs, '1day', undefined, zikrs);
  return generateComprehensiveHistoryPdfReport(reportData);
}
