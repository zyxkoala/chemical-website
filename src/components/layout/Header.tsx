'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { enabledMainNavItems } from '@/config/features';
import type { Locale } from '@/types/locale';

export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const pathname = usePathname() ?? `/${locale}`;
  const navItems = enabledMainNavItems();

  const localePrefix = `/${locale}`;
  const relativePath = pathname.startsWith(localePrefix)
    ? pathname.slice(localePrefix.length) || '/'
    : pathname;
  const currentPath = relativePath.length > 1 ? relativePath.replace(/\/$/, '') : relativePath;

  return (
    <header className="bg-navy text-white h-header-h sticky top-0 z-50">
      <div className="max-w-page-max mx-auto px-6 md:px-header-px h-full flex items-center">
        <Link href={`/${locale}`} className="flex-shrink-0 flex items-center h-full">
          <Image
            src="/logos/aowatt-logo-cropped.png"
            alt="AOWATT Global Materials"
            width={720}
            height={470}
            priority
            className="h-[70px] sm:h-[72px] md:h-[76px] w-auto object-contain"
          />
        </Link>

        <div className="hidden md:block w-px h-10 bg-white/20 mx-6" />

        <nav className="flex-1 flex items-center h-full gap-3 sm:gap-5 md:gap-7 ml-2 md:ml-0">
          {navItems.map(item => {
            const isActive = item.href === '/'
              ? currentPath === '/'
              : currentPath === item.href || currentPath.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`text-nav h-full px-1 flex items-center transition-colors hover:text-white relative ${isActive ? 'text-white' : 'text-gray-light'}`}
              >
                {t(item.labelKey as any)}
                {isActive && <span className="absolute bottom-0 left-1 right-1 h-[3px] bg-gold" />}
              </Link>
            );
          })}
        </nav>

        <LanguageSwitcher currentLocale={locale} />
      </div>
    </header>
  );
}
