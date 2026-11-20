// @ts-nocheck
// Figure engine (Anatomy skill): trimmed kit + model + drawing, copied from docs/lienzo/anatomy/servicios (model.js, draw.js) on 2026-11-18.
// Plain JS on purpose: it is vendored, audited code (audit.mjs: no collisions, line ends 0). Do not hand-edit; regenerate from the lienzo folder.
// Service and step names live in model.js (SERVICES). Card texts live in src/content/figure.ts.
const AZIMUTH = 45;
const ELEVATION = 30;
const SHADES = 4;
const RADIANS = Math.PI / 180;
const UNIT = Math.sqrt(1.6);
function cameraOf({ scale, azimuth = AZIMUTH, elevation = ELEVATION }) {
    const a = azimuth * RADIANS;
    const e = elevation * RADIANS;
    return { sinA: Math.sin(a), cosA: Math.cos(a), sinE: Math.sin(e), cosE: Math.cos(e), k: scale * UNIT };
}
function iso([x, y, z], projection) {
    const { origin } = projection;
    const { sinA, cosA, sinE, cosE, k } = cameraOf(projection);
    return [origin[0] + (x * sinA - y * cosA) * k, origin[1] + ((x * cosA + y * sinA) * sinE - z * cosE) * k];
}
function towardViewer(projection) {
    const { sinA, cosA } = cameraOf(projection);
    return [cosA, sinA];
}
function depthOf([x, y, z], projection) {
    const { sinA, cosA, sinE, cosE } = cameraOf(projection);
    return (x * cosA + y * sinA) * cosE + z * sinE;
}
const tenth = (value) => {
    const text = (Math.round(value * 10) / 10).toFixed(1).replace(/\.0$/, "");
    return text === "-0" ? "0" : text;
};
function pathOf(points, closed = false) {
    if (!points.length)
        return "";
    return points.map(([x, y], at) => `${at ? "L" : "M"}${tenth(x)} ${tenth(y)}`).join("") + (closed ? "Z" : "");
}
function roundedPlan({ x, y, w, d, r }, steps = 8) {
    const radius = Math.max(0, Math.min(r, w / 2, d / 2));
    const corners = [
        [x + w - radius, y + radius, -90],
        [x + w - radius, y + d - radius, 0],
        [x + radius, y + d - radius, 90],
        [x + radius, y + radius, 180],
    ];
    const out = [];
    for (const [cx, cy, start] of corners) {
        const count = radius > 0 ? steps : 0;
        for (let step = 0; step <= count; step++) {
            const angle = (start + (count ? (90 * step) / count : 45)) * RADIANS;
            out.push([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]);
        }
    }
    return out;
}
function signedArea(points) {
    let area = 0;
    for (let index = 0; index < points.length; index++) {
        const [ax, ay] = points[index];
        const [bx, by] = points[(index + 1) % points.length];
        area += ax * by - bx * ay;
    }
    return area / 2;
}
const oriented = (points) => (signedArea(points) < 0 ? [...points].reverse() : points);
function convexHull(points) {
    const sorted = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    if (sorted.length < 3)
        return sorted;
    const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lower = [];
    for (const point of sorted) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0)
            lower.pop();
        lower.push(point);
    }
    const upper = [];
    for (let index = sorted.length - 1; index >= 0; index--) {
        const point = sorted[index];
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0)
            upper.pop();
        upper.push(point);
    }
    return [...lower.slice(0, -1), ...upper.slice(0, -1)];
}
function runsOf(flags, want) {
    const count = flags.length;
    const runs = [];
    const start = flags.findIndex((flag, index) => flag !== flags[(index + count - 1) % count]);
    if (start < 0)
        return flags[0] === want ? [Array.from({ length: count + 1 }, (_, index) => index % count)] : [];
    let run = null;
    for (let step = 0; step < count; step++) {
        const index = (start + step) % count;
        if (flags[index] === want) {
            if (!run)
                run = [index];
            run.push((index + 1) % count);
        }
        else if (run) {
            runs.push(run);
            run = null;
        }
    }
    if (run)
        runs.push(run);
    return runs;
}
function extrude(ring, z, height, projection, options = {}) {
    const convex = options.convex ?? true;
    const count = ring.length;
    const counter = signedArea(ring) > 0;
    const [vx, vy] = towardViewer(projection);
    const { sinA, cosA } = cameraOf(projection);
    const normals = ring.map(([ax, ay], index) => {
        const [bx, by] = ring[(index + 1) % count];
        const dx = bx - ax;
        const dy = by - ay;
        const length = Math.hypot(dx, dy) || 1;
        return (counter ? [dy / length, -dx / length] : [-dy / length, dx / length]);
    });
    const facing = normals.map(([nx, ny]) => nx * vx + ny * vy > 1e-9);
    const top = ring.map(([x, y]) => iso([x, y, z + height], projection));
    const bottom = ring.map(([x, y]) => iso([x, y, z], projection));
    const outline = [];
    const crease = [];
    for (const run of runsOf(facing, false))
        outline.push(pathOf(run.map((index) => top[index])));
    for (const run of runsOf(facing, true)) {
        crease.push(pathOf(run.map((index) => top[index])));
        if (height > 0)
            outline.push(pathOf(run.map((index) => bottom[index])));
    }
    if (height > 0) {
        for (let index = 0; index < count; index++) {
            if (facing[(index + count - 1) % count] !== facing[index])
                outline.push(pathOf([top[index], bottom[index]]));
        }
    }
    let fill;
    if (convex) {
        fill = pathOf(convexHull([...top, ...bottom]), true);
    }
    else {
        const parts = [pathOf(oriented(top), true), pathOf(oriented(bottom), true)];
        for (let index = 0; index < count; index++) {
            if (!facing[index])
                continue;
            const next = (index + 1) % count;
            parts.push(pathOf(oriented([top[index], top[next], bottom[next], bottom[index]]), true));
        }
        fill = parts.join("");
    }
    const buckets = Array.from({ length: SHADES }, () => []);
    if (height > 0) {
        const [lx, ly] = [-sinA, cosA];
        for (let index = 0; index < count; index++) {
            if (!facing[index])
                continue;
            const [nx, ny] = normals[index];
            const lit = (nx * lx + ny * ly + 1) / 2;
            const shade = Math.min(SHADES - 1, Math.max(0, Math.floor(lit * SHADES)));
            const next = (index + 1) % count;
            buckets[shade].push(pathOf(oriented([top[index], top[next], bottom[next], bottom[index]]), true));
        }
    }
    let bevel;
    if (options.bevel && options.bevel > 0) {
        const by = options.bevel;
        const inset = ring.map(([x, y], index) => {
            const [ax, ay] = normals[(index + count - 1) % count];
            const [bx, by2] = normals[index];
            const mx = ax + bx;
            const my = ay + by2;
            const length = Math.hypot(mx, my) || 1;
            return [x - (mx / length) * by, y - (my / length) * by];
        });
        const insetTop = inset.map(([x, y]) => iso([x, y, z + height], projection));
        bevel = runsOf(facing, true)
            .map((run) => pathOf([top[run[0]], ...run.slice(1, -1).map((index) => insetTop[index]), top[run[run.length - 1]]]))
            .join("");
    }
    return {
        fill,
        outline: outline.join(""),
        crease: crease.join(""),
        top: pathOf(oriented(top), true),
        shades: buckets.map((paths) => paths.join("")),
        bevel,
    };
}
function circleRing(cx, cy, radius, steps = 40) {
    return Array.from({ length: steps }, (_, step) => {
        const angle = (step / steps) * Math.PI * 2;
        return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)];
    });
}
function cylinder(cx, cy, radius, z, height, projection, steps = 32, bevel = 0) {
    return extrude(circleRing(cx, cy, radius, steps), z, height, projection, { convex: true, bevel });
}
function onTop(points, z, projection, closed = false) {
    return pathOf(points.map(([x, y]) => iso([x, y, z], projection)), closed);
}
const segment = (from, to, projection) => pathOf([iso(from, projection), iso(to, projection)]);
function knurl(cx, cy, radius, z0, z1, count, projection, inset = 0.4) {
    const [vx, vy] = towardViewer(projection);
    const lines = [];
    for (let index = 0; index < count; index++) {
        const angle = (index / count) * Math.PI * 2;
        const nx = Math.cos(angle);
        const ny = Math.sin(angle);
        if (nx * vx + ny * vy < 0.15)
            continue;
        lines.push(segment([cx + radius * nx, cy + radius * ny, z0 + inset], [cx + radius * nx, cy + radius * ny, z1 - inset], projection));
    }
    return lines.join("");
}
function sideArc(cx, cy, radius, z, projection, steps = 24) {
    const [vx, vy] = towardViewer(projection);
    const facing = Math.atan2(vy, vx);
    const points = [];
    for (let step = 0; step <= steps; step++) {
        const angle = facing - Math.PI / 2 + (step / steps) * Math.PI;
        points.push(iso([cx + radius * Math.cos(angle), cy + radius * Math.sin(angle), z], projection));
    }
    return pathOf(points);
}
function axisVector(projection, [dx, dy, dz]) {
    const origin = iso([0, 0, 0], projection);
    const moved = iso([dx, dy, dz], projection);
    return [moved[0] - origin[0], moved[1] - origin[1]];
}
const fine = (value) => Math.round(value * 100) / 100;
function translateAlong(projection, by) {
    const [x, y] = axisVector(projection, by);
    return `translate(${fine(x)} ${fine(y)})`;
}
function fitProjection(points, width, height, { pad = 24, headroom = 0, azimuth = AZIMUTH, elevation = ELEVATION } = {}) {
    const unit = { origin: [0, 0], scale: 1, azimuth, elevation };
    const flat = points.map((point) => iso(point, unit));
    const xs = flat.map(([x]) => x);
    const ys = flat.map(([, y]) => y);
    const left = Math.min(...xs);
    const right = Math.max(...xs);
    const up = Math.min(...ys);
    const down = Math.max(...ys);
    const scale = Math.min((width - pad * 2) / (right - left), (height - pad * 2 - headroom) / (down - up));
    return {
        origin: [width / 2 - ((left + right) / 2) * scale, headroom + (height - headroom) / 2 - ((up + down) / 2) * scale],
        scale,
        azimuth,
        elevation,
    };
}
const escape = (text) => text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const attrs = (pairs) => Object.entries(pairs)
    .filter(([, value]) => value !== undefined && value !== false)
    .map(([key, value]) => ` ${key}="${escape(String(value))}"`)
    .join("");
