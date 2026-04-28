import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mototaxi.jays-transport.fr';
  return [
    { url: `${base}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/airports/cdg`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/airports/orly`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/stations/gare-du-nord`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/stations/gare-de-lyon`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/stations/gare-montparnasse`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/stations/gare-de-l-est`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 }
  ];
}
