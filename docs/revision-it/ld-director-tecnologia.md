# Revisión IT · ld-director-tecnologia · arquitectura, orden, rutas, peso y salida (19-11-2026)

Alcance: estructura del proyecto (`apps/`, `packages/`, raíz), `App.tsx`, `config/routes.ts`, `lib/router.tsx`, `vite.config.ts`, `vercel.json`, `index.html`, peso del armado, estado de git (solo lectura) y `docs/`. Corrí `npm.cmd run typecheck` y `npm.cmd run build` (los dos en verde) y un armado de prueba con `PAGES_BASE=/luminous-dental/` en mi carpeta temporal (no en el proyecto). No cambié código ni toqué git.

## Veredicto: PASA con reservas (como vista previa) · NO está listo para publicarse como sitio real

La arquitectura es sencilla y sana: una sola app React + Vite, un router propio de 40 líneas sin dependencias, contenido separado del código (`content/`), contrato de citas compartido (`packages/types`) y carpetas reservadas para la API y la base de datos sin código falso. Tipos y armado en verde. Lo que impide publicarlo como sitio de la clínica no es el código sino contenido y conexiones pendientes (ver RESUMEN) y tres riesgos de orden que sí son de IT (fallos 1 a 3).

## Fallos

### Alta
1. **El trabajo de 2 días vive solo en el disco.** `git status` muestra 105 cambios: 28 archivos de código nuevos sin guardar en git (Header, Reviews, Carousel, Blog, Service, NotFound, `services.ts`, `blog.en.json`, `useGoogleReviews.ts`, etc.) y 18 modificados. La rama actual es `webpage-V2.18.11.26`. Si la PC falla, se pierde casi todo el sitio actual. Reproducir: `git status --short` en la raíz. Qué hacer (con orden de la dueña): un guardado (commit) en una rama nueva de versión; no toca `main`.
2. **Las capturas pesan 94 MB y se subirían al repositorio público.** `docs/capturas/` = 78 MB (una sola, `home-1440.png`, 9.1 MB) y `docs/revision-it/` = 16 MB. Casi todas están sin guardar en git; la regla de publicar dice «incluir todo lo pendiente», así que el siguiente envío las metería al repositorio público y lo haría lento para siempre (el historial no se adelgaza solo). Hoy `.git` pesa 22 MB. Qué hacer: antes del próximo envío, decidir si las capturas van a git; si sí, pasarlas a `.webp`/`.jpg` comprimido; si no, añadir `docs/capturas/` y las carpetas de capturas de `docs/revision-it/` al `.gitignore`.

### Media
3. **Dos destinos de publicación con reglas distintas.** `docs/decisiones.md` línea 14 dice «Vercel + Cloudflare»; la entrada del 18-11 (línea 73) dice GitHub Pages y «Vercel no se usa por ahora». El código mantiene los dos (`vercel.json` y `PAGES_BASE` en `vite.config.ts` y `router.tsx`). Consecuencia: las protecciones de `vercel.json` (`X-Robots-Tag`, y las cabeceras de seguridad que pide el Revisor) **no existen en GitHub Pages**; ahí solo queda la etiqueta `noindex` del `index.html`. No hay un registro de decisión (ADR) que diga cuál es el destino final. Qué hacer: Jadro decide el destino final y se anota en `docs/decisiones.md`; dejo el borrador de ADR abajo.
4. **Toda dirección responde «OK» (código 200) en Vercel.** `vercel.json` manda `/(.*)` a `index.html`; la página de error se ve bien, pero el servidor dice 200 (Google lo llama «404 suave»). También `/robots.txt` y `/sitemap.xml` (no existen) devolverían la página de error con 200. Lo confirmó ld-qa-5 en local. En GitHub Pages es al revés: las páginas internas reales responden con código 404 (se sirven desde `404.html`), aunque se ven bien. Mientras haya `noindex` no hace daño; antes de quitar `noindex` hay que resolverlo (lista de rutas reales en el servidor o páginas armadas por ruta).
5. **Falta lo mínimo para buscadores antes de publicar de verdad.** Una sola `description` para las 31 páginas (solo cambia el título), sin `canonical`, sin `robots.txt`, sin `sitemap.xml`, sin etiquetas para compartir en redes (Open Graph). Todo el texto se arma en el navegador (sin HTML por ruta). Es trabajo del departamento SEO junto con Páginas web, no un error de hoy porque el sitio va con `noindex`.
6. **Peso: el paquete principal creció 33 % en un día y carga todo de golpe.** Armado de hoy: JS principal 342 KB (107.7 KB comprimido) + figura 20.8 KB (8.8 KB) en carga aparte; CSS 69 KB (15.5 KB). La bitácora del 18-11 decía 81 KB comprimido. Las 11 páginas de servicio, el blog completo (`blog.en.json`, 23 KB) y todas las páginas van en el mismo archivo aunque la persona solo abra el inicio; solo las figuras se cargan aparte. Hoy está dentro de lo aceptable para un sitio así (meta interna sugerida: menos de 120 KB comprimido), pero va subiendo. Arreglo mínimo cuando pase de esa meta: cargar aparte `Blog` (con su JSON) y `Service`, igual que ya se hace con `Figure`.

