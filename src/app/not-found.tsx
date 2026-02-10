import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--devin-midnight)' }}>
      <div className="text-center max-w-lg">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(202, 240, 248, 0.05)', border: '1px solid rgba(202, 240, 248, 0.15)' }}>
            <AlertCircle className="w-12 h-12" style={{ color: 'var(--devin-boardroom)' }} />
          </div>
        </div>

        {/* Error Code */}
        <h1
          className="font-mono text-7xl font-bold mb-4"
          style={{ color: 'var(--devin-vault)' }}
        >
          404
        </h1>

        {/* Error Message */}
        <h2
          className="text-2xl font-serif font-semibold mb-4"
          style={{ color: 'var(--devin-cloud)' }}
        >
          Page Not Found
        </h2>

        <p
          className="text-lg mb-8"
          style={{ color: 'rgba(144, 224, 239, 0.7)' }}
        >
          The architecture you&apos;re looking for doesn&apos;t exist in this system.
          It may have been moved, deprecated, or never deployed.
        </p>

        {/* Back to Home Button */}
        <Link
          href="/"
          className="btn-primary inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Return to Home
        </Link>

        {/* Decorative Element */}
        <div className="mt-16">
          <div
            className="inline-block text-sm font-mono px-4 py-2 rounded"
            style={{
              backgroundColor: 'rgba(202, 240, 248, 0.05)',
              color: 'var(--devin-muted)',
              border: '1px solid rgba(202, 240, 248, 0.1)'
            }}
          >
            error_code: ROUTE_NOT_FOUND
          </div>
        </div>
      </div>
    </div>
  );
}
