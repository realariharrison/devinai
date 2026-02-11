'use client';

import { useState, useMemo } from 'react';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { PortfolioGrid, IndustryFilter } from '@/components/portfolio';
import { demoPortfolioProjects } from '@/lib/demo-data';
import { Briefcase } from 'lucide-react';

export default function PortfolioPage() {
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);

  // Get published projects
  const publishedProjects = useMemo(
    () => demoPortfolioProjects.filter((p) => p.published),
    []
  );

  // Get unique industries
  const industries = useMemo(() => {
    const uniqueIndustries = new Set<string>();
    publishedProjects.forEach((p) => {
      if (p.industry) uniqueIndustries.add(p.industry);
    });
    return Array.from(uniqueIndustries).sort();
  }, [publishedProjects]);

  // Filter projects by industry
  const filteredProjects = useMemo(() => {
    if (!activeIndustry) return publishedProjects;
    return publishedProjects.filter((p) => p.industry === activeIndustry);
  }, [publishedProjects, activeIndustry]);

  // Calculate total outcomes
  const totalOutcomes = useMemo(() => {
    let costReduction = 0;
    let velocityIncrease = 0;

    publishedProjects.forEach((project) => {
      project.outcomes.forEach((outcome) => {
        // Skip if before is 0 to avoid division by zero
        if (outcome.before === 0) return;

        if (outcome.metric.includes('Cost') || outcome.metric.includes('Time')) {
          const reduction = Math.round(
            Math.abs(((outcome.after - outcome.before) / outcome.before) * 100)
          );
          if (reduction > costReduction && isFinite(reduction)) costReduction = reduction;
        }
        if (outcome.metric.includes('Velocity') || outcome.metric.includes('Features')) {
          const increase = Math.round(outcome.after / outcome.before);
          if (increase > velocityIncrease && isFinite(increase)) velocityIncrease = increase;
        }
      });
    });

    // Default values if no valid calculations
    return {
      costReduction: costReduction || 40,
      velocityIncrease: velocityIncrease || 4
    };
  }, [publishedProjects]);

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-5 h-5 text-terracotta" />
                <span className="text-sm font-sans text-terracotta uppercase tracking-wider">
                  Case Studies
                </span>
              </div>
              <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-gray-900 mb-6">
                Systems that scale without drama
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 font-sans leading-relaxed">
                Real transformations, measurable outcomes. Every project follows our Outcome
                Architecture methodology to deliver predictable growth.
              </p>
            </div>
          </ScrollReveal>

          {/* Stats Bar */}
          <ScrollReveal delay={200}>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 py-8 border-y border-sand">
              <div>
                <span className="block font-mono text-3xl lg:text-4xl font-bold text-terracotta">
                  {publishedProjects.length}+
                </span>
                <span className="text-sm text-gray-500 font-sans uppercase tracking-wider">
                  Projects Delivered
                </span>
              </div>
              <div>
                <span className="block font-mono text-3xl lg:text-4xl font-bold text-terracotta">
                  {totalOutcomes.costReduction}%
                </span>
                <span className="text-sm text-gray-500 font-sans uppercase tracking-wider">
                  Avg Cost Reduction
                </span>
              </div>
              <div>
                <span className="block font-mono text-3xl lg:text-4xl font-bold text-terracotta">
                  {totalOutcomes.velocityIncrease}x
                </span>
                <span className="text-sm text-gray-500 font-sans uppercase tracking-wider">
                  Velocity Increase
                </span>
              </div>
              <div>
                <span className="block font-mono text-3xl lg:text-4xl font-bold text-terracotta">
                  99.9%
                </span>
                <span className="text-sm text-gray-500 font-sans uppercase tracking-wider">
                  Client Satisfaction
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Filter Section */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal delay={300}>
            <IndustryFilter
              industries={industries}
              activeIndustry={activeIndustry}
              onFilterChange={setActiveIndustry}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-20 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal delay={400}>
            <PortfolioGrid projects={filteredProjects} />
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-terracotta">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl lg:text-4xl text-white mb-6">
              Ready to join these success stories?
            </h2>
            <p className="text-lg text-white/80 font-sans mb-8 max-w-2xl mx-auto">
              Schedule a complimentary System Audit to discover how Outcome Architecture
              can transform your development velocity.
            </p>
            <a
              href="/system-audit"
              className="inline-flex items-center gap-2 bg-white hover:bg-cream text-terracotta px-8 py-4 rounded-lg font-medium transition-colors shadow-warm"
            >
              Schedule Your System Audit
            </a>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
