# Revisión independiente (manual §35) · B2 «El anillo bajo las estrellas» · Diseñador UI-UX 2
Revisor: `ld-disenador-uiux-2`. Yo no hice B2. Trabajé solo. Fecha: 18-11-2026.
Capturas reales con Edge sin ventana: 1440 (página completa, 8700 alto) y 375 (la captura directa de Edge a 375 sale recortada porque Edge no baja de ~500 px de ancho; la repetí dentro de un marco de 375 px exactos y esa es la que juzgo). Texto de `home.ts` comparado a ojo con lo que se ve: coincide, sin precios, horario ni calificación.

## 1. Veredicto: **PASA, con reservas** (no reprueba §20: 0 fallas duras; 3 puntos quedan «no verificado»)
Es una mezcla fiel a lo que pidió la dueña. Lo flojo es la franja de dientes (demasiado grande y brillante) y que las estrellas y el movimiento no se pueden ver en el visor.

## 2. Lista premium §20
| # | Punto | Resultado | Lo que vi |
|---|---|---|---|
| 1 | Tipografía con carácter | PASA | Newsreader ligera, titular de ~118 px en el hero y ~116 px en «We help you keep your own teeth»; Figtree acompaña. Es la letra de la dueña, con razón escrita. |
| 2 | Pieza firma | PASA con reserva | El anillo con el doctor y la estrella dorada se distingue. Pero la franja de dientes, mucho más brillante, le compite como segunda pieza. Y el anillo muestra al doctor, no «trabajo»; sin antes/después aún, es lo que hay. |
| 3 | Movimiento con intención | NO VERIFICADO | En el visor todo se ve quieto (estrellas, dientes, logo). Por el código hay varios movimientos continuos a la vez (estrellas, fugaz, logo, arcos, dientes): pasa de «un solo momento». La dueña pidió estrellas y logo, así que es aceptable, pero hay que verlo vivo. |
| 4 | Retícula editorial y aire | PASA | Titular gigante contra texto pequeño, notas desfasadas, escalera, arco. No hay dos secciones seguidas con la misma forma. |
| 5 | Fotografía tratada | PASA con reserva | Una sola foto real, tratada igual (círculo y arco con marco azul). La caja «Real clinic photo · POR CONFIRMAR» está marcada. La misma foto sale dos veces. |
| 6 | Paleta con acento disciplinado | PASA con reserva | Noche, cielo y oro. El oro sale más veces que «solo donde está la estrella» (cursiva del titular, «General Dentist», filetes). Los dientes añaden otro blanco-azul muy fuerte. |
| 7 | Referencias vivas | NO VERIFICADO | La hoja dice «heredadas de B»; no vi enlaces nuevos para esta mezcla. Sin enlace no cuenta. |
| 8 | Detalle de acabado | PASA con reserva | Foco dorado visible, hover del arco y de la fila, iconos de un solo set, sin `transition: all`, botones ≥ 44 px. Falla pequeña: la casilla del consentimiento mide 28 px (la etiqueta completa sí llega a 52 px de alto, así que se puede tocar). |

## 3. Delatores y antipatrones §8
- **Una frase del titular en itálica y otro color** («last a lifetime», itálica dorada): delator de §8, pero el diseño de la dueña lo hace igual («the family.»). Permitido porque lo pidió; anotarlo.
- **Etiqueta en MAYÚSCULAS** «CONTACT» en el pie (a 1440 y a 375): delator menor de §8. Quitarla o ponerla normal.
- **Google Fonts** (Newsreader/Figtree): §8 lo prohíbe en producción; la hoja dice que en la web real irán locales. Hay que cumplirlo.
- **Animar todo:** riesgo de §8 («animarlo todo») por la suma de estrellas, logo, dientes y arcos. Ver punto 3 de §20.
- Lo demás no apareció: sin degradado morado, sin blobs, sin tarjetas iguales en fila, sin números 01/02, sin flechitas «→», sin carrusel, sin cifras inventadas. El hero no es «texto izquierda, foto derecha».
- «Foto en arco» de §8: se usa un arco para el doctor, pero es pedido por la dueña y va con pieza firma; no cuenta como falta.

## 4. Prueba del gemelo
Para otra clínica dental con el mismo encargo saldría: hero centrado con titular grande, foto de doctor, lista de servicios, reseñas, formulario. Eso es común. Lo que NO saldría igual: el anillo con la estrella dorada, el azul noche con estrellas y el logo que se ilumina (viene de la dueña), la escalera de servicios y las notas desfasadas. **La franja de dientes** sí es nueva y propia, pero la ejecución actual parece un letrero («una dentadura de plantilla»), no una decisión fina. Gemelo: medio, salvado por el anillo y el cielo.

