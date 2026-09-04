import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  X, 
  Send, 
  Mic, 
  MicOff, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ChevronRight, 
  Layers, 
  Cpu, 
  Maximize2, 
  Minimize2,
  Database,
  Satellite,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AskAssistantOverlay: React.FC = () => {
  const { 
    currentRole, 
    activePath, 
    isAssistantOpen, 
    setIsAssistantOpen, 
    assistantThread, 
    submitAssistantQuery,
    navigate,
    deviceMode
  } = useApp();

  const [inputQuery, setInputQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll when messages update
  useEffect(() => {
    if (isAssistantOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [assistantThread, isAssistantOpen]);

  // Only render on supervisor screens as specified in Part 2.3
  if (currentRole !== 'supervisor') {
    return null;
  }

  const handleSend = (text?: string) => {
    const queryToSend = (text || inputQuery).trim();
    if (!queryToSend) return;
    submitAssistantQuery(queryToSend);
    setInputQuery('');
    if (isListening) setIsListening(false);
  };

  const toggleMic = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate quick voice capture prompt
      setTimeout(() => {
        setInputQuery('What is the recovery strategy for the approaching thunderstorm?');
        setIsListening(false);
      }, 2200);
    } else {
      setIsListening(false);
    }
  };

  const samplePrompts = [
    'What is the recovery strategy for the storm pour?',
    'Check TMT 16mm rebar buffer & procurement recovery',
    'Are there revision clashes on Column C14?',
    'Audit ABC Electrical crew headcount',
    'Triage micro-cracks on Shear Wall SW-3',
  ];

  return (
    <>
      {/* 
        FLOATING ACTION BUTTON (FAB)
        Placed bottom-right, above the tab bar, on every one of the 6 supervisor screens:
        - Home (/supervisor)
        - Site Log (/supervisor/site-log)
        - Approvals & RFIs (/supervisor/approvals)
        - Capture (/supervisor/inspection)
        - Materials & Crew (/supervisor/materials)
        - Blueprint Viewer (/supervisor/blueprints)
      */}
      {!isAssistantOpen && (
        <button
          onClick={() => setIsAssistantOpen(true)}
          className={`z-40 flex items-center gap-2 rounded-full bg-stone-900 hover:bg-stone-800 text-amber-400 px-4 py-2.5 shadow-2xl border border-amber-400/30 transition-all hover:scale-105 active:scale-95 group font-sans ${
            deviceMode === 'mobile' ? 'absolute bottom-20 right-4' : 'fixed bottom-6 right-6'
          }`}
          title="Ask ConstructionOS Site Assistant"
          aria-label="Ask ConstructionOS Site Assistant"
        >
          <div className="relative flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-amber-400 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
          </div>
          <span className="text-xs font-bold text-white tracking-wide">Ask</span>
        </button>
      )}

      {/* 
        BOTTOM-SHEET INTERACTION DRAWER
        Opens from bottom, showing grounding tags, confidence labels, conversation thread, 
        and automatic defensibility audit trail logging confirmation.
      */}
      {isAssistantOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-stone-900/60 backdrop-blur-xs transition-opacity p-0 sm:p-4">
          <div 
            className={`w-full max-w-2xl bg-white border border-stone-300 shadow-2xl rounded-t-2xl sm:rounded-2xl flex flex-col transition-all duration-300 ${
              isExpanded ? 'h-[94vh]' : 'h-[85vh] sm:h-[680px]'
            }`}
          >
            {/* Sheet Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-stone-200 bg-stone-50 rounded-t-2xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-amber-400 shadow-xs">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold text-stone-900">ConstructionOS Assistant</h3>
                    <span className="inline-flex items-center gap-1 rounded bg-amber-100 text-amber-800 text-[10px] font-mono font-semibold px-1.5 py-0.5 border border-amber-300">
                      <Cpu className="h-2.5 w-2.5 text-amber-600" />
                      Multi-Agent Mesh
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-500 font-mono">
                    Grounded in live telemetry, CAD revisions, IS 456 & vendor master records
                  </p>
                </div>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="hidden sm:flex h-7 w-7 items-center justify-center rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200 transition-colors"
                  title={isExpanded ? 'Restore size' : 'Expand window'}
                >
                  {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                </button>
                <button
                  onClick={() => setIsAssistantOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200 transition-colors"
                  title="Close Assistant"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Specialist Agents Grounding Bar */}
            <div className="bg-stone-100/80 px-4 py-1.5 border-b border-stone-200 flex items-center gap-2 overflow-x-auto text-[10px] font-mono text-stone-600">
              <span className="text-stone-400 shrink-0 uppercase font-semibold">Active Agents:</span>
              <span className="bg-white border border-stone-200 rounded px-1.5 py-0.5 shrink-0 text-stone-700">
                Recovery Agent
              </span>
              <span className="bg-white border border-stone-200 rounded px-1.5 py-0.5 shrink-0 text-stone-700">
                Environmental Risk
              </span>
              <span className="bg-white border border-stone-200 rounded px-1.5 py-0.5 shrink-0 text-stone-700">
                Procurement
              </span>
              <span className="bg-white border border-stone-200 rounded px-1.5 py-0.5 shrink-0 text-stone-700">
                Blueprint & CAD
              </span>
              <span className="bg-white border border-stone-200 rounded px-1.5 py-0.5 shrink-0 text-stone-700">
                Vision Triage
              </span>
            </div>

            {/* Conversation Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50/50">
              {assistantThread.length === 0 ? (
                <div className="text-center py-10 space-y-3">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h4 className="text-sm font-bold text-stone-900">How can I assist you on site today?</h4>
                  <p className="text-xs text-stone-500 max-w-sm mx-auto">
                    Ask regarding storm recovery, concrete pour windows, rebar procurement, crew headcounts, or CAD drawing revisions.
                  </p>
                </div>
              ) : (
                assistantThread.map((msg) => (
                  <div key={msg.id} className="space-y-3">
                    {/* User Query Bubble */}
                    <div className="flex justify-end">
                      <div className="max-w-[85%] rounded-2xl rounded-tr-xs bg-stone-900 text-white px-3.5 py-2.5 shadow-sm space-y-1">
                        <div className="flex items-center justify-between gap-3 text-[10px] font-mono text-stone-400">
                          <span>Karthik Raja (Site Supervisor)</span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <p className="text-xs font-medium leading-relaxed">{msg.query}</p>
                      </div>
                    </div>

                    {/* Assistant Grounded Response Card */}
                    <div className="flex justify-start">
                      <div className="w-full max-w-[95%] rounded-2xl rounded-tl-xs bg-white border border-stone-200 p-4 shadow-sm space-y-3">
                        {/* Response Metadata Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-100 pb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="flex h-5 w-5 items-center justify-center rounded-md bg-stone-900 text-amber-400 text-[10px] font-bold">
                              AI
                            </span>
                            <span className="text-xs font-bold text-stone-900">
                              {msg.response.respondingAgentName}
                            </span>
                          </div>

                          {/* Confidence Label */}
                          <div className="flex items-center gap-1.5">
                            <span 
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-mono font-bold border ${
                                msg.response.confidence >= 90
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                  : 'bg-amber-50 text-amber-800 border-amber-300'
                              }`}
                            >
                              <ShieldCheck className="h-3 w-3" />
                              {msg.response.confidence}% Confidence
                            </span>
                            <span className="text-[10px] font-mono text-stone-400">{msg.response.timestamp}</span>
                          </div>
                        </div>

                        {/* Grounding Tags Section */}
                        <div className="space-y-1.5 bg-stone-50 rounded-xl p-2.5 border border-stone-200/80">
                          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-stone-700 uppercase tracking-wider">
                            <Database className="h-3 w-3 text-stone-500" />
                            <span>Grounded In ({msg.response.grounded_in.length} Verifiable Sources):</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {msg.response.grounded_in.map((tag, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[10px] font-mono font-medium text-stone-700 border border-stone-200 shadow-2xs"
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Executive Summary */}
                        <div className="bg-amber-50/60 border border-amber-200/60 rounded-xl p-3">
                          <p className="text-xs font-semibold text-stone-900 leading-snug">
                            {msg.response.summary}
                          </p>
                        </div>

                        {/* Detailed Analysis */}
                        <p className="text-xs text-stone-600 leading-relaxed font-normal">
                          {msg.response.detailedAnalysis}
                        </p>

                        {/* Recommended Action Options (If present) */}
                        {msg.response.recommendedOptions && msg.response.recommendedOptions.length > 0 && (
                          <div className="space-y-2 pt-1">
                            <div className="text-[11px] font-mono font-bold uppercase text-stone-700">
                              Recovery Action Matrix:
                            </div>
                            <div className="space-y-2">
                              {msg.response.recommendedOptions.map((opt) => (
                                <div
                                  key={opt.id}
                                  className={`rounded-xl p-3 border text-xs transition-all ${
                                    opt.isRecommended
                                      ? 'bg-amber-50/40 border-amber-300 ring-1 ring-amber-300/30'
                                      : 'bg-stone-50 border-stone-200'
                                  }`}
                                >
                                  <div className="flex items-center justify-between gap-2 mb-1.5">
                                    <div className="flex items-center gap-1.5">
                                      <span className="font-bold text-stone-900">{opt.label}</span>
                                      {opt.isRecommended && (
                                        <span className="bg-amber-600 text-white text-[9px] font-mono font-bold px-1.5 py-0.2 rounded">
                                          RECOMMENDED
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex items-center gap-2 font-mono text-[10px]">
                                      <span className="text-stone-700 font-semibold">{opt.costImpact}</span>
                                      <span className="text-stone-400">•</span>
                                      <span className="text-stone-700 font-semibold">{opt.scheduleImpact}</span>
                                    </div>
                                  </div>
                                  <p className="text-[11px] text-stone-600 leading-normal">
                                    {opt.actionDescription}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Audit Trail Passive Recording Tag */}
                        <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[10px] font-mono text-stone-500">
                          <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                            <FileCheck className="h-3 w-3" />
                            Logged in defensibility audit trail (Passive inquiry — no approval required)
                          </span>
                          <button
                            onClick={() => {
                              setIsAssistantOpen(false);
                              navigate('/manager/audit');
                            }}
                            className="text-stone-500 hover:text-stone-900 underline"
                          >
                            View ledger
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="px-4 py-2 bg-stone-100/60 border-t border-stone-200 overflow-x-auto flex items-center gap-1.5">
              <span className="text-[10px] font-mono text-stone-500 shrink-0">Suggestions:</span>
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(p)}
                  className="rounded-full bg-white border border-stone-200 px-2.5 py-1 text-[11px] text-stone-700 hover:bg-stone-200 hover:text-stone-900 shrink-0 transition-colors shadow-2xs"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Input & Voice Controls */}
            <div className="p-3 bg-white border-t border-stone-200 rounded-b-2xl">
              {isListening && (
                <div className="mb-2 flex items-center justify-between rounded-lg bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs text-amber-900 font-mono">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-600 animate-ping"></span>
                    Listening on field microphone... Speak clearly
                  </span>
                  <button onClick={() => setIsListening(false)} className="text-amber-700 hover:text-amber-950 font-bold">
                    Cancel
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleMic}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all ${
                    isListening
                      ? 'bg-red-500 text-white border-red-600 animate-pulse'
                      : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200'
                  }`}
                  title={isListening ? 'Stop listening' : 'Speak inquiry'}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>

                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSend();
                    }
                  }}
                  placeholder="Ask anything (e.g. storm recovery, rebar shortage, CAD changes)..."
                  className="flex-1 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5 text-xs text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-stone-400 focus:outline-none transition-colors"
                />

                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!inputQuery.trim()}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-stone-900 text-amber-400 hover:bg-stone-800 disabled:opacity-40 disabled:hover:bg-stone-900 transition-colors shadow-xs"
                  title="Send inquiry"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
