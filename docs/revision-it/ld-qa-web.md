# Revisión QA · Inicio completo (ld-qa-web) · 19-11-2026

Página: http://localhost:5181/ (solo la ruta `/`). Navegador: Edge con Playwright 1.65. Tamaños: 1920x1080, 1440x900, 768x1024, 375x812. Solo revisé; no cambié código ni toqué git.

## Veredicto: PASA con reservas

El Inicio carga sin errores, no se desborda en ningún tamaño y todos los botones y enlaces que probé funcionan. La reserva es un fallo visible: texto de relleno «Lorem ipsum» en la tarjeta de Invisalign del carrusel (fallo 1). Con eso en pantalla no se debe publicar.

## Fallos (por gravedad)

### Alta
1. **«Lorem ipsum» visible en el Inicio.** Sección «Featured services», primera tarjeta («Invisalign & Braces»): la tercera viñeta dice «Lorem ipsum dolor sit amet, consectetur adipiscing elit...». Se ve en los 4 tamaños.
   - Cómo reproducirlo: abrir `/` y bajar a «Featured services».
   - Dónde está (observado): `apps/web/src/content/services.ts`, línea 119, `highlights` de Invisalign usa la constante `LOREM`. El archivo ya marca esto como `placeholder: true` («reemplazar antes de publicar»), pero la tarjeta lo muestra sin ningún aviso en pantalla.
   - Recomendado: cambiar esa viñeta por texto real o quitarla antes de publicar. Revisar también las otras 4 tarjetas del carrusel: las vi por clic, pero no leí cada una a fondo.

### Media
Ninguna.

### Baja
2. **Subrayado mal alineado en «Call or text (702) 805-8688» del menú móvil (375 y 768).** El texto va centrado pero la línea de subrayo azul queda pegada a la izquierda y es más corta que el texto. Cómo reproducirlo: abrir a 375 px, tocar el botón de menú y mirar el último enlace.
3. **Tarjetas del carrusel con nombres repetidos.** Hay 5 botones «Pause animation» con el mismo nombre (uno por tarjeta) y los puntos son «Go to slide N of 5» (esos sí son claros). Los 5 botones iguales confunden a un lector de pantalla. Observado: la lista de elementos accesibles; inferido: confusión para quien usa lector de pantalla (no lo probé con uno real).
4. **Reseñas: solo 3 personas distintas se repiten** (Sandra P., Ashok R., Ana B.), porque la cinta se duplica para animarse. Con 17 reseñas en Google (docs/datos.md) la cinta se ve repetida. Es un tema de contenido, anotado por si se quiere dar más variedad. (Inferido de lo que se ve; no revisé el código.)
5. **Ancho exacto: «glow» decorativo a 375 px** mide 377 px (2 px de más), pero la página no se desborda (scrollWidth = 375). Sin efecto visible.

## Lo que probé y salió bien

- **Carga:** sin errores ni avisos de consola, sin respuestas 4xx/5xx, sin peticiones fallidas, sin imágenes rotas, título y `lang="en"` correctos, un solo `<h1>`.
- **Desbordamiento horizontal:** ninguno a 1920, 1440, 768, 375 ni a 320 px (`scrollWidth` igual al ancho).
- **Menú de escritorio:** «Services» abre y cierra con clic y con Esc, el foco vuelve al botón. Se abre con clic, no al pasar el ratón (observado; no es fallo).
- **Menú móvil (375 y 768):** abre, cierra con Esc (foco vuelve a «Menu»), un enlace lo cierra y navega bien.
- **Enlaces:** 68 enlaces en el Inicio; todos con destino correcto a la vista (`tel:+17028058688`, `mailto:`, rutas internas, mapa, Instagram, Facebook, SAHARA). Los externos con `target=_blank` llevan `noopener`. (Las rutas internas devuelven 200 porque la app responde todas; no sirve para saber si la página destino está completa: eso es de los otros QA.)
- **Carrusel «Featured services»:** Siguiente/Anterior y los 5 puntos funcionan; el botón del extremo se desactiva (`aria-disabled`); poner el foco en una tarjeta lejana mueve el carrusel a esa tarjeta.
- **Formulario de citas (modo vista previa):** envío vacío marca 6 campos con mensaje en español sencillo y devuelve el foco al primer campo; correo y teléfono inválidos dan su mensaje; con datos válidos muestra «This form is not connected yet, so your request was not sent. Please call or text (702) 805-8688» y **no sale ninguna petición de red** (verificado). Usé datos de prueba obvios; no se creó ningún contacto.
- **Mapa:** el botón «Location of Luminous Dental» abre el mapa ilustrado con el pin y el crédito «© OpenStreetMap contributors». Observado: la tarjeta del mapa está siempre en movimiento, por lo que una herramienta automática no puede hacer clic normal (hubo que forzarlo); una persona sí puede.
- **Teclado:** el primer Tab va a «Skip to main content»; el orden sigue el orden visual; hay contorno de foco de 3 px en todo lo que probé (45 Tab).
- **Movimiento:** con «reducir movimiento» activado, 0 animaciones corren (con normal, 96).
- **Tamaño de toques:** ningún botón ni enlace visible mide menos de 24x24 px; los puntos del carrusel miden 32x44.

## Lo que no verifiqué

- No corrí axe-core (no está instalado): contraste, nombres y landmarks se revisaron solo a ojo y por el árbol de elementos. No se puede decir «accesible» solo con esto; eso toca a ld-disenador-uiux-2.
- Lector de pantalla real, Safari/iPhone real y Firefox: no probados (solo Edge/Chromium).
- Rendimiento (LCP/CLS/INP): no medido. Las fuentes Figtree/Newsreader aparecen como «unloaded» en 5 variantes: inferido que son pesos que la página no usa; no comprobé si cargan bien en una red lenta.
- Texto de las 5 tarjetas del carrusel y de las reseñas: leído solo en la primera tarjeta y en las capturas.
- Las demás páginas (servicios, blog, about, contact, error) quedan a los otros QA.
- Una línea horizontal plana donde termina el cielo estrellado aparece solo en capturas de página completa (el fondo es fijo); al bajar con el scroll real no se ve. Lo trato como efecto de la captura, no como fallo.

## Evidencia

Capturas en mi carpeta temporal de trabajo (no están dentro del repositorio): `home-1920/1440/768/375.png`, `form-invalid.png`, `menu-375.png`, `dropdown.png`, `map.png`.

## Skills usadas

`ld-bienvenida` (reglas y límites), `browser-qa` (humo, interacción, 3+ tamaños), `playwright-cli`/Playwright con Edge (pruebas), `accessibility` y `frontend-a11y` (teclado, foco, etiquetas, movimiento reducido), `verification-loop` (solo la parte de revisión; no corrí build ni pruebas porque el encargo era solo mirar). No usé `react-testing` (no hay pruebas de componentes que revisar en este encargo).
