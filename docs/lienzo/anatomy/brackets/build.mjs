// node build.mjs  ->  brackets.html (standalone page), figure.json (pieces used by integrate.mjs), prints the weight.
import { writeFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { HERE, runtimeText, source } from "./bundle.mjs";
import { KIT_CSS, BRK_VARS } from "./style.mjs";
import { CARD_CSS, TEXT, cardHtml } from "./card.mjs";

const WIDTH = 640; let HEIGHT = 370;
const text = runtimeText(["model.js", "draw.js", "live.js"]);
const api = new Function(text + "; return {iso, fitProjection, setView, staticSvg, carriageSvg, carriageTransform, dynSvg, stateOf, figureSvg: null, TEETH, ZG, W};")();
// frame the whole model (plate, tallest teeth, gauge, knob)
const pts = [];
for (const [x, y] of [[-104, -60], [104, -60], [-104, 88], [104, 88]]) for (const z of [-17, 36]) pts.push([x, y, z]);
// the plate corners are in the local frame, so fit after rotating them with a first guess of the same azimuth
const AZ = 40;
const probe = new Function(text + "; setView({azimuth:" + AZ + "}); return (list) => list.map(([u, w, z]) => [...W([u, w]), z]);")();
const world = probe([[-80,-42,-17],[80,-42,-17],[-80,84,-17],[80,84,-17],[-80,-42,0],[80,-42,0],[-80,84,0],[80,84,0],[-62,10,34],[62,10,34],[0,40,34]]);
// width decides the scale; the height is then cut to the content (no spare air above and below)
const PAD = 8, first = api.fitProjection(world, WIDTH, 2000, { pad: PAD, azimuth: AZ, elevation: 36 });
const ys = world.map((p) => api.iso(p, first)[1]);
HEIGHT = Math.ceil(Math.max(...ys) - Math.min(...ys) + 2 * PAD);
const P = { ...api.fitProjection(world, WIDTH, HEIGHT, { pad: PAD, azimuth: AZ, elevation: 36 }), width: WIDTH, height: HEIGHT };
api.setView(P);
const label = TEXT.label;
const svg = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" class="iso-svg" viewBox="0 0 ${WIDTH} ${HEIGHT}" aria-hidden="true" focusable="false">${inner}</svg>`;
const initial = api.stateOf(4);
const inner = `<g data-static>${api.staticSvg()}</g><g data-dyn>${api.dynSvg(initial)}</g><g data-car transform="${api.carriageTransform(4)}">${api.carriageSvg()}</g>`;
const card = cardHtml(svg(inner));
const css = KIT_CSS + BRK_VARS + CARD_CSS;
const T = process.argv.find((a) => a.startsWith("--t="));
const script = (T ? `window.__BRK_T=${T.slice(4)};` : "") + `${text}\nmountBrackets(document.querySelector(".brk"), ${JSON.stringify(P)});`;
const page = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>How braces work · figure</title><style>*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0a1529;padding:24px}.brk{max-width:680px}${css}</style></head><body>${card}<script>${script.replace(/<\/(script)/gi, "<\/$1")}</script></body></html>`;
writeFileSync(join(HERE, T ? `debug-${T.slice(2)}.html` : "brackets.html"), page);
if (!T) writeFileSync(join(HERE, "figure.json"), JSON.stringify({ P, css, card, runtime: text }));
const kb = (n) => (n / 1024).toFixed(1) + " KB";
console.log("wrote brackets.html", kb(statSync(join(HERE, "brackets.html")).size), "| svg", kb(svg(inner).length), "| runtime", kb(text.length), "| css", kb(css.length));
