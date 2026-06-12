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
  $("#panel-rutinas").innerHTML = RUTINAS.map((r, i) => {
    const lv = NIVELES[r.lvl];
    return `
      <div class="card">
        <div class="row-between">
          <p class="title">${r.t}</p>
          <span class="lvl ${lv.cls}">${lv.label}</span>
        </div>
        <p class="meta">${r.min} min · ${r.pasos.length} pasos</p>
        <ol class="steps">${r.pasos.map((p) => `<li>${p}</li>`).join("")}</ol>
        <button class="btn btn-primary" data-min="${r.min}" data-routine="${i}">
          Empezar con temporizador
        </button>
      </div>`;
  }).join("");

  $("#panel-rutinas")
    .querySelectorAll("[data-routine]")
    .forEach((b) =>
      b.addEventListener("click", () => {
        switchTab("timer");
        setPreset(Number(b.dataset.min));
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
    </div>`;

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
