// @ts-nocheck (portado tal cual desde el diseño aprobado y probado; código de canvas simple)
import { useEffect, useRef } from 'react'

// Fondo nocturno del diseño del dueño: azules lentos en WebGL (malla) + estrellas que respiran con una estrella fugaz cada 10 s aprox. (canvas 2D).
// Media resolución, 30 fps, en pausa cuando la pestaña está oculta; un solo cuadro quieto con movimiento reducido.
export function Backdrop() {
  const meshRef = useRef<HTMLCanvasElement>(null)
  const skyRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const stop: Array<() => void> = []
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const CAP = 1400; // los canvas nunca cubren más de estos px de alto (mantiene ligeras las vistas altas)
    // 1) malla nocturna: azules lentos en WebGL (de blue-meshy-background.tsx del dueño): media resolución, 30 fps, un solo cuadro quieto con movimiento reducido
    const mesh = meshRef.current;
    // La malla está oculta con display:none en site.css (19-11-2026): mientras lo esté, ni siquiera se inicia WebGL (sin shader, sin dibujar a 30 fps). Mostrarla de nuevo = quitar esa regla.
    const meshShown = !!mesh && getComputedStyle(mesh).display !== 'none';
    const gl = meshShown && mesh.getContext('webgl2', { alpha: true, premultipliedAlpha: true, antialias: false });
    if (gl) {
      const P = [[.039,.082,.161],[.043,.094,.18],[.047,.106,.2],[.051,.118,.224],[.055,.129,.251],[.063,.145,.282],[.071,.161,.314],[.082,.18,.349],[.094,.2,.388],[.106,.224,.431],[.122,.251,.478],[.137,.282,.525],[.153,.31,.569],[.169,.341,.616],[.184,.388,.678],[.204,.412,.69],[.227,.439,.69],[.29,.502,.737],[.36,.58,.8],[.42,.66,.86]];
      const cols = P.map((c) => 'vec3(' + c.join(',') + ')').join(',');
      const fs = `#version 300 es
    precision highp float;
    out vec4 outColor;
    uniform vec2 uResolution;
    uniform float uTime;
    #define NUM_COLORS ${P.length}
    vec3 seaColors[NUM_COLORS] = vec3[](${cols});
    vec3 permute(vec3 x){return mod(((x*34.0)+1.0)*x,289.0);}
    float noise2D(vec2 v){
      const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
      vec2 i=floor(v+dot(v,C.yy)); vec2 x0=v-i+dot(i,C.xx);
      vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
      vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1; i=mod(i,289.0);
      vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
      vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
      m=m*m; m=m*m;
      vec3 x=2.0*fract(p*C.www)-1.0; vec3 h=abs(x)-0.5; vec3 ox=floor(x+0.5); vec3 a0=x-ox;
      m*=1.792843-0.853734*(a0*a0+h*h);
      vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw;
      return 130.0*dot(m,g);
    }
    float fbm(vec2 st){float v=0.0,a=0.5,f=1.0;for(int i=0;i<5;i++){v+=a*noise2D(st*f);f*=2.0;a*=0.5;}return v;}
    void main(){
      vec2 uv=(gl_FragCoord.xy/uResolution.xy)*2.0-1.0; uv.x*=uResolution.x/uResolution.y; uv*=0.35;
      float t=uTime*0.035;
      float waveAmp=0.12+0.06*noise2D(vec2(t,27.7));
      uv.x+=waveAmp*sin(uv.y*3.0+t); uv.y+=waveAmp*sin(uv.x*3.0-t);
      float r=length(uv); float angle=atan(uv.y,uv.x);
      float swirl=0.45*(1.0-smoothstep(0.0,1.0,r));
      angle+=swirl*sin(t*2.0+r*3.0); uv=vec2(cos(angle),sin(angle))*r;
      float n=fbm(uv); n+=0.1*sin(t+n*3.0);
      float idx=clamp(0.5*(n+1.0),0.0,1.0)*float(NUM_COLORS-1);
      int lo=int(floor(idx)); int hi=min(lo+1,NUM_COLORS-1);
      vec3 color=mix(seaColors[lo],seaColors[hi],fract(idx));
      float alpha=smoothstep(0.0,6.0,idx);
      outColor=vec4(color*alpha,alpha);
    }`;
      const vs = '#version 300 es\nin vec2 aPosition;\nvoid main(){gl_Position=vec4(aPosition,0.0,1.0);}';
      const sh = (type, src) => { const o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); return gl.getShaderParameter(o, gl.COMPILE_STATUS) ? o : null; };
      const v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs);
      const prog = v && f && gl.createProgram();
      if (prog) {
        gl.attachShader(prog, v); gl.attachShader(prog, f); gl.linkProgram(prog);
        if (gl.getProgramParameter(prog, gl.LINK_STATUS)) {
          gl.useProgram(prog); gl.clearColor(0, 0, 0, 0);
          const vao = gl.createVertexArray(); gl.bindVertexArray(vao);
          gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
          const a = gl.getAttribLocation(prog, 'aPosition'); gl.enableVertexAttribArray(a); gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);
          const uRes = gl.getUniformLocation(prog, 'uResolution'), uTime = gl.getUniformLocation(prog, 'uTime');
          const offset = Math.random() * 1000, t0 = performance.now(); let raf = 0, last = 0;
          const segs = []; // canvas extra que repiten la malla (en espejo) a lo largo de una página alta, para que toda la página tenga la misma noche
          const draw = (now) => { gl.clear(gl.COLOR_BUFFER_BIT); gl.uniform2f(uRes, mesh.width, mesh.height); gl.uniform1f(uTime, offset + (now - t0) / 1000); gl.drawArrays(gl.TRIANGLES, 0, 6); for (const c of segs) c.getContext('2d').drawImage(mesh, 0, 0); };
          const layout = () => {
            const n = Math.max(1, Math.ceil(innerHeight / CAP));
            while (segs.length < n - 1) { const c = document.createElement('canvas'); c.className = 'meshy'; c.style.height = CAP + 'px'; mesh.parentNode.insertBefore(c, mesh.nextSibling); segs.push(c); }
            while (segs.length > n - 1) segs.pop().remove();
            segs.forEach((c, i) => { c.style.top = (i + 1) * CAP + 'px'; c.style.transform = i % 2 === 0 ? 'scaleY(-1)' : ''; c.width = mesh.width; c.height = mesh.height; });
            mesh.style.height = n > 1 ? CAP + 'px' : '';
            mesh.classList.toggle('tail', n === 1);
          };
          const size = () => { mesh.width = Math.max(1, Math.round(innerWidth * 0.5)); mesh.height = Math.max(1, Math.round(Math.min(innerHeight, CAP) * 0.5)); gl.viewport(0, 0, mesh.width, mesh.height); layout(); if (reduce) draw(t0); };
          const tick = (now) => { raf = requestAnimationFrame(tick); if (now - last < 33 || document.documentElement.hasAttribute('data-motion-paused')) return; last = now; draw(now); };
          // Contexto gráfico perdido (poca memoria, reinicio del controlador): se deja de dibujar; la página conserva su color de noche liso.
          const onLost = (e) => { e.preventDefault(); cancelAnimationFrame(raf); }
          mesh.addEventListener('webglcontextlost', onLost);
          const onVis = () => { cancelAnimationFrame(raf); if (!document.hidden && !reduce) raf = requestAnimationFrame(tick); };
          size(); if (!reduce) raf = requestAnimationFrame(tick);
          addEventListener('resize', size); document.addEventListener('visibilitychange', onVis);
          stop.push(() => { mesh.removeEventListener('webglcontextlost', onLost); segs.forEach((c) => c.remove()); cancelAnimationFrame(raf); removeEventListener('resize', size); document.removeEventListener('visibilitychange', onVis); });
        }
      }
    }
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
      <canvas className="meshy" ref={meshRef} />
      <canvas ref={skyRef} />
      <div className="grain" />
    </div>
  )
}
