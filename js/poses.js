// ── Ilustraciones de las asanas ──────────────────────────────────
// Figuras de trazo en SVG, indexadas por el nombre sánscrito de data.js.
// Estilo común: cabeza rellena + líneas con extremos redondeados.

const _P = (body) =>
  `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" fill="none"
        stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"
        role="img" aria-hidden="true">${body}</svg>`;

const _HEAD = (x, y) => `<circle cx="${x}" cy="${y}" r="9" fill="currentColor" stroke="none"/>`;
const _GROUND = `<line x1="14" y1="128" x2="186" y2="128" stroke-width="3" opacity="0.25"/>`;

const POSES = {
  // ── Principiante ──
  "Tadasana": _P(`${_GROUND}${_HEAD(100, 26)}
    <line x1="100" y1="36" x2="100" y2="82"/>
    <line x1="100" y1="48" x2="86" y2="82"/>
    <line x1="100" y1="48" x2="114" y2="82"/>
    <line x1="100" y1="82" x2="93" y2="126"/>
    <line x1="100" y1="82" x2="107" y2="126"/>`),

  "Balasana": _P(`${_GROUND}${_HEAD(46, 104)}
    <path d="M52,108 Q85,66 118,94"/>
    <path d="M118,94 L128,124 L150,124"/>
    <line x1="46" y1="112" x2="18" y2="122"/>`),

  "Adho Mukha Svanasana": _P(`${_GROUND}${_HEAD(56, 96)}
    <line x1="32" y1="126" x2="102" y2="48"/>
    <line x1="102" y1="48" x2="164" y2="126"/>`),

  "Marjaryasana–Bitilasana": _P(`${_GROUND}${_HEAD(40, 66)}
    <path d="M50,72 Q95,46 138,74"/>
    <line x1="52" y1="74" x2="52" y2="126"/>
    <line x1="136" y1="74" x2="136" y2="126"/>`),

  "Sukhasana": _P(`${_GROUND}${_HEAD(100, 38)}
    <line x1="100" y1="48" x2="100" y2="88"/>
    <line x1="100" y1="58" x2="76" y2="98"/>
    <line x1="100" y1="58" x2="124" y2="98"/>
    <path d="M100,88 Q66,94 60,112"/>
    <path d="M100,88 Q134,94 140,112"/>
    <path d="M60,112 Q100,126 140,112"/>`),

  // ── Intermedio ──
  "Virabhadrasana II": _P(`${_GROUND}${_HEAD(100, 30)}
    <line x1="100" y1="40" x2="100" y2="78"/>
    <line x1="56" y1="52" x2="144" y2="52"/>
    <path d="M100,78 L68,96 L58,126"/>
    <line x1="100" y1="78" x2="142" y2="126"/>`),

  "Trikonasana": _P(`${_GROUND}${_HEAD(64, 44)}
    <line x1="100" y1="86" x2="72" y2="54"/>
    <line x1="100" y1="86" x2="58" y2="126"/>
    <line x1="100" y1="86" x2="146" y2="126"/>
    <line x1="72" y1="54" x2="60" y2="100"/>
    <line x1="72" y1="54" x2="84" y2="14"/>`),

  "Vrksasana": _P(`${_GROUND}${_HEAD(100, 40)}
    <line x1="100" y1="50" x2="100" y2="84"/>
    <path d="M100,56 L86,32 L100,16"/>
    <path d="M100,56 L114,32 L100,16"/>
    <line x1="100" y1="84" x2="100" y2="126"/>
    <path d="M100,84 L124,94 L104,100"/>`),

  "Setu Bandhasana": _P(`${_GROUND}${_HEAD(28, 116)}
    <path d="M42,114 Q92,62 138,86"/>
    <line x1="138" y1="86" x2="144" y2="124"/>
    <line x1="42" y1="116" x2="92" y2="122"/>`),

  "Bhujangasana": _P(`${_GROUND}${_HEAD(50, 58)}
    <path d="M58,68 Q66,96 96,112"/>
    <line x1="96" y1="112" x2="172" y2="112"/>
    <line x1="62" y1="74" x2="50" y2="110"/>`),

  // ── Avanzado ──
  "Bakasana": _P(`${_GROUND}${_HEAD(74, 58)}
    <path d="M84,64 Q110,58 132,64"/>
    <path d="M132,64 L114,84 L126,98"/>
    <line x1="92" y1="68" x2="88" y2="124"/>
    <line x1="112" y1="66" x2="112" y2="124"/>`),

  "Sirsasana": _P(`${_GROUND}${_HEAD(100, 112)}
    <line x1="100" y1="102" x2="100" y2="44"/>
    <line x1="100" y1="44" x2="93" y2="12"/>
    <line x1="100" y1="44" x2="107" y2="12"/>
    <line x1="100" y1="94" x2="76" y2="124"/>
    <line x1="100" y1="94" x2="124" y2="124"/>`),

  "Chakrasana": _P(`${_GROUND}${_HEAD(60, 104)}
    <path d="M52,124 Q100,38 148,124"/>
    <line x1="68" y1="92" x2="52" y2="124"/>
    <line x1="134" y1="94" x2="148" y2="124"/>`),

  // ── Posturas auxiliares de las rutinas ──
  "Savasana": _P(`${_GROUND}${_HEAD(30, 112)}
    <line x1="42" y1="116" x2="138" y2="116"/>
    <line x1="138" y1="116" x2="166" y2="111"/>
    <line x1="138" y1="116" x2="166" y2="121"/>
    <line x1="58" y1="118" x2="92" y2="123"/>`),

  "Surya Namaskar": _P(`${_GROUND}${_HEAD(100, 32)}
    <line x1="100" y1="42" x2="100" y2="84"/>
    <line x1="100" y1="56" x2="84" y2="18"/>
    <line x1="100" y1="56" x2="116" y2="18"/>
    <line x1="100" y1="84" x2="93" y2="126"/>
    <line x1="100" y1="84" x2="107" y2="126"/>`),

  "Uttanasana": _P(`${_GROUND}${_HEAD(70, 106)}
    <line x1="103" y1="126" x2="100" y2="62"/>
    <path d="M100,62 Q80,70 73,98"/>
    <line x1="84" y1="82" x2="64" y2="124"/>`),

  "Eka Pada Rajakapotasana": _P(`${_GROUND}${_HEAD(86, 42)}
    <line x1="86" y1="52" x2="88" y2="98"/>
    <line x1="86" y1="62" x2="66" y2="98"/>
    <path d="M88,98 L58,104 L84,114"/>
    <path d="M88,98 Q126,108 148,118"/>`),
};
