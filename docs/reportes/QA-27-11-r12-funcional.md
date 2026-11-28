# QA ronda 12 · funcional y visual · 27-11-2026 · QA 1 (ld-qa-web)

Ponytail encendido (confirmado). Edge (Playwright), Vite en el puerto 5612 (cerrado al terminar), sin tocar código ni hacer commit. Scripts: scratchpad `qar12/` (sweep, inter, links, nav, nav2, hero2, braces*). Capturas: `docs/capturas/qa-*-27nov-r12.png` (las `qa-a11y-*` son de QA 2).

**Alcance real:** las 54 rutas de `ALL_ROUTES` (27 páginas × EN/ES) + 30 de blog (15 categorías/artículos × EN/ES) + 2 de 404 = **86 rutas × 5 anchos (375, 768, 1024, 1440, 1920) = 430 cargas, todas completadas, 0 fallos del guion**. Se probó el código vigente (incluye r11e, r11f y r12 de F1, D1 y D2 según la bitácora hasta «D1 ronda 12»).

## VEREDICTO: SHIP WITH FIXES (0 bloqueantes, 1 falla menor, 3 observaciones)

## 1. Punto por punto
| # | Punto del encargo | Resultado | Evidencia |
|---|---|---|---|
| 1a | Héroe B: una sola foto, solo Before/After | PASA | `.ba` con 1 par de imágenes (caso1 antes/después), solo las etiquetas «Before/After» («Antes/Después»), 0 miniaturas/casos/nota, EN y ES, 5 anchos |
| 1b | Divisor automático | PASA | Posición de la manija muestreada cada 0.5 s: oscila (EN 1440: 1161→1231→1069 px; 375: 199→265→226), 7 casos EN/ES 375-1920 |
| 1c | Botón Pausa/Reanudar | PASA | Etiqueta Pause→Resume (ES Pausar→Reanudar), `aria-pressed`, se congela (<1 px en 1.5 s) y reanuda, 7 casos. Pausa del pie: manija quieta y botón deshabilitado. Movimiento reducido: 50 % fijo y sin botón |
| 1d | Flechas y arrastre | PASA | ←/→ ±4 puntos (y pausa), Inicio 0, Fin 100, arrastre del 50 % al 25 %; EN/ES 375 y 1440 |
| 1e | Encuadre centrado junto al texto (1440 y 1920) | PASA | 1440 EN: foto y 168-808 (centro 488) vs texto 169-836 (centro 502); ES: 226-866 (546) vs 169-950 (560). 1920: foto 215-855 (535) vs héroe 85-985 (535); divisor medio en x≈1373-1500 dentro de la zona libre a la derecha del texto (845-1920). Capturas `qa-heroe-{en,es}-{375,1024,1440,1920}`. Ver observación O1 (botón Pausa vs fichas) |
| 2a | Encabezado: logo sin tarjeta | PASA | `.neon` sin fondo, sombra ni borde (`rgba(0,0,0,0)\|none\|none\|0px`) en 430 cargas |
| 2b | Logo centrado, sobresale parejo arriba/abajo | PASA con nota | Medido en el recuadro de la imagen: sobresale 5/15 px (1440-1920) y 3/13 px (375-1024), centro 5 px bajo el de la barra (el PNG tiene aire arriba). A ojo, en las capturas, el trazo visible sobresale ~10 px arriba (estrellita) y ~11 px abajo (curva). La estrellita llega al borde superior de la ventana (y≈0-2); no vi recorte |
| 2c | Logo no tapa menú ni títulos de ninguna página | PASA | 430 cargas: 0 solapes del recuadro del logo con h1/h2/h3/enlaces/botones/menú. Capturas con scroll `qa-encabezado-scroll-*` (el brillo del logo pasa sobre el texto que sube por debajo de la barra, es lo esperado del diseño) |
| 2d | Menú de Servicios: íconos, trazo verde, texto dentro | PASA | 11/11 enlaces con ícono (EN/ES 1280, 1440, 1920), texto fuera del panel: 0; botón «View all services»; trazo `aura-spin` 3 s, ángulo avanza (72°→217° en 1.2 s), `::before` sin animación (fondo fijo). `qa-menu-{en,es}-{1280,1440,1920}` |
| 3a | Íconos con aura iguales hub = destacados | PASA | Mismas reglas `.aura` y mismo degradado cónico menta/medicina (hub baldosa 44 px, destacados 56 px; fondo `rgba(10,21,41,.8)`); 11 íconos en el hub, 5 en destacados. `qa-hub-servicios-en-1440` |
| 3b | Figura animada en 6 servicios con color original | PASA | Las 6 páginas con modelo (dentures-bridges, veneers-crowns, all-on-4/6, implants, whitening, braces) se mueven; `engine.js` sin diferencia contra HEAD (colores originales), bandeja azul acero. Las otras 5 no tienen modelo (conocido, no es falla) |
| 3c | Pausa propia y pausa total | PASA | Las 6: con Pausa propia `.brk-bob` queda `paused` y no hay animaciones corriendo; con «Pausar animaciones» del pie queda quieta. En braces/whitening ES algunas muestras de imagen alternan entre 2 estados, pero solo difieren 4 píxeles de 170 784 con diferencia máxima de 4 niveles (ruido, no se ve). La falla r11 (`brk-bob`) quedó corregida |
| 4a | Seguros/Financiamiento/Convenios sin píldoras | PASA | 0 `.ben-tabs` en las 6 páginas EN/ES |
| 4b | Botón verde con teléfono y número | PASA | `.btn--call` solo «(702) 805-8688», ícono, fondo menta, texto noche, 54 px, `tel:+17028058688`, en las 3 páginas EN/ES |
| 4c | Buscador de Seguros | PASA | 24 planes; «cigna»→1; «zzzxx»→«No plans match “zzzxx”» |
| 4d | Hub de Beneficios igual | PASA | Sin botón verde, conserva su enlace `tlink`, sin píldoras (EN/ES) |
| 5a | Contact: título centrado, tipografía de los títulos | PASA | «Dental emergencies» / «Emergencias dentales» en Newsreader 400 (igual que el h1 de las demás páginas: 72 px a 1440), centro del título = centro de la página en 375, 768, 1024, 1440, 1920 |
| 5b | 24/7 debajo, texto y botón centrados | PASA | Orden título → 24/7 → texto → botón, `text-align:center`, centros x iguales a los del título en los 10 casos |
| 5c | Columnas de reserva en escritorio | PASA | 1024-1920: foto+moneda a la izquierda y cita+datos a la derecha (p. ej. 1440: 63-581 y 653-1377); 375/768 apilado. 1 h1 |
| 6a | WhatsApp no aparece | PASA | 0 coincidencias de «whatsapp»/`wa.me` en texto, enlaces, `aria-label`, `title`, `alt` ni fichas flotantes en 430 cargas ni en los 21 enlaces del pie |
| 6b | Fichas flotantes sin hueco | PASA | Quedan 2 fichas (pausa 32 px y subir 38 px) con 14 px de separación vertical, alineadas a la derecha, 375 y 1440 (`qa-fichas-*`) |
| 7a | Fondo azul oscuro plano | PASA | `html/body` = `rgb(10,21,41)`, sin `background-image`, 0 `canvas`, 0 `.backdrop/.dots/.grain` en 430 cargas (las 156 coincidencias con `.star` en el inicio son las estrellas de las reseñas) |
| 7b | Sin estrellas/cortes/secciones rotas | PASA | Recorrido con scroll del inicio (1440 y 375), Servicios, Contact, Seguros y Convenios 768; contacto sheets de las 86 rutas a 1440 y 375: sin cortes ni secciones vacías |
| 8a | Todos los enlaces | PASA | 0 internos rotos en las 86 rutas (se recolectaron todos los `href` de cada página); 144/144 anclas `#` existen en su destino; 0 enlaces sin nombre; 0 `_blank` sin `noopener`; pie 21 enlaces (15 internos clicados: llegan; EN, ES y 375); menú móvil 5 + 12 de Servicios (375, 768, 1024) y desplegables Servicios/Beneficios/Más (20 enlaces clicados en EN/ES 1440 y 375) llegan a su ruta |
| 8b | Todos los botones | PASA | 728 botones no-submit clicados en las 86 rutas a 1440: 0 errores de página ni navegaciones inesperadas |
| 8c | 404 | PASA | `/en/xx` y `/es/xx` muestran h1 «Page not found»/«Página no encontrada», 9 enlaces que llegan a rutas reales. Nota: el servidor de desarrollo responde 200, no 404 (ver «No verificado») |
| 8d | Cambio de idioma | PASA | En las 84 rutas el selector lleva al equivalente (p. ej. /en/about→/es/nosotros), 84/84; ida y vuelta vuelve a la misma ruta (5 casos) |
| 9a | 0 desborde horizontal | PASA | 430 cargas: `scrollWidth ≤ clientWidth` siempre |
| 9b | 0 errores de consola | PASA | 430 cargas + flujos: 0 `console.error`, 0 `pageerror`, 0 respuestas ≥400, 0 peticiones fallidas |

