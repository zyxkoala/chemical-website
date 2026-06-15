'use client';
import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import * as Sentry from '@sentry/nextjs';
import { PageHero } from '@/components/ui/PageHero';
import { Button } from '@/components/ui/Button';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const tErrors = useTranslations('errors');
  const tButton = useTranslations('button');

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div>
      <PageHero title={tErrors('errorTitle')} subtitle={tErrors('errorCopy')} visualVariant="page-hero" />
      <div className="max-w-page-max mx-auto px-section-px py-16 text-center">
        <Button onClick={reset}>{tButton('reload')}</Button>
      </div>
    </div>
  );
}
