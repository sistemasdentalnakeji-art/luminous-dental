// Paso 1 de «El camino» (docs/diseno-aseguranzas-fuentes.md): buscador «Find your plan» y muro de 24 logos en cuadritos blancos.
// Sin JS se ven los 24 logos. Estilos en styles/insurance.css.
// Ciclo de «encendido» (como el muro de convenios de Dental Nakeji): mientras el muro se ve, cada ficha visible se enciende sola
// una por una (STEP_MS); el mouse enciende además la ficha bajo el cursor sin frenar el ciclo. Se reinicia al cambiar el filtro.
// data-lit es solo visual (el nombre ya está en el texto; no se anuncia nada). Con reduce motion o «Pausar animaciones» no hay ciclo.
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useMotionPaused } from '@/lib/motion'
import { clinic } from '@/content/clinic'
import { home } from '@/content/home'
import { insurers, insuranceText as T } from '@/content/insurers'

// Sin mayúsculas, sin acentos y sin espacios: «blue cross» encuentra «Premera Blue Cross».
const STEP_MS = 2000

const normalize = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/\s+/g, '')

export function InsurancePlans() {
  const [query, setQuery] = useState('')
  const input = useRef<HTMLInputElement>(null)
  const q = query.trim()
  const key = normalize(q)
  const matches = new Set(insurers.filter(([name]) => normalize(name).includes(key)).map(([name]) => name))
  const none = matches.size === 0
  const shown = insurers.filter(([name]) => matches.has(name)).map(([name]) => name)
  const paused = useMotionPaused()
  const wall = useRef<HTMLUListElement>(null)
  const [inView, setInView] = useState(false)
  // El índice va ligado al filtro: si cambia la búsqueda, el ciclo vuelve a la primera ficha sin efecto extra.
  const [step, setStep] = useState({ key, i: 0 })
  const [hovered, setHovered] = useState<string | null>(null)
  const index = step.key === key ? step.i : 0

  useEffect(() => {
    const el = wall.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setStep({ key, i: 0 })
      setInView(e.isIntersecting)
    }, { threshold: 0.2 })
    io.observe(el)
    return () => io.disconnect()
  }, [key])

  useEffect(() => {
    if (!inView || paused || shown.length < 2) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const id = window.setInterval(() => {
      if (!reduce.matches) setStep((s) => ({ key, i: ((s.key === key ? s.i : 0) + 1) % shown.length }))
    }, STEP_MS)
    return () => window.clearInterval(id)
  }, [inView, paused, key, shown.length])

  const cycling = inView && !paused ? shown[index] : undefined
  const count = !q ? T.countAll(insurers.length) : none ? T.countNone(q) : T.countSome(matches.size, q)

  return (
    <>
      <div className="ins-find">
        <label htmlFor="ins-q">{T.findLabel}</label>
        <input ref={input} id="ins-q" type="search" autoComplete="off" placeholder={T.findPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} aria-describedby="ins-count" />
        <p id="ins-count" className="ins-count" role="status">{count}</p>
      </div>
      <div>
        <ul ref={wall} className={`ins-wall${q && !none ? ' is-filtered' : ''}`} role="list" aria-labelledby="ins-grid-h" hidden={none}>
          {insurers.map(([name, file, width, height, accent]) => (
            <li
              key={name}
              className="ins-plan"
              hidden={!matches.has(name)}
              data-lit={!paused && (cycling === name || hovered === name)}
              style={{ '--brand': accent } as CSSProperties}
              onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(name)}
              onPointerLeave={(e) => e.pointerType === 'mouse' && setHovered(null)}
            >
              <span className="ins-plan__clip" aria-hidden="true"><span className="ins-plan__glow" /></span>
              <span className="ins-plan__ring" aria-hidden="true" />
              {/* --ar: proporción del logo, para que cada logo ocupe un área parecida. alt vacío: el nombre visible ya lo dice. */}
              <img src={`${import.meta.env.BASE_URL}insurers/${file}.webp`} width={width} height={height} alt="" style={{ '--ar': width / height } as CSSProperties} loading="lazy" decoding="async" />
              <span className="ins-plan__name">{name}</span>
            </li>
          ))}
        </ul>
        {none && (
          <div className="ins-empty">
            <p className="ins-empty__title">{T.emptyTitle(q)}</p>
            <p>{T.emptyText}</p>
            <div className="ins-empty__actions">
              <a className="btn" href={clinic.phone.href}>{home.footer.phone.label}</a>
              <button type="button" className="tlink" onClick={() => { setQuery(''); input.current?.focus() }}>{T.showAll}</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
