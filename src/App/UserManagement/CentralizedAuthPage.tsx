import { useMemo, useState } from 'react';
import { Button, Column, DataTable, Dialog, Dropdown, ScreenReaderOnly } from 'relativity-ui';

import { AUTH_SECTION_TABS, type AssignmentStatus, type AuthUser, PROVIDERS } from '@/App/UserManagement/data';

interface Props {
	users: AuthUser[];
	setUsers: (updater: (prev: AuthUser[]) => AuthUser[]) => void;
	onNavigateToFederatedInstances: () => void;
}

type StatusFilter = 'Eligible' | 'Pending' | 'Enrolled';
type Row = AuthUser & { index: number; account: string; statusInProvider: string };

const STATUS_OPTIONS: { label: string; value: StatusFilter }[] = [
	{ label: 'Eligible (not yet added)', value: 'Eligible' },
	{ label: 'Pending (invitation sent)', value: 'Pending' },
	{ label: 'Enrolled (has access)', value: 'Enrolled' }
];

const FILTER_DEFAULTS = {
	fullName: { value: null, matchMode: 'contains' as const },
	email: { value: null, matchMode: 'contains' as const },
	account: { value: null, matchMode: 'contains' as const }
};

export function CentralizedAuthPage({ users, setUsers, onNavigateToFederatedInstances }: Props) {
	const [provider, setProvider] = useState(PROVIDERS[1]);
	const [status, setStatus] = useState<StatusFilter>('Eligible');
	const [selection, setSelection] = useState<Row[]>([]);
	const [confirming, setConfirming] = useState(false);
	const [statusMsg, setStatusMsg] = useState('');
	const [filters, setFilters] = useState<Record<string, { value: string | null; matchMode: 'contains' }>>(FILTER_DEFAULTS);

	const rows: Row[] = useMemo(
		() =>
			users
				.filter((u) => {
					const s = u.assignments[provider];
					if (status === 'Eligible') return !s;
					return s === status;
				})
				.map((u, i) => ({
					...u,
					index: i + 1,
					account: u.hasCentralAccount ? 'Existing account' : 'No account yet',
					statusInProvider: u.assignments[provider] ?? 'Eligible'
				})),
		[users, provider, status]
	);

	const newUsers = selection.filter((u) => !u.hasCentralAccount);
	const existingUsers = selection.filter((u) => u.hasCentralAccount);

	function applyAdd() {
		const ids = selection.map((u) => u.id);
		setUsers((prev) =>
			prev.map((u) => {
				if (!ids.includes(u.id)) return u;
				const nextStatus: AssignmentStatus = u.hasCentralAccount ? 'Enrolled' : 'Pending';
				return { ...u, assignments: { ...u.assignments, [provider]: nextStatus } };
			})
		);
		const parts = [];
		if (newUsers.length > 0) parts.push(`${newUsers.length} invitation${newUsers.length > 1 ? 's' : ''} sent`);
		if (existingUsers.length > 0) parts.push(`${existingUsers.length} user${existingUsers.length > 1 ? 's' : ''} granted access`);
		setStatusMsg(`${parts.join(' · ')}.`);
		setSelection([]);
		setConfirming(false);
	}

	return (
		<div style={{ padding: 'var(--size-l) var(--size-xl)' }}>
			<div aria-live='polite' role='status'>
				<ScreenReaderOnly>{statusMsg}</ScreenReaderOnly>
			</div>

			{/* Authentication section tabs */}
			<nav aria-label='Authentication sections' style={{ marginBottom: 'var(--size-l)' }}>
				<ul style={{ display: 'flex', gap: 'var(--size-xs)', margin: 0, padding: 0, listStyle: 'none', overflowX: 'auto' }}>
					{AUTH_SECTION_TABS.map((tab) => {
						const active = tab === 'Centralized Authentication';
						return (
							<li key={tab}>
								<a
									href='#'
									aria-current={active ? 'page' : undefined}
									onClick={(e) => {
										e.preventDefault();
										if (tab === 'Federated Instance') onNavigateToFederatedInstances();
									}}
									style={{
										display: 'block',
										padding: 'var(--size-s) var(--size-m)',
										whiteSpace: 'nowrap',
										textDecoration: 'none',
										color: active ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
										fontWeight: active ? 700 : 400,
										borderBottom: active ? '2px solid var(--color-brand)' : '2px solid transparent'
									}}
								>
									{tab}
								</a>
							</li>
						);
					})}
				</ul>
			</nav>

			<section
				aria-label='Centralized Authentication users'
				style={{
					background: 'var(--color-background-secondary)',
					borderRadius: 'var(--border-radius)',
					boxShadow: '0 1px 3px rgba(44, 50, 60, 0.12)',
					padding: 'var(--size-l)'
				}}
			>
				{/* Provider (policy) tabs + tenant-wide access view */}
				<nav aria-label='Sign-in policies' style={{ borderBottom: '1px solid var(--color-border-secondary)', marginBottom: 'var(--size-l)' }}>
					<ul style={{ display: 'flex', gap: 'var(--size-xs)', margin: 0, padding: 0, listStyle: 'none', overflowX: 'auto' }}>
						{PROVIDERS.map((p) => {
							const active = p === provider;
							return (
								<li key={p}>
									<button
										type='button'
										aria-current={active ? 'true' : undefined}
										onClick={() => {
											setProvider(p);
											setSelection([]);
										}}
										style={{
											background: 'none',
											border: 'none',
											font: 'inherit',
											cursor: 'pointer',
											padding: 'var(--size-s) var(--size-m)',
											whiteSpace: 'nowrap',
											color: active ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
											fontWeight: active ? 700 : 400,
											borderBottom: active ? '2px solid var(--color-interactive)' : '2px solid transparent'
										}}
									>
										{p}
									</button>
								</li>
							);
						})}
					</ul>
				</nav>

				<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--size-m)', marginBottom: 'var(--size-l)', flexWrap: 'wrap' }}>
						<label htmlFor='status-filter' className='rui-body-bold' style={{ color: 'var(--color-text-primary)' }}>
							Status
						</label>
						<Dropdown
							inputId='status-filter'
							value={status}
							options={STATUS_OPTIONS}
							onChange={(e: { value: StatusFilter }) => {
								setStatus(e.value);
								setSelection([]);
							}}
							style={{ minWidth: 380 }}
						/>
						<span className='rui-caption' style={{ color: 'var(--color-text-tertiary)' }}>
							{rows.length} of {users.length} users {status === 'Eligible' ? 'are eligible' : status === 'Pending' ? 'are pending' : 'are enrolled'}
						</span>
					</div>

				<DataTable
					value={rows}
					dataKey='id'
					size='small'
					stripedRows
					filters={filters}
					onFilter={(e: { filters: typeof filters }) => setFilters(e.filters)}
					filterDisplay='row'
					selection={selection}
					onSelectionChange={(e: { value: Row[] }) => setSelection(e.value)}
					selectionMode='checkbox'
					tableStyle={{ minWidth: '900px' }}
				>
					<Column field='index' header='#' style={{ width: 48 }} bodyStyle={{ color: 'var(--color-gray-40)' }} />
					<Column selectionMode='multiple' style={{ width: 44 }} />
					<Column field='artifactId' header='Artifact ID' style={{ width: 110 }} />
					<Column field='fullName' header='Full Name' filter showFilterMenu={false} filterPlaceholder='Filter' />
					<Column field='email' header='Email' filter showFilterMenu={false} filterPlaceholder='Filter' />
					<Column field='userType' header='User Type' style={{ width: 100 }} />
					<Column
						field='account'
						header='Centralized Account'
						filter
						showFilterMenu={false}
						filterPlaceholder='Filter'
						style={{ width: 230 }}
						body={(row: Row) => (
							<span style={{ display: 'flex', flexDirection: 'column', gap: 'var(--size-xxs)' }}>
								<span style={{ color: row.hasCentralAccount ? 'var(--color-success)' : 'var(--color-text-tertiary)' }}>
									{row.account}
								</span>
								{row.hasCentralAccount && (
									<span className='rui-caption' style={{ color: 'var(--color-text-tertiary)' }}>
										Added through another instance
									</span>
								)}
							</span>
						)}
					/>
					<Column
						header='Status'
						style={{ width: 110 }}
						body={(row: Row) => (
							<span
								style={{
									color:
										row.statusInProvider === 'Enrolled'
											? 'var(--color-success)'
											: row.statusInProvider === 'Pending'
												? 'var(--color-warning)'
												: 'var(--color-text-tertiary)'
								}}
							>
								{row.statusInProvider}
							</span>
						)}
					/>
				</DataTable>

				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'var(--size-m)' }}>
					<Button
						label='Add to provider'
						disabled={selection.length === 0 || status !== 'Eligible'}
						onClick={() => setConfirming(true)}
					/>
					<span className='rui-body-bold' style={{ color: 'var(--color-text-primary)' }}>
						Total: {rows.length}
					</span>
				</div>
			</section>

			{/* Add-to-provider confirmation: honest, split by whether a central account exists */}
			<Dialog
				header={`Add to ${provider}`}
				visible={confirming}
				width='small'
				onHide={() => setConfirming(false)}
				footer={
					<>
						<Button label='Cancel' severity='secondary' onClick={() => setConfirming(false)} />
						<Button label='Confirm' onClick={applyAdd} autoFocus />
					</>
				}
			>
				<div className='rui-body' style={{ display: 'flex', flexDirection: 'column', gap: 'var(--size-l)', color: 'var(--color-text-primary)' }}>
					{newUsers.length > 0 && (
						<div>
							<p className='rui-body-bold' style={{ margin: '0 0 var(--size-xs)' }}>
								New users ({newUsers.length})
							</p>
							<ul style={{ margin: '0 0 var(--size-xs)', paddingLeft: 18 }}>
								{newUsers.map((u) => (
									<li key={u.id}>{u.fullName}</li>
								))}
							</ul>
							<p style={{ margin: 0, color: 'var(--color-text-tertiary)' }}>
								Will get an email invitation to set up an account, and stay in Pending until they finish.
							</p>
						</div>
					)}
					{newUsers.length > 0 && existingUsers.length > 0 && (
						<hr style={{ margin: 0, border: 'none', borderTop: '1px solid var(--color-border-secondary)' }} />
					)}
					{existingUsers.length > 0 && (
						<div>
							<p className='rui-body-bold' style={{ margin: '0 0 var(--size-xs)' }}>
								Existing users ({existingUsers.length})
							</p>
							<ul style={{ margin: '0 0 var(--size-xs)', paddingLeft: 18 }}>
								{existingUsers.map((u) => (
									<li key={u.id}>{u.fullName}</li>
								))}
							</ul>
							<p style={{ margin: 0, color: 'var(--color-text-tertiary)' }}>
								Already have a centralized account, so access is granted right away. No invitation is
								sent, only a notification that this instance was added.
							</p>
						</div>
					)}
				</div>
			</Dialog>
		</div>
	);
}
