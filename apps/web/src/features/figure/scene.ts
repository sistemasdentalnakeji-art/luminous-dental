// Compartido por la figura de la página de servicio (Figure.tsx) y las figuras de «resultado» de la home (ResultFigure.tsx): la cámara fija del modelo
// y el marcado de una escena terminada. El motor (engine.js) es un solo módulo, cargado una vez para todas las figuras de la página.
import { SERVICES, W, dynSvg, fitProjection, floatShadowSvg, iso, sceneState, setScope, setView, staticSvg } from './engine.js'

export type ServiceId = 'braces' | 'implants' | 'bridges' | 'crowns' | 'whitening'
export const services = SERVICES as { id: string; tab: string; steps: string[] }[]
export const indexOf = (id: ServiceId) => Math.max(0, services.findIndex((s) => s.id === id))

export const WIDTH = 640
const PAD = 8
const AZ = 40
// Figuras de resultado: el modelo flotando sobre su molde transparente. Páginas de servicio: el tablero sin bandeja.
const TRAY = [[-78, -34, -6], [78, -34, -6], [-78, 52, -6], [78, 52, -6], [-62, 10, 40], [62, 10, 40], [0, 52, 40]]
const TABLE = [[-80, -42, -17], [80, -42, -17], [-80, 84, -17], [80, 84, -17], [-80, -42, 0], [80, -42, 0], [-80, 84, 0], [80, 84, 0], [-62, 10, 40], [62, 10, 40], [0, 40, 40]]

const caches: Record<string, { P: object; height: number }> = {}
/** El ancho decide la escala; el alto se recorta al dibujo. */
export function projection(card: boolean) {
  const key = card ? 'card' : 'result'
  if (caches[key]) return caches[key]
  setView({ azimuth: AZ })
  const world = (card ? TABLE : TRAY).map(([u, w, z]) => [...W([u, w]), z])
  const opts = { pad: PAD, azimuth: AZ, elevation: 36 }
  const first = fitProjection(world, WIDTH, 2000, opts)
  const ys = world.map((p) => iso(p, first)[1])
  const height = Math.ceil(Math.max(...ys) - Math.min(...ys) + 2 * PAD)
  caches[key] = { P: { ...fitProjection(world, WIDTH, height, opts), width: WIDTH, height }, height }
  return caches[key]
}

/** La escena terminada (último paso) de un servicio, flotando sobre su molde, con una sombra suave y sin controles. El grupo [data-dyn] es lo que cambia mientras se reproduce. */
export function resultSvg(id: ServiceId, scope: string) {
  const { P, height } = projection(false)
  setView(P)
  setScope(scope)
  const idx = indexOf(id)
  const last = services[idx].steps.length - 1
  return `<svg xmlns="http://www.w3.org/2000/svg" class="iso-svg" viewBox="0 0 ${WIDTH} ${height}" aria-hidden="true" focusable="false"><g class="brk-shadow-g">${floatShadowSvg()}</g><g class="brk-bob"><g>${staticSvg()}</g><g data-dyn>${dynSvg(sceneState(idx, last))}</g></g></svg>`
}

