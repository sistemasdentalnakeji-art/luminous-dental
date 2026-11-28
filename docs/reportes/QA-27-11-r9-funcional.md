# QA funcional y visual conjunta · rondas 7, 8 (8b, 8c) y 9 · 27-11-2026 · Luminous Dental (QA 1 · ld-qa-web)

Build de `apps/web` ya hecho por el Jefe (dist de las 12:50, sin archivos de `src/` ni `public/` más nuevos), servido con `vite preview` en el puerto 5301 (cerrado al terminar). Playwright con msedge, contextos limpios. Sin tocar código ni contenido. Donde una ronda nueva corrige a una vieja, se juzgó contra la nueva.
Alcance: inicio, Servicios (hub + 3 servicios medidos a fondo y los 11 en 1440), Beneficios (hub, Seguros, Financiamiento hub + Sunbit, Convenios), About, Contact, Blog (portada + 2 artículos), FAQ, Términos, Privacidad, encabezado y pie. 375 / 768 / 1440, EN y ES.

## Veredicto: LISTO CON 1 NO CUMPLE MENOR (hub de Servicios) y 1 hallazgo extra menor (teléfono del pie en ES)

## 1. Pruebas generales (todas las páginas)

| Prueba | Resultado | Evidencia |
|---|---|---|
| 0 desborde horizontal | CUMPLE | 108 cargas (18 páginas × 3 anchos × 2 idiomas): `scrollWidth` = ancho de ventana en todas |
| 0 errores de consola (recarga limpia) | CUMPLE | 108 cargas, contexto nuevo cada una: 0 `console.error/warning`, 0 `pageerror` |
| 0 respuestas 4xx/5xx y 0 peticiones fallidas | CUMPLE | 108 cargas, 0 |
| Imágenes sin romper | CUMPLE | 1,284 `<img>` revisadas tras scroll completo: 0 con `naturalWidth = 0` (se descartaron las de contenedores ocultos), 0 pendientes |
| Un solo h1 por página | CUMPLE | 108 de 108 |
| FAQ, Términos y Privacidad cargan | CUMPLE | EN y ES, 3 anchos, con h1 y sin errores |
| Enlaces de menú y pie | CUMPLE | EN y ES: 28 enlaces del encabezado (submenús abiertos) y 21 del pie; 24 rutas internas abiertas una por una, todas con h1 real, ninguna 404, 0 errores. Externos (Adit, instagram, facebook, mapas, tel, mailto) con `rel="noopener noreferrer"` donde abren pestaña. Una ruta inexistente da «Page not found» |
| Pausa de animaciones (pie) | CUMPLE | Clic y Espacio en el texto «Pause animations / Pausar animaciones»: `html[data-motion-paused]` se pone, animaciones en ejecución 53 a 0, canvas del fondo quieto, el texto cambia a «Resume / Reanudar» y `aria-pressed` = true; las reseñas dejan de correr (19 px por 1.2 s a 0) y vuelven al reanudar; la moneda flotante queda sincronizada |
| Pausa de reseñas | CUMPLE | Botón de la ventana: clic y Enter detienen y reanudan las filas (24 a 0 px y de vuelta), la etiqueta cambia pausa/reproducir, foco visible 3 px menta con Tab |
| Moneda del mapa abre en inicio y Contact | CUMPLE | 12 de 12 combinaciones (2 páginas × 3 anchos × 2 idiomas): `aria-expanded` false a true, ficha opacity 1 con el pin |
| Movimiento reducido | CUMPLE | 0 animaciones infinitas en ejecución; canvas del fondo quieto tras el primer cuadro |

## 2. Puntos de la dueña (vigentes, la ronda nueva manda)

