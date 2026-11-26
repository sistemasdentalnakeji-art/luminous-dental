import { RevealText } from '@/components/RevealText'
import { SaharaFeature } from '@/components/SaharaFeature'
import { home } from '@/content/home'
import { useLang } from '@/lib/lang'

/** Convenios del inicio: título y frase, y debajo el mismo bloque de SAHARA que la página de Convenios (components/SaharaFeature.tsx). */
export function Agreements() {
  const lang = useLang()
  const { agreements: a } = home[lang]
  return (
    <section className="wrap agrh-sec" id="agreements" aria-labelledby="agx-h">
      <header>
        <RevealText className="h2" id="agx-h" accent={a.accent}>{a.heading}</RevealText>
        <p className="hub-lead">{a.lead}</p>
      </header>
      <SaharaFeature heading="h3" />
    </section>
  )
}
