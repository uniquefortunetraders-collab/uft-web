'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Lock, Mail, User, AlertCircle, ArrowLeft, CheckCircle2, Eye, EyeOff, ShieldCheck } from 'lucide-react';

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
          // If session created automatically:
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
          router.push('/');
          router.refresh();
        }
      } catch {
        setError('An error occurred during authentication. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f1f8f3] via-white to-[#f1f8f3] flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* Back link */}
        <div className="mb-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#e6005c] transition-colors px-3.5 py-1.5 rounded-full bg-white border border-gray-200 shadow-2xs hover:border-[#e6005c]/30"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Homepage</span>
          </Link>
        </div>

        {/* Brand Header with Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-3xl shadow-sm border border-emerald-100/80 mb-3">
            <Image
              src="/unique-fortune-logo.png"
              alt="Unique Fortune Traders Logo"
              width={72}
              height={72}
              className="w-16 h-16 object-contain"
              priority
            />
          </div>
          <h1
            className="text-2xl font-black text-amber-700 tracking-tight leading-tight"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Unique Fortune <span className="text-[#e6005c] font-sans text-xl uppercase tracking-wider">Traders</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium mt-1">
            {mode === 'login'
              ? 'Welcome back! Sign in to access your client portal.'
              : 'Create a new account to collaborate and access your project dashboard.'}
          </p>
        </div>

        {/* Card */}
        <Card className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-950/5">
          {/* Mode Switcher Tabs */}
          <div className="flex rounded-xl bg-gray-100/90 p-1 mb-6">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setError(null);
                setSuccessMessage(null);
              }}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                mode === 'login'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
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
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                mode === 'signup'
                  ? 'bg-white text-gray-900 shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name field for Signup */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#e6005c] focus:ring-2 focus:ring-pink-100 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email field */}
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#e6005c] focus:ring-2 focus:ring-pink-100 transition-all"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-gray-700">
                  Password
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
                <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#e6005c] focus:ring-2 focus:ring-pink-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password for Signup */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#e6005c] focus:ring-2 focus:ring-pink-100 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Error Notification */}
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Notification */}
            {successMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              size="lg"
              className="w-full mt-2 font-bold shadow-md shadow-pink-500/20"
            >
              {loading
                ? mode === 'login'
                  ? 'Signing In...'
                  : 'Creating Account...'
                : mode === 'login'
                ? 'Sign In to Your Account'
                : 'Create Account'}
            </Button>
          </form>

          {/* Bottom Switcher helper */}
          <div className="pt-4 mt-4 border-t border-gray-100 text-center text-xs text-gray-500">
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
                  className="font-bold text-[#e6005c] hover:underline"
                >
                  Create one now
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
                  className="font-bold text-[#e6005c] hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </Card>

        {/* Admin CMS Access Link */}
        <div className="text-center mt-6">
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-emerald-700 transition-colors font-medium"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Staff or Administrator? Access Admin CMS</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
