export type PageKey =
  | 'home' | 'products' | 'productDetail' | 'contact'
  | 'privacy' | 'disclaimer'
  | 'whyUs' | 'about' | 'applications' | 'resources';

export const features: Record<PageKey, boolean> = {
  home: true,
  products: true,
  productDetail: true,
  contact: true,
  privacy: true,
  disclaimer: true,
  whyUs: false,
  about: false,
  applications: false,
  resources: false,
};

export type NavItem = {
  key: PageKey;
  href: string;
  labelKey: string;
  inMainNav: boolean;
};

export const navItems: readonly NavItem[] = [
  { key: 'home', href: '/', labelKey: 'nav.home', inMainNav: true },
  { key: 'products', href: '/products', labelKey: 'nav.products', inMainNav: true },
  { key: 'whyUs', href: '/why-us', labelKey: 'nav.whyUs', inMainNav: false },
  { key: 'about', href: '/about', labelKey: 'nav.about', inMainNav: false },
  { key: 'applications', href: '/applications', labelKey: 'nav.applications', inMainNav: false },
  { key: 'contact', href: '/contact', labelKey: 'nav.contact', inMainNav: true },
] as const;

export function enabledMainNavItems(): NavItem[] {
  return navItems.filter(i => features[i.key] && i.inMainNav);
}

export function enabledFooterNavItems(): NavItem[] {
  return navItems.filter(i => features[i.key]);
}
