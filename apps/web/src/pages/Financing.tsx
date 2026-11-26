// Página individual de una empresa de financiamiento: qué es, cómo se usa en la clínica (pasos generales) y enlace al sitio oficial. Textos en content/financing.ts. Estilos en styles/benefits.css.
import { hrefOf } from '@/config/routes'
import { clinic } from '@/content/clinic'
import { financers, financeText, type Financer } from '@/content/financing'
import { useLang } from '@/lib/lang'
import { Link } from '@/lib/router'

const base = import.meta.env.BASE_URL
export const LogoPanel = ({ f, size = 'md' }: { f: Financer; size?: 'md' | 'lg' }) => (
  <span className={`fin-logo fin-logo--${size}`} style={{ '--brand': f.accent, '--ar': f.w / f.h } as React.CSSProperties}>
    <img src={`${base}benefits/${f.logo}`} alt={f.name} width={f.w} height={f.h} />
  </span>
)

export default function Financing({ slug }: { slug: string }) {
  const lang = useLang()
  const T = financeText[lang]
  const f = financers.find((x) => x.slug === slug)!
  const steps = T.steps(f.name)
  return (
    <section className="sec wrap pg fin-page" aria-labelledby="fin-h">
      <Link className="fin-back" href={hrefOf('financing', lang)}>← {T.title}</Link>
      <header className="fin-hero">
        <LogoPanel f={f} size="lg" />
        <div>
          <p className="pill">{T.eyebrow}</p>
          <h1 className="h2" id="fin-h">{f.name}</h1>
          <p className="ins-lead">{f.about[lang]}</p>
          <div className="ins-actions">
            <a className="btn" href={f.site} target="_blank" rel="noopener noreferrer">{T.official(f.name)}</a>
            <a className="tlink" href={clinic.bookingUrl} target="_blank" rel="noopener noreferrer">{T.book}</a>
          </div>
        </div>
      </header>
      <h2 className="fin-h2">{T.heading}</h2>
      <ol className="fin-steps">
        {steps.map((s, i) => (
          <li key={s}><span className="ins-dot" aria-hidden="true">{i + 1}</span><p>{s}</p></li>
        ))}
      </ol>
      <p className="ins-small">{T.disclaimer(f.name)} <a className="tlink" href={clinic.phone.href}>{clinic.phone.label}</a></p>
      <h2 className="fin-h2">{T.others}</h2>
      <ul className="fin-grid fin-grid--sm">
        {financers.filter((x) => x.slug !== slug).map((o) => (
          <li key={o.slug}>
            <Link className="fin-card" href={hrefOf(`financing:${o.slug}`, lang)} aria-label={`${o.name}: ${T.more}`}>
              <LogoPanel f={o} />
              <span className="fin-card__name">{o.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
