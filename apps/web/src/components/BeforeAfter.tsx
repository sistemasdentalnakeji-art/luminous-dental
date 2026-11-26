import { useState } from 'react'
import { smileCases, smileText } from '@/content/smileCases'
import { useLang } from '@/lib/lang'
import '@/styles/before-after.css'

// Héroe, lado derecho (26-11-2026, r4): el antes y el después se ven a la vez, uno sobre otro y completos (sin divisor que tapa la mitad de cada foto).
// Debajo, los casos son 2 rectángulos con miniatura; al elegir uno, el par se funde con el otro. Nada se mueve solo.
// Permiso de las fotos: POR CONFIRMAR (docs/datos.md).
export default function BeforeAfter() {
  const lang = useLang()
  const T = smileText[lang]
  const cases = smileCases[lang]
  const [cur, setCur] = useState(0)

  return (
    <section className="ba" aria-label={T.region}>
      <div className="ba-pair">
        {cases.map((c, i) => (
          <div key={c.title} className="ba-case" data-on={i === cur} aria-hidden={i !== cur}>
            <figure className="ba-fig">
              <img src={c.before} alt={i === cur ? c.altBefore : ''} width="960" height="450" decoding="async" fetchPriority={i === 0 ? 'high' : undefined} />
              <figcaption>{T.before}</figcaption>
            </figure>
            <figure className="ba-fig ba-fig-after">
              <img src={c.after} alt={i === cur ? c.altAfter : ''} width="960" height="450" decoding="async" />
              <figcaption>{T.after}</figcaption>
            </figure>
          </div>
        ))}
      </div>
      <div className="ba-pick" role="group" aria-label={T.cases}>
        {cases.map((k, i) => (
          <button key={k.title} type="button" aria-pressed={i === cur} onClick={() => setCur(i)}>
            <img src={k.after} alt="" width="64" height="44" decoding="async" loading="lazy" />
            <span>{k.title.replace(/\.$/, '')}</span>
          </button>
        ))}
      </div>
      <p className="ba-cap">{T.note}</p>
    </section>
  )
}
