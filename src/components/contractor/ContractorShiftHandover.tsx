import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Download, 
  Eye, 
  Send, 
  Users,
  AlertTriangle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContractorShiftHandover: React.FC = () => {
  const { shiftHandoff, signOffShiftHandoff, setIsPdfPreviewOpen } = useApp();
  const [acknowledgedName, setAcknowledgedName] = useState('Dinesh Kumar (Night Shift In-Charge)');
  const [nightRemarks, setNightRemarks] = useState('Night tower lighting deployed. Generator fuel checked. Ready for 6:30 PM concrete pour.');

  const handleSignOff = () => {
    signOffShiftHandoff(acknowledgedName);
    alert(`Night shift handoff officially acknowledged and digitally signed by ${acknowledgedName}.`);
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-neutral-800 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">
            Shift Handoff Protocol
          </span>
          <h1 className="text-lg font-bold text-neutral-100">Night Crew Shift Handover Brief</h1>
          <p className="text-xs text-neutral-400">
            Official shift handover log & incoming night crew digital acknowledgment
          </p>
        </div>
        <button
          onClick={() => setIsPdfPreviewOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-1.5 text-xs font-semibold border border-neutral-700 transition-colors"
        >
          <FileText className="h-4 w-4 text-amber-400" />
          <span>Open Full Formatted PDF</span>
        </button>
      </div>

      {/* Handover Status Banner */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-amber-400" />
            <span className="font-bold text-neutral-100 text-sm">
              HANDOVER REF: {shiftHandoff.id} • {shiftHandoff.date}
            </span>
          </div>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold ${
              shiftHandoff.signedOff
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse'
            }`}
          >
            {shiftHandoff.signedOff ? 'SIGNED & SEALED' : 'AWAITING INBOUND SIGN-OFF'}
          </span>
        </div>

        {/* Section Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Day Shift Completed */}
          <div className="rounded-xl bg-neutral-950 p-3.5 border border-neutral-800 space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
              ✓ Day Shift Completed Operations:
            </span>
            <ul className="list-disc pl-4 text-neutral-300 space-y-1 text-xs">
              {shiftHandoff.completedTasks.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>

          {/* Pending & Night Priorities */}
          <div className="rounded-xl bg-neutral-950 p-3.5 border border-neutral-800 space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
              ★ Night Shift Action Priorities:
            </span>
            <ul className="list-disc pl-4 text-neutral-300 space-y-1 text-xs">
              {shiftHandoff.nextShiftPriorities.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Active Risks */}
        <div className="rounded-xl bg-rose-950/30 p-3 border border-rose-500/30 text-xs space-y-1">
          <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block">
            Active Site Environmental / Logistics Hazards:
          </span>
          <ul className="list-disc pl-4 text-rose-200 text-xs">
            {shiftHandoff.activeRisks.map((r, idx) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Night Crew Sign-off Box */}
      <div className="rounded-2xl border border-emerald-500/40 bg-neutral-900/90 p-4 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-100 font-mono flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-400" />
          Incoming Night Shift Formal Acknowledgment
        </h3>

        <div className="space-y-3 text-xs">
          <div>
            <label className="text-neutral-400 block mb-1">Inbound Night Supervisor Name:</label>
            <input
              type="text"
              value={acknowledgedName}
              onChange={(e) => setAcknowledgedName(e.target.value)}
              className="w-full rounded-lg bg-neutral-950 border border-neutral-800 p-2 text-neutral-100 font-mono text-xs"
            />
          </div>

          <div>
            <label className="text-neutral-400 block mb-1">Night Pre-Shift Handover Remarks:</label>
            <textarea
              rows={2}
              value={nightRemarks}
              onChange={(e) => setNightRemarks(e.target.value)}
              className="w-full rounded-lg bg-neutral-950 border border-neutral-800 p-2 text-neutral-100 text-xs"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[10px] text-neutral-500 font-mono">
              Timestamp: {new Date().toLocaleTimeString()}
            </span>
            <button
              onClick={handleSignOff}
              disabled={shiftHandoff.signedOff}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold px-4 py-2 text-xs transition-colors shadow-md"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{shiftHandoff.signedOff ? 'Shift Acknowledged & Signed' : 'Sign & Accept Shift Handover'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
