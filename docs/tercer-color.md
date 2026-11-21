# Tercer color de acento · Luminous Dental

Fecha: 20-11-2026. Autor: Diseñador UI-UX 1. Maqueta: `docs/maquetas/tercer-color.html`. No se tocó el código del sitio.

## 1. Lo observado
- **Dental Nakeji** (solo lectura, `Codigo - Pag/src/styles/global/tokens.css`): su "amarillo" es `--color-gold: #e0b65c`. Se usa en títulos del pie, raya dorada de 34 px, hilo de luz, estrellas, aros de foco, botones animados y resplandor del mapa.
- **Luminous hoy** (`apps/web/src/styles/tokens.css`): `--color-gold: #e0b65c` (el MISMO valor que el amarillo de Nakeji) y `--color-gold-soft: #f3d79a`. Es decir, hoy Luminous ya se ve como Nakeji en las palabras destacadas.
- Dónde carga el dorado en Luminous (`site.css`): `.hero h1 em` (l.115), `.accent` (l.324), `.pill` (l.323), `.blog-card__topic` (l.382), `.art-next__label` (l.409), `.contact-item__label` (reviews.css l.113), `.bx-name` (figure.css l.62), `:focus-visible` (l.28), `.h2::after` raya (l.150), `.stars`, `.row::before` estrella, `.carousel__dot/tab`, `.service-card__check`, `.ins-dot`.
- Es decir, el dorado hace DOS trabajos: texto destacado y detalles. Por eso todo se ve de un solo color cálido.

## 2. Reemplazar o convivir
**Convivir, con reparto de trabajos.** El dorado es la "estrella" de la marca (estrellas de reseñas, destello, foco, rayas, checks). Se queda para detalles pequeños y funcionales. El tercer color se encarga solo del **texto destacado** (palabras en cursiva, etiquetas, pastillas, temas). Así el dorado deja de parecer "el amarillo de Nakeji" porque ya no pinta títulos.
No se reemplaza: quitarlo rompería estrellas de reseñas y el anillo de foco, que ya cumplen contraste 9.6:1.

## 3. Candidatos
Contraste medido (fórmula WCAG 2.x; fondo noche `#0a1529`, tarjeta `#0d1c37`, blanco `#fff`). AA: 4.5:1 texto normal, 3:1 texto grande/íconos.

| | Color | Sobre noche | Sobre tarjeta | Sobre blanco |
|---|---|---|---|---|
| A. Coral neón | `#ff9a8b` | 8.89 (AA y AAA) | 8.27 | 2.05 (no sirve) -> versión oscura `#c2410c`: 5.18 AA |
| B. Lavanda crepúsculo | `#b9a8ff` | 8.77 | 8.16 | 2.08 (no sirve) -> versión oscura `#5b3fd6`: 6.72 AA |
| C. Menta clínica | `#6fdcc4` | 11.03 | 10.26 | 1.65 (no sirve) -> versión oscura `#0f766e`: 5.47 AA |
| (ref.) dorado actual | `#e0b65c` | 9.56 | 8.89 | 1.91 |

El sitio hoy es todo oscuro, así que lo que cuenta es la columna "noche". Si algún día hay zonas blancas, usar la versión oscura.

### A. Coral neón `#ff9a8b` (recomendado)
- Encaja: es el rosa-naranja de un letrero de neón al atardecer en Las Vegas, y a la vez un tono cálido de encía y labios sanos: suena a clínica amable, no a hospital. Se separa del dorado (es más rosado) y del azul (opuesto en el círculo de color).
- Dónde: `.hero h1 em` y `.accent` (palabra en cursiva de titulares y títulos de sección); `.pill`; `.blog-card__topic`; `.art-next__label`; `.contact-item__label`; `.bx-name` (nombre del paso en la figura).
- Riesgo: junto al dorado, los dos cálidos pueden competir. Por eso el dorado se limita a detalles pequeños.

### B. Lavanda crepúsculo `#b9a8ff`
- Encaja: el último tramo del cielo entre el azul noche y el celeste; une con el fondo, muy elegante. Distinta de todo lo que ya hay.
- Dónde: los mismos selectores que A.
- Riesgo: el morado suave es muy común en páginas hechas en serie y se aleja de lo "cálido" que pide la clínica. Se lee más tecnológico que dental.

### C. Menta clínica `#6fdcc4`
- Encaja: limpieza, frescura, aliento fresco; es el color más "dental" de los tres.
- Dónde: los mismos selectores que A.
- Riesgo: es un tono frío, cercano al celeste `#7bc3eb` (se confunde con él en tamaños pequeños) y hace que todo el texto de acento sea frío; se pierde la calidez.

## 4. Recomendación
**A. Coral neón `#ff9a8b`**, conviviendo con el dorado. Sería un token nuevo en `tokens.css` (por ejemplo `--color-coral: #ff9a8b`) y cambiar `color` en los 7 selectores de arriba; los detalles dorados no cambian. Hay que pedir ese cambio al desarrollador web con orden del dueño; aquí no se aplicó.

## 5. No verificado
- No se midió el color con el sitio vivo en pantalla (la maqueta usa el mismo fondo y fuentes por nombre; si Newsreader/Figtree no cargan sin conexión, se ven letras de respaldo).
- Falta que el dueño apruebe el color; la elección es de gusto, el contraste solo lo avala.

## 6. Actualización 20-11-2026: la dueña eligió C (menta), pero más oscura
Pedido: que no se confunda con el fondo azul ni con el celeste `#7bc3eb`. Maqueta: `docs/maquetas/tercer-color-c.html` (3 tonos lado a lado y una fila comparando con el celeste).

| Tono | Hex | Sobre noche `#0a1529` | Sobre tarjeta `#0d1c37` | Contra celeste | Uso |
|---|---|---|---|---|---|
| C1 menta suave | `#3fcfae` | 9.33 | 8.68 | 1.01 | texto normal y grande (AAA) |
| **C2 menta media** | `#1fb89a` | 7.27 | 6.77 | 1.29 | texto normal y grande (AAA) |
| C3 menta profunda | `#0fa088` | 5.56 | 5.17 | 1.69 | texto normal y grande (AA, justo) |
| (antes) menta clara | `#6fdcc4` | 11.03 | 10.26 | 1.17 | |

- Los tres pasan AA ≥4.5:1 en texto normal sobre los dos fondos; no hace falta limitarlos a texto grande. El más oscuro aceptable es C3; más oscuro que eso (por ejemplo `#0a8a76`, 3.96:1 sobre tarjeta) baja de 4.5 y ya solo serviría para texto grande.
- Cómo no se confunde con el celeste: no es por brillo (el celeste y la menta brillan parecido), es por tono. El celeste es azul (tono 201°) y estas mentas son verde-azuladas (166-170°, 35° más hacia el verde) y más saturadas conforme se oscurecen. En la maqueta se ve la diferencia en la fila de comparación.
- **Recomendado: C2 `#1fb89a`.** Se nota claramente más verde y más "profunda" que el celeste, y deja margen de contraste (7.27) por si se ve en una pantalla mala. C3 es la más distinta del celeste pero está más cerca del límite AA; C1 es la más parecida a la menta original.
- Dónde se usa: los mismos 7 selectores de la sección 3 (`.hero h1 em`, `.accent`, `.pill`, `.blog-card__topic`, `.art-next__label`, `.contact-item__label`, `.bx-name`). Sobre fondo blanco ninguno sirve (C2 da 2.5:1); allí usar `#0f766e` (5.47:1).
- Pendiente: que la dueña vea la maqueta en su pantalla y elija; no se aplicó nada al sitio.
