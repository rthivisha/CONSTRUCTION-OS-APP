import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  ShieldAlert, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  Layers, 
  Users, 
  Sparkles, 
  ChevronRight, 
  Cpu,
  CloudRain,
  Building2,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AgentActivityPanel } from '../common/AgentActivityPanel';

export const ManagerCommandCenter: React.FC = () => {
  const { 
    project, 
    approvals, 
    alerts, 
    navigate, 
    runIncidentSimulation 
  } = useApp();

  const pendingApprovals = approvals.filter((a) => a.status === 'PENDING_APPROVAL');

  return (
    <div className="space-y-4">
      {/* Executive Command Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-amber-800 font-bold">
              Office Command Center
            </span>
            <span className="rounded-full bg-emerald-50 text-emerald-800 px-2 py-0.2 text-[10px] font-mono border border-emerald-200 font-semibold">
              ● SYNCED
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-extrabold text-stone-900 mt-0.5">
            Project Command Center — {project.name}
          </h1>
          <p className="text-xs text-stone-600">
            Real-time multi-agent situational awareness, cost controls & human authorization queue
          </p>
        </div>

        {/* Action Trigger Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={runIncidentSimulation}
            className="flex items-center gap-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 px-3.5 py-2 text-xs font-bold transition-all shadow-xs"
          >
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span>Simulate Incident (Storm Workflow)</span>
          </button>
        </div>
      </div>

      {/* Top 4 Executive KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* KPI 1: Schedule Health */}
        <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-1.5 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span className="font-mono text-[11px] font-semibold text-stone-600">Schedule Health</span>
            <Clock className="h-4 w-4 text-amber-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-stone-900">
              {project.scheduleHealth}%
            </span>
            <span className="text-[11px] text-amber-800 font-semibold">
              ⚠ At Risk (-4h)
            </span>
          </div>
          <div className="text-[10px] text-stone-500">
            Target Milestones: 12 / 16 on track
          </div>
        </div>

        {/* KPI 2: Budget Variance */}
        <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-1.5 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span className="font-mono text-[11px] font-semibold text-stone-600">Budget Variance</span>
            <DollarSign className="h-4 w-4 text-rose-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-stone-900">
              +${project.budgetVariance.toLocaleString()}
            </span>
            <span className="text-[11px] text-rose-700 font-semibold">
              +0.35%
            </span>
          </div>
          <div className="text-[10px] text-stone-500">
            Committed: ${(project.spentBudget / 1000000).toFixed(2)}M / ${(project.totalBudget / 1000000).toFixed(2)}M
          </div>
        </div>

        {/* KPI 3: Pending Human Approvals */}
        <div 
          onClick={() => navigate('/manager/approvals')}
          className="rounded-2xl border border-amber-300 bg-amber-50/40 p-4 space-y-1.5 shadow-xs cursor-pointer hover:bg-amber-50/70 transition-colors group"
        >
          <div className="flex items-center justify-between text-amber-900 text-xs">
            <span className="font-mono text-[11px] font-bold text-amber-950">Approvals Queue</span>
            <ShieldAlert className="h-4 w-4 text-amber-700 group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-amber-950">
              {pendingApprovals.length} Action{pendingApprovals.length === 1 ? '' : 's'}
            </span>
            <span className="text-[10px] font-mono uppercase bg-amber-200 text-amber-950 px-1.5 py-0.2 rounded border border-amber-300 font-bold">
              HELD
            </span>
          </div>
          <div className="text-[10px] text-amber-800 flex items-center justify-between">
            <span>Requires human sign-off</span>
            <ChevronRight className="h-3 w-3 text-amber-700 group-hover:text-amber-950" />
          </div>
        </div>

        {/* KPI 4: Active Site Risk Index */}
        <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-1.5 shadow-xs">
          <div className="flex items-center justify-between text-stone-500 text-xs">
            <span className="font-mono text-[11px] font-semibold text-stone-600">Site Risk Index</span>
            <AlertTriangle className="h-4 w-4 text-rose-700" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono text-rose-800">
              {project.riskLevel}
            </span>
            <span className="text-[11px] text-rose-800 font-semibold">
              3 Alerts
            </span>
          </div>
          <div className="text-[10px] text-stone-500">
            Weather + Crew Shortfall + RFI
          </div>
        </div>
      </div>

      {/* Critical Approval Banner if pending */}
      {pendingApprovals.length > 0 && (
        <div className="rounded-2xl bg-amber-50 border border-amber-300 p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-900 border border-amber-300 shrink-0">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-amber-950 uppercase">
                Human-in-the-Loop Authorization Required ({pendingApprovals.length})
              </div>
              <p className="text-xs text-stone-900 font-bold">
                {pendingApprovals[0].title}
              </p>
              <p className="text-[11px] text-stone-600 mt-0.5">
                AI Recommendation: {pendingApprovals[0].aiRecommendation}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/manager/approvals')}
            className="flex items-center gap-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold px-4 py-2 text-xs transition-colors shadow-xs shrink-0"
          >
            <span>Review & Authorize in Queue</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Main Grid: Active Site Risks vs Multi-Agent Mesh */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left 7 cols: Active Site Risks */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-800 font-mono flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-rose-700" />
              Active Site Risks & Contingencies
            </span>
            <span className="text-[10px] font-mono text-stone-500">Auto-Triaged</span>
          </div>

          <div className="space-y-2.5">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`rounded-2xl border p-4 text-xs transition-all space-y-2 shadow-xs ${
                  alert.level === 'critical'
                    ? 'border-rose-200 bg-rose-50/60'
                    : 'border-amber-200 bg-amber-50/60'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                        alert.level === 'critical' ? 'bg-rose-600 animate-pulse' : 'bg-amber-600'
                      }`}
                    />
                    <h4 className="font-bold text-stone-900 text-sm">{alert.title}</h4>
                  </div>
                  <span className="text-[10px] font-mono text-stone-500">{alert.timestamp}</span>
                </div>

                <p className="text-stone-700 text-xs leading-relaxed">
                  {alert.description}
                </p>

                {alert.hasRecommendation && (
                  <div className="rounded-xl bg-white p-2.5 border border-stone-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-amber-600" />
                      <span className="text-[11px] text-stone-800 font-semibold">
                        Recovery & re-sequencing plan prepared
                      </span>
                    </div>
                    <button
                      onClick={() => navigate('/manager/recovery')}
                      className="rounded-lg bg-stone-100 hover:bg-stone-200 px-2.5 py-1 text-[11px] font-semibold text-stone-800 border border-stone-300 transition-colors shadow-xs"
                    >
                      View Matrix
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quick links to Management Sub-modules */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <button
              onClick={() => navigate('/manager/budget')}
              className="rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 p-3 text-left transition-colors shadow-xs"
            >
              <DollarSign className="h-4 w-4 text-emerald-700 mb-1" />
              <div className="text-xs font-bold text-stone-900">Budget Tool</div>
              <div className="text-[10px] text-stone-500">Change Orders & CSI</div>
            </button>
            <button
              onClick={() => navigate('/manager/contracts')}
              className="rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 p-3 text-left transition-colors shadow-xs"
            >
              <FileCheck className="h-4 w-4 text-stone-700 mb-1" />
              <div className="text-xs font-bold text-stone-900">Contracts (Sec 4.2)</div>
              <div className="text-[10px] text-stone-500">Spec Discrepancy</div>
            </button>
            <button
              onClick={() => navigate('/manager/audit')}
              className="rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 p-3 text-left transition-colors shadow-xs"
            >
              <Clock className="h-4 w-4 text-stone-700 mb-1" />
              <div className="text-xs font-bold text-stone-900">Audit Trail</div>
              <div className="text-[10px] text-stone-500">Immutable Records</div>
            </button>
          </div>
        </div>

        {/* Right 5 cols: Multi-Agent Activity Mesh */}
        <div className="lg:col-span-5 space-y-3">
          <AgentActivityPanel compact={false} />
        </div>
      </div>
    </div>
  );
};
