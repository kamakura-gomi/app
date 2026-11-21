import { CATEGORIES, ITEMS, DISTRICTS, CONTACTS, SOURCE_NOTE, TOWNS } from './data.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ITEM = Object.fromEntries(ITEMS.map(i => [i.id, i]));
const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const ORD = ['', '1st', '2nd', '3rd', '4th'];
const MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { } },
};

/* ---------------- Schedule logic ---------------- */
let sched = store.get('sched', null); // copy of a DISTRICTS entry (+ idx), possibly adjusted

function rule(cat, s = sched) {
  if (!s) return null;
  switch (CATEGORIES[cat].sched) {
    case 'comb': return { w: s.comb };
    case 'paper': return { w: [s.paper] };
    case 'pet': return { w: [s.pet] };
    case 'plant': return { w: [s.plant] };
    case 'cans': return { w: [s.cans] };
    case 'pcp': return { w: [s.pcp] };
    case 'monthly': return { m: s.md, nth: s.nc };
    case 'pg': return { m: s.md, nth: s.pg };
    default: return null;
  }
}
function occurs(r, d) {
  if (!r) return false;
  if (r.w) return r.w.includes(d.getDay());
  return d.getDay() === r.m && Math.ceil(d.getDate() / 7) === r.nth;
}
const SCHED_CATS = Object.keys(CATEGORIES).filter(c => CATEGORIES[c].sched);
function catsOn(d) { return SCHED_CATS.filter(c => occurs(rule(c), d)); }
function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
function startOfDay(d) { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
function nextDate(cat) {
  const r = rule(cat); if (!r) return null;
  const now = new Date();
  let d = startOfDay(now);
  if (now.getHours() * 60 + now.getMinutes() > 8 * 60 + 30) d = addDays(d, 1); // today's pickup has passed
  for (let i = 0; i < 70; i++, d = addDays(d, 1)) if (occurs(r, d)) return d;
  return null;
}
function fmtDate(d) {
  const t = startOfDay(new Date()), diff = Math.round((d - t) / 864e5);
  const base = `${DOW[d.getDay()]} ${d.getDate()} ${MON[d.getMonth()]}`;
  return diff === 0 ? `Today (${base})` : diff === 1 ? `Tomorrow (${base})` : base;
}
function nextText(cat) {
  if (!CATEGORIES[cat].sched) return '';
  if (!sched) return `<div class="next muted small">Set your district in <a href="#" data-go="schedule">Days</a> to see the pickup date.</div>`;
  const d = nextDate(cat);
  return d ? `<div class="next">🗓️ Next pickup: ${fmtDate(d)}, by 8:30 a.m.</div>` : '';
}
function ruleText(cat) {
  const r = rule(cat); if (!r) return '';
  return r.w ? r.w.map(w => DOW[w]).join(' & ') : `${ORD[r.nth]} ${DOW[r.m]} of the month`;
}

/* ---------------- Rendering helpers ---------------- */
function badge(cat, sm) {
  const c = CATEGORIES[cat];
  return `<div class="badge${sm ? ' sm' : ''}" style="background:${c.color}"><span class="bi">${c.icon}</span><div><b>${esc(c.en)}</b><small>${esc(c.ja)}</small></div></div>`;
}
function tag(cat) { const c = CATEGORIES[cat]; return `<span class="tag" style="background:${c.color}">${esc(c.short)} ${esc(c.ja)}</span>`; }
function catDetails(cat, open) {
  const c = CATEGORIES[cat];
  return `<details class="card" ${open ? 'open' : ''}><summary>How to put out ${esc(c.en)}</summary>
    <p><b>Bag:</b> ${esc(c.bag)}</p><ul class="steps">${c.howto.map(h => `<li>${esc(h)}</li>`).join('')}</ul>
    ${sched && c.sched ? `<p class="small muted">Your days: ${ruleText(cat)}</p>` : ''}</details>`;
}

function itemCard(it, conf) {
  const cat = it.cat;
  let h = `<div class="card item"><h2>${esc(it.en)}</h2><div class="ja">${esc(it.ja)}</div>`;
  if (conf != null) h += `<div class="conf">${conf >= 0.45 ? '✓ Good match' : '⚠️ Not sure — check the other options below'} · ${Math.round(conf * 100)}% sure of the bin</div>`;
  if (it.special === 'pet') { h += petPanel(); h += '</div>'; return h; }
  h += badge(cat) + nextText(cat);
  if (it.note) h += `<div class="note">${esc(it.note)}</div>`;
  if (it.house) h += `<div class="house">★ House rule</div>`;
  if (!['large', 'not_city', 'plant'].includes(cat)) h += `<p class="small muted">📏 Is it 50 cm or more in any direction? Then it is usually <b>Large Waste</b> (reservation + sticker).</p>`;
  h += '</div>' + catDetails(cat);
  return h;
}

/* ---------------- PET bottle checker ---------------- */
let petState = { clear: true, white: false };
function petPanel() {
  return `<div class="pet" id="pet">
    <h3>🧴 PET bottle — check before you throw it</h3>
    ${$('#pet-svg').innerHTML}
    <div class="q"><div>1. Is the bottle clear (colourless)?</div>
      <div class="seg" data-k="clear"><button data-v="1">Yes, clear</button><button data-v="0">No, coloured</button></div></div>
    <div class="q"><div>2. Is the screw-top / neck part white or opaque (not clear PET)?</div>
      <div class="seg" data-k="white"><button data-v="0">No, clear neck</button><button data-v="1">Yes, white top</button></div></div>
    <div class="verdict" id="pet-verdict"></div>
  </div>`;
}
function petVerdict() {
  const s = petState;
  let h;
  if (!s.clear) {
    h = badge('combustible') + nextText('combustible') +
      `<div class="note">Coloured PET bottles can’t be recycled in Japan → put the whole bottle in a paid bag as <b>Combustible Waste</b>.</div>`;
  } else if (s.white) {
    h = badge('plastic_cp') + nextText('plastic_cp') +
      `<div class="note">Because the white screw top is <b>not PET</b>, the <b>whole bottle</b> goes in <b>Plastic Containers &amp; Packaging</b> — NOT in the PET bag. Empty and rinse it first.</div><div class="house">★ House rule</div>`;
  } else {
    h = badge('pet') + nextText('pet') + `
      <div class="part"><span class="n">1</span><div>Twist off the <b>cap</b> → ${tag('plastic_cp')}</div></div>
      <div class="part"><span class="n">2</span><div>Remove the <b>ring</b> left on the neck (snip it with scissors) → ${tag('plastic_cp')}</div></div>
      <div class="part"><span class="n">3</span><div>Peel off the <b>label</b> → ${tag('plastic_cp')}</div></div>
      <div class="part"><span class="n">4</span><div>Rinse the inside with water.</div></div>
      <div class="part"><span class="n">5</span><div>Lightly crush it.</div></div>
      <div class="part"><span class="n">6</span><div>Put the bottles in a clear / semi-clear bag (≤45 L) → ${tag('pet')}</div></div>
      ${sched ? `<p class="small muted">Cap, ring &amp; label day: ${fmtDate(nextDate('plastic_cp'))}</p>` : ''}`;
  }
  $('#pet-verdict').innerHTML = h;
  $$('#pet .seg').forEach(seg => {
    const k = seg.dataset.k;
    $$('button', seg).forEach(b => b.classList.toggle('on', (b.dataset.v === '1') === s[k]));
  });
}
function wirePet() {
  const p = $('#pet'); if (!p) return;
  petState = { clear: true, white: false };
  $$('.seg', p).forEach(seg => seg.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    petState[seg.dataset.k] = b.dataset.v === '1'; petVerdict();
  }));
  petVerdict();
}

