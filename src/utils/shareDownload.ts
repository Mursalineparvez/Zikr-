import { ZikrLanguage } from '../types';

export interface ShareableMetaItem {
  label: string;
  value: string;
}

export interface ShareableContent {
  id?: string;
  badge?: string;
  title: string;
  subtitle?: string;
  arabic?: string;
  transliteration?: string;
  body: string;
  highlights?: string[];
  meta?: ShareableMetaItem[];
  reference?: string;
  fullDocumentText?: string;
  fileNamePrefix?: string;
}

export function sanitizeFileName(name: string): string {
  const cleaned = (name || 'ZikrPlus-Content')
    .replace(/[\\/:*?"<>|\r\n]+/g, ' ')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
  return cleaned || 'ZikrPlus-Content';
}

export function formatShareablePlainText(
  item: ShareableContent,
  lang: ZikrLanguage
): string {
  const isBn = lang === 'bn';
  const isAr = lang === 'ar';
  const lines: string[] = [];

  if (item.badge) {
    lines.push(`[${item.badge}]`);
  }
  lines.push(item.title);
  if (item.subtitle) {
    lines.push(item.subtitle);
  }
  lines.push('========================================');

  if (item.meta && item.meta.length > 0) {
    item.meta.forEach((m) => {
      if (m.label && m.value) {
        lines.push(`• ${m.label}: ${m.value}`);
      }
    });
    lines.push('');
  }

  if (item.arabic && item.arabic.trim()) {
    lines.push(item.arabic.trim());
    lines.push('');
  }

  if (item.transliteration && item.transliteration.trim()) {
    lines.push(
      `${isBn ? 'উচ্চারণ' : isAr ? 'النطق' : 'Transliteration'}: ${item.transliteration.trim()}`
    );
    lines.push('');
  }

  const mainText = (item.fullDocumentText || item.body || '').trim();
  if (mainText) {
    lines.push(mainText);
    lines.push('');
  }

  if (item.highlights && item.highlights.length > 0 && !item.fullDocumentText) {
    lines.push(
      isBn ? '--- মূল শিক্ষণীয় ও উল্লেখযোগ্য দিক ---' : isAr ? '--- أبرز الفوائد ---' : '--- Key Highlights ---'
    );
    item.highlights.forEach((h, idx) => {
      lines.push(`${idx + 1}. ${h}`);
    });
    lines.push('');
  }

  if (item.reference && item.reference.trim()) {
    lines.push(
      `${isBn ? 'সূত্র' : isAr ? 'المصدر' : 'Reference'}: ${item.reference.trim()}`
    );
  }

  lines.push('');
  lines.push('- Zikr+ App (zikrplus.app)');
  return lines.join('\n');
}

export function downloadTextDocument(
  item: ShareableContent,
  lang: ZikrLanguage
): void {
  const text = formatShareablePlainText(item, lang);
  const blob = new Blob(['\uFEFF' + text], {
    type: 'text/plain;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const prefix = item.fileNamePrefix ? `${item.fileNamePrefix}-` : '';
  link.download = `${sanitizeFileName(prefix + item.title)}-ZikrPlus.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function printDocumentViaHiddenIframe(
  item: ShareableContent,
  lang: ZikrLanguage
): void {
  if (typeof document === 'undefined') return;

  const isBn = lang === 'bn';
  const isAr = lang === 'ar';
  const fullText = (item.fullDocumentText || item.body || '').trim();

  const metaHtml =
    item.meta && item.meta.length > 0
      ? `<div class="meta-grid">${item.meta
          .filter((m) => m.label && m.value)
          .map(
            (m) =>
              `<div class="meta-item"><span class="meta-label">${escapeHtml(
                m.label
              )}</span><span class="meta-value">${escapeHtml(m.value)}</span></div>`
          )
          .join('')}</div>`
      : '';

  const arabicHtml = item.arabic
    ? `<div class="arabic-box" dir="rtl">${escapeHtml(item.arabic)}</div>`
    : '';

  const translitHtml = item.transliteration
    ? `<div class="translit-box"><strong>${
        isBn ? 'উচ্চারণ:' : isAr ? 'النطق:' : 'Transliteration:'
      }</strong> ${escapeHtml(item.transliteration)}</div>`
    : '';

  const highlightsHtml =
    item.highlights && item.highlights.length > 0 && !item.fullDocumentText
      ? `<div class="highlights-box"><h3>${
          isBn ? 'মূল শিক্ষণীয় ও সারসংক্ষেপ' : isAr ? 'أبرز النقاط' : 'Key Highlights'
        }</h3><ul>${item.highlights
          .map((h) => `<li>${escapeHtml(h)}</li>`)
          .join('')}</ul></div>`
      : '';

  const referenceHtml = item.reference
    ? `<div class="ref-box"><strong>${
        isBn ? 'সূত্র / রেফারেন্স:' : isAr ? 'المصدر:' : 'Reference:'
      }</strong> ${escapeHtml(item.reference)}</div>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="${isBn ? 'bn' : isAr ? 'ar' : 'en'}">
<head>
<meta charset="utf-8" />
<title>${escapeHtml(item.title)} - Zikr+ App</title>
<style>
  @page { margin: 16mm; size: A4; }
  body {
    font-family: 'Noto Sans Bengali', 'Hind Siliguri', 'Segoe UI', system-ui, sans-serif;
    color: #0f172a;
    line-height: 1.7;
    margin: 0;
    padding: 0;
    background: #ffffff;
  }
  .header {
    border-bottom: 2px solid #047857;
    padding-bottom: 12px;
    margin-bottom: 18px;
  }
  .badge {
    display: inline-block;
    background: #ecfdf5;
    color: #065f46;
    border: 1px solid #a7f3d0;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 700;
    margin-bottom: 8px;
  }
  h1 {
    font-size: 22px;
    font-weight: 800;
    color: #022c22;
    margin: 0 0 4px 0;
  }
  .subtitle {
    font-size: 13px;
    color: #047857;
    font-weight: 600;
    margin: 0;
  }
  .meta-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 8px;
    margin-bottom: 16px;
  }
  .meta-item {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 8px 10px;
    font-size: 12px;
  }
  .meta-label {
    display: block;
    font-size: 10px;
    color: #64748b;
    font-weight: 700;
    text-transform: uppercase;
  }
  .meta-value {
    color: #0f172a;
    font-weight: 600;
  }
  .arabic-box {
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 10px;
    padding: 14px 16px;
    font-family: 'Amiri', 'Traditional Arabic', 'Scheherazade New', serif;
    font-size: 22px;
    line-height: 2.1;
    color: #064e3b;
    margin-bottom: 14px;
    text-align: right;
  }
  .translit-box {
    font-size: 13px;
    color: #334155;
    font-style: italic;
    margin-bottom: 14px;
  }
  .content-body {
    font-size: 13.5px;
    color: #1e293b;
    white-space: pre-wrap;
    margin-bottom: 16px;
  }
  .highlights-box {
    background: #f8fafc;
    border-left: 3px solid #10b981;
    padding: 10px 14px;
    border-radius: 6px;
    margin-bottom: 14px;
  }
  .highlights-box h3 {
    margin: 0 0 6px 0;
    font-size: 13px;
    color: #065f46;
  }
  .highlights-box ul {
    margin: 0;
    padding-left: 18px;
    font-size: 12.5px;
  }
  .ref-box {
    font-size: 12px;
    color: #475569;
    padding: 8px 12px;
    background: #f1f5f9;
    border-radius: 6px;
    margin-bottom: 18px;
  }
  .footer {
    border-top: 1px solid #cbd5e1;
    padding-top: 8px;
    font-size: 11px;
    color: #64748b;
    display: flex;
    justify-content: space-between;
  }
</style>
</head>
<body>
  <div class="header">
    ${item.badge ? `<div class="badge">${escapeHtml(item.badge)}</div>` : ''}
    <h1>${escapeHtml(item.title)}</h1>
    ${item.subtitle ? `<p class="subtitle">${escapeHtml(item.subtitle)}</p>` : ''}
  </div>
  ${metaHtml}
  ${arabicHtml}
  ${translitHtml}
  <div class="content-body">${escapeHtml(fullText)}</div>
  ${highlightsHtml}
  ${referenceHtml}
  <div class="footer">
    <span>Zikr+ Islamic Knowledge Hub</span>
    <span>zikrplus.app</span>
  </div>
</body>
</html>`;

  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.opacity = '0';
  iframe.setAttribute('aria-hidden', 'true');
  document.body.appendChild(iframe);

  const doc = iframe.contentWindow?.document;
  if (!doc) {
    document.body.removeChild(iframe);
    return;
  }

  doc.open();
  doc.write(html);
  doc.close();

  const cleanup = () => {
    try {
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    } catch {}
  };

  setTimeout(() => {
    try {
      iframe.contentWindow?.focus();
      if (iframe.contentWindow) {
        iframe.contentWindow.onafterprint = cleanup;
      }
      iframe.contentWindow?.print();
      setTimeout(cleanup, 60000);
    } catch {
      cleanup();
    }
  }, 250);
}
