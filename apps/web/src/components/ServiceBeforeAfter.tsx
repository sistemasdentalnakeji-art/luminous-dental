import { useState, type CSSProperties } from 'react'
import { beforeAfterText, type BeforeAfterCase, type Crop } from '@/content/beforeAfter'
import { useLang } from '@/lib/lang'
import '@/styles/service-before-after.css'

// La foto se escala para que el recorte llene la caja y se desplaza hasta él.
const cropStyle = (c: Crop): CSSProperties => ({
  width: `${(c.width / c.w) * 100}%`,
  height: `${(c.height / c.h) * 100}%`,
  left: `${(-c.x / c.w) * 100}%`,
  top: `${(-c.y / c.h) * 100}%`,
})

// Comparador quieto: la persona mueve la línea (arrastre o flechas, es un <input type="range">). Nada se mueve solo.
function Compare({ item }: { item: BeforeAfterCase }) {
  const lang = useLang()
  const T = beforeAfterText[lang]
  const [pos, setPos] = useState(50)
  const { before, after } = item
  return (
    <figure className="sba" style={{ '--pos': `${pos}%`, aspectRatio: `${before.w} / ${before.h}` } as CSSProperties}>
      <img src={before.src} alt={item.alt[lang]} style={cropStyle(before)} loading="lazy" decoding="async" />
      <div className="sba__after" aria-hidden="true"><img src={after.src} alt="" style={cropStyle(after)} loading="lazy" decoding="async" /></div>
      <span className="sba__tag sba__tag--before">{T.before}</span>
      <span className="sba__tag sba__tag--after">{T.after}</span>
      <span className="sba__handle" aria-hidden="true" />
      <input type="range" min={0} max={100} value={pos} aria-label={T.slider} onChange={(e) => setPos(Number(e.target.value))} />
    </figure>
  )
}

export function ServiceBeforeAfter({ cases, id }: { cases: BeforeAfterCase[]; id: string }) {
  const T = beforeAfterText[useLang()]
  return (
    <section className="sec wrap sba-sec" aria-labelledby={`${id}-h`}>
      <p className="pill">{T.eyebrow}</p>
      <h2 className="h2" id={`${id}-h`}>{T.title}</h2>
      <div className={`sba-grid${cases.length > 1 ? ' sba-grid--two' : ''}`}>
        {cases.map((c) => <Compare key={c.before.src + c.before.y} item={c} />)}
      </div>
      <p className="sba-note">{T.note}</p>
    </section>
  )
}