## 2. Por página (EN y ES, los 5 anchos juntos: PASA si lo cumplió en los 5)
Columnas: h1 (cantidad) · desborde · errores de consola · WhatsApp · fondo · choque del logo · título.

| Ruta | h1 | desborde | errores | WhatsApp | fondo | logo | título |
|---|---|---|---|---|---|---|---|
| /en | 1 | 0 | 0 | no | plano | sin choque | Emergency orsmile makeover,we're here. |
| /es | 1 | 0 | 0 | no | plano | sin choque | ¿Emergencia ocambio de sonrisa?Aquí estamos. |
| /en/about | 1 | 0 | 0 | no | plano | sin choque | Your teeth shouldlast a lifetime. |
| /es/nosotros | 1 | 0 | 0 | no | plano | sin choque | Tus dientes debendurar toda la vida. |
| /en/faq | 1 | 0 | 0 | no | plano | sin choque | Questions & answersQuestions& answers |
| /es/preguntas-frecuentes | 1 | 0 | 0 | no | plano | sin choque | Preguntas y respuestasPreguntasy respuestas |
| /en/services | 1 | 0 | 0 | no | plano | sin choque | Dental services for every smile |
| /es/servicios | 1 | 0 | 0 | no | plano | sin choque | Servicios dentales para cada sonrisa |
| /en/services/routine-dental-care | 1 | 0 | 0 | no | plano | sin choque | Routine Dental Care |
| /es/servicios/cuidado-dental-de-rutina | 1 | 0 | 0 | no | plano | sin choque | Cuidado dental de rutina |
| /en/services/dentures-and-bridges | 1 | 0 | 0 | no | plano | sin choque | Dentures & Bridges |
| /es/servicios/dentaduras-y-puentes | 1 | 0 | 0 | no | plano | sin choque | Dentaduras y puentes |
| /en/services/dental-cleaning | 1 | 0 | 0 | no | plano | sin choque | Dental Cleaning |
| /es/servicios/limpieza-dental | 1 | 0 | 0 | no | plano | sin choque | Limpieza dental |
| /en/services/wisdom-tooth-removal | 1 | 0 | 0 | no | plano | sin choque | Wisdom Tooth Removal |
| /es/servicios/extraccion-de-muelas-del-juicio | 1 | 0 | 0 | no | plano | sin choque | Extracción de muelas del juicio |
| /en/services/dental-appliances | 1 | 0 | 0 | no | plano | sin choque | Dental Appliances |
| /es/servicios/aparatos-dentales | 1 | 0 | 0 | no | plano | sin choque | Aparatos dentales |
| /en/services/porcelain-veneers-and-crowns | 1 | 0 | 0 | no | plano | sin choque | Porcelain Veneers & Crowns |
| /es/servicios/carillas-y-coronas-de-porcelana | 1 | 0 | 0 | no | plano | sin choque | Carillas y coronas de porcelana |
| /en/services/cosmetic-bonding | 1 | 0 | 0 | no | plano | sin choque | Cosmetic Bonding |
| /es/servicios/resinas-esteticas | 1 | 0 | 0 | no | plano | sin choque | Resinas estéticas (bonding) |
| /en/services/all-on-4-and-all-on-6 | 1 | 0 | 0 | no | plano | sin choque | All-on-4 & All-on-6 |
| /es/servicios/all-on-4-y-all-on-6 | 1 | 0 | 0 | no | plano | sin choque | All-on-4 y All-on-6 |
| /en/services/dental-implants | 1 | 0 | 0 | no | plano | sin choque | Dental Implants |
| /es/servicios/implantes-dentales | 1 | 0 | 0 | no | plano | sin choque | Implantes dentales |
| /en/services/teeth-whitening | 1 | 0 | 0 | no | plano | sin choque | Teeth Whitening |
| /es/servicios/blanqueamiento-dental | 1 | 0 | 0 | no | plano | sin choque | Blanqueamiento dental |
| /en/services/invisalign-and-braces | 1 | 0 | 0 | no | plano | sin choque | Invisalign & Braces |
| /es/servicios/invisalign-y-brackets | 1 | 0 | 0 | no | plano | sin choque | Invisalign y brackets |
| /en/benefits | 1 | 0 | 0 | no | plano | sin choque | Benefits that make your care easier to manage |
| /es/beneficios | 1 | 0 | 0 | no | plano | sin choque | Beneficios que hacen tu atención más sencilla |
| /en/insurance | 1 | 0 | 0 | no | plano | sin choque | Insurance |
| /es/seguros | 1 | 0 | 0 | no | plano | sin choque | Seguros |
| /en/financing | 1 | 0 | 0 | no | plano | sin choque | Financing |
| /es/financiamiento | 1 | 0 | 0 | no | plano | sin choque | Financiamiento |
| /en/agreements | 1 | 0 | 0 | no | plano | sin choque | Agreements |
| /es/convenios | 1 | 0 | 0 | no | plano | sin choque | Convenios |
| /en/financing/sunbit | 1 | 0 | 0 | no | plano | sin choque | Sunbit |
| /es/financiamiento/sunbit | 1 | 0 | 0 | no | plano | sin choque | Sunbit |
| /en/financing/cherry | 1 | 0 | 0 | no | plano | sin choque | Cherry |
| /es/financiamiento/cherry | 1 | 0 | 0 | no | plano | sin choque | Cherry |
| /en/financing/plexpay | 1 | 0 | 0 | no | plano | sin choque | PlexPay |
| /es/financiamiento/plexpay | 1 | 0 | 0 | no | plano | sin choque | PlexPay |
| /en/financing/icreditworks | 1 | 0 | 0 | no | plano | sin choque | iCreditWorks |
| /es/financiamiento/icreditworks | 1 | 0 | 0 | no | plano | sin choque | iCreditWorks |
| /en/contact | 1 | 0 | 0 | no | plano | sin choque | Dental emergencies242012345678940123456789012345678977012345 |
| /es/contacto | 1 | 0 | 0 | no | plano | sin choque | Emergencias dentales2420123456789401234567890123456789770123 |
| /en/blog | 1 | 0 | 0 | no | plano | sin choque | Understand your oral health better |
| /es/blog | 1 | 0 | 0 | no | plano | sin choque | Entiende mejor tu salud bucal |
| /en/privacy-policy | 1 | 0 | 0 | no | plano | sin choque | Privacy PolicyPrivacy Policy |
| /es/aviso-de-privacidad | 1 | 0 | 0 | no | plano | sin choque | Aviso de privacidadAviso de privacidad |
| /en/terms-and-conditions | 1 | 0 | 0 | no | plano | sin choque | Terms and ConditionsTerms and Conditions |
| /es/terminos-y-condiciones | 1 | 0 | 0 | no | plano | sin choque | Términos y condicionesTérminos y condiciones |
| /en/blog/implants-and-tooth-replacement | 1 | 0 | 0 | no | plano | sin choque | Implants and tooth replacement |
| /es/blog/implantes-y-reemplazo-de-dientes | 1 | 0 | 0 | no | plano | sin choque | Implantes y reemplazo de dientes |
| /en/blog/cosmetic-and-restorative-dentistry | 1 | 0 | 0 | no | plano | sin choque | Cosmetic and restorative dentistry |
| /es/blog/odontologia-estetica-y-restauradora | 1 | 0 | 0 | no | plano | sin choque | Odontología estética y restauradora |
| /en/blog/orthodontics | 1 | 0 | 0 | no | plano | sin choque | Orthodontics |
| /es/blog/ortodoncia | 1 | 0 | 0 | no | plano | sin choque | Ortodoncia |
| /en/blog/cleanings-and-extractions | 1 | 0 | 0 | no | plano | sin choque | Cleanings and extractions |
| /es/blog/limpiezas-y-extracciones | 1 | 0 | 0 | no | plano | sin choque | Limpiezas y extracciones |
| /en/blog/dental-implants-what-they-are | 1 | 0 | 0 | no | plano | sin choque | Dental implants: what they are and what is checked before pl |
| /es/blog/implantes-dentales-que-son | 1 | 0 | 0 | no | plano | sin choque | Implantes dentales: qué son y qué se revisa antes de colocar |
| /en/blog/all-on-4-implants | 1 | 0 | 0 | no | plano | sin choque | All-on-4 implants: a fixed arch on four implants |
| /es/blog/implantes-all-on-4 | 1 | 0 | 0 | no | plano | sin choque | Implantes All-on-4: una arcada fija sobre cuatro implantes |
| /en/blog/all-on-6-implants | 1 | 0 | 0 | no | plano | sin choque | All-on-6 implants: how it differs from All-on-4 |
| /es/blog/implantes-all-on-6 | 1 | 0 | 0 | no | plano | sin choque | Implantes All-on-6: en qué se diferencian de All-on-4 |
| /en/blog/partial-and-complete-dentures | 1 | 0 | 0 | no | plano | sin choque | Partial and complete dentures: the basic differences |
| /es/blog/dentaduras-parciales-y-completas | 1 | 0 | 0 | no | plano | sin choque | Dentaduras parciales y completas: las diferencias básicas |
| /en/blog/dental-crowns | 1 | 0 | 0 | no | plano | sin choque | Dental crowns: when covering a tooth is considered |
| /es/blog/coronas-dentales | 1 | 0 | 0 | no | plano | sin choque | Coronas dentales: cuándo se considera cubrir un diente |
| /en/blog/dental-veneers | 1 | 0 | 0 | no | plano | sin choque | Dental veneers: what they can and cannot change |
| /es/blog/carillas-dentales | 1 | 0 | 0 | no | plano | sin choque | Carillas dentales: qué pueden y qué no pueden cambiar |
| /en/blog/teeth-whitening | 1 | 0 | 0 | no | plano | sin choque | Teeth whitening: why an evaluation first is a good idea |
| /es/blog/blanqueamiento-dental | 1 | 0 | 0 | no | plano | sin choque | Blanqueamiento dental: por qué conviene una evaluación prime |
| /en/blog/orthodontics-alignment-and-bite | 1 | 0 | 0 | no | plano | sin choque | Orthodontics: tooth alignment and bite |
| /es/blog/ortodoncia-alineacion-y-mordida | 1 | 0 | 0 | no | plano | sin choque | Ortodoncia: alineación de los dientes y mordida |
| /en/blog/clear-aligners | 1 | 0 | 0 | no | plano | sin choque | Clear aligners: when they can be an option |
| /es/blog/alineadores-transparentes | 1 | 0 | 0 | no | plano | sin choque | Alineadores transparentes: cuándo pueden ser una opción |
| /en/blog/professional-dental-cleaning | 1 | 0 | 0 | no | plano | sin choque | Professional dental cleaning: what it adds to your daily car |
| /es/blog/limpieza-dental-profesional | 1 | 0 | 0 | no | plano | sin choque | Limpieza dental profesional: qué aporta a tu cuidado diario |
| /en/blog/extractions-and-wisdom-teeth | 1 | 0 | 0 | no | plano | sin choque | Extractions and wisdom teeth: how the decision is made |
| /es/blog/extracciones-y-muelas-del-juicio | 1 | 0 | 0 | no | plano | sin choque | Extracciones y muelas del juicio: cómo se toma la decisión |
| /en/xx-no-existe | 404 | 0 | 0 | no | plano | sin choque | Page not found |
| /es/xx-no-existe | 404 | 0 | 0 | no | plano | sin choque | Página no encontrada |
(Los h1 con salto de línea se muestran pegados por la captura de texto, no es falla. Las rutas 404 llevan «404» en la columna h1.)

