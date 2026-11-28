// Pasa a JPG (calidad 82) las capturas que usa el reporte. Una clave «nombre__x_y_w_h» se corta a ese recuadro.
const { chromium } = require('C:/Users/Trabajo/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright-core');
const fs = require('fs');
const dir = __dirname + '/cap/';
const out = 'C:/Users/Trabajo/Desktop/Luminous Dental/docs/reportes/LD-RW-2026-06/img/';
(async () => {
  const br = await chromium.launch({ channel: 'msedge' });
  const used = require('./used.json');
  const p = await (await br.newContext()).newPage();
  for (const key of used) {
    const [base, box] = key.split('__');
    const f = dir + base + '.png';
    if (!fs.existsSync(f)) { console.log('FALTA', key); continue; }
    const b = fs.readFileSync(f);
    const w = b.readUInt32BE(16), h = b.readUInt32BE(20);
    await p.setViewportSize({ width: w, height: Math.min(h, 16000) });
    await p.goto('file:///' + f);
    const clip = box ? (([x, y, cw, ch]) => ({ x, y, width: cw, height: ch }))(box.split('_').map(Number)) : undefined;
    await p.screenshot({ path: out + key + '.jpg', type: 'jpeg', quality: 82, clip, fullPage: !!clip });
  }
  await br.close();
  console.log('listo', used.length);
})();
