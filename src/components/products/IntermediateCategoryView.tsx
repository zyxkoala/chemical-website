import { useTranslations } from 'next-intl';
import { CategoryCardGrid } from './CategoryCardGrid';
import { PlaceholderVisual } from '@/components/ui/PlaceholderVisual';
import { getApplicationsForCategory } from '@/content/applications';
import type { LocalizedCategory } from '@/types/product';
import type { Locale } from '@/types/locale';

type Props = {
  category: LocalizedCategory;
  childCategories: LocalizedCategory[];
  siblings: LocalizedCategory[];
  locale: Locale;
};

export function IntermediateCategoryView({ category, childCategories, siblings, locale }: Props) {
  const t = useTranslations('productsCategory');
  const apps = getApplicationsForCategory(category.slug);

  return (
    <div className="space-y-16">
      {/* Children grid */}
      {childCategories.length > 0 && (
        <section>
          <h2 className="text-section text-navy-deep mb-2">{t('childrenHeading')}</h2>
          <p className="text-body text-gray-body mb-8">{category.summary}</p>
          <CategoryCardGrid categories={childCategories} locale={locale} />
        </section>
      )}

      {/* Applications */}
      {apps.length > 0 && (
        <section>
          <h2 className="text-section text-navy-deep mb-2">{t('applicationsHeading')}</h2>
          <p className="text-body text-gray-body mb-8">{t('applicationsSubtitle')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {apps.map(a => {
              const name = a.name[locale] ?? a.name.en;
              const summary = a.summary[locale] ?? a.summary.en;
              return (
                <div
                  key={a.slug}
                  className="border border-border-light rounded-card overflow-hidden bg-white"
                >
                  <PlaceholderVisual variant={a.image} className="w-full h-40" />
                  <div className="p-6">
                    <h3 className="text-card-title text-navy-deep mb-2">{name}</h3>
                    <p className="text-body text-gray-body line-clamp-3">{summary}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Sibling categories */}
      {siblings.length > 0 && (
        <section>
          <h2 className="text-section text-navy-deep mb-2">{t('relatedHeading')}</h2>
          <p className="text-body text-gray-body mb-8">{t('relatedSubtitle')}</p>
          <CategoryCardGrid categories={siblings} locale={locale} />
        </section>
      )}
    </div>
  );
}
