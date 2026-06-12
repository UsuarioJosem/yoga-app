// ── App principal ────────────────────────────────────────────────

const $ = (sel) => document.querySelector(sel);

// ── Tema ──
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}
applyTheme(Store.getTheme());
$("#themeToggle").addEventListener("click", () => {
  const next = Store.getTheme() === "dark" ? "light" : "dark";
  Store.setTheme(next);
  applyTheme(next);
});

// ── Onboarding (primera vez) ──
const OB_STEPS = [
  {
    q: "¿Cuál es tu nivel?",
    sub: "Podrás cambiarlo cuando quieras.",
    key: "lvl",
    opts: [
      { v: "p", label: "Principiante", desc: "Nunca he practicado o estoy empezando" },
      { v: "i", label: "Intermedio", desc: "Practico de vez en cuando" },
      { v: "a", label: "Avanzado", desc: "Practico con regularidad desde hace tiempo" },
    ],
  },
  {
    q: "¿Qué buscas en tu práctica?",
    sub: "Usaremos esto para recomendarte rutinas.",
    key: "obj",
    opts: [
      { v: "calma", label: "Calma y descanso", desc: "Relajarme, dormir mejor, soltar tensión" },
      { v: "fuerza", label: "Fuerza", desc: "Tonificar y ganar estabilidad" },
      { v: "flex", label: "Flexibilidad", desc: "Espalda, caderas y movilidad" },
    ],
  },
  {
    q: "¿Cuántos días por semana?",
    sub: "Ajustaremos tu meta semanal.",
    key: "days",
    opts: [
      { v: 2, label: "2 días", desc: "Un comienzo realista" },
      { v: 3, label: "3 días", desc: "Ritmo constante" },
      { v: 5, label: "5 o más", desc: "El yoga como hábito diario" },
    ],
  },
];

function showOnboarding() {
  const profile = {};
  let step = 0;

  const ov = document.createElement("div");
  ov.className = "ob-overlay";
  document.body.appendChild(ov);

  function render() {
    const s = OB_STEPS[step];
    ov.innerHTML = `
      <div class="ob-card">
        <div class="ob-dots">${OB_STEPS.map(
          (_, i) => `<span class="ob-dot ${i <= step ? "on" : ""}"></span>`
        ).join("")}</div>
        <p class="ob-q">${s.q}</p>
        <p class="ob-sub">${s.sub}</p>
        <div class="ob-opts">
          ${s.opts
            .map(
              (o, i) => `
            <button class="ob-opt" data-i="${i}">
              <span class="ob-opt-label">${o.label}</span>
              <span class="ob-opt-desc">${o.desc}</span>
            </button>`
            )
            .join("")}
        </div>
      </div>`;

    ov.querySelectorAll(".ob-opt").forEach((b) =>
      b.addEventListener("click", () => {
        profile[s.key] = s.opts[Number(b.dataset.i)].v;
        if (step < OB_STEPS.length - 1) {
          step++;
          render();
        } else {
          Store.setProfile(profile);
          Store.setGoal(Math.min(120, profile.days * 20));
          ov.remove();
          renderRutinas();
        }
      })
    );
  }
  render();
}

// ── Recomendación del día ──
const RECO = {
  calma: { p: ["Despertar suave", "Yoga para dormir"], i: ["Apertura de cadera"], a: ["Inversiones"] },
  fuerza: { p: ["Base de pie"], i: ["Core y fuerza", "Los tres guerreros"], a: ["Práctica avanzada"] },
  flex: { p: ["Espalda sana", "Yoga para dormir"], i: ["Apertura de cadera"], a: ["Inversiones"] },
};

function rutinaDelDia() {
  const prof = Store.getProfile();
  if (!prof) return null;
  const names = (RECO[prof.obj] && RECO[prof.obj][prof.lvl]) || [];
  let candidates = RUTINAS.filter((r) => names.includes(r.t));
  if (!candidates.length) candidates = RUTINAS.filter((r) => r.lvl === prof.lvl);
  if (!candidates.length) return null;
  const day = Math.floor(Date.now() / 86400000);
  return candidates[day % candidates.length];
}

// ── Navegación por pestañas ──
function switchTab(name) {
  document.querySelectorAll(".panel").forEach((p) => (p.hidden = true));
  $("#panel-" + name).hidden = false;
  document.querySelectorAll(".tab").forEach((t) => {
    const active = t.dataset.tab === name;
    t.setAttribute("aria-selected", active ? "true" : "false");
  });
  if (name === "progreso") renderProgreso();
}
document.querySelectorAll(".tab").forEach((t) =>
  t.addEventListener("click", () => switchTab(t.dataset.tab))
);

