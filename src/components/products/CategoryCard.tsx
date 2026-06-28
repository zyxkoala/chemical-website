import Link from 'next/link';
import { CategoryVisual } from './CategoryVisual';
import type { LocalizedCategory } from '@/types/product';
import type { Locale } from '@/types/locale';

type Props = {
  category: LocalizedCategory;
  locale: Locale;
};

export function CategoryCard({ category, locale }: Props) {
  return (
    <Link
      href={`/${locale}/products/${category.path.join('/')}`}
      className="group block border border-border-light rounded-card overflow-hidden hover:border-gold transition-colors"
    >
      <CategoryVisual
        variant={category.image}
        categorySlug={category.slug}
        className="w-full h-40"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="p-6">
        <h3 className="text-card-title text-navy-deep mb-2 group-hover:text-gold transition-colors">
          {category.name}
        </h3>
        <p className="text-body text-gray-body line-clamp-2 mb-3">{category.summary}</p>
        <span
          aria-hidden="true"
          className="inline-flex items-center gap-1 text-body text-gold font-semibold"
        >
          →
        </span>
      </div>
    </Link>
  );
}
