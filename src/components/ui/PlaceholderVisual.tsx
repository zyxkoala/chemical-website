import Image from 'next/image';
import type { PlaceholderVariant } from '@/types/product';

type Props = {
  variant: PlaceholderVariant;
  className?: string;
  tone?: 'navy' | 'blue' | 'gray';
};

export function PlaceholderVisual({ variant, className = '', tone }: Props) {
  const inferredTone = tone ?? getTone(variant);

  if (variant === 'product-lldpe-bag') {
    return (
      <div className={`${className} relative overflow-hidden rounded-card aspect-[4/3]`}>
        <Image
          src="/images/products/lldpe-bag.jpg"
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          className="object-contain"
        />
      </div>
    );
  }

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
        <rect x="80" y="180" width="40" height="280" fill="#091C1C" opacity="0.6" />
        <rect x="140" y="120" width="40" height="340" fill="#091C1C" opacity="0.7" />
        <rect x="200" y="160" width="40" height="300" fill="#091C1C" opacity="0.65" />
        <rect x="260" y="100" width="40" height="360" fill="#091C1C" opacity="0.75" />
        <rect x="320" y="140" width="40" height="320" fill="#091C1C" opacity="0.7" />
        <rect x="380" y="180" width="40" height="280" fill="#091C1C" opacity="0.6" />
        <rect x="440" y="120" width="40" height="340" fill="#091C1C" opacity="0.7" />
        <rect x="80" y="240" width="400" height="6" fill="#F09F14" opacity="0.4" />
        <rect x="120" y="300" width="360" height="6" fill="#F09F14" opacity="0.35" />
        <rect x="100" y="360" width="380" height="8" fill="#F09F14" opacity="0.5" />
        <rect x="140" y="200" width="320" height="5" fill="#F09F14" opacity="0.3" />
        <rect x="160" y="420" width="280" height="6" fill="#F09F14" opacity="0.4" />
        <circle cx="300" cy="60" r="16" stroke="#F09F14" strokeWidth="2" fill="none" />
      </svg>
    );
  }

  // PE (polyethylene) — polymer chain visual
  if (variant === 'product-default' || variant.startsWith('category-pe') || variant.startsWith('category-raw')) {
    return (
      <svg className={className} viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`bg-pe-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#010912" />
            <stop offset="100%" stopColor="#053B7D" />
          </linearGradient>
        </defs>
        <rect width="600" height="360" fill={`url(#bg-pe-${variant})`} rx="7" />
        {/* Polymer chain: repeating C-C backbone */}
        <line x1="80" y1="180" x2="150" y2="140" stroke="#F09F14" strokeWidth="2.5" opacity="0.7" />
        <line x1="150" y1="140" x2="220" y2="180" stroke="#F09F14" strokeWidth="2.5" opacity="0.7" />
        <line x1="220" y1="180" x2="290" y2="140" stroke="#F09F14" strokeWidth="2.5" opacity="0.7" />
        <line x1="290" y1="140" x2="360" y2="180" stroke="#F09F14" strokeWidth="2.5" opacity="0.7" />
        <line x1="360" y1="180" x2="430" y2="140" stroke="#F09F14" strokeWidth="2.5" opacity="0.7" />
        <line x1="430" y1="140" x2="500" y2="180" stroke="#F09F14" strokeWidth="2.5" opacity="0.7" />
        {/* Carbon atoms */}
        <circle cx="80" cy="180" r="10" fill="#F09F14" opacity="0.85" />
        <circle cx="150" cy="140" r="10" fill="#F09F14" opacity="0.85" />
        <circle cx="220" cy="180" r="10" fill="#F09F14" opacity="0.85" />
        <circle cx="290" cy="140" r="10" fill="#F09F14" opacity="0.85" />
        <circle cx="360" cy="180" r="10" fill="#F09F14" opacity="0.85" />
        <circle cx="430" cy="140" r="10" fill="#F09F14" opacity="0.85" />
        <circle cx="500" cy="180" r="10" fill="#F09F14" opacity="0.85" />
        {/* H bonds */}
        <line x1="80" y1="180" x2="80" y2="220" stroke="#F09F14" strokeWidth="1.5" opacity="0.4" />
        <line x1="150" y1="140" x2="150" y2="100" stroke="#F09F14" strokeWidth="1.5" opacity="0.4" />
        <line x1="220" y1="180" x2="220" y2="220" stroke="#F09F14" strokeWidth="1.5" opacity="0.4" />
        <line x1="290" y1="140" x2="290" y2="100" stroke="#F09F14" strokeWidth="1.5" opacity="0.4" />
        <line x1="360" y1="180" x2="360" y2="220" stroke="#F09F14" strokeWidth="1.5" opacity="0.4" />
        <line x1="430" y1="140" x2="430" y2="100" stroke="#F09F14" strokeWidth="1.5" opacity="0.4" />
        <line x1="500" y1="180" x2="500" y2="220" stroke="#F09F14" strokeWidth="1.5" opacity="0.4" />
        {/* Label */}
        <text x="300" y="310" textAnchor="middle" fill="#F09F14" opacity="0.5" fontSize="13" fontFamily="monospace">— CH₂ — CH₂ — CH₂ —</text>
      </svg>
    );
  }

  // PP (polypropylene) — hexagon ring motif
  if (variant.startsWith('category-pp')) {
    return (
      <svg className={className} viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg-pp" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#010912" />
            <stop offset="100%" stopColor="#053B7D" />
          </linearGradient>
        </defs>
        <rect width="600" height="360" fill="url(#bg-pp)" rx="7" />
        {/* Three benzene-like hexagons */}
        {[130, 300, 470].map((cx, i) => {
          const cy = 170;
          const r = 55;
          const pts = Array.from({ length: 6 }, (_, k) => {
            const angle = (Math.PI / 3) * k - Math.PI / 6;
            return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
          }).join(' ');
          return (
            <g key={i} opacity={i === 1 ? 0.85 : 0.5}>
              <polygon points={pts} stroke="#F09F14" strokeWidth="2" fill="none" />
              <circle cx={cx} cy={cy} r="6" fill="#F09F14" opacity="0.7" />
            </g>
          );
        })}
        {/* Connecting bonds */}
        <line x1="185" y1="170" x2="245" y2="170" stroke="#F09F14" strokeWidth="2" opacity="0.5" />
        <line x1="355" y1="170" x2="415" y2="170" stroke="#F09F14" strokeWidth="2" opacity="0.5" />
        <text x="300" y="310" textAnchor="middle" fill="#F09F14" opacity="0.5" fontSize="13" fontFamily="monospace">— CH₂ — CH(CH₃) —</text>
      </svg>
    );
  }

  // Manufactured goods — industrial container/drum
  if (variant.startsWith('category-manufactured') || variant.startsWith('category-kitchen')) {
    return (
      <svg className={className} viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bg-mfg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#010912" />
            <stop offset="100%" stopColor="#091C1C" />
          </linearGradient>
        </defs>
        <rect width="600" height="360" fill="url(#bg-mfg)" rx="7" />
        {/* Drum body */}
        <rect x="200" y="80" width="200" height="200" rx="8" stroke="#F09F14" strokeWidth="2.5" fill="none" opacity="0.8" />
        {/* Drum top ellipse */}
        <ellipse cx="300" cy="80" rx="100" ry="18" stroke="#F09F14" strokeWidth="2" fill="#010912" opacity="0.9" />
        {/* Drum bands */}
        <line x1="200" y1="130" x2="400" y2="130" stroke="#F09F14" strokeWidth="1.5" opacity="0.4" />
        <line x1="200" y1="230" x2="400" y2="230" stroke="#F09F14" strokeWidth="1.5" opacity="0.4" />
        {/* Bung holes */}
        <circle cx="260" cy="80" r="8" stroke="#F09F14" strokeWidth="1.5" fill="none" opacity="0.7" />
        <circle cx="340" cy="80" r="8" stroke="#F09F14" strokeWidth="1.5" fill="none" opacity="0.7" />
        {/* AOWATT label line */}
        <line x1="230" y1="178" x2="370" y2="178" stroke="#F09F14" strokeWidth="1" opacity="0.3" />
      </svg>
    );
  }

  // Category fallback + application variants: abstract gradient bars
  return (
    <svg className={className} viewBox="0 0 600 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`bg-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={inferredTone === 'navy' ? '#010912' : inferredTone === 'blue' ? '#053B7D' : '#5C667A'} />
          <stop offset="100%" stopColor={inferredTone === 'navy' ? '#091C1C' : inferredTone === 'blue' ? '#010912' : '#D1E0F0'} />
        </linearGradient>
      </defs>
      <rect width="600" height="360" fill={`url(#bg-${variant})`} rx="7" />
      <rect x="50" y="120" width="180" height="10" fill="#F09F14" opacity="0.3" />
      <rect x="50" y="160" width="220" height="10" fill="#F09F14" opacity="0.35" />
      <rect x="50" y="200" width="260" height="10" fill="#F09F14" opacity="0.4" />
      <rect x="50" y="240" width="300" height="10" fill="#F09F14" opacity="0.45" />
      <rect x="50" y="280" width="340" height="10" fill="#F09F14" opacity="0.5" />
      <circle cx="300" cy="50" r="16" stroke="#F09F14" strokeWidth="2" fill="none" />
    </svg>
  );
}

function getTone(v: PlaceholderVariant): 'navy' | 'blue' | 'gray' {
  if (v.startsWith('category-')) return 'blue';
  if (v.startsWith('application-')) return 'navy';
  return 'gray';
}
