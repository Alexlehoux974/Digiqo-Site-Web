/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'digiqo.fr',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    unoptimized: process.env.NODE_ENV === 'development',
  },
  async redirects() {
    return [
      {
        source: '/services/publicite-en-ligne',
        destination: '/services/publicite-meta',
        permanent: true,
      },
      {
        source: '/devis-site-web',
        destination: '/devis-web',
        permanent: true,
      },
    ]
  },
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    })
    return config
  },
}

export default nextConfig