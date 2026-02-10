'use client';

import { useState } from 'react';
import { X, Plus, Calendar, Building2, User, Mail, Briefcase } from 'lucide-react';
import type { SystemAuditLead, LeadNote } from '@/lib/types';

interface LeadDetailModalProps {
  lead: SystemAuditLead;
  isOpen: boolean;
  onClose: () => void;
  onUpdateStatus: (leadId: string, status: SystemAuditLead['status']) => void;
  onAddNote: (leadId: string, note: Omit<LeadNote, 'id' | 'created_at'>) => void;
}

const statusOptions: { value: SystemAuditLead['status']; label: string; color: string }[] = [
  { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-700' },
  { value: 'contacted', label: 'Contacted', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'scheduled', label: 'Scheduled', color: 'bg-purple-100 text-purple-700' },
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-700' },
  { value: 'closed', label: 'Closed', color: 'bg-gray-100 text-gray-700' },
];

export function LeadDetailModal({
  lead,
  isOpen,
  onClose,
  onUpdateStatus,
  onAddNote,
}: LeadDetailModalProps) {
  const [newNote, setNewNote] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);

  if (!isOpen) return null;

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    onAddNote(lead.id, {
      content: newNote,
      author: 'Admin', // In real app, use actual user name
    });

    setNewNote('');
    setIsAddingNote(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const currentStatus = statusOptions.find((s) => s.value === lead.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#03045E]/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#CAF0F8]">
          <div>
            <h2 className="text-xl font-bold text-[#03045E]">{lead.name || 'Unknown'}</h2>
            <p className="text-[#03045E]/60 text-sm">{lead.company || 'No company'}</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg bg-[#CAF0F8] flex items-center justify-center
              hover:bg-[#90E0EF] transition-colors"
          >
            <X className="w-5 h-5 text-[#03045E]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Status */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-[#03045E]/70 mb-2">
              Status
            </label>
            <select
              value={lead.status}
              onChange={(e) =>
                onUpdateStatus(lead.id, e.target.value as SystemAuditLead['status'])
              }
              className={`px-4 py-2 rounded-lg border-2 border-transparent font-medium text-sm ${currentStatus?.color}`}
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-3 bg-[#CAF0F8]/30 rounded-lg">
              <Mail className="w-5 h-5 text-[#00B4D8]" />
              <div>
                <p className="text-xs text-[#03045E]/50">Email</p>
                <p className="text-sm font-medium text-[#03045E]">{lead.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#CAF0F8]/30 rounded-lg">
              <User className="w-5 h-5 text-[#00B4D8]" />
              <div>
                <p className="text-xs text-[#03045E]/50">Role</p>
                <p className="text-sm font-medium text-[#03045E]">{lead.role || '-'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#CAF0F8]/30 rounded-lg">
              <Building2 className="w-5 h-5 text-[#00B4D8]" />
              <div>
                <p className="text-xs text-[#03045E]/50">Team Size</p>
                <p className="text-sm font-medium text-[#03045E]">{lead.team_size || '-'}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-[#CAF0F8]/30 rounded-lg">
              <Briefcase className="w-5 h-5 text-[#00B4D8]" />
              <div>
                <p className="text-xs text-[#03045E]/50">Budget Range</p>
                <p className="text-sm font-medium text-[#03045E]">{lead.budget_range || '-'}</p>
              </div>
            </div>
          </div>

          {/* Challenge */}
          {lead.current_challenge && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#03045E] mb-2">Current Challenge</h3>
              <p className="text-[#03045E]/70 text-sm bg-[#CAF0F8]/30 p-4 rounded-lg">
                {lead.current_challenge}
              </p>
            </div>
          )}

          {/* Tech Stack */}
          {lead.tech_stack.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#03045E] mb-2">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {lead.tech_stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-[#90E0EF]/30 text-[#03045E] text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Desired Outcomes */}
          {lead.desired_outcomes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[#03045E] mb-2">Desired Outcomes</h3>
              <ul className="space-y-1">
                {lead.desired_outcomes.map((outcome, idx) => (
                  <li key={idx} className="text-sm text-[#03045E]/70 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#00B4D8] rounded-full" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Timeline & Source */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-semibold text-[#03045E] mb-1">Timeline</h3>
              <p className="text-sm text-[#03045E]/70">{lead.timeline || 'Not specified'}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#03045E] mb-1">Source</h3>
              <p className="text-sm text-[#03045E]/70 capitalize">{lead.source || 'Unknown'}</p>
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-[#03045E]">Notes</h3>
              {!isAddingNote && (
                <button
                  onClick={() => setIsAddingNote(true)}
                  className="flex items-center gap-1 text-sm text-[#00B4D8] hover:text-[#03045E] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Note
                </button>
              )}
            </div>

            {/* Add note form */}
            {isAddingNote && (
              <div className="mb-4 p-4 bg-[#CAF0F8]/30 rounded-lg">
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add a note..."
                  rows={3}
                  className="w-full p-3 border border-[#90E0EF] rounded-lg resize-none
                    focus:outline-none focus:ring-2 focus:ring-[#00B4D8] text-sm text-[#03045E]"
                />
                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={() => {
                      setNewNote('');
                      setIsAddingNote(false);
                    }}
                    className="px-4 py-2 text-sm text-[#03045E]/70 hover:text-[#03045E]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddNote}
                    disabled={!newNote.trim()}
                    className="px-4 py-2 bg-[#03045E] text-white text-sm rounded-lg
                      hover:bg-[#03045E]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            )}

            {/* Notes list */}
            <div className="space-y-3">
              {lead.notes.length === 0 ? (
                <p className="text-sm text-[#03045E]/50 italic">No notes yet</p>
              ) : (
                lead.notes.map((note) => (
                  <div
                    key={note.id}
                    className="p-4 bg-[#CAF0F8]/30 rounded-lg"
                  >
                    <p className="text-sm text-[#03045E]">{note.content}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-[#03045E]/50">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(note.created_at)}</span>
                      <span className="text-[#03045E]/30">|</span>
                      <span>{note.author}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="mt-6 pt-4 border-t border-[#CAF0F8] flex items-center justify-between text-xs text-[#03045E]/50">
            <span>Created: {formatDate(lead.created_at)}</span>
            <span>Updated: {formatDate(lead.updated_at)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
