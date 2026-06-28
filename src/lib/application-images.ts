import type { PlaceholderVariant } from '@/types/product';

const APPLICATION_IMAGE_BY_VARIANT: Partial<Record<PlaceholderVariant, string>> = {
  'application-mining': '/images/products/applications/greenhouse-film.jpg',
  'application-agriculture': '/images/products/applications/greenhouse-film.jpg',
  'application-logistics': '/images/products/applications/stretch-wrap.jpg',
  'application-manufacturing': '/images/products/applications/merchandise-bags.jpg',
  'application-coatings': '/images/products/applications/pe-film.jpg',
  'application-water': '/images/products/applications/high-strength-packaging.jpg',
};

export function getApplicationImage(variant: PlaceholderVariant): string {
  return APPLICATION_IMAGE_BY_VARIANT[variant] ?? '/images/products/applications/pe-film.jpg';
}
