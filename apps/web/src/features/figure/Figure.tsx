import { useEffect, useId, useRef } from 'react'
import { figureText as T } from '@/content/figure'
import { SERVICES, W, iso, carriageSvg, carriageTransform, dynSvg, fitProjection, rulerSvg, sceneState, setView, staticSvg } from './engine.js'
import { mountServices } from './live.js'
import './figure.css'

type Service = { id: string; tab: string; steps: string[] }
const services = SERVICES as Service[]
export type ServiceId = 'braces' | 'implants' | 'bridges' | 'crowns' | 'whitening'

const WIDTH = 640
const PAD = 8
const AZ = 40
const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k]))
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// The projection is fixed by the model (same numbers as docs/lienzo/anatomy/servicios/build.mjs): width decides the scale, height is cut to the drawing.
let cache: { P: object; height: number } | null = null
function projection() {
  if (cache) return cache
  setView({ azimuth: AZ })
  const world = [[-80, -42, -17], [80, -42, -17], [-80, 84, -17], [80, 84, -17], [-80, -42, 0], [80, -42, 0], [-80, 84, 0], [80, 84, 0], [-62, 10, 40], [62, 10, 40], [0, 40, 40]].map(([u, w, z]) => [...W([u, w]), z])
  const opts = { pad: PAD, azimuth: AZ, elevation: 36 }
  const first = fitProjection(world, WIDTH, 2000, opts)
  const ys = world.map((p) => iso(p, first)[1])
  const height = Math.ceil(Math.max(...ys) - Math.min(...ys) + 2 * PAD)
  cache = { P: { ...fitProjection(world, WIDTH, height, opts), width: WIDTH, height }, height }
  return cache
}

function cardHtml(uid: string, only?: ServiceId) {
  const { P, height } = projection()
  setView(P)
  const idx = Math.max(0, services.findIndex((s) => s.id === only))
  const sv = services[idx], last = sv.steps.length - 1
  // The first picture is the last step of the service, so the card never shows an empty frame.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" class="iso-svg" viewBox="0 0 ${WIDTH} ${height}" aria-hidden="true" focusable="false"><g data-static>${staticSvg()}</g><g data-fade class="brk-fade"><g data-ruler>${rulerSvg(last)}</g><g data-dyn>${dynSvg(sceneState(idx, last))}</g><g data-car transform="${carriageTransform(last, last)}">${carriageSvg()}</g></g></svg>`
  const tabs = only ? '' : `<div class="brk-tabs" role="tablist" aria-label="${T.tabsLabel}" data-tabs>${services.map((s, i) => `<button type="button" role="tab" id="${uid}-tab-${s.id}" data-tab="${i}" aria-selected="${i === 0}" aria-controls="${uid}-panel" tabindex="${i === 0 ? 0 : -1}">${esc(s.tab)}</button>`).join('')}</div>`
  const stepOf = fill(T.stepOf, { n: last + 1, total: last + 1 })
  return `<div class="brk-card">
<div class="brk-head"><span class="brk-title">${only ? esc(sv.tab) : T.title}</span><span class="brk-count" data-count>${stepOf}</span></div>
${tabs}
<div id="${uid}-panel" data-panel role="${only ? 'group' : 'tabpanel'}" aria-labelledby="${uid}-tab-${sv.id}">
<div class="brk-stage" data-stage tabindex="0" role="slider" aria-label="${esc(T.label)}" aria-describedby="${uid}-desc" aria-valuemin="1" aria-valuemax="${last + 1}" aria-valuenow="${last + 1}" aria-valuetext="${stepOf}: ${esc(sv.steps[last])}">${svg}</div>
<p class="brk-name" data-name>${esc(sv.steps[last])}</p>
</div>
<p class="brk-sr" id="${uid}-desc">${esc(T.describe)}</p>
<div class="brk-controls"><button type="button" class="brk-pause" data-pause aria-label="${T.pause}"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 3h3.4v14H5zM11.6 3H15v14h-3.4z"/></svg></button><div class="brk-steps" role="group" aria-label="${T.stepsLabel}" data-steps>${sv.steps.map((s, i) => `<button type="button" data-step="${i}" aria-label="${esc(fill(T.stepLabel, { n: i + 1, name: s }))}" aria-pressed="${i === last}">${i + 1}</button>`).join('')}</div></div>
<div class="brk-foot"><span>${T.hint}</span><span>${T.note}</span></div>
</div>`
}

/** The services figure. `only` shows a single service without tabs (for the service pages). */
export default function Figure({ only }: { only?: ServiceId }) {
  const ref = useRef<HTMLElement>(null)
  const uid = 'fig' + useId().replace(/:/g, '')
  useEffect(() => {
    const host = ref.current
    if (!host) return
    host.dataset.uid = uid
    host.innerHTML = cardHtml(uid, only) // rebuilt on every mount, so a StrictMode remount never doubles the listeners
    if (only) host.dataset.only = only
    const txt = {
      play: T.play,
      stepOf: (n: number, total: number) => fill(T.stepOf, { n, total }),
      stepLabel: (n: number, name: string) => fill(T.stepLabel, { n, name }).replace(/"/g, '&quot;'),
    }
    return mountServices(host, projection().P, txt)
  }, [uid, only])
  return <figure className="brk" ref={ref} />
}