### Baja
7. **Las rutas se deciden en dos sitios.** `config/routes.ts` (lista de direcciones y títulos) y `pageFor()` en `App.tsx` (qué página dibujar) repiten la misma lógica. Si alguien agrega una dirección en uno y no en el otro, sale la página de error con el título de una página real. Hoy coinciden (31 rutas, verificado por ld-qa-5 rastreando menú y pie).
8. **Restos sin uso.** `lib/cn.ts` sin importar → `clsx` y `tailwind-merge` sobran; `motion` en dependencias sin ningún `import` (lo vio ld-frontend-2, confirmado con búsqueda); `components.json` (configuración de shadcn) sin componentes de shadcn; carpetas vacías `public/fonts` y `public/media` (las letras vienen de Google Fonts). Borrar o usar; hoy solo confunden.
9. **Sin pruebas automáticas ni revisión al subir.** No hay carpeta de pruebas ni un paso que corra `typecheck`/`build` antes de subir (todo depende de hacerlo a mano). Para el formulario de citas, cuando se conecte, hará falta al menos una prueba del envío y del manejo de errores.
10. **El README de `apps/api` no dice dónde vivirá la función en Vercel.** Vercel busca las funciones en `/api` de la raíz; `apps/api` no se detecta solo, y el `rewrite` a `index.html` puede tapar `/api/...` (lo vio también ld-backend-1). Anotar la decisión cuando se construya.

## Corrección a otro informe
- ld-frontend-2 (fallo 8) dice que `index.html` usa `/favicon.svg` fijo y no sigue `PAGES_BASE`. **No es así:** armé con `PAGES_BASE=/luminous-dental/` y Vite lo cambia solo a `/luminous-dental/favicon.svg`; también `logo.png` y `logo-star.png` del CSS y `dr-hahn.jpg` salen con la ruta correcta. Lo quito del resumen.

## Borrador de decisión (ADR, propuesto; no se escribe en `docs/adr/` sin el sí)
**ADR-0001 · Destino de publicación del sitio nuevo** · Estado: propuesto · Decide: Jadro.
- Contexto: hoy hay vista previa pública en GitHub Pages; `decisiones.md` dice Vercel + Cloudflare para el sitio real; el código mantiene los dos.
- Opción A, Vercel para el sitio real (GitHub Pages solo para vistas previas): cabeceras de seguridad, funciones para el formulario y reseñas, repositorio puede volver a privado. Contra: hay que configurar rutas y 404.
- Opción B, solo GitHub Pages: gratis y ya funciona. Contra: sin cabeceras, sin funciones de servidor (el formulario y las reseñas no se pueden conectar ahí), repositorio obligado a ser público.
- Recomendado: A. Al aceptarse, quitar `PAGES_BASE` cuando ya no haga falta la vista previa.

## Lo que no verifiqué
- Velocidad real en celular (LCP, CLS, INP): no medí con Lighthouse.
- El contenido real de la rama `gh-pages` y de lo ya subido a GitHub (no toqué git más allá de `status`, `branch` y `log`).
- Cómo responde Vercel de verdad (no hay despliegue en Vercel; todo es por lectura de `vercel.json`).
- No construí el mapa de graphify (`graphify-out/` no existe y el proyecto es pequeño; busqué directo en el código).

## Skills usadas
- `ld-bienvenida`: reglas (no publicar, no git, sin llaves, sin mezclar Nakeji).
- `architecture-decision-records`: borrador ADR-0001 con contexto, opciones y consecuencias; no se crea `docs/adr/` sin permiso.
- `ponytail:ponytail-audit`: cada fallo con caso concreto y arreglo mínimo; restos sin uso confirmados con búsqueda en todo el código.
- `git-workflow` y `github-ops`: solo lectura del estado (ramas, cambios sin guardar, peso del historial); ninguna acción.
- `security-review`: lista previa a publicar (cabeceras, `noindex`, 404) cruzada con el informe del Revisor.
- `plan-orchestrate`: orden de arreglos del RESUMEN.
- `graphify`: no se usó (no hay grafo; búsqueda directa, como pide la skill para consultas puntuales).
