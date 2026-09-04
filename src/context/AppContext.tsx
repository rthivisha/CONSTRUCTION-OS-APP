import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  RoleType,
  ProjectInfo,
  TaskItem,
  PriorityAlert,
  ApprovalItem,
  RfiItem,
  SiteLogEntry,
  ShiftHandoff,
  InspectionImageScan,
  MaterialItem,
  CrewStatus,
  BlueprintSheet,
  RecoveryOption,
  AuditTimelineEvent,
  ContractClauseFlag,
  NonConformanceReport,
  ApprovedWorkaround,
  NotificationItem,
  AgentStatus,
  AgentType,
  BudgetDivision,
  ContractClause,
  AuditLogEntry,
} from '../types';
import {
  INITIAL_PROJECT,
  INITIAL_AGENTS,
  INITIAL_ALERTS,
  INITIAL_TASKS,
  INITIAL_APPROVALS,
  INITIAL_RFIS,
  INITIAL_SITE_LOGS,
  INITIAL_SHIFT_HANDOFF,
  INITIAL_INSPECTIONS,
  INITIAL_MATERIALS,
  INITIAL_CREW,
  INITIAL_BLUEPRINTS,
  RECOVERY_OPTIONS,
  INITIAL_AUDIT_TRAIL,
  INITIAL_CONTRACT_FLAGS,
  INITIAL_NCRS,
  INITIAL_WORKAROUNDS,
  INITIAL_NOTIFICATIONS,
  INITIAL_BUDGET_DIVISIONS,
  INITIAL_CONTRACT_CLAUSES,
  INITIAL_AUDIT_LOGS,
} from '../data/mockData';
import { querySiteIntelligence, AssistantQueryResponse } from '../services/recoveryAgent';

export type DeviceMode = 'mobile' | 'tablet' | 'desktop';

export interface AssistantMessageItem {
  id: string;
  query: string;
  response: AssistantQueryResponse;
  timestamp: string;
}

interface AppContextType {
  currentRole: RoleType;
  setCurrentRole: (role: RoleType) => void;
  activePath: string;
  navigate: (path: string) => void;
  project: ProjectInfo;
  setProject: React.Dispatch<React.SetStateAction<ProjectInfo>>;
  agents: AgentStatus[];
  alerts: PriorityAlert[];
  tasks: TaskItem[];
  approvals: ApprovalItem[];
  rfis: RfiItem[];
  siteLogs: SiteLogEntry[];
  shiftHandoff: ShiftHandoff;
  inspections: InspectionImageScan[];
  materials: MaterialItem[];
  crew: CrewStatus[];
  blueprints: BlueprintSheet[];
  activeBlueprintId: string;
  setActiveBlueprintId: (id: string) => void;
  recoveryOptions: RecoveryOption[];
  auditTrail: AuditTimelineEvent[];
  auditLogs: AuditLogEntry[];
  addAuditLogEntry: (entry: Partial<AuditLogEntry>) => void;
  contractFlags: ContractClauseFlag[];
  contractClauses: ContractClause[];
  budgetDivisions: BudgetDivision[];
  ncrs: NonConformanceReport[];
  workarounds: ApprovedWorkaround[];
  notifications: NotificationItem[];
  
  // Emergency spend
  emergencySpendUsed: number;
  emergencySpendLimit: number;
  useEmergencySpend: (amount: number, reason: string) => boolean;

