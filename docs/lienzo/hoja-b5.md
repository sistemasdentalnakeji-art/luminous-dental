# Hoja B5 · hero con la figura de 5 servicios (18-11-2026)
Archivos: `lienzo/project/Estilo-B5.dc.html` (1440, `$preview` 1440×8205) y `Estilo-B5-movil.dc.html` (375, `$preview` 375×8845). Copia de B4 corregida con la figura nueva; B3 y B4 no se tocaron. Figura en `lienzo/anatomy/servicios/` (build, página suelta de los 5 servicios y una página suelta por servicio). Skill: `anatomy`. Textos de `home.ts` para el resto de la página; sin meses, visitas, porcentajes, precios, tonos ni garantías.

## Concepto
**Un solo objeto para los cinco servicios:** el modelo dental sobre su base de banco, con la misma arcada, la misma encía rosa y la perilla dorada en el riel. Arriba, 5 pestañas con el nombre del servicio; al cambiar de servicio la figura se desvanece y vuelve armada de cero (transición de 0.2 s). Cada servicio tiene su propio número de pasos y la regla del riel cambia de marcas para que cada paso caiga en una marca larga. Un solo número `t` (la perilla) mueve todas las piezas y todas las palabras de ese servicio.

| Servicio (pestaña) | Qué se arma | Pasos (todos describen proceso) |
|---|---|---|
| **Braces & Invisalign** | La figura de brackets de B4: dientes chuecos, brackets, alambre, ligas | Crooked teeth · Brackets bonded · Archwire threaded in · Teeth start to move · Teeth move into line |
| **Dental implants** | Un premolar falta (hueco oscuro en la encía): baja el poste de titanio con roscas, luego el pilar, luego la corona de porcelana | Missing tooth · Post placed in the jaw · Abutment attached · Crown placed |
| **Dentures & bridges** | Un puente de 3 piezas: falta el incisivo lateral; los dos dientes de apoyo se tallan (más chicos, tono dentina) y el puente baja y asienta sobre ellos | Missing tooth · Support teeth shaped · Bridge set in place |
| **Veneers & crowns** | Un incisivo central: se talla y una corona de porcelana aparece arriba y baja hasta asentar | Natural tooth · Tooth shaped · Crown made · Crown seated |
| **Teeth whitening** | Los mismos dientes cambian del tono amarillento al tono claro; una capa de gel azul claro los cubre y luego se quita | Natural shade · Gel applied · Shade begins to lighten · Gel removed |

Decisiones: en «Dentures & bridges» elegí **el puente** (se explica mejor que una dentadura completa) y la pestaña conserva el nombre aprobado por la dueña; no se dibuja dentadura. En «Veneers & crowns» se muestra **la corona**; no hay carilla dibujada. En «Braces & Invisalign» **no se agregó la variante de alineador transparente** (era opcional); la figura muestra solo brackets, así que la pestaña nombra un servicio del que solo se ve la mitad.
Paleta: noche, superficie y cielo de B3; **oro solo en lo elegido** (perilla, pestaña activa, paso activo); porcelana para dientes, metal claro para brackets, alambre, poste y pilar; encía rosa apagada con hueco oscuro donde falta un diente.
Sin personas, sin WebGL, sin imágenes.

## Controles y movimiento
- **Pestañas** (patrón tabs, `role="tablist"`): flechas izquierda/derecha mueven y eligen, Inicio y Fin saltan; un solo tabulador de entrada (`tabindex` móvil). Cada pestaña mide 44 px de alto. A 1440 se acomodan en 2 filas; a 375 van en **una fila con scroll interno** (la pestaña elegida se desplaza a la vista, borde derecho difuminado como pista); la página no desborda (scrollWidth = ancho de ventana).
- **Pasos:** botones numerados (48 px, uno por paso del servicio), perilla arrastrable, flechas, Inicio/Fin (control `role="slider"`, `aria-label` «Treatment steps», `aria-describedby` con la descripción).
- **Bucle:** mientras nadie toca nada, la figura recorre los pasos de un servicio y **pasa al siguiente servicio** (los 5 en ≈ 45 s). Cuando la persona elige una pestaña, el bucle se queda en ese servicio. Botón **Pause/Play**; pausa con el cursor encima y con el foco de teclado en una pestaña, paso o la figura.
- **`prefers-reduced-motion`:** queda el paso final quieto del servicio y los controles funcionan (saltan); no hay bucle ni botón de pausa, y el cambio de servicio es sin transición.
- Sin script se ve la figura de brackets en su paso final (las pestañas se muestran solo cuando el script corre).

