import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#010912',
        'navy-deep': '#091C1C',
        'navy-strip': '#000D0D',
        gold: '#F09F14',
        'blue-primary': '#053B7D',
        'gray-body': '#5C667A',
        'gray-light': '#D1E0F0',
        'border-light': '#DBE0EB',
      },
      fontFamily: { sans: ['var(--font-inter)', 'system-ui', 'sans-serif'] },
      fontSize: {
        hero: ['56px', { lineHeight: '68px', fontWeight: '700' }],
        'page-title': ['52px', { lineHeight: '62px', fontWeight: '700' }],
        section: ['34px', { lineHeight: '42px', fontWeight: '700' }],
        'card-title': ['19px', { lineHeight: '25px', fontWeight: '600' }],
        'why-title': ['17px', { lineHeight: '24px', fontWeight: '600' }],
        subtitle: ['19px', { lineHeight: '30px' }],
        body: ['15px', { lineHeight: '23px' }],
        nav: ['15px', { lineHeight: '20px', fontWeight: '600' }],
        'footer-link': ['15px', { lineHeight: '26px' }],
        legal: ['13px', { lineHeight: '18px' }],
      },
      maxWidth: { 'page-max': '1440px' },
      spacing: {
        'section-px': '80px',
        'header-h': '96px',
        'header-px': '78px',
      },
      borderRadius: { card: '7px', button: '4px' },
      height: { button: '48px' },
    },
  },
  plugins: [],
} satisfies Config;
