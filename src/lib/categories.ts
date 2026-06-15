import { categories } from '@/content/categories';
import { localizeCategory } from './i18n';
import type { Locale, LocalizedCategory } from '@/types/product';

export function getEnabledCategories(locale: Locale): LocalizedCategory[] {
  return categories
    .filter(c => c.enabled)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(c => localizeCategory(c, locale));
}

export function getCategoryBySlug(slug: string, locale: Locale): LocalizedCategory | null {
  const c = categories.find(c => c.slug === slug && c.enabled);
  return c ? localizeCategory(c, locale) : null;
}
