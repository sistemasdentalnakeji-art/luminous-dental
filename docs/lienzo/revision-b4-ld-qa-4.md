# Revisión independiente B4 · QA 4 (`ld-qa-4`) · 18-11-2026

Revisé `Estilo-B4.dc.html` (1440), `Estilo-B4-movil.dc.html` (375), `hoja-b4.md`, `HERO-ANATOMY.md`, la figura en `anatomy/brackets/` y B3 como referencia. No modifiqué archivos de diseño ni toqué git (solo este informe; mis scripts viven en mi carpeta temporal).

Cómo probé: Edge sin ventana controlado por protocolo de depuración (no hay Playwright instalado). El visor 5190 NO ejecuta el script del lienzo (`support.js` da 404, igual que en B3), así que ahí se ve el paso 5 estático. El movimiento y los controles los probé en `anatomy/brackets/harness-b4.html`, que carga el mismo marcado y la misma lógica que B4 (no es el runtime real del lienzo).

## 1. Veredicto: PASA con reservas
La figura funciona con mouse, toque, teclado, botones y bucle; no hay errores en consola ni desborde lateral; no inventa datos. Las reservas son de accesibilidad (bucle sin botón de pausa, nombre largo del control) y de lo que no se pudo probar en el lienzo real.

## 2. Observado

**Logo de la cabecera (lo que pediste verificar):** SÍ se ve. En el visor a 1440 el logo está en x=88, y=18, 118×67 px; la imagen `/_blob/0b51…` responde 200 (75 452 bytes) y se ve en la captura, con la estrella dorada. A 375 también (104×59 px, junto a «Menu»). Mismo archivo e igual definición que B3. Causa probable de la captura del diseñador sin logo (inferido, no probado): la capturó desde un arnés abierto como archivo, donde la ruta absoluta `/_blob/...` no existe. Aviso: esa ruta solo funciona si el sitio se sirve desde la raíz; igual que B3.

**Figura:**
- Bucle automático: pasa de paso 1 a 5 en ≈10 s y vuelve a empezar. Si alguien la toca, se detiene y se reanuda a los ~8 s de quietud (comprobado).
- Botones 1 a 5: cada uno lleva a su paso; `aria-pressed`, el contador «Step n of 5» y el nombre del paso se actualizan juntos.
- Teclado: Inicio→paso 1, Fin→paso 5, flecha derecha/izquierda ±1, tope en los extremos sin errores. Anillo de foco dorado visible.
- Mouse: arrastrar sobre el escenario mueve la perilla y suelta en el paso más cercano. Toque: arrastre simulado con eventos táctiles funciona (`touch-action: pan-y` deja pasar el scroll vertical).
- `prefers-reduced-motion`: arranca en el paso 5 quieto, no hay bucle tras 4 s ni 12 s, y los botones saltan al paso al instante.
- Dibujo en pasos 1, 3 y 5 (capturas mías): dientes chuecos sin brackets; brackets con ligas azules y alambre; dientes alineados con alambre liso. Se entiende la secuencia. Cero errores de consola en la página de pruebas (solo `favicon.ico` 404 del servidor local).
- Texto de la figura = el de la hoja; no hay meses, semanas, porcentajes ni precios. Incluye «Illustration. Individual results vary.».

**Maquetación:** sin desborde lateral a 1440, 768, 375 y 320 (scrollWidth = ancho de ventana). A 375 el texto y «Request an appointment» van primero y la figura debajo (hero completo visto). Botones de pasos 48×48 px, los dos botones del hero ≥ 44 px de alto. Contraste: textos de la tarjeta (#F2F8FE, #fff, #f3d79a sobre ~#0b1a36) altos; el borde de los botones sin elegir (blanco al 34 %) queda cerca de 3:1 (estimado, no medido con herramienta).

**B3:** `Estilo-B3*.dc.html` tienen fecha 11:43, anterior a B4 (12:51); sus tamaños (60 454 y 60 453 bytes) corresponden a «59.0 KB» de la hoja. No tengo copia anterior para comparar por contenido: «no modificado» es inferido por fecha. B4 sí difiere de B3 (la figura y el anillo movido).

**Texto aprobado:** el titular y la frase del hero coinciden palabra por palabra con `home.ts` (`hero.headline`, `hero.support`).

## 3. Reservas y fallas

1. **Movimiento automático sin pausa (WCAG 2.2.2, nivel A):** el bucle corre más de 5 s y no hay botón «Pause»; solo se detiene al tocarla o enfocarla, y se reanuda solo a los 8 s. Con reduced-motion está bien, pero no es la única vía.
2. **Nombre del control demasiado largo:** el `role="slider"` lleva todo el párrafo de descripción como `aria-label`; el lector lo repite en cada enfoque. Mejor un nombre corto («How braces work, step») y el párrafo en `aria-describedby`.
3. **«Drag the gold knob»:** el arrastre funciona en todo el escenario, no solo sobre la perilla; la perilla mide ~30 px a 375. Funciona (más fácil), pero el texto promete algo más estrecho. No es falla.
4. **Casilla de consentimiento del formulario:** 28×28 px (< 44 px). La etiqueta completa es clicable, así que es menor; heredada de B3.
5. **Contenido:** la figura muestra brackets metálicos con ligas; el sitio dice «Invisalign y brackets» y la hoja ya lo avisa. «Illustration.» y los 5 nombres de pasos son texto nuevo sin aprobar por la dueña («Teeth lined up», «Gentle, steady pressure» suenan a resultado).
6. **`canvas.json` no incluye B4** (la hoja lo dice; no estaba en el encargo).

## 4. No verificado
Runtime real del lienzo (si `innerHTML` de las capas sobrevive a re-render), toque en un teléfono real, fps reales (la captura del arnés va en software; con CPU lenta el movimiento se vio algo retrasado respecto a la lectura, sin quedarse atascado), lector de pantalla, contrastes con herramienta, Chrome/Safari, la figura a 4× que la hoja dice pendiente, tema claro.

## 5. Arreglos concretos (en orden)
1. Agregar un botón «Pause» / «Play» visible (o pausar con cursor encima y al enfocar cualquier botón de pasos) para el bucle; cumple WCAG 2.2.2.
2. Acortar el `aria-label` del escenario y mover el párrafo a `aria-describedby`.
3. Hacer la casilla de consentimiento de 44 px de área táctil (o `min-height:44px` en la fila).
4. Pedir a la dueña aprobar los textos nuevos de la figura (hoja-b4, sección «Textos nuevos») antes de pasar a producción; confirmar el tipo de bracket.
5. Subir el borde de los botones de pasos sin elegir (a ≥ .5 de blanco) para quedar sobre 3:1 con margen.
6. Probar la figura dentro del lienzo real y en un teléfono, y agregar B4 a `canvas.json` si se quiere verla en el lienzo.
