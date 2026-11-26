# Datos · Luminous Dental (Etapa 1)

Fecha: 17-11-2026 · Autor: Backend 1 · Fuente única: https://luminousdentallv.com y sus páginas internas (leídas con WebFetch el 17-11-2026; son resúmenes automáticos, así que el texto exacto se confirma al copiarlo a `content/`). Sitio solo en inglés.
Marcas: **EXISTE** (hay dato real), **PARCIAL**, **FALTA** (no hay dato real en la página oficial), **POR CONFIRMAR** (lo decide o confirma la clínica o Jadro).

## 1. Qué datos maneja el negocio

| Dato | De dónde sale hoy | Estado | Notas |
|---|---|---|---|
| Clínica: nombre, dirección, teléfono, correo, redes | https://luminousdentallv.com/ y https://luminousdentallv.com/contact-us/ | EXISTE | Ya está en `content/clinic.ts`. Dato nuevo: https://luminousdentallv.com/patients-resources/ muestra **otro teléfono, (725) 291-5588**, distinto al (702) 805-8688. POR CONFIRMAR cuál es. |
| Horario | **Confirmado por la dueña el 25-11-2026:** martes 4:00–8:00 p. m.; miércoles a sábado 8:00 a. m.–4:00 p. m.; domingo y lunes cerrado. Se escribe solo en `content/clinic.ts` (`hours`) y lo leen Contact, la ubicación del inicio y el pie. Las tres versiones del sitio oficial y de Google Maps (17-11) ya no valen. | **CONFIRMADO** | Ya se muestra. Si cambia, se edita solo `clinic.hours`. |
| Calificación de Google | Inicio: 4.3 de 5, 17 reseñas | EXISTE | Está en `clinic.ts` con fecha. Cambia con el tiempo. |
| Servicios | Menú y https://luminousdentallv.com/services/ ; páginas: /dentures-bridges/, /routine-dental-care/, /porcelain-veneers-crowns/, /cosmetic-bonding/, /dental-implants/, /teeth-whitening/, /general-dentistry/, /pediatric-dentistry/, /wisdom-removal/ | PARCIAL | Hay 11 nombres en `clinic.ts`. Solo hay un párrafo corto por servicio; sin precios ni detalle del procedimiento. Los enlaces de Orthodontics, Dental Appliances, Dental Cleaning y todo «Treatments» del pie apuntan a la página de blanqueamiento (/teeth-whitening-2, -3, -4): están mal. Invisalign & Braces y Restorative Services solo están en el pie. |
| Doctor y equipo | https://luminousdentallv.com/our-team/ y /about-us/ | PARCIAL | Solo el Dr. Christian Hahn (dentista general, 4 años, UNLV, inglés). **Su foto es un gris vacío.** No hay otro personal. En las reseñas aparecen nombres de pila (Joshua, Anna, Dennis, Yessenia Zamora); eso no es una lista de equipo y no se usa como tal. |
| Reseñas | Inicio: 8 con texto, 5 estrellas, de las 17 de Google | PARCIAL | Dos están en español; una dice «Alka Redkar» pero va firmada «Ashok Redkar». Con el sitio solo en inglés, las de español se usan solo traducidas y marcadas. Son nombres de personas reales: se confirma permiso antes de mostrarlas completas (POR CONFIRMAR). |
| Antes y después | https://luminousdentallv.com/before-after/ (+ /dental-crowns-before-after/, /dentures-before-after/, /implants-before-after/, /veeneers-before-after/, /bridges-before-after/, /smile-makeover/) | **FALTA** | Solo hay 6 títulos (Bridges, Invisalign, Veneers, Dentures, Crowns, Implants) con imágenes grises y texto de relleno («Lorem ipsum»). No se inventa ni se usa nada. Hacen falta fotos reales **con permiso escrito del paciente** (POR CONFIRMAR con la clínica). |
| Seguros | https://luminousdentallv.com/insurance-financing/ | EXISTE (lista) | 15 aseguradoras nombradas (Aetna, Blue Cross and Blue Shield, Cigna, Delta Dental, GEHA, Guardian, Humana, MetLife, United Healthcare, etc.). Hay faltas («United Cncordia») que se corrigen al copiar. No dice qué planes cubre ni si está «en red»: POR CONFIRMAR. La frase «afiliados a la mayoría de seguros privados» no se publica sin confirmar. |
| Financiamiento y formas de pago | misma página | **FALTA** | Solo una frase general. Sin socios, plazos ni precios. POR CONFIRMAR con la clínica. |
| Blog | https://luminousdentallv.com/blog-grid/ ; 4 entradas, todas del 1-05-2026: /your-trusted-family-dentist-in-las-vegas-care-for-all-ages-on-maryland-pkwy/, /dental-implants-vs-bridges-which-solution-is-best-for-your-missing-teeth-in-las-vegas/, /exploring-the-vibrant-local-culture-of-las-vegas/, /why-luminous-dental-is-your-best-choice-for-dental-care-in-las-vegas/ | EXISTE (4) | Hay que leer cada una antes de reusar (calidad y afirmaciones médicas, no verificado). La de «local culture» parece de relleno para buscadores. La página del blog tiene texto de relleno en la introducción. |
| Citas | https://luminousdentallv.com/contact-us/ (los botones «Get Appointment» llevan ahí) | PARCIAL | En la lectura no se vieron campos del formulario; solo la casilla de consentimiento («I consent to my personal data being collected and stored as per the Privacy Policy»), cuyo enlace va a `#`. No hay sistema de citas. Desde el 25-11-2026 la cita se agenda en Adit (`clinic.bookingUrl`); no hay formulario propio. |
| Política de privacidad | https://luminousdentallv.com/privacy-policy/ | PARCIAL | Tiene texto, pero con «Lorem ipsum» mezclado. Dice que se recogen datos como nombre, teléfono, correo, historial dental/médico, seguro y pago, y que cumple HIPAA. **Nosotros no vamos a recoger casi nada de eso** (punto 3). Hay que reescribirla y que la revise la clínica o un abogado: no verificado. |
| Alianza SAHARA Las Vegas | Inicio; enlace en `clinic.ts` | EXISTE | Enlace con código de promoción; confirmar que sigue vigente. |
| Contadores («k», «%», «+») | Inicio | **FALTA** | Sin números; no se muestran. |
| Páginas sobrantes | Mapa del sitio: cart, checkout, my-account, thank-you, loc-* (páginas de anuncios) | No aplican | Sobras de la plantilla. Sin tienda (decisión del dueño). |
| Dental Problems, Patients Resources | /dental-problems/, /patients-resources/ | PARCIAL | Patients Resources: sin formularios, descargas ni preguntas frecuentes, solo contacto y menús. Dental Problems: no se leyó a fondo. Se decide en el mapa de páginas. |

