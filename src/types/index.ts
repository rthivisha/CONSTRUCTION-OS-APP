export type RoleType = 'supervisor' | 'manager' | 'contractor';

export type RiskLevel = 'critical' | 'warning' | 'info' | 'safe';

export type AgentType = 
  | 'orchestrator'
  | 'environmental'
  | 'cost'
  | 'compliance'
  | 'procurement'
  | 'vision'
  | 'blueprint'
  | 'documentation'
  | 'contract'
  | 'recovery'
  | 'memory'
  | 'approval';

export interface AgentStatus {
  id: AgentType;
  name: string;
  roleDescription: string;
  status: 'idle' | 'observing' | 'analyzing' | 'recommending' | 'complete';
  lastAction: string;
  lastActiveTime: string;
  confidence?: number;
}

export interface ProjectInfo {
  id: string;
  name: string;
  code: string;
  location: string;
  status: 'ACTIVE' | 'ON_HOLD' | 'DELAYED';
  phase: string;
  targetCompletion: string;
  budgetTotal: number;
  budgetSpent: number;
  totalBudget: number;
  spentBudget: number;
  budgetVariance: number;
  riskLevel: string;
  scheduleHealth: number; // percentage e.g. 72
}

export interface BudgetDivision {
  id: string;
  divisionCode: string;
  name: string;
  allocated: number;
  spent: number;
  variance: number;
}

export interface ContractClause {
  id: string;
  section: string;
  title: string;
  subcontractor: string;
  text: string;
  complianceStatus: 'COMPLIANT' | 'FLAGGED' | 'NON_COMPLIANT';
  aiAnalysis: string;
  penaltyRisk?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
  category: string;
}

export interface TaskItem {
  id: string;
  title: string;
  location: string;
  assignedCrew: string;
  crewCount: number;
  status: 'in_progress' | 'scheduled' | 'delayed' | 'completed' | 'blocked';
  deadline: string;
  progress: number;
  priority: 'high' | 'medium' | 'low';
  riskFlag?: string;
}

export interface PriorityAlert {
  id: string;
  level: RiskLevel;
  title: string;
  description: string;
  triggerAgent: AgentType;
  timestamp: string;
  affectedTask?: string;
  hasRecommendation: boolean;
  recommendationSummary?: string;
  actionRequiredId?: string;
}

export type ApprovalStatus = 'PENDING_APPROVAL' | 'APPROVED' | 'REJECTED' | 'MODIFIED_AND_APPROVED';

export interface ApprovalItem {
  id: string;
  title: string;
  category: 'schedule' | 'procurement' | 'safety' | 'contract' | 'spend' | 'rfi';
  triggeredByAgent: AgentType;
  impactCost: number;
  impactScheduleDays: number;
  aiRecommendation: string;
  evidence: string[];
  status: ApprovalStatus;
  createdAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
  userRoleTarget: RoleType;
  urgency: 'critical' | 'high' | 'medium';
  actionDraft?: {
    type: string;
    recipient: string;
    draftText: string;
  };
  notes?: string;
}

export interface RfiItem {
  id: string;
  rfiNumber: string;
  title: string;
  description: string;
  submittedBy: string;
  submittedAt: string;
  assignedTo: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'AWAITING_HUMAN_RESPONSE' | 'IN_REVIEW' | 'CLOSED';
  aiSuggestedRoute: string;
  aiSuggestedNextStep: string;
  attachments?: string[];
  responseDraft?: string;
  officialResponse?: string;
}

export interface SiteLogEntry {
  id: string;
  timestamp: string;
  author: string;
  rawVoiceAudioUrl?: string;
  transcript: string;
  location: string;
  relatedTask?: string;
  tags: string[];
  photos?: string[];
  flaggedRisks?: string[];
}

export interface ShiftHandoff {
  id: string;
  date: string;
  shiftType: 'Day Shift' | 'Night Shift';
  supervisor: string;
  completedTasks: string[];
  pendingTasks: string[];
  activeRisks: string[];
  materialsUsed: string[];
  nextShiftPriorities: string[];
  signedOff: boolean;
  acknowledgedBy?: string;
}

