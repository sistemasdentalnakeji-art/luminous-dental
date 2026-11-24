# QA 2 · Rendimiento y accesibilidad de los cambios del 23-11 · Luminous Dental

Fecha: 2026-11-23 · Quien mide: QA 2 (`ld-qa-2`) · Modo ponytail encendido · Sin cambios de código.
Producción medida: `npm run build` (tsc + vite, en verde) y `vite preview` en el puerto 5193 (ya apagado; el 5181 no se tocó, sigue respondiendo 200).
Línea base: `docs/rendimiento-1.md` (19-11).

## Herramientas (qué había y qué no)
- **Lighthouse: NO está instalado** (`npx --no-install lighthouse` falla). No instalé nada. No hay puntajes Lighthouse reales.
- Usé `playwright-core` (viene con el `@playwright/cli` global) con Microsoft Edge 158 sin ventana, caché apagada, y CDP: Performance Observer (FCP, LCP, CLS, long tasks, Event Timing), `Performance.getMetrics` y trazas (`Tracing`).
- Móvil = 412×823, ×1.75, **CPU ×4 y red 1.6 Mbit / 150 ms** (los mismos parámetros de Lighthouse móvil, pero aplicados con CDP, no simulados). Escritorio = 1350×940 sin límites. Mediana de 3 corridas. Es una sola PC: sirve para comparar, no como número absoluto.
- Los «puntajes» de abajo son una **estimación mía** con la curva de puntaje de Lighthouse aplicada a FCP, LCP, TBT y CLS (sin Speed Index), no un resultado de Lighthouse.

## Tabla resumen (antes = `rendimiento-1.md` · ahora = esta medición)

| Métrica | Antes (19-11) | Ahora (23-11) | Meta | Estado |
|---|---|---|---|---|
| JS principal, gzip (build) | 89.25 KB | **97.17 KB** (+7.9 KB, +8.9 %) | — | sube |
| Inicio `/`: JS que baja al abrir (gzip, 7 archivos) | 91.6 KB | **114.2 KB** (+25 %) | ≤150 KB | cumple |
| Inicio `/`: JS tras recorrer toda la página | — | 124–132 KB | ≤150 KB | cumple |
| `/insurance-financing`: JS al abrir | — | 103.4 KB | ≤150 KB | cumple |
| CSS (gzip, bloquea el primer dibujo) | 17 KB | **22.7 KB** (+5.7 KB) | — | sube |
| Inicio: peticiones / KB al abrir (escritorio) | 17 / 568.2 | **18 / 581.1** | — | igual |
| Contact: peticiones / KB | 14 / 516.0 | 12 / 523.7 | — | igual |
| `/insurance-financing`: peticiones / KB al abrir | — | 36 / 866.8 (logos 426 KB) | — | informativo |
| FCP `/` escritorio | 892–928 ms | 216–272 ms (otro método y PC: **no comparable**) | — | — |
| FCP `/` móvil (CPU ×4, 1.6 Mbit) | ≈3.9 s | **3.1 s** | — | mejor |
| LCP `/` móvil | — | **4.24 s** (imagen antes/después) | ≤2.5 s | **falla** |
| LCP `/` escritorio | — | 0.51 s | ≤2.5 s | cumple |
| LCP `/insurance-financing` móvil / escritorio | — | 3.30 s (logo.png) / 0.78 s | ≤2.5 s | móvil falla |
| CLS `/` móvil / escritorio | — | **0.094** / 0 | ≤0.1 | cumple raspando |
| CLS `/insurance-financing` móvil / escritorio | — | **0.906 / 0.804** | ≤0.1 | **FALLA** |
| TBT `/` móvil / escritorio | — | **589 ms** / 13 ms | ≤200 ms | móvil **falla** |
| TBT `/insurance-financing` móvil / escritorio | — | 152 ms / 0 | ≤200 ms | cumple |
| INP aproximado (Event Timing, móvil ×4) | — | mediana 96 ms; un pico de 224 ms (Tab) en 1 de 3 corridas | ≤200 ms | borde |
| INP aproximado escritorio | — | 32 ms | ≤200 ms | cumple |
| Rendimiento móvil (estimado, no Lighthouse) | — | `/` ≈ **60**, `/insurance-financing` ≈ **60** (≈86 si el CLS fuera 0) | ≥90 | **falla** |
| Rendimiento escritorio (estimado) | — | `/` ≈ 100, `/insurance-financing` ≈ **73** (≈99 sin CLS) | ≥90 | seguros falla |
| Accesibilidad / Buenas prácticas / SEO (Lighthouse) | — | **no medido** (ver sección de accesibilidad) | ≥95 | no verificado |

