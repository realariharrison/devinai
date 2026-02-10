'use client';

import { useState } from 'react';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { Send, Loader2, CheckCircle2, Mail, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }

      setIsSuccess(true);
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
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-boardroom font-mono text-sm tracking-wider uppercase mb-4">
                Get in Touch
              </p>
              <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-6">
                Start an Outcome Conversation
              </h1>
              <p className="text-lg text-cloud/70 leading-relaxed">
                Ready to transform your software development approach? Let us know about
                your challenges and goals. We respond within one business day.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Contact Info */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-xl font-serif font-semibold text-white mb-6">
                    Contact Information
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-boardroom/20 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-boardroom" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">Email</h3>
                        <a
                          href="mailto:hello@devinai.com"
                          className="text-cloud/60 hover:text-boardroom transition-colors"
                        >
                          hello@devinai.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-boardroom/20 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-boardroom" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">Location</h3>
                        <p className="text-cloud/60">
                          Remote-first, serving clients globally
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-sm bg-boardroom/20 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-boardroom" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">Response Time</h3>
                        <p className="text-cloud/60">
                          Within 1 business day
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-cloud/10">
                  <h3 className="text-white font-medium mb-4">Looking for Something Specific?</h3>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <a href="/system-audit" className="text-cloud/60 hover:text-boardroom transition-colors">
                        Request a System Audit
                      </a>
                    </li>
                    <li>
                      <a href="/framework" className="text-cloud/60 hover:text-boardroom transition-colors">
                        Download the Framework Whitepaper
                      </a>
                    </li>
                    <li>
                      <a href="/portfolio" className="text-cloud/60 hover:text-boardroom transition-colors">
                        View Our Portfolio
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-3">
                <div className="bg-midnight/50 border border-cloud/10 rounded-sm p-8 lg:p-10">
                  {isSuccess ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-boardroom/20 mb-6 animate-fade-in">
                        <CheckCircle2 className="w-10 h-10 text-boardroom animate-commission" />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-white mb-4 animate-fade-in-up">
                        Message Received
                      </h3>
                      <p className="text-cloud/70 max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                        Thank you for reaching out. We will review your message and respond
                        within one business day.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-medium text-cloud uppercase tracking-wider mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className={cn(
                              'w-full px-4 py-3 bg-vault/10 border rounded-sm text-white placeholder-cloud/40',
                              'focus:outline-none focus:ring-2 focus:ring-boardroom focus:border-transparent',
                              'transition-all duration-200 border-cloud/20'
                            )}
                            placeholder="John Smith"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-cloud uppercase tracking-wider mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className={cn(
                              'w-full px-4 py-3 bg-vault/10 border rounded-sm text-white placeholder-cloud/40',
                              'focus:outline-none focus:ring-2 focus:ring-boardroom focus:border-transparent',
                              'transition-all duration-200 border-cloud/20'
                            )}
                            placeholder="john@company.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-cloud uppercase tracking-wider mb-2">
                          Company
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className={cn(
                            'w-full px-4 py-3 bg-vault/10 border rounded-sm text-white placeholder-cloud/40',
                            'focus:outline-none focus:ring-2 focus:ring-boardroom focus:border-transparent',
                            'transition-all duration-200 border-cloud/20'
                          )}
                          placeholder="Acme Corporation (optional)"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-cloud uppercase tracking-wider mb-2">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={6}
                          className={cn(
                            'w-full px-4 py-3 bg-vault/10 border rounded-sm text-white placeholder-cloud/40',
                            'focus:outline-none focus:ring-2 focus:ring-boardroom focus:border-transparent',
                            'transition-all duration-200 border-cloud/20 resize-none'
                          )}
                          placeholder="Tell us about your project, challenges, or goals..."
                        />
                      </div>

                      {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center justify-center px-8 py-3 bg-boardroom hover:bg-boardroom/90 text-white rounded-sm font-medium transition-all duration-200 hover:shadow-glow disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            Send Message
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
