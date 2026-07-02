import type { MetadataRoute } from 'next';
import { features, navItems } from '@/config/features';
import { getProductPathStaticParams } from '@/lib/products';
import { localizedUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  const enabledPages = navItems.filter(i => features[i.key]);
  for (const item of enabledPages) {
    for (const locale of ['en', 'zh'] as const) {
      routes.push({
        url: localizedUrl(locale, item.href),
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  for (const path of ['/privacy', '/terms', '/disclaimer'] as const) {
    for (const locale of ['en', 'zh'] as const) {
      routes.push({
        url: localizedUrl(locale, path),
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 0.3,
      });
    }
  }

  // Category list and product detail pages emitted by the [...path] catch-all
  const productParams = getProductPathStaticParams();
  for (const { locale, path } of productParams) {
    const sub = path.join('/');
    const routePath = `/products/${sub}`;
    routes.push({
      url: localizedUrl(locale, routePath),
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return routes;
}
