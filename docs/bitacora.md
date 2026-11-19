# Bitácora · Luminous Dental

## 17-11-2026 · Etapa 0 · Encargo y arranque
Quién lo hizo: Jefe de Páginas web (sesión principal; los agentes `ld-*` todavía no existen en `~/.claude/agents`)
Ponytail: encendido
Skills usadas: ninguna de diseño (no toca en la etapa 0); Context7: 1 consulta (instalación de Tailwind v4 con Vite).
Referencias consultadas: https://luminousdentallv.com (inicio, menú, pie y /contact-us/).
Hice: proyecto base con Vite + React + TypeScript en `apps/web`; Tailwind v4, motion, `cn()` y `components.json`; carpetas de la sección 14; datos reales en `src/content/clinic.ts`; formato de cita en `packages/types`; `apps/api` y `packages/db` reservados con README; README, CLAUDE.md, decisiones y esta bitácora.
Verifiqué: ver la sección «Verificación» abajo.
Falta o riesgos: horarios y herramienta de automatización POR CONFIRMAR; avisos de seguridad de paquetes (npm audit) por revisar en la etapa 3.
Siguiente paso propuesto: Etapa 1 (identidad, mapa de páginas, competencia y datos). ¿Sigo?

## 17-11-2026 · Etapa 0 · Horario y formulario de citas
Hice: busqué el horario en Google (guardado sin mostrar, POR CONFIRMAR); formulario de citas en `features/booking/BookingForm.tsx` (nombre, apellido, correo, teléfono, tratamiento, día preferido, mensaje, aceptación, campo trampa contra bots), en modo vista previa.
Verifiqué: compila sin errores; en celular, vacío no deja enviar, lleno muestra el aviso de vista previa; sin errores en la consola.

## 17-11-2026 · Etapa 1 · Qué datos existen (`docs/datos.md`)
Quién lo hizo: Backend 1 (`ld-backend-1`)
Ponytail: encendido
Skills usadas: `ld-bienvenida` (reglas: no inventar, nada de datos de pacientes, no mezclar con Dental Nakeji); `api-design` (pasar de formulario a API por fases con un solo formato, `AppointmentRequest`, errores y límite de envíos definidos); `security-review` (qué datos no pedir, llaves solo en Vercel, nivel de seguridad); `contract-first` y `error-handling` (un contrato único sirve a todas las fases; errores de datos, límite y servidor); `ponytail` (solo el documento pedido, sin tocar código). `api-connector-builder` y `backend-patterns` cargadas, sin uso: no hay conexión que construir todavía.
Referencias consultadas: https://luminousdentallv.com (inicio, /contact-us/, /our-team/, /insurance-financing/, /before-after/, /blog-grid/, /patients-resources/, /privacy-policy/, sitemap y sub-sitemaps de páginas y entradas), con WebFetch.
Hice: `docs/datos.md` con inventario de datos, qué cambia seguido, camino de citas por fases (sin elegir herramienta), datos que no se piden y nivel propuesto.
Verifiqué: leí los 6 documentos del encargo y las secciones 5, 9, 25 y 26 del manual; cada dato lleva su enlace. No corrí código.
Falta o riesgos: WebFetch resume, no copia literal. La página oficial se contradice en horario (3 versiones) y teléfono (2 números); `docs/decisiones.md` dice que el horario no está en la página oficial y no es cierto (no lo toqué, por el encargo). Antes y después y financiamiento no existen; fotos y reseñas necesitan permiso. Mi ficha menciona Google Calendar, casilla anti-bots y reseñas de Google: son de Dental Nakeji y no se usaron.
Lo que no me pidieron pero conviene: pedir a la clínica una sola vez horario, teléfono, permiso de reseñas y fotos, y si quiere editar el contenido sola; eso decide si hace falta un panel.
Siguiente paso propuesto: el dueño confirma el nivel (Sí 1). ¿Sigo?

