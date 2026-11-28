# Plan · Ronda 11 · Pendiente para la siguiente cuenta (27-11-2026)

**Estado al cerrar esta cuenta:** r9, r9b y r10 hechas, typecheck y build en verde, **sin commit** (rama actual `webpage-V1.26.11.26`; lo publicado es del 26-11). La dueña vio la r10: **le gustó el hub de Servicios** (la «carta» de 3 columnas de D2). Lo demás de este archivo está **por hacer**: nadie lo ha empezado.

**Cómo retomar (Jefe):**
1. Lee este archivo completo y `ENCARGOS-27-11-r10.md` (sus 4 reglas siguen valiendo: cambia SOLO lo pedido; captura antes/después de la página completa; revisa cada frase CUMPLE/NO CUMPLE antes de entregar; no repitas una solución que ella ya rechazó).
2. **Antes de lanzar, pregúntale a la dueña las 2 dudas de abajo** (una línea cada una, en palabras simples). No lances D2 ni el punto 1 de F2 sin su respuesta.
3. Lanza en paralelo, cada uno con sus archivos. Al terminar: typecheck + build, **el Jefe revisa en el navegador cada frase** y luego QA (1 agente) de lo tocado.

Reglas comunes: r4/r7/r8/r9/r10. EN y ES, 375/768/1440, capturas `*-27nov-r11.png` (o la fecha del día), bitácora, sin commit, puerto propio y cerrarlo, scripts en subcarpeta propia del scratchpad. Ponytail apagado. Dicta por voz: «sección R» = **hero**; «la queji» = **Dental Nakeji**.

## Dudas para la dueña (preguntar primero)
- **D-1 · «Devuelve el loguito oficial» (hub de Servicios).** ¿Es el ícono propio de cada servicio que tenía antes (el diente, la corona…), en lugar de la estrellita de ahora? ¿O el logo de Luminous Dental? *Si no sabe: los íconos propios de cada servicio.*
- **D-2 · Héroe 24/7 de Contact.** ¿Lo entendí así? A la derecha, en dos renglones, «DENTAL» arriba y «EMERGENCIAS» abajo, con «-CIAS» terminando debajo de «DEN-» (las dos palabras alineadas como bloque), y debajo de ellas el letrero «24/7» animado. A la izquierda, el texto y el botón para llamar. *Si no sabe: así como está escrito.*

## D1 `ld-disenador-uiux-1` · Héroe del inicio («sección R») — lo más delicado
Archivos: `components/Hero.tsx`, `components/BeforeAfter.tsx` y su CSS (`hero.css`, `before-after.css`), contenido del héroe.
- **Dueña:** «Me sigue sin gustar, ya van como más de 10 veces. La sección del principio, de los dientes, del homepage. Me gusta el antes y después, pero no se va a encontrar la forma de que me agrade visualmente. **El antes y después tienen que ir en una sola imagen, eso es definitivo. No tienen que estar las dos.** Encuentra la forma de que me agrade.»
- Hoy: dos fotos apiladas (Before / After) + miniaturas de casos debajo. → **Una sola imagen** que compare antes y después (p. ej. comparador con divisor que se arrastra, o que cambia solo de antes a después, accesible con teclado y quieto con movimiento reducido/pausa).
- **Método obligatorio (ha fallado más de 10 veces):** referencias vivas (manual §20: 21st `get_inspiration` y fuentes de código de §24 — React Bits, Magic UI, Aceternity — buscando «before after / compare slider»), **2 o 3 propuestas completas del héroe** en 375 y 1440, `impeccable critique` a cada una, y **enseñarlas a la dueña para que elija ANTES de programarlo en el sitio** (capturas o artefacto). Sin su elección no se toca `Hero.tsx`.
- Se conserva: titular «Emergency or smile makeover, we're here.», textos y botones actuales, las fotos de casos que ya hay (con permiso), sin temática de Las Vegas.

