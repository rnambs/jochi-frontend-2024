// self.addEventListener('notificationclick', function(event) {
//     console.log('test', event)
//     event.notification.close();
//     const url = 'home';
//     event.waitUntil(
//         self.clients.matchAll({type: 'window'}).then( windowClients => {
//             // Check if there is already a window/tab open with the target URL
//             for (var i = 0; i < windowClients.length; i++) {
//                 var client = windowClients[i];
//                 // If so, just focus it.
//                 if (client.url === url && 'focus' in client) {
//                     return client.focus();
//                 }
//             }
//             if (self.clients.openWindow) {
//                 console.log("open window")
//             }
//         })
//     )
//   }, false);