function solidSvg(paths, { tone = "hi", crease = "faint", halo = false, lit = false, flat = false, className, inner = "" } = {}) {
    const parts = [];
    if (halo)
        parts.push(`<path class="iso-halo" d="${paths.fill}"/>`);
    parts.push(`<path class="iso-fill" d="${paths.fill}"/>`);
    if (!flat) {
        paths.shades.forEach((d, shade) => {
            if (d)
                parts.push(`<path class="iso-shade" data-shade="${shade}" d="${d}"/>`);
        });
        parts.push(`<path class="iso-top" d="${paths.top}"/>`);
    }
    if (crease !== "none" && paths.crease)
        parts.push(`<path class="iso-line iso-crease" data-tone="${crease}" d="${paths.crease}"/>`);
    if (crease !== "none" && paths.bevel)
        parts.push(`<path class="iso-line iso-bevel" data-tone="${crease}" d="${paths.bevel}"/>`);
    if (inner)
        parts.push(inner);
    parts.push(`<path class="iso-line iso-edge" data-tone="${tone}" d="${paths.outline}"/>`);
    return `<g${attrs({ class: className ? `iso-solid ${className}` : "iso-solid", "data-lit": lit ? "" : undefined, "data-seamless": paths.seamless ? "" : undefined })}>${parts.join("")}</g>`;
}
function lineSvg(d, { tone = "lo", dotted = false, dashed = false, flow = false, className, free } = {}) {
    if (!d)
        return "";
    return `<path${attrs({
        class: className ? `iso-line ${className}` : "iso-line",
        "data-tone": tone,
        "data-free": free === true ? "" : free || undefined,
        "data-dotted": dotted ? "" : undefined,
        "data-dashed": dashed ? "" : undefined,
        "data-flow": flow ? "" : undefined,
        d,
    })}/>`;
}
function dotsSvg(points, { size = 0.5, tone = "mid", pulse = false } = {}) {
    const dots = points
        .map(([x, y, alpha], index) => `<circle cx="${tenth(x)}" cy="${tenth(y)}" r="${size}"${alpha !== undefined && alpha < 1 ? ` fill-opacity="${Math.max(0, alpha).toFixed(2)}"` : ""}${pulse ? ` data-pulse="" style="--pulse-at:${(index * 137) % 1600}ms"` : ""}/>`)
        .join("");
    return `<g class="iso-dots" data-tone="${tone}">${dots}</g>`;
}
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
  return { id: "braces", max: 4, t, a, w, m, step, moves, land, poses };
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

