# Hoja B4 · hero en 2 columnas con la figura «How braces work» (18-11-2026)
Archivos: `lienzo/project/Estilo-B4.dc.html` (1440, `$preview` 1440×8099) y `Estilo-B4-movil.dc.html` (375, `$preview` 375×8764). Parten de B3 (B3 no se tocó). Figura hecha con la skill `anatomy`, en `lienzo/anatomy/brackets/`. Datos solo de `home.ts`; sin meses, semanas, porcentajes ni precios.

## Concepto
**El objeto es la explicación:** un modelo dental de ortodoncia (tipodonto) sobre su base de banco. Una arcada inferior de 12 dientes (central, lateral, canino, 2 premolares y molar, a cada lado) sobre la encía. Una perilla dorada corre por un riel con marcas: es **el único control**. Un solo número `t` (0 a 4) sale de la perilla y de él salen todas las piezas y todas las palabras:
1. **Crooked teeth** (t=0): dientes chuecos, girados o adelantados/atrasados.
2. **Brackets bonded** (t=1): los brackets bajan uno a uno y quedan pegados a cada diente.
3. **Archwire threaded in** (t=2): el alambre entra por las ranuras desde el molar izquierdo; se pone una liga azul en cada bracket. El alambre pasa por los dientes chuecos, así que se ve doblado.
4. **Teeth start to move** (t=3): los dientes se van acomodando; el alambre se relaja.
5. **Teeth move into line** (t=4): dientes alineados en el arco; el alambre queda liso.
(El manómetro de la primera versión se quitó en la ronda de correcciones.)
Movimiento: la figura se recorre sola en bucle (≈10 s) mientras está a la vista y nadie la toca, con **botón Pause/Play** y pausa con el cursor encima o con el foco de teclado en un paso; con mouse/toque se arrastra la perilla o se pulsa un paso (botones 1 a 5); con teclado: flechas, Inicio y Fin. Si alguien la usa, el bucle espera 8 s. **`prefers-reduced-motion`:** queda el paso 5 quieto y los controles funcionan (saltan al paso). Sin script se ve el paso 5.
Hero: izquierda titular + frase + «Request an appointment» + «Call or text» (de `home.ts`); derecha la figura. A 375: texto y botón de cita primero, figura debajo. El **anillo con el doctor** bajó a su propia sección justo después del hero (sigue siendo la única foto del doctor). Lo demás es igual que B3.

## Lista de piezas
- **Base:** placa con bisel y halo, 4 patas (2 piezas cada una), línea interior, 4 tornillos, placa de etiqueta con 3 rayas.
- **Encía:** base moldeada (labio) + cresta donde se paran los dientes.
- **Dientes:** 12 × (corona baja + corona alta con borde), 8 surcos en premolares y molares. Porcelana.
- **Brackets:** 12 × (base, cuerpo con ranura y 2 remaches de extremo, 4 aletas en los 10 que no son molar); los 2 molares llevan tubo. Metal claro.
- **Alambre** (dos trazos: sombra y brillo), con curva suave que pasa por cada ranura; **ligas** en cielo `#7bc3eb`.
- **Control:** canal, 2 guías, 2 topes con tornillos, regla con 21 marcas, carro con 4 tornillos, perilla dorada con moleteado y marca.
En el paso final se dibujan **76 sólidos y ≈680 trazos**: es un Hero en la parte baja del rango (80 a 150 piezas contando tornillos, marcas y remaches como piezas pequeñas).
Paleta de B3: noche `#0a1529`, superficie `#0d1c37`, cielo `#7bc3eb`, oro `#e0b65c` **solo para la perilla** (lo elegido). Sin personas ni caras, sin WebGL.

## Textos nuevos para aprobar (en inglés)
Todos nuevos salvo donde se indica. **Texto nuevo para aprobar por la dueña:**
- Título de la tarjeta: «How braces work».
- Los 5 pasos: «Crooked teeth», «Brackets bonded», «Archwire threaded in», **«Teeth start to move»** y **«Teeth move into line»** (los dos últimos cambiaron en la ronda de correcciones: ahora son frases de proceso, sin prometer resultado ni ausencia de molestia).
- Lectura: «Step n of 5».
- Pista: «Drag the gold knob or pick a step».
- Botón de pausa (nombre accesible): «Pause animation» / «Play animation».
- Nombre corto del control: «Braces steps».
- Nota: «Illustration. Individual results vary.» → «Individual results vary.» ya está aprobado en `home.ts` (smile.disclaimer y footer.note); **«Illustration.» es nuevo**.
- Descripción para lectores de pantalla (aria-describedby): «Illustration of a model of the lower teeth. Brackets are bonded to crooked teeth, an archwire is threaded through them, and the teeth move into line, one step at a time. Use the left and right arrow keys to change the step.»
- Los 5 botones solo llevan el número; su nombre accesible es «Step n: …».
Lo que **no** dice la figura: tiempo de tratamiento, número de visitas, tipos de brackets, dolor, resultados garantizados, precios.
Nota de contenido: la figura muestra brackets metálicos con ligas; el sitio oficial dice «Invisalign y brackets» (home.ts, texto «POR CONFIRMAR» en el mapa para ortodoncia). La figura no afirma que la clínica use este tipo de bracket.

