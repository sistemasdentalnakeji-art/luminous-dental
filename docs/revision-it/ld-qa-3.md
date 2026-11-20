# Revisión IT · ld-qa-3 · Blog (19-11-2026)

**Veredicto: PASA con reservas.** El blog funciona (portada, 4 temas, 10 artículos, enlaces externos). Las reservas son de contenido (ya anotado) y de lo que no pude medir en celular.

Carpeta `docs/revision-it/ld-qa-3/` del intento anterior: estaba vacía, no había nada que aprovechar. Todo se hizo de nuevo.

## Qué se probó (observado)
- 15 direcciones en http://localhost:5181: `/blog`, 4 temas, 10 artículos. Todas cargan, cada una con 1 solo `h1` y título de pestaña propio («Tema | Luminous Dental Blog»).
- `/blog/no-existe` muestra «Page not found» con título correcto.
- Todos los enlaces internos que salen de las páginas del blog (menú, pie, servicios) responden 200.
- Los 13 enlaces externos de «Sources» (FDA, NHS, ADA/mouthhealthy, AAO, NIDCR) responden 200 y abren en pestaña nueva con `rel="noopener noreferrer"` (en el código, `Blog.tsx`).
- Capturas con Edge sin ventana a 1440 y 375 en el scratchpad (no se copiaron al repositorio).
- Sin restos de Nakeji, Monteverso ni teléfonos/precios en `blog.en.json` (búsqueda de texto).

## Fallos

### Media
1. **Texto con voz de la clínica no confirmada.** Frases como «Luminous Dental recommends an evaluation first», «Luminous Dental explains that orthodontics…» y «Luminous Dental offers pediatric dentistry…» están en `apps/web/src/content/blog.en.json` (artículos de coronas/carillas, ortodoncia, primera visita infantil). Ya está anotado en `docs/datos.md` como POR REVISAR; lo repito solo porque en pantalla se publica como afirmación de la clínica sin aviso. Reproducir: abrir `/blog/orthodontics-alignment-and-bite`, leer «Short answer».
2. **Fuentes con enlace en un solo formato frágil.** `linksIn` en `lib/blog.ts` lee la línea de fuentes con una expresión `[texto](url)`; si una fuente se escribe sin ese formato, desaparece en silencio (sin error). Hoy las 13 funcionan. Riesgo al editar.

### Baja
3. **Navegación del tema en celular.** En el HTML, la lista «temas del artículo» (`art-path`) va antes del texto, pero en la captura de 375 aparece después de «Next in this topic». Puede ser intencional; confirmar que el orden de lectura con teclado y en pantalla coinciden.
4. **Migas de pan largas.** En el artículo, la última miga repite el título completo (`/ Dental crowns: when covering a tooth is considered`); en 375 se ve en una línea aparte. Solo estético.
5. **Anclas de la portada** (`#articles`, `#topic-…`) no verificadas con clic real (no hay Playwright instalado; ver abajo).

## No verificado
- **Celular 375 y tablet 768 con medida real.** Edge sin ventana tiene un ancho mínimo y recortó el lado derecho de todo (también el menú), así que no puedo distinguir desborde real de falla de la herramienta. Hay que repetirlo con Playwright o con el modo celular del navegador.
- Clics reales, teclado (Tab/foco), contraste, lector de pantalla, errores de consola y velocidad (LCP/CLS): no medidos. `playwright` y `axe` no están instalados en el proyecto y no instalé nada.
- Que los enlaces externos digan lo que el artículo afirma (solo comprobé que abren; no leí cada fuente).
- 1920 y 768 no se capturaron; 1440 solo en portada y un artículo.

## Skills usadas
`browser-qa` (fases 1 y 2: carga, enlaces, 404), `accessibility`/`frontend-a11y` (revisión de migas, `aria-current`, `rel` en enlaces; sin axe), `verification-loop` (solo comprobación de rutas), `ld-bienvenida`. No usé `react-testing` (no se pidió escribir pruebas).