// ---- the five services share the same teeth, gum and base; only the part that is being treated changes
const SERVICES = [
  { id: "braces", tab: "Braces & Invisalign", steps: STEPS },
  { id: "implants", tab: "Dental implants", steps: ["Missing tooth", "Post placed in the jaw", "Abutment attached", "Crown placed"] },
  { id: "bridges", tab: "Dentures & bridges", steps: ["Missing tooth", "Support teeth shaped", "Bridge set in place"] },
  { id: "crowns", tab: "Veneers & crowns", steps: ["Natural tooth", "Tooth shaped", "Crown made", "Crown seated"] },
  { id: "whitening", tab: "Teeth whitening", steps: ["Natural shade", "Gel applied", "Shade begins to lighten", "Gel removed"] },
];
const ALIGNED = TEETH.map((tooth) => poseOf(tooth, 1));
const IMPLANT = 9, BRIDGE = [6, 7, 8], CROWN = 5;
function sceneState(svc, t) {
  const sv = SERVICES[svc], max = sv.steps.length - 1;
  t = Math.min(max, Math.max(0, t));
  if (sv.id === "braces") return stateOf(t);
  const e = (x) => ease(clamp01(x));
  const st = { id: sv.id, max, t, step: Math.round(t), poses: ALIGNED };
  if (sv.id === "implants") Object.assign(st, { post: e(t), abut: e(t - 1), crown: e(t - 2) });
  if (sv.id === "bridges") Object.assign(st, { prep: e(t), show: e((t - 1) * 2), seat: e(t - 1) });
  if (sv.id === "crowns") Object.assign(st, { prep: e(t), show: e(t - 1), seat: e(t - 2) });
  if (sv.id === "whitening") Object.assign(st, { gel: e(t) * (1 - e(t - 2)), shade: e((t - 1.2) / 1.8) });
  return st;
}

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
const S = (paths, style) => solidSvg(paths, style);
const Ln = (d, style) => lineSvg(d, style);
const dotsL = (pts, z, style) => dotsSvg(pts.map((p) => { const w = W(p); return iso([w[0], w[1], z], VIEW.P); }), style);
const ringL = (c, r, z, steps = 28) => onTop(circleRing(0, 0, r, steps).map(([x, y]) => W([c[0] + x, c[1] + y])), z, VIEW.P, true);
const wrap = (cls, inner, extra = "") => `<g class="${cls}"${extra}>${inner}</g>`;
const PLATE = { x: -80, y: -42, w: 160, d: 126, r: 9 };
const RAIL_W = 56; // the control rail runs along u at this w
const STEP_U = (i, max = 4) => -46 + (92 * i) / max;

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

