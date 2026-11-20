# RESUMEN · Revisión completa del departamento de IT · Luminous Dental (19-11-2026)

Junta: ld-director-tecnologia. Informes: ld-revisor-seguridad, ld-backend-1, ld-frontend-2, ld-disenador-uiux-2, ld-qa-web, ld-qa-2, ld-qa-3, ld-qa-5 y ld-director-tecnologia (todos en esta carpeta).

## Veredicto general: PASA con reservas como vista previa · NO está listo para publicarse como sitio real de la clínica

- Los 9 informes dan «PASA con reservas»; ninguno da «NO PASA».
- Lo técnico está sano: tipos y armado en verde, 0 errores de consola, 0 enlaces rotos, 0 desbordes en 4 tamaños, axe-core con 0 fallos en 40 cargas (servicios, About, Insurance, Contact, error), sin llaves ni datos de pacientes en el código, el formulario no envía nada y lo dice.
- Lo que impide publicar: texto de relleno «Lorem ipsum» a la vista, frases de la clínica sin confirmar, formulario y reseñas sin conectar ni política de privacidad, y el trabajo de 2 días sin guardar en git.

## Fallos (sin repetir), por gravedad

### Alta
| # | Fallo | Dónde | Lo vio |
|---|---|---|---|
| A1 | «Lorem ipsum» visible al público: tarjeta Invisalign del carrusel del inicio, portada de servicios (Dental Appliances e Invisalign) y las páginas `/services/dental-appliances` e `/services/invisalign-and-braces` | `content/services.ts` (`LOREM`, `placeholder: true`) | ld-qa-web, ld-qa-2 |
| A2 | 28 archivos de código nuevos y 18 cambiados viven solo en el disco (no guardados en git) | raíz, `git status` | ld-director-tecnologia |
| A3 | 94 MB de capturas (`docs/capturas` 78 MB, `docs/revision-it` 16 MB) entrarían al repositorio público en el próximo envío | `docs/` | ld-director-tecnologia |

### Media
| # | Fallo | Dónde | Lo vio |
|---|---|---|---|
| M1 | Las tiras de reseñas se mueven sin fin y no tienen botón de pausa (WCAG 2.2.2); otras animaciones infinitas tampoco se pueden parar salvo con «reducir movimiento» | `components/Marquee.tsx`, `reviews.css`, `location-map.css` | ld-frontend-2, ld-disenador-uiux-2 |
| M2 | Al pasar de un servicio a otro (o de un artículo a otro) el formulario puede conservar el tratamiento, errores y mensajes de la página anterior (inferido; ld-qa-2 lo vio bien abriendo cada página desde cero) | `App.tsx` sin `key` por ruta + `BookingForm.tsx` `defaultValue` | ld-frontend-2 |
| M3 | Botón «Request an appointment» muerto en la página de error (cabecera, menú móvil y pie apuntan a `#appointment`, que ahí no existe) | `Header.tsx`, `NotFound.tsx` | ld-qa-5 |
| M4 | Frase «We work with most private dental insurance» publicada, aunque `datos.md` dice no publicarla sin confirmar | About, Insurance & Financing | ld-qa-5 |
| M5 | «Insurance & Financing» no dice nada de financiamiento | `pages/Insurance.tsx` | ld-qa-5 |
| M6 | El blog habla en nombre de la clínica («Luminous Dental recommends…») sin confirmar, sin aviso en pantalla | `content/blog.en.json` | ld-qa-3 |
| M7 | Contact: hueco de ~200 px arriba a 1440 y dirección + «Open in Google Maps» repetidos dos veces | `pages/Contact.tsx` | ld-disenador-uiux-2, ld-qa-5 |
| M8 | Seis páginas de servicio muestran un recuadro vacío con un ícono grande donde va la figura (casi una pantalla a 375) | `pages/Service.tsx` | ld-qa-2 |
| M9 | Formulario, antes de conectarlo: casilla de consentimiento sin enlace a privacidad (la política no existe); los errores 400/429/caída dan el mismo mensaje; tras enviar queda lleno y se puede reenviar; solo casilla trampa contra bots; sin límite de largo ni tiempo límite; destino no obligado a `https` | `config/booking.ts`, `BookingForm.tsx`, `content/home.ts` | ld-backend-1, ld-revisor-seguridad |
| M10 | Reseñas en vivo, antes de conectarlas: no se valida la respuesta (enlaces `javascript:` posibles, `reviews` que no sea lista) | `lib/useGoogleReviews.ts`, `Reviews.tsx` | ld-frontend-2, ld-backend-1, ld-revisor-seguridad |
| M11 | Faltan cabeceras de seguridad (CSP, nosniff, Referrer-Policy, marcos, Permissions-Policy); y hoy se publica en GitHub Pages, donde ni estas ni el `X-Robots-Tag` de `vercel.json` existen. Hay dos destinos de publicación sin decisión final | `vercel.json`, `vite.config.ts`, `docs/decisiones.md` l. 14 y 73 | ld-revisor-seguridad, ld-director-tecnologia |
| M12 | Toda dirección inexistente responde 200 en Vercel (incl. `/robots.txt`, `/sitemap.xml`); en GitHub Pages las páginas reales responden 404 | `vercel.json` rewrite | ld-qa-5, ld-director-tecnologia |
| M13 | Falta lo mínimo para buscadores: una sola descripción para 31 páginas, sin `canonical`, `robots.txt`, `sitemap.xml` ni Open Graph | `index.html`, `config/routes.ts` | ld-director-tecnologia |
| M14 | El paquete principal subió de 81 a 108 KB comprimido en un día; blog y servicios van en el mismo archivo que el inicio | armado de Vite | ld-director-tecnologia |

