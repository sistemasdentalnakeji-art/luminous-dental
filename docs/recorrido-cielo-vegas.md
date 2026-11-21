# Recorrido «del cielo a Las Vegas» · versión 2

Prototipo: `docs/maquetas/recorrido-cielo-vegas/index.html` (doble clic; fotos, logo y `dots.js` al lado). Copia temporal para el servidor: http://localhost:5181/_maquetas/recorrido/index.html (carpeta `apps/web/public/_maquetas/recorrido/`; borrar antes de publicar). Autor: Diseñador UI-UX 2 · 20-11-2026. Estado: propuesta, falta elegir la variante del héroe.

## Enlaces para la dueña (diseños ya hechos, con código y licencia)
Comprobados el 20-11-2026: cada enlace respondió 200 a mi herramienta. «Licencia» sale de la API de GitHub o de la página; si dice «no verificada», hay que revisarla antes de copiar nada. **Ningún código se copió**: el prototipo es propio, hecho a partir de estas ideas.

### A) Parte derecha del héroe
| Diseño | Demo | Código / repo | Licencia | Qué se toma | Variante |
|---|---|---|---|---|---|
| Aceternity UI · Compare | https://ui.aceternity.com/components/compare | Se instala con `npx shadcn@latest add @aceternity/compare` (no muestra repo público) | No verificada (la página enlaza una sección «Licence») | Comparador por arrastre/hover con handle; chispas en el divisor | **Hero A** |
| Aceternity UI · Sparkles | https://ui.aceternity.com/components/sparkles | Igual (`@aceternity/sparkles`) | No verificada | Partículas pequeñas que brillan: chispas sobre el divisor | **Hero A** |
| react-compare-slider | https://react-compare-slider.js.org | https://github.com/nerdyman/react-compare-slider | MIT | Control accesible con teclado y arrastre; se usará como guía (o como librería) en React | A, B, C |
| img-comparison-slider | https://img-comparison-slider.sneas.io | https://github.com/sneas/img-comparison-slider | MIT | Otra opción de comparador (con versión React) | A, B, C |
| Magic UI · Orbiting Circles | https://magicui.design/docs/components/orbiting-circles | https://github.com/magicuidesign/magicui | MIT | Elementos que giran en una órbita elíptica alrededor del centro | **Hero B** |
| Magic UI · Particles | https://magicui.design/docs/components/particles | https://github.com/magicuidesign/magicui | MIT | Campo de partículas en canvas con reacción al cursor | **Hero C** |
| tsParticles | https://particles.js.org | https://github.com/tsparticles/tsparticles | MIT | Partículas y enlaces en canvas, ideas de rendimiento | Hero C |
| React Bits · Galaxy (fondos) | https://reactbits.dev/backgrounds/galaxy | https://github.com/DavidHDev/react-bits | MIT + Commons Clause (se puede usar en un sitio web; no se puede revender como componente) | Cielo vivo de fondo | Ideas para B y C |
| 21st.dev (buscador de componentes) | https://21st.dev/s/compare | https://github.com/serafimcloud/21st | MIT (el sitio; cada componente tiene su licencia) | Más comparadores y efectos; no tomé ninguno | Para buscar |

### B) Ciudad del pie (dibujo de líneas al llegar)
| Diseño | Demo | Código / repo | Licencia | Qué se toma |
|---|---|---|---|---|
| Interactive Skyline (Las Vegas y Salt Lake) | https://slc-skyline.vercel.app | https://github.com/kevintraver/interactive-skyline | MIT | Referencia de siluetas de edificios de Las Vegas |
| CSS parallax city skyline | https://harryli0088.github.io/css-parallax-city-skyline/ | https://github.com/harryli0088/css-parallax-city-skyline | Sin licencia: solo guía visual, no copiar | Capas de skyline con profundidad |
| Scroll-driven Animations (demos) | https://scroll-driven-animations.style/ | No encontré el repo por la API (no verificado) | No verificada | Patrones para ligar el dibujo al scroll sin JavaScript |
| GSAP DrawSVG | https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/ | Plugin de GSAP (se instala con npm) | Licencia propia de GSAP, hoy gratuita («free for everyone» en gsap.com/standard-license); no es MIT | Dibujar trazos SVG; alternativa si se quiere más control |
| Técnica `stroke-dashoffset` | https://css-tricks.com/svg-line-animation-works/ y https://jakearchibald.com/2013/animated-line-drawing-svg/ | Artículos | Artículos | La técnica base, que el prototipo usa con `pathLength="1"` |

