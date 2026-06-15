'use client';
import { track as vercelTrack } from '@vercel/analytics';

export type AnalyticsEvent =
  | 'product_card_click'
  | 'contact_email_click'
  | 'contact_phone_click'
  | 'contact_whatsapp_click'
  | 'search_query'
  | 'language_switch';

export function track(name: AnalyticsEvent, props: Record<string, string | number>): void {
  if (process.env.NODE_ENV === 'development') {
    console.debug('[track]', name, props);
    return;
  }
  vercelTrack(name, props);
}
