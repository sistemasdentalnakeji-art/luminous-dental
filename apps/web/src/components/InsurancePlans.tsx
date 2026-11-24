// Buscador «Find your plan» y muro de 24 logos en cuadritos blancos (docs/diseno-segunda-ronda-23nov.md, B · «La tarjeta»). Estilos en styles/insurance.css.
// variant="home": la tarjeta del seguro ES el buscador; el muro empieza colapsado (12 / 9 / 8 fichas según el ancho, lo decide el CSS) con «Show all 24 plans».
// variant="full" (/insurance-financing, paso 1): buscador simple y muro completo, sin botón.
// Al escribir se busca en las 24 aunque el muro esté colapsado. Movimiento: una sola entrada al llegar a pantalla (la tarjeta sube y las fichas se reparten);
// con reducir movimiento o la pausa todo queda visible y quieto (insurance.css).
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { clinic } from '@/content/clinic'
import { home } from '@/content/home'
import { insurers, insuranceText as T } from '@/content/insurers'

// Sin mayúsculas, sin acentos y sin espacios: «blue cross» encuentra «Premera Blue Cross».
const normalize = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/\s+/g, '')
// Fichas visibles con el muro colapsado: los mismos cortes que las columnas de insurance.css.
const collapsedCount = () => (window.innerWidth < 560 ? 8 : window.innerWidth < 960 ? 9 : 12)
const base = import.meta.env.BASE_URL

export function InsurancePlans({ variant = 'full' }: { variant?: 'home' | 'full' }) {
  const home_ = variant === 'home'
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [fresh, setFresh] = useState(-1) // desde qué ficha entran con la animación corta de «Show all»
  const [seen, setSeen] = useState(false)
  const input = useRef<HTMLInputElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const q = query.trim()
  const key = normalize(q)
  const matches = new Set(insurers.filter(([name]) => normalize(name).includes(key)).map(([name]) => name))
  const none = matches.size === 0
  const count = !q ? T.countAll(insurers.length) : none ? T.countNone(q) : T.countSome(matches.size, q)

  useEffect(() => {
    const el = root.current
    if (!home_ || !el || !('IntersectionObserver' in window)) return setSeen(true)
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [home_])

  useEffect(() => {
    if (fresh < 0) return
    const id = window.setTimeout(() => setFresh(-1), 1000)
    return () => window.clearTimeout(id)
  }, [fresh])

  const toggle = () => { if (!open) setFresh(collapsedCount()); setOpen(!open) }

  const search = (
    <div className="ins-find">
      <label htmlFor="ins-q">{T.findLabel}</label>
      <input ref={input} id="ins-q" type="search" autoComplete="off" placeholder={T.findPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} aria-describedby="ins-count" />
      <p id="ins-count" className="ins-count" role="status">{count}</p>
    </div>
  )

  const wall = (
    <>
      <ul id="ins-wall" className={`ins-wall${q && !none ? ' is-filtered' : ''}${open ? ' is-open' : ''}`} role="list" {...(home_ ? { 'aria-label': T.wallLabel } : { 'aria-labelledby': 'ins-grid-h' })} hidden={none}>
        {insurers.map(([name, file, width, height, accent], i) => (
          <li
            key={name}
            className={`ins-plan${fresh >= 0 && i >= fresh ? ' is-new' : ''}`}
            hidden={!matches.has(name)}
            style={{ '--brand': accent, '--i': i, '--j': Math.max(0, i - fresh) } as CSSProperties}
          >
            {/* --ar: proporción del logo, para que cada logo ocupe un área parecida. alt vacío: el nombre visible ya lo dice. */}
            <img src={`${base}insurers/${file}.webp`} width={width} height={height} alt="" style={{ '--ar': width / height } as CSSProperties} loading="lazy" decoding="async" />
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
    </>
  )

  if (!home_) return <>{search}<div>{wall}</div></>

  return (
    <div ref={root} className={`ins__grid ins--live${seen ? ' is-in' : ''}`}>
      <div className="ins-card">
        <img className="ins-card__mark" src={`${base}logo-star.png`} alt="" aria-hidden="true" width="113" height="150" loading="lazy" decoding="async" />
        <div className="ins-card__top">
          <img className="ins-card__logo" src={`${base}logo.webp`} alt="" width="200" height="114" decoding="async" />
          <span className="ins-card__chip" aria-hidden="true" />
        </div>
        {search}
      </div>
      <div className="ins__side">
        {wall}
        {!q && !none && (
          <div className="ins-more">
            <button type="button" aria-expanded={open} aria-controls="ins-wall" onClick={toggle}>{open ? T.collapse : T.expand(insurers.length)}</button>
            <p>{T.note}</p>
          </div>
        )}
      </div>
    </div>
  )
}
