import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { site } from '@/content/site';
import type { Locale } from '@/types/locale';

export function InquiryPanel({
  productName,
  productUrl,
}: {
  locale: Locale;
  productName?: string;
  productUrl?: string;
}) {
  const t = useTranslations('productDetail');
  const tButton = useTranslations('button');
  const mailtoHref = productName
    ? `mailto:${site.email}?subject=${encodeURIComponent(`Inquiry: ${productName}`)}&body=${encodeURIComponent(
      [
        `Hello AOWATT team,`,
        '',
        `I would like to enquire about ${productName}.`,
        productUrl ? `Product page: ${productUrl}` : '',
        '',
        'Target volume:',
        'Packaging preference:',
        'Destination port:',
        'Required documents: TDS / SDS / COA',
      ].filter(Boolean).join('\n'),
    )}`
    : `mailto:${site.email}`;

  return (
    <section className="bg-navy-deep py-12">
      <div className="max-w-page-max mx-auto px-section-px flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <h2 className="text-section-heading text-white mb-2">{t('inquiryHeading')}</h2>
          <p className="text-body text-gray-light max-w-xl">{t('inquiryCopy')}</p>
        </div>
        <div className="shrink-0">
          <Button variant="secondary" href={mailtoHref}>
            {tButton('emailOurTeam')}
          </Button>
        </div>
      </div>
    </section>
  );
}
