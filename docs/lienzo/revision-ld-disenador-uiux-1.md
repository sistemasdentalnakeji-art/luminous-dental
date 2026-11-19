# Revisión independiente · Dirección C «Sol» · por ld-disenador-uiux-1 (revisor)

Fecha: 2026-11-17. Skills usadas: impeccable (critique a mano; no corrí el lanzador), accessibility, frontend-design (carácter). `santa-method` no la cargué: no estaba entre mis skills de arranque, no la sustituí.
Aviso de independencia: la hoja de A y B dice «Quién: Diseñador UI-UX 1» (o sea, yo). A y B solo las miré para el punto 6, sin calificarlas. C la hizo el Diseñador UI-UX 2.
Capturas (scratchpad): `revC-1440.png` (1440, completa hasta ~7600 px; el pie queda cortado) y `rvC-375.png` (375 real, dentro de un marco de 375 px).
Nota de método: Edge sin ventana no baja de ~500 px; mi primera captura «a 375» salió con textos cortados y era falsa. La repetí con un marco de 375 px y ahí no hay cortes. Úsese siempre el marco.

## 1. Veredicto: PASA (con 1 falta de 8 y 2 reservas; reprueba solo con 2 faltas)

## 2. Lista premium §20
| # | Punto | Resultado | Lo que vi |
|---|---|---|---|
| 1 | Tipografía con carácter | PASA | Titular enorme (hasta 168 px con clamp) en Bricolage 800 semicondensada; texto Atkinson Hyperlegible Next. Fuerte y legible. Ojo: ver punto 6 (Bricolage se repite en A). |
| 2 | Pieza firma | PASA con reserva | «La línea de vida»: raya gruesa con 4 paradas (Whole family, Kids, Teens, Adults) que ilumina filas de servicios. Se ve y es propia. Reserva: casi todo se ilumina con casi todas las paradas, así que «demuestra el trabajo» poco; y Cosmetic = Adults es inferencia sin respaldo en `home.ts`. |
| 3 | Movimiento con intención | NO VERIFICADO | Captura fija: no vi la animación. En el código hay un bloque `prefers-reduced-motion` y no hay `transition: all`. Falta verlo en vivo. |
| 4 | Retícula editorial y aire | PASA | Servicios en escalera, frase gigante con 3 chicas escalonadas, citas de 3 tamaños, franja partida. Ninguna sección seguida repite estructura. |
| 5 | Fotografía tratada | PASA con reserva | Doctor con marco esmalte y bloque sol: buen tratamiento. El hero es una caja rayada «POR CONFIRMAR» y es lo primero que se ve. Además `home.ts` dice que la foto del doctor es `null` (POR CONFIRMAR), pero el lienzo muestra una foto real: hay que confirmar permiso. |
| 6 | Paleta con un acento | PASA | Sol, tinta, esmalte y cobalto único. Contrastes de la hoja razonables (sol sobre cobalto 4.75, justo). Amarillo muy saturado: cansa si se alarga. |
| 7 | Referencias vivas | FALLA | La hoja lista 5 sitios (Oura, One Medical, Dee, Dental Rose, Aesop), no «5 del sector + 3 de fuera»; solo 2 o 3 son del sector. Sin 21st `get_inspiration` (lo admite). El manual exige 8 y 21st. |
| 8 | Detalle de acabado | PASA | Foco de 3 px, hover y estados de error con texto («Required»), teléfono tabular, `text-wrap`, un solo set de iconos, radios 36/18 en el formulario. |

## 3. Delatores y antipatrones §8
- Sin mayúsculas espaciadas, sin 01/02/03, sin flechas, sin mono, sin crema+serif+terracota, sin negro+verde ácido, sin tarjetas idénticas, sin degradados decorativos. Bien.
- §8 «diseño»: hero texto izquierda + foto derecha, pero lleva pieza firma debajo: se tolera.
- §8 Google Fonts: solo en el lienzo (línea 12); en producción deben alojarse. Pendiente, no falta.
- §8 delatores, riesgo leve: etiquetas pequeñas encima de titulares («Pick a stage of life», «Why patients choose…», «General Dentist»). No son mayúsculas, así que no cuentan, pero vigilar.
- Texto: lo de `home.ts` va tal cual (lo comparé con lo visible). La hoja admite textos de interfaz añadidos, por aprobar.
- Nota de diseño de reseñas visible en la página (recuadro punteado «Design note…»): quitar antes de producción.

## 4. Prueba del gemelo
Otra clínica de Las Vegas saldría con fondo blanco o azul, foto de sonrisa y 4 tarjetas iguales. C cambió fondo amarillo, escalera de servicios y tipografía pesada. Lo que sí saldría igual: cabecera con teléfono y botón, formulario simple, reseñas con comillas grandes. Riesgo: el amarillo + tinta azul + titular enorme se parece al estilo de Dee for Dentist (la hoja lo admite) y es genérico del «dentista amistoso moderno». La identidad real depende del logo, aún POR CONFIRMAR.

