import { useEffect, useId, useRef } from 'react'
import { figureText as T } from '@/content/figure'
import { carriageSvg, carriageTransform, dynSvg, rulerSvg, sceneState, setView, cardStaticSvg } from './engine.js'
import { mountServices } from './live.js'
import { type ServiceId, WIDTH, indexOf, projection, services } from './scene'
import './figure.css'

export type { ServiceId }
const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k]))
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

/** La tarjeta de la página de servicio: título, modelo sobre su tablero con la perilla azul medicina, nombre del paso, botones 1-N, Pausa/Reproducir y nota. */
function cardHtml(uid: string, only: ServiceId) {
  const { P, height } = projection(true)
  setView(P)
  const idx = indexOf(only)
  const sv = services[idx], last = sv.steps.length - 1
  // La primera imagen es el último paso del servicio, así la figura nunca aparece vacía.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" class="iso-svg" viewBox="0 0 ${WIDTH} ${height}" aria-hidden="true" focusable="false"><g data-static>${cardStaticSvg()}</g><g data-ruler>${rulerSvg(last)}</g><g data-dyn>${dynSvg(sceneState(idx, last))}</g><g data-car transform="${carriageTransform(last, last)}">${carriageSvg()}</g></svg>`
  const stepOf = fill(T.stepOf, { n: last + 1, total: last + 1 })
  return `<div class="brk-card brk-card--box">
<div class="bx-head"><span class="bx-title">${esc(T.cardTitles[sv.id as ServiceId] ?? sv.tab)}</span><span class="bx-count" data-count>${stepOf}</span></div>
<div id="${uid}-panel" role="group">
<div class="brk-stage" data-stage tabindex="0" role="slider" aria-label="${esc(T.label)}" aria-describedby="${uid}-desc" aria-valuemin="1" aria-valuemax="${last + 1}" aria-valuenow="${last + 1}" aria-valuetext="${stepOf}: ${esc(sv.steps[last])}">${svg}</div>
<p class="bx-name" data-name>${esc(sv.steps[last])}</p>
</div>
<p class="brk-sr" id="${uid}-desc">${esc(T.describeCard)}</p>
<div class="bx-controls"><button type="button" class="brk-pause" data-pause aria-label="${T.pause}"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 3h3.4v14H5zM11.6 3H15v14h-3.4z"/></svg></button><div class="bx-steps" role="group" aria-label="${T.stepsLabel}" data-steps>${sv.steps.map((s, i) => `<button type="button" data-step="${i}" aria-label="${esc(fill(T.stepLabel, { n: i + 1, name: s }))}" aria-pressed="${i === last}">${i + 1}</button>`).join('')}</div></div>
<div class="bx-foot"><span>${T.hintCard}</span><span>${T.note}</span></div>
</div>`
}

/** La figura paso a paso de un servicio, para su página de servicio. */
export default function Figure({ only }: { only: ServiceId }) {
  const ref = useRef<HTMLElement>(null)
  const uid = 'fig' + useId().replace(/:/g, '')
  useEffect(() => {
    const host = ref.current
    if (!host) return
    host.innerHTML = cardHtml(uid, only) // se reconstruye en cada montaje, así un remontaje de StrictMode nunca duplica los listeners
    host.dataset.only = only
    const txt = {
      play: T.play,
      stepOf: (n: number, total: number) => fill(T.stepOf, { n, total }),
      stepLabel: (n: number, name: string) => fill(T.stepLabel, { n, name }).replace(/"/g, '&quot;'),
    }
    return mountServices(host, projection(true).P, txt)
  }, [uid, only])
  return <figure className="brk" ref={ref} />
}
