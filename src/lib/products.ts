import Fuse from 'fuse.js';
import { products } from '@/content/products';
import { localizeProduct } from './i18n';
import { LOCALES } from '@/types/locale';
import { categories } from '@/content/categories';
import type { Locale, LocalizedProduct } from '@/types/product';

// Collect all leaf category slugs under a given category slug (inclusive if leaf).
function leafSlugsUnder(slug: string): string[] {
  const cat = categories.find(c => c.slug === slug && c.enabled);
  if (!cat) return [];
  if (cat.isLeaf) return [slug];
  const children = categories.filter(c => c.enabled && c.parentSlug === slug);
  return children.flatMap(c => leafSlugsUnder(c.slug));
}

// All visible products: published OR placeholder. Placeholders show as disabled cards
// in leaf category lists, but are excluded from detail-page generation and search.
function visible(): typeof products {
  return products
    .filter(p => p.published || p.placeholder)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

// Real, published, non-placeholder products. Used for featured sections,
// detail-page generation, and search.
function published(): typeof products {
  return products
    .filter(p => p.published && !p.placeholder)
    .sort((a, b) => a.sortOrder - b.sortOrder);
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
  return visible()
    .filter(p => p.category === categorySlug)
    .map(p => localizeProduct(p, locale));
}

// Returns all visible products under a category and all its descendant leaf categories.
export function getProductsUnderCategory(categorySlug: string, locale: Locale): LocalizedProduct[] {
  const leafSlugs = new Set(leafSlugsUnder(categorySlug));
  return visible()
    .filter(p => leafSlugs.has(p.category))
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

// Path-based static params for the new [...path] catch-all route.
// Includes all category list paths + non-placeholder published product detail paths.
export function getProductPathStaticParams(): { locale: Locale; path: string[] }[] {
  const params: { locale: Locale; path: string[] }[] = [];
  for (const locale of LOCALES) {
    for (const cat of categories) {
      if (!cat.enabled) continue;
      params.push({ locale, path: [...cat.path] });
    }
    for (const product of published()) {
      const leaf = categories.find(c => c.slug === product.category && c.enabled);
      if (leaf) params.push({ locale, path: [...leaf.path, product.slug] });
    }
  }
  return params;
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
