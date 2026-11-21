# /insurance-financing · 3 opciones nuevas para aseguranzas

Estado: PROPUESTAS para elegir (no programadas). Autor: Diseñador UI-UX 2 · 20-11-2026.
Descartadas por la dueña: «Marquesina» (focos dorados) y la cuadrícula con «+» copiada de Dental Nakeji.
Datos: `content/insurers.ts` (24 planes, logos en `public/insurers/*.webp`, de color sobre fondo claro: por eso las 3 opciones los ponen sobre superficie clara). Tokens: `styles/tokens.css` (night, surface, sky, gold, Newsreader + Figtree); no se agregan tokens nuevos salvo `#fbf8f1` (papel) y `#eaf4fb` (cielo de día), que se proponen como `--color-paper` y `--color-day`.
Maquetas (abrir en el navegador a 1280 px; las letras caen a Georgia/Arial porque la maqueta no carga las fuentes del sitio):
`docs/maquetas/aseguranzas-opcion-1.html`, `-2.html`, `-3.html`.

Reglas comunes a las 3: logos con `alt={nombre}`, `width/height` y carga diferida como hoy; botón de llamar con `clinic.phone` (no escribir el número a mano); textos de `insuranceText`; nada de «we accept» (la clínica no ha confirmado la lista); objetivos táctiles de al menos 44 px; foco visible dorado (3 px); contraste mínimo 4.5:1; respetar `prefers-reduced-motion` (ninguna opción necesita animación).

---

## Opción 1 · «Directorio A–Z»

**Para la asistente:** una hoja de papel clara, como el directorio de un consultorio. Los seguros van en orden alfabético con letras grandes (A, B, C...), el nombre a la izquierda y su logo pequeño a la derecha. Arriba hay una tira de letras para saltar y un buscador. Es lo más fácil de leer y de encontrar «mi seguro» por nombre.

**Especificación técnica**
- Componente `InsuranceDirectory`. Agrupar `insurers` por primera letra (ordenados A–Z, ya vienen así) con `Map`.
- Contenedor `.ins-sheet`: fondo `#fbf8f1`, texto `--color-field-text`, radio 20, padding 28/36 (móvil 20/18).
- Cabecera: `h2` (Newsreader 28) + `input type="search"` (alto 48, ancho 340; en móvil 100 %), borde 1.5 px `--color-field-border`, etiqueta `<label>` real (visible en móvil, oculta solo en escritorio con clase `sr-only`).
- Tira A–Z: `<ul>` de enlaces `#l-X` de 40×40 (en 375 px: 36 px con gap 4, aceptable por WCAG 2.2 ≥ 24 px; si algún día falta espacio, scroll horizontal). Solo letras que existen. `aria-label="Jump to letter"`.
- Lista: `columns: 3 300px` a 1280 px → 3 columnas; 375 px → 1 columna. Cada grupo `break-inside: avoid`, letra en Newsreader 38 dorado oscuro `#b4872a` (ratio sobre papel ≈ 3.4:1, es texto grande decorativo; el nombre del plan siempre va en tinta). Fila: mínimo 56 px de alto, borde superior 1 px `#d9dee8`, nombre (peso 600) + `img` alto 26 px, ancho máx 96 px, `object-fit: contain`.
- Buscador: filtra por `includes` sin acentos ni mayúsculas; oculta filas con `hidden` y grupos vacíos; `role="status"` anuncia «N plans match “q”» (`insuranceText.countSome`).
- Sin resultados: bloque «We do not see “q” on our list yet» + botón llamar + «Show all plans». Pie de la hoja: «Do not see your plan?» + botón llamar, separado por línea de 2 px de tinta.
- Sin JS: se ven los 24 planes y la tira A–Z funciona (son anclas).

## Opción 2 · «Pregunta y respuesta»

**Para la asistente:** en vez de enseñar todos los logos de golpe, la página hace la pregunta del paciente: «¿Mi seguro está en la lista?». Escribe su seguro, elige de una lista corta y a la derecha aparece una tarjeta grande con su logo y los botones «Pedir cita» y «Llamar». Debajo quedan todos los nombres como botoncitos redondos, por si prefiere tocar uno.