### Baja
| # | Fallo | Lo vio |
|---|---|---|
| B1 | Subrayado mal alineado en «Call or text» del menú móvil (375 y 768) | ld-qa-web |
| B2 | 5 botones «Pause animation» con el mismo nombre en el carrusel | ld-qa-web |
| B3 | Reseñas: solo 3 personas que se repiten; `key={r.author}` choca si se repite autor; con reseñas en vivo la lista salta de 3 a 4 tarjetas; sin caché (Google cobra por consulta) | ld-qa-web, ld-backend-1, ld-frontend-2 |
| B4 | Con el menú móvil abierto, Tab se escapa al «Skip to main content»; el salto deja `#main` en la dirección | ld-qa-5 |
| B5 | Enlaces externos desparejos: Maps y SAHARA abren en la misma pestaña y sin `noreferrer`; pie y redes en pestaña nueva | ld-qa-5, ld-frontend-2, ld-revisor-seguridad |
| B6 | About: hueco de ~200 px entre el doctor y «Why patients choose» | ld-qa-5 |
| B7 | «Learn more about this treatment» lleva a `/blog` en 2 servicios; Routine Care y Cleaning van al mismo artículo; grupos de servicios con una sola tarjeta | ld-qa-2 |
| B8 | Blog: lista de temas en otro orden en móvil, migas largas, `<h4>` bajo `<h2>`; `linksIn` pierde en silencio fuentes mal escritas y no exige `https://` | ld-qa-3, ld-frontend-2, ld-revisor-seguridad |
| B9 | Casilla de consentimiento sin borde visible sobre azul (contraste no medido); línea dorada bajo títulos casi invisible; escalera de servicios difícil de leer a 1440 (opinión) | ld-disenador-uiux-2 |
| B10 | Google Fonts: la IP del visitante va a Google (declararlo en la privacidad) y el título cambia de letra al cargar | ld-revisor-seguridad, ld-disenador-uiux-2 |
| B11 | Rutas personales de la PC y notas internas (`.claude/launch.json`, `CLAUDE.md`, `docs/lienzo/*`) y fotos de terceros (doctor, competencia) en el repositorio público | ld-revisor-seguridad |
| B12 | Código y dependencias sin uso: `lib/cn.ts`, `clsx`, `tailwind-merge`, `motion`, `components.json`, `public/fonts` y `public/media` vacías, dos funciones de `engine.js` | ld-frontend-2, ld-director-tecnologia |
| B13 | Teléfono copiado a mano en 8 lugares en vez de salir de `clinic.phone` | ld-frontend-2 |
| B14 | Detalles de React: `ref` escrito durante el dibujo (`ResultFigure`), `setState` en efecto (`Header`), `Backdrop.tsx` sin tipos y sin manejar pérdida de WebGL, `decodeURIComponent` truena con `#%E0`, `LocationMap` oculta el nombre al lector de pantalla | ld-frontend-2 |
| B15 | Teléfono acepta «(» o «+» solos con un mensaje que no explica el error | ld-backend-1 |
| B16 | Rutas decididas en dos sitios (`routes.ts` y `pageFor`); sin pruebas automáticas ni paso de revisión al subir; no está decidido dónde vivirá la función de citas en Vercel | ld-director-tecnologia, ld-backend-1 |

Descartado: «`favicon.svg` no sigue `PAGES_BASE`» (ld-frontend-2). Lo comprobé armando con `PAGES_BASE` y la ruta sale bien.

## Qué arregla el equipo y qué depende de otros

**Lo arregla el equipo de IT (sin datos nuevos):**
- Quitar el «Lorem ipsum» o esconder esas viñetas/párrafos hasta tener texto (A1).
- Pausa en las tiras de reseñas y nombres distintos a los 5 botones de pausa (M1, B2).
- `key` por ruta en `App.tsx` (M2); botón de cita en la página de error que lleve a `/contact#appointment` (M3).
- Quitar o suavizar la frase de seguros y el título de financiamiento hasta tener datos (M4, M5).
- Contact sin hueco ni datos repetidos; About sin hueco (M7, B6); qué mostrar en lugar del recuadro vacío (M8).
- En el formulario: limpiar/bloquear tras enviar, mensajes distintos por error, límites de largo, tiempo límite, `https` obligatorio (M9, parte de código).
- Validar la respuesta de reseñas en vivo (M10).
- Bajos B1 a B9, B12 a B16; cargar aparte blog y servicios cuando haga falta (M14).
- SEO técnico (M13): departamento SEO con Páginas web.

**Depende de la dueña:**
- Orden para guardar en git y subir (A2) y decidir qué hacer con las capturas pesadas (A3).
- Si el repositorio sigue público, y sacar rutas personales y fotos de terceros (B11).

**Depende de la clínica:**
- Texto real de Dental Appliances e Invisalign (A1 definitivo), seguros y financiamiento (M4, M5), visto bueno del texto del blog (M6).
- Política de privacidad revisada (por la clínica o su abogado) antes de recibir datos (M9); permiso de pacientes para reseñas; ficha de Google (`profileUrl`).

**Depende de Jadro (es importante: no lo hace la asistente sola):**
- Destino final de publicación (Vercel o GitHub Pages) y cabeceras de seguridad (M11), 404 real (M12).
- Servidor del formulario: herramienta de recepción, validación en el servidor, Turnstile, límite de envíos, llaves en variables de Vercel (M9).
- Servidor de reseñas con la llave de Google y caché (M10, B3).
- Quitar `noindex` solo el día que se publique de verdad.

## Orden recomendado de arreglos
1. **Guardar el trabajo** en una rama nueva (A2), con orden de la dueña, después de sacar o comprimir las capturas (A3). Es lo único que puede perder trabajo.
2. **Lo que se ve mal hoy en la vista pública:** Lorem ipsum (A1), frase de seguros y título de financiamiento (M4, M5), botón muerto en la página de error (M3).
3. **Accesibilidad:** pausa en las reseñas (M1) y botones de pausa con nombre propio (B2); Tab del menú móvil (B4).
4. **Pulido de páginas:** `key` por ruta (M2), Contact y About (M7, B6), recuadro vacío de servicios (M8), bajos de diseño.
5. **Decisión de Jadro** sobre dónde se publica (M11, ADR-0001 propuesto en `ld-director-tecnologia.md`), con cabeceras y 404 real (M12).
6. **Antes de conectar formulario y reseñas:** política de privacidad (clínica), servidor y protecciones (Jadro), arreglos de código (M9, M10, B3, B15) y una prueba del envío.
7. **Antes de quitar `noindex`:** SEO mínimo (M13), textos confirmados por la clínica (M6), limpieza (B12, B13, B14, B16) y medir velocidad en celular.

## Lo que nadie verificó
- Lector de pantalla real, zoom al 400 %, Safari/iPhone y Firefox (todo fue con Edge/Chromium).
- Contraste medido a mano (solo axe y a ojo); blog a 375 y 768 con medida real (ld-qa-3 no pudo).
- Velocidad real en celular (LCP, CLS, INP).
- Contenido real de las ramas en GitHub (`gh-pages` y versiones) e historial completo.
- Comportamiento real de Vercel (no hay despliegue) y `npm audit`.

## Calificación propuesta (sobre 10; la confirma Calidad y Control)
| Agente | Nota | Por qué |
|---|---|---|
| ld-revisor-seguridad | 9 | Completo, honesto con sus límites, cada fallo con dónde y qué hacer |
| ld-backend-1 | 9 | Fallos concretos y plan de conexión ordenado |
| ld-qa-2 | 9.5 | 36 cargas con axe, figuras y formulario en 11 de 11 páginas |
| ld-qa-5 | 9 | Rastreo de 31 rutas, menú y pie a fondo, axe en 4 páginas |
| ld-qa-web | 9 | 4 tamaños y prueba de red del formulario; no corrió axe |
| ld-frontend-2 | 8 | Buena lectura de código; un fallo falso (favicon) y no armó la página |
| ld-disenador-uiux-2 | 7.5 | Hallazgos útiles, pero no vio 768 ni 1920 ni midió contraste |
| ld-qa-3 | 6.5 | Rutas y fuentes bien; no pudo medir celular ni teclado y no lo resolvió |
| ld-director-tecnologia | (lo califica el CEO virtual) | |
