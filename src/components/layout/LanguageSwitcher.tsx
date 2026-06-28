'use client';
import { usePathname, useRouter } from 'next/navigation';
import { track } from '@/lib/analytics';
import type { Locale } from '@/types/locale';

export function LanguageSwitcher({
  currentLocale,
  className = '',
}: {
  currentLocale: Locale;
  className?: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) return;
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    track('language_switch', { from: currentLocale, to: newLocale, page: pathname });
    router.push(newPath);
  };

  return (
    <div className={`flex items-center gap-2 text-nav ${className}`}>
      <button
        onClick={() => switchLocale('en')}
        className={`transition-colors ${currentLocale === 'en' ? 'text-white font-semibold' : 'text-gray-light hover:text-white'}`}
      >
        EN
      </button>
      <span className="text-gray-light">|</span>
      <button
        onClick={() => switchLocale('zh')}
        className={`transition-colors ${currentLocale === 'zh' ? 'text-white font-semibold' : 'text-gray-light hover:text-white'}`}
      >
        中文
      </button>
    </div>
  );
}