**Especificación técnica**
- Componente `InsuranceAnswer`. Estado: `query`, `selected: string | null`.
- Rejilla 2 columnas (1fr 1fr, gap 40) a ≥ 800 px; 1 columna debajo (tarjeta de respuesta ARRIBA del buscador no; orden: buscador, respuesta, chips).
- Panel izquierdo `.ask-box`: fondo `--color-surface`, borde `--color-line`, radio 24, padding 36. `h2` Newsreader 30 «Is my insurance on the list?». Campo patrón combobox ARIA 1.2: `input role="combobox" aria-expanded aria-controls aria-autocomplete="list" aria-activedescendant`, `ul role="listbox"` con `li role="option"`. Teclado: flechas, Enter elige, Esc cierra. Alto 60, fuente 18 (evita zoom en iPhone), fondo blanco, borde 2 px.
- Panel derecho `.answer` (`aria-live="polite"`): fondo papel `#fbf8f1`, radio 24. Placa de logo blanca 110 px de alto con `img` alto 56. Título «{Plan} is on our list». Texto: «Plans can change, so our team goes over yours with you before your visit.» Botones: «Request an appointment» (dorado, ruta de citas) y «Call {clinic.phone.label}» (contorno).
- Estado vacío inicial (nada elegido): mismo panel con la frase «Pick your plan to see what to do next.» y el botón llamar. Estado sin coincidencias: «We do not see “q” on our list yet. Call or text us and we will check it with you.» + llamar.
- Chips `.ins-chips`: `<button>` por plan (alto 44, borde `--color-line-ui`, radio 999); al tocar uno se elige ese plan y se lleva el foco al panel de respuesta. Hover/foco: borde y texto dorado.
- Sin JS: mostrar los 24 chips como texto y un párrafo «Call or text us to check your plan» (la lista completa queda visible).
- Riesgo a decidir: la frase «is on our list» afirma que está en la lista; funciona solo si la clínica confirma la lista (POR CONFIRMAR en docs/datos.md). Alternativa de texto sin afirmar: «{Plan} is on our list. Ask us to confirm your plan.»

## Opción 3 · «Franja de día»

**Para la asistente:** una franja ancha de color cielo claro que rompe el fondo nocturno, como un amanecer en medio de la página. Los logos flotan libres sobre ella, sin cajas ni marcos, en filas centradas. Es la opción más limpia y ligera; abajo, una tarjeta oscura invita a llamar si el seguro no aparece.

**Especificación técnica**
- Componente `InsuranceDay` (sin buscador; 24 logos caben a la vista).
- Franja `.ins-day`: degradado vertical `#eaf4fb → #d9ebf7`, radio 28, padding 48 (móvil 28/20), texto `--color-field-text`. Debe tocar la misma anchura de contenido que el resto (no a sangre completa) para no romper el ritmo de la página.
- `h2` Newsreader 30 + una línea de apoyo; luego `<ul class="cloud">` en `display:flex; flex-wrap:wrap; justify-content:center; gap:28px 44px`. Cada `li` alto 44 px, `img` alto 100 %, ancho máx 150 px, `object-fit: contain`. A 375 px: alto 36, gap 20/28, queda en ~3 por fila.
- Sin hover requerido; no hay interacción en los logos (no son enlaces). `ul` con `aria-label="Insurance plans on our list"`; los nombres están en `alt`.
- Tarjeta `.ins-call` dentro de la franja: fondo `--color-night`, radio 20, padding 26/32, rejilla `1fr auto` (1 columna en móvil). Título Newsreader 24 «Your plan is not here?» + «Call or text us and we will check it with you.» + botón llamar dorado.
- Logos con fondo transparente: verificar que no haya rectángulos blancos visibles sobre el degradado (NO VERIFICADO; si los hay, poner `mix-blend-mode: multiply` a las `img`).

---

## Lo que no se verificó
- Las maquetas no se revisaron en pantalla a 375 ni 1280 px (no abrí navegador); el HTML usa reglas simples, pero un QA debe mirarlas.
- No sé si los `.webp` tienen fondo transparente o blanco (afecta la Opción 3).
- La lista de 24 planes aún no está confirmada como válida para Luminous (docs/datos.md).
- Contrastes calculados de cabeza, no medidos con herramienta.