## 2. Qué cambia seguido y qué casi nunca

| Frecuencia | Datos | Dónde van |
|---|---|---|
| **Casi nunca** | Nombre, dirección, teléfono, correo, redes, alianza SAHARA, doctor, lista de servicios y su texto | `apps/web/src/content/` (archivos de texto). Se cambian en el código y se republica. |
| **De vez en cuando** (cada algunos meses) | Horario, lista de seguros, financiamiento, calificación y reseñas elegidas, fotos de antes y después, entradas del blog | `content/` mientras sean pocas (el blog: 4 hoy). Si la clínica quiere cambiarlas sola, sin pedir ayuda, entonces sí hace falta un panel de edición (POR CONFIRMAR; no se instala «por si acaso»). |
| **Seguido** | Solicitudes de cita (cada una es un dato nuevo de un paciente) | **Lo único que necesitará base de datos**, y solo desde la fase 3 de abajo. |

Conclusión: hoy todo lo que muestra el sitio cabe en `content/`. La base de datos (`packages/db`) solo se justifica para guardar solicitudes de cita. Si la clínica prefiere atenderlas en otra herramienta, no hace falta base de datos propia.

## 3. Citas en línea: camino por fases

La herramienta que recibirá las solicitudes está **POR CONFIRMAR con Jadro**. No se supone ninguna. Cada fase solo avanza con el sí del dueño.

| Fase | Qué hace | Qué guarda | Estado |
|---|---|---|---|
| **1. Vista previa** | (Reemplazada el 25-11-2026: el formulario propio se borró; la cita se agenda y cobra en Adit.) | Nada | **Ya no aplica** |
| **2. Aviso por correo** | Una función en el servidor valida la solicitud (`AppointmentRequest`), revisa el campo trampa y el límite por IP, y manda un correo a la clínica | Nada: llega el correo y listo | POR CONFIRMAR (servicio de correo y quién recibe) |
| **3. Guardar y dar seguimiento** | La solicitud se guarda con estado `received` y pasa por `contacted`, `scheduled` o `cancelled`. Nacen `apps/api` y `packages/db` | Solo los campos de `AppointmentRequest` + `id`, `status`, fechas | POR CONFIRMAR; se llama al DBA de sitios (manual, sección 26) |
| **4. Automatización** | La solicitud avisa a la herramienta elegida (un aviso automático, «webhook») para llamar, confirmar o agendar | Lo mismo que la fase 3 | POR CONFIRMAR con Jadro: herramienta y cuenta |
| **5. Disponibilidad real** (opcional) | El paciente elige un horario libre | Lo mismo + hora elegida | Depende de la herramienta y del horario confirmado |

Contrato para todas las fases (YA NO EXISTE desde el 25-11-2026: se borró `packages/types/src/appointment.ts` y todo el formulario). Un solo formato sirve de la fase 1 a la 5. Errores que el formulario debe saber manejar: datos mal escritos (indicando el campo), demasiados envíos y falla del servidor, con mensajes sencillos y sin detalles internos.

### Datos de paciente que NO se deben pedir
- Historial médico o dental, alergias, medicinas, embarazo, síntomas detallados o fotos de la boca.
- Datos de seguro (número de póliza o de miembro) y datos de pago o tarjeta.
- Fecha de nacimiento, número de seguro social, licencia o cualquier identificación.
- Datos de menores, más allá de que la cita es para un niño (el resto se habla por teléfono).
- Archivos adjuntos.
- Lo que sí se pide (ya definido): nombre, apellido, correo, teléfono, tratamiento de interés (de una lista), día preferido, mensaje corto y aceptación de la privacidad. Junto al campo de mensaje se avisa: «Don't include medical details».
- Ningún dato se guarda en el navegador, en registros del servidor, en la bóveda ni en el repositorio.

## 4. Nivel de seguridad que propongo (manual, sección 25)

| Fase | Nivel |
|---|---|
| 1 (hoy, vista previa) | **A** (sitio sin datos) |
| 2 (correo) | **B** (formulario) |
| 3 en adelante (guardar) | **C** (base de datos) |

**Propuesta para confirmar con el dueño en el Sí 1: nivel C, aplicado por fases.** Por qué:
1. El dueño pidió citas en línea que **crezcan a una automatización** y dejó `apps/api` y `packages/db` reservados; guardar solicitudes es nivel C por definición.
2. Aunque no pedimos historial médico, nombre + teléfono + correo + el tratamiento que busca la persona ya son datos de un paciente, y la propia política de privacidad de la clínica habla de HIPAA. Si la clínica debe cumplirlo con este formulario y cómo, **no está verificado**: lo decide la clínica con su abogado.
3. Hasta la fase 3 no se instala nada de nivel superior (sección 25, regla 2): se publica con lo de A, y B y C se activan solo con el sí del dueño.
4. Siguen vigentes: llaves solo en Vercel (nunca en el repositorio, el chat ni la bóveda), Cloudflare delante, Turnstile y límite de envíos en la fase 2, `security-review` en cada endpoint y revisión del Revisor de seguridad antes de publicar (fase 3 en adelante).

Alternativa más barata: quedarse en **B** (solo correo, sin guardar). Es más sencillo y guarda menos datos; se pierde el seguimiento de estados y la automatización completa.

## No verificado y pendientes
- Todo salió de resúmenes de WebFetch; el texto exacto y las imágenes se confirman al copiar a `content/`. No se leyeron a fondo /dental-problems/, /about-us/, /services/ ni las entradas del blog.
- Horario y segundo teléfono: los confirma la clínica.
- Permiso de pacientes para reseñas y fotos: lo gestiona la clínica.
- Herramienta de citas, servicio de correo y quién recibe las solicitudes: Jadro.
- Si la clínica debe cumplir HIPAA con este formulario: abogado de la clínica.

