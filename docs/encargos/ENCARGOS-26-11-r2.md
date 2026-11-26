# Encargos 26-11 · Ronda 2 de la dueña

Reglas comunes: datos de Luminous; nada nuevo que la dueña no pidió; sin librerías nuevas; textos en EN y ES (`{ en, es }`); respetar movimiento reducido y «Pausar animaciones». Sin commit. Al terminar: typecheck + build + Playwright msedge 375 y 1440, EN y ES (0 errores, 0 desborde), capturas `*-26nov-r2.png` en `docs/reportes/historial-visual/`, y una entrada corta en `docs/bitacora.md`. Toca solo tus archivos.

## F1 · Inicio, encabezado y pie (`ld-desarrollador-web`)
Archivos: `pages/Home.tsx`, `components/{FamilyCare,Hero,Header,Layout,LanguageSwitch}.tsx`, `styles/{site,home-b1,family-care}.css`. No toques la figura de servicios (`features/figure/*`) ni `Agreements.tsx`.
1. Sección estrella (FamilyCare): quitar la numeración 01–04 (`fam__n`). La estrella y su animación se quedan.
2. Inicio: mejor acomodo y ritmo entre secciones para que se vea bonito. A la dueña le gusta la sección de cita (BookVisit) tal como está: no la cambies, solo su lugar si mejora el flujo. No quites ninguna sección.
3. La línea azul bajo el título de «Featured services» (`site.css`, regla `.featured .h2::after`) va también bajo los títulos de las demás secciones del sitio. Reusa esa regla, no hagas otra.
4. Botón «Emergencias 24/7» (la pastilla del héroe y donde aparezca como botón): a la dueña le gusta; hazlo llamar la atención con movimiento suave (pulso o brillo), que sea un botón de verdad (llama o lleva a Contact#emergencias). Sin movimiento con reducir movimiento o pausa.
5. Pie: quitar el horario. Preguntas frecuentes (FAQ) va en la columna «Legal», abajo. El bloque de contacto con fondo (sobre la silueta) se ve raro: mejóralo para que se vea limpio y bonito.
6. Cambio de idioma con bandera, igual que Dental Nakeji: copia `C:\Users\Trabajo\Desktop\Dental Nakeji\src\components\layout\LanguageSwitch.tsx` (banderas US/MX en SVG) y su CSS `.lang-switch` de `src/styles/layout/header.css`, adaptado a `counterpart(path)` y `ui[lang].switchTo` de Luminous.

## F2 · Beneficios, SAHARA y antes/después (`ld-frontend-2`)
Archivos: `components/{Agreements,BenefitsHeader}.tsx`, `pages/{Agreements,Benefits,Service,Services}.tsx` (Service solo para antes/después), `content/{benefitsHub,financing,home,smileCases}.ts` (solo lo tuyo), `styles/benefits*.css`, nuevo `content/beforeAfter.ts` y su CSS. `components/BeforeAfter.tsx` puede reusarse.
1. SAHARA: logo oficial ya descargado en `apps/web/public/benefits/sahara.svg` (sacado de saharalasvegas.com, color dorado #BEAA75). Úsalo en el bloque de convenios del inicio (`Agreements.tsx`) y en la página Convenios. Quitar la estrellita; el contenido gira alrededor del logo oficial (se ve como alianza real, no ícono genérico).
2. Encabezado de Beneficios (`BenefitsHeader`): quitar la cifra «24/7» de emergencias (no va en beneficios). Poner otra cifra o dato real de esa zona (seguros, pagos, financiamiento, convenios), sacado de los datos que ya hay. No inventes números.
3. «Cómo funciona»: no se mueve ni se quita.
4. Antes y después por servicio: copia de Dental Nakeji (`C:\Users\Trabajo\Desktop\Dental Nakeji\src\data\beforeAfter.ts`, fotos en `public/images/antes-despues/`, componente `src/components/ui/BeforeAfter.tsx`) los casos de los servicios que Luminous también tiene: carillas y coronas, blanqueamiento, ortodoncia/brackets, implantes (y los que coincidan; nada de All-on-4/6). Copia las fotos a `apps/web/public/images/antes-despues/`. Muéstralos en la página de cada servicio como en Nakeji, sin quitar la figura del servicio. El texto alternativo y una nota visible dicen que es un caso de Dental Nakeji, clínica hermana (como en Nakeji: «Dental Nakeji patient»), más «Los resultados varían».
5. Línea azul bajo títulos: la pone F1 en `site.css`; tú solo revisa que tus páginas la tomen bien.

## D2 · Selector de la figura de servicios del héroe (`ld-disenador-uiux-2`)
Archivos: solo `features/figure/*` y el CSS de la figura/selector. No toques `Hero.tsx` salvo lo mínimo del selector y avísalo.
- A la dueña no le gustan los botones para elegir servicio ni cómo cambian. Sí le gusta que sean rectángulos. Rediseña los botones (estado activo, cambio entre servicios, transición) para que se vean más agradables, dentro del estilo del sitio. La figura en sí no cambia.
- Crítica con `impeccable` antes y después.
