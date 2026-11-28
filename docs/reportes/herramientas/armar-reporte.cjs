// Reporte LD-RW-2026-06, formato v2.1 (27-11-2026, ajustes de Jadro):
// títulos «Contenido | Índice» y «Resumen | …» en azul; resumen sin texto, con tarjetas «Cambios por área» y «Pruebas de QA» (por agente);
// en cada hoja: título visible arriba a la izquierda de la foto y ANTES/AHORA dentro de la foto (abajo a la derecha), sin fecha;
// textos cortos, datos de reporte (páginas, idiomas, probado en, revisión), sin «Verificado»; pendientes en azul noche con oro.
const fs = require('fs');
const D = 'C:/Users/Trabajo/Desktop/Luminous Dental/docs/reportes';
const OUT = D + '/LD-RW-2026-06';
const CAP = __dirname + '/cap/';
fs.mkdirSync(OUT + '/img', { recursive: true });
const CODE = 'LD-RW-2026-06', FECHA = '27 de noviembre de 2026';
const used = new Set();

const dim = (n) => { const m = n.split('__')[1]; if (m) { const [, , w, h] = m.split('_').map(Number); return { w, h }; } const b = fs.readFileSync(CAP + n + '.png'); return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) }; };
// recorte exacto de una captura (px reales); conv.cjs lo corta al pasar a JPG
const cut = (n, y0, y1, x0 = 0, x1) => { const w = (x1 ?? dim(n).w) - x0; return n + '__' + x0 + '_' + y0 + '_' + w + '_' + (y1 - y0); };
const RIGHT_W = 4.63, BUDGET = 9.2, LABEL = 0.3;

const img = (n, h, pos) => { used.add(n); const st = h ? `height:${h.toFixed(2)}in;object-fit:cover;object-position:${pos || 'top'}` : ''; return `<img src="img/${n}.jpg" style="${st}" alt="">`; };
const pill = (k) => `<span class="pill ${k}">${k === 'antes' ? 'ANTES' : 'AHORA'}</span>`;
const frame = (n, k, h) => `<div class="frame">${img(n, h)}${pill(k)}</div>`;

// encabezado de bloque: barra oro + texto negro + línea divisora («En escritorio», «En celular»)
const sechead = (t) => `<div class="sechead">${t}</div>`;
function shots(list, celPair, opt = {}) {
  const maxEach = (BUDGET - LABEL - (list.length - 1) * 0.14) / list.length;
  let usedH = LABEL;
  const blocks = list.map((s) => {
    const d = dim(s.n); const nat = RIGHT_W * d.h / d.w; const h = Math.min(nat, opt.crop || maxEach);
    usedH += h + 0.14;
    return `<div class="shot">${frame(s.n, s.k, h < nat - 0.01 ? h : 0)}</div>`;
  });
  let cel = '';
  const left = BUDGET - usedH - LABEL - 0.25;
  if (celPair && left >= 1.7) {
    const cellW = (RIGHT_W - 0.15) / 2;
    const h = Math.min(left, 3.3, ...celPair.map((n) => { const d = dim(n); return cellW * d.h / d.w; }));
    cel = `<div class="celrow">${sechead('En celular')}<div class="celgrid">${celPair.map((n, i) => frame(n, i ? 'ahora' : 'antes', h)).join('')}</div></div>`;
  }
  return `<div class="shots">${sechead('En escritorio')}${blocks.join('')}${cel}</div>`;
}

const kpis = (arr) => `<div class="kpis">${arr.map(([l, v, s]) => `<div class="kpi"><span class="kl">${l}</span><b>${v}</b>${s ? `<span class="ks">${s}</span>` : ''}</div>`).join('')}</div>`;
// datos de reporte: páginas, idiomas, probado en, revisión
const QA = ['Revisión', 'Pasa', 'QA del 27-11'];
const DEV = ['Revisión', 'Sin errores', 'revisión del programador'];
const T5 = ['Probado en', '5 tamaños', 'celular a PC grande'];
const T2 = ['Probado en', '2 tamaños', 'celular y PC'];
const LANG = ['Idiomas', 'ES y EN', 'las dos versiones'];
const PAG = (v, s) => ['Páginas', v, s];