## 17-11-2026 · Etapa 1 · Identidad y mapa de páginas
Quién lo hizo: Diseñador UI-UX 1 (`ld-disenador-uiux-1`)
Ponytail: apagado
Skills usadas:
- impeccable (init): PRODUCT.md escrito con su plantilla; sin entrevista (nadie a quién preguntar), lo inferido está marcado. El lanzador `context` pidió elegir app; no se necesitó más.
- brand-voice: voz sacada de textos reales del sitio (about, services, contacto, seguros, carillas, implantes); 5 reglas y lista sí/no en `docs/marca.md`.
- ld-bienvenida: reglas de la empresa (sin datos de Dental Nakeji, solo inglés).
- copy-editing / anti-slop: NO se corrieron como skill separada; las reglas del manual (sección 8) se aplicaron a mano al texto de marca. Si se quiere, se corren en la etapa 2.
- brand-discovery: no está instalada; se sustituyó con los textos reales del sitio.
Referencias consultadas: luminousdentallv.com (inicio, about-us, services, our-team, before-after, insurance-financing, contact-us, porcelain-veneers-crowns, dental-implants), 17-11-2026.
Hice: `PRODUCT.md`, `docs/marca.md`, `docs/mapa-de-paginas.md`. No toqué apps/, packages/ ni los archivos de otros agentes.
Verifiqué: leí cada página con WebFetch; el código de colores salió del HTML del inicio. No hay capturas (esta etapa no las pide).
Falta o riesgos: el logo y la paleta real no se pudieron ver (POR CONFIRMAR); el sitio oficial muestra horarios que se contradicen (Mar-Sáb 8-5 arriba; Lun 8-19, Mar-Vie 8-18, Sáb 8-13 abajo) y Google Maps otro: no se publica. «Over 40 years» choca con los 4 años del doctor. El oficial trae restos de otras clínicas («Somerset Dental», «SmileLife Dental») y «Lorem ipsum». Before & After no tiene fotos reales. Competencia: hueco en el mapa para el Analista.
Lo que no me pidieron pero conviene: pedir al dueño el logo original; sin él no se puede cerrar la paleta.
Siguiente paso propuesto: Sí 1 del dueño (titular, botón, páginas, qué se toma de la competencia). ¿Sigo?

## 17-11-2026 · Etapa 1 · Análisis de competidores
Quién lo hizo: Analista de competencia (`ld-analista-competencia`)
Hice: `docs/competencia.md` con 6 competidores de Las Vegas abiertos y comprobados (Absolute Dental, Rose Cosmetic & Family Dentistry, Dee for Dentist, Sweet Smiles, Aspiring Smiles, A Great Smile), tabla comparativa contra luminousdentallv.com, resumen de 5 líneas, «Qué tomar» y «Qué no copiar». No toqué código ni otros docs.
Skills usadas: ld-bienvenida (reglas y datos de Luminous); competitive-platform-analysis (perfil del cliente, niveles Directo/Cercano/Referente, filtro por zona y servicio); benchmark-methodology (solo la idea de anotar con evidencia; no se hicieron las 9 notas, el encargo pedía tabla de funciones); competitive-report-structure (orden: resumen, niveles, matriz, recomendaciones, fuentes); market-research y deep-research (búsqueda por zona y lectura de cada sitio con fecha). ads-competitor y ad-creative: no aplicaron (no se pidieron anuncios).
Falta o riesgos: la herramienta lee solo texto; el diseño visual y el móvil no se vieron («al día» por señales de texto; Rose sin año). Island Smiles y Sahara Modern dieron 403. En la columna de Luminous, «Before & After» figura como página enlazada; la entrada de UI-UX dice que no tiene fotos reales (conviene tomar la de UI-UX). Horario: sigue POR CONFIRMAR.
Siguiente paso propuesto: ver capturas de los 6 sitios en el navegador integrado y confirmar el veredicto de diseño antes del Sí 1.

## 17-11-2026 · Etapa 1 · Cierre (jefe)
Hice: verificación visual de los 6 competidores y del sitio oficial en el navegador integrado (faltaba, §23); llené el hueco de competencia en el mapa de páginas; corregí la nota del horario en decisiones.
Falta: Sí 1 del dueño. Skills que faltaron en la etapa: `brand-discovery` y `anti-slop` (no instaladas; se avisó).

