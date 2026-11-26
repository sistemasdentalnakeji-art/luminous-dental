// Página de servicio, las mismas secciones en el mismo orden que la plantilla de Dental Nakeji:
// 1. Hero (migas de pan, título, subtítulo, 3 puntos, botones) · 2. Sobre el tratamiento (título en forma de pregunta, párrafo, botón al blog,
// y a la derecha la figura de ese servicio si la tiene; sin figura = sin caja vacía) · 3. Formulario de cita con el servicio elegido.
import { lazy, Suspense } from 'react'
import { Icon } from '@/components/Icon'
import { blogHref, hrefOf } from '@/config/routes'
import { ServiceBeforeAfter } from '@/components/ServiceBeforeAfter'
import { beforeAfter } from '@/content/beforeAfter'
import { clinic } from '@/content/clinic'
import { servicePhotos } from '@/content/servicePhotos'
import { type ServicePage, serviceText } from '@/content/services'
import { ui } from '@/content/ui'
import { useLang } from '@/lib/lang'
import { Link } from '@/lib/router'
import '@/styles/service-photo.css'

const Figure = lazy(() => import('@/features/figure/Figure'))

export default function Service({ page }: { page: ServicePage }) {
  const lang = useLang()
  const T = serviceText[lang]
  const blogLink = page.blogKey ? blogHref(lang, page.blogKey) : undefined
  const hasText = Boolean(page.about || blogLink)
  const photo = servicePhotos[page.id]
  const src = (dir: string) => `${import.meta.env.BASE_URL}images/servicios/${dir}${photo?.file}.webp`
  return (
    <>
      <section className={`service-hero wrap${photo ? ' service-hero--photo' : ''}`} aria-labelledby="service-h">
        {photo && (
          <div className="service-hero__bg">
            <img
              src={src('')} srcSet={`${src('640/')} 640w, ${src('1280/')} 1280w, ${src('')} 2000w`} sizes="(min-width: 1440px) 1440px, 100vw"
              width="2000" height="1125" alt={photo.alt[lang]} fetchPriority="high" decoding="async" style={photo.position ? { objectPosition: photo.position } : undefined}
            />
            <div className="service-hero__scrim" aria-hidden="true" />
          </div>
        )}
        <nav className="crumbs" aria-label={T.crumbs}>
          <ol>
            <li><Link href={hrefOf('services', lang)}>{ui[lang].services}</Link></li>
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
          <Link className="btn" href={clinic.bookingUrl}>{T.book}</Link>
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
                {blogLink && <Link className="btn btn-ghost" href={blogLink}>{T.blogCta}</Link>}
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
      {beforeAfter[page.id] && <ServiceBeforeAfter id="service-ba" cases={beforeAfter[page.id]} />}
    </>
  )
}
