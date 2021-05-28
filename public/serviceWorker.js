let CACHE_NAME = "lowympact-cache-v1.0.1";
const CACHED_URLS = [
    "/",
    "/index.html",
    "/manifest.json",
    "/images/alternatives/appartement.svg",
    "/images/alternatives/bus.svg",
    "/images/alternatives/car.svg",
    "/images/alternatives/light.svg",
    "/images/alternatives/mail.svg",
    "/images/alternatives/paper.png",
    "/images/alternatives/potatoe.png",
    "/images/alternatives/steak.png",
    "/images/alternatives/strawberry.png",
    "/images/alternatives/train.png",
    "/images/alternatives/trotinette.png",
    "/images/utils/bitmap.png",
    "/images/utils/ecnoScoreA.png",
    "/images/utils/ecnoScoreB.png",
    "/images/utils/ecnoScoreC.png",
    "/images/utils/ecnoScoreD.png",
    "/images/utils/ecnoScoreE.png",
    "/images/utils/ecnoScoreFull.png",
    "/images/utils/loading.gif",
    "/images/utils/logo.png",
    "/images/utils/logo.svg",
    "/images/utils/map.png",
    "/images/utils/map2.png",
    "/images/utils/map3.png",
    "/pwa-192x192.png",
    "/pwa-512x512.png",
];

// Open cache on install.
self.addEventListener("install", (event) => {
    event.waitUntil(
        (async function () {
            const cache = await caches.open(CACHE_NAME);

            await cache.addAll(CACHED_URLS);
        })()
    );
});

// Cache and update with stale-while-revalidate policy.
self.addEventListener("fetch", (event) => {
    const { request } = event;

    // Prevent Chrome Developer Tools error:
    // Failed to execute 'fetch' on 'ServiceWorkerGlobalScope': 'only-if-cached' can be set only with 'same-origin' mode
    //
    // See also https://stackoverflow.com/a/49719964/1217468
    // if (request.cache === "only-if-cached" && request.mode !== "same-origin") {
    //     return;
    // }

    event.respondWith(
        (async function () {
            const cache = await caches.open(CACHE_NAME);

            const cachedResponsePromise = await cache.match(request);
            const networkResponsePromise = fetch(request);
            // if (request.url.startsWith(self.location.origin)) {
            event.waitUntil(
                (async function () {
                    const networkResponse = await networkResponsePromise;

                    await cache.put(request, networkResponse.clone());
                })()
            );
            // }
            return cachedResponsePromise || networkResponsePromise;
        })()
    );
});
