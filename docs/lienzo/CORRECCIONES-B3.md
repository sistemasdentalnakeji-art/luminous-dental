# Correcciones B3 · decisión del jefe (18-11-2026)

Fuentes: `revision-b3-ld-qa-4.md` y `revision-b3-ld-disenador-uiux-2.md`. Las dos: PASA. Antes de enseñar, corrige sobre los mismos archivos B3:

1. **Arco vacío del doctor:** quítalo. La sección «Meet Dr. Christian Hahn» queda solo de texto (home.ts), bien compuesta, con una pequeña constelación decorativa a lo sumo (sin estrella dorada extra). A 375 no debe ocupar más de lo que pide el texto. Quedan solo dos estrellas parecidas: logo y corona del anillo.
2. **Fondo parejo en la vista alta del lienzo:** que la malla/resplandores cubran toda la página (en el lienzo el alto es real, no hay ventana fija): repite resplandores o extiende el canvas a todo el alto con el mismo peso (media resolución, ≤ 30 fps, pausa oculta).
3. **Contraste:** el texto de apoyo ≥ 4.5:1 sobre el punto más claro de la malla (sube el tono o pon un velo detrás). Nombres de reseñas, «Individual results vary», descripciones de la escalera y pie: tamaño ≥ 15 px y legibles.
4. **Repetición a 375:** bajo el anillo no repitas los 4 nombres si la escalera viene enseguida (en celular el anillo puede ir sin etiquetas o solo con el anillo).
5. «Read more patient reviews» centrado bajo la sección centrada.
6. Encabezado a 1440 con aire (si no cabe, el teléfono pasa a ícono con texto accesible).
7. Formulario: `role="status"` siempre presente; un estado de error por campo (texto bajo el campo) y un estado de éxito de ejemplo descritos en la hoja (no visibles por defecto).
8. Quita `nowrap` de la dirección del pie.

Actualiza `$preview`, agrega «Correcciones B3» en `hoja-b3.md` y una línea en la bitácora. Capturas a 1440 y 375 completas antes de entregar.
