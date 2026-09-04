import React, { useState } from 'react';
import { 
  ShieldAlert, 
  DollarSign, 
  FileText, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  AlertTriangle, 
  ChevronRight, 
  ArrowRight,
  Send,
  Eye,
  Edit2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RfiItem } from '../../types';

export const SupervisorApprovals: React.FC = () => {
  const { 
    rfis, 
    approvals, 
    emergencySpendUsed, 
    emergencySpendLimit, 
    useEmergencySpend, 
    createRfi,
    navigate
  } = useApp();

  const [activeTab, setActiveTab] = useState<'rfis' | 'pending' | 'approved' | 'rejected'>('rfis');
  const [isSpendModalOpen, setIsSpendModalOpen] = useState(false);
  const [spendAmount, setSpendAmount] = useState('');
  const [spendReason, setSpendReason] = useState('');
  const [isNewRfiModalOpen, setIsNewRfiModalOpen] = useState(false);
  
  // New RFI form
  const [newRfiTitle, setNewRfiTitle] = useState('');
  const [newRfiDesc, setNewRfiDesc] = useState('');
  const [newRfiRecipient, setNewRfiRecipient] = useState('Anand V. (Lead Architect)');
  const [newRfiPriority, setNewRfiPriority] = useState<'High' | 'Medium' | 'Low'>('High');

  const availableSpend = emergencySpendLimit - emergencySpendUsed;

  const handleSpendSubmit = () => {
    const amt = Number(spendAmount);
    if (!amt || amt <= 0) return;
    const success = useEmergencySpend(amt, spendReason || 'Local urgent material procurement');
    if (success) {
      setIsSpendModalOpen(false);
      setSpendAmount('');
      setSpendReason('');
    } else {
      alert(`Amount exceeds authorized limit! Remaining balance: $${availableSpend}`);
    }
  };

  const handleCreateRfiSubmit = () => {
    if (!newRfiTitle.trim() || !newRfiDesc.trim()) return;
    createRfi({
      title: newRfiTitle,
      description: newRfiDesc,
      assignedTo: newRfiRecipient,
      priority: newRfiPriority,
      aiSuggestedRoute: `Route to ${newRfiRecipient} for design / spec clarification`,
      aiSuggestedNextStep: 'Verify clearance drawing before coring or pouring.',
    });
    setIsNewRfiModalOpen(false);
    setNewRfiTitle('');
    setNewRfiDesc('');
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold">
            Field Approvals & RFIs
          </span>
          <h1 className="text-lg font-bold text-neutral-100">Outgoing Requests</h1>
          <p className="text-xs text-neutral-400">
            Track supervisor RFIs, manager authorizations & local spend cap
          </p>
        </div>
        <button
          onClick={() => setIsNewRfiModalOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-3 py-1.5 text-xs transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Raise RFI</span>
        </button>
      </div>

      {/* Emergency Spend Allowance Card */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-mono uppercase text-neutral-400 font-semibold">
                Pre-Approved Emergency Spend
              </div>
              <div className="text-base font-extrabold text-neutral-100">
                ${availableSpend.toLocaleString()} <span className="text-xs font-normal text-neutral-400">/ ${emergencySpendLimit.toLocaleString()} Available</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsSpendModalOpen(true)}
            className="rounded-lg bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 text-xs font-semibold text-neutral-200 border border-neutral-700 transition-colors"
          >
            Authorize Spend
          </button>
        </div>

        {/* Balance Progress */}
        <div className="space-y-1">
          <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all"
              style={{ width: `${(emergencySpendUsed / emergencySpendLimit) * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
            <span>Used: ${emergencySpendUsed.toLocaleString()}</span>
            <span>Limit Configured by Project Manager (Vikram Malhotra)</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 rounded-xl bg-neutral-900 p-1 border border-neutral-800 text-xs">
        {[
          { id: 'rfis', label: `RFIs (${rfis.length})` },
          { id: 'pending', label: `Pending (${approvals.filter((a) => a.status === 'PENDING_APPROVAL').length})` },
          { id: 'approved', label: `Approved (${approvals.filter((a) => a.status === 'APPROVED').length})` },
          { id: 'rejected', label: `Rejected (${approvals.filter((a) => a.status === 'REJECTED').length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-1.5 text-center rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-neutral-800 text-amber-400 shadow-xs'
                : 'text-neutral-400 hover:text-neutral-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* RFI List Tab */}
      {activeTab === 'rfis' && (
        <div className="space-y-3">
          {rfis.map((rfi) => (
            <div
              key={rfi.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-4 space-y-3 text-xs"
            >
              <div className="flex items-start justify-between gap-2 border-b border-neutral-800 pb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-400">{rfi.rfiNumber}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-300">
                      Priority: {rfi.priority}
                    </span>
                  </div>
                  <h4 className="font-bold text-neutral-100 text-sm mt-1">{rfi.title}</h4>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-semibold shrink-0 ${
                    rfi.status === 'AWAITING_HUMAN_RESPONSE'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse'
                      : rfi.status === 'CLOSED'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                  }`}
                >
                  {rfi.status === 'AWAITING_HUMAN_RESPONSE' ? 'AWAITING HUMAN RESPONSE' : rfi.status}
                </span>
              </div>

              <p className="text-neutral-300 leading-relaxed text-xs">
                "{rfi.description}"
              </p>

              {/* AI Recommendation Box */}
              <div className="rounded-lg bg-neutral-950 p-2.5 border border-blue-500/30 space-y-1">
                <div className="text-[10px] font-mono text-blue-400 uppercase font-semibold">
                  AI Suggestion:
                </div>
                <div className="text-neutral-200 text-xs">
                  {rfi.aiSuggestedRoute}
                </div>
              </div>

              {/* Official Response if closed */}
              {rfi.officialResponse && (
                <div className="rounded-lg bg-emerald-950/40 p-2.5 border border-emerald-500/40 text-xs text-emerald-200">
                  <span className="font-bold block text-[10px] uppercase font-mono text-emerald-400 mb-0.5">
                    Official Engineer Sign-off:
                  </span>
                  "{rfi.officialResponse}"
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-1 border-t border-neutral-800/80">
                <span className="text-[10px] text-neutral-500 font-mono">
                  Assigned to: {rfi.assignedTo}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => alert(`RFI Details: ${rfi.rfiNumber} - ${rfi.title}`)}
                    className="rounded bg-neutral-800 hover:bg-neutral-700 px-2.5 py-1 text-[11px] font-semibold text-neutral-300"
                  >
                    View
                  </button>
                  {rfi.status === 'AWAITING_HUMAN_RESPONSE' && (
                    <button
                      onClick={() => alert('Withdraw request draft initiated.')}
                      className="rounded bg-neutral-800 hover:bg-rose-950/40 hover:text-rose-400 px-2.5 py-1 text-[11px] font-semibold text-neutral-400"
                    >
                      Withdraw
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Approvals tab filtered view */}
      {activeTab !== 'rfis' && (
        <div className="space-y-3">
          {approvals
            .filter((a) => {
              if (activeTab === 'pending') return a.status === 'PENDING_APPROVAL';
              if (activeTab === 'approved') return a.status === 'APPROVED' || a.status === 'MODIFIED_AND_APPROVED';
              if (activeTab === 'rejected') return a.status === 'REJECTED';
              return true;
            })
            .map((app) => (
              <div
                key={app.id}
                className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-4 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-neutral-100">{app.title}</span>
                  <span className="font-mono text-[10px] text-neutral-400">Impact: +${app.impactCost}</span>
                </div>
                <p className="text-neutral-300 text-[11px]">{app.aiRecommendation}</p>
                <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono pt-1">
                  <span>Status: {app.status}</span>
                  <span>Target: {app.userRoleTarget.toUpperCase()}</span>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* Emergency Spend Modal */}
      {isSpendModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-2xl bg-neutral-900 border border-neutral-700 p-5 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-emerald-400" />
              Authorize Field Emergency Spend
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Supervisor is authorized to spend up to <strong>${availableSpend}</strong> locally without prior PM sign-off.
            </p>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Amount ($):</label>
                <input
                  type="number"
                  placeholder="e.g. 150"
                  value={spendAmount}
                  onChange={(e) => setSpendAmount(e.target.value)}
                  className="w-full rounded-lg bg-neutral-950 border border-neutral-800 p-2 text-neutral-100"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Item / Reason:</label>
                <input
                  type="text"
                  placeholder="e.g. Emergency 25mm PVC fittings from local store"
                  value={spendReason}
                  onChange={(e) => setSpendReason(e.target.value)}
                  className="w-full rounded-lg bg-neutral-950 border border-neutral-800 p-2 text-neutral-100"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsSpendModalOpen(false)}
                className="px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSpendSubmit}
                disabled={!spendAmount}
                className="rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 px-4 py-1.5 text-xs font-bold text-white transition-colors"
              >
                Confirm & Log Spend
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New RFI Modal */}
      {isNewRfiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-700 p-5 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
              <FileText className="h-4 w-4 text-amber-400" />
              Raise Field RFI / Clarification
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">RFI Title:</label>
                <input
                  type="text"
                  placeholder="e.g. Beam B-14 Electrical Conduit Sleeve Clash"
                  value={newRfiTitle}
                  onChange={(e) => setNewRfiTitle(e.target.value)}
                  className="w-full rounded-lg bg-neutral-950 border border-neutral-800 p-2 text-neutral-100"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Field Description:</label>
                <textarea
                  rows={3}
                  placeholder="Describe observed clash or site discrepancy..."
                  value={newRfiDesc}
                  onChange={(e) => setNewRfiDesc(e.target.value)}
                  className="w-full rounded-lg bg-neutral-950 border border-neutral-800 p-2 text-neutral-100"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-neutral-400 block mb-1">Assignee / Discipline:</label>
                  <select
                    value={newRfiRecipient}
                    onChange={(e) => setNewRfiRecipient(e.target.value)}
                    className="w-full rounded-lg bg-neutral-950 border border-neutral-800 p-2 text-neutral-100 text-xs"
                  >
                    <option value="Anand V. (Lead Architect)">Lead Architect</option>
                    <option value="Er. Rajesh Chandran (Structural)">Structural Engineer</option>
                    <option value="Sterling MEP Consultant">MEP Consultant</option>
                  </select>
                </div>
                <div>
                  <label className="text-neutral-400 block mb-1">Priority:</label>
                  <select
                    value={newRfiPriority}
                    onChange={(e) => setNewRfiPriority(e.target.value as any)}
                    className="w-full rounded-lg bg-neutral-950 border border-neutral-800 p-2 text-neutral-100 text-xs"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsNewRfiModalOpen(false)}
                className="px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRfiSubmit}
                disabled={!newRfiTitle || !newRfiDesc}
                className="rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 px-4 py-1.5 text-xs font-bold text-neutral-950 transition-colors"
              >
                Draft RFI with AI Triage
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
