// Reloj de pasos de la figura (25-nov-2026): cuánto dura cada paso y cómo avanza el número t (0..max) de un paso al siguiente.
// t avanza LINEAL en el tiempo durante la transición; la aceleración y el rebote de lo que cae los pone fall() en engine.js. k es la misma marcha con curva suave (para la perilla).
export const TRANSIT = 1.2; // segundos que tarda la caída (o la subida) al cambiar de paso
export const DWELL = 3.5; // segundos por paso, con la caída incluida (la figura queda quieta unos 2.3 s)
export const DWELL_LAST = 5; // segundos en el resultado
export const dwellOf = (i, max) => (i === max ? DWELL_LAST : DWELL);
const smooth = (x) => x * x * (3 - 2 * x);

export function makeGlide(t0 = 0) {
  let from = t0, to = t0, t = t0, k = t0, el = 0, dur = TRANSIT, dir = 1;
  return {
    get t() { return t; },
    get k() { return k; },
    get to() { return to; },
    get dir() { return dir; },
    get moving() { return t !== to || k !== to; },
    aim(next) {
      if (next === to) return;
      from = t; to = next; el = 0; dir = next > t ? 1 : -1;
      dur = Math.min(1.8, TRANSIT + 0.35 * Math.max(0, Math.abs(to - from) - 1)); // saltar varios pasos tarda un poco más, con tope
    },
    snap(v) { from = to = t = k = v; el = 0; },
    // dt en segundos. Con `follow` (se está arrastrando la perilla) t sigue al puntero sin curva de caída.
    tick(dt, follow) {
      if (follow) { t += (to - t) * (1 - Math.exp(-dt / 0.08)); if (Math.abs(to - t) < 0.002) t = to; k = t; return; }
      el += dt;
      const p = Math.min(1, el / dur);
      t = p >= 1 ? to : from + (to - from) * p;
      k = p >= 1 ? to : from + (to - from) * smooth(p);
    },
  };
}
