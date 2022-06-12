const CACHE_PREFIX = 'my-btrip';
const CACHE_VER = 'v13';
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll([
        '/',
        '/index.html',
        '/bundle.js',
        '/css/style.css',
        '/fonts/Montserrat-Bold.woff2',
        '/fonts/Montserrat-ExtraBold.woff2',
        '/fonts/Montserrat-Medium.woff2',
        '/fonts/Montserrat-Regular.woff2',
        '/fonts/Montserrat-SemiBold.woff2',
        '/img/header-bg.png',
        '/img/header-bg@2x.png',
        '/img/logo.png',
        '/img/icons/bus.png',
        '/img/icons/check-in.png',
        '/img/icons/drive.png',
        '/img/icons/flight.png',
        '/img/icons/restaurant.png',
        '/img/icons/ship.png',
        '/img/icons/sightseeing.png',
        '/img/icons/taxi.png',
        '/img/icons/train.png',
        '/img/icons/transport.png',
        '/img/photos/1.jpg',
        '/img/photos/2.jpg',
        '/img/photos/3.jpg',
        '/img/photos/4.jpg',
        '/img/photos/5.jpg',
      ]))
  );
});


self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    // Получаем все названия кэшей
    caches.keys()
      .then(
      // Перебираем их и составляем набор промисов на удаление
        (keys) => Promise.all(
          keys.map((key) => {
            // Удаляем только те кэши,
            // которые начинаются с нашего префикса,
            // но не совпадают по версии
            if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
              return caches.delete(key);
            }
            // Остальные не обрабатываем
            return null;

          }).filter((key)=>key!==null)
        )
      )
  );
});

self.addEventListener('fetch', (evt) => {
  const { request } = evt;
  evt.respondWith(
    caches.match(request)
      .then((cacheResponse) => {
        // Если в кеше нашелся ответ на запрос (request),
        // возвращаем его (cacheResponse) вместо запроса к серверу
        if (cacheResponse) {
          return cacheResponse;
        }
        // Если в кеше не нашелся ответ,
        // повторно вызываем fetch
        // с тем же запросом (request)
        // и возвращаем его
        return fetch(request).then((response) => {
          // Если ответа нет, или ответ со статусом отличным от 200 ОК
          // или ответ небезопасного типа (не basic), тогда просто передаем
          // ответ дальше, никак не обрабатываем
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          // А если ответ удовлетворяет, клонируем его
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clonedResponse));
          return response;
        });

      }
      )
  );
});