// ── Rutinas ──
function renderRutinas() {
  const hoy = rutinaDelDia();
  const hoyHtml = hoy
    ? `
    <div class="card today-card">
      <p class="today-label">☀️ Tu rutina de hoy</p>
      <div class="row-between">
        <p class="title" style="font-size:18px;">${hoy.t}</p>
        <span class="lvl ${NIVELES[hoy.lvl].cls}">${NIVELES[hoy.lvl].label}</span>
      </div>
      <p class="meta">${hoy.min} min · ${hoy.pasos.length} pasos</p>
      <button class="btn btn-primary" style="margin-top:10px;" data-routine="${RUTINAS.indexOf(hoy)}">
        Empezar ahora
      </button>
    </div>
    <p class="section-label">Todas las rutinas</p>`
    : "";

  $("#panel-rutinas").innerHTML = hoyHtml + RUTINAS.map((r, i) => {
    const lv = NIVELES[r.lvl];
    return `
      <div class="card rcard edge-${r.lvl}">
        <div class="row-between">
          <p class="title">${r.t}</p>
          <span class="lvl ${lv.cls}">${lv.label}</span>
        </div>
        <p class="meta">${r.min} min · ${r.pasos.length} pasos</p>
        <div class="steps">
          ${r.pasos
            .map(
              (p, j) => `
            <details class="step">
              <summary>
                <span class="step-num">${j + 1}</span>
                <span class="step-name">${p.t}</span>
                <span class="step-dur">${p.dur}</span>
              </summary>
              ${POSES[p.pose] ? `<div class="pose">${POSES[p.pose]}</div>` : ""}
              <p class="step-como">${p.como}</p>
            </details>`
            )
            .join("")}
        </div>
        <button class="btn btn-primary" data-routine="${i}">
          Empezar sesión guiada
        </button>
      </div>`;
  }).join("");

  $("#panel-rutinas")
    .querySelectorAll("[data-routine]")
    .forEach((b) =>
      b.addEventListener("click", () => {
        switchTab("timer");
        Guided.start(RUTINAS[Number(b.dataset.routine)]);
      })
    );
}

// ── Asanas ──
function renderAsanas() {
  $("#panel-asanas").innerHTML = ["p", "i", "a"]
    .map((L) => {
      const list = ASANAS.filter((a) => a.lvl === L);
      const lv = NIVELES[L];
      return `
        <p class="section-label">${lv.label}</p>
        ${list
          .map(
            (a) => `
          <div class="card">
            <div class="row-between">
              <p class="title">${a.n}</p>
              <span class="lvl ${lv.cls}">${lv.label}</span>
            </div>
            <p class="subtitle">${a.es}</p>
            ${POSES[a.n] ? `<div class="pose">${POSES[a.n]}</div>` : ""}
            <p style="margin:8px 0 6px;font-size:14px;">${a.desc}</p>
            <p class="cue">Foco: ${a.foco}</p>
          </div>`
          )
          .join("")}`;
    })
    .join("");
}

// ── Guía por voz ──
// Usa la voz en español del propio dispositivo (Web Speech API).
const Voice = {
  enabled: Store.getVoice(),
  available: "speechSynthesis" in window,

  toggle() {
    this.enabled = !this.enabled;
    Store.setVoice(this.enabled);
    if (!this.enabled) this.stop();
  },

  speak(text) {
    if (!this.available || !this.enabled) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    u.rate = 0.95;
    const voice = speechSynthesis
      .getVoices()
      .find((v) => v.lang && v.lang.startsWith("es"));
    if (voice) u.voice = voice;
    speechSynthesis.speak(u);
  },

  stop() {
    if (this.available) speechSynthesis.cancel();
  },
};
// Algunos navegadores cargan las voces de forma asíncrona
if (Voice.available) speechSynthesis.getVoices();

