const CACHE = 'otthi-v645-1';
const CACHE_PREFIXES = ['otthi-','otthi-game-web-','otthos-life-world-main-'];
const BUILD = '645.0-consolidated-neighborhood-world';
const THREE_R128 = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';

const REQUIRED_SHELL = [
  './',
  './index.html?v=645',
  './style.css?v=645',
  './assets/js/core/runtime-config.js?v=645',
  './assets/js/core/safe-pointer.js?v=645',
  './assets/js/core/viewport-manager.js?v=645',
  './assets/js/save-db.js?v=645',
  './firebase-config.js?v=645',
  './assets/js/game-account.js?v=645',
  './assets/js/multiplayer-rtdb.js?v=645',
  './app.js?v=645',
  './assets/js/ui/shared-modal.js?v=645',
  './assets/js/core/performance-guardian.js?v=645',
  './assets/js/multiplayer/room-manager.js?v=645',
  './assets/js/education/adaptive-learning.js?v=645',
  './assets/js/safety/child-safety.js?v=645',
  './manifest.webmanifest?v=645'
];

const OPTIONAL_ASSETS = [
  './404.html',
  './athos.glb',
  './assets/textures/asphalt-v628.png',
  './assets/textures/brick-v628.png',
  './assets/textures/bus-seat-v628.png',
  './assets/textures/gold-ore-v628.png',
  './assets/textures/grass-v628.png',
  './assets/textures/interior-floor-v628.png',
  './assets/textures/police-wall-v628.png',
  './assets/textures/roof-v628.png',
  './assets/textures/school-wall-v628.png',
  './assets/textures/stone-v628.png',
  './assets/textures/wood-v628.png',
  './assets/textures/sidewalk-v632.png',
  './assets/textures/interior-wall-v632.png',
  './assets/textures/home-floor-v632.png',
  './assets/textures/market-floor-v632.png',
  './assets/textures/market-wall-v632.png',
  './assets/textures/school-floor-v632.png',
  './assets/textures/fire-station-wall-v632.png',
  './assets/textures/concrete-v632.png',
  './assets/textures/city-glass-v632.png',
  './assets/textures/emergency-metal-v632.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/favicon.png',
  THREE_R128
];

function freshRequest(resource) {
  const source = typeof resource === 'string' ? resource : resource.url;
  const external = /^https?:/i.test(source);
  return new Request(source, {
    cache: 'no-store',
    mode: external ? 'cors' : 'same-origin',
    credentials: external ? 'omit' : 'same-origin'
  });
}

async function fetchAndCache(cache, resource, required = false) {
  try {
    const request = freshRequest(resource);
    const response = await fetch(request);
    if (!response || (!response.ok && response.type !== 'opaque')) {
      throw new Error(`HTTP ${response?.status || 0}`);
    }
    await cache.put(resource, response.clone());
    return { resource, ok:true };
  } catch (error) {
    if (required) throw new Error(`Falha no arquivo obrigatório ${resource}: ${error?.message || error}`);
    return { resource, ok:false, error:String(error?.message || error) };
  }
}

async function cacheApplicationShell() {
  const cache = await caches.open(CACHE);
  for (const resource of REQUIRED_SHELL) await fetchAndCache(cache, resource, true);
  const optional = await Promise.all(OPTIONAL_ASSETS.map(resource => fetchAndCache(cache, resource, false)));
  const failed = optional.filter(item => !item.ok);
  if (failed.length) console.warn('[OTTHI SW] Recursos opcionais não pré-cacheados:', failed);
}

self.addEventListener('install', event => {
  event.waitUntil(cacheApplicationShell().then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter(name => CACHE_PREFIXES.some(prefix => name.startsWith(prefix)) && name !== CACHE)
      .map(name => caches.delete(name)));
    await self.clients.claim();
    const clients = await self.clients.matchAll({ type:'window', includeUncontrolled:true });
    clients.forEach(client => client.postMessage({ type:'OTTHI_GAME_UPDATE_READY', build:BUILD, version:'645' }));
  })());
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data?.type === 'PURGE_OTTHI_GAME_CACHE') {
    event.waitUntil(caches.keys().then(names => Promise.all(
      names.filter(name => CACHE_PREFIXES.some(prefix => name.startsWith(prefix))).map(name => caches.delete(name))
    )));
  }
});

async function networkFirst(request, navigation = false) {
  const cache = await caches.open(CACHE);
  const url = new URL(request.url);
  const probe = url.searchParams.has('otthi_probe');
  try {
    const response = await fetch(request, { cache:'no-store' });
    if (response && response.ok && !probe) await cache.put(request, response.clone());
    return response;
  } catch (error) {
    if (probe) throw error;
    const cached = await cache.match(request, { ignoreSearch:false }) || await caches.match(request);
    if (cached) return cached;
    if (navigation) {
      return await cache.match('./index.html?v=645') || await cache.match('./') || Response.error();
    }
    throw error;
  }
}

async function cacheFirst(request) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(request, { ignoreSearch:false }) || await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && (response.ok || response.type === 'opaque')) await cache.put(request, response.clone());
  return response;
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  const sameOrigin = url.origin === self.location.origin;
  const trustedExternal = event.request.url === THREE_R128;

  if (trustedExternal) {
    event.respondWith(cacheFirst(event.request));
    return;
  }
  if (!sameOrigin) return;

  const navigation = event.request.mode === 'navigate';
  const code = /\.(?:js|css|html|webmanifest)$/.test(url.pathname) || url.pathname.endsWith('/');
  if (navigation || code || url.searchParams.has('otthi_probe')) {
    event.respondWith(networkFirst(event.request, navigation));
    return;
  }
  event.respondWith(cacheFirst(event.request));
});
