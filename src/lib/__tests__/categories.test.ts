import { describe, it, expect } from 'vitest';
import { getEnabledCategories, getCategoryBySlug } from '../categories';

describe('getEnabledCategories', () => {
  it('returns 6 categories sorted by sortOrder', () => {
    const cats = getEnabledCategories('en');
    expect(cats).toHaveLength(6);
    expect(cats.map(c => c.slug)).toEqual([
      'industrial-chemicals', 'specialty-chemicals', 'solvents',
      'water-treatment', 'agricultural-chemicals', 'mining-chemicals',
    ]);
  });

  it('localizes name when locale is zh', () => {
    const cats = getEnabledCategories('zh');
    expect(cats[0].name).toBe('工业化学品');
  });
});

describe('getCategoryBySlug', () => {
  it('returns the category by slug', () => {
    expect(getCategoryBySlug('water-treatment', 'en')?.slug).toBe('water-treatment');
  });
  it('returns null for unknown slug', () => {
    expect(getCategoryBySlug('nope', 'en')).toBeNull();
  });
});
