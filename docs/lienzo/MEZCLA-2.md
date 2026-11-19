# Encargo · Etapa 2 · Ronda de cambios 2 de 2 · B2 → B3 (18-11-2026)

Ponytail: apagado. Mismas skills y formato que `MEZCLA-1.md`. Parte de tu `Estilo-B2.dc.html`; entrega `Estilo-B3.dc.html` y `Estilo-B3-movil.dc.html` (no toques B2). Texto: `home.ts` tal cual.

## Lo que pidió la dueña
1. **Quitar la franja de dientes** del inicio. (La idea se guarda para otra pieza; no la uses aquí.)
2. **Fondo de su diseño, de verdad visible:** su fondo animado de 21st.dev ya adaptado está en
   `C:\Users\Dental Nakeji\Desktop\Luminous\luminous-web\src\components\ui\blue-meshy-background.tsx` (malla WebGL de azules de noche, muy lenta)
   y encima `src\NightSky.tsx` (estrellas que respiran + estrella fugaz ~10 s). Así se montan en `src\Layout.tsx` línea 43: `<div class="backdrop" aria-hidden="true">` fijo detrás de todo.
   - Pásalos al bloque DCLogic del lienzo (un `<canvas>` WebGL para la malla y otro 2D para estrellas), **ligeros**: media resolución, ≤ 30 fps, pausa con la pestaña oculta, un solo cuadro quieto con `prefers-reduced-motion`, y si no hay WebGL queda el degradado CSS de respaldo.
   - Mantén también la silueta de montañas (cresta) del diseño de la dueña.
   - Las estrellas DEBEN verse: además de las animadas, una capa fija de estrellas en CSS para que se vean aun sin script (el visor local no corre el script).
3. **El doctor se repite demasiado.** Según la web oficial solo hay un dentista (Dr. Christian Hahn). Su **foto aparece UNA sola vez** en toda la página: en el centro del anillo. La sección «Meet Dr. Christian Hahn» se queda con su texto (de `home.ts`) pero sin repetir la foto (usa la estrella/arco vacío con cielo, o el retrato solo ahí y el anillo con la estrella del logo: elige uno, no los dos).
   - Los 4 servicios tampoco se repiten con la misma frase: en el anillo solo los nombres; la frase va en la lista en escalera.
4. **Mejorar la sección de reseñas («What our patients say»):** toma como guía el diseño de la dueña (`.impeccable/review/desktop.png`): una cita grande centrada en serif ligera + fila de 2 citas de apoyo divididas por filetes verticales, con nombre de pila, y el enlace «Read more patient reviews». Nada de pestañas. Sin calificación ni estrellas de puntuación. Solo las citas que ya están en `home.ts`.

## Igual que antes
Todo lo demás de B2 se queda. Prohibiciones §8, toque ≥ 44 px, botón de cita en la primera pantalla a 375, sin `{{ }}`. Capturas a 1440 y 375 (marco de 375 exactos) antes de entregar.

## Entrega
`Estilo-B3.dc.html` + `Estilo-B3-movil.dc.html` con `$preview` real; `hoja-b3.md` (qué cambió por cada punto, peso del fondo: resolución/fps); una línea en `docs/bitacora.md`.
