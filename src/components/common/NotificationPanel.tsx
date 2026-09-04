import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  CheckCheck, 
  CloudRain, 
  ShieldAlert, 
  FileText, 
  Layers, 
  FileCheck, 
  Users, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NotificationItem } from '../../types';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead, markAllNotificationsRead, navigate } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  if (!isOpen) return null;

  const getNotifIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'weather': return <CloudRain className="h-4 w-4 text-blue-400" />;
      case 'approval': return <ShieldAlert className="h-4 w-4 text-amber-400" />;
      case 'rfi': return <FileText className="h-4 w-4 text-indigo-400" />;
      case 'blueprint': return <Layers className="h-4 w-4 text-emerald-400" />;
      case 'contract': return <FileCheck className="h-4 w-4 text-orange-400" />;
      case 'crew': return <Users className="h-4 w-4 text-rose-400" />;
      default: return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
    }
  };

  const filtered = notifications.filter((n) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'unread') return !n.read;
    return n.type === selectedFilter;
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-stone-900/60 backdrop-blur-xs">
      <div className="w-full max-w-sm h-full bg-white border-l border-stone-200 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200">
          <div className="flex items-center gap-2">
            <Bell className="h-4 w-4 text-stone-700" />
            <h3 className="text-sm font-bold text-stone-900">Site Notifications</h3>
            <span className="rounded-full bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.2 text-[11px] font-mono font-bold">
              {notifications.filter((n) => !n.read).length} new
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              title="Mark all as read"
              className="p-1 rounded text-stone-500 hover:text-stone-900"
            >
              <CheckCheck className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded text-stone-500 hover:text-stone-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 p-2.5 border-b border-stone-200 overflow-x-auto text-xs bg-[#faf8f5]">
          {['all', 'unread', 'weather', 'approval', 'rfi', 'blueprint'].map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`rounded-lg px-2.5 py-1 text-[11px] capitalize whitespace-nowrap transition-colors ${
                selectedFilter === f
                  ? 'bg-white text-stone-900 font-bold border border-stone-300 shadow-xs'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-xs text-stone-400">
              No notifications in this category.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  markNotificationRead(item.id);
                  if (item.actionUrl) {
                    navigate(item.actionUrl);
                    onClose();
                  }
                }}
                className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all space-y-1.5 shadow-xs ${
                  !item.read
                    ? 'bg-amber-50/60 border-amber-300 hover:border-amber-400'
                    : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-600'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 font-bold text-stone-900">
                    <div className="p-1 rounded-lg bg-stone-100 border border-stone-200">
                      {getNotifIcon(item.type)}
                    </div>
                    <span>{item.title}</span>
                  </div>
                  {!item.read && (
                    <span className="h-2 w-2 rounded-full bg-amber-600 shrink-0 mt-1"></span>
                  )}
                </div>
                <p className="text-[11px] text-stone-700 leading-relaxed pl-7">
                  {item.message}
                </p>
                <div className="flex items-center justify-between text-[10px] text-stone-500 pl-7 pt-1 font-mono">
                  <span>{item.timestamp}</span>
                  {item.actionUrl && (
                    <span className="flex items-center gap-1 text-stone-900 font-bold">
                      View details <ArrowRight className="h-3 w-3" />
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
