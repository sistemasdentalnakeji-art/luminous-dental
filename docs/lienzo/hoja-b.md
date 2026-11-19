# Hoja de dirección B · «El anillo» (tema oscuro, azul profundo) · ronda 1
Archivo: `lienzo/project/Estilo-B.dc.html`. Quién: Diseñador UI-UX 1. Ponytail: apagado.

## Qué transmite y para qué paciente
Calma, cuidado y una luz cálida (el nombre es «Luminous»). Un solo doctor al centro y cuatro áreas de cuidado a su alrededor. Para el paciente que quiere sentirse atendido con tranquilidad y confiar en una persona concreta (Dr. Hahn), y para quien llega de fuera (SAHARA).

## Tipografía y por qué
- Títulos: **Fraunces** (300, tamaño óptico 144, interletrado negativo) en titulares de hasta 120 px. Serif suave con carácter, de la línea editorial de Oura («serif editorial enorme»), pero en peso ligero y sobre azul profundo.
- Texto: **Instrument Sans** (400 a 700), limpia y legible sobre fondo oscuro.
- Distinta de la A (Funnel Display, grotesca ancha) y de la C (Bricolage): serif suave y centrada.

## Paleta (contraste calculado, WCAG AA; no cambió en la ronda 1)
| Uso | Código | Contraste |
|---|---|---|
| Fondo noche | #0A1B26 | base |
| Superficie | #112A38 / #173646 | texto #EEF3F1 sobre #112A38: 13.26:1 |
| Texto | #EEF3F1 sobre fondo | 15.64:1 |
| Texto de apoyo | #A8BDC4 sobre fondo / superficie | 8.97:1 / 7.61:1 (sobre #173646 no se calculó; es algo menor, se espera sobre 6:1) |
| Acento ámbar | #F2BE6B sobre fondo / superficie | 10.31:1 / 8.75:1 |
| Botón | texto #0A1B26 sobre ámbar | 10.31:1 |
| Panel perla (única sección clara) | #F1ECE2: texto #0A1B26 14.89:1, apoyo #3F5560 6.66:1 | |
| Líneas de controles | #5C7C8A sobre fondo | 3.93:1 (cumple 3:1) |
Un solo acento (ámbar cálido). No es casi negro + verde ácido: el fondo es azul profundo y el acento es luz cálida.

## Pieza firma (una línea)
**El anillo del doctor:** el retrato del Dr. Hahn al centro de un anillo de 4 arcos ámbar (General, Cosmética, Ortodoncia, Pediátrica) con el texto completo de cada área; al pasar el cursor o enfocar un nombre su arco se enciende. Demuestra «un solo doctor, cuidado para toda la familia».

## Plan de movimiento (motion-foundations: no estaba cargada; apliqué sus reglas de memoria)
- Un solo momento orquestado al cargar: los 4 arcos se dibujan uno tras otro (0.2 s entre cada uno); el retrato (empieza en 55 % de opacidad, no en 0) y el halo aparecen. El titular siempre visible.
- Respuestas al visitante: arco que se enciende, pestañas de servicios y de reseñas (fundido de 0.35 s), botones (elevación y presión), campos con anillo de foco.
- Con `prefers-reduced-motion` todo queda quieto y los arcos salen completos. Solo CSS.
- Las pestañas son botones de radio nativos: se manejan con flechas del teclado y sin script.

## Referencias (las 8 de `docs/referencias.md`, vi sus capturas)
Del sector:
- https://deefordentist.com : titular grande con botón de cita siempre a mano (el botón ahora va justo bajo el titular). Descarté la barra amarilla y el verde ácido.
- https://www.dentalrose.com : personas reales y botones claros; la barra fija de celular queda para la etapa 4. Descarté la cabecera oscura pesada.
- https://www.absolutedental.com : dos acciones claras arriba (cita y llamar), las dos bajo el titular. Descarté el aspecto de cadena corporativa.
- https://agreatsmiledental.com : reseñas cerca del cierre, sin contadores. Descarté el collage.
- https://aspiringsmileslasvegas.com : botón de cita en el encabezado desde el inicio y formulario sin rodeos. Descarté las mayúsculas y el texto interminable.
De fuera del sector:
- https://ouraring.com : serif editorial enorme y una sola idea por imagen (aquí, el retrato). Descarté el fondo cálido claro y el tono de producto tecnológico.
- https://www.aesop.com/us/ : calma, aire y tipografía fina. Descarté el producto de lujo y el poco texto útil.
- https://www.onemedical.com : titular claro y un botón principal único. Descarté el azul genérico y la curva que guía la vista.
Herramienta faltante: 21st (`get_inspiration`) y la «Biblioteca de diseño web» no existen en esta PC; se anota como herramienta faltante.

## Riesgo
Un fondo oscuro en salud puede sentirse serio para algunos pacientes y para niños; se compensa con el halo cálido, el ámbar y el panel perla. El retrato en círculo muestra solo cabeza y hombros (es la foto única que hay, usada en el anillo y en la sección del doctor). Las pestañas dejan 3 de 4 servicios y 2 de 3 reseñas ocultas hasta tocarlas: conviene probarlo con pacientes reales. En celular el anillo ya no va entre el titular y el botón, pero los 4 servicios aparecen dos veces (filas bajo el anillo y pestañas de la sección 3).

