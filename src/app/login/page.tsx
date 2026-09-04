import { Suspense } from 'react';
import { UserAuthForm } from '@/components/auth/user-auth-form';

export const metadata = {
  title: 'Sign In / Sign Up | Unique Fortune Traders',
  description: 'Sign in to your client account or register a new account with Unique Fortune Traders.',
};

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f1f8f3] flex items-center justify-center">Loading...</div>}>
      <UserAuthForm defaultMode="login" />
    </Suspense>
  );
}
