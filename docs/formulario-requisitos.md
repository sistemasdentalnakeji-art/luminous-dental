# Formulario de cita · requisitos de los campos (2026-11-20)

Fuente de Nakeji (solo leída): `features/booking/booking.ts` y `BookingForm.tsx` de Dental Nakeji. Las reglas de Luminous viven en `apps/web/src/config/booking.ts` (`checkAppointment`) y las usan el formulario **y** `sendAppointment` (que revisa otra vez antes de enviar). Mensajes en `content/home.ts` → `appointment.errors`.

| Campo | Regla en Nakeji | Regla en Luminous antes | Qué se hizo |
|---|---|---|---|
| Nombre / Apellido | Solo letras, mínimo 2, espacios entre palabras; al teclear se quitan los demás caracteres; máx. 50 | Solo «no vacío»; máx. 60 | Letras con acentos, espacio, guion y apóstrofo (`O'Brien`, `Mary-Jane`); mínimo 2; máx. 60; se quita lo demás al teclear/pegar; espacios recortados y colapsados |
| Teléfono | 10 a 15 dígitos, `+` opcional; al teclear solo dígitos; máx. 20 | 7+ dígitos, acepta `+ ( ) - .` | EE. UU.: 10 dígitos, máscara `(702) 555-0123` al teclear; se quita un 1 inicial; código de área y central no empiezan con 0 ni 1; máx. 14; se envía ya con formato |
| Correo | Opcional; regex simple; máx. 120 | Obligatorio; solo `type=email` del navegador | Sigue obligatorio (decisión previa); regex propia en JS (parte local ≤ 64, dominio con punto); minúsculas; máx. 254 |
| Tratamiento | Servicio de una lista | Obligatorio, cualquier texto en el envío | Obligatorio; el envío solo acepta un nombre de `services` o «Not sure yet» |
| Día/hora preferidos | Fecha y horario con lista (no aplica: aquí es texto libre) | Texto libre, máx. 100 | Opcional; máx. 100; sin enlaces; recortado |
| Mensaje | Máx. 500; rechaza enlaces (`http://`, `www.`) | Máx. 1000, sin más reglas | Máx. 1000; rechaza enlaces; quita caracteres de control (conserva saltos de línea) |
| Consentimiento | Obligatorio | Obligatorio solo en el navegador | Obligatorio también en `checkAppointment` (el envío lo exige) |
| Anti-bots | Campo trampa `hp_x` + casilla Cloudflare Turnstile | Campo trampa `company` | Se mantiene el campo trampa. Turnstile **no se agregó** (necesita llave y cuenta: decisión del dueño). Falta, para cuando haya servidor: validar de nuevo y limitar envíos por IP/teléfono ahí |
| Mensajes de error | Por campo, enlazados al campo, foco al primero malo | Por campo, hoy genéricos | Un mensaje claro por campo en inglés (`role="alert"`, `aria-describedby`, `aria-invalid`), foco al primero con error en el orden de pantalla |
| Envío doble / destino | Límite de tiempo, bloqueo | Ya existía (10 s, solo https, bloqueo) | Sin cambio; ahora además rechaza datos inválidos antes de la red |

## Aspecto (cambio de estilos)
Tarjeta y campos azul noche translúcidos, borde celeste `--color-input-border` (#5f8fbd, unos 5:1 sobre el fondo del campo), texto claro; hover y foco con borde `--color-sky` y halo; error con borde `--color-error` y texto `--color-error-text`; deshabilitado con opacidad. Tokens nuevos en `styles/tokens.css` (`--color-glass`, `--color-input-*`, `--color-error-text`). Los tokens `--color-field-*` (campo blanco de Aseguranzas) no se tocaron.

## No verificado
- Contraste calculado a mano, sin medidor automático. Lector de pantalla no probado.
- Mínimo de 2 letras rechaza nombres de una letra (poco comunes); decisión copiada de Nakeji.
- Servidor aún no existe: la revisión del lado del servidor real está pendiente (`apps/api`).