## POR CONFIRMAR añadidos en la Etapa 3 (18-11-2026)
- Foto del Dr. Hahn (`public/dr-hahn.jpg`, la del diseño B5): permiso y calidad. Es la única foto y sale una vez.
- Reseñas de la página de inicio (3): permiso de cada paciente para mostrarlas.
- Enlace «Read more patient reviews» y página de reseñas: no existen; se quitó el enlace.
- Privacy Policy: la oficial tiene «Lorem ipsum»; sin texto revisado no hay ruta ni enlace.
- Insurance & Financing: solo lleva el texto de la página de inicio; falta lista de seguros y financiamiento (ver tabla de datos).
- Textos nuevos de la figura (`content/figure.ts`) y mensajes de error del formulario (`home.appointment.errors`): los aprueba la dueña.
- Fuentes Newsreader y Figtree se cargan desde Google Fonts; para producción conviene alojarlas en el sitio.
- Insurance & Financing: se quitó «Check the list» (no hay lista) y no se muestra financiamiento; falta la lista de aseguradoras (ortografía oficial con errores) y todo lo de financiamiento: POR CONFIRMAR con la clínica.

## Etapa 3 · páginas de servicio y blog (18-11-2026) · PARA REVISIÓN DE LA CLÍNICA
**Páginas de servicio** (`content/services.ts`, 11 páginas, `/services/<nombre>`): textos tomados de las páginas oficiales luminousdentallv.com. La página oficial tiene restos de plantilla que NO se copiaron: otro nombre de clínica («Somerset Dental»), un nombre de doctor distinto («Dr. Palluck»), «Lorem ipsum», «Implants 15% off» y afirmaciones de precio («affordable»). Con `placeholder: true` (texto de relleno Lorem ipsum): **Dental Appliances** (todo) e **Invisalign & Braces** (tercer punto y el párrafo «About»). Los demás tienen texto real pero corto: la clínica debe confirmarlos.

**Blog** (`content/blog.en.json`, copiado del blog en inglés de Dental Nakeji, con la marca cambiada a Luminous Dental). Todo el blog queda POR REVISAR por la clínica: las frases del tipo «Luminous Dental explains / recommends / offers…» son del texto de Nakeji, no de Luminous.
- Artículos que se copiaron (10): implantes, dentaduras, coronas, carillas, blanqueamiento, ortodoncia, alineadores, primera visita pediátrica, limpieza profesional, extracciones y muelas del juicio.
- NO se copiaron (4), porque Luminous no anuncia ese servicio: All-on-4, All-on-6, periodoncia (encías que sangran) y endodoncia. Si Luminous los hace: POR CONFIRMAR.
- Se quitaron las menciones propias de Nakeji: enlaces a nakejidental.com (en «Sources» solo quedan ADA, FDA, NHS, AAO y NIDCR), «dentaduras inmediatas en su catálogo», «extracciones simples y quirúrgicas», «el servicio incluye pulido de manchas», «ofrece alineadores» y «incluye esa evaluación en su descripción». Quitamos la fecha de publicación y las fotos (Luminous no tiene).
- Se juntaron en un solo tema «Cleanings and extractions» (texto nuevo, por aprobar) las categorías de limpieza y extracciones; la de implantes quedó con 2 artículos (texto de introducción nuevo).
- Blog va en el menú como enlace directo (Nakeji lo tiene dentro de «Más» junto a Términos y Privacidad, que aquí aún no existen).
- Las fuentes externas (ADA, FDA, NHS, AAO, NIDCR) no se revisaron de nuevo: sin verificar que los enlaces sigan vigentes.

## Etapa 3 · sección de reseñas de Google y mapa (18-11-2026)
- **Reseñas** (`components/Reviews.tsx`, `content/reviews.ts`): mismo diseño que Dental Nakeji (letras «Google» animadas, ventana de navegador, dos filas de tarjetas). Hoy muestra las 3 reseñas reales de `home.ts` (cada una con 5 estrellas, como en el widget de la página oficial). **Permiso de cada paciente: POR CONFIRMAR.**
- **No se muestra** el número de la calificación de Google ni el total de reseñas (se vieron dos valores: 4.3 con 17 y 4.6 con 51), ni la fecha de cada reseña (no se tiene). Se quitaron las estrellas de resumen del diseño de Nakeji para no insinuar una calificación.
- **Enlace «See on Google»: no está.** En el proyecto solo existe el enlace de Google Maps de la dirección (`clinic.mapsUrl`, una búsqueda), no el de la ficha de la clínica. Hace falta el enlace de la ficha de Google: `config/reviews.ts` → `profileUrl`.
- **Para conectar reseñas en vivo (lo hace Jadro, la llave nunca va en el sitio):** un servicio en el servidor que lea Google Places (o la herramienta que se elija) y responda `{ reviews: [{ author, rating, text, relativeTime, authorUrl?, photoUrl?, googleUrl? }] }`; su dirección se pone en `config/reviews.ts` → `endpoint`. El código ya la usa (`lib/useGoogleReviews.ts`) y, si falla, deja la lista corta. Google exige mostrar el nombre del autor y su logo (ya se muestran).
- **Ubicación** (`components/ContactLocation.tsx`, al final del inicio como en Nakeji): contacto a la izquierda y mapa de Google Maps incrustado **sin llave** con la dirección de `clinic.ts` (`content/location.ts`). Sin horario. No se copió la tarjeta que se expande con el plano dibujado a mano de Nakeji (es de sus calles). El mapa carga desde google.com: al cargarlo Google recibe la IP del visitante (privacidad; decide la clínica). Título y texto de la sección son nuevos (por aprobar).