## 5. Problemas concretos
375 px (captura correcta): sin textos cortados ni solapes. Se ve cabecera con «Menu», barra inferior con «Request an appointment» y «Call or text». Botones principales 52 a 60 px. Anotados:
- Enlaces del pie con altura 40 px (< 44): `.foot a`, línea 220.
- El hero a 375 pone la caja de foto vacía antes del texto: el primer vistazo es una caja gris rayada.
- Reseñas pequeñas (Sandra) y «Individual results vary» muy chico: revisar tamaño mínimo.
1440 px:
- Hueco grande entre texto y caja de foto del hero (la hoja dice que es a propósito); la foto vacía domina.
- La línea de vida con 4 paradas queda como una fila de botones sueltos sobre una raya; la pieza firma se lee menos que el titular.
- Teléfono oculto en cabecera por debajo de 1360 px (línea 228): en 1100 a 1359 solo queda el botón de cita. Aceptable por la barra móvil, pero a tablet no hay teléfono visible arriba.
- Contraste: texto pequeño sol sobre cobalto 4.75, apenas pasa; no usar en letra chica.
- Pie: cortado en mi captura; no lo califico.

## 6. ¿Las tres son distintas?
- Letra de títulos: A = Bricolage Grotesque, B = Fraunces (serif), C = Bricolage Grotesque. **A y C usan la misma tipografía de títulos.** Falla de diferenciación.
- Letra de texto: A = Figtree, B = Instrument Sans, C = Atkinson Hyperlegible Next (distintas).
- Tema: A claro, B azul oscuro, C amarillo sol (distintos).
- Retícula y pieza firma: A «la regla», B «el anillo», C «la línea de vida». Parecen distintos de concepto; A y C comparten una pieza lineal pero no idéntica. No califiqué A ni B más allá de esto.
Conclusión: distintas en tema y pieza, no en tipografía de títulos (A = C).

## 7. Las 3 correcciones más importantes, en orden
1. Punto 6 y §20-1: cambiar la tipografía de títulos de C (o de A) para que no repitan Bricolage Grotesque. Como C está más comprometida con su ancho 80 y su peso 800, lo más barato es cambiar A; si no, buscar otra grotesca o display para C.
2. Punto 7 de §20: completar las referencias a 5 del sector + 3 de fuera abiertas, con qué se tomó de cada una (y 21st si existe en la sesión del jefe), o declarar el punto como falta abierta ante el dueño.
3. Puntos 2 y 5 de §20 con la hoja: (a) no marcar Cosmetic = Adults sin respaldo y revisar que la línea de vida realmente separe algo; (b) sustituir o reducir la caja vacía del hero, y confirmar permiso de la foto del doctor porque `home.ts` dice `null`. Extra menor: enlaces del pie a 44 px, quitar la nota de diseño de reseñas.

## No verificado
Movimiento en vivo (línea de vida, hover, foco por teclado); pie completo a 1440; contrastes (usé los de la hoja, no los recalculé); fotos reales (no abrí los archivos); si Edge cambia fuentes por falta de red (cargaron).

---

## Ronda 2 (2026-11-17) · solo C, tras `CORRECCIONES-1.md`

Capturas nuevas (scratchpad): `r2C-1440.png`, `r2C-1440-top.png`, `r2C-375.png`, `r2C-375-top.png` (375 con marco de 375 px). Las miré de arriba abajo.

### Veredicto: PASA

Lo que se corrigió y lo comprobé:
- Hero: ya no hay caja vacía. Foto real del Dr. Hahn con marco esmalte y bloque cobalto; el hueco grande desapareció a 1440.
- 375: «Request an appointment» y «Call or text» están en la primera pantalla, y además hay barra fija abajo. Sin textos cortados ni solapes.
- Línea de vida: paradas «Whole family, Children, Teens, Adults». Ya no existe «Cosmetic = Adults» ni «Kids» (busqué en el código: Cosmetic solo aparece en el título del servicio y en el menú del formulario). La regla de qué se ilumina cada parada sale de `home.ts` y la hoja la tabula.
- Pie: enlaces con `min-height: 44px` (línea 223); ya no hay «Pages» ni «Follow us» visibles. Sin nota de diseño en reseñas. Sin `{{ }}` en el HTML.
- Formulario: un solo mensaje de estado visible (el de «not connected yet», texto de `home.ts`).
- Punto 7 §20: la hoja cita las 8 de `docs/referencias.md` (5 del sector + 3 de fuera) con qué se tomó y qué no, y anota 21st como herramienta faltante. Pasa, como indicó el jefe.
- Tipografía: C se queda con Bricolage; el cambio le toca a A (ya no verificado aquí).

Lista premium §20 en esta ronda: 1, 2, 4, 6, 7 y 8 pasan; 5 pasa con reserva (una sola foto real, repetida en el hero y en el doctor); 3 sigue NO VERIFICADO en vivo (solo capturas fijas). Cero faltas.

### Qué sigue mal o pendiente (no bloquea)
1. La misma foto del doctor aparece dos veces seguidas (hero y sección «Meet Dr. Christian Hahn»); a 1440 se nota. Cuando haya otra foto real del consultorio, usarla en una de las dos. Además `home.ts` sigue con `src: null`: permiso de la foto POR CONFIRMAR.
2. La foto es de baja resolución y de fondo gris; con el marco queda bien, pero a tamaño de hero se ve algo suave. Pedir original grande.
3. Movimiento (línea de vida que se dibuja, hover, foco con teclado) no lo vi en vivo.
4. Contraste sol sobre cobalto 4.75: usarlo solo en texto grande (así lo declara la hoja).
5. Barra fija de 375 px: tapa un poco el contenido al bajar; confirmar que el pie tiene espacio extra para que no tape el aviso legal (en mi captura completa se ve libre, pero no lo probé con scroll real).
6. Google Fonts solo en el lienzo; en producción deben alojarse.
