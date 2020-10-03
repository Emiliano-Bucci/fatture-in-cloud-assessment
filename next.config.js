const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  analyzeServer: ["server", "both"].includes(
    process.env.BUNDLE_ANALYZE === "true"
  ),
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  target: "serverless",
};

module.exports = withPlugins([withBundleAnalyzer, optimizedImages], nextConfig);
