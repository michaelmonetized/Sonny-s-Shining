export class Tape {
  private ctx: AudioContext | null = null;
  private jazz: number | null = null;
  private master: GainNode | null = null;

  resume(): void {
    if (!this.ctx) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.22;
      this.master.connect(this.ctx.destination);
    }
    void this.ctx.resume();
  }

  private tone(freq: number, dur: number, type: OscillatorType, gain = 0.2, at = 0): void {
    if (!this.ctx || !this.master) return;
    const t = this.ctx.currentTime + at;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  punch(): void {
    this.tone(90, 0.12, "square", 0.18);
    this.tone(180, 0.08, "triangle", 0.08);
  }

  catch(perfect: boolean): void {
    this.tone(perfect ? 660 : 420, 0.09, "sine", 0.16);
    if (perfect) this.tone(990, 0.16, "triangle", 0.1, 0.04);
  }

  hurt(): void {
    this.tone(70, 0.16, "sawtooth", 0.14);
  }

  throw(): void {
    this.tone(240, 0.1, "triangle", 0.08);
  }

  crash(): void {
    this.tone(50, 0.4, "sawtooth", 0.2);
    this.tone(90, 0.3, "square", 0.1, 0.05);
  }

  giggle(): void {
    this.tone(784, 0.08, "sine", 0.07);
    this.tone(988, 0.1, "sine", 0.06, 0.08);
    this.tone(1174, 0.14, "sine", 0.05, 0.16);
  }

  startJazz(): void {
    this.resume();
    if (this.jazz || !this.ctx) return;
    const walk = [98, 123, 147, 110, 98, 87, 110, 123];
    let i = 0;
    this.jazz = window.setInterval(() => {
      this.tone(walk[i % walk.length], 0.22, "triangle", 0.05);
      this.tone(walk[i % walk.length] * 2, 0.05, "square", 0.015);
      i += 1;
    }, 280);
  }

  stopJazz(): void {
    if (this.jazz) window.clearInterval(this.jazz);
    this.jazz = null;
  }
}
