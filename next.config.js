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
      ];
    },
    reactStrictMode: false,
    poweredByHeader: false,
    images: {
      unoptimized: true,
    },
    experimental: {
      serverActions: true,
      forceSwcTransforms: true,
    },
    publicRuntimeConfig: {
      matomoUrl: process.env.MATOMO_URL,
      matomoSiteId: process.env.MATOMO_SITE_ID,
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
