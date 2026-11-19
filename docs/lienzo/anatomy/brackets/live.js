// Brackets figure: behaviour. One number t (0..4) is the whole state; every part and every word comes from stateOf(t).
function mountBrackets(root, P) {
  setView(P);
  const q = (s) => root.querySelector(s);
  const dyn = q("[data-dyn]"), car = q("[data-car]"), stage = q("[data-stage]"), svg = q("svg");
  const pauseBtn = q("[data-pause]"), count = q("[data-count]"), nameEl = q("[data-name]"), btns = [...root.querySelectorAll("[data-step]")];
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const shareOf = (i) => iso(W([STEP_U(i), RAIL_W]).concat(10), P)[0] / P.width;
  const s0 = shareOf(0), s4 = shareOf(4);
  let t = 4, target = 4, last = 0, frame = 0, visible = false, touring = false, clock = 0, idle = 0, pressed = false, shown = -1, shownStep = -1;
  let paused = false, hovering = false, focused = false; // the loop also stops while the pointer is over the card or a step has focus (WCAG 2.2.2)
  const DWELL = [1.5, 1.9, 1.9, 2.3, 3.4], TOTAL = DWELL.reduce((a, b) => a + b, 0);
  const tourAt = (c) => { let x = c % TOTAL; for (let i = 0; i < 5; i++) { if (x < DWELL[i]) return i; x -= DWELL[i]; } return 4; };
  function draw(force) {
    if (!force && Math.abs(t - shown) < 1e-4) return;
    shown = t;
    const st = stateOf(t);
    dyn.innerHTML = dynSvg(st);
    car.setAttribute("transform", carriageTransform(t));
    if (st.step !== shownStep) {
      shownStep = st.step;
      const text = STEPS[st.step], n = st.step + 1;
      count.textContent = "Step " + n + " of 5";
      nameEl.textContent = text;
      btns.forEach((b, i) => { b.setAttribute("aria-pressed", String(i === st.step)); });
      stage.setAttribute("aria-valuenow", String(n));
      stage.setAttribute("aria-valuetext", "Step " + n + " of 5: " + text);
    }
  }
  function tick(now) {
    if (last && now - last < 30) { frame = requestAnimationFrame(tick); return; } // 30 fps is plenty for a calm figure
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
    last = now;
    if (touring) { clock += dt; target = tourAt(clock); }
    t = still.matches ? target : t + (target - t) * (1 - Math.exp(-dt / 0.3));
    if (Math.abs(target - t) < 0.002) t = target;
    draw();
    frame = visible && (touring || t !== target) ? requestAnimationFrame(tick) : 0;
  }
  const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
  const canTour = () => !still.matches && !paused && !hovering && !focused && !pressed;
  const resume = (ms) => { clearTimeout(idle); idle = setTimeout(() => { if (canTour()) { touring = true; clock = 0; run(); } }, ms); };
  const hold = () => { touring = false; resume(8000); };
  const go = (next) => { hold(); target = clamp(next, 0, 4); run(); };
  const setPaused = (value) => { paused = value; pauseBtn.setAttribute("aria-label", value ? PLAY : PAUSE); pauseBtn.innerHTML = value ? PLAY_ICON : PAUSE_ICON; if (value) { touring = false; clearTimeout(idle); } else resume(300); };
  const PAUSE = pauseBtn.getAttribute("aria-label"), PLAY = "Play animation", PAUSE_ICON = pauseBtn.innerHTML, PLAY_ICON = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3l11 7-11 7z"/></svg>';
  pauseBtn.hidden = still.matches;
  pauseBtn.addEventListener("click", () => setPaused(!paused));
  root.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { hovering = true; touring = false; } });
  root.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") { hovering = false; resume(1500); } });
  root.addEventListener("focusin", (e) => { if (e.target !== pauseBtn && e.target.matches(":focus-visible")) { focused = true; touring = false; } }); // keyboard focus on a step or the figure pauses the loop
  root.addEventListener("focusout", () => { focused = false; resume(3000); });
  new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
  const at = (e) => { const b = svg.getBoundingClientRect(); return clamp(((((e.clientX - b.left) / b.width) - s0) / (s4 - s0)) * 4, 0, 4); };
  stage.addEventListener("pointerdown", (e) => { pressed = true; try { stage.setPointerCapture(e.pointerId); } catch (_) {} go(at(e)); });
  stage.addEventListener("pointermove", (e) => { if (pressed) go(at(e)); });
  const release = () => { if (!pressed) return; pressed = false; go(Math.round(target)); };
  stage.addEventListener("pointerup", release); stage.addEventListener("pointercancel", release);
  stage.addEventListener("keydown", (e) => {
    const here = Math.round(target); let to = null;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") to = here + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") to = here - 1;
    if (e.key === "Home") to = 0;
    if (e.key === "End") to = 4;
    if (to === null) return;
    e.preventDefault(); go(to);
  });
    btns.forEach((b, i) => b.addEventListener("click", () => go(i)));
  if (typeof window.__BRK_T === "number") { t = target = window.__BRK_T; draw(true); } else if (!still.matches) { t = 0; target = 0; touring = true; draw(true); } else draw(true);
  return () => { cancelAnimationFrame(frame); clearTimeout(idle); };
}
