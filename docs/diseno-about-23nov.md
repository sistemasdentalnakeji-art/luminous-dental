# About · diseño ronda 4 (23-11-2026) · Hoja para Frontend 2

Autor: UI-UX 2. Estado: PROPUESTA para la dueña (no se tocó `apps/web`). Ponytail apagado.
Maqueta: `docs/lienzo/about-23nov/about.html` (`?static=1` sin movimiento · `?real=1` oculta los huecos POR CONFIRMAR = cómo debe verse hoy en producción). `about.css` tiene todos los valores; `base.css` solo es de la maqueta.
Capturas (`docs/lienzo/about-23nov/capturas/`): `about-1440.png` (con huecos), `about-1440-real.png` (producción hoy), `about-375.png` (marco de 375 px, `movil.html`), `about-1440-historia.png`, `ref-about-actual-1440.png` (la página de hoy).
Sin formulario de cita (decisión de la dueña). Ningún token nuevo: todo sale de `tokens.css`.

## Orden (el de Dental Nakeji) y la idea propia
Intro → Historia → Propósito → Valores → Equipo. Nakeji usa línea de tiempo con fibras y tarjetas que voltean; aquí: **ficha de casino sobre un cable de luz** (historia), **letrero de neón** (propósito), tarjetas de vidrio con ficha-ícono (valores), **ficha de doctor con marco de arco** (equipo). El momento memorable es el letrero; el único movimiento es el cable que enciende las fichas.

## Secciones, texto y origen
| # | Sección | Texto | Origen |
|---|---|---|---|
| 0 | `h1` About Luminous Dental + frase | «A general and cosmetic dental office at 1212 S Maryland Pkwy in Las Vegas, with care built around keeping your natural teeth.» | TEXTO NUEVO (para aprobación), armado con `clinic.tagline`, `clinic.address`, `home.why.points[0]` |
| 1 | Our story | h2 «Our story» · «One idea runs through every visit: your teeth should last a lifetime.» (frase ancla, marca.md §1). Fichas: **What we believe** = `home.why.points[0].text`; **Where to find us** = `clinic.address` + enlace «Open in Google Maps» (`clinic.mapsUrl`); **How it began** = HUECO | home.ts, clinic.ts |
| 2 | Propósito | Letrero: «Your teeth should last a lifetime.» · **Our mission**: `home.why.points[1].text` · **Our vision**: HUECO | marca.md, home.ts |
| 3 | What we stand for | Las 3 tarjetas = `home.why.points` (título y texto tal cual). Íconos (SVG en la maqueta, tomar de ahí): diente, corazón, casa | home.ts |
| 4 | Meet the team | Nombre y rol: `clinic.doctor.name/role`. Frase: «He is committed to delivering quality care and a comfortable experience for his patients.» (recorte de `home.doctor.text`). Datos: Experience 4 years · Training University of Nevada, Las Vegas · Language English (de `home.doctor.text` y `language`). Foto `dr-hahn.jpg`, alt `home.doctor.photoAlt` | home.ts, clinic.ts |
| 5 | Cierre | `Services` · `Insurance & Financing` (los 2 enlaces de hoy) + «Call or text (702) 805-8688» (regla 5 de marca) | clinic.ts |

**Regla para huecos:** «POR CONFIRMAR» NO se escribe en la página (marca.md regla 4). La maqueta dibuja huecos con borde punteado y etiqueta; en producción **no se renderizan** hasta que exista el dato (que cada ficha, tarjeta y miembro salga de un arreglo y el hueco simplemente no esté). Las capturas `*-real.png` son el objetivo hoy: 2 fichas, misión sola a todo el ancho, el doctor solo (máx. 900 px de ancho).

## Medidas (px CSS; 1440 / 768 / 375)
| Pieza | Valor |
|---|---|
| Contenedor | `.wrap` actual (1440 máx., `--pad`) · secciones `padding-block clamp(48px,7vw,104px)`; las secciones 2 a 4 llevan `padding-top:0` |
| h1 | Newsreader 400 `clamp(40px,5vw,72px)`, lh 1.04, barra medic 88×3 debajo (igual a `h1.h2::after`) |
| h2 | `clamp(36px,4.4vw,58px)`, lh 1.08, misma barra |
| Cuerpo / frase | `clamp(18px,1.5vw,21px)` (frase), tarjetas `clamp(17px,1.3vw,19px)` lh 1.55, `text-wrap:pretty` |
| Historia | rejilla 4fr / 8fr (≤1023: una columna). Ficha `--chip: clamp(104px,11.5vw,164px)` (1440 = 152; 375 = 88). Cable 3 px, línea `--color-line` + relleno medic→medic-soft con halo; horizontal a la altura del centro de la ficha; en ≤760 vertical a la izquierda y la ficha a la izquierda del texto |
| Ficha | receta de `.fcoin` (floating-contact.css): canto 8 bloques `#f4f1ea`/`#2f63ad`, filete dorado, cara radial, anillo punteado; ícono 42 % en `--color-medic-soft`. Es el único uso del dorado (fichas, permitido por tokens.css) |
| Letrero | panel radio 32, padding `clamp(40px,6vw,96px)` / `clamp(24px,5vw,88px)`, fondo `#071126`; tubo = `::before` inset `clamp(10px,1.4vw,18px)`, borde 2 px `rgba(143,227,232,.85)` con 3 halos; texto Newsreader 300 `clamp(40px,6.2vw,92px)` lh 1.02, blanco `#f2fcff` con 4 sombras (máx. 15em, centrado, balance). Estático |
| Misión / visión | 2 columnas, radio 24, padding `clamp(24px,2.6vw,40px)`; título `clamp(26px,2.4vw,34px)` |
| Valores | 3 columnas (≤760: 1), gap `clamp(16px,2vw,28px)`, radio 28, vidrio igual a la tarjeta de Featured services; ficha-ícono 68 px |
| Doctor | tarjeta 7fr / ficha de huecos 5fr (≤1023 una columna); dentro 5fr foto / 7fr texto; foto aspecto 4/5, radio `999px 999px 20px 20px`, contorno 2 px medic-soft offset 6, `object-position:50% 14%`; ≤760 foto máx. 260 px centrada |
| Datos del doctor | `dl` con filas de borde superior `--color-line`; etiqueta 600 `--color-medic-soft` |
| Huecos (solo maqueta) | borde 2 px punteado `rgba(123,195,235,.6)`, etiqueta POR CONFIRMAR |

