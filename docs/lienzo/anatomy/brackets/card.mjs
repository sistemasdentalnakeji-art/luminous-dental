// The card around the figure (shared by the standalone page and the lienzo). Texts marked NEW need the owner's approval (see hoja-b4.md).
export const TEXT = {
  title: "How braces work",                       // NEW
  steps: ["Crooked teeth", "Brackets bonded", "Archwire threaded in", "Teeth start to move", "Teeth move into line"], // NEW
  hint: "Drag the gold knob or pick a step",       // NEW
  note: "Illustration. Individual results vary.",  // "Individual results vary." is in home.ts; "Illustration." is NEW
  label: "Braces steps",                              // NEW (short name of the control)
  describe: "Illustration of a model of the lower teeth. Brackets are bonded to crooked teeth, an archwire is threaded through them, and the teeth move into line, one step at a time. Use the left and right arrow keys to change the step.", // NEW
  pause: "Pause animation", play: "Play animation",     // NEW
};
export const CARD_CSS = `
.brk{margin:0;width:100%}
.brk-card{position:relative;border-radius:22px;background:linear-gradient(180deg,rgba(18,38,76,.92),rgba(11,26,54,.94));box-shadow:0 0 0 1px rgba(123,195,235,.32),0 40px 80px -40px rgba(0,8,24,.9),0 0 80px -20px rgba(123,195,235,.22);padding:clamp(12px,1.5vw,18px) clamp(8px,1.6vw,20px) clamp(14px,1.6vw,20px);color:#F4F9FF;font-family:var(--sans,system-ui,sans-serif)}
.brk-head{display:flex;justify-content:space-between;align-items:baseline;gap:12px;font-size:15px;line-height:1.3}
.brk-title{font-family:var(--serif,Georgia,serif);font-size:clamp(19px,1.6vw,23px);color:#fff}
.brk-count{color:#F2F8FE;font-variant-numeric:tabular-nums;font-size:15px}
.brk-stage{display:block;margin:6px auto 2px;outline:none;touch-action:pan-y;cursor:grab;border-radius:14px;-webkit-tap-highlight-color:transparent}
.brk-stage:active{cursor:grabbing}
.brk-stage:focus-visible{outline:3px solid #e0b65c;outline-offset:2px}
.brk-name{margin:4px 0 10px;text-align:center;font-family:var(--serif,Georgia,serif);font-style:italic;font-weight:300;font-size:clamp(20px,1.9vw,26px);line-height:1.2;color:#f3d79a;min-height:1.3em}
.brk-steps{display:flex;justify-content:center;gap:10px}
.brk-steps button{width:48px;height:48px;border-radius:50%;border:1px solid rgba(255,255,255,.55);background:rgba(255,255,255,.05);color:#fff;font:600 16px/1 var(--sans,system-ui,sans-serif);cursor:pointer;transition:background-color .2s ease-out,border-color .2s ease-out,color .2s ease-out,transform .15s ease-out}
.brk-steps button:hover{border-color:#7bc3eb}
.brk-steps .brk-pause{margin-right:6px;display:grid;place-items:center;padding:0}
.brk-steps .brk-pause[hidden]{display:none}
.brk-pause svg{width:18px;height:18px;fill:#fff}
.brk-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.brk-steps button:active{transform:scale(.96)}
.brk-steps button[aria-pressed="true"]{background:#e0b65c;border-color:#e0b65c;color:#0a1529}
.brk-steps button:focus-visible{outline:3px solid #e0b65c;outline-offset:3px}
.brk-foot{display:flex;justify-content:space-between;gap:6px 18px;flex-wrap:wrap;margin-top:12px;font-size:15px;line-height:1.4;color:#F2F8FE}
@media (max-width:520px){.brk-foot{justify-content:center;text-align:center}.brk-steps{gap:8px}}
@media (prefers-reduced-motion:reduce){.brk-steps button{transition:none}.brk-steps .brk-pause{display:none}}
`;
const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
// svg = the finished <svg> text; hold the initial (final step) so the page reads without script
export function cardHtml(svg) {
  const last = TEXT.steps.length - 1;
  return `<figure class="brk"><div class="brk-card">
<div class="brk-head"><span class="brk-title">${TEXT.title}</span><span class="brk-count" data-count>Step ${last + 1} of 5</span></div>
<div class="brk-stage" data-stage tabindex="0" role="slider" aria-label="${esc(TEXT.label)}" aria-describedby="brk-desc" aria-valuemin="1" aria-valuemax="5" aria-valuenow="${last + 1}" aria-valuetext="Step ${last + 1} of 5: ${esc(TEXT.steps[last])}">${svg}</div>
<p class="brk-name" data-name>${TEXT.steps[last]}</p>
<p class="brk-sr" id="brk-desc">${esc(TEXT.describe)}</p>
<div class="brk-steps" role="group" aria-label="Steps"><button type="button" class="brk-pause" data-pause hidden aria-label="${TEXT.pause}"><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 3h3.4v14H5zM11.6 3H15v14h-3.4z"/></svg></button>${TEXT.steps.map((s, i) => `<button type="button" data-step="${i}" aria-label="Step ${i + 1}: ${esc(s)}" aria-pressed="${i === last}">${i + 1}</button>`).join("")}</div>
<div class="brk-foot"><span>${TEXT.hint}</span><span>${TEXT.note}</span></div>
</div></figure>`;
}
