# Correcciones B4 · ronda única (18-11-2026)
Revisiones: `revision-b4-ld-qa-4.md` (PASA con reservas) y `revision-b4-ld-disenador-uiux-2.md` (PASA con reservas). Aplica todo sobre B4 (B3 no se toca) y vuelve a generar con `integrate.mjs`.

## Figura
1. **Textos de pasos 4 y 5:** que no prometan resultado ni ausencia de molestia. Usa frases de proceso (p. ej. «Teeth start to move», «Teeth move into line» o similares). Siguen marcados como texto nuevo para aprobar en `hoja-b4.md`.
2. **Dientes menos «bloque»:** coronas más redondeadas; molares sin la cruz de 4 cuadros que parece dado. Encía con tono propio (no la misma placa azul).
3. **Extremos de la encía** cerrados (sin corte plano con escalón). Revisa a 4× la cola derecha del alambre.
4. **Modelo más grande dentro de la tarjeta** (quita el aire sobrante); a 375 que se distingan brackets y ligas. Pista y nota a 14 px o más.
5. **Manómetro:** quítalo (sin números no le dice nada a un paciente). Quita su lógica también.
6. **Pausa del bucle (WCAG 2.2.2):** botón Pause/Play visible y accesible; además pausa con el cursor encima y al enfocar un paso.
7. `role="slider"`: `aria-label` corto; el párrafo largo va a `aria-describedby`.
8. Borde de los botones de paso sin elegir: opacidad 0.5 o más.

## Página
9. Casilla de consentimiento del formulario: área táctil de 44 px (viene de B3; arréglala solo en B4).
10. Logo de la cabecera: un poco más de contraste sobre el azul (sin cambiar el logo).

## Entrega
B4 regenerada (1440 y 375 con `$preview` real), `hoja-b4.md` actualizada (textos nuevos, peso, auditoría otra vez), una línea en `docs/bitacora.md`, capturas nuevas en `shots/` sacadas con el visor `http://127.0.0.1:5190` (no como archivo, para que cargue el logo). No toques git ni publiques en la galería de Anatomy.