## Etapa 3 · letrero y mapa dibujado de la sección «Visit us» (19-11-2026)
- **Mapa dibujado** (`components/LocationMap.tsx` + `styles/location-map.css`): copia tal cual del de Dental Nakeji (ventana, plano dibujado, tarjeta que se mece y se abre sola al ver la sección, calles que se trazan, pin que cae). Solo cambian colores y letra; se definió la curva `--loc-spring`, que el archivo de Nakeji usa sin definir (por eso allá el pin no rebotaba).
- **Calles reales:** el dibujo (`content/locationMap.ts`) sale de **OpenStreetMap** (datos leídos el 19-11-2026 con la API Overpass; el punto de 1212 S Maryland Pkwy lo dio Nominatim): calles, nombres, edificios y parques alrededor. Los nombres son los que OSM da a cada calle (abreviados: Pkwy, Ave, St); una calle sin nombre claro queda sin etiqueta. No se copió ninguna calle de Nakeji. **Licencia ODbL: hay que mostrar «© OpenStreetMap contributors»** (está en la tarjeta abierta). Es un dibujo de la zona, no un mapa de navegación: el botón «Get directions» abre `clinic.mapsUrl`. Sin verificar contra el terreno: OSM puede tener calles o edificios desactualizados.
- **Se quitó el mapa de Google incrustado** (Nakeji tampoco lo usa); ya no se pide nada a google.com al cargar la sección.
- **Letrero tipo Las Vegas** (`components/VegasSign.tsx`): dibujo propio y original (no copia el letrero famoso ni ninguna marca): poste, estrella dorada arriba y foquitos que se encienden en cadena; quieto con «reducir movimiento». Es decorativo (oculto a lectores de pantalla). **Textos nuevos por aprobar:** «Visit us», «Luminous Dental», «Las Vegas, NV»; la línea «1212 S Maryland Pkwy» sale de `clinic.ts`. También por aprobar: etiqueta «Las Vegas, NV» y pista «Tap to see the location» de la tarjeta, y el texto de la sección.

### Ajustes pedidos por la dueña a «Visit us» (19-11-2026)
- Sección compacta en dos columnas alineadas. El **letrero es ahora el título** (dibujo propio, estilo Las Vegas clásico: letras rojas de neón, foquitos cálidos, estrella; con la paleta propia del letrero, no la del sitio): «Visit us» grande, «Luminous Dental», la dirección (de `clinic.ts`) y «Las Vegas, NV»; el `<h2>` «Visit us» sigue existiendo, oculto visualmente.
- **Mapa:** más zonas alrededor (unos 1.15 km de ancho, antes 0.7 km), **solo calles y parques** (se quitaron edificios y negocios), con datos de OpenStreetMap leídos el 19-11-2026 (73 calles antes, 163 ahora). La tarjeta cerrada queda centrada a lo alto de la columna y, al abrirse, ocupa toda la columna. «© OpenStreetMap contributors» sigue visible. Texto «Luminous Dental» más chico (tarjeta y pin).

### Letrero réplica del clásico y tarjeta de contacto (19-11-2026)
- **Letrero** (`components/VegasSign.tsx`): réplica de la disposición del clásico «Welcome to Fabulous Las Vegas, Nevada» (1959, diseño de Betty Willis, que nunca lo registró: su diseño es de dominio público; dato del encargo, no verificado por mí con una fuente legal): rombo crema con borde rojo y foquitos que se encienden en cadena, «WELCOME» con cada letra roja en un círculo blanco, «TO FABULOUS» en azul, el nombre grande en rojo, línea pequeña en azul, estrella roja y amarilla arriba y dos postes. Estático y todo encendido con «reducir movimiento». El `<h2>` «Visit us» sigue, oculto. **Textos nuevos por aprobar:** «WELCOME», «TO FABULOUS», «LUMINOUS DENTAL», «LAS VEGAS, NEVADA». Es un dibujo propio hecho con formas, no una copia de imagen.
- **Dirección, teléfono y correo** van dentro de una tarjeta con fondo (mismo estilo de las tarjetas del sitio).
- **Redes** (`components/SocialLinks.tsx`, `components/BrandIcon.tsx`): copiadas de Dental Nakeji (logos oficiales de Instagram y Facebook en sus colores, botón de 44 px, nombre accesible «Luminous Dental on Instagram / Facebook»); enlaces de `clinic.ts`. Dentro de la tarjeta, al pie.

### Letrero con las proporciones de la foto (19-11-2026)
- Se quitó el párrafo «Find us on S Maryland Pkwy…» bajo el letrero.
- `components/VegasSign.tsx` rehecho con las proporciones de la foto de referencia: rombo ancho y estirado, borde dorado con foquitos alrededor (se encienden en cadena; quietos y encendidos con «reducir movimiento»), siete monedas plateadas grandes con letras rojas sobre el borde de arriba, «TO» en mayúsculas azules y «Fabulous» en cursiva azul con sus rayitas, el nombre grande en rojo, «LAS VEGAS, NEVADA» en azul, estrella naranja con puntas amarillas sobre marco y postes azules. Dibujo con formas, no una imagen. Textos nuevos por aprobar: «WELCOME», «TO», «Fabulous», «LUMINOUS DENTAL», «LAS VEGAS, NEVADA».
- Mapa abierto: mide lo mismo que la columna izquierda (letrero + tarjeta de contacto, que se compactó); tarjeta cerrada más grande (440 × 270 px, antes 340 × 200).

## Servicios destacados y portada sin figura (19-11-2026)
- **Servicios destacados** (`components/FeaturedServices.tsx`, `components/Carousel.tsx`, `styles/featured.css`): copia de la estructura de Dental Nakeji (título, carrusel de tarjetas con scroll-snap: 1 por vista en celular, 2 desde 768 px, 3 desde 1080 px; botones abajo; sin reproducción automática; botón «View all services»). Va antes de la sección de seguros, como en Nakeji. Los 5 servicios, en este orden: Invisalign & Braces, Dental Implants, Dentures & Bridges, Porcelain Veneers & Crowns, Teeth Whitening.
- **La diferencia:** en vez de foto, cada tarjeta muestra el resultado terminado de ese servicio (la figura flotando sobre su molde transparente, sin tarjeta ni controles) con un vaivén suave que solo corre mientras está a la vista; quieta con «reducir movimiento». El motor de la figura se carga una sola vez para las 5 tarjetas. No se quitó la «Most requested» de Nakeji por ser una afirmación sin confirmar: no se muestra insignia. Textos: de `content/services.ts` (página oficial). **Texto nuevo por aprobar:** «Some of the treatments we offer at our clinic in Las Vegas.» (adaptado de Nakeji). La tarjeta de Invisalign & Braces muestra su tercera frase de relleno (Lorem ipsum, `placeholder: true`) hasta que haya texto oficial.
- **Portada:** sin figura; titular, párrafo y botones centrados como en B3. La figura con pestañas de la portada se eliminó; la figura de las páginas de servicio no cambió.
- **Limpieza:** se quitó el CSS sin usar (`.svc-group`, `.rev`, `.feat`, `.quotes`, `.ph`, `.sr`, terreno, río y bloques del mapa viejo, y las reglas de pestañas y portada de la figura) y el código de la figura que solo usaba la portada.

