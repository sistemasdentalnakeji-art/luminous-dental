# Plan · Ronda 8 · Cierre de la página (27-11-2026)

Estado: ronda 7 hecha (inicio, About, Servicios, Contact y Beneficios «sin tarjetas, con líneas»), typecheck y build en verde, sin commit. La QA de la ronda 7 se detuvo: se hace **una sola QA conjunta** al final de esta ronda (orden de la dueña: «para los testers, que se junten las tareas»).

La dueña: «de una vez vamos a terminar. Quiero que termine la página de una vez». Dicta por voz: «terminal» = **pie (footer)**; «la queji» = Dental Nakeji.

Reglas comunes: iguales a `ENCARGOS-26-11-r4.md` y `r7.md` (frase literal en cada punto, EN y ES, sin librerías, movimiento reducido y pausa, typecheck + build + Playwright msedge 375/768/1440 EN/ES, capturas `*-27nov-r8.png`, entrada en `docs/bitacora.md`, sin commit, cada agente solo sus archivos, puerto propio y lo cierra). Ponytail apagado (etapa 4). Las tarjetas de reseñas de Google no se tocan.

## F1 `ld-desarrollador-web` · Inicio y Contact
Archivos: `pages/Home.tsx`, `pages/Contact.tsx`, `components/{BookVisit,Appointment,InsurancePlans,Agreements,SaharaFeature,Emergency,ContactLocation,LocationMap}.tsx`, `content/{home,bookVisitText,locationText}.ts` (o donde viva ese texto), `styles/{home-lines,contact-lines}.css`.
1. **Formulario del inicio.** «Del formulario en el homepage, donde pusiste horarios, seguros y financiamiento, eso quítalo… no es una sección correcta para esa información, ya que se repite… quiero un formulario corto… el código y el contenido se los dejo a su consideración.» → Quitar horarios/seguros/financiamiento de esa sección; formulario corto (nombre, teléfono, correo y como mucho un campo más). Reusar `components/Appointment.tsx` (contacto rápido provisional que valida y NO envía; muestra el aviso existente de «no conectado, llama»). No prometer un contacto que no ocurre. Puede quedar un enlace secundario a la agenda en línea (Adit).
2. **Seguros del inicio.** «Hazlos un poquito más grandes, siento que están muy chiquitos. Y se pierden algunos con el fondo.» → Logos más grandes; los que se pierden (AlwaysCare, Ameritas, BeneSys, Dental Health Services, Guardian, HealthComp, etc.) deben leerse SIN pintarlos de blanco, sin recolorear y sin tarjeta con color (reglas de la dueña de la ronda 7): p. ej. un contorno/halo claro muy fino alrededor del dibujo del logo (`filter: drop-shadow`), decidido logo por logo. Solo en el inicio.
3. **Convenios del inicio.** «El que dice "además de los seguros, nos asociamos con aliados que sirven a los pacientes", eso pásalo abajo, donde dice "¿vienes de fuera de la ciudad?", ahí júntalo. Que nomás esté el título ahí afuera.» → Afuera solo el título; ese texto se une al bloque de «fuera de la ciudad».
4. **SAHARA del inicio.** «Dice "Convenio con SAHARA", eso quítalo, no me gusta. Nomás deja el puro logo.» (Solo inicio; la página de Convenios no cambia.)
5. **Contact.** «Emergencias 24/7 se va a quedar como sección héroe del contacto. Y el recibir cita lo vas a combinar con la dirección, teléfono, correo y horario… que sea solo una sección. Y la moneda hay que quitarla» (aclaró: la moneda del mapa, solo en Contact). → Héroe = Emergencias 24/7; debajo una sola sección: cita + dirección, teléfono, correo y horario; sin la moneda del mapa en Contact (en el inicio se queda).

## F2 `ld-frontend-2` · Encabezado, pie, héroe de Beneficios y hub de Servicios
Archivos: `components/{Header,Layout,NeonLogo,SocialLinks,LanguageSwitch,BenefitsHeader}.tsx`, `pages/{Services,Benefits}.tsx`, `styles/{site,footer-city,services-hub,services-lines,benefits-r2}.css`, `content/` de header/footer/servicios/beneficios.
1. **Encabezado.** «Las redes sociales de arriba, quítamelas. También el teléfono. Nomás deja el cambio de idioma. Y junta el cambio de idioma pegado al botón de solicitar appointment.» (También en el panel del celular.)
2. **Pie: pausa.** «Botón de pausa… ese mételo dentro de la terminal.» → El botón de pausa de la línea final pasa dentro del cuerpo del pie, como botón claro. La moneda flotante (pausa/subir) se queda.
3. **Pie: logo.** «El logo de Luminous Dental de la terminal va a cambiar por el del que se ilumina.» → El letrero de neón del pie se cambia por el logo con la estrella que se ilumina (como el del encabezado / `public/logo-star.png`, diseño de la dueña `Desktop\Luminous\luminous-web`).
4. **Héroe de Beneficios (hub).** «Donde dice "tu cobertura explicada, formas de pago, beneficios de convenios", eso tampoco me gustó, quítalo, que se vuelva una sección héroe nomás de un solo contenido… lo dejo a tu consideración.»
5. **Hub de Servicios.** «Vamos a quitar el "¿qué necesitas hoy?" y el "explorar por categoría", y vamos a pensar solo una sección… que no esté dividiendo, sino en una. Te lo dejo a tu consideración.»

