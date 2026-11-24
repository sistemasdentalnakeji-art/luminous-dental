import { useEffect, useState } from 'react'
import { useSeenOnce } from '@/components/NeonLogo'
import { useMotionPaused } from '@/lib/motion'
import cityMarkup from './footer-city/city.svg?raw'

// Maqueta de Las Vegas al fondo del pie (el letrero de neón está arriba, en NeonLogo.tsx). La ciudad ya viene generada: no se calcula nada en el navegador.
// Se dibuja una sola vez al entrar en pantalla; después las ventanas titilan, solo mientras el pie se ve (todo en footer-city.css).
// Con «reducir movimiento» o la pausa queda dibujada y quieta, y al reanudar no se dibuja de nuevo (clase is-done).
// Ventanas y farolas salen del dibujo y van en 4 capas SVG propias (3 de ventanas, 1 de farolas): el navegador anima la opacidad de cada capa sin repintar las 81 líneas.
const svgOpen = cityMarkup.match(/^<svg[^>]*>/)![0]
const pick = (cls: string) => cityMarkup.match(new RegExp(`<path [^>]*class="${cls}"[^>]*></path>`, 'g')) ?? []
const wins = pick('win')
const lamps = pick('lamp')
const base = [...wins, ...lamps].reduce((s, p) => s.replace(p, ''), cityMarkup)
const layers = [0, 1, 2].map((k) => wins.filter((_, i) => i % 3 === k)).concat([lamps]).map((ps) => svgOpen + ps.join('') + '</svg>')

export default function FooterCity() {
  const [scene, drawn] = useSeenOnce<HTMLDivElement>(0.2)
  const paused = useMotionPaused()
  const [done, setDone] = useState(false) // el dibujo de líneas terminó (o se pausó: ya no se vuelve a dibujar)
  if (paused && !done) setDone(true)
  const [visible, setVisible] = useState(false) // el pie está en pantalla
  useEffect(() => {
    const el = scene.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [scene])
  return (
    <div
      className={`fcity${drawn ? ' is-drawn' : ''}${done ? ' is-done' : ''}${done && visible ? ' is-live' : ''}`}
      ref={scene}
      onAnimationEnd={(e) => { if (e.target === e.currentTarget) setDone(true) }}
    >
      <div className="fcity-art" aria-hidden="true" dangerouslySetInnerHTML={{ __html: base }} />
      {layers.map((l, i) => <div key={i} className={`fcity-art fc-l fc-l${i}`} aria-hidden="true" dangerouslySetInnerHTML={{ __html: l }} />)}
    </div>
  )
}
