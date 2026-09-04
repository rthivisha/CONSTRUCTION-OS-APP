import React, { useState } from 'react';
import { 
  Layers, 
  CheckCircle2, 
  AlertTriangle, 
  Send, 
  FileText, 
  Eye, 
  ShieldCheck, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContractorBlueprints: React.FC = () => {
  const { blueprints, activeBlueprintId } = useApp();
  const [selectedBp, setSelectedBp] = useState(blueprints[0]);
  const [isDistributed, setIsDistributed] = useState(false);

  const handleAuthorizeRelease = () => {
    setIsDistributed(true);
    alert(`Revision ${selectedBp.revisionCurrent} officially stamped and published to Field Supervisors & Subcontractors mobile devices.`);
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">
            Architectural Release & Revision Studio
          </span>
          <h1 className="text-lg font-bold text-neutral-100">Blueprint Studio & Diff Approval</h1>
          <p className="text-xs text-neutral-400">
            Review CAD overlay diffs, approve revision packages & authorize field release
          </p>
        </div>

        <button
          onClick={handleAuthorizeRelease}
          disabled={isDistributed}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold px-4 py-2 text-xs transition-colors shadow-lg shadow-emerald-950/40"
        >
          <ShieldCheck className="h-4 w-4" />
          <span>{isDistributed ? 'Revision Released to Field' : 'Authorize & Release Revision R08'}</span>
        </button>
      </div>

      {/* Revision Diff Callout */}
      <div className="rounded-2xl border border-purple-500/40 bg-neutral-900/90 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-neutral-100 text-sm">{selectedBp.code} — {selectedBp.title}</span>
            <span className="rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono px-2 py-0.5 border border-purple-500/30">
              Diff: {selectedBp.revisionPrevious} ➔ {selectedBp.revisionCurrent}
            </span>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">
            Status: PENDING DISTRIBUTION APPROVAL
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          {selectedBp.changesDetected.map((change, idx) => (
            <div key={change.id} className="rounded-xl bg-neutral-950 p-3 border border-neutral-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400 font-mono text-[10px] uppercase">
                  Change #{idx + 1} • {change.discipline}
                </span>
                <span className="text-[10px] font-mono text-neutral-500">{change.zone}</span>
              </div>
              <h5 className="font-bold text-neutral-200">{change.title}</h5>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                {change.description}
              </p>
              <div className="text-[10px] font-mono text-neutral-400 pt-1 border-t border-neutral-800/80">
                Impact: {change.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Release Checklist & Subcontractor Distribution Matrix */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 space-y-3 text-xs">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200 font-mono">
          Distribution & Pre-Release Checklist
        </h3>

        <div className="space-y-2 text-neutral-300">
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Structural load calculations verified for 150mm MEP opening relocation (IS 456 Table 21).</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Clash detection with Sterling MEP sprinkler piping cleared at Grid 4-8.</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 rounded-lg bg-neutral-950 border border-neutral-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>All field supervisors tablet sync hooks staged for immediate push notification.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
