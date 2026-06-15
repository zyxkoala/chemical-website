import { features } from '@/config/features';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { OverviewSection } from '@/components/about/OverviewSection';
import { CategoriesWeServeBand } from '@/components/about/CategoriesWeServeBand';
import { ValueCard } from '@/components/about/ValueCard';
import type { Locale } from '@/types/locale';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  if (!features.about) notFound();

  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');
  const tValues = await getTranslations('about.values');

  const values = [
    { title: tValues('qualityTitle'), copy: tValues('qualityCopy') },
    { title: tValues('reliabilityTitle'), copy: tValues('reliabilityCopy') },
    { title: tValues('integrityTitle'), copy: tValues('integrityCopy') },
  ];

  return (
    <>
      <PageHero
        eyebrow={t('pageHero.eyebrow')}
        title={t('pageHero.title')}
        subtitle={t('pageHero.subtitle')}
      />
      <OverviewSection />
      <CategoriesWeServeBand locale={locale as Locale} />
      <section className="py-20 bg-white">
        <div className="max-w-page-max mx-auto px-section-px">
          <SectionHeading>{t('valuesHeading')}</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <ValueCard key={i} title={v.title} copy={v.copy} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