## Textos nuevos APROBADOS por la dueña 23-11 (19-11-2026, arreglos IT ronda 1)
- Insurance: «Questions about insurance or payment? Ask our team.» (reemplaza la frase de seguros, que sigue POR CONFIRMAR).
- Pausa: «Pause/Play patient reviews animation», «Pause/Play {servicio} animation», «Pause/Play decorative animations».
- Formulario: «We could not accept some of the details. Please check the form, or call or text (702) 805-8688.»; «Too many requests right now. Please wait a few minutes and try again, or call or text (702) 805-8688.»; «Enter a phone number with at least 7 digits, like (702) 805-8688.»
- Página de error: botón «Request an appointment».
- POR CONFIRMAR con la clínica: texto real de Dental Appliances (todo) e Invisalign & Braces (tercer punto y párrafo «About»); frase de seguros.

## Textos nuevos APROBADOS por la dueña 23-11 (19-11-2026, Mejoras 1, paso 2)
- **Inicio:** frase bajo el titular «Keeping your natural teeth for as long as possible is our priority. Our team cares for the whole family in Las Vegas.» · pie del anillo «Dr. Christian Hahn, General Dentist» + enlace «Meet the doctor» · enlace «See cosmetic dentistry» (en «Thinking about changing your smile?»).
- **About:** «He is a general dentist with 4 years of experience.» (el resto del párrafo es el oficial).
- **Servicios destacados, pestañas:** «Braces & Invisalign», «Implants», «Dentures & bridges», «Veneers & crowns», «Whitening». Las tarjetas ya no muestran una viñeta que repite la frase de arriba (máximo 2).
- **Insurance & Financing:** eyebrow «Insurance» · «Not sure if your plan is on the list? Call or text us before your visit and we will go over it with you.» · pasos «Tell us your plan» / «Our team goes over it with you» / «Request your appointment» · «Insurance plans on our list» · «Logos belong to their owners. Ask us to confirm your plan.» · «Questions about payment? Ask our team.» (ya aprobada).
- **Services y servicio sin texto (Dental Appliances):** «Call us to learn more about this service.»
- **Página de error:** «Try one of these pages.»
- **Barra fija del celular:** sin textos nuevos («Call or text», «Request an appointment»).

## Seguros: lista de 24 aseguradoras (POR CONFIRMAR)
- La lista y los logos son **los mismos que Dental Nakeji, por decisión de la dueña el 19-11-2026**; la clínica debe confirmar que aplica a Luminous Dental (`content/insurers.ts`, logos en `apps/web/public/insurers/`).
- **Diferencia con la lista oficial de Luminous (15 nombres) — POR CONFIRMAR, no resuelta:** la oficial trae **GEHA** y **Blue Cross and Blue Shield**, que la de Nakeji no trae; la de Nakeji trae Anthem, Premera Blue Cross, Regence y otras que la oficial no nombra. La clínica debe decir cuál es la real.
- La página no dice «aceptamos» ni promete financiamiento.

## Textos nuevos APROBADOS por la dueña 23-11 (19-11-2026, ficha del mapa)
- Texto en arco de la ficha: arriba «LUMINOUS DENTAL», abajo «1212 S MARYLAND PKWY» (dirección real, `clinic.ts`).
- Nombre del botón del mapa: «Open map of our location» / «Close the map». La pista «Tap to see the location» sigue igual.

## Textos nuevos APROBADOS por la dueña 23-11 (20-11-2026, ciudad y neón del pie)
- Nombre accesible del logo en neón del pie (lo lee el lector de pantalla): «Luminous Dental neon sign». Sin otros textos nuevos.

## Héroe «Casos en órbita» (20-11-2026) · APROBADO por la dueña 23-11
- **Fotos de antes/después (`public/smiles/caso1-*.jpg`, `caso2-*.jpg`): permiso de pacientes POR CONFIRMAR; no publicar en la página pública sin ese permiso.** Salen del archivo de referencia de la dueña. Hasta tener el permiso, no subir la página pública (gh-pages) con estas fotos.
- Textos nuevos por aprobar (`content/smileCases.ts`): «A different future.» · «No longer hidden.» · «Before» · «After» · «Pause animation» / «Play animation» · «Individual results vary.» · «Smile gallery: before and after» · «Compare before and after» · «Show case: …» · descripciones de las 4 fotos (`alt`, no identifican a nadie).
- La burbuja «Patient reviews» del prototipo NO se pasó (era un lugar reservado). Si se quiere, solo con reseñas reales de `content/reviews.ts`.

- Formulario de cita, títulos de sección nuevos (2026-11-21, POR APROBAR): «Your details», «Your visit», «Message and consent».

## Héroe: comparador quieto (21-11-2026) · APROBADO por la dueña 23-11
- Se quitaron los textos «Pause animation» / «Play animation» del héroe (ya no hay animación). Los demás textos de `content/smileCases.ts` siguen por aprobar. Los casos ahora son botones «A different future» / «No longer hidden». «Individual results vary.» se mantiene.
- Fotos de antes/después: permiso de pacientes sigue **POR CONFIRMAR**.

## Textos nuevos APROBADOS por la dueña 23-11 (23-11-2026, calendario y formulario de cita)
- Selector de hora (como el de Dental Nakeji): «Choose a time», «Choose a day first» (hora bloqueada hasta elegir día), «Morning», «Afternoon».
- Texto de ejemplo en las casillas: «Your first name», «Your last name», «(000) 000-0000», «you@example.com» (sin nombres de persona, 23-11 r3) y, en el mensaje, «Tell us how we can help.» (sustituye a «No medical history or payment info, please.»; si se quiere conservar ese aviso de privacidad, va como etiqueta, no como ejemplo).
- El horario del selector sigue siendo de ejemplo (POR CONFIRMAR, `config/schedule.ts`).

