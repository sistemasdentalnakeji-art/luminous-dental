import { Fragment, useEffect, useRef, type CSSProperties } from 'react'

// Entrada de título tomada de Dental Nakeji (pages/about/SoftBlurIn.tsx, SmoothUI «Soft Blur In»): cada letra sube y se nitidiza, escalonada, una vez al llegar a pantalla.
// Diferencia con Nakeji: las letras van agrupadas por palabra (inline-block sin corte) para que una palabra nunca se parta entre dos líneas.
// El texto completo queda en un span sr-only; con movimiento reducido o pausa todo se ve sin animar (styles/soft-blur.css).
export function SoftBlurIn({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) return el.setAttribute('data-visible', '')
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.setAttribute('data-visible', ''); io.disconnect() } }, { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  let n = 0
  return (
    <span ref={ref} className="soft-blur-in">
      <span className="sr-only">{children}</span>
      {children.split(' ').map((word, w) => (
        <Fragment key={w}>
          {w > 0 && ' '}
          <span className="soft-blur-in__word" aria-hidden="true">
          {Array.from(word).map((ch, i) => <span key={i} className="soft-blur-in__char" style={{ '--c': Math.min(n++, 40) } as CSSProperties}>{ch}</span>)}
          </span>
        </Fragment>
      ))}
    </span>
  )
}
