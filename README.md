# Sādhana · App de Yoga

Una aplicación web para aprender y practicar yoga desde nivel principiante hasta avanzado. Funciona en el navegador, en el móvil y se puede instalar como app (PWA). Guarda tu progreso de forma permanente y funciona sin conexión.

## Funciones

- **Rutinas guiadas** organizadas por nivel (principiante, intermedio, avanzado), cada una con sus pasos.
- **Biblioteca de asanas** con nombre en sánscrito, traducción, descripción y foco de cada postura.
- **Temporizador** de práctica con tiempos predefinidos y una campana al terminar.
- **Seguimiento de progreso**: sesiones, minutos totales, racha de días, meta semanal e historial.

## Cómo abrirlo

No necesita instalar nada ni compilar. Tienes dos opciones:

### Opción 1 — Abrir directamente
Haz doble clic en `index.html`. Funciona, pero el service worker (modo offline e instalación) requiere un servidor local.

### Opción 2 — Servidor local (recomendado)
Desde la carpeta del proyecto, en la terminal:

```bash
# Con Python (ya instalado en Mac/Linux)
python3 -m http.server 8000
```

Luego abre `http://localhost:8000` en el navegador.

Si usas **VS Code**, instala la extensión "Live Server", haz clic derecho en `index.html` y elige "Open with Live Server".

## Instalar como app en el móvil

1. Abre la URL en Chrome (Android) o Safari (iPhone).
2. Menú del navegador → "Añadir a pantalla de inicio".
3. Se instala como una app independiente.

## Estructura del proyecto

```
sadhana/
├── index.html          Estructura de la página
├── manifest.json       Configuración de la PWA
├── service-worker.js   Funcionamiento sin conexión
├── css/
│   └── styles.css      Estilos (incluye modo claro/oscuro)
├── js/
│   ├── data.js         Asanas y rutinas (edita aquí para añadir contenido)
│   ├── storage.js      Guarda el progreso en el navegador
│   ├── timer.js        Lógica del temporizador
│   └── app.js          Renderizado y navegación
└── icons/
    └── icon.svg        Icono de la app
```

## Cómo añadir tu propio contenido

Abre `js/data.js`. Para añadir una asana, copia un bloque existente dentro de `ASANAS`:

```js
{ n: "Nombre sánscrito", es: "Traducción", lvl: "p",
  desc: "Descripción de la postura.",
  foco: "Para qué sirve" },
```

`lvl` puede ser `"p"` (principiante), `"i"` (intermedio) o `"a"` (avanzado). Las rutinas funcionan igual dentro de `RUTINAS`.

## Notas

- Tu progreso se guarda en el navegador (localStorage). No se envía a ningún servidor.
- Esto no sustituye la guía de un profesor de yoga. Escucha a tu cuerpo y no fuerces las posturas.

## Próximos pasos posibles

- Ilustraciones o fotos de cada postura.
- Audio guiado para las rutinas.
- Calendario de práctica y recordatorios.
- Más asanas y rutinas por estilo (Hatha, Vinyasa, Yin…).
