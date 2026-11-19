# Revisión independiente · Diseñador UI-UX 2 (revisor) · Direcciones A y B
Fecha: 2026-11-17. No hice estas direcciones. No toqué ningún diseño. Miré capturas reales de página completa (Edge sin ventana, 1440 y 375 px, cortadas en tramos de 1900 px para poder leerlas). C solo se mira en el punto 6.

Aviso de método: las capturas estáticas cogen las animaciones a medias (regla de A, arcos y retrato de B). Por eso NO juzgo el movimiento ni el avance de esas piezas; queda "no verificado" y se revisa en vivo.

## DIRECCIÓN A · «La regla» (claro, verde azulado)
### 1. Veredicto: PASA (con 3 correcciones)
### 2. Lista premium §20
| # | Punto | Resultado | Lo que vi |
|---|---|---|---|
| 1 | Tipografía con carácter | PASA | Bricolage Grotesque en titulares grandes (hero enorme en 1440, bien apretado) + Figtree. Razón escrita. Ojo: C usa la misma de títulos (punto 6). |
| 2 | Pieza firma | PASA | Regla de medir con 4 pines bajo el titular; reaparece vertical en el marco del retrato. Distinta y propia. |
| 3 | Movimiento | NO VERIFICADO | Plan escrito y coherente (un momento + respuestas, reduced-motion); no lo vi corriendo. |
| 4 | Retícula y aire | PASA | Cada sección cambia de estructura (titular+regla, libro de filas, 3 columnas, foto+texto, banda tinte, citas escalonadas, 2 columnas con filete, formulario). Aire generoso. |
| 5 | Fotografía tratada | PASA con reserva | Una sola foto real (Dr. Hahn) con regla al lado; el resto son cajas "POR CONFIRMAR". La foto tiene fondo gris de retrato de credencial, sin tratamiento más allá del marco. |
| 6 | Paleta con acento | PASA | Un solo verde azulado; texto sobre fondo claro se lee bien. No recalculé los contrastes, tomo los de la hoja. |
| 7 | Referencias vivas | FALLA (parcial, lo admite la hoja) | Las referencias no se abrieron en vivo ni se usó 21st. Sin eso no cuenta. |
| 8 | Acabado | PASA | Hover y foco diseñados, bordes con intención, sin iconos. |
Faltas: 1 (punto 7). No reprueba (reprueba con 2).

### 3. Delatores y antipatrones §8
- Sin mayúsculas espaciadas, sin numeración, sin flechitas, sin degradados, sin aparecer-y-subir por sección: bien.
- Delator: texto escrito que no es el aprobado. Las 4 líneas bajo la regla del hero están acortadas ("Checkups, cleanings, fillings and preventive care" en vez de la frase completa de home.ts) y el pie dice "Pages" y "Follow", que no están en home.ts. §8 / encargo: "el texto debe ir tal cual".
- Placeholder visible: el formulario muestra `{{ statusText }}` en un recuadro verde. Se ve como código roto.
- Sección "Why" con dos titulares seguidos ("Why patients choose Luminous Dental" y "We help you keep your own teeth") sin aire entre ellos: parece plantilla título + párrafo + 3 columnas iguales (§8 de diseño, riesgo leve).

### 4. Prueba del gemelo
Saldría igual para otra clínica: el esquema "titular grande + 4 áreas + libro de filas + foto del doctor" y el verde azulado clínico. Lo que ya NO saldría igual: la regla de medir y el titular de 140 px. Veo bien lo que la hoja cambió; falta que la regla se sienta "de esta clínica" (ahora es un símbolo genérico de medición, no de dientes).

### 5. Problemas concretos
1440 px:
- Hueco grande entre la regla y la sección de servicios (cerca de 250 px vacíos) y hero con mucho vacío a la derecha del titular: el botón queda lejos del texto que lo explica.
- Sección "Thinking about changing your smile?": el titular queda arriba a la izquierda y debajo hay un vacío largo hasta el final de la banda; la caja de foto pendiente queda a la derecha. Descompensada.
- La foto del doctor es grande (cerca de 450 x 740) y gris; domina más que cualquier otra cosa del sitio.
375 px:
- La regla vertical ocupa unos 400 px de altura en la captura y luego los mismos 4 nombres de servicio se repiten debajo en el libro de filas: lo dice dos veces y alarga la página antes de llegar a algo nuevo.
- Menú reducido a botón "Menu": no hay botón de cita ni teléfono visible en el encabezado (aparecen justo debajo del titular, bien, pero al bajar se pierden; la barra fija queda "para etapa 4").
- Casilla de consentimiento pequeña (cerca de 26 px, bajo 44) y enlaces de texto sueltos ("Call or text...", "Read more patient reviews", "Open in Google Maps") con alto de toque bajo.
- Sin texto cortado ni solapes. Titulares caben.