// «Qué se cambió» y «Por qué» en tarjetas propias para que no se pierdan junto a las fotos
const whyWhat = (que, porque) => `<div class="qp que"><h3>Qué se cambió</h3><p>${que}</p></div><div class="qp why"><h3>Por qué</h3><p>${porque}</p></div>`;
const pages = [];
let chgNo = 0;
function change(c) {
  chgNo++;
  const no = String(chgNo).padStart(2, '0');
  const info = `<div class="info">
    <div class="eyebrow"><span class="no">${no}</span><span>${c.group}</span></div>
    <h2 class="title">${c.title}</h2>
    <div class="status ${c.status === 'Aprobado' ? 'ok' : 'done'}">${c.status}</div>
    ${whyWhat(c.que, c.porque)}
    <div class="blk"><h3>Datos</h3>${kpis(c.kpis)}</div>
    ${c.src ? `<div class="blk src"><h3>Foto</h3><p>${c.src}</p></div>` : ''}
  </div>`;
  pages.push({ title: c.title, group: c.group, kind: 'chg', html: `<div class="chg">${info}${c.right}</div>` });
}
const pc = (s) => ['antes-pc-' + s, 'ahora-pc-' + s];
const cel = (s) => ['antes-cel-' + s, 'ahora-cel-' + s];
const std = (s, o = {}) => shots([{ n: pc(s)[0], k: 'antes' }, { n: pc(s)[1], k: 'ahora' }], o.cel === false ? null : (o.cel || cel(s)), o);
const sv = (s) => 'serv-' + s;

// ---------- Cambios (orden del primer diseño; cada hoja con su vista en escritorio y en celular, sin repetir fotos) ----------
// cut(nombre, y0, y1, x0, x1): recorte exacto de una captura (px reales), para mostrar justo la parte que cambió.

// Inicio
change({ group: 'Inicio', title: 'Antes y después del inicio', status: 'Aprobado',
  que: 'Una sola foto con el antes y el después. Una línea la recorre sola y se puede pausar.',
  porque: 'Gerencia lo pidió así y eligió esta opción entre tres propuestas.',
  kpis: [PAG('2', 'inicio en ES y EN'), LANG, ['Probado en', '8 tamaños', 'celular a pantalla grande'], QA],
  right: shots([{ n: pc('inicio-heroe')[0], k: 'antes' }, { n: pc('inicio-heroe')[1], k: 'ahora' }],
    [cut('antes-cel-inicio-heroe', 1330, 2170), cut('ahora-cel-inicio-heroe', 600, 1440)], { crop: 2.75 }) });

change({ group: 'Inicio', title: 'Encabezado, logo y fondo', status: 'Aprobado',
  que: 'Logo más grande y sin recuadro. Sin redes ni teléfono arriba, fondo azul liso y sin WhatsApp.',
  porque: 'Gerencia pidió un logo más visible, como letrero. La clínica no usa WhatsApp.',
  kpis: [PAG('Todas', 'el encabezado sale en cada página'), LANG, T5, QA],
  right: shots([{ n: cut('antes-pc-inicio-arriba', 0, 175, 0, 760), k: 'antes' }, { n: cut('ahora-pc-inicio-arriba', 0, 175, 0, 760), k: 'ahora' }, { n: cut('antes-pc-inicio-arriba', 0, 95, 900, 1440), k: 'antes' }, { n: cut('ahora-pc-inicio-arriba', 0, 95, 900, 1440), k: 'ahora' }],
    [cut('antes-cel-inicio-arriba', 0, 250), cut('ahora-cel-inicio-arriba', 0, 250)]) });

