// Tarjeta de ubicación que se expande, copiada de components/ui/LocationMap.tsx de Dental Nakeji (ventana, mapa dibujado, tarjeta que se abre, transiciones).
// Cerrada, es una ficha (docs/FICHA-MAPA.md) que gira despacio como una moneda, más rápido con el cursor o el foco, y se puede agarrar y girar arrastrando (con inercia); abierta, mira al frente y crece desde un círculo
// pasando por un óvalo hasta la ventana del mapa. Se abre sola cuando la sección está 35 % visible (2 s) y se cierra al salir; clic, Enter o Espacio también la alternan, Escape la cierra.
// El dibujo está en content/locationMap.ts (datos de OpenStreetMap); estilos en styles/location-map.css.

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
import { useLang } from '@/lib/lang'


interface LocationMapProps {
  name: string
  /** false (Contact, r8): sin la moneda ni el botón; el mapa queda abierto y quieto. */
  coin?: boolean
}

const CLOSE_REST = 1300 // ms: cerrar tarda ~1,2 s (location-map.css), luego un breve descanso antes de que la moneda vuelva a girar
const DRAG_THRESHOLD = 6 // px: menos que esto es un toque (abre el mapa); más es un arrastre (gira la moneda)
const DEG_PER_PX = 0.5 // grados que gira por cada px arrastrado (1:1 con el borde de una moneda de ~260 px sería 0,44)
const MAX_OMEGA = 2000 // °/s: tope de la velocidad al soltar
const FRICTION = 2.4 // 1/s: cuánto frena sola la moneda después de soltarla
const EDGE = [-6, -4.5, -3, -1.5, 0, 1.5, 3, 4.5, 6] // z de los discos que forman el canto de la moneda (px)
const BLUE = '#2f63ad'
const NIGHT = '#0c1a33'
const GOLD = '#e0b65c'
const PORCELAIN = '#f4f1ea'

/** Bloque curvo del borde: un segmento de anillo entre los radios r1 y r2, centrado en el ángulo `deg` (0 = arriba), `half` grados a cada lado. */
const block = (deg: number, r1 = 79, r2 = 93, half = 12) => {
  const pt = (r: number, a: number) => {
    const t = ((deg + a - 90) * Math.PI) / 180
    return `${(100 + r * Math.cos(t)).toFixed(2)} ${(100 + r * Math.sin(t)).toFixed(2)}`
  }
  return `M${pt(r2, -half)}A${r2} ${r2} 0 0 1 ${pt(r2, half)}L${pt(r1, half)}A${r1} ${r1} 0 0 0 ${pt(r1, -half)}Z`
}

/** Una cara de la ficha. 8 bloques de porcelana iguales (arriba, luego cada 45°), filetes dorados finos, textos en arco, el swoosh del logo + la estrella en el centro. */
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
      {/* El swoosh y la estrella de 4 puntas del logo, redibujados a partir del logo real (public/logo.webp) y centrados. */}
      <g transform="translate(100 101) scale(.16) translate(-320 -182)" fill="#5eaee0">
        <path d="M8 202C90 300 230 345 330 340C450 332 540 250 560 105L572 105C565 190 520 270 430 300C330 330 150 300 8 202Z" />
        <path d="M565 20L576 85L632 98L576 110L565 175L554 110L498 98L554 85Z" />
      </g>
    </svg>
  )
}

/** Índice del elemento: lo usa el CSS para escalonar la aparición. */
const step = (index: number) => ({ '--i': index }) as CSSProperties

