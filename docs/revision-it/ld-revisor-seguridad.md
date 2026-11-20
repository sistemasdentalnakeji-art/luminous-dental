# Revisión de seguridad y privacidad · ld-revisor-seguridad · 19-11-2026

## Veredicto: PASA con reservas

No encontré llaves, contraseñas, tokens ni datos de pacientes en lo que revisé. Hoy el formulario no envía nada y las reseñas en vivo están apagadas, así que la superficie de ataque es mínima. Las reservas son: rutas personales y notas internas en un repositorio público, y controles que faltan antes de conectar el formulario.

## Limitación importante (léela primero)
En esta sesión no tuve consola (solo lectura de archivos) y la red hacia GitHub estaba bloqueada. Por eso:
- NO pude correr `git ls-remote`, `git ls-tree` ni `git log -p` sobre `webpage-V1.18.11.26`, `webpage-V2.18.11.26` ni `gh-pages`.
- Lo observado sobre «lo ya subido» sale del carpeta `.git` local: `.git/config`, `.git/logs/HEAD` y el índice de archivos rastreados. Los objetos de git están comprimidos y no se pueden leer así.
- La rama `gh-pages` NO existe como referencia local; su contenido no se pudo ver.

## Fallos

### Alta
Ninguno confirmado.

### Media
**1. Faltan cabeceras de seguridad en `vercel.json` (observado).**
- Dónde: `vercel.json`, línea 8. Solo envía `X-Robots-Tag`.
- Falta: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, protección contra que otros sitios metan la página en un marco (`frame-ancestors` o `X-Frame-Options`), `Permissions-Policy`.
- Cómo reproducirlo: abrir `vercel.json`; o, ya publicada, mirar las cabeceras de respuesta de la página.
- Aparte: en GitHub Pages (`gh-pages`) NO se pueden poner cabeceras; ahí el `noindex` solo existe como etiqueta en `apps/web/index.html` línea 8. Está bien mientras el `404.html` sea copia de `index.html` (así dice `docs/bitacora.md` línea 186; no verificado en la rama).
- Qué hacer: añadir las cabeceras en `vercel.json` antes de publicar en Vercel. La política debe permitir `fonts.googleapis.com` y `fonts.gstatic.com`, y estilos en línea (el mapa y las figuras los usan).

**2. Formulario: faltan controles para el día que se conecte (inferido, no es un fallo de hoy).**
- Dónde: `apps/web/src/config/booking.ts` y `apps/web/src/features/booking/BookingForm.tsx`.
- Hoy `mode: 'preview'` y `apiEndpoint: null`: no sale ningún dato (correcto, y el mensaje de pantalla lo dice claro, `home.ts` línea 163).
- Cuando se ponga `mode: 'api'`: (a) no se obliga a que la dirección sea `https://`; (b) el campo «Anything else» (`#b-message`) no tiene límite de largo; (c) el único freno a bots es un campo escondido que se descarta en silencio, sin límite de envíos ni captcha; (d) el formulario pide nombre, correo y teléfono pero el sitio no tiene página de privacidad (ya anotado como POR CONFIRMAR en `docs/datos.md`; aquí solo señalo que debe existir ANTES de conectar el formulario).
- Lo bueno: hay aviso «no incluyas historial médico ni pagos» (`BookingForm.tsx` línea 79), no hay `localStorage`/cookies, y no se escribe nada en la dirección (URL) ni en consola.
- Qué hacer (lo implementa Jadro/ld-backend-1): validar y limitar largo también en el servidor, límite de envíos, destino solo `https`, no registrar el contenido de la solicitud en bitácoras, y guardar solicitudes siguiendo `healthcare-phi-compliance` (nivel C).