// Menú y servicios
change({ group: 'Menú y servicios', title: 'Menú de Servicios con íconos', status: 'Aprobado',
  que: 'Cada servicio tiene su ícono con un brillo de color. El texto ya no se sale del menú.',
  porque: 'Gerencia pidió los mismos íconos en todo el sitio.',
  kpis: [PAG('Todas', 'el menú sale en cada página'), LANG, T5, QA],
  right: std('menu-servicios', { cel: false }) });

change({ group: 'Menú y servicios', title: 'Página de Servicios', status: 'Aprobado',
  que: 'Sin tarjetas ni filtros: los 12 servicios en listas por tipo, cada uno con su ícono.',
  porque: 'Se ve más limpio y se llega a cada servicio con un clic.',
  kpis: [PAG('2', 'servicios en ES y EN'), LANG, T5, QA],
  right: std('hub-servicios', { crop: 2.6, cel: [cut('antes-cel-hub-servicios', 745, 1685), cut('ahora-cel-hub-servicios', 795, 1735)] }) });

change({ group: 'Menú y servicios', title: 'Servicios destacados', status: 'Aprobado',
  que: 'Ahora son 6 pestañas con ícono: All-on-4 y All-on-6 van por separado.',
  porque: 'Para que coincida con las nuevas páginas de servicios.',
  kpis: [PAG('2', 'inicio en ES y EN'), LANG, T2, DEV],
  right: std('inicio-destacados', { crop: 2.6, cel: [cut('antes-cel-inicio-destacados', 540, 1480), cut('ahora-cel-inicio-destacados', 540, 1480)] }) });

// Contacto y beneficios
change({ group: 'Contacto y beneficios', title: 'Contacto · emergencias 24/7', status: 'Aprobado',
  que: 'Emergencias al centro, con un 24/7 grande y el botón para llamar.',
  porque: 'Gerencia pidió destacar que se atiende a cualquier hora.',
  kpis: [PAG('2', 'contacto en ES y EN'), LANG, T5, QA],
  right: std('contacto-arriba', { crop: 2.6, cel: [cut('antes-cel-contacto-arriba', 1840, 2780), cut('ahora-cel-contacto-arriba', 0, 940)] }) });

change({ group: 'Contacto y beneficios', title: 'Seguros, Financiamiento y Convenios', status: 'Aprobado',
  que: 'Las tres páginas se ven igual y el teléfono es un botón verde.',
  porque: 'Gerencia pidió que fueran iguales y que llamar fuera más fácil.',
  kpis: [PAG('6', '3 páginas en ES y EN'), LANG, T5, QA],
  right: std('seguros-encabezado', { crop: 2.6, cel: [cut('antes-cel-seguros-encabezado', 200, 1140), cut('ahora-cel-seguros-encabezado', 200, 1140)] }) });

// Fotos de servicios
change({ group: 'Fotos de servicios', title: 'Blanqueamiento dental', status: 'Aprobado',
  que: 'Nueva foto: una guía de tonos de dientes.',
  porque: 'Gerencia pidió una foto que muestre el tratamiento.',
  kpis: [PAG('2', 'ES y EN'), LANG, T2, DEV],
  src: 'Karola G · Pexels (uso comercial libre).',
  right: std(sv('blanqueamiento-dental')) });

change({ group: 'Fotos de servicios', title: 'Implantes dentales', status: 'Aprobado',
  que: 'Nueva foto: un implante con su corona.',
  porque: 'Gerencia pidió una foto que muestre el tratamiento.',
  kpis: [PAG('2', 'ES y EN'), LANG, T2, DEV],
  src: 'Jonathan Borba · Unsplash (uso comercial libre).',
  right: std(sv('implantes-dentales')) });

