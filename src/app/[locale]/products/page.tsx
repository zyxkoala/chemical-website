import { Suspense } from 'react';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/ui/PageHero';
import { ProductSearchBox } from '@/components/products/ProductSearchBox';
import { ProductCategoryGrid } from '@/components/products/ProductCategoryGrid';
import { FeaturedProductsSection } from '@/components/products/FeaturedProductsSection';
import { InquiryCTABand } from '@/components/products/InquiryCTABand';
import { getPublishedProducts } from '@/lib/products';
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
  setRequestLocale(locale);

  const t = await getTranslations('products');
  const allProducts = getPublishedProducts(locale as Locale);

  return (
    <>
      <PageHero
        eyebrow={t('pageHero.eyebrow')}
        title={t('pageHero.title')}
        subtitle={t('pageHero.subtitle')}
      />

      <section className="py-16 bg-white">
        <div className="max-w-page-max mx-auto px-section-px">
          <Suspense fallback={null}>
            <ProductSearchBox allProducts={allProducts} />
          </Suspense>
        </div>
      </section>

      <ProductCategoryGrid locale={locale as Locale} heading={t('categoriesHeading')} />
      <FeaturedProductsSection locale={locale as Locale} heading={t('featuredHeading')} />
      <InquiryCTABand locale={locale as Locale} />
    </>
  );
}
