import { useMemo, useState } from 'react';
import { HashRouter, Route, Routes, useNavigate } from 'react-router';

import { type PolicySettings, FederatedInstancesPage } from '@/App/FederatedInstances/FederatedInstancesPage';
import { LeaveInstanceDialog } from '@/App/FederatedInstances/LeaveInstanceDialog';
import { type Destination, INITIAL_DESTINATIONS, resolveForUser } from '@/App/FederatedInstances/data';
import { AccountFlyout } from '@/App/Shell/AccountFlyout';
import { AeroShell } from '@/App/Shell/AeroShell';
import { CentralizedAuthPage } from '@/App/UserManagement/CentralizedAuthPage';
import { type AuthUser, INITIAL_USERS } from '@/App/UserManagement/data';
import ErrorBoundaryWrapper from '@/App/components/ErrorBoundaryWrapper';
import { initializeFoundationPromise } from '@/utilities/foundation';

// Fire-and-forget: foundation telemetry must not block first paint (it's a
// 30s timeout on static hosts like GitHub Pages where PageBase is absent).
void initializeFoundationPromise();

const Prototypes = () => {
	const navigate = useNavigate();
	const [destinations, setDestinations] = useState<Destination[]>(INITIAL_DESTINATIONS);
	const [users, setUsers] = useState<AuthUser[]>(INITIAL_USERS);
	const settings: PolicySettings = { assignmentBackedListing: true, previewSecurity: false };
	const [leaving, setLeaving] = useState<Destination | null>(null);

	const resolved = useMemo(() => resolveForUser(destinations, settings), [destinations, settings]);

	const accountSlot = (
		<AccountFlyout
			destinations={resolved}
			onSelectDestination={setLeaving}
			onViewAll={() => {
				navigate('/');
				document.getElementById('main-content')?.focus();
			}}
		/>
	);

	return (
		<>
			<Routes>
				<Route
					path='/users'
					element={
						<AeroShell
							instanceName='United States Central'
							breadcrumb={['Admin', 'Authentication', 'Centralized Authentication']}
							accountSlot={accountSlot}
						>
							<CentralizedAuthPage users={users} setUsers={setUsers} onNavigateToFederatedInstances={() => navigate('/')} />
						</AeroShell>
					}
				/>
				<Route
					path='*'
					element={
						<AeroShell
							instanceName='United States Central'
							breadcrumb={['Admin', 'Authentication', 'Federated Instances']}
							accountSlot={accountSlot}
						>
							<FederatedInstancesPage
								destinations={destinations}
								setDestinations={setDestinations}
								onNavigateToUsers={() => navigate('/users')}
							/>
						</AeroShell>
					}
				/>
			</Routes>
			<LeaveInstanceDialog
				destination={leaving}
				onHide={() => setLeaving(null)}
				onConfirm={(d) => {
					window.open(d.entryUrl, '_blank', 'noopener');
					setLeaving(null);
				}}
			/>
		</>
	);
};

const App = () => (
	<ErrorBoundaryWrapper componentName='AuthPrototypes'>
		<HashRouter>
			<Prototypes />
		</HashRouter>
	</ErrorBoundaryWrapper>
);

export default App;