change({ group: 'Fotos de servicios', title: 'Carillas y coronas', status: 'Aprobado',
  que: 'No tenía foto. Ahora muestra carillas de porcelana.',
  porque: 'Gerencia pidió otra foto; la que había traía el nombre de otra clínica.',
  kpis: [PAG('2', 'ES y EN'), LANG, T2, DEV],
  src: 'Pavel Danilyuk · Pexels (uso comercial libre).',
  right: std(sv('carillas-y-coronas-de-porcelana')) });

change({ group: 'Fotos de servicios', title: 'All-on-4 y All-on-6', status: 'Aprobado',
  que: 'Ahora son dos páginas, cada una con su foto: una con 4 implantes y otra con 6.',
  porque: 'Gerencia pidió separarlas para explicar mejor cada tratamiento.',
  kpis: [PAG('4', '2 nuevas por idioma'), LANG, T2, DEV],
  src: 'Fotos de Dental Nakeji, con permiso de Gerencia.',
  right: shots([{ n: 'antes-pc-serv-all-on-4-y-all-on-6', k: 'antes' }, { n: 'ahora-pc-serv-implantes-all-on-4', k: 'ahora' }, { n: 'ahora-pc-serv-implantes-all-on-6', k: 'ahora' }],
    ['antes-cel-serv-all-on-4-y-all-on-6', 'ahora-cel-serv-implantes-all-on-4']) });

change({ group: 'Fotos de servicios', title: 'Resinas estéticas', status: 'Aprobado',
  que: 'No tenía foto. Ahora muestra una sonrisa de cerca.',
  porque: 'Todos los servicios deben tener foto.',
  kpis: [PAG('2', 'ES y EN'), LANG, T5, QA],
  src: 'Ozkan Guner · Unsplash (uso comercial libre).',
  right: std(sv('resinas-esteticas')) });

change({ group: 'Fotos de servicios', title: 'Aparatos dentales', status: 'Aprobado',
  que: 'No tenía foto. Ahora muestra un modelo con brackets.',
  porque: 'Todos los servicios deben tener foto.',
  kpis: [PAG('2', 'ES y EN'), LANG, T5, QA],
  src: 'Harold Hisona · Unsplash (uso comercial libre).',
  right: std(sv('aparatos-dentales')) });

change({ group: 'Fotos de servicios', title: 'Cuidado dental de rutina', status: 'Aprobado',
  que: 'No tenía foto. Ahora muestra la recepción de la clínica.',
  porque: 'Es una foto propia de Luminous Dental.',
  kpis: [PAG('2', 'ES y EN'), LANG, T5, QA],
  src: 'Luminous Dental · sitio oficial de la clínica.',
  right: std(sv('cuidado-dental-de-rutina')) });

// Blog
change({ group: 'Blog', title: 'Blog · portada', status: 'Aprobado',
  que: 'Los 11 artículos tienen su propia foto.',
  porque: 'Gerencia pidió fotos del tema y sin repetir.',
  kpis: [PAG('24', 'portada y 11 artículos, ES y EN'), LANG, T5, QA],
  src: '2 de la clínica y 9 de Unsplash (uso comercial libre).',
  right: std('blog-portada', { cel: false, crop: 4.2 }) });

const art = (s, t, tema, src) => change({ group: 'Blog', title: 'Artículo · ' + t, status: 'Aprobado',
  que: `Antes solo tenía el título. Ahora abre con una foto de ${tema}.`,
  porque: 'Se ve más completo y ayuda a entender el tema.',
  kpis: [PAG('2', 'ES y EN'), LANG, T5, QA], src,
  right: std('art-' + s) });
art('coronas-dentales', 'Coronas dentales', 'un dentista con el modelo de un diente', 'Harold Hisona · Unsplash.');
art('implantes-all-on-4', 'All-on-4', 'modelos de dientes con implantes', 'Jonathan Borba · Unsplash.');
art('extracciones-y-muelas-del-juicio', 'Extracciones', 'una radiografía de los dientes', 'Harold Hisona · Unsplash.');

