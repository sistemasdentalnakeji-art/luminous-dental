# Tercera ronda 23-11-2026 · Hoja para Frontend 1 (puntos 1, 2 y 5 de la dueña)

Autor: UI-UX 1. Estado: PROPUESTA para la dueña (no programada; no se tocó `apps/web`).
Maquetas en `docs/lienzo/tercera-ronda-23nov/` (HTML estático; `?static=1` quita el movimiento, `?i=0..4` elige pestaña):
- `servicios-destacados.html` la tarjeta completa (1440 y 375)
- `iconos-cristal.html` el ícono de cristal (5 dibujos, tamaños, anatomía)
- `jerarquia-titulos.html` los dos títulos y la tabla de medidas
- `cristal.css` valores del ícono (se copian tal cual); `base.css` solo para la maqueta.
- Capturas en `capturas/` (1440 y 375; las de 375 salen de `movil.html`, marco de 375 px). `ref-actual-inicio-1440.png` es la página de hoy.
- Ningún token ni color nuevo: todo sale de `tokens.css`. En la maqueta la figura 3D es una captura de hoy (pestaña 1) o un marcador (pestañas 2 a 5): en producción va `ResultFigure`.

---
## 1 · Servicios destacados · pestañas a la izquierda

### Idea
Una sola tarjeta de vidrio, fija, con tres zonas: **riel de pestañas** (lista vertical, izquierda) · **texto** · **ventana de la figura**. Lo que la dueña veía raro: el diente flotaba sin marco, con el botón de pausa suelto, y las flechas y pastillas debajo parecían otra pieza. Ahora la figura vive en una **ventana propia** (borde de luz, fondo azul, sombra de apoyo bajo el modelo) y el botón de pausa es la esquina de esa ventana. Se quitan las dos flechas circulares y la fila de pastillas: el riel hace de navegación y la barra con «1 / 5» queda abajo del riel. Se conserva: vidrio, tarjeta sin inclinación, azul medicina, letras grandes, carrusel por pestañas con teclado.

```
1440 (card 1312 x ~590)
┌──────────────┬───────────────────────────────┬──────────────────────────┐
│ ▌Braces & ›  │ [gem] ORTHODONTICS            │ ┌──────────────────────┐ │
│  Implants    │ Invisalign & Braces           │ │ figura 3D        (II)│ │
│  Dentures    │ frase                         │ │      ventana         │ │
│  Veneers     │ [chip] [chip]                 │ └──────────────────────┘ │
│  Whitening   │ [View service →]              │                          │
│ ━━━━  1 / 5  │                               │                          │
└──────────────┴───────────────────────────────┴──────────────────────────┘
375: pestañas en fila (se desliza) / ventana figura 4:3 / gem + grupo / título / frase / chips / botón ancho
```

### Estructura (cambia `FeaturedServices.tsx` + `Carousel.tsx`, variante `carousel--services`)
```
<div class="sc" role="region" aria-roledescription="carousel" aria-label="Featured services" style="--i:{actual}">
  <div class="sc__rail">                         // PRIMERO en el DOM: el orden de Tab sigue al visual
    <ul class="sc__tabs" aria-label="Slides of Featured services"> <li><button class="sc__tab" aria-current>nombre + flecha ›</button></li> x5 </ul>
    <div class="sc__count" aria-hidden><span/><b>1 / 5</b></div>
  </div>
  <div class="sc__view"><ul class="sc__track" tabindex=0> <li class="sc__slide" data-on?> body + fig </li> x5 </ul></div>
</div>
slide:  body = eyebrow(gem + grupo) · h3 · p · chips · botón      fig = ventana (ResultFigure + botón de pausa)
```
- La pista sigue siendo la de hoy (scroll-snap horizontal, flechas ← → con el foco en la pista, deslizar en celular). Solo se mueve la fila de pestañas: sale de `.carousel__controls`, se vuelve vertical y se guarda `--i` (índice actual) en el contenedor.
- Se **quitan** los botones anterior/siguiente (`carousel__button`) y la barra `carousel__progress` de esta variante; el contador «n / 5» pasa al pie del riel. La variante de reseñas no cambia.
- El indicador que se desliza es `.sc__tabs::before` (sin elemento extra): `transform: translateY(calc(var(--i) * 70px))` (64 de alto + 6 de hueco).

