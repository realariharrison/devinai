'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Mail, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const { user, loading, isAdmin, signInWithMagicLink, isDemo } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Redirect if already authenticated as admin
  useEffect(() => {
    if (!loading && user && isAdmin) {
      router.push('/admin');
    }
  }, [user, loading, isAdmin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      // In demo mode, simulate success
      if (isDemo) {
        setSent(true);
        setTimeout(() => {
          router.push('/admin');
        }, 1500);
        return;
      }

      const { error } = await signInWithMagicLink(email);
      if (error) {
        setError(error.message);
      } else {
        setSent(true);
      }
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#CAF0F8] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#03045E]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#CAF0F8] flex flex-col">
      {/* Back to site link */}
      <div className="p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#03045E]/70 hover:text-[#03045E] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Site</span>
        </Link>
      </div>

      {/* Login form */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#03045E] tracking-tight">
              DevinAI
            </h1>
            <p className="text-[#03045E]/60 mt-2">Admin Dashboard</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {sent ? (
              /* Success state */
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-[#90E0EF] rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#03045E]" />
                </div>
                <h2 className="text-xl font-semibold text-[#03045E] mb-2">
                  Check your email
                </h2>
                <p className="text-[#03045E]/60 text-sm">
                  We sent a magic link to <strong>{email}</strong>. Click the link
                  to sign in.
                </p>
                {isDemo && (
                  <p className="text-[#00B4D8] text-sm mt-4">
                    Demo mode: Redirecting to dashboard...
                  </p>
                )}
              </div>
            ) : (
              /* Form */
              <>
                <h2 className="text-xl font-semibold text-[#03045E] mb-6">
                  Sign in with magic link
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#03045E]/80 mb-1.5"
                    >
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#03045E]/40" />
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                        required
                        className="w-full pl-10 pr-4 py-2.5 border border-[#90E0EF] rounded-lg
                          focus:outline-none focus:ring-2 focus:ring-[#00B4D8] focus:border-transparent
                          text-[#03045E] placeholder:text-[#03045E]/40"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#03045E] text-white py-2.5 rounded-lg font-medium
                      hover:bg-[#03045E]/90 transition-colors disabled:opacity-50
                      disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      'Send Magic Link'
                    )}
                  </button>
                </form>

                {isDemo && (
                  <p className="text-[#00B4D8] text-xs text-center mt-4">
                    Demo mode active - any email will work
                  </p>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <p className="text-center text-[#03045E]/50 text-sm mt-6">
            Protected admin area. Authorized personnel only.
          </p>
        </div>
      </div>
    </div>
  );
}
