import { describe, it, expect } from 'vitest';
import {
  getPublishedProducts, getFeaturedProducts, getProductBySlug,
  getProductsByCategory, getRelatedProducts, getProductStaticParams,
  searchProducts,
} from '../products';

describe('getPublishedProducts', () => {
  it('returns all 2 V0.1 products sorted', () => {
    const ps = getPublishedProducts('en');
    expect(ps).toHaveLength(2);
    expect(ps[0].slug).toBe('caustic-soda-flakes-99');
  });
  it('localizes the name when locale is zh', () => {
    const ps = getPublishedProducts('zh');
    expect(ps[0].name).toBe('片碱 99%');
  });
});

describe('getFeaturedProducts', () => {
  it('respects the limit parameter', () => {
    expect(getFeaturedProducts('en', 1)).toHaveLength(1);
  });
});

describe('getProductBySlug', () => {
  it('returns the product when it exists', () => {
    expect(getProductBySlug('caustic-soda-flakes-99', 'en')?.slug).toBe('caustic-soda-flakes-99');
  });
  it('returns null when slug unknown', () => {
    expect(getProductBySlug('does-not-exist', 'en')).toBeNull();
  });
});

describe('getProductsByCategory', () => {
  it('filters by category slug', () => {
    const ps = getProductsByCategory('industrial-chemicals', 'en');
    expect(ps.every(p => p.category === 'industrial-chemicals')).toBe(true);
    expect(ps.length).toBeGreaterThanOrEqual(2);
  });
});

describe('getRelatedProducts', () => {
  it('returns up to limit related products', () => {
    const p = getProductBySlug('caustic-soda-flakes-99', 'en')!;
    const related = getRelatedProducts(p, 'en', 3);
    expect(related.length).toBeLessThanOrEqual(3);
    expect(related.every(r => r.slug !== p.slug)).toBe(true);
  });
});

describe('getProductStaticParams', () => {
  it('returns locale × slug for all published products', () => {
    const params = getProductStaticParams();
    expect(params).toHaveLength(4); // 2 products × 2 locales
    expect(params).toContainEqual({ locale: 'en', slug: 'caustic-soda-flakes-99' });
    expect(params).toContainEqual({ locale: 'zh', slug: 'caustic-soda-flakes-99' });
  });
});

describe('searchProducts', () => {
  it('matches by name', () => {
    const r = searchProducts('caustic', 'en');
    expect(r.some(p => p.slug === 'caustic-soda-flakes-99')).toBe(true);
  });
  it('matches by CAS number', () => {
    const r = searchProducts('1310-73-2', 'en');
    expect(r.some(p => p.slug === 'caustic-soda-flakes-99')).toBe(true);
  });
  it('returns empty for no matches', () => {
    expect(searchProducts('xyz-no-such-thing', 'en')).toEqual([]);
  });
  it('returns full list for empty query', () => {
    expect(searchProducts('', 'en')).toHaveLength(2);
  });
});
