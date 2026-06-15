'use client';
import Script from 'next/script';

export function CloudflareBeacon() {
  const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;
  if (!token) return null;

  return (
    <Script
      strategy="afterInteractive"
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
