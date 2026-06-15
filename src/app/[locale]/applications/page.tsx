import { features } from '@/config/features';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/ui/PageHero';
import { ApplicationCard } from '@/components/applications/ApplicationCard';
import { ApplicationsCTA } from '@/components/applications/ApplicationsCTA';
import type { Locale } from '@/types/locale';
import type { PlaceholderVariant } from '@/types/product';

type Item = {
  variant: PlaceholderVariant;
  titleKey:
    | 'miningTitle' | 'agricultureTitle' | 'manufacturingTitle'
    | 'waterTitle' | 'coatingsTitle' | 'logisticsTitle';
  copyKey:
    | 'miningCopy' | 'agricultureCopy' | 'manufacturingCopy'
    | 'waterCopy' | 'coatingsCopy' | 'logisticsCopy';
};

export default async function ApplicationsPage({ params }: { params: Promise<{ locale: string }> }) {
  if (!features.applications) notFound();

  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('applications');
  const tItems = await getTranslations('applications.items');

  const items: Item[] = [
    { variant: 'application-mining', titleKey: 'miningTitle', copyKey: 'miningCopy' },
    { variant: 'application-agriculture', titleKey: 'agricultureTitle', copyKey: 'agricultureCopy' },
    { variant: 'application-manufacturing', titleKey: 'manufacturingTitle', copyKey: 'manufacturingCopy' },
    { variant: 'application-water', titleKey: 'waterTitle', copyKey: 'waterCopy' },
    { variant: 'application-coatings', titleKey: 'coatingsTitle', copyKey: 'coatingsCopy' },
    { variant: 'application-logistics', titleKey: 'logisticsTitle', copyKey: 'logisticsCopy' },
  ];

  return (
    <>
      <PageHero
        eyebrow={t('pageHero.eyebrow')}
        title={t('pageHero.title')}
        subtitle={t('pageHero.subtitle')}
      />
      <section className="py-20 bg-white">
        <div className="max-w-page-max mx-auto px-section-px">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((item, i) => (
              <ApplicationCard
                key={i}
                variant={item.variant}
                title={tItems(item.titleKey)}
                copy={tItems(item.copyKey)}
              />
            ))}
          </div>
        </div>
      </section>
      <ApplicationsCTA locale={locale as Locale} />
    </>
  );
}
