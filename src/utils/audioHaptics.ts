// Web Audio API & Vibration Haptics Utility

class SoundAndHapticEngine {
  private audioCtx: AudioContext | null = null;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  // Play realistic organic wooden tasbeeh bead click
  playBeadClick() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.045);
    } catch {
      // Audio not supported or blocked
    }
  }

  playTap() {
    this.playBeadClick();
  }

  // Play a soft uplifting chime when milestone/target is reached (e.g. 33, 99)
  playTargetChime() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 chord

      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.18, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.52);
      });
    } catch {
      // Audio context error
    }
  }

  playMilestone() {
    this.playTargetChime();
  }

  playReset() {
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(250, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.11);
    } catch {}
  }

  // Trigger haptic vibration on mobile
  triggerVibration(type: 'tap' | 'decrement' | 'target' | 'reset' = 'tap') {
    if (typeof navigator === 'undefined' || !navigator.vibrate) return;

    try {
      switch (type) {
        case 'tap':
          navigator.vibrate(25);
          break;
        case 'decrement':
          navigator.vibrate(40);
          break;
        case 'target':
          navigator.vibrate([40, 50, 40, 50, 90]);
          break;
        case 'reset':
          navigator.vibrate([30, 40, 30]);
          break;
      }
    } catch {}
  }

  vibrate(pattern: number | number[]) {
    if (typeof navigator === 'undefined' || !navigator.vibrate) return;
    try {
      navigator.vibrate(pattern);
    } catch {}
  }
}

export const soundHaptics = new SoundAndHapticEngine();

// High-fidelity Male Voice (পুরুষ কণ্ঠ) Arabic Recitation Utility
export function speakArabicMaleVoice(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[\n\r\t]+/g, ' ').trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ar-SA';
    // Reverent, steady Qur'anic & Du'a recitation pacing
    utterance.rate = 0.82;
    // Deep, resonant, masculine pitch (পুরুষ কণ্ঠ)
    utterance.pitch = 0.78;

    const voices = window.speechSynthesis.getVoices();
    if (voices && voices.length > 0) {
      // 1. Search for specifically designated Arabic Male voices
      const maleArVoice = voices.find(
        (v) =>
          v.lang.startsWith('ar') &&
          (v.name.toLowerCase().includes('male') ||
            v.name.toLowerCase().includes('maged') ||
            v.name.toLowerCase().includes('tarik') ||
            v.name.toLowerCase().includes('naif') ||
            v.name.toLowerCase().includes('youssef') ||
            v.name.toLowerCase().includes('hamza') ||
            v.name.toLowerCase().includes('majed') ||
            v.name.toLowerCase().includes('standard-b') ||
            v.name.toLowerCase().includes('standard-c') ||
            v.name.toLowerCase().includes('natural') ||
            v.name.includes('#male'))
      );

      // 2. Or fallback to any available Arabic voice with deepened male pitch
      const anyArVoice = voices.find((v) => v.lang.startsWith('ar') || v.lang.includes('ar'));

      if (maleArVoice) {
        utterance.voice = maleArVoice;
      } else if (anyArVoice) {
        utterance.voice = anyArVoice;
        utterance.pitch = 0.75; // deeper pitch to guarantee authentic masculine tone
      }
    }

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.error('Speech synthesis error:', e);
  }
}
