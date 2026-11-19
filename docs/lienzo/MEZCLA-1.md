# Encargo · Etapa 2 · Ronda de cambios 1 de 2 · Mezcla elegida por la dueña (18-11-2026)

Ponytail: apagado. Skills: `frontend-design`, `impeccable` (shape + critique), `make-interfaces-feel-better`, `motion-foundations`, `accessibility`.
Formato del lienzo: `docs/lienzo/formato-lienzo.md` (igual que antes). Texto: `apps/web/src/content/home.ts` tal cual, completo.

## Lo que pidió la dueña (sus palabras, resumidas)
- **Base: el Estilo B** («El anillo»): le gusta cómo están acomodadas las cosas.
- **Tercer ingrediente (manda en colores, letra y fondo): su propio diseño avanzado** en `C:\Users\Dental Nakeji\Desktop\Luminous\luminous-web\`.
  Lee `DESIGN.md` (completo) y mira `.impeccable/review/desktop.png`, `sky-1.png`, `sky-meteor.png`, `mobile.png`.
  - Fondo azul noche con resplandor azul, grano y **estrellitas** (código: `src/NightSky.tsx`, lienzo con estrellas que respiran y una estrella fugaz ~cada 10 s; en el lienzo hazlo con CSS/SVG o un `<canvas>` pequeño dentro del bloque DCLogic, quieto con `prefers-reduced-motion`).
  - **Logo real que se ilumina** (el logo NO cambia): `<img>`/máscara con `/_blob/0b51b8a1d7068949c18a8325b0057ffd` (logo.png 640×365) y la estrella `/_blob/3df7fbee3a5d0d4152df42a3a0f0f6f3` (logo-star.png 113×150). Copia el efecto de `src/index.css` líneas 84–95 (`.logo`, `.logo-sheen`, `.logo-star`, `.logo-halo`, `.logo-flare` y sus keyframes) y la regla de movimiento reducido (líneas 570–571).
  - Colores y letra de su DESIGN.md: night `#0a1529`, surface `#0d1c37`, sky `#7bc3eb`, gold `#e0b65c` / gold-soft `#f3d79a`, texto blanco-azulado; **Newsreader** (títulos, ligera 300–400) + **Figtree** (texto). Esto reemplaza Fraunces y el ámbar de B.
  - Puedes usar sus reglas: oro solo donde está la estrella, agrupar con filetes finos, arco para fotos de personas, cresta de montañas al pie del hero y arriba del pie de página.
- **Robar de A:** la **franja de dientes** bajo el hero (la dentadura que se enciende del centro hacia afuera). Pásala al mundo noche (dientes porcelana/cielo sobre azul, encendido como estrellas), sin que tape el anillo de B.
- **Robar de C:**
  1. La sección **«Why patients choose Luminous Dental»** con su acomodo de C (titular grande «We help you keep your own teeth» + lede a la derecha + 3 notas con filete arriba, desfasadas en altura).
  2. La **lista de servicios en escalera** de C (cada fila más adentro que la anterior, separadas por filetes: lo que la dueña llama «ticket punch», lista separada). Combínala con el acomodo de B: el anillo con el doctor sigue siendo la pieza firma, y la lista escalonada va junto a él o debajo.
- Todo lo demás de B se queda (orden de secciones, anillo, reseñas, cobertura, formulario).

## Límites
- Solo hay **una foto real de paciente/doctor confirmada**: el Dr. Hahn (`/_blob/f083a374d6191d67857e1e7615274e99`). Las fotos antes/después de la carpeta de la dueña NO se usan todavía (permiso POR CONFIRMAR): caja «Real clinic photo · POR CONFIRMAR».
- No se muestran horario, calificación de Google, precios ni promociones (aunque el diseño de la dueña muestre 4.3 en Google: queda fuera hasta confirmar).
- El texto es el de `home.ts`, no el del diseño de la dueña («Care for every smile…» NO se usa).
- Prohibiciones del manual §8 siguen igual. Áreas de toque ≥ 44 px; botón de cita visible en la primera pantalla a 375.
- Antes de entregar, saca tus capturas a 1440 y 375 con Edge sin ventana (visor `http://127.0.0.1:5190/project/…`, usa `--user-data-dir` propio) y míralas.

## Entrega
- `docs/lienzo/project/Estilo-B2.dc.html` (computadora, `$preview` 1440×alto real) y `Estilo-B2-movil.dc.html` (misma página, `$preview` 375×alto real).
- `docs/lienzo/hoja-b2.md`: qué tomó de cada fuente (B, A, C, diseño de la dueña), paleta con contrastes AA, plan de movimiento, lista premium §20 y riesgo.
- No toques `Estilo-A/B/C`, `apps/`, `packages/` ni otros docs. Reporte corto al final de `docs/bitacora.md`.
