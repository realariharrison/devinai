'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { useAuth } from '@/lib/auth-context';
import { Loader2, ArrowRight, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { user, isDemo, signIn, signInWithMagicLink } = useAuth();

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      router.push('/admin');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (useMagicLink) {
        const { error } = await signInWithMagicLink(email);
        if (error) {
          setError(error.message);
        } else {
          setMagicLinkSent(true);
        }
      } else {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
        } else {
          router.push('/admin');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (magicLinkSent) {
    return (
      <div className="min-h-screen bg-midnight">
        <Header />
        <main className="pt-20 min-h-[80vh] flex items-center justify-center">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-boardroom/20 mb-6">
              <Mail className="w-8 h-8 text-boardroom" />
            </div>
            <h1 className="text-2xl font-serif font-bold text-white mb-4">
              Check Your Email
            </h1>
            <p className="text-cloud/70 mb-6">
              We sent a magic link to <span className="text-white">{email}</span>.
              Click the link in the email to sign in.
            </p>
            <button
              onClick={() => {
                setMagicLinkSent(false);
                setUseMagicLink(false);
              }}
              className="text-boardroom hover:text-boardroom/80 text-sm"
            >
              Try a different method
            </button>
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
            <h1 className="text-2xl font-serif font-bold text-white mb-2">
              Sign In
            </h1>
            <p className="text-cloud/60">
              Access your DevinAI dashboard
            </p>
            {isDemo && (
              <p className="text-boardroom text-sm mt-2">
                Demo mode: Any credentials will work
              </p>
            )}
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
                  placeholder="admin@devinai.com"
                />
              </div>

              {!useMagicLink && (
                <div>
                  <label className="block text-xs font-medium text-cloud uppercase tracking-wider mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required={!useMagicLink}
                    className={cn(
                      'w-full px-4 py-3 bg-vault/10 border rounded-sm text-white placeholder-cloud/40',
                      'focus:outline-none focus:ring-2 focus:ring-boardroom focus:border-transparent',
                      'transition-all duration-200 border-cloud/20'
                    )}
                    placeholder="Enter your password"
                  />
                </div>
              )}

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
                    {useMagicLink ? 'Sending...' : 'Signing in...'}
                  </>
                ) : (
                  <>
                    {useMagicLink ? 'Send Magic Link' : 'Sign In'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-cloud/10 space-y-4">
              <button
                type="button"
                onClick={() => setUseMagicLink(!useMagicLink)}
                className="w-full text-center text-cloud/60 hover:text-white text-sm transition-colors"
              >
                {useMagicLink ? 'Use password instead' : 'Sign in with magic link'}
              </button>

              <Link
                href="/reset-password"
                className="block w-full text-center text-cloud/60 hover:text-white text-sm transition-colors"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