## Lista premium (sección 20)
1. Tipografía con carácter: PASA (Fraunces + Instrument Sans, titular ≥ 64 px, razón escrita).
2. Pieza firma: PASA (el anillo del doctor).
3. Movimiento con intención: NO VERIFICADO EN VIVO (plan escrito; capturas con movimiento reducido, estado final).
4. Retícula editorial y aire: PASA (hero centrado; pestañas; promesa grande + tres notas de distinto peso con filetes; foto con marco desplazado; panel perla; cita central; texto simple junto a un panel grande; formulario partido; pie centrado). Ya no hay rejilla 2×2 ni dos tarjetas iguales.
5. Fotografía tratada: PASA con reserva (retrato en círculo con halo ámbar, ahora más claro, y en marco con contorno ámbar; caja «POR CONFIRMAR» para otras fotos).
6. Paleta con acento disciplinado: PASA.
7. Referencias vivas: PASA CON RESERVA (el jefe abrió las 8 y yo cito qué tomé de cada una; yo vi las capturas, no los sitios en vivo; 21st no existe en esta PC).
8. Detalle de acabado: PASA (iconos del mismo trazo de 1.5 px en servicios y «Why»; encabezado con píldora bien formada; áreas de toque ≥ 44 px; hover y foco diseñados).
`impeccable critique` hecho a mano (el lanzador no corrió: no hay DESIGN.md): jerarquía titular → botón → anillo; sin mayúsculas espaciadas, sin numeración, sin flechitas, sin degradados morados ni blobs.

## Prueba del gemelo
Otra clínica de Las Vegas saldría con foto grande a todo ancho, azul claro y verde. Se cambió: fondo azul profundo con luz ámbar, serif suave en peso ligero, un anillo con el doctor en lugar de una foto de fondo, servicios como pestañas, un único panel claro para «cambio de sonrisa» y reseñas de una en una.

## Ronda 1: qué cambió por cada observación
Para las 3 (comunes)
1. Nada de `{{ hueco }}`: se quitó el estado del formulario. Ahora hay UN mensaje fijo escrito en el HTML (el de «preview» de `home.ts`) y el formulario usa `method="dialog"` (valida y no envía). Verificado: 0 `{{` en el archivo.
2. Texto tal cual `home.ts`: los 4 servicios del anillo ahora llevan la frase completa (antes acortada, p. ej. «Invisalign and braces for a straighter smile and a better bite, for children, teens and adults.»). Se quitaron «Pages», «Follow», la nota de diseño de las reseñas y el «Treatment proposed» de la caja de foto. Se quedan las etiquetas del formulario, «Visit us» y «Real clinic photo · POR CONFIRMAR».
3. Referencias: las 8 están citadas arriba con una línea de qué tomé o descarté; 21st anotada como herramienta faltante.
4. Celular (375): «Request an appointment» y «Call or text» ahora van justo bajo el titular y antes del anillo (a unos 390 px del inicio; antes a ~920 px). Áreas de toque ≥ 44 px: enlaces de texto, enlaces del pie, logo, píldoras del menú y casilla (28 px dentro de una fila clicable de 52 px).
5. Capturas a 375 con marco de 375 exactos (iframe), de arriba abajo.

B «El anillo»
- Encabezado a 1440: «Insurance & Financing» va en una línea (las etiquetas no se parten) y la píldora activa «Home» tiene la misma altura que las otras (44 px) y queda alineada con el logo y el botón; el contenido ahora usa un ancho de 1440 para que todo quepa.
- Rejilla 2×2 de «Why» rota: una promesa grande («We help you keep your own teeth», 84 px máximo) y debajo tres notas de ancho y tamaño distintos (la primera más ancha y con título mayor), separadas por filetes y sin celdas iguales.
- Cobertura: ya no son dos tarjetas iguales. «Insurance» es un bloque de texto sin caja (solo un filete ámbar arriba) y «Coming from out of town?» es un panel grande con titular de hasta 68 px y un resplandor ámbar.
- Botón de cita antes del anillo en 375: sí (ver punto 4 de las comunes). También se subió en 1440: el titular, el texto y los dos botones van antes del anillo.
- Retrato del anillo: ya no se ve apagado (empieza en 55 % de opacidad y no en 0, brillo +8 %, halo ámbar algo más fuerte). Los arcos pasaron de gris azulado a ámbar.
- Desborde horizontal a 375: había uno real (la columna del doctor medía 434 px por el ancho máximo de la foto, oculto por el recorte de la página). Se corrigió con columnas `minmax(0,1fr)`; también se acortó el halo en celular. Probado quitando el recorte: el ancho de la página es 375 en A y B.
- Por añadidura: las reseñas ya no dejan ~150 px de vacío entre la cita y las pestañas (altura mínima menor).

## No verificado
Movimiento en vivo y con teclado/hover; las pestañas de servicios y reseñas con clic (solo vi el estado inicial); el archivo dentro del lienzo real con `support.js` (aquí no existe; se vio en el visor local, que no ejecuta `<x-dc>`); lector de pantalla; otros navegadores que no sean Edge; contraste del texto de apoyo sobre #173646.
