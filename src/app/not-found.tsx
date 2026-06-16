import Link from 'next/link';

export default function RootNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy to-navy-deep text-white">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Page not found</p>
        <p className="text-gray-light mb-8">
          The page you are looking for has been moved or does not exist.
        </p>
        <Link
          href="/en"
          className="inline-flex items-center justify-center gap-2 rounded-button h-button px-[26px] text-[15px] font-semibold bg-blue-primary text-white hover:bg-blue-primary/90 transition-colors"
        >
          Back to Home
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
