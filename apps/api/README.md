# apps/api · citas en línea (todavía no existe)

Carpeta reservada en la etapa 0 porque el dueño pidió **citas en línea que puedan crecer a una automatización** (17-11-2026).

## Qué hará cuando se construya
1. Recibir una solicitud de cita con el formato `AppointmentRequest` de `packages/types` (los mismos campos del formulario oficial: nombre, apellido, correo, teléfono, tratamiento, mensaje, aceptación de privacidad).
2. Guardarla en la base de datos (`packages/db`) con estado `received`.
3. Avisar a la automatización (por ejemplo un webhook: un aviso automático a otra herramienta) para que la recepción llame o confirme. Herramienta: POR CONFIRMAR con Jadro.
4. Cambiar el estado: `received` → `contacted` → `scheduled` o `cancelled`.

## Reglas
- Sin historial médico ni datos de pago en la solicitud.
- Las llaves y accesos los maneja Jadro, nunca el código ni la bóveda.
- Se construye en la etapa 3 con el DBA de sitios (manual, secciones 25 y 26).

Cuando exista, en la página se cambia `mode` a `'api'` en `apps/web/src/config/booking.ts`.
