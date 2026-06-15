import { useTranslations } from 'next-intl';
import { PageHero } from '@/components/ui/PageHero';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  const tErrors = useTranslations('errors');
  const tButton = useTranslations('button');
  return (
    <div>
      <PageHero title={tErrors('notFoundTitle')} subtitle={tErrors('notFoundCopy')} visualVariant="page-hero" />
      <div className="max-w-page-max mx-auto px-section-px py-16 text-center">
        <Button href="/">{tButton('backHome')}</Button>
      </div>
    </div>
  );
}