### 6. Ver más abajo (misma tabla para las tres)

### 7. Las 3 correcciones más importantes (A)
1. Texto tal cual (§ encargo / §29): poner las frases completas de home.ts en los 4 pines y quitar o justificar "Pages" y "Follow" del pie; quitar `{{ statusText }}` visible.
2. Punto 5 y retícula en 1440: tratar la foto (recorte, tono o tamaño menor) y cerrar los huecos: regla-servicios y banda "Thinking about…".
3. Punto 7 y 375 px: abrir las referencias en vivo y citarlas; y en celular no repetir los 4 servicios (regla vertical + libro) o acortar la regla; subir el área de toque de enlaces y casilla a 44 px.

---

## DIRECCIÓN B · «El anillo» (oscuro, azul profundo, ámbar)
### 1. Veredicto: NO PASA (por poco; 2 faltas en la lista premium)
### 2. Lista premium §20
| # | Punto | Resultado | Lo que vi |
|---|---|---|---|
| 1 | Tipografía con carácter | PASA | Fraunces ligera, titular enorme y fino (hero y "Dental care for the whole family"). Con carácter, pero es el serif ligero sobre fondo oscuro que muchas marcas "premium" usan. |
| 2 | Pieza firma | PASA | Anillo de 4 arcos con el doctor al centro, nombres de servicio alrededor. Fuerte y propia. |
| 3 | Movimiento | NO VERIFICADO | Los arcos y el retrato salieron a medias en la captura. No pude ver el movimiento completo. |
| 4 | Retícula y aire | FALLA (parcial) | En 1440 las secciones sí cambian, pero "Why" es una rejilla 2x2 de celdas iguales con icono + título + párrafo, y "Insurance / Out of town" son dos tarjetas redondeadas iguales, más el formulario en tarjeta y el servicio en tarjeta: mucho rectángulo redondeado del mismo tipo (§8 de diseño: título + párrafo + rejilla de tarjetas iguales). |
| 5 | Fotografía tratada | PASA con reserva | Retrato en círculo con halo y en marco con contorno ámbar. En la captura el retrato del anillo se ve muy oscuro y el rostro casi se pierde; revisar que no sea solo la animación. |
| 6 | Paleta con acento | PASA | Azul noche + ámbar. Contrastes de texto claros en la captura. |
| 7 | Referencias vivas | FALLA (parcial, igual que A) | No abiertas en vivo, sin 21st. |
| 8 | Acabado | PASA | Iconos del mismo trazo, hover y foco, pestañas con botones nativos. |
Faltas: 2 (punto 4 parcial y punto 7). Reprueba según la regla de las 2 faltas. La falta del 4 es de criterio: si el jefe no la ve como falta, B queda con 1 falta y pasa.

