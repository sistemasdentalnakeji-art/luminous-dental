# QA visual · Ronda final 26-11-2026 · Luminous Dental

Quién: QA 2 (`ld-qa-2`). Solo pruebas, sin cambios de código ni commit.
Cómo: servidor de desarrollo local (`npx vite --port 5199`), Playwright con Edge (`playwright-core`), 12 páginas x EN/ES x 320, 375, 768, 1440 y 1920 = 120 capturas de página completa en `docs/reportes/qa-26nov-visual/<página>-<idioma>-<ancho>.png`. Cada una se recorrió con scroll antes de capturar, y un script midió desborde horizontal, imágenes rotas, texto recortado, errores de consola/HTTP, menú y pie, y el orden de Contact.
Páginas: home, services, service (Dental Implants / Implantes dentales), benefits, insurance, financing, agreements, contact, about, faq, terms, privacy.

## Veredicto: NO LISTO en celular (2 fallos altos); escritorio y tableta aceptables con pendientes de pulido

## Resultado automático (observado)
- 120/120 páginas cargan 200, sin errores de consola ni de red, sin imágenes rotas.
- Desborde horizontal de la página: ninguno en ningún ancho (`scrollWidth` = ancho de ventana). Los desbordes de abajo están recortados por su contenedor, por eso la medida global no los ve.
- Menú (escritorio y panel móvil con selector de idioma) y pie completos en todas las páginas. Pie: logo y frase, 5 columnas (Servicios, Beneficios, Clínica, Legal, Contacto), horario, dirección, teléfono, emergencias 24/7, redes, idioma, derechos.
- `<html lang>` = `en` / `es-MX` y títulos en el idioma correcto en las 24 rutas.
- Orden de Contact correcto en EN y ES, a 375 y 1440: emergencias 24/7 (y=85) → ubicación (≈770) → cita (≈1440) → letrero y moneda (al final).
- Español: sin textos en inglés salvo lo esperado (ver Bajo).

## Fallos por gravedad

### ALTO
1. **Convenios del inicio, recortado en celular.** `/es` a 320 y 375 (y `/en` a 320): el botón «Ver los beneficios de SAHARA Las Vegas» llega a x=412 con ventana de 375 (EN a 320: 350 de 320) y la pastilla «SAHARA Las Vegas» a x=331 de 320. Se corta el texto del botón y el nombre, y el botón queda fuera de la tarjeta. Captura: `home-es-375.png`, `home-es-320.png`, `home-en-320.png` (sección Convenios, ~y 5000 a 5300 px). Archivo probable: `apps/web/src/components/Agreements.tsx` + `apps/web/src/styles/home-b1.css` (botón sin `white-space:normal`/`max-width:100%`, pastilla con ancho fijo).
2. **Teléfono de la sección 24/7 se sale de su botón a 320.** `/en/contact` y `/es/contacto` a 320: el número «(702) 805-8688» (span `nw`, no se parte) mide 21 px más que el botón blanco; los últimos dígitos quedan fuera de la píldora, sobre fondo oscuro, y el ícono de teléfono se pierde. A 375 queda a 7 px (justo). Captura: `contact-es-320.png`, `contact-en-320.png`. Archivo probable: `apps/web/src/components/Emergency.tsx` (`.emg__call`) + `home-b1.css` (reducir tamaño de letra/ícono por debajo de 360 px o permitir `flex-wrap`). Es justo el bloque que la dueña quiere recalcar.

