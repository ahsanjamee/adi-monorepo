if (!self.define) {
  let e,
    s = {};
  const a = (a, c) => (
    (a = new URL(a + ".js", c).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (c, i) => {
    const n =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[n]) return;
    let r = {};
    const t = (e) => a(e, n),
      d = { module: { uri: n }, exports: r, require: t };
    s[n] = Promise.all(c.map((e) => d[e] || t(e))).then((e) => (i(...e), r));
  };
}
define(["./workbox-7c2a5a06"], function (e) {
  "use strict";
  importScripts("fallback-ElDYdB0-YjJxiVP49Vky4.js"),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        { url: "/404.svg", revision: "d38ac435783a21f1956e5ca6c207228d" },
        {
          url: "/_next/static/ElDYdB0-YjJxiVP49Vky4/_buildManifest.js",
          revision: "424b2f7b3263efdefcc3855396bf566a",
        },
        {
          url: "/_next/static/ElDYdB0-YjJxiVP49Vky4/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/1b8dab7b-e71a73e857a21eea.js",
          revision: "e71a73e857a21eea",
        },
        {
          url: "/_next/static/chunks/228771e0-98fcfd44de98fd5e.js",
          revision: "98fcfd44de98fd5e",
        },
        {
          url: "/_next/static/chunks/264-34fe43dec2afa4e1.js",
          revision: "34fe43dec2afa4e1",
        },
        {
          url: "/_next/static/chunks/274-dfc9e4c29eb4fa9f.js",
          revision: "dfc9e4c29eb4fa9f",
        },
        {
          url: "/_next/static/chunks/31664189-c617e5669a3b1180.js",
          revision: "c617e5669a3b1180",
        },
        {
          url: "/_next/static/chunks/318-d23033e24919812e.js",
          revision: "d23033e24919812e",
        },
        {
          url: "/_next/static/chunks/324-2d3e49a307b44a1e.js",
          revision: "2d3e49a307b44a1e",
        },
        {
          url: "/_next/static/chunks/351-f0377b61ac848e3f.js",
          revision: "f0377b61ac848e3f",
        },
        {
          url: "/_next/static/chunks/461-f10b2251d8d6cded.js",
          revision: "f10b2251d8d6cded",
        },
        {
          url: "/_next/static/chunks/464.2e67e0b35f955d8b.js",
          revision: "2e67e0b35f955d8b",
        },
        {
          url: "/_next/static/chunks/505-ae75342f948fbf6f.js",
          revision: "ae75342f948fbf6f",
        },
        {
          url: "/_next/static/chunks/519-d39884fd96237d72.js",
          revision: "d39884fd96237d72",
        },
        {
          url: "/_next/static/chunks/545.154d5c75ca71e5e3.js",
          revision: "154d5c75ca71e5e3",
        },
        {
          url: "/_next/static/chunks/65291039-c95616763e4667bd.js",
          revision: "c95616763e4667bd",
        },
        {
          url: "/_next/static/chunks/871-0b440651ed2a8307.js",
          revision: "0b440651ed2a8307",
        },
        {
          url: "/_next/static/chunks/921-a011611c5a484736.js",
          revision: "a011611c5a484736",
        },
        {
          url: "/_next/static/chunks/929-668a56c0f5765b3b.js",
          revision: "668a56c0f5765b3b",
        },
        {
          url: "/_next/static/chunks/960-085102946dcd314f.js",
          revision: "085102946dcd314f",
        },
        {
          url: "/_next/static/chunks/993-e5ddc34976a3fca6.js",
          revision: "e5ddc34976a3fca6",
        },
        {
          url: "/_next/static/chunks/ae51ba48-894b01c5dfb780c0.js",
          revision: "894b01c5dfb780c0",
        },
        {
          url: "/_next/static/chunks/c9184924-767b7949d33f3007.js",
          revision: "767b7949d33f3007",
        },
        {
          url: "/_next/static/chunks/framework-3b1fdd47ea23de49.js",
          revision: "3b1fdd47ea23de49",
        },
        {
          url: "/_next/static/chunks/main-3594a668a23ffc6c.js",
          revision: "3594a668a23ffc6c",
        },
        {
          url: "/_next/static/chunks/pages/404-f52bae9c68fc7ab2.js",
          revision: "f52bae9c68fc7ab2",
        },
        {
          url: "/_next/static/chunks/pages/_app-c97fdc3395f37d41.js",
          revision: "c97fdc3395f37d41",
        },
        {
          url: "/_next/static/chunks/pages/_error-df4003869a6623b0.js",
          revision: "df4003869a6623b0",
        },
        {
          url: "/_next/static/chunks/pages/_offline-debdf0990475f14e.js",
          revision: "debdf0990475f14e",
        },
        {
          url: "/_next/static/chunks/pages/about-us-d4713d08a40096fd.js",
          revision: "d4713d08a40096fd",
        },
        {
          url: "/_next/static/chunks/pages/checkout-5e34436a7ebd92f7.js",
          revision: "5e34436a7ebd92f7",
        },
        {
          url: "/_next/static/chunks/pages/contact-us-98f73624efd9aaa9.js",
          revision: "98f73624efd9aaa9",
        },
        {
          url: "/_next/static/chunks/pages/faq-8ced6ce28ae60ee3.js",
          revision: "8ced6ce28ae60ee3",
        },
        {
          url: "/_next/static/chunks/pages/index-94225e3ff069b16c.js",
          revision: "94225e3ff069b16c",
        },
        {
          url: "/_next/static/chunks/pages/offer-7552a74b38298c77.js",
          revision: "7552a74b38298c77",
        },
        {
          url: "/_next/static/chunks/pages/order/%5Bid%5D-b9b5b4233f26daeb.js",
          revision: "b9b5b4233f26daeb",
        },
        {
          url: "/_next/static/chunks/pages/privacy-policy-1a6df1e569506cc5.js",
          revision: "1a6df1e569506cc5",
        },
        {
          url: "/_next/static/chunks/pages/product/%5Bslug%5D-bd749291f8ded18b.js",
          revision: "bd749291f8ded18b",
        },
        {
          url: "/_next/static/chunks/pages/search-f6f30a0d4d748be8.js",
          revision: "f6f30a0d4d748be8",
        },
        {
          url: "/_next/static/chunks/pages/terms-and-conditions-41cdbc63b441293c.js",
          revision: "41cdbc63b441293c",
        },
        {
          url: "/_next/static/chunks/pages/user/change-password-b1bba756b6e765a4.js",
          revision: "b1bba756b6e765a4",
        },
        {
          url: "/_next/static/chunks/pages/user/dashboard-568fce9bf3011052.js",
          revision: "568fce9bf3011052",
        },
        {
          url: "/_next/static/chunks/pages/user/email-verification/%5Btoken%5D-cd59278258b491cf.js",
          revision: "cd59278258b491cf",
        },
        {
          url: "/_next/static/chunks/pages/user/forget-password/%5Btoken%5D-17a7b304888f55b2.js",
          revision: "17a7b304888f55b2",
        },
        {
          url: "/_next/static/chunks/pages/user/my-orders-4c40f84465b5e8eb.js",
          revision: "4c40f84465b5e8eb",
        },
        {
          url: "/_next/static/chunks/pages/user/recent-order-5fbf42aa04ff75c3.js",
          revision: "5fbf42aa04ff75c3",
        },
        {
          url: "/_next/static/chunks/pages/user/update-profile-668c9e7cf3e14f20.js",
          revision: "668c9e7cf3e14f20",
        },
        {
          url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
          revision: "837c0df77fd5009c9e46d446188ecfd0",
        },
        {
          url: "/_next/static/chunks/webpack-a9b28d934d14259c.js",
          revision: "a9b28d934d14259c",
        },
        {
          url: "/_next/static/css/21170dfef7fc2d21.css",
          revision: "21170dfef7fc2d21",
        },
        {
          url: "/_next/static/css/537a4b99085c4f54.css",
          revision: "537a4b99085c4f54",
        },
        {
          url: "/_next/static/css/f09e737914029c91.css",
          revision: "f09e737914029c91",
        },
        {
          url: "/_next/static/css/fe3ca4aa668b6f4f.css",
          revision: "fe3ca4aa668b6f4f",
        },
        { url: "/_offline", revision: "ElDYdB0-YjJxiVP49Vky4" },
        {
          url: "/about-banner.jpg",
          revision: "79bcd14e1663eeb10fd2078a1b40a68a",
        },
        { url: "/about-us.jpg", revision: "a69c8f7c944c6dd9673e4e8407684ae9" },
        {
          url: "/app-download-img-left.png",
          revision: "72d8da82c11b9694f687e2b24711a82a",
        },
        {
          url: "/app-download-img.png",
          revision: "22ab424e74d09df11be0f6943a264856",
        },
        {
          url: "/app/app-store.svg",
          revision: "32c5ed694c417ba076b5cd74db11d7c2",
        },
        {
          url: "/app/mastercard-icon.svg",
          revision: "21647f839931b7521935954bf863bdf0",
        },
        {
          url: "/app/paypal-icon.svg",
          revision: "6d4f73e4f9ce8f769d07e942366d468c",
        },
        {
          url: "/app/play-store.svg",
          revision: "4ba2cf43bf481375ce44f849bfcfdc01",
        },
        {
          url: "/app/skrill-icon.svg",
          revision: "20348abebbee6cc29769d37d6722f552",
        },
        {
          url: "/app/visa-icon.svg",
          revision: "8649b4351c14c295496bd216852050f9",
        },
        { url: "/banner-1.jpg", revision: "96eaf5765f56f7574dc21db0424668f3" },
        { url: "/banner-2.jpg", revision: "d08fc088d9d75823e8259261e9208cf2" },
        {
          url: "/contact-us.png",
          revision: "1f0a34dcebe83884f7d986c29069cff0",
        },
        { url: "/cta-bg.png", revision: "0dd94ded00743cc74d0da8027b579b73" },
        {
          url: "/cta/cta-bg-1.jpg",
          revision: "45b3e432be8fc7f3eb09f2568a61d8c2",
        },
        {
          url: "/cta/cta-bg-2.jpg",
          revision: "83ca16fa37654fd7de5518d0f347a29c",
        },
        {
          url: "/cta/cta-bg-3.jpg",
          revision: "42c150e775ca1b35399b3428d5ee2e00",
        },
        {
          url: "/cta/delivery-boy.png",
          revision: "9914b651b1428467046e8b886166dac9",
        },
        {
          url: "/facebook-page.png",
          revision: "0a668853fee7423c27bb93b947a6fc1c",
        },
        { url: "/faq.svg", revision: "2979a7b97c0c5d96960e9558a389bbd4" },
        { url: "/favicon.png", revision: "0033e08ea1185a9ef4ddea787f470df5" },
        { url: "/flags/de.svg", revision: "a491da9c1549a36b293a6a391739dfda" },
        { url: "/flags/us.svg", revision: "8886b28b10e3ec0756a9935a216d5bba" },
        {
          url: "/icon-192x192.png",
          revision: "47e2812c3e78f1903ccd46f0545f5d48",
        },
        {
          url: "/icon-256x256.png",
          revision: "5cfadd2f4679b3d86f1d994297809226",
        },
        {
          url: "/icon-384x384.png",
          revision: "e793bffd9497800be7d461caa873b96b",
        },
        {
          url: "/icon-512x512.png",
          revision: "b9df59369ad910b5d3e338e9076fd944",
        },
        {
          url: "/kachabazar-store-min.png",
          revision: "6bf12cd3f0a8d7ccf8285ea0672bf182",
        },
        {
          url: "/loader/spinner.gif",
          revision: "9317b1364997865cda53478fb9302977",
        },
        {
          url: "/logo/bag-shoping.svg",
          revision: "54014870b794b613e62017decbe943d0",
        },
        {
          url: "/logo/logo-2.jpg",
          revision: "3bb7a1cb7d91228f745f9e06035fb3d6",
        },
        {
          url: "/logo/logo-color.png",
          revision: "5935965ef93ee2a9eab4a1240699bc5f",
        },
        {
          url: "/logo/logo-color.svg",
          revision: "594db8e1b73beb28d284239633f088fa",
        },
        {
          url: "/logo/logo-dark-2.svg",
          revision: "17926b07262d3a6e824f3db46f5f160e",
        },
        {
          url: "/logo/logo-dark.svg",
          revision: "5306f50a439b75e80118e1b676c3dace",
        },
        {
          url: "/logo/logo-light-2.svg",
          revision: "354ef36903f55272ed7ece2c72deefd5",
        },
        {
          url: "/logo/logo-light.svg",
          revision: "69a504b1fa06d98d0786eb744eca32bc",
        },
        { url: "/logo/logo.png", revision: "4b6f741f1fb0e4f226dd2894ec992212" },
        { url: "/manifest.json", revision: "3125f13586d11d93bb5735dc025c7477" },
        { url: "/no-result.svg", revision: "508b2439b4b83ce579e826c9c625b675" },
        {
          url: "/page-header-bg.jpg",
          revision: "c7cf9224e6c1ae3add73d30c2ae7a8f8",
        },
        {
          url: "/payment-method/payment-logo.png",
          revision: "469911779f6463e5751cf5b7046384d2",
        },
        {
          url: "/placeholder.png",
          revision: "9270c3e671494ce5cee698be14784c92",
        },
        { url: "/robots.txt", revision: "fa1ded1ed7c11438a9b0385b1e112850" },
        {
          url: "/slider/slider-1.jpg",
          revision: "9611448d0a85493ee21c5317323cb601",
        },
        {
          url: "/slider/slider-2.jpg",
          revision: "fe98a6e4032332b05d52aa1254f085a7",
        },
        {
          url: "/slider/slider-3.jpg",
          revision: "06cef52491c3b8682d15596e784362bb",
        },
        {
          url: "/team/team-1.jpg",
          revision: "e318a12728d39d01c926be7fbbcd6876",
        },
        {
          url: "/team/team-2.jpg",
          revision: "ba945720d060272d028634a8729b7d2b",
        },
        {
          url: "/team/team-3.jpg",
          revision: "dfa429c7e964aa5a8ea01c3959710529",
        },
        {
          url: "/team/team-4.jpg",
          revision: "490ae645f676543ef728fc2548a6bd3f",
        },
        {
          url: "/team/team-5.jpg",
          revision: "a345363d59da88084c7fd6de76cc978c",
        },
        {
          url: "/team/team-6.jpg",
          revision: "39e8a23ea2ae4bc88316d1ddad73132c",
        },
      ],
      { ignoreURLParametersMatching: [] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      "/",
      new e.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: e,
              response: s,
              event: a,
              state: c,
            }) =>
              s && "opaqueredirect" === s.type
                ? new Response(s.body, {
                    status: 200,
                    statusText: "OK",
                    headers: s.headers,
                  })
                : s,
          },
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: "google-fonts-webfonts",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: "google-fonts-stylesheets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-font-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-image-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-image",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: "static-audio-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:mp4)$/i,
      new e.CacheFirst({
        cacheName: "static-video-assets",
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-js-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: "static-style-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: "next-data",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: "static-data-assets",
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        const s = e.pathname;
        return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "apis",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => {
        if (!(self.origin === e.origin)) return !1;
        return !e.pathname.startsWith("/api/");
      },
      new e.NetworkFirst({
        cacheName: "others",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      ({ url: e }) => !(self.origin === e.origin),
      new e.NetworkFirst({
        cacheName: "cross-origin",
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
          { handlerDidError: async ({ request: e }) => self.fallback(e) },
        ],
      }),
      "GET"
    );
});
