// @ts-nocheck
// Motor de la figura (skill Anatomy): kit recortado + modelo + dibujo, copiado de docs/lienzo/anatomy/servicios (model.js, draw.js) el 2026-11-18.
// 2026-11-25: YA NO SE REGENERA desde docs/lienzo/anatomy/servicios. Se reescribió aquí el dibujo de molde, encía, dientes, collar de encía, gel y brackets
// (sólidos con luz y color por faceta, coronas lofteadas con cúspides y brillo) y la caída con asentamiento de cada pieza. El kit de arriba (iso, extrude, etc.) y el
// modelo (poses, alambre, orden del pintor) siguen igual que en el lienzo; en la ronda 2 (25-nov) se rehízo también el arco (curva en U) y las medidas de los dientes. Si se vuelve a copiar desde el lienzo se pierde este cambio.
// Los nombres de servicios y pasos están en model.js (SERVICES). Los textos de la tarjeta están en src/content/figure.ts.
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
// Figura de brackets: el modelo. JS plano (sin imports) para que el mismo texto corra en el build, la auditoría y la página.
// Marco local: u = hacia la derecha, w = hacia el espectador (frente del arco). Unidades ~ 1 px del modelo real.
const STEPS = ["Crooked teeth", "Brackets bonded", "Archwire threaded in", "Teeth start to move", "Teeth move into line"];
const ZG = 7;            // parte alta del reborde de la encía (aquí se apoyan los dientes)
const ZS = 14;           // altura de la ranura del bracket, igual en todos los dientes
// Ronda 2 (25-nov): arco en U real (curvatura que sube y baja con suavidad: incisivos casi rectos, esquina en los caninos, molares casi paralelos),
// medidas de un modelo de estudio (central más ancho que lateral, molar el mayor) y dientes casi en contacto. Referencia: ver docs/bitacora.md.
const GS = 1.3; // escala de todos los dientes respecto de las medidas base
const kind = (name, tw, td, h, r, groove, gap = 0.7) => ({ name, slot: (tw + gap) * GS, tw: tw * GS, td: td * GS, h: h * GS, r: r * GS, cap: 0, groove });
// ancho (mesiodistal), profundidad (vestíbulo-lingual), altura de corona, radio de esquina, surco  (orden desde la línea media hacia afuera)
const KINDS = [
  kind("central", 11.6, 8.4, 15.5, 2.2, 0),
  kind("lateral", 9.2, 7.8, 14, 2.2, 0),
  kind("canine", 10, 9.6, 16.5, 3.6, 0),
  kind("premolar 1", 9.6, 10.8, 12.5, 4.2, 1),
  kind("premolar 2", 9.6, 10.8, 12, 4.2, 1),
  kind("molar", 13.5, 13.5, 11.5, 5, 1),
];
const ARCH = { front: 30, turn: 1.5 }; // w del frente del arco y giro total (rad, ~86°) de la línea del arco hasta los molares
const REACH = 0.4 + KINDS.reduce((s, k) => s + k.slot, 0);
// inicio chueco: [a lo largo del arco, hacia afuera del arco, giro en grados], una fila por tipo, por lado
const CROOK = {
  "-1": [[0, 1.5, 18], [0, -5.5, -8], [-0.5, 5.5, 12], [0, 0, -7], [0, 1.5, 0], [0, 0, 0]],
  "1": [[0, -2, -10], [0, 3.5, 14], [0, -4.5, -12], [0, 0, 5], [0, 1.5, 0], [0, 0, 0]],
};
const headingAt = (s) => { const u = Math.min(1, s / (REACH * 0.6)); return ARCH.turn * u * u * (3 - 2 * u); }; // curvatura 0 al frente, máxima hacia los caninos, 0 atrás
const ARCH_DS = 0.25;
const ARCH_TAB = (() => {
  const n = Math.ceil((REACH + 12) / ARCH_DS), xs = [0], ys = [0];
  let x = 0, y = 0;
  for (let i = 0; i < n; i++) { const phi = headingAt((i + 0.5) * ARCH_DS); x += Math.cos(phi) * ARCH_DS; y += Math.sin(phi) * ARCH_DS; xs.push(x); ys.push(y); }
  return { xs, ys };
})();
// theta es la longitud de arco con signo desde la línea media (negativa = lado izquierdo)
function archPoint(theta) {
  const f = Math.abs(theta) / ARCH_DS, i = Math.floor(f), r = f - i, { xs, ys } = ARCH_TAB;
  return [Math.sign(theta) * (xs[i] + (xs[i + 1] - xs[i]) * r), ARCH.front - (ys[i] + (ys[i + 1] - ys[i]) * r)];
}
function archNormal(theta) { const phi = headingAt(Math.abs(theta)); return [(theta < 0 ? -1 : 1) * Math.sin(phi), Math.cos(phi)]; }
const thetaAtLength = (s) => s;
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
  // orden molar izquierdo -> molar derecho
  teeth.sort((p, q) => p.c[0] - q.c[0]);
  teeth.forEach((tooth, o) => { tooth.o = o; });
  return teeth;
}
const TEETH = buildTeeth();
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const ease = (x) => { x = clamp01(x); return x * x * (3 - 2 * x); };
// todo el estado sale de un solo número t (0..4): el control que mueve el visitante
function stateOf(t, dir) {
  const a = clamp01(t);                 // los brackets caen (avance lineal: la curva de caída la pone fall())
  const w = ease(clamp01(t - 1));       // el arco de alambre se enhebra
  const m = clamp01((t - 2) / 2);       // los dientes se mueven
  const step = Math.min(4, Math.max(0, Math.round(t)));
  const moves = TEETH.map((tooth) => ease(m * 1.35 - 0.35 * ((tooth.k % 3) / 2 + (tooth.side > 0 ? 0.15 : 0))));
  const land = TEETH.map((tooth) => clamp01(a * 1.7 - 0.7 * (tooth.o / 11)));
  const poses = TEETH.map((tooth, i) => poseOf(tooth, moves[i]));
  return { id: "braces", max: 4, t, a, w, m, step, moves, land, poses, dir };
}
function poseOf(tooth, q) {
  const k = 1 - q;
  const c = [tooth.c[0] + k * (tooth.du * tooth.T[0] + tooth.dn * tooth.n[0]), tooth.c[1] + k * (tooth.du * tooth.T[1] + tooth.dn * tooth.n[1])];
  const ang = (k * tooth.rot * Math.PI) / 180, cs = Math.cos(ang), sn = Math.sin(ang);
  const rot = (v) => [v[0] * cs - v[1] * sn, v[0] * sn + v[1] * cs];
  return { c, T: rot(tooth.T), n: rot(tooth.n) };
}
// planta de un rectángulo redondeado en el marco propio del diente, devuelta como puntos locales (u,w)
function frameRing(pose, x0, y0, w, d, r, steps) {
  return roundedPlan({ x: x0, y: y0, w, d, r }, steps).map(([x, y]) => [pose.c[0] + x * pose.T[0] + y * pose.n[0], pose.c[1] + x * pose.T[1] + y * pose.n[1]]);
}
function framePoint(pose, x, y) { return [pose.c[0] + x * pose.T[0] + y * pose.n[0], pose.c[1] + x * pose.T[1] + y * pose.n[1]]; }
// dónde se apoya el alambre en un diente (en la ranura, delante del bracket), en coordenadas locales
function slotPoint(tooth, pose) { return framePoint(pose, 0, tooth.kind.td / 2 + 4); }
// alambre suave por las ranuras (Catmull-Rom), luego cortado a la longitud alimentada
function wirePath(poses) {
  const pts = TEETH.map((tooth, i) => slotPoint(tooth, poses[i]));
  const head = pts[0], tail = pts[pts.length - 1];
  const dir = (a, b) => { const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1; return [(b[0] - a[0]) / l, (b[1] - a[1]) / l]; };
  const d0 = dir(pts[1], head), d1 = dir(pts[pts.length - 2], tail);
  const all = [[head[0] + d0[0] * 6, head[1] + d0[1] * 6], ...pts, [tail[0] + d1[0] * 6, tail[1] + d1[1] * 6]];
  const at = (i) => all[Math.max(0, Math.min(all.length - 1, i))];
  const out = []; // {p:[u,w], gap:int (0..10 entre el diente gap y gap+1, -1 cabeza, 11 cola), len}
  let len = 0; const toothLen = [];
  for (let i = 0; i < all.length - 1; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    for (let s = 0; s < 6; s++) {
      const u = s / 6, u2 = u * u, u3 = u2 * u;
      const p = [0, 1].map((j) => 0.5 * (2 * p1[j] + (-p0[j] + p2[j]) * u + (2 * p0[j] - 5 * p1[j] + 4 * p2[j] - p3[j]) * u2 + (-p0[j] + 3 * p1[j] - 3 * p2[j] + p3[j]) * u3));
      if (s === 0 && i >= 1 && i <= TEETH.length) toothLen[i - 1] = len + (out.length ? Math.hypot(p[0] - out[out.length - 1].p[0], p[1] - out[out.length - 1].p[1]) : 0);
      if (out.length) len += Math.hypot(p[0] - out[out.length - 1].p[0], p[1] - out[out.length - 1].p[1]);
      out.push({ p, seg: i - 1, len }); // seg: -1 tramo de cabeza, 0..10 huecos entre dientes, 11 tramo de cola
    }
  }
  const last = all[all.length - 1];
  len += Math.hypot(last[0] - out[out.length - 1].p[0], last[1] - out[out.length - 1].p[1]);
  out.push({ p: last, seg: 11, len });
  return { samples: out, total: len, toothLen };
}
// Orden del pintor para los dientes: en cada par, el plano que separa sus huellas dice cuál está más cerca del espectador
// (look = dirección del espectador en el marco local); un orden topológico sobre esos pares, y la profundidad del centro solo desempata.
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
    const iNearer = best.iLow ? d < 0 : d > 0; // el más cercano se dibuja después
    const [far, near] = iNearer ? [j, i] : [i, j];
    after[far].push(near); need[near]++;
  }
  const out = [], ready = []; for (let i = 0; i < n; i++) if (!need[i]) ready.push(i);
  while (ready.length) { ready.sort((a, b) => key(a) - key(b)); const i = ready.shift(); out.push(i); for (const j of after[i]) if (!--need[j]) ready.push(j); }
  if (out.length < n) for (let i = 0; i < n; i++) if (!out.includes(i)) out.push(i); // no puede haber un ciclo con huellas convexas disjuntas
  return out;
}

