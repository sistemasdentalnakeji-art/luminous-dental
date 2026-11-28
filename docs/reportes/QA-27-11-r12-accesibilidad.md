# QA ronda 12 · Accesibilidad y movimiento · 27-11-2026 · QA 2 (ld-qa-2)

Ponytail encendido (confirmado). Edge con playwright-core sobre Vite en puerto 5612 (cerrado). Sin tocar código ni commit. Scripts en el scratchpad `qa2r12/`. Capturas: `docs/capturas/qa-a11y-*-27nov-r12.png`.
Cobertura: las 86 rutas de `ALL_ROUTES` (43 EN + 43 ES) con axe-core (wcag2a/aa/21aa/22aa + best-practice) a 375 y 1440; teclado en 14 páginas a 375 y 1440; movimiento en 7 páginas (normal, reducido, pausa) a 1440 y 375; contraste real de texto en 16 páginas a 1440 y 13 a 375; zoom 200 % (720 px) y 400 % (no corrido: ver No verificado) y espaciado de texto (no corrido). No se hizo 1920 (el héroe se vio por código y capturas de D1).

## Veredicto: PASA CON 5 FALLAS MENORES/MEDIAS (0 bloqueantes)

| # | Punto | Resultado |
|---|---|---|
| 1 | Teclado: Tab por todo, foco visible, orden | PASA. Primer Tab = «Saltar al contenido» (Enter lleva el foco a `main`); orden lógico (menú, héroe, divisor, pausa, secciones, pie, pausas, subir); 0 elementos con foco fuera de vista o tapado (muestreo 15 puntos, 8 páginas × 2 anchos). Aro ≥ 2 px en todos; el buscador de FAQ usa borde cian en lugar de outline (visible). |
| 2 | Menú desplegable (1440) | PASA. Enter abre (`aria-expanded`), flechas mueven entre los 11 servicios, Escape cierra y devuelve el foco al botón, Tab fuera lo cierra. |
| 3 | Menú móvil (375) | PASA. Abre con foco en el primer enlace, fondo `inert`, Tab se queda en logo/panel/botón, Escape cierra y vuelve al botón; submenú acordeón: 1.er Escape cierra el submenú, 2.º el panel. |
| 4 | Divisor del héroe | PASA con una falla visual (F3). `role=slider`, nombre «Compare before and after», flechas ±4, Re/Av Pág ±12, Inicio 0, Fin 100, `aria-valuetext` correcto, aro blanco 3 px. |
| 5 | Botones de pausa | PASA con 1 nota (F5). Héroe, figura, reseñas, flotante y del pie existen y funcionan; la figura queda idéntica 2 s después de su pausa; la pausa global desactiva la del héroe. |
| 6 | Movimiento reducido: todo quieto | PASA. 7 páginas × todo el scroll, 2 capturas separadas 1.3 s: 0 cambios a 1440 y a 375; 0 animaciones corriendo. Control sin emulación: 2 a 11 tramos con movimiento (el método sí lo ve). |
| 7 | «Pausar animaciones» (pie/flotante) | PASA. 0 cambios a 1440 (inicio, Contact, servicio, seguros, About, blog, ES) y a 375; 0 animaciones corriendo. Solo hay una transición de 1-2 s tras el clic en el botón flotante (se asienta; no es movimiento continuo). |
| 8 | WCAG 2.2.2 (nada > 5 s sin pausa) | PASA. Todo lo continuo (aura, halo, neón, brillo del mapa, divisor, figura, reseñas) lo detiene la pausa global; el héroe, la figura y las reseñas además tienen botón propio. Nota: a 375 los botones flotantes solo aparecen tras bajar un poco; la pausa del pie siempre está. |
| 9 | Un h1 por página, `lang`, títulos | PASA. 86/86 con exactamente 1 h1; `lang` en/es-MX correcto y cambia al cambiar de idioma por el botón; título cambia; tras navegar el foco va a `main`. |
| 10 | Encabezados sin saltos | NO PASA en 8 páginas (F2). |
| 11 | Nombres accesibles, avisos de pestaña nueva | NO PASA en 1 punto (F1). 626 enlaces `_blank` en las 86 rutas: 0 sin aviso de pestaña nueva y 0 sin `noopener`; 0 botones/enlaces sin nombre; 0 imágenes sin `alt`. |
| 12 | Contraste AA | PASA. Texto: 3 089 textos medidos con fondo real (texto oculto + muestreo, movimiento reducido): 0 fallos a 375 y 0 a 1440 (1 falso positivo: pregunta abierta de FAQ con texto degradado, se ve claro). Botón verde de teléfono 9.33:1 (hover/foco ~8.2:1, aro cian 3 px); etiquetas Before/After 8.9 a 17:1 en 22-78 % y en los extremos en EN; 24/7 rojo `#ff4650` sobre `#240a12` ≥ 5.5:1 (y «24/7» en texto oculto para lectores); íconos con aura blanco sobre base `rgba(10,21,41,.8)` 18:1. axe: 0 violaciones de contraste. |
| 13 | axe-core serio | NO PASA (F1, F4). |
| 14 | Zonas táctiles | PASA. 0 elementos < 24 px en 86 rutas × 375/1440; promedio de elementos < 44 px: 0 a 375 y 3 a 1440 (los botones flotantes miden 30-34 px visibles con zona de 44 px por `::before`). |
| 15 | Zoom 200 % | PASA. 86 rutas a 720 px (DPR 2): 0 desborde horizontal; capturas inicio/servicio/contact sin pérdida. Los recortes que reportó el script son decorativos (dígitos del 24/7, máscara de títulos, `line-clamp` de extractos del blog). |
| 16 | Logo del encabezado no tapa foco ni contenido | PASA. Muestreo de foco: 0 tapados; `scroll-padding-top` = barra + 12 px cubre los ~10 px que sobresale el logo. Observado: al hacer scroll el logo cubre su propio tramo bajo la barra, sin contenido interactivo ahí. |

