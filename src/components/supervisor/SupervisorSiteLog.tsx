import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  FileText, 
  Upload, 
  Plus, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Eye, 
  Volume2, 
  AlertCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SupervisorSiteLog: React.FC = () => {
  const { siteLogs, addSiteLog, shiftHandoff, generateNewShiftHandoff, setIsPdfPreviewOpen } = useApp();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [manualText, setManualText] = useState('');
  const [selectedTask, setSelectedTask] = useState('Level 3 Slab Prep & MEP');
  const [logLocation, setLogLocation] = useState('Tower A — Level 3 Deck');
  const [isGeneratingHandoff, setIsGeneratingHandoff] = useState(false);

  // Recording timer simulator
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      setRecordingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStopRecording = () => {
    setIsRecording(false);
    // Simulate AI voice-to-text transcript
    const simulatedTranscripts = [
      'Concrete pump set up delayed on south ramp due to delivery truck queue. Rebar inspection for Zone B passed with 40mm clear cover verified. Sky overcast, rain probability rising.',
      'Shree Civil carpenters completed perimeter edge shuttering on Level 3. UltraTech batch plant confirmed 6 transit mixers on standby. Need PM confirmation before loading.',
      'Conduit rough-in crew short by 3 electricians. Subcontractor promised afternoon reinforcement. RFI 024 raised for conduit offset near column C14.',
    ];
    const picked = simulatedTranscripts[Math.floor(Math.random() * simulatedTranscripts.length)];
    setManualText(picked);
  };

  const handleSaveLog = () => {
    if (!manualText.trim()) return;
    addSiteLog({
      transcript: manualText,
      location: logLocation,
      relatedTask: selectedTask,
      tags: ['voice_log', 'supervisor_dictation'],
    });
    setManualText('');
  };

  const handleGenerateHandoff = () => {
    setIsGeneratingHandoff(true);
    setTimeout(() => {
      generateNewShiftHandoff();
      setIsGeneratingHandoff(false);
    }, 1200);
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold">
            Field Documentation
          </span>
          <h1 className="text-lg font-bold text-neutral-100">Site Voice Log</h1>
          <p className="text-xs text-neutral-400">
            Dictate field progress & generate night shift handoff
          </p>
        </div>
        <button
          onClick={() => setIsPdfPreviewOpen(true)}
          className="flex items-center gap-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 text-xs font-semibold text-neutral-200 border border-neutral-700 transition-colors"
        >
          <FileText className="h-4 w-4 text-amber-400" />
          <span>Review PDF</span>
        </button>
      </div>

      {/* Voice Recording Control Panel */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-neutral-200 flex items-center gap-2">
            <Mic className="h-4 w-4 text-amber-400" />
            Voice-First Field Dictation
          </span>
          {isRecording && (
            <span className="font-mono text-rose-400 animate-pulse flex items-center gap-1 font-bold">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              REC 00:{recordingSeconds < 10 ? `0${recordingSeconds}` : recordingSeconds}
            </span>
          )}
        </div>

        {/* Big Touch-friendly Record Button */}
        <div className="flex flex-col items-center justify-center py-4 space-y-3">
          <button
            onClick={() => (isRecording ? handleStopRecording() : setIsRecording(true))}
            className={`flex h-20 w-20 items-center justify-center rounded-full transition-all shadow-xl ${
              isRecording
                ? 'bg-rose-600 text-white scale-110 shadow-rose-950/80 animate-pulse'
                : 'bg-gradient-to-tr from-amber-500 to-amber-400 text-neutral-950 hover:scale-105 shadow-amber-950/40'
            }`}
          >
            {isRecording ? <MicOff className="h-8 w-8" /> : <Mic className="h-8 w-8" />}
          </button>
          
          <div className="text-center">
            <div className="text-xs font-semibold text-neutral-200">
              {isRecording ? 'Listening... Tap to Stop & Transcribe' : 'Tap to Start Voice Log'}
            </div>
            <div className="text-[11px] text-neutral-500">
              Natural speech automatically structured by Documentation Agent
            </div>
          </div>
        </div>

        {/* Audio Waveform Simulator */}
        {isRecording && (
          <div className="flex items-center justify-center gap-1 h-8 px-4 bg-neutral-950 rounded-lg">
            {[40, 70, 90, 60, 30, 80, 100, 75, 45, 90, 65, 35, 85, 95, 50, 30, 60, 80].map((h, i) => (
              <div
                key={i}
                className="w-1 bg-amber-400 rounded-full animate-pulse"
                style={{
                  height: `${h}%`,
                  animationDelay: `${i * 0.08}s`,
                }}
              />
            ))}
          </div>
        )}

        {/* Transcript Input / Edit Field */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400">
            <span>Transcript / Note:</span>
            <span className="text-[10px] font-mono">Documentation Agent Ready</span>
          </div>
          <textarea
            value={manualText}
            onChange={(e) => setManualText(e.target.value)}
            placeholder="Dictated text appears here, or type manual field observation..."
            rows={3}
            className="w-full rounded-xl bg-neutral-950 border border-neutral-800 p-3 text-xs text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
          />
          <div className="grid grid-cols-2 gap-2 text-xs">
            <input
              type="text"
              value={logLocation}
              onChange={(e) => setLogLocation(e.target.value)}
              placeholder="Location e.g. Level 3 Deck"
              className="rounded-lg bg-neutral-950 border border-neutral-800 p-2 text-neutral-200"
            />
            <button
              onClick={handleSaveLog}
              disabled={!manualText.trim()}
              className="rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold py-2 text-xs transition-colors flex items-center justify-center gap-1"
            >
              <Plus className="h-4 w-4" />
              <span>Save to Site Log</span>
            </button>
          </div>
        </div>
      </div>

      {/* Shift Handoff Generation Card */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-200 font-mono">
              Shift Handoff Generator
            </h3>
          </div>
          <button
            onClick={handleGenerateHandoff}
            disabled={isGeneratingHandoff}
            className="flex items-center gap-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 px-3 py-1.5 text-xs font-semibold text-purple-300 transition-colors"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>{isGeneratingHandoff ? 'Synthesizing...' : 'Generate Shift Handoff'}</span>
          </button>
        </div>

        {/* Generated Shift Handoff Preview Summary */}
        <div className="rounded-xl bg-neutral-950/80 border border-neutral-800 p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
            <span className="font-bold text-neutral-200">
              SHIFT HANDOFF — {shiftHandoff.date.toUpperCase()}
            </span>
            <span className="text-[10px] font-mono text-neutral-400">
              By: {shiftHandoff.supervisor.split(' ')[0]}
            </span>
          </div>

          <div className="space-y-1.5">
            <div>
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold block">
                Completed ({shiftHandoff.completedTasks.length}):
              </span>
              <ul className="list-disc pl-4 text-neutral-300 space-y-0.5 text-[11px]">
                {shiftHandoff.completedTasks.slice(0, 2).map((t, idx) => (
                  <li key={idx} className="truncate">{t}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold block">
                Pending & On Hold ({shiftHandoff.pendingTasks.length}):
              </span>
              <ul className="list-disc pl-4 text-neutral-300 space-y-0.5 text-[11px]">
                {shiftHandoff.pendingTasks.slice(0, 2).map((t, idx) => (
                  <li key={idx} className="truncate">{t}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-rose-400 font-semibold block">
                Critical Risks:
              </span>
              <p className="text-neutral-300 text-[11px] truncate">
                {shiftHandoff.activeRisks[0]}
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={() => setIsPdfPreviewOpen(true)}
              className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-semibold text-xs"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Review Formatted PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Log Entries Feed */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 font-mono">
            Recent Log Entries ({siteLogs.length})
          </span>
          <span className="text-[10px] text-neutral-500">Chronological site stream</span>
        </div>

        <div className="space-y-2">
          {siteLogs.map((log) => (
            <div
              key={log.id}
              className="rounded-xl border border-neutral-800 bg-neutral-900/80 p-3 text-xs space-y-2"
            >
              <div className="flex items-center justify-between text-neutral-400">
                <span className="font-mono font-bold text-neutral-200 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  {log.timestamp}
                </span>
                <span className="text-[10px] font-mono flex items-center gap-1 text-neutral-400">
                  <MapPin className="h-3 w-3" />
                  {log.location}
                </span>
              </div>

              <p className="text-neutral-200 text-xs leading-relaxed">
                "{log.transcript}"
              </p>

              <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-neutral-800/60">
                {log.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-neutral-800 px-1.5 py-0.2 text-[10px] font-mono text-neutral-400"
                  >
                    #{tag}
                  </span>
                ))}
                {log.relatedTask && (
                  <span className="text-[10px] text-neutral-500 truncate ml-auto">
                    {log.relatedTask}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
