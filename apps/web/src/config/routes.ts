// Rutas del sitio en dos idiomas: inglés bajo /en/ (principal) y español bajo /es/ (como Dental Nakeji). Cada página tiene una CLAVE estable (`key`) y una dirección por idioma;
// el código siempre busca por clave (routeOf(key, lang) o hrefOf(key, lang)), nunca escribe un path a mano. Las direcciones no llevan «/» al final (el router lo quita); el inicio es /en y /es.
// useLang() (lib/lang.ts) da el idioma de la página actual; los textos viven en content/*.ts como { en, es } (L10n).
//
// CÓMO AGREGAR UNA PÁGINA NUEVA EN LOS DOS IDIOMAS
//  1. Aquí: agrega la clave al tipo RouteKey y una fila en PAGES con `page('clave', { en: '/en/mi-pagina', es: '/es/mi-pagina-en-español' }, { en: { title, description? }, es: { title, description? } })`.
//  2. app/App.tsx: agrega `clave: MiPagina` en `fixed` (si la página se carga aparte, créala en lib/pages.ts con lazy() y su prefetch por clave).
//  3. Textos: en content/mi-pagina.ts con `const en = {...}; const es: typeof en = {...}; export const miPagina: L10n<typeof en> = { en, es }` (TypeScript avisa si al español le falta algo).
//     En el componente: `const lang = useLang(); const t = miPagina[lang]`. Un texto fijo en un componente no existe: va en content/.
//  4. Enlaces: en el menú/pie con `to: 'clave'` en content/home.ts; en un componente `<Link href={hrefOf('clave', lang)}>`. Enlaces externos (Adit, mapas, teléfono) van igual en los dos idiomas.
//  Servicios y financieras salen solos de content/services.ts y content/financing.ts (claves `service:<id>` y `financing:<slug>`); el blog se maneja aparte (blogHref / blogSlugs, abajo).
import { financers } from '@/content/financing'
import type { Target } from '@/content/home'
import { servicesOf } from '@/content/services'
import { LANGS, type L10n, type Lang } from '@/lib/lang'

export { LANGS, type Lang }

export type RouteKey = 'home' | 'about' | 'faq' | 'services' | 'benefits' | 'insurance' | 'financing' | 'agreements' | 'contact' | 'blog' | 'privacy' | 'terms' | `service:${string}` | `financing:${string}`

export interface RouteDef {
  key: RouteKey
  lang: Lang
  path: string
  title: string
  description?: string
}

interface Text { title: string; description?: string }
interface PageDef { key: RouteKey; paths: L10n<string>; text: L10n<Text> }
const page = (key: RouteKey, paths: L10n<string>, text: L10n<Text>): PageDef => ({ key, paths, text })

const name = 'Luminous Dental'

const PAGES: PageDef[] = [
  page('home', { en: '/en', es: '/es' }, {
    en: { title: 'Luminous Dental | General & Cosmetic Dentist in Las Vegas' },
    es: { title: 'Luminous Dental | Dentista general y estético en Las Vegas' },
  }),
  page('about', { en: '/en/about', es: '/es/nosotros' }, { en: { title: `About | ${name}` }, es: { title: `Nosotros | ${name}` } }),
  page('faq', { en: '/en/faq', es: '/es/preguntas-frecuentes' }, { en: { title: `FAQ | ${name}` }, es: { title: `Preguntas frecuentes | ${name}` } }),
  page('services', { en: '/en/services', es: '/es/servicios' }, { en: { title: `Services | ${name}` }, es: { title: `Servicios | ${name}` } }),
  ...servicesOf('en').map((en, i) => {
    const es = servicesOf('es')[i]
    return page(`service:${en.id}`, { en: `/en/services/${en.slug}`, es: `/es/servicios/${es.slug}` }, { en: { title: `${en.name} | ${name}` }, es: { title: `${es.name} | ${name}` } })
  }),
  page('benefits', { en: '/en/benefits', es: '/es/beneficios' }, { en: { title: `Benefits | ${name}` }, es: { title: `Beneficios | ${name}` } }),
  page('insurance', { en: '/en/insurance', es: '/es/seguros' }, { en: { title: `Insurance | ${name}` }, es: { title: `Seguros | ${name}` } }),
  page('financing', { en: '/en/financing', es: '/es/financiamiento' }, { en: { title: `Financing | ${name}` }, es: { title: `Financiamiento | ${name}` } }),
  page('agreements', { en: '/en/agreements', es: '/es/convenios' }, { en: { title: `Agreements | ${name}` }, es: { title: `Convenios | ${name}` } }),
  ...financers.map((f) => page(`financing:${f.slug}`, { en: `/en/financing/${f.slug}`, es: `/es/financiamiento/${f.slug}` }, { en: { title: `${f.name} Financing | ${name}` }, es: { title: `Financiamiento con ${f.name} | ${name}` } })),
  page('contact', { en: '/en/contact', es: '/es/contacto' }, { en: { title: `Contact | ${name}` }, es: { title: `Contacto | ${name}` } }),
  // El blog (portada) lo dibuja BlogRoute, que pone su propio título; las categorías y artículos tienen direcciones propias (blogHref, abajo).
  page('blog', { en: '/en/blog', es: '/es/blog' }, { en: { title: `Blog | ${name}` }, es: { title: `Blog | ${name}` } }),
  // Las páginas legales llevan texto por revisar con abogado (docs/datos.md).
  page('privacy', { en: '/en/privacy-policy', es: '/es/aviso-de-privacidad' }, {
    en: { title: `Privacy Policy | ${name}`, description: `${name} privacy policy: what we collect, how we use it, who we share it with, and your choices.` },
    es: { title: `Aviso de privacidad | ${name}`, description: `Aviso de privacidad de ${name}: qué recabamos, cómo lo usamos, con quién lo compartimos y qué opciones tienes.` },
  }),
  page('terms', { en: '/en/terms-and-conditions', es: '/es/terminos-y-condiciones' }, {
    en: { title: `Terms and Conditions | ${name}`, description: `${name} terms and conditions: use of the website, appointment requests, insurance, and text messages.` },
    es: { title: `Términos y condiciones | ${name}`, description: `Términos y condiciones de ${name}: uso del sitio, solicitudes de cita, seguros y mensajes de texto.` },
  }),
]

