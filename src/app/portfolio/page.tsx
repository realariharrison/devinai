import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { ScrollReveal } from '@/components/shared/ScrollReveal';
import { Briefcase, ArrowUpRight, Clock } from 'lucide-react';

// Static portfolio projects with GitHub links
const portfolioProjects = [
  {
    id: '1',
    slug: 'markey-luxury-marketplace',
    client_name: 'Markey',
    project_title: 'Multi-Vendor Luxury Marketplace Platform',
    industry: 'E-commerce',
    duration: '3 weeks',
    tech_stack: ['Next.js 15', 'React 19', 'Supabase', 'Stripe Connect', 'Tailwind CSS', 'Claude AI'],
    outcome_metric: '75%',
    outcome_label: 'dev time reduction',
    github_url: 'https://github.com/realariharrison/markey',
  },
  {
    id: '2',
    slug: 'ai-groceries-delivery',
    client_name: 'AI Groceries',
    project_title: 'AI-Powered Grocery Delivery Platform',
    industry: 'Food & Delivery',
    duration: '2 weeks',
    tech_stack: ['Next.js 15', 'React 19', 'Supabase', 'Stripe', 'Tailwind CSS', 'Claude AI'],
    outcome_metric: '50%',
    outcome_label: 'cost reduction',
    github_url: 'https://github.com/realariharrison/ai-groceries',
  },
  {
    id: '3',
    slug: 'vcphi-venture-capital',
    client_name: 'VC Phi',
    project_title: 'Venture Capital Portfolio Platform',
    industry: 'Finance',
    duration: '2 weeks',
    tech_stack: ['Next.js 15', 'React 19', 'Supabase', 'Tailwind CSS', 'Claude AI', 'Recharts'],
    outcome_metric: '80%',
    outcome_label: 'dev time reduction',
    github_url: 'https://github.com/realariharrison/vcphi',
  },
  {
    id: '4',
    slug: 'biglabs-consulting',
    client_name: 'Biglabs',
    project_title: 'Enterprise Consulting Platform',
    industry: 'Consulting',
    duration: '2 weeks',
    tech_stack: ['Next.js 15', 'React 19', 'Supabase', 'Tailwind CSS', 'Claude AI', 'Recharts'],
    outcome_metric: '50%',
    outcome_label: 'cost reduction',
    github_url: 'https://github.com/realariharrison/biglabs',
  },
  {
    id: '5',
    slug: 'ai-fee-creator-platform',
    client_name: 'AI Fee',
    project_title: 'Creator Monetization Platform',
    industry: 'Creator Economy',
    duration: '2 weeks',
    tech_stack: ['Next.js 15', 'React 19', 'Supabase', 'Stripe', 'Tailwind CSS', 'Claude AI'],
    outcome_metric: '50%',
    outcome_label: 'cost reduction',
    github_url: 'https://github.com/realariharrison/ai-fee',
  },
];

export default function PortfolioPage() {
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
                  Open Source Templates
                </span>
              </div>
              <h1 className="font-serif text-4xl lg:text-5xl xl:text-6xl text-gray-900 mb-6">
                Production-ready templates
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 font-sans leading-relaxed">
                Full-stack Next.js templates with Supabase, Stripe, and AI integrations.
                Clone, customize, and deploy in minutes.
              </p>
            </div>
          </ScrollReveal>

          {/* Stats Bar */}
          <ScrollReveal>
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 py-8 border-y border-sand">
              <div>
                <span className="block font-mono text-3xl lg:text-4xl font-bold text-terracotta">
                  {portfolioProjects.length}+
                </span>
                <span className="text-sm text-gray-500 font-sans uppercase tracking-wider">
                  Templates Available
                </span>
              </div>
              <div>
                <span className="block font-mono text-3xl lg:text-4xl font-bold text-terracotta">
                  50%
                </span>
                <span className="text-sm text-gray-500 font-sans uppercase tracking-wider">
                  Avg Cost Savings
                </span>
              </div>
              <div>
                <span className="block font-mono text-3xl lg:text-4xl font-bold text-terracotta">
                  4x
                </span>
                <span className="text-sm text-gray-500 font-sans uppercase tracking-wider">
                  Faster Development
                </span>
              </div>
              <div>
                <span className="block font-mono text-3xl lg:text-4xl font-bold text-terracotta">
                  100%
                </span>
                <span className="text-sm text-gray-500 font-sans uppercase tracking-wider">
                  Open Source
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-20 lg:pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {portfolioProjects.map((project, index) => (
                <a
                  key={project.id}
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    group block rounded-2xl overflow-hidden border border-sand
                    hover:border-taupe hover:shadow-warm transition-all duration-300
                    bg-white
                    ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}
                  `}
                >
                  {/* Featured Image Placeholder */}
                  <div className="relative overflow-hidden aspect-[16/9]">
                    <div className="absolute inset-0 bg-gradient-to-br from-terracotta/20 via-taupe/20 to-sand/30" />

                    {/* Industry Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-terracotta text-white text-xs font-sans font-semibold rounded-full uppercase tracking-wide">
                        {project.industry}
                      </span>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span className="text-xs font-sans text-gray-700">{project.duration}</span>
                    </div>

                    {/* Hover Arrow */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 rounded-full bg-terracotta flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Client Name */}
                    <span className="block text-xs font-sans font-semibold text-gray-500 uppercase tracking-widest mb-2">
                      {project.client_name}
                    </span>

                    {/* Project Title */}
                    <h3 className="font-serif text-xl text-gray-900 group-hover:text-terracotta transition-colors duration-300 mb-4">
                      {project.project_title}
                    </h3>

                    {/* Key Outcome Metric */}
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="font-mono text-3xl font-bold text-terracotta">
                        {project.outcome_metric}
                      </span>
                      <span className="text-sm text-gray-600 font-sans">
                        {project.outcome_label}
                      </span>
                    </div>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-sand/50 text-gray-600 text-xs font-sans rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* GitHub Link Indicator */}
                    <div className="mt-4 pt-4 border-t border-sand">
                      <span className="text-terracotta text-sm font-medium group-hover:underline">
                        View on GitHub →
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-terracotta">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl lg:text-4xl text-white mb-6">
              Need a custom template?
            </h2>
            <p className="text-lg text-white/80 font-sans mb-8 max-w-2xl mx-auto">
              Schedule a complimentary System Audit to discuss your specific requirements
              and how we can accelerate your development.
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
