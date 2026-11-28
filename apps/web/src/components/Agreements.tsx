import { RevealText } from '@/components/RevealText'
import { SaharaFeature } from '@/components/SaharaFeature'
import { home } from '@/content/home'
import { useLang } from '@/lib/lang'

/** Convenios del inicio (r8): solo el título afuera; la frase «además de los seguros…» va dentro del bloque de SAHARA («¿vienes de fuera de la ciudad?»), sin la etiqueta «Convenio con SAHARA» (solo queda el logo). */
export function Agreements() {
  const lang = useLang()
  const { agreements: a } = home[lang]
  return (
    <section className="wrap agrh-sec" id="agreements" aria-labelledby="agx-h">
      <header>
        <RevealText className="h2" id="agx-h" accent={a.accent}>{a.heading}</RevealText>
      </header>
      <SaharaFeature heading="h3" badge={false} lead={a.lead} />
    </section>
  )
}
