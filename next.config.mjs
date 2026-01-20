/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Transpile sanity packages
  transpilePackages: ['sanity', '@sanity/vision'],
}

export default nextConfig
