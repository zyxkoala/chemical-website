'use client';
import Link from 'next/link';
import { track } from '@/lib/analytics';
import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  page: string; // current page path for analytics
  productSlug?: string;
  className?: string;
};

export function TrackedLink({ href, children, page, productSlug, className = '' }: Props) {
  const handleClick = () => {
    const eventName = href.startsWith('mailto:') ? 'contact_email_click'
      : href.startsWith('tel:') ? 'contact_phone_click'
      : href.includes('wa.me') ? 'contact_whatsapp_click'
      : null;

    if (eventName) {
      track(eventName, { page, product_slug: productSlug ?? 'none' });
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
