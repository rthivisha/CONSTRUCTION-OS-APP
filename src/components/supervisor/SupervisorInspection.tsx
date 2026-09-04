import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  AlertTriangle, 
  Eye, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Plus,
  Layers,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SupervisorInspection: React.FC = () => {
  const { inspections, addInspectionScan, navigate } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(
    'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80'
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzedScan, setAnalyzedScan] = useState<any>({
    location: 'Tower A — Level 2 Shear Wall SW-3',
    issue: 'Surface Cracking Visible Near Column Joint',
    confidence: 82,
    details: '0.3mm non-structural hairline crack pattern observed 400mm above kick-plate joint. Appears related to plastic shrinkage.',
    suggestedAction: 'Escalate to Structural Engineer for verification. Preliminary check indicates non-critical shrinkage crack.',
  });

  const sampleImages = [
    {
      label: 'Concrete Column Surface Crack',
      url: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80',
      issue: 'Surface Cracking Visible Near Column Joint',
      confidence: 82,
    },
    {
      label: 'Rebar Cover & Chair Spacing',
      url: 'https://images.unsplash.com/photo-1541888946425-d0fbb180c5f5?auto=format&fit=crop&w=600&q=80',
      issue: 'Clear Cover Block Alignment Verified',
      confidence: 94,
    },
    {
      label: 'Conduit & Rebar Congestion',
      url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
      issue: 'Conduit Clearance Clash with Shear Tie',
      confidence: 89,
    },
  ];

  const handleSelectSample = (sample: typeof sampleImages[0]) => {
    setSelectedImage(sample.url);
    setIsAnalyzing(true);
    setTimeout(() => {
      setAnalyzedScan({
        location: 'Tower A — Level 3 Grid 4-8',
        issue: sample.issue,
        confidence: sample.confidence,
        details: `${sample.issue} observed during visual triage scan. Evaluated against IS 456 visual standards.`,
        suggestedAction: sample.confidence < 90 ? 'Escalate to structural engineer for review.' : 'Save to QA inspection log.',
      });
      setIsAnalyzing(false);
    }, 800);
  };

  const handleCreateReviewRequest = () => {
    addInspectionScan({
      imageUrl: selectedImage || '',
      location: analyzedScan.location,
      aiDetectedIssues: [
        {
          label: analyzedScan.issue,
          confidence: analyzedScan.confidence,
          description: analyzedScan.details,
        },
      ],
      suggestedAction: analyzedScan.suggestedAction,
    });
    alert('Inspection request escalated to Structural Engineer with high-res photo overlay.');
  };

  const handleSaveToLog = () => {
    addInspectionScan({
      imageUrl: selectedImage || '',
      location: analyzedScan.location,
      status: 'verified_safe',
    });
    alert('Saved to permanent site inspection audit trail.');
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold">
            Computer Vision Triage
          </span>
          <h1 className="text-lg font-bold text-neutral-100">Damage / Inspection Capture</h1>
          <p className="text-xs text-neutral-400">
            Upload site photo for preliminary AI defect triage & engineering routing
          </p>
        </div>
      </div>

      {/* Large Photo Upload / Camera Area */}
      <div className="rounded-2xl border-2 border-dashed border-neutral-700 bg-neutral-900/60 p-4 text-center space-y-3">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
          <Camera className="h-6 w-6" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-neutral-200">
            Capture or Upload Site Condition
          </h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-0.5">
            Snap photos of rebar, concrete cracks, formwork, or conduit congestion.
          </p>
        </div>

        {/* Preset Sample Images */}
        <div className="pt-2">
          <div className="text-[10px] font-mono uppercase text-neutral-500 mb-2">
            Select Field Test Capture:
          </div>
          <div className="grid grid-cols-3 gap-2">
            {sampleImages.map((s, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSample(s)}
                className={`relative rounded-xl overflow-hidden border-2 text-left transition-all ${
                  selectedImage === s.url
                    ? 'border-amber-500 ring-2 ring-amber-500/30'
                    : 'border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <img
                  src={s.url}
                  alt={s.label}
                  className="h-16 w-full object-cover"
                />
                <div className="p-1 bg-neutral-950 text-[9px] font-semibold text-neutral-300 truncate">
                  {s.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mock AI Analysis Results Canvas */}
      {selectedImage && (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded bg-cyan-500/20 text-cyan-400">
                <Eye className="h-4 w-4" />
              </div>
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold">
                VISION AGENT — SURFACE TRIAGE
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Confidence: {analyzedScan.confidence}%
            </span>
          </div>

          {/* Image preview with bounding box simulation */}
          <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950">
            <img
              src={selectedImage}
              alt="Site Inspection"
              className="w-full h-48 sm:h-64 object-cover"
            />
            {/* Simulated Bounding Box */}
            <div className="absolute top-1/4 left-1/3 w-1/3 h-1/3 border-2 border-rose-500 bg-rose-500/10 rounded pointer-events-none animate-pulse">
              <span className="absolute -top-5 left-0 rounded bg-rose-600 px-1.5 py-0.2 text-[9px] font-mono font-bold text-white shadow-xs">
                CRACK: 0.3mm (82%)
              </span>
            </div>
          </div>

          {/* Analysis Findings */}
          <div className="rounded-xl bg-neutral-950 p-3 border border-neutral-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-neutral-100 text-sm">{analyzedScan.issue}</span>
              <span className="text-[10px] font-mono text-neutral-400">{analyzedScan.location}</span>
            </div>
            <p className="text-neutral-300 text-xs leading-relaxed">
              "{analyzedScan.details}"
            </p>
            <div className="text-[11px] text-blue-400 font-mono pt-1 border-t border-neutral-800/80">
              Suggested next step: {analyzedScan.suggestedAction}
            </div>
          </div>

          {/* CRITICAL PRODUCT DISCLAIMER */}
          <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-3 text-xs text-amber-200/90 flex items-start gap-2.5">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-amber-300 block mb-0.5">Important Safety Disclaimer:</strong>
              AI analysis is preliminary triage and does not determine structural safety. Qualified licensed structural engineer sign-off is required for all load-bearing elements.
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleCreateReviewRequest}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold py-2.5 text-xs transition-colors shadow-md"
            >
              <FileCheck className="h-4 w-4" />
              <span>Create Review Request</span>
            </button>
            <button
              onClick={handleSaveToLog}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold py-2.5 text-xs border border-neutral-700 transition-colors"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>Save to Inspection Log</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
