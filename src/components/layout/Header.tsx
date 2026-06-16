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
      <div className="max-w-page-max mx-auto px-header-px h-full flex items-center">
        <Link href={`/${locale}`} className="flex-shrink-0 flex items-center h-full">
          <Image
            src="/logos/aowatt-header.png"
            alt="AOWATT Global Materials"
            width={120}
            height={120}
            priority
            className="h-[80px] sm:h-[100px] md:h-[112px] w-auto object-contain"
          />
        </Link>

        <div className="hidden md:block w-px h-16 bg-white/20 mx-8" />

        <nav className="flex-1 flex items-center gap-3 sm:gap-6 md:gap-8 ml-2 md:ml-0">
          {navItems.map(item => {
            const isActive = item.href === '/'
              ? currentPath === '/'
              : currentPath === item.href || currentPath.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className={`text-nav transition-colors hover:text-white relative ${isActive ? 'text-white' : 'text-gray-light'}`}
              >
                {t(item.labelKey as any)}
                {isActive && <span className="absolute -bottom-10 left-0 right-0 h-[3px] bg-gold" />}
              </Link>
            );
          })}
        </nav>

        <LanguageSwitcher currentLocale={locale} />
      </div>
    </header>
  );
}
