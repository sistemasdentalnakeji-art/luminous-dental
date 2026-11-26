# QA 26-11 · Fase C · Accesibilidad y rendimiento · Luminous Dental

Fecha: 2026-11-26 · Agente: QA 3 (`ld-qa-3`) · Solo pruebas, sin cambios de código, sin commit.
Build probado: `apps/web/dist` (generado 26-11 11:01, más nuevo que todo `src/`), servido con `vite preview` en el puerto 4181.
Herramienta: Playwright (playwright-core del CLI global) con Edge (`msedge`), 375 y 1440 px, EN y ES. axe-core NO está en `node_modules`, no se instaló nada: las revisiones automáticas son scripts propios (indicador de foco, contraste muestreando píxeles reales con el texto oculto, tamaño de objetivo, animaciones por la API de Web Animations, contadores de CDP).

## Veredicto: NO LISTO (1 fallo alto, 2 medios, 7 bajos)

El teclado, el foco, `lang`, el contraste y reducir movimiento salen bien. El fallo alto es la pausa global: deja el texto y los botones del inicio y de About invisibles.

---

## Fallos por gravedad

### ALTO · A1 · «Pausar animaciones» deja invisibles el texto y los botones de entrada del Inicio y de About
- Rutas: `/en`, `/es` (Inicio) y `/en/about`, `/es/nosotros`. Idioma: EN y ES. Viewports: 375 y 1440 (reproducido en los dos).
- Pasos (fiables): abrir `/en/services` (o `/es/servicios`), esperar 3 s, pulsar «Pause decorative animations» del pie, y ya en pausa ir a Inicio con el logo o a About con el menú. Otra forma: abrir Inicio y pulsar la pausa en el primer segundo y medio (la pausa se conserva entre páginas porque es estado de la app).
- Esperado: con la pausa el contenido queda quieto pero visible.
- Real: quedan con opacidad 0, congelados en el primer cuadro: en Inicio la píldora «Las Vegas · Emergencies 24/7», el subtítulo y los botones «Book an in-office consultation», «Call or text…» y «See how a visit works»; en About la píldora, el texto de presentación y los datos (Experience, Training, Language…). Siguen en el orden de Tab (botones invisibles con foco). Con «reducir movimiento» del sistema NO pasa (0 elementos ocultos).
- Causa probable: `apps/web/src/styles/site.css` línea 323, `html[data-motion-paused] * { animation-play-state: paused !important }`. Las entradas usan `animation: … .35s backwards` con `from{opacity:0}`: `hero.css` líneas 25-26 (`hx-in`, `.hx-copy>:not(h1)`) y `about.css` líneas 62-66 (`ab-in`). En pausa, la animación queda en el cuadro 0 (opacidad 0). Otros módulos ya lo resuelven con `animation:none` y opacidad 1 (`titles.css:22`, `soft-blur.css:7`, `home-b1.css:51`): faltan esas reglas para `.hx-copy>:not(h1)`, `.ab-hero__copy>:not(h1)` y `.ab-portrait`. Conviene además revisar cualquier otra entrada con `backwards`/`both` y `from{opacity:0}`.
- Evidencia: `docs/reportes/qa-26nov-a11y/pausa-nav-home-en-375.png`, `pausa-nav-home-es-375.png`, `pausa-nav-home-es-1440.png`, `pausa-home-en-1440.png`, `pausa-about-es-1440.png`.

### MEDIO · R1 · El letrero de Las Vegas (`VegasSign`) fuerza un layout por fotograma, aunque esté fuera de pantalla
- Rutas: `/en` y `/es` (el letrero está a 6513 px de 8271 px, abajo del todo) y `/en/contact`, `/es/contacto`. Viewports: 375 y 1440.
- Pasos: abrir la página, no hacer scroll, medir 4 s con CDP `Performance.getMetrics`.
- Real: 55 layouts/s y 55 recálculos de estilo/s en reposo. CPU del hilo principal 20 a 35 % en Inicio y 19 a 21 % en Contact (Services, Benefits, About, FAQ, etc.: 0,2 layouts/s y 8 a 14 %). Al quitar solo `animation` de `.vsign *`: layouts/s pasa de 55 a 0 (probado en `/en/contact` y `/en`). Quitar mac-window, review-card__author, icon-badge, sc__badge, ftr-emg__dot o neon-glow no cambia los layouts.
- Esperado: 0 layouts/s en reposo y animación detenida cuando el letrero no está en pantalla.
- Causa probable: `VegasSign.tsx` + su CSS: `vsign-bulb` (58 animaciones infinitas de `opacity` sobre elementos SVG) y `vsign-star` (transform+opacity) dentro de un SVG de un solo `viewBox`; cada cambio invalida el layout del SVG. Pausar con el botón del pie lo lleva a 0 (ver «Pausa global», abajo), así que el interruptor ya existe; falta apagarlo cuando no se ve (IntersectionObserver o `content-visibility`/`animation-play-state` por visibilidad).

