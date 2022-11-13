const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
  reactStrictMode: true,
  images: {
    domains: [
      "gateway.pinata.cloud",
      "cdn2.kadefi.money",
      "ipfs.io",
      "firebasestorage.googleapis.com",
    ],
  },
});
