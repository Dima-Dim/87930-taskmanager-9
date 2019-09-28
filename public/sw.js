const CACHE_NAME = `TASK_MANAGER_v2.8`;
const TIMEOUT = 1000;

self.addEventListener(`install`, (evt) => {
  console.log(`sw, install`, {evt});

  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll([
            `./`,
            `./index.html`,
            `./css/normalize.css`,
            `./css/style.css`,
            `./bundle.js`,
          ])
      )
      .then(() => self.skipWaiting())
  );
});

self.addEventListener(`activate`, (evt) => {
  console.log(`sw, activate`, {evt});
  evt.waitUntil(self.clients.claim());
});

self.addEventListener(`fetch`, (evt) => {
  console.log(`Request tasks`, {evt, request: evt.request});

  evt.respondWith(
    fromNetwork(evt.request, TIMEOUT)
      .then((response) => {
        toCache(evt.request, response.clone());
        return response;
      })
      .catch((err) => {
        throw new Error(`From network error: ${err}`);
        return fromCache(evt.request);
      })
  );

  console.log(`fetch`, {evt, request: evt.request});
});

function fromCache(request, err) {
  console.log(`fromCache`);

  return caches.open(CACHE_NAME).then((cache) =>
    cache.match(request).then((matching) =>
      matching || Promise.reject('no-match')
    ))
    .catch((err) => new Error(`fetch error: ${err}`));
}

function toCache(request, response) {
  console.log(`toCache`);

  return caches.open(CACHE_NAME)
    .then((cache) => cache.put(request, response))
    .catch((err) => new Error(`Cache put error: ${err}`));
}

function fromNetwork(request, timeout) {
  console.log(`fromNetwork`);

  return new Promise((fulfill, reject) => {
    let timeoutId = setTimeout(reject, timeout);
    fetch(request).then((response) => {
      clearTimeout(timeoutId);
      fulfill(response);
    }, reject);
  });
}