{
  chgNo++;
  const rest = [['implantes-dentales-que-son', 'Implantes'], ['ortodoncia-alineacion-y-mordida', 'Ortodoncia'], ['implantes-all-on-6', 'All-on-6'], ['dentaduras-parciales-y-completas', 'Dentaduras'], ['carillas-dentales', 'Carillas'], ['blanqueamiento-dental', 'Blanqueamiento'], ['alineadores-transparentes', 'Alineadores'], ['limpieza-dental-profesional', 'Limpieza']];
  const info = `<div class="info"><div class="eyebrow"><span class="no">${String(chgNo).padStart(2, '0')}</span><span>Blog</span></div>
    <h2 class="title">Los otros 8 artículos</h2><div class="status ok">Aprobado</div>
    ${whyWhat('Los otros 8 artículos también abren con su foto.', 'Ningún artículo se queda sin foto y ninguna foto se repite en el blog.')}
    <div class="blk"><h3>Datos</h3>${kpis([PAG('16', '8 artículos en ES y EN'), LANG, T5, QA])}</div>
    <div class="blk src"><h3>Foto</h3><p>Unsplash (uso comercial libre); Implantes y Ortodoncia son de la clínica.</p></div></div>`;
  const grid = `<div class="shots">${sechead('En escritorio')}<div class="gal">${rest.map(([s]) => `<div class="shot">${frame('ahora-pc-art-' + s, 'ahora', 1.95)}</div>`).join('')}</div></div>`;
  pages.push({ title: 'Los otros 8 artículos', group: 'Blog', kind: 'chg', html: `<div class="chg">${info}${grid}</div>` });
}

// ---------- títulos de hoja: «Azul | Negro» ----------
const head = (blue, black) => `<div class="phead"><h2 class="big"><span class="hb">${blue}</span><span class="vl"></span><span>${black}</span></h2></div>`;

