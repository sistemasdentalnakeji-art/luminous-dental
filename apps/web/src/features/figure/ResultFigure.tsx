import { useEffect, useRef, useState } from 'react'
import { figureText as T } from '@/content/figure'
import { dynSvg, sceneState, setView } from './engine.js'
import { useMotionPaused } from '@/lib/motion'
import { type ServiceId, indexOf, projection, resultSvg, services } from './scene'
import './figure.css'

const DWELL = 1.8 // seconds on each step
const DWELL_LAST = 3.2 // seconds on the finished result

/**
 * One service floating on its transparent mold, playing its whole animation in a loop (every step, from the start to the result),
 * with no step controls and no card. It only runs while it is on screen (and, in a carousel, while its slide is the one in view);
 * with reduced motion it stays still on the final step. A Pause/Play button stops the loop (WCAG 2.2.2).
 */
export default function ResultFigure({ id, name }: { id: ServiceId; name: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  const allPaused = useMotionPaused()
  useEffect(() => { pausedRef.current = paused || allPaused }, [paused, allPaused]) // read by the animation loop; not written while drawing
  const [still, setStill] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.innerHTML = resultSvg(id)
    const dyn = el.querySelector('[data-dyn]')!
    const idx = indexOf(id)
    const last = services[idx].steps.length - 1
    const dwell = (i: number) => (i === last ? DWELL_LAST : DWELL)
    const total = services[idx].steps.reduce((a, _, i) => a + dwell(i), 0)
    const stepAt = (c: number) => {
      let x = c
      for (let i = 0; i <= last; i++) {
        if (x < dwell(i)) return i
        x -= dwell(i)
      }
      return last
    }
    const reduce = matchMedia('(prefers-reduced-motion: reduce)')
    setStill(reduce.matches)
    const P = projection(false).P
    let t = last, clock = 0, prev = 0, frame = 0, visible = false
    const draw = () => {
      setView(P) // the engine keeps one camera; every figure of the home uses this one
      dyn.innerHTML = dynSvg(sceneState(idx, t))
    }
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick)
      if (now - prev < 33) return // about 30 fps is plenty for a calm figure
      const dt = prev ? Math.min((now - prev) / 1000, 0.1) : 0
      prev = now
      if (pausedRef.current) return
      clock = (clock + dt) % total
      t += (stepAt(clock) - t) * (1 - Math.exp(-dt / 0.3))
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
      t = 0
      draw()
      frame = requestAnimationFrame(tick)
    }
    const onMotion = () => {
      setStill(reduce.matches)
      if (reduce.matches) {
        stop()
        t = last
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
          t = last
          draw() // out of sight it rests on the result
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
  }, [id])

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
