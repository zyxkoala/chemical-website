import { useTranslations } from 'next-intl';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function WhyUsSummary() {
  const t = useTranslations('home.whyUs');
  const items = [
    { title: t('qualityTitle'), body: t('qualityBody') },
    { title: t('packagingTitle'), body: t('packagingBody') },
    { title: t('supportTitle'), body: t('supportBody') },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-page-max mx-auto px-section-px">
        <SectionHeading>{t('heading')}</SectionHeading>
        <div className="grid md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl text-gold">★</span>
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
