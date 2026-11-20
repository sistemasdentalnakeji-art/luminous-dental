# Revisión de código React/TypeScript · ld-frontend-2 (19-11-2026)

**Veredicto: PASA con reservas.** El tipado está limpio (`tsc -b` sin errores) y la página responde en el 5181 (HTTP 200). No hay fallos que rompan la página; sí hay 3 fallos medios por corregir antes de publicar.

Qué hice: leí todo `apps/web/src` (componentes, páginas, lib, config, figure), corrí `tsc -b` y `oxlint src`, y busqué restos de Dental Nakeji. Solo lectura: no cambié código ni toqué git. Marco cada punto como **observado** (lo vi/ejecuté) o **inferido** (por leer el código, sin reproducir en navegador).

## Fallos

### Media
1. **El formulario conserva el tratamiento y el estado de la página anterior al pasar de un servicio a otro.** (inferido)
   - Dónde: `src/app/App.tsx` (`pageFor` devuelve `<Service page=…/>` en la misma posición) + `src/features/booking/BookingForm.tsx` línea del `<select defaultValue={defaultTreatment}>`.
   - Cómo reproducir: abrir `/services/<uno>` → menú Services → otro servicio → bajar al formulario: `defaultValue` solo cuenta al montar, y React reutiliza el componente, así que sigue el tratamiento del servicio anterior (también se arrastran errores y mensajes "enviado/preview"). Igual entre artículos del blog.
   - Causa/arreglo (una línea): poner `key={path}` al elemento de página en `App.tsx` (`<Layout path={path}>{page}</Layout>` → página con `key`).
2. **Las filas de reseñas se mueven solas sin botón de pausa.** (observado en código; WCAG 2.2.2)
   - Dónde: `src/components/Marquee.tsx` (rAF sobre `scrollLeft`; solo se detiene con cursor, foco, toque o fuera de pantalla). El comentario habla de «Pausar animaciones» pero no existe ese control. Con reducción de movimiento sí se detiene.
   - Reproducir: Inicio → sección de reseñas, no tocar nada: se mueve indefinidamente (más de 5 s). Ya hay pausa en las figuras (`ResultFigure`), aquí falta.
3. **URLs de reseñas en vivo sin validar.** (latente: hoy `reviewsSource.endpoint = null`)
   - Dónde: `src/lib/useGoogleReviews.ts` (acepta el JSON tal cual) y `src/components/Reviews.tsx` (`photoUrl`, `authorUrl`, `googleUrl` van a `src`/`href`). Si el servidor devolviera un `javascript:`, se pondría en un enlace. Además `json?.reviews.length` falla si falta `reviews` (lo atrapa el `catch`, pero entonces no se avisa de nada).
   - Arreglo: aceptar solo `https:` y comprobar `Array.isArray(json?.reviews)`. Anotar para cuando Jadro conecte el endpoint.

### Baja
4. **Código y dependencias muertas.** (observado)
   - `src/lib/cn.ts` no lo importa nadie; por eso `clsx` y `tailwind-merge` sobran en `apps/web/package.json`. `motion` está en dependencias y no se importa en ninguna parte (peso de instalación, no de la página).
   - `src/features/figure/engine.js`: `slabOf` (línea 192) y `lineOnTop` (línea 207) sin uso (avisos de oxlint).
   - `clinic.phone` (`content/clinic.ts`) no se usa; el teléfono está copiado a mano en 8 sitios: `home.ts` (varias veces), `services.ts` línea 148 y `Service.tsx` línea 31 (`href="tel:+17028058688"`). Cuando la clínica confirme el número, hay que cambiarlo en todos.
5. **Escritura de `ref` durante el render.** `src/features/figure/ResultFigure.tsx` líneas 19-20 (`pausedRef.current = paused`; aviso `react(refs)` de oxlint). Funciona, pero no es el patrón de React 19; pasar a asignarlo dentro de un efecto.
6. **`setState` dentro de efecto al cambiar de ruta.** `src/components/Header.tsx` líneas 25-28 (aviso `set-state-in-effect`): causa un render extra por cada cambio de página. Se evita cerrando el menú en los clics/`navigate`, o dándole `key={path}` al Header.
7. **`Backdrop.tsx` va con `// @ts-nocheck`** (≈150 líneas de canvas/WebGL sin tipos). Además, en `resize` se regeneran las estrellas y se reasigna el tamaño del canvas: en celular, la barra del navegador al hacer scroll dispara `resize` y puede parpadear (inferido, no probado en móvil real). Tampoco maneja la pérdida de contexto WebGL.
8. **Pequeños desajustes.**
   - `Reviews.tsx`: `key={r.author}` se repite si dos reseñas son del mismo autor.
   - `App.tsx`: `decodeURIComponent(hash…)` lanza error si la dirección trae un `#%` mal formado (cae en el `requestAnimationFrame`, sin captura). Probar con `/#%E0`.
   - `lib/router.tsx`: avisos `only-export-components` (Link junto con funciones); `Link` no respeta `download`. `index.html` usa `/favicon.svg` absoluto y no sigue `PAGES_BASE`.
   - `Blog.tsx`: en categorías, `Card` pone `<h4>` justo bajo `<h2>` (salto de nivel).
   - `LocationMap.tsx`: al abrirse, la cara con el nombre queda `aria-hidden` y no existe "la otra capa" que dice el comentario (venía de Nakeji); el lector de pantalla solo conserva el botón. La dirección sí está en la tarjeta de al lado.
   - `Insurance.tsx` tiene el título «Insurance & Financing» escrito a mano (no sale de contenido); `Appointment.tsx`/`Contact.tsx` abren Google Maps en la misma pestaña con `rel="noopener"`, mientras que el pie y `ContactLocation` lo abren en pestaña nueva (inconsistente).
   - Comentarios en español (Marquee, LocationMap, Backdrop, location-map.css) mezclados con inglés; no afecta lo que ve el visitante.

## Copias de Nakeji
- No hay texto visible de Nakeji, ni de México, ni en español: busqué `nakeji`, `monteverso`, `tijuana`, `colonia`, `méxico`, `whatsapp`, acentos y `¿¡` en `src` y `index.html`: **solo aparece en comentarios de cabecera** y en `blog.en.json` (`_note`, ya documentado en `docs/datos.md`). Eso está bien.
- Nada mal adaptado en pantalla: el pin del mapa usa «Las Vegas, NV».

## Lo que está bien (observado)
`tsc -b` sin errores; `rules-of-hooks` sin errores; todos los efectos con limpieza (listeners, rAF, IntersectionObserver, temporizadores); carga diferida de las figuras (`lazy`); formulario con etiquetas, `aria-describedby`, `aria-invalid`, honeypot y estado `aria-live`; menú con Escape/flechas/foco; salto a contenido y foco en `<main>` al cambiar de página; reduce-motion respetado en Backdrop, Marquee, Carousel y figuras.

## No verificado
- No corrí `npm run build` ni abrí la página en navegador para reproducir los puntos marcados «inferido» (1, 7, 8).
- No probé en celular real ni con lector de pantalla.
- No revisé el peso del paquete (eso es del director de tecnología), ni el CSS salvo lo necesario para entender el código.
- `engine.js`/`live.js` (código portado, JS sin tipos) los leí solo por los avisos del linter, no línea por línea.
