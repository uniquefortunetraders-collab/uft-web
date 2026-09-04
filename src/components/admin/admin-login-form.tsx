'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';

interface AdminLoginFormProps {
  redirectTo?: string;
}

export function AdminLoginForm({ redirectTo = '/admin' }: AdminLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        router.push(redirectTo);
        router.refresh();
      }
    } catch {
      setError('An error occurred during authentication. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b1e13] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors mb-4 px-3.5 py-1.5 rounded-full bg-white/5 border border-emerald-800/60 hover:bg-white/10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Homepage</span>
          </Link>
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-2xl shadow-lg shadow-emerald-950/40 mb-3">
            <Image
              src="/unique-fortune-logo.png"
              alt="Unique Fortune Logo"
              width={64}
              height={64}
              className="w-14 h-14 object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-2 tracking-tight">
            Unique Fortune <span className="text-[#e6005c]">Traders</span>
          </h1>
          <p className="text-xs text-emerald-300 mt-1">Admin CMS &amp; Staff Authentication Portal</p>
        </div>

        <Card className="bg-white p-8 rounded-3xl border border-emerald-900/50 shadow-2xl space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@uniquefortune.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#e6005c] focus:ring-1 focus:ring-[#e6005c]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#e6005c] focus:ring-1 focus:ring-[#e6005c]"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-pink-50 border border-pink-200 rounded-xl text-xs text-pink-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-pink-500 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              size="lg"
              className="w-full mt-2 bg-[#e6005c] hover:bg-[#cc0052] text-white"
            >
              {loading ? 'Authenticating...' : 'Sign In to Admin CMS'}
            </Button>
          </form>
        </Card>

        {/* Link to User/Client Login & Signup */}
        <div className="text-center mt-6">
          <Link
            href="/login"
            className="text-xs text-emerald-300 hover:text-white transition-colors font-medium underline underline-offset-4"
          >
            Looking for Client Portal / New User Sign Up? Click here
          </Link>
        </div>

      </div>
    </div>
  );
}
