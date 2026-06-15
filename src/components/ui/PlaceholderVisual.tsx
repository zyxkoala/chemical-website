import type { PlaceholderVariant } from '@/types/product';

type Props = {
  variant: PlaceholderVariant;
  className?: string;
  tone?: 'navy' | 'blue' | 'gray';
};

export function PlaceholderVisual({ variant, className = '', tone }: Props) {
  const inferredTone = tone ?? getTone(variant);

  if (variant === 'hero-plant') {
    return (
      <svg className={className} viewBox="0 0 600 540" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#010912" />
            <stop offset="100%" stopColor="#053B7D" />
          </linearGradient>
        </defs>
        <rect width="600" height="540" fill="url(#heroBg)" rx="7" />
        {/* Plant towers: 7 vertical rectangles with varied heights */}
        <rect x="80" y="180" width="40" height="280" fill="#091C1C" opacity="0.6" />
        <rect x="140" y="120" width="40" height="340" fill="#091C1C" opacity="0.7" />
        <rect x="200" y="160" width="40" height="300" fill="#091C1C" opacity="0.65" />
        <rect x="260" y="100" width="40" height="360" fill="#091C1C" opacity="0.75" />
        <rect x="320" y="140" width="40" height="320" fill="#091C1C" opacity="0.7" />
        <rect x="380" y="180" width="40" height="280" fill="#091C1C" opacity="0.6" />
        <rect x="440" y="120" width="40" height="340" fill="#091C1C" opacity="0.7" />
        {/* Pipelines: 5 horizontal connectors */}
        <rect x="80" y="240" width="400" height="6" fill="#F09F14" opacity="0.4" />
        <rect x="120" y="300" width="360" height="6" fill="#F09F14" opacity="0.35" />
        <rect x="100" y="360" width="380" height="8" fill="#F09F14" opacity="0.5" />
        <rect x="140" y="200" width="320" height="5" fill="#F09F14" opacity="0.3" />
        <rect x="160" y="420" width="280" height="6" fill="#F09F14" opacity="0.4" />
        {/* Gold ring icon top-center */}
        <circle cx="300" cy="60" r="16" stroke="#F09F14" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  // Default variant: 5 bars + ring icon
  return (
    <svg className={className} viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={inferredTone === 'navy' ? '#010912' : inferredTone === 'blue' ? '#053B7D' : '#5C667A'} />
          <stop offset="100%" stopColor={inferredTone === 'navy' ? '#091C1C' : inferredTone === 'blue' ? '#010912' : '#D1E0F0'} />
        </linearGradient>
      </defs>
      <rect width="600" height="360" fill={`url(#bg-${variant})`} rx="7" />
      {/* 5 horizontal bars: y-offset 120/160/200/240/280, width 180/220/260/300/340, height 10 each */}
      <rect x="50" y="120" width="180" height="10" fill="#F09F14" opacity="0.3" />
      <rect x="50" y="160" width="220" height="10" fill="#F09F14" opacity="0.35" />
      <rect x="50" y="200" width="260" height="10" fill="#F09F14" opacity="0.4" />
      <rect x="50" y="240" width="300" height="10" fill="#F09F14" opacity="0.45" />
      <rect x="50" y="280" width="340" height="10" fill="#F09F14" opacity="0.5" />
      {/* Gold ring icon */}
      <circle cx="300" cy="50" r="16" stroke="#F09F14" strokeWidth="2" fill="none" />
    </svg>
  );
}

function getTone(v: PlaceholderVariant): 'navy' | 'blue' | 'gray' {
  if (v.startsWith('category-')) return 'blue';
  if (v.startsWith('application-')) return 'navy';
  return 'gray';
}