## Auditoría de Anatomy (repetida tras las correcciones)
- `node audit.mjs` (propia; la del kit con grabador es para tubos y piezas redondas y no aplica a prismas y un alambre): 81 poses × 66 pares: ningún diente atraviesa a otro (hueco mínimo 0.38), todos pisan sobre la encía (ahora con extremos redondeados), orden de pintado correcto, alambre por las 12 ranuras. **audit passed.**
- `scripts/lines.mjs`: **line ends: 0** en t = 0, 0.2, 0.5, 1, 1.2, 1.5, 2, 2.2, 2.5, 3, 3.2, 3.5, 3.8, 4 (solo tema oscuro). Al agrandar el modelo hubo que acortar las marcas de la regla y las rayas de la perilla; ya está en 0.
- 4×: extremo izquierdo de la encía y cola derecha del alambre (`shots/zoom-*-4x.png`). La cola del alambre sale del tubo del molar y termina en punta limpia sobre la encía; la encía cierra redonda.
- Pausa/Play probado en el arnés: pausado no avanza; Play reanuda; con el cursor encima no avanza.

## Peso
| Pieza | Sin comprimir | gzip |
|---|---|---|
| SVG de la tarjeta (paso final, con respaldo sin script) | 173.4 KB | 30.6 KB |
| Script de la figura (kit recortado + modelo + dibujo + controles) | 36.8 KB | 12.0 KB |
| CSS de la figura | 6.5 KB | — |
| Archivo B4 completo (B3 pesa 59.0 KB / 17.0 KB gzip) | 277.1 KB | 62.5 KB |
Dibujo por cuadro: ≈7 ms (primera versión; no se volvió a medir) de script (medido en Node, no en el navegador); se limita a **30 fps** y solo corre con la figura a la vista y moviéndose. Sin WebGL, sin imágenes.

## No verificado
- El runtime real del lienzo (DC) **no se corrió**; las capturas y pruebas salen de un arnés (`harness.mjs`) que carga el mismo marcado y la misma lógica. Que `innerHTML` sobre las capas de la figura sobreviva a los re-render del lienzo no está probado (el componente no re-renderiza: `renderVals` devuelve `{}`).
- Navegador: Edge 157 sin ventana (no había Chrome). Toque real en un teléfono no probado (solo eventos de puntero simulados); fps reales no medidos.
- Solo tema oscuro (el de la página). Las capturas salen del visor http://127.0.0.1:5190 con el arnés (el visor no corre el script del lienzo).
- Pausa/Play: el icono y el texto «Play animation» están escritos también dentro del script (no solo en `card.mjs`). No se hizo versión clara.
- Contraste de los textos de la tarjeta (15 px sobre `#0b1a36`): no medido con herramienta; son los mismos colores de apoyo de B3.
- Orden de pintado del alambre respecto a dientes lejanos: por regla simple (se oculta donde el diente da la espalda); en el borde puede quedar un tramo de alambre que en la realidad taparía una corona.
- `canvas.json`: no agregué B4 al lienzo (no estaba en el encargo).

## Herramientas (en `lienzo/anatomy/brackets/`)
`model.js` (modelo), `draw.js` (dibujo), `live.js` (movimiento), `card.mjs` (tarjeta y textos), `style.mjs` (paleta), `build.mjs` (genera `brackets.html`, página suelta, y `figure.json`; `--t=2` genera un paso fijo), `audit.mjs`, `integrate.mjs [h1440 h375]` (crea B4 desde B3), `harness.mjs`. Capturas en `shots/`. No se corrió `publish.mjs`.

## Correcciones B4 (ronda única, 18-11-2026): qué cambió
1. Textos de los pasos 4 y 5: «Teeth start to move», «Teeth move into line» (siguen como texto nuevo para aprobar).
2. Coronas más redondeadas (esquinas de 4 a 6 px), parte alta abombada; los molares ya no llevan cruz: una sola raya. Encía con tono propio (rosa apagado) y **extremos cerrados y redondos**.
3. Modelo más grande: placa y riel más chicos, alto de la figura recortado al contenido (viewBox 640×381), tarjeta con menos margen, brackets y ligas 20 % más grandes. A 375 se distinguen. Pista y nota a 15 px.
4. Manómetro quitado (dibujo y lógica); la etiqueta de la placa pasó al fondo centro.
5. Botón Pause/Play visible (48 px, oculto con movimiento reducido porque ya no hay bucle); pausa con el cursor encima y con el foco de teclado en un paso o en la figura.
6. `role="slider"`: `aria-label` «Braces steps»; el párrafo largo va en `aria-describedby`; el SVG es decorativo (`aria-hidden`).
7. Borde de los botones de paso: 0.55 de opacidad.
8. Página (solo B4): casilla de consentimiento de 44 px de área táctil (36 px + 4 px de margen en cada lado); logo de la cabecera con más brillo y un borde claro (`filter` sobre la imagen, sin cambiarla).
