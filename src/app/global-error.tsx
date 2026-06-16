'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <div style={{ padding: '40px', fontFamily: 'system-ui, sans-serif', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', marginBottom: '12px' }}>Something went wrong</h1>
          <p style={{ color: '#5C667A' }}>An unexpected error occurred. Please reload the page.</p>
        </div>
      </body>
    </html>
  );
}
