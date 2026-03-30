class AudioManager {
  constructor() {
    this.context = null;
    this.enabled = true;
  }

  init() {
    if (!this.context) {
      this.context = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.context.state === 'suspended') {
      this.context.resume();
    }
  }

  setEnabled(val) {
    this.enabled = val;
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.context.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.context.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.1, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(this.context.destination);
    
    osc.start();
    osc.stop(this.context.currentTime + 0.1);
  }

  playWin() {
    if (!this.enabled) return;
    this.init();
    const now = this.context.currentTime;
    
    const playNote = (freq, start, duration) => {
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + start);
      gain.gain.setValueAtTime(0.1, now + start);
      gain.gain.exponentialRampToValueAtTime(0.01, now + start + duration);
      osc.connect(gain);
      gain.connect(this.context.destination);
      osc.start(now + start);
      osc.stop(now + start + duration);
    };

    playNote(523.25, 0, 0.2); // C5
    playNote(659.25, 0.1, 0.2); // E5
    playNote(783.99, 0.2, 0.4); // G5
  }

  playTick() {
    if (!this.enabled) return;
    this.init();
    const osc = this.context.createOscillator();
    const gain = this.context.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, this.context.currentTime);
    gain.gain.setValueAtTime(0.05, this.context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.context.destination);
    osc.start();
    osc.stop(this.context.currentTime + 0.05);
  }
}

export const audioManager = new AudioManager();
