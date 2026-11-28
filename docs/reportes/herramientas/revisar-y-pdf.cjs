const { chromium } = require('C:/Users/Trabajo/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright-core');
const R = 'C:/Users/Trabajo/Desktop/Luminous Dental/docs/reportes/LD-RW-2026-06/reporte.html';
(async () => {
  const br = await chromium.launch({ channel: 'msedge' });
  const p = await br.newPage({ viewport: { width: 900, height: 1100 }, deviceScaleFactor: 1 });
  await p.goto('file:///' + R, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(800);
  // cuánto sobra (negativo) o se pasa (positivo) cada hoja: lo más bajo del cuerpo contra el pie
  const info = await p.evaluate(() => [...document.querySelectorAll('.sheet')].map((s, i) => {
    const ft = s.querySelector('.ft'); if (!ft) return 0;
    let max = 0; s.querySelectorAll('.body *').forEach((e) => { const b = e.getBoundingClientRect().bottom; if (b > max) max = b; });
    return Math.round(max - ft.getBoundingClientRect().top);
  }));
  const fonts = await p.evaluate(() => [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family + ' ' + f.style).join(', '));
  console.log('sobra/pasa por hoja:', JSON.stringify(info));
  console.log('fuentes:', fonts);
  const sheets = await p.$$('.sheet');
  for (let i = 0; i < sheets.length; i++) await sheets[i].screenshot({ path: __dirname + '/prev-' + (i + 1) + '.png' });
  if (process.argv[2]) { await p.pdf({ path: process.argv[2], format: 'Letter', printBackground: true, margin: { top: 0, bottom: 0, left: 0, right: 0 } }); console.log('pdf ok'); }
  await br.close();
})();
