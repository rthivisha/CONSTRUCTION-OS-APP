# ConstructionOS

**An AI-native command center for construction job sites — from the deck to the boardroom.**

ConstructionOS unifies field supervision, project management, and contractor coordination into a single, defensible system of record. It replaces fragmented WhatsApp threads, static Excel trackers, and after-the-fact paperwork with real-time telemetry, multi-agent AI recommendations, and a cryptographically verifiable audit trail — so every decision on site is fast, grounded, and legally defensible.

---

## Why ConstructionOS

Construction sites lose time and money to the same failures over and over: storms that aren't anticipated, rebar yards that run dry mid-pour, RFIs that take a week to answer, and disputes with no clean paper trail. ConstructionOS attacks all four at once by putting a coordinated mesh of specialist AI agents — grounded in live site data, IS codes, and subcontract terms — directly into the hands of the people making decisions, while logging every query and outcome into an immutable ledger.

The result is a closed-loop value chain:

**Detect → Triage → Request → Coordinate → Authorize → Defend**

| Step | Persona | Action | Result |
|---|---|---|---|
| Detect | Site Supervisor | Spots an incoming storm on the Home telemetry feed and taps **Ask Assistant** | Instant diagnosis grounded in Doppler radar and IS 456 |
| Triage | AI Agent Mesh | Evaluates options and recommends a Dawn 04:30 AM pour | Avoids ~$18,400 in concrete washout damage |
| Request | Site Supervisor | Accepts the recommendation and escalates to the PM | Formal request with cost delta and schedule impact attached |
| Coordinate | Contractor / Engineer | Receives the batch-hold notice and updates the shift handover | Batching plant held; night crew scheduled |
| Authorize | Project Manager | Reviews cost and contingency impact, approves | Human-in-the-loop executive sign-off |
| Defend | Audit Trail | Captures every query, recommendation, and approval automatically | Cryptographically hashed, unassailable legal record |

---

## Core Principles

- **Human-in-the-loop, always.** AI recommends; humans decide. Every action has a clear, accountable owner.
- **Grounded, not generative fiction.** Every AI response cites its sources — radar feeds, IS code clauses, subcontract terms, or vendor data.
- **Defensibility by default.** Every inquiry and decision, not just approvals, is passively logged to an immutable audit trail.
- **Built for the deck, not the desk.** The field experience is mobile-first, glove-friendly, and voice-driven.

---

## Tech Stack

### Core Framework & Runtime
- **React 19** — component-driven UI with hooks (`useState`, `useEffect`, `useRef`, `useContext`, `useCallback`)
- **TypeScript 5.8** — strict, end-to-end type safety across domain models (`RoleType`, `AgentType`, `ApprovalItem`, `RfiItem`, `AuditTimelineEvent`, `AssistantQueryResponse`)
- **Node.js 22.x** — server runtime
- **Vite 6** — bundler and dev server

### Styling & Design System
- **Tailwind CSS v4** — utility-first styling with a custom natural-stone and warm-amber palette
- **Autoprefixer** — vendor prefixing
- **Lucide React** — icon system
- **Motion** — physics-based animations and layout transitions
- **Responsive multi-viewport engine** — live preview across mobile (390px), tablet (768px), and desktop

### Data Visualization
- **Recharts** — budget curves, contingency burn-down, and workforce headcount charts

### AI & Intelligence Layer
- **Google GenAI SDK** — interface to Gemini models
- **Multi-Agent Coordination & Recovery Engine** (`src/services/recoveryAgent.ts`):
  - Recovery Strategy Agent — ranks response options for site interruptions
  - Environmental & Risk Agent — ingests meteorological/radar data
  - Procurement & Materials Agent — analyzes yard depletion, port congestion, vendor PO protocols
  - Blueprint & CAD Diff Agent — compares vector drawing revisions and detects spatial/MEP clashes
  - Vision Triage Agent — evaluates structural surface scans against code limits
  - Deterministic Fallback Engine — guarantees resilient responses if APIs or network are unavailable

### Backend & Environment
- **Express** — routing and proxy integration
- **dotenv** — environment variable isolation (`GEMINI_API_KEY`, `APP_URL`)
- **esbuild** — production backend bundling
- **tsx** — TypeScript execution for dev scripts

### State, Storage & Defensibility
- **React Context API** (`src/context/AppContext.tsx`) — centralized store for role switching, incident simulation pipelines, RFI/NCR/compliance matrices, and assistant chat context
- **Immutable Audit Trail Ledger** — every inquiry and decision captured with actor, timestamp, responding agent, confidence score, source citations, and a verified artifact hash

---

## The Three Perspectives

ConstructionOS ships three purpose-built experiences on one shared data layer.

### 1. Site Supervisor — Field Mobile Experience
Mobile-first (390px), five-tab thumb bar: **Home · Site Log · Approvals · Capture · More**, plus a persistent **Ask Assistant** FAB.