### Medidas (px CSS)
| Pieza | 1440 | 1024 | 768 | 375 |
|---|---|---|---|---|
| Tarjeta | radio 28, mín. alto `clamp(540px,41vw,600px)`, vidrio actual | igual, sin mín. | igual | radio 24, alto = diapositiva más alta |
| Riel | `clamp(250px,21vw,300px)` = 300; padding `clamp(20,2vw,28)` / `clamp(14,1.3vw,18)`; filo derecho `--color-line` | 220 | 220 | fila arriba, padding 10, filo abajo |
| Pestaña | alto 64, padding 0 18, radio 16, Figtree 600 `clamp(17px,1.3vw,20px)`, color `--color-text2` al 82 %, activa 100 % blanco | 17 | 17 | alto 48, píldora, 16 px, `nowrap`, fila con desvanecido de 44 px a la derecha |
| Indicador | alto 64, radio 16, relleno medic .14, borde medic .6, sombra medic | igual | igual | no hay: la pestaña activa lleva ella misma relleno y borde |
| Contador | barra 3 px (medic a medic-soft, `scaleX((i+1)/5)`) + «n / 5» 14 px `tabular-nums`, al pie del riel | igual | igual | oculto |
| Texto (`body`) | padding `clamp(24px,2.8vw,44px)`; columnas texto/figura 5fr / 6fr | figura arriba, texto abajo | igual | figura arriba |
| Grupo (eyebrow) | gem + Figtree 600 15 px, mayúsculas, ls .14em, `--color-medic-soft` | igual | igual | 14 px |
| Título `h3` | Newsreader 400 `clamp(30px,3.3vw,50px)` lh 1.06 ls -.02em, `text-wrap:balance` | 34 | 32 | `clamp(32px,9vw,40px)` |
| Frase | `clamp(18px,1.5vw,22px)` lh 1.5, `text-wrap:pretty` | 18 | 18 | 18 |
| Chips | máx. 3; padding 8/14/8/8; **radio 20** (no 999: los de dos líneas se veían como globo); `clamp(16px,1.2vw,18px)` | 16 | 16 | 15.5 |
| Botón `View service` | `.btn` blanco actual, alto 56, padding 0 32 | igual | igual | ancho completo |
| Ventana de la figura | margen `clamp(14px,1.6vw,24px)`, radio 22, borde blanco .12, fondo radial `rgba(47,99,173,.6)` a `rgba(10,21,41,.4)`, sombra interior de piso; elipse de apoyo bajo el modelo (22 % a 22 %, bottom 11 %, alto 26, blur 4) | alto mín. 300 | 300 | 4:3, margen 12 |
| Pausa | círculo 44, arriba derecha 12 px, borde `--color-line-ui`, fondo noche .55 | igual | igual | igual |

### Estados
| Estado | Qué se ve |
|---|---|
| Reposo | pestaña activa con indicador y flecha ›; las otras al 82 %; figura animándose solo con su diapositiva a la vista |
| Hover de pestaña | opacidad 100 % (150 ms) |
| Presionada | `scale(.98)` |
| Foco de pestaña | anillo 3 px `--color-medic`, `outline-offset:-3px` (dentro, para que el riel no lo recorte) |
| Foco en la pista | mismo anillo, radio 24 |
| Cambio de pestaña | el indicador baja o sube 350 ms (`--ease`); la pista se desplaza; el contador y la barra siguen; el gem de la diapositiva nueva hace su destello |
| Movimiento reducido / pausa global | sin destello, sin transición del indicador (salta), pista con `behavior:auto`, figura quieta |
| Sin JS | no aplica (todo es React); si la figura aún no cargó, la ventana queda con su fondo (sin salto de alto) |
| Carga, vacío, error, permiso | no aplican (cinco diapositivas fijas de `services.ts`) |

### Teclado y lectores
- Tab entra al riel, luego la pista, luego el botón de la diapositiva (orden visual).
- En el riel: **↑ / ↓** (y ← / →) mueven el foco y activan la pestaña; **Home / End** primera y última. Un solo `tabindex=0` en la pestaña actual (roving) es opcional; con las 5 en el orden de Tab también cumple.
- Se conserva `aria-current` en la pestaña activa. El gem es `aria-hidden` (el nombre ya está en texto).
- Objetivos ≥ 44 px (riel 64, celular 48).

### Movimiento
Un solo momento propio: el indicador que se desliza (responde a la acción) y el destello único del gem al activarse. Nada continuo ni automático. Todo con `transform`/`opacity`.

### Qué cambia en el código
`FeaturedServices.tsx` (nueva estructura de tarjeta, gem, ventana de figura), `Carousel.tsx` (variante con riel: pestañas antes de la pista, `--i`, teclas ↑ ↓ Home End; quitar botones y progreso solo en esta variante), `styles/featured.css` (reemplazar `.service-card*`, `.carousel__tab*`, `.carousel__progress` de servicios por el bloque de la maqueta), `features/figure/figure.css` y `ResultFigure.tsx` (el botón `result-pause` se ancla a la esquina de la ventana; no cambia su lógica).