## 17-11-2026 · Etapa 2 · Texto real del inicio
Quién lo hizo: Redactor de contenido SEO (`ld-redactor-seo`)
Ponytail: apagado
Skills usadas:
- brand-voice: la voz salió de los textos reales (frase ancla, «comfortable», «personalized», «whole family») y de las 5 reglas de `docs/marca.md`; se dejó fuera el tono de venta («transform», «unparalleled»).
- copywriting: diagnóstico B/A (voz real del sitio, hay que limpiarla); titular y botones aprobados quedaron fijos; cada línea pasó la prueba «¿se puede comprobar?» y «¿serviría para un competidor?».
- copy-editing: pasada de claridad, «so what» y pruebas; sin guiones largos, sin «not X, it's Y», sin listas de negaciones, sin signos de exclamación.
- seo: title de 57 caracteres y meta description de 142 (contados a mano), con «Las Vegas» y el servicio al inicio, sin relleno de palabras clave.
- ld-bienvenida: solo inglés, Las Vegas; datos de Dental Nakeji ignorados.
- content-strategy e i18n-sync: cargadas, sin uso (una página, un solo idioma).
- anti-slop y article-writing: NO están instaladas; se aplicó copy-editing en su lugar.
Referencias consultadas: luminousdentallv.com (inicio, /about-us/, /insurance-financing/) con WebFetch, 17-11-2026; PRODUCT.md, marca.md, mapa, decisiones, competencia, clinic.ts, manual §8, §9 y §29.
Hice: `apps/web/src/content/home.ts` con el objeto `home` (SEO, cabecera, hero, servicios en 4 grupos, por qué Luminous en 4 puntos, doctor, cambio de sonrisa, reseñas, seguros y SAHARA, pedir cita con mensajes de envío/éxito/vista previa/error, pie) y comentario final con la fuente de cada frase.
Verifiqué: sin guiones largos (búsqueda); frases oficiales copiadas tal cual. No corrí typecheck ni build (no tengo consola en esta sesión).
Capturas comparadas con la foto de referencia: no aplica (solo texto).
Falta o riesgos: (1) 3 reseñas «POR CONFIRMAR permiso» (Ashok R., Ana B., Sandra P.; la de Ashok trae «Dr Christian» sin punto, tal cual). (2) Frases escritas por el equipo y no por el sitio oficial, a aprobar: segunda frase del hero, «same team», texto de cambio de sonrisa, y el «we will follow up / contact you» del formulario (el proceso de respuesta de la clínica es POR CONFIRMAR). (3) Ortodoncia «for children, teens and adults» y «Invisalign and braces» vienen de un texto oficial sin página propia. (4) Fotos del hero y del doctor: POR CONFIRMAR. (5) No se listan aseguradoras por nombre: la lista oficial tiene faltas y «Principle» no está verificado. (6) Los botones de «Request an appointment» deben llevar al formulario; en modo vista previa el aviso dice que no se envió.
Lo que no me pidieron pero conviene: preguntar a la clínica cómo y en cuánto tiempo responden a una solicitud; con eso el mensaje de éxito puede decir algo concreto.
Siguiente paso propuesto: el dueño revisa este texto junto con el diseño (Sí 2). ¿Sigo?

## 17-11-2026 · Etapa 2 · Dirección C «Sol»
Quién lo hizo: Diseñador UI-UX 2 (`ld-disenador-uiux-2`)
Ponytail: apagado
Skills usadas:
- ld-bienvenida: datos de Luminous (solo inglés, Las Vegas, un doctor); datos de Dental Nakeji ignorados.
- frontend-design y frontend-design-direction: plan antes de construir (paleta, tipos, retícula) y revisión contra los delatores; fondo amarillo y composición asimétrica en vez de crema, negro o blanco clínico.
- impeccable: criterio de diseño y crítica hecha a mano (el lanzador `impeccable context` no se corrió).
- design-system: tokens de color, tipo y espacio en `:root`; contrastes calculados.
- make-interfaces-feel-better: radios concéntricos, `text-wrap`, números tabulares, áreas de toque de 44 a 56 px, sin `transition: all`, contorno neutro en fotos.
- accessibility: radios y etiquetas reales, foco visible, salto al contenido, reduced motion, error con texto además de color.
- motion-foundations: NO se cargó; apliqué sus reglas (solo transform y opacity, un momento, reduced motion) de memoria.
Referencias consultadas: capturas de `docs/referencias/` (Oura, One Medical, Dee, Aesop, Dental Rose); no 21st ni Biblioteca de diseño (no existen aquí).
Hice: `docs/lienzo/project/Estilo-C.dc.html` y `docs/lienzo/hoja-c.md`.
Verifiqué: capturas en Chrome a 1440 y 375 sobre una copia de prueba sin el envoltorio `<x-dc>` (`support.js` no está en la carpeta); contrastes con script. No probé el archivo dentro del lienzo real, ni 6 anchos, ni teclado en vivo.
Capturas comparadas con la foto de referencia: no aplica.
Falta o riesgos: `$preview` va en `data-props` (alto 7500 estimado); `onSubmit` del formulario no probado en el runtime; Cosmetic = Adults es inferencia; textos de interfaz nuevos listados en la hoja; Google Fonts solo en el lienzo.
Lo que no me pidieron pero conviene: confirmar con la clínica a qué edades atiende cosmética.
Siguiente paso propuesto: revisión independiente y elección del dueño. ¿Sigo?


