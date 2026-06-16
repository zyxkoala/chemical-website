'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PlaceholderVisual } from '@/components/ui/PlaceholderVisual';
import { track } from '@/lib/analytics';
import type { LocalizedProduct } from '@/types/product';

type Props = {
  product: LocalizedProduct;
  source: 'products_featured' | 'detail_related' | 'home_categories';
  variant?: 'default' | 'compact';
};

export function ProductCard({ product, source, variant = 'default' }: Props) {
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en';

  const handleClick = () => {
    track('product_card_click', { slug: product.slug, source });
  };

  if (variant === 'compact') {
    return (
      <Link
        href={`/${locale}/products/${product.slug}`}
        onClick={handleClick}
        className="group flex items-center gap-4 border border-border-light rounded-card p-4 hover:border-gold transition-colors"
      >
        <PlaceholderVisual variant={product.image} className="w-20 h-20 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <h3 className="text-[16px] font-semibold text-navy-deep mb-1 group-hover:text-gold transition-colors truncate">
            {product.name}
          </h3>
          {product.casNo && (
            <p className="text-[14px] text-gray-body">CAS {product.casNo}</p>
          )}
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/${locale}/products/${product.slug}`}
      onClick={handleClick}
      className="group block border border-border-light rounded-card overflow-hidden hover:border-gold transition-colors"
    >
      <PlaceholderVisual variant={product.image} className="w-full h-48" />
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
