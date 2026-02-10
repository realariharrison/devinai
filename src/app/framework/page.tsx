'use client';

import { useState } from 'react';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { FileText, Download, Check, Loader2, ArrowRight, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

const frameworkHighlights = [
  {
    title: 'The Three Pillars',
    description: 'Frictionless Velocity Engine, Sovereign Stack Foundation, and Continuous Certainty Protocol',
  },
  {
    title: 'Outcome Mapping',
    description: 'How to align every technical decision with measurable business outcomes',
  },
  {
    title: 'Technical Patterns',
    description: 'Production-proven architecture patterns for predictable scale',
  },
  {
    title: 'Case Study Analysis',
    description: 'Real-world examples with before/after metrics',
  },
];

export default function FrameworkPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'whitepaper' }),
      });

      if (!response.ok) {
        throw new Error('Subscription failed');
      }

      setIsUnlocked(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-midnight">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 border-b border-cloud/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Content */}
              <div>
                <p className="text-boardroom font-mono text-sm tracking-wider uppercase mb-4">
                  Whitepaper Download
                </p>
                <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
                  The Outcome Architecture Framework
                </h1>
                <p className="text-lg text-cloud/70 leading-relaxed mb-8">
                  A comprehensive guide to building software that scales predictably.
                  Learn the three pillars of Outcome Architecture and how to apply them
                  to transform your development process.
                </p>

                <div className="space-y-4">
                  {frameworkHighlights.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-boardroom/20 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-boardroom" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{item.title}</h3>
                        <p className="text-cloud/60 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: PDF Preview & Form */}
              <div>
                {/* PDF Preview Mockup */}
                <div className="relative bg-vault/5 border border-cloud/10 rounded-sm p-8 mb-8">
                  <div className="aspect-[8.5/11] bg-white/5 border border-cloud/10 rounded-sm overflow-hidden relative">
                    {/* Mock PDF Content */}
                    <div className="absolute inset-0 p-8">
                      <div className="h-4 w-3/4 bg-cloud/10 rounded mb-4" />
                      <div className="h-3 w-full bg-cloud/5 rounded mb-2" />
                      <div className="h-3 w-5/6 bg-cloud/5 rounded mb-2" />
                      <div className="h-3 w-4/5 bg-cloud/5 rounded mb-6" />
                      <div className="h-3 w-1/2 bg-cloud/10 rounded mb-4" />
                      <div className="h-3 w-full bg-cloud/5 rounded mb-2" />
                      <div className="h-3 w-5/6 bg-cloud/5 rounded mb-2" />
                      <div className="h-3 w-3/4 bg-cloud/5 rounded mb-6" />
                      <div className="grid grid-cols-3 gap-4">
                        <div className="aspect-square bg-boardroom/10 rounded" />
                        <div className="aspect-square bg-boardroom/10 rounded" />
                        <div className="aspect-square bg-boardroom/10 rounded" />
                      </div>
                    </div>

                    {/* Overlay when locked */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-midnight/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <Lock className="w-12 h-12 text-cloud/40 mx-auto mb-3" />
                          <p className="text-cloud/60 text-sm">Enter your email to unlock</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Document Info */}
                  <div className="mt-6 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-cloud/60">
                      <FileText className="w-4 h-4" />
                      <span>outcome-architecture-framework.pdf</span>
                    </div>
                    <span className="text-cloud/40">24 pages</span>
                  </div>
                </div>

                {/* Email Form / Download Button */}
                {!isUnlocked ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                        placeholder="Enter your email to download"
                      />
                    </div>
                    {error && (
                      <p className="text-red-400 text-sm">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center px-6 py-3 bg-boardroom hover:bg-boardroom/90 text-white rounded-sm font-medium transition-all duration-200 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Unlock Free Download
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                    <p className="text-cloud/40 text-xs text-center">
                      By downloading, you agree to receive occasional updates. Unsubscribe anytime.
                    </p>
                  </form>
                ) : (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-boardroom/20 mb-4">
                      <Check className="w-8 h-8 text-boardroom" />
                    </div>
                    <h3 className="text-white font-semibold mb-2">Download Unlocked!</h3>
                    <a
                      href="/downloads/outcome-architecture-framework.pdf"
                      download
                      className="inline-flex items-center justify-center px-6 py-3 bg-boardroom hover:bg-boardroom/90 text-white rounded-sm font-medium transition-all duration-200 hover:shadow-glow"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Framework Overview */}
        <section className="py-16 lg:py-24 bg-vault/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-4">
                The Three Pillars
              </h2>
              <p className="text-cloud/70">
                Outcome Architecture is built on three interconnected pillars that ensure
                predictable software growth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-midnight/50 border border-cloud/10 rounded-sm p-8">
                <div className="w-12 h-12 rounded-sm bg-boardroom/20 flex items-center justify-center mb-6">
                  <span className="text-boardroom font-serif font-bold text-xl">I</span>
                </div>
                <h3 className="text-white font-serif font-semibold text-lg mb-3">
                  Frictionless Velocity Engine
                </h3>
                <p className="text-cloud/60 text-sm leading-relaxed">
                  Eliminate the bottlenecks that slow development. From CI/CD optimization
                  to developer experience improvements that compound over time.
                </p>
              </div>

              <div className="bg-midnight/50 border border-cloud/10 rounded-sm p-8">
                <div className="w-12 h-12 rounded-sm bg-boardroom/20 flex items-center justify-center mb-6">
                  <span className="text-boardroom font-serif font-bold text-xl">II</span>
                </div>
                <h3 className="text-white font-serif font-semibold text-lg mb-3">
                  Sovereign Stack Foundation
                </h3>
                <p className="text-cloud/60 text-sm leading-relaxed">
                  Build on a technology foundation that scales without drama. Production-proven
                  architecture patterns that give you control and predictability.
                </p>
              </div>

              <div className="bg-midnight/50 border border-cloud/10 rounded-sm p-8">
                <div className="w-12 h-12 rounded-sm bg-boardroom/20 flex items-center justify-center mb-6">
                  <span className="text-boardroom font-serif font-bold text-xl">III</span>
                </div>
                <h3 className="text-white font-serif font-semibold text-lg mb-3">
                  Continuous Certainty Protocol
                </h3>
                <p className="text-cloud/60 text-sm leading-relaxed">
                  Replace anxiety with confidence through comprehensive monitoring, testing,
                  and validation systems that catch issues before they become problems.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
