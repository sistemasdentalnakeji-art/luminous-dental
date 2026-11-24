// "Featured services": misma estructura que la sección del inicio de Dental Nakeji (título, carrusel, botón a todos los servicios). El carrusel (variante «riel» de
// components/Carousel.tsx, 23-11-2026 r3) es una tarjeta de vidrio con tres zonas: pestañas verticales a la izquierda, el texto (nombre del grupo arriba y, centrada, la tarjeta de Dental Nakeji: ícono, nombre, gancho,
// 3 frases y botón) al centro y, en su propia ventana, la animación completa del servicio flotando en bucle (features/figure/ResultFigure.tsx; solo mientras su
// diapositiva está a la vista; quieta con movimiento reducido), con el botón de pausa en la esquina de la ventana. Los textos vienen de content/services.ts (sitio oficial).
// El código de la figura carga una sola vez (en su propio archivo), para las cinco tarjetas, así nunca bloquea el primer dibujo.
import { lazy, Suspense } from 'react'
import { Carousel } from '@/components/Carousel'
import { ServiceGlyph } from '@/components/ServiceGlyph'
import { RevealText } from '@/components/RevealText'
import { Icon } from '@/components/Icon'
import { serviceHref } from '@/content/clinic'
import { featuredNames, servicePages, serviceText as T } from '@/content/services'
import { Link } from '@/lib/router'

const ResultFigure = lazy(() => import('@/features/figure/ResultFigure'))
const items = featuredNames.map((name) => {
  const page = servicePages.find((p) => p.name === name)
  if (!page?.figure) throw new Error(`Featured service without page or figure: ${name}`)
  return page
})

const c = (name: string) => T.featured.copy[name as keyof typeof T.featured.copy]

export function FeaturedServices() {
  return (
    <section className="sec wrap featured" aria-labelledby="featured-h">
      <header className="featured-head">
        <RevealText className="h2" id="featured-h" line accent="services">{T.featured.title}</RevealText>
      </header>
      <div className="featured-stage">
      <span className="sc__badge">{T.featured.badge}</span>
      <Carousel
        label={T.featured.carousel}
        className="carousel--services"
        tabs={T.featured.tabs}
        items={items.map((s) => (
          <article className="sc__article" key={s.slug}>
            <div className="sc__body">
              <p className="sc__eyebrow">{s.group}</p>
              {/* Sin caja de fondo: arriba el ícono, en medio la información (título, gancho y frases con check) y abajo el botón. */}
              <div className="sc__head">
                <span className="icon-badge siri" aria-hidden="true">{s.figure && <ServiceGlyph id={s.figure} size={28} />}</span>
                <h3 className="sc__title">{s.title}</h3>
              </div>
              <div className="sc__card">
                <p className="sc__text">{c(s.name).text}</p>
                <ul className="sc__chips" aria-label={`${s.name}: what it offers`}>
                  {c(s.name).points.map((h, i) => <li key={i}><span className="sc__check" aria-hidden="true"><Icon name="check" size={14} /></span>{h}</li>)}
                </ul>
              </div>
              <div className="sc__actions">
              <Link className="sc__cta" href={serviceHref(s.name)}>
                <span className="sc__dot" aria-hidden="true" />
                <span className="sc__lab">{T.featured.card}<span className="sr-only">: {s.name}</span></span>
                <span className="sc__over" aria-hidden="true">{T.featured.card}<Icon name="arrowRight" size={18} /></span>
              </Link>
              <Link className="btn btn-ghost sc__all" href="/services">{T.featured.cta}</Link>
              </div>
            </div>
            <div className="sc__fig">
              <Suspense fallback={null}>{s.figure && <ResultFigure id={s.figure} name={s.name} />}</Suspense>
            </div>
          </article>
        ))}
      />
      </div>
    </section>
  )
}
