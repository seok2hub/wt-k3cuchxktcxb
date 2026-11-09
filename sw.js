/* WOD 타이머 서비스 워커: 오프라인 실행 + 버전 관리
 *
 * ▶ 파일을 고쳐서 다시 올릴 때는 아래 VERSION 숫자만 하나 올리세요. (예: v1 → v2)
 *   - 브라우저/아이폰은 앱을 열 때마다 이 sw.js 파일이 바뀌었는지 확인합니다.
 *   - 바뀌었으면 새 파일들을 새 이름의 캐시(wod-timer-v2)로 내려받고, 옛 캐시는 지웁니다.
 *   - 앱은 설정 화면에 있을 때 자동으로 새로고침되어 새 버전이 보입니다.
 *     (운동 중이면 끝나고 설정 화면으로 돌아올 때 적용)
 *   - 설정 화면 맨 아래에 지금 실행 중인 버전이 표시됩니다.
 */
const VERSION = 'v1';
const CACHE = 'wod-timer-' + VERSION;
const FILES = [
  './',
  './index.html',
  './manifest.webmanifest',
  './apple-touch-icon.png',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      // cache: 'reload' → HTTP 캐시를 거치지 않고 서버에서 새로 받음
      .then(cache => cache.addAll(FILES.map(f => new Request(f, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('wod-timer-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// 캐시 우선: 체육관에서 인터넷이 느리거나 없어도 바로 열림.
// 새 버전은 위의 VERSION 변경으로 반영됨.
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => {
      if (hit) return hit;
      return fetch(req).catch(() => req.mode === 'navigate' ? caches.match('./index.html') : Response.error());
    })
  );
});
