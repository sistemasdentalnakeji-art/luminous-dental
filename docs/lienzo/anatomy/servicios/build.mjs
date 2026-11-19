// node build.mjs            -> servicios.html (all five services), servicio-<id>.html (each one alone), figure.json (for integrate.mjs)
// node build.mjs --s=1 --t=2 -> debug-s1-t2.html (service 1, step value 2)
import { writeFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { HERE, runtimeText } from "./bundle.mjs";
import { KIT_CSS, BRK_VARS } from "./style.mjs";
import { CARD_CSS, TEXT, SERVICES, cardHtml } from "./card.mjs";

const WIDTH = 640; let HEIGHT = 370;
const text = runtimeText(["model.js", "draw.js", "live.js"]);
const api = new Function(text + "; return {iso, fitProjection, setView, staticSvg, carriageSvg, carriageTransform, rulerSvg, dynSvg, sceneState};")();
const AZ = 40;
const probe = new Function(text + "; setView({azimuth:" + AZ + "}); return (list) => list.map(([u, w, z]) => [...W([u, w]), z]);")();
const world = probe([[-80,-42,-17],[80,-42,-17],[-80,84,-17],[80,84,-17],[-80,-42,0],[80,-42,0],[-80,84,0],[80,84,0],[-62,10,40],[62,10,40],[0,40,40]]);
// width decides the scale; the height is then cut to the content (no spare air above and below)
const PAD = 8, first = api.fitProjection(world, WIDTH, 2000, { pad: PAD, azimuth: AZ, elevation: 36 });
const ys = world.map((p) => api.iso(p, first)[1]);
HEIGHT = Math.ceil(Math.max(...ys) - Math.min(...ys) + 2 * PAD);
const P = { ...api.fitProjection(world, WIDTH, HEIGHT, { pad: PAD, azimuth: AZ, elevation: 36 }), width: WIDTH, height: HEIGHT };
api.setView(P);
const svgFor = (svc) => {
  const max = SERVICES[svc].steps.length - 1;
  const inner = `<g data-static>${api.staticSvg()}</g><g data-fade class="brk-fade"><g data-ruler>${api.rulerSvg(max)}</g><g data-dyn>${api.dynSvg(api.sceneState(svc, max))}</g><g data-car transform="${api.carriageTransform(max, max)}">${api.carriageSvg()}</g></g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" class="iso-svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" aria-hidden="true" focusable="false">${inner}</svg>`;
};
const css = KIT_CSS + BRK_VARS + CARD_CSS;
const arg = (n) => { const a = process.argv.find((x) => x.startsWith(`--${n}=`)); return a ? a.slice(n.length + 3) : null; };
const pageOf = (title, card, pre = "") => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><style>*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0a1529;padding:24px;font-family:system-ui,sans-serif}.brk{max-width:680px}${css}</style></head><body>${card}<script>${(pre + text + `\nmountServices(document.querySelector(".brk"), ${JSON.stringify(P)});`).replace(/<\/(script)/gi, "<\/$1")}</script></body></html>`;
const kb = (n) => (n / 1024).toFixed(1) + " KB";
const S = arg("s"), T = arg("t");
if (S !== null || T !== null) {
  const s = Number(S || 0);
  writeFileSync(join(HERE, `debug-s${s}-t${T}.html`), pageOf("debug", cardHtml(svgFor(s)), `window.__SV=${s};window.__BRK_T=${T};`));
} else {
  writeFileSync(join(HERE, "servicios.html"), pageOf("See how it works · figure", cardHtml(svgFor(0))));
  SERVICES.forEach((sv, i) => writeFileSync(join(HERE, `servicio-${sv.id}.html`), pageOf(sv.tab + " · figure", cardHtml(svgFor(i), sv.id))));
  writeFileSync(join(HERE, "figure.json"), JSON.stringify({ P, css, card: cardHtml(svgFor(0)), runtime: text }));
  console.log("wrote servicios.html", kb(statSync(join(HERE, "servicios.html")).size), "| svg", kb(svgFor(0).length), "| runtime", kb(text.length), "| css", kb(css.length), "| viewBox height", HEIGHT);
}
