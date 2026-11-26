import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { RevealText } from '@/components/RevealText'
import { home } from '@/content/home'
import { useLang } from '@/lib/lang'
import { useMotionPaused } from '@/lib/motion'
import '@/styles/family-care.css'

const sides = ['l', 'r'] as const // zigzag: las paradas pares a la izquierda del hilo y las impares a la derecha

// «La estrella en el camino» (docs/diseno-segunda-ronda-23nov.md, A). 26-11 (B1): ya no lista servicios; son los 4 pasos de la visita (home.visit en content/home.ts). Una estrella de la marca baja por un hilo al hacer scroll y enciende cada grupo.
// El hilo se mide desde los centros de los nodos (sirve con cualquier alto de texto). Solo transform y opacity se animan; el avance va por variables CSS (--fp, --y0, --len).
// Con «reducir movimiento» o la pausa: todo encendido y quieto, con la estrella al final del hilo.
export function FamilyCare() {
  const lang = useLang()
  const { visit } = home[lang]
  const path = useRef<HTMLDivElement>(null)
  const paused = useMotionPaused()
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const still = paused || reduced
  const [lit, setLit] = useState(0) // cuántos grupos están encendidos (de arriba hacia abajo)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useEffect(() => {
    const el = path.current
    if (!el) return
    const nodes = [...el.querySelectorAll<HTMLElement>('.fam__node')]
    let ys: number[] = [] // centro de cada nodo en px desde el borde de arriba del hilo; se mide solo al cambiar el tamaño o llegar las fuentes
    let raf = 0
    let alive = true
    const update = () => {
      raf = 0
      if (!ys.length) return
      const y0 = ys[0]
      const len = ys[ys.length - 1] - y0
      // El avance cuenta desde que el primer nodo cruza el 60 % de la pantalla hasta que el último lo cruza (con un solo grupo: ya encendido).
      const p = still || len <= 0 ? 1 : Math.min(1, Math.max(0, (window.innerHeight * 0.6 - (el.getBoundingClientRect().top + y0)) / len))
      el.style.setProperty('--fp', String(p)) // en scroll solo se escribe esto
      const n = ys.filter((y) => still || p * len >= y - y0 - 1).length
      setLit((cur) => (cur === n ? cur : n))
    }
    const schedule = () => { if (!raf) raf = requestAnimationFrame(update) }
    const measure = () => {
      const top = el.getBoundingClientRect().top
      ys = nodes.map((n) => { const r = n.getBoundingClientRect(); return r.top + r.height / 2 - top })
      el.style.setProperty('--y0', `${ys[0] ?? 0}px`)
      el.style.setProperty('--len', `${(ys[ys.length - 1] ?? 0) - (ys[0] ?? 0)}px`)
      schedule()
    }
    // El avance por scroll solo corre con la sección en pantalla; al entrar y al salir se pone al día una vez.
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) window.addEventListener('scroll', schedule, { passive: true })
      else window.removeEventListener('scroll', schedule)
      schedule()
    })
    io.observe(el)
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    void document.fonts?.ready.then(() => { if (alive) measure() })
    return () => { alive = false; window.removeEventListener('scroll', schedule); io.disconnect(); ro.disconnect(); if (raf) cancelAnimationFrame(raf) }
  }, [still])

  return (
    <section className="fam" id="visit" aria-labelledby="svc-h">
      <div className="wrap">
        <RevealText className="fam__title" id="svc-h" accent={visit.accent}>{visit.heading}</RevealText>
        <div className={`fam__path${still ? '' : ' fam__path--live'}`} ref={path}>
          <span className="fam__rail" aria-hidden="true" />
          <span className="fam__fill" aria-hidden="true" />
          <span className="fam__star" aria-hidden="true">
            <svg viewBox="-10 -10 120 120" focusable="false">
              <defs>
                <linearGradient id="fam-star" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#fff" /><stop offset=".45" stopColor="#8fe3e8" /><stop offset="1" stopColor="#34bfcc" /></linearGradient>
              </defs>
              <path d="M50 0C54 30 70 46 100 50C70 54 54 70 50 100C46 70 30 54 0 50C30 46 46 30 50 0Z" fill="url(#fam-star)" />
            </svg>
          </span>
          <ol className="fam__stops">
            {visit.steps.map((g, i) => (
              <li key={g.title} className={`fam__stop${i < lit ? ' is-lit' : ''}`} data-side={sides[i % 2]} style={{ '--r': i + 1 } as CSSProperties}>
                <span className="fam__node" aria-hidden="true" />
                <div className="fam__link">
                  <h3>{g.title}</h3>
                  <p>{g.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
