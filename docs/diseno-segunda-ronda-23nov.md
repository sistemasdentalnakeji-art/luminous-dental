# Segunda ronda 23-11-2026 · Hoja para Frontend 2 (puntos 5 y 7)

Autor: UI-UX 1. Estado: PROPUESTA para la dueña (no programada; no se tocó `apps/web`).
Maquetas (abrir en el navegador; son HTML estático con un poco de JS que muestra el movimiento):
- A `docs/lienzo/segunda-ronda-23nov/servicios-familia.html` (`?p=0..1` congela la estrella, `?static=1` = quieto)
- B `docs/lienzo/segunda-ronda-23nov/seguros.html` (`?open=1`, `?q=cig`, `?q=zzz`, `?static=1`)
- Capturas en `docs/lienzo/segunda-ronda-23nov/capturas/` (1440 y 375; las de 375 salen de `movil.html`, un marco de 375 px, porque Edge sin ventana no baja de 500).
- Fuentes Newsreader + Figtree y tokens de `tokens.css`; no se agrega ningún token ni color.

---
## A · «Dental care for the whole family» · La estrella en el camino (reemplaza `#doctor` y el viejo `#services`)

### Idea
En Dental Nakeji un diente 3D recorre un hilo al hacer scroll entre tres mensajes grandes. Aquí la pieza es propia: la **estrella de cuatro puntas de la marca** (la del logo), en azul medicina con una cruz médica en el centro, baja por un hilo de luz y **enciende cada grupo de atención** al llegar (General, Cosmetic, Orthodontics, Pediatric). Titular enorme, centrado; los 4 grupos en zigzag a los lados del hilo. «See all services» queda en la **segunda hilera, en el lado libre del hilo** (a la izquierda de Cosmetic). Cielo nocturno + azul medicina: sin dorado.

### Estructura (reemplaza los dos `<section>` de Home.tsx)
```
<section class="fam" id="services" aria-labelledby="svc-h">
  <div class="wrap">
    <RevealText class="fam__title" id="svc-h" accent="whole family">{services.heading}</RevealText>   // h2
    <div class="fam__path" data-live? style="--y0 --y1 --fill">
      <span class="fam__rail" aria-hidden/> <span class="fam__fill" aria-hidden/> <span class="fam__star" aria-hidden>svg</span>
      <ul class="fam__stops">
        <li class="fam__stop" data-side="l|r|l|r" [is-lit]>
          <span class="fam__node" aria-hidden/>
          <Link class="fam__link" href={g.href}><h3>{g.name}</h3><p>{g.line}</p><span class="fam__go" aria-hidden>flecha</span></Link>
        </li> x4
        <li class="fam__more"><Link class="btn" href={services.cta.href}>{services.cta.label}</Link></li>
      </ul>
    </div>
  </div>
</section>
```
Textos: `home.services` tal cual (heading, groups[].name/line/href, cta). Hoy el CTA dice «See all services» en `home.ts`; no se inventa nada. Se borra del Home toda la sección `#doctor` (Frontend 2 ya lo hace) y la vieja `#services` con `.svc-list/.row/.svc-more`. `.ringsec`, `.stage`, `.ring*`, `.lbl*`, `.portrait`, `.svc-*`, `.row*` quedan sin uso: borrar de site.css al final (lo hace quien construya). Aviso: `home.hero.more.href` es `#doctor` («See the thinking behind a makeover»): debe apuntar a `#services` o cambiarse (decide el Jefe).

