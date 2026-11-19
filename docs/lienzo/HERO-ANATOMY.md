# Encargo · Hero con figura «Anatomy» de brackets · B3 → B4 (18-11-2026)

Ponytail: apagado. **Skill principal: `anatomy`** (cárgala con la herramienta Skill y síguela tal cual: tamaño, ejemplos, auditoría, revisión a 4×). Además `frontend-design`, `accessibility`, `motion-foundations`.

## Lo que pidió la dueña (sus palabras, resumidas)
Usar la herramienta Anatomy para que el hero del inicio muestre algo intuitivo y atractivo, como gancho: **cómo funcionan los brackets** (el procedimiento), para que se vea que la clínica es moderna y tecnológica. El hero se divide en dos: **izquierda el texto** (titular, frase, botones), **derecha la figura**.

## La figura
- Objeto real que explica la idea (regla de Anatomy: «el objeto es la explicación»): un **modelo dental de ortodoncia (tipodonto) sobre su base de banco**, con arcada, dientes, **brackets pegados**, **arco de alambre**, ligas/ligaduras, y una pieza de control (por ejemplo una perilla o regla con marcas) que el visitante mueve.
- Lo que se ve al moverla, en pasos: dientes chuecos → se colocan los brackets → entra el arco de alambre → presión suave → los dientes se alinean poco a poco. Cada número/lectura sale del mismo modelo que mueve las piezas (regla de Anatomy).
- **Sin inventar datos:** nada de meses, semanas, porcentajes ni precios. Lecturas solo de pasos con palabras. Texto de la figura en inglés, corto, y marcado en la hoja como **texto nuevo que la dueña debe aprobar**. Incluye en la tarjeta: «Illustration. Individual results vary.» (ya está aprobado en home.ts).
- Sin personas ni caras (Anatomy no dibuja personas): solo el modelo.
- Tamaño: **Hero** de Anatomy (≈2–4 h). Tema oscuro, con la paleta de B3: noche `#0a1529`, superficie `#0d1c37`, cielo `#7bc3eb`, oro `#e0b65c` solo para lo elegido/estrella; porcelana para los dientes; metal claro para brackets y alambre.
- Movimiento tranquilo; se puede mover con mouse, toque y teclado; con `prefers-reduced-motion` queda el paso final quieto con los controles funcionando. Ligera: nada de WebGL extra si no aporta (el fondo de la página ya tiene malla).

## Dónde se hace
- Construye la figura con un script de build en `C:\Users\Dental Nakeji\Desktop\Proyectos\Páginas web\React + Vite\Empresas\Luminous Dental\docs\lienzo\anatomy\brackets\` (build.mjs + la página standalone que genera). Corre la auditoría del kit y sus revisiones (Chrome/Edge sin ventana). **No publiques nada en la galería de Anatomy** (`publish.mjs` prohibido).
- Luego intégrala en el lienzo: copia `project/Estilo-B3.dc.html` y `-movil` como **`Estilo-B4.dc.html` y `Estilo-B4-movil.dc.html`** (B3 no se toca). En B4 el hero queda en 2 columnas: izquierda el texto de home.ts (titular, frase, «Request an appointment», «Call or text»), derecha la figura (SVG en línea + su script dentro del bloque DCLogic, formato `docs/lienzo/formato-lienzo.md`). A 375: texto y botón de cita primero, figura debajo.
- El **anillo con el doctor** baja a su propia sección justo después del hero (sigue siendo la única foto del doctor). Todo lo demás de B3 se queda.

## Entrega
`docs/lienzo/anatomy/brackets/` (build y página), `Estilo-B4*.dc.html` con `$preview` real, `docs/lienzo/hoja-b4.md` (concepto, lista de piezas, tamaño, textos nuevos para aprobar, resultado de la auditoría, peso). Una línea en `docs/bitacora.md`. Capturas a 1440 y 375 antes de entregar.
