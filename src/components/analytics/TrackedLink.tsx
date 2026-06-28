'use client';
import Link from 'next/link';
import { track } from '@/lib/analytics';
import type { ReactNode } from 'react';

type Props = {
  href: string;
  children: ReactNode;
  page: string;
  productSlug?: string;
  className?: string;
  target?: string;
  rel?: string;
};

export function TrackedLink({ href, children, page, productSlug, className = '', target, rel }: Props) {
  const isHttpExternal = href.startsWith('http');
  const safeTarget = target ?? (isHttpExternal ? '_blank' : undefined);
  const safeRel = rel ?? (isHttpExternal ? 'noopener noreferrer' : undefined);

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
    <Link href={href} className={className} onClick={handleClick} target={safeTarget} rel={safeRel}>
      {children}
    </Link>
  );
}
