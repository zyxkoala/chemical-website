import Fuse from 'fuse.js';
import type { LocalizedProduct } from '@/types/product';

const STRICT_CATEGORY_TERMS = [
  'hdpe',
  'ldpe',
  'lldpe',
  'mlldpe',
  'pe',
  'pp',
  'ppr',
] as const;

const STRICT_CATEGORY_TERM_SET = new Set<string>(STRICT_CATEGORY_TERMS);

const SEARCH_KEYS = ['name', 'casNo', 'category', 'summary'] as const;

function normalizeSearchText(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

function tokenizeSearchText(value: string): string[] {
  return normalizeSearchText(value).split(/\s+/).filter(Boolean);
}

function productHasExactToken(product: LocalizedProduct, token: string): boolean {
  return SEARCH_KEYS.some(key => {
    const value = product[key];
    return typeof value === 'string' && tokenizeSearchText(value).includes(token);
  });
}

function productMatchesStrictCategory(product: LocalizedProduct, token: string): boolean {
  switch (token) {
    case 'pe':
      return ['ldpe', 'hdpe'].includes(product.category)
        || product.category.startsWith('lldpe-')
        || product.category.startsWith('mlldpe-');
    case 'pp':
      return product.category === 'pp' || product.category.startsWith('pp-');
    case 'ldpe':
    case 'hdpe':
      return product.category === token;
    case 'lldpe':
    case 'mlldpe':
      return product.category === token || product.category.startsWith(`${token}-`);
    case 'ppr':
      return productHasExactToken(product, token);
    default:
      return false;
  }
}

function resolveStrictCategoryTokens(queryToken: string): string[] {
  if (STRICT_CATEGORY_TERM_SET.has(queryToken)) return [queryToken];

  if (queryToken.length < 3) return [];

  return STRICT_CATEGORY_TERMS.filter(term => term.startsWith(queryToken));
}

export function searchLocalizedProducts(
  products: LocalizedProduct[],
  query: string,
): LocalizedProduct[] {
  const q = query.trim();
  if (q.length === 0) return products;

  const queryTokens = tokenizeSearchText(q);
  const strictCategoryTokens = Array.from(
    new Set(queryTokens.flatMap(token => resolveStrictCategoryTokens(token))),
  );

  const categorySafeProducts =
    strictCategoryTokens.length === 0
      ? products
      : products.filter(product =>
          strictCategoryTokens.every(token => productMatchesStrictCategory(product, token)),
        );

  if (categorySafeProducts.length === 0 || strictCategoryTokens.length === queryTokens.length) {
    return categorySafeProducts;
  }

  const fuse = new Fuse(categorySafeProducts, {
    keys: [...SEARCH_KEYS],
    threshold: 0.35,
    ignoreLocation: true,
  });
  return fuse.search(q).map(r => r.item);
}
