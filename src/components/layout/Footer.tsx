import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { TrackedLink } from '@/components/analytics/TrackedLink';
import { getChildCategories } from '@/lib/categories';
import { enabledFooterNavItems } from '@/config/features';
import { site } from '@/content/site';
import type { Locale } from '@/types/locale';

export function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations('footer');
  // Show top-level branches (Raw Materials / Manufactured) in the footer.
  const categories = getChildCategories(null, locale);
  const navItems = enabledFooterNavItems();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="max-w-page-max mx-auto px-section-px pt-[56px] pb-[48px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Image
              src="/logos/aowatt-logo-cropped.png"
              alt={site.name}
              width={720}
              height={470}
              className="mb-4 w-[260px] md:w-[320px] h-auto object-contain"
            />
            {locale === 'en' ? (
              <p className="text-[15px] text-gray-light leading-6">
                <span className="block font-semibold">Beyond Raw Materials</span>
                <span className="block">We deliver uncompromising quality and measurable value.</span>
              </p>
            ) : (
              <p className="text-[15px] text-gray-light leading-6">
                <span className="block font-semibold">不止于原材料。</span>
                <span className="block">我们交付毫不妥协的品质与切实可见的价值。</span>
              </p>
            )}
          </div>

          <div>
            <h3 className="text-[17px] font-semibold text-gold mb-4">{t('productsHeading')}</h3>
            <ul className="space-y-2">
              {categories.map(cat => (
                <li key={cat.slug}>
                  <Link
                    href={`/${locale}/products/${cat.path.join('/')}`}
                    className="text-footer-link text-gray-light hover:text-gold transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[17px] font-semibold text-gold mb-4">{t('contactHeading')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">✉</span>
                <TrackedLink
                  href={`mailto:${site.email}`}
                  page="footer"
                  className="text-footer-link text-gray-light hover:text-gold transition-colors"
                >
                  {site.email}
                </TrackedLink>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">☎</span>
                <TrackedLink
                  href={`tel:${site.phone}`}
                  page="footer"
                  className="text-footer-link text-gray-light hover:text-gold transition-colors"
                >
                  {site.phoneDisplay}
                </TrackedLink>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">💬</span>
                <TrackedLink
                  href={site.whatsappUrl}
                  page="footer"
                  className="text-footer-link text-gray-light hover:text-gold transition-colors"
                >
                  WhatsApp
                </TrackedLink>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">📍</span>
                <TrackedLink
                  href={site.mapUrl}
                  page="footer"
                  className="text-footer-link text-gray-light hover:text-gold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {site.address}
                </TrackedLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-navy-strip border-t border-gold">
        <div className="max-w-page-max mx-auto px-section-px py-[15px] flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-start sm:items-center">
          <p className="text-legal text-gray-body">
            {t('copyright', { year: currentYear })}
          </p>
          <div className="flex gap-3 text-legal text-gray-light">
            <Link href={`/${locale}/privacy`} className="hover:text-gold transition-colors">
              {t('privacyLink')}
            </Link>
            <span>·</span>
            <Link href={`/${locale}/terms`} className="hover:text-gold transition-colors">
              {t('termsLink')}
            </Link>
            <span>·</span>
            <Link href={`/${locale}/disclaimer`} className="hover:text-gold transition-colors">
              {t('disclaimerLink')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
