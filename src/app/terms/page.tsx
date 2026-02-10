import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';

export const metadata = {
  title: 'Terms of Service | DevinAI',
  description: 'Terms of Service and Privacy Policy for DevinAI services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-midnight">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-16 lg:py-20 border-b border-cloud/10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-cloud/60">
              Last updated: January 1, 2024
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 lg:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-invert prose-cloud max-w-none">
              <article className="space-y-12">
                {/* Introduction */}
                <div>
                  <h2 className="text-xl font-serif font-semibold text-white mb-4">
                    1. Introduction
                  </h2>
                  <div className="space-y-4 text-cloud/70 leading-relaxed">
                    <p>
                      Welcome to DevinAI. These Terms of Service govern your use of our website,
                      services, and any related applications. By accessing or using our services,
                      you agree to be bound by these terms.
                    </p>
                    <p>
                      DevinAI provides software development consulting, system architecture design,
                      and related technology services. These terms apply to all clients, visitors,
                      and users of our services.
                    </p>
                  </div>
                </div>

                {/* Services */}
                <div>
                  <h2 className="text-xl font-serif font-semibold text-white mb-4">
                    2. Services
                  </h2>
                  <div className="space-y-4 text-cloud/70 leading-relaxed">
                    <p>
                      DevinAI offers professional software development and consulting services
                      including but not limited to:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>System Architecture Design and Review</li>
                      <li>Legacy System Modernization</li>
                      <li>AI/ML Integration Consulting</li>
                      <li>Full-Stack Application Development</li>
                      <li>Technical Due Diligence</li>
                      <li>Development Team Augmentation</li>
                    </ul>
                    <p>
                      Specific deliverables, timelines, and pricing are defined in individual
                      service agreements between DevinAI and clients.
                    </p>
                  </div>
                </div>

                {/* Intellectual Property */}
                <div>
                  <h2 className="text-xl font-serif font-semibold text-white mb-4">
                    3. Intellectual Property
                  </h2>
                  <div className="space-y-4 text-cloud/70 leading-relaxed">
                    <p>
                      Unless otherwise specified in a service agreement, intellectual property
                      rights are handled as follows:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>
                        <strong className="text-white">Client Work:</strong> Custom code and
                        deliverables created specifically for a client project are assigned
                        to the client upon full payment.
                      </li>
                      <li>
                        <strong className="text-white">Pre-existing Tools:</strong> DevinAI
                        retains ownership of any pre-existing tools, frameworks, or methodologies
                        used in delivering services.
                      </li>
                      <li>
                        <strong className="text-white">Website Content:</strong> All content on
                        this website, including text, graphics, and code, is owned by DevinAI
                        and protected by copyright laws.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Confidentiality */}
                <div>
                  <h2 className="text-xl font-serif font-semibold text-white mb-4">
                    4. Confidentiality
                  </h2>
                  <div className="space-y-4 text-cloud/70 leading-relaxed">
                    <p>
                      DevinAI maintains strict confidentiality regarding all client information,
                      business processes, and technical details shared during engagements.
                      We will not disclose confidential information without explicit written
                      consent, except as required by law.
                    </p>
                  </div>
                </div>

                {/* Limitation of Liability */}
                <div>
                  <h2 className="text-xl font-serif font-semibold text-white mb-4">
                    5. Limitation of Liability
                  </h2>
                  <div className="space-y-4 text-cloud/70 leading-relaxed">
                    <p>
                      To the maximum extent permitted by law, DevinAI shall not be liable for
                      any indirect, incidental, special, consequential, or punitive damages,
                      including but not limited to loss of profits, data, or business opportunities.
                    </p>
                    <p>
                      Our total liability for any claims arising from our services shall not
                      exceed the fees paid by the client for the specific service giving rise
                      to the claim.
                    </p>
                  </div>
                </div>

                {/* Privacy Policy */}
                <div id="privacy">
                  <h2 className="text-xl font-serif font-semibold text-white mb-4">
                    6. Privacy Policy
                  </h2>
                  <div className="space-y-4 text-cloud/70 leading-relaxed">
                    <p>
                      DevinAI is committed to protecting your privacy. This section describes
                      how we collect, use, and protect your information.
                    </p>

                    <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                      Information We Collect
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Contact information (name, email, company)</li>
                      <li>Technical information submitted through forms</li>
                      <li>Usage data and analytics</li>
                      <li>Communication records</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                      How We Use Information
                    </h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>To provide and improve our services</li>
                      <li>To communicate about projects and services</li>
                      <li>To send relevant updates and newsletters (with consent)</li>
                      <li>To analyze and improve our website</li>
                    </ul>

                    <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                      Data Protection
                    </h3>
                    <p>
                      We implement appropriate technical and organizational measures to protect
                      your data. We do not sell personal information to third parties. Data
                      is retained only as long as necessary for the purposes described.
                    </p>

                    <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                      Your Rights
                    </h3>
                    <p>
                      You have the right to access, correct, or delete your personal information.
                      To exercise these rights, contact us at privacy@devinai.com.
                    </p>
                  </div>
                </div>

                {/* Governing Law */}
                <div>
                  <h2 className="text-xl font-serif font-semibold text-white mb-4">
                    7. Governing Law
                  </h2>
                  <div className="space-y-4 text-cloud/70 leading-relaxed">
                    <p>
                      These terms shall be governed by and construed in accordance with the
                      laws of the United States of America. Any disputes arising from these
                      terms or our services shall be resolved through binding arbitration.
                    </p>
                  </div>
                </div>

                {/* Changes to Terms */}
                <div>
                  <h2 className="text-xl font-serif font-semibold text-white mb-4">
                    8. Changes to Terms
                  </h2>
                  <div className="space-y-4 text-cloud/70 leading-relaxed">
                    <p>
                      DevinAI reserves the right to modify these terms at any time. We will
                      notify users of significant changes through our website or direct
                      communication. Continued use of our services after changes constitutes
                      acceptance of the modified terms.
                    </p>
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <h2 className="text-xl font-serif font-semibold text-white mb-4">
                    9. Contact Information
                  </h2>
                  <div className="space-y-4 text-cloud/70 leading-relaxed">
                    <p>
                      For questions about these terms or our services, please contact us:
                    </p>
                    <ul className="list-none space-y-2">
                      <li>
                        <strong className="text-white">Email:</strong>{' '}
                        <a href="mailto:legal@devinai.com" className="text-boardroom hover:text-boardroom/80">
                          legal@devinai.com
                        </a>
                      </li>
                      <li>
                        <strong className="text-white">General Inquiries:</strong>{' '}
                        <a href="mailto:hello@devinai.com" className="text-boardroom hover:text-boardroom/80">
                          hello@devinai.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
