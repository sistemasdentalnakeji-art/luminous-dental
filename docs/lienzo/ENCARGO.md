# Encargo común · Etapa 2 · Direcciones de diseño del inicio · Luminous Dental

Modo: **ponytail APAGADO** (escribe «Ponytail: apagado» en tu primera línea).
Skills que mandan (cárgalas y síguelas tal cual): `frontend-design` y `frontend-design-direction` (léelas ANTES de elegir tipografía y carácter), `impeccable` (`shape` y `critique` sobre tu dirección antes de entregar), `design-system`, `motion-foundations` (para planear el movimiento), `make-interfaces-feel-better`. Si alguna no está, dilo en tu reporte.

## Lee antes de empezar (solo esto)
- Proyecto: `C:\Users\Dental Nakeji\Desktop\Proyectos\Páginas web\React + Vite\Empresas\Luminous Dental`
- `PRODUCT.md`, `docs/marca.md`, `docs/mapa-de-paginas.md` (sección 1. Home), `docs/decisiones.md` (Sí 1), `docs/referencias.md` + las capturas de `docs/referencias/` (míralas con Read).
- **El texto real del inicio: `apps/web/src/content/home.ts`. Úsalo tal cual. No inventes ni cambies texto.**
- Manual (bóveda): `C:\Users\Dental Nakeji\Desktop\Cerebro-Dental Nakeji\01 - Proyectos\02 - Empresa Luminous Dental\03 - Departamentos\02 - IT\Subdepartamento - Páginas web\01 - Jefe - Jefe de Páginas Web\00 - Cómo se hace una página web · LD.md` → SOLO secciones 5 (Etapa 2 y su detalle), 8 (antipatrones y delatores, prueba del gemelo) y 20 (lista premium: reprueba con 2 faltas).
- Formato del lienzo: `docs/lienzo/formato-lienzo.md`.

## Datos fijos
- Luminous Dental, 1212 S Maryland Pkwy, Las Vegas, NV. Solo inglés. Un solo doctor: Dr. Christian Hahn. Tu ficha puede traer datos de Dental Nakeji (bilingüe, San Diego, «de tú»): ignóralos.
- Foto real disponible (única): el Dr. Hahn, retrato de bata blanca sobre fondo gris. En el HTML: `<img src="/_blob/f083a374d6191d67857e1e7615274e99">`. Cualquier otra foto: caja marcada «Real clinic photo · POR CONFIRMAR» con el tratamiento visual que propones. Nada de fotos de banco ni enlaces externos.
- Logo: POR CONFIRMAR (escribe «Luminous Dental» como logotipo provisional).
- No se muestran horario, calificación de Google, precios ni promociones.

## Qué entregar (por cada dirección que te toque)
1. `docs/lienzo/project/Estilo-<LETRA>.dc.html`: el **inicio completo** (las 10 secciones de home.ts), como PAGE fluida que funcione a 1440 y a 375 px (formato del lienzo: `<x-dc>`, `<helmet><style>`, el bloque `<script type="text/x-dc" data-dc-script>` con `class Component extends DCLogic` y `$preview` 1440×(alto real)). Reglas del formato: la línea `<script src="./support.js"></script>` exacta; estilos de página y media queries en `<helmet><style>`; Google Fonts solo con un `<link>` css2 dentro de `<helmet>`; sin otros enlaces externos; sin iframes; elementos reales (`<button>`, `<a href>`, `<input>` con `<label>`). Movimiento: solo CSS en `<helmet>` (un momento orquestado + respuestas a hover/foco) y todo quieto con `prefers-reduced-motion`.
2. `docs/lienzo/hoja-<letra>.md`: nombre de la dirección; qué transmite y para qué paciente; par tipográfico y POR QUÉ (de qué referencia salió); paleta con códigos y contrastes AA comprobados; **la pieza firma** en una línea; plan de movimiento; qué tomó de qué referencia (enlace); riesgo; resultado de la lista premium (8 puntos, uno por línea, pasa/falla) y de `impeccable critique`; prueba del gemelo (qué cambiaste para que no salga igual que en otra clínica).

## Las 3 direcciones deben ser REALMENTE distintas
No la misma página con otro color: cambian tema (claro/oscuro), familia tipográfica, retícula y pieza firma. Prohibido (manual §8): hero texto-izquierda/foto-derecha sin pieza firma; secciones todas «título + rejilla de tarjetas iguales»; Inter/Montserrat/Roboto/Open Sans/Poppins/Lato como única voz; crema + serif + terracota; casi negro + verde ácido; etiquetas en MAYÚSCULAS espaciadas sobre cada título; numerar secciones 01/02/03; flechita en cada botón; aparecer-y-subir en cada sección; degradados morados, blobs, emojis.
La pieza firma debe **demostrar** algo real de Luminous (p. ej. la idea «tus dientes deben durar toda la vida», el doctor único y cercano, las 4 áreas para toda la familia) sin inventar casos ni cifras.

## No tocar
Nada fuera de tus archivos en `docs/lienzo/`. No toques `apps/`, `packages/` ni otros docs. Cada diseñador solo sus letras.

## Reporte
Formato de la sección 9 del manual, agregado al final de `docs/bitacora.md` (no borres nada), y devuélvelo en español sencillo con la línea de evidencia por skill.
