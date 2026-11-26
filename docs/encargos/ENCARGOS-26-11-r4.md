# Encargos 26-11 · Ronda 4 (correcciones: órdenes que no se cumplieron)

**Por qué falló la ronda 2:** la dueña dicta por voz; «sección R» = **sección hero** (el héroe). El Jefe lo leyó como otra sección y el rediseño se hizo en las pestañas de «Featured services» en vez del antes/después del héroe. También se leyó «no quites nada» como «no muevas Cómo funciona», y se dejó «mejor acomodo» a criterio del agente en lugar del orden que ella dio. Desde ahora cada punto lleva la frase de la dueña y no se reinterpreta.

Reglas comunes: iguales a `ENCARGOS-26-11-r2.md` (EN y ES, sin librerías, movimiento reducido/pausa, typecheck + build + Playwright msedge 375/768/1440 EN/ES, capturas `*-26nov-r4.png`, entrada corta en `docs/bitacora.md`, sin commit, solo tus archivos, cierra servidores). **Haz exactamente lo pedido; no cambies nada más.**

## F1 · Orden del inicio y Contact (`ld-desarrollador-web`)
Archivos: `pages/Home.tsx`, `pages/Contact.tsx`, `components/{Emergency,BookVisit,ContactLocation}.tsx` solo para la composición de Contact, y su CSS.
1. Orden del inicio (dueña: «servicios destacados va debajo, es la tercera sección. La sección estrella va debajo de la sección hero»): **Hero → sección estrella (FamilyCare) → Featured services → BookVisit → Seguros → Convenios → Reseñas → Visit us**. (Un bloque «Cómo funciona» se agregará después; deja el orden fácil de mover.)
2. Contact (dueña: «en una sección sola lo del booking a la izquierda, a la derecha el 24/7 Dental, y abajo lo del Fabulous Dental [letrero] con los horarios igual que el homepage y la moneda. Separados, sin tarjetas»):
   - Una sola sección arriba con dos columnas: **izquierda BookVisit** (el contenido que ya le gusta), **derecha Emergencias 24/7**. Sin tarjetas ni recuadros de fondo; se separan con espacio o una línea fina.
   - Abajo, **la misma sección «Visit us» del inicio** (letrero Luminous, horarios y moneda del mapa) tal como está en el inicio. Quita la versión partida (`part="info"`/`part="sign"`) de Contact.
   - En celular: booking, luego 24/7, luego letrero/horarios/moneda.

## D2 · Antes/después del héroe (`ld-disenador-uiux-2`)
Archivos: `components/BeforeAfter.tsx`, `content/smileCases.ts` (solo si hace falta), su CSS. No toques Featured services.
- Dueña: «la parte de los dientes [del héroe] está mal. Le dije que cambiara el diseño. Me gusta el antes y el después, pero que lo muestre de otra forma. No me muestra nada diferente». Antes: «me gusta que es un rectangulito, pero no me gusta lo demás; dale un diseño más agradable a la vista».
- Mantén: el antes/después con las mismas fotos y que los selectores de caso sean rectángulos. Cambia: **la forma de mostrarlo** (composición, cómo se compara, cómo cambia de un caso a otro). Tiene que verse claramente distinto al actual a primera vista. Crítica `impeccable` antes y después, capturas antes/después.

## F2 · Beneficios sin cifras y fotos del blog (`ld-frontend-2`)
Archivos: `components/BenefitsHeader.tsx`, `content/benefitsHub.ts`, su CSS; `content/blog.en.json`, `content/blog.es.json` (solo campos de imagen) y el componente de artículo/portada del blog si hace falta mostrar la imagen; `public/images/blog/`.
1. Encabezado de Beneficios (dueña: «no creo que vaya número, no sé ni por qué va eso ahí; invéntate algo más, que sea relevante»): **quita las 3 cifras (24 / 4 / 1)**. En su lugar, 3 puntos cortos sin números, relevantes a beneficios (p. ej. revisamos tu cobertura contigo; opciones de financiamiento; beneficios de convenio). Textos POR APROBAR.
2. Blog (dueña: «busca en el sitio oficial imágenes referentes al blog… es nuestra… ponla en los artículos»): revisa https://luminousdentallv.com (blog, servicios, galería) y descarga las imágenes propias del sitio que vayan con cada artículo (no fotos de antes/después de pacientes, no logos de terceros). Guárdalas en `public/images/blog/` en webp (640 y 1280) y muéstralas en la tarjeta del blog y arriba del artículo. Al menos una por artículo; si un artículo no tiene imagen adecuada, dilo. Anota la URL de origen de cada una en un comentario del JSON o en tu entrega.
