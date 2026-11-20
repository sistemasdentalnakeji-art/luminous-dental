// Expanding location card, copied from Dental Nakeji's components/ui/LocationMap.tsx (window, drawn map, card that opens, transitions).
// Closed, it is a chip (docs/FICHA-MAPA.md) that turns slowly like a coin, faster with the pointer or focus; open, it faces front and grows from a circle
// through an oval into the map window. It opens by itself when the section is 35 % visible (2 s), closes when it leaves; click, Enter or Space also toggle it, Escape closes.
// The drawing is in content/locationMap.ts (OpenStreetMap data); styles in styles/location-map.css.

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react'
import { Icon } from '@/components/Icon'
import { LABELS, MAP_VIEW, PARKS, PIN, ROADS } from '@/content/locationMap'
import { locationText } from '@/content/location'

/** Espera (ms) desde que la sección es visible hasta que la tarjeta se abre sola. */
const OPEN_DELAY = 2000

interface LocationMapProps {
  name: string
}

const CLOSE_REST = 1200 // ms: closing takes 0.95 s (location-map.css), then a short rest before the coin starts turning again
const EDGE = [-6, -4.5, -3, -1.5, 0, 1.5, 3, 4.5, 6] // z of the discs that make the coin's edge (px)
const BLUE = '#2f63ad'
const NIGHT = '#0c1a33'
const GOLD = '#e0b65c'
const PORCELAIN = '#f4f1ea'

/** Curved block of the rim: a ring segment between radii r1 and r2, centered on angle `deg` (0 = top), `half` degrees to each side. */
const block = (deg: number, r1 = 79, r2 = 93, half = 12) => {
  const pt = (r: number, a: number) => {
    const t = ((deg + a - 90) * Math.PI) / 180
    return `${(100 + r * Math.cos(t)).toFixed(2)} ${(100 + r * Math.sin(t)).toFixed(2)}`
  }
  return `M${pt(r2, -half)}A${r2} ${r2} 0 0 1 ${pt(r2, half)}L${pt(r1, half)}A${r1} ${r1} 0 0 0 ${pt(r1, -half)}Z`
}

/** One face of the chip. 8 equal porcelain blocks (top, then every 45°), thin gold fillets, arc texts, logo swoosh + star in the center. */
function ChipFace({ top, bottom, id }: { top: string; bottom: string; id: string }) {
  return (
    <svg className="loc__chip" viewBox="0 0 200 200" focusable="false">
      <defs>
        <path id={`chip-top-${id}`} d="M40 100A60 60 0 0 1 160 100" />
        <path id={`chip-bottom-${id}`} d="M30 100A70 70 0 0 0 170 100" />
      </defs>
      <circle cx="100" cy="100" r="98" fill={BLUE} />
      {Array.from({ length: 8 }, (_, k) => <path key={k} d={block(k * 45)} fill={PORCELAIN} />)}
      <circle cx="100" cy="100" r="97.2" fill="none" stroke={GOLD} strokeWidth="1.6" />
      <circle cx="100" cy="100" r="75" fill={NIGHT} stroke={GOLD} strokeWidth="1.6" />
      <circle cx="100" cy="100" r="54" fill="none" stroke="#f3d79a" strokeOpacity=".75" strokeWidth="1" />
      <text><textPath href={`#chip-top-${id}`} startOffset="50%" textAnchor="middle">{top}</textPath></text>
      <text><textPath href={`#chip-bottom-${id}`} startOffset="50%" textAnchor="middle">{bottom}</textPath></text>
      {/* The logo's swoosh and 4-point star, drawn again from the real logo (public/logo.png) and centered. */}
      <g transform="translate(100 101) scale(.16) translate(-320 -182)" fill="#5eaee0">
        <path d="M8 202C90 300 230 345 330 340C450 332 540 250 560 105L572 105C565 190 520 270 430 300C330 330 150 300 8 202Z" />
        <path d="M565 20L576 85L632 98L576 110L565 175L554 110L498 98L554 85Z" />
      </g>
    </svg>
  )
}

/** Índice del elemento: lo usa el CSS para escalonar la aparición. */
const step = (index: number) => ({ '--i': index }) as CSSProperties

