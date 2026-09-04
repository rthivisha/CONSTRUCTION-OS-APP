import React, { useState } from 'react';
import { 
  Inbox, 
  FileText, 
  CheckCircle2, 
  Send, 
  Clock, 
  AlertTriangle, 
  Layers, 
  Paperclip,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContractorRfis: React.FC = () => {
  const { rfis, respondToRfi } = useApp();
  const [selectedRfiId, setSelectedRfiId] = useState<string>('rfi-024');
  const [officialResponseText, setOfficialResponseText] = useState(
    'Reviewed Electrical sleeve offset. A 100mm core drill offset to Grid C14-East is structurally permissible provided supplementary 2-T16 trim bars are installed at 45° around sleeve perimeter as per typical detail S-502. Approved for execution.'
  );

  const currentRfi = rfis.find((r) => r.id === selectedRfiId) || rfis[0];

  const handleSendResponse = () => {
    if (!officialResponseText.trim()) return;
    respondToRfi(currentRfi.id, officialResponseText, 'Anand V. (Lead Architect / Engineer)');
    alert(`Official response for ${currentRfi.rfiNumber} submitted and dispatched to Field Supervisor.`);
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-emerald-800 font-bold">
            Engineering & Design Inquiries
          </span>
          <h1 className="text-lg sm:text-xl font-extrabold text-stone-900 mt-0.5">RFIs & Technical Tasks</h1>
          <p className="text-xs text-stone-600">
            Review field clarifications, provide structural sign-off & issue revised details
          </p>
        </div>
        <span className="rounded-full bg-amber-50 text-amber-900 px-3 py-1 text-xs font-mono font-bold border border-amber-300">
          {rfis.filter((r) => r.status === 'AWAITING_HUMAN_RESPONSE').length} Awaiting Response
        </span>
      </div>

      {/* Main RFI Studio Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left 4 cols: RFI List */}
        <div className="lg:col-span-4 space-y-2 max-h-[600px] overflow-y-auto">
          {rfis.map((rfi) => (
            <div
              key={rfi.id}
              onClick={() => setSelectedRfiId(rfi.id)}
              className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all space-y-2 shadow-xs ${
                selectedRfiId === rfi.id
                  ? 'bg-amber-50/50 border-amber-400 ring-1 ring-amber-300'
                  : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-amber-950">{rfi.rfiNumber}</span>
                <span
                  className={`rounded-lg px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase border ${
                    rfi.status === 'AWAITING_HUMAN_RESPONSE'
                      ? 'bg-amber-100 text-amber-950 border-amber-300'
                      : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  }`}
                >
                  {rfi.status === 'AWAITING_HUMAN_RESPONSE' ? 'NEEDS RESPONSE' : 'RESOLVED'}
                </span>
              </div>

              <h4 className="font-bold text-stone-900 text-xs line-clamp-1">{rfi.title}</h4>
              <p className="text-[11px] text-stone-600 line-clamp-2">
                "{rfi.description}"
              </p>

              <div className="flex items-center justify-between text-[10px] text-stone-500 font-mono pt-1 border-t border-stone-100">
                <span>By: {rfi.submittedBy}</span>
                <span>Priority: {rfi.priority}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Right 8 cols: Detailed RFI Response Console */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-3.5 shadow-xs">
            {/* Header info */}
            <div className="flex items-start justify-between border-b border-stone-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-amber-900 text-sm">{currentRfi.rfiNumber}</span>
                  <span className="text-stone-300">•</span>
                  <span className="text-xs text-stone-600 font-mono">{currentRfi.assignedTo}</span>
                </div>
                <h3 className="text-base font-bold text-stone-900 mt-1">{currentRfi.title}</h3>
              </div>
              <span className="text-[10px] font-mono text-stone-500 bg-stone-100 px-2 py-1 rounded-lg border border-stone-200">
                Created: {currentRfi.timestamp}
              </span>
            </div>

            {/* Field Observation Description */}
            <div className="rounded-xl bg-[#faf8f5] p-3.5 border border-stone-200 space-y-1 text-xs">
              <span className="text-[10px] font-mono uppercase text-amber-900 font-bold block">
                Supervisor Field Note:
              </span>
              <p className="text-stone-800 leading-relaxed text-xs">
                "{currentRfi.description}"
              </p>
            </div>

            {/* AI Synthesized Design Suggestion */}
            <div className="rounded-xl bg-amber-50/40 p-3.5 border border-amber-200 space-y-1 text-xs">
              <span className="text-[10px] font-mono uppercase text-amber-900 font-bold block">
                AI Suggestion (Synthesized from Structural Grid S-502):
              </span>
              <p className="text-stone-800 leading-relaxed text-xs">
                {currentRfi.aiSuggestedRoute}
              </p>
              <div className="text-[10px] font-mono text-amber-900 font-semibold pt-1">
                Recommendation: {currentRfi.aiSuggestedNextStep}
              </div>
            </div>

            {/* Official Response Composer */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs text-stone-800">
                <span className="font-bold font-mono uppercase text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  Official Engineering Sign-off & Instructions:
                </span>
                <span className="text-[10px] text-stone-500 font-mono">Stamp: Architect of Record</span>
              </div>

              <textarea
                rows={4}
                value={officialResponseText}
                onChange={(e) => setOfficialResponseText(e.target.value)}
                placeholder="Type official structural instruction, attach sketch, or modify AI draft..."
                className="w-full rounded-xl bg-stone-50 border border-stone-200 p-3 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-500 font-sans"
              />

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <button
                  onClick={() => alert('Detail sketch SK-104 attached to RFI response.')}
                  className="flex items-center gap-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 px-3 py-1.5 text-xs font-semibold border border-stone-200 shadow-xs"
                >
                  <Paperclip className="h-3.5 w-3.5" />
                  <span>Attach Detail Sketch (SK-104.pdf)</span>
                </button>

                <button
                  onClick={handleSendResponse}
                  className="flex items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-5 py-2 text-xs transition-colors shadow-xs"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Official Response & Resolve RFI</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