### C) Neón realista
| Diseño | Demo | Código / repo | Licencia | Qué se toma |
|---|---|---|---|---|
| css-neon-sign | https://github.com/oh-kay-blanket/css-neon-sign (la demo está en el README) | mismo enlace | MIT | Capas de resplandor para texto e iconos |
| Tubelight Text CSS | https://volodymyrsaienko240.github.io/Tubelight-Text-CSS/ | https://github.com/volodymyrsaienko240/Tubelight-Text-CSS | MIT | Efecto de tubo encendido y apagado |
| Uiverse (galería de elementos) | https://uiverse.io (a mi herramienta le dio 403: **no verificado** el elemento concreto) | https://github.com/uiverse-io/galaxy | MIT (repo) | Fuente de ideas de neón y botones luminosos |
| SVG neon sign effect | https://github.com/gsn1074-svg-examples/svg-neon-sign-effect | mismo enlace | Sin licencia: solo guía | Neón hecho con SVG y filtros |
| CSS-Tricks · neón con CSS | https://css-tricks.com/how-to-create-neon-text-with-css/ | Artículo | Artículo | Capas: halo, cuerpo y núcleo blanco |

CodePen: la búsqueda directa respondió 403 y no usé nada de ahí.

## Cambios pedidos y cómo quedaron
1. **Ciudad = parte del pie.** El resto de la página queda en cielo nocturno. La ciudad es una escena dentro del pie y se dibuja desde abajo (calle, edificios, monumentos) cuando el pie asoma, y queda completa al llegar al final. Las **montañas** son lo último, pegadas al borde de abajo de la página (dos cordilleras rellenas). Letrero de neón de pie sobre la calle, con dirección y teléfono.
2. **Neón con tubos de verdad.** «Luminous Dental» se **redibujó como trazo de tubo**: «Dental» y la curva del logo se trazaron automáticamente a partir del logo real (línea central de cada letra); «Luminous» está dibujado a mano siguiendo su letra cursiva. Cada tubo tiene: vidrio apagado visible, vidrio encendido de color, núcleo blanco y halo borroso; **tapones** en las puntas (uniones), **clips** con tornillo a lo largo del tubo, y un **tablero de metal con remaches**, poste y soportes. Al llegar se enciende con un parpadeo corto de 2 s, letra por letra (Luminous, Dental, curva, estrella). Sin movimiento: queda encendido sin parpadeo. Base de ideas: css-neon-sign y Tubelight (capas), CSS-Tricks (halo/cuerpo/núcleo).
3. **Tres formas para el héroe** (botones «Hero A / B / C» arriba de la maqueta).
   - **A · Comparador futurista** (base: Aceternity Compare + Sparkles, teclado de react-compare-slider): tarjeta redondeada con esquinas tipo visor, un barrido de luz que revela el «antes» con chispas, y un divisor con chispas que revela el «después».
   - **B · Casos en órbita** (base: Magic UI Orbiting Circles): el comparador dentro de un círculo luminoso; alrededor giran los casos (se toca uno para verlo) y una burbuja de reseñas de pacientes que es **solo un lugar reservado: contenido por confirmar con la clínica**.
   - **C · Sonrisa en partículas** (base: Magic UI Particles / tsParticles): la sonrisa se arma con miles de puntitos que vuelan desde el cielo; el divisor los cambia de «antes» a «después» y los puntos junto a la línea saltan.
   La constelación de la versión 1 sigue en `docs/maquetas/antes-despues-constelacion/` por si se prefiere.

## Qué se conserva en las tres
Teclado (flechas en el control), botones Before/After, pausa, pestañas de casos, etiquetas «Before»/«After», `alt` descriptivos, «Individual results vary.» visible, y movimiento reducido o `data-motion-paused` = todo quieto y visible (ciudad dibujada, neón encendido sin parpadeo, foto abierta y divisor al 50 %).