export function LocationMap({ name, coin: withCoin = true }: LocationMapProps) {
  const ui = locationText[useLang()].map
  const [expanded, setExpanded] = useState(!withCoin)
  const stageRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const expandedRef = useRef(false)
  const hotRef = useRef(false) // cursor o foco de teclado sobre la ficha: gira más rápido
  const visibleRef = useRef(false)
  const wasOpenRef = useRef(false)
  const resumeRef = useRef(0) // después de cerrar, la moneda queda quieta y de frente hasta este momento (ms, performance.now)
  const movedRef = useRef(false) // el último gesto sobre la ficha fue un arrastre (no un toque)

  // La moneda gira moviendo --loc-spin (30°/s, 75°/s con el cursor o el foco, suavizado). Quieta con movimiento reducido y con
  // "Pause decorative animations"; de frente mientras está abierta. Es una moneda 3D real: dos caras y una pila de discos para el canto.
  useEffect(() => {
    expandedRef.current = expanded
    if (!expanded && wasOpenRef.current) resumeRef.current = performance.now() + CLOSE_REST
    wasOpenRef.current = expanded
    const stage = stageRef.current
    const coin = stage?.querySelector<HTMLElement>('.loc__coin')
    if (!coin) return
    if (expanded) {
      const angle = Number.parseFloat(coin.style.getPropertyValue('--loc-spin')) || 0
      coin.style.setProperty('--loc-spin', `${angle > 180 ? 360 : 0}deg`) // gira para quedar de frente por el camino más corto
    }
  }, [expanded])

  // Giro automático + arrastre con inercia. Un solo bucle de requestAnimationFrame mueve --loc-spin (solo rotateY):
  //  auto  = giro lento de siempre; drag = sigue al dedo/mouse; fling = al soltar sigue con la velocidad del arrastre y frena
  //  por fricción, calculada para detenerse justo de frente o de reverso.
  // Con "reducir movimiento" no se registra nada (ni giro ni arrastre: queda solo el botón); con "Pause decorative animations" el arrastre se ignora.
  useEffect(() => {
    const stage = stageRef.current
    const coin = stage?.querySelector<HTMLElement>('.loc__coin')
    const btn = toggleRef.current
    if (!stage || !coin || !btn || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const seen = new IntersectionObserver(([entry]) => { visibleRef.current = entry.isIntersecting })
    seen.observe(stage)
    let mode: 'auto' | 'drag' | 'fling' = 'auto'
    let angle = 0
    let speed = 30
    let omega = 0 // °/s del arrastre / la inercia
    let face = 0 // ángulo donde debe detenerse (múltiplo de 180°)
    let k = 0 // fricción exacta para llegar a `face`
    let last = 0
    let raf = 0
    let id = -1 // puntero que arrastra (-1 = ninguno)
    let startX = 0
    let lastX = 0
    let lastT = 0
    const paused = () => document.documentElement.hasAttribute('data-motion-paused')
    const wrap = (a: number) => ((a % 360) + 360) % 360

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min(now - last, 64) / 1000
      last = now
      if (expandedRef.current) { angle = 0; mode = 'auto'; return }
      if (mode === 'drag') {
        coin.style.setProperty('--loc-spin', `${wrap(angle)}deg`)
        return
      }
      if (mode === 'fling') {
        omega *= Math.exp(-k * dt)
        angle += omega * dt
        if (Math.abs(face - angle) < 3) { // ya casi en la cara: se asienta y descansa un momento antes de volver al giro lento
          angle = wrap(face)
          mode = 'auto'
          speed = 0
          resumeRef.current = now + 1000
        }
        coin.style.setProperty('--loc-spin', `${wrap(angle)}deg`)
        return
      }
      if (now < resumeRef.current) { speed = 0; return } // cerrando o recién soltada: la moneda espera de frente, luego arranca suave
      if (!visibleRef.current || document.hidden || paused()) return
      speed += ((hotRef.current ? 75 : 30) - speed) * Math.min(1, dt * 4)
      angle = wrap(angle + speed * dt)
      coin.style.setProperty('--loc-spin', `${angle}deg`)
    }
    raf = requestAnimationFrame((t) => { last = t; tick(t) })

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 || id !== -1 || expandedRef.current || paused()) return
      id = e.pointerId
      startX = lastX = e.clientX
      lastT = e.timeStamp
      omega = 0
      movedRef.current = false
      btn.setPointerCapture(id)
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerId !== id) return
      if (!movedRef.current) {
        if (Math.abs(e.clientX - startX) < DRAG_THRESHOLD) return
        movedRef.current = true // pasó el umbral: ya es un arrastre y el clic posterior no abrirá el mapa
        mode = 'drag'
        angle = wrap(angle)
        btn.toggleAttribute('data-drag', true)
        lastX = e.clientX // el giro empieza desde aquí, sin salto
        lastT = e.timeStamp
        return
      }
      const dx = e.clientX - lastX
      const dt = Math.max(e.timeStamp - lastT, 8) / 1000
      angle += dx * DEG_PER_PX
      omega = omega * 0.6 + ((dx * DEG_PER_PX) / dt) * 0.4 // promedio para que un tirón suelto no dispare la velocidad
      lastX = e.clientX
      lastT = e.timeStamp
    }
    const onUp = (e: PointerEvent) => {
      if (e.pointerId !== id) return
      id = -1
      btn.toggleAttribute('data-drag', false)
      if (mode !== 'drag') return
      if (e.timeStamp - lastT > 80) omega = 0 // la mantuvo quieta antes de soltar: sin lanzamiento
      // Inercia mínima para que siempre avance hasta la siguiente cara aunque se suelte despacio.
      const dir = omega < 0 ? -1 : 1
      omega = dir * Math.min(MAX_OMEGA, Math.max(200, Math.abs(omega)))
      // Cara donde terminaría con la fricción normal (redondeada a 0° o 180°), al menos 30° por delante.
      face = Math.round((angle + omega / FRICTION) / 180) * 180
      while ((face - angle) * dir < 30) face += 180 * dir
      k = omega / (face - angle) // con esta fricción exponencial el recorrido total es exactamente hasta `face`
      mode = 'fling'
    }
    btn.addEventListener('pointerdown', onDown)
    btn.addEventListener('pointermove', onMove)
    btn.addEventListener('pointerup', onUp)
    btn.addEventListener('pointercancel', onUp)
    return () => {
      cancelAnimationFrame(raf)
      seen.disconnect()
      btn.removeEventListener('pointerdown', onDown)
      btn.removeEventListener('pointermove', onMove)
      btn.removeEventListener('pointerup', onUp)
      btn.removeEventListener('pointercancel', onUp)
    }
  }, [])

  const toggle = () => {
    if (movedRef.current) { movedRef.current = false; return } // fue un arrastre: no abre
    setExpanded((value) => !value)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Escape' || !expanded) return
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
        {/* Cerrada: una clásica ficha de casino dibujada para Luminous (docs/FICHA-MAPA.md): borde azul sólido ancho con 8 bloques de porcelana, filetes dorados finos,
            centro azul noche con el swoosh y la estrella del propio logo, texto en arco. Dos caras y una pila de discos para el canto: gira como una moneda. */}
        {withCoin && <div className="loc__coin" aria-hidden="true">
          {EDGE.map((z) => <span key={z} className={`loc__edge${z === 0 ? ' loc__edge--gold' : ''}`} style={{ '--z': `${z}px` } as CSSProperties} />)}
          <span className="loc__side loc__side--front"><ChipFace top={ui.chipTop} bottom={ui.chipBottom} id="f" /></span>
          <span className="loc__side loc__side--back"><ChipFace top={ui.chipTop} bottom={ui.chipBottom} id="b" /></span>
        </div>}

      {/* Va encima de la moneda: al abrir se funde sobre ella y crece; al cerrar se encoge hasta ser un disco y se funde dejando ver la moneda. */}
      <div className="loc__card">
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

        <p className="sr-only">{name}</p>

        {/* Un solo botón cubre y alterna la tarjeta. */}
        {withCoin && <>
          <button ref={toggleRef} type="button" className="loc__toggle" aria-expanded={expanded} onClick={toggle}>
            <span className="sr-only">{expanded ? ui.close : ui.open}</span>
          </button>
          <span className="loc__close" aria-hidden="true">
            <Icon name="close" size={18} />
          </span>
        </>}


      <p className="loc__credit" aria-hidden="true">© OpenStreetMap contributors</p>

      {withCoin && <p className="loc__hint" aria-hidden="true">
        {ui.hint}
      </p>}
    </div>
  )
}
