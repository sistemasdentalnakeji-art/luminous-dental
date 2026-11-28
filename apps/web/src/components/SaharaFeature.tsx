// Bloque de SAHARA Las Vegas compartido por Convenios (pages/Agreements.tsx) y el inicio (components/Agreements.tsx). Estilos: .agr-feature en styles/benefits-r2.css.
import { benefitsHubText } from '@/content/benefitsHub'
import { benefitsText } from '@/content/financing'
import { home } from '@/content/home'
import { useLang } from '@/lib/lang'
import { NewTab } from '@/lib/router'

/** centered: Convenios (r9) lo apila y centra. badge: la etiqueta sobre el logo (la página de Convenios la lleva; el inicio no). lead: frase que el inicio une al bloque, bajo el título. */
export function SaharaFeature({ heading: Heading = 'h2', badge = true, lead, centered }: { heading?: 'h2' | 'h3'; badge?: boolean; lead?: string; centered?: boolean }) {
  const lang = useLang()
  const B = benefitsText[lang], A = benefitsHubText[lang].agreements
  const { outOfTown } = home[lang].coverage
  return (
    <div className={centered ? 'agr-feature agr-feature--center' : 'agr-feature'}>
      <div className="agr-feature__name">
        {badge && <p className="agr-card__badge">{B.agreements.badge}</p>}
        <img className="agr-feature__logo" src={`${import.meta.env.BASE_URL}benefits/sahara.svg`} alt={A.name} width="360" height="165" decoding="async" />
      </div>
      <div className="agr-feature__body">
        <Heading className="agr-card__title">{outOfTown.heading}</Heading>
        {lead && <p>{lead}</p>}
        <p>{outOfTown.text}</p>
        <div><a className="btn" href={outOfTown.cta.href} target="_blank" rel="noopener noreferrer">{outOfTown.cta.label}<NewTab /></a></div>
      </div>
    </div>
  )
}
