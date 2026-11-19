# Luminous Dental · sitio web nuevo

Sitio nuevo para https://luminousdentallv.com, hecho con el manual «Cómo se hace una página web · LD» de la bóveda. Solo inglés. Etapa actual: **0 (cimientos)**.

## Dónde está cada cosa
| Carpeta | Qué es |
|---|---|
| `apps/web` | La página (Vite + React + TypeScript + Tailwind) |
| `apps/web/src/content/clinic.ts` | Todos los datos reales de la clínica (de la página oficial) |
| `apps/web/src/config/booking.ts` | Cómo se piden citas hoy (enlace) y mañana (API) |
| `apps/web/src/features` | Una carpeta por sección, desde la etapa 3 |
| `apps/web/src/styles/tokens.css` | Colores y letras; los reales llegan en la etapa 2 |
| `apps/api` | Citas en línea (reservado, ver su README) |
| `packages/types` | Formato de una solicitud de cita, compartido |
| `packages/db` | Base de datos de citas (reservado) |
| `docs` | Decisiones y bitácora |

## Cómo verla
```bash
npm.cmd install
npm.cmd run dev
```
Revisar tipos y compilar: `npm.cmd run typecheck` y `npm.cmd run build`.
