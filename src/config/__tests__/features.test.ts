import { describe, it, expect } from 'vitest';
import { features, navItems, enabledMainNavItems, enabledFooterNavItems } from '../features';

describe('features', () => {
  it('enables exactly the V0.1 launch pages', () => {
    expect(features.home).toBe(true);
    expect(features.products).toBe(true);
    expect(features.productDetail).toBe(true);
    expect(features.contact).toBe(true);
    expect(features.privacy).toBe(true);
    expect(features.disclaimer).toBe(true);
    expect(features.whyUs).toBe(false);
    expect(features.about).toBe(false);
    expect(features.applications).toBe(false);
    expect(features.resources).toBe(false);
  });
});

describe('enabledMainNavItems', () => {
  it('returns Home, Products, Contact only at V0.1', () => {
    const keys = enabledMainNavItems().map(i => i.key);
    expect(keys).toEqual(['home', 'products', 'contact']);
  });
});

describe('enabledFooterNavItems', () => {
  it('does not include disabled pages', () => {
    const keys = enabledFooterNavItems().map(i => i.key);
    expect(keys).not.toContain('whyUs');
    expect(keys).not.toContain('about');
    expect(keys).not.toContain('applications');
  });

  it('includes the three enabled main-nav pages', () => {
    const keys = enabledFooterNavItems().map(i => i.key);
    expect(keys).toContain('home');
    expect(keys).toContain('products');
    expect(keys).toContain('contact');
  });
});

describe('navItems', () => {
  it('does not include privacy or disclaimer (footer-strip only)', () => {
    const keys = navItems.map(i => i.key);
    expect(keys).not.toContain('privacy');
    expect(keys).not.toContain('disclaimer');
  });
});
