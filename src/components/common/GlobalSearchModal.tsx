import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  CheckSquare, 
  FileText, 
  Layers, 
  Truck, 
  ShieldAlert, 
  Cpu, 
  FileCode, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const GlobalSearchModal: React.FC = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    tasks, 
    rfis, 
    blueprints, 
    materials, 
    approvals, 
    agents, 
    siteLogs,
    navigate 
  } = useApp();
  
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const results: {
      type: string;
      title: string;
      subtitle: string;
      icon: React.ReactNode;
      path: string;
    }[] = [];

    // Search tasks
    tasks.forEach((t) => {
      if (t.title.toLowerCase().includes(q) || t.location.toLowerCase().includes(q) || t.assignedCrew.toLowerCase().includes(q)) {
        results.push({
          type: 'Task',
          title: t.title,
          subtitle: `${t.location} • ${t.assignedCrew}`,
          icon: <CheckSquare className="h-4 w-4 text-blue-400" />,
          path: '/supervisor',
        });
      }
    });

    // Search RFIs
    rfis.forEach((r) => {
      if (r.rfiNumber.toLowerCase().includes(q) || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q)) {
        results.push({
          type: 'RFI',
          title: `${r.rfiNumber}: ${r.title}`,
          subtitle: `Status: ${r.status} • Assigned: ${r.assignedTo}`,
          icon: <FileText className="h-4 w-4 text-indigo-400" />,
          path: '/contractor/rfis',
        });
      }
    });

    // Search Blueprints
    blueprints.forEach((bp) => {
      if (bp.code.toLowerCase().includes(q) || bp.title.toLowerCase().includes(q) || bp.level.toLowerCase().includes(q)) {
        results.push({
          type: 'Blueprint',
          title: `${bp.code} — ${bp.title} (${bp.revisionCurrent})`,
          subtitle: `${bp.level} • ${bp.changesDetected.length} changes detected`,
          icon: <Layers className="h-4 w-4 text-emerald-400" />,
          path: '/supervisor/blueprints',
        });
      }
    });

    // Search Materials
    materials.forEach((m) => {
      if (m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q) || m.supplier.toLowerCase().includes(q)) {
        results.push({
          type: 'Material',
          title: m.name,
          subtitle: `Stock: ${m.currentStock} ${m.unit} (${m.percentage}%) • ${m.supplier}`,
          icon: <Truck className="h-4 w-4 text-amber-400" />,
          path: '/supervisor/materials',
        });
      }
    });

    // Search Approvals
    approvals.forEach((app) => {
      if (app.title.toLowerCase().includes(q) || app.aiRecommendation.toLowerCase().includes(q)) {
        results.push({
          type: 'Approval Queue',
          title: app.title,
          subtitle: `Impact: +$${app.impactCost.toLocaleString()} • ${app.status}`,
          icon: <ShieldAlert className="h-4 w-4 text-rose-400" />,
          path: '/manager/approvals',
        });
      }
    });

    // Search Agents
    agents.forEach((ag) => {
      if (ag.name.toLowerCase().includes(q) || ag.roleDescription.toLowerCase().includes(q) || ag.lastAction.toLowerCase().includes(q)) {
        results.push({
          type: 'Agent Mesh',
          title: ag.name,
          subtitle: ag.lastAction,
          icon: <Cpu className="h-4 w-4 text-purple-400" />,
          path: '/manager',
        });
      }
    });

    return results;
  }, [query, tasks, rfis, blueprints, materials, approvals, agents]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-stone-900/60 backdrop-blur-xs p-4 pt-16 sm:pt-24">
      <div className="relative w-full max-w-xl rounded-2xl bg-white border border-stone-200 shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 border-b border-stone-200 px-4 py-3 bg-[#faf8f5]">
          <Search className="h-5 w-5 text-stone-500 shrink-0" />
          <input
            type="text"
            placeholder="Search tasks, RFIs, blueprints, materials, agents, contracts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm text-stone-900 placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-stone-400 hover:text-stone-700">
              <X className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="rounded px-2 py-0.5 text-xs font-mono text-stone-600 bg-stone-100 border border-stone-200"
          >
            ESC
          </button>
        </div>

        {/* Quick Query Suggestions if empty */}
        {!query && (
          <div className="p-4 space-y-3">
            <span className="text-[11px] font-mono uppercase text-stone-500 font-semibold">Quick Searches:</span>
            <div className="flex flex-wrap gap-2">
              {['concrete pour', 'RFI #024', 'weather alert', 'steel rebar', 'Revision R08', 'ABC Electrical'].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="rounded-lg bg-stone-100 hover:bg-stone-200 border border-stone-200 px-2.5 py-1 text-xs text-stone-800 transition-colors shadow-xs"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        {query && (
          <div className="max-h-96 overflow-y-auto p-2 divide-y divide-stone-100">
            {searchResults.length === 0 ? (
              <div className="p-6 text-center text-xs text-stone-500">
                No matching site artifacts found for "{query}"
              </div>
            ) : (
              searchResults.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    navigate(item.path);
                    setIsSearchOpen(false);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-stone-50 text-left transition-colors group"
                >
                  <div className="flex items-center gap-3 truncate">
                    <div className="p-2 rounded-lg bg-stone-100 border border-stone-200 shrink-0">
                      {item.icon}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-stone-900 truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-stone-100 text-stone-700 border border-stone-200">
                          {item.type}
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500 truncate mt-0.5 font-mono">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