## 5. Problemas concretos
**1440 px**
- Franja de dientes: ~220 px de alto, dos filas, blanco-cielo muy brillante; es lo más claro de toda la página, pesa más que el anillo y el botón. Los dientes de las orillas se ven grises y apagados (se ve como vidrio sucio).
- Hueco de ~200 px entre el anillo y la cresta de montañas; el anillo queda con mucho aire muerto entre los textos de arriba y de abajo.
- La cresta del hero se corta recta contra la franja de dientes (borde duro).
- Se repite: el doctor en el anillo y otra vez en el arco (2 pantallas después); los 4 servicios en el anillo y otra vez en la lista (misma frase palabra por palabra, a ~600 px de distancia).
- Caja de foto vacía «POR CONFIRMAR»: ocupa media tarjeta y deja un hueco grande (correcto como marcador, pero se ve vacío).
- Pie: ~180 px vacíos antes de la cresta; las columnas del pie quedan pegadas a la izquierda mientras el logo y el titular van al centro; la tercera columna casi vacía.
- Mitad baja de la página: el fondo se ve gris-azul plano, sin el resplandor ni las estrellas del diseño de la dueña. Las estrellas no aparecen en ninguna captura (el visor no corre el código): **no verificado**.
- Texto de apoyo chico (~14–15 px) en las descripciones del anillo y de la escalera.

**375 px**
- Sin texto cortado ni desborde horizontal visible. Botón de cita visible en la primera pantalla (y 413–467 de 812). Menú, botones y filas ≥ 44 px.
- El anillo pierde sus 4 nombres alrededor y pasa a lista debajo: queda un círculo con foto y luego la lista. Funciona, pero la pieza firma se ve menos «firma».
- Las 3 notas de «Why» ya no van desfasadas (normal). La escalera sube solo ~10 px por fila: apenas se nota como escalera.
- El titular del hero baja a ~44 px (pantalla chica; aceptable).
- Dos filas de dientes se ven más pequeñas y repetitivas que a 1440.

## 6. ¿Cumple cada punto de MEZCLA-1?
| Punto pedido | Cumple | Nota |
|---|---|---|
| Base B (orden, anillo, reseñas, cobertura, formulario) | Sí | Orden conservado; la lista de servicios reemplaza las pestañas de B. |
| Fondo azul noche con resplandor, grano y estrellitas | Parcial | Resplandor y noche sí (arriba). Estrellas: código presente (canvas con estrellas que respiran y fugaz cada ~10 s, quieto con movimiento reducido), pero **no se ven en el visor**; no verificado. Abajo el fondo se ve plano. |
| Logo real que se ilumina | Sí | Logo en encabezado y pie con destello. No lo cuento como falla. |
| Colores y letra de su DESIGN.md | Sí | Newsreader + Figtree, noche/cielo/oro, botón blanco redondo con tinta azul. |
| Oro solo en la estrella | Parcial | También en cursiva del titular, «General Dentist» y filetes (filetes sí permitidos por su DESIGN.md). |
| Filetes finos, arco, cresta de montañas arriba del pie y al pie del hero | Sí | Todo presente. |
| Franja de dientes de A, en mundo noche, sin tapar el anillo | Parcial | Está bajo el anillo y no lo tapa, y encendido del centro afuera (por código). Pero es demasiado grande y clara: no se siente «noche», se siente un bloque de luz. |
| Sección Why de C (título pequeño, frase grande, lede a la derecha, 3 notas desfasadas) | Sí | Muy fiel a 1440. |
| Lista de servicios en escalera de C, junto o bajo el anillo | Sí | Escalera clara a 1440, con hover que corre la fila. |
| Texto de `home.ts` tal cual | Sí | Sin «Care for every smile…». |
| Sin horario, calificación, precios | Sí | No aparecen. |
| Foto real solo del doctor; caja «POR CONFIRMAR» | Sí | |
| Botón de cita en la primera pantalla a 375, toque ≥ 44 px | Sí | |

## 7. Las 3 correcciones más importantes
1. **Bajar el peso de la franja de dientes** (§20.2, §20.6, MEZCLA «mundo noche»): menos alta (una fila o ~120 px), colores más apagados (porcelana tenue con halo, no blanco brillante), orillas sin el gris sucio, y que se funda con la cresta en vez de cortar recto. Hoy compite con el anillo, que es la pieza firma.
2. **Verificar en vivo estrellas, dientes y logo, y bajar el movimiento a lo pedido** (§20.3, MEZCLA fondo estrellitas): abrir en el lienzo real o en navegador, comprobar que hay estrellas en toda la página (la mitad baja se ve plana), y que con `prefers-reduced-motion` todo queda quieto. Si hay demasiado a la vez, dejar el logo y las estrellas y calmar el resto.
3. **Quitar repeticiones y huecos** (§20.4, §20.5): el doctor sale dos veces y los 4 servicios dos veces con la misma frase; cerrar el hueco entre anillo y cresta y el del pie (~180–200 px), alinear las columnas del pie con el centro y quitar la etiqueta «CONTACT» en mayúsculas (§8). Opcional dentro de esto: poner las fuentes locales antes de producción (§8).

## No verificado
Movimiento en vivo, estrellas visibles, hover y teclado en vivo, clic en las pestañas de reseñas, lector de pantalla, otros navegadores, enlaces de referencias, contraste medido con herramienta (confié en la hoja).
Skills: `impeccable` (crítica a ojo con capturas), `accessibility` (toque, foco, contraste revisados en código y captura), `frontend-design-direction` y `design-system` (lectura de carácter y consistencia). No toqué ningún otro archivo; cerré mi servidor temporal de capturas al final.
