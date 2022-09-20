
importScripts(
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js'
)
importScripts(
    'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'
)
firebase.initializeApp({ "apiKey": "AIzaSyB7G1KkUjOSmoZhauukZpH1nRhJvsfQfQo", "authDomain": "jochi-ff725.firebaseapp.com", "projectId": "jochi-ff725", "storageBucket": "jochi-ff725.appspot.com", "messagingSenderId": "273788357446", "appId": "1:273788357446:web:91c1c88a2b0640b3f57347", "measurementId": "G-K3M3QC31SE" })

import store from './store'
// Retrieve an instance of Firebase Messaging so that it can handle backgroundh
// messages.
const messaging = firebase.messaging()

self.addEventListener('push', function (e) {
    data = e.data.json();
    var options = {
        body: data.notification.body,
        icon: data.notification.icon,
        title: data.notification.title,
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '2'
        },
    }
    // let val = window.$nuxt.$store.getters.isTimerRunning;
    val = store.getters.config
    console.log("push listener", options, data, val);



});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    const url = 'home';
    event.waitUntil(
        self.clients.matchAll({ type: 'window' }).then(windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            if (self.clients.openWindow) {
                console.log("open window")
            }
        })
    )
}, false);
