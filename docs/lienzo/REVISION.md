# Encargo común · Etapa 2 · Revisión independiente de direcciones (manual §35)

Trabajas SOLO, sin leer la revisión de otro revisor. Tú no hiciste la dirección que revisas.
Modo: ponytail apagado. Skills: `impeccable` (critique/audit), `accessibility`, `frontend-design` (para juzgar carácter), `santa-method` si la tienes.

## Qué revisas
Proyecto: `C:\Users\Dental Nakeji\Desktop\Proyectos\Páginas web\React + Vite\Empresas\Luminous Dental`
- Direcciones: `docs/lienzo/project/Estilo-<A|B|C>.dc.html` y su hoja `docs/lienzo/hoja-<a|b|c>.md`.
- Texto aprobado: `apps/web/src/content/home.ts` (el texto debe ir tal cual).
- Rúbrica: manual (bóveda) `C:\Users\Dental Nakeji\Desktop\Cerebro-Dental Nakeji\01 - Proyectos\02 - Empresa Luminous Dental\03 - Departamentos\02 - IT\Subdepartamento - Páginas web\01 - Jefe - Jefe de Páginas Web\00 - Cómo se hace una página web · LD.md` → SOLO secciones 8 (antipatrones, delatores, prueba del gemelo), 20 (lista premium, reprueba con 2 faltas) y 35.

## Cómo miras (capturas reales, obligatorio)
Hay un visor local encendido: `http://127.0.0.1:5190/project/Estilo-A.dc.html` (B y C igual). Saca capturas de página COMPLETA con Edge sin ventana, por ejemplo:
`"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --headless=new --disable-gpu --hide-scrollbars --window-size=1440,7600 --screenshot="<scratchpad>\rev-A-1440.png" http://127.0.0.1:5190/project/Estilo-A.dc.html`
y otra con `--window-size=375,9000`. (Si Edge está en otra ruta, búscalo.) Guarda las capturas en tu scratchpad y MÍRALAS con Read, de arriba abajo. Juzga lo que ves, no lo que dice la hoja.

## Qué entregas
`docs/lienzo/revision-<tu-agente>.md` con, por cada dirección que te toca:
1. Veredicto: **PASA / NO PASA**.
2. Lista premium §20: los 8 puntos, pasa/falla, con lo que viste.
3. Delatores y antipatrones §8 que encontraste (con la sección exacta).
4. Prueba del gemelo: ¿saldría igual para otra clínica? qué.
5. Problemas concretos a 375 px y a 1440 px (texto cortado, solapes, contraste, botones < 44 px, huecos raros).
6. ¿Son las 3 direcciones realmente distintas entre sí? (tema, letra, retícula, pieza firma). Ojo: revisa si dos usan la misma tipografía de títulos.
7. Las 3 correcciones más importantes, en orden, con el punto exacto.
No arregles nada: solo revisa. No toques ningún otro archivo.

## Reporte
Devuélveme en español sencillo el veredicto por dirección y las 3 correcciones de cada una.
