// ── Datos de la app ──────────────────────────────────────────────
// Edita libremente: añade asanas o rutinas siguiendo el mismo formato.

const NIVELES = {
  p: { label: "Principiante", cls: "lvl-p" },
  i: { label: "Intermedio",   cls: "lvl-i" },
  a: { label: "Avanzado",     cls: "lvl-a" },
};

const ASANAS = [
  // ── Principiante ──
  { n: "Tadasana", es: "Postura de la montaña", lvl: "p",
    desc: "Postura de pie fundamental. Enseña la alineación del cuerpo y la respiración consciente.",
    foco: "Postura y enraizamiento" },
  { n: "Balasana", es: "Postura del niño", lvl: "p",
    desc: "Postura de descanso que estira la espalda baja, las caderas y calma el sistema nervioso.",
    foco: "Relajación y descanso" },
  { n: "Adho Mukha Svanasana", es: "Perro boca abajo", lvl: "p",
    desc: "Estira toda la cadena posterior y fortalece brazos y hombros. Una postura que se repite mucho.",
    foco: "Fuerza y flexibilidad" },
  { n: "Marjaryasana–Bitilasana", es: "Gato–Vaca", lvl: "p",
    desc: "Movimiento fluido entre flexión y extensión de columna, sincronizado con la respiración.",
    foco: "Movilidad de columna" },
  { n: "Sukhasana", es: "Postura fácil", lvl: "p",
    desc: "Sentada con piernas cruzadas para meditación y respiración. Base de la práctica sentada.",
    foco: "Meditación" },

  // ── Intermedio ──
  { n: "Virabhadrasana II", es: "Guerrero II", lvl: "i",
    desc: "Postura de pie que abre las caderas y fortalece piernas, brazos y concentración.",
    foco: "Fuerza de piernas" },
  { n: "Trikonasana", es: "Triángulo", lvl: "i",
    desc: "Estiramiento lateral profundo que mejora el equilibrio y abre el pecho.",
    foco: "Apertura lateral" },
  { n: "Vrksasana", es: "Postura del árbol", lvl: "i",
    desc: "Equilibrio sobre una pierna. Desarrolla concentración, estabilidad y calma.",
    foco: "Equilibrio" },
  { n: "Setu Bandhasana", es: "Puente", lvl: "i",
    desc: "Flexión suave hacia atrás que fortalece glúteos y espalda, y abre el pecho.",
    foco: "Apertura de pecho" },
  { n: "Bhujangasana", es: "Cobra", lvl: "i",
    desc: "Extensión de columna que fortalece la espalda y abre el frente del cuerpo.",
    foco: "Fuerza de espalda" },

  // ── Avanzado ──
  { n: "Bakasana", es: "Postura del cuervo", lvl: "a",
    desc: "Equilibrio sobre las manos. Exige fuerza de core, muñecas y mucha concentración.",
    foco: "Equilibrio en brazos" },
  { n: "Sirsasana", es: "Postura sobre la cabeza", lvl: "a",
    desc: "La 'reina' de las asanas. Inversión que requiere control total y práctica progresiva.",
    foco: "Inversión completa" },
  { n: "Chakrasana", es: "Postura de la rueda", lvl: "a",
    desc: "Flexión hacia atrás profunda que exige flexibilidad de columna y fuerza de brazos.",
    foco: "Extensión profunda" },
  { n: "Eka Pada Rajakapotasana", es: "Paloma real", lvl: "a",
    desc: "Apertura intensa de caderas combinada con flexión hacia atrás. Requiere preparación previa.",
    foco: "Apertura de caderas" },
];

const RUTINAS = [
  { t: "Despertar suave", lvl: "p", min: 15,
    pasos: [
      "Sukhasana y respiración — 3 min",
      "Gato–Vaca — 2 min",
      "Perro boca abajo — 2 min",
      "Postura del niño — 2 min",
      "Respiración final — 6 min",
    ] },
  { t: "Base de pie", lvl: "p", min: 20,
    pasos: [
      "Tadasana — 2 min",
      "Saludo al sol suave — 6 min",
      "Guerrero (preparación) — 4 min",
      "Postura del niño — 3 min",
      "Descanso — 5 min",
    ] },
  { t: "Fuerza y equilibrio", lvl: "i", min: 25,
    pasos: [
      "Saludo al sol — 5 min",
      "Guerrero II — 3 min por lado",
      "Triángulo — 3 min",
      "Árbol — 3 min",
      "Puente — 3 min",
      "Savasana — 5 min",
    ] },
  { t: "Apertura de cadera", lvl: "i", min: 30,
    pasos: [
      "Calentamiento — 5 min",
      "Guerrero II + Triángulo — 8 min",
      "Cobra — 4 min",
      "Puente — 4 min",
      "Estiramientos finales — 4 min",
      "Savasana — 5 min",
    ] },
  { t: "Práctica avanzada", lvl: "a", min: 40,
    pasos: [
      "Calentamiento dinámico — 8 min",
      "Postura del cuervo — 6 min",
      "Postura sobre la cabeza — 6 min",
      "Rueda — 5 min",
      "Paloma real — 7 min",
      "Savasana — 8 min",
    ] },
];
