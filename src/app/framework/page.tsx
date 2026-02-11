'use client';

import { useState } from 'react';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { FileText, Check, Loader2, ArrowRight, Lock, Mail, Download } from 'lucide-react';

const FRAMEWORK_PDF_URL = 'https://drive.google.com/uc?export=download&id=1Qp5-E6KV9ibtca21DX6cnqbBNTvJiS3d';
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
    <div className="min-h-screen bg-cream">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 border-b border-sand">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Content */}
              <div>
                <p className="text-terracotta font-mono text-sm tracking-wider uppercase mb-4">
                  Whitepaper Download
                </p>
                <h1 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-6">
                  The Outcome Architecture Framework
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  A comprehensive guide to building software that scales predictably.
                  Learn the three pillars of Outcome Architecture and how to apply them
                  to transform your development process.
                </p>

                <div className="space-y-4">
                  {frameworkHighlights.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-terracotta/20 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-terracotta" />
                      </div>
                      <div>
                        <h3 className="text-gray-900 font-medium">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: PDF Preview & Form */}
              <div>
                {/* PDF Preview Mockup */}
                <div className="relative bg-white border border-sand rounded-2xl p-8 mb-8 shadow-warm">
                  <div className="aspect-[8.5/11] bg-cream border border-sand rounded-xl overflow-hidden relative">
                    {/* Mock PDF Content - Whitepaper Preview */}
                    <div className="absolute inset-0 p-6">
                      {/* Header */}
                      <div className="text-center mb-6">
                        <div className="h-3 w-1/3 bg-terracotta/30 rounded mx-auto mb-2" />
                        <div className="h-5 w-3/4 bg-sand rounded mx-auto mb-1" />
                        <div className="h-5 w-2/3 bg-sand rounded mx-auto" />
                      </div>
                      {/* Intro paragraph */}
                      <div className="space-y-1.5 mb-6">
                        <div className="h-2 w-full bg-sand/50 rounded" />
                        <div className="h-2 w-5/6 bg-sand/50 rounded" />
                        <div className="h-2 w-4/5 bg-sand/50 rounded" />
                      </div>
                      {/* Section heading */}
                      <div className="h-3 w-1/2 bg-sand rounded mb-3" />
                      {/* Content */}
                      <div className="space-y-1.5 mb-4">
                        <div className="h-2 w-full bg-sand/40 rounded" />
                        <div className="h-2 w-5/6 bg-sand/40 rounded" />
                      </div>
                      {/* Three pillars diagram */}
                      <div className="grid grid-cols-3 gap-3 mt-4">
                        <div className="aspect-[3/4] bg-terracotta/10 rounded-lg flex items-center justify-center">
                          <span className="text-terracotta/40 font-serif text-lg">I</span>
                        </div>
                        <div className="aspect-[3/4] bg-terracotta/10 rounded-lg flex items-center justify-center">
                          <span className="text-terracotta/40 font-serif text-lg">II</span>
                        </div>
                        <div className="aspect-[3/4] bg-terracotta/10 rounded-lg flex items-center justify-center">
                          <span className="text-terracotta/40 font-serif text-lg">III</span>
                        </div>
                      </div>
                    </div>

                    {/* Overlay when locked */}
                    {!isUnlocked && (
                      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center">
                          <Mail className="w-12 h-12 text-taupe mx-auto mb-3" />
                          <p className="text-gray-600 text-sm">Enter your email to receive this guide</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Document Info */}
                  <div className="mt-6 flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText className="w-4 h-4" />
                      <span>outcome-architecture-framework.pdf</span>
                    </div>
                    <span className="text-gray-400">18 pages</span>
                  </div>
                </div>

                {/* Email Form / Success Message */}
                {!isUnlocked ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 uppercase tracking-wider mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={cn(
                          'w-full px-4 py-3 bg-white border rounded-xl text-gray-900 placeholder-gray-400',
                          'focus:outline-none focus:ring-2 focus:ring-terracotta focus:border-transparent',
                          'transition-all duration-200 border-sand'
                        )}
                        placeholder="your@email.com"
                      />
                    </div>
                    {error && (
                      <p className="text-red-500 text-sm">{error}</p>
                    )}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center px-6 py-3 bg-terracotta hover:bg-terracotta/90 text-white rounded-xl font-medium transition-all duration-200 shadow-warm disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Send Me the Framework
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </button>
                    <p className="text-gray-500 text-xs text-center">
                      The framework PDF will be delivered to your inbox. No spam, ever.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terracotta/20 mb-4">
                      <Check className="w-8 h-8 text-terracotta" />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-gray-900 mb-2">
                      Your Framework is Ready
                    </h3>
                    <p className="text-gray-600 text-sm max-w-xs mx-auto mb-6">
                      Thank you! Click below to download the Outcome Architecture Framework.
                    </p>
                    <a
                      href={FRAMEWORK_PDF_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-terracotta hover:bg-terracotta/90 text-white rounded-xl font-medium transition-all duration-200 shadow-warm"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </a>
                    <p className="text-gray-400 text-xs mt-4">
                      We&apos;ve also sent a copy to <strong>{email}</strong>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Framework Overview */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-4">
                The Three Pillars
              </h2>
              <p className="text-gray-600">
                Outcome Architecture is built on three interconnected pillars that ensure
                predictable software growth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-cream border border-sand rounded-2xl p-8 hover:shadow-warm transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-terracotta/20 flex items-center justify-center mb-6">
                  <span className="text-terracotta font-serif font-bold text-xl">I</span>
                </div>
                <h3 className="text-gray-900 font-serif font-semibold text-lg mb-3">
                  Frictionless Velocity Engine
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Eliminate the bottlenecks that slow development. From CI/CD optimization
                  to developer experience improvements that compound over time.
                </p>
              </div>

              <div className="bg-cream border border-sand rounded-2xl p-8 hover:shadow-warm transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-terracotta/20 flex items-center justify-center mb-6">
                  <span className="text-terracotta font-serif font-bold text-xl">II</span>
                </div>
                <h3 className="text-gray-900 font-serif font-semibold text-lg mb-3">
                  Sovereign Stack Foundation
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Build on a technology foundation that scales without drama. Production-proven
                  architecture patterns that give you control and predictability.
                </p>
              </div>

              <div className="bg-cream border border-sand rounded-2xl p-8 hover:shadow-warm transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-terracotta/20 flex items-center justify-center mb-6">
                  <span className="text-terracotta font-serif font-bold text-xl">III</span>
                </div>
                <h3 className="text-gray-900 font-serif font-semibold text-lg mb-3">
                  Continuous Certainty Protocol
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
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
