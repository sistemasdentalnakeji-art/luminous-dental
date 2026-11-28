import { lazy, Suspense } from 'react'
import { Icon } from '@/components/Icon'
import { home } from '@/content/home'
import { hrefOf } from '@/config/routes'
import { useLang } from '@/lib/lang'
import { Link, NewTab } from '@/lib/router'

const BeforeAfter = lazy(() => import('@/components/BeforeAfter')) // carga aparte: lo pesado no frena el titular

// Héroe del inicio: columna izquierda replicada de «Luminous Dental - Smile Makeover.html».
export function Hero() {
  const lang = useLang()
  const { hero } = home[lang]
  return (
    <section className="hx" id="top">
      <div className="wrap hx-grid">
        <div className="hx-copy">
          <Link className="hx-pill" href={`${hrefOf('contact', lang)}#emergencies`}><Icon name="pin" size={16} />{hero.pill}</Link>
          <h1>
            {hero.lines.map((l) => <span key={l} className="hx-ln">{l}</span>)}
            <em>{hero.emphasis}</em>
          </h1>
          <p className="hx-sub">{hero.support}</p>
          <div className="hx-actions">
            <a className="hx-btn hx-btn-main" href={hero.primaryCta.href} target="_blank" rel="noopener noreferrer">{hero.primaryCta.label}<span className="hx-bub"><Icon name="arrowRight" size={18} /></span><NewTab /></a>
            <a className="hx-btn hx-btn-ghost" href={hero.secondaryCta.href}>{hero.secondaryCta.label}<span className="hx-bub"><Icon name="phone" size={16} /></span></a>
          </div>
          <a className="hx-more" href={hero.more.href}>{hero.more.label}<Icon name="chevronDown" size={18} /></a>
        </div>
        <div className="hx-slot"><Suspense fallback={null}><BeforeAfter /></Suspense></div>
      </div>
    </section>
  )
}
