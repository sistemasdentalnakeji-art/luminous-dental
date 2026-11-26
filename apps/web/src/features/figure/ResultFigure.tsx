import { useEffect, useId, useRef, useState } from 'react'
import { figureText } from '@/content/figure'
import { useLang } from '@/lib/lang'
import { dynSvg, sceneState, setScope, setView } from './engine.js'
import { dwellOf, makeGlide } from './glide.js'
import { useMotionPaused } from '@/lib/motion'
import { type ServiceId, indexOf, projection, resultSvg, services } from './scene'
import './figure.css'


/**
 * Un servicio flotando sobre su molde transparente, que reproduce toda su animación en bucle (cada paso, del inicio al resultado; `DWELL`/`DWELL_LAST` en glide.js: 3.5 s por paso y 5 s en el resultado; la pieza nueva cae y se asienta),
 * sin controles de pasos y sin tarjeta. Solo corre mientras está en pantalla (y, en un carrusel, mientras su diapositiva es la visible);
 * con movimiento reducido se queda quieta en el último paso. Un botón Pausa/Reproducir detiene el bucle (WCAG 2.2.2).
 */
export default function ResultFigure({ id, name }: { id: ServiceId; name: string }) {
  const T = figureText[useLang()]
  const ref = useRef<HTMLDivElement>(null)
  const uid = 'res' + useId().replace(/:/g, '')
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  const allPaused = useMotionPaused()
  useEffect(() => { pausedRef.current = paused || allPaused }, [paused, allPaused]) // lo lee el bucle de animación; no se escribe mientras se dibuja
  const [still, setStill] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.innerHTML = resultSvg(id, uid)
    const dyn = el.querySelector('[data-dyn]')!
    const idx = indexOf(id)
    const last = services[idx].steps.length - 1
    const dwell = (i: number) => dwellOf(i, last)
    const total = services[idx].steps.reduce((a, _, i) => a + dwell(i), 0)
    const stepAt = (c: number) => {
      let x = c
      for (let i = 0; i <= last; i++) {
        if (x < dwell(i)) return i
        x -= dwell(i)
      }
      return last
    }
    const g = makeGlide(last)
    const reduce = matchMedia('(prefers-reduced-motion: reduce)')
    setStill(reduce.matches)
    const P = projection(false).P
    let clock = 0, prev = 0, frame = 0, visible = false, shown = -1
    const draw = () => {
      if (g.t === shown) return
      shown = g.t
      setView(P) // el motor tiene una sola cámara y un solo prefijo de ids; todas las figuras de la home usan esta cámara
      setScope(uid)
      dyn.innerHTML = dynSvg(sceneState(idx, g.t, g.dir))
    }
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      if (now - prev < 33) return // unos 30 fps bastan para una figura tranquila
      const dt = prev ? Math.min((now - prev) / 1000, 0.1) : 0
      prev = now
      if (pausedRef.current) return
      clock = (clock + dt) % total
      g.aim(stepAt(clock))
      g.tick(dt)
      draw()
    }
    const stop = () => {
      cancelAnimationFrame(frame)
      frame = 0
    }
    const start = () => {
      if (frame || reduce.matches) return
      prev = 0
      clock = 0
      g.snap(0)
      draw()
      frame = requestAnimationFrame(tick)
    }
    const onMotion = () => {
      setStill(reduce.matches)
      if (reduce.matches) {
        stop()
        g.snap(last)
        draw()
      } else if (visible) start()
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        el.toggleAttribute('data-live', visible)
        if (visible) start()
        else {
          stop()
          g.snap(last)
          draw() // fuera de vista descansa en el resultado
        }
      },
      { threshold: 0.5 },
    )
    io.observe(el)
    reduce.addEventListener('change', onMotion)
    return () => {
      stop()
      io.disconnect()
      reduce.removeEventListener('change', onMotion)
    }
  }, [id, uid])

  return (
    <div className="result-wrap">
      <div className="brk-card result-fig" ref={ref} />
      {!still && (
        <button type="button" className="result-pause" aria-label={(paused ? T.playNamed : T.pauseNamed).replace('{name}', name)} onClick={() => setPaused((p) => !p)}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d={paused ? 'M6 3l11 7-11 7z' : 'M5 3h3.4v14H5zM11.6 3H15v14h-3.4z'} />
          </svg>
        </button>
      )}
    </div>
  )
}
