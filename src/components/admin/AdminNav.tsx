'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  Mail,
  LogOut,
  Settings,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/blog', label: 'Blog', icon: FileText },
  { href: '/admin/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Mail },
];

export function AdminNav() {
  const pathname = usePathname();
  const { profile, signOut, isDemo } = useAuth();

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="w-64 min-h-screen bg-[#03045E] text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/admin" className="block">
          <h1 className="text-xl font-bold tracking-tight">DevinAI</h1>
          <p className="text-[#90E0EF] text-xs mt-0.5">Admin Dashboard</p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    active
                      ? 'bg-[#00B4D8] text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Settings link */}
      <div className="px-3 pb-2">
        <Link
          href="/admin/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium text-sm">Settings</span>
        </Link>
      </div>

      {/* User info */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#00B4D8] rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">
              {profile?.full_name?.charAt(0) || profile?.email?.charAt(0) || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {profile?.full_name || 'Admin'}
            </p>
            <p className="text-xs text-white/60 truncate">{profile?.email}</p>
            {isDemo && (
              <span className="inline-block text-xs text-[#90E0EF] mt-0.5">
                Demo Mode
              </span>
            )}
          </div>
        </div>

        <button
          onClick={signOut}
          className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2
            bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-sm"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
