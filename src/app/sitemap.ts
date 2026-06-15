import type { MetadataRoute } from 'next';
import { features, navItems } from '@/config/features';
import { getProductStaticParams } from '@/lib/products';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aowatt.com.au';
  const lastMod = new Date('2026-06-15');

  const routes: MetadataRoute.Sitemap = [];

  const enabledPages = navItems.filter(i => features[i.key]);
  for (const item of enabledPages) {
    for (const locale of ['en', 'zh'] as const) {
      routes.push({
        url: `${base}/${locale}${item.href === '/' ? '' : item.href}`,
        lastModified: lastMod,
        changeFrequency: 'monthly',
        priority: item.href === '/' ? 1.0 : 0.8,
        alternates: {
          languages: {
            en: `${base}/en${item.href === '/' ? '' : item.href}`,
            zh: `${base}/zh${item.href === '/' ? '' : item.href}`,
          },
        },
      });
    }
  }

  for (const path of ['/privacy', '/disclaimer'] as const) {
    for (const locale of ['en', 'zh'] as const) {
      routes.push({
        url: `${base}/${locale}${path}`,
        lastModified: lastMod,
        changeFrequency: 'yearly',
        priority: 0.3,
        alternates: {
          languages: {
            en: `${base}/en${path}`,
            zh: `${base}/zh${path}`,
          },
        },
      });
    }
  }

  const productParams = getProductStaticParams();
  for (const { locale, slug } of productParams) {
    routes.push({
      url: `${base}/${locale}/products/${slug}`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${base}/en/products/${slug}`,
          zh: `${base}/zh/products/${slug}`,
        },
      },
    });
  }

  return routes;
}
