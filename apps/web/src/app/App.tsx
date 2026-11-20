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

/** The page for an address, or null when there is none. (Blog addresses are handled by BlogRoute, which knows the articles.) */
function pageFor(path: string) {
  const Fixed = fixed[path]
  if (Fixed) return <Fixed />
  const service = servicePages.find((s) => serviceHref(s.name) === path)
  if (service) return <Service page={service} />
  return null
}

/** Scroll to the anchor if there is one, else to the top. */
function scrollToHash(hash: string) {
  let id = hash.slice(1)
  try { id = decodeURIComponent(id) } catch { /* a broken address such as #%E0: use it as written */ }
  const target = id && document.getElementById(id)
  if (target) target.scrollIntoView()
  else if (!hash) scrollTo({ top: 0, behavior: 'instant' })
}

/** Sits beside a page that loads apart: it only mounts once the page is drawn, and then goes to the anchor (e.g. /services#cosmetic). */
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
    if (!blog) document.title = route?.title ?? notFoundTitle // blog pages set their own title
  }, [route, blog])
  useEffect(() => {
    // Scroll after the new page is drawn.
    const frame = requestAnimationFrame(() => scrollToHash(hash))
    return () => cancelAnimationFrame(frame)
  }, [path, hash])
  // A page without the form (the error page) sends the appointment buttons to the Contact page, which has it.
  // key={path}: each address starts clean, so the form never keeps another page's treatment, errors or messages.
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
