# Revisión independiente (manual §35) · B3 «El anillo bajo las estrellas», ronda 2 · Diseñador UI-UX 2
Revisor: `ld-disenador-uiux-2`. Yo no hice B3. Trabajé solo. Fecha: 18-11-2026. Vara: `MEZCLA-2.md` más todo lo de la ronda 1.

## Cómo miré
- Capturas reales con Edge sin ventana: 1440 (alto 8200) y 375 (dentro de un marco de 375 px exactos; Edge solo no baja de ~500 px).
- El visor local no corre el script del lienzo. Hice una **copia temporal en mi carpeta de trabajo** (no en el proyecto): quité `support.js`, puse un `DCLogic` vacío y llamé al bloque de script al cargar. Resultado: el script corre sin romper la página; la malla azul se ve en el hero y se ven estrellas. No puedo separar en la imagen cuáles puntos son de CSS y cuáles del canvas animado, y no medí fps.
- En el visor sin script (capturas del coordinador) quedan las estrellas CSS y el degradado: la capa de respaldo funciona.
- Texto: coincide con `home.ts` (reseñas: Ashok R., Ana B., Sandra P., tal cual). La foto del doctor aparece **1 vez** en cada archivo (la busqué en el código). Sin dientes. Sin `{{ }}`.

## 1. Veredicto: **PASA** (mejor que B2; sin fallas duras)
Cumple los 4 pedidos de la dueña. Lo que queda son detalles de acabado: el arco vacío del doctor es un hueco grande, el fondo animado solo se ve en la primera parte de una captura alta, y hay algunas repeticiones.

## 2. Lista premium §20
| # | Punto | Resultado | Lo que vi |
|---|---|---|---|
| 1 | Tipografía con carácter | PASA | Newsreader ligera, titulares de 116-118 px; Figtree. Igual que B2. |
| 2 | Pieza firma | PASA | El anillo ya no tiene competencia (sin dientes, sin foto repetida). |
| 3 | Movimiento con intención | PASA con reserva | Malla muy lenta + estrellas + fugaz + logo: todo es «cielo», un solo tema, pedido por la dueña. En el código: media resolución, 30 fps, pausa con pestaña oculta, un cuadro con movimiento reducido. fps reales no medidos; sin manejo de «contexto WebGL perdido» (menor). |
| 4 | Retícula editorial y aire | PASA | Escalera, Why con notas desfasadas, reseñas con filete vertical. Cada sección con forma distinta. |
| 5 | Fotografía tratada | PASA | Una sola foto real, en el anillo. La caja «Real clinic photo · POR CONFIRMAR» sigue marcada. |
| 6 | Paleta con acento disciplinado | PASA | Noche, cielo y oro (oro en estrella, filetes, cursiva del titular). |
| 7 | Referencias vivas | NO VERIFICADO | Sin enlaces nuevos en la hoja; el fondo viene del código de la dueña (referencia propia). |
| 8 | Detalle de acabado | PASA con reserva | Foco dorado, hover del arco, botones ≥ 44 px. Texto chico en nombres de reseñas (~13 px gris). |

## 3. Delatores y antipatrones §8
- Cursiva dorada en «last a lifetime»: delator permitido porque el diseño de la dueña lo usa.
- Fuentes de Google (Newsreader/Figtree): prohibido en producción (§8); la hoja dice que serán locales. Cumplirlo.
- «CONTACT» en mayúsculas del pie: **corregido** (ahora «Contact» normal).
- «Animar todo»: el fondo siempre se mueve, pero es lento y es lo que se pidió. Sin degradado morado, sin blobs de relleno, sin tarjetas iguales, sin números, sin flechitas, sin carrusel, sin calificación ni estrellas de puntuación.
- Posible nuevo: tres estrellas parecidas (logo, corona del anillo/arco, estrella grande del arco). Raya en «decoración repetida».

## 4. Prueba del gemelo
Otra clínica con el mismo encargo no tendría: cielo de malla azul con estrellas y fugaz, el logo que se ilumina, el anillo coronado por la estrella, la escalera de servicios y las notas desfasadas. Estructura base (hero, servicios, doctor, reseñas, formulario) sí saldría igual. Gemelo: bajo.

