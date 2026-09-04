import React from 'react';
import { 
  Building2, 
  Activity, 
  Mic, 
  ShieldAlert, 
  Camera, 
  Truck, 
  Layers, 
  LayoutDashboard, 
  DollarSign, 
  FileCheck, 
  Sparkles, 
  Clock, 
  Users, 
  Inbox, 
  FileText, 
  CheckCircle2, 
  BookOpen, 
  Bell, 
  HelpCircle, 
  User, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RoleType } from '../../types';

interface SidebarProps {
  onClose?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: string;
  highlight?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const { currentRole, setCurrentRole, activePath, navigate, approvals, rfis, project } = useApp();

  const pendingApprovalsCount = approvals.filter((a) => a.status === 'PENDING_APPROVAL').length;
  const pendingRfisCount = rfis.filter((r) => r.status === 'AWAITING_HUMAN_RESPONSE').length;

  const supervisorNav: NavItem[] = [
    { label: 'Live Feed & Home', path: '/supervisor', icon: <Activity className="h-4 w-4" /> },
    { label: 'Site Voice Log', path: '/supervisor/site-log', icon: <Mic className="h-4 w-4" /> },
    { 
      label: 'Approvals & RFIs', 
      path: '/supervisor/approvals', 
      icon: <ShieldAlert className="h-4 w-4" />,
      badge: pendingRfisCount > 0 ? `${pendingRfisCount}` : undefined,
    },
    { label: 'Damage Inspection', path: '/supervisor/inspection', icon: <Camera className="h-4 w-4" /> },
    { label: 'Materials & Crew', path: '/supervisor/materials', icon: <Truck className="h-4 w-4" /> },
    { label: 'Blueprint Viewer', path: '/supervisor/blueprints', icon: <Layers className="h-4 w-4" /> },
  ];