/* ---------------- Tabs ---------------- */
function go(view) {
  $$('.view').forEach(v => v.classList.toggle('active', v.id === 'view-' + view));
  $$('.tabs button').forEach(b => b.classList.toggle('on', b.dataset.view === view));
  if (view === 'schedule') renderSchedule();
  if (view === 'guide') renderGuide();
  if (view === 'search') setTimeout(() => $('#q').focus(), 50);
  window.scrollTo(0, 0);
}
function goHome() {
  $('#scan-result').hidden = true; $('#scan-start').hidden = false;
  $('#q').value = ''; renderSearch();
  go('scan');
}
$$('[data-home]').forEach(b => b.addEventListener('click', goHome));
$$('.tabs button').forEach(b => b.addEventListener('click', () => b.dataset.view === 'scan' ? goHome() : go(b.dataset.view)));
document.addEventListener('click', e => { const a = e.target.closest('[data-go]'); if (a) { e.preventDefault(); go(a.dataset.go); } });

/* ---------------- Today banner ---------------- */
function renderToday() {
  const el = $('#today');
  if (!sched) { el.innerHTML = `<div class="card"><span>📅</span><div>Choose your district in <a href="#" data-go="schedule">Days</a> to see what goes out today and tomorrow.</div></div>`; return; }
  const now = new Date(), t = startOfDay(now);
  const rows = [];
  const before830 = now.getHours() * 60 + now.getMinutes() <= 8 * 60 + 30;
  if (before830) rows.push(['Today', catsOn(t)]);
  rows.push(['Tomorrow', catsOn(addDays(t, 1))]);
  el.innerHTML = `<div class="card" style="display:block">${rows.map(([w, cs]) =>
    `<div style="display:flex;gap:10px;align-items:center;margin:2px 0"><span class="when">${w}</span><div>${cs.length ? cs.map(c => `<span class="pill" style="background:${CATEGORIES[c].color}">${CATEGORIES[c].icon} ${esc(CATEGORIES[c].short)}</span>`).join('') : '<span class="muted">Nothing to put out</span>'}</div></div>`).join('')}
    <div class="small muted" style="margin-top:4px">Put out by 8:30 a.m.</div></div>`;
}