  // Actions
  approveItem: (id: string, notes?: string) => void;
  rejectItem: (id: string, reason: string) => void;
  modifyAndApproveItem: (id: string, modifiedRecommendation: string, modifiedCost: number, modifiedDays: number) => void;
  createRfi: (rfi: Partial<RfiItem>) => void;
  respondRfi: (rfiId: string, responseText: string) => void;
  addSiteLog: (log: Partial<SiteLogEntry>) => void;
  addInspectionScan: (scan: Partial<InspectionImageScan>) => void;
  generateNewShiftHandoff: () => ShiftHandoff;
  acknowledgeHandover: () => void;
  signOffShiftHandoff: (name?: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // UI state
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isSimulatorOpen: boolean;
  setIsSimulatorOpen: (open: boolean) => void;
  selectedApprovalForModal: ApprovalItem | null;
  setSelectedApprovalForModal: (item: ApprovalItem | null) => void;
  selectedRfiForModal: RfiItem | null;
  setSelectedRfiForModal: (rfi: RfiItem | null) => void;
  isPdfPreviewOpen: boolean;
  setIsPdfPreviewOpen: (open: boolean) => void;

  // Assistant State & Engine
  isAssistantOpen: boolean;
  setIsAssistantOpen: (open: boolean) => void;
  assistantThread: AssistantMessageItem[];
  submitAssistantQuery: (query: string) => AssistantQueryResponse;

  // Live Scenario Simulation State
  simulatorStep: number;
  isSimulating: boolean;
  runIncidentSimulation: () => void;
  resetIncidentSimulation: () => void;
  advanceSimulatorStep: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<RoleType>('supervisor');
  const [activePath, setActivePath] = useState<string>('/supervisor');
  const [project, setProject] = useState<ProjectInfo>(INITIAL_PROJECT);
  const [agents, setAgents] = useState<AgentStatus[]>(INITIAL_AGENTS);
  const [alerts, setAlerts] = useState<PriorityAlert[]>(INITIAL_ALERTS);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [approvals, setApprovals] = useState<ApprovalItem[]>(INITIAL_APPROVALS);
  const [rfis, setRfis] = useState<RfiItem[]>(INITIAL_RFIS);
  const [siteLogs, setSiteLogs] = useState<SiteLogEntry[]>(INITIAL_SITE_LOGS);
  const [shiftHandoff, setShiftHandoff] = useState<ShiftHandoff>(INITIAL_SHIFT_HANDOFF);
  const [inspections, setInspections] = useState<InspectionImageScan[]>(INITIAL_INSPECTIONS);
  const [materials, setMaterials] = useState<MaterialItem[]>(INITIAL_MATERIALS);
  const [crew, setCrew] = useState<CrewStatus[]>(INITIAL_CREW);
  const [blueprints, setBlueprints] = useState<BlueprintSheet[]>(INITIAL_BLUEPRINTS);
  const [activeBlueprintId, setActiveBlueprintId] = useState<string>(INITIAL_BLUEPRINTS[0]?.id || 'BP-L3');
  const [recoveryOptions] = useState<RecoveryOption[]>(RECOVERY_OPTIONS);
  const [auditTrail, setAuditTrail] = useState<AuditTimelineEvent[]>(INITIAL_AUDIT_TRAIL);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [contractFlags, setContractFlags] = useState<ContractClauseFlag[]>(INITIAL_CONTRACT_FLAGS);
  const [contractClauses, setContractClauses] = useState<ContractClause[]>(INITIAL_CONTRACT_CLAUSES);
  const [budgetDivisions, setBudgetDivisions] = useState<BudgetDivision[]>(INITIAL_BUDGET_DIVISIONS);
  const [ncrs, setNcrs] = useState<NonConformanceReport[]>(INITIAL_NCRS);
  const [workarounds, setWorkarounds] = useState<ApprovedWorkaround[]>(INITIAL_WORKAROUNDS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Emergency spend state
  const [emergencySpendUsed, setEmergencySpendUsed] = useState<number>(650);
  const emergencySpendLimit = 1000;

  // View & UI states
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('mobile');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState<boolean>(false);
  const [selectedApprovalForModal, setSelectedApprovalForModal] = useState<ApprovalItem | null>(null);
  const [selectedRfiForModal, setSelectedRfiForModal] = useState<RfiItem | null>(null);
  const [isPdfPreviewOpen, setIsPdfPreviewOpen] = useState<boolean>(false);

  // Assistant Chat & Diagnosis State
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [assistantThread, setAssistantThread] = useState<AssistantMessageItem[]>([
    {
      id: 'INIT-RESP-1',
      query: 'What is the recovery strategy for the approaching thunderstorm during the 2:00 PM pour?',
      response: querySiteIntelligence('What is the recovery strategy for the approaching thunderstorm during the 2:00 PM pour?'),
      timestamp: '01:45 PM',
    },
  ]);

  const submitAssistantQuery = (queryText: string): AssistantQueryResponse => {
    const response = querySiteIntelligence(queryText);
    const timeFormatted = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newThreadItem: AssistantMessageItem = {
      id: `MSG-${Date.now()}`,
      query: queryText,
      response,
      timestamp: timeFormatted,
    };
    setAssistantThread((prev) => [...prev, newThreadItem]);

    // PART 2.4 AUDIT TRAIL LOGGING:
    // Every query submitted through this assistant must be recorded in the audit trail automatically — as a logged interaction
    // (query text, timestamp, which agent responded, the grounded_in/confidence fields), independent of whether the supervisor takes any action on the response.
    // This is a passive log of what was asked and answered, not a write/act draft requiring approval.
    const auditItem: AuditTimelineEvent = {
      id: `AUD-ASK-${Date.now()}`,
      timestamp: new Date().toISOString(),
      timeFormatted,
      agent: response.respondingAgentId,
      agentName: response.respondingAgentName,
      inputDescription: `Field Inquiry: "${queryText}"`,
      outputDescription: `Assisted Guidance (Confidence: ${response.confidence}% | Responding Agent: ${response.respondingAgentName} | Grounded in: ${response.grounded_in.join('; ')}): ${response.summary}`,
      humanDecision: 'N/A', // Passive inquiry - no approval required
      humanActor: 'Karthik Raja (Site Supervisor)',
      finalAction: `Passive query interaction recorded in defensibility ledger (Grounded in ${response.grounded_in.length} artifacts)`,
      actionCategory: 'Coordination',
      verifiedArtifactHash: `0x${Math.random().toString(16).substring(2, 10).toUpperCase()}`,
    };
    setAuditTrail((prev) => [auditItem, ...prev]);

    addAuditLogEntry({
      actor: 'Karthik Raja (Site Supervisor)',
      action: 'ASSISTANT_QUERY',
      details: `Field Inquiry: "${queryText}" → Responded by ${response.respondingAgentName} (${response.confidence}% confidence, grounded in ${response.grounded_in.length} data sources).`,
      category: 'audit_inquiry',
    });

    return response;
  };

  // Simulation state
  const [simulatorStep, setSimulatorStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  // Synchronize route with role switch
  useEffect(() => {
    if (currentRole === 'supervisor' && !activePath.startsWith('/supervisor')) {
      setActivePath('/supervisor');
    } else if (currentRole === 'manager' && !activePath.startsWith('/manager')) {
      setActivePath('/manager');
    } else if (currentRole === 'contractor' && !activePath.startsWith('/contractor')) {
      setActivePath('/contractor');
    }
  }, [currentRole]);

  const navigate = (path: string) => {
    setActivePath(path);
    if (path.startsWith('/supervisor')) setCurrentRole('supervisor');
    else if (path.startsWith('/manager')) setCurrentRole('manager');
    else if (path.startsWith('/contractor')) setCurrentRole('contractor');
  };

  const useEmergencySpend = (amount: number, reason: string): boolean => {
    if (emergencySpendUsed + amount > emergencySpendLimit) {
      return false;
    }
    const newUsed = emergencySpendUsed + amount;
    setEmergencySpendUsed(newUsed);

    // Add audit entry
    const newAudit: AuditTimelineEvent = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timeFormatted: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agent: 'approval',
      agentName: 'Pre-Approved Spend Engine',
      inputDescription: `Supervisor emergency local purchase request: $${amount} for ${reason}`,
      outputDescription: `Validated under PM authorized $1,000 threshold ($${newUsed}/$1,000 utilized)`,
      humanDecision: 'APPROVED',
      humanActor: 'Karthik Raja (Site Supervisor - Authorized Threshold)',
      finalAction: `Emergency spend of $${amount} authorized for ${reason}`,
      actionCategory: 'Coordination',
    };
    setAuditTrail((prev) => [newAudit, ...prev]);
    return true;
  };

  const approveItem = (id: string, notes?: string) => {
    const item = approvals.find((a) => a.id === id);
    if (!item) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setApprovals((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: 'APPROVED',
              reviewedBy: currentRole === 'manager' ? 'Vikram Malhotra (Project Manager)' : 'Authorized User',
              reviewedAt: timeStr,
              notes: notes || a.notes,
            }
          : a
      )
    );

    // Update alert status if linked
    setAlerts((prev) =>
      prev.map((alert) =>
        alert.actionRequiredId === id
          ? { ...alert, title: `[RESOLVED] ${alert.title}`, hasRecommendation: false }
          : alert
      )
    );

    // Add audit trail event
    const newAuditEvent: AuditTimelineEvent = {
      id: `AUD-${Date.now()}`,
      timestamp: timeStr,
      timeFormatted: timeStr,
      agent: 'approval',
      agentName: 'Human Approval Gate',
      inputDescription: `Human review of ${item.title} (Est. Impact: +$${item.impactCost.toLocaleString()}, +${item.impactScheduleDays}d)`,
      outputDescription: `HUMAN AUTHORIZATION GRANTED: ${item.aiRecommendation}`,
      humanDecision: 'APPROVED',
      humanActor: currentRole === 'manager' ? 'Vikram Malhotra (Project Manager)' : 'Karthik Raja (Supervisor)',
      finalAction: `Action authorized and released to Documentation Agent for dispatch.`,
      actionCategory: 'Execution',
      verifiedArtifactHash: `0x${Math.random().toString(16).substring(2, 12)}`,
    };

    setAuditTrail((prev) => [newAuditEvent, ...prev]);

    // Dispatch notification
    const newNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      type: 'approval',
      title: `Action Approved: ${item.title}`,
      message: `Project Manager approved action. Automated dispatch instructions executed.`,
      timestamp: timeStr,
      read: false,
      targetRole: 'supervisor',
      actionUrl: '/supervisor/approvals',
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const rejectItem = (id: string, reason: string) => {
    const item = approvals.find((a) => a.id === id);
    if (!item) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setApprovals((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: 'REJECTED',
              reviewedBy: currentRole === 'manager' ? 'Vikram Malhotra (Project Manager)' : 'Authorized User',
              reviewedAt: timeStr,
              notes: `Rejected by human. Reason: ${reason}`,
            }
          : a
      )
    );

    const newAuditEvent: AuditTimelineEvent = {
      id: `AUD-${Date.now()}`,
      timestamp: timeStr,
      timeFormatted: timeStr,
      agent: 'approval',
      agentName: 'Human Approval Gate',
      inputDescription: `Human rejection of ${item.title}`,
      outputDescription: `HUMAN REJECTION RECORDED: ${reason}. AI proposal dropped.`,
      humanDecision: 'REJECTED',
      humanActor: currentRole === 'manager' ? 'Vikram Malhotra (Project Manager)' : 'Karthik Raja (Supervisor)',
      finalAction: `Proposal dropped. No external state modified.`,
      actionCategory: 'Execution',
    };

    setAuditTrail((prev) => [newAuditEvent, ...prev]);
  };

  const modifyAndApproveItem = (
    id: string,
    modifiedRecommendation: string,
    modifiedCost: number,
    modifiedDays: number
  ) => {
    const item = approvals.find((a) => a.id === id);
    if (!item) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setApprovals((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status: 'MODIFIED_AND_APPROVED',
              aiRecommendation: modifiedRecommendation,
              impactCost: modifiedCost,
              impactScheduleDays: modifiedDays,
              reviewedBy: currentRole === 'manager' ? 'Vikram Malhotra (Project Manager)' : 'Authorized User',
              reviewedAt: timeStr,
              notes: 'Modified by human operator prior to authorization.',
            }
          : a
      )
    );

    const newAuditEvent: AuditTimelineEvent = {
      id: `AUD-${Date.now()}`,
      timestamp: timeStr,
      timeFormatted: timeStr,
      agent: 'approval',
      agentName: 'Human Approval Gate',
      inputDescription: `Human modified recommendation for ${item.title}`,
      outputDescription: `HUMAN MODIFICATION & APPROVAL: "${modifiedRecommendation}" (Adjusted: $${modifiedCost}, ${modifiedDays}d)`,
      humanDecision: 'MODIFIED',
      humanActor: currentRole === 'manager' ? 'Vikram Malhotra (Project Manager)' : 'Karthik Raja (Supervisor)',
      finalAction: `Modified parameters executed under human supervision.`,
      actionCategory: 'Execution',
    };

    setAuditTrail((prev) => [newAuditEvent, ...prev]);
  };

