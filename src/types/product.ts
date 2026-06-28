import type { Locale } from './locale';

export type LocalizedString = { en: string; zh?: string };

export type ProductDocumentType = 'COA' | 'TDS' | 'SDS';

export type ProductSpec = {
  label: LocalizedString;
  value: LocalizedString;
};

export type PlaceholderVariant =
  | 'hero-plant'
  | 'page-hero'
  | 'category-industrial'
  | 'category-specialty'
  | 'category-solvents'
  | 'category-water'
  | 'category-agricultural'
  | 'category-mining'
  | 'category-raw-materials'
  | 'category-pe'
  | 'category-pp'
  | 'category-manufactured'
  | 'category-kitchen'
  | 'product-default'
  | 'product-lldpe-bag'
  | 'application-mining'
  | 'application-agriculture'
  | 'application-manufacturing'
  | 'application-water'
  | 'application-coatings'
  | 'application-logistics'
  | 'about-overview';

export type Product = {
  slug: string;
  name: LocalizedString;
  category: string;
  casNo?: string;
  summary: LocalizedString;
  overview: LocalizedString;
  grade?: LocalizedString;
  purity?: string;
  packaging: LocalizedString[];
  applications: LocalizedString[];
  documents: ProductDocumentType[];
  specs: ProductSpec[];
  relatedProductSlugs: string[];
  image: PlaceholderVariant;
  heroImage?: string;
  featured: boolean;
  published: boolean;
  placeholder?: boolean;
  sortOrder: number;
  seoTitle?: LocalizedString;
  seoDescription?: LocalizedString;
};

export type ProductCategory = {
  slug: string;
  name: LocalizedString;
  summary: LocalizedString;
  image: PlaceholderVariant;
  sortOrder: number;
  enabled: boolean;
  path: string[];
  parentSlug: string | null;
  level: number;
  isLeaf: boolean;
};

export type LocalizedProduct = {
  slug: string;
  name: string;
  category: string;
  casNo?: string;
  summary: string;
  overview: string;
  grade?: string;
  purity?: string;
  packaging: string[];
  applications: string[];
  documents: ProductDocumentType[];
  specs: { label: string; value: string }[];
  relatedProductSlugs: string[];
  image: PlaceholderVariant;
  heroImage?: string;
  featured: boolean;
  published: boolean;
  placeholder?: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
};

export type LocalizedCategory = {
  slug: string;
  name: string;
  summary: string;
  image: PlaceholderVariant;
  sortOrder: number;
  enabled: boolean;
  path: string[];
  parentSlug: string | null;
  level: number;
  isLeaf: boolean;
};

export type { Locale };
