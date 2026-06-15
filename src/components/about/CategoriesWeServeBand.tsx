import { useTranslations } from 'next-intl';
import { getEnabledCategories } from '@/lib/categories';
import type { Locale } from '@/types/locale';

export function CategoriesWeServeBand({ locale }: { locale: Locale }) {
  const t = useTranslations('about');
  const categories = getEnabledCategories(locale);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-page-max mx-auto px-section-px">
        <div className="bg-navy-deep text-white rounded-card px-10 py-10">
          <h3 className="text-card-title text-center mb-6">{t('categoriesBandHeading')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
            {categories.map(cat => (
              <div key={cat.slug} className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full border-2 border-gold flex items-center justify-center">
                  <span className="text-gold text-sm" aria-hidden="true">●</span>
                </div>
                <span className="text-body text-gray-light">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