/* ---------------- Photo recognition (on-device) ---------------- */
const MODEL = 'Xenova/clip-vit-base-patch32';
let modelP = null;
function loadModel(onProgress) {
  if (!modelP) modelP = (async () => {
    const T = await import('./lib/transformers.min.js');
    T.env.allowRemoteModels = false;
    T.env.allowLocalModels = true;
    T.env.localModelPath = new URL('./models/', location.href).href;
    T.env.useBrowserCache = false; // the service worker caches files for offline use
    T.env.backends.onnx.wasm.wasmPaths = new URL('./lib/', location.href).href;
    T.env.backends.onnx.wasm.numThreads = 1;
    const [proc, vis, emb] = await Promise.all([
      T.AutoProcessor.from_pretrained(MODEL),
      T.CLIPVisionModelWithProjection.from_pretrained(MODEL, { dtype: 'q8', device: 'wasm', progress_callback: onProgress }),
      fetch('./embeddings.json').then(r => r.json()),
    ]);
    store.set('modelReady', true);
    return { T, proc, vis, emb };
  })().catch(e => { modelP = null; throw e; });
  return modelP;
}
function progressCb(statusEl) {
  return p => {
    if (p.status === 'progress' && p.file && p.file.endsWith('.onnx')) statusEl.textContent = `Loading recognizer… ${Math.round(p.progress)}%`;
  };
}
async function downscale(file, max = 448) {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image(); img.src = url; await img.decode();
    const s = Math.min(1, max / Math.min(img.naturalWidth, img.naturalHeight));
    const c = document.createElement('canvas');
    c.width = Math.round(img.naturalWidth * s); c.height = Math.round(img.naturalHeight * s);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    return await new Promise(r => c.toBlob(r, 'image/jpeg', 0.9));
  } finally { URL.revokeObjectURL(url); }
}
async function classify(file, statusEl) {
  statusEl.textContent = 'Getting ready…';
  const { T, proc, vis, emb } = await loadModel(progressCb(statusEl));
  statusEl.textContent = 'Looking at your photo…';
  const blob = await downscale(file);
  const image = await T.RawImage.fromBlob(blob);
  const { image_embeds } = await vis(await proc(image));
  const v = image_embeds.data; let n = 0; for (const x of v) n += x * x; n = Math.sqrt(n);
  const best = {};
  for (const [id, t] of emb) { let s = 0; for (let i = 0; i < t.length; i++) s += t[i] * v[i]; s /= n; if (!(id in best) || s > best[id]) best[id] = s; }
  const ent = Object.entries(best);
  const mx = Math.max(...ent.map(e => e[1]));
  let z = 0; const ex = ent.map(([id, s]) => { const e = Math.exp(100 * (s - mx)); z += e; return [id, e]; });
  return ex.map(([id, e]) => [id, e / z]).sort((a, b) => b[1] - a[1]);
}

