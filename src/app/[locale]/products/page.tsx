import Link from 'next/link';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/ui/PageHero';
import { PlaceholderVisual } from '@/components/ui/PlaceholderVisual';
import { InquiryCTABand } from '@/components/products/InquiryCTABand';
import { getChildCategories } from '@/lib/categories';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/types/locale';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'products.pageHero' });
  return buildMetadata({
    title: `${t('title')} — AOWATT`,
    description: t('subtitle'),
    path: '/products',
    locale: locale as Locale,
  });
}

export default async function ProductsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const loc = locale as Locale;
  setRequestLocale(locale);

  const t = await getTranslations('products');
  const roots = getChildCategories(null, loc);

  return (
    <>
      <PageHero
        locale={loc}
        eyebrow={t('pageHero.eyebrow')}
        title={t('pageHero.title')}
        subtitle={t('pageHero.subtitle')}
        backgroundImage="/images/products-hero.jpg"
      />

      <section className="py-20 bg-white">
        <div className="max-w-page-max mx-auto px-section-px">
          <div className="grid md:grid-cols-2 gap-8">
            {roots.map(root => (
              <Link
                key={root.slug}
                href={`/${loc}/products/${root.path.join('/')}`}
                className="group block border border-border-light rounded-card overflow-hidden hover:border-gold transition-colors"
              >
                <PlaceholderVisual variant={root.image} className="w-full h-64" />
                <div className="p-8">
                  <h2 className="text-card-title text-navy-deep mb-3 group-hover:text-gold transition-colors">
                    {root.name}
                  </h2>
                  <p className="text-body text-gray-body">{root.summary}</p>
                  <span className="inline-flex items-center gap-2 mt-4 text-body text-gold font-semibold">
                    {t('browseLabel')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <InquiryCTABand locale={loc} />
    </>
  );
}
