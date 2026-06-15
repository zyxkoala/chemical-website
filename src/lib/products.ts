import Fuse from 'fuse.js';
import { products } from '@/content/products';
import { localizeProduct } from './i18n';
import { LOCALES } from '@/types/locale';
import type { Locale, LocalizedProduct } from '@/types/product';

function published(): typeof products {
  return products.filter(p => p.published).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getPublishedProducts(locale: Locale): LocalizedProduct[] {
  return published().map(p => localizeProduct(p, locale));
}

export function getFeaturedProducts(locale: Locale, limit = 6): LocalizedProduct[] {
  return published()
    .filter(p => p.featured)
    .slice(0, limit)
    .map(p => localizeProduct(p, locale));
}

export function getProductBySlug(slug: string, locale: Locale): LocalizedProduct | null {
  const p = published().find(p => p.slug === slug);
  return p ? localizeProduct(p, locale) : null;
}

export function getProductsByCategory(categorySlug: string, locale: Locale): LocalizedProduct[] {
  return published()
    .filter(p => p.category === categorySlug)
    .map(p => localizeProduct(p, locale));
}

export function getRelatedProducts(
  product: LocalizedProduct,
  locale: Locale,
  limit = 3,
): LocalizedProduct[] {
  const all = published();
  const explicit = product.relatedProductSlugs
    .map(slug => all.find(p => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => p != null && p.slug !== product.slug);

  const sameCategory = all
    .filter(p => p.category === product.category && p.slug !== product.slug
      && !explicit.some(e => e.slug === p.slug));

  return [...explicit, ...sameCategory]
    .slice(0, limit)
    .map(p => localizeProduct(p, locale));
}

export function getProductStaticParams(): { locale: Locale; slug: string }[] {
  return published().flatMap(p => LOCALES.map(locale => ({ locale, slug: p.slug })));
}

export function searchProducts(query: string, locale: Locale): LocalizedProduct[] {
  const all = getPublishedProducts(locale);
  const q = query.trim();
  if (q.length === 0) return all;

  const fuse = new Fuse(all, {
    keys: ['name', 'casNo', 'category', 'summary'],
    threshold: 0.35,
    ignoreLocation: true,
  });
  return fuse.search(q).map(r => r.item);
}
