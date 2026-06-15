import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { LegalPage } from '@/components/legal/LegalPage';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/types/locale';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legal' });
  return buildMetadata({
    title: `${t('disclaimerTitle')} — AOWATT`,
    description: t('disclaimerTitle'),
    path: '/disclaimer',
    locale: locale as Locale,
  });
}

export default async function DisclaimerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('legal');
  return <LegalPage locale={locale as Locale} title={t('disclaimerTitle')} docName="disclaimer" />;
}
