# Comprobación independiente · Mejoras 1 (19-11-2026)

Quién: QA 2 (`ld-qa-2`), no hizo las mejoras. Página: http://localhost:5181 (no el 5180). Navegador Edge sin ventana (Playwright), 1440 y 375 px. Capturas y guiones en la carpeta de trabajo: `C:\Users\DENTAL~1\AppData\Local\Temp\claude\cdce12c4c776118d\98500c9e-c214-44f7-a603-65ac9cda5605\scratchpad\q\` (no se guardaron en `docs/`).
Se leyó: `docs/MEJORAS-1.md`, `docs/mejoras-1-plan.md` y las últimas entradas de `docs/bitacora.md`. No se cambió código ni se tocó git.

## Veredicto por punto

| # | Punto | Resultado |
|---|---|---|
| 1 | Letrero de Las Vegas (inicio y Contact) | **PASA** (con una nota de tamaño) |
| 2 | Servicios destacados: 5 pestañas y figura | **PASA** (con una nota de tamaño de flechas) |
| 3 | El doctor: cuántas veces | **PASA** (3 nombres, 2 fotos) |
| 4 | Barra fija de celular | **PASA** |
| 5 | Sin Lorem, pausas, consola, enlaces | **PASA** (con una reserva: SAHARA) |
| Insurance | 24 logos y luz azul con pausa | **PASA** |

## 1. Letrero de Las Vegas
- **Observado:** medí las cajas de cada texto y de las 7 monedas, y miré el dibujo ampliado (x3) a 375 y a 1440, en inicio y en Contact. Ninguna moneda toca «TO», «Fabulous», el nombre ni «LAS VEGAS, NEVADA»; ninguna moneda tapa el borde dorado; el nombre y «LAS VEGAS, NEVADA» están en su propia franja. La medición automática marca una moneda a 0,2 unidades de la caja de «Fabulous»; es la esquina vacía de la caja, a simple vista hay aire (se ve en la captura).
- **Se lee a 375:** sí. El dibujo mide 339 px de ancho; «LUMINOUS DENTAL» queda a ~25 px, «Fabulous» ~25 px, «TO» ~14 px, monedas ~14 px.
- **Nota:** «LAS VEGAS, NEVADA» queda a ~7 px a 375 (11 px a 1440): se lee, pero es muy chico. Recomendado (no bloquea): subirlo si se quiere más cómodo en celular. También la «L» final de «LUMINOUS DENTAL» queda casi pegada al borde dorado abajo a la derecha (sin pisarlo).
- Capturas: `sign_home_1440.png`, `sign_contact_375.png`, `sign_375_x3.png`.

## 2. Servicios destacados (inicio)
- **Observado, a 1440 y a 375:** 5 pestañas con nombre (Braces & Invisalign, Implants, Dentures & bridges, Veneers & crowns, Whitening). Cada una cambia a su tarjeta (1 tarjeta visible, la pestaña marcada es la correcta, 1 solo botón «View service» por tarjeta, 1 o 2 viñetas, sin repetir frase).
- **La figura se ve en las 5 a 1440 y a 375** (dibujo de 706x342 a 1440 y 297x144 a 375, con ~300 a ~700 elementos cada uno). Probé también con carga en frío y tocando las pestañas en desorden y sin esperar (4, 1, 3, 0, 2): no apareció tarjeta vacía. No pude reproducir lo que vio el programador a 375.
- **Nota:** a 375 las flechas «anterior/siguiente» miden 22 px de ancho (el alto es 44): por debajo de 24x24 de WCAG 2.5.8. Se pueden tocar las pestañas, así que no bloquea; recomendado ensancharlas.
- Capturas: `feat_375_0.png` … `feat_375_4.png`, `feat_1440_0..4.png`, `feat_cold_375.png`.

## 3. El doctor (todo el sitio)
Revisé las 32 páginas (inicio, About, Services, 11 servicios, Insurance, Contact, Blog, 4 temas, 10 artículos, error), texto visible y fotos.

