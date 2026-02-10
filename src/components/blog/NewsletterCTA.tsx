'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { validateEmail } from '@/lib/utils';

export function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email) {
      setErrorMessage('Please enter your email address');
      setStatus('error');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');

    try {
      // In production, this would call an API endpoint
      // For demo purposes, we'll simulate a successful subscription
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus('success');
      setEmail('');
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="bg-vault/10 border border-vault/20 rounded-lg p-8 lg:p-10">
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <h3 className="font-serif text-2xl lg:text-3xl text-cloud mb-3">
          Subscribe to Intelligence Briefings
        </h3>
        <p className="text-cloud/60 font-sans mb-8">
          Strategic insights on Outcome Architecture, technical deep dives, and case studies delivered to your inbox.
          No spam, unsubscribe anytime.
        </p>

        {/* Form */}
        {status === 'success' ? (
          <div className="flex items-center justify-center gap-3 text-vault-700">
            <CheckCircle className="w-6 h-6" />
            <span className="font-sans text-lg">
              You&apos;re subscribed! Check your inbox for confirmation.
            </span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') {
                    setStatus('idle');
                    setErrorMessage('');
                  }
                }}
                placeholder="Enter your email address"
                className={`w-full px-4 py-3 bg-midnight-600 border rounded-lg font-sans text-cloud placeholder:text-cloud/40 focus:outline-none focus:ring-2 focus:ring-boardroom/50 transition-all duration-200 ${
                  status === 'error'
                    ? 'border-red-500/50'
                    : 'border-cloud/10 focus:border-boardroom/50'
                }`}
                disabled={status === 'loading'}
              />
              {status === 'error' && errorMessage && (
                <div className="flex items-center gap-2 mt-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-boardroom text-midnight font-sans font-medium rounded-lg hover:bg-boardroom-400 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-midnight/30 border-t-midnight rounded-full animate-spin" />
                  Subscribing...
                </>
              ) : (
                <>
                  Subscribe
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
