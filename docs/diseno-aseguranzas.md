# Diseño nuevo de /insurance-financing · «Marquesina»

Estado: PROPUESTA para aprobación de la dueña (no programada). Autor: Diseñador UI-UX 1 · 20-11-2026.
Reemplaza el tablero copiado de Dental Nakeji (cuadrícula de líneas, «+» dorados, línea de luz azul).

## 1. Idea
Los 24 logos van sobre «placas» claras, como los paneles de un letrero de Las Vegas, dentro de una marquesina: un marco de focos dorados que rodea el panel (los mismos focos del letrero «Fabulous Las Vegas» que ya está en Contacto). Sin cuadrícula, sin líneas, sin luz que corre. Arriba hay un buscador, «Find your plan»: el paciente escribe su seguro y quedan solo las placas que coinciden; si no está, el sitio le dice que llame o escriba. Lo memorable es UNA cosa: el marco de focos. Todo lo demás es quieto y sobrio.

## 2. Estructura (página y componente)
```
<section class="insurers" aria-labelledby="ins-grid-h">
  <h2 class="insurers__title" id="ins-grid-h">      (ya existe, no cambia)
  <InsurancePlans />                                (componente nuevo, abajo)
  <p class="insurers__note">                        (ya existe)
  <p class="ins-pay">                               (ya existe)
```
Dentro de `InsurancePlans`:
```
<div class="ins-find">
  <label for="ins-q">Find your plan</label>
  <input id="ins-q" type="search" autocomplete="off" placeholder="Type your plan, for example Cigna" aria-describedby="ins-count">
  <p id="ins-count" class="ins-count" role="status">24 plans on our list</p>
</div>
<div class="ins-board">                              (marco de focos = ::before y ::after, decorativos)
  <ul class="ins-plans" role="list" aria-labelledby="ins-grid-h">
    <li class="ins-plan" [hidden]><img ...></li>   x24
  </ul>
  <div class="ins-empty" hidden>                     (estado «sin resultados», ver sección 5)
    <p>We do not see “{query}” on our list yet.</p>
    <p>Call or text us and we will check it with you.</p>
    <a class="btn" href={clinic.phone.href}>Call (702) 805-8688</a>   (usar el texto de home.footer.phone.label, no escribir el número a mano)
    <button type="button" class="tlink">Show all plans</button>
  </div>
</div>
```
Los `<img>` se quedan igual que hoy (misma ruta `insurers/<archivo>.webp`, `alt={nombre}`, width/height, `--ar`, lazy). Sin JS el buscador no funciona pero los 24 logos se ven (el estado inicial es la lista completa).

## 3. Medidas
Todo en px CSS. Tokens de `tokens.css`; no se agregan tokens nuevos.

| Pieza | Móvil 375 | Computadora 1280 |
|---|---|---|
| Buscador (`.ins-find`) | ancho 100% | max-width 440px, margen inferior 20px |
| Input | usar mismos valores que `input[type=text]` de site.css: min-height 52, radio 12, fuente 17 | igual |
| Panel (`.ins-board`) | padding 34px 16px; radio 28px | padding 44px 40px; radio 32px (igual que `.cov-out`) |
| Focos | punto de 5.5 px de diámetro cada 16 px, en una banda de 6 px a 7 px del borde | igual |
| Lista (`.ins-plans`) | flex, wrap, justify-content center, gap 10px | gap 14px |
| Placa (`.ins-plan`) | alto 72px, padding-inline 16px, radio 14px | alto 80px, padding-inline 20px, radio 14px |
| Logo (`img`) | ancho = `calc(var(--s) * sqrt(var(--ar)))`, --s 44px, tope 132px, alto auto | --s 54px, tope 168px |
| Resultado esperado | 2 a 3 placas por fila, unas 10 filas | unas 6 por fila, 4 filas |

Notas: la fórmula `--s * sqrt(--ar)` es la que ya usa el sitio, así cada logo ocupa un área parecida. El panel debe tener `min-height: 240px` para que no salte la página al filtrar. Esquinas concéntricas: panel 28 = placa 14 + ~14 de espacio, bien.

