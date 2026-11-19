// node integrate.mjs [h1440 h375] : makes Estilo-B5.dc.html and Estilo-B5-movil.dc.html from B3 (B3 is only read). Run build.mjs first.
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { HERE } from "./bundle.mjs";
const PROJECT = join(HERE, "..", "..", "project");
const fig = JSON.parse(readFileSync(join(HERE, "figure.json"), "utf8"));
const heights = process.argv.slice(2).map(Number); // optional: preview heights for 1440 and 375
let src = readFileSync(join(PROJECT, "Estilo-B3.dc.html"), "utf8");
const swap = (from, to) => { if (!src.includes(from)) throw new Error("not found: " + from.slice(0, 70)); src = src.replace(from, () => to); };

swap("Direction B3 · Home (night mesh sky)", "Direction B5 · Home (hero with the five service figures)");
// hero css: two columns, text left, figure right
swap(`.hero{text-align:center;padding-top:clamp(40px,5.6vw,80px)}`, `.hero{text-align:left;padding-top:clamp(28px,4vw,64px)}
  .hero-grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:clamp(28px,4vw,64px);align-items:center}
  .hero-fig{min-width:0}`);
swap(`.hero h1{font:350 clamp(46px,7.8vw,118px)/.98 var(--serif);letter-spacing:-.035em;font-optical-sizing:auto;text-wrap:balance;max-width:11em;margin-inline:auto}`,
  `.hero h1{font:350 clamp(44px,5.3vw,84px)/1 var(--serif);letter-spacing:-.035em;font-optical-sizing:auto;text-wrap:balance;max-width:9em}`);
swap(`.hero-support{max-width:36em;margin:clamp(22px,2.6vw,34px) auto 0;`, `.hero-support{max-width:30em;margin:clamp(20px,2.2vw,30px) 0 0;`);
swap(`.hero-cta{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-top:30px}`, `.hero-cta{display:flex;gap:16px;justify-content:flex-start;flex-wrap:wrap;margin-top:30px}
  .ringsec{padding-top:clamp(8px,2vw,32px)}
  @media (max-width:900px){.hero-grid{grid-template-columns:minmax(0,1fr)}.hero h1{font-size:clamp(42px,11.5vw,66px)}}
  /* braces figure (Anatomy): kit tones + night palette */
  ${fig.css.replace(/\n/g, "\n  ")}`);
// hero markup
const a = src.indexOf(`<section class="hero wrap" id="top">`), b = src.indexOf(`<!-- ridge at the foot of the hero -->`);
const hero = src.slice(a, b);
const stage = hero.slice(hero.indexOf(`<!-- SIGNATURE`), hero.indexOf(`</section>`)).trimEnd();
const text = hero.slice(hero.indexOf(`<h1>`), hero.indexOf(`<!-- SIGNATURE`)).trimEnd();
const newHero = `<section class="hero wrap" id="top">
      <div class="hero-grid">
        <div class="hero-text">
      ${text}
        </div>
        <!-- FIGURE: five services (Anatomy). One number (the gold knob) drives every part. -->
        <div class="hero-fig">${fig.card}</div>
      </div>
    </section>

    <!-- the ring: one doctor, four kinds of care (the only photo of the doctor) -->
    <section class="wrap ringsec">
      ${stage}
    </section>

    `;
src = src.slice(0, a) + newHero + src.slice(b);
// page fixes (B4 only): consent checkbox with a 44 px touch area; logo a bit more contrast on the blue
swap(`.consent input{width:28px;height:28px;flex:none;accent-color:var(--sky)}`, `.consent input{width:36px;height:36px;margin:4px;flex:none;accent-color:var(--sky)}`);
swap(`.logo-base,.logo-sheen{position:absolute;inset:0;background:var(--logo-img) center/100% 100% no-repeat}`, `.logo-base,.logo-sheen{position:absolute;inset:0;background:var(--logo-img) center/100% 100% no-repeat}
  .logo-base{filter:brightness(1.3) contrast(1.08) drop-shadow(0 0 1px rgba(255,255,255,.55)) drop-shadow(0 0 6px rgba(8,18,40,.55))}`);
// script: the figure runtime lives in its own scope inside componentDidMount
swap(`    this.stop = [];`, `    this.stop = [];
    // services figure (Anatomy kit, trimmed) and its controls
    try {
      const mount = (function () {
${fig.runtime}
        return mountServices;
      })();
      const host = document.querySelector('.brk');
      if (host) this.stop.push(mount(host, ${JSON.stringify(fig.P)}));
    } catch (err) { console.error('services figure', err); }`);
if (heights.length === 2) src = src.replace(/"\$preview":\{"width":1440,"height":\d+\}/, `"$preview":{"width":1440,"height":${heights[0]}}`);
writeFileSync(join(PROJECT, "Estilo-B5.dc.html"), src);
writeFileSync(join(PROJECT, "Estilo-B5-movil.dc.html"), src.replace(/"\$preview":\{"width":1440,"height":\d+\}/, `"$preview":{"width":375,"height":${heights[1] || 8000}}`));
console.log("wrote Estilo-B5.dc.html and Estilo-B5-movil.dc.html", (src.length / 1024).toFixed(1), "KB");