### Baja
**3. Rutas personales y nota de agentes en el repositorio público (observado).**
- Dónde: `.claude/launch.json` líneas 8 y 9 (carpeta del usuario de Windows y estructura de Escritorio); `CLAUDE.md` líneas 3, 5 y 11 (rutas de `~/.claude/agents`, nombres de la bóveda); `docs/lienzo/ENCARGO.md`, `REVISION.md`, `MEZCLA-1.md`, `MEZCLA-2.md`, `HERO-ANATOMY.md` y `docs/ETAPA-3-CODIGO.md` (rutas completas de la computadora y de la bóveda interna). Los archivos `.claude/launch.json` y `CLAUDE.md` están en el índice de git, o sea, ya subidos con el primer commit `ceeaf4d`.
- No son llaves y no dan acceso. Revelan el nombre de usuario de la PC, cómo está organizada la oficina y que existe otro proyecto («Dental Nakeji», `Desktop\Luminous\luminous-web`).
- Cómo comprobarlo: `git ls-files .claude CLAUDE.md` en el repositorio, o abrir esos archivos en GitHub.
- Qué hacer (con orden del dueño): sacar `.claude/` y `CLAUDE.md` del repositorio (añadirlos a `.gitignore` y quitarlos del índice) y, si se quiere limpiar de verdad, reescribir historial. Mientras tanto, no pegar en el repositorio rutas personales nuevas. El `.gitignore` de la raíz solo cubre `node_modules`, `dist` y `.env*`.

**4. Fotos y capturas de terceros en el repositorio público (observado, tema de permisos, no de seguridad técnica).**
- Dónde: `docs/lienzo/_blob/*` (incluye la foto del Dr. Christian Hahn, vista en `f083a374…`), `docs/referencias/*.jpg` (capturas de sitios de la competencia y del sitio oficial), `docs/capturas/`.
- Es la foto de una persona real y capturas con derechos de otros, ahora públicas. La foto también está en el sitio oficial, pero el permiso de reuso ya figura como POR CONFIRMAR en `docs/datos.md`; aquí solo digo que el repositorio es público y por eso ya se está mostrando.
- Cómo comprobarlo: abrir esos archivos en la rama pública.
- Qué hacer: decidir con la dueña si el repositorio sigue público o pasa a privado cuando termine la revisión (GitHub Pages gratis exige público; Vercel no).

**5. Fuente de Google Fonts cargada desde sitio de tercero (observado).**
- Dónde: `apps/web/index.html` líneas 9 a 11. Cada visita manda su dirección IP al servicio de Google. En EE. UU. no es un problema legal por sí mismo, pero hay que declararlo en la política de privacidad cuando exista. Alternativa: alojar las letras en el propio sitio. No hay otros scripts de terceros: busqué `gtag`, Analytics, Meta Pixel, Hotjar, Clarity, YouTube e `iframe`; cero resultados.

**6. Enlaces externos con `rel="noopener"` pero sin `noreferrer` (observado).**
- Dónde: `Layout.tsx` líneas 63 y 72, `Appointment.tsx` 17, `Contact.tsx` 16, `Home.tsx` 125, `Insurance.tsx` 19. Los demás (`ContactLocation`, `Blog`, `Reviews`, `SocialLinks`) sí llevan `noopener noreferrer`.
- Efecto: Google Maps, Instagram, Facebook y SAHARA reciben la página de origen. Riesgo muy bajo, es solo coherencia.
- Además `blog.ts` `linksIn()` (línea 20) arma los enlaces de «Sources» desde un JSON propio sin revisar que empiecen con `https://`. Hoy todos los 13 enlaces de `blog.en.json` son `https://` de FDA, NIH, NHS, ADA y AAO, así que no hay riesgo real; sería un problema si el JSON algún día viene de fuera.

**7. Código promocional de SAHARA visible en el repositorio (observado).**
- Dónde: `content/home.ts` línea 147 y `content/clinic.ts` línea 31 (`accessCode=LUMI`). Viene de la página oficial (pública), no es un secreto. Solo para que quede sabido.

**8. Reseñas con nombre y apellido de pacientes (ya anotado en `docs/datos.md`, mal manejado en pantalla solo en parte).**
- `content/reviews.ts` línea 2: el permiso para mostrar esas citas está POR CONFIRMAR, pero ya se muestran en la página pública de GitHub Pages con el nombre del autor. Es público en el sitio oficial. Aviso, no bloqueo.

