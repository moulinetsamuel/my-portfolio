import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://samuel-moulinet.fr',
      lastModified: new Date(),
    },
  ];
}