## Estados
| Elemento | Reposo | Hover | Foco | Presionado |
|---|---|---|---|---|
| Enlaces (`.tlink`, Maps) | subrayado celeste | el actual del sitio | anillo medic 3 px (`:focus-visible`) | — |
| Tarjeta de valor | borde de vidrio | borde medic .55 + la ficha gira 18° (`transform .35s`) | n/a (no interactiva) | — |
| Ficha de historia | decorativa (`aria-hidden`), sin hover | — | — | — |
No hay botones nuevos ni formulario. Objetivos táctiles: enlaces `min-height:44px`.

## Plan de movimiento (un solo momento)
- **Momento:** al entrar «Our story» a la vista (IntersectionObserver, umbral .35, una vez): el cable se llena (1.4 s, `transform:scaleX`, en celular `scaleY`) y las fichas se encienden en orden (retardos .15 / .7 / 1.25 s; opacidad .4→1, brillo .55→1, escala .94→1, halo medic; .5 s). Solo `transform`, `opacity`, `filter`, `box-shadow`.
- Todo lo demás: quieto. Hover de la tarjeta de valor es respuesta a la persona.
- **Quieto:** el CSS base es el estado final. El estado oscuro solo existe con `data-arm`, que el JS pone únicamente si hay `IntersectionObserver`, NO hay `prefers-reduced-motion` y `html` NO tiene `data-motion-paused` (usar `lib/motion.ts`, no copiar la lógica). Además `html[data-motion-paused] .story *{transition:none!important}` y la media query de reducir movimiento. Si el usuario activa la pausa a media animación, queda en el estado final.
- Sin `transition:all`; sin parpadeo del neón (quieto: la respiración de la ronda 3 es del logo del menú).

## Qué cambiar en `apps/web` (Frontend 2)
1. `pages/About.tsx`: reemplazar todo (quitar `<Appointment />`, el bloque `.doc` y `.about-why`) por las 5 secciones; semántica: `header`, `section aria-labelledby`, `ol` para las fichas, `ul` para valores, `article` para miembros. Foto con `width/height` y alt de `home.doctor.photoAlt`.
2. Datos: `home.why.points`, `home.doctor`, `clinic` ya existen; crear un arreglo `about` (en `content/`) para fichas e integrantes con `confirmed` para que los huecos no se pinten. No inventar nada.
3. Estilos nuevos en `styles/about.css` (copiar `about.css` de la maqueta, quitar lo marcado «maqueta»/huecos, cambiar `.doc`→ nombre propio porque `.doc` ya existe en site.css). Borrar `.about-why`, `.about-links`, `.doc-photo` si quedan sin uso.
4. Mantener `scroll-padding-top` del menú; el letrero debe entrar sin desborde a 320 px.

## Críticas (impeccable critique) y prueba del gemelo
- Prueba del gemelo (¿esto podría ser de otra clínica con solo cambiar el nombre?): no; ficha de casino, letrero de neón con la frase de la clínica y dirección de Las Vegas son de Luminous. Contra Dental Nakeji (mismo dueño): otra estructura visual (sin línea de tiempo vertical, sin tarjetas que voltean, sin fibras), solo comparte el orden de secciones.
- Jerarquía: un solo foco (el letrero); las fichas quedan en segundo nivel. Evité etiquetas en mayúsculas, números 01/02 y palabra única de color en títulos; el único mayúsculas es la etiqueta de maqueta POR CONFIRMAR.
- Riesgos que veo: (a) con solo 2 fichas la historia es corta; es honesta, crece cuando la dueña confirme el origen; (b) «What we stand for» repite textos del inicio (Why patients choose): es el único contenido real de valores; alternativa si molesta: quitar «Why» del inicio o de About, decide el jefe; (c) misión = texto del punto 2 de «why», no es una declaración oficial, solo la más cercana a «Our mission is to provide personalized care» del sitio oficial.
- Contraste (calculado a ojo con tokens ya medidos): texto `--color-text` sobre noche > 14:1; `--color-medic-soft` sobre tarjeta 12:1; sky en huecos > 7:1. No medido con herramienta.
