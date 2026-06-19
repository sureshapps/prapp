// Synthesize a beautiful, clean tactile physical "click" or "thud" with Web Audio API.
// No files or assets required! Fully procedural and lightweight.

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

export function toggleTactileSound(enabled: boolean) {
  soundEnabled = enabled;
}

export function isSoundEnabled() {
  return soundEnabled;
}

export function playTactileClick(type: 'light' | 'heavy' | 'slide' | 'success' = 'light') {
  if (!soundEnabled) return;
  
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    
    if (!audioCtx || audioCtx.state === 'suspended') {
      audioCtx = new AudioContextClass();
    }
    
    const ctx = audioCtx;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    
    if (type === 'light') {
      // Soft high pitch tick
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.015);
      
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.018);
      
      osc.start(now);
      osc.stop(now + 0.018);
    } else if (type === 'heavy') {
      // Deep mechanical snap/thud
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.025);
      
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
      
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'slide') {
      // Soft high tick for sliding slider increments
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1000, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.006);
      
      gain.gain.setValueAtTime(0.015, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.008);
      
      osc.start(now);
      osc.stop(now + 0.008);
    } else if (type === 'success') {
      // Light rising organic tone
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.setValueAtTime(350, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(550, now + 0.12);
      
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.05, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      
      osc.start(now);
      osc.stop(now + 0.16);
    }
  } catch (error) {
    console.warn("Tactile audio could not play due to user interaction state.", error);
  }
}
