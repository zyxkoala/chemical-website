'use client';
import { useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import * as Sentry from '@sentry/nextjs';
import { PageHero } from '@/components/ui/PageHero';
import { Button } from '@/components/ui/Button';
import type { Locale } from '@/types/locale';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const tErrors = useTranslations('errors');
  const tButton = useTranslations('button');
  const locale = useLocale() as Locale;

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div>
      <PageHero locale={locale} title={tErrors('errorTitle')} subtitle={tErrors('errorCopy')} visualVariant="page-hero" />
      <div className="max-w-page-max mx-auto px-section-px py-16 text-center">
        <Button onClick={reset}>{tButton('reload')}</Button>
      </div>
    </div>
  );
}
