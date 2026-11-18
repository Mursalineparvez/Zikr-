/**
 * Utility to convert CSS oklch(), oklab(), and color-mix() color expressions
 * to rgb()/rgba() strings and sanitize cloned DOM stylesheets & nodes for
 * html2canvas to prevent unsupported color function crashes in Tailwind v4 builds.
 */

function gammaCorrect(val: number): number {
  const clamped = Math.max(0, Math.min(1, val));
  return clamped <= 0.0031308
    ? Math.round(clamped * 12.92 * 255)
    : Math.round((1.055 * Math.pow(clamped, 1 / 2.4) - 0.055) * 255);
}

function oklabComponentsToRgb(l: number, a: number, b: number, alpha: number): string {
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const lLinear = l_ * l_ * l_;
  const mLinear = m_ * m_ * m_;
  const sLinear = s_ * s_ * s_;

  const rLinear = +4.0767416621 * lLinear - 3.3077115913 * mLinear + 0.2309699292 * sLinear;
  const gLinear = -1.2684380046 * lLinear + 2.6097574011 * mLinear - 0.3413193965 * sLinear;
  const bLinear = -0.0041960863 * lLinear - 0.7034186147 * mLinear + 1.707614701 * sLinear;

  const r = gammaCorrect(rLinear);
  const g = gammaCorrect(gLinear);
  const bComp = gammaCorrect(bLinear);

  if (alpha < 1) {
    return `rgba(${r}, ${g}, ${bComp}, ${Math.max(0, Math.min(1, alpha)).toFixed(2)})`;
  }
  return `rgb(${r}, ${g}, ${bComp})`;
}

/**
 * Converts an OKLCH color string to standard rgb() / rgba() string
 */
export function oklchToRgbString(oklchStr: string): string {
  try {
    const match = oklchStr.match(
      /oklch\(\s*([-+]?[\d.]+%?)(?:[\s,]+)([-+]?[\d.]+%?)(?:[\s,]+)([-+]?[\d.]+(?:deg|rad|turn)?)(?:\s*\/\s*([\d.]+%?))?\s*\)/i
    );
    if (!match) return '#10b981';

    let l = parseFloat(match[1]);
    if (match[1].endsWith('%')) l = l / 100;

    let c = parseFloat(match[2]);
    if (match[2].endsWith('%')) c = (c / 100) * 0.4;

    let h = parseFloat(match[3]);
    if (match[3].toLowerCase().endsWith('turn')) h = h * 360;
    else if (match[3].toLowerCase().endsWith('rad')) h = (h * 180) / Math.PI;

    let alpha = 1;
    if (match[4] !== undefined) {
      alpha = parseFloat(match[4]);
      if (match[4].endsWith('%')) alpha = alpha / 100;
    }

    const hRad = (h * Math.PI) / 180;
    const a = c * Math.cos(hRad);
    const b = c * Math.sin(hRad);
    return oklabComponentsToRgb(l, a, b, alpha);
  } catch {
    return '#10b981';
  }
}

/**
 * Converts an OKLab color string to standard rgb() / rgba() string
 */
export function oklabToRgbString(oklabStr: string): string {
  try {
    const match = oklabStr.match(
      /oklab\(\s*([-+]?[\d.]+%?)(?:[\s,]+)([-+]?[\d.]+%?)(?:[\s,]+)([-+]?[\d.]+%?)(?:\s*\/\s*([\d.]+%?))?\s*\)/i
    );
    if (!match) return '#10b981';

    let l = parseFloat(match[1]);
    if (match[1].endsWith('%')) l = l / 100;

    let a = parseFloat(match[2]);
    if (match[2].endsWith('%')) a = (a / 100) * 0.4;

    let b = parseFloat(match[3]);
    if (match[3].endsWith('%')) b = (b / 100) * 0.4;

    let alpha = 1;
    if (match[4] !== undefined) {
      alpha = parseFloat(match[4]);
      if (match[4].endsWith('%')) alpha = alpha / 100;
    }

    return oklabComponentsToRgb(l, a, b, alpha);
  } catch {
    return '#10b981';
  }
}

/**
 * Replaces nested color-mix(...) expressions safely (balanced parenthesis scan)
 */
