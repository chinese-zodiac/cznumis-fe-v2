/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  //assetPrefix: '.',
  compiler: {
    emotion: true
  }
}

module.exports = nextConfig
