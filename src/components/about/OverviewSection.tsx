import { useTranslations } from 'next-intl';
import { PlaceholderVisual } from '@/components/ui/PlaceholderVisual';

export function OverviewSection() {
  const t = useTranslations('about');
  return (
    <section className="py-20 bg-white">
      <div className="max-w-page-max mx-auto px-section-px grid lg:grid-cols-2 gap-12 items-center">
        <div className="max-w-[600px]">
          <h2 className="text-section text-navy-deep mb-6">{t('overviewHeading')}</h2>
          <p className="text-body text-gray-body leading-relaxed">{t('overviewBody')}</p>
        </div>
        <div className="flex justify-center lg:justify-end">
          <PlaceholderVisual variant="about-overview" className="w-full max-w-[580px] h-auto" />
        </div>
      </div>
    </section>
  );
}
