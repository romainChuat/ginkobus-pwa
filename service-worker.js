const cacheName = "ginkobus-pwa-v1";

const contentToCache = [
    "icons/icon-192.png",
    "icons/icon-512.png",
    "icons/maskable_icon.png",
    "manifest.json",
    "app.js",
    "index.html",
    "style.css"
]

self.addEventListener("install", (e) => {
    console.log("[Service Worker] Install");
    e.waitUntil(
      (async () => {
        const cache = await caches.open(cacheName);
        console.log("[Service Worker] Caching all: app shell and content");
        await cache.addAll(contentToCache);
      })(),
    );
  });
  


  self.addEventListener("fetch", (e) => {
    /*e.respondWith(
      (async () => {
        const r = await caches.match(e.request);
        console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
        if (r) {
          return r;
        }
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
        cache.put(e.request, response.clone());
        return response;
      })(),
    );*/
    if(!e.request.url.startWith("http")){
        e.respondWith(
            fetch(e.request)
            .then(async (r) => {
                const cache = await caches.open(cacheName);
                console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
                cache.put(e.request, r.clone());
                return r;
            })
            .catch(function() {
                return caches.match(e.request);
            })
        );
    }

  });