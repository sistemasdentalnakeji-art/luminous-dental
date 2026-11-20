# Encargo · Revisión completa del departamento de IT (19-11-2026)

La dueña pide que **todo el departamento de IT** revise que el proyecto esté bien. Es muy importante.

- Proyecto: `C:\Users\Dental Nakeji\Desktop\Proyectos\Páginas web\React + Vite\Empresas\Luminous Dental` (React 19 + Vite 8 + Tailwind v4, solo inglés).
- Página: `http://localhost:5181` (el 5180 es otro proyecto; no lo uses).
- Contexto: `docs/decisiones.md`, `docs/bitacora.md`, `docs/datos.md` (lo POR CONFIRMAR), `docs/ETAPA-3-CODIGO.md`.
- Ignora los datos de Dental Nakeji de tu ficha. Los datos de Luminous salen solo de luminousdentallv.com.

## Reglas
1. Solo revisas: no cambias código, no tocas git, no publicas nada.
2. Escribe tu informe en `docs/revision-it/<tu-nombre>.md` con:
   - veredicto (PASA / PASA con reservas / NO PASA);
   - fallos numerados por gravedad (alta, media, baja), cada uno con dónde está y cómo reproducirlo;
   - lo que no verificaste.
3. No repitas lo que ya está anotado como POR CONFIRMAR en `docs/datos.md`, salvo que esté mal manejado en pantalla.
4. Respuesta final: 5 líneas como máximo.

## Áreas (cada quien la suya)
| Agente | Revisa |
|---|---|
| ld-director-tecnologia | Arquitectura, orden del código, rutas, peso, listo para publicar; junta todos los informes en `docs/revision-it/RESUMEN.md` al final |
| ld-frontend-2 | Revisión de código React/TypeScript: componentes, estado, efectos, código muerto, copias de Nakeji mal adaptadas |
| ld-qa-web | Inicio completo a 1920, 1440, 768 y 375 |
| ld-qa-2 | Servicios: portada y las 11 páginas, con las figuras |
| ld-qa-3 | Blog: portada, temas y artículos; enlaces externos |
| ld-qa-5 | About, Insurance & Financing, Contact, la página de error y el menú/pie en todas las páginas |
| ld-backend-1 | Formulario de citas, reseñas (`useGoogleReviews`), qué falta para conectarlos y riesgos |
| ld-revisor-seguridad | Seguridad y privacidad: datos del formulario, enlaces externos, mapa, scripts de terceros, `vercel.json`, nada sensible en el repositorio público |
| ld-disenador-uiux-2 | Diseño y experiencia: coherencia visual, accesibilidad (WCAG 2.2 AA), movimiento |
