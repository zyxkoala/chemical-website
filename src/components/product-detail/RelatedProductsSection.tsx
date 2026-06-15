import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { LocalizedProduct } from '@/types/product';
import type { Locale } from '@/types/locale';

type Props = {
  locale: Locale;
  related: LocalizedProduct[];
};

export function RelatedProductsSection({ locale, related }: Props) {
  const t = useTranslations('productDetail');
  const tButton = useTranslations('button');

  if (related.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-page-max mx-auto px-section-px">
        <SectionHeading>{t('relatedHeading')}</SectionHeading>
        <div className="grid md:grid-cols-3 gap-8">
          {related.map(p => (
            <div key={p.slug} className="border border-border-light rounded-card p-6 hover:border-gold transition-colors">
              <h3 className="text-card-title text-navy-deep mb-3">{p.name}</h3>
              <p className="text-body text-gray-body mb-4 line-clamp-2">{p.summary}</p>
              <Link
                href={`/${locale}/products/${p.slug}`}
                className="inline-flex items-center gap-2 text-body text-gold font-semibold hover:underline"
              >
                {tButton('viewDetail')}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
