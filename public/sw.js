const CACHE_PREFIX = 'my-btrip';
const CACHE_VER = 'v13';
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VER}`;

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll([
        '/BigTrip/',
        '/BigTrip/index.html',
        '/BigTrip/bundle.js',
        '/BigTrip/css/style.css',
        '/BigTrip/fonts/Montserrat-Bold.woff2',
        '/BigTrip/fonts/Montserrat-ExtraBold.woff2',
        '/BigTrip/fonts/Montserrat-Medium.woff2',
        '/BigTrip/fonts/Montserrat-Regular.woff2',
        '/BigTrip/fonts/Montserrat-SemiBold.woff2',
        '/BigTrip/img/header-bg.png',
        '/BigTrip/img/header-bg@2x.png',
        '/BigTrip/img/logo.png',
        '/BigTrip/img/icons/bus.png',
        '/BigTrip/img/icons/check-in.png',
        '/BigTrip/img/icons/drive.png',
        '/BigTrip/img/icons/flight.png',
        '/BigTrip/img/icons/restaurant.png',
        '/BigTrip/img/icons/ship.png',
        '/BigTrip/img/icons/sightseeing.png',
        '/BigTrip/img/icons/taxi.png',
        '/BigTrip/img/icons/train.png',
        '/BigTrip/img/icons/transport.png',
        '/BigTrip/img/photos/1.jpg',
        '/BigTrip/img/photos/2.jpg',
        '/BigTrip/img/photos/3.jpg',
        '/BigTrip/img/photos/4.jpg',
        '/BigTrip/img/photos/5.jpg',
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
