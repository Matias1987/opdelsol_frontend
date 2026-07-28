/*
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false, // 'minify' in Next versions < 12.0

}

module.exports = nextConfig
*/

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false, // 'minify' in Next versions < 12.0
  outputFileTracing: false,
  transpilePackages: [
    "@ant-design/icons",
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
  ],
  /*
  experimental: {
    // Forces Next.js to aggressively tree-shake these heavy packages
    optimizePackageImports: ["antd", "@ant-design/icons"],
  },*/
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
