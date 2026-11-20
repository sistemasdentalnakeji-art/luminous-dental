# Revisión independiente · Etapa 3 · QA 4 (`ld-qa-4`) · 18-11-2026

Sitio probado: http://localhost:5181 (servidor de desarrollo, Chromium con Playwright, 1440x900 y 375x812; también 320 de ancho solo para desborde). Contra el encargo `docs/ETAPA-3-CODIGO.md` y la referencia B5. No arreglé nada ni toqué git.

## Veredicto: PASA con reservas

Todo lo que se pidió probar funciona: 5 páginas, panel «Services», menú del celular, pie, figura, formulario. No hay errores de consola, enlaces internos rotos, desborde lateral ni peticiones de envío. Las reservas son contenido que falta o está sin permiso, y detalles pequeños de accesibilidad.

## Fallos, por gravedad

### Media
1. **«Insurance & Financing» no tiene la información que promete.** Cómo verlo: abrir `/insurance-financing`. Solo hay 2 párrafos (seguro privado y SAHARA); no hay nada de financiamiento ni lista de aseguradoras. El texto de Home y de esa página dice «Check the list…» y no existe ninguna lista. El título de la página y del menú promete algo que no hay. (Ya consta en `docs/bitacora.md`: no se listan aseguradoras. Aun así la frase «Check the list» queda colgada.)
2. **Se muestran datos de personas reales con permiso «POR CONFIRMAR».** Home muestra 3 reseñas con nombre (Ashok R., Ana B., Sandra P.) y la foto del Dr. Hahn (`/dr-hahn.jpg`). `docs/datos.md` líneas 84-85 dicen que falta el permiso. No son datos inventados (vienen del sitio oficial), pero no deberían publicarse sin el visto bueno de la clínica.
3. **Rutas que no existen devuelven la página de inicio, sin aviso de error.** Cómo verlo: abrir `/nope` o `/patient-reviews`: se ve la Home completa con el mismo título. Está documentado en `App.tsx` («no tiene diseño todavía»); anotado porque en producción esas direcciones se indexarían como duplicados de la Home.