// ---- los cinco servicios comparten los mismos dientes, encía y base; solo cambia la parte que se trata
const SERVICES = [
  { id: "braces", tab: "Braces & Invisalign", steps: STEPS },
  { id: "implants", tab: "Dental implants", steps: ["Missing tooth", "Post placed in the jaw", "Abutment attached", "Crown placed"] },
  { id: "bridges", tab: "Dentures & bridges", steps: ["Missing tooth", "Support teeth shaped", "Bridge set in place"] },
  { id: "crowns", tab: "Veneers & crowns", steps: ["Natural tooth", "Tooth shaped", "Crown made", "Crown seated"] },
  { id: "whitening", tab: "Teeth whitening", steps: ["Natural shade", "Gel applied", "Shade begins to lighten", "Gel removed"] },
];
const ALIGNED = TEETH.map((tooth) => poseOf(tooth, 1));
const IMPLANT = 9, BRIDGE = [6, 7, 8], CROWN = 5;
function sceneState(svc, t, dir = 1) {
  const sv = SERVICES[svc], max = sv.steps.length - 1;
  t = Math.min(max, Math.max(0, t));
  if (sv.id === "braces") return stateOf(t, dir);
  const e = (x) => ease(clamp01(x));
  const st = { id: sv.id, max, t, step: Math.round(t), poses: ALIGNED, dir };
  // los avances de lo que cae son lineales (clamp01); fall() les da la aceleración y el asentamiento
  if (sv.id === "implants") Object.assign(st, { post: clamp01(t), abut: clamp01(t - 1), crown: clamp01(t - 2) });
  if (sv.id === "bridges") Object.assign(st, { prep: e(t), seat: clamp01(t - 1) });
  if (sv.id === "crowns") Object.assign(st, { prep: e(t), show: clamp01(t - 1), seat: clamp01(t - 2) });
  if (sv.id === "whitening") Object.assign(st, { gelIn: clamp01(t), gelOut: clamp01(t - 2), shade: e((t - 1.2) / 1.8) });
  return st;
}

