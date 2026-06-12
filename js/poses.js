// ── Ilustraciones de las asanas ──────────────────────────────────
// Figuras de trazo en SVG, indexadas por el nombre sánscrito de data.js.
// Estilo común: cabeza rellena + líneas con extremos redondeados.

const _P = (body) =>
  `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" fill="none"
        stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"
        role="img" aria-hidden="true">
     <circle cx="100" cy="72" r="58" fill="currentColor" opacity="0.07" stroke="none"/>
     <circle cx="146" cy="34" r="13" fill="currentColor" opacity="0.18" stroke="none"/>
     ${body}</svg>`;

const _HEAD = (x, y) => `<circle cx="${x}" cy="${y}" r="9" fill="currentColor" stroke="none"/>`;
const _GROUND = `<rect x="26" y="124" width="148" height="7" rx="3.5" fill="currentColor" opacity="0.15" stroke="none"/>`;

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

  "Paschimottanasana": _P(`${_GROUND}${_HEAD(126, 102)}
    <line x1="68" y1="118" x2="156" y2="118"/>
    <path d="M70,114 Q92,76 122,96"/>
    <line x1="106" y1="92" x2="148" y2="114"/>`),

  "Supta Matsyendrasana": _P(`${_GROUND}${_HEAD(30, 112)}
    <line x1="42" y1="116" x2="96" y2="116"/>
    <path d="M96,116 L120,92 L142,112"/>
    <line x1="62" y1="114" x2="62" y2="92"/>`),

  "Anjaneyasana": _P(`${_GROUND}${_HEAD(90, 28)}
    <line x1="90" y1="38" x2="90" y2="80"/>
    <line x1="90" y1="52" x2="78" y2="16"/>
    <line x1="90" y1="52" x2="102" y2="16"/>
    <path d="M90,80 L66,96 L62,124"/>
    <path d="M90,80 L126,120 L152,124"/>`),

  "Virabhadrasana I": _P(`${_GROUND}${_HEAD(95, 26)}
    <line x1="95" y1="36" x2="95" y2="76"/>
    <line x1="95" y1="50" x2="83" y2="14"/>
    <line x1="95" y1="50" x2="107" y2="14"/>
    <path d="M95,76 L70,96 L62,124"/>
    <line x1="95" y1="76" x2="142" y2="124"/>`),

  "Virabhadrasana III": _P(`${_GROUND}${_HEAD(36, 66)}
    <line x1="95" y1="126" x2="95" y2="80"/>
    <line x1="95" y1="80" x2="46" y2="70"/>
    <line x1="60" y1="73" x2="22" y2="86"/>
    <line x1="95" y1="80" x2="152" y2="70"/>`),

  "Utkatasana": _P(`${_GROUND}${_HEAD(83, 33)}
    <line x1="86" y1="43" x2="100" y2="85"/>
    <line x1="90" y1="55" x2="70" y2="20"/>
    <path d="M100,85 L84,106 L94,126"/>
    <path d="M100,85 L88,108 L98,126"/>`),

  "Phalakasana": _P(`${_GROUND}${_HEAD(48, 80)}
    <line x1="60" y1="88" x2="160" y2="122"/>
    <line x1="60" y1="88" x2="60" y2="126"/>
    <line x1="74" y1="93" x2="74" y2="126"/>`),

  "Navasana": _P(`${_GROUND}${_HEAD(68, 58)}
    <line x1="76" y1="66" x2="100" y2="110"/>
    <line x1="100" y1="110" x2="142" y2="66"/>
    <line x1="84" y1="80" x2="124" y2="80"/>`),

  "Ardha Matsyendrasana": _P(`${_GROUND}${_HEAD(100, 48)}
    <line x1="100" y1="58" x2="100" y2="112"/>
    <line x1="100" y1="112" x2="74" y2="112"/>
    <path d="M100,112 L120,90 L120,116"/>
    <line x1="100" y1="74" x2="124" y2="94"/>
    <line x1="100" y1="74" x2="78" y2="108"/>`),

  "Salamba Sarvangasana": _P(`${_GROUND}${_HEAD(82, 120)}
    <line x1="100" y1="114" x2="100" y2="18"/>
    <line x1="100" y1="108" x2="118" y2="124"/>
    <line x1="100" y1="86" x2="114" y2="100"/>`),

  "Halasana": _P(`${_GROUND}${_HEAD(64, 120)}
    <line x1="84" y1="118" x2="106" y2="76"/>
    <path d="M106,76 Q92,48 44,100"/>
    <line x1="92" y1="122" x2="142" y2="122"/>`),

  "Hanumanasana": _P(`${_GROUND}${_HEAD(100, 44)}
    <line x1="100" y1="54" x2="100" y2="106"/>
    <line x1="100" y1="64" x2="85" y2="30"/>
    <line x1="100" y1="64" x2="115" y2="30"/>
    <path d="M100,106 Q70,112 40,122"/>
    <path d="M100,106 Q130,112 160,122"/>`),

  "Adho Mukha Vrksasana": _P(`${_GROUND}${_HEAD(100, 102)}
    <line x1="93" y1="126" x2="97" y2="92"/>
    <line x1="107" y1="126" x2="103" y2="92"/>
    <line x1="100" y1="90" x2="100" y2="30"/>
    <line x1="100" y1="30" x2="91" y2="6"/>
    <line x1="100" y1="30" x2="110" y2="8"/>`),

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