## Lo que sí está bien (observado)
- Cero llaves, tokens, claves privadas ni `.env` en el árbol de trabajo (busqué `api_key`, `secret`, `token`, `password`, `bearer`, `AIza…`, `sk-…`, `ghp_…`, `BEGIN … KEY`, `supabase`, `service_role`, `private_key`). Los resultados eran solo la palabra «tokens» del CSS de diseño.
- `.env*` ignorado en el `.gitignore` de la raíz; no existe ningún `.env` ni archivo `.pem`, `.key`, `.sql`, `.csv`, `.sqlite`, `.xlsx` en el proyecto.
- Correo del autor de los commits: `339310361+sistemasdentalnakeji-art@users.noreply.github.com` (correo oculto de GitHub, no personal). Autor y 4 commits vistos en `.git/logs/HEAD`: `ceeaf4d`, `a4400fa`, `2a51edc`, `78a6fcc`.
- Mapa: es un dibujo propio en SVG con datos de OpenStreetMap, sin llamadas a Google Maps ni `iframe` ni llave de mapas. Crédito de OpenStreetMap presente. El botón «Directions» abre Google Maps en otra pestaña con `noopener noreferrer`.
- `innerHTML` solo se usa con SVG generado por el propio código (`Figure.tsx`, `ResultFigure.tsx`, `live.js`) a partir de textos fijos en `content/figure.ts`, nunca con datos escritos por visitantes. No hay `dangerouslySetInnerHTML`, `eval` ni `new Function`.
- Reseñas en vivo: `config/reviews.ts` con `endpoint: null`; el código ya prevé que la llave de Google vaya en un servidor y no en la página (`useGoogleReviews.ts` solo hace `fetch` de un endpoint). Falla en silencio hacia la lista corta. Cuando se conecte, hay que verificar que `json.reviews` sea lista antes de usar `.length` (si el servidor responde otra forma, `json?.reviews.length` truena; está dentro de `.catch`, así que no rompe la página).
- Sin cookies, sin `localStorage`, sin analítica.
- `noindex` en `index.html` y `X-Robots-Tag` en `vercel.json` (esto último solo en Vercel). Nota: `noindex` no es privacidad; cualquiera con el enlace la ve.
- Dependencias: `apps/web/package.json` usa rangos `^` y hay `package-lock.json` en la raíz (rangos, pero con candado). No ejecuté `npm audit` (sin consola ni red). No hay `.mcp.json` en el proyecto, así que `mcp-dependency-review` no tuvo nada que revisar.

## Lo que NO verifiqué
- Contenido real de las ramas `webpage-V1.18.11.26`, `webpage-V2.18.11.26` y `gh-pages` en GitHub; historial de commits completo (algo borrado después podría seguir en el historial); si `gh-pages` incluye `.map` (mapas de código) o `docs/`.
- `npm audit` y versiones de paquetes (las versiones declaradas, p. ej. TypeScript `~7.0.2`, Vite 8, no las pude comprobar).
- Si el repositorio tiene activados Dependabot, «secret scanning» y protección de ramas (ajustes de GitHub, fuera del código).
- Cabeceras reales del sitio ya publicado (no probé en vivo, por regla).
- Las otras dos imágenes de `docs/lienzo/_blob` y las capturas en `docs/capturas`, no las abrí una por una.
- Archivos `.dc.html` del lienzo: busqué patrones de secretos con búsqueda de texto, no los leí completos.

## Skills usadas
- `security-review`: llaves y secretos (sección 1), validación de entradas (2), XSS (5), CSRF y límites de envíos (6 y 7), datos sensibles en registros (8), dependencias (10).
- `security-audit` (modo guía, sin auditoría completa): exigir frontera y resultado concreto en cada fallo; lo que depende de ajustes externos queda como «no verificado».
- `healthcare-phi-compliance`: fuga por URL, almacenamiento del navegador y registros; el campo libre del formulario como riesgo de datos de salud; página de privacidad antes de recibir datos.
- `mcp-dependency-review`: sin archivos MCP en el proyecto; nada que clasificar.
- `agent-security-hardening`: no aplica a este sitio (no hay agente en ejecución); solo la idea de validar en el servidor cuando exista.
- `safety-guard`: solo lectura; no toqué código, git ni publicación.
- `ponytail:ponytail-review`: cada fallo lleva caso concreto y arreglo mínimo.
- `ld-bienvenida`: reglas (nada de llaves, no mezclar Nakeji con Luminous, no publicar sin orden).

Nota: ninguna skill de mi lista faltó.
