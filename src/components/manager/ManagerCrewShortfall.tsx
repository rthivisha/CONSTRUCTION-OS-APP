import React from 'react';
import { 
  Users, 
  AlertTriangle, 
  TrendingDown, 
  Clock, 
  DollarSign, 
  Send, 
  Building2, 
  CheckCircle2 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ManagerCrewShortfall: React.FC = () => {
  const { crew } = useApp();

  const totalRequired = crew.reduce((acc, c) => acc + c.requiredCount, 0);
  const totalPresent = crew.reduce((acc, c) => acc + c.presentCount, 0);
  const totalShortfall = totalRequired - totalPresent;

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-amber-800 font-bold">
            Labor Capacity & Trade Tracking
          </span>
          <h1 className="text-lg sm:text-xl font-extrabold text-stone-900 mt-0.5">Subcontractor Crew Roster</h1>
          <p className="text-xs text-stone-600">
            Headcount discrepancies, daily productivity loss & schedule risk projections
          </p>
        </div>
      </div>

      {/* Labor Totals Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-1 shadow-xs">
          <span className="text-[11px] font-mono text-stone-500 font-semibold">Total Required Roster</span>
          <div className="text-2xl font-black font-mono text-stone-900">{totalRequired} Trades</div>
          <span className="text-[10px] text-stone-500 font-mono">Contract Baseline</span>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-1 shadow-xs">
          <span className="text-[11px] font-mono text-stone-500 font-semibold">Present On Site</span>
          <div className="text-2xl font-black font-mono text-amber-800">{totalPresent} Workers</div>
          <span className="text-[10px] text-stone-600 font-mono">
            {((totalPresent / totalRequired) * 100).toFixed(0)}% Roster Turnout
          </span>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-1 shadow-xs">
          <span className="text-[11px] font-mono text-stone-500 font-semibold">Net Trade Shortfall</span>
          <div className="text-2xl font-black font-mono text-rose-700">-{totalShortfall} Workers</div>
          <span className="text-[10px] text-rose-700 font-mono">
            Electrical & Formwork impacted
          </span>
        </div>
      </div>

      {/* Trade Detailed Breakdown Cards */}
      <div className="space-y-3">
        {crew.map((crw) => (
          <div
            key={crw.id}
            className={`rounded-2xl border p-4 text-xs space-y-3 shadow-xs ${
              crw.shortfall > 0
                ? 'border-amber-300 bg-amber-50/40'
                : 'border-stone-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between gap-2 border-b border-stone-200 pb-2.5">
              <div>
                <h4 className="font-bold text-stone-900 text-sm">{crw.trade}</h4>
                <div className="text-[10px] text-stone-500 font-mono mt-0.5">
                  Subcontractor: {crw.subcontractor}
                </div>
              </div>
              <div className="text-right font-mono">
                <span className="text-base font-extrabold text-stone-900">
                  {crw.presentCount} / {crw.requiredCount}
                </span>
                {crw.shortfall > 0 ? (
                  <span className="block text-[10px] text-amber-800 font-bold">
                    -{crw.shortfall} Shortfall
                  </span>
                ) : (
                  <span className="block text-[10px] text-emerald-800 font-bold">
                    ✓ Full Roster
                  </span>
                )}
              </div>
            </div>

            {/* Impact Analysis Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
              <div className="rounded-xl bg-white p-2.5 border border-stone-200 shadow-xs">
                <span className="text-[10px] text-stone-500 uppercase block font-semibold">Productivity</span>
                <span className={`font-bold text-sm ${crw.shortfall > 0 ? 'text-rose-700' : 'text-emerald-700'}`}>
                  {crw.shortfall > 0 ? `-${crw.productivityLossPercent}%` : '100%'}
                </span>
              </div>
              <div className="rounded-xl bg-white p-2.5 border border-stone-200 shadow-xs">
                <span className="text-[10px] text-stone-500 uppercase block font-semibold">Estimated Delay</span>
                <span className="font-bold text-stone-800 text-sm">
                  {crw.estimatedDelayHours > 0 ? `+${crw.estimatedDelayHours}h` : '0h'}
                </span>
              </div>
              <div className="rounded-xl bg-white p-2.5 border border-stone-200 sm:col-span-2 flex items-center justify-between shadow-xs">
                <div>
                  <span className="text-[10px] text-stone-500 uppercase block font-semibold">Subcontractor PM</span>
                  <span className="text-stone-800 font-bold">{crw.subcontractor.split(' ')[0]} Site Rep</span>
                </div>
                <button
                  onClick={() => alert(`Official notice dispatched to ${crw.subcontractor} requesting afternoon supplement.`)}
                  className="rounded-lg bg-stone-900 hover:bg-stone-800 text-white px-3 py-1.5 text-[11px] font-semibold transition-colors shadow-xs"
                >
                  Send Notice
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
