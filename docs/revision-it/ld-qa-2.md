# Revisión ld-qa-2 · Servicios (19-11-2026)

Alcance: portada `/services` y las 11 páginas `/services/<nombre>`, en 1440, 768 y 375 px, en Edge (Playwright) contra http://localhost:5181. Solo revisión: no se cambió código ni se tocó git. No se envió ningún formulario con datos (solo envío vacío para ver los errores).

## Veredicto: PASA con reservas
Lo técnico está limpio. La reserva es una sola: texto de relleno («Lorem ipsum») visible al público.

## Fallos
### Alta
1. **Texto de relleno «Lorem ipsum…» visible en pantalla.**
   - Dónde: `/services` (tarjeta Dental Appliances: 3 puntos; tarjeta Invisalign & Braces: 1 punto) y las páginas `/services/dental-appliances` (subtítulo, 3 puntos y texto «About dental appliances») y `/services/invisalign-and-braces` (3.er punto y texto «About Invisalign and braces»).
   - Cómo verlo: abrir esas dos páginas, o la portada de servicios a 1440/768/375.
   - Origen: `apps/web/src/content/services.ts` (constante `LOREM`, marcadas `placeholder: true`). Es un recordatorio del propio código, pero en pantalla no hay ninguna marca de «pendiente»; no es publicable así.
   - Efecto extra: la tarjeta de Dental Appliances en la portada queda muy alta y rompe el ritmo de la rejilla.

### Media
2. **Seis páginas muestran un recuadro vacío con un ícono grande** en el lugar de la figura (Routine Dental Care, Dental Cleaning, Wisdom Tooth Removal, Dental Appliances, Cosmetic Bonding, Pediatric Dentistry; a 375 ocupa casi una pantalla). No es un error (el código lo prevé, solo 5 servicios tienen figura), pero se ve como un hueco. Reproducir: abrir cualquiera de esas páginas.

### Baja
3. «Learn more about this treatment» lleva a la portada del blog (`/blog`) en Cosmetic Bonding y Dental Appliances (no tienen artículo). Funciona, pero el texto del botón promete un artículo.
4. Routine Dental Care y Dental Cleaning llevan al mismo artículo (`/blog/professional-dental-cleaning`).
5. La portada repite el nombre: el grupo «Pediatric Dentistry» tiene una sola tarjeta con el mismo nombre; «Orthodontics» también tiene una sola. Es cosmético.

## Lo que sí se verificó (todo bien)
- 12 páginas × 3 tamaños = 36 cargas: cada una con título de pestaña correcto, un solo h1, un solo `main`, 0 errores/avisos de consola, 0 respuestas 4xx/5xx, 0 imágenes rotas, 0 desbordes horizontales, 0 objetivos táctiles menores de 24 px.
- axe-core (WCAG 2.0/2.1/2.2 A y AA + buenas prácticas): 0 violaciones en las 36 cargas. Recordatorio: axe cubre solo una parte de WCAG.
- Navegación: los 11 enlaces «View service» de la portada llevan a su página; los enlaces internos de la portada responden 200; las migas de pan, botón de cita (`#appointment`, baja al formulario) y teléfono `tel:+17028058688` funcionan.
- Formulario en cada página de servicio: llega con el servicio ya elegido en el selector (11 de 11). Envío vacío: marca los 5 campos con `aria-invalid`, muestra mensajes claros y manda el foco al primer campo.
- Figuras (Dentures & Bridges, Veneers & Crowns, Dental Implants, Teeth Whitening, Invisalign & Braces): pasos 1-N con botones, pausa/play (cambia su etiqueta), avance automático, control tipo deslizador con teclado (`role=slider`, aria-valuenow), foco visible (contorno de 3 px), texto «Illustration. Individual results vary.». A 375 se ve completa y legible.
- Movimiento reducido: la figura queda quieta en el último paso y oculta el botón de pausa (correcto).

## No verificado
- Arrastrar la perilla dorada con el ratón o el dedo (solo se probaron botones y teclado en el control).
- Lectores de pantalla reales, zoom al 400 % y contraste calculado a mano (solo axe).
- 1920 px y dispositivos reales; Safari/Firefox (solo Edge).
- Envío real del formulario (no existe conexión; además no se crean contactos de prueba).
- Menú desplegable de «Services» y el pie en todas las páginas (le toca a ld-qa-5).
- Exactitud de los textos médicos frente al sitio oficial.

## Evidencia
Capturas completas en el espacio de trabajo temporal: `shot1440_*`, `shot768_*`, `shot375_*`, más `fig375b.png` y `form1440.png`, en `C:\Users\DENTAL~1\AppData\Local\Temp\claude\cdce12c4c776118d\98500c9e-c214-44f7-a603-65ac9cda5605\scratchpad\`.
