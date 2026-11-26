# Encargos 26-11 · Ronda 5

Reglas comunes: iguales a `ENCARGOS-26-11-r4.md`. **Haz exactamente lo pedido con las palabras de la dueña; no cambies nada más.**

## F1 · Inicio, encabezado y reseñas (`ld-desarrollador-web`)
1. **Quitar «Cómo funciona» del inicio.** Dueña: «eso de cómo funciona del homepage, quítalo». Se queda en Beneficios. El inicio queda: Hero → estrella → Featured services → Booking → Seguros → Convenios → Reseñas → Visit us.
2. **Estrella de la sección de cita (BookVisit, `.bv__star`).** Dueña: «deja que esa estrellita se ilumine, que esté un poquito más coquetona». Dale brillo/destello suave (resplandor que respira y un destello ocasional). Quieta con reducir movimiento y pausa.
3. **Reseñas de Google: color de la letra.** Dueña: «pones un color nomás random ahí a la letra». La inicial del avatar (`review-card__avatar` cuando no hay foto) lleva un fondo de color distinto por persona, como Google (paleta fija de 6–8 colores con buen contraste con la letra blanca; el color sale del nombre, para que no cambie en cada carga).
4. **Encabezado sólido.** Dueña: «el header se perdía mucho, y más con el logo. Me gustó el azul oscuro del footer. Hazlo sólido, ese color… y deja de igual manera el fondo sólido debajo [en el pie]». El encabezado (barra del menú) pasa a fondo **sólido** con el mismo azul oscuro del pie (sin transparencia ni desenfoque). El pie sigue con su fondo sólido. Revisa que logo, menú, bandera y botón se lean bien y que el menú de celular y los submenús combinen.

Archivos: `pages/Home.tsx`, `components/{BookVisit,Reviews,Header}.tsx` solo si hace falta, y su CSS (`home-b1.css`, `site.css`, `reviews.css`, header).

## F2 · Blog (`ld-frontend-2`)
1. **Fotos sin repetir.** Dueña: «que las fotos no se repitan… si de plano no encuentras fotos relacionadas, déjalas en blanco». Cada una de las 4 fotos va en **un solo** artículo, el más relacionado; los demás artículos quedan sin foto (como estaban antes: ícono). Busca otra vez en luminousdentallv.com por si hay alguna foto propia más relacionada a un tema; si no, en blanco.
2. **Tarjetas de los artículos (lo que se ve antes de entrar al artículo).** Dueña: «en la parte de los artículos individuales, antes de entrar al artículo, la de Nakeji está un poquito mejor. Ve cómo está implementada y cámbialo». Copia cómo Dental Nakeji muestra las tarjetas de artículos en su blog (`C:\Users\Trabajo\Desktop\Dental Nakeji\src\pages\blog\` y sus componentes/CSS): estructura, orden de datos, estilo y comportamiento. Con datos de Luminous. Si una tarjeta no tiene foto, que se vea bien igual.

Archivos: `pages/Blog.tsx`, `content/blog.*.json` (solo campos de imagen), CSS del blog.