## 17-11-2026 · Etapa 2 · Direcciones A y B
Etapa 2 · Diseño en el lienzo (direcciones A y B)
Quién lo hizo: Diseñador UI-UX 1 (`ld-disenador-uiux-1`)
Ponytail: apagado
Skills usadas:
- ld-bienvenida: Luminous Dental, solo inglés, datos de Dental Nakeji ignorados; logo «Luminous Dental» provisional.
- frontend-design y frontend-design-direction: leídas antes de elegir letra; se evitó crema + serif + terracota y casi negro + verde ácido; una pieza firma por dirección.
- impeccable: `context` pidió elegir app (no hay DESIGN.md) y no se corrió más; la crítica se hizo a mano contra §8 y está en cada hoja.
- design-system: colores, letras y espacios como variables CSS en cada archivo; contrastes calculados con un script.
- motion-foundations: un momento orquestado + respuestas; transform y opacity (B usa el trazo del SVG en los arcos); reduced motion apaga todo.
- make-interfaces-feel-better: transiciones por propiedad (sin all), `text-wrap`, presión 0.97, áreas táctiles de 48 px o más, contorno de imagen.
- accessibility: contrastes AA, foco visible, etiquetas reales, menú con details, pestañas con radios nativos.
Referencias consultadas: capturas de `docs/referencias/` (dee, oura, onemedical, aesop) con Read; los enlaces los trajo el jefe. No abrí los sitios en vivo ni usé 21st (no disponible).
Hice: `docs/lienzo/project/Estilo-A.dc.html`, `Estilo-B.dc.html`, `docs/lienzo/hoja-a.md`, `hoja-b.md`. Texto de `home.ts` tal cual, más etiquetas de formulario.
Verifiqué: capturas con Edge sin cabeza de una copia sin `x-dc` a 1440 (hasta unos 5200 px) y a 375 (en marco). Corregí el encabezado que partía líneas. No pude abrir el lienzo con `support.js`.
Capturas comparadas con la foto de referencia: no aplica (diseño nuevo).
Falta o riesgos: no vi las secciones finales a 1440 (de reseñas al pie); la sintaxis `x-dc` no se probó en el lienzo real (`$preview` alto estimado en 6300 y 6200); punto 7 de la lista premium parcial; etiquetas del formulario y de «Visit us» no están en home.ts; Google Fonts solo en el lienzo (producción: WOFF2 propios); en B la foto única se repite (hero y doctor).
Lo que no me pidieron pero conviene: barra fija «Request · Call» en celular (idea de Rose) para la etapa 4.
Siguiente paso propuesto: revisión independiente (§35) y Sí 2 del dueño. ¿Sigo?


