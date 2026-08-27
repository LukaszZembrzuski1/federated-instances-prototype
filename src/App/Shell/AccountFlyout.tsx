import { useEffect, useMemo, useRef, useState } from 'react';
import { InputText, ScreenReaderOnly } from 'relativity-ui';

import { CURRENT_INSTANCE, CURRENT_USER_EMAIL, type Destination, effectiveName } from '@/App/FederatedInstances/data';

const RECENTS_KEY = 'fi-recent-instances';

interface Props {
	/** Already-resolved, policy-filtered destination list for this user (R1.1). */
	destinations: Destination[];
	onSelectDestination: (d: Destination) => void;
	/** Deep link to the Federated Instances page (R1.4). */
	onViewAll: () => void;
}

function hostnameOf(d: Destination): string {
	try {
		return new URL(d.entryUrl).hostname;
	} catch {
		return d.entryUrl;
	}
}

function loadRecents(): number[] {
	try {
		const raw = localStorage.getItem(RECENTS_KEY);
		return raw ? (JSON.parse(raw) as number[]) : [];
	} catch {
		return [];
	}
}

const itemStyle: React.CSSProperties = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	gap: 'var(--size-s)',
	width: '100%',
	padding: 'var(--size-s) var(--size-l)',
	border: 'none',
	background: 'transparent',
	font: 'inherit',
	color: 'var(--color-text-primary)',
	textAlign: 'left',
	cursor: 'pointer'
};

