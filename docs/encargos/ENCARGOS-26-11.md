# Encargos del 26-11-2026 · Ronda final · Luminous Dental

Referencia de código para todo: **Dental Nakeji** en `C:\Users\Trabajo\Desktop\Dental Nakeji\src` (solo se lee; no se edita).
Reglas comunes: datos de Luminous solamente (nunca datos de Nakeji: teléfonos, dirección, doctores, precios); lo que falte, «POR CONFIRMAR». Sin librerías nuevas. Sin commit. typecheck + build + Playwright (msedge) a 375 y 1440 antes de entregar. Reporte en `docs/bitacora.md` (formato sección 9). Textos nuevos a `docs/datos.md` como POR APROBAR.
Al editar archivos compartidos (`config/routes.ts`, `app/App.tsx`, `main.tsx`, `content/home.ts`): vuelve a leerlos justo antes, cambios pequeños con Edit, solo tus entradas. Si typecheck falla por archivos de otro agente, dilo y sigue.

---

## Fase A (primero, sola)

### A1 · Dos idiomas (rutas /en/ y /es/)
Para: `ld-desarrollador-web` · Modo: ponytail encendido
Skills: `i18n-sync`, `react-patterns`, `vite-patterns`, `frontend-a11y`
Lee: `Dental Nakeji/src/config/routes.ts`, `src/app/lang.ts`, `src/app/App.tsx`, `src/components/layout/LanguageSwitch.tsx`, `Header.tsx`; en Luminous `config/routes.ts`, `lib/router.tsx`, `lib/pages.ts`, `app/App.tsx`, `content/*`.
Qué hacer:
1. Copiar el patrón de Nakeji: `Lang = 'en' | 'es'`, `LangContext` + `useLang()`, rutas por clave con `paths: Record<Lang,string>`, `routeOf(key, lang)`. Inglés en `/en/…`, español en `/es/…` con slugs en español (ej. `/es/servicios/implantes-dentales`). `/` redirige a `/en/`. Selector de idioma en el menú (y panel del celular) que lleva a la misma página en el otro idioma. `<html lang>`, `hreflang` y títulos por idioma.
2. Todo el contenido de `content/*` pasa a `{ en, es }` (o `Record<Lang, …>`) y los componentes lo leen con `useLang()`. Ningún texto fijo en componentes.
3. Traducir al español todo el sitio con `i18n-sync` (español de México, de tú, cálido; términos dentales correctos). Blog: si es muy largo, deja `blog.es.json` con lo que alcance y el resto marcado; dilo.
4. Enlaces externos (Adit, mapas, teléfono) iguales en ambos idiomas.
Terminado cuando: las rutas actuales funcionan en `/en/` y `/es/`, el selector cambia de idioma en la misma página, 0 textos en inglés dentro de `/es/` (salvo nombres propios), typecheck y build en verde.
No tocar: diseño, CSS, orden de secciones (eso es fase B).

---

## Fase B (en paralelo, después de A1)

### B1 · Inicio, pie, formulario y Contact
Para: `ld-desarrollador-web` · Modo: ponytail apagado
Skills: `copywriting`, `frontend-design`, `impeccable`, `make-interfaces-feel-better`, `motion-foundations`, `frontend-a11y`, `i18n-sync`
Lee: Nakeji `pages/home/HomePage.tsx` y `sections/*` (Hero, Partners), `components/layout/Footer.tsx`, `pages/contact/ContactPage.tsx`, `features/booking/*` (forma del formulario). Luminous `pages/Home.tsx`, `components/Hero.tsx`, `FamilyCare.tsx`, `FeaturedServices.tsx`, `BookOnline.tsx`, `Emergency.tsx`, `Layout.tsx` (pie), `pages/Contact.tsx`, `VegasSign.tsx`.
Qué hacer:
1. **Título del héroe** nuevo, más fuerte, al estilo de las frases de Nakeji pero de Luminous (Las Vegas, emergencias 24/7, toda la familia, sus servicios reales). EN y ES.
2. **Sección estrella** (`FamilyCare`): cambia el título y deja de ser una lista de servicios destacados. Nuevo contenido: «por qué elegir Luminous» / cómo es tu visita (pasos: llamas o reservas → evaluación → plan claro → tratamiento), con datos reales (24/7, seguros, financiamiento, convenios). Conserva la estrella y su animación.
3. **Quitar** la sección «Thinking about changing your smile» (debajo de destacados).
4. **Convenios en el inicio**: sustituye el bloque de seguros/beneficios del inicio por una sección de **Convenios** bien hecha (título propio + animación sobria al entrar en pantalla, respetando reducir movimiento) con SAHARA Las Vegas (dato de `content/home.ts`), botón a la página de convenios (`/en/agreements` · `/es/convenios`, la crea B2).
5. **Formulario corto nuevo** (componente reutilizable, sustituye `BookOnline`): nombre, teléfono, servicio de interés (lista de servicios reales) y día preferido. **No guarda ni envía datos**: al enviar valida y **dirige** a la reserva de Adit (`clinic.bookingUrl`) en otra pestaña, o a WhatsApp/llamar. Diseño de la mano del inicio (vidrio, serif, menta/dorado), estados completos (foco, error, éxito), etiquetas visibles. Va en el inicio y en Contact. Mantener `id="appointment"`.
6. **Pie**: hoy se ve vacío. Rehazlo con la estructura de Nakeji: logo y frase, columnas (Servicios, Beneficios, Clínica: About/FAQ/Blog/Contact, Legal), horario, dirección, teléfono, emergencias 24/7 en una línea, redes, selector de idioma, aviso de derechos.
7. **Contact**, en este orden: emergencias 24/7 **arriba, primera sección**, más grande y mejor (es lo que la dueña quiere recalcar) → ubicación/horario → formulario nuevo → moneda y letrero Luminous hasta abajo.
Terminado cuando: inicio y Contact en EN y ES se ven completos a 375 y 1440, formulario probado (error + redirección), capturas en `docs/reportes/historial-visual/*-26nov-b1.png`.
No tocar: Services, Benefits, About, legales, FAQ.