### Medidas (px CSS)
| Pieza | 1440 | 375 |
|---|---|---|
| Sección | padding-block clamp(72,9vw,140) arriba / clamp(72,9vw,128) abajo | igual (72) |
| Titular `fam__title` | Newsreader 400, `clamp(46px,7.6vw,112px)`, lh .98, ls -.03em, centrado, max-width 11.5em, `text-wrap:balance`; «whole family» en `--color-mint` (con el brillo de RevealText) | `clamp(42px,12.6vw,60px)` |
| Camino `fam__path` | margin-top clamp(40,6vw,88) | igual |
| Rejilla `fam__stops` | columnas `1fr 88px 1fr`, filas `minmax(clamp(170px,13.5vw,200px),auto)`; li impares col 1 (texto a la derecha), pares col 3 (a la izquierda) | `44px 1fr`, una columna, row-gap clamp(36,9vw,56); todo a la izquierda |
| Nombre `h3` | Newsreader 400 `clamp(34px,4.6vw,68px)` lh 1.02 ls -.025em | 34 px |
| Línea `p` | Figtree 17.5 px, color `--color-text`, max-width 27em | igual |
| Flecha `fam__go` | círculo 44×44, borde 1.5px `--color-line-ui`, icono 20 px | igual |
| Hilo | 2 px `--color-line-ui` al 55 %, de nodo 1 a nodo 4; tramo recorrido 4 px degradado `--color-sky`→`--color-medic` + glow | x = 22 px |
| Nodo | 20 px, borde 2 px; encendido: fondo `--color-medic`, borde `--color-medic-soft`, halo 6 px al 18 % + glow | igual, a 12 px del borde izq. de su columna |
| Estrella | `clamp(56px,5.4vw,84px)`, SVG 4 puntas (trazo `M50 0C54 30 70 46 100 50C70 54 54 70 50 100C46 70 30 54 0 50C30 46 46 30 50 0Z`), relleno degradado blanco→`--color-medic-soft`→`--color-medic`, cruz `#0a1529` al 78 %, 2 `drop-shadow` medic | 48 px |
| Botón «See all services» | `.btn` (el de blanco que llena a medic lo pone Frontend 1), min-height 60, padding 0 36, **grid-column 1 / grid-row 2, justify-self end** | ancho completo, **al final** de la lista (en celular no se mete a media lista) |
| Fondo | `::before` radial medic .16 + glow .18, ancho min(1100px,130%), centrado en el hilo | igual |

El hilo (`--y0`, `--y1`, `--fill`) se mide con JS desde los centros de los nodos (en la maqueta: `measure()` en el `<script>`); así sirve con cualquier alto de texto.

### Estados
| Estado | Qué se ve |
|---|---|
| Por llegar (solo con JS y movimiento permitido) | nodo hueco, texto del grupo al 50 % de opacidad (≈5:1, calculado, no medido) |
| Encendido | nodo medic con halo; texto al 100 % |
| Hover / foco de un grupo | `h3` pasa a `--color-medic-soft`; flecha se llena de `--color-medic` con icono noche y se mueve 4 px; foco 3 px medic (global) |
| Sin JS, reducir movimiento o `data-motion-paused` | **todo encendido y quieto**: estrella al final del hilo (sobre Pediatric), todo visible |
| Enlaces | toda la tarjeta de texto es el `Link` (≥ 44 px); el nodo y el hilo son `aria-hidden` |
| Carga / vacío / error / permiso | no aplican (contenido fijo de `home.ts`) |

### Movimiento (plan)
- **Momento orquestado único:** al bajar, la estrella recorre el hilo atada al scroll (progreso = de que el primer nodo cruza el 60 % de la pantalla a que el último lo cruza; en la maqueta `mark = innerHeight*.6`). El tramo recorrido se enciende y cada nodo/grupo se enciende cuando la estrella pasa por su centro. Solo `transform`/`opacity`/`background-color`/`box-shadow` (la posición de la estrella va por `top` calculado: en React usar `transform: translateY` con la misma cuenta).
- Titular: palabras que suben una vez (`RevealText`, ya existe).
- **Respuestas a la acción:** hover/foco del grupo (arriba). Ningún movimiento continuo ni automático.
- Quieto: `prefers-reduced-motion`, `html[data-motion-paused]` y sin JS → estado final. Respaldo: si no hay `animation-timeline`, el script de scroll de la maqueta basta (es JS + rAF, no depende de CSS nuevo).
- Hook sugerido: `useScrollProgress(pathRef)` que escribe `--fill` y marca `is-lit`; `passive` scroll + `ResizeObserver` + `document.fonts.ready`.

### Qué cambia en el código
`pages/Home.tsx` (sección nueva, sin `ringsec` ni `#services` viejo), componente nuevo `components/FamilyCare.tsx` + `styles/family-care.css` (copiar el bloque `<style>` de la maqueta, quitar la nota), borrar los estilos viejos al final. El botón blanco→medic es de Frontend 1.

---
## B · Seguros · «La tarjeta» (Home `#insurance` + `/insurance-financing`)

