import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  FileCheck, 
  Layers, 
  Search, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';

export const ContractorCompliance: React.FC = () => {
  const [filterCode, setFilterCode] = useState('all');

  const complianceChecks = [
    {
      id: 'cc-1',
      standard: 'IS 456:2000 (Cl 26.4.1)',
      title: 'Nominal Clear Cover to Main Structural Reinforcement',
      requirement: 'Severe Environmental Exposure: Minimum 45mm cover for external shear walls and columns.',
      siteStatus: '48mm verified on Level 3 Zone B rebar scan.',
      status: 'PASS',
      agent: 'Code Compliance Agent',
    },
    {
      id: 'cc-2',
      standard: 'IS 13920:2016 (Ductile Detailing)',
      title: 'Column Confining Hoop & Link Spacing',
      requirement: 'Special confining reinforcement hoop spacing shall not exceed 100mm or d/4 within 2h distance of joint face.',
      siteStatus: '75mm link spacing maintained at beam-column junctions.',
      status: 'PASS',
      agent: 'Code Compliance Agent',
    },
    {
      id: 'cc-3',
      standard: 'NBC 2016 (Part 4 Fire Safety)',
      title: 'Fire Damper Integrity at Electrical Shaft Penetrations',
      requirement: '2-hour fire rated motorized dampers with smoke detector interlock required on all floor penetrations.',
      siteStatus: 'Pending damper installation at Level 3 east electrical riser shaft.',
      status: 'ADVISORY_HOLD',
      agent: 'Code Compliance Agent',
    },
    {
      id: 'cc-4',
      standard: 'ASTM C94 / IS 4926',
      title: 'Ready-Mixed Concrete Time of Discharge Limits',
      requirement: 'Concrete must be completely discharged within 90 minutes after batching water injection.',
      siteStatus: 'Batch #TX-902 elapsed time: 65 mins. Within allowable limits.',
      status: 'PASS',
      agent: 'Logistics Agent',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
        <div>
          <span className="text-[10px] font-mono uppercase text-emerald-400 font-semibold">
            Automated Code & Structural Standards
          </span>
          <h1 className="text-lg font-bold text-neutral-100">Engineering Compliance Checks</h1>
          <p className="text-xs text-neutral-400">
            Advisory checks against IS 456:2000, NBC 2016 & project structural specifications
          </p>
        </div>
        <span className="rounded-full bg-emerald-500/10 text-emerald-400 px-3 py-1 text-xs font-mono font-bold border border-emerald-500/30">
          3 PASS / 1 ADVISORY
        </span>
      </div>

      {/* Compliance Rule Disclaimer */}
      <div className="rounded-2xl bg-neutral-900 border border-neutral-800 p-3.5 text-xs text-neutral-300 flex items-start gap-3">
        <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <span className="font-bold text-neutral-100 block">
            Advisory Code Analysis Notice:
          </span>
          <p className="text-neutral-400 text-xs leading-relaxed">
            Automated checks flag statutory code thresholds for engineering review. All deviations require registered Structural Engineer (SE) written concession.
          </p>
        </div>
      </div>

      {/* Compliance Checks Feed */}
      <div className="space-y-3">
        {complianceChecks.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl border p-4 text-xs space-y-2.5 ${
              item.status === 'PASS'
                ? 'border-neutral-800 bg-neutral-900/80'
                : 'border-amber-500/40 bg-neutral-900/90'
            }`}
          >
            <div className="flex items-start justify-between gap-2 border-b border-neutral-800 pb-2">
              <div>
                <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                  {item.standard}
                </span>
                <h4 className="font-bold text-neutral-100 text-sm mt-0.5">{item.title}</h4>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold ${
                  item.status === 'PASS'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="space-y-1.5 text-xs">
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">
                  Code Requirement:
                </span>
                <p className="text-neutral-300 leading-relaxed">{item.requirement}</p>
              </div>

              <div className="rounded-lg bg-neutral-950 p-2.5 border border-neutral-800 text-[11px] text-neutral-200">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">
                  Observed Site Telemetry:
                </span>
                {item.siteStatus}
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono pt-1">
              <span>Verified by: {item.agent}</span>
              <button
                onClick={() => alert(`Standard details: ${item.standard}`)}
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                View Standard Reference ↗
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
