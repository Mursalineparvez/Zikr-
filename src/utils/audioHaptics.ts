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

// Pre-load and cache browser voices to prevent empty voice lists on first call
let cachedSystemVoices: SpeechSynthesisVoice[] = [];
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  try {
    cachedSystemVoices = window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      cachedSystemVoices = window.speechSynthesis.getVoices();
    };
  } catch {}
}

// Check if a voice is female
function isFemaleVoice(v: SpeechSynthesisVoice): boolean {
  const n = (v.name + ' ' + (v.voiceURI || '')).toLowerCase();
  return (
    n.includes('female') ||
    n.includes('#female') ||
    n.includes('laila') ||
    n.includes('saman') ||
    n.includes('zeina') ||
    n.includes('salma') ||
    n.includes('zira') ||
    n.includes('maryam') ||
    n.includes('hoda') ||
    n.includes('fatima') ||
    n.includes('siri') ||
    n.includes('samantha') ||
    n.includes('victoria') ||
    n.includes('karen') ||
    n.includes('ayesha') ||
    n.includes('zahra')
  );
}

// Check if a voice is explicitly male
function isMaleVoice(v: SpeechSynthesisVoice): boolean {
  const n = (v.name + ' ' + (v.voiceURI || '')).toLowerCase();
  return (
    n.includes('male') ||
    n.includes('#male') ||
    n.includes('maged') ||
    n.includes('tarik') ||
    n.includes('tariq') ||
    n.includes('naif') ||
    n.includes('youssef') ||
    n.includes('hamza') ||
    n.includes('majed') ||
    n.includes('hany') ||
    n.includes('shakir') ||
    n.includes('standard-b') ||
    n.includes('standard-c') ||
    n.includes('standard-d') ||
    n.includes('wavenet-b') ||
    n.includes('wavenet-c') ||
    n.includes('wavenet-d') ||
    n.includes('david') ||
    n.includes('george') ||
    n.includes('daniel')
  );
}

// High-fidelity Arabic Recitation Utility supporting Male (পুরুষ কণ্ঠ) and Female (নারী কণ্ঠ)
export type VoiceGender = 'male' | 'female';

export function playArabicVoice(text: string, gender: VoiceGender = 'male', onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[\n\r\t]+/g, ' ').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ar-SA';

    // Refresh voice list if empty
    let voices = cachedSystemVoices;
    if (!voices || voices.length === 0) {
      voices = window.speechSynthesis.getVoices();
      cachedSystemVoices = voices;
    }

    if (gender === 'female') {
      utterance.rate = 0.82;
      utterance.pitch = 1.22; // Clear, melodious feminine tone
      if (voices && voices.length > 0) {
        const explicitFemale = voices.find(
          (v) => (v.lang.startsWith('ar') || v.lang.includes('ar')) && isFemaleVoice(v)
        );
        const anyFemale = voices.find((v) => isFemaleVoice(v));
        const anyArabic = voices.find((v) => v.lang.startsWith('ar') || v.lang.includes('ar'));

        if (explicitFemale) {
          utterance.voice = explicitFemale;
        } else if (anyFemale) {
          utterance.voice = anyFemale;
        } else if (anyArabic) {
          utterance.voice = anyArabic;
        }
      }
    } else {
      // Male voice (পুরুষ কণ্ঠ) - Deep, resonant baritone
      utterance.rate = 0.78;
      utterance.pitch = 0.58;

      if (voices && voices.length > 0) {
        const explicitArabicMale = voices.find(
          (v) => (v.lang.startsWith('ar') || v.lang.includes('ar')) && isMaleVoice(v) && !isFemaleVoice(v)
        );
        const neutralArabic = voices.find(
          (v) => (v.lang.startsWith('ar') || v.lang.includes('ar')) && !isFemaleVoice(v)
        );
        const anyArabic = voices.find((v) => v.lang.startsWith('ar') || v.lang.includes('ar'));

        if (explicitArabicMale) {
          utterance.voice = explicitArabicMale;
          utterance.pitch = 0.68;
        } else if (neutralArabic) {
          utterance.voice = neutralArabic;
          utterance.pitch = 0.55;
        } else if (anyArabic) {
          utterance.voice = anyArabic;
          utterance.pitch = 0.50;
        } else {
          const anyMale = voices.find((v) => isMaleVoice(v) && !isFemaleVoice(v));
          if (anyMale) {
            utterance.voice = anyMale;
            utterance.pitch = 0.60;
          }
        }
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

export function speakArabicMaleVoice(text: string, onEnd?: () => void) {
  playArabicVoice(text, 'male', onEnd);
}
