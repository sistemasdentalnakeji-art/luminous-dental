# Hoja B2 · «El anillo bajo las estrellas» · Mezcla 1 (18-11-2026)
Archivos: `lienzo/project/Estilo-B2.dc.html` (1440, `$preview` 1440×8616) y `Estilo-B2-movil.dc.html` (375, `$preview` 375×9474). Quién: Diseñador UI-UX 1. Ponytail: apagado. Texto de `home.ts` tal cual (sin precios, horario ni calificación de Google).

## Qué tomé de cada fuente
| Fuente | Qué entró |
|---|---|
| **B (base)** | Orden de secciones, hero centrado, **anillo del doctor** (pieza firma), reseñas de una en una, cobertura (texto + panel grande), formulario partido, pie centrado. |
| **Diseño de la dueña** (colores, letra, fondo) | Azul noche `#0a1529` con resplandor azul, grano y **estrellas** (el código de `NightSky.tsx` pasado a un bloque pequeño; estrella fugaz cada ~10 s); **logo real que se ilumina** (`.logo`, sheen, star, halo, flare); Newsreader 300–400 + Figtree; botón blanco redondo con tinta azul; un solo vidrio (el encabezado); **arco** para la foto del doctor con estrella dorada en la cima; **filete dorado** bajo los títulos; **cresta de montañas** al pie del hero y arriba del pie de página; grupos con filetes finos. Cambié el ámbar y Fraunces de B por esto. |
| **A** | **Franja de dientes** bajo el hero (mismos 32 dientes, encendidos del centro hacia afuera), ahora porcelana/cielo sobre noche, con halo azul. Va **debajo** del anillo y de la cresta, no lo tapa. |
| **C** | Sección **Why**: título pequeño, frase grande «We help you keep your own teeth» (hasta 116 px) con el texto a la derecha, y 3 notas con filete arriba a alturas distintas (0 / 56 / 112 px). **Lista de servicios en escalera**: cada fila 7 % más adentro, separadas por filetes; al pasar el cursor la fila se corre y aparece una estrellita dorada. Va **debajo** del anillo (la lista reemplaza las pestañas de B, que repetían lo mismo). |

## Pieza firma
**El anillo del doctor coronado por la estrella dorada:** retrato del Dr. Hahn dentro de 4 arcos azul cielo (General, Cosmética, Ortodoncia, Pediátrica) con el texto completo; al pasar o enfocar un nombre su arco se vuelve dorado (estado elegido). La estrella dorada marca la cima, igual que la del logo.

