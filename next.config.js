module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    rewrites: async () => {
      return [
        {
          source: "/files/:path*",
          destination: `${process.env.BACKEND_URL}/app/api/files?filename=:path*`,
        },
        {
          source: "/api/:path*",
          destination: `${process.env.BACKEND_URL}/app/api/:path*`,
        },
        {
          source: "/admin/:path*",
          destination: `${process.env.BACKEND_URL}/admin/api/:path*`,
        },
      ];
    },
    redirects: async () => {
      return [
        {
          source: '/szavazas',
          destination: '/',
          permanent: false,
        }
      ]
    },
    reactStrictMode: false,
    poweredByHeader: false,
    images: {
      unoptimized: true,
    },
    experimental: {
      forceSwcTransforms: true,
    },
    trailingSlash: false,
    webpack: (
      config,
      { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) => {
      return config
    },
  }

  return nextConfig
}
