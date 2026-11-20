# Comprobación independiente de los arreglos · ronda 1 (19-11-2026)

Quién: QA 5 (no hizo los arreglos). Página: http://localhost:5181. No se cambió código ni git.
Cómo: Playwright (ya instalado en la caché global de npm; no se instaló nada) con Edge, en 375, 768 y 1440 px reales (viewport de 375 exactos, sin iframe). Capturas en el scratchpad de QA 5 (`...\scratchpad\shots\`), no en `docs/`.
Recorrido: 31 páginas (inicio, /services, las 11 /services/*, /insurance-financing, /contact, /about, /blog, 4 temas y 10 artículos, más una página de error inventada).

## Veredicto general: NO PASA (1 punto falla, 1 con reserva)

| # | Punto | Veredicto | Evidencia (observado) |
|---|---|---|---|
| 1 | Menú móvil 375: subrayado de «Call or text» | PASA | El enlace tiene `text-decoration: underline`; se ve en la captura `menu-open-375.png`. |
| 2 | Tab con menú abierto no se escapa | PASA con nota | En 40 Tab y 20 Shift+Tab el foco da vueltas dentro del menú (logo, enlaces, Request, Call, Menu) y nunca llega al contenido de la página. Nota: el enlace «Skip to main content» (fuera del encabezado) entra en la vuelta. Escape cierra y devuelve el foco a «Menu». |
| 3 | Pausa de reseñas | PASA | 375 y 1440: las tiras avanzaban (scrollLeft cambia), al hacer clic quedan quietas 5 s (mismas posiciones), al reanudar vuelven a avanzar. El nombre del botón cambia: «Pause patient reviews animation» ↔ «Play patient reviews animation». |
| 4 | Botón «Pause decorative animations» del pie | **NO PASA** | Sí detiene: animaciones CSS (96–102 → 0 corriendo), tiras de reseñas y el fondo de la portada (captura de 3 momentos idénticos). **No detiene la figura de las páginas de servicio con pasos**: en `/services/dental-implants` con el pie en «Play decorative animations» el paso pasó de «Step 2 of 4» a «Step 4 of 4» y el modelo siguió moviéndose (capturas `p-impl-1.png` y `p-impl-3.png`; 4 celdas de la cuadrícula cambian). Causa probable (inferido): `features/figure/live.js` no lee `data-motion-paused`. La bitácora dice «detiene… figuras»: eso no se cumple para esta figura. Es el criterio 2.2.2 (aunque la figura tiene su propio botón Pause). |
| 5 | Botones de pausa del carrusel con nombre propio | PASA (parcial) | La tira de reseñas tiene nombre propio. Los botones «Pause X animation» del carrusel de servicios destacados no se recorrieron uno por uno en esta ronda: no verificado. |
| 6 | Sin «Lorem ipsum» visible | PASA | 0 de 31 páginas × 3 anchos con «lorem» en el texto visible (inicio, /services, 11 /services/*, blog y artículos). |
| 7 | Página de error: citas llevan al formulario | PASA | `/nope-xyz`: «Back to Home» → `/`; «Request an appointment» → `/contact#appointment`, y el formulario queda a la vista. Las demás páginas también tienen `#appointment`. |
| 8 | Contact sin huecos ni datos repetidos | PASA | Una sola dirección y un solo «Open in Google Maps» arriba; sin «Visit us» repetido (1440 y 375). Pie repite dirección/teléfono, que es normal. |
| 9 | About sin hueco de ~200 px | PASA con nota | Sin hueco grande. «Visit us» con dirección y mapa aparece una vez en About (más la del pie). Hay ~130 px entre el título «Why patients choose…» y las tarjetas escalonadas (parece diseño). |
| 10 | Servicios sin recuadro vacío | PASA | 11 páginas: 5 con figura, 6 sin; 0 cajas vacías con borde o fondo (prueba automática) y captura de `/services/routine-dental-care` a 375 limpia. |
| 11 | Casilla de consentimiento visible | PASA | Casilla de 28 px, borde blanco de 2 px sobre fondo oscuro (contraste muy superior a 3:1), se ve en 375 y 1440. |
| 12 | Línea dorada bajo títulos | PASA | Línea de 3 px × 88 px visible en Contact, About y formulario. Contraste exacto no medido. |
| 13 | Enlaces externos en pestaña nueva | PASA | 17 enlaces externos únicos en 31 páginas: todos con `target="_blank"` y `rel` con `noopener`. |
| 14 | `key` por ruta (formulario no arrastra datos) | PASA | Escribí un nombre en /contact, navegué a Inicio por el menú: el campo quedó vacío. |
| 15 | 0 errores de consola | PASA | 0 errores y 0 avisos en 31 páginas × 375/768/1440; 0 respuestas 4xx/5xx; 0 peticiones fallidas. |
| 16 | 0 enlaces rotos | PASA | Todos los enlaces internos encontrados (30 rutas) cargan con título propio (ninguna cae en «Page not found»); sin desborde horizontal en ninguna página a 375, 768 o 1440. |

## Resto de páginas a 375
Sin desborde horizontal en las 31 páginas; capturas revisadas a ojo: Contact, servicio sin figura y página de error (bien). El resto, solo por medidas automáticas.

## Por corregir
1. **Alto:** que el botón del pie también detenga la figura de pasos de las páginas de servicio (`live.js` debe respetar `data-motion-paused`), o que la bitácora deje de decir que lo hace.
2. Bajo: sacar el enlace «Skip to main content» de la vuelta del Tab con el menú abierto (opcional).

## No verificado
- Validación del teléfono («(» o «+» solos), mensajes 400/429/caída y bloqueo tras enviar: no se envió el formulario (para no crear contactos); el teléfono acepta «(» al escribir y el mensaje sale al enviar.
- Nombres de los 5 botones «Pause X animation» del carrusel; reseñas en vivo (M10).
- En el inicio, con todo pausado, una celda pequeña abajo a la derecha del primer pantallazo (zona del anillo, x 960–1200, y 750–900) cambió una vez; no se identificó qué es.
- Lector de pantalla, movimiento reducido del sistema, contraste medido con herramienta, toque real en celular.

## Skills usadas
browser-qa (humo, interacción, 3 anchos), playwright-cli (motor Playwright con Edge), accessibility / frontend-a11y (foco, nombres, 2.2.2), verification-loop (comprobar contra la bitácora). `react-testing` y `ponytail` no aplicaron más que como guía.

## Recomprobación (19-11-2026) · punto 4 (pausa del pie)
Veredicto del punto 4: **PASA** (con clics, Edge, 1440 px; sin cambiar código).
- /services/dental-implants, /services/invisalign-and-braces y /services/teeth-whitening: con «Pause decorative animations» el paso no cambió en 9 s (1 de 4 → 1 de 4; 5 de 5 → 5 de 5) y la imagen de la figura quedó idéntica (después de 4 s para que termine el movimiento que ya llevaba). Al pulsar «Play» volvió a avanzar (dental-implants y teeth-whitening: de 1 a 3 de 4; la imagen cambia en las tres).
- Nota: en Invisalign, el recorrido ya estaba en «Step 5 of 5» antes de pausar y sigue ahí tras Play en 9 s; el cambio se vio en la imagen, no en el número. No se probó si el recorrido vuelve a empezar después.
- Celda del inicio (x 960–1200, y 750–900): con todo pausado, 5 muestras en 10 s idénticas y 3 pantallazos completos idénticos. El cambio de antes fue el movimiento que terminaba justo al pausar; no es un fallo.
- Veredicto general: PASA con reservas (lo «No verificado» de arriba sigue igual).
