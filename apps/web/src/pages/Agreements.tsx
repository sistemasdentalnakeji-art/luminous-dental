// Convenios (/en/agreements · /es/convenios): SAHARA Las Vegas (texto y enlace en content/home.ts → coverage.outOfTown). Más convenios: POR CONFIRMAR con la clínica.
import { BenefitsBand, BenefitsHeader } from '@/components/BenefitsHeader'
import { SaharaFeature } from '@/components/SaharaFeature'
import { benefitsHubText } from '@/content/benefitsHub'
import { benefitsText } from '@/content/financing'
import { useLang } from '@/lib/lang'

export default function Agreements() {
  const lang = useLang()
  const B = benefitsText[lang], A = benefitsHubText[lang].agreements
  return (
    <section className="sec wrap pg" aria-labelledby="agr-h">
      <BenefitsHeader id="agr-h" eyebrow={B.agreements.eyebrow} title={B.agreements.title} lead={A.lead} current="agreements" />
      <SaharaFeature />
      <BenefitsBand />
    </section>
  )
}
