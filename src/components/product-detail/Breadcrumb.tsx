import Link from 'next/link';
import type { Locale } from '@/types/locale';

type Crumb = { label: string; href?: string };

export function Breadcrumb({ locale, crumbs }: { locale: Locale; crumbs: Crumb[] }) {
  return (
    <nav className="bg-white border-b border-border-light">
      <div className="max-w-page-max mx-auto px-section-px py-4">
        <ol className="flex items-center gap-2 text-body text-gray-body">
          {crumbs.map((c, i) => (
            <li key={i} className="flex items-center gap-2">
              {c.href ? (
                <Link href={`/${locale}${c.href}`} className="hover:text-gold transition-colors">
                  {c.label}
                </Link>
              ) : (
                <span className="text-navy-deep">{c.label}</span>
              )}
              {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