---
## 2 · Ícono de cristal (reemplaza `.service-card__icon`)

Hoy: baldosa 52 px de vidrio plano con línea fina. Nuevo: **baldosa de vidrio tallado** de 60 a 76 px.
- Capas: base degradada 145° (blanco .30 → menta .12 → azul .30) con desenfoque 12 px y `saturate(1.5)`; **facetas** (dos franjas diagonales de bordes duros); **placa esmerilada** en la esquina baja derecha (el dibujo se ve a través, desenfoque 2.5 px, filo de luz); borde de luz arriba (inset blanco .6) y medicina abajo; sombra de contacto y halo medicina.
- **Un dibujo propio por servicio** (5, claves por `figure`: `braces`, `implants`, `bridges`, `crowns`, `whitening`; hoy `sparkle` repite en velos y blanqueamiento): relleno blanco-medicina translúcido, filo blanco a menta, sombra azul.
- Tamaños: 76 (≥1440), 60 (1024), 56 (celular), 44 mínimo. Radio = 30 % del lado.
- Movimiento: **un destello** (franja blanca .55 inclinada, 0.9 s, una vez) cuando su diapositiva pasa a ser la actual (`[data-on]`). Sin anillo giratorio continuo (Nakeji gira el contorno con el cursor; aquí se reinventó como cristal quieto con un destello). Quieto con `prefers-reduced-motion`, `data-motion-paused` y `?static`.
- Código: componente `CrystalIcon` (`<span class="gem"><svg viewBox="0 0 24 24"><use href="#g-<id>"/></svg><i/></span>`), los cinco `<symbol>` (en `glifos.html.part` de la carpeta de maquetas, o pasarlos a `Icon.tsx` como paths) y los gradientes `#gem-s` / `#gem-f` definidos una sola vez en la página. Estilos: `cristal.css` completo, sin cambios.
- El ícono de la lista de pestañas NO lleva gem (el riel es solo texto, para no repetirlo cinco veces).

---
## 3 · Jerarquía de títulos (la dueña quiere «Featured services» por encima)

| Pieza | Token | 375 | 1440 | 1920 |
|---|---|---|---|---|
| **Featured services** (H2) | `font:400 clamp(44px,7.6vw,112px)/1 Newsreader; ls -.03em; text-wrap:balance` | 44 | 109.4 | 112 |
| **Dental care for the whole family** (H2 de `FamilyCare`) | `font:400 clamp(34px,5.6vw,84px)/1 Newsreader; ls -.03em` | 34 | 80.6 | 84 |
| Razón Featured / Family | | 1.29 | 1.36 | 1.33 |
| h3 de grupo de `FamilyCare` (baja de 68) | `clamp(28px,3.4vw,50px)` | 28 | 49 | 50 |
| Título de tarjeta (Featured) | `clamp(30px,3.3vw,50px)` | 32 | 47.5 | 50 |
Escalón: Featured (109) > Family (81) > h3 de grupo y de tarjeta (~48). El tope de 112 se alcanza a 1474 px y el de 84 a 1500 px.

Qué cambia:
- `site.css`: `.featured .h2` pasa de `clamp(36px,4.4vw,58px)` a `clamp(44px,7.6vw,112px)` lh 1, ls -.03em (la raya de 88×3 bajo el título se queda). No cambiar `.h2` global.
- `family-care.css`: `.fam__title` de `clamp(46px,7.6vw,112px)` a `clamp(34px,5.6vw,84px)` y lh 1; en la regla de 759 px cambiar `clamp(42px,12.6vw,60px)` por `clamp(34px,9vw,40px)`; `.fam__link h3` de `clamp(34px,4.6vw,68px)` a `clamp(28px,3.4vw,50px)` (si no, el h3 casi igualaría al título).
- Efecto en 1440: el título de Family baja de 112 a 81 px y sus grupos de 66 a 49; el de Featured sube de 58 a 109. Revisar que la variable `--row` de `.fam__path` (`clamp(170px,13.5vw,200px)`) siga cómodo con h3 más chicos (queda más aire; si sobra, bajar a `clamp(150px,12vw,180px)`).

---
## Pruebas hechas por diseño (ver abajo en la respuesta) · no verificado
Contrastes de pestañas inactivas (82 %) calculados, no medidos; el desvanecido del borde derecho de pestañas en 375 se ve en captura pero no en un celular real; la figura real y su botón de pausa no se montaron (marcador); `backdrop-filter` anidado del gem probado solo en Edge/Chromium (Safari por probar).
