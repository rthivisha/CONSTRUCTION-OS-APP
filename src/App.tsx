/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';

// Supervisor Views
import { SupervisorHome } from './components/supervisor/SupervisorHome';
import { SupervisorSiteLog } from './components/supervisor/SupervisorSiteLog';
import { SupervisorApprovals } from './components/supervisor/SupervisorApprovals';
import { SupervisorInspection } from './components/supervisor/SupervisorInspection';
import { SupervisorMaterials } from './components/supervisor/SupervisorMaterials';
import { SupervisorBlueprints } from './components/supervisor/SupervisorBlueprints';

// Project Manager Views
import { ManagerCommandCenter } from './components/manager/ManagerCommandCenter';
import { ManagerApprovals } from './components/manager/ManagerApprovals';
import { ManagerBudget } from './components/manager/ManagerBudget';
import { ManagerContracts } from './components/manager/ManagerContracts';
import { ManagerRecovery } from './components/manager/ManagerRecovery';
import { ManagerProcurement } from './components/manager/ManagerProcurement';
import { ManagerAuditTrail } from './components/manager/ManagerAuditTrail';
import { ManagerCrewShortfall } from './components/manager/ManagerCrewShortfall';

// Contractor / Engineer Views
import { ContractorRfis } from './components/contractor/ContractorRfis';
import { ContractorBlueprints } from './components/contractor/ContractorBlueprints';
import { ContractorCompliance } from './components/contractor/ContractorCompliance';
import { ContractorShiftHandover } from './components/contractor/ContractorShiftHandover';
import { ContractorNcr } from './components/contractor/ContractorNcr';
import { ContractorWorkarounds } from './components/contractor/ContractorWorkarounds';
import { ContractorMessages } from './components/contractor/ContractorMessages';

const AppRouter: React.FC = () => {
  const { activePath, currentRole } = useApp();

  const renderContent = () => {
    switch (activePath) {
      // Supervisor Routes
      case '/supervisor':
        return <SupervisorHome />;
      case '/supervisor/site-log':
        return <SupervisorSiteLog />;
      case '/supervisor/approvals':
        return <SupervisorApprovals />;
      case '/supervisor/inspection':
        return <SupervisorInspection />;
      case '/supervisor/materials':
        return <SupervisorMaterials />;
      case '/supervisor/blueprints':
        return <SupervisorBlueprints />;

      // Manager Routes
      case '/manager':
        return <ManagerCommandCenter />;
      case '/manager/approvals':
        return <ManagerApprovals />;
      case '/manager/budget':
        return <ManagerBudget />;
      case '/manager/contracts':
        return <ManagerContracts />;
      case '/manager/recovery':
        return <ManagerRecovery />;
      case '/manager/procurement':
        return <ManagerProcurement />;
      case '/manager/audit':
        return <ManagerAuditTrail />;
      case '/manager/crew':
        return <ManagerCrewShortfall />;

      // Contractor Routes
      case '/contractor':
        return <ContractorRfis />;
      case '/contractor/blueprints':
        return <ContractorBlueprints />;
      case '/contractor/compliance':
        return <ContractorCompliance />;
      case '/contractor/contracts':
        return <ManagerContracts />;
      case '/contractor/messages':
        return <ContractorMessages />;
      case '/contractor/handover':
        return <ContractorShiftHandover />;
      case '/contractor/non-conformance':
        return <ContractorNcr />;
      case '/contractor/workarounds':
        return <ContractorWorkarounds />;

      default:
        // Role fallback
        if (currentRole === 'supervisor') return <SupervisorHome />;
        if (currentRole === 'manager') return <ManagerCommandCenter />;
        return <ContractorRfis />;
    }
  };

  return <AppShell>{renderContent()}</AppShell>;
};

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
