import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import type { Locale } from '@/types/locale';

export function InquiryCTABand({ locale }: { locale: Locale }) {
  const t = useTranslations('products.inquiryCTA');
  return (
    <section className="py-12 bg-white">
      <div className="max-w-page-max mx-auto px-section-px">
        <div className="bg-navy-deep text-white rounded-card px-12 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-card-title mb-2">{t('title')}</h3>
            <p className="text-body text-gray-light">{t('copy')}</p>
          </div>
          <Button variant="secondary" href={`/${locale}/contact`}>
            {t('button')}
          </Button>
        </div>
      </div>
    </section>
  );
}
