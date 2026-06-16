'use client';
import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Fuse from 'fuse.js';
import { track } from '@/lib/analytics';
import { ProductCard } from './ProductCard';
import type { LocalizedProduct } from '@/types/product';

type Props = {
  allProducts: LocalizedProduct[];
};

export function ProductSearchBox({ allProducts }: Props) {
  const t = useTranslations('products.search');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoryFilter = searchParams.get('category') ?? '';
  const [query, setQuery] = useState('');

  const fuse = useMemo(
    () => new Fuse(allProducts, {
      keys: ['name', 'casNo', 'category', 'summary'],
      threshold: 0.35,
      ignoreLocation: true,
    }),
    [allProducts],
  );

  const filtered = useMemo(() => {
    let base = allProducts;
    if (categoryFilter) base = base.filter(p => p.category === categoryFilter);
    if (query.trim().length === 0) return base;
    const hits = fuse.search(query.trim()).map(r => r.item);
    return categoryFilter ? hits.filter(p => p.category === categoryFilter) : hits;
  }, [allProducts, categoryFilter, fuse, query]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) return;
    const timer = setTimeout(() => {
      track('search_query', { query: q, results_count: filtered.length });
    }, 400);
    return () => clearTimeout(timer);
  }, [query, filtered.length]);

  const clearCategory = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete('category');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div>
      <div className="max-w-[1280px] mx-auto mb-8">
        <input
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t('placeholder')}
          className="w-full h-12 px-4 border border-border-light rounded-button text-body text-navy-deep placeholder:text-gray-body focus:outline-none focus:border-gold transition-colors"
        />
        {categoryFilter && (
          <button
            onClick={clearCategory}
            className="mt-3 inline-flex items-center gap-2 text-body text-gray-body hover:text-gold transition-colors"
          >
            <span>×</span>
            <span>{categoryFilter}</span>
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-body text-gray-body py-12">{t('empty')}</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(p => (
            <ProductCard key={p.slug} product={p} source="products_featured" variant="compact" />
          ))}
        </div>
      )}
    </div>
  );
}