Errores de consola en las 12 corridas: 0.

### Peso de cada chunk (gzip, del build)
| Archivo | gzip | Cuándo baja |
|---|---|---|
| `index` (app + FamilyCare + InsurancePlans + Home) | 97.17 KB | siempre |
| `jsx-runtime` | 3.12 KB | siempre |
| `FooterCity` | 2.81 KB (+ `city.svg` 12 KB dentro del chunk) | al abrir |
| `figure` / `Figure` / `ResultFigure` | 8.86 / 2.56 / 1.02 KB | Home (antes/después) |
| `BeforeAfter` (+CSS 0.94) | 1.13 KB | Home |
| `clinic` | 1.18 KB | siempre |
| `LocationMap` | 9.65 KB | al acercarse el mapa |
| `blog` + `BlogRoute` | 7.02 + 1.84 KB | solo Blog |
| `Insurance`, `Services`, `Service`, `About` | 0.61, 0.72, 0.93, 0.54 KB | solo su página |
| CSS `index` / `figure` | 22.70 / 2.18 KB | siempre / Home |
| Fuentes (4 de 6 archivos se bajan) | 312.5 KB | al abrir |

## Hallazgos (gravedad y propuesta; no se arregló nada)

### H1 · ALTA · Salto de diseño enorme en las páginas que cargan aparte (CLS 0.80 a 0.91)
- **Observado:** `/insurance-financing`, `/services`, `/about` y `/blog` dan CLS **0.80–0.81 incluso en escritorio** (a 722 ms); en móvil lento 0.90 a los 3.1 s. `/contact` (que no carga aparte) da 0. Las fuentes del desplazamiento que reporta el navegador son `ftr` y el SVG de la ciudad: el pie aparece arriba y baja de golpe cuando llega el archivo de la página.
- **Causa (inferida del código y de las fuentes del desplazamiento):** `app/App.tsx:66` usa `<Suspense fallback={null}>`: mientras baja el archivo de la página, el pie queda a la vista sin nada encima. Viene del cambio a páginas «lazy» del 19-11; `rendimiento-1.md` no midió CLS, así que no se vio.
- **Efecto:** es el 25 % del puntaje; solo por esto `/insurance-financing` pasa de ≈99 a ≈73 en escritorio y de ≈86 a ≈60 en móvil.
- **Propuesta:** fallback con alto reservado (por ejemplo un `div` con `min-height: 100svh` en lugar de `null`), o no pintar el `Layout` del pie hasta que la página esté lista, o precargar el archivo de la página al navegar (ya se hace al pasar el cursor, pero no en la carga directa). Después, repetir la medición de CLS en las 4 rutas.