### MEDIO
3. **Botones flotantes (pausa / rueda / WhatsApp) tapan contenido en celular.** En 320 y 375 se montan sobre la flecha del botón principal del héroe y sobre el botón «Llama o escribe», y sobre las pastillas de filtros de Servicios («Quiero mejorar mi sonrisa»). Captura: `home-es-320.png` (arriba), `services-es-320.png`. Archivo: `apps/web/src/components/FloatingContact.tsx` + `styles/floating-contact.css` (bajar al borde inferior o reducir/colapsar en móvil).
4. **Botón «Llama o escribe» de «Reserva tu visita» con el texto roto.** ES en todos los anchos: a 320 se ve «Llama o / escribe(702) 805-8688 / al» (sin espacio y con el «al» huérfano); en EN a 1440 se ve «Call or text(702) 805-8688». Causa: el texto suelto y el `<span class="nw">` quedan como elementos flex y pierden el espacio. Capturas: `home-es-320.png`, `contact-en-1440.png` (sección «Book your visit»). Archivo: `apps/web/src/components/BookVisit.tsx` línea 45 (`bv__call`): meter todo en un solo `<span>` o añadir `gap`.
5. **Pastilla «Los más solicitados» mal colocada en Servicios destacados (ES, 320 y 375).** El texto mide 398-405 px dentro de un contenedor de 192 px y la pastilla se monta sobre el borde superior de la tarjeta, tapando la pestaña «Implantes». Captura: `home-es-320.png`, `home-es-375.png`. Archivo: `apps/web/src/components/FeaturedServices.tsx` + `styles/featured.css` (en EN es corta y cabe; el español es más largo).
6. **Hub de Servicios (1440, ES y EN): tarjetas de tamaños dispares y huecos.** La primera tarjeta de cada grupo (Cuidado dental de rutina, Carillas y coronas) es el doble de ancha con una sola línea de texto y mucho vacío; Ortodoncia es una tarjeta sola con la mitad derecha vacía; «Aparatos dentales» tiene una descripción de relleno («Llámanos para saber más»). Se ve de plantilla. Captura: `services-es-1440.png`, `services-en-1440.png`. Archivo: `apps/web/src/pages/Services.tsx` + `styles/services-hub.css` (rejilla pareja, contenido de `content/services.ts`).
7. **Contact, tarjeta de ubicación (1440): descompensada.** Dirección / teléfono / correo en una fila y el horario solo, abajo a la izquierda, con la mitad derecha vacía; el horario con sangría irregular. Captura: `contact-en-1440.png`. Archivo: `apps/web/src/components/ContactLocation.tsx` (+ `Hours.tsx`).
8. **Cierre de Inicio y Contact (letrero y moneda), 1440.** El letrero (chico, a la izquierda) y la moneda (centrada) flotan en un bloque enorme y vacío, sin alinearse entre sí ni con la rejilla de arriba. Capturas: `home-en-1440.png`, `contact-en-1440.png`. Archivos: `VegasSign.tsx`, `LocationMap.tsx`, `ContactLocation.tsx`.

### BAJO
9. Silueta decorativa del pie cruza el texto del horario («4:00 p. m.») en 1440 en todas las páginas. Captura: `faq-es-1440.png`, `terms-en-1440.png`. Archivo: `components/footer-city/*` + `styles/footer-city.css` (bajar opacidad o alejar del bloque Contacto).
10. Beneficios (hub): «Cómo funciona» con las tres tarjetas escalonadas a distinta altura, se lee como desalineado; el recuadro de cifras de la cabecera (24 / 4 / 24/7) tiene mosaicos de distinto peso. Logos de aseguradoras ilegibles por pequeños («Dental Health Services», «iCreditWorks» desvaído). Capturas: `benefits-es-1440.png`. Archivos: `BenefitsHeader.tsx`, `InsurancePlans.tsx`, `styles/benefits-r2.css`.
11. Inicio 1440: separación vertical dispareja entre Seguros, Convenios y Reseñas (hasta ~200 px de aire en unos y ~60 en otros). Captura: `home-en-1440.png`.
12. Textos en inglés dentro de `/es/`: reseñas de Google en inglés (citas textuales, aceptable pero conviene avisar a la dueña o poner «Reseña de Google, en inglés»), «Dental Health Services» y «Premier Insurance Company» (nombres de aseguradoras, aceptable). El pie dice «Privacy Notice» y la página «Privacy Policy» en EN: unificar.
13. Términos / Privacidad / Preguntas: el diseño de tarjetas apiladas con scroll fijo deja ~450 px de vacío bajo la tarjeta corta al llegar a ella (visto con captura de ventana). Es de diseño (réplica de Nakeji), solo se anota.

## Estilo (plantilla / confiable)
- Todo se mantiene en noche, vidrio, serif y menta/dorado; la sección 24/7 de Contact ahora se ve de clínica (limpia, calma, teléfono grande) y queda primera. About (Dr. Hahn en arco, cifras, «Lo que nos importa») se ve cuidado y sin plantilla.
- Lo que más se ve de plantilla: hub de Servicios (punto 6) y vacíos de ubicación/letrero (7 y 8). Dato a vigilar: «4 años de experiencia» en About, confirmar con la clínica.

## Aclaraciones sobre las capturas
- En las capturas de página completa aparece una banda horizontal a la altura de la ventana (≈ y 700-900): es el fondo estrellado fijo recortado por la captura, no un fallo (en el recorrido normal no se ve). No lo cuento.
- Terms, Privacy y FAQ usan tarjetas apiladas: la captura completa muestra solo la primera. Verifiqué con captura de ventana a mitad de página que las 14 secciones de Términos se muestran al llegar a ellas.

## No verificado
- Revisé a ojo (imagen) Inicio EN/ES, Contact EN/ES, Servicios ES, Servicio ES, Beneficios ES, Convenios ES, About ES, FAQ ES, Terms EN y trozos de 320 de Inicio, Contact y Servicios. Insurance, Financing, Privacy, y los anchos 768 y 1920 se cubrieron solo con las medidas automáticas (sin desborde ni imágenes rotas) y no con revisión visual completa.
- Navegador solo Edge (Chromium); sin Safari/Firefox. Sin pruebas de accesibilidad ni rendimiento (son de QA 3). No se probó el formulario ni los enlaces (QA web).
- Se probó contra el servidor de desarrollo, no contra el build publicado.
