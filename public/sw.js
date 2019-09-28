const CACHE_NAME = `TASK_MANAGER_v2.7`;
const TIMEOUT = 1000;

self.addEventListener(`install`, (evt) => {
  console.log(`sw, install`, {evt});

  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
          return cache.addAll([
            `./`,
            `./index.html`,
            `./css/normalize.css`,
            `./css/style.css`,
            `./bundle.js`,
          ]);
        }
      )
  );
});

self.addEventListener(`activate`, (evt) => {
  console.log(`sw, activate`, {evt});
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

function update(request) {
  console.log(`request`);

  return caches.open(CACHE).then((cache) =>
    fetch(request).then((response) =>
      cache.put(request, response)
    )
  );
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
