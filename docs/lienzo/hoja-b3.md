# Hoja B3 · «El anillo bajo las estrellas» · ronda 2 (18-11-2026)
Archivos: `lienzo/project/Estilo-B3.dc.html` (1440, `$preview` 1440×8173) y `Estilo-B3-movil.dc.html` (375, `$preview` 375×9034). Parte de B2 (no se tocó B2). Texto de `home.ts`; sin horario, calificación, precios ni promociones.

## Qué cambió por cada punto
1. **Franja de dientes: quitada** (CSS, dibujo y script). La cresta de montañas del hero se queda y se desvanece hacia abajo.
2. **Fondo de la dueña, visible.** Un bloque fijo detrás de todo con cuatro capas, igual que su `Layout.tsx`:
   - degradado CSS de respaldo (el de su `.backdrop`, con tamaños en píxeles para que se vea igual en una captura alta);
   - **malla WebGL** de azules (su `blue-meshy-background.tsx`: mismo shader y paleta) a 0.5 de resolución, máx. 30 fps, opacidad 0.5;
   - **estrellas 2D** que respiran + fugaz ~10 s (su `NightSky.tsx`), máx. 260, 30 fps;
   - **capa fija de estrellas en CSS** (120 puntos irregulares en una imagen SVG de 1100×860, se repite) que se ve aun sin script.
   Grano encima. Además, resplandores azules sueltos en la mitad baja de la página.
3. **El doctor, una sola vez.** Su foto sale solo en el centro del anillo. La sección «Meet Dr. Christian Hahn» conserva su texto y el arco pasa a ser **un arco de cielo vacío** con una estrella de cuatro puntas (CSS, sin foto) y la estrella dorada en la cima. El anillo muestra solo los **nombres** de los 4 servicios; la frase completa va solo en la lista en escalera.
4. **Reseñas:** cita grande centrada (Ashok R.) en serif ligera + dos citas de apoyo (Ana B., Sandra P.) separadas por un filete vertical + enlace «Read more patient reviews». Sin pestañas, sin estrellas de puntuación (quité también la estrellita dorada junto al nombre). Solo las 3 citas de `home.ts`. Los nombres quedan como en `home.ts` («Ashok R.», no solo el nombre de pila: no cambié el texto).

## Peso del fondo
| Pieza | Resolución | Cuadros | Notas |
|---|---|---|---|
| Malla WebGL | 0.5 × ancho × alto del visor (tope 1400 px de alto antes de la mitad) | ≤ 30 fps | 5 octavas de ruido; pausa con la pestaña oculta; **un solo cuadro** con movimiento reducido; sin WebGL2 queda el degradado CSS |
| Estrellas 2D | 1:1, tope 1400 px de alto | ≤ 30 fps | ≤ 260 círculos; pausa oculta; un cuadro quieto con movimiento reducido |
| Estrellas CSS + grano | imagen SVG fija | 0 | sin script |
Si la ventana es más alta que 1400 px (vistas previas altas del lienzo), la malla y las estrellas animadas cubren solo los primeros 1400 px y abajo quedan las estrellas CSS y los resplandores.

## Contraste (AA) con el fondo nuevo
Texto principal rgba(244,249,255,.9) y de apoyo rgba(226,238,250,.82) (subí un poco ambos): sobre noche 14.0 y 10.6; sobre azul medio #1f4a8a 7.0 y 5.6; **sobre el azul más claro posible de la malla (#2f63ad) 4.9 y 4.0**. El apoyo podría quedar justo en los puntos más claros; el texto grande no.

## Lista premium §20 (cambios respecto a B2)
Pieza firma: el anillo, ahora sin competencia (sin dientes, y el doctor ya no se repite). Movimiento: cielo, malla (muy lenta), logo; los arcos ya no se animan. Fondo con carácter y propio de la dueña. Retícula: reseñas con filete vertical, sin pestañas.

## Riesgos
- La malla y las estrellas animadas **no se ven en el visor local** (no ejecuta el script); las capturas las saqué con un arnés que sí lo corre, con movimiento reducido (un cuadro). El movimiento en vivo y los fps reales no se midieron.
- El arco del doctor vacío es decorativo; si la dueña quiere foto de nuevo, tiene que quitarla del anillo.
- El apoyo en azul claro puede bajar a 4.0:1 en los puntos más brillantes.
- La malla a 375 depende del WebGL del celular; sin él queda el degradado.

## Correcciones B3: qué cambió (18-11-2026, según CORRECCIONES-B3.md)
`$preview` nuevos: 1440 → **7962**; 375 → **8322**.
1. **Arco del doctor: quitado.** «Meet Dr. Christian Hahn» queda solo con texto de `home.ts`, en dos columnas (título y cargo a la izquierda, texto, idioma y botón a la derecha) y una constelación pequeña de líneas punteadas en cielo (sin oro, oculta bajo 1000 px; a 375 solo ocupa lo que pide el texto). Quedan dos estrellas parecidas: el logo y la corona dorada del anillo.
2. **Fondo parejo en la vista alta:** la malla se repite en bloques de 1400 px, volteados uno sí y uno no para que no se vea la unión; todos copian el mismo cuadro de la malla (un solo cálculo WebGL a media resolución, ≤ 30 fps, pausa con la pestaña oculta, un cuadro quieto con movimiento reducido). Además hay 4 resplandores azules sueltos a lo largo de la página. Las estrellas animadas siguen en los primeros 1400 px; más abajo van las estrellas CSS.
3. **Contraste:** texto de apoyo sólido #F2F8FE y malla bajada a opacidad 0.34. Sobre el punto más claro realista de la malla (≈ #3a6aa0) el apoyo da 5.2:1 y el texto 4.9:1 o más; el caso doble extremo teórico (malla más clara sobre resplandor más claro) da 4.1:1. Nombres de reseñas 15 px, «Individual results vary» 15.5 px, pie 15 px, descripciones de la escalera 17.5 px.
4. **A 375 el anillo va sin etiquetas** (queda el anillo con el doctor y la lista en escalera enseguida). A 1440 las etiquetas con los nombres se quedan.
5. **«Read more patient reviews»** centrado.
6. **Encabezado a 1440 con aire:** el teléfono pasó a un botón redondo con ícono de teléfono y texto accesible («Call or text (702) 805-8688»); el número completo sigue en el hero, el formulario y el pie.
7. **Formulario:** el área `role="status"` (aria-live) está siempre en la página. Estados nuevos, ocultos por defecto: **error por campo** con texto bajo el campo y borde coral («Enter your full name.», «Enter a phone number.», «Enter a valid email, like name@example.com.», «Check the box so we can contact you about this request.»; salen al pulsar enviar y el foco va al primer campo con error); **aviso «not connected»** cuando todo está completo; y **éxito de ejemplo** («Thank you. We received your request and our team will follow up to set your visit.») para cuando el formulario esté conectado (existe en el marcado, no se muestra).
8. **Dirección del pie** sin `nowrap`.
No verificado: los estados de error y éxito solo se vieron forzando las clases en una prueba; el comportamiento real depende del script del lienzo.
