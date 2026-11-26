# Encargos 26-11 · Ronda 3 de la dueña

Reglas comunes: iguales a `ENCARGOS-26-11-r2.md` (EN y ES, sin librerías, movimiento reducido/pausa, typecheck + build + Playwright msedge 375/1440 EN/ES, capturas `*-26nov-r3.png`, entrada corta en `docs/bitacora.md`, sin commit, solo tus archivos, cierra los servidores que abras). Código de Dental Nakeji: `C:\Users\Trabajo\Desktop\Dental Nakeji\src` (mismo dueño; se copia estructura y, donde se diga, contenido y fotos).

## F1 · Pie (`ld-desarrollador-web`)
Archivos: `components/Layout.tsx`, `components/FooterCity.tsx`, `styles/site.css` y `styles/home-b1.css` (solo reglas del pie).
1. Quita del pie toda la animación y el código de fondo (silueta/ciudad animada, montañas, focos, lo que se mueva). El fondo del pie queda fijo y quieto. La información se queda.
2. FAQ sale de la columna «Legal». Va abajo del todo, en la franja final del pie (junto a derechos / «Pausar animaciones»).
3. Bloque de contacto del pie (dirección, teléfono, correo): no le gustó. Que quede alineado con las demás columnas, igual que ellas (sin tarjeta aparte).
4. Botón de emergencias 24/7 del pie: hoy junta todo el texto («24/7 dental emergencies» + número) en un bloque raro. Que se vea como un botón de verdad, limpio: una etiqueta corta y el número, con forma de botón como los demás del sitio.

## F2 · SAHARA en el inicio y fotos de servicios (`ld-frontend-2`)
Archivos: `components/Agreements.tsx`, su CSS, `pages/Service.tsx`, `content/services.ts` solo el campo de foto si hace falta, `public/images/servicios/`.
1. Bloque SAHARA del inicio: le gusta lo que tiene, no cómo está organizado. Reorganízalo con mejor jerarquía (logo oficial, qué es el beneficio, botón), limpio y equilibrado a 375 y 1440.
2. Fotos en las páginas de cada servicio (solo ahí): copia las fotos de servicio de Nakeji (`Dental Nakeji/public/images/servicios/*.webp`) para los servicios que Luminous tiene (limpieza, extracciones, carillas, coronas, implantes, blanqueamiento, ortodoncia/alineadores, odontopediatría, dentaduras). Úsalas como las usa Nakeji en su página de servicio. Los servicios sin foto equivalente se quedan sin foto. El alt describe la foto, sin decir que es de Luminous.

## C1 · Contenido de servicios y blog (`ld-desarrollador-web`, segundo encargo, en paralelo a F1)
Archivos: `content/services.ts`, `content/servicesHub.ts`, `content/blog.en.json`, `content/blog.es.json`. Nada de componentes ni CSS.
- Compara la información de servicios (hub y cada página) y del blog con Nakeji (`src/data/services.ts`, `servicesEn.ts`, `servicesCatalog.ts`, `blog-content*.json`: Nakeji tiene 14 artículos, Luminous 9) y con la página oficial https://luminousdentallv.com.
- Completa lo informativo que falte (qué es, para quién, cómo es el proceso, cuidados, preguntas) para los servicios que Luminous tiene, y pasa los artículos del blog que falten que traten esos servicios. Adapta a Luminous: Las Vegas/EE. UU., inglés y español, nunca datos de Nakeji (precios, teléfonos, dirección, doctores, «Tijuana», pesos). Sin promesas médicas («sin dolor», «garantizado»).
- Lista en tu entrega qué faltaba y qué agregaste; textos nuevos POR APROBAR en `docs/datos.md` (agrega una sección al final).

## D2 · About (`ld-disenador-uiux-2`)
Archivos: `pages/About.tsx`, `content/about.ts`, `styles/about.css`.
- Revisa si https://luminousdentallv.com tiene «About us» / «Sobre nosotros» (y cualquier página con historia, misión, equipo, Dr. Christian Hahn). Usa lo real que encuentres.
- A la dueña ya le gusta más, pero se siente vacío: enriquece el contenido (más secciones con sustancia: cómo es la atención, el consultorio, tecnología o servicios, a quién atienden, idiomas, emergencias, seguros/financiamiento con enlace). Nada inventado como dato (años, cifras, premios): lo que no esté confirmado no se dibuja.
