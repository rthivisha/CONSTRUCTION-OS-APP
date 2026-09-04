import React, { useState } from 'react';
import { 
  Truck, 
  Package, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  Clock, 
  Plus, 
  FileText, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ManagerProcurement: React.FC = () => {
  const { materials, approvals, approveItem } = useApp();
  const [isPoModalOpen, setIsPoModalOpen] = useState(false);
  const [poMaterial, setPoMaterial] = useState('25mm PVC Conduit (Fire Retardant)');
  const [poQty, setPoQty] = useState('500');
  const [poSupplier, setPoSupplier] = useState('Schneider / Havells Electricals');
  const [poCost, setPoCost] = useState('1850');

  const procurementApprovals = approvals.filter((a) => a.category === 'material_order');

  const handleCreatePo = () => {
    alert(`Purchase Order #PO-994 for $${Number(poCost).toLocaleString()} drafted and queued for Human Approval.`);
    setIsPoModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-stone-200 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-amber-800 font-bold">
            Supply Chain & Materials Desk
          </span>
          <h1 className="text-lg sm:text-xl font-extrabold text-stone-900 mt-0.5">Procurement & PO Drafting</h1>
          <p className="text-xs text-stone-600">
            Automated stock threshold monitoring, supplier quotes & human purchase approvals
          </p>
        </div>
        <button
          onClick={() => setIsPoModalOpen(true)}
          className="flex items-center gap-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold px-3.5 py-2 text-xs transition-colors shadow-xs"
        >
          <Plus className="h-4 w-4" />
          <span>Draft New PO</span>
        </button>
      </div>

      {/* Material Stock Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {materials.map((mat) => (
          <div
            key={mat.id}
            className={`rounded-2xl border p-4 text-xs space-y-2.5 shadow-xs ${
              mat.status === 'shortage_predicted'
                ? 'border-rose-300 bg-rose-50/40'
                : 'border-stone-200 bg-white'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <h4 className="font-bold text-stone-900">{mat.name}</h4>
                <div className="text-[10px] text-stone-500 font-mono">
                  {mat.supplier}
                </div>
              </div>
              <span
                className={`rounded px-1.5 py-0.2 text-[10px] font-mono font-bold uppercase ${
                  mat.status === 'shortage_predicted'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {mat.status.replace('_', ' ')}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-stone-700">
                <span>Buffer Level</span>
                <span className="font-bold">{mat.currentStock} / {mat.requiredStock} {mat.unit} ({mat.percentage}%)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-stone-200 overflow-hidden">
                <div
                  className={`h-full ${
                    mat.percentage > 70 ? 'bg-emerald-600' : mat.percentage > 45 ? 'bg-amber-500' : 'bg-rose-600'
                  }`}
                  style={{ width: `${mat.percentage}%` }}
                />
              </div>
            </div>

            <div className="text-[11px] text-stone-600 bg-stone-50 p-2 rounded-lg border border-stone-200 font-mono">
              Status: {mat.deliveryInfo}
            </div>
          </div>
        ))}
      </div>

      {/* Pending PO Approvals Section */}
      <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 font-mono flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-amber-700" />
            Purchase Orders Awaiting PM Sign-Off
          </h3>
          <span className="text-[10px] text-stone-500 font-mono">
            {procurementApprovals.length} PO Drafts
          </span>
        </div>

        <div className="space-y-2.5">
          {procurementApprovals.map((app) => (
            <div
              key={app.id}
              className="rounded-xl bg-stone-50 border border-stone-200 p-3.5 space-y-2 text-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="font-bold text-stone-900">{app.title}</h4>
                  <p className="text-stone-700 text-xs mt-0.5">{app.aiRecommendation}</p>
                </div>
                <div className="text-right font-mono shrink-0">
                  <span className="text-sm font-bold text-amber-800">+${app.impactCost.toLocaleString()}</span>
                  <span className="block text-[10px] text-stone-500">{app.status}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                <span className="text-[10px] text-stone-500 font-mono">
                  Agent: {app.sourceAgent}
                </span>
                {app.status === 'PENDING_APPROVAL' ? (
                  <button
                    onClick={() => {
                      approveItem(app.id, 'Vikram Malhotra (PM)');
                      alert(`Purchase order approved and issued to supplier.`);
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold px-3 py-1 text-xs transition-colors shadow-xs"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Authorize PO</span>
                  </button>
                ) : (
                  <span className="text-emerald-700 font-mono text-[11px] font-bold">
                    ✓ Authorized by PM
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New PO Modal */}
      {isPoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl bg-white border border-stone-200 p-5 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <Package className="h-4 w-4 text-amber-700" />
              Draft New Supplier Purchase Order
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-stone-600 block mb-1 font-medium">Item / Material:</label>
                <input
                  type="text"
                  value={poMaterial}
                  onChange={(e) => setPoMaterial(e.target.value)}
                  className="w-full rounded-lg bg-stone-50 border border-stone-300 p-2 text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-stone-600 block mb-1 font-medium">Quantity:</label>
                  <input
                    type="number"
                    value={poQty}
                    onChange={(e) => setPoQty(e.target.value)}
                    className="w-full rounded-lg bg-stone-50 border border-stone-300 p-2 text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
                <div>
                  <label className="text-stone-600 block mb-1 font-medium">Total Cost ($):</label>
                  <input
                    type="number"
                    value={poCost}
                    onChange={(e) => setPoCost(e.target.value)}
                    className="w-full rounded-lg bg-stone-50 border border-stone-300 p-2 text-stone-900 focus:outline-none focus:border-amber-600"
                  />
                </div>
              </div>
              <div>
                <label className="text-stone-600 block mb-1 font-medium">Supplier / Vendor:</label>
                <input
                  type="text"
                  value={poSupplier}
                  onChange={(e) => setPoSupplier(e.target.value)}
                  className="w-full rounded-lg bg-stone-50 border border-stone-300 p-2 text-stone-900 focus:outline-none focus:border-amber-600"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsPoModalOpen(false)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePo}
                className="rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold px-4 py-1.5 text-xs transition-colors shadow-xs"
              >
                Queue PO for Approval
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
