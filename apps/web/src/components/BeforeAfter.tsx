import { useState } from 'react'
import { smileCases, smileText as T } from '@/content/smileCases'
import '@/styles/before-after.css'

// Héroe, lado derecho: comparador antes/después QUIETO. Una foto grande; el divisor lo mueve el visitante
// (arrastrando el control o con el teclado). Nada se mueve ni avanza solo. Permiso de las fotos: POR CONFIRMAR (docs/datos.md).
export default function BeforeAfter() {
  const [cur, setCur] = useState(0)
  const [pos, setPos] = useState(50) // % de «antes» a la izquierda; 100 = solo el antes, 0 = solo el después
  const c = smileCases[cur]
  const valueText = pos >= 98 ? 'Showing before' : pos <= 2 ? 'Showing after' : `Before ${pos}% on the left, after ${100 - pos}% on the right`

  return (
    <section className="ba" aria-label={T.region}>
      <div className="ba-stage" style={{ '--pos': `${pos}%` } as React.CSSProperties}>
        <img key={c.before} src={c.before} alt={c.altBefore} width="960" height="450" decoding="async" />
        <img className="ba-after" key={c.after} src={c.after} alt={c.altAfter} width="960" height="450" decoding="async" />
        <span className="ba-bar" aria-hidden="true"><span className="ba-knob"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg></span></span>
        <span className="ba-tag ba-tag-b" aria-hidden="true">{T.before}</span>
        <span className="ba-tag ba-tag-a" aria-hidden="true">{T.after}</span>
        <input className="ba-range" type="range" min={0} max={100} step={1} value={pos} aria-label={T.compare} aria-describedby="ba-hint" aria-valuetext={valueText} onChange={(e) => setPos(+e.target.value)} />
      </div>
      <p className="ba-vh" id="ba-hint">{T.hint}</p>
      <div className="ba-controls">
        <div className="ba-seg" role="group" aria-label="Show">
          <button type="button" aria-pressed={pos >= 98} onClick={() => setPos(100)}>{T.before}</button>
          <button type="button" aria-pressed={pos <= 2} onClick={() => setPos(0)}>{T.after}</button>
        </div>
        <div className="ba-cases" role="group" aria-label={T.cases}>
          {smileCases.map((k, i) => (
            <button key={k.title} type="button" aria-pressed={i === cur} onClick={() => setCur(i)}>{k.title.replace(/\.$/, '')}</button>
          ))}
        </div>
      </div>
      <p className="ba-cap"><strong>{c.title}</strong> {T.note}</p>
    </section>
  )
}