// Figura de brackets: dibujo. Usa las funciones del kit Anatomy y model.js (todo en el mismo ámbito).
const YAW = 14;
let VIEW = null;
function setScope(s) { SCOPE = s; }
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
const RAIL_W = 56; // el riel de control corre a lo largo de u en este w
const STEP_U = (i, max = 4) => -46 + (92 * i) / max;

function gumRing(offOut, offIn) {
  const end = thetaAtLength(0.4 + KINDS.reduce((s, k) => s + k.slot, 0) - 6);
  const outer = [], inner = [], N = 40, mid = (offOut - offIn) / 2, rr = (offOut + offIn) / 2;
  for (let i = 0; i <= N; i++) {
    const th = -end + (2 * end * i) / N, p = archPoint(th), n = archNormal(th);
    outer.push([p[0] + n[0] * offOut, p[1] + n[1] * offOut]);
    inner.push([p[0] - n[0] * offIn, p[1] - n[1] * offIn]);
  }
  const cap = (th, sign, flip) => { // semicírculo que cierra un extremo; sign = hacia dónde queda «fuera del arco»
    const p = archPoint(th), n = archNormal(th), tg = [n[1] * sign, -n[0] * sign], c = [p[0] + n[0] * mid, p[1] + n[1] * mid], pts = [];
    for (let k = 1; k < 10; k++) { const f = (k / 10) * Math.PI, a = flip ? -Math.cos(f) : Math.cos(f); pts.push([c[0] + rr * (n[0] * a + tg[0] * Math.sin(f)), c[1] + rr * (n[1] * a + tg[1] * Math.sin(f))]); }
    return pts;
  };
  return [...outer, ...cap(end, 1, false), ...inner.reverse(), ...cap(-end, -1, true)];
}

