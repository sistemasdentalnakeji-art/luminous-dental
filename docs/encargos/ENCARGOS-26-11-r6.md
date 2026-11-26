# Encargo 26-11 · Ronda 6 · Inicio sin fondos de tarjeta (prueba)

Reglas comunes: iguales a `ENCARGOS-26-11-r4.md`. **Haz exactamente lo pedido; no cambies nada más.**

## D2 · Inicio con secciones de líneas (`ld-disenador-uiux-2`)

**Dueña (literal):** «en las tarjetas flotantes, con tarjetas me refiero a los fondos, quisiera que quitaras el fondo en las tarjetas y la vamos a probar primero en el homepage, a excepción de la sección de las tarjetas de Google. Todo lo demás vamos a quitar el fondo que tiene e implementar como estas secciones de líneas. Yo tengo mi idea, pero tú mejórala: que el departamento vea qué se le ocurre como un detallito extra, algo mejor. Quisiera ver algo más limpio.»

**La referencia que mandó** es la fila de datos de About (`pages/About.tsx` + `styles/about.css`: 24/7 · Las Vegas · 11 · 4): sin fondo ni tarjeta; una línea fina arriba y abajo de toda la fila; separadores verticales finos entre columnas; cifra grande en serif y texto chico debajo.

**Qué hacer**
1. **Solo en el inicio** (`/en/` y `/es/`). Las demás páginas no cambian, aunque compartan componentes (Convenios, Contact, Beneficios). Encierra los cambios bajo una clase del inicio (p. ej. agrega `className="home"` al contenedor de `pages/Home.tsx` y escribe `.home …`). Es una prueba: debe poder quitarse fácil.
2. En **todas** las secciones del inicio, quita el fondo de las tarjetas/paneles (vidrio, relleno, sombra, recuadro): sección estrella, Featured services (su panel de vidrio y pestañas), Booking (BookVisit), Seguros, Convenios/SAHARA, Visit us (letrero/horarios/tarjeta de contacto), y cualquier otra caja con fondo. **Excepción: las tarjetas de reseñas de Google se quedan igual.** El antes/después del héroe son fotos: el marco de las fotos se queda, solo quita cajas de fondo si las hay alrededor.
3. En su lugar, el lenguaje de la referencia: líneas finas arriba/abajo de cada bloque y divisores verticales finos entre columnas, aire generoso, jerarquía con tipografía.
4. **Detalle extra (propuesta del departamento):** agrega UN detalle propio y sutil que eleve el estilo de líneas (ejemplos para elegir o mejorar: la línea superior que se dibuja de izquierda a derecha al entrar en pantalla; un punto o destello menta donde se cruzan línea y divisor; la línea que se ilumina en menta bajo la columna al pasar el cursor). Que sea el mismo en todo el inicio, quieto con reducir movimiento y pausa. Explícalo en tu entrega.
5. Legibilidad: sin el fondo, revisa contraste del texto sobre el cielo estrellado (AA).

Archivos: `pages/Home.tsx` (solo la clase), CSS nuevo `styles/home-lines.css` (importado una vez) con todo lo de esta prueba. No edites el CSS de otras páginas.

Entrega: capturas antes/después del inicio completo y por sección (375, 768, 1440; EN y ES), qué detalle extra elegiste y por qué, typecheck + build + Playwright, entrada corta en `docs/bitacora.md`. Sin commit; cierra tu servidor.
