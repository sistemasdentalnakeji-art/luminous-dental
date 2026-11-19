# Revisión independiente · ld-qa-4 · Etapa 2 (manual §35)
Quién revisa: ld-qa-4 (QA). No hice ninguna de las 3 direcciones. No leí la nota de otro revisor. Ponytail: apagado.
Fecha: 2026-11-17. Empresa: Luminous Dental, Las Vegas, solo inglés.

## Cómo lo hice (observado)
- Capturas reales con Edge sin ventana del visor `http://127.0.0.1:5190/project/Estilo-<A|B|C>.dc.html`.
- 1440 px: página completa en 8 tramos de 1000 px + la primera pantalla directa (ya con la animación terminada).
- 375 px: página completa en 6 tramos de 1800 px, con el marco a 375 exactos (así se aplican las reglas de celular).
- Miré cada captura con Read. Comparé con `home.ts` y con las hojas, pero juzgo lo que vi.
- Capturas guardadas en mi carpeta de trabajo del turno: `rev-*.png`, `c-*-1440-*.png`, `m-*-375-*.png`, `h-*-1440.png`.

## Lo que NO pude comprobar
- Movimiento real (solo vi fotos fijas; en los tramos con marco, la regla de A y los arcos de B salieron a medias porque la animación no había terminado).
- Pasar el cursor, el foco con teclado, las pestañas de B y la «línea de vida» de C (no las probé; la línea de C solo la vi en su estado inicial).
- Contrastes: no los recalculé; tomé los de las hojas.
- Tamaño real de botones: lo estimé de las capturas, no lo medí con herramienta.
- Navegadores distintos de Edge.

---

# DIRECCIÓN A · «La regla» (claro, verde azulado)

## 1. Veredicto: NO PASA
Dos faltas en la lista premium (puntos 2 y 7). Por la regla de §20, reprueba con 2.

## 2. Lista premium §20
| # | Resultado | Lo que vi |
|---|---|---|
| 1 Tipografía | PASA | Bricolage Grotesque 700 en titular de ~135 px a 1440. Con carácter. Pero el interletrado (-0.035em) es tan cerrado que en «lifetime» las letras f-e-t se pegan. |
| 2 Pieza firma | FALLA | La regla bajo el titular tiene los 4 servicios clavados, y 800 px más abajo aparecen los mismos 4 servicios otra vez como lista. La regla no demuestra trabajo del cliente: es decoración que repite contenido. |
| 3 Movimiento | NO VERIFICADO | El plan está en la hoja. Solo vi la regla a medio dibujar en una captura y completa en otra. |
| 4 Retícula | PASA CON RESERVA | Hay variedad, pero 4 de 8 secciones son «título grande a la izquierda, contenido a la derecha» (servicios, citas/aseguranza, formulario, doctor al revés). A 1440 no se repite una estructura seguida, pero el ritmo es muy parejo. |
| 5 Fotografía | PASA CON RESERVA | Una sola foto real (doctor) con la regla de marco. La del «cambio de sonrisa» es caja punteada «POR CONFIRMAR». |
| 6 Paleta | PASA | Un solo acento verde azulado, fondo claro. Contrastes de la hoja (no los recalculé). |
| 7 Referencias vivas | FALLA | La propia hoja dice que no las abrió en vivo y que no usó 21st. Sin enlace abierto no cuenta (§20.7). |
| 8 Acabado | PASA CON RESERVA | Botones, líneas y foco parecen cuidados. No se pudo ver hover. Sin iconos (no es falta). |

## 3. Delatores y antipatrones §8
- §8 «de diseño»: sección «Why» = título + 3 columnas iguales con filete (casi «título + rejilla de tarjetas iguales»). Moderado.
- §8 «de diseño»: la dirección entera es «verde azulado + blanco + sans grande»: se parece a una clínica de siempre. El propio riesgo de la hoja lo admite.
- Defecto de lienzo visible: el cuadro de estado del formulario enseña el texto crudo `{{ statusText }}` (se ve a 1440 y a 375).
- Una nota de diseño («Design note, not for the live page…») queda a la vista dentro de la sección de reseñas.
- No encontré mayúsculas espaciadas, numeración, flechitas, degradados ni emojis.

