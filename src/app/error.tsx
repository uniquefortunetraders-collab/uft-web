'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f1f8f3] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 border border-emerald-100 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-black text-xl mx-auto">
          !
        </div>

        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Something went wrong</h1>
          <p className="text-xs text-gray-600 mt-2 leading-relaxed">
            An unexpected application error occurred. Our engineers have been notified.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Button onClick={() => reset()} variant="primary" size="md" className="w-full gap-2">
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
          <Link href="/">
            <Button variant="outline" size="md" className="w-full gap-2">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
