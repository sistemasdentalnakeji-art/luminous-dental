// Lienzo r11: comportamiento de los dos tipos de comparador. Sin librerías. Quieto con movimiento reducido o con la pausa del sitio (html[data-motion-paused]).
const { T, cases, motionOff } = window.LD
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const ease = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

// Corre una animación de `ms` que se detiene mientras el sitio está en pausa; devuelve false si otra la reemplazó (id distinto).
function anim(ms, getId, id, fn) {
  return new Promise((res) => {
    let el = 0, last = performance.now()
    const f = (n) => {
      if (getId() !== id) return res(false)
      const dt = n - last; last = n
      if (!motionOff()) el += dt
      fn(clamp(el / ms, 0, 1))
      el >= ms ? res(true) : requestAnimationFrame(f)
    }
    requestAnimationFrame(f)
  })
}

function setCaseImages(root, i, after) {
  const [b, a] = root.querySelectorAll('.cmp-media img')
  const c = cases[i]
  b.src = c.before; b.alt = c.altBefore
  a.src = c.after; a.alt = c.altAfter
  void after
}

// ---------- A y B: divisor que se arrastra ----------
export function initSplit(root) {
  const stage = root.querySelector('.cmp-stage'), h = root.querySelector('.cmp-handle')
  let pos = 50, run = 0
  const set = (v) => {
    pos = clamp(v, 0, 100)
    root.style.setProperty('--pos', pos + '%')
    const b = Math.round(pos)
    h.setAttribute('aria-valuenow', b)
    h.setAttribute('aria-valuetext', T.split(b, 100 - b))
  }
  const touch = () => { run++; root.dataset.touched = 'true' }
  const fromX = (x) => { const r = stage.getBoundingClientRect(); set(((x - r.left) / r.width) * 100) }
  stage.addEventListener('pointerdown', (e) => { touch(); stage.setPointerCapture(e.pointerId); fromX(e.clientX); h.focus({ preventScroll: true }) })
  stage.addEventListener('pointermove', (e) => { if (stage.hasPointerCapture(e.pointerId)) fromX(e.clientX) })
  h.addEventListener('keydown', (e) => {
    const k = { ArrowLeft: -4, ArrowDown: -4, ArrowRight: 4, ArrowUp: 4, PageDown: -12, PageUp: 12 }[e.key]
    if (k !== undefined) { e.preventDefault(); touch(); set(pos + k) }
    else if (e.key === 'Home') { e.preventDefault(); touch(); set(0) }
    else if (e.key === 'End') { e.preventDefault(); touch(); set(100) }
  })
  // casos
  const btns = root.parentElement.querySelectorAll('.cmp-case')
  btns.forEach((b, i) => b.addEventListener('click', () => {
    btns.forEach((x, j) => x.setAttribute('aria-pressed', j === i))
    root.dataset.sw = 'true'
    setTimeout(() => { setCaseImages(root, i); root.dataset.sw = 'false' }, 200)
  }))
  // una sola vez al cargar: barre de un lado al otro para que se entienda; nunca con movimiento reducido o pausa
  set(50)
  if (!motionOff()) {
    const id = run
    const go = async (from, to, ms) => anim(ms, () => run, id, (t) => set(from + (to - from) * ease(t)))
    setTimeout(async () => { if (run !== id) return; (await go(50, 84, 900)) && (await go(84, 16, 1500)) && (await go(16, 50, 900)) }, 900)
  }
}

