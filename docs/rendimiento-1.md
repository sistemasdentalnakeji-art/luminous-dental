# Rendimiento 1 · tiempos de carga (19-11-2026)

Pedido de la dueña: revisar el flujo de carga y optimizar sin cambiar cómo se ve ni lo que hace la página.
Medido con la versión de producción (`npm run build` + `vite preview`, puerto 5183) abierta en Edge sin ventana (CDP), caché apagada, sin limitar la red; es la PC local, así que lo que importa es la comparación, no el número exacto.

## Qué tardaba (antes)
- El estilo de Google Fonts bloqueaba el primer dibujo (pedía 2 sitios más: fonts.googleapis.com y fonts.gstatic.com) y las 3 fuentes (292 KB) solo empezaban a bajar a los ~400 ms, cuando ya había llegado ese estilo.
- Un solo archivo de JavaScript de 112 KB (gzip) que traía todo: blog (los textos de los artículos), servicios, seguros, About y el mapa/ficha con sus datos, aunque el inicio no los usa.
- El fondo `.meshy` (WebGL): el CSS `.meshy{display:none}` pierde contra `.backdrop canvas{display:block}` (más específico), así que NO está oculto en la página real: se ve y corre (ver "Pendiente de decisión").

## Qué se cambió
| Cambio | Archivos |
|---|---|
| Fuentes Newsreader (normal y cursiva) y Figtree autoalojadas (mismos archivos que servía Google, solo latin y latin-ext) y las 3 de la primera pantalla con `preload`; se quitan los 2 sitios de Google | `index.html`, `src/styles/fonts.css`, `src/styles/fonts/*.woff2`, `src/main.tsx` |
| Páginas About, Services, Servicio, Insurance y Blog cargan aparte (lazy); el blog entero (`BlogRoute`) incluye sus textos. `routes.ts` ya no importa el blog | `src/lib/pages.ts`, `src/pages/BlogRoute.tsx`, `src/app/App.tsx`, `src/config/routes.ts` |
| Al pasar el cursor, enfocar o tocar un enlace interno, ya se empieza a bajar su página (el clic se siente igual de rápido) | `src/lib/router.tsx` |
| Mapa/ficha y sus datos (27 KB, 9 KB gzip) cargan aparte y solo cuando su lugar está a ~1200 px de la pantalla; la caja ya reserva su alto (`.loc-map`), no se mueve nada | `src/components/ContactLocation.tsx` |
| Si el fondo WebGL está oculto con CSS al arrancar, ni se inicia (sin shader, sin dibujar a 30 fps). El código no se borró | `src/components/Backdrop.tsx` |
| Al abrir una página con ancla (`/services#cosmetic`) se vuelve a ir al ancla cuando la página aparece | `src/app/App.tsx` |

Ya estaban bien (no se tocó): figuras (lazy), logos de seguros (`loading="lazy"`), tarjetas de reseñas con foto (`loading="lazy"`), filas que corren (se detienen fuera de pantalla), estrellas (pausan con la pestaña oculta y con la pausa de animaciones).

## Antes / después
Inicio `/` y `/contact`; "antes" = una medición, "después" = 3 mediciones (rango).

| | Antes | Después |
|---|---|---|
| JS principal, gzip (build) | 112.05 KB | 89.25 KB (+3.1 KB jsx-runtime y 1.2 KB clinic que comparte con las páginas aparte) |
| Inicio: JS bajado | 108.9 KB | 91.6 KB (−16 %) |
| Inicio: peticiones / KB totales | 16 / 565.7 | 17 / 568.2 (las fuentes pesan ~20 KB más al venir sin la compresión extra de Google; se compensa con el JS) |
| Contact: peticiones / KB totales | 12 / 504.3 | 14 / 516.0 (el mapa, 9.3 KB, baja aparte cuando se acerca) |
| Sitios externos al abrir | 2 (Google Fonts) | 0 |
| Fuentes empiezan a bajar | ~395 ms | ~25 ms (en paralelo con el JS) |
| Primer dibujo (FCP) Inicio | 1116 ms | 892–928 ms |
| Primer dibujo (FCP) Contact | 1144 ms | 920–984 ms |
| Bloquean el primer dibujo | CSS propio + CSS de Google | solo el CSS propio (17 KB) |
| Blog / servicios / seguros / About en el inicio | sí (dentro del JS) | no (archivos aparte: Blog 7 + 1.8 KB, Insurance 2.6, Services 0.7, Servicio 0.9, About 0.5 gzip) |

## Revisado después del cambio (Edge sin ventana)
`/`, `/services`, `/services#cosmetic` (baja al ancla: 1655 px), `/about`, `/insurance-financing`, `/blog`, `/blog/bogus` y `/nope` (título «Page not found»), `/contact` (el mapa carga y aparece), clic de Inicio a Services tras pasar el cursor: todo bien, sin errores en consola. `npm run typecheck` y `npm run build` en verde.

## Pendiente de decisión (dueña)
- **Fondo `.meshy`**: hoy se ve (nube azul suave) y corre. Para ocultarlo de verdad basta cambiar la regla a `.backdrop .meshy{display:none}` en `site.css`; con eso el código nuevo de `Backdrop.tsx` ni lo arranca. No se aplicó porque cambia cómo se ve la página. En esta PC (sin tarjeta de video real) el ahorro en el hilo principal fue pequeño (~0.5 %); el ahorro real está en la tarjeta de video y no se pudo medir aquí.
- **Peso de las fuentes** (312 KB): la cursiva de Newsreader (154 KB) solo la usa la palabra resaltada del título. Quitarle el eje de tamaño óptico o la cursiva bajaría mucho, pero cambia la letra; no se hizo.
- No medido: red lenta "antes" (solo se midió "después": FCP ≈ 3.9 s con 1.6 Mbit/s, 150 ms de latencia y CPU ×4), ni en un teléfono real.
