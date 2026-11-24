// Página de servicio, las mismas secciones en el mismo orden que la plantilla de Dental Nakeji:
// 1. Hero (migas de pan, título, subtítulo, 3 puntos, botones) · 2. Sobre el tratamiento (título en forma de pregunta, párrafo, botón al blog,
// y a la derecha la figura de ese servicio si la tiene; sin figura = sin caja vacía) · 3. Formulario de cita con el servicio elegido.
import { lazy, Suspense } from 'react'
import { Icon } from '@/components/Icon'
import { clinic } from '@/content/clinic'
import { type ServicePage, serviceText as T } from '@/content/services'
import { articleOf, blogPath } from '@/lib/blog'
import { Link } from '@/lib/router'

const Figure = lazy(() => import('@/features/figure/Figure'))

export default function Service({ page }: { page: ServicePage }) {
  const blogHref = page.blogKey && articleOf(page.blogKey) ? blogPath(page.blogKey) : null
  const hasText = Boolean(page.about || blogHref)
  return (
    <>
      <section className="service-hero wrap" aria-labelledby="service-h">
        <nav className="crumbs" aria-label={T.crumbs}>
          <ol>
            <li><Link href="/services">Services</Link></li>
            <li aria-current="page">{page.name}</li>
          </ol>
        </nav>
        <h1 id="service-h">{page.title}</h1>
        {page.subtitle ? <p className="service-hero__sub">{page.subtitle}</p> : page.highlights.length === 0 && <p className="service-hero__sub">{T.noText}</p>}
        {page.highlights.length > 0 && (
          <ul className="service-hero__list">
            {page.highlights.map((h, i) => <li key={i}><Icon name="check" size={18} />{h}</li>)}
          </ul>
        )}
        <div className="hero-cta">
          <Link className="btn" href="/contact#appointment">{T.book}</Link>
          <a className="btn btn-ghost" href={clinic.phone.href}>{T.call}</a>
        </div>
      </section>
      {(hasText || page.figure) && (
        <section className="sec wrap" aria-labelledby={page.about ? 'service-about-h' : undefined} aria-label={page.about ? undefined : T.aboutEyebrow}>
          <div className={`service-about${hasText && page.figure ? '' : ' service-about--solo'}`}>
            {hasText && (
              <div>
                {page.about && (
                  <>
                    <p className="pill">{T.aboutEyebrow}</p>
                    <h2 className="h2" id="service-about-h">{page.about.title}</h2>
                    <p className="service-about__text">{page.about.text}</p>
                  </>
                )}
                {blogHref && <Link className="btn btn-ghost" href={blogHref}>{T.blogCta}</Link>}
              </div>
            )}
            {page.figure && (
              <div className="service-spot">
                <Suspense fallback={<div className="fig-hold" aria-hidden="true" />}><Figure only={page.figure} /></Suspense>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}