## Textos nuevos APROBADOS por la dueña 23-11 (23-11-2026, segunda ronda, seguros «La tarjeta»)
- POR APROBAR: «Show all 24 plans» (el 24 sale de `insurers.length`) y «Show fewer plans», botón que abre y cierra el muro de logos de la home. «Insurance plans on our list» es solo el nombre accesible del muro (no se ve). El resto de los textos de seguros ya estaban aprobados.

## Páginas legales (23-11-2026, tercera ronda) · POR CONFIRMAR (revisión legal)
- **AVISO: el texto de `/privacy-policy` y `/terms-and-conditions` (`content/legal.ts`) necesita revisión de un abogado antes de publicar. No se muestra este aviso en la página.** No hay página de «mensajes/SMS» aparte porque Dental Nakeji tampoco la tiene: el consentimiento de mensajes de texto va como sección «Text messages» en Terms (y un resumen en Privacy).
- Estructura copiada de Dental Nakeji; el contenido NO copia obligaciones mexicanas (LFPDPPP, ARCO, Profeco, tribunales de Tijuana, SSN por teléfono, plazo de 20 días). Datos reales usados: nombre, dirección, teléfono y correo de `content/clinic.ts`.
- POR CONFIRMAR con la clínica: fecha de vigencia (`updated` está vacío: la página no muestra fecha), responsable de privacidad (nombre/cargo) y si hay un correo solo de privacidad (hoy `info@luminousdentallv.com`), proveedores reales (alojamiento, formulario, correo, mensajes de texto), si el sitio usa cookies o analítica, cancelación/depósitos/garantías (el texto dice solo «avísenos con tiempo» y «se explica por escrito»), si entregan un Aviso de Prácticas de Privacidad (HIPAA) en la primera visita.
- POR CONFIRMAR con el abogado: que sea correcto decir que la clínica es entidad cubierta por HIPAA y que este resumen basta junto al aviso formal (45 CFR 164.520); texto de mensajes (TCPA/CTIA: «Message frequency varies», «Message and data rates may apply», STOP/HELP, «Consent is not a condition», «no compartimos el número con terceros para su marketing»; si el envío es automatizado); conservación del expediente en Nevada; ley aplicable (Nevada) y foro; límite de responsabilidad; ley de datos de salud del consumidor de Nevada; texto de menores.
- Textos nuevos por aprobar: «Privacy policy», «Terms and conditions», «Legal» (nombre accesible del grupo de enlaces del pie) y, bajo la casilla de consentimiento del formulario, «Read our Privacy policy and Terms and conditions.» (abren en otra pestaña para no perder lo escrito). El texto de la casilla no cambió.

## About nuevo (2026-11-23, ronda 4) · APROBADO por la dueña 23-11 (los datos que faltan siguen POR CONFIRMAR)
- Frase de la intro (texto nuevo, armado con la dirección de `clinic.ts` y `home.why.points[0]`): «A general and cosmetic dental office at 1212 S Maryland Pkwy in Las Vegas, with care built around keeping your natural teeth.»
- Títulos y etiquetas nuevos: «Our story», «What we believe», «Where to find us», «Our mission», «Our vision», «What we stand for», «Meet the team», «Experience», «Training», «Language»; frase de la historia «One idea runs through every visit: your teeth should last a lifetime.»; frase del doctor «He is committed to delivering quality care and a comfortable experience for his patients.» (recorte de `home.doctor.text`).
- La misión usa el texto del punto 2 de «Why patients choose»; no es una declaración oficial.
- POR CONFIRMAR (no se dibujan en la página; en `content/about.ts` están en `null`): «How it began» (año de apertura, quién la fundó, primeros pacientes), «Our vision» y más integrantes del equipo (nombre, rol, foto).

## Quinta ronda (23-11-2026) · textos y cambios
- Estado: la dueña aprobó (23-11) los textos nuevos antes «por aprobar», salvo las páginas legales (revisión legal pendiente) y los datos de About que faltan (cómo empezó, visión, más integrantes), que siguen POR CONFIRMAR.
- **Sección estrella (2.ª del inicio), título nuevo: «Everyday dental care for the whole family»** (antes «Dental care for the whole family»; variante propuesta por Frontend 2, APROBADA junto con el resto el 23-11 por la regla de la dueña; si prefiere otra, se cambia `home.services.heading`). El acento sigue en «whole family».
- Servicios de la estrella (de `content/services.ts`, nombre y subtítulo tal cual, sin textos nuevos): Routine Dental Care, Dental Cleaning, Wisdom Tooth Removal, Cosmetic Bonding, Pediatric Dentistry. No repiten los destacados (Braces & Invisalign, Implants, Dentures & bridges, Veneers & crowns, Whitening). Dental Appliances queda fuera porque aún no tiene texto real.
- Formulario rápido (inicio y Contact): sin la frase «call or text» ni el teléfono. Al enviar con datos válidos: «This form is not connected yet, so your request was not sent.» (texto nuevo).
- «No medical history or payment info, please.» vuelve como ayuda fija bajo el mensaje del BookingForm guardado (`home.appointment.messageHint`); hoy ese formulario no se usa.
- Pie: se quitó la franja «Ready for a smile that lasts?» y sus botones. About: sin textos nuevos (solo cambió el diseño de «Our story» y «What we stand for»).

- 2026-11-23 · Aprobados por el Jefe con permiso de la dueña: «Learn more about this service», «Explore our services».

## Beneficios: financiamiento y convenios (25-11-2026) · POR APROBAR
Página `/insurance-financing` (se conserva la URL; el menú dice «Benefits») con 3 apartados: Insurance, Financing, Agreements. Una página por empresa en `/financing/sunbit`, `/cherry`, `/plexpay`, `/icreditworks`. Textos en `src/content/financing.ts`.

