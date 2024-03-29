const withTM = require("next-transpile-modules")(["ui"]);

const withBundleStats = require("next-plugin-bundle-stats");

module.exports = withBundleStats()(
  withTM({
    reactStrictMode: false,
    swcMinify: true,
    images: {
      domains: [
        "gateway.pinata.cloud",
        "cdn2.kadefi.money",
        "ipfs.io",
        "firebasestorage.googleapis.com",
        "swap.ecko.finance",
        "swap.kaddex.com",
        "api.dexscan.ecko.finance",
      ],
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      });

      return config;
    },
  })
);
