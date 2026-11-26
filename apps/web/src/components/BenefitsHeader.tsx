// Piezas comunes de las páginas de Beneficios (hub, seguros, financiamiento, convenios): encabezado asimétrico con tres puntos sin cifras, pasos «cómo funciona» y franja final de reserva.
// Estilos: styles/benefits.css (prefijos bh-, bsteps-, bband-).
import type { ReactNode } from 'react'
import { Icon } from '@/components/Icon'
import { hrefOf, type RouteKey } from '@/config/routes'
import { benefitsHubText } from '@/content/benefitsHub'
import { clinic } from '@/content/clinic'
import { benefitsText } from '@/content/financing'
import { home } from '@/content/home'
import { useLang } from '@/lib/lang'
import { Link } from '@/lib/router'

const KEYS: RouteKey[] = ['insurance', 'financing', 'agreements'] // mismo orden que benefitsText.tabs

export function BenefitsHeader({ id, eyebrow, title, lead, current }: { id: string; eyebrow: string; title: ReactNode; lead: string; current?: RouteKey }) {
  const lang = useLang()
  const B = benefitsText[lang]
  const H = benefitsHubText[lang]
  return (
    <header className="bh">
      <div className="bh-main">
        <p className="pill">{eyebrow}</p>
        <h1 className="bh-title" id={id}>{title}</h1>
        <p className="bh-lead">{lead}</p>
        <div className="bh-cta">
          <a className="btn" href={clinic.bookingUrl} target="_blank" rel="noopener noreferrer">{home[lang].header.cta.label}</a>
          <a className="tlink" href={clinic.phone.href}>{home[lang].footer.phone.label}</a>
        </div>
        {current && (
          <nav className="ben-tabs" aria-label={H.nav}>
            <Link className="ben-tab" href={hrefOf('benefits', lang)}>{H.hubLink}</Link>
            {B.tabs.map((t, i) => (
              <Link key={t.id} className="ben-tab" href={hrefOf(KEYS[i], lang)} aria-current={KEYS[i] === current ? 'page' : undefined}>{t.label}</Link>
            ))}
          </nav>
        )}
      </div>
      <ul className="bh-points">
        {H.points.map((p) => (
          <li key={p.title}>
            <span className="bh-points__icon" aria-hidden="true"><Icon name={p.icon} size={26} /></span>
            <span>
              <strong>{p.title}</strong>
              {p.text}
            </span>
          </li>
        ))}
      </ul>
    </header>
  )
}

/** Pasos «cómo funciona»: una secuencia real, por eso van numerados. */
export function BenefitsSteps({ steps, children }: { steps: { title: string; text: string }[]; children?: ReactNode }) {
  const lang = useLang()
  return (
    <section className="bsteps" aria-labelledby="bsteps-h">
      <h2 className="bsteps-title" id="bsteps-h">{benefitsHubText[lang].how}</h2>
      <ol className="bsteps-list">
        {steps.map((s, i) => (
          <li key={s.title}>
            <span className="ins-dot" aria-hidden="true">{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            {i === steps.length - 1 && children}
          </li>
        ))}
      </ol>
    </section>
  )
}

/** Franja final: la llamada clara a reservar (Adit) o llamar. */
export function BenefitsBand() {
  const lang = useLang()
  const T = benefitsHubText[lang].band
  return (
    <section className="bband" aria-labelledby="bband-h">
      <div>
        <h2 id="bband-h">{T.title}</h2>
        <p>{T.text}</p>
      </div>
      <div className="bh-cta">
        <a className="btn" href={clinic.bookingUrl} target="_blank" rel="noopener noreferrer">{home[lang].header.cta.label}</a>
        <a className="tlink" href={clinic.phone.href}>{home[lang].footer.phone.label}</a>
      </div>
    </section>
  )
}
