import React, { useState } from 'react';
import { 
  Camera, 
  Video, 
  Mic, 
  AlertTriangle, 
  CloudRain, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  ArrowUpRight, 
  ShieldAlert, 
  Building2,
  Users,
  Sparkles,
  Layers
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AgentActivityPanel } from '../common/AgentActivityPanel';

export const SupervisorHome: React.FC = () => {
  const { 
    project, 
    alerts, 
    tasks, 
    navigate, 
    runIncidentSimulation 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'all' | 'tasks' | 'alerts'>('all');

  return (
    <div className="space-y-4">
      {/* Top Greeting & Weather Quick Banner */}
      <div className="rounded-2xl bg-white border border-stone-200 p-4 relative overflow-hidden shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold">
              Field Operations Hub
            </span>
            <h1 className="text-lg sm:text-xl font-extrabold text-stone-900 mt-0.5">
              Good morning, Supervisor
            </h1>
            <p className="text-xs text-stone-600 mt-1">
              Project: <strong className="text-stone-900">{project.name}</strong> • Deck Level 3-5
            </p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-mono font-bold text-emerald-800 border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse" />
              SITE ACTIVE
            </span>
            <div className="text-[10px] text-stone-500 mt-1 font-mono">
              Chennai • 32°C (Humid)
            </div>
          </div>
        </div>

        {/* Live Weather Warning Bar */}
        <div className="mt-3 flex items-center justify-between rounded-xl bg-amber-50/80 p-2.5 border border-amber-200 text-xs">
          <div className="flex items-center gap-2">
            <CloudRain className="h-4 w-4 text-amber-800 animate-bounce" />
            <div>
              <span className="font-bold text-amber-950">Storm Threat @ 1:45 PM</span>
              <span className="text-[11px] text-amber-800 block sm:inline sm:ml-2">
                Level 3 concrete pour requires review
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate('/manager/approvals')}
            className="rounded-lg bg-stone-900 hover:bg-stone-800 text-white px-2.5 py-1 text-[11px] font-semibold transition-colors shrink-0 shadow-xs"
          >
            Review Recommendation
          </button>
        </div>
      </div>

      {/* Field Quick Capture Grid (Mobile-friendly large touch targets) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-700 font-mono">
            Field Quick Capture
          </span>
          <span className="text-[10px] text-stone-500">Touch to log field telemetry</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate('/supervisor/inspection')}
            className="flex items-center gap-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 p-3.5 text-left transition-all active:scale-95 group shadow-xs"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-800 group-hover:bg-stone-200 shrink-0 border border-stone-200">
              <Camera className="h-5 w-5 text-stone-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Capture Photo</div>
              <div className="text-[10px] text-stone-500">AI Damage & Crack Triage</div>
            </div>
          </button>

          <button
            onClick={() => navigate('/supervisor/site-log')}
            className="flex items-center gap-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 p-3.5 text-left transition-all active:scale-95 group shadow-xs"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-800 group-hover:bg-stone-200 shrink-0 border border-stone-200">
              <Mic className="h-5 w-5 text-stone-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Voice Log</div>
              <div className="text-[10px] text-stone-500">Dictate Shift Progress</div>
            </div>
          </button>

          <button
            onClick={() => navigate('/supervisor/site-log')}
            className="flex items-center gap-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 p-3.5 text-left transition-all active:scale-95 group shadow-xs"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-100 text-stone-800 group-hover:bg-stone-200 shrink-0 border border-stone-200">
              <Video className="h-5 w-5 text-stone-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Record Video</div>
              <div className="text-[10px] text-stone-500">Remote PM Sign-off</div>
            </div>
          </button>

          <button
            onClick={() => navigate('/supervisor/approvals')}
            className="flex items-center gap-3 rounded-2xl bg-white hover:bg-stone-50 border border-stone-200 p-3.5 text-left transition-all active:scale-95 group shadow-xs"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-800 group-hover:bg-rose-100 shrink-0 border border-rose-200">
              <AlertTriangle className="h-5 w-5 text-rose-700" />
            </div>
            <div>
              <div className="text-xs font-bold text-stone-900">Report Issue</div>
              <div className="text-[10px] text-stone-500">Raise RFI / Emergency</div>
            </div>
          </button>
        </div>
      </div>

      {/* Priority Alerts Feed */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-700 font-mono">
            Priority Alerts
          </span>
          <span className="text-[11px] font-mono text-amber-800 font-bold">
            {alerts.filter((a) => a.level === 'critical' || a.level === 'warning').length} active risks
          </span>
        </div>

        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`rounded-2xl border p-3.5 text-xs transition-all shadow-xs ${
                alert.level === 'critical'
                  ? 'border-rose-200 bg-rose-50/50'
                  : alert.level === 'warning'
                  ? 'border-amber-200 bg-amber-50/50'
                  : 'border-stone-200 bg-white text-stone-600'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 font-bold text-stone-900">
                  <span
                    className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                      alert.level === 'critical'
                        ? 'bg-rose-600 animate-ping'
                        : alert.level === 'warning'
                        ? 'bg-amber-600'
                        : 'bg-emerald-600'
                    }`}
                  />
                  <span>{alert.title}</span>
                </div>
                <span className="text-[10px] font-mono text-stone-500">{alert.timestamp}</span>
              </div>

              <p className="text-stone-700 text-[11px] leading-relaxed mt-1.5 pl-4.5">
                {alert.description}
              </p>

              {alert.hasRecommendation && (
                <div className="mt-2 pl-4.5 flex items-center justify-between">
                  <span className="text-[10px] text-amber-900 font-mono font-semibold">
                    AI recommendation prepared
                  </span>
                  <button
                    onClick={() => navigate('/manager/approvals')}
                    className="flex items-center gap-1 rounded-lg bg-stone-900 hover:bg-stone-800 px-2.5 py-1 text-[11px] font-semibold text-white transition-colors shadow-xs"
                  >
                    <span>Review Recommendation</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Today's Tasks */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-700 font-mono">
            Today's Tasks ({tasks.length})
          </span>
          <span className="text-[10px] text-stone-500 font-mono">Aug 30, 2026</span>
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="rounded-2xl border border-stone-200 bg-white p-3.5 text-xs space-y-2 shadow-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-stone-900">{task.title}</h4>
                  <div className="text-[10px] text-stone-500 mt-0.5 font-mono">
                    {task.location} • {task.assignedCrew} ({task.crewCount} workers)
                  </div>
                </div>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold capitalize shrink-0 ${
                    task.status === 'completed'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : task.status === 'delayed'
                      ? 'bg-rose-50 text-rose-800 border border-rose-200'
                      : 'bg-stone-100 text-stone-800 border border-stone-200'
                  }`}
                >
                  {task.status.replace('_', ' ')}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>Progress</span>
                  <span>{task.progress}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-stone-100 overflow-hidden border border-stone-200">
                  <div
                    className={`h-full rounded-full transition-all ${
                      task.status === 'delayed' ? 'bg-rose-600' : 'bg-stone-900'
                    }`}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>

              {task.riskFlag && (
                <div className="rounded-lg bg-rose-50 border border-rose-200 p-2 text-[10px] text-rose-900 flex items-center gap-1.5 font-medium">
                  <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-700" />
                  <span>{task.riskFlag}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono border-t border-stone-200 pt-1.5">
                <span>Deadline: {task.deadline}</span>
                <span className="text-stone-700 font-semibold">Priority: {task.priority.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Multi-agent quick preview for supervisor */}
      <AgentActivityPanel compact={true} />
    </div>
  );
};
