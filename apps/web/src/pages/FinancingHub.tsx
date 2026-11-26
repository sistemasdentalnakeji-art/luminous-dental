// Financiamiento (/en/financing · /es/financiamiento): una tarjeta por empresa; cada una tiene su página en /financing/<slug>. Textos en content/financing.ts y content/benefitsHub.ts.
import { BenefitsBand, BenefitsHeader, BenefitsSteps } from '@/components/BenefitsHeader'
import { hrefOf } from '@/config/routes'
import { benefitsHubText } from '@/content/benefitsHub'
import { financers, financeText } from '@/content/financing'
import { useLang } from '@/lib/lang'
import { Link } from '@/lib/router'
import { LogoPanel } from '@/pages/Financing'

export default function FinancingHub() {
  const lang = useLang()
  const F = financeText[lang]
  return (
    <section className="sec wrap pg" aria-labelledby="fin-sec-h">
      <BenefitsHeader id="fin-sec-h" eyebrow={F.eyebrow} title={F.title} lead={F.lead} current="financing" />
      <ul className="fin-grid fin-grid--hub">
        {financers.map((f) => (
          <li key={f.slug}>
            <Link className="fin-card" href={hrefOf(`financing:${f.slug}`, lang)} aria-label={`${f.name}: ${F.more}`}>
              <LogoPanel f={f} />
              <span className="fin-card__name">{f.name}</span>
              <span className="fin-card__blurb">{f.blurb[lang]}</span>
              <span className="fin-card__more" aria-hidden="true">{F.more} →</span>
            </Link>
          </li>
        ))}
      </ul>
      <p className="ins-small">{F.note}</p>
      <BenefitsSteps steps={benefitsHubText[lang].financingSteps} />
      <BenefitsBand />
    </section>
  )
}
