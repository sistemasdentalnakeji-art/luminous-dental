// node audit.mjs : geometry audit of the model (no part passes through another, order is right, parts sit on parts).
// The kit's recorder audit (A.auditOrExit) is for pipes and round parts; this figure has prisms and one wire, so these checks are written for it.
import { runtimeText } from "./bundle.mjs";
const fit = "setView({azimuth:40, elevation:36, scale:1, origin:[0,0], width:640, height:370});";
const api = new Function(runtimeText(["model.js", "draw.js"]) + `;${fit} return {teethOrder, TEETH, stateOf, frameRing, framePoint, slotPoint, wirePath, gumRing, ZG, ZS, KINDS, depthOf, W, VIEW};`)();
const { TEETH, stateOf, frameRing, framePoint, gumRing, ZG, ZS } = api;
let failures = 0;
const fail = (m) => { failures++; if (failures < 25) console.log("FAIL", m); };
const foot = (i, st, grow = 0) => { const t = TEETH[i], k = t.kind; return frameRing(st.poses[i], -k.tw / 2 - grow, -k.td / 2 - grow, k.tw + 2 * grow, k.td + 2 * grow, 0.01, 1); };
const proj = (poly, ax) => { let lo = 1e9, hi = -1e9; for (const [x, y] of poly) { const v = x * ax[0] + y * ax[1]; lo = Math.min(lo, v); hi = Math.max(hi, v); } return [lo, hi]; };
function sat(A, B) { // null if they overlap, else {ax, aBelow} the separating axis and which one is lower along it
  let best = null;
  for (const poly of [A, B]) for (let i = 0; i < poly.length; i++) {
    const p = poly[i], q = poly[(i + 1) % poly.length], l = Math.hypot(q[0] - p[0], q[1] - p[1]); if (l < 1e-9) continue;
    const ax = [-(q[1] - p[1]) / l, (q[0] - p[0]) / l], [a0, a1] = proj(A, ax), [b0, b1] = proj(B, ax);
    const gap = Math.max(a0 - b1, b0 - a1); if (gap > 0 && (!best || gap > best.gap)) best = { ax, gap, aLow: a1 <= b0 };
  }
  return best;
}
const inside = (pt, poly) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if (yi > pt[1] !== yj > pt[1] && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) c = !c; } return c; };
const gum = gumRing(16.5, 13.5);
const look = api.VIEW.look;
const key0 = (st, i) => { const w = api.W(st.poses[i].c); return api.depthOf([w[0], w[1], ZG + 6], api.VIEW.P); };
let samples = 0, minGap = 1e9;
for (let t = 0; t <= 4.0001; t += 0.05) {
  const st = stateOf(t); samples++;
  const order = api.teethOrder(st, look, (i) => key0(st, i));
  for (let i = 0; i < TEETH.length; i++) {
    // 1. every tooth stands on the gum ridge (all four footprint corners inside it)
    for (const c of foot(i, st)) if (!inside(c, gum)) fail(`t=${t.toFixed(2)} tooth ${i} hangs off the gum`);
    for (let j = i + 1; j < TEETH.length; j++) {
      const s = sat(foot(i, st), foot(j, st));
      if (!s) { fail(`t=${t.toFixed(2)} teeth ${i} and ${j} pass through each other`); continue; }
      minGap = Math.min(minGap, s.gap);
      // 2. painter's order: the tooth nearer the viewer must be drawn later (sorted by depth key)
      const lookDot = s.ax[0] * look[0] + s.ax[1] * look[1];
      if (Math.abs(lookDot) > 0.2 && Math.hypot(...[0, 1].map((a) => st.poses[i].c[a] - st.poses[j].c[a])) < 26) {
        const iNearer = s.aLow ? lookDot < 0 : lookDot > 0, pos = order.indexOf(i) > order.indexOf(j);
        if (iNearer !== pos) fail(`t=${t.toFixed(2)} teeth ${i},${j} drawn in the wrong order`);
      }
    }
  }
}
// 3. wire sits in every slot at the end and at the start of the move, and the slots are all at one height
const st4 = stateOf(4), w4 = api.wirePath(st4.poses);
TEETH.forEach((t, i) => { const p = api.slotPoint(t, st4.poses[i]); const near = w4.samples.some((s) => Math.hypot(s.p[0] - p[0], s.p[1] - p[1]) < 0.01); if (!near) fail(`wire misses slot ${i}`); });
if (!(ZS > ZG && ZS < ZG + Math.min(...api.KINDS.map((k) => k.h)))) fail("slot height is outside the crowns");
console.log(`teeth audit: ${samples} poses x 66 pairs, smallest gap between teeth ${minGap.toFixed(2)}`);
console.log(failures ? `audit failed: ${failures} problems` : "audit passed");
process.exit(failures ? 1 : 0);
