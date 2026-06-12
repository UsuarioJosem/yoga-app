// ── Temporizador de práctica ─────────────────────────────────────

const Timer = {
  total: 300,
  remain: 300,
  running: false,
  ticker: null,
  onTick: null,
  onComplete: null,

  set(minutes) {
    this.total = minutes * 60;
    this.remain = this.total;
    this.stop();
    this._tick();
  },

  toggle() {
    if (this.running) {
      this.pause();
    } else {
      this.start();
    }
  },

  start() {
    if (this.remain <= 0) this.remain = this.total;
    this.running = true;
    this.ticker = setInterval(() => {
      if (this.remain > 0) {
        this.remain--;
        this._tick();
      } else {
        this.stop();
        this._beep();
        if (this.onComplete) this.onComplete(Math.round(this.total / 60));
      }
    }, 1000);
    this._tick();
  },

  pause() {
    this.running = false;
    clearInterval(this.ticker);
    this._tick();
  },

  stop() {
    this.running = false;
    clearInterval(this.ticker);
  },

  reset() {
    this.remain = this.total;
    this.stop();
    this._tick();
  },

  format() {
    const m = Math.floor(this.remain / 60);
    const s = this.remain % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  },

  _tick() {
    if (this.onTick) this.onTick();
  },

  // Pequeño sonido de campana al terminar (sin archivos externos)
  _beep() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 528;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);
      osc.start();
      osc.stop(ctx.currentTime + 2.5);
    } catch {
      /* audio no disponible */
    }
  },
};
