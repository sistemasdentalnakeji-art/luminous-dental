# Hoja de dirección C · «Sol» · Luminous Dental

Archivo: `docs/lienzo/project/Estilo-C.dc.html` (inicio completo, fluido de 375 a 1440 px). Texto: `home.ts` tal cual. Revisada en la ronda 1 (17-11-2026); ver la sección final.

## Qué transmite y para qué paciente
Un color de marca valiente como fondo: amarillo sol (la «luz» de Luminous), con tinta azul marino y marcos blancos «esmalte». Transmite calidez, claridad y confianza sin verse clínico. Sirve a la familia que busca un dentista cercano en Las Vegas y quiere ver rápido si hay atención para todos; también a adultos que leen en celular (letra muy legible, botones grandes).

## Par tipográfico y por qué
- **Títulos: Bricolage Grotesque** (800, ancho 80, tamaño óptico alto). Grotesca con rasgos propios y ancho semicondensado: permite un titular enorme en tres líneas cortas. Salió de la escala editorial de Oura (titular enorme, mucho aire) y de la claridad de One Medical. C se queda con ella; A la cambia.
- **Texto: Atkinson Hyperlegible Next**. Diseñada para máxima legibilidad (Braille Institute); encaja con pacientes de todas las edades. Fuera de la lista de «las de siempre».
- Ambas vienen de Google Fonts solo en el lienzo; en producción se alojan en el sitio (WOFF2, `font-display: swap`).

## Paleta (contrastes AA calculados con la fórmula WCAG)
| Nombre | Código | Uso | Contraste |
|---|---|---|---|
| Sol | #FFC93C | Fondo principal | tinta sobre sol 10.65 |
| Tinta | #0F1F3D | Texto, botones, pie | tinta sobre esmalte 15.82; sol sobre tinta 10.65 |
| Esmalte | #FFFBF0 | Marcos de foto, franjas claras, formulario | |
| Cobalto (único acento) | #2340E0 | Doctor, franja SAHARA, filas encendidas, filetes, bloque tras la foto del hero | blanco sobre cobalto 7.29; cobalto sobre esmalte 7.05; sol sobre cobalto 4.75 (justo; solo cargo del doctor, que va en 20 px negrita = texto grande) |
| Tinta suave | #2A3957 | Notas | sobre esmalte 9.7; sobre sol 7.51 |

Error del formulario: #B3261E con borde, fondo rosado y el texto «Required» (no solo color). Aparece solo después de tocar el campo (`:user-invalid`).

## Pieza firma (una línea)
**La línea de vida:** una raya gruesa cruza toda la pantalla bajo el titular y lleva cuatro paradas (Whole family, Children, Teens, Adults); al elegir una, las filas de servicios que `home.ts` liga a esa etapa se iluminan (fondo esmalte y título cobalto). Demuestra «tus dientes deben durar toda la vida» y «para toda la familia» sin cifras ni casos. Solo CSS (radios reales, sin script).

Qué ilumina cada parada (solo lo que dice `home.ts`):
| Parada | Se iluminan | Base en `home.ts` |
|---|---|---|
| Whole family | nada (vista general) | |
| Children | General, Orthodontics, Pediatric | «every stage of life»; «children, teens and adults»; «for kids» |
| Teens | General, Orthodontics | «every stage of life»; «children, teens and adults» |
| Adults | General, Orthodontics | «every stage of life»; «children, teens and adults» |
Cosmetic no nombra edad en `home.ts`, así que nunca se ilumina ni se apaga.

## Plan de movimiento (reglas de `motion-foundations`: solo `transform` y `opacity`, un momento)
- **Un momento orquestado:** al cargar, la línea de vida se dibuja de izquierda a derecha (1.5 s) y las cuatro paradas se asientan una tras otra. El titular nunca empieza oculto.
- **Respuestas al visitante:** botones suben 2 px al pasar y se hunden al pulsar; paradas suben 3 px; filas de servicios cambian de fondo y de color de título; enlaces alargan el subrayado; campos cambian de fondo y muestran anillo de foco de 3 px; menú móvil; marcas de error.
- Todo lo demás está quieto. Con `prefers-reduced-motion` no hay animaciones ni transiciones y la línea aparece ya dibujada. Sin `transition: all`.

