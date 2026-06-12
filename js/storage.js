// ── Almacenamiento persistente ───────────────────────────────────
// Guarda sesiones y preferencias en el navegador (localStorage).

const Store = {
  KEY: "sadhana_v1",

  _load() {
    try {
      return JSON.parse(localStorage.getItem(this.KEY)) || {};
    } catch {
      return {};
    }
  },

  _save(data) {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(data));
    } catch {
      /* almacenamiento no disponible */
    }
  },

  // Devuelve el array de sesiones registradas
  getSessions() {
    return this._load().sessions || [];
  },

  // Registra una sesión completada
  addSession(minutes) {
    const data = this._load();
    data.sessions = data.sessions || [];
    data.sessions.push({ minutes, date: new Date().toISOString() });
    this._save(data);
  },

  // Meta semanal en minutos (por defecto 60)
  getGoal() {
    return this._load().goal || 60;
  },
  setGoal(min) {
    const data = this._load();
    data.goal = min;
    this._save(data);
  },

  // Tema (light / dark)
  getTheme() {
    return this._load().theme || "light";
  },
  setTheme(theme) {
    const data = this._load();
    data.theme = theme;
    this._save(data);
  },

  // Perfil del usuario (nivel, objetivo, días por semana)
  getProfile() {
    return this._load().profile || null;
  },
  setProfile(profile) {
    const data = this._load();
    data.profile = profile;
    this._save(data);
  },

  // Guía por voz en sesiones guiadas (activada por defecto)
  getVoice() {
    const v = this._load().voice;
    return v === undefined ? true : v;
  },
  setVoice(on) {
    const data = this._load();
    data.voice = on;
    this._save(data);
  },

  // Estadísticas agregadas
  stats() {
    const sessions = this.getSessions();
    const totalMin = sessions.reduce((s, x) => s + x.minutes, 0);

    // Minutos esta semana (desde el lunes)
    const now = new Date();
    const monday = new Date(now);
    const day = (now.getDay() + 6) % 7; // 0 = lunes
    monday.setDate(now.getDate() - day);
    monday.setHours(0, 0, 0, 0);
    const weekMin = sessions
      .filter((x) => new Date(x.date) >= monday)
      .reduce((s, x) => s + x.minutes, 0);

    // Racha de días consecutivos con práctica
    const dayset = new Set(
      sessions.map((x) => new Date(x.date).toDateString())
    );
    let streak = 0;
    const cursor = new Date();
    while (dayset.has(cursor.toDateString())) {
      streak++;
      cursor.setDate(cursor.getDate() - 1);
    }

    return { count: sessions.length, totalMin, weekMin, streak };
  },
};
