// Financiamiento (/en/financing · /es/financiamiento): héroe de un solo contenido + sección común de Beneficios (BenefitsSection): «cómo funciona» a la izquierda, muro de las 4 empresas a la derecha (cada celda lleva a /financing/<slug>). Sin cierre.
// Textos en content/financing.ts y content/benefitsHub.ts.
import { BenefitsHeader, BenefitsSection } from '@/components/BenefitsHeader'
import { hrefOf } from '@/config/routes'
import { benefitsHubText } from '@/content/benefitsHub'
import { benefitsText, financers, financeText } from '@/content/financing'
import { useLang } from '@/lib/lang'
import { Link } from '@/lib/router'
import { LogoPanel } from '@/pages/Financing'

export default function FinancingHub() {
  const lang = useLang()
  const F = financeText[lang], H = benefitsHubText[lang]
  return (
    <section className="sec wrap pg lines" aria-labelledby="fin-sec-h">
      <BenefitsHeader id="fin-sec-h" eyebrow={benefitsText[lang].eyebrow} title={F.title} lead={F.lead} current="financing" solo />
      <BenefitsSection
        id="fin-wall-h"
        title={H.how}
        aside={(
          <ol className="bsec__steps">
            {H.financingSteps.map((s, i) => (
              <li key={s.title}><span className="ins-dot" aria-hidden="true">{i + 1}</span><span><strong>{s.title}</strong>{s.text}</span></li>
            ))}
          </ol>
        )}
      >
        <ul className="bsec__wall bsec__wall--fin" aria-label={F.title}>
          {financers.map((f) => (
            <li key={f.slug}>
              <Link className="bcell" href={hrefOf(`financing:${f.slug}`, lang)}>
                <LogoPanel f={f} />
                <span className="bcell__text">{f.blurb[lang]}</span>
                <span className="bcell__more" aria-hidden="true">{F.more} →</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="ins-small bsec__note">{F.note}</p>
      </BenefitsSection>
    </section>
  )
}
