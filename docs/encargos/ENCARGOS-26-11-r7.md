# Plan · Ronda 7 · Estilo «sin tarjetas, con líneas» (para seguir desde otra cuenta)

Estado al 26-11-2026 (noche): rondas 1–6 hechas, typecheck y build en verde, **nada guardado en GitHub** (rama actual `webpage-V2.24.11.26`, último commit `bd56f36` del 24-11). La prueba de la ronda 6 (inicio sin fondos de tarjeta, `styles/home-lines.css` bajo `.home`) **le gustó a la dueña** y se extiende.

Reglas comunes: iguales a `ENCARGOS-26-11-r4.md` (frase literal de la dueña en cada punto; no reinterpretar; si una palabra no cuadra, preguntar una línea antes de lanzar; EN y ES; sin librerías; movimiento reducido y pausa; typecheck + build + Playwright msedge 375/768/1440 EN/ES; capturas `*-26nov-r7.png`; entrada en `docs/bitacora.md`; sin commit; cada agente solo sus archivos y cierra su servidor). La dueña dicta por voz: «sección R» = sección **hero**; «Führer» = **footer**; «Sara» = **SAHARA**; «la queji» = **Dental Nakeji**.

**Criterio nuevo de la dueña (aplica a todo lo de abajo):** «al no tener fondo, las letras y el contenido se van a pelear [con el cielo]. Hay que reforzar esa parte, el contenido de las letras, para que el fondo sea nomás un fondo literal, sin subtarjetas con color. Que el departamento vea qué se le ocurre. Si ven necesario redimensionar el tamaño, está bien; ocupamos ajustar medidas.»
→ Sin cajas de fondo; la legibilidad se gana con tipografía (tamaño, peso, interlineado, ancho de línea), espacio, líneas finas y, si hace falta, un velo muy suave del cielo detrás del texto **no visible como tarjeta**. Contraste AA medido con captura de **ventana** (no de página completa).

## Paso 1 · Terminar el inicio (D2 `ld-disenador-uiux-2`, dueño de `styles/home-lines.css`)
1. **Legibilidad sin fondo** en todas las secciones del inicio (criterio de arriba). Se permite cambiar tamaños y medidas.
2. **Seguros (dueña):** «déjale nomás el logo original, eso no lo pongas en blanco. Transformarlo a PNG sin fondo… respetando sus colores originales, no modifiques nada. Abajo tiene el nombre de la aseguranza: quítaselo, que esté el puro logo». → Quitar el filtro blanco; logos a color original en **PNG con fondo transparente** (convertir los `public/insurers/*.webp` quitando solo el fondo blanco/placa; sin recolorear; guardar `public/insurers/png/*.png`); sin el nombre debajo del logo (el nombre sigue en `alt`). Solo en el inicio, salvo que la página de Seguros use la misma pieza: en ese caso preguntar.
3. **SAHARA (dueña):** «centrar un poquito lo del logo y redimensionar bien, porque se quedó un poco vacío». → Logo centrado en su columna y más grande; el bloque sin hueco.
4. **Featured services, etiqueta «Most requested» (dueña):** «se ve un poco raro encima de la línea; modifícalo». → Que no quede montada sobre la línea: integrarla al encabezado del servicio o como texto menta junto al título.
5. QA (`ld-qa-*`, 1 agente) contra estas 4 frases: CUMPLE / NO CUMPLE.

## Paso 2 · Extender el estilo a las páginas aprobadas (en paralelo, un agente por grupo)
**Dueña:** «servicios sí, visto bueno; beneficios en general, visto bueno; contacto, visto bueno; about, visto bueno. Lo demás todavía no: lo de More todavía no se modifica.»
- Mismo lenguaje del inicio (sin fondos de tarjeta, líneas finas, divisores, detalle «el marco se dibuja», legibilidad reforzada). Reusar las reglas de `home-lines.css`: pasar lo común a un archivo compartido (p. ej. `styles/lines.css` con una clase `.lines`) y aplicar la clase en cada página aprobada; el inicio sigue igual.
- **Las tarjetas de reseñas de Google no se tocan** en ninguna página.

| Agente | Páginas | Archivos |
|---|---|---|
| D2 `ld-disenador-uiux-2` | Primero extrae `styles/lines.css` del inicio (sin cambiar cómo se ve); luego **About** | `styles/lines.css`, `home-lines.css`, `pages/About.tsx`, `about.css` |
| F2 `ld-frontend-2` | **Beneficios**: hub, Seguros, Financiamiento (hub y cada financiera), Convenios | `pages/{Benefits,Insurance,FinancingHub,Financing,Agreements}.tsx`, `BenefitsHeader.tsx`, `SaharaFeature.tsx`, `benefits*.css` |
| F1 `ld-desarrollador-web` | **Servicios** (hub y cada servicio) y **Contact** | `pages/{Services,Service,Contact}.tsx`, `services-hub.css`, `service-*.css`, CSS de Contact |
F1 y F2 empiezan cuando D2 entregue `lines.css`.

**No tocar (dueña: «todavía no»):** todo lo del menú «More»: FAQ, Blog y artículos, Términos, Privacidad. Tampoco encabezado ni pie.

## Paso 3 · Cierre
1. QA (2 agentes: funcional/visual y accesibilidad/contraste) contra las frases de la dueña, 375/768/1440 EN/ES.
2. Typecheck + build del Jefe; revisión en navegador.
3. Bitácora, decisiones y nota del proyecto en la bóveda.
4. **GitHub solo con orden de la dueña:** rama nueva `webpage-V<n>.<día>.<mes>.<aa>` (`main` no se toca), typecheck + build antes, verificar con `git ls-remote origin`.

## Pendientes de la dueña o la clínica (no bloquean)
Textos nuevos POR APROBAR (`docs/datos.md`) · permiso de fotos (antes/después de Nakeji, personas del blog) · ¿All-on-4/6 en Luminous? · descripción de Dental Appliances · «4 años» del Dr. Hahn · revisión legal de Términos/Privacidad · lista real de aseguradoras (24 de Nakeji vs 15 oficiales).
