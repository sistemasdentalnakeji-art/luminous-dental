const { chromium } = require('C:/Users/Trabajo/AppData/Roaming/npm/node_modules/@playwright/cli/node_modules/playwright-core');
const fs = require('fs'); const path = require('path');
const OUT = process.argv[2]; fs.mkdirSync(OUT, { recursive: true });
const BASES = { antes: 'http://localhost:5901', ahora: 'http://localhost:5902' };
const SERV = ['dental-cleaning','wisdom-tooth-removal','dental-implants','teeth-whitening','invisalign-and-braces','dentures-and-bridges','routine-dental-care','porcelain-veneers-and-crowns','cosmetic-bonding','all-on-4-implants','all-on-6-implants','dental-appliances'];
const FREEZE = `*{animation-play-state:paused!important}`; const HIDE = `header.hbar,.hbar{visibility:hidden!important}`;
async function settle(p){ await p.evaluate(async()=>{ for(let y=0;y<document.body.scrollHeight;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60));} window.scrollTo(0,0); }); await p.waitForTimeout(500);
  await p.evaluate(()=>Promise.race([Promise.all([...document.images].map(i=>{i.loading='eager';return i.complete?1:new Promise(r=>{i.onload=i.onerror=r;});})),new Promise(r=>setTimeout(r,4000))])); }
async function shot(p, sel, name, opt={}){ const el = p.locator(sel).first(); if(!(await el.count())){ console.log('NO', name, sel); return; }
  await p.addStyleTag({content:HIDE}); await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(900);
  const b = await el.boundingBox(); const pad = opt.pad ?? 16;
  const full = await p.evaluate(()=>({w:document.documentElement.scrollWidth,h:document.documentElement.scrollHeight,y:window.scrollY}));
  const clip = { x:0, y: Math.max(0,b.y+full.y-pad), width: Math.min(full.w, p.viewportSize().width), height: Math.min(b.height+pad*2, opt.maxH||2200) };
  await p.screenshot({ path: path.join(OUT,name+'.png'), clip, fullPage:true }); console.log('ok', name, Math.round(clip.height)); }
(async()=>{
  console.log('launch');const br = await chromium.launch({ channel:'msedge' });console.log('launched');
  for (const [ver, base] of Object.entries(BASES)) for (const [dev,vp] of [['pc',{width:1440,height:900}],['cel',{width:375,height:812}]]) {
    const ctx = await br.newContext({ viewport: vp, reducedMotion:'reduce', deviceScaleFactor: dev==='pc'?1:2 });
    const p = await ctx.newPage(); await p.addInitScript(()=>{try{localStorage.setItem('lang','es')}catch{}});
    const go = async (u)=>{ await p.goto(base+u,{waitUntil:'load',timeout:20000}).catch(()=>{}); await p.addStyleTag({content:FREEZE}); await settle(p); };
    const N = (s)=>`${ver}-${dev}-${s}`;
    // inicio
    await go('/es'); await p.evaluate(()=>scrollTo(0,0)); await p.screenshot({path:path.join(OUT,N('inicio-arriba')+'.png'),clip:{x:0,y:0,width:vp.width,height:vp.height}}); if(dev==='pc'){ const m=p.locator('.hbar button, .hbar a').filter({hasText:/Servicios/}).first(); try{await m.click({timeout:3000});await p.waitForTimeout(900);await p.screenshot({path:path.join(OUT,N('menu-servicios')+'.png'),clip:{x:0,y:0,width:vp.width,height:620}});await p.keyboard.press('Escape');}catch(e){console.log('menu fail')} } await shot(p,'.hx',N('inicio-heroe'),{pad:0});
    await shot(p,'.featured',N('inicio-destacados'));
    // servicios hub
    await go('/es/servicios'); await shot(p,'main',N('hub-servicios'),{maxH:2400});
    // servicios
    const hrefs = await p.$$eval('a[href^="/es/servicios/"]', as=>[...new Set(as.map(a=>a.getAttribute('href')))]);
    fs.writeFileSync(path.join(OUT,ver+'-hrefs.json'), JSON.stringify(hrefs));
    for (const h of hrefs) { await go(h); await shot(p,'.service-hero',N('serv-'+h.split('/').pop()),{maxH:1400}); }
    // contacto
    await go('/es/contacto'); await shot(p,'main',N('contacto-arriba'),{maxH:1900});
    // blog
    await go('/es/blog'); await shot(p,'section.blog',N('blog-portada'),{maxH:1800});
    const bl = await p.$$eval('a[href^="/es/blog/"]', as=>[...new Set(as.map(a=>a.getAttribute('href')))]);
    fs.writeFileSync(path.join(OUT,ver+'-bloglinks.json'), JSON.stringify(bl));
    for (const h of bl.slice(0,40)) { if(h.split('/').length<4) continue; await go(h); if(await p.locator('.art-hero').count()){ await shot(p,'.art-hero',N('art-'+h.split('/').pop()),{maxH:1200}); } }
    // beneficios
    await go('/es/seguros'); await shot(p,'.bh, section.pg',N('seguros-encabezado'),{maxH:1100});
    await ctx.close();
  }
  await br.close();
})();
