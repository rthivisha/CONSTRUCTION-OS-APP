import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Clock, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';

export const ContractorWorkarounds: React.FC = () => {
  const workarounds = [
    {
      id: 'WR-008',
      title: 'Concrete Slump Tolerance Concession & Enhanced Moist Curing',
      discipline: 'Structural / Concrete',
      authorizedBy: 'Anand V. (Lead Architect)',
      dateApproved: 'Aug 30, 2026',
      status: 'ACTIVE_SITE_APPROVED',
      problem: 'Batch #TX-902 slump tested at 160mm (tolerance 120±25mm).',
      approvedSolution: 'Accepted based on 32 MPa 7-day test. Mandated 10-day continuous ponding curing with burlap wrap. Core sample backup scheduled if 28-day falls below 40 MPa.',
      auditReference: 'AUD-88210',
    },
    {
      id: 'WR-007',
      title: 'Level 2 MEP Pipe Sleeving Offset',
      discipline: 'MEP / Electrical',
      authorizedBy: 'Er. Rajesh Chandran (Structural)',
      dateApproved: 'Aug 28, 2026',
      status: 'COMPLETED',
      problem: 'Conduit clash with shear link reinforcement near Column C-14.',
      approvedSolution: 'Relocate sleeve 150mm East into low-shear tension zone. Install 2-T16 45° diagonal trim bars.',
      auditReference: 'AUD-88194',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">
            Engineering Concessions Archive
          </span>
          <h1 className="text-lg font-bold text-neutral-100">Approved Workarounds & Waivers</h1>
          <p className="text-xs text-neutral-400">
            Repository of authorized structural variations, trade offsets & approved deviations
          </p>
        </div>
        <span className="rounded-full bg-emerald-500/10 text-emerald-400 px-3 py-1 text-xs font-mono font-bold border border-emerald-500/30">
          2 Active Concessions
        </span>
      </div>

      {/* Workarounds Feed */}
      <div className="space-y-3">
        {workarounds.map((wr) => (
          <div
            key={wr.id}
            className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 space-y-3 text-xs"
          >
            <div className="flex items-start justify-between gap-2 border-b border-neutral-800 pb-2.5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-amber-400">{wr.id}</span>
                  <span className="text-neutral-500">•</span>
                  <span className="text-[10px] font-mono text-neutral-400">{wr.discipline}</span>
                </div>
                <h4 className="font-bold text-neutral-100 text-sm mt-0.5">{wr.title}</h4>
              </div>
              <span className="rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-mono font-bold">
                {wr.status}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="rounded-xl bg-neutral-950 p-3 border border-neutral-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-neutral-500 font-semibold block">
                  Field Problem:
                </span>
                <p className="text-neutral-300 leading-relaxed text-xs">{wr.problem}</p>
              </div>

              <div className="rounded-xl bg-emerald-950/30 p-3 border border-emerald-500/30 space-y-1">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold block">
                  Authorized Engineering Solution:
                </span>
                <p className="text-emerald-200 leading-relaxed text-xs">{wr.approvedSolution}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono pt-1">
              <span>Sign-off: {wr.authorizedBy}</span>
              <span>Ledger: {wr.auditReference} • {wr.dateApproved}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
