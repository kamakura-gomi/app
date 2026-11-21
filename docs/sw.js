// Offline support. App files: network-first (so updates arrive), cache fallback.
// Big files (model + runtime): cache-first, kept in their own cache across app updates.
const SHELL = 'kg-shell-v4';
const BIG = 'kg-big-v1';
const SHELL_FILES = ['./', './index.html', './styles.css', './app.js', './data.js', './embeddings.json',
  './manifest.webmanifest', './icons/icon-180.png', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(SHELL).then(c => c.addAll(SHELL_FILES.map(u => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== SHELL && k !== BIG).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  const big = url.pathname.includes('/models/') || url.pathname.includes('/lib/');
  if (big) {
    e.respondWith(caches.open(BIG).then(async c => {
      const hit = await c.match(e.request, { ignoreSearch: true });
      if (hit) return hit;
      const res = await fetch(e.request);
      if (res.ok) c.put(e.request, res.clone());
      return res;
    }));
    return;
  }
  e.respondWith((async () => {
    const c = await caches.open(SHELL);
    try {
      // cache: 'no-cache' skips the browser's HTTP cache (GitHub Pages sets 10 min), so updates show up at once
      const res = await Promise.race([fetch(e.request.url, { cache: 'no-cache', credentials: 'same-origin' }),
        new Promise((_, rej) => setTimeout(() => rej(new Error('slow')), 3500))]);
      if (res.ok) c.put(e.request, res.clone());
      return res;
    } catch {
      return (await c.match(e.request, { ignoreSearch: true })) || (await c.match('./index.html')) || Response.error();
    }
  })());
});
