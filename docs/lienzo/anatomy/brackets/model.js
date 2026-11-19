// Brackets figure: the model. Plain JS (no imports) so the same text runs in the build, the audit and the page.
// Local frame: u = to the right, w = toward the viewer (front of the arch). Units ~ 1 px of the real model.
const STEPS = ["Crooked teeth", "Brackets bonded", "Archwire threaded in", "Teeth start to move", "Teeth move into line"];
const ZG = 7;            // top of the gum ridge (teeth stand here)
const ZS = 14;           // height of the bracket slot, same on every tooth
const ARCH = { a: 52, b: 44, w0: -22 };
// slot width, crown width, crown depth, crown height, kind  (order from the midline outward)
const KINDS = [
  { name: "central", slot: 14, tw: 12.4, td: 9, h: 15, r: 4.4, cap: 2.6, groove: 0 },
  { name: "lateral", slot: 11.5, tw: 10.2, td: 8.4, h: 14, r: 4.1, cap: 2.4, groove: 0 },
  { name: "canine", slot: 13, tw: 11.4, td: 10.4, h: 16, r: 5.1, cap: 1.2, groove: 0 },
  { name: "premolar 1", slot: 12, tw: 9.8, td: 11.6, h: 12, r: 4.9, cap: 0.9, groove: 1 },
  { name: "premolar 2", slot: 12, tw: 9.8, td: 11.6, h: 12, r: 4.9, cap: 0.9, groove: 1 },
  { name: "molar", slot: 17, tw: 14, td: 15, h: 11, r: 6.2, cap: 0.9, groove: 1 },
];
// crooked start: [along the arch, out from the arch, turn in degrees], one row per kind, per side
const CROOK = {
  "-1": [[0, 1.5, 18], [0, -5.5, -8], [-0.5, 5.5, 12], [0, 0, -7], [0, 1.5, 0], [0, 0, 0]],
  "1": [[0, -2, -10], [0, 3.5, 14], [0, -4.5, -12], [0, 0, 5], [0, 1.5, 0], [0, 0, 0]],
};
const FEED_FROM = -1; // the wire is threaded in from the left molar toward the right one

