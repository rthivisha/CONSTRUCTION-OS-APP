import React from 'react';
import { X, FileText, Download, Printer, CheckCircle, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PdfPreviewModal: React.FC = () => {
  const { isPdfPreviewOpen, setIsPdfPreviewOpen, shiftHandoff, project } = useApp();

  if (!isPdfPreviewOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200 bg-[#faf8f5]">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-amber-700" />
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                Shift Handoff Log — Document Preview
              </h3>
              <p className="text-[11px] text-stone-500 font-mono">
                {shiftHandoff.id} • {shiftHandoff.date}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => alert('PDF export simulated. File RCT_Shift_Handoff_Aug30.pdf ready for download.')}
              className="flex items-center gap-1 rounded-xl bg-stone-900 hover:bg-stone-800 px-3 py-1.5 text-xs text-stone-100 font-bold transition-colors shadow-xs"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={() => setIsPdfPreviewOpen(false)}
              className="p-1 rounded text-stone-400 hover:text-stone-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Visual PDF Sheet Canvas */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-stone-100/80">
          <div className="mx-auto max-w-xl bg-white text-stone-900 p-6 sm:p-8 rounded-xl shadow-md font-sans space-y-6 text-xs border border-stone-200">
            {/* PDF Header */}
            <div className="border-b-2 border-stone-900 pb-4 flex justify-between items-start">
              <div>
                <h1 className="text-lg font-black tracking-tight text-stone-900">
                  CONSTRUCTION<span className="text-amber-700">OS</span>
                </h1>
                <div className="text-[10px] uppercase font-mono tracking-widest text-stone-500 mt-0.5 font-bold">
                  Official Site Shift Handover Record
                </div>
              </div>
              <div className="text-right text-[11px] font-mono text-stone-600">
                <div>DOC REF: <strong className="text-stone-900">{shiftHandoff.id}</strong></div>
                <div>DATE: <strong className="text-stone-900">{shiftHandoff.date}</strong></div>
                <div>SHIFT: <strong className="text-stone-900">{shiftHandoff.shiftType}</strong></div>
              </div>
            </div>

            {/* Project Details Box */}
            <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 rounded-xl text-[11px] border border-stone-200">
              <div>
                <span className="text-stone-500 block">Project:</span>
                <strong className="text-stone-900">{project.name}</strong>
              </div>
              <div>
                <span className="text-stone-500 block">Location:</span>
                <strong className="text-stone-900">{project.location}</strong>
              </div>
              <div>
                <span className="text-stone-500 block">Supervisor:</span>
                <strong className="text-stone-900">{shiftHandoff.supervisor}</strong>
              </div>
              <div>
                <span className="text-stone-500 block">Phase:</span>
                <strong className="text-stone-900">{project.phase}</strong>
              </div>
            </div>

            {/* Section 1: Completed Tasks */}
            <div className="space-y-1.5">
              <h3 className="font-bold text-stone-900 uppercase text-[11px] border-b border-stone-200 pb-1 flex items-center gap-1.5">
                <span className="h-2 w-2 bg-emerald-600 rounded-full"></span>
                1. Completed Works & Inspections
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-stone-700">
                {shiftHandoff.completedTasks.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>

            {/* Section 2: Pending Tasks & Holds */}
            <div className="space-y-1.5">
              <h3 className="font-bold text-stone-900 uppercase text-[11px] border-b border-stone-200 pb-1 flex items-center gap-1.5">
                <span className="h-2 w-2 bg-amber-600 rounded-full"></span>
                2. Pending Operations & Schedule Holds
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-stone-700">
                {shiftHandoff.pendingTasks.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>

            {/* Section 3: Active Environmental & Procurement Risks */}
            <div className="space-y-1.5">
              <h3 className="font-bold text-stone-900 uppercase text-[11px] border-b border-stone-200 pb-1 flex items-center gap-1.5">
                <span className="h-2 w-2 bg-rose-600 rounded-full"></span>
                3. Active Critical Site Risks
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-stone-700">
                {shiftHandoff.activeRisks.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>

            {/* Section 4: Materials Consumed */}
            <div className="space-y-1.5">
              <h3 className="font-bold text-stone-900 uppercase text-[11px] border-b border-stone-200 pb-1">
                4. Materials Consumed
              </h3>
              <div className="grid grid-cols-3 gap-2 text-stone-700">
                {shiftHandoff.materialsUsed.map((m, idx) => (
                  <div key={idx} className="p-1.5 bg-stone-50 rounded-lg border border-stone-200 text-[10px]">
                    {m}
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Handover Instructions */}
            <div className="space-y-1.5 p-3 bg-amber-50/70 rounded-xl border border-amber-200">
              <h3 className="font-bold text-amber-950 uppercase text-[11px]">
                5. Night Shift Action Priorities
              </h3>
              <ul className="list-decimal pl-5 space-y-1 text-amber-950 text-[11px]">
                {shiftHandoff.nextShiftPriorities.map((p, idx) => (
                  <li key={idx}>{p}</li>
                ))}
              </ul>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-stone-200">
              <div className="space-y-2">
                <span className="text-[10px] text-stone-500 uppercase block font-semibold">Outbound Supervisor Sign-off:</span>
                <div className="font-serif italic text-sm text-stone-800 border-b border-stone-300 pb-1">
                  Karthik Raja
                </div>
                <div className="text-[9px] text-stone-500 font-mono">Timestamp: 11:30 AM IST</div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] text-stone-500 uppercase block font-semibold">Inbound Shift Acknowledgment:</span>
                <div className="font-serif italic text-sm text-stone-800 border-b border-stone-300 pb-1">
                  {shiftHandoff.acknowledgedBy || 'Pending Incoming Handover'}
                </div>
                <div className="text-[9px] text-stone-500 font-mono">
                  {shiftHandoff.signedOff ? 'Status: VERIFIED & SIGNED' : 'Status: AWAITING INBOUND RECEIPT'}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-[9px] text-stone-500 text-center border-t border-stone-200 pt-3">
              Generated by ConstructionOS Documentation Agent • Certified immutable digital log • Verified under ISO 9001 QA standard
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