### Idea
El objeto que el paciente trae a la cita es su **tarjeta del seguro**. La tarjeta (azul, con el logo oficial y un chip) **es el buscador**: «Find your plan» vive dentro de ella, y a su lado el muro de 24 logos. Sin cuadrícula de líneas, sin focos, sin franja clara, sin lista A–Z, sin preguntas y respuestas, sin «+» (todo lo descartado en `docs/diseno-aseguranzas*.md`). Se quita el encendido automático de fichas (movimiento que nadie pidió). SAHARA queda como banda debajo, con el mismo lenguaje de títulos grandes.

### Estructura
```
<section class="wrap ins" id="insurance" aria-labelledby="ins-h">
  <header class="ins__top"> <RevealText id="ins-h">{coverage.insurance.heading}</RevealText> <p class="ins__lead">{coverage.insurance.text}</p>  <Link class="tlink">{coverage.insurance.cta}</Link> </header>
  <div class="ins__grid">
    <InsurancePlans variant="home" />      // .ins-card (buscador) + .ins__side (muro, vacío, botón «Show all 24 plans»)
  </div>
  <div class="ins-out"> h2 {outOfTown.heading} acento «out of town?» · p · tlink externo (target _blank rel noopener) </div>
</section>
```
`InsurancePlans` (cambios): prop `variant: 'home' | 'full'`. `home`: renderiza `.ins-card` (logo `var(--logo-img)`/logo.png con `alt=""`, chip decorativo `aria-hidden`, label, input, `role="status"`) y el muro **colapsado** (12 en ≥960, 9 en ≥560, 8 en celular) con botón `aria-expanded` «Show all 24 plans / Show fewer plans» (`aria-controls` del muro). Escribir en el buscador busca en los 24 aunque esté colapsado y oculta el botón. `full` (paso 1 de `/insurance-financing`): el `.ins-find` simple de hoy y el muro completo, sin botón. Se borran: `IntersectionObserver` del ciclo, `setInterval`, `useMotionPaused` del ciclo, `data-lit`, `ins-plan__clip/glow/ring`, `@property --ins-angle`, keyframes `ins-spin/drift`. Se mantienen: `normalize`, `countAll/Some/None`, estado vacío con `clinic.phone`, `showAll`, `alt=""` + nombre visible.

### Medidas
| Pieza | 1440 | 375 |
|---|---|---|
| Titular «Insurance» | Newsreader 400 `clamp(44px,6vw,88px)` lh 1 | 44 px |
| Rejilla | 5fr / 8fr, gap clamp(24,4vw,56) | 1 columna: tarjeta, muro, SAHARA |
| Tarjeta | radio 24, padding clamp(22,2.2vw,30), min-height clamp(250,22vw,300); fondo degradado `#2a5ea8→#15386f` + luz `--color-medic-soft` arriba a la derecha; borde 1px blanco .28; sombra 0 30 60 -30 | ancho completo |
| Logo / chip | logo alto clamp(46,4vw,58); chip 48×36 radio 9, líneas blancas .5 | igual |
| Marca de agua | `logo-star.png` al 12 % abajo a la derecha, recortada por la tarjeta | igual |
| Input | mismos valores que hoy (52 px, radio 14, fuente 17) | igual |
| Muro | 4 columnas, gap 12 (3 columnas entre 560 y 959) | 2 columnas, gap 10 |
| Ficha `.ins-plan` | alto 104, radio 14, blanca; logo `min(calc(40px*sqrt(ar)),128px)` tope alto 46; nombre 12 px/1.25 peso 600 | igual |
| Botón mostrar todo | 48 px, píldora borde `--color-line-ui`; hover: fondo `--color-medic`, texto noche | ancho completo |
| SAHARA | banda 2 columnas con línea arriba `--color-line-ui`; h2 `clamp(32px,4vw,56px)` | 1 columna |

Esquinas: tarjeta 24 / fichas 14 / input 14 (el input va sobre la tarjeta, ya a distancia > 14 del borde).

