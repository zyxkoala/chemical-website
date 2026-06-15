import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  variant?: 'primary' | 'secondary';
  href?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export function Button({ variant = 'primary', href, children, className = '', onClick }: Props) {
  const baseClass = 'inline-flex items-center justify-center gap-2 rounded-button h-button px-[26px] text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2';
  const variantClass = variant === 'primary'
    ? 'bg-blue-primary text-white hover:bg-blue-primary/90'
    : 'bg-white text-navy-deep border border-gold hover:bg-gold/5';
  const classes = `${baseClass} ${variantClass} ${className}`;

  const content = (
    <>
      {children}
      <span aria-hidden="true">→</span>
    </>
  );

  if (href) {
    return <Link href={href} className={classes}>{content}</Link>;
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
