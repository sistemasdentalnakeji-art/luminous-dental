# /insurance-financing · diseño sacado de las fuentes («El camino»)

Estado: PROPUESTA para la dueña (no programada). Autor: Diseñador UI-UX 1 · 20-11-2026.
Maqueta temporal: `apps/web/public/_maquetas/aseguranzas-fuentes.html` (http://localhost:5181/_maquetas/aseguranzas-fuentes.html). Revisada a 1280 px y a 375 px.
Reemplaza la «Marquesina» y las 3 opciones rechazadas (Directorio A–Z, Pregunta y respuesta, Franja de día). Tampoco se parece al tablero de Dental Nakeji.

## 1. La idea (para la asistente)
La página se lee de arriba abajo como el camino real del paciente: 1) dice cuál es su seguro y lo busca entre los logos, 2) el equipo lo revisa con él, 3) pide su cita. Una sola línea celeste une los tres pasos, y los logos van en cuadritos blancos limpios, sin marcos, focos ni cuadrículas de líneas. En el celular aparece abajo una barra fija con «Request» y «Call».

## 2. De qué fuente sale cada decisión
Páginas abiertas el 20-11-2026 (texto leído con WebFetch; no se vieron en pantalla, solo las capturas de `docs/referencias/`).

| Fuente | Qué se toma | Qué no |
|---|---|---|
| Dee for Dentist, `deefordentist.com/patient-financing/` | Los logos de seguros son su propia sección con título claro «Insurance Options» (22 logos); el financiamiento va aparte. Teléfono y «Book» siempre a mano | Logos rotos (alt «Lending-club-logo»), 15 secciones, banner de promoción |
| Absolute Dental, `absolutedental.com/insurance-payment-options/` | Logos sobre blanco, mismo tamaño; «two simple ways to request an appointment» (llamar o formulario); plan para quien no tiene seguro | Ofertas «$39», 34 sucursales, logos repetidos dos veces |
| A Great Smile, portada (sección «Dental Insurance We Accept») | Pasos cortos: tarjeta → el equipo revisa y explica → ayuda con pagos; «¿no está su plan? llame» | Lista de puntos sin logos; precios $99/$149 |
| Sweet Smiles, `sweetsmilesdentist.com/dental-insurance` | Bloque «Is your insurance not listed?» y «No insurance?» al final; se explica qué hace el equipo (revisar, explicar costos) | Solo texto sin logos, el «More» escondido |
| Rose, `dentalrose.com/dental-insurance.html` | Barra fija en celular «Request an Appointment · Call» (captura sector-rose-1440.jpg) | Página larga de explicación; cabecera oscura |
| One Medical (fuera-onemedical-1440.jpg) | Una línea curva que guía la vista y un único botón de cita | Azul genérico |
| Oura / Aesop (fuera-*.jpg) | Mucho aire, una sola idea por zona, titular serif grande | Fondo crema, tono de producto de lujo |
| `docs/competencia.md` | «Página de seguros y financiamiento con pasos claros» (Dee, Sweet Smiles); nada de precios o promos sin respaldo | CareCredit/Cherry, membresías y cifras: la clínica no los ha confirmado |
| `docs/marca.md` | Voz cálida, «Request an appointment», nada de «we accept», cero «best/top» | Frases sin sostén |
| `docs/decisiones.md` y `tokens.css` | Misma lista de 24 aseguradoras (orden de la dueña); azul noche, dorado, celeste, Newsreader + Figtree. Sin tokens nuevos | Papel/crema (ya usado en opciones rechazadas) |

No verificado: las páginas de Dee/Absolute/Sweet/Rose se leyeron como texto; de Aspiring Smiles la página de seguros dio 404 (no cuenta); cómo se ven en celular no se comprobó.

## 3. Especificación técnica
Textos de `insuranceText` se reutilizan. Los marcados * son nuevos y deben aprobarse antes de publicar (no afirman nada que la clínica no haya dicho; «bring your insurance card» está en A Great Smile, POR CONFIRMAR para Luminous).

