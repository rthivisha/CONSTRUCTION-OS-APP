import React, { useState } from 'react';
import { 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  Eye, 
  ShieldCheck, 
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SupervisorBlueprints: React.FC = () => {
  const { blueprints, activeBlueprintId, setActiveBlueprintId } = useApp();
  const [selectedLevel, setSelectedLevel] = useState<string>('Level 3');
  const [showDiffOverlay, setShowDiffOverlay] = useState(true);
  const [activeMarker, setActiveMarker] = useState<any | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  const levels = ['Ground Floor', 'Level 1', 'Level 2', 'Level 3', 'Roof Deck', 'MEP Overlay', 'Structural Grid'];

  const currentBlueprint = blueprints.find((b) => b.id === activeBlueprintId) || blueprints[0];

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold">
            Field Plans & CAD Diffs
          </span>
          <h1 className="text-lg font-bold text-neutral-100">Blueprint Viewer</h1>
          <p className="text-xs text-neutral-400">
            Compare revisions, highlight clashes & inspect engineering notes
          </p>
        </div>
      </div>

      {/* Level Tabs Carousel */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {levels.map((lvl) => (
          <button
            key={lvl}
            onClick={() => setSelectedLevel(lvl)}
            className={`rounded-lg px-3 py-1.5 font-medium whitespace-nowrap transition-colors ${
              selectedLevel === lvl
                ? 'bg-amber-500 text-neutral-950 font-bold shadow-xs'
                : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800'
            }`}
          >
            {lvl}
          </button>
        ))}
      </div>

      {/* Revision Diff Comparison Header */}
      <div className="rounded-xl bg-neutral-900 border border-neutral-800 p-3 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-neutral-200 font-mono">{currentBlueprint.code}</span>
          <span className="text-neutral-400 font-mono">
            {currentBlueprint.revisionPrevious} ➔ <strong className="text-emerald-400">{currentBlueprint.revisionCurrent}</strong>
          </span>
          <span className="rounded bg-purple-500/20 text-purple-300 text-[10px] font-mono px-2 py-0.5 border border-purple-500/30">
            {currentBlueprint.changesDetected.length} Changes Detected
          </span>
        </div>

        <div className="flex items-center gap-2">
          <label className="flex items-center gap-1.5 cursor-pointer select-none text-neutral-300">
            <input
              type="checkbox"
              checked={showDiffOverlay}
              onChange={(e) => setShowDiffOverlay(e.target.checked)}
              className="rounded bg-neutral-950 border-neutral-700 text-amber-500 focus:ring-0"
            />
            <span className="text-[11px] font-mono">Highlight Diffs</span>
          </label>
        </div>
      </div>

      {/* Interactive Blueprint Canvas Simulation */}
      <div className="relative rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden shadow-2xl min-h-[340px] sm:min-h-[420px] flex flex-col justify-between">
        {/* Canvas Toolbar Controls */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-xl bg-neutral-900/90 border border-neutral-800 p-1 backdrop-blur-xs">
          <button
            onClick={() => setZoomLevel((prev) => Math.min(prev + 20, 200))}
            className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            onClick={() => setZoomLevel((prev) => Math.max(prev - 20, 60))}
            className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <button
            onClick={() => setZoomLevel(100)}
            className="p-1.5 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-800 text-[10px] font-mono"
            title="Reset Zoom"
          >
            {zoomLevel}%
          </button>
        </div>

        {/* Blueprint CAD Graphic Visualizer */}
        <div 
          className="w-full flex-1 flex items-center justify-center p-6 transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel / 100})` }}
        >
          <svg className="w-full max-w-lg h-72 border border-neutral-800 bg-neutral-900/40 rounded-xl" viewBox="0 0 500 320">
            {/* Architectural Grid Lines */}
            <defs>
              <pattern id="cadGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#262626" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cadGrid)" />

            {/* Building Outer Perimeter */}
            <rect x="50" y="40" width="400" height="240" fill="none" stroke="#525252" strokeWidth="2" strokeDasharray="4 2" />
            
            {/* Core Structural Shear Walls */}
            <rect x="210" y="100" width="80" height="120" fill="#262626" stroke="#a3a3a3" strokeWidth="1.5" />
            <text x="250" y="165" fill="#737373" fontSize="9" textAnchor="middle" fontFamily="monospace">LIFT CORE</text>

            {/* Beam Grids */}
            <line x1="50" y1="120" x2="450" y2="120" stroke="#404040" strokeWidth="1.5" />
            <line x1="50" y1="200" x2="450" y2="200" stroke="#404040" strokeWidth="1.5" />
            <line x1="140" y1="40" x2="140" y2="280" stroke="#404040" strokeWidth="1.5" />
            <line x1="360" y1="40" x2="360" y2="280" stroke="#404040" strokeWidth="1.5" />

            {/* Column Markers */}
            {[
              [50, 40], [140, 40], [360, 40], [450, 40],
              [50, 120], [140, 120], [360, 120], [450, 120],
              [50, 200], [140, 200], [360, 200], [450, 200],
              [50, 280], [140, 280], [360, 280], [450, 280]
            ].map(([cx, cy], i) => (
              <rect key={i} x={cx - 6} y={cy - 6} width="12" height="12" fill="#d97706" stroke="#f59e0b" strokeWidth="1" />
            ))}

            {/* Diff Highlighting 1: MEP Opening Shift */}
            {showDiffOverlay && (
              <g 
                className="cursor-pointer group" 
                onClick={() => setActiveMarker(currentBlueprint.changesDetected[0])}
              >
                {/* Old opening red strike */}
                <rect x="130" y="80" width="30" height="20" fill="#e11d48" fillOpacity="0.25" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3 3" />
                <line x1="130" y1="80" x2="160" y2="100" stroke="#e11d48" strokeWidth="1" />
                {/* New opening green */}
                <rect x="150" y="80" width="30" height="20" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" />
                <circle cx="165" cy="90" r="10" fill="#e11d48" fillOpacity="0.8" className="animate-ping" />
                <circle cx="165" cy="90" r="8" fill="#f43f5e" />
                <text x="165" y="93" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">1</text>
              </g>
            )}

            {/* Diff Highlighting 2: Rebar Diameter Change */}
            {showDiffOverlay && (
              <g 
                className="cursor-pointer group" 
                onClick={() => setActiveMarker(currentBlueprint.changesDetected[1])}
              >
                <circle cx="360" cy="120" r="16" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" />
                <circle cx="360" cy="120" r="8" fill="#10b981" />
                <text x="360" y="123" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">2</text>
              </g>
            )}

            {/* Diff Highlighting 3: Fire Damper Note */}
            {showDiffOverlay && (
              <g 
                className="cursor-pointer group" 
                onClick={() => setActiveMarker(currentBlueprint.changesDetected[2])}
              >
                <rect x="235" y="60" width="30" height="15" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1.5" />
                <circle cx="250" cy="67" r="8" fill="#f59e0b" />
                <text x="250" y="70" fill="black" fontSize="8" fontWeight="bold" textAnchor="middle">3</text>
              </g>
            )}
          </svg>
        </div>

        {/* Legend bar */}
        <div className="p-3 bg-neutral-900/90 border-t border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-500"></span> Previous R07
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span> Revision R08
            </span>
          </div>
          <span>Scale: 1:100 • ISO A1</span>
        </div>
      </div>

      {/* Selected Marker Details Drawer */}
      {activeMarker && (
        <div className="rounded-xl border border-amber-500/40 bg-neutral-900/95 p-4 space-y-2 text-xs shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded bg-amber-500/20 text-amber-400 px-2 py-0.5 font-mono font-bold text-[10px] border border-amber-500/30">
                {activeMarker.discipline}
              </span>
              <h4 className="font-bold text-neutral-100 text-sm">{activeMarker.title}</h4>
            </div>
            <button
              onClick={() => setActiveMarker(null)}
              className="text-neutral-500 hover:text-neutral-300 text-xs font-mono"
            >
              ✕ Close
            </button>
          </div>

          <p className="text-neutral-300 text-xs leading-relaxed">
            {activeMarker.description}
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
            <div className="rounded bg-neutral-950 p-2 border border-neutral-800">
              <span className="text-neutral-500 block text-[10px]">Zone / Grid</span>
              <span className="text-neutral-200 font-bold">{activeMarker.zone}</span>
            </div>
            <div className="rounded bg-neutral-950 p-2 border border-neutral-800">
              <span className="text-neutral-500 block text-[10px]">Cost / Schedule Impact</span>
              <span className="text-amber-400 font-bold">{activeMarker.impact}</span>
            </div>
          </div>
        </div>
      )}

      {/* Changes Detected Table */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-900/90 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200 font-mono">
            Detected Revision Changes (R07 ➔ R08)
          </h3>
          <span className="text-[10px] text-neutral-400 font-mono">Architect Issued: Today</span>
        </div>

        <div className="space-y-2 text-xs">
          {currentBlueprint.changesDetected.map((change, idx) => (
            <div
              key={change.id}
              onClick={() => setActiveMarker(change)}
              className="rounded-lg bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 p-3 cursor-pointer transition-colors space-y-1"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-neutral-800 text-[10px] font-bold text-amber-400 font-mono">
                    {idx + 1}
                  </span>
                  <span className="font-bold text-neutral-200">{change.title}</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">{change.zone}</span>
              </div>
              <p className="text-neutral-400 text-[11px] pl-7">
                {change.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