// ---- 25-nov-2026 · sólidos con volumen: luz única, color por faceta, caída con asentamiento
let SCOPE = "f"; // prefijo de los id de degradados: cada figura de la página tiene el suyo (un degradado dentro de un svg oculto no lo ven los demás)
const LAMP = [-0.353, 0.505, 0.788]; // la luz, en el mundo: (derecha de la cámara, hacia el espectador, arriba); llega de arriba a la izquierda y al frente
const hexOf = (rgb) => "#" + rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
const mixHexC = (a, b, x) => { const p = hex(a), q = hex(b); return hexOf([0, 1, 2].map((k) => p[k] + (q[k] - p[k]) * x)); };
const rampAt = (stops, s) => { const n = stops.length - 1, f = Math.min(n - 1e-9, Math.max(0, s * n)), i = Math.floor(f); return mixHexC(stops[i], stops[i + 1], f - i); };
function lamOf(nx, ny, nz) { const { sinA, cosA } = cameraOf(VIEW.P); return (nx * sinA - ny * cosA) * LAMP[0] + (nx * cosA + ny * sinA) * LAMP[1] + nz * LAMP[2]; }
const toneOf = (lam) => clamp01(0.2 + lam);
// la luz sobre un cilindro visto de frente, de izquierda a derecha de su silueta: un degradado horizontal por paleta
function cylGradient(id, ramp) {
  const stops = [];
  for (let k = 0; k <= 8; k++) { const nr = -1 + k / 4, nt = Math.sqrt(Math.max(0, 1 - nr * nr)); stops.push(`<stop offset="${k / 8}" stop-color="${rampAt(ramp, toneOf(nr * LAMP[0] + nt * LAMP[1]))}"/>`); }
  return `<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="0">${stops.join("")}</linearGradient>`;
}
const GR = new Map(); // degradados de paleta del cuadro que se dibuja: clave -> { id, pal }
function gradFor(pal) { const key = pal.join(""); if (!GR.has(key)) GR.set(key, { id: `${SCOPE}-p${GR.size}`, pal }); return GR.get(key).id; }
const palRamp = (p) => [p[2], p[3], p[4], p[5], p[1]];
const GUM_PAL = ["#b9677a", "#e9a2ad", "#6f3144", "#9a4d62", "#bb6d80", "#d6899a"]; // papel, tapa, sombras 0..3 de la encía
function dynDefs() {
  const s = SCOPE;
  return `<defs><linearGradient id="${s}-ao" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b9def5" stop-opacity=".18"/><stop offset=".2" stop-color="#b9def5" stop-opacity="0"/><stop offset=".58" stop-color="#2a1a14" stop-opacity="0"/><stop offset="1" stop-color="#2a1a14" stop-opacity=".36"/></linearGradient>`
    + `<radialGradient id="${s}-gl"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".55" stop-color="#fff" stop-opacity=".28"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`
    + `<radialGradient id="${s}-dm" cx=".38" cy=".32" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#3b2e1c" stop-opacity=".5"/></radialGradient>`
    + `<radialGradient id="${s}-cu"><stop offset="0" stop-color="#fff" stop-opacity=".62"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`
    + [...GR.values()].map(({ id, pal }) => cylGradient(id, palRamp(pal))).join("") + `</defs>`;
}
// Une anillos con el mismo número de puntos en un sólido liso: cada faceta toma el tono de la luz que le toca; el último anillo es la tapa.
function loft(rings, zs, ramp, o = {}) {
  const P = VIEW.P, { sinA, cosA, sinE, cosE } = cameraOf(P), view = [cosA * cosE, sinA * cosE, sinE], n = rings[0].length, ccw = signedArea(rings[0]) > 0, out = [];
  for (let j = 0; j < rings.length - 1; j++) {
    const A = rings[j], B = rings[j + 1], h = zs[j + 1] - zs[j];
    for (let i = 0; i < n; i++) {
      const i2 = (i + 1) % n, [ax, ay] = A[i], [bx, by] = A[i2], dx = bx - ax, dy = by - ay, l = Math.hypot(dx, dy) || 1;
      const nx = ccw ? dy / l : -dy / l, ny = ccw ? -dx / l : dx / l;
      const inset = -(((B[i][0] + B[i2][0] - ax - bx) / 2) * nx + ((B[i][1] + B[i2][1] - ay - by) / 2) * ny), m = Math.hypot(h, inset) || 1;
      const N = [(nx * h) / m, (ny * h) / m, inset / m];
      if (N[0] * view[0] + N[1] * view[1] + N[2] * view[2] <= 1e-6) continue;
      const c = rampAt(ramp, toneOf(lamOf(N[0], N[1], N[2])));
      out.push(`<path d="${pathOf([iso([ax, ay, zs[j]], P), iso([bx, by, zs[j]], P), iso([B[i2][0], B[i2][1], zs[j + 1]], P), iso([B[i][0], B[i][1], zs[j + 1]], P)], true)}" fill="${c}" stroke="${c}" stroke-width=".6" stroke-linejoin="round"/>`);
    }
  }
  const z = zs[zs.length - 1], top = rings[rings.length - 1].map(([x, y]) => iso([x, y, z], P)), tc = o.top || rampAt(ramp, toneOf(LAMP[2]));
  out.push(`<path d="${pathOf(oriented(top), true)}" fill="${tc}" stroke="${o.topStroke || tc}" stroke-width=".6" stroke-linejoin="round"/>`);
  return out.join("");
}
// Encía: el reborde del arco con sección redondeada, de la base al hombro donde se apoyan los dientes
const GUM_LEVELS = [[18.6, 15.6, 0], [18, 15, 1.6], [16.8, 14, 3.6], [15.6, 13, 5.6], [14.6, 12.2, 6.8], [14, 11.8, ZG]]; // [fuera, dentro, z]
const GUM_RAMP = ["#48202f", "#743548", "#a45567", "#d4818e"];
const gumSvg = () => wrap("gum", loft(GUM_LEVELS.map(([o, i]) => gumRing(o, i).map(W)), GUM_LEVELS.map((l) => l[2]), GUM_RAMP, { top: "#c77786", topStroke: "#a85a69" }));
// Base del tablero: bloque con canto biselado arriba y abajo, color suave por faceta
const BASE_LEVELS = [[2.2, -12], [0.5, -10.6], [0, -9.4], [0, -1.7], [1.1, 0]]; // [retranqueo, z]
const BASE_RAMP = ["#091630", "#132d58", "#244d86", "#4d84be"];
const baseRing = (inset) => plateRing(PLATE.x + inset, PLATE.y + inset, PLATE.w - 2 * inset, PLATE.d - 2 * inset, Math.max(2, PLATE.r - inset * 0.5)).map(W);
function baseSvg() {
  const P = VIEW.P, rim = extrude(baseRing(1.1), 0, 0, P).crease;
  return loft(BASE_LEVELS.map(([i]) => baseRing(i)), BASE_LEVELS.map((l) => l[1]), BASE_RAMP, { top: `url(#${SCOPE}-bt)`, topStroke: "#35629c" }) + `<g opacity=".7">${Ln(rim, { tone: "hi" })}</g>`;
}
// Suelo del modelo de yeso: lo que queda dentro del arco (paladar / lengua), a poca altura y por debajo del reborde de la encía
function floorSvg(off, fill, z = 1.4) {
  const P = VIEW.P, end = thetaAtLength(REACH - 6), N = 40, pts = [];
  for (let i = 0; i <= N; i++) { const p = archPoint(-end + (2 * end * i) / N), n = archNormal(-end + (2 * end * i) / N); pts.push(W([p[0] - n[0] * off, p[1] - n[1] * off])); }
  return `<path d="${pathOf(pts.map(([x, y]) => iso([x, y, z], P)), true)}" fill="${fill}" stroke="#6e3547" stroke-opacity=".5" stroke-width=".7" stroke-linejoin="round"/>`;
}
const palateSvg = () => floorSvg(16, `url(#${SCOPE}-fl)`) + `<g opacity=".2">${floorSvg(5, "#f0b4c0", 1.5)}</g>`;
const staticDefs = () => `<defs><linearGradient id="${SCOPE}-fl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9c5468"/><stop offset="1" stop-color="#7a3a50"/></linearGradient><linearGradient id="${SCOPE}-bt" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2d5a94"/><stop offset=".55" stop-color="#1c3f72"/><stop offset="1" stop-color="#132c55"/></linearGradient></defs>`;

