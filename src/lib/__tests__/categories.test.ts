import { describe, it, expect } from 'vitest';
import {
  getEnabledCategories, getCategoryBySlug, getCategoryByPath,
  getChildCategories, getCategoryAncestors, getSiblingCategories, buildCategoryTree,
} from '../categories';

describe('getEnabledCategories', () => {
  it('returns the full enabled set sorted', () => {
    const cats = getEnabledCategories('en');
    // 2 roots + 2 PE/PP + 4 PE level3 + 4 LLDPE/MLLDPE level4 + 6 PP leaves + 1 kitchen + 2 manufactured leaves = 21
    expect(cats.length).toBeGreaterThan(15);
    expect(cats.some(c => c.slug === 'raw-materials')).toBe(true);
    expect(cats.some(c => c.slug === 'manufactured')).toBe(true);
  });

  it('localizes name when locale is zh', () => {
    const cats = getEnabledCategories('zh');
    const root = cats.find(c => c.slug === 'raw-materials');
    expect(root?.name).toBe('化工原料');
  });
});

describe('getCategoryBySlug', () => {
  it('returns a leaf category by slug', () => {
    expect(getCategoryBySlug('lldpe-c4', 'en')?.slug).toBe('lldpe-c4');
  });
  it('returns null for unknown slug', () => {
    expect(getCategoryBySlug('nope', 'en')).toBeNull();
  });
});

describe('getCategoryByPath', () => {
  it('resolves a 4-level nested path', () => {
    const c = getCategoryByPath(['raw-materials', 'pe', 'lldpe', 'lldpe-c4'], 'en');
    expect(c?.slug).toBe('lldpe-c4');
    expect(c?.level).toBe(4);
    expect(c?.isLeaf).toBe(true);
  });
  it('returns null for non-matching path', () => {
    expect(getCategoryByPath(['raw-materials', 'xx'], 'en')).toBeNull();
  });
});

describe('getChildCategories', () => {
  it('returns immediate PE children', () => {
    const children = getChildCategories('pe', 'en').map(c => c.slug);
    expect(children).toEqual(['ldpe', 'hdpe', 'lldpe', 'mlldpe']);
  });
  it('returns roots when parentSlug is null', () => {
    const roots = getChildCategories(null, 'en').map(c => c.slug);
    expect(roots).toEqual(['raw-materials', 'manufactured']);
  });
});

describe('getCategoryAncestors', () => {
  it('returns root → parent for a level-4 leaf', () => {
    const ancestors = getCategoryAncestors('lldpe-c4', 'en').map(c => c.slug);
    expect(ancestors).toEqual(['raw-materials', 'pe', 'lldpe']);
  });
  it('returns empty for a root category', () => {
    expect(getCategoryAncestors('raw-materials', 'en')).toEqual([]);
  });
});

describe('getSiblingCategories', () => {
  it('returns the other root category for raw-materials', () => {
    const siblings = getSiblingCategories('raw-materials', 'en').map(c => c.slug);
    expect(siblings).toEqual(['manufactured']);
  });
  it('returns mlldpe as the sibling of lldpe under pe', () => {
    const siblings = getSiblingCategories('lldpe', 'en').map(c => c.slug);
    expect(siblings).toEqual(expect.arrayContaining(['ldpe', 'hdpe', 'mlldpe']));
    expect(siblings).not.toContain('lldpe');
  });
  it('returns empty for an unknown slug', () => {
    expect(getSiblingCategories('nope', 'en')).toEqual([]);
  });
});

describe('buildCategoryTree', () => {
  it('produces the two-root tree with nested children', () => {
    const tree = buildCategoryTree('en');
    expect(tree).toHaveLength(2);
    const raw = tree.find(t => t.slug === 'raw-materials');
    expect(raw?.children.map(c => c.slug)).toEqual(['pe', 'pp']);
    const pe = raw?.children.find(c => c.slug === 'pe');
    expect(pe?.children.map(c => c.slug)).toEqual(['ldpe', 'hdpe', 'lldpe', 'mlldpe']);
    const lldpe = pe?.children.find(c => c.slug === 'lldpe');
    expect(lldpe?.children.map(c => c.slug)).toEqual(['lldpe-c4', 'lldpe-c6']);
    const mlldpe = pe?.children.find(c => c.slug === 'mlldpe');
    expect(mlldpe?.children.map(c => c.slug)).toEqual(['mlldpe-c6', 'mlldpe-c8']);
  });
});