### 3. Delatores y antipatrones §8
- Delator: "fondo casi negro con un acento vistoso" (aquí azul noche con ámbar: está en la frontera, no es verde ácido) y "crema con serif" (el panel perla #F1ECE2 con titular serif). Cada uno por separado es defendible; juntos acercan el look a lo que sale por defecto.
- Delator: tarjetas redondeadas con el mismo radio repetidas (servicio, "Why", dos de cobertura, formulario).
- Texto que no es tal cual: "Pages" y "Follow" en el pie (no están en home.ts). Las líneas de servicio alrededor del anillo en 1440 están acortadas (no son las frases completas).
- Placeholder visible: `{{ statusText }}` en el formulario.
- Sin mayúsculas espaciadas, sin numeración, sin flechitas, sin degradado morado.

### 4. Prueba del gemelo
Para otra clínica premium saldría: fondo oscuro, serif fino centrado, un botón ámbar/dorado, tarjetas con icono. Lo que ya no saldría: el anillo con el doctor al centro y el panel perla único. La hoja lo declara; coincido, pero lo que más se parece a "otra clínica de lujo" es el conjunto serif fino + oscuro + dorado. En el sector dental de Las Vegas es raro, y eso ayuda.

### 5. Problemas concretos
1440 px:
- Encabezado roto: en el menú, "Insurance & Financing" se parte en 3 líneas y la píldora del menú queda más alta que el logo y el botón; no están alineados. Es el defecto más visible de la página.
- Retrato en el anillo muy oscuro (rostro poco visible) y arcos de color gris azulado, no ámbar, al menos en la captura.
- Panel perla "Thinking about changing your smile?": la caja de foto pendiente queda bajo el titular a la izquierda y el texto a la derecha, con aire vacío arriba a la derecha. Aceptable pero desparejo.
- Reseñas de una en una con pestañas de nombre: 2 de 3 reseñas quedan ocultas hasta tocar; riesgo declarado por la hoja y de acuerdo.
375 px:
- La línea de contorno del marco del doctor sale hasta el borde derecho de la pantalla (cerca de x = 372 de 375); riesgo de desplazamiento lateral. No verificado si hay scroll horizontal.
- Texto pequeño en la nota y footer (cerca de 14 px) sobre fondo oscuro: legible pero justo.
- Casilla de consentimiento sin área de toque de 44 px; enlaces de texto sueltos bajos de alto.
- Servicios en celular: 4 pestañas apiladas y la tarjeta debajo; bien. Sin texto cortado ni solapes en lo demás.

### 7. Las 3 correcciones más importantes (B)
1. Punto de acabado, 1440: arreglar el encabezado (que "Insurance & Financing" no se parta, alinear la píldora con logo y botón).
2. Punto 4 y §8 (tarjetas iguales): romper la rejilla "Why" 2x2 y las dos tarjetas de cobertura (cambiar escala o estructura de al menos una), y cuidar que el retrato del anillo no se vea apagado.
3. Punto 7 y texto: abrir las referencias en vivo y citarlas; poner las frases completas de home.ts; quitar `{{ statusText }}` visible y los rótulos "Pages/Follow" o justificarlos.

---

## 6. ¿Son distintas las tres? (A, B, y solo mirando C sin calificarla)
| | A | B | C (solo para comparar) |
|---|---|---|---|
| Tema | claro, verde azulado | oscuro, azul noche + ámbar | amarillo sol + tinta marino (según su hoja) |
| Letra de títulos | Bricolage Grotesque | Fraunces (serif) | **Bricolage Grotesque** (según hoja-c) |
| Letra de texto | Figtree | Instrument Sans | Atkinson Hyperlegible Next |
| Retícula | izquierda, filas finas, asimetría | centrada, pestañas, tarjetas | no la califiqué |
| Pieza firma | regla de medir | anillo del doctor | no la califiqué |
**Hallazgo: A y C usan la misma letra de títulos, Bricolage Grotesque.** Aunque C usa peso 800 y ancho 80 y A usa 700, es la misma familia: al lado una de otra el parecido se nota (grotesca apretada y enorme). Eso debilita que sean tres direcciones realmente distintas: en tipografía son 2 de 3, no 3 de 3. En tema y pieza firma sí son distintas. Recomendación (no la hago yo): cambiar la letra de títulos de una de las dos.

## Skills usadas y evidencia
- `impeccable` (crítica y auditoría a mano): jerarquía, antipatrones, delatores; evidencia en las secciones 3 y 5 de cada dirección.
- `accessibility`: foco/áreas de toque/contraste visual en 375 px; no medí contraste con herramienta.
- `frontend-design` y `make-interfaces-feel-better`: carácter, delatores, radios y áreas de toque.
- `design-system`: coherencia de tarjetas y radios (B).
- `santa-method`: no cargada en mi lista; no la sustituí. Revisé por mi lado sin ver la nota de otro revisor.

## Fuentes
Capturas propias del visor local `http://127.0.0.1:5190/project/Estilo-A|B.dc.html` (2026-11-17), hojas `hoja-a.md`, `hoja-b.md`, `hoja-c.md` (solo la parte de letra), `apps/web/src/content/home.ts`, manual §8, §20, §35.

## No verificado / pendientes
- Movimiento (puntos 3 de ambas): capturas estáticas a medias; ver en vivo, incluido reduced-motion.
- Contrastes: tomados de las hojas, no recalculados por mí.
- Scroll horizontal a 375 px en B (marco del doctor): sospecha, no confirmada.
- Retrato del anillo oscuro en B: puede ser solo la animación de entrada.
- Referencias vivas (punto 7): no las abrí yo; no tengo permiso para dar por buenas las de la hoja.

---

# Ronda 2 (2026-11-17) · A y B corregidas según CORRECCIONES-1.md
Capturas nuevas de página completa a 1440 px y a 375 px de ancho exacto (marco de 375, tramos de 1900 px), de arriba abajo. Sin tocar ningún archivo de diseño. Nota: el nombre `r2-` de la carpeta de capturas lo pisaban otros agentes; usé mis propias capturas en la carpeta `u2` del scratchpad.

## Qué comprobé de la ronda 1 (los puntos que yo marqué)
| Punto de la ronda 1 | A | B |
|---|---|---|
| `{{ statusText }}` visible | Arreglado: un solo mensaje escrito ("This form is not connected yet...") | Arreglado, igual |
| Texto tal cual home.ts (líneas completas, sin "Pages" ni "Follow") | Arreglado: pie sin rótulos inventados; servicios con frase completa; ya no hay nota de diseño en reseñas | Arreglado: líneas completas alrededor del anillo; pie sin rótulos; sin nota de diseño |
| Referencias (punto 7) | Hoja cita las 8 con qué se tomó y qué se descartó; 21st anotada como herramienta faltante. Con la nota del jefe: PASA | Igual: PASA |
| Encabezado a 1440 | Una línea, bien | "Insurance & Financing" en una línea, píldora activa bien formada y alineada con logo y botón |
| Tarjetas iguales (§8) | No aplica: sin tarjetas | "Why" ya no es rejilla 2x2: un punto grande y tres columnas con filetes. Seguro y SAHARA ya no son iguales (seguro sin caja, SAHARA con tarjeta destacada) |
| Botón de cita en la primera pantalla a 375 | Sí, bajo el titular, antes de cualquier otra cosa | Sí, antes del anillo |
| Áreas de toque a 375 | Fila de la casilla de 52 px y enlaces con alto mínimo 44 px (visto en el código) | Igual (casilla 52 px, enlaces 44 px) |
| Repetición de servicios a 375 | Ya no hay regla ni repetición; solo el libro de filas | El anillo muestra las 4 áreas en filas y luego las pestañas vuelven a mostrarlas: sigue repitiéndose (la hoja lo admite) |
| Retrato del anillo apagado | No aplica | Ya se ve claro y con arcos ámbar (a 1440 y a 375) |
| Desborde horizontal a 375 | No se ve | No se ve; el contorno del marco del doctor queda dentro de la pantalla |
| Huecos a 1440 | Sin el hueco de 250 px; la banda "changing your smile" ya no deja vacío largo | Sin huecos raros |
| Foto del doctor | Tratamiento decidido: duotono menta con bloque verde desplazado | Retrato en círculo con halo y en marco con contorno ámbar |
| Pieza firma / tipografía de A | Nueva pieza: franja de dientes a todo lo ancho, sin repetir servicios; títulos en Funnel Display (ya no Bricolage), titular con interletrado abierto: "lifetime" se lee bien | No aplica |

## Veredicto por dirección
### A «Todos tus dientes»: PASA
Lista premium §20: 1 PASA (Funnel Display grande, ya distinta de C), 2 PASA (franja de dientes), 3 NO VERIFICADO (movimiento a medias en captura), 4 PASA (cada sección cambia de estructura, sin huecos), 5 PASA (foto con duotono y bloque), 6 PASA, 7 PASA con la nota del jefe, 8 PASA. Cero faltas confirmadas.
Qué sigue mal (menor, no impide pasar):
- La franja de dientes se lee como baldosas redondeadas, más "patrón" que "dentadura"; la hoja ya lo marca como riesgo. Hay que verla con la dueña.
- En "Why" hay dos titulares seguidos ("Why patients choose..." y "We help you keep your own teeth") con poco aire.
- Casilla de consentimiento de 28 px dentro de una fila de 52 px: el toque está bien, el cuadrito se ve pequeño.
- Titular a 375 px de unos 40 px: legible, pero lejos de la escala grande de 1440.

### B «El anillo»: PASA
Lista premium §20: 1 PASA, 2 PASA (anillo con arcos ámbar y retrato claro), 3 NO VERIFICADO, 4 PASA (la rejilla 2x2 y las tarjetas iguales ya no están), 5 PASA, 6 PASA, 7 PASA con la nota del jefe, 8 PASA. Cero faltas confirmadas. Ya no están los delatores de tarjetas repetidas.
Qué sigue mal (menor):
- A 375 px los 4 servicios salen dos veces (filas bajo el anillo y pestañas de "Dental care for the whole family"). Alarga la página; conviene decidirlo con el jefe.
- La cita de la reseña se veía atenuada en la captura (probablemente fundido de entrada); revisar en vivo.
- El panel perla con serif sigue acercándose al delator "crema + serif" de §8, pero es una sola sección y el resto es azul noche con ámbar: aceptable.
- Reseñas de una en una con pestañas: 2 de 3 quedan ocultas hasta tocar (riesgo ya declarado).

## Observación para las dos
- "Why" quedó con la misma estructura en A y en B (un punto grande y tres más pequeños). No es falta, pero al ponerlas lado a lado se parecen en esa sección; si el jefe quiere más diferencia, cambiar una.
- Pendiente para las dos: ver el movimiento en vivo y con `prefers-reduced-motion`; contrastes tomados de las hojas, no recalculados por mí.
