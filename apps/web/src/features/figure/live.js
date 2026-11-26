// @ts-nocheck
// Comportamiento de la figura de la página de servicio (de docs/lienzo/anatomy/servicios/live.js, reescrito el 25-nov-2026). Un número t es el estado de un servicio:
// recorre los pasos en bucle mientras nadie lo toca (3.5 s por paso, 5 s en el resultado; la pieza nueva cae en 1.2 s y se asienta), y la perilla azul medicina,
// los botones de paso y las flechas del teclado toman el control: al elegir un paso se ve la misma caída.
import { SERVICES, iso, setView, setScope, dynSvg, carriageTransform, sceneState, W, STEP_U, RAIL_W } from "./engine.js";
import { makeGlide, dwellOf } from "./glide.js";
export function mountServices(root, P, TXT) {
  const q = (s) => root.querySelector(s);
  const dyn = q("[data-dyn]"), car = q("[data-car]"), stage = q("[data-stage]"), svg = q("svg");
  const pauseBtn = q("[data-pause]"), count = q("[data-count]"), nameEl = q("[data-name]"), stepsEl = q("[data-steps]");
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const svc = SERVICES.findIndex((s) => s.id === root.dataset.only);
  const steps = TXT.steps ?? SERVICES[svc].steps, max = steps.length - 1; // TXT.steps: los nombres de los pasos en el idioma de la página (mismo número que en el motor)
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  setView(P); setScope(TXT.scope);
  const s0 = iso(W([STEP_U(0), RAIL_W]).concat(10), P)[0] / P.width, s1 = iso(W([STEP_U(4), RAIL_W]).concat(10), P)[0] / P.width; // el recorrido propio de la perilla azul medicina
  const g = makeGlide(0);
  let last = 0, frame = 0, visible = false, touring = false, clock = 0, idle = 0, pressed = false, shown = -1, shownK = -1, shownStep = -1;
  let paused = false, hovering = false, focused = false;
  const total = steps.reduce((a, _, i) => a + dwellOf(i, max), 0);
  const stepAt = (c) => { let x = c; for (let i = 0; i <= max; i++) { if (x < dwellOf(i, max)) return i; x -= dwellOf(i, max); } return max; };
  function draw(force) {
    if (!force && Math.abs(g.t - shown) < 1e-4 && Math.abs(g.k - shownK) < 1e-4) return;
    if (force || Math.abs(g.t - shown) >= 1e-4) { // el motor tiene una sola cámara y un solo prefijo de ids: se fijan antes de cada dibujo
      setView(P); setScope(TXT.scope);
      dyn.innerHTML = dynSvg(sceneState(svc, g.t, g.dir));
    }
    shown = g.t; shownK = g.k;
    setView(P);
    car.setAttribute("transform", carriageTransform(g.k, max));
    const step = Math.round(g.t);
    if (step !== shownStep) {
      shownStep = step;
      const n = step + 1, text = steps[step];
      count.textContent = TXT.stepOf(n, max + 1);
      nameEl.textContent = text;
      [...stepsEl.children].forEach((b, i) => b.setAttribute("aria-pressed", String(i === step)));
      stage.setAttribute("aria-valuenow", String(n));
      stage.setAttribute("aria-valuetext", TXT.stepOf(n, max + 1) + ": " + text);
    }
  }
  function tick(now) {
    if (last && now - last < 30) { frame = requestAnimationFrame(tick); return; } // 30 fps bastan para una figura tranquila
    const dt = last ? Math.min((now - last) / 1000, 0.1) : 1 / 60;
    last = now;
    if (touring && allPaused()) touring = false;
    if (touring) { clock = (clock + dt) % total; g.aim(stepAt(clock)); }
    if (still.matches) g.snap(g.to); else g.tick(dt, pressed);
    draw();
    frame = visible && (touring || g.moving) ? requestAnimationFrame(tick) : 0;
  }
  const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
  const allPaused = () => document.documentElement.hasAttribute("data-motion-paused"); // el interruptor del pie de página (lib/motion.ts)
  const canTour = () => !allPaused() && !still.matches && !paused && !hovering && !focused && !pressed;
  const resume = (ms) => { clearTimeout(idle); idle = setTimeout(() => { if (canTour()) { touring = true; clock = 0; run(); } }, ms); };
  const hold = () => { touring = false; resume(8000); };
  const go = (next) => { hold(); g.aim(clamp(next, 0, max)); run(); };
  const PAUSE = pauseBtn.getAttribute("aria-label"), PLAY = TXT.play, PAUSE_ICON = pauseBtn.innerHTML, PLAY_ICON = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3l11 7-11 7z"/></svg>';
  const setPaused = (value) => { paused = value; pauseBtn.setAttribute("aria-label", value ? PLAY : PAUSE); pauseBtn.innerHTML = value ? PLAY_ICON : PAUSE_ICON; if (value) { touring = false; clearTimeout(idle); } else resume(300); };
  new MutationObserver(() => { if (allPaused()) touring = false; else resume(300); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion-paused"] });
  pauseBtn.hidden = still.matches;
  still.addEventListener("change", () => { pauseBtn.hidden = still.matches; if (still.matches) { touring = false; g.snap(max); run(); } }); // se activó el movimiento reducido con la página abierta: se detiene el movimiento y se oculta Pausa
  pauseBtn.addEventListener("click", () => setPaused(!paused));
  root.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { hovering = true; touring = false; } });
  root.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") { hovering = false; resume(1500); } });
  root.addEventListener("focusin", (e) => { if (e.target !== pauseBtn && e.target.matches(":focus-visible")) { focused = true; touring = false; } }); // el foco de teclado en un paso o en la figura pausa el bucle
  root.addEventListener("focusout", () => { focused = false; resume(3000); });
  new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
  const at = (e) => { const b = svg.getBoundingClientRect(); return clamp(((((e.clientX - b.left) / b.width) - s0) / (s1 - s0)) * max, 0, max); };
  stage.addEventListener("pointerdown", (e) => { pressed = true; try { stage.setPointerCapture(e.pointerId); } catch {} go(at(e)); });
  stage.addEventListener("pointermove", (e) => { if (pressed) go(at(e)); });
  const release = () => { if (!pressed) return; pressed = false; go(Math.round(g.to)); };
  stage.addEventListener("pointerup", release); stage.addEventListener("pointercancel", release);
  stage.addEventListener("keydown", (e) => {
    const here = Math.round(g.to); let to = null;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") to = here + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") to = here - 1;
    if (e.key === "Home") to = 0;
    if (e.key === "End") to = max;
    if (to === null) return;
    e.preventDefault(); go(to);
  });
  stepsEl.addEventListener("click", (e) => { const b = e.target.closest("[data-step]"); if (b) go(Number(b.dataset.step)); });
  if (!still.matches) { g.snap(0); touring = true; draw(true); }
  else { g.snap(max); draw(true); }
  return () => { cancelAnimationFrame(frame); clearTimeout(idle); };
}
