// Seguros (/en/insurance · /es/seguros): héroe de un solo contenido + sección común de Beneficios (BenefitsSection): título, frase y buscador a la izquierda, muro de 24 logos a la derecha (components/InsurancePlans.tsx, variante full). Sin cierre.
// Estilos: styles/benefits-r2.css (bloque r11) e insurance.css. El hub es Benefits.tsx.
import { BenefitsHeader, BenefitsSection } from '@/components/BenefitsHeader'
import { InsurancePlans } from '@/components/InsurancePlans'
import { benefitsText } from '@/content/financing'
import { insuranceText } from '@/content/insurers'
import { useLang } from '@/lib/lang'

export default function Insurance() {
  const lang = useLang()
  const T = insuranceText[lang]
  return (
    <section className="sec wrap pg lines" aria-labelledby="ins-h">
      <BenefitsHeader id="ins-h" eyebrow={benefitsText[lang].eyebrow} title={T.eyebrow} lead={T.lead} current="insurance" solo />
      <BenefitsSection id="ins-grid-h" title={T.findLabel} lead={T.help}>
        <InsurancePlans variant="full" />
        <p className="ins-small bsec__note">{T.note}</p>
      </BenefitsSection>
    </section>
  )
}
