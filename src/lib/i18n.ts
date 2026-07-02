import type {
  Locale, LocalizedString, Product, ProductCategory,
  LocalizedProduct, LocalizedCategory,
} from '@/types/product';

export function pickLocalized<T>(s: { en: T; zh?: T }, locale: Locale): T {
  if (locale === 'zh' && s.zh !== undefined) return s.zh;
  return s.en;
}

export function hasZhFallback(s: { en: unknown; zh?: unknown }, locale: Locale): boolean {
  return locale === 'zh' && s.zh === undefined;
}

function pickArr(arr: LocalizedString[], locale: Locale): string[] {
  return arr.map(s => pickLocalized(s, locale));
}

export function localizeProduct(p: Product, locale: Locale): LocalizedProduct {
  return {
    slug: p.slug,
    name: pickLocalized(p.name, locale),
    category: p.category,
    casNo: p.casNo,
    summary: pickLocalized(p.summary, locale),
    overview: pickLocalized(p.overview, locale),
    grade: p.grade ? pickLocalized(p.grade, locale) : undefined,
    purity: p.purity,
    packaging: pickArr(p.packaging, locale),
    applications: pickArr(p.applications, locale),
    documents: p.documents,
    specs: p.specs.map(s => ({
      label: pickLocalized(s.label, locale),
      value: pickLocalized(s.value, locale),
      methodStandard: s.methodStandard ? pickLocalized(s.methodStandard, locale) : undefined,
    })),
    relatedProductSlugs: p.relatedProductSlugs,
    image: p.image,
    heroImage: p.heroImage,
    featured: p.featured,
    published: p.published,
    placeholder: p.placeholder,
    sortOrder: p.sortOrder,
    seoTitle: p.seoTitle ? pickLocalized(p.seoTitle, locale) : undefined,
    seoDescription: p.seoDescription ? pickLocalized(p.seoDescription, locale) : undefined,
  };
}

export function localizeCategory(c: ProductCategory, locale: Locale): LocalizedCategory {
  return {
    slug: c.slug,
    name: pickLocalized(c.name, locale),
    summary: pickLocalized(c.summary, locale),
    image: c.image,
    sortOrder: c.sortOrder,
    enabled: c.enabled,
    path: c.path,
    parentSlug: c.parentSlug,
    level: c.level,
    isLeaf: c.isLeaf,
  };
}