async function onPhoto(file) {
  if (!file) return;
  $('#scan-start').hidden = true; $('#scan-result').hidden = false;
  $('#result-card').innerHTML = ''; $('#alts').innerHTML = '';
  const pv = $('#preview'); if (pv.src) URL.revokeObjectURL(pv.src); pv.src = URL.createObjectURL(file);
  const st = $('#scan-status');
  try {
    const ranked = await classify(file, st);
    st.textContent = '';
    // confidence = how sure we are about the BIN (sum over items going to the same bin)
    const topCat = ITEM[ranked[0][0]].cat;
    const catConf = ranked.filter(([id]) => ITEM[id].cat === topCat).reduce((s, [, p]) => s + p, 0);
    showItem(ranked[0][0], catConf);
    const alts = ranked.slice(1, 6);
    $('#alts').innerHTML = `<p>Not it? Maybe:</p>` + alts.map(([id]) => {
      const it = ITEM[id]; return `<button class="chip" data-id="${id}"><span class="dot" style="background:${CATEGORIES[it.cat].color}"></span>${esc(it.en)}</button>`;
    }).join('') + `<button class="chip" data-go="search">🔍 None of these</button>`;
  } catch (e) {
    console.error(e);
    st.textContent = '';
    $('#result-card').innerHTML = `<div class="banner">Couldn’t run photo recognition on this device (${esc(e.message || e)}). Use <a href="#" data-go="search">Search</a> instead.</div>`;
  }
}
function showItem(id, conf) {
  $('#result-card').innerHTML = itemCard(ITEM[id], conf);
  wirePet();
}
$('#alts').addEventListener('click', e => { const b = e.target.closest('[data-id]'); if (b) { showItem(b.dataset.id); window.scrollTo({ top: 0, behavior: 'smooth' }); } });
$('#cam').addEventListener('change', e => { onPhoto(e.target.files[0]); e.target.value = ''; });
$('#lib').addEventListener('change', e => { onPhoto(e.target.files[0]); e.target.value = ''; });
$('#again').addEventListener('click', () => { $('#scan-result').hidden = true; $('#scan-start').hidden = false; $('#cam').click(); });
$('#to-search').addEventListener('click', () => go('search'));

async function renderModelBanner() {
  const el = $('#model-banner');
  const ready = await isModelCached();
  if (ready) { el.hidden = true; return; }
  el.hidden = false;
  el.innerHTML = `<b>One-time setup:</b> photo recognition needs a ~105 MB download (best on Wi-Fi). After that it works offline.
    <button class="btn wide" id="dl-model">Download now</button><progress id="dl-prog" max="100" value="0" hidden></progress>`;
  $('#dl-model').addEventListener('click', async () => {
    const b = $('#dl-model'), pr = $('#dl-prog'); b.disabled = true; b.textContent = 'Downloading…'; pr.hidden = false;
    try {
      await loadModel(p => { if (p.status === 'progress' && p.file?.endsWith('.onnx')) pr.value = p.progress; });
      el.innerHTML = '✅ Photo recognition is ready and works offline.';
      setTimeout(() => (el.hidden = true), 3000);
    } catch (e) { b.disabled = false; b.textContent = 'Retry download'; pr.hidden = true; console.error(e); }
  });
}
async function isModelCached() {
  if (store.get('modelReady', false) && 'caches' in window) {
    try { return !!(await caches.match(new URL(`./models/${MODEL}/onnx/vision_model_quantized.onnx`, location.href).href)); } catch { }
  }
  return false;
}

