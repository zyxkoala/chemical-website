import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export function Hero({ locale }: { locale: string }) {
  const t = useTranslations('home.hero');
  const tButton = useTranslations('button');
  return (
    <section className="relative overflow-hidden bg-[url('/images/hero-chemical-plant.jpg')] bg-cover bg-center text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/72 to-navy/18" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/42 via-transparent to-transparent" />
      <div className="relative max-w-page-max mx-auto px-section-px min-h-[620px] py-20 flex items-center">
        <div className="max-w-[640px]">
          <h1 className="text-hero mb-6 text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.38)]">{t('title')}</h1>
          <p className="text-subtitle text-white/90 mb-10 max-w-[600px] drop-shadow-[0_1px_12px_rgba(0,0,0,0.45)]">{t('subtitle')}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" href={`/${locale}/products`}>
              {tButton('explore')}
            </Button>
            <Button
              variant="secondary"
              href={`/${locale}/contact`}
              className="bg-white/95"
            >
              {tButton('contactTeam')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
