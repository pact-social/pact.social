/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  staticPageGenerationTimeout: 200,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'http',
        hostname: '**.localhost'
      },
      {
        protocol: 'http',
        hostname: 'localhost'
      },
      {
        protocol: 'https',
        hostname: '**.pact.social'
      },
      {
        protocol: 'https',
        hostname: 'pact.social'
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/r/a-manifesto-for-blockchain',
        destination: '/m/kjzl6kcym7w8yaabd4elagu1aioocz9p4qjd9h6e3tdmmhwot1tw3gmntwqeys3',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
