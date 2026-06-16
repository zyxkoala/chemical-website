import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function WhyUsSummary() {
  const t = useTranslations('home.whyUs');
  const items = [
    {
      title: t('qualityTitle'),
      body: t('qualityBody'),
      icon: (
        <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: t('packagingTitle'),
      body: t('packagingBody'),
      icon: (
        <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      title: t('supportTitle'),
      body: t('supportBody'),
      icon: (
        <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-page-max mx-auto px-section-px">
        <SectionHeading>{t('heading')}</SectionHeading>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="text-why-title text-navy-deep mb-3">{item.title}</h3>
              <p className="text-body text-gray-body">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
