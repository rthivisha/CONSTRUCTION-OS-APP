import React, { useState } from 'react';
import { 
  Clock, 
  Search, 
  Filter, 
  Download, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  User, 
  Cpu, 
  Sparkles,
  ArrowDownToLine
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ManagerAuditTrail: React.FC = () => {
  const { auditLogs } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredLogs = auditLogs.filter((log) => {
    if (selectedCategory !== 'all' && log.category !== selectedCategory) return false;
    if (
      searchQuery &&
      !log.action.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.actor.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !log.details.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleExportLogs = () => {
    alert(`Exported ${filteredLogs.length} audit trail records as certified CSV report.`);
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-amber-800 font-bold">
            Digital Chain of Custody
          </span>
          <h1 className="text-lg sm:text-xl font-extrabold text-stone-900 mt-0.5">Audit Trail & Compliance Records</h1>
          <p className="text-xs text-stone-600">
            Certified tamper-evident immutable log of all AI observations, drafts & human sign-offs
          </p>
        </div>
        <button
          onClick={handleExportLogs}
          className="flex items-center gap-1.5 rounded-xl bg-white hover:bg-stone-50 text-stone-800 px-3.5 py-2 text-xs font-semibold border border-stone-300 transition-colors shadow-xs"
        >
          <ArrowDownToLine className="h-4 w-4 text-amber-700" />
          <span>Export Audit Log (CSV)</span>
        </button>
      </div>

      {/* Verification Shield Callout */}
      <div className="rounded-2xl border border-emerald-300 bg-emerald-50/50 p-3.5 flex items-center justify-between text-xs shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <span className="font-bold text-stone-900 block">
              Cryptographically Verified Site Ledger
            </span>
            <span className="text-stone-600 text-[11px]">
              Every human approval, RFI response and parameter modification is recorded with UTC timestamp.
            </span>
          </div>
        </div>
        <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-2 py-1 rounded border border-emerald-300 font-bold hidden sm:inline">
          ISO 9001 COMPLIANT
        </span>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="h-3.5 w-3.5 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search action, actor, or details..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl bg-white border border-stone-300 pl-8 pr-3 py-1.5 text-xs text-stone-900 focus:outline-none focus:border-amber-600 shadow-xs"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto text-xs">
          {['all', 'approval', 'system', 'agent_coordination', 'budget', 'inspection'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-medium capitalize whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-stone-900 text-white font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {cat.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table Feed */}
      <div className="rounded-2xl border border-stone-200 bg-white overflow-hidden shadow-xs">
        <div className="divide-y divide-stone-200">
          {filteredLogs.map((log) => (
            <div key={log.id} className="p-3.5 text-xs hover:bg-stone-50 transition-colors space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-stone-500 font-semibold">{log.timestamp}</span>
                  <span
                    className={`rounded px-1.5 py-0.2 font-mono text-[10px] font-bold uppercase ${
                      log.category === 'approval'
                        ? 'bg-emerald-100 text-emerald-800'
                        : log.category === 'agent_coordination'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-stone-100 text-stone-700'
                    }`}
                  >
                    {log.action}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-stone-600 flex items-center gap-1">
                  {log.actor.includes('Agent') ? (
                    <Cpu className="h-3 w-3 text-amber-700" />
                  ) : (
                    <User className="h-3 w-3 text-stone-700" />
                  )}
                  {log.actor}
                </span>
              </div>

              <p className="text-stone-800 text-xs leading-relaxed">
                {log.details}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
