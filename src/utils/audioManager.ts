import { AudioTrack } from '../types';

export const SINGLE_TRACK: AudioTrack = {
  id: 'ocean-waves-ambient',
  title: 'Abyssal Calms & Ethereal Tides',
  artist: 'Ocean Ambient Loop',
  src: 'synth://ocean-ambient',
  duration: 'Continuous Loop',
  isSynth: true
};

export const TRACKS: AudioTrack[] = [SINGLE_TRACK];

class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private audioContext: AudioContext | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.6;
  private isMuted: boolean = false;
  private currentTrack: AudioTrack = SINGLE_TRACK;
  
  // Synth nodes for procedural ocean ambience
  private synthGainNode: GainNode | null = null;
  private synthInterval: number | null = null;
  private waveNoiseNode: AudioNode | null = null;

  private listeners: Set<() => void> = new Set();

  constructor() {
    // initialize audio element
    if (typeof window !== 'undefined') {
      this.audio = new Audio();
      this.audio.loop = true;
      this.audio.volume = this.volume;

      this.audio.addEventListener('ended', () => {
        if (!this.currentTrack.isSynth) {
          this.audio?.play().catch(() => {});
        }
      });
      this.audio.addEventListener('error', (e) => {
        console.warn('External audio failed, falling back to synth ocean engine', e);
        if (this.isPlaying) {
          this.playSynth();
        }
      });
    }
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(cb => cb());
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      volume: this.volume,
      isMuted: this.isMuted,
      currentTrack: this.currentTrack,
      tracks: [this.currentTrack]
    };
  }

  private initAudioContext() {
    if (!this.audioContext && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioContext = new AudioCtx();
      }
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => {});
    }
  }

  public async play() {
    this.initAudioContext();
    this.isPlaying = true;
    
    if (this.currentTrack.isSynth) {
      this.playSynth();
    } else if (this.audio) {
      this.audio.src = this.currentTrack.src;
      this.audio.volume = this.isMuted ? 0 : this.volume;
      try {
        await this.audio.play();
      } catch (err) {
        console.warn('Audio play autoplay policy blocked or failed, using synth engine:', err);
        this.playSynth();
      }
    }
    this.notify();
  }

  public pause() {
    this.isPlaying = false;
    if (this.audio) {
      this.audio.pause();
    }
    this.stopSynth();
    this.notify();
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  public setVolume(val: number) {
    const clamped = Math.max(0, Math.min(1, val));
    this.volume = clamped;
    if (clamped > 0 && this.isMuted) {
      this.isMuted = false;
    }
    
    if (this.audio) {
      this.audio.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.synthGainNode && this.audioContext) {
      this.synthGainNode.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.35, this.audioContext.currentTime);
    }
    this.notify();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.audio) {
      this.audio.volume = this.isMuted ? 0 : this.volume;
    }
    if (this.synthGainNode && this.audioContext) {
      this.synthGainNode.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.35, this.audioContext.currentTime);
    }
    this.notify();
  }

  // --- Procedural Ocean Synth Generator (Web Audio API) ---
  private playSynth() {
    if (!this.audioContext) return;
    this.stopSynth();

    const ctx = this.audioContext;
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume * 0.35, ctx.currentTime);
    masterGain.connect(ctx.destination);
    this.synthGainNode = masterGain;

    // Ocean Waves Pink Noise Generator
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Lowpass filter modulated by LFO for wave surges
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, ctx.currentTime);

    const waveLfo = ctx.createOscillator();
    waveLfo.frequency.setValueAtTime(0.12, ctx.currentTime); // ~8 sec ocean wave period
    const waveLfoGain = ctx.createGain();
    waveLfoGain.gain.setValueAtTime(220, ctx.currentTime);

    waveLfo.connect(waveLfoGain);
    waveLfoGain.connect(filter.frequency);

    const waveGain = ctx.createGain();
    waveGain.gain.setValueAtTime(0.7, ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(masterGain);

    whiteNoise.start();
    waveLfo.start();
    this.waveNoiseNode = whiteNoise;

    // Ethereal pentatonic underwater chimes interval
    const notes = [220, 261.63, 293.66, 329.63, 392.00, 440, 523.25, 587.33]; // A Minor Pentatonic
    this.synthInterval = window.setInterval(() => {
      if (!this.isPlaying || !this.audioContext || !this.synthGainNode) return;
      const note = notes[Math.floor(Math.random() * notes.length)];
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(note, ctx.currentTime);

      const now = ctx.currentTime;
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.06, now + 0.8);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      osc.connect(noteGain);
      noteGain.connect(this.synthGainNode);

      osc.start(now);
      osc.stop(now + 4.6);
    }, 2800);
  }

  private stopSynth() {
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.synthGainNode && this.audioContext) {
      try {
        this.synthGainNode.disconnect();
      } catch (_) {}
      this.synthGainNode = null;
    }
    this.waveNoiseNode = null;
  }
}

export const audioManager = new AudioManager();
