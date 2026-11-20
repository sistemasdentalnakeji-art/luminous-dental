# Encargo · Arreglos de la revisión de IT · ronda 1 (19-11-2026)

La dueña dio la orden: «que arreglen». Fuente: `docs/revision-it/RESUMEN.md` (y los informes de cada quien en esa carpeta). Arreglas **solo lo que el equipo puede arreglar sin datos nuevos**.

## Reglas
- No tocas git (ni add, ni commit, ni push), no publicas, no cambias `vercel.json` sin necesidad, no borras capturas.
- No inventas textos de la clínica. Si algo necesita texto real, se **esconde** hasta tenerlo.
- Al terminar: `npm.cmd run typecheck` y `npm.cmd run build` en verde; capturas propias en tu scratchpad (no en `docs/`), una línea por arreglo al final de `docs/bitacora.md`.
- Ignora datos de Dental Nakeji de tu ficha.

## Lista (en este orden)
1. **A1 Lorem ipsum:** que no se vea en ningún lado (carrusel, /services, /services/dental-appliances, /services/invisalign-and-braces). Esconde viñetas/párrafos con `placeholder: true`; el dato queda marcado POR CONFIRMAR en `docs/datos.md`.
2. **M1 + B2:** botón de pausa/reanudar visible y accesible para las tiras de reseñas (y las otras animaciones infinitas que no lo tengan); nombres distintos a los 5 botones «Pause animation» del carrusel (p. ej. «Pause Dental Implants animation»).
3. **M2:** `key` por ruta para que el formulario no arrastre datos de otra página.
4. **M3:** botón de cita en la página de error y en cualquier página sin `#appointment` → lleva a donde sí está el formulario.
5. **M4 + M5:** quitar la frase «We work with most private dental insurance» de About e Insurance hasta confirmarla; la página «Insurance & Financing» no promete financiamiento (texto neutro que invite a llamar, con palabras ya aprobadas en `home.ts` si existen; si escribes una frase nueva, márcala «por aprobar» en `docs/datos.md`).
6. **M7 + B6:** Contact sin hueco arriba ni dirección/«Open in Google Maps» repetidos; About sin el hueco de ~200 px.
7. **M8:** las 6 páginas de servicio sin figura no muestran el recuadro vacío (quítalo o pon algo real y discreto).
8. **M9 (solo código):** formulario: tras enviar se bloquea/limpia y no se reenvía; mensajes distintos para error 400, 429 y caída; `maxLength` en campos; tiempo límite en `fetch`; destino solo `https`; teléfono que no acepte «(» o «+» solos con mensaje claro (B15).
9. **M10:** validar la respuesta de reseñas en vivo (que sea lista, enlaces solo `https`), `key` sin choque (B3).
10. **Bajos:** B1 subrayado de «Call or text»; B4 Tab con menú abierto; B5 enlaces externos parejos (`target="_blank" rel="noopener noreferrer"`); B9 borde de la casilla de consentimiento visible (≥ 3:1) y línea dorada bajo títulos más visible; B12 quitar código y dependencias sin uso; B13 teléfono desde `clinic.phone`; B14 los detalles de React.

Fuera de este encargo (no lo toques): git, capturas pesadas, repositorio público, `vercel.json`/cabeceras, SEO (M13), dividir el paquete (M14), conectar formulario o reseñas, textos reales de la clínica.