// ── Sesión guiada ──
const Guided = {
  rutina: null,
  idx: 0,
  remain: 0,
  running: false,
  ticker: null,

  start(r) {
    this.stop();
    this.rutina = r;
    this.idx = 0;
    this.remain = r.pasos[0].min * 60;
    this.running = true;
    this.ticker = setInterval(() => this._sec(), 1000);
    renderGuided();
    this._announce();
  },

  _announce() {
    const p = this.rutina.pasos[this.idx];
    Voice.speak(`Paso ${this.idx + 1}: ${p.t}, ${p.dur}. ${p.como}`);
  },

  _sec() {
    if (!this.running || !this.rutina) return;
    if (this.remain > 0) {
      this.remain--;
      updateGuidedUI();
      return;
    }
    Timer._beep();
    this._advance();
  },

  _advance() {
    if (this.idx < this.rutina.pasos.length - 1) {
      this.idx++;
      this.remain = this.rutina.pasos[this.idx].min * 60;
      renderGuided();
      this._announce();
    } else {
      this.finish();
    }
  },

  toggle() {
    this.running = !this.running;
    if (!this.running) Voice.stop();
    updateGuidedUI();
  },

  skip() {
    this._advance();
  },

  finish() {
    const min = this.rutina.min;
    this.stop();
    Store.addSession(min);
    Voice.speak("Sesión completada. Namasté.");
    $("#panel-timer").innerHTML = `
      <div class="card timer-card">
        <div class="guided-done">🙏</div>
        <p class="title" style="font-size:18px;">Sesión completada</p>
        <p class="meta" style="margin:6px 0 18px;">${min} minutos añadidos a tu progreso</p>
        <div class="btn-row" style="justify-content:center;">
          <button class="btn btn-primary" id="doneBtn">Volver a rutinas</button>
        </div>
      </div>`;
    $("#doneBtn").addEventListener("click", () => {
      renderTimer();
      switchTab("rutinas");
    });
  },

  exit() {
    this.stop();
    renderTimer();
  },

  stop() {
    this.running = false;
    clearInterval(this.ticker);
    this.rutina = null;
    Voice.stop();
  },

  format() {
    const m = Math.floor(this.remain / 60);
    const s = this.remain % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  },
};

function renderGuided() {
  const r = Guided.rutina;
  if (!r) return;
  const p = r.pasos[Guided.idx];
  const done = r.pasos.slice(0, Guided.idx).reduce((a, x) => a + x.min, 0);
  const pct = Math.round((done / r.min) * 100);

  $("#panel-timer").innerHTML = `
    <div class="card timer-card">
      <div class="row-between">
        <p class="meta">${r.t}</p>
        <div style="display:flex;gap:6px;">
          ${
            Voice.available
              ? `<button class="btn" id="voiceBtn" style="font-size:12px;padding:5px 10px;"
                   title="Guía por voz">${Voice.enabled ? "🔊 Voz" : "🔇 Voz"}</button>`
              : ""
          }
          <button class="btn" id="exitBtn" style="font-size:12px;padding:5px 10px;">Salir</button>
        </div>
      </div>
      <p class="guided-step-label">Paso ${Guided.idx + 1} de ${r.pasos.length}</p>
      <p class="title" style="font-size:19px;margin-top:2px;">${p.t}</p>
      ${POSES[p.pose] ? `<div class="pose">${POSES[p.pose]}</div>` : ""}
      <p class="guided-como">${p.como}</p>
      <div class="time-display" id="guidedTime" style="font-size:48px;">${Guided.format()}</div>
      <div class="bar"><div class="bar-fill" id="guidedBar" style="width:${pct}%"></div></div>
      <p class="meta" id="guidedPct">${pct}% de la rutina</p>
      <div class="btn-row" style="justify-content:center;margin-top:14px;">
        <button class="btn btn-primary" id="guidedPlay">${Guided.running ? "Pausar" : "Continuar"}</button>
        <button class="btn" id="guidedSkip">Saltar paso</button>
      </div>
    </div>`;

  $("#guidedPlay").addEventListener("click", () => Guided.toggle());
  $("#guidedSkip").addEventListener("click", () => Guided.skip());
  $("#exitBtn").addEventListener("click", () => Guided.exit());
  const vb = $("#voiceBtn");
  if (vb)
    vb.addEventListener("click", () => {
      Voice.toggle();
      vb.textContent = Voice.enabled ? "🔊 Voz" : "🔇 Voz";
    });
}

function updateGuidedUI() {
  const r = Guided.rutina;
  if (!r) return;
  const t = $("#guidedTime");
  if (t) t.textContent = Guided.format();
  const btn = $("#guidedPlay");
  if (btn) btn.textContent = Guided.running ? "Pausar" : "Continuar";
  const stepDone = r.pasos[Guided.idx].min * 60 - Guided.remain;
  const done = r.pasos.slice(0, Guided.idx).reduce((a, x) => a + x.min, 0) * 60 + stepDone;
  const pct = Math.min(100, Math.round((done / (r.min * 60)) * 100));
  const bar = $("#guidedBar");
  if (bar) bar.style.width = pct + "%";
  const lbl = $("#guidedPct");
  if (lbl) lbl.textContent = pct + "% de la rutina";
}

// ── Temporizador ──
let activePreset = 5;
const PRESETS = [3, 5, 10, 15, 20, 30];

