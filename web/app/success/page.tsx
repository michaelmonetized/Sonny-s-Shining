'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    if (sessionId) {
      // In production, verify the session with Stripe
      setStatus('success');
    } else {
      setStatus('error');
    }
  }, [sessionId]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper-cream">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🎳</div>
          <p className="text-ink-faded">Confirming your preorder...</p>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper-cream">
        <div className="text-center max-w-md mx-auto p-8">
          <h1 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
            Something went wrong
          </h1>
          <p className="text-ink-faded mb-6">
            We couldn&apos;t confirm your preorder. Please try again.
          </p>
          <Link href="/" className="vintage-button inline-block">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper-cream">
      <div className="text-center max-w-xl mx-auto p-8">
        {/* Success stamp */}
        <div className="mb-8">
          <span className="stamp inline-block text-2xl" style={{ transform: 'rotate(-3deg)' }}>
            PREORDER CONFIRMED!
          </span>
        </div>

        <h1 className="text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
          You&apos;re In!
        </h1>
        
        <div className="decorative-box p-6 mb-8">
          <p className="text-lg mb-4">
            Thank you for preordering <strong>Sonny&apos;s Shining</strong>!
          </p>
          <p className="text-ink-faded mb-4">
            Your copy will be delivered when the game launches.
          </p>
          <div className="price-badge mx-auto">
            <span>Expected<br/>Christmas 2026</span>
          </div>
        </div>

        <p className="text-sm text-ink-faded mb-6">
          A confirmation email has been sent to your inbox.
          <br />
          Keep an eye out for updates as we approach launch!
        </p>

        <div className="bowling-pin-divider mb-6">
          <span>🎳</span>
        </div>

        <Link href="/" className="vintage-button inline-block">
          Back to Home
        </Link>

        <p className="mt-8 text-xs text-ink-faded">
          Questions? Contact us at <a href="mailto:support@sonnysshining.com" className="underline">support@sonnysshining.com</a>
        </p>
      </div>
    </div>
  );
}
