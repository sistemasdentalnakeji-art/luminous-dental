// Builds the runtime text: a trimmed copy of the Anatomy kit (only what the figure uses) + model.js + draw.js.
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
export const HERE = dirname(fileURLToPath(import.meta.url));
export const KIT_DIR = "C:/Users/Dental Nakeji/.claude/skills/anatomy/kit";
const NEED = ["AZIMUTH", "ELEVATION", "SHADES", "RADIANS", "UNIT", "cameraOf", "iso", "towardViewer", "depthOf", "tenth", "pathOf", "roundedPlan", "signedArea", "oriented", "convexHull", "runsOf", "extrude", "onTop", "segment", "lineOnTop", "attrs", "escape", "solidSvg", "lineSvg", "dotsSvg", "axisVector", "fine", "translateAlong", "fitProjection", "circleRing", "cylinder", "knurl", "sideArc", "ring", "slabOf", "ringOf", "insetPlan", "topTicks", "haloOf", "pointsAt"];
export function kitSubset() {
  const src = readFileSync(join(KIT_DIR, "iso-kit.mjs"), "utf8").replace(/^export /gm, "");
  const lines = src.split("\n");
  const blocks = []; let cur = null;
  for (const line of lines) {
    const m = /^(?:function|const|let)\s+([A-Za-z0-9_]+)/.exec(line);
    if (m) { cur = { name: m[1], text: [] }; blocks.push(cur); }
    if (/^export const ISO_CSS|^const PAGE_CSS|^const ISO_CSS/.test(line)) cur = null;
    if (cur) cur.text.push(line);
  }
  const have = new Set(blocks.map((b) => b.name));
  const missing = NEED.filter((n) => !have.has(n));
  if (missing.length) throw new Error("kit names not found: " + missing);
  return blocks.filter((b) => NEED.includes(b.name)).map((b) => b.text.join("\n")).join("\n");
}
export const source = (file) => readFileSync(join(HERE, file), "utf8");
export function runtimeText(files = ["model.js", "draw.js"]) { return kitSubset() + "\n" + files.map(source).join("\n"); }