  const managerNav: NavItem[] = [
    { label: 'Command Center', path: '/manager', icon: <LayoutDashboard className="h-4 w-4" /> },
    { 
      label: 'Approvals Inbox', 
      path: '/manager/approvals', 
      icon: <ShieldAlert className="h-4 w-4 text-amber-400" />,
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount}` : undefined,
      highlight: pendingApprovalsCount > 0,
    },
    { label: 'Budget & Estimation', path: '/manager/budget', icon: <DollarSign className="h-4 w-4" /> },
    { label: 'Contracts & Compliance', path: '/manager/contracts', icon: <FileCheck className="h-4 w-4" /> },
    { label: 'Recovery Center', path: '/manager/recovery', icon: <Sparkles className="h-4 w-4 text-rose-400" /> },
    { label: 'Procurement', path: '/manager/procurement', icon: <Truck className="h-4 w-4" /> },
    { label: 'Reports & Audit Trail', path: '/manager/audit', icon: <Clock className="h-4 w-4" /> },
    { label: 'Crew Shortfall Log', path: '/manager/crew', icon: <Users className="h-4 w-4" /> },
  ];

  const contractorNav: NavItem[] = [
    { 
      label: 'My RFIs & Tasks', 
      path: '/contractor', 
      icon: <Inbox className="h-4 w-4" />,
      badge: pendingRfisCount > 0 ? `${pendingRfisCount}` : undefined,
    },
    { label: 'Blueprint Studio', path: '/contractor/blueprints', icon: <Layers className="h-4 w-4" /> },
    { label: 'Compliance Checks', path: '/contractor/compliance', icon: <CheckCircle2 className="h-4 w-4" /> },
    { label: 'Contract Specs (Sec 4.2)', path: '/contractor/contracts', icon: <FileCheck className="h-4 w-4" /> },
    { label: 'Messages & Reroutes', path: '/contractor/messages', icon: <Bell className="h-4 w-4" /> },
    { label: 'Shift Handover Brief', path: '/contractor/handover', icon: <FileText className="h-4 w-4" /> },
    { label: 'NCR & Punch List', path: '/contractor/non-conformance', icon: <ShieldAlert className="h-4 w-4" /> },
    { label: 'Approved Workarounds', path: '/contractor/workarounds', icon: <BookOpen className="h-4 w-4" /> },
  ];

  const activeNavItems = 
    currentRole === 'supervisor' ? supervisorNav :
    currentRole === 'manager' ? managerNav : contractorNav;

  const handleNavClick = (path: string) => {
    navigate(path);
    if (onClose) onClose();
  };

  return (
    <aside className="flex h-full w-64 flex-col justify-between border-r border-stone-200 bg-[#f5f2eb] text-stone-800">
      {/* Top Header & Logo */}
      <div>
        <div className="flex h-14 items-center justify-between border-b border-stone-200 px-4 bg-[#ece8df]">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-900 text-amber-400 font-black text-xs shadow-xs">
              OS
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-stone-900 text-sm">
                CONSTRUCTION<span className="text-amber-700">OS</span>
              </span>
              <span className="block text-[9px] font-mono uppercase text-stone-500">
                Multi-Agent Coordination
              </span>
            </div>
          </div>
        </div>

        {/* Project Selector Box */}
        <div className="p-3 border-b border-stone-200">
          <div className="rounded-xl bg-white border border-stone-200 p-2.5 space-y-1 shadow-xs">
            <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 uppercase">
              <span>Current Project</span>
              <span className="text-emerald-700 font-semibold">● ACTIVE</span>
            </div>
            <div className="text-xs font-semibold text-stone-900 truncate">
              {project.name}
            </div>
            <div className="text-[10px] text-stone-500 flex items-center justify-between">
              <span>{project.code}</span>
              <span className="font-mono">{project.scheduleHealth}% Sched</span>
            </div>
          </div>
        </div>

        {/* Role Switcher Selector Tabs */}
        <div className="px-3 pt-3">
          <div className="text-[10px] font-mono uppercase text-stone-500 px-1 mb-1.5 font-semibold">
            Operational Role:
          </div>
          <div className="grid grid-cols-3 gap-1 rounded-lg bg-stone-200/80 p-1 border border-stone-300/80 text-[10px] font-medium">
            <button
              onClick={() => setCurrentRole('supervisor')}
              className={`rounded py-1 px-1 text-center transition-colors truncate ${
                currentRole === 'supervisor'
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Field Super
            </button>
            <button
              onClick={() => setCurrentRole('manager')}
              className={`rounded py-1 px-1 text-center transition-colors truncate ${
                currentRole === 'manager'
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Project Mgr
            </button>
            <button
              onClick={() => setCurrentRole('contractor')}
              className={`rounded py-1 px-1 text-center transition-colors truncate ${
                currentRole === 'contractor'
                  ? 'bg-stone-900 text-white font-semibold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Engineer
            </button>
          </div>
        </div>

        {/* Navigation Link List */}
        <div className="p-3 space-y-1">
          <div className="text-[10px] font-mono uppercase text-stone-500 px-1 mb-1 font-semibold">
            {currentRole === 'supervisor' ? 'Field Tools & Logs' : currentRole === 'manager' ? 'Command Controls' : 'Subcontractor Studio'}
          </div>
          {activeNavItems.map((item) => {
            const isActive = activePath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`w-full flex items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-white text-stone-900 border border-stone-300 font-semibold shadow-xs'
                    : 'text-stone-600 hover:bg-stone-200/60 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className={isActive ? 'text-amber-700' : 'text-stone-500'}>
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`rounded-full px-1.5 py-0.2 text-[10px] font-mono font-bold ${
                    item.highlight 
                      ? 'bg-amber-600 text-white animate-pulse' 
                      : 'bg-stone-200 text-stone-700'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile & Safety Principle Box */}
      <div className="p-3 border-t border-stone-200 space-y-3 bg-[#f5f2eb]">
        {/* Core Product Rule Reminder Box */}
        <div className="rounded-lg bg-amber-50 p-2.5 border border-amber-200/80 text-[10px] text-amber-900 space-y-1">
          <div className="flex items-center gap-1.5 font-mono text-amber-800 font-semibold uppercase">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Human In The Loop</span>
          </div>
          <p className="text-amber-800/90 leading-tight">
            AI observes & drafts. Human authorization required before execution.
          </p>
        </div>

        {/* User profile widget */}
        <div className="flex items-center justify-between rounded-xl bg-white p-2 border border-stone-200 text-xs shadow-xs">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-100 border border-stone-200 text-stone-800 font-bold text-xs">
              {currentRole === 'supervisor' ? 'KR' : currentRole === 'manager' ? 'VM' : 'AV'}
            </div>
            <div>
              <div className="text-xs font-semibold text-stone-900">
                {currentRole === 'supervisor' ? 'Karthik Raja' : currentRole === 'manager' ? 'Vikram Malhotra' : 'Anand V.'}
              </div>
              <div className="text-[10px] text-stone-500 font-mono capitalize">
                {currentRole === 'supervisor' ? 'Lead Supervisor' : currentRole === 'manager' ? 'Senior PM' : 'Principal Architect'}
              </div>
            </div>
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
        </div>
      </div>
    </aside>
  );
};
