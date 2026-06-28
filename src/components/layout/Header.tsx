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
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${DESKTOP_BREAKPOINT}px)`);
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
      if (!e.matches) setMegaOpen(false);
      if (e.matches) setMobileOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [pathname]);

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
            className="h-[62px] sm:h-[68px] lg:h-[76px] w-auto object-contain"
          />
        </Link>

        <div className="hidden lg:block w-px h-10 bg-white/20 mx-6" />

        <nav className="hidden lg:flex flex-1 items-center h-full gap-7 ml-0">
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
                  {t(item.labelKey)}
                  {isActive && <span className="absolute bottom-0 left-1 right-1 h-[3px] bg-gold" />}
                </Link>
              </div>
            );
          })}
        </nav>

        <LanguageSwitcher currentLocale={locale} className="hidden lg:flex" />

        <button
          type="button"
          aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileOpen(open => !open)}
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-button border border-white/20 text-white transition-colors hover:border-gold hover:text-gold lg:hidden"
        >
          <span className="sr-only">{mobileOpen ? 'Close navigation' : 'Open navigation'}</span>
          <span aria-hidden="true" className="flex flex-col gap-[5px]">
            <span className={`h-[2px] w-5 bg-current transition-transform ${mobileOpen ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-[2px] w-5 bg-current transition-opacity ${mobileOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`h-[2px] w-5 bg-current transition-transform ${mobileOpen ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {mobileOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 right-0 top-full border-t border-white/10 bg-navy text-white shadow-[0_18px_36px_rgba(1,9,18,0.24)] lg:hidden"
        >
          <div className="max-w-page-max mx-auto px-section-px py-5">
            <nav aria-label="Mobile navigation" className="flex flex-col">
              {navItems.map(item => {
                const isActive = item.href === '/'
                  ? currentPath === '/'
                  : currentPath === item.href || currentPath.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.key}
                    href={`/${locale}${item.href}`}
                    onClick={() => setMobileOpen(false)}
                    className={`border-b border-white/10 py-4 text-[18px] font-semibold transition-colors ${isActive ? 'text-white' : 'text-gray-light hover:text-white'}`}
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-5">
              <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-gold">
                {t('nav.products')}
              </p>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {tree.map(item => (
                  <Link
                    key={item.slug}
                    href={`/${locale}/products/${item.path.join('/')}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-card border border-white/10 px-4 py-3 text-[15px] font-semibold text-gray-light transition-colors hover:border-gold hover:text-white"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
              <span className="text-[13px] font-semibold uppercase tracking-[0.12em] text-gold">
                {locale === 'en' ? 'Language' : '语言'}
              </span>
              <LanguageSwitcher currentLocale={locale} />
            </div>
          </div>
        </div>
      )}

      {megaOpen && isDesktop && (
        <div onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
          <MegaMenu tree={tree} locale={locale} onClose={() => setMegaOpen(false)} />
        </div>
      )}
    </header>
  );
}
