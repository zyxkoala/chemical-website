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
};

export function PageHero({
  locale,
  eyebrow,
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  visualVariant = 'page-hero',
}: Props) {
  const tButton = useTranslations('button');
  const resolvedHref = ctaHref ?? `/${locale}/contact`;
  const resolvedLabel = ctaLabel ?? tButton('contactTeam');

  return (
    <section className="bg-navy text-white py-16">
      <div className="max-w-page-max mx-auto px-section-px grid lg:grid-cols-2 gap-12 items-center">
        <div>
          {eyebrow && (
            <p className="text-gold uppercase text-[13px] font-semibold tracking-wide mb-4">
              {eyebrow}
            </p>
          )}
          <h1 className="text-page-title mb-6">{title}</h1>
          {subtitle && <p className="text-subtitle text-gray-light mb-8">{subtitle}</p>}
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
