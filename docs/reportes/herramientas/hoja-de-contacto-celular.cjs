// Hoja de contacto de capturas de celular con regla de alturas (px reales de la captura), para elegir recortes.
const { chromium } = require('C:/Users/Trabajo/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright-core');
const fs = require('fs');
const sets = JSON.parse(process.argv[2]); const out = process.argv[3];
const dir = __dirname.split('\\').join('/');
(async () => {
  const W = 170, S = W / 750;
  const cols = sets.map((n) => { const b = fs.readFileSync(dir + '/cap/' + n + '.png'); return { n, h: b.readUInt32BE(20) }; });
  const H = Math.max(...cols.map((c) => c.h)) * S + 40;
  const ticks = []; for (let y = 0; y < H / S; y += 200) ticks.push(`<div style="position:absolute;left:0;right:0;top:${30 + y * S}px;border-top:1px solid rgba(255,0,0,.55);font:9px Arial;color:red">${y}</div>`);
  const html = `<body style="margin:0;background:#fff"><div style="position:relative;display:flex;gap:10px;padding:30px 30px 10px">${ticks.join('')}${cols.map((c) => `<div style="width:${W}px"><div style="position:absolute;top:4px;font:9px Arial;width:${W}px;overflow:hidden">${c.n.replace(/-cel-/, ' ')}</div><img src="file:///${dir}/cap/${c.n}.png" style="width:${W}px;display:block"></div>`).join('')}</div></body>`;
  fs.writeFileSync(dir + '/m.html', html);
  const br = await chromium.launch({ channel: 'msedge' });
  const p = await br.newPage({ viewport: { width: 30 + cols.length * (W + 10) + 30, height: Math.ceil(H) + 20 } });
  await p.goto('file:///' + dir + '/m.html'); await p.waitForTimeout(500);
  await p.screenshot({ path: out, fullPage: true }); await br.close();
})();
