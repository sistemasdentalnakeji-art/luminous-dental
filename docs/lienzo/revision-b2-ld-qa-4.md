# Revisión independiente B2 · QA 4 (`ld-qa-4`) · 18-11-2026 (manual §35)

Revisé `Estilo-B2.dc.html` (1440) y `Estilo-B2-movil.dc.html` (375), la hoja `hoja-b2.md`, `home.ts`, `MEZCLA-1.md` y el diseño de la dueña (`DESIGN.md`, `desktop.png`). No leí otras revisiones. No toqué ningún otro archivo.

Cómo miré: capturas con Edge sin ventana a 1440 (página completa, 6 cortes). A 375 Edge no baja de 500 px de ancho, así que la primera captura salió cortada a la derecha (falso desborde); la repetí con el archivo `-movil` dentro de un marco de 375 px exacto y ahí no hay cortes ni desborde. El visor no ejecuta el script del lienzo: estrellas, fugaz, encendido de dientes y logo animado NO se vieron moviéndose.

## 1. Veredicto: PASA (con reservas y 3 correcciones antes de enseñarla)
Razón: en la lista premium solo hay 1 falta clara (movimiento) y 1 punto no verificable (referencias), y reprueba con 2. El texto, la mezcla pedida y la accesibilidad básica están bien. Lo que más le puede costar con la dueña es la franja de dientes.

## 2. Lista premium §20
| # | Punto | Resultado | Lo que vi |
|---|---|---|---|
| 1 | Tipografía con carácter | PASA | Newsreader ligera hasta 118 px (hero) + Figtree; no es de «las de siempre». Reserva: carga de Google Fonts (§8 «Google Fonts en producción»); la hoja dice que en la web real serán locales: confirmar. |
| 2 | Pieza firma | PASA con reserva | Anillo con el Dr. Hahn y la estrella dorada en la cima: se ve y es propio. Reserva: no «demuestra trabajo» (es un retrato); y las 4 etiquetas no quedan claramente ligadas a su arco (arcos en los lados, etiquetas en las esquinas). |
| 3 | Movimiento con intención | FALLA (leve) | §20 pide UN momento orquestado y lo demás quieto. La hoja lista: arcos al cargar + dientes al entrar + estrellas y fugaz siempre + logo (brillo, estrella, halo, destello) siempre + hovers. Estrellas y logo los pidió la dueña, pero con los arcos y los dientes son demasiados. Y nada se vio en vivo. |
| 4 | Retícula editorial y aire | PASA con reserva | Why con frase de 116 px y notas desfasadas, escalera, arco: bien. Reserva: doctor (7/5), panel de sonrisa (6/5), cobertura (4/8) y cita (5/7) son cuatro partidos de dos columnas parecidos; «Why» deja un hueco grande vacío a la izquierda del lede. |
| 5 | Fotografía tratada | PASA con reserva | Solo la foto del Dr. Hahn, en anillo y en arco; el resto es caja «POR CONFIRMAR». La misma foto sale dos veces en las primeras ~3 pantallas. El fondo gris nube de la foto choca un poco con el azul noche. |
| 6 | Paleta con un acento | PASA | Noche + cielo + oro. Contrastes: leí los de la hoja, no los recalculé; a ojo el texto pequeño se lee bien. El oro se esparce más que «solo la estrella» (ver sección 7). |
| 7 | Referencias vivas | NO VERIFICADO | Heredadas de B; no las abrí. |
| 8 | Detalle de acabado | PASA | Foco dorado, hover del anillo/fila/botones, un solo vidrio, iconos de un mismo set, sin `transition: all`. Reserva: la fila de servicios anima `padding-left` al pasar el cursor (mueve el diseño) y los campos inválidos solo cambian de color (sin texto de error). |

