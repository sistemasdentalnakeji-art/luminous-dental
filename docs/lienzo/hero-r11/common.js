// Lienzo r11: textos del sitio (content/home.ts y content/smileCases.ts) y utilidades. ?lang=es para ver en español.
const lang = new URLSearchParams(location.search).get('lang') === 'es' ? 'es' : 'en'
document.documentElement.lang = lang
const tel = '(702) 805-8688'
const T = {
  en: { pill: 'Las Vegas · Emergencies 24/7', lines: ['Emergency or', 'smile makeover,'], em: "we're here.",
    sub: 'General, cosmetic and orthodontic care with Dr. Christian Hahn. Call any hour for a dental emergency, or book your visit online.',
    main: 'Book an in-office consultation', ghost: `Call or text ${tel}`, more: 'See how a visit works', req: 'Request an appointment',
    before: 'Before', after: 'After', note: 'Individual results vary.', drag: 'Drag to compare', compare: 'Compare before and after',
    split: (b, a) => `Before ${b}% on the left, after ${a}% on the right`, pause: 'Pause', play: 'Play', cases: 'Cases', region: 'Smile gallery: before and after', showing: (s) => `Showing ${s}` },
  es: { pill: 'Las Vegas · Emergencias 24/7', lines: ['¿Emergencia o', 'cambio de sonrisa?'], em: 'Aquí estamos.',
    sub: 'Atención general, estética y de ortodoncia con el Dr. Christian Hahn. Llama a cualquier hora si es una emergencia dental, o reserva tu visita en línea.',
    main: 'Reserva una consulta en el consultorio', ghost: `Llama o escribe al ${tel}`, more: 'Mira cómo es tu visita', req: 'Solicitar cita',
    before: 'Antes', after: 'Después', note: 'Los resultados varían de una persona a otra.', drag: 'Arrastra para comparar', compare: 'Comparar el antes y el después',
    split: (b, a) => `Antes ${b}% a la izquierda, después ${a}% a la derecha`, pause: 'Pausar', play: 'Reproducir', cases: 'Casos', region: 'Galería de sonrisas: antes y después', showing: (s) => `Se muestra ${s}` },
}[lang]
const P = 'assets/'
const cases = {
  en: [
    { title: 'A different future.', before: P + 'caso1-antes.jpg', after: P + 'caso1-despues.jpg', altBefore: 'Close-up of a smile before treatment: worn, short, uneven front teeth with stained, chipped edges.', altAfter: 'The same smile after treatment: bright, even, smoothly shaped front teeth.' },
    { title: 'No longer hidden.', before: P + 'caso2-antes.jpg', after: P + 'caso2-despues.jpg', altBefore: 'Close-up of a smile before treatment: chipped, uneven teeth with gaps and dark spots.', altAfter: 'The same smile after treatment: bright, evenly aligned, natural-looking front teeth.' },
  ],
  es: [
    { title: 'Un futuro distinto.', before: P + 'caso1-antes.jpg', after: P + 'caso1-despues.jpg', altBefore: 'Primer plano de una sonrisa antes del tratamiento: dientes frontales desgastados, cortos y disparejos, con bordes manchados y astillados.', altAfter: 'La misma sonrisa después del tratamiento: dientes frontales luminosos, parejos y con una forma suave.' },
    { title: 'Ya sin esconderla.', before: P + 'caso2-antes.jpg', after: P + 'caso2-despues.jpg', altBefore: 'Primer plano de una sonrisa antes del tratamiento: dientes astillados y disparejos, con espacios y manchas oscuras.', altAfter: 'La misma sonrisa después del tratamiento: dientes frontales luminosos, bien alineados y de aspecto natural.' },
  ],
}[lang]
const pinSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>'
const arrow = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
const phone = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>'
const chev = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>'
document.getElementById('hdr').innerHTML = `<img src="assets/logo.webp" alt="Luminous Dental"><nav><span>Home</span><span>Services</span><span>Benefits</span><span>Contact</span><span>About</span><span>More</span></nav><span class="req">${T.req}</span><span class="burger" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg></span>`
document.getElementById('copy').innerHTML = `<a class="hx-pill" href="#"> ${pinSvg}${T.pill}</a>
<h1>${T.lines.map((l) => `<span class="hx-ln">${l}</span>`).join('')}<em>${T.em}</em></h1>
<p class="hx-sub">${T.sub}</p>
<div class="hx-actions"><a class="hx-btn hx-btn-main" href="#">${T.main}<span class="hx-bub">${arrow}</span></a><a class="hx-btn hx-btn-ghost" href="#">${T.ghost}<span class="hx-bub">${phone}</span></a></div>
<a class="hx-more" href="#">${T.more}${chev}</a>`
window.LD = { T, cases, lang, motionOff: () => matchMedia('(prefers-reduced-motion:reduce)').matches || document.documentElement.hasAttribute('data-motion-paused') }
