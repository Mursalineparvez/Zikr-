import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ZikrLanguage } from '../types';
import { sanitizeClonedDocForHtml2Canvas } from './html2canvasSanitizer';

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

function toLocalizedDigits(num: number, lang: ZikrLanguage): string {
  if (lang === 'bn') {
    const bn = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return String(num).replace(/\d/g, (d) => bn[Number(d)]);
  }
  if (lang === 'ar') {
    const ar = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return String(num).replace(/\d/g, (d) => ar[Number(d)]);
  }
  return String(num);
}

/**
 * Splits a long paragraph into readable chunks at sentence boundaries
 * so no single block exceeds an A4 page or gets awkwardly cut across pages.
 */
function splitLongParagraph(text: string, maxChars = 480): string[] {
  const trimmed = text.trim();
  if (trimmed.length <= maxChars) return [trimmed];

  const sentences = trimmed.split(/(?<=[।.?!])\s+/);
  const chunks: string[] = [];
  let current = '';

  for (const sentence of sentences) {
    if (current.length > 0 && current.length + sentence.length + 1 > maxChars) {
      chunks.push(current.trim());
      current = sentence;
    } else {
      current = current ? `${current} ${sentence}` : sentence;
    }
  }
  if (current.trim()) chunks.push(current.trim());

  // Safety split if a single sentence has no punctuation and is still huge
  const finalChunks: string[] = [];
  for (const ch of chunks) {
    if (ch.length <= maxChars + 140) {
      finalChunks.push(ch);
    } else {
      let idx = 0;
      while (idx < ch.length) {
        let end = Math.min(idx + maxChars, ch.length);
        if (end < ch.length) {
          const lastSpace = ch.lastIndexOf(' ', end);
          if (lastSpace > idx + 100) end = lastSpace;
        }
        finalChunks.push(ch.slice(idx, end).trim());
        idx = end;
      }
    }
  }
  return finalChunks;
}

export interface PdfDownloadResult {
  fileName: string;
  pageCount: number;
}

/**
 * Generates a real, print-ready, multi-page A4 PDF file directly in the browser
 * using semantic block pagination + html2canvas (for crisp Bengali ligatures & Arabic RTL)
 * + jsPDF, and triggers an immediate file download that works inside iframes & mobile browsers.
 */