## 3. Delatores y antipatrones §8
- «Una palabra o frase del titular en itálica/otro color» (delatores): sí, «last a lifetime» en cursiva dorada, más «General Dentist» en cursiva dorada. Excusado: el DESIGN.md de la dueña pide «la línea itálica del hero» en oro.
- «Animarlo todo» (antipatrones): rozándolo (ver punto 3 arriba).
- «Una foto en arco» (antipatrones de diseño): hay arco, pero pedido por la dueña y no va con «cinta que corre».
- «Google Fonts en producción»: el lienzo las trae de Google; anotado.
- Etiquetas en MAYÚSCULAS espaciadas: solo el «CONTACT» del pie. Menor.
- Texto gris de poco contraste: no vi (el más tenue, 14.5 px de apoyo, se lee).
- No hay: barras de porcentaje, lorem, emojis, degradados morados, tarjetas idénticas en fila, flechitas «→», carrusel automático (reseñas por clic), datos inventados, huecos `{{ }}` (0 en ambos archivos).
- Fuera de lista pero real: la franja de dientes son 32 rectángulos redondeados brillantes que parecen teclas de piano (ver corrección 1).

## 4. Prueba del gemelo
Para otra clínica saldría igual: la sección «Why», la lista escalonada de servicios, el panel de cobertura y el formulario partido (valores por defecto bien hechos, pero genéricos). Lo que NO saldría igual: noche + estrella dorada ligada al logo, el anillo con el doctor, el arco con estrella. Aviso: gran parte de lo distintivo (encabezado de vidrio, cresta, arco, cursiva dorada) viene del sitio de la dueña, no de una decisión nueva; es lo que pidió, pero la hoja debería decirlo.

