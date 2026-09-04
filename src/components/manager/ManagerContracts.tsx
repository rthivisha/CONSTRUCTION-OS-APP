import React, { useState } from 'react';
import { 
  FileCheck, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  FileText, 
  Search, 
  ArrowRight,
  BookOpen,
  DollarSign
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ManagerContracts: React.FC = () => {
  const { contractClauses } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClause, setSelectedClause] = useState<any>(contractClauses[0]);

  const filteredClauses = contractClauses.filter(
    (c) =>
      c.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subcontractor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-amber-800 font-bold">
            Contract Governance & QA Compliance
          </span>
          <h1 className="text-lg sm:text-xl font-extrabold text-stone-900 mt-0.5">Contracts & Spec Compliance</h1>
          <p className="text-xs text-stone-600">
            Automated clause analysis, spec discrepancy flags & liquidated damages risk checks
          </p>
        </div>
      </div>

      {/* Featured Section 4.2 Spec Discrepancy Spotlight */}
      <div className="rounded-2xl border-2 border-rose-300 bg-white p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between border-b border-stone-200 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-rose-100 text-rose-800 px-2 py-0.5 text-xs font-mono font-bold border border-rose-300">
              DISCREPANCY FLAGGED
            </span>
            <h3 className="font-bold text-stone-900 text-sm">
              Section 4.2 — Concrete Slump & Compressive Strength Spec
            </h3>
          </div>
          <span className="text-xs font-mono text-amber-800 font-bold">
            Penalty Exposure: $1,200/day
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          {/* Contract Specified */}
          <div className="rounded-xl bg-stone-50 p-3 border border-stone-200 space-y-1">
            <span className="text-[10px] font-mono uppercase text-stone-700 font-bold block">
              Architect / Contract Specification:
            </span>
            <div className="text-stone-700 font-mono text-[11px] leading-relaxed">
              • Grade: M40 Structural Concrete (IS 456 / ASTM C39)
              <br />
              • Slump: 120 ± 25 mm at point of discharge
              <br />
              • Maximum Water-Cement Ratio: 0.40
            </div>
          </div>

          {/* Supplier Delivered Batch */}
          <div className="rounded-xl bg-rose-50/50 p-3 border border-rose-200 space-y-1">
            <span className="text-[10px] font-mono uppercase text-rose-800 font-bold block">
              Batch Plant Delivery Ticket (UltraTech Batch #TX-902):
            </span>
            <div className="text-stone-700 font-mono text-[11px] leading-relaxed">
              • Grade: M40 High Performance Mix
              <br />
              • Slump Tested: 160 mm (Exceeds target tolerance by 15mm)
              <br />
              • Superplasticizer Admixture: Sika ViscoCrete 20HE @ 0.8%
            </div>
          </div>
        </div>

        {/* Contract Compliance Agent Analysis */}
        <div className="rounded-xl bg-amber-50/60 p-3 border border-amber-300 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 text-amber-900 font-mono text-[10px] font-bold uppercase">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Compliance Agent Legal & Technical Finding:</span>
          </div>
          <p className="text-stone-800 leading-relaxed text-xs">
            While slump is elevated due to flowable admixture, cylinder 7-day compressive tests show 32 MPa (on track for 48 MPa @ 28 days). Subcontractor has submitted Workaround WR-008. If rejected, rework will trigger 2-day curing delay ($2,400 delay damages).
          </p>
          <div className="flex justify-end pt-1">
            <button
              onClick={() => alert('Contract clarification draft generated for Architect approval.')}
              className="rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold px-3 py-1.5 text-xs transition-colors shadow-xs"
            >
              Draft Architect Waiver / Addendum
            </button>
          </div>
        </div>
      </div>

      {/* Contract Clauses Browser */}
      <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 font-mono flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-stone-700" />
            Contract Clauses & Subcontractor Agreement Index
          </h3>
          <div className="relative w-48">
            <Search className="h-3.5 w-3.5 text-stone-400 absolute left-2.5 top-2" />
            <input
              type="text"
              placeholder="Filter clauses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg bg-stone-50 border border-stone-300 pl-8 pr-2 py-1 text-xs text-stone-900 focus:outline-none focus:border-amber-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Clause List */}
          <div className="md:col-span-1 space-y-2 max-h-80 overflow-y-auto pr-1">
            {filteredClauses.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedClause(c)}
                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all space-y-1 ${
                  selectedClause?.id === c.id
                    ? 'bg-amber-50/70 border-amber-400 text-stone-900 shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-amber-900 font-bold">{c.section}</span>
                  <span
                    className={`rounded px-1.5 py-0.2 font-semibold uppercase ${
                      c.complianceStatus === 'COMPLIANT'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {c.complianceStatus}
                  </span>
                </div>
                <div className="font-bold truncate text-stone-900 text-xs">{c.title}</div>
                <div className="text-[10px] text-stone-500 truncate">{c.subcontractor}</div>
              </div>
            ))}
          </div>

          {/* Clause Details Preview */}
          <div className="md:col-span-2 rounded-xl bg-stone-50 p-4 border border-stone-200 space-y-3 text-xs">
            {selectedClause ? (
              <>
                <div className="flex items-start justify-between border-b border-stone-200 pb-2">
                  <div>
                    <span className="text-[10px] font-mono text-amber-800 uppercase font-bold">
                      {selectedClause.section} • {selectedClause.subcontractor}
                    </span>
                    <h4 className="font-bold text-stone-900 text-sm mt-0.5">
                      {selectedClause.title}
                    </h4>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold ${
                      selectedClause.complianceStatus === 'COMPLIANT'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}
                  >
                    {selectedClause.complianceStatus}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-stone-500 uppercase font-bold block">
                    Contractual Text:
                  </span>
                  <p className="text-stone-700 leading-relaxed italic bg-white p-3 rounded-lg border border-stone-200">
                    "{selectedClause.text}"
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-stone-500 uppercase font-bold block">
                    AI Compliance Analysis:
                  </span>
                  <p className="text-stone-700 leading-relaxed">
                    {selectedClause.aiAnalysis}
                  </p>
                </div>

                {selectedClause.penaltyRisk && (
                  <div className="rounded-lg bg-rose-50 border border-rose-300 p-2.5 text-rose-800 flex items-center justify-between font-mono text-xs">
                    <span>Identified Penalty Exposure:</span>
                    <span className="font-bold text-rose-900">{selectedClause.penaltyRisk}</span>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-10 text-stone-400">
                Select a clause to view contract specifications and compliance analysis.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