function InstanceRow({ destination, onClick }: { destination: Destination; onClick: () => void }) {
	return (
		<button type='button' style={itemStyle} onClick={onClick}>
			<span style={{ display: 'flex', flexDirection: 'column', gap: 'var(--size-xxs)', minWidth: 0 }}>
				<span>
					{effectiveName(destination)}
					<span
						className='relativity-icons-popout'
						aria-hidden='true'
						style={{ fontSize: 11, marginLeft: 'var(--size-xs)', color: 'var(--color-text-tertiary)' }}
					/>
					<ScreenReaderOnly> (opens in a new tab)</ScreenReaderOnly>
				</span>
				<span
					className='rui-caption'
					style={{ color: 'var(--color-text-tertiary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
				>
					{hostnameOf(destination)}
				</span>
			</span>
			{destination.topology === 'SERVER' && (
				<span className='rui-caption' style={{ color: 'var(--color-text-tertiary)', flexShrink: 0 }}>
					Server
				</span>
			)}
		</button>
	);
}

/**
 * User account flyout (PRD R1). "Switch instance" is a single menu row that
 * opens a nested dropdown to the side with type-ahead search over the user's
 * resolved destinations (recently used first). The row is omitted entirely for
 * single-instance users; the Federated Instances page stays one click away (R1.4).
 */
export function AccountFlyout({ destinations, onSelectDestination, onViewAll }: Props) {
	const [open, setOpen] = useState(false);
	const [switcherOpen, setSwitcherOpen] = useState(false);
	const [query, setQuery] = useState('');
	const [recentIds, setRecentIds] = useState<number[]>(loadRecents);
	const rootRef = useRef<HTMLDivElement>(null);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const switchRowRef = useRef<HTMLButtonElement>(null);
	const searchRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (!open) return;
		function onDocClick(e: MouseEvent) {
			if (!rootRef.current?.contains(e.target as Node)) {
				setOpen(false);
				setSwitcherOpen(false);
			}
		}
		function onKey(e: KeyboardEvent) {
			if (e.key !== 'Escape') return;
			if (switcherOpen) {
				setSwitcherOpen(false);
				switchRowRef.current?.focus();
			} else {
				setOpen(false);
				triggerRef.current?.focus();
			}
		}
		document.addEventListener('mousedown', onDocClick);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('mousedown', onDocClick);
			document.removeEventListener('keydown', onKey);
		};
	}, [open, switcherOpen]);

	useEffect(() => {
		if (switcherOpen) searchRef.current?.focus();
	}, [switcherOpen]);

	// Recently used first, then the rest in resolver (policy) order.
	const ordered = useMemo(() => {
		const byRecency = recentIds
			.map((id) => destinations.find((d) => d.id === id))
			.filter((d): d is Destination => !!d);
		const rest = destinations.filter((d) => !recentIds.includes(d.id));
		return [...byRecency, ...rest];
	}, [destinations, recentIds]);

	const filtered = useMemo(() => {
		const q = query.trim().toLowerCase();
		if (!q) return ordered;
		return ordered.filter((d) => effectiveName(d).toLowerCase().includes(q) || hostnameOf(d).toLowerCase().includes(q));
	}, [ordered, query]);

	function toggleMenu() {
		setSwitcherOpen(false);
		setQuery('');
		setOpen((o) => !o);
	}

	function select(d: Destination) {
		const next = [d.id, ...recentIds.filter((id) => id !== d.id)].slice(0, 5);
		setRecentIds(next);
		try {
			localStorage.setItem(RECENTS_KEY, JSON.stringify(next));
		} catch {
			/* recents are a convenience; ignore storage failures */
		}
		setOpen(false);
		setSwitcherOpen(false);
		onSelectDestination(d);
	}

	const panelStyle: React.CSSProperties = {
		background: 'var(--color-background-secondary)',
		border: '1px solid var(--color-border-secondary)',
		borderRadius: 'var(--border-radius)',
		boxShadow: '0 6px 20px rgba(44, 50, 60, 0.18)',
		zIndex: 1000
	};

	return (
		<div ref={rootRef} style={{ position: 'relative' }}>
			<button
				ref={triggerRef}
				type='button'
				aria-label='User account menu'
				aria-haspopup='true'
				aria-expanded={open}
				onClick={toggleMenu}
				className='rui-caption-bold'
				style={{
					width: 32,
					height: 32,
					borderRadius: '50%',
					background: 'var(--color-interactive)',
					border: 'none',
					color: 'var(--color-white)',
					cursor: 'pointer'
				}}
			>
				PM
			</button>

			{open && (
				<div
					role='dialog'
					aria-label='User account'
					className='rui-body'
					style={{ ...panelStyle, position: 'absolute', right: 0, top: 40, width: 300, paddingBottom: 'var(--size-s)' }}
				>
					<div style={{ padding: 'var(--size-m) var(--size-l)', borderBottom: '1px solid var(--color-border-secondary)' }}>
						<div className='rui-body-bold' style={{ color: 'var(--color-text-primary)' }}>
							{CURRENT_USER_EMAIL}
						</div>
						<div className='rui-caption' style={{ color: 'var(--color-text-tertiary)', marginTop: 'var(--size-xxs)' }}>
							Signed in to {CURRENT_INSTANCE}
						</div>
					</div>

					<button type='button' style={itemStyle} onClick={() => setOpen(false)}>
						My Settings
					</button>

					{destinations.length > 0 && (
						<button
							ref={switchRowRef}
							type='button'
							aria-haspopup='true'
							aria-expanded={switcherOpen}
							style={{ ...itemStyle, background: switcherOpen ? 'var(--color-background-highlight)' : 'transparent' }}
							onClick={() => setSwitcherOpen((o) => !o)}
						>
							<span>Switch instance</span>
							<span className='relativity-icons-arrows-menu-left' aria-hidden='true' style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }} />
						</button>
					)}

					<div style={{ borderTop: '1px solid var(--color-border-secondary)', marginTop: 'var(--size-xs)', paddingTop: 'var(--size-xs)' }}>
						{['Help', 'Contact Support', "What's New", 'Logout'].map((label) => (
							<button key={label} type='button' style={itemStyle} onClick={() => setOpen(false)}>
								{label}
							</button>
						))}
					</div>

					{switcherOpen && (
						<div
							role='dialog'
							aria-label='Switch instance'
							style={{
								...panelStyle,
								position: 'absolute',
								top: 0,
								right: 'calc(100% + var(--size-xs))',
								width: 300,
								paddingBottom: 'var(--size-s)'
							}}
						>
							{/* Close arrow and filter share one row, so there is no empty header band */}
							<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--size-s)', padding: 'var(--size-m) var(--size-l)' }}>
								<button
									type='button'
									aria-label='Close instance list'
									onClick={() => {
										setSwitcherOpen(false);
										switchRowRef.current?.focus();
									}}
									style={{
										background: 'none',
										border: 'none',
										cursor: 'pointer',
										padding: 'var(--size-xxs)',
										color: 'var(--color-text-tertiary)',
										flexShrink: 0
									}}
								>
									<span className='relativity-icons-arrows-menu-right' aria-hidden='true' style={{ fontSize: 14 }} />
								</button>
								<InputText
									ref={searchRef}
									id='instance-filter'
									aria-label='Filter instances'
									placeholder='Filter instances...'
									value={query}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
									style={{ width: '100%' }}
								/>
							</div>

							<div role='list' aria-label='Instances' style={{ maxHeight: 280, overflowY: 'auto' }}>
								{filtered.map((d) => (
									<div role='listitem' key={d.id}>
										<InstanceRow destination={d} onClick={() => select(d)} />
									</div>
								))}
								{filtered.length === 0 && (
									<p
										className='rui-caption'
										style={{ margin: 0, padding: 'var(--size-m) var(--size-l)', color: 'var(--color-text-tertiary)' }}
									>
										No instances match &quot;{query}&quot;.
									</p>
								)}
							</div>

							<div style={{ borderTop: '1px solid var(--color-border-secondary)', marginTop: 'var(--size-xs)', paddingTop: 'var(--size-xs)' }}>
								<button
									type='button'
									style={{ ...itemStyle, color: 'var(--color-interactive)' }}
									onClick={() => {
										setOpen(false);
										setSwitcherOpen(false);
										onViewAll();
									}}
								>
									Open Federated Instances page
								</button>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
