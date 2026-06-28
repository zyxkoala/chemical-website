import type { Metadata } from 'next';
import type { Locale } from '@/types/product';
import { site } from '@/content/site';

export const DEFAULT_SITE_URL = `https://${site.domain}`;

export function getSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL).replace(/\/+$/, '');
}

export function absoluteUrl(path = '/'): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function localizedUrl(locale: Locale, path: string): string {
  const normalizedPath = path === '/' ? '' : path.startsWith('/') ? path : `/${path}`;
  return absoluteUrl(`/${locale}${normalizedPath}/`);
}

type BuildArgs = {
  title: string;
  description: string;
  path: string; // begins with /
  locale: Locale;
  ogImage?: string;
  keywords?: string[];
};

export function buildMetadata({
  title,
  description,
  path,
  locale,
  ogImage,
  keywords,
}: BuildArgs): Metadata {
  const url = localizedUrl(locale, path);
  const imageUrl = ogImage ? absoluteUrl(ogImage) : undefined;
  return {
    title: { absolute: title },
    description,
    keywords,
    metadataBase: new URL(getSiteUrl()),
    alternates: {
      canonical: url,
      languages: {
        en: localizedUrl('en', path),
        zh: localizedUrl('zh', path),
        'x-default': localizedUrl('en', path),
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: locale === 'zh' ? 'zh_CN' : 'en_AU',
      type: 'website',
      images: imageUrl ? [{ url: imageUrl }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}
