// @ts-nocheck
// Comportamiento de la figura de la página de servicio (de docs/lienzo/anatomy/servicios/live.js). Un número t es el estado de un servicio:
// recorre los pasos en bucle mientras nadie lo toca, y la perilla azul medicina, los botones de paso y las flechas del teclado toman el control.
import { SERVICES, iso, setView, dynSvg, carriageTransform, sceneState, W, STEP_U, RAIL_W } from "./engine.js";
export function mountServices(root, P, TXT) {
  setView(P);
  const q = (s) => root.querySelector(s);
  const dyn = q("[data-dyn]"), car = q("[data-car]"), stage = q("[data-stage]"), svg = q("svg");
  const pauseBtn = q("[data-pause]"), count = q("[data-count]"), nameEl = q("[data-name]"), stepsEl = q("[data-steps]");
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const svc = SERVICES.findIndex((s) => s.id === root.dataset.only);
  const steps = SERVICES[svc].steps, max = steps.length - 1;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const s0 = iso(W([STEP_U(0), RAIL_W]).concat(10), P)[0] / P.width, s1 = iso(W([STEP_U(4), RAIL_W]).concat(10), P)[0] / P.width; // el recorrido propio de la perilla azul medicina
  let t = 0, target = 0, last = 0, frame = 0, visible = false, touring = false, clock = 0, idle = 0, pressed = false, shown = -1, shownStep = -1;
  let paused = false, hovering = false, focused = false;
  const dwell = (i) => (i === max ? 3.2 : 1.8), total = steps.reduce((a, _, i) => a + dwell(i), 0);
  const stepAt = (c) => { let x = c; for (let i = 0; i <= max; i++) { if (x < dwell(i)) return i; x -= dwell(i); } return max; };
  function draw(force) {
    if (!force && Math.abs(t - shown) < 1e-4) return;
    shown = t;
    const st = sceneState(svc, t);
    dyn.innerHTML = dynSvg(st);
    car.setAttribute("transform", carriageTransform(t, max));
    if (st.step !== shownStep) {
      shownStep = st.step;
      const n = st.step + 1, text = steps[st.step];
      count.textContent = TXT.stepOf(n, max + 1);
      nameEl.textContent = text;
      [...stepsEl.children].forEach((b, i) => b.setAttribute("aria-pressed", String(i === st.step)));
      stage.setAttribute("aria-valuenow", String(n));
      stage.setAttribute("aria-valuetext", TXT.stepOf(n, max + 1) + ": " + text);
    }
  }
  function tick(now) {
    if (last && now - last < 30) { frame = requestAnimationFrame(tick); return; } // 30 fps bastan para una figura tranquila
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
    last = now;
    if (touring && allPaused()) touring = false;
    if (touring) { clock = (clock + dt) % total; target = stepAt(clock); }
    t = still.matches ? target : t + (target - t) * (1 - Math.exp(-dt / 0.3));
    if (Math.abs(target - t) < 0.002) t = target;
    draw();
    frame = visible && (touring || t !== target) ? requestAnimationFrame(tick) : 0;
  }
  const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
  const allPaused = () => document.documentElement.hasAttribute("data-motion-paused"); // el interruptor del pie de página (lib/motion.ts)
  const canTour = () => !allPaused() && !still.matches && !paused && !hovering && !focused && !pressed;
  const resume = (ms) => { clearTimeout(idle); idle = setTimeout(() => { if (canTour()) { touring = true; clock = 0; run(); } }, ms); };
  const hold = () => { touring = false; resume(8000); };
  const go = (next) => { hold(); target = clamp(next, 0, max); run(); };
  const PAUSE = pauseBtn.getAttribute("aria-label"), PLAY = TXT.play, PAUSE_ICON = pauseBtn.innerHTML, PLAY_ICON = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3l11 7-11 7z"/></svg>';
  const setPaused = (value) => { paused = value; pauseBtn.setAttribute("aria-label", value ? PLAY : PAUSE); pauseBtn.innerHTML = value ? PLAY_ICON : PAUSE_ICON; if (value) { touring = false; clearTimeout(idle); } else resume(300); };
  new MutationObserver(() => { if (allPaused()) touring = false; else resume(300); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion-paused"] });
  pauseBtn.hidden = still.matches;
  still.addEventListener("change", () => { pauseBtn.hidden = still.matches; if (still.matches) { touring = false; target = max; run(); } }); // se activó el movimiento reducido con la página abierta: se detiene el movimiento y se oculta Pausa
  pauseBtn.addEventListener("click", () => setPaused(!paused));
  root.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { hovering = true; touring = false; } });
  root.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") { hovering = false; resume(1500); } });
  root.addEventListener("focusin", (e) => { if (e.target !== pauseBtn && e.target.matches(":focus-visible")) { focused = true; touring = false; } }); // el foco de teclado en un paso o en la figura pausa el bucle
  root.addEventListener("focusout", () => { focused = false; resume(3000); });
  new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
  const at = (e) => { const b = svg.getBoundingClientRect(); return clamp(((((e.clientX - b.left) / b.width) - s0) / (s1 - s0)) * max, 0, max); };
  stage.addEventListener("pointerdown", (e) => { pressed = true; try { stage.setPointerCapture(e.pointerId); } catch {} go(at(e)); });
  stage.addEventListener("pointermove", (e) => { if (pressed) go(at(e)); });
  const release = () => { if (!pressed) return; pressed = false; go(Math.round(target)); };
  stage.addEventListener("pointerup", release); stage.addEventListener("pointercancel", release);
  stage.addEventListener("keydown", (e) => {
    const here = Math.round(target); let to = null;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") to = here + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") to = here - 1;
    if (e.key === "Home") to = 0;
    if (e.key === "End") to = max;
    if (to === null) return;
    e.preventDefault(); go(to);
  });
  stepsEl.addEventListener("click", (e) => { const b = e.target.closest("[data-step]"); if (b) go(Number(b.dataset.step)); });
  if (!still.matches) { t = 0; target = 0; touring = true; draw(true); }
  else { t = target = max; draw(true); }
  return () => { cancelAnimationFrame(frame); clearTimeout(idle); };
}
