import { setRequestLocale, getTranslations } from 'next-intl/server';
import { LegalPage } from '@/components/legal/LegalPage';
import type { Locale } from '@/types/locale';

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('legal');
  return <LegalPage locale={locale as Locale} title={t('privacyTitle')} docName="privacy" />;
}
