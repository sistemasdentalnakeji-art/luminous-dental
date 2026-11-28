import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { smileCases, smileText } from '@/content/smileCases'
import { useLang } from '@/lib/lang'
import { useMotionPaused } from '@/lib/motion'
import '@/styles/before-after.css'

// Héroe, lado derecho (27-11-2026, r11b, propuesta B de la dueña): UNA sola foto a sangre por la derecha, con solo «Antes» / «Después».
// Muestra el primer caso. El divisor va solo de izquierda a derecha y de vuelta, suave y en bucle; se arrastra o se mueve con flechas
// (al hacerlo se pausa) y un botón lo pausa/reanuda. Quieto con prefers-reduced-motion y con la pausa del sitio (html[data-motion-paused]).
// Permiso de las fotos: POR CONFIRMAR (docs/datos.md).
const MID = 50, SWING = 28, PERIOD = 14000 // el divisor va de 22 % a 78 % y vuelve en 14 s
const RM = '(prefers-reduced-motion: reduce)'
const subRM = (cb: () => void) => { const m = matchMedia(RM); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb) }
const clamp = (v: number) => Math.max(0, Math.min(100, v))

export default function BeforeAfter() {
  const lang = useLang()
  const T = smileText[lang]
  const c = smileCases[lang][0]
  const root = useRef<HTMLElement>(null)
  const handle = useRef<HTMLDivElement>(null)
  const pos = useRef(MID)
  const [playing, setPlaying] = useState(true)
  const reduced = useSyncExternalStore(subRM, () => matchMedia(RM).matches, () => false)
  const sitePaused = useMotionPaused()

  const set = (v: number, aria: boolean) => {
    pos.current = clamp(v)
    root.current?.style.setProperty('--pos', `${pos.current}%`)
    if (!aria) return
    const b = Math.round(pos.current)
    handle.current?.setAttribute('aria-valuenow', String(b))
    handle.current?.setAttribute('aria-valuetext', T.split(b, 100 - b))
  }
  const touch = () => { setPlaying(false) }

  useEffect(() => {
    if (!playing || reduced) return
    let raf = 0, last = performance.now()
    // continúa desde donde esté el divisor, rumbo a la derecha
    let phase = Math.acos(Math.max(-1, Math.min(1, (MID - pos.current) / SWING)))
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100); last = now
      if (!document.documentElement.hasAttribute('data-motion-paused')) { // en pausa del sitio el divisor se queda donde está
        phase += (dt * 2 * Math.PI) / PERIOD
        set(MID - SWING * Math.cos(phase), false)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); set(pos.current, true) } // al parar, sincroniza lo que lee el lector de pantalla
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, reduced])

  const fromX = (x: number, el: HTMLElement) => { const r = el.getBoundingClientRect(); set(((x - r.left) / r.width) * 100, true) }
  const onKey = (e: React.KeyboardEvent) => {
    const k: Record<string, number> = { ArrowLeft: -4, ArrowDown: -4, ArrowRight: 4, ArrowUp: 4, PageDown: -12, PageUp: 12 }
    if (e.key in k) set(pos.current + k[e.key], true)
    else if (e.key === 'Home') set(0, true)
    else if (e.key === 'End') set(100, true)
    else return
    e.preventDefault(); touch()
  }
  const running = playing && !reduced && !sitePaused

  return (
    <section className="ba" ref={root} aria-label={T.region}>
      <div
        className="ba-stage"
        onPointerDown={(e) => { touch(); e.currentTarget.setPointerCapture(e.pointerId); fromX(e.clientX, e.currentTarget); handle.current?.focus({ preventScroll: true }) }}
        onPointerMove={(e) => { if (e.currentTarget.hasPointerCapture(e.pointerId)) fromX(e.clientX, e.currentTarget) }}
      >
        <div className="ba-media">
          <img src={c.before} alt={c.altBefore} width="960" height="450" decoding="async" fetchPriority="high" draggable={false} />
          <img className="ba-after" src={c.after} alt={c.altAfter} width="960" height="450" decoding="async" draggable={false} />
        </div>
        <div className="ba-line" aria-hidden="true" />
        <div ref={handle} className="ba-handle" role="slider" tabIndex={0} aria-label={T.compare} aria-orientation="horizontal"
          aria-valuemin={0} aria-valuemax={100} aria-valuenow={MID} aria-valuetext={T.split(MID, 100 - MID)} onKeyDown={onKey}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m9 7-5 5 5 5M15 7l5 5-5 5" /></svg>
        </div>
        <span className="ba-tag ba-tag-b" aria-hidden="true">{T.before}</span>
        <span className="ba-tag ba-tag-a" aria-hidden="true">{T.after}</span>
      </div>
      {!reduced && (
        <button type="button" className="ba-pause" disabled={sitePaused} onClick={() => setPlaying((p) => !p)}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{running ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5.5v13l11-6.5z" />}</svg>
          {running ? T.pause : T.play}
        </button>
      )}
    </section>
  )
}
