import React from 'react';
import { 
  Home, 
  FileText, 
  ShieldAlert, 
  Camera, 
  MoreHorizontal, 
  LayoutDashboard, 
  DollarSign, 
  Sparkles, 
  Clock, 
  Inbox, 
  Layers, 
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface BottomNavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: string | number;
  highlight?: boolean;
}

export const MobileBottomNav: React.FC = () => {
  const { currentRole, activePath, navigate, approvals, rfis } = useApp();

  const pendingApprovalsCount = approvals.filter((a) => a.status === 'PENDING_APPROVAL').length;
  const pendingRfisCount = rfis.filter((r) => r.status === 'AWAITING_HUMAN_RESPONSE').length;

  const supervisorItems: BottomNavItem[] = [
    { label: 'Home', path: '/supervisor', icon: <Home className="h-5 w-5" /> },
    { label: 'Site Log', path: '/supervisor/site-log', icon: <FileText className="h-5 w-5" /> },
    { 
      label: 'Approvals', 
      path: '/supervisor/approvals', 
      icon: <ShieldAlert className="h-5 w-5" />,
      badge: pendingRfisCount > 0 ? pendingRfisCount : undefined 
    },
    { label: 'Capture', path: '/supervisor/inspection', icon: <Camera className="h-5 w-5" /> },
    { label: 'More', path: '/supervisor/blueprints', icon: <MoreHorizontal className="h-5 w-5" /> },
  ];

  const managerItems: BottomNavItem[] = [
    { label: 'Command', path: '/manager', icon: <LayoutDashboard className="h-5 w-5" /> },
    { 
      label: 'Inbox', 
      path: '/manager/approvals', 
      icon: <ShieldAlert className="h-5 w-5" />,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined,
      highlight: pendingApprovalsCount > 0
    },
    { label: 'Budget', path: '/manager/budget', icon: <DollarSign className="h-5 w-5" /> },
    { label: 'Recovery', path: '/manager/recovery', icon: <Sparkles className="h-5 w-5 text-rose-400" /> },
    { label: 'Audit Log', path: '/manager/audit', icon: <Clock className="h-5 w-5" /> },
  ];

  const contractorItems: BottomNavItem[] = [
    { 
      label: 'My RFIs', 
      path: '/contractor', 
      icon: <Inbox className="h-5 w-5" />,
      badge: pendingRfisCount > 0 ? pendingRfisCount : undefined
    },
    { label: 'Blueprints', path: '/contractor/blueprints', icon: <Layers className="h-5 w-5" /> },
    { label: 'Compliance', path: '/contractor/compliance', icon: <FileCheck className="h-5 w-5" /> },
    { label: 'Contracts', path: '/contractor/contracts', icon: <FileText className="h-5 w-5" /> },
    { label: 'Workarounds', path: '/contractor/workarounds', icon: <ShieldAlert className="h-5 w-5" /> },
  ];

  const currentNav = 
    currentRole === 'supervisor' ? supervisorItems :
    currentRole === 'manager' ? managerItems : contractorItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 flex h-16 items-center justify-around border-t border-stone-200 bg-white/95 backdrop-blur-md px-2 py-1 shadow-lg">
      {currentNav.map((item) => {
        const isActive = activePath === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`relative flex flex-1 flex-col items-center justify-center py-1 transition-all ${
              isActive ? 'text-stone-900 font-bold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <div className="relative">
              {item.icon}
              {item.badge && (
                <span className={`absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold ${
                  item.highlight ? 'bg-amber-600 text-white animate-pulse' : 'bg-stone-200 text-stone-700 border border-stone-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] tracking-tight mt-1 truncate max-w-[60px]">
              {item.label}
            </span>
            {isActive && (
              <span className="absolute bottom-0 h-0.5 w-6 rounded-full bg-amber-600"></span>
            )}
          </button>
        );
      })}
    </nav>
  );
};
