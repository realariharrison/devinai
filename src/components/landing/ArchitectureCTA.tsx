'use client';

import Link from 'next/link';
import { ArrowRight, Target, Route, TrendingUp } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';

const benefits = [
  {
    icon: Target,
    title: 'Growth Gap Analysis',
    description: 'Identify the friction points limiting your growth trajectory',
  },
  {
    icon: Route,
    title: 'Stack Optimization Roadmap',
    description: 'Clear, prioritized plan to modernize your architecture',
  },
  {
    icon: TrendingUp,
    title: '12-Month Outcome Projection',
    description: 'Concrete metrics forecast based on our methodology',
  },
];

export function ArchitectureCTA() {
  return (
    <section className="relative bg-midnight py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight to-boardroom/10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="relative bg-vault/5 border border-cloud/10 rounded-sm p-8 lg:p-16 overflow-hidden">
            {/* Accent corners */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-boardroom/30 rounded-tl-sm" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-boardroom/30 rounded-br-sm" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Content */}
              <div>
                <span className="text-boardroom text-sm font-mono uppercase tracking-wider">
                  Start Here
                </span>
                <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
                  Request a System Architecture Audit
                </h2>
                <p className="mt-6 text-lg text-cloud/60 leading-relaxed">
                  A comprehensive analysis of your current stack, growth blockers,
                  and a clear roadmap to predictable scaling. No commitment required.
                </p>

                <Link
                  href="/system-audit"
                  className="group inline-flex items-center bg-boardroom hover:bg-boardroom/90 text-white px-8 py-4 rounded-sm text-base font-medium transition-all duration-300 hover:shadow-xl hover:shadow-boardroom/25 mt-8"
                >
                  Request Your Audit
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <p className="mt-4 text-cloud/40 text-sm">
                  Free consultation. Response within 24 hours.
                </p>
              </div>

              {/* Right Column - Benefits */}
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <ScrollReveal key={benefit.title} delay={index * 150 + 200} duration={700}>
                    <div className="flex items-start space-x-4 group">
                      <div className="flex-shrink-0 w-12 h-12 bg-boardroom/10 rounded-sm flex items-center justify-center group-hover:bg-boardroom/20 transition-colors duration-300">
                        <benefit.icon className="w-6 h-6 text-boardroom" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">
                          {benefit.title}
                        </h3>
                        <p className="text-cloud/60 text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-boardroom/5 rounded-full blur-[100px] pointer-events-none" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
