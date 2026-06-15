import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { PlaceholderVisual } from '@/components/ui/PlaceholderVisual';

export function Hero({ locale }: { locale: string }) {
  const t = useTranslations('home.hero');
  const tButton = useTranslations('button');
  return (
    <section className="bg-gradient-to-br from-navy to-navy-deep text-white py-20">
      <div className="max-w-page-max mx-auto px-section-px grid lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-[540px]">
          <h1 className="text-hero mb-6">{t('title')}</h1>
          <p className="text-subtitle text-gray-light mb-10">{t('subtitle')}</p>
          <div className="flex gap-4">
            <Button variant="primary" href={`/${locale}/products`}>
              {tButton('explore')}
            </Button>
            <Button variant="secondary" href={`/${locale}/contact`}>
              {tButton('contactTeam')}
            </Button>
          </div>
        </div>
        <div className="flex justify-center lg:justify-end">
          <PlaceholderVisual variant="hero-plant" className="w-full max-w-[600px] h-auto" />
        </div>
      </div>
    </section>
  );
}
