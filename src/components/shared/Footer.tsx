import Link from 'next/link';

const navigationLinks = [
  { label: 'Framework', href: '/framework' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Intelligence', href: '/blog' },
  { label: 'System Audit', href: '/system-audit' },
];

const resourceLinks = [
  { label: 'Contact', href: '/contact' },
  { label: 'Terms', href: '/terms' },
];

export function Footer() {
  return (
    <footer className="bg-midnight relative">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-boardroom to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo & Tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center space-x-2">
              <div className="w-8 h-8 bg-boardroom rounded-sm flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-serif font-bold text-white tracking-tight">
                DevinAI
              </span>
            </Link>
            <p className="mt-4 text-cloud/60 font-sans text-sm leading-relaxed max-w-xs">
              Outcome Architecture for predictable software growth. We build systems that scale without drama.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-cloud/40 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-cloud/60 hover:text-boardroom transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-cloud/40 mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-cloud/60 hover:text-boardroom transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-cloud/40 mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:hello@devinai.dev"
                  className="font-sans text-sm text-cloud/60 hover:text-boardroom transition-colors duration-200"
                >
                  hello@devinai.dev
                </a>
              </li>
              <li>
                <span className="font-mono text-sm text-cloud/40">
                  Remote-First
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-cloud/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-cloud/40">
            &copy; {new Date().getFullYear()} DevinAI. All rights reserved.
          </p>
          <p className="font-mono text-xs text-cloud/30 tracking-wider">
            Built with Outcome Architecture.
          </p>
        </div>
      </div>
    </footer>
  );
}
