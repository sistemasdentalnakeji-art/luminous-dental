# Encargo · Hero con 5 servicios «Anatomy» · B4 → B5 (18-11-2026)

Skill principal: `anatomy` (síguela tal cual). Además `frontend-design`, `accessibility`, `motion-foundations`. Parte de B4 ya corregida (`CORRECCIONES-B4.md`); B3 y B4 no se tocan.

## Lo que pidió la dueña
En vez de solo brackets, la figura del hero muestra **5 servicios que el visitante puede elegir**, y cada uno se ve **«armándose» de cero al resultado**, bien maquetado, como gancho. Aprobó estos 5 (todos están en la página oficial de Luminous):
1. **Braces & Invisalign** — reusa la figura de brackets ya hecha (`anatomy/brackets/`). Opcional: un paso o variante con alineador transparente, sin decir marcas de más.
2. **Dental implants** — hueso/encía → poste → pilar → corona.
3. **Dentures & bridges** — un puente sobre dos dientes de apoyo (o dentadura sobre la encía; elige el que se explique mejor, uno solo).
4. **Porcelain veneers & crowns** — diente preparado → corona (o carilla) que baja y asienta.
5. **Teeth whitening** — mismos dientes, del tono amarillento al tono claro, en pasos (sin cifras de tonos).

## Cómo se ve
- Mismo objeto base para los 5 (el modelo dental sobre su base de banco, con la perilla dorada como control de pasos), para que se sienta una sola pieza; arriba una fila de 5 pestañas/botones con el nombre del servicio. Al cambiar de servicio, la figura cambia con una transición tranquila.
- Cada servicio: 3 a 5 pasos con nombre corto que **describe el proceso, nunca un resultado ni ausencia de dolor**. Sin meses, visitas, porcentajes, precios, tonos ni garantías. «Illustration. Individual results vary.» se queda.
- Paleta de B3/B4: noche, superficie, cielo; oro solo para lo elegido (perilla, pestaña activa). Porcelana para dientes, metal claro para piezas metálicas, encía con su tono propio (ya pedido en CORRECCIONES-B4).
- Accesibilidad y movimiento como en B4 corregida: pestañas con teclado (patrón tabs), bucle con Pause/Play, pausa con cursor/foco, `prefers-reduced-motion` = paso final quieto. Áreas táctiles de 44 px. A 375 las pestañas no deben desbordar (scroll horizontal interno o 2 filas, sin desborde de página).
- Peso: comparte kit y base entre los 5; carga la figura sin bloquear el titular. Anota el peso.

## Dónde
`docs/lienzo/anatomy/servicios/` (build + página suelta), auditoría del kit o propia por cada servicio, revisión a 4×. Integra como **`Estilo-B5.dc.html` y `Estilo-B5-movil.dc.html`** (copia de B4). Prohibido `publish.mjs`. No toques git.

## Entrega
`docs/lienzo/hoja-b5.md` (concepto por servicio, pasos, **todos los textos nuevos marcados para aprobar**, auditorías, peso, lo no verificado), capturas a 1440 y 375 con el visor `http://127.0.0.1:5190`, una línea en `docs/bitacora.md`. Cada figura de servicio debe poder reusarse sola más adelante en su página de servicio (en el lugar del antes/después).
