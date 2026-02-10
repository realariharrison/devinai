'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { AdminNav } from '@/components/admin/AdminNav';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin, isDemo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // In demo mode, allow access
    if (isDemo) return;

    // If not loading and no user or not admin, redirect to login
    if (!loading && (!user || !isAdmin)) {
      router.push('/admin/login');
    }
  }, [user, loading, isAdmin, isDemo, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#CAF0F8] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#03045E]" />
      </div>
    );
  }

  // In non-demo mode, don't render if not authenticated as admin
  if (!isDemo && (!user || !isAdmin)) {
    return (
      <div className="min-h-screen bg-[#CAF0F8] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#03045E]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#CAF0F8] flex">
      <AdminNav />
      <main className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
