// Bump CACHE version whenever you change any app file
const CACHE = 'brainbridge-v1';
const ASSETS = ["./", "index.html", "manifest.webmanifest", "css/styles.css", "js/app.js", "js/icons.js", "js/wave-renderers.js", "js/optics-renderers.js", "js/chemistry.js", "js/carbon.js", "js/chemistry-animations.js", "js/gamification.js", "js/pwa.js", "icons/icon.svg", "icons/icon-192.png", "icons/icon-512.png", "icons/icon-maskable-512.png", "icons/apple-touch-icon.png"];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim())));
// Cache first (works offline), refresh in background
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).origin !== location.origin) return;
  e.respondWith(caches.match(r, { ignoreSearch: true }).then(hit => {
    const net = fetch(r).then(res => { if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); } return res; })
      .catch(() => hit || (r.mode === 'navigate' ? caches.match('index.html') : Response.error()));
    if (hit) e.waitUntil(net.catch(() => {}));
    return hit || net;
  }));
});
