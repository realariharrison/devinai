'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { supabase, isDemoMode } from '@/lib/supabase';
import { Loader2, ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // In demo mode, just show success
      if (isDemoMode()) {
        setIsSent(true);
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/admin/update-password`,
      });

      if (error) {
        setError(error.message);
      } else {
        setIsSent(true);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="min-h-screen bg-midnight">
        <Header />
        <main className="pt-20 min-h-[80vh] flex items-center justify-center">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-boardroom/20 mb-6 animate-fade-in">
              <CheckCircle2 className="w-8 h-8 text-boardroom" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-white mb-4 animate-fade-in-up">
              Check Your Email
            </h1>
            <p className="text-cloud/70 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              If an account exists for <span className="text-white">{email}</span>,
              you will receive a password reset link shortly.
            </p>
            <Link
              href="/auth"
              className="inline-flex items-center text-boardroom hover:text-boardroom/80 text-sm transition-colors animate-fade-in-up"
              style={{ animationDelay: '0.2s' }}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight">
      <Header />

      <main className="pt-20 min-h-[80vh] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 w-full">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-boardroom/20 mb-4">
              <Mail className="w-6 h-6 text-boardroom" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-white mb-2">
              Reset Your Password
            </h1>
            <p className="text-cloud/60">
              Enter your email and we will send you a reset link
            </p>
          </div>

          <div className="bg-midnight/50 border border-cloud/10 rounded-sm p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-medium text-cloud uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={cn(
                    'w-full px-4 py-3 bg-vault/10 border rounded-sm text-white placeholder-cloud/40',
                    'focus:outline-none focus:ring-2 focus:ring-boardroom focus:border-transparent',
                    'transition-all duration-200 border-cloud/20'
                  )}
                  placeholder="Enter your email address"
                />
              </div>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center px-6 py-3 bg-boardroom hover:bg-boardroom/90 text-white rounded-sm font-medium transition-all duration-200 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-cloud/10">
              <Link
                href="/auth"
                className="flex items-center justify-center text-cloud/60 hover:text-white text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
