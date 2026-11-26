# Decisiones · Luminous Dental

## Respuestas de la etapa 0 (17-11-2026)
| Tema | Decisión | Quién |
|---|---|---|
| Información | Toda sale de la página oficial https://luminousdentallv.com (revisada el 17-11-2026) | Dueño |
| Idioma | Solo inglés | Dueño |
| Citas | En línea, preparadas para crecer a una automatización → se dejan `apps/api`, `packages/db` y el formato `AppointmentRequest` en `packages/types` | Dueño |
| Tienda, app móvil, app de escritorio | Después (no se crea nada) | Dueño: «lo demás déjalo así» |
| Alcance de hoy | Solo los cimientos (etapa 0); sin diseño | Dueño |
| Base de componentes | Tailwind v4 (sin `motion`, `cn()` ni `components.json`: se quitaron el 19-11-2026 por no usarse) | Manual |
| Gestor de paquetes | **npm workspaces** en vez de pnpm + turbo: pnpm no está instalado en esta PC y no se instala nada sin permiso. Con una sola app no hace falta turbo. Se cambia si Jadro lo pide | Jefe |
| Nivel de seguridad | POR CONFIRMAR (con citas y base de datos sería nivel C; lo confirma el dueño en el Sí 1) | — |
| Publicación | Vercel + Cloudflare (manual). Nada se publica sin el sí de Jadro. La página lleva `noindex` hasta entonces | Manual |

## POR CONFIRMAR
1. Horario de atención: se contradice en 3 lugares (corregido el 17-11-2026: sí aparece en la página oficial). Barra de arriba: martes a sábado 8 a. m. a 5 p. m., domingo y lunes cerrado. /contact-us/: lunes 8-19, martes a viernes 8-18, sábado 8-13. Google Maps: otro distinto. Lo confirma la clínica.
2. Herramienta de automatización para las citas.
3. Logo en buena calidad y colores (se usan los de la página oficial en la etapa 1).
4. Dominio y hosting: los maneja Jadro.
5. Teléfono: /patients-resources/ muestra (725) 291-5588, distinto al (702) 805-8688 del resto del sitio.

## Notas de la página oficial
- Tiene faltas de ortografía («orthodontistis», «tecniques», «comprenhensive», «straigtening») y contadores sin número («k», «%», «+»). No se copian tal cual.
- El borrador «luminous-smile-pulida» de la bóveda (landing de cambio de sonrisa) se puede reusar en la etapa 1 como página o sección.

## Actualización 17-11-2026 (2)
1. **Horario:** Google Maps (17-11-2026) dice lunes cerrado, martes 4 a 8 p.m., miércoles a domingo 24 horas; y una publicación de la clínica del 17-07-2026 dice emergencias 24/7 llamando antes. Se ve raro, así que se guardó en `content/clinic.ts` pero **no se muestra** en la página hasta que la clínica lo confirme.
2. **Formulario de citas:** el dueño no tiene todavía la herramienta que recibe las solicitudes. Se hizo el formulario con los campos del oficial, en modo «vista previa»: no envía ni guarda nada y pide llamar al teléfono. Para conectarlo se cambia `mode` a `'api'` y se pone la dirección en `config/booking.ts`.

## Sí 1 del dueño (17-11-2026)
1. Páginas: Home, About (con el Dr. Hahn), Services (con Orthodontics y Pediatric visibles), Insurance & Financing, Contact, Privacy Policy. Before & After y Blog entran cuando haya fotos y artículos reales.
2. Titular propuesto: «Your teeth should last a lifetime» (frase de la clínica). Botón único: «Request an appointment».
3. Horario y calificación de Google no se muestran hasta que la clínica los confirme.
4. Citas: crecen por fases (vista previa → aviso por correo → guardar → automatización); nivel de seguridad C por fases (decide el jefe, §36.4).

