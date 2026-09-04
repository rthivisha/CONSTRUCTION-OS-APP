import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Calculator, 
  PieChart as PieIcon, 
  BarChart3, 
  Plus, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie, Legend } from 'recharts';

export const ManagerBudget: React.FC = () => {
  const { budgetDivisions, project, addAuditLogEntry } = useApp();

  // Interactive Estimation Tool State
  const [calcDivision, setCalcDivision] = useState('03 - Concrete & Formwork');
  const [calcQuantity, setCalcQuantity] = useState('45');
  const [calcUnitRate, setCalcUnitRate] = useState('110');
  const [calcLaborHours, setCalcLaborHours] = useState('32');
  const [calcLaborRate, setCalcLaborRate] = useState('45');
  const [calcContingencyPct, setCalcContingencyPct] = useState('10');
  const [calcNotes, setCalcNotes] = useState('Level 3 Deck South Edge Re-sequencing');
  const [estimatedTotal, setEstimatedTotal] = useState<number | null>(null);

  const handleCalculate = () => {
    const matCost = (Number(calcQuantity) || 0) * (Number(calcUnitRate) || 0);
    const labCost = (Number(calcLaborHours) || 0) * (Number(calcLaborRate) || 0);
    const subtotal = matCost + labCost;
    const cont = subtotal * ((Number(calcContingencyPct) || 0) / 100);
    const total = subtotal + cont;
    setEstimatedTotal(total);
  };

  const handleDraftChangeOrder = () => {
    if (!estimatedTotal) return;
    addAuditLogEntry({
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actor: 'Project Manager (Vikram Malhotra)',
      action: 'DRAFT_CHANGE_ORDER',
      details: `Generated change order estimate for ${calcDivision}: $${estimatedTotal.toLocaleString()} (${calcNotes})`,
      category: 'budget',
    });
    alert(`Change Order draft #CO-089 for $${estimatedTotal.toLocaleString()} generated and queued for owner approval.`);
  };

  const chartData = budgetDivisions.map((div) => ({
    name: div.divisionCode,
    fullName: div.name,
    allocated: div.allocated,
    spent: div.spent,
    variance: div.variance,
  }));

  const pieData = budgetDivisions.map((div, i) => ({
    name: div.name.split(' ')[0],
    value: div.allocated,
    color: ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#6b7280'][i % 6],
  }));

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-amber-800 font-bold">
            Cost Control & CSI MasterFormat
          </span>
          <h1 className="text-lg sm:text-xl font-extrabold text-stone-900 mt-0.5">Budget & Estimation Engine</h1>
          <p className="text-xs text-stone-600">
            Real-time committed costs, division variances & interactive change order estimator
          </p>
        </div>
      </div>

      {/* Overview Totals Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-1 shadow-xs">
          <span className="text-[11px] font-mono text-stone-500 font-semibold">Total Contract Value</span>
          <div className="text-2xl font-black font-mono text-stone-900">
            ${(project.totalBudget / 1000000).toFixed(2)}M
          </div>
          <span className="text-[10px] text-stone-500 font-mono">GMP Base Contract</span>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-1 shadow-xs">
          <span className="text-[11px] font-mono text-stone-500 font-semibold">Committed & Spent</span>
          <div className="text-2xl font-black font-mono text-stone-900">
            ${(project.spentBudget / 1000000).toFixed(2)}M
          </div>
          <span className="text-[10px] text-emerald-700 font-mono font-medium">
            {((project.spentBudget / project.totalBudget) * 100).toFixed(1)}% Incurred
          </span>
        </div>

        <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-1 shadow-xs">
          <span className="text-[11px] font-mono text-stone-500 font-semibold">Cumulative Variance</span>
          <div className="text-2xl font-black font-mono text-rose-700">
            +${project.budgetVariance.toLocaleString()}
          </div>
          <span className="text-[10px] text-rose-700 font-mono">
            Overrun in Div 03 (Concrete storm contingency)
          </span>
        </div>
      </div>

      {/* Charts Row: Division Bar Chart + Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left 7 cols: CSI Division Variance Bar Chart */}
        <div className="lg:col-span-7 rounded-2xl border border-stone-200 bg-white p-4 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-800 font-mono flex items-center gap-1.5">
              <BarChart3 className="h-4 w-4 text-amber-700" />
              Allocated vs Spent by CSI Division ($k)
            </span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#78716c" fontSize={10} fontFamily="monospace" />
                <YAxis stroke="#78716c" fontSize={10} fontFamily="monospace" tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e7e5e4', borderRadius: '8px', fontSize: '11px', color: '#1c1917', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#1c1917' }}
                  formatter={(val: number) => [`$${val.toLocaleString()}`, '']}
                />
                <Bar dataKey="allocated" name="Allocated" fill="#a8a29e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="spent" name="Spent to Date" fill="#d97706" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 text-[11px] font-mono text-stone-600 pt-1">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded bg-stone-400"></span> Allocated Budget
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded bg-amber-600"></span> Incurred Spent
            </span>
          </div>
        </div>

        {/* Right 5 cols: CSI Divisions Table */}
        <div className="lg:col-span-5 rounded-2xl border border-stone-200 bg-white p-4 space-y-3 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-stone-800 font-mono block">
            Division Variance Breakdown
          </span>

          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {budgetDivisions.map((div) => (
              <div
                key={div.id}
                className="rounded-xl bg-stone-50 p-2.5 border border-stone-200 text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-bold">
                  <span className="text-stone-900 truncate">{div.name}</span>
                  <span
                    className={`font-mono text-[11px] ${
                      div.variance > 0
                        ? 'text-rose-700 font-bold'
                        : div.variance < 0
                        ? 'text-emerald-700 font-bold'
                        : 'text-stone-500'
                    }`}
                  >
                    {div.variance > 0 ? `+$${div.variance.toLocaleString()}` : `$${div.variance.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-[10px] text-stone-500 font-mono">
                  <span>Spent: ${(div.spent / 1000).toFixed(0)}k</span>
                  <span>Budget: ${(div.allocated / 1000).toFixed(0)}k</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Estimation & Change Order Calculator Tool */}
      <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-4 shadow-xs">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-amber-700" />
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-mono">
                Interactive Change Order Estimator Tool
              </h3>
              <p className="text-[11px] text-stone-600">
                Model impact of site scope additions, storm delays, or trade rework
              </p>
            </div>
          </div>
          <button
            onClick={handleCalculate}
            className="rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-bold px-3 py-1.5 text-xs transition-colors shadow-xs"
          >
            Calculate Estimate
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="text-stone-600 block mb-1 font-medium">CSI Division:</label>
            <select
              value={calcDivision}
              onChange={(e) => setCalcDivision(e.target.value)}
              className="w-full rounded-lg bg-stone-50 border border-stone-300 p-2 text-stone-800 focus:outline-none focus:border-amber-600"
            >
              <option value="03 - Concrete & Formwork">03 - Concrete & Formwork</option>
              <option value="05 - Structural Steel">05 - Structural Steel</option>
              <option value="26 - Electrical & Conduit">26 - Electrical & Conduit</option>
              <option value="09 - Drywall & Finishes">09 - Drywall & Finishes</option>
            </select>
          </div>

          <div>
            <label className="text-stone-600 block mb-1 font-medium">Material Qty & Unit Rate ($):</label>
            <div className="grid grid-cols-2 gap-1">
              <input
                type="number"
                value={calcQuantity}
                onChange={(e) => setCalcQuantity(e.target.value)}
                placeholder="Qty"
                className="rounded-lg bg-stone-50 border border-stone-300 p-2 text-stone-900 font-mono focus:outline-none focus:border-amber-600"
              />
              <input
                type="number"
                value={calcUnitRate}
                onChange={(e) => setCalcUnitRate(e.target.value)}
                placeholder="$/unit"
                className="rounded-lg bg-stone-50 border border-stone-300 p-2 text-stone-900 font-mono focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>

          <div>
            <label className="text-stone-600 block mb-1 font-medium">Labor Hours & Hourly Rate ($):</label>
            <div className="grid grid-cols-2 gap-1">
              <input
                type="number"
                value={calcLaborHours}
                onChange={(e) => setCalcLaborHours(e.target.value)}
                placeholder="Hours"
                className="rounded-lg bg-stone-50 border border-stone-300 p-2 text-stone-900 font-mono focus:outline-none focus:border-amber-600"
              />
              <input
                type="number"
                value={calcLaborRate}
                onChange={(e) => setCalcLaborRate(e.target.value)}
                placeholder="$/hr"
                className="rounded-lg bg-stone-50 border border-stone-300 p-2 text-stone-900 font-mono focus:outline-none focus:border-amber-600"
              />
            </div>
          </div>

          <div>
            <label className="text-stone-600 block mb-1 font-medium">Contingency Buffer (%):</label>
            <input
              type="number"
              value={calcContingencyPct}
              onChange={(e) => setCalcContingencyPct(e.target.value)}
              placeholder="e.g. 10%"
              className="w-full rounded-lg bg-stone-50 border border-stone-300 p-2 text-stone-900 font-mono focus:outline-none focus:border-amber-600"
            />
          </div>
        </div>

        {/* Calculation Result Summary Bar */}
        {estimatedTotal !== null && (
          <div className="rounded-xl bg-amber-50/70 border border-amber-300 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-900 font-bold block">
                Calculated Scope Addition Estimate:
              </span>
              <div className="text-xl font-black font-mono text-stone-900">
                ${estimatedTotal.toLocaleString()}{' '}
                <span className="text-xs font-normal text-stone-600">
                  (Materials + Labor + {calcContingencyPct}% Contingency)
                </span>
              </div>
            </div>

            <button
              onClick={handleDraftChangeOrder}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3.5 py-2 text-xs transition-colors shadow-xs"
            >
              <Plus className="h-4 w-4" />
              <span>Draft Formal Change Order</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
