# Revisión independiente · B4 «hero con figura How braces work» · Diseñador UI-UX 2
Revisor: `ld-disenador-uiux-2`. Yo no hice B4. Fecha: 18-11-2026. Encargo: `HERO-ANATOMY.md`; vara: `REVISION.md`.

## Cómo miré
Capturas reales con Edge sin ventana del visor local: `Estilo-B4.dc.html` a 1440 y `Estilo-B4-movil.dc.html` (ventana de 500 px; Edge no baja de ahí, el diseño sale a 375 de ancho útil). Acercamiento de la figura al paso 5 (escala 2) y a `brackets.html` en el paso 1 (escala 2.5). El visor no corre el script del lienzo: lo que vi es el paso final con respaldo sin script (paso 5) y la página suelta. No probé arrastre, teclado ni toque.

## Veredicto: PASA con reservas
El hero en 2 columnas funciona y la figura es un buen gancho. Reservas: los dientes parecen bloques, hay un texto que sugiere resultado, y la tarjeta tiene aire sin usar.

## Respuestas a lo pedido
- **Equilibrio y premium (1440):** sí. Izquierda titular serif de ~70 px con cursiva dorada, frase y 2 botones; derecha tarjeta de ~660 px. Los dos bloques terminan casi a la misma altura (texto ~615, tarjeta ~711). Se siente cuidado. Reserva: la base ocupa ~75 % del ancho de la tarjeta y deja ~70 px vacíos entre título y dibujo; se podría agrandar el modelo.
- **Claridad para un paciente / gancho:** buen gancho (objeto con perilla dorada, 5 pasos). A tamaño de hero se entiende «dientes con brackets y alambre»; los pasos 1 y 5 se leen bien. Reserva: los dientes son pilares rectos con corona cuadrada (los molares con cruz de 4 cuadros parecen dados) y la encía es una placa azul plana. Se acerca a «juguete de bloques / maqueta técnica» más que a dentadura; no es infantil por el color, pero tampoco es de clínica premium. El manómetro sin números es decoración que un paciente no entiende (¿qué mide?).
- **Paleta B3:** respeta. Oro solo en: perilla, botón del paso elegido y cursiva del título/lectura (la cursiva del titular ya era de B3). Ligas en cielo. Sin oro de más.
- **¿Compite la figura?** No con el titular: el titular blanco de 70 px sigue siendo lo primero. Con el doctor tampoco: el anillo bajó a su sección y sigue siendo única foto. La figura es lo más detallado de la pantalla, pero eso es lo pedido.
- **375 px:** orden correcto: titular, frase, «Request an appointment» y «Call or text» primero; figura después; anillo del doctor luego. Sin cortes ni desborde. Reserva: la figura a 375 mide ~220 px de ancho de dibujo; los brackets y las ligas casi no se distinguen, y la pista y la nota (~13 px) quedan pequeñas.
- **Textos nuevos:** claros en general. Reservas: «Teeth lined up» y «Gentle, steady pressure» prometen resultado y ausencia de molestia; la hoja ya lo avisa. «Illustration. Individual results vary.» está bien. Cambiar por «Archwire in place» / «Teeth moving» como propone la hoja. Además la figura solo muestra brackets metálicos con ligas; el sitio dice «Invisalign y brackets»; está anotado, pero conviene que la dueña lo vea.
- **Calidad del dibujo de cerca:**
  - Extremos de la encía: se ve el corte plano con escalón en ambos lados del arco (hoja ya lo marca como pendiente). Queda feo a 3×: se ve el hueco de la cresta cortado en recto.
  - Alambre: limpio, pasa por todas las ranuras; la cola derecha sobresale ~30 px del último molar y el extremo izquierdo sube por encima del molar; plausible. En el paso 1 el alambre no aparece: bien.
  - Orden de pintado: dientes bien entre sí; el molar de la esquina izquierda tapa parte de su vecino con aspecto de «cubo apilado». No vi alambre atravesando coronas, pero el tramo de borde que la hoja deja sin probar sigue sin probar.
- **Logo de la cabecera a 1440:** **sí se ve** en mi captura (logo azul «Luminous Dental» con estrella brillante dentro de la píldora de la cabecera, a la izquierda). Es un archivo en `--logo-img: url("/_blob/…")`: si el visor no lo cargó en la captura del diseñador, es un tema de carga de ese recurso, no de B4 (B4 lo hereda de B3). No lo pude reproducir. Pequeña nota de contraste: el logo es azul medio sobre píldora azul oscura; legible pero discreto.

## Lista corta de arreglos (en orden)
1. **Cambiar «Teeth lined up» y «Gentle, steady pressure»** por frases de proceso («Archwire in place», «Teeth moving») y esperar el visto bueno de la dueña. (Promesa de resultado/molestia.)
2. **Dientes menos bloque:** redondear coronas (arriba cóncavas, bordes más suaves), quitar la cruz de 4 cuadros en molares o hacerla surcos finos; teñir la encía con un tono propio (por ejemplo, rosa/ciruela muy apagado dentro de la paleta) para que los dientes no floten sobre una placa azul.
3. **Terminar los extremos de la encía** (redondear o cerrar con tapa, sin escalón) y revisar a 4× la cola derecha del alambre, como la hoja ya deja pendiente.
4. **Agrandar el modelo en la tarjeta** (recortar el aire arriba y a los lados) y, a 375, ampliar el dibujo o acercar la vista al arco para que se vean brackets y ligas; subir pista y nota a ≥ 14 px.
5. **Quitar o explicar el manómetro** (sin números no dice nada a un paciente); si se queda, una rotulación corta o simplificarlo.
6. **Subir el contraste del logo** en la cabecera (borde o fondo ligeramente más claro/oscuro) y confirmar que carga; verificarlo en el lienzo real.

## No verificado
Arrastre, teclado, toque real, movimiento en bucle, `prefers-reduced-motion`, fps, lector de pantalla, contraste medido con herramienta, lienzo DC real, otros navegadores. Skills usadas: `impeccable` (crítica con capturas), `frontend-design`, `accessibility` (tamaño de toque y texto, sin medición), `design-system`. No toqué archivos de diseño ni git; mis capturas están en mi carpeta temporal.
