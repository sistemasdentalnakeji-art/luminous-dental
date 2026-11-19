// Look of the figure: the page's night palette over the Anatomy kit's tone variables. Teeth = porcelain, brackets and wire = light metal, ties = sky.
import { ISO_CSS } from "file:///C:/Users/Dental%20Nakeji/.claude/skills/anatomy/kit/iso-kit.mjs";
const KEEP = /^\.(iso-svg|iso-fill|iso-solid|iso-shade|iso-top|iso-halo|iso-line(?!\[data-(flow|dotted|dashed))|iso-dots(?! circle\[data-pulse)|iso-wire)/;
export const KIT_CSS = ISO_CSS.split("\n").filter((l) => KEEP.test(l) && !l.includes("data-flow") && !l.includes("data-dotted") && !l.includes("data-dashed") && !l.includes("pulse")).join("\n");
export const BRK_VARS = `
.brk-card{
  --anatomy-paper:#102349;--anatomy-face:#17305a;--anatomy-top:#1d3a69;
  --anatomy-shade-0:#0c1a36;--anatomy-shade-1:#0f2142;--anatomy-shade-2:#13284d;--anatomy-shade-3:#182f58;
  --anatomy-lit-top:#f3d79a;--anatomy-lit-shade:#c99a3a;
  --anatomy-hi:#a9cfe9;--anatomy-mid:#58789f;--anatomy-lo:#2f4a76;--anatomy-faint:#1d3359;--anatomy-lit:#e0b65c;
  --anatomy-halo:#02060f;--anatomy-halo-opacity:.85;--anatomy-dot:#cfe3f3;
}
.brk-card .tooth{--anatomy-paper:#e6e0d1;--anatomy-top:#faf6ea;--anatomy-shade-0:#aaa593;--anatomy-shade-1:#c1bca9;--anatomy-shade-2:#d6d0be;--anatomy-shade-3:#e9e3d3;--anatomy-mid:#6f6a5a;--anatomy-lo:#9c9683}
.brk-card .metal{--anatomy-paper:#a9b9cd;--anatomy-top:#eaf2fb;--anatomy-shade-0:#5f7189;--anatomy-shade-1:#7587a0;--anatomy-shade-2:#93a6bd;--anatomy-shade-3:#b9c8da;--anatomy-mid:#2b3b54;--anatomy-lo:#46587a;--anatomy-hi:#1b2a42}
.brk-card .gum{--anatomy-paper:#7a4a66;--anatomy-top:#a06a89;--anatomy-shade-0:#5a3449;--anatomy-shade-1:#6b3f58;--anatomy-shade-2:#7e4d6a;--anatomy-shade-3:#915c7c;--anatomy-mid:#b88aa5;--anatomy-lo:#4c2b3f}
.brk-card .socket{--anatomy-paper:#3a2233;--anatomy-top:#4a2c41;--anatomy-shade-0:#2a1925;--anatomy-shade-1:#2f1c2a;--anatomy-shade-2:#35202e;--anatomy-shade-3:#3a2233;--anatomy-lo:#4c2b3f;--anatomy-mid:#6a4059}
.brk-card .tie{--anatomy-paper:#7bc3eb;--anatomy-top:#b6e0f6;--anatomy-shade-0:#3f84ad;--anatomy-shade-1:#549fc8;--anatomy-shade-2:#6ab4dd;--anatomy-shade-3:#8ed0f2;--anatomy-mid:#245a80}
.brk-card .wire-d{fill:none;stroke:#1e3350;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
.brk-card .wire-l{fill:none;stroke:#dbe8f6;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke}
`;
