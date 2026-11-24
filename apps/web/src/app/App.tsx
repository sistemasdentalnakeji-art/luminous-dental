import { Fragment, Suspense, useEffect, type ComponentType } from 'react'
import { Layout } from '@/components/Layout'
import { notFoundTitle, routes } from '@/config/routes'
import { serviceHref } from '@/content/clinic'
import { servicePages } from '@/content/services'
import { About, BlogRoute, Insurance, Privacy, Service, Services, Terms } from '@/lib/pages'
import { useLocation } from '@/lib/router'
import Contact from '@/pages/Contact'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'

const fixed: Record<string, ComponentType> = {
  '/': Home,
  '/about': About,
  '/services': Services,
  '/insurance-financing': Insurance,
  '/contact': Contact,
  '/privacy-policy': Privacy,
  '/terms-and-conditions': Terms,
}

const defaultDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''
const isBlog = (path: string) => path === '/blog' || path.startsWith('/blog/')

/** La página de una dirección, o null si no hay ninguna. (Las direcciones del blog las maneja BlogRoute, que conoce los artículos.) */
function pageFor(path: string) {
  const Fixed = fixed[path]
  if (Fixed) return <Fixed />
  const service = servicePages.find((s) => serviceHref(s.name) === path)
  if (service) return <Service page={service} />
  return null
}

/** Va al ancla si hay una; si no, al inicio. */
function scrollToHash(hash: string) {
  let id = hash.slice(1)
  try { id = decodeURIComponent(id) } catch { /* una dirección rota como #%E0: se usa tal cual */ }
  const target = id && document.getElementById(id)
  if (target) target.scrollIntoView()
  else if (!hash) scrollTo({ top: 0, behavior: 'instant' })
}

/** Va junto a una página que carga aparte: solo se monta cuando la página ya está dibujada y entonces va al ancla (p. ej. /services#cosmetic). */
function AnchorWhenReady({ hash }: { hash: string }) {
  useEffect(() => { if (hash) scrollToHash(hash) }, [hash])
  return null
}

export default function App() {
  const { path, hash } = useLocation()
  const blog = isBlog(path)
  const route = routes.find((r) => r.path === path)
  const page = route ? pageFor(path) : null
  useEffect(() => {
    if (!blog) document.title = route?.title ?? notFoundTitle // las páginas del blog ponen su propio título
    document.querySelector('meta[name="description"]')?.setAttribute('content', route?.description ?? defaultDescription)
  }, [route, blog])
  useEffect(() => {
    // Se hace scroll después de dibujar la página nueva.
    const frame = requestAnimationFrame(() => scrollToHash(hash))
    return () => cancelAnimationFrame(frame)
  }, [path, hash])
  // Una página sin el formulario (la de error) manda los botones de cita a la página Contact, que sí lo tiene.
  // key={path}: cada dirección empieza limpia, así el formulario nunca conserva el tratamiento, los errores o los mensajes de otra página.
  // El formulario rápido solo está en el inicio y en Contact (dueña, 23-11 r5): en el resto, los botones de cita van a /contact#appointment.
  const hasForm = path === '/' || path === '/contact'
  return (
    <Layout path={path} appointmentHref={hasForm ? '#appointment' : '/contact#appointment'}>
      <Fragment key={path}>
        <Suspense fallback={<div style={{ minHeight: '100svh' }} />}>
          {blog ? <BlogRoute path={path} /> : page ?? <NotFound />}
          <AnchorWhenReady hash={hash} />
        </Suspense>
      </Fragment>
    </Layout>
  )
}
