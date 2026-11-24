# QA 1 · Pruebas de los cambios del 23-11 · Luminous Dental

Fecha: 2026-11-23 · Quien prueba: QA 1 (`ld-qa-web`) · Navegador: Playwright, Microsoft Edge (msedge) · Servidor: http://localhost:5181 (modo desarrollo de Vite, sin tocarlo) · Modo ponytail encendido.
No se tocó código. No se envió ninguna cita (0 peticiones POST en todas las pruebas del formulario).
Capturas de referencia: `docs/reportes/historial-visual/qa-23nov-*.png` (37 archivos).

## Veredicto: LISTO CON 1 OBSERVACIÓN MENOR

- 0 fallos bloqueantes ni altos.
- 1 fallo menor de accesibilidad (F1, lista del carrusel; ya existía en el componente, no lo creó el 23-11).
- 4 puntos «no verificado» al final.

## Resumen por punto

| # | Punto | Resultado |
|---|---|---|
| 1 | Header fijo (top 0 tras bajar) en 8 páginas × 8 tamaños | PASA |
| 2 | Pestaña activa iluminada (sigue la página; Services en sus subpáginas; 404 sin pestaña) | PASA |
| 3 | Redes en el header (Instagram y Facebook, `_blank`, `noopener noreferrer`, nombre accesible) | PASA |
| 4 | Logo de neón en el header (enlaza a `/`) | PASA |
| 5 | Menú del celular: abrir con clic, Enter y Espacio; cerrar con clic, Escape y al elegir un enlace; el foco vuelve al botón | PASA |
| 6 | Menú de escritorio «Services»: Enter abre, flecha baja al primer servicio, Escape cierra y devuelve el foco | PASA |
| 7 | Botones blancos con llenado: reposo `circle(0px)`, al pasar el mouse y al enfocar con Tab `circle(150%)`, texto pasa a azul noche (rgb 10,21,41) | PASA |
| 8 | Inicio: 2.ª sección «whole family» (`#services`), título «Dental care for the whole family» | PASA |
| 9 | Estrella: scroll completo enciende los 4 grupos (1→4 a 375, 768, 1440 y 1920); enfocar un enlace con teclado enciende los 4 | PASA |
| 10 | «See all services» en la fila 2 (entre General y Cosmetic a 768, 1440, 1920; al final en 375) | PASA |
| 11 | Enlace del héroe va a `#services`; sin sección del doctor (ni `#doctor`, ni «Meet the doctor») en el inicio | PASA |
| 12 | Seguros: muro colapsado 12 (1440, 1920) / 9 (768) / 8 (375) | PASA |
| 13 | «Show all 24 plans» → 24 fichas, `aria-expanded` true, «Show fewer plans» → vuelve a 12/9/8 | PASA |
| 14 | Búsqueda «cig» → 1 ficha, «1 plan matches “cig”», botón oculto | PASA |
| 15 | Búsqueda «zzz» → 0 fichas, aviso con teléfono `tel:+17028058688` y botón «Show all plans» | PASA |
| 16 | `/insurance-financing`: muro completo y buscador (revisado en barrido de 8 tamaños: sin errores ni desborde) | PASA |
| 17 | Formulario: placeholders Jane, Doe, (702) 555-0123, you@example.com, «Tell us how we can help.»; se quitan al escribir | PASA |
| 18 | Formulario enviado vacío: 7 errores visibles, `aria-invalid` en los 7, foco al primer campo, 0 peticiones enviadas | PASA |
| 19 | Día cerrado (domingo, lunes, jueves festivo 26-nov): campo se vacía, aviso «That day isn’t available», hora en «Choose a day first» y bloqueada | PASA |
| 20 | Selector de hora: sábado 10 horarios, martes 18; Morning / Afternoon; teclado: flecha abre, flechas, Inicio, Fin, Escape (foco vuelve al botón), Enter elige; al pasar a un día sin esa hora se limpia | PASA |
| 21 | Ficha del mapa: abrir con clic, Enter y Espacio; cerrar con Escape (foco vuelve al botón) | PASA |
| 22 | Pie: sin «piquito» a 1600 y 1920 (la ciudad queda a -1 px dentro del pie; captura sin pico) | PASA |
| 23 | Pie: títulos Services, Clinic y Contact en rgb(52,191,204) (azul medicina) | PASA |
| 24 | Pie: ventanas y farolas titilan (13 animaciones `fc-twinkle`/`fc-lamp` en 375, 768, 1280, 1600, 1920) | PASA |
| 25 | Pie: sin franja de luz (`::after` sin animación, sin `fc-sweep`) | PASA |
| 26 | Botón de pausa («Pause decorative animations»): etiqueta cambia a «Play…», 0 animaciones infinitas corriendo, todo visible (4 grupos encendidos, estrella en su sitio, títulos visibles) | PASA |
| 27 | `prefers-reduced-motion: reduce`: 0 animaciones infinitas, nada oculto, 4 grupos encendidos (inicio, seguros, servicios, servicio) | PASA |
| 28 | Teclado completo: 27 paradas de Tab en el inicio, todas con indicador de foco visible, orden lógico, sin trampas | PASA |
| 29 | Zoom 200 % (ventana de 640 px): desborde 0 en las 8 páginas, hamburguesa disponible | PASA |
| 30 | Desborde horizontal 0 (8 páginas × 360, 375, 768, 1024, 1440, 1920 vertical + 812×375 y 1024×768 horizontal = 64 combinaciones) | PASA |
| 31 | Errores de consola 0 (64 combinaciones + todas las interacciones) | PASA |
| 32 | Enlaces rotos 0 (50 enlaces únicos: 44 internos responden 200 y ninguno cae en la página 404; todas las anclas existen) | PASA |
| 33 | Accesibilidad automática axe WCAG 2.2 AA en 8 páginas × 1440 y 375 | PASA con 1 hallazgo (F1) |
| 34 | Un solo `h1` por página, incluida la 404 | PASA |

