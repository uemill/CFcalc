var CACHE_NAME = 'pwa-caches::v2';
var urlsToCache = [
    'https://uemill.github.io/CFcalc/index.html',
    'https://uemill.github.io/CFcalc/CFcalc.js'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});

self.addEventListener('activate',function(event){
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if(CACHE_NAME.indexOf(key) === -1){
                    return caches.delete(key);
                }
            }));
        })
    );
})