### MEDIO · R2 · Ficha de servicio con la figura: 8,5 layouts/s en reposo (1440)
- Ruta: `/en/services/dental-implants` a 1440 (a 375 son 0,2). Real: 8,5 layouts/s y CPU 20 %, contra 0,2 y 10-12 % de las otras páginas. Esperado: sin layouts en reposo. Archivo probable: `features/figure/Figure.tsx` / `engine.js` / `live.js` (lectura de medidas dentro del bucle de dibujo). Solo se midió un servicio.

### BAJO · A2 (sin confirmar) · Foco tras saltar a un ancla del hub
- Se anota solo como pendiente, no como fallo confirmado: tras activar un ancla del índice del hub (`/en/services` → «General Dentistry», `#general`) el hash cambia y `document.activeElement` queda en `BODY`. En un navegador real el punto de partida de Tab sigue al ancla, pero no se probó con lector de pantalla.

### BAJO
- **B1 · Descripción meta repetida**: todas las páginas EN (y ES) salvo Privacidad y Términos tienen la misma `meta description` del sitio. No es accesibilidad; sí SEO. Archivo: `config/routes.ts` (campo `description` por página) / `app/App.tsx`.
- **B2 · Texto ligeramente bajo AA en Inicio (4,28 a 4,40:1, mínimo 4,5)**: «All-on-4 & All-on-6» (blanco, 16 a 18,7 px) y «Implants» (alfa .86) en el selector de la figura del héroe, sobre el fondo de la figura; en ES «All-on-4 y All-on-6» e «Implantes». Medido en el percentil 5 de los píxeles detrás del texto; el resto de textos medidos (más de 2000 en 11 páginas EN y 5 ES) cumple. Archivo probable: `styles/hero.css` / `styles/featured.css` (`.sc__tabs`).
- **B3 · Cuerpo de carta legal enfocable sin necesidad**: en `/en/terms-and-conditions` y `/es/…` a 1440 cada carta activa tiene `tabindex=0` en `.legal-card__body` aunque no se desplaza (scrollHeight = clientHeight). Es una parada de Tab sin función y sin nombre accesible. Archivo: `components/LegalDocument.tsx` (`tabIndex={stacked ? 0 : undefined}`): ponerlo solo si ese cuerpo realmente se desplaza y darle `role="region"` + `aria-labelledby`.
- **B4 · Teclado en las cartas apiladas**: desde el cuerpo de una carta, Tab salta al pie (las otras cartas están `inert`). Se llega a las demás cartas por el índice (probado: Enter lleva a la carta, `aria-current` y `inert` se actualizan) o con PageDown. Funciona, pero no es evidente; sugerencia de una línea de ayuda o que el índice sea lo primero en el orden (ya lo es).
- **B5 · Pausa no se conserva al recargar** (estado en memoria, `lib/motion.ts`): quien pausa debe volver a pausar en cada carga. Para WCAG 2.2.2 basta que exista el control; sugerencia: `localStorage`.
- **B6 · Blog descarga los dos idiomas**: `BlogRoute` (45 KB, 14 KB gzip) importa `blog.en.json` y `blog.es.json` juntos (`lib/blog.ts` líneas 3-4); un lector en EN descarga también el JSON en español. Solo afecta a `/blog`.
- **B7 · Precarga por intención**: `Link` hace `prefetch` en foco/hover. Pasar con Tab por el menú «More» o el pie descarga el chunk del blog (y de las demás páginas). No hace que ninguna página lo cargue por defecto, pero un recorrido de teclado lo trae.

---

