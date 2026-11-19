# Hoja de dirección A · «Todos tus dientes» (tema claro) · ronda 1
Antes se llamaba «La regla»; la regla se quitó (ver «Ronda 1»). Archivo: `lienzo/project/Estilo-A.dc.html`. Quién: Diseñador UI-UX 1. Ponytail: apagado.

## Qué transmite y para qué paciente
Claridad y calma de consultorio luminoso, con una sola imagen que dice la frase de la clínica: una dentadura completa, de las propias personas, encendida de a poco. Funciona para el paciente que busca en el celular, quiere entender rápido y pedir cita sin sentirse en una clínica de lujo (PRODUCT.md: «claro antes que bonito»). Familias y adultos que quieren conservar sus dientes.

## Tipografía y por qué
- Títulos: **Funnel Display** (600, interletrado casi neutro: -0.012em). Grotesca ancha y redonda, con rasgos propios; no es Bricolage Grotesque (esa se queda en C) ni de las «de siempre».
- Texto: **Figtree** (400 a 700), redonda y amable para leer en celular.
- De dónde salió: del titular enorme y directo de Dee for Dentist y de One Medical («titular claro»), en sans para no caer en crema + serif + terracota. Pareja distinta de la B (serif) y de la C (Bricolage).

## Paleta (contraste calculado, WCAG AA; no cambió en la ronda 1)
| Uso | Código | Contraste |
|---|---|---|
| Fondo | #F6F8F7 | base |
| Texto | #0F2A2E sobre fondo | 14.15:1 |
| Texto de apoyo | #456066 sobre fondo / sobre tinte #E3F0EC | 6.31:1 / 5.75:1 |
| Botón y acento | #0B7A68, texto blanco | 5.25:1 |
| Botón al pasar el cursor | #08594C, texto blanco | 8.26:1 |
| Enlaces de texto | #08594C | mayor que 8:1 sobre fondo claro (valor exacto no calculado) |
| Tinte de secciones | #E3F0EC, texto #0F2A2E | 12.90:1 |
| Franja de dientes | dientes blancos sobre #08594C | 8.26:1 (es dibujo, no texto) |
| Retrato | tinte menta #B9DDD3 + bloque #08594C | decorativo |
Un solo acento (verde azulado). Pie de página: fondo #0F2A2E con texto blanco.

## Pieza firma (una línea)
**Una dentadura completa:** una franja a todo lo ancho bajo el titular con todos los dientes de arriba y de abajo, blancos sobre verde profundo, que se encienden desde el centro hacia afuera al cargar. Dice «tus dientes deben durar toda la vida» sin repetir los servicios ni usar cifras. Dibujo propio en SVG, sin foto de banco.

## Plan de movimiento (motion-foundations: no estaba cargada; apliqué sus reglas de memoria)
- Un solo momento orquestado, al cargar: los dientes se encienden (`opacity`) del centro hacia afuera, 70 ms entre cada pareja. El titular nunca empieza oculto.
- Respuestas al visitante: botones (elevación 1 px, presión 0.97), enlaces con subrayado que crece, filas de servicios (barra lateral + corrimiento de 10 px), campos con anillo de foco.
- Todo lo demás está quieto. Con `prefers-reduced-motion` no hay animación ni transición. Solo CSS, sin `transition: all`.

## Referencias (las 8 de `docs/referencias.md`, vi sus capturas)
Del sector:
- https://deefordentist.com : titular grande y botón de cita siempre a mano. Descarté la barra amarilla, el verde ácido y la foto de fondo.
- https://www.dentalrose.com : botones claros y personas reales. La barra fija de celular (Request · Call · Map) queda para la etapa 4; descarté la cabecera oscura pesada.
- https://www.absolutedental.com : dos acciones claras arriba (cita y llamar): las dos están bajo el titular. Descarté el aspecto de cadena corporativa.
- https://agreatsmiledental.com : claridad y reseñas cerca del cierre. Descarté el collage y los contadores.
- https://aspiringsmileslasvegas.com : botón de cita desde el encabezado y formulario sin rodeos. Descarté todo en mayúsculas y el texto interminable.
De fuera del sector:
- https://www.aesop.com/us/ : aire y filas finas separadas por líneas (el libro de servicios). Descarté el producto de lujo y el poco texto útil.
- https://ouraring.com : una sola idea grande por imagen (aquí, la franja de dientes ocupa todo el ancho como único gesto). Descarté el serif, el fondo cálido y el tono tecnológico.
- https://www.onemedical.com : salud con calidez, titular claro y un botón principal único. Descarté el azul genérico y la curva que guía la vista.
Herramienta faltante: 21st (`get_inspiration`) y la «Biblioteca de diseño web» no existen en esta PC; se anota como herramienta faltante.

