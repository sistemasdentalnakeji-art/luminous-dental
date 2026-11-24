// Buscador «Find your plan» y muro de 24 logos en cuadritos blancos (docs/diseno-segunda-ronda-23nov.md, B · «La tarjeta»). Estilos en styles/insurance.css.
// variant="home": tarjeta de adorno (sin buscador) y el muro de logos colapsado (12 / 9 / 8 fichas según el ancho, lo decide el CSS); el texto y el botón «See all insurance plans» van bajo la tarjeta y llevan a /insurance-financing.
// variant="full" (/insurance-financing, paso 1): buscador simple y muro completo, sin botón.
// Movimiento: una sola entrada al llegar a pantalla (la tarjeta sube y las fichas se reparten);
// con reducir movimiento o la pausa todo queda visible y quieto (insurance.css).
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { clinic } from '@/content/clinic'
import { home } from '@/content/home'
import { insurers, insuranceText as T } from '@/content/insurers'
import { Link } from '@/lib/router'

// Sin mayúsculas, sin acentos y sin espacios: «blue cross» encuentra «Premera Blue Cross».
const normalize = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase().replace(/\s+/g, '')
const base = import.meta.env.BASE_URL

export function InsurancePlans({ variant = 'full' }: { variant?: 'home' | 'full' }) {
  const home_ = variant === 'home'
  const [query, setQuery] = useState('')
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

  const search = (
    <div className="ins-find">
      <label htmlFor="ins-q">{T.findLabel}</label>
      <input ref={input} id="ins-q" type="search" autoComplete="off" placeholder={T.findPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} aria-describedby="ins-count" />
      <p id="ins-count" className="ins-count" role="status">{count}</p>
    </div>
  )

  const wall = (
    <>
      <ul id="ins-wall" className={`ins-wall${q && !none ? ' is-filtered' : ''}`} role="list" {...(home_ ? { 'aria-label': T.wallLabel } : { 'aria-labelledby': 'ins-grid-h' })} hidden={none}>
        {insurers.map(([name, file, width, height, accent], i) => (
          <li
            key={name}
            className="ins-plan"
            hidden={!matches.has(name)}
            style={{ '--brand': accent, '--i': i } as CSSProperties}
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
      <div className="ins__left">
      <div className="ins-card">
        <div className="ins-card__top">
          <img className="ins-card__logo" src={`${base}logo.webp`} alt="" width="200" height="114" decoding="async" />
          <span className="ins-card__chip" aria-hidden="true" />
        </div>
        <span className="ins-card__dots" aria-hidden="true">4021 7302 5600 2026</span>
      </div>
      <div className="ins-more">
        <p>{T.help}</p>
        <Link href="/insurance-financing">{T.seeAll}</Link>
      </div>
      </div>
      <div className="ins__side">
        {wall}
      </div>
    </div>
  )
}