function stripUnsupportedColorMix(cssText: string): string {
  if (!cssText || !cssText.includes('color-mix(')) return cssText;

  let out = '';
  let i = 0;
  const lower = cssText.toLowerCase();

  while (i < cssText.length) {
    const idx = lower.indexOf('color-mix(', i);
    if (idx === -1) {
      out += cssText.slice(i);
      break;
    }
    out += cssText.slice(i, idx);

    let depth = 0;
    let j = idx + 'color-mix'.length;
    while (j < cssText.length) {
      if (cssText[j] === '(') depth++;
      else if (cssText[j] === ')') {
        depth--;
        if (depth === 0) {
          j++;
          break;
        }
      }
      j++;
    }

    // Replace with safe neutral translucent fallback so html2canvas never throws
    out += 'rgba(15, 23, 42, 0.12)';
    i = j;
  }

  return out;
}

/**
 * Replaces all occurrences of oklch(...), oklab(...), and color-mix(...)
 * inside a CSS string with valid rgb/rgba strings
 */
export function sanitizeCssOklch(cssText: string): string {
  if (!cssText) return cssText;
  let result = cssText;

  if (result.includes('oklch(')) {
    result = result.replace(
      /oklch\(\s*[-+]?[\d.]+%?(?:[\s,]+)[-+]?[\d.]+%?(?:[\s,]+)[-+]?[\d.]+(?:deg|rad|turn)?(?:\s*\/\s*[\d.]+%?)?\s*\)/gi,
      (match) => oklchToRgbString(match)
    );
  }

  if (result.includes('oklab(')) {
    result = result.replace(
      /oklab\(\s*[-+]?[\d.]+%?(?:[\s,]+)[-+]?[\d.]+%?(?:[\s,]+)[-+]?[\d.]+%?(?:\s*\/\s*[\d.]+%?)?\s*\)/gi,
      (match) => oklabToRgbString(match)
    );
  }

  if (result.includes('color-mix(')) {
    result = stripUnsupportedColorMix(result);
  }

  return result;
}

/**
 * Sanitizes cloned document stylesheets & elements prior to html2canvas rendering
 */
export function sanitizeClonedDocForHtml2Canvas(clonedDoc: Document): void {
  try {
    // 1. Convert same-origin <link rel="stylesheet"> sheets into sanitized inline <style> tags
    //    so Tailwind v4 production bundles containing oklch/oklab/color-mix never crash html2canvas.
    if (typeof document !== 'undefined' && document.styleSheets) {
      const linkEls = Array.from(clonedDoc.querySelectorAll('link[rel="stylesheet"]'));
      for (const linkEl of linkEls) {
        const href = linkEl.getAttribute('href') || '';
        // Skip Google Fonts external links
        if (href.startsWith('http://') || href.startsWith('https://')) continue;

        try {
          let matchedCss = '';
          for (const sheet of Array.from(document.styleSheets)) {
            if (sheet.href && (sheet.href.endsWith(href) || sheet.href.includes(href))) {
              const rules = sheet.cssRules;
              if (rules) {
                matchedCss = Array.from(rules)
                  .map((r) => r.cssText)
                  .join('\n');
                break;
              }
            }
          }

          if (matchedCss) {
            const replacementStyle = clonedDoc.createElement('style');
            replacementStyle.textContent = sanitizeCssOklch(matchedCss);
            linkEl.parentNode?.replaceChild(replacementStyle, linkEl);
          }
        } catch {
          // Cross-origin stylesheet: ignore safely
        }
      }
    }

    // 2. Sanitize all <style> tags in the cloned document
    const styleEls = clonedDoc.querySelectorAll('style');
    styleEls.forEach((styleEl) => {
      const txt = styleEl.textContent || '';
      if (txt.includes('oklch') || txt.includes('oklab') || txt.includes('color-mix')) {
        styleEl.textContent = sanitizeCssOklch(txt);
      }
    });

    // 3. Sanitize all inline styles in the cloned document
    const allEls = clonedDoc.querySelectorAll('*');
    allEls.forEach((node) => {
      const el = node as HTMLElement;
      if (el.style) {
        const cssText = el.style.cssText || '';
        if (cssText.includes('oklch') || cssText.includes('oklab') || cssText.includes('color-mix')) {
          el.style.cssText = sanitizeCssOklch(cssText);
        }

        const colorProps = [
          'color',
          'backgroundColor',
          'borderColor',
          'boxShadow',
          'textShadow',
          'outlineColor',
          'fill',
          'stroke',
        ];

        colorProps.forEach((prop) => {
          const val = (el.style as any)[prop];
          if (typeof val === 'string' && (val.includes('oklch') || val.includes('oklab') || val.includes('color-mix'))) {
            (el.style as any)[prop] = sanitizeCssOklch(val);
          }
        });
      }
    });
  } catch (err) {
    console.warn('html2canvas color sanitizer notice:', err);
  }
}
