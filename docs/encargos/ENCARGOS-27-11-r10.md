# Plan · Ronda 10 · Correcciones de la dueña tras ver la r9 (27-11-2026)

Estado: r9 y r9b hechas (typecheck y build verdes, sin commit). La dueña está molesta: «todo me lo estás entregando muy mal, me estás moviendo cosas, no me estás haciendo caso». Revisado por el Jefe: las rutas de los 12 agentes a la bóveda existen y se leen; su Retroalimentación (23-11) ya decía «no agregar lo que no pidió» y «cumplir completo cada pedido».

**Reglas de esta ronda (además de las de r4/r7/r8/r9):**
1. Cambia SOLO lo que dice tu punto. Todo lo demás de la página queda idéntico: captura de antes y después de la página completa y compáralas; si algo más cambió, lo regresas.
2. Lee tu «03 - Retroalimentación» de la bóveda y cúmplela.
3. Si una frase de la dueña no te queda clara, no inventes: dilo en el reporte y deja esa parte como estaba.
4. Antes de cerrar, abre tus capturas y compáralas contra cada frase de la dueña, una por una (CUMPLE / NO CUMPLE).
EN y ES, 375/768/1440, typecheck + build, capturas `*-27nov-r10.png`, bitácora, sin commit, puerto propio y lo cierras, scripts en subcarpeta propia del scratchpad. Ponytail apagado.

## D2 `ld-disenador-uiux-2` · Destacados y hub de Servicios
Archivos: `components/FeaturedServices.tsx`, bloque de destacados de `home-lines.css`, `pages/Services.tsx`, `styles/{services-lines,services-hub}.css`, contenido del hub.
1. **«Most requested».** «Los más destacados… no me sigue gustando la palabra [el letrero]. No es tan difícil… ve dónde puede ir "los más solicitados"… no me gusta.» Ya falló dos veces (riel de pestañas en r8b; a la derecha del título con línea en r9). → Sin letrero suelto, sin línea, sin píldora: que la idea quede dentro del texto de la sección, p. ej. en el subtítulo bajo «Featured services» («Our patients' most requested treatments» / «Los tratamientos más solicitados por nuestros pacientes»). Elige lo más limpio.
2. **Estrella de destacados.** «La estrella dorada, que sea un poquito más grande y que no sea amarilla, que sea del color azul agua.» → Más grande y en el azul agua del sitio (la menta/aqua de la marca), no dorada. Sigue iluminándose solo el servicio elegido.
3. **Hub de Servicios.** «La sección de servicios no me gusta, haz una nueva sección.» Ya falló dos veces (filas de líneas en r8c, filas de tabla con flecha en r9). → Sección nueva desde cero, con el método de dos bocetos + critique (como Contact de D1, que sacó «10 de 10»). Se conservan las categorías (General, Cosmética, Ortodoncia) y un clic a cada servicio. Sin tarjetas con color de fondo.

## F2 `ld-frontend-2` · Estrellas del fondo
Archivos: `components/Backdrop.tsx`, `styles/site.css` (solo la regla `.dots`).
1. «Te dije que básicamente se quitaran del medio y que dejaran nomás los contornos. Siento que hay muchas estrellas, quítalas… que en todas las vistas no esté [ninguna] en medio del contenido.» Ya falló dos veces (r8 y r9). → Cero estrellas sobre la columna del contenido (el ancho de `.wrap`), en todas las páginas y alturas; solo en los márgenes de los lados. Menos estrellas en total. En celular, donde no hay margen, casi ninguna. Se quedan la forma de estrellita y el destello al azar (r9) y la estrella fugaz si no cruza el contenido. Medir: estrellas dibujadas dentro de la columna = 0.

## D1 `ld-disenador-uiux-1` · Contact (empieza cuando F1 cierre la r9b)
Archivos: `pages/Contact.tsx`, `styles/contact-lines.css`.
1. **Héroe 24/7.** «Emergencias 24/7 no me gustó, quítale la imagen. Y que 24/7 sea tipo el neón que hemos trabajado, como Luminous Dental, pero en rojo. El título y una sola sección. Destacar el 24/7 para que sea más llamativa esa sección, un poquito más de información, centrar lo demás.» → Sin foto. «24/7» en letrero de neón rojo con el mismo lenguaje del neón del logo (reusa `NeonLogo`/sus reglas `.neon`, quieto con movimiento reducido y pausa). Héroe centrado, una sola sección, un poco más de información de emergencias (de los contenidos existentes; nada inventado).
2. **Moneda.** «La moneda me gustó, nomás quita el contorno de la sección de contacto.» → Se queda la moneda; se quita el marco de líneas que rodea esa sección en Contact. Lo demás de Contact queda igual («10 de 10»).

## F1 `ld-desarrollador-web` · «Visit us» del inicio (empieza al cerrar su r9b)
Archivos: bloque de la sección de ubicación del inicio (`components/ContactLocation.tsx` / `LocationMap.tsx` solo si hace falta, y su CSS en `home-lines.css`/`location-map.css`).
1. **Letrero «Welcome to Fabulous Luminous Dental».** «Me completaste el cuadrado, las líneas. Estaba haciendo cosas muy raras.» → Quitar el marco de líneas que encierra la sección en un recuadro (y su animación de dibujarse). El letrero y la moneda quedan.
2. **«La estrella que se ilumina, nomás que sea un poquito más clarita».** → La estrella del letrero un poco más clara/brillante. (Si al verlo no es la del letrero, dilo en el reporte.)

## Al cerrar
Jefe: typecheck + build y revisión en el navegador contra cada frase de la dueña ANTES de avisarle. Luego QA (1 agente) solo de lo tocado.
