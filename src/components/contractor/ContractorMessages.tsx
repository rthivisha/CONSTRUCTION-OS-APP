import React, { useState } from 'react';
import { 
  Bell, 
  Send, 
  User, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ContractorMessages: React.FC = () => {
  const { notifications } = useApp();
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'Karthik Raja (Field Supervisor)',
      role: 'Site Supervisor',
      timestamp: '10:15 AM',
      text: 'RFI #024 response received. We have marked the 100mm offset on Level 3 slab and added 2-T16 diagonal bars. Formwork closing now.',
    },
    {
      id: 'msg-2',
      sender: 'Vikram Malhotra (Senior PM)',
      role: 'Project Manager',
      timestamp: '09:30 AM',
      text: 'Storm recovery Option A approved. Concrete batch plant on standby for 6:30 PM pour. Night crew notified.',
    },
    {
      id: 'msg-3',
      sender: 'Logistics Agent',
      role: 'Autonomous AI',
      timestamp: '09:02 AM',
      text: 'Batch #TX-902 delivered to south gate. 6 transit mixers logged.',
    },
  ]);

  const [inputMsg, setInputMsg] = useState('');

  const handleSendMsg = () => {
    if (!inputMsg.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        sender: 'Anand V. (Lead Architect)',
        role: 'Architect / Engineer',
        timestamp: 'Just now',
        text: inputMsg,
      },
    ]);
    setInputMsg('');
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">
            Real-time Site Coordination
          </span>
          <h1 className="text-lg font-bold text-neutral-100">Messages & Direct Field Reroutes</h1>
          <p className="text-xs text-neutral-400">
            Instant communication thread with Field Supervisor, Project Manager & Site Agents
          </p>
        </div>
      </div>

      {/* Message Chat Feed */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/90 p-4 space-y-4 min-h-[400px] flex flex-col justify-between">
        <div className="space-y-3 overflow-y-auto max-h-96 pr-1">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`p-3.5 rounded-2xl border text-xs space-y-1 ${
                m.role === 'Architect / Engineer'
                  ? 'bg-neutral-800/90 border-emerald-500/40 ml-6 text-neutral-100'
                  : 'bg-neutral-950 border-neutral-800 mr-6 text-neutral-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-400 font-mono text-[11px]">{m.sender}</span>
                <span className="text-[10px] text-neutral-500 font-mono">{m.timestamp}</span>
              </div>
              <p className="text-xs leading-relaxed">{m.text}</p>
            </div>
          ))}
        </div>

        {/* Message Input Composer */}
        <div className="pt-3 border-t border-neutral-800 flex items-center gap-2">
          <input
            type="text"
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMsg()}
            placeholder="Type directive to field supervisor or PM..."
            className="flex-1 rounded-xl bg-neutral-950 border border-neutral-800 p-2.5 text-xs text-neutral-100 focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleSendMsg}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2.5 text-xs transition-colors shadow-md shrink-0"
          >
            <Send className="h-4 w-4" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
