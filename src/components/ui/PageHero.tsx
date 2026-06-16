import { useTranslations } from 'next-intl';
import { Button } from './Button';
import { PlaceholderVisual } from './PlaceholderVisual';
import type { PlaceholderVariant } from '@/types/product';
import type { Locale } from '@/types/locale';

type Props = {
  locale: Locale;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  visualVariant?: PlaceholderVariant;
  backgroundImage?: string;
};

export function PageHero({
  locale,
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  visualVariant = 'page-hero',
  backgroundImage,
}: Props) {
  const tButton = useTranslations('button');
  const resolvedHref = ctaHref ?? `/${locale}/contact`;
  const resolvedLabel = ctaLabel ?? tButton('contactTeam');

  if (backgroundImage) {
    return (
      <section
        className="relative overflow-hidden bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/74 to-navy/18" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/38 via-transparent to-transparent" />
        <div className="relative max-w-page-max mx-auto px-section-px min-h-[420px] py-16 flex items-center">
          <div className="max-w-[640px]">
            {eyebrow && (
              <p className="text-gold uppercase text-[13px] font-semibold tracking-wide mb-3">
                {eyebrow}
              </p>
            )}
            <h1 className="text-page-title mb-4 text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.38)]">{title}</h1>
            {subtitle && (
              <p className="text-subtitle text-white/90 mb-6 drop-shadow-[0_1px_12px_rgba(0,0,0,0.42)]">
                {subtitle}
              </p>
            )}
            <Button variant="secondary" href={resolvedHref} className="bg-white/95">
              {resolvedLabel}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-navy text-white py-12">
      <div className="max-w-page-max mx-auto px-section-px grid lg:grid-cols-2 gap-8 items-center">
        <div>
          {eyebrow && (
            <p className="text-gold uppercase text-[13px] font-semibold tracking-wide mb-3">
              {eyebrow}
            </p>
          )}
          <h1 className="text-page-title mb-4">{title}</h1>
          {subtitle && <p className="text-subtitle text-gray-light mb-6">{subtitle}</p>}
          <Button variant="secondary" href={resolvedHref}>
            {resolvedLabel}
          </Button>
        </div>
        <div className="flex justify-center lg:justify-end">
          <PlaceholderVisual variant={visualVariant} className="w-full max-w-[600px] h-auto" />
        </div>
      </div>
    </section>
  );
}