## 4. Prueba del gemelo
Saldría igual para otra clínica: encabezado con teléfono + botón verde, titular enorme, servicios en filas, foto de doctor con marco, formulario ancho, pie oscuro. Lo único propio es la regla, y es el punto más flojo (ver punto 2). Hoy es la dirección más intercambiable de las tres.

## 5. Problemas concretos
375 px:
- La regla vertical, antes de «Dental care for the whole family», ocupa ~410 px de altura. En mi captura con marco salió como una línea vacía sin pines ni textos; con la animación terminada (captura directa) sí aparecen. Si el visitante llega antes de que termine, ve un hueco de un pantallazo.
- El botón «Call or text» del formulario y los enlaces «Open in Google Maps» y «Read more patient reviews» son texto subrayado de ~25 a 30 px de alto (cumple 24 px de WCAG 2.2, pero queda bajo 44 px).
- Aparece `{{ statusText }}`.
- El teléfono no está en el encabezado de celular (solo «Menu»). El botón de cita sí se ve en la primera pantalla (bien).

1440 px:
- Hueco grande entre el texto del titular, los botones (a la derecha, flotando) y la regla; los botones quedan lejos del texto que explican.
- Texto de apoyo de la regla (pines) acortado respecto a `home.ts`: «Checkups, cleanings, fillings and preventive care» en vez de la frase completa; «Gentle exams, cleanings and tips for kids» sin «in a comfortable setting»; «Invisalign and braces for children, teens and adults» sin «a straighter smile and a better bite». No es «tal cual».
- Interletrado muy cerrado en el titular (letras pegadas).
- Pie de página: titular blanco gigante sobre fondo oscuro, correcto.

## 6. Correcciones (en orden)
1. Punto 2 (pieza firma): quitar la repetición. O la regla ES la lista de servicios (se borra la lista de abajo), o la regla cuenta algo distinto. Ahora son dos veces lo mismo.
2. Punto 7 (referencias): abrir de verdad las 5 del sector + 3 de fuera y poner enlace y qué se tomó; y poner los textos de los pines tal cual `home.ts`.
3. Limpiar lo que se ve y no debe: `{{ statusText }}`, la nota de diseño, y abrir un poco el interletrado del titular (-0.035em → cerca de -0.02em).

---

# DIRECCIÓN B · «El anillo» (oscuro, azul profundo y ámbar)

## 1. Veredicto: PASA (con correcciones)
Una falta (punto 7), una reserva clara en el punto 2 y un defecto visible en el encabezado.

## 2. Lista premium §20
| # | Resultado | Lo que vi |
|---|---|---|
| 1 Tipografía | PASA | Fraunces 300, optical size alto, titular ~100 px centrado. Se ve editorial. Distinta de A y de C. |
| 2 Pieza firma | PASA CON RESERVA | El anillo de 4 arcos con el retrato del doctor al centro y los 4 servicios alrededor. Es lo más propio de las tres en el primer pantallazo. Pero no demuestra trabajo; muestra al doctor (y es la única foto real). |
| 3 Movimiento | NO VERIFICADO | Los arcos salieron a medias en una captura. Las pestañas no se probaron. |
| 4 Retícula | PASA | Hero centrado, pestañas 4+1, 2x2, doctor 5/7 con marco desplazado, panel perla redondeado, cita central, dos paneles, formulario partido. Cambia de estructura en cada sección. |
| 5 Fotografía | PASA | Retrato en círculo con halo y en marco con contorno ámbar: tratamiento consistente. Una sola foto real; la otra es caja «POR CONFIRMAR». |
| 6 Paleta | PASA CON RESERVA | Un solo acento (ámbar), contrastes buenos. El fondo #0A1B26 se ve casi negro. Ver §8. |
| 7 Referencias vivas | FALLA | Igual que A: la hoja admite que no las abrió ni usó 21st. |
| 8 Acabado | PASA | Iconos de un mismo trazo (diente, carita, personas, escudo), bordes y esquinas con intención. |

