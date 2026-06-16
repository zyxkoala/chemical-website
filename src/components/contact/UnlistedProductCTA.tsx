import { useTranslations } from 'next-intl';
import { TrackedLink } from '@/components/analytics/TrackedLink';
import { site } from '@/content/site';

export function UnlistedProductCTA() {
  const t = useTranslations('contact.unlistedCTA');
  return (
    <section className="py-12 bg-white">
      <div className="max-w-page-max mx-auto px-section-px">
        <div className="bg-navy-deep text-white rounded-card px-12 py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-card-title mb-2">{t('title')}</h3>
            <p className="text-body text-gray-light">{t('copy')}</p>
          </div>
          <TrackedLink
            href={`mailto:${site.email}`}
            page="contact"
            className="inline-flex items-center justify-center gap-2 rounded-button h-button px-[26px] text-[15px] font-semibold bg-white text-navy-deep border border-gold hover:bg-gold hover:text-navy-deep hover:border-gold transition-colors flex-shrink-0"
          >
            {t('button')}
            <span aria-hidden="true">→</span>
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
