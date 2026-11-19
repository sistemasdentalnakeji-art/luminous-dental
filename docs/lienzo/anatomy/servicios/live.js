// Services figure: behaviour. One number t is the state of one service; every part and every word comes from sceneState(svc, t).
function mountServices(root, P) {
  setView(P);
  const q = (s) => root.querySelector(s);
  const dyn = q("[data-dyn]"), car = q("[data-car]"), ruler = q("[data-ruler]"), fade = q("[data-fade]"), stage = q("[data-stage]"), svg = q("svg"), panel = q("#brk-panel");
  const pauseBtn = q("[data-pause]"), count = q("[data-count]"), nameEl = q("[data-name]"), stepsEl = q("[data-steps]"), tabsEl = q("[data-tabs]"), tabs = [...root.querySelectorAll("[data-tab]")];
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const only = root.dataset.only ? SERVICES.findIndex((s) => s.id === root.dataset.only) : -1;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const s0 = iso(W([STEP_U(0), RAIL_W]).concat(10), P)[0] / P.width, s1 = iso(W([STEP_U(4), RAIL_W]).concat(10), P)[0] / P.width;
  let svc = only >= 0 ? only : 0, t = 0, target = 0, last = 0, frame = 0, visible = false, touring = false, clock = 0, idle = 0, pressed = false, shown = -1, shownStep = -1, swap = 0;
  let paused = false, hovering = false, focused = false, rotate = only < 0; // rotate: until the visitor picks a service, the tour moves on to the next one
  const steps = () => SERVICES[svc].steps, max = () => steps().length - 1;
  const dwell = (i) => (i === max() ? 3.2 : 1.8), total = () => steps().reduce((a, _, i) => a + dwell(i), 0);
  const stepAt = (c) => { let x = c; for (let i = 0; i <= max(); i++) { if (x < dwell(i)) return i; x -= dwell(i); } return max(); };
  function draw(force) {
    if (!force && Math.abs(t - shown) < 1e-4) return;
    shown = t;
    const st = sceneState(svc, t);
    dyn.innerHTML = dynSvg(st);
    car.setAttribute("transform", carriageTransform(t, max()));
    if (st.step !== shownStep) {
      shownStep = st.step;
      const n = st.step + 1, text = steps()[st.step];
      count.textContent = "Step " + n + " of " + (max() + 1);
      nameEl.textContent = text;
      [...stepsEl.children].forEach((b, i) => b.setAttribute("aria-pressed", String(i === st.step)));
      stage.setAttribute("aria-valuenow", String(n));
      stage.setAttribute("aria-valuetext", "Step " + n + " of " + (max() + 1) + ": " + text);
    }
  }
  function renderService() {
    const sv = SERVICES[svc];
    stepsEl.innerHTML = sv.steps.map((s, i) => '<button type="button" data-step="' + i + '" aria-label="Step ' + (i + 1) + ": " + s + '" aria-pressed="false">' + (i + 1) + "</button>").join("");
    ruler.innerHTML = rulerSvg(max());
    stage.setAttribute("aria-valuemax", String(max() + 1));
    tabs.forEach((b, i) => { b.setAttribute("aria-selected", String(i === svc)); b.tabIndex = i === svc ? 0 : -1; });
    if (only < 0) panel.setAttribute("aria-labelledby", "brk-tab-" + sv.id);
    if (tabsEl && tabsEl.scrollWidth > tabsEl.clientWidth) { // phone: keep the chosen tab in view inside the strip
      const r = tabs[svc].getBoundingClientRect(), c = tabsEl.getBoundingClientRect();
      if (r.left < c.left + 4 || r.right > c.right - 24) tabsEl.scrollLeft += r.left - c.left - 8;
    }
  }
  function applyService(i) {
    svc = i; shown = -1; shownStep = -1; clock = 0;
    t = target = still.matches ? max() : 0;
    renderService(); draw(true);
    fade.classList.remove("out"); run();
  }
  function choose(i) {
    if (i === svc || swap) return;
    if (still.matches || !visible) { applyService(i); return; }
    fade.classList.add("out");
    swap = setTimeout(() => { swap = 0; applyService(i); }, 230);
  }
  function tick(now) {
    if (last && now - last < 30) { frame = requestAnimationFrame(tick); return; } // 30 fps is plenty for a calm figure
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
    last = now;
    if (touring && !swap) {
      clock += dt;
      if (clock >= total()) { if (rotate) { clock = 0; choose((svc + 1) % SERVICES.length); } else clock %= total(); }
      else target = stepAt(clock);
    }
    t = still.matches ? target : t + (target - t) * (1 - Math.exp(-dt / 0.3));
    if (Math.abs(target - t) < 0.002) t = target;
    draw();
    frame = visible && (touring || t !== target || swap) ? requestAnimationFrame(tick) : 0;
  }
  const run = () => { if (!frame && visible) { last = 0; frame = requestAnimationFrame(tick); } };
  const canTour = () => !still.matches && !paused && !hovering && !focused && !pressed;
  const resume = (ms) => { clearTimeout(idle); idle = setTimeout(() => { if (canTour()) { touring = true; clock = 0; run(); } }, ms); };
  const hold = () => { touring = false; resume(8000); };
  const go = (next) => { hold(); target = clamp(next, 0, max()); run(); };
  const pick = (i) => { rotate = false; hold(); choose(i); };
  const PAUSE = pauseBtn.getAttribute("aria-label"), PLAY = "Play animation", PAUSE_ICON = pauseBtn.innerHTML, PLAY_ICON = '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M6 3l11 7-11 7z"/></svg>';
  const setPaused = (value) => { paused = value; pauseBtn.setAttribute("aria-label", value ? PLAY : PAUSE); pauseBtn.innerHTML = value ? PLAY_ICON : PAUSE_ICON; if (value) { touring = false; clearTimeout(idle); } else resume(300); };
  pauseBtn.hidden = still.matches;
  pauseBtn.addEventListener("click", () => setPaused(!paused));
  root.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") { hovering = true; touring = false; } });
  root.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse") { hovering = false; resume(1500); } });
  root.addEventListener("focusin", (e) => { if (e.target !== pauseBtn && e.target.matches(":focus-visible")) { focused = true; touring = false; } }); // keyboard focus on a tab, a step or the figure pauses the loop
  root.addEventListener("focusout", () => { focused = false; resume(3000); });
  new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; if (visible) run(); }, { rootMargin: "120px 0px" }).observe(stage);
  const at = (e) => { const b = svg.getBoundingClientRect(); return clamp(((((e.clientX - b.left) / b.width) - s0) / (s1 - s0)) * max(), 0, max()); };
  stage.addEventListener("pointerdown", (e) => { pressed = true; try { stage.setPointerCapture(e.pointerId); } catch (_) {} go(at(e)); });
  stage.addEventListener("pointermove", (e) => { if (pressed) go(at(e)); });
  const release = () => { if (!pressed) return; pressed = false; go(Math.round(target)); };
  stage.addEventListener("pointerup", release); stage.addEventListener("pointercancel", release);
  stage.addEventListener("keydown", (e) => {
    const here = Math.round(target); let to = null;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") to = here + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") to = here - 1;
    if (e.key === "Home") to = 0;
    if (e.key === "End") to = max();
    if (to === null) return;
    e.preventDefault(); go(to);
  });
  stepsEl.addEventListener("click", (e) => { const b = e.target.closest("[data-step]"); if (b) go(Number(b.dataset.step)); });
  if (tabsEl) {
    tabsEl.hidden = false;
    tabs.forEach((b, i) => b.addEventListener("click", () => pick(i)));
    tabsEl.addEventListener("keydown", (e) => { // tabs pattern: arrows move and select, Home and End jump
      const here = tabs.indexOf(document.activeElement); if (here < 0) return;
      let to = null;
      if (e.key === "ArrowRight") to = (here + 1) % tabs.length;
      if (e.key === "ArrowLeft") to = (here + tabs.length - 1) % tabs.length;
      if (e.key === "Home") to = 0;
      if (e.key === "End") to = tabs.length - 1;
      if (to === null) return;
      e.preventDefault(); tabs[to].focus(); pick(to);
    });
  }
  const preset = typeof window.__SV === "number" ? window.__SV : null; // debugging: window.__SV = service, window.__BRK_T = step number
  if (preset !== null) svc = preset;
  renderService();
  if (typeof window.__BRK_T === "number") { t = target = window.__BRK_T; draw(true); }
  else if (!still.matches) { t = 0; target = 0; touring = true; draw(true); }
  else { t = target = max(); draw(true); }
  return () => { cancelAnimationFrame(frame); clearTimeout(idle); clearTimeout(swap); };
}
