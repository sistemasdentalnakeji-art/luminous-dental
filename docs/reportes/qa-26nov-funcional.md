# QA funcional · Ronda final 26-11-2026 · Luminous Dental (QA 1 · ld-qa-web)

Build de `apps/web` (`npm run build`, OK) servido con `vite preview` en el puerto 4173. Playwright con msedge. Sin commit y sin editar código.
Alcance probado: 80 rutas descubiertas rastreando enlaces desde `/en`, `/es`, `/en/blog` y `/es/blog` (EN y ES, incluidos 11 servicios, 4 financieras y 13 artículos del blog por idioma). Todas se probaron a 1440, y a 375 se revisó carga, consola y desborde horizontal. No se probó 768.

## Veredicto: LISTO CON ARREGLOS (0 bloqueantes, 0 altos, 5 medios/bajos)

## Fallos, por gravedad

### MEDIA
1. **Etiqueta «Privacy Notice» distinta de «Privacy Policy» (EN).** En el menú «More» y en el pie de `/en/*` el enlace dice «Privacy Notice», pero la ruta es `/en/privacy-policy` y el título de la página es «Privacy Policy». En ES no hay problema («Aviso de privacidad» en las tres partes). Pasos: abrir `/en`, mirar el pie. Esperado: «Privacy Policy». Real: «Privacy Notice». Ancho: todos. Archivo probable: `apps/web/src/content/home.ts` (etiqueta del menú y del pie).
2. **Páginas de servicio casi vacías: «Dental Appliances» y «Aparatos dentales».** `/en/services/dental-appliances` tiene unas 22 palabras y `/es/servicios/aparatos-dentales` unas 23. Solo dicen «Call us to learn more» y el botón de cita. Es el único servicio así. En el hub su tarjeta dice «Llámanos para saber más sobre este servicio». Esperado: descripción como las demás, o POR CONFIRMAR visible. Archivo probable: `apps/web/src/content/services.ts`. Además, «Aparatos dentales» puede confundirse con ortodoncia; valdría «Aparatología dental» o «Dispositivos dentales».
3. **Español poco natural (calcos del inglés).** Todas son frases del sitio ES; el archivo probable es `content/*.ts`, sección `es`:
   - `/es/nosotros`: «¿Lista tu visita?». Parece traducción de «Ready for your visit?». Mejor «¿Lista para tu visita?» o «¿Listo para tu visita?».
   - `/es/beneficios`: «Beneficios que hacen tu atención más fácil de manejar». Mejor «Beneficios que hacen tu atención más sencilla».
   - `/es/beneficios`: «Conoce las empresas de financiamiento que listamos». Mejor «con las que trabajamos».
   - `/es/convenios`: «Beneficio con aliado» y «Beneficios con aliados». Mejor «Beneficio con un socio» o «Convenio con SAHARA».
   - `/es/nosotros`: «Atención que se siente cómoda». Mejor «Atención en la que te sientes cómodo».
   - Botones de cita con tres redacciones: «Reserva tu cita» (inicio y Contacto), «Solicita una cita» (beneficios) y «Solicitar cita» (nosotros y FAQ). Conviene unificar con una sola forma.

### BAJA
4. **FAQ no está en el menú principal.** Está en el pie y en el panel del celular. En escritorio, el menú «More» solo tiene Blog, Terms y Privacy. El encargo A/B3 pedía «menú/pie», así que se cumple a medias. Archivo probable: `content/home.ts`.
5. **Meta description igual en todas las páginas.** Por ejemplo `/en/faq`, `/es/servicios/implantes-dentales` y `/en/contact` llevan la misma descripción genérica de la marca. Es solo SEO (hoy el sitio lleva `noindex`). Archivo probable: `config/routes.ts` y `index.html`. Solo las páginas legales tienen descripción propia.

## Observaciones que NO son fallo
- `<html lang>` en ES es `es-MX` y no `es`. Es intencional y coincide con `hreflang="es-MX"`. Mi primer script lo marcó por error.
- Los textos en inglés dentro de `/es/` son solo las reseñas de Google (permitido) y nombres propios: SAHARA Las Vegas, Invisalign, All-on-4, PlexPay, nombres de aseguradoras y nombres de calles del mapa. No hallé textos en español en `/en/`.
- La página de convenios en ES muestra «Luminous Dental» y «SAHARA» como nombres propios; correcto.
- En la FAQ, la primera pregunta se abre sola al cargar. Un clic la cierra. Es probable que sea el diseño; lo reporto por si no lo es.