| # | Ronda · punto | Frase de la dueña | Resultado | Evidencia |
|---|---|---|---|---|
| 1 | r8b-1 + r9 D1-1 · «Reserva tu visita» del inicio | «no es un formulario… no ocupo datos, quita esa cosa» · «no me gustó… muy sencillo y muy vacío… que tampoco tenga las líneas divisoras» | CUMPLE | 0 campos (`input/textarea/select/form`), texto solo «Elige tu servicio y un horario…», botón a Adit (`booking.adit.com`), sin horarios/seguros/financiamiento, 0 `hr`/bordes/`ln-frame`; estrella grande + constelación. Captura `qa-home-reserva-en-1440-27nov-r9.png` |
| 2 | r8-2, r8b-2, r7-2 · Seguros del inicio | «más grandes… se pierden… borde blanco en todos… logo original, PNG sin fondo, sin el nombre» | CUMPLE | 24 de 24 PNG, 24 con contorno `drop-shadow` claro, fondo de logo y de celda transparente, 0 nombres bajo el logo; ancho visible 134 a 170 px (antes 46 a 68 por unidad). Observación: «Dental Health Services» (170×19) sigue chico por su dibujo |
| 3 | r8-3 · Convenios del inicio | «que nomás esté el título ahí afuera; el texto júntalo en "¿vienes de fuera de la ciudad?"» | CUMPLE | Fuera solo `h2` «Agreements for our patients / Convenios para nuestros pacientes»; «Beyond insurance… / Además de los seguros…» dentro de `.agr-feature__body` bajo «Coming from out of town? / ¿Vienes de fuera de la ciudad?» |
| 4 | r8-4 · SAHARA del inicio | «Nomás deja el puro logo» | CUMPLE | Sin `.agr-card__badge` en el inicio (la página de Convenios conserva «Partner benefit», como pide la r8) |
| 5 | r9 F1-1 · SAHARA | «Quítale un poco el contorno de blanco… más énfasis al dorado» | CUMPLE | Contorno blanco 0.5 px al 50 %, resplandor dorado 8 px, brillo ×1.14 y saturación ×1.4. Captura `qa-home-sahara-en-1440-27nov-r9.png` |
| 6 | r9 D2-1 (sustituye r7-4 y r8b-3) · Destacados | «se queda la estrellita en dorado… nomás se ilumina el servicio… el letrero de más requerido impleméntalo en otra parte» | CUMPLE | 5 estrellas, 1 sola `aria-current`; al elegir otra pestaña la dorada se mueve (capturas `qa-destacados-*` y `-tab3-`); sin `.sc__badge` en el riel; «Most requested / Los más solicitados» en el encabezado de la sección, a la derecha del título |
| 7 | r9 D2-2 (+ r8b-4, r8c) · Pausa de reseñas | «abajo… al lado derecho… dentro de la terminal» | CUMPLE | `.mac-window__pause` dentro de la ventana: 13 px del borde derecho y 13 px del inferior, fuera de la barra, 44×44. Logo de la ventana = `NeonLogo` (se ilumina). Tarjetas de Google no tocadas (no se pudo diferenciar contra una versión previa; se vieron intactas). Captura `qa-home-resenas-en-1440-27nov-r9.png` |
| 8 | r9 D2-3 · Estrellas del centro | «en la parte del medio no estuvieran muchas estrellas… sobre todo servicios» | CUMPLE | Captura con contenido oculto, % de píxeles claros: centro 0 % en servicios 1440 (EN/ES), inicio y About; margen y franja superior con estrellas. A 375 el centro de Servicios tiene 0.05 % (una sola estrellita visible). Capturas `qa-estrellas-*` |
| 9 | r8c-6 · Forma de estrellitas | «que tengan forma de estrellitas, porque tienen forma circular» | CUMPLE | Vistas en las capturas de 1440 y 375: cuatro puntas, ninguna circular |
| 10 | r9 D2-4 · Brillo | «una que otra random, que esté en movimiento» | CUMPLE | Serie de 10 lecturas del canvas: cambia en las 10 (píxeles casi blancos de 0 a 163/282); con pausa 1 sola lectura distinta en 5; con movimiento reducido quieto |
| 11 | r8-1 · Encabezado | «quítame las redes y el teléfono; deja el cambio de idioma pegado al botón de solicitar appointment» | CUMPLE | 0 `tel:` y 0 redes en el encabezado y en el panel; idioma a 8 px del botón a 1440 (EN y ES); en 375 y 768 el panel pone el botón y el idioma justo debajo (y 477 y 541) |
| 12 | r8c-1 · Pie: botón, 24/7, línea, nota, franja | «quítalo… deja el puro telefonito emergencia 24/7… la línea divisora, hazla… "individual results may vary" a legal… abajo ©, FAQ y pausa como texto» (FAQ la mueve la r9) | CUMPLE | Sin botón de cita; `Emergencies 24/7` con ícono y sin número visible (el número va en el `aria-label`); línea 1 px blanca al 28 % sobre la franja; nota en la columna Legal (ES: «Los resultados varían…»); franja = © + botón de texto sin fondo ni borde |
| 13 | r8-3 · Logo del pie | «va a cambiar por el del que se ilumina» | CUMPLE | `StarLogo`: 2 capas, `sl-ignite` terminada y `sl-twinkle` corriendo; sin `.neon`. Captura `qa-pie-logo-en-1440-27nov-r9.png`. La referencia de la dueña no existe en la PC (lo dice F2) |
| 14 | r9 F2-1 y F2-2 · Pie | «El FAQ… lo movieras a legal» · «Quítale abajo… el cambiar de idioma» | CUMPLE | FAQ es el 3.er enlace de Legal; la franja final tiene 0 enlaces; 0 `.lang-switch` en el pie (EN y ES, 375 y 1440) |
| 15 | r8-5 + r8c-2 · Hub de Servicios (estructura) | «quitar "¿qué necesitas hoy?" y "explorar por categoría"… me quitaste la categoría… cuadrícula… dividido por igual» | CUMPLE | 0 textos de «qué necesitas hoy» ni «explorar por categoría», 0 `aria-pressed`; 3 grupos General 5 · Cosmética 5 · Ortodoncia 1 con anclas; 1440: 314/471 de ancho (3+2, 3+2, 1 a todo lo ancho); 768: 2 columnas, el impar a lo ancho; 375: 1 columna |
| 16 | **r9 F2-3 · Hub de Servicios (presentación)** | «Encontrar una forma mejor de acomodarlos, porque siento que la línea se ve raro, el logo, también el botón… se ve un poquito raro todavía» | **NO CUMPLE (menor)** | Sin íconos (1 sola `svg` por fila, la flecha) y líneas continuas: bien. Pero cuando el nombre se parte en 2 líneas la flecha queda en la 1.ª línea a 93 a 264 px de la última palabra (medido: 1440 EN 4 filas, 1440 ES 5 filas, 375 y 768 ES 2 filas); con nombre de 1 línea queda a 12 px. Choca con lo que dice la bitácora de F2 («flecha menta pegada») y es el «botón raro» que ella señaló. Capturas `qa-services-en-1440-27nov-r9.png`, `qa-services-es-s2-768-27nov-r9.png` |
| 17 | r8c-3 · Foto en cada servicio | «imágenes para la sección hero, al menos» | CUMPLE | Los 11 (EN y ES, 1440) con foto en el hero, cargada y con `alt`; 375/768 comprobados en 3 servicios (`revision`, `extracciones`, `resinas`) |
| 18 | r8-4 + r9 F1-2 · Hub de Beneficios | «quítalo… sección héroe de un solo contenido» · «el contenido me gusta, pero visualmente se ve feo… mejor composición, sin tarjetas con color» | CUMPLE | `bh--solo`, héroe sin el panel de tres puntos; Seguros a lo ancho en rejilla de líneas finas (15 logos), debajo Financiamiento 2×2 y Convenios con SAHARA al mismo alto; 0 cajas con fondo. Capturas `qa-benefits-en-s1..s3-1440`, `qa-benefits-es-s2-375` |
| 19 | r9 F1-3 · Logos en Beneficios | «un poquito más grandes» | CUMPLE | Hub: aseguradoras 118×30 (1440) y financieras 133×37 (antes unos 95 px de ancho en la captura r8b); Seguros 157 a 176 px; hub de Financiamiento 182×51 y Sunbit 220×62; todos PNG/SVG sin fondo, con contorno |
| 20 | r8b-2 + r8c-4 · Seguros y Financiamiento | «el mismo tratamiento en todas las aseguranzas… financiamiento sin fondo blanco, con contorno» | CUMPLE | 24 logos en Seguros y 4 en Financiamiento/Sunbit con `drop-shadow`, fondos transparentes, sin nombre debajo |
| 21 | r9 F1-4 · Convenios | «nomás 2 secciones… nomás SAHARA centrado… quitar "listo para el siguiente paso"» | CUMPLE | `BenefitsHeader solo` + 1 `section`; `agr-feature--center`, centro del logo a 0 px del centro de la ventana en 375/768/1440 EN y ES; sin «Ready for the next step / Listo para el siguiente paso». Capturas `qa-agreements-en-1440`, `qa-agreements-es-s2-1440` |
| 22 | r7 · Sin tarjetas con color de fondo (inicio, Servicios, Beneficios, Contact, About) | «sin subtarjetas con color» | CUMPLE | Detector de cajas ≥160×70 con fondo o degradado: 0 en esas páginas (solo marcos de línea y el resplandor de SAHARA). Excepción fuera de alcance: Blog y artículos («More», la dueña dijo «todavía no») |
| 23 | r8c-5 + r9 D1-2 · Contact | «10 de 10» · «sí vamos a poner la moneda donde está el mapa» | CUMPLE | h1 «24/7 dental emergencies / Emergencias dentales 24/7» como héroe; una sola sección (cita con botón a Adit + dirección, teléfono, correo, horario, redes); 0 campos; sin «Visit us»; moneda presente |
| 24 | r9 D1-3 · Foto 24/7 | «pon una mejor, referente a emergencias, pero del ramo dental» | CUMPLE (con reserva) | `emergency-*.webp` carga (604 a 706 px según ancho), mano con guante señalando una imagen dental en pantalla; es dental y sin rostros, pero es un estudio de imagen más que una urgencia: la dueña debe aprobarla |
| 25 | r8-D1 · Fotos del blog | «que se llenen las imágenes y no me las dejes vacías» | CUMPLE | Portada: 11 tarjetas con foto distinta y 11 logos decorativos con `alt=""`; los 2 artículos con foto de cabecera cargada y `alt` descriptivo EN y ES |
| 26 | r7 · About | «about, visto bueno» (estilo de líneas) | CUMPLE | Clase `.lines`, 0 cajas con fondo, 1 foto (dr-hahn) cargada |

