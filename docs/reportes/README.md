# Reportes de la página web

- Plantilla oficial: `plantilla-reporte-web.html` (es el RW-2026-02 como molde; imágenes en `img/` junto al archivo). Formato vigente desde el 21-11-2026:
  - Portada azul noche con logo y sello CONFIDENCIAL. Título en dos líneas: arriba «Proyecto página web», abajo, grande, «Luminous Dental». Sin subtítulo ni antetítulos. Datos: reporte RW-AAAA-NN, empresa, departamento, dirigido a, elaboró (**Jadro Montes**), fecha. `<title>` del documento: «Proyecto página web · Luminous Dental».
  - Hojas en papel blanco suave con **una sola** marca de agua CONFIDENCIAL grande y tenue, en diagonal al centro de cada hoja. El encabezado de cada hoja NO repite «CONFIDENCIAL».
  - Hoja 1 · Resumen: lista corta de 5 a 7 puntos. Sin cifras, sin línea de avance, sin tarjetas.
  - Hoja 2 · Qué cambió: solo pares ANTES / AHORA, cada uno con título corto y una línea (error corregido o mejora integrada). Sin recuadros largos ni conteos.
  - Hoja 3 · Pendientes: aquí sí va el conteo por responsable (Páginas web, Gerencia y Dueño, Clínica, Sistemas · Jadro), siguiente paso y firmas.
  - Sin historial por días ni conteos de páginas.
- Numeración: RW-AAAA-NN.
- RW-2026-01 · 20-11-2026 · https://claude.ai/artifact/4xNsYiRbVy7RuxPcfQb4XL (formato anterior)
- RW-2026-02 · 21-11-2026 · por publicar
- RW-2026-03 · 23-11-2026 · `RW-2026-03/reporte-luminous.html` · PDF en Descargas

## Formato LD-RW (desde 25-11-2026, orden de la dueña)
- Nombre del PDF: `LD-RW-<año>-<nn> Reporte Luminous Dental (para WhatsApp).pdf`, en Descargas. Código en portada y encabezados: `LD-RW-<año>-<nn>`.
- Plantilla: `docs/reportes/LD-RW-2026-04/reporte.html` (hojas carta fijas; portada azul noche con aviso de confidencialidad; encabezado con código, empresa, departamento, fecha y CONFIDENCIAL; secciones con barra azul; pie «Dirigido a Dirección | Elaboró … | HOJA x DE n»).
- ~~Siempre lleva el apartado «Origen de la orden»~~ (quitado el 27-11-2026 por orden de Jadro).
- LD-RW-2026-05 · 26-11-2026 · `LD-RW-2026-05/reporte.html` · PDF en Descargas · resalta el sitio en español y las páginas nuevas.
- LD-RW-2026-06 · 27-11-2026 · `LD-RW-2026-06/reporte.html` · PDF en Descargas (24 hojas, ~11 MB) · reporte por imágenes. **Es la plantilla vigente (formato v2).**

