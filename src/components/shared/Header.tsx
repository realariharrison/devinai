'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Blog', href: '/blog' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-white/95 shadow-warm-sm' : 'py-5 bg-cream/80'
      }`}
      style={{
        backdropFilter: 'blur(20px)',
        borderBottom: scrolled ? '1px solid var(--color-sand)' : '1px solid transparent',
      }}
    >
      <nav className="container-wide flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-serif font-bold text-terracotta transition-colors duration-200">
            DevinAI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(item.href)
                  ? 'text-terracotta'
                  : 'text-gray-600 hover:text-terracotta'
              }`}
            >
              {item.name}
              {isActive(item.href) && (
                <span className="block h-0.5 mt-1 rounded-full bg-terracotta" />
              )}
            </Link>
          ))}
        </div>

        {/* CTA Button - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {/* <Link
            href="/admin/login"
            className="text-sm text-gray-500 hover:text-terracotta transition-colors duration-200"
          >
            Admin
          </Link> */}
          <Link href="/system-audit" className="btn-primary text-sm">
            Request Audit
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
            mobileMenuOpen ? 'bg-sand' : ''
          }`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container-wide py-4 space-y-1 bg-white border-t border-sand">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                isActive(item.href)
                  ? 'text-terracotta bg-cream'
                  : 'text-gray-600 hover:bg-cream'
              }`}
            >
              {item.name}
            </Link>
          ))}

          {/* Admin Link - Mobile */}
          {/* <Link
            href="/admin/login"
            className="block px-4 py-3 rounded-lg text-base font-medium text-gray-500 hover:bg-cream transition-colors duration-200"
          >
            Admin
          </Link> */}

          {/* Mobile CTA */}
          <div className="pt-4 px-4">
            <Link href="/system-audit" className="btn-primary w-full text-center">
              Request Audit
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
