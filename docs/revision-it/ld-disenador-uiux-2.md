# Revisión de diseño y experiencia · ld-disenador-uiux-2 (19-11-2026)

**Veredicto: PASA con reservas.** El diseño «cielo nocturno» es parejo (azul noche, dorado, Newsreader + Figtree), los botones de cita son claros y el inicio en celular se ve bien. Las reservas son de accesibilidad y de aire en Contacto.

Revisé: Inicio a 1440 y 375 (capturas con Edge), Contacto a 1440, y el código de estilos (`styles/*.css`) y componentes. Separo observado (capturas/código) de inferido.

## Fallos

### Media
1. **Movimiento que no se puede detener (WCAG 2.2.2).** Las dos tiras de reseñas (`components/Marquee.tsx`) corren solas más de 5 s y solo se pausan al tocar/enfocar; no hay botón visible de pausa. Además hay animaciones infinitas (`reviews.css`: `neon-sweep`, `google-hop`, `mac-scene`; `location-map.css`: `loc-ping`, `loc-halo`). Con «reducir movimiento» sí se apagan (observado en CSS), pero quien no lo activa no puede parar nada. Reproducir: abrir Inicio, bajar a reseñas, esperar. Recomendado: botón «Pause» en las tiras.
2. **Contacto, hueco vacío arriba a 1440 (`pages/Contact.tsx`).** Entre el bloque de dirección y «Request an appointment» hay unos 200 px de cielo vacío y la mitad derecha de la primera pantalla está sin contenido. Se siente como página sin terminar. Reproducir: `/contact` a 1440×900.
3. **Contenido repetido en Contacto.** La dirección y «Open in Google Maps» salen dos veces en la misma pantalla (arriba y en «Visit us»). Confunde y gasta espacio. Quitar una de las dos.

### Baja
4. **Escalera de servicios en Inicio (1440).** Las 4 filas se corren a la derecha cada vez; es intencional pero el texto de descripción cambia de columna fila por fila y cuesta leer en vertical. Opinión de diseño; en 375 se ve bien.
5. **Línea dorada bajo los títulos muy corta y tenue** (~50 px, baja opacidad): casi no se ve en las capturas. No es fallo de contraste de texto, es decoración.
6. **Casilla de consentimiento** (`input[type=checkbox]` en `site.css` ~l.226): se ve como cuadro blanco sin borde marcado sobre fondo azul oscuro; contraste del borde no verificado a 3:1. Agregar borde visible.
7. **Fuentes desde Google Fonts** (`index.html`): si tardan, el título cambia de letra (salto). `display=swap` ya está; hay carpeta `public/fonts`, conviene confirmar que se usa.

## Bien (observado)
- Enfoque visible: `:focus-visible` dorado de 3 px; campos con anillo azul de 4 px.
- Objetivos táctiles ≥ 44 px en menú, enlaces, pie y botones (54 px).
- Campos con etiqueta, `autocomplete`, `aria-describedby`/`aria-invalid`, mensajes en `role="status"`; enlace «skip to main» presente; `lang="en"`.
- `prefers-reduced-motion` respetado en CSS y en Marquee, Carousel, Backdrop y ResultFigure.
- Una sola acción de cita con el mismo nombre en cabecera, héroe y formulario.

## No verifiqué
- Contraste medido con herramienta (solo a ojo y por valores de tokens); borde del checkbox.
- Contacto a 375: el segundo marco de la captura no cargó; no lo vi.
- Servicios (11 páginas), Blog, About, Insurance, 404 y las figuras (son de otros QA).
- Navegación con teclado real, lector de pantalla, zoom 400 %, menú móvil abierto.
- Inicio a 768 y 1920.