## 17-11-2026 · Etapa 2 · Ronda 1 · Dirección C «Sol»
Quién lo hizo: Diseñador UI-UX 2 (`ld-disenador-uiux-2`)
Ponytail: apagado
Skills usadas:
- ld-bienvenida: Luminous Dental, solo inglés, sin datos de Dental Nakeji.
- impeccable: `context` pidió elegir app (sin DESIGN.md) y no se siguió; crítica a mano; leído el craft-floor antes de editar (sin eyebrow, sin bordes de color, sin tarjetas iguales).
- frontend-design y frontend-design-direction: foto del doctor en el hero con recorte y bloque cobalto en vez de caja vacía; una sola cosa memorable (la línea de vida).
- design-system: variables en `:root`, sin colores nuevos.
- make-interfaces-feel-better: áreas de toque de 44 px o más, transiciones por propiedad, contorno neutro en fotos.
- accessibility: casilla con toda la fila como zona de toque, aviso de etapa solo para lector de pantalla, error con texto además de color.
Hice: `docs/lienzo/project/Estilo-C.dc.html`, `docs/lienzo/hoja-c.md` (sección «Ronda 1: qué cambió por cada observación»).
Verifiqué: capturas con Edge sin ventana de una copia sin `x-dc` a 1440 (9 tramos de 1000 px) y a 375 en marco de 375 px exactos (7 tramos y primera pantalla de 812 px); sin desborde horizontal; áreas de toque medidas con script; ninguna llave doble queda en el archivo; estados Children y Teens probados a 1440.
Falta o riesgos: no vi el movimiento en vivo ni el teclado; no probé el archivo en el lienzo real con `support.js`; `onsubmit="return false"` sin probar allí; la misma foto aparece dos veces (hero y doctor); permiso de la foto y de las reseñas POR CONFIRMAR; etiquetas «Whole family / Children / Teens / Adults» a aprobar; 3 capturas del sector son muy chicas.
Siguiente paso propuesto: segunda revisión independiente (ronda 2). ¿Sigo?


## 17-11-2026 · Etapa 2 · Ronda 1 de correcciones · Direcciones A y B
Quién lo hizo: Diseñador UI-UX 1 (`ld-disenador-uiux-1`)
Ponytail: apagado
Skills usadas:
- ld-bienvenida: Luminous Dental, solo inglés, un doctor; nada de Dental Nakeji.
- impeccable: `context` no se corrió; crítica a mano contra §8 y §20, anotada en cada hoja.
- frontend-design y frontend-design-direction: A cambió de letra (Funnel Display) y de pieza firma (dentadura completa) tras comparar con los delatores; B rompió la rejilla 2×2 y las dos tarjetas iguales.
- design-system: variables CSS por archivo; paleta sin cambios; `minmax(0,1fr)` en todas las rejillas de una columna.
- make-interfaces-feel-better: áreas de toque de 44 px o más, transiciones por propiedad, `text-wrap`, contorno neutro en fotos.
- accessibility: formulario con etiquetas reales y `method="dialog"`, foco visible, reduced motion, texto real en vez de `{{ }}`.
- motion-foundations: NO estaba cargada; apliqué sus reglas de memoria (un momento, transform/opacity, reduced motion).
Hice: `docs/lienzo/project/Estilo-A.dc.html`, `Estilo-B.dc.html`, `docs/lienzo/hoja-a.md`, `hoja-b.md` (cada hoja con «Ronda 1: qué cambió por cada observación»).
Verifiqué: capturas con Edge sin ventana a 1440 (tramos de 1000 px, página completa) y a 375 en marco de 375 exactos (tramos de 1600 px, página completa), con movimiento reducido para ver el estado final; prueba de ancho de página sin recorte horizontal (375 y 1440): sin desborde en A ni en B (había uno real en B, corregido); ninguna llave doble queda en ambos archivos.
Capturas comparadas con la foto de referencia: no aplica (diseño nuevo).
Falta o riesgos: movimiento, hover, teclado y pestañas de B no probados en vivo; no se probó dentro del lienzo real con `support.js` (en esta carpeta no existe); alturas `$preview` (A 7480, B 7540) medidas solo a 1440; la misma foto aparece dos veces en B (anillo y doctor); la franja de dientes de A es un dibujo propio y conviene que la vea el dueño; A cambió de nombre («Todos tus dientes», antes «La regla»).
Lo que no me pidieron pero conviene: la barra fija «Request · Call» para celular en la etapa 4.
Siguiente paso propuesto: segunda revisión independiente de A y B. ¿Sigo?

## 18-11-2026 · Etapa 2 · Mezcla 1 (Diseñador UI-UX 1)
Hecho: `lienzo/project/Estilo-B2.dc.html` (1440, alto real 8616) y `Estilo-B2-movil.dc.html` (375, alto real 9474) más `lienzo/hoja-b2.md`. Base B (anillo) con colores, letra, estrellas y logo iluminado del diseño de la dueña, franja de dientes de A y «Why» y lista en escalera de C. Texto de `home.ts` sin cambios; sin horario, calificación ni precios.
Verifiqué: capturas con Edge sin ventana a 1440 y 375 de arriba abajo, con movimiento reducido; contrastes AA calculados.
Falta: movimiento en vivo y prueba dentro del lienzo real; B2 no está en `canvas.json`; el logo se anima (el DESIGN.md de la dueña pide quieto); la franja de dientes es muy clara y necesita visto bueno.

