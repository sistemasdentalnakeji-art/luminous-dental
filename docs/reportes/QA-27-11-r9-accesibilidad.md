# QA 27-11 · Ronda 9 · Accesibilidad y contraste · Luminous Dental

Fecha: 2026-11-27 · Agente: QA 2 (`ld-qa-2`) · Solo pruebas: ningún archivo de código ni de contenido tocado, sin commit.
Build probado: `apps/web/dist` (12:50 del 27-11, más nuevo que todo `src/`), servido con `vite preview` en el puerto 5302 (cerrado al terminar).
Herramienta: playwright-core (el del CLI global) con Edge (`msedge`), 375 / 768 / 1440, EN y ES. axe-core NO está disponible sin instalar (no está en `node_modules` ni en el npm global): no se instaló nada y no se corrió; todo es medición propia con scripts (carpeta `scratchpad/qa-a11y`, fuera del proyecto).
Páginas: Inicio, Servicios (hub), Implantes dentales y Blanqueamiento (servicios con foto en el héroe), Beneficios (hub), Seguros, Financiamiento, Convenios, About, Contact, Blog (portada) y un artículo (Alineadores transparentes), con encabezado y pie en todas. Total: 12 páginas x 2 idiomas.

## Veredicto: NO LISTO (1 alto, 2 medios, 1 bajo)

Contraste, reducir movimiento, zoom 200 %, teclado general, foco visible, semántica de encabezados y textos alternativos pasan. Fallan: el foco queda tapado por la barra inferior del celular, ~25 enlaces externos sin aviso de «pestaña nueva», objetivos táctiles bajo 44 px en 3 páginas a 375 y la pausa de reseñas sin `aria-pressed`.

## NO PASA (con archivo probable y medida)

| # | Gravedad | Punto | Dónde | Medida | Archivo probable |
|---|---|---|---|---|---|
| A1 | ALTO | 2 Teclado / 2.4.11 Foco no oculto | 375, las 24 páginas (en 768 y 1440 no ocurre) | Al tabular a un enlace del pie (teléfono, correo, «Ver todos los servicios», servicios, dirección) el navegador lo deja en y=725–769 y la barra fija «Call or text / Request an appointment» ocupa y=735–800: se ve 10 de 44 px (el punto central queda tapado). 4 a 9 elementos por página, p. ej. «Call or text (702) 805-8688», `info@luminousdentallv.com`, «View all services». `scrollY` 3105 de 3351 posibles: la página pudo bajar más pero el navegador no cuenta la barra. | `apps/web/src/styles/site.css` línea 3 (`html{scroll-padding-top…}` no tiene `scroll-padding-bottom`; falta ≥ 65 px + `env(safe-area-inset-bottom)` en el rango `max-width:767px` de la línea 349) y la barra (`.actionbar`, `components/Layout.tsx`, `ActionBar`). |
| A2 | MEDIO | 3 Semántica: aviso de pestaña nueva | Todas las páginas (3 a 9 enlaces por página; EN y ES) | Enlaces con `target="_blank"` cuyo nombre accesible no avisa: «Request an appointment» del encabezado y de Beneficios, «Book an in-office consultation» (Inicio), «See SAHARA Las Vegas benefits», «Get directions / Cómo llegar», Instagram y Facebook del pie, dirección del pie (Google Maps), «AAO…» del artículo. Sí avisan: botón de reserva de BookVisit/Contact/About/FAQ (`<span class="sr-only">` con `newTab`). Cuenta a 1440: Inicio 9, Servicios 4, cada servicio 5, Beneficios 6, Seguros 6, Financiamiento 6, Convenios 6, About 4, Contact 7, Blog 5, artículo 5 (a 375 uno menos). Todos llevan `rel="noopener noreferrer"`. | Causa central: `apps/web/src/lib/router.tsx` línea 41 (`Link` externo pone `_blank` sin aviso). Además `components/Layout.tsx` 58, 99, 134; `Hero.tsx` 25; `SaharaFeature.tsx` 22; `ContactLocation.tsx` 56; `pages/Contact.tsx` 65; `pages/Blog.tsx` 192; `BenefitsHeader.tsx` 26 y 86; `pages/Financing.tsx` 30–31; `SocialLinks.tsx`; `Reviews.tsx` 63, 69, 104. |
| A3 | MEDIO | 3 Objetivos ≥ 44 px (375) | About, Blog, artículo (EN y ES) | About: teléfono 146x22 y correo 249x22 (en 22 px ni cumplen el mínimo AA de 24). Blog: categorías 144x26 y 274x26 («Orthodontics», «Cleanings and extractions»; ES 123x26 y 263x26). Artículo: enlace «Blog» de la miga de pan 30x44 (ancho 30). | About: `pages/About.tsx` 45–56 (`.ab-facts` link); Blog: `pages/Blog.tsx` (lista de categorías); miga de pan: `.crumbs a` (`pages/Blog.tsx` 21 / `Service.tsx` 39 y su CSS). |
| A4 | BAJO | 2 Pausa de reseñas con `aria-pressed` | Inicio, 375/768/1440, EN y ES | El botón es un `<button type="button">` real de 44x44 dentro de la ventana, abajo a la derecha, con foco de 3 px y funciona con Enter y Espacio (detiene el carrusel), pero NO tiene `aria-pressed`: cambia solo el `aria-label` («Pause patient reviews animation» ⇄ «Play patient reviews animation»). Es un patrón válido de WCAG, pero el encargo pidió `aria-pressed`. Si se agrega, el nombre debe quedar fijo. | `apps/web/src/components/Reviews.tsx` línea 121. |