  const createRfi = (rfiData: Partial<RfiItem>) => {
    const newNum = `RFI-02${rfis.length + 5}`;
    const newRfi: RfiItem = {
      id: `RFI-${Date.now()}`,
      rfiNumber: newNum,
      title: rfiData.title || 'Untitled RFI',
      description: rfiData.description || '',
      submittedBy: 'Karthik Raja (Site Supervisor)',
      submittedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      assignedTo: rfiData.assignedTo || 'Anand V. (Lead Architect)',
      priority: rfiData.priority || 'Medium',
      status: 'AWAITING_HUMAN_RESPONSE',
      aiSuggestedRoute: rfiData.aiSuggestedRoute || 'Route to Lead Architect with 3D overlay',
      aiSuggestedNextStep: rfiData.aiSuggestedNextStep || 'Review structural clearance before drilling',
      responseDraft: rfiData.responseDraft,
    };

    setRfis((prev) => [newRfi, ...prev]);

    // Create approval item for RFI routing
    const newApproval: ApprovalItem = {
      id: `APP-RFI-${Date.now()}`,
      title: `Authorize RFI ${newNum} Submission to Architect`,
      category: 'rfi',
      triggeredByAgent: 'documentation',
      impactCost: 0,
      impactScheduleDays: 0.1,
      aiRecommendation: `Route RFI ${newNum} "${newRfi.title}" to ${newRfi.assignedTo} with preliminary code clause review attached.`,
      evidence: ['Field condition captured via Supervisor log', 'Revision R08 drawing cross-reference'],
      status: 'PENDING_APPROVAL',
      createdAt: 'Just now',
      userRoleTarget: 'manager',
      urgency: newRfi.priority === 'High' ? 'high' : 'medium',
    };
    setApprovals((prev) => [newApproval, ...prev]);

    // Add to audit trail
    const audit: AuditTimelineEvent = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timeFormatted: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agent: 'documentation',
      agentName: 'Documentation & Drafting Agent',
      inputDescription: `Supervisor raised ${newNum}: ${newRfi.title}`,
      outputDescription: `Drafted RFI package with suggested routing to ${newRfi.assignedTo}`,
      actionCategory: 'Coordination',
      finalAction: 'Awaiting human authorization before email dispatch',
    };
    setAuditTrail((prev) => [audit, ...prev]);
  };

  const respondRfi = (rfiId: string, responseText: string) => {
    setRfis((prev) =>
      prev.map((r) =>
        r.id === rfiId
          ? {
              ...r,
              status: 'CLOSED',
              officialResponse: responseText,
            }
          : r
      )
    );

    const audit: AuditTimelineEvent = {
      id: `AUD-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timeFormatted: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      agent: 'approval',
      agentName: 'Human Approval Gate',
      inputDescription: `Architect / Engineer official sign-off on ${rfiId}`,
      outputDescription: `Official response logged: "${responseText}"`,
      humanDecision: 'APPROVED',
      humanActor: 'Anand V. (Lead Architect)',
      finalAction: 'RFI marked resolved and archived to project record',
      actionCategory: 'Coordination',
    };
    setAuditTrail((prev) => [audit, ...prev]);
  };

  const addSiteLog = (logData: Partial<SiteLogEntry>) => {
    const newLog: SiteLogEntry = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      author: 'Karthik Raja (Site Supervisor)',
      transcript: logData.transcript || '',
      location: logData.location || 'Tower A — Deck Level 3',
      relatedTask: logData.relatedTask || 'Site Daily Inspection',
      tags: logData.tags || ['field_log', 'supervisor_voice'],
      photos: logData.photos || [],
      flaggedRisks: logData.flaggedRisks,
    };
    setSiteLogs((prev) => [newLog, ...prev]);
  };

  const addInspectionScan = (scanData: Partial<InspectionImageScan>) => {
    const newScan: InspectionImageScan = {
      id: `INSP-${Date.now()}`,
      imageUrl: scanData.imageUrl || 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=600&q=80',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      location: scanData.location || 'Tower A — Level 3 Column C14',
      taskTag: scanData.taskTag || 'Visual Damage Triage',
      aiDetectedIssues: scanData.aiDetectedIssues || [
        {
          label: 'Surface Cracking Detected',
          confidence: 84,
          description: '0.4mm micro-fissure observed near column-beam junction.',
        },
      ],
      suggestedAction: scanData.suggestedAction || 'Escalate to Structural Engineer for verification. Do not perform patch repair without NDT report.',
      status: 'triage_flagged',
    };
    setInspections((prev) => [newScan, ...prev]);
  };

  const generateNewShiftHandoff = (): ShiftHandoff => {
    const handoff: ShiftHandoff = {
      id: `SH-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      shiftType: 'Day Shift',
      supervisor: 'Karthik Raja (Site Supervisor)',
      completedTasks: [
        'Level 3 Deck formwork perimeter shuttering & safety rails (100%)',
        'Zone A rebar bottom mesh placement & chair block spacing (100%)',
        'Morning safety briefing & crane pre-inspection (48 attendees)',
      ],
      pendingTasks: [
        'Level 3 slab concrete pour (Hold pending PM approval on rain reschedule)',
        'MEP electrical conduit run completion on Zone B (48% - short crew)',
        'RFI #024 resolution on Column C14 conduit sleeve',
      ],
      activeRisks: [
        'Thunderstorm front approaching Chennai coastal belt between 1:45 PM - 4:30 PM',
        'TMT 16mm rebar buffer below 2-day threshold (18 tons on site vs 25 tons needed)',
        'ABC Electrical crew deficit (12 present vs 15 contractual)',
      ],
      materialsUsed: [
        'Formwork ply sheets: 45 units',
        'Cover blocks (40mm): 600 units',
        'Binding wire: 85 kg',
      ],
      nextShiftPriorities: [
        'If PM approves reschedule, execute concrete pour at 06:00 AM tomorrow before high heat',
        'Unload and bar-bend 7 tons emergency TMT rebar once stockist truck arrives at Yard 2',
        'Inspect curing burlap sheets and de-watering pumps in Basement 2 sump',
      ],
      signedOff: false,
    };
    setShiftHandoff(handoff);
    return handoff;
  };

  const acknowledgeHandover = () => {
    setShiftHandoff((prev) => ({
      ...prev,
      signedOff: true,
      acknowledgedBy: 'Nagarajan M. (Night Shift Lead Engineer)',
    }));
  };

  const signOffShiftHandoff = (name?: string) => {
    setShiftHandoff((prev) => ({
      ...prev,
      signedOff: true,
      acknowledgedBy: name || 'Dinesh Kumar (Night Shift In-Charge)',
    }));
  };

  const addAuditLogEntry = (entry: Partial<AuditLogEntry>) => {
    const newEntry: AuditLogEntry = {
      id: `LOG-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actor: entry.actor || (currentRole === 'manager' ? 'Vikram Malhotra (Project Manager)' : 'Authorized User'),
      action: entry.action || 'GENERAL_ACTION',
      details: entry.details || 'Action recorded in site ledger.',
      category: entry.category || 'system',
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  // Interactive Live Scenario Simulator Runner
  const runIncidentSimulation = () => {
    setIsSimulating(true);
    setSimulatorStep(1);
    setIsSimulatorOpen(true);
  };

  const advanceSimulatorStep = () => {
    setSimulatorStep((prev) => {
      const next = prev + 1;
      if (next >= 11) {
        setIsSimulating(false);
      }
      return next;
    });
  };

  const resetIncidentSimulation = () => {
    setSimulatorStep(0);
    setIsSimulating(false);
  };

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        activePath,
        navigate,
        project,
        setProject,
        agents,
        alerts,
        tasks,
        approvals,
        rfis,
        siteLogs,
        shiftHandoff,
        inspections,
        materials,
        crew,
        blueprints,
        activeBlueprintId,
        setActiveBlueprintId,
        recoveryOptions,
        auditTrail,
        auditLogs,
        addAuditLogEntry,
        contractFlags,
        contractClauses,
        budgetDivisions,
        ncrs,
        workarounds,
        notifications,
        emergencySpendUsed,
        emergencySpendLimit,
        useEmergencySpend,
        approveItem,
        rejectItem,
        modifyAndApproveItem,
        createRfi,
        respondRfi,
        addSiteLog,
        addInspectionScan,
        generateNewShiftHandoff,
        acknowledgeHandover,
        signOffShiftHandoff,
        markNotificationRead,
        markAllNotificationsRead,
        deviceMode,
        setDeviceMode,
        isSearchOpen,
        setIsSearchOpen,
        isSimulatorOpen,
        setIsSimulatorOpen,
        selectedApprovalForModal,
        setSelectedApprovalForModal,
        selectedRfiForModal,
        setSelectedRfiForModal,
        isPdfPreviewOpen,
        setIsPdfPreviewOpen,
        isAssistantOpen,
        setIsAssistantOpen,
        assistantThread,
        submitAssistantQuery,
        simulatorStep,
        isSimulating,
        runIncidentSimulation,
        resetIncidentSimulation,
        advanceSimulatorStep,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
