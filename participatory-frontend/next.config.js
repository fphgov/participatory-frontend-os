module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    rewrites: () => {
      return [
        {
          source: "/api/:path*",
          destination: `${process.env.APP_API_SERVER}/app/api/:path*`,
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