// La caída: avance p (0..1, lineal en el tiempo) -> [altura relativa (1 arriba, 0 en su lugar), opacidad].
// Hacia adelante cae acelerando (1 - u²) y rebota un poco al llegar; si se quita (dir < 0) sube acelerando y se desvanece al final.
const DROP = 34;
function fall(p, dir) {
  p = clamp01(p);
  if (dir < 0) { const q = 1 - p; return [q * q, 1 - clamp01((q - 0.5) / 0.5)]; }
  if (p < 0.7) { const u = p / 0.7; return [1 - u * u, clamp01(p / 0.12)]; }
  const v = (p - 0.7) / 0.3;
  return [0.1 * Math.sin(Math.PI * v) * (1 - 0.4 * v), 1];
}

// Variante de tarjeta (páginas de servicio): el modelo sobre su base de tablero con el riel de control, como en B4/B5.
function cardStaticSvg() {
  const P = VIEW.P, out = [staticDefs()];
  const plate = plateRing(PLATE.x, PLATE.y, PLATE.w, PLATE.d, PLATE.r);
  out.push(`<path class="iso-halo" d="${slabL(plate, -17, 17).fill}"/>`);
  // patas
  const feet = [[-66, -30], [66, -30], [-66, 68], [66, 68]].sort((a, b) => depthOf([...W(a), 0], P) - depthOf([...W(b), 0], P));
  for (const f of feet) { const w = W(f); out.push(S(cylinder(w[0], w[1], 7, -17, 1.6, P, 24), { tone: "lo" }), S(cylinder(w[0], w[1], 5.4, -15.4, 3.4, P, 24), { tone: "mid" })); }
  out.push(baseSvg());
  out.push(Ln(onTop(plateRing(PLATE.x + 5, PLATE.y + 5, PLATE.w - 10, PLATE.d - 10, 5).map(W), 0, P, true), { tone: "lo" }));
  const screws = [[-72, -36], [72, -36], [-72, 72], [72, 72]];
  out.push(Ln(screws.map((c) => ringL(c, 2.2, 0, 16)).join(""), { tone: "lo" }), dotsL(screws, 0, { size: 0.5 }));
  // placa de etiqueta (atrás a la izquierda) con tres rayas
  out.push(S(slabL(plateRing(-20, -38, 40, 12, 1.5, 3), 0, 0.7, 0), { tone: "lo", crease: "none" }));
  out.push(Ln([-1, 0, 1].map((i) => onTop([[-16, -32 + i * 3], [-16 + (i === 1 ? 22 : 30), -32 + i * 3]].map(W), 0.7, P)).join(""), { tone: "lo", free: true }));
  // encía: labio moldeado de la base, luego el reborde donde se apoyan los dientes
  out.push(palateSvg(), gumSvg());
  // riel de control: canal, dos rieles guía, topes de extremo, tira de regla
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


const TRAY_LEVELS = [[23.5, 20.5, -6], [25, 22, -4.8], [25, 22, -0.7], [24.2, 21.2, 0]]; // [fuera, dentro, z]
const TRAY_RAMP = ["#1f4468", "#3d78a8", "#80b9e0", "#c9ebfb"];
// Una bandeja pequeña y transparente (como una vista previa de un molde de acrílico) que flota; la encía va dentro. Sin tablero ni riel.
function staticSvg() {
  const P = VIEW.P, out = [];
  // bandeja de acrílico: sólido liso con canto biselado, vista a través del vidrio (opacidad del grupo, así las facetas no se solapan)
  out.push(`<g opacity=".55">${floorSvg(21, "#6aa5cf", -0.5)}${loft(TRAY_LEVELS.map(([o, i]) => gumRing(o, i).map(W)), TRAY_LEVELS.map((l) => l[2]), TRAY_RAMP, { top: "#7fb4da", topStroke: "#bfe3f8" })}</g>`);
  out.push(Ln(onTop(gumRing(24.2, 21.2).map(W), 0, P, true), { tone: "hi" }), Ln(onTop(gumRing(22, 19).map(W), 0, P, true), { tone: "mid" }));
  out.push(gumSvg());
  return out.join("");
}
// sombra suave muy por debajo de la bandeja, para que se vea flotando
function floatShadowSvg() {
  return `<path class="brk-shadow" d="${onTop(gumRing(23, 20).map(W), -30, VIEW.P, true)}"/>`;
}

// el control: un carro sobre el riel con una perilla azul medicina moleteada; se dibuja en u = 0 y se mueve con un translate
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

// paletas (papel, tapa, sombra 0..3) para que un diente pueda cambiar de tono: natural, diente tallado (preparado), amarillento, claro
const PAL = { natural: ["#e6e0d1", "#faf6ea", "#aaa593", "#c1bca9", "#d6d0be", "#e9e3d3"], prep: ["#cdb48a", "#e0cba2", "#9a8560", "#ae9870", "#bfa97e", "#cdb48a"], yellow: ["#d8c070", "#ecd98f", "#a28c4a", "#b89f58", "#cdb264", "#dcc272"], light: ["#f2f0e9", "#ffffff", "#c4c1b6", "#d9d6cb", "#e8e5db", "#f4f2ea"] };
const hex = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
const mixPal = (A, B, x) => A.map((c, i) => { const p = hex(c), q = hex(B[i]); return "#" + [0, 1, 2].map((k) => Math.round(p[k] + (q[k] - p[k]) * x).toString(16).padStart(2, "0")).join(""); });
const palStyle = (p) => `--anatomy-paper:${p[0]};--anatomy-top:${p[1]};--anatomy-shade-0:${p[2]};--anatomy-shade-1:${p[3]};--anatomy-shade-2:${p[4]};--anatomy-shade-3:${p[5]}`;
// Corona: cinco anillos de la base (cuello) al borde (la planta se estrecha hacia lingual arriba, como un diente real); [z relativo, ancho, borde lingual, borde labial, radio], los bordes en fracción de la profundidad
const PROF_ANT = [[0, 0.74, -0.36, 0.4, 0.9], [0.22, 0.9, -0.46, 0.5, 1], [0.55, 1, -0.5, 0.5, 1], [0.85, 1, -0.38, 0.47, 0.8], [1, 0.99, -0.05, 0.42, 0.6]]; // pala: más ancha hacia el borde, que es recto
const PROF_CAN = [[0, 0.74, -0.36, 0.4, 0.9], [0.22, 0.9, -0.46, 0.5, 1], [0.55, 1, -0.5, 0.5, 1], [0.82, 0.78, -0.4, 0.44, 1], [1, 0.26, -0.12, 0.26, 1]]; // cúspide en punta
const PROF_POST = [[0, 0.8, -0.4, 0.4, 0.9], [0.22, 0.96, -0.5, 0.5, 1], [0.55, 1, -0.5, 0.5, 1], [0.88, 0.94, -0.48, 0.48, 1], [1, 0.88, -0.44, 0.44, 1]];
const profileOf = (k) => (k.name === "canine" ? PROF_CAN : k.groove ? PROF_POST : PROF_ANT);
function crownDims(tooth, o) {
  const k = tooth.kind, trim = o.trim || 0, g = o.grow || 0, sc = o.s || 1;
  return { tw: (k.tw + g) * (1 - 0.26 * trim) * sc, td: (k.td + g) * (1 - 0.26 * trim) * sc, H: k.h * (1 - 0.3 * trim), z0: ZG + (o.lift || 0) };
}
function crownRings(tooth, pose, d, steps = 5) {
  const k = tooth.kind;
  return profileOf(k).map(([f, wf, b, e, rf]) => { const w = d.tw * wf, dep = (e - b) * d.td; return [d.z0 + f * d.H, frameRing(pose, -w / 2, b * d.td, w, dep, Math.min(k.r * rf, w / 2, dep / 2), steps)]; });
}
const hullOf = (rings) => convexHull(rings.flatMap(([z, ring]) => ring.map((p) => iso([...W(p), z], VIEW.P))));
const ellPts = (pose, cx, cy, rx, ry, z, n = 10) => Array.from({ length: n }, (_, i) => { const a = (i / n) * Math.PI * 2, q = W(framePoint(pose, cx + rx * Math.cos(a), cy + ry * Math.sin(a))); return iso([q[0], q[1], z], VIEW.P); });
const poly = (pts, attrs) => `<path d="${pathOf(pts, true)}" ${attrs}/>`;
const bbox = (pts) => { const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]); return [Math.min(...xs), Math.min(...ys), Math.max(...xs), Math.max(...ys)]; };