## Especificación para React
Archivos nuevos; solo se toca un archivo existente: el pie.

**Héroe**
- `components/hero/HeroSmile.tsx` (contenedor con los controles comunes: `range`, botones, pestañas, pausa, leyenda, lógica de línea de tiempo) y un archivo por variante que se decida: `HeroCompare.tsx` (A), `HeroOrbit.tsx` (B), `HeroParticles.tsx` (C). Solo se programa la variante elegida.
- `features/hero/engine.ts` (canvas: chispas / partículas, sin React), `styles/hero-smile.css`, `content/smileCases.ts` (casos, `alt`, rutas). Fotos WebP en `public/smiles/` (960 de ancho).
- C: en el prototipo las muestras vienen de `dots.js` porque el navegador no deja leer imágenes locales; en el sitio se leen de la foto con un canvas fuera de pantalla (mismo origen) y se calcula una vez por caso.
- Rendimiento: un canvas 2D, 30 fps, devicePixelRatio ≤ 2, pausa con `visibilitychange`, `IntersectionObserver` y botón. A: ≤160 chispas. B: 3 elementos, solo se cambia `transform`. C: ≈13 000 puntos con `fillRect` (en celulares modestos bajar a 120×56 o a 6 000).
- Las estrellas ambientales las pone `Backdrop`; el prototipo dibuja las suyas solo para verse.
- B: la burbuja «Patient reviews» no se publica hasta tener reseñas reales confirmadas (ver `config/reviews.ts`).

**Pie con ciudad y neón**
- `components/footer/CityScene.tsx` + `components/footer/cityPaths.ts` (el SVG ya generado: sacar los trazos del prototipo, no generarlos en el navegador), `components/footer/NeonSign.tsx` (SVG de los tubos ya generado), `lib/useSectionProgress.ts` (escribe `--p` de 0 a 1 en la escena con un `scroll` pasivo), `styles/footer-scene.css`.
- Dibujo: cada trazo usa `pathLength="1"` y `stroke-dashoffset` calculado por CSS con la variable `--p` (inicio `--s` y duración `--w` por trazo). Una sola variable por cuadro, sin filtros sobre la ciudad.
- Neón: `IntersectionObserver` al 60 % agrega la clase `lit`; solo se anima la opacidad. El resplandor usa un filtro de desenfoque fijo (no animado). Con `prefers-reduced-motion` o `data-motion-paused`: `lit` desde el inicio y `animation: none`.
- La escena ocupa de 540 px hasta 880 px de alto; el letrero se apoya en la línea de la calle (19,4 % desde abajo; depende de que la escena sea siempre más alta que ancha en proporción 620/1440, como está en el CSS).
- Los tubos de «Dental», la curva y la estrella salen del logo real (`public/logo.png`); «Luminous» es un trazo dibujado a mano: **si el logo cambia, hay que rehacer los trazos**.

**Accesibilidad**: escena y canvas `aria-hidden`; el letrero tiene `role="img"` con nombre; la dirección y el teléfono son texto real; objetivos táctiles ≥ 44 px; foco visible; texto sobre paneles oscuros. El contraste no se midió con herramienta (a ojo): pasarlo por QA.

## Aviso: fotos de pacientes
Las fotos vienen del archivo de referencia de la dueña. **Usar fotos de pacientes en el sitio requiere consentimiento confirmado por la clínica.** No está verificado; hasta entonces solo imágenes de muestra. Leyenda visible: «Individual results vary.»

## No verificado / pendientes
- Elegir A, B o C.
- Probado con Chromium automático a 375 y 1280 (incluye movimiento reducido): sin errores y sin desborde lateral. No probado en Safari, iPhone ni Android reales; rendimiento a ojo.
- Licencias: Aceternity y 21st.dev por componente no verificadas; React Bits lleva Commons Clause; GSAP tiene licencia propia.
- El horario de la clínica sigue POR CONFIRMAR y no aparece.
- Los monumentos de la ciudad son siluetas genéricas, no réplicas de edificios con marca.
- Las herramientas de Python usadas para trazar el logo (numpy, scipy, scikit-image) se instalaron solo en esta computadora para generar los trazos; no forman parte del sitio.
