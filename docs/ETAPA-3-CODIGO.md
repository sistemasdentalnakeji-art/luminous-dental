# Encargo · Etapa 3 · B5 a la página real (18-11-2026)
Para: ld-desarrollador-web. Ignora los datos de Dental Nakeji de tu ficha; los datos de Luminous salen solo de luminousdentallv.com y de `apps/web/src/content/`.

## Qué
La dueña eligió **B5** (`docs/lienzo/project/Estilo-B5.dc.html` y `Estilo-B5-movil.dc.html`). Pásalo a código real en `apps/web` (React 19 + Vite 8 + Tailwind v4, inglés). La página que se abre en `http://localhost:5181` debe verse como B5, en computadora y celular. El lienzo ya no se toca.

1. **Homepage completa como B5**: cabecera con menú, hero con la figura de 5 servicios, todas las secciones de B5, formulario de citas (reusa `features/booking/BookingForm.tsx`), pie de página.
2. **Figura**: reusa el motor ya hecho en `docs/lienzo/anatomy/servicios/` (model.js, draw.js, live.js, estilos) dentro de un componente React; cárgala sin bloquear el titular. Que el mismo componente pueda mostrar un solo servicio (para las páginas de servicio después). Se mantienen: pestañas con teclado, Pause/Play, pausa con cursor/foco, movimiento reducido, 44 px.
3. **Estructura** igual que Dental Nakeji (misma dueña): mira `C:\Users\Dental Nakeji\Desktop\Departamentos\IT\Paginas Web\Codigo - Pag` (`src/config/routes.ts`, `src/config/navigation.ts`) para menú, rutas y pie. Copia la forma, nunca sus datos. Crea las rutas del menú; si una página aún no tiene diseño, que no se vea como esqueleto vacío: déjala fuera del menú o con su contenido real básico de luminousdentallv.com.
4. Textos en `apps/web/src/content/`, colores y medidas en `styles/tokens.css`. Nada inventado: si falta un dato, «POR CONFIRMAR» en `docs/datos.md`, no en pantalla.

## Reglas
No toques git ni publiques nada. Sin dependencias nuevas salvo que sean imprescindibles (dilo). `npm run typecheck` y `npm run build` pasan.

## Entrega
Capturas a 1440 y 375 desde `http://localhost:5181` en `docs/capturas/etapa-3/`, peso del build, lo no verificado, una línea en `docs/bitacora.md`. Respuesta corta y en palabras sencillas.