// Card variant (service pages): the model on its tabletop base with the control rail, as in B4/B5.
function cardStaticSvg() {
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
  out.push(dotsL([[-70, RAIL_W + 16.5], [70, RAIL_W + 16.5]], 0.7, { size: 0.4 }));
  return out.join("");
}


// A small clear tray (like a preview of an acrylic mold) that floats; the gum sits in it. No tabletop, no rail.
function staticSvg() {
  const P = VIEW.P, out = [];
  out.push(wrap("tray", S(extrude(gumRing(25, 22).map(W), -6, 6, P, { convex: false, bevel: 0.8 }), { tone: "hi", crease: "mid" })));
  out.push(Ln(onTop(gumRing(22, 19).map(W), 0, P, true), { tone: "mid" }));
  // gum: moulded base lip, then the ridge the teeth stand on
  out.push(wrap("gum", S(extrude(gumRing(18.5, 15.5).map(W), 0, 2.2, P, { convex: false, bevel: 0.5 }), { tone: "lo" })));
  out.push(wrap("gum", S(extrude(gumRing(16.5, 13.5).map(W), 2.2, ZG - 2.2, P, { convex: false, bevel: 0.6 }), { tone: "mid", crease: "lo" })));
  return out.join("");
}
// soft shadow far below the tray, so it reads as floating
function floatShadowSvg() {
  return `<path class="brk-shadow" d="${onTop(gumRing(23, 20).map(W), -30, VIEW.P, true)}"/>`;
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
const carriageTransform = (t, max = 4) => { const d = STEP_U(Math.min(max, Math.max(0, t)), max); return translateAlong(VIEW.P, [VIEW.RT[0] * d, VIEW.RT[1] * d, 0]); };

// palettes (paper, top, shade 0..3) so a tooth can shift tone: natural, shaped (prepared) tooth, yellowed, light
const PAL = { natural: ["#e6e0d1", "#faf6ea", "#aaa593", "#c1bca9", "#d6d0be", "#e9e3d3"], prep: ["#cdb48a", "#e0cba2", "#9a8560", "#ae9870", "#bfa97e", "#cdb48a"], yellow: ["#d8c070", "#ecd98f", "#a28c4a", "#b89f58", "#cdb264", "#dcc272"], light: ["#f2f0e9", "#ffffff", "#c4c1b6", "#d9d6cb", "#e8e5db", "#f4f2ea"] };
const hex = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
const mixPal = (A, B, x) => A.map((c, i) => { const p = hex(c), q = hex(B[i]); return "#" + [0, 1, 2].map((k) => Math.round(p[k] + (q[k] - p[k]) * x).toString(16).padStart(2, "0")).join(""); });
const palStyle = (p) => `--anatomy-paper:${p[0]};--anatomy-top:${p[1]};--anatomy-shade-0:${p[2]};--anatomy-shade-1:${p[3]};--anatomy-shade-2:${p[4]};--anatomy-shade-3:${p[5]}`;
// o: trim (0..1 shaped down), lift (z), grow (wider), alpha, pal (palette), gel (0..1 coat)
function toothSvg(tooth, pose, o = {}) {
  const P = VIEW.P, k = tooth.kind, out = [], trim = o.trim || 0, lift = o.lift || 0;
  const tw = (k.tw + (o.grow || 0)) * (1 - 0.26 * trim), td = (k.td + (o.grow || 0)) * (1 - 0.26 * trim), H = k.h * (1 - 0.3 * trim), z0 = ZG + lift;
  const h1 = Math.round(H * 0.62 * 10) / 10, h2 = H - h1;
  out.push(S(slabL(frameRing(pose, -tw / 2, -td / 2, tw, td, k.r, 7), z0, h1, 0.4), { tone: "mid", crease: "lo" }));
  const cd = td - 2.6 - k.cap * 1.2, cw = tw - 2.6;
  out.push(S(slabL(frameRing(pose, -cw / 2, -cd / 2, cw, cd, Math.max(0.8, k.r - 1.3), 7), z0 + h1, h2, 0.5), { tone: "mid", crease: "lo" }));
  if (k.groove >= 1) out.push(Ln(onTop([framePoint(pose, -cw / 2, 0), framePoint(pose, cw / 2, 0)].map(W), z0 + H, P), { tone: "lo" }));
  let html = wrap("tooth", out.join(""), (o.alpha !== undefined && o.alpha < 1 ? ` opacity="${Math.max(0, o.alpha).toFixed(2)}"` : "") + (o.pal ? ` style="${palStyle(o.pal)}"` : ""));
  if (o.gel > 0.02) html += wrap("tie", S(slabL(frameRing(pose, -tw / 2 - 0.15, -td / 2 - 0.15, tw + 0.3, td + 0.3, k.r + 0.15, 7), ZG, H + 0.5, 0.3), { tone: "mid", crease: "none" }), ` opacity="${(o.gel * 0.4).toFixed(2)}"`);
  return html;
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

const alphaOf = (v) => (v < 1 ? ` opacity="${v.toFixed(2)}"` : "");
// implant: socket in the gum, titanium post, abutment, porcelain crown, each one landing in turn
function implantSvg(tooth, pose, st) {
  const P = VIEW.P, c = W(pose.c), out = [];
  out.push(wrap("socket", S(slabL(frameRing(pose, -3.6, -3.6, 7.2, 7.2, 3.6, 8), ZG - 0.2, 0.3, 0), { tone: "lo", crease: "none" })));
  if (st.post > 0.01) {
    const z = ZG + (1 - st.post) * 16;
    out.push(wrap("metal", S(cylinder(c[0], c[1], 3.3, z, 4.6, P, 20, 0.3), { tone: "mid" }) + Ln(sideArc(c[0], c[1], 3.3, z + 1.5, P, 12) + sideArc(c[0], c[1], 3.3, z + 3, P, 12), { tone: "lo" }), alphaOf(st.post)));
    if (st.post > 0.98) out.push(Ln(ringL(pose.c, 4.8, ZG + 0.05, 24), { tone: "mid" }));
  }
  if (st.abut > 0.01) out.push(wrap("metal", S(cylinder(c[0], c[1], 2.3, ZG + 4.6 + (1 - st.abut) * 14, 5.2, P, 18, 0.3), { tone: "mid" }), alphaOf(st.abut)));
  if (st.crown > 0.01) out.push(toothSvg(tooth, pose, { lift: (1 - st.crown) * 22, alpha: st.crown }));
  return out.join("");
}
// a shaped (prepared) tooth: smaller and a little darker, then the porcelain crown comes down over it
function crownOver(tooth, pose, prep, show, seat, grow) {
  const stump = toothSvg(tooth, pose, { trim: prep, pal: mixPal(PAL.natural, PAL.prep, prep) });
  return show > 0.01 ? stump + toothSvg(tooth, pose, { lift: (1 - seat) * 24, alpha: show, grow }) : stump;
}

function dynSvg(st) {
  const P = VIEW.P, items = [];
  const visible = (n) => n[0] * VIEW.look[0] + n[1] * VIEW.look[1] > 0.05;
  const braces = st.id === "braces", wire = braces && st.w > 0 ? wirePath(st.poses) : null;
  const limit = wire ? wire.total * st.w + (st.w >= 1 ? 1 : 0) : 0;
  const light = st.id === "whitening" ? mixPal(PAL.yellow, PAL.light, st.shade) : null;
  TEETH.forEach((tooth, i) => {
    const pose = st.poses[i];
    let html;
    if (st.id === "implants" && i === IMPLANT) html = implantSvg(tooth, pose, st);
    else if (st.id === "bridges" && BRIDGE.includes(i)) {
      const gap = i === BRIDGE[1];
      html = gap ? wrap("socket", S(slabL(frameRing(pose, -3.8, -3.8, 7.6, 7.6, 3.8, 8), ZG - 0.2, 0.3, 0), { tone: "lo", crease: "none" })) + (st.show > 0.01 ? toothSvg(tooth, pose, { lift: (1 - st.seat) * 24, alpha: st.show, grow: 0.4 }) : "") : crownOver(tooth, pose, st.prep, st.show, st.seat, 0.4);
    } else if (st.id === "crowns" && i === CROWN) html = crownOver(tooth, pose, st.prep, st.show, st.seat, 0);
    else if (st.id === "whitening") html = toothSvg(tooth, pose, { pal: light, gel: st.gel });
    else html = toothSvg(tooth, pose);
    if (braces && st.land[i] > 0.01 && visible(pose.n)) html += bracketSvg(tooth, pose, st.land[i], wire ? Math.min(1, Math.max(0, (limit - wire.toothLen[i]) / 10)) : 0);
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
      const dd = wireD(wire.samples, from, Math.min(wire.samples.length - 1, to + 1), limit);
      const owner = items[items[a].key > items[b].key ? a : b];
      owner.html += wireSvg2(dd);
    }
  }
  const order = teethOrder(st, VIEW.look, (i) => items[i].key).map((i) => items[i]);
  return order.map((it) => it.html).join("");
}

// ruler marks for a service with `max` + 1 steps: a long mark at each step, three short ones between
function rulerSvg(max) {
  const P = VIEW.P, minor = [], major = [], n = max * 4;
  for (let i = 0; i <= n; i++) { const u = -46 + (92 * i) / n, big = i % 4 === 0; (big ? major : minor).push(onTop([[u, RAIL_W + 12.3], [u, RAIL_W + 12.3 + (big ? 2.7 : 1.7)]].map(W), 0.7, P)); }
  return Ln(minor.join(""), { tone: "lo" }) + Ln(major.join(""), { tone: "mid" });
}

export { SERVICES, iso, fitProjection, setView, staticSvg, cardStaticSvg, floatShadowSvg, carriageSvg, carriageTransform, rulerSvg, dynSvg, sceneState, W, STEP_U, RAIL_W };
