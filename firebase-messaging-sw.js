// خدمة التنبيهات — تعرض إشعار الجوال حتى لو البرنامج مغلق
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging-compat.js');
firebase.initializeApp({
  apiKey: "AIzaSyDW8N9MnNNzU0zEb1lgYXCu5A5ksiuJ1hc",
  authDomain: "ruqaya-1206.firebaseapp.com",
  projectId: "ruqaya-1206",
  storageBucket: "ruqaya-1206.firebasestorage.app",
  messagingSenderId: "639722837023",
  appId: "1:639722837023:web:0678641be8db8d165ef12a"
});
const messaging = firebase.messaging();
// ⚠ آيفون: لازم كل تنبيه يطلع إشعار حتى لو البرنامج مفتوح — وإلا سفاري يوقف التنبيهات عن الجهاز بعد كم مرة
// الانصراف: سلسلة وحدة (tag ثابت) — كل تنبيه جديد يحل محل اللي قبله ويرن من جديد، بدل ما تتكدس وينكتم بعضها والشاشة مقفولة
self.addEventListener('push', function (e) {
  let d = {};
  try { const p = e.data ? e.data.json() : {}; d = p.data || (p.notification ? { title: p.notification.title, body: p.notification.body } : {}); } catch (err) {}
  const series = d.kind === 'dismiss' ? 'att-dismiss' : 'att-' + (d.id || Date.now());
  e.waitUntil(self.registration.showNotification('مدرسة رقية الإبتدائية للبنات', {
    body: (d.title ? d.title + '\n' : '') + (d.body || ''),
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    tag: series,
    renotify: true,
    requireInteraction: d.kind !== 'dismiss',
    vibrate: [250, 120, 250],
    data: { url: self.registration.scope }
  }));
});
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (const c of list) if ('focus' in c) return c.focus();
    return clients.openWindow((e.notification.data && e.notification.data.url) || '/');
  }));
});
