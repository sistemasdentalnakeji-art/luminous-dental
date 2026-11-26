// Hub de servicios: todos los servicios fijos y visibles, agrupados por categoría (cada grupo conserva su ancla: /en/services#cosmetic). Cada servicio es una tarjeta (ícono, nombre y una línea)
// que entera es un enlace a su página, un clic. Los filtros por necesidad («me duele», «quiero mejorar mi sonrisa»…) solo resaltan tarjetas; no esconden ninguna.
// Textos de la página en content/services.ts (serviceText); los del filtro en content/servicesHub.ts. Estilos: styles/services-hub.css.
import { useState } from 'react'
import { Icon } from '@/components/Icon'
import { hrefOf } from '@/config/routes'
import { clinic } from '@/content/clinic'
import { home } from '@/content/home'
import { servicesOf, serviceText } from '@/content/services'
import { needIds, servicesHubText, type NeedId } from '@/content/servicesHub'
import { useLang } from '@/lib/lang'
import { Link } from '@/lib/router'

export default function Services() {
  const lang = useLang()
  const T = serviceText[lang], H = servicesHubText[lang]
  const groups = home[lang].services.groups
  const all = servicesOf(lang)
  const [need, setNeed] = useState<NeedId | null>(null)
  const matches = need ? new Set(needIds[need]) : null
  const inGroup = (id: string) => all.filter((s) => s.groupId === id)
  const count = matches ? all.filter((s) => matches.has(s.id)).length : all.length
  return (
    <section className="sec wrap pg" aria-labelledby="svc-hub-h">
      <header className="hub-hero">
        <p className="pill">{T.eyebrow}</p>
        <h1 className="h2" id="svc-hub-h">{T.hub.title} <span className="accent">{T.hub.accent}</span></h1>
        <p className="hub-lead">{T.hub.lead}</p>
        <div className="svc-filter" role="group" aria-labelledby="svc-filter-h">
          <h2 className="svc-filter__label" id="svc-filter-h">{H.filterLabel}</h2>
          <div className="svc-chips">
            <button type="button" className="svc-chip" aria-pressed={!need} onClick={() => setNeed(null)}>{H.all}</button>
            {(Object.keys(H.needs) as NeedId[]).map((id) => (
              <button type="button" className="svc-chip" key={id} aria-pressed={need === id} onClick={() => setNeed(need === id ? null : id)}>{H.needs[id]}</button>
            ))}
          </div>
          <p className="svc-status" role="status">{need ? H.count(count, all.length) : H.countAll(all.length)}</p>
          {need === 'pain' && (
            <div className="svc-note">
              <p>{H.painNote}</p>
              <a className="tlink" href={clinic.phone.href}>{home[lang].footer.phone.label}</a>
            </div>
          )}
        </div>
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
          <ul className="svc-grid" data-n={inGroup(g.id).length}>
            {inGroup(g.id).map((s) => (
              <li key={s.id}>
                <Link className="svc-card" href={hrefOf(`service:${s.id}`, lang)} data-match={matches?.has(s.id) ?? false} data-dim={matches ? !matches.has(s.id) : false}>
                  <span className="catalog-card__icon"><Icon name={s.icon} size={26} /></span>
                  <span className="svc-card__name">{s.name}</span>
                  <span className="svc-card__line">{s.subtitle || H.noLine}</span>
                  <span className="svc-card__go" aria-hidden="true"><Icon name="arrowRight" size={20} /></span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </section>
  )
}
