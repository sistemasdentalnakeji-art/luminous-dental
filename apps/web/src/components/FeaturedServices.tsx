// "Featured services": misma estructura que la sección del inicio de Dental Nakeji (título, carrusel, botón a todos los servicios). El carrusel muestra UNA tarjeta ancha
// por diapositiva. Donde Nakeji muestra una foto, el lado derecho de la tarjeta reproduce la animación completa de ese servicio, flotando, en bucle
// (features/figure/ResultFigure.tsx; solo mientras su diapositiva está a la vista; quieta con movimiento reducido). El lado izquierdo tiene el nombre, el gancho,
// 3 frases y el botón "View service". Los textos vienen de content/services.ts (sitio oficial).
// El código de la figura carga una sola vez (en su propio archivo), para las cinco tarjetas, así nunca bloquea el primer dibujo.
import { lazy, Suspense, type PointerEvent } from 'react'
import { Carousel } from '@/components/Carousel'
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

// Máximo 3 beneficios (chips), y ninguno que repita la frase de arriba (docs/mejoras-1-plan.md 1.1).
const bullets = (sentence: string, points: string[]) =>
  points.filter((h) => !sentence.toLowerCase().includes(h.toLowerCase().replace(/\.$/, ''))).slice(0, 3)

// Luz del borde y leve inclinación 3D que siguen al mouse (--mx/--my/--rx/--ry). Solo con mouse: en celular la tarjeta se ve completa sin tocar nada.
const aim = (e: PointerEvent<HTMLElement>) => {
  if (e.pointerType !== 'mouse') return
  const c = e.currentTarget, r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
  c.style.setProperty('--mx', `${x * 100}%`); c.style.setProperty('--my', `${y * 100}%`)
  c.style.setProperty('--ry', `${(x - 0.5) * 5}deg`); c.style.setProperty('--rx', `${(0.5 - y) * 4}deg`)
}
const rest = (e: PointerEvent<HTMLElement>) => ['--rx', '--ry'].forEach((k) => e.currentTarget.style.setProperty(k, '0deg'))

export function FeaturedServices() {
  return (
    <section className="sec wrap featured" aria-labelledby="featured-h">
      <header className="featured-head">
        <div>
          <RevealText className="h2" id="featured-h" line accent="services">{T.featured.title}</RevealText>
          <RevealText as="p" mode="blur" className="hub-lead">{T.featured.text}</RevealText>
        </div>
        <Link className="tlink featured-all" href="/services">{T.featured.cta}<Icon name="arrowRight" size={18} /></Link>
      </header>
      <Carousel
        label={T.featured.carousel}
        className="carousel--services"
        tabs={T.featured.tabs}
        items={items.map((s) => (
          <article className="service-card" key={s.slug} onPointerMove={aim} onPointerLeave={rest}>
            <div className="service-card__body">
              <p className="service-card__eyebrow"><span className="service-card__icon" aria-hidden="true"><Icon name="sparkle" size={16} /></span>{s.group}</p>
              <h3 className="service-card__title">{s.title}</h3>
              {s.subtitle && <p className="service-card__text">{s.subtitle}</p>}
              <ul className="service-card__list" aria-label={`${s.name}: what it offers`}>
                {bullets(s.subtitle, s.highlights).map((h, i) => <li key={i}><span className="service-card__check" aria-hidden="true"><Icon name="check" size={14} /></span>{h}</li>)}
              </ul>
              <Link className="btn service-card__cta" href={serviceHref(s.name)}>
                <span>{T.hub.card}<span className="sr-only">: {s.name}</span></span><Icon name="arrowRight" size={18} />
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
