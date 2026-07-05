'use client';
import { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { searchLocalizedProducts } from '@/lib/product-search';
import type { LocalizedProduct } from '@/types/product';

type Props = {
  products: LocalizedProduct[];
  placeholder: string;
  emptyMessage: string;
  resultsHeading: string;
  onActiveChange?: (active: boolean) => void;
};

export function ProductSearchSection({ products, placeholder, emptyMessage, resultsHeading, onActiveChange }: Props) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim();
    if (q.length === 0) return null;
    return searchLocalizedProducts(products, q);
  }, [query, products]);

  const handleChange = (value: string) => {
    setQuery(value);
    onActiveChange?.(value.trim().length > 0);
  };

  return (
    <section className="py-8 bg-white border-b border-border-light">
      <div className="max-w-page-max mx-auto px-section-px">
        <div className="relative max-w-xl">
          <input
            type="search"
            value={query}
            onChange={e => handleChange(e.target.value)}
            placeholder={placeholder}
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

        {results !== null && (
          <div className="mt-8">
            {results.length === 0 ? (
              <p className="text-body text-gray-body">{emptyMessage}</p>
            ) : (
              <>
                <h2 className="text-[17px] font-semibold text-navy-deep mb-6">
                  {resultsHeading} ({results.length})
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {results.map(p => (
                    <ProductCard key={p.slug} product={p} source="products_featured" />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
