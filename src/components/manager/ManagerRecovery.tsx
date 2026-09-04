import React, { useState } from 'react';
import { 
  CloudRain, 
  Clock, 
  DollarSign, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Truck, 
  Users,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ManagerRecovery: React.FC = () => {
  const { runIncidentSimulation, approveItem, approvals, navigate } = useApp();
  const [selectedOption, setSelectedOption] = useState<'A' | 'B'>('A');

  const pendingStormApproval = approvals.find((a) => a.id === 'app-001');

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-rose-800 font-bold">
              Incident Response & Contingency Matrix
            </span>
            <span className="rounded-full bg-rose-50 text-rose-800 px-2 py-0.2 text-[10px] font-mono border border-rose-200 font-bold">
              STORM EVENT ACTIVE
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-stone-900 mt-0.5">
            Storm Disruption Recovery Center
          </h1>
          <p className="text-xs text-stone-600">
            Multi-agent coordinated recovery scenario evaluation & human decision authorization
          </p>
        </div>

        <button
          onClick={runIncidentSimulation}
          className="flex items-center gap-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 px-3.5 py-2 text-xs font-bold transition-all shadow-xs"
        >
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>Launch 11-Step Interactive Simulation</span>
        </button>
      </div>

      {/* Incident Status Alert Card */}
      <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-2 text-xs shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
            <CloudRain className="h-5 w-5 text-stone-700" />
            <span>Severe Weather Inbound (32mm/hr Heavy Rain Expected @ 1:45 PM)</span>
          </div>
          <span className="font-mono text-[11px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 font-bold">
            T-MINUS 1h 20m
          </span>
        </div>
        <p className="text-stone-700 leading-relaxed">
          Level 3 concrete pour currently scheduled for 2:00 PM will experience wash-out and cement paste dilution if unmitigated. Logistics Agent has already put batch plant on 45-minute standby.
        </p>
      </div>

      {/* Decision Matrix Comparison: Option A vs Option B */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-800 font-mono">
            AI-Synthesized Recovery Options (Multi-Agent Coordinated)
          </span>
          <span className="text-[10px] text-stone-500 font-semibold">Human Approval Required</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option A: Recommended Resequence */}
          <div
            onClick={() => setSelectedOption('A')}
            className={`rounded-2xl border-2 p-4 space-y-3 cursor-pointer transition-all shadow-xs ${
              selectedOption === 'A'
                ? 'border-amber-400 bg-amber-50/40 ring-1 ring-amber-300'
                : 'border-stone-200 bg-white hover:bg-stone-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded-lg bg-amber-100 text-amber-950 px-2 py-0.5 text-[10px] font-mono font-bold border border-amber-300">
                  ★ RECOMMENDED OPTION A
                </span>
                <h3 className="font-bold text-stone-900 text-sm mt-1.5">
                  Shift Concrete Pour to 6:30 PM Night Window
                </h3>
              </div>
              <input
                type="radio"
                checked={selectedOption === 'A'}
                onChange={() => setSelectedOption('A')}
                className="text-stone-900 focus:ring-0 mt-1"
              />
            </div>

            <p className="text-stone-700 text-xs leading-relaxed">
              Delay concrete pour by 4.5 hours to after the rain clears. Immediately re-route 12 carpenters and rebar crews to Level 2 interior MEP sleeve installations.
            </p>

            {/* Impact Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="rounded-xl bg-white p-2.5 border border-stone-200 shadow-xs">
                <span className="text-[10px] text-stone-500 uppercase block font-semibold">Cost Impact</span>
                <span className="text-amber-900 font-bold text-sm">+$850</span>
                <span className="text-[10px] text-stone-500 block">Night lighting & pump hold</span>
              </div>
              <div className="rounded-xl bg-white p-2.5 border border-stone-200 shadow-xs">
                <span className="text-[10px] text-stone-500 uppercase block font-semibold">Schedule Slip</span>
                <span className="text-emerald-800 font-bold text-sm">+4.5 Hours</span>
                <span className="text-[10px] text-stone-500 block">Recovers overnight</span>
              </div>
            </div>

            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-2 text-[11px] text-emerald-900 font-medium">
              ✓ Zero subcontractor idle time. Concrete curing quality 100% protected.
            </div>
          </div>

          {/* Option B: Postpone to Tomorrow */}
          <div
            onClick={() => setSelectedOption('B')}
            className={`rounded-2xl border-2 p-4 space-y-3 cursor-pointer transition-all shadow-xs ${
              selectedOption === 'B'
                ? 'border-amber-400 bg-amber-50/40 ring-1 ring-amber-300'
                : 'border-stone-200 bg-white hover:bg-stone-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded-lg bg-stone-100 text-stone-700 px-2 py-0.5 text-[10px] font-mono font-bold border border-stone-200">
                  ALTERNATIVE OPTION B
                </span>
                <h3 className="font-bold text-stone-900 text-sm mt-1.5">
                  Cancel Pour & Postpone to Tomorrow 8:00 AM
                </h3>
              </div>
              <input
                type="radio"
                checked={selectedOption === 'B'}
                onChange={() => setSelectedOption('B')}
                className="text-stone-900 focus:ring-0 mt-1"
              />
            </div>

            <p className="text-stone-700 text-xs leading-relaxed">
              Stand down concrete crew today. Reschedule batch plant trucks to tomorrow morning shift.
            </p>

            {/* Impact Metrics Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="rounded-xl bg-white p-2.5 border border-stone-200 shadow-xs">
                <span className="text-[10px] text-stone-500 uppercase block font-semibold">Cost Impact</span>
                <span className="text-stone-900 font-bold text-sm">$0 Immediate</span>
                <span className="text-[10px] text-rose-700 block font-semibold">$1,200/day LD Risk</span>
              </div>
              <div className="rounded-xl bg-white p-2.5 border border-stone-200 shadow-xs">
                <span className="text-[10px] text-stone-500 uppercase block font-semibold">Schedule Slip</span>
                <span className="text-rose-800 font-bold text-sm">+24 Hours</span>
                <span className="text-[10px] text-stone-500 block">Critical path delayed</span>
              </div>
            </div>

            <div className="rounded-xl bg-rose-50 border border-rose-200 p-2 text-[11px] text-rose-900 font-medium">
              ⚠ Pushes Level 4 formwork by 1 full day. Triggers liquidated damages clause.
            </div>
          </div>
        </div>
      </div>

      {/* Human Decision Execution Authorization Gate */}
      <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-amber-800" />
            <div>
              <h4 className="font-bold text-stone-900 text-sm">
                Authorize Selected Recovery Plan ({selectedOption === 'A' ? 'Option A: Night Pour' : 'Option B: Next Day'})
              </h4>
              <p className="text-[11px] text-stone-600">
                Authorizes batch plant standby, notifications to Shree Civil & night tower lighting
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-amber-200">
          <button
            onClick={() => navigate('/manager/approvals')}
            className="rounded-xl bg-white hover:bg-stone-50 px-4 py-2 text-xs font-bold text-stone-700 border border-stone-300 shadow-xs"
          >
            Review in Full Queue
          </button>
          <button
            onClick={() => {
              if (pendingStormApproval) {
                approveItem(pendingStormApproval.id, 'Vikram Malhotra (PM)');
              }
              alert(`Option ${selectedOption} authorized by Project Manager. Actions dispatched to Site Supervisor & UltraTech batch plant.`);
            }}
            className="flex items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-5 py-2 text-xs transition-colors shadow-xs"
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>Authorize & Execute Option {selectedOption}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
