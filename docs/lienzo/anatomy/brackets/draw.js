// Brackets figure: drawing. Uses the Anatomy kit functions and model.js (all in the same scope).
const YAW = 14;
let VIEW = null;
function setView(P) {
  const phi = ((P.azimuth + YAW) * Math.PI) / 180;
  const az = (P.azimuth * Math.PI) / 180;
  const RT = [Math.sin(phi), -Math.cos(phi)], FR = [Math.cos(phi), Math.sin(phi)], V = [Math.cos(az), Math.sin(az)];
  VIEW = { P, RT, FR, look: [V[0] * RT[0] + V[1] * RT[1], V[0] * FR[0] + V[1] * FR[1]] };
}
const W = (p) => [p[0] * VIEW.RT[0] + p[1] * VIEW.FR[0], p[0] * VIEW.RT[1] + p[1] * VIEW.FR[1]];
const slabL = (ring, z, h, bevel = 0) => extrude(ring.map(W), z, h, VIEW.P, { convex: true, bevel });
const plateRing = (x, y, w, d, r, steps = 6) => roundedPlan({ x, y, w, d, r }, steps);
const lineL = (pts, z) => onTop(pts.map(W), z, VIEW.P);
const S = (paths, style) => solidSvg(paths, style);
const Ln = (d, style) => lineSvg(d, style);
const dotsL = (pts, z, style) => dotsSvg(pts.map((p) => { const w = W(p); return iso([w[0], w[1], z], VIEW.P); }), style);
const ringL = (c, r, z, steps = 28) => onTop(circleRing(0, 0, r, steps).map(([x, y]) => W([c[0] + x, c[1] + y])), z, VIEW.P, true);
const wrap = (cls, inner, extra = "") => `<g class="${cls}"${extra}>${inner}</g>`;
const PLATE = { x: -80, y: -42, w: 160, d: 126, r: 9 };
const RAIL_W = 56; // the control rail runs along u at this w
const STEP_U = (i) => -46 + 23 * i;

function gumRing(offOut, offIn) {
  const end = thetaAtLength(0.4 + KINDS.reduce((s, k) => s + k.slot, 0) - 6);
  const outer = [], inner = [], N = 40, mid = (offOut - offIn) / 2, rr = (offOut + offIn) / 2;
  for (let i = 0; i <= N; i++) {
    const th = -end + (2 * end * i) / N, p = archPoint(th), n = archNormal(th);
    outer.push([p[0] + n[0] * offOut, p[1] + n[1] * offOut]);
    inner.push([p[0] - n[0] * offIn, p[1] - n[1] * offIn]);
  }
  const cap = (th, sign, flip) => { // half circle that closes one end; sign = which way is "out of the arch"
    const p = archPoint(th), n = archNormal(th), tg = [n[1] * sign, -n[0] * sign], c = [p[0] + n[0] * mid, p[1] + n[1] * mid], pts = [];
    for (let k = 1; k < 10; k++) { const f = (k / 10) * Math.PI, a = flip ? -Math.cos(f) : Math.cos(f); pts.push([c[0] + rr * (n[0] * a + tg[0] * Math.sin(f)), c[1] + rr * (n[1] * a + tg[1] * Math.sin(f))]); }
    return pts;
  };
  return [...outer, ...cap(end, 1, false), ...inner.reverse(), ...cap(-end, -1, true)];
}

