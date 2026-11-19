// The card around the figure. Texts marked NEW need the owner's approval (see hoja-b5.md).
import { runtimeText } from "./bundle.mjs";
const { SERVICES } = new Function(runtimeText(["model.js"]) + "; return { SERVICES };")();
export { SERVICES };
export const TEXT = {
  title: "See how it works",                                  // NEW
  tabsLabel: "Services",                                      // NEW
  hint: "Pick a service, then drag the gold knob or pick a step", // NEW
  note: "Illustration. Individual results vary.",             // "Individual results vary." is in home.ts; "Illustration." is NEW
  label: "Treatment steps",                                   // NEW
  describe: "Illustration of a model of the lower teeth. Choose a service with the tabs, then step through how it is done with the number buttons or the left and right arrow keys.", // NEW
  pause: "Pause animation", play: "Play animation",           // NEW
};
export const CARD_CSS = `
.brk{margin:0;width:100%}
.brk-card{position:relative;border-radius:22px;background:linear-gradient(180deg,rgba(18,38,76,.92),rgba(11,26,54,.94));box-shadow:0 0 0 1px rgba(123,195,235,.32),0 40px 80px -40px rgba(0,8,24,.9),0 0 80px -20px rgba(123,195,235,.22);padding:clamp(12px,1.5vw,18px) clamp(8px,1.6vw,20px) clamp(14px,1.6vw,20px);color:#F4F9FF;font-family:var(--sans,system-ui,sans-serif)}
.brk-head{display:flex;justify-content:space-between;align-items:baseline;gap:12px;font-size:15px;line-height:1.3;padding-inline:6px}
.brk-title{font-family:var(--serif,Georgia,serif);font-size:clamp(19px,1.6vw,23px);color:#fff}
.brk-count{color:#F2F8FE;font-variant-numeric:tabular-nums;font-size:15px}
.brk-tabs{display:flex;flex-wrap:wrap;gap:8px;margin:10px 4px 4px}
.brk-tabs[hidden]{display:none}
.brk-tabs button{min-height:44px;padding:0 16px;border-radius:999px;border:1px solid rgba(255,255,255,.55);background:rgba(255,255,255,.05);color:#fff;font:600 15px/1.2 var(--sans,system-ui,sans-serif);cursor:pointer;white-space:nowrap;transition:background-color .2s ease-out,border-color .2s ease-out,color .2s ease-out,transform .15s ease-out}
.brk-tabs button:hover{border-color:#7bc3eb}
.brk-tabs button:active{transform:scale(.97)}
.brk-tabs button[aria-selected="true"]{background:#e0b65c;border-color:#e0b65c;color:#0a1529}
.brk-tabs button:focus-visible,.brk-steps button:focus-visible,.brk-pause:focus-visible{outline:3px solid #e0b65c;outline-offset:3px}
.brk-stage{display:block;margin:6px auto 2px;outline:none;touch-action:pan-y;cursor:grab;border-radius:14px;-webkit-tap-highlight-color:transparent}
.brk-stage:active{cursor:grabbing}
.brk-stage:focus-visible{outline:3px solid #e0b65c;outline-offset:2px}
.brk-fade{transition:opacity .22s ease-out}
.brk-fade.out{opacity:0}
.brk-name{margin:4px 0 10px;text-align:center;font-family:var(--serif,Georgia,serif);font-style:italic;font-weight:300;font-size:clamp(20px,1.9vw,26px);line-height:1.2;color:#f3d79a;min-height:1.3em}
.brk-controls{display:flex;justify-content:center;align-items:center;gap:8px}
.brk-steps{display:flex;gap:10px}
.brk-controls button{width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,.55);background:rgba(255,255,255,.05);color:#fff;font:600 16px/1 var(--sans,system-ui,sans-serif);cursor:pointer;transition:background-color .2s ease-out,border-color .2s ease-out,color .2s ease-out,transform .15s ease-out}
.brk-controls button:hover{border-color:#7bc3eb}
.brk-controls button:active{transform:scale(.96)}
.brk-steps button[aria-pressed="true"]{background:#e0b65c;border-color:#e0b65c;color:#0a1529}
.brk-controls .brk-pause{margin-right:6px;display:grid;place-items:center;padding:0}
.brk-controls .brk-pause[hidden]{display:none}
.brk-pause svg{width:18px;height:18px;fill:#fff}
.brk-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.brk-foot{display:flex;justify-content:space-between;gap:6px 18px;flex-wrap:wrap;margin-top:12px;font-size:15px;line-height:1.4;color:#F2F8FE;padding-inline:6px}
@media (max-width:520px){.brk-foot{justify-content:center;text-align:center}.brk-steps{gap:8px}.brk-tabs{flex-wrap:nowrap;overflow-x:auto;scroll-snap-type:x proximity;padding-bottom:6px;scrollbar-width:thin;-webkit-mask-image:linear-gradient(90deg,#000 88%,transparent);mask-image:linear-gradient(90deg,#000 88%,transparent)}.brk-tabs button{scroll-snap-align:start}}
@media (prefers-reduced-motion:reduce){.brk-tabs button,.brk-controls button{transition:none}.brk-fade{transition:none}.brk-controls .brk-pause{display:none}}
`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
// svg = the finished <svg> (final step of the first service, so the page reads without script); only = a service id for a stand-alone card
export function cardHtml(svg, only) {
  const start = only ? SERVICES.findIndex((s) => s.id === only) : 0, sv = SERVICES[start], last = sv.steps.length - 1;
  const tabs = only ? "" : `<div class="brk-tabs" role="tablist" aria-label="${TEXT.tabsLabel}" data-tabs hidden>${SERVICES.map((s, i) => `<button type="button" role="tab" id="brk-tab-${s.id}" data-tab="${i}" aria-selected="${i === 0}" aria-controls="brk-panel" tabindex="${i === 0 ? 0 : -1}">${esc(s.tab)}</button>`).join("")}</div>`;
  return `<figure class="brk"${only ? ` data-only="${only}"` : ""}><div class="brk-card">
<div class="brk-head"><span class="brk-title">${only ? esc(sv.tab) : TEXT.title}</span><span class="brk-count" data-count>Step ${last + 1} of ${last + 1}</span></div>
${tabs}
<div id="brk-panel" role="${only ? "group" : "tabpanel"}" aria-labelledby="brk-tab-${sv.id}">
<div class="brk-stage" data-stage tabindex="0" role="slider" aria-label="${esc(TEXT.label)}" aria-describedby="brk-desc" aria-valuemin="1" aria-valuemax="${last + 1}" aria-valuenow="${last + 1}" aria-valuetext="Step ${last + 1} of ${last + 1}: ${esc(sv.steps[last])}">${svg}</div>
<p class="brk-name" data-name>${esc(sv.steps[last])}</p>
</div>
<p class="brk-sr" id="brk-desc">${esc(TEXT.describe)}</p>
<div class="brk-controls"><button type="button" class="brk-pause" data-pause hidden aria-label="${TEXT.pause}"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 3h3.4v14H5zM11.6 3H15v14h-3.4z"/></svg></button><div class="brk-steps" role="group" aria-label="Steps" data-steps>${sv.steps.map((s, i) => `<button type="button" data-step="${i}" aria-label="Step ${i + 1}: ${esc(s)}" aria-pressed="${i === last}">${i + 1}</button>`).join("")}</div></div>
<div class="brk-foot"><span>${TEXT.hint}</span><span>${TEXT.note}</span></div>
</div></figure>`;
}