### H2 · ALTA · Rendimiento móvil de Inicio por debajo de 90 (estimado ≈60): LCP 4.2 s y TBT 589 ms
- **Observado:** FCP 3.1 s, LCP 4.24 s, TBT 589 ms. El elemento LCP es `/smiles/caso1-antes.jpg` (24 KB), la imagen del antes/después. En la traza (con el sobrecosto de trazar, así que las cifras son aproximadas) hay una sola tarea de JS de ~970 ms (render de toda la Home), otra de ~490 ms de layout y una de ~290 ms.
- **Causa (inferida):** la imagen LCP solo se descubre cuando corre el JS (no hay `preload` ni `fetchpriority="high"`); la Home pinta todas sus secciones en una sola tarea; las 2 fuentes Newsreader pesan 292 KB.
- **Propuesta:** `fetchpriority="high"` o `<link rel="preload" as="image">` para la imagen LCP; diferir lo que está bajo la primera pantalla (Reviews, Insurance, Appointment, mapa) con `lazy`/IntersectionObserver para partir esa tarea de ~970 ms; revisar el peso de la cursiva de Newsreader (ya anotado como pendiente en `rendimiento-1.md`).
- **Límite:** CPU ×4 aplicado con CDP en una PC que no es el equipo de referencia de Lighthouse. Confirmar con Lighthouse real o PageSpeed Insights cuando haya URL pública.

### H3 · MEDIA · Contraste del texto «por llegar» de FamilyCare (opacidad 50 %)
- **Medido** (pixel real del fondo con el texto oculto, color × opacidad compuesto):

| Texto | Escritorio | Móvil | Necesita |
|---|---|---|---|
| Descripción (p, 17 px) apagada | **3.27:1** | **4.23:1** | 4.5:1: **falla en los dos** |
| Título (h3, 34–62 px) apagado | 3.18:1 | 4.41:1 | 3:1: pasa |
| Título y descripción encendidos | 10.8 / 10.2:1 | 12.4 / 11.7:1 | pasa |

- **Observado:** la opacidad .50 sobre el resplandor azul del fondo (`.fam::before`) deja la descripción bajo 4.5:1. Los textos son enlaces activos, así que no aplica la excepción de componentes inactivos (1.4.3). Se ve solo hasta que la estrella llega a ese grupo.
- **Propuesta:** subir `.fam__path--live .fam__stop:not(.is-lit) .fam__link` de `opacity:.5` a **≥ .75** (con el fondo más claro medido da 4.79:1; con .70 queda en 4.41:1, no alcanza), o atenuar con color en vez de opacidad. El título aguanta .5 en escritorio por poco; con .75 también queda holgado.

### H4 · MEDIA · Pie: las ventanas y farolas repintan toda la ciudad en cada cuadro
- **Medido** (CPU ×4, ms de hilo principal por segundo; referencia en reposo arriba de Inicio: pintado 59 ms/s, estilos 134 ms/s):

| Fase del pie | Pintado | Recalc. de estilos |
|---|---|---|
| Dibujo de líneas, primeros 5 s (`fc-draw` anima `--p`) | 259 ms/s (4.4×) | 291 ms/s (2.2×) |
| «Vivo» (8 ventanas `fc-twinkle` + 5 farolas `fc-lamp`) | **308 ms/s (5.2×)** | 147 ms/s |

- **Causa (inferida del código y de `getAnimations()`):** `opacity` sobre elementos dentro de un SVG no se compone en su propia capa: cada cuadro repinta el SVG entero (81 trazos). Y `fc-draw` anima una propiedad personalizada heredada que 81 elementos usan en `calc()/clamp()`, así que recalcula los estilos de todos en cada cuadro durante 5 s.
- **Atenuante:** solo corre con el pie a la vista (`is-live` por IntersectionObserver), una sola vez el dibujo, y con reducir movimiento o la pausa queda quieto (verificado: 0 animaciones corriendo en pie, FamilyCare y header con `prefers-reduced-motion`). A velocidad real el costo es ~1/4 de lo de la tabla.
- **Propuesta:** animar menos nodos (agrupar ventanas en 3 o 4 `<g>` y animar el grupo), o sacar ventanas y farolas a capas HTML con `will-change: opacity`; para el dibujo, WAAPI sobre `stroke-dashoffset` por grupo en vez de 81 `calc(var(--p))`, o saltarlo en móvil.