// Meta description propia por página (una línea real, sin datos inventados). Las de servicio salen de su subtítulo y las de financiera de su descripción corta; la home, el blog y las legales llevan la suya aparte.
const descriptions: Partial<Record<RouteKey, L10n<string>>> = {
  about: { en: `Meet ${name} in Las Vegas and Dr. Christian Hahn, and how we care for every patient.`, es: `Conoce a ${name} en Las Vegas y al Dr. Christian Hahn, y cómo cuidamos a cada paciente.` },
  faq: { en: `Answers about appointments, hours, 24/7 emergencies, insurance, financing and our location at ${name}.`, es: `Respuestas sobre citas, horario, emergencias 24/7, seguros, financiamiento y ubicación de ${name}.` },
  services: { en: `General, cosmetic and orthodontic dental services, plus implants, at ${name} in Las Vegas.`, es: `Servicios dentales generales, estéticos y de ortodoncia, además de implantes, en ${name}, Las Vegas.` },
  benefits: { en: `Insurance, financing and partner agreements that make your care at ${name} easier to manage.`, es: `Seguros, financiamiento y convenios que hacen más sencilla tu atención en ${name}.` },
  insurance: { en: 'See the insurance plans on our list and how our team checks your coverage with you before treatment.', es: 'Mira los planes de seguro de nuestra lista y cómo nuestro equipo revisa tu cobertura contigo antes del tratamiento.' },
  financing: { en: 'Financing companies you can ask us about to spread the cost of your care over time.', es: 'Empresas de financiamiento por las que puedes preguntarnos para repartir el costo de tu atención en el tiempo.' },
  agreements: { en: 'Partner agreement with SAHARA Las Vegas for our patients visiting from out of town.', es: 'Convenio con SAHARA Las Vegas para nuestros pacientes que nos visitan de fuera de la ciudad.' },
  contact: { en: `Contact ${name} in Las Vegas: address, hours, phone, 24/7 dental emergencies and online booking.`, es: `Contacta a ${name} en Las Vegas: dirección, horario, teléfono, emergencias dentales 24/7 y reservas en línea.` },
}
const describe = (key: RouteKey, lang: Lang): string | undefined => {
  if (key.startsWith('service:')) return servicesOf(lang).find((s) => s.id === key.slice('service:'.length))?.subtitle || undefined
  if (key.startsWith('financing:')) return financers.find((f) => f.slug === key.slice('financing:'.length))?.blurb[lang]
  return descriptions[key]?.[lang]
}

export const ALL_ROUTES: RouteDef[] = PAGES.flatMap((def) => LANGS.map((lang) => ({ key: def.key, lang, path: def.paths[lang], description: describe(def.key, lang), ...def.text[lang] })))
const BY_PATH = new Map(ALL_ROUTES.map((r) => [r.path, r]))
const BY_KEY = new Map(ALL_ROUTES.map((r) => [`${r.key}:${r.lang}`, r]))

/** La ruta de una página en un idioma, buscada por su clave. */
export function routeOf(key: RouteKey, lang: Lang): RouteDef {
  const route = BY_KEY.get(`${key}:${lang}`)
  if (!route) throw new Error(`Ruta sin definir: ${key} (${lang})`)
  return route
}

