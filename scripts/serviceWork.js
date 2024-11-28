
const CACHE_NAME = 'biciland-cache-v1';


let urlCache = [
    './',
    './styles/styles.css',
    './scripts/script.js',
    './assets/imagen1.jpg',
    './assets/imagen2.jpg',
    './assets/imagen3.jpg',
    './assets/imagen4.jpg',
    './assets/imagen5.jpg',
    './assets/bomba.jpg',
    './assets/ciclista.jpg',
    './assets/estuche.jpg',
    './assets/freno.jpg',
    './assets/sillin.jpg'
];


self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlCache)
                    .then(() => {
                        self.skipWaiting();
                    });
            })
            .catch(err => {
                console.error("No se ha registrado la cache: " + err);
            })
    );
});


self.addEventListener("fetch", (e) => {
    e.respondWith(
        caches.match(e.request).then((r) => {
            console.log("[Service Worker] Obteniendo recurso: " + e.request.url);
            return (
                r ||
                fetch(e.request).then((response) => {
                    return caches.open('biciland-cache-v1').then((cache) => {
                        console.log("[Service Worker] Almacena el nuevo recurso: " + e.request.url);
                        cache.put(e.request, response.clone());
                        return response;
                    });
                })
            );
        })
    );
});