function staticSvg() {
  const P = VIEW.P, out = [];
  const plate = plateRing(PLATE.x, PLATE.y, PLATE.w, PLATE.d, PLATE.r);
  out.push(`<path class="iso-halo" d="${slabL(plate, -17, 17).fill}"/>`);
  // feet
  const feet = [[-66, -30], [66, -30], [-66, 68], [66, 68]].sort((a, b) => depthOf([...W(a), 0], P) - depthOf([...W(b), 0], P));
  for (const f of feet) { const w = W(f); out.push(S(cylinder(w[0], w[1], 7, -17, 1.6, P, 24), { tone: "lo" }), S(cylinder(w[0], w[1], 5.4, -15.4, 3.4, P, 24), { tone: "mid" })); }
  out.push(S(slabL(plate, -12, 12, 0.8), { tone: "mid" }));
  out.push(Ln(onTop(plateRing(PLATE.x + 5, PLATE.y + 5, PLATE.w - 10, PLATE.d - 10, 5).map(W), 0, P, true), { tone: "lo" }));
  const screws = [[-72, -36], [72, -36], [-72, 72], [72, 72]];
  out.push(Ln(screws.map((c) => ringL(c, 2.2, 0, 16)).join(""), { tone: "lo" }), dotsL(screws, 0, { size: 0.5 }));
  // label plate (back left) with three rules
  out.push(S(slabL(plateRing(-20, -38, 40, 12, 1.5, 3), 0, 0.7, 0), { tone: "lo", crease: "none" }));
  out.push(Ln([-1, 0, 1].map((i) => onTop([[-16, -32 + i * 3], [-16 + (i === 1 ? 22 : 30), -32 + i * 3]].map(W), 0.7, P)).join(""), { tone: "lo", free: true }));
  // gum: moulded base lip, then the ridge the teeth stand on
  out.push(wrap("gum", S(extrude(gumRing(18.5, 15.5).map(W), 0, 2.2, P, { convex: false, bevel: 0.5 }), { tone: "lo" })));
  out.push(wrap("gum", S(extrude(gumRing(16.5, 13.5).map(W), 2.2, ZG - 2.2, P, { convex: false, bevel: 0.6 }), { tone: "mid", crease: "lo" })));
  // control rail: channel, two guide rails, end stops, ruler strip
  out.push(S(slabL(plateRing(-74, RAIL_W - 7, 148, 14, 3, 4), 0, 2, 0.4), { tone: "mid" }));
  for (const y of [RAIL_W - 4.6, RAIL_W + 2.2]) out.push(S(slabL(plateRing(-70, y, 140, 2.4, 0.8, 3), 2, 2.4, 0.3), { tone: "lo" }));
  for (const x of [-74, 68]) {
    out.push(S(slabL(plateRing(x, RAIL_W - 9, 6, 18, 1.4, 3), 0, 8, 0.5), { tone: "mid" }));
    out.push(dotsL([[x + 3, RAIL_W - 4], [x + 3, RAIL_W + 4]], 8, { size: 0.45 }));
  }
  out.push(S(slabL(plateRing(-74, RAIL_W + 12, 148, 8, 1.4, 3), 0, 0.7), { tone: "lo", crease: "none" }));
  const minor = [], major = [];
  for (let i = 0; i <= 20; i++) { const u = -46 + i * 4.6, big = i % 5 === 0; (big ? major : minor).push(onTop([[u, RAIL_W + 12.3], [u, RAIL_W + 12.3 + (big ? 2.7 : 1.7)]].map(W), 0.7, P)); }
  out.push(Ln(minor.join(""), { tone: "lo" }), Ln(major.join(""), { tone: "mid" }));
  out.push(dotsL([[-70, RAIL_W + 16.5], [70, RAIL_W + 16.5]], 0.7, { size: 0.4 }));
  return out.join("");
}

// the control: a carriage on the rail with a gold knurled knob; drawn at u = 0, moved with a translate
function carriageSvg() {
  const P = VIEW.P, out = [];
  const c = [0, RAIL_W - 1.2];
  out.push(`<path class="iso-halo" style="filter:blur(4px)" d="${slabL(plateRing(-10, RAIL_W - 8, 20, 14, 2.5, 4), 4.4, 0.1).fill}"/>`);
  out.push(S(slabL(plateRing(-11, RAIL_W - 8.5, 22, 15, 2.5, 4), 4.4, 4.2, 0.5), { tone: "mid" }));
  out.push(dotsL([[-7, RAIL_W - 6], [7, RAIL_W - 6], [-7, RAIL_W + 4], [7, RAIL_W + 4]], 8.6, { size: 0.4, tone: "lo" }));
  const kw = W(c);
  out.push(S(cylinder(kw[0], kw[1], 6, 8.6, 6, P, 28, 0.6), { tone: "lit", lit: true }));
  out.push(Ln(knurl(kw[0], kw[1], 6, 8.6, 14.6, 30, P, 0.1), { tone: "lo" }));
  out.push(Ln(onTop([c, [c[0] + 6, c[1]]].map(W), 14.6, P), { tone: "lit" }), dotsSvg([iso([kw[0], kw[1], 14.6], P)], { size: 0.5, tone: "hi" }));
  return out.join("");
}
const carriageTransform = (t) => { const d = STEP_U(Math.min(4, Math.max(0, t))); return translateAlong(VIEW.P, [VIEW.RT[0] * d, VIEW.RT[1] * d, 0]); };

function toothSvg(tooth, pose, st) {
  const P = VIEW.P, k = tooth.kind, out = [];
  const h1 = Math.round(k.h * 0.62 * 10) / 10, h2 = k.h - h1;
  const crown = frameRing(pose, -k.tw / 2, -k.td / 2, k.tw, k.td, k.r, 7);
  out.push(S(slabL(crown, ZG, h1, 0.4), { tone: "mid", crease: "lo" }));
  const cd = k.td - 2.6 - k.cap * 1.2, cw = k.tw - 2.6;
  out.push(S(slabL(frameRing(pose, -cw / 2, -cd / 2, cw, cd, Math.max(0.8, k.r - 1.3), 7), ZG + h1, h2, 0.5), { tone: "mid", crease: "lo" }));
  const zt = ZG + k.h;
  if (k.groove >= 1) out.push(Ln(onTop([framePoint(pose, -cw / 2, 0), framePoint(pose, cw / 2, 0)].map(W), zt, P), { tone: "lo" }));
  return wrap("tooth", out.join(""));
}

