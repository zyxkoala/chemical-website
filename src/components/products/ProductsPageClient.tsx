'use client';
import { useState } from 'react';
import { ProductSearchSection } from './ProductSearchSection';
import { FeaturedProductsSection } from './FeaturedProductsSection';
import type { LocalizedProduct } from '@/types/product';
import type { Locale } from '@/types/locale';

type Props = {
  products: LocalizedProduct[];
  locale: Locale;
  searchPlaceholder: string;
  searchEmpty: string;
  searchResultsHeading: string;
  featuredHeading: string;
};

export function ProductsPageClient({
  products,
  locale,
  searchPlaceholder,
  searchEmpty,
  searchResultsHeading,
  featuredHeading,
}: Props) {
  const [searchActive, setSearchActive] = useState(false);

  return (
    <>
      <ProductSearchSection
        products={products}
        placeholder={searchPlaceholder}
        emptyMessage={searchEmpty}
        resultsHeading={searchResultsHeading}
        onActiveChange={setSearchActive}
      />
      {!searchActive && (
        <FeaturedProductsSection locale={locale} heading={featuredHeading} />
      )}
    </>
  );
}
