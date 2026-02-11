import Link from 'next/link';

const navigationLinks = [
  { label: 'Services', href: '/framework' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

const resourceLinks = [
  { label: 'System Audit', href: '/system-audit' },
  { label: 'Contact', href: '/contact' },
  { label: 'Terms', href: '/terms' },
  { label: 'Admin', href: '/admin' },
];

export function Footer() {
  return (
    <footer className="bg-white border-t border-sand">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Logo & Tagline */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center space-x-2">
              <div className="w-8 h-8 bg-terracotta rounded-lg flex items-center justify-center">
                <span className="text-white font-serif font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-serif font-bold text-gray-900 tracking-tight">
                DevinAI
              </span>
            </Link>
            <p className="mt-4 text-gray-600 font-sans text-sm leading-relaxed max-w-xs">
              Outcome Architecture for predictable software growth. We build systems that scale without drama.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {navigationLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-gray-600 hover:text-terracotta transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-sans text-sm text-gray-600 hover:text-terracotta transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-4">
              Contact
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href="mailto:hello@devinai.com"
                  className="font-sans text-sm text-gray-600 hover:text-terracotta transition-colors duration-200"
                >
                  hello@devinai.com
                </a>
              </li>
              <li>
                <span className="font-mono text-sm text-gray-400">
                  Remote-First
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-6 border-t border-sand flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-gray-400">
            &copy; {new Date().getFullYear()} DevinAI. All rights reserved.
          </p>
          <p className="font-mono text-xs text-gray-400 tracking-wider">
            Built with Outcome Architecture.
          </p>
        </div>
      </div>
    </footer>
  );
}