## Referencias (las 8 de `docs/referencias.md`, abiertas por el jefe; capturas en `docs/referencias/`)
Del sector (Las Vegas):
1. Dee for Dentist (https://deefordentist.com): tomé titular enorme y botón de cita siempre a la vista. Descarté la barra amarilla de promoción y el verde ácido.
2. Dental Rose (https://www.dentalrose.com): tomé la barra fija de celular con pedir cita y llamar (el «dock» de C). Descarté la cabecera oscura pesada.
3. Absolute Dental (https://www.absolutedental.com): tomé la idea de dos acciones claras arriba (cita y llamar juntas, en el hero y en la cabecera). Descarté el aspecto de cadena y la banda azul con el teléfono gigante. La captura es muy chica; lo anotado sale de lo que alcanzo a ver.
4. A Great Smile Dental (https://agreatsmiledental.com): tomé la claridad y las reseñas cerca del inicio como principio (aquí van más abajo, con citas grandes). Descarté el collage y los contadores. Captura muy chica.
5. Aspiring Smiles (https://aspiringsmileslasvegas.com): tomé que el formulario se encuentre pronto (botón de cita arriba que baja directo al formulario). Descarté todo en mayúsculas y el texto interminable. Captura muy chica.
De fuera del sector:
6. Oura (https://ouraring.com): titular editorial enorme, foto con una sola idea, fondo cálido. No tomé el tono de producto tecnológico ni su serif.
7. One Medical (https://www.onemedical.com): salud con calidez, un solo botón «Request an appointment» y una línea que guía la vista (aquí, la línea de vida). Descarté el azul genérico.
8. Aesop (https://www.aesop.com/us/): calma y mucho aire entre secciones. Descarté el aspecto de lujo y el poco texto útil.

Herramientas faltantes (no es falta mía): 21st `get_inspiration` y la Biblioteca de diseño web no existen en esta PC. hellotend.com y forhims.com no se pudieron abrir (bloqueo de seguridad).

## Riesgo
1. Amarillo saturado cansa si se abusa; por eso se alterna con esmalte, cobalto y tinta. 2. Sol sobre cobalto (4.75) está al límite de AA. 3. Cercano al amarillo de Dee for Dentist (allá con verde ácido); aquí es cálido y va con azul marino. 4. Si el logo real trae otros colores, hay que ajustar. 5. Solo hay una foto real y ahora aparece dos veces (hero con recorte cerrado, sección del doctor completa). `home.ts` aún dice `src: null` para la foto: el jefe decidió usarla; el permiso del dueño sigue POR CONFIRMAR. 6. «Individual results vary.» y reseñas: el permiso de cada cita sigue POR CONFIRMAR (la nota ya no se ve en la página; vive en `home.ts`).

## Textos de interfaz que agregué (no están en home.ts; a aprobar)
- Visibles: «Whole family», «Children», «Teens», «Adults» (paradas de la línea de vida; «whole family», «children, teens and adults» salen de `home.ts`), «Menu», «Required», y las etiquetas de formulario («Full name», «Phone», «Email», «Type of care», «Choose one»).
- Solo para lector de pantalla (no se ven): «Pick a stage of life», «Fits this stage», «Pages», «Social media».
- Quitado en la ronda 1: «Pages», «Follow us» visibles, la nota de diseño de reseñas, «Real clinic photo · POR CONFIRMAR» y los textos «Kids» / «Cosmetic = Adults».

## Lista premium (sección 20)
1. Tipografía con carácter: PASA (Bricolage + Atkinson; titular hasta 152 px con `clamp()`).
2. Pieza firma: PASA (la línea de vida; ahora separa de verdad: Pediatric solo con Children, Cosmetic nunca).
3. Movimiento con intención: PASA en plan; no visto en vivo por mí (capturas fijas).
4. Retícula editorial y aire: PASA (escalera de servicios, frase grande y tres chicas escalonadas, citas de tres tamaños, franja partida; ninguna sección seguida repite estructura).
5. Fotografía tratada: PASA con reserva (marco esmalte y bloque cobalto en el hero, bloque sol en el doctor; una sola foto real, repetida).
6. Paleta con acento disciplinado: PASA (cobalto único; contrastes arriba).
7. Referencias vivas citadas: PASA con reserva (las 8 citadas con qué se tomó y qué no; sin 21st; 3 capturas del sector son muy chicas).
8. Detalle de acabado: PASA (foco y hover diseñados, radios concéntricos 36/18 en el formulario, un solo set de iconos, teléfono tabular, `text-wrap`, áreas de toque ≥ 44 px).
Resultado: 0 faltas, 2 reservas (5 y 7).

## `impeccable critique` (a mano; `impeccable context` pidió elegir app y no hay DESIGN.md, no seguí)
- Jerarquía: el titular domina; pedir cita se ve en 2 segundos (cabecera, hero, barra móvil) y a 375 queda en la primera pantalla dentro del texto.
- Ritmo de fondos: sol, esmalte, cobalto, sol, esmalte, tinta y cobalto, sol, tinta.
- Sin degradados, blobs, emojis ni tarjetas iguales.

## Prueba del gemelo
Para otra clínica de Las Vegas saldría: fondo blanco o azul, foto de sonrisa a la derecha, rejilla de 4 tarjetas iguales. Cambié: (1) fondo amarillo en vez de blanco clínico; (2) servicios en escalera de filas que reacciona a la etapa de vida, no tarjetas; (3) el doctor, con marco esmalte y bloque de color, ya desde el hero; (4) tipografía pensada para legibilidad, no de plantilla. Se quedó lo común por claridad: cabecera con teléfono y botón, formulario simple.

## Prohibidos del manual §8
Sin hero texto/foto sin firma, sin mayúsculas espaciadas, sin 01/02/03, sin flechas en botones, sin aparecer-y-subir por sección, sin crema+serif+terracota, sin negro+verde ácido, sin Inter/Poppins y similares.

## Ronda 1: qué cambió por cada observación
**Para las 3**
1. Nada de `{{ hueco }}` visible: quité los dos `sc-if` y los enlaces `{{ }}` del formulario y del script. El formulario muestra un solo mensaje fijo (el de «preview» de `home.ts`), escrito en el HTML. El «Required» sale por CSS al tocar un campo vacío.
2. Texto tal cual `home.ts`: quité «Pages», «Follow us» (las columnas de enlaces del pie quedan sin título, alineadas con «Contact») y la nota de diseño de reseñas. «Kids» pasó a «Children». Las etiquetas de formulario se quedan. Lo agregado por la línea de vida está listado arriba.
3. Referencias: las 8 citadas con enlace y qué se tomó o descartó; 21st anotada como herramienta faltante.
4. Celular: «Request an appointment» queda dentro de la primera pantalla (el hero va titular, texto, botones y luego foto) además de la barra fija. Áreas de toque: logo 44 px, enlaces del pie 44 px, filas de servicio completas son enlace, casilla de consentimiento con toda la fila como zona de toque (56 px), campos 56 px, botones 52 a 60 px. Medidas con script a 375: lo que sigue bajo 44 px son las etiquetas de texto «Full name», «Phone», «Email», «Type of care» (26 px), que no son controles propios; su campo debajo mide 56 px.
5. Capturas a 375 hechas en marco de 375 px exactos, de arriba abajo; a 1440 en 9 tramos de 1000 px.

**C «Sol»**
- Hero: la caja vacía fue sustituida por la foto real del Dr. Hahn (`/_blob/f083a374d6191d67857e1e7615274e99`) con recorte cerrado, marco esmalte y bloque cobalto detrás. Se acabó el hueco a 1440; el titular ocupa 8 columnas y la foto 4. Botón de cita arriba en 375.
- Línea de vida: quité «Cosmetic = Adults» y cualquier edad que no esté en `home.ts`. Ahora: General (todas las etapas), Orthodontics («children, teens and adults»), Pediatric (niños); Cosmetic no se ilumina nunca. La parada «Whole family» no ilumina nada. Quité la etiqueta visible «Fits this stage»; el aviso queda solo para lector de pantalla.
- Un solo mensaje de estado en el formulario; enlaces del pie de 44 px.
- C se queda con Bricolage Grotesque y la línea de vida.

**Qué no pude verificar:** el movimiento en vivo; el teclado; el archivo dentro del lienzo real con `support.js` (probé una copia sin el envoltorio `x-dc`); si `onsubmit="return false"` se respeta dentro del lienzo; los contrastes no se recalcularon (siguen los de la tabla).