## 4. Colores (solo tokens)
| Uso | Valor |
|---|---|
| Fondo del panel | `linear-gradient(180deg, var(--color-surface), var(--color-surface-deep))` |
| Borde del panel | `1px solid var(--color-line)` |
| Resplandor suave detrás de las placas | `radial-gradient(closest-side, rgba(47,99,173,.35), transparent)` (el azul `--color-glow` que ya usa `.cov-out`), arriba a la derecha, solo decoración |
| Focos | `var(--color-gold)`; con brillo `drop-shadow(0 0 3px rgba(224,182,92,.55))` |
| Placa | `rgba(255,255,255,.94)` (igual que hoy: los logos son oscuros y necesitan fondo claro) |
| Placa que coincide con la búsqueda | anillo `box-shadow: 0 0 0 2px var(--color-gold)` solo mientras haya texto en el buscador |
| Textos del buscador y contador | etiqueta `#fff`; contador `var(--color-text2)` (más de 14:1 sobre el fondo) |
| Foco del teclado | el global de site.css (`:focus-visible` 3px dorado) y el del input (anillo azul claro); no cambiarlos |

Contraste: texto sobre panel, blanco / `--color-text2` sobre `#0d1c37`, pasa AA con mucho margen. Los focos son decorativos (no llevan información). El contraste de cada logo depende del logo, que no se toca; por eso van sobre placa clara.

## 5. Estados
| Estado | Qué se ve | Cómo |
|---|---|---|
| Inicial | 24 placas, contador «24 plans on our list», sin anillos dorados | query vacía |
| Escribiendo | solo las placas que coinciden (las demás con `hidden`), anillo dorado en las visibles, contador «3 plans match “uni”» (singular: «1 plan matches») | comparar sin mayúsculas, sin acentos y sin espacios: «blue cross» encuentra «Premera Blue Cross» |
| Sin resultados | las placas desaparecen y sale el bloque `.ins-empty` (texto en la sección 2); contador «No plans match “xyz”» | foco no se mueve solo |
| Mostrar todo | botón «Show all plans» limpia la búsqueda y devuelve el foco al input | |
| Foco con teclado | Tab llega al input, luego (si está visible) al botón de llamar y a «Show all plans». Las placas NO son enfocables (no son enlaces) | |
| Cargando imágenes | `loading="lazy"`; la placa ya tiene alto fijo, no salta nada | |
| Error | no aplica (todo es local, no hay red) | |
| Hover | las placas no cambian al pasar el mouse (no son clicables, no deben parecerlo) | |

Reglas de código importantes: `.ins-plan[hidden]{display:none}` (porque la placa usa `display:flex`); el contador es `role="status"` (lo leen los lectores de pantalla sin mover el foco); no usar `aria-live` en la lista.

## 6. Celular y computadora
- 375: buscador a todo el ancho; panel con 16px laterales de padding; placas centradas, 2 o 3 por fila. Los focos del marco quedan a 7 px del borde (no se salen). Sin scroll horizontal.
- 1280: buscador a la izquierda (440px), panel a todo el ancho del contenido; unas 6 placas por fila, la última fila centrada.
- Los 3 anchos intermedios (600, 960) no necesitan reglas: el `flex-wrap` se acomoda solo. Solo hay dos saltos de medida, en `min-width:960px` (padding, `--s`, alto de placa).

## 7. Movimiento
Un solo efecto, lento y decorativo: los focos de la marquesina se alternan (dos juegos de focos desfasados, uno brilla mientras el otro baja).
- Dos capas: `.ins-board::before` (focos A, posición `-5px -5px`) y `.ins-board::after` (focos B, desfasados 8px: `3px 3px`). Cada una es un anillo hecho con `radial-gradient(circle at 8px 8px, var(--color-gold) 0 2.7px, transparent 3.2px) <pos> / 16px 16px` y una máscara (`mask` con `content-box` + `mask-composite: exclude`; con `-webkit-mask-composite: xor`) sobre `inset:7px; padding:6px; border-radius:21px`.
- Animación: `@keyframes ins-bulbs{0%,100%{opacity:1}50%{opacity:.35}}`, 2.4s `ease-in-out infinite`; B con `animation-delay:-1.2s`. Solo cambia `opacity` (no hay destellos rápidos: menos de 1 cambio por segundo).
- `prefers-reduced-motion: reduce`: `animation:none; opacity:1` en las dos capas (marco completo encendido, quieto).
- Pausa de animaciones decorativas: ya la cubre la regla global `html[data-motion-paused] *::before, ::after { animation-play-state: paused !important }` de site.css; no hace falta código. La pausa deja los focos en la fase que estén (el mínimo de opacidad es .35, siempre visibles).
- Sin JavaScript de animación. Se borran el IntersectionObserver, los temporizadores y el SVG de la luz.
- Al filtrar no hay animación (los elementos aparecen y desaparecen al instante).

