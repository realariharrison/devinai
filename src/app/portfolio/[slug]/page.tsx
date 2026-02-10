import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  Clock,
  Target,
  Lightbulb,
  BarChart3,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import {
  OutcomeMetrics,
  TechStackBadges,
  TestimonialBlock,
} from '@/components/portfolio';
import { demoPortfolioProjects } from '@/lib/demo-data';

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all portfolio projects
export async function generateStaticParams() {
  return demoPortfolioProjects
    .filter((project) => project.published)
    .map((project) => ({
      slug: project.slug,
    }));
}

// Generate metadata for each project
export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = demoPortfolioProjects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found | DevinAI',
    };
  }

  return {
    title: `${project.client_name}: ${project.project_title} | DevinAI`,
    description: `Case study: ${project.challenge.description} See how we achieved measurable outcomes through Outcome Architecture.`,
    openGraph: {
      title: `${project.client_name} Case Study | DevinAI`,
      description: project.challenge.description,
      type: 'article',
      images: project.featured_image ? [project.featured_image] : undefined,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = demoPortfolioProjects.find((p) => p.slug === slug && p.published);

  if (!project) {
    notFound();
  }

  // Get related projects (different from current)
  const relatedProjects = demoPortfolioProjects
    .filter((p) => p.published && p.id !== project.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-midnight">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 lg:pt-40 pb-16 lg:pb-20">
        {/* Back Link */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-cloud/60 hover:text-boardroom transition-colors duration-300 font-sans text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Case Studies
          </Link>
        </div>

        {/* Hero Content */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                {/* Client Name */}
                <span className="inline-block text-sm font-sans font-semibold text-cloud/50 uppercase tracking-widest mb-3">
                  {project.client_name}
                </span>

                {/* Project Title */}
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cloud mb-6 leading-tight">
                  {project.project_title}
                </h1>

                {/* Badges Row */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                  {/* Industry Badge */}
                  {project.industry && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-boardroom text-midnight text-sm font-sans font-semibold rounded">
                      <Target className="w-4 h-4" />
                      {project.industry}
                    </span>
                  )}

                  {/* Duration Badge */}
                  {project.duration && (
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-cloud/10 text-cloud text-sm font-sans rounded border border-cloud/20">
                      <Clock className="w-4 h-4 text-cloud/60" />
                      {project.duration}
                    </span>
                  )}
                </div>
              </ScrollReveal>
            </div>

            {/* Featured Image Placeholder */}
            <div className="lg:col-span-1 lg:row-span-2">
              <ScrollReveal delay={200}>
                <div className="aspect-[4/3] lg:aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-midnight via-boardroom/30 to-cloud/20 border border-cloud/10" />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-cloud/10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Section Label */}
            <div className="lg:col-span-1">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-boardroom" />
                  <span className="text-sm font-sans font-semibold text-boardroom uppercase tracking-wider">
                    The Challenge
                  </span>
                </div>
                <h2 className="font-serif text-2xl lg:text-3xl text-cloud">
                  {project.challenge.title}
                </h2>
              </ScrollReveal>
            </div>

            {/* Challenge Content */}
            <div className="lg:col-span-2">
              <ScrollReveal delay={100}>
                <p className="text-lg text-cloud/80 font-sans leading-relaxed mb-8">
                  {project.challenge.description}
                </p>

                {/* Pain Points */}
                <div className="bg-midnight-600 rounded-xl p-6 border border-cloud/10">
                  <h4 className="font-sans font-semibold text-cloud/90 mb-4 text-sm uppercase tracking-wider">
                    Key Pain Points
                  </h4>
                  <ul className="space-y-3">
                    {project.challenge.pain_points.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-cloud/70 font-sans"
                      >
                        <span className="w-6 h-6 rounded bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-mono text-red-400">
                            {index + 1}
                          </span>
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-midnight-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Section Label */}
            <div className="lg:col-span-1">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <Lightbulb className="w-6 h-6 text-boardroom" />
                  <span className="text-sm font-sans font-semibold text-boardroom uppercase tracking-wider">
                    The Solution
                  </span>
                </div>
                <h2 className="font-serif text-2xl lg:text-3xl text-cloud">
                  {project.solution.title}
                </h2>
              </ScrollReveal>
            </div>

            {/* Solution Content */}
            <div className="lg:col-span-2">
              <ScrollReveal delay={100}>
                <p className="text-lg text-cloud/80 font-sans leading-relaxed mb-8">
                  {project.solution.description}
                </p>

                {/* Three Pillars */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {project.solution.pillars.map((pillar, index) => (
                    <div
                      key={index}
                      className="bg-midnight rounded-lg p-6 border border-cloud/10 hover:border-boardroom/30 transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-boardroom/20 flex items-center justify-center mb-4">
                        <span className="font-mono font-bold text-boardroom">
                          {index + 1}
                        </span>
                      </div>
                      <h4 className="font-serif text-lg text-vault mb-2">
                        {pillar.name}
                      </h4>
                      <p className="text-sm text-cloud/60 font-sans leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Outcomes Section */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Section Label */}
            <div className="lg:col-span-1">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-boardroom" />
                  <span className="text-sm font-sans font-semibold text-boardroom uppercase tracking-wider">
                    The Outcomes
                  </span>
                </div>
                <h2 className="font-serif text-2xl lg:text-3xl text-cloud mb-4">
                  Measurable Results
                </h2>
                <p className="text-cloud/60 font-sans">
                  Every outcome tied to business objectives, not vanity metrics.
                </p>
              </ScrollReveal>
            </div>

            {/* Metrics */}
            <div className="lg:col-span-2">
              <ScrollReveal delay={100}>
                <OutcomeMetrics metrics={project.outcomes} />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {project.testimonial && project.testimonial_author && project.testimonial_role && (
        <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-cloud/10">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <TestimonialBlock
                quote={project.testimonial}
                author={project.testimonial_author}
                role={project.testimonial_role}
              />
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Tech Stack Section */}
      <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-midnight-600">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {/* Section Label */}
            <div className="lg:col-span-1">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-boardroom" />
                  <span className="text-sm font-sans font-semibold text-boardroom uppercase tracking-wider">
                    Tech Stack
                  </span>
                </div>
                <h2 className="font-serif text-2xl lg:text-3xl text-cloud">
                  Built with modern tools
                </h2>
              </ScrollReveal>
            </div>

            {/* Tech Badges */}
            <div className="lg:col-span-2">
              <ScrollReveal delay={100}>
                <TechStackBadges technologies={project.tech_stack} size="lg" />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl lg:text-4xl text-cloud mb-6">
              Ready for similar results?
            </h2>
            <p className="text-lg text-cloud/60 font-sans mb-8 max-w-2xl mx-auto">
              Schedule a complimentary System Audit to discover how we can transform
              your development velocity with Outcome Architecture.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/system-audit"
                className="btn-primary inline-flex items-center gap-2"
              >
                Schedule Your System Audit
              </a>
              <a
                href="/portfolio"
                className="btn-secondary inline-flex items-center gap-2"
              >
                View More Case Studies
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 lg:py-20 px-4 sm:px-6 lg:px-8 border-t border-cloud/10">
          <div className="max-w-7xl mx-auto">
            <ScrollReveal>
              <h2 className="font-serif text-2xl lg:text-3xl text-cloud mb-8">
                More Case Studies
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((relatedProject, index) => (
                <ScrollReveal key={relatedProject.id} delay={index * 100}>
                  <Link
                    href={`/portfolio/${relatedProject.slug}`}
                    className="group block bg-midnight-600 rounded-xl overflow-hidden border border-cloud/10 hover:border-boardroom/50 transition-all duration-300"
                  >
                    {/* Image Placeholder */}
                    <div className="aspect-[16/9] bg-gradient-to-br from-midnight via-boardroom/20 to-cloud/10" />

                    {/* Content */}
                    <div className="p-6">
                      <span className="block text-xs font-sans font-semibold text-cloud/50 uppercase tracking-widest mb-2">
                        {relatedProject.client_name}
                      </span>
                      <h3 className="font-serif text-xl text-cloud group-hover:text-boardroom transition-colors duration-300">
                        {relatedProject.project_title}
                      </h3>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
