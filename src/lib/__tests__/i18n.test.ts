import { describe, it, expect } from 'vitest';
import { pickLocalized, hasZhFallback, localizeProduct, localizeCategory } from '../i18n';
import type { Product, ProductCategory } from '@/types/product';

describe('pickLocalized', () => {
  it('returns en when locale is en', () => {
    expect(pickLocalized({ en: 'Hello', zh: '你好' }, 'en')).toBe('Hello');
  });
  it('returns zh when locale is zh and zh exists', () => {
    expect(pickLocalized({ en: 'Hello', zh: '你好' }, 'zh')).toBe('你好');
  });
  it('falls back to en when locale is zh and zh missing', () => {
    expect(pickLocalized({ en: 'Hello' }, 'zh')).toBe('Hello');
  });
});

describe('hasZhFallback', () => {
  it('returns false for en locale', () => {
    expect(hasZhFallback({ en: 'X' }, 'en')).toBe(false);
  });
  it('returns true when zh missing on zh locale', () => {
    expect(hasZhFallback({ en: 'X' }, 'zh')).toBe(true);
  });
  it('returns false when zh present on zh locale', () => {
    expect(hasZhFallback({ en: 'X', zh: 'Y' }, 'zh')).toBe(false);
  });
});

const sampleProduct: Product = {
  slug: 'sample',
  name: { en: 'Sample', zh: '样品' },
  category: 'industrial-chemicals',
  summary: { en: 'Sum' },
  overview: { en: 'Ovr' },
  packaging: [{ en: 'Bag', zh: '袋' }],
  applications: [{ en: 'Use' }],
  documents: [],
  specs: [{ label: { en: 'L' }, value: { en: 'V' } }],
  relatedProductSlugs: [],
  image: 'product-default',
  featured: false,
  published: true,
  sortOrder: 99,
};

describe('localizeProduct', () => {
  it('unwraps localized fields with fallback', () => {
    const p = localizeProduct(sampleProduct, 'zh');
    expect(p.name).toBe('样品');
    expect(p.summary).toBe('Sum');
    expect(p.packaging).toEqual(['袋']);
    expect(p.applications).toEqual(['Use']);
    expect(p.specs).toEqual([{ label: 'L', value: 'V' }]);
  });
});

describe('localizeCategory', () => {
  it('unwraps localized fields', () => {
    const cat: ProductCategory = {
      slug: 'x',
      name: { en: 'X', zh: 'X中' },
      summary: { en: 'sum', zh: '摘' },
      image: 'category-industrial',
      sortOrder: 1,
      enabled: true,
      path: ['x'],
      parentSlug: null,
      level: 0,
      isLeaf: true,
    };
    const out = localizeCategory(cat, 'zh');
    expect(out.name).toBe('X中');
    expect(out.summary).toBe('摘');
  });
});
