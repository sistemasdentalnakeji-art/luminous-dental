// Insurance board, copied from Dental Nakeji (pages/insurance/InsuranceGrid.tsx): still logos in a grid of thin lines with a gold "+" at the
// crossings, and now and then a blue line of light that runs over the grid lines (2 to 4 segments, at most 2 at a time).
// The light does not run with "reduce motion", with "Pause decorative animations" (data-motion-paused), with the tab hidden or off screen.
// Random choices and the SVG are made inside useEffect (nothing at render). Styles: styles/insurance.css.
import { useEffect, useRef, type CSSProperties } from 'react'
import { insurers } from '@/content/insurers'

const SVG_NS = 'http://www.w3.org/2000/svg'
const BEAM_MS = 1900 // must match the `insurers-beam` animation in insurance.css
const MAX_BEAMS = 2
const DIRS: [number, number][] = [[0, 1], [1, 0], [0, -1], [-1, 0]] // right, down, left, up (row, column)

const pick = <T,>(list: T[]): T => list[Math.floor(Math.random() * list.length)]

/** Path of 2 to 4 segments over the grid crossings: straight weighs double, never turns back, repeats a crossing or touches a corner. */
function beamPath(rows: number, cols: number): [number, number][] {
  const segments = Math.random() < 0.2 ? 2 : Math.random() < 0.5 ? 3 : 4
  const corner = (r: number, c: number) => (r === 0 || r === rows) && (c === 0 || c === cols)
  const free = (r: number, c: number, path: [number, number][]) =>
    r >= 0 && r <= rows && c >= 0 && c <= cols && !corner(r, c) && !path.some(([pr, pc]) => pr === r && pc === c)
  for (let attempt = 0; attempt < 8; attempt++) {
    let r = Math.floor(Math.random() * (rows + 1))
    let c = Math.floor(Math.random() * (cols + 1))
    if (corner(r, c)) continue
    let dir = Math.floor(Math.random() * 4)
    const path: [number, number][] = [[r, c]]
    while (path.length <= segments) {
      const options = [dir, dir, (dir + 1) % 4, (dir + 3) % 4].filter((d) => free(r + DIRS[d][0], c + DIRS[d][1], path))
      if (!options.length) break
      dir = pick(options)
      r += DIRS[dir][0]
      c += DIRS[dir][1]
      path.push([r, c])
    }
    if (path.length >= 3) return path
  }
  return []
}

export function InsuranceGrid() {
  const boardRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLUListElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const board = boardRef.current
    const grid = gridRef.current
    const svg = svgRef.current
    if (!board || !grid || !svg || matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timers = new Set<number>()
    let visible = false
    let active = 0
    let serial = 0
    let next = 0

    const launch = () => {
      const cells = Array.from(grid.children) as HTMLElement[]
      const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length
      const rows = Math.ceil(cells.length / cols)
      const path = beamPath(rows, cols)
      if (!path.length) return
      // Position of each grid line: the 1 px gap between cells, and the board edge outside.
      const origin = board.getBoundingClientRect()
      const rect = (index: number) => cells[index].getBoundingClientRect()
      const xs = Array.from({ length: cols + 1 }, (_, c) =>
        c === 0 ? rect(0).left - origin.left - 0.5 : c === cols ? rect(cols - 1).right - origin.left + 0.5 : (rect(c - 1).right + rect(c).left) / 2 - origin.left,
      )
      const ys = Array.from({ length: rows + 1 }, (_, r) =>
        r === 0 ? rect(0).top - origin.top - 0.5 : r === rows ? rect((rows - 1) * cols).bottom - origin.top + 0.5 : (rect((r - 1) * cols).bottom + rect(r * cols).top) / 2 - origin.top,
      )
      const points = path.map(([r, c]) => [xs[c], ys[r]])
      const group = document.createElementNS(SVG_NS, 'g')
      const gradient = document.createElementNS(SVG_NS, 'linearGradient')
      const id = `insurers-beam-${(serial += 1)}`
      const first = points[0]
      const last = points[points.length - 1]
      gradient.setAttribute('id', id)
      gradient.setAttribute('gradientUnits', 'userSpaceOnUse')
      gradient.setAttribute('x1', String(first[0]))
      gradient.setAttribute('y1', String(first[1]))
      gradient.setAttribute('x2', String(last[0]))
      gradient.setAttribute('y2', String(last[1]))
      ;['#9fd8f5', '#3fb5c8', '#2f63ad'].forEach((color, index) => {
        const stop = document.createElementNS(SVG_NS, 'stop')
        stop.setAttribute('offset', String(index / 2))
        stop.setAttribute('stop-color', color)
        gradient.appendChild(stop)
      })
      const line = document.createElementNS(SVG_NS, 'path')
      line.setAttribute('class', 'insurers__beam')
      line.setAttribute('d', points.map(([x, y], index) => `${index ? 'L' : 'M'}${x} ${y}`).join(' '))
      line.setAttribute('pathLength', '1')
      line.setAttribute('stroke', `url(#${id})`)
      group.append(gradient, line)
      svg.appendChild(group)
      active += 1
      const done = window.setTimeout(() => {
        group.remove()
        active -= 1
        timers.delete(done)
      }, BEAM_MS + 100)
      timers.add(done)
    }

    const tick = () => {
      const paused = document.documentElement.hasAttribute('data-motion-paused') || document.hidden
      if (visible && !paused && active < MAX_BEAMS) launch()
      next = window.setTimeout(tick, 700 + Math.random() * 1400)
    }
    const observer = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0.2 })
    observer.observe(grid)
    next = window.setTimeout(tick, 1000)
    return () => {
      observer.disconnect()
      window.clearTimeout(next)
      timers.forEach((timer) => window.clearTimeout(timer))
      svg.replaceChildren()
    }
  }, [])

  return (
    <div ref={boardRef} className="insurers__board">
      <ul ref={gridRef} className="insurers__grid" role="list">
        {insurers.map(([name, file, width, height]) => (
          <li key={name} className="insurers__cell">
            {/* --ar: proportion of the logo, so every logo takes a similar area (insurance.css) */}
            <img src={`${import.meta.env.BASE_URL}insurers/${file}.webp`} width={width} height={height} alt={name} style={{ '--ar': width / height } as CSSProperties} loading="lazy" decoding="async" />
          </li>
        ))}
      </ul>
      <svg ref={svgRef} className="insurers__beams" aria-hidden="true" focusable="false" />
    </div>
  )
}