## D2 `ld-disenador-uiux-2` · Héroe 24/7 de Contact (después de D-2)
Archivos: `pages/Contact.tsx`, `styles/contact-lines.css`.
- **Dueña:** «Mi idea era poner a la derecha "dental" arriba y "emergencias" abajo, que "-cias" quedara por debajo de "den-". Y por debajo quedara el letrero 24/7, pero con una animación. **Los números no me gustaron, el diseño del 24/7.** Busca un diseño que podamos usar de las fuentes que tengamos y adáptalo, copia el código.»
- → Composición según D-2. El «24/7» con un diseño nuevo tomado de las fuentes de código del manual §24 (React Bits, Magic UI, Aceternity, 21st): busca piezas de números/texto animado (contador, texto neón, flip, glow), copia el código al proyecto y adáptalo a los tokens (rojo para emergencia), sin librería nueva salvo que se declare y la dueña lo apruebe. Quieto con movimiento reducido y pausa.
- **No tocar:** el resto de Contact (moneda sin contorno, reserva, datos, fotos de recepción): la dueña le dio «10 de 10».

## F2 `ld-frontend-2` · Servicios: ícono, figura animada y color
Archivos: `pages/Services.tsx`, `styles/services-lines.css`, `pages/Service.tsx` y su CSS, `features/figure/*` (`figure.css`, `scene.ts`, `engine.js`), `components/ServiceGlyph*`.
1. **Hub (después de D-1).** «La parte de los servicios ya me gustó. Nomás que devuelvas el loguito oficial.» → Solo cambiar la estrellita de cada servicio por lo que diga D-1. Nada más del hub.
2. **Figura en cada servicio.** «En homepage, en servicios destacados, el ícono que se mueve. De igual manera integrarlo ahí, para la página de cada servicio.» → La figura animada de destacados (`ResultFigure`, `features/figure`) en la página de cada servicio. Hoy `Figure.tsx` solo existe para 5 (braces, implants, bridges, crowns, whitening): úsala donde haya modelo; para los que no tengan, dilo en el reporte (no inventar modelos).
3. **Color de la figura.** «Hay que editar el azul. Creo que se quedó con los colores oficiales de Dental Nakeji; adaptarlo a los de Luminous.» → Revisar los azules de `figure.css` / `engine.js` (p. ej. `rgba(123,195,235,…)`, `rgba(18,38,76,…)`) y pasarlos a los tokens de Luminous (`tokens.css`: noche, `--color-medic #34bfcc`, `--color-medic-soft #8fe3e8`, `--color-mint #3fcfae`). Vale para el inicio y para los servicios.

## F1 `ld-desarrollador-web` · Seguros, Financiamiento y Convenios iguales
Archivos: `pages/{Insurance,FinancingHub,Financing,Agreements}.tsx`, `components/BenefitsHeader.tsx`, `styles/{benefits-r2,benefits,insurance}.css`.
- **Dueña:** «Las tres opciones de beneficios, ninguna me gusta. Corregimos la de convenios, pero no la de aseguranzas ni financiamiento. Hay que corregirlas. Pero tampoco me gustó cómo quedó convenios. **Que esas tres secciones sean iguales: iguales en el orden, cada una con su contenido.**»
- → Una misma estructura y orden para Seguros, Financiamiento (hub) y Convenios: héroe de un solo contenido (sin «tu cobertura explicada, formas de pago, beneficios de convenios» en ninguna) + el mismo tipo de sección de contenido + el mismo cierre (o ninguno). Cada una con sus datos (logos de aseguradoras, financieras, SAHARA). Diseña la plantilla común con impeccable (2 opciones, critique) — que no se vea «pelón» y sin tarjetas con color de fondo. El hub de Beneficios no se toca.

## Pendientes de la dueña o la clínica (no bloquean)
Los de la r7 · precio de consulta en el FAQ (preguntar a la clínica) · fotos propias de tratamientos · foto de recepción en mayor resolución · ¿más estrellas en los márgenes? (r10 dejó ~6 a 1440 y casi ninguna en celular).

## Respuestas de la dueña (27-11, nueva sesión)
- **D-1:** los íconos propios de cada servicio (el diente, la corona…), en lugar de la estrellita.
- **D-2:** sí, así como está escrito.
- Lanzados D1, D2, F1 y F2 en paralelo.
- **Héroe del inicio:** la dueña eligió **B** con ajustes (solo Before/After, sin textos de casos, divisor automático, botón de pausa). Lo programa F1 (ld-desarrollador-web). QA 1 revisa lo demás de la r11 en paralelo.
