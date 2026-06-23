'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MegaMenu } from '@/components/products/MegaMenu';
import { enabledMainNavItems } from '@/config/features';
import { buildCategoryTree } from '@/lib/categories';
import type { Locale } from '@/types/locale';

const DESKTOP_BREAKPOINT = 1024; // lg

export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const pathname = usePathname() ?? `/${locale}`;
  const navItems = enabledMainNavItems();

  const localePrefix = `/${locale}`;
  const relativePath = pathname.startsWith(localePrefix)
    ? pathname.slice(localePrefix.length) || '/'
    : pathname;
  const currentPath = relativePath.length > 1 ? relativePath.replace(/\/$/, '') : relativePath;

  const tree = buildCategoryTree(locale);

  const [megaOpen, setMegaOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      if (!e.matches) setMegaOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const scheduleOpen = () => {
    if (!isDesktop) return;
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    if (megaOpen) return;
    openTimer.current = setTimeout(() => setMegaOpen(true), 200);
  };
  const scheduleClose = () => {
    if (openTimer.current) {
      clearTimeout(openTimer.current);
      openTimer.current = null;
    }
    closeTimer.current = setTimeout(() => setMegaOpen(false), 200);
  };
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  return (
    <header className="bg-navy text-white h-header-h sticky top-0 z-50 relative">
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
            const isProducts = item.href === '/products';
            return (
              <div
                key={item.key}
                className="h-full flex items-center"
                onMouseEnter={isProducts ? scheduleOpen : undefined}
                onMouseLeave={isProducts ? scheduleClose : undefined}
              >
                <Link
                  href={`/${locale}${item.href}`}
                  aria-haspopup={isProducts && isDesktop ? 'menu' : undefined}
                  aria-expanded={isProducts && isDesktop ? megaOpen : undefined}
                  className={`text-nav h-full px-1 flex items-center gap-1 transition-colors hover:text-white relative ${isActive ? 'text-white' : 'text-gray-light'}`}
                >
                  {t(item.labelKey as any)}
                  {isProducts && (
                    <span aria-hidden="true" className="hidden lg:inline text-[10px]">▾</span>
                  )}
                  {isActive && <span className="absolute bottom-0 left-1 right-1 h-[3px] bg-gold" />}
                </Link>
              </div>
            );
          })}
        </nav>

        <LanguageSwitcher currentLocale={locale} />
      </div>

      {megaOpen && isDesktop && (
        <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
          <MegaMenu tree={tree} locale={locale} onClose={() => setMegaOpen(false)} />
        </div>
      )}
    </header>
  );
}
