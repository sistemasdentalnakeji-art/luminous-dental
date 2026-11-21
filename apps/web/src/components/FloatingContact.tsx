// Botones flotantes abajo a la derecha, adaptados de Dental Nakeji (FloatingContact.tsx):
//   tres MONEDAS 3D de la misma familia que la ficha del mapa (canto, dos caras, brillo, giro lento):
//   pausa de animaciones · moneda con la estrella del logo y aro de progreso de lectura (al tocarla, sube al inicio) · WhatsApp (aún sin número).
// El globito de aviso solo sale cuando la clínica tenga número de WhatsApp. Estilos en styles/floating-contact.css.

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { BrandIcon } from '@/components/BrandIcon'
import { Icon } from '@/components/Icon'
import { clinic } from '@/content/clinic'
import { home } from '@/content/home'
import { setMotionPaused, useMotionPaused } from '@/lib/motion'

const R = 27 // radio del aro (viewBox 60×60)
const C = 2 * Math.PI * R
const EDGE = [-2, -1, 0, 1, 2] // z de los discos que forman el canto (px)

/** Moneda: pila de discos para el canto y dos caras iguales (gira sola con CSS; ver floating-contact.css). */
function Coin({ tone, children }: { tone: 'navy' | 'green'; children: ReactNode }) {
  return (
    <span className="fcoin" data-tone={tone} aria-hidden="true">
      <span className="fcoin__disc">
        {EDGE.map((z) => <span key={z} className="fcoin__edge" style={{ transform: `translateZ(${z}px)` }} />)}
        <span className="fcoin__face fcoin__face--front">{children}</span>
        <span className="fcoin__face fcoin__face--back">{children}</span>
      </span>
    </span>
  )
}

/** La estrella de 4 puntas del logo (vector, de public/logo.png), recortada y centrada. */
const Star = () => (
  <svg viewBox="488 10 154 175" width="24" height="27" focusable="false">
    <path d="M565 20L576 85L632 98L576 110L565 175L554 110L498 98L554 85Z" fill="#7bc3eb" />
  </svg>
)

export function FloatingContact() {
  const ring = useRef<SVGCircleElement>(null)
  const root = useRef<HTMLDivElement>(null)
  const paused = useMotionPaused()
  const [bubble, setBubble] = useState(false)

  // El aro se llena con el scroll.
  useEffect(() => {
    let raf = 0
    const draw = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - innerHeight
      ring.current?.style.setProperty('stroke-dashoffset', String(C * (1 - (max > 0 ? Math.min(1, scrollY / max) : 0))))
    }
    const onScroll = () => (raf ||= requestAnimationFrame(draw))
    draw()
    addEventListener('scroll', onScroll, { passive: true })
    addEventListener('resize', onScroll, { passive: true })
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [])

  // Se esconde mientras tape el botón de pausa de las reseñas o la ficha del mapa (si no, no se pueden tocar).
  useEffect(() => {
    let raf = 0
    const check = () => {
      raf = 0
      const me = root.current
      if (!me) return
      const a = me.getBoundingClientRect()
      const hit = [...document.querySelectorAll('.pause-btn, .loc__coin')].some((el) => {
        const b = el.getBoundingClientRect()
        return b.left < a.right + 8 && b.right > a.left - 8 && b.top < a.bottom + 8 && b.bottom > a.top - 8
      })
      me.toggleAttribute('data-overlap', hit)
    }
    const onMove = () => (raf ||= requestAnimationFrame(check))
    check()
    addEventListener('scroll', onMove, { passive: true })
    addEventListener('resize', onMove, { passive: true })
    return () => { removeEventListener('scroll', onMove); removeEventListener('resize', onMove); cancelAnimationFrame(raf) }
  }, [])

  // Globito: a los 2.5 s de llegar, se va solo a los 11.5 s; una vez por visita. Solo si ya hay número.
  useEffect(() => {
    if (!clinic.whatsapp) return
    let seen = false
    try { seen = sessionStorage.getItem('ld-wa-bubble') === '1' } catch { /* almacenamiento bloqueado: se muestra igual */ }
    if (seen) return
    const show = setTimeout(() => {
      setBubble(true)
      try { sessionStorage.setItem('ld-wa-bubble', '1') } catch { /* sin almacenamiento */ }
    }, 2500)
    const hide = setTimeout(() => setBubble(false), 11500)
    return () => { clearTimeout(show); clearTimeout(hide) }
  }, [])

  const waNumber = clinic.whatsapp?.replace(/\D/g, '')
  const label = paused ? home.footer.motion.play : home.footer.motion.pause // igual que el botón del pie
  return (
    <div className="float-contact" ref={root}>
      <button type="button" className="float-contact__pause" data-paused={paused || undefined} aria-label={label} title={label} onClick={() => setMotionPaused(!paused)}>
        <Coin tone="navy">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" focusable="false">
            {paused ? <path d="M8 5.5v13l11-6.5z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
          </svg>
        </Coin>
      </button>

      <button
        type="button"
        className="float-contact__top"
        aria-label="Back to top"
        // Con la pausa activa el CSS global `scroll-behavior: smooth` sigue mandando (aceptado); con reduce-motion el salto es instantáneo.
        onClick={() => scrollTo({ top: 0, behavior: paused || matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
      >
        <svg className="float-contact__ring" viewBox="0 0 60 60" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="float-progress" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" style={{ stopColor: 'var(--color-sky)' }} />
              <stop offset="1" style={{ stopColor: 'var(--color-gold)' }} />
            </linearGradient>
          </defs>
          <circle className="float-contact__track" cx="30" cy="30" r={R} />
          <circle ref={ring} className="float-contact__fill" cx="30" cy="30" r={R} strokeDasharray={C} strokeDashoffset={C} />
        </svg>
        <Coin tone="navy"><Star /></Coin>
      </button>

      <div className="float-contact__wa-wrap">
        {bubble && (
          <div className="float-contact__bubble" role="status">
            <button type="button" className="float-contact__close" aria-label="Close notice" onClick={() => setBubble(false)}>
              <Icon name="close" size={14} />
            </button>
            <strong>Looking for a treatment?</strong>
            <span>Message us on WhatsApp!</span>
          </div>
        )}
        {waNumber ? (
          <a className="float-contact__wa" href={`https://wa.me/${waNumber}`} target="_blank" rel="noopener noreferrer" aria-label={`${clinic.name} on WhatsApp`}>
            <Coin tone="green"><BrandIcon name="whatsapp" size={36} /></Coin>
          </a>
        ) : (
          // Sin número: no interactiva (sin enlace muerto).
          <span className="float-contact__wa wa-soon" role="img" aria-label="WhatsApp (coming soon)">
            <Coin tone="green"><BrandIcon name="whatsapp" size={36} /></Coin>
          </span>
        )}
      </div>
    </div>
  )
}
