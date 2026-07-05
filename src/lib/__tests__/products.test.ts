import { describe, it, expect } from 'vitest';
import {
  getPublishedProducts, getFeaturedProducts, getProductBySlug,
  getProductsByCategory, getProductStaticParams, getProductPathStaticParams,
  searchProducts,
} from '../products';

describe('getPublishedProducts', () => {
  it('excludes placeholder products', () => {
    const ps = getPublishedProducts('en');
    expect(ps.every(p => !p.placeholder)).toBe(true);
  });
});

describe('getFeaturedProducts', () => {
  it('respects the limit parameter', () => {
    expect(getFeaturedProducts('en', 1).length).toBeLessThanOrEqual(1);
  });
  it('only returns non-placeholder featured products', () => {
    expect(getFeaturedProducts('en').every(p => p.featured && !p.placeholder)).toBe(true);
  });
});

describe('getProductBySlug', () => {
  it('returns null for placeholder slug', () => {
    // Placeholder products are excluded from published lookups
    expect(getProductBySlug('ldpe-sample', 'en')).toBeNull();
  });
  it('returns null when slug unknown', () => {
    expect(getProductBySlug('does-not-exist', 'en')).toBeNull();
  });
  it('returns published LLDPE C6 grade across locales', () => {
    const en = getProductBySlug('f231s', 'en');
    const zh = getProductBySlug('f231s', 'zh');
    expect(en?.category).toBe('lldpe-c6');
    expect(en?.published).toBe(true);
    expect(en?.placeholder).toBe(false);
    expect(zh?.name).toContain('F231S');
    expect(en?.specs.some(s => s.label === 'Density')).toBe(true);
  });
});

describe('getProductsByCategory', () => {
  it('includes placeholder products in leaf category lists', () => {
    const ps = getProductsByCategory('ldpe', 'en');
    expect(ps.length).toBeGreaterThan(0);
    expect(ps.every(p => p.category === 'ldpe')).toBe(true);
  });
  it('exposes both published butene grades in lldpe-c4', () => {
    const slugs = getProductsByCategory('lldpe-c4', 'en').map(p => p.slug);
    expect(slugs).toEqual(expect.arrayContaining(['egf-34', 'egf-35b']));
  });
});

describe('getProductStaticParams', () => {
  it('excludes placeholder products from detail-page generation', () => {
    const params = getProductStaticParams();
    expect(params.every(p => !p.slug.endsWith('-sample'))).toBe(true);
  });
  it('includes the three published LLDPE grades', () => {
    const slugs = getProductStaticParams().map(p => p.slug);
    expect(slugs).toEqual(expect.arrayContaining(['f231s', 'egf-34', 'egf-35b']));
  });
});

describe('getProductPathStaticParams', () => {
  it('includes all enabled category list paths for each locale', () => {
    const params = getProductPathStaticParams();
    // 21 enabled categories × 2 locales = 42 (plus any non-placeholder product detail paths)
    expect(params.length).toBeGreaterThan(40);
    expect(params).toContainEqual({ locale: 'en', path: ['raw-materials', 'pe', 'lldpe', 'lldpe-c4'] });
    expect(params).toContainEqual({ locale: 'zh', path: ['manufactured', 'kitchen', 'cling-film'] });
  });
  it('includes detail-page paths for the published LLDPE grades', () => {
    const params = getProductPathStaticParams();
    expect(params).toContainEqual({
      locale: 'en',
      path: ['raw-materials', 'pe', 'lldpe', 'lldpe-c6', 'f231s'],
    });
    expect(params).toContainEqual({
      locale: 'zh',
      path: ['raw-materials', 'pe', 'lldpe', 'lldpe-c4', 'egf-34'],
    });
  });
});

describe('searchProducts', () => {
  it('finds the F231S grade by slug', () => {
    const hits = searchProducts('F231S', 'en');
    expect(hits.some(p => p.slug === 'f231s')).toBe(true);
  });
  it('strictly matches LLDPE as a category token', () => {
    const hits = searchProducts('lldpe', 'en');
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.every(p => /\blldpe\b/i.test(`${p.name} ${p.category} ${p.summary}`))).toBe(true);
    expect(hits.some(p => /\bldpe\b/i.test(p.name) && !/\blldpe\b/i.test(p.name))).toBe(false);
  });
  it('treats LLDPE category prefixes as strict category searches', () => {
    const hits = searchProducts('lldp', 'en');
    expect(hits.map(p => p.name)).toEqual(
      expect.arrayContaining(['LLDPE EGF-34', 'LLDPE EGF-35B', 'LLDPE F231S']),
    );
    expect(hits.some(p => /\bldpe\b/i.test(p.name) && !/\blldpe\b/i.test(p.name))).toBe(false);
  });
  it('strictly matches LDPE without returning LLDPE grades', () => {
    const hits = searchProducts('ldpe', 'en');
    expect(hits.length).toBeGreaterThan(0);
    expect(hits.every(p => /\bldpe\b/i.test(`${p.name} ${p.category} ${p.summary}`))).toBe(true);
    expect(hits.some(p => /\blldpe\b/i.test(p.name))).toBe(false);
  });
  it('returns empty for nonsense queries', () => {
    expect(searchProducts('xyz-no-such-thing', 'en')).toEqual([]);
  });
});
