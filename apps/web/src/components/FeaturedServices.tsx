// "Featured services": misma estructura que la sección del inicio de Dental Nakeji (título, carrusel, botón a todos los servicios). El carrusel muestra UNA tarjeta ancha
// por diapositiva. Donde Nakeji muestra una foto, el lado derecho de la tarjeta reproduce la animación completa de ese servicio, flotando, en bucle
// (features/figure/ResultFigure.tsx; solo mientras su diapositiva está a la vista; quieta con movimiento reducido). El lado izquierdo tiene el nombre, el gancho,
// 3 frases y el botón "View service". Los textos vienen de content/services.ts (sitio oficial).
// El código de la figura carga una sola vez (en su propio archivo), para las cinco tarjetas, así nunca bloquea el primer dibujo.
import { lazy, Suspense } from 'react'
import { Carousel } from '@/components/Carousel'
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

// Máximo 2 puntos, y ninguno que repita la frase de arriba (docs/mejoras-1-plan.md 1.1).
const bullets = (sentence: string, points: string[]) =>
  points.filter((h) => !sentence.toLowerCase().includes(h.toLowerCase().replace(/\.$/, ''))).slice(0, 2)

export function FeaturedServices() {
  return (
    <section className="sec wrap featured" aria-labelledby="featured-h">
      <header className="featured-head">
        <div>
          <h2 className="h2" id="featured-h">{T.featured.title}</h2>
          <p className="hub-lead">{T.featured.text}</p>
        </div>
        <Link className="tlink featured-all" href="/services">{T.featured.cta}<Icon name="arrowRight" size={18} /></Link>
      </header>
      <Carousel
        label={T.featured.carousel}
        className="carousel--services"
        tabs={T.featured.tabs}
        items={items.map((s) => (
          <article className="service-card" key={s.slug}>
            <div className="service-card__body">
              <h3 className="service-card__title">{s.title}</h3>
              {s.subtitle && <p className="service-card__text">{s.subtitle}</p>}
              <ul className="service-card__list">
                {bullets(s.subtitle, s.highlights).map((h, i) => <li key={i}><span className="service-card__check" aria-hidden="true"><Icon name="check" size={14} /></span>{h}</li>)}
              </ul>
              <Link className="btn service-card__cta" href={serviceHref(s.name)}>
                {T.hub.card}<span className="sr-only">: {s.name}</span>
              </Link>
            </div>
            <div className="service-card__media">
              <Suspense fallback={null}>{s.figure && <ResultFigure id={s.figure} name={s.name} />}</Suspense>
            </div>
          </article>
        ))}
      />
    </section>
  )
}