## 3. Lista de fallas
**Ninguna falla funcional ni bloqueante.** Una falla menor y observaciones:

1. **F1 (menor, visual) · Botón «Pause/Pausar» del héroe choca con las fichas flotantes.** El botón sale abajo a la derecha de la foto y las fichas flotantes (pausa y subir) están fijas a la ventana; según el alto de pantalla se tocan o se montan. Medido: 1440×900 ES solapan 16 px²; 1024×768 EN solapan 510 px²; 1440×900 EN quedan a 2 px (se tocan); 1280×720 y 1366×768 están a 1-4 px dentro de la franja de las fichas sin tocar. Captura `qa-heroe-en-1440-27nov-r12.png` y `qa-heroe-es-1440-27nov-r12.png`. Archivo y causa probable: `apps/web/src/styles/before-after.css` (posición de `.ba-pause`, abajo a la derecha del `.hx-slot`, y `.hx-slot` con `width:min(57vw,1300px)` en `hero.css`) contra `apps/web/src/styles/floating-contact.css` (`.float-contact` fijo, 1376-1414 px a 1440). Arreglo sugerido: dejar el botón con margen derecho ≥ 72 px en ≥1000 px de ancho, o subirlo un renglón. Afecta solo a quien vea el inicio sin hacer scroll.

