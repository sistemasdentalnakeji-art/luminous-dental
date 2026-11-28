// Botones flotantes abajo a la derecha, adaptados de Dental Nakeji (FloatingContact.tsx):
//   dos FICHAS de casino quietas (canto azul noche/porcelana, filete dorado, anillo, relieve), de la familia de la ficha del mapa:
//   pausa de animaciones · moneda con la estrella del logo y aro de progreso de lectura (al tocarla, sube al inicio). Estilos en styles/floating-contact.css.

import { useEffect, useRef, type ReactNode } from 'react'
import { home } from '@/content/home'
import { ui } from '@/content/ui'
import { useLang } from '@/lib/lang'
import { setMotionPaused, useMotionPaused } from '@/lib/motion'

const R = 27 // radio del aro (viewBox 60×60)
const C = 2 * Math.PI * R
/** Ficha de casino estática: canto de bloques alternados + filete dorado, anillo interior y cara (ver floating-contact.css). */
function Coin({ children }: { children: ReactNode }) {
  return (
    <span className="fcoin" aria-hidden="true">
      <span className="fcoin__face">{children}</span>
    </span>
  )
}

/** La estrella de 4 puntas del logo (vector, de public/logo.webp), recortada y centrada. */
const Star = () => (
  <svg viewBox="488 10 154 175" width="16" height="18" focusable="false">
    <path d="M565 20L576 85L632 98L576 110L565 175L554 110L498 98L554 85Z" fill="#7bc3eb" />
  </svg>
)

export function FloatingContact() {
  const lang = useLang()
  const t = ui[lang]
  const ring = useRef<SVGCircleElement>(null)
  const paused = useMotionPaused()

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

  const label = paused ? home[lang].footer.motion.play : home[lang].footer.motion.pause // igual que el botón del pie
  return (
    <div className="float-contact">
      <button type="button" className="float-contact__pause" data-paused={paused || undefined} aria-label={label} title={label} onClick={() => setMotionPaused(!paused)}>
        <Coin>
          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" focusable="false">
            {paused ? <path d="M8 5.5v13l11-6.5z" /> : <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" />}
          </svg>
        </Coin>
      </button>

      <button
        type="button"
        className="float-contact__top"
        aria-label={t.backToTop}
        // Con la pausa activa el CSS global `scroll-behavior: smooth` sigue mandando (aceptado); con reduce-motion el salto es instantáneo.
        onClick={() => scrollTo({ top: 0, behavior: paused || matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
      >
        <svg className="float-contact__ring" viewBox="0 0 60 60" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="float-progress" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" style={{ stopColor: '#f3d79a' }} />
              <stop offset="1" style={{ stopColor: 'var(--color-gold)' }} />
            </linearGradient>
          </defs>
          <circle className="float-contact__track" cx="30" cy="30" r={R} />
          <circle ref={ring} className="float-contact__fill" cx="30" cy="30" r={R} strokeDasharray={C} strokeDashoffset={C} />
        </svg>
        <Coin><Star /></Coin>
      </button>

    </div>
  )
}
