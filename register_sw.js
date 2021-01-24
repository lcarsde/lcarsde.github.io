/**
 * Register the service worker.
 */
const registerServiceWorker = () => {
  if (!navigator.serviceWorker) {
    // ServiceWorker is not available
    return;
  }

  navigator.serviceWorker.register('/sw.js')
    .then(() => console.log('installed ServiceWorker'));
};

registerServiceWorker();