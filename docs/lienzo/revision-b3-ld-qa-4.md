# Revisión independiente B3 · QA 4 (`ld-qa-4`) · 18-11-2026 (manual §35)

Revisé `Estilo-B3.dc.html` (1440) y `Estilo-B3-movil.dc.html` (375), la hoja `hoja-b3.md`, `MEZCLA-2.md` y `home.ts`. No leí otras revisiones de B3. No toqué ningún otro archivo (solo este informe).

Cómo miré:
- 1440: captura de página completa en el visor local (ahí solo se ven el degradado y las estrellas CSS, porque el visor no corre el script).
- 375: archivo `-movil` dentro de un marco de 375 px exactos (Edge sin ventana no baja de 500 px). Pie completo visto.
- Movimiento: copia mía en mi carpeta temporal que SÍ ejecuta el script del lienzo, con Edge y WebGL por software, a 1440×900. La malla y las estrellas animadas se dibujan sin errores.

## 1. Veredicto: PASA
Mejor que B2. Los 4 pedidos de MEZCLA-2 se cumplen; el texto, los toques y el pie a 375 están bien. Quedan correcciones menores (sección 8).

## 2. Lista premium §20
| # | Punto | Resultado | Lo que vi |
|---|---|---|---|
| 1 | Tipografía con carácter | PASA | Newsreader ligera hasta 118 px + Figtree. Reserva: Google Fonts en el lienzo (§8); la hoja dice que serán locales: confirmar. |
| 2 | Pieza firma | PASA | El anillo con la estrella dorada, ahora limpio: solo nombres, 4 arcos iguales y simétricos, sin dientes que compitan. |
| 3 | Movimiento con intención | PASA con reserva | Quitaron arcos animados y dientes. Queda cielo + malla muy lenta + logo (pedidos de la dueña) y respuestas al visitante. Reduced-motion cubierto en el código; fps reales no medidos. |
| 4 | Retícula editorial y aire | PASA | Reseñas con filete vertical, «Why» desfasado, escalera, panel de cobertura. Reserva: doctor, sonrisa, cobertura y cita siguen siendo partidos de dos columnas parecidos. |
| 5 | Fotografía tratada | PASA | La foto del Dr. Hahn aparece UNA sola vez (1 sola referencia al archivo en el HTML, dentro del anillo). Resto: caja «POR CONFIRMAR». |
| 6 | Paleta con acento | PASA | Noche + cielo + oro. El rol «General Dentist» pasó a azul cielo: el oro ahora está más disciplinado. |
| 7 | Referencias vivas | NO VERIFICADO | Heredadas; no las abrí. |
| 8 | Detalle de acabado | PASA | Foco dorado, hover, un solo vidrio, sin `transition: all`. Reserva: la fila de servicios anima `padding-left` al pasar el cursor (mueve el diseño). |

## 3. Delatores y antipatrones §8
- Frase del titular en itálica y otro color: sí («last a lifetime»), excusado: lo pide el DESIGN.md de la dueña.
- Texto gris de poco contraste: reserva. La hoja admite que el texto de apoyo (rgba 226,238,250,.82) baja a 4.0:1 sobre el azul más claro de la malla. Afecta a lo de 14.5–15 px (nombres de reseñas, «Individual results vary», títulos y legal del pie).
- «Animarlo todo»: ya no (corregido respecto a B2).
- «Google Fonts en producción»: anotado.
- Sin barras de porcentaje, lorem, emojis, degradados morados, tarjetas idénticas en fila, flechitas «→», carruseles. Huecos `{{ }}`: 0 en ambos archivos.

## 4. Prueba del gemelo
Saldría igual para otra clínica: «Why», la lista escalonada, la cobertura y el formulario. No saldría igual: el cielo nocturno con estrella ligada al logo, el anillo con el doctor y la estrella dorada. Igual que en B2, buena parte del carácter viene del sitio de la dueña (lo que pidió).