### H5 · MEDIA-BAJA · Estrella con scroll (FamilyCare): sin regresión visible, pero con trabajo evitable
- **Medido:** al recorrer la sección, cuadros igual de fluidos que al recorrer la sección de Reseñas (referencia sin estrella): escritorio p50 18.1 ms / p95 19.1; ×4 p50 35.9 / p95 37.0 (ambos a la cadencia del limitador); móvil ×4 p95 36.8. 0 layouts extra respecto a la referencia. Estrella y relleno solo usan `transform`; el hilo usa `scaleY`.
- **Observado:** `update()` produjo **18–20 layouts forzados** por recorrido (~10 % de los cuadros) en el bundle (`n@index-*.js:48`, que por su contenido es el `update` de FamilyCare). La referencia de Reseñas tiene 81–168 forzados de otras funciones (`a`, `g`), así que no es exclusivo de lo nuevo. Ocurre al leer 5 `getBoundingClientRect` después de que otro código del mismo cuadro ensució el layout.
- **Inferido del código (no medido por separado):** el listener de `scroll` es global y corre siempre, aunque la sección esté fuera de pantalla; reescribe `--y0` y `--len` en cada cuadro aunque no cambien (invalida estilos del subárbol).
- **Propuesta:** (a) activar el listener solo con la sección en pantalla (IntersectionObserver); (b) medir los nodos en `ResizeObserver`/fuentes cargadas, guardar `ys`, y en scroll leer solo `el.getBoundingClientRect().top`; (c) escribir `--y0`/`--len` solo si cambian. Con eso el scroll hace 1 lectura y 1 escritura (`--p`).

### H6 · BAJA (pre-existente, decisión pendiente desde el 19-11) · Piso de costo en reposo
- **Observado:** arriba de Inicio, sin tocar nada, hay ~56 layouts + 56 recálculos de estilo por segundo y 2 bucles `requestAnimationFrame` a 30 fps: el fondo WebGL **`.meshy` sigue visible** (canvas 675×470 `display:block`; `site.css:19` `.meshy{display:none}` sigue perdiendo contra `.backdrop canvas`, tal como anotó `rendimiento-1.md`) y las estrellas fugaces 2D. Además `neon-sweep` (background-position ×24 en reseñas) y `vsign-bulb` (×58 sobre SVG) corren siempre aunque estén fuera de pantalla; en la traza aparecen layouts con raíz `svg.vsign` y `svg.iso-svg`.
- **Por qué importa:** es el suelo sobre el que se suman las animaciones nuevas, y consume batería en celulares. `Backdrop.tsx` y `Marquee.tsx` no cambiaron el 23-11.
- **Propuesta:** aplicar `.backdrop .meshy{display:none}` (el comentario del código dice que se ocultó a propósito el 19-11); pausar las animaciones de reseñas fuera de pantalla (`animation-play-state` con IntersectionObserver).

### H7 · BAJA · Peso: CSS +5.7 KB y JS de Inicio +25 %
- JS al abrir 91.6 a 114.2 KB y `index` 89.25 a 97.17 KB: cumple el ≤150 KB, pero cada ronda suma. CSS 17 a 22.7 KB gzip y **bloquea el primer dibujo**; `family-care.css` y `time-picker.css` entran al CSS global aunque FamilyCare vive solo en Home (ver «Propuesta»).
- `logo.png` (640×365, **75 KB**) se muestra a ~120–200 px y es el LCP de `/insurance-financing` móvil (3.3 s). **Propuesta:** WebP/AVIF a 2× del tamaño de uso (≈10–15 KB estimado, no probado).
- **Propuesta CSS:** dividir lo exclusivo de Home en un CSS que cargue con su componente, como ya se hizo con `figure`/`BeforeAfter`.

### H8 · BAJA · CLS móvil de Inicio 0.094 (límite 0.1)
- **Observado:** un desplazamiento de 0.088 en `.fam` a los ~3.9 s, cuando termina de bajar la fuente Newsreader (138 KB) en red lenta; solo en móvil lento.
- **Propuesta:** fuente de reserva con `size-adjust`/`ascent-override` para que el título no cambie de alto al cambiar de letra, o reservar alto del título de FamilyCare.

