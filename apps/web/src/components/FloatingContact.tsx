// Botones flotantes abajo a la derecha, adaptados de Dental Nakeji (FloatingContact.tsx):
//   tres FICHAS de casino quietas, WhatsApp solo con su logo verde sobre la misma ficha azul, de la misma familia que la ficha del mapa (canto de bloques azul noche/porcelana, filete dorado, anillo, relieve):
//   pausa de animaciones · moneda con la estrella del logo y aro de progreso de lectura (al tocarla, sube al inicio) · WhatsApp (aún sin número).
// El globito de aviso solo sale cuando la clínica tenga número de WhatsApp. Estilos en styles/floating-contact.css.

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Icon } from '@/components/Icon'
import { clinic } from '@/content/clinic'
import { home } from '@/content/home'
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

/** Solo el logo de WhatsApp, en verde, sobre la misma ficha azul de los otros dos (glifo de Simple Icons, CC0, igual que BrandIcon). */
const WaLogo = () => (
  <svg viewBox="0 0 24 24" width="19" height="19" focusable="false">
    <path fill="#25d366" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

export function FloatingContact() {
  const ring = useRef<SVGCircleElement>(null)
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
        <Coin><Star /></Coin>
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
            <Coin><WaLogo /></Coin>
          </a>
        ) : (
          // Sin número: no interactiva (sin enlace muerto).
          <span className="float-contact__wa wa-soon" role="img" aria-label="WhatsApp (coming soon)">
            <Coin><WaLogo /></Coin>
          </span>
        )}
      </div>
    </div>
  )
}
