'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Lock, Mail, User, AlertCircle, ArrowLeft, CheckCircle2, Eye, EyeOff, ShieldCheck, Loader2 } from 'lucide-react';

interface UserAuthFormProps {
  defaultMode?: 'login' | 'signup';
}

export function UserAuthForm({ defaultMode = 'login' }: UserAuthFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : defaultMode;

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const supabase = createClient();

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters.');
        setLoading(false);
        return;
      }

      try {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: fullName.trim(),
            },
          },
        });

        if (signUpError) {
          setError(signUpError.message);
          setLoading(false);
          return;
        }

        if (data.user) {
          setSuccessMessage(
            'Account created successfully! If verification is required, please check your inbox to confirm your email.'
          );
          if (data.session) {
            setTimeout(() => {
              router.push('/');
              router.refresh();
            }, 1500);
          }
        }
      } catch {
        setError('An unexpected error occurred during signup. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      // Login mode
      try {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (signInError) {
          setError(signInError.message);
          setLoading(false);
          return;
        }

        if (data.session) {
          window.location.href = '/';
        }
      } catch {
        setError('An error occurred during authentication. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#eaf8f1] via-[#f3fbf6] to-[#ffffff] relative flex flex-col justify-between p-4 sm:p-6 lg:p-10 overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-pink-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Header Navigation */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between z-10 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 hover:text-[#e6005c] transition-colors px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-emerald-200/60 shadow-xs hover:border-pink-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Website</span>
        </Link>

        <Link
          href="/admin/login"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/80 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold shadow-xs"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Admin Portal</span>
        </Link>
      </div>

      {/* Center Form Card */}
      <div className="w-full max-w-lg mx-auto my-auto z-10 py-6">
        <div className="bg-white/95 backdrop-blur-xl rounded-[32px] border border-emerald-100 shadow-2xl shadow-emerald-950/5 p-6 sm:p-10 md:p-12 relative">
          
          {/* Brand Header */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center justify-center gap-3 mb-4 group">
              <Image
                src="/unique-fortune-logo.png"
                alt="Unique Fortune Traders Logo"
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
              {mode === 'login' ? 'Client Sign In' : 'Create Account'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1.5 font-normal">
              {mode === 'login'
                ? 'Sign in to access your project dashboard and orders'
                : 'Join Unique Fortune Traders to collaborate and track solutions'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex rounded-2xl bg-slate-100 p-1.5 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'login'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setError(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name field for Signup */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name <span className="text-[#e6005c]">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-slate-50/50 hover:bg-white"
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address <span className="text-[#e6005c]">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-slate-50/50 hover:bg-white"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  Password <span className="text-[#e6005c]">*</span>
                </label>
                {mode === 'login' && (
                  <Link
                    href="/contact"
                    className="text-[11px] font-semibold text-[#e6005c] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                )}
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
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password for Signup */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Confirm Password <span className="text-[#e6005c]">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-slate-50/50 hover:bg-white"
                  />
                </div>
              </div>
            )}

            {/* Error Notification */}
            {error && (
              <div className="p-3.5 bg-red-50/90 border border-red-200 rounded-2xl text-xs text-red-700 flex items-start gap-2.5 animate-in fade-in duration-200">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span className="font-medium">{error}</span>
              </div>
            )}

            {/* Success Notification */}
            {successMessage && (
              <div className="p-3.5 bg-emerald-50/90 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-start gap-2.5 animate-in fade-in duration-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span className="font-medium">{successMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              size="lg"
              className="w-full py-3.5 mt-2 bg-[#e6005c] hover:bg-[#cc0052] text-white font-bold rounded-2xl shadow-lg shadow-pink-500/25 border-0 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>{mode === 'login' ? 'Signing In...' : 'Creating Account...'}</span>
                </>
              ) : (
                <span>{mode === 'login' ? 'Sign In to Your Account' : 'Create Your Free Account'}</span>
              )}
            </Button>
          </form>

          {/* Bottom Switcher helper */}
          <div className="pt-6 mt-6 border-t border-slate-100 text-center text-xs text-slate-500">
            {mode === 'login' ? (
              <p>
                Don&apos;t have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError(null);
                    setSuccessMessage(null);
                  }}
                  className="font-bold text-[#e6005c] hover:underline cursor-pointer"
                >
                  Create one now →
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError(null);
                    setSuccessMessage(null);
                  }}
                  className="font-bold text-[#e6005c] hover:underline cursor-pointer"
                >
                  Sign In →
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Footer Credits */}
      <div className="max-w-6xl w-full mx-auto text-center z-10 pt-4">
        <p className="text-xs text-slate-400 font-medium">
          © {new Date().getFullYear()} Unique Fortune Traders. All rights reserved.
        </p>
      </div>

    </div>
  );
}
