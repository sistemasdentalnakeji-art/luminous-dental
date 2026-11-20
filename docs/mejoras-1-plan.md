# Plan de mejoras 1 · Luminous Dental (19-11-2026)

Autor: ld-disenador-uiux-1 · Paso 1 del encargo `docs/MEJORAS-1.md` · **Solo plan: no se cambió código.**
Marcas: **observado** (lo vi en pantalla o en el código), **inferido**, **recomendado**. Todo texto nuevo en inglés va marcado «por aprobar».

## 0. Cómo se revisó
- Página real en `http://localhost:5181`, Edge sin ventana, 1440 px y 375 px exactos. Inicio, About, Services, Insurance & Financing, Contact, Blog, página de error y 3 servicios (Dental Implants, Dental Cleaning, Dental Appliances), todas en recortes de 1100 px de alto. Las otras 8 páginas de servicio y los 14 artículos del blog usan las mismas plantillas: **no las miré una por una** (no verificado una por una).
- Capturas en mi carpeta de trabajo: `scratchpad\mj1\shots\` (`home_1440_0..8.png`, `home_375_*.png`, `about_*`, `services_*`, `insurance_*`, `contact_*`, `blog_*`, `nope_*`, `impl_*`, `appl_*`, `clean_*`). No se guardaron en `docs/` para no engordar el repositorio (aviso A3 de la revisión de IT).
- Lectura del código: `Home.tsx`, `About.tsx`, `Services.tsx`, `Service.tsx`, `Contact.tsx`, `Insurance.tsx`, `FeaturedServices.tsx`, `content/home.ts`, `services.ts`, `site.css`, `featured.css`, y los de seguros de Nakeji (`InsurancePage.tsx`, `InsuranceGrid.tsx`, `insurance.css`, `partners.ts`, `benefitPages.ts`).
- Skills: `impeccable` (crítica de la jerarquía y del ritmo), `make-interfaces-feel-better` (detalles), `design-system` (repetición de patrones), `accessibility` (tamaños y movimiento), `frontend-design-direction`, `frontend-design`. Sin contraste medido a mano ni lector de pantalla: igual que lo que dice la revisión de IT.
- Aviso para quien repita capturas: la captura de página completa muestra una «costura» falsa en el fondo (el fondo animado queda fijo a la ventana). En una captura de ventana real no existe; no es un fallo.

**Qué ya está bien y no se toca:** paleta de noche con oro y azul cielo, Newsreader + Figtree, el anillo con las 4 áreas, los botones de 44 px o más, el pie, los colores de la tarjeta de contacto, `text-wrap: balance/pretty` ya puesto, cero `transition: all`. Sin desbordes laterales a 1440 ni a 375 (ancho de la página = ancho de la ventana en todas las que medí).

---

## 1. Los 3 ejemplos de la dueña (primero)

### 1.1 Servicios destacados (carrusel del inicio)

**Observado (1440):** una sola tarjeta ancha (unos 1296 × 470 px). Izquierda: título, frase, 2 viñetas y botón blanco «View service». Derecha: la figura 3D flotando, con el botón de pausa encima. Debajo: flechas y **5 puntos sin nombre**, y luego un segundo botón «View all services». A 375: figura arriba (unos 250 px), texto abajo; la tarjeta mide unos 700 px.

**Fallos de diseño:**
1. Los 5 puntos no dicen qué servicio es cada uno: quien no desliza no sabe que hay 5 (ni cuáles). Es el mayor problema.
2. En la tarjeta de Invisalign & Braces la 2.ª viñeta («For children, teens and adults.») repite la frase de arriba.
3. Dos botones casi iguales seguidos («View service» dentro de la tarjeta y «View all services» fuera) compiten.
4. La figura pesa menos que el texto (5fr / 6fr) y el fondo del recuadro es liso: se ve como un adorno, no como la prueba del servicio.
5. Es la 3.ª vez que el inicio enseña las mismas áreas (anillo, escalera de 4 grupos, carrusel).

**Recomendado (concreto):**
- **Pestañas con nombre en lugar de puntos.** Fila de 5 pestañas bajo la tarjeta: `Braces & Invisalign · Implants · Dentures & bridges · Veneers & crowns · Whitening` (nombres cortos: por aprobar; los largos siguen siendo el título de la tarjeta). Cada pestaña: alto 44 px, relleno 0 16 px, letra Figtree 15 px / 600, centradas con 8 px entre ellas. Activa: color blanco y línea dorada de 2 px debajo; las demás texto `--color-text2` al 80 %. A 375: la fila se desliza de lado con `scroll-snap`, la activa se centra sola, sin barra visible. Las flechas se quedan (a 1440 a los extremos de la fila, a 375 se pueden quitar porque se desliza con el dedo; mantenerlas para teclado).
- **Tarjeta:** columnas 5fr / 7fr (la figura crece de 6fr a 7fr); alto mínimo de la figura 420 px a 1440 (hoy ~400) y 260 px a 375; título 44 px máximo (hoy hasta 48), frase 20 px / 1.5.
- **Viñetas:** máximo 2 y se oculta la que repite la frase (en Invisalign queda solo «Invisalign and braces.»; mejor regla general: no mostrar en la tarjeta una viñeta cuyo texto ya está en la frase). En la página del servicio siguen las 3 de siempre.
- **Un solo botón dentro de la tarjeta** («View service»). «View all services» pasa a **enlace de texto con flecha** en la misma fila del título de la sección, alineado a la derecha (1440); a 375 queda debajo de las pestañas, centrado, 44 px de alto.
- Pausa: se queda arriba a la derecha de la figura (44 px). Sin reproducción automática (ya está así).
- Movimiento: al cambiar de tarjeta, desvanecer 150 ms (`opacity`, con `transition-property` explícito); con «reducir movimiento», cambio directo.
- **Texto «por aprobar»:** los 5 nombres cortos de las pestañas.
- Aceptación: a 1440 y 375 se leen los 5 nombres sin deslizar la tarjeta; ninguna tarjeta repite una frase; un solo botón primario por tarjeta.

### 1.2 El doctor se repite demasiado

**Conteo hoy (observado en la página real, texto visible):**

| Dónde | Nombre | Foto |
|---|---|---|
| Inicio · frase bajo el titular («Dr. Christian Hahn and our team care…») | 1 | 0 |
| Inicio · foto en el centro del anillo | 0 (solo en el texto alternativo, que oye el lector de pantalla) | **1** |
| Inicio · sección «Meet Dr. Christian Hahn»: título, texto («Dr. Christian Hahn is a general dentist…»), botón «About Dr. Hahn» | 3 | 0 |
| Inicio · reseña de Ashok R. («Dr Christian, Joshua and Anna…») | 1 tarjeta, que se ve **2 veces** (las dos filas repiten las mismas 3 reseñas; el código tiene 8 copias, 6 ocultas) | 0 |
| About · título «Meet Dr. Christian Hahn» y texto «Dr. Christian Hahn is a general dentist…» | 2 | 0 |
| Services, 11 páginas de servicio, Insurance, Contact, Blog, error, pie, menú | 0 | 0 |
| **Total visible hoy** | **8** (6 de la clínica + 2 de la reseña) | **1** |

Además: el texto del doctor del Inicio y el de About son **palabra por palabra el mismo** (dos veces la misma biografía) y `Language: English` también. La descripción que sale a buscadores (`home.seo.description`) nombra al doctor, pero hoy **no se usa** (el `index.html` tiene otra sin nombre): hoy 0 en la parte oculta de la página.

**Conteo que quedaría (recomendado):**

| Dónde | Nombre | Foto | Cómo |
|---|---|---|---|
| Inicio | **1** | **1** | La foto se queda en el anillo (es la firma del diseño). Debajo del anillo, un pie corto con propósito: `Dr. Christian Hahn, General Dentist` + enlace `Meet the doctor` → `/about` (por aprobar). Se **quita** la sección «Meet Dr. Christian Hahn» de Inicio completa y el nombre de la frase del titular. |
| About | **1** | **1** (el mismo retrato, mismo archivo `dr-hahn.jpg`) | Título «Meet Dr. Christian Hahn». El texto empieza con «He is a general dentist…» en vez de repetir el nombre (por aprobar). Es su sección, no se repite en otra página. |
| Reseña de Ashok R. | **1** | 0 | Es palabra de un paciente: se queda, pero una sola vez (ver 2.9: una sola fila hasta que haya más reseñas). |
| Resto de páginas | 0 | 0 | — |
| **Total que quedaría** | **3** (2 de la clínica + 1 de la reseña) | **2** (el máximo que pidió el encargo: inicio + su sección) | |

La dueña puede preferir **1 sola foto**: entonces About queda solo con texto y la foto vive en el inicio (decisión de ella; sin foto la página de About queda más pobre, recomiendo las 2).

**Texto nuevo por aprobar (Inicio):**
- `hero.support` (ahora trae el nombre): «Keeping your natural teeth for as long as possible is our priority. Our team cares for the whole family in Las Vegas.» (también arregla que la frase se repite casi igual en «We help you keep your own teeth»).
- Pie de la foto: «Dr. Christian Hahn, General Dentist» y enlace «Meet the doctor».
- About: primera frase «He is a general dentist with 4 years of experience.» (resto igual al oficial).
- No se toca `clinic.ts` (la biografía queda ahí para usar solo en About).
- El texto alternativo de la foto (`alt`) queda con el nombre para el lector de pantalla: eso no se ve y es correcto.

### 1.3 Insurance & Financing igual a la de Dental Nakeji

**Hoy (observado):** título + una frase («Questions about insurance or payment? Ask our team.») + tarjeta de SAHARA. Sin una sola aseguradora, y el título dice «Financing» pero no hay nada de financiamiento.

**Estructura a copiar (leída en `InsurancePage.tsx`, `InsuranceGrid.tsx`, `insurance.css`, `partners.ts`):**
1. Pestaña pequeña (eyebrow) + título + frase a la izquierda; a la derecha una **tarjeta con 3 pasos numerados** y un botón. (Aquí la numeración sí es válida: es una secuencia real.)
2. Título de la rejilla + **rejilla "Tablero"**: 24 logos reales en celdas con líneas finas de 1 px, borde redondeado de 24 px, cruces con una marca «+» dorada, y de vez en cuando una línea de luz azul que recorre las líneas (efecto «Snake», 2 a 4 tramos, máximo 2 a la vez).
3. Columnas: 2 (celular) · 3 (≥ 600 px) · 4 (≥ 960 px) · 6 (≥ 1280 px). Las 24 celdas llenan filas completas en las 4 medidas.
4. Los logos son transparentes y casi todos oscuros: llevan una **placa clara** pequeña (fondo blanco al 94 %, relleno 8 × 12 px, esquinas de 12 px) para leerse sobre el vidrio. Tamaño de logo: 50 / 56 / 60 px × raíz de su proporción, para que todos pesen parecido.
5. Los 24 nombres (orden alfabético, con ancho y alto de cada archivo): Aetna, AlwaysCare, Ameritas, Anthem, BeneSys, Cigna, Delta Dental, Dental Health Services, Guardian, HealthSCOPE Benefits, HealthComp, Horizon, Humana, Lincoln Financial Group, MetLife, Premera Blue Cross, Premier Insurance Company, Principal, Regence, Renaissance, Summit, UFCW, UnitedHealthcare, Unum. Archivos: 24 `.webp`, 408 KB en total.

**Adaptación a Luminous (qué cambia):**
| De Nakeji | En Luminous |
|---|---|
| Fondo `PagePlasma`, `Band`, `TextBlurReveal`, `ExternalLink`, `useLang`, `routeOf`, `shiny-text` | No existen aquí. Va con las clases propias de Luminous: `sec wrap pg`, `pill`, `h2` (la línea dorada de `.h2` ya viene), tarjeta tipo `.cov-out` / `.smile` para los pasos. |
| Enlace «Back to Benefits» (`BENEFITS_BACK`) | **Se quita** (Luminous no tiene «Beneficios»). Las migas no hacen falta. |
| Botón «Ask on WhatsApp» (`PAGE_CTA`, `PARTNERS_CTA`) | **Se quita** (es de Nakeji). En su lugar: botón primario «Request an appointment» (`#appointment`, el formulario ya está en la página) + enlace «Call or text (702) 805-8688» (`clinic.phone`). Un botón lleno y uno de texto, como el resto del sitio. |
| `--glass-shadow`, `--glass-layers-solid`, `--dur-fast`, `--ease-out`, `--color-ink` | No existen o significan otra cosa: en Luminous `--color-ink` es **azul oscuro** (#2a4269) y el título de la rejilla se vería casi invisible sobre la noche. Usar `var(--color-surface)` para las celdas, `var(--color-line)` para las líneas, `var(--ease)` (0.22,1,0.36,1) y `#fff` para el título. Líneas de la rejilla: `rgba(123,195,235,.34)` (= `--color-sky` al 34 %) ya es del mismo azul. |
| Luz «Snake» se detiene si `document.documentElement.dataset.motion === 'paused'` | En Luminous el botón de pausa pone el atributo **`data-motion-paused`** (`lib/motion.ts`). Cambiar la comprobación a `hasAttribute('data-motion-paused')`. Si no, el efecto ignora el botón de pausa (WCAG 2.2.2, el mismo fallo que la revisión de IT ya marcó). Sigue sin correr con «reducir movimiento», con la pestaña oculta y fuera de pantalla. |
| Colores de la luz (#9fd8f5 → #3fb5c8 → #2f63ad) | Se quedan: ya son cielo/brillo de Luminous. |
| Textos: `INSURANCE_INTRO`, `INSURANCE_STEPS`, `INSURANCE_GRID` en inglés | Se copian sin la frase «We accept US dental insurance plans» (ver abajo). |
| Datos propios de Nakeji (WhatsApp, ciudad, bilingüe, teléfonos) | En el código de la página y las 3 listas de textos no hay ciudad ni teléfono de Nakeji; **sí hay el vínculo de WhatsApp** y la ruta `/benefits`. Esos dos se quitan. Revisar antes de cerrar que no quede ningún nombre de Nakeji en comentarios. |

**Texto nuevo por aprobar (versión segura; no dice «aceptamos» porque la clínica no lo confirmó):**
- Eyebrow: `Insurance`.
- Título de la página: se queda **«Insurance & Financing»** (igual al menú; Nakeji pone «US insurance plans»).
- Frase: «Not sure if your plan is on the list? Call or text us before your visit and we will go over it with you.»
- Título de la rejilla: «Insurance plans on our list» (no «we accept»).
- 3 pasos: «Tell us your plan» · «Our team goes over it with you» · «Request your appointment». (El paso «We check your coverage» de Nakeji promete una revisión que la clínica no confirmó.)
- Financiamiento: **no se inventa nada.** Se deja una línea debajo de la rejilla: «Questions about payment? Ask our team.» (ya aprobada en ARREGLOS-IT-1).
- Pie de la rejilla (pequeño, visible): «Logos belong to their owners. Ask us to confirm your plan.» (por aprobar). Cuidado: no dice que cubren nada.

**Dónde va cada cosa (para el Paso 2):**
- `apps/web/public/insurers/*.webp` (copiar los 24, no cambiar nombres; los nombres con errores de ortografía, como `lincon` y `healt-scope`, son internos: se pueden renombrar si se actualiza la lista).
- `content/insurers.ts` (lista `[nombre, archivo, ancho, alto]`) con un comentario de una línea: «misma que Nakeji por decisión de la dueña 19-11-2026; la clínica debe confirmar que aplica a Luminous» (también en `docs/datos.md`, como pide el encargo).
- `components/InsuranceGrid.tsx` (copia de `InsuranceGrid.tsx` con el cambio de pausa) y `styles/insurance.css`; `pages/Insurance.tsx` reescrita.
- Nota para la dueña, **observado:** la lista oficial de Luminous (datos.md) tiene 15 nombres, entre ellos **GEHA** y «Blue Cross and Blue Shield»; la de Nakeji no trae GEHA y trae Anthem/Premera/Regence. Hoy Luminous muestra la de Nakeji por orden de ella; la clínica debe decir cuál es la real.
- Qué hacer con la tarjeta «Coming from out of town? / SAHARA»: se queda en esta página **debajo de la rejilla** como bloque ancho (hoy está arriba y ocupa 430 px antes de que haya una sola aseguradora). La rejilla sube al primer lugar.
- Accesibilidad: cada logo `alt` = nombre de la aseguradora; la lista es `ul` con `role="list"`; la luz «Snake» queda `aria-hidden`; a 375 con 2 columnas la altura mínima de celda 92 px. No hay controles dentro de las celdas (no son enlaces), así que no se pide 44 px.
- Vista a 375: 2 columnas × 12 filas ≈ 1100 px de rejilla; es larga pero ordenada. Opción mejor (inferido, no probado): a < 600 px mostrar 8 filas de 2 y un botón «Show all 24 plans» (44 px) que abre el resto. Recomiendo probarlo; si no, dejar las 12 filas.

---

## 2. Página por página

### 2.1 Inicio (hoy 9 704 px a 1440 y 11 183 px a 375)

Orden hoy: titular → anillo con 4 áreas → escalera de 4 grupos → Why patients choose → doctor → «Thinking about changing your smile?» → Featured services → seguro + SAHARA → reseñas → cita → Visit us (letrero + mapa) → pie.

**Observado:** el inicio cuenta las mismas 4 áreas **tres veces** (rótulos del anillo, escalera, y luego otra vez en el carrusel y en «Thinking about changing…»); la frase «Nothing can truly replace the function of your natural teeth…» sale en el titular **y** en «We help you keep your own teeth»; hay 6 títulos con la misma línea dorada de 88 × 3 px; 2 botones blancos «Request an appointment» seguidos en distintas partes; en 375 el botón «Call or text» se pega al anillo (menos de 28 px de aire).

**Recomendado:**
1. **Orden nuevo:** titular → anillo (con pie del doctor) → Featured services → Why patients choose → «Thinking about changing your smile?» → seguro + SAHARA → reseñas → cita → Visit us → pie. (Se va la sección del doctor, ver 1.2, y la escalera, ver siguiente punto.) Estimado: bajan unos **1 400 px a 1440 y 1 800 px a 375** (estimación, no medido).
2. **Escalera de 4 grupos (`svc-list`):** se retira del inicio. Su información se pasa a los rótulos del anillo: cada rótulo ya tiene estilo para una línea chica (`.lbl span`, 15 px, el CSS existe pero el código no la pinta): título 36 px + una línea de 15 px (`services.groups[i].line`, texto aprobado, sin cambios). A 375 los rótulos se muestran **bajo el anillo en columna, con borde superior** (el CSS ya lo prevé en el rango de celular): mismo orden, mismas 4 líneas, una vez. El botón «See all services» se queda debajo (hoy está solo a la derecha, sobrando en 1440).
3. **Titular:** subir el párrafo de apoyo de 18 a 20 px con ancho máx. de 34 em (hoy ~37 em) y 28 px entre párrafo y botones (hoy 30; vale). A 375: 36 px entre botón «Call or text» y el anillo (hoy ~28 px), y el anillo se reduce de 320 a 296 px para que la corona dorada quede entera en la primera pantalla.
4. **Why patients choose:** la frase pequeña de la derecha ya no repite el titular (el cambio en 1.2); `why-big h3` baja de 116 px a 96 px máx. y el título de sección «Why patients choose Luminous Dental» sube a 34 px: hoy el título pequeño queda enano al lado del gigante y se lee al revés (primero el de 116 px). Las otras 2 columnas se alinean arriba (hoy escalonadas 56 px una de otra: parece error, no intención).
5. **Líneas doradas bajo los títulos:** se quedan solo en el título de cada página y en «Featured services» (6 → 2 en el inicio). Es el adorno que se repite sin significar nada.
6. **«Thinking about changing your smile?»:** botón «Request an appointment» está bien; añadir bajo él un enlace «See cosmetic dentistry» → `/services#cosmetic` (texto por aprobar) para que la tarjeta lleve a algo más que a la cita (hoy son dos botones de cita en menos de 1 500 px).
7. **Seguro y SAHARA:** la columna de la izquierda es una sola línea y el borde superior queda sin nada debajo (~220 px de aire vacío en 1440). Opcional (por aprobar): una hilera de 6 logos (MetLife, Delta Dental, Aetna, Cigna, Guardian, Humana, los mismos 6 de la página) con el enlace a la página. **Solo si la clínica confirma** que trabaja con esas; si no, dejar la línea como está.
8. **Visit us (letrero + mapa):** hay ~100 px de vacío extra entre el formulario y el letrero (a 1440) y el mapa cerrado queda centrado en la columna sin alinearse con el letrero. Alinear arriba (`align-items: start`) y quitar el margen doble.
9. **Reseñas:** son 3 (sin repetir) pero se muestran en 2 filas que repiten las mismas 3 (6 tarjetas, 3 distintas). Una sola fila hasta que haya 6 o más reseñas reales (esto también achica el doctor: 1 aparición, no 2). La ventana con el logo y la pausa se quedan.
10. **Barra de acción en celular (375):** el visitante tiene que recorrer ~11 000 px para llegar al formulario. Recomiendo una barra fija abajo de 64 px (borde superior `--color-line-ui`, fondo `--color-surface` al 92 %) con dos botones de 48 px: «Call or text» (ícono de teléfono) y «Request an appointment». Aparece al pasar el titular y se esconde cuando el formulario está en pantalla; respeta el borde inferior de iPhone (`env(safe-area-inset-bottom)`). Los textos ya existen; **no hay textos nuevos**. Va en todas las páginas (también servicios). Pedir una cita pasa de «recorrer toda la página» a «un toque».

### 2.2 About (2 573 px a 1440, 4 322 px a 375)
**Observado:** título del doctor y texto; sin foto; ~200 px de aire entre el doctor y «Why patients choose»; «Why» muestra 3 columnas escalonadas en 1440; la página no termina con una invitación fuera del formulario.
**Recomendado:**
- **Foto en su sección** (decisión 1.2): círculo de 360 px en la columna izquierda bajo el nombre, con el mismo anillo fino de 1 px sky del anillo del inicio (no el anillo dorado de 4 arcos: es solo del inicio). Texto a la derecha con ancho máx. 34 em, como hoy. A 375: foto de 240 px centrada arriba del título.
- Quitar la «constelación» y la línea punteada del bloque del doctor (ya se quita del inicio; en About sobra la foto).
- Aire: de 200 a 96 px entre el doctor y «Why».
- «Why patients choose»: 3 columnas **alineadas arriba** (hoy escalonadas 56 px).
- Después del bloque «Why»: una línea con 2 enlaces de 44 px: «See our services» y «Insurance & Financing» (texto de menú, ya existen). Texto nuevo: ninguno.
- «Language: English» se queda; es dato oficial.

### 2.3 Services (hub, 4 762 px a 1440, 8 254 px a 375)
**Observado:** pestaña «OUR SERVICES» en mayúsculas, título con la mitad en dorado cursivo, frase, «Browse by category» con 4 chips de 44 px (bien), y 4 grupos con tarjetas de 2 columnas. Columna izquierda de cada grupo: título y 2 líneas, y el resto vacío (~300 px de hueco a 1440). Grupos con 1 sola tarjeta (Orthodontics, Pediatric) dejan media fila vacía. La tarjeta de **Dental Appliances** muestra solo título y enlace (texto de relleno todavía no real, A1).
**Recomendado:**
- Columna izquierda de cada grupo: `position: sticky; top: 112px` (queda a la vista mientras se recorre el grupo). Ancho 5fr / 7fr (hoy 5/7 más hueco); vale.
- Un grupo con 1 tarjeta: la tarjeta ocupa las 2 columnas (ancho completo), puntos en 3 columnas a 1440, 1 a 375.
- Dental Appliances (sin puntos): la tarjeta ocupa 1 columna pero con la frase «Call us to learn more about this service.» (por aprobar, no promete nada) en lugar de quedar mocha. Si el Paso 2 prefiere no escribir nada, se quita la tarjeta hasta que exista texto oficial; **recomiendo mantenerla con esa frase**.
- Pestaña «OUR SERVICES»: pasar a minúsculas con la mayúscula inicial («Our services») para no repetir la etiqueta en mayúsculas separada por letras que se ve en 3 páginas (Services, Blog, página de servicio). No cambia el texto, solo el estilo.
- Íconos de las tarjetas: 4 de 7 usan el mismo destello (sparkle); distintos para Cosmetic Bonding (pincel o tooth) y Teeth Whitening (sol). Si el Paso 2 no tiene íconos nuevos, **dejarlo**; es detalle, no bloqueo.

### 2.4 Las 11 páginas de servicio (Dental Implants 2 882 px, Cleaning 2 749 px, Appliances 1 931 px a 1440)
**Observado:** migas, título (hasta ~88 px), frase, 3 puntos y **2 botones centrados bajo texto alineado a la izquierda** (a 1440 los botones empiezan a 454 px y el texto a 63 px: parece que se movieron por error). A la derecha del título ~700 px de vacío. En los servicios con figura la figura va en la sección siguiente (parte baja de la pantalla) y ya no hay recuadro vacío (arreglado). Las páginas sin figura son largas de texto a 1280 px de ancho. Dental Appliances: título + botones + formulario, sin una frase.
**Recomendado:**
- **Botones del héroe alineados a la izquierda** (`justify-content: flex-start`) en las portadas de servicio (y en el blog, ver 2.7). El inicio sí los centra (ahí el texto es centrado): no tocar `.hero-cta` del inicio, solo agregar la regla propia de servicio. Este es el defecto visual más fácil de ver.
- Héroe: ancho máx. 40 em para frase y puntos; título 56–72 px (hoy hasta 88 px, pesa más que la figura).
- Servicios con figura: la figura sube **al héroe, a la derecha** a ≥ 1000 px (columna 5fr / 6fr), y la sección «About the treatment» queda con el texto a ancho completo de 40 em. Así se ve la figura sin recorrer pantalla; a 375 se queda como hoy (texto y luego figura). *Cambia la estructura copiada de Nakeji: es opcional y la dueña lo decide; si no se aprueba, mantener lo de hoy.*
- Texto «sobre el tratamiento»: ancho de 40 em y 19–20 px (hoy 1280 px ≈ 70 palabras por línea en 20 px, difícil de leer).
- Dental Appliances: añadir la misma frase de «Call us to learn more about this service.» (por aprobar) hasta tener texto real.
- «Learn more about this treatment» (a `/blog`, 2 servicios, B7): el enlace lleva a ese artículo solo si existe; si no, se oculta (ya lo hace así el código para los que no tienen `blogKey`; revisar que los 2 que van a `/blog` pasen a tener artículo o a ocultarse).
- Barra fija de acción en celular (2.1, punto 10): sobre todo aquí.

### 2.5 Insurance & Financing
Ver 1.3 (rehacer completa).

### 2.6 Contact (2 056 px a 1440, 3 249 px a 375)
**Observado:** título, 4 líneas sueltas (dirección, teléfono, correo, «Open in Google Maps») sin tarjeta ni íconos, y el formulario. Es la **página más pobre del sitio** frente al inicio, que tiene un letrero, una tarjeta con íconos, redes y un mapa dibujado.
**Recomendado:** título + el mismo componente del inicio (`ContactLocation`: letrero, tarjeta con íconos y redes, mapa dibujado) + formulario debajo (como hoy, con `hideVisit`). Ahorra código nuevo y la página queda igual de cuidada que el inicio. A 375: letrero, tarjeta y mapa en columna; formulario después. Quitar el `h1` repetido: el título «Contact» se queda, el `h2` oculto de «Visit us» se queda. Horario sigue sin mostrarse (POR CONFIRMAR).

### 2.7 Blog (5 113 px a 1440, 9 246 px a 375)
**Observado:** héroe con panel «Browse by topic» a la derecha, que arranca **a la misma altura que la pestaña** (queda pegado al borde superior del texto); botones del héroe a 241 px del borde (sin alinear con el texto, igual que en servicios); luego **otra** fila de chips con los mismos 4 temas bajo «Articles to answer your questions». Los 4 temas se muestran dos veces. Tres párrafos largos antes de llegar a un artículo.
**Recomendado:**
- Botones del héroe alineados a la izquierda (igual que 2.4).
- Quitar la fila de chips repetida (dejar el panel de temas, que además tiene el conteo). A 375, mostrar el panel como lista de chips de 44 px debajo del título (hoy el orden cambia en celular, B8).
- Panel de temas: bajar 24 px para alinear su borde superior con el título (no con la pestaña).
- Párrafo del héroe (hoy 5 líneas a 1440): el texto **no se cambia**; solo se fija su ancho a 38 em y 19 px para que ocupe 4 líneas. Si se quiere acortar, es texto por aprobar.
- Las 14 páginas de artículo: no las revisé una por una; heredan estos mismos defectos de ancho y de botones. **No verificado.**

### 2.8 Página de error (404)
**Observado:** título, 2 líneas, 2 botones (Back to Home / Request an appointment). Bien, pero sin salida útil si alguien llegó por un enlace roto.
**Recomendado:** debajo de los botones, 4 chips de 44 px: «Services», «Insurance & Financing», «Contact», «Blog» (texto de menú, ya existe) con la frase «Try one of these pages.» (por aprobar). El botón «Request an appointment» debe llevar a `/contact#appointment` (aviso M3 ya corregido; confirmar).

### 2.9 Piezas comunes
- **Cabecera:** bien. La píldora de vidrio es el mejor elemento de la página. A 375 el menú abierto ya funciona. Sin cambios.
- **Pie:** bien; 4 columnas, frase de la clínica, redes en texto y botón de pausa. Sin cambios.
- **Formulario (en 5 páginas):** campos blancos sobre tarjeta oscura con borde claro; **la casilla de consentimiento sin borde claro sobre azul** (B9): borde `--color-line-ui` más fuerte (1.5 px, `rgba(255,255,255,.6)`), 24 × 24 px. Etiquetas ya van arriba. Sin cambios de texto.
- **Etiquetas en mayúsculas separadas:** «OUR SERVICES», «ABOUT THE TREATMENT», «LUMINOUS DENTAL BLOG» (3 páginas), «ADDRESS / PHONE / EMAIL / FOLLOW US» en la tarjeta de contacto. Mayúsculas espaciadas en 8 sitios es el adorno de plantilla: dejar solo las de la tarjeta de contacto (son etiquetas de datos) y pasar las pestañas a minúsculas.
- **Líneas doradas bajo títulos:** ver 2.1 punto 5. Regla para todas las páginas: una línea por título de página, ninguna en títulos de sección.
- **`transition`:** ya no hay `transition: all`; no cambia nada. Para los nuevos controles (pestañas del carrusel, barra de celular): `transition-property: color, background-color, border-color, transform; duration: 150ms; ease`, con `:active { transform: scale(.97) }` y sin movimiento con «reducir movimiento».
- **Tamaños táctiles:** nuevas pestañas y barra de celular ≥ 44 px (WCAG 2.2 pide 24; el sitio ya usa 44).
- **Letra de los números:** `font-variant-numeric: tabular-nums` en el conteo del blog («2 articles») y en el paso «Step 1 of 4» de la figura (hoy los dígitos bailan al cambiar).

---

## 3. Textos nuevos por aprobar (resumen)
| Dónde | Texto |
|---|---|
| Inicio, titular de apoyo | «Keeping your natural teeth for as long as possible is our priority. Our team cares for the whole family in Las Vegas.» |
| Inicio, pie de la foto | «Dr. Christian Hahn, General Dentist» · enlace «Meet the doctor» |
| Inicio, «Thinking about…» | enlace «See cosmetic dentistry» |
| About | «He is a general dentist with 4 years of experience.» (en lugar de repetir el nombre) |
| Pestañas del carrusel | «Braces & Invisalign», «Implants», «Dentures & bridges», «Veneers & crowns», «Whitening» |
| Insurance | Eyebrow «Insurance» · frase «Not sure if your plan is on the list? Call or text us before your visit and we will go over it with you.» · título de rejilla «Insurance plans on our list» · pasos «Tell us your plan» / «Our team goes over it with you» / «Request your appointment» · pie «Logos belong to their owners. Ask us to confirm your plan.» |
| Services y Dental Appliances | «Call us to learn more about this service.» |
| Error | «Try one of these pages.» |

Todo lo demás de `home.ts` queda como está aprobado.

## 4. Orden de trabajo sugerido para el Paso 2 (cada uno en su archivo, sin pisarse)
1. Seguros (1.3): `content/insurers.ts`, `components/InsuranceGrid.tsx`, `styles/insurance.css`, `pages/Insurance.tsx`, logos en `public/insurers/`.
2. Doctor (1.2): `Home.tsx` (quitar sección y nombre del titular, pie de la foto), `About.tsx` (foto), `home.ts` (textos), `site.css` (clases del pie de foto).
3. Servicios destacados (1.1): `FeaturedServices.tsx`, `Carousel.tsx`, `featured.css`.
4. Inicio (2.1) y piezas comunes (2.9): `Home.tsx`, `site.css`, `Layout.tsx` (barra de celular).
5. Páginas: About, Services, Service, Contact, Blog, NotFound.
Cada mejora, una línea en `docs/bitacora.md`; los textos de la sección 3 a `docs/datos.md` como «por aprobar».

## 5. No verificado y pendientes
- Las otras 8 páginas de servicio y los 14 artículos del blog no se miraron una por una.
- Alturas estimadas después de los cambios (−1 400 / −1 800 px) son cuentas mías, no medidas.
- No medí contraste a mano ni probé con lector de pantalla, Safari o Firefox.
- No probé el efecto «Snake» ni los 24 logos sobre el fondo de Luminous: vi los archivos de Nakeji en código y la regla de la placa clara, no el resultado en pantalla.
- La lista de las 24 aseguradoras debe confirmarla la clínica (y la diferencia con la lista oficial de 15, ver 1.3). Nada de «aceptamos» ni de financiamiento hasta que lo confirme.
- Foto del doctor (permiso y calidad): ya estaba POR CONFIRMAR en `docs/datos.md`.
- Cambios que modifican estructura copiada de Nakeji (figura en el héroe del servicio, escalera fuera del inicio): son recomendaciones; los aprueba la dueña antes de programar.
