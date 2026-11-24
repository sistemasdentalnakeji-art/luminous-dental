# Revisión de código y código muerto · 2026-11-23 · QA 4

Modo ponytail encendido. Solo reporte: no se borró ni arregló nada.
Alcance: `apps/web/src` y `apps/web/public`, con los cambios sin commit contra HEAD (5634bf5).

## Cómo se comprobó
- **Observado (estático):** `tsc --noEmit -p apps/web/tsconfig.app.json` sin errores. `oxlint src`: 5 avisos, ninguno de código muerto (ver «dudas»).
- Cada clase CSS, keyframe, token, export, clave de `content/*.ts` y archivo de `public/` se buscó con grep/script en JSX, TS, JS del motor de figuras, SVG e `index.html` (comentarios quitados antes de buscar). Las clases construidas con `${}` (`rv--${mode}`, `loc__road--${kind}`, `dropdown--${id}`) se trataron como vivas.
- **No verificado en navegador:** no hay Playwright instalado en este equipo y no se instala sin permiso. Los bugs de comportamiento salen de leer el código; cada uno dice «no ejecutado».
- `npm run build` no se corrió: sobrescribiría `apps/web/dist` mientras hay un servidor en :5181. No hay pruebas automáticas en el repo (ni script `test`); `react-testing` no aplica hasta que existan.

## 1. Borrar (con prueba)

### CSS sin uso (prueba: la clase no aparece en ningún `className`, string, template ni SVG)
| Dónde | Qué | Prueba |
|---|---|---|
| `styles/site.css:156-157` y `:247` (`.const{display:none}`) | `.const` y `.const line`: la constelación del anillo del doctor | Ningún JSX la usa; `About.tsx` no la pinta. Es resto de la sección `#doctor` borrada hoy |
| `styles/site.css:150` | Comentario «doctor en un arco» (ya no hay arco; `.doc*` es solo de About) | Renombrar a «doctor (About)» |
| `styles/site.css:273` | `.contact-card` | 0 usos en `.tsx` |
| `styles/site.css:274` | `.hint` | 0 usos como clase (`ui.hint` y `T.hint` son texto) |
| `styles/site.css:289,290,327,328,376` | `.blog-chips` (5 reglas) | 0 usos; `Blog.tsx` usa `.blog-topics` e `.hub-index` |
| `styles/site.css:136` | Solo el selector `.h2--line::after` (la regla sigue viva por `h1.h2` y `.featured .h2`) | `RevealText` pone `rv--line`, nunca `h2--line` |
| `styles/featured.css:29-30` | `.service-card__list` (grid) y su `li` | Los pisa por completo `featured.css:56-57` (flex): `display`, `gap`, `margin-block` |
| `styles/featured.css:25` | `position:relative` de `.service-card__media` | Repetido en `featured.css:52` |
| `styles/featured.css:42` | `border:0;border-bottom…` y `transition-property` de `.carousel__tab` | Los pisa `featured.css:73` (`border:1px solid transparent`, otra transición) |
| `styles/reviews.css:104` | `.contact-item{padding-block:8px}` | Lo pisa `reviews.css:124` (6px) |
| `styles/footer-city.css:1` | Comentario que apunta a `public/_maquetas/recorrido/index.html` | Esa carpeta se borró hoy |

### Tokens, exports y contenido
| Dónde | Qué | Prueba |
|---|---|---|
| `styles/tokens.css:17` | `--color-mint-ink` | 0 `var(--color-mint-ink)` en CSS, TS o JS |
| `content/services.ts:139` | `serviceBySlug` | Solo existe su definición (grep en todo `src`: 1 resultado) |
| `content/home.ts:103` | `doctor.photo` (POR CONFIRMAR) | `About.tsx` usa `doctor.photoAlt` y la foto directa; `photo` sin lector |
| `content/home.ts:115` | `smile.gallery: null` | Sin lector |
| `content/home.ts:120,121,139` | `reviews.heading`, `reviews.note`, `reviews.cta` | Solo `reviews.items` se lee (`content/reviews.ts:18`). El texto lo dan `content/reviews.ts` y `Reviews.tsx` |
| `content/smileCases.ts:1` | Comentario «Casos en órbita» | La órbita ya no existe |
| Quitar `export` (solo se usan dentro de su archivo): `config/booking.ts:38` `phoneDigits`, `:47` `AppointmentErrors`; `config/schedule.ts` `addDays`, `weekday`; `content/locationMap.ts` `RoadKind`, `Road`, `MapLabel`; `content/services.ts:9,10` `FigureId`, `IconId`; `content/smileCases.ts:3` `SmileCase`; `features/booking/TimePicker.tsx:6` `TimeGroup`; `lib/router.tsx:24` `navigate` | Exports sin importador fuera del archivo | Prioridad baja |

