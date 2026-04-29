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
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
