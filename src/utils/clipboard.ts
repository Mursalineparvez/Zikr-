/**
 * Safe cross-environment clipboard helper.
 * Uses navigator.clipboard when permitted and automatically falls back
 * to a temporary off-screen textarea + document.execCommand('copy')
 * so copying works cleanly inside iframes and restricted browsers
 * without throwing unhandled NotAllowedError promise rejections.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  const value = typeof text === 'string' ? text : String(text ?? '');
  if (!value) return false;

  // 1. Modern Async Clipboard API (guarded against NotAllowedError in iframes)
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // Fall through to legacy textarea copy fallback
    }
  }

  // 2. Fallback: off-screen textarea + execCommand('copy')
  if (typeof document !== 'undefined') {
    let textarea: HTMLTextAreaElement | null = null;
    try {
      textarea = document.createElement('textarea');
      textarea.value = value;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'fixed';
      textarea.style.top = '-9999px';
      textarea.style.left = '-9999px';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      textarea.setSelectionRange(0, value.length);
      const ok = document.execCommand('copy');
      return Boolean(ok);
    } catch {
      return false;
    } finally {
      if (textarea && textarea.parentNode) {
        textarea.parentNode.removeChild(textarea);
      }
    }
  }

  return false;
}
