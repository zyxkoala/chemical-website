'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { CategorySidebar } from './CategorySidebar';
import type { CategoryTreeNode } from '@/lib/categories';
import type { Locale } from '@/types/locale';
import type { LocalizedCategory, LocalizedProduct } from '@/types/product';

type Props = {
  tree: CategoryTreeNode[];
  activeCategory: LocalizedCategory;
  // All products under the active category (including placeholders).
  products: LocalizedProduct[];
  // Map from leaf category slug → full path array, so we can build product hrefs.
  categoryPathMap: Record<string, string[]>;
  locale: Locale;
  searchPlaceholder: string;
  searchEmpty: string;
  searchResultsHeading: string;
  comingSoonLabel: string;
  emptyMessage: string;
  sidebarTitle: string;
};

export function CategoryBrowsePage({
  tree,
  activeCategory,
  products,
  categoryPathMap,
  locale,
  searchPlaceholder,
  searchEmpty,
  searchResultsHeading,
  comingSoonLabel,
  emptyMessage,
  sidebarTitle,
}: Props) {
  const [query, setQuery] = useState('');

  const searchableProducts = useMemo(
    () => products.filter(p => !p.placeholder),
    [products],
  );

  const fuse = useMemo(
    () =>
      new Fuse(searchableProducts, {
        keys: ['name', 'casNo', 'category', 'summary'],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [searchableProducts],
  );

  const searchResults = useMemo(() => {
    const q = query.trim();
    if (q.length === 0) return null;
    return fuse.search(q).map(r => r.item);
  }, [query, fuse]);

  const displayProducts = searchResults ?? products;

  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-page-max mx-auto px-section-px flex gap-12">
        <CategorySidebar
          tree={tree}
          locale={locale}
          activePath={activeCategory.path}
          title={sidebarTitle}
        />

        <div className="flex-1 min-w-0">
          {/* Search bar */}
          <div className="relative max-w-xl mb-8">
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-12 pl-10 pr-4 rounded border border-border-light text-[15px] text-navy-deep placeholder:text-gray-body focus:outline-none focus:border-gold transition-colors"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-body"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
            </svg>
          </div>

          {searchResults !== null && (
            <h2 className="text-[17px] font-semibold text-navy-deep mb-6">
              {searchResultsHeading} ({searchResults.length})
            </h2>
          )}

          {displayProducts.length === 0 ? (
            <p className="text-body text-gray-body py-12">
              {searchResults !== null ? searchEmpty : emptyMessage}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProducts.map(p => (
                <BrowseProductCard
                  key={p.slug}
                  product={p}
                  locale={locale}
                  categoryPath={categoryPathMap[p.category]}
                  comingSoonLabel={comingSoonLabel}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function BrowseProductCard({
  product,
  locale,
  categoryPath,
  comingSoonLabel,
}: {
  product: LocalizedProduct;
  locale: Locale;
  categoryPath: string[] | undefined;
  comingSoonLabel: string;
}) {
  if (product.placeholder) {
    return (
      <div
        aria-disabled="true"
        className="relative border border-border-light rounded-card overflow-hidden opacity-60 cursor-not-allowed"
      >
        <div className="p-6">
          <h3 className="text-card-title text-navy-deep mb-2">{product.name}</h3>
          <p className="text-body text-gray-body line-clamp-2 mb-4">{product.summary}</p>
          <span className="inline-block text-[13px] font-semibold text-gold bg-[#FDF6E7] px-3 py-1 rounded">
            {comingSoonLabel}
          </span>
        </div>
      </div>
    );
  }

  const href = categoryPath
    ? `/${locale}/products/${categoryPath.join('/')}/${product.slug}`
    : `/${locale}/products`;

  return (
    <Link
      href={href}
      className="group block border border-border-light rounded-card overflow-hidden hover:border-gold transition-colors"
    >
      <div className="p-6">
        <h3 className="text-card-title text-navy-deep mb-2 group-hover:text-gold transition-colors">
          {product.name}
        </h3>
        {product.casNo && (
          <p className="text-body text-gray-body mb-2">CAS {product.casNo}</p>
        )}
        <p className="text-body text-gray-body line-clamp-2">{product.summary}</p>
      </div>
    </Link>
  );
}