// Collar de encía: el anillo rosado que abraza el cuello de cada diente (o del hueco); entre dientes vecinos se funden en festones
function collarSvg(tooth, pose, wide = 1) {
  const d = crownDims(tooth, { s: 1.3 * wide, lift: -0.3 }), top = crownDims(tooth, { s: 1.04, lift: 2.2 }), P = VIEW.P, k = tooth.kind;
  const rings = [[d.z0, frameRing(pose, -d.tw / 2, -d.td / 2, d.tw, d.td, k.r * 1.3, 6)], [top.z0, frameRing(pose, -top.tw * 0.45, -top.td * 0.45, top.tw * 0.9, top.td * 0.9, k.r * 0.9, 6)]];
  return `<path d="${pathOf(hullOf(rings), true)}" fill="url(#${gradFor(GUM_PAL)})" stroke="#8e4457" stroke-opacity=".6" stroke-width=".7" stroke-linejoin="round"/>`;
}

// o: trim (0..1 tallado), lift (z), grow (más ancho), alpha, pal (paleta), gloss (0..1)
function toothSvg(tooth, pose, o = {}) {
  const P = VIEW.P, k = tooth.kind, d = crownDims(tooth, o), rings = crownRings(tooth, pose, d), top = rings[rings.length - 1];
  const pal = o.pal || PAL.natural, hull = hullOf(rings), sil = pathOf(hull, true), [bx0, , bx1, by1] = bbox(hull);
  const topPts = top[1].map((p) => iso([...W(p), top[0]], P)), topY = Math.max(...topPts.map((p) => p[1]));
  const nw = W(pose.n), dim = Math.min(0.26, Math.max(0, (0.3 - lamOf(nw[0], nw[1], 0)) * 0.5)), out = [];
  out.push(`<path d="${sil}" fill="url(#${gradFor(pal)})" stroke="${mixHexC(pal[2], "#3b3224", 0.35)}" stroke-opacity=".8" stroke-width=".8" stroke-linejoin="round"/>`);
  if (dim > 0.01) out.push(`<path d="${sil}" fill="#1b1224" fill-opacity="${dim.toFixed(2)}"/>`);
  out.push(`<path d="${sil}" fill="url(#${SCOPE}-ao)"/>`);
  out.push(poly(topPts, `fill="${k.groove ? mixHexC(pal[1], pal[2], 0.3) : pal[1]}" stroke="#fff" stroke-opacity=".55" stroke-width=".7" stroke-linejoin="round"`));
  // cúspides: premolar con 2, molar con 4; son cúpulas con su propia luz sobre una cara oclusal algo más oscura, así los surcos salen de los huecos entre ellas
  const z = top[0] + 0.05, edge = mixHexC(pal[2], "#3b3224", 0.4);
  const dome = (cx, cy, rx, ry) => { const pts = ellPts(pose, cx * d.tw, cy * d.td, rx * d.tw, ry * d.td, z + 1.1, 12); return poly(pts, `fill="${mixHexC(pal[1], pal[4], 0.45)}"`) + poly(pts, `fill="url(#${SCOPE}-dm)" stroke="${edge}" stroke-opacity=".35" stroke-width=".6"`); };
  if (k.name === "premolar 1" || k.name === "premolar 2") out.push(dome(0, 0.18, 0.37, 0.2), dome(0, -0.2, 0.32, 0.17));
  else if (k.name === "molar") out.push(dome(-0.23, -0.19, 0.23, 0.2), dome(0.24, -0.21, 0.21, 0.19), dome(-0.22, 0.2, 0.22, 0.2), dome(0.2, 0.22, 0.2, 0.18));
  // brillo de esmalte: una veta vertical suave en el lado de la luz
  const gl = o.gloss === undefined ? 1 : o.gloss, h = by1 - topY;
  if (h > 4 && gl > 0.02) { const cx = bx0 + (bx1 - bx0) * 0.3, cy = topY + h * 0.42; out.push(`<ellipse cx="${tenth(cx)}" cy="${tenth(cy)}" rx="${tenth((bx1 - bx0) * 0.085)}" ry="${tenth(h * 0.3)}" fill="url(#${SCOPE}-gl)" opacity="${(0.9 * gl).toFixed(2)}" transform="rotate(-8 ${tenth(cx)} ${tenth(cy)})"/>`); }
  let html = wrap("tooth", out.join(""), o.alpha !== undefined && o.alpha < 1 ? ` opacity="${Math.max(0, o.alpha).toFixed(2)}"` : "");
  if (o.gelA > 0.02) html += gelSvg(tooth, pose, o);
  return html;
}
// gel de blanqueamiento: una funda translúcida y brillante que cae sobre el diente
function gelSvg(tooth, pose, o) {
  const P = VIEW.P, d = crownDims(tooth, { s: 1.09, lift: (o.gelLift || 0) - 0.3 }), rings = crownRings(tooth, pose, { ...d, H: d.H * 1.05 }), hull = hullOf(rings), [bx0, by0, bx1, by1] = bbox(hull);
  const cx = bx0 + (bx1 - bx0) * 0.3, cy = by0 + (by1 - by0) * 0.5;
  return wrap("gel", `<path d="${pathOf(hull, true)}" fill="#8fd6f7" fill-opacity=".34" stroke="#d6f1ff" stroke-opacity=".8" stroke-width=".9" stroke-linejoin="round"/><ellipse cx="${tenth(cx)}" cy="${tenth(cy)}" rx="${tenth((bx1 - bx0) * 0.1)}" ry="${tenth((by1 - by0) * 0.26)}" fill="url(#${SCOPE}-gl)" opacity=".8" transform="rotate(-8 ${tenth(cx)} ${tenth(cy)})"/>`, ` opacity="${o.gelA.toFixed(2)}"`);
}

