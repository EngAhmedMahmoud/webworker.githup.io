"use strict"
//install the service worker
const cacheName = "v4";
const cacheAssets = [
    'index.html',
    'about.html',
    'post.html',
    'contact.html',
    '/img/about-bg.jpg',
    '/img/contact-bg.jpg',
    '/img/home-bg.jpg',
    '/img/post-bg.jpg',
    '/img/post-sample-image.jpg',
    '/css/clean-blog.css',
    '/css/clean-blog.min.css',
    '/js/clean-blog.js',
    '/js/clean-blog.min.js',
    '/js/contact_me.js',
    '/js/jqBootstrapValidation.js',

]
self.addEventListener("install", (e) => {
    console.log("Service worker is installed successfully");
    e.waitUntil(
        caches.open(cacheName)
            .then((cache) => {
                console.log("Service worker:caching files");
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    )
});
self.addEventListener("activate", (e) => {
    console.log("Service worker is activated successfully");
    e.waitUntil(
        caches.keys().then((cahceNames) => {
            return Promise.all(
                cahceNames.map((cache) => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            )
        })

    )
});
//get the response from cache when website if offline
self.addEventListener("fetch", (e) => {
    console.log("Fetching files from cache");
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
})