const CACHE_NAME = 'reconciliacao-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json'
];

// Instalação (Salva os arquivos no celular)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Intercepta a falta de internet e exibe o site salvo
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Retorna do cache se estiver sem internet
        }
        return fetch(event.request); // Baixa da internet se tiver conexão
      })
  );
});