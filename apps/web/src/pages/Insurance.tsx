// Seguros (/en/insurance · /es/seguros): buscador + muro de logos en un panel ancho (components/InsurancePlans.tsx, variante full) y tres pasos «cómo funciona» con los textos de «El camino».
// Financiamiento y Convenios tienen su propia página; el hub es Benefits.tsx. Estilos: styles/insurance.css y styles/benefits.css.
import { BenefitsBand, BenefitsHeader, BenefitsSteps } from '@/components/BenefitsHeader'
import { InsurancePlans } from '@/components/InsurancePlans'
import { benefitsText } from '@/content/financing'
import { insuranceText } from '@/content/insurers'
import { useLang } from '@/lib/lang'

export default function Insurance() {
  const lang = useLang()
  const T = insuranceText[lang]
  const steps = [
    { title: T.steps[0], text: T.help },
    { title: T.steps[1], text: T.step2 },
    { title: T.steps[2], text: T.step3 },
  ]
  return (
    <section className="sec wrap pg" aria-labelledby="ins-h">
      <BenefitsHeader id="ins-h" eyebrow={benefitsText[lang].eyebrow} title={T.eyebrow} lead={T.lead} current="insurance" />
      <div className="ins-panel">
        <h2 className="ins-panel__title" id="ins-grid-h">{T.findLabel}</h2>
        <InsurancePlans variant="full" />
        <p className="ins-small">{T.note}</p>
      </div>
      <BenefitsSteps steps={steps} />
      <BenefitsBand />
    </section>
  )
}