## 8. Textos nuevos (para aprobación; inglés, el idioma del sitio)
Agregar a `insuranceText` en `content/insurers.ts`:
```
findLabel: 'Find your plan',
findPlaceholder: 'Type your plan, for example Cigna',
countAll: (n) => `${n} plans on our list`,
countSome: (n, q) => `${n} ${n === 1 ? 'plan matches' : 'plans match'} “${q}”`,
countNone: (q) => `No plans match “${q}”`,
emptyTitle: (q) => `We do not see “${q}” on our list yet.`,
emptyText: 'Call or text us and we will check it with you.',
showAll: 'Show all plans',
```
Siguen sin decir «we accept»: la clínica no lo ha confirmado (docs/datos.md). `note` y `payment` no cambian. Estos textos no se pueden dejar como funciones en `as const` sin ajustar el tipo: usar un objeto normal o plantillas simples (decisión del programador).

## 9. Lista exacta de archivos
| Archivo | Cambio |
|---|---|
| `apps/web/src/components/InsuranceGrid.tsx` | Borrar y crear `apps/web/src/components/InsurancePlans.tsx` (nombre nuevo, ya no es una cuadrícula). Estado `query` con `useState`; `normalize = s => s.normalize('NFD').replace(/\p{M}/gu,'').toLowerCase().replace(/\s+/g,'')`; filtrar `insurers`; renderizar la estructura de la sección 2; botón «Show all plans» devuelve el foco al input con un `ref`. Sin `useEffect`, sin SVG. Quitar el comentario de cabecera que habla de Dental Nakeji. |
| `apps/web/src/pages/Insurance.tsx` | Línea 4: importar `InsurancePlans`; línea 31: `<InsurancePlans />`. El resto igual. Actualizar el comentario de cabecera (ya no es el tablero de Dental Nakeji). |
| `apps/web/src/content/insurers.ts` | Agregar los textos de la sección 8. La lista de 24 logos no cambia. |
| `apps/web/src/styles/insurance.css` | Líneas 1 a 11 y 44 a 45 (pasos, `.ins-head`, `.ins-sahara`, `.ins-pay`) se quedan. Reemplazar las líneas 12 a 43 (todo `.insurers__grid`, `__cell`, `__beams`, `__beam`, `@keyframes insurers-beam`, y los `@media` de columnas) por las clases `.ins-find`, `.ins-count`, `input[type=search]` (copiar la regla de `input[type=text]` de site.css, SIN editar site.css), `.ins-board`, `.ins-board::before/::after`, `.ins-plans`, `.ins-plan`, `.ins-plan[hidden]`, `.ins-plan img`, `.ins-empty`, `@keyframes ins-bulbs`, y un solo `@media (min-width:960px)`. Conservar `.insurers`, `.insurers__title` y `.insurers__note`. |
| `apps/web/src/main.tsx` | Sin cambios (ya importa `insurance.css`). |

No se tocan: `Layout.tsx` y `site.css` (los arregla otro agente), `Home.tsx` (no usa el tablero), `public/insurers/*`, git.

## 10. Revisión para quien programe (qué comprobar al terminar)
1. 375 y 1280 px, sin scroll horizontal; esquinas del marco de focos sin cortes (NO VERIFICADO: el anillo con máscara hay que mirarlo en pantalla; si las esquinas se ven mal, bajar el radio del `::before` a 18px).
2. Reducir movimiento activado: marco completo y quieto. Interruptor «Pause decorative animations» del pie: los focos se detienen.
3. Teclado: Tab pasa por el input y por los botones del estado vacío, con foco dorado visible; escribir «cigna», «blue cross», «xyz», borrar, «Show all plans».
4. Lector de pantalla: el contador se anuncia al escribir; las 24 imágenes tienen `alt` con el nombre del plan.
5. `npm run typecheck` y `npm run build` (la regla del dueño antes de publicar; no se sube nada sin su orden).

## No verificado
- No abrí la página en el navegador (solo leí el código y los estilos).
- El ancho real de cada logo con la fórmula (solo calculado a mano para unos cuantos).
- La lista de planes sigue POR CONFIRMAR con la clínica.