function bracketSvg(tooth, pose, land, tie) {
  const P = VIEW.P, k = tooth.kind, out = [];
  const lift = (1 - land) * 7, off = (1 - land) * 9;
  const p = { c: [pose.c[0] + pose.n[0] * off, pose.c[1] + pose.n[1] * off], T: pose.T, n: pose.n };
  const molar = k.name === "molar", bw = molar ? 9.4 : 6.6, bh = molar ? 5.4 : 5.2, z0 = ZS - 3.6 + lift, y0 = k.td / 2;
  out.push(S(slabL(frameRing(p, -bw / 2 - 0.9, y0 - 0.2, bw + 1.8, 1.2, 0.5, 3), z0, 7.2, 0.2), { tone: "mid", crease: "none" }));
  out.push(S(slabL(frameRing(p, -bw / 2, y0 + 1, bw, 2.2, 0.5, 3), ZS - bh / 2 + lift, bh, 0.25), { tone: "mid", crease: "lo" }));
  const a = framePoint(p, -bw / 2, y0 + 3.2), b = framePoint(p, bw / 2, y0 + 3.2);
  out.push(Ln(segment([...W(a), ZS + lift], [...W(b), ZS + lift], P), { tone: "hi" }));
  out.push(dotsSvg([iso([...W(a), ZS + lift], P), iso([...W(b), ZS + lift], P)], { size: 0.4, tone: "hi" }));
  if (!molar) out.push(dotsSvg([[-2.3, 2], [2.3, 2], [-2.3, -2], [2.3, -2]].map(([x, dz]) => { const q = W(framePoint(p, x, y0 + 3.2)); return iso([q[0], q[1], ZS + lift + dz], P); }), { size: 0.4, tone: "lo" }));
  let html = wrap("metal", out.join(""), land < 1 ? ` opacity="${Math.max(0, land).toFixed(2)}"` : "");
  if (tie > 0.02) {
    const tw = molar ? 0 : bw + 1.2, ring = frameRing(p, -tw / 2, y0 + 0.4, tw, 3.4, 1.3, 3);
    if (!molar) html += wrap("tie", S(slabL(ring, ZS - 1.4, 2.8, 0.25), { tone: "mid", crease: "none" }), tie < 1 ? ` opacity="${tie.toFixed(2)}"` : "");
  }
  return html;
}

// one wire piece: the samples of a segment, cut at the fed length
function wireD(samples, from, to, limit) {
  const pts = [];
  for (let i = from; i <= to && i < samples.length; i++) {
    const s = samples[i];
    if (s.len <= limit) pts.push(s.p);
    else { const q = samples[i - 1]; if (q && q.len < limit) { const f = (limit - q.len) / (s.len - q.len); pts.push([q.p[0] + (s.p[0] - q.p[0]) * f, q.p[1] + (s.p[1] - q.p[1]) * f]); } break; }
  }
  if (pts.length < 2) return "";
  return onTop(pts.map(W), ZS, VIEW.P);
}
const wireSvg2 = (d) => (d ? `<path class="wire-d" d="${d}"/><path class="wire-l" d="${d}"/>` : "");

function dynSvg(st) {
  const P = VIEW.P, items = [];
  const visible = (n) => n[0] * VIEW.look[0] + n[1] * VIEW.look[1] > 0.05;
  const wire = st.w > 0 ? wirePath(st.poses) : null;
  const limit = wire ? wire.total * st.w + (st.w >= 1 ? 1 : 0) : 0;
  TEETH.forEach((tooth, i) => {
    const pose = st.poses[i];
    let html = toothSvg(tooth, pose, st);
    if (st.land[i] > 0.01 && visible(pose.n)) html += bracketSvg(tooth, pose, st.land[i], wire ? Math.min(1, Math.max(0, (limit - wire.toothLen[i]) / 10)) : 0);
    const w3 = W(pose.c);
    items.push({ key: depthOf([w3[0], w3[1], ZG + 6], P), html, i });
  });
  if (wire) {
    // wire pieces: attach each to the nearer of the two teeth it joins, so it is painted with them
    const bySeg = new Map();
    wire.samples.forEach((s, idx) => { if (!bySeg.has(s.seg)) bySeg.set(s.seg, [idx, idx]); bySeg.get(s.seg)[1] = idx; });
    for (const [seg, [from, to]] of bySeg) {
      const a = Math.max(0, Math.min(TEETH.length - 1, seg)), b = Math.max(0, Math.min(TEETH.length - 1, seg + 1));
      const n = [(TEETH[a].n[0] + TEETH[b].n[0]) / 2, (TEETH[a].n[1] + TEETH[b].n[1]) / 2];
      if (!visible(n)) continue;
      const d = wireD(wire.samples, from, Math.min(wire.samples.length - 1, to + 1), limit);
      const owner = items[items[a].key > items[b].key ? a : b];
      owner.html += wireSvg2(d);
    }
  }
  const order = teethOrder(st, VIEW.look, (i) => items[i].key).map((i) => items[i]);
  return order.map((it) => it.html).join("");
}
