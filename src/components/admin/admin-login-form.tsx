'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Lock, Mail, AlertCircle, ArrowLeft, ShieldCheck, Eye, EyeOff, Loader2 } from 'lucide-react';

interface AdminLoginFormProps {
  redirectTo?: string;
}

export function AdminLoginForm({ redirectTo = '/admin' }: AdminLoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
        window.location.href = redirectTo;
      }
    } catch {
      setError('An error occurred during authentication. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf8f1] via-[#f3fbf6] to-[#ffffff] relative flex flex-col justify-between p-4 sm:p-6 lg:p-10 overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-pink-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-teal-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header Navigation */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between z-10 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#e6005c] transition-colors px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-emerald-200/60 shadow-xs hover:border-pink-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Website</span>
        </Link>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>256-Bit Encrypted Portal</span>
        </div>
      </div>

      {/* Center Form Card */}
      <div className="w-full max-w-lg mx-auto my-auto z-10 py-6">
        <div className="bg-white/95 backdrop-blur-xl rounded-[32px] border border-emerald-100 shadow-2xl shadow-emerald-950/5 p-6 sm:p-10 md:p-12 relative">
          
          {/* Brand Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center justify-center gap-3 mb-4 group">
              <Image
                src="/unique-fortune-logo.png"
                alt="Unique Fortune Logo"
                width={56}
                height={56}
                className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
                priority
              />
              <div className="flex flex-col text-left leading-tight">
                <span className="text-xl font-black tracking-tight text-amber-700 leading-none" style={{ fontFamily: 'Georgia, serif' }}>
                  Unique Fortune
                </span>
                <span className="text-[11px] font-bold tracking-[0.16em] text-amber-500 uppercase mt-1">
                  Traders
                </span>
              </div>
            </Link>



            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-normal">
              Sign in with your staff credentials to manage content &amp; leads
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Admin Email Address <span className="text-[#e6005c]">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@uniquefortune.com"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-slate-50/50 hover:bg-white"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Password <span className="text-[#e6005c]">*</span>
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-2xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-slate-50/50 hover:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600 transition-colors p-0.5"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3.5 bg-red-50/90 border border-red-200 rounded-2xl text-xs text-red-700 flex items-start gap-2.5 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              size="lg"
              className="w-full py-3.5 mt-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold rounded-2xl shadow-lg shadow-emerald-700/20 border-0 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Authenticating Admin...</span>
                </>
              ) : (
                <span>Sign In to Admin Dashboard</span>
              )}
            </Button>
          </form>



        </div>
      </div>

      {/* Bottom Footer Credits */}
      <div className="max-w-6xl w-full mx-auto text-center z-10 pt-4">
        <p className="text-xs text-slate-400 font-medium">
          © {new Date().getFullYear()} Unique Fortune Traders. Protected by Enterprise Authentication.
        </p>
      </div>

    </div>
  );
}
