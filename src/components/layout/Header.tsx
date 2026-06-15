import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';
import { enabledMainNavItems } from '@/config/features';
import type { Locale } from '@/types/locale';

export function Header({ locale, currentPath }: { locale: Locale; currentPath: string }) {
  const t = useTranslations('nav');
  const navItems = enabledMainNavItems();

  return (
    <header className="bg-navy text-white h-header-h sticky top-0 z-50">
      <div className="max-w-page-max mx-auto px-header-px h-full flex items-center">
        <Link href={`/${locale}`} className="flex-shrink-0">
          <Image
            src="/logos/aowatt-header.png"
            alt="AOWATT Global Materials"
            width={288}
            height={116}
            priority
          />
        </Link>

        <div className="w-px h-16 bg-white/20 mx-8" />

        <nav className="flex-1 flex items-center gap-8">
          {navItems.map(item => {
            const isActive = currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href));
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