## Riesgo
Una franja de dientes grande puede leerse como «dibujo de dentadura» si el trazo no es fino; por eso es geométrica y sin boca. Hay que verla con la dueña. Funnel Display es ancha: los títulos de 3 y 4 líneas en columnas angostas se ven largos (servicios).

## Lista premium (sección 20)
1. Tipografía con carácter: PASA (Funnel Display + Figtree, titular ≥ 64 px, interletrado abierto, razón escrita).
2. Pieza firma: PASA (la dentadura completa; ya no es una línea con puntos ni repite los 4 servicios).
3. Movimiento con intención: NO VERIFICADO EN VIVO (plan escrito; las capturas se hicieron con movimiento reducido, estado final).
4. Retícula editorial y aire: PASA (franja, libro de filas, una promesa grande + tres notas, retrato con bloque, banda tinte en dos mitades, citas escalonadas, dos columnas con filete, formulario ancho).
5. Fotografía tratada: PASA (el retrato único va en duotono sobre menta con un bloque verde desplazado; las otras fotos son caja «POR CONFIRMAR»).
6. Paleta con acento disciplinado: PASA.
7. Referencias vivas: PASA CON RESERVA (el jefe abrió las 8 y yo cito qué tomé de cada una; yo vi las capturas, no los sitios en vivo; 21st no existe en esta PC).
8. Detalle de acabado: PASA (hover y foco diseñados, áreas de toque ≥ 44 px, sin iconos).
`impeccable critique` hecho a mano (el lanzador no corrió: no hay DESIGN.md): jerarquía titular → dentadura → servicios; sin mayúsculas espaciadas, sin numeración, sin flechitas, sin degradados decorativos, sin tarjetas iguales.

## Prueba del gemelo
Para otra clínica de Las Vegas saldría: foto grande a todo ancho, azul, serif, tarjetas de servicios. Se cambió: sin foto de relleno, tema claro con verde azulado, grotesca ancha, servicios como libro de filas, retrato en duotono, y una dentadura completa como única imagen grande.

## Ronda 1: qué cambió por cada observación
Para las 3 (comunes)
1. Nada de `{{ hueco }}`: se quitó todo el estado del formulario. Ahora hay UN mensaje fijo escrito en el HTML (el de «preview» de `home.ts`) y el formulario usa `method="dialog"` (valida los campos y no envía nada). Verificado: 0 `{{` en el archivo.
2. Texto tal cual `home.ts`: las 4 áreas ya no se repiten bajo el titular (la franja no lleva texto), así que no queda ningún texto acortado. Se quitaron «Pages», «Follow», la nota de diseño de las reseñas y el «Treatment proposed» de la caja de foto. Se quedan las etiquetas del formulario, «Visit us» y la etiqueta «Real clinic photo · POR CONFIRMAR» que pide el encargo.
3. Referencias: las 8 están citadas arriba con una línea de qué tomé o descarté; 21st anotada como herramienta faltante.
4. Celular (375): el botón «Request an appointment» queda a unos 460 px del inicio, dentro de la primera pantalla. Áreas de toque: enlaces de texto, enlaces del pie y logo con mínimo 44 px de alto; la casilla de consentimiento pasa de 26 a 28 px dentro de una fila clicable de 52 px.
5. Capturas a 375 con marco de 375 exactos (iframe), de arriba abajo; también probé sin recorte horizontal (`overflow-x`) y el ancho de la página es 375: no hay desborde.

A «La regla»
- Tipografía de títulos: de Bricolage Grotesque a **Funnel Display** (C conserva Bricolage).
- Pieza firma: la regla con 4 puntos se quitó (también las marcas de regla del marco del doctor). Ahora es una dentadura completa que se enciende del centro hacia afuera; no repite los servicios.
- Sigue en tema claro (fondo #F6F8F7).
- Interletrado del titular: de -0.035em a -0.012em; «lifetime» ya no se funde.
- Huecos a 1440: se quitaron los ~250 px bajo la pieza firma (los botones ahora van pegados al texto, la dentadura sigue sin salto y la sección de servicios empieza con un aire menor, de 128 px como máximo en vez de 150). La banda «Thinking about changing your smile?» ahora tiene el texto a la izquierda y la caja de foto a la derecha, centrados entre sí, sin el vacío largo.
- Foto del doctor: tratamiento decidido, duotono (gris del retrato multiplicado sobre menta #B9DDD3) con bloque verde #08594C desplazado 22 px, y tamaño menor (4 de 12 columnas, antes 5 y casi 740 px de alto).
- Por añadidura: «Why» ya no es título + 3 columnas iguales (una promesa grande a la izquierda y tres notas con filetes a la derecha).

## No verificado
Movimiento en vivo y con teclado/hover; el archivo dentro del lienzo real con `support.js` (aquí no existe; se vio en el visor local, que no ejecuta `<x-dc>`); lector de pantalla; otros navegadores que no sean Edge; contraste exacto del enlace #08594C.