Observación (no cuenta como fallo): el botón «Pausar animaciones» del pie (`Layout.tsx` 143) sí tiene `aria-pressed`, pero además cambia el texto («Pause animations» ⇄ «Resume animations»): un lector dice «Resume animations, botón, presionado», ambiguo. Conviene texto fijo o quitar `aria-pressed`, no ambos (mismo criterio que A4).

## Resultado por punto y página

PASA/NO PASA en las 12 páginas, EN y ES, salvo donde se indica.

### 1. Contraste AA (texto oculto, percentil 10/90 del fondo, captura de ventana)
Método: en cada paso de scroll (85 % de la ventana) se registran todos los nodos de texto visibles, se ocultan los textos (`color` y relleno transparentes, `background-clip:text` anulado) y se mide el fondo bajo cada texto en la captura de la ventana; razón = peor de p10 y p90 con el color del texto compuesto con su opacidad. Umbral 4.5:1, 3:1 si es grande (≥ 24 px, o ≥ 18.66 px en negrita). 72 combinaciones (12 páginas x 2 idiomas x 3 tamaños), 50 a 141 textos por combinación.

| Página | 375 | 768 | 1440 | Mínimo estable medido |
|---|---|---|---|---|
| Inicio | PASA | PASA | PASA | todo ≥ 7.5:1 salvo el logotipo «Google» (exento, 2.5 a 4.9:1) y el dibujo del letrero/tarjeta (decorativo, ver nota) |
| Servicios (hub) | PASA | PASA | PASA | 4.99 |
| Implantes (foto en héroe) | PASA | PASA | PASA | 5.25 |
| Blanqueamiento (foto en héroe) | PASA | PASA | PASA | 5.08 |
| Beneficios (hub) | PASA | PASA | PASA | 4.83 |
| Seguros | PASA | PASA | PASA | 7.67 |
| Financiamiento | PASA | PASA | PASA | 4.76 |
| Convenios | PASA | PASA | PASA | 5.09 |
| About | PASA | PASA | PASA | 5.08 |
| Contact | PASA | PASA | PASA | 4.84 |
| Blog | PASA | PASA | PASA | 6.04 |
| Artículo | PASA | PASA | PASA | 5.21 |

Elementos pedidos, medidos aparte en los 3 tamaños y los 2 idiomas (peor valor):
- Letrero menta «Most requested / Los más solicitados» (encabezado de Destacados): 5.22 (375), 5.62 (768 y 1440); 5.75 en ES. Mín. exigido 4.5. PASA. Captura `qa-a11y-home-featuredtag-1440-27nov-r9.png`.
- Flechas menta del hub de Servicios (11 flechas, componente gráfico, 3:1): 4.56 a 4.90. PASA. Nombres de servicio del hub: 10.2 a 11.0. Capturas `qa-a11y-services-svccardgo-*-27nov-r9.png`. (Las capturas se tomaron justo al quitar el ocultado de texto y los títulos aún hacen su transición de color: se ven grises solo en esa captura; el 10.2 es la medida real.)
- Franja final del pie («© …», «Pausar animaciones», nota «Individual results may vary»): 12.90 en todos los tamaños e idiomas. PASA.
- Pastilla «Sobre el tratamiento» sobre la foto del héroe: 6.77 (EN y ES). Reseñas de Google (tarjetas, con el carrusel pausado): mínimo ≥ 4.9.

