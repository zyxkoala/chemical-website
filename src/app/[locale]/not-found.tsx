import { useTranslations, useLocale } from 'next-intl';
import { PageHero } from '@/components/ui/PageHero';
import { Button } from '@/components/ui/Button';
import type { Locale } from '@/types/locale';

export default function NotFound() {
  const tErrors = useTranslations('errors');
  const tButton = useTranslations('button');
  const locale = useLocale() as Locale;
  return (
    <div>
      <PageHero locale={locale} title={tErrors('notFoundTitle')} subtitle={tErrors('notFoundCopy')} visualVariant="page-hero" />
      <div className="max-w-page-max mx-auto px-section-px py-16 text-center">
        <Button href={`/${locale}`}>{tButton('backHome')}</Button>
      </div>
    </div>
  );
}
