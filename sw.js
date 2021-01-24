const CACHE_NAME = 'lcarsde-github-io-1',
  ALL_CACHES = [ // need any here for includes
    CACHE_NAME
  ];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll([
          'index.html',
          'installation.html',
          'manual.html',
          'about.html',
          'style.css',
          'images/icon-192.png',
          'font/ubuntu-condensed-v9-latin-regular.ttf',
          'font/ubuntu-condensed-v9-latin-regular.woff',
        ]);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.filter((cacheName) => {
            return cacheName.startsWith('lcarsde-github-io')
              && !ALL_CACHES.includes(cacheName);
          }).map((cacheName) => caches.delete(cacheName))
        );
      })
  );
});

self.addEventListener('fetch', (event) => {
  const networkFetch = fetch(event.request);
  const requestUrl = new URL(event.request.url);

  event.waitUntil(
    networkFetch.then(response => {
      const responseClone = response.clone();
      const request = requestUrl.origin === location.origin && requestUrl.pathname === '/' ? 'index.html' : event.request;
      caches.open(CACHE_NAME)
        .then(cache => cache.put(request, responseClone));
    })
  )

  event.respondWith(
    caches.match(event.request)
      .then((response) => response || networkFetch)
  );
});
