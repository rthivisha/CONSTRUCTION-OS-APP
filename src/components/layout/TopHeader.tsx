import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Bell, 
  Smartphone, 
  Tablet, 
  Monitor, 
  Wrench,
  X,
  Play
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RoleType } from '../../types';

export const TopHeader: React.FC<{ onToggleSidebar?: () => void }> = ({ onToggleSidebar }) => {
  const { 
    project, 
    currentRole, 
    setCurrentRole, 
    setIsSearchOpen, 
    notifications, 
    runIncidentSimulation, 
    deviceMode, 
    setDeviceMode,
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isTestSettingsOpen, setIsTestSettingsOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const roleLabels: Record<RoleType, string> = {
    supervisor: 'Site Supervisor (Field)',
    manager: 'Project Manager (Office)',
    contractor: 'Contractor / Engineer / Architect',
  };

  return (
    <>
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-stone-200 bg-white/90 backdrop-blur-md px-3 sm:px-4">
        {/* Left: Mobile hamburger & Project context */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-white text-stone-600 hover:text-stone-900 lg:hidden shadow-xs"
            >
              <span className="sr-only">Toggle Sidebar</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-stone-900 text-amber-400 shrink-0 shadow-xs">
              <Building2 className="h-4 w-4" />
            </div>
            <div className="hidden xs:block">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-stone-900 truncate max-w-[150px] sm:max-w-xs">
                  {project.name}
                </span>
                <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.2 text-[10px] font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                  ACTIVE
                </span>
              </div>
              <div className="text-[10px] text-stone-500 font-mono hidden sm:block">
                SITE: Chennai, IN • {project.code}
              </div>
            </div>
          </div>
        </div>

        {/* Center: Device Mode Switcher (Mobile First preview toggle) */}
        <div className="flex items-center gap-1 rounded-lg bg-stone-100 p-1 border border-stone-200">
          <button
            onClick={() => setDeviceMode('mobile')}
            title="Mobile View (390px)"
            className={`flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium transition-colors ${
              deviceMode === 'mobile'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Mobile</span>
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            title="Tablet View (768px)"
            className={`flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium transition-colors ${
              deviceMode === 'tablet'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Tablet className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Tablet</span>
          </button>
          <button
            onClick={() => setDeviceMode('desktop')}
            title="Full Responsive Canvas"
            className={`flex items-center gap-1 rounded px-2 py-1 text-[11px] font-medium transition-colors ${
              deviceMode === 'desktop'
                ? 'bg-white text-stone-900 shadow-xs font-semibold'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span className="hidden md:inline">Full</span>
          </button>
        </div>

        {/* Right Controls: Search, Notifications & Developer/Testing Settings Trigger */}
        <div className="flex items-center gap-2">
          {/* Search trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex h-8 items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-2 text-xs text-stone-600 hover:text-stone-900 hover:bg-white transition-colors"
            title="Search site artifacts (Cmd+K)"
          >
            <Search className="h-3.5 w-3.5" />
            <span className="hidden md:inline text-[11px] font-mono">Search...</span>
          </button>

          {/* Notifications trigger */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(true)}
              className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-stone-50 text-stone-700 hover:text-stone-900 hover:bg-white transition-colors"
              title="Site notifications"
            >
              <Bell className="h-4 w-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-600 text-[9px] font-bold text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Developer / Testing Settings Trigger (Not user-facing role switcher pill) */}
          <button
            onClick={() => setIsTestSettingsOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-stone-200 bg-stone-50 text-stone-500 hover:text-stone-900 hover:bg-white transition-colors"
            title="Developer / Testing Panel"
          >
            <Wrench className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Developer / Testing Panel Modal */}
      {isTestSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="text-sm font-bold text-stone-900">Developer & Testing Diagnostics</h3>
                <p className="text-[11px] text-stone-500">Test harness settings & role switching</p>
              </div>
              <button
                onClick={() => setIsTestSettingsOpen(false)}
                className="rounded-lg p-1 text-stone-400 hover:text-stone-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Role Switcher for Testing */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-semibold uppercase text-stone-600">
                Switch Test Role Perspective:
              </label>
              <div className="space-y-1.5">
                {(['supervisor', 'manager', 'contractor'] as RoleType[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      setCurrentRole(r);
                      setIsTestSettingsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium text-left border transition-all ${
                      currentRole === r
                        ? 'bg-amber-50 text-stone-900 border-amber-300 font-bold'
                        : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <span>{roleLabels[r]}</span>
                    {currentRole === r && (
                      <span className="text-[10px] font-mono text-amber-700 font-bold uppercase">
                        ● Active
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Launch Scenario Simulation */}
            <div className="border-t border-stone-200 pt-3 space-y-2">
              <label className="text-xs font-mono font-semibold uppercase text-stone-600">
                Scenario Testing:
              </label>
              <button
                onClick={() => {
                  setIsTestSettingsOpen(false);
                  runIncidentSimulation();
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 py-2.5 text-xs font-semibold shadow-xs"
              >
                <Play className="h-3.5 w-3.5 text-amber-400" />
                <span>Launch Storm Incident Simulator (11 Steps)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
