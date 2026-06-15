import type { Metadata } from 'next';
import type { Locale } from '@/types/product';

type BuildArgs = {
  title: string;
  description: string;
  path: string; // begins with /
  locale: Locale;
  ogImage?: string;
};

export function buildMetadata({ title, description, path, locale, ogImage }: BuildArgs): Metadata {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://aowatt.com.au';
  const url = `${base}/${locale}${path === '/' ? '' : path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: `${base}/en${path === '/' ? '' : path}`,
        zh: `${base}/zh${path === '/' ? '' : path}`,
        'x-default': `${base}/en${path === '/' ? '' : path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: 'AOWATT Global Materials',
      locale: locale === 'zh' ? 'zh_CN' : 'en_AU',
      type: 'website',
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}