### B2 · Servicios interactivos y Beneficios en páginas propias
Para: `ld-frontend-2` · Modo: ponytail apagado
Skills: `frontend-design`, `impeccable`, `make-interfaces-feel-better`, `motion-foundations`, `frontend-a11y`, `i18n-sync`
Lee: Nakeji `pages/services/ServicesPage.tsx`, `pages/benefits/BenefitsPage.tsx`, `pages/insurance/*`, `pages/agreements/*`, `data/benefits.ts`, `data/benefitPages.ts`. Luminous `pages/Services.tsx`, `pages/Insurance.tsx`, `pages/Financing.tsx`, `content/services.ts`, `content/financing.ts`, `content/insurers.ts`, `styles/benefits.css`.
Qué hacer:
1. **Hub de Servicios** con nueva perspectiva: todos los servicios visibles a la vez y de forma interactiva (por ejemplo, filtros por necesidad —«me duele», «quiero mejorar mi sonrisa», «me falta un diente», «revisión»— que resaltan servicios, tarjetas con ícono que se expanden con resumen y botón a su página). Teclado completo y reducir movimiento.
2. **Beneficios separados** como en Nakeji: `/benefits` (hub corto con 3 tarjetas que dirigen) + `/insurance` + `/financing` (con las 4 páginas de financiera que ya existen) + `/agreements`, cada una su página propia (en ES: `/es/beneficios`, `/es/seguros`, `/es/financiamiento`, `/es/convenios`). Ya no juntos en `/insurance-financing` (redirígelo a `/en/benefits`). Menú «Benefits» con sus 3 opciones.
3. Botones «Request an appointment» de estas páginas → `clinic.bookingUrl`.
Terminado cuando: las 4 páginas + hub de servicios en EN y ES a 375 y 1440, sin enlaces rotos; capturas `*-26nov-b2.png`.
No tocar: inicio, pie, Contact, About, legales, FAQ.

### B3 · About, Términos, Privacidad y Preguntas frecuentes
Para: `ld-disenador-uiux-1` (programa esta ronda) · Modo: ponytail apagado
Skills: `frontend-design`, `impeccable`, `motion-foundations`, `frontend-a11y`, `i18n-sync`
Lee: Nakeji `pages/about/*` (AboutPage, SoftBlurIn, TeamSection), `pages/legal/*` (LegalDocument, PrivacyPage, TermsPage), `pages/faq/FaqPage.tsx`, `data/about.ts`, `data/legal.ts`, `data/faq.ts` y los CSS que usen. Luminous `pages/About.tsx`, `Terms.tsx`, `Privacy.tsx`, `components/LegalDocument.tsx`, `content/about.ts`, `content/legal.ts`.
Qué hacer:
1. **About** rehecho, sencillo, con la misma estructura de secciones que Nakeji (con su animación SoftBlurIn), con datos de Luminous (Dr. Christian Hahn solo si ya está en `content/about.ts`; lo que falte, POR CONFIRMAR).
2. **Términos y Privacidad**: replicar tal cual los de Nakeji (estructura, índice, animaciones e íconos), con el texto legal de Luminous ya existente en `content/legal.ts` (adaptado a Luminous: Nevada/EE. UU., sin datos de Nakeji). Siguen marcados «revisión legal pendiente».
3. **Preguntas frecuentes** nueva: copiar la página de Nakeji como está (acordeón, categorías, animación) y adaptar preguntas y respuestas a Luminous con datos reales (horario, 24/7, seguros, financiamiento, Adit, ubicación). Ruta `/en/faq` · `/es/preguntas-frecuentes`, agregarla al menú/pie (el pie lo hace B1: avísale la ruta en tu reporte).
Terminado cuando: 4 páginas en EN y ES a 375 y 1440; capturas `*-26nov-b3.png`.
No tocar: inicio, pie, Contact, Services, Benefits.

---

## Fase C · QA (después de B)
- `ld-qa-web`: funcional — todas las rutas EN/ES, selector de idioma, enlaces, formulario, 404.
- `ld-qa-2`: visual — 375 / 768 / 1440 / 1920, sin desborde, textos en el idioma correcto.
- `ld-qa-3`: accesibilidad y rendimiento — teclado, foco, contraste, reducir movimiento, tamaño del build.
Los errores vuelven al agente dueño de esa página (una corrección = un agente, una página).
