/**
 * Utility to convert CSS oklch() color expressions to rgb()/rgba() strings
 * and sanitize cloned DOM nodes for html2canvas to prevent:
 * "Attempting to parse an unsupported color function 'oklch'"
 */

/**
 * Converts an OKLCH color string to standard rgb() / rgba() string
 */
export function oklchToRgbString(oklchStr: string): string {
  try {
    const match = oklchStr.match(
      /oklch\(\s*([\d.%]+)(?:[\s,]+)([\d.%]+)(?:[\s,]+)([\d.%]+)(?:(?:[\s,/]+)([\d.%]+))?\s*\)/i
    );
    if (!match) return '#10b981';

    let l = parseFloat(match[1]);
    if (match[1].endsWith('%')) l = l / 100;

    let c = parseFloat(match[2]);
    if (match[2].endsWith('%')) c = c / 100;

    const h = parseFloat(match[3]);

    let alpha = 1;
    if (match[4] !== undefined) {
      alpha = parseFloat(match[4]);
      if (match[4].endsWith('%')) alpha = alpha / 100;
    }

    // OKLCH to OKLab
    const hRad = (h * Math.PI) / 180;
    const a = c * Math.cos(hRad);
    const b = c * Math.sin(hRad);

    // OKLab to linear RGB
    const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = l - 0.0894841775 * a - 1.291485548 * b;

    const lLinear = l_ * l_ * l_;
    const mLinear = m_ * m_ * m_;
    const sLinear = s_ * s_ * s_;

    const rLinear = +4.0767416621 * lLinear - 3.3077115913 * mLinear + 0.2309699292 * sLinear;
    const gLinear = -1.2684380046 * lLinear + 2.6097574011 * mLinear - 0.3413193965 * sLinear;
    const bLinear = -0.0041960863 * lLinear - 0.7034186147 * mLinear + 1.707614701 * sLinear;

    // Gamma correction to sRGB
    const gammaCorrect = (val: number) => {
      const clamped = Math.max(0, Math.min(1, val));
      return clamped <= 0.0031308
        ? Math.round(clamped * 12.92 * 255)
        : Math.round((1.055 * Math.pow(clamped, 1 / 2.4) - 0.055) * 255);
    };

    const r = gammaCorrect(rLinear);
    const g = gammaCorrect(gLinear);
    const bComp = gammaCorrect(bLinear);

    if (alpha < 1) {
      return `rgba(${r}, ${g}, ${bComp}, ${alpha.toFixed(2)})`;
    }
    return `rgb(${r}, ${g}, ${bComp})`;
  } catch {
    return '#10b981';
  }
}

/**
 * Replaces all occurrences of oklch(...) inside a CSS string with valid rgb/rgba strings
 */
export function sanitizeCssOklch(cssText: string): string {
  if (!cssText || !cssText.includes('oklch')) return cssText;
  return cssText.replace(
    /oklch\(\s*[\d.%]+(?:[\s,]+)[\d.%]+(?:[\s,]+)[\d.%]+(?:(?:[\s,/]+)[\d.%]+)?\s*\)/gi,
    (match) => oklchToRgbString(match)
  );
}

/**
 * Sanitizes cloned document elements prior to html2canvas rendering
 */
export function sanitizeClonedDocForHtml2Canvas(clonedDoc: Document): void {
  try {
    // 1. Sanitize all <style> tags in the cloned document
    const styleEls = clonedDoc.querySelectorAll('style');
    styleEls.forEach((styleEl) => {
      if (styleEl.textContent && styleEl.textContent.includes('oklch')) {
        styleEl.textContent = sanitizeCssOklch(styleEl.textContent);
      }
    });

    // 2. Sanitize all elements in the cloned document
    const allEls = clonedDoc.querySelectorAll('*');
    allEls.forEach((node) => {
      const el = node as HTMLElement;
      if (el.style) {
        if (el.style.cssText && el.style.cssText.includes('oklch')) {
          el.style.cssText = sanitizeCssOklch(el.style.cssText);
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
          if (typeof val === 'string' && val.includes('oklch')) {
            (el.style as any)[prop] = sanitizeCssOklch(val);
          }
        });
      }
    });
  } catch (err) {
    console.warn('html2canvas oklch sanitizer error:', err);
  }
}