## Textos nuevos para aprobar (en inglés; todos son texto nuevo para aprobar por la dueña)
- Título de la tarjeta: «See how it works».
- Nombre de la lista de pestañas (accesible): «Services». Las 5 pestañas usan los nombres que aprobó la dueña: «Braces & Invisalign», «Dental implants», «Dentures & bridges», «Veneers & crowns», «Teeth whitening».
- Pasos (los 19 de la tabla de arriba); los de brackets son los de B4. Posibles dudas: «Shade begins to lighten» y «Teeth move into line» describen lo que se ve cambiar, no prometen resultado; «Crown seated» y «Crown placed» son pasos del proceso.
- Pista: «Pick a service, then drag the gold knob or pick a step».
- «Step n of N» (N = pasos del servicio).
- Nota: «Illustration. Individual results vary.» («Individual results vary.» ya está en `home.ts`; «Illustration.» es nuevo).
- Botón de pausa (nombre accesible): «Pause animation» / «Play animation».
- Nombre del control: «Treatment steps»; descripción accesible: «Illustration of a model of the lower teeth. Choose a service with the tabs, then step through how it is done with the number buttons or the left and right arrow keys.»
- Botones de paso: nombre accesible «Step n: …».
Lo que la figura **no** dice: tiempos, número de visitas, tipos de material, marcas, dolor, tonos, precios, garantías. Aviso de contenido: el sitio oficial de Luminous incluye estos servicios (la dueña los aprobó); la figura es genérica y no afirma qué técnica o material usa la clínica.

## Cada servicio se puede usar solo
`build.mjs` genera `servicio-braces.html`, `servicio-implants.html`, `servicio-bridges.html`, `servicio-crowns.html` y `servicio-whitening.html`: la misma tarjeta sin pestañas (`data-only="…"`), con su título, sus pasos, su regla y el bucle en solo ese servicio. Sirven para ponerlos después en la página de cada servicio, en el lugar del antes/después. Cada página suelta lleva el motor completo (≈41 KB comprimido en total con el dibujo); para varias figuras en una misma página conviene cargar el motor una sola vez (pendiente, no hecho).

## Auditoría
- `node audit.mjs` (propia; la del kit con grabador es para tubos y piezas redondas): 81 poses de brackets × 66 pares sin choques (hueco mínimo 0.38), todos los dientes sobre la encía, orden de pintado correcto, alambre por las 12 ranuras; **más** las escenas nuevas: con los dientes alineados, las coronas del puente (con 0.4 de holgura extra) no chocan con sus vecinos y el diente del implante queda sobre la encía. **audit passed.**
- `scripts/lines.mjs`: **line ends: 0** en los 5 servicios, en cada paso y en pasos intermedios (brackets en 0 a 4 cada 0.5; implantes 0, 1.5, 3; puente 1.5, 2; coronas 2.5, 3; blanqueamiento 1, 3, entre otros). Solo tema oscuro.
- Revisión a 4×: poste, roscas y pilar del implante (`shots/zoom-implant-abutment-4x.png`) y la corona que baja (`shots/zoom-crown-lowering-4x.png`).
- Pruebas en el arnés: pestañas por clic y teclado, rotación automática de servicios, pausa, Pause/Play, número de pasos y `aria-valuemax` por servicio.
- Se descubrió y corrigió: marcas de la perilla (moleteado) y de la regla demasiado largas para el tamaño nuevo; la pestaña elegida no se veía a 375.

## Peso
| Pieza | Sin comprimir | gzip |
|---|---|---|
| Dibujo de la tarjeta (brackets en su paso final, para cuando no corre el script) | 174.0 KB | 30.8 KB |
| Motor de los 5 servicios (kit recortado 13.8 KB + modelo + dibujo + controles) | 45.0 KB | 14.7 KB |
| CSS de la figura | 7.8 KB | — |
| Archivo B5 completo (B4: 277.1 KB / 62.5 KB) | 287.3 KB | 65.6 KB |
| Página suelta de un servicio (con todo el motor) | ≈181 KB | ≈41 KB |
Compartir kit y base entre los 5 costó solo ≈ 3 KB gzip más que B4 (y el B4 completo pesaba 62.5 KB). El dibujo de cada paso se hace con script a ≈30 fps, solo cuando la figura está a la vista; el dibujo de una escena tarda unos ms (no medido en navegador). Carga: el SVG viene en el marcado, no bloquea el titular; el script corre al montar el componente.

## No verificado
- El runtime real del lienzo (DC): las pruebas y capturas salen de un arnés (`harness.mjs`) servido por el visor `http://127.0.0.1:5190`, que no ejecuta el script del lienzo.
- Toque real en teléfono (scroll horizontal de las pestañas, arrastre de la perilla), fps reales, lector de pantalla, contraste de los textos y de los colores nuevos medido con herramienta.
- Edge sin ventana (157), no Chrome. Solo tema oscuro.
- Alturas de `$preview` medidas con el arnés; en el lienzo real pueden variar unos píxeles.
- La rotación automática de servicios es una decisión mía (para que el visitante vea los 5 sin tocar nada); si la dueña prefiere que se quede en brackets hasta que se elija una pestaña, es cambiar una bandera (`rotate`).
- La pestaña «Braces & Invisalign» solo muestra brackets; el alineador transparente no se dibujó.
