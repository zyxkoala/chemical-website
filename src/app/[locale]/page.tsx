import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { ProductCategoriesSection } from '@/components/home/ProductCategoriesSection';
import { WhyUsSummary } from '@/components/home/WhyUsSummary';
import { ApplicationsSummary } from '@/components/home/ApplicationsSummary';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/types/locale';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return buildMetadata({ title: t('homeTitle'), description: t('homeDescription'), path: '/', locale: locale as Locale });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <Hero locale={locale} />
      <ProductCategoriesSection locale={locale as Locale} />
      <WhyUsSummary />
      <ApplicationsSummary />
    </>
  );
}