**pages/Insurance.tsx**
- Hero: eyebrow, `h1`, lead, botón `T.book` (`#appointment`) + `tlink` de teléfono (`clinic.phone.href`, `home.footer.phone.label`). Se quita la `ins-steps-card` (el camino la reemplaza).
- `<ol class="ins-path">` con 3 `<li class="ins-step">` (`.ins-dot` aria-hidden con el número; el contenido ya es una lista ordenada):
  1. `h2` `T.steps[0]` + `<InsurancePlans />` + `T.note`.
  2. `h2` `T.steps[1]` + párrafo* «Bring your insurance card to your visit. We check your plan with you and explain what to expect before any treatment.» + `T.payment`.
  3. `h2` `T.steps[2]` + botón `T.book` + teléfono. `id` del paso 3 solo si se necesita ancla.
- Se mantienen la tarjeta SAHARA (`.ins-sahara`) y `<Appointment />`. Se puede quitar `insuranceText.gridTitle` (ya no se usa).

**components/InsurancePlans.tsx**
- Mantiene el buscador y el estado «sin resultados» tal como están (label real, `role="status"`, `countAll/countSome/countNone`, botón «Show all plans», llamar). Solo cambia el contenedor: `ins-board` pasa a `ins-wall`.
- `<ul class="ins-wall">` con 24 `<li class="ins-plan">`; cada `img` igual que hoy (`/insurers/<archivo>.webp`, `alt={nombre}`, width/height, `--ar`, lazy). Sin JS se ven los 24.

**styles/insurance.css**
- Borrar: `.ins-board`, sus `::before/::after`, `@keyframes ins-bulbs`, `.ins-steps-card`, `.ins-steps`.
- `.ins-path{display:grid;gap:clamp(40px,5vw,64px)}`; `.ins-step{position:relative;display:grid;grid-template-columns:44px minmax(0,1fr);column-gap:clamp(16px,3vw,40px)}` (móvil ≤700: 36 px).
- Línea: `.ins-step::before{left:21px;top:44px;bottom:calc(-1*gap + 4px);width:2px;background:linear-gradient(var(--color-sky),rgb(123 195 235/.25))}`; el último paso sin línea.
- `.ins-dot`: 44 px, círculo borde 1.5 px `--color-gold`, fondo `--color-surface`, número Newsreader 22 `--color-gold-soft`, `tabular-nums` (es la misma pieza que `.ins-steps li::before` de hoy).
- Muro: `.ins-wall{display:grid;gap:10px;grid-template-columns:repeat(2,1fr)}`; ≥560 px 3 columnas; ≥960 px 6 columnas, gap 12. `.ins-plan{height:76px;border-radius:14px;background:#fff}`; `img{width:min(calc(40px*sqrt(var(--ar,4))),128px);max-height:46px;object-fit:contain}`. Con filtro activo: `box-shadow:0 0 0 2px var(--color-gold)`.
- Foco visible dorado 3 px; botones ≥44 px; sin animaciones nuevas (la maqueta no usa ninguna).
- Barra fija móvil (opcional, ≤700 px): `.ins-mbar` fija abajo con «Request» (`T.book`) y «Call» (`clinic.phone.href`), fondo `rgba(10,21,41,.96)`, `padding-bottom` + `safe-area-inset-bottom`; añadir `padding-bottom` al `body` de la página. Si la dueña la quiere en todo el sitio, es otra tarea (toca `Layout.tsx`).

**content/insurers.ts**: la lista de 24 no cambia. Añadir `step2` (texto* de arriba). No agregar «we accept», precios, CareCredit ni membresías.

## 4. Pendientes
- La clínica confirma que la lista de 24 aplica a Luminous y los textos* del paso 2.
- Decidir si la barra fija móvil entra solo aquí o en todo el sitio.
- Contraste de los logos sobre blanco: son los mismos que ya se usan; revisar al programar.