/* ---------------- Search ---------------- */
const norm = s => s.toLowerCase().normalize('NFKC');
const INDEX = ITEMS.map(it => ({ it, en: norm(it.en), hay: norm(`${it.en} ${it.ja} ${it.kw || ''} ${CATEGORIES[it.cat].en} ${CATEGORIES[it.cat].ja}`) }));
function search(q) {
  const toks = norm(q).split(/\s+/).filter(Boolean);
  if (!toks.length) return [];
  return INDEX.map(x => {
    let sc = 0;
    for (const t of toks) {
      if (!x.hay.includes(t)) return null;
      sc += x.en.startsWith(t) ? 3 : new RegExp('\\b' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(x.en) ? 2 : 1;
    }
    return [x.it, sc];
  }).filter(Boolean).sort((a, b) => b[1] - a[1]).map(a => a[0]);
}
function listHTML(items) {
  return `<ul class="list">${items.map(it => `<li data-id="${it.id}"><div class="nm">${esc(it.en)}<small>${esc(it.ja)}</small></div>${tag(it.cat)}</li>`).join('')}</ul>`;
}
function renderSearch() {
  const q = $('#q').value.trim(), out = $('#search-out');
  if (!q) {
    out.innerHTML = `<p class="small muted">Or browse by bin:</p><div class="catgrid">${Object.entries(CATEGORIES).map(([k, c]) =>
      `<button data-cat="${k}" style="background:${c.color}"><b>${c.icon} ${esc(c.en)}</b><small>${esc(c.ja)}</small></button>`).join('')}</div>`;
    return;
  }
  const r = search(q);
  out.innerHTML = r.length ? listHTML(r) : `<div class="card">No match for “${esc(q)}”. Try another word (English or 日本語), or call the city: <a href="tel:0467613396">0467-61-3396</a>.</div>`;
}
$('#q').addEventListener('input', renderSearch);
$('#search-out').addEventListener('click', e => {
  const li = e.target.closest('[data-id]');
  if (li) {
    const it = ITEM[li.dataset.id];
    $('#search-out').innerHTML = `<button class="btn ghost small" id="back">← Back</button>` + itemCard(it); wirePet();
    $('#back').addEventListener('click', renderSearch);
    return;
  }
  const cb = e.target.closest('[data-cat]');
  if (cb) {
    const k = cb.dataset.cat;
    $('#search-out').innerHTML = `<button class="btn ghost small" id="back">← Back</button>` + badge(k) + nextText(k) + catDetails(k, true) + listHTML(ITEMS.filter(i => i.cat === k));
    $('#back').addEventListener('click', renderSearch);
  }
});

/* ---------------- Schedule view ---------------- */
function setDistrict(i) {
  if (i == null || i === '') { sched = null; store.set('sched', null); }
  else { sched = { ...structuredClone(DISTRICTS[+i]), idx: +i, adjusted: false }; store.set('sched', sched); }
  $('#district').value = sched ? String(sched.idx) : '';
  renderSchedule(); renderToday();
}
function districtSelect() {
  const sel = $('#district');
  sel.innerHTML = `<option value="">— Choose your district —</option>` + DISTRICTS.map((d, i) => `<option value="${i}">${esc(d.name)}</option>`).join('');
  sel.value = sched ? String(sched.idx) : '';
  sel.addEventListener('change', () => { setDistrict(sel.value); $('#addr-out').innerHTML = ''; });
}

/* ---------------- Address → district (offline) ---------------- */
const KNUM = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8, 九: 9 };
const toNum = s => /^\d+$/.test(s) ? +s : (s.length === 1 ? KNUM[s] : s === '十' ? 10 : NaN);
const BY_JA = [...TOWNS].sort((a, b) => b.ja.length - a.ja.length);
const BY_RO = [...TOWNS].sort((a, b) => Math.max(...b.ro.map(x => x.length)) - Math.max(...a.ro.map(x => x.length)));
// chome: number (1–9), 'none' (address has a lot number instead), or undefined (no number given)
function chomeFrom(n, explicit) { return isNaN(n) ? undefined : (explicit || n <= 9) ? n : 'none'; }
function findDistrict(text) {
  if (!text || !text.trim()) return null;
  const raw = text.normalize('NFKC');
  let town = null, chome;
  // Japanese: 鎌倉市長谷2-3-4 / 長谷二丁目
  const ja = raw.replace(/\s+/g, '').replace(/〒?\d{3}-?\d{4}/, '').replace(/[ヶケヵが]/g, 'ガ').replace(/の/g, 'ノ')
    .replace(/^.*?神奈川県/, '').replace(/^.*?鎌倉市/, '');
  let best = null;
  for (const t of BY_JA) {
    const i = ja.indexOf(t.ja); if (i < 0) continue;
    const rest = ja.slice(i + t.ja.length);
    if (t.short && (i !== 0 || !/^([0-9一二三四五六七八九]|$)/.test(rest))) continue;
    if (!best || i < best.i) best = { t, i, rest };
  }
  if (best) {
    town = best.t;
    const m = best.rest.match(/^([0-9]+|[一二三四五六七八九十])(丁目)?/);
    chome = m ? chomeFrom(toNum(m[1]), !!m[2]) : undefined;
  } else {
    // Romaji: 2-3-4 Hase, Kamakura / Hase 2-chome
    const r = raw.normalize('NFKD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const letters = r.replace(/[^a-z]/g, '');
    for (const t of BY_RO) {
      if (t.ro.some(v => t.short ? new RegExp(`(^|[^a-z])${v}([^a-z]|$)`).test(r) : letters.includes(v))) { town = t; break; }
    }
    if (!town) return null;
    const r2 = r.replace(/\b\d{3}-\d{4}\b/, '');
    let m = r2.match(/(\d+)\s*-?\s*cho?u?me/);
    if (m) chome = +m[1];
    else if ((m = r2.match(/(\d+)\s*-\s*\d+/))) chome = chomeFrom(+m[1]);
    else if ((m = r2.match(/\b(\d+)\b/))) chome = chomeFrom(+m[1]);
  }
  const en = town.en || town.ro[0][0].toUpperCase() + town.ro[0].slice(1);
  const name = `${town.ja} (${en})`;
  if (town.split) {
    const [a, b, inD, outD] = town.split;
    if (typeof chome === 'number') return { name, chome, d: chome >= a && chome <= b ? inD : outD };
    if (chome === 'none') return { name, d: outD };
    const range = a === b ? `${a}-chome` : `${a}–${b}-chome`;
    return { name, ask: `Which part of ${name} do you live in?`, choices: [[`${range} (${a === b ? a : a + '〜' + b}丁目)`, inD], ['Somewhere else in ' + en, outD]] };
  }
  if (town.ask) {
    if (town.hint && town.hint.some(h => raw.toLowerCase().includes(h))) return { name, d: town.choices[0][1] };
    return { name, ask: town.ask, choices: town.choices };
  }
  return { name, d: town.d };
}
function renderAddrResult(res) {
  const out = $('#addr-out');
  if (!res) { out.innerHTML = `<div class="note">Couldn’t find a Kamakura town name in that address. Try the Japanese address (e.g. 鎌倉市長谷2-3-4), or choose from the list below.</div>`; return; }
  if (res.ask) {
    out.innerHTML = `<div class="note">📍 Found <b>${esc(res.name)}</b>. ${esc(res.ask)}<div class="seg" style="margin-top:8px">${res.choices.map(([l, d]) => `<button data-d="${d}">${esc(l)}</button>`).join('')}</div></div>`;
    $$('#addr-out [data-d]').forEach(b => b.addEventListener('click', () => { setDistrict(b.dataset.d); renderAddrResult({ name: res.name, d: +b.dataset.d }); }));
    return;
  }
  setDistrict(res.d);
  out.innerHTML = `<div class="note">📍 <b>${esc(res.name)}${res.chome ? ` ${res.chome}-chome` : ''}</b> → district <b>${esc(DISTRICTS[res.d].name)}</b>. Your days are below. Near a district border? Check the sign at your clean station.</div>`;
}
$('#addr-go').addEventListener('click', () => renderAddrResult(findDistrict($('#addr').value)));
$('#addr').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); $('#addr').blur(); renderAddrResult(findDistrict($('#addr').value)); } });
function renderSchedule() {
  const wk = $('#week'), up = $('#upcoming'), adj = $('#adjust');
  if (!sched) { wk.innerHTML = ''; up.innerHTML = '<p class="muted">Choose your district above.</p>'; adj.hidden = true; renderRemCats(); return; }
  adj.hidden = false;
  // weekly grid
  let h = '<div class="week">';
  for (let w = 1; w <= 5; w++) {
    const pills = SCHED_CATS.filter(c => { const r = rule(c); return r.w && r.w.includes(w); })
      .map(c => `<span class="pill" style="background:${CATEGORIES[c].color}">${CATEGORIES[c].icon} ${esc(CATEGORIES[c].short)}</span>`);
    const monthly = SCHED_CATS.filter(c => { const r = rule(c); return r.m === w; })
      .map(c => `<span class="pill m" style="background:${CATEGORIES[c].color}">${CATEGORIES[c].icon} ${esc(CATEGORIES[c].short)} <i>${ORD[rule(c).nth]} only</i></span>`);
    h += `<div class="d">${DOW[w]}</div><div>${pills.join('')}${monthly.join('')}</div>`;
  }
  wk.innerHTML = h + '</div>' + (sched.adjusted ? '<p class="small muted">✎ Adjusted by you.</p>' : '');
  // upcoming
  const t = startOfDay(new Date()); let u = '';
  for (let i = 0; i < 14; i++) {
    const d = addDays(t, i), cs = catsOn(d); if (!cs.length) continue;
    u += `<div class="up ${i === 0 ? 'today-row' : ''}"><div class="dt">${i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : DOW[d.getDay()] + ' ' + d.getDate() + ' ' + MON[d.getMonth()]}</div><div>${cs.map(c => `<span class="pill" style="background:${CATEGORIES[c].color}">${CATEGORIES[c].icon} ${esc(CATEGORIES[c].short)}</span>`).join('')}</div></div>`;
  }
  up.innerHTML = u;
  renderAdjust(); renderRemCats();
}
function renderAdjust() {
  const daySel = (key, idx) => `<select data-k="${key}" ${idx != null ? `data-i="${idx}"` : ''}>${[1, 2, 3, 4, 5].map(w => `<option value="${w}" ${(idx != null ? sched[key][idx] : sched[key]) === w ? 'selected' : ''}>${DOW[w]}</option>`).join('')}</select>`;
  const nthSel = key => `<select data-k="${key}">${[1, 2, 3, 4].map(n => `<option value="${n}" ${sched[key] === n ? 'selected' : ''}>${ORD[n]}</option>`).join('')}</select>`;
  const rows = [
    ['🔥 Combustible (1st day)', daySel('comb', 0), ''], ['🔥 Combustible (2nd day)', daySel('comb', 1), ''],
    ['📰👕 Paper & Fabric', daySel('paper'), ''], ['🧴 PET bottles', daySel('pet'), ''], ['🌿 Plant trimmings', daySel('plant'), ''],
    ['🥫 Cans & glass bottles', daySel('cans'), ''], ['🛍️ Plastic packaging', daySel('pcp'), ''],
    ['🍳⚠️🫗 Non-comb. / Hazardous / Oil', nthSel('nc'), daySel('md')], ['🪣 Plastic goods (same weekday)', nthSel('pg'), ''],
  ];
  $('#adjust-form').innerHTML = `<div class="adj">${rows.map(r => `<span>${r[0]}</span>${r[1]}<span>${r[2]}</span>`).join('')}</div>
    <button class="btn ghost small" id="reset-adj">Reset to district default</button>`;
  $('#adjust-form').onchange = e => {
    const s = e.target; if (!s.dataset.k) return;
    if (s.dataset.i != null) sched[s.dataset.k][+s.dataset.i] = +s.value; else sched[s.dataset.k] = +s.value;
    sched.adjusted = true; store.set('sched', sched); renderSchedule(); renderToday();
  };
  $('#reset-adj').onclick = () => { sched = { ...structuredClone(DISTRICTS[sched.idx]), idx: sched.idx, adjusted: false }; store.set('sched', sched); renderSchedule(); renderToday(); };
}