Hallazgos descartados tras repetir (no son fallos, se anotan para que nadie los persiga):
- Dibujo del letrero de Las Vegas («Fabulous», «LUMINOUS DENTAL», «LAS VEGAS, NEVADA») y tarjeta de la sección de Seguros del inicio (números «4021 7302…»): son SVG/ilustración con `aria-hidden`; mi método da 1.0:1 porque el texto vectorial no se puede ocultar. Decorativos, exentos. Verificado a ojo en `qa-a11y-letrero-vegas-en-1440-27nov-r9.png`.
- Logotipo «Google» de la ventana de reseñas: exento como logotipo (2.5 a 4.9:1 según el tamaño).
- Lecturas sueltas de 1.0 a 3.8:1 que NO se repiten con el texto en reposo (caracteres de títulos «soft-blur» y de «Google» a mitad de animación, o texto que pasa bajo el cristal del encabezado fijo, y la ventana de reseñas durante su fundido de 11 s entre escena y logo): al medir en reposo dan 7.5 a 13.6:1 (pie de ES 375, pastilla de ES, botones 1 a 4 de la figura, FamilyCare ≥ 7.9, subtítulo y lista de pasos). Se ven un instante durante la entrada, no en reposo.

### 2. Teclado
| Punto | Resultado | Medida |
|---|---|---|
| Recorrido con Tab (24 páginas x 3 tamaños) | PASA | 34 a 58 paradas por página; en todas el ciclo cierra (vuelve al navegador) y no hay trampas; orden coherente (Saltar al contenido → logo → menú → contenido → pie). Sin `tabindex` positivos. |
| Foco visible | PASA | 0 de ~3 000 paradas sin indicador (contorno de 3 px o diferencia de píxeles medida con y sin foco). El deslizador antes/después (input con opacidad 0) muestra el anillo de 3 px en su envoltorio `.sba`; flechas lo mueven (50 → 52). |
| Foco no oculto por la barra inferior | **NO PASA a 375** (A1); PASA a 768 y 1440 | ver A1 |
| Menú del celular | PASA | `aria-expanded` falso → verdadero con Enter y con Espacio; el foco entra al panel («Home»); Tab recorre los enlaces del panel y sale por el botón; Escape cierra y devuelve el foco al botón; sin trampa. EN y ES. Captura `qa-a11y-menu-celular-*-375-27nov-r9.png`. |
| Menú de escritorio | PASA | Enter abre, ↓ entra al primer enlace, Escape cierra y devuelve el foco al disparador. |
| «Pausar animaciones» del pie | PASA | `<button>` de 44 px; `aria-pressed` false → true → false con Enter y con Espacio (en ambos tamaños); con la pausa activa: 0 píxeles cambian entre capturas y 0 animaciones infinitas (con movimiento normal: 2 100 a 34 000 píxeles y 44 animaciones). Observación de la etiqueta doble arriba. |
| Pausa dentro de la ventana de reseñas | **NO PASA** (A4) | Botón real, 44x44, dentro y abajo a la derecha; Enter y Espacio funcionan y detienen el carrusel; falta `aria-pressed`. |
| Pestañas de Destacados | PASA | Lista de botones con tabindex rotativo y `aria-current`: ↓/↑ (1440) y →/← (375) mueven; Home/End van al primero y al último; solo una iluminada; Tab sale a la pista. Captura `qa-a11y-destacados-*`. (No usa `role="tab"`; el patrón de lista con `aria-current` es válido.) |
| Moneda del mapa (Contact) | PASA | Botón 260x260 con texto «Open map of our location» / «Close the map», `aria-expanded`; Enter y Espacio abren y cierran; Escape cierra con el foco en el botón. Capturas `qa-a11y-moneda-abierta-*`. |