## Fallos

### F1 · Lista del carrusel mal formada (WCAG 1.3.1) · gravedad MENOR (axe la marca «serious», pero el contenido sigue siendo legible)
- Dónde: `/` a 1440 y a 375, elemento `.carousel__track` (carrusel de reseñas o servicios destacados).
- Causa observada: en `components/Carousel.tsx` cada `<li>` tiene `role="group"`, lo que le quita el rol de elemento de lista dentro del `<ul>`; axe regla `list`.
- Pasos para reproducir: abrir http://localhost:5181/ → esperar a que cargue → correr axe-core (reglas wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa) → aparece `list` con 1 nodo `.carousel__track`.
- Nota: `Carousel.tsx` no está entre los archivos modificados hoy; ya existía. Se reporta, no se arregla.

## Observaciones (no son fallos)
- O1. El enlace del héroe «See the thinking behind a makeover» ahora lleva a la sección de servicios de la familia; el texto del botón habla de «makeover» (cambio de imagen), no de servicios. Decisión de redacción para el Jefe y la dueña.
- O2. En el selector de hora, ArrowDown mueve una fila (3 horarios), no uno. Es lógico en una cuadrícula, pero conviene confirmar que así es en Dental Nakeji.
- O3. Los grupos de la estrella aún sin encender quedan a 0.5 de opacidad: texto blanco sobre noche calculado en unos 4.2:1 (estimado, no medido por píxel). Es transitorio (al enfocar con teclado se encienden los 4) pero queda bajo 4.5:1 mientras se baja.
- O4. En 375 × 812, al llevar el scroll al final de una sola vez (antes de que termine de cargar el resto), la página todavía crecía y el pie no quedó a la vista; con una segunda pasada funciona y el pie se anima. Puede ser un salto de diseño (CLS) por imágenes perezosas; no se midió.

## No verificado
- Facebook (`facebook.com/profile.php?id=61554688456073`) devuelve 400 a una petición automática y `stay.saharalasvegas.com` devuelve 403; probablemente bloqueo a robots, no verificado con navegador real ni con la dueña.
- Seguros: conteo del muro a 360 y a 1024 (solo medido en 375, 768, 1440 y 1920); familia, seguros y formulario en horizontal (solo el barrido general de 812×375 y 1024×768).
- Lector de pantalla (NVDA, VoiceOver): no se probó; axe cubre solo una parte de WCAG.
- Rendimiento (LCP, CLS, INP) y la versión de producción (`npm run build`): no se midieron; el servidor es el modo desarrollo de Vite y la dueña dejó el rendimiento para el paso final.
- La página `/about` con el doctor: solo se comprobó sin errores y sin desborde, no el contenido del doctor.
- Envío real de la cita: no se hizo, por regla.

## Cómo se probó
Guiones propios de Playwright (msedge, canal instalado) en 8 tamaños × 8 páginas, más guiones de interacción en 1440, 375 y 768; axe-core 4.x inyectado; revisión visual de las capturas. Los guiones están en la carpeta temporal de la sesión, no en el proyecto.
