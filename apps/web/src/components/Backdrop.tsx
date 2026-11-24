// @ts-nocheck (portado tal cual desde el diseño aprobado y probado; código de canvas simple)
import { useEffect, useRef } from 'react'

// Fondo nocturno del diseño del dueño: degradados azules CSS + estrellas que respiran con una estrella fugaz cada 10 s aprox. (canvas 2D).
// 30 fps, en pausa cuando la pestaña está oculta; un solo cuadro quieto con movimiento reducido.
export function Backdrop() {
  const skyRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const stop: Array<() => void> = []
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const CAP = 1400; // el canvas nunca cubre más de estos px de alto (mantiene ligeras las vistas altas)
    // La malla WebGL (azules lentos) se quitó el 23-11-2026 (r5): nunca llegó a ocultarse bien con CSS y seguía dibujando a 30 fps. El azul de la noche lo dan los degradados CSS de .backdrop.
    // 2) estrellas que respiran + una estrella fugaz cada 10 s aprox. (de NightSky.tsx del dueño; un solo cuadro quieto con movimiento reducido)
    const canvas = skyRef.current;
    const ctx = canvas && canvas.getContext('2d');
    if (ctx) {
      const TINTS = ['255,255,255', '214,236,255', '255,244,222'];
      let w = 0, h = 0, stars = [], meteor = null, raf = 0, last = 0;
      let nextMeteor = performance.now() + 4000 + Math.random() * 3000;
      const make = (W, H) => Array.from({ length: Math.round(Math.min(260, (W * H) / 6500)) }, () => {
        const bright = Math.random() < 0.08;
        return { x: Math.random() * W, y: Math.random() * H, r: bright ? 1 + Math.random() * 0.7 : 0.35 + Math.random() * 0.65,
          base: bright ? 0.55 + Math.random() * 0.3 : 0.18 + Math.random() * 0.35, amp: Math.random() < 0.17 ? 0.85 : 0.25 + Math.random() * 0.2,
          speed: (Math.PI * 2) / (3500 + Math.random() * 6500), phase: Math.random() * Math.PI * 2,
          tint: TINTS[Math.random() < 0.7 ? 0 : Math.random() < 0.6 ? 1 : 2] };
      });
      const draw = (now) => {
        ctx.clearRect(0, 0, w, h);
        for (const s of stars) {
          const tw = reduce ? 0 : (Math.sin(now * s.speed + s.phase) + 1) / 2;
          const a = s.base * (1 - s.amp * tw);
          if (a < 0.02) continue;
          ctx.fillStyle = 'rgba(' + s.tint + ',' + a + ')';
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, 6.2832); ctx.fill();
          if (s.r > 1) { ctx.fillStyle = 'rgba(' + s.tint + ',' + a * 0.12 + ')'; ctx.beginPath(); ctx.arc(s.x, s.y, s.r * 3.2, 0, 6.2832); ctx.fill(); }
        }
        if (meteor) {
          const m = meteor, t = m.life / m.dur, fade = Math.sin(Math.PI * t);
          const hx = m.x + m.vx * m.life, hy = m.y + m.vy * m.life, sp = Math.hypot(m.vx, m.vy);
          const tx = hx - (m.vx / sp) * m.len, ty = hy - (m.vy / sp) * m.len;
          const g = ctx.createLinearGradient(hx, hy, tx, ty);
          g.addColorStop(0, 'rgba(255,250,235,' + 0.85 * fade + ')'); g.addColorStop(0.3, 'rgba(214,236,255,' + 0.35 * fade + ')'); g.addColorStop(1, 'rgba(214,236,255,0)');
          ctx.strokeStyle = g; ctx.lineWidth = 1.3; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(tx, ty); ctx.stroke();
        }
      };
      const resize = () => { w = innerWidth; h = Math.min(innerHeight, CAP); canvas.width = w; canvas.height = h; canvas.style.height = h + 'px'; stars = make(w, h); if (reduce) draw(0); };
      const tick = (now) => {
        raf = requestAnimationFrame(tick);
        if (now - last < 33 || document.documentElement.hasAttribute('data-motion-paused')) return;
        const dt = last ? Math.min(now - last, 100) : 0; last = now;
        if (!meteor && now >= nextMeteor) {
          const dir = Math.random() < 0.5 ? 1 : -1, speed = 0.55 + Math.random() * 0.25, ang = (18 + Math.random() * 14) * (Math.PI / 180);
          meteor = { x: dir > 0 ? Math.random() * w * 0.6 : w * 0.4 + Math.random() * w * 0.6, y: Math.random() * h * 0.35,
            vx: Math.cos(ang) * speed * dir, vy: Math.sin(ang) * speed, life: 0, dur: 900 + Math.random() * 400, len: 90 + Math.random() * 70 };
        }
        if (meteor) { meteor.life += dt; if (meteor.life >= meteor.dur) { meteor = null; nextMeteor = now + 10000 * (0.75 + Math.random() * 0.5); } }
        draw(now);
      };
      const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden && !reduce) { last = 0; raf = requestAnimationFrame(tick); } };
      resize(); addEventListener('resize', resize); document.addEventListener('visibilitychange', onVis);
      if (!reduce) raf = requestAnimationFrame(tick);
      stop.push(() => { cancelAnimationFrame(raf); removeEventListener('resize', resize); document.removeEventListener('visibilitychange', onVis); });
    }
    return () => stop.forEach((f) => f())
  }, [])
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="dots" />
      <canvas ref={skyRef} />
      <div className="grain" />
    </div>
  )
}
