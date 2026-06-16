import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactCard } from '@/components/contact/ContactCard';
import { UnlistedProductCTA } from '@/components/contact/UnlistedProductCTA';
import { GuidanceCard } from '@/components/contact/GuidanceCard';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/types/locale';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact.pageHero' });
  return buildMetadata({
    title: `${t('title')} — AOWATT`,
    description: t('subtitle'),
    path: '/contact',
    locale: locale as Locale,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contact');
  const tButton = await getTranslations('button');
  const _locale = locale as Locale;

  const cards = [
    {
      icon: '✉',
      label: t('email.label'),
      value: site.email,
      help: t('email.help'),
      href: `mailto:${site.email}`,
      buttonLabel: tButton('emailNow'),
    },
    {
      icon: '☎',
      label: t('phone.label'),
      value: site.phoneDisplay,
      help: t('phone.help'),
      href: `tel:${site.phone}`,
      buttonLabel: tButton('callNow'),
    },
    {
      icon: '💬',
      label: t('whatsapp.label'),
      value: 'WhatsApp',
      help: t('whatsapp.help'),
      href: site.whatsappUrl,
      buttonLabel: tButton('openWhatsApp'),
    },
    {
      icon: '📍',
      label: t('address.label'),
      value: site.address,
      help: t('address.help'),
      href: site.mapUrl,
      buttonLabel: tButton('viewMap'),
    },
  ];

  const guidance = [
    { title: t('guidance.requirementsTitle'), copy: t('guidance.requirementsCopy') },
    { title: t('guidance.documentsTitle'), copy: t('guidance.documentsCopy') },
    { title: t('guidance.logisticsTitle'), copy: t('guidance.logisticsCopy') },
  ];

  return (
    <>
      <PageHero
        locale={locale as Locale}
        eyebrow={t('pageHero.eyebrow')}
        title={t('pageHero.title')}
        subtitle={t('pageHero.subtitle')}
        ctaLabel={tButton('emailNow')}
        ctaHref={`mailto:${site.email}`}
      />

      <section className="py-16 bg-white">
        <div className="max-w-page-max mx-auto px-section-px">
          <p className="text-subtitle text-gray-body text-center max-w-3xl mx-auto mb-12">
            {t('intro')}
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-[1100px] mx-auto">
            {cards.map((c, i) => (
              <ContactCard key={i} {...c} page="contact" />
            ))}
          </div>
        </div>
      </section>

      <UnlistedProductCTA />

      <section className="py-20 bg-white">
        <div className="max-w-page-max mx-auto px-section-px">
          <SectionHeading>{t('guidanceHeading')}</SectionHeading>
          <div className="grid md:grid-cols-3 gap-6">
            {guidance.map((g, i) => (
              <GuidanceCard key={i} title={g.title} copy={g.copy} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
