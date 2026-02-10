'use client';

import { Zap, Layers, Shield } from 'lucide-react';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { SystemCard } from '@/components/shared/SystemCard';

const pillars = [
  {
    icon: Zap,
    title: 'Frictionless Velocity Engine',
    outcome: 'Ship 3x faster without debt',
    description:
      'Automated CI/CD pipelines, feature flags, and staged rollouts that eliminate production incidents while accelerating feature delivery.',
  },
  {
    icon: Layers,
    title: 'Sovereign Stack Foundation',
    outcome: 'Tech that scales predictably',
    description:
      'Modern, type-safe architecture with Next.js, Supabase, and Vercel. Built for 100x growth without replatforming surprises.',
  },
  {
    icon: Shield,
    title: 'Continuous Certainty Protocol',
    outcome: 'Crystal-clear visibility',
    description:
      'Comprehensive monitoring, automated testing, and real-time performance dashboards. Know exactly what\'s happening, always.',
  },
];

export function ThreePillarsSection() {
  return (
    <section className="relative bg-vault/5 py-24 lg:py-32 overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(144, 224, 239, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
            <span className="text-boardroom text-sm font-mono uppercase tracking-wider">
              Our Methodology
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              The 3-Pillar System Architecture
            </h2>
            <p className="mt-6 text-lg text-cloud/60 leading-relaxed">
              Every engagement is built on three interlocking pillars that ensure
              predictable outcomes, not just deliverables.
            </p>
          </div>
        </ScrollReveal>

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <ScrollReveal key={pillar.title} delay={index * 150} duration={800}>
              <SystemCard
                icon={pillar.icon}
                title={pillar.title}
                outcome={pillar.outcome}
                description={pillar.description}
                delay={index * 150}
              />
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom connector line */}
        <ScrollReveal delay={600}>
          <div className="mt-16 lg:mt-20 flex items-center justify-center">
            <div className="flex items-center space-x-4">
              <div className="w-16 lg:w-24 h-px bg-gradient-to-r from-transparent to-cloud/20" />
              <span className="text-cloud/40 text-sm font-mono">Integrated System</span>
              <div className="w-16 lg:w-24 h-px bg-gradient-to-l from-transparent to-cloud/20" />
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
