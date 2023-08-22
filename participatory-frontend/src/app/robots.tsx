import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/bp-admin",
    },
    sitemap: `https://otlet.budapest.hu/sitemap.xml`,
  }
}
