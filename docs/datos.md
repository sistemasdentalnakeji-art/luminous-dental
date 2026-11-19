# Datos · Luminous Dental (Etapa 1)

Fecha: 17-11-2026 · Autor: Backend 1 · Fuente única: https://luminousdentallv.com y sus páginas internas (leídas con WebFetch el 17-11-2026; son resúmenes automáticos, así que el texto exacto se confirma al copiarlo a `content/`). Sitio solo en inglés.
Marcas: **EXISTE** (hay dato real), **PARCIAL**, **FALTA** (no hay dato real en la página oficial), **POR CONFIRMAR** (lo decide o confirma la clínica o Jadro).

## 1. Qué datos maneja el negocio

| Dato | De dónde sale hoy | Estado | Notas |
|---|---|---|---|
| Clínica: nombre, dirección, teléfono, correo, redes | https://luminousdentallv.com/ y https://luminousdentallv.com/contact-us/ | EXISTE | Ya está en `content/clinic.ts`. Dato nuevo: https://luminousdentallv.com/patients-resources/ muestra **otro teléfono, (725) 291-5588**, distinto al (702) 805-8688. POR CONFIRMAR cuál es. |
| Horario | Inicio y /patients-resources/: martes a sábado 8 a. m. a 5 p. m., domingo y lunes cerrado. /contact-us/: lunes 8-19, martes a viernes 8-18, sábado 8-13. Google Maps: ver `clinic.ts` | PARCIAL, **se contradice en 3 lugares** | Corrige una nota de `docs/decisiones.md`, que decía que el horario no aparece en la página oficial: sí aparece, pero con versiones distintas. Sigue POR CONFIRMAR; no se publica. |
| Calificación de Google | Inicio: 4.3 de 5, 17 reseñas | EXISTE | Está en `clinic.ts` con fecha. Cambia con el tiempo. |
| Servicios | Menú y https://luminousdentallv.com/services/ ; páginas: /dentures-bridges/, /routine-dental-care/, /porcelain-veneers-crowns/, /cosmetic-bonding/, /dental-implants/, /teeth-whitening/, /general-dentistry/, /pediatric-dentistry/, /wisdom-removal/ | PARCIAL | Hay 11 nombres en `clinic.ts`. Solo hay un párrafo corto por servicio; sin precios ni detalle del procedimiento. Los enlaces de Orthodontics, Dental Appliances, Dental Cleaning y todo «Treatments» del pie apuntan a la página de blanqueamiento (/teeth-whitening-2, -3, -4): están mal. Invisalign & Braces y Restorative Services solo están en el pie. |
| Doctor y equipo | https://luminousdentallv.com/our-team/ y /about-us/ | PARCIAL | Solo el Dr. Christian Hahn (dentista general, 4 años, UNLV, inglés). **Su foto es un gris vacío.** No hay otro personal. En las reseñas aparecen nombres de pila (Joshua, Anna, Dennis, Yessenia Zamora); eso no es una lista de equipo y no se usa como tal. |
| Reseñas | Inicio: 8 con texto, 5 estrellas, de las 17 de Google | PARCIAL | Dos están en español; una dice «Alka Redkar» pero va firmada «Ashok Redkar». Con el sitio solo en inglés, las de español se usan solo traducidas y marcadas. Son nombres de personas reales: se confirma permiso antes de mostrarlas completas (POR CONFIRMAR). |
| Antes y después | https://luminousdentallv.com/before-after/ (+ /dental-crowns-before-after/, /dentures-before-after/, /implants-before-after/, /veeneers-before-after/, /bridges-before-after/, /smile-makeover/) | **FALTA** | Solo hay 6 títulos (Bridges, Invisalign, Veneers, Dentures, Crowns, Implants) con imágenes grises y texto de relleno («Lorem ipsum»). No se inventa ni se usa nada. Hacen falta fotos reales **con permiso escrito del paciente** (POR CONFIRMAR con la clínica). |
| Seguros | https://luminousdentallv.com/insurance-financing/ | EXISTE (lista) | 15 aseguradoras nombradas (Aetna, Blue Cross and Blue Shield, Cigna, Delta Dental, GEHA, Guardian, Humana, MetLife, United Healthcare, etc.). Hay faltas («United Cncordia») que se corrigen al copiar. No dice qué planes cubre ni si está «en red»: POR CONFIRMAR. La frase «afiliados a la mayoría de seguros privados» no se publica sin confirmar. |
| Financiamiento y formas de pago | misma página | **FALTA** | Solo una frase general. Sin socios, plazos ni precios. POR CONFIRMAR con la clínica. |
| Blog | https://luminousdentallv.com/blog-grid/ ; 4 entradas, todas del 1-05-2026: /your-trusted-family-dentist-in-las-vegas-care-for-all-ages-on-maryland-pkwy/, /dental-implants-vs-bridges-which-solution-is-best-for-your-missing-teeth-in-las-vegas/, /exploring-the-vibrant-local-culture-of-las-vegas/, /why-luminous-dental-is-your-best-choice-for-dental-care-in-las-vegas/ | EXISTE (4) | Hay que leer cada una antes de reusar (calidad y afirmaciones médicas, no verificado). La de «local culture» parece de relleno para buscadores. La página del blog tiene texto de relleno en la introducción. |
| Citas | https://luminousdentallv.com/contact-us/ (los botones «Get Appointment» llevan ahí) | PARCIAL | En la lectura no se vieron campos del formulario; solo la casilla de consentimiento («I consent to my personal data being collected and stored as per the Privacy Policy»), cuyo enlace va a `#`. No hay sistema de citas. Los campos del formulario nuevo salen de `packages/types/src/appointment.ts`. |
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
| **1. Vista previa** | El formulario no envía nada; pide llamar al (702) 805-8688 | Nada | **Hecha** (`mode: 'preview'` en `config/booking.ts`) |
| **2. Aviso por correo** | Una función en el servidor valida la solicitud (`AppointmentRequest`), revisa el campo trampa y el límite por IP, y manda un correo a la clínica | Nada: llega el correo y listo | POR CONFIRMAR (servicio de correo y quién recibe) |
| **3. Guardar y dar seguimiento** | La solicitud se guarda con estado `received` y pasa por `contacted`, `scheduled` o `cancelled`. Nacen `apps/api` y `packages/db` | Solo los campos de `AppointmentRequest` + `id`, `status`, fechas | POR CONFIRMAR; se llama al DBA de sitios (manual, sección 26) |
| **4. Automatización** | La solicitud avisa a la herramienta elegida (un aviso automático, «webhook») para llamar, confirmar o agendar | Lo mismo que la fase 3 | POR CONFIRMAR con Jadro: herramienta y cuenta |
| **5. Disponibilidad real** (opcional) | El paciente elige un horario libre | Lo mismo + hora elegida | Depende de la herramienta y del horario confirmado |

Contrato para todas las fases: `packages/types/src/appointment.ts`. Un solo formato sirve de la fase 1 a la 5. Errores que el formulario debe saber manejar: datos mal escritos (indicando el campo), demasiados envíos y falla del servidor, con mensajes sencillos y sin detalles internos.

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
