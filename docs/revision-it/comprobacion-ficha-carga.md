# Comprobación independiente · ficha del mapa y carga (19-11-2026)
QA 1 (ld-qa-web). Sin cambios de código ni git. Herramienta: Playwright 1.65 (de la caché de npx, nada instalado) con Edge sin ventana, 1440×900 y 375×800.
**Aviso de entorno:** el servidor del 5181 estaba ROTO en ese momento (pantalla en blanco: servía `src/app/App.tsx` vacío, error «does not provide an export named 'default'», memoria vieja de Vite; el archivo en disco sí está bien). Para medir levanté mi propio servidor de desarrollo con el mismo código en el puerto 5191 y lo cerré al terminar. Al 5181 conviene reiniciarlo.

## 0. FALLO DEL CIERRE DE LA MONEDA (prioridad, dato de la dueña) — CONFIRMADO
Medido cuadro a cuadro (lectura de estilos en cada fotograma + capturas), en /contact y en inicio, a 1440 y 375, con la X y con Escape: es **idéntico en los 8 casos**.

Qué se ve (línea de tiempo del cierre, t = 0 al pulsar):
- 0 – 0.95 s: la ventana del mapa se encoge hacia un círculo (bien).
- **~0.65 s: la moneda empieza a aparecer (fundido 0.6 s + 0.35 s) mientras la ventana todavía se está encogiendo y la ventana sigue visible detrás.**
- **La moneda ya viene girando desde t = 0** (el giro automático se reanuda en cuanto se cierra, desde 0°; con el cursor encima gira a 75°/s en vez de 30°/s). Cuando aparece lleva ya ~30–45° (1440) o ~44° (375, con cursor encima) y cuando la ventana desaparece (~0.98 s) lleva 41–50° (1440) y ~65° (375). Con ese ángulo la moneda se ve **de canto/ladeada y angosta** (a 80–90° es una rebanada delgada de ~30 px dentro del círculo oscuro de 260 px; ver captura `seek-375-750.png`).
- **A ~0.98 s la ventana (círculo de 260 px) se apaga de golpe** (`opacity 0s 0.95s`) y queda solo la moneda ladeada y más angosta: **salto de tamaño/forma y de aspecto** (se ve «un disco oscuro ancho» → «moneda angosta de canto»). Además se ve el canto (grosor) justo en el cruce.
- La apertura no tiene ese problema porque la moneda primero gira de frente (0.5 s) y recién después crece la ventana; el cierre no hace lo inverso: **no gira de frente antes de aparecer**.

