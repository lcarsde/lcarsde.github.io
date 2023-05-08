const CACHE_NAME = 'lcarsde-github-io-4',
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
          'links.html',
          'whoops.html',
          'style.css',
          'images/icon-192.png',
          'font/LCARSGTJ3.ttf',
          'font/LCARSGTJ3.woff',
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
  const request = requestUrl.pathname === '/' ? 'index.html' : event.request;

  event.respondWith(
    networkFetch.then(response => {
      caches.open(CACHE_NAME)
        .then(cache => cache.put(request, response.clone()));
      return response
    })
      .catch(() => caches.match(event.request))
      .then((response) => response ?? caches.match('whoops.html'))
  );
});