### 3. Semántica
| Punto | Resultado | Medida |
|---|---|---|
| Un h1 por página | PASA | 1 en las 24 páginas (375 y 1440). Nombre accesible correcto en los h1 con palabras partidas («Emergency or smile makeover, we're here.»). |
| Orden de encabezados | PASA | 0 saltos de nivel en las 48 mediciones; `main` único, `lang` correcto (`en`/`es`), 0 `id` repetidos. |
| Alt | PASA | 0 `<img>` sin atributo `alt`, 0 imágenes rotas, 0 enlaces/botones sin nombre. Los logos de aseguradoras y financieras llevan su nombre (p. ej. «Lincoln Financial Group»); `logo.webp` con `alt=""` solo en la tarjeta decorativa de Seguros, el adorno del blog (ambos `aria-hidden`) y el logo del encabezado/pie, que van dentro de un enlace con nombre «Luminous Dental, home/inicio». |
| Aviso de pestaña nueva | **NO PASA** (A2) | ver A2 |
| Objetivos ≥ 44 px a 375 | **NO PASA** solo en About, Blog y artículo (A3); PASA en las otras 9 páginas | Los botones flotantes miden 30 y 34 px pero su zona táctil se amplía con `::before{inset:-7px}` a 44 y 48 px: PASA. Enlaces en línea dentro de párrafos exentos (WCAG 2.5.8). |

### 4. Movimiento reducido y zoom
| Punto | Resultado | Medida |
|---|---|---|
| `prefers-reduced-motion: reduce` | PASA | 24 páginas x 375 y 1440: 0 animaciones CSS en curso (API de animaciones) y 0 píxeles distintos entre dos capturas separadas 1.3 s en cada paso de scroll (3 a 14 pasos por página). Incluye destellos de estrellas (canvas), la estrella de «Reserva tu visita», el letrero de Las Vegas, el carrusel de reseñas y las figuras 3D. Control: sin la emulación, el mismo método detecta movimiento en 11 de 11 pasos del Inicio, por lo que el 0 es real. |
| Zoom 200 % en 1440 | PASA | Viewport de 720x450 px CSS (= 1440 a 200 %; emulado, no el zoom real del navegador): `scrollWidth` = `clientWidth` = 720 y 0 elementos fuera de pantalla sin recorte en las 24 páginas. |

### 5. axe-core
NO EJECUTADO: no está disponible sin instalar y no se instaló nada. Las revisiones automáticas son los scripts descritos.

## No verificado
- Lector de pantalla real (NVDA/VoiceOver/TalkBack): los nombres y estados salen del árbol de accesibilidad de Playwright y del DOM, no de una lectura.
- Otros navegadores (solo Edge). Zoom real del navegador (se emuló con el ancho del viewport) y reflow a 400 %.
- Estados hover/foco de elementos con transición en vivo y contraste del foco contra el fondo (se midió existencia del anillo, no su razón de contraste).
- Contraste de imágenes con texto incrustado (logos), y de textos que cambian con el scroll solo en los instantes medidos.
- 320 px y 1920 px no se probaron en este encargo.
- El contenido de la ventana de reseñas durante su fundido de 11 s entre escena y logo (los textos se cruzan con el logo neón unas décimas de segundo).

## Capturas (`docs/capturas/qa-a11y-*-27nov-r9.png`)
- Evidencia de fallos: `qa-a11y-foco-tapado-barra-375-27nov-r9.png` (A1), `qa-a11y-objetivo-chico-about-en-375-27nov-r9.png` y `qa-a11y-objetivo-chico-blog-en-375-27nov-r9.png` (A3), `qa-a11y-pausa-resenas-{en,es}-{375,1440}-27nov-r9.png` (A4).
- Evidencia de lo que pasa: menú celular, menú desplegable, destacados, moneda, deslizador con foco, `-featuredtag-`, `-svccardgo-`, `-ftrlegal*-`, `-letrero-vegas-`, pastilla, figura y pie.
- Vista de cada página (ventana, arriba): `qa-a11y-<página>-{en,es}-{375,768,1440}-27nov-r9.png` (ES sin 768). Las `*-27nov-r8.png` son de la ronda anterior.
- Las capturas de contraste (`-pastilla-`, `-pie-`, `-figura-pasos-`, `-about-h1-`) se tomaron al medir cada caso puntual.
