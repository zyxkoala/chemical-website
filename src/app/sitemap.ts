import type { MetadataRoute } from 'next';
import { features, navItems } from '@/config/features';
import { getProductPathStaticParams } from '@/lib/products';
import { localizedUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastMod = new Date();

  const routes: MetadataRoute.Sitemap = [];

  const enabledPages = navItems.filter(i => features[i.key]);
  for (const item of enabledPages) {
    for (const locale of ['en', 'zh'] as const) {
      routes.push({
        url: localizedUrl(locale, item.href),
        lastModified: lastMod,
        changeFrequency: 'monthly',
        priority: item.href === '/' ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: localizedUrl('en', item.href),
            zh: localizedUrl('zh', item.href),
            'x-default': localizedUrl('en', item.href),
          },
        },
      });
    }
  }

  for (const path of ['/privacy', '/disclaimer'] as const) {
    for (const locale of ['en', 'zh'] as const) {
      routes.push({
        url: localizedUrl(locale, path),
        lastModified: lastMod,
        changeFrequency: 'yearly',
        priority: 0.3,
        alternates: {
          languages: {
            en: localizedUrl('en', path),
            zh: localizedUrl('zh', path),
            'x-default': localizedUrl('en', path),
          },
        },
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
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: localizedUrl('en', routePath),
          zh: localizedUrl('zh', routePath),
          'x-default': localizedUrl('en', routePath),
        },
      },
    });
  }

  return routes;
}
