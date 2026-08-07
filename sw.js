const CACHE_NAME = 'rootlink-ipad-v11';
const APP_FILES = ['./', './index.html', './i18n.js?v=6', './manifest.webmanifest', './assets/culture/bibimbap.png', './assets/culture/bulgogi.png', './assets/culture/kimchi.png', './assets/culture/tteokbokki.png', './assets/culture/hanbok.png', './assets/culture/gugak.png', './KakaoTalk_20260803_111816264.mp4', './KakaoTalk_20260803_113801226.mp4', './KakaoTalk_20260803_121531744.mp4'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
  )));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});
