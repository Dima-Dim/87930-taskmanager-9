const CACHE_NAME = `DEMO_APP`;

self.addEventListener('install', (evt) => {
  console.log('sw, install', {evt});
});

self.addEventListener('activate', (evt) => {
  console.log('sw', 'activate', {evt});
});

self.addEventListener('fetch', (evt) => {
  console.log('fetch', {evt, request: evt.request});
  // Сейчас мы создадим ответ, который отправим в браузер.
  evt.respondWith(
    // Ищем в кеше данные по текущему запросу.
    caches.match(evt.request)
      .then((response) => {
        console.log(`Find in cache`, {response});
        if (response) {
          // Если данные в кеше есть, то вернем их.
          return response;
        } else {
          // Иначе сделаем настоящий запрос на сервер.
          return fetch(evt.request)
            .then(function(response) {
              // Если запрос был удачных, то откроем кеш...
              caches.open(CACHE_NAME)
                .then((cache) => {
                  // Поместим в кеш результат запроса.
                  return cache.put(evt.request, response.clone())
                });

              // При каждом взаимодействии с объектом `response` его стоит клонировать.
              // Это связано с его "одноразовой" природой. Прочитать данные из него можно только один раз.
              return response.clone();
            });
        }
      })
      .catch((err) => console.error({err}))
  );
});