### Archivos de `public/`
Ninguno sobra. Usados: `dr-hahn.jpg` (About), `favicon.svg` (index.html), `logo.png` (NeonLogo, Reviews, InsurancePlans), `logo-star.png` (InsurancePlans), 4 fotos de `smiles/` (smileCases.ts), 24 `.webp` de `insurers/` (insurers.ts, los 24 nombres coinciden). `Logo.tsx`, `_maquetas/`, `.logo*` y `--logo-img/--logo-star` ya no existen y nadie los referencia.

### Restos de versiones viejas: barrido
Sin restos: anillo del doctor en JSX/CSS (`ringsec`, `.arc`, `.l-gen`…), órbita, cartel de neón grande y poste, franja de la ciudad (`fc-sweep`), encendido de seguros (`data-lit`, `ins-angle`, `setInterval`, `ins-plan__clip/glow/ring`), `Logo.tsx`. Los 21 `@keyframes` tienen su `animation` viva. Los únicos restos son `.const`, los comentarios de arriba y `doctor.photo`.

## 2. Bugs

| # | Archivo:línea | Cómo falla | Gravedad |
|---|---|---|---|
| 1 | `content/smileCases.ts:6,9` | Las 4 fotos del antes/después del héroe son `'/smiles/…'` (ruta absoluta). Con `PAGES_BASE=/luminous-dental/` (GitHub Pages) apuntan a `/smiles/…` y dan 404: el héroe sale sin fotos. Todo lo demás usa `import.meta.env.BASE_URL`. En Vercel (base `/`) funciona. No ejecutado | Media (alta si se publica en GitHub Pages) |
| 2 | `components/Header.tsx:65` + `Layout.tsx:141-142` | El panel del celular pone `inert` solo a `main, footer, .skip`. `ActionBar` (≤767 px, pasados 600 px de scroll) y `FloatingContact` quedan fuera, así que Tab sale del panel hacia ellos. El comentario del código dice «mantiene Tab adentro». No ejecutado | Media (accesibilidad, 2.4.3) |
| 3 | `components/Reviews.tsx:105-107` | La segunda fila repite las mismas 3 reseñas y las dos filas son accesibles: un lector de pantalla oye 6 tarjetas (3 repetidas, con dos «Read on Google» por reseña). `Marquee` solo oculta la copia interna de cada fila | Media-baja |
| 4 | `features/booking/BookingForm.tsx:44,107` | Honeypot `company`: si el autocompletado del navegador lo llena (`autoComplete="off"` no siempre se respeta), el envío termina en `return` sin mensaje ni estado. La persona cree que envió. No ejecutado | Media-baja |
| 5 | `features/booking/TimePicker.tsx:43` | El `useEffect` sin dependencias hace `scrollIntoView({block:'nearest'})` en cada render. Al pasar el mouse por una hora (`onPointerEnter` → `setActive`) puede mover la página o la lista; en celular la página puede saltar al abrir | Baja-media |
| 6 | `features/booking/BookingForm.tsx:113` | El `<p class="err" id="e-consent">` se dibuja siempre con el texto y sin `role="alert"`, a diferencia de los otros campos (`:83`). Funciona porque el CSS lo oculta, pero el aviso no se anuncia al aparecer; solo al enfocar el checkbox | Baja |
| 7 | `features/booking/BookingForm.tsx:41,117` | Tras un envío `sent` el botón queda desactivado hasta recargar. No se puede pedir una segunda cita (otro familiar) en la misma visita. Puede ser decisión de diseño: ver «dudas» | Baja |
| 8 | `components/FamilyCare.tsx:52` | `document.fonts.ready.then(schedule)` no se cancela al limpiar el efecto. Si `still` cambia (pausa) o la sección se desmonta antes, corre un `update` viejo (con el `still` anterior) y llama `setLit`/escribe `--p` | Baja |
| 9 | `components/FamilyCare.tsx:40,44` | Con un solo grupo `y1 - y0 = 0` y `p` sale `NaN`. Hoy hay 4 grupos, así que no ocurre | Baja (latente) |
| 10 | `components/FamilyCare.tsx` + `styles/family-care.css:32` | «See all services» es el último elemento del DOM pero se ve en la fila 2 (entre Cosmetic y Orthodontics): el orden de Tab no coincide con el visual (2.4.3) | Baja |
| 11 | `components/WhatsAppLink.tsx:8` y `Layout.tsx:112` | `` `${className} wa-soon` `` sin `className` genera `class="undefined wa-soon"` | Baja |
| 12 | `components/Header.tsx:199` | `onClick` ignora el clic si `hovering.current` es true. Si el mouse entró a «Services» a ≥1181 px y la ventana se estrecha sin `pointerleave`, el botón del panel móvil no abre el submenú. Raro; no ejecutado | Baja |
| 13 | `components/Layout.tsx:47` | En páginas sin `#appointment` (`NotFound`), el `MutationObserver` sobre todo `document.body` queda conectado para siempre y corre en cada cambio del DOM | Baja |
| 14 | `features/booking/TimePicker.tsx:79` | `aria-controls={listId}` apunta a un id que no existe mientras la lista está cerrada | Baja |

