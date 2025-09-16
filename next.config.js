/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    domains: [],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  async redirects() {
    return [
      {
        source: '/services/publicite-en-ligne',
        destination: '/services/publicite-meta',
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