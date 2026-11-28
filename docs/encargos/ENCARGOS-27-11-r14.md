# Estado y cómo retomar · Ronda 14 (27-11-2026, cambio de cuenta)

**Estado al cerrar esta cuenta:** rondas 11, 11b–11f, 12 y 13 hechas. typecheck y build en verde en cada entrega. **Sin commit** (rama actual `webpage-V1.26.11.26`; lo publicado sigue siendo del 26-11). Detalle de cada ronda en `docs/bitacora.md` (entradas del 27-11) y decisiones en `docs/decisiones.md` (bloques del 27-11).

## Qué quedó hecho y aprobado / visto por la dueña
- Héroe del inicio: propuesta **B** (una foto, solo Before/After, divisor automático, botón Pausa). Encuadre centrado junto al texto (r12; la foto quedó ~75 px más abajo que la maqueta; si la quiere más arriba: `.hx-slot top:8px` en hero.css).
- Encabezado: logo más grande, sin tarjeta, centrado y sobresaliendo ~10 px arriba y abajo (solo sale la estrellita arriba; para que salga la «L» habría que bajar la barra: preguntar).
- Íconos de servicios: mismo dibujo del menú en menú, hub y destacados, con aura en colores Luminous; en el menú, trazo verde que recorre el borde (sin respirar). **Le gustaron.** Figura 3D con sus colores originales.
- Seguros / Financiamiento / Convenios: misma estructura, sin píldoras, botón verde de teléfono con número.
- Contact: «Emergencias dentales» centrado con la tipografía del sitio, 24/7 (React Bits Counter) debajo, texto y botón centrados; arreglado el CSS roto de escritorio.
- WhatsApp quitado de todo el sitio (la clínica no tiene). Fondo: azul oscuro plano (#0a1529) provisional; se borraron estrellas y Backdrop.
- Fotos nuevas de Teeth Whitening, Veneers & Crowns, Implants (Pexels/Unsplash, créditos en `docs/creditos.md`) y All-on-4 / All-on-6 separados en dos páginas con foto de Nakeji. **La dueña: «Todas me gustan, muy bien.»**
- QA completa r12 (funcional: 86 rutas × 5 anchos; accesibilidad: axe 86 rutas) → PASA con fallas menores. Informes: `docs/reportes/QA-27-11-r12-funcional.md` y `QA-27-11-r12-accesibilidad.md`.

## EN CURSO al cerrar (revisar primero)
- **F1 ronda 12b · Correcciones de QA** (ld-desarrollador-web): botón Pausa del héroe vs fichas flotantes; etiquetas Before/After en 0/100 %; quitar aria-pressed de la pausa; aria-label de financieras; h4→h3 en blog; tabindex en `.legal-body`; landmark repetido del inicio; hover menta del botón verde. Ver si dejó su entrada «27-11 · F1 ronda 12b» en `docs/bitacora.md`. Si no está, relanzar con el mismo encargo (lista arriba) y correr typecheck + build.

## Siguiente (Jefe)
1. Confirmar 12b terminado; `npm run typecheck` y `npm run build`.
2. **El Jefe revisa en el navegador cada frase de la dueña** (lista arriba), incluidas las páginas All-on-4/All-on-6 y las 3 fotos nuevas (salieron después de la QA).
3. QA corta (1 agente) solo de lo de 12b y r13.
4. Avisar a la dueña con capturas.

## Preguntas pendientes para la dueña
- Contact: «siento que se me olvidaron algunas cosas»: ¿qué falta? (D1 no encontró pedidos faltantes).
- Contact EN: ¿«Dental emergencies» o «Dental Emergencies»?
- Beneficios: ¿qué son «los loguitos»? (hoy esas páginas no muestran íconos; los logos de marcas no se pueden recolorear).
- Logo: ¿bajar la barra para que salga también la «L»? ¿La foto del héroe más arriba?
- Textos de All-on-4 / All-on-6 por aprobar. Íconos repetidos en el hub (chispa ×4).
- Logos tenues de Cherry, PlexPay, iCreditWorks.
- Fondo bonito nuevo (dijo que se verá después).
- De antes: precio de consulta en FAQ, fotos propias, foto de recepción en mayor resolución, permiso de pacientes para fotos de casos, fotos de casos en mayor resolución.

## Limpieza menor anotada
`ServiceGlyph.tsx`, `Figure.tsx`, `servicesHub.ts`/`.svc-card` y el keyframe `aura-breathe` quedaron sin uso.

Reglas: las de r10 (cambia SOLO lo pedido; captura antes/después; CUMPLE/NO CUMPLE por frase; no repetir lo rechazado). Dicta por voz: «sección R» = hero; «la queji» = Dental Nakeji.

## Actualización al cerrar: 12b TERMINADA
- F1 ronda 12b entregó las 8 correcciones (typecheck y build en verde, axe 0 violaciones). Detalle en la bitácora «27-11 · F1 ronda 12b».
- A revisar en el navegador: cerca del 78 % del barrido automático, «Después» queda unos píxeles a la izquierda del divisor (por el tope que libra las fichas flotantes; ajustable en el `190px` del clamp de `.ba-tag`, before-after.css). El hover menta del botón verde solo se verificó por código.
- Siguiente paso: punto 2 de «Siguiente» (revisión del Jefe en navegador), luego QA corta y aviso a la dueña.