## Lista de fallas

| Id | Gravedad | Falla | Archivo y causa probable |
|---|---|---|---|
| F1 | ALTA (axe «serious», WCAG 2.5.3 Label in Name, nivel A) | Las 4 tarjetas de Financiamiento (`/en/financing`, `/es/financiamiento`): el `aria-label` («Sunbit: Learn more») no contiene el texto visible del enlace (la frase de cada financiera + «Learn more →»). Quien dicta por voz «clic en Pay over time…» no activa el enlace. | `apps/web/src/pages/FinancingHub.tsx` l.31: `aria-label={`${f.name}: ${F.more}`}` sobre un enlace que ya tiene texto visible. Quitar el `aria-label` (el logo lleva su alt) o que incluya el texto visible. |
| F2 | MEDIA (axe «moderate», WCAG 1.3.1) | Salto h2 → h4 en las tarjetas «relacionadas» de los 8 artículos del blog (`/en/blog/implants-and-tooth-replacement`, `…/cosmetic-and-restorative-dentistry`, etc., EN y ES). | `apps/web/src/pages/Blog.tsx` l.59: `<h4 className='blog-card__title'>`. Debería ser h3 en esas listas (o el nivel según el contexto). |
| F3 | MEDIA | Las etiquetas Antes/Después del héroe se superponen cuando el divisor llega a los extremos con teclado o arrastre (Inicio/Fin): «Before»+«After» ilegibles a 1440 EN/ES (65×34 px y 72×34 px de solape en 0 %; 17 y 47 px en 100 %); en ES al 100 % «Después» además choca con la ficha flotante. A 375 no se superponen. El barrido automático (22-78 %) no tiene el problema. Capturas `qa-a11y-etiquetas-*-1440-pos0/pos100-*`. | `apps/web/src/styles/before-after.css` (`.ba-tag-b/.ba-tag-a` siguen a `--pos` sin límite). Acotar la posición de las etiquetas (p. ej. `clamp`) o fijarlas a las esquinas cuando `--pos` < ~20 % o > ~80 %. |
| F4 | BAJA (axe «serious», pero en Edge el teclado sí llega) | `.legal-body` de Privacidad y Términos (EN/ES, solo a 1440) es una región con scroll sin contenido enfocable ni `tabindex`: axe `scrollable-region-focusable`. Edge/Chrome lo hacen enfocable solos; Safari no. | `apps/web/src/components/LegalDocument.tsx` l.133: agregar `tabIndex={0}` + `role="region"` + `aria-label`. |
| F5 | BAJA | Botón de pausa del héroe: usa `aria-pressed` y además cambia de texto («Pause» ↔ «Resume»); un lector dice «Resume, botón de alternar, presionado», contradictorio. | `apps/web/src/components/BeforeAfter.tsx` (`aria-pressed={!running}` + texto cambiante): usar solo uno de los dos. |
| F6 | MUY BAJA (landmark, moderate) | `landmark-unique`: en `/en` y `/es` una `.sec` repite el nombre de otro landmark. | Poner `aria-label`/`aria-labelledby` distintos a esa sección del inicio. |

## Observaciones (no son fallas)
- El hover del botón verde de teléfono rellena con cian `rgb(52,191,204)` y no con la menta clara `#8ee6cf` que anotó F1: la regla `.btn--call::before` pierde por especificidad ante el hover del `.btn`. Es cosmético; el contraste sigue siendo AA. `styles/benefits-r2.css` l.8.
- Los extractos del blog usan `line-clamp` (3 líneas): a 200 % se corta algo del extracto (el texto completo está en el artículo).
- `image-redundant-alt` (minor) en las páginas de cada financiera: el `alt` de los logos de las otras financieras repite el nombre que ya está en el texto.
- `region` de axe (moderado) por el botón flotante, ya conocido de la r11.

## No verificado
Lector de pantalla real (NVDA/VoiceOver); Safari y Firefox; teléfono real (toque, zoom del sistema); reflow a 400 % (320 px) y espaciado de texto 1.4.12: los scripts `zoom.cjs z400`/`spacing` se escribieron pero no se corrieron por tiempo; héroe a 1920 solo por revisión de D1; contraste de texto con degradado (`background-clip:text`, títulos) revisado a ojo, no medido; se probó el servidor de desarrollo, no la compilación publicada.

## Skills usadas
`browser-qa` (barrido de 86 rutas, 3 ancho, axe), `accessibility` y `frontend-a11y` (teclado, ARIA, 2.4.11/2.5.3/2.5.8/2.2.2), `playwright-cli`/playwright-core (Edge, emulación de movimiento reducido), `verification-loop` (solo lectura: sin build ni typecheck, no se tocó código), `ponytail` (scripts mínimos, sin instalar nada).
