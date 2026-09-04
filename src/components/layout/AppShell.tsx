import React, { useState } from 'react';
import { TopHeader } from './TopHeader';
import { Sidebar } from './Sidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { GlobalSearchModal } from '../common/GlobalSearchModal';
import { NotificationPanel } from '../common/NotificationPanel';
import { LiveScenarioSimulatorModal } from '../common/LiveScenarioSimulatorModal';
import { PdfPreviewModal } from '../common/PdfPreviewModal';
import { AskAssistantOverlay } from '../common/AskAssistantOverlay';
import { useApp } from '../../context/AppContext';
import { Wifi, Battery, Signal, Smartphone, RotateCcw } from 'lucide-react';

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { deviceMode, setDeviceMode } = useApp();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-900 flex flex-col font-sans selection:bg-amber-200 selection:text-stone-900">
      {/* Global Modals */}
      <GlobalSearchModal />
      <NotificationPanel isOpen={isNotifDrawerOpen} onClose={() => setIsNotifDrawerOpen(false)} />
      <LiveScenarioSimulatorModal />
      <PdfPreviewModal />

      {/* Main Top Header */}
      <TopHeader onToggleSidebar={() => setIsSidebarOpen(true)} />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop / Tablet Sidebar (Fixed on left for larger screens) */}
        {deviceMode === 'desktop' && (
          <div className="hidden lg:block w-64 shrink-0 h-[calc(100vh-3.5rem)] sticky top-14 bg-[#f5f2eb] border-r border-stone-200">
            <Sidebar />
          </div>
        )}

        {/* Mobile Slide-over Drawer for Sidebar */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-50 flex bg-stone-900/60 backdrop-blur-xs">
            <div className="w-72 h-full bg-[#f5f2eb] border-r border-stone-300 shadow-2xl">
              <Sidebar onClose={() => setIsSidebarOpen(false)} />
            </div>
            <div className="flex-1" onClick={() => setIsSidebarOpen(false)} />
          </div>
        )}

        {/* Center Content Area */}
        <main className="flex-1 overflow-y-auto min-h-[calc(100vh-3.5rem)] flex items-start justify-center p-0 sm:p-3 lg:p-4 bg-[#faf8f5]">
          {deviceMode === 'mobile' ? (
            /* Mobile Device Simulator Frame */
            <div className="mobile-device-frame w-full max-w-[430px] my-0 sm:my-3 rounded-none sm:rounded-[40px] border-0 sm:border-8 sm:border-stone-800 bg-[#faf8f5] shadow-2xl overflow-hidden flex flex-col relative min-h-[100dvh] sm:min-h-[844px] max-h-none sm:max-h-[920px]">
              {/* iPhone Notch & Mobile Status Bar */}
              <div className="h-10 bg-stone-100 px-6 flex items-center justify-between text-xs text-stone-700 shrink-0 select-none z-20 border-b border-stone-200">
                <span className="font-semibold text-[11px] font-mono">10:24</span>
                <div className="h-4 w-28 bg-stone-300 rounded-full mx-auto hidden sm:block"></div>
                <div className="flex items-center gap-1.5 text-stone-600">
                  <Signal className="h-3 w-3" />
                  <Wifi className="h-3 w-3" />
                  <Battery className="h-3.5 w-3.5 text-emerald-600" />
                </div>
              </div>

              {/* Scrollable Page Body */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 pb-20 scroll-smooth bg-[#faf8f5]">
                {children}
              </div>

              {/* Ask Assistant FAB for mobile frame */}
              <AskAssistantOverlay />

              {/* Mobile Bottom Thumb Bar */}
              <MobileBottomNav />

              {/* Home bar indicator */}
              <div className="h-4 bg-stone-100 flex items-center justify-center shrink-0 border-t border-stone-200">
                <div className="h-1 w-32 bg-stone-400 rounded-full"></div>
              </div>
            </div>
          ) : deviceMode === 'tablet' ? (
            /* Tablet Frame */
            <div className="w-full max-w-4xl my-2 rounded-2xl border-4 border-stone-300 bg-[#faf8f5] shadow-2xl overflow-hidden flex flex-col min-h-[850px]">
              {/* Status header */}
              <div className="h-8 bg-stone-100 px-4 flex items-center justify-between text-xs text-stone-600 border-b border-stone-200 shrink-0">
                <span className="font-mono text-[11px]">ConstructionOS Tablet Console — Field Hub</span>
                <span className="text-[11px] text-emerald-700 font-mono">● Online • 5G Ultra Wideband</span>
              </div>
              <div className="flex-1 flex overflow-hidden">
                <div className="w-56 shrink-0 border-r border-stone-200 hidden md:block bg-[#f5f2eb]">
                  <Sidebar />
                </div>
                <div className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 bg-[#faf8f5]">
                  {children}
                </div>
              </div>
            </div>
          ) : (
            /* Full Responsive Desktop Screen */
            <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 md:p-6 pb-16">
              {children}
            </div>
          )}
        </main>
      </div>

      {/* Ask Assistant FAB for tablet and desktop modes */}
      {deviceMode !== 'mobile' && <AskAssistantOverlay />}
    </div>
  );
};
