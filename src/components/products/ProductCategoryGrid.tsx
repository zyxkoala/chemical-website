import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PlaceholderVisual } from '@/components/ui/PlaceholderVisual';
import { getEnabledCategories } from '@/lib/categories';
import type { Locale } from '@/types/locale';

export function ProductCategoryGrid({ locale, heading }: { locale: Locale; heading: string }) {
  const categories = getEnabledCategories(locale);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-page-max mx-auto px-section-px">
        <SectionHeading>{heading}</SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/${locale}/products?category=${cat.slug}`}
              className="group border border-border-light rounded-card p-6 hover:border-gold transition-colors"
            >
              <PlaceholderVisual variant={cat.image} className="w-full h-40 mb-4 rounded" />
              <h3 className="text-card-title text-navy-deep mb-2 group-hover:text-gold transition-colors">
                {cat.name}
              </h3>
              <p className="text-body text-gray-body">{cat.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
