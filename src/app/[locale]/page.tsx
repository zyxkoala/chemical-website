import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { ProductCategoriesSection } from '@/components/home/ProductCategoriesSection';
import { WhyUsSummary } from '@/components/home/WhyUsSummary';
import { ApplicationsSummary } from '@/components/home/ApplicationsSummary';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/types/locale';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === 'en'
    ? 'AOWATT Global Materials — Chemical Supplier for Global Industries'
    : 'AOWATT Global Materials — 全球工业化学品供应商';
  const description = locale === 'en'
    ? 'Reliable chemical supply with transparent documentation and responsive export support.'
    : '可靠的化学品供应，透明文档，响应式出口支持。';
  return buildMetadata({ title, description, path: '/', locale: locale as Locale });
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
