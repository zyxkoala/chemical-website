import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PlaceholderVisual } from '@/components/ui/PlaceholderVisual';
import type { PlaceholderVariant } from '@/types/product';

type AppItem = {
  variant: PlaceholderVariant;
  titleKey: 'miningTitle' | 'agricultureTitle' | 'manufacturingTitle';
  copyKey: 'miningCopy' | 'agricultureCopy' | 'manufacturingCopy';
};

export function ApplicationsSummary() {
  const t = useTranslations('home.applications');
  const tItems = useTranslations('applications.items');
  const apps: AppItem[] = [
    { variant: 'application-mining', titleKey: 'miningTitle', copyKey: 'miningCopy' },
    { variant: 'application-agriculture', titleKey: 'agricultureTitle', copyKey: 'agricultureCopy' },
    { variant: 'application-manufacturing', titleKey: 'manufacturingTitle', copyKey: 'manufacturingCopy' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-page-max mx-auto px-section-px">
        <SectionHeading>{t('heading')}</SectionHeading>
        <div className="grid md:grid-cols-3 gap-8">
          {apps.map((app, i) => (
            <div key={i} className="border border-border-light rounded-card overflow-hidden">
              <PlaceholderVisual variant={app.variant} className="w-full h-40" />
              <div className="p-6">
                <h3 className="text-card-title text-navy-deep mb-2">{tItems(app.titleKey)}</h3>
                <p className="text-body text-gray-body">{tItems(app.copyKey)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
