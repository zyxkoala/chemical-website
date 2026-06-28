import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { getApplicationImage } from '@/lib/application-images';
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
    { variant: 'application-agriculture', titleKey: 'miningTitle', copyKey: 'miningCopy' },
    { variant: 'application-logistics', titleKey: 'agricultureTitle', copyKey: 'agricultureCopy' },
    { variant: 'application-manufacturing', titleKey: 'manufacturingTitle', copyKey: 'manufacturingCopy' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-page-max mx-auto px-section-px">
        <SectionHeading>{t('heading')}</SectionHeading>
        <div className="grid md:grid-cols-3 gap-8">
          {apps.map((app, i) => (
            <div key={i} className="border border-border-light rounded-card overflow-hidden">
              <div className="relative w-full h-40 overflow-hidden bg-gray-light/30">
                <Image
                  src={getApplicationImage(app.variant)}
                  alt={tItems(app.titleKey)}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
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
