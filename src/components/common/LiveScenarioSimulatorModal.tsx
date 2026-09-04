import React, { useState, useEffect } from 'react';
import { 
  X, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  CloudRain, 
  Cpu, 
  DollarSign, 
  Database, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  Send, 
  Clock, 
  ArrowRight,
  UserCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LiveScenarioSimulatorModal: React.FC = () => {
  const { 
    isSimulatorOpen, 
    setIsSimulatorOpen, 
    simulatorStep, 
    advanceSimulatorStep, 
    resetIncidentSimulation,
    approveItem,
    navigate
  } = useApp();

  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [selectedRecoveryOption, setSelectedRecoveryOption] = useState<'A' | 'B' | 'C'>('B');

  const steps = [
    {
      stepNum: 1,
      agent: 'Environmental Risk Agent',
      icon: <CloudRain className="h-5 w-5 text-blue-400" />,
      title: '1. Storm Front Detected via Doppler Radar',
      desc: 'Radar telemetry ingests approaching 38mm/hr thunderstorm front 14km SW of Chennai site.',
      telemetry: 'Probability: 85% | Expected Arrival: 1:45 PM IST | Pour Window Collision: High',
      status: 'complete',
    },
    {
      stepNum: 2,
      agent: 'Coordination Orchestrator',
      icon: <Cpu className="h-5 w-5 text-purple-400" />,
      title: "2. Schedule Cross-Reference: Level 3 Slab Pour",
      desc: 'Orchestrator cross-checks active daily task registry and identifies critical collision with 42m³ concrete pour.',
      telemetry: 'Task: TSK-004 Level 3 Slab Pour | Scheduled Start: 2:00 PM | Mixer Fleet: 6 Trucks',
      status: 'complete',
    },
    {
      stepNum: 3,
      agent: 'Cost Estimation Agent',
      icon: <DollarSign className="h-5 w-5 text-amber-400" />,
      title: '3. Financial Exposure & Washout Damage Calculation',
      desc: 'Models structural damage exposure if concrete is washed out before initial 4-hour set time.',
      telemetry: 'Estimated Exposure: $18,400 (Wasted concrete + hydro-demolition + surface grinding)',
      status: 'complete',
    },
    {
      stepNum: 4,
      agent: 'Project Memory Agent',
      icon: <Database className="h-5 w-5 text-teal-400" />,
      title: '4. Historical Precedent Retrieval',
      desc: 'Queries past project logs. Retrieves October 2025 Level 2 storm event where dawn pour recovery saved $35k in rework.',
      telemetry: 'Precedent: RCT-CHN-L2-Pour-08 (100% QA pass rate, zero cold-joint defects)',
      status: 'complete',
    },
    {
      stepNum: 5,
      agent: 'Recovery Strategy Agent',
      icon: <Sparkles className="h-5 w-5 text-rose-400" />,
      title: '5. Synthesis of 3 Ranked Recovery Options',
      desc: 'Generates Option A (24h Delay), Option B (04:30 AM Dawn Pour - Recommended), Option C (Tarpaulin Canopy).',
      telemetry: 'Option B selected as optimal balance (+0.5 days vs +1.5 days delay)',
      status: 'complete',
    },
    {
      stepNum: 6,
      agent: 'Human Approval Gate',
      icon: <ShieldCheck className="h-5 w-5 text-amber-400" />,
      title: '6. Approval Request Dispatched to Project Manager',
      desc: 'Awaiting human authorization in Manager Approvals Inbox. AI execution locked.',
      telemetry: 'Hard Constraint: Zero automated action taken. Human authorization mandatory.',
      status: 'pending_human',
    },
    {
      stepNum: 7,
      agent: 'Project Manager (Human)',
      icon: <UserCheck className="h-5 w-5 text-emerald-400" />,
      title: '7. Manager Reviews Evidence & Authorizes Option B',
      desc: 'Project Manager clicks APPROVE on Option B. Authorizes truck hold and dawn pour reschedule.',
      telemetry: 'Authorized by: Vikram Malhotra (Project Manager) | Token Generated',
      status: 'human_action',
    },
    {
      stepNum: 8,
      agent: 'Documentation Agent',
      icon: <FileText className="h-5 w-5 text-indigo-400" />,
      title: '8. Automated Drafting of Supplier & Crew Notices',
      desc: 'Drafts formal UltraTech batching hold notice and Shree Civil early morning roster shift.',
      telemetry: 'Notice #NOT-2026-881 generated with zero penalty force majeure citation.',
      status: 'complete',
    },
    {
      stepNum: 9,
      agent: 'Coordination Mesh',
      icon: <Send className="h-5 w-5 text-blue-400" />,
      title: '9. Notice Dispatched & Subcontractors Notified',
      desc: 'UltraTech plant acknowledges dispatch hold; Shree Civil confirms 04:30 AM pump mobilization.',
      telemetry: 'Acknowledgment Received from UltraTech Dispatcher at 10:22 AM IST',
      status: 'complete',
    },
    {
      stepNum: 10,
      agent: 'Execution Gate',
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-400" />,
      title: '10. Task Registry Updated & Dashboard Synced',
      desc: 'Level 3 pour scheduled for tomorrow 06:00 AM. Supervisor and night shift briefed.',
      telemetry: 'Schedule Delta: +0.5 Days | Critical Path Protected',
      status: 'complete',
    },
    {
      stepNum: 11,
      agent: 'Audit Trail Engine',
      icon: <FileText className="h-5 w-5 text-emerald-400" />,
      title: '11. Immutable Audit Log Recorded',
      desc: 'Full end-to-end trace archived with timestamps, model IDs, inputs, outputs, and human sign-off.',
      telemetry: 'Audit Hash: 0x8f4c21a99e7b23d | Provable for site inspectors and insurers',
      status: 'complete',
    },
  ];

  // Auto-play effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (autoPlay && simulatorStep < 11 && simulatorStep > 0) {
      timer = setTimeout(() => {
        advanceSimulatorStep();
      }, 2000);
    } else if (simulatorStep >= 11) {
      setAutoPlay(false);
    }
    return () => clearTimeout(timer);
  }, [autoPlay, simulatorStep]);

  if (!isSimulatorOpen) return null;

  const currentStepData = steps[Math.max(0, simulatorStep - 1)];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-stone-200 shadow-2xl p-5 sm:p-6 space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-800 border border-amber-300">
              <Sparkles className="h-4 w-4" />
            </span>
            <div>
              <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
                Live Multi-Agent Scenario Simulator
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold">
                  Storm Disruption Demo
                </span>
              </h2>
              <p className="text-xs text-stone-500">
                End-to-end proof: Observe → Analyze → Recommend → Human Approval → Execute → Audit
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSimulatorOpen(false)}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-stone-500 font-semibold">
              Step {simulatorStep === 0 ? 0 : simulatorStep} of 11
            </span>
            <span className="text-amber-800 font-bold">
              {simulatorStep === 0 && 'Ready to start'}
              {simulatorStep > 0 && simulatorStep < 6 && 'Agents Ingesting & Analyzing'}
              {simulatorStep === 6 && 'Awaiting Human Approval Gate'}
              {simulatorStep === 7 && 'Human Authorization Granted'}
              {simulatorStep > 7 && simulatorStep < 11 && 'Executing Post-Approval Dispatch'}
              {simulatorStep >= 11 && 'Workflow Complete & Audited'}
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-600 via-stone-700 to-emerald-600 transition-all duration-300"
              style={{ width: `${(simulatorStep / 11) * 100}%` }}
            />
          </div>
        </div>

        {/* Active Step Visual Display */}
        {simulatorStep === 0 ? (
          <div className="rounded-2xl border border-dashed border-stone-300 bg-stone-50 p-6 text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-800 border border-amber-300">
              <CloudRain className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                Simulate Real-time Incident: Heavy Rain vs Level 3 Concrete Pour
              </h3>
              <p className="text-xs text-stone-600 max-w-md mx-auto mt-1">
                Walk through the entire 11-step autonomous coordination cycle. See how 5 agents correlate weather, schedule, and cost before stopping at the human approval gate.
              </p>
            </div>
            <button
              onClick={() => {
                advanceSimulatorStep();
                setAutoPlay(true);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-stone-900 hover:bg-stone-800 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-all"
            >
              <Play className="h-4 w-4" />
              <span>Start Live Incident Simulation</span>
            </button>
          </div>
        ) : (
          <div className="rounded-2xl border border-stone-200 bg-[#faf8f5] p-4 space-y-3 shadow-xs">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-stone-200 shadow-xs">
                  {currentStepData.icon}
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-amber-800 uppercase">
                    {currentStepData.agent}
                  </span>
                  <h3 className="text-sm font-bold text-stone-900">{currentStepData.title}</h3>
                </div>
              </div>
              <span className="rounded-full px-2 py-0.5 text-[10px] font-mono font-bold bg-white text-stone-700 border border-stone-200 shadow-xs">
                Step {currentStepData.stepNum}/11
              </span>
            </div>

            <p className="text-xs text-stone-800 leading-relaxed bg-white p-3 rounded-xl border border-stone-200 shadow-xs">
              {currentStepData.desc}
            </p>

            <div className="rounded-xl bg-stone-100 p-2.5 border border-stone-200 font-mono text-[11px] text-stone-600 space-y-1">
              <div className="text-[10px] uppercase text-stone-500 font-bold">Telemetry Data:</div>
              <div className="text-stone-900 font-semibold">{currentStepData.telemetry}</div>
            </div>

            {/* Special Interactive Human Gate for Step 6 */}
            {simulatorStep === 6 && (
              <div className="rounded-xl border-2 border-amber-400 bg-amber-50 p-4 space-y-3 mt-2 shadow-xs">
                <div className="flex items-center gap-2 text-amber-950 text-xs font-bold font-mono">
                  <ShieldCheck className="h-4 w-4 text-amber-700" />
                  <span>ACTION REQUIRED: PROJECT MANAGER SIGN-OFF</span>
                </div>
                <div className="text-xs text-stone-900 space-y-2">
                  <div className="p-2.5 rounded-lg bg-white border border-amber-300">
                    <span className="text-amber-900 font-bold">Option B (Recommended):</span> Reschedule pour to 04:30 AM dawn window. Cost impact: +$24k | Schedule: +0.5 days.
                  </div>
                  <div className="text-[11px] text-amber-950 font-semibold">
                    AI cannot execute truck hold without human authorization. Click Approve to authorize.
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      approveItem('APP-081');
                      advanceSimulatorStep();
                    }}
                    className="flex-1 rounded-xl bg-emerald-700 hover:bg-emerald-600 py-2 text-xs font-bold text-white shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Approve Option B (Dawn Pour)</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step List Timeline */}
        <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
          {steps.map((st) => (
            <div
              key={st.stepNum}
              className={`flex items-center justify-between rounded-xl p-2 text-xs transition-colors ${
                st.stepNum === simulatorStep
                  ? 'bg-amber-50 border border-amber-300 text-stone-900 font-bold shadow-xs'
                  : st.stepNum < simulatorStep
                  ? 'text-stone-600 bg-stone-50'
                  : 'text-stone-400'
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                {st.stepNum < simulatorStep ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                ) : st.stepNum === simulatorStep ? (
                  <span className="h-2 w-2 rounded-full bg-amber-600 animate-ping shrink-0" />
                ) : (
                  <span className="h-2 w-2 rounded-full bg-stone-300 shrink-0" />
                )}
                <span className="truncate">{st.title}</span>
              </div>
              <span className="text-[10px] font-mono shrink-0 ml-2 font-bold">
                {st.stepNum < simulatorStep ? 'DONE' : st.stepNum === simulatorStep ? 'ACTIVE' : 'QUEUED'}
              </span>
            </div>
          ))}
        </div>

        {/* Modal Controls */}
        <div className="flex items-center justify-between border-t border-stone-200 pt-3">
          <button
            onClick={resetIncidentSimulation}
            className="flex items-center gap-1.5 rounded-xl border border-stone-300 px-3 py-1.5 text-xs text-stone-700 hover:bg-stone-50 font-semibold transition-colors shadow-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset Simulation</span>
          </button>

          <div className="flex items-center gap-2">
            {simulatorStep > 0 && simulatorStep < 11 && simulatorStep !== 6 && (
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold border transition-colors shadow-xs ${
                  autoPlay
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-white text-stone-800 border-stone-300'
                }`}
              >
                {autoPlay ? 'Pause' : 'Auto Play'}
              </button>
            )}

            {simulatorStep < 11 && simulatorStep !== 6 && (
              <button
                onClick={advanceSimulatorStep}
                className="flex items-center gap-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 px-4 py-1.5 text-xs font-bold text-white shadow-xs transition-colors"
              >
                <span>{simulatorStep === 0 ? 'Start' : 'Next Step'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}

            {simulatorStep >= 11 && (
              <button
                onClick={() => {
                  setIsSimulatorOpen(false);
                  navigate('/manager/audit');
                }}
                className="flex items-center gap-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow-xs transition-colors"
              >
                <CheckCircle2 className="h-4 w-4" />
                <span>View Full Audit Trail</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