## 5. Problemas concretos
**1440 px**
- Arco «Meet Dr. Christian Hahn»: ~540 px de alto casi vacío (solo una estrella). Es el hueco más grande de la página y no dice nada; además repite la estrella por tercera vez.
- La malla WebGL se ve solo en los primeros ~1400 px de la captura alta; de ahí hacia abajo el fondo es azul plano con puntitos (esto es lo que pasa en el lienzo con `$preview` tan alto; en un navegador real el fondo es fijo y cubre la ventana siempre). La dueña, al ver el lienzo, verá «dos mundos».
- Encabezado más apretado: menú + «Call or text» + botón blanco en una sola barra.
- Reseñas: bien armadas (cita grande centrada, 2 citas con filete vertical, enlace). Pero «Read more patient reviews» va pegado a la izquierda bajo una sección centrada, y los nombres son pequeños y grises.
- Descripciones de la escalera ~15 px.
- Caja vacía «POR CONFIRMAR» sigue ocupando media tarjeta.
- El aviso «formulario no conectado» ya no se ve de entrada (ahora aparece solo al enviar; está bien).

**375 px**
- Sin texto cortado ni desborde. Botón de cita visible en la primera pantalla (y ~413-467). Menú y botones ≥ 44 px.
- El anillo ya no lleva frases, pero debajo salen 4 nombres en lista y, ~350 px después, otra vez los mismos 4 nombres con su frase: se siente repetido.
- El arco vacío mide ~420 px: casi una pantalla entera de nada antes del texto del doctor.
- La escalera sube solo ~10 px por fila: apenas se nota.
- El hueco de reseñas se resolvió bien: citas apiladas con filetes horizontales.

## 6. ¿Cumple MEZCLA-2?
| Punto pedido | Cumple | Nota |
|---|---|---|
| Quitar la franja de dientes | Sí | No hay dientes en ninguna captura. |
| Fondo de la dueña visible: malla WebGL + estrellas | Sí, con una reserva | Visible en el hero. Abajo de ~1400 px en capturas altas solo hay degradado y estrellas CSS. |
| Ligero: media resolución, ≤ 30 fps, pausa oculta, un cuadro con movimiento reducido, respaldo CSS | Sí (por código) | Fps reales no medidos. Respaldo CSS verificado en el visor sin script. |
| Cresta de montañas | Sí | En el hero y antes del pie. |
| Capa fija de estrellas en CSS visible sin script | Sí | Se ven en el visor. |
| Foto del doctor una sola vez | Sí | Una vez por archivo, en el centro del anillo. |
| «Meet Dr.» con su texto pero sin foto | Sí | Con arco vacío y estrella; el hueco es grande. |
| Anillo solo con nombres; frase solo en la escalera | Sí | A 375 los nombres se ven dos veces seguidas. |
| Reseñas nuevas: cita grande + 2 de apoyo con filete vertical + enlace, sin pestañas, sin estrellas de puntuación, solo citas de `home.ts` | Sí | Muy cerca del diseño de la dueña. Nombres como en `home.ts`. |
| Todo lo demás de B2, §8, toque ≥ 44 px, cita en primera pantalla a 375 | Sí | |

## 7. Las 3 correcciones más importantes
1. **Achicar o llenar el arco del doctor** (§20.4, MEZCLA punto 3): hoy es un hueco de ~540 px (1440) y ~420 px (375) con una sola estrella. Hacerlo mucho más bajo, o ponerle el texto del doctor encima/dentro, o usar un dibujo de constelación, y quitar una de las 3 estrellas repetidas.
2. **Que el fondo se vea parejo en todo el lienzo** (MEZCLA punto 2): en la vista alta del lienzo la malla se corta a los ~1400 px y abajo queda azul plano. Repetir el degradado/resplandores a lo largo de la página (o varios bloques de malla) para que la dueña no vea dos fondos distintos; en el navegador real ya funciona por ser fijo. Medir los fps y el contraste del texto de apoyo (4.0:1 en lo más claro según la hoja) antes de dar por buena la malla.
3. **Quitar repeticiones y texto chico** (§20.8): a 375 no mostrar la lista de 4 nombres bajo el anillo (o convertirla en la lista con frase); subir el tamaño de los nombres de reseña y de las descripciones de la escalera; centrar «Read more patient reviews»; y aflojar el encabezado de 1440 (teléfono como enlace de texto está bien, pero con menos separación).

## No verificado
fps reales; WebGL en celulares; movimiento en vivo y fugaz; hover y teclado; lector de pantalla; otros navegadores; contrastes medidos con herramienta (usé la hoja); enlaces de referencias.
Skills: `impeccable` (crítica con capturas), `accessibility` (toque, foco, contraste revisados), `frontend-design-direction` y `design-system`. No toqué otros archivos del proyecto; mis archivos temporales están solo en mi carpeta de trabajo.