## Formato v2 (desde 27-11-2026, orden de Jadro) · plantilla `LD-RW-2026-06/reporte.html`
- Tipografía del sitio: Newsreader (títulos) y Figtree (texto), en `LD-RW-2026-06/fonts/`.
- **Portada:** azul noche; sello **CONFIDENCIAL en rojo** (`#E0262D`); etiquetas Reporte, Empresa, Departamento, Dirigido a, Elaboró y Fecha en azul cielo, y sus datos en **oro oficial de Dental Nakeji `#E0B65C`**. En el encabezado de cada hoja, «Confidencial» también en rojo.
- Títulos de hoja en una línea, mismo tamaño: palabra en **azul** + línea vertical + título en negro («Contenido | Índice», «Resumen | Lo que cambió el …», «Pendientes | Lo que falta para lanzar»).
- **Hoja 2 · Índice** agrupado por área, con número de hoja.
- **Hoja 3 · Resumen**, sin texto de introducción: 8 cifras en tarjetas azul noche con número en oro; abajo dos tarjetas lado a lado: «Cambios por área» como **lista** (qué cambió · en qué páginas, con columnas **ES** y **EN**, y fila de **total** por idioma y en conjunto; nota aparte para lo que cambia en todas las páginas: encabezado, logo, menú, fondo) y «Pruebas de QA» **por agente** (QA 1 funcional, QA 2 accesibilidad: qué revisó, revisiones, páginas, cargas, hallazgos corregidos) con resultado general. Sin la línea del equipo. Sin «Calidad medida», sin «Lo más importante», sin «Origen de la orden».
- **Una hoja por cambio:** izquierda número y área, título, estado, «Qué se cambió» (tarjeta azul clara) y «Por qué» (tarjeta oro clara) en **1 o 2 frases cortas y fáciles**, letra más grande para que no se pierdan junto a las fotos; «Datos» de reporte (Páginas, Idiomas, Probado en, Revisión) y la fuente de la foto. Sin «Verificado». Derecha las fotos, **sin título en cada foto**: encabezado «En escritorio» (barra oro, texto negro y línea divisora), antes arriba y ahora abajo, con la etiqueta **ANTES (roja) / AHORA (verde) dentro de la foto, abajo a la derecha**; si sobra espacio, encabezado «En celular» con el mismo estilo y la fila antes | ahora.
- **Sin fotos repetidas:** cada captura sale en una sola hoja. Cada hoja muestra su cambio «En escritorio» y «En celular»; no hay hoja aparte de celular. Recortes exactos (`cut(nombre, y0, y1, x0, x1)` en `armar-reporte.cjs`) para enseñar justo la parte que cambió (p. ej. el logo y la zona de redes en Encabezado, en vez de repetir el héroe). Para elegir el recorte: `hoja-de-contacto-celular.cjs` pone las capturas lado a lado con regla de alturas.
- Orden de hojas (el del primer diseño): Inicio (héroe, encabezado) → Menú y servicios (menú, página de Servicios, destacados) → Contacto y beneficios → Fotos de servicios → Blog → Pendientes.
- **Última hoja · Pendientes:** solo los de Jadro, por tema y prioridad, en tarjetas **azul noche con oro** (no blancas) y el número de tareas en **azul agua** (`#34bfcc`). Sin «Siguiente paso». Firmas: «Elaboró · Ing. Jadro Montes, Encargado del área tecnológica» y «Recibió · Dirección», con el espacio de firma en blanco.
- Cifras: solo las que salen de la bitácora, los informes de QA, `git status` y los archivos (nada inventado).
- Herramientas en `herramientas/`: `capturar-secciones.cjs` (capturas antes/ahora), `a-jpg.cjs`, `armar-reporte.cjs` + `reporte.css` (arma el HTML desde los datos de cada cambio) y `revisar-y-pdf.cjs` (mide si algo se sale de la hoja, guarda vista de cada hoja y el PDF). Rutas de la carpeta temporal: cambiarlas al usarlas.

## Cómo se hacen las capturas del reporte (desde 27-11-2026)
Problema anterior: capturas a veces bien y a veces mal (recortadas, con el menú fijo encima, sin el cambio a la vista). Método vigente, script `herramientas/capturar-secciones.cjs`:
1. «Antes» real: `git worktree add --detach <carpeta> HEAD` (último guardado) con su propio Vite (puerto 5901); «ahora» es el código actual (puerto 5902). Enlazar `node_modules` con junction (quitar los junction antes de borrar el worktree).
2. Capturar la SECCIÓN completa por selector (`.hx`, `.service-hero`, `main`, `.art-hero`…) con 16 px de margen, no un recorte fijo; aunque quede con menos zoom.
3. Menú fijo oculto (`visibility:hidden`) salvo en la captura de «arriba»; movimiento reducido; imágenes en `loading=eager` con tope de 4 s (no usar `networkidle`: se cuelga).
4. PC 1440 y celular 375 (escala 2). Convertir a JPG (calidad 82) antes de armar el HTML; el PDF de 12 hojas pesa ~8 MB.
5. En el reporte: la imagen completa (sin `object-fit:cover` que recorte los lados); solo se recorta arriba cuando la sección es muy alta. `figure{margin:0}` fuera de `.pair`.
6. Pendientes del reporte: solo los de Jadro (sistemas), separados por tema y ordenados por prioridad.
