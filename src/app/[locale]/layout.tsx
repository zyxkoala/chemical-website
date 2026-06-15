import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { CloudflareBeacon } from '@/components/analytics/CloudflareBeacon';
import { LOCALES } from '@/types/locale';
import type { Locale } from '@/types/locale';

export function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!LOCALES.includes(locale as Locale)) notFound();

  const messages = await getMessages();
  const currentPath = '/';

  return (
    <NextIntlClientProvider messages={messages}>
      <Header locale={locale as Locale} currentPath={currentPath} />
      <main className="min-h-screen">{children}</main>
      <Footer locale={locale as Locale} />
      <AnalyticsProvider />
      <CloudflareBeacon />
    </NextIntlClientProvider>
  );
}
