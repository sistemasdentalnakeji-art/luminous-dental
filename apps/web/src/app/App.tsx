import { Fragment, Suspense, useEffect, useState, type ComponentType } from 'react'
import { Layout } from '@/components/Layout'
import { notFoundTitle, routes } from '@/config/routes'
import { serviceHref } from '@/content/clinic'
import { servicePages } from '@/content/services'
import { About, BlogRoute, Insurance, Service, Services } from '@/lib/pages'
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
}

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
  const [missingBlog, setMissingBlog] = useState('')
  useEffect(() => {
    if (!blog) document.title = route?.title ?? notFoundTitle // las páginas del blog ponen su propio título
  }, [route, blog])
  useEffect(() => {
    // Se hace scroll después de dibujar la página nueva.
    const frame = requestAnimationFrame(() => scrollToHash(hash))
    return () => cancelAnimationFrame(frame)
  }, [path, hash])
  // Una página sin el formulario (la de error) manda los botones de cita a la página Contact, que sí lo tiene.
  // key={path}: cada dirección empieza limpia, así el formulario nunca conserva el tratamiento, los errores o los mensajes de otra página.
  const hasForm = blog ? missingBlog !== path : !!page
  return (
    <Layout path={path} appointmentHref={hasForm ? '#appointment' : '/contact#appointment'}>
      <Fragment key={path}>
        <Suspense fallback={null}>
          {blog ? <BlogRoute path={path} onMissing={setMissingBlog} /> : page ?? <NotFound />}
          <AnchorWhenReady hash={hash} />
        </Suspense>
      </Fragment>
    </Layout>
  )
}