## 5. Problemas concretos
A 1440:
- Fondo: con el script se ve la malla azul mottled y las estrellas respirando; ligero y legible. Sin script (visor) se ve degradado + estrellas CSS: bien. En el visor, el fondo fijo solo cubre la ventana, por eso las capturas altas se ven planas abajo (efecto de captura, no falla).
- Cabecera: el teléfono ya aparece a 1440 (se oculta bajo 1360 px). Bien.
- Arco del doctor vacío con una estrella grande: bonito, pero se lee como un marco sin foto / hueco decorativo de ~440×550 px junto al texto del doctor. Es la zona más débil del diseño.
- «Read more patient reviews» queda alineado a la izquierda bajo una sección con todo centrado.
- Pie: columnas ya alineadas (corregido).
A 375:
- Sin desborde ni texto cortado; botón de cita visible en la primera pantalla (a ~440 px de 667); logo y «Menu» visibles. Pie completo y centrado; enlaces de 44 px.
- El arco vacío pasa a ocupar una pantalla entera (~420 px de alto) antes del texto del doctor: mucho espacio sin información.
- La dirección del pie usa `white-space:nowrap`: cabe a 375 (307 de 339 px) pero se saldría a 320 px.
- Los 4 nombres de servicios del anillo (en móvil, lista simple con filetes) quedan bien; la frase solo está en la lista de escalera (pedido cumplido).
- No probé el menú abierto, el teclado ni el hover (solo capturas).

## 6. Enlaces, formulario, movimiento reducido
- Externos: SAHARA, Instagram, Facebook coinciden con `home.ts`; Google Maps lo armó el diseñador (no está en `home.ts`): confirmar. Todos con `rel="noopener"`.
- Enlaces internos siguen siendo anclas de prueba (servicios y «About Dr. Hahn» a sí mismos; «Privacy Policy» y reseñas a #top): vale en lienzo.
- Formulario: etiquetas bien; el aviso «not connected» ya NO sale hasta pulsar Enviar (corregido). Siguen sin diseñarse éxito/error ni texto de error de campos. El aviso pasa de `display:none` a visible con `role="status"`: algunos lectores de pantalla no lo anuncian así; mejor tenerlo siempre en el árbol y vaciar el texto.
- `prefers-reduced-motion`: regla CSS general + el script dibuja un solo cuadro de malla y de estrellas. Revisado en código, no probado en vivo.
- Peso del fondo: media resolución, tope 30 fps, pausa con pestaña oculta, tope 1400 px de alto, respaldo CSS si no hay WebGL2 (todo visto en el código; fps reales no medidos).

## 7. ¿Cumple MEZCLA-2?
| Pedido | Cumple |
|---|---|
| 1. Sin franja de dientes | SÍ (ni dibujo ni script; queda solo un comentario CSS viejo) |
| 2. Fondo malla + estrellas, visible y ligero, con respaldo | SÍ (malla y estrellas probadas con script; capa fija de estrellas CSS visible sin script; respaldo CSS; cresta de montañas conservada en hero y pie) |
| 3. Foto del doctor una sola vez; servicios sin repetir la frase en el anillo | SÍ |
| 4. Reseñas: cita grande + 2 citas con filete vertical, sin pestañas ni calificación, solo citas de `home.ts` | SÍ (nombres «Ashok R.», «Ana B.», «Sandra P.» como en `home.ts`) |
| Texto de `home.ts` palabra por palabra | SÍ en lo mostrado (hero, servicios, why, doctor, sonrisa, reseñas, cobertura, cita, pie, cabecera con teléfono) |
| Toque ≥ 44 px, botón de cita en 1.ª pantalla a 375, sin `{{ }}`, pie completo a 375 | SÍ |

## 8. Las 3 correcciones más importantes
1. **Arco vacío del doctor (§20 punto 2 / MEZCLA-2 punto 3):** hoy es un marco enorme con una estrella que parece un hueco (a 375 ocupa casi una pantalla). Achicarlo a ~55–60 % del alto, o sacarlo del flujo en móvil, o ponerle contenido de verdad (por ejemplo los datos «4 years», «UNLV» tomados de `home.ts` en pequeño), sin repetir la foto.
2. **Contraste del texto pequeño sobre la malla (§8 «texto gris de poco contraste»):** subir el apoyo (rgba 226,238,250) a ≥ .9 o poner un velo detrás en lo de 14.5–15 px (nombres de reseñas, nota «Individual results vary», título y legal del pie). La hoja misma admite 4.0:1 en el peor punto.
3. **Formulario y pendientes de lienzo:** diseñar los estados éxito / error / «complete the highlighted fields» con texto en cada campo inválido; dejar `role="status"` siempre en el árbol; alinear «Read more patient reviews» con el resto de la sección; quitar `nowrap` de la dirección del pie; confirmar el enlace de Google Maps y las fuentes locales.

## No verificado
Movimiento en el lienzo real (la copia mía lo corre fuera del lienzo), fps reales, hover y teclado, menú móvil abierto, lector de pantalla, 768 px y 320 px, contrastes recalculados por mí, referencias de la hoja.
