'use client';

import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Code, Database, Globe, Sparkles } from 'lucide-react';

const stackItems = [
  {
    name: 'React / Next.js',
    description: 'Server-side rendering with edge optimization',
    icon: Code,
    position: 'top-left',
  },
  {
    name: 'Supabase',
    description: 'PostgreSQL with Row Level Security',
    icon: Database,
    position: 'top-right',
  },
  {
    name: 'Vercel',
    description: 'Global edge deployment infrastructure',
    icon: Globe,
    position: 'bottom-left',
  },
  {
    name: 'Claude AI',
    description: 'Intelligent automation and assistance',
    icon: Sparkles,
    position: 'bottom-right',
  },
];

export function SystemShowcaseSection() {
  return (
    <section className="relative bg-midnight py-24 lg:py-32 overflow-hidden">
      {/* Connecting lines background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00B4D8" stopOpacity="0" />
            <stop offset="50%" stopColor="#00B4D8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00B4D8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="25%"
          y1="35%"
          x2="50%"
          y2="50%"
          stroke="url(#line-gradient)"
          strokeWidth="1"
        />
        <line
          x1="75%"
          y1="35%"
          x2="50%"
          y2="50%"
          stroke="url(#line-gradient)"
          strokeWidth="1"
        />
        <line
          x1="25%"
          y1="65%"
          x2="50%"
          y2="50%"
          stroke="url(#line-gradient)"
          strokeWidth="1"
        />
        <line
          x1="75%"
          y1="65%"
          x2="50%"
          y2="50%"
          stroke="url(#line-gradient)"
          strokeWidth="1"
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-24">
            <span className="text-boardroom text-sm font-mono uppercase tracking-wider">
              Technology Foundation
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight">
              Our Engineered Stack
            </h2>
            <p className="mt-6 text-lg text-cloud/60 leading-relaxed">
              We build on proven technologies that scale predictably,
              with full ownership and zero vendor lock-in.
            </p>
          </div>
        </ScrollReveal>

        {/* Stack Visualization */}
        <div className="relative">
          {/* Center hub */}
          <ScrollReveal delay={200}>
            <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-boardroom/10 border border-boardroom/30 rounded-full items-center justify-center z-10">
              <div className="w-20 h-20 bg-boardroom/20 border border-boardroom/40 rounded-full flex items-center justify-center">
                <span className="text-boardroom font-mono text-xs uppercase tracking-wider">Core</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Stack Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-16 lg:px-16">
            {stackItems.map((item, index) => (
              <ScrollReveal key={item.name} delay={index * 150 + 300} duration={800}>
                <div className="group relative bg-midnight/50 backdrop-blur-sm border border-cloud/10 rounded-sm p-6 lg:p-8 transition-all duration-500 hover:border-boardroom/30">
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div className="flex-shrink-0 w-12 h-12 bg-vault/10 rounded-sm flex items-center justify-center group-hover:bg-boardroom/10 transition-colors duration-300">
                      <item.icon className="w-6 h-6 text-boardroom" />
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {item.name}
                      </h3>
                      <p className="text-cloud/60 text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Connection dot */}
                  <div className="hidden lg:block absolute w-2 h-2 bg-boardroom rounded-full">
                    <span
                      className={`absolute w-2 h-2 bg-boardroom rounded-full animate-ping ${
                        item.position === 'top-left' ? '-right-1 top-1/2' :
                        item.position === 'top-right' ? '-left-1 top-1/2' :
                        item.position === 'bottom-left' ? '-right-1 top-1/2' :
                        '-left-1 top-1/2'
                      }`}
                    />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Tech badges */}
        <ScrollReveal delay={800}>
          <div className="mt-16 lg:mt-20 flex flex-wrap items-center justify-center gap-3">
            {['TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Edge Functions', 'RLS'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-vault/5 border border-cloud/10 rounded-sm text-cloud/60 text-sm font-mono"
              >
                {tech}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
