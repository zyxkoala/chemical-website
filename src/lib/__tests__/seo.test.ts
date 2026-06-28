import { describe, it, expect } from 'vitest';
import { absoluteUrl, buildMetadata, localizedUrl } from '../seo';

describe('buildMetadata', () => {
  it('builds canonical and hreflang alternates for en', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://aowatt.com.au';
    const m = buildMetadata({ title: 'X', description: 'Y', path: '/products', locale: 'en' });
    expect(m.alternates?.canonical).toBe('https://aowatt.com.au/en/products/');
    expect((m.alternates?.languages as Record<string, string>)?.en).toBe('https://aowatt.com.au/en/products/');
    expect((m.alternates?.languages as Record<string, string>)?.zh).toBe('https://aowatt.com.au/zh/products/');
    expect((m.alternates?.languages as Record<string, string>)?.['x-default']).toBe('https://aowatt.com.au/en/products/');
  });

  it('uses zh_CN OG locale for zh', () => {
    const m = buildMetadata({ title: 'X', description: 'Y', path: '/', locale: 'zh' });
    expect(m.openGraph?.locale).toBe('zh_CN');
  });

  it('uses en_AU OG locale for en', () => {
    const m = buildMetadata({ title: 'X', description: 'Y', path: '/', locale: 'en' });
    expect(m.openGraph?.locale).toBe('en_AU');
  });

  it('normalizes site and localized urls', () => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com/';
    expect(absoluteUrl('/sitemap.xml')).toBe('https://example.com/sitemap.xml');
    expect(localizedUrl('zh', '/products')).toBe('https://example.com/zh/products/');
    expect(localizedUrl('en', '/')).toBe('https://example.com/en/');
  });
});
