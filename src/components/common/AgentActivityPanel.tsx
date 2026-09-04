import React from 'react';
import { 
  Bot, 
  Cpu, 
  CloudRain, 
  DollarSign, 
  Layers, 
  Truck, 
  Eye, 
  FileCheck, 
  Database, 
  ArrowDown, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AgentType } from '../../types';

export const AgentActivityPanel: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { agents, runIncidentSimulation } = useApp();

  const getAgentIcon = (id: AgentType) => {
    switch (id) {
      case 'orchestrator': return <Cpu className="h-4 w-4 text-purple-700" />;
      case 'environmental': return <CloudRain className="h-4 w-4 text-blue-700" />;
      case 'cost': return <DollarSign className="h-4 w-4 text-amber-700" />;
      case 'blueprint': return <Layers className="h-4 w-4 text-indigo-700" />;
      case 'procurement': return <Truck className="h-4 w-4 text-emerald-700" />;
      case 'vision': return <Eye className="h-4 w-4 text-cyan-700" />;
      case 'contract': return <FileCheck className="h-4 w-4 text-orange-700" />;
      case 'recovery': return <Sparkles className="h-4 w-4 text-rose-700" />;
      case 'memory': return <Database className="h-4 w-4 text-teal-700" />;
      default: return <Bot className="h-4 w-4 text-stone-500" />;
    }
  };

  const getStatusIndicator = (status: string) => {
    switch (status) {
      case 'analyzing':
      case 'recommending':
        return (
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
        );
      case 'observing':
      case 'complete':
        return <span className="h-2 w-2 rounded-full bg-emerald-600"></span>;
      default:
        return <span className="h-2 w-2 rounded-full bg-stone-300"></span>;
    }
  };

  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-4 shadow-sm text-stone-900">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-stone-100 text-stone-800 border border-stone-200">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              Multi-Agent Coordination Mesh
              <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded-full bg-stone-100 text-stone-800 border border-stone-300">
                11 Active Agents
              </span>
            </h3>
            <p className="text-[11px] text-stone-500">Continuous telemetry, risk triage & option synthesis</p>
          </div>
        </div>

        <button
          onClick={runIncidentSimulation}
          className="flex items-center gap-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-100 px-2.5 py-1.5 text-xs font-semibold transition-colors shadow-xs"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>Simulate Incident</span>
        </button>
      </div>

      {/* Visual Pipeline Representation */}
      <div className="space-y-3">
        {/* Tier 1: Orchestrator */}
        <div className="rounded-xl bg-[#faf8f5] border border-stone-300 p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-stone-200 text-stone-800">
              <Cpu className="h-3.5 w-3.5" />
            </span>
            <div>
              <div className="text-xs font-mono font-bold text-stone-900">ORCHESTRATOR</div>
              <div className="text-[10px] text-stone-500">Event Router & Permission Boundary</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
            ACTIVE ROUTING
          </div>
        </div>

        {/* Down connector */}
        <div className="flex justify-center -my-1 text-stone-400">
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </div>

        {/* Tier 2: Parallel Specialist Agents Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {agents
            .filter((a) => a.id !== 'orchestrator' && a.id !== 'recovery')
            .slice(0, compact ? 4 : 6)
            .map((agent) => (
              <div
                key={agent.id}
                className="rounded-xl bg-[#faf8f5] border border-stone-200 p-2 text-xs space-y-1 hover:border-stone-300 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-semibold text-stone-800 truncate">
                    {getAgentIcon(agent.id)}
                    <span className="truncate text-[11px]">{agent.name.split(' ')[0]}</span>
                  </div>
                  {getStatusIndicator(agent.status)}
                </div>
                <div className="text-[10px] text-stone-500 line-clamp-1">
                  {agent.lastAction}
                </div>
              </div>
            ))}
        </div>

        {/* Down connector */}
        <div className="flex justify-center -my-1 text-stone-400">
          <ArrowDown className="h-3.5 w-3.5" />
        </div>

        {/* Tier 3: Recovery Strategy Synthesis */}
        <div className="rounded-xl bg-[#faf8f5] border border-rose-200 p-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-rose-100 text-rose-800">
              <Sparkles className="h-3.5 w-3.5" />
            </span>
            <div>
              <div className="text-xs font-mono font-bold text-rose-900">RECOVERY AGENT</div>
              <div className="text-[10px] text-stone-500">Synthesizes 3 Ranked Action Options with Precedent</div>
            </div>
          </div>
          <span className="text-[10px] font-mono text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 font-semibold">
            3 OPTIONS DRAFTED
          </span>
        </div>

        {/* Down connector */}
        <div className="flex justify-center -my-1 text-stone-400">
          <ArrowDown className="h-3.5 w-3.5 text-amber-600" />
        </div>

        {/* Tier 4: Human Approval Gate */}
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-2.5 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-300">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div>
              <div className="text-xs font-mono font-bold text-amber-950">HUMAN APPROVAL GATE</div>
              <div className="text-[10px] text-amber-800">Mandatory Human Sign-off Before Any Action</div>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-amber-950 bg-amber-200/80 px-2 py-0.5 rounded border border-amber-300 animate-pulse">
            REVIEW REQUIRED
          </span>
        </div>
      </div>
    </div>
  );
};
