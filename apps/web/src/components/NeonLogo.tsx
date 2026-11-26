import { useEffect, useRef, useState } from 'react'
import { hrefOf } from '@/config/routes'
import { ui } from '@/content/ui'
import { useLang } from '@/lib/lang'
import { Link } from '@/lib/router'

// El logo oficial, tal cual, encendido como letrero de neón en el bloque de marca del pie. Todo el brillo es CSS (footer-city.css).
const logo = `${import.meta.env.BASE_URL}logo.webp`

/** true la primera vez que el elemento muestra al menos `threshold` de su alto. */
export function useSeenOnce<T extends Element>(threshold: number) {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect() }
    }, { threshold })
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, seen] as const
}

export function NeonLogo() {
  const lang = useLang()
  const [ref, lit] = useSeenOnce<HTMLDivElement>(0.6)
  // La respiración solo corre con el letrero en pantalla: data-off la pausa (atributo propio, React no lo pisa).
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) delete el.dataset.off; else el.dataset.off = '' })
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return (
    <div ref={ref} className={`neon ${lit ? 'lit' : 'unlit'}`}>
      <Link href={hrefOf('home', lang)} aria-label={ui[lang].homeAria}>
        <img className="neon-off" src={logo} alt="" width={520} height={297} />
        <img className="neon-glow" src={logo} alt="" width={520} height={297} />
        <img className="neon-on" src={logo} alt="" width={520} height={297} />
      </Link>
    </div>
  )
}
