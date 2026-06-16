import type { Metadata } from 'next';
import { features } from '@/config/features';
import { notFound } from 'next/navigation';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { AdvantageCard } from '@/components/why-us/AdvantageCard';
import { ProcessTimeline } from '@/components/why-us/ProcessTimeline';
import { SupportCTA } from '@/components/why-us/SupportCTA';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/types/locale';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'whyUs.pageHero' });
  return buildMetadata({
    title: `${t('title')} — AOWATT`,
    description: t('subtitle'),
    path: '/why-us',
    locale: locale as Locale,
  });
}

export default async function WhyUsPage({ params }: { params: Promise<{ locale: string }> }) {
  if (!features.whyUs) notFound();

  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('whyUs');
  const tHome = await getTranslations('home.whyUs');
  const tProcess = await getTranslations('whyUs.process');

  const advantages = [
    { title: tHome('qualityTitle'), body: tHome('qualityBody') },
    { title: tHome('packagingTitle'), body: tHome('packagingBody') },
    { title: tHome('supportTitle'), body: tHome('supportBody') },
  ];

  const steps = [
    { num: '1', title: tProcess('step1') },
    { num: '2', title: tProcess('step2') },
    { num: '3', title: tProcess('step3') },
    { num: '4', title: tProcess('step4') },
    { num: '5', title: tProcess('step5') },
  ];

  return (
    <>
      <PageHero
        locale={locale as Locale}
        eyebrow={t('pageHero.eyebrow')}
        title={t('pageHero.title')}
        subtitle={t('pageHero.subtitle')}
      />

      <section className="py-20 bg-white">
        <div className="max-w-page-max mx-auto px-section-px">
          <SectionHeading>{t('advantagesHeading')}</SectionHeading>
          <div className="grid md:grid-cols-3 gap-8">
            {advantages.map((a, i) => (
              <AdvantageCard key={i} title={a.title} body={a.body} />
            ))}
          </div>
        </div>
      </section>

      <ProcessTimeline steps={steps} />

      <SupportCTA locale={locale as Locale} />
    </>
  );
}
