'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { supabase, isDemoMode } from '@/lib/supabase';
import {
  demoDashboardStats,
  demoSystemAuditLeads,
} from '@/lib/demo-data';
import { StatsCard } from '@/components/admin/StatsCard';
import { DataTable, Column } from '@/components/admin/DataTable';
import type { SystemAuditLead, DashboardStats } from '@/lib/types';
import {
  Users,
  UserPlus,
  FileText,
  Mail,
  Briefcase,
  ArrowRight,
  Plus,
  RefreshCw,
  Loader2,
} from 'lucide-react';

const statusColors: Record<SystemAuditLead['status'], string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  scheduled: 'bg-purple-100 text-purple-700',
  completed: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-700',
};

export default function AdminDashboardPage() {
  const { isDemo } = useAuth();
  const [stats, setStats] = useState<DashboardStats>(demoDashboardStats);
  const [recentLeads, setRecentLeads] = useState<SystemAuditLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    if (isDemoMode()) {
      setStats(demoDashboardStats);
      setRecentLeads(demoSystemAuditLeads.slice(0, 5));
      setLoading(false);
      return;
    }

    // Add timeout to prevent infinite loading
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Query timeout')), 10000)
    );

    try {
      // Fetch all counts in parallel with timeout
      const [
        leadsResult,
        postsResult,
        subscribersResult,
        projectsResult,
      ] = await Promise.race([
        Promise.all([
          supabase.from('system_audit_leads').select('id, status, created_at'),
          supabase.from('blog_posts').select('id, published'),
          supabase.from('newsletter_subscribers').select('id, active'),
          supabase.from('portfolio_projects').select('id, published'),
        ]),
        timeoutPromise,
      ]);

      // Calculate stats
      const leads = leadsResult.data || [];
      const posts = postsResult.data || [];
      const subscribers = subscribersResult.data || [];
      const projects = projectsResult.data || [];

      // Calculate new leads this week
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const newLeadsThisWeek = leads.filter(
        (lead) => new Date(lead.created_at) >= oneWeekAgo
      ).length;

      // Calculate conversion rate (leads that reached 'scheduled' or beyond)
      const convertedStatuses = ['scheduled', 'completed'];
      const convertedLeads = leads.filter((lead) =>
        convertedStatuses.includes(lead.status)
      ).length;
      const conversionRate = leads.length > 0
        ? Math.round((convertedLeads / leads.length) * 100 * 10) / 10
        : 0;

      setStats({
        totalLeads: leads.length,
        newLeadsThisWeek,
        publishedPosts: posts.filter((p) => p.published).length,
        totalSubscribers: subscribers.filter((s) => s.active).length,
        publishedProjects: projects.filter((p) => p.published).length,
        conversionRate,
      });

      // Fetch recent leads with full data
      const { data: recentLeadsData } = await supabase
        .from('system_audit_leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      setRecentLeads(recentLeadsData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback to demo data
      setStats(demoDashboardStats);
      setRecentLeads(demoSystemAuditLeads.slice(0, 5));
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setLoading(true);
    fetchDashboardData();
  };

  const leadColumns: Column<SystemAuditLead>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (lead) => (
        <div>
          <p className="font-medium text-gray-900">{lead.name || 'Unknown'}</p>
          <p className="text-xs text-gray-500">{lead.email}</p>
        </div>
      ),
    },
    {
      key: 'company',
      label: 'Company',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      render: (lead) => (
        <span
          className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${
            statusColors[lead.status]
          }`}
        >
          {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (lead) =>
        new Date(lead.created_at).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-terracotta" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back. Here&apos;s your overview.
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-sand rounded-lg text-gray-700 hover:bg-cream transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span className="text-sm font-medium">Refresh</span>
        </button>
      </div>

      {isDemo && (
        <div className="bg-terracotta/10 border border-terracotta/30 rounded-lg p-4">
          <p className="text-gray-900 text-sm">
            <strong>Demo Mode:</strong> Displaying sample data. Connect Supabase
            to see real metrics.
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatsCard
          label="Total Leads"
          value={stats.totalLeads}
          icon={Users}
        />
        <StatsCard
          label="New This Week"
          value={stats.newLeadsThisWeek}
          icon={UserPlus}
        />
        <StatsCard
          label="Published Posts"
          value={stats.publishedPosts}
          icon={FileText}
        />
        <StatsCard
          label="Portfolio Projects"
          value={stats.publishedProjects}
          icon={Briefcase}
        />
        <StatsCard
          label="Subscribers"
          value={stats.totalSubscribers}
          icon={Mail}
        />
      </div>

      {/* Recent Leads & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Leads</h2>
            <Link
              href="/admin/leads"
              className="flex items-center gap-1 text-sm text-terracotta hover:text-terracotta/80 transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <DataTable
            columns={leadColumns}
            data={recentLeads}
            keyExtractor={(lead) => lead.id}
            onRowClick={() => {}}
            emptyMessage="No leads yet"
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="bg-white rounded-xl border border-sand p-4 space-y-3">
            <Link
              href="/admin/blog/new"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-cream transition-colors group"
            >
              <div className="w-10 h-10 bg-sand rounded-lg flex items-center justify-center group-hover:bg-terracotta transition-colors">
                <Plus className="w-5 h-5 text-gray-700 group-hover:text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">New Blog Post</p>
                <p className="text-xs text-gray-500">Create a new article</p>
              </div>
            </Link>

            <Link
              href="/admin/portfolio/new"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-cream transition-colors group"
            >
              <div className="w-10 h-10 bg-sand rounded-lg flex items-center justify-center group-hover:bg-terracotta transition-colors">
                <Plus className="w-5 h-5 text-gray-700 group-hover:text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">New Project</p>
                <p className="text-xs text-gray-500">Add portfolio case study</p>
              </div>
            </Link>

            <Link
              href="/admin/leads"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-cream transition-colors group"
            >
              <div className="w-10 h-10 bg-sand rounded-lg flex items-center justify-center group-hover:bg-terracotta transition-colors">
                <Users className="w-5 h-5 text-gray-700 group-hover:text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Review Leads</p>
                <p className="text-xs text-gray-500">
                  {stats.newLeadsThisWeek} new this week
                </p>
              </div>
            </Link>
          </div>

          {/* Conversion Rate Card */}
          <div className="mt-4 bg-terracotta rounded-xl p-5 text-white">
            <p className="text-xs uppercase tracking-wider text-white/60">
              Conversion Rate
            </p>
            <p className="text-3xl font-bold font-mono mt-1">
              {stats.conversionRate}%
            </p>
            <p className="text-sm text-white/60 mt-2">
              Leads → Scheduled Audits
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