## 5. Problemas concretos
A 1440:
- Franja de dientes: es lo más brillante de toda la página (blanco #F4FAFF a pantalla completa en una página «noche tranquila»), los dientes son bloques lisos cortados arriba y abajo, y los de las puntas se ven grises por el desvanecido. No se lee como «estrellas».
- Cabecera: el teléfono se oculta a 1440 (regla `max-width:1500px`), así que el teléfono de `header.phone` no está en la cabecera del tamaño de diseño.
- Pie: solo la primera columna tiene título («Contact»); la columna de dirección queda ~14 px más arriba que las de enlaces (desalineada).
- Hueco grande vacío bajo el anillo y antes de la cresta (~200 px), y a la izquierda del lede de «Why».
- Panel de sonrisa: texto de la derecha flota en medio sin alinearse con el título.
- El grano a 3.5 % casi no se nota; las estrellas no se ven en captura (canvas sin script).
A 375:
- Sin desborde horizontal ni texto cortado en el marco de 375 exactos. Escalera se aplana bien (3/6/9 %). Botón de cita visible en la primera pantalla (a ~440 px de 667). Áreas de toque: tabs 48, menú 48, botones 54, enlaces 44, pie 44; casilla de 28 px dentro de una etiqueta de 52 px: bien.
- No probé el menú abierto, el hover ni el teclado (solo capturas estáticas).
- La hoja de reseñas a 375 saltó en captura a medio desvanecer (solo efecto de captura).

## 6. Enlaces, formulario, movimiento reducido
- Enlaces externos: SAHARA, Instagram y Facebook coinciden con `home.ts`. El enlace de Google Maps (búsqueda con la dirección) NO está en `home.ts` (solo la etiqueta): lo armó el diseñador; confirmar. Ninguno abre pestaña nueva; todos con `rel="noopener"`.
- Enlaces internos son anclas de lienzo: los 4 servicios, «See all services» y «About Dr. Hahn» apuntan a sí mismos (#services / #about); «Privacy Policy» y «Read more patient reviews» a #top. Está bien para lienzo; en la web real hay que poner `/services#general`, etc.
- Formulario: 5 campos con `label for` correcto, autocompletar, `required`, consentimiento. Problema: el mensaje «This form is not connected yet, so your request was not sent» está siempre visible, aun antes de enviar. Confunde. No están diseñados los estados éxito, error ni «complete the highlighted fields»; los campos inválidos no traen texto de error.
- `prefers-reduced-motion`: bien cubierto (estrellas quietas, logo quieto, arcos completos, dientes encendidos, sin transiciones). Revisado en el código, no probado en vivo.
- Caja «Real clinic photo · POR CONFIRMAR» se ve en la página (en español dentro de un sitio en inglés): vale en lienzo, no en publicación.

## 7. ¿Cumple cada punto de MEZCLA-1?
| Pedido de la dueña | Cumple |
|---|---|
| Base B (orden, hero centrado, anillo, reseñas, cobertura, formulario, pie) | SÍ |
| Fondo azul noche con resplandor y grano | SÍ (grano casi invisible) |
| Estrellitas + fugaz cada ~10 s, quietas con movimiento reducido | CÓDIGO SÍ, NO VISTO EN VIVO (el visor no ejecuta el script) |
| Logo real que se ilumina, copiado de `index.css` | SÍ (se ve el logo con su estrella; animación no vista) |
| Colores y letra de su DESIGN.md (Newsreader + Figtree) | SÍ |
| Oro solo donde está la estrella | CASI: además de estrellas y filetes hay oro en cursiva del hero y del rol, marco del arco, anillo de foco, enlace del menú móvil, hover y borde de botón. Todo cerca de lo que su DESIGN.md permite, pero más extendido. |
| Arco para la foto de persona, filetes finos, cresta al pie del hero y arriba del pie | SÍ |
| Franja de dientes de A, porcelana/cielo sobre azul, sin tapar el anillo | A MEDIAS: no tapa el anillo y está bien ubicada, pero se ve como teclas y no como estrellas |
| Why de C (título pequeño, frase grande + lede, 3 notas desfasadas) | SÍ |
| Lista de servicios en escalera junto o debajo del anillo | SÍ (debajo); el anillo sigue siendo la pieza firma. Repite los 4 servicios (la hoja lo admite) |
| Texto de `home.ts` tal cual | SÍ palabra por palabra en lo que se muestra (comparé hero, servicios, why, doctor, sonrisa, reseñas, cobertura, cita, pie). Excepciones: el teléfono de cabecera falta a 1440; faltan los estados del formulario salvo uno |
| Una sola foto real; sin horario, calificación, precios | SÍ |
| Áreas de toque ≥ 44 px; botón de cita en primera pantalla a 375 | SÍ |
| Capturas a 1440 y 375 | SÍ |

## 8. Las 3 correcciones más importantes (en orden)
1. **Franja de dientes (§20 punto 6 y MEZCLA-1 «encendido como estrellas»):** bajarle brillo y tamaño (fondo del diente más cielo que blanco, menos opaco), darles forma de diente (borde incisal, separación) en vez de teclas, que no se corte duro arriba, y dejar el brillo fuerte solo al encenderse. Hoy es lo más claro de la página.
2. **Movimiento (§20 punto 3):** decidir UN momento orquestado (la entrada del anillo o el encendido de dientes) y dejar el resto en respuestas al visitante; el cielo y el logo son pedidos de la dueña y se quedan. Quitar la animación de los arcos o la de los dientes, y probar todo en vivo (estrellas, fugaz, logo, dientes, reduced-motion) en el lienzo real antes de la ronda 2.
3. **Limpieza de lo que no se publica:** (a) quitar el aviso permanente del formulario y diseñar sus estados (éxito, error, campos faltantes con texto de error), (b) poner el teléfono en la cabecera a 1440, (c) alinear las columnas del pie con título cada una, (d) confirmar el enlace de Google Maps y la tipografía local, (e) mostrar la caja «POR CONFIRMAR» sin jerga o marcarla como solo de lienzo.

## No verificado
Movimiento en vivo, hover y teclado, menú móvil abierto, clic en reseñas, contrastes recalculados por mí, referencias de la hoja, otros navegadores, tamaño de pantalla 768.