export function LocationMap({ name }: LocationMapProps) {
  const ui = locationText.map
  const [expanded, setExpanded] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const timerRef = useRef<number | undefined>(undefined)
  const expandedRef = useRef(false)
  const hotRef = useRef(false) // pointer or keyboard focus on the chip: it turns faster
  const visibleRef = useRef(false)
  const wasOpenRef = useRef(false)
  const resumeRef = useRef(0) // after closing, the coin stays still and facing front until this time (ms, performance.now)
  const manualRef = useRef(false) // la persona la abrió o cerró a mano: no se automatiza hasta que salga de la zona

  // Automática: al llegar a la sección (≥ 35 % visible) espera OPEN_DELAY y se abre; al salir de la zona (< 35 %) se cierra.
  // Se repite cada vez que se vuelve a entrar, salvo que la persona la haya usado a mano mientras estaba en la zona.
  useEffect(() => {
    const stage = stageRef.current
    if (!stage || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        window.clearTimeout(timerRef.current)
        if (entry.intersectionRatio >= 0.35) {
          if (manualRef.current) return
          timerRef.current = window.setTimeout(() => {
            // Si la persona ya está con el foco dentro, no se le mueve nada.
            // Solo el foco de teclado lo frena: tras un clic con el mouse el botón queda enfocado y nunca volvería a abrirse solo.
            if (stage.querySelector(':focus-visible')) return
            setExpanded(true)
          }, OPEN_DELAY)
        } else {
          manualRef.current = false
          setExpanded(false)
        }
      },
      { threshold: 0.35 },
    )
    observer.observe(stage)
    return () => {
      observer.disconnect()
      window.clearTimeout(timerRef.current)
    }
  }, [])

  // The coin turns by moving --loc-spin (30°/s, 75°/s with the pointer or focus, eased). Still with reduced motion and with
  // "Pause decorative animations"; facing front while open. It is a real 3D coin: two faces and a stack of discs for the edge.
  useEffect(() => {
    expandedRef.current = expanded
    if (!expanded && wasOpenRef.current) resumeRef.current = performance.now() + CLOSE_REST
    wasOpenRef.current = expanded
    const stage = stageRef.current
    const coin = stage?.querySelector<HTMLElement>('.loc__coin')
    if (!coin) return
    if (expanded) {
      const angle = Number.parseFloat(coin.style.getPropertyValue('--loc-spin')) || 0
      coin.style.setProperty('--loc-spin', `${angle > 180 ? 360 : 0}deg`) // turns to face front by the shorter way
    }
  }, [expanded])

  useEffect(() => {
    const stage = stageRef.current
    const coin = stage?.querySelector<HTMLElement>('.loc__coin')
    if (!stage || !coin || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const seen = new IntersectionObserver(([entry]) => { visibleRef.current = entry.isIntersecting })
    seen.observe(stage)
    let angle = 0
    let speed = 30
    let last = 0
    let raf = 0
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(now - last, 64) / 1000
      last = now
      if (expandedRef.current) { angle = 0; return }
      if (now < resumeRef.current) { speed = 30; return } // closing: the window is still shrinking back to the coin; the coin waits, facing front
      if (!visibleRef.current || document.hidden || document.documentElement.hasAttribute('data-motion-paused')) return
      speed += ((hotRef.current ? 75 : 30) - speed) * Math.min(1, dt * 4)
      angle = (angle + speed * dt) % 360
      coin.style.setProperty('--loc-spin', `${angle}deg`)
    }
    raf = requestAnimationFrame((t) => { last = t; tick(t) })
    return () => { cancelAnimationFrame(raf); seen.disconnect() }
  }, [])

  const toggle = () => {
    manualRef.current = true
    window.clearTimeout(timerRef.current)
    setExpanded((value) => !value)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape' || !expanded) return
    manualRef.current = true
    setExpanded(false)
    toggleRef.current?.focus() // el foco no se pierde: la capa de información queda inerte
  }

  return (
    <div
      ref={stageRef}
      className="loc"
      data-expanded={expanded || undefined}
      onKeyDown={onKeyDown}
      onPointerEnter={() => { hotRef.current = true }}
      onPointerLeave={() => { hotRef.current = false }}
      onFocus={() => { hotRef.current = true }}
      onBlur={() => { hotRef.current = false }}
    >
      <div className="loc__card">
        {/* Cuadrícula tenue (solo contraída). */}
        <span className="loc__grid" aria-hidden="true" />

        {/* Plano (decorativo): terreno, bloques, calles que se trazan, nombres y el pin de la clínica. */}
        <div className="loc__map" aria-hidden="true">
          <svg className="loc__svg" viewBox={MAP_VIEW} preserveAspectRatio="xMaxYMin slice">
            {PARKS.map((points) => <polygon key={points} className="loc__park" points={points} />)}
            {ROADS.map((road, index) => (
              <path
                key={road.d}
                className={`loc__road loc__road--${road.kind}`}
                d={road.d}
                strokeWidth={road.width}
                pathLength={1}
                style={step((index * 11) / ROADS.length)}
              />
            ))}
            {LABELS.map((label) => (
              <text
                key={`${label.text}-${label.x}`}
                className="loc__label"
                transform={`translate(${label.x} ${label.y}) rotate(${label.angle})`}
              >
                {label.text}
              </text>
            ))}
            <ellipse className="loc__halo" cx={PIN.x} cy={PIN.y} rx={14} ry={5} />
            <g transform={`translate(${PIN.x} ${PIN.y})`}>
              <g className="loc__pin">
                <g transform="scale(3.4) translate(-12 -22)">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" />
                  <circle cx="12" cy="9" r="2.6" fill="var(--loc-pin-dot)" />
                </g>
              </g>
              <text className="loc__pin-label" x="-46" y="-40">
                {name}
              </text>
            </g>
          </svg>
        </div>
      </div>

        {/* Closed: a classic casino chip drawn for Luminous (docs/FICHA-MAPA.md): wide solid blue rim with 8 porcelain blocks, thin gold fillets,
            night-blue center with the logo's own swoosh and star, text on an arc. Two faces and a stack of discs for the edge: it turns like a coin. */}
        <div className="loc__coin" aria-hidden="true">
          {EDGE.map((z) => <span key={z} className={`loc__edge${z === 0 ? ' loc__edge--gold' : ''}`} style={{ '--z': `${z}px` } as CSSProperties} />)}
          <span className="loc__side loc__side--front"><ChipFace top={ui.chipTop} bottom={ui.chipBottom} id="f" /></span>
          <span className="loc__side loc__side--back"><ChipFace top={ui.chipTop} bottom={ui.chipBottom} id="b" /></span>
        </div>
        <p className="sr-only">{name}</p>

        {/* Un solo botón cubre y alterna la tarjeta. */}
        <button ref={toggleRef} type="button" className="loc__toggle" aria-expanded={expanded} onClick={toggle}>
          <span className="sr-only">{expanded ? ui.close : ui.open}</span>
        </button>
        <span className="loc__close" aria-hidden="true">
          <Icon name="close" size={18} />
        </span>


      <p className="loc__credit" aria-hidden="true">© OpenStreetMap contributors</p>

      <p className="loc__hint" aria-hidden="true">
        {ui.hint}
      </p>
    </div>
  )
}