| Dónde | Nombre | Foto |
|---|---|---|
| Inicio · pie del anillo «Dr. Christian Hahn, General Dentist» + «Meet the doctor» | 1 | 0 |
| Inicio · foto en el anillo (`dr-hahn.jpg`) | 0 | **1** |
| Inicio · reseña de Ashok R. («Dr Christian, Joshua and Anna…») | 1 (en el código está 4 veces: 1 real y 3 copias ocultas para el movimiento; a la vista se ve 1 vez, por momentos 2 cuando la tira pasa) | 0 |
| About · título «Meet Dr. Christian Hahn» + foto | 1 | **1** |
| Resto (Services, 11 servicios, Insurance, Contact, Blog, error, pie, menú) | 0 | 0 |
| **Total** | **3** (2 de la clínica + 1 de un paciente) | **2** |

Cumple el tope del encargo (foto en el inicio + About). El texto alternativo de la foto lleva el nombre (no se ve, es para el lector de pantalla; no se contó).

## 4. Barra fija de celular
- **Observado a 375, en 8 páginas:** aparece al bajar más de ~600 px, con «Call or text» (`tel:+17028058688`) y «Request an appointment» (`#appointment`, o `/contact#appointment` en la página de error). Botones de 48 px de alto. No tapa el pie (arriba de la barra queda libre). Se esconde cuando el formulario está a la vista (comprobado en Contact) y en About/Contact/servicio a 1000 px de scroll porque ya ven el formulario. A 1440 no aparece.
- Capturas: `bar_home.png`, `bar_form.png`.

## 5. Lo que debe seguir bien
- **Sin «Lorem ipsum»:** 0 en las 30 páginas rastreadas (texto visible).
- **Consola:** 0 errores y 0 avisos en las 30 páginas a 1440 y en 11 páginas a 375; 0 respuestas 4xx/5xx; 0 imágenes rotas.
- **Enlaces internos:** 30 páginas descubiertas desde los enlaces, ninguna cae en «Page not found»; 60 enlaces con `#` apuntan a un id que existe.
- **Enlaces externos (16):** 15 responden 200 (Instagram, Facebook, Google Maps, NIDCR, NHS, MouthHealthy, FDA, AAO). **SAHARA** (`stay.saharalasvegas.com/promo?…accessCode=LUMI`) respondió 403 a mi petición automática: probablemente bloquea robots; **no verificado** en navegador real.
- **Pausas:** «Pause decorative animations» (pie): animaciones corriendo antes 84 en inicio, 70 en Contact, 8 en un servicio; después de pausar, 0 en las tres. El inicio y el servicio quedan idénticos en capturas separadas por 3 s. El botón cambia a «Play decorative animations» y reanuda.
  - En Contact, la página siguió cambiando unos ~6 s después de pausar y luego quedó fija (parece la tarjeta del mapa que ya estaba abriéndose; **inferido**, no confirmado). Menor.
- **Sin desbordes laterales** a 1440 ni a 375 en las 10 vistas medidas.

## Insurance
- 24 logos: los 24 cargan (sin rotos), todos con tamaño visible; 6 columnas a 1440, 2 a 375. Frase «Not sure if your plan is on the list? Call or text us…», tarjeta de 3 pasos y teléfono.
- Luz azul: con la página en marcha aparecen hasta 2 rayos a la vez (máximo 2); con la pausa del pie, 0 rayos durante 7 s a 1440 y a 375; al volver a «Play», regresan. Captura `ins_1440.png`.
- **Nota para la dueña:** el título «Insurance plans on our list» sostiene que esas aseguradoras aplican; `docs/datos.md` lo marca como por confirmar con la clínica. Hasta que confirmen, es una promesa sin verificar (la orden de copiar la lista fue de la dueña).

## No verificado
- Lector de pantalla, toque real en un teléfono físico, rendimiento (fps, LCP), contraste medido, teclado de punta a punta.
- Navegué a 375 con la ventana emulada de Playwright (no con el iframe pedido); da el mismo ancho exacto de 375 px sin desbordes. Solo Edge.
- Las 8 páginas de servicio no listadas arriba y los 14 artículos se revisaron por consola, enlaces, «Lorem» y doctor, no por captura una por una.
- El formulario no se envió (no se crean contactos reales).

## Pendientes recomendados (ninguno bloquea)
1. Flechas del carrusel a 375: ≥ 24 px de ancho.
2. «LAS VEGAS, NEVADA» del letrero más grande en celular.
3. Confirmar el enlace de SAHARA a mano y la lista de aseguradoras con la clínica.
