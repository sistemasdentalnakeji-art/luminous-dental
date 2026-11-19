# Product

<!-- impeccable:product-schema 1 -->

> Hecho con el método `impeccable init`, sin entrevista: el encargo trae las decisiones del dueño y no había a quién preguntar. Todo lo inferido está marcado. Fuente: https://luminousdentallv.com (revisada el 17-11-2026). Idioma del sitio: solo inglés.

## Platform

web

## Stack
Ya decidido en la etapa 0 (ver `docs/decisiones.md`): Vite + React + TypeScript + Tailwind v4 + motion, npm workspaces.

## Users
- **Observado:** la página oficial habla a pacientes de Las Vegas, familias incluidas («An Office for the Whole Family») y personas de fuera de la ciudad (convenio con SAHARA Las Vegas: «Coming from out of town?»).
- **Situación (inferido):** alguien busca un dentista en Las Vegas, desde el celular casi siempre, y quiere saber si le conviene y cómo pedir cita.
- **Trabajo del visitante:** entender qué ofrece la clínica, confiar en el doctor y pedir cita sin llamar si no quiere.
- Quién es el paciente típico (edad, motivo, seguro): **POR CONFIRMAR**.

## Product Purpose
Sitio de Luminous Dental, clínica en 1212 S Maryland Pkwy, Las Vegas, NV. Existe para que un paciente nuevo entienda los servicios y **pida cita en línea**. Éxito = solicitudes de cita enviadas. Meta numérica: **POR CONFIRMAR**.

## Acción principal
**Pedir cita** (formulario en línea ya hecho en vista previa; la automatización que lo recibe está POR CONFIRMAR). Acción de apoyo: llamar o enviar texto al (702) 805-8688. El sitio oficial usa «Get Appointment», «Schedule Your Visit», «Book An Appointment» y «Request a Free Consultation»; el nuevo debe usar **una sola** frase para la misma acción.

## Positioning
Diferencia **dicha por el sitio oficial** (no verificada de forma independiente):
- Una frase repetida en todo el sitio: «Your teeth should last a lifetime», con la idea de conservar los dientes naturales («preserving them for as long as possible is our priority»).
- Un doctor general que también hace cosmética, implantes, Invisalign/brackets y odontopediatría en un solo lugar.
- Atención para toda la familia y comodidad («Take Our Time for Your Comfort»).
- Convenio con SAHARA Las Vegas para pacientes de fuera.
- Trabajo con la mayoría de seguros privados (lista de 15 aseguradoras en la página oficial).

**No se usa como diferencia:** «over 40 years… family-owned» (choca con los 4 años de experiencia del doctor; POR CONFIRMAR) ni «TOP-RATED» (la calificación real mostrada es 4.3 de 5 con 17 reseñas en Google, revisada el 17-11-2026).
Lo que los competidores hacen mejor o igual: lo llena el Analista de competencia en `docs/competencia.md`.

## Operating Context
Una sola sede. Doctor: Dr. Christian Hahn, dentista general (UNLV, 4 años de experiencia según el sitio). Teléfono (702) 805-8688 (llamada o texto), info@luminousdentallv.com. Instagram @luminousdentalvegas y Facebook. Horario: **POR CONFIRMAR** y no se publica (el sitio oficial muestra dos horarios que se contradicen y Google Maps muestra un tercero).

## Capabilities and Constraints
- Solo inglés. Sin versión en español.
- Citas en línea, preparadas para crecer a automatización (`apps/api`, `packages/db`, `AppointmentRequest`).
- Salud: no prometer resultados, no inventar cifras, no mostrar fotos de pacientes sin permiso (**POR CONFIRMAR** el permiso de cada caso).
- El sitio lleva `noindex` hasta que Jadro autorice publicar.

## Brand Commitments
Nombre: Luminous Dental. Logo y colores: **POR CONFIRMAR** (ver `docs/marca.md`). Voz: se saca de los textos reales y se limpia (ver `docs/marca.md`).

## Evidence on Hand
Reales: dirección, teléfono, correo, doctor y su formación, lista de servicios y seguros, calificación de Google (4.3 / 17 reseñas, 17-11-2026), reseñas de Google citadas en el borrador `luminous-smile-pulida.html` (3 extractos, revisados el 05-11-2026).
**No hay y no se inventa:** fotos antes/después utilizables (la página oficial solo muestra cuadros grises; el borrador usa material «aportado para el diseño» sin consentimiento confirmado), video del doctor, número de pacientes, años de la clínica, premios, precios, ofertas (el sitio dice «Implants 15% off», sin fechas ni condiciones: no se copia).

## Product Principles
1. **Pedir cita es el camino principal** en cada página, en celular primero.
2. **Cada dato sale del sitio oficial o dice POR CONFIRMAR.** Nada inventado.
3. **Conservar los dientes naturales** es la idea que une el sitio (viene del texto oficial).
4. **Claro antes que bonito:** el paciente entiende en cinco segundos quién es la clínica y qué hace.
5. **Honesto con la salud:** «resultados varían», sin promesas.

## Personalidad
Cálida, tranquila, directa, profesional sin frialdad. Habla de «you» y «we», con frases cortas. (Inferido de los textos oficiales: «comfortable and welcoming», «Take Our Time for Your Comfort», «Your teeth should last a lifetime».)

## Lo que no es
- No es una clínica de lujo ni de «sonrisa de Hollywood»: no hay base en el sitio oficial.
- No es bilingüe ni habla en español.
- No promete resultados, plazos («en siete días») ni ahorros no confirmados.
- No usa «top-rated», «over 40 years» ni cifras que el sitio no sostenga.
- No es una plantilla: el sitio oficial trae restos («Lorem ipsum», «SmileLife Dental», «Somerset Dental») que no se copian.

## Accessibility & Inclusion
WCAG 2.2 AA (manual, sección 7). Pacientes de todas las edades y familias: letra legible, botones grandes, formulario con etiquetas reales.
