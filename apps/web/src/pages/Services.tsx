// Portada de servicios, mismo orden de secciones que /servicios/ de Dental Nakeji: hero (antetítulo, título, entrada, índice de categorías) →
// un bloque por categoría (título e introducción a la izquierda, una tarjeta por servicio a la derecha: ícono, título, 3 puntos, "View service").
import { Icon } from '@/components/Icon'
import { serviceHref } from '@/content/clinic'
import { home } from '@/content/home'
import { servicePages, serviceText as T } from '@/content/services'
import { Link } from '@/lib/router'

const groups = home.services.groups.map((g) => ({ ...g, id: g.href.split('#')[1] }))

export default function Services() {
  return (
    <>
      <section className="sec wrap pg" aria-labelledby="svc-hub-h">
        <header className="hub-hero">
          <p className="pill">{T.eyebrow}</p>
          <h1 className="h2" id="svc-hub-h">{T.hub.title} <span className="accent">{T.hub.accent}</span></h1>
          <p className="hub-lead">{T.hub.lead}</p>
          <nav className="hub-index" aria-label={T.hub.indexLabel}>
            <p>{T.hub.indexLabel}</p>
            <ol>{groups.map((g) => <li key={g.id}><a href={`#${g.id}`}>{g.name}</a></li>)}</ol>
          </nav>
        </header>
        {groups.map((g) => (
          <section className="catalog-group" id={g.id} key={g.id} aria-labelledby={`${g.id}-h`}>
            <div className="catalog-rail">
              <h2 id={`${g.id}-h`}>{g.name}</h2>
              <p>{g.line}</p>
            </div>
            <ul className="catalog-grid">
              {servicePages.filter((s) => s.group === g.name).map((s) => (
                <li key={s.slug}>
                  <article className="catalog-card">
                    <span className="catalog-card__icon"><Icon name={s.icon} size={26} /></span>
                    <h3>{s.name}</h3>
                    {s.highlights.length === 0 && <p className="catalog-card__none">{T.noText}</p>}
                    {s.highlights.length > 0 && (
                      <ul className="catalog-card__points">
                        {s.highlights.map((h, i) => <li key={i}><Icon name="check" size={18} />{h}</li>)}
                      </ul>
                    )}
                    <Link className="catalog-card__link" href={serviceHref(s.name)}>
                      {T.hub.card}<span className="sr-only">: {s.name}</span><Icon name="arrowRight" size={18} />
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </section>
    </>
  )
}
