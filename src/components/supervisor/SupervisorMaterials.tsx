import React, { useState } from 'react';
import { 
  Truck, 
  Users, 
  AlertTriangle, 
  Clock, 
  Send, 
  CheckCircle2, 
  TrendingDown, 
  DollarSign,
  PackageCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SupervisorMaterials: React.FC = () => {
  const { materials, crew } = useApp();
  const [crewNotificationSent, setCrewNotificationSent] = useState(false);

  const handleSendCrewReview = () => {
    setCrewNotificationSent(true);
    alert('Crew shortfall review request dispatched to Project Manager & Subcontractor PM. Payroll untouched.');
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold">
            Field Logistics & Labor
          </span>
          <h1 className="text-lg font-bold text-neutral-100">Materials & Crew Dashboard</h1>
          <p className="text-xs text-neutral-400">
            Real-time supply buffers, delivery tracking & subcontractor attendance
          </p>
        </div>
      </div>

      {/* Materials Inventory Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono flex items-center gap-1.5">
            <Truck className="h-4 w-4 text-amber-400" />
            Active Materials Inventory
          </span>
          <span className="text-[10px] text-neutral-500">Live Buffer Level</span>
        </div>

        <div className="space-y-2.5">
          {materials.map((mat) => (
            <div
              key={mat.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-3.5 space-y-2 text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-neutral-100">{mat.name}</h4>
                  <div className="text-[10px] text-neutral-400 font-mono">
                    Supplier: {mat.supplier} • {mat.category}
                  </div>
                </div>
                <div className="text-right font-mono">
                  <span className="font-bold text-neutral-200">
                    {mat.currentStock} / {mat.requiredStock} {mat.unit}
                  </span>
                  <span
                    className={`block text-[10px] font-semibold ${
                      mat.percentage > 75
                        ? 'text-emerald-400'
                        : mat.percentage > 50
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {mat.percentage}% Buffer
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-neutral-800 overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    mat.percentage > 75
                      ? 'bg-emerald-500'
                      : mat.percentage > 50
                      ? 'bg-amber-400'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${mat.percentage}%` }}
                />
              </div>

              {/* Delivery telemetry info */}
              <div className="flex items-center justify-between text-[11px] bg-neutral-950 p-2 rounded-lg border border-neutral-800/80">
                <div className="flex items-center gap-1.5 text-neutral-300">
                  <Clock className="h-3.5 w-3.5 text-blue-400" />
                  <span>{mat.deliveryInfo}</span>
                </div>
                {mat.status === 'shortage_predicted' && (
                  <span className="rounded bg-rose-500/20 text-rose-300 text-[10px] font-mono px-1.5 py-0.5 border border-rose-500/30">
                    SHORTAGE RISK
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Crew Headcount & Shortfall Tracking */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono flex items-center gap-1.5">
            <Users className="h-4 w-4 text-purple-400" />
            Trade Crew Headcount
          </span>
          <span className="text-[10px] text-neutral-500">Contract vs Present</span>
        </div>

        {crew.map((crw) => (
          <div
            key={crw.id}
            className={`rounded-2xl border p-4 text-xs space-y-3 ${
              crw.shortfall > 0
                ? 'border-amber-500/40 bg-neutral-900/90'
                : 'border-neutral-800 bg-neutral-900/70'
            }`}
          >
            <div className="flex items-start justify-between gap-2 border-b border-neutral-800 pb-2">
              <div>
                <h4 className="font-bold text-neutral-100 text-sm">{crw.trade}</h4>
                <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                  Subcontractor: {crw.subcontractor}
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-extrabold font-mono text-neutral-100">
                  {crw.presentCount} <span className="text-xs font-normal text-neutral-400">/ {crw.requiredCount} Present</span>
                </div>
                {crw.shortfall > 0 ? (
                  <span className="text-[10px] font-bold text-amber-400 font-mono">
                    ⚠ {crw.shortfall} Worker Shortfall
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-emerald-400 font-mono">
                    ✓ Full Roster
                  </span>
                )}
              </div>
            </div>

            {crw.shortfall > 0 && (
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-lg bg-neutral-950 p-2 border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase block font-mono">
                      Productivity Loss
                    </span>
                    <span className="font-bold text-rose-400 text-sm">
                      -{crw.productivityLossPercent}%
                    </span>
                  </div>
                  <div className="rounded-lg bg-neutral-950 p-2 border border-neutral-800">
                    <span className="text-[10px] text-neutral-500 uppercase block font-mono">
                      Estimated Task Delay
                    </span>
                    <span className="font-bold text-amber-400 text-sm">
                      +{crw.estimatedDelayHours} Hours
                    </span>
                  </div>
                </div>

                <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-2.5 text-xs text-amber-300">
                  <span className="font-semibold block mb-0.5">AI Suggestion:</span>
                  Notify subcontractor PM requesting afternoon replacement crew to avoid slipping Level 3 deck sign-off.
                </div>

                {/* Critical payroll guard principle */}
                <div className="text-[10px] text-neutral-400 italic">
                  Note: Automated system does not alter billing or payroll without explicit manager approval.
                </div>

                <button
                  onClick={handleSendCrewReview}
                  disabled={crewNotificationSent}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold py-2.5 text-xs transition-colors shadow-md"
                >
                  <Send className="h-4 w-4" />
                  <span>
                    {crewNotificationSent ? 'Review Request Dispatched' : 'Send Review Request'}
                  </span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
