'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { AdminNav } from '@/components/admin/AdminNav';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Check if we're on the login page
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Don't redirect if on login page
    if (isLoginPage) return;

    // If not loading and no user or not admin, redirect to login
    if (!loading && (!user || !isAdmin)) {
      router.push('/admin/login');
    }
  }, [user, loading, isAdmin, router, isLoginPage]);

  // Show loading state (but not on login page)
  if (loading && !isLoginPage) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-terracotta" />
      </div>
    );
  }

  // Login page renders without the admin sidebar
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Not authenticated or not admin - show appropriate message
  if (!user) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-terracotta" />
      </div>
    );
  }

  // User exists but not admin - show access denied
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-4">
        <p className="text-gray-600">You do not have admin access.</p>
        <p className="text-sm text-gray-500">
          Please set <code className="bg-sand px-1.5 py-0.5 rounded">role = &apos;admin&apos;</code> in your Supabase profiles table.
        </p>
      </div>
    );
  }

  // Authenticated - render full admin layout
  return (
    <div className="min-h-screen bg-cream flex">
      <AdminNav />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