function bracketSvg(tooth, pose, land, tie, dir) {
  const P = VIEW.P, k = tooth.kind, out = [], [fy, fa] = fall(land, dir);
  const lift = fy * DROP;
  const p = pose;
  const molar = k.name === "molar", bw = molar ? 9.4 : 6.6, bh = molar ? 5.4 : 5.2, z0 = ZS - 3.6 + lift, y0 = k.td / 2;
  out.push(S(slabL(frameRing(p, -bw / 2 - 0.9, y0 - 0.2, bw + 1.8, 1.2, 0.5, 3), z0, 7.2, 0.2), { tone: "mid" , crease: "none" }));
  out.push(S(slabL(frameRing(p, -bw / 2, y0 + 1, bw, 2.2, 0.5, 3), ZS - bh / 2 + lift, bh, 0.25), { tone: "mid", crease: "lo" }));
  const a = framePoint(p, -bw / 2, y0 + 3.2), b = framePoint(p, bw / 2, y0 + 3.2);
  out.push(Ln(segment([...W(a), ZS + lift], [...W(b), ZS + lift], P), { tone: "hi" }));
  out.push(dotsSvg([iso([...W(a), ZS + lift], P), iso([...W(b), ZS + lift], P)], { size: 0.4, tone: "hi" }));
  if (!molar) out.push(dotsSvg([[-2.3, 2], [2.3, 2], [-2.3, -2], [2.3, -2]].map(([x, dz]) => { const q = W(framePoint(p, x, y0 + 3.2)); return iso([q[0], q[1], ZS + lift + dz], P); }), { size: 0.4, tone: "lo" }));
  let html = wrap("metal", out.join(""), fa < 1 ? ` opacity="${Math.max(0, fa).toFixed(2)}"` : "");
  if (tie > 0.02 && fy < 0.01) {
    const tw = molar ? 0 : bw + 1.2, ring = frameRing(p, -tw / 2, y0 + 0.4, tw, 3.4, 1.3, 3);
    if (!molar) html += wrap("tie", S(slabL(ring, ZS - 1.4, 2.8, 0.25), { tone: "mid", crease: "none" }), tie < 1 ? ` opacity="${tie.toFixed(2)}"` : "");
  }
  return html;
}