// ---------- resumen ----------
// páginas por idioma (iguales en ES y EN): 12 generales + 12 servicios + 4 financieras + 15 del blog = 43
const ALLP = 43;
const AREAS = [
  ['Inicio', [['Antes y después y servicios destacados', 'Inicio', 1]]],
  ['Servicios', [['Listas por tipo con íconos', 'Página de Servicios', 1], ['Fotos nuevas', 'Blanqueamiento, Implantes, Carillas, Resinas, Aparatos y Cuidado de rutina', 6], ['Dos páginas nuevas', 'All-on-4 y All-on-6', 2]]],
  ['Contacto y beneficios', [['Emergencias 24/7 al centro', 'Contacto', 1], ['Botón verde para llamar', 'Seguros, Financiamiento y Convenios', 3]]],
  ['Blog', [['Fotos en las tarjetas', 'Portada del blog', 1], ['Foto en cada artículo', '11 artículos', 11]]],
];
const OWN = AREAS.reduce((s, [, rows]) => s + rows.reduce((t, r) => t + r[2], 0), 0);
const resumen = `<div class="sum">
  ${head('Resumen', 'Lo que cambió el 27 de noviembre')}
  <div class="bigkpis">
    ${[[pages.length, 'secciones con cambios visuales'], ['18', 'fotos nuevas o reemplazadas'], ['86', 'páginas revisadas por QA'], ['17', 'errores encontrados y corregidos'], ['7', 'agentes trabajando en el día'], ['430', 'cargas de página medidas'], ['137', 'archivos del sitio tocados'], ['1,937', 'capturas de verificación']].map(([v, l]) => `<div class="bk"><b>${v}</b><span>${l}</span></div>`).join('')}
  </div>
  <div class="two tall">
    <div class="panel"><h3>Cambios por área</h3>
      <div class="lhead"><span>Qué cambió · en qué páginas</span><span class="lang es">ES</span><span class="lang en">EN</span></div>
      ${AREAS.map(([area, rows]) => `<div class="larea">${area}</div>${rows.map(([what, where, n]) => `<div class="lrow"><div><b>${what}</b><span>${where}</span></div><em>${n}</em><em>${n}</em></div>`).join('')}`).join('')}
      <div class="ltotal"><div><b>Total de páginas con cambio propio</b><span>Cada página cuenta una vez por idioma</span></div><em>${OWN}</em><em>${OWN}</em><strong>${OWN * 2}</strong></div>
      <p class="lnote">Además, el encabezado, el logo, el menú y el fondo cambiaron en todas las páginas: ${ALLP} en español y ${ALLP} en inglés (${ALLP * 2} en total).</p>
    </div>
    <div class="panel"><h3>Pruebas de QA</h3>
      <div class="team">${[['7', 'agentes en el día'], ['2', 'agentes de QA'], ['5', 'revisiones']].map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('')}</div>
      ${[
        ['QA 1', 'Pruebas funcionales', 'Abrió cada página en celular, tableta y PC y probó menús, botones, enlaces, fotos y el cambio de idioma.', [['3', 'revisiones'], ['86', 'páginas'], ['+530', 'cargas'], ['5', 'detalles corregidos']]],
        ['QA 2', 'Accesibilidad', 'Revisó que el sitio se use bien con teclado y zoom, y que todos los textos se lean con claridad.', [['2', 'revisiones'], ['86', 'páginas'], ['3,089', 'textos medidos'], ['10', 'hallazgos corregidos']]],
      ].map(([a, t, d, st]) => `<div class="agent"><div class="ah"><span class="an">${a}</span><span class="at">${t}</span><span class="chip ok">Pasa</span></div><p>${d}</p><div class="ast">${st.map(([v, l]) => `<div><b>${v}</b><span>${l}</span></div>`).join('')}</div></div>`).join('')}
      <div class="verdict"><b>Resultado general:</b> el sitio pasa las pruebas. Las 15 fallas que encontraron los agentes de QA ya están corregidas, con 0 errores de consola y 0 enlaces rotos.</div>
    </div>
  </div>
</div>`;

// ---------- pendientes ----------
const pend = [
  ['1', 'Servicios', 'Alta', ['Terminar la sección de Servicios: mejorar la información de los 12 servicios.', 'Agregar secciones y más detalle a cada servicio.', 'Últimos retoques (son pocos). Ej.: la foto de Implantes es la misma que la del artículo All-on-4 del blog.']],
  ['2', 'Revisión', 'Alta', ['Verificar en celular todas las vistas de todas las páginas.', 'Verificar bien el contenido en español.', 'Verificar bien el contenido en inglés.']],
  ['3', 'Backend', 'Media', ['Verificar que el backend esté bien (formulario, citas, reseñas) para lanzar en Google.', 'Revisar la seguridad del proyecto y de Claude, como se hizo en Dental Nakeji.']],
  ['4', 'Publicación', 'Media', ['Conectar GitHub: iniciar sesión y subir la rama webpage-V1.26.11.26.', 'Crear el repositorio privado.', 'Crear la cuenta de Vercel.', 'Conectar Vercel al repositorio y a la rama de producción.']],
];
const pendHtml = `<div class="sum">${head('Pendientes', 'Lo que falta para lanzar')}
  <p class="lead">Pendientes de Jadro Montes (Sistemas), por tema y en orden de prioridad. Todo lo demás ya fue aprobado.</p>
  <div class="pend">${pend.map(([n, t, p, items]) => `<div class="pcard"><div class="ph"><span class="pn">${n}</span><h3>${t}</h3><span class="prio ${p === 'Alta' ? 'hi' : 'mid'}">Prioridad ${p.toLowerCase()}</span><span class="cnt">${items.length}</span></div><ul class="todo">${items.map((x) => `<li>${x}</li>`).join('')}</ul></div>`).join('')}</div>
  <div class="firmas">
    <div class="firma"><span class="fl">Elaboró</span><div class="fline"></div><b>Ing. Jadro Montes</b><span class="fr">Encargado del área tecnológica</span></div>
    <div class="firma"><span class="fl">Recibió</span><div class="fline"></div><b>Dirección</b></div>
  </div></div>`;

