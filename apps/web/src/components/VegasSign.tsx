import type { CSSProperties } from 'react'
import { locationText as T } from '@/content/location'

// Replica of the proportions and layout of the classic "Welcome to Fabulous Las Vegas, Nevada" sign (1959, Betty Willis, who never copyrighted it),
// with this clinic's words: a wide, stretched diamond with a gold border and bulbs all around, seven big silver "coins" with red letters over the
// top edge, "TO Fabulous" in blue, the name large in red, a spaced blue line, and an orange star with yellow points on a blue frame and posts.
// Drawn with SVG shapes (not an image). The bulbs light up in a chain; with reduced motion they all stay lit.
// It is the visual title of the section; the real <h2> "Visit us" sits next to it (visually hidden), so the drawing is hidden from screen readers.
const SHAPE: [number, number][] = [[48, 336], [338, 192], [405, 178], [472, 192], [748, 336], [405, 560]]
const POINTS = SHAPE.map((p) => p.join(',')).join(' ')
const LENS = SHAPE.map((p, i) => Math.hypot(SHAPE[(i + 1) % SHAPE.length][0] - p[0], SHAPE[(i + 1) % SHAPE.length][1] - p[1]))
const PERIM = LENS.reduce((a, b) => a + b, 0)
const BULBS = 58

/** Point i of n along the outline, clockwise from the left point. */
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

/** Eight-pointed star: long spikes up, down, left, right and shorter diagonal ones. */
function star(cx: number, cy: number, long: number, short: number, valley: number) {
  return Array.from({ length: 16 }, (_, i) => {
    const a = (i * Math.PI) / 8 - Math.PI / 2
    const r = i % 2 ? valley : i % 4 === 0 ? long : short
    return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`
  }).join(' ')
}

const letters = T.sign.welcome.split('')
const COIN_X = (i: number) => 170 + i * 75.8
// Each coin sits just inside the top border, following its slope, so no coin covers the gold edge or the bulbs (and none touches the words).
const edgeY = (x: number) => (x < 338 ? 336 - (144 * (x - 48)) / 290 : x <= 472 ? 192 - 14 * (1 - Math.abs(x - 405) / 67) : 192 + (144 * (x - 472)) / 276)
const COIN_R = 24
const GOLD = '#e9b824', RED = '#e63a2a', BLUE = '#1f7fe0'

export function VegasSign() {
  return (
    <svg className="vsign" viewBox="0 0 800 612" aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="vsign-coin" cx="40%" cy="35%" r="75%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".7" stopColor="#d9dce1" />
          <stop offset="1" stopColor="#aeb3bb" />
        </radialGradient>
      </defs>
      {/* blue posts and frame behind the sign */}
      <ellipse cx="400" cy="600" rx="190" ry="10" fill="#02040a" opacity=".5" />
      <rect x="258" y="420" width="34" height="178" fill={BLUE} stroke="#0f4f9c" strokeWidth="2" />
      <rect x="508" y="420" width="34" height="178" fill={BLUE} stroke="#0f4f9c" strokeWidth="2" />
      <path fillRule="evenodd" fill={BLUE} stroke="#0f4f9c" strokeWidth="2" d="M338 22h124v190H338zM360 44v146h80V44z" />
      {/* star with yellow points */}
      <g className="vsign__star">
        <polygon points={star(400, 108, 104, 70, 20)} fill="#ee5a1c" stroke="#ffd23f" strokeWidth="4" strokeLinejoin="round" />
        <polygon points={star(400, 108, 62, 40, 12)} fill="none" stroke="#ffd23f" strokeWidth="3" strokeLinejoin="round" />
      </g>
      {/* body, gold border */}
      <polygon points={POINTS} fill="#ffffff" stroke={GOLD} strokeWidth="14" strokeLinejoin="round" />
      <polygon points={POINTS} fill="none" stroke="#fff3b8" strokeWidth="2.500" strokeLinejoin="round" transform="translate(405 340) scale(.965) translate(-405 -340)" />
      {/* bulbs all around, lit one after another */}
      {Array.from({ length: BULBS }, (_, i) => {
        const [x, y] = along(i, BULBS)
        return (
          <g key={i} className="vsign__bulb" style={{ '--d': `${(-i * 2.6) / BULBS}s` } as CSSProperties}>
            <circle cx={x} cy={y} r="9" fill="#ffd23f" opacity=".45" />
            <circle cx={x} cy={y} r="5" fill="#fffbe0" stroke="#d6a000" strokeWidth="1.200" />
          </g>
        )
      })}
      {/* words: "TO" and "Fabulous" in blue with their little underlines, name in red, spaced line in blue (each in its own band, nothing overlaps) */}
      <text x="246" y="346" textAnchor="middle" className="vsign__to">{T.sign.to}</text>
      <text x="432" y="346" textAnchor="middle" className="vsign__fab">{T.sign.fabulous}</text>
      <path d="M226 356h40M290 360q150 10 300 0" fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" />
      <text x="405" y="428" textAnchor="middle" className="vsign__name" textLength="380" lengthAdjust="spacingAndGlyphs">{T.sign.name}</text>
      <text x="405" y="480" textAnchor="middle" className="vsign__place" textLength="190" lengthAdjust="spacing">{T.sign.place}</text>
      {/* seven big silver coins with a dark rim, inside the top edge */}
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
