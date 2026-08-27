import { useMemo, useRef, useState } from 'react';
import {
	Button,
	Column,
	DataTable,
	Dialog,
	Dropdown,
	FormField,
	InputText,
	Menu,
	ScreenReaderOnly,
} from 'relativity-ui';

import {
	type Destination,
	type Topology,
	effectiveName
} from '@/App/FederatedInstances/data';
import { AUTH_SECTION_TABS } from '@/App/UserManagement/data';

export interface PolicySettings {
	assignmentBackedListing: boolean;
	previewSecurity: boolean;
}

interface Props {
	destinations: Destination[];
	setDestinations: (updater: (prev: Destination[]) => Destination[]) => void;
	onNavigateToUsers?: () => void;
}

interface DraftLink {
	displayName: string;
	entryUrl: string;
	topology: Topology;
}

type Row = Destination & { name: string; topologyLabel: string; index: number };

const EMPTY_DRAFT: DraftLink = { displayName: '', entryUrl: '', topology: 'R1' };

const TOPOLOGY_OPTIONS = [
	{ label: 'RelativityOne (R1)', value: 'R1' },
	{ label: 'Relativity Server', value: 'SERVER' }
];

const FILTER_DEFAULTS = {
	name: { value: null, matchMode: 'contains' as const },
	entryUrl: { value: null, matchMode: 'contains' as const },
	topologyLabel: { value: null, matchMode: 'contains' as const }
};

