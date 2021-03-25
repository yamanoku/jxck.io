if (!self.define) {
  const e = (e) => {
      "require" !== e && (e += ".js");
      let r = Promise.resolve();
      return (
        s[e] ||
          (r = new Promise(async (r) => {
            if ("document" in self) {
              const s = document.createElement("script");
              (s.src = e), document.head.appendChild(s), (s.onload = r);
            } else importScripts(e), r();
          })),
        r.then(() => {
          if (!s[e]) throw new Error(`Module ${e} didn’t register its module`);
          return s[e];
        })
      );
    },
    r = (r, s) => {
      Promise.all(r.map(e)).then((e) => s(1 === e.length ? e[0] : e));
    },
    s = { require: Promise.resolve(r) };
  self.define = (r, n, o) => {
    s[r] ||
      (s[r] = Promise.resolve().then(() => {
        let s = {};
        const c = { uri: location.origin + r.slice(1) };
        return Promise.all(
          n.map((r) => {
            switch (r) {
              case "exports":
                return s;
              case "module":
                return c;
              default:
                return e(r);
            }
          })
        ).then((e) => {
          const r = o(...e);
          return s.default || (s.default = r), s;
        });
      }));
  };
}
define("./serviceWorker.js", ["./workbox-06f25b95"], function (e) {
  "use strict";
  e.setCacheNameDetails({ prefix: "labs.jxck.io" }),
    self.addEventListener("message", (e) => {
      e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
    }),
    e.registerRoute(
      /.+(\/|.html)$/,
      new e.NetworkFirst({
        cacheName: "labs.jxck.io-html-cache",
        plugins: [
          new e.ExpirationPlugin({
            maxAgeSeconds: 604800,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /.+\.(js|css|woff)$/,
      new e.CacheFirst({
        cacheName: "labs.jxck.io-dependent-cache",
        plugins: [
          new e.ExpirationPlugin({
            maxAgeSeconds: 7776e3,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    ),
    e.registerRoute(
      /.+\.(png|gif|jpg|jpeg|svg)$/,
      new e.CacheFirst({
        cacheName: "labs.jxck.io-image-cache",
        plugins: [
          new e.ExpirationPlugin({
            maxAgeSeconds: 2592e3,
            purgeOnQuotaError: !0,
          }),
        ],
      }),
      "GET"
    );
});
//# sourceMappingURL=serviceWorker.js.map