// ---------- C: el espejo cambia solo de antes a después ----------
export function initMirror(root) {
  const stage = root.querySelector('.cmp-stage')
  const bB = root.querySelector('[data-to="0"]'), bA = root.querySelector('[data-to="1"]')
  const dots = root.querySelectorAll('.mir-dot'), pauseBtn = root.querySelector('.mir-pause'), live = root.querySelector('.mir-live')
  let p = 0, ci = 0, run = 0, auto = !motionOff()
  const draw = (v) => {
    p = v
    root.style.setProperty('--p', v)
    root.style.setProperty('--ro', Math.sin(Math.min(1, Math.max(0, v)) * Math.PI).toFixed(3))
    const on = v >= .5
    bB.setAttribute('aria-pressed', !on); bA.setAttribute('aria-pressed', on)
  }
  const swapCase = (i) => { ci = i; setCaseImages(root, i); dots.forEach((d, j) => d.setAttribute('aria-pressed', j === i)); root.querySelector('.mir-title').textContent = cases[i].title }
  const say = () => { if (live) live.textContent = T.showing(p >= .5 ? T.after : T.before) }
  const to = async (target, ms, id) => { const from = p; const ok = await anim(ms, () => run, id, (t) => draw(from + (target - from) * ease(t))); if (ok) say(); return ok }
  const wait = (ms, id) => anim(ms, () => run, id, () => {})
  const loop = async () => {
    const id = ++run
    while (run === id) {
      if (p < .5) { if (!(await wait(2200, id))) return; if (!(await to(1, 1400, id))) return }
      if (!(await wait(3200, id))) return
      if (!(await to(0, 800, id))) return
      swapCase((ci + 1) % cases.length)
    }
  }
  const setAuto = (v) => {
    auto = v; pauseBtn.textContent = v ? T.pause : T.play; pauseBtn.setAttribute('aria-pressed', !v)
    v ? loop() : run++
  }
  pauseBtn.addEventListener('click', () => setAuto(!auto))
  const manual = (target) => { run++; auto = false; pauseBtn.textContent = T.play; pauseBtn.setAttribute('aria-pressed', 'true'); const id = run; motionOff() ? (draw(target), say()) : to(target, 900, id) }
  bB.addEventListener('click', () => manual(0)); bA.addEventListener('click', () => manual(1))
  dots.forEach((d, i) => d.addEventListener('click', () => { run++; auto = false; pauseBtn.textContent = T.play; pauseBtn.setAttribute('aria-pressed', 'true'); swapCase(i); draw(p) }))
  stage.addEventListener('click', () => manual(p >= .5 ? 0 : 1))
  swapCase(0)
  if (auto) { draw(0); loop() } else { draw(1); pauseBtn.textContent = T.play; pauseBtn.setAttribute('aria-pressed', 'true') }
}

// ---------- marcado (en el sitio sería JSX) ----------
const arrows = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 7-5 5 5 5M15 7l5 5-5 5"/></svg>'
export function splitHTML() {
  const c = cases[0]
  return `<div class="cmp-wrap"><div class="cmp" role="group" aria-label="${T.region}"><div class="cmp-stage">
<div class="cmp-media"><img src="${c.before}" alt="${c.altBefore}" width="960" height="450"><img class="cmp-after" src="${c.after}" alt="${c.altAfter}" width="960" height="450"></div>
<div class="cmp-line" aria-hidden="true"></div>
<div class="cmp-handle" role="slider" tabindex="0" aria-label="${T.compare}" aria-orientation="horizontal" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-valuetext="${T.split(50, 50)}">${arrows}</div>
<span class="cmp-tag cmp-tag-b" aria-hidden="true">${T.before}</span><span class="cmp-tag cmp-tag-a" aria-hidden="true">${T.after}</span>
<span class="cmp-hint" aria-hidden="true">${T.drag}</span></div></div>
<div class="cmp-foot"><div class="cmp-cases" role="group" aria-label="${T.cases}">${cases.map((k, i) => `<button class="cmp-case" type="button" aria-pressed="${i === 0}">${k.title.replace(/\.$/, '')}</button>`).join('')}</div><p class="cmp-note">${T.note}</p></div></div>`
}
export function mirrorHTML() {
  const c = cases[0]
  return `<div class="cmp-wrap mir-wrap"><div class="cmp mir" role="group" aria-label="${T.region}"><div class="cmp-stage mir-stage">
<div class="cmp-media"><img src="${c.before}" alt="${c.altBefore}" width="960" height="450"><img class="cmp-after" src="${c.after}" alt="${c.altAfter}" width="960" height="450"></div><span class="mir-sweep" aria-hidden="true"></span></div>
<span class="mir-ring" aria-hidden="true"></span><img class="mir-star" src="assets/logo-star.png" alt="" width="64" height="64"></div>
<div class="mir-ctl"><div class="mir-seg" role="group" aria-label="${T.compare}"><button type="button" data-to="0" aria-pressed="true">${T.before}</button><button type="button" data-to="1" aria-pressed="false">${T.after}</button></div>
<button class="mir-pause" type="button" aria-pressed="false">${T.pause}</button></div>
<div class="mir-case"><span class="mir-dots" role="group" aria-label="${T.cases}">${cases.map((k, i) => `<button class="mir-dot" type="button" aria-label="${k.title}" aria-pressed="${i === 0}"></button>`).join('')}</span><span class="mir-title">${c.title}</span></div>
<p class="cmp-note">${T.note}</p><p class="mir-live" aria-live="polite" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)"></p></div>`
}