## 3. Delatores y antipatrones §8
- Delator «fondo casi negro con un acento…»: azul noche casi negro + ámbar. No es verde ácido ni bermellón, pero es de la misma familia. Marcado como límite, no como falta.
- Delator «crema con serif»: el panel «Thinking about changing your smile?» es crema (#F1ECE2) con serif. Sin terracota, así que no completa el delator; es el único panel claro.
- §8 «de diseño»: sección «Why» = 4 celdas iguales con icono + título + texto (2x2). Es la «rejilla de tarjetas iguales».
- Defecto visible de lienzo: `{{ statusText }}` en el formulario (1440 y 375) y la nota de diseño bajo las reseñas.
- Sin mayúsculas espaciadas, numeración, flechitas ni emojis.

## 4. Prueba del gemelo
Otra clínica de Las Vegas con «oscuro y elegante» podría salir parecido, pero el anillo con el doctor al centro y los servicios alrededor es propio. Lo que sí es de plantilla: «serif ligera sobre azul noche con luz cálida» es un look de moda muy repetido en bienestar y belleza. Una clínica pediátrica no lo usaría; la de Hahn es familiar, así que hay una duda de tono (la hoja la reconoce).

## 5. Problemas concretos
1440 px:
- Encabezado: «Insurance & Financing» se parte en 3 líneas dentro de la píldora de navegación, y el fondo de «Home» queda como una gota alta. Defecto claro de vista, a primera vista.
- Los 4 servicios del anillo tienen texto acortado respecto a `home.ts` (igual que A). Ejemplo: «Invisalign and braces for children, teens and adults».
- El botón de cita no está en el primer pantallazo del hero; solo en el encabezado (pequeño, 46 px de alto).
- Entre el hero y «Dental care» hay mucho aire, bien.
- Reseñas: una sola cita visible a la vez (las otras detrás de pestañas); el paciente solo ve 1 de 3 sin hacer nada.

375 px:
- El botón de cita queda a ~920 px del inicio de la página (debajo del anillo y de los servicios): en un celular de 700 a 800 px de alto no se ve al abrir. En el encabezado solo hay «Menu».
- El titular baja a ~40 px (aceptable en celular; el piso de 64 px es de escritorio).
- Los nombres de los 4 servicios bajo el anillo van en 2 columnas, algunos en 2 líneas; se leen bien.
- Enlaces de texto («Read more patient reviews», «Open in Google Maps», «Call or text») ~25 a 30 px de alto.
- `{{ statusText }}` visible.

## 6. Correcciones (en orden)
1. Encabezado a 1440: que «Insurance & Financing» no se parta (una línea, o reducir el espacio) y arreglar la píldora activa de «Home» (punto 8, acabado).
2. Punto 7 (referencias): abrir las 8 con enlace; y poner los textos de los 4 servicios tal cual `home.ts`.
3. Celular y delatores: subir el botón «Request an appointment» antes del anillo en 375 px, y romper la sección «Why» (hoy 4 celdas iguales), por ejemplo una celda más grande que las otras (§8 de diseño).

---

# DIRECCIÓN C · «Sol» (amarillo, tinta marino y cobalto)

## 1. Veredicto: PASA (con correcciones)
Cero faltas claras. Una reserva (punto 7) y varias cosas por arreglar.

## 2. Lista premium §20
| # | Resultado | Lo que vi |
|---|---|---|
| 1 Tipografía | PASA | Bricolage Grotesque 800 con ancho semicondensado, titular ~150 px en 3 líneas; texto en Atkinson Hyperlegible Next. Tiene la voz más fuerte de las tres. |
| 2 Pieza firma | PASA CON RESERVA | «Línea de vida»: raya gruesa con 4 paradas (Whole family, Kids, Teens, Adults) que debería encender los grupos de servicios. Solo la vi en su estado inicial; no probé que reaccione. No demuestra trabajo, pero sí es interactiva y propia. |
| 3 Movimiento | NO VERIFICADO | Plan en la hoja; no lo vi correr. |
| 4 Retícula | PASA | Servicios en escalera, «We help you keep your own teeth» enorme con tres notas escalonadas, doctor sobre cobalto, franja sol, citas de 3 tamaños, franja partida tinta/cobalto, formulario sobre esmalte. Rompe la rejilla varias veces. |
| 5 Fotografía | PASA CON RESERVA | Doctor con marco esmalte y bloque sol, muy bien tratado. La foto del hero es una caja punteada «POR CONFIRMAR» enorme. |
| 6 Paleta | PASA CON RESERVA | Un solo acento (cobalto) sobre sol/tinta/esmalte. Amarillo muy saturado a pantalla completa; sol sobre cobalto 4.75:1 (al límite). Se alterna bien. |
| 7 Referencias vivas | PASA CON RESERVA | Cita 5 y 3 con qué se tomó y capturas en `docs/referencias/`. Sin 21st. No revisé yo esas capturas. |
| 8 Acabado | PASA | Radios concéntricos en el formulario, teléfono con números tabulares, un set de iconos, subrayados. |

## 3. Delatores y antipatrones §8
- §8 «de diseño»: el hero es «texto a la izquierda, caja de foto a la derecha». Se salva porque lleva pieza firma debajo y escala enorme, pero sigue siendo la composición base.
- Delator «fondo casi negro + acento»: el pie es tinta marino con texto sol, no es el caso (no es negro ni verde ácido).
- Delator «datos con puntos medios»: «Real clinic photo · POR CONFIRMAR» es una nota de lienzo, no diseño final.
- Nota de diseño visible en reseñas (cuadro punteado) y en el formulario aparecen a la vez «Please complete the highlighted fields.» y «This form is not connected yet…»: dos mensajes apilados, confuso aunque sea una demostración.
- Sin mayúsculas espaciadas, numeración, flechitas, degradados ni emojis.
- Sin `{{ statusText }}` (C no tiene ese defecto).

## 4. Prueba del gemelo
Es la que menos saldría igual: ninguna otra clínica de Las Vegas pondría amarillo sol + cobalto. Lo que sí sería de plantilla: encabezado con teléfono y botón, formulario simple (lo dice la hoja). Riesgo de tono: el amarillo a pantalla completa puede leerse más «pediátrico/promoción» que «dentista de confianza». Eso lo decide el dueño.

## 5. Problemas concretos
1440 px:
- Hueco grande entre el titular/texto y la caja de foto del hero (la hoja dice que es a propósito). La caja vacía «POR CONFIRMAR» es lo primero que se ve a la derecha: se lee como pieza sin terminar.
- Una sola foto real en toda la página.
- «General Dentist» y el botón del doctor están en amarillo sobre cobalto (4.75:1) con letra pequeña; justo en el límite de AA.
- Textos de apoyo de los servicios están completos como en `home.ts` (bien).
- Textos de interfaz agregados que no están en `home.ts` («Pick a stage of life», «Whole family», «Kids», «Teens», «Adults», «Fits this stage», etc.): la hoja los avisa; faltan aprobarse.

375 px:
- La caja de foto del hero ocupa ~410 px y empuja el texto y los botones de cita bajo el pliegue (botones a ~920 px). Lo compensa la barra fija de abajo («Request an appointment» + «Call or text»), que sí está a mano.
- La barra fija dice solo «Call or text» sin el número (no hay problema de contraste ni tamaño: ~50 px de alto).
- Escalera de servicios: se corre hacia la derecha 10 a 30 px en cada fila; todo cabe, sin texto cortado.
- Los dos mensajes del formulario quedan pegados sin separación.
- Enlaces de texto del pie (Pages, Follow us) ~24 a 30 px de alto, bajo 44.
- No encontré texto cortado ni desborde horizontal.

## 6. Correcciones (en orden)
1. Hero (puntos 4 y 5): resolver la caja vacía. Si no hay otra foto real, usar la del doctor ahí o reducir la caja y quitar el hueco; en 375 px bajarla para que el botón de cita se vea sin desplazarse.
2. Textos y mensajes: aprobar o quitar la inferencia «Cosmetic = Adults» (no sale de `home.ts`; afirma algo sobre edades), y mostrar solo un mensaje de estado del formulario a la vez.
3. Punto 7 + distinción con A: abrir las referencias en vivo (y 21st si existe), y cambiar la familia de títulos o la pieza firma para que no se parezca a A (ver abajo).

---

# 6. ¿Son distintas entre sí?
| | A | B | C |
|---|---|---|---|
| Tema | claro, verde azulado | oscuro, azul noche + ámbar | amarillo + tinta + cobalto |
| Letra de títulos | **Bricolage Grotesque** 700 | Fraunces 300 (serif) | **Bricolage Grotesque** 800 ancho 75-85 |
| Letra de texto | Figtree | Instrument Sans | Atkinson Hyperlegible Next |
| Retícula | izquierda, libro de filas | centrada, simétrica | escalonada |
| Pieza firma | regla horizontal con 4 pines | anillo con el doctor | línea gruesa con 4 paradas |

Observaciones (observado):
- **A y C comparten la misma familia de títulos (Bricolage Grotesque).** Se ven distintas porque C usa peso 800 y ancho condensado, pero es la misma tipografía y el mismo fabricante de la voz. B está bien separada.
- **Las piezas firma de A y C son la misma idea:** una línea que cruza la pantalla bajo el titular con 4 puntos clavados. Cambian el trazo (regla fina vs raya gruesa) y las etiquetas (servicios vs etapas). El dueño las vería como parientes. B es la única realmente distinta.
- A y C tienen el mismo hero base (titular enorme a la izquierda, dos botones, línea debajo). B es centrado.
- Conclusión: temas y colores sí son distintos; **tipografía y pieza firma de A y C no lo son lo suficiente.** Hoy el dueño elige realmente entre 2 conceptos, no 3.

# 7. Resumen de las 3 correcciones por dirección
**A (NO PASA)**
1. §20.2: la regla repite la lista de servicios. Fusionarlas o darle a la regla otro trabajo.
2. §20.7 y texto: abrir las 8 referencias en vivo; textos de los pines tal cual `home.ts`.
3. Quitar `{{ statusText }}` y la nota de diseño; abrir el interletrado del titular.

**B (PASA con correcciones)**
1. Encabezado a 1440: «Insurance & Financing» se parte en 3 líneas y la píldora activa se ve rota (§20.8).
2. §20.7: abrir referencias en vivo; y textos de los servicios del anillo tal cual `home.ts`.
3. Botón de cita arriba en 375 px y romper la rejilla 2x2 de «Why» (§8 de diseño).

**C (PASA con correcciones)**
1. Hero: la caja vacía «POR CONFIRMAR» y el hueco; en 375 px el botón de cita queda bajo el pliegue (§20.5).
2. Aprobar o quitar «Cosmetic = Adults»; un solo mensaje de estado en el formulario.
3. Separar C de A: cambiar la familia de títulos o la pieza firma; abrir referencias (§20.7).

---
## Razonamiento (3 a 5 líneas)
Juzgué solo lo que se ve en capturas a 1440 y a 375 px, contra §8, §20 y §35. A reprueba porque su pieza firma repite contenido y no hay referencias abiertas; B y C pasan porque su firma y su retícula sí cambian de sección a sección. Los mismos defectos de lienzo se repiten (texto crudo `{{ statusText }}` en A y B; mensajes apilados en C; notas de diseño a la vista). Marqué lo que no pude ver (movimiento, hover, foco, pestañas) como NO VERIFICADO.

## Skills usadas y evidencia
- `ld-bienvenida`: reglas (solo inglés, Las Vegas; no inventar; sin datos de Dental Nakeji).
- `browser-qa`: fases 1 y 3 (humo y captura a 375 y 1440). Sin línea base, la parte de regresión visual queda INCONCLUSA.
- `playwright-cli`: cargada; usé Edge sin ventana por pedido del encargo, no el cliente.
- `accessibility` y `frontend-a11y`: revisé tamaño de objetivos (24 px mínimo), texto de enlaces, estado de formulario (`{{ statusText }}`, mensajes), orden y foco solo de lo visible. Foco con teclado y lector de pantalla: no verificados.
- `verification-loop`: no aplica (no hay compilación); no se corrió.
- `ponytail:ponytail`: el encargo pide ponytail apagado; no lo apliqué al diseño, solo cerré con lo no verificado.
- `react-testing`: no aplica (lienzo HTML, no React).
- `impeccable`, `frontend-design`, `santa-method`: el encargo las pide y NO están cargadas en mi lista; no las sustituí. Hice el juicio de carácter con la rúbrica del manual.

## Fuentes (2026-11-17)
`docs/lienzo/REVISION.md`, `hoja-a.md`, `hoja-b.md`, `hoja-c.md`, `apps/web/src/content/home.ts`, manual §8, §20, §35, y capturas de las tres direcciones.

## No verificado y pendientes
Movimiento, hover y foco; pestañas de B; línea de vida de C; contrastes recalculados; medición exacta de botones; las referencias (no las abrí). El tamaño de 375 px lo tomé con un marco a 375 exactos; la ventana directa de Edge se cruza mínimo en unos 500 px y recorta, así que descarté esas capturas para el celular.

---

# Ronda 2 (después de CORRECCIONES-1.md)
Misma forma de trabajar: capturas nuevas a 1440 (tramos de 1000 px) y a 375 (marco de 375 exactos), de arriba abajo. No arreglé nada.
Verificado en los archivos: ya no hay `{{ ... }}` ni «Design note» en las tres; las hojas citan 8 enlaces cada una (punto 7, según la nota del jefe, pasa en las tres; 21st no cuenta como falta).
No verificado otra vez: movimiento, hover, foco con teclado, pestañas de B, que la línea de vida de C reaccione, contrastes recalculados, que los enlaces de `docs/referencias.md` coincidan con lo que dice cada hoja.

## A «La regla» (ahora con Funnel Display y una franja de dientes): PASA
Corregido bien:
- Letra de títulos nueva (Funnel Display + Figtree). Ya no es Bricolage; el titular respira y «lifetime» ya no se funde (punto 1).
- Pieza firma nueva: una franja de dientes dibujados bajo el titular. Ya no es línea con 4 puntos ni repite los servicios (punto 2 deja de ser falta).
- Se acabó `{{ statusText }}` (un solo mensaje fijo), la nota de diseño y las etiquetas «Pages» y «Follow».
- Textos de servicios completos como en `home.ts` (hero ya no los acorta; servicios solo salen en la lista).
- Botón de cita en la primera pantalla a 375 y a 1440. Doctor con tratamiento decidido (duotono verde y bloque de color).
- «Why» ya no es 3 columnas iguales: un titular grande y una columna de 3 filas.
Sigue mal (no basta para reprobar):
- La franja de dientes es adorno: no demuestra trabajo del cliente y sus dientes con brillo degradado se acercan al cliché dental. Reserva en el punto 2.
- En «Thinking about changing your smile?» sigue una caja punteada enorme «POR CONFIRMAR» (~370 px de alto) que se lee como pieza sin terminar.
- Enlaces de texto sueltos («Read more patient reviews», «Call or text» del formulario) siguen en ~25 a 30 px de alto, bajo 44.
- Del hero a la franja y de esta a servicios hay aire, pero ya no el hueco de ~250 px de antes.

## B «El anillo»: PASA
Corregido bien:
- Encabezado a 1440: «Insurance & Financing» en una línea y la píldora de «Home» bien formada.
- «Why» ya no es 2x2: una idea grande a la izquierda con su texto a la derecha y 3 columnas más abajo, de anchos distintos.
- Cobertura ya no son dos tarjetas iguales: «Insurance» es solo texto con filete y «Coming from out of town?» es una tarjeta grande con halo.
- A 375 el botón de cita está arriba del anillo; el retrato ya no se ve apagado (ahora con aro ámbar); los 4 servicios van completos en una lista.
- Textos de servicios como en `home.ts`; sin `{{ }}`, sin nota de diseño, sin «Pages»/«Follow».
Sigue mal:
- La caja «POR CONFIRMAR» del cambio de sonrisa sigue en el panel crema (más pequeña que la de A, pero igual de sin terminar).
- Reseñas: una sola cita visible a la vez; las otras detrás de pestañas.
- Enlaces de texto (reseñas, formulario, mapa) ~25 a 30 px, bajo 44.
- Límite del delator «fondo casi negro con acento»: sigue siendo azul noche con ámbar; lo dejo anotado, no como falta.
- Aviso técnico de mi parte: una captura de este tramo salió casi toda en blanco por el marco, no por la página; la repetí con otro tramo y se ve completa.

## C «Sol»: PASA
Corregido bien:
- Hero: foto real del Dr. Hahn con marco esmalte y bloque cobalto, sin caja vacía ni hueco; botones de cita arriba en 375 con el retrato justo debajo.
- Línea de vida: ahora «Whole family, Children, Teens, Adults»; ya no dice «Cosmetic = Adults» ni «Kids».
- Un solo mensaje de estado en el formulario; sin nota de diseño en reseñas.
- Enlaces del pie a 375 ahora separados ~44 px (se ven más grandes y espaciados).
- Dejó Bricolage Grotesque y la línea de vida, tal como se pidió.
Sigue mal:
- El doctor aparece 2 veces con el mismo marco (hero y sección del doctor sobre cobalto): repite la foto, la única que hay.
- Amarillo muy saturado a pantalla completa y sol sobre cobalto 4.75:1 en «General Dentist» (letra pequeña); no recalculé.
- Una sola foto real en toda la página.
- No probé que la línea de vida encienda los servicios.

## ¿Ya son realmente distintas las 3?
Sí, ahora sí.
- Letra de títulos: A Funnel Display (geométrica, ancha), B Fraunces (serif ligera), C Bricolage Grotesque (condensada pesada). Tres familias, tres voces.
- Pieza firma: A franja de dientes (adorno); B anillo con el doctor; C línea de vida con etapas. Ya no hay dos líneas con 4 puntos.
- Tema: claro verde, noche con ámbar, amarillo con cobalto.
- Retícula: A columnas editoriales a la izquierda; B centrada; C escalonada.
Lo único parecido que queda: las tres tienen la misma foto del doctor y el mismo texto (es el mismo contenido), y las tres terminan con el titular grande en el pie.

## Correcciones que aún conviene (no frenan el Sí 2)
1. A y B: la caja «POR CONFIRMAR» del cambio de sonrisa; achicarla o ponerla como nota corta hasta tener foto.
2. Las tres: enlaces de texto sueltos a 44 px de alto.
3. A: la franja de dientes (adorno sin trabajo del cliente); valorarla con el dueño al enseñarla. C: la foto repetida del doctor.