## 3. Hallazgos que no son frase de la dueña

| Gravedad | Hallazgo | Evidencia | Archivo probable |
|---|---|---|---|
| Baja | Teléfono del pie en ES se parte en dos líneas por el guion: «(702) 805-» y «8688» | Captura `qa-agreements-es-s2-1440-27nov-r9.png`; en EN cabe en una línea; ES 768 también parte (3 líneas medidas) | `styles/footer-city.css` (`.ftr-contact address a`) |
| Observación | Insurance y Financiamiento conservan el panel «Coverage, explained / Ways to pay / Partner benefits» que la dueña rechazó en el hub y en Convenios | `qa-financing-en-s1-1440-27nov-r9.png` | `components/BenefitsHeader.tsx` (decisión del Jefe) |
| Observación | Una línea diagonal corta junto al título «Featured services» une el título con el letrero; puede leerse como rayón | `qa-home-destacados-en-1440-27nov-r9.png` | `styles/home-lines.css` (bloque de destacados) |
| Observación | Logo del pie hecho con `logo.webp` + capa de estrella; la referencia de la dueña (`Desktop\Luminous\luminous-web`) no está en la PC, así que no se pudo comparar | bitácora F2 r8 | `components/StarLogo.tsx` |

## 4. No verificado

- Otros navegadores (solo Edge) y lector de pantalla; accesibilidad y contraste son del otro QA.
- Que las tarjetas de reseñas de Google estén intactas contra una versión anterior: solo se vieron, no se compararon.
- El destello de las estrellas en movimiento real a ojo (se midió por píxeles del canvas), y FPS.
- Capturas de página completa: en el inicio salen con secciones en blanco por el revelado al scroll, por eso las capturas son de ventana.
- Servicios 375/768: solo 3 de 11 en hero; los 11 solo a 1440.
- Envío de citas: no se probó (la regla es no crear contactos); solo que el botón de Adit apunte a `booking.adit.com`.

## 5. Capturas

267 archivos `docs/capturas/qa-*-27nov-r9.png`: `qa-<página>-<idioma>-<ancho>-...` (arriba de cada una de las 108 combinaciones), `qa-home-{reserva,seguros,sahara,destacados,resenas,mapa}-*`, `qa-destacados-*`, `qa-resenas-{pausa,foco}-*`, `qa-header-*`, `qa-header-panel-*`, `qa-footer-*`, `qa-pie-logo-*`, `qa-estrellas-*`, `qa-*-moneda-abierta-*`, y series `qa-<página>-s<N>-*` de Beneficios, Seguros, Financiamiento, Convenios, About, Contact, Blog, hub y servicio.