function archPoint(theta) { return [ARCH.a * Math.sin(theta), ARCH.b * Math.cos(theta) + ARCH.w0]; }
function archNormal(theta) { const n = [Math.sin(theta) / ARCH.a, Math.cos(theta) / ARCH.b]; const l = Math.hypot(n[0], n[1]); return [n[0] / l, n[1] / l]; }
function thetaAtLength(s) { // arc length -> angle (numeric)
  let theta = 0, run = 0; const step = 0.0005;
  while (run < s) { const p = archPoint(theta), q = archPoint(theta + step); run += Math.hypot(q[0] - p[0], q[1] - p[1]); theta += step; }
  return theta;
}
function buildTeeth() {
  const teeth = [];
  for (const side of [-1, 1]) {
    let cum = 0.4;
    KINDS.forEach((kind, k) => {
      const s = cum + kind.slot / 2; cum += kind.slot;
      const theta = side * thetaAtLength(s);
      const c = archPoint(theta), n = archNormal(theta), T = [n[1], -n[0]];
      const [du, dn, rot] = CROOK[side][k];
      teeth.push({ side, k, kind, c, n, T, du, dn, rot, theta });
    });
  }
  // order left molar -> right molar
  teeth.sort((p, q) => p.c[0] - q.c[0]);
  teeth.forEach((tooth, o) => { tooth.o = o; });
  return teeth;
}
const TEETH = buildTeeth();
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const ease = (x) => { x = clamp01(x); return x * x * (3 - 2 * x); };
// the whole state comes from one number t (0..4): the control the visitor moves
function stateOf(t) {
  const a = clamp01(t);                 // brackets landing
  const w = clamp01(t - 1);             // archwire threaded in
  const m = clamp01((t - 2) / 2);       // teeth moving
  const step = Math.min(4, Math.max(0, Math.round(t)));
  const moves = TEETH.map((tooth) => ease(m * 1.35 - 0.35 * ((tooth.k % 3) / 2 + (tooth.side > 0 ? 0.15 : 0))));
  const land = TEETH.map((tooth) => ease(a * 1.7 - 0.7 * (tooth.o / 11)));
  const poses = TEETH.map((tooth, i) => poseOf(tooth, moves[i]));
  return { t, a, w, m, step, moves, land, poses };
}
function poseOf(tooth, q) {
  const k = 1 - q;
  const c = [tooth.c[0] + k * (tooth.du * tooth.T[0] + tooth.dn * tooth.n[0]), tooth.c[1] + k * (tooth.du * tooth.T[1] + tooth.dn * tooth.n[1])];
  const ang = (k * tooth.rot * Math.PI) / 180, cs = Math.cos(ang), sn = Math.sin(ang);
  const rot = (v) => [v[0] * cs - v[1] * sn, v[0] * sn + v[1] * cs];
  return { c, T: rot(tooth.T), n: rot(tooth.n) };
}
// plan of a rounded rectangle in a tooth's own frame, returned as local (u,w) points
function frameRing(pose, x0, y0, w, d, r, steps) {
  return roundedPlan({ x: x0, y: y0, w, d, r }, steps).map(([x, y]) => [pose.c[0] + x * pose.T[0] + y * pose.n[0], pose.c[1] + x * pose.T[1] + y * pose.n[1]]);
}
function framePoint(pose, x, y) { return [pose.c[0] + x * pose.T[0] + y * pose.n[0], pose.c[1] + x * pose.T[1] + y * pose.n[1]]; }
// where the wire sits on a tooth (in the slot, in front of the bracket), in local coordinates
function slotPoint(tooth, pose) { return framePoint(pose, 0, tooth.kind.td / 2 + 4); }
// smooth wire through the slots (Catmull-Rom), then cut at the fed length
function wirePath(poses) {
  const pts = TEETH.map((tooth, i) => slotPoint(tooth, poses[i]));
  const head = pts[0], tail = pts[pts.length - 1];
  const dir = (a, b) => { const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1; return [(b[0] - a[0]) / l, (b[1] - a[1]) / l]; };
  const d0 = dir(pts[1], head), d1 = dir(pts[pts.length - 2], tail);
  const all = [[head[0] + d0[0] * 6, head[1] + d0[1] * 6], ...pts, [tail[0] + d1[0] * 6, tail[1] + d1[1] * 6]];
  const at = (i) => all[Math.max(0, Math.min(all.length - 1, i))];
  const out = []; // {p:[u,w], gap:int (0..10 between tooth gap and gap+1, -1 head, 11 tail), len}
  let len = 0; const toothLen = [];
  for (let i = 0; i < all.length - 1; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    for (let s = 0; s < 6; s++) {
      const u = s / 6, u2 = u * u, u3 = u2 * u;
      const p = [0, 1].map((j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
      if (s === 0 && i >= 1 && i <= TEETH.length) toothLen[i - 1] = len + (out.length ? Math.hypot(p[0] - out[out.length - 1].p[0], p[1] - out[out.length - 1].p[1]) : 0);
      if (out.length) len += Math.hypot(p[0] - out[out.length - 1].p[0], p[1] - out[out.length - 1].p[1]);
      out.push({ p, seg: i - 1, len }); // seg: -1 head stub, 0..10 gaps between teeth, 11 tail stub
    }
  }
  const last = all[all.length - 1];
  len += Math.hypot(last[0] - out[out.length - 1].p[0], last[1] - out[out.length - 1].p[1]);
  out.push({ p: last, seg: 11, len });
  return { samples: out, total: len, toothLen };
}
// Painter's order for the teeth: for every pair, the plane that separates their footprints says which one is nearer the viewer
// (look = viewer direction in the local frame); a topological sort over those pairs, depth of the centre only breaks ties.
function teethOrder(st, look, key) {
  const n = TEETH.length, feet = TEETH.map((tooth, i) => frameRing(st.poses[i], -tooth.kind.tw / 2, -tooth.kind.td / 2, tooth.kind.tw, tooth.kind.td, 0.01, 1));
  const after = Array.from({ length: n }, () => []), need = new Array(n).fill(0);
  const span = (poly, ax) => { let lo = 1e9, hi = -1e9; for (const [x, y] of poly) { const v = x * ax[0] + y * ax[1]; if (v < lo) lo = v; if (v > hi) hi = v; } return [lo, hi]; };
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
    if (Math.hypot(st.poses[i].c[0] - st.poses[j].c[0], st.poses[i].c[1] - st.poses[j].c[1]) > 30) continue;
    let best = null;
    for (const poly of [feet[i], feet[j]]) for (let e = 0; e < poly.length; e++) {
      const p = poly[e], q = poly[(e + 1) % poly.length], l = Math.hypot(q[0] - p[0], q[1] - p[1]); if (l < 1e-9) continue;
      const ax = [-(q[1] - p[1]) / l, (q[0] - p[0]) / l], [a0, a1] = span(feet[i], ax), [b0, b1] = span(feet[j], ax), gap = Math.max(a0 - b1, b0 - a1);
      if (gap > 0 && (!best || gap > best.gap)) best = { ax, gap, iLow: a1 <= b0 };
    }
    if (!best) continue;
    const d = best.ax[0] * look[0] + best.ax[1] * look[1];
    if (Math.abs(d) < 0.05) continue;
    const iNearer = best.iLow ? d < 0 : d > 0; // nearer one is drawn later
    const [far, near] = iNearer ? [j, i] : [i, j];
    after[far].push(near); need[near]++;
  }
  const out = [], ready = []; for (let i = 0; i < n; i++) if (!need[i]) ready.push(i);
  while (ready.length) { ready.sort((a, b) => key(a) - key(b)); const i = ready.shift(); out.push(i); for (const j of after[i]) if (!--need[j]) ready.push(j); }
  if (out.length < n) for (let i = 0; i < n; i++) if (!out.includes(i)) out.push(i); // a cycle cannot happen with disjoint convex footprints
  return out;
}