/* ---------------- Reminders (.ics with alarms) ---------------- */
let remCats = store.get('remCats', SCHED_CATS.filter(c => c !== 'fabric' && c !== 'oil' && c !== 'hazardous'));
function renderRemCats() {
  $('#rem-cats').innerHTML = SCHED_CATS.map(c => `<button class="chip ${remCats.includes(c) ? 'on' : ''}" data-c="${c}"><span class="dot" style="background:${CATEGORIES[c].color}"></span>${esc(CATEGORIES[c].short)}</button>`).join('');
}
$('#rem-cats').addEventListener('click', e => {
  const b = e.target.closest('[data-c]'); if (!b) return;
  const c = b.dataset.c; remCats = remCats.includes(c) ? remCats.filter(x => x !== c) : [...remCats, c];
  store.set('remCats', remCats); renderRemCats();
});
['rem-eve', 'rem-morn', 'rem-eve-t', 'rem-morn-t'].forEach(id => {
  const el = $('#' + id), saved = store.get(id, null);
  if (saved != null) { if (el.type === 'checkbox') el.checked = saved; else el.value = saved; }
  el.addEventListener('change', () => store.set(id, el.type === 'checkbox' ? el.checked : el.value));
});
const pad = n => String(n).padStart(2, '0');
const icsDate = d => `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}`;
const icsEsc = s => s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
// RFC 5545: lines max 75 octets; fold on whole characters (never split an emoji or kanji)
const enc = new TextEncoder();
function fold(line) {
  const out = []; let cur = '', bytes = 0;
  for (const ch of line) {
    const b = enc.encode(ch).length;
    if (bytes + b > 73) { out.push(cur); cur = ' '; bytes = 1; }
    cur += ch; bytes += b;
  }
  out.push(cur); return out.join('\r\n');
}
function buildICS() {
  const eve = $('#rem-eve').checked, morn = $('#rem-morn').checked;
  const toMin = v => { const [h, m] = v.split(':').map(Number); return h * 60 + m; };
  const START = 8 * 60 + 30; // events sit at 8:30 (deadline)
  const alarms = [];
  if (eve) alarms.push(START + (24 * 60 - toMin($('#rem-eve-t').value || '20:00')));
  if (morn) alarms.push(Math.max(0, START - toMin($('#rem-morn-t').value || '07:00')));
  const now = new Date(), stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}00Z`;
  const L = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Kamakura Gomi//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH', 'X-WR-CALNAME:Kamakura Gomi',
    'BEGIN:VTIMEZONE', 'TZID:Asia/Tokyo', 'BEGIN:STANDARD', 'DTSTART:19700101T000000', 'TZOFFSETFROM:+0900', 'TZOFFSETTO:+0900', 'TZNAME:JST', 'END:STANDARD', 'END:VTIMEZONE'];
  let t = startOfDay(now), count = 0;
  for (let i = 0; i < 366; i++) {
    const d = addDays(t, i);
    let cs = catsOn(d).filter(c => remCats.includes(c));
    if (!cs.length) continue;
    const names = cs.map(c => CATEGORIES[c].short);
    const desc = cs.map(c => `${CATEGORIES[c].icon} ${CATEGORIES[c].en} (${CATEGORIES[c].ja}): ${CATEGORIES[c].bag}`).join('\n') + '\nPut out by 8:30 a.m.';
    L.push('BEGIN:VEVENT', `UID:kg-${icsDate(d)}-${cs.join('-')}@kamakura-gomi`, `DTSTAMP:${stamp}`,
      `DTSTART;TZID=Asia/Tokyo:${icsDate(d)}T083000`, `DTEND;TZID=Asia/Tokyo:${icsDate(d)}T084500`,
      fold(`SUMMARY:${icsEsc('🗑 Put out: ' + names.join(', '))}`), fold(`DESCRIPTION:${icsEsc(desc)}`), 'TRANSP:TRANSPARENT');
    for (const a of alarms) L.push('BEGIN:VALARM', 'ACTION:DISPLAY', fold(`DESCRIPTION:${icsEsc('Garbage: ' + names.join(', '))}`), `TRIGGER:-PT${a}M`, 'END:VALARM');
    L.push('END:VEVENT'); count++;
  }
  L.push('END:VCALENDAR');
  return { text: L.join('\r\n') + '\r\n', count };
}
$('#rem-go').addEventListener('click', () => {
  if (!sched) { alert('Choose your district first.'); return; }
  if (!remCats.length) { alert('Pick at least one type of garbage.'); return; }
  const { text, count } = buildICS();
  const blob = new Blob([text], { type: 'text/calendar' });
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'kamakura-gomi.ics';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 60000);
  const f = new File([text], 'kamakura-gomi.ics', { type: 'text/calendar' });
  if (navigator.canShare && navigator.canShare({ files: [f] })) {
    const sb = $('#rem-share'); sb.hidden = false;
    sb.onclick = () => navigator.share({ files: [f], title: 'Kamakura Gomi reminders' }).catch(() => { });
  }
  $('#rem-go').textContent = `📅 Added ${count} days — tap again to redo`;
});

/* ---------------- Guide ---------------- */
function renderGuide() {
  const g = $('#guide'); if (g.dataset.done) return; g.dataset.done = 1;
  g.innerHTML = `<h2>Kamakura sorting guide</h2>
  <div class="card"><b>The basics</b><ul class="steps">
    <li>Put everything out <b>by 8:30 a.m.</b> on the collection day — not the night before.</li>
    <li><b>Combustible</b> is collected <b>door-to-door</b> (since April 2026): on your own property facing the street, in a lidded, weighted container. Everything else goes to your usual <b>clean station</b>.</li>
    <li><b>Combustible & Non-Combustible</b> need the city’s <b>paid bags</b>. Most others use clear / semi-clear bags (≤45 L). Paper goes in paper bags or tied with string. Cans & glass go loose in the yellow/blue containers.</li>
    <li>Max <b>5 bags or bundles</b> per household per day.</li>
    <li>Anything <b>50 cm or longer</b> is usually <b>Large Waste</b> (book it, buy a sticker).</li>
    <li>“2nd Tuesday” means the 2nd Tuesday of the month, not Tuesday of the 2nd week.</li>
    <li>Unsorted waste is left behind with a sticker — the person who put it out must take it back.</li>
  </ul></div>
  ${Object.entries(CATEGORIES).map(([k, c]) => `<details class="card guide-cat" style="border-left-color:${c.color}">
    <summary><span class="gi">${c.icon}</span><div><b>${esc(c.en)}</b><div class="small muted">${esc(c.ja)}${sched && c.sched ? ' · ' + ruleText(k) : ''}</div></div></summary>
    <p><b>Bag:</b> ${esc(c.bag)}</p><ul class="steps">${c.howto.map(h => `<li>${esc(h)}</li>`).join('')}</ul>
    <p class="ex"><b>Examples:</b> ${ITEMS.filter(i => i.cat === k).map(i => esc(i.en)).join(' · ')}</p></details>`).join('')}
  <div class="card contacts"><b>Phone numbers</b>${CONTACTS.map(([n, t]) => `<div>${esc(n)}<br><a href="tel:${t.replace(/-/g, '')}">${t}</a></div>`).join('')}
    <p class="small muted">The city also has a Japanese-only LINE account “Kamakura Waste Info Lookup” for large-waste booking.</p></div>
  <p class="small muted">${esc(SOURCE_NOTE)} Items marked ★ are house rules.</p>`;
}

/* ---------------- Boot ---------------- */
districtSelect();
renderToday();
renderSearch();
renderModelBanner();
setInterval(renderToday, 5 * 60 * 1000);
if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js').catch(console.error);