## Teclado (EN y ES, 375 y 1440): lo que PASA
- Orden de Tab: Saltar al contenido → logo → Home/Services/Benefits/Contact/About/More → selector de idioma → redes → CTA/teléfono → contenido → pie, 36 a 66 paradas por página, sin trampas y con salida al navegador al final. Los «saltos hacia arriba» detectados son columnas del pie y héroe en dos columnas (orden DOM coherente con la lectura).
- Indicador de foco: 100 % de las paradas lo tienen (anillo de 3 px `rgb(52,191,204)` con 3 px de separación, o el contenedor del buscador del FAQ por `:focus-within`, 2 px). Enlace «Saltar al contenido» visible al enfocar (texto `#2a4269` sobre blanco, ≈9:1).
- Menú de escritorio (Services, Benefits, More): Enter abre (`aria-expanded`), Flecha abajo entra al primer enlace, End va a «View all…», Flecha abajo da la vuelta, Escape cierra y devuelve el foco al botón, Tab/Shift+Tab fuera cierra. Igual en ES.
- Menú del celular: el panel recibe el foco en «Home», `main`/pie/enlace de salto quedan `inert`, el cuerpo no se desplaza, Tab no se escapa a la página de atrás, Benefits como acordeón, Escape cierra primero el submenú y luego el panel y devuelve el foco al botón «Menu». Cambiar de idioma desde el panel cierra el panel.
- Selector de idioma: Enter lleva a la misma página en el otro idioma (`/en/services` ↔ `/es/servicios`), cambia `<html lang>` (`en` ↔ `es-MX`) y `title`, y el foco pasa a `<main>`.
- Hub de servicios: los filtros son botones con `aria-pressed`; Espacio y Enter alternan; el estado se anuncia («3 of 11 services highlighted» / «3 de 11 servicios resaltados», `role=status`); no se esconde ninguna tarjeta (11 visibles, 8 atenuadas, siguen enfocables); Enter en una tarjeta abre su página.
- FAQ: Enter y Espacio alternan; flechas, Home y End mueven entre preguntas; paneles cerrados `inert` (11 de 12); buscador con «sin resultados» visible; contador `aria-live`.
- Cartas legales apiladas (1440): 14 cartas, 13 `inert`; el índice activa la carta y mueve `aria-current`; a 375 son acordeón con `aria-expanded`.
- `lang` en fragmentos: `<html lang>` correcto por idioma; el selector lleva `lang`/`hreflang` del otro idioma; las reseñas en inglés dentro de `/es` llevan `lang="en"`. `hreflang` (en, es-MX, x-default) presente en todas las páginas y apuntando a la contraparte correcta.
- Texto en el idioma equivocado: la heurística no encontró textos de interfaz en inglés dentro de `/es` ni en español dentro de `/en` (salvo nombres propios y las reseñas marcadas).
- Estructura: 1 `h1` por página en las 26 rutas por idioma/viewport, `main` y enlace de salto en todas, sin imágenes sin `alt`, sin botones/enlaces sin nombre, sin desbordamiento horizontal.
- Tamaño de objetivo: ningún control por debajo de 24×24 px en Inicio, Services, Contact, FAQ y Términos (375 y 1440, EN y ES).
- Consola: 0 errores y 0 avisos en todas las páginas y viewports.

## Reducir movimiento y pausa global
- `prefers-reduced-motion: reduce`: 0 animaciones corriendo, 0 layouts/s, 0 recálculos/s, 0 textos ocultos tras recorrer toda la página. En 16 rutas a 1440 y 9 a 375. PASA.
- Pausa global (botón del pie): 0 animaciones, 0 layouts/s, CPU 0 a 1,6 %. PASA como control, pero ver A1 (deja invisible parte del contenido). Hubo un «Target crashed» del navegador una sola vez en `/en/benefits` con la pausa puesta en una tirada larga; no se reprodujo en la repetición completa. Se anota sin confirmar.
- Existe además el botón flotante de pausa y el botón «Pause All-on-4 & All-on-6 animation» del héroe.

## Contraste de textos nuevos
Método: texto ocultado con CSS, captura real, muestreo del fondo detrás de cada fragmento, mezcla con la opacidad del elemento y comparación con 4,5:1 (3:1 en texto grande).
- Inicio, Services, ficha de servicio, Benefits, Insurance, Financing, Agreements, Contact, About, FAQ y Términos en 1440 y 375 (EN) y Inicio, Contacto, Beneficios, Nosotros y FAQ en ES 1440: sin fallos reales salvo B2. Los otros «fallos» del script son falsos positivos (enlace de salto y textos `sr-only` fuera de pantalla: `.ba-vh`, `.brk-sr`).
- Tarjetas atenuadas del filtro (opacidad 0,60): sin hallazgos de contraste.
- No medido: texto en degradado (`background-clip:text`: 4 en Inicio, 1 en Contact, omitidos por el método) y estados `:hover`.

## Rendimiento

### Build (chunks, bytes y gzip)
| Archivo | Bytes | gzip |
|---|---|---|
| `index-*.js` (app + contenido EN/ES) | 304 585 | 94 520 |
| `index-*.css` | 127 923 | 26 687 |
| `BlogRoute-*.js` | 45 043 | 14 027 |
| `figure-*.js` (motor de la figura) + css 7,5 KB | 30 084 | 12 400 |
| `LocationMap-*.js` | 27 727 | 9 506 |
| `FooterCity-*.js` | 24 917 | 3 223 |
| `legal-*.js` | 24 065 | 8 884 |
| `services-*.js` | 20 130 | 6 983 |
| `Faq-*.js` / `About-*.js` | 10 922 / 6 651 | 4 021 / 2 586 |
| resto (≤ 8 KB cada uno, 15 archivos) | — | — |

