// Shared by the service-page figure (Figure.tsx) and the home's "result" figures (ResultFigure.tsx): the fixed camera of the model
// and the markup of one finished scene. The engine (engine.js) is one module, loaded once for every figure on the page.
import { SERVICES, W, dynSvg, fitProjection, floatShadowSvg, iso, sceneState, setView, staticSvg } from './engine.js'

export type ServiceId = 'braces' | 'implants' | 'bridges' | 'crowns' | 'whitening'
export const services = SERVICES as { id: string; tab: string; steps: string[] }[]
export const indexOf = (id: ServiceId) => Math.max(0, services.findIndex((s) => s.id === id))

export const WIDTH = 640
const PAD = 8
const AZ = 40
// Result figures: the model floating on its transparent mold. Service pages: the tray-less tabletop.
const TRAY = [[-78, -34, -6], [78, -34, -6], [-78, 52, -6], [78, 52, -6], [-62, 10, 40], [62, 10, 40], [0, 52, 40]]
const TABLE = [[-80, -42, -17], [80, -42, -17], [-80, 84, -17], [80, 84, -17], [-80, -42, 0], [80, -42, 0], [-80, 84, 0], [80, 84, 0], [-62, 10, 40], [62, 10, 40], [0, 40, 40]]

const caches: Record<string, { P: object; height: number }> = {}
/** Width decides the scale, height is cut to the drawing. */
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

/** The finished (last step) scene of a service, floating on its mold, with a soft shadow; no controls. The [data-dyn] group is what changes while it plays. */
export function resultSvg(id: ServiceId) {
  const { P, height } = projection(false)
  setView(P)
  const idx = indexOf(id)
  const last = services[idx].steps.length - 1
  return `<svg xmlns="http://www.w3.org/2000/svg" class="iso-svg" viewBox="0 0 ${WIDTH} ${height}" aria-hidden="true" focusable="false"><g class="brk-shadow-g">${floatShadowSvg()}</g><g class="brk-bob"><g>${staticSvg()}</g><g data-dyn>${dynSvg(sceneState(idx, last))}</g></g></svg>`
}

