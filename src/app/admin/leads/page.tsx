'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/lib/auth-context';
import { demoSystemAuditLeads } from '@/lib/demo-data';
import { DataTable, Column } from '@/components/admin/DataTable';
import { LeadDetailModal } from '@/components/admin/LeadDetailModal';
import type { SystemAuditLead, LeadNote } from '@/lib/types';
import { Search, Filter, Download, RefreshCw } from 'lucide-react';

const statusOptions: { value: SystemAuditLead['status'] | 'all'; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'scheduled', label: 'Scheduled' },
  { value: 'completed', label: 'Completed' },
  { value: 'closed', label: 'Closed' },
];

const statusColors: Record<SystemAuditLead['status'], string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  scheduled: 'bg-purple-100 text-purple-700',
  completed: 'bg-green-100 text-green-700',
  closed: 'bg-gray-100 text-gray-700',
};

export default function AdminLeadsPage() {
  const { isDemo } = useAuth();
  const [leads, setLeads] = useState<SystemAuditLead[]>(demoSystemAuditLeads);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<SystemAuditLead['status'] | 'all'>('all');
  const [selectedLead, setSelectedLead] = useState<SystemAuditLead | null>(null);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleUpdateStatus = useCallback(
    (leadId: string, status: SystemAuditLead['status']) => {
      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === leadId
            ? { ...lead, status, updated_at: new Date().toISOString() }
            : lead
        )
      );
      // Update the selected lead if it's the one being modified
      setSelectedLead((prev) =>
        prev?.id === leadId
          ? { ...prev, status, updated_at: new Date().toISOString() }
          : prev
      );
    },
    []
  );

  const handleAddNote = useCallback(
    (leadId: string, note: Omit<LeadNote, 'id' | 'created_at'>) => {
      const newNote: LeadNote = {
        ...note,
        id: `note-${Date.now()}`,
        created_at: new Date().toISOString(),
      };

      setLeads((prevLeads) =>
        prevLeads.map((lead) =>
          lead.id === leadId
            ? {
                ...lead,
                notes: [newNote, ...lead.notes],
                updated_at: new Date().toISOString(),
              }
            : lead
        )
      );
      // Update the selected lead if it's the one being modified
      setSelectedLead((prev) =>
        prev?.id === leadId
          ? {
              ...prev,
              notes: [newNote, ...prev.notes],
              updated_at: new Date().toISOString(),
            }
          : prev
      );
    },
    []
  );

  const columns: Column<SystemAuditLead>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      render: (lead) => (
        <div>
          <p className="font-medium text-[#03045E]">{lead.name || 'Unknown'}</p>
          <p className="text-xs text-[#03045E]/50">{lead.email}</p>
        </div>
      ),
    },
    {
      key: 'company',
      label: 'Company',
      sortable: true,
      render: (lead) => (
        <div>
          <p className="text-[#03045E]">{lead.company || '-'}</p>
          <p className="text-xs text-[#03045E]/50">{lead.role || ''}</p>
        </div>
      ),
    },
    {
      key: 'budget_range',
      label: 'Budget',
      render: (lead) => (
        <span className="text-sm text-[#03045E]/70">{lead.budget_range || '-'}</span>
      ),
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
      key: 'source',
      label: 'Source',
      render: (lead) => (
        <span className="text-sm text-[#03045E]/70 capitalize">{lead.source || '-'}</span>
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (lead) => (
        <span className="text-sm text-[#03045E]/70">
          {new Date(lead.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </span>
      ),
    },
  ];

  const statusCounts = {
    new: leads.filter((l) => l.status === 'new').length,
    contacted: leads.filter((l) => l.status === 'contacted').length,
    scheduled: leads.filter((l) => l.status === 'scheduled').length,
    completed: leads.filter((l) => l.status === 'completed').length,
    closed: leads.filter((l) => l.status === 'closed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#03045E]">System Audit Leads</h1>
          <p className="text-[#03045E]/60 mt-1">
            Manage inquiries from the System Audit form
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-[#90E0EF] rounded-lg text-[#03045E] hover:bg-[#CAF0F8] transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#90E0EF] rounded-lg text-[#03045E] hover:bg-[#CAF0F8] transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm font-medium">Refresh</span>
          </button>
        </div>
      </div>

      {isDemo && (
        <div className="bg-[#00B4D8]/10 border border-[#00B4D8]/30 rounded-lg p-4">
          <p className="text-[#03045E] text-sm">
            <strong>Demo Mode:</strong> Changes will not persist. Connect Supabase
            for full functionality.
          </p>
        </div>
      )}

      {/* Status Pills */}
      <div className="flex items-center gap-3 flex-wrap">
        {Object.entries(statusCounts).map(([status, count]) => (
          <button
            key={status}
            onClick={() =>
              setFilterStatus(
                filterStatus === status ? 'all' : (status as SystemAuditLead['status'])
              )
            }
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              filterStatus === status
                ? statusColors[status as SystemAuditLead['status']]
                : 'bg-white border border-[#CAF0F8] text-[#03045E]/60 hover:border-[#90E0EF]'
            }`}
          >
            <span className="capitalize">{status}</span>
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                filterStatus === status
                  ? 'bg-white/50'
                  : 'bg-[#CAF0F8]'
              }`}
            >
              {count}
            </span>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#03045E]/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads..."
            className="w-full pl-10 pr-4 py-2 border border-[#90E0EF] rounded-lg
              focus:outline-none focus:ring-2 focus:ring-[#00B4D8] text-sm text-[#03045E]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-[#03045E]/40" />
          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value as SystemAuditLead['status'] | 'all')
            }
            className="px-3 py-2 border border-[#90E0EF] rounded-lg text-sm text-[#03045E]
              focus:outline-none focus:ring-2 focus:ring-[#00B4D8]"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-6 text-sm">
        <span className="text-[#03045E]/60">
          <strong className="text-[#03045E]">{leads.length}</strong> total leads
        </span>
        <span className="text-[#03045E]/60">
          <strong className="text-blue-600">{statusCounts.new}</strong> new
        </span>
        <span className="text-[#03045E]/60">
          <strong className="text-purple-600">{statusCounts.scheduled}</strong>{' '}
          scheduled
        </span>
        <span className="text-[#03045E]/60">
          <strong className="text-green-600">{statusCounts.completed}</strong>{' '}
          completed
        </span>
      </div>

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredLeads}
        keyExtractor={(lead) => lead.id}
        onRowClick={(lead) => setSelectedLead(lead)}
        emptyMessage="No leads found"
      />

      {/* Tip */}
      <div className="bg-[#CAF0F8]/50 rounded-lg p-4">
        <p className="text-sm text-[#03045E]/70">
          <strong className="text-[#03045E]">Tip:</strong> Click on a lead row to
          view full details, add notes, and update status.
        </p>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          isOpen={true}
          onClose={() => setSelectedLead(null)}
          onUpdateStatus={handleUpdateStatus}
          onAddNote={handleAddNote}
        />
      )}
    </div>
  );
}