export interface InspectionImageScan {
  id: string;
  imageUrl: string;
  timestamp: string;
  location: string;
  taskTag: string;
  aiDetectedIssues: {
    label: string;
    confidence: number;
    description: string;
    boundingBox?: { x: number; y: number; w: number; h: number };
  }[];
  suggestedAction: string;
  status: 'triage_flagged' | 'escalated_to_engineer' | 'verified_safe' | 'archived';
  engineerNotes?: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  category: string;
  currentStock: number;
  requiredStock: number;
  unit: string;
  percentage: number;
  status: 'optimal' | 'shortage_predicted' | 'delayed' | 'en_route';
  deliveryInfo: string;
  supplier: string;
  shortageRisk?: {
    quantity: number;
    predictedShortageTime: string;
    recommendedSource: string;
  };
}

export interface CrewStatus {
  id: string;
  trade: string;
  subcontractor: string;
  requiredCount: number;
  presentCount: number;
  shortfall: number;
  productivityLossPercent: number;
  estimatedDelayHours: number;
  supervisorNotes?: string;
  notificationSent: boolean;
}

export interface BlueprintSheet {
  id: string;
  code: string;
  title: string;
  level: 'Ground Floor' | 'Level 1' | 'Level 2' | 'Level 3' | 'MEP' | 'Structural';
  revisionCurrent: string;
  revisionPrevious: string;
  updatedAt: string;
  changesDetected: {
    id: string;
    title: string;
    description: string;
    discipline: 'Structural' | 'Electrical' | 'Architectural' | 'Plumbing' | string;
    zone?: string;
    impact?: string;
    markerPosition: { x: number; y: number };
    status: 'pending_review' | 'approved_for_site' | 'rejected' | string;
  }[];
}

export interface RecoveryOption {
  id: 'option_a' | 'option_b' | 'option_c';
  title: string;
  strategy: string;
  costImpact: number;
  costImpactFormatted: string;
  scheduleImpactDays: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  isRecommended: boolean;
  rationale: string;
  precedentSummary: string;
  draftedActions: string[];
}

export interface AuditTimelineEvent {
  id: string;
  timestamp: string;
  timeFormatted: string;
  agent: AgentType;
  agentName: string;
  inputDescription: string;
  outputDescription: string;
  humanDecision?: 'APPROVED' | 'REJECTED' | 'MODIFIED' | 'PENDING' | 'N/A';
  humanActor?: string;
  finalAction: string;
  actionCategory: 'Risk Triage' | 'Coordination' | 'Cost Modeling' | 'Recovery' | 'Execution' | 'Compliance';
  verifiedArtifactHash?: string;
}

export interface ContractClauseFlag {
  id: string;
  contractNumber: string;
  contractorName: string;
  sectionCode: string;
  sectionTitle: string;
  contractRequirement: string;
  observedCondition: string;
  evidencePhotoUrl?: string;
  aiSuggestedActions: string[];
  status: 'FLAGGED' | 'NOTICE_DRAFTED' | 'ESCALATED_LEGAL' | 'RESOLVED';
}

export interface NonConformanceReport {
  id: string;
  ncrNumber: string;
  title: string;
  issueDescription: string;
  subcontractor: string;
  priority: 'Critical' | 'High' | 'Medium';
  status: 'Under Review' | 'Notice Issued' | 'Rectification In Progress' | 'Closed';
  deadline: string;
  evidence: string[];
}

export interface ApprovedWorkaround {
  id: string;
  code: string;
  title: string;
  originalConflict: string;
  approvedSolution: string;
  approvedBy: string;
  approvalDate: string;
  drawingRef: string;
  discipline: string;
}

export interface NotificationItem {
  id: string;
  type: 'safety' | 'weather' | 'shortage' | 'rfi' | 'approval' | 'blueprint' | 'contract' | 'crew';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  targetRole: RoleType;
  actionUrl?: string;
}
