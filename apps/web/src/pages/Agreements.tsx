// Convenios (/en/agreements · /es/convenios): héroe de un solo contenido + sección común de Beneficios (BenefitsSection): título, texto y botón de SAHARA a la izquierda, su logo en el muro a la derecha. Sin cierre.
// Datos de SAHARA en content/home.ts → coverage.outOfTown. Más convenios: POR CONFIRMAR con la clínica.
import { BenefitsHeader, BenefitsSection } from '@/components/BenefitsHeader'
import { benefitsHubText } from '@/content/benefitsHub'
import { benefitsText } from '@/content/financing'
import { home } from '@/content/home'
import { useLang } from '@/lib/lang'
import { NewTab } from '@/lib/router'

export default function Agreements() {
  const lang = useLang()
  const B = benefitsText[lang], A = benefitsHubText[lang].agreements
  const { outOfTown } = home[lang].coverage
  return (
    <section className="sec wrap pg lines" aria-labelledby="agr-h">
      <BenefitsHeader id="agr-h" eyebrow={B.eyebrow} title={B.agreements.title} lead={A.lead} current="agreements" solo />
      <BenefitsSection
        id="agr-sec-h"
        title={outOfTown.heading}
        lead={outOfTown.text}
        aside={<a className="btn bsec__btn" href={outOfTown.cta.href} target="_blank" rel="noopener noreferrer">{outOfTown.cta.label}<NewTab /></a>}
      >
        <div className="bsec__wall bsec__wall--one">
          <img className="bcard__sahara" src={`${import.meta.env.BASE_URL}benefits/sahara.svg`} alt={A.name} width="360" height="165" decoding="async" />
        </div>
      </BenefitsSection>
    </section>
  )
}
