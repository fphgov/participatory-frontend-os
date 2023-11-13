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
    reactStrictMode: false,
    poweredByHeader: false,
    images: {
      unoptimized: true,
    },
    experimental: {
      serverActions: true,
      serverActionsBodySizeLimit: '2048mb',
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