### Baja
4. **Al cargar la página el foco queda dentro de `<main>`, no al inicio.** Cómo verlo (dev): abrir `/` y mirar `document.activeElement` = `MAIN`; la primera tecla Tab cae en «Request an appointment» del hero y se salta el enlace «Skip to main content» y el menú. Causa probable (inferida, no medida en producción): `StrictMode` ejecuta dos veces el efecto de `Layout.tsx` y la bandera `first` ya quedó en falso. En el build de producción probablemente no pasa. Sin verificar.
5. **El menú del celular no se cierra con Escape.** Cómo verlo a 375: abrir «Menu», pulsar Escape: sigue abierto. Sí cierra al tocar fuera y al elegir un enlace. El panel «Services» de escritorio sí cierra con Escape.
6. **El teléfono acepta cualquier texto.** Cómo verlo: en el formulario escribir `abc` en Phone, llenar lo demás y enviar: no marca error. (El correo sí se valida.)
7. **Contraste justo en «General Dentist» a 375 en `/about`.** Texto azul claro (#7bc3eb, 22 px, cursiva) sobre el fondo, estimado ≈3.6:1 muestreando píxeles; pide 4.5:1. En 1440 no salió. Es estimación, no medida con herramienta oficial.
8. **Áreas de toque por debajo de los 44 px del proyecto.** Enlaces «Home» 42x44 y «About» 43x44 en el menú de escritorio; casilla de consentimiento 36x36 (la etiqueta que la rodea es mayor; no medí el área clicable de la etiqueta). Todo cumple el mínimo de WCAG 2.2 AA (24 px). En el celular todo lo medido en el menú abierto y los controles de la figura son ≥44 px.
9. **Con «movimiento reducido» el botón de la figura dice «Pause animation»** aunque no hay nada moviéndose (la figura queda en el último paso). Debería decir «Play» o no mostrarse. Cómo verlo: emular `prefers-reduced-motion: reduce` y mirar el botón de pausa.
10. **Menú del celular largo.** Con «Services» abierto el menú mide ~930 px y a 375x667 «Contact», «About» y el teléfono quedan bajo el pliegue; hay que desplazar la página (no el menú). Funciona, es incómodo.
11. **Services es una lista de nombres sin descripción** (`/services`): 4 grupos con una frase y los nombres de servicio. No parece esqueleto vacío, pero es delgada.

### Informativo
- Consola de Home en escritorio: 4 avisos de Chromium sobre WebGL («GPU stall due to ReadPixels»), de la figura. No son errores. Las otras 9 páginas/tamaños: 0 mensajes.
- Se piden fuentes a `fonts.googleapis.com` y `fonts.gstatic.com` (privacidad: dato de IP a un tercero). Lo único externo que carga la página.

## Lo que sí pasó (observado)
- **5 páginas** a 1440 y 375: título propio, un solo h1, foco que pasa a `<main>` tras navegar, sin imágenes sin alt, `scrollWidth` = ancho de pantalla (también a 320). Sin respuestas 4xx/5xx ni peticiones fallidas. axe-core (WCAG 2 A/AA, 2.1 AA, 2.2 AA y buenas prácticas) sin violaciones; el contraste lo marca «incompleto» por el fondo en degradado, por eso lo medí por píxeles (puntos 7 y falsos positivos descartados en botones con fondo propio).
- **Panel «Services»**: abre con clic y con Enter, `aria-expanded` correcto, Escape cierra y devuelve el foco al botón, clic fuera cierra, Tab entra al primer enlace. Los 11 enlaces + «View all services» navegan sin recargar a `/services#...`, el destino existe y se hace scroll hasta él; también al cargar la URL con `#dental-implants` directo.
- **Menú del celular**: «Menu» abre/cierra; sub-menú «Services» abre; los 11 enlaces, Home/About/Contact/Insurance navegan y el menú se cierra; cada fila 255x48.
- **Navegación de escritorio**: los 5 enlaces llevan a su página, `aria-current` correcto, atrás del navegador funciona. El botón «Request an appointment» del encabezado lleva a `#appointment` también desde `/about`.
- **Pie**: 16 enlaces, todos con destino; externos con `target=_blank rel=noopener`. Maps, Instagram y Facebook responden 200 (curl).
- **Figura de 5 servicios**: 5 pestañas, flechas izquierda/derecha, Home/End y vuelta al inicio con foco itinerante (`tabindex` 0/-1) y `aria-selected` correcto; el contenido cambia en ~1-2 s (pasos 5/4/3/4/4). Botones de paso por clic; Pause detiene y Play reanuda (verificado con el cursor fuera de la figura); el cursor encima también pausa. Con movimiento reducido no avanza sola. Pestañas, pausa y pasos ≥44 px; a 375 las pestañas se desplazan en horizontal dentro de su caja (sin desbordar la página).
- **Formulario** (usé datos de prueba obvios, `qa@example.invalid`; nada salió a la red): envío vacío marca los 6 campos, enfoca el primero y dice «Please complete the highlighted fields.»; correo inválido y casilla sin marcar se marcan con `aria-invalid` y `aria-describedby`; envío válido muestra «This form is not connected yet, so your request was not sent…». Cero peticiones POST/PUT.
- **Foco visible**: contorno dorado de 3 px en todos los enlaces y botones; campos con sombra de foco (los recorrí 70 Tab seguidos sin ninguno sin indicador).
- **Datos inventados**: no encontré ninguno. Dirección, teléfono, correo, redes, Dr. Hahn (4 años, UNLV, inglés) y SAHARA coinciden con `clinic.ts` y el sitio oficial. No se muestran horario, calificación, precios ni ofertas. Frases escritas por el equipo (2.ª frase del hero, «same team», texto de sonrisa, «we will follow up») están marcadas en `home.ts` para aprobación de la clínica.

## No verificado
- Tablet (768) y capturas de comparación píxel a píxel contra `Estilo-B5.dc.html` (no hice diferencia visual; solo miré las capturas de Home a 1440 y 375).
- Build de producción (`dist`): probé solo el servidor de desarrollo. Los puntos 4 y el peso real, Core Web Vitals (LCP/CLS/INP) y que la figura no bloquee el titular no se midieron.
- Lector de pantalla real; zoom 400 % real; modo alto contraste.
- Enlace de SAHARA: responde 403 a `curl` (probablemente bloquea clientes automáticos); no lo abrí en un navegador con sesión.
- Slider de la figura (`role=slider`): sus teclas Inicio/Fin/PageDown no se pudieron comprobar porque la animación avanza sola durante la prueba. Repetir con la figura en pausa.
- Navegadores distintos de Chromium (Safari/iOS, Firefox); pantalla táctil real.
- Los números de contraste del punto 7 son estimaciones por muestreo de píxeles.

Capturas de trabajo (no guardadas en el proyecto): en la carpeta temporal de la sesión.
