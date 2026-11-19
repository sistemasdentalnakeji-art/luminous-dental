# Correcciones · ronda 1 de 2 · decisión del jefe (17-11-2026)

Fuentes: `revision-ld-qa-4.md`, `revision-ld-disenador-uiux-2.md` (A y B), `revision-ld-disenador-uiux-1.md` (C). Léelas.
Regla §35: pasa solo si los dos revisores aprueban. Resultado: A NO (QA 4), B NO (UI-UX 2), C sí, pero C y A son demasiado parecidas. Las 3 se corrigen.

## Para las 3 (comunes)
1. **Nada de `{{ hueco }}` en texto visible.** En la vista local se ve crudo (`{{ statusText }}`). El formulario muestra UN solo mensaje fijo de ejemplo o ninguno. Texto siempre escrito en el HTML.
2. **Texto tal cual `home.ts`**, completo (nada acortado). Quita lo que no esté en home.ts («Pages», «Follow us», «Design note», notas de diseño visibles). Las etiquetas de formulario sí se quedan.
3. **Referencias (§20 punto 7):** el jefe ya las abrió en el navegador integrado con capturas (`docs/referencias.md`). Tu hoja debe citar las 8 (5 del sector + 3 de fuera) con una línea de qué tomaste o descartaste de cada una. 21st no existe en esta PC: se anota como herramienta faltante, no cuenta como falta tuya.
4. **Celular (375):** botón «Request an appointment» visible en la primera pantalla; áreas de toque ≥ 44 px (casillas y enlaces sueltos incluidos).
5. Capturas a 375: usa un marco de 375 px exactos (Edge sin ventana no baja a 375).

## A «La regla» (ld-disenador-uiux-1)
- **Cambia la tipografía de títulos** (no Bricolage Grotesque: la usa C) y **cambia la pieza firma** por una idea que NO sea una línea/regla con 4 puntos (eso ya es C) y que no repita los servicios. Sigue en tema claro.
- Interletrado del titular más abierto («lifetime» se funde).
- Quita los huecos a 1440 (≈250 px tras la pieza firma; banda de «changing your smile»). Foto del doctor con un tratamiento decidido.

## B «El anillo» (ld-disenador-uiux-1)
- Encabezado a 1440: «Insurance & Financing» en una línea; píldora activa bien formada y alineada.
- Rompe la rejilla 2×2 de «Why» y las 2 tarjetas iguales de cobertura (§8).
- Botón de cita antes del anillo en 375.
- Revisa que el retrato del anillo no se vea apagado y que no haya desborde horizontal a 375.

## C «Sol» (ld-disenador-uiux-2)
- Hero: usa la foto real del Dr. Hahn (`/_blob/f083a374d6191d67857e1e7615274e99`) con tu tratamiento, o una caja mucho menor; sin el gran hueco. Botón de cita arriba en 375.
- Línea de vida: quita «Cosmetic = Adults» y cualquier edad que no esté en home.ts. Lo que sí dice home.ts: Orthodontics «for children, teens and adults», Pediatric para niños, General «at every stage of life». Cosmetic sin edad.
- Un solo mensaje de estado en el formulario; enlaces del pie ≥ 44 px.
- C se queda con Bricolage Grotesque y la línea de vida (A cambia).

## Entrega
Sobrescribe solo tus `Estilo-*.dc.html` y `hoja-*.md`; agrega al final de la hoja una sección «Ronda 1: qué cambió por cada observación». Reporte corto al final de `docs/bitacora.md`. Ponytail apagado.
