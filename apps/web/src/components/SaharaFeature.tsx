// Bloque de SAHARA Las Vegas compartido por Convenios (pages/Agreements.tsx) y el inicio (components/Agreements.tsx). Estilos: .agr-feature en styles/benefits-r2.css.
import { benefitsHubText } from '@/content/benefitsHub'
import { benefitsText } from '@/content/financing'
import { home } from '@/content/home'
import { useLang } from '@/lib/lang'

export function SaharaFeature({ heading: Heading = 'h2' }: { heading?: 'h2' | 'h3' }) {
  const lang = useLang()
  const B = benefitsText[lang], A = benefitsHubText[lang].agreements
  const { outOfTown } = home[lang].coverage
  return (
    <div className="agr-feature">
      <div className="agr-feature__name">
        <p className="agr-card__badge">{B.agreements.badge}</p>
        <img className="agr-feature__logo" src={`${import.meta.env.BASE_URL}benefits/sahara.svg`} alt={A.name} width="360" height="165" decoding="async" />
      </div>
      <div className="agr-feature__body">
        <Heading className="agr-card__title">{outOfTown.heading}</Heading>
        <p>{outOfTown.text}</p>
        <div><a className="btn" href={outOfTown.cta.href} target="_blank" rel="noopener noreferrer">{outOfTown.cta.label}</a></div>
      </div>
    </div>
  )
}
