import { Fragment, Suspense, useEffect, type ComponentType } from 'react'
import { Layout } from '@/components/Layout'
import { blogLang, counterpart, findRoute, langOfPath, notFoundTitle, redirectOf, type RouteDef, type RouteKey } from '@/config/routes'
import { clinic } from '@/content/clinic'
import { home } from '@/content/home'
import { servicesOf } from '@/content/services'
import { LangContext } from '@/lib/lang'
import { About, Agreements, Benefits, BlogRoute, Faq, Financing, FinancingHub, Insurance, Privacy, Service, Services, Terms } from '@/lib/pages'
import { navigate, useLocation } from '@/lib/router'
import Contact from '@/pages/Contact'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'

// Páginas por clave de ruta (config/routes.ts). Las de servicio y financiera se resuelven por prefijo de clave en pageFor().
const fixed: Partial<Record<RouteKey, ComponentType>> = {
  home: Home,
  about: About,
  faq: Faq,
  services: Services,
  benefits: Benefits,
  insurance: Insurance,
  financing: FinancingHub,
  agreements: Agreements,
  contact: Contact,
  privacy: Privacy,
  terms: Terms,
}

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '')

/** La página de una ruta, o null si no hay ninguna. (Las direcciones del blog las maneja BlogRoute, que conoce los artículos.) */
function pageFor(route: RouteDef) {
  const Fixed = fixed[route.key]
  if (Fixed) return <Fixed />
  if (route.key.startsWith('financing:')) return <Financing slug={route.key.slice('financing:'.length)} />
  const service = route.key.startsWith('service:') && servicesOf(route.lang).find((s) => s.id === route.key.slice('service:'.length))
  return service ? <Service page={service} /> : null
}

/** Va al ancla si hay una; si no, al inicio. */
function scrollToHash(hash: string) {
  let id = hash.slice(1)
  try { id = decodeURIComponent(id) } catch { /* una dirección rota como #%E0: se usa tal cual */ }
  const target = id && document.getElementById(id)
  if (target) target.scrollIntoView()
  else if (!hash) scrollTo({ top: 0, behavior: 'instant' })
}

/** Va junto a una página que carga aparte: solo se monta cuando la página ya está dibujada y entonces va al ancla (p. ej. /en/services#cosmetic). */
function AnchorWhenReady({ hash }: { hash: string }) {
  useEffect(() => { if (hash) scrollToHash(hash) }, [hash])
  return null
}

export default function App() {
  const { path, hash } = useLocation()
  const redirect = redirectOf(path) // «/» y las direcciones de antes de los dos idiomas (/services → /en/services)
  const lang = langOfPath(path)
  const blog = Boolean(blogLang(path))
  const route = findRoute(path)
  const page = route ? pageFor(route) : null
  const found = Boolean(page) || blog

  useEffect(() => { if (redirect) navigate(redirect + hash, true) }, [redirect, hash])

  useEffect(() => {
    // <html lang>, título, descripción y hreflang por idioma (el 404 y las páginas del blog ponen su propio título).
    if (redirect) return
    document.documentElement.lang = lang === 'es' ? 'es-MX' : 'en'
    if (!blog) document.title = route?.title ?? notFoundTitle[lang]
    document.querySelector('meta[name="description"]')?.setAttribute('content', route?.description ?? home[lang].seo.description)
    document.head.querySelectorAll('link[data-hreflang]').forEach((el) => el.remove())
    if (!found) return
    const [enPath, esPath] = lang === 'en' ? [path, counterpart(path)] : [counterpart(path), path]
    for (const [hreflang, p] of [['en', enPath], ['es-MX', esPath], ['x-default', enPath]]) {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = hreflang
      link.href = location.origin + BASE + p
      link.dataset.hreflang = ''
      document.head.append(link)
    }
  }, [redirect, lang, path, route, blog, found])

  useEffect(() => {
    // Se hace scroll después de dibujar la página nueva.
    const frame = requestAnimationFrame(() => scrollToHash(hash))
    return () => cancelAnimationFrame(frame)
  }, [path, hash])

  if (redirect) return null
  // Los botones de cita del menú, la barra flotante y el pie abren Adit (dueña, 25-11).
  return (
    <LangContext value={lang}>
      <Layout path={path} appointmentHref={clinic.bookingUrl}>
        <Fragment key={path}>
          <Suspense fallback={<div style={{ minHeight: '100svh' }} />}>
            {blog ? <BlogRoute path={path} /> : page ?? <NotFound />}
            <AnchorWhenReady hash={hash} />
          </Suspense>
        </Fragment>
      </Layout>
    </LangContext>
  )
}