Revisado sin hallazgos: limpieza de listeners en `Header` (keydown, pointerdown, matchMedia, timers), `TimePicker` (pointerdown), `FooterCity` (IntersectionObserver), `InsurancePlans` (observer y timeout), `FamilyCare` (scroll, ResizeObserver, matchMedia). Reglas de citas (`config/schedule.ts`, `BookingSchedule.tsx`): rango mín./máx. en hora de Las Vegas, día cerrado/festivo se vacía con aviso, hora se limpia si ya no existe, `checkSlot` repite la regla en `checkAppointment` y en `sendAppointment`. Cortes del muro de seguros (8/9/12) coinciden entre `collapsedCount()` y los `@media` de `insurance.css`. Punto de corte del menú (1181 px) coincide entre `Header.tsx:16` y `site.css`.

## 3. Dudas (para el Jefe o la dueña)
1. **Segundo envío (bug 7):** ¿se quiere permitir otra solicitud tras `sent`? Hoy no se puede sin recargar.
2. **Reseñas repetidas (bug 3):** la dueña pidió siempre 2 filas. ¿Se acepta ocultar la 2.ª fila a lectores de pantalla (`aria-hidden`) para no leer lo mismo dos veces?
3. **`--anatomy-weight`, `--anatomy-red/green/blue`** (`features/figure/figure.css:24,30-32`) se leen pero no se definen en ningún CSS ni en `engine.js`. `stroke-width:var(--anatomy-weight)` queda inválido (vale 1). No sé si es intencional ni si el motor emite esos `data-tone`. No verificado en navegador.
4. **`.neon` base en `footer-city.css:34-40`:** el logo del header depende de esas reglas (y las pisa en `site.css:64-65`). Funciona, pero un cambio en el pie rompe el header. ¿Mover a un archivo común?
5. **`--p` compartido:** `@property --p` (footer-city.css:2) lo registra el pie, y `FamilyCare` también escribe `--p` en su contenedor. No chocan hoy; si alguien cambia el tipo, se rompe la estrella.
6. **Redibujo del pie al reanudar:** con la pausa activa al cargar, `.fcity` queda sin animación; al pulsar «Play» `fc-draw` arranca de cero (la ciudad se borra y se dibuja otra vez). No ejecutado.
7. **`TimePicker.tsx:65` (Tab):** cierra la lista sin mover el foco; la lista enfocada se desmonta. No sé si el navegador continúa bien desde el botón. Además el foco pasa a `role="listbox"`; el patrón APG «select-only combobox» deja el foco en el combobox con `aria-activedescendant`. No ejecutado con lector de pantalla.
8. **Avisos de oxlint:** `TimePicker.tsx:94` (reasigna `n` en el render; seguro porque se redeclara en cada render) y `Layout.tsx:38` (`setFormInView(false)` en un effect). Los otros 3 son «only-export-components» (`router.tsx`, `NeonLogo.tsx`): no son errores.
9. **Claves de datos sin lector** (`content/clinic.ts`: `emergencies`, `googleMaps`, `languages`, `officialContactPage`, `officialTopBar`; `config/reviews.ts`: `profileUrl`): parecen datos de referencia de `docs/datos.md`. No los marco como «borrar».
10. **`logo.png` (75 KB, 640×365)** se descarga una vez y se usa a ~140 px en header y pie (dos `<img>` cada uno). Una versión menor ahorraría peso. No medido.
11. **Reducir movimiento:** `FamilyCare.tsx:17-26` y `ResultFigure.tsx:93` repiten la lectura de `prefers-reduced-motion`; `lib/motion.ts` no la ofrece. Duplicado menor.

## Veredicto
Sin errores de tipos. Código muerto: poco y concentrado en `site.css` (restos del anillo del doctor y del blog) más pisadas en `featured.css` y `reviews.css`. Lo más serio es el bug 1 (fotos del héroe bajo la base de GitHub Pages) y el bug 2 (Tab sale del menú móvil). Los bugs de comportamiento quedan por confirmar en navegador cuando se levante la pausa de QA.
