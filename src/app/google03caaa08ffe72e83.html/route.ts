export const dynamic = 'force-static';

export function GET() {
  return new Response('google-site-verification: google03caaa08ffe72e83.html', {
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  });
}
