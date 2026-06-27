import { categories } from '@/content/categories';
import { localizeCategory } from './i18n';
import type { Locale, LocalizedCategory, ProductCategory } from '@/types/product';

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

export function getCategoryByPath(
  path: string[],
  locale: Locale,
): LocalizedCategory | null {
  if (!path.length) return null;
  const target = path.join('/');
  const c = categories.find(c => c.enabled && c.path.join('/') === target);
  return c ? localizeCategory(c, locale) : null;
}

export function getChildCategories(
  parentSlug: string | null,
  locale: Locale,
): LocalizedCategory[] {
  return categories
    .filter(c => c.enabled && c.parentSlug === parentSlug)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(c => localizeCategory(c, locale));
}

export function getCategoryAncestors(
  slug: string,
  locale: Locale,
): LocalizedCategory[] {
  const target = categories.find(c => c.slug === slug && c.enabled);
  if (!target) return [];
  // Skip the last segment (the category itself); walk root → parent
  return target.path
    .slice(0, -1)
    .map(s => categories.find(c => c.slug === s && c.enabled))
    .filter((c): c is ProductCategory => c != null)
    .map(c => localizeCategory(c, locale));
}

export function getSiblingCategories(
  slug: string,
  locale: Locale,
): LocalizedCategory[] {
  const target = categories.find(c => c.slug === slug && c.enabled);
  if (!target) return [];
  return categories
    .filter(c => c.enabled && c.parentSlug === target.parentSlug && c.slug !== slug)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(c => localizeCategory(c, locale));
}

export type CategoryTreeNode = LocalizedCategory & { children: CategoryTreeNode[] };

export function buildCategoryTree(locale: Locale): CategoryTreeNode[] {
  const enabled = categories
    .filter(c => c.enabled)
    .sort((a, b) => a.sortOrder - b.sortOrder);
  const byParent = new Map<string | null, ProductCategory[]>();
  for (const c of enabled) {
    const arr = byParent.get(c.parentSlug) ?? [];
    arr.push(c);
    byParent.set(c.parentSlug, arr);
  }
  const build = (parentSlug: string | null): CategoryTreeNode[] =>
    (byParent.get(parentSlug) ?? []).map(c => ({
      ...localizeCategory(c, locale),
      children: build(c.slug),
    }));
  return build(null);
}

export function getAllCategoryPaths(): string[][] {
  return categories.filter(c => c.enabled).map(c => [...c.path]);
}

// Returns a map of leaf category slug → full path array.
// Used to build product detail hrefs in browse views.
export function getLeafCategoryPathMap(): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  for (const c of categories) {
    if (c.enabled && c.isLeaf) map[c.slug] = [...c.path];
  }
  return map;
}
