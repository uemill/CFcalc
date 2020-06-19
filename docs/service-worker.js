importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

self.addEventListener('install', function(e) {
  	console.log('[ServiceWorker] Install');
});

self.addEventListener('activate', function(e) {
  	console.log('[ServiceWorker] Activate');
});

self.addEventListener('fetch', function(e) {
	console.log('[ServiceWorker] fetch');
});

workbox.precaching.precacheAndRoute([
  {
    url: 'index.html',
    revision: '10000'
  },
  {
    url: 'CFcalc.js',
    revision: '10000'
  } 
])