Causa (sin tocar código):
1. `src/components/LocationMap.tsx`, efecto del `requestAnimationFrame` (`tick`): con `expandedRef.current` es true deja `angle = 0` y no escribe `--loc-spin`; en cuanto `expanded` pasa a false vuelve a sumar `speed*dt` desde 0 y escribe `--loc-spin` cada cuadro, así la moneda ya gira durante el fundido de entrada.
2. `src/styles/location-map.css` `.loc__coin` (cerrada): `transition: opacity 0.35s var(--ease) 0.6s` aparece a 0.6 s, antes de que la ventana termine de encogerse (0.95 s), y `.loc__card` baja a `opacity:0` de golpe a 0.95 s; el cierre no tiene transición de `--loc-spin` (la regla de `--loc-spin 0.5s` está solo en `[data-expanded]`).
Arreglo sugerido (no aplicado): mantener la moneda quieta de frente (`--loc-spin: 0`) hasta que termine la ventana (~0.95 s) y luego reanudar el giro con arranque suave; y que el fundido de la moneda coincida con el fin del encogido (cruce con la ventana ya del mismo tamaño que la moneda).
Capturas: `scratchpad/shots/seek-375-750.png` (moneda de canto sobre la ventana), `seek-375-950.png` (moneda ladeada ya sola); `seek-1440-*.png`; series `1440*/375*-x|esc-NN.png`; registros `*.json`. Ruta: `C:\Users\DENTAL~1\AppData\Local\Temp\claude\cdce12c4c776118d\98500c9e-c214-44f7-a603-65ac9cda5605\scratchpad\shots\`.

## 1. Ficha del mapa (inicio y /contact, 1440 y 375)
| Punto | Resultado |
|---|---|
| Círculo liso, 8 bloques curvos iguales dentro del canto, nada cortado | PASA (8 bloques por cara; captura cerrada y abierta sin cortes) |
| Centro: solo la sonrisa del logo con su estrella (+ texto en arco «LUMINOUS DENTAL» / «1212 S MARYLAND PKWY») | PASA (2 trazos: swoosh y estrella) |
| Gira | PASA (~30°/s medido en las 4 combinaciones) |
| Al abrir: gira de frente sin canto y crece al mapa, ~1.5 s | PASA (giro 0.5 s a 0°, ventana crece 0.95 s: 1.45 s; medido 1.6 s con latencia) |
| Al cerrar: lo inverso | **NO PASA** (ver punto 0) |
| Escape cierra | PASA (cierra y el foco vuelve al botón; con el foco del teclado se ve el aro de foco, esperado) |
| Quieta con la pausa del pie | PASA (`data-motion-paused`: el giro no cambia) |
| Quieta con reducir movimiento | PASA (no escribe `--loc-spin`; la moneda no gira) |
| «Get directions» y «© OpenStreetMap contributors» | PASA (ambos presentes en las 4 combinaciones) |

## 2. Carga
| Punto | Resultado |
|---|---|
| Abren directo por URL: inicio, About, Services, 11 /services/*, Insurance, Contact, Blog, 2 temas, 14 artículos, 404 | PASA (todas con su título y h1; 404 «Page not found») |
| Navegando con clics (los 31 enlaces internos) | PASA |
| Ancla /services#cosmetic | PASA (baja a 1637 px; el bloque queda a 24 px del borde) |
| Letras Newsreader (normal y cursiva) y Figtree sin pedir nada a Google | PASA (3 cargadas; 0 peticiones a sitios externos) |
| 0 errores de consola | PASA (0 en el recorrido completo) |
| 0 enlaces rotos | PASA (31 internos únicos, todos abren; 0 respuestas HTTP ≥ 400). Externos (tel, mailto, Instagram, Facebook, SAHARA, Google Maps) solo presentes: NO verificados en línea |
| Observación | 2 veces (1.ª carga de un navegador nuevo, leyendo el texto justo tras la carga) /blog/dental-implants-what-they-are mostró un cascarón con el texto del inicio; NO se repitió en 12 cargas en frío posteriores ni con el chunk retrasado 1.5 s (main vacío, sin flash). No explicado: NO verificado, probablemente efecto del servidor de desarrollo recién iniciado |

## 3. Lorem ipsum y pausas
| Punto | Resultado |
|---|---|
| Sin «Lorem ipsum» | PASA (buscado en todas las páginas anteriores) |
| Pausas | PASA («Pause decorative animations» pone `data-motion-paused`, las tiras quedan `paused`, reanuda al volver; hay 7 botones de pausa con nombre propio) |

## No verificado
Producción (`vite preview`/build); celular real; lector de pantalla; contraste; Safari/Firefox; enlaces externos; las capturas a 1440 salieron con pocos cuadros (la captura es lenta), por eso el cierre se midió por lectura de estilos cuadro a cuadro.

## Recomprobación del cierre (19-11-2026, tras el arreglo del programador)
Servidor: `http://localhost:5181` (ya sirve bien; no abrí otro). Mismo método: lectura de estilos en cada fotograma + capturas, inicio y /contact, 1440 y 375, con X y con Escape (8 casos).
| Revisión | Resultado |
|---|---|
| Moneda de frente y quieta mientras se ve junto a la ventana | PASA: giro máximo 2.7–5.8° (≈0) y ancho de la cara 260–262 px en los 8 casos, sin canto |
| Sin saltos de tamaño/forma | PASA: la moneda (260 px) aparece a ~0.57–0.72 s con la ventana ya casi del mismo tamaño |
| Sin cortes de golpe | PASA: la ventana se desvanece en 0.3 s (de ~0.95 s a ~1.25 s) detrás de la moneda; antes se apagaba de golpe |
| El giro reanuda al final | PASA con una nota: reanuda a ~1.2 s (a ~16–21° a los 0.3 s siguientes), mientras la ventana termina de desvanecerse; con ≤ 6° en ese instante no se nota |
| Mismo resultado con X y con Escape, inicio y /contact, 1440 y 375 | PASA |
Veredicto del cierre: **PASA** (el fallo del punto 0 queda corregido). No verificado: ojo humano en pantalla real y celular real; las capturas `R-*` están en la carpeta `scratchpad/shots/` (p. ej. `R-375contact-x-08.png`, moneda de frente y limpia).