**Logos oficiales** (`apps/web/public/benefits/`), descargados el 25-11-2026:
- Sunbit (`sunbit.svg`): https://sunbit.com/wp-content/themes/sunbit/assets/images/logo.svg?v=2 (logo del encabezado del sitio oficial; su página de prensa https://sunbit.com/press/ bloquea descargas automáticas).
- Cherry (`cherry.svg`): https://cdn.prod.website-files.com/681bf1d6f7dea459fe255c59/68252146834983973a92051f_cherry-logo-primary.svg (logo principal de https://withcherry.com).
- PlexPay (`plexpay.png`, 2485×570): https://plexpay.com/assets/logo.png. La empresa real es **PlexPay** (plataforma de financiamiento y pagos para pacientes); `flexpay.com` redirige a `plexpay.com`. «FlexPay» no existe como empresa aparte: confirmar con la dueña que es esta.
- iCreditWorks (`icreditworks.png`, 330×75, es el único tamaño publicado): https://assets.icreditworks.com/public/website/assets/dental/images/iCreditWorks%20Point%20of%20Care%20Lending@3x.png (imagen que usa icreditworks.com). Es pequeño: se ve algo suave en pantallas grandes; pedir el logo en alta a la empresa si se quiere más nítido.
- SAHARA Las Vegas: sin logo. Sus sitios (saharalasvegas.com y stay.saharalasvegas.com) bloquean la descarga (403); el convenio se muestra con el nombre en texto.

**Descripciones (de los sitios oficiales):** Sunbit, «pay-over-time» y el financiamiento lo ofrece Transportation Alliance Bank Inc. dba TAB Bank (Sunbit no es el prestamista); Cherry, planes de pago para pagar con el tiempo; PlexPay, «patient finance and payments platform»; iCreditWorks, «Point of Care Lending» (el único dato oficial que pude leer: su sitio es una app que no se puede leer sin navegador). No se pusieron tasas, plazos, montos ni requisitos.

**POR APROBAR (textos nuevos):** título y texto de «Benefits»; textos de «Financing» (lead, nota de logos, «Learn more»); las líneas de una frase de cada tarjeta (`blurb`); los 4 pasos «How it works at our office» y el aviso «Approval, rates, and terms are set by…»; botones «Visit <empresa>»; «Partner benefit» y «Agreements». Convenios reutiliza el texto y enlace de SAHARA de `content/home.ts` (coverage.outOfTown).
**POR CONFIRMAR con la clínica:** que de verdad trabaja con las 4 empresas y cómo se solicita cada una (hoy: «nuestro equipo te dice cómo aplicar»).

## Ronda 25-11-2026 · servicios, horario, emergencias y Adit (Frontend 2) · POR APROBAR
**Confirmado por la dueña (orden del 25-11):** horario (arriba); emergencias 24 horas; la clínica agenda y cobra en Adit (`https://booking.adit.com/ad197179-9227-4a53-bc36-fadaec746854`, un solo lugar: `clinic.bookingUrl`); la clínica NO ofrece Pediatric Dentistry (se quitó de todo el sitio, y `/services/pediatric-dentistry` ahora da «Page not found»); coronas no es relevante como destacado.
**Textos nuevos POR APROBAR:**
- Emergencias (`clinic.emergency`): «24/7 dental emergencies» · «Dental emergencies are attended any day, at any hour. Please call before you come.» · botón «Call now» + teléfono (APROBADO por la dueña 25-11, diseño y textos; ahora es sección propia en /contact, ya no aviso en pie ni ubicación). No dice que el doctor vive en la clínica (dato interno, no publicado).
- Sección para agendar (`home.appointment`): «Book your appointment» · «Pick a day and time that work for you on our online booking page. Prefer to talk to someone? Call or text (702) 805-8688.» · botón «Book your appointment» (se abre en otra pestaña).
- Nuevo servicio **All-on-4 & All-on-6** (`content/services.ts`, adaptado de Dental Nakeji, sin precios ni promesas): subtítulo, 3 puntos, «What are All-on-4 and All-on-6?» y su párrafo, el texto y los 3 puntos de la tarjeta destacada. El sitio oficial no tiene página de este servicio: POR CONFIRMAR que la clínica lo ofrece tal cual. Usa la figura de implantes (aún no tiene paso propio).
- Destacados, pestañas nuevas: «All-on-4 & All-on-6», «Braces & Invisalign», etc. Orden por costo típico (dueña): All-on-4 & All-on-6, Dental Implants, Invisalign & Braces, Dentures & Bridges, Teeth Whitening. Se quitó Porcelain Veneers & Crowns de los destacados (ahora sale en la estrella).
- Títulos que se cambiaron al quitar «whole family»/pediatría: «Everyday dental care you can count on» (estrella), «Dental services for every smile» (hub), «One office for your dental care» + su texto (About y inicio), «Preventive care planned around each patient.» (reemplaza «Care for patients of all ages.»), «for teens and adults» en ortodoncia.
- Blog: la categoría pasó de «Orthodontics and pediatric dentistry» a «Orthodontics» (texto nuevo) y se borró el artículo «Your child's first dental visit».
- Páginas legales: se quitaron las menciones al «formulario» (la cita se agenda en Adit); revisar con el abogado cómo describir Adit y el consentimiento de mensajes. El apartado «Children» (el sitio es para adultos) se dejó tal cual: es aviso legal, no un servicio.
**Dudas para la dueña:** ¿la insignia «Most requested» de la tarjeta destacada sigue valiendo ahora que la primera pestaña es All-on-4 & All-on-6? ¿«whole family» (inicio/hub) debe volver o se queda fuera?

