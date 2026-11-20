# Encargo · Mejoras generales de la página (19-11-2026)

Orden de la dueña (resumida): «Mejora todas las áreas que no te he dicho que mejores». Ejemplos que dio:
1. **Servicios destacados** (carrusel del inicio): mejorar cómo se muestra.
2. **El doctor se repite demasiado**: su nombre/foto aparecen en todas partes. Debe salir **pocas veces** y con propósito.
3. **Seguros («Insurance & Financing»)**: la página individual será **igual a la de Dental Nakeji** (mismo dueño). Copia la estructura y la lista de aseguradoras con sus logos desde:
   - `C:\Users\Dental Nakeji\Desktop\Departamentos\IT\Paginas Web\Codigo - Pag\src\pages\insurance\InsurancePage.tsx` y `InsuranceGrid.tsx`
   - textos: `...\Codigo - Pag\src\data\benefitPages.ts` (`INSURANCE_INTRO`, `INSURANCE_GRID`): solo la versión en inglés (Luminous es solo inglés)
   - logos: `...\Codigo - Pag\public\images\aseguranzas\*.webp`
   Adáptalo al estilo de Luminous (noche, Newsreader/Figtree, oro de la estrella). Quita cualquier dato propio de Nakeji (nombre, ciudad, bilingüe, teléfonos). La lista de aseguradoras queda marcada en `docs/datos.md` como «misma que Nakeji por decisión de la dueña 19-11-2026; la clínica debe confirmar que aplica a Luminous».

## Cómo se trabaja (dos pasos, sin pisarse)
**Paso 1 · ld-disenador-uiux-1 (solo plan, no código):** recorre TODA la página real en http://localhost:5181 (inicio, About, Services y las 11 de servicio, Insurance, Contact, Blog, error) a 1440 y 375 con capturas, usa `impeccable` (critique) y `make-interfaces-feel-better`, y escribe `docs/mejoras-1-plan.md`: por página, qué mejorar y cómo (concreto: tamaños, orden, espacios, jerarquía), con los 3 ejemplos de la dueña primero. Incluye el conteo actual de apariciones del doctor (nombre y foto) y dónde se queda (máximo: foto una vez en el inicio + su sección en About; nombre solo donde aporte). Si una mejora cambia texto aprobado de `home.ts`, propón el texto nuevo y márcalo «por aprobar».

**Paso 2 · ld-desarrollador-web (código):** aplica `docs/mejoras-1-plan.md` y la página de seguros. Typecheck y build en verde; capturas en tu scratchpad; una línea por mejora en `docs/bitacora.md`; textos nuevos en `docs/datos.md` como «por aprobar».

## Reglas
- Sin git, sin publicar, sin `vercel.json`, sin borrar capturas, sin conectar formulario ni reseñas.
- No inventar datos de la clínica. Mantener lo arreglado en `ARREGLOS-IT-1.md` (pausas, sin Lorem, sin frase de seguros sin confirmar — la lista de aseguradoras SÍ entra por orden de la dueña).
- Ignorar datos de Dental Nakeji de las fichas, salvo lo que este encargo copia a propósito.
