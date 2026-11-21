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