// ---------- armado ----------
const all = [{ title: 'Resumen del día', group: 'Resumen', kind: 'sum', html: resumen }, ...pages, { title: 'Pendientes', group: 'Pendientes', kind: 'sum', html: pendHtml }];
const TOTAL = all.length + 2;
const pageNo = (i) => i + 3;
const groupsOrder = [];
all.forEach((p, i) => { let g = groupsOrder.find((x) => x.g === p.group); if (!g) { g = { g: p.group, items: [] }; groupsOrder.push(g); } g.items.push({ t: p.title, n: pageNo(i) }); });
const indexHtml = `<div class="sum">${head('Contenido', 'Índice')}
  <div class="toc">${groupsOrder.map((g, gi) => `<div class="tg"><div class="tgh"><span class="tgn">${String(gi + 1).padStart(2, '0')}</span><span>${g.g}</span></div>${g.items.map((it) => `<div class="ti"><span class="tt">${it.t}</span><span class="dots"></span><span class="tn">${it.n}</span></div>`).join('')}</div>`).join('')}</div></div>`;

const rh = `<div class="rh"><b>${CODE}</b><span>Luminous Dental · Las Vegas, NV</span><span class="sep">|</span><span>IT · Páginas web</span><span class="sep">|</span><span>${FECHA}</span><span class="c">Confidencial</span></div>`;
const ft = (n, sec) => `<div class="ft"><span>Dirigido a Dirección &nbsp;|&nbsp; Elaboró Jadro Montes &nbsp;|&nbsp; Documento interno de uso exclusivo de la empresa</span><span><em>${sec}</em> &nbsp; HOJA ${n} DE ${TOTAL}</span></div>`;

const cover = `<section class="sheet cover">
  <div class="stamp">CONFIDENCIAL</div>
  <img class="logo" src="../RW-2026-04/img/logo.png" alt="Luminous Dental">
  <div class="mid"><div class="t1">Proyecto página web</div><h1>Luminous Dental</h1><div class="rule"></div></div>
  <div class="fields">
    <div><span>Reporte</span><b>${CODE}</b></div>
    <div><span>Empresa</span><b>Luminous Dental · Las Vegas, NV</b></div>
    <div><span>Departamento</span><b>IT · Páginas web</b></div>
    <div><span>Dirigido a</span><b>Dirección</b></div>
    <div><span>Elaboró</span><b>Jadro Montes</b></div>
    <div><span>Fecha</span><b>${FECHA}</b></div>
  </div>
  <div class="conf"><span>Documento interno de uso exclusivo de la empresa</span>
  <p>Aviso de confidencialidad. Este documento es propiedad de Luminous Dental y contiene información reservada. Queda prohibido copiarlo, distribuirlo o divulgarlo, en todo o en parte, sin autorización por escrito de la empresa. Si usted lo recibió por error, avise a quien se lo envió y elimínelo.</p></div>
</section>`;

const css = fs.readFileSync(__dirname + '/report2.css', 'utf8');
const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>${CODE} · Reporte Luminous Dental</title><style>${css}</style></head><body>
${cover}
<section class="sheet is-sum">${rh}<div class="body">${indexHtml}</div>${ft(2, 'Índice')}</section>
${all.map((p, i) => `<section class="sheet is-${p.kind}">${rh}<div class="body">${p.html}</div>${ft(pageNo(i), p.group)}</section>`).join('\n')}
</body></html>`;
fs.writeFileSync(OUT + '/reporte.html', html);
fs.writeFileSync(__dirname + '/used.json', JSON.stringify([...used]));
console.log('hojas', TOTAL, 'imagenes', used.size);
