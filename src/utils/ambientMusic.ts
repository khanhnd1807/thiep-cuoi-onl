/**
 * Synthesizes a soft, dreamy romantic piano/music-box chord arpeggio using Web Audio API.
 * Works offline & online with zero broken external audio links.
 */
class RomanticAmbientPlayer {
  private ctx: AudioContext | null = null;
  private timer: number | null = null;
  private isPlaying = false;
  private step = 0;

  // Romantic Canon-inspired gentle arpeggio in D major (Hz)
  private readonly notes = [
    293.66, 369.99, 440.0, 587.33, // Dmaj
    220.0, 277.18, 329.63, 440.0,  // Amaj
    246.94, 293.66, 369.99, 493.88, // Bm
    185.0, 220.0, 277.18, 369.99,   // F#m
    196.0, 246.94, 293.66, 392.0,   // Gmaj
    146.83, 220.0, 293.66, 369.99,  // D/F#
    196.0, 246.94, 293.66, 493.88,  // Gmaj7
    220.0, 277.18, 329.63, 440.0,   // A
  ];

  private playTone(freq: number) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const shimmer = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    shimmer.type = 'triangle';
    shimmer.frequency.setValueAtTime(freq * 2, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.045, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + 2.4);

    const shimmerGain = this.ctx.createGain();
    shimmerGain.gain.setValueAtTime(0.012, now);
    shimmerGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.4);

    osc.connect(filter);
    shimmer.connect(shimmerGain);
    shimmerGain.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    shimmer.start(now);
    osc.stop(now + 2.5);
    shimmer.stop(now + 1.5);
  }

  public start(): boolean {
    if (this.isPlaying) return true;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        void this.ctx.resume();
      }
      this.isPlaying = true;
      this.playTone(this.notes[this.step % this.notes.length]);
      this.step += 1;

      this.timer = window.setInterval(() => {
        if (!this.isPlaying) return;
        this.playTone(this.notes[this.step % this.notes.length]);
        this.step += 1;
      }, 650);
      return true;
    } catch {
      return false;
    }
  }

  public stop(): void {
    this.isPlaying = false;
    if (this.timer !== null) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    }
    return this.start();
  }
}

export const ambientPlayer = new RomanticAmbientPlayer();