| Screen | What it does |
|---|---|
| **Home Dashboard** | Live weather + storm ETA, crew headcount via turnstile, critical-path milestones, real-time incident alerts, one-tap quick actions |
| **Site Log** | Voice dictation for hands-free logging; auto-transcribes and categorizes entries into weather, workforce, progress, or delay logs; builds a tamper-proof daily diary |
| **Field Approvals & RFIs** | Human-in-the-loop approval gate with AI-recommended actions, confidence scores, cost delta, and schedule variance; Accept / Modify / Escalate |
| **Capture & Visual Defect Triage** | Camera-based defect scanning, automatic classification against code limits (e.g. IS 456 Cl. 35.3.2), and remediation suggestions |
| **Materials & Staging Yard** | Live inventory matrix, buffer-depletion warnings, and transit-truck staging feed |
| **Blueprint & CAD Viewer** | High-resolution vector viewer with revision diffing and spatial clash callouts |
| **Ask Assistant Overlay** | Routes queries to the right specialist agent, shows source grounding, and logs every interaction to the audit trail |

### 2. Project Manager — Command Center Experience
Multi-column desktop interface for commercial oversight and executive sign-off.

| Screen | What it does |
|---|---|
| **Command Center** | Contract value, contingency status, schedule critical path, subcontractor performance index |
| **Commercial Approvals Inbox** | Dual-tier approvals, multi-scenario cost/schedule comparisons, one-click digital sign-off with automated work orders |
| **Cost & Budget Ledger** | Recharts-driven budget burn-down, EV/PV/AC variance, categorized cost exposure |
| **Subcontract Agreements & Compliance** | Clause repository, automated penalty/liquidated-damages calculator, formal notice generator |
| **Recovery Strategy Simulator** | Predictive ripple-effect modeling and automated crash/fast-track recovery plans |
| **Emergency Procurement Pipeline** | Vendor directory with negotiated rates, one-click emergency local purchase orders |
| **Workforce & Crew Shortfall Matrix** | Biometric headcount reconciliation vs. contracted crew, deficiency visualizer |
| **Immutable Defensibility Audit Trail** | Full chronological, cryptographically verifiable event ledger with filtering and export |

### 3. Contractor & Trade Engineers — Technical Experience
Precision tooling for civil subcontractors, structural engineers, and MEP specialists.

| Screen | What it does |
|---|---|
| **Technical RFI Management** | Trade-categorized RFI cards, AI-drafted engineering responses, status tracking |
| **CAD Drawing Revisions & Markups** | Trade-specific drawing layers and vector markup tools |
| **Non-Conformance Reports (NCR)** | Deviation tracking with root-cause and remediation logs |
| **Approved Engineering Workarounds** | Repository of pre-authorized standard details for common field clashes |
| **Shift Handover Register** | Inter-shift log for completed work, hazards, tool status, and pending requests |
| **Subcontractor Communications** | Threaded, task/RFI-linked messaging that replaces informal chat apps |

---

## Impact at a Glance

- **RFI turnaround:** ~5–7 days → **under 4 hours**
- **Decision cycles on emergency approvals:** days → **minutes**
- **Defect escalation:** unnecessary structural call-outs eliminated via automated triage against code limits
- **Rework:** reduced by preventing work against obsolete drawings via CAD diffing and clash detection
- **Disputes & claims:** resolved against a single, tamper-proof, cryptographically hashed record instead of fragmented emails and texts

---

## Getting Started

This project uses [Bun](https://bun.sh) as its package manager and runtime.

```bash
# Clone the repository
git clone https://github.com/rthivisha/CONSTRUCTION-OS-APP.git
cd constructionos

# Install dependencies
bun install

# Configure environment variables
cp .env.example .env
# Set GEMINI_API_KEY and APP_URL in .env

# Run the development server
bun run dev
```

### Build for production

```bash
bun run build
bun run start
```

> **Note:** `.env` is git-ignored and holds your `GEMINI_API_KEY` / `VITE_GEMINI_API_KEY`. Never commit it, and rotate the key immediately if it's ever pasted, screenshotted, or shared anywhere outside your local machine.

---

## Project Structure (high level)

```
constructionos/
├── assets/
├── scripts/
│   └── test_recov...          # Recovery-agent test script
├── src/
│   ├── components/
│   │   ├── common/            # Shared, role-agnostic UI components
│   │   └── layout/             # AppShell, MobileNav, Sidebar, TopHeader
│   ├── manager/                 # Project Manager screens
│   ├── supervisor/              # Site Supervisor screens
│   ├── contractor/              # Contractor & Trade Engineer screens
│   ├── context/
│   │   └── AppContext.tsx      # Global state: roles, incidents, RFIs, NCRs, assistant context
│   ├── data/                     # Mock/seed data and static reference sets
│   ├── services/
│   │   └── recoveryAgent.ts    # Multi-agent coordination & recovery engine
│   ├── types/                    # Shared TypeScript domain types (RoleType, ApprovalItem, etc.)
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .env                          # Local secrets (git-ignored) — GEMINI_API_KEY, VITE_GEMINI_API_KEY
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── tsconfig.json
└── vite.config.ts
```

> The Express/esbuild backend described in the Tech Stack section proxies GenAI calls server-side; confirm its exact location in your tree (e.g. a top-level `server/` or `api/` directory) and update this structure if it lives elsewhere.

---

## Roadmap

- [ ] Offline-first sync for low-connectivity site conditions
- [ ] Native mobile app wrapper for the Site Supervisor experience
- [ ] Expanded agent mesh (safety compliance, permit tracking)
- [ ] Configurable approval thresholds per project/org
- [ ] Multi-project portfolio view for Project Managers

---

## Contributing

Contributions are welcome. Please open an issue to discuss significant changes before submitting a pull request.

## License

Specify your license here (e.g. MIT, Apache 2.0, or proprietary).
