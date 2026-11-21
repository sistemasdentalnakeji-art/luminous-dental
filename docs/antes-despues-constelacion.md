# Antes / Después en constelación (héroe del inicio)

Prototipo: `docs/maquetas/antes-despues-constelacion/index.html` (se abre con doble clic; las 4 fotos están al lado). Autor: Diseñador UI-UX 2 · 20-11-2026. Estado: propuesta, falta aprobación de la dueña.

## La idea, en palabras sencillas
1. Del cielo nocturno se separan unas 24 estrellas y se juntan despacio hasta dibujar una sonrisa (dos arcos de puntos con líneas finas: dientes de arriba y de abajo).
2. La constelación se «enciende»: un anillo de luz se abre desde el centro como una galaxia y deja ver la foto del ANTES, con los bordes difuminados para que se funda con el cielo (no hay tarjeta ni marco).
3. Un divisor de luz barre despacio y el ANTES se convierte en el DESPUÉS. Luego todo se disuelve y pasa al caso 2. Ciclo de 15 s por caso.
4. En cualquier momento la persona toma el control: arrastra, usa las flechas del teclado, o pulsa «Before» / «After». Al tocar algo, la animación automática se detiene y la sonrisa queda encendida.

Se queda quieto y claro: sin explosiones ni partículas de juego, solo estrellas, líneas finas y luz azul hielo (la paleta del fondo del sitio).

## Cómo se usa
- Arrastrar sobre la foto, o Tab hasta el control y flechas izquierda/derecha: mueve el divisor.
- Botones «Before» y «After»: llevan el divisor al extremo con suavidad.
- «Pause animation»: pausa el ciclo automático (obligatorio por accesibilidad: movimiento de más de 5 s).
- Pestañas con los dos casos: «A different future» y «No longer hidden».
- Con movimiento reducido del sistema o `data-motion-paused` en `<html>`: no hay animación; se ve la constelación completa, la foto abierta y el divisor al 50 % (antes y después comparables, con etiquetas), y el control sigue funcionando.
- Probado en 375 y 1280 px (capturas hechas con navegador automático): sin errores en consola y sin desbordar de lado.

## Especificación para programarlo en React
**Archivos nuevos** (no tocar otros):
- `apps/web/src/components/SmileConstellation.tsx`: el componente (foto, controles, canvas).
- `apps/web/src/features/constellation/engine.ts`: dibujo del canvas y línea de tiempo (sin React).
- `apps/web/src/styles/smile-constellation.css`.
- `apps/web/src/content/smileCases.ts`: casos (título, rutas, `alt`, parámetros de los arcos).
- Fotos en `apps/web/public/smiles/` (convertidas a WebP/AVIF, 960 de ancho, ver rendimiento).

**Cómo encaja con el fondo (`Backdrop.tsx`)**: el prototipo dibuja sus propias estrellas solo para verse solo. En el sitio NO duplicarlas: el canvas de la constelación dibuja únicamente los ~24 nodos y las líneas, sobre el cielo de `Backdrop`. Opción mejor, a decidir con el jefe: que `Backdrop` exponga las posiciones de algunas de sus estrellas para que esas sean las que viajan a la sonrisa. Hacerlo implica tocar `Backdrop.tsx` (otro agente/orden).

**Estructura**: contenedor `stage` de proporción 960/450 (derecha en escritorio, bajo los botones en móvil) con: capa foto (dos `<img>`, la de «después» recortada con `clip-path: inset(0 0 0 var(--pos))`), máscara radial en la capa foto (`mask-image` con variable `--r`), capa de controles (línea, perilla, etiquetas), `<input type="range">` transparente encima y canvas de cielo `aria-hidden`. El canvas cubre todo el héroe y se mapea al rectángulo de `stage` (coordenadas de foto 960×450).

**Línea de tiempo** (segundos): reunir 0–2.6, encender 2.2–4.8, barrer 5.4–9.4, sostener hasta 12.6, dispersar 12.6–14.8; luego siguiente caso. Estado: `g` (reunidas), `ig` (encendida), `pos` (% de antes). Al interactuar: modo manual.

**Rendimiento**
- El titular y la columna izquierda no dependen de esto. Montar el componente con `React.lazy` + `requestIdleCallback`; la foto del «antes» con `loading="eager"` solo si está en pantalla, la del caso 2 se carga al acercarse el ciclo.
- Un solo canvas 2D, devicePixelRatio máximo 2, 30 fps, ~24 nodos y ≤150 estrellas ambientales (en el sitio, 0, ya las pone Backdrop). Sin WebGL: no hace falta.
- Pausar con `visibilitychange`, con `IntersectionObserver` (fuera de pantalla) y con pausa del usuario. Limpiar `requestAnimationFrame` y observadores al desmontar.
- La máscara se actualiza solo durante el «encender» (≈2.6 s); después es fija.
- Fotos: hoy 960×450 JPG de ~20–28 KB cada una; pasar a WebP con `width`/`height` para evitar saltos.
- Leer `matchMedia('(prefers-reduced-motion)')` y el atributo `data-motion-paused` (con MutationObserver) como ya hace `Backdrop`.

**Accesibilidad**
- `<section aria-label="Smile gallery: before and after">`.
- `alt` descriptivos para cada foto (ver textos en el prototipo); nunca «image of».
- Control de comparación: `<input type="range">` real con `aria-label="Compare before and after"`, `aria-describedby` con las instrucciones, y `aria-valuetext` («Showing before», «Showing after» o «Before 40% on the left, after 60% on the right»). Foco visible con anillo blanco.
- Botones «Before» y «After» con `aria-pressed`; pestañas con `role="tablist"` y flechas.
- Botón «Pause animation» con `aria-pressed`. Objetivos táctiles ≥ 44 px.
- Etiquetas visibles «Before» / «After» (texto, no solo color).
- El canvas es decorativo: `aria-hidden`, nunca recibe foco ni toques (`pointer-events: none`).
- Contraste de textos sobre el cielo: blanco/azul hielo sobre azul noche (alto). Verificar con herramienta en la etapa de QA.

**Textos (inglés)**: «Before», «After», «Pause animation»/«Play animation», «A different future.», «No longer hidden.». Leyenda siempre visible bajo la foto: «Individual results vary.» (el texto original de la referencia añade «Clinical evaluation determines treatment suitability.»: se puede sumar con la aprobación de la clínica).

## Aviso importante: fotos de pacientes
Las 4 fotos del prototipo salen del archivo de referencia de la dueña (`Luminous Dental - Smile Makeover.html`). **Usar fotos de pacientes en el sitio requiere consentimiento confirmado por la clínica.** No está verificado: hasta que la clínica lo confirme por escrito, el sitio debe quedarse con imágenes de muestra. Tampoco se publican datos de pacientes ni historias sin permiso. Las descripciones del `alt` no deben identificar a nadie.

## No verificado / pendientes
- Aprobación de la dueña de la idea y del ritmo (15 s por caso).
- Consentimiento de las fotos (arriba).
- La forma de la constelación es un dibujo artístico de arcos, no sigue diente por diente; si se quiere que siga cada diente, hay que marcar los puntos a mano por foto.
- No probado en Safari, iPhone ni Android reales; el rendimiento se midió a ojo con un navegador automático, sin perfilar.
- En movimiento reducido el botón «Pause animation» no hace nada útil: en React, ocultarlo en ese modo.
- Decisión pendiente con el jefe: tocar `Backdrop.tsx` para reutilizar sus estrellas.
