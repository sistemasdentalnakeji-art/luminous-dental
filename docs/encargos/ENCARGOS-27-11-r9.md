# Plan · Ronda 9 · Correcciones de la dueña tras ver la r8c (27-11-2026)

Estado: rondas 8, 8b y 8c hechas, typecheck y build en verde, sin commit. La QA conjunta se detuvo otra vez (sin cambios de código); se relanza al cerrar esta ronda.

Reglas comunes: iguales a `ENCARGOS-26-11-r4.md`, `r7.md` y `r8.md` (frase literal en cada punto, EN y ES, sin librerías, movimiento reducido y pausa, typecheck + build + Playwright msedge 375/768/1440 EN/ES, capturas `*-27nov-r9.png`, entrada en `docs/bitacora.md`, sin commit, cada agente solo sus archivos, puerto propio y lo cierra). Ponytail apagado (etapa 4). Las tarjetas de reseñas de Google no se tocan. Sin tarjetas con color de fondo (criterio r7). Dicta por voz: «Sara» = SAHARA; «terminal» = la ventana tipo navegador del carrusel de reseñas; «header» en el punto del FAQ = el **pie**.
`styles/home-lines.css` lo tocan D1, D2 y F1: cada uno **solo su bloque** y con ediciones puntuales (Edit), nunca reescribir el archivo.

**Lo que le gustó (no se cambia):** Contact («10 de 10»), la estrella dorada de destacados, la forma actual de las estrellitas del fondo, el contenido de Beneficios (seguros, financiamiento y SAHARA).

## D2 `ld-disenador-uiux-2` · Destacados, pausa de reseñas y estrellas
Archivos: `components/{FeaturedServices,Reviews,Backdrop}.tsx`, `styles/reviews.css`, `styles/site.css` (solo la regla `.dots`), bloque de destacados de `home-lines.css`.
1. **Destacados.** «Me gustó lo de la estrellita en dorado, eso se va a dejar y nomás se va a iluminar el servicio que está ahí. Y el más requerido… el letrero de más requerido no me gusta cómo está ahí. Impleméntalo en otra parte.» → Se queda la estrella dorada; solo se ilumina el servicio elegido. El letrero «Most requested / Los más solicitados» va en otro lugar (a criterio del diseño).
2. **Pausa de reseñas.** «El botón de pausa de la terminal ponlo mejor abajo… al lado derecho igual, no arriba como en el navegador. Pero igual dentro de la terminal.» → Dentro de la ventana, esquina inferior derecha (no en la barra de arriba).
3. **Estrellas del fondo.** «Las estrellas se incrementaron, pero yo le había dicho que… en la parte del medio no estuvieran muchas estrellas. Checa ahí qué está mal.» Lo notó en la parte de **servicios** → Revisar por qué en el centro se ven más (posibles causas: estrellitas agrandadas en la r8c2, la capa `.dots` con su máscara medida contra la página completa en páginas largas, etc.). Centro casi vacío en TODAS las páginas, sobre todo servicios.
4. **Brillo.** «Las estrellas sí me gustaron ahora, pero que estén brillando, una que otra random, que esté en movimiento.» → Algunas estrellitas al azar destellan de forma visible (no todas a la vez). Se quietan con movimiento reducido y con la pausa.

## D1 `ld-disenador-uiux-1` · «Reserva tu visita» del inicio y Contact
Archivos: `components/BookVisit.tsx`, `content/bookVisit.ts`, bloque de BookVisit en `home-lines.css`/`home-b1.css`, `pages/Contact.tsx`, `styles/contact-lines.css`, `public/images/` (foto nueva), `docs/fotos-servicios.md` o `docs/fotos-blog.md` (licencia).
1. **Reserva tu visita (inicio).** «No me gustó como está ahora, se me hace muy sencillo y muy vacío… que tampoco tenga las líneas divisoras, eso no me gustó ya. Como va a ser una sección semi vacía, al criterio de los de UI y UX, que quede súper bien.» → Rediseño completo, sin líneas divisoras, sin campos (r8b), sin horarios/seguros/financiamiento (r8). Botón a la agenda en línea (Adit). Usa el método que hizo funcionar Contact.
2. **Contact · moneda.** «En la sección de contacto sí vamos a poner la moneda donde está el mapa. Vamos a ver cómo queda.» → Regresar la moneda del mapa en Contact.
3. **Contact · foto 24/7.** «En emergencias dentales 24/7, en la foto, pon una mejor, referente a emergencias, pero del ramo dental.» → Foto de emergencia dental (libre uso con licencia registrada, sin pacientes identificables ni marcas). El resto de Contact no cambia.

## F1 `ld-desarrollador-web` · SAHARA del inicio, hub de Beneficios y Convenios
Archivos: `components/{SaharaFeature,BenefitsHeader,InsurancePlans}.tsx`, `pages/{Benefits,Agreements}.tsx`, `styles/{benefits-r2,benefits,insurance}.css`, bloque de SAHARA en `home-lines.css`.
1. **SAHARA (inicio).** «Quítale un poco el contorno de blanco. Siento que se pierde un poquito el dorado, o dale un poquito más de énfasis al dorado.» → Contorno blanco más suave y el dorado del logo más presente.
2. **Hub de Beneficios.** «El contenido me gusta, pero visualmente se ve feo… estamos usando solo líneas divisoras, ve la forma de que no se vea raro. Hay que acomodarlo mejor.» → Mismo contenido (seguros, financiamiento, SAHARA), mejor composición; sin tarjetas con color.
3. **Logos en Beneficios.** «Los loguitos de los seguros… se pueden hacer un poquito más grandes, para que se aprecie mejor el logo.» → Más grandes en el hub de Beneficios (y donde aparezcan los mismos logos de seguros en las páginas de Beneficios).
4. **Convenios.** «Lo de "tu cobertura explicada, formas de pago, beneficios de convenio", eso no me gusta. Que sea nomás 2 secciones… y nomás SAHARA centrado. Ahorita no hay mucho que mostrar… que sea bonito, sin que se vea tan pelón el contenido. Y quitar lo de abajo, "listo para el siguiente paso", eso quítalo.» → Héroe de un solo contenido (como el hub, `BenefitsHeader solo`) + una sola sección con SAHARA centrado y bien presentado. Sin el bloque final «Ready for the next step / Listo para el siguiente paso».

## F2 `ld-frontend-2` · Pie y hub de Servicios
Archivos: `components/Layout.tsx`, `styles/footer-city.css`, `pages/Services.tsx`, `styles/{services-lines,services-hub}.css`, contenido del hub.
1. **FAQ.** «El FAQ no me lo moviste… sigue abajo. Yo te dije que lo movieras a legal.» → FAQ dentro de la columna Legal del pie; fuera de la franja final.
2. **Idioma del pie.** «Quítale abajo… el cambiar de idioma, ahí tampoco lo quiero, solo arriba.» → Sin selector de idioma en el pie (sigue en el encabezado).
3. **Hub de Servicios.** «Encontrar una forma mejor de acomodarlos, porque siento que la línea se ve raro, el logo [ícono], también el botón… se ve un poquito raro todavía.» → Rediseñar la presentación de cada servicio; se conserva la división por categoría en cuadrícula pareja (r8c), sin «¿Qué necesitas hoy?» ni filtros.

## Al cerrar
Typecheck + build del Jefe → QA conjunta (2 agentes: funcional/visual contra r7–r9 y accesibilidad/contraste).

## Pendientes de la dueña o la clínica (no bloquean)
Los de la r7 · precio de consulta en el FAQ (preguntar a la clínica) · fotos propias de tratamientos.