## Actualización 2026-11-18 — Sí 2, ronda de cambios 1 (dueña)
- Base: Estilo B «El anillo».
- Colores, letra, fondo de noche con estrellas y logo real que se ilumina: del diseño propio de la dueña (`Desktop\Luminous\luminous-web`, DESIGN.md). Newsreader + Figtree, azul noche + oro de la estrella + azul cielo.
- Se toma de A la franja de dientes bajo el hero; de C la sección «Why patients choose» y la lista de servicios en escalera.
- Decisión de la dueña: Luminous y Dental Nakeji son del mismo dueño y pueden parecerse en colores/letra, cada una con su sello. Los DATOS siguen sin mezclarse.
- Logo real disponible (logo.png + logo-star.png). Fotos antes/después de esa carpeta: permiso POR CONFIRMAR, no se usan aún.
- Encargo: `docs/lienzo/MEZCLA-1.md`. Entrega: Estilo-B2.

## Actualización 2026-11-18 — Ronda de cambios 2 (dueña)
- Franja de dientes: fuera del inicio; la idea se guarda para otra pieza.
- Fondo: malla animada (21st.dev, ya adaptada en `Desktop\Luminous\luminous-web\src\components\ui\blue-meshy-background.tsx`) + estrellas de `NightSky.tsx`, ligeros.
- Doctor: la web oficial solo muestra al Dr. Christian Hahn; su foto va una sola vez. Si es dueño o no: POR CONFIRMAR (la dueña dice que Luminous es del mismo dueño que Dental Nakeji).
- Reseñas: rehacer como en el diseño de la dueña (cita grande + 2 de apoyo).
- Skill «Anatomy» (github.com/wheresryan22/anatomy): pedida por la dueña; no instalada, espera su sí.
- Encargo: `docs/lienzo/MEZCLA-2.md` → Estilo-B3.
- Actualización 2026-11-18: skill «Anatomy» instalada con el sí de la dueña (git clone en ~/.claude/skills/anatomy, versión 1482e84). Revisada: solo se conecta a internet si se pide publicar en su galería; los dibujos de Luminous NO se publican ahí.

## Actualización 2026-11-18 (tarde) — Luminous sigue la estructura de Dental Nakeji (dueña)
1. Mismo dueño que Dental Nakeji: Luminous **reusa la estructura y el código** del sitio de Nakeji (`Desktop\Departamentos\IT\Paginas Web\Codigo - Pag`), con el toque propio de Luminous: menú, pie, servicios compartidos, rutas, sección de reseñas de Google (ventana y fichas), formulario, blog, términos y condiciones, aviso de privacidad. Los **datos** de cada clínica siguen sin mezclarse (Luminous: solo inglés, datos de su página oficial).
2. Foco ahora: **dejar bien el inicio (Home)**. Lo demás después, recortando lo que no aplique.
3. Hero: en lugar de solo brackets, la figura muestra **~5 servicios** que se pueden elegir y se ven «armándose» (ej. brackets, All-on-6, dentaduras, coronas). Servicios exactos: POR CONFIRMAR con la dueña.
4. Páginas de servicio (como en Nakeji: hero del servicio, texto «sobre el tratamiento» a la izquierda y antes/después a la derecha): en el lugar del antes/después va la **figura individual de ese servicio**, de cero al resultado. Etapa posterior.

### Servicios: Luminous (página oficial) contra Nakeji
- Iguales: Dental Cleaning ↔ cleaning · Wisdom Tooth Removal ↔ extractions · Porcelain Veneers & Crowns ↔ veneers + crowns · Dental Implants ↔ implants · Teeth Whitening ↔ whitening · Invisalign & Braces ↔ orthodontics + aligners · Pediatric ↔ pediatric.
- Parecidos (no 100 %): Routine Dental Care (Nakeji no tiene página propia) · Dentures & Bridges (Nakeji solo dentures).
- Solo Luminous: Dental Appliances · Cosmetic Bonding.
- Solo Nakeji (Luminous no los anuncia): All-on-4 · All-on-6 · Root canal · Gum treatment. Si Luminous los hace: POR CONFIRMAR.
- 18-11-2026 · La dueña aprobó los 5 servicios de la figura del hero: Braces & Invisalign, Dental implants, Dentures & bridges, Porcelain veneers & crowns, Teeth whitening. All-on-6 fuera hasta confirmar que la clínica lo hace. Encargo: `docs/lienzo/HERO-SERVICIOS.md` → Estilo-B5.

