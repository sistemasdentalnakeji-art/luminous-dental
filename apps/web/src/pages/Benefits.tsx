// Hub de Beneficios (/en/benefits · /es/beneficios): composición asimétrica. Seguros (tarjeta grande con muestra de logos), Financiamiento (logos de las empresas) y Convenios (SAHARA Las Vegas);
// cada tarjeta entera es un enlace a su página. Debajo: cómo funciona y la franja de reserva. Textos en content/benefitsHub.ts.
import type { CSSProperties, ReactNode } from 'react'
import { BenefitsBand, BenefitsHeader, BenefitsSteps } from '@/components/BenefitsHeader'
import { Icon } from '@/components/Icon'
import { hrefOf } from '@/config/routes'
import { benefitsHubText } from '@/content/benefitsHub'
import { benefitsText, financers } from '@/content/financing'
import { insurers } from '@/content/insurers'
import { useLang } from '@/lib/lang'
import { Link } from '@/lib/router'
import { LogoPanel } from '@/pages/Financing'

const base = import.meta.env.BASE_URL

export default function Benefits() {
  const lang = useLang()
  const H = benefitsHubText[lang], T = H.hub
  const [ins, fin, agr] = T.cards
  const card = (c: typeof ins, preview: ReactNode, cls: string) => (
    <Link className={`bcard ln-frame ${cls}`} href={hrefOf(c.to, lang)}>
      {c.to !== 'agreements' && <span className="bcard__icon aura"><Icon name={c.icon} size={26} /></span>}
      <span className="bcard__title">{c.title}</span>
      <span className="bcard__text">{c.text}</span>
      {preview}
      <span className="bcard__cta">{c.cta}<Icon name="arrowRight" size={18} /></span>
    </Link>
  )
  return (
    <section className="sec wrap pg lines" aria-labelledby="ben-h">
      <BenefitsHeader id="ben-h" eyebrow={benefitsText[lang].eyebrow} title={<>{T.title} <span className="accent">{T.accent}</span></>} lead={T.lead} solo />
      <ul className="bhub" aria-label={T.cardsLabel}>
        <li className="bhub__ins">
          {card(ins, (
            <span className="bcard__logos" aria-hidden="true">
              {insurers.slice(0, 15).map(([name, file, w, h]) => (
                <span key={name} className="bcard__logo" style={{ '--ar': w / h } as CSSProperties}><img src={`${base}insurers/png/${file}.png`} width={w} height={h} alt="" loading="lazy" decoding="async" /></span>
              ))}
            </span>
          ), 'bcard--big')}
        </li>
        <li className="bhub__fin">
          {card(fin, <span className="bcard__fins" aria-hidden="true">{financers.map((f) => <LogoPanel key={f.slug} f={f} />)}</span>, '')}
        </li>
        <li className="bhub__agr">
          {card(agr, <span className="bcard__wall"><img className="bcard__sahara" src={`${base}benefits/sahara.svg`} alt="SAHARA Las Vegas" width="360" height="165" decoding="async" /></span>, '')}
        </li>
      </ul>
      <BenefitsSteps steps={H.hubSteps} />
      <BenefitsBand />
    </section>
  )
}
