# Revisión QA 5 · About, Insurance & Financing, Contact, página de error, menú y pie

Fecha: 19-11-2026 · Página: http://localhost:5181 · Navegador: Edge (Playwright 1.65) a 1440, 768 y 375 px · Capturas: `docs/revision-it/ld-qa-5/`

## Veredicto: PASA con reservas
Todo funciona y no hay errores de consola, enlaces rotos ni desbordes. Hay 1 botón muerto en la página de error y 1 frase que la propia documentación dice que no se publique.

## Fallos
### Media
1. **Frase de seguros publicada sin confirmar.** `docs/datos.md` (fila Seguros) dice que «afiliados a la mayoría de seguros privados» no se publica sin confirmar. En pantalla está en About («We work with most private dental insurance. Our providers are affiliated with most private dental insurance») e Insurance & Financing («We work with most private dental insurance»). Reproducir: abrir /about (sección «Why patients choose») y /insurance-financing.
2. **Botón «Request an appointment» muerto en la página de error.** En /nope (cualquier dirección inexistente) el botón del encabezado y el del menú del celular apuntan a `#appointment`, que ahí no existe: no pasa nada al tocarlo. Reproducir: abrir http://localhost:5181/nope y pulsar el botón. Los enlaces del pie «Request an appointment» tienen el mismo problema en esa página. Código: `components/Header.tsx` (href="#appointment") y `pages/NotFound.tsx` (sin sección de cita).
3. **«Insurance & Financing» no tiene nada de financiamiento.** El título lo promete, pero solo hay una frase de seguros y el aviso de SAHARA; no dice nada de pagos. Sin lista de aseguradoras. (La falta de datos es POR CONFIRMAR; lo grave es que el título promete algo que la página no tiene.)

### Baja
4. **Menú abierto en celular: el Tab se escapa al «Skip to main content».** Con el panel abierto (375 px), Tab recorre el menú y el botón, pero luego llega al enlace de saltar contenido (queda fuera del encabezado y no está inerte). El resto de la página sí queda bloqueado. Reproducir: abrir el menú y pulsar Tab ~10 veces.
5. **Enlaces externos inconsistentes.** Pie y redes abren pestaña nueva (`target=_blank`); «Open in Google Maps» de Contact/Appointment y «See SAHARA Las Vegas benefits» abren en la misma pestaña (solo `rel=noopener`). Se pierde la página al ir a Maps.
6. **Contact repite datos.** Dirección y «Open in Google Maps» aparecen dos veces seguidas (tarjeta de contacto y «Visit us» del bloque de cita). Y no tiene mapa ni horario (el horario es POR CONFIRMAR, no se repite).
7. **About: hueco grande** (~200 px a 1440) entre la sección del doctor y «Why patients choose», y sin foto del doctor (correcto, no hay foto real). Visual, no roto. Ver `s-about-1440.png`.
8. **El salto «Skip to main content» deja `#main` en la dirección**, así que «Atrás» necesita un clic extra. Menor.
9. **Páginas inexistentes responden 200**, no 404 (en el servidor local; /robots.txt y /sitemap.xml también muestran la página de error con código 200). Revisar en Vercel al publicar (`vercel.json`); lo ve el director de tecnología. `index.html` tiene `noindex,nofollow` (esperado antes de publicar; recordar quitarlo).

## Lo que sí pasa (observado)
- **Rutas:** /about, /insurance-financing, /contact, /nope cargan con título propio, un solo `h1`, un solo `main`, sin imágenes sin `alt`. `/about/` funciona; `/ABOUT` da página de error (aceptable).
- **Desborde horizontal:** ninguno a 1440, 768 y 375 en las 4 páginas y en /, /services, /blog.
- **Consola y red:** 0 errores, 0 avisos, 0 respuestas 4xx/5xx en esas páginas.
- **Enlaces:** rastreé las 31 páginas desde el menú y el pie: ninguna lleva a la página de error; todos los `#` existen. Externos revisados por dirección (tel, mailto, Maps, Instagram, Facebook, SAHARA, 11 fuentes del blog); no los abrí en vivo (ver «No verifiqué»).
- **Menú escritorio:** abre con ratón (hover y clic), Enter, ArrowDown/Up/Home/End, Escape (devuelve el foco al botón), Tab fuera lo cierra; página actual marcada (`aria-current`) en menú y pie en About, Insurance, Contact. Tras cambiar de página el foco pasa al contenido.
- **Menú celular (375):** botón de menú, panel, submenú de servicios, Escape, bloqueo del fondo, el botón del menú lleva a la cita y cierra el panel, y al ensanchar la ventana se cierra solo.
- **Pie:** igual en todas las páginas (servicios, clínica, contacto, redes, año).
- **Formulario (en About, Insurance y Contact):** vacío marca 6 campos y enfoca el primero; teléfono/correo mal escritos se marcan; válido muestra «This form is not connected yet…». No se envió ninguna petición (ningún POST). Datos de prueba falsos, ningún contacto real.
- **Accesibilidad automática (axe-core, WCAG 2.0/2.1/2.2 AA + buenas prácticas):** 0 violaciones en About, Insurance, Contact y página de error. Recordar que axe cubre solo 30-40 %.

## No verifiqué
- Lector de pantalla real, zoom al 400 % y modo de alto contraste.
- Enlaces externos en vivo (Maps, SAHARA, Instagram, Facebook, fuentes del blog) ni que el código de promoción de SAHARA siga vigente.
- Safari/iPhone real y Firefox (solo Edge; el celular es emulado).
- Comparación con una imagen de referencia (no hay base): lo visual lo juzgué a ojo.
- Comportamiento real de Vercel (404, redirecciones): solo el servidor local.
