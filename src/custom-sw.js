// custom-service-worker.js
self.addEventListener('push', event => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );

  self.clients.matchAll().then(clients => {
    clients.forEach(client => {
      client.postMessage({
        type: 'NEW_NOTIFICATION',
        notification: {
          title: data.title,
          body: data.body,
          icon: data.icon
        }
      });
    });
  });
});
