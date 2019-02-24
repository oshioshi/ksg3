// configuration
`use strict`;

const cacheName = 'ksg1';

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  	e.waitUntil(
		caches.open(cacheName).then(function(cache) {
     return cache.addAll([
       './index.html',
       './index.html?homescreen=1',
       './favicon.ico',
       './js/main.js',
       './js/lib/enchant.js',
       './icon/icon192.png',
       './img/001.png',
       './img/002.png',
       './img/003.png',
       './img/enemy.png',
       './img/player.png'
     ]);
   }));
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
});