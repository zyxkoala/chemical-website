export type Locale = 'en' | 'zh';

export const LOCALES: readonly Locale[] = ['en', 'zh'] as const;
export const DEFAULT_LOCALE: Locale = 'en';
