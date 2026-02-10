'use client';

import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-midnight overflow-hidden">
      {/* Architectural Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(144, 224, 239, 0.01) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(144, 224, 239, 0.01) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Subtle gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-boardroom/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-vault/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow */}
          <ScrollReveal delay={100} duration={700}>
            <div className="inline-flex items-center bg-vault/10 border border-vault/20 rounded-sm px-4 py-1.5 mb-8">
              <span className="text-vault-700 text-sm font-mono tracking-wider uppercase">
                Outcome Architecture Agency
              </span>
            </div>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal delay={200} duration={800}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white leading-tight mb-8">
              Your Software,{' '}
              <span className="relative">
                <span className="relative z-10">Engineered</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-boardroom/30 -z-0" />
              </span>{' '}
              for Predictable Growth.
            </h1>
          </ScrollReveal>

          {/* Subheadline */}
          <ScrollReveal delay={400} duration={800}>
            <p className="text-lg sm:text-xl lg:text-2xl text-cloud/70 leading-relaxed mb-12 max-w-3xl mx-auto font-light">
              We don&apos;t just build applications&mdash;we install reliable growth systems
              that scale without drama.
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={600} duration={800}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Link
                href="/system-audit"
                className="group bg-boardroom hover:bg-boardroom/90 text-white px-8 py-4 rounded-sm text-base font-medium transition-all duration-300 hover:shadow-xl hover:shadow-boardroom/25 flex items-center"
              >
                Request System Audit
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/portfolio"
                className="group border border-cloud/20 hover:border-cloud/40 text-cloud hover:text-white px-8 py-4 rounded-sm text-base font-medium transition-all duration-300 flex items-center"
              >
                View Case Studies
                <ArrowRight className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Trust indicators */}
          <ScrollReveal delay={800} duration={800}>
            <div className="mt-20 pt-12 border-t border-cloud/10">
              <p className="text-cloud/40 text-sm font-mono uppercase tracking-wider mb-6">
                Trusted by Growth-Stage Companies
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16 opacity-60">
                <span className="text-cloud/50 font-serif text-lg">TechFlow Systems</span>
                <span className="text-cloud/50 font-serif text-lg">CreatorHub</span>
                <span className="text-cloud/50 font-serif text-lg">Meridian Finance</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-cloud/30" />
      </div>
    </section>
  );
}
