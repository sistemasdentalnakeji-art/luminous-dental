import { useEffect, useRef, useState } from 'react'
import { Link } from '@/lib/router'

// El logo oficial, tal cual, encendido como letrero de neón en el bloque de marca del pie. Todo el brillo es CSS (footer-city.css).
const logo = `${import.meta.env.BASE_URL}logo.png`

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
  const [ref, lit] = useSeenOnce<HTMLDivElement>(0.6)
  return (
    <div ref={ref} className={`neon ${lit ? 'lit' : 'unlit'}`}>
      <Link href="/" aria-label="Luminous Dental, home">
        <img className="neon-off" src={logo} alt="" width={640} height={365} />
        <img className="neon-on" src={logo} alt="" width={640} height={365} />
      </Link>
    </div>
  )
}
