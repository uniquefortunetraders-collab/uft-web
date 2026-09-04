import { Suspense } from 'react';
import { UserAuthForm } from '@/components/auth/user-auth-form';

export const metadata = {
  title: 'Create Account | Unique Fortune Traders',
  description: 'Create a new account with Unique Fortune Traders to collaborate and access your project portal.',
};

export default function SignUpPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f1f8f3] flex items-center justify-center">Loading...</div>}>
      <UserAuthForm defaultMode="signup" />
    </Suspense>
  );
}
