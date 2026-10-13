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
messaging.onBackgroundMessage(function (payload) {
  const d = payload.data || {};
  self.registration.showNotification(d.title || 'مدرسة رقية', {
    body: d.body || '',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    tag: 'att-' + (d.id || Date.now()),
    requireInteraction: true,
    vibrate: [250, 120, 250],
    data: { url: self.registration.scope }
  });
});
self.addEventListener('notificationclick', function (e) {
  e.notification.close();
  e.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (list) {
    for (const c of list) if ('focus' in c) return c.focus();
    return clients.openWindow((e.notification.data && e.notification.data.url) || '/');
  }));
});
