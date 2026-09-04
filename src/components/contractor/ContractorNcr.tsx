import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Eye, 
  ArrowRight,
  UserCheck
} from 'lucide-react';

export const ContractorNcr: React.FC = () => {
  const [ncrs, setNcrs] = useState([
    {
      id: 'ncr-012',
      title: 'Concrete Slump Deviation on Batch #TX-902',
      trade: 'Civil / Concrete Works',
      subcontractor: 'UltraTech / Shree Civil',
      severity: 'Major',
      status: 'UNDER_WORKAROUND',
      date: 'Aug 30, 2026',
      description: 'Slump measured at 160mm against 120±25mm spec. 7-day cube test showed 32MPa strength.',
      correctiveAction: 'Workaround WR-008 approved with additional 3-day moist curing requirement.',
    },
    {
      id: 'ncr-013',
      title: 'Sprinkler Line Head Clearance at Zone 4',
      trade: 'MEP / Fire Protection',
      subcontractor: 'Sterling MEP Works',
      severity: 'Minor',
      status: 'OPEN',
      date: 'Aug 29, 2026',
      description: 'Pendant sprinkler head sits 45mm below false ceiling grid level.',
      correctiveAction: 'Adjust threaded drop nipple to flush mount specification.',
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newTrade, setNewTrade] = useState('Civil / Formwork');

  const handleCreateNcr = () => {
    if (!newTitle.trim()) return;
    setNcrs((prev) => [
      {
        id: `ncr-0${prev.length + 14}`,
        title: newTitle,
        trade: newTrade,
        subcontractor: 'Assigned Trade Contractor',
        severity: 'Minor',
        status: 'OPEN',
        date: 'Today',
        description: newDesc || 'Identified during site walk.',
        correctiveAction: 'Pending engineering assessment.',
      },
      ...prev,
    ]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">
            Quality Assurance & Punch Items
          </span>
          <h1 className="text-lg font-bold text-neutral-100">Non-Conformance Reports (NCR)</h1>
          <p className="text-xs text-neutral-400">
            Formal defect tracking, root-cause corrective actions & closeout verification
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold px-3 py-1.5 text-xs transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Log New NCR</span>
        </button>
      </div>

      {/* NCR Items Feed */}
      <div className="space-y-3">
        {ncrs.map((ncr) => (
          <div
            key={ncr.id}
            className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 space-y-3 text-xs"
          >
            <div className="flex items-start justify-between gap-2 border-b border-neutral-800 pb-2.5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-amber-400">{ncr.id.toUpperCase()}</span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-[10px] font-mono text-neutral-400">{ncr.trade}</span>
                </div>
                <h4 className="font-bold text-neutral-100 text-sm mt-0.5">{ncr.title}</h4>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase ${
                  ncr.status === 'OPEN'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {ncr.status.replace('_', ' ')}
              </span>
            </div>

            <p className="text-neutral-300 text-xs leading-relaxed">
              "{ncr.description}"
            </p>

            <div className="rounded-xl bg-neutral-950 p-3 border border-neutral-800 space-y-1">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold block">
                Agreed Corrective Action:
              </span>
              <p className="text-neutral-200 text-xs">{ncr.correctiveAction}</p>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono pt-1">
              <span>Subcontractor: {ncr.subcontractor}</span>
              <span>Logged: {ncr.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* New NCR Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl bg-neutral-900 border border-neutral-700 p-5 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-rose-400" />
              Log Non-Conformance Report (NCR)
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-400 block mb-1">Issue Title:</label>
                <input
                  type="text"
                  placeholder="e.g. Beam B-12 Formwork Honeycombing"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full rounded-lg bg-neutral-950 border border-neutral-800 p-2 text-neutral-100"
                />
              </div>
              <div>
                <label className="text-neutral-400 block mb-1">Defect Description:</label>
                <textarea
                  rows={3}
                  placeholder="Describe non-conformance against approved drawings or specifications..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full rounded-lg bg-neutral-950 border border-neutral-800 p-2 text-neutral-100"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNcr}
                className="rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-1.5 text-xs transition-colors"
              >
                Register Formal NCR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