## Ronda 26-11-2026 · Español (POR APROBAR)
Todo el español del sitio (content/*.ts, blog.es.json, legales) es traducción nueva, de tú, sin revisar por la clínica. Las páginas legales en español además necesitan revisión legal. Las 3 reseñas de pacientes se muestran en su inglés original en /es/.

## Preguntas frecuentes (26-11-2026, B3) · POR APROBAR
Textos nuevos en `apps/web/src/content/faq.ts` (EN y ES): 12 preguntas en 5 temas (citas, servicios, pagos, seguros y convenios, emergencias). Usan solo horario, teléfono, Adit, financieras, SAHARA, 24/7 y dirección ya confirmados. POR CONFIRMAR (no escritos): plazo de cancelación, tolerancia de llegada tarde, depósito, edad mínima, garantías, formas de pago, número de WhatsApp. La respuesta de convenios menciona la página Convenios (la crea B2).

## B2 · 26-11 · Textos nuevos POR APROBAR
- content/benefitsHub.ts: hub de Beneficios (título, entrada, 3 tarjetas, ayuda) y entrada de Convenios, EN y ES.
- content/servicesHub.ts: filtros «¿Qué necesitas hoy?» y qué servicios resalta cada uno (por confirmar con la clínica).
- content/home.ts: «View all benefits» / «Ver todos los beneficios».

## Ronda 26-11-2026 · B1 inicio, pie, formulario y Contact (Frontend 1) · POR APROBAR
- Titular: «Emergency or smile makeover, we're here.» / «¿Emergencia o cambio de sonrisa? Aquí estamos.»; pastilla «Las Vegas · Emergencies 24/7»; texto «General, cosmetic and orthodontic care with Dr. Christian Hahn. Call any hour for a dental emergency, or book your visit online.»
- Sección estrella «Your visit, one clear step at a time»: You call or book / We evaluate / You get a clear plan / We treat (textos en `content/home.ts`, `visit`). «Dr. Christian Hahn and the team look at your teeth and listen to what you need» y «go over insurance, financing and our agreements» son redacción nueva.
- Convenios del inicio: «Agreements for our patients», «Beyond insurance, we team up with partners that help our patients.», «Visiting from out of town».
- Formulario corto (`content/form.ts`): «Request your visit», aviso «This form does not save or send your details», errores y panel de gracias. Días ofrecidos: martes a sábado (del horario).
- Pie: «24/7 dental emergencies» en una línea con el teléfono; columnas Benefits (Insurance, Financing, Agreements), Clinic (About, FAQ, Blog, Contact), Legal.

## About rehecha (26-11-2026, B3 r2) · POR APROBAR
Textos nuevos en `apps/web/src/content/about.ts` (EN y ES): encabezado corto, «lo que creemos» y valores (tomados de los aprobados del inicio), cierre «Ready for your visit? / ¿Lista tu visita?» con botón a cita. POR CONFIRMAR (no se muestran): cómo y cuándo empezó la clínica, misión y visión, más integrantes y fotos.

## Ronda 26-11-2026 · B1 r3 (Frontend 1) · POR APROBAR
- Reemplaza los textos del formulario de arriba. Sección «Book your visit» / «Reserva tu visita» (`content/bookVisit.ts`): «On our online booking page you choose your service and a time that works for you, and you get a confirmation. Prefer to talk to someone? Call or text us.», «Dental emergency? Call us any day, at any hour.», puntos Hours / Insurance («Our providers are affiliated with most private dental insurance.», texto del sitio oficial) / Financing («Payment options with Sunbit, Cherry, PlexPay and iCreditWorks.»), botón «Book your appointment». «You get a confirmation» depende de que Adit confirme: POR CONFIRMAR.
- Emergencias (`clinic.emergency`): «What counts as an emergency» + «Severe tooth pain», «A broken or knocked-out tooth», «Swelling in the gums or face»; «Call us any time». ES en `content/clinic.ts`.

## About · ronda 3 (26-11-2026) · textos nuevos, POR APROBAR (content/about.ts)
- Titular: «Your teeth should last a lifetime.» / «Tus dientes deben durar toda la vida.» (frase ya aprobada del inicio y del pie).
- Datos de la fila (salen de `clinic.ts` y `financing.ts`, no se escriben a mano): «24/7 · dental emergencies, any day, any hour» / «emergencias dentales, cualquier día, a cualquier hora»; «Las Vegas · 1212 S Maryland Pkwy, NV»; «{n} · dental services in one office» / «servicios dentales en un solo consultorio»; «{n} · financing partners, and we go over your insurance with you» / «aliados de financiamiento, y revisamos tu seguro contigo».
- Formación del Dr. Hahn abreviada a «UNLV» (antes «University of Nevada, Las Vegas»).
- «What we believe» / «Lo que creemos» pasa a frase grande (mismo texto de antes). Textos de valores y cierre sin cambios.
- Se quitó la tarjeta «Where to find us» (la dirección va en la fila de datos). El teléfono del cierre usa el texto del encabezado («Call or text …»).
- POR CONFIRMAR (no se muestra): historia/año de la clínica, misión y visión, más integrantes, aseguradoras aceptadas.

- Dental Appliances (hub de servicios): la clínica no publica descripción; línea provisional «Ask our team about this service...» POR CONFIRMAR (content/servicesHub.ts).

## C1 · 26-11-2026 · Contenido de servicios y blog (Frontend 1) · POR APROBAR
- Servicios (`content/services.ts`, EN y ES): cada «Acerca del tratamiento» suma 1-2 frases generales (para quién, qué se revisa primero, cuidados posteriores) en rutina, dentaduras y puentes, limpieza, muelas del juicio, carillas y coronas, bonding, All-on-4/6, implantes y blanqueamiento. «Invisalign y brackets» ya tiene su texto (cómo funciona la ortodoncia, adaptado de Nakeji sin datos propios) y un tercer punto destacado. Sin precios, tiempos ni promesas.
- «Dental Appliances / Aparatos dentales» sigue sin texto: la clínica no publica descripción (POR CONFIRMAR).
- Blog: 2 artículos nuevos en EN y ES (`blog.en.json`, `blog.es.json`): «All-on-4 implants: a fixed arch on four implants» y «All-on-6 implants: how it differs from All-on-4», adaptados de Nakeji sin su marca, ciudad ni precios; fuente FDA. Sus direcciones en español están en `config/routes.ts` (`blogSlugs`). La página All-on-4 y All-on-6 ahora enlaza a «All-on-4 implants».
- No se pasaron los artículos de Nakeji sobre odontopediatría, periodoncia y endodoncia: Luminous no ofrece esos servicios en su sitio.
- No verificado: no se pudo leer luminousdentallv.com (las páginas probadas dieron 404); el texto sale de lo ya revisado en el sitio y del de Nakeji. Todo necesita revisión de la clínica.
