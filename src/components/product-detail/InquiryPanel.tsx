import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import type { Locale } from '@/types/locale';

export function InquiryPanel({ locale }: { locale: Locale }) {
  const t = useTranslations('productDetail');
  const tButton = useTranslations('button');
  return (
    <section className="bg-navy-deep py-12">
      <div className="max-w-page-max mx-auto px-section-px flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h2 className="text-section-heading text-white mb-2">{t('inquiryHeading')}</h2>
          <p className="text-body text-gray-light max-w-xl">{t('inquiryCopy')}</p>
        </div>
        <div className="shrink-0">
          <Button variant="secondary" href={`/${locale}/contact`}>
            {tButton('contactTeam')}
          </Button>
        </div>
      </div>
    </section>
  );
}