function renderTimer() {
  $("#panel-timer").innerHTML = `
    <div class="card timer-card">
      <div class="time-display" id="timeDisplay">05:00</div>
      <p class="timer-label" id="timerLabel">Listo para practicar</p>
      <div class="preset-row" id="presetRow">
        ${PRESETS.map(
          (m) => `<button class="chip" data-preset="${m}">${m} min</button>`
        ).join("")}
      </div>
      <div class="btn-row" style="justify-content:center;">
        <button class="btn btn-primary" id="playBtn">Iniciar</button>
        <button class="btn" id="resetBtn">Reiniciar</button>
      </div>
    </div>`;

  $("#presetRow")
    .querySelectorAll("[data-preset]")
    .forEach((b) =>
      b.addEventListener("click", () => setPreset(Number(b.dataset.preset)))
    );
  $("#playBtn").addEventListener("click", () => {
    Timer.toggle();
    updateTimerUI();
  });
  $("#resetBtn").addEventListener("click", () => {
    Timer.reset();
    $("#timerLabel").textContent = "Listo para practicar";
    updateTimerUI();
  });

  Timer.onTick = updateTimerUI;
  Timer.onComplete = (min) => {
    Store.addSession(min);
    $("#timerLabel").textContent = "Sesión completada 🙏";
    updateTimerUI();
  };

  setPreset(activePreset);
}

function setPreset(min) {
  activePreset = min;
  Timer.set(min);
  const row = $("#presetRow");
  if (row) {
    row.querySelectorAll(".chip").forEach((c) =>
      c.classList.toggle("active", Number(c.dataset.preset) === min)
    );
  }
  const label = $("#timerLabel");
  if (label) label.textContent = "Listo para practicar";
  updateTimerUI();
}

function updateTimerUI() {
  const disp = $("#timeDisplay");
  if (disp) disp.textContent = Timer.format();
  const btn = $("#playBtn");
  if (btn) btn.textContent = Timer.running ? "Pausar" : "Continuar";
  const label = $("#timerLabel");
  if (label && Timer.running) label.textContent = "Practicando…";
  if (btn && Timer.remain === Timer.total && !Timer.running)
    btn.textContent = "Iniciar";
}

// ── Progreso ──
function renderProgreso() {
  const s = Store.stats();
  const goal = Store.getGoal();
  const pct = Math.min(100, Math.round((s.weekMin / goal) * 100));
  const recent = Store.getSessions().slice(-6).reverse();

  $("#panel-progreso").innerHTML = `
    <div class="stat-grid">
      <div class="stat">
        <p class="stat-label">Sesiones</p>
        <p class="stat-value">${s.count}</p>
      </div>
      <div class="stat">
        <p class="stat-label">Minutos</p>
        <p class="stat-value">${s.totalMin}</p>
      </div>
      <div class="stat">
        <p class="stat-label">Racha</p>
        <p class="stat-value">${s.streak}</p>
      </div>
    </div>

    <div class="card">
      <div class="row-between">
        <p class="title" style="font-size:15px;">Meta semanal</p>
        <span class="meta">${s.weekMin} / ${goal} min</span>
      </div>
      <div class="bar"><div class="bar-fill" style="width:${pct}%"></div></div>
      <p class="meta">${pct}% completado esta semana</p>
      <div class="btn-row" style="margin-top:10px;">
        <button class="btn" data-goal="60">60</button>
        <button class="btn" data-goal="90">90</button>
        <button class="btn" data-goal="120">120</button>
        <span class="meta" style="align-self:center;">min/semana</span>
      </div>
    </div>

    <div class="card">
      <p class="title" style="font-size:15px;margin-bottom:8px;">Sesiones recientes</p>
      ${
        recent.length
          ? recent
              .map((x) => {
                const d = new Date(x.date);
                const fecha = d.toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "short",
                });
                const hora = d.toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                return `<div class="log-item"><span>${fecha} · ${hora}</span><span>${x.minutes} min</span></div>`;
              })
              .join("")
          : `<p class="empty">Aún no hay sesiones. Completa una con el temporizador para empezar a sumar.</p>`
      }
    </div>

    <div class="btn-row" style="justify-content:center;margin:4px 0 10px;">
      <button class="btn" id="prefsBtn" style="font-size:13px;">Cambiar mis preferencias</button>
    </div>`;

  $("#prefsBtn").addEventListener("click", () => showOnboarding());

  $("#panel-progreso")
    .querySelectorAll("[data-goal]")
    .forEach((b) =>
      b.addEventListener("click", () => {
        Store.setGoal(Number(b.dataset.goal));
        renderProgreso();
      })
    );
}

// ── Arranque ──
renderRutinas();
renderAsanas();
renderTimer();
switchTab("rutinas");
if (!Store.getProfile()) showOnboarding();
