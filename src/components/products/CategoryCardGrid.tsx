import { CategoryCard } from './CategoryCard';
import type { LocalizedCategory } from '@/types/product';
import type { Locale } from '@/types/locale';

type Props = {
  categories: LocalizedCategory[];
  locale: Locale;
};

export function CategoryCardGrid({ categories, locale }: Props) {
  if (categories.length === 0) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map(c => (
        <CategoryCard key={c.slug} category={c} locale={locale} />
      ))}
    </div>
  );
}