Total JS ≈ 542 KB sin comprimir. Imágenes: `insurers/` 408 KB, `smiles/` 104 KB, `benefits/` 64 KB. Fuentes self-hosted con 3 precargas.
Observaciones: el `index` en 94 KB gzip es el grueso (incluye contenido EN+ES de todas las páginas); no es un fallo, pero cada idioma carga el texto del otro. CSS 27 KB gzip global.

### Qué carga cada página (JS, por la red, a 1440; a 375 igual salvo Contact)
- Siempre: `index`, `lang`, `financing`, `clinic`, `services`, `FooterCity` (modulepreload del HTML).
- `/en` y `/es`: + `BeforeAfter`, `ResultFigure`, `figure` (figura del héroe; se usa de verdad).
- `/services`: + `Services`. Ficha de servicio: + `Service`, `Figure`, `figure`. `/benefits`: + `Benefits`, `Financing`, `BenefitsHeader`. `/insurance`, `/financing`, `/agreements`: + su página y `BenefitsHeader`. `/contact`: + `LocationMap` solo a 1440 (a 375 no la carga). `/about`: + `About`, `soft`. `/faq`: + `Faq`. Legales: + `Privacy`/`Terms`, `soft`, `legal`. `/blog`: + `BlogRoute`.
- Ninguna página carga el blog sin necesidad (solo `/blog`, salvo B7). Ninguna carga la figura sin necesidad (solo Inicio y fichas de servicio). Error 404 y demás: sin extras.
- 0 respuestas 4xx/5xx en ninguna ruta.

### Animaciones costosas en reposo (4 s de medición, sin tocar nada)
| Página | layouts/s | recálculos/s | CPU hilo principal |
|---|---|---|---|
| `/en`, `/es` (1440) | 55 | 55 | 30 a 35 % |
| `/en` (375) | 55 | 55 | 23 % |
| `/en/contact`, `/es/contacto` (1440 y 375) | 55 | 55 | 19 a 21 % |
| `/en/services/dental-implants` (1440) | 8,5 | 55 | 20 % |
| Resto de páginas | 0,2 | 55 | 8 a 18 % |
| Cualquier página con «reducir movimiento» | 0 | 0 | 0 % |
| Cualquier página con la pausa global | 0 | 0 | 0 a 1,6 % |

Los 55 recálculos/s de las páginas «tranquilas» salen de `fc-breathe` (opacidad con `calc(var(--glow)…)`, logo neón) y `ftr-dot` (`box-shadow` del punto de emergencias): al desactivar ambos pasan a 0 y la CPU de 5,6 a 3,1 %. Cuesta poco (3 a 5 %), pero es trabajo continuo del hilo principal en todas las páginas; `ftr-dot` podría usar `transform/opacity` en un pseudo-elemento y `fc-breathe` valores sin `calc(var())` para que corran en el compositor.

---

## No verificado
- Lector de pantalla (NVDA/VoiceOver): no hay; anuncios de `role=status` y `aria-live` solo se comprobaron en el DOM.
- axe-core: no instalado, no se corrió; las revisiones de WCAG son parciales (foco, nombres, contraste, objetivo, `lang`, estructura). Falta zoom 400 %, tamaño de texto 200 %, modo de alto contraste y navegación por voz.
- Contraste de texto en degradado y de estados `hover`; contraste de iconos y bordes de controles (1.4.11).
- Una sola ficha de servicio (implantes) para el rendimiento de la figura; el resto de servicios sin medir.
- Las cartas legales a 768 px (tableta) y la ventana de reseñas por teclado en detalle.
- Rendimiento medido en local (`vite preview`, sin CDN ni compresión del servidor) y con Edge de escritorio; sin Lighthouse/INP/LCP reales, sin CPU lenta.
- Nada se envió: no se usó ningún formulario (el formulario del inicio y Contact no se enviaron).

## Pendientes para el Jefe
1. Corregir A1 antes de cerrar la ronda (alto): visible con la pausa en Inicio y About.
2. R1 y R2 (medios): apagar el letrero y la figura cuando no se ven, o ligarlos a la pausa por visibilidad.
3. Decidir si B2 a B7 entran en esta ronda; ninguno bloquea.
4. Repetir esta pasada tras los arreglos (A1 se comprueba con los pasos de arriba en 4 combinaciones: EN/ES × 375/1440).