## D2 `ld-disenador-uiux-2` · Fondo
«Para el fondo en general, vamos a evitar poner muchas estrellas o puntitos blancos porque siento que se pierde. Vamos a ver esa corrección primero.» → Menos estrellas/puntos en la parte media del fondo de todo el sitio (`components/Backdrop.tsx`, `components/Stars.tsx` y su CSS). Primero esto; las tarjetas de fondo en servicios quedan en espera de que la dueña lo vea.

## D1 `ld-disenador-uiux-1` · Fotos del blog
«Ibas a poner más imágenes relacionadas de Luminous Dental. Si no, busca sus redes sociales originales y fotos que podamos usar referente al blog. Si no, imágenes de libre uso. El chiste es que se llenen las imágenes y no me las dejes vacías.» → Cada artículo y tarjeta del blog con foto relacionada. Orden: fotos de luminousdentallv.com / redes oficiales de Luminous (sin pacientes identificables) → bancos de libre uso (Unsplash, Pexels, Wikimedia con licencia libre). Fuente y licencia de cada foto en `docs/fotos-blog.md`. WebP con ancho/alto. Archivos: contenido del blog (`content/blog*.json` o donde viva), `public/images/blog/`.

## FAQ
La dueña recuerda que en Dental Nakeji la consulta tiene precio y aquí «va a ser diferente». Revisado: el FAQ de Luminous no menciona precio de consulta. No se inventa: se pregunta a la clínica (pendiente).

## QA conjunta (al final)
2 agentes: (1) funcional y visual contra las frases de la r7 y la r8; (2) accesibilidad y contraste. 375/768/1440, EN/ES.

## Ronda 8b (27-11, correcciones de la dueña tras ver la r8)
QA conjunta detenida otra vez; se relanza al cerrar esto.
1. **Formulario (F1).** «El formulario está mal… no es un formulario en sí, es sección para llevar a un formulario, no ocupo datos, quita esa cosa.» → Sin campos. Sección bonita con título, texto y botón a la agenda en línea (Adit). Se sigue sin horarios/seguros/financiamiento.
2. **Seguros (F1).** «Me gustó cómo le pusiste un borde blanco a algunos logos. Hazlo en todos y también modifícalo de igual manera en todos los planes… en todas las aseguranzas.» → Contorno claro en TODOS los logos del inicio, y el mismo tratamiento (logo a color en PNG sin fondo + contorno, sin placa blanca) en la página de Seguros y donde más aparezcan logos de aseguradoras.
3. **«Most requested» (D2).** «No me gusta cómo se ve. Invéntate algo ingenioso para que se vea bonito… un orden diferente, algo, lo que se te ocurra.»
4. **Pausa de reseñas (D2).** «Sección de Google… abajo de la terminal hay un botón de pausa. Ese botón yo te dije que lo metieras dentro de la terminal.» → «Terminal» aquí = el carrusel de reseñas de Google. El botón de pausa de las reseñas va dentro del carrusel. Las tarjetas no se tocan.

## Ronda 8c (27-11, más correcciones de la dueña)
1. **Pie (F2).** «En el footer pusiste el botón de reservar appointment, quítalo. El de emergencia 24/7, nomás quítale el número telefónico; deja el puro telefonito emergencia 24/7. El botón de pausa me gustaba como que fuera abajo. La línea divisora, hazla. Quítalo de "individual results may vary"… quítalos y ponlos en legal… y abajo, donde está FAQ, pones lo de pausa, pero como texto, no como botón.» → Sin botón de cita en el pie; botón 24/7 solo con ícono de teléfono y texto; línea divisora arriba de la franja final; «Individual results may vary» sube a la columna Legal; en la franja final: ©, FAQ y «Pausar animaciones» como texto (no botón, sigue funcionando y accesible).
2. **Hub de Servicios (F2).** «Me quitaste la categoría. Me gustaría como por cuadrícula… que esté dividido por igual por servicios. Eso me gustaba.» → Regresar la división por categoría (General, Cosmética, Ortodoncia…) en forma de cuadrícula pareja; sin «¿Qué necesitas hoy?» ni filtros.
3. **Fotos en cada servicio (F2).** «Para los servicios individuales faltaron las imágenes… como Dental Nakeji, imágenes para la sección hero, al menos.» → Foto en el hero de cada servicio (fuentes: las de Nakeji ya usadas con permiso de la dueña, fotos de Luminous, libre uso con licencia registrada en docs/fotos-blog.md o docs/fotos-servicios.md).
4. **Logos (F1, después de la 8b).** Financiamiento sin fondo blanco, con contorno blanco; en el hub de Beneficios logos de aseguradoras y financieras más grandes; más grandes también en la página de Seguros y en la de Financiamiento; contorno blanco a SAHARA.
5. **Contact (D1, rehacer).** «La página de contacto se me hace muy fea… que rehagan toda esa parte. No tiene algo, le falta algo, está muy mal. Las imágenes me gustaron.» → Rehacer Contact con otro agente y otro método. Se mantiene: Emergencias 24/7 como héroe, una sola sección con la cita (botón a la agenda, sin campos) + dirección, teléfono, correo y horario, sin la moneda.
6. **Estrellas del fondo (D2).** «Las estrellas que quedaron ya me gustó cómo quedó, pero que tengan forma de estrellitas, porque tienen forma circular y no me gusta.»
