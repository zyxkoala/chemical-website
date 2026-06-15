import { Hero } from '@/components/home/Hero';
import { ProductCategoriesSection } from '@/components/home/ProductCategoriesSection';
import { WhyUsSummary } from '@/components/home/WhyUsSummary';
import { ApplicationsSummary } from '@/components/home/ApplicationsSummary';
import type { Locale } from '@/types/locale';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return (
    <>
      <Hero locale={locale} />
      <ProductCategoriesSection locale={locale as Locale} />
      <WhyUsSummary />
      <ApplicationsSummary />
    </>
  );
}
