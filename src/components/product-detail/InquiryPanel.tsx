import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import type { Locale } from '@/types/locale';

export function InquiryPanel({ locale }: { locale: Locale }) {
  const t = useTranslations('productDetail');
  const tButton = useTranslations('button');
  return (
    <div className="bg-navy-deep text-white rounded-card p-8 flex flex-col justify-between">
      <div>
        <h2 className="text-card-title mb-3">{t('inquiryHeading')}</h2>
        <p className="text-body text-gray-light mb-6">{t('inquiryCopy')}</p>
      </div>
      <div>
        <Button variant="secondary" href={`/${locale}/contact`}>
          {tButton('contactTeam')}
        </Button>
      </div>
    </div>
  );
}