## Paleta y contraste (WCAG AA, calculado)
| Uso | Color | Contraste |
|---|---|---|
| Títulos blancos | #FFF | 18.2 sobre noche, 17.0 sobre superficie #0d1c37 |
| Texto | rgba(239,247,255,.82) | 11.5 noche, 10.8 superficie, 7.8 sobre azul más claro del resplandor (#1b3768) |
| Texto de apoyo | rgba(214,230,246,.72) | 7.8 / 7.5 / 5.6 |
| Cielo `#7bc3eb` (iconos, arcos) | | 9.4 / 8.8 / 6.1 |
| Oro `#e0b65c` (solo estrella, filetes, estado elegido) | | 9.6 / 8.9 |
| Oro suave `#f3d79a` (línea cursiva, hover) | | 13.0 / 12.1 |
| Botón: tinta `#2a4269` sobre blanco | | 10.1 |
| Campo: `#1d3152` sobre blanco | | 13.0 |
| Borde de campo `#8592a7` | | 3.15 sobre blanco, 5.4 sobre superficie (cumple 3:1) |
| Filete de botón fantasma (blanco 34 %) | | 3.1 sobre noche |
| Error `#e0715f` | | 5.4 sobre superficie |
No hay secciones claras: el panel perla de B pasó a panel noche.

## Plan de movimiento
- Al cargar (un momento): arcos del anillo se dibujan uno tras otro y el retrato aparece.
- Cuando la franja de dientes entra en pantalla (una vez): se encienden del centro hacia afuera, como estrellas (IntersectionObserver).
- Siempre: estrellas que respiran y una fugaz cada ~10 s (canvas, pausa con la pestaña oculta); el logo brilla (sheen, estrella, halo, destello).
- Respuestas al visitante: arco dorado, fila de servicios que se corre, botones, pestañas de reseñas, campos con anillo de foco.
- `prefers-reduced-motion`: estrellas quietas, logo quieto (reglas 570–571 de la dueña), arcos completos, dientes ya encendidos, sin transiciones.

## Lista premium (§20)
1. Tipografía con carácter: PASA (Newsreader ligera hasta 118 px + Figtree).
2. Pieza firma: PASA (anillo + estrella).
3. Movimiento con intención: NO VERIFICADO EN VIVO (capturas con movimiento reducido; el código de las estrellas se probó al ejecutarse sin errores).
4. Retícula editorial y aire: PASA (promesa grande + notas desfasadas; escalera; arco; panel grande de cobertura).
5. Fotografía tratada: PASA con reserva (una sola foto real: retrato en anillo y en arco; caja «Real clinic photo · POR CONFIRMAR»).
6. Paleta con acento disciplinado: PASA (oro solo en estrella, filetes y elegido).
7. Referencias vivas: heredadas de B (8 de `docs/referencias.md`); el diseño de la dueña es la referencia nueva.
8. Detalle de acabado: PASA (áreas de toque ≥ 44 px, foco dorado visible, un solo vidrio, sin `transition: all`).
`impeccable critique` a mano: sin degradados morados, sin blobs, sin tarjetas iguales en fila; hay una cursiva dorada en el titular (pedido por el diseño de la dueña).

## Riesgos
- **El logo se mueve** aunque su DESIGN.md dice que el logo no se anima; seguí el encargo («se ilumina»). Si se prefiere quieto, es una línea de CSS.
- La franja de dientes es un dibujo propio y brillante; es lo más claro de la página. Conviene que la dueña lo apruebe.
- El anillo y la lista de servicios repiten los 4 servicios (anillo = vista rápida, lista = detalle).
- El lienzo de esta carpeta no ejecuta `support.js`: estrellas, encendido de dientes y logo animado solo se ven en el lienzo real o en navegador; en el visor local se ve estático.
- Fuentes Newsreader/Figtree cargan de Google Fonts (en la web real, locales como en su proyecto).
- El `canvas.json` no se tocó: B2 aún no está colocada en el lienzo.

## No verificado
Movimiento en vivo, hover/teclado, pestañas de reseñas con clic, lector de pantalla, otros navegadores, desborde horizontal medido con cifra (a 375 se vio sin cortes), 4.5:1 del texto sobre el resplandor más claro (se calculó con un tono aproximado).

## Correcciones B2: qué cambió (18-11-2026, según CORRECCIONES-B2.md)
1. **Dientes:** una sola fila con forma de diente (borde redondeado, separación), 84–120 px de alto (antes ~216), porcelana/cielo tenue (opacidad .86 y halo suave, ya no lo más claro de la página), orillas que se desvanecen a los lados y arriba; la cresta ahora se desvanece hacia abajo y los dientes cuelgan de ella sin corte seco. Se encienden del centro hacia afuera al entrar en pantalla. En celular se ven ~6 dientes.
2. **Movimiento:** quitada la animación de los arcos, del retrato y del resplandor (solo cambia de color al tocar). Quedan: cielo (estrellas + fugaz), logo que se ilumina y encendido de dientes. La fila de servicios ya no mueve el diseño: solo desliza el contenido 14 px.
3. **Huecos:** anillo → cresta pasó de ~200 px a ~45 px (cresta recortada y sin margen); antes del pie, de ~180 px a ~110 px.
4. **Pie:** tres columnas iguales, centradas bajo el logo, con la primera línea alineada; «Contact» en la serif normal, sin mayúsculas espaciadas.
5. **Oro:** solo estrellas, filetes, cursiva del titular y estado elegido (arco al tocar, estrellita de la fila). «General Dentist» pasó a cielo; borde del arco, hover de botón, subrayados, enlaces del pie y del menú móvil pasaron a cielo/blanco. El foco sigue dorado (como en el diseño de la dueña).
6. **Formulario:** el aviso «not connected» está oculto y aparece solo al enviar (después de que el navegador revisa los campos obligatorios). Sin `{{ }}`. Sin script (visor) no se ve.
7. **Cabecera:** el teléfono se ve a 1440 (se oculta bajo 1360).
8. **Mitad baja:** resplandores azules más fuertes en cuatro alturas de la página y capa fija de estrellitas pequeñas en toda la altura (el cielo animado se suma).
9. **Caja de foto:** solo «Real clinic photo · POR CONFIRMAR».
Alturas `$preview` nuevas: 1440 → 8169; 375 → 9114.
Siguen pendientes: ver el movimiento en vivo, fuentes locales en producción y el formulario con estados de éxito y error.
