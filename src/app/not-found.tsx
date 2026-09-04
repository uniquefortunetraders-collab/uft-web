import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f1f8f3] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-12 border border-emerald-100 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-black text-2xl mx-auto">
          404
        </div>

        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Page Not Found</h1>
          <p className="text-xs text-gray-600 mt-2 leading-relaxed">
            The page or resource you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link href="/">
            <Button variant="primary" size="md" className="w-full gap-2">
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