## Lo que pasó, verificado
- **Carga y consola:** 80 de 80 rutas con 0 errores ni advertencias de consola, 0 respuestas HTTP 4xx o 5xx y 0 peticiones fallidas, a 1440 y a 375.
- **Desborde horizontal a 375:** ninguna ruta.
- **Enlaces internos:** el rastreo siguió todos los enlaces internos de las 80 rutas y ninguno llevó a 404.
- **Selector de idioma:** en las 80 rutas, a 1440, EN→ES→EN regresa a la misma página. En 375 funciona desde el panel del menú (probado en `/en`). Desde un 404 lleva al inicio del otro idioma (`/en/blog/nope` lleva a `/es/blog`).
- **Menú:** el submenú Benefits abre con clic en EN y ES con 3 enlaces (Insurance/Financing/Agreements y sus equivalentes en español) más «Ver todos los beneficios». Escape lo cierra y `aria-expanded` cambia. El submenú Services lista los 11 servicios más «View all services».
- **Pie:** columnas de servicios, beneficios, clínica (About, FAQ, Blog, Contact) y legal, con enlaces correctos en los dos idiomas. Incluye selector de idioma, teléfono, correo, mapa y redes.
- **Redirecciones:**

| Entrada | Destino |
|---|---|
| `/` | `/en` |
| `/services` | `/en/services` |
| `/insurance-financing` | `/en/benefits` |
| `/en/insurance-financing` | `/en/benefits` |
| `/es/seguros-y-financiamiento` | `/es/beneficios` |
| `/financing/sunbit` | `/en/financing/sunbit` |
| `/blog`, `/about`, `/faq`, `/contact`, `/benefits`, `/agreements`, `/insurance`, `/financing`, `/privacy-policy`, `/terms-and-conditions` | su versión `/en/...` |
| `/financing/x` (inexistente) | 404 (correcto) |

- **Citas Adit:** en `/en`, `/es`, `/en/contact` y `/es/contacto`, el clic abre pestaña nueva con `https://booking.adit.com/ad197179-...` y `window.opener === null`. La página original no navega. En las 80 rutas, todo enlace con `target=_blank` lleva `rel="noopener noreferrer"` y todo enlace a Adit abre en pestaña nueva.
- **Teléfono:** todos los `tel:` del sitio son `tel:+17028058688`. Ninguno distinto.
- **Hub de servicios (EN y ES, 11 tarjetas):**
  - Cada filtro marca `aria-pressed` y resalta tarjetas, sin ocultar ninguna. «Me duele» resalta 3, «mejorar sonrisa» 4, «me falta un diente» 3 y «revisión/limpieza» 2.
  - El contador `role=status` se actualiza.
  - Enter activa el filtro con el teclado.
  - Una tarjeta lleva a su página de servicio.
- **FAQ (EN y ES, 12 preguntas):**
  - El acordeón abre y cierra, y abrir una cierra la otra.
  - Enter y Espacio alternan la pregunta.
  - Las 5 categorías filtran: Citas 3, Servicios 3, Pagos 2, Seguros 2 y Urgencias 2.
  - El buscador filtra («insurance» da 2 y «seguro» da 2); sin resultados muestra el estado vacío y «Restablecer» regresa a 12.
  - Los botones de llamar y Adit son correctos.
- **404:** `/en/nope`, `/es/nada`, `/zzz`, `/en/services/nope`, `/es/servicios/nope`, `/en/financing/nope` y `/en/blog/nope` muestran 404 en el idioma de la ruta (`/zzz` sale en inglés), con `noindex`, enlaces útiles y selector de idioma.
- **Contacto:** orden correcto (emergencias 24/7 arriba, luego ubicación y horario, la sección de cita, y moneda y letrero al final). `BookVisit` no tiene campos, solo información y botón.
- **Metadatos:** `hreflang` en/es-MX/x-default correcto, título por página en su idioma.

## No verificado
- Cabecera, menú y paneles a 768 y 1920 (lo cubre QA 2).
- Contraste, foco, lector de pantalla y reducir movimiento (lo cubre QA 3).
- Que `hreflang`, canónica y `noindex` sigan igual en el dominio publicado. Solo probé `vite preview` local.
- Calidad completa del español del blog y de los textos legales: solo busqué inglés filtrado y leí a mano las páginas principales.
- Enlaces externos (Adit, Instagram, Facebook, mapas, SAHARA, financieras): verifiqué atributos, no que respondan.

Evidencia: guiones Playwright en el scratchpad de la sesión (`qa.js`, `qa2.js`, `txt.js`, `meta.js`). No hay capturas nuevas en esta ronda.