/** Dirección para un enlace: `hrefOf('services', lang, 'cosmetic')` → '/en/services#cosmetic'. */
export const hrefOf = (key: RouteKey, lang: Lang, hash?: string) => routeOf(key, lang).path + (hash ? `#${hash}` : '')

/** Dirección de un enlace del menú o del pie: interno (por clave de ruta) o externo (href). */
export const targetHref = (t: Target, lang: Lang) => ('to' in t ? hrefOf(t.to, lang, t.hash) : t.href)

/** La ruta de una dirección (sin el blog, que maneja BlogRoute), o undefined. */
export const findRoute = (path: string) => BY_PATH.get(path)

/** Idioma de una dirección por su prefijo (/es/…); cualquier otra cosa es inglés, el idioma principal. */
export const langOfPath = (path: string): Lang => (path === '/es' || path.startsWith('/es/') ? 'es' : 'en')

export const notFoundTitle: L10n<string> = { en: `Page not found | ${name}`, es: `Página no encontrada | ${name}` }

// ── Blog ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
// Los datos del blog son pesados y cargan aparte (lib/blog.ts); aquí solo las direcciones. La clave de cada categoría o artículo es la misma en los dos idiomas
// (la de blog.en.json y blog.es.json); en /en/blog/<clave> va tal cual y en /es/blog/<slug> va su slug en español de esta tabla.
export const blogSlugs: Record<string, string> = {
  'implants-and-tooth-replacement': 'implantes-y-reemplazo-de-dientes',
  'cosmetic-and-restorative-dentistry': 'odontologia-estetica-y-restauradora',
  orthodontics: 'ortodoncia',
  'cleanings-and-extractions': 'limpiezas-y-extracciones',
  'dental-implants-what-they-are': 'implantes-dentales-que-son',
  'all-on-4-implants': 'implantes-all-on-4',
  'all-on-6-implants': 'implantes-all-on-6',
  'partial-and-complete-dentures': 'dentaduras-parciales-y-completas',
  'dental-crowns': 'coronas-dentales',
  'dental-veneers': 'carillas-dentales',
  'teeth-whitening': 'blanqueamiento-dental',
  'orthodontics-alignment-and-bite': 'ortodoncia-alineacion-y-mordida',
  'clear-aligners': 'alineadores-transparentes',
  'professional-dental-cleaning': 'limpieza-dental-profesional',
  'extractions-and-wisdom-teeth': 'extracciones-y-muelas-del-juicio',
}

/** Dirección del blog (sin clave: la portada) o de una categoría/artículo; undefined si la clave no existe. */
export function blogHref(lang: Lang, key?: string): string | undefined {
  if (!key) return `/${lang}/blog`
  const slug = lang === 'en' ? (key in blogSlugs ? key : undefined) : blogSlugs[key]
  return slug && `/${lang}/blog/${slug}`
}

/** Clave de la categoría o artículo de una dirección del blog (/en/blog/<slug>), o undefined. */
export const blogKeyOf = (lang: Lang, slug: string) => (lang === 'en' ? (slug in blogSlugs ? slug : undefined) : Object.keys(blogSlugs).find((k) => blogSlugs[k] === slug))

/** Idioma de la dirección si es del blog (/en/blog, /es/blog/…); si no, undefined. */
export const blogLang = (path: string) => LANGS.find((l) => path === `/${l}/blog` || path.startsWith(`/${l}/blog/`))

// ── Idioma y redirecciones ────────────────────────────────────────────────────────────────────────────────────────────────────────
/** La misma página en el otro idioma (selector de idioma y hreflang). Lo que no tiene par (404) lleva al inicio del otro idioma. */
export function counterpart(path: string): string {
  const lang = langOfPath(path)
  const other: Lang = lang === 'en' ? 'es' : 'en'
  const route = findRoute(path)
  if (route) return routeOf(route.key, other).path
  if (blogLang(path)) return blogHref(other, blogKeyOf(lang, path.split('/')[3] ?? '')) ?? blogHref(other)!
  return routeOf('home', other).path
}

/** A dónde redirigir una dirección vieja o sin idioma: «/» y las de antes de los dos idiomas (/services → /en/services); null si ya está bien. */
// La página combinada de antes (seguros y financiamiento juntos) es ahora el hub de Beneficios.
const MERGED_BENEFITS = ['/en/insurance-financing', '/es/seguros-y-financiamiento', '/insurance-financing']

export function redirectOf(path: string): string | null {
  if (path === '/') return routeOf('home', 'en').path
  if (MERGED_BENEFITS.includes(path)) return routeOf('benefits', path.startsWith('/es') ? 'es' : 'en').path
  if (path === '/en' || path === '/es' || path.startsWith('/en/') || path.startsWith('/es/')) return null
  const legacy = `/en${path}`
  return BY_PATH.has(legacy) || blogLang(legacy) ? legacy : null
}