export async function downloadPdfDocument(
  item: ShareableContent,
  lang: ZikrLanguage
): Promise<PdfDownloadResult> {
  if (typeof document === 'undefined') {
    throw new Error('Document is unavailable');
  }

  const isBn = lang === 'bn';
  const isAr = lang === 'ar';
  const fullText = (item.fullDocumentText || item.body || '').trim();
  const prefix = item.fileNamePrefix ? `${item.fileNamePrefix}-` : '';
  const fileName = `${sanitizeFileName(prefix + item.title)}-ZikrPlus.pdf`;

  // Ensure web fonts (Bengali / Arabic) are loaded before measuring & rendering
  try {
    if (document.fonts && document.fonts.ready) {
      await Promise.race([
        document.fonts.ready,
        new Promise((resolve) => setTimeout(resolve, 1500)),
      ]);
    }
  } catch {}

  const PAGE_W = 794; // A4 width at 96dpi
  const PAGE_H = 1123; // A4 height at 96dpi
  const PAD_X = 48;
  const PAD_TOP = 42;
  const FOOTER_H = 44;
  const PAD_BOTTOM = 28;
  const CONTENT_W = PAGE_W - PAD_X * 2; // 698px
  const MAX_BODY_H = PAGE_H - PAD_TOP - FOOTER_H - PAD_BOTTOM - 16; // ~993px

  const baseFontFamily = isAr
    ? "'Amiri', 'Noto Naskh Arabic', 'Segoe UI', system-ui, sans-serif"
    : "'Noto Sans Bengali', 'Hind Siliguri', 'Segoe UI', system-ui, sans-serif";

  // Build semantic DOM blocks
  const blocks: HTMLElement[] = [];

  const createEl = (tag: string, cssText: string, html?: string): HTMLElement => {
    const el = document.createElement(tag);
    el.style.cssText = cssText;
    if (html !== undefined) el.innerHTML = html;
    return el;
  };

  // 1. Header Block
  const headerHtml = `
    <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:14px;">
      <div style="flex:1;min-width:0;">
        ${
          item.badge
            ? `<div style="display:inline-block;background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0;padding:3px 11px;border-radius:999px;font-size:11px;font-weight:700;margin-bottom:8px;">${escapeHtml(
                item.badge
              )}</div>`
            : ''
        }
        <h1 style="font-size:22px;font-weight:800;color:#022c22;margin:0 0 5px 0;line-height:1.35;">${escapeHtml(
          item.title
        )}</h1>
        ${
          item.subtitle
            ? `<p style="font-size:13px;color:#047857;font-weight:600;margin:0;line-height:1.5;">${escapeHtml(
                item.subtitle
              )}</p>`
            : ''
        }
      </div>
      <div style="width:36px;height:36px;border-radius:10px;background:#047857;color:#ffffff;font-weight:900;font-size:13px;display:flex;align-items:center;justify-content:center;flex-shrink:0;border:2px solid #f59e0b;">Z+</div>
    </div>
  `;
  blocks.push(
    createEl(
      'div',
      'border-bottom:2px solid #047857;padding-bottom:13px;margin-bottom:16px;',
      headerHtml
    )
  );

  // 2. Meta Grid Block
  const validMeta = (item.meta || []).filter((m) => m.label && m.value);
  if (validMeta.length > 0) {
    const metaCards = validMeta
      .map(
        (m) => `
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:8px 11px;">
            <div style="font-size:10px;color:#047857;font-weight:700;text-transform:uppercase;margin-bottom:2px;">${escapeHtml(
              m.label
            )}</div>
            <div style="font-size:12px;color:#0f172a;font-weight:600;line-height:1.45;">${escapeHtml(
              m.value
            )}</div>
          </div>
        `
      )
      .join('');
    blocks.push(
      createEl(
        'div',
        'display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-bottom:15px;',
        metaCards
      )
    );
  }

  // 3. Arabic Block
  if (item.arabic && item.arabic.trim()) {
    const arabicEl = createEl(
      'div',
      "background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:14px 16px;font-family:'Amiri','Traditional Arabic','Scheherazade New',serif;font-size:21px;line-height:2.1;color:#064e3b;margin-bottom:14px;text-align:right;direction:rtl;",
      escapeHtml(item.arabic.trim()).replace(/\n/g, '<br/>')
    );
    blocks.push(arabicEl);
  }

  // 4. Transliteration Block
  if (item.transliteration && item.transliteration.trim()) {
    blocks.push(
      createEl(
        'div',
        'font-size:12.5px;color:#334155;font-style:italic;line-height:1.6;margin-bottom:14px;padding:8px 12px;background:#fffbeb;border-left:3px solid #d97706;border-radius:6px;',
        `<strong style="font-style:normal;color:#92400e;">${
          isBn ? 'উচ্চারণ:' : isAr ? 'النطق:' : 'Transliteration:'
        }</strong> ${escapeHtml(item.transliteration.trim())}`
      )
    );
  }

  // 5. Structured Body Blocks (split line-by-line & smart-chunked for clean page breaks)
  if (fullText) {
    const rawLines = fullText.split(/\r?\n/);
    for (const rawLine of rawLines) {
      const line = rawLine.trim();
      if (!line) continue;

      // Skip decorative divider-only lines like ===== or -----
      if (/^[=\-_─━═]{4,}$/.test(line)) {
        blocks.push(
          createEl(
            'div',
            'height:1px;background:#e2e8f0;margin:8px 0 10px 0;'
          )
        );
        continue;
      }

      // Section headings (e.g. "--- Title ---", "=== Title ===", "【Title】", or short bold section labels)
      const isDecoratedHeading =
        (/^[-=─━═]{2,}.+[-=─━═]{2,}$/.test(line)) ||
        (/^【.+】$/.test(line)) ||
        (/^\[.+\]$/.test(line) && line.length < 90);

      if (isDecoratedHeading) {
        const cleanHeading = line.replace(/^[-=─━═\s]+|[-=─━═\s]+$/g, '');
        blocks.push(
          createEl(
            'div',
            'font-size:14px;font-weight:800;color:#065f46;background:#ecfdf5;border-left:3.5px solid #059669;padding:6px 11px;border-radius:6px;margin:12px 0 8px 0;line-height:1.45;',
            escapeHtml(cleanHeading)
          )
        );
        continue;
      }

      // Bullet / numbered lines
      if (/^([•●▪▸✓✔]|\d+\.|[০-৯]+\.)\s+/.test(line)) {
        const chunks = splitLongParagraph(line, 440);
        chunks.forEach((ch, idx) => {
          blocks.push(
            createEl(
              'p',
              `font-size:13px;color:#1e293b;line-height:1.72;margin:0 0 7px 0;padding-left:${
                idx === 0 ? '8px' : '18px'
              };`,
              escapeHtml(ch)
            )
          );
        });
        continue;
      }

      // Regular paragraph (split long ones cleanly at sentence boundaries)
      const chunks = splitLongParagraph(line, 480);
      for (const ch of chunks) {
        blocks.push(
          createEl(
            'p',
            'font-size:13.2px;color:#1e293b;line-height:1.75;margin:0 0 9px 0;text-align:left;',
            escapeHtml(ch)
          )
        );
      }
    }
  }

  // 6. Highlights Block (when no fullDocumentText overrides it)
  if (item.highlights && item.highlights.length > 0 && !item.fullDocumentText) {
    const itemsHtml = item.highlights
      .map(
        (h) =>
          `<li style="margin-bottom:5px;line-height:1.6;">${escapeHtml(h)}</li>`
      )
      .join('');
    blocks.push(
      createEl(
        'div',
        'background:#f8fafc;border-left:3.5px solid #10b981;padding:10px 14px;border-radius:6px;margin:10px 0 14px 0;',
        `<div style="font-size:13px;font-weight:800;color:#065f46;margin-bottom:6px;">${
          isBn ? 'মূল শিক্ষণীয় ও সারসংক্ষেপ' : isAr ? 'أبرز النقاط' : 'Key Highlights'
        }</div><ul style="margin:0;padding-left:18px;font-size:12.5px;color:#1e293b;">${itemsHtml}</ul>`
      )
    );
  }

  // 7. Reference Block
  if (item.reference && item.reference.trim()) {
    blocks.push(
      createEl(
        'div',
        'font-size:11.8px;color:#475569;padding:9px 13px;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:8px;margin-top:10px;line-height:1.6;',
        `<strong style="color:#065f46;">${
          isBn ? 'সূত্র / রেফারেন্স:' : isAr ? 'المصدر:' : 'Reference:'
        }</strong> ${escapeHtml(item.reference.trim())}`
      )
    );
  }

  // Offscreen measuring container to pack blocks into true A4 pages without cutting lines
  const measureHost = document.createElement('div');
  measureHost.style.cssText = `position:fixed;left:-12000px;top:0;width:${CONTENT_W}px;background:#ffffff;color:#0f172a;font-family:${baseFontFamily};pointer-events:none;z-index:-1;box-sizing:border-box;`;
  if (isAr) measureHost.dir = 'rtl';
  document.body.appendChild(measureHost);

  const pages: HTMLElement[][] = [];
  let currentPage: HTMLElement[] = [];
  let currentHeight = 0;

  try {
    for (const block of blocks) {
      measureHost.appendChild(block);
      const computed = window.getComputedStyle(block);
      const mt = parseFloat(computed.marginTop) || 0;
      const mb = parseFloat(computed.marginBottom) || 0;
      const blockH = Math.ceil(block.getBoundingClientRect().height + mt + mb);

      if (currentPage.length > 0 && currentHeight + blockH > MAX_BODY_H) {
        pages.push(currentPage);
        currentPage = [block];
        currentHeight = blockH;
      } else {
        currentPage.push(block);
        currentHeight += blockH;
      }
    }
    if (currentPage.length > 0) {
      pages.push(currentPage);
    }
  } finally {
    if (measureHost.parentNode) {
      measureHost.parentNode.removeChild(measureHost);
    }
  }

  if (pages.length === 0) {
    pages.push([]);
  }

  // Render each composed A4 page to canvas & embed in jsPDF
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const totalPages = pages.length;

  for (let pIdx = 0; pIdx < totalPages; pIdx++) {
    const pageEl = document.createElement('div');
    pageEl.style.cssText = `
      position:fixed;
      left:-12000px;
      top:0;
      width:${PAGE_W}px;
      height:${PAGE_H}px;
      background:#ffffff;
      color:#0f172a;
      font-family:${baseFontFamily};
      box-sizing:border-box;
      display:flex;
      flex-direction:column;
      justify-content:space-between;
      overflow:hidden;
      pointer-events:none;
      z-index:-1;
    `;
    if (isAr) pageEl.dir = 'rtl';

    // Top emerald & gold ornamental bar
    const topBar = createEl(
      'div',
      'height:6px;width:100%;background:linear-gradient(90deg,#047857 0%,#10b981 65%,#d97706 100%);flex-shrink:0;'
    );
    pageEl.appendChild(topBar);

    // Content area
    const bodyWrap = createEl(
      'div',
      `flex:1;padding:${PAD_TOP - 6}px ${PAD_X}px 12px ${PAD_X}px;box-sizing:border-box;overflow:hidden;`
    );
    for (const block of pages[pIdx]) {
      bodyWrap.appendChild(block);
    }
    pageEl.appendChild(bodyWrap);

    // Footer bar with page number
    const pageNumLabel = isBn
      ? `পৃষ্ঠা ${toLocalizedDigits(pIdx + 1, lang)} / ${toLocalizedDigits(totalPages, lang)}`
      : isAr
        ? `صفحة ${toLocalizedDigits(pIdx + 1, lang)} / ${toLocalizedDigits(totalPages, lang)}`
        : `Page ${pIdx + 1} / ${totalPages}`;

    const footerEl = createEl(
      'div',
      `height:${FOOTER_H}px;padding:10px ${PAD_X}px ${PAD_BOTTOM - 10}px ${PAD_X}px;border-top:1px solid #cbd5e1;display:flex;align-items:center;justify-content:space-between;font-size:11px;color:#64748b;box-sizing:border-box;flex-shrink:0;`,
      `<span style="font-weight:700;color:#065f46;">Zikr+ Islamic Knowledge Hub · zikrplus.app</span><span style="font-weight:700;color:#475569;">${escapeHtml(
        pageNumLabel
      )}</span>`
    );
    pageEl.appendChild(footerEl);

    pageEl.setAttribute('data-pdf-page', 'true');
    document.body.appendChild(pageEl);

    try {
      const canvas = await html2canvas(pageEl, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: PAGE_W,
        height: PAGE_H,
        windowWidth: PAGE_W,
        scrollX: 0,
        scrollY: 0,
        logging: false,
        onclone: (clonedDoc) => {
          sanitizeClonedDocForHtml2Canvas(clonedDoc);
          const clonedPage = clonedDoc.querySelector('[data-pdf-page="true"]') as HTMLElement | null;
          if (clonedPage) {
            clonedPage.style.left = '0px';
            clonedPage.style.top = '0px';
          }
        },
      });

      const imgData = canvas.toDataURL('image/jpeg', 0.94);
      if (pIdx > 0) {
        pdf.addPage('a4', 'portrait');
      }
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
    } finally {
      if (pageEl.parentNode) {
        pageEl.parentNode.removeChild(pageEl);
      }
    }
  }

  // Trigger direct browser PDF download via Blob URL (100% iframe-safe!)
  const pdfBlob = pdf.output('blob');
  const blobUrl = URL.createObjectURL(pdfBlob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = fileName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 6000);

  return { fileName, pageCount: totalPages };
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