### H9 · BAJA · Header
- Neón del header: dos `img` con `drop-shadow` triple (10 y 28 px) más `fc-ignite` 2 s al abrir (opacidad, compone bien); sin costo propio medible. `.hdr::before` usa `backdrop-filter: blur(14px)` encima de un fondo 97–98 % opaco: el desenfoque casi no se nota y la GPU lo recalcula al hacer scroll, sobre todo en móvil. **Propuesta:** quitarlo (no cambia cómo se ve).

## Costo de las animaciones nuevas (resumen)
| Animación | Veredicto |
|---|---|
| Estrella con scroll (FamilyCare) | Fluida y solo `transform`/`opacity`; ver H5 por layouts forzados y listener global |
| Ventanas y farolas del pie | Repintan el SVG entero por cuadro: H4 |
| Dibujo de líneas del pie (5 s, una vez) | Recalcula 81 elementos por cuadro: H4 |
| Llenado de botones (`clip-path`) | Sin layouts extra (417 recálculos en 8.6 s con 6 hovers, igual que reposo); repinta solo el botón 0.45 s. Sin hallazgo |
| Neón del header | Estático tras 2 s de encendido; sin hallazgo propio (H9 menor) |
| Reducir movimiento / pausa | Verificado: 0 animaciones en pie, FamilyCare y header; estrella al final y 4 de 4 grupos encendidos |

## Accesibilidad (WCAG 2.2 AA)
**Medido, pasa:** título blanco del pie 18.2:1; títulos Services/Clinic/Contact (azul medicina) **8.22:1** (necesita 4.5); enlaces y textos del pie 12–17:1; botón lleno (azul noche sobre medicina) **7.99:1** en `.btn`, `.hx-btn-main` y «See all services», en reposo 9.83:1; FamilyCare encendido 10–12:1. 1 solo `h1` por página, sin saltos de nivel, sin `id` duplicados, 0 controles sin nombre, 0 imágenes sin `alt`, `lang="en"`, `main`, 3 `nav`, enlace para saltar, 69–70 paradas de Tab con indicador visible en Inicio y Seguros (el selector del antes/después pinta el aro en su contenedor).
**Falla:** H3 (descripción apagada de FamilyCare, 2.1 criterio 1.4.3). **Dudoso:** los 2 botones del carrusel en móvil miden 22×44 px (menos de 24 de ancho, criterio 2.5.8; ya existían antes del 23-11).
**Cobertura limitada:** esto es mi barrido propio con Playwright; **no corrí axe ni Lighthouse** (no están instalados), así que no puedo dar el puntaje de accesibilidad/buenas prácticas/SEO ≥95. Un barrido automático cubre ~30–40 % de WCAG: falta lector de pantalla y revisar orden de foco con el teclado completo.

## No verificado
- Puntajes reales de Lighthouse (rendimiento, accesibilidad, buenas prácticas, SEO) y Speed Index.
- Teléfono real y GPU real (el costo de pintado de H4/H6 en una GPU de celular puede ser mayor o menor).
- `/services`, `/about`, `/blog` solo se midieron para CLS (0.80, 0.80, 0.80); no se hizo el resto de métricas.
- Contraste de `.hdr` con el neón en cada fondo de página; solo el pie, FamilyCare y botones.
- Dónde exactamente nace cada layout forzado de H5 (se identificó la función, no la línea ni qué escribe antes).
- Scripts de medición: quedaron en la carpeta temporal de la sesión, no en el repositorio.

## Pendientes para el jefe
1. Decidir quién arregla H1 y H2 (afectan el puntaje móvil y Seguros).
2. Pasar H3 a Frontend para el cambio de opacidad (un valor).
3. Repetir esta medición después de H1/H2/H3/H4, y con Lighthouse real si se permite instalarlo.
