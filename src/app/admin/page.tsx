'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import {
  demoDashboardStats,
  demoSystemAuditLeads,
} from '@/lib/demo-data';
import { StatsCard } from '@/components/admin/StatsCard';
import { DataTable, Column } from '@/components/admin/DataTable';
import type { SystemAuditLead } from '@/lib/types';
import {
  Users,
  UserPlus,
  FileText,
  Mail,
  ArrowRight,
  Plus,
  RefreshCw,
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
  const [stats] = useState(demoDashboardStats);
  const [recentLeads] = useState(demoSystemAuditLeads.slice(0, 5));

  const leadColumns: Column<SystemAuditLead>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (lead) => (
        <div>
          <p className="font-medium">{lead.name || 'Unknown'}</p>
          <p className="text-xs text-[#03045E]/50">{lead.email}</p>
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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#03045E]">Dashboard</h1>
          <p className="text-[#03045E]/60 mt-1">
            Welcome back. Here&apos;s your overview.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#90E0EF] rounded-lg text-[#03045E] hover:bg-[#CAF0F8] transition-colors">
          <RefreshCw className="w-4 h-4" />
          <span className="text-sm font-medium">Refresh</span>
        </button>
      </div>

      {isDemo && (
        <div className="bg-[#00B4D8]/10 border border-[#00B4D8]/30 rounded-lg p-4">
          <p className="text-[#03045E] text-sm">
            <strong>Demo Mode:</strong> Displaying sample data. Connect Supabase
            to see real data.
          </p>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          label="Total Leads"
          value={stats.totalLeads}
          icon={Users}
          trend={{ value: 12, direction: 'up' }}
        />
        <StatsCard
          label="New This Week"
          value={stats.newLeadsThisWeek}
          icon={UserPlus}
          trend={{ value: 8, direction: 'up' }}
        />
        <StatsCard
          label="Published Posts"
          value={stats.publishedPosts}
          icon={FileText}
        />
        <StatsCard
          label="Subscribers"
          value={stats.totalSubscribers}
          icon={Mail}
          trend={{ value: 15, direction: 'up' }}
        />
      </div>

      {/* Recent Leads & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[#03045E]">Recent Leads</h2>
            <Link
              href="/admin/leads"
              className="flex items-center gap-1 text-sm text-[#00B4D8] hover:text-[#03045E] transition-colors"
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
          <h2 className="text-lg font-semibold text-[#03045E] mb-4">
            Quick Actions
          </h2>
          <div className="bg-white rounded-xl border border-[#CAF0F8] p-4 space-y-3">
            <Link
              href="/admin/blog/new"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#CAF0F8]/50 transition-colors group"
            >
              <div className="w-10 h-10 bg-[#90E0EF] rounded-lg flex items-center justify-center group-hover:bg-[#00B4D8] transition-colors">
                <Plus className="w-5 h-5 text-[#03045E] group-hover:text-white" />
              </div>
              <div>
                <p className="font-medium text-[#03045E]">New Blog Post</p>
                <p className="text-xs text-[#03045E]/50">Create a new article</p>
              </div>
            </Link>

            <Link
              href="/admin/portfolio/new"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#CAF0F8]/50 transition-colors group"
            >
              <div className="w-10 h-10 bg-[#90E0EF] rounded-lg flex items-center justify-center group-hover:bg-[#00B4D8] transition-colors">
                <Plus className="w-5 h-5 text-[#03045E] group-hover:text-white" />
              </div>
              <div>
                <p className="font-medium text-[#03045E]">New Project</p>
                <p className="text-xs text-[#03045E]/50">Add portfolio case study</p>
              </div>
            </Link>

            <Link
              href="/admin/leads"
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#CAF0F8]/50 transition-colors group"
            >
              <div className="w-10 h-10 bg-[#90E0EF] rounded-lg flex items-center justify-center group-hover:bg-[#00B4D8] transition-colors">
                <Users className="w-5 h-5 text-[#03045E] group-hover:text-white" />
              </div>
              <div>
                <p className="font-medium text-[#03045E]">Review Leads</p>
                <p className="text-xs text-[#03045E]/50">
                  {stats.newLeadsThisWeek} new this week
                </p>
              </div>
            </Link>
          </div>

          {/* Conversion Rate Card */}
          <div className="mt-4 bg-[#03045E] rounded-xl p-5 text-white">
            <p className="text-xs uppercase tracking-wider text-white/60">
              Conversion Rate
            </p>
            <p className="text-3xl font-bold font-mono mt-1">
              {stats.conversionRate}%
            </p>
            <p className="text-sm text-white/60 mt-2">
              From lead to scheduled audit
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
