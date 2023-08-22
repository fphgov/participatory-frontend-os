import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://otlet.budapest.hu'
  return [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
      {
        url: baseUrl + '/bejelentkezes',
        lastModified: new Date(),
      },
      {
        url: baseUrl + '/kijelentkezes',
        lastModified: new Date(),
      }
  ]
}
