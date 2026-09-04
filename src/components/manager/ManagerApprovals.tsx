import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  Clock, 
  Filter, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight, 
  History,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ApprovalGate } from '../common/ApprovalGate';
import { ApprovalStatus } from '../../types';

export const ManagerApprovals: React.FC = () => {
  const { approvals } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredApprovals = approvals.filter((item) => {
    if (selectedFilter === 'pending' && item.status !== 'PENDING_APPROVAL') return false;
    if (selectedFilter === 'approved' && item.status !== 'APPROVED' && item.status !== 'MODIFIED_AND_APPROVED') return false;
    if (selectedFilter === 'rejected' && item.status !== 'REJECTED') return false;
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    return true;
  });

  const pendingCount = approvals.filter((a) => a.status === 'PENDING_APPROVAL').length;
  const approvedCount = approvals.filter((a) => a.status === 'APPROVED' || a.status === 'MODIFIED_AND_APPROVED').length;
  const rejectedCount = approvals.filter((a) => a.status === 'REJECTED').length;

  return (
    <div className="space-y-4">
      {/* Top Header & Core Principle Callout */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-amber-800 font-bold">
            Human-in-the-Loop Authorization
          </span>
          <h1 className="text-lg sm:text-xl font-extrabold text-stone-900">
            Unified Approvals Queue
          </h1>
          <p className="text-xs text-stone-600">
            Mandatory gatekeeper for all schedule shifts, purchase orders, workarounds & contract changes
          </p>
        </div>

        {/* Status Pill Counts */}
        <div className="flex items-center gap-2 text-xs">
          <span className="rounded-xl bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 font-mono font-bold">
            {pendingCount} Pending Action
          </span>
          <span className="rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1 font-mono font-bold">
            {approvedCount} Authorized
          </span>
        </div>
      </div>

      {/* Principle Reminder Banner */}
      <div className="rounded-2xl bg-white border border-stone-200 p-4 text-xs text-stone-700 flex items-start gap-3 shadow-xs">
        <div className="p-2 rounded-xl bg-amber-100 text-amber-900 shrink-0 border border-amber-300">
          <ShieldAlert className="h-5 w-5" />
        </div>
        <div className="space-y-1">
          <span className="font-bold text-stone-900 block">
            ConstructionOS Security & Governance Invariant:
          </span>
          <p className="text-stone-600 text-xs leading-relaxed">
            AI agents continuously observe, correlate site events, analyze consequences, and draft recommendations. No changes take effect on site, in budget, or with subcontractors until you click <strong>Approve</strong> or <strong>Edit & Approve</strong> below.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1 rounded-xl bg-stone-100 p-1 border border-stone-200 text-xs">
          <button
            onClick={() => setSelectedFilter('pending')}
            className={`rounded-lg px-3 py-1.5 font-semibold transition-colors ${
              selectedFilter === 'pending'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setSelectedFilter('approved')}
            className={`rounded-lg px-3 py-1.5 font-semibold transition-colors ${
              selectedFilter === 'approved'
                ? 'bg-white text-stone-900 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Approved ({approvedCount})
          </button>
          <button
            onClick={() => setSelectedFilter('rejected')}
            className={`rounded-lg px-3 py-1.5 font-semibold transition-colors ${
              selectedFilter === 'rejected'
                ? 'bg-white text-rose-800 shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Rejected ({rejectedCount})
          </button>
          <button
            onClick={() => setSelectedFilter('all')}
            className={`rounded-lg px-3 py-1.5 font-semibold transition-colors ${
              selectedFilter === 'all'
                ? 'bg-stone-900 text-white shadow-xs font-bold'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All ({approvals.length})
          </button>
        </div>

        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="rounded-xl bg-white border border-stone-200 px-3 py-1.5 text-xs text-stone-800 focus:outline-none shadow-xs font-medium"
        >
          <option value="all">All Categories</option>
          <option value="schedule_change">Schedule Changes</option>
          <option value="material_order">Material Orders</option>
          <option value="rfi_response">RFI Responses</option>
          <option value="site_workaround">Site Workarounds</option>
          <option value="budget_overrun">Budget Adjustments</option>
        </select>
      </div>

      {/* Approval Items Feed */}
      <div className="space-y-4">
        {filteredApprovals.length === 0 ? (
          <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center space-y-2 shadow-xs">
            <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-stone-800 text-sm">Queue is Clear</h4>
            <p className="text-xs text-stone-500">
              No approval requests matching the current filter state.
            </p>
          </div>
        ) : (
          filteredApprovals.map((item) => (
            <ApprovalGate key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
};
