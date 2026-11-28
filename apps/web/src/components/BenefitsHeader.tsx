// Piezas comunes de las páginas de Beneficios (hub, seguros, financiamiento, convenios): encabezado asimétrico con tres puntos sin cifras, pasos «cómo funciona» y franja final de reserva.
// Estilos: styles/benefits.css (prefijos bh-, bsteps-, bband-).
import type { ReactNode } from 'react'
import { Icon } from '@/components/Icon'
import type { RouteKey } from '@/config/routes'
import { benefitsHubText } from '@/content/benefitsHub'
import { clinic } from '@/content/clinic'
import { home } from '@/content/home'
import { useLang } from '@/lib/lang'
import { NewTab } from '@/lib/router'

export function BenefitsHeader({ id, eyebrow, title, lead, current, solo }: { id: string; eyebrow: string; title: ReactNode; lead: string; current?: RouteKey; solo?: boolean }) {
  const lang = useLang()
  const H = benefitsHubText[lang]
  return (
    <header className={solo ? 'bh bh--solo' : 'bh'}>
      <div className="bh-main">
        <p className="pill">{eyebrow}</p>
        <h1 className="bh-title" id={id}>{title}</h1>
        <p className="bh-lead">{lead}</p>
        <div className="bh-cta">
          <a className="btn" href={clinic.bookingUrl} target="_blank" rel="noopener noreferrer">{home[lang].header.cta.label}<NewTab /></a>
          {current ? (
            <a className="btn btn--call" href={clinic.phone.href} aria-label={home[lang].footer.phone.label}><Icon name="phone" size={20} />{clinic.phone.label}</a>
          ) : (
            <a className="tlink" href={clinic.phone.href}>{home[lang].footer.phone.label}</a>
          )}
        </div>
      </div>
        {!solo && (
        <ul className="bh-points ln-frame">
          {H.points.map((p) => (
            <li key={p.title}>
              <span className="bh-points__icon aura" aria-hidden="true"><Icon name={p.icon} size={26} /></span>
              <span>
                <strong>{p.title}</strong>
                {p.text}
              </span>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

/** Pasos «cómo funciona»: una secuencia real, por eso van numerados. */
export function BenefitsSteps({ steps, children }: { steps: { title: string; text: string }[]; children?: ReactNode }) {
  const lang = useLang()
  return (
    <section className="bsteps" aria-labelledby="bsteps-h">
      <h2 className="bsteps-title" id="bsteps-h">{benefitsHubText[lang].how}</h2>
      <ol className="bsteps-list ln-frame">
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
    <section className="bband ln-frame" aria-labelledby="bband-h">
      <div>
        <h2 id="bband-h">{T.title}</h2>
        <p>{T.text}</p>
      </div>
      <div className="bh-cta">
        <a className="btn" href={clinic.bookingUrl} target="_blank" rel="noopener noreferrer">{home[lang].header.cta.label}<NewTab /></a>
        <a className="tlink" href={clinic.phone.href}>{home[lang].footer.phone.label}</a>
      </div>
    </section>
  )
}

/** Sección de contenido común de Seguros, Financiamiento y Convenios (r11): texto a la izquierda (título, frase y lo suyo en `aside`) y a la derecha un muro de líneas finas (sin tarjetas con fondo). Sin cierre. Estilos: benefits-r2.css, bloque «r11». */
export function BenefitsSection({ id, title, lead, aside, children }: { id: string; title: string; lead?: string; aside?: ReactNode; children: ReactNode }) {
  return (
    <section className="bsec ln-frame" aria-labelledby={id}>
      <div className="bsec__text">
        <h2 className="bsec__title" id={id}>{title}</h2>
        {lead && <p className="bsec__lead">{lead}</p>}
        {aside}
      </div>
      {children}
    </section>
  )
}
