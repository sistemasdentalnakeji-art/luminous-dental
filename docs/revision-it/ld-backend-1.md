# Revisión IT · ld-backend-1 · formulario de citas y reseñas (19-11-2026)

Alcance: `features/booking/BookingForm.tsx`, `config/booking.ts`, `packages/types/src/appointment.ts`, `lib/useGoogleReviews.ts`, `config/reviews.ts`, `components/Reviews.tsx`, `vercel.json`, `apps/api`, `packages/db`. Solo lectura de código; la página responde 200 en :5181 (`/` y `/contact`). No probé envíos reales (no hay destino).

## Veredicto: PASA con reservas
Hoy es seguro porque no envía ni guarda nada (modo vista previa) y lo dice con claridad. Para conectarlo falta construir todo el servidor, y hay 3 puntos del código que conviene arreglar antes.

## Fallos

### Media
1. **El consentimiento no menciona la política de privacidad.** `content/home.ts` → `appointment.consent` dice «I agree that Luminous Dental may contact me…»; el contrato (`appointment.ts`) dice «accepted the privacy notice». Cómo verlo: abrir cualquier página con el formulario y leer la casilla. Antes de recibir datos reales hace falta el aviso enlazado (la política aún no existe, ver `datos.md`). Lo legal lo decide la clínica.
2. **El formulario no maneja los 3 errores que `datos.md` exige** (datos mal escritos desde el servidor, demasiados envíos, falla). `sendAppointment` solo hace `if (!res.ok) throw`; todo termina en el mismo mensaje «Something went wrong». Un 400 o 429 se vería igual que una caída. Dónde: `config/booking.ts` líneas del `fetch`. Reproducir: poner `mode:'api'` con un endpoint que responda 429.
3. **Tras enviar con éxito el formulario queda lleno y activo** (`status === 'sent'` no limpia ni bloquea). La persona puede pulsar de nuevo y mandar la solicitud duplicada. Reproducir: en modo api, enviar y volver a pulsar «Send my request». En modo vista previa pasa igual con el mensaje de «no enviado».
4. **Sin protección contra bots más allá de una casilla trampa.** `name="company"`: el silencio del `return` (sin mensaje) deja a una persona real sin respuesta si el navegador le autocompleta ese campo (inferido, no probado). Turnstile y límite de envíos están planeados para la fase 2 (`datos.md`); no existen hoy. Obligatorio antes de conectar.

### Baja
5. **`fetch` sin tiempo límite** (ni `AbortController`): con red lenta el botón queda en «Sending…» sin fin. Igual en `useGoogleReviews` (solo aborta al desmontar).
6. **Sin límites de largo** en `message`, `preferredTime`, nombres (no hay `maxLength`). El servidor deberá recortar y validar, sin confiar en el navegador.
7. **Teléfono:** el patrón `[0-9 +\(\)\-]+` acepta «(» o «+» solos; el mensaje «Enter a phone number.» sirve para vacío pero no explica un formato malo.
8. **`useGoogleReviews` no valida la respuesta:** no revisa rating (1–5), ni que `text`/`author` sean texto, ni que los enlaces (`authorUrl`, `photoUrl`, `googleUrl`) empiecen con `https://` (un `javascript:` en un href sería un riesgo si el servidor se equivocara). Si falta `reviews`, el error lo atrapa el `catch` y queda la lista corta (bien).
9. **`key={r.author}` en `Reviews.tsx`:** dos reseñas del mismo autor chocarían claves. Y `.slice(0, 4)`: con reseñas en vivo solo se muestran 4 (Google Places entrega pocas); al llegar la respuesta la lista pasa de 3 a 4 tarjetas, con salto visual.
10. **Se pide la lista en cada visita** a una página con reseñas, sin caché ni tiempo de vida; el servidor futuro debe guardar en caché (Google cobra por consulta).

## Qué falta para conectar (en orden)
1. **Formulario:** crear `apps/api` (hoy solo README; `packages/db` también). Decidir dónde vive: `vercel.json` publica `apps/web/dist` y las funciones de Vercel van en `/api` en la raíz o en el proyecto configurado; `apps/api` **no** se detecta solo (inferido de la estructura, no probado). Ojo: el `rewrite "/(.*)"` → `index.html` puede tapar `/api/...` si la función no queda bien ubicada.
2. Tomar la herramienta de recepción (POR CONFIRMAR, Jadro), validar en el servidor con el mismo contrato `AppointmentRequest` (el tipo sirve solo en TypeScript; hace falta un esquema de verdad), Turnstile, límite de envíos con almacén compartido, respuestas con códigos 400/422/429/500 y cuerpo `{error:{code,message}}`.
3. Poner el contrato en un solo documento (OpenAPI o esquema JSON) que usen la web y el servidor; hoy solo hay la interfaz.
4. Cambiar `mode` a `'api'` y poner la dirección; probar con el 400, 429 y caída.
5. Llaves solo en variables de Vercel (las pone Jadro); ninguna en el repositorio. Revisar con el Revisor de seguridad. Nada de datos de pacientes fuera de lo acordado; HIPAA: lo decide la clínica.
6. **Reseñas:** endpoint propio que lea Google Places con la llave en el servidor, caché de horas, y que devuelva `{reviews:[{author,rating,text,relativeTime,…}]}`; poner la dirección en `config/reviews.ts`. Falta también el `profileUrl` de la ficha de Google (POR CONFIRMAR) y permiso de cada paciente para mostrar su texto.
7. Si se usa otro dominio para la API, ajustar CORS y, cuando se añada, el `connect-src` de la política de seguridad.

## Riesgos
- No hay riesgo hoy: ningún dato sale del navegador, no hay llaves en el código (`apiEndpoint` y `endpoint` en `null`).
- Al activar `api`, sin los puntos 2–4 de arriba quedaría un formulario abierto a spam y envíos repetidos que guarda datos de personas.

## No verifiqué
- Envío real, autocompletado del campo trampa, comportamiento en pantalla del lector de voz, estilos (`.hidden`, `.err`).
- Duplicado de IDs si una página trae dos formularios (Blog tiene 3 usos de `<Appointment />` en `pages/Blog.tsx`; no revisé si coinciden en la misma ruta).
- `vite.config.ts` (proxy) y `apps/web/tests` (vacía: no hay pruebas del formulario ni del hook).
- Lo legal (HIPAA, política de privacidad) y las llaves/cuentas de Google.