// una pieza de alambre: las muestras de un segmento, cortadas a la longitud alimentada
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
const ZC = ZG + 2.2; // la cara de arriba del collar de encía: ahí se apoya lo que va en el hueco
const away = (p, dir) => fall(1 - p, -dir); // lo que se quita: sube y se va (hacia atrás, vuelve cayendo)
// hueco en la encía (alvéolo) donde falta un diente
function socketSvg(tooth, pose) {
  const r = Math.min(tooth.kind.tw, tooth.kind.td) * 0.36;
  return wrap("socket", poly(ellPts(pose, 0, 0, r * 1.15, r * 1.15, ZC, 16), `fill="#5b2c40" stroke="#d08c9b" stroke-opacity=".5" stroke-width=".7"`) + poly(ellPts(pose, 0, 0, r * 0.8, r * 0.8, ZC - 0.15, 16), `fill="#2b111f"`));
}
// implante: hueco en la encía, poste de titanio, pilar y corona de porcelana: cada uno cae por turno
function implantSvg(tooth, pose, st) {
  const P = VIEW.P, c = W(pose.c), out = [socketSvg(tooth, pose)];
  const [py, pa] = fall(st.post, st.dir), [ay, aa] = fall(st.abut, st.dir), [cy, ca] = fall(st.crown, st.dir);
  if (pa > 0.01) {
    const z = ZC - 0.2 + py * DROP;
    out.push(wrap("metal", S(cylinder(c[0], c[1], 3.3, z, 4.6, P, 20, 0.3), { tone: "mid" }) + Ln(sideArc(c[0], c[1], 3.3, z + 1.5, P, 12) + sideArc(c[0], c[1], 3.3, z + 3, P, 12), { tone: "lo" }), alphaOf(pa)));
  }
  if (aa > 0.01) out.push(wrap("metal", S(cylinder(c[0], c[1], 2.3, ZC + 4.4 + ay * DROP, 5.2, P, 18, 0.3), { tone: "mid" }), alphaOf(aa)));
  if (ca > 0.01) out.push(toothSvg(tooth, pose, { lift: cy * DROP, alpha: ca }));
  return out.join("");
}
// un diente tallado (preparado): más pequeño y un poco más oscuro, luego la corona de porcelana cae sobre él
function crownOver(tooth, pose, prep, y, a, grow) {
  const stump = toothSvg(tooth, pose, { trim: prep, pal: mixPal(PAL.natural, PAL.prep, prep), gloss: 1 - prep * 0.8 });
  return a > 0.01 ? stump + toothSvg(tooth, pose, { lift: y * DROP, alpha: a, grow }) : stump;
}
// la corona (páginas de coronas): se hace (cae y queda flotando sobre el diente tallado) y luego se asienta (cae el resto, con rebote)
function crownFall(st) {
  const HOV = 0.4;
  if (st.t < 2) { const eo = 1 - (1 - st.show) ** 3; return [HOV + (1 - HOV) * (1 - eo), clamp01(st.show / 0.15)]; }
  return [HOV * fall(st.seat, st.dir)[0], 1];
}

function dynSvg(st) {
  const P = VIEW.P, items = [];
  GR.clear();
  const visible = (n) => n[0] * VIEW.look[0] + n[1] * VIEW.look[1] > 0.05;
  const braces = st.id === "braces", wire = braces && st.w > 0 ? wirePath(st.poses) : null;
  const limit = wire ? wire.total * st.w + (st.w >= 1 ? 1 : 0) : 0;
  const light = st.id === "whitening" ? mixPal(PAL.yellow, PAL.light, st.shade) : null;
  TEETH.forEach((tooth, i) => {
    const pose = st.poses[i];
    let html;
    if (st.id === "implants" && i === IMPLANT) html = collarSvg(tooth, pose) + implantSvg(tooth, pose, st);
    else if (st.id === "bridges" && BRIDGE.includes(i)) {
      const [y, a] = fall(st.seat, st.dir);
      html = collarSvg(tooth, pose) + (i === BRIDGE[1] ? socketSvg(tooth, pose) + (a > 0.01 ? toothSvg(tooth, pose, { lift: y * DROP, alpha: a, grow: 0.4 }) : "") : crownOver(tooth, pose, st.prep, y, a, 0.4));
    } else if (st.id === "crowns" && i === CROWN) { const [y, a] = crownFall(st); html = collarSvg(tooth, pose) + crownOver(tooth, pose, st.prep, y, a, 0); }
    else if (st.id === "whitening") {
      const [y1, a1] = fall(st.gelIn, st.dir), [y2, a2] = away(st.gelOut, st.dir);
      html = collarSvg(tooth, pose) + toothSvg(tooth, pose, { pal: light, gelA: a1 * a2, gelLift: (y1 + y2) * DROP * 0.55 });
    } else html = collarSvg(tooth, pose) + toothSvg(tooth, pose);
    if (braces && st.land[i] > 0.01 && visible(pose.n)) html += bracketSvg(tooth, pose, st.land[i], wire ? Math.min(1, Math.max(0, (limit - wire.toothLen[i]) / 10)) : 0, st.dir);
    const w3 = W(pose.c);
    items.push({ key: depthOf([w3[0], w3[1], ZG + 6], P), html, i });
  });
  if (wire) {
    // piezas de alambre: se une cada una al más cercano de los dos dientes que une, para pintarla con ellos
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
  const body = order.map((it) => it.html).join("");
  return dynDefs() + body; // dynDefs va después de pintar los dientes: ahí ya se sabe qué paletas se usaron
}

// marcas de regla para un servicio con `max` + 1 pasos: una marca larga en cada paso, tres cortas entre ellas
function rulerSvg(max) {
  const P = VIEW.P, minor = [], major = [], n = max * 4;
  for (let i = 0; i <= n; i++) { const u = -46 + (92 * i) / n, big = i % 4 === 0; (big ? major : minor).push(onTop([[u, RAIL_W + 12.3], [u, RAIL_W + 12.3 + (big ? 2.7 : 1.7)]].map(W), 0.7, P)); }
  return Ln(minor.join(""), { tone: "lo" }) + Ln(major.join(""), { tone: "mid" });
}

export { setScope, SERVICES, iso, fitProjection, setView, staticSvg, cardStaticSvg, floatShadowSvg, carriageSvg, carriageTransform, rulerSvg, dynSvg, sceneState, W, STEP_U, RAIL_W };