### Estados
| Estado | Qué se ve |
|---|---|
| Inicial | tarjeta + muro colapsado; contador «24 plans on our list» |
| Escribiendo | solo las fichas que coinciden (anillo 2 px `--color-medic`), muro completo aunque estuviera colapsado, botón oculto, «N plan(s) match “q”» |
| Sin resultados | muro oculto; `.ins-empty` con «We do not see “q” on our list yet.», botón de llamar (`clinic.phone`, no escribir el número a mano) y «Show all plans» (limpia y devuelve foco al input) |
| Abierto | 24 fichas; botón dice «Show fewer plans» |
| Hover (mouse) | ficha sube 3 px, sombra con el color de la marca (`--brand`) y barrita inferior de ese color; las fichas no son enlaces, no cambian el cursor |
| Foco | input con anillo `--color-medic-soft`; botón y enlaces con el foco global |
| Sin JS | los 24 logos visibles; el buscador queda inerte (como hoy) |
| Imagen cargando | altura fija de ficha, no salta nada (`loading="lazy"`) |

### Movimiento (plan)
- **Momento orquestado único:** al entrar en pantalla (una vez, IntersectionObserver, `threshold .25`) la tarjeta sube y aparece (500/700 ms) con un brillo que la cruza (1.1 s) y las fichas se **reparten desde la tarjeta** como cartas sobre la mesa: de `translate(-90px,-30px) rotate(-6deg)` y opacidad 0 a su lugar, 550 ms `--ease`, 28 ms de retraso entre fichas (12 visibles ≈ 1.2 s en total; las de «Show all» entran después, 20 ms de escalón).
- **Respuestas a la acción:** escribir (anillos y contador), hover de ficha, abrir/cerrar el muro.
- Quieto: `prefers-reduced-motion`, `data-motion-paused`, `?static` → todo visible, sin brillo ni reparto. Solo `transform`, `translate`, `rotate`, `opacity`, `box-shadow`.

### Qué cambia en el código
`components/InsurancePlans.tsx` (variantes, sin ciclo), `pages/Home.tsx` (bloque `cov-sec`: titular, tarjeta, SAHARA), `pages/Insurance.tsx` (pasar `variant="full"`), `styles/insurance.css` (reemplazar `.ins-wall/.ins-plan` por el bloque de la maqueta; los estilos `.cov*` de site.css pasan a este archivo y se borran de site.css al final). Textos nuevos: ninguno (se usan `coverage` e `insuranceText`); sí son nuevos «Show all 24 plans» y «Show fewer plans» (por aprobar; el 24 sale de `insurers.length`).

---
## Impeccable critique (revisión de la propia propuesta, mirando las capturas)
| Heurística | A (estrella) | B (tarjeta) |
|---|---|---|
| Jerarquía | titular → nombres → texto; el ojo sigue el hilo | titular → tarjeta (único elemento de color) → fichas blancas |
| Un solo momento memorable | la estrella que enciende los grupos | la tarjeta-buscador y el reparto |
| Consistencia con el sitio | mismos tokens, menta en palabras, medic en luz | igual; input y fichas igual que hoy |
| Hallazgos corregidos al revisar | flechas espejo en el lado izquierdo apuntaban hacia afuera: ahora todas apuntan a la derecha; en celular el botón queda al final | el botón de «mostrar todo» no se ocultaba al escribir (`display:flex` ganaba a `hidden`): corregido con `.ins-more[hidden]` |
| Riesgos que quedan | zigzag deja huecos en pantallas de 760 a 960 (columnas 1fr 88px 1fr se angostan): revisar en 800; texto «por llegar» al 50 % solo con JS | los logos de HealthComp y Dental Health Services se ven pequeños (son así en el archivo) |
| Prueba del gemelo | ¿otra clínica podría tener esto? No sin la estrella de Luminous ni la cruz medic; el zigzag solo no bastaría, la estrella viajando sí | la tarjeta con el logo real y la marca de agua de la estrella es de Luminous; un muro de fichas por sí solo lo tendría cualquiera |
| Anti-plantilla | sin números 01/02, sin tarjetas iguales con sombra gris, sin etiquetas en mayúsculas | sin degradados decorativos fuera de la tarjeta (el degradado es el objeto) |

## No verificado
- Movimiento solo visto por estados congelados (`?p=`), no grabado en video; en navegador real puede variar el tiempo.
- Contraste del texto al 50 % calculado, no medido; el resto usa tokens ya medidos.
- 800 px de ancho (zona de transición) no capturado.
- Dónde exactamente va «See all services» en Nakeji: no lo pude confirmar (ahí va centrado debajo del carrusel); se tomó «segunda hilera» como la fila 2 del zigzag.
- Cómo se ve con el menú fijo arriba (la maqueta no lo trae).
