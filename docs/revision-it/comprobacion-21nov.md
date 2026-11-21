# Comprobación independiente · 21-nov-2026 (QA 5)

Quién: QA 5 (no hizo los cambios). Página: http://localhost:5180. Edge con ventana (`channel: msedge`), 1440×900 y **375×812 con escala 2** (innerWidth medido = 375). No se cambió código ni git. No se enviaron datos: todo envío válido se bloqueó (solo se probó vacío y datos inválidos). Scripts y capturas de trabajo: carpeta del scratchpad `qa21`.

## Resultado por punto

| # | Punto | Veredicto |
|---|---|---|
| 1 | Héroe derecho (antes/después) | **PASA** |
| 2 | Botones flotantes | **PASA** (con notas) |
| 3 | Formulario en 3 secciones | **PASA** |
| 4 | Formulario después del Dr. Hahn | **PASA** |
| 5 | Contacto (orden y ficha) | **NO PASA** (orden bien; apertura de la ficha con clic falla a veces) |
| 6 | Nada roto | **PASA** |

## 1. Héroe (observado)
- Quieto 15 s: `--pos` 50 % y fotos iguales al inicio y al final; 0 animaciones corriendo dentro del comparador. Los píxeles del interior de la foto son idénticos (0 diferencias). Solo cambian ~0,5 % de píxeles en las esquinas redondeadas: es el fondo de estrellas de la página que se ve por detrás, no el comparador.
- Arrastre con mouse: 50 → 24 → 81 (1440) y 24 → 82 (375). Teclado: ← resta 1, Home = 0, End = 100, PageDown resta 10; `aria-valuetext` se actualiza.
- Botones Before/After: 100 y 0, con `aria-pressed` correcto. Los 2 casos («A different future», «No longer hidden») cambian de fotos y de pie. Aparece «Individual results vary.» en ambos.

## 2. Flotantes (observado)
- Contenedor `position: fixed`; las 3 fichas no se movieron entre mediciones tras hacer scroll; ninguna rotación (solo una escala fija interna 0,62). Única animación corriendo: el anillo de progreso (por scroll).
- Tamaños: 1440 → pausa 44, arriba 52, WhatsApp 52; 375 → 44, 46, 46. Todos ≥ 44 px.
- Nombres: «Pause decorative animations» / «Play decorative animations», «Back to top», «WhatsApp (coming soon)».
- Pausa: animaciones infinitas 81 → 0 y vuelve a 81–82 al reanudar (1440 y 375). Volver arriba: scrollY = 0.
- Aspecto de ficha (canto con bloques azul/porcelana, filete dorado, ícono centrado): se ve en las capturas; no se midió pixel por pixel.
- Notas: (a) se ocultan por diseño mientras el formulario está en pantalla (`data-actionbar=form`). (b) En 375 suben 63 px entre el héroe y las demás secciones (barra de acción) y quedan encima del contenido (se ven sobre la foto y sobre la tarjeta de contacto). (c) WhatsApp es solo adorno sin enlace porque aún no hay número (dato POR CONFIRMAR).

## 3. Formulario (observado)
- Leyendas: «Your details», «Your visit», «Message and consent».
- Enviar vacío: 6 errores (nombre, apellido, teléfono, email, tratamiento, consentimiento), foco en `firstName`, mensaje «Please complete the highlighted fields.». Con datos inválidos: foco en `phone`, errores de teléfono, email, tratamiento y consentimiento. Con datos buenos pero sin tratamiento ni consentimiento: foco en `treatment`. Igual en 1440 y 375.
- Observación menor: al teclear «123» el teléfono queda «23» (el formato quita el 1 inicial). Parece intencional (código de EE. UU.), no verificado.

## 4. Orden en el inicio (observado, 1440)
`#doctor` (y=860) → `#appointment` (y=1548) → adorno decorativo (cordillera) → `#services`. En 375 igual (1044 → 1476 → 3600). El formulario va justo después del Dr. Hahn.

## 5. Contacto
- Orden a 375 (inicio y /contact): letrero (y=8586 / 172) → tarjeta con address, phone, email y redes (8846 / 432) → ficha del mapa (9223 / 810). Correcto. A 1440: letrero arriba a la izquierda, tarjeta debajo, mapa a la derecha; sin cambios.
- Ficha: abre y cierra con Escape, con el botón y con Enter (teclado) en los dos tamaños.
- **Falla observada (por eso NO PASA):** en 1440 (/contact y inicio) y en 375 (inicio), tras esperar unos 2 a 5 s, el botón de la ficha crece de 260×260 a todo el escenario (875×611 en 1440; 324×420 en 375) y un clic real en el centro de la moneda **no abre** (4 de 6 intentos). Con Enter sí abre. En el mismo tipo de prueba hecha rápido, el clic sí abre. Repetible (3/3 en /contact 1440 con 4 s de espera). No se sabe si viene de los cambios de hoy (hoy solo se movió el orden en `reviews.css`); puede ser anterior. Recomendado: que Frontend lo revise (`LocationMap.tsx`, tamaño de `.loc__toggle` y su manejo de clic).

## 6. Nada roto
- Consola: 0 errores y 0 avisos, 0 peticiones fallidas, en 1440 y 375 (recorriendo inicio, about, services, insurance, contact, blog y todos los enlaces).
- Enlaces internos: 43 revisados, 0 rotos (los 5 anclas `#general`, `#cosmetic`, `#orthodontics`, `#pediatric`, `#articles` existen en /services y /blog).
- Desborde horizontal: ninguno en 1440 ni en 375 (ancho de contenido 360 con barra de 15 px).

## Capturas finales (docs/reportes/historial-visual/)
`heroe-1440-21nov.jpg`, `heroe-375-21nov.jpg`, `contacto-375-21nov.jpg`, `formulario-1440-21nov.jpg`.

## No verificado
Contraste y lector de pantalla reales; WCAG completo (no se corrió axe); rendimiento; Safari/iPhone real; la ficha del mapa en tablet.
