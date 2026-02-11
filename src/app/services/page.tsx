'use client';

import Link from 'next/link';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import {
  Code2,
  Palette,
  Zap,
  Shield,
  LineChart,
  Workflow,
  ArrowRight,
  Check,
  FileText,
  Server,
  Brain,
  Network
} from 'lucide-react';

const services = [
  {
    icon: Server,
    title: 'MCP Server Development',
    description: 'Build powerful Model Context Protocol servers and UI applications. Connect AI models to your data, tools, and systems with production-ready infrastructure.',
    features: [
      'Custom MCP server implementation',
      'Claude Desktop & IDE integrations',
      'MCP-powered UI applications',
      'Tool & resource orchestration',
    ],
  },
  {
    icon: Brain,
    title: 'AI Engineering',
    description: 'Transform your products with intelligent capabilities. From prompt engineering to full AI system architecture, we build AI that delivers real business value.',
    features: [
      'LLM integration & fine-tuning',
      'Prompt engineering & optimization',
      'RAG & knowledge systems',
      'AI-powered feature development',
    ],
  },
  {
    icon: Network,
    title: 'ML Engineering',
    description: 'Production machine learning systems that scale. We design, train, and deploy models with robust MLOps practices for reliable, maintainable AI infrastructure.',
    features: [
      'Model training & optimization',
      'MLOps & pipeline automation',
      'Feature engineering',
      'Model monitoring & retraining',
    ],
  },
  {
    icon: Code2,
    title: 'Custom Development',
    description: 'Full-stack applications built with modern technologies. From MVPs to enterprise-scale systems, we build software that grows with your business.',
    features: [
      'Next.js & React applications',
      'API design & development',
      'Database architecture',
      'Third-party integrations',
    ],
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    description: 'User-centered design that converts. We create intuitive interfaces that delight users and drive measurable business outcomes.',
    features: [
      'User research & personas',
      'Wireframing & prototyping',
      'Design systems',
      'Usability testing',
    ],
  },
  {
    icon: Zap,
    title: 'Performance Optimization',
    description: 'Speed is revenue. We audit and optimize your existing applications to load faster, rank higher, and convert better.',
    features: [
      'Core Web Vitals optimization',
      'Database query tuning',
      'Caching strategies',
      'CDN configuration',
    ],
  },
  {
    icon: Shield,
    title: 'Security Audits',
    description: 'Protect your users and your reputation. Comprehensive security reviews that identify vulnerabilities before they become breaches.',
    features: [
      'Penetration testing',
      'Code security review',
      'Compliance assessment',
      'Security hardening',
    ],
  },
  {
    icon: LineChart,
    title: 'Technical Strategy',
    description: 'Make confident technology decisions. We help you choose the right stack, architecture, and approach for your specific goals.',
    features: [
      'Technology roadmapping',
      'Architecture review',
      'Build vs. buy analysis',
      'Team scaling guidance',
    ],
  },
  {
    icon: Workflow,
    title: 'DevOps & Infrastructure',
    description: 'Ship faster with confidence. We implement CI/CD pipelines, monitoring, and infrastructure that lets your team focus on features.',
    features: [
      'CI/CD pipeline setup',
      'Cloud infrastructure (AWS/GCP/Vercel)',
      'Monitoring & alerting',
      'Disaster recovery planning',
    ],
  },
];

const processSteps = [
  {
    number: '01',
    title: 'Discovery',
    description: 'We start by understanding your business, users, and goals. This foundation ensures every decision we make moves you forward.',
  },
  {
    number: '02',
    title: 'Strategy',
    description: 'Based on discovery insights, we create a technical roadmap with clear milestones, timelines, and measurable outcomes.',
  },
  {
    number: '03',
    title: 'Build',
    description: 'Iterative development with weekly demos. You see progress in real-time and can adjust course as we learn together.',
  },
  {
    number: '04',
    title: 'Launch & Learn',
    description: 'We deploy, monitor, and refine. Post-launch support ensures your investment continues to deliver returns.',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-24 border-b border-sand">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-terracotta font-mono text-sm tracking-wider uppercase mb-4">
                Our Services
              </p>
              <h1 className="text-3xl lg:text-5xl font-serif font-bold text-gray-900 mb-6">
                Software that scales. <br />
                <span className="text-terracotta">Predictably.</span>
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                We help ambitious companies build software that works today and scales tomorrow.
                Every engagement is grounded in our Outcome Architecture methodology —
                ensuring technical decisions drive measurable business results.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/system-audit" className="btn-primary">
                  Request Free Audit
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
                <Link
                  href="/framework"
                  className="inline-flex items-center px-6 py-3 border border-sand rounded-xl text-gray-700 hover:bg-white transition-colors"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Get the Framework
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-4">
                What We Do
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                End-to-end capabilities for building and scaling software products.
                Every service is delivered with our signature focus on outcomes.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="bg-cream border border-sand rounded-2xl p-8 hover:shadow-warm transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-terracotta/20 flex items-center justify-center mb-6 group-hover:bg-terracotta/30 transition-colors">
                      <Icon className="w-6 h-6 text-terracotta" />
                    </div>
                    <h3 className="text-gray-900 font-serif font-semibold text-xl mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-2 text-sm text-gray-500">
                          <Check className="w-4 h-4 text-terracotta flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 lg:py-24 border-t border-sand">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-serif font-bold text-gray-900 mb-4">
                How We Work
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A proven process that reduces risk and maximizes value at every stage.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  {/* Connector line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-sand -translate-x-4" />
                  )}
                  <div className="text-5xl font-serif font-bold text-terracotta/20 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-gray-900 font-semibold text-lg mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-terracotta">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl lg:text-3xl font-serif font-bold text-white mb-4">
              Ready to build software that scales?
            </h2>
            <p className="text-white/80 mb-8 max-w-2xl mx-auto">
              Start with a free System Audit. We will analyze your current architecture
              and identify the highest-impact opportunities for improvement.
            </p>
            <Link
              href="/system-audit"
              className="inline-flex items-center px-8 py-4 bg-white text-terracotta rounded-xl font-medium hover:bg-cream transition-colors shadow-warm"
            >
              Request Your Free Audit
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
