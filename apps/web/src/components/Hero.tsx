import { lazy, Suspense } from 'react'
import { Icon } from '@/components/Icon'
import { home } from '@/content/home'

const BeforeAfter = lazy(() => import('@/components/BeforeAfter')) // carga aparte: lo pesado no frena el titular

// Héroe del inicio: columna izquierda replicada de «Luminous Dental - Smile Makeover.html».
const { hero } = home

export function Hero() {
  return (
    <section className="hx" id="top">
      <div className="wrap hx-grid">
        <div className="hx-copy">
          <p className="hx-pill"><Icon name="pin" size={16} />{hero.pill}</p>
          <h1>
            {hero.lines.map((l) => <span key={l} className="hx-ln">{l}</span>)}
            <em>{hero.emphasis}</em>
          </h1>
          <p className="hx-sub">{hero.support}</p>
          <div className="hx-actions">
            <a className="hx-btn hx-btn-main" href={hero.primaryCta.href}>{hero.primaryCta.label}<span className="hx-bub"><Icon name="arrowRight" size={18} /></span></a>
            <a className="hx-btn hx-btn-ghost" href={hero.secondaryCta.href}>{hero.secondaryCta.label}<span className="hx-bub"><Icon name="phone" size={16} /></span></a>
          </div>
          <a className="hx-more" href={hero.more.href}>{hero.more.label}<Icon name="chevronDown" size={18} /></a>
        </div>
        <div className="hx-slot"><Suspense fallback={null}><BeforeAfter /></Suspense></div>
      </div>
    </section>
  )
}
