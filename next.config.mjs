/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['pino', 'pino-pretty', 'thread-stream'],
  turbopack: {
    resolveAlias: {
      pino: 'pino/browser.js',
    },
  },
}

export default nextConfig