## 2026-11-18 · Jefe · Mezcla B2 (ronda de cambios 1 de 2)
- Encargo `docs/lienzo/MEZCLA-1.md` → ld-disenador-uiux-1 entregó Estilo-B2 (+ móvil).
- Revisión independiente: ld-qa-4 PASA con reservas; ld-disenador-uiux-2 PASA con reservas. Correcciones en `CORRECCIONES-B2.md`, aplicadas por el diseñador.
- Logo real subido al lienzo (logo.png, logo-star.png). B2 colocada a la izquierda en el lienzo (versión 5).
- Sin verificar: movimiento en vivo (estrellas, fugaz, logo, dientes), estados de éxito/error del formulario, fuentes locales para producción.
- Espera: Sí 2 de la dueña o ronda de cambios 2.
18-11-2026 · B3 (ronda 2): sin franja de dientes, fondo de la dueña (malla WebGL + estrellas + estrellas CSS) a media resolución y 30 fps, doctor una sola vez (anillo) con arco de cielo en su sección, anillo con solo nombres, reseñas en cita grande + 2 citas; `$preview` 1440×8173 y 375×9034; falta verlo en vivo.
18-11-2026 · B3 corregida según CORRECCIONES-B3.md (sin arco del doctor, malla en toda la altura, contraste del apoyo, anillo sin etiquetas a 375, enlace de reseñas centrado, teléfono como ícono, formulario con errores por campo y éxito de ejemplo, dirección sin nowrap); `$preview` 1440×7962 y 375×8322.

## 2026-11-18 · Jefe · B3 (ronda de cambios 2 de 2)
- MEZCLA-2 → B3; ld-qa-4 y ld-disenador-uiux-2: PASA; CORRECCIONES-B3 aplicadas. B3 en el lienzo (versión 7), a la izquierda.
- Sin verificar: movimiento en vivo y fps; textos de error/éxito del formulario los escribió el diseñador (no vienen de home.ts).
- Espera: Sí 2 de la dueña.

## 2026-11-18 · Diseñador UI-UX 1 · B4 (hero con figura Anatomy)
- Estilo-B4 y Estilo-B4-movil creados desde B3: hero en 2 columnas con la figura «How braces work» (skill anatomy, `lienzo/anatomy/brackets/`); anillo con el doctor bajó a su sección. Hoja en `lienzo/hoja-b4.md`. Auditoría propia: pasa; extremos de líneas: 0. Figura 164.6 KB + 36.8 KB de script (gzip ≈ 41 KB).
- Sin verificar: runtime real del lienzo, toque real y fps. Espera: la dueña aprueba los textos nuevos de la figura.

## 2026-11-18 · Diseñador UI-UX 1 · B4 correcciones (ronda única)
- Aplicadas las 10 de CORRECCIONES-B4: pasos 4 y 5 como proceso («Teeth start to move», «Teeth move into line»), dientes redondeados, encía propia y cerrada, modelo más grande, manómetro fuera, botón Pause/Play + pausa con cursor/foco, aria corto + describedby, bordes 0.55, casilla 44 px y logo con más contraste. B4 en 1440×8099 y 375×8764; figura 173 KB + 37 KB de script (gzip ≈ 43 KB). Auditoría propia: pasa; extremos de líneas: 0.
- Sin verificar: runtime real del lienzo, toque real, fps, contraste medido con herramienta.

## 2026-11-18 · Diseñador UI-UX 1 · B5 (hero con 5 servicios)
- Estilo-B5 y Estilo-B5-movil (copia de B4 con la figura de 5 servicios: brackets, implantes, puente, corona, blanqueamiento) en el lienzo; figura en `lienzo/anatomy/servicios/` con una página suelta por servicio. Hoja en `lienzo/hoja-b5.md`. B5 pesa 287 KB (65.6 KB gzip), +3 KB gzip sobre B4. Auditoría propia: pasa; extremos de líneas: 0 en los 5 servicios.
- Sin verificar: runtime real del lienzo, toque real, fps, lector de pantalla, contraste medido. Espera: la dueña aprueba textos nuevos y decide si la rotación automática de servicios se queda.