## 2026-11-18 (noche) — Se acaba el lienzo; B5 pasa a la página real
- La dueña pide dejar de hacer variantes en el lienzo: B5 queda como diseño elegido (equivale al Sí 2) y todo cambio desde ahora se ve ya programado en `apps/web`.
- Textos nuevos de la figura (hoja-b5.md) se usan tal cual; siguen marcados para su aprobación final.
- Encargo: `docs/ETAPA-3-CODIGO.md`.

## 2026-11-18 (noche) — Repositorio público y enlace en GitHub Pages
- La asistente dice que Jadro dio el sí para publicar con enlace y eligió hacer público todo el repositorio (antes se revisó: sin contraseñas ni datos de pacientes). Vercel no se usa por ahora.

## Actualización 2026-11-19 — Mejoras generales
- Orden de la dueña: mejorar todas las áreas; servicios destacados; doctor menos repetido; página de seguros igual a la de Dental Nakeji (misma lista de aseguradoras y logos, por ser el mismo dueño). La clínica debe confirmar que la lista aplica a Luminous. Encargo: `docs/MEJORAS-1.md`.

- 20-11-2026 · Tercer color de acento: la dueña eligió **menta C1 `#3fcfae`** (antes C2 `#1fb89a`, cambiada por contraste sobre el resplandor del fondo; docs/tercer-color.md, sección 6). Convive con el dorado: menta para palabras y títulos destacados; dorado para estrellas, foco y rayas. Sobre fondo blanco se usa `#0f766e`. Aplicado en `tokens.css` (`--color-mint`).

## 2026-11-23 · Pruebas en pausa (decisión de la dueña)
- Hasta nuevo aviso, en este sitio no se lanzan QA (`ld-qa-*`) ni revisiones de rendimiento o pruebas aparte. Solo se trabaja el frontend (diseño). Las pruebas vuelven cuando la dueña dé el visto bueno.
- Los programadores siguen corriendo typecheck y build y revisando su propio cambio en el navegador antes de entregar.
- 2026-11-23 (tarde): la dueña reactiva las pruebas: «ahora sí corres todas las pruebas», rendimiento y limpieza de código, al final de la segunda ronda.

## 2026-11-23 · Envío real de citas APAGADO (decisión de la dueña)
- El formulario completo de cita (BookingForm, BookingSchedule, TimePicker, config/booking.ts) queda en el proyecto pero ya no se usa en ninguna página; se retoma después.
- `components/Appointment.tsx` es ahora un contacto rápido PROVISIONAL (nombre, teléfono, correo) que valida en el navegador y no envía nada. Al validar muestra el aviso ya existente «This form is not connected yet, so your request was not sent. Please call or text…» (no se promete un contacto que no ocurre).
- About no lleva formulario (se rediseña); sus botones de cita van a /contact#appointment.

## 2026-11-23 · Reglas de la dueña (quinta ronda)
- No se agrega nada que la dueña no haya pedido (ej. formulario repetido al final de cada página).
- Ya no se usan fichas de casino ni temática de Las Vegas en piezas nuevas, salvo que ella lo pida.
- La dueña autorizó al Jefe a resolver las dudas 1–10 del 23-11 (ver bitácora).

## 2026-11-26 · Sitio en dos idiomas y ronda final (dueña)
- **Idioma: inglés y español** (cambia «Solo inglés» del 17-11). Rutas como Dental Nakeji: `/en/...` (principal) y `/es/...`, con selector de idioma. Traducción con la skill `i18n-sync` (ECC). Se mejora también el texto en inglés.
- Ronda final pedida: inicio (título del héroe, pie, sección estrella, formulario, quitar «Thinking about changing your smile», sección de convenios nueva), servicios interactivos, beneficios en 3 páginas propias, Contact (24/7 arriba → formulario → moneda y letrero), About sencillo como Nakeji, Términos, Privacidad y Preguntas frecuentes copiados de Nakeji y adaptados.
- La dueña pide que IT trabaje sin revisiones suyas a cada rato: el Jefe resuelve dudas de gusto con criterio y las anota.
- Encargos: `docs/encargos/ENCARGOS-26-11.md`.
- 26-11 (corrección de la dueña): el formulario NO lleva campos. Es una sección de información bonita con botón que lleva al sitio de registro/citas (Adit). La sección de **seguros del inicio se queda** (se había quitado por error); convenios va además, no en su lugar.
- 26-11 (dueña, 2.ª corrección): (a) sección 24/7 se ve fea: debe sentirse de **clínica dental** (calma, limpia, confiable) sin perder el estilo del sitio. (b) Hub de servicios: nada de tarjetas que se despliegan; los servicios **fijos y visibles**, un clic a su página. (c) Beneficios (hub, seguros, financiamiento, convenios): interfaz más rica, hoy muy sencilla. (d) About sigue feo tras 2 rondas → cambia de agente (Diseñador 2) con otro método. Contact, Términos y Privacidad: bien. Blog: después.

