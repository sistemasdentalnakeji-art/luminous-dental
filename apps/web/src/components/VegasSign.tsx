import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { locationText } from '@/content/location'
import { useLang } from '@/lib/lang'

// Réplica de las proporciones y el diseño del clásico letrero "Welcome to Fabulous Las Vegas, Nevada" (1959, Betty Willis, quien nunca lo registró),
// con las palabras de esta clínica: un rombo ancho y estirado con borde dorado y focos por todo el contorno, siete "monedas" grandes de plata con letras rojas sobre el
// borde superior, "TO Fabulous" en azul, el nombre grande en rojo, una línea azul espaciada y una estrella naranja con puntas amarillas sobre un marco azul y postes.
// Dibujado con formas SVG (no es una imagen). Los focos se encienden en cadena; con movimiento reducido todos quedan encendidos.
// Es el título visual de la sección; el <h2> real "Visit us" está a su lado (oculto visualmente), así que el dibujo se oculta a los lectores de pantalla.
const SHAPE: [number, number][] = [[48, 336], [338, 192], [405, 178], [472, 192], [748, 336], [405, 560]]
const POINTS = SHAPE.map((p) => p.join(',')).join(' ')
const LENS = SHAPE.map((p, i) => Math.hypot(SHAPE[(i + 1) % SHAPE.length][0] - p[0], SHAPE[(i + 1) % SHAPE.length][1] - p[1]))
const PERIM = LENS.reduce((a, b) => a + b, 0)
const BULBS = 58

/** Punto i de n a lo largo del contorno, en sentido horario desde el punto izquierdo. */
function along(i: number, n: number): [number, number] {
  let d = (i / n) * PERIM
  for (let k = 0; k < SHAPE.length; k++) {
    if (d <= LENS[k]) {
      const t = d / LENS[k], a = SHAPE[k], b = SHAPE[(k + 1) % SHAPE.length]
      return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
    }
    d -= LENS[k]
  }
  return SHAPE[0]
}

/** Estrella de ocho puntas: puntas largas arriba, abajo, izquierda y derecha, y otras más cortas en diagonal. */
function star(cx: number, cy: number, long: number, short: number, valley: number) {
  return Array.from({ length: 16 }, (_, i) => {
    const a = (i * Math.PI) / 8 - Math.PI / 2
    const r = i % 2 ? valley : i % 4 === 0 ? long : short
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')
}

const COIN_X = (i: number) => 170 + i * 75.8
// Cada moneda queda justo dentro del borde superior, siguiendo su pendiente, para que ninguna cubra el borde dorado ni los focos (y ninguna toque las palabras).
const edgeY = (x: number) => (x < 338 ? 336 - (144 * (x - 48)) / 290 : x <= 472 ? 192 - 14 * (1 - Math.abs(x - 405) / 67) : 192 + (144 * (x - 472)) / 276)
const COIN_R = 24
const GOLD = '#e9b824', RED = '#e63a2a', BLUE = '#1f7fe0'

export function VegasSign() {
  const T = locationText[useLang()]
  const ref = useRef<SVGSVGElement>(null)
  const [on, setOn] = useState(false) // 58 focos animados: fuera de pantalla se pausan
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) return setOn(true)
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])
  const letters = T.sign.welcome.split('')
  return (
    <svg ref={ref} className={`vsign${on ? '' : ' vsign--off'}`} viewBox="0 0 800 612" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="vsign-coin" cx="40%" cy="35%" r="75%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".7" stopColor="#d9dce1" />
          <stop offset="1" stopColor="#aeb3bb" />
        </radialGradient>
      </defs>
      {/* postes y marco azules detrás del letrero */}
      <ellipse cx="400" cy="600" rx="190" ry="10" fill="#02040a" opacity=".5" />
      <rect x="258" y="420" width="34" height="178" fill={BLUE} stroke="#0f4f9c" strokeWidth="2" />
      <rect x="508" y="420" width="34" height="178" fill={BLUE} stroke="#0f4f9c" strokeWidth="2" />
      <path fillRule="evenodd" fill={BLUE} stroke="#0f4f9c" strokeWidth="2" d="M338 22h124v190H338zM360 44v146h80V44z" />
      {/* estrella con puntas amarillas */}
      <g className="vsign__star">
        <polygon points={star(400, 108, 104, 70, 20)} fill="#ee5a1c" stroke="#ffd23f" strokeWidth="4" strokeLinejoin="round" />
        <polygon points={star(400, 108, 62, 40, 12)} fill="none" stroke="#ffd23f" strokeWidth="3" strokeLinejoin="round" />
      </g>
      {/* cuerpo, borde dorado */}
      <polygon points={POINTS} fill="#ffffff" stroke={GOLD} strokeWidth="14" strokeLinejoin="round" />
      <polygon points={POINTS} fill="none" stroke="#fff3b8" strokeWidth="2.500" strokeLinejoin="round" transform="translate(405 340) scale(.965) translate(-405 -340)" />
      {/* focos por todo el contorno, encendidos uno tras otro */}
      {Array.from({ length: BULBS }, (_, i) => {
        const [x, y] = along(i, BULBS)
        return (
          <g key={i} className="vsign__bulb" style={{ '--d': `${(-i * 2.6) / BULBS}s` } as CSSProperties}>
            <circle cx={x} cy={y} r="9" fill="#ffd23f" opacity=".45" />
            <circle cx={x} cy={y} r="5" fill="#fffbe0" stroke="#d6a000" strokeWidth="1.200" />
          </g>
        )
      })}
      {/* palabras: "TO" y "Fabulous" en azul con sus subrayados pequeños, nombre en rojo, línea espaciada en azul (cada una en su propia franja, nada se superpone) */}
      <text x="246" y="346" textAnchor="middle" className="vsign__to">{T.sign.to}</text>
      <text x="432" y="346" textAnchor="middle" className="vsign__fab">{T.sign.fabulous}</text>
      <path d="M226 356h40M290 360q150 10 300 0" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
      <text x="405" y="428" textAnchor="middle" className="vsign__name" textLength="380" lengthAdjust="spacingAndGlyphs">{T.sign.name}</text>
      <text x="405" y="480" textAnchor="middle" className="vsign__place" textLength="190" lengthAdjust="spacing">{T.sign.place}</text>
      {/* siete monedas grandes de plata con borde oscuro, dentro del borde superior */}
      {letters.map((l, i) => {
        const cy = edgeY(COIN_X(i)) + COIN_R + 20
        return (
          <g key={i}>
            <circle cx={COIN_X(i)} cy={cy} r={COIN_R} fill="url(#vsign-coin)" stroke="#4b5059" strokeWidth="3" />
            <circle cx={COIN_X(i)} cy={cy} r={COIN_R - 6} fill="none" stroke="#b4b9c1" strokeWidth="1.500" />
            <text x={COIN_X(i)} y={cy + 11} textAnchor="middle" className="vsign__coin" fill={RED}>{l}</text>
          </g>
        )
      })}
    </svg>
  )
}
