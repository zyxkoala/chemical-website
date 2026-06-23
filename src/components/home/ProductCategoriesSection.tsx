import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PlaceholderVisual } from '@/components/ui/PlaceholderVisual';
import { getChildCategories } from '@/lib/categories';
import type { Locale } from '@/types/locale';

export function ProductCategoriesSection({ locale }: { locale: Locale }) {
  const t = useTranslations('home.categories');
  const categories = getChildCategories(null, locale);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-page-max mx-auto px-section-px">
        <SectionHeading>{t('heading')}</SectionHeading>
        <div className="grid md:grid-cols-2 gap-8">
          {categories.map(cat => (
            <Link
              key={cat.slug}
              href={`/${locale}/products/${cat.path.join('/')}`}
              className="group border border-border-light rounded-card p-6 hover:border-gold transition-colors"
            >
              <PlaceholderVisual variant={cat.image} className="w-full h-48 mb-4 rounded" />
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
