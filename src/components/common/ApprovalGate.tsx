import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  AlertTriangle, 
  DollarSign, 
  Clock, 
  FileText, 
  Bot,
  UserCheck
} from 'lucide-react';
import { ApprovalItem } from '../../types';
import { useApp } from '../../context/AppContext';

interface ApprovalGateProps {
  item: ApprovalItem;
  onApproveSuccess?: () => void;
  compact?: boolean;
}

export const ApprovalGate: React.FC<ApprovalGateProps> = ({ item, onApproveSuccess, compact = false }) => {
  const { approveItem, rejectItem, modifyAndApproveItem } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  
  // Edit form state
  const [editedText, setEditedText] = useState(item.aiRecommendation);
  const [editedCost, setEditedCost] = useState(item.impactCost);
  const [editedDays, setEditedDays] = useState(item.impactScheduleDays);

  const isPending = item.status === 'PENDING_APPROVAL';

  const handleApprove = () => {
    approveItem(item.id);
    if (onApproveSuccess) onApproveSuccess();
  };

  const handleSaveEdit = () => {
    modifyAndApproveItem(item.id, editedText, editedCost, editedDays);
    setIsEditing(false);
    if (onApproveSuccess) onApproveSuccess();
  };

  const handleConfirmReject = () => {
    if (!rejectReason.trim()) return;
    rejectItem(item.id, rejectReason);
    setIsRejecting(false);
  };

  return (
    <div className={`rounded-2xl border ${
      isPending 
        ? 'border-amber-300 bg-amber-50/40 shadow-sm' 
        : item.status === 'APPROVED' || item.status === 'MODIFIED_AND_APPROVED'
        ? 'border-emerald-200 bg-emerald-50/30'
        : 'border-rose-200 bg-rose-50/30'
    } p-4 transition-all bg-white`}>
      {/* Top Banner */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-900 border border-amber-300">
            <ShieldAlert className="h-4 w-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-amber-900">
                Human Approval Gate
              </span>
              <span className="rounded px-1.5 py-0.5 text-[10px] font-mono font-medium bg-stone-100 text-stone-700 border border-stone-200">
                {item.id}
              </span>
            </div>
            <h4 className="text-sm font-bold text-stone-900">{item.title}</h4>
          </div>
        </div>

        {/* Current Status Badge */}
        <div>
          {item.status === 'PENDING_APPROVAL' && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 border border-amber-300 animate-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-600"></span>
              Awaiting Human Approval
            </span>
          )}
          {item.status === 'APPROVED' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
              Approved by Human
            </span>
          )}
          {item.status === 'MODIFIED_AND_APPROVED' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-800 border border-stone-300">
              <UserCheck className="h-3.5 w-3.5 text-stone-700" />
              Modified & Approved
            </span>
          )}
          {item.status === 'REJECTED' && (
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-800 border border-rose-300">
              <XCircle className="h-3.5 w-3.5 text-rose-700" />
              Rejected by Human
            </span>
          )}
        </div>
      </div>

      {/* AI Recommendation Content */}
      <div className="space-y-3">
        {!isEditing ? (
          <div className="rounded-xl bg-[#faf8f5] p-3.5 border border-stone-200">
            <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase text-stone-600 mb-1 font-semibold">
              <Bot className="h-3.5 w-3.5 text-stone-700" />
              <span>AI Recommendation (Grounded Draft)</span>
            </div>
            <p className="text-sm text-stone-800 leading-relaxed font-normal">
              {item.aiRecommendation}
            </p>
          </div>
        ) : (
          <div className="rounded-xl bg-[#faf8f5] p-3 border border-stone-300 space-y-3">
            <div className="flex items-center justify-between text-xs text-stone-800 font-bold">
              <span>Edit Human Override Parameters</span>
              <button 
                onClick={() => setIsEditing(false)} 
                className="text-stone-500 hover:text-stone-800 text-[11px]"
              >
                Cancel
              </button>
            </div>
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              rows={3}
              className="w-full rounded-lg bg-white border border-stone-300 p-2 text-sm text-stone-900 focus:border-stone-500 focus:outline-none"
            />
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-stone-600 mb-1 block font-medium">Cost Impact ($):</label>
                <input
                  type="number"
                  value={editedCost}
                  onChange={(e) => setEditedCost(Number(e.target.value))}
                  className="w-full rounded bg-white border border-stone-300 p-1.5 text-stone-900"
                />
              </div>
              <div>
                <label className="text-stone-600 mb-1 block font-medium">Schedule Delay (Days):</label>
                <input
                  type="number"
                  step="0.5"
                  value={editedDays}
                  onChange={(e) => setEditedDays(Number(e.target.value))}
                  className="w-full rounded bg-white border border-stone-300 p-1.5 text-stone-900"
                />
              </div>
            </div>
            <button
              onClick={handleSaveEdit}
              className="w-full rounded-lg bg-stone-900 hover:bg-stone-800 py-2 text-xs font-semibold text-white transition-colors shadow-xs"
            >
              Confirm & Authorize Modified Decision
            </button>
          </div>
        )}

        {/* Impact Badges */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2 rounded-xl bg-[#faf8f5] p-2.5 border border-stone-200">
            <DollarSign className="h-4 w-4 text-amber-700 shrink-0" />
            <div>
              <span className="text-[10px] text-stone-500 block font-mono">Estimated Cost</span>
              <span className="font-bold text-stone-900">
                +${item.impactCost.toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-[#faf8f5] p-2.5 border border-stone-200">
            <Clock className="h-4 w-4 text-stone-700 shrink-0" />
            <div>
              <span className="text-[10px] text-stone-500 block font-mono">Schedule Impact</span>
              <span className="font-bold text-stone-900">
                +{item.impactScheduleDays} {item.impactScheduleDays === 1 ? 'day' : 'days'}
              </span>
            </div>
          </div>
        </div>

        {/* Evidence List */}
        {!compact && item.evidence && item.evidence.length > 0 && (
          <div className="rounded-xl bg-[#faf8f5] p-3 border border-stone-200">
            <span className="text-[10px] font-mono uppercase text-stone-600 block mb-1.5 font-semibold">
              Supporting Evidence & Telemetry
            </span>
            <ul className="space-y-1 text-xs text-stone-700">
              {item.evidence.map((ev, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-amber-700 text-[10px] mt-0.5">•</span>
                  <span>{ev}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Draft Preview if available */}
        {item.actionDraft && !compact && (
          <div className="rounded-xl bg-[#faf8f5] p-3 border border-stone-200 text-xs">
            <div className="flex items-center justify-between text-[10px] text-stone-500 mb-1">
              <span className="font-mono uppercase font-semibold">Drafted Document: {item.actionDraft.type}</span>
              <span>To: {item.actionDraft.recipient}</span>
            </div>
            <p className="text-stone-800 italic text-[11px] bg-white p-2.5 rounded-lg border border-stone-200">
              "{item.actionDraft.draftText}"
            </p>
          </div>
        )}

        {/* Hard System Rule Disclaimer */}
        <div className="flex items-center gap-2 rounded-lg bg-amber-50 border border-amber-200/80 px-2.5 py-2 text-[11px] text-amber-900">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-700 shrink-0" />
          <span>
            <strong>AI DID NOT EXECUTE THIS ACTION.</strong> Requires explicit human authorization before sending, dispatching or modifying schedule.
          </span>
        </div>

        {/* Rejection Input Box */}
        {isRejecting && (
          <div className="rounded-xl bg-rose-50/60 p-3 border border-rose-200 space-y-2">
            <label className="text-xs text-rose-900 font-bold block">
              Reason for Rejection (Required for Audit Trail):
            </label>
            <input
              type="text"
              placeholder="e.g. Disagree with delay; will deploy pumps instead"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full rounded-lg bg-white border border-rose-300 p-2 text-xs text-stone-900 focus:outline-none focus:border-rose-500"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setIsRejecting(false)}
                className="px-2.5 py-1 text-xs text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReject}
                disabled={!rejectReason.trim()}
                className="rounded-lg bg-rose-700 hover:bg-rose-800 disabled:opacity-50 px-3 py-1.5 text-xs font-semibold text-white shadow-xs"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        )}

        {/* Action Controls */}
        {isPending && !isEditing && !isRejecting && (
          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => setIsRejecting(true)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-300 bg-white hover:bg-rose-50 hover:border-rose-300 py-2.5 text-xs font-semibold text-stone-700 hover:text-rose-800 transition-colors shadow-xs"
            >
              <XCircle className="h-4 w-4" />
              <span>Reject</span>
            </button>
            
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 py-2.5 text-xs font-semibold text-stone-700 hover:text-stone-900 transition-colors shadow-xs"
            >
              <Edit3 className="h-4 w-4" />
              <span>Edit</span>
            </button>

            <button
              onClick={handleApprove}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 py-2.5 text-xs font-bold text-white shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Approve</span>
            </button>
          </div>
        )}

        {/* Reviewed metadata if closed */}
        {!isPending && (
          <div className="flex items-center justify-between text-[11px] text-stone-500 border-t border-stone-200 pt-2 font-mono">
            <span>Reviewed by: <strong className="text-stone-800">{item.reviewedBy || 'Authorized Operator'}</strong></span>
            <span>{item.reviewedAt || 'Recorded'}</span>
          </div>
        )}
      </div>
    </div>
  );
};