## 2026-11-26 · Ronda 2 de la dueña
- Sección estrella sin numeración 01–04. Línea azul de «Featured services» bajo los títulos de todas las secciones.
- Botón de emergencias 24/7 con movimiento para llamar la atención. Horario fuera del pie; FAQ en la columna Legal del pie. Idioma con bandera como Dental Nakeji.
- SAHARA: logo oficial (saharalasvegas.com) en `public/benefits/sahara.svg`; sin estrellita. Beneficios sin la cifra 24/7.
- Antes y después: la dueña ordena usar en Luminous los casos de Dental Nakeji por servicio («son las mismas empresas»). Se muestran con crédito visible «caso de Dental Nakeji». Esto cambia la regla de no mezclar datos solo para estas fotos. Riesgo anotado: son pacientes de otra clínica (Tijuana); el permiso de los pacientes para usarlas en otro sitio sigue POR CONFIRMAR.
- Encargo: `docs/encargos/ENCARGOS-26-11-r2.md`.

## 2026-11-26 · Ronda 3 de la dueña
- Pie: sin animación ni código de fondo (fondo fijo); FAQ fuera de la columna Legal, en la franja final; contacto alineado con las columnas; emergencias 24/7 como botón limpio.
- Fotos de servicio de Dental Nakeji en las páginas de cada servicio de Luminous, por ahora y solo ahí (orden de la dueña: no hay fotos propias).
- Servicios y blog: completar la información con la de Nakeji y la oficial, adaptada a Luminous.
- SAHARA del inicio reorganizado. About con más contenido, revisando la página oficial.
- Encargo: `docs/encargos/ENCARGOS-26-11-r3.md`.

## 2026-11-26 · Ronda 4 · Correcciones y lección
- **Lección del Jefe:** la dueña dicta por voz. «Sección R» = **sección hero**. Se leyó mal en la ronda 2 y se rediseñó Featured services en lugar del antes/después del héroe. También se tomó «no quites nada» como «no muevas Cómo funciona», y se dejó el orden del inicio a criterio del agente. Desde ahora: cada encargo cita la frase de la dueña; si una palabra no cuadra con el sitio, se pregunta en una línea antes de lanzar.
- Inicio: Hero → sección estrella → Featured services → Cómo funciona (respuesta de la dueña: 4.ª) → Booking → Seguros → Convenios → Reseñas → Visit us.
- Antes/después del héroe con otra forma de mostrarse; selectores rectangulares.
- Contact: una sección con booking (izq.) y 24/7 (der.), sin tarjetas; abajo la misma «Visit us» del inicio (letrero, horarios, moneda).
- Beneficios: sin cifras; 3 puntos sin números.
- SAHARA del inicio: igual que el bloque de Convenios (respuesta de la dueña).
- Blog: fotos del sitio oficial (4 fotos de la clínica) en tarjetas y artículos.

## 2026-11-26 (noche) · Ronda 6 aprobada y plan de la ronda 7
- Inicio sin fondos de tarjeta, con líneas (prueba de la ronda 6): **le gustó a la dueña**. Ajustes pedidos: reforzar la legibilidad sin fondo (se permite cambiar tamaños), logos de seguros a color en PNG sin fondo y sin nombre debajo, SAHARA centrado y más grande, «Most requested» fuera de la línea.
- Visto bueno para extender el estilo a Servicios, Beneficios, Contact y About. Lo de «More» (FAQ, Blog, legales) todavía no.
- Plan para seguir desde otra cuenta: `docs/encargos/ENCARGOS-26-11-r7.md`.