## 4. Observaciones (no son fallas)
- **O1.** Medido en el recuadro del PNG, el logo sobresale desigual (5 arriba / 15 abajo a 1440; 3 / 13 a 375) porque el PNG trae aire arriba; visualmente el trazo sobresale parejo (~10 y ~11 px). Si la dueña lo ve más abajo que arriba, el ajuste es mover el recuadro unos 5 px hacia arriba en `styles/site.css` (bloque del header). A 375 y 1024 la barra mide 88 px y a 1440-1920 mide 85 px (la bitácora decía 75-78): sin consecuencia visible.
- **O2.** Los logos de Cherry, PlexPay e iCreditWorks se ven tenues sobre el fondo oscuro en sus páginas (`/en/financing/cherry`, `/plexpay`, `/icreditworks`, y ES); son imágenes de marca, no se recolorean. Queda a decisión de diseño (por ejemplo, una placa clara detrás o la versión blanca del logo).
- **O3.** Con la barra fija, el brillo del logo (que sobresale ~11 px) pasa sobre el texto que sube al hacer scroll. Es el efecto pedido; se anota por si a la dueña le molesta la lectura en ese momento.
- **O4.** Íconos repetidos en el hub de Servicios (chispa x4, diente x2): ya anotado por F2 en r11.

## 5. No verificado
- Lector de pantalla real, Safari/Firefox y toque en teléfono real (solo Edge, y emulación de ancho).
- Enlaces externos (Adit, Google Maps, SAHARA, redes, financieras, fuentes del blog): se revisó que el `href` esté bien formado, abra en pestaña nueva con `noopener` y no sea WhatsApp; no se pidió ninguno (regla: no contactar fuera de la oficina).
- Formularios: el formulario corto del inicio no se envió (no hay envío real y la regla prohíbe contactos de prueba); se probaron buscadores y botones que no envían.
- `404` real: el servidor de desarrollo de Vite responde 200 en rutas desconocidas (la pantalla es la correcta); el código HTTP en producción (Vercel) no se pudo comprobar aquí.
- Aspecto del 24/7 y del divisor en movimiento solo por muestreo de posiciones/imágenes, no a ojo en vivo.
- Un `Target crashed` de Edge apareció una vez al recorrer 16 contextos seguidos en una página con figura 3D; repetido 16 veces no volvió a ocurrir (se trata como del arnés, no del sitio).
- Contraste, foco y accesibilidad: no es de este informe (QA 2).
- Capturas de página completa: no usadas para juzgar el fondo (artefacto de `fullPage`); se usaron capturas de viewport con scroll.

## 6. Capturas
`docs/capturas/qa-heroe-{en,es}-{375,1024,1440,1920}`, `qa-menu-{en,es}-{1280,1440,1920}`, `qa-menumovil-*`, `qa-hub-servicios-en-1440`, `qa-figura-{dentures-and-bridges,dental-implants,braces}-en-1440`, `qa-ben-{ins,fin,conv,hub}[-es]-1440`, `qa-contact-{en,es}-{375,1440,1920}`, `qa-fichas-en-{375,1440}`, `qa-encabezado-scroll-*`, `qa-pie-{en,es}-1440`, `qa-pie-en-375`, `qa-404-en-1440`; todas con sufijo `-27nov-r12.png`. Las 430 capturas del barrido quedan en el scratchpad (`qar12/shots`).