export function FederatedInstancesPage({ destinations, setDestinations, onNavigateToUsers }: Props) {
	const [draft, setDraft] = useState<DraftLink | null>(null);
	const [draftErrors, setDraftErrors] = useState<Partial<Record<'displayName' | 'entryUrl', string>>>({});
	const [editingId, setEditingId] = useState<number | null>(null);
	const [statusMsg, setStatusMsg] = useState('');
	const [selection, setSelection] = useState<Row[]>([]);
	const [filters, setFilters] = useState<Record<string, { value: string | null; matchMode: 'contains' }>>(FILTER_DEFAULTS);
	const actionsMenuRef = useRef<Menu>(null);

	const rows: Row[] = useMemo(
		() =>
			[...destinations]
				.sort((a, b) => a.order - b.order)
				.map((d, i) => ({
					...d,
					index: i + 1,
					name: effectiveName(d),
					topologyLabel: d.topology === 'SERVER' ? 'Server' : 'RelativityOne'
				})),
		[destinations]
	);

	const editingRow = editingId != null ? destinations.find((d) => d.id === editingId) : undefined;
	const editingIdp = editingRow?.origin === 'idp';

	function openEdit(row: Destination) {
		setDraft({
			displayName: effectiveName(row),
			entryUrl: row.entryUrl,
			topology: row.topology
		});
		setDraftErrors({});
		setEditingId(row.id);
	}

	function setHiddenFor(ids: number[], hidden: boolean) {
		if (ids.length === 0) return;
		setDestinations((prev) => prev.map((d) => (ids.includes(d.id) ? { ...d, hidden } : d)));
		setStatusMsg(`${ids.length} destination${ids.length > 1 ? 's' : ''} ${hidden ? 'hidden from' : 'shown to'} end users.`);
		setSelection([]);
	}

	function saveDraft() {
		if (!draft) return;
		const errors: typeof draftErrors = {};
		if (!draft.displayName.trim()) errors.displayName = 'Enter a display name for this destination.';
		if (!editingIdp) {
			if (!draft.entryUrl.trim()) errors.entryUrl = 'Enter the entry URL.';
			else if (!/^https:\/\/.+/i.test(draft.entryUrl.trim()))
				errors.entryUrl = 'Entry URL must use HTTPS (validation rules per Security, R5.2).';
		}
		setDraftErrors(errors);
		if (Object.keys(errors).length > 0) return;

		if (editingIdp && editingRow) {
			// Automatic rows: the name is an instance-policy overlay; URL stays IdP truth (R3.3/R3.6).
			const name = draft.displayName.trim();
			setDestinations((prev) =>
				prev.map((d) => (d.id === editingRow.id ? { ...d, renamedTo: name === d.displayName ? undefined : name } : d))
			);
			setStatusMsg(`${name} updated.`);
		} else if (editingId != null) {
			setDestinations((prev) =>
				prev.map((d) =>
					d.id === editingId
						? {
								...d,
								displayName: draft.displayName.trim(),
								entryUrl: draft.entryUrl.trim(),
								topology: draft.topology
							}
						: d
				)
			);
			setStatusMsg(`${draft.displayName} updated.`);
		} else {
			setDestinations((prev) => [
				...prev,
				{
					id: Math.max(0, ...prev.map((d) => d.id)) + 1,
					displayName: draft.displayName.trim(),
					entryUrl: draft.entryUrl.trim(),
					origin: 'manual',
					topology: draft.topology,
					hidden: false,
					order: Math.max(0, ...prev.map((d) => d.order)) + 1
				}
			]);
			setStatusMsg(`${draft.displayName} added as a manual link.`);
		}
		setDraft(null);
		setEditingId(null);
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
						const active = tab === 'Federated Instance';
						return (
							<li key={tab}>
								<a
									href='#'
									aria-current={active ? 'page' : undefined}
									onClick={(e) => {
										e.preventDefault();
										if (tab === 'Centralized Authentication') onNavigateToUsers?.();
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

			{/* Page header (R3.3) */}
			<div style={{ marginBottom: 'var(--size-l)' }}>
				<h2 className='rui-h2' style={{ margin: 0, color: 'var(--color-text-primary)' }}>
					Federated Instances
				</h2>
			</div>

			{/* Destination catalog */}
			<section
				aria-labelledby='catalog-heading'
				style={{
					background: 'var(--color-background-secondary)',
					borderRadius: 'var(--border-radius)',
					boxShadow: '0 1px 3px rgba(44, 50, 60, 0.12)',
					padding: 'var(--size-l)'
				}}
			>
				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--size-l)', marginBottom: 'var(--size-m)' }}>
					<h2 id='catalog-heading' className='rui-h3-bold' style={{ margin: 0, color: 'var(--color-text-primary)' }}>
						Destinations
					</h2>
					<Button
						label='New manual link'
						onClick={() => {
							setDraft({ ...EMPTY_DRAFT });
							setDraftErrors({});
							setEditingId(null);
						}}
					/>
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
					tableStyle={{ minWidth: '960px' }}
				>
					<Column field='index' header='#' style={{ width: 48 }} bodyStyle={{ color: 'var(--color-gray-40)' }} />
					<Column selectionMode='multiple' style={{ width: 44 }} />
					<Column
						style={{ width: 40 }}
						body={(row: Row) => (
							<button
								type='button'
								aria-label={`Edit ${row.name}`}
								onClick={() => openEdit(row)}
								style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--size-xxs)' }}
							>
								<span
									className='relativity-icons-edit'
									aria-hidden='true'
									style={{ fontFamily: 'relativity-icons', fontSize: 14, color: 'var(--color-interactive)' }}
								/>
							</button>
						)}
					/>
					<Column
						field='name'
						header='Display Name'
						filter
						showFilterMenu={false}
						filterPlaceholder='Filter'
						body={(row: Row) => (
							<a
								href='#'
								onClick={(e) => {
									e.preventDefault();
									openEdit(row);
								}}
								style={{ color: 'var(--color-interactive)', textDecoration: 'none' }}
							>
								{row.name}
							</a>
						)}
					/>
					<Column field='entryUrl' header='Entry URL' filter showFilterMenu={false} filterPlaceholder='Filter' />
					<Column field='topologyLabel' header='Type' filter showFilterMenu={false} filterPlaceholder='Filter' style={{ width: 120 }} />
					<Column
						header='Status'
						style={{ width: 110 }}
						body={(row: Row) => (
							<span style={{ color: row.hidden ? 'var(--color-disabled)' : 'var(--color-success)' }}>
								{row.hidden ? 'Hidden' : 'Visible'}
							</span>
						)}
					/>
				</DataTable>

				<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'var(--size-m)' }}>
					<span style={{ display: 'inline-flex' }}>
						{/* Split treatment per Documents reference: label segment, divider, chevron segment */}
						<Button
							label='Actions'
							severity='secondary'
							disabled={selection.length === 0}
							aria-haspopup='true'
							onClick={(e: React.MouseEvent) => actionsMenuRef.current?.toggle(e)}
							style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
						/>
						<Button
							icon='relativity-icons-arrows-menu-down'
							severity='secondary'
							disabled={selection.length === 0}
							aria-label='Open actions menu'
							aria-haspopup='true'
							onClick={(e: React.MouseEvent) => actionsMenuRef.current?.toggle(e)}
							style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginLeft: -1 }}
						/>
						<Menu
							ref={actionsMenuRef}
							popup
							className='actions-menu'
							model={[
								{ label: 'Show in flyout', command: () => setHiddenFor(selection.map((r) => r.id), false) },
								{ label: 'Hide from flyout', command: () => setHiddenFor(selection.map((r) => r.id), true) }
							]}
						/>
					</span>
					<span className='rui-body-bold' style={{ color: 'var(--color-text-primary)' }}>
						Total: {rows.length}
					</span>
				</div>
			</section>


			{/* Destination create/edit (R3.5); automatic rows expose the name overlay only (R3.3/R3.6) */}
			<Dialog
				header={editingIdp ? 'Edit instance' : editingId != null ? 'Edit manual link' : 'New manual link'}
				visible={draft != null}
				width='medium'
				onHide={() => setDraft(null)}
				footer={
					<>
						<Button label='Cancel' severity='secondary' onClick={() => setDraft(null)} />
						<Button label='Save' onClick={saveDraft} />
					</>
				}
			>
				{draft && (
					<form
						style={{ display: 'flex', flexDirection: 'column', gap: 'var(--size-l)', paddingBottom: 'var(--size-s)' }}
						onSubmit={(e) => {
							e.preventDefault();
							saveDraft();
						}}
					>
						<p style={{ marginTop: 0, color: 'var(--color-text-tertiary)' }}>Required fields are marked with an asterisk (*).</p>
						<FormField
							label='Display name'
							required
							valid={!draftErrors.displayName}
							validationMessage={draftErrors.displayName}
							errorMessageId='draft-name-error'
							input={
								<InputText
									id='draft-name'
									value={draft.displayName}
									aria-invalid={!!draftErrors.displayName}
									aria-errormessage={draftErrors.displayName ? 'draft-name-error' : undefined}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, displayName: e.target.value })}
									style={{ width: '100%' }}
								/>
							}
						/>
						{editingIdp ? (
							<FormField
								label='Entry URL'
								input={<InputText id='draft-url' value={draft.entryUrl} readOnly style={{ width: '100%' }} />}
								additionalContent={
									<span className='rui-caption' style={{ color: 'var(--color-text-tertiary)' }}>
										Added automatically from Centralized Authentication. The URL is managed by your identity
										provider and cannot be edited here.
									</span>
								}
							/>
						) : (
							<>
								<FormField
									label='Entry URL'
									required
									valid={!draftErrors.entryUrl}
									validationMessage={draftErrors.entryUrl}
									errorMessageId='draft-url-error'
									input={
										<InputText
											id='draft-url'
											value={draft.entryUrl}
											placeholder='https://instance.relativity.one/Relativity'
											aria-invalid={!!draftErrors.entryUrl}
											aria-errormessage={draftErrors.entryUrl ? 'draft-url-error' : undefined}
											onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDraft({ ...draft, entryUrl: e.target.value })}
											style={{ width: '100%' }}
										/>
									}
								/>
								<FormField
									label='Destination topology'
									input={
										<Dropdown
											inputId='draft-topology'
											value={draft.topology}
											options={TOPOLOGY_OPTIONS}
											onChange={(e: { value: Topology }) => setDraft({ ...draft, topology: e.value })}
											style={{ width: '100%' }}
										/>
									}
								/>
							</>
						)}
					</form>
				)}
			</Dialog>

		</div>
	);
}
