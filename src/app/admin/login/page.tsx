'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Mail, ArrowLeft, CheckCircle, Loader2, Lock } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const { user, loading, isAdmin, signIn, isDemo } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      const { error } = await signIn(email, password);
      if (error) {
        // Show actual error message for better debugging
        setError(error.message || 'Invalid email or password');
      } else {
        // Navigate to admin - layout will show access denied if not admin
        router.push('/admin');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-terracotta" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Back to site link */}
      <div className="p-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
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
            <h1 className="text-3xl font-serif font-bold text-gray-900 tracking-tight">
              DevinAI
            </h1>
            <p className="text-gray-600 mt-2">Admin Dashboard</p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-warm border border-sand p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-terracotta/20 rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5 text-terracotta" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Admin Sign In
                </h2>
                <p className="text-sm text-gray-500">Authorized access only</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@devinai.com"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-sand rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent
                      text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-sand rounded-xl
                      focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent
                      text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-terracotta text-white py-3 rounded-xl font-medium
                  hover:bg-terracotta/90 transition-colors disabled:opacity-50
                  disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>

            {isDemo && (
              <div className="mt-4 p-3 bg-terracotta/10 rounded-xl">
                <p className="text-terracotta text-xs text-center">
                  Demo mode: Click Sign In to access the dashboard
                </p>
              </div>
            )}

            <div className="mt-6 pt-6 border-t border-sand">
              <Link
                href="/reset-password"
                className="block text-center text-sm text-gray-500 hover:text-terracotta transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-6">
            This is a protected area. Unauthorized access is prohibited.
          </p>
        </div>
      </div>
    </div>
  );